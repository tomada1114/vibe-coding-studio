import {
  describeTimeDifference,
  formatClock,
  getHourDifference,
  getTimeZoneAbbreviation,
} from "@/lib/local-time"

// 期待値はタイムゾーンの事実から導く:
//   America/Denver は夏時間 UTC-6（MDT）/ 標準時 UTC-7（MST）
//   Asia/Tokyo は UTC+9 で夏時間なし
//   Asia/Kolkata は UTC+5:30
const SUMMER = new Date("2026-07-01T15:41:12Z")
const WINTER = new Date("2026-01-15T15:41:12Z")

describe("formatClock", () => {
  it("指定タイムゾーンの時刻を 24 時間制・ゼロ埋めで返す", () => {
    expect(formatClock(SUMMER, "America/Denver")).toBe("09:41:12")
    expect(formatClock(WINTER, "America/Denver")).toBe("08:41:12")
    expect(formatClock(SUMMER, "Asia/Tokyo")).toBe("00:41:12")
  })

  it("秒を省略できる", () => {
    expect(formatClock(SUMMER, "America/Denver", { seconds: false })).toBe(
      "09:41"
    )
  })
})

describe("getTimeZoneAbbreviation", () => {
  // 米国の夏時間は 3 月第 2 日曜 2:00（MST）に始まり、11 月第 1 日曜 2:00（MDT）に終わる。
  // 2026 年は 3/8 09:00 UTC と 11/1 08:00 UTC が切り替わりの瞬間。
  it.each([
    [SUMMER, "MDT"],
    [WINTER, "MST"],
    [new Date("2026-03-08T08:59:59Z"), "MST"],
    [new Date("2026-03-08T09:00:00Z"), "MDT"],
    [new Date("2026-11-01T07:59:59Z"), "MDT"],
    [new Date("2026-11-01T08:00:00Z"), "MST"],
  ])("%s のデンバーは %s", (date, expected) => {
    expect(getTimeZoneAbbreviation(date, "America/Denver")).toBe(expected)
  })
})

describe("getHourDifference", () => {
  it.each([
    // [基準の瞬間, 相手, 自分, 自分から見た相手の進み（時間）]
    [SUMMER, "America/Denver", "Asia/Tokyo", -15],
    [WINTER, "America/Denver", "Asia/Tokyo", -16],
    [SUMMER, "America/Denver", "America/Denver", 0],
    [SUMMER, "Asia/Tokyo", "America/Denver", 15],
    [SUMMER, "America/Denver", "Asia/Kolkata", -11.5],
    // 米国は 3/8 から夏時間、英国は 3/29 から。その間だけ差が 1 時間縮む
    [new Date("2026-03-20T12:00:00Z"), "America/Denver", "Europe/London", -6],
    [SUMMER, "America/Denver", "Europe/London", -7],
  ])("%s: %s は %s から見て %d 時間", (date, target, viewer, expected) => {
    expect(getHourDifference(date, target, viewer)).toBe(expected)
  })
})

describe("describeTimeDifference", () => {
  const templates = {
    ahead: "{hours}h ahead of you",
    behind: "{hours}h behind you",
    same: "Same time as you",
  }

  it.each([
    [-15, "15h behind you"],
    [3, "3h ahead of you"],
    [0, "Same time as you"],
    [-11.5, "11.5h behind you"],
  ])("%d 時間の差を文に埋め込む", (hours, expected) => {
    expect(describeTimeDifference(hours, templates)).toBe(expected)
  })
})
