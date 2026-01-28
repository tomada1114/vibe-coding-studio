# Ticket #05: RoadmapEdge - 接続線（SVG）

## 概要

ロードマップ上のノード間を結ぶ接続線をSVGで描画するコンポーネントを作成する。破線スタイルとアニメーションを実装する。

## 前提チケット

- `01-type-definitions.md` ✅ 完了必須
- `02-data-structure.md` ✅ 完了必須
- `03-roadmap-tabs.md` ✅ 完了必須
- `04-roadmap-node.md` ✅ 完了必須

## User Story

**As a** ユーザー
**I want** 講座間の関係を線で視覚的に理解したい
**So that** 学習順序が一目でわかる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-001-2 接続線仕様 |
| `.kiro/specs/roadmap/design-concept.md` | SVGスタイル定義 |
| `.kiro/specs/roadmap/prototype.html` | SVG構造（142-144行目）、CSSアニメーション（40-48行目） |

---

## 実装内容

### 作成ファイル

`src/components/roadmap/RoadmapEdge.tsx`

### 実装パターン

2つの用途に対応：
1. **CentralEdge**: フローチャート中央を貫く垂直線（メインパス用）
2. **BranchEdge**: 分岐接続線（将来の拡張用、MVP外）

### Props定義

```typescript
interface RoadmapEdgeProps {
  className?: string
}
```

### スタイル仕様

| 要素 | 値 |
|------|-----|
| stroke | `#e4e4e7` (zinc-200) |
| stroke-width | `2` |
| stroke-dasharray | `8,4` |
| Animation | `flowDown` - stroke-dashoffsetを0→-12にアニメーション |

### CSSアニメーション

```css
@keyframes flowDown {
  0% { stroke-dashoffset: 12; }
  100% { stroke-dashoffset: 0; }
}

.flow-line {
  stroke-dasharray: 8, 4;
  animation: flowDown 1s linear infinite;
}
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The edge shall render as SVG `<line>` element with `stroke="#e4e4e7"` and `stroke-width="2"`. |
| REQ-002 | The edge shall have `stroke-dasharray="8,4"` for dashed style. |
| REQ-003 | The edge shall have flow-down animation (`stroke-dashoffset` transition). |
| REQ-004 | The edge container shall be positioned absolutely and centered horizontally. |
| REQ-005 | The edge shall have `aria-hidden="true"` as it is decorative. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/components/roadmap/RoadmapEdge.tsx` が存在する
- [ ] **SVG描画**: 垂直線が正しく描画される
- [ ] **スタイル**: stroke、stroke-width、stroke-dasharrayが仕様通り
- [ ] **アニメーション**: 破線が流れるアニメーションが動作
- [ ] **アクセシビリティ**: `aria-hidden="true"` が設定されている
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/components/roadmap/__tests__/RoadmapEdge.test.tsx` を作成

```typescript
import { render } from '@testing-library/react'
import { RoadmapEdge } from '../RoadmapEdge'

describe('RoadmapEdge', () => {
  describe('rendering', () => {
    it('should render SVG element', () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should render line element inside SVG', () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector('line')
      expect(line).toBeInTheDocument()
    })

    it('should have correct stroke color', () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector('line')
      expect(line).toHaveAttribute('stroke', '#e4e4e7')
    })

    it('should have correct stroke width', () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector('line')
      expect(line).toHaveAttribute('stroke-width', '2')
    })

    it('should have dashed stroke', () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector('line')
      expect(line).toHaveAttribute('stroke-dasharray', '8,4')
    })
  })

  describe('accessibility', () => {
    it('should have aria-hidden="true" for decorative element', () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('positioning', () => {
    it('should be absolutely positioned', () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('absolute')
    })

    it('should be horizontally centered', () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('left-1/2')
      expect(svg).toHaveClass('-translate-x-1/2')
    })
  })

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(<RoadmapEdge className="custom-class" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('custom-class')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/components/roadmap/__tests__/RoadmapEdge.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

1. **テスト用ページ更新**: `src/app/roadmap/page.tsx` を更新

```tsx
'use client'
import { useState } from 'react'
import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
import { RoadmapNode } from '@/components/roadmap/RoadmapNode'
import { RoadmapEdge } from '@/components/roadmap/RoadmapEdge'
import type { CourseId, RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

const testNodes: RoadmapNodeType[] = [
  {
    id: 'test-1',
    title: 'Claude Code × Vibe Coding 入門',
    description: 'プログラミング未経験からスタート。',
    difficulty: 'beginner',
    category: 'intro',
    link: { type: 'coupon', url: '/coupons/claude-code-vibe-coding' },
    isRequired: true,
  },
  {
    id: 'test-2',
    title: 'Stripe サブスク型 家計簿アプリ',
    description: '決済機能を持つWebアプリケーションを開発。',
    difficulty: 'intermediate',
    category: 'basic',
    link: { type: 'coupon', url: '/coupons/claude-code-expenses-app' },
    isRequired: true,
  },
]

export default function RoadmapPage() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('beginner')
  return (
    <div className="mx-auto max-w-4xl p-8">
      <RoadmapTabs activeCourse={activeCourse} onCourseChange={setActiveCourse} />

      {/* フローチャートエリア */}
      <div className="relative mx-auto mt-12 max-w-3xl">
        {/* 中央の接続線 */}
        <RoadmapEdge />

        {/* ノード */}
        <div className="relative flex flex-col items-center gap-8">
          <RoadmapNode node={testNodes[0]} stepNumber={1} />
          <RoadmapNode node={testNodes[1]} stepNumber={2} />
        </div>
      </div>
    </div>
  )
}
```

2. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] SVG要素が存在することを確認
   - [ ] `mcp__chrome-devtools__take_screenshot` でスクリーンショットを撮影
   - [ ] 破線がノード間を結んでいることを視覚的に確認

3. **視覚確認項目**:
   - [ ] 破線が中央に垂直に表示される
   - [ ] 破線のスタイル（zinc-200色、2px幅、8,4ダッシュ）
   - [ ] 破線がノードの後ろ（z-index的に下）に表示される
   - [ ] アニメーションで破線が下に流れる動き（1秒周期）

---

## 次のチケット

→ `06-roadmap-legend.md`（RoadmapLegend - 凡例）
