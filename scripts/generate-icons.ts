/**
 * ロゴからサイトアイコンと OG 画像を生成するワンオフスクリプト
 * 実行: npx tsx scripts/generate-icons.ts
 */
import sharp from "sharp"

async function main() {
  // 32px favicon 級アイコン
  await sharp("public/vcs-logo-square-transparent.png")
    .resize(32, 32)
    .png()
    .toFile("src/app/icon.png")

  // 180px apple-touch-icon（白背景でフラット化）
  await sharp("public/vcs-logo-square-transparent.png")
    .resize(160, 160)
    .flatten({ background: "#ffffff" })
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: "#ffffff",
    })
    .png()
    .toFile("src/app/apple-icon.png")

  // 1200×630 OG 画像（白背景中央にワイドロゴ）
  const logo = await sharp("public/vcs-logo-wide-transparent.png")
    .resize({ width: 1000 })
    .png()
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([
      {
        input: logo,
        top: Math.round((630 - (logoMeta.height ?? 333)) / 2),
        left: Math.round((1200 - (logoMeta.width ?? 1000)) / 2),
      },
    ])
    .png()
    .toFile("public/og-image.png")

  // eslint-disable-next-line no-console
  console.log("generated icon.png / apple-icon.png / og-image.png")
}

main().catch(e => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})
