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
   - タイムライン情報（あれば）
   - 特徴・学べること（箇条書きでOK）

2. **既存動画データベースの分析**：
   - `src/data/videos/` 内の全動画ファイルを確認
   - 類似テーマの動画を特定（タグ、タイトル、内容から判別）
   - 関連性の高い動画を3-5本リストアップ

3. **Udemy講座の判別**：
   - 動画内容からメインテーマを抽出（例：Claude Code, Codex, 仕様駆動開発）
   - 適切なクーポンURLを決定：
     - Claude Code系: `?topic=claude-code`
     - Codex系: `?topic=codex`
     - 汎用: クエリパラメータなし

### Step 2: メタデータ構築フェーズ

1. **opening セクション**：
   - 2-5行程度で簡潔に
   - 一文ごとに改行（長文は自然な位置で分割）
   - 箇条書きが必要な場合は中点「・」を使用
   - 空文字列は含めない（テスト要件）

2. **learningPoints セクション**：
   - タイトル: `💡 この動画で学べること` または `💡 この動画の特徴`
   - 各項目は `✅` で始める
   - 4-6項目程度が理想

3. **timestamps セクション**：
   - タイトル: `⏰ タイムライン`
   - 形式: `HH:MM` または `HH:MM:SS`（1時間超の場合）
   - 正規表現: `/^\d{1,2}:\d{2}(:\d{2})?$/`

4. **tags**：
   - ハッシュタグから「#」を除去して配列化
   - 10-15個程度が適切

5. **relatedVideos セクション**（重要）：
   - Step 1で特定した関連動画を3-5本設定
   - 優先順位：
     1. 同じシリーズ・続編
     2. 同じツール・技術スタック
     3. 同じ開発手法（AI駆動開発、仕様駆動開発など）
   - 各動画は `title` と `url` を持つ

6. **udemyCourses セクション**（重要）：
   - title: テーマに応じた適切なタイトル
   - description: Udemy講座で学べることを簡潔に
   - courses: 学べる内容を4-5項目箇条書き
   - cta:
     - text: `🎁 限定クーポンで最大90%OFF!`
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

3. **開発サーバーでの動作確認**（詳細は [reference-quality-check.md](reference-quality-check.md) 参照）：
   - `/videos` ページで新動画が表示されるか
   - `/videos/{動画ID}` ページで全セクションが正しく表示されるか
   - 改行位置が自然で読みやすいか

### Step 5: 完了報告

以下を含む完了レポートを提供：
- ✅ 作成した動画データファイルのパス
- ✅ 選定した関連動画（なぜ選んだか理由も）
- ✅ 設定したUdemy講座URL（なぜそのフィルターか）
- ✅ 品質チェックの結果
- ✅ コミット用のコマンド例

## Reference Documentation

詳細な仕様やパターンは以下のリファレンスを参照してください：

- **[VideoMetadata型構造](reference-video-structure.md)**: 型定義、必須/オプションセクション、各フィールドの詳細
- **[関連コンテンツ判別ガイド](reference-related-content.md)**: 関連動画の選定基準、Udemy講座URLの判別ロジック
- **[品質チェックガイド](reference-quality-check.md)**: テスト方法、動作確認手順、Chrome DevToolsの使用方法

## Examples

実際の動画データ例は [examples/](examples/) ディレクトリを参照してください。

## Best Practices

### 改行位置の最適化

- **一文ごとに改行**: 長い文章は読みづらいので、句点「。」で改行
- **箇条書きは中点で**: 関連する項目は `・項目1`, `・項目2` の形式
- **空文字列は避ける**: opening.lines に空文字列を含めない（テスト失敗の原因）
- **URLは別行**: リンクは必ず改行して独立した行に配置

### 関連動画の選定基準

優先度順：
1. **直接的な続編・シリーズ**: 前編・後編の関係
2. **同じツール**: Claude Code同士、Codex同士など
3. **同じ開発手法**: 仕様駆動開発、AI駆動開発など
4. **同じ技術スタック**: React, Next.js, TypeScriptなど
5. **補完的な内容**: 動画で触れた関連トピック

### Udemy講座URLの判別

| 動画の主要テーマ | クーポンURL |
|---|---|
| Claude Code, MCP, カスタムコマンド | `?topic=claude-code` |
| Codex CLI, GPT-5, OpenAI | `?topic=codex` |
| 汎用・複数ツール | パラメータなし |

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

2. **既存動画の分析**（必須）:
   ```bash
   # 全動画ファイルをリスト
   ls src/data/videos/

   # 類似テーマの動画を検索
   grep -r "キーワード" src/data/videos/
   ```

3. **関連動画の選定**（3-5本）:
   - 同じツール・技術の動画を優先
   - タイトルとタグから関連性を判定

### Phase 2: データ生成

1. **opening作成時の注意**:
   - 空文字列を含めない
   - 一文ごとに改行
   - 2-5行程度

2. **関連動画セクション**（重要）:
   - **必ず5本選定**（3本以上）
   - title と url を正確に設定
   - なぜその動画を選んだか理由を記録

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

2. **Chrome DevToolsでの動作確認**:
   - 開発サーバーを起動
   - `/videos` と `/videos/{動画ID}` を確認
   - スナップショットで全セクションの表示を検証

3. **エラーが出た場合は必ず修正**してから完了報告

### Always Do

- ✅ 既存の動画データを参考にする
- ✅ 関連動画は必ず3-5本選定
- ✅ Udemy講座URLは適切なフィルターを設定
- ✅ テストを実行して全て合格させる
- ✅ 改行位置を最適化して読みやすく
- ✅ 完了時に選定理由を報告

### Never Do

- ❌ 関連動画を選定せずに空にする
- ❌ Udemy講座URLをランダムに設定
- ❌ テストをスキップ
- ❌ 空文字列をopeningに含める
- ❌ 動作確認をせずに完了報告

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
- [ ] timestamps は正しい形式
- [ ] tags は10-15個
- [ ] relatedVideos は3-5本（重要）
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
