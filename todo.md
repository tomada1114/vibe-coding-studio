# 動画メタデータインデックスシステム改善

## 背景・課題

### 現状の問題点
1. **トークン消費が大きい**
   - 毎回29動画ファイル（156KB、約2,953行）を全て読み込む必要がある
   - 1回の実行で約59,000トークン消費（コンテキストウィンドウの30%）
   - 動画が50本、100本と増えると線形的にコストが増加

2. **実行速度が遅い**
   - 29回のファイル読み込み操作
   - 関連動画選定でO(n×m)の複雑度
   - スキル実行に5-10秒かかる

3. **情報が分散している**
   - Udemy講座情報が各動画ファイルに分散
   - 判別ロジックが重複
   - カテゴリやタグによる高速検索ができない

### 影響を受けるスキル
- `.claude/skills/video-metadata-creator/` - 新しい動画メタデータを作成する際に全動画を分析

## 解決策：インデックスベースシステム

### コアアイデア
全動画の軽量メタデータをインデックスファイルにまとめ、詳細情報が必要な場合のみ個別ファイルを読み込む

### 期待される効果
- ✅ **トークン使用量: 96%削減**（59,000 → 2,500トークン）
- ✅ **ファイル読み込み: 97%削減**（29回 → 1回）
- ✅ **実行速度: 80%短縮**（5-10秒 → 1-2秒）
- ✅ **スケーラビリティ**: 動画100本でも同じコスト
- ✅ **保守性向上**: Udemy講座情報の一元管理

## 実装タスク

### ユーザー選択の方針
- インデックス形式: **TypeScript**（型安全性優先）
- 同期管理: **Git pre-commitフック**（自動更新）
- 関連動画: **自動スコアリング**（完全自動化）
- 優先実装:
  1. トークン削減（インデックス生成）
  2. CI/CD検証パイプライン
  3. 関連動画検索の最適化
  4. Udemy講座情報の一元化

### Phase 1: TypeScript形式のインデックス作成 ⭐最優先
- [ ] `src/data/videos/video-index.ts` 作成
  - `VideoIndexEntry` インターフェース定義
  - カテゴリEnum定義（tools, methods, tech, audience）
- [ ] `scripts/generate-video-index.ts` 作成
  - 全29動画を解析してインデックス生成
  - カテゴリ自動分類ロジック
- [ ] `npm run update-video-index` コマンド追加
- [ ] 初回インデックス生成と検証

**期待効果**: 156KB → 約10KB、59,000トークン → 2,500トークン

### Phase 2: Udemy講座情報の一元化
- [ ] `src/data/shared/udemy-courses.ts` 作成
  - `UdemyCourse` インターフェース定義
  - 3種類の講座情報を集約（claude-code, codex, general）
- [ ] `selectUdemyCourse()` 関数実装
  - タグ・カテゴリから適切な講座を自動選定
- [ ] ユニットテスト追加

**期待効果**: 講座情報の更新が1箇所で完結、保守性向上

### Phase 3: 関連動画検索の最適化
- [ ] `src/lib/videos/related-video-finder.ts` 作成
  - スコアリングシステム実装
    - 同じツール: +8点
    - 同じ手法: +6点
    - 同じ技術: +4点
    - 共通タグ: +1点/タグ
  - `findRelatedVideos()` 関数：インデックスから高速検索
- [ ] インデックスローダー実装
  - Map/Set構造でO(1)アクセス
- [ ] ユニットテスト追加

**期待効果**: 検索がO(n×m) → O(n)に改善、実行時間80%短縮

### Phase 4: 自動同期管理
- [ ] **Git pre-commitフック設定**
  - `.husky/pre-commit` に `npm run update-video-index` 追加
  - 動画ファイル変更時に自動でインデックス更新
  - 更新されたインデックスを自動でgit add
- [ ] **CI/CD検証パイプライン**
  - `.github/workflows/validate-video-index.yml` 作成
  - PR時にインデックスと実データの同期を検証
  - 差分があれば警告を表示

**期待効果**: インデックス更新忘れゼロ、長期的な保守性確保

