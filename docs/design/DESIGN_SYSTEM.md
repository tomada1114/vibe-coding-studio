# Geist Grid デザインシステム

> 提案書（唯一の情報源）: [`docs/design/proposals/2026-09-geist-grid.md`](./proposals/2026-09-geist-grid.md)
> 本ドキュメントは提案書のうち、日々の実装で参照する値とルールを「実装者向けリファレンス」として
> 再構成したものです。トークン値・数値上限を変更したい場合は提案書を更新し、本ドキュメントへ反映してください。

---

## 1. 北極星

**黒い方眼紙の上に置かれた、エンジニアの職務経歴書** — Vercel Geist の厳密なトークンで組み、1px の罫線がセルを切り、そこに青い光が一点だけ差す。

- **方眼紙** = 構造が見えていること（罫線とセルが常に主役）
- **職務経歴書** = 装飾ではなく事実（書籍・講座・動画・経歴）が読まれること
- **青い光が一点だけ** = 派手さは存在するが、必ず数を制限された特権であること

すべての実装判断はこの一文に立ち返って検証する。

## 2. 設計原則（Reference lock 要旨）

### Primary

Vercel / Geist Design System。カラースケール、フォント、radius、フォーカスリング、シャドウは Geist の公式値をそのまま使う。**独自の色を発明しない。**

### Geist から必ず保つもの

1. `--ds-*` カラースケールの意味論: 100–300 = コンポーネント背景（default/hover/active）、400–600 = ボーダー（default/hover/active）、700–800 = 高コントラスト塗り、900–1000 = テキスト・アイコン。
2. Geist Sans / Geist Mono の 2 書体体制と `font-feature-settings: "liga" 1, "ss05" 1"`。
3. `--geist-radius: 6px` を基準単位とする（0 / 6px / 9999px の 3 値しか使わない）。
4. フォーカスリングの形: `0 0 0 2px var(--bg), 0 0 0 4px var(--focus)`（二重リング）。
5. near-achromatic: UI のグレーは彩度を持たない。色は情報（リンク・状態）か、限定された装飾だけ。

### 借用対象（限定条件つき）

- **Verse**: 「1px 罫線で仕切られた radius 0 のセル」と「セル上辺に置く 11px / uppercase / letter-spacing 0.08em の Geist Mono ラベル」の 2 点のみ。全文モノスペース・罫線色・無彩色縛りは借用しない。
- **Langbase**: 「純黒地に極薄の格子線を敷く背景」と「青の放射状グロー」の 2 点のみ。グラデーションをボタンや面の塗りに使うことは禁止。
- **Linear Changelog**: 背景色レイヤリング＋1px 罫線で階層を作る手法、中間ウェイト（500〜600）の見出し。

### 却下される選択（Reject）

以下は「無難だが記憶に残らないダークサイト」に収束させる選択であり、明示的に禁止する。

- `#0B1020` のような青みがかったダーク背景（Blueprint Night の継承を含む）
- カード全面に `border-radius: 12px` + ぼかしシャドウ
- グラデーションボーダー / グラスモーフィズム
- 紫〜ピンクのグラデーション CTA（旧 `--color-accent: #7c5cfc` を含め廃止）
- 見出しを Bold(700) + 特大サイズで殴る構成
- セクションごとに背景色を交互に変えるゼブラ構成
- アイコンを色分けした feature カード 3 列
- `dark:` プレフィックスによる二重クラス指定（トークン層で解決する）
- 和文への明朝体混在
- 意味のない 3D / パーティクル / タイプライターアニメーション

## 3. カラートークン

出典は Vercel Geist の配信値。**Geist のスケール値は改変せず**、その上にセマンティックトークンを薄く定義する。

### ダーク（既定テーマ）

