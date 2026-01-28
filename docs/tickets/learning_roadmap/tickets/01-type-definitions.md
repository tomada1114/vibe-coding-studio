# Ticket #01: ロードマップ型定義（types.ts）

## 概要

ロードマップ機能の基盤となる型定義を作成する。

## 前提チケット

なし（最初のチケット）

## User Story

**As a** 開発者
**I want** ロードマップの型定義を使用したい
**So that** 型安全にロードマップデータを扱える

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | 型定義の仕様（データ設計セクション） |
| `src/types/coupon.ts` | 既存の型定義スタイルの参考 |
| `src/types/video.ts` | 既存の型定義スタイルの参考 |

---

## 実装内容

### 作成ファイル

`src/data/roadmaps/types.ts`

### 型定義

```typescript
// コースID
export type CourseId = 'beginner' | 'web' | 'mobile' | 'python'

// リンクタイプ
export type NodeLinkType = 'coupon' | 'blog' | 'video' | 'external' | 'zenn'

// 難易度レベル
export type DifficultyLevel = 'beginner' | 'intermediate' | 'intermediate-advanced' | 'advanced'

// ノードカテゴリ
export type NodeCategory = 'intro' | 'basic' | 'practice' | 'advanced' | 'optional'

// ノードリンク
export interface RoadmapNodeLink {
  type: NodeLinkType
  url: string
  label?: string // 外部リンクの場合のラベル
}

// ロードマップノード
export interface RoadmapNode {
  id: string
  title: string
  description: string
  difficulty: DifficultyLevel
  category: NodeCategory
  link: RoadmapNodeLink
  isRequired: boolean
}

// エッジ（ノード間接続）
export interface RoadmapEdge {
  from: string
  to: string
}

// コース全体
export interface RoadmapCourse {
  id: CourseId
  name: string
  emoji: string
  description: string
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
}
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The type system shall export `CourseId` as union type of `'beginner' \| 'web' \| 'mobile' \| 'python'`. |
| REQ-002 | The type system shall export `NodeLinkType` as union type of `'coupon' \| 'blog' \| 'video' \| 'external' \| 'zenn'`. |
| REQ-003 | The type system shall export `DifficultyLevel` as union type of `'beginner' \| 'intermediate' \| 'intermediate-advanced' \| 'advanced'`. |
| REQ-004 | The type system shall export `NodeCategory` as union type of `'intro' \| 'basic' \| 'practice' \| 'advanced' \| 'optional'`. |
| REQ-005 | The type `RoadmapNode` shall include `id`, `title`, `description`, `difficulty`, `category`, `link`, `isRequired` properties. |
| REQ-006 | The type `RoadmapCourse` shall include `id`, `name`, `emoji`, `description`, `nodes`, `edges` properties. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/data/roadmaps/types.ts` が存在する
- [ ] **型エクスポート**: 以下のすべてがexportされている
  - `CourseId`
  - `NodeLinkType`
  - `DifficultyLevel`
  - `NodeCategory`
  - `RoadmapNodeLink`
  - `RoadmapNode`
  - `RoadmapEdge`
  - `RoadmapCourse`
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **型テスト**: `src/data/roadmaps/__tests__/types.test.ts` を作成
  - 各型が正しくインポートできることを確認
  - サンプルデータが型に適合することを確認

```typescript
// テスト例
import type {
  CourseId,
  NodeLinkType,
  DifficultyLevel,
  NodeCategory,
  RoadmapNodeLink,
  RoadmapNode,
  RoadmapEdge,
  RoadmapCourse,
} from '../types'

describe('Roadmap Types', () => {
  it('should accept valid CourseId values', () => {
    const validIds: CourseId[] = ['beginner', 'web', 'mobile', 'python']
    expect(validIds).toHaveLength(4)
  })

  it('should accept valid RoadmapNode', () => {
    const node: RoadmapNode = {
      id: 'test-node',
      title: 'Test Title',
      description: 'Test Description',
      difficulty: 'beginner',
      category: 'intro',
      link: { type: 'coupon', url: '/coupons/test' },
      isRequired: true,
    }
    expect(node.id).toBe('test-node')
  })

  it('should accept valid RoadmapCourse', () => {
    const course: RoadmapCourse = {
      id: 'beginner',
      name: '完全初心者',
      emoji: '🚀',
      description: 'Test description',
      nodes: [],
      edges: [],
    }
    expect(course.id).toBe('beginner')
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/types.test.ts` が成功する

### UI確認（Chrome DevTools MCP）

このチケットはUIを持たないため、Chrome DevTools MCPによる確認は不要。

---

## 次のチケット

→ `02-data-structure.md`（ロードマップデータ構造）
