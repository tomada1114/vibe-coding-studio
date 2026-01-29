/**
 * next.config.mjs サンプル設定
 *
 * 移行先のNext.jsプロジェクトに以下の設定を追加してください。
 */

import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Markdownファイルをページとして認識させる
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],

  // 必要に応じて画像の外部ドメインを設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/**',
      },
    ],
  },
}

// withMarkdoc と withSearch をチェーンして適用
// schemaPath は Markdoc のカスタムノード・タグ定義の場所
export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
)
