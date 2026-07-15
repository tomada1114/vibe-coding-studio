---
name: video-metadata-creator
description: YouTube動画のメタデータ（VideoMetadata）を作成・追加するスキル。ざっくりとした動画情報から、過去の動画との関連性を分析し、適切な関連動画・Udemy講座セクション・改行位置を判別して、自然で読みやすいメタデータを生成します。動画データ追加、YouTube概要欄作成、関連コンテンツ設定時に使用してください。
---

# Video Metadata Creator

YouTube動画のメタデータ（VideoMetadata）を効率的に作成・追加するためのスキルです。

動画の概要や内容をざっくりと提供するだけで、過去の動画データベースを分析して最適な関連動画とUdemy講座を自動選定し、読みやすい改行位置で自然な文章を構成します。

## When to Use This Skill

このスキルは以下のシーンで使用してください：

- 新しいYouTube動画のメタデータを作成する時
- YouTube概要欄用のテキストを生成する時
- 動画の関連コンテンツ（関連動画・Udemy講座）を設定する時
- 既存の動画メタデータを更新・改善する時
- 動画データの改行位置や文章構成を最適化する時

## Core Philosophy

### 1. 自動化と知的判別

ユーザーがざっくりとした情報を提供するだけで：
- **過去の動画との関連性を自動分析**：既存の30本の動画から、テーマやタグの類似度で関連動画を選定
- **適切なUdemy講座を自動判別**：動画内容に応じたクーポンURLやフィルター条件を設定
- **自然な改行位置を判別**：一文ごとの改行、箇条書きの構造化など、読みやすさを最適化

### 2. 品質とメンテナビリティ

- **型安全性の保証**：VideoMetadata型に完全準拠したデータ生成
- **テストの自動実行**：型チェック・リント・テストを実行して品質を担保
- **動作確認の徹底**：開発サーバーでの表示確認まで完遂

### 3. 一貫性のあるフォーマット

- **既存パターンの踏襲**：過去の動画データの構造やスタイルを分析して統一
- **セクション構成の標準化**：必須セクションとオプションセクションを適切に配置

## Instructions

### Step 1: 情報収集フェーズ

1. **ユーザーから以下の情報を取得**：
   - YouTube動画ID（例：`1-1NAB5jIjo`）
   - 動画タイトル
   - 公開日または公開予定日
   - 動画の概要・内容（ざっくりでOK）
   - 特徴・学べること（箇条書きでOK）

2. **関連動画候補の取得**（サブエージェント活用）：
   - **`related-videos-finder`エージェントを使用**して候補を10本取得
   - 動画のタグリストを入力として提供
   - タグベーススコアリングで初期フィルタリング
   - 各候補の詳細情報（タグ、公開日、URL）を取得

3. **AI判断による関連性評価**：
   - 各候補動画のメタデータを読み込み（`src/data/videos/*.ts`）
   - 新しい動画の内容と比較して関連性を評価：
     - テーマの一致度（ツール、開発手法、技術スタック）
     - 内容の補完性（前提知識、発展的内容、シリーズ関係）
     - ユーザーにとっての有用性
   - 各候補に推奨度（高/中/低）と理由を付与

4. **ユーザー選択**：
   - AskUserQuestionツールで候補を提示
   - 各候補について、タグベーススコア、推奨度、理由を表示
   - ユーザーが3-5本を選択（multiSelect: true）
   - 選択結果を記録

5. **Udemy講座の自動推薦**（サブエージェント活用）：
   - **`udemy-course-suggester`エージェントを使用**して最適な講座を推薦
   - 動画のタグリストから自動でトピックマッチング
   - フィルター付きURLを自動生成（例：`?topic=claude-code`）
   - 推薦講座の詳細（タイトル、説明、URL）を取得

### Step 2: メタデータ構築フェーズ

1. **opening セクション**：
   - 2-5行程度で簡潔に
   - 一文ごとに改行（長文は自然な位置で分割）
   - 箇条書きが必要な場合は中点「・」を使用
   - 空文字列は含めない（テスト要件）

2. **learningPoints セクション**：
   - タイトル: `💡 この動画で学べること` または `💡 動画のポイント`
   - 各項目は `・` で始める
   - 4-6項目程度が理想

3. **timestamps セクション**（省略可）：
   - タイムスタンプはコスパの観点から省略して構わない
   - ユーザーが明示的に提供した場合のみ設定
   - 形式: `HH:MM` または `HH:MM:SS`、正規表現: `/^\d{1,2}:\d{2}(:\d{2})?$/`

4. **tags**：
   - ハッシュタグから「#」を除去して配列化
   - 10-15個程度が適切

5. **relatedVideos セクション**（重要）：
   - Step 1でユーザーが選択した関連動画を設定
   - 選択された動画はAI評価と推奨理由に基づいている
   - 各動画は `title` と `url` を持つ
   - 完了報告に選定理由を含める

