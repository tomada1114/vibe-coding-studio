import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"

describe("Table", () => {
  it("renders a table element", () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const wrapper = screen.getByTestId("table")
    expect(wrapper).toBeInTheDocument()
    const table = wrapper.querySelector("table")
    expect(table).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <Table data-testid="table" className="custom">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByTestId("table")).toHaveClass("custom")
  })
})

describe("TableHead", () => {
  it("renders a thead element with styling", () => {
    render(
      <table>
        <TableHead data-testid="thead">
          <tr>
            <th>Header</th>
          </tr>
        </TableHead>
      </table>
    )
    const thead = screen.getByTestId("thead")
    expect(thead).toBeInTheDocument()
    expect(thead.tagName).toBe("THEAD")
    expect(thead).toHaveClass("text-zinc-500")
  })
})

describe("TableBody", () => {
  it("renders a tbody element", () => {
    render(
      <table>
        <TableBody data-testid="tbody">
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = screen.getByTestId("tbody")
    expect(tbody).toBeInTheDocument()
    expect(tbody.tagName).toBe("TBODY")
  })
})

describe("TableRow", () => {
  it("renders a tr element", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="tr">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    const tr = screen.getByTestId("tr")
    expect(tr).toBeInTheDocument()
    expect(tr.tagName).toBe("TR")
  })

  it("supports custom className", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="tr" className="custom">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    expect(screen.getByTestId("tr")).toHaveClass("custom")
  })
})

describe("TableHeader", () => {
  it("renders a th element", () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    )
    const th = screen.getByText("Name")
    expect(th).toBeInTheDocument()
    expect(th.tagName).toBe("TH")
    expect(th).toHaveClass("font-medium")
  })

  it("supports custom className", () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader className="custom">Name</TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    )
    expect(screen.getByText("Name")).toHaveClass("custom", "font-medium")
  })
})

describe("TableCell", () => {
  it("renders a td element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const td = screen.getByText("Data")
    expect(td).toBeInTheDocument()
    expect(td.tagName).toBe("TD")
  })

  it("supports custom className", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="custom">Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText("Data")).toHaveClass("custom")
  })
})

describe("Table with options", () => {
  it("renders with dense option", () => {
    render(
      <Table dense data-testid="table">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const td = screen.getByText("Cell")
    expect(td).toHaveClass("py-2.5")
  })

  it("renders with grid option", () => {
    render(
      <Table grid>
        <TableHead>
          <TableRow>
            <TableHeader>Header</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText("Header")).toHaveClass("border-l")
    expect(screen.getByText("Cell")).toHaveClass("border-l")
  })

  it("renders with striped option", () => {
    render(
      <Table striped>
        <TableBody>
          <TableRow data-testid="row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const row = screen.getByTestId("row")
    expect(row).toHaveClass("even:bg-zinc-950/2.5")
  })
})

describe("Table integration", () => {
  it("renders a complete table", () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("John")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
  })
})
