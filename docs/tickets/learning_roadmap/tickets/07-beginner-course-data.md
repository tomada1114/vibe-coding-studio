# Ticket #07: 完全初心者コースデータ（beginner.ts）

## 概要

完全初心者向けの学習パスデータを作成する。プログラミング未経験者がClaude Codeマスターになるための推奨受講順序を定義する。

## 前提チケット

- `01-type-definitions.md` ✅ 完了必須
- `02-data-structure.md` ✅ 完了必須
- `03-roadmap-tabs.md` ✅ 完了必須
- `04-roadmap-node.md` ✅ 完了必須
- `05-roadmap-edge.md` ✅ 完了必須
- `06-roadmap-legend.md` ✅ 完了必須

## User Story

**As a** プログラミング未経験者
**I want** 完全初心者向けの学習パスを見たい
**So that** どこから学べばいいかわかる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | データ例（218-248行目） |
| `.kiro/specs/roadmap/prototype.html` | prototypeで使用しているノード情報 |
| `src/data/roadmaps/types.ts` | RoadmapCourse型 |
| `src/data/roadmaps/index.ts` | エクスポート先 |
| `src/app/coupons/*/page.tsx` | 既存クーポンページのslug確認 |

---

## 実装内容

### 作成ファイル

`src/data/roadmaps/beginner.ts`

### コースデータ

```typescript
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
        url: '/coupons/claude-code-vibe-coding',
      },
      isRequired: true,
    },
    {
      id: 'expenses-app',
      title: 'Stripe サブスク型 家計簿アプリ',
      description: '決済機能を持つWebアプリケーションを開発。実践的なSaaS開発スキルを習得します。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-expenses-app',
      },
      isRequired: true,
    },
    {
      id: 'project-tracker',
      title: '作業時間管理アプリ【完全版】',
      description: 'Stripe決済・Clerk認証・Supabaseを統合した本格SaaS開発を実践的に学べます。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-project-tracker',
      },
      isRequired: true,
    },
    {
      id: 'mcp-mastery',
      title: 'MCP完全攻略',
      description: '5つの最新MCPツールで開発効率を劇的に向上させます。',
      difficulty: 'intermediate',
      category: 'optional',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-mcp-nextjs',
      },
      isRequired: false,
    },
    {
      id: 'kiro-sd',
      title: 'AWS Kiro 仕様駆動開発',
      description: '要件・設計・タスクの3段階アプローチで、AI開発の品質と効率を劇的に向上。',
      difficulty: 'advanced',
      category: 'advanced',
      link: {
        type: 'coupon',
        url: '/coupons/aws-kiro-sd',
      },
      isRequired: true,
    },
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'expenses-app' },
    { from: 'expenses-app', to: 'project-tracker' },
    { from: 'project-tracker', to: 'mcp-mastery' },
    { from: 'project-tracker', to: 'kiro-sd' },
  ],
}
```

### index.tsの更新

```typescript
// src/data/roadmaps/index.ts に追加
import { beginnerCourse } from './beginner'

const courses: RoadmapCourse[] = [beginnerCourse]
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The course data shall have `id: 'beginner'`, `name: '完全初心者'`, `emoji: '🚀'`. |
| REQ-002 | The course data shall include 5 nodes (4 required + 1 optional). |
| REQ-003 | The first node shall be "Claude Code × Vibe Coding 入門" with link to `/coupons/claude-code-vibe-coding`. |
| REQ-004 | The edges shall define the sequential learning order from intro to advanced. |
| REQ-005 | The optional node (MCP完全攻略) shall have `isRequired: false`. |

---

## ノード一覧

| Step | ID | Title | Difficulty | Category | isRequired |
|------|----|-------|------------|----------|------------|
| 1 | vibe-coding-intro | Claude Code × Vibe Coding 入門 | beginner | intro | true |
| 2 | expenses-app | Stripe サブスク型 家計簿アプリ | intermediate | basic | true |
| 3 | project-tracker | 作業時間管理アプリ【完全版】 | intermediate-advanced | practice | true |
| - | mcp-mastery | MCP完全攻略 | intermediate | optional | false |
| 4 | kiro-sd | AWS Kiro 仕様駆動開発 | advanced | advanced | true |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/data/roadmaps/beginner.ts` が存在する
- [ ] **データ構造**: `RoadmapCourse`型に準拠
- [ ] **ノード数**: 5ノード（4必須 + 1選択）
- [ ] **エッジ数**: 4エッジ（学習順序を定義）
- [ ] **index.ts更新**: `beginnerCourse`がエクスポートされている
- [ ] **リンク確認**: すべてのクーポンURLが既存ページに対応
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/data/roadmaps/__tests__/beginner.test.ts` を作成

```typescript
import { beginnerCourse } from '../beginner'
import { getCourseById } from '../index'

