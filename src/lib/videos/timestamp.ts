/**
 * タイムスタンプ文字列ユーティリティ
 */

/**
 * "MM:SS" または "HH:MM:SS" 形式のタイムスタンプを秒数に変換する
 *
 * @example
 * timestampToSeconds("12:34") // => 754
 * timestampToSeconds("1:02:03") // => 3723
 * @returns 変換できない形式の場合は 0
 */
export function timestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(":").map(part => Number.parseInt(part, 10))
  if (parts.some(Number.isNaN) || parts.length < 2 || parts.length > 3) {
    return 0
  }
  return parts.reduce((total, part) => total * 60 + part, 0)
}
