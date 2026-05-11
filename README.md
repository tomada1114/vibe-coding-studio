# Vibe Coding Studio

**AI駆動開発を仲間と一緒に学ぶ Discord コミュニティ**の公式 Web サイトです。Next.js 15 と Tailwind CSS v4 をベースに、YouTube 動画メタデータ、Udemy クーポン配布、学習ロードマップ、ドキュメントなどを構造化して提供するプラットフォームです。

Radiant テンプレートをベースに、コンテンツ管理・型安全性・パフォーマンス最適化を加えた構成になっています。

## 主な機能

- 🎬 **YouTube 動画メタデータシステム** — 動画ごとに概要欄を構造化管理（タイムスタンプ・関連動画・Udemy 講座・タグなど）
- 🎟️ **Udemy クーポン配布ページ** — Markdown ベースの講座データから一覧・詳細ページを自動生成
- 🗺️ **学習ロードマップ** — Web / モバイルなどテーマ別の学習ステップを提供
- 📚 **Markdoc ドキュメント** — 言語別（JavaScript / TypeScript / React / Python / Ruby / Rails / RSpec）の技術ドキュメント
- 🤝 **コミュニティ / 主催者ページ** — Discord メンバー数表示、主催者プロフィール
- ⚡ **Next.js 15 App Router + ISR** — トップページは 1 時間ごとに再検証
- 🧪 **インデックスシステム** — 動画と Udemy 講座のメタデータからインデックス JSON を生成し、関連動画検索・講座サジェストに利用
- 🔒 **基本的なセキュリティヘッダー** — X-Frame-Options / X-Content-Type-Options / Referrer-Policy
- 🧱 **TypeScript 厳格モード** ＋ Jest によるユニットテスト

## 技術スタック

- **フレームワーク**: Next.js 15.5 (App Router)
- **言語**: TypeScript (strict)
- **スタイル**: Tailwind CSS v4 + PostCSS
- **UI**: Headless UI / Heroicons / Lucide / Catalyst コンポーネント
- **アニメーション**: Framer Motion
- **ドキュメント**: Markdoc
- **テスト**: Jest + Testing Library
- **その他**: fast-glob, js-yaml, prism-react-renderer

## はじめに

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定（任意）

```bash
cp .env.example .env.local
```

利用可能な環境変数:

```env
# 任意: メタデータで使う正規 URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# 任意: CSP 違反のレポート URI
NEXT_PUBLIC_CSP_REPORT_URI=/api/csp-report

# 任意: Discord サーバーのメンバー数を取得するための Bot トークン
DISCORD_BOT_TOKEN=your_bot_token_here

# 任意: Discord サーバー（ギルド）ID
DISCORD_GUILD_ID=your_guild_id_here
```

#### Discord 連携（任意）

トップページにメンバー数を表示する場合のみ必要です。

