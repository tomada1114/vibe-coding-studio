# Ticket #13: RoadmapPage - ページ統合

## 概要

`/roadmap` ページを完成させる。ヘッダー、パンくず、タブ、フローチャート、凡例を統合し、SSGとSEOに対応する。

## 前提チケット

- `03-roadmap-tabs.md` ✅ 完了必須
- `06-roadmap-legend.md` ✅ 完了必須
- `10-python-course-data.md` ✅ 完了必須
- `12-roadmap-flow.md` ✅ 完了必須

## User Story

**As a** ユーザー
**I want** `/roadmap` でロードマップを見たい
**So that** 学習パスを選択できる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-001 ページ仕様 |
| `.kiro/specs/roadmap/design-concept.md` | ページレイアウト、ヘッダースタイル |
| `.kiro/specs/roadmap/prototype.html` | ページ全体のHTML構造 |
| `src/app/coupons/page.tsx` | 既存ページの参考（ヘッダースタイル） |
| `src/components/gradient.tsx` | Radiantグラデーション |
| `src/components/navbar.tsx` | ナビゲーション参考 |

---

## 実装内容

### 作成・更新ファイル

1. `src/app/roadmap/page.tsx` - メインページ
2. `src/app/roadmap/layout.tsx` - レイアウト（オプション）

### ページ構成

```
┌─────────────────────────────────────────────────────────┐
│  [Gradient Header]                                      │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ← ホーム / ロードマップ (Breadcrumb)               ││
│  │                                                     ││
│  │ 🗺️ 目的別学習ガイド (Badge)                        ││
│  │ Claude Code 学習ロードマップ (H1)                   ││
│  │ 目的に応じた最適な学習パスを... (Description)      ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [RoadmapTabs]                                          │
│  ┌───────┬───────┬───────┬───────┐                     │
│  │初心者 │ Web   │スマホ │Python │                     │
│  └───────┴───────┴───────┴───────┘                     │
│                                                         │
│  [RoadmapFlow]                                          │
│  ...                                                    │
│                                                         │
│  [RoadmapLegend]                                        │
│  ────────────────────────────────────                   │
│  ● 必須講座    ┄┄ 選択講座                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### SEOメタデータ

```typescript
export const metadata: Metadata = {
  title: 'Claude Code 学習ロードマップ | Vibe Coding Studio',
  description:
    '目的に応じた最適な学習パスを選んでください。プログラミング未経験からプロフェッショナルまで効率的にスキルを習得できます。',
  openGraph: {
    title: 'Claude Code 学習ロードマップ',
    description:
      '目的に応じた最適な学習パスを選んでください。',
    type: 'website',
  },
}
```

### URL同期

```typescript
'use client'
import { useSearchParams, useRouter } from 'next/navigation'

// URLから初期コースを取得
const searchParams = useSearchParams()
const initialCourse = searchParams.get('course') as CourseId | null

// コース変更時にURLを更新
const handleCourseChange = (courseId: CourseId) => {
  setActiveCourse(courseId)
  router.push(`/roadmap?course=${courseId}`, { scroll: false })
}
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The page shall be accessible at `/roadmap`. |
| REQ-002 | **When** URL has `?course=web`, the system shall display "Web開発" course by default. |
| REQ-003 | **While** no query parameter exists, the system shall display "完全初心者" course. |
| REQ-004 | The page shall include breadcrumb navigation (ホーム > ロードマップ). |
| REQ-005 | The page shall include header section with Radiant gradient background. |
| REQ-006 | The page shall render RoadmapTabs, RoadmapFlow, and RoadmapLegend components. |
| REQ-007 | The page shall have proper SEO metadata (title, description, og). |
| REQ-008 | **When** user changes tab, the system shall update URL query parameter. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/app/roadmap/page.tsx` が存在する
- [ ] **URL**: `/roadmap` でアクセス可能
- [ ] **パンくず**: ホーム > ロードマップ が表示される
- [ ] **ヘッダー**: Radiantグラデーション背景、タイトル、説明文
- [ ] **コンポーネント統合**: RoadmapTabs, RoadmapFlow, RoadmapLegend
- [ ] **URL同期**: タブ切り替えでURLパラメータ更新
- [ ] **初期コース**: URLパラメータがない場合は "beginner"
- [ ] **SEO**: title, description, og:* が設定されている
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み
- [ ] **ビルド**: `npm run build` が成功する

### テスト

- [ ] **ページテスト**: `src/app/roadmap/__tests__/page.test.tsx` を作成

```typescript
import { render, screen } from '@testing-library/react'
import RoadmapPage from '../page'

