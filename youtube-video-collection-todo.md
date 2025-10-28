# YouTube動画データ収集・管理TODO

## 📊 現在の進捗状況

### 完了した作業
- ✅ YouTubeチャンネルページにアクセス
- ✅ 全29本の動画URLリストを取得
- ✅ 3本の動画の詳細情報を収集（Git運用術、Claude Code on the Web、Codexスマホアプリ開発）
- ✅ 収集データを`youtube-videos-raw-data.md`に保存
- ✅ 1本目（Git運用術）をTSファイル化（`video-003.ts`）

### 進行中
- 🔄 残り26本の動画情報収集

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

## 🔄 作業フロー

### Phase 1: データ収集（現在のフェーズ）

#### 1.1 Chrome DevTools MCPを使った情報収集
```javascript
// 各動画ページで実行するスクリプト
() => {
  const titleElement = document.querySelector('h1.ytd-watch-metadata yt-formatted-string');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('v') || '';

  const descriptionElement = document.querySelector('ytd-text-inline-expander#description-inline-expander yt-attributed-string');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  const tagElements = document.querySelectorAll('a[href*="/hashtag/"]');
  const tags = Array.from(tagElements).map(el => el.textContent.trim()).filter(t => t.startsWith('#'));

  return { title, videoId, url: window.location.href, description, tags };
}
```

#### 1.2 収集データの保存先
- **一時保存**: `youtube-videos-raw-data.md`
- **最終保存**: `src/data/videos/video-XXX.ts`

#### 1.3 収集の優先順位
1. **最新の動画から**: より関連性の高い情報
2. **視聴回数の多い動画**: 人気コンテンツ
3. **シリーズ物**: まとまった情報提供

### Phase 2: データ変換・TSファイル作成

#### 2.1 概要欄のパース戦略
YouTube概要欄は以下の構造を持つ：
```
冒頭の説明文（2-4行）

━━━━━━━━━━━━━━━━━━
💡 この動画で学べること / 動画のポイント
━━━━━━━━━━━━━━━━━━
✅ 項目1
✅ 項目2
...

━━━━━━━━━━━━━━━━━━
📚 / ⏰ タイムライン / タイムスタンプ
━━━━━━━━━━━━━━━━━━
00:00 項目名
01:23 項目名
...

━━━━━━━━━━━━━━━━━━
🚀 体系的に学びたい方へ / Udemy講座
━━━━━━━━━━━━━━━━━━
講座の説明
▶︎ URL

━━━━━━━━━━━━━━━━━━
🔗 SNS・コミュニティ
━━━━━━━━━━━━━━━━━━
X: URL
Discord: URL

ハッシュタグ群
```

#### 2.2 パース処理
1. **セクション分割**: `━━━━`区切り文字で分割
2. **絵文字によるセクション識別**: 💡、⏰、🚀、🔗 など
3. **タイムスタンプ抽出**: `00:00 ラベル`形式を正規表現でパース
4. **チェックリスト抽出**: `✅`で始まる行を収集

#### 2.3 TSファイル生成テンプレート
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

  // オプション
  customSections: [],
  udemyCourses: {},

  // 共通セクション
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
```

### Phase 3: 統合・テスト

#### 3.1 動画データローダーへの登録
`src/lib/videos/video-data.ts`に追加：
```typescript
import { videoXXX } from "@/data/videos/video-XXX"

const allVideosData: VideoMetadata[] = [
  video001,
  video002,
  video003,
  videoXXX, // 新規追加
]
```

#### 3.2 検証項目
- ✅ TypeScript型チェック合格
- ✅ ESLint検査合格
- ✅ 動画一覧ページでの表示確認
- ✅ 動画詳細ページでの表示確認

---

## 🤖 自動化の可能性

### 現在の手動作業
1. Chrome DevTools MCPで各動画ページにアクセス
2. 概要欄を展開（「もっと見る」クリック）
3. JavaScriptで情報抽出
4. テキストファイルに保存
5. 概要欄をパースしてTSファイル作成
6. 動画データローダーに登録

### 自動化できる部分
- [ ] **バッチ処理スクリプト**: 全動画URLを順番に処理
- [ ] **概要欄パーサー**: セクション自動識別・抽出
- [ ] **TSファイル生成器**: テンプレートベースの自動生成
- [ ] **動画データローダー更新**: import文とarray要素の自動追加

### 自動化スクリプト案
```typescript
// scripts/collect-youtube-videos.ts
import { chromium } from 'playwright'

