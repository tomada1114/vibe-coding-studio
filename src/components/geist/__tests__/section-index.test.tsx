import { SectionIndex } from "@/components/geist/section-index"
import { act, fireEvent, render, screen } from "@testing-library/react"

const items = [
  { id: "book", label: "著書" },
  { id: "career", label: "経歴" },
  { id: "links", label: "リンク" },
]

/** セクションの上端を画面上の y に置く */
function placeTop(id: string, top: number) {
  const element = document.getElementById(id)!
  element.getBoundingClientRect = () =>
    ({
      top,
      bottom: top + 400,
      left: 0,
      right: 0,
      width: 0,
      height: 400,
      x: 0,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect
}

/** ページの高さと現在のスクロール位置を与える（jsdom はレイアウトを持たない） */
function setScroll(scrollHeight: number, scrollY: number) {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  })
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: scrollY,
  })
}

function renderIndex() {
  render(
    <>
      <SectionIndex label="ページ内目次" items={items} />
      {items.map(item => (
        <section key={item.id} id={item.id}>
          <h2>{item.label}</h2>
        </section>
      ))}
    </>
  )
}

function flushFrame() {
  act(() => {
    jest.advanceTimersByTime(32)
  })
}

function scroll() {
  fireEvent.scroll(window)
  flushFrame()
}

function link(name: string) {
  return screen.getByRole("link", { name })
}

describe("SectionIndex", () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView
  let scrolled: Element[]

  beforeEach(() => {
    jest.useFakeTimers()
    scrolled = []
    Element.prototype.scrollIntoView = function (this: Element) {
      scrolled.push(this)
    }
    // jsdom の innerHeight は 768。40% の線は 307.2px
    setScroll(0, 0)
  })

  afterEach(() => {
    jest.useRealTimers()
    Element.prototype.scrollIntoView = originalScrollIntoView
    window.history.replaceState(null, "", "/")
  })

  it("各セクションへのページ内リンクを番号付きで並べる", () => {
    renderIndex()

    const nav = screen.getByRole("navigation", { name: "ページ内目次" })
    expect(nav).toBeInTheDocument()
    items.forEach((item, index) => {
      expect(link(item.label)).toHaveAttribute("href", `#${item.id}`)
      expect(link(item.label)).toHaveTextContent(
        String(index + 1).padStart(2, "0")
      )
    })
  })

  it("読んでいる位置（画面上部 40% の線を越えた最後のセクション）を現在地にする", () => {
    renderIndex()
    placeTop("book", -600)
    placeTop("career", 120)
    placeTop("links", 900)

    scroll()

    expect(link("経歴")).toHaveAttribute("aria-current", "true")
    expect(link("著書")).not.toHaveAttribute("aria-current")
  })

  it("どのセクションにも達していないうちは現在地を持たない", () => {
    renderIndex()
    placeTop("book", 500)
    placeTop("career", 1200)
    placeTop("links", 2000)

    scroll()

    items.forEach(item => {
      expect(link(item.label)).not.toHaveAttribute("aria-current")
    })
  })

  it("最下部まで来たら、読む線に届かない最後のセクションを現在地にする", () => {
    renderIndex()
    placeTop("book", -1200)
    placeTop("career", 100)
    placeTop("links", 500)
    setScroll(3000, 3000 - 768)

    scroll()

    expect(link("リンク")).toHaveAttribute("aria-current", "true")
  })

  it("クリックするとセクションへ移動し、フォーカスを見出しへ、URL のハッシュも移す", () => {
    renderIndex()

    fireEvent.click(link("経歴"))

    const career = document.getElementById("career")!
    expect(scrolled).toEqual([career])
    expect(document.activeElement).toBe(career.querySelector("h2"))
    expect(window.location.hash).toBe("#career")
  })

  it("修飾キー付きのクリック（新しいタブで開く等）はブラウザに任せる", () => {
    renderIndex()

    const notPrevented = fireEvent.click(link("経歴"), { metaKey: true })

    expect(notPrevented).toBe(true)
    expect(scrolled).toEqual([])
  })

  it("クリックした項目は、利用者が自分でスクロールするまで現在地のまま保つ", () => {
    renderIndex()
    fireEvent.click(link("経歴"))

    // 縦に長い画面では、移動先が最下部と重なり末尾が「現在地」と判定されうる
    placeTop("book", -1200)
    placeTop("career", 100)
    placeTop("links", 500)
    setScroll(3000, 3000 - 768)
    scroll()
    expect(link("経歴")).toHaveAttribute("aria-current", "true")

    fireEvent.wheel(window)
    flushFrame()
    expect(link("リンク")).toHaveAttribute("aria-current", "true")
  })
})
