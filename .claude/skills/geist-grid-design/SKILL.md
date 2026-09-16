---
name: geist-grid-design
description: |
  サイト共通のデザインシステム「Geist Grid」の正典ガイド。
  ページを新規作成・デザイン刷新・修正するとき、テーマ切替やトークンを扱うときに必ず読む。
  カラートークン（ダーク／ライト）、派手さ予算の数値上限、タイポグラフィ（Geist Sans /
  Geist Mono / Noto Sans JP）、グリッドセル構造、コンポーネント規則、data-theme による
  テーマ実装、Do / Don't、実装チェックリストを定義する。
  Use when ページのデザイン刷新, デザインシステム適用, 新規ページ作成, ダーク/ライトテーマ,
  テーマトグル, トークン追加, Geist Grid, redesign a page to match the site's design system.
metadata:
  platforms: claude-code, codex
---

# Geist Grid デザインシステム

**北極星: 黒い方眼紙の上に置かれた、エンジニアの職務経歴書。** Vercel Geist の厳密なトークンで組み、1px の罫線がセルを切り、そこに青い光が一点だけ差す。「方眼紙」= 構造が見えていること（罫線とセルが主役）。「職務経歴書」= 装飾ではなく事実（書籍・講座・経歴）が読まれること。「青い光が一点だけ」= 派手さは**数を制限された特権**であること。

詳細な根拠・リサーチ・Decision ledger は `docs/design/proposals/2026-09-geist-grid.md`。

**正典実装（ここを読んで真似する）**

| 対象 | パス |
|---|---|
| トークン層・ユーティリティ（`gg-*`） | `src/styles/tailwind.css` |
| ページ全体の組み方 | `src/components/geist/profile-page.tsx`（トップページ = 個人プロフィール） |
| ヘッダー・言語トグル・スキップリンク | `src/components/geist/header.tsx` |
| テーマトグル・フラッシュ防止スクリプト | `src/components/geist/theme-toggle.tsx` |
| フッター | `src/components/geist/footer.tsx` |
| ルートレイアウト（フォント・`data-theme`・共通枠） | `src/app/layout.tsx` |

**移行ステータス: 公開ページ（`/`・`/en`・`/courses`・`/en/courses`・`/community`・`/en/community`）・共通ヘッダー・共通フッター・エラーページはすべて Geist Grid に移行済み。** 旧学習ドキュメント（`/docs` / Markdoc）は廃止済み。**各ページのルート要素には `gg-surface` を付け、テーマトークンの地を明示する。**

## 設計原則

1. **色は Geist 公式値のみ。** 独自の色を発明しない。新色が要るときは `--ds-*` の 10 段から探し、無ければ「本当に必要か」を疑う。
2. **階層は背景レイヤと 1px 罫線で出す。** 拡散シャドウを使わない（純黒背景では見えない）。
3. **near-achromatic。** UI のグレーは彩度を持たない。色は情報（リンク・状態）か限定装飾だけ。
4. **見出しで殴らない。** ウェイトは 500〜600。700 は使わない。派手さには数値上限がある（「少し」を主観に任せない）。
5. **色はセマンティックトークン経由でのみ参照。** 生 hex・`gray-*` の直接指定は禁止。

Geist スケールの意味論（崩さない）: 100–300 = コンポーネント背景（default/hover/active）、400–600 = ボーダー（default/hover/active）、700–800 = 高コントラスト塗り、900–1000 = テキスト・アイコン（secondary/primary）。

## カラートークン

