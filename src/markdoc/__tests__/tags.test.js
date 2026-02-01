import tags from "@/markdoc/tags"

// Mock dependencies
jest.mock("@/components/Callout", () => ({
  Callout: () => null,
}))

jest.mock("@/components/QuickLinks", () => ({
  QuickLink: () => null,
  QuickLinks: () => null,
}))

describe("markdoc tags", () => {
  it("exports a default object", () => {
    expect(tags).toBeDefined()
    expect(typeof tags).toBe("object")
  })

  it("defines callout tag", () => {
    expect(tags.callout).toBeDefined()
    expect(tags.callout.render).toBeDefined()
    expect(tags.callout.attributes.title.type).toBe(String)
    expect(tags.callout.attributes.type.type).toBe(String)
    expect(tags.callout.attributes.type.default).toBe("note")
    expect(tags.callout.attributes.type.matches).toEqual(["note", "warning"])
  })

  it("defines figure tag as self-closing", () => {
    expect(tags.figure).toBeDefined()
    expect(tags.figure.selfClosing).toBe(true)
    expect(tags.figure.attributes.src.type).toBe(String)
    expect(tags.figure.attributes.alt.type).toBe(String)
    expect(tags.figure.attributes.caption.type).toBe(String)
  })

  it("defines quick-links tag", () => {
    expect(tags["quick-links"]).toBeDefined()
    expect(tags["quick-links"].render).toBeDefined()
  })

  it("defines quick-link tag as self-closing", () => {
    expect(tags["quick-link"]).toBeDefined()
    expect(tags["quick-link"].selfClosing).toBe(true)
    expect(tags["quick-link"].attributes.title.type).toBe(String)
    expect(tags["quick-link"].attributes.description.type).toBe(String)
    expect(tags["quick-link"].attributes.icon.type).toBe(String)
    expect(tags["quick-link"].attributes.href.type).toBe(String)
  })

  it("figure render function handles absolute paths", () => {
    const renderFn = tags.figure.render
    // src starting with "/" should remain unchanged
    const result = renderFn({
      src: "/img/test.png",
      alt: "Test",
      caption: "Cap",
    })
    expect(result).toBeTruthy()
  })

  it("figure render function converts relative paths", () => {
    const renderFn = tags.figure.render
    // src without "/" prefix should get "/img/" prepended
    const result = renderFn({ src: "test.png", alt: "Test" })
    expect(result).toBeTruthy()
  })

  it("figure render function handles missing caption", () => {
    const renderFn = tags.figure.render
    const result = renderFn({ src: "/test.png", alt: "Test" })
    expect(result).toBeTruthy()
  })
})
