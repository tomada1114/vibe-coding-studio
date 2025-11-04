# YouTube動画メタデータインデックスシステム

## 概要

YouTube動画メタデータのインデックスシステムは、既存の動画データとUdemy講座データを解析し、タグベースの関連動画検索とUdemy講座の自動選定を実現するシステムです。

### 目的

- 新しい動画作成時に関連動画を自動的に提案
- 動画内容に応じたUdemy講座の自動推薦
- 動画メタデータ作成時間の大幅な短縮

### 主要機能

1. **動画インデックス生成**: 全動画データを解析し、高速検索可能なインデックスを作成
2. **関連動画検索**: タグベースのスコアリングアルゴリズムで関連動画を自動選定
3. **Udemy講座選定**: トピックマッチングで最適な講座を推薦
4. **Git Hooks統合**: データ変更時にインデックスを自動再生成

## インデックス生成

### 初回セットアップ

プロジェクトをクローンした後、以下のコマンドを実行してインデックスを生成します。

```bash
# インデックス生成
npm run generate:indexes

# 生成されたインデックスの検証
npm run validate-indexes
```

### インデックスファイルの場所

生成されたインデックスファイルは以下の場所に保存されます。

```
src/data/indexes/
├── video-index.json           # 動画インデックス
└── udemy-course-index.json    # Udemy講座インデックス
```

### インデックスの内容

#### 動画インデックス (`video-index.json`)

```json
{
  "version": "1.0.0",
  "generatedAt": "2025-11-04T10:00:00Z",
  "videos": [
    {
      "id": "1-1NAB5jIjo",
      "title": "動画タイトル",
      "tags": ["ClaudeCode", "AI駆動開発", "TypeScript"],
      "relatedVideoIds": ["video2", "video3"],
      "udemyCourseIds": ["6691241"]
    }
  ]
}
```

#### Udemy講座インデックス (`udemy-course-index.json`)

```json
{
  "version": "1.0.0",
  "generatedAt": "2025-11-04T10:00:00Z",
  "courses": [
    {
      "courseId": "6691241",
      "title": "Claude Code × Vibe Coding",
      "topics": ["claude-code", "react", "nextjs"],
      "promotionUrl": "https://www.udemy.com/course/...",
      "description": "講座の説明"
    }
  ],
  "topicMapping": {
    "claude-code": [
      { "courseId": "6691241", "url": "/coupons?topic=claude-code" }
    ]
  }
}
```

## 関連動画検索の使い方

### 基本的な使い方

```typescript
import { findRelatedVideos } from '@/lib/videos/find-related-videos'

// 新しい動画のタグを指定
const tags = ['react', 'typescript', 'nextjs']

// 関連動画を検索（上位3-5本を取得）
const relatedVideos = findRelatedVideos(tags)

console.log(relatedVideos)
// [
//   { id: "video1", title: "関連動画1", score: 25 },
//   { id: "video2", title: "関連動画2", score: 20 },
//   { id: "video3", title: "関連動画3", score: 15 }
// ]
```

### 自分自身を除外する

```typescript
// 現在の動画IDを指定して、自分自身を結果から除外
const relatedVideos = findRelatedVideos(tags, 'current-video-id')
```

### スコアリングアルゴリズム

関連動画検索は以下のスコアリングロジックを使用します。

#### 1. 完全一致タグ: 10ポイント/タグ

入力タグと動画タグが完全に一致する場合、1タグあたり10ポイントが加算されます。

**例**:
```typescript
入力タグ: ['react', 'typescript', 'nextjs']
動画タグ: ['react', 'typescript', 'tailwind']

完全一致: 'react', 'typescript' → 10 × 2 = 20ポイント
```

#### 2. 部分一致タグ: 5ポイント/タグ

タグが部分的に一致する場合（大文字小文字を無視）、1タグあたり5ポイントが加算されます。

**例**:
```typescript
入力タグ: ['nextjs']
動画タグ: ['next-js']

部分一致: 'nextjs' と 'next-js' → 5ポイント
```

#### 3. タグ数類似性ボーナス: +2ポイント

入力タグの数と動画タグの数の差が±2以内の場合、2ポイントのボーナスが加算されます。

**例**:
```typescript
入力タグ: ['react', 'typescript', 'nextjs'] (3個)
動画タグ: ['react', 'typescript', 'tailwind', 'jest'] (4個)

差分: |3 - 4| = 1 ≤ 2 → +2ポイント
```

### スコアの計算例

```typescript
入力タグ: ['react', 'typescript', 'nextjs']
動画タグ: ['react', 'typescript', 'tailwind']

完全一致: 'react', 'typescript' → 10 × 2 = 20
部分一致: なし → 0
タグ数類似性: |3 - 3| = 0 ≤ 2 → +2

合計スコア: 20 + 0 + 2 = 22ポイント
```

