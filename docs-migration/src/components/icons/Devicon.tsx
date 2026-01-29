/**
 * Devicon コンポーネント
 *
 * このファイルでは、Deviconライブラリを使用したアイコン表示用の
 * React コンポーネントを定義しています。
 */

import { DEVICON_MAPPING, getDeviconUrl } from '@/lib/constants/icons'
import Image from 'next/image'

// サイズのバリエーション定義
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

/**
 * Devicon コンポーネントのプロパティ
 */
type DeviconProps = {
  /**
   * 技術スラグ (例: 'ruby', 'rails', 'react')
   */
  slug: string
  /**
   * アイコンのサイズ
   */
  size?: IconSize
  /**
   * 追加のCSSクラス
   */
  className?: string
  /**
   * アイコンの代替テキスト
   */
  alt?: string
}

/**
 * サイズに応じたTailwind CSSクラスのマッピング
 */
const sizeClasses: Record<IconSize, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
  '3xl': 'w-16 h-16',
  '4xl': 'w-20 h-20',
}

/**
 * Devicon アイコンを表示するコンポーネント
 *
 * 各技術スラグに対応するDeviconを表示します
 *
 * @example
 * ```tsx
 * // Ruby アイコンを表示
 * <Devicon slug="ruby" size="lg" />
 *
 * // Rails アイコンを表示 (カスタムクラス付き)
 * <Devicon slug="rails" size="xl" className="mr-2" />
 * ```
 */
export const Devicon = ({ slug, size = 'md', className = '', alt = '' }: DeviconProps) => {
  // スラグが存在しない場合はnullを返す
  if (!slug) return null

  // マッピングにスラグが存在するか確認
  const hasIcon = DEVICON_MAPPING[slug] !== undefined

  // アイコンが存在しない場合は代替表示
  if (!hasIcon) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-500 ${sizeClasses[size]} ${className}`}
      >
        <span className="text-xs font-medium">{slug.slice(0, 2).toUpperCase()}</span>
      </div>
    )
  }

  // アイコンのURLを取得
  const iconUrl = getDeviconUrl(slug)
  const altText = alt || `${slug} icon`

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      <Image
        src={iconUrl}
        alt={altText}
        className={className}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        unoptimized // SVGは最適化の必要がないため
      />
    </div>
  )
}
