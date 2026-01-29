import type {
  CourseId,
  NodeLinkType,
  DifficultyLevel,
  NodeCategory,
  RoadmapNodeLink,
  RoadmapNode,
  RoadmapEdge,
  RoadmapCourse,
} from '../types'

describe('Roadmap Types', () => {
  it('should accept valid CourseId values', () => {
    const validIds: CourseId[] = ['beginner', 'web', 'mobile']
    expect(validIds).toHaveLength(3)
  })

  it('should accept valid NodeLinkType values', () => {
    const validTypes: NodeLinkType[] = [
      'coupon',
      'blog',
      'video',
      'external',
      'zenn',
    ]
    expect(validTypes).toHaveLength(5)
  })

  it('should accept valid DifficultyLevel values', () => {
    const validLevels: DifficultyLevel[] = [
      'beginner',
      'intermediate',
      'intermediate-advanced',
      'advanced',
    ]
    expect(validLevels).toHaveLength(4)
  })

  it('should accept valid NodeCategory values', () => {
    const validCategories: NodeCategory[] = [
      'intro',
      'basic',
      'practice',
      'advanced',
    ]
    expect(validCategories).toHaveLength(4)
  })

  it('should accept valid RoadmapNodeLink', () => {
    const link: RoadmapNodeLink = {
      type: 'coupon',
      url: '/coupons/test',
    }
    expect(link.type).toBe('coupon')
    expect(link.url).toBe('/coupons/test')
  })

  it('should accept valid RoadmapNodeLink with optional label', () => {
    const link: RoadmapNodeLink = {
      type: 'external',
      url: 'https://example.com',
      label: 'External Link',
    }
    expect(link.label).toBe('External Link')
  })

  it('should accept valid RoadmapNode with roadmapDescription', () => {
    const node: RoadmapNode = {
      id: 'test-node',
      title: 'Test Title',
      description: 'Test Description',
      roadmapDescription: 'ロードマップ用の説明文',
      difficulty: 'beginner',
      category: 'intro',
      link: { type: 'coupon', url: '/coupons/test' },
    }
    expect(node.id).toBe('test-node')
    expect(node.roadmapDescription).toBe('ロードマップ用の説明文')
  })

  it('should accept valid RoadmapEdge', () => {
    const edge: RoadmapEdge = {
      from: 'node-1',
      to: 'node-2',
    }
    expect(edge.from).toBe('node-1')
    expect(edge.to).toBe('node-2')
  })

  it('should accept valid RoadmapCourse', () => {
    const course: RoadmapCourse = {
      id: 'beginner',
      name: '完全初心者',
      emoji: '🚀',
      description: 'Test description',
      nodes: [],
      edges: [],
    }
    expect(course.id).toBe('beginner')
  })
})
