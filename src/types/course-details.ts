/**
 * コース詳細ページで使用する型定義
 */

export interface CourseFeature {
  title: string
  description: string
}

export interface CourseProject {
  title: string
  tech: string
  description: string
}

export interface TargetAudienceItem {
  title: string
  points: string[]
}

export interface CourseDetails {
  title: string
  subtitle: string
  description: string
  projects: CourseProject[]
  features: CourseFeature[]
  targetAudience: TargetAudienceItem[]
  whatYouLearn: string[]
  requirements: string[]
}

export interface CourseMetadataConfig {
  courseId: string
  slug: string
  imagePath: string
  baseUrl?: string
  courseDetails: CourseDetails
}
