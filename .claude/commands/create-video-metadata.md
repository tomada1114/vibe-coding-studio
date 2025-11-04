---
description: Create video metadata and YouTube description from .tmp/next-video-info.md using video-metadata-creator skill, related-videos-finder and udemy-course-suggester agents
allowed-tools: Read, Write, Edit, Bash, Task
argument-hint: <youtube-video-id>
model: sonnet
---

# Create Video Metadata & Description

YouTube動画のメタデータファイルと概要欄テキストを`.tmp/next-video-info.md`から自動生成します。

**YouTube Video ID**: $1

## Context Loading

### Input File
動画情報ファイル: @.tmp/next-video-info.md

### File Existence Check
- Input file status: !`[ -f ".tmp/next-video-info.md" ] && echo "✅ EXISTS" || echo "❌ NOT FOUND - Please create .tmp/next-video-info.md first"`
- Target directory: !`[ -d "src/data/videos" ] && echo "✅ EXISTS" || echo "❌ NOT FOUND"`
- Video data loader: !`[ -f "src/lib/videos/video-data.ts" ] && echo "✅ EXISTS" || echo "❌ NOT FOUND"`

### Project Context
- VideoMetadata type definition: @src/types/video.ts

## Task: Complete Video Metadata Creation Pipeline

**SCOPE**: この巨大なワークフローは、動画情報の読み込みから、メタデータ生成、関連コンテンツの自動選定、品質チェック、概要欄生成まで、すべてを自動化します。

### Prerequisites Validation

**必須条件を確認**:
1. `.tmp/next-video-info.md`が存在すること
2. YouTube動画ID `$1` が有効な形式であること
3. `src/data/videos/`ディレクトリが存在すること
4. `src/lib/videos/video-data.ts`が存在すること

**エラーハンドリング**:
- 入力ファイルが見つからない場合: エラーメッセージを表示して終了
- 動画IDが不正な場合: フォーマットエラーを表示して終了

---

## Phase 1: Input File Analysis & Information Extraction

### 1.1 Read and Parse Input File

`.tmp/next-video-info.md`から以下の情報を抽出:

**必須情報**:
- **動画タイトル**: `# タイトル` または `## タイトル` セクションから
- **公開日**: `公開日:`, `Published:`, `日付:` などから抽出、またはユーザーに確認
- **タグリスト**: `#` で始まるハッシュタグ、または `tags:`, `タグ:` セクションから
- **動画URL**: `https://www.youtube.com/watch?v=$1` として構築

**コンテンツ情報**:
- **概要/Opening**: 動画の冒頭説明部分
- **学べること/特徴**: `💡` や `✅` で始まる項目、または箇条書き
- **タイムスタンプ/タイムライン**: `00:00` 形式のタイムスタンプと説明
- **関連リンク**: URLや参考資料
- **文字起こし**: 動画の詳細な内容（あれば）

### 1.2 Information Validation

抽出した情報の検証:
- タイトルが空でないこと
- タグが1つ以上あること（推奨: 10-15個）
- 公開日が有効なYYYY-MM-DD形式であること

**不足情報がある場合**:
- ユーザーに確認を求める
- 合理的なデフォルト値を提案

---

## Phase 2: Automated Content Selection via Sub-Agents

### 2.1 関連動画候補の取得（related-videos-finder エージェント）

**エージェント呼び出し**:
```markdown
> Use the related-videos-finder agent to find related video candidates for the following tags:
> Tags: [抽出したタグリスト]
> Current Video ID: "$1"
> Limit: 10
```

**期待される出力**:
```typescript
RelatedVideoCandidate[] = [
  {
    id: "video-id",
    title: "動画タイトル",
    score: 42,
    publishedAt: "2024-10-15",
    tags: ["ClaudeCode", "React", "TypeScript"],
    url: "https://www.youtube.com/watch?v=video-id"
  },
  // ... 上位10本の候補
]
```

**処理**:
1. エージェントを明示的に呼び出す（Task tool使用）
2. **10本の候補**をスコア付きで取得（AI判断とユーザー選択用）
3. スコアの内訳を確認（完全一致、部分一致、類似性ボーナス）

### 2.2 AI判断による関連性評価

**各候補動画の詳細分析**:

