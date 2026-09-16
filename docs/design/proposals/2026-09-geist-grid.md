# Geist Grid — 新デザインシステム提案書

> 対象リポジトリ: `vibe-coding-studio`（Next.js 15.5 App Router / Tailwind CSS v4 / TypeScript）
> 作成日: 2026-09-15 / ステータス: 提案（未承認）
> 位置づけ: 既存 `docs/design/*.md`（Radiant 系）および `.claude/skills/blueprint-night-design/` を**置き換える**ための土台。本提案書は既存ファイルを一切編集していない。

---

## 1. 北極星とリサーチ要約

### 一文の北極星

**黒い方眼紙の上に置かれた、エンジニアの職務経歴書** — Vercel Geist の厳密なトークンで組み、1px の罫線がセルを切り、そこに青い光が一点だけ差す。

この一文が全ての判断基準になる。「方眼紙」＝構造が見えていること（罫線とセルが常に主役）。「職務経歴書」＝装飾ではなく事実（書籍・講座・経歴）が読まれること。「青い光が一点だけ」＝派手さは存在するが、必ず数を制限された特権であること。

### 参照リサーチ要約

| 参照スタイル | 何を採るか | 何を採らないか |
|---|---|---|
| **Vercel**（Primary / Refero `32824f01`） | Geist Sans + Geist Mono、near-achromatic なグレー基盤、タイトな負のレターススペーシング（display で -0.72px 相当）、`--geist-radius: 6px` を基準にした控えめな角丸、pill 型ボタン、1px の「シャドウ罫線」でカードを起こす手法、compact density（要素間 12px） | ライトテーマ基調そのもの（本サイトはダーク既定）。conic グラデーションのヒーローを**全面採用**すること（後述の「派手さ枠」に限定）。多色の decorative accent（crimson / teal / yellow を同時に散らす運用） |
| **Verse**（Refero `0e932a67`） | 1px 罫線で切られたグリッドセル、radius 0 のセル、モノスペースの小さなラベル／メタテキスト、80px の section gap による明快な縦リズム、塗りに頼らない ghost 的インタラクション | 全文モノスペース（可読性と和文で破綻する）。`#e5e7eb` という明るすぎる罫線色（Geist の `--ds-gray-400` に置換）。アクセント色ゼロの完全モノクロ（オーナー要件「少し派手さ」に反する） |
| **Linear Changelog**（Refero `11d3e58a`） | ダーク面の階層の作り方（背景色レイヤリング＋1px 罫線だけで奥行きを出し、拡散シャドウを使わない）、見出しに太字でなく中間ウェイト（500〜600）を使う抑制、日付をモノスペースで打つ changelog カードの型 | Inter / Berkeley Mono（フォントは Geist に統一）。8px radius のカード（本提案はセル＝radius 0）。9999px を全ボタンに適用する運用（本提案は階層で使い分け） |
| **Langbase**（Refero `6faf7a27`） | 純黒地に faint grid line を敷いてセクション境界を暗示する手法、グラデーションを「データの活動」の表現として**テクスチャ扱い**し CTA の塗りには使わない規律、2階調しか本文色を使わないルール | 黒地に対する彩度の高いグラデーションの面積（そのままだと派手さが上限を超える）。写真を一切使わない方針（本サイトは著者近影・書影が必須） |

**統合の骨子**: 基盤は Vercel/Geist。構造は Verse のセル罫線とモノラベル。階層表現は Linear の「塗り分け＋罫線、シャドウなし」。派手さは Langbase の faint grid と glow を、数値上限つきで借りる。

---

## 2. Reference lock

### Primary

**Vercel / Geist Design System**（`https://vercel.com/geist`）。カラースケール、フォント、radius、フォーカスリング、シャドウの定義は**Geist の公式値をそのまま使う**。独自の色を発明しない。

### Preserve（Geist から必ず保つもの・5個）

1. **`--ds-*` カラースケールの意味論**: 100–300 = コンポーネント背景（default / hover / active）、400–600 = ボーダー（default / hover / active）、700–800 = 高コントラスト塗り、900–1000 = テキスト・アイコン（secondary / primary）。この段階の意味を崩して色を選ばない。
2. **Geist Sans / Geist Mono の 2 書体体制**と `font-feature-settings: "liga" 1, "ss05" 1`。
3. **`--geist-radius: 6px` を基準単位**とすること（0 / 6px / 9999px の 3 値しか使わない）。
4. **フォーカスリングの形**: `0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)`（背景色で 2px 抜いてから 2px のリングを描く Geist の二重リング）。
5. **near-achromatic**: UI のグレーは彩度を持たない。色は情報（リンク・状態）か、限定された装飾だけ。

### Borrow only（借用する対象と、その限定条件）

- **Verse のセル罫線＋モノラベル** — 借用対象は「1px 罫線で仕切られた radius 0 のセル」と「セル左上（または上辺）に置く 11px / uppercase / letter-spacing 0.08em の Geist Mono ラベル」の 2 点のみ。Verse の全文モノスペース、罫線色、無彩色縛りは借用しない。
- **Langbase の faint grid / 発光** — 借用対象は「純黒地に極薄の格子線を敷く背景」と「青の放射状グロー」の 2 点のみ。使用は §3 の「派手さ予算」の数値上限に従う。グラデーションを**ボタンや面の塗りに使うことは禁止**（Langbase の規律をそのまま継承）。

### Role rules（どの参照がどの役割を支配するか）

| 役割 | 支配する参照 | 他参照の介入 |
|---|---|---|
| 色・書体・radius・フォーカス | Vercel / Geist | 不可（例外なし） |
| ページ骨格・セル・ラベル | Verse | 罫線色と radius は Geist が上書き |
| ダーク面の階層・メタ表示 | Linear Changelog | フォントは Geist が上書き |
| 背景テクスチャ・グロー | Langbase | 面積・数は §3 の予算が上書き |
| 本文タイポグラフィ（和文） | 本提案の独自判断（§4） | — |

### Reject（平均化して「安全な中間」に落ちる選択の列挙）

以下は明示的に却下する。どれも「無難だが記憶に残らないダークサイト」に収束させる選択である。

