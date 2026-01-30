# Ticket #04: RoadmapNode - ノードコンポーネント

## 概要

ロードマップ上の個別講座ノードを表示するコンポーネントを作成する。必須/選択の2タイプに対応し、難易度・カテゴリバッジ、クリック遷移を実装する。

## 前提チケット

- `01-type-definitions.md` ✅ 完了必須
- `02-data-structure.md` ✅ 完了必須
- `03-roadmap-tabs.md` ✅ 完了必須

## User Story

**As a** ユーザー
**I want** 講座ノードの詳細情報を見たい
**So that** 各講座の内容と難易度を理解できる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-001-2, FR-001-3 ノード仕様 |
| `.kiro/specs/roadmap/design-concept.md` | ノードスタイル、バッジカラー |
| `.kiro/specs/roadmap/prototype.html` | ノードのHTML構造（149-332行目） |
| `src/data/roadmaps/types.ts` | RoadmapNode型 |
| `src/components/coupons/CouponCard.tsx` | 既存カードコンポーネントの参考 |

---

## 実装内容

### 作成ファイル

`src/components/roadmap/RoadmapNode.tsx`

### Props定義

```typescript
import type { RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

interface RoadmapNodeProps {
  node: RoadmapNodeType
  stepNumber?: number // 必須ノードの場合のステップ番号
}
```

### スタイル仕様

#### 必須ノード

| 要素 | Tailwindクラス |
|------|----------------|
| Container | `group relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm` |
| Hover | `hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10` |
| Step Indicator | `absolute left-1/2 -top-4 -translate-x-1/2 z-10` |
| Step Number | `flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-lg ring-4 ring-white` |
| Padding | `p-6 pt-8 sm:p-8 sm:pt-10` |

#### 選択ノード

| 要素 | Tailwindクラス |
|------|----------------|
| Container | `group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 shadow-sm` |
| Hover | `hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg` |
| Badge | `absolute right-3 top-3` |
| Badge Style | `inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600` |
| Padding | `p-5 pt-6` |

#### 難易度バッジ

| Level | Tailwindクラス | ラベル |
|-------|----------------|--------|
| beginner | `bg-green-50 text-green-700` | 初級 |
| intermediate | `bg-yellow-50 text-yellow-700` | 中級 |
| intermediate-advanced | `bg-orange-50 text-orange-700` | 中〜上級 |
| advanced | `bg-red-50 text-red-700` | 上級 |

#### カテゴリバッジ

