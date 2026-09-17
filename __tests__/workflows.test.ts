import fs from "fs"
import path from "path"

type WorkflowViolation = {
  line: number
  message: string
  rule: string
}

type WorkflowBlock = {
  end: number
  flowEntries?: FlowEntry[]
  name: string
  start: number
}

type ParsedYamlLine = {
  indent: number
  key: string
  listItem: boolean
  value: string
}

type FlowEntry = {
  key: string
  value: string
}

type FlowMap = {
  entries: FlowEntry[]
  line?: number
  source?: string
}

type WorkflowActionUse = {
  line: number
  reference: string
  source: string
  credentialsDisabled?: boolean
}

const workflowDirectory = path.join(process.cwd(), ".github", "workflows")

function indentation(line: string): number {
  return line.match(/^\s*/)?.[0].length ?? 0
}

function stripComment(value: string): string {
  let quote: '"' | "'" | null = null

  for (let index = 0; index < value.length; index++) {
    const character = value[index]
    if (quote !== null) {
      if (character === quote) quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      continue
    }
    if (character === "#" && (index === 0 || /\s/.test(value[index - 1]))) {
      return value.slice(0, index).trim()
    }
  }

  return value.trim()
}

function workflowLines(content: string): string[] {
  return content.split(/\r?\n/)
}

function findColonOutsideQuotes(value: string): number {
  let quote: '"' | "'" | null = null
  for (let index = 0; index < value.length; index++) {
    const character = value[index]
    if (quote !== null) {
      if (character === quote) quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      continue
    }
    if (character === ":") return index
  }
  return -1
}

