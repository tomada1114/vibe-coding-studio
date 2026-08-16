---
name: blueprint-night-design
description: |
  サイト共通のデザインシステム「Blueprint Night（夜の設計室）」の正典ガイド。
  ダークエディトリアル基調のページを新規作成・移行・修正するときに必ず読む。
  カラースキーマ、タイポグラフィ、レイアウト、質感、モーション、実装の落とし穴、
  背景アート生成レシピ、移行チェックリストを定義する。
  Use when ページのデザイン刷新, ダークデザインへの移行, founderページ風にする,
  Blueprint Night, デザインシステム適用, redesign a page to match the site's dark editorial style.
---

# Blueprint Night デザインシステム

「夜の設計室」— 深い藍墨の紙面に、ブループリント（設計図）の青。等幅フォントを装飾ではなく
**メタデータの言語**として使う、エンジニアのためのダークエディトリアル。

**正典実装**: `src/app/founder/page.tsx`（このスキルの全パターンが実装済み。迷ったらここを読む）

## 設計原則

1. **上品に、ガジェット的にしない** — ターミナル風ウィンドウ枠・タイプライター演出・マトリックス風の緑文字は禁止
2. **色は役割で使う** — 青=構造とアクセント / ティール=限定的な強調 / 琥珀=「現在・アクティブ」の唯一の暖色シグナル
3. **カード・アイコングリッドを使わない** — ヘアライン罫線と非対称グリッドと余白で構造を作る
4. **AIっぽさの排除** — 黒角丸アイコン正方形、均等3カラムカード、酸性グリーンのアクセントは全て禁止パターン

## カラースキーマ

背景 `#0B1020` 上のコントラスト比を併記（WCAG AA: 小さい文字 4.5:1 / 大きい文字 3:1）。

| トークン | 値 | コントラスト | 用途 |
|---|---|---|---|
| bg | `#0B1020` | - | ページ背景（青みの墨） |
| surface | `#10182B` | - | 浮きの面（チップ、写真フレーム等） |
| hairline | `#22304A` | - | 罫線・ボーダー全般 |
| text-hi | `#F0F3F9` | 16.5:1 | 見出し・強調・本文の主 |
| text-mid | `#B9C3D6` | 10.7:1 | 本文・ナビリンク |
| text-low | `#93A0B8` | 7.2:1 | メタデータ・キャプション。**テキストの下限。これより暗い文字を作らない** |
| deco | `#8593AB` | 6.1:1 | 装飾専用（hash風トークン、アウトライン文字の線）。テキストには使わない |
| blue-text | `#6FA8E8` | 7.6:1 | 主アクセント（テキスト用の青）: リンクhover、アイブロウ、番号、ノード、focus ring |
| blue-glow | `#4C8DFF` | - | 主アクセント（発光装飾用の青）: グロー、レール、罫線的装飾。テキスト不可 |
| teal | `#3ECF9B` | 9.6:1 | 副アクセント。**用途を限定**: 数値強調・カテゴリラベル・締めのルール線程度 |
| amber | `#E3A857` | - | 暖色シグナル。**「現在・アクティブ・HEAD」を指す要素専用**。ページ内で1〜2箇所まで |

### 色のルール

- グレー系（zinc/gray の Tailwind パレット）は使わない。上記トークンの明示指定のみ
- `dark:` プレフィックスは禁止。このデザインは「ダークモード」ではなく固定の見た目
- ティールと琥珀を同じ視野に多数並べない。基本は青の単色世界に、点として置く
- グローの不透明度は 3〜6%。それ以上は安っぽくなる

## タイポグラフィ

- **欧文ディスプレイ**: Space Grotesk（500/700）— 見出しの欧文、ワードマーク
- **等幅**: JetBrains Mono（400/500）— アイブロウ、年号、タグ、メタデータ、テキストリンク
- **和文**: 既存のサンセリフスタック。見出しは `font-bold tracking-tight`
- フォントは `next/font/google` で**ページ内ロード**し、variable をラッパー div に付与する
  （グローバル layout には手を入れない。`--font-mono` はグローバルで IBM Plex Mono に固定されているため、
  `font-[family-name:var(--font-jetbrains-mono)]` の arbitrary utility で参照する）

