"use client"

import { useState } from "react"

/**
 * 動画サムネイル（YouTube 配信画像）
 *
 * maxresdefault は動画によっては存在せず 404 になるため、
 * 読み込み失敗時は必ず存在する hqdefault にフォールバックする。
 * next/image は使わない（リモート画像の変換クォータを消費するため）。
 */
export function VideoThumbnail({
  videoId,
  className,
}: {
  videoId: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const quality = failed ? "hqdefault" : "maxresdefault"

  return (
    <img
      src={`https://i.ytimg.com/vi/${videoId}/${quality}.jpg`}
      alt=""
      width={1280}
      height={720}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
