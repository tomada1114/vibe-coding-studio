# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

日本語で常に回答するようにしてください。

## プロジェクト概要

**Vibe Coding Studio**は、Next.js 15とTailwind CSS v4を使用したモダンなWebアプリケーションです。YouTube動画のメタデータ管理機能を中心に、技術コンテンツを構造化して提供するプラットフォームです。

デザインシステム「Geist Grid」（Vercel Geist のトークン基盤 / 1px 罫線のセルグリッド / ダーク既定＋ライト手動切替）を土台に、エンタープライズグレードのセキュリティ、パフォーマンス最適化、型安全性を実現しています。

## 開発コマンド

```bash
# 開発サーバー
npm run dev

# 本番環境ビルド
npm run build

# 本番サーバー起動
npm run start

# コードの品質チェック
npm run lint                # ESLint検査
npm run type-check         # TypeScript型チェック
npm run format             # Prettierでコード整形
npm run format:check       # 整形チェックのみ
npm run check:all          # lint + format + type-check + test の総合チェック

# テスト関連
npm run test              # Jest単体テスト実行
npm run test:coverage     # カバレッジ付きテスト実行
```

## プロジェクト固有の機能

### YouTube動画メタデータシステム

このプロジェクトの中核機能は、YouTube動画のメタデータを構造化して管理するシステムです。

**主要ファイル**:
- `src/types/video.ts` - 動画メタデータの型定義（`VideoMetadata`インターフェース）
- `src/data/videos/` - 個別の動画データファイル（例: `1-1NAB5jIjo.ts`）
- `src/lib/videos/video-data.ts` - 動画データローダー（全動画の集約）
- `src/data/shared/common-sections.ts` - 共通セクション（SNS、Discord、エンゲージメント）

**動画データの構造**:
```typescript
export const video_VIDEO_ID: VideoMetadata = {
  id: "VIDEO_ID",
  title: "動画タイトル",
  publishedAt: "YYYY-MM-DD",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",

  // 必須セクション
  opening: { lines: [...] },
  learningPoints: { title: "💡 この動画で学べること", items: [...] },
  timestamps: { title: "⏰ タイムスタンプ", items: [...] },
  tags: [...],

  // オプションセクション
  relatedVideos?: {...},
  udemyCourses?: {...},
  customSections?: [...],

  // 共通セクション（commonSectionsから参照）
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
```

**新しい動画の追加手順**:
1. `src/data/videos/VIDEO_ID.ts` を作成し、`VideoMetadata`形式でデータを記述
2. `src/lib/videos/video-data.ts` にインポートと配列への追加
3. `/convert-video` カスタムコマンドを使うと、コメント形式からの自動変換が可能

### Kiro仕様駆動開発システム

`.kiro/` ディレクトリには、AI駆動開発のための仕様管理システムが含まれています。

**ディレクトリ構造**:
```
.kiro/
├── steering/           # プロダクト・技術・構造の指針
│   ├── product.md     # 製品概要と価値提案
│   ├── tech.md        # 技術スタック詳細
│   └── structure.md   # プロジェクト構造
└── specs/             # 機能仕様
    ├── archive/       # 完了した仕様
    └── [feature-name]/ # 進行中の仕様
        ├── requirements.md
        ├── design.md
        ├── tasks.md
        └── spec.json
```

**Kiroカスタムコマンド** (`.claude/commands/kiro/`):
- `/kiro:steering` - ステアリングドキュメント作成・更新
- `/kiro:spec-init` - 新規仕様の初期化
- `/kiro:spec-requirements` - 要件定義生成
- `/kiro:spec-design` - 技術設計書作成
- `/kiro:spec-tasks` - 実装タスク分解
- `/kiro:spec-impl` - TDDによる実装実行
- `/kiro:spec-status` - 仕様のステータス確認
- `/kiro:validate-gap` - 要件と実装のギャップ分析
- `/kiro:validate-design` - 設計品質レビュー

## アーキテクチャ概要

### 技術スタック

- **フレームワーク**: Next.js 15.4.4 with App Router
- **スタイリング**: Tailwind CSS v4 with PostCSS（デザインシステム「Geist Grid」のセマンティックトークン経由で色を参照）
- **デザインシステム**: Geist Grid（Vercel Geist トークン / Geist Sans・Geist Mono・Noto Sans JP / `data-theme` によるダーク・ライト切替）
- **UIコンポーネント**: Headless UI + セルベースのカスタムコンポーネント
- **アニメーション**: Framer Motion
- **型安全性**: TypeScriptの厳密モードが有効
- **セキュリティ**: 基本的なセキュリティヘッダー（X-Frame-Options, X-Content-Type-Options等）
- **パフォーマンス**: ISR（60秒の再検証）、最適化されたキャッシュ戦略

