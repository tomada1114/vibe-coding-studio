/**
 * Discord API クライアントのテスト
 */

import { DiscordAPIError, getDiscordMemberCount } from "../discord-api"

describe("DiscordAPIError", () => {
  it("should create error with message and status code", () => {
    const error = new DiscordAPIError("Test error", 404)

    expect(error.message).toBe("Test error")
    expect(error.statusCode).toBe(404)
    expect(error.name).toBe("DiscordAPIError")
  })

  it("should create error without status code", () => {
    const error = new DiscordAPIError("Test error")

    expect(error.message).toBe("Test error")
    expect(error.statusCode).toBeUndefined()
    expect(error.name).toBe("DiscordAPIError")
  })
})

describe("getDiscordMemberCount", () => {
  const originalEnv = process.env
  const originalFetch = global.fetch

  beforeEach(() => {
    // 環境変数をリセット
    process.env = { ...originalEnv }
    // fetchをモック
    global.fetch = jest.fn()
  })

  afterEach(() => {
    // 元の環境変数とfetchを復元
    process.env = originalEnv
    global.fetch = originalFetch
  })

  it("should return 0 when DISCORD_BOT_TOKEN is missing", async () => {
    delete process.env.DISCORD_BOT_TOKEN
    process.env.DISCORD_GUILD_ID = "123456789"

    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {})

    const result = await getDiscordMemberCount()

    expect(result).toBe(0)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Discord Bot Token or Guild ID is not configured. Member count will be unavailable."
    )

    consoleWarnSpy.mockRestore()
  })

  it("should return 0 when DISCORD_GUILD_ID is missing", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    delete process.env.DISCORD_GUILD_ID

    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {})

    const result = await getDiscordMemberCount()

    expect(result).toBe(0)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Discord Bot Token or Guild ID is not configured. Member count will be unavailable."
    )

    consoleWarnSpy.mockRestore()
  })

  it("should return 0 when both environment variables are missing", async () => {
    delete process.env.DISCORD_BOT_TOKEN
    delete process.env.DISCORD_GUILD_ID

    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {})

    const result = await getDiscordMemberCount()

    expect(result).toBe(0)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Discord Bot Token or Guild ID is not configured. Member count will be unavailable."
    )

    consoleWarnSpy.mockRestore()
  })

  it("should return member count on successful API call", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const mockResponse = {
      ok: true,
      json: async () => ({
        id: "123456789",
        name: "Test Guild",
        approximate_member_count: 150,
      }),
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await getDiscordMemberCount()

    expect(result).toBe(150)
    expect(global.fetch).toHaveBeenCalledWith(
      "https://discord.com/api/v10/guilds/123456789?with_counts=true",
      expect.objectContaining({
        headers: {
          Authorization: "Bot test-token",
          "Content-Type": "application/json",
        },
      })
    )
  })

  it("should return 0 when approximate_member_count is undefined", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const mockResponse = {
      ok: true,
      json: async () => ({
        id: "123456789",
        name: "Test Guild",
        // approximate_member_count is missing
      }),
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await getDiscordMemberCount()

    expect(result).toBe(0)
  })

  it("should throw DiscordAPIError when API returns 401", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const mockResponse = {
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await expect(getDiscordMemberCount()).rejects.toThrow(DiscordAPIError)
    await expect(getDiscordMemberCount()).rejects.toThrow(
      "Discord API error: Unauthorized"
    )
  })

  it("should throw DiscordAPIError when API returns 404", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await expect(getDiscordMemberCount()).rejects.toThrow(DiscordAPIError)
    await expect(getDiscordMemberCount()).rejects.toThrow(
      "Discord API error: Not Found"
    )
  })

  it("should throw DiscordAPIError when API returns 500", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await expect(getDiscordMemberCount()).rejects.toThrow(DiscordAPIError)
    await expect(getDiscordMemberCount()).rejects.toThrow(
      "Discord API error: Internal Server Error"
    )

    consoleErrorSpy.mockRestore()
  })

  it("should throw DiscordAPIError on network error", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const networkError = new Error("Network error")
    ;(global.fetch as jest.Mock).mockRejectedValue(networkError)

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await expect(getDiscordMemberCount()).rejects.toThrow(DiscordAPIError)
    await expect(getDiscordMemberCount()).rejects.toThrow(
      "Failed to fetch Discord member count: Network error"
    )

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch Discord member count:",
      networkError
    )

    consoleErrorSpy.mockRestore()
  })

  it("should throw DiscordAPIError on non-Error exception", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"
    ;(global.fetch as jest.Mock).mockRejectedValue("String error")

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await expect(getDiscordMemberCount()).rejects.toThrow(DiscordAPIError)
    await expect(getDiscordMemberCount()).rejects.toThrow(
      "Failed to fetch Discord member count: Unknown error"
    )

    consoleErrorSpy.mockRestore()
  })

  it("should propagate DiscordAPIError from catch block", async () => {
    process.env.DISCORD_BOT_TOKEN = "test-token"
    process.env.DISCORD_GUILD_ID = "123456789"

    const mockResponse = {
      ok: false,
      status: 403,
      statusText: "Forbidden",
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await expect(getDiscordMemberCount()).rejects.toThrow(DiscordAPIError)

    try {
      await getDiscordMemberCount()
    } catch (error) {
      expect(error).toBeInstanceOf(DiscordAPIError)
      expect((error as DiscordAPIError).statusCode).toBe(403)
    }

    consoleErrorSpy.mockRestore()
  })
})