6. **udemyCourses セクション**（重要）：
   - title: テーマに応じた適切なタイトル
   - description: Udemy講座で学べることを簡潔に
   - courses: 学べる内容を4-5項目箇条書き
   - cta:
     - text: `限定クーポンで最大90%OFF！`（絵文字なし）
     - url: Step 1で判別したクーポンURL

7. **customSections**：
   - type: `text`（URLを含む場合）
   - content: 改行 `\n` で区切る
   - リンクは別行に配置

### Step 3: ファイル生成フェーズ

1. **動画データファイルの作成**：
   - ファイル名: `src/data/videos/{動画ID}.ts`
   - export名: `video_{動画ID（ハイフンをアンダースコアに）}`
   - 例：`1-1NAB5jIjo.ts` → `export const video_1_1NAB5jIjo`

2. **video-data.tsへの登録**：
   - `src/lib/videos/video-data.ts`にimport追加
   - `allVideosData`配列に追加

### Step 4: 品質チェックフェーズ

1. **型チェックとリント**：
   ```bash
   npm run type-check
   npm run lint
   ```

2. **テスト実行**：
   ```bash
   npm run test -- src/lib/videos/__tests__/video-data.test.ts
   ```

3. **開発サーバーでの動作確認**（オプション、詳細は [reference-quality-check.md](reference-quality-check.md) 参照）：
   - 時間に余裕がある場合のみ実施
   - `/videos` ページで新動画が表示されるか
   - `/videos/{動画ID}` ページで全セクションが正しく表示されるか

### Step 5: 完了報告

以下を含む完了レポートを提供：
- ✅ 作成した動画データファイルのパス
- ✅ 選定した関連動画（なぜ選んだか理由も）
- ✅ 設定したUdemy講座URL（なぜそのフィルターか）
- ✅ 品質チェックの結果
- ✅ コミット用のコマンド例

## Available Sub-Agents

このスキルは以下のサブエージェントを活用します：

### 1. related-videos-finder

**場所**: `.claude/agents/related-videos-finder.md`

**機能**:
- タグベースのスコアリングアルゴリズムで関連動画を検索
- `src/lib/videos/find-related-videos.ts`の`findRelatedVideos()`関数を活用
- 完全一致（10pt）、部分一致（5pt）、タグ数類似性（+2pt）でスコアリング
- 上位3-5本の関連動画を返却

**呼び出し方法**:
```markdown
> Use the related-videos-finder agent to find related videos for the following tags:
> Tags: ["ClaudeCode", "AI駆動開発", "TypeScript"]
> Current Video ID: "1-1NAB5jIjo"
```

**出力形式**:
```typescript
RelatedVideo[] = [
  { id: "video-id", title: "動画タイトル", score: 42 },
  // ... 上位3-5本
]
```

### 2. udemy-course-suggester

**場所**: `.claude/agents/udemy-course-suggester.md`

**機能**:
- タグベースのトピックマッチングで最適なUdemy講座を推薦
- `src/lib/videos/suggest-udemy-courses.ts`の`suggestUdemyCourses()`関数を活用
- 完全一致（15pt）、部分一致（7pt）、トピック数ボーナス（×1pt）でスコアリング
- フィルター付きURL自動生成（例：`/coupons?topic=claude-code`）

**呼び出し方法**:
```markdown
> Use the udemy-course-suggester agent to suggest Udemy courses for the following tags:
> Tags: ["ClaudeCode", "React", "Next.js"]
```

**出力形式**:
```typescript
UdemyCoursesSection = {
  title: "🚀 体系的に学びたい方へ",
  description: "この動画に関連するUdemy講座をご用意しています：",
  courses: ["・講座タイトル1", "・講座タイトル2"],
  cta: {
    text: "Udemy講座を見る",
    url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code"
  }
}
```

## Reference Documentation

詳細な仕様やパターンは以下のリファレンスを参照してください：

- **[VideoMetadata型構造](reference-video-structure.md)**: 型定義、必須/オプションセクション、各フィールドの詳細
- **[関連コンテンツ判別ガイド](reference-related-content.md)**: 関連動画の選定基準、Udemy講座URLの判別ロジック
- **[品質チェックガイド](reference-quality-check.md)**: テスト方法、動作確認手順、Claude in Chromeの使用方法

## Examples

実際の動画データ例は [examples/](examples/) ディレクトリを参照してください。

## Best Practices

### 改行位置の最適化

- **一文ごとに改行**: 長い文章は読みづらいので、句点「。」で改行
- **箇条書きは中点で**: 関連する項目は `・項目1`, `・項目2` の形式
- **空文字列は避ける**: opening.lines に空文字列を含めない（テスト失敗の原因）
- **URLは別行**: リンクは必ず改行して独立した行に配置