| トークン | Geist ソース | 値 | 用途 |
|---|---|---|---|
| `--bg` | `--ds-background-100` | `#000000` | ページ背景 |
| `--bg-subtle` | `--ds-background-200` | `#000000` | ダークでは 100/200 が同値。段差はボーダーで出す |
| `--surface-1` | `--ds-gray-100` | `#1a1a1a` | セル内の塗り、コードブロック地、hover 面 |
| `--surface-2` | `--ds-gray-200` | `#1f1f1f` | active 面、ネストしたセル |
| `--surface-3` | `--ds-gray-300` | `#292929` | 選択状態、タグの塗り |
| `--border` | `--ds-gray-400` | `#2e2e2e` | グリッド罫線・セル境界 |
| `--border-hover` | `--ds-gray-500` | `#454545` | hover 時の罫線 |
| `--border-strong` | `--ds-gray-600` | `#878787` | active / 強調したい仕切り |
| `--text-primary` | `--ds-gray-1000` | `#ededed` | 見出し・本文 |
| `--text-secondary` | `--ds-gray-900` | `#a0a0a0` | 補足文・リード文 |
| `--text-muted` | `--ds-gray-700` | `#8f8f8f` | メタ情報・日付・モノラベル |
| `--link` | `--ds-blue-900` | `#50a8ff` | テキストリンク、アクティブなナビ |
| `--accent-solid` | `--ds-blue-700` | `#0071f6` | 塗りボタン（白文字）、選択インジケータ |
| `--accent-glow` | `--ds-blue-600` | `#0090ff` | 装飾専用。グロー／グラデーションの基色。文字には使わない |
| `--focus` | `--ds-blue-900` | `#50a8ff` | フォーカスリング |

### ライト（手動切替）

| トークン | Geist ソース | 値 | 用途 |
|---|---|---|---|
| `--bg` | `--ds-background-100` | `#ffffff` | ページ背景 |
| `--bg-subtle` | `--ds-background-200` | `#fafafa` | セクション地、セル内の薄い塗り |
| `--surface-1` | `--ds-gray-100` | `#f2f2f2` | hover 面、コードブロック地 |
| `--surface-2` | `--ds-gray-200` | `#ebebeb` | active 面 |
| `--surface-3` | `--ds-gray-300` | `#e6e6e6` | 選択状態、タグの塗り |
| `--border` | `--ds-gray-400` | `#eaeaea` | グリッド罫線 |
| `--border-hover` | `--ds-gray-500` | `#c9c9c9` | hover 時の罫線 |
| `--border-strong` | `--ds-gray-600` | `#a8a8a8` | active / 強調 |
| `--text-primary` | `--ds-gray-1000` | `#171717` | 見出し・本文 |
| `--text-secondary` | `--ds-gray-900` | `#4d4d4d` | 補足文 |
| `--text-muted` | `--ds-gray-800` | `#7d7d7d` | メタ情報（サイズ制限あり、下記参照） |
| `--link` | `--ds-blue-800` | `#005edc` | テキストリンク（`blue-700` は AA 未達のため 800 を採用） |
| `--accent-solid` | `--ds-blue-700` | `#0070f7` | 塗りボタン（白文字） |
| `--accent-glow` | `--ds-blue-600` | `#51aeff` | 装飾専用 |
| `--focus` | `--ds-blue-700` | `#0070f7` | フォーカスリング |

### コントラスト検証（WCAG 2.1）

AA 本文 = 4.5:1、AA 大文字（18.66px 以上 or 14px 以上 Bold）= 3.0:1。

| テーマ | 前景 / 背景 | 比 | 判定・制約 |
|---|---|---|---|
| Dark | `--text-primary` `#ededed` / `#000000` | 17.94 | AA/AAA 合格 |
| Dark | `--text-secondary` `#a0a0a0` / `#000000` | 8.03 | AA/AAA 合格 |
| Dark | `--text-muted` `#8f8f8f` / `#000000` | 6.49 | AA 合格 |
| Dark | `--link` `#50a8ff` / `#000000` | 8.39 | AA/AAA 合格 |
| Dark | `#ffffff` / `--accent-solid` `#0071f6` | 4.47 | AA 大文字のみ。**塗りボタンのラベルは 16px / weight 500 以上に固定** |
| Light | `--text-primary` `#171717` / `#ffffff` | 17.93 | AA/AAA 合格 |
| Light | `--text-secondary` `#4d4d4d` / `#ffffff` | 8.45 | AA/AAA 合格 |
| Light | `--text-muted` `#7d7d7d` / `#ffffff` | 4.12 | AA 大文字のみ。**ライトの muted は 13px 以下の本文に使用禁止**。メタは `--text-secondary` に格上げするか 18.66px 以上で使う |
| Light | `--link` `#005edc` / `#ffffff` | 5.78 | AA 合格 |
| Light | `#ffffff` / `--accent-solid` `#0070f7` | 4.51 | AA 合格 |

