# Claude Code 学習ロードマップ デザインコンセプト

## 概要

Claude Code学習ロードマップは、Udemy講座の受講順序を可視化し、目的別に最適な学習パスを提示する機能。**Radiant Design System**に完全準拠したフローチャート型UIを採用し、既存サイト（`/coupons`ページ等）との統一感を維持する。

### プロトタイプ

📄 `prototype.html` - ブラウザで確認可能なHTMLプロトタイプ

---

## デザイン原則

### 1. 明確な学習導線 (Clear Learning Path)

ユーザーが「次に何を学ぶべきか」を迷わず理解できるようにする。

- フローチャートで学習順序を視覚化
- 目的別のパス分岐を明確に表示
- 各講座間の関係性（前提条件・発展）を矢印で表現

### 2. 情報の段階的開示 (Progressive Disclosure)

必要な情報を適切なタイミングで提供し、情報過多を防ぐ。

- 初期表示はコース概要のみ
- クリックで講座詳細・クーポン情報へアクセス
- 全体像と詳細を行き来しやすい設計

### 3. 既存システムとの統一性 (Design Consistency)

Radiant Design Systemのトーンを踏襲し、サイト全体の一貫性を保つ。

- グレースケール基調のプロフェッショナルな配色
- 同じスペーシング・タイポグラフィ規則
- Tailwind CSSクラスの再利用

---

## カラーシステム

### ベース: ライトモード（Radiant Design System準拠）

既存サイトと同じカラーパレットを**厳密に**使用。

| 用途 | カラー | Tailwindクラス |
|------|--------|----------------|
| Background Primary | グラデーション | `bg-gradient-to-br from-zinc-50/50 via-white to-blue-50/30` |
| Background Secondary | `#F9FAFB` | `bg-zinc-50` |
| Card Surface | `#FFFFFF` | `bg-white` |
| Card Border | 5% black | `border-zinc-950/5` |

### ヘッダーグラデーション

```css
/* Radiant Gradient - 既存サイトと同じ */
background: linear-gradient(115deg, #fff1be 28%, #ee87cb 70%, #b060ff 100%);
/* sm以上 */
background: linear-gradient(145deg, #fff1be 28%, #ee87cb 70%, #b060ff 100%);
```

### テキスト

| 用途 | カラー | Tailwindクラス |
|------|--------|----------------|
| Text Primary | `#18181B` | `text-zinc-950` |
| Text Secondary | `#52525B` | `text-zinc-600` |
| Text Muted | `#71717A` | `text-zinc-500` |
| Accent (hover) | `#2563EB` | `text-blue-600` |

### バッジスタイル（既存Badgeコンポーネント準拠）

```
rounded-full px-3 py-1 text-xs font-medium ring-1
bg-{color}-50 text-{color}-700 ring-{color}-700/10
```

| 用途 | Tailwind |
|------|----------|
| 入門講座 | `bg-indigo-50 text-indigo-700 ring-indigo-700/10` |
| 基礎講座 | `bg-blue-50 text-blue-700 ring-blue-700/10` |
| 実践講座 | `bg-violet-50 text-violet-700 ring-violet-700/10` |
| 上級講座 | `bg-red-50 text-red-700 ring-red-700/10` |
| 選択講座 | `bg-teal-50 text-teal-700 ring-teal-700/10` |

### 難易度バッジ

| レベル | Tailwind |
|--------|----------|
| 初級 | `bg-green-50 text-green-700` |
| 中級 | `bg-yellow-50 text-yellow-700` |
| 中〜上級 | `bg-orange-50 text-orange-700` |
| 上級 | `bg-red-50 text-red-700` |

---

## タイポグラフィ

### フォント

```css
font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
```

### スケール

| 名称 | サイズ | 用途 |
|------|--------|------|
| Page Title | 36px / 2.25rem | ページタイトル |
| Course Selector | 18px / 1.125rem | コース選択タブ |
| Node Title | 16px / 1rem | ノード（講座）タイトル |
| Node Description | 14px / 0.875rem | ノードの説明文 |
| Badge | 12px / 0.75rem | 難易度・所要時間バッジ |

---

## スペーシング

### 基準値: 8px

既存サイトと同じ8pxグリッドシステムを使用。

