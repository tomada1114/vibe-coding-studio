/**
 * コース情報一元管理ファイル
 *
 * このファイルでは、プラットフォーム全体で使用されるコース情報を一元管理します。
 * コースの追加・削除・ステータス変更は、このファイルを編集するだけで
 * アプリケーション全体に反映されます。
 */

import { DEVICON_COLORS } from '@/lib/constants/icons'

/**
 * コース情報の型定義
 */
export interface CourseInfo {
  /** コースのスラッグ（URL等で使用） */
  slug: string
  /** コースの表示タイトル */
  title: string
  /** コースの詳細説明 */
  description: string
  /** コースの短い説明（一覧ページ等で使用） */
  shortDescription: string
  /** コーストップページへのパス */
  topPagePath: string
  /** カテゴリ */
  category: 'foundations' | 'frontend' | 'backend' | 'infrastructure' | 'data-ai'
  /** ソート順 */
  order: number
  /** 公開ステータス */
  available: boolean
  /** 難易度レベル */
  level: 'beginner' | 'intermediate' | 'advanced'
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
  // === 基礎コース ===
  {
    slug: 'git',
    title: 'Git',
    description: 'バージョン管理システムGitの基本から実践的な使い方まで',
    shortDescription: 'チーム開発に必須のバージョン管理',
    topPagePath: '/docs/git',
    category: 'foundations',
    order: 1,
    available: false,
    level: 'beginner',
    colors: {
      text: DEVICON_COLORS.git?.text || 'text-orange-600',
      buttonBg: DEVICON_COLORS.git?.bg || 'bg-orange-600',
      buttonHover: DEVICON_COLORS.git?.hover || 'hover:bg-orange-500',
    },
  },
  {
    slug: 'terminal',
    title: 'ターミナル操作',
    description: 'コマンドラインインターフェースを使った効率的な開発環境の操作方法',
    shortDescription: '開発者に必須のコマンドライン操作',
    topPagePath: '/docs/terminal',
    category: 'foundations',
    order: 2,
    available: false,
    level: 'beginner',
    colors: {
      text: DEVICON_COLORS.terminal?.text || 'text-gray-800',
      buttonBg: DEVICON_COLORS.terminal?.bg || 'bg-gray-800',
      buttonHover: DEVICON_COLORS.terminal?.hover || 'hover:bg-gray-700',
    },
  },

  // === インフラストラクチャコース ===
  {
    slug: 'docker',
    title: 'Docker',
    description: 'アプリケーションの実行環境を統一するコンテナ技術',
    shortDescription: '開発環境の統一とデプロイ管理',
    topPagePath: '/docs/docker',
    category: 'infrastructure',
    order: 1,
    available: false,
    level: 'intermediate',
    colors: {
      text: DEVICON_COLORS.docker?.text || 'text-blue-600',
      buttonBg: DEVICON_COLORS.docker?.bg || 'bg-blue-600',
      buttonHover: DEVICON_COLORS.docker?.hover || 'hover:bg-blue-500',
    },
  },

  // === バックエンドコース ===
  {
    slug: 'ruby',
    title: 'Ruby',
    description: 'オブジェクト指向プログラミングの基本から実践的なRubyコーディングまで',
    shortDescription: '初めてのプログラミングに最適',
    topPagePath: '/docs/ruby',
    category: 'backend',
    order: 3,
    available: true,
    level: 'beginner',
    colors: {
      text: DEVICON_COLORS.ruby?.text || 'text-red-600',
      buttonBg: DEVICON_COLORS.ruby?.bg || 'bg-red-600',
      buttonHover: DEVICON_COLORS.ruby?.hover || 'hover:bg-red-500',
    },
  },
  {
    slug: 'rails',
    title: 'Ruby on Rails',
    description: 'Webアプリケーション開発のための実践的なRailsスキルを習得',
    shortDescription: 'モダンなWebアプリ開発を学ぶ',
    topPagePath: '/docs/rails',
    category: 'backend',
    order: 4,
    available: true,
    level: 'intermediate',
    colors: {
      text: DEVICON_COLORS.rails?.text || 'text-red-600',
      buttonBg: DEVICON_COLORS.rails?.bg || 'bg-red-600',
      buttonHover: DEVICON_COLORS.rails?.hover || 'hover:bg-red-500',
    },
  },
  {
    slug: 'rspec',
    title: 'RSpec',
    description: 'プロの開発現場で求められるテスト自動化スキルを体系的に学ぶ',
    shortDescription: 'テスト駆動開発の実践スキル',
    topPagePath: '/docs/rspec',
    category: 'backend',
    order: 5,
    available: true,
    level: 'advanced',
    colors: {
      text: DEVICON_COLORS.rspec?.text || 'text-red-600',
      buttonBg: DEVICON_COLORS.rspec?.bg || 'bg-red-600',
      buttonHover: DEVICON_COLORS.rspec?.hover || 'hover:bg-red-500',
    },
  },

