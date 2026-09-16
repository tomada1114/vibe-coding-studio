export interface UdemyCourse {
  id: string
  slug: string
  title: string
  description: string
  topics: string[]
  thumbnail: string
  url: string
}

export interface UdemyCourseTopic {
  slug: string
  name: string
  icon: string
  isLocal?: boolean
}
