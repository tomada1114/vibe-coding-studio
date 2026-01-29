import type { RoadmapCourse } from './types'

export const mobileCourse: RoadmapCourse = {
  id: 'mobile',
  name: 'スマホアプリ',
  emoji: '📱',
  description: 'React Native/Expoでクロスプラットフォーム開発',
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
      id: 'react-native-5apps',
      title: 'React Native × Expo（5アプリ）',
      description:
        '5つの実践的なアプリを作りながら、React Native/Expoの基礎を習得します。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-react-native-5apps',
      },
      isRequired: true,
    },
    {
      id: 'expo-template',
      title: 'React Native × Expoテンプレート',
      description:
        '本格的なスマホアプリ開発のためのテンプレートを構築。認証・ナビゲーション・状態管理を含む。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-expo-template',
      },
      isRequired: true,
    },
    {
      id: 'codex-react-native',
      title: 'Codex × React Native',
      description:
        'OpenAI Codexを活用したReact Native開発で、さらなる効率化を実現。',
      difficulty: 'intermediate',
      category: 'optional',
      link: {
        type: 'coupon',
        url: '/coupons/codex-react-native',
      },
      isRequired: false,
    },
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'react-native-5apps' },
    { from: 'react-native-5apps', to: 'expo-template' },
    { from: 'react-native-5apps', to: 'codex-react-native' },
  ],
}
