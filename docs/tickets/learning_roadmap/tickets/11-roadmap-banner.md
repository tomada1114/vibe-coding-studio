# Ticket #11: RoadmapBanner - クーポンページ用バナー

## 概要

クーポンページに表示するロードマップへの導線バナーを作成する。CouponCardスタイルに準拠したデザインで、ユーザーをロードマップページへ誘導する。

## 前提チケット

- `10-python-course-data.md` ✅ 完了必須

## User Story

**As a** クーポンページを訪問したユーザー
**I want** ロードマップの存在を知りたい
**So that** 学習順序を確認できる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-002 バナー仕様 |
| `.kiro/specs/roadmap/design-concept.md` | CTAバナースタイル |
| `.kiro/specs/roadmap/prototype.html` | バナーのHTML構造（398-424行目） |
| `src/components/coupons/CouponCard.tsx` | 既存カードスタイルの参考 |

---

## 実装内容

### 作成ファイル

`src/components/roadmap/RoadmapBanner.tsx`

### Props定義

```typescript
interface RoadmapBannerProps {
  className?: string
}
```

### コンテンツ

| 要素 | 内容 |
|------|------|
| Badge | 🗺️ 学習ガイド |
| Title | どこから学べばいい？ |
| Description | 目的に応じた学習ロードマップで、最適な受講順序をチェック。初心者からプロフェッショナルまで、あなたに合った学習パスを見つけましょう。 |
| CTA Button | ロードマップを見る → |

### スタイル仕様

| 要素 | Tailwindクラス |
|------|----------------|
| Container | `relative overflow-hidden rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm` |
| Decorative Blob 1 | `absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50 blur-3xl` |
| Decorative Blob 2 | `absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-50 blur-3xl` |
| Content Wrapper | `relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left` |
| Badge | `inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10` |
| Title | `text-xl font-bold text-zinc-950` |
| Description | `text-sm leading-relaxed text-zinc-600` |
| Button | `inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800` |

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The banner shall display icon "🗺️" with badge "学習ガイド". |
| REQ-002 | The banner shall display title "どこから学べばいい？". |
| REQ-003 | The banner shall display description text about learning roadmap. |
| REQ-004 | **When** user clicks CTA button, the system shall navigate to `/roadmap`. |
| REQ-005 | The banner shall have CouponCard-style design with decorative gradient blobs. |
| REQ-006 | **When** viewport width < 640px, the layout shall be vertical (flex-col). |
| REQ-007 | **When** viewport width >= 640px, the layout shall be horizontal (flex-row). |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/components/roadmap/RoadmapBanner.tsx` が存在する
- [ ] **コンテンツ**: バッジ、タイトル、説明文、CTAボタンが表示される
- [ ] **デザイン**: CouponCardスタイルに準拠（角丸、シャドウ、装飾blob）
- [ ] **遷移**: CTAボタンクリックで `/roadmap` へ遷移
- [ ] **レスポンシブ**: モバイルで縦積み、デスクトップで横並び
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/components/roadmap/__tests__/RoadmapBanner.test.tsx` を作成

```typescript
import { render, screen } from '@testing-library/react'
import { RoadmapBanner } from '../RoadmapBanner'

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) {
    return <a href={href}>{children}</a>
  }
})

describe('RoadmapBanner', () => {
  describe('rendering', () => {
    it('should display badge with emoji and text', () => {
      render(<RoadmapBanner />)
      expect(screen.getByText('🗺️')).toBeInTheDocument()
      expect(screen.getByText('学習ガイド')).toBeInTheDocument()
    })

    it('should display title', () => {
      render(<RoadmapBanner />)
      expect(screen.getByText('どこから学べばいい？')).toBeInTheDocument()
    })

    it('should display description', () => {
      render(<RoadmapBanner />)
      expect(
        screen.getByText(/目的に応じた学習ロードマップ/)
      ).toBeInTheDocument()
    })

    it('should display CTA button', () => {
      render(<RoadmapBanner />)
      expect(screen.getByText('ロードマップを見る')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should have link to /roadmap', () => {
      render(<RoadmapBanner />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/roadmap')
    })
  })

  describe('styling', () => {
    it('should have rounded container', () => {
      const { container } = render(<RoadmapBanner />)
      const banner = container.firstChild
      expect(banner).toHaveClass('rounded-2xl')
    })

    it('should have border and shadow', () => {
      const { container } = render(<RoadmapBanner />)
      const banner = container.firstChild
      expect(banner).toHaveClass('border')
      expect(banner).toHaveClass('shadow-sm')
    })
  })

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(<RoadmapBanner className="custom-class" />)
      const banner = container.firstChild
      expect(banner).toHaveClass('custom-class')
    })
  })

  describe('accessibility', () => {
    it('should have accessible link', () => {
      render(<RoadmapBanner />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/components/roadmap/__tests__/RoadmapBanner.test.tsx` が成功する

### UI確認（Chrome DevTools MCP）

1. **テスト用ページ作成**: `src/app/test-banner/page.tsx` を一時的に作成

```tsx
import { RoadmapBanner } from '@/components/roadmap/RoadmapBanner'

export default function TestBannerPage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-2xl font-bold">RoadmapBanner Test</h1>
      <RoadmapBanner />
    </div>
  )
}
```

2. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/test-banner` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] バッジ、タイトル、説明文、CTAボタンが表示されていることを確認
   - [ ] `mcp__chrome-devtools__take_screenshot` でスクリーンショットを撮影
   - [ ] `mcp__chrome-devtools__click` でCTAボタンをクリックし、`/roadmap` へ遷移することを確認
   - [ ] `mcp__chrome-devtools__resize_page` で幅を375pxに変更し、縦積みレイアウトになることを確認

3. **視覚確認項目**:
   - [ ] 角丸カード（rounded-2xl）デザイン
   - [ ] 背景の装飾blob（グラデーション、blur）
   - [ ] バッジ（🗺️ 学習ガイド）
   - [ ] タイトル（どこから学べばいい？）
   - [ ] 説明文
   - [ ] CTAボタン（ロードマップを見る →）
   - [ ] ホバー時のボタンスタイル変化

4. **テストページ削除**: 確認後、`src/app/test-banner/page.tsx` を削除

---

## 次のチケット

→ `12-roadmap-flow.md`（RoadmapFlow - フローチャート全体）
