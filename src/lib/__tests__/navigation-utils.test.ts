import { shouldShowNavigation } from "../navigation-utils"

describe("shouldShowNavigation", () => {
  describe("returns true", () => {
    it("for /docs/ruby path", () => {
      expect(shouldShowNavigation("/docs/ruby")).toBe(true)
    })

    it("for /docs/ruby/introduction path", () => {
      expect(shouldShowNavigation("/docs/ruby/introduction")).toBe(true)
    })

    it("for deeply nested docs path", () => {
      expect(shouldShowNavigation("/docs/ruby/introduction/what_is_ruby")).toBe(
        true
      )
    })
  })

  describe("returns false", () => {
    it("for /docs/ root path", () => {
      expect(shouldShowNavigation("/docs/")).toBe(false)
    })

    it("for /blog path", () => {
      expect(shouldShowNavigation("/blog")).toBe(false)
    })

    it("for /blog/post path", () => {
      expect(shouldShowNavigation("/blog/post")).toBe(false)
    })

    it("for root path", () => {
      expect(shouldShowNavigation("/")).toBe(false)
    })

    it("for empty string", () => {
      expect(shouldShowNavigation("")).toBe(false)
    })

    it("for non-docs path", () => {
      expect(shouldShowNavigation("/about")).toBe(false)
    })

    it("for /videos path", () => {
      expect(shouldShowNavigation("/videos")).toBe(false)
    })
  })
})
