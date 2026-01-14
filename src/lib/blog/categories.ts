/**
 * Category Configuration
 *
 * Manages category display names and icons.
 * Supports two icon types:
 * - Devicon: For programming languages
 * - Emoji: For non-programming categories
 */

import { logBlogWarning } from "./logging"

export type IconSize = "sm" | "md" | "lg"

export type CategoryIcon = {
  type: "devicon" | "emoji"
  value: string
  size: IconSize
}

export interface CategoryInfo {
  name: string
  icon: CategoryIcon
}

interface ProgrammingCategory {
  displayName: string
  deviconSlug: string
}

const PROGRAMMING_CATEGORIES: Record<string, ProgrammingCategory> = {
  javascript: { displayName: "JavaScript", deviconSlug: "javascript" },
  typescript: { displayName: "TypeScript", deviconSlug: "typescript" },
  react: { displayName: "React", deviconSlug: "react" },
  vue: { displayName: "Vue.js", deviconSlug: "vuejs" },
  angular: { displayName: "Angular", deviconSlug: "angularjs" },
  svelte: { displayName: "Svelte", deviconSlug: "svelte" },
  nextjs: { displayName: "Next.js", deviconSlug: "nextjs" },
  python: { displayName: "Python", deviconSlug: "python" },
  java: { displayName: "Java", deviconSlug: "java" },
  ruby: { displayName: "Ruby", deviconSlug: "ruby" },
  rails: { displayName: "Ruby on Rails", deviconSlug: "rails" },
  php: { displayName: "PHP", deviconSlug: "php" },
  csharp: { displayName: "C#", deviconSlug: "csharp" },
  html: { displayName: "HTML", deviconSlug: "html5" },
  css: { displayName: "CSS", deviconSlug: "css3" },
  nodejs: { displayName: "Node.js", deviconSlug: "nodejs" },
  git: { displayName: "Git", deviconSlug: "git" },
  docker: { displayName: "Docker", deviconSlug: "docker" },
}

const NON_PROGRAMMING_CATEGORIES: Record<
  string,
  { name: string; emoji: string }
> = {
  programming: { name: "Programming", emoji: "💻" },
  tutorial: { name: "Tutorial", emoji: "📚" },
  news: { name: "News", emoji: "📰" },
  tips: { name: "Tips", emoji: "💡" },
  career: { name: "Career", emoji: "👔" },
  design: { name: "Design", emoji: "🎨" },
  tools: { name: "Tools", emoji: "🔧" },
  webdev: { name: "Web Dev", emoji: "🌐" },
  database: { name: "Database", emoji: "🗄️" },
  security: { name: "Security", emoji: "🔒" },
  general: { name: "General", emoji: "💻" },
}

export function isDeviconCategory(category: string): boolean {
  return category in PROGRAMMING_CATEGORIES
}

export function getDeviconSlug(category: string): string | undefined {
  return PROGRAMMING_CATEGORIES[category]?.deviconSlug
}

export function getCategoryIcon(
  category: string,
  size: IconSize = "sm"
): CategoryIcon {
  const programmingCategory = PROGRAMMING_CATEGORIES[category]
  if (programmingCategory) {
    return {
      type: "devicon",
      value: programmingCategory.deviconSlug,
      size,
    }
  }

  const nonProgrammingCategory = NON_PROGRAMMING_CATEGORIES[category]

  if (!nonProgrammingCategory) {
    logBlogWarning("UNKNOWN_CATEGORY_ICON", {
      category,
      fallback: "📌",
    })
  }

  return {
    type: "emoji",
    value: nonProgrammingCategory?.emoji || "📌",
    size,
  }
}

export function getCategoryInfo(
  category: string,
  iconSize: IconSize = "sm"
): CategoryInfo {
  const icon = getCategoryIcon(category, iconSize)

  // Determine display name (logging for unknown categories handled by getCategoryIcon)
  let name: string
  const programmingCategory = PROGRAMMING_CATEGORIES[category]
  if (programmingCategory) {
    name = programmingCategory.displayName
  } else {
    const nonProgrammingCategory = NON_PROGRAMMING_CATEGORIES[category]
    name = nonProgrammingCategory?.name || category
  }

  return {
    name,
    icon,
  }
}
