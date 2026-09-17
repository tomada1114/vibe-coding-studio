# Vibe Coding Studio - Product Overview

**Inclusion Mode**: Always

---

## Product Overview

Vibe Coding Studio は、AI 駆動開発を実践する増山友司（とまだ）の公開プロフィール、
Udemy 講座、Discord コミュニティを紹介するサイトです。Next.js App Router、React、
TypeScript、Tailwind CSS v4、Geist Grid を使い、CMS や認証システムを持たずに運用します。

日本語を既定の言語とし、プロフィール・講座一覧・コミュニティの3つの公開面に英語版を
提供します。講座やプロフィールの事実はリポジトリ内の型付きデータから読み込み、表示文言は
ロケール辞書で管理します。

## Public Surfaces

| URL | 内容 |
| --- | --- |
| `/` / `/en` | プロフィール、書籍、活動実績、外部リンク |
| `/courses` / `/en/courses` | Udemy 講座一覧とトピック |
| `/community` / `/en/community` | Discord コミュニティへの案内と、取得可能な場合のメンバー数 |

サイトマップと robots メタデータは `src/app/sitemap.ts` と `src/app/robots.ts` で生成します。
サイトURLは `src/lib/seo/site-url.ts` を通して正規化します。

## Core Features

### Profile

- 書籍情報、経歴、発信先をプロフィールページに表示する
- GitHub、YouTube、LinkedIn、Qiita、note、Udemy などのリンクを提供する
- 構造化データとページメタデータを生成する

### Courses

- `src/data/udemy-courses/` の型付きデータを表示する
- 日本語と英語の辞書を使い分ける
- コースカードとトピック表示を共有コンポーネントで構成する

### Community

- Discord への参加導線を提供する
- `DISCORD_BOT_TOKEN` と `DISCORD_GUILD_ID` が設定されている場合だけ、サーバー側で
  Discord API から概算メンバー数を取得する
- 設定が無い場合や取得に失敗した場合は、ページ全体を壊さずメンバー数を省略する

## Design and Accessibility

公開ページと共通シェルは Geist Grid の規則に従います。実装の正典は
`.claude/skills/geist-grid-design/SKILL.md`、トークンとユーティリティは
`src/styles/tailwind.css` で管理します。

キーボード操作、スキップリンク、適切な見出し・ランドマーク、フォーカス表示を維持し、
WCAG 2.1 AA を目標にします。表示文言は `src/i18n/dictionaries.ts`、パスとロケール判定は
`src/i18n/locale.ts` が管理します。

## Security and Privacy

- セキュリティヘッダーは `next.config.mjs` の `headers()` で静的に付与する
- CSP は静的生成と ISR を維持するため nonce を使わず、必要なインライン処理を許可する
- Discord のトークンはサーバー側の環境変数だけで扱い、クライアントへ渡さない
- 環境変数の名前と用途は `.env.example` と `config/env-definitions.json` を正典とする
- 現在、公開 API の Route Handler やユーザー認証は提供しない

## Performance

- 公開ページは静的生成を基本とする
- コミュニティページと Discord メンバー数は `revalidate = 3600` のキャッシュを利用する
- Next.js Image の AVIF/WebP 変換と、`next.config.mjs` の画像・アセットキャッシュを利用する
- `npm run analyze` でバンドル分析を実行できる

## Quality Bar

変更前後に、対象に応じた最短のチェックを実行し、コミット前に次を通します。

```bash
npm run check:all
npm run test:coverage
npm run build
```

Jest のグローバルカバレッジ閾値（branches / functions / lines / statements）は
`jest.config.js` の `coverageThreshold` が正典です。新機能は対応するテストと、外部から
観測できる振る舞いに影響する場合は該当ドキュメントを追加・更新します。

## Extension Points

- ページを追加するときは `src/app/` と必要な英語パスを追加する
- 公開データを追加するときは `src/data/` の型とテストを更新する
- 新しい表示文言は英語版が存在する面なら日英両方の辞書に追加する
- 共通 UI は `src/components/geist/` または機能別のコンポーネントディレクトリに置く
- テーマやデザイントークンの変更は Geist Grid の skill と `src/styles/tailwind.css` に従う

## Current Status

- プロフィール、講座、コミュニティの日本語・英語ページを提供している
- 共通ヘッダー、フッター、テーマ切替、エラーページは Geist Grid に移行済み
- Jest、ESLint、TypeScript、Prettier、Next.js build を CI で検証している
- コミュニティの外部データ取得は任意で、設定が無い環境でも静的サイトとして表示できる
