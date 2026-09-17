# Vibe Coding Studio - Technology Stack

**Inclusion Mode**: Always

---

## Architecture

- **Framework**: Next.js 16.3.4 App Router
- **UI runtime**: React 19 の Server Components を基本とし、状態・イベント・ブラウザ API が
  必要な部品だけを Client Component にする
- **Rendering**: 静的生成を基本とし、コミュニティ関連ページと Discord データは ISR を使う
- **Data**: プロフィールと講座はローカルの型付きデータ、表示文言は日英辞書で管理する
- **Public API**: 現在、`src/app/api/` の Route Handler は提供しない

ページのルート定義は `src/app/`、共通の表示実装は `src/components/geist/`、公開データは
`src/data/` が正典です。

## Runtime and Build

| Package / tool | Version or setting | Role |
| --- | --- | --- |
| `next` | `16.3.4` | App Router、画像最適化、ビルド |
| `react` / `react-dom` | `^19` | UI ランタイム |
| `geist` | `^1.7.2` | Geist Sans / Geist Mono |
| `typescript` | `^5` | strict な型検査 |
| `tailwindcss` | `^4.1.11` | ユーティリティ CSS |
| `@tailwindcss/postcss` / `postcss` | `^4.1.11` / `^8.5.6` | CSS ビルド |
| `clsx` | `^2.1.1` | 条件付きクラス名 |

依存関係の正確な一覧とバージョンは `package.json` と `package-lock.json` を参照します。
依存の追加・更新・削除では `managing-dependencies` skill に従います。

## Styling and Design

- Tailwind CSS v4 は `postcss.config.js` と `src/styles/tailwind.css` で構成する
- Geist Grid のセマンティックトークンとユーティリティは `src/styles/tailwind.css` に置く
- Geist Grid の設計判断と数値上限は `.claude/skills/geist-grid-design/SKILL.md` と
  `docs/design/proposals/2026-09-geist-grid.md` を正典とする
- フォントは `geist` パッケージの Geist Sans / Geist Mono と、`layout.tsx` から読み込む
  Noto Sans JP を使う
- UI の色は生の hex 値ではなくセマンティックトークンを使う

## Routing, Locale, and SEO

- 日本語はプレフィックスなし、英語は `/en` プレフィックスで提供する
- 英語対応パスは `src/i18n/locale.ts` の `EN_ENABLED_PATHS` で管理する
- 表示文言は `src/i18n/dictionaries.ts`、ロケールと内部パス変換は `src/i18n/locale.ts` が担う
- `src/app/layout.tsx` が共通メタデータ、テーマ初期化、Header、Footer を提供する
- `src/lib/seo/site-url.ts` が `NEXT_PUBLIC_SITE_URL` を検証し、未設定時はフォールバック URL を返す
- `src/app/robots.ts` と `src/app/sitemap.ts` が検索エンジン向けメタデータを生成する

## External Data and Environment

利用可能な環境変数は `.env.example` と `config/env-definitions.json` に定義します。

| Variable | Required | Use |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | canonical URL、OGP、robots、sitemap |
| `DISCORD_BOT_TOKEN` | No | Discord API のサーバー側認証 |
| `DISCORD_GUILD_ID` | No | メンバー数を取得する Guild ID |

Discord の設定が無い場合、`src/lib/discord-api.ts` はメンバー数を利用不可として扱い、
ページはそれ以外の内容を表示します。トークンを Client Component や公開データへ渡しません。

## Next.js Configuration

`next.config.mjs` は次を設定します。

- React strict mode と本番ビルド時の TypeScript エラー検出
- AVIF / WebP の画像変換とローカル画像向けキャッシュ TTL
- 全ルートの CSP、X-Frame-Options、X-Content-Type-Options、Referrer-Policy
- 旧 URL（`/home`、`/index`、`/founder`、`/coupons`）から現行 URL へのリダイレクト
- `npm run analyze` で有効にするバンドル分析

CSP は静的生成と ISR を維持するため nonce を使いません。変更時は
`changing-gates` skill と `src/app/__tests__/security-headers.test.ts` を確認します。

## Development Environment

- Node.js: `.node-version` に定義した `24.18.1` 以上
- npm: `package.json` の `packageManager` に定義した `11.16.0`
- TypeScript: `strict`、`noEmit`、`moduleResolution: bundler`、`verbatimModuleSyntax`、
  `resolveJsonModule`、`isolatedModules` を有効にする
- パスエイリアス: `@/*` → `./src/*`

設定ファイルは `eslint.config.mjs`、`.prettierrc`、`jest.config.js`、`jest.setup.js`、
`tsconfig.json`、`postcss.config.js` です。

## Testing and Quality Gates

Jest 30 と Testing Library を使い、テスト環境は `jest-environment-jsdom` です。テストは
対象コードの近くに置き、公開インターフェースから観測できる振る舞いを検証します。

`jest.config.js` の `coverageThreshold.global` は branches、functions、lines、statements
をそれぞれ 80% に設定します。この値は `jest.config.js` が唯一の正典です。

```bash
npm run lint
npm run format:check
npm run type-check
npm run test
npm run test:coverage
npm run check:all
npm run build
```

`check:all` は lint、format:check、type-check、test を実行します。App Router のエントリまで
確認する `build` とカバレッジ閾値を確認する `test:coverage` は別途実行します。

## CI

- `.github/workflows/ci.yml` は Pull Request と `main` への push で Static checks と Test を実行する
- Static checks は format、lint、type-check、build を実行する
- Test は `npm run test:coverage` を実行する
- `.github/workflows/dependency-review.yml` は Pull Request の依存追加を検査する
- `.github/workflows/security-audit.yml` は本番依存関係を週次または手動で監査する

ゲートを緩めるために設定やテストを変更せず、失敗原因を実装側で解消します。
