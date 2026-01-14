/**
 * Category Configuration
 *
 * Manages category display names and icons.
 * Supports two icon types:
 * - Devicon: For programming languages
 * - Emoji: For non-programming categories
 */

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

const PROGRAMMING_CATEGORIES: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  vue: "Vue.js",
  angular: "Angular",
  svelte: "Svelte",
  nextjs: "Next.js",
  python: "Python",
  java: "Java",
  ruby: "Ruby",
  rails: "Ruby on Rails",
  php: "PHP",
  csharp: "C#",
  html: "HTML",
  css: "CSS",
  nodejs: "Node.js",
  git: "Git",
  docker: "Docker",
}

const DEVICON_MAPPING: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  react: "react",
  vue: "vuejs",
  angular: "angularjs",
  svelte: "svelte",
  nextjs: "nextjs",
  python: "python",
  java: "java",
  ruby: "ruby",
  rails: "rails",
  php: "php",
  csharp: "csharp",
  html: "html5",
  css: "css3",
  nodejs: "nodejs",
  git: "git",
  docker: "docker",
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
  return category in PROGRAMMING_CATEGORIES && category in DEVICON_MAPPING
}

export function getDeviconSlug(category: string): string | undefined {
  return DEVICON_MAPPING[category]
}

export function getCategoryIcon(
  category: string,
  size: IconSize = "sm"
): CategoryIcon {
  if (isDeviconCategory(category)) {
    return {
      type: "devicon",
      value: DEVICON_MAPPING[category],
      size,
    }
  }

  const categoryInfo = NON_PROGRAMMING_CATEGORIES[category]

  if (!categoryInfo) {
    // eslint-disable-next-line no-console
    console.warn(`[Blog] Unknown category "${category}". Using fallback emoji.`)
  }

  return {
    type: "emoji",
    value: categoryInfo?.emoji || "📌",
    size,
  }
}

export function getCategoryInfo(
  category: string,
  iconSize: IconSize = "sm"
): CategoryInfo {
  const icon = getCategoryIcon(category, iconSize)

  let name: string
  if (isDeviconCategory(category)) {
    const configuredName = PROGRAMMING_CATEGORIES[category]
    if (!configuredName) {
      // eslint-disable-next-line no-console
      console.warn(`[Blog] Unknown programming category "${category}".`)
    }
    name = configuredName || category
  } else {
    const categoryInfo = NON_PROGRAMMING_CATEGORIES[category]
    if (!categoryInfo) {
      // eslint-disable-next-line no-console
      console.warn(`[Blog] Unknown category "${category}".`)
    }
    name = categoryInfo?.name || category
  }

  return {
    name,
    icon,
  }
}
