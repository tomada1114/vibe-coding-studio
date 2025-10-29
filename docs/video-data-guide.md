# YouTube動画メタデータ作成ガイド

このガイドでは、新しいYouTube動画のメタデータファイルを作成する手順を説明します。

## 目次

1. [ファイル作成の基本フロー](#ファイル作成の基本フロー)
2. [ファイル命名規則](#ファイル命名規則)
3. [動画ID命名規則](#動画id命名規則)
4. [必須項目の記入](#必須項目の記入)
5. [オプション項目の記入](#オプション項目の記入)
6. [カスタムセクションの使用例](#カスタムセクションの使用例)
7. [共通データの参照方法](#共通データの参照方法)
8. [データ品質チェック](#データ品質チェック)
9. [トラブルシューティング](#トラブルシューティング)

---

## ファイル作成の基本フロー

1. サンプルファイルをコピー
2. 基本情報を編集
3. セクションを記入
4. 型チェック・テストを実行
5. データローダーに追加

---

## ファイル命名規則

### ファイル名の形式

```
video-XXX.ts
```

- `XXX`: 3桁のゼロ埋め連番（例: 001, 002, 003）
- 拡張子は必ず`.ts`（TypeScriptファイル）

### 例

```
src/data/videos/video-001.ts  ✅ 正しい
src/data/videos/video-002.ts  ✅ 正しい
src/data/videos/video-1.ts    ❌ ゼロ埋めなし
src/data/videos/video001.ts   ❌ ハイフンなし
src/data/videos/video-001.tsx ❌ 拡張子が誤り
```

---

## 動画ID命名規則

### ID命名の原則

動画IDは、ファイル内で明示的に定義します。ファイル名からの自動生成ではありません。

**重要**: 一度設定した動画IDは変更しないでください。IDがURLの一部となるため、変更すると外部リンクが切れます。

### ID形式の推奨

#### パターン1: シンプルな連番形式（推奨）

```typescript
id: "video-001"
```

- **利点**: シンプルで管理しやすい
- **欠点**: URLからコンテンツが推測できない

#### パターン2: URLフレンドリーな形式

```typescript
id: "nextjs-app-router-intro"
```

- **利点**: URLからコンテンツが推測できる、SEOに有利
- **欠点**: 命名の一貫性を保つのが難しい

### ID命名のルール

1. **小文字英数字とハイフンのみ使用**
   ```typescript
   id: "nextjs-app-router-intro"  ✅ 正しい
   id: "NextJS-App-Router-Intro"  ❌ 大文字を含む
   id: "nextjs_app_router_intro"  ❌ アンダースコア
   id: "nextjs app router intro"  ❌ スペース
   ```

2. **一意であること**
   - 他の動画と重複しない
   - `getAllVideos()`で重複チェック可能

3. **変更不可**
   - 一度設定したIDは変更しない
   - 変更するとURLが変わり、外部リンクが切れる

---

## 必須項目の記入

すべての動画で以下の項目は必須です。

### 基本情報

```typescript
export const video001: VideoMetadata = {
  // 動画ID（必須）
  id: "video-001",

  // 動画タイトル（必須）
  title: "Next.js App Routerで学ぶモダンWeb開発入門",

  // 公開日時（必須、ISO 8601形式）
  publishedAt: "2025-10-01T12:00:00+09:00",

  // YouTube動画URL（必須）
  videoUrl: "https://www.youtube.com/watch?v=example001",

  // ...以下、各セクション
}
```

#### publishedAtの形式

ISO 8601形式で記述します:

```typescript
publishedAt: "YYYY-MM-DDTHH:MM:SS+09:00"
```

例:
```typescript
publishedAt: "2025-10-01T12:00:00+09:00"  // 2025年10月1日 12:00（日本時間）
publishedAt: "2025-12-25T09:30:00+09:00"  // 2025年12月25日 09:30（日本時間）
```

### 冒頭セクション（必須）

動画の最初に表示される説明文です。3-5行程度が推奨です。

```typescript
opening: {
  lines: [
    "この動画では、Next.js 15のApp Routerについて基礎から学びます。",
    "Server ComponentsやServer Actionsなど、最新機能を実際に手を動かしながら理解していきましょう。",
    "ReactとTypeScriptの基本知識があれば、誰でも理解できる内容になっています。",
  ],
},
```

### 学べる内容セクション（必須）

動画で学べる内容を箇条書きで記載します。

```typescript
learningPoints: {
  title: "💡 この動画で学べること",
  items: [
    "✅ App Routerの基本概念とPages Routerとの違い",
    "✅ Server ComponentsとClient Componentsの使い分け",
    "✅ Server Actionsによるフォーム処理の実装方法",
    "✅ Next.js 15の新機能とベストプラクティス",
    "✅ 実践的なプロジェクト構造の設計方法",
  ],
},
```

### タイムスタンプセクション（必須）

動画のタイムスタンプを記載します。

```typescript
timestamps: {
  title: "⏰ タイムスタンプ",
  items: [
    { time: "00:00", label: "イントロダクション" },
    { time: "02:30", label: "App Routerの概要とPages Routerとの違い" },
    { time: "08:45", label: "Server ComponentsとClient Componentsの解説" },
    { time: "15:20", label: "実際にプロジェクトを作成してみる" },
    { time: "25:10", label: "Server Actionsでフォーム処理を実装" },
    { time: "35:00", label: "Next.js 15の新機能紹介" },
    { time: "42:15", label: "まとめと次のステップ" },
  ],
},
```

**時間形式**: `"MM:SS"`または`"HH:MM:SS"`

### タグ（必須）

動画に関連するハッシュタグを記載します。

```typescript
tags: ["#NextJS", "#React", "#AppRouter", "#TypeScript", "#WebDev"],
```

### 共通データ参照（必須）

SNSとエンゲージメントセクションは必須です。

```typescript
social: commonSections.social,
engagement: commonSections.engagement,
```

---

## オプション項目の記入

必要に応じて、以下のオプション項目を追加できます。

### 関連動画セクション（オプション）

```typescript
relatedVideos: {
  title: "📌 関連動画",
  videos: [
    {
      emoji: "🎬",
      title: "Next.js入門シリーズ #1",
      url: "https://www.youtube.com/watch?v=example001",
    },
    {
      emoji: "🎬",
      title: "React基礎講座",
      url: "https://www.youtube.com/watch?v=example002",
    },
  ],
},
```

### Udemy講座誘導セクション（オプション）

```typescript
udemyCourses: {
  title: "🚀 体系的に学びたい方へ",
  description: "この動画の内容をさらに深掘りしたUdemy講座を公開しています。",
  courses: [
    "Next.js完全ガイド - App Routerで作るモダンWebアプリ",
    "TypeScript実践講座 - 型安全なアプリ開発",
  ],
  cta: {
    text: "Udemy講座を見る（クーポンあり）",
    url: "https://www.udemy.com/course/example",
  },
},
```

### Discordコミュニティセクション（オプション）

```typescript
discordCommunity: commonSections.discordCommunity,
```

---

## カスタムセクションの使用例

動画ごとに独自のセクションを追加できます。

### テキストセクション

```typescript
customSections: [
  {
    type: "text",
    title: "📝 補足説明",
    content: "動画内で紹介したテンプレートは、以下のリポジトリで公開しています。\nぜひ実際に試してみてください！",
  },
],
```

### リストセクション

```typescript
customSections: [
  {
    type: "list",
    title: "👥 こんな方におすすめ",
    items: [
      "✅ Next.jsを初めて学ぶ方",
      "✅ Pages Routerから移行を検討している方",
      "✅ モダンなWeb開発の最新トレンドを知りたい方",
    ],
  },
],
```

### リンクセクション

```typescript
customSections: [
  {
    type: "links",
    title: "🔗 参考リンク",
    links: [
      {
        label: "Next.js公式ドキュメント",
        url: "https://nextjs.org/docs",
      },
      {
        label: "GitHub リポジトリ",
        url: "https://github.com/example/nextjs-app-router",
      },
    ],
  },
],
```

### 混合セクション

```typescript
customSections: [
  {
    type: "mixed",
    title: "🛠️ 環境構築",
    content: "動画で使用した環境は以下の通りです:",
    items: [
      "- Node.js: v20.x",
      "- Next.js: 15.4.4",
      "- TypeScript: 5.x",
    ],
    links: [
      {
        label: "Node.jsのインストール",
        url: "https://nodejs.org/",
      },
    ],
  },
],
```

---

## 共通データの参照方法

SNS、Discord、エンゲージメント文言は、共通データファイルから参照します。

### インポート

```typescript
import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"
```

### 参照

```typescript
export const video001: VideoMetadata = {
  // ...基本情報

  // 共通データを参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity, // オプション
  engagement: commonSections.engagement,
}
```

### 共通データの更新

共通データ（SNSアカウント、Discordコミュニティ情報など）を更新する場合は、以下のファイルを編集します:

```
src/data/shared/common-sections.ts
```

更新すると、すべての動画データに自動的に反映されます。

---

## データ品質チェック

動画データファイルを作成・編集したら、必ず以下のチェックを実行してください。

### 1. TypeScript型チェック

```bash
npm run type-check
```

エラーが出る場合:
- 必須項目が欠けていないか確認
- 型が正しいか確認（string, number, 配列など）
- プロパティ名のスペルミスがないか確認

### 2. テスト実行

```bash
npm test
```

テストが失敗する場合:
- 必須項目がすべて記入されているか確認
- URL形式が正しいか確認（https://で始まる）
- 日付形式が正しいか確認（ISO 8601形式）
- タイムスタンプ形式が正しいか確認（"MM:SS"または"HH:MM:SS"）

### 3. ビルドチェック

```bash
npm run build
```

ビルドが成功すれば、データは正しく登録されています。

### 4. 統合チェック（推奨）

```bash
npm run check:all
```

ESLint、Prettier、型チェック、テストをまとめて実行します。

---

## データローダーへの追加

新しい動画データファイルを作成したら、データローダーに追加する必要があります。

### 手順

1. `src/lib/videos/video-data.ts`を開く
2. 新しい動画データをimport
3. `allVideosData`配列に追加

### 例

```typescript
// src/lib/videos/video-data.ts

import { video001 } from "@/data/videos/video-001"
import { video002 } from "@/data/videos/video-002"
import { video003 } from "@/data/videos/video-003" // 新しい動画を追加
import type { VideoMetadata } from "@/types/video"

const allVideosData: VideoMetadata[] = [
  video001,
  video002,
  video003, // ここに追加
]
```

---

## トラブルシューティング

### 型エラー: "Property 'xxx' is missing"

**原因**: 必須項目が欠けています。

**解決方法**: エラーメッセージで指摘されたプロパティを追加してください。

```typescript
// ❌ エラー
export const video001: VideoMetadata = {
  id: "video-001",
  title: "タイトル",
  // publishedAt が欠けている
}

// ✅ 修正
export const video001: VideoMetadata = {
  id: "video-001",
  title: "タイトル",
  publishedAt: "2025-10-01T12:00:00+09:00", // 追加
}
```

### 型エラー: "Type 'string' is not assignable to type 'string[]'"

**原因**: 配列が必要な場所に文字列を指定しています。

**解決方法**: `[]`で囲んで配列にしてください。

```typescript
// ❌ エラー
tags: "#NextJS #React"

// ✅ 修正
tags: ["#NextJS", "#React"]
```

### テストエラー: "URL must start with https://"

**原因**: URLが`https://`で始まっていません。

**解決方法**: URLを`https://`で始まるように修正してください。

```typescript
// ❌ エラー
videoUrl: "http://www.youtube.com/watch?v=example"

// ✅ 修正
videoUrl: "https://www.youtube.com/watch?v=example"
```

### テストエラー: "Date format is invalid"

**原因**: 日付形式が正しくありません。

**解決方法**: ISO 8601形式（`YYYY-MM-DDTHH:MM:SS+09:00`）で記述してください。

```typescript
// ❌ エラー
publishedAt: "2025/10/01"

// ✅ 修正
publishedAt: "2025-10-01T12:00:00+09:00"
```

### ビルドエラー: "Module not found"

**原因**: データローダーに動画データを追加していません。

**解決方法**: `src/lib/videos/video-data.ts`に新しい動画データをimportして追加してください。

---

## まとめ

1. **ファイル作成**: サンプルをコピーして`video-XXX.ts`を作成
2. **ID設定**: 一意で変更しないIDを設定
3. **必須項目記入**: 基本情報、opening, learningPoints, timestamps, tags, social, engagement
4. **オプション項目記入**: 必要に応じて関連動画、Udemy講座、カスタムセクションを追加
5. **品質チェック**: `npm run check:all`で型チェック・テスト実行
6. **データローダー追加**: `video-data.ts`にimportと配列追加
7. **ビルド確認**: `npm run build`で最終確認

これで、新しいYouTube動画のメタデータファイルが完成です！