1. **メタデータ読み込み**:
   - `src/data/videos/{候補動画ID}.ts`を読み込む
   - opening, learningPoints, tags などの詳細情報を取得

2. **新しい動画との関連性を評価**:
   以下の観点で各候補を分析：

   **a) テーマの一致度**:
   - 同じツールを扱っている？（Claude Code、Cursor、Codexなど）
   - 同じ開発手法を扱っている？（AI駆動開発、TDD、仕様駆動開発など）
   - 同じ技術スタックを使っている？（React、Next.js、TypeScriptなど）

   **b) 内容の補完性**:
   - 前提知識となる動画か？（初心者向け → 応用編）
   - 発展的な内容か？（基礎編 → 実践編）
   - シリーズ関係か？（前編・後編、パート1・パート2）

   **c) ユーザーにとっての有用性**:
   - この動画を見た人が次に見たくなる内容か？
   - 学習の流れとして自然か？
   - 補完的な知識を提供できるか？

3. **推奨度と理由の付与**:
   各候補に以下を設定：
   - **推奨度**: 高（強く推奨）、中（推奨）、低（やや関連）
   - **理由**: 具体的な推奨理由（50-100文字程度）

   **例**:
   ```typescript
   {
     candidate: { id: "abc123", title: "Claude Code初心者ガイド", score: 42 },
     recommendation: "高",
     reason: "同じClaudeCodeツールを使用し、TDD手法も共通。初心者向けの前提知識として最適。"
   }
   ```

### 2.3 ユーザー選択（プランモード的アプローチ）

**AskUserQuestionツールで候補提示**:

1. **質問の構成**:
   ```markdown
   以下の候補から関連動画を選択してください（3-5本を推奨）：

   各候補は以下の形式で表示：
   - タイトル
   - タグベーススコア
   - AI評価：推奨度と理由
   ```

2. **選択肢の形式**:
   ```typescript
   {
     question: "関連動画を選択してください（複数選択可）",
     header: "関連動画選択",
     multiSelect: true,
     options: [
       {
         label: "動画A (スコア: 42, 推奨: 高)",
         description: "同じClaudeCodeツールを使用し、TDD手法も共通。初心者向けの前提知識として最適。"
       },
       {
         label: "動画B (スコア: 35, 推奨: 中)",
         description: "AI駆動開発という共通テーマだが、使用ツールが異なる。補完的な視点を提供。"
       },
       // ... 最大10個の選択肢
     ]
   }
   ```

3. **ユーザーからの選択受領**:
   - 選択された動画IDのリストを取得
   - 3-5本の範囲を推奨（それ以外でもOK）

4. **選択結果の記録**:
   - どの動画が選ばれたか
   - 選択理由（推奨度と理由）
   - 完了報告に含める

### 2.4 Udemy講座の自動推薦（udemy-course-suggester エージェント）

**エージェント呼び出し**:
```markdown
> Use the udemy-course-suggester agent to suggest Udemy courses for the following tags:
> Tags: [抽出したタグリスト]
```

**期待される出力**:
```typescript
UdemyCoursesSection = {
  title: "🚀 体系的に学びたい方へ",
  description: "...",
  courses: ["・講座1", "・講座2"],
  cta: {
    text: "Udemy講座を見る",
    url: "https://www.vibecodingstudio.dev/coupons?topic=..."
  }
}
```

**処理**:
1. エージェントを明示的に呼び出す（Task tool使用）
2. `UdemyCoursesSection`形式のデータを取得
3. フィルター付きURLとトピックマッピングを確認
4. 推薦理由を記録

---

## Phase 3: VideoMetadata File Generation

### 3.1 Construct VideoMetadata Object

Phase 1と2で収集した情報から`VideoMetadata`オブジェクトを構築:

