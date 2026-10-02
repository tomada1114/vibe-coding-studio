/**
 * 現地時刻の整形と時差計算（トップページの「拠点の現在時刻」用）
 *
 * Intl だけで計算し、タイムゾーンデータを自前で持たない。夏時間の切り替えも
 * 実行環境の ICU に任せる。
 */

/** 時差の文面。`{hours}` を時間数（絶対値）に置き換える */
export type TimeDifferenceTemplates = {
  ahead: string
  behind: string
  same: string
}

/** 指定タイムゾーンの時刻を 24 時間制・ゼロ埋めで返す（例: "09:41:12"） */
export function formatClock(
  date: Date,
  timeZone: string,
  { seconds = true }: { seconds?: boolean } = {}
): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
    hourCycle: "h23",
  }).format(date)
}

/** タイムゾーンの短い略称を返す（例: "MDT" / "MST"） */
export function getTimeZoneAbbreviation(date: Date, timeZone: string): string {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find(p => p.type === "timeZoneName")
  return part?.value ?? ""
}

/** その瞬間の UTC からのずれ（分）。東側が正 */
function getUtcOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find(p => p.type === type)?.value)

  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  )
  const wholeSeconds = Math.floor(date.getTime() / 1000) * 1000
  return Math.round((asUtc - wholeSeconds) / 60000)
}

/**
 * `viewer` から見た `target` の時刻の進み（時間）。
 * 例: 夏のデンバーは東京から見て -15。
 */
export function getHourDifference(
  date: Date,
  target: string,
  viewer: string
): number {
  return (
    (getUtcOffsetMinutes(date, target) - getUtcOffsetMinutes(date, viewer)) / 60
  )
}

/** 時差を文面に埋め込む */
export function describeTimeDifference(
  hours: number,
  templates: TimeDifferenceTemplates
): string {
  if (hours === 0) return templates.same
  const template = hours > 0 ? templates.ahead : templates.behind
  return template.replace("{hours}", String(Math.abs(hours)))
}