```tsx
const spaceGrotesk = Space_Grotesk({ weight: ["500", "700"], subsets: ["latin"], display: "swap", variable: "--font-space-grotesk" })
const jetBrainsMono = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], display: "swap", variable: "--font-jetbrains-mono" })
const mono = "font-[family-name:var(--font-jetbrains-mono)]"
const display = "font-[family-name:var(--font-space-grotesk)]"
```

### 定型スタイル（正典から転記して使う）

```tsx
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6FA8E8]"
const eyebrow = clsx(mono, "text-[11px] font-medium tracking-[0.28em] text-[#6FA8E8] uppercase")
const bodyText = "text-[15px]/7 text-[#B9C3D6]"
const strongMark = "font-semibold text-[#F0F3F9] underline decoration-[#6FA8E8]/60 decoration-1 underline-offset-4"
const textLink = clsx(mono, focusRing, "group inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-[#B9C3D6] uppercase transition-colors hover:text-[#6FA8E8]")
```

## レイアウト

- コンテナ: `mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12`（founder の `Shell`）
- **セクションの基本形**: ヘアライン上罫線 + 12カラムグリッドの非対称2カラム。
  左4カラムに「アイブロウ（青の短いルール線付き）+ 見出し」を `lg:sticky lg:top-12` で、右8カラムに本文
- セクション内の並列項目はカードにせず、**ヘアライン区切りの行/ブロック**にする。
  項目番号は等幅の `01 02 03`（青）
- SNS・外部リンクは丸ピルボタンにせず、等幅テキストリンク + `↗` / `→`

## 質感・アンビエンス

### セクショングロー（フラットな黒の回避）

各セクションに1つ、青/ティールを交互に、位置を変えて敷く。`relative isolate` の親に
`-z-10` / `aria-hidden` / `pointer-events-none` で配置:

```tsx
const glowBlueTopLeft     = "bg-[radial-gradient(55%_60%_at_10%_0%,rgba(76,141,255,0.06),transparent_70%)]"
const glowTealBottomRight = "bg-[radial-gradient(55%_60%_at_90%_100%,rgba(62,207,155,0.05),transparent_70%)]"
const glowBlueTopRight    = "bg-[radial-gradient(55%_60%_at_88%_4%,rgba(76,141,255,0.055),transparent_70%)]"
const glowTealBottomLeft  = "bg-[radial-gradient(55%_60%_at_12%_100%,rgba(62,207,155,0.045),transparent_70%)]"
```

### グリッドとノイズ

- 1px ヘアライングリッド: `linear-gradient` 2方向、`backgroundSize: 88px 88px`、`opacity-40`、
  radial の maskImage で端をフェード
- 粒子ノイズ: SVG feTurbulence の data URI を `opacity-[0.035]` 程度で（正典の `noiseTexture` を転記）

### ヒーロー背景アート

生成アート（`public/founder/hero-bg.png` が第1号）を使う場合のレイヤー順:

1. 下地 `bg-[#0B1020]`（画像ロード前の色切れ防止）
2. `next/image` fill / object-cover / priority / sizes="100vw"
3. 遮蔽グラデーション（テキスト側が不透明 → 反対側で透明。100deg 程度に傾ける）
4. モバイル追加遮蔽 `bg-[#0B1020]/55 lg:hidden`（1カラムで全面にテキストが重なるため）
5. グリッド + ノイズ
6. 下端フェード（`#0B1020` へ h-48 程度）で次セクションに接続

## シグネチャ要素: git log 風タイムライン

経歴・沿革・リリース履歴など**本物の時系列**にのみ使う（装飾目的の流用禁止）。

