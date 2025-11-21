/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import {
  DiscordMemberCount,
  formatMemberCount,
} from "../discord-member-count"
import * as discordApi from "@/lib/discord-api"

// discord-apiモジュールをモック
jest.mock("@/lib/discord-api")

// discord-member-count-clientをモック
jest.mock("../discord-member-count-client", () => ({
  DiscordMemberCountClient: ({
    formattedCount,
  }: {
    formattedCount: string
  }) => <div data-testid="member-count">{formattedCount}</div>,
}))

describe("formatMemberCount", () => {
  it("メンバー数が0の場合は空文字を返す", () => {
    expect(formatMemberCount(0)).toBe("")
  })

  it("10の位を切り捨ててフォーマットする（例: 1234 -> 1,230+）", () => {
    expect(formatMemberCount(1234)).toBe("1,230+")
  })

  it("10の位を切り捨ててフォーマットする（例: 567 -> 560+）", () => {
    expect(formatMemberCount(567)).toBe("560+")
  })

  it("10の位を切り捨ててフォーマットする（例: 99 -> 90+）", () => {
    expect(formatMemberCount(99)).toBe("90+")
  })

  it("カンマ区切りでフォーマットする（例: 12345 -> 12,340+）", () => {
    expect(formatMemberCount(12345)).toBe("12,340+")
  })

  it("一桁の場合も正しくフォーマットする（例: 5 -> 0+）", () => {
    expect(formatMemberCount(5)).toBe("0+")
  })
})

describe("DiscordMemberCount", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // console.errorをモック化してテスト出力を抑制
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("メンバー数を正しく表示する", async () => {
    // getDiscordMemberCountをモック
    jest
      .spyOn(discordApi, "getDiscordMemberCount")
      .mockResolvedValue(1234)

    const component = await DiscordMemberCount()
    const { container } = render(component)

    // フォーマットされたメンバー数が表示されることを確認
    expect(container.textContent).toContain("1,230+")
  })

  it("メンバー数が0の場合はnullを返す", async () => {
    jest.spyOn(discordApi, "getDiscordMemberCount").mockResolvedValue(0)

    const component = await DiscordMemberCount()

    expect(component).toBeNull()
  })

  it("エラーが発生した場合はnullを返す", async () => {
    jest
      .spyOn(discordApi, "getDiscordMemberCount")
      .mockRejectedValue(new Error("API Error"))

    const component = await DiscordMemberCount()

    expect(component).toBeNull()
    // console.errorが呼ばれたことを確認
    expect(console.error).toHaveBeenCalledWith(
      "Failed to display Discord member count:",
      expect.any(Error)
    )
  })

  it("DiscordMemberCountClientに正しいpropsを渡す", async () => {
    jest
      .spyOn(discordApi, "getDiscordMemberCount")
      .mockResolvedValue(567)

    const component = await DiscordMemberCount()
    const { getByTestId } = render(component)

    // モックされたクライアントコンポーネントにフォーマットされた値が渡されることを確認
    const memberCount = getByTestId("member-count")
    expect(memberCount).toHaveTextContent("560+")
  })
})
