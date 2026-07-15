# Quality Check and Testing Guide

このドキュメントでは、動画メタデータ作成後の品質チェックと動作確認の方法を説明します。

## 品質チェックのフェーズ

動画メタデータ作成後、以下の3つのフェーズで品質を確認します：

1. **静的チェック**: 型チェック・リント
2. **テスト実行**: 自動テストによるデータ検証
3. **動作確認**: 開発サーバーでの表示確認

## Phase 1: 静的チェック

### 型チェック（TypeScript）

**目的**: VideoMetadata型に準拠しているか確認

**コマンド**:
```bash
npm run type-check
```

**成功例**:
```
> vibe-coding-studio@1.0.0 type-check
> tsc --noEmit
```

**よくあるエラーと対処法**:

#### エラー1: 型の不一致

```typescript
// ❌ エラー例
Type 'number' is not assignable to type 'string'
```

**原因**: フィールドの型が間違っている

**対処法**:
```typescript
// ❌ Bad
publishedAt: 20251101  // number型

// ✅ Good
publishedAt: "2025-11-01T00:00:00+09:00"  // string型
```

#### エラー2: 必須フィールドの欠落

```typescript
// ❌ エラー例
Property 'opening' is missing in type
```

**対処法**: 必須フィールドを追加

```typescript
// 必須フィールド
- id
- title
- publishedAt
- videoUrl
- opening
- learningPoints
- timestamps
- tags
- social
- engagement
```

### ESLint

**目的**: コードスタイルの統一

**コマンド**:
```bash
npm run lint
```

**成功例**:
```
> vibe-coding-studio@1.0.0 lint
> next lint

✔ No ESLint warnings or errors
```

**よくある警告と対処法**:

#### 警告1: 未使用のインポート

```typescript
// ⚠️ Warning
'VideoMetadata' is defined but never used
```

**対処法**: 実際に使用されていることを確認、不要なら削除

#### 警告2: 文字列のエスケープ

```typescript
// ⚠️ Warning
Unexpected string concatenation
```

**対処法**: テンプレートリテラルを使用

```typescript
// ❌ Bad
"公開日: " + publishedAt

// ✅ Good
`公開日: ${publishedAt}`
```

### コードフォーマット

**コマンド**:
```bash
npm run format
```

**目的**: Prettierによる自動整形

## Phase 2: テスト実行

### 動画データテストの実行

**目的**: VideoMetadata の構造とデータの妥当性を検証

**コマンド**:
```bash
npm run test -- src/lib/videos/__tests__/video-data.test.ts
```

**成功例**:
```
PASS src/lib/videos/__tests__/video-data.test.ts
  ✓ 動画データが存在する
  ✓ openingが存在し、linesが配列で空でない
  ✓ タイムスタンプ形式が正しい("00:00"または"01:00:52"形式)
  ✓ 関連動画の構造が正しい
  ✓ Udemy講座の構造が正しい

Test Suites: 1 passed, 1 total
Tests:       534 passed, 534 total
```

### よくあるテストエラーと対処法

#### エラー1: opening.lines に空文字列

```
expect(line.length).toBeGreaterThan(0)
Expected: > 0
Received:   0
```

**原因**: opening.lines に空文字列が含まれている

**対処法**:
```typescript
// ❌ Bad
opening: {
  lines: [
    "文章1",
    "",  // 空文字列
    "文章2",
  ],
}

// ✅ Good
opening: {
  lines: [
    "文章1",
    "文章2",
  ],
}
```

#### エラー2: タイムスタンプ形式

```
expect(ts.time).toMatch(/^\d{1,2}:\d{2}(:\d{2})?$/)
Expected pattern: /^\d{1,2}:\d{2}(:\d{2})?$/
Received string:  "01:00:52"
```

**原因**: 正規表現パターンが古い（修正済みのはず）

**対処法**: テストファイルの正規表現を確認

```typescript
// ✅ 正しいパターン
expect(ts.time).toMatch(/^\d{1,2}:\d{2}(:\d{2})?$/)

// 以下の形式をサポート
// - "00:00" (MM:SS)
// - "12:34" (MM:SS)
// - "1:23:45" (H:MM:SS)
// - "01:23:45" (HH:MM:SS)
```

#### エラー3: URL形式

```
expect(video.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/)
```

**原因**: YouTube URLの形式が間違っている

**対処法**:
```typescript
// ❌ Bad
videoUrl: "youtube.com/watch?v=..."
videoUrl: "https://youtu.be/..."

// ✅ Good
videoUrl: "https://www.youtube.com/watch?v=1-1NAB5jIjo"
```

#### エラー4: 関連動画の構造

```
expect(video.relatedVideos.videos.length).toBeGreaterThan(0)
```

**原因**: relatedVideos.videos が空配列

**対処法**: 最低3本の関連動画を追加