### 主要ディレクトリ

```
src/
├── app/                    # Next.js App Router（ページ・レイアウト）
├── components/             # 再利用可能UIコンポーネント
│   └── __tests__/         # コンポーネントテスト
├── data/                   # アプリケーションデータ
│   ├── videos/            # 動画メタデータファイル（VIDEO_ID.ts）
│   └── shared/            # 共通データ（common-sections.ts）
├── lib/                    # ユーティリティ・設定
│   ├── videos/            # 動画データローダー
│   └── env-validation.ts  # 環境変数検証
├── types/                  # TypeScript型定義
│   └── video.ts           # VideoMetadata型
└── styles/                # グローバルスタイル

.claude/                    # Claude Code設定
├── commands/              # カスタムコマンド
│   └── kiro/             # Kiro仕様駆動開発コマンド
└── skills/               # Claude Codeスキル

.kiro/                     # Kiro仕様管理
├── steering/             # プロジェクト指針
└── specs/                # 機能仕様

docs/                      # プロジェクトドキュメント
└── design/               # デザインシステム
```

### 設計原則

- **型安全性**: TypeScript厳格モード、`VideoMetadata`などの明確な型定義
- **コンポーネント設計**: デフォルトエクスポート、clsxでの条件付きスタイリング、Framer Motionアニメーション
- **パスエイリアス**: `@/` → `./src/`
- **テストファーストアプローチ**: TDD（t-wadaスタイル）を推奨

## デザイン方針

### Geist Grid デザインシステム

サイトのターゲットデザインは **「Geist Grid」**（黒い方眼紙の上に置かれた、エンジニアの職務経歴書）です。
Vercel Geist の厳密なトークンで組み、1px の罫線がセルを切り、そこに青い光が一点だけ差します。
ページのデザイン刷新・新規ページ作成・テーマやトークンの変更の際は、必ず `geist-grid-design` スキル
（`.claude/skills/geist-grid-design/SKILL.md`）に従ってください。カラートークン（ダーク／ライト）・
派手さ予算の数値上限・タイポグラフィ・セル構造・コンポーネント規則・テーマ実装・Do / Don't・
実装チェックリストが定義されています。詳細な根拠と Decision ledger は
`docs/design/proposals/2026-09-geist-grid.md` にあります。

- **正典実装**: 未着手。最初に Geist Grid へ移行するページ（トップページを予定）が正典になります
- **移行ステータス**: 全ページ未移行（旧 Radiant ベースのライトデザイン、`/founder` は旧 Blueprint Night）。
  Blueprint Night は廃止済みで、そのトークン（`#0B1020` 系の背景、紫アクセント `#7c5cfc` 等）は一切継承しません

### ダーク既定＋ライト手動切替

Geist Grid はダークを既定とし、ヘッダーのトグルボタンでライトへ手動切替できます
（`dark` ⇄ `light` の 2 状態のみ。"system" の第3状態とプルダウンは持ちません）。

- テーマは `<html data-theme="dark|light">` ＋ CSS 変数で解決し、Tailwind v4 の `@custom-variant` で
  `dark:` を属性に紐付けます
- **コンポーネントには `dark:` を書きません。** `bg-bg` `text-text-secondary` `border-border` のような
  セマンティッククラスだけを使い、テーマ差はトークン層で吸収します。`dark:` の直接使用は、
  トークンで表現できないと証明できる場合のみの例外で、レビューで理由を問います
- **色は必ずセマンティックトークン経由で参照します。** 生の hex / `gray-*` の直接指定、および
  Geist トークン外の色は禁止です
- `prefers-color-scheme` は「明示的にライトを好む人」の検出にのみ使い、既定はダークに倒します

### 未移行ページ（旧デザイン）の保守

**新規ページは必ず Geist Grid で作成してください。** 未移行ページに小さな修正を入れる場合に限り、
移行完了までは既存の流儀に合わせます:

- **プライマリカラー**: Gray系（`gray-*`）、背景 `bg-white`、テキスト `text-gray-950`／`text-gray-600`、ボーダー `border-gray-200`
- `Heading`／`Subheading` コンポーネントは `text-zinc-950` が適用される（明るい背景前提）

