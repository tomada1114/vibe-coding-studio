import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Alert,
  AlertActions,
  AlertBody,
  AlertDescription,
  AlertTitle,
} from "../alert"

describe("Alert", () => {
  it("renders when open", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertTitle>Test Alert</AlertTitle>
      </Alert>
    )
    expect(screen.getByText("Test Alert")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <Alert open={false} onClose={() => {}}>
        <AlertTitle>Hidden Alert</AlertTitle>
      </Alert>
    )
    expect(screen.queryByText("Hidden Alert")).not.toBeInTheDocument()
  })

  it("renders children content", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description text")).toBeInTheDocument()
  })
})

describe("AlertTitle", () => {
  it("renders title text", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertTitle>My Title</AlertTitle>
      </Alert>
    )
    expect(screen.getByText("My Title")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertTitle className="custom">Title</AlertTitle>
      </Alert>
    )
    expect(screen.getByText("Title")).toHaveClass("custom")
  })
})

describe("AlertDescription", () => {
  it("renders description text", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertDescription>Help text</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Help text")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertDescription className="custom">Text</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Text")).toHaveClass("custom")
  })
})

describe("AlertBody", () => {
  it("renders a div with mt-4 class", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertBody data-testid="body">Body content</AlertBody>
      </Alert>
    )
    const body = screen.getByTestId("body")
    expect(body).toBeInTheDocument()
    expect(body.tagName).toBe("DIV")
    expect(body).toHaveClass("mt-4")
  })

  it("supports custom className", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertBody data-testid="body" className="custom">
          Content
        </AlertBody>
      </Alert>
    )
    expect(screen.getByTestId("body")).toHaveClass("custom", "mt-4")
  })
})

describe("AlertActions", () => {
  it("renders a div with flex layout", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertActions data-testid="actions">
          <button>OK</button>
        </AlertActions>
      </Alert>
    )
    const actions = screen.getByTestId("actions")
    expect(actions).toBeInTheDocument()
    expect(actions.tagName).toBe("DIV")
    expect(actions).toHaveClass("mt-6", "flex")
  })

  it("supports custom className", () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertActions data-testid="actions" className="custom">
          <button>OK</button>
        </AlertActions>
      </Alert>
    )
    expect(screen.getByTestId("actions")).toHaveClass("custom", "mt-6")
  })
})