```typescript
import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_$1: VideoMetadata = {
  // 基本情報
  id: "$1",
  title: "【抽出したタイトル】",
  publishedAt: "YYYY-MM-DD",
  videoUrl: "https://www.youtube.com/watch?v=$1",

  // Opening セクション
  opening: {
    lines: [
      "【概要から抽出した段落1】",
      "【段落2】",
      // 2-5行、空文字列なし
    ]
  },

  // Learning Points セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ 【学習ポイント1】",
      "✅ 【学習ポイント2】",
      // 4-6項目
    ]
  },

  // Timestamps セクション
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "【説明】" },
      { time: "05:30", label: "【説明】" },
      // HH:MM または HH:MM:SS 形式
    ]
  },

  // Tags
  tags: ["タグ1", "タグ2", "タグ3"], // 10-15個

  // 関連動画（related-videos-finder から）
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      { id: "video-id", title: "タイトル" },
      // エージェントが返した3-5本
    ],
  },

  // Udemy講座（udemy-course-suggester から）
  udemyCourses: {
    // エージェントが返したUdemyCoursesSection
  },

  // カスタムセクション（あれば）
  customSections: [
    {
      title: "🔗 関連リンク",
      type: "text",
      content: "リンクURL\n説明文"
    }
  ],

  // 共通セクション
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
```

**重要な変換ルール**:
- **export名**: `video_` + 動画ID（ハイフンをアンダースコアに変換）
  - 例: `1-1NAB5jIjo` → `video_1_1NAB5jIjo`
- **opening.lines**: 空文字列を含めない（テスト要件）
- **timestamps.time**: 正規表現 `/^\d{1,2}:\d{2}(:\d{2})?$/` に準拠
- **tags**: ハッシュタグから `#` を除去
- **relatedVideos**: エージェント出力をそのまま使用
- **udemyCourses**: エージェント出力をそのまま使用

### 3.2 Write VideoMetadata File

`src/data/videos/$1.ts`にファイルを作成:

**手順**:
1. 動画IDのハイフンをアンダースコアに変換してexport名を決定
2. VideoMetadata形式でTypeScriptコードを生成
3. インポート文、型定義、commonSections参照を含める
4. ファイルを保存

---

## Phase 4: Video Data Loader Registration

### 4.1 Update video-data.ts

`src/lib/videos/video-data.ts`を更新:

**Step 1: インポート追加**
```typescript
// 既存のインポート群の後に追加（アルファベット順または公開日順）
import { video_$1 } from "@/data/videos/$1"
```

**Step 2: 配列に追加**
```typescript
const allVideosData: VideoMetadata[] = [
  // 既存の動画...
  video_$1, // 公開日順に適切な位置に挿入
  // その他の動画...
]
```

**位置決定ロジック**:
- 既存の動画の`publishedAt`を確認
- 新しい動画の公開日に基づいて適切な位置に挿入
- 通常は配列の最後（最新動画）

---

## Phase 5: YouTube Description Generation

### 5.1 Generate Description Text

YouTube概要欄用のプレーンテキストを生成:

**セクション構成**:

```
【動画タイトル】

【Opening セクション】
段落1
段落2
...

💡 この動画で学べること
✅ 学習ポイント1
✅ 学習ポイント2
...

⏰ タイムライン
00:00 説明1
05:30 説明2
...

🎬 関連動画
・動画1: https://www.youtube.com/watch?v=video-id-1
・動画2: https://www.youtube.com/watch?v=video-id-2
...

🚀 体系的に学びたい方へ
【Udemy講座の説明】
・講座1
・講座2
...
🎁 限定クーポンで最大90%OFF!
【Udemy講座URL】

🐦 SNSでフォロー
【SNSリンク】

📢 Discordコミュニティ
【Discordリンク】

【エンゲージメント（いいね・チャンネル登録のお願い）】

#タグ1 #タグ2 #タグ3 ...
```

### 5.2 Write Description File

`.tmp/next-video-description.txt`に概要欄テキストを保存:

**手順**:
1. 上記のセクション構成でプレーンテキストを生成
2. URLは完全なYouTube URLに展開
3. 改行と空行を適切に配置
4. ハッシュタグを末尾に追加
5. `.tmp/next-video-description.txt`に保存

---

## Phase 6: Quality Assurance

### 6.1 Type Check

TypeScript型チェックを実行:
```bash
npm run type-check
```

**期待される結果**: エラーなし

**エラーが出た場合**:
1. エラーメッセージを分析
2. VideoMetadata型との不一致を特定
3. `src/data/videos/$1.ts`を修正
4. 再度型チェック

### 6.2 Lint Check

ESLintチェックを実行:
```bash
npm run lint
```

**期待される結果**: エラーなし

**エラーが出た場合**:
1. フォーマットエラーを修正
2. 命名規則エラーを修正
3. 再度リントチェック