- `#0B1020` のような**青みがかったダーク背景**。Geist は `--ds-background-100: #000` の純黒であり、青紫に寄せた瞬間に Geist ではなくなる。Blueprint Night の継承もここで断つ。
- **カード全面に `border-radius: 12px` + ぼかしシャドウ**。どのテンプレートにもある処理で、罫線グリッドの構造が消える。
- **グラデーションボーダー / グラスモーフィズム**。2020年代前半の AI プロダクト LP の既定値で、個人サイトに使うと出自が透ける。
- **紫〜ピンクのグラデーション CTA**。既存の `--color-accent: #7c5cfc` を含め、今回で廃止する。
- **見出しを Bold(700) + 特大サイズで殴る**構成。Linear の「中間ウェイトで権威を出す」規律を採る。
- **セクションごとに背景色を交互に変える**（白 / 薄グレーのゼブラ）。ダークでは濁るだけで階層にならない。
- **アイコンを色分けした feature カード 3 列**。SaaS LP のテンプレそのもので、著者サイトには情報がない。
- **`dark:` プレフィックスによる二重クラス指定**。トークン層で解決すべきものを DOM に漏らす（§7）。
- **和文に明朝体を混ぜる「エディトリアル感」**。オーナー要件により全面禁止。
- **ヒーローに意味のない 3D / パーティクル / タイプライターアニメーション**。

---

## 3. トークン

### 3.1 カラー（Geist 公式値をそのまま採用）

出典は Vercel の配信 CSS（`vercel.com/geist/colors` の `:root, .light-theme` / `.dark, .dark-theme` ブロック）から抽出した実値。**Geist のスケール値は改変しない。** 本サイト用のセマンティックトークンをその上に薄く定義する。

#### ダーク（既定テーマ）

| セマンティックトークン | Geist ソース | 値 | 用途 |
|---|---|---|---|
| `--bg` | `--ds-background-100` | `#000000` | ページ背景（全面）|
| `--bg-subtle` | `--ds-background-200` | `#000000` | ダークでは背景 100/200 が同値。段差はボーダーで出す |
| `--surface-1` | `--ds-gray-100` | `#1a1a1a` | セル内の塗り、コードブロック地、hover 面 |
| `--surface-2` | `--ds-gray-200` | `#1f1f1f` | active 面、ネストしたセル |
| `--surface-3` | `--ds-gray-300` | `#292929` | 選択状態、タグの塗り |
| `--border` | `--ds-gray-400` | `#2e2e2e` | グリッド罫線・セル境界（既定）|
| `--border-hover` | `--ds-gray-500` | `#454545` | hover 時の罫線 |
| `--border-strong` | `--ds-gray-600` | `#878787` | active / 強調したい仕切り |
| `--text-primary` | `--ds-gray-1000` | `#ededed` | 見出し・本文 |
| `--text-secondary` | `--ds-gray-900` | `#a0a0a0` | 補足文・リード文 |
| `--text-muted` | `--ds-gray-700` | `#8f8f8f` | メタ情報・日付・モノラベル |
| `--link` | `--ds-blue-900` | `#50a8ff` | テキストリンク、アクティブなナビ |
| `--accent-solid` | `--ds-blue-700` | `#0071f6` | 塗りボタン（白文字）、選択インジケータ |
| `--accent-glow` | `--ds-blue-600` | `#0090ff` | **装飾専用**。グロー／グラデーションの基色。文字には使わない |
| `--focus` | `--ds-blue-900` | `#50a8ff` | フォーカスリング（Geist ダークの `--ds-focus-color`）|

#### ライト（手動切替）

| セマンティックトークン | Geist ソース | 値 | 用途 |
|---|---|---|---|
| `--bg` | `--ds-background-100` | `#ffffff` | ページ背景 |
| `--bg-subtle` | `--ds-background-200` | `#fafafa` | セクション地、セル内の薄い塗り |
| `--surface-1` | `--ds-gray-100` | `#f2f2f2` | hover 面、コードブロック地 |
| `--surface-2` | `--ds-gray-200` | `#ebebeb` | active 面 |
| `--surface-3` | `--ds-gray-300` | `#e6e6e6` | 選択状態、タグの塗り |
| `--border` | `--ds-gray-400` | `#eaeaea` | グリッド罫線（既定）|
| `--border-hover` | `--ds-gray-500` | `#c9c9c9` | hover 時の罫線 |
| `--border-strong` | `--ds-gray-600` | `#a8a8a8` | active / 強調 |
| `--text-primary` | `--ds-gray-1000` | `#171717` | 見出し・本文 |
| `--text-secondary` | `--ds-gray-900` | `#4d4d4d` | 補足文 |
| `--text-muted` | `--ds-gray-800` | `#7d7d7d` | メタ情報（**サイズ制限あり・後述**）|
| `--link` | `--ds-blue-800` | `#005edc` | テキストリンク（`blue-700` ではなく 800 を採る理由は後述）|
| `--accent-solid` | `--ds-blue-700` | `#0070f7` | 塗りボタン（白文字）|
| `--accent-glow` | `--ds-blue-600` | `#51aeff` | 装飾専用 |
| `--focus` | `--ds-blue-700` | `#0070f7` | フォーカスリング（Geist ライトの `--ds-focus-color`）|

#### コントラスト検証（WCAG 2.1）

計測は sRGB 相対輝度で算出。**AA 本文 = 4.5:1、AA 大文字（18.66px以上 or 14px以上 Bold）= 3.0:1**。

| テーマ | 前景 | 背景 | 比 | 判定 |
|---|---|---|---|---|
| Dark | `--text-primary` `#ededed` | `#000000` | **17.94** | AA / AAA 合格 |
| Dark | `--text-secondary` `#a0a0a0` | `#000000` | **8.03** | AA / AAA 合格 |
| Dark | `--text-muted` `#8f8f8f` | `#000000` | **6.49** | AA 合格 |
| Dark | `--link` `#50a8ff` | `#000000` | **8.39** | AA / AAA 合格 |
| Dark | `--text-primary` `#ededed` | `--surface-1` `#1a1a1a` | **14.87** | AA / AAA 合格 |
| Dark | `--text-secondary` `#a0a0a0` | `--surface-1` `#1a1a1a` | **6.66** | AA 合格 |
| Dark | `--text-muted` `#8f8f8f` | `--surface-1` `#1a1a1a` | **5.38** | AA 合格 |
| Dark | `--link` `#50a8ff` | `--surface-1` `#1a1a1a` | **6.95** | AA 合格 |
| Dark | `#ffffff` | `--accent-solid` `#0071f6` | **4.47** | AA 大文字のみ。→ **塗りボタンのラベルは 16px / weight 500 以上に固定**し、それ未満では使わない |
| Light | `--text-primary` `#171717` | `#ffffff` | **17.93** | AA / AAA 合格 |
| Light | `--text-secondary` `#4d4d4d` | `#ffffff` | **8.45** | AA / AAA 合格 |
| Light | `--text-muted` `#7d7d7d` | `#ffffff` | **4.12** | AA 大文字のみ。→ **制約: ライトの muted は 13px 以下の本文に使用禁止**。日付等のメタは `--text-secondary` に格上げするか、18.66px 以上でのみ muted を使う |
| Light | `--text-muted` `#7d7d7d` | `--bg-subtle` `#fafafa` | **3.94** | 同上（大文字のみ）|
| Light | `--link` `#005edc` | `#ffffff` | **5.78** | AA 合格 |
| Light | `--ds-blue-700` `#0070f7` | `#ffffff` | 4.51 | ぎりぎり AA。`#fafafa` 上では **4.32 で不合格**。→ **ライトのリンクは `blue-800 #005edc` を採用する**（これが上表の `--link` を 800 にした理由）|
| Light | `#ffffff` | `--accent-solid` `#0070f7` | **4.51** | AA 合格 |