ボーダー色（`#2e2e2e` / `#eaeaea`）は非テキストコントラスト 3:1 を満たさない。これは意図的で、罫線は装飾的な構造線として扱う。**情報の識別に罫線だけを使わず**、フォーカス・選択・エラーは必ず `--focus` / `--border-strong` / テキストラベルを併用する（WCAG 1.4.11 回避）。

## 4. 派手さ予算（数値上限）

派手さを担当するのは **(a) 青のグロー、(b) faint grid の背景線、(c) 罫線の線形グラデーション** の 3 つだけ。

| 項目 | 上限 |
|---|---|
| 1 ページあたりのグロー数 | 最大 2 個（ヒーロー 1 + フッター付近 1） |
| 1 ビューポートに同時に見えるグロー数 | 1 個 |
| グローの最大不透明度 | 0.18（`--accent-glow` 基準） |
| グローの最大ぼかし半径 | 160px |
| 彩度を持つピクセルが占めるビューポート面積 | 8% 以下 |
| conic / 線形グラデーションの使用箇所 | 1 ページ最大 2 箇所。用途は罫線・区切り線・背景テクスチャのみ。**面の塗り・ボタン・カード背景には禁止** |
| faint grid の線の不透明度 | ダーク `rgba(255,255,255,0.025)` / ライト `rgba(0,0,0,0.035)`。線幅 1px 固定、セル 64px |
| アニメーションするグローの数 | 0（グローは静止。動くのはホバー時の罫線色のみ） |

実装スニペットは `DESIGN_SYSTEM_PATTERNS.md` の背景テクスチャ節を参照。

## 5. タイポグラフィ

### 書体の役割分担

| 書体 | 担当 |
|---|---|
| Geist Sans（欧文） | 見出し、本文、UI ラベル、ボタン、ナビゲーション |
| Geist Mono（欧文） | セルのモノラベル、日付・時刻、タグ、数値メタ、コード、URL・出典ドメイン |
| Noto Sans JP（和文） | 日本語グリフ全般。`font-family` の 2 番目に置く |

原則: **Geist Mono は「機械が生成した／機械が読む値」に対応させる**。日付・ID・コード・出典。人間の散文には使わない。

### 和文フォント選定

**推奨: Noto Sans JP**（9 段ウェイト、骨格の個性が薄く Geist Sans に従属、グリフカバレッジが広い）。IBM Plex Sans JP・BIZ UDPGothic・Zen Kaku Gothic New は不採用または次点（詳細は提案書 §4.2）。

移行時は日本語ページ 1 枚あたりのフォント転送量を Network パネルで実測し、閾値を超えた場合は手動サブセット化に切り替える。

### 和欧混植の指針

- 和文本文の line-height は **1.85**（Geist の欧文既定 1.5 では詰まる）。見出しは 1.3、display は 1.15。
- 和文本文の letter-spacing は **0**。負のトラッキングは **24px 以上の見出しにのみ、上限 `-0.02em`**。
- `text-spacing-trim: normal` と `word-break: auto-phrase` を本文に適用。
- 表・メタ情報の数値のみ Geist Mono + `font-variant-numeric: tabular-nums`。本文中の数値・製品名は Geist Sans。
- 本文に `line-break: strict`（禁則処理）。

### 型スケール