## Udemy講座選定の使い方

### 基本的な使い方

```typescript
import { suggestUdemyCourses } from '@/lib/videos/suggest-udemy-courses'

// 新しい動画のタグを指定
const tags = ['claude-code', 'react', 'nextjs']

// 推薦講座を取得（UdemyCoursesSection形式）
const udemySection = suggestUdemyCourses(tags)

console.log(udemySection)
// {
//   title: "📚 関連講座",
//   description: "この動画に関連するUdemy講座をチェック！",
//   cta: {
//     text: "講座一覧を見る",
//     url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code"
//   },
//   courses: [
//     "Claude Code × Vibe Codingの使い方",
//     "React × TypeScriptの基礎"
//   ]
// }
```

### トピックマッチングアルゴリズム

Udemy講座選定は以下のスコアリングロジックを使用します。

#### 1. 完全一致トピック: 15ポイント/トピック

入力タグと講座トピックが完全に一致する場合、1トピックあたり15ポイントが加算されます。

**例**:
```typescript
入力タグ: ['claude-code', 'react', 'nextjs']
講座トピック: ['claude-code', 'react']

完全一致: 'claude-code', 'react' → 15 × 2 = 30ポイント
```

#### 2. 部分一致トピック: 7ポイント/トピック

タグとトピックが部分的に一致する場合、1トピックあたり7ポイントが加算されます。

**例**:
```typescript
入力タグ: ['nextjs']
講座トピック: ['next']

部分一致: 'nextjs' と 'next' → 7ポイント
```

#### 3. トピック数ボーナス: トピック数×1ポイント

講座のトピック数に応じてボーナスポイントが加算されます。

**例**:
```typescript
講座トピック: ['claude-code', 'react', 'typescript'] (3個)

トピック数ボーナス: 3 × 1 = 3ポイント
```

### URL生成ルール

推薦講座のURLは、マッチングしたトピックに応じて自動生成されます。

#### フィルター付きURL

複数のトピックが一致する場合、最もスコアの高いトピックでフィルタリングされたURLが生成されます。

```typescript
// 'claude-code' トピックが最もスコアが高い場合
url: "/coupons?topic=claude-code"
```

#### デフォルトURL

一致する講座が0件の場合、デフォルトの汎用クーポンページURLが返されます。

```typescript
url: "/coupons"
```

## Git Hooksのセットアップ

### 初回セットアップ

プロジェクトをクローンした後、以下のコマンドでGit Hooksをセットアップします。

```bash
npm run setup-hooks
```

このコマンドは、`scripts/pre-commit`ファイルを`.git/hooks/pre-commit`にコピーし、実行権限を付与します。

### 自動インデックス再生成

Git Hooksがセットアップされると、以下のファイルが変更された際に自動的にインデックスが再生成されます。

- `src/data/videos/*.ts` - 動画データファイル
- `src/constants/coupon-courses.ts` - Udemy講座データファイル

### コミット時の動作

```bash
# 動画データを変更してコミット
git add src/data/videos/new-video.ts
git commit -m "feat: 新しい動画データを追加"

# 🔍 ステージングされたファイルを確認中...
# 🔄 動画データまたはUdemy講座データが変更されています。
# 📦 インデックスを再生成中...
# ✅ インデックスの再生成が完了しました。
# 📝 インデックスファイルをステージングエリアに追加中...
# ✅ インデックスファイルがステージングエリアに追加されました。
# ✨ pre-commitフックの処理が完了しました。
```

### フックのバイパス

緊急時やテスト時にGit Hooksをバイパスしたい場合は、`--no-verify`フラグを使用します。

```bash
git commit -m "fix: 緊急修正" --no-verify
```

## トラブルシューティング

### インデックスファイルが見つからない

**症状**: `VideoIndexError: INDEX_NOT_FOUND`

**解決方法**:
```bash
# インデックスを手動で生成
npm run generate:indexes

# 生成されたファイルを確認
ls -la src/data/indexes/
```

### 不正なJSON形式

**症状**: `VideoIndexError: INVALID_JSON`

**解決方法**:
```bash
# インデックスファイルを削除して再生成
rm -rf src/data/indexes/
npm run generate:indexes
```

### Git Hooksが動作しない

**症状**: コミット時にインデックスが再生成されない

**解決方法**:
```bash
# Git Hooksを再セットアップ
npm run setup-hooks

# .git/hooks/pre-commitファイルの存在確認
ls -la .git/hooks/pre-commit

# 実行権限の確認
chmod +x .git/hooks/pre-commit
```

### インデックス生成が失敗する

**症状**: `npm run generate:indexes`がエラーで終了

**解決方法**:
```bash
# 動画データファイルの構文エラーを確認
npm run type-check

# Udemy講座データの構文エラーを確認
npm run lint

# エラーを修正後、再度実行
npm run generate:indexes
```

