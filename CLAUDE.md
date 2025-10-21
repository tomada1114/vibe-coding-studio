# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際のClaude Code (claude.ai/code) へのガイダンスを提供します。
日本語で常に回答するようにしてください。

## プロジェクト構造

このリポジトリには Radiant テンプレートが含まれています - 厳密な型チェックが有効になったTypeScript/TSXの実装で、Next.js 15とTailwind CSS v4で構築されています。

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
npm run pre-commit-check   # コミット前の総合チェック

# テスト関連
npm run test              # Jest単体テスト実行
npm run test:watch       # テストのウォッチモード

# 環境設定
npm run validate:env     # 環境変数の検証
```

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

- `src/app/`: Next.js App Routerのページとレイアウト

- `src/components/`: 再利用可能なUIコンポーネント
  - アニメーションコンポーネント（AnimatedNumber）
  - レイアウトコンポーネント（Container、Footer、Navbar）
  - ビジュアルコンポーネント（BentoCard、Screenshot、Logoバリアント）


- `src/lib/`: ユーティリティライブラリと設定
  - エッジランタイムサポート付きCSP設定
- エラーハンドリングとログ記録ユーティリティ
  - 環境バリデーション


### コンポーネントの操作

コンポーネントは条件付きスタイリングにclsxを使用し、一貫したパターンに従います：

- デフォルト関数/コンポーネントのエクスポート
- スタイリングにTailwindクラスを使用
- 適切なTypeScript型定義を含む
- 多くのコンポーネントはアニメーション用にFramer Motionを使用

### パスエイリアス

プロジェクトはインポートで`@/`を`./src/`のエイリアスとして使用します。

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

## リポジトリの目的とステータス

このリポジトリは、Next.js、TypeScriptを使用したモダンなWebアプリケーション構築のための**テンプレートリポジトリ**として機能します。エンタープライズグレードのセキュリティ、キャッシュ最適化、包括的なコンポーネントライブラリを備えた堅固な基盤を提供します。

### 現在のステータス

- ✅ 完全な機能セットを持つ本番環境対応テンプレート
- ✅ コアコンポーネントの完全なテストカバレッジ
- ✅ `/docs`ディレクトリの包括的なドキュメント
- ✅ デザインシステムドキュメント（英語・日本語）
- ✅ Catalyst UIコンポーネントの完全な統合

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
# TDDサイクル
npm test:watch  # 開発中は継続実行

# 定期チェック
npm run type-check  # TypeScriptバリデーション
npm run lint       # コードスタイルチェック
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
npm run pre-commit-check

# または個別実行
npm run lint        # ESLint検査
npm run type-check  # TypeScript型チェック
npm run validate:env # 環境変数チェック

# オプションだが推奨（時間に余裕がある場合）
npm run build      # 本番ビルドが動作することを確認
npm run test       # テスト実行
```

**📋 コミット前チェックスクリプトの詳細**:

- `npm run pre-commit-check` は以下を自動実行：
  1. プロジェクト設定確認
  2. ESLint検査（警告レベルは許可）
  3. TypeScript型チェック（既存エラーは無視）
  4. 重要ファイルの存在確認
  5. 環境変数検証
  6. Git ステータス表示

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

### このテンプレートの使用

#### 新しいプロジェクトの開始

1. **テンプレートのクローン**

   ```bash
   git clone <repo-url> your-project-name
   cd your-project-name
   rm -rf .git  # テンプレートのgit履歴を削除
   git init     # 新しく開始
   ```

2. **環境のセットアップ**

   ```bash
   npm install
   cp .env.example .env.local  # 環境設定
   ```

3. **プロジェクトのカスタマイズ**
   - プロジェクトの詳細で`package.json`を更新
   - `/src/components`のコンポーネントを変更
   - Tailwind設定でデザイントークンを調整

#### 開発ベストプラクティス

1. **コンポーネント開発**
   - テストから開始（TDDアプローチ）
   - アクセシビリティを確保（WCAG 2.1準拠）
   - プロパティと使用方法をドキュメント化

2. **パフォーマンス**
   - パフォーマンスログを定期的に確認
   - バンドルサイズを管理下に保つ
   - 重いコンポーネントには動的インポートを使用
   - next/imageで画像を最適化

3. **セキュリティ**
   - 秘密情報やAPIキーを決してコミットしない
   - CSPヘッダーを厳密に保つ
   - すべてのユーザー入力を検証
   - 依存関係の定期更新

4. **テスト戦略**
   - ユーティリティとフック用の単体テスト
   - UIコンポーネント用のコンポーネントテスト
   - 重要な機能のテストカバレッジ確保

## 推奨拡張機能

VS Codeユーザー用：

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Jest Runner

## 利用可能なMCP

当リポジトリでは以下のMCPを使用可能な場合がありますので、開発の上では積極的に活用してください。

- Context7

## アクティブな仕様（Active Specifications）

### discord-community-site
Vibe Coding StudioのDiscordコミュニティへの誘導を目的としたランディングページ。既存デザインを踏襲し、トップページとコミュニティページの2ページ構成。

- **仕様パス**: `.kiro/specs/discord-community-site/`
- **ステータス**: initialized
- **作成日**: 2025-10-20

## 今後の開発

このテンプレートを拡張する際は：

1. **品質基準の維持**
   - テストカバレッジを80%以上に保つ
   - すべての新機能をドキュメント化
   - 既存のパターンと規約に従う

2. **パフォーマンス予算**
   - 初期バンドル < 500KB
   - LCP < 2.5秒
   - CLS < 0.1
   - FID < 100ミリ秒

3. **アクセシビリティ要件**
   - 最低限WCAG 2.1 AA準拠
   - キーボードナビゲーションサポート
   - スクリーンリーダー対応
   - カラーコントラスト比

4. **ドキュメント更新**
   - 機能追加時に関連ドキュメントを更新
   - APIリファレンスを最新に保つ
   - 新しいコンポーネントの例を追加
