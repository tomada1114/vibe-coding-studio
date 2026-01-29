// コースID
export type CourseId = 'beginner' | 'web' | 'mobile' | 'python'

// リンクタイプ
export type NodeLinkType = 'coupon' | 'blog' | 'video' | 'external' | 'zenn'

// 難易度レベル
export type DifficultyLevel =
  | 'beginner'
  | 'intermediate'
  | 'intermediate-advanced'
  | 'advanced'

// ノードカテゴリ
export type NodeCategory =
  | 'intro'
  | 'basic'
  | 'practice'
  | 'advanced'
  | 'optional'

// ノードリンク
export interface RoadmapNodeLink {
  type: NodeLinkType
  url: string
  label?: string // 外部リンクの場合のラベル
}

// ロードマップノード
export interface RoadmapNode {
  id: string
  title: string
  description: string
  difficulty: DifficultyLevel
  category: NodeCategory
  link: RoadmapNodeLink
  isRequired: boolean
}

// エッジ（ノード間接続）
export interface RoadmapEdge {
  from: string
  to: string
}

// コース全体
export interface RoadmapCourse {
  id: CourseId
  name: string
  emoji: string
  description: string
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
}