function normalizeYamlKey(key: string): string {
  const trimmed = key.trim()
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseYamlLine(line: string): ParsedYamlLine | null {
  const content = stripComment(line).trim()
  if (content === "") return null

  let mapping = content
  let listItem = false
  if (mapping === "-" || mapping.startsWith("- ")) {
    listItem = true
    mapping = mapping.slice(1).trimStart()
  }
  if (mapping.startsWith("{")) return null

  const colon = findColonOutsideQuotes(mapping)
  if (colon <= 0) return null

  return {
    indent: indentation(line),
    key: normalizeYamlKey(mapping.slice(0, colon)),
    listItem,
    value: mapping.slice(colon + 1).trim(),
  }
}

function splitFlowItems(value: string): string[] {
  const items: string[] = []
  let current = ""
  let depth = 0
  let quote: '"' | "'" | null = null

  for (const character of value) {
    if (quote !== null) {
      current += character
      if (character === quote) quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      current += character
      continue
    }
    if (character === "{" || character === "[") depth++
    if (character === "}" || character === "]") depth--
    if (character === "," && depth === 0) {
      items.push(current.trim())
      current = ""
      continue
    }
    current += character
  }

  if (current.trim() !== "") items.push(current.trim())
  return items
}

function parseFlowEntries(value: string): FlowEntry[] {
  const content = stripComment(value)
  const start = content.indexOf("{")
  const end = content.lastIndexOf("}")
  if (start === -1 || end <= start) return []

  return splitFlowItems(content.slice(start + 1, end))
    .map(item => {
      const colon = findColonOutsideQuotes(item)
      if (colon <= 0) return null
      return {
        key: normalizeYamlKey(item.slice(0, colon)),
        value: item.slice(colon + 1).trim(),
      }
    })
    .filter((entry): entry is FlowEntry => entry !== null)
}

function flowEntriesOnListItem(line: string): FlowEntry[] {
  const content = stripComment(line).trim()
  if (!content.startsWith("-")) return []
  const mapping = content.slice(1).trimStart()
  return mapping.startsWith("{") ? parseFlowEntries(mapping) : []
}

function normalizeScalar(value: string): string {
  const scalar = stripComment(value)
  if (
    scalar.length >= 2 &&
    ((scalar.startsWith('"') && scalar.endsWith('"')) ||
      (scalar.startsWith("'") && scalar.endsWith("'")))
  ) {
    return scalar.slice(1, -1)
  }
  return scalar
}

function flowCollectionDepth(value: string): number {
  let depth = 0
  let quote: '"' | "'" | null = null

  for (const character of value) {
    if (quote !== null) {
      if (character === quote) quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      continue
    }
    if (character === "{" || character === "[") depth++
    if (character === "}" || character === "]") depth--
  }

  return depth
}

type FlowCollection = {
  start: number
  source: string
  value: string
}

function collectFlowCollectionWithSource(
  lines: string[],
  index: number,
  initialValue: string
): FlowCollection {
  let value = stripComment(initialValue).trim()
  let source = lines[index]
  if (flowCollectionDepth(value) <= 0) return { start: index, source, value }

  for (let next = index + 1; next < lines.length; next++) {
    const part = stripComment(lines[next]).trim()
    source += `\n${lines[next]}`
    if (part !== "") value += ` ${part}`
    if (flowCollectionDepth(value) <= 0) break
  }

  return { start: index, source, value }
}

function flowCollectionAt(
  lines: string[],
  index: number,
  parsed: ParsedYamlLine
): FlowCollection | null {
  const initialValue = stripComment(parsed.value).trim()
  if (initialValue !== "") {
    return collectFlowCollectionWithSource(lines, index, initialValue)
  }

  for (let next = index + 1; next < lines.length; next++) {
    const part = stripComment(lines[next]).trim()
    if (part === "") continue
    if (!part.startsWith("{") && !part.startsWith("[")) return null
    return collectFlowCollectionWithSource(lines, next, part)
  }

  return null
}

function flowValueAt(
  lines: string[],
  index: number,
  parsed: ParsedYamlLine
): string {
  return flowCollectionAt(lines, index, parsed)?.value ?? ""
}

function flowCollectionForListItem(
  lines: string[],
  index: number
): FlowCollection | null {
  const content = stripComment(lines[index]).trim()
  if (!content.startsWith("-")) return null
  const initialValue = content.slice(1).trimStart()
  if (initialValue === "") {
    for (let next = index + 1; next < lines.length; next++) {
      const part = stripComment(lines[next]).trim()
      if (part === "") continue
      if (
        indentation(lines[next]) <= indentation(lines[index]) ||
        (!part.startsWith("{") && !part.startsWith("["))
      ) {
        return null
      }
      return collectFlowCollectionWithSource(lines, next, part)
    }
    return null
  }
  return collectFlowCollectionWithSource(lines, index, initialValue)
}

function topLevelLine(
  lines: string[],
  key: string
): { index: number; value: string } | null {
  for (let index = 0; index < lines.length; index++) {
    const parsed = parseYamlLine(lines[index])
    if (parsed?.indent === 0 && parsed.key === key) {
      return {
        index,
        value: normalizeScalar(flowValueAt(lines, index, parsed)),
      }
    }
  }
  return null
}

function directChildMappings(
  lines: string[],
  parentIndex: number,
  parentIndent: number
): Array<{ index: number; parsed: ParsedYamlLine }> {
  const children: Array<{ index: number; parsed: ParsedYamlLine }> = []
  let childIndent: number | null = null

  for (let index = parentIndex + 1; index < lines.length; index++) {
    const line = lines[index]
    if (stripComment(line) === "") continue
    if (indentation(line) <= parentIndent) break
    childIndent = indentation(line)
    break
  }

  if (childIndent === null) return children

  for (let index = parentIndex + 1; index < lines.length; index++) {
    const line = lines[index]
    if (stripComment(line) !== "" && indentation(line) <= parentIndent) break

    const parsed = parseYamlLine(line)
    if (parsed?.indent === childIndent) children.push({ index, parsed })
  }
  return children
}

function blockSequenceValues(
  lines: string[],
  parentIndex: number,
  parentIndent: number
): Array<{ index: number; value: string }> {
  const values: Array<{ index: number; value: string }> = []
  let sequenceIndent: number | null = null
  let pendingScalarIndex: number | null = null

  for (let index = parentIndex + 1; index < lines.length; index++) {
    const line = lines[index]
    const content = stripComment(line).trim()
    if (content === "") continue
    if (indentation(line) <= parentIndent) break

    if (pendingScalarIndex !== null) {
      if (
        indentation(line) > (sequenceIndent ?? parentIndent) &&
        !content.startsWith("-")
      ) {
        values.push({
          index: pendingScalarIndex,
          value: normalizeScalar(content),
        })
        pendingScalarIndex = null
        continue
      }
      pendingScalarIndex = null
    }

    if (sequenceIndent === null) {
      if (!content.startsWith("-")) return values
      sequenceIndent = indentation(line)
    }

    if (indentation(line) !== sequenceIndent || !content.startsWith("-")) {
      continue
    }

    const value = normalizeScalar(content.slice(1).trim())
    if (value === "") {
      pendingScalarIndex = index
    } else {
      values.push({ index, value })
    }
  }

  return values
}

function isBlockScalarIndicator(value: string): boolean {
  return /^[|>](?:[-+]|[1-9]|[-+][1-9]|[1-9][-+])?\s*$/.test(value)
}

function isUnquotedInteger(value: string): boolean {
  return /^\d+$/.test(stripComment(value))
}

function permissionsAreMinimal(
  lines: string[],
  index: number,
  parentIndent: number,
  value: string
): boolean {
  const inlineValue = stripComment(value)
  if (inlineValue.replace(/\s/g, "") === "{}") return true
  const flowEntries = parseFlowEntries(inlineValue)
  if (flowEntries.length > 0) {
    return (
      flowEntries.length === 1 &&
      flowEntries[0].key === "contents" &&
      normalizeScalar(flowEntries[0].value) === "read"
    )
  }
  if (inlineValue !== "") return false

  const entries = directChildMappings(lines, index, parentIndent).map(
    ({ parsed }) =>
      [parsed.key, normalizeScalar(parsed.value)] as [string, string]
  )

  return (
    entries.length === 1 &&
    entries[0][0] === "contents" &&
    entries[0][1] === "read"
  )
}

function topLevelPermissionsAreMinimal(lines: string[]): boolean {
  const permissions = topLevelLine(lines, "permissions")
  return (
    permissions !== null &&
    permissionsAreMinimal(lines, permissions.index, 0, permissions.value)
  )
}

function workflowJobs(lines: string[]): WorkflowBlock[] {
  const jobs = topLevelLine(lines, "jobs")
  if (!jobs) return []

  const flowJobs = parseFlowEntries(jobs.value)
  if (flowJobs.length > 0) {
    return flowJobs.map(job => ({
      end: jobs.index + 1,
      flowEntries: parseFlowEntries(job.value),
      name: job.key,
      start: jobs.index,
    }))
  }
  if (jobs.value !== "") return []

  const jobStarts = directChildMappings(lines, jobs.index, 0).map(
    ({ index, parsed }) => ({ name: parsed.key, start: index })
  )

  return jobStarts.map((job, offset) => ({
    end: jobStarts[offset + 1]?.start ?? lines.length,
    flowEntries: (() => {
      const parsed = parseYamlLine(lines[job.start])
      const value = parsed ? flowValueAt(lines, job.start, parsed) : ""
      const entries = parseFlowEntries(value)
      return entries.length > 0 ? entries : undefined
    })(),
    name: job.name,
    start: job.start,
  }))
}

function isExternalAction(reference: string): boolean {
  return !reference.startsWith("./") && !reference.startsWith("../")
}

function actionPath(reference: string): string {
  const atIndex = reference.lastIndexOf("@")
  return atIndex === -1 ? reference : reference.slice(0, atIndex)
}

function blockScalarContentLines(lines: string[]): Set<number> {
  const contentLines = new Set<number>()
  let scalarIndent: number | null = null

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    if (scalarIndent !== null) {
      if (line.trim() === "") {
        contentLines.add(index)
        continue
      }
      if (indentation(line) > scalarIndent) {
        contentLines.add(index)
        continue
      }
      scalarIndent = null
    }

    const parsed = parseYamlLine(line)
    if (parsed && isBlockScalarIndicator(parsed.value)) {
      scalarIndent = parsed.indent
    }
  }

  return contentLines
}

