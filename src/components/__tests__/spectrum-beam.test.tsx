import { render } from "@testing-library/react"
import { SpectrumBeam } from "../spectrum-beam"

describe("SpectrumBeam", () => {
  it("装飾要素として aria-hidden でレンダリングされる", () => {
    const { container } = render(<SpectrumBeam />)
    const beam = container.querySelector("[aria-hidden='true']")
    expect(beam).toBeInTheDocument()
  })

  it("スペクトラムグラデーションのクラスを持つ", () => {
    const { container } = render(<SpectrumBeam />)
    const beam = container.firstElementChild as HTMLElement
    expect(beam.className).toContain("bg-(image:--gradient-spectrum)")
  })

  it("デフォルトではアニメーションしない", () => {
    const { container } = render(<SpectrumBeam />)
    const beam = container.firstElementChild as HTMLElement
    expect(beam.className).not.toContain("animate-beam-draw")
  })

  it("animated 指定時に描画アニメーションと reduced-motion 対応クラスを持つ", () => {
    const { container } = render(<SpectrumBeam animated />)
    const beam = container.firstElementChild as HTMLElement
    expect(beam.className).toContain("animate-beam-draw")
    expect(beam.className).toContain("origin-left")
    expect(beam.className).toContain("motion-reduce:animate-none")
  })

  it("className を追加でマージできる", () => {
    const { container } = render(<SpectrumBeam className="h-px" />)
    const beam = container.firstElementChild as HTMLElement
    expect(beam.className).toContain("h-px")
  })
})