ボーダー色（`#2e2e2e` / `#eaeaea`）は 1.55:1 / 1.20:1 で、**非テキストコントラスト 3:1 を満たさない**。これは意図的で、罫線は「装飾的な構造線」として扱う。**情報の識別に罫線だけを使わない**（フォーカス・選択・エラーは必ず `--focus` / `--border-strong` / テキストラベルを併用する）ことで WCAG 1.4.11 を回避する。

### 3.2 派手さ予算（数値上限）

「黒一色だと地味」を解決する担当要素は **(a) 青のグロー、(b) faint grid の背景線、(c) 罫線の線形グラデーション** の 3 つだけ。これ以外に派手さを足さない。

| 項目 | 上限 |
|---|---|
| 1 ページあたりのグロー（radial gradient 発光）の数 | **最大 2 個**（ヒーロー 1 + フッター付近 1）|
| 1 ビューポートに同時に見えるグローの数 | **1 個** |
| グローの最大不透明度 | **0.18**（`--accent-glow` 基準）|
| グローの最大ぼかし半径 | **160px**（`filter: blur()` または radial-gradient の到達半径）|
| 彩度を持つピクセルが占めるビューポート面積 | **8% 以下** |
| conic / 線形グラデーションの使用箇所 | **1 ページ最大 2 箇所**。かつ用途は「罫線」「区切り線」「背景テクスチャ」のみ。**面の塗り・ボタン・カード背景には禁止** |
| faint grid の線の不透明度 | ダーク `rgba(255,255,255,0.025)` / ライト `rgba(0,0,0,0.035)`。**線幅は 1px 固定、セル 64px** |
| アニメーションするグローの数 | **0**（グローは静止。動くのはホバー時の罫線色のみ）|

実装の型（ダーク）:

```css
/* 派手さ担当 A: ヒーローのグロー（1画面に1つまで） */
.glow-anchor::before {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: -20%;
  block-size: 60%;
  background: radial-gradient(
    60% 50% at 50% 0%,
    color-mix(in oklab, var(--accent-glow) 18%, transparent) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* 派手さ担当 B: faint grid（背景テクスチャ） */
.grid-field {
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(80% 60% at 50% 0%, #000 0%, transparent 100%);
}

/* 派手さ担当 C: グラデーション罫線（1ページ2本まで） */
.rule-accent {
  block-size: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent-glow) 35%,
    var(--accent-glow) 65%,
    transparent 100%
  );
  opacity: 0.5;
}
```

### 3.3 形状・影・間隔

| トークン | 値 | 用途 |
|---|---|---|
| `--radius-cell` | `0` | グリッドセル、カード、コードブロック、テーブル |
| `--radius-control` | `6px`（Geist `--geist-radius`）| 入力欄、セカンダリボタン、タグ、画像 |
| `--radius-pill` | `9999px` | プライマリ CTA、トグルボタン、アバター |
| `--border-width` | `1px` | 全ての罫線。2px 以上は使わない |
| `--shadow-*` | **使わない**（既定）| 階層は背景色レイヤと罫線で出す。例外はポップオーバー／メニューのみで、その場合 Geist の `--ds-shadow-menu` をそのまま使う |
| フォーカス | `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--focus)` | Geist の二重リングをそのまま |
| spacing base | `4px` | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 |
| element gap | `12px` | セル内の要素間（Vercel の compact density）|
| cell padding | `20px`（デスクトップ）/ `16px`（モバイル）| |
| section gap | `96px`（デスクトップ）/ `64px`（モバイル）| Verse の 80px を Geist の 4px グリッドに合わせて丸めた値 |

---

## 4. タイポグラフィ

### 4.1 書体の役割分担

| 書体 | 担当 |
|---|---|
| **Geist Sans**（欧文）| 見出し、本文、UI ラベル、ボタン、ナビゲーション。`font-feature-settings: "liga" 1, "ss05" 1` を必ず有効化 |
| **Geist Mono**（欧文）| セルの大文字モノラベル、日付・時刻、タグ、数値メタ、コードブロック、インラインコード、URL・出典ドメイン |
| **和文サンセリフ**（後述）| 日本語グリフ全般。`font-family` の 2 番目に置き、Geist Sans が持たない範囲を担当する |

原則: **Geist Mono は「機械が生成した／機械が読む値」に対応させる**。日付、ID、コード、出典。逆に人間の散文には絶対に使わない。これがニュースまとめページ（自動生成物）と手書きブログの視覚的な区別になる。

### 4.2 和文書体の比較と推奨

| 候補 | ウェイト | 骨格 | Geist との相性 | 配信コスト | 評価 |
|---|---|---|---|---|---|
| **Noto Sans JP** | 100–900 の可変（Google Fonts では 9 段）| 低コントラスト・ほぼ幾何学的なモダンゴシック。個性が薄く、字面が安定 | **高**。Geist Sans のネオグロテスク＋幾何学寄りの骨格と衝突しない。中間ウェイト（500/600）が取れるので「太字で殴らない見出し」が和文でも再現できる | Google Fonts 配信は unicode-range で 100 以上のチャンクに分割されるため、実転送量はページ内で使う文字ぶんに限定される | **推奨** |
| IBM Plex Sans JP（現行）| 400 / 500 / 700 の静的3種 | ヒューマニスト寄りで、`a` `g` 等に IBM 特有の癖。和文は角に丸みがあり柔らかい | 中。IBM のブランド書体であり、Vercel の Geist と並べると**2つのブランドの書体が同居している**ように見える。中間ウェイトが 500 止まりで見出し表現の幅が狭い | 同等 | 不採用（Geist と競合） |
| BIZ UDPGothic | 400 / 700 の2種 | UD（ユニバーサルデザイン）系。字幅が広く、ふところが大きく、意図的に「読みやすく優しい」 | 低。密度の高いエンジニアプロフィールに対して字面が広すぎ、情報密度が落ちる。ウェイトが 2 種しかなく階層が作れない | 軽い | 不採用（密度と階層が足りない） |
| Zen Kaku Gothic New | 300–900 | モダンで端正。Noto に近いが若干デザイン性が強い | 中〜高 | 同等 | 次点。Noto より個性が出るのが良し悪し |

