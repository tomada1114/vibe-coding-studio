/**
 * docs 画像の最適化スクリプト
 *
 * public/img 配下の PNG/JPEG を対象に:
 * 1. 幅 1600px 超の画像をリサイズ（PNG はパレット化圧縮も適用）
 * 2. 全画像の実寸を src/lib/docs/image-dimensions.json に出力
 *    （Markdoc の image ノードが width/height 付与に使用 → CLS 防止）
 *
 * 実行: npm run optimize:docs-images
 */
import fg from "fast-glob"
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const MAX_WIDTH = 1600
const MANIFEST_PATH = "src/lib/docs/image-dimensions.json"

async function main() {
  const manifest: Record<string, { width: number; height: number }> = {}
  const files = await fg("public/img/**/*.{png,jpg,jpeg}")
  files.sort()

  let resizedCount = 0
  for (const file of files) {
    const meta = await sharp(file).metadata()
    if (!meta.width || !meta.height) continue

    if (meta.width > MAX_WIDTH) {
      const pipeline = sharp(file).resize({ width: MAX_WIDTH })
      const buf = await (
        meta.format === "png"
          ? pipeline.png({ compressionLevel: 9, palette: true })
          : pipeline
      ).toBuffer()
      fs.writeFileSync(file, buf)
      resizedCount++
    }

    const finalMeta = await sharp(file).metadata()
    manifest["/" + path.relative("public", file)] = {
      width: finalMeta.width!,
      height: finalMeta.height!,
    }
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n")

  // eslint-disable-next-line no-console
  console.log(
    `optimize-docs-images: ${files.length} images scanned, ${resizedCount} resized, manifest -> ${MANIFEST_PATH}`
  )
}

main().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
