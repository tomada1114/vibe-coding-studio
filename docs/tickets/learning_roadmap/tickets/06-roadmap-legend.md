# Ticket #06: RoadmapLegend - 凡例

## 概要

ロードマップの凡例コンポーネントを作成する。必須講座と選択講座の違いを視覚的に説明する。

## 前提チケット

- `01-type-definitions.md` ✅ 完了必須
- `02-data-structure.md` ✅ 完了必須
- `03-roadmap-tabs.md` ✅ 完了必須
- `04-roadmap-node.md` ✅ 完了必須
- `05-roadmap-edge.md` ✅ 完了必須

## User Story

**As a** ユーザー
**I want** 凡例で必須/選択講座の違いを理解したい
**So that** ロードマップの読み方がわかる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-001-4 凡例仕様 |
| `.kiro/specs/roadmap/prototype.html` | 凡例のHTML構造（385-394行目） |

---

## 実装内容

### 作成ファイル

`src/components/roadmap/RoadmapLegend.tsx`

### Props定義

```typescript
interface RoadmapLegendProps {
  className?: string
}
```

### 凡例項目

| 項目 | アイコン | ラベル |
|------|----------|--------|
| 必須講座 | ステップ番号アイコン（1） | 必須講座 |
| 選択講座 | 破線ボックス | 選択講座 |

### スタイル仕様

| 要素 | Tailwindクラス |
|------|----------------|
| Container | `flex justify-center gap-8 border-t border-zinc-200 pt-8` |
| Item | `flex items-center gap-2 text-sm text-zinc-600` |
| Step Icon | `flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white` |
| Dashed Box | `h-5 w-8 rounded border-2 border-dashed border-zinc-300` |

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The legend shall display "必須講座" with step number indicator icon (number "1"). |
| REQ-002 | The legend shall display "選択講座" with dashed border icon. |
| REQ-003 | The legend shall be positioned below the flowchart with `border-t border-zinc-200 pt-8`. |
| REQ-004 | The legend items shall be centered horizontally with `gap-8` spacing. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/components/roadmap/RoadmapLegend.tsx` が存在する
- [ ] **必須講座凡例**: ステップ番号アイコン + "必須講座" テキスト
- [ ] **選択講座凡例**: 破線ボックス + "選択講座" テキスト
- [ ] **スタイル**: ボーダー上部、中央配置
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/components/roadmap/__tests__/RoadmapLegend.test.tsx` を作成

```typescript
import { render, screen } from '@testing-library/react'
import { RoadmapLegend } from '../RoadmapLegend'

describe('RoadmapLegend', () => {
  describe('rendering', () => {
    it('should display "必須講座" text', () => {
      render(<RoadmapLegend />)
      expect(screen.getByText('必須講座')).toBeInTheDocument()
    })

    it('should display "選択講座" text', () => {
      render(<RoadmapLegend />)
      expect(screen.getByText('選択講座')).toBeInTheDocument()
    })

    it('should display step number "1" for required icon', () => {
      render(<RoadmapLegend />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have border-t class for top border', () => {
      const { container } = render(<RoadmapLegend />)
      const legend = container.firstChild
      expect(legend).toHaveClass('border-t')
    })

    it('should have centered items with gap', () => {
      const { container } = render(<RoadmapLegend />)
      const legend = container.firstChild
      expect(legend).toHaveClass('justify-center')
      expect(legend).toHaveClass('gap-8')
    })

    it('should have step icon with bg-indigo-600', () => {
      const { container } = render(<RoadmapLegend />)
      const stepIcon = container.querySelector('.bg-indigo-600')
      expect(stepIcon).toBeInTheDocument()
    })

    it('should have dashed border box for optional icon', () => {
      const { container } = render(<RoadmapLegend />)
      const dashedBox = container.querySelector('.border-dashed')
      expect(dashedBox).toBeInTheDocument()
    })
  })

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(<RoadmapLegend className="custom-class" />)
      const legend = container.firstChild
      expect(legend).toHaveClass('custom-class')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/components/roadmap/__tests__/RoadmapLegend.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

1. **テスト用ページ更新**: `src/app/roadmap/page.tsx` に凡例を追加

```tsx
'use client'
import { useState } from 'react'
import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
import { RoadmapNode } from '@/components/roadmap/RoadmapNode'
import { RoadmapEdge } from '@/components/roadmap/RoadmapEdge'
import { RoadmapLegend } from '@/components/roadmap/RoadmapLegend'
import type { CourseId, RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

const testNodes: RoadmapNodeType[] = [
  // ... (前のチケットと同じ)
]

export default function RoadmapPage() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('beginner')
  return (
    <div className="mx-auto max-w-4xl p-8">
      <RoadmapTabs activeCourse={activeCourse} onCourseChange={setActiveCourse} />

      <div className="relative mx-auto mt-12 max-w-3xl">
        <RoadmapEdge />
        <div className="relative flex flex-col items-center gap-8">
          {/* ノード */}
        </div>

        {/* 凡例 */}
        <RoadmapLegend className="mt-12" />
      </div>
    </div>
  )
}
```

2. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] 凡例が2項目（必須講座、選択講座）表示されていることを確認
   - [ ] `mcp__chrome-devtools__take_screenshot` でスクリーンショットを撮影

3. **視覚確認項目**:
   - [ ] 凡例がフローチャートの下に表示される
   - [ ] 上部にボーダーライン（zinc-200）
   - [ ] ステップ番号アイコン（indigo-600の丸）+ "必須講座"
   - [ ] 破線ボックス + "選択講座"
   - [ ] 2項目が中央寄せで適度な間隔（gap-8）

---

## 次のチケット

→ `07-beginner-course-data.md`（完全初心者コースデータ）
