// コースID
export type CourseId = "web" | "mobile"

// リンクタイプ
export type NodeLinkType = "coupon" | "blog" | "video" | "external" | "zenn"

// 難易度レベル
export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "intermediate-advanced"
  | "advanced"

// ノードカテゴリ
export type NodeCategory = "intro" | "basic" | "practice" | "advanced"

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
  roadmapDescription: string
  difficulty: DifficultyLevel
  category: NodeCategory
  link: RoadmapNodeLink
}

// コース全体
export interface RoadmapCourse {
  id: CourseId
  name: string
  emoji: string
  description: string
  nodes: RoadmapNode[]
}
