import { transformImageNode } from "../image-node"

type ImageTag = {
  name: string
  attributes: Record<string, unknown>
}

function transformImage(attributes: Record<string, unknown>): ImageTag {
  const fakeNode = {
    transformAttributes: () => attributes,
  }
  // Markdoc の transform シグネチャ (node, config)
  return transformImageNode(fakeNode, {}) as unknown as ImageTag
}

describe("Markdoc image ノード", () => {
  it("img タグに lazy/async 属性を付与する", () => {
    const tag = transformImage({ src: "/img/author/tomada.png", alt: "著者" })

    expect(tag.name).toBe("img")
    expect(tag.attributes.loading).toBe("lazy")
    expect(tag.attributes.decoding).toBe("async")
    expect(tag.attributes.alt).toBe("著者")
  })

  it("マニフェストに実寸がある画像には width/height を付与する（CLS防止）", () => {
    const tag = transformImage({ src: "/img/author/tomada.png", alt: "" })

    expect(tag.attributes.width).toBe(500)
    expect(tag.attributes.height).toBe(500)
  })

  it("相対パスの src は /img/ 配下に解決される", () => {
    const tag = transformImage({ src: "author/tomada.png", alt: "" })

    expect(tag.attributes.src).toBe("/img/author/tomada.png")
    expect(tag.attributes.width).toBe(500)
  })

  it("マニフェストに無い画像は寸法なしで出力する（現状維持）", () => {
    const tag = transformImage({ src: "/img/unknown/nonexistent.png", alt: "" })

    expect(tag.attributes.width).toBeUndefined()
    expect(tag.attributes.height).toBeUndefined()
    expect(tag.attributes.loading).toBe("lazy")
  })
})
