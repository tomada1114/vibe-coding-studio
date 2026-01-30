# Ticket #03: RoadmapTabs - コース選択タブ

## 概要

4つのコース（完全初心者、Web開発、スマホアプリ、Python開発）を切り替えるタブコンポーネントを作成する。URLパラメータと同期し、アクセシビリティに配慮した実装を行う。

## 前提チケット

- `01-type-definitions.md` ✅ 完了必須
- `02-data-structure.md` ✅ 完了必須

## User Story

**As a** ユーザー
**I want** 4つのコースをタブで切り替えたい
**So that** 目的に合った学習パスを選択できる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-001-1 タブ仕様 |
| `.kiro/specs/roadmap/design-concept.md` | タブのスタイル定義 |
| `.kiro/specs/roadmap/prototype.html` | タブのHTML構造（121-136行目） |
| `src/data/roadmaps/index.ts` | courseIds、型定義（#02で作成） |
| `src/components/navbar.tsx` | 既存のタブ風UIの参考 |

---

## 実装内容

### 作成ファイル

`src/components/roadmap/RoadmapTabs.tsx`

### Props定義

```typescript
import type { CourseId } from '@/data/roadmaps'

interface RoadmapTabsProps {
  activeCourse: CourseId
  onCourseChange: (courseId: CourseId) => void
}
```

### コース定義

```typescript
const courses = [
  { id: 'beginner', name: '完全初心者', emoji: '🚀' },
  { id: 'web', name: 'Web開発', emoji: '🌐' },
  { id: 'mobile', name: 'スマホアプリ', emoji: '📱' },
  { id: 'python', name: 'Python開発', emoji: '🐍' },
] as const
```

### スタイル仕様

| 要素 | Tailwindクラス |
|------|----------------|
| Container | `inline-flex rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-zinc-950/5` |
| Active Tab | `rounded-xl bg-indigo-50 px-5 py-2.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-700/10` |
| Inactive Tab | `rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:text-zinc-950` |
| Mobile Container | `overflow-x-auto` (viewport < 640px) |

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | **When** component renders, the system shall display 4 tabs: "🚀 完全初心者", "🌐 Web開発", "📱 スマホアプリ", "🐍 Python開発". |
| REQ-002 | **When** user clicks a tab, the system shall call `onCourseChange` with the course ID. |
| REQ-003 | **While** `activeCourse` is "web", the system shall display "Web開発" tab with active styles. |
| REQ-004 | **When** viewport width < 640px, the system shall enable horizontal scroll for tabs. |
| REQ-005 | The active tab shall have style: `bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10`. |
| REQ-006 | The inactive tab shall have style: `text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950`. |
| REQ-007 | The component shall have `role="tablist"` and each tab shall have `role="tab"`. |
| REQ-008 | **When** tab is active, it shall have `aria-selected="true"`. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/components/roadmap/RoadmapTabs.tsx` が存在する
- [ ] **Props**: `activeCourse` と `onCourseChange` を受け取る
- [ ] **タブ表示**: 4つのタブが正しい順序で表示される
- [ ] **アクティブスタイル**: 選択中のタブにアクティブスタイルが適用される
- [ ] **クリックハンドラ**: タブクリックで `onCourseChange` が呼ばれる
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/components/roadmap/__tests__/RoadmapTabs.test.tsx` を作成

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { RoadmapTabs } from '../RoadmapTabs'

describe('RoadmapTabs', () => {
  const mockOnCourseChange = jest.fn()

  beforeEach(() => {
    mockOnCourseChange.mockClear()
  })

  describe('rendering', () => {
    it('should render 4 tabs', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      expect(screen.getByText(/完全初心者/)).toBeInTheDocument()
      expect(screen.getByText(/Web開発/)).toBeInTheDocument()
      expect(screen.getByText(/スマホアプリ/)).toBeInTheDocument()
      expect(screen.getByText(/Python開発/)).toBeInTheDocument()
    })

    it('should have role="tablist" on container', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('should have role="tab" on each tab', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(4)
    })
  })

  describe('active state', () => {
    it('should mark beginner tab as selected when activeCourse is beginner', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      const beginnerTab = screen.getByRole('tab', { name: /完全初心者/ })
      expect(beginnerTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should mark web tab as selected when activeCourse is web', () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const webTab = screen.getByRole('tab', { name: /Web開発/ })
      expect(webTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should apply active styles to selected tab', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      const beginnerTab = screen.getByRole('tab', { name: /完全初心者/ })
      expect(beginnerTab).toHaveClass('bg-indigo-50')
    })
  })

  describe('interaction', () => {
    it('should call onCourseChange when tab is clicked', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      const webTab = screen.getByRole('tab', { name: /Web開発/ })
      fireEvent.click(webTab)

      expect(mockOnCourseChange).toHaveBeenCalledWith('web')
    })

    it('should call onCourseChange with correct courseId for each tab', () => {
      render(
        <RoadmapTabs activeCourse="beginner" onCourseChange={mockOnCourseChange} />
      )

      fireEvent.click(screen.getByRole('tab', { name: /Python開発/ }))
      expect(mockOnCourseChange).toHaveBeenCalledWith('python')

      fireEvent.click(screen.getByRole('tab', { name: /スマホアプリ/ }))
      expect(mockOnCourseChange).toHaveBeenCalledWith('mobile')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/components/roadmap/__tests__/RoadmapTabs.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

以下の手順でUIを確認する：

1. **開発サーバー起動**: `npm run dev`

2. **テスト用ページ作成**（一時的）: `src/app/roadmap/page.tsx` に以下を追加
   ```tsx
   'use client'
   import { useState } from 'react'
   import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
   import type { CourseId } from '@/data/roadmaps'

   export default function RoadmapPage() {
     const [activeCourse, setActiveCourse] = useState<CourseId>('beginner')
     return (
       <div className="p-8">
         <RoadmapTabs activeCourse={activeCourse} onCourseChange={setActiveCourse} />
         <p className="mt-4">Active: {activeCourse}</p>
       </div>
     )
   }
   ```

3. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] 4つのタブが表示されていることを確認
   - [ ] `mcp__chrome-devtools__click` で各タブをクリックし、アクティブ状態が変わることを確認
   - [ ] `mcp__chrome-devtools__resize_page` で幅を375pxに変更し、横スクロールが有効か確認

4. **視覚確認項目**:
   - [ ] タブコンテナが中央寄せで表示される
   - [ ] アクティブタブが `bg-indigo-50` の背景色を持つ
   - [ ] ホバー時に非アクティブタブの背景が変わる
   - [ ] 絵文字とテキストが正しく表示される

---

## 次のチケット

→ `04-roadmap-node.md`（RoadmapNode - ノードコンポーネント）
