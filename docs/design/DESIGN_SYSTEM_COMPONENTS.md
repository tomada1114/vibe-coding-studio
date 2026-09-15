# Geist Grid コンポーネント仕様

> 提案書（唯一の情報源）: [`docs/design/proposals/2026-09-geist-grid.md`](./proposals/2026-09-geist-grid.md) §6
> トークン値は [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) を参照。ここではコンポーネント単位の実装仕様のみを扱う。

---

## 1. ヘッダー

- 高さ 56px、`position: sticky; top: 0`、背景 `color-mix(in oklab, var(--bg) 80%, transparent)` + `backdrop-filter: blur(8px)`、下辺に 1px `--border`。
- 左: サイト名／氏名（Sans 15px / 500）。ナビ: Sans 14px、`--text-secondary`、現在地のみ `--text-primary` ＋ 下辺 1px `--accent-solid`。
- **右上に言語トグルとテーマトグルを並べる。プルダウンは使わない。**

### 言語トグル（セグメント型ボタン）

```
┌──────┬──────┐
│  JA  │  EN  │   ← 2つのセグメントが1px罫線で仕切られた1つのセル
└──────┴──────┘
```

- マークアップ: `<div role="group" aria-label="言語切り替え">` の中に `<a>` を 2 つ（`hreflang` つき）。**リンクであることが重要**（URL が変わる遷移のため、ボタンではなくリンク）。
- サイズ: 高さ 28px、各セグメント `padding: 0 10px`、Geist Mono 11px / uppercase / +0.08em。
- 見た目: 外枠 1px `--border`、`--radius-control`（6px）。非アクティブ `--text-muted` 透明地、アクティブ `--text-primary` ＋ 地 `--surface-1`。
- アクティブ側に `aria-current="true"`。

```tsx
<div role="group" aria-label="言語切り替え" className="inline-flex rounded-[6px] border border-border">
  <a href="/" hrefLang="ja" aria-current="true" className="px-[10px] h-7 flex items-center font-mono text-[11px] uppercase tracking-[0.08em] text-text-primary bg-surface-1">
    JA
  </a>
  <a href="/en" hrefLang="en" className="px-[10px] h-7 flex items-center font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted border-l border-border">
    EN
  </a>
</div>
```

### テーマトグル（2 状態のアイコンボタン）

- 言語トグルの右に 8px 空けて配置。28×28px、`--radius-control`、外枠 1px `--border`。
- 中身は月／太陽のアウトラインアイコン（1.5px ストローク、`--text-muted`、hover で `--text-primary`）。
- `<button type="button" aria-label="テーマを切り替え" aria-pressed={isDark}>`。dark ⇄ light の**2 状態のみ**（"system" は持たない）。
- 初回のみ `prefers-color-scheme` で初期値を決めるが、判定不能・no-preference はダーク（詳細は `THEME_AND_I18N.md`）。
- モバイル（`< 640px`）ではヘッダーバーに残す。折り畳まれるのはナビだけ。

## 2. ボタン階層

| 階層 | 見た目 | 用途 |
|---|---|---|
| Primary | 地 `--accent-solid`、文字 `#ffffff`、`--radius-pill`、`padding: 0 20px`、高さ 40px、16px / weight 500 以上（コントラスト 4.47 のため小さくしない） | ページに 1 つ。書籍購入・講座申込 |
| Secondary | 地 `--text-primary`、文字 `--bg`、`--radius-pill`、高さ 40px | Primary が無いページの主要導線 |
| Outline | 透明地、文字 `--text-primary`、枠 1px `--border`、`--radius-control`、高さ 36px。hover で枠 `--border-hover` ＋ 地 `--surface-1` | 一覧の「もっと見る」、副次導線 |
| Ghost | 透明地、文字 `--text-secondary`、枠なし。hover で文字 `--text-primary` ＋ 地 `--surface-1` | ヘッダーナビ、セル内の補助操作 |
| Link-button | 文字 `--link`、下線なし、hover で下線 | 外部リンク。末尾に `↗`（12px） |

全てフォーカス時に Geist の二重リング。**グラデーション塗りのボタンは存在しない。**

```css
.btn-primary {
  background: var(--accent-solid);
  color: #ffffff;
  border-radius: var(--radius-pill);
  padding: 0 20px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
}
.btn-primary:focus-visible {
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--focus);
}
```

## 3. リンク

- 本文中: `--link` 色、`text-decoration: underline`、`text-underline-offset: 0.2em`、`text-decoration-thickness: 1px`、`text-decoration-color: color-mix(in oklab, var(--link) 40%, transparent)`。hover で下線を不透明に。
- 外部リンク: 末尾に `↗`（Geist Mono 由来の記号、12px、`--text-muted`）。
- ナビ・一覧のタイトル: 既定で下線なし、hover で下線。