describe('Beginner Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(beginnerCourse.id).toBe('beginner')
    })

    it('should have correct name', () => {
      expect(beginnerCourse.name).toBe('完全初心者')
    })

    it('should have correct emoji', () => {
      expect(beginnerCourse.emoji).toBe('🚀')
    })

    it('should have description', () => {
      expect(beginnerCourse.description).toBeTruthy()
    })
  })

  describe('nodes', () => {
    it('should have 5 nodes', () => {
      expect(beginnerCourse.nodes).toHaveLength(5)
    })

    it('should have 4 required nodes', () => {
      const requiredNodes = beginnerCourse.nodes.filter((n) => n.isRequired)
      expect(requiredNodes).toHaveLength(4)
    })

    it('should have 1 optional node', () => {
      const optionalNodes = beginnerCourse.nodes.filter((n) => !n.isRequired)
      expect(optionalNodes).toHaveLength(1)
    })

    it('should have first node as vibe-coding-intro', () => {
      expect(beginnerCourse.nodes[0].id).toBe('vibe-coding-intro')
    })

    it('should have all nodes with valid link URLs', () => {
      beginnerCourse.nodes.forEach((node) => {
        expect(node.link.url).toMatch(/^\/coupons\//)
      })
    })

    it('should have unique node IDs', () => {
      const ids = beginnerCourse.nodes.map((n) => n.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('edges', () => {
    it('should have 4 edges', () => {
      expect(beginnerCourse.edges).toHaveLength(4)
    })

    it('should have edges referencing valid node IDs', () => {
      const nodeIds = beginnerCourse.nodes.map((n) => n.id)
      beginnerCourse.edges.forEach((edge) => {
        expect(nodeIds).toContain(edge.from)
        expect(nodeIds).toContain(edge.to)
      })
    })

    it('should start from vibe-coding-intro', () => {
      const firstEdge = beginnerCourse.edges[0]
      expect(firstEdge.from).toBe('vibe-coding-intro')
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('beginner')
      expect(course).toBeDefined()
      expect(course?.id).toBe('beginner')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/beginner.test.ts` が成功する

### UI確認（Chrome DevTools MCP）

このチケットはデータのみのため、UIの確認は限定的。ただし、データが正しくロードされることを確認する。

1. **テスト用ページ更新**: `src/app/roadmap/page.tsx` で実データを使用

```tsx
'use client'
import { useState } from 'react'
import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
import { RoadmapNode } from '@/components/roadmap/RoadmapNode'
import { RoadmapEdge } from '@/components/roadmap/RoadmapEdge'
import { RoadmapLegend } from '@/components/roadmap/RoadmapLegend'
import { getCourseById, type CourseId } from '@/data/roadmaps'

export default function RoadmapPage() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('beginner')
  const course = getCourseById(activeCourse)

  // ステップ番号を計算（必須ノードのみカウント）
  let stepNumber = 0
  const nodesWithStep = course?.nodes.map((node) => ({
    node,
    step: node.isRequired ? ++stepNumber : undefined,
  }))

  return (
    <div className="mx-auto max-w-4xl p-8">
      <RoadmapTabs activeCourse={activeCourse} onCourseChange={setActiveCourse} />

      <div className="relative mx-auto mt-12 max-w-3xl">
        <RoadmapEdge />
        <div className="relative flex flex-col items-center gap-8">
          {nodesWithStep?.map(({ node, step }) => (
            <RoadmapNode key={node.id} node={node} stepNumber={step} />
          ))}
        </div>
        <RoadmapLegend className="mt-12" />
      </div>
    </div>
  )
}
```

2. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] 5つのノードが表示されていることを確認
   - [ ] ステップ番号が1, 2, 3, 4（必須ノードのみ）で表示されていることを確認
   - [ ] MCP完全攻略が「選択」バッジ付きで表示されていることを確認

---

## 次のチケット

→ `08-web-course-data.md`（Web開発コースデータ）
