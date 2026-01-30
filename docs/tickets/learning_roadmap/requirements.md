# Claude Code 学習ロードマップ 要件定義書

## 概要

### 目的
Claude Code関連のUdemy講座を、目的別に最適な学習順序で提示するロードマップ機能。ユーザーが「どこから学べばいいか」を迷わず判断できるようにする。

### ターゲットユーザー
- プログラミング未経験者
- Claude Codeを使った開発を学びたい人
- 特定の技術スタック（Web/スマホ/Python）を学びたい人

### 価値提案
- 目的に応じた最適な学習パスを提示
- 講座間の関係性（前提条件・発展）を可視化
- クーポンページへのスムーズな導線

---

## 機能要件

### FR-001: ロードマップページ

**URL**: `/roadmap`

**クエリパラメータ**:
- `?course=beginner` - 完全初心者コース（デフォルト）
- `?course=web` - Web開発コース
- `?course=mobile` - スマホアプリコース
- `?course=python` - Python開発コース

**レンダリング**: SSG（静的生成）

#### FR-001-1: コース選択タブ

| 項目 | 仕様 |
|------|------|
| タブ数 | 4つ固定 |
| 初期選択 | URLパラメータがなければ「完全初心者」 |
| 切り替え動作 | フェードアニメーション（300ms） |
| URL同期 | useSearchParamsでURL更新（ブラウザ履歴に追加） |
| モバイル表示 | 横スクロール |

**タブ一覧**:
1. 🚀 完全初心者（beginner）
2. 🌐 Web開発（web）
3. 📱 スマホアプリ（mobile）
4. 🐍 Python開発（python）

#### FR-001-2: フローチャート表示

| 項目 | 仕様 |
|------|------|
| ノード数 | 各コース3〜5ノード |
| レイアウト | 縦方向フロー（中央配置） |
| 接続線 | SVGで描画（破線アニメーション） |
| 分岐 | 選択講座は横に配置 |

**ノード表示情報**:
- タイトル（講座名）
- 説明文（1〜2行）
- 難易度バッジ（初級/中級/中〜上級/上級）
- カテゴリバッジ（入門講座/基礎講座/実践講座/上級講座/選択講座）

**ノードタイプ**:
| タイプ | スタイル | 説明 |
|--------|----------|------|
| 必須 | 実線ボーダー + ステップ番号 | 必ず受講すべき講座 |
| 選択 | 破線ボーダー + 「選択」バッジ | 任意で受講できる講座 |

#### FR-001-3: ノードクリック動作

**リンク先タイプ**:
| タイプ | 動作 | 例 |
|--------|------|-----|
| coupon | 同一タブで遷移 | `/coupons/claude-code-vibe-coding` |
| blog | 同一タブで遷移 | `/blog/xxx`（将来実装） |
| video | 同一タブで遷移 | `/videos/xxx` |
| external | 新規タブで開く | `https://www.udemy.com/...` |
| zenn | 新規タブで開く | `https://zenn.dev/...` |

**データ構造**:
```typescript
interface RoadmapNodeLink {
  type: 'coupon' | 'blog' | 'video' | 'external' | 'zenn'
  url: string
}
```

#### FR-001-4: 凡例

ページ下部に表示:
- 必須講座（実線 + 番号アイコン）
- 選択講座（破線ボーダー）

---

### FR-002: クーポンページへのバナー

**配置位置**: ヘッダーセクション（タイトル・説明文）の直下、クーポン一覧の上

**コンテンツ**:
- アイコン（🗺️）
- タイトル「どこから学べばいい？」
- 説明文「目的に応じた学習ロードマップで、最適な受講順序をチェック...」
- CTAボタン「ロードマップを見る →」

**動作**: ボタンクリックで `/roadmap` へ遷移

---

### FR-003: ナビゲーション更新

**変更内容**: グローバルナビゲーションに「ロードマップ」リンクを追加

**配置**:
- デスクトップ: 「クーポン」の隣
- モバイル: ハンバーガーメニュー内

**リンク先**: `/roadmap`

---

## 非機能要件

### NFR-001: パフォーマンス

| 指標 | 目標値 |
|------|--------|
| LCP | < 2.5秒 |
| CLS | < 0.1 |
| FID | < 100ms |
| ビルド時間 | 既存と同等 |

