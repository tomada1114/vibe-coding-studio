import type { RoadmapCourse } from './types'

export const beginnerCourse: RoadmapCourse = {
  id: 'beginner',
  name: '完全初心者',
  emoji: '🚀',
  description: 'プログラミング未経験からClaude Codeマスターへ',
  nodes: [
    {
      id: 'vibe-coding-intro',
      title: 'Claude Code × Vibe Coding 入門',
      description:
        'プログラミング未経験からスタート。React・Next.jsで5つのアプリを作りながら、AI駆動開発の基礎を身につけます。',
      roadmapDescription:
        'AI駆動開発の第一歩。Claude Codeの使い方とReact・Next.jsの基礎を5つのアプリ開発を通じて学びます。',
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
        '入門の次はSaaS開発に挑戦。Stripe決済を組み込んだ実用的なアプリで、Webアプリ開発の流れを体験します。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-expenses-app',
      },
    },
    {
      id: 'mcp-mastery',
      title: 'MCP完全攻略',
      description: '5つの最新MCPツールで開発効率を劇的に向上させます。',
      roadmapDescription:
        'アプリ開発の経験を活かし、MCPツールで開発効率を飛躍的に高めます。Claude Codeの真価を引き出すステップです。',
      difficulty: 'intermediate',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-mcp-nextjs',
      },
    },
    {
      id: 'claude-code-customize',
      title: 'Claude Code カスタマイズガイド',
      description:
        'CLAUDE.md・カスタムコマンド・サブエージェント・MCPを駆使して、Claude Codeを自分だけの開発環境に仕上げます。',
      roadmapDescription:
        '総仕上げ。CLAUDE.md・カスタムコマンド・サブエージェントを駆使して、自分だけの最強開発環境を構築します。',
      difficulty: 'advanced',
      category: 'advanced',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-customize',
      },
    },
  ],
}