**推奨: Noto Sans JP。** 理由は 3 点に集約される。(1) ウェイトが 9 段あり、Geist の「中間ウェイトで権威を出す」規律（Linear から借りた規律）を和文でも成立させられる唯一の候補。(2) 骨格の個性が最も薄く、Geist Sans に**従属する**（和文書体が主張すると Geist が Geist に見えなくなる）。(3) グリフカバレッジが広く、技術記事で出る記号・旧字・絵文字近傍で欠落しにくい。

現行 `src/app/layout.tsx` は「japanese サブセットは数MB規模になるため配信せず OS フォールバックに任せる」としているが、これは過剰に保守的な判断である。Google Fonts の Noto Sans JP CSS は日本語領域を `unicode-range` 付きの多数の woff2 チャンクに分割しており、ブラウザは実際に使われた文字を含むチャンクしか取得しない。**ただし移行時に実測（Network パネルで日本語ページ 1 枚あたりのフォント転送量）を必ず取り、閾値を超えた場合は手動サブセット化（`subset-font` / `pyftsubset`）に切り替える**、という条件つきで採用する。

```ts
// src/app/layout.tsx（移行後の想定）
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Sans_JP } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],          // 日本語はチャンク配信に委ねる
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-jp",
})

// <html> の className に
//   `${GeistSans.variable} ${GeistMono.variable} ${notoSansJP.variable}`
```

`geist` npm パッケージ（v1.7.2）は `geist/font/sans` と `geist/font/mono` を export し、それぞれ `--font-geist-sans` / `--font-geist-mono` の CSS 変数と `.variable` / `.className` を提供する。next/font 経由で self-host されるため外部リクエストは発生しない。

Tailwind v4 側:

```css
@theme inline {
  --font-sans: var(--font-geist-sans), var(--font-noto-sans-jp),
    "Hiragino Sans", "Yu Gothic", sans-serif;
  --font-mono: var(--font-geist-mono), var(--font-noto-sans-jp),
    ui-monospace, "SFMono-Regular", monospace;
}
```

欧文を先に置くことで、ラテン文字は Geist Sans、日本語は Noto Sans JP が担当する自然な混植になる。

### 4.3 和欧混植の指針

- **行間（line-height）**: 和文本文は **1.85**。欧文主体の Geist の既定（1.5 前後）では、かなと漢字の字面の大きさに対して行が詰まって読めない。見出しは 1.3、display は 1.15。
- **字間（letter-spacing）**: 和文本文は **0**（`normal`）。日本語に負のトラッキングをかけると濁点・半濁点が潰れる。**負のトラッキングは 24px 以上の見出しにのみ適用し、上限 `-0.02em`**。Vercel の -0.72px/48px（≒ -0.015em）を上限の目安とする。
- **和欧の間隔**: `text-spacing-trim: normal` と、可能なら `word-break: auto-phrase`（日本語の自然な折返し）を本文に適用。ブラウザ非対応時も劣化しないので無条件で入れてよい。
- **数字と英単語**: 本文中の数値・製品名は Geist Sans（tabular ではない）。表・メタ情報の数値だけ Geist Mono + `font-variant-numeric: tabular-nums`。
- **禁則**: `line-break: strict` を本文に適用。

### 4.4 型スケール

| ロール | サイズ | line-height | letter-spacing | ウェイト | 書体 |
|---|---|---|---|---|---|
| `label-mono` | 11px | 1.2 | **+0.08em** / uppercase | 500 | Geist Mono |
| `caption` | 12px | 1.6 | 0 | 400 | Sans |
| `meta-mono` | 13px | 1.5 | 0 | 400 | Geist Mono |
| `body-sm` | 14px | 1.8 | 0 | 400 | Sans |
| `body` | 16px | **1.85** | 0 | 400 | Sans |
| `body-lg`（リード文）| 18px | 1.8 | 0 | 400 | Sans |
| `heading-sm` | 20px | 1.5 | -0.01em | 500 | Sans |
| `heading` | 24px | 1.4 | -0.015em | 500 | Sans |
| `heading-lg` | 32px | 1.3 | -0.02em | 500 | Sans |
| `display` | 40px | 1.2 | -0.02em | 600 | Sans |
| `display-lg` | 56px | 1.1 | -0.02em | 600 | Sans |

`display-lg` はトップページの氏名／肩書にのみ使用。ウェイトは **700 を使わない**（Linear から借りた規律）。

---

## 5. レイアウト

### 5.1 グリッドセル構造の規則

**コンテナ**

- 最大幅: **1120px**（記事本文は内側で 720px に絞る）。
- 左右ガター: デスクトップ 32px / タブレット 24px / モバイル 16px。
- コンテナの**左右端に 1px の縦罫線を常時引く**（`--border`）。これが「方眼紙の綴じ線」になり、ページ全体に紙のような枠を与える。モバイルではビューポート幅いっぱいなので端の縦罫線は省略する。

**罫線の引き方（重要）**

セルの枠を `border: 1px solid` で個別に描くと交点で 2px になる。以下の規則で 1px を保つ。