  // === データ分析・AIコース ===
  {
    slug: 'python',
    title: 'Python',
    description: 'データ分析とAI開発の基盤となるPythonプログラミングの基本から応用まで',
    shortDescription: 'データサイエンス・AI開発の定番言語',
    topPagePath: '/docs/python',
    category: 'data-ai',
    order: 1,
    available: true,
    level: 'beginner',
    colors: {
      text: DEVICON_COLORS.python?.text || 'text-blue-600',
      buttonBg: DEVICON_COLORS.python?.bg || 'bg-blue-600',
      buttonHover: DEVICON_COLORS.python?.hover || 'hover:bg-blue-500',
    },
  },

  // === フロントエンドコース ===
  {
    slug: 'javascript',
    title: 'JavaScript',
    description: 'Webブラウザで動作するスクリプト言語の基本から応用まで',
    shortDescription: 'ブラウザとの対話を実現する言語',
    topPagePath: '/docs/javascript',
    category: 'frontend',
    order: 1,
    available: true,
    level: 'beginner',
    colors: {
      text: DEVICON_COLORS.javascript?.text || 'text-yellow-600',
      buttonBg: DEVICON_COLORS.javascript?.bg || 'bg-yellow-600',
      buttonHover: DEVICON_COLORS.javascript?.hover || 'hover:bg-yellow-500',
    },
  },
  {
    slug: 'typescript',
    title: 'TypeScript',
    description: '型安全性とコード品質を向上させるJavaScriptの拡張言語',
    shortDescription: '型システムで開発効率とコード品質を向上',
    topPagePath: '/docs/typescript',
    category: 'frontend',
    order: 2,
    available: true,
    level: 'intermediate',
    colors: {
      text: DEVICON_COLORS.typescript?.text || 'text-blue-600',
      buttonBg: DEVICON_COLORS.typescript?.bg || 'bg-blue-600',
      buttonHover: DEVICON_COLORS.typescript?.hover || 'hover:bg-blue-500',
    },
  },
  {
    slug: 'react',
    title: 'React',
    description: 'UI設計から状態管理まで、コンポーネントベースの開発手法を学ぶ',
    shortDescription: 'モダンUI開発の定番ライブラリ',
    topPagePath: '/docs/react',
    category: 'frontend',
    order: 3,
    available: true,
    level: 'intermediate',
    colors: {
      text: DEVICON_COLORS.react?.text || 'text-cyan-600',
      buttonBg: DEVICON_COLORS.react?.bg || 'bg-cyan-600',
      buttonHover: DEVICON_COLORS.react?.hover || 'hover:bg-cyan-500',
    },
  },
]

// ========================================
// ヘルパー関数群
// ========================================

export function getAllCourses(): CourseInfo[] {
  return [...ALL_COURSES]
}

export function getAvailableCourses(): CourseInfo[] {
  return ALL_COURSES.filter(course => course.available)
}

export function getComingSoonCourses(): CourseInfo[] {
  return ALL_COURSES.filter(course => !course.available)
}

export function getCoursesByCategory(
  category: CourseInfo['category']
): CourseInfo[] {
  return ALL_COURSES.filter(course => course.category === category)
}

export function getAvailableCoursesByCategory(
  category: CourseInfo['category']
): CourseInfo[] {
  return ALL_COURSES.filter(course => course.category === category && course.available).sort(
    (a, b) => a.order - b.order
  )
}

export function getComingSoonCoursesByCategory(
  category: CourseInfo['category']
): CourseInfo[] {
  return ALL_COURSES.filter(course => course.category === category && !course.available).sort(
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

export function isCourseAvailable(slug: string): boolean {
  const course = getCourseBySlug(slug)
  return course?.available || false
}

function sortByAvailabilityThenOrder(a: CourseInfo, b: CourseInfo): number {
  if (a.available !== b.available) {
    return a.available ? -1 : 1
  }
  return a.order - b.order
}

export function getCoursesForListPage() {
  const byCategory = (category: CourseInfo['category']) =>
    ALL_COURSES.filter(course => course.category === category).sort(sortByAvailabilityThenOrder)

  return {
    foundationsCourses: byCategory('foundations'),
    frontendCourses: byCategory('frontend'),
    backendCourses: byCategory('backend'),
    infrastructureCourses: byCategory('infrastructure'),
    dataAiCourses: byCategory('data-ai'),
  }
}

export function getOtherCourses(currentSlug: string): CourseInfo[] {
  return ALL_COURSES.filter(course => course.slug !== currentSlug)
}
