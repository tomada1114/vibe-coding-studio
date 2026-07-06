"use client"

import Link from "next/link"

/**
 * グローバルエラー境界
 *
 * root layout 自体のエラーを捕捉する最終フォールバック。
 * html/body を自前でレンダリングする必要がある。
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ja">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            color: "#09090b",
            fontFamily: "sans-serif",
            padding: "6rem 1.5rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.875rem", fontWeight: 600 }}>
            エラーが発生しました
          </h1>
          <p style={{ marginTop: "1rem", color: "#52525b", lineHeight: 1.75 }}>
            申し訳ありません。サイトの表示中に問題が発生しました。
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                borderRadius: "9999px",
                backgroundColor: "#09090b",
                color: "#ffffff",
                padding: "0.625rem 1.5rem",
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              再試行する
            </button>
            <Link
              href="/"
              style={{
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
                color: "#09090b",
                padding: "0.625rem 1.5rem",
                fontSize: "0.875rem",
                border: "1px solid #d4d4d8",
                textDecoration: "none",
              }}
            >
              ホームに戻る
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