ページ単位のデザイン刷新をする場合は旧流儀に合わせず、Geist Grid へ移行してください。

## セキュリティ機能

### セキュリティヘッダー

`next.config.mjs`で基本的なセキュリティヘッダーを設定しています：

- X-Frame-Options: SAMEORIGIN（クリックジャッキング対策）
- X-Content-Type-Options: nosniff（MIMEスニッフィング対策）
- Referrer-Policy: origin-when-cross-origin

## パフォーマンス最適化

### Next.js最適化

- AVIF/WebPサポート付き画像最適化
- バンドル分析サポート（ANALYZE=true環境変数経由）
- バンドルサイズ削減のための最適化されたパッケージインポート

## エラーハンドリング

### エラー境界

- 未処理エラー用のグローバルエラー境界
- 開発環境での包括的なエラーログ

### 環境バリデーション

- 必要な環境変数のランタイムバリデーション
- 設定不足に対する開発者フレンドリーな警告
- 早期バリデーションによる本番エラー防止

## プロジェクトステータス

**Vibe Coding Studio**は、技術コンテンツを構造化して提供する本番環境対応のWebアプリケーションです。

- ✅ YouTube動画メタデータシステム（29動画のデータ）
- ✅ Kiro仕様駆動開発システム統合
- ✅ コアコンポーネントの完全なテストカバレッジ
- ✅ `/docs`ディレクトリの包括的なドキュメント
- 🚧 デザインシステム「Geist Grid」への移行（提案承認済み・実装未着手）
- 🚧 カスタムコマンド公開機能（開発中）

## 開発ワークフロー

### テスト駆動開発（TDD）- t-wadaスタイル

私たちは t-wada（和田卓人）が提唱する**テスト駆動開発（TDD）**の原則に従います：

1. **Red フェーズ**: 最初に失敗するテストを書く

   ```bash
   # テストを書く
   npm test:watch  # 即座のフィードバックのためのウォッチモード
   ```

2. **Green フェーズ**: テストをパスする最小限のコードを書く
   - 完璧なコードではなく、テストを通すことに集中
   - 早すぎる最適化を避ける

3. **Refactor フェーズ**: コードの品質を向上させる
   - 実装をクリーンアップ
   - SOLID原則の適用
   - すべてのテストが依然としてパスすることを確認

### 開発プロセス

#### 1. 開発開始前

```bash
# クリーンな状態を確保
git status
npm run lint
npm run type-check
npm test
```

#### 2. 開発中

```bash
# 定期チェック
npm run type-check  # TypeScriptバリデーション
npm run lint       # コードスタイルチェック
npm run test       # テスト実行
```

#### 3. コミットガイドライン

**重要**: コミット前にすべてのエラーを修正する必要があります。以下を含むコードをコミットしないでください：

- ❌ リントエラー
- ❌ TypeScriptエラー
- ❌ 失敗するテスト
- ❌ console.log文（開発環境でのデバッグ用を除く）

**コミット前チェック（推奨手順）**:

```bash
# 🚀 ワンコマンドでコミット前チェック（推奨）
npm run check:all

# または個別実行
npm run lint        # ESLint検査
npm run format      # コード整形
npm run type-check  # TypeScript型チェック
npm run test        # テスト実行

# オプションだが推奨（時間に余裕がある場合）
npm run build       # 本番ビルドが動作することを確認
```

**📋 コミット前チェックスクリプトの詳細**:

- `npm run check:all` は以下を自動実行：
  1. ESLint検査（コードスタイルと品質）
  2. Prettierコード整形
  3. TypeScript型チェック（型安全性）
  4. テスト実行
  5. すべてのチェックが合格することを確認

**頻繁なコミット**:

- 小さく、原子的なコミットを作成
- 各コミットは1つの論理的変更を表現
- 従来のコミット形式を使用：
  - `feat:` 新機能
  - `fix:` バグ修正
  - `docs:` ドキュメントのみ
  - `test:` テストの追加や変更
  - `refactor:` コードリファクタリング
  - `perf:` パフォーマンス改善
  - `chore:` メンテナンスタスク

#### 4. エラーハンドリングポリシー

**エラーゼロトレランス**:

- 遭遇したすべての既存エラーを即座に修正
- 新しいエラーを決して導入しない
- 通常の開発の一環としてTODOsとFIXMEsを削除または修正
- コミット前にconsole.log文をクリーンアップ

## ドキュメント構造

### 利用可能なドキュメント

`/docs`ディレクトリに配置：