| Category | Tailwindクラス | Emoji + Label |
|----------|----------------|---------------|
| intro | `bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10` | 📘 入門講座 |
| basic | `bg-blue-50 text-blue-700 ring-1 ring-blue-700/10` | 📗 基礎講座 |
| practice | `bg-violet-50 text-violet-700 ring-1 ring-violet-700/10` | 📙 実践講座 |
| advanced | `bg-red-50 text-red-700 ring-1 ring-red-700/10` | 🎯 上級講座 |
| optional | `bg-teal-50 text-teal-700 ring-1 ring-teal-700/10` | ⚡ 選択講座 |

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | **When** `isRequired` is true, the node shall display step number indicator with `bg-indigo-600` style. |
| REQ-002 | **When** `isRequired` is false, the node shall display "選択" badge at top-right. |
| REQ-003 | **When** `isRequired` is false, the node shall have `border-2 border-dashed border-zinc-300` style. |
| REQ-004 | **When** user clicks a node with `link.type === 'coupon'`, the system shall navigate to `link.url` in same tab. |
| REQ-005 | **When** user clicks a node with `link.type === 'external'`, the system shall open `link.url` in new tab. |
| REQ-006 | **When** user hovers on node, the system shall apply `-translate-y-1` transition with shadow. |
| REQ-007 | The node shall display difficulty badge with appropriate color based on `difficulty` prop. |
| REQ-008 | The node shall display category badge with appropriate color and emoji based on `category` prop. |
| REQ-009 | The node shall display title, description, and "クーポンを見る" CTA text. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/components/roadmap/RoadmapNode.tsx` が存在する
- [ ] **Props**: `node` と `stepNumber` を受け取る
- [ ] **必須ノード表示**: ステップ番号と実線ボーダー
- [ ] **選択ノード表示**: 「選択」バッジと破線ボーダー
- [ ] **バッジ表示**: 難易度バッジ4種、カテゴリバッジ5種
- [ ] **クリック遷移**: リンクタイプに応じた遷移（同一タブ/新規タブ）
- [ ] **ホバーアニメーション**: translateY + shadow
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/components/roadmap/__tests__/RoadmapNode.test.tsx` を作成

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { RoadmapNode } from '../RoadmapNode'
import type { RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Mock window.open
const mockOpen = jest.fn()
window.open = mockOpen

describe('RoadmapNode', () => {
  const requiredNode: RoadmapNodeType = {
    id: 'test-required',
    title: 'Claude Code × Vibe Coding 入門',
    description: 'プログラミング未経験からスタート',
    difficulty: 'beginner',
    category: 'intro',
    link: { type: 'coupon', url: '/coupons/claude-code-vibe-coding' },
    isRequired: true,
  }

  const optionalNode: RoadmapNodeType = {
    id: 'test-optional',
    title: 'MCP完全攻略',
    description: '5つの最新MCPツール',
    difficulty: 'intermediate',
    category: 'optional',
    link: { type: 'coupon', url: '/coupons/claude-code-mcp-nextjs' },
    isRequired: false,
  }

  const externalNode: RoadmapNodeType = {
    id: 'test-external',
    title: '外部リンク講座',
    description: '外部サイトへ',
    difficulty: 'advanced',
    category: 'advanced',
    link: { type: 'external', url: 'https://www.udemy.com/course/test' },
    isRequired: true,
  }

  beforeEach(() => {
    mockPush.mockClear()
    mockOpen.mockClear()
  })

  describe('rendering - required node', () => {
    it('should display step number when stepNumber is provided', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should display title and description', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText(requiredNode.title)).toBeInTheDocument()
      expect(screen.getByText(requiredNode.description)).toBeInTheDocument()
    })

    it('should display category badge with correct emoji', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText(/📘/)).toBeInTheDocument()
      expect(screen.getByText(/入門講座/)).toBeInTheDocument()
    })

    it('should display difficulty badge', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText('初級')).toBeInTheDocument()
    })
  })

  describe('rendering - optional node', () => {
    it('should display "選択" badge', () => {
      render(<RoadmapNode node={optionalNode} />)
      expect(screen.getByText('選択')).toBeInTheDocument()
    })

    it('should not display step number', () => {
      render(<RoadmapNode node={optionalNode} />)
      // Step number should not be rendered for optional nodes
      expect(screen.queryByText(/^[0-9]$/)).not.toBeInTheDocument()
    })

    it('should have dashed border class', () => {
      const { container } = render(<RoadmapNode node={optionalNode} />)
      const article = container.querySelector('article')
      expect(article).toHaveClass('border-dashed')
    })
  })

  describe('difficulty badges', () => {
    it.each([
      ['beginner', '初級', 'bg-green-50'],
      ['intermediate', '中級', 'bg-yellow-50'],
      ['intermediate-advanced', '中〜上級', 'bg-orange-50'],
      ['advanced', '上級', 'bg-red-50'],
    ])('should display %s as %s with correct style', (difficulty, label, expectedClass) => {
      const node = { ...requiredNode, difficulty: difficulty as any }
      render(<RoadmapNode node={node} stepNumber={1} />)
      const badge = screen.getByText(label)
      expect(badge).toHaveClass(expectedClass)
    })
  })

  describe('navigation', () => {
    it('should navigate to internal URL on click for coupon link', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockPush).toHaveBeenCalledWith('/coupons/claude-code-vibe-coding')
    })

    it('should open new tab for external link', () => {
      render(<RoadmapNode node={externalNode} stepNumber={1} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockOpen).toHaveBeenCalledWith('https://www.udemy.com/course/test', '_blank')
    })
  })

  describe('accessibility', () => {
    it('should have role="article" for semantic structure', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('should be focusable', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('tabIndex', '0')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/components/roadmap/__tests__/RoadmapNode.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

1. **テスト用ページ更新**: `src/app/roadmap/page.tsx` を更新

```tsx
'use client'
import { useState } from 'react'
import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
import { RoadmapNode } from '@/components/roadmap/RoadmapNode'
import type { CourseId, RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

const testNodes: RoadmapNodeType[] = [
  {
    id: 'test-1',
    title: 'Claude Code × Vibe Coding 入門',
    description: 'プログラミング未経験からスタート。React・Next.jsで5つのアプリを作りながら、AI駆動開発の基礎を身につけます。',
    difficulty: 'beginner',
    category: 'intro',
    link: { type: 'coupon', url: '/coupons/claude-code-vibe-coding' },
    isRequired: true,
  },
  {
    id: 'test-optional',
    title: 'MCP完全攻略',
    description: '5つの最新MCPツールで開発効率を劇的に向上させます。',
    difficulty: 'intermediate',
    category: 'optional',
    link: { type: 'coupon', url: '/coupons/claude-code-mcp-nextjs' },
    isRequired: false,
  },
]

export default function RoadmapPage() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('beginner')
  return (
    <div className="mx-auto max-w-4xl p-8">
      <RoadmapTabs activeCourse={activeCourse} onCourseChange={setActiveCourse} />
      <div className="mt-12 flex flex-col items-center gap-8">
        <RoadmapNode node={testNodes[0]} stepNumber={1} />
        <RoadmapNode node={testNodes[1]} />
      </div>
    </div>
  )
}
```

2. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] 必須ノードにステップ番号「1」が表示されていることを確認
   - [ ] 選択ノードに「選択」バッジが表示されていることを確認
   - [ ] `mcp__chrome-devtools__hover` でノードをホバーし、影が変わることを確認
   - [ ] `mcp__chrome-devtools__click` でノードをクリックし、遷移することを確認

3. **視覚確認項目**:
   - [ ] 必須ノードは実線ボーダー、選択ノードは破線ボーダー
   - [ ] カテゴリバッジ（📘入門講座など）が中央に表示
   - [ ] 難易度バッジ（初級/中級など）が正しい色で表示
   - [ ] ホバー時に浮き上がるアニメーション
   - [ ] 「クーポンを見る」テキストとアロー表示

---

## 次のチケット

→ `05-roadmap-edge.md`（RoadmapEdge - 接続線）