function actionIsPinned(source: string, reference: string): boolean {
  const atIndex = reference.lastIndexOf("@")
  const ref = atIndex === -1 ? "" : reference.slice(atIndex + 1)
  const comments = source
    .split(/\r?\n/)
    .map(line => line.match(/\s+#\s+(.*)$/)?.[1] ?? "")

  return (
    /^[0-9a-f]{40}$/i.test(ref) &&
    comments.some(comment => /^v\d+\.\d+\.\d+$/.test(comment))
  )
}

function scalarActionReference(
  lines: string[],
  index: number,
  parsed: ParsedYamlLine
): WorkflowActionUse | null {
  const inlineValue = normalizeScalar(parsed.value)
  if (!isBlockScalarIndicator(inlineValue)) {
    const reference = inlineValue.split(/\s+/)[0]
    return reference ? { line: index, reference, source: lines[index] } : null
  }

  for (let next = index + 1; next < lines.length; next++) {
    const line = lines[next]
    if (line.trim() === "") continue
    if (indentation(line) <= parsed.indent) break
    const reference = normalizeScalar(line.trim()).split(/\s+/)[0]
    if (reference) {
      return {
        line: index,
        reference,
        source: `${lines[index]} ${line}`,
      }
    }
  }
  return null
}

function flowStepMaps(value: string): FlowMap[] {
  let content = stripComment(value).trim()
  if (content === "-" || content.startsWith("- ")) {
    content = content.slice(1).trimStart()
  }
  const items =
    content.startsWith("[") && content.endsWith("]")
      ? splitFlowItems(content.slice(1, -1))
      : content.startsWith("{")
        ? [content]
        : []

  return items
    .map(item => item.trim())
    .filter(item => item.startsWith("{") && item.endsWith("}"))
    .map(source => ({ entries: parseFlowEntries(source) }))
    .filter(map => map.entries.length > 0)
}

function stripCommentsPreservingNewlines(value: string): string {
  let quote: '"' | "'" | null = null
  let comment = false
  let result = ""

  for (const character of value) {
    if (comment) {
      if (character === "\n") {
        comment = false
        result += character
      } else {
        result += " "
      }
      continue
    }
    if (quote !== null) {
      result += character
      if (character === quote) quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      result += character
      continue
    }
    if (character === "#") {
      comment = true
      result += " "
      continue
    }
    result += character
  }

  return result
}

function flowMapEnd(value: string, start: number): number {
  let depth = 0
  let quote: '"' | "'" | null = null

  for (let index = start; index < value.length; index++) {
    const character = value[index]
    if (quote !== null) {
      if (character === quote) quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      continue
    }
    if (character === "{") depth++
    if (character === "}") {
      depth--
      if (depth === 0) return index
    }
  }

  return -1
}

function flowStepMapsFromCollection(collection: FlowCollection): FlowMap[] {
  const value = collection.value.trim()
  const source = stripCommentsPreservingNewlines(collection.source)
  if (value.startsWith("{")) {
    const entries = parseFlowEntries(value)
    return entries.length > 0 ? [{ entries, source: collection.source }] : []
  }
  if (!value.startsWith("[")) return []

  const open = source.indexOf("[")
  if (open === -1) return []

  const maps: FlowMap[] = []
  let sequenceDepth = 0
  for (let index = open; index < source.length; index++) {
    const character = source[index]
    if (character === "[") {
      sequenceDepth++
      continue
    }
    if (character === "]") {
      sequenceDepth--
      continue
    }
    if (character !== "{" || sequenceDepth !== 1) continue

    const end = flowMapEnd(source, index)
    if (end === -1) break
    const entries = parseFlowEntries(source.slice(index, end + 1))
    if (entries.length > 0) {
      const lineStart = source.lastIndexOf("\n", index) + 1
      const lineEnd = source.indexOf("\n", end)
      maps.push({
        entries,
        line:
          collection.start + source.slice(0, lineStart).split("\n").length - 1,
        source:
          lineEnd === -1
            ? collection.source.slice(lineStart)
            : collection.source.slice(lineStart, lineEnd),
      })
    }
    index = end
  }

  return maps
}

function flowMapHasDisabledCredentials(map: FlowMap): boolean {
  const withEntry = map.entries.find(entry => entry.key === "with")
  return (
    withEntry !== undefined &&
    parseFlowEntries(withEntry.value).some(
      entry =>
        entry.key === "persist-credentials" &&
        normalizeScalar(entry.value) === "false"
    )
  )
}

function mappingContainsLine(
  lines: string[],
  parentIndex: number,
  index: number,
  parentIndent: number,
  scalarContentLines: Set<number>
): boolean {
  for (let current = parentIndex + 1; current < index; current++) {
    if (scalarContentLines.has(current)) continue
    if (
      lines[current].trim() !== "" &&
      indentation(lines[current]) <= parentIndent
    ) {
      return false
    }
  }
  return true
}

function mappingAncestor(
  lines: string[],
  index: number,
  scalarContentLines: Set<number>
): ParsedYamlLine | null {
  const currentIndent = indentation(lines[index])
  for (let previous = index - 1; previous >= 0; previous--) {
    if (scalarContentLines.has(previous)) continue
    const parsed = parseYamlLine(lines[previous])
    const parsedIndent = parsed?.indent ?? 0
    const mappingIndent = parsed?.listItem ? parsedIndent + 2 : parsedIndent
    if (parsed && mappingIndent < currentIndent) return parsed
  }
  return null
}

function isWithinMapping(
  lines: string[],
  index: number,
  key: string,
  scalarContentLines: Set<number>
): boolean {
  const currentIndent = indentation(lines[index])
  for (let candidate = index - 1; candidate >= 0; candidate--) {
    if (scalarContentLines.has(candidate)) continue
    const parsed = parseYamlLine(lines[candidate])
    if (!parsed || parsed.indent >= currentIndent || parsed.key !== key) {
      continue
    }
    if (
      mappingContainsLine(
        lines,
        candidate,
        index,
        parsed.indent,
        scalarContentLines
      )
    ) {
      return true
    }
  }
  return false
}

function isActionInputLine(
  lines: string[],
  index: number,
  scalarContentLines: Set<number>
): boolean {
  const parent = mappingAncestor(lines, index, scalarContentLines)
  return parent?.key === "with" || parent?.key === "env"
}

function isWorkflowStepAction(
  lines: string[],
  index: number,
  scalarContentLines: Set<number>
): boolean {
  return (
    isWithinMapping(lines, index, "steps", scalarContentLines) &&
    !isActionInputLine(lines, index, scalarContentLines)
  )
}

function isReusableWorkflowAction(lines: string[], index: number): boolean {
  return workflowJobs(lines).some(job => {
    const jobLine = parseYamlLine(lines[job.start])
    return directChildMappings(lines, job.start, jobLine?.indent ?? 2).some(
      ({ index: childIndex, parsed }) => {
        return childIndex === index && parsed.key === "uses"
      }
    )
  })
}

function stepStart(
  lines: string[],
  index: number,
  scalarContentLines: Set<number>
): number {
  const parsed = parseYamlLine(lines[index])
  if (parsed?.listItem) return index

  const itemIndent = indentation(lines[index]) - 2
  if (itemIndent < 0) return index

  for (let previous = index - 1; previous >= 0; previous--) {
    if (scalarContentLines.has(previous) || lines[previous].trim() === "") {
      continue
    }
    const previousIndent = indentation(lines[previous])
    if (previousIndent < itemIndent) return index
    if (previousIndent === itemIndent) {
      return stripComment(lines[previous]).trim().startsWith("-")
        ? previous
        : index
    }
  }

  return index
}

function isUnderWith(
  lines: string[],
  index: number,
  scalarContentLines: Set<number>
): boolean {
  const current = parseYamlLine(lines[index])
  if (!current) return false

  for (let previous = index - 1; previous >= 0; previous--) {
    if (scalarContentLines.has(previous)) continue
    const parsed = parseYamlLine(lines[previous])
    const parsedIndent = parsed?.indent ?? 0
    const mappingIndent = parsed?.listItem ? parsedIndent + 2 : parsedIndent
    if (!parsed || mappingIndent >= current.indent) continue
    return parsed.key === "with"
  }
  return false
}

function actionsFromFlowMaps(
  line: number,
  source: string,
  maps: FlowMap[]
): WorkflowActionUse[] {
  return maps.flatMap(map => {
    const entry = map.entries.find(entry => entry.key === "uses")
    if (!entry) return []
    return [
      {
        line: map.line ?? line,
        reference: normalizeScalar(entry.value),
        source: map.source ?? source,
        credentialsDisabled: flowMapHasDisabledCredentials(map),
      },
    ]
  })
}

function isWithinFlowCollection(
  lines: string[],
  index: number,
  scalarContentLines: Set<number>
): boolean {
  const contains = (collection: FlowCollection | null): boolean => {
    if (!collection) return false
    const end = collection.start + collection.source.split(/\r?\n/).length - 1
    return index > collection.start && index <= end
  }

  for (let candidate = index - 1; candidate >= 0; candidate--) {
    if (scalarContentLines.has(candidate)) continue
    const parsed = parseYamlLine(lines[candidate])
    if (
      parsed &&
      (parsed.value.trim().startsWith("{") ||
        parsed.value.trim().startsWith("["))
    ) {
      if (contains(flowCollectionAt(lines, candidate, parsed))) return true
    }

    const content = stripComment(lines[candidate]).trim()
    if (
      content === "-" ||
      content.startsWith("- {") ||
      content.startsWith("- [")
    ) {
      if (contains(flowCollectionForListItem(lines, candidate))) return true
    }
  }

  return false
}

function workflowActionUses(
  lines: string[],
  scalarContentLines: Set<number>
): WorkflowActionUse[] {
  const actions: WorkflowActionUse[] = []
  const jobs = workflowJobs(lines)

  for (const job of jobs) {
    if (!job.flowEntries) continue
    const jobLine = parseYamlLine(lines[job.start])
    const jobCollection = jobLine
      ? flowCollectionAt(lines, job.start, jobLine)
      : null
    const hasMultilineSteps =
      jobCollection?.source
        .split(/\r?\n/)
        .some(line => parseYamlLine(line)?.key === "steps") ?? false

    const reusable = job.flowEntries.find(entry => entry.key === "uses")
    if (reusable) {
      actions.push({
        line: job.start,
        reference: normalizeScalar(reusable.value),
        source: lines[job.start],
      })
    }

    const steps = job.flowEntries.find(entry => entry.key === "steps")
    if (steps && !hasMultilineSteps) {
      actions.push(
        ...actionsFromFlowMaps(
          job.start,
          lines[job.start],
          flowStepMaps(steps.value)
        )
      )
    }
  }

  for (let index = 0; index < lines.length; index++) {
    if (scalarContentLines.has(index)) continue

    const parsed = parseYamlLine(lines[index])

    if (
      parsed?.key === "uses" &&
      !isWithinFlowCollection(lines, index, scalarContentLines) &&
      !isUnderWith(lines, index, scalarContentLines) &&
      (isWorkflowStepAction(lines, index, scalarContentLines) ||
        isReusableWorkflowAction(lines, index))
    ) {
      const action = scalarActionReference(lines, index, parsed)
      if (action) actions.push(action)
    }

    const flowMaps =
      parsed?.key === "steps"
        ? (() => {
            const collection = flowCollectionAt(lines, index, parsed)
            return collection ? flowStepMapsFromCollection(collection) : []
          })()
        : isWorkflowStepAction(lines, index, scalarContentLines)
          ? (() => {
              const collection = flowCollectionForListItem(lines, index)
              return collection ? flowStepMapsFromCollection(collection) : []
            })()
          : []
    actions.push(...actionsFromFlowMaps(index, lines[index], flowMaps))
  }
  return actions
}

function stepEnd(lines: string[], start: number): number {
  const stepIndent = indentation(lines[start])
  for (let index = start + 1; index < lines.length; index++) {
    if (lines[index].trim() !== "" && indentation(lines[index]) <= stepIndent) {
      return index
    }
  }
  return lines.length
}

function checkoutStepHasDisabledCredentials(
  lines: string[],
  start: number,
  scalarContentLines: Set<number>
): boolean {
  const sequenceStart = stepStart(lines, start, scalarContentLines)
  const stepIndent = indentation(lines[sequenceStart])
  const end = stepEnd(lines, sequenceStart)

  const inlineWith = flowEntriesOnListItem(lines[sequenceStart]).find(
    entry => entry.key === "with"
  )
  if (
    inlineWith &&
    parseFlowEntries(inlineWith.value).some(
      entry =>
        entry.key === "persist-credentials" &&
        normalizeScalar(entry.value) === "false"
    )
  ) {
    return true
  }

  const sequenceParsed = parseYamlLine(lines[sequenceStart])
  const withLine =
    sequenceParsed?.listItem && sequenceParsed.key === "with"
      ? { index: sequenceStart, parsed: sequenceParsed }
      : lines
          .slice(sequenceStart + 1, end)
          .map((line, offset) => ({
            index: sequenceStart + 1 + offset,
            parsed: parseYamlLine(line),
          }))
          .find(
            item =>
              item.parsed?.key === "with" &&
              item.parsed.indent === stepIndent + 2
          )
  if (!withLine?.parsed) return false

  const inlineEntries = parseFlowEntries(
    flowValueAt(lines, withLine.index, withLine.parsed)
  )
  if (inlineEntries.length > 0) {
    return inlineEntries.some(
      entry =>
        entry.key === "persist-credentials" &&
        normalizeScalar(entry.value) === "false"
    )
  }

  return directChildMappings(
    lines,
    withLine.index,
    withLine.parsed.indent
  ).some(
    ({ index, parsed }) =>
      !scalarContentLines.has(index) &&
      parsed.key === "persist-credentials" &&
      normalizeScalar(parsed.value) === "false"
  )
}

function inlineSequenceIncludes(value: string, target: string): boolean {
  const content = stripComment(value)
  if (!content.startsWith("[") || !content.endsWith("]")) return false
  return splitFlowItems(content.slice(1, -1)).some(
    item => normalizeScalar(item) === target
  )
}

function hasEventTrigger(lines: string[], event: string): boolean {
  const on = topLevelLine(lines, "on")
  if (!on) return false

  if (normalizeScalar(on.value) === event) return true
  if (inlineSequenceIncludes(on.value, event)) return true
  if (parseFlowEntries(on.value).some(entry => entry.key === event)) return true
  if (
    blockSequenceValues(lines, on.index, indentation(lines[on.index])).some(
      ({ value }) => value === event
    )
  ) {
    return true
  }

  return directChildMappings(lines, on.index, 0).some(
    ({ parsed }) => parsed.key === event
  )
}

function eventLine(lines: string[], event: string): number {
  const on = topLevelLine(lines, "on")
  if (!on) return 0
  const child = directChildMappings(lines, on.index, 0).find(
    ({ parsed }) => parsed.key === event
  )
  const sequence = blockSequenceValues(
    lines,
    on.index,
    indentation(lines[on.index])
  ).find(({ value }) => value === event)
  return child?.index ?? sequence?.index ?? on.index
}

function concurrencyCancelValue(
  lines: string[],
  index: number,
  indent: number,
  value: string
): { index: number; value: string } | null {
  const inline = parseFlowEntries(value).find(
    entry => entry.key === "cancel-in-progress"
  )
  if (inline) return { index, value: inline.value }

  const child = directChildMappings(lines, index, indent).find(
    ({ parsed }) => parsed.key === "cancel-in-progress"
  )
  return child ? { index: child.index, value: child.parsed.value } : null
}

function concurrencyCancelValues(
  lines: string[],
  jobs: WorkflowBlock[]
): Array<{ index: number; value: string }> {
  const values: Array<{ index: number; value: string }> = []
  const topLevel = topLevelLine(lines, "concurrency")
  if (topLevel) {
    const value = concurrencyCancelValue(
      lines,
      topLevel.index,
      0,
      topLevel.value
    )
    if (value) values.push(value)
  }

  for (const job of jobs) {
    const jobLine = parseYamlLine(lines[job.start])
    if (job.flowEntries) {
      const concurrency = job.flowEntries.find(
        entry => entry.key === "concurrency"
      )
      if (!concurrency) continue

      const value = concurrencyCancelValue(
        lines,
        job.start,
        jobLine?.indent ?? 0,
        concurrency.value
      )
      if (value) values.push(value)
      continue
    }

    const concurrency = directChildMappings(
      lines,
      job.start,
      jobLine?.indent ?? 2
    ).find(({ parsed }) => parsed.key === "concurrency")
    if (!concurrency) continue

    const value = concurrencyCancelValue(
      lines,
      concurrency.index,
      concurrency.parsed.indent,
      concurrency.parsed.value
    )
    if (value) values.push(value)
  }

  return values
}

function stripOuterParentheses(value: string): string {
  let result = value.trim()

  while (result.startsWith("(") && result.endsWith(")")) {
    let depth = 0
    let matchingClose = -1
    for (let index = 0; index < result.length; index++) {
      if (result[index] === "(") depth++
      if (result[index] !== ")") continue
      depth--
      if (depth === 0) {
        matchingClose = index
        break
      }
    }

    if (matchingClose !== result.length - 1) break
    result = result.slice(1, -1).trim()
  }

  return result
}

function isUnconditionalTrue(value: string): boolean {
  const scalar = normalizeScalar(value).replace(/\s+/g, " ")
  if (scalar.toLowerCase() === "true") return true

  const expression = scalar.match(/^\$\{\{\s*(.+?)\s*\}\}$/)?.[1]
  if (!expression) return false
  const normalizedExpression = stripOuterParentheses(expression)
  if (normalizedExpression.toLowerCase() === "true") return true

  const comparison = normalizedExpression.match(
    /^(-?(?:\d+(?:\.\d*)?|\.\d+))\s*(==|!=|>=|<=|>|<)\s*(-?(?:\d+(?:\.\d*)?|\.\d+))$/
  )
  if (!comparison) return false

  const left = Number(comparison[1])
  const right = Number(comparison[3])
  switch (comparison[2]) {
    case "==":
      return left === right
    case "!=":
      return left !== right
    case ">=":
      return left >= right
    case "<=":
      return left <= right
    case ">":
      return left > right
    case "<":
      return left < right
    default:
      return false
  }
}

function hasPushTrigger(lines: string[]): boolean {
  return hasEventTrigger(lines, "push")
}

function hasPullRequestTarget(lines: string[]): boolean {
  return hasEventTrigger(lines, "pull_request_target")
}

function inspectWorkflow(content: string): WorkflowViolation[] {
  const lines = workflowLines(content)
  const violations: WorkflowViolation[] = []
  const scalarContentLines = blockScalarContentLines(lines)

  if (!topLevelPermissionsAreMinimal(lines)) {
    const permissions = topLevelLine(lines, "permissions")
    violations.push({
      line: (permissions?.index ?? 0) + 1,
      message: "トップレベル permissions は {} または contents: read にする",
      rule: "top-level-permissions",
    })
  }

  const jobs = workflowJobs(lines)
  for (const job of jobs) {
    const jobLine = parseYamlLine(lines[job.start])
    const jobEntries =
      job.flowEntries ??
      (jobLine ? parseFlowEntries(flowValueAt(lines, job.start, jobLine)) : [])
    const flowTimeout = jobEntries.find(
      entry => entry.key === "timeout-minutes"
    )
    const hasFlowTimeout =
      flowTimeout !== undefined && isUnquotedInteger(flowTimeout.value)
    const jobChildren = job.flowEntries
      ? []
      : directChildMappings(lines, job.start, jobLine?.indent ?? 2)
    const hasBlockTimeout = jobChildren.some(
      ({ index, parsed }) =>
        !scalarContentLines.has(index) &&
        parsed.key === "timeout-minutes" &&
        isUnquotedInteger(parsed.value)
    )
    const hasTimeout = hasFlowTimeout || hasBlockTimeout
    if (!hasTimeout) {
      violations.push({
        line: job.start + 1,
        message: `job ${job.name} に timeout-minutes がない`,
        rule: "job-timeout",
      })
    }
  }

  for (const action of workflowActionUses(lines, scalarContentLines)) {
    const { line, reference, source } = action
    if (!isExternalAction(reference)) continue

    if (!actionIsPinned(source, reference)) {
      violations.push({
        line: line + 1,
        message: `${reference} は40桁SHAとバージョンコメントで固定する`,
        rule: "pinned-actions",
      })
    }

    if (
      actionPath(reference) === "actions/checkout" &&
      !action.credentialsDisabled &&
      !checkoutStepHasDisabledCredentials(lines, line, scalarContentLines)
    ) {
      violations.push({
        line: line + 1,
        message: "actions/checkout の persist-credentials は false にする",
        rule: "checkout-credentials",
      })
    }
  }

  if (hasPullRequestTarget(lines)) {
    violations.push({
      line: eventLine(lines, "pull_request_target") + 1,
      message: "pull_request_target は使用しない",
      rule: "no-pull-request-target",
    })
  }

  if (hasPushTrigger(lines)) {
    for (const cancel of concurrencyCancelValues(lines, jobs)) {
      if (!isUnconditionalTrue(cancel.value)) continue
      violations.push({
        line: cancel.index + 1,
        message:
          "push を持つWorkflowで cancel-in-progress: true を無条件指定しない",
        rule: "conditional-cancel-in-progress",
      })
    }
  }

  return violations
}

const validWorkflow = [
  "name: Test",
  "on:",
  "  push:",
  "    branches: [main]",
  "permissions: {}",
  "concurrency:",
  "  group: ci",
  "  cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
  "jobs:",
  "  check:",
  "    runs-on: ubuntu-latest",
  "    timeout-minutes: 5",
  "    steps:",
  "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0",
  "        with:",
  "          persist-credentials: false",
  "      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
].join("\n")

const indentedJobWorkflow = validWorkflow
  .split("\n")
  .map((line, index, lines) =>
    index > lines.indexOf("jobs:") ? `  ${line}` : line
  )
  .join("\n")

const violationFixtures = [
  {
    content: validWorkflow.replace(
      "actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0",
      "actions/checkout@v1 # v1.0.0"
    ),
    name: "SHAで固定していないAction",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    ),
    name: "バージョンコメントのないAction",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "docker://alpine:latest"
    ),
    name: "未固定のDocker Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # release v2.0.0.1"
    ),
    name: "形式外のバージョンコメントを持つAction",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      - { uses: actions/checkout@v1, with: { persist-credentials: false } }"
    ),
    name: "Flow形式の未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      - with: { persist-credentials: false }\n        uses: actions/checkout@v1"
    ),
    name: "withが先にあるStepの未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      - env: { ACTION_INPUT: value }\n        uses: actions/checkout@v1"
    ),
    name: "envが先にあるStepの未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "    steps: [{ uses: actions/checkout@v1 }]"
    ),
    name: "inline Flow sequenceの未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "    steps: [\n      { uses: actions/setup-node@v1 },\n    ]"
    ),
    name: "改行Flow sequenceの未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      -\n        { uses: actions/setup-node@v1 }"
    ),
    name: "standalone dash後のFlow形式未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "  check:\n    runs-on: ubuntu-latest\n    timeout-minutes: 5\n    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "  check: { runs-on: ubuntu-latest, timeout-minutes: 5, steps: [{ uses: actions/setup-node@v1 }] }"
    ),
    name: "Flow形式Job内の未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "jobs:\n  check:\n    runs-on: ubuntu-latest\n    timeout-minutes: 5\n    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "jobs: { check: { runs-on: ubuntu-latest, steps: [{ uses: actions/setup-node@v1 }] } }"
    ),
    name: "Flow形式jobs内の未固定Actionとタイムアウト欠落",
    rule: "job-timeout",
  },
  {
    content: validWorkflow.replace(
      "      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "      - uses: >-\n          actions/setup-node@v2"
    ),
    name: "折りたたみ形式の未固定Action",
    rule: "pinned-actions",
  },
  {
    content: validWorkflow.replace(
      "permissions: {}",
      "permissions:\n  contents: write"
    ),
    name: "広すぎるトップレベル権限",
    rule: "top-level-permissions",
  },
  {
    content: validWorkflow.replace("    timeout-minutes: 5\n", ""),
    name: "Jobのタイムアウト欠落",
    rule: "job-timeout",
  },
  {
    content: validWorkflow.replace(
      "    timeout-minutes: 5",
      '    timeout-minutes: "5"'
    ),
    name: "文字列のJobタイムアウト",
    rule: "job-timeout",
  },
  {
    content: `${validWorkflow}\n  "second": # quoted job id\n    runs-on: ubuntu-latest`,
    name: "コメント付きQuoted Jobのタイムアウト欠落",
    rule: "job-timeout",
  },
  {
    content: indentedJobWorkflow.replace("    timeout-minutes: 5\n", ""),
    name: "可変インデントJobのタイムアウト欠落",
    rule: "job-timeout",
  },
  {
    content: validWorkflow.replace(
      "persist-credentials: false",
      "persist-credentials: true"
    ),
    name: "checkoutの認証情報を残す設定",
    rule: "checkout-credentials",
  },
  {
    content: validWorkflow.replace(
      "        with:\n          persist-credentials: false\n",
      ""
    ),
    name: "checkoutの認証情報設定欠落",
    rule: "checkout-credentials",
  },
  {
    content: validWorkflow.replace(
      "        with:\n          persist-credentials: false",
      "        env:\n          persist-credentials: false"
    ),
    name: "checkoutの環境変数に見せかけた認証情報設定",
    rule: "checkout-credentials",
  },
  {
    content: validWorkflow.replace(
      "on:\n  push:",
      '"on":\n  "pull_request_target":'
    ),
    name: "危険なpull_request_targetトリガー",
    rule: "no-pull-request-target",
  },
  {
    content: validWorkflow.replace(
      "on:\n  push:\n    branches: [main]",
      "on:\n  - pull_request_target"
    ),
    name: "Block sequenceの危険なpull_request_targetトリガー",
    rule: "no-pull-request-target",
  },
  {
    content: validWorkflow.replace(
      "on:\n  push:\n    branches: [main]",
      "on:\n  -\n    pull_request_target"
    ),
    name: "standalone dash後の危険なpull_request_targetトリガー",
    rule: "no-pull-request-target",
  },
  {
    content: validWorkflow.replace(
      "on:\n  push:\n    branches: [main]",
      "on:\n  [\n    pull_request_target,\n  ]"
    ),
    name: "改行Flow sequenceの危険なpull_request_targetトリガー",
    rule: "no-pull-request-target",
  },
  {
    content: validWorkflow.replace(
      "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
      "cancel-in-progress: true"
    ),
    name: "pushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow.replace(
      "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
      "cancel-in-progress: ${{ true }}"
    ),
    name: "式形式のpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow.replace(
      "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
      "cancel-in-progress: ${{ 1 == 1 }}"
    ),
    name: "常に真になる比較式のpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow.replace(
      "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
      "cancel-in-progress: ${{ (1 == 1) }}"
    ),
    name: "括弧付き常に真になる比較式のpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow
      .replace("on:\n  push:\n    branches: [main]", "on:\n  - push")
      .replace(
        "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
        "cancel-in-progress: true"
      ),
    name: "Block sequenceのpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow
      .replace("on:\n  push:\n    branches: [main]", "on:\n  -\n    push")
      .replace(
        "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
        "cancel-in-progress: true"
      ),
    name: "standalone dash後のpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow.replace(
      "    steps:",
      "    concurrency:\n      group: job\n      cancel-in-progress: true\n    steps:"
    ),
    name: "Job単位のpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
  {
    content: validWorkflow.replace(
      "  check:\n    runs-on: ubuntu-latest\n    timeout-minutes: 5\n    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "  check: { runs-on: ubuntu-latest, timeout-minutes: 5, concurrency: { group: check, cancel-in-progress: true }, steps: [] }"
    ),
    name: "Flow形式Job単位のpushでの無条件キャンセル",
    rule: "conditional-cancel-in-progress",
  },
]

