import { execFileSync } from "node:child_process"
import { fileURLToPath, pathToFileURL } from "node:url"

const configUrl = pathToFileURL(
  fileURLToPath(new URL("../../../next.config.mjs", import.meta.url))
).href

describe("legacy coupon redirects", () => {
  it("redirects the legacy index and detail paths permanently", async () => {
    const output = execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `import config from ${JSON.stringify(configUrl)}; process.stdout.write(JSON.stringify(await config.redirects()))`,
      ],
      { encoding: "utf8" }
    )
    const rules = JSON.parse(output) as Array<{
      source: string
      destination: string
      permanent: boolean
    }>

    expect(rules).toEqual(
      expect.arrayContaining([
        {
          source: "/coupons",
          destination: "/courses",
          permanent: true,
        },
        {
          source: "/coupons/:slug",
          destination: "/courses",
          permanent: true,
        },
      ])
    )
  })
})