| トークン | Geist ソース | ダーク（既定） | ライト（手動切替） | 用途 |
|---|---|---|---|---|
| `--bg` | `--ds-background-100` | `#000000` | `#ffffff` | ページ背景（全面）|
| `--bg-subtle` | `--ds-background-200` | `#000000` | `#fafafa` | セクション地。ダークは同値なので段差はボーダーで出す |
| `--surface-1` | `--ds-gray-100` | `#1a1a1a` | `#f2f2f2` | セル内の塗り、コードブロック地、hover 面 |
| `--surface-2` | `--ds-gray-200` | `#1f1f1f` | `#ebebeb` | active 面、ネストしたセル |
| `--surface-3` | `--ds-gray-300` | `#292929` | `#e6e6e6` | 選択状態、タグの塗り |
| `--border` | `--ds-gray-400` | `#2e2e2e` | `#eaeaea` | グリッド罫線・セル境界（既定）|
| `--border-hover` | `--ds-gray-500` | `#454545` | `#c9c9c9` | hover 時の罫線 |
| `--border-strong` | `--ds-gray-600` | `#878787` | `#a8a8a8` | active / 強調したい仕切り |
| `--text-primary` | `--ds-gray-1000` | `#ededed` | `#171717` | 見出し・本文（17.9:1）|
| `--text-secondary` | `--ds-gray-900` | `#a0a0a0` | `#4d4d4d` | 補足文・リード文（8.0 / 8.5:1）|
| `--text-muted` | dark `--ds-gray-700` / light `--ds-gray-800` | `#8f8f8f` | `#7d7d7d` | メタ情報・日付・モノラベル（6.5 / **4.1**:1）|
| `--link` | dark `--ds-blue-900` / light `--ds-blue-800` | `#50a8ff` | `#005edc` | テキストリンク、アクティブなナビ（8.4 / 5.8:1）|
| `--accent-solid` | `--ds-blue-700` | `#0071f6` | `#0070f7` | 塗りボタン（白文字）、選択インジケータ |
| `--accent-glow` | `--ds-blue-600` | `#0090ff` | `#51aeff` | **装飾専用**。文字には使わない |
| `--focus` | `--ds-focus-color` | `#50a8ff` | `#0070f7` | フォーカスリング |
| `--grid-line` | — | `rgba(255,255,255,0.025)` | `rgba(0,0,0,0.035)` | faint grid |

**コントラスト由来の強制ルール（守らないと AA 落ち）**

- 塗りボタンのラベルは **16px / weight 500 以上に固定**（白 on `--accent-solid` は 4.47:1 = 大文字のみ AA）。
- ライトの `--text-muted` は **13px 以下の本文に使用禁止**。日付等のメタは `--text-secondary` に格上げするか、18.66px 以上でのみ使う。
- ライトのリンクは `blue-700` ではなく **`blue-800 #005edc`**（`blue-700` は `#fafafa` 上で 4.32:1 不合格）。
- 罫線色は 3:1 を満たさない。**情報の識別に罫線だけを使わない**。フォーカス・選択・エラーは `--focus` / `--border-strong` / テキストラベルを必ず併用する（WCAG 1.4.11）。
- **Mono ラベル（11px）には `--text-muted` ではなく `--text-label` を使う。** ライトの `--text-muted`（`#7d7d7d`）は 4.12:1 しかなく、11px のラベルは AA を満たさない。`--text-label` はダークでは `--text-muted` と同値、ライトだけ `#4d4d4d` に格上げする専用トークンで、コンポーネントに `dark:` を書かずにテーマ差を吸収する。実装は `src/styles/tailwind.css` の `gg-label`。

## 派手さ予算（数値上限）

派手さ担当は **(a) 青のグロー、(b) faint grid の背景線、(c) 罫線の線形グラデーション** の 3 つだけ。これ以外に派手さを足さない。

| 項目 | 上限 |
|---|---|
| グローの数 | **1 ページ最大 2 個**（ヒーロー 1 + フッター付近 1）／**1 ビューポートに 1 個** |
| グローの最大不透明度 / ぼかし半径 | **0.18**（`--accent-glow` 基準）／**160px** |
| 彩度を持つピクセルのビューポート面積 | **8% 以下** |
| conic / 線形グラデーションの使用箇所 | **1 ページ最大 2 箇所**。用途は「罫線」「区切り線」「背景テクスチャ」のみ。**面の塗り・ボタン・カード背景は禁止** |
| faint grid の線 | 色は `--grid-line`、**線幅 1px 固定、セル 64px** |
| アニメーションするグローの数 | **0**（グローは静止。動くのはホバー時の罫線色のみ）|