### 関連動画の選定（ハイブリッドアプローチ）

**ステップ1: 候補取得（related-videos-finder活用）**:
```markdown
> Use the related-videos-finder agent to find related video candidates
> Tags: ["ClaudeCode", "AI駆動開発", "TypeScript"]
> Current Video ID: "1-1NAB5jIjo"
> Limit: 10
```

**スコアリング基準（エージェント内部処理）**:
- 完全一致タグ: 10ポイント/タグ
- 部分一致タグ: 5ポイント/タグ
- タグ数類似性: ±2以内で+2ポイント

**ステップ2: AI判断による評価**:
各候補を以下の観点で分析：

1. **テーマの一致度**:
   - 同じツール（Claude Code、Cursor、Codexなど）
   - 同じ開発手法（AI駆動開発、TDD、仕様駆動開発など）
   - 同じ技術スタック（React、Next.js、TypeScriptなど）

2. **内容の補完性**:
   - 前提知識（初心者向け → 応用編）
   - 発展的内容（基礎編 → 実践編）
   - シリーズ関係（前編・後編、パート1・パート2）

3. **ユーザーにとっての有用性**:
   - この動画を見た人が次に見たくなる内容か
   - 学習の流れとして自然か
   - 補完的な知識を提供できるか

**各候補に付与**:
- **推奨度**: 高（強く推奨）、中（推奨）、低（やや関連）
- **理由**: 具体的な推奨理由（50-100文字）

**ステップ3: ユーザー選択**:
- AskUserQuestionツールで候補を提示
- 各候補の情報（タイトル、スコア、推奨度、理由）を表示
- ユーザーが3-5本を選択（multiSelect: true）
- 選択結果を記録し、完了報告に含める

### Udemy講座の自動推薦（udemy-course-suggester活用）

**使用方法**:
```markdown
> Use the udemy-course-suggester agent to suggest Udemy courses
> Tags: ["ClaudeCode", "React", "Next.js"]
```

**スコアリング基準（エージェント内部処理）**:
- 完全一致トピック: 15ポイント/トピック
- 部分一致トピック: 7ポイント/トピック
- トピック数ボーナス: トピック数×1ポイント

**URL生成ルール**（エージェント自動処理）:
| 推薦講座の状況 | 生成されるURL |
|---|---|
| 複数講座が一致 | `?topic={最もスコアの高い講座のトピック}` |
| 1件のみ一致 | 講座の直接URL（promotionUrl） |
| 一致なし | デフォルト `/coupons` |

**エージェント出力を活用**:
- 返された`UdemyCoursesSection`をそのまま使用
- フィルター付きURLは自動生成される
- トピックマッピングの説明を完了報告に含める

### タグの付け方

- **ツール名**: `ClaudeCode`, `CodexCLI`, `Cursor`
- **技術**: `AI駆動開発`, `仕様駆動開発`, `バイブコーディング`
- **言語・FW**: `TypeScript`, `React`, `NextJS`
- **カテゴリ**: `個人開発`, `チーム開発`, `初心者向け`

## Troubleshooting

### Issue: テストが失敗する

**症状**: `opening.lines` に空文字列があるエラー
```
expect(line.length).toBeGreaterThan(0)
Expected: > 0
Received: 0
```

**解決策**: opening.lines から空文字列を削除
```typescript
// ❌ BAD
lines: [
  "文章1",
  "",  // 空文字列
  "文章2"
]

// ✅ GOOD
lines: [
  "文章1",
  "文章2"
]
```

### Issue: タイムスタンプ形式エラー

**症状**: `expect(ts.time).toMatch(/^\d{1,2}:\d{2}(:\d{2})?$/)`

**解決策**: 正しい形式を使用
- ✅ `00:00` (MM:SS)
- ✅ `12:34` (MM:SS)
- ✅ `1:23:45` (H:MM:SS)
- ✅ `01:23:45` (HH:MM:SS)
- ❌ `1:2:3` (ゼロパディングなし)

### Issue: 関連動画が見つからない

**解決策**:
1. `src/data/videos/` 内の全ファイルを grep で検索
2. タイトルやタグから類似性を判定
3. 類似動画がない場合は、広いカテゴリ（AI駆動開発全般など）から選定

### Issue: 改行位置が不自然

**解決策**:
1. 一文が長すぎる場合は句点で分割
2. 箇条書きは中点で統一
3. URLは必ず別行に

## AI Assistant Instructions

このスキルが起動された時、以下の手順で作業を進めてください：

### Phase 1: 準備・分析

1. **必ずユーザーに確認**:
   - YouTube動画ID
   - 公開日（未公開の場合は仮日付を提案）
   - 動画の概要（ざっくりでOK）

