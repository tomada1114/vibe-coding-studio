"use client"
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Highlight, Prism, themes } from "prism-react-renderer"
import { useEffect } from "react"
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-python")
require("prismjs/components/prism-bash")
require("prismjs/components/prism-typescript")
require("prismjs/components/prism-jsx")
require("prismjs/components/prism-tsx")
require("prismjs/components/prism-css")
require("prismjs/components/prism-scss")
require("prismjs/components/prism-json")
require("prismjs/components/prism-markdown")
require("prismjs/components/prism-yaml")
require("prismjs/components/prism-go")
require("prismjs/components/prism-rust")
require("prismjs/components/prism-ruby")
require("prismjs/components/prism-java")
require("prismjs/components/prism-c")
require("prismjs/components/prism-csharp")
require("prismjs/components/prism-dart")
require("prismjs/components/prism-sql")

export function Fence({
  children,
  language,
}: {
  children: string
  language: string
}) {
  // 言語指定がない場合は plaintext として扱う
  const lang = language || "plaintext"

  useEffect(() => {
    // Prism CSS が既に読み込まれているかチェック
    if (document.querySelector('link[href*="prism.css"]')) {
      return
    }

    // Prism CSS を動的に読み込み
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "/styles/prism.css"
    document.head.appendChild(link)
  }, [])

  return (
    <Highlight code={children.trimEnd()} language={lang} theme={themes.vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto rounded-lg p-4 text-sm`}
          style={{
            ...style,
            backgroundColor: "#1e1e1e",
          }}
        >
          <code className="block font-mono">
            {tokens.map((line, lineIndex) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { key: _, ...lineProps } = getLineProps({
                line,
                key: lineIndex,
              })
              return (
                <div key={lineIndex} {...lineProps}>
                  {line.map((token, tokenIndex) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { key: __, ...tokenProps } = getTokenProps({
                      token,
                      key: tokenIndex,
                    })
                    return <span key={tokenIndex} {...tokenProps} />
                  })}
                </div>
              )
            })}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
