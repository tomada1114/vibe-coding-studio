# VideoMetadata Type Structure Reference

このドキュメントでは、YouTube動画メタデータの型構造（VideoMetadata）について詳細に説明します。

## 型定義の場所

```typescript
// src/types/video.ts
export interface VideoMetadata {
  // ...
}
```

## 基本情報フィールド（必須）

### id

- **型**: `string`
- **説明**: YouTube動画ID（URLの`v=`パラメータ部分）
- **例**: `"1-1NAB5jIjo"`, `"VHZNtl46CJw"`
- **注意**: ファイル名とexport名に使用されるため、正確に設定

### title

- **型**: `string`
- **説明**: 動画のタイトル（完全版）
- **例**: `"【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！日本語対応の国産ツールで簡単に始めるスペック駆動開発"`
- **ガイドライン**: YouTube上のタイトルと完全一致

### publishedAt

- **型**: `string` (ISO 8601形式)
- **説明**: 動画の公開日時
- **形式**: `YYYY-MM-DDTHH:mm:ss+09:00`
- **例**: `"2025-11-01T00:00:00+09:00"`
- **タイムゾーン**: 必ず`+09:00`（日本時間）を使用

### videoUrl

- **型**: `string`
- **説明**: YouTube動画のURL
- **形式**: `https://www.youtube.com/watch?v={動画ID}`
- **例**: `"https://www.youtube.com/watch?v=1-1NAB5jIjo"`

## 必須セクション

### opening

冒頭の説明文セクション。

```typescript
interface OpeningSection {
  lines: string[]
}
```

**フィールド**:
- `lines`: 冒頭の各行を配列で管理

**ガイドライン**:
- 2-5行程度が理想
- 各行は完結した文または短いフレーズ
- **空文字列を含めない**（テスト要件）
- 一文ごとに改行
- 箇条書きが必要な場合は中点「・」を使用

**Good Example**:
```typescript
opening: {
  lines: [
    "綺麗なチュートリアルじゃなく、リアルな開発プロセスをすべてお見せします！",
    "個人開発サイト「Vibe Coding Studio」にカスタムコマンド公開機能を追加する過程を、試行錯誤も含めてすべての思考プロセスを収録しました。",
    "実際にAI駆動開発を日常的にやっているエンジニアが、どう仕様を詰めて、どこでつまづいて、どう修正していくか。",
    "そういうリアルなAI駆動開発の思考プロセスを学び、ご自身の開発に活用していただければ幸いです。",
  ],
}
```

**Bad Example**:
```typescript
opening: {
  lines: [
    "文章1",
    "",  // ❌ 空文字列はNG
    "文章2",
  ],
}
```

### learningPoints

学べる内容セクション。

```typescript
interface LearningPointsSection {
  title: string
  items: string[]
}
```

**フィールド**:
- `title`: セクションタイトル
- `items`: 学べる内容の箇条書きリスト

**ガイドライン**:
- title: `"💡 この動画で学べること"` または `"💡 この動画の特徴"`
- items: 各項目は`✅`で始める
- 4-6項目が理想
- 具体的で測定可能な内容

**Example**:
```typescript
learningPoints: {
  title: "💡 この動画の特徴",
  items: [
    "✅ チュートリアルではなく、実際の開発プロセスをそのまま収録",
    "✅ cc-sdd（仕様駆動開発）を使った要件定義・設計の対話プロセス",
    "✅ Codexによる自動レビューでの指摘と軌道修正",
    "✅ スコープ調整や優先順位判断のリアルな判断",
  ],
}
```

### timestamps

タイムスタンプセクション。

```typescript
interface TimestampSection {
  title: string
  items: TimestampItem[]
}

interface TimestampItem {
  time: string  // "00:00"または"01:00:52"形式
  label: string
}
```

**フィールド**:
- `title`: セクションタイトル（通常は `"⏰ タイムライン"`）
- `items`: タイムスタンプのリスト

**ガイドライン**:
- time形式: `/^\d{1,2}:\d{2}(:\d{2})?$/`
  - `MM:SS` 形式（1時間未満）: `"00:00"`, `"12:34"`
  - `H:MM:SS` または `HH:MM:SS` 形式（1時間以上）: `"1:23:45"`, `"01:23:45"`
- label: 各タイムスタンプの説明
- 10-15項目程度が理想

