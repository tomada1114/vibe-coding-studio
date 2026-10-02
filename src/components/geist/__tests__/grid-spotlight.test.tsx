import { GridSpotlight } from "@/components/geist/grid-spotlight"
import {
  installFakeMatchMedia,
  type FakeMatchMedia,
} from "@/test-utils/fake-match-media"
import { act, fireEvent, render, screen } from "@testing-library/react"

const FINE_POINTER = "(hover: hover) and (pointer: fine)"
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/** 画面上の (left, top) に幅 400 × 高さ 200 で置かれた要素として振る舞わせる */
function placeAt(element: HTMLElement, left: number, top: number) {
  element.getBoundingClientRect = () =>
    ({
      left,
      top,
      right: left + 400,
      bottom: top + 200,
      width: 400,
      height: 200,
      x: left,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect
}

function renderGrid() {
  const result = render(
    <>
      <div data-testid="grid" data-spotlight="" />
      <GridSpotlight />
    </>
  )
  const grid = screen.getByTestId("grid")
  placeAt(grid, 100, 200)
  return { grid, ...result }
}

function flushFrame() {
  act(() => {
    jest.advanceTimersByTime(32)
  })
}

function movePointer(x: number, y: number) {
  // jsdom は PointerEvent を持たないので、座標を運べる MouseEvent で代用する
  fireEvent(window, new MouseEvent("pointermove", { clientX: x, clientY: y }))
  flushFrame()
}

describe("GridSpotlight", () => {
  let media: FakeMatchMedia

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    media.restore()
  })

  it("ポインタ位置を要素内の座標として CSS 変数に渡し、スポットを点ける", () => {
    media = installFakeMatchMedia([FINE_POINTER])
    const { grid } = renderGrid()

    movePointer(130, 260)

    expect(grid.style.getPropertyValue("--spot-x")).toBe("30px")
    expect(grid.style.getPropertyValue("--spot-y")).toBe("60px")
    expect(grid.style.getPropertyValue("--spot-o")).toBe("1")
  })

  it("要素から離れるとスポットを消す", () => {
    media = installFakeMatchMedia([FINE_POINTER])
    const { grid } = renderGrid()

    movePointer(130, 260)
    movePointer(1200, 900)

    expect(grid.style.getPropertyValue("--spot-o")).toBe("0")
  })

  it("ポインタが窓の外へ出るとスポットを消す", () => {
    media = installFakeMatchMedia([FINE_POINTER])
    const { grid } = renderGrid()

    movePointer(130, 260)
    fireEvent.pointerLeave(document.documentElement)
    flushFrame()

    expect(grid.style.getPropertyValue("--spot-o")).toBe("0")
  })

  it("スクロールで要素が動いたら、同じポインタ位置で座標を測り直す", () => {
    media = installFakeMatchMedia([FINE_POINTER])
    const { grid } = renderGrid()

    movePointer(130, 260)
    placeAt(grid, 100, 100)
    fireEvent.scroll(window)
    flushFrame()

    expect(grid.style.getPropertyValue("--spot-y")).toBe("160px")
  })

  it.each([
    ["タッチ端末（hover できないポインタ）", []],
    ["視差効果を減らす設定", [FINE_POINTER, REDUCED_MOTION]],
  ])("%s では何もしない", (_, matching) => {
    media = installFakeMatchMedia(matching)
    const { grid } = renderGrid()

    movePointer(130, 260)

    expect(grid.style.getPropertyValue("--spot-o")).toBe("")
  })

  it("表示中に視差効果を減らす設定へ切り替わったら、消灯して追従をやめる", () => {
    media = installFakeMatchMedia([FINE_POINTER])
    const { grid } = renderGrid()
    movePointer(130, 260)

    act(() => {
      media.set(REDUCED_MOTION, true)
    })
    movePointer(330, 260)

    expect(grid.style.getPropertyValue("--spot-o")).toBe("0")
    expect(grid.style.getPropertyValue("--spot-x")).toBe("30px")
  })

  it("アンマウントするとポインタを追わなくなる", () => {
    media = installFakeMatchMedia([FINE_POINTER])
    const { grid, unmount } = renderGrid()

    unmount()
    movePointer(130, 260)

    expect(grid.style.getPropertyValue("--spot-x")).toBe("")
  })
})