```css
.glow-anchor::before { /* A: ヒーローのグロー（1画面に1つまで） */
  content: ""; position: absolute; inset-inline: 0; top: -20%; block-size: 60%; pointer-events: none;
  background: radial-gradient(60% 50% at 50% 0%,
    color-mix(in oklab, var(--accent-glow) 18%, transparent) 0%, transparent 70%); }
.grid-field { /* B: faint grid（背景テクスチャ） */
  background-image: linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(80% 60% at 50% 0%, #000 0%, transparent 100%); }
.rule-accent { /* C: グラデーション罫線（1ページ2本まで） */
  block-size: 1px; opacity: 0.5;
  background: linear-gradient(90deg, transparent 0%, var(--accent-glow) 35%, var(--accent-glow) 65%, transparent 100%); }
```

## 形状・間隔

- `--radius-cell: 0` = グリッドセル・カード・コードブロック・テーブル / `--radius-control: 6px` = 入力欄・セカンダリボタン・タグ・画像 / `--radius-pill: 9999px` = プライマリ CTA・トグルボタン・アバター。**この 3 値以外は使わない。**
- `--border-width: 1px`。全ての罫線。**2px 以上は使わない。**
- shadow は**使わない**。例外はポップオーバー／メニューのみ（Geist `--ds-shadow-menu`）。
- focus は `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--focus)`（Geist の二重リング）。

spacing base 4px（4/8/12/16/24/32/48/64/96）。element gap 12px、cell padding 20px（デスクトップ）/ 16px（モバイル）、section gap 96px / 64px。コンテナ最大幅 1120px（記事本文は内側 720px）、ガター 32 / 24 / 16px。コンテナ左右端に 1px の縦罫線を常時引く（モバイルは省略）。

## タイポグラフィ

| 書体 | 担当 |
|---|---|
| **Geist Sans** | 見出し、本文、UI ラベル、ボタン、ナビ。`font-feature-settings: "liga" 1, "ss05" 1` を必ず有効化 |
| **Geist Mono** | モノラベル、日付・時刻・タイムスタンプ、タグ、数値メタ、コード、URL・出典ドメイン |
| **Noto Sans JP** | 日本語グリフ全般。`font-family` の 2 番目に置き、Geist Sans に**従属**させる |

原則: **Geist Mono は「機械が生成した／機械が読む値」だけに対応させる。** 人間の散文には絶対に使わない。

```css
@theme inline {
  --font-sans: var(--font-geist-sans), var(--font-noto-sans-jp), "Hiragino Sans", "Yu Gothic", sans-serif;
  --font-mono: var(--font-geist-mono), var(--font-noto-sans-jp), ui-monospace, "SFMono-Regular", monospace;
}
```

**配信方法** — Geist Sans / Geist Mono は `geist` パッケージの `next/font` 経由で self-host する。**Noto Sans JP は `next/font/google` では和文を配信できない**（このフォントに公開されているサブセットは `cyrillic` / `latin` / `latin-ext` / `vietnamese` だけで、`japanese` を指定すると型エラーになる）。Google Fonts の CSS2 スタイルシート（`fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap`）を `<link>` で読み込む。同じフォントを unicode-range で約 120 スライスに分けて配信するため、ブラウザはページが実際に使うスライスだけを取得する。`preconnect` を併記し、weight は 400 と 500 だけに絞る。実装は `src/app/layout.tsx`。

**型スケール**（ロール = サイズ / line-height / letter-spacing / ウェイト / 書体）

- `label-mono` 11px / 1.2 / **+0.08em** uppercase / 500 / Mono ・ `meta-mono` 13px / 1.5 / 0 / 400 / Mono
- `caption` 12px / 1.6 / 0 / 400 ・ `body-sm` 14px / 1.8 / 0 / 400 ・ `body` 16px / **1.85** / 0 / 400 ・ `body-lg`（リード）18px / 1.8 / 0 / 400（すべて Sans）
- `heading-sm` 20px / 1.5 / -0.01em / 500 ・ `heading` 24px / 1.4 / -0.015em / 500 ・ `heading-lg` 32px / 1.3 / -0.02em / 500（すべて Sans）
- `display` 40px / 1.2 / -0.02em / 600 ・ `display-lg` 56px / 1.1 / -0.02em / 600（Sans）。`display-lg` はトップページの氏名／肩書のみ。**700 は使わない。**