**Example**:
```typescript
timestamps: {
  title: "⏰ タイムライン",
  items: [
    { time: "00:00", label: "はじめに" },
    { time: "01:50", label: "今回作る機能を整理" },
    { time: "08:11", label: "ブランチを作成" },
    { time: "01:00:52", label: "手動で動作確認" },  // 1時間超
    { time: "01:12:45", label: "まとめ" },
  ],
}
```

### tags

動画のタグ（ハッシュタグ）。

```typescript
tags: string[]
```

**ガイドライン**:
- ハッシュタグから`#`を除去
- 10-15個程度が理想
- カテゴリ別に整理：
  - ツール名: `ClaudeCode`, `CodexCLI`
  - 技術: `AI駆動開発`, `仕様駆動開発`
  - 言語・FW: `TypeScript`, `React`
  - カテゴリ: `個人開発`, `初心者向け`

**Example**:
```typescript
tags: [
  "AI駆動開発",
  "仕様駆動開発",
  "ccsdd",
  "ClaudeCode",
  "個人開発",
  "TypeScript",
]
```

## オプションセクション

### relatedVideos

関連動画セクション（重要）。

```typescript
interface RelatedVideosSection {
  title: string
  videos: RelatedVideo[]
}

interface RelatedVideo {
  title: string
  url: string
  emoji?: string  // オプション、通常は使用しない
}
```

**フィールド**:
- `title`: セクションタイトル
- `videos`: 関連動画のリスト

**ガイドライン**:
- title: `"📌 関連動画"` または `"🎬 関連動画で理解を深める"`
- 3-5本の動画を選定
- 選定基準は [reference-related-content.md](reference-related-content.md) を参照

**Example**:
```typescript
relatedVideos: {
  title: "📌 関連動画",
  videos: [
    {
      title: "【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！",
      url: "https://www.youtube.com/watch?v=HM0SLThgXqE",
    },
    {
      title: "【1時間で速習】Claude Code完全ガイド",
      url: "https://www.youtube.com/watch?v=Xr_HhLuzOy8",
    },
  ],
}
```

### udemyCourses

Udemy講座誘導セクション（重要）。

```typescript
interface UdemyCoursesSection {
  title: string
  description?: string
  courses?: string[]
  cta: {
    text: string
    url: string
  }
}
```

**フィールド**:
- `title`: セクションタイトル
- `description`: 講座の説明（オプション）
- `courses`: 学べる内容のリスト（オプション）
- `cta`: Call To Action（必須）
  - `text`: CTAテキスト
  - `url`: クーポンページURL

**ガイドライン**:
- title: `"🚀 体系的に[ツール名]を学びたい方へ"`
- courses: 4-5項目の具体的な学習内容
- cta.text: `"🎁 限定クーポンで最大90%OFF!"`
- cta.url: 動画テーマに応じたフィルター付きURL
  - Claude Code系: `https://www.vibecodingstudio.dev/coupons?topic=claude-code`
  - Codex系: `https://www.vibecodingstudio.dev/coupons?topic=codex`
  - 汎用: `https://www.vibecodingstudio.dev/coupons`

**Example**:
```typescript
udemyCourses: {
  title: "🚀 体系的にClaude Codeを学びたい方へ",
  description: "Udemy講座でClaude Codeを体系的にマスター！カスタムコマンドや仕様駆動開発など実践的なスキルを習得できます。",
  courses: [
    "カスタムコマンドの作成と活用方法",
    "仕様駆動開発（cc-sdd）の実践",
    "実践的なアプリ開発の全工程",
    "MCP連携で外部ツールを自在に操る",
    "コード品質を保ちながら爆速開発",
  ],
  cta: {
    text: "🎁 限定クーポンで最大90%OFF!",
    url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
  },
}
```

### customSections

カスタムセクション（柔軟な追加コンテンツ）。

```typescript
type CustomSection =
  | TextSection
  | ListSection
  | LinkSection
  | MixedSection

interface TextSection {
  type: "text"
  title: string
  content: string
}

interface ListSection {
  type: "list"
  title: string
  items: string[]
}

interface LinkSection {
  type: "links"
  title: string
  links: Array<{
    label: string
    url: string
  }>
}

interface MixedSection {
  type: "mixed"
  title: string
  content?: string
  items?: string[]
  links?: Array<{
    label: string
    url: string
  }>
}
```

