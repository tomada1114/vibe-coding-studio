# Related Content Selection Guide

このドキュメントでは、関連動画とUdemy講座セクションの適切な選定方法について説明します。

## 関連動画の選定

### 基本原則

**目的**: 視聴者が次に見るべき動画を提案し、学習の連続性を作る

**数量**: **必ず3-5本を選定**（5本推奨）

**優先順位の高い順**:

1. **直接的な続編・シリーズ動画** (最優先)
2. **同じツール・プロダクトの動画**
3. **同じ開発手法・コンセプトの動画**
4. **同じ技術スタック・言語の動画**
5. **補完的なトピックの動画**

### 選定の手順

#### Step 1: 新動画のテーマ分析

新しい動画から以下を抽出：

- **主要ツール**: Claude Code, Codex CLI, Cursor, etc.
- **開発手法**: 仕様駆動開発, AI駆動開発, バイブコーディング
- **技術スタック**: TypeScript, React, Next.js, etc.
- **対象者**: 初心者, 実践者, 上級者
- **カテゴリ**: 個人開発, チーム開発, チュートリアル

#### Step 2: 既存動画の検索

```bash
# タイトルからキーワード検索
grep -r "Claude Code" src/data/videos/*.ts

# タグから検索
grep -r "tags:" src/data/videos/*.ts | grep "AI駆動開発"

# 全動画のリスト表示
ls src/data/videos/
```

#### Step 3: 関連性スコアリング

各候補動画に対して以下の基準でスコアリング：

| 基準 | スコア | 例 |
|------|--------|-----|
| **同じシリーズ** | +10 | 「前編」と「後編」 |
| **同じツール** | +8 | 両方とも Claude Code 解説 |
| **同じ開発手法** | +6 | 両方とも仕様駆動開発 |
| **同じ技術スタック** | +4 | 両方とも React/TypeScript |
| **補完的トピック** | +3 | Claude Code + MCP連携 |
| **同じ対象者レベル** | +2 | 両方とも初心者向け |

**スコア合計が高い順に3-5本選定**

### 具体例: 「リアルなAI駆動開発の全工程」の場合

**新動画のテーマ**:
- 主要ツール: Claude Code, cc-sdd
- 開発手法: 仕様駆動開発, AI駆動開発
- 技術: カスタムコマンド
- カテゴリ: 実践的プログラミング

**選定プロセス**:

1. **HM0SLThgXqE** (スコア: 18)
   - 同じツール: cc-sdd (+8)
   - 同じ開発手法: 仕様駆動開発 (+6)
   - 補完的: cc-sddの基礎解説 (+3)
   - 判定: **選定** ✅（最も関連性が高い）

2. **1EQllS_3TJo** (スコア: 14)
   - 同じ開発手法: 仕様駆動開発 (+6)
   - 補完的: Codex版の仕様駆動開発 (+3)
   - 同じカテゴリ: 実践的プログラミング (+2)
   - 同じ技術: カスタムコマンド (+3)
   - 判定: **選定** ✅

3. **Xr_HhLuzOy8** (スコア: 12)
   - 同じツール: Claude Code (+8)
   - 補完的: Claude Codeの基礎 (+3)
   - 判定: **選定** ✅（初心者が見るべき基礎動画）

4. **SO5qov2qTUE** (スコア: 11)
   - 同じツール: Claude Code (+8)
   - 補完的: 開発ルール設定 (+3)
   - 判定: **選定** ✅

5. **1LP4ZAsU_UI** (スコア: 10)
   - 同じ開発手法: AI駆動開発 (+6)
   - 補完的: Git運用術 (+3)
   - 判定: **選定** ✅（開発フロー全体の理解）

### 関連動画選定のアンチパターン

#### ❌ Bad: 関連性の低い動画を選ぶ

```typescript
// 新動画: Claude Codeの仕様駆動開発
relatedVideos: {
  title: "📌 関連動画",
  videos: [
    {
      title: "【Replit Agent】ブラウザだけで...",  // ❌ 全く別のツール
      url: "https://www.youtube.com/watch?v=...",
    },
  ],
}
```

#### ❌ Bad: 数が少なすぎる（1-2本）

```typescript
relatedVideos: {
  title: "📌 関連動画",
  videos: [
    { title: "...", url: "..." },  // ❌ 1本だけ
  ],
}
```

#### ✅ Good: 関連性の高い動画を3-5本

