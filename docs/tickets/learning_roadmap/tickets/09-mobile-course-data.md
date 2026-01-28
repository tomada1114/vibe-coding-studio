# Ticket #09: スマホアプリコースデータ（mobile.ts）

## 概要

スマホアプリ開発向けの学習パスデータを作成する。React Native/Expoを中心としたクロスプラットフォーム開発スキルを習得するための推奨受講順序を定義する。

## 前提チケット

- `08-web-course-data.md` ✅ 完了必須

## User Story

**As a** スマホアプリを開発したい人
**I want** スマホアプリ向けの学習パスを見たい
**So that** React Native/Expoの学習順序がわかる

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

`src/data/roadmaps/mobile.ts`

### コースデータ

```typescript
import type { RoadmapCourse } from './types'

export const mobileCourse: RoadmapCourse = {
  id: 'mobile',
  name: 'スマホアプリ',
  emoji: '📱',
  description: 'React Native/Expoでクロスプラットフォーム開発',
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
      id: 'react-native-5apps',
      title: 'React Native × Expo（5アプリ）',
      description: '5つの実践的なアプリを作りながら、React Native/Expoの基礎を習得します。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-react-native-5apps',
      },
      isRequired: true,
    },
    {
      id: 'expo-template',
      title: 'React Native × Expoテンプレート',
      description: '本格的なスマホアプリ開発のためのテンプレートを構築。認証・ナビゲーション・状態管理を含む。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-expo-template',
      },
      isRequired: true,
    },
    {
      id: 'codex-react-native',
      title: 'Codex × React Native',
      description: 'OpenAI Codexを活用したReact Native開発で、さらなる効率化を実現。',
      difficulty: 'intermediate',
      category: 'optional',
      link: {
        type: 'coupon',
        url: '/coupons/codex-react-native',
      },
      isRequired: false,
    },
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'react-native-5apps' },
    { from: 'react-native-5apps', to: 'expo-template' },
    { from: 'react-native-5apps', to: 'codex-react-native' },
  ],
}
```

### index.tsの更新

```typescript
// src/data/roadmaps/index.ts に追加
import { beginnerCourse } from './beginner'
import { webCourse } from './web'
import { mobileCourse } from './mobile'

const courses: RoadmapCourse[] = [beginnerCourse, webCourse, mobileCourse]
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The course data shall have `id: 'mobile'`, `name: 'スマホアプリ'`, `emoji: '📱'`. |
| REQ-002 | The course data shall include 4 nodes (3 required + 1 optional). |
| REQ-003 | The course shall focus on React Native/Expo development. |
| REQ-004 | The optional node (Codex × React Native) shall have `isRequired: false`. |

---

## ノード一覧

| Step | ID | Title | Difficulty | Category | isRequired |
|------|----|-------|------------|----------|------------|
| 1 | vibe-coding-intro | Claude Code × Vibe Coding 入門 | beginner | intro | true |
| 2 | react-native-5apps | React Native × Expo（5アプリ） | intermediate | basic | true |
| 3 | expo-template | React Native × Expoテンプレート | intermediate-advanced | practice | true |
| - | codex-react-native | Codex × React Native | intermediate | optional | false |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/data/roadmaps/mobile.ts` が存在する
- [ ] **データ構造**: `RoadmapCourse`型に準拠
- [ ] **ノード数**: 4ノード（3必須 + 1選択）
- [ ] **エッジ数**: 3エッジ
- [ ] **index.ts更新**: `mobileCourse`がエクスポートされている
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/data/roadmaps/__tests__/mobile.test.ts` を作成

```typescript
import { mobileCourse } from '../mobile'
import { getCourseById } from '../index'

describe('Mobile Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(mobileCourse.id).toBe('mobile')
    })

    it('should have correct name', () => {
      expect(mobileCourse.name).toBe('スマホアプリ')
    })

    it('should have correct emoji', () => {
      expect(mobileCourse.emoji).toBe('📱')
    })
  })

  describe('nodes', () => {
    it('should have 4 nodes', () => {
      expect(mobileCourse.nodes).toHaveLength(4)
    })

    it('should have 3 required nodes', () => {
      const requiredNodes = mobileCourse.nodes.filter((n) => n.isRequired)
      expect(requiredNodes).toHaveLength(3)
    })

    it('should have 1 optional node', () => {
      const optionalNodes = mobileCourse.nodes.filter((n) => !n.isRequired)
      expect(optionalNodes).toHaveLength(1)
    })

    it('should have React Native focused content', () => {
      const rnNodes = mobileCourse.nodes.filter(
        (n) => n.title.includes('React Native') || n.title.includes('Expo')
      )
      expect(rnNodes.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('edges', () => {
    it('should have 3 edges', () => {
      expect(mobileCourse.edges).toHaveLength(3)
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('mobile')
      expect(course).toBeDefined()
      expect(course?.id).toBe('mobile')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/mobile.test.ts` が成功する

### UI確認（Chrome DevTools MCP）

1. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap?course=mobile` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] スマホアプリタブがアクティブになっていることを確認
   - [ ] 4つのノードが表示されていることを確認
   - [ ] Codex × React Nativeが「選択」バッジ付きで表示されていることを確認

---

## 次のチケット

→ `10-python-course-data.md`（Python開発コースデータ）
