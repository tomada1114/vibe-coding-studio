// Mock ESM dependencies before importing
jest.mock("@sindresorhus/slugify", () => ({
  slugifyWithCounter: () => {
    return text => text.toLowerCase().replace(/\s+/g, "-")
  },
}))

jest.mock("js-yaml", () => ({
  load: str => {
    try {
      return JSON.parse(str)
    } catch {
      return {}
    }
  },
}))

jest.mock("@/components/DocsLayout", () => ({
  DocsLayout: () => null,
}))

jest.mock("@/components/Fence", () => ({
  Fence: () => null,
}))

import nodes from "@/markdoc/nodes"

describe("markdoc nodes", () => {
  it("exports a default object", () => {
    expect(nodes).toBeDefined()
    expect(typeof nodes).toBe("object")
  })

  it("defines a document node", () => {
    expect(nodes.document).toBeDefined()
    expect(nodes.document.render).toBeDefined()
  })

  it("defines a heading node", () => {
    expect(nodes.heading).toBeDefined()
  })

  it("defines a th node with scope attribute", () => {
    expect(nodes.th).toBeDefined()
    expect(nodes.th.attributes.scope).toBeDefined()
    expect(nodes.th.attributes.scope.default).toBe("col")
    expect(nodes.th.attributes.scope.type).toBe(String)
  })

  it("defines a fence node with language attribute", () => {
    expect(nodes.fence).toBeDefined()
    expect(nodes.fence.render).toBeDefined()
    expect(nodes.fence.attributes.language).toBeDefined()
    expect(nodes.fence.attributes.language.type).toBe(String)
  })

  it("document node has a transform function", () => {
    expect(typeof nodes.document.transform).toBe("function")
  })

  it("heading node has a transform function", () => {
    expect(typeof nodes.heading.transform).toBe("function")
  })
})