```css
.link-body {
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 1px;
  text-decoration-color: color-mix(in oklab, var(--link) 40%, transparent);
}
.link-body:hover {
  text-decoration-color: var(--link);
}
```

## 4. タグ / バッジ（モノラベル）

| 種類 | 仕様 |
|---|---|
| Mono ラベル（セル見出し） | Geist Mono 11px / uppercase / +0.08em / `--text-muted` / 装飾なし |
| タグ（分類） | Geist Mono 11px、地 `--surface-1`、文字 `--text-secondary`、枠なし、`--radius-control`、`padding: 3px 8px`。hover で地 `--surface-2` |
| 状態バッジ | 同上に 6px のドットを前置。`NEW` = `--accent-solid`、`UPDATED` = `--ds-amber-700`（ダーク `#ffb200` / ライト `#f90`）。**状態色はこの 2 つだけ** |
| カウントバッジ | Geist Mono 11px / tabular-nums / `--text-muted` |

タグに色を持たせない（カテゴリごとの色分け禁止）。近似色のタグが並ぶと near-achromatic 規律が崩れる。

```css
.tag {
  font-family: var(--font-mono);
  font-size: 11px;
  background: var(--surface-1);
  color: var(--text-secondary);
  border-radius: var(--radius-control);
  padding: 3px 8px;
}
.tag:hover { background: var(--surface-2); }
```

## 5. セル（カード）

独立した「カード」コンポーネントは作らない。**全てのカードはグリッドセル（`.cell`）である。**

- 地 `--bg`、枠は親グリッドの 1px gap が担当、radius 0、padding 20px（デスクトップ）/ 16px（モバイル）。
- hover: 地 `--surface-1`（150ms ease-out）。**translateY やスケールは使わない。**
- セル内で角丸を持てるのは画像・埋め込みのみ（`--radius-control` 6px）。

```css
.cell-grid {
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
.cell {
  background: var(--bg);
  padding: 20px;
  transition: background 150ms ease-out;
}
.cell:hover { background: var(--surface-1); }
```

セル構造・グリッド全体の規則は `DESIGN_SYSTEM_PATTERNS.md` を参照。

## 6. コードブロック

- 地 `--surface-1`、枠 1px `--border`、radius **0**（本文幅から左右のガターぶんはみ出して全幅にしてよい）。
- Geist Mono 13px / line-height 1.7 / tabular-nums off。
- 上辺に言語ラベル（Mono 11px / uppercase / `--text-muted`）＋ 右端にコピーボタン（Ghost, 24×24px）。
- シンタックスハイライト: `prism-react-renderer` を使い、**キーワードのみ `--link`、文字列は `--ds-teal-700`、コメントは `--text-muted`、それ以外は `--text-primary`** の 4 色に制限。多色テーマ（Dracula 等）は使わない。
- インラインコード: 地 `--surface-1`、`padding: 1px 5px`、`--radius-control`、Geist Mono 0.9em、`--text-primary`。

```css
.code-block {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
}
.code-inline {
  background: var(--surface-1);
  padding: 1px 5px;
  border-radius: var(--radius-control);
  font-family: var(--font-mono);
  font-size: 0.9em;
}
```

## 7. 記事本文のタイポ

| 要素 | 仕様 |
|---|---|
| 本文幅 | 720px（約 40〜45 全角字/行） |
| `p` | `body`（16px / 1.85 / ls 0）、段落間 24px、`--text-primary` |
| `h2` | `heading-lg`（32px / 500）、上に全幅 1px 罫線、`margin-top: 64px`、罫線からの間隔 24px |
| `h3` | `heading`（24px / 500）、`margin-top: 40px` |
| `ul` / `ol` | マーカーは `--text-muted`、`li` 間 8px、インデント 1.4em |
| `blockquote` | 左に 2px の縦線（`--border-strong`）、地なし、`--text-secondary`、斜体にしない |
| `img` | 全幅、`--radius-control`、下にキャプション（`caption` / `--text-muted` / 中央揃え） |
| `table` | セルグリッドと同じ 1px 罫線。ヘッダ行は Mono 11px uppercase、数値列は tabular-nums 右寄せ |
| `hr` | 全幅 1px `--border`、上下 48px |

`@tailwindcss/typography` は使い続けてよいが、`prose` の色・行間・見出しマージンは上記トークンで全て上書きする。

```css
h2 {
  margin-top: 64px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
  font-size: 32px;
  font-weight: 500;
}
```

## 8. フォーカスリング

Geist の二重リングを全インタラクティブ要素で共通に使う。`outline: none` を単独で書かない。

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--focus);
}
```

## 9. 関連ドキュメント

- トークン全表・派手さ予算・タイポグラフィ: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- レイアウト・グリッド規則・ページ骨格: [`DESIGN_SYSTEM_PATTERNS.md`](./DESIGN_SYSTEM_PATTERNS.md)
- テーマ実装・i18n: [`THEME_AND_I18N.md`](./THEME_AND_I18N.md)