**和欧混植**: 和文本文は `line-height: 1.85` / `letter-spacing: 0`（見出し 1.3、display 1.15）。負のトラッキングは **24px 以上の見出しのみ、上限 `-0.02em`**。本文に `text-spacing-trim: normal`、可能なら `word-break: auto-phrase`、`line-break: strict`。本文中の数値・製品名は Sans、表・メタの数値だけ Mono + `font-variant-numeric: tabular-nums`。**明朝体・和文の斜体は全面禁止。**

## グリッドセルの規則

セル枠を `border: 1px solid` で個別に描くと交点で 2px になる。**`gap: 1px` + 親背景**が既定。

```css
.cell-grid { display: grid; gap: 1px; background: var(--border); border: 1px solid var(--border); }
.cell { background: var(--bg); padding: 20px; }
.cell:hover { background: var(--surface-1); }
```

- **セルの角丸は 0。例外なし。** セル内で角丸を持てるのは画像・埋め込みのみ（6px）。
- hover は地の色変化のみ（150ms ease-out）。**translateY やスケールは使わない。**
- 各セル上辺に `label-mono`（`--text-muted`）。例: `ROLE`, `SINCE 2019`, `BOOK`, `COURSE 17`, `SOURCE`。**ラベルは必ず英語**（和文は大文字化できない）。
- 列数: `< 640px` 1 列 / `640–1024px` 2 列 / `> 1024px` 3 列（プロフィール）・2 列（記事一覧）・4 列（一覧）。行ごとに高さが揃うのは正しい。中身の量で行が伸びるのを無理に揃えない。
- 独立した「カード」コンポーネントは作らない。**全てのカードはセル。**

## コンポーネント規則

**ヘッダー** — 高さ 56px、`sticky top-0`、背景 `color-mix(in oklab, var(--bg) 80%, transparent)` + `backdrop-filter: blur(8px)`、下辺 1px `--border`。現在地のナビのみ `--text-primary` + 下辺 1px `--accent-solid`。**右上に言語トグルとテーマトグルを並べる。プルダウンは使わない。**

- 言語トグル: `<div role="group" aria-label="言語切り替え">` 内に `<a>` 2 つ（`hreflang`、アクティブに `aria-current="true"`）。URL が変わるので**リンク**であってボタンではない。高さ 28px、`padding: 0 10px`、Mono 11px uppercase +0.08em、外枠 1px `--border`、radius 6px。非アクティブ `--text-muted` 透明地 / アクティブ `--text-primary` + 地 `--surface-1`。
- テーマトグル: 8px 空けて右に。28×28px、radius 6px、外枠 1px `--border`、月／太陽アウトライン（1.5px ストローク、`--text-muted`、hover で `--text-primary`）。`<button type="button" aria-label="テーマを切り替え" aria-pressed={isDark}>`。**dark ⇄ light の 2 状態のみ**（"system" の第 3 状態は持たない）。モバイルでもハンバーガーに入れずヘッダーバーに残す。

**ボタン階層** — 全てフォーカス時に Geist の二重リング。**グラデーション塗りのボタンは存在しない。**

| 階層 | 見た目 | 用途 |
|---|---|---|
| Primary | 地 `--accent-solid` / 文字 `#fff` / pill / 高さ 40px / `padding: 0 20px` / **16px・weight 500** | ページに 1 つ。購入・申込 |
| Secondary | 地 `--text-primary` / 文字 `--bg` / pill / 高さ 40px | Primary が無いページの主要導線 |
| Outline | 透明地 / 枠 1px `--border` / radius 6px / 高さ 36px、hover で枠 `--border-hover` + 地 `--surface-1` | 副次導線、「もっと見る」|
| Ghost | 透明地・枠なし / 文字 `--text-secondary`、hover で `--text-primary` + 地 `--surface-1` | ヘッダーナビ、セル内補助 |
| Link-button | 文字 `--link` / 下線なし、hover で下線、末尾に `↗`（12px）| 外部リンク |

