# Ticket #08: Web開発コースデータ（web.ts）

## 概要

Web開発向けの学習パスデータを作成する。Next.js/Reactを中心としたWeb開発スキルを習得するための推奨受講順序を定義する。

## 前提チケット

- `07-beginner-course-data.md` ✅ 完了必須

## User Story

**As a** Web開発を学びたい人
**I want** Web開発向けの学習パスを見たい
**So that** Next.js/Reactの学習順序がわかる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `src/data/roadmaps/types.ts` | RoadmapCourse型 |
| `src/data/roadmaps/beginner.ts` | データ構造の参考 |
| `src/data/roadmaps/index.ts` | エクスポート先 |
| `src/app/coupons/*/page.tsx` | 既存クーポンページのslug確認 |

---

## 実装内容

### 作成ファイル

`src/data/roadmaps/web.ts`

### コースデータ

```typescript
import type { RoadmapCourse } from './types'

export const webCourse: RoadmapCourse = {
  id: 'web',
  name: 'Web開発',
  emoji: '🌐',
  description: 'Next.js/Reactを中心としたモダンWeb開発',
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
      id: 'mcp-nextjs',
      title: 'MCP × Next.js + Clerk + Supabase',
      description: 'MCPツールを活用したNext.jsフルスタック開発。認証・データベースを含む本格的なWebアプリを構築。',
      difficulty: 'advanced',
      category: 'advanced',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-mcp-nextjs',
      },
      isRequired: true,
    },
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'expenses-app' },
    { from: 'expenses-app', to: 'project-tracker' },
    { from: 'project-tracker', to: 'mcp-nextjs' },
  ],
}
```

### index.tsの更新

```typescript
// src/data/roadmaps/index.ts に追加
import { beginnerCourse } from './beginner'
import { webCourse } from './web'

const courses: RoadmapCourse[] = [beginnerCourse, webCourse]
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The course data shall have `id: 'web'`, `name: 'Web開発'`, `emoji: '🌐'`. |
| REQ-002 | The course data shall include 4 nodes focused on Web development. |
| REQ-003 | All nodes shall have `isRequired: true` (no optional nodes). |
| REQ-004 | The final node shall focus on MCP + Next.js advanced development. |

---

## ノード一覧

| Step | ID | Title | Difficulty | Category | isRequired |
|------|----|-------|------------|----------|------------|
| 1 | vibe-coding-intro | Claude Code × Vibe Coding 入門 | beginner | intro | true |
| 2 | expenses-app | Stripe サブスク型 家計簿アプリ | intermediate | basic | true |
| 3 | project-tracker | 作業時間管理アプリ【完全版】 | intermediate-advanced | practice | true |
| 4 | mcp-nextjs | MCP × Next.js + Clerk + Supabase | advanced | advanced | true |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/data/roadmaps/web.ts` が存在する
- [ ] **データ構造**: `RoadmapCourse`型に準拠
- [ ] **ノード数**: 4ノード（すべて必須）
- [ ] **エッジ数**: 3エッジ
- [ ] **index.ts更新**: `webCourse`がエクスポートされている
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/data/roadmaps/__tests__/web.test.ts` を作成

```typescript
import { webCourse } from '../web'
import { getCourseById } from '../index'

describe('Web Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(webCourse.id).toBe('web')
    })

    it('should have correct name', () => {
      expect(webCourse.name).toBe('Web開発')
    })

    it('should have correct emoji', () => {
      expect(webCourse.emoji).toBe('🌐')
    })
  })

  describe('nodes', () => {
    it('should have 4 nodes', () => {
      expect(webCourse.nodes).toHaveLength(4)
    })

    it('should have all required nodes', () => {
      const requiredNodes = webCourse.nodes.filter((n) => n.isRequired)
      expect(requiredNodes).toHaveLength(4)
    })

    it('should have unique node IDs', () => {
      const ids = webCourse.nodes.map((n) => n.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('edges', () => {
    it('should have 3 edges', () => {
      expect(webCourse.edges).toHaveLength(3)
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('web')
      expect(course).toBeDefined()
      expect(course?.id).toBe('web')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/web.test.ts` が成功する

### UI確認（Chrome DevTools MCP）

1. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap?course=web` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] Web開発タブがアクティブになっていることを確認
   - [ ] 4つのノードが表示されていることを確認
   - [ ] すべてのノードにステップ番号（1, 2, 3, 4）が表示されていることを確認

---

## 次のチケット

→ `09-mobile-course-data.md`（スマホアプリコースデータ）