### Phase 5: スキル更新
- [ ] `video-metadata-creator` スキル更新
  - インデックスベースの検索に変更
  - 全動画ファイル読み込みを削除
  - Udemy講座選定を関数化したロジックに置き換え
- [ ] リファレンスドキュメント更新
- [ ] 動作確認
  - 実行時間計測
  - トークン使用量計測
  - 既存動画との整合性確認

### Phase 6: テスト・ドキュメント
- [ ] テスト追加
  - インデックス生成スクリプトのテスト
  - 関連動画検索のテスト
  - Udemy講座選定のテスト
  - インデックスと実データの整合性テスト
- [ ] ドキュメント更新
  - `CLAUDE.md` に新しいワークフロー追記
  - スキルの `SKILL.md` 更新
  - 動画追加手順の更新

## 技術仕様（詳細）

### 動画インデックス構造

```typescript
interface VideoIndexEntry {
  id: string
  title: string
  publishedAt: string
  tags: string[]
  categories: {
    tools: string[]      // ["ClaudeCode", "CodexCLI"]
    methods: string[]    // ["仕様駆動開発", "AI駆動開発"]
    tech?: string[]      // ["React", "TypeScript"]
    audience?: string[]  // ["初心者", "実践者"]
  }
  relatedVideoIds: string[]
  udemyCourseFilter: "claude-code" | "codex" | null
  hasRelatedVideos: boolean
  hasUdemyCourses: boolean
}
```

### タグ分析結果（参考）

最頻出タグ（29動画中）:
1. `AI駆動開発` (27本, 93%)
2. `VibeCoding`, `バイブコーディング` (26本, 90%)
3. `ClaudeCode` (17本, 59%)
4. `プログラミング` (18本, 62%)
5. `CodexCLI` (7本, 24%)

### Udemy講座URL判別ロジック

```typescript
if (含む: ClaudeCode, MCP, カスタムコマンド) {
  → "claude-code" (9動画)
} else if (含む: Codex, GPT-5, GPT5) {
  → "codex" (6動画)
} else {
  → null (汎用, 9動画)
}
```

## リスク・考慮事項

### リスク
1. **pre-commitフックでコミット時間が1-2秒増加**
   - 対策: スクリプトを高速化、並列処理
   - 許容範囲: 1-2秒は実用上問題なし

2. **既存の関連動画選定との整合性**
   - 対策: 段階的移行、手動選定と自動選定の比較テスト
   - 既存の選定を参考データとして活用

3. **インデックスと実データの同期ズレ**
   - 対策: CI/CD検証、pre-commitフック
   - テストで動画数の一致を確認

### 保守性向上のポイント
- カテゴリ分類ルールをドキュメント化
- スコアリング重みは定数で管理（調整容易）
- インデックス生成は冪等性を保証

## 関連ファイル

### 既存ファイル
- `src/data/videos/` - 29個の動画データファイル（156KB）
- `src/lib/videos/video-data.ts` - 動画データローダー
- `src/types/video.ts` - VideoMetadata型定義
- `.claude/skills/video-metadata-creator/` - 動画メタデータ作成スキル

### 新規作成予定
- `src/data/videos/video-index.ts` - 動画インデックス（約10KB）
- `src/data/shared/udemy-courses.ts` - Udemy講座情報
- `src/lib/videos/related-video-finder.ts` - 関連動画検索
- `src/lib/videos/video-index-loader.ts` - インデックスローダー
- `scripts/generate-video-index.ts` - インデックス生成スクリプト
- `.husky/pre-commit` - Git フック
- `.github/workflows/validate-video-index.yml` - CI/CD検証

## 参考情報

### 現状のパフォーマンス指標
- 総動画数: 29本
- 総ファイルサイズ: 156KB
- 総行数: 2,953行（平均102行/ファイル）
- トークン使用量: 約59,000トークン/回
- スキル実行時間: 5-10秒

### 改善後の目標指標
- インデックスサイズ: 約10KB（97%削減）
- トークン使用量: 約2,500トークン（96%削減）
- ファイル読み込み: 1回（97%削減）
- スキル実行時間: 1-2秒（80%短縮）

---

**作成日**: 2025-11-04
**ステータス**: 計画策定完了、実装待ち
**推定工数**: 6-8時間（フェーズ1-6の合計）