**リンク** — 本文中は `--link` + `underline`、`text-underline-offset: 0.2em`、`text-decoration-thickness: 1px`、`text-decoration-color: color-mix(in oklab, var(--link) 40%, transparent)`、hover で不透明。ナビ・一覧タイトルは既定で下線なし、hover で下線。外部リンクは末尾に `↗`（12px / `--text-muted`）。

**タグ / バッジ** — Mono 11px、地 `--surface-1`、文字 `--text-secondary`、枠なし、radius 6px、`padding: 3px 8px`、hover で地 `--surface-2`。**タグに色を持たせない**（カテゴリ色分け禁止）。状態バッジは 6px ドット前置で `NEW` = `--accent-solid`、`UPDATED` = `--ds-amber-700`（dark `#ffb200` / light `#f90`）の**2 色だけ**。カウントバッジは Mono 11px / tabular-nums / `--text-muted`。

**コードブロック** — 地 `--surface-1`、枠 1px `--border`、radius **0**、Mono 13px / line-height 1.7。上辺に言語ラベル（Mono 11px uppercase）＋ 右端にコピーボタン（Ghost 24×24）。ハイライトは `prism-react-renderer` で**キーワード `--link` / 文字列 `--ds-teal-700` / コメント `--text-muted` / 他 `--text-primary` の 4 色に限定**。インラインコードは地 `--surface-1`、`padding: 1px 5px`、radius 6px、Mono 0.9em。

**記事本文** — 幅 720px。`p` は `body` / 段落間 24px。`h2` は 32px・500、上に全幅 1px 罫線（`margin-top: 64px; padding-top: 24px`）。`h3` は 24px・500、`margin-top: 40px`。`blockquote` は左に 2px の縦線（`--border-strong`）、地なし、`--text-secondary`、斜体にしない。`table` はセルグリッドと同じ 1px 罫線、ヘッダ行は Mono 11px uppercase、数値列は tabular-nums 右寄せ。`hr` は 1px、上下 48px。`@tailwindcss/typography` は使ってよいが `prose` の色・行間・見出しマージンを**全てトークンで上書き**する。

## テーマ実装

`<html data-theme="dark|light">` 属性 ＋ CSS 変数。Tailwind v4 の `@custom-variant` で紐付ける。

```css
/* src/styles/tailwind.css */
@import "tailwindcss";
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root, [data-theme="light"] { /* ライトのトークン（上表） */ }
[data-theme="dark"]        { /* ダークのトークン（上表） */ }

@theme inline { /* 全トークンを Tailwind のセマンティッククラスに公開する */
  --color-bg: var(--bg); --color-surface-1: var(--surface-1); --color-border: var(--border);
  --color-text-primary: var(--text-primary); --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted); --color-link: var(--link); --color-accent: var(--accent-solid); }
```

**原則: コンポーネントは `bg-bg` `text-text-secondary` `border-border` のようなセマンティッククラスだけを使い、`dark:` を書かない。** `@custom-variant dark` は定義するが、トークンで表現できない稀なケース（グローの `mix-blend-mode` 切替など）の逃げ道であり、**使用時はレビューで理由を問う**。

**既定判定の優先順位**（localStorage キーは `"theme"`、値は `"dark"` / `"light"`）: (1) `localStorage.getItem("theme")` が `"dark"` / `"light"` ならそれを採用。(2) なければ `matchMedia("(prefers-color-scheme: light)").matches` が **true のときだけ** `light`。(3) それ以外（`dark` / `no-preference` / 判定不能）は **`dark`**。

**フラッシュ防止** — `<head>` に同期インラインスクリプトを置き、ハイドレーション前に `data-theme` を確定させる。

