import { nodes as defaultNodes, Tag } from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import yaml from 'js-yaml'

import { DocsLayout } from '@/components/DocsLayout'
import { Fence } from '@/components/Fence'

let documentSlugifyMap = new Map()

// 日本語対応のカスタムslugify関数
function createCustomSlugify() {
  const standardSlugify = slugifyWithCounter()

  return function customSlugify(text) {
    // 日本語文字が含まれているかチェック（ひらがな、カタカナ、漢字など）
    if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/u.test(text)) {
      // 日本語を含む場合は、特殊文字を削除し、小文字化
      const safeText = text
        .trim()
        .toLowerCase() // 小文字に変換（英数字部分）
        .replace(/[（）()[\]{}「」『』、。,.<>?!:;"']/g, '') // 括弧などの特殊文字を削除
        .replace(/\s+/g, '-') // スペースをハイフンに変換
        .replace(/[^\w\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf-]/g, '') // 安全でない文字を削除

      return safeText
    }

    // 英語など他の言語の場合は標準のslugify処理を使用
    return standardSlugify(text)
  }
}

const nodes = {
  document: {
    ...defaultNodes.document,
    render: DocsLayout,
    transform(node, config) {
      // カスタムslugify関数を設定
      documentSlugifyMap.set(config, createCustomSlugify())

      return new Tag(
        this.render,
        {
          frontmatter: yaml.load(node.attributes.frontmatter),
          nodes: node.children,
        },
        node.transformChildren(config)
      )
    },
  },
  heading: {
    ...defaultNodes.heading,
    transform(node, config) {
      let slugify = documentSlugifyMap.get(config)
      let attributes = node.transformAttributes(config)
      let children = node.transformChildren(config)
      let text = children.filter(child => typeof child === 'string').join(' ')
      let id = attributes.id ?? slugify(text)

      return new Tag(`h${node.attributes.level}`, { ...attributes, id }, children)
    },
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th.attributes,
      scope: {
        type: String,
        default: 'col',
      },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
    },
  },
}

export default nodes
