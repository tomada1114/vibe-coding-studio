# Ticket #10: Python開発コースデータ（python.ts）

## 概要

Python開発向けの学習パスデータを作成する。Python/FastAPI/Flaskを中心としたバックエンド開発スキルを習得するための推奨受講順序を定義する。

## 前提チケット

- `09-mobile-course-data.md` ✅ 完了必須

## User Story

**As a** Python開発を学びたい人
**I want** Python向けの学習パスを見たい
**So that** Python/FastAPI/Flaskの学習順序がわかる

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

`src/data/roadmaps/python.ts`

### コースデータ

```typescript
import type { RoadmapCourse } from './types'

export const pythonCourse: RoadmapCourse = {
  id: 'python',
  name: 'Python開発',
  emoji: '🐍',
  description: 'Python/FastAPI/Flaskでバックエンド開発',
  nodes: [
    {
      id: 'python-pytest',
      title: 'Claude Code × Python × pytest',
      description: 'Pythonの基礎からpytestを使ったテスト駆動開発まで、AI駆動でPython開発を学びます。',
      difficulty: 'beginner',
      category: 'intro',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-python',
      },
      isRequired: true,
    },
    {
      id: 'flask-app',
      title: 'Claude Code × Flask',
      description: 'Flaskを使ったWebアプリケーション開発。REST APIの基礎を習得します。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-flask',
      },
      isRequired: true,
    },
    {
      id: 'gemini-flask',
      title: 'Gemini CLI × Flask マインドマップ',
      description: 'Google Gemini CLIとFlaskを組み合わせたAIアプリケーション開発。',
      difficulty: 'intermediate',
      category: 'optional',
      link: {
        type: 'coupon',
        url: '/coupons/gemini_cli_vibe_coding_mind_map',
      },
      isRequired: false,
    },
    {
      id: 'fastapi-codex',
      title: 'Codex × FastAPI',
      description: 'FastAPIを使った高速APIサーバー開発。Codexを活用して効率的に学びます。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/codex-python-fast-api',
      },
      isRequired: true,
    },
  ],
  edges: [
    { from: 'python-pytest', to: 'flask-app' },
    { from: 'flask-app', to: 'gemini-flask' },
    { from: 'flask-app', to: 'fastapi-codex' },
  ],
}
```

### index.tsの最終更新

```typescript
// src/data/roadmaps/index.ts 最終形
import type { CourseId, RoadmapCourse } from './types'
import { beginnerCourse } from './beginner'
import { webCourse } from './web'
import { mobileCourse } from './mobile'
import { pythonCourse } from './python'

// コースID一覧（定数）
export const courseIds: CourseId[] = ['beginner', 'web', 'mobile', 'python']

// コースデータ
const courses: RoadmapCourse[] = [
  beginnerCourse,
  webCourse,
  mobileCourse,
  pythonCourse,
]

/**
 * すべてのコースを取得
 */
export function getAllCourses(): RoadmapCourse[] {
  return courses
}

/**
 * IDでコースを取得
 */
export function getCourseById(id: CourseId): RoadmapCourse | undefined {
  return courses.find((course) => course.id === id)
}

/**
 * デフォルトコースを取得（beginner）
 */
export function getDefaultCourse(): RoadmapCourse | undefined {
  return getCourseById('beginner')
}

/**
 * コースIDが有効かどうかを検証
 */
export function isValidCourseId(id: string): id is CourseId {
  return courseIds.includes(id as CourseId)
}

// 型の再エクスポート
export type {
  CourseId,
  NodeLinkType,
  DifficultyLevel,
  NodeCategory,
  RoadmapNodeLink,
  RoadmapNode,
  RoadmapEdge,
  RoadmapCourse,
} from './types'
```

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The course data shall have `id: 'python'`, `name: 'Python開発'`, `emoji: '🐍'`. |
| REQ-002 | The course data shall include 4 nodes (3 required + 1 optional). |
| REQ-003 | The course shall focus on Python/Flask/FastAPI development. |
| REQ-004 | The optional node (Gemini CLI × Flask) shall have `isRequired: false`. |

---

## ノード一覧