// Mock next/navigation
const mockPush = jest.fn()
const mockGet = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: mockGet }),
}))

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

describe('RoadmapPage', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockGet.mockReturnValue(null)
  })

  describe('rendering', () => {
    it('should render page title', () => {
      render(<RoadmapPage />)
      expect(screen.getByText('Claude Code')).toBeInTheDocument()
      expect(screen.getByText('学習ロードマップ')).toBeInTheDocument()
    })

    it('should render breadcrumb', () => {
      render(<RoadmapPage />)
      expect(screen.getByText('ホーム')).toBeInTheDocument()
      expect(screen.getByText('ロードマップ')).toBeInTheDocument()
    })

    it('should render tabs', () => {
      render(<RoadmapPage />)
      expect(screen.getByText(/完全初心者/)).toBeInTheDocument()
      expect(screen.getByText(/Web開発/)).toBeInTheDocument()
      expect(screen.getByText(/スマホアプリ/)).toBeInTheDocument()
      expect(screen.getByText(/Python開発/)).toBeInTheDocument()
    })

    it('should render legend', () => {
      render(<RoadmapPage />)
      expect(screen.getByText('必須講座')).toBeInTheDocument()
      expect(screen.getByText('選択講座')).toBeInTheDocument()
    })
  })

  describe('initial course selection', () => {
    it('should default to beginner when no URL param', () => {
      mockGet.mockReturnValue(null)
      render(<RoadmapPage />)
      // beginner course content should be visible
      expect(
        screen.getByText('Claude Code × Vibe Coding 入門')
      ).toBeInTheDocument()
    })

    it('should use URL param for initial course', () => {
      mockGet.mockReturnValue('web')
      render(<RoadmapPage />)
      // web course should be selected (implementation depends on component)
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/app/roadmap/__tests__/page.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

1. **Chrome DevTools MCPで確認**:

   **基本表示**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] パンくず（ホーム > ロードマップ）が表示されることを確認
   - [ ] ヘッダー（グラデーション背景、タイトル、説明）が表示されることを確認
   - [ ] タブ、フローチャート、凡例が表示されることを確認
   - [ ] `mcp__chrome-devtools__take_screenshot` でスクリーンショットを撮影

   **URL同期**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap?course=web` にアクセス
   - [ ] "Web開発" タブがアクティブになっていることを確認
   - [ ] `mcp__chrome-devtools__click` で "Python開発" タブをクリック
   - [ ] URLが `?course=python` に変わることを確認

   **レスポンシブ**:
   - [ ] `mcp__chrome-devtools__resize_page` で幅を375pxに変更
   - [ ] モバイルレイアウトが正しく表示されることを確認
   - [ ] `mcp__chrome-devtools__resize_page` で幅を1200pxに変更
   - [ ] デスクトップレイアウトが正しく表示されることを確認

2. **視覚確認項目**:
   - [ ] Radiantグラデーションヘッダー（ピンク〜紫のグラデーション）
   - [ ] "🗺️ 目的別学習ガイド" バッジ
   - [ ] "Claude Code 学習ロードマップ" タイトル（グラデーションテキスト）
   - [ ] 説明文
   - [ ] 4つのタブ
   - [ ] フローチャート（ノード + 接続線）
   - [ ] 凡例（必須講座 / 選択講座）

### パフォーマンス確認

- [ ] **Lighthouse**: `npm run build && npm run start` 後、Lighthouseでパフォーマンスを確認
  - LCP < 2.5秒
  - CLS < 0.1
  - FID < 100ms

---

## 次のチケット

→ `14-navigation-update.md`（ナビゲーション更新）
