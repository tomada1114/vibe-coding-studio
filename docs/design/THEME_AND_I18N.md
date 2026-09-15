# テーマ実装と i18n 方針

> 提案書（唯一の情報源）: [`docs/design/proposals/2026-09-geist-grid.md`](./proposals/2026-09-geist-grid.md) §7, §8
> トークン値は [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) を参照。

---

## 1. テーマ実装

### 1.1 方式

`<html data-theme="dark|light">` 属性 ＋ CSS 変数。Tailwind v4 の `@custom-variant` で `dark:` を属性に紐付ける。

```css
/* src/styles/tailwind.css */
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root,
[data-theme="light"] {
  --bg: #ffffff;
  --bg-subtle: #fafafa;
  --surface-1: #f2f2f2;
  --surface-2: #ebebeb;
  --surface-3: #e6e6e6;
  --border: #eaeaea;
  --border-hover: #c9c9c9;
  --border-strong: #a8a8a8;
  --text-primary: #171717;
  --text-secondary: #4d4d4d;
  --text-muted: #7d7d7d;
  --link: #005edc;
  --accent-solid: #0070f7;
  --accent-glow: #51aeff;
  --focus: #0070f7;
  --grid-line: rgba(0, 0, 0, 0.035);
}

[data-theme="dark"] {
  --bg: #000000;
  --bg-subtle: #000000;
  --surface-1: #1a1a1a;
  --surface-2: #1f1f1f;
  --surface-3: #292929;
  --border: #2e2e2e;
  --border-hover: #454545;
  --border-strong: #878787;
  --text-primary: #ededed;
  --text-secondary: #a0a0a0;
  --text-muted: #8f8f8f;
  --link: #50a8ff;
  --accent-solid: #0071f6;
  --accent-glow: #0090ff;
  --focus: #50a8ff;
  --grid-line: rgba(255, 255, 255, 0.025);
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface-1: var(--surface-1);
  --color-border: var(--border);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-link: var(--link);
  --color-accent: var(--accent-solid);
  /* … */
}
```

**原則: コンポーネントは `bg-bg` `text-text-secondary` `border-border` のようなセマンティッククラスだけを使い、`dark:` を書かない。** テーマ差はトークン層で吸収する。`dark:` バリアントは、トークンでは表現できない稀なケース（グロー用の `mix-blend-mode` の切替など）のための逃げ道として定義しておくが、**使用時はレビューで理由を問う**。

### 1.2 デフォルト判定と優先順位

1. `localStorage.getItem("theme")` に `"dark"` / `"light"` があればそれを採用。
2. なければ `window.matchMedia("(prefers-color-scheme: light)").matches` が **true のときだけ** `light`。
3. それ以外（`dark` / `no-preference` / 判定不能）は **`dark`**。

つまり `prefers-color-scheme` は「明示的にライトを好む人」を拾うためだけに使い、**ダークを既定に倒す**。

### 1.3 初回描画のフラッシュ防止

`<head>` 内に同期実行のインラインスクリプトを置く。React のハイドレーション前に `data-theme` を確定させる。

```tsx
// src/app/layout.tsx
const themeInit = `(function(){try{
  var s=localStorage.getItem('theme');
  var t=(s==='light'||s==='dark')?s:
    (window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  document.documentElement.setAttribute('data-theme',t);
  document.documentElement.style.colorScheme=t;
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})()`

// <html lang="ja" data-theme="dark" suppressHydrationWarning>
//   <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
```

補足:

- `<html>` の初期値は `data-theme="dark"`（SSR の出力もダーク＝多数派に合わせる）。
- `suppressHydrationWarning` を `<html>` に付ける。
- `color-scheme` を同時に設定してスクロールバー・フォームの既定色も揃える。
- CSP で `unsafe-inline` を許可していない場合は nonce を付与する。`next.config.mjs` の現行ヘッダー設定に CSP は無いため、当面は問題なし。
- テーマ切替時の全体トランジションは**入れない**（大面積の色補間は安っぽく見える）。切り替えは瞬時。

### 1.4 テーマトグルの仕様

- 2 状態のみ（dark ⇄ light）。"system" の第 3 状態は持たない。プルダウン禁止の要件と整合し、押した結果が予測できる。
- `<button type="button" aria-label="テーマを切り替え" aria-pressed={isDark}>`。
- 詳細な見た目・配置は [`DESIGN_SYSTEM_COMPONENTS.md`](./DESIGN_SYSTEM_COMPONENTS.md) §1 を参照。

## 2. i18n 方針の骨子

日本語をデフォルト、英語をサブとする。

### URL 設計

**`/en` プレフィックス方式を推奨**する。Cookie 方式（同一 URL で言語を出し分ける）は実装が軽い反面、同じ URL が言語によって別内容を返すため SSG/ISR のキャッシュが言語ごとに分岐せず、SNS シェアや検索インデックスで意図しない言語が出る事故が起きやすい。

本サイトは著者・書籍・講座という検索とシェアが主要流入のサイトなので、URL が一意に言語を決める `/en` 方式のほうが正しい。

- 日本語は既存 URL を維持してプレフィックスなし。
- `/en/*` を追加。
- `<link rel="alternate" hreflang>` と `metadata.alternates.languages` を全ページに付与する。

### ライブラリ

**next-intl を推奨**する。App Router 対応が最も成熟しており、Server Components でメッセージを解決できるためクライアントバンドルに翻訳文字列を持ち込まずに済む。

- next-i18next は Pages Router 前提のため不採用。
- Paraglide は軽量だが RSC 統合が薄いため不採用。

### 翻訳範囲の段階導入

翻訳は全ページ一括ではなく、以下の順で着手する。

1. トップ
2. プロフィール
3. 書籍
4. 講座

ブログ／ニュースまとめ記事は原文言語のみ提供し、一覧で言語バッジ（Mono ラベル `JA` / `EN`）を出す運用が現実的。

言語トグルの見た目は `DESIGN_SYSTEM_COMPONENTS.md` §1（言語トグル: セグメント型ボタン）で先に実装しておき、ルーティングが整った段階で機能させる。

**本節は方針提示にとどめる。詳細設計（メッセージ管理、ルーティング実装、翻訳フロー）は別途行う。**

## 3. 実装の落とし穴

- 罫線の 2px 問題: セルの枠を `border: 1px solid` で個別に描くと交点で 2px になる。`gap: 1px; background: var(--border)` パターンで回避する（`DESIGN_SYSTEM_PATTERNS.md` §1）。
- 和文の line-height: Geist の欧文既定（1.5 前後）をそのまま和文に適用すると詰まって見える。和文本文は 1.85 に固定する。
- ライト muted のサイズ制限: `--text-muted` はライトで 4.12:1 のため、13px 以下の本文には使わない。
- `suppressHydrationWarning`: テーマ初期化スクリプトが SSR 出力と異なる `data-theme` を設定しうるため、`<html>` に必ず付与する。

## 4. 関連ドキュメント

- トークン全表・派手さ予算・タイポグラフィ・Do/Don't: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- コンポーネント仕様（テーマトグル・言語トグルの見た目）: [`DESIGN_SYSTEM_COMPONENTS.md`](./DESIGN_SYSTEM_COMPONENTS.md)
- レイアウト・グリッド規則: [`DESIGN_SYSTEM_PATTERNS.md`](./DESIGN_SYSTEM_PATTERNS.md)