### 6.3 Test Execution

動画データの単体テストを実行:
```bash
npm run test -- src/lib/videos/__tests__/video-data.test.ts
```

**期待される結果**: 全テスト合格

**テスト失敗の場合**:
- `opening.lines`に空文字列がないか確認
- `timestamps.time`の形式が正しいか確認
- 必須フィールドがすべて存在するか確認

---

## Phase 7: Completion Report

### 7.1 Report Structure

以下の形式で完了レポートを提供:

```markdown
✅ 動画メタデータ作成完了

## 📊 動画情報
- **動画ID**: $1
- **タイトル**: 【タイトル】
- **公開日**: YYYY-MM-DD
- **タグ数**: X個
- **タイムスタンプ**: X項目

## 🎬 関連動画の選定結果

### 候補検索（related-videos-finder）
- **候補数**: 10本
- **最高スコア**: 42 (完全一致: 3個, 部分一致: 2個, 類似性: +2pt)

### AI評価と推奨
各候補を以下の観点で評価しました：
- テーマの一致度（ツール、開発手法、技術スタック）
- 内容の補完性（前提知識、発展的内容、シリーズ関係）
- ユーザーにとっての有用性

### ユーザー選択結果
選択された動画（X本）:
1. **【動画タイトル1】** (スコア: 42, 推奨: 高)
   - ID: `video-id-1`
   - 選定理由: 同じClaudeCodeツールを使用し、TDD手法も共通。初心者向けの前提知識として最適。
2. **【動画タイトル2】** (スコア: 35, 推奨: 中)
   - ID: `video-id-2`
   - 選定理由: AI駆動開発という共通テーマだが、使用ツールが異なる。補完的な視点を提供。
3-X. （以降同様）

## 🚀 Udemy講座の自動推薦結果（udemy-course-suggester）
- **推薦講座数**: X件
- **トップ講座**: 【講座タイトル】 (スコア: 48)
  - 完全一致トピック: 3個 (45pt), トピック数ボーナス: 3pt
- **生成URL**: https://www.vibecodingstudio.dev/coupons?topic=claude-code

**推薦理由**: トピック「claude-code」「react」が完全一致し、動画内容に最適

## 📁 作成されたファイル
- ✅ `src/data/videos/$1.ts` - VideoMetadataファイル
- ✅ `src/lib/videos/video-data.ts` - 更新済み（インポート+配列追加）
- ✅ `.tmp/next-video-description.txt` - YouTube概要欄テキスト

## 🔍 品質チェック結果
- ✅ TypeScript型チェック: 合格
- ✅ ESLint: 合格
- ✅ 単体テスト: 合格

## 📝 次のステップ
1. **動画インデックスの更新（必須）**:
   ```bash
   npm run update:video-indexes
   ```
   このコマンドは以下を実行します:
   - 動画インデックスの生成 (`src/data/indexes/video-index.json`)
   - Udemy講座インデックスの生成 (`src/data/indexes/udemy-course-index.json`)
   - インデックスファイルの検証

2. `.tmp/next-video-description.txt`の内容をYouTube Studioの概要欄にコピー

3. 開発サーバーで動作確認:
   ```bash
   npm run dev
   ```
   - `/videos` ページで新動画が表示されるか確認
   - `/videos/$1` ページで全セクションが正しく表示されるか確認

4. Gitコミット:
   ```bash
   git add src/data/videos/$1.ts src/lib/videos/video-data.ts src/data/indexes/ .tmp/next-video-description.txt
   git commit -m "feat: 動画【タイトル】のメタデータを追加"
   ```

🎉 すべての処理が完了しました！
```

### 7.2 Error Summary (if any)

エラーが発生した場合、以下を含める:
- ❌ エラーの種類（型エラー、リントエラー、テスト失敗など）
- 📍 エラー箇所（ファイルと行数）
- 🔧 推奨される修正方法
- 🔄 再実行手順

---

## Error Handling & Troubleshooting

### Common Issues

#### Issue 1: Input File Not Found
**症状**: `.tmp/next-video-info.md`が存在しない

**解決策**:
1. ファイルを作成:
   ```bash
   mkdir -p .tmp
   touch .tmp/next-video-info.md
   ```
2. 動画の情報を記述（タイトル、公開日、タグ、内容など）
3. コマンドを再実行