- グリッドコンテナに `border-top` と `border-left` を引く。
- 各セルは `border-right` と `border-bottom` のみを持つ。
- または `gap: 1px; background: var(--border)` でセル間の隙間を罫線に見せる（ダークで最も破綻が少ない）。**本提案はこちらを既定とする。**

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
}
.cell:hover { background: var(--surface-1); }
```

**セル余白**: 20px（デスクトップ）/ 16px（モバイル）。セル内の要素間 gap は 12px。
**セルの角丸**: 0。例外なし。
**モノラベル**: 各セルの上辺に `label-mono`（11px / uppercase / +0.08em / `--text-muted`）を置く。例: `ROLE`, `SINCE 2019`, `BOOK`, `COURSE 17`, `SOURCE`, `2026.09.15`。ラベルは**必ず英語**（和文の大文字化は不可能なため）。

**レスポンシブでの崩し方**

| ブレークポイント | グリッド列 |
|---|---|
| `< 640px` | 1 列。セルは縦に積む。横罫線のみ残る |
| `640–1024px` | 2 列 |
| `> 1024px` | 3 列（プロフィール系）/ 2 列（記事一覧） |

列数が変わっても**セルの高さを揃えない**（`align-items: start` ではなく grid の既定で伸ばす＝行ごとに高さが揃う）。中身の量で行が伸びるのは方眼紙として正しい。

### 5.2 ページタイプ別の骨格

#### トップ（プロフィール主）

```
┌─ header ───────────────────────────────── [JA|EN] [☾|☀] ─┐
├───────────────────────────────────────────────────────────┤
│  ▒ faint grid + glow（1個）                                │
│  NAME / 肩書                                display-lg     │
│  1〜2文のポジショニング                       body-lg        │
│  [ 著書を見る ]  [ Udemy ]  [ YouTube ]                    │
├───────────────────────────────────────────────────────────┤  ← rule-accent（1本）
│ ┌─ SINCE ──┬─ COURSES ─┬─ STUDENTS ─┐  ← 数値セル（Mono） │
│ │  2019    │    17     │   10,000+  │                      │
│ └──────────┴───────────┴────────────┘                      │
├───────────────────────────────────────────────────────────┤
│ BOOK — 書影（左 1/3）＋ 概要・購入導線（右 2/3）の 2 セル   │
├───────────────────────────────────────────────────────────┤
│ COURSES — 3 列セルグリッド（各セル: サムネ/講座名/受講者数） │
├───────────────────────────────────────────────────────────┤
│ WRITING — ブログ直近 3 本 ＋ NEWS 直近 3 本を並置           │
├───────────────────────────────────────────────────────────┤
│ CAREER — 年表（左に Mono の年、右に説明）の 1 列セル群      │
└─ footer ──────────────────────────────────────────────────┘
```

数値セル（SINCE / COURSES / STUDENTS）は Geist Mono の 40px。ここが「黒地に情報が刻まれている」印象の核になる。

#### ブログ一覧 / 記事

- **一覧**: 1 列のセルリスト。1 セル = `[日付 Mono 13px]` `[タイトル heading-sm]` `[抜粋 body-sm / --text-secondary]` `[タグ群]`。hover でセル背景が `--surface-1` に。サムネイル画像は使わない（画像がある記事とない記事で列が崩れるより、罫線の規律を優先）。
- **記事**: 本文幅 720px。左に固定の目次カラム（`> 1280px` のみ表示、Mono ラベル + `--text-muted`）。記事ヘッダは `[カテゴリ Mono]` `[タイトル display]` `[公開日・更新日 Mono]` `[本文]`。見出し `h2` の上に 1px の全幅罫線を引く（`margin-top: 64px; border-top: 1px solid var(--border); padding-top: 24px`）。

#### ニュースまとめ 一覧 / 記事（自動生成物）

日付と出典メタが多い前提なので、**Geist Mono の比率を意図的に上げる**。ここが手書きブログとの視覚的な差分になる。

- **一覧**: 日付でグルーピングした changelog 型（Linear から借用）。左カラムに `2026-09-15`（Mono 13px, sticky）、右カラムに当日のトピックセル群。
- **記事**: トピックごとに 1 セル。セル構成は `[SOURCE ドメイン名 Mono 11px uppercase]` `[トピック見出し heading-sm]` `[要約 body-sm]` `[元記事へのリンク（Mono 13px, --link, 末尾に ↗）]`。
- **自動生成であることの明示**: 記事冒頭に 1 セル分の注記バンド（`--surface-1` 地、Mono 11px、`GENERATED BY GITHUB ACTIONS · MODEL-ASSISTED SUMMARY`）。誠実さがそのままデザインの質感になる。
- 出典が複数ある場合は Mono のインラインバッジを横並び（最大 4 件、超過は `+N`）。

#### 講座・書籍ページ

- **書籍**: 上部に書影（左）＋ タイトル・概要・購入リンク（右）の 2 セル。以下に目次を Mono の章番号つき 1 列セル群、読者の声、著者紹介。
- **講座ページ**: `/courses` の一覧をセル化。`[講座サムネ]` `[講座名 heading]` `[概要]` `[トピックタグ]` `[Udemyへの外部リンク]`。

---

## 6. コンポーネント

### 6.1 ヘッダー

- 高さ 56px、`position: sticky; top: 0`、背景 `color-mix(in oklab, var(--bg) 80%, transparent)` + `backdrop-filter: blur(8px)`、下辺に 1px `--border`。
- 左: サイト名／氏名（Sans 15px / 500）。中央〜左寄せ: ナビ（Sans 14px、`--text-secondary`、現在地のみ `--text-primary` ＋ 下辺 1px `--accent-solid`）。
- **右上に言語トグルとテーマトグルを並べる。プルダウンは使わない。**

**言語トグル（セグメント型ボタン）**

```
┌──────┬──────┐
│  JA  │  EN  │   ← 2つのボタンが 1px 罫線で仕切られた 1 つのセル
└──────┴──────┘
```

- マークアップ: `<div role="group" aria-label="言語切り替え">` の中に `<a>` 2つ（`hreflang` つき）。**リンクであることが重要**（URL が変わるので、ボタンではなく遷移）。
- サイズ: 高さ 28px、各セグメント `padding: 0 10px`、Geist Mono 11px / uppercase / +0.08em。
- 見た目: 外枠 1px `--border`、`--radius-control`（6px）。非アクティブ `--text-muted` 透明地、アクティブ `--text-primary` ＋ 地 `--surface-1`。
- アクティブ側に `aria-current="true"`。

**テーマトグル（2状態のアイコンボタン）**

- 言語トグルの右に 8px 空けて配置。28×28px、`--radius-control`、外枠 1px `--border`。
- 中身は月／太陽のアウトラインアイコン（1.5px ストローク、`--text-muted`、hover で `--text-primary`）。
- `<button type="button" aria-label="テーマを切り替え" aria-pressed={isDark}>`。クリックで dark ⇄ light をトグルする**2状態のみ**（"system" の第3状態は持たない。プルダウン禁止という要件とも整合し、押した結果が予測できる）。
- 初回のみ `prefers-color-scheme` で初期値を決めるが、**判定不能・no-preference はダーク**（§7）。
- モバイル（`< 640px`）ではハンバーガー内ではなく**ヘッダーバーに残す**。ナビだけが折り畳まれる。

### 6.2 ボタン階層

| 階層 | 見た目 | 用途 |
|---|---|---|
| Primary | 地 `--accent-solid`、文字 `#ffffff`、`--radius-pill`、`padding: 0 20px`、高さ 40px、**16px / weight 500**（コントラスト 4.47 のため小さくしない）| ページに 1 つ。書籍購入・講座申込 |
| Secondary | 地 `--text-primary`、文字 `--bg`、`--radius-pill`、高さ 40px | Vercel の反転ボタン。Primary が無いページの主要導線 |
| Outline | 透明地、文字 `--text-primary`、枠 1px `--border`、`--radius-control`、高さ 36px。hover で枠 `--border-hover` ＋ 地 `--surface-1` | 一覧の「もっと見る」、副次導線 |
| Ghost | 透明地、文字 `--text-secondary`、枠なし。hover で文字 `--text-primary` ＋ 地 `--surface-1` | ヘッダーナビ、セル内の補助操作 |
| Link-button | 文字 `--link`、下線なし、hover で下線 | 外部リンク。末尾に `↗`（12px） |

全てフォーカス時に Geist の二重リング。**グラデーション塗りのボタンは存在しない。**

### 6.3 リンク

