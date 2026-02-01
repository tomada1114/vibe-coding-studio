import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Description,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../fieldset"

describe("Fieldset", () => {
  it("renders a fieldset element", () => {
    render(<Fieldset data-testid="fieldset">Content</Fieldset>)
    const el = screen.getByTestId("fieldset")
    expect(el).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Fieldset data-testid="fieldset" className="custom">
        Content
      </Fieldset>
    )
    expect(screen.getByTestId("fieldset")).toHaveClass("custom")
  })
})

describe("Legend", () => {
  it("renders with text styling", () => {
    render(
      <Fieldset>
        <Legend data-testid="legend">My Legend</Legend>
      </Fieldset>
    )
    const legend = screen.getByTestId("legend")
    expect(legend).toBeInTheDocument()
    expect(legend).toHaveAttribute("data-slot", "legend")
  })

  it("supports custom className", () => {
    render(
      <Fieldset>
        <Legend data-testid="legend" className="custom">
          Legend
        </Legend>
      </Fieldset>
    )
    expect(screen.getByTestId("legend")).toHaveClass("custom")
  })
})

describe("FieldGroup", () => {
  it("renders a div with control data-slot", () => {
    render(<FieldGroup data-testid="group">Content</FieldGroup>)
    const group = screen.getByTestId("group")
    expect(group).toBeInTheDocument()
    expect(group.tagName).toBe("DIV")
    expect(group).toHaveAttribute("data-slot", "control")
  })

  it("applies spacing classes", () => {
    render(<FieldGroup data-testid="group">Content</FieldGroup>)
    expect(screen.getByTestId("group")).toHaveClass("space-y-8")
  })

  it("supports custom className", () => {
    render(
      <FieldGroup data-testid="group" className="custom">
        Content
      </FieldGroup>
    )
    expect(screen.getByTestId("group")).toHaveClass("custom", "space-y-8")
  })
})

describe("Field", () => {
  it("renders a field element", () => {
    render(<Field data-testid="field">Content</Field>)
    expect(screen.getByTestId("field")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Field data-testid="field" className="custom">
        Content
      </Field>
    )
    expect(screen.getByTestId("field")).toHaveClass("custom")
  })
})

describe("Label", () => {
  it("renders with label data-slot", () => {
    render(
      <Field>
        <Label data-testid="label">My Label</Label>
      </Field>
    )
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute("data-slot", "label")
  })

  it("supports custom className", () => {
    render(
      <Field>
        <Label data-testid="label" className="custom">
          Label
        </Label>
      </Field>
    )
    expect(screen.getByTestId("label")).toHaveClass("custom")
  })
})

describe("Description", () => {
  it("renders with description data-slot", () => {
    render(
      <Field>
        <Description data-testid="desc">Help text</Description>
      </Field>
    )
    const desc = screen.getByTestId("desc")
    expect(desc).toBeInTheDocument()
    expect(desc).toHaveAttribute("data-slot", "description")
  })

  it("supports custom className", () => {
    render(
      <Field>
        <Description data-testid="desc" className="custom">
          Help
        </Description>
      </Field>
    )
    expect(screen.getByTestId("desc")).toHaveClass("custom")
  })
})

describe("ErrorMessage", () => {
  it("renders with error data-slot", () => {
    render(
      <Field>
        <ErrorMessage data-testid="error">Error text</ErrorMessage>
      </Field>
    )
    const error = screen.getByTestId("error")
    expect(error).toBeInTheDocument()
    expect(error).toHaveAttribute("data-slot", "error")
  })

  it("supports custom className", () => {
    render(
      <Field>
        <ErrorMessage data-testid="error" className="custom">
          Error
        </ErrorMessage>
      </Field>
    )
    expect(screen.getByTestId("error")).toHaveClass("custom")
  })
})
