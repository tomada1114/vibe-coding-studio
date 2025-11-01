import { video_1_1NAB5jIjo } from "@/data/videos/1-1NAB5jIjo"
import { video_1EQllS_3TJo } from "@/data/videos/1EQllS_3TJo"
import { video_1LP4ZAsU_UI } from "@/data/videos/1LP4ZAsU_UI"
import { video_1TJydjQM6eo } from "@/data/videos/1TJydjQM6eo"
import { video_4HJCCAfDGU4 } from "@/data/videos/4HJCCAfDGU4"
import { video_4MUadOFHy9M } from "@/data/videos/4MUadOFHy9M"
import { video_5ACcnosaEdw } from "@/data/videos/5ACcnosaEdw"
import { video__VhJCZtQXUc } from "@/data/videos/_VhJCZtQXUc"
import { video_d67qWFEdxCI } from "@/data/videos/d67qWFEdxCI"
import { video_ECRzrFNIWNM } from "@/data/videos/ECRzrFNIWNM"
import { video_fTONBWDWke0 } from "@/data/videos/fTONBWDWke0"
import { video_geZT1xTb06I } from "@/data/videos/geZT1xTb06I"
import { video_gXwS9dJewrU } from "@/data/videos/gXwS9dJewrU"
import { video_H5TGzM_PCW4 } from "@/data/videos/H5TGzM_PCW4"
import { video_HM0SLThgXqE } from "@/data/videos/HM0SLThgXqE"
import { video_pRHyMLH1bcU } from "@/data/videos/pRHyMLH1bcU"
import { video_qCFnfS5DAr8 } from "@/data/videos/qCFnfS5DAr8"
import { video_qrDUjfnlOiI } from "@/data/videos/qrDUjfnlOiI"
import { video_SO5qov2qTUE } from "@/data/videos/SO5qov2qTUE"
import { video_TDECUH62yYQ } from "@/data/videos/TDECUH62yYQ"
import { video_TfaNCNrYu8A } from "@/data/videos/TfaNCNrYu8A"
import { video_TWUpzNGp7fI } from "@/data/videos/TWUpzNGp7fI"
import { video_UqKd0dxLskU } from "@/data/videos/UqKd0dxLskU"
import { video_VHZNtl46CJw } from "@/data/videos/VHZNtl46CJw"
import { video_Xr_HhLuzOy8 } from "@/data/videos/Xr_HhLuzOy8"
import { video_xrRFnoOeC94 } from "@/data/videos/xrRFnoOeC94"
import { video_Y15kBuMhCO4 } from "@/data/videos/Y15kBuMhCO4"
import { video_Yy2alUag5I8 } from "@/data/videos/Yy2alUag5I8"
import { video_ZUr_Sp72q50 } from "@/data/videos/ZUr_Sp72q50"
import type { VideoMetadata } from "@/types/video"

/**
 * 動画データローダー
 *
 * すべての動画データを管理し、一覧取得・個別取得のAPIを提供します。
 * ビルド時にすべてのデータが静的にバンドルされます。
 */

/**
 * すべての動画データの配列
 * 新しい動画を追加する場合は、ここにimportとデータを追加してください。
 */
const allVideosData: VideoMetadata[] = [
  video_1_1NAB5jIjo,
  video_1LP4ZAsU_UI,
  video_1TJydjQM6eo,
  video_UqKd0dxLskU,
  video_Y15kBuMhCO4,
  video_SO5qov2qTUE,
  video_TWUpzNGp7fI,
  video_4MUadOFHy9M,
  video_qrDUjfnlOiI,
  video_5ACcnosaEdw,
  video_gXwS9dJewrU,
  video_4HJCCAfDGU4,
  video_pRHyMLH1bcU,
  video_1EQllS_3TJo,
  video_ECRzrFNIWNM,
  video_geZT1xTb06I,
  video_Yy2alUag5I8,
  video__VhJCZtQXUc,
  video_d67qWFEdxCI,
  video_fTONBWDWke0,
  video_H5TGzM_PCW4,
  video_HM0SLThgXqE,
  video_qCFnfS5DAr8,
  video_TDECUH62yYQ,
  video_TfaNCNrYu8A,
  video_Xr_HhLuzOy8,
  video_xrRFnoOeC94,
  video_VHZNtl46CJw,
  video_ZUr_Sp72q50,
]

/**
 * すべての動画データを取得する
 *
 * @returns すべての動画データの配列
 */
export function getAllVideos(): VideoMetadata[] {
  return allVideosData
}

/**
 * 公開日順(新しい順)でソートされた動画データを取得する
 *
 * @returns 公開日順でソートされた動画データの配列
 */
export function getLatestVideos(): VideoMetadata[] {
  return [...allVideosData].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

/**
 * 動画IDから動画データを取得する
 *
 * @param id - 動画ID
 * @returns 動画データ、存在しない場合はundefined
 */
export function getVideoById(id: string): VideoMetadata | undefined {
  return allVideosData.find(video => video.id === id)
}

/**
 * すべての動画IDを取得する(generateStaticParams用)
 *
 * @returns すべての動画IDの配列
 */
export function getAllVideoIds(): string[] {
  return allVideosData.map(video => video.id)
}