- 本文中: `--link` 色、`text-decoration: underline`、`text-underline-offset: 0.2em`、`text-decoration-thickness: 1px`、`text-decoration-color: color-mix(in oklab, var(--link) 40%, transparent)`。hover で下線を不透明に。
- 外部リンク: 末尾に `↗`（Geist Mono 由来の記号、12px、`--text-muted`）。
- ナビ・一覧のタイトル: 既定で下線なし、hover で下線。

### 6.4 タグ / バッジ（モノラベル）

| 種類 | 仕様 |
|---|---|
| Mono ラベル（セル見出し）| Geist Mono 11px / uppercase / +0.08em / `--text-muted` / 装飾なし |
| タグ（分類）| Geist Mono 11px、地 `--surface-1`、文字 `--text-secondary`、枠なし、`--radius-control`、`padding: 3px 8px`。hover で地 `--surface-2` |
| 状態バッジ | 同上に 6px のドットを前置。`NEW` = `--accent-solid`、`UPDATED` = `--ds-amber-700`（ダーク `#ffb200` / ライト `#f90`）。**状態色はこの 2 つだけ** |
| カウントバッジ | Geist Mono 11px / tabular-nums / `--text-muted` |

タグに**色を持たせない**（カテゴリごとに色分けしない）。近似色のタグが並ぶと Geist の near-achromatic 規律が崩れる。

### 6.5 カード ＝ セル

独立した「カード」コンポーネントは作らない。**全てのカードはグリッドセル**（`.cell`）である。

- 地 `--bg`、枠は親グリッドの 1px gap が担当、radius 0、padding 20px。
- hover: 地 `--surface-1`（150ms ease-out）。**translateY やスケールは使わない。**
- セル内で角丸を持てるのは画像・埋め込みのみ（`--radius-control` 6px）。

### 6.6 コードブロック

- 地 `--surface-1`、枠 1px `--border`、radius **0**（本文幅から左右のガターぶんはみ出して全幅にしてよい）。
- Geist Mono 13px / line-height 1.7 / tabular-nums off。
- 上辺に言語ラベル（Mono 11px / uppercase / `--text-muted`）＋ 右端にコピーボタン（Ghost, 24×24px）。
- シンタックスハイライト: 既存の `prism-react-renderer` を使い、**キーワードのみ `--link`、文字列は `--ds-teal-700`、コメントは `--text-muted`、それ以外は `--text-primary`** の 4 色に制限。多色テーマ（Dracula 等）は使わない。
- インラインコード: 地 `--surface-1`、`padding: 1px 5px`、`--radius-control`、Geist Mono 0.9em、`--text-primary`。

### 6.7 記事本文のタイポ

| 要素 | 仕様 |
|---|---|
| 本文幅 | 720px（約 40〜45 全角字/行） |
| `p` | `body`（16px / 1.85 / ls 0）、段落間 24px、`--text-primary` |
| `h2` | `heading-lg`（32px / 500）、上に全幅 1px 罫線、`margin-top: 64px`、罫線からの間隔 24px |
| `h3` | `heading`（24px / 500）、`margin-top: 40px` |
| `ul` / `ol` | マーカーは `--text-muted`、`li` 間 8px、インデント 1.4em |
| `blockquote` | 左に 2px の縦線（`--border-strong`）、地なし、`--text-secondary`、斜体にしない（和文で斜体は禁止） |
| `img` | 全幅、`--radius-control`、下にキャプション（`caption` / `--text-muted` / 中央揃え） |
| `table` | セルグリッドと同じ 1px 罫線。ヘッダ行は Mono 11px uppercase、数値列は tabular-nums 右寄せ |
| `hr` | 全幅 1px `--border`、上下 48px |

Tailwind の `@tailwindcss/typography` は使い続けてよいが、`prose` の色・行間・見出しマージンを上記トークンで**全て上書き**する。

---

## 7. テーマ実装方針

### 7.1 方式

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

**原則: コンポーネントは `bg-bg` `text-text-secondary` `border-border` のようなセマンティッククラスだけを使い、`dark:` を書かない。** テーマ差はトークン層で吸収される。`dark:` バリアントは、トークンでは表現できない稀なケース（グロー用の mix-blend-mode の切替など）のための逃げ道として定義しておくが、**使用時はレビューで理由を問う**。

### 7.2 デフォルト判定と優先順位

1. `localStorage.getItem("theme")` に `"dark"` / `"light"` があればそれを採用。
2. なければ `window.matchMedia("(prefers-color-scheme: light)").matches` が **true のときだけ** `light`。
3. それ以外（`dark` / `no-preference` / 判定不能）は **`dark`**。

つまり `prefers-color-scheme` は「明示的にライトを好む人」を拾うためだけに使い、**ダークを既定に倒す**。

### 7.3 初回描画のフラッシュ防止

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

### 7.4 CLAUDE.md の改訂が必要

**本提案の採用は、現行 `CLAUDE.md` の「デザイン方針」節と正面から矛盾する。以下の記述を必ず改訂すること。**

| 現行の記述 | 改訂後 |
|---|---|
| 「サイトのターゲットデザインは Blueprint Night」／「必ず `blueprint-night-design` スキルに従ってください」 | 「サイトのターゲットデザインは Geist Grid」／新スキル `geist-grid-design` に従う。`blueprint-night-design` スキルは削除 |
| 「ダークモード切り替え非対応」「Blueprint Night は固定の見た目」 | 「ダーク既定＋ライト手動切替に対応」 |
| 「`dark:` プレフィックスの Tailwind クラスは使用しない（移行済み・未移行ページ共通の禁止事項）」 | **撤回**。テーマは `data-theme` ＋ CSS 変数で解決し、コンポーネントはセマンティックトークンを使う。`@custom-variant dark` は定義するが、原則としてトークンで解決し `dark:` の直接使用は例外扱い |
| 「色は明示的なクラス指定で固定する」 | 「色は必ずセマンティックトークン経由で参照する。生の hex / `gray-*` の直接指定は禁止」 |
| 「正典実装: `src/app/founder/page.tsx`」「移行ステータス: `/founder` のみ移行済み」 | 新しい正典実装（トップページ）を指す記述に差し替え。移行ステータス表も作り直す |
| 「未移行ページ（旧ライトデザイン）の保守」節の Gray 系・`bg-white` 指定 | 移行完了まで残すが、「新規ページは必ず Geist Grid」と明記 |

この改訂は**トークン導入と同じ PR で行う**（規約と実装が食い違う期間を作らない）。

---

## 8. i18n 方針の骨子