| Step | ID | Title | Difficulty | Category | isRequired |
|------|----|-------|------------|----------|------------|
| 1 | python-pytest | Claude Code × Python × pytest | beginner | intro | true |
| 2 | flask-app | Claude Code × Flask | intermediate | basic | true |
| - | gemini-flask | Gemini CLI × Flask マインドマップ | intermediate | optional | false |
| 3 | fastapi-codex | Codex × FastAPI | intermediate-advanced | practice | true |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/data/roadmaps/python.ts` が存在する
- [ ] **データ構造**: `RoadmapCourse`型に準拠
- [ ] **ノード数**: 4ノード（3必須 + 1選択）
- [ ] **エッジ数**: 3エッジ
- [ ] **index.ts更新**: `pythonCourse`がエクスポートされ、4コースすべて揃う
- [ ] **getAllCourses()**: 4コースを返す
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/data/roadmaps/__tests__/python.test.ts` を作成

```typescript
import { pythonCourse } from '../python'
import { getCourseById, getAllCourses } from '../index'

describe('Python Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(pythonCourse.id).toBe('python')
    })

    it('should have correct name', () => {
      expect(pythonCourse.name).toBe('Python開発')
    })

    it('should have correct emoji', () => {
      expect(pythonCourse.emoji).toBe('🐍')
    })
  })

  describe('nodes', () => {
    it('should have 4 nodes', () => {
      expect(pythonCourse.nodes).toHaveLength(4)
    })

    it('should have 3 required nodes', () => {
      const requiredNodes = pythonCourse.nodes.filter((n) => n.isRequired)
      expect(requiredNodes).toHaveLength(3)
    })

    it('should have 1 optional node', () => {
      const optionalNodes = pythonCourse.nodes.filter((n) => !n.isRequired)
      expect(optionalNodes).toHaveLength(1)
    })

    it('should have Python focused content', () => {
      const pyNodes = pythonCourse.nodes.filter(
        (n) =>
          n.title.includes('Python') ||
          n.title.includes('Flask') ||
          n.title.includes('FastAPI')
      )
      expect(pyNodes.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('edges', () => {
    it('should have 3 edges', () => {
      expect(pythonCourse.edges).toHaveLength(3)
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('python')
      expect(course).toBeDefined()
      expect(course?.id).toBe('python')
    })

    it('should be included in getAllCourses', () => {
      const courses = getAllCourses()
      expect(courses).toHaveLength(4)
      expect(courses.map((c) => c.id)).toContain('python')
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/python.test.ts` が成功する

### 統合テスト

- [ ] **全コーステスト**: `src/data/roadmaps/__tests__/all-courses.test.ts` を作成

```typescript
import { getAllCourses, getCourseById, courseIds } from '../index'

describe('All Courses Integration', () => {
  it('should have 4 courses', () => {
    const courses = getAllCourses()
    expect(courses).toHaveLength(4)
  })

  it('should have all courseIds retrievable', () => {
    courseIds.forEach((id) => {
      const course = getCourseById(id)
      expect(course).toBeDefined()
      expect(course?.id).toBe(id)
    })
  })

  it('should have unique course IDs', () => {
    const courses = getAllCourses()
    const ids = courses.map((c) => c.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have all courses with valid structure', () => {
    const courses = getAllCourses()
    courses.forEach((course) => {
      expect(course.id).toBeTruthy()
      expect(course.name).toBeTruthy()
      expect(course.emoji).toBeTruthy()
      expect(course.nodes.length).toBeGreaterThan(0)
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/all-courses.test.ts` が成功する

### UI確認（Chrome DevTools MCP）

1. **Chrome DevTools MCPで確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap?course=python` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でページ構造を確認
   - [ ] Python開発タブがアクティブになっていることを確認
   - [ ] 4つのノードが表示されていることを確認
   - [ ] Gemini CLI × Flaskが「選択」バッジ付きで表示されていることを確認

2. **全コースの動作確認**:
   - [ ] 各タブ（beginner, web, mobile, python）をクリックして、コースが切り替わることを確認
   - [ ] 各コースで正しいノード数が表示されることを確認

---

## 次のチケット

→ `11-roadmap-banner.md`（RoadmapBanner - クーポンページ用バナー）