- 等幅の年号 + 縦レール + ノード + commit hash 風トークン（内容から決定論的に生成。`Math.random` 禁止）
- レールは区間ごとに `#4C8DFF` → `#3ECF9B` を補間した縦グラデーション（opacity-60）
- ノードは `#6FA8E8`、**最新・現在の項目だけ琥珀 + box-shadow の発光 + `HEAD` バッジ**

## モーション

- framer-motion。演出は「読み込み時のヒーロー stagger」と「タイムライン等のスクロールリビール」の2種まで
- `useReducedMotion` で `transition: { duration: 0 }` に切り替える（initial は変えない。SSR/hydration 一致のため）
- 再利用コンポーネント: `src/app/founder/founder-motion.tsx` の `FadeUp` / `RevealOnScroll`
- 過剰なアニメーションは AI 生成っぽさに直結する。迷ったら削る

## 実装ルールと落とし穴

- **共有コンポーネントを暗背景で使わない**: `Navbar` / `Heading` / `Subheading` は明るい前提。
  ダークページでは founder の `FounderHeader` パターン（ローカルヘッダー）を使う。
  リンク構成は `src/components/navbar.tsx` と同期させること
- **sticky と overflow-hidden**: ルート要素に `overflow-hidden` を置くと `position: sticky` が死ぬ。
  overflow の clip はヒーロー内やフッターラッパーなど必要な箇所に限定する
- **共有 Footer の w-screen 装飾**: Footer は `w-screen`（スクロールバー込み 100vw）の装飾を持ち、
  そのままだと横スクロールが発生する。**Footer は必ず `<div className="overflow-hidden">` で包む**
- **横スクロールするナビ**には `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden` を付ける
- metadata / 構造化データ / `AsyncErrorBoundary` の構造は維持する
- コピー（文言）はデザイン作業で改変しない

## 品質フロア（必須）

- テキストは全て AA（小 4.5:1）以上。`#93A0B8` が下限
- focus-visible リング（`#6FA8E8`）を全インタラクティブ要素に
- `prefers-reduced-motion` 尊重
- モバイル（390px）で横スクロールなしを実測確認（`document.documentElement.scrollWidth > clientWidth`）
- `npm run check:all` 全合格

## 背景アート生成レシピ（Gemini API）

iobsidian の `image-generating` スキル（API 経路、flash / 2K / 16:9、約$0.10/枚）を使う。
生成後は必ず Read で目視 QA（文字・ロゴ・人物の混入、テキスト予定領域の明るさ）。

プロンプト骨子（hero-bg.png の実績プロンプトを踏襲し、ページに合わせて構図指示だけ変える）:

> Abstract wide background art for a software engineer's dark [ページ用途] section.
> Deep midnight navy base color (#0B1020), the mood of an architect's blueprint at night.
> Very subtle glowing elements: fine hairline contour lines and isometric circuit traces
> in steel blue (#4C8DFF) at low opacity, one soft aurora-like gradient drifting from
> teal (#2FBF9B) to electric blue across [位置], a few faint scattered star-like dots.
> Elegant, minimal, high-end editorial mood. No text, no letters, no logos, no people,
> no UI elements, no window frames. Darkest areas remain near-black so white text stays
> readable on top. Wide 16:9 composition with [テキストを置く側] calmer and emptier.

保存先は `public/<ページ名>/` 配下。1.5〜2MB 程度の PNG は許容（next/image が配信最適化する）。

## ページ移行チェックリスト

1. 正典 `src/app/founder/page.tsx` を読み、`Shell` / `Section` / スタイル定数を転記または将来の共通化モジュールから import
2. パレット置換（旧ライトの gray 系 → 上記トークン）。置換後に旧色の grep が 0 件であること
3. ローカルダークヘッダー + Footer の overflow-hidden ラッパー
4. セクショングローを交互に配置、アイコン正方形・カードグリッドを行リストへ解体
5. モーションは founder-motion の 2 種のみ
6. 品質フロア全項目 + モバイル実測 + `npm run check:all`
7. 複数ページが移行した時点で、`Shell` / `Section` / トークン定数の共通モジュール化を検討（それまでは正典からの転記でよい）
