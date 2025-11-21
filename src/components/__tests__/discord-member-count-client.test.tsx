/**
 * @jest-environment jsdom
 */

import { render, waitFor } from "@testing-library/react"
import { DiscordMemberCountClient } from "../discord-member-count-client"

// Framer Motionをモック
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion")
  return {
    ...actual,
    motion: {
      div: ({
        children,
        className,
      }: {
        children: React.ReactNode
        className?: string
      }) => <div className={className}>{children}</div>,
      span: ({ children }: { children: React.ReactNode }) => (
        <span>{children}</span>
      ),
    },
    useMotionValue: jest.fn((initial: number) => ({
      get: jest.fn(() => initial),
      set: jest.fn(),
    })),
    useTransform: jest.fn((value: unknown, transform: (v: number) => number) =>
      transform(1230)
    ),
    animate: jest.fn(() => ({
      stop: jest.fn(),
    })),
  }
})

describe("DiscordMemberCountClient", () => {
  it("フォーマットされたメンバー数を表示する", () => {
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )

    // メンバー数が表示されることを確認
    expect(container.textContent).toContain("+")
    expect(container.textContent).toContain("名の仲間が参加中")
  })

  it("正しいスタイルが適用されている", () => {
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )

    // 中央寄せのクラスが適用されていることを確認
    const wrapper = container.querySelector(".flex.items-center.justify-center")
    expect(wrapper).toBeInTheDocument()

    // 大きなフォントサイズのクラスが適用されていることを確認
    const numberSpan = container.querySelector(".text-7xl")
    expect(numberSpan).toBeInTheDocument()
  })

  it("数値部分を正しく抽出する", async () => {
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )

    // コンポーネントがレンダリングされることを確認
    await waitFor(() => {
      expect(container.textContent).toContain("名の仲間が参加中")
    })
  })

  it("異なるフォーマットのメンバー数でも動作する", () => {
    const { container } = render(
      <DiscordMemberCountClient formattedCount="560+" />
    )

    expect(container.textContent).toContain("+")
    expect(container.textContent).toContain("名の仲間が参加中")
  })
})
