/**
 * コース情報一元管理ファイル
 *
 * このファイルでは、プラットフォーム全体で使用されるコース情報を一元管理します。
 * コースの追加・削除・ステータス変更は、このファイルを編集するだけで
 * アプリケーション全体に反映されます。
 */

import { DEVICON_COLORS } from "@/lib/constants/icons"

/**
 * コース情報の型定義
 */
export interface CourseInfo {
  /** コースのスラッグ（URL等で使用） */
  slug: string
  /** コースの表示タイトル */
  title: string
  /** コースの短い説明（一覧ページ等で使用） */
  shortDescription: string
  /** コーストップページへのパス */
  topPagePath: string
  /** カテゴリ */
  category: "frontend" | "backend" | "data-ai"
  /** ソート順 */
  order: number
  /** 難易度レベル */
  level: "beginner" | "intermediate" | "advanced"
  /** テーマカラー情報 */
  colors: {
    text: string
    buttonBg: string
    buttonHover: string
  }
}

/**
 * 全コース情報の定義
 *
 * コースの追加・削除・ステータス変更は、この配列を編集してください
 */
export const ALL_COURSES: CourseInfo[] = [
  // === バックエンドコース ===
  {
    slug: "ruby",
    title: "Ruby",
    shortDescription: "初めてのプログラミングに最適",
    topPagePath: "/docs/ruby",
    category: "backend",
    order: 3,
    level: "beginner",
    colors: {
      text: DEVICON_COLORS.ruby?.text || "text-red-600",
      buttonBg: DEVICON_COLORS.ruby?.bg || "bg-red-600",
      buttonHover: DEVICON_COLORS.ruby?.hover || "hover:bg-red-500",
    },
  },
  {
    slug: "rails",
    title: "Ruby on Rails",
    shortDescription: "モダンなWebアプリ開発を学ぶ",
    topPagePath: "/docs/rails",
    category: "backend",
    order: 4,
    level: "intermediate",
    colors: {
      text: DEVICON_COLORS.rails?.text || "text-red-600",
      buttonBg: DEVICON_COLORS.rails?.bg || "bg-red-600",
      buttonHover: DEVICON_COLORS.rails?.hover || "hover:bg-red-500",
    },
  },
  {
    slug: "rspec",
    title: "RSpec",
    shortDescription: "テスト駆動開発の実践スキル",
    topPagePath: "/docs/rspec",
    category: "backend",
    order: 5,
    level: "advanced",
    colors: {
      text: DEVICON_COLORS.rspec?.text || "text-red-600",
      buttonBg: DEVICON_COLORS.rspec?.bg || "bg-red-600",
      buttonHover: DEVICON_COLORS.rspec?.hover || "hover:bg-red-500",
    },
  },

  // === データ分析・AIコース ===
  {
    slug: "python",
    title: "Python",
    shortDescription: "データサイエンス・AI開発の定番言語",
    topPagePath: "/docs/python",
    category: "data-ai",
    order: 1,
    level: "beginner",
    colors: {
      text: DEVICON_COLORS.python?.text || "text-blue-600",
      buttonBg: DEVICON_COLORS.python?.bg || "bg-blue-600",
      buttonHover: DEVICON_COLORS.python?.hover || "hover:bg-blue-500",
    },
  },

  // === フロントエンドコース ===
  {
    slug: "javascript",
    title: "JavaScript",
    shortDescription: "ブラウザとの対話を実現する言語",
    topPagePath: "/docs/javascript",
    category: "frontend",
    order: 1,
    level: "beginner",
    colors: {
      text: DEVICON_COLORS.javascript?.text || "text-yellow-600",
      buttonBg: DEVICON_COLORS.javascript?.bg || "bg-yellow-600",
      buttonHover: DEVICON_COLORS.javascript?.hover || "hover:bg-yellow-500",
    },
  },
  {
    slug: "typescript",
    title: "TypeScript",
    shortDescription: "型システムで開発効率とコード品質を向上",
    topPagePath: "/docs/typescript",
    category: "frontend",
    order: 2,
    level: "intermediate",
    colors: {
      text: DEVICON_COLORS.typescript?.text || "text-blue-600",
      buttonBg: DEVICON_COLORS.typescript?.bg || "bg-blue-600",
      buttonHover: DEVICON_COLORS.typescript?.hover || "hover:bg-blue-500",
    },
  },
  {
    slug: "react",
    title: "React",
    shortDescription: "モダンUI開発の定番ライブラリ",
    topPagePath: "/docs/react",
    category: "frontend",
    order: 3,
    level: "intermediate",
    colors: {
      text: DEVICON_COLORS.react?.text || "text-cyan-600",
      buttonBg: DEVICON_COLORS.react?.bg || "bg-cyan-600",
      buttonHover: DEVICON_COLORS.react?.hover || "hover:bg-cyan-500",
    },
  },
]

// ========================================
// ヘルパー関数群
// ========================================

export function getAllCourses(): CourseInfo[] {
  return [...ALL_COURSES]
}

export function getCoursesByCategory(
  category: CourseInfo["category"]
): CourseInfo[] {
  return ALL_COURSES.filter(course => course.category === category).sort(
    (a, b) => a.order - b.order
  )
}

export function getCourseBySlug(slug: string): CourseInfo | undefined {
  return ALL_COURSES.find(course => course.slug === slug)
}

export function getCourseTitle(slug: string): string {
  const course = getCourseBySlug(slug)
  return course?.title || slug
}

export function getCoursesForListPage() {
  return {
    frontendCourses: getCoursesByCategory("frontend"),
    backendCourses: getCoursesByCategory("backend"),
    dataAiCourses: getCoursesByCategory("data-ai"),
  }
}

export function getOtherCourses(currentSlug: string): CourseInfo[] {
  return ALL_COURSES.filter(course => course.slug !== currentSlug)
}