```
8px  (0.5rem)  - ノード内パディング（コンパクト）
16px (1rem)    - ノード間の垂直間隔
24px (1.5rem)  - ノード内パディング（標準）
32px (2rem)    - セクション間隔
48px (3rem)    - コース選択とフローチャート間
```

### レイアウト

- コンテンツ最大幅: 1152px (`max-w-6xl`)
- 画面パディング: 24px（モバイル）/ 32px（デスクトップ）
- ノード内パディング: 16px〜24px

---

## コンポーネント

### コース選択タブ（既存サイト準拠）

```
Container: inline-flex rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-zinc-950/5
Active Tab: rounded-xl bg-indigo-50 px-5 py-2.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-700/10
Inactive Tab: rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950
Transition: all 200ms ease-in-out
```

### フローチャートノード（CouponCardスタイル準拠）

```
Structure: group relative overflow-hidden rounded-2xl
Background: bg-white
Border: border border-zinc-950/5
Shadow: shadow-sm
Hover: hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10
Cursor: cursor-pointer
Width: max-w-md (448px)

Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

**ステップインジケーター:**
```
Position: absolute left-1/2 -top-4 -translate-x-1/2 z-10
Size: h-8 w-8
Style: flex items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-lg ring-4 ring-white
```

**選択講座（Optional）:**
```
Border: border-2 border-dashed border-zinc-300
Background: bg-zinc-50/50
Hover: hover:border-zinc-400 hover:shadow-lg
Badge: absolute right-3 top-3 bg-zinc-200 text-[10px] text-zinc-600
```

### 接続線（SVG）

```
Structure: absolute left-1/2 top-0 h-full w-8 -translate-x-1/2
Stroke: #e4e4e7 (zinc-200)
Stroke Width: 2px
Stroke Dasharray: 8,4
Animation: flowDown（下方向へ流れるアニメーション）
```

### CTAバナー（クーポンページ用）

**CouponCardと同じスタイル:**
```
Container: rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm
Decorative: absolute gradient blobs (blur-3xl)
Content: flex-col sm:flex-row items-center gap-6
Button: inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-gray-800
```

---

## 画面別UI仕様

### 1. ロードマップページ (/roadmap)

```
構成:
- ページヘッダー（タイトル + 説明）
- コース選択タブ（4コース）
- フローチャートエリア（スクロール可能）
- 凡例（必須/選択の説明）

特徴:
- タブ切り替えでコースを選択
- フローチャートは横スクロール対応（モバイル）
- 各ノードクリックで講座詳細へ
```

**ワイヤーフレーム:**

```
┌────────────────────────────────────────────────────────┐
│  ← ホーム / ロードマップ                               │
├────────────────────────────────────────────────────────┤
│                                                        │
│    Claude Code 学習ロードマップ                        │
│    目的に応じた最適な学習パスを選んでください          │
│                                                        │
├────────────────────────────────────────────────────────┤
│  ┌─────────┬────────┬────────────┬──────────┐        │
│  │ 初心者  │ Web    │ スマホ     │ Python   │        │
│  └─────────┴────────┴────────────┴──────────┘        │
├────────────────────────────────────────────────────────┤
│                                                        │
│    ┌──────────────────┐                               │
│    │ 📘 入門講座      │                               │
│    │ Vibe Coding入門  │                               │
│    │ 🕐 8時間         │                               │
│    └────────┬─────────┘                               │
│             │                                          │
│             ▼                                          │
│    ┌──────────────────┐    ┌─ ─ ─ ─ ─ ─ ─ ─ ┐       │
│    │ 📗 基礎講座      │────│ 選択講座       │       │
│    │ Python基礎      │    │ Flask/Gemini   │       │
│    │ 🕐 6時間         │    └─ ─ ─ ─ ─ ─ ─ ─ ┘       │
│    └────────┬─────────┘                               │
│             │                                          │
│             ▼                                          │
│    ┌──────────────────┐                               │
│    │ 📙 実践講座      │                               │
│    │ MCP完全攻略      │                               │
│    │ 🕐 10時間        │                               │
│    └──────────────────┘                               │
│                                                        │
├────────────────────────────────────────────────────────┤
│  凡例: ━━ 必須  ─ ─ 選択                              │
└────────────────────────────────────────────────────────┘
```

### 2. クーポンページのバナー

```
構成:
- アイコン + タイトル
- 説明文
- CTAボタン（ロードマップへ）