### 関連動画が0件

**症状**: `findRelatedVideos()`が空配列を返す

**原因**: 入力タグと一致する動画が存在しない

**解決方法**: システムはランダムに5本の動画を返す代替処理を実行します。タグの選定を見直すか、より汎用的なタグを使用してください。

### Udemy講座が推薦されない

**症状**: `suggestUdemyCourses()`がデフォルトURLのみを返す

**原因**: 入力タグと一致する講座トピックが存在しない

**解決方法**: より汎用的なタグを使用するか、講座データ（`src/constants/coupon-courses.ts`）にトピックを追加してください。

## コード例

### 完全な使用例

```typescript
import { findRelatedVideos } from '@/lib/videos/find-related-videos'
import { suggestUdemyCourses } from '@/lib/videos/suggest-udemy-courses'
import type { VideoMetadata } from '@/types/video'

/**
 * 新しい動画のメタデータを作成する
 */
function createVideoMetadata(
  id: string,
  title: string,
  tags: string[]
): Partial<VideoMetadata> {
  // 関連動画を検索
  const relatedVideos = findRelatedVideos(tags, id)

  // Udemy講座を推薦
  const udemyCourses = suggestUdemyCourses(tags)

  // VideoMetadata形式で返す
  return {
    id,
    title,
    tags,
    relatedVideos: {
      title: '📺 関連動画',
      videos: relatedVideos.map((v) => ({
        id: v.id,
        title: v.title,
      })),
    },
    udemyCourses,
  }
}

// 使用例
const newVideo = createVideoMetadata('new-video-id', '新しい動画のタイトル', [
  'react',
  'typescript',
  'nextjs',
])

console.log(newVideo)
```

### インデックスローダーの使用

```typescript
import { loadVideoIndex } from '@/lib/videos/video-index-loader'
import { loadUdemyCourseIndex } from '@/lib/videos/udemy-course-index-loader'

// 動画インデックスを読み込み
const videoIndex = loadVideoIndex()
console.log(`動画数: ${videoIndex.videos.length}`)

// Udemy講座インデックスを読み込み
const courseIndex = loadUdemyCourseIndex()
console.log(`講座数: ${courseIndex.courses.length}`)
```

## パフォーマンス

### 目標メトリクス

- **インデックス読み込み**: < 10ms
- **関連動画検索**: < 100ms（29本の動画）
- **Udemy講座選定**: < 50ms（14講座）
- **インデックス生成**: < 5秒（29本の動画 + 14講座）

### パフォーマンステスト

```bash
# パフォーマンステストを実行
npm run test -- --testNamePattern="パフォーマンス"
```

## 開発者向け情報

### ディレクトリ構造

```
src/lib/videos/
├── video-index-generator.ts        # 動画インデックス生成
├── udemy-course-index-generator.ts # Udemy講座インデックス生成
├── video-index-loader.ts           # 動画インデックス読み込み
├── udemy-course-index-loader.ts    # Udemy講座インデックス読み込み
├── find-related-videos.ts          # 関連動画検索
├── suggest-udemy-courses.ts        # Udemy講座選定
├── errors.ts                       # エラー定義
└── __tests__/                      # テストファイル
    ├── video-index-generator.test.ts
    ├── udemy-course-index-generator.test.ts
    ├── video-index-loader.test.ts
    ├── udemy-course-index-loader.test.ts
    ├── find-related-videos.test.ts
    ├── suggest-udemy-courses.test.ts
    └── git-hooks.test.ts

src/types/
├── video-index.ts                  # 動画インデックス型定義
└── udemy-course-index.ts           # Udemy講座インデックス型定義

scripts/
├── generate-indexes.ts             # インデックス生成スクリプト
├── validate-indexes.ts             # インデックス検証スクリプト
├── pre-commit                      # Git pre-commitフック
└── setup-hooks.js                  # Git Hooksセットアップ
```

### テストカバレッジ

現在のテストカバレッジは**80%以上**を達成しています。

```bash
# テストカバレッジレポートを生成
npm run test:coverage
```

### 新しい機能の追加

新しい機能を追加する場合は、TDD（テスト駆動開発）アプローチに従ってください。

1. **RED**: 失敗するテストを書く
2. **GREEN**: テストをパスする最小限のコードを書く
3. **REFACTOR**: コードの品質を向上させる

## 関連ドキュメント

- [プロジェクト全体のドキュメント](../README.md)
- [VideoMetadata型定義](../src/types/video.ts)
- [UdemyCourseIndex型定義](../src/types/udemy-course-index.ts)
- [Kiro仕様駆動開発](../.kiro/specs/video-metadata-indexing/README.md)

## ライセンス

このプロジェクトのライセンスについては、プロジェクトルートの`LICENSE`ファイルを参照してください。
