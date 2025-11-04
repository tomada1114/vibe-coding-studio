---
description: Update related videos section for an existing video using hybrid approach (candidate search + AI evaluation + user selection)
allowed-tools: Read, Write, Edit, Bash, Task, AskUserQuestion
argument-hint: <youtube-video-id>
model: sonnet
---

# Update Related Videos for Existing Video

既存の動画メタデータの関連動画セクションを、ハイブリッドアプローチ（候補検索 + AI評価 + ユーザー選択）で更新します。

**Target Video ID**: $1

## Background & Purpose

### 課題
新しい動画は古い動画を関連動画として参照できますが、**古い動画は新しい動画のことを知りません**。これにより、関連性の高い動画同士が一方向にしかリンクされず、ユーザーの回遊性が低下します。

### 解決
このコマンドは以下を実現します：
1. **双方向参照の保証**: 動画Bが動画Aを参照している場合、動画Aにも動画Bを追加
2. **関連動画の見直し**: タグベース候補検索 → AI評価 → ユーザー選択
3. **品質の向上**: 機械的なマッチングだけでなく、内容的関連性を考慮

---

## Context Loading

### Target Video
- Video metadata file: `@src/data/videos/$1.ts`
- Video data loader: `@src/lib/videos/video-data.ts`

### Video Index
- All videos index: `@src/data/indexes/video-index.json`

### Type Definition
- VideoMetadata type: `@src/types/video.ts`

---

## Phase 1: Current State Analysis

### 1.1 Target Video Metadata Loading

1. **ファイルの存在確認**:
   ```bash
   [ -f "src/data/videos/$1.ts" ] && echo "✅ EXISTS" || echo "❌ NOT FOUND"
   ```

2. **メタデータ読み込み**:
   - `src/data/videos/$1.ts`を読み込む
   - 以下の情報を抽出：
     - `title`: 動画タイトル
     - `tags`: タグリスト
     - `relatedVideos`: 現在の関連動画（あれば）
     - `opening`: 動画の概要

3. **現在の関連動画を記録**:
   ```typescript
   CurrentRelatedVideos = {
     count: X,
     videos: [
       { id: "video-id-1", title: "タイトル1" },
       // ...
     ]
   }
   ```

### 1.2 Bidirectional Reference Check

**双方向参照の確認**:

1. **全動画データの読み込み**:
   - `src/data/videos/`内の全`.ts`ファイルをリストアップ
   - 各ファイルの`relatedVideos`セクションを確認

2. **逆参照の発見**:
   - 他の動画の`relatedVideos`に動画ID `$1`が含まれているかチェック
   - 見つかった場合、その動画を記録

3. **結果の表示**:
   ```markdown
   ## 双方向参照チェック結果

   **この動画を参照している他の動画**: X本
   1. 動画A (ID: abc123) ← この動画を関連動画として参照
   2. 動画B (ID: def456) ← この動画を関連動画として参照

   **推奨**: これらの動画は関連性が高いと判断されています。候補に含めることを検討してください。
   ```

---

## Phase 2: Related Video Candidate Search

### 2.1 Candidate Search via related-videos-finder Agent

**エージェント呼び出し**:
```markdown
> Use the related-videos-finder agent to find related video candidates for the following tags:
> Tags: [動画のタグリスト]
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
2. **10本の候補**をスコア付きで取得
3. スコアの内訳を確認
4. 双方向参照で見つかった動画が候補に含まれているか確認

---

## Phase 3: AI Evaluation of Candidates

### 3.1 Detailed Analysis of Each Candidate

**各候補動画の詳細分析**:

1. **メタデータ読み込み**:
   - `src/data/videos/{候補動画ID}.ts`を読み込む
   - opening, learningPoints, tags などの詳細情報を取得

2. **現在の動画との関連性を評価**:
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

   **d) 双方向参照の考慮**:
   - Phase 1.2で見つかった逆参照動画か？
   - すでに相互に参照している関係か？

3. **推奨度と理由の付与**:
   各候補に以下を設定：
   - **推奨度**:
     - **高**（強く推奨）: テーマが完全に一致、シリーズ関係、双方向参照
     - **中**（推奨）: 補完的な内容、関連する技術スタック
     - **低**（やや関連）: タグが部分的に一致するが内容は異なる
   - **理由**: 具体的な推奨理由（50-100文字程度）

   **例**:
   ```typescript
   {
     candidate: { id: "abc123", title: "Claude Code初心者ガイド", score: 42 },
     recommendation: "高",
     reason: "同じClaudeCodeツールを使用し、初心者向けの前提知識として最適。動画Bから既に参照されている（双方向）。"
   }
   ```

### 3.2 Evaluation Summary

候補の評価結果をサマリー表示：

```markdown
## AI評価結果サマリー