**ガイドライン**:
- **URLを含む場合は `type: "text"` を使用**（推奨）
- content内で`\n`を使って改行
- URLは必ず別行に配置

**Example (text type)**:
```typescript
customSections: [
  {
    type: "text",
    title: "📝 関連記事・リソース",
    content: "公開したカスタムコマンド\nVibe Coding Studioの公式サイトで公開中\nhttps://www.vibecodingstudio.dev/claude-code/commands",
  },
]
```

**Example (mixed type)**:
```typescript
customSections: [
  {
    type: "mixed",
    title: "🚀 cc-sddとは？",
    content: "AWS Kiroに搭載されている仕様駆動開発の手法を実現する国産ツール。",
    items: [
      "日本語完全対応",
      "1コマンドでインストール完了",
      "AWS Kiroと同じワークフロー",
    ],
    links: [
      {
        label: "cc-sdd GitHub",
        url: "https://github.com/gotalab/cc-sdd",
      },
    ],
  },
]
```

## 共通セクション

以下のセクションは `commonSections` から参照します。

### social

SNS・コミュニティセクション。

```typescript
social: commonSections.social
```

### discordCommunity

Discordコミュニティセクション（オプション）。

```typescript
discordCommunity: commonSections.discordCommunity
```

### engagement

エンゲージメント促進セクション。

```typescript
engagement: commonSections.engagement
```

## 完全な例

```typescript
import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_1_1NAB5jIjo: VideoMetadata = {
  // 基本情報
  id: "1-1NAB5jIjo",
  title: "リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発の流れを公開",
  publishedAt: "2025-11-01T00:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=1-1NAB5jIjo",

  // 必須セクション
  opening: {
    lines: [
      "綺麗なチュートリアルじゃなく、リアルな開発プロセスをすべてお見せします！",
      "個人開発サイト「Vibe Coding Studio」にカスタムコマンド公開機能を追加する過程を収録しました。",
    ],
  },

  learningPoints: {
    title: "💡 この動画の特徴",
    items: [
      "✅ 実際の開発プロセスをそのまま収録",
      "✅ cc-sdd（仕様駆動開発）を使った要件定義",
    ],
  },

  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "01:50", label: "機能整理" },
    ],
  },

  tags: ["AI駆動開発", "仕様駆動開発", "ClaudeCode"],

  // オプションセクション
  relatedVideos: {
    title: "📌 関連動画",
    videos: [
      {
        title: "【仕様駆動開発】cc-sdd解説",
        url: "https://www.youtube.com/watch?v=HM0SLThgXqE",
      },
    ],
  },

  udemyCourses: {
    title: "🚀 体系的にClaude Codeを学びたい方へ",
    description: "実践的なスキルを習得できます。",
    courses: [
      "カスタムコマンドの作成",
      "仕様駆動開発の実践",
    ],
    cta: {
      text: "🎁 限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
    },
  },

  customSections: [
    {
      type: "text",
      title: "📝 関連リソース",
      content: "公開したカスタムコマンド\nhttps://www.vibecodingstudio.dev/claude-code/commands",
    },
  ],

  // 共通セクション
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
```

## チェックリスト

新しい動画データを作成する際のチェックリスト：

- [ ] **基本情報**
  - [ ] id, title, publishedAt, videoUrl を設定
  - [ ] publishedAt は ISO 8601 形式（`+09:00`）

- [ ] **必須セクション**
  - [ ] opening.lines は2-5行、空文字列なし
  - [ ] learningPoints.items は4-6項目、`✅`で開始
  - [ ] timestamps.items は正しい形式（`/^\d{1,2}:\d{2}(:\d{2})?$/`）
  - [ ] tags は10-15個

- [ ] **オプションセクション**
  - [ ] relatedVideos は3-5本（重要）
  - [ ] udemyCourses.cta.url は適切なフィルター（重要）
  - [ ] customSections は type: "text" でURLは別行

- [ ] **共通セクション**
  - [ ] social, discordCommunity, engagement を commonSections から参照

- [ ] **ファイル構成**
  - [ ] export名は `video_{動画ID（ハイフンをアンダースコアに）}`
  - [ ] commonSections をimport
  - [ ] VideoMetadata型をimport
