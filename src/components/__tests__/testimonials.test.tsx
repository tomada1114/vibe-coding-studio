import { Testimonials } from "@/components/testimonials"
import { render, screen } from "@testing-library/react"

// Mock ArrowLongRightIcon
jest.mock("@heroicons/react/20/solid", () => ({
  ArrowLongRightIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="arrow-icon" {...props} />
  ),
}))

// Mock container
jest.mock("@/components/container", () => ({
  Container: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="container" className={className}>
      {children}
    </div>
  ),
}))

describe("Testimonials", () => {
  it("renders default heading and subheading", () => {
    render(<Testimonials />)

    expect(screen.getByText("What everyone is saying")).toBeInTheDocument()
    expect(screen.getByText("Trusted by professionals.")).toBeInTheDocument()
  })

  it("renders custom heading and subheading", () => {
    render(<Testimonials subheading="Custom Sub" heading="Custom Heading" />)

    expect(screen.getByText("Custom Sub")).toBeInTheDocument()
    expect(screen.getByText("Custom Heading")).toBeInTheDocument()
  })

  it("renders default testimonials", () => {
    render(<Testimonials />)

    const quotes = screen.getAllByText("コミュニティメンバー")
    expect(quotes.length).toBeGreaterThanOrEqual(3)
  })

  it("renders custom testimonials", () => {
    const customTestimonials = [
      {
        img: "/test.jpg",
        name: "Test User",
        title: "Engineer",
        quote: "Great product!",
      },
    ]

    render(<Testimonials testimonials={customTestimonials} />)

    expect(screen.getByText("Test User")).toBeInTheDocument()
    expect(screen.getByText("Great product!")).toBeInTheDocument()
  })

  it("renders call to action by default", () => {
    render(<Testimonials />)

    expect(screen.getByText("参加する")).toBeInTheDocument()
  })

  it("hides call to action when hideCallToAction is true", () => {
    render(<Testimonials hideCallToAction />)

    expect(screen.queryByText("参加する")).not.toBeInTheDocument()
  })

  it("renders navigation dots for each testimonial", () => {
    const testimonials = [
      { img: "/1.jpg", name: "A", title: "T1", quote: "Q1" },
      { img: "/2.jpg", name: "B", title: "T2", quote: "Q2" },
    ]

    render(<Testimonials testimonials={testimonials} />)

    const dots = screen.getAllByRole("button", {
      name: /Scroll to testimonial/i,
    })
    expect(dots).toHaveLength(2)
  })
})
