# YouTube動画データ収集・管理TODO

## 📊 現在の進捗状況

### 完了した作業
- ✅ YouTubeチャンネルページにアクセス
- ✅ 全29本の動画URLリストを取得
- ✅ 全29本の動画の詳細情報を収集
- ✅ 収集データを`youtube-videos-raw-data.md`に保存
- ✅ 11本のTSファイル化完了（YouTube IDベースのファイル名）
- ✅ ファイル名をYouTube IDベースに変更（例: `1LP4ZAsU_UI.ts`）
- ✅ `youtube-videos-raw-data.md`を整理（完了済み/未処理で分割）
- ✅ video-004, video-005のTSファイル作成・登録完了

### 進行中
- 🔄 残り18本の動画情報のTSファイル化（video-012～029）

---

## 🎯 プロジェクトの目的

YouTubeチャンネルの全動画情報を、既存のTypeScript型定義に基づいてTSファイルとして管理する。
これにより、動画一覧ページや詳細ページで構造化されたデータを表示できるようにする。

---

## 📐 データ構造設計

### 既存の型定義
- **場所**: `src/types/video.ts`
- **メイン型**: `VideoMetadata`

### 必須フィールド
```typescript
{
  id: string              // 動画ID（YouTubeのID）
  title: string          // 動画タイトル
  publishedAt: string    // 公開日時（ISO 8601形式）
  videoUrl: string       // YouTube動画URL

  opening: OpeningSection
  learningPoints: LearningPointsSection
  timestamps: TimestampSection
  tags: string[]

  social: SocialSection
  engagement: EngagementSection
}
```

### オプションフィールド
```typescript
{
  relatedVideos?: RelatedVideosSection
  udemyCourses?: UdemyCoursesSection
  customSections?: CustomSection[]
  discordCommunity?: DiscordSection
}
```

---

## 🔄 作業フロー（推奨ワークフロー）

### ✨ 新しい効率的なワークフロー（推奨）

このワークフローでは、ユーザーがYouTube概要欄をコピペし、AIが正しい形式に変換します。

#### 手順

1. **YouTube動画IDの空ファイルを作成**
   ```bash
   # 例: video-012の場合（YouTube ID: pRHyMLH1bcU）
   touch src/data/videos/pRHyMLH1bcU.ts
   ```

2. **YouTube動画ページで概要欄を完全展開してコピー**
   - ブラウザで`https://www.youtube.com/watch?v=pRHyMLH1bcU`を開く
   - 「もっと見る」をクリックして概要欄を完全展開
   - タイトル、公開日、概要欄全文、タグをすべてコピー

3. **空ファイルにコメントアウトで貼り付け**
   ```typescript
   // https://www.youtube.com/watch?v=pRHyMLH1bcU

   // # タイトル
   // 【Playwright MCP】Codex CLI の Webアプリ・デザインテストを自動化！

   // # 概要欄
   //
   // 2025/10/15  #VibeCoding #バイブコーディング
   // 概要欄の内容をそのままコピペ...
   //
   // 【タイムライン】
   // 00:00 イントロ
   // ...
   ```

4. **Claude（AI）に変換を依頼**
   - 「このファイルを正しいVideoMetadata型に変換してください」と依頼
   - AIが概要欄の構造を理解し、適切な型構造にマッピング

5. **動画データローダーに登録**
   - `src/lib/videos/video-data.ts`に追加

6. **型チェック・Lint確認**
   ```bash
   npm run type-check && npm run lint
   ```

#### このワークフローの利点

- ✅ **高速**: Chrome DevTools MCPの起動やタイムアウト問題を回避
- ✅ **確実**: 概要欄の全文を確実に取得できる
- ✅ **シンプル**: ブラウザ→コピペ→AI変換の3ステップ
- ✅ **再現性**: コメントアウトされた元データが残るため検証可能

---

### 🔧 旧ワークフロー（Chrome DevTools MCP使用）

Chrome DevTools MCPを使った方法も可能ですが、タイムアウト問題が発生する場合があります。

<details>
<summary>旧ワークフローの詳細を表示</summary>

1. **Chrome DevTools MCPでYouTube動画ページを開く**
2. **「もっと見る」をクリックして概要欄を完全展開**
3. **スナップショット機能で概要欄を取得**
4. **Claude（AI）が直接VideoMetadata型に変換**
5. **動画データローダーに登録**
6. **型チェック・Lint確認**

</details>

---

### 概要欄の典型的な構造（参考）

