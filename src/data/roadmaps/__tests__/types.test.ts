import type {
  CourseId,
  DifficultyLevel,
  NodeCategory,
  NodeLinkType,
  RoadmapCourse,
  RoadmapNode,
  RoadmapNodeLink,
} from "../types"

describe("Roadmap Types", () => {
  it("should accept valid CourseId values", () => {
    const validIds: CourseId[] = ["web", "mobile"]
    expect(validIds).toHaveLength(2)
  })

  it("should accept valid NodeLinkType values", () => {
    const validTypes: NodeLinkType[] = [
      "coupon",
      "blog",
      "video",
      "external",
      "zenn",
    ]
    expect(validTypes).toHaveLength(5)
  })

  it("should accept valid DifficultyLevel values", () => {
    const validLevels: DifficultyLevel[] = [
      "beginner",
      "intermediate",
      "intermediate-advanced",
      "advanced",
    ]
    expect(validLevels).toHaveLength(4)
  })

  it("should accept valid NodeCategory values", () => {
    const validCategories: NodeCategory[] = [
      "intro",
      "basic",
      "practice",
      "advanced",
    ]
    expect(validCategories).toHaveLength(4)
  })

  it("should accept valid RoadmapNodeLink", () => {
    const link: RoadmapNodeLink = {
      type: "coupon",
      url: "/coupons/test",
    }
    expect(link.type).toBe("coupon")
    expect(link.url).toBe("/coupons/test")
  })

  it("should accept valid RoadmapNodeLink with optional label", () => {
    const link: RoadmapNodeLink = {
      type: "external",
      url: "https://example.com",
      label: "External Link",
    }
    expect(link.label).toBe("External Link")
  })

  it("should accept valid RoadmapNode with roadmapDescription", () => {
    const node: RoadmapNode = {
      id: "test-node",
      title: "Test Title",
      description: "Test Description",
      roadmapDescription: "ロードマップ用の説明文",
      difficulty: "beginner",
      category: "intro",
      link: { type: "coupon", url: "/coupons/test" },
    }
    expect(node.id).toBe("test-node")
    expect(node.roadmapDescription).toBe("ロードマップ用の説明文")
  })

  it("should accept valid RoadmapCourse", () => {
    const course: RoadmapCourse = {
      id: "web",
      name: "Web開発",
      emoji: "🌐",
      description: "Test description",
      nodes: [],
    }
    expect(course.id).toBe("web")
  })
})