#### コアドキュメント

- `PROJECT_DOCUMENTATION.md` - 完全なプロジェクト概要
- `API_REFERENCE.md` - APIエンドポイントとユーティリティ
- `COMPONENT_GUIDE.md` - コンポーネントライブラリリファレンス

#### デザインシステム（`/docs/design`）

- `DESIGN_SYSTEM.md` - Geist Grid の概要・設計原則・トークン
- `DESIGN_SYSTEM_COMPONENTS.md` - コンポーネント固有のデザイン仕様
- `DESIGN_SYSTEM_PATTERNS.md` - 一般的なパターンとベストプラクティス
- `THEME_AND_I18N.md` - テーマ切替（`data-theme`）と i18n 方針
- `CATALYST_COMPONENTS.md` - Catalyst UI統合ガイド（旧・移行完了まで残置）
- `proposals/2026-09-geist-grid.md` - Geist Grid 提案書（根拠・Decision ledger）

### 開発ベストプラクティス

1. **動画データ追加時**
   - `VideoMetadata`型に厳密に準拠
   - 共通セクションは`commonSections`から参照
   - データローダーへの登録を忘れずに
   - タイムスタンプは"HH:MM"または"HH:MM:SS"形式

2. **新機能開発時（Kiroワークフロー）**
   - `/kiro:spec-init`で仕様を初期化
   - 要件定義 → 設計 → タスク分解 → TDD実装の流れ
   - ステアリングドキュメントを定期的に参照

3. **コンポーネント開発**
   - TDDアプローチ（Red → Green → Refactor）
   - WCAG 2.1 AA準拠のアクセシビリティ
   - Framer Motionを活用したアニメーション

4. **パフォーマンス・セキュリティ**
   - 動的インポートで初期バンドルを最小化
   - next/imageで画像最適化
   - 秘密情報を決してコミットしない

## 利用可能なMCP

当リポジトリでは以下のMCPを使用可能な場合がありますので、開発の上では積極的に活用してください。

- Context7
- Claude in Chrome（標準機能 `mcp__claude-in-chrome__*`） - UIの動作確認とテストに活用可能
  - ブラウザ操作は、Playwright MCP・Chrome DevTools MCP等の他MCPがenableでも常にこちらを最優先で使い、`operating-chrome` スキルの知見に従う（実Chromeプロファイルでログイン済みセッションを利用可・複数セッション同時利用可）
  - ページのスクリーンショット取得（`computer`）
  - 要素検査・特定（`find` / `read_page`）
  - フォーム操作（`form_input`、クリックは ref 指定）
  - コンソール・ネットワークの確認（`read_console_messages` は pattern 指定、`read_network_requests` は計測前に一度空呼び）
  - 複数アクションは `browser_batch` で1往復にまとめる
  - フォールバック（Chrome DevTools MCP等）は、拡張機能が未接続で解決しない場合・クリーンプロファイルが必要な場合・パフォーマンストレース等のCDP固有機能が必要な場合のみ

## アクティブな仕様（Active Specifications）

### video-display-improvements
/videosページにおける動画メタデータの表示改善。セクション区切り、タグ表示、関連動画の表示形式、Udemy講座URLの修正など、視覚的な可読性とユーザビリティを向上させる。

- **仕様パス**: `.kiro/specs/video-display-improvements/`
- **ステータス**: initialized
- **作成日**: 2025-10-29

### video-metadata-indexing
YouTube動画メタデータのインデックスシステム。関連動画の高速検索、Udemy講座の自動選定を含む総合的なメタデータ管理システム。動画インデックスの生成・管理、タグベースの関連動画検索アルゴリズム、Udemy講座情報の一元管理とタグマッチング選定ロジックを統合した機能です。

- **仕様パス**: `.kiro/specs/video-metadata-indexing/`
- **ステータス**: initialized
- **作成日**: 2025-11-04
- **注記**: `video-indexing-system` と `udemy-courses-management` を統合した仕様

## 品質基準

- **テストカバレッジ**: コアロジックとユーティリティで80%以上を維持
- **アクセシビリティ**: WCAG 2.1 AA準拠（キーボードナビゲーション、スクリーンリーダー対応）
- **パフォーマンス**: Core Web Vitals目標（LCP < 2.5秒、CLS < 0.1、FID < 100ms）
- **型安全性**: TypeScript厳格モード、すべての新機能に適切な型定義
- **ドキュメント**: 新機能追加時に関連ドキュメントを更新
