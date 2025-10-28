# YouTube動画データ収集・管理TODO

## 📊 現在の進捗状況

### 完了した作業
- ✅ YouTubeチャンネルページにアクセス
- ✅ 全29本の動画URLリストを取得
- ✅ 全29本の動画の詳細情報を収集（⚠️ 概要欄は短縮版の可能性）
- ✅ 収集データを`youtube-videos-raw-data.md`に保存
- ✅ 9本のTSファイル化完了（YouTube IDベースのファイル名に移行済み）
- ✅ ファイル名をYouTube IDベースに変更（例: `1LP4ZAsU_UI.ts`）
- ✅ `youtube-videos-raw-data.md`を整理（完了済み/未処理で分割）

### 進行中
- 🔄 残り18本の動画情報のTSファイル化（video-012～029）
- ⚠️ データ不足の動画（video-004, video-005）の再収集が必要
- ⚠️ 概要欄が短縮版の動画は、Chrome DevTools MCPで再収集が必要

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

## 🔄 作業フロー（シンプル版）

### 動画1本のTSファイル化の手順

1. **Chrome DevTools MCPでYouTube動画ページを開く**
   - 例: `https://www.youtube.com/watch?v=1EQllS_3TJo`

2. **「もっと見る」をクリックして概要欄を完全展開**
   ⚠️ **超重要**: 展開せずに進むと情報が不完全になります！
   - タイムスタンプ欠落
   - 関連動画リンク取得不可
   - Udemy講座情報不完全

3. **概要欄をコピー（または Chrome DevTools MCPのスナップショット機能を使用）**
   - タイトル、概要欄、タグをClaude（AI）に渡す

4. **Claude（AI）が概要欄を理解してVideoMetadata型に変換**
   - 概要欄の構造を解釈：
     - 💡 この動画で学べること → `learningPoints`
     - ⏰ タイムライン → `timestamps`
     - 🚀 Udemy講座 → `udemyCourses` or `customSections`
     - 🔗 SNS → `social`（共通セクション使用）
   - 適切な型構造に「いい感じに」マッピング

5. **`src/data/videos/video-XXX.ts`を直接作成**
   - 中間ファイル（markdown）は作成しない
   - その場でTSファイルを完成させる

6. **動画データローダーに登録**
   - `src/lib/videos/video-data.ts`に追加

7. **型チェック・Lint確認**
   ```bash
   npm run type-check
   npm run lint
   ```

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

### 今すぐやること
1. Chrome DevTools MCPで video-011 のYouTubeページを開く
2. 「もっと見る」をクリックして概要欄を完全展開
3. 概要欄をコピー（またはスナップショット）
4. Claude（私）に渡して、video-011.ts を作成してもらう
5. video-data.ts に登録
6. 型チェック・Lint確認

### その後
- video-012～029も同様の手順で1本ずつ進める
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
- [x] 10本のTSファイル作成（video-001～010）
- [ ] ⚠️ 概要欄短縮版動画の再収集（video-011～029）
- [ ] 19本のTSファイル作成（video-011～029）

### 統合フェーズ ⏳ 次回以降
- [x] 10本を動画ローダーに登録（video-001～010）
- [ ] 残り19本を動画ローダーに登録（video-011～029）
- [ ] 型チェック・Lint確認
- [ ] テスト実行確認
- [ ] UIでの表示確認

---

**最終更新**: 2025-10-28（12:45 UTC+9）
**進捗**:
- データ収集フェーズ ✅ 完了
- ファイル名YouTube IDベース移行 ✅ 完了
- TSファイル作成 🔄 9/29本完了（video-004, video-005はデータ不足）
**次回セッション**:
1. video-012の概要欄をChrome DevTools MCPで収集（「もっと見る」展開必須）
2. video-012のTSファイル作成（概要欄→VideoMetadata型へのAI変換）
3. video-013以降も同様に進める
4. video-004, video-005のデータ収集と作成
