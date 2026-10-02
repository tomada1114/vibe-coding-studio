import {
  TECH_ICON_SLUGS,
  TECH_ICON_SPRITE,
  TechIcon,
} from "@/components/geist/tech-icon"
import { getDictionary } from "@/i18n/dictionaries"
import { render } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const sprite = readFileSync(
  join(process.cwd(), "public", TECH_ICON_SPRITE),
  "utf8"
)

const stackItems = new Set(
  (["ja", "en"] as const).flatMap(locale =>
    getDictionary(locale).stack.groups.flatMap(group => group.items)
  )
)

describe("TechIcon", () => {
  it("ロゴがある技術はスプライトのシンボルを参照する", () => {
    const { container } = render(<TechIcon name="React" />)
    const use = container.querySelector("svg use")

    expect(use).toHaveAttribute(
      "href",
      `${TECH_ICON_SPRITE}#${TECH_ICON_SLUGS.React}`
    )
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true"
    )
  })

  it("ロゴが無い技術は頭文字のモノグラムで代用する", () => {
    const { container } = render(<TechIcon name="RSpec" />)

    expect(container.querySelector("svg")).toBeNull()
    const monogram = container.querySelector('[aria-hidden="true"]')
    expect(monogram).toHaveTextContent(/^R$/)
  })

  it("対応表のすべてのシンボルがスプライトに存在する", () => {
    Object.values(TECH_ICON_SLUGS).forEach(slug => {
      expect(sprite).toContain(`<symbol id="${slug}"`)
    })
  })

  it("対応表のキーはすべて辞書の技術スタックに存在する（表記揺れで黙ってモノグラムに落ちない）", () => {
    Object.keys(TECH_ICON_SLUGS).forEach(name => {
      expect(stackItems).toContain(name)
    })
  })
})
