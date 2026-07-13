import imageDimensions from "@/lib/docs/image-dimensions.json"
import { Tag } from "@markdoc/markdoc"

/**
 * Markdoc image ノードの transform
 *
 * docs のレッスン画像（~290箇所）に:
 * - loading="lazy" / decoding="async" を付与（初期ロード軽減）
 * - ビルド時生成のマニフェスト（image-dimensions.json）から
 *   width/height を付与して CLS を防止
 * マニフェストに無い画像は寸法なしで出力する（現状維持）。
 */
export function transformImageNode(node, config) {
  const attrs = node.transformAttributes(config)
  const src = attrs.src?.startsWith("/") ? attrs.src : `/img/${attrs.src}`
  const dims = imageDimensions[src] ?? {}

  return new Tag("img", {
    ...attrs,
    src,
    ...dims,
    loading: "lazy",
    decoding: "async",
  })
}