1. [Discord Developer Portal](https://discord.com/developers/applications) で新しい Application を作成し、Bot を発行
2. Bot Token を `DISCORD_BOT_TOKEN` に設定
3. 開発者モードを有効化し、対象サーバーの ID を `DISCORD_GUILD_ID` に設定
4. OAuth2 URL Generator で `bot` スコープのみ選択し、Bot をサーバーに招待

これらの環境変数が未設定の場合、メンバー数表示は単純に行われません。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## スクリプト

### 開発・ビルド

```bash
npm run dev          # 開発サーバー
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動
```

### 品質チェック

```bash
npm run lint         # ESLint
npm run type-check   # TypeScript 型チェック
npm run format       # Prettier 整形
npm run format:check # 整形チェックのみ
npm run test         # Jest 単体テスト
npm run test:coverage # カバレッジ付きテスト
npm run check:all    # lint + format + type-check + test + validate:indexes を一括実行
```

### インデックス生成・検証

動画・Udemy 講座のメタデータからインデックス JSON を生成します。

```bash
npm run generate:indexes      # src/data/indexes/*.json を生成
npm run validate:indexes      # 既存インデックスとデータの整合性をチェック
npm run update:video-indexes  # 生成と検証をまとめて実行
```

生成物:

- `src/data/indexes/video-index.json`
- `src/data/indexes/udemy-course-index.json`

### YouTube 概要欄テキストの書き出し

すべての動画メタデータを、YouTube の概要欄に貼り付けやすいプレーンテキストに変換します。

```bash
npx tsx scripts/export-videos-to-markdown.ts
```

- 出力先: `.output/videos-plaintext/`
- 動画 1 本につき `.txt` ファイルを 1 つ生成
- 各セクション（冒頭・学べる内容・関連動画・Udemy 講座・タイムスタンプ・SNS・タグ）を含み、URL は別行で出力

## ディレクトリ構成

```
├── src/
│   ├── app/               # Next.js App Router のページとレイアウト
│   │   ├── api/           # API ルート（Udemy 講座など）
│   │   ├── community/     # コミュニティページ
│   │   ├── coupons/       # Udemy クーポン一覧 / 詳細
│   │   ├── docs/          # Markdoc ベースの技術ドキュメント
│   │   ├── founder/       # 主催者プロフィール
│   │   ├── roadmap/       # 学習ロードマップ
│   │   └── videos/        # 動画メタデータ一覧 / 詳細
│   ├── components/        # 再利用可能な UI コンポーネント（Catalyst 含む）
│   ├── data/
│   │   ├── videos/        # 動画メタデータ（1 動画 1 ファイル）
│   │   ├── coupons/       # Udemy 講座の Markdown と CSV アップロード
│   │   ├── indexes/       # 自動生成されるインデックス JSON
│   │   ├── roadmaps/      # ロードマップデータ（web / mobile など）
│   │   └── shared/        # SNS・Discord などの共通セクション
│   ├── lib/
│   │   ├── videos/        # 動画データローダー / 関連動画 / Udemy サジェスト
│   │   ├── coupons/       # クーポンデータ管理
│   │   ├── seo/           # サイト URL などの SEO ユーティリティ
│   │   └── ...
│   ├── types/             # TypeScript 型定義（VideoMetadata など）
│   └── styles/            # グローバルスタイル
├── scripts/               # メタデータ生成・検証スクリプト
├── public/                # 静的アセット
├── docs/                  # プロジェクト / デザインドキュメント
├── .claude/               # Claude Code 設定（commands / skills）
└── .kiro/                 # Kiro 仕様駆動開発（steering / specs）
```

## YouTube 動画メタデータシステム

このプロジェクトの中核機能の 1 つで、YouTube 動画の概要欄を構造化して管理します。

主要ファイル:

- `src/types/video.ts` — `VideoMetadata` 型定義
- `src/data/videos/<VIDEO_ID>.ts` — 動画ごとのデータ
- `src/lib/videos/video-data.ts` — 全動画を集約するデータローダー
- `src/data/shared/common-sections.ts` — SNS / Discord / エンゲージメントなど共通セクション
- `src/lib/videos/find-related-videos.ts` — タグベースの関連動画検索
- `src/lib/videos/suggest-udemy-courses.ts` — Udemy 講座のサジェスト

新しい動画を追加する流れ:

1. `src/data/videos/<VIDEO_ID>.ts` を作成し、`VideoMetadata` 形式で記述
2. `src/lib/videos/video-data.ts` にインポートを追加
3. `npm run update:video-indexes` でインデックスを再生成

`.claude/commands/convert-video.md` のカスタムコマンドを使うと、コメント形式の素材から自動変換できます。

## Udemy クーポン配布

`/coupons` 配下で、Udemy 講座のクーポン配布ページを Markdown ベースで管理します。

- `src/data/coupons/courses/*.md` — 講座ごとの Markdown
- `src/data/coupons/uploads/*.csv` — クーポンの一括アップロード CSV
- `src/lib/coupons/coupon-data.ts` — Markdown / CSV を読み込むローダー

クーポン更新は `.claude/commands/update-coupons.md` のカスタムコマンドから実行できます。新規講座追加は `.claude/commands/create-udemy-course.md` を参照してください。

## 開発ワークフロー

### TDD（t-wada スタイル）

1. **Red**: まず失敗するテストを書く
2. **Green**: テストを通す最小限の実装
3. **Refactor**: テストを通したままコードを整える

### コミット前チェック

コミット前には以下のいずれかを実行してください。

```bash
# 推奨: 一括実行
npm run check:all

# あるいは個別に
npm run lint
npm run format
npm run type-check
npm run test
```

`check:all` には `validate:indexes` も含まれているため、動画 / クーポン関連の変更後はインデックスとの整合性も同時にチェックされます。

### コミット規約

Conventional Commits に従います。

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント
- `test:` テストの追加・変更
- `refactor:` リファクタリング
- `perf:` パフォーマンス改善
- `chore:` 雑務

## デザイン方針

- **ダークモード非対応**: `dark:` プレフィックスは使用しません
- **カラー**: 背景 `bg-white`、見出し `text-gray-950`、本文 `text-gray-600`、ボーダー `border-gray-200`
- **コンポーネント**: Catalyst UI と独自コンポーネントを併用、Framer Motion でアニメーションを付与

## パフォーマンス

- Next.js Image による AVIF / WebP 画像最適化
- `optimizePackageImports` による依存パッケージのバンドル最適化
- ISR（トップページは `revalidate = 3600`）
- 静的アセットごとに調整した Cache-Control ヘッダー
- `ANALYZE=true` でバンドル分析

## セキュリティ

`next.config.mjs` で以下の基本セキュリティヘッダーを設定しています。

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`

また、サプライチェーン攻撃軽減のため `.npmrc` で `min-release-age` を設定しています。

## ドキュメント

詳細なドキュメントは `/docs` 配下にあります。

- `PROJECT_DOCUMENTATION.md` — プロジェクト全体の概要
- `API_REFERENCE.md` — API・ユーティリティのリファレンス
- `COMPONENT_GUIDE.md` — コンポーネント一覧
- `VIDEO_METADATA_INDEXING.md` — 動画メタデータインデックスシステム
- `UDEMY_COURSE_WORKFLOW.md` — Udemy 講座管理のワークフロー
- `video-data-guide.md` — 動画データの記述ガイド
- `design/` — デザインシステム

## Kiro 仕様駆動開発

`.kiro/` には AI 駆動開発のための仕様管理システムが含まれています。

```
.kiro/
├── steering/  # プロダクト・技術・構造の指針
└── specs/     # 機能仕様（進行中 / archive）
```

`/kiro:spec-init` などの Kiro 系カスタムコマンドと組み合わせることで、要件定義 → 設計 → タスク分解 → TDD 実装の流れを支援します。

## ライセンス

Radiant テンプレートを利用しているため、このサイトテンプレートは [Tailwind Plus license](https://tailwindcss.com/plus/license) の対象です。

## 参考リンク

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Headless UI](https://headlessui.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Markdoc](https://markdoc.dev/)