### NFR-002: アクセシビリティ

| 項目 | 仕様 |
|------|------|
| WCAG | AA準拠 |
| コントラスト比 | 4.5:1以上 |
| タッチターゲット | 44px × 44px以上 |
| キーボード操作 | Tab/Enterで操作可能 |
| スクリーンリーダー | aria-label, role="tablist" 対応 |

### NFR-003: レスポンシブ対応

| ブレイクポイント | 対応 |
|-----------------|------|
| Mobile (< 640px) | タブ横スクロール、ノード縦積み |
| Tablet (640px - 1024px) | 標準レイアウト |
| Desktop (> 1024px) | 分岐を横に表示 |

---

## データ設計

### ロードマップデータ管理

**保存場所**: `src/data/roadmaps/`

**ファイル構成**:
```
src/data/roadmaps/
├── index.ts           # エクスポート
├── types.ts           # 型定義
├── beginner.ts        # 完全初心者コース
├── web.ts             # Web開発コース
├── mobile.ts          # スマホアプリコース
└── python.ts          # Python開発コース
```

### 型定義

```typescript
// src/data/roadmaps/types.ts

export type CourseId = 'beginner' | 'web' | 'mobile' | 'python'

export type NodeLinkType = 'coupon' | 'blog' | 'video' | 'external' | 'zenn'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'intermediate-advanced' | 'advanced'

export type NodeCategory = 'intro' | 'basic' | 'practice' | 'advanced' | 'optional'

export interface RoadmapNodeLink {
  type: NodeLinkType
  url: string
  label?: string // 外部リンクの場合のラベル
}

export interface RoadmapNode {
  id: string
  title: string
  description: string
  difficulty: DifficultyLevel
  category: NodeCategory
  link: RoadmapNodeLink
  isRequired: boolean
}

export interface RoadmapEdge {
  from: string
  to: string
}

export interface RoadmapCourse {
  id: CourseId
  name: string
  emoji: string
  description: string
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
}
```

### データ例

```typescript
// src/data/roadmaps/beginner.ts

import type { RoadmapCourse } from './types'

export const beginnerCourse: RoadmapCourse = {
  id: 'beginner',
  name: '完全初心者',
  emoji: '🚀',
  description: 'プログラミング未経験からClaude Codeマスターへ',
  nodes: [
    {
      id: 'vibe-coding-intro',
      title: 'Claude Code × Vibe Coding 入門',
      description: 'プログラミング未経験からスタート。React・Next.jsで5つのアプリを作りながら、AI駆動開発の基礎を身につけます。',
      difficulty: 'beginner',
      category: 'intro',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-vibe-coding'
      },
      isRequired: true
    },
    // ... 他のノード
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'expenses-app' },
    // ... 他のエッジ
  ]
}
```

---

## UI/UXデザイン

### デザインシステム

**準拠**: Radiant Design System（既存サイトと統一）

詳細は `design-concept.md` を参照。

### 主要コンポーネント

| コンポーネント | ファイル | 責務 |
|--------------|---------|------|
| RoadmapPage | `src/app/roadmap/page.tsx` | ページコンポーネント |
| RoadmapTabs | `src/components/roadmap/RoadmapTabs.tsx` | コース選択タブ |
| RoadmapFlow | `src/components/roadmap/RoadmapFlow.tsx` | フローチャート全体 |
| RoadmapNode | `src/components/roadmap/RoadmapNode.tsx` | 個別ノード |
| RoadmapEdge | `src/components/roadmap/RoadmapEdge.tsx` | 接続線（SVG） |
| RoadmapLegend | `src/components/roadmap/RoadmapLegend.tsx` | 凡例 |
| RoadmapBanner | `src/components/roadmap/RoadmapBanner.tsx` | クーポンページ用バナー |

---

## 除外スコープ（MVP外）

以下は初期リリースに含まない:

- ❌ 進捗追跡機能（チェックマーク等）
- ❌ ユーザーごとのカスタマイズ
- ❌ ブログ記事連携（リンク先タイプのみ対応）
- ❌ 検索/フィルター機能
- ❌ 印刷用レイアウト

---

## 変更履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-01-28 | 1.0 | 初版作成 |
