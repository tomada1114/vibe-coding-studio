import fs from "fs"
import path from "path"

// このテストはリポジトリのスキル基盤（.claude/skills/・.agents/skills/・AGENTS.md の
// スキル表）が壊れていないかを機械的に検査する。src/ は対象にしないため、
// jest.config.js の coverageThreshold には影響しない。
//
// frontmatter は YAML のごく限られたサブセット（トップレベルキー + 折り畳みブロック
// スカラー）しか使わないので、依存を増やさずに自前の最小パーサで読む。

describe("スキル基盤", () => {
  const repoRoot = process.cwd()
  const skillsDir = path.join(repoRoot, ".claude", "skills")
  const agentsSkillsDir = path.join(repoRoot, ".agents", "skills")
  const agentsMdPath = path.join(repoRoot, "AGENTS.md")

  function listSkillDirs(): string[] {
    return fs
      .readdirSync(skillsDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
  }

  // frontmatter のトップレベルキーだけを拾う。折り畳みブロックスカラー（`|`/`>`）の
  // 継続行はインデントされているので、行頭が空白でないものだけをキーとみなす。
  function parseFrontmatterKeys(content: string): string[] {
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return []
    const body = match[1]
    return body
      .split("\n")
      .filter(line => /^[A-Za-z0-9_-]+:/.test(line))
      .map(line => line.split(":")[0])
  }

  function parseFrontmatterValue(content: string, key: string): string | null {
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return null
    const body = match[1]
    const lines = body.split("\n")
    const startIndex = lines.findIndex(line =>
      new RegExp(`^${key}:`).test(line)
    )
    if (startIndex === -1) return null

    const firstLine = lines[startIndex]
    const inlineValue = firstLine.slice(firstLine.indexOf(":") + 1).trim()

    // 折り畳みブロックスカラー（`|` または `>`）なら、以降のインデント行を集める。
    if (inlineValue === "|" || inlineValue === ">") {
      const collected: string[] = []
      for (let i = startIndex + 1; i < lines.length; i++) {
        if (/^[A-Za-z0-9_-]+:/.test(lines[i])) break
        if (lines[i].trim() === "") continue
        collected.push(lines[i].trim())
      }
      return collected.join(" ")
    }

    return inlineValue
  }

  const skillDirs = listSkillDirs()

  it("スキルディレクトリが1つ以上存在する", () => {
    expect(skillDirs.length).toBeGreaterThan(0)
  })

  describe.each(skillDirs)("%s", dirName => {
    const skillDir = path.join(skillsDir, dirName)

    it("SKILL.md が1つだけ存在する（入れ子のSKILL.mdは禁止）", () => {
      function findSkillMdFiles(dir: string): string[] {
        const found: string[] = []
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const entryPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            found.push(...findSkillMdFiles(entryPath))
          } else if (entry.name === "SKILL.md") {
            found.push(entryPath)
          }
        }
        return found
      }

      const found = findSkillMdFiles(skillDir)
      expect(found).toEqual([path.join(skillDir, "SKILL.md")])
    })

    it("frontmatter のキーは name と description のみ", () => {
      const content = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf-8")
      const keys = parseFrontmatterKeys(content)
      expect(keys).toEqual(["name", "description"])
    })

    it("name がディレクトリ名と一致する", () => {
      const content = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf-8")
      expect(parseFrontmatterValue(content, "name")).toBe(dirName)
    })

    it("description が空でない", () => {
      const content = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf-8")
      const description = parseFrontmatterValue(content, "description")
      expect(description).not.toBeNull()
      expect(description!.length).toBeGreaterThan(0)
    })

    it("本文に境界宣言（扱う／扱わない）がある", () => {
      const content = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf-8")
      expect(content).toMatch(/\*\*扱う:\*\*/)
      expect(content).toMatch(/\*\*扱わない:\*\*/)
    })

    it(".agents/skills/ から .claude/skills/ への正しいシンボリックリンクがある", () => {
      const linkPath = path.join(agentsSkillsDir, dirName)
      const stat = fs.lstatSync(linkPath)
      expect(stat.isSymbolicLink()).toBe(true)
      expect(fs.readlinkSync(linkPath)).toBe(
        path.join("..", "..", ".claude", "skills", dirName)
      )
    })
  })

  describe("AGENTS.md のスキル表", () => {
    const agentsMd = fs.readFileSync(agentsMdPath, "utf-8")

    // `## スキル` セクション内の表だけを対象にする（他セクションに `skill-name` が
    // 出てきても誤検出しないように、次の `## ` 見出しまでで区切る）。
    function extractSkillsSection(content: string): string {
      const match = content.match(/## スキル\n([\s\S]*?)(?=\n## )/)
      if (!match) {
        throw new Error("AGENTS.md に `## スキル` セクションが見つからない")
      }
      return match[1]
    }

    function extractTableSkillNames(section: string): string[] {
      return Array.from(section.matchAll(/`([a-z0-9-]+)`/g)).map(m => m[1])
    }

    it("`## スキル` セクションが存在する", () => {
      expect(() => extractSkillsSection(agentsMd)).not.toThrow()
    })

    it("全スキルディレクトリの行が表にある（取りこぼし検出）", () => {
      const section = extractSkillsSection(agentsMd)
      const namesInTable = extractTableSkillNames(section)
      for (const dirName of skillDirs) {
        expect(namesInTable).toContain(dirName)
      }
    })

    it("表の各行が実在するディレクトリを指す（古い行の検出）", () => {
      const section = extractSkillsSection(agentsMd)
      const namesInTable = extractTableSkillNames(section)
      for (const name of namesInTable) {
        expect(skillDirs).toContain(name)
      }
    })
  })
})
