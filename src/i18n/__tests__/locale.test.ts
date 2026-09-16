import {
  getLocaleAlternates,
  getLocaleFromPathname,
  localizePath,
} from "@/i18n/locale"

describe("locale path helpers", () => {
  it("localizes each English-enabled path", () => {
    expect(localizePath("/", "en")).toBe("/en")
    expect(localizePath("/courses", "en")).toBe("/en/courses")
    expect(localizePath("/community", "en")).toBe("/en/community")
  })

  it("keeps the default locale unprefixed and unsupported paths unchanged", () => {
    expect(localizePath("/courses", "ja")).toBe("/courses")
    expect(localizePath("/legacy", "en")).toBe("/legacy")
  })

  it("returns matching alternates for localized pages", () => {
    expect(getLocaleAlternates("/courses")).toEqual({
      ja: "/courses",
      en: "/en/courses",
    })
    expect(getLocaleAlternates("/en/courses")).toEqual({
      ja: "/courses",
      en: "/en/courses",
    })
    expect(getLocaleAlternates("/community")).toEqual({
      ja: "/community",
      en: "/en/community",
    })
  })

  it("falls back to the English home for unsupported pages", () => {
    expect(getLocaleAlternates("/legacy")).toEqual({
      ja: "/legacy",
      en: "/en",
    })
    expect(getLocaleAlternates(null)).toEqual({ ja: "/", en: "/en" })
  })

  it("detects English paths", () => {
    expect(getLocaleFromPathname("/en")).toBe("en")
    expect(getLocaleFromPathname("/en/community")).toBe("en")
    expect(getLocaleFromPathname("/community")).toBe("ja")
  })
})