#### Issue 2: Invalid Video ID
**症状**: 動画IDの形式が不正

**解決策**:
- YouTube URLから正しい動画IDを抽出
- 形式: 英数字とハイフン、アンダースコアのみ（例: `1-1NAB5jIjo`）

#### Issue 3: Missing Tags
**症状**: タグが抽出できない

**解決策**:
1. `.tmp/next-video-info.md`にタグセクションを追加
2. 形式例:
   ```markdown
   ## タグ
   #ClaudeCode #AI駆動開発 #TypeScript
   ```
3. または、ユーザーに手動でタグリストを提供してもらう

#### Issue 4: Sub-Agent Invocation Failure
**症状**: `related-videos-finder`または`udemy-course-suggester`の呼び出しが失敗

**解決策**:
1. エージェントファイルが存在するか確認:
   - `.claude/agents/related-videos-finder.md`
   - `.claude/agents/udemy-course-suggester.md`
2. Task toolが`allowed-tools`に含まれているか確認
3. タグリストが空でないか確認

#### Issue 5: Type Check Failure
**症状**: `npm run type-check`でエラー

**解決策**:
1. エラーメッセージを確認
2. VideoMetadata型定義（`src/types/video.ts`）と照合
3. 不足フィールドや型の不一致を修正
4. 特に注意:
   - `opening.lines`: 空文字列を含めない
   - `timestamps.time`: 正規表現に準拠
   - オプションフィールド: 正しい型を使用

#### Issue 6: Test Failure
**症状**: 動画データテストが失敗

**解決策**:
1. テストエラーメッセージを確認
2. 一般的な原因:
   - `opening.lines`に空文字列
   - `timestamps.time`の形式エラー
   - 必須フィールドの欠落
3. 該当箇所を修正して再テスト

---

## Success Criteria

このコマンドは以下の条件をすべて満たした場合に成功とみなされます:

- [ ] `.tmp/next-video-info.md`から正しく情報を抽出できた
- [ ] `related-videos-finder`エージェントから関連動画3-5本を取得できた
- [ ] `udemy-course-suggester`エージェントからUdemy講座推薦を取得できた
- [ ] `src/data/videos/$1.ts`が正しいVideoMetadata形式で作成された
- [ ] `src/lib/videos/video-data.ts`にインポートと配列追加が完了した
- [ ] `.tmp/next-video-description.txt`にYouTube概要欄が生成された
- [ ] `npm run type-check`が合格した
- [ ] `npm run lint`が合格した
- [ ] `npm run test`が合格した
- [ ] 完了レポートが生成された

---

## Notes

### Integration Points

このコマンドは以下のコンポーネントと統合します:

1. **video-metadata-creator スキル** (`.claude/skills/video-metadata-creator/`)
   - 動画メタデータの構造と規約を理解
   - 品質チェックガイドラインを参照

2. **related-videos-finder エージェント** (`.claude/agents/related-videos-finder.md`)
   - タグベーススコアリングで関連動画を自動選定
   - `src/lib/videos/find-related-videos.ts`を活用

3. **udemy-course-suggester エージェント** (`.claude/agents/udemy-course-suggester.md`)
   - トピックマッチングでUdemy講座を自動推薦
   - `src/lib/videos/suggest-udemy-courses.ts`を活用

4. **動画インデックスシステム** (`.kiro/specs/video-metadata-indexing/`)
   - 関連動画検索とUdemy講座推薦のアルゴリズム
   - インデックスファイル: `src/data/indexes/`

### Workflow Automation Benefits

このコマンドにより以下が自動化されます:

- ✅ 動画情報の手動入力が不要
- ✅ 関連動画の手動検索が不要
- ✅ Udemy講座URLの手動判別が不要
- ✅ 概要欄テキストの手動作成が不要
- ✅ 品質チェックの手動実行が不要
- ✅ 一貫したメタデータ品質の保証

### Performance

- 実行時間: 通常30-60秒（エージェント呼び出し含む）
- 関連動画検索: < 5秒
- Udemy講座推薦: < 3秒
- ファイル生成: < 1秒
- 品質チェック: 10-20秒

---

このコマンドは、動画メタデータ作成のすべてのステップを自動化し、高品質で一貫性のある動画データを効率的に生成します。