```typescript
relatedVideos: {
  title: "📌 関連動画",
  videos: [
    {
      title: "【仕様駆動開発】cc-sddでClaude Code/Cursor...",  // ✅ 同じ開発手法
      url: "https://www.youtube.com/watch?v=HM0SLThgXqE",
    },
    {
      title: "【Codex CLI対応】仕様駆動開発を1コマンド...",  // ✅ 補完的
      url: "https://www.youtube.com/watch?v=1EQllS_3TJo",
    },
    {
      title: "【1時間で速習】Claude Code完全ガイド...",  // ✅ 基礎解説
      url: "https://www.youtube.com/watch?v=Xr_HhLuzOy8",
    },
    {
      title: "【コード品質UP】技術的負債を作らない...",  // ✅ 開発ルール
      url: "https://www.youtube.com/watch?v=SO5qov2qTUE",
    },
    {
      title: "AIが書いたコード、いつコミット...",  // ✅ Git運用
      url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
    },
  ],
}
```

## Udemy講座セクションの判別

### 基本原則

**目的**: 動画視聴者を適切なUdemy講座に誘導し、体系的な学習機会を提供

**構成要素**:
1. **title**: 動画テーマに合わせたタイトル
2. **description**: Udemy講座で学べることの簡潔な説明
3. **courses**: 学べる内容の箇条書き（4-5項目）
4. **cta.text**: 固定文言
5. **cta.url**: 動画テーマに応じたフィルター付きURL（重要）

### クーポンURLの判別ロジック

#### 判別フロー

```
新動画のテーマ分析
    ↓
主要ツール・トピックの特定
    ↓
以下のルールで判定
```

#### ルール1: Claude Code系

**条件**: 以下のいずれかに該当

- Claude Codeが主要トピック
- MCP（Model Context Protocol）を使用
- カスタムコマンド作成
- Playwrightなど Claude Code MCP連携

**URL**: `https://www.vibecodingstudio.dev/coupons?topic=claude-code`

**キーワード例**:
- `ClaudeCode`, `Claude Code`
- `MCP`, `Model Context Protocol`
- `カスタムコマンド`, `custom commands`
- `Playwright MCP`, `Chrome DevTools MCP`

#### ルール2: Codex系

**条件**: 以下のいずれかに該当

- Codex CLI が主要トピック
- GPT-5 / OpenAI Codex を使用
- Spec Driven Codex など Codex 専用ツール

**URL**: `https://www.vibecodingstudio.dev/coupons?topic=codex`

**キーワード例**:
- `Codex`, `CodexCLI`, `Codex CLI`
- `GPT5`, `GPT-5`, `OpenAI Codex`
- `Spec Driven Codex`, `sdd-*`

#### ルール3: 汎用（複数ツール・その他）

**条件**: 以下のいずれかに該当

- Claude Code と Codex の両方を扱う比較動画
- Cursor, Junie など他のツールが主題
- AI駆動開発全般の概念的な内容
- 特定ツールに依存しない一般的なテーマ

**URL**: `https://www.vibecodingstudio.dev/coupons`（フィルターなし）

**キーワード例**:
- `Claude Code vs Codex`
- `Cursor`, `Junie`, `Replit Agent`
- `AI駆動開発`, `バイブコーディング`（ツール非特定）

### 判別の実例

#### 例1: 仕様駆動開発 + Claude Code

**新動画**: 「リアルなAI駆動開発の全工程！cc-sddで...」

**分析**:
- 主要ツール: Claude Code, cc-sdd
- カスタムコマンド公開機能を実装

**判定**: Claude Code系 → `?topic=claude-code` ✅

```typescript
udemyCourses: {
  title: "🚀 体系的にClaude Codeを学びたい方へ",
  description: "Udemy講座でClaude Codeを体系的にマスター！カスタムコマンドや仕様駆動開発など実践的なスキルを習得できます。",
  courses: [
    "カスタムコマンドの作成と活用方法",
    "仕様駆動開発（cc-sdd）の実践",
    "実践的なアプリ開発の全工程",
    "MCP連携で外部ツールを自在に操る",
    "コード品質を保ちながら爆速開発",
  ],
  cta: {
    text: "🎁 限定クーポンで最大90%OFF!",
    url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
  },
}
```

#### 例2: 仕様駆動開発 + Codex CLI

**新動画**: 「【Codex CLI対応】仕様駆動開発を1コマンドで導入！」

**分析**:
- 主要ツール: Codex CLI
- Spec Driven Codex

**判定**: Codex系 → `?topic=codex` ✅