async function collectVideoData(videoId: string) {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`)
  await page.click('text=もっと見る')

  const data = await page.evaluate(() => {
    // データ抽出ロジック
  })

  await browser.close()
  return data
}

// scripts/parse-description.ts
function parseDescription(description: string): Partial<VideoMetadata> {
  // セクション分割とパース
}

// scripts/generate-ts-file.ts
function generateVideoTsFile(data: VideoMetadata, outputPath: string) {
  // TSファイル生成
}
```

---

## 📝 次のステップ

### 短期（今すぐ）
1. ✅ このTODOファイルの作成
2. ⏳ 残り26本の動画情報収集を継続（バッチで5-10本ずつ）
3. ⏳ 収集した動画データからTSファイルを作成（2-3本試す）

### 中期（今後の開発セッション）
4. ⏳ 概要欄パーサーの実装
5. ⏳ TSファイル自動生成スクリプトの作成
6. ⏳ 全動画のTSファイル化完了

### 長期（将来的な改善）
7. ⏳ 定期的な動画情報更新の自動化
8. ⏳ YouTube API連携（視聴回数、公開日の自動取得）
9. ⏳ 管理画面の作成（動画情報の手動編集UI）

---

## ⚠️ 注意点・課題

### データの一貫性
- **概要欄フォーマットの変更**: 動画によって微妙に構造が異なる
  - 解決策: 柔軟なパーサーの実装、手動調整の許容

### YouTube制約
- **レート制限**: 短時間に大量アクセスするとブロックされる可能性
  - 解決策: 適度な待機時間（2-3秒/動画）を設ける

### 公開日の取得
- **表示形式**: "7日前"、"2週間前" などの相対表記
  - 解決策: YouTube Data APIの利用、または手動設定

### タイムスタンプの形式
- **複数パターン**: "00:00"、"0:00"、"1:23:45"（時間付き）
  - 解決策: 正規表現で柔軟に対応

---

## 💡 設計の考え方

### なぜテキストファイル経由か？
1. **レビュー可能性**: 生データを確認・修正しやすい
2. **段階的処理**: 収集とパース・変換を分離
3. **バックアップ**: 元データを保持
4. **チーム共有**: 誰でも内容を確認できる

### なぜ手動収集から始めるか？
1. **パターン理解**: 実際のデータを見てパーサーを設計
2. **エッジケース発見**: 自動化前に例外パターンを把握
3. **段階的改善**: 完璧を目指さず、まず動くものを作る

### 型定義との整合性
- **既存の型に合わせる**: `src/types/video.ts`が正
- **概要欄の情報をマッピング**: YouTube → VideoMetadata
- **不足情報は手動補完**: 公開日、関連動画など

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
- [x] 3本の詳細情報収集（動画1-3）
- [x] 残り26本の詳細情報収集
  - [x] 4-10本目（7本）
  - [x] 11-17本目（7本）
  - [x] 18-24本目（7本）
  - [x] 25-29本目（5本）
- [x] 全収集データを`youtube-videos-raw-data.md`に統一フォーマットで追記

### データ変換フェーズ 🔄 進行予定
- [x] 1本のTSファイル作成（video-003.ts）
- [x] 2本のTSファイル作成（video-004.ts、video-005.ts）
- [ ] パーサーロジックの実装
- [ ] 残り26本（video-006～029）のTSファイル作成
- [ ] パーサーの改善・調整

### 統合フェーズ ⏳ 次回以降
- [x] 3本を動画ローダーに登録（video-003, 004, 005）
- [ ] 全26本を動画ローダーに登録（video-006～029）
- [ ] 型チェック・Lint確認
- [ ] テスト実行確認
- [ ] UIでの表示確認

---

**最終更新**: 2025-10-28（22:00 UTC+9）
**進捗**: データ収集フェーズ完全終了 ✅
**次回セッション**: データ変換フェーズ開始 → video-006～029のTSファイル作成
