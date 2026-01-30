# Ticket #02: ロードマップデータ構造（index.ts）

## 概要

ロードマップデータのindex.tsとエクスポート構造を作成する。データローダー関数を実装し、各コースデータを一元管理する基盤を構築する。

## 前提チケット

- `01-type-definitions.md` ✅ 完了必須

## User Story

**As a** 開発者
**I want** ロードマップデータのindex.tsとエクスポート構造を使用したい
**So that** 各コースデータを一元管理できる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | ファイル構成の仕様 |
| `src/data/roadmaps/types.ts` | 型定義（#01で作成） |
| `src/lib/videos/video-data.ts` | 既存のデータローダーの参考 |

---

## 実装内容

### 作成ファイル

`src/data/roadmaps/index.ts`

### 実装コード

```typescript
import type { CourseId, RoadmapCourse } from './types'

// コースID一覧（定数）
export const courseIds: CourseId[] = ['beginner', 'web', 'mobile', 'python']

// コースデータ（後続チケットで追加）
const courses: RoadmapCourse[] = []

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
| REQ-001 | The index file shall export `getAllCourses()` function returning `RoadmapCourse[]`. |
| REQ-002 | The index file shall export `getCourseById(id: CourseId)` function returning `RoadmapCourse \| undefined`. |
| REQ-003 | The index file shall export `courseIds` constant as `CourseId[]` = `['beginner', 'web', 'mobile', 'python']`. |
| REQ-004 | The index file shall export `getDefaultCourse()` function returning beginner course. |
| REQ-005 | The index file shall export `isValidCourseId(id: string)` function for ID validation. |
| REQ-006 | The index file shall re-export all types from `types.ts`. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル作成**: `src/data/roadmaps/index.ts` が存在する
- [ ] **関数エクスポート**: 以下のすべてがexportされている
  - `getAllCourses()`
  - `getCourseById()`
  - `getDefaultCourse()`
  - `isValidCourseId()`
  - `courseIds`
- [ ] **型再エクスポート**: `types.ts` のすべての型が再エクスポートされている
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **ユニットテスト**: `src/data/roadmaps/__tests__/index.test.ts` を作成

```typescript
import {
  getAllCourses,
  getCourseById,
  getDefaultCourse,
  isValidCourseId,
  courseIds,
} from '../index'

describe('Roadmap Data Index', () => {
  describe('courseIds', () => {
    it('should contain 4 course IDs', () => {
      expect(courseIds).toHaveLength(4)
    })

    it('should contain expected course IDs', () => {
      expect(courseIds).toContain('beginner')
      expect(courseIds).toContain('web')
      expect(courseIds).toContain('mobile')
      expect(courseIds).toContain('python')
    })
  })

  describe('getAllCourses', () => {
    it('should return an array', () => {
      const courses = getAllCourses()
      expect(Array.isArray(courses)).toBe(true)
    })

    // 初期状態では空配列（データは後続チケットで追加）
    it('should return empty array initially', () => {
      const courses = getAllCourses()
      expect(courses).toHaveLength(0)
    })
  })

  describe('getCourseById', () => {
    it('should return undefined for non-existent course', () => {
      const course = getCourseById('beginner')
      // データ追加前はundefined
      expect(course).toBeUndefined()
    })
  })

  describe('getDefaultCourse', () => {
    it('should return undefined when no courses exist', () => {
      const course = getDefaultCourse()
      expect(course).toBeUndefined()
    })
  })

  describe('isValidCourseId', () => {
    it('should return true for valid course IDs', () => {
      expect(isValidCourseId('beginner')).toBe(true)
      expect(isValidCourseId('web')).toBe(true)
      expect(isValidCourseId('mobile')).toBe(true)
      expect(isValidCourseId('python')).toBe(true)
    })

    it('should return false for invalid course IDs', () => {
      expect(isValidCourseId('invalid')).toBe(false)
      expect(isValidCourseId('')).toBe(false)
      expect(isValidCourseId('BEGINNER')).toBe(false)
    })
  })
})
```

- [ ] **テスト実行**: `npm run test -- src/data/roadmaps/__tests__/index.test.ts` が成功する

### UI確認（Chrome DevTools MCP）

このチケットはUIを持たないため、Chrome DevTools MCPによる確認は不要。

---

## 次のチケット

→ `03-roadmap-tabs.md`（RoadmapTabs - コース選択タブ）
