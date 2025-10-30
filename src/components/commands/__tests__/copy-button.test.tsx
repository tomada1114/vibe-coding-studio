import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { CopyButton } from "../copy-button"

// Clipboard API のモック
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

describe("CopyButton", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("正常系: コピー機能", () => {
    it("ボタンが初期状態で 'コピー' と表示される", () => {
      render(<CopyButton textToCopy="test content" />)
      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent("コピー")
    })

    it("ボタンクリックでテキストがクリップボードにコピーされる", async () => {
      const testText = "Test markdown content"
      mockWriteText.mockResolvedValueOnce(undefined)

      render(<CopyButton textToCopy={testText} />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(testText)
        expect(mockWriteText).toHaveBeenCalledTimes(1)
      })
    })

    it("コピー成功後に成功フィードバックが表示される", async () => {
      mockWriteText.mockResolvedValueOnce(undefined)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      // ボタンのテキストが成功メッセージに変わる
      await waitFor(() => {
        expect(button).toHaveTextContent("コピーしました！")
      })
    })

    it("成功フィードバックは2秒後に初期状態に戻る", async () => {
      jest.useFakeTimers()
      mockWriteText.mockResolvedValueOnce(undefined)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      // 成功メッセージが表示される
      await waitFor(() => {
        expect(button).toHaveTextContent("コピーしました！")
      })

      // 2秒後に初期状態に戻る
      jest.advanceTimersByTime(2000)

      // タイマー実行後の状態更新を待つ
      await screen.findByText("コピー")
      expect(button).toHaveTextContent("コピー")

      jest.useRealTimers()
    })

    it("onCopySuccess コールバックが呼ばれる", async () => {
      const onSuccess = jest.fn()
      mockWriteText.mockResolvedValueOnce(undefined)

      render(<CopyButton textToCopy="test" onCopySuccess={onSuccess} />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("異常系: エラーハンドリング", () => {
    it("Clipboard API エラー時にエラーメッセージが表示される", async () => {
      const error = new Error("Clipboard write failed")
      mockWriteText.mockRejectedValueOnce(error)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText("コピー失敗")).toBeInTheDocument()
      })
    })

    it("onCopyError コールバックが呼ばれる", async () => {
      const onError = jest.fn()
      const error = new Error("Clipboard write failed")
      mockWriteText.mockRejectedValueOnce(error)

      render(<CopyButton textToCopy="test" onCopyError={onError} />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      await waitFor(() => {
        expect(onError).toHaveBeenCalledTimes(1)
        expect(onError).toHaveBeenCalledWith(error)
      })
    })

    it("エラー後、ボタンをクリックすると再試行できる", async () => {
      const error = new Error("Clipboard write failed")
      mockWriteText.mockRejectedValueOnce(error)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      // 最初のクリック（失敗）
      fireEvent.click(button)
      await waitFor(() => {
        expect(button).toHaveTextContent("コピー失敗")
      })

      // 再試行（成功）
      mockWriteText.mockResolvedValueOnce(undefined)
      fireEvent.click(button)

      await waitFor(() => {
        expect(button).toHaveTextContent("コピーしました！")
      })
    })
  })

  describe("Clipboard API が利用できない場合", () => {
    it("Clipboard API がない場合にフォールバック UI が表示される", () => {
      // Clipboard API を一時的に削除
      const originalClipboard = navigator.clipboard
      Object.defineProperty(navigator, "clipboard", {
        value: undefined,
        writable: true,
        configurable: true,
      })

      render(<CopyButton textToCopy="test" />)

      // フォールバックメッセージが表示される
      expect(
        screen.getByText(/手動でテキストを選択してコピーしてください/)
      ).toBeInTheDocument()

      // テキストエリアが表示される
      const textarea = screen.getByRole("textbox")
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveValue("test")

      // Clipboard API を復元
      Object.defineProperty(navigator, "clipboard", {
        value: originalClipboard,
        writable: true,
        configurable: true,
      })
    })

    it("フォールバック時のテキストエリアは読み取り専用", () => {
      const originalClipboard = navigator.clipboard
      Object.defineProperty(navigator, "clipboard", {
        value: undefined,
        writable: true,
        configurable: true,
      })

      render(<CopyButton textToCopy="test" />)
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement
      expect(textarea.readOnly).toBe(true)

      Object.defineProperty(navigator, "clipboard", {
        value: originalClipboard,
        writable: true,
        configurable: true,
      })
    })
  })

  describe("アクセシビリティ", () => {
    it("ボタンに適切な ARIA ラベルがある", () => {
      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button", {
        name: /コピー/,
      })
      expect(button).toBeInTheDocument()
    })

    it("ボタンが disabled 属性を持たない（常に操作可能）", () => {
      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")
      expect(button).not.toBeDisabled()
    })

    it("成功フィードバックがライブリージョンで通知される", async () => {
      mockWriteText.mockResolvedValueOnce(undefined)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      // aria-live 属性を持つ要素が存在する
      await waitFor(() => {
        const liveRegion = screen.getByRole("status")
        expect(liveRegion).toBeInTheDocument()
        expect(liveRegion).toHaveTextContent("コピーしました！")
      })
    })
  })

  describe("デザインシステム遵守", () => {
    it("Radiant デザインシステムのボタンスタイルが適用される", () => {
      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      // 基本スタイル
      expect(button).toHaveClass("rounded-full")
      expect(button).toHaveClass("px-4")
      expect(button).toHaveClass("py-2")

      // カラースタイル（idle状態）
      expect(button).toHaveClass("bg-gray-950")
      expect(button).toHaveClass("text-white")
    })

    it("ホバー時のトランジション効果がある", () => {
      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("transition-colors")
    })

    it("成功状態で緑色のスタイルが適用される", async () => {
      mockWriteText.mockResolvedValueOnce(undefined)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      await waitFor(() => {
        expect(button).toHaveClass("bg-green-600")
        expect(button).toHaveClass("text-white")
      })
    })

    it("エラー状態で赤色のスタイルが適用される", async () => {
      const error = new Error("Clipboard write failed")
      mockWriteText.mockRejectedValueOnce(error)

      render(<CopyButton textToCopy="test" />)
      const button = screen.getByRole("button")

      fireEvent.click(button)

      await waitFor(() => {
        expect(button).toHaveClass("bg-red-600")
        expect(button).toHaveClass("text-white")
      })
    })
  })
})
