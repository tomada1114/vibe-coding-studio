import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { CourseDetailHero } from "../CourseDetailHero"

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  MockLink.displayName = "MockLink"
  return MockLink
})

// Mock lucide-react
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <span data-testid="arrow-left-icon">Arrow Left</span>,
}))

// Mock TOPIC_INFO
jest.mock("@/constants/coupon-courses", () => ({
  TOPIC_INFO: {
    typescript: {
      slug: "typescript",
      name: "TypeScript",
      icon: "/images/topics/typescript.svg",
      isLocal: true,
    },
    react: {
      slug: "react",
      name: "React",
      icon: "/images/topics/react.svg",
      isLocal: true,
    },
    nextjs: {
      slug: "nextjs",
      name: "Next.js",
      icon: "/images/topics/nextjs.svg",
      isLocal: true,
    },
  },
}))

describe("CourseDetailHero", () => {
  const defaultProps = {
    title: "Test Course Title",
    subtitle: "This is a test course subtitle",
    topics: ["typescript", "react"],
    slug: "test-course",
  }

  describe("Rendering", () => {
    it("renders course title correctly", () => {
      render(<CourseDetailHero {...defaultProps} />)
      expect(
        screen.getByRole("heading", { name: "Test Course Title" })
      ).toBeInTheDocument()
    })

    it("renders course subtitle correctly", () => {
      render(<CourseDetailHero {...defaultProps} />)
      expect(
        screen.getByText("This is a test course subtitle")
      ).toBeInTheDocument()
    })

    it("renders back link to coupons page", () => {
      render(<CourseDetailHero {...defaultProps} />)
      const backLink = screen.getByRole("link", { name: /クーポン一覧へ戻る/ })
      expect(backLink).toHaveAttribute("href", "/coupons")
    })

    it("renders course thumbnail image when slug is provided", () => {
      render(<CourseDetailHero {...defaultProps} />)
      const image = screen.getByAltText("Test Course Title")
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute("src", "/images/udemy/test-course.png")
    })

    it("does not render thumbnail image when slug is not provided", () => {
      const propsWithoutSlug = { ...defaultProps, slug: undefined }
      render(<CourseDetailHero {...propsWithoutSlug} />)
      expect(screen.queryByAltText("Test Course Title")).not.toBeInTheDocument()
    })
  })

  describe("Topic Tags as Clickable Links", () => {
    it("renders topic tags as links", () => {
      render(<CourseDetailHero {...defaultProps} />)
      const topicLinks = screen.getAllByRole("link")
      // 戻るリンク + トピックリンク2つ = 3つ
      expect(topicLinks.length).toBe(3)
    })

    it("renders topic tags with correct href to filtered coupons page", () => {
      render(<CourseDetailHero {...defaultProps} />)
      const typescriptLink = screen.getByRole("link", { name: "TypeScript" })
      const reactLink = screen.getByRole("link", { name: "React" })

      expect(typescriptLink).toHaveAttribute(
        "href",
        "/coupons?topic=typescript"
      )
      expect(reactLink).toHaveAttribute("href", "/coupons?topic=react")
    })

    it("renders all topic tags as clickable links", () => {
      const propsWithMultipleTopics = {
        ...defaultProps,
        topics: ["typescript", "react", "nextjs"],
      }
      render(<CourseDetailHero {...propsWithMultipleTopics} />)

      const typescriptLink = screen.getByRole("link", { name: "TypeScript" })
      const reactLink = screen.getByRole("link", { name: "React" })
      const nextjsLink = screen.getByRole("link", { name: "Next.js" })

      expect(typescriptLink).toHaveAttribute(
        "href",
        "/coupons?topic=typescript"
      )
      expect(reactLink).toHaveAttribute("href", "/coupons?topic=react")
      expect(nextjsLink).toHaveAttribute("href", "/coupons?topic=nextjs")
    })

    it("displays topic names from TOPIC_INFO", () => {
      render(<CourseDetailHero {...defaultProps} />)
      expect(screen.getByText("TypeScript")).toBeInTheDocument()
      expect(screen.getByText("React")).toBeInTheDocument()
    })
  })

  describe("Topic Tag Styling", () => {
    it("applies hover and transition styles to topic links", () => {
      render(<CourseDetailHero {...defaultProps} />)
      const typescriptLink = screen.getByRole("link", { name: "TypeScript" })

      expect(typescriptLink).toHaveClass("rounded-full")
      expect(typescriptLink).toHaveClass("bg-white")
      expect(typescriptLink).toHaveClass("shadow-lg")
      expect(typescriptLink).toHaveClass("transition-all")
      expect(typescriptLink).toHaveClass("hover:-translate-y-0.5")
      expect(typescriptLink).toHaveClass("hover:shadow-xl")
    })
  })

  describe("Edge Cases", () => {
    it("handles empty topics array", () => {
      const propsWithNoTopics = { ...defaultProps, topics: [] }
      render(<CourseDetailHero {...propsWithNoTopics} />)
      // 戻るリンクのみ
      const links = screen.getAllByRole("link")
      expect(links.length).toBe(1)
      expect(links[0]).toHaveAttribute("href", "/coupons")
    })

    it("handles single topic", () => {
      const propsWithSingleTopic = { ...defaultProps, topics: ["typescript"] }
      render(<CourseDetailHero {...propsWithSingleTopic} />)
      const typescriptLink = screen.getByRole("link", { name: "TypeScript" })
      expect(typescriptLink).toHaveAttribute(
        "href",
        "/coupons?topic=typescript"
      )
    })
  })
})