describe("GitHub Actions Workflowの規約", () => {
  const workflowFiles = fs
    .readdirSync(workflowDirectory, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.ya?ml$/.test(entry.name))
    .map(entry => entry.name)
    .sort()

  it("Workflowファイルが存在する", () => {
    expect(workflowFiles.length).toBeGreaterThan(0)
  })

  describe.each(workflowFiles)("%s", fileName => {
    it("セキュリティと再現性の規約を満たす", () => {
      const content = fs.readFileSync(
        path.join(workflowDirectory, fileName),
        "utf-8"
      )
      expect(inspectWorkflow(content)).toEqual([])
    })
  })

  it("最小権限のcontents: readを許可する", () => {
    const minimalPermissions = validWorkflow.replace(
      "permissions: {}",
      "permissions:\n  contents: read"
    )
    expect(inspectWorkflow(minimalPermissions)).toEqual([])
  })

  it("インラインFlow形式の最小権限を許可する", () => {
    const minimalPermissions = validWorkflow.replace(
      "permissions: {}",
      "permissions: { contents: read }"
    )
    expect(inspectWorkflow(minimalPermissions)).toEqual([])
  })

  it("改行Flow形式の最小権限を許可する", () => {
    const minimalPermissions = validWorkflow.replace(
      "permissions: {}",
      "permissions: {\n  contents: read\n}"
    )
    expect(inspectWorkflow(minimalPermissions)).toEqual([])
  })

  it("改行空Flow形式の権限を許可する", () => {
    const minimalPermissions = validWorkflow.replace(
      "permissions: {}",
      "permissions: {\n}"
    )
    expect(inspectWorkflow(minimalPermissions)).toEqual([])
  })

  it("改行Flow sequence内のActionに付けたバージョンコメントを検査する", () => {
    const content = validWorkflow.replace(
      "    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "    steps: [\n      { uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb }, # v2.0.0\n    ]"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("複数行Flow mapの末尾にあるActionコメントを検査する", () => {
    const content = validWorkflow.replace(
      "    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "    steps: [\n      {\n        uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\n      }, # v2.0.0\n    ]"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("複数行Flow形式Job内のActionコメントを検査する", () => {
    const content = [
      "name: Test",
      "on: push",
      "permissions: {}",
      "jobs:",
      "  check: {",
      "    runs-on: ubuntu-latest,",
      "    timeout-minutes: 5,",
      "    steps: [",
      "      {",
      "        uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "      }, # v2.0.0",
      "    ]",
      "  }",
    ].join("\n")
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("Actionの大文字SHAと正確なバージョンコメントを許可する", () => {
    const uppercaseSha = validWorkflow.replace(
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
    )
    expect(inspectWorkflow(uppercaseSha)).toEqual([])
  })

  it("run本文やAction入力値を規約違反として誤認しない", () => {
    const content = validWorkflow.replace(
      "      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      [
        "      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
        "        with:",
        "          uses: example/action@v1",
        "      - name: shell",
        "        run: |",
        "          echo 'uses: example/action@v1'",
        "          echo 'cancel-in-progress: true'",
      ].join("\n")
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("数値付きblock scalarの本文をActionとして誤認しない", () => {
    const content = validWorkflow.replace(
      "      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      [
        "      - name: shell",
        "        run: |2",
        "          uses: example/action@v1",
      ].join("\n")
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("JobのenvにあるusesをActionとして誤認しない", () => {
    const content = validWorkflow.replace(
      "    runs-on: ubuntu-latest",
      [
        "    runs-on: ubuntu-latest",
        "    env:",
        "      uses: example/action@v1",
      ].join("\n")
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("dash単独行で始まるcheckout stepを正しく扱う", () => {
    const content = validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      -\n        uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("inline Flow形式のcheckoutで認証情報を無効化できる", () => {
    const content = validWorkflow.replace(
      "    steps:\n      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false\n      - uses: actions/setup-node@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb # v2.0.0",
      "    steps: [{ uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, with: { persist-credentials: false } }] # v1.0.0"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("withが先にあるブロック形式のcheckoutで認証情報を無効化できる", () => {
    const content = validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      - with:\n          persist-credentials: false\n        uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("usesが先にある空値withのFlow形式checkoutで認証情報を無効化できる", () => {
    const content = validWorkflow.replace(
      "        with:\n          persist-credentials: false",
      "        with:\n          { persist-credentials: false }"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("withが先にある空値Flow形式checkoutで認証情報を無効化できる", () => {
    const content = validWorkflow.replace(
      "      - uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0\n        with:\n          persist-credentials: false",
      "      - with:\n        { persist-credentials: false }\n        uses: actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa # v1.0.0"
    )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it("pushでない本文の文字列をpushトリガーとして誤認しない", () => {
    const content = validWorkflow
      .replace(
        "on:\n  push:\n    branches: [main]",
        [
          "on:",
          "  workflow_dispatch:",
          "    inputs:",
          "      note:",
          "        description: push",
        ].join("\n")
      )
      .replace(
        "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
        "cancel-in-progress: true"
      )
    expect(inspectWorkflow(content)).toEqual([])

    const quotedPush = validWorkflow.replace("on:\n  push:", '"on":\n  "push":')
    expect(inspectWorkflow(quotedPush)).toEqual([])
  })

  it("on配下のネストした選択肢をpushトリガーとして誤認しない", () => {
    const content = validWorkflow
      .replace(
        "on:\n  push:\n    branches: [main]",
        [
          "on:",
          "  workflow_dispatch:",
          "    inputs:",
          "      target:",
          "        type: choice",
          "        options:",
          "          - push",
        ].join("\n")
      )
      .replace(
        "cancel-in-progress: ${{ github.event_name == 'pull_request' }}",
        "cancel-in-progress: true"
      )
    expect(inspectWorkflow(content)).toEqual([])
  })

  it.each(violationFixtures)("$nameを検出する", ({ content, rule }) => {
    expect(inspectWorkflow(content).map(violation => violation.rule)).toContain(
      rule
    )
  })
})
