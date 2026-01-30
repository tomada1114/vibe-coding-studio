# Ticket #12: RoadmapFlow - フローチャート全体

## 概要

ロードマップのフローチャート全体を管理するコンポーネントを作成する。ノードの配置、接続線、レスポンシブ対応、アニメーションを統合する。

## 前提チケット

- `03-roadmap-tabs.md` ✅ 完了必須
- `04-roadmap-node.md` ✅ 完了必須
- `05-roadmap-edge.md` ✅ 完了必須
- `10-python-course-data.md` ✅ 完了必須（全コースデータ）
- `11-roadmap-banner.md` ✅ 完了必須

## User Story

**As a** ユーザー
**I want** フローチャート全体を見たい
**So that** 学習パスの全体像を把握できる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-001-2 フローチャート仕様、NFR-003 レスポンシブ |
| `.kiro/specs/roadmap/design-concept.md` | レイアウト、アニメーション |
| `.kiro/specs/roadmap/prototype.html` | フローチャートのHTML構造（139-383行目） |
| `src/components/roadmap/RoadmapNode.tsx` | ノードコンポーネント |
| `src/components/roadmap/RoadmapEdge.tsx` | 接続線コンポーネント |
| `src/data/roadmaps/index.ts` | コースデータ取得 |

---

## 実装内容

### 作成ファイル

`src/components/roadmap/RoadmapFlow.tsx`

### Props定義

```typescript
import type { RoadmapCourse } from '@/data/roadmaps'

interface RoadmapFlowProps {
  course: RoadmapCourse
  className?: string
}
```

### レイアウト仕様

```
Desktop (> 1024px):
┌────────────────────────────────────────────┐
│           [Step 1: Required Node]          │
│                      │                      │
│                      ▼                      │
│           [Step 2: Required Node]          │
│                      │                      │
│                      ▼                      │
│  [Step 3: Required Node]  ←→  [Optional]   │
│                      │                      │
│                      ▼                      │
│           [Step 4: Required Node]          │
└────────────────────────────────────────────┘

Mobile (< 640px):
┌──────────────────┐
│  [Step 1]        │
│       │          │
│       ▼          │
│  [Step 2]        │
│       │          │
│       ▼          │
│  [Step 3]        │
│       │          │
│       ▼          │
│  [Optional]      │
│       │          │
│       ▼          │
│  [Step 4]        │
└──────────────────┘
```

### ノード配置ロジック

```typescript
// 必須ノードと選択ノードを分離
const requiredNodes = course.nodes.filter((n) => n.isRequired)
const optionalNodes = course.nodes.filter((n) => !n.isRequired)

// ステップ番号を割り当て
const nodesWithStep = requiredNodes.map((node, index) => ({
  node,
  stepNumber: index + 1,
}))
```

### アニメーション

- コース切り替え時: Framer Motion `AnimatePresence` + `motion.div` (fade 300ms)
- 初期表示: stagger animation で順次表示

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The flow shall render nodes vertically centered in the container. |
| REQ-002 | **When** viewport width > 1024px, the system shall display optional nodes horizontally beside the preceding required node. |
| REQ-003 | **When** viewport width < 640px, the system shall stack all nodes vertically. |
| REQ-004 | **When** course prop changes, the system shall fade in new content with 300ms transition. |
| REQ-005 | The flow shall calculate step numbers automatically based on `isRequired` nodes order. |
| REQ-006 | The flow shall render RoadmapEdge component behind nodes. |
| REQ-007 | The flow shall render RoadmapNode components in correct order. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/components/roadmap/RoadmapFlow.tsx` が存在する
- [ ] **Props**: `course` を受け取り、ノードを表示
- [ ] **ノード表示**: 必須ノードにステップ番号、選択ノードに「選択」バッジ
- [ ] **接続線**: RoadmapEdgeが背景に表示
- [ ] **レスポンシブ**: モバイルで縦積み、デスクトップで分岐横配置
- [ ] **アニメーション**: コース切り替え時にフェードイン
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/components/roadmap/__tests__/RoadmapFlow.test.tsx` を作成

