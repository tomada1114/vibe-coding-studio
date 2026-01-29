import type { RoadmapCourse } from './types'

export const pythonCourse: RoadmapCourse = {
  id: 'python',
  name: 'Python開発',
  emoji: '🐍',
  description: 'Python/FastAPI/Flaskでバックエンド開発',
  nodes: [
    {
      id: 'python-pytest',
      title: 'Claude Code × Python × pytest',
      description:
        'Pythonの基礎からpytestを使ったテスト駆動開発まで、AI駆動でPython開発を学びます。',
      difficulty: 'beginner',
      category: 'intro',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-python',
      },
      isRequired: true,
    },
    {
      id: 'flask-app',
      title: 'Claude Code × Flask',
      description:
        'Flaskを使ったWebアプリケーション開発。REST APIの基礎を習得します。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-flask',
      },
      isRequired: true,
    },
    {
      id: 'gemini-flask',
      title: 'Gemini CLI × Flask マインドマップ',
      description:
        'Google Gemini CLIとFlaskを組み合わせたAIアプリケーション開発。',
      difficulty: 'intermediate',
      category: 'optional',
      link: {
        type: 'coupon',
        url: '/coupons/gemini_cli_vibe_coding_mind_map',
      },
      isRequired: false,
    },
    {
      id: 'fastapi-codex',
      title: 'Codex × FastAPI',
      description:
        'FastAPIを使った高速APIサーバー開発。Codexを活用して効率的に学びます。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/codex-python-fast-api',
      },
      isRequired: true,
    },
  ],
  edges: [
    { from: 'python-pytest', to: 'flask-app' },
    { from: 'flask-app', to: 'gemini-flask' },
    { from: 'flask-app', to: 'fastapi-codex' },
  ],
}