日本語をデフォルト、英語をサブとする。URL 設計は **`/en` プレフィックス方式を推奨**する。Cookie 方式（同一 URL で言語を出し分ける）は実装が軽い反面、同じ URL が言語によって別内容を返すため SSG/ISR のキャッシュが言語ごとに分岐せず、SNS シェアや検索インデックスで意図しない言語が出る事故が起きやすい。本サイトは著者・書籍・講座という**検索とシェアが主要流入**のサイトなので、URL が一意に言語を決める `/en` 方式のほうが正しい（日本語は既存 URL を維持してプレフィックスなし、`/en/*` を追加、`<link rel="alternate" hreflang>` と `metadata.alternates.languages` を全ページに付与）。ライブラリは **next-intl を推奨**（App Router 対応が最も成熟しており、Server Components でメッセージを解決できるためクライアントバンドルに翻訳文字列を持ち込まずに済む。next-i18next は Pages Router 前提、Paraglide は軽量だが RSC 統合が薄い）。翻訳は全ページ一括ではなく、トップ・プロフィール・書籍・講座の 4 種から着手し、ブログ／ニュースまとめ記事は原文言語のみ提供＋一覧で言語バッジ（Mono ラベル `JA` / `EN`）を出す運用が現実的。**本節は方針提示にとどめ、詳細設計は別途。**

---

## 9. Decision ledger

| Decision | Source | Source rule | Why |
|---|---|---|---|
| 背景を純黒 `#000000` にする | Vercel / Geist | `--ds-background-100: #000`（dark） | 「黒っぽさは大事」という要件に対し、Geist の公式値がそのまま純黒。青紫に寄せた独自ダークは Geist に乗る意味を失わせる |
| グレーを `--ds-gray-*` の 10 段から選ぶ | Vercel / Geist | 100–300 背景 / 400–600 境界 / 900–1000 テキスト | 色の役割が公式に定義済み。独自に中間色を作ると階層が濁る |
| ダークのリンクを `#50a8ff`（blue-900） | Vercel / Geist | dark の `--ds-focus-color: var(--ds-blue-900)` | Geist 自身がダークでフォーカス色に blue-900 を選んでいる。8.39:1 で AAA |
| ライトのリンクを `#005edc`（blue-800）に変更 | 本提案の独自判断 | — | Geist の blue-700 は `#fafafa` 上で 4.32:1 と AA 未達。1 段濃くして 5.78:1 を確保 |
| ライトの `--text-muted` に最小サイズ制限 | 本提案の独自判断 | — | `#7d7d7d`/`#fff` は 4.12:1。Geist の値は保ちつつ、使用文脈で AA を担保する |
| radius を 0 / 6px / 9999px の 3 値に限定 | Vercel + Verse | Geist `--geist-radius: 6px` / Verse「全て 0px」 | Geist の基準値を残しつつ、セルは Verse に倣って 0。3 値以外を禁止して迷いを消す |
| セルを `gap: 1px` + 親背景で描く | Verse | 「1px 罫線でセルを仕切る」 | 交点で 2px にならない。ダークで罫線が太ると安っぽい |
| セル上辺に uppercase の Mono ラベル | Verse | 「Commit Mono の 11px メタテキスト」 | 構造が「機械可読の台帳」に見える。エンジニアプロフィールの中身と一致 |
| 見出しウェイトを 500–600 に抑える | Linear Changelog | 「weight 500 を大サイズ見出しに使う」 | 太字で殴らずに権威を出す。Geist Sans は中間ウェイトが美しい |
| 拡散シャドウを使わず背景レイヤ＋罫線で階層 | Linear Changelog | 「heavy shadow を使わず背景色レイヤリングと subtle border で奥行き」 | 純黒背景ではシャドウがそもそも見えない |
| 日付・ID・出典・コードを Geist Mono に統一 | Linear + Verse | Linear「Berkeley Mono はコード・タイムスタンプ・技術表記のみ」 | 自動生成ニュースと手書きブログの視覚的な差分を、色ではなく書体で作れる |
| faint grid の背景テクスチャ | Langbase | 「黒地にグリッド線でセクション境界を暗示」 | 「方眼紙」の北極星を背景そのもので表現できる |
| グローは装飾専用、塗りには使わない | Langbase | 「グラデーションはデータ活動の表現であり CTA の塗りには使わない」 | 「少し派手さ」を満たしつつ、AI プロダクト LP のテンプレに落ちない |
| 派手さに数値上限を課す | 本提案の独自判断 | — | 「少し」を主観に任せると必ず増える。グロー 1画面1個 / 彩度面積 8% の上限で歯止め |
| 和文を Noto Sans JP にする | 本提案の独自判断 | — | 9 段ウェイトで中間ウェイト見出しを和文でも再現でき、骨格の個性が最も薄く Geist に従属する |
| Geist Sans を font-family の先頭に置く | 本提案の独自判断 | — | ラテンは Geist、和文は Noto の自然な混植。Geist が主・和文が従という役割が字面に出る |
| 和文本文の line-height を 1.85 に上げる | 本提案の独自判断 | — | Geist の欧文既定 1.5 では和文が詰まる。負のトラッキングも 24px 以上の見出しに限定 |
| `data-theme` 属性 ＋ CSS 変数 | 本提案の独自判断 | — | Tailwind v4 の `@custom-variant` と相性が良く、`dark:` の二重クラス地獄を避けられる |
| ダークをフォールバック既定にする | オーナー決定 | — | `prefers-color-scheme` は「明示的にライトを好む人」の検出にのみ使う |
| テーマトグルは 2 状態（system を持たない） | オーナー決定（プルダウン禁止）| — | ボタン 1 つで押した結果が予測できる。第3状態はプルダウンを呼び込む |
| 言語トグルは `<a>` のセグメント型 | オーナー決定（プルダウン禁止）| — | `/en` プレフィックス方式なら遷移なので、ボタンではなくリンクが正しい |
| `/en` プレフィックス ＋ next-intl | 本提案の独自判断 | — | URL が一意に言語を決めるため ISR キャッシュ・SNS シェア・hreflang が破綻しない |
| Blueprint Night を継承しない | オーナー決定 | — | 参照・継承ともに禁止。`#0B1020` 系の背景と紫アクセント（`--color-accent: #7c5cfc`）は廃止 |

---

## 10. Do / Don't

### Do

- 色は**必ずセマンティックトークン経由**で参照する（`var(--text-secondary)` / `text-text-secondary`）。生の hex を書かない。
- 新しい色が必要になったら、まず `--ds-*` スケールの既存 10 段から探す。無ければ「本当に必要か」を疑う。
- セルの罫線は常に 1px。太さで強調しない。強調は**色**（`--border-strong`）で行う。
- 日付・時刻・ID・出典ドメイン・コード・タイムスタンプ・数値メタは Geist Mono。
- 見出しは 500〜600。700 は使わない。
- グローを置いたら、そのページの他のグローを数える（1 ビューポート 1 個、1 ページ 2 個まで）。
- 和文本文は `line-height: 1.85` / `letter-spacing: 0` / `line-break: strict`。
- インタラクションは**背景色と罫線色の変化のみ**。150ms ease-out。
- フォーカスは必ず Geist の二重リング。`outline: none` を単独で書かない。
- 画像は `next/image`、`--radius-control`（6px）、必ずキャプションまたは `alt`。
- ニュースまとめは「自動生成である」ことをページ上で明示する。