```
冒頭の説明文（2-4行）

━━━━━━━━━━━━━━━━━━
💡 この動画で学べること
━━━━━━━━━━━━━━━━━━
✅ 項目1
✅ 項目2

━━━━━━━━━━━━━━━━━━
⏰ タイムライン
━━━━━━━━━━━━━━━━━━
00:00 項目名
01:23 項目名

━━━━━━━━━━━━━━━━━━
🚀 体系的に学びたい方へ
━━━━━━━━━━━━━━━━━━
Udemy講座の説明
▶︎ URL

━━━━━━━━━━━━━━━━━━
🔗 SNS・コミュニティ
━━━━━━━━━━━━━━━━━━
X: URL
Discord: URL

ハッシュタグ群
```

---

### TSファイルの基本構造（参考）

```typescript
import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const videoXXX: VideoMetadata = {
  id: "YouTube動画ID",
  title: "動画タイトル",
  publishedAt: "2025-10-XX",
  videoUrl: "https://www.youtube.com/watch?v=XXXXX",

  opening: {
    lines: [/* 冒頭の説明 */]
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: [/* ✅項目 */]
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "項目" }
    ]
  },

  tags: [/* ハッシュタグ */],

  // 共通セクション
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
```


---

## 📝 次のステップ

### 今すぐやること（推奨ワークフロー）

1. **次の動画IDで空ファイルを作成**
   ```bash
   touch src/data/videos/pRHyMLH1bcU.ts  # video-012
   ```

2. **YouTube動画ページで概要欄をコピー**
   - `https://www.youtube.com/watch?v=pRHyMLH1bcU`を開く
   - 「もっと見る」をクリックして完全展開
   - タイトル・公開日・概要欄全文・タグをコピー

3. **空ファイルにコメントアウトで貼り付け**
   ```typescript
   // https://www.youtube.com/watch?v=pRHyMLH1bcU
   // コピーした内容をそのまま貼り付け
   ```

4. **Claude（AI）に変換依頼**
   - 「このファイルを正しいVideoMetadata型に変換してください」

5. **動画ローダーに登録 & 確認**
   ```bash
   # video-data.tsに追加後
   npm run type-check && npm run lint
   ```

### その後
- video-013～029も同様の手順で1本ずつ進める
- 全29本完了後、UIでの表示確認

---

## 💡 設計の考え方

### なぜ中間ファイル（markdown）を作らないか？
1. **シンプルさ**: ファイルが増えると管理が複雑になる
2. **効率性**: YouTube → TS への直接変換が最速
3. **AI活用**: Claude（AI）が文脈を理解して適切に変換
4. **保守性**: TSファイルだけ管理すれば良い

### なぜ自動化スクリプトを作らないか？
1. **柔軟性**: 動画ごとに構造が微妙に異なる
2. **品質**: AIが文脈を理解した変換の方が高品質
3. **シンプルさ**: スクリプトメンテナンスコストを避ける
4. **段階的**: 1本ずつ確実に処理

### 型定義との整合性
- **既存の型に合わせる**: `src/types/video.ts`が正解
- **概要欄の情報をマッピング**: YouTube → VideoMetadata
- **AIが「いい感じに」変換**: 機械的パースではなく文脈理解

---

## 🔍 参考情報

### 既存ファイル
- **型定義**: `src/types/video.ts`
- **共通セクション**: `src/data/shared/common-sections.ts`
- **サンプルデータ**: `src/data/videos/video-001.ts`, `video-002.ts`, `video-003.ts`
- **動画ローダー**: `src/lib/videos/video-data.ts`
- **収集データ**: `youtube-videos-raw-data.md`

### 動画リスト
全29本の動画URL・IDは`youtube-videos-raw-data.md`に記載済み

---

## ✅ チェックリスト

### データ収集フェーズ ✅ 完了
- [x] 動画URLリストの取得（29本）
- [x] 全29本の詳細情報収集（⚠️ 概要欄は短縮版の可能性）
- [x] `youtube-videos-raw-data.md`を整理（完了済み/未処理で分割）

### データ変換フェーズ 🔄 進行中
- [x] 11本のTSファイル作成（video-001～video-011）
- [ ] 18本のTSファイル作成（video-012～029）

### 統合フェーズ ⏳ 次回以降
- [x] 11本を動画ローダーに登録（video-001～011）
- [ ] 残り18本を動画ローダーに登録（video-012～029）
- [x] 型チェック・Lint確認（11本完了時点）
- [ ] テスト実行確認
- [ ] UIでの表示確認

---

**最終更新**: 2025-10-28（14:00 UTC+9）
**進捗**:
- データ収集フェーズ ✅ 完了
- ファイル名YouTube IDベース移行 ✅ 完了
- TSファイル作成 🔄 11/29本完了
- 新ワークフロー確立 ✅ 完了（コメントアウト方式）
**次回セッション**:
1. video-012用の空ファイル作成（pRHyMLH1bcU.ts）
2. YouTube概要欄をコピーしてコメントアウトで貼り付け
3. AIに変換依頼してVideoMetadata型に変換
4. video-013以降も同様に進める（1ファイルずつ）
