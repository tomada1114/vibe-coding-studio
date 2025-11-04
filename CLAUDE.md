# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

日本語で常に回答するようにしてください。

## プロジェクト概要

**Vibe Coding Studio**は、Next.js 15とTailwind CSS v4を使用したモダンなWebアプリケーションです。YouTube動画のメタデータ管理機能を中心に、技術コンテンツを構造化して提供するプラットフォームです。

Radiantテンプレートをベースに、エンタープライズグレードのセキュリティ、パフォーマンス最適化、型安全性を実現しています。

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

**現在アクティブな仕様**（CLAUDE.mdの「アクティブな仕様」セクション参照）:
- `custom-commands-publish` - カスタムコマンドの動的公開機能

### カスタムコマンド

`/convert-video <youtube-video-id>` - YouTube動画データの自動変換

コメント形式で記述された動画データを`VideoMetadata`形式に変換し、データローダーに登録します。

## アーキテクチャ概要

### 技術スタック

- **フレームワーク**: Next.js 15.4.4 with App Router
- **スタイリング**: Tailwind CSS v4 with PostCSS
- **UIコンポーネント**: Headless UI + カスタムコンポーネント
- **アニメーション**: Framer Motion
- **型安全性**: TypeScriptの厳密モードが有効
- **セキュリティ**: nonceベースのインラインスクリプトを使用したコンテンツセキュリティポリシー（CSP）
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
│   ├── csp.ts             # CSP設定
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

### ダークモード非対応

**重要**: このプロジェクトでは、ダークモードに対応しない方針です。

- **理由**: シンプルで一貫性のあるビジュアル体験を提供するため
- **実装ガイドライン**:
  - `dark:` プレフィックスのTailwindクラスを使用しない
  - ライトモードのみを前提としたカラーパレットを使用
  - 既存コンポーネントもダークモード関連のクラスは削除済み
  - 新規実装時は、`text-gray-950`、`bg-white`、`border-gray-200` などのライトモード専用クラスを使用

### カラーパレット

- **プライマリカラー**: Gray系（`gray-*`）
- **背景**: `bg-white`
- **テキスト**: `text-gray-950`（見出し）、`text-gray-600`（本文）
- **ボーダー**: `border-gray-200`

## セキュリティ機能

### コンテンツセキュリティポリシー（CSP）

- 開発環境ではReport-Onlyモードで実装
- nonceベースのインラインスクリプト実行
- すべてのリソースタイプに対する包括的なディレクティブ設定
- `/api/csp-report`でのCSP違反レポートエンドポイント
- Web Crypto APIを使用したエッジランタイム対応

### セキュリティヘッダー

- プリロード付きStrict-Transport-Security（HSTS）
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- カメラ、マイク、位置情報を制限するPermissions-Policy

## パフォーマンス最適化

### Next.js最適化

- ブログページの60秒再検証による増分静的再生成（ISR）
- AVIF/WebPサポート付き画像最適化
- バンドル分析サポート（ANALYZE=true環境変数経由）
- バンドルサイズ削減のための最適化されたパッケージインポート
- ミドルウェアによる詳細なキャッシュ戦略

## エラーハンドリング

### エラー境界

- 未処理エラー用のグローバルエラー境界
- リトライ機能付きブログ固有のエラー境界
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
- ✅ Catalyst UIコンポーネント統合
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

- `DESIGN_SYSTEM.md` - デザイン原則とガイドライン
- `DESIGN_SYSTEM_COMPONENTS.md` - コンポーネント固有のデザイン仕様
- `DESIGN_SYSTEM_PATTERNS.md` - 一般的なパターンとベストプラクティス
- `DESIGN_SYSTEM_JA.md` - 日本語デザインドキュメント
- `CATALYST_COMPONENTS.md` - Catalyst UI統合ガイド

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
   - CSPヘッダーの厳格な維持
   - 秘密情報を決してコミットしない

## 利用可能なMCP

当リポジトリでは以下のMCPを使用可能な場合がありますので、開発の上では積極的に活用してください。

- Context7
- Chrome DevTools - UIの動作確認とテストに活用可能
  - ページのスクリーンショット・スナップショット取得
  - ブラウザスナップショットでの要素検査
  - フォーム操作（入力、クリック、ドラッグ）
  - コンソール・ネットワークの確認
  - パフォーマンス計測・トレース
  - ネットワーク・CPU・メモリエミュレーション

## アクティブな仕様（Active Specifications）

### video-display-improvements
/videosページにおける動画メタデータの表示改善。セクション区切り、タグ表示、関連動画の表示形式、Udemy講座URLの修正など、視覚的な可読性とユーザビリティを向上させる。

- **仕様パス**: `.kiro/specs/video-display-improvements/`
- **ステータス**: initialized
- **作成日**: 2025-10-29

### custom-commands-publish
カスタムコマンドのマークダウンファイルを動的に公開する機能。`.claude/commands/`内のマークダウンファイルを解析し、Webページとして公開します。

- **仕様パス**: `.kiro/specs/custom-commands-publish/`
- **ステータス**: initialized
- **作成日**: 2025-10-30

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
