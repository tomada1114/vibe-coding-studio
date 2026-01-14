/**
 * Category Icon Component Tests
 */

import type { CategoryIcon } from "@/lib/blog/categories"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { CategoryIconComponent } from "../CategoryIcon"

describe("CategoryIconComponent", () => {
  // Happy Path - Devicon
  test("Deviconアイコンが正しくレンダリングされる", () => {
    // Given: Deviconタイプのアイコン
    const icon: CategoryIcon = {
      type: "devicon",
      value: "javascript",
      size: "md",
    }

    // When: コンポーネントをレンダリング
    render(<CategoryIconComponent icon={icon} />)

    // Then: Deviconのクラスが適用される
    const iconElement = screen.getByLabelText("javascript icon")
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass("devicon-javascript-plain")
    expect(iconElement).toHaveClass("colored")
    expect(iconElement).toHaveClass("text-base") // md size
  })

  test("Deviconのサイズ'sm'が正しく適用される", () => {
    // Given: サイズsmのDeviconアイコン
    const icon: CategoryIcon = { type: "devicon", value: "react", size: "sm" }

    // When: コンポーネントをレンダリング
    render(<CategoryIconComponent icon={icon} />)

    // Then: text-smクラスが適用される
    const iconElement = screen.getByLabelText("react icon")
    expect(iconElement).toHaveClass("text-sm")
  })

  test("Deviconのサイズ'lg'が正しく適用される", () => {
    // Given: サイズlgのDeviconアイコン
    const icon: CategoryIcon = { type: "devicon", value: "python", size: "lg" }

    // When: コンポーネントをレンダリング
    render(<CategoryIconComponent icon={icon} />)

    // Then: text-xlクラスが適用される
    const iconElement = screen.getByLabelText("python icon")
    expect(iconElement).toHaveClass("text-xl")
  })

  // Happy Path - Emoji
  test("絵文字アイコンが正しくレンダリングされる", () => {
    // Given: 絵文字タイプのアイコン
    const icon: CategoryIcon = { type: "emoji", value: "📚", size: "sm" }

    // When: コンポーネントをレンダリング
    render(<CategoryIconComponent icon={icon} />)

    // Then: 絵文字が表示される
    const iconElement = screen.getByRole("img")
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveTextContent("📚")
    expect(iconElement).toHaveAttribute("aria-label", "📚 icon")
  })

  // Edge Case
  test("カスタムclassNameが適用される（Devicon）", () => {
    // Given: カスタムclassNameを持つDeviconアイコン
    const icon: CategoryIcon = { type: "devicon", value: "git", size: "md" }

    // When: classNameを指定してレンダリング
    render(<CategoryIconComponent icon={icon} className="ml-2" />)

    // Then: カスタムクラスが適用される
    const iconElement = screen.getByLabelText("git icon")
    expect(iconElement).toHaveClass("ml-2")
  })

  test("カスタムclassNameが適用される（絵文字）", () => {
    // Given: カスタムclassNameを持つ絵文字アイコン
    const icon: CategoryIcon = { type: "emoji", value: "💡", size: "md" }

    // When: classNameを指定してレンダリング
    render(<CategoryIconComponent icon={icon} className="mr-1" />)

    // Then: カスタムクラスが適用される
    const iconElement = screen.getByRole("img")
    expect(iconElement).toHaveClass("mr-1")
  })

  test("絵文字アイコンにinline-blockクラスが適用される", () => {
    // Given: 絵文字アイコン
    const icon: CategoryIcon = { type: "emoji", value: "🔧", size: "sm" }

    // When: コンポーネントをレンダリング
    render(<CategoryIconComponent icon={icon} />)

    // Then: inline-blockクラスが適用される
    const iconElement = screen.getByRole("img")
    expect(iconElement).toHaveClass("inline-block")
  })
})
