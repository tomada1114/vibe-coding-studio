/**
 * 著書『Claude Codeで作って学ぶ AI駆動アプリ開発入門』（技術評論社）の書誌情報。
 * トップページ（src/app/page.tsx）と運営者ページ（src/app/founder/page.tsx）が参照する。
 *
 * 書名は正式表記のまま扱う（略さない・言い換えない）。
 * 発売日を過ぎたら status と ctaLabel を「発売中」「Amazonで見る」に切り替える。
 */
export const book = {
  title: "Claude Codeで作って学ぶ AI駆動アプリ開発入門",
  publisher: "技術評論社",
  releaseDate: "2026年9月8日",
  releaseDateISO: "2026-09-08",
  releaseDateLabel: "2026.09.08",
  status: "発売中",
  ctaLabel: "Amazonで見る",
  price: "3,080円（税込）",
  format: "B5変形 / 384ページ",
  pages: 384,
  isbn: "978-4-297-15823-1",
  amazonUrl: "https://amzn.asia/d/0f0bQMI4",
  publisherUrl: "https://gihyo.jp/book/2026/978-4-297-15823-1",
  cover: {
    // 版元（技術評論社）が公開している書影を、長辺1000pxに圧縮したもの
    src: "/books/claude-code-de-tsukutte-manabu-cover.jpg",
    width: 791,
    height: 1000,
    alt: "『Claude Codeで作って学ぶ AI駆動アプリ開発入門』（技術評論社）の書影",
  },
} as const