```typescript
// ❌ Bad
relatedVideos: {
  title: "📌 関連動画",
  videos: [],  // 空
}

// ✅ Good
relatedVideos: {
  title: "📌 関連動画",
  videos: [
    { title: "...", url: "..." },
    { title: "...", url: "..." },
    { title: "...", url: "..." },
  ],
}
```

### 全テストの実行（オプション）

**コマンド**:
```bash
npm run test
```

**注意**: 全てのテストを実行するため時間がかかる（動画データテストのみで十分な場合が多い）

## Phase 3: 動作確認

### 開発サーバーの起動

**コマンド**:
```bash
npm run dev
```

**成功例**:
```
> vibe-coding-studio@1.0.0 dev
> next dev

   ▲ Next.js 15.4.4
   - Local:        http://localhost:3000
   - Network:      http://10.0.0.190:3000

 ✓ Ready in 4.9s
```

### 動作確認の手順

#### 確認1: 動画一覧ページ (`/videos`)

**目的**: 新動画が一覧に表示されるか確認

**手順**:

1. ブラウザで `http://localhost:3000/videos` を開く
2. または標準機能の Claude in Chrome（`mcp__claude-in-chrome__*`）を使用（グローバル `operating-chrome` スキル参照）：
   ```typescript
   // Claude in Chromeで確認
   mcp__claude-in-chrome__navigate({ url: "http://localhost:3000/videos", tabId })
   mcp__claude-in-chrome__read_page({ filter: "interactive", tabId })
   ```

**確認項目**:
- [ ] 新動画のタイトルが表示される
- [ ] 公開日が正しく表示される
- [ ] 日本語フォーマット（例: "2025年10月31日"）
- [ ] 一覧の最上部に表示される（最新動画の場合）
- [ ] クリック可能なリンクになっている

**チェックポイント**:
```typescript
// スナップショット例
uid=X_Y link "リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発の流れを公開の詳細を見る"
  uid=X_Y+1 heading "リアルなAI駆動開発の全工程！..." level="2"
  uid=X_Y+2 StaticText "公開日: "
  uid=X_Y+3 StaticText "2025年10月31日"
```

#### 確認2: 動画詳細ページ (`/videos/{動画ID}`)

**目的**: 全セクションが正しく表示されるか確認

**手順**:

1. ブラウザで `http://localhost:3000/videos/1-1NAB5jIjo` を開く
2. または標準機能の Claude in Chrome（`mcp__claude-in-chrome__*`）を使用：
   ```typescript
   mcp__claude-in-chrome__navigate({ url: "http://localhost:3000/videos/1-1NAB5jIjo", tabId })
   mcp__claude-in-chrome__read_page({ filter: "interactive", tabId })
   ```

**確認項目**:

##### 基本情報
- [ ] タイトルが正しく表示
- [ ] 公開日が正しく表示
- [ ] YouTube動画へのリンクが機能

##### 冒頭セクション
- [ ] 改行位置が自然
- [ ] 一文ごとに改行されている
- [ ] 箇条書き（・）が正しく表示
- [ ] 空行が適切に配置

##### 学べる内容セクション
- [ ] タイトル（💡 この動画の特徴）が表示
- [ ] ✅ マークが各項目に表示
- [ ] 4-6項目が表示

##### 関連記事・リソースセクション
- [ ] タイトルが表示
- [ ] URLが別行に表示
- [ ] リンクが機能

##### 関連動画セクション
- [ ] タイトル（📌 関連動画）が表示
- [ ] 各動画のタイトルとURLが別行
- [ ] 中点（・）が各動画に表示
- [ ] 3-5本の動画が表示
- [ ] URLが正しい

##### Udemy講座セクション
- [ ] タイトルが表示
- [ ] 説明文が表示
- [ ] 学べる内容（4-5項目）が表示
- [ ] CTAテキストとURLが正しい
- [ ] URLに適切なフィルター（`?topic=...`）が含まれる

##### SNS・コミュニティセクション
- [ ] タイトルが表示
- [ ] 各SNSリンクが表示
- [ ] 絵文字が正しく表示

##### Discordコミュニティセクション
- [ ] タイトルが表示
- [ ] 説明文が表示
- [ ] Discordリンクが機能

##### タイムラインセクション
- [ ] タイトル（⏰ タイムライン）が表示
- [ ] 各タイムスタンプが正しい形式
- [ ] ラベルが表示

##### タグ
- [ ] ハッシュタグが表示
- [ ] #記号が各タグに付いている
- [ ] スペース区切りで表示

##### エンゲージメントセクション
- [ ] メッセージが表示
- [ ] CTAが表示

### 標準機能の Claude in Chrome の活用

ブラウザ操作は常に標準機能の Claude in Chrome（`mcp__claude-in-chrome__*`）を最優先で使う（詳細はグローバル `operating-chrome` スキル参照）。

**ページ内容の取得**:
```typescript
// インタラクティブ要素のみ
mcp__claude-in-chrome__read_page({ filter: "interactive", tabId })

// 特定要素配下のみ（read_page/find で得た ref_id を指定）
mcp__claude-in-chrome__read_page({ ref_id: "element_id", tabId })

// テキストのみ取得したい場合
mcp__claude-in-chrome__get_page_text({ tabId })
```

