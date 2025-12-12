import type { UdemyCoursesApiInfo } from "@/types/udemy-course-api"
import { NextResponse } from "next/server"

const BASE_URL = "https://www.vibecodingstudio.dev"

/**
 * Udemy講座API の説明情報を返すエンドポイント
 *
 * @example
 * GET /api/udemy-courses/info
 */
export async function GET() {
  const apiInfo: UdemyCoursesApiInfo = {
    name: "Udemy Courses API",
    description:
      "Vibe Coding Studioで扱っているUdemy講座の情報を取得するAPI。トピックでフィルタリングして関連講座を検索できます。",
    baseUrl: `${BASE_URL}/api/udemy-courses`,
    endpoints: [
      {
        path: "/api/udemy-courses",
        method: "GET",
        description:
          "講座一覧を取得します。クエリパラメータでトピックによるフィルタリングが可能です。",
        parameters: [
          {
            name: "topic",
            type: "string",
            required: false,
            description:
              "フィルタリングするトピックのスラッグ。/api/udemy-courses/topics で利用可能なトピック一覧を取得できます。例: claude-code, codex, nextjs",
          },
        ],
      },
      {
        path: "/api/udemy-courses/topics",
        method: "GET",
        description:
          "利用可能なトピック一覧を取得します。各トピックには該当講座数が含まれます。/couponsページのフィルタ種別と連動しています。",
      },
      {
        path: "/api/udemy-courses/info",
        method: "GET",
        description: "このAPIの説明情報を取得します（現在のエンドポイント）。",
      },
    ],
  }

  return NextResponse.json(apiInfo, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