2. **関連動画候補の取得**（必須）:
   - **`related-videos-finder`エージェントを呼び出す**:
     ```markdown
     > Use the related-videos-finder agent to find related video candidates for the following tags:
     > Tags: ["タグ1", "タグ2", "タグ3"]
     > Current Video ID: "{動画ID}"
     > Limit: 10
     ```
   - エージェントが返す候補リスト（10本）を取得
   - スコアの内訳を確認

3. **AI判断による関連性評価**（必須）:
   - 各候補動画のメタデータを読み込む（`src/data/videos/{id}.ts`）
   - 新しい動画の内容と比較して関連性を評価：
     - テーマの一致度（ツール、開発手法、技術スタック）
     - 内容の補完性（前提知識、発展的内容、シリーズ関係）
     - ユーザーにとっての有用性
   - 各候補に推奨度（高/中/低）と理由を付与

4. **ユーザー選択**（必須）:
   - AskUserQuestionツールで候補を提示
   - multiSelect: true で複数選択可能に
   - 各候補の情報を表示：
     - タイトル
     - タグベーススコア
     - AI推奨度と理由
   - ユーザーから選択結果を受領（3-5本推奨）

5. **Udemy講座の自動推薦**（必須）:
   - **`udemy-course-suggester`エージェントを呼び出す**:
     ```markdown
     > Use the udemy-course-suggester agent to suggest Udemy courses for the following tags:
     > Tags: ["タグ1", "タグ2", "タグ3"]
     ```
   - エージェントが返す`UdemyCoursesSection`形式のデータを取得
   - フィルター付きURLとトピックマッピングを確認

### Phase 2: データ生成

1. **opening作成時の注意**:
   - 空文字列を含めない
   - 一文ごとに改行
   - 2-5行程度

2. **関連動画セクション**（重要）:
   - **ユーザーが選択した動画を設定**（通常3-5本）
   - title と url を正確に設定
   - AI評価の推奨度と理由を完了報告に記録

3. **Udemy講座セクション**（重要）:
   - 動画テーマからクーポンURLを判別
   - courses は具体的な学習内容を4-5項目

### Phase 3: 品質保証

1. **必ず実行**:
   ```bash
   npm run type-check
   npm run lint
   npm run test -- src/lib/videos/__tests__/video-data.test.ts
   ```

2. **エラーが出た場合は必ず修正**してから完了報告

3. **開発サーバーでの動作確認**（オプション）:
   - ユーザーから依頼があった場合のみ実施

### Always Do

- ✅ **サブエージェントを活用**して関連動画候補とUdemy講座を選定
  - `related-videos-finder`で候補10本を取得
  - 各候補のAI評価を実施（推奨度と理由）
  - AskUserQuestionでユーザーに選択してもらう
  - `udemy-course-suggester`でUdemy講座を推薦
- ✅ エージェントが返すスコアと評価理由を確認
- ✅ 関連動画はユーザー選択に基づいて設定（通常3-5本）
- ✅ Udemy講座URLはエージェントが生成したフィルター付きURLを使用
- ✅ テストを実行して全て合格させる
- ✅ 改行位置を最適化して読みやすく
- ✅ 完了時にAI評価とユーザー選択結果を報告

### Never Do

- ❌ サブエージェントを使わずに手動で関連動画を選定する
- ❌ AI評価をスキップしてランダムに候補を提示する
- ❌ ユーザー選択をスキップして自動選定する
- ❌ テストをスキップ
- ❌ 空文字列をopeningに含める
- ❌ タイムスタンプを自前で推定して生成する（ユーザー提供のもののみ使用）
- ❌ AI評価の理由を報告しない

## Quick Reference

### ファイル構成

```
src/
├── data/videos/
│   └── {動画ID}.ts          # 新規作成
├── lib/videos/
│   ├── video-data.ts        # import追加
│   └── __tests__/
│       └── video-data.test.ts
└── types/
    └── video.ts             # VideoMetadata型定義
```

### 必須チェックリスト

作成時に確認：

- [ ] 動画ID、タイトル、公開日を設定
- [ ] opening は2-5行、空文字列なし
- [ ] learningPoints は4-6項目
- [ ] timestamps は省略可（ユーザー提供時のみ、正しい形式で）
- [ ] tags は10-15個
- [ ] relatedVideos はユーザー選択済み（通常3-5本、重要）
- [ ] AI評価の推奨度と理由を記録
- [ ] udemyCourses URLは適切なフィルター（重要）
- [ ] customSections はtextタイプでURLは別行
- [ ] video-data.tsにimportと配列追加
- [ ] `npm run type-check` 合格
- [ ] `npm run lint` 合格
- [ ] `npm run test` 合格
- [ ] 開発サーバーで表示確認
- [ ] 完了報告に選定理由を記載

---

このスキルを使用することで、一貫性があり高品質な動画メタデータを効率的に作成できます。