**スクリーンショット取得**:
```typescript
// スクリーンショット
mcp__claude-in-chrome__computer({ action: "screenshot", tabId })

// 保存して共有する場合
mcp__claude-in-chrome__computer({ action: "screenshot", tabId, save_to_disk: true })
```

**要素の検索**:
```typescript
// 自然言語で要素を検索（find が最速・最安）
mcp__claude-in-chrome__find({ query: "関連動画セクション", tabId })
mcp__claude-in-chrome__find({ query: "Udemy講座セクション", tabId })
```

### 改行位置の確認

**重要**: YouTube概要欄用のプレーンテキストとして表示されるため、改行位置が重要

**確認ポイント**:

1. **一文ごとに改行**:
```
✅ Good:
綺麗なチュートリアルじゃなく、リアルな開発プロセスをすべてお見せします！
個人開発サイト「Vibe Coding Studio」にカスタムコマンド公開機能を追加する過程を収録しました。

❌ Bad:
綺麗なチュートリアルじゃなく、リアルな開発プロセスをすべてお見せします！個人開発サイト「Vibe Coding Studio」にカスタムコマンド公開機能を追加する過程を収録しました。
```

2. **URLは別行**:
```
✅ Good:
公開したカスタムコマンド
Vibe Coding Studioの公式サイトで公開中
https://www.vibecodingstudio.dev/claude-code/commands

❌ Bad:
公開したカスタムコマンド Vibe Coding Studioの公式サイトで公開中 https://www.vibecodingstudio.dev/claude-code/commands
```

3. **関連動画のタイトルとURL**:
```
✅ Good:
・【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！
https://www.youtube.com/watch?v=HM0SLThgXqE

❌ Bad:
・【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！ https://www.youtube.com/watch?v=HM0SLThgXqE
```

## 品質チェックチェックリスト

作業完了前に以下を確認：

### 静的チェック
- [ ] `npm run type-check` 成功
- [ ] `npm run lint` 成功
- [ ] `npm run format` 実行済み

### テスト
- [ ] `npm run test -- src/lib/videos/__tests__/video-data.test.ts` 全合格
- [ ] 新動画のテストが含まれていることを確認
- [ ] エラーが0件

### 動作確認
- [ ] `/videos` ページで新動画が表示
- [ ] タイトル・公開日が正しい
- [ ] `/videos/{動画ID}` ページで全セクション表示
- [ ] opening の改行位置が自然
- [ ] 関連動画が3-5本表示
- [ ] Udemy講座URLに適切なフィルター
- [ ] カスタムセクションのURLが別行
- [ ] タイムスタンプ形式が正しい

### ドキュメント
- [ ] 関連動画の選定理由を記録
- [ ] Udemy講座URLの判別理由を記録
- [ ] コミット用コマンド例を準備

## トラブルシューティング

### Issue: 開発サーバーが起動しない

**症状**:
```
Error: Port 3000 is already in use
```

**対処法**:
```bash
# ポートを使用しているプロセスを確認
lsof -i :3000

# プロセスをkill
kill -9 <PID>

# 再起動
npm run dev
```

### Issue: ページが表示されない

**症状**: `/videos/1-1NAB5jIjo` にアクセスすると404

**原因**:
1. 動画IDが間違っている
2. `video-data.ts` に登録されていない

**対処法**:
```typescript
// video-data.ts を確認
import { video_1_1NAB5jIjo } from "@/data/videos/1-1NAB5jIjo"  // import確認

const allVideosData: VideoMetadata[] = [
  video_1_1NAB5jIjo,  // 配列に含まれているか確認
  // ...
]
```

### Issue: セクションが表示されない

**症状**: 関連動画やUdemy講座が表示されない

**原因**: セクションが `undefined` または空

**対処法**:
1. データファイルで該当セクションを確認
2. `video-data.ts` のインポートを確認
3. 開発サーバーを再起動

### Issue: 標準機能の Claude in Chrome が動作しない

**症状**: MCPコマンドでエラー

**対処法**:
1. `claude-in-chrome` 拡張機能が接続されているか確認（`tabs_context_mcp` で確認、無ければ `createIfEmpty: true`）
2. ブラウザが起動しているか確認
3. 対象ドメインの拡張機能サイト権限が許可されているか確認（詳細はグローバル `operating-chrome` スキル参照）
4. 手動でブラウザを開いて確認

## Quick Commands

```bash
# 品質チェック一括実行
npm run check:all

# 個別チェック
npm run type-check
npm run lint
npm run format
npm run test -- src/lib/videos/__tests__/video-data.test.ts

# 開発サーバー起動
npm run dev

# ビルド確認（オプション）
npm run build
```

---

このガイドに従って品質チェックを行うことで、高品質な動画メタデータを保証できます。
