import { timestampToSeconds } from "../timestamp"

describe("timestampToSeconds", () => {
  it("MM:SS 形式を秒に変換する", () => {
    expect(timestampToSeconds("12:34")).toBe(12 * 60 + 34)
  })

  it("00:00 は 0 秒になる", () => {
    expect(timestampToSeconds("00:00")).toBe(0)
  })

  it("HH:MM:SS 形式を秒に変換する", () => {
    expect(timestampToSeconds("1:02:03")).toBe(1 * 3600 + 2 * 60 + 3)
  })

  it("2桁時間の HH:MM:SS も変換できる", () => {
    expect(timestampToSeconds("10:00:05")).toBe(10 * 3600 + 5)
  })

  it("不正な形式は 0 を返す", () => {
    expect(timestampToSeconds("abc")).toBe(0)
    expect(timestampToSeconds("")).toBe(0)
  })
})
