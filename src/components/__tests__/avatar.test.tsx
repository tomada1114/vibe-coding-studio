import { Avatar, AvatarButton } from "@/components/avatar"
import { render, screen } from "@testing-library/react"

// Mock TouchTarget
jest.mock("@/components/catalyst-button", () => ({
  TouchTarget: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="touch-target">{children}</span>
  ),
}))

describe("Avatar", () => {
  it("renders with image src", () => {
    const { container } = render(<Avatar src="/avatar.jpg" alt="User" />)

    const img = container.querySelector("img")
    expect(img).toHaveAttribute("src", "/avatar.jpg")
    expect(img).toHaveAttribute("alt", "User")
  })

  it("renders initials when no src", () => {
    render(<Avatar initials="JD" alt="John Doe" />)

    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders round by default", () => {
    const { container } = render(<Avatar initials="AB" />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("rounded-full")
  })

  it("renders square when square prop is true", () => {
    const { container } = render(<Avatar initials="AB" square />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain("--avatar-radius")
  })

  it("renders with data-slot attribute", () => {
    const { container } = render(<Avatar initials="X" />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute("data-slot", "avatar")
  })

  it("renders both initials and image when both provided", () => {
    const { container } = render(
      <Avatar src="/photo.jpg" initials="AB" alt="Test" />
    )

    const img = container.querySelector("img")
    const svg = container.querySelector("svg")
    expect(img).toBeInTheDocument()
    expect(svg).toBeInTheDocument()
  })

  it("sets aria-hidden on svg when no alt text", () => {
    const { container } = render(<Avatar initials="AB" />)

    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })

  it("renders title in svg when alt is provided", () => {
    render(<Avatar initials="AB" alt="Avatar Name" />)

    expect(screen.getByText("Avatar Name")).toBeInTheDocument()
  })
})

describe("AvatarButton", () => {
  it("renders as link when href is provided", () => {
    render(<AvatarButton href="/profile" initials="JD" />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/profile")
  })

  it("renders as button when no href", () => {
    render(<AvatarButton initials="JD" />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("renders round by default", () => {
    const { container } = render(<AvatarButton initials="X" />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("rounded-full")
  })

  it("renders square when square prop is true", () => {
    const { container } = render(<AvatarButton initials="X" square />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain("rounded-[20%]")
  })
})
