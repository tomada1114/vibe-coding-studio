export type CourseId = "web" | "mobile"

export type NodeLinkType = "coupon" | "blog" | "video" | "external" | "zenn"

export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "intermediate-advanced"
  | "advanced"

export type NodeCategory = "intro" | "basic" | "practice" | "advanced"

export interface RoadmapNodeLink {
  type: NodeLinkType
  url: string
  /** 外部リンクの場合のラベル */
  label?: string
}

export interface RoadmapNode {
  id: string
  title: string
  description: string
  roadmapDescription: string
  difficulty: DifficultyLevel
  category: NodeCategory
  link: RoadmapNodeLink
}

export interface RoadmapCourse {
  id: CourseId
  name: string
  icon: string
  description: string
  nodes: RoadmapNode[]
}
