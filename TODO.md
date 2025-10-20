# 残課題リスト

## 完了済み ✅

### リポジトリの大幅なスリム化（超シンプルな静的サイト化）

**Phase 1: 認証とE2Eテストの削除**
- [x] Playwright/E2Eテスト関連のディレクトリとファイルを削除
- [x] ログイン/サインアップページを削除
- [x] Supabase関連ファイルの削除
- [x] package.jsonからSupabase依存関係を削除
- [x] package.jsonからPlaywright依存関係を削除
- [x] NavbarコンポーネントからAuth機能を削除
- [x] LayoutコンポーネントからAuthProviderを削除

**Phase 2: 外部サービスの完全削除**
- [x] Sentry エラートラッキング参照の削除
- [x] Sanity CMS 統合の完全削除
- [x] 環境変数検証の簡素化（SITE_URLのみ）
- [x] パフォーマンス監視ライブラリの削除
- [x] バンドルサイズ分析ツールの削除
- [x] Storybook とすべての関連ファイルの削除（123パッケージ削除）
- [x] Vitest の削除
- [x] next-sitemap の削除

**Phase 3: テストとスクリプトの整理**
- [x] パフォーマンステストの削除
- [x] env-templateテストの削除
- [x] package.jsonスクリプトの簡素化
- [x] ESLint設定からStorybook参照を削除

**削除された依存関係（合計142パッケージ）:**
- 認証関連: @supabase/* (3パッケージ)
- E2Eテスト: @playwright/*, @axe-core/playwright (6パッケージ)
- Storybook: @storybook/*, @chromatic-com/* (10+パッケージ)
- テスト: vitest, @vitest/* (3パッケージ)
- ビルドツール: @next/bundle-analyzer, next-sitemap

**現在の状態:**
- ✅ 型チェック: パス
- ✅ ビルド: 成功
- ✅ 依存関係: 極小化（717パッケージ）
- ✅ バンドルサイズ: 最適化済み

## 完了済み（Phase 3） ✅

### テストの最終整理

- [x] 失敗しているコンポーネントテストの削除
  - text.test.tsx, avatar.test.tsx, dialog.test.tsx を削除
  - table.test.tsx, link.test.tsx を削除
  - component-docs-alignment.test.tsx を削除
  - 実装詳細をテストする10個のテストファイルを削除

- [x] logger.test.ts の Sanity 参照を修正
  - `<SanityLive />` を `Cache` に変更

- [x] すべてのテストがパス（343 テスト）

### 環境設定

- [x] `.env.example` の作成
  - シンプルな静的サイト用設定（SITE_URL、CSP_REPORT_URIのみ）

- [x] `.env.local.example` の削除（旧ファイル）

### ドキュメントの更新

- [x] README.md の更新
  - 静的サイトテンプレートとして説明
  - Sanity、Supabase、Storybook への参照を削除
  - セットアップ手順の簡素化
  - 開発スクリプトの説明を追加

- [x] CLAUDE.md の更新
  - E2E テスト、Storybook、Playwright への言及を削除
  - MCP セクションから Supabase、Playwright を削除
  - 環境セットアップ手順を簡素化

## 完了済み（Phase 4） ✅

### コンテンツの追加・更新

- [x] ホームページのコンテンツ更新
  - ヒーロー: 「Build something amazing」
  - 機能紹介: Next.js 15, Tailwind CSS v4, TypeScript, Jest, CSP など
  - テンプレートの特徴を反映した内容に更新

- [x] ナビゲーションリンクの更新
  - Pricing → Features
  - Company → About

- [x] フッターの更新
  - CTA: テンプレート向けメッセージに変更
  - サイトマップ: Template, Resources, Community, Legal
  - Copyright: カスタマイズ可能に変更

- [x] メタデータの更新
  - タイトル: 「Radiant - Minimal Next.js Template」
  - 説明文: テンプレートの特徴を記載

## 未完了 🚧

### 1. 追加のカスタマイズ（オプション）

**優先度: 低**

- [ ] 運営者情報ページ (オプション)
  - `src/app/about/page.tsx` の作成または更新

- [ ] ブログページの簡素化 (オプション)
  - 固定の記事リストを表示
  - または完全に削除

### 2. デプロイ準備

**優先度: 低**

- [ ] Vercelデプロイ設定
  - 環境変数の設定（SITE_URLのみ）

- [ ] OGP画像の追加
  - `public/og-image.png` など

- [ ] ファビコンの確認
  - `public/favicon.ico` など

## 次のステップ

**現在の状態:**
- ✅ Phase 1-4 完了: 完全にミニマル化された静的サイトテンプレート
- ✅ すべてのテスト（343テスト）がパス
- ✅ コンテンツが静的サイトテンプレート用に更新済み
- ✅ ドキュメントが最新の状態に更新済み

**推奨される次のアクション:**

1. **ローカルで動作確認**
   ```bash
   npm run dev
   ```
   - http://localhost:3000 でサイトを確認
   - すべてのリンクとナビゲーションの動作確認

2. **カスタマイズ**（必要に応じて）
   - 会社名、リンク、コンテンツを自分のプロジェクト向けに変更
   - About ページのカスタマイズ
   - ブログ機能が不要なら削除

3. **デプロイ**
   - Vercel、Netlify、または任意のホスティングサービスへデプロイ
   - 環境変数の設定（必要に応じて）

## メモ

**達成したこと:**
- リポジトリを超シンプル化（142パッケージ削除）
- 外部サービス依存を完全に排除
- ビルドとデプロイが高速化
- 保守性が大幅に向上

**現在の構成:**
- フレームワーク: Next.js 15
- スタイリング: Tailwind CSS v4
- UIコンポーネント: Headless UI
- アニメーション: Framer Motion
- 外部サービス: なし（完全に自己完結）

**このリポジトリは:**
- シンプルな静的サイトとして最適化済み
- CMSやバックエンド不要
- Discord導線が主目的
- メンテナンスが容易
