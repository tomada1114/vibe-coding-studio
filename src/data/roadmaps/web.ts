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
      description:
        'プログラミング未経験からスタート。React・Next.jsで5つのアプリを作りながら、AI駆動開発の基礎を身につけます。',
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
      description:
        '決済機能を持つWebアプリケーションを開発。実践的なSaaS開発スキルを習得します。',
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
      description:
        'Stripe決済・Clerk認証・Supabaseを統合した本格SaaS開発を実践的に学べます。',
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
      description:
        'MCPツールを活用したNext.jsフルスタック開発。認証・データベースを含む本格的なWebアプリを構築。',
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
