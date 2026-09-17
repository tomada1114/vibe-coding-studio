# Vibe Coding Studio - Project Structure

**Inclusion Mode**: Always

---

この文書は、現在のリポジトリに存在する主要なディレクトリと責務を示します。新しい構成を
説明するときは、まず `rg --files` で実在を確認してください。

## Root Directory

```
vibe-coding-studio/
├── .claude/                 # Claude Code のエージェント・コマンド・設定
├── .github/                 # Issue、PR、Dependabot、GitHub Actions
├── .kiro/                   # プロダクト・技術・構造の方針
│   └── steering/
├── __tests__/               # リポジトリ横断のメタテスト
├── config/                  # 環境変数定義
├── docs/                    # プロジェクト・デザインドキュメント
├── public/                  # 画像などの静的アセット
├── scripts/                 # 開発用スクリプト
├── src/                     # Next.js アプリケーション
├── .env.example             # 設定項目の例
├── AGENTS.md                # エージェント共通ガイド
├── CLAUDE.md                # Claude Code 用の入口
├── eslint.config.mjs        # ESLint flat config
├── jest.config.js           # Jest とカバレッジ閾値
├── jest.setup.js            # Jest セットアップ
├── next.config.mjs          # Next.js 設定、ヘッダー、リダイレクト
├── package.json             # npm scripts と依存関係
├── package-lock.json        # npm のロックファイル
├── postcss.config.js        # Tailwind CSS の PostCSS 設定
├── tsconfig.json            # TypeScript 設定
└── .prettierrc              # Prettier 設定
```

## Application Structure

### `src/app/` — App Router

```
src/app/
├── layout.tsx                  # 共通 HTML、メタデータ、Header、Footer
├── page.tsx                    # 日本語プロフィール（/）
├── error.tsx                   # ルートのエラー画面
├── global-error.tsx            # ドキュメント全体のエラー画面
├── not-found.tsx               # 404 画面
├── robots.ts                   # robots.txt のメタデータ
├── sitemap.ts                  # sitemap.xml のメタデータ
├── courses/page.tsx            # 日本語講座一覧（/courses）
├── community/page.tsx          # 日本語コミュニティ（/community）
└── en/
    ├── page.tsx                # 英語プロフィール（/en）
    ├── courses/page.tsx        # 英語講座一覧（/en/courses）
    └── community/page.tsx      # 英語コミュニティ（/en/community）
```

現在、公開 API の Route Handler はありません。ページの実装は主に `src/components/geist/`
へ委譲し、`src/app/` ではルート固有の辞書・メタデータ・再検証設定を定義します。

### `src/components/` — Shared UI

```
src/components/
├── courses/
│   ├── course-card.tsx
│   └── course-list.tsx
├── geist/
│   ├── community-page.tsx
│   ├── courses-page.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── html-lang.tsx
│   ├── profile-page.tsx
│   ├── profile-structured-data.tsx
│   ├── social-icons.tsx
│   └── theme-toggle.tsx
├── discord-member-count.tsx
├── discord-member-count-client.tsx
└── error-boundary.tsx
```

`geist/` は公開ページと共通シェルの正典実装です。機能固有の部品は機能ディレクトリに置き、
テストは対応するディレクトリの `__tests__/` にコロケーションします。

### `src/data/`, `src/i18n/`, `src/lib/`

```
src/data/
├── book.ts
└── udemy-courses/
    ├── index.ts
    └── topics.ts

src/i18n/
├── dictionaries.ts
└── locale.ts

src/lib/
├── constants.ts
├── discord-api.ts
└── seo/site-url.ts
```

- `src/data/` はプロフィールと講座の公開データを型付きで管理する
- `src/i18n/` はロケール判定、URL変換、日英辞書を管理する
- `src/lib/` は外部 API、サイト定数、SEO の共有ロジックを管理する
- `src/styles/tailwind.css` は Geist Grid のテーマトークンと CSS ユーティリティを管理する

### Tests

```
src/app/**/__tests__/          # ページ、メタデータ、エラー画面のテスト
src/components/**/__tests__/  # コンポーネントの振る舞いテスト
src/data/**/__tests__/         # 公開データの不変性・順序のテスト
src/i18n/__tests__/            # ロケール・パス変換のテスト
src/lib/**/__tests__/          # ユーティリティのテスト
src/__tests__/                 # 複数モジュールにまたがるテスト
__tests__/                     # リポジトリの構成・規約・ワークフローのテスト
```

テストは private な実装ではなく、公開関数、画面、リンク、メタデータ、エラーから観測できる
振る舞いを検証します。テスト配置とフェイク／モックの判断は `writing-tests` skill に従います。

## Documentation Structure

```
docs/
├── README.md
├── PROJECT_DOCUMENTATION.md
├── API_REFERENCE.md
├── COMPONENT_GUIDE.md
├── CLEANUP_REPORT.md
└── design/
    ├── DESIGN_SYSTEM.md
    ├── DESIGN_SYSTEM_COMPONENTS.md
    ├── DESIGN_SYSTEM_PATTERNS.md
    ├── THEME_AND_I18N.md
    └── proposals/2026-09-geist-grid.md
```

`.kiro/steering/` は product、tech、structure の方針を持ちます。完了済みの仕様は
`.kiro/specs/archive/` に保存され、現行の実装説明として書き換えません。

## Naming and Import Conventions

- TypeScript / TSX はケバブケース（例: `course-list.tsx`）にする
- テストは `*.test.ts` または `*.test.tsx` にする
- App Router の予約ファイルは Next.js のファイル規約に従う
- `@/*` は `./src/*` のパスエイリアスとして使う
- 共通 UI の色は `src/styles/tailwind.css` のセマンティックトークンを使う
- 新しい表示文言は、対応する英語面がある場合は日英辞書の両方へ追加する

## Development Scripts

利用可能なコマンドは `package.json` が正典です。

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run test
npm run test:coverage
npm run format
npm run format:check
npm run check:all
npm run analyze
```

`check:all` は lint、format:check、type-check、test を実行します。Next.js のルート入口まで
確認する場合は `npm run build` を別途実行します。