| ロール | サイズ | line-height | letter-spacing | ウェイト | 書体 |
|---|---|---|---|---|---|
| `label-mono` | 11px | 1.2 | +0.08em / uppercase | 500 | Geist Mono |
| `caption` | 12px | 1.6 | 0 | 400 | Sans |
| `meta-mono` | 13px | 1.5 | 0 | 400 | Geist Mono |
| `body-sm` | 14px | 1.8 | 0 | 400 | Sans |
| `body` | 16px | 1.85 | 0 | 400 | Sans |
| `body-lg`（リード文） | 18px | 1.8 | 0 | 400 | Sans |
| `heading-sm` | 20px | 1.5 | -0.01em | 500 | Sans |
| `heading` | 24px | 1.4 | -0.015em | 500 | Sans |
| `heading-lg` | 32px | 1.3 | -0.02em | 500 | Sans |
| `display` | 40px | 1.2 | -0.02em | 600 | Sans |
| `display-lg` | 56px | 1.1 | -0.02em | 600 | Sans |

`display-lg` はトップページの氏名／肩書にのみ使用。**ウェイト 700 は使わない。**

## 6. Do / Don't

### Do

- 色は必ずセマンティックトークン経由で参照する（`var(--text-secondary)` / `text-text-secondary`）。生の hex を書かない。
- 新しい色が必要になったら、まず `--ds-*` スケールの既存 10 段から探す。無ければ「本当に必要か」を疑う。
- セルの罫線は常に 1px。強調は色（`--border-strong`）で行う。
- 日付・時刻・ID・出典ドメイン・コード・タイムスタンプ・数値メタは Geist Mono。
- 見出しは 500〜600。700 は使わない。
- グローを置いたら他のグローを数える（1 ビューポート 1 個、1 ページ 2 個まで）。
- 和文本文は `line-height: 1.85` / `letter-spacing: 0` / `line-break: strict`。
- インタラクションは背景色と罫線色の変化のみ。150ms ease-out。
- フォーカスは必ず Geist の二重リング。`outline: none` を単独で書かない。
- 画像は `next/image`、`--radius-control`（6px）、必ずキャプションまたは `alt`。

### Don't

- ❌ `#0B1020` などの青紫ダーク背景。Blueprint Night のトークンを 1 つでも持ち込む。
- ❌ 紫〜ピンクのグラデーション CTA。グラデーションを面の塗りに使う。
- ❌ カードに `border-radius: 12px` ＋ ぼかしシャドウ。hover で `translateY(-4px)` させる。
- ❌ グラスモーフィズム（ヘッダーの薄い blur を除く）。ネオンのテキストシャドウ。
- ❌ 明朝体。和文の斜体。和文への負のトラッキング（24px 以上の見出しを除く）。
- ❌ 絵文字をセクション見出しのアイコン代わりに使う（`💡` `⏰` 等）。
- ❌ 中身のない体言止めキャッチ、「革新的」「シームレス」等の評価語の自称。
- ❌ 意味のない 3 列アイコンカード、カウントアップアニメーション、パーティクル背景。
- ❌ タグをカテゴリごとに色分けする。状態色を `--accent-solid` と `--ds-amber-700` 以外に増やす。
- ❌ 多色シンタックスハイライトテーマ（Dracula / One Dark 等）。
- ❌ コンポーネント内に `dark:` を書く（トークンで解決できないことを証明できる場合を除く）。

## 7. 関連ドキュメント

- コンポーネント仕様: [`DESIGN_SYSTEM_COMPONENTS.md`](./DESIGN_SYSTEM_COMPONENTS.md)
- レイアウト・グリッド規則: [`DESIGN_SYSTEM_PATTERNS.md`](./DESIGN_SYSTEM_PATTERNS.md)
- テーマ実装・i18n: [`THEME_AND_I18N.md`](./THEME_AND_I18N.md)
- 旧 Catalyst コンポーネント（移行完了まで残置）: [`CATALYST_COMPONENTS.md`](./CATALYST_COMPONENTS.md)