特徴:
- ヘッダーセクション直下に配置
- 目立ちすぎない上品なデザイン
- クリックで /roadmap へ遷移
```

**ワイヤーフレーム:**

```
┌────────────────────────────────────────────────────────┐
│  🗺️ どこから学べばいい？                              │
│                                                        │
│  目的に応じた学習ロードマップで、                      │
│  最適な受講順序をチェックできます。                    │
│                                                        │
│                            [ ロードマップを見る → ]    │
└────────────────────────────────────────────────────────┘
```

### 3. ナビゲーションリンク

```
構成:
- 既存ナビゲーションに「ロードマップ」を追加

位置:
- デスクトップ: クーポンの隣
- モバイル: ハンバーガーメニュー内
```

---

## アニメーション

### 使用する場面

1. **タブ切り替え**: フローチャートのフェードイン（300ms ease-out）
2. **ノードホバー**: translateY(-2px) + shadow-md（150ms）
3. **ページ遷移**: 標準的なNext.jsトランジション

### 使用しない場面

- 接続線のアニメーション（静的表示）
- 過度な揺れや弾みエフェクト
- ローディング中のスケルトン以外の装飾アニメーション

### パフォーマンス指針

```
- transform と opacity のみ使用
- will-change は必要箇所のみ
- 60fps を維持
```

---

## レスポンシブ設計

### ブレイクポイント

```
Mobile:  < 640px  (優先)
Tablet:  640px - 1024px
Desktop: > 1024px
```

### モバイルファースト原則

- フローチャートは横スクロール対応
- ノードは縦積みレイアウトも検討
- タブは横スクロール可能（4コース以上の場合）
- タッチ操作に最適化（44px以上のタッチターゲット）

### デバイス別レイアウト

**モバイル:**
```
- ノード幅: 100%（最大280px）
- 縦方向のフロー
- ピンチズームは無効
```

**タブレット/デスクトップ:**
```
- ノード幅: 280px〜320px
- 横方向の分岐も表示
- ホバーエフェクト有効
```

---

## アクセシビリティ

### 必須対応

- カラーコントラスト比 4.5:1 以上
- タッチターゲット 44px × 44px 以上
- フォーカス状態の視覚的表示（ring-2）
- スクリーンリーダー対応（aria-label）

### ロードマップ特有の配慮

- 接続線の意味をテキストでも説明
- キーボードナビゲーション対応（Tab/Enter）
- コース選択の状態をaria-selectedで通知
- ノードの順序をaria-flowtoで示す（将来検討）

---

## 参考にしたアプリ・リソース

### UXパターン

- [roadmap.sh](https://roadmap.sh/) - フローチャート型ロードマップのベストプラクティス
- [Coursera Career Academy](https://www.coursera.org/career-academy/roles/user-interface-user-experience-ui-ux-designer) - スキルレベル別パス設計

### デザイントレンド

- [UX Design Roadmap 2025](https://roadmap.sh/ux-design) - 最新の学習パス可視化手法

### 意識的に避けた要素

- 複雑すぎるフローチャート（分岐が多すぎる） - 初心者が迷う
- 進捗追跡の初期実装 - シンプルさを優先、将来的に検討
- ゲーミフィケーション要素（バッジ・レベル） - プロフェッショナルなトーン維持

---

## 技術実装メモ

### 推奨ライブラリ

- **フローチャート描画**: ReactFlow または手動SVG
- **状態管理**: React useState（シンプルなタブ切り替え）
- **アニメーション**: Framer Motion（既存サイトと同じ）

### データ構造案

```typescript
interface RoadmapCourse {
  id: string
  name: string
  description: string
  color: 'blue' | 'violet' | 'emerald' | 'amber'
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
}

interface RoadmapNode {
  id: string
  courseId: string // Udemy講座ID
  title: string
  description: string
  duration: string
  isRequired: boolean
  position: { x: number; y: number }
}

interface RoadmapEdge {
  from: string
  to: string
  type: 'required' | 'optional'
}
```

---

## 変更履歴

| 日付 | 内容 |
|------|------|
| 2026-01-28 | 初版作成 |
| 2026-01-28 | Radiant Design System完全準拠に修正。フォント・カラー・シャドウ・ボーダーを既存サイトと統一 |