**評価基準**:
- テーマの一致度（ツール、開発手法、技術スタック）
- 内容の補完性（前提知識、発展的内容、シリーズ関係）
- ユーザーにとっての有用性
- 双方向参照の状況

**推奨度分布**:
- 高: X本（うち双方向参照: Y本）
- 中: X本
- 低: X本

**現在の関連動画との比較**:
- 現在: X本
- 候補から推奨: Y本（高: A本、中: B本、低: C本）
```

---

## Phase 4: User Selection

### 4.1 Present Candidates to User

**AskUserQuestionツールで候補提示**:

1. **質問の構成**:
   ```markdown
   以下の候補から関連動画を選択してください（3-5本を推奨）：

   現在の関連動画: X本
   - 動画A
   - 動画B
   ...

   各候補は以下の形式で表示：
   - タイトル
   - タグベーススコア
   - AI評価：推奨度と理由
   - 双方向参照の有無
   ```

2. **選択肢の形式**:
   ```typescript
   {
     question: "更新後の関連動画を選択してください（複数選択可）",
     header: "関連動画選択",
     multiSelect: true,
     options: [
       {
         label: "動画A (スコア: 42, 推奨: 高, 双方向: ✅)",
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
   - 選択なし（現状維持）も許可

4. **選択結果の確認**:
   ```markdown
   ## ユーザー選択結果

   選択された動画: X本
   1. 動画A (推奨: 高, 双方向: ✅)
      理由: ...
   2. 動画B (推奨: 中)
      理由: ...

   **変更内容**:
   - 追加: Y本
   - 削除: Z本
   - 維持: W本
   ```

---

## Phase 5: Update Video Metadata File

### 5.1 Construct Updated relatedVideos Section

1. **新しいrelatedVideosオブジェクトを構築**:
   ```typescript
   relatedVideos: {
     title: "🎬 関連動画",
     videos: [
       { id: "video-id-1", title: "選択された動画1" },
       { id: "video-id-2", title: "選択された動画2" },
       // ... ユーザーが選択した動画
     ],
   }
   ```

2. **順序の最適化**:
   - 推奨度「高」の動画を優先
   - 双方向参照の動画を上位に配置
   - タグスコアが高い順に並べる

### 5.2 Update Video Metadata File

**Edit toolでファイルを更新**:

1. **既存のrelatedVideosセクションを特定**:
   - `src/data/videos/$1.ts`から現在の`relatedVideos`セクションを検索

2. **セクションの置き換え**:
   - 古い`relatedVideos`を新しいものに置き換え
   - または、relatedVideosが存在しない場合は追加

3. **変更の検証**:
   - 構文エラーがないか確認
   - VideoMetadata型に準拠しているか確認

**例**:
```typescript
// Before
relatedVideos: {
  title: "🎬 関連動画",
  videos: [
    { id: "old-video-1", title: "旧動画1" },
    { id: "old-video-2", title: "旧動画2" },
  ],
}

// After
relatedVideos: {
  title: "🎬 関連動画",
  videos: [
    { id: "new-video-1", title: "新動画1" },
    { id: "new-video-2", title: "新動画2" },
    { id: "new-video-3", title: "新動画3" },
  ],
}
```

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
- VideoMetadata構造の問題を確認
- 必須フィールドがすべて存在するか確認

---

## Phase 7: Completion Report

### 7.1 Report Structure

以下の形式で完了レポートを提供:

```markdown
✅ 関連動画の更新完了

## 📊 動画情報
- **動画ID**: $1
- **タイトル**: 【タイトル】
- **タグ**: X個

## 🔄 双方向参照チェック結果
- **この動画を参照している動画**: X本
  1. 動画A (ID: abc123)
  2. 動画B (ID: def456)

## 🎬 関連動画候補の検索結果
- **候補数**: 10本
- **最高スコア**: 42 (完全一致: 3個, 部分一致: 2個, 類似性: +2pt)

## 🤖 AI評価結果
- **推奨度「高」**: X本（うち双方向参照: Y本）
- **推奨度「中」**: X本
- **推奨度「低」**: X本

## 👤 ユーザー選択結果
選択された動画（X本）:
1. **【動画タイトル1】** (スコア: 42, 推奨: 高, 双方向: ✅)
   - ID: `video-id-1`
   - 選定理由: 同じClaudeCodeツールを使用し、TDD手法も共通。初心者向けの前提知識として最適。
2. **【動画タイトル2】** (スコア: 35, 推奨: 中)
   - ID: `video-id-2`
   - 選定理由: AI駆動開発という共通テーマだが、使用ツールが異なる。補完的な視点を提供。
3-X. （以降同様）

## 📝 変更内容
- **追加**: Y本
- **削除**: Z本
- **維持**: W本

**更新前**: X本
**更新後**: X本

## 📁 更新されたファイル
- ✅ `src/data/videos/$1.ts` - relatedVideosセクション更新

## 🔍 品質チェック結果
- ✅ TypeScript型チェック: 合格
- ✅ ESLint: 合格
- ✅ 単体テスト: 合格

## 📝 次のステップ

1. **動画インデックスの更新（推奨）**:
   ```bash
   npm run update:video-indexes
   ```

2. **開発サーバーで動作確認**:
   ```bash
   npm run dev
   ```
   - `/videos/$1` ページで関連動画セクションが正しく表示されるか確認

3. **Gitコミット**:
   ```bash
   git add src/data/videos/$1.ts
   git commit -m "refactor: 動画【タイトル】の関連動画を更新"
   ```

🎉 関連動画の更新が完了しました！
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

#### Issue 1: Video File Not Found
**症状**: `src/data/videos/$1.ts`が存在しない

**解決策**:
1. 動画IDが正しいか確認
2. ファイルが実際に存在するか確認:
   ```bash
   ls -la src/data/videos/$1.ts
   ```
3. 正しい動画IDを指定して再実行

#### Issue 2: No Candidates Found
**症状**: related-videos-finderが候補を返さない

**解決策**:
1. 動画のタグが適切に設定されているか確認
2. 動画インデックスが最新か確認:
   ```bash
   npm run update:video-indexes
   ```
3. タグを追加または修正して再実行

#### Issue 3: User Selects No Videos
**症状**: ユーザーが何も選択しなかった

**対応**:
- 現在の関連動画を維持
- 変更なしとして完了報告
- ファイルは更新しない

#### Issue 4: Type Check Failure
**症状**: `npm run type-check`でエラー

**解決策**:
1. エラーメッセージを確認
2. VideoMetadata型定義（`src/types/video.ts`）と照合
3. 不足フィールドや型の不一致を修正
4. 特に注意:
   - `relatedVideos.videos`: 配列形式
   - `id`と`title`が必須

#### Issue 5: Bidirectional Reference Loop
**症状**: 動画A → 動画B → 動画A のような循環参照

**対応**:
- これは正常な双方向参照です
- 問題ありません（相互に参照し合う関係）

---

## Success Criteria

このコマンドは以下の条件をすべて満たした場合に成功とみなされます:

- [ ] 動画メタデータファイルが正しく読み込めた
- [ ] 双方向参照チェックが完了した
- [ ] `related-videos-finder`エージェントから候補10本を取得できた
- [ ] 各候補のAI評価が完了した（推奨度と理由）
- [ ] ユーザーに候補を提示し、選択を受領できた
- [ ] `src/data/videos/$1.ts`のrelatedVideosセクションが更新された
- [ ] `npm run type-check`が合格した
- [ ] `npm run lint`が合格した
- [ ] `npm run test`が合格した
- [ ] 完了レポートが生成された

---

## Notes

### Integration Points

このコマンドは以下のコンポーネントと統合します:

1. **related-videos-finder エージェント** (`.claude/agents/related-videos-finder.md`)
   - タグベーススコアリングで候補10本を取得
   - 詳細情報（タグ、公開日、URL）を含む

2. **動画インデックスシステム** (`.kiro/specs/video-metadata-indexing/`)
   - 関連動画検索アルゴリズム
   - インデックスファイル: `src/data/indexes/video-index.json`

3. **VideoMetadata型** (`src/types/video.ts`)
   - 型安全性の保証

### Design Principles

1. **ハイブリッドアプローチ**:
   - 機械的な候補検索（効率性）
   - AI判断による評価（品質）
   - ユーザー選択（最終決定権）

2. **双方向参照の重視**:
   - 新旧動画の相互リンクを保証
   - ユーザーの回遊性を向上

3. **透明性**:
   - AI評価の理由を明示
   - 変更内容を詳細に報告

### Performance

- 実行時間: 通常60-90秒
  - メタデータ読み込み: < 5秒
  - 双方向参照チェック: < 10秒
  - 候補検索: < 5秒
  - AI評価: 20-30秒
  - ユーザー選択: 変動
  - ファイル更新: < 1秒
  - 品質チェック: 10-20秒

### Future Enhancements

1. **一括更新モード**: 全動画の関連動画を一括で見直す
2. **自動双方向リンク**: 動画Aが動画Bを参照したら、自動で動画Bにも動画Aを追加
3. **関連度スコア表示**: AI評価を数値化して表示
4. **変更履歴の記録**: どの動画がいつ更新されたかを記録

---

このコマンドにより、既存動画の関連動画セクションを最新の状態に保ち、双方向の関連性を保証できます。
