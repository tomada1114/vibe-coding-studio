/**
 * 技術スタックのロゴアイコン（Geist Grid）
 *
 * ロゴは Simple Icons（CC0-1.0）から必要なものだけを切り出した SVG スプライト
 * `public/icons/tech-stack.svg` を `<use>` で参照する。インライン SVG にすると
 * HTML と RSC ペイロードの両方にパスが載るため、キャッシュが効く静的ファイルに
 * 逃がしている。単色・`currentColor` のみで、ブランド色は使わない。
 *
 * Simple Icons に無い技術（AWS・RSpec・PHPUnit・Bugsnag・OpenAI・Slack）は
 * 頭文字のモノグラム（1px 罫線の正方形）で代用する。
 */

import { clsx } from "clsx"

/** `public/` からのパス */
export const TECH_ICON_SPRITE = "/icons/tech-stack.svg"

/** 技術名（辞書の表記そのまま）→ スプライトのシンボル ID */
export const TECH_ICON_SLUGS: Record<string, string> = {
  "Ruby on Rails": "rubyonrails",
  Python: "python",
  "PHP / Laravel": "laravel",
  "Node.js": "nodedotjs",
  ".NET": "dotnet",
  GraphQL: "graphql",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  TypeScript: "typescript",
  React: "react",
  "Next.js": "nextdotjs",
  "Vue.js": "vuedotjs",
  Redux: "redux",
  "Tailwind CSS": "tailwindcss",
  jQuery: "jquery",
  Terraform: "terraform",
  Ansible: "ansible",
  Docker: "docker",
  Nginx: "nginx",
  Linux: "linux",
  "GitHub Actions": "githubactions",
  CircleCI: "circleci",
  "GitLab CI": "gitlab",
  Jest: "jest",
  Datadog: "datadog",
  "Claude Code": "claude",
  Cursor: "cursor",
  "GitHub Copilot": "githubcopilot",
  "Claude API": "anthropic",
  MCP: "modelcontextprotocol",
  GitHub: "github",
  GitLab: "gitlab",
  Redmine: "redmine",
  Jira: "jira",
  Notion: "notion",
}

export function TechIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const slug = TECH_ICON_SLUGS[name]

  if (!slug) {
    return (
      <span
        aria-hidden="true"
        className={clsx(
          "inline-flex size-3 shrink-0 items-center justify-center border border-current font-mono text-[8px] leading-none",
          className
        )}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={clsx("size-3 shrink-0", className)}
    >
      <use href={`${TECH_ICON_SPRITE}#${slug}`} />
    </svg>
  )
}