```typescript
import { render, screen } from '@testing-library/react'
import { RoadmapFlow } from '../RoadmapFlow'
import { beginnerCourse } from '@/data/roadmaps/beginner'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode
      [key: string]: unknown
    }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe('RoadmapFlow', () => {
  describe('rendering', () => {
    it('should render all nodes from course', () => {
      render(<RoadmapFlow course={beginnerCourse} />)

      beginnerCourse.nodes.forEach((node) => {
        expect(screen.getByText(node.title)).toBeInTheDocument()
      })
    })

    it('should render step numbers for required nodes', () => {
      render(<RoadmapFlow course={beginnerCourse} />)

      const requiredCount = beginnerCourse.nodes.filter(
        (n) => n.isRequired
      ).length
      for (let i = 1; i <= requiredCount; i++) {
        expect(screen.getByText(String(i))).toBeInTheDocument()
      }
    })

    it('should render "選択" badge for optional nodes', () => {
      render(<RoadmapFlow course={beginnerCourse} />)

      const optionalCount = beginnerCourse.nodes.filter(
        (n) => !n.isRequired
      ).length
      const badges = screen.getAllByText('選択')
      expect(badges).toHaveLength(optionalCount)
    })
  })

  describe('layout', () => {
    it('should have flex column layout for nodes', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const nodesContainer = container.querySelector('.flex-col')
      expect(nodesContainer).toBeInTheDocument()
    })

    it('should center nodes horizontally', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const nodesContainer = container.querySelector('.items-center')
      expect(nodesContainer).toBeInTheDocument()
    })
  })

  describe('edge rendering', () => {
    it('should render edge component', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <RoadmapFlow course={beginnerCourse} className="custom-class" />
      )
      expect(container.firstChild).toHaveClass('custom-class')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/components/roadmap/__tests__/RoadmapFlow.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

1. **テスト用ページ更新**: `src/app/roadmap/page.tsx` を更新

```tsx
'use client'
import { useState } from 'react'
import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
import { RoadmapFlow } from '@/components/roadmap/RoadmapFlow'
import { RoadmapLegend } from '@/components/roadmap/RoadmapLegend'
import { getCourseById, type CourseId } from '@/data/roadmaps'

export default function RoadmapPage() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('beginner')
  const course = getCourseById(activeCourse)

  if (!course) return null

  return (
    <div className="mx-auto max-w-4xl p-8">
      <RoadmapTabs activeCourse={activeCourse} onCourseChange={setActiveCourse} />
      <RoadmapFlow course={course} className="mt-12" />
      <RoadmapLegend className="mt-12" />
    </div>
  )
}
```

2. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] すべてのノードが表示されていることを確認
   - [ ] 接続線（SVG）が背景に表示されていることを確認
   - [ ] `mcp__chrome-devtools__take_screenshot` でスクリーンショットを撮影
   - [ ] タブを切り替えて、フェードアニメーションを確認
   - [ ] `mcp__chrome-devtools__resize_page` で幅を375pxに変更し、縦積みレイアウトを確認
   - [ ] `mcp__chrome-devtools__resize_page` で幅を1200pxに変更し、分岐横配置を確認

3. **視覚確認項目**:
   - [ ] ノードが中央揃えで表示される
   - [ ] 接続線がノードの後ろ（z-index的に下）に表示される
   - [ ] ステップ番号が連番（1, 2, 3, 4）で表示される
   - [ ] 選択ノードが「選択」バッジ付きで表示される
   - [ ] タブ切り替え時にフェードアニメーション
   - [ ] モバイル: 全ノードが縦積み
   - [ ] デスクトップ: 選択ノードが必須ノードの横に表示（必要に応じて）

---

## 次のチケット

→ `13-roadmap-page.md`（RoadmapPage - ページ統合）