### Don't

- ❌ `#0B1020` などの青紫ダーク背景を使う。Blueprint Night のトークンを 1 つでも持ち込む。
- ❌ 紫〜ピンクのグラデーション CTA。グラデーションを面の塗りに使う。
- ❌ カードに `border-radius: 12px` ＋ ぼかしシャドウ。hover で `translateY(-4px)` させる。
- ❌ グラスモーフィズム（ヘッダーの薄い blur を除く）。ネオンのテキストシャドウ。
- ❌ 明朝体。和文の斜体。和文への負のトラッキング（24px 以上の見出しを除く）。
- ❌ 絵文字をセクション見出しのアイコン代わりに使う（`💡` `⏰` 等）。
- ❌ 見出しに「〜を、もっと自由に。」「未来を、ここから。」のような中身のない体言止めキャッチ。書くのは事実（冊数・本数・年数・所属）。
- ❌ 「革新的」「シームレス」「パワフル」「次世代」などの評価語を自称に使う。
- ❌ 意味のない 3 列アイコンカード、意味のないカウントアップアニメーション、意味のないパーティクル背景。
- ❌ タグをカテゴリごとに色分けする。状態色を `--accent-solid` と `--ds-amber-700` 以外に増やす。
- ❌ 多色シンタックスハイライトテーマ（Dracula / One Dark 等）。
- ❌ コンポーネント内に `dark:` を書く（トークンで解決できないことを証明できる場合を除く）。
- ❌ セクションの背景色を交互に変えるゼブラ構成。
- ❌ 「AI が生成したっぽい」等間隔の均質なカードグリッドだけでページを埋める。数値セル・年表・changelog 型など、**行の形が違うセクションを必ず混ぜる**。

---

## 11. 移行計画（粗案）

| Phase | 内容 | 完了条件 |
|---|---|---|
| **0. 合意** | 本提案書のレビューと承認。特に §3 の派手さ予算、§4 の和文フォント、§7.4 の CLAUDE.md 改訂について合意を取る | 承認 |
| **1. トークン導入** | `geist` npm 追加、`layout.tsx` のフォント差し替え（Geist Sans / Geist Mono / Noto Sans JP）、`src/styles/tailwind.css` にトークン定義と `@custom-variant dark`、`ThemeProvider` ＋ インライン初期化スクリプト、`data-theme` 切替。**同 PR で `CLAUDE.md` の該当節を改訂**。既存ページは旧クラスのまま動く（トークンは追加のみで破壊しない） | ライト／ダークが切り替わる。既存ページの見た目が壊れていない。フォント転送量の実測値を記録 |
| **2. プリミティブ** | `Cell` / `CellGrid` / `MonoLabel` / `Button`（5階層）/ `Tag` / `Link` / `CodeBlock` / `Header`（言語＋テーマトグル）を新規作成。Storybook 相当の確認ページを `/design`（noindex）に置く | 全プリミティブがライト／ダーク両方でコントラスト表を満たす。キーボード操作とフォーカスリングの確認 |
| **3. 共通レイアウト** | ヘッダー・フッター・コンテナ（1120px ＋ 端の縦罫線）・faint grid 背景・グローの実装。`SpectrumBeam` と `--color-spectrum-*` / `--color-accent` の廃止 | 全ページが新しい枠に入る |
| **4. トップページ** | §5.2 の骨格で全面刷新。**これが新しい正典実装になる** | オーナー確認。`CLAUDE.md` の正典実装の記述を更新 |
| **5. プロフィール / 書籍 / 講座** | `/founder`（Blueprint Night を剥がす）→ 書籍セクション → `/courses` | 旧デザインの痕跡がゼロ |
| **6. ブログ / ニュースまとめ** | 記事テンプレート（`prose` の全面上書き）→ ブログ一覧・記事 → ニュース changelog 型一覧・記事。GitHub Actions の生成物フォーマットを新テンプレートに合わせる | |
| **7. i18n** | next-intl 導入、`/en` ルーティング、hreflang、言語トグルの配線（Phase 2 で見た目だけ作っておき、ここで機能させる） | |
| **8. 後片付け** | 旧デザインの残骸削除。`docs/design/*.md`（Radiant 系）のアーカイブ化。カバレッジとアクセシビリティの最終チェック | `dark:` の使用箇所が例外リストと一致。生 hex の grep 結果がゼロ |

### スキルの置き換え

`.claude/skills/blueprint-night-design/SKILL.md` は**削除し、`.claude/skills/geist-grid-design/SKILL.md` を新規作成する**。Phase 1 完了時点で最低限の版（トークン表・Do/Don't・セル構造・テーマ実装方針）を置き、Phase 4（正典実装の確定）で完成させる。

新スキルに載せるべき内容:

- §3 のトークン表（ダーク／ライト、コントラスト比つき）をそのまま
- §3.2 の派手さ予算（数値上限）
- §4 の書体役割分担と和欧混植の指針
- §5.1 のセル構造の実装レシピ（`gap: 1px` パターン）
- §6 のコンポーネント仕様
- §7 のテーマ実装（コピペ可能なコード）
- §10 の Do / Don't
- 実装の落とし穴（罫線の 2px 問題、和文の line-height、ライト muted のサイズ制限、`suppressHydrationWarning`）
- 正典実装へのパス（Phase 4 完了後に記載）

`CLAUDE.md` の「デザイン方針」節からの参照先も、同 PR で新スキルに差し替える。

---

## 付録: 未確認事項

- **Geist のカラースケール値の出典**: Vercel の配信 CSS（`:root, .light-theme` / `.dark, .dark-theme` ブロック）から抽出した実値であり、公式ドキュメントのページ本文には hex が記載されていない。値の正確性は高いが、**Geist 側の更新で変わりうる**。トークン導入時に再取得して突合すること。
- **P3 色域**: Geist は対応環境で `lab()` 表記の P3 値を配信している（例: `--ds-gray-100: lab(9.288% 0 -.00000298023)`）。本提案は sRGB の hex 値のみを採用した。P3 対応を入れる場合は `@supports (color: lab(0% 0 0))` での上書きを検討するが、コントラスト計算は sRGB 値で行う前提を維持する。
- **`--geist-radius`**: 配信 CSS では `6px` の 1 値のみ確認できた。`--geist-radius-small` 等の派生トークンは見つかっていない。
- **`@vercel/geistcn` パッケージ**: Geist のドキュメントのコード例は `@vercel/geistcn/components` からの import を示すが、**npm public registry には存在しない**（404）。React コンポーネント実装は自前で用意する前提とした（本提案もそうしている）。
