/**
 * Devicon アイコン関連の定数・ユーティリティ
 */

/**
 * コースslug → Tailwindカラークラスのマッピング
 */
export const DEVICON_COLORS: Record<
  string,
  { text: string; bg: string; hover: string }
> = {
  ruby: { text: "text-red-600", bg: "bg-red-600", hover: "hover:bg-red-500" },
  rails: { text: "text-red-700", bg: "bg-red-700", hover: "hover:bg-red-600" },
  rspec: { text: "text-red-500", bg: "bg-red-500", hover: "hover:bg-red-400" },
  python: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-500",
  },
  javascript: {
    text: "text-yellow-500",
    bg: "bg-yellow-500",
    hover: "hover:bg-yellow-400",
  },
  typescript: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-500",
  },
  react: {
    text: "text-cyan-500",
    bg: "bg-cyan-500",
    hover: "hover:bg-cyan-400",
  },
  git: {
    text: "text-orange-600",
    bg: "bg-orange-600",
    hover: "hover:bg-orange-500",
  },
  terminal: {
    text: "text-gray-800",
    bg: "bg-gray-800",
    hover: "hover:bg-gray-700",
  },
  docker: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-500",
  },
}

/**
 * コースslug → Devicon名のマッピング
 */
export const DEVICON_MAPPING: Record<string, string> = {
  ruby: "ruby-original",
  rails: "rails-plain",
  rspec: "rspec-original",
  python: "python-original",
  javascript: "javascript-original",
  typescript: "typescript-original",
  react: "react-original",
  git: "git-original",
  terminal: "bash-original",
  docker: "docker-original",
}

/**
 * DeviconsのCDN URLを返す
 */
export function getDeviconUrl(slug: string): string {
  const iconName = DEVICON_MAPPING[slug]
  if (!iconName) {
    return ""
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName.split("-")[0]}/${iconName}.svg`
}
