import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../dialog"

describe("Dialog", () => {
  it("renders when open", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Test Dialog</DialogTitle>
      </Dialog>
    )
    expect(screen.getByText("Test Dialog")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <Dialog open={false} onClose={() => {}}>
        <DialogTitle>Hidden Dialog</DialogTitle>
      </Dialog>
    )
    expect(screen.queryByText("Hidden Dialog")).not.toBeInTheDocument()
  })

  it("renders children content", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description text</DialogDescription>
        <DialogBody>Body content</DialogBody>
      </Dialog>
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description text")).toBeInTheDocument()
    expect(screen.getByText("Body content")).toBeInTheDocument()
  })
})

describe("DialogTitle", () => {
  it("renders title text", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>My Title</DialogTitle>
      </Dialog>
    )
    expect(screen.getByText("My Title")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle className="custom">Title</DialogTitle>
      </Dialog>
    )
    expect(screen.getByText("Title")).toHaveClass("custom")
  })
})

describe("DialogDescription", () => {
  it("renders description text", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogDescription>Help text</DialogDescription>
      </Dialog>
    )
    expect(screen.getByText("Help text")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogDescription className="custom">Text</DialogDescription>
      </Dialog>
    )
    expect(screen.getByText("Text")).toHaveClass("custom")
  })
})

describe("DialogBody", () => {
  it("renders a div with mt-6 class", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogBody data-testid="body">Body content</DialogBody>
      </Dialog>
    )
    const body = screen.getByTestId("body")
    expect(body).toBeInTheDocument()
    expect(body.tagName).toBe("DIV")
    expect(body).toHaveClass("mt-6")
  })

  it("supports custom className", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogBody data-testid="body" className="custom">
          Content
        </DialogBody>
      </Dialog>
    )
    expect(screen.getByTestId("body")).toHaveClass("custom", "mt-6")
  })
})

describe("DialogActions", () => {
  it("renders a div with flex layout", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogActions data-testid="actions">
          <button>OK</button>
        </DialogActions>
      </Dialog>
    )
    const actions = screen.getByTestId("actions")
    expect(actions).toBeInTheDocument()
    expect(actions.tagName).toBe("DIV")
    expect(actions).toHaveClass("mt-8", "flex")
  })

  it("supports custom className", () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogActions data-testid="actions" className="custom">
          <button>OK</button>
        </DialogActions>
      </Dialog>
    )
    expect(screen.getByTestId("actions")).toHaveClass("custom", "mt-8")
  })
})
