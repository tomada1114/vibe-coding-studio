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
      roadmapDescription:
        'Web開発の土台づくり。React・Next.jsの基礎をClaude Codeと一緒に5つのアプリで学びます。',
      difficulty: 'beginner',
      category: 'intro',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-vibe-coding',
      },
    },
    {
      id: 'expenses-app',
      title: 'Stripe サブスク型 家計簿アプリ',
      description:
        '決済機能を持つWebアプリケーションを開発。実践的なSaaS開発スキルを習得します。',
      roadmapDescription:
        '基礎を固めたら決済機能付きアプリに挑戦。SaaS開発の基本パターンを身につけます。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-expenses-app',
      },
    },
    {
      id: 'project-tracker',
      title: '作業時間管理アプリ【完全版】',
      description:
        'Stripe決済・Clerk認証・Supabaseを統合した本格SaaS開発を実践的に学べます。',
      roadmapDescription:
        'Stripe・Clerk・Supabaseを統合した本格SaaSに挑戦。実務レベルのWeb開発スキルを習得します。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-project-tracker',
      },
    },
    {
      id: 'mcp-nextjs',
      title: 'MCP × Next.js + Clerk + Supabase',
      description:
        'MCPツールを活用したNext.jsフルスタック開発。認証・データベースを含む本格的なWebアプリを構築。',
      roadmapDescription:
        'MCPツールでNext.jsフルスタック開発を加速。認証・DB連携を含む本格Webアプリを効率的に構築します。',
      difficulty: 'advanced',
      category: 'advanced',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-mcp-nextjs',
      },
    },
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'expenses-app' },
    { from: 'expenses-app', to: 'project-tracker' },
    { from: 'project-tracker', to: 'mcp-nextjs' },
  ],
}
