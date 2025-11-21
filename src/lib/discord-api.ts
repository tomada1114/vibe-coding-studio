/**
 * Discord API クライアント
 *
 * Discord Guild（サーバー）情報を取得するためのユーティリティ
 */

/**
 * Discord Guild情報のレスポンス型
 */
interface DiscordGuild {
  id: string
  name: string
  approximate_member_count?: number
  approximate_presence_count?: number
}

/**
 * Discord APIエラー
 */
export class DiscordAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = "DiscordAPIError"
  }
}

/**
 * Discord Guild情報を取得
 *
 * @returns Guild情報（メンバー数を含む）
 * @throws {DiscordAPIError} API呼び出しに失敗した場合
 *
 * 必要な環境変数：
 * - DISCORD_BOT_TOKEN: Discord Bot Token
 * - DISCORD_GUILD_ID: Discord Guild（サーバー）ID
 */
export async function getDiscordMemberCount(): Promise<number> {
  const botToken = process.env.DISCORD_BOT_TOKEN
  const guildId = process.env.DISCORD_GUILD_ID

  // 環境変数チェック
  if (!botToken || !guildId) {
    // 環境変数が設定されていない場合はエラーをスローせず0を返す
    // eslint-disable-next-line no-console
    console.warn(
      "Discord Bot Token or Guild ID is not configured. Member count will be unavailable."
    )
    return 0
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        // 24時間キャッシュ（Discord APIのレート制限対策）
        next: {
          revalidate: 86400, // 24時間 = 86400秒
        },
      }
    )

    if (!response.ok) {
      throw new DiscordAPIError(
        `Discord API error: ${response.statusText}`,
        response.status
      )
    }

    const guild = (await response.json()) as DiscordGuild

    return guild.approximate_member_count ?? 0
  } catch (error) {
    // エラーログを出力するが、アプリケーションは継続
    // eslint-disable-next-line no-console
    console.error("Failed to fetch Discord member count:", error)

    if (error instanceof DiscordAPIError) {
      throw error
    }

    throw new DiscordAPIError(
      `Failed to fetch Discord member count: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
