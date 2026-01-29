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
      roadmapDescription:
        'モバイル開発の準備段階。Reactの基礎をClaude Codeで学び、React Nativeへの土台を作ります。',
      difficulty: 'beginner',
      category: 'intro',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-vibe-coding',
      },
    },
    {
      id: 'react-native-5apps',
      title: 'React Native × Expo（5アプリ）',
      description:
        '5つの実践的なアプリを作りながら、React Native/Expoの基礎を習得します。',
      roadmapDescription:
        'Reactの知識を活かしてモバイル開発へ。5つのアプリでReact Native/Expoの基礎を実践的に学びます。',
      difficulty: 'intermediate',
      category: 'basic',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-react-native-5apps',
      },
    },
    {
      id: 'expo-template',
      title: 'React Native × Expoテンプレート',
      description:
        '本格的なスマホアプリ開発のためのテンプレートを構築。認証・ナビゲーション・状態管理を含む。',
      roadmapDescription:
        '本格的なスマホアプリの開発基盤を構築。認証・ナビゲーション・状態管理を備えたテンプレートを作ります。',
      difficulty: 'intermediate-advanced',
      category: 'practice',
      link: {
        type: 'coupon',
        url: '/coupons/claude-code-expo-template',
      },
    },
  ],
  edges: [
    { from: 'vibe-coding-intro', to: 'react-native-5apps' },
    { from: 'react-native-5apps', to: 'expo-template' },
  ],
}
