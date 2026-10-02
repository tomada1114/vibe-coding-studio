import { LiveClock } from "@/components/geist/live-clock"
import {
  installFakeMatchMedia,
  type FakeMatchMedia,
} from "@/test-utils/fake-match-media"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { renderToString } from "react-dom/server"

// 2026-07-01 15:41:12 UTC = デンバー（夏時間 UTC-6）の 09:41:12 MDT
const NOW = new Date("2026-07-01T15:41:12Z")
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

const messages = {
  location: "Colorado, US",
  ahead: "{hours}h ahead of you",
  behind: "{hours}h behind you",
  same: "Same time as you",
  pause: "Pause the clock",
}

function renderClock(viewerTimeZone = "America/Denver") {
  return render(
    <LiveClock
      timeZone="America/Denver"
      messages={messages}
      viewerTimeZone={viewerTimeZone}
    />
  )
}

function advance(ms: number) {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

describe("LiveClock", () => {
  let media: FakeMatchMedia

  beforeEach(() => {
    jest.useFakeTimers({ now: NOW })
    media = installFakeMatchMedia()
  })

  afterEach(() => {
    jest.useRealTimers()
    media.restore()
  })

  it("サーバー描画では時刻に依存しないプレースホルダを出す（ハイドレーション不一致を起こさない）", () => {
    const html = renderToString(
      <LiveClock timeZone="America/Denver" messages={messages} />
    )
    expect(html).not.toContain("09:41")
    expect(html).toContain("Colorado, US")
  })

  it("マウント後に現地時刻とタイムゾーン略称を表示し、1 秒ごとに進む", () => {
    renderClock()

    expect(screen.getByText("09:41:12")).toBeInTheDocument()
    expect(screen.getByText("MDT")).toBeInTheDocument()

    advance(1000)
    expect(screen.getByText("09:41:13")).toBeInTheDocument()
  })

  it.each([
    ["Asia/Tokyo", "15h behind you"],
    ["America/Denver", "Same time as you"],
    ["America/New_York", "2h behind you"],
  ])("閲覧者が %s なら「%s」と出す", (viewer, expected) => {
    renderClock(viewer)
    expect(screen.getByText(expected)).toBeInTheDocument()
  })

  it("閲覧者のタイムゾーンが判別できなくても時刻は出し、時差だけを省く", () => {
    renderClock("Etc/Unknown")

    expect(screen.getByText("09:41:12")).toBeInTheDocument()
    expect(screen.queryByText(/you/)).not.toBeInTheDocument()
  })

  it("一時停止ボタンで更新を止め、もう一度押すと再開する（WCAG 2.2.2）", () => {
    renderClock()
    const button = screen.getByRole("button", { name: "Pause the clock" })
    expect(button).toHaveAttribute("aria-pressed", "false")

    fireEvent.click(button)
    advance(3000)
    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByText("09:41:12")).toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.getByText("09:41:15")).toBeInTheDocument()
  })

  it("視差効果を減らす設定では秒を出さない", () => {
    media.set(REDUCED_MOTION, true)
    renderClock()

    expect(screen.getByText("09:41")).toBeInTheDocument()
    expect(screen.queryByText("09:41:12")).not.toBeInTheDocument()
  })

  it("表示中に視差効果を減らす設定へ切り替わったら、秒を出すのをやめる", () => {
    renderClock()
    expect(screen.getByText("09:41:12")).toBeInTheDocument()

    act(() => {
      media.set(REDUCED_MOTION, true)
    })
    expect(screen.getByText("09:41")).toBeInTheDocument()
  })
})