```typescript
udemyCourses: {
  title: "🚀 体系的にCodex CLIを学んで一歩先へ！",
  description: "UdemyのCodex CLI実践マスター講座では、Codex CLI を体系的に学べます。",
  courses: [
    "MCP連携で外部ツールを自在に操る",
    "Playwright・Supabase操作も自動化",
    "Next.js × Supabaseで本格アプリ開発",
    "AGENTS.mdを活用した高度な開発手法",
    "実践的なアプリ開発の全工程",
  ],
  cta: {
    text: "🎁 限定クーポンで最大90%OFF!",
    url: "https://www.vibecodingstudio.dev/coupons?topic=codex",
  },
}
```

#### 例3: Claude Code vs Codex 比較

**新動画**: 「【どっちを選ぶ？】Claude Code vs Codex CLI！」

**分析**:
- 両方のツールを比較
- 特定ツールに依存しない

**判定**: 汎用 → フィルターなし ✅

```typescript
udemyCourses: {
  title: "🚀 AI駆動開発を本格的に学びたい方へ",
  description: "ベストセラー講座も複数あります",
  courses: [
    "Claude Code 実践マスター講座",
    "Codex CLI 完全攻略講座",
    "バイブコーディング入門（プログラミング未経験OK）",
    "MCP連携による外部ツール自動化",
    "Next.js × Supabase本格アプリ開発",
  ],
  cta: {
    text: "🎁 最大90%OFFクーポン配布中!",
    url: "https://www.vibecodingstudio.dev/coupons",
  },
}
```

### コース内容の選定

**courses 配列の作成ガイドライン**:

1. **動画の内容と直接関連する項目を最初に**
   - 例: カスタムコマンドの動画 → "カスタムコマンドの作成と活用方法"

2. **動画で触れたツール・技術を含める**
   - 例: MCP使用 → "MCP連携で外部ツールを自在に操る"

3. **より高度な内容へ誘導**
   - 例: "実践的なアプリ開発の全工程"

4. **品質・ベストプラクティスを含める**
   - 例: "コード品質を保ちながら爆速開発"

5. **具体的な技術スタックを明示**
   - 例: "Next.js × Supabaseで本格アプリ開発"

## チェックリスト

### 関連動画選定チェックリスト

- [ ] **数量**: 3-5本を選定（5本推奨）
- [ ] **優先順位**: 高スコアの動画を選定
- [ ] **多様性**: 異なる観点の動画を含める
  - [ ] 基礎解説動画
  - [ ] 実践的な動画
  - [ ] 補完的なトピック
- [ ] **URL**: 正確なYouTube URLを設定
- [ ] **タイトル**: 正確な動画タイトルを設定
- [ ] **理由**: なぜその動画を選んだか記録

### Udemy講座判別チェックリスト

- [ ] **URL判別**: 正しいフィルターを設定
  - [ ] Claude Code系 → `?topic=claude-code`
  - [ ] Codex系 → `?topic=codex`
  - [ ] 汎用 → フィルターなし
- [ ] **title**: 動画テーマに合ったタイトル
- [ ] **description**: 簡潔で魅力的な説明
- [ ] **courses**: 4-5項目の具体的な内容
  - [ ] 動画内容と直接関連
  - [ ] 高度な内容へ誘導
  - [ ] 具体的な技術スタック
- [ ] **cta.text**: 固定文言を使用
- [ ] **cta.url**: 正しいURLを設定

## Quick Reference Table

### Udemy講座URL早見表

| 動画の主要テーマ | クーポンURL | 例 |
|---|---|---|
| **Claude Code** | `?topic=claude-code` | MCP, カスタムコマンド, Playwright MCP |
| **Codex CLI** | `?topic=codex` | GPT-5, Spec Driven Codex, Codex開発 |
| **比較・汎用** | フィルターなし | Claude vs Codex, Cursor, AI駆動開発全般 |
| **その他ツール** | フィルターなし | Junie, Replit Agent, Kiro |

### 関連動画スコアリング早見表

| 関連性 | スコア | 判断基準 |
|--------|--------|----------|
| 🔥 **最優先** | +10 | 同じシリーズ、前編・後編 |
| ⭐ **強い関連** | +8 | 同じツール（Claude Code同士など） |
| ✨ **関連あり** | +6 | 同じ開発手法（仕様駆動開発など） |
| 💡 **補完的** | +3-4 | 補完的トピック、同じ技術スタック |
| 📌 **参考程度** | +2 | 同じ対象者レベル |

---

このガイドに従うことで、視聴者にとって価値のある関連動画とUdemy講座を適切に提案できます。