```tsx
const themeInit = `(function(){try{
  var s=localStorage.getItem('theme');
  var t=(s==='light'||s==='dark')?s:
    (window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  document.documentElement.setAttribute('data-theme',t);
  document.documentElement.style.colorScheme=t;
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})()`
// <html lang="ja" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: themeInit}} /></head>
```

`<html>` の初期値は `data-theme="dark"`（SSR 出力もダーク）。`suppressHydrationWarning` を付ける。`color-scheme` も同時に設定してスクロールバー・フォームの既定色を揃える。**テーマ切替時の全体トランジションは入れない**（切り替えは瞬時）。CSP で `unsafe-inline` を禁じる設定を入れた場合は nonce を付与する。

## i18n（日本語が既定・英語がサブ）

**現状: ライブラリなし。`/en` プレフィクスで、英語版はトップ・講座一覧・コミュニティの 3 面。** 日本語は既存 URL をそのまま使う（プレフィクスなし）。

| 対象 | パス |
|---|---|
| ロケール定義・パス解決 | `src/i18n/locale.ts` |
| メッセージ辞書（`ja` / `en`） | `src/i18n/dictionaries.ts` |
| 日本語トップ / 英語トップ | `src/app/page.tsx` / `src/app/en/page.tsx` |
| 日本語 / 英語の講座一覧 | `src/app/courses/page.tsx` / `src/app/en/courses/page.tsx` |
| 日本語 / 英語のコミュニティ | `src/app/community/page.tsx` / `src/app/en/community/page.tsx` |

規則:

- **辞書に入れるのは表示文字列だけ。** URL・数値・書誌情報などの事実は `src/lib/constants.ts` や `src/data/book.ts` を単一の情報源とし、辞書に複製しない。言語が違っても ISBN や価格は同じ値を出す。
- `Dictionary` 型で `ja` と `en` の構造を強制する。キーを増やすときは必ず両方に足す（片方だけだと型エラーになる）。
- 言語トグルは `<a>`（`hreflang` ＋ アクティブに `aria-current="true"`）。URL が変わるのでボタンにしない。英語版を持たないページでは EN は英語トップ（`/en`）へ送る（`localizePath` / `getLocaleAlternates`）。
- `<html lang>` を出力できるのはルートレイアウトだけなので、ルートは `ja` を出し、英語ページが `HtmlLang` でマウント後に上書きする（`src/components/geist/html-lang.tsx`）。
- 英語版を持つページには `metadata.alternates.languages`（`ja` / `en` / `x-default`）を必ず付ける。

**次にページを英語化するときの手順**

1. `src/i18n/dictionaries.ts` の `Dictionary` 型にそのページ用のキーを足し、`ja` と `en` の両方を埋める。
2. ページ本体を「辞書と `locale` を受け取るコンポーネント」に切り出す（`src/components/geist/profile-page.tsx` が手本）。
3. `src/app/en/<path>/page.tsx` を作り、`metadata.alternates.languages` と `HtmlLang` を付ける。
4. `localizePath` と `getLocaleAlternates` を見直し、英語版を追加したパスを `EN_ENABLED_PATHS` に登録する。
5. `sitemap.ts` に英語 URL を追加する。

**next-intl へ移行する判断基準** — 英語化するページが 5 面を超えたら、`src/app/[locale]/` への全面リストラクチャと `next-intl` の導入を検討する。それ未満では、全ページ移動と middleware 追加のコストのほうが大きい。移行しても `src/i18n/dictionaries.ts` のメッセージ構造はそのまま流用できるよう、辞書はネストしたプレーンオブジェクトに保っておくこと。

## Do / Don't

**Do**

- 色は必ずセマンティックトークン経由（`var(--text-secondary)` / `text-text-secondary`）。生 hex を書かない。
- セルの罫線は常に 1px。強調は太さでなく**色**（`--border-strong`）で行う。日付・ID・出典ドメイン・コード・タイムスタンプ・数値メタは Geist Mono。
- 見出しは 500〜600。グローを置いたら、そのページの他のグローを数える。和文本文は 1.85 / ls 0 / `line-break: strict`。
- インタラクションは**背景色と罫線色の変化のみ**（150ms ease-out）。フォーカスは必ず Geist の二重リング（`outline: none` を単独で書かない）。
- 画像は `next/image`、radius 6px、必ずキャプションまたは `alt`。自動生成コンテンツは「自動生成である」ことをページ上で明示する。

**Don't**

- ❌ `#0B1020` などの青紫ダーク背景。Blueprint Night のトークンを 1 つでも持ち込む。
- ❌ 紫〜ピンクのグラデーション CTA。グラデーションを面の塗りに使う。
- ❌ カードに `border-radius: 12px` ＋ ぼかしシャドウ。hover で `translateY(-4px)`。
- ❌ グラスモーフィズム（ヘッダーの薄い blur を除く）。ネオンのテキストシャドウ。明朝体。和文の斜体。和文への負のトラッキング（24px 以上の見出しを除く）。
- ❌ タグをカテゴリ色分けする。状態色を `--accent-solid` と `--ds-amber-700` 以外に増やす。多色シンタックスハイライトテーマ（Dracula / One Dark 等）。
- ❌ コンポーネント内に `dark:` を書く（トークンで解決できないと証明できる場合を除く）。セクション背景色を交互に変えるゼブラ構成。意味のない 3D / パーティクル / カウントアップ。

## AIっぽさ排除ルール

- ❌ 絵文字をセクション見出しのアイコン代わりに使う（`💡` `⏰` 等）。絵文字つきタイトルは、**表示側で Mono ラベルに置き換える**。
- ❌「〜を、もっと自由に。」「未来を、ここから。」のような中身のない体言止めキャッチ。書くのは事実（冊数・本数・年数・所属）。
- ❌「革新的」「シームレス」「パワフル」「次世代」などの評価語を自称に使う。
- ❌ 意味のない 3 列アイコンカード。
- ❌ 等間隔の均質なカードグリッドだけでページを埋める。**数値セル・年表・changelog 型など、行の形が違うセクションを必ず混ぜる。**

## 実装の落とし穴

1. **罫線の 2px 問題** — セルに個別 `border` を引くと交点で倍になる。`gap: 1px` + 親背景で描く。
2. **和文の line-height** — Geist の欧文既定 1.5 のままだと和文が詰まって読めない。本文は 1.85。
3. **ライト muted のサイズ制限** — `#7d7d7d` は 4.12:1。13px 以下の本文に使わない。
4. **塗りボタンのラベルサイズ** — 4.47:1 なので 16px / weight 500 未満にしない。
5. **`suppressHydrationWarning`** — `<html>` に付け忘れるとテーマ初期化スクリプトで警告が出る。
6. **Mono ラベルの言語** — uppercase 前提なので和文を入れない。罫線は 3:1 未満なので、罫線だけで状態を示さず必ず色かテキストを併用する。

## ページ実装チェックリスト

- [ ] 生 hex / `gray-*` / `dark:` の直接指定がゼロ（grep で確認）。色は全てセマンティックトークン経由
- [ ] セルは radius 0、罫線は 1px、交点が 2px になっていない
- [ ] 各セルに英語の Mono ラベルが付いている
- [ ] グローは 1 ビューポート 1 個 / 1 ページ 2 個以内、静止、不透明度 0.18 以下。彩度を持つピクセルがビューポート面積の 8% 以下
- [ ] 見出しウェイトが 500〜600（700 なし）。和文本文が 1.85 / ls 0。日付・コード・数値メタが Geist Mono
- [ ] **ダーク・ライト両方**でコントラスト表を満たす（ライト muted のサイズ制限を含む）
- [ ] キーボード操作で全ての操作に到達でき、Geist の二重リングが見える
- [ ] 行の形が違うセクションが混ざっている（均質グリッドだけでない）。絵文字見出し・評価語・中身のないキャッチが無い
- [ ] `< 640px` / `640–1024px` / `> 1024px` の 3 段で崩れない
