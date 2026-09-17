# AGENTS.md

このリポジトリでコードを扱う AI コーディングエージェント（Claude Code / Codex CLI）向けの共通ガイド。
Claude Code は `CLAUDE.md` 経由でこのファイルを読み込む。

このガイドは3層のうちの1つ。**設定ファイル**（`jest.config.js`・`eslint.config.mjs`・
`.github/workflows/*` など）が機械的に強制できる値そのものを持ち、**スキル**
（`.claude/skills/`）がある種類の変更に手を付けた**あとで**要る手順と判断を持つ。この
ファイルが持つのは、どのタスクに手を付けるかが決まる**前**に真でなければならないこと
——プロジェクトの形、承認の規約、どのスキルを読むべきか——だけ。1つのルールは1箇所
にだけ書く。設定が持つ値をここやスキルに書き写さない。書き写した側が先に古くなる。
ゲートを走らせれば学べることを、先回りして書かない。

**日本語で回答すること。**

## プロジェクト概要

**Vibe Coding Studio** — Next.js 15（App Router）/ React 19 / Tailwind CSS v4 / TypeScript strict の
静的サイト。プロフィール、Udemy講座、Discordコミュニティを配信する。旧学習ドキュメント（`/docs` / Markdoc）は廃止済み。
デザインシステムは「Geist Grid」（ダーク既定＋ライト手動切替）。日本語が既定で、トップ・講座・コミュニティに英語版がある。

## 開発コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` / `build` / `start` | 開発サーバー / 本番ビルド / 本番起動 |
| `npm run check:all` | lint → format → type-check → test。コミット前にこれを通す |
| `npm run lint` / `type-check` / `test` / `test:coverage` | 個別実行 |

ウォッチ実行は `npx jest --watch <path>`（`test:watch` スクリプトは無い）。

## 変更を検証する

落とせる最短のチェックをまず走らせ、最後に `npm run check:all` を通す。毎回フルゲート
を待つのは遅く、結局誰も走らせなくなる。

| 変更した対象 | 最短のチェック |
|---|---|
| `src/components/geist/**` | `npx jest src/components/geist` |
| `src/i18n/**`（辞書・ロケール） | `npx jest src/i18n` |
| `src/lib/**` | `npx jest src/lib` |
| `src/data/**` | `npx jest src/data` |
| `src/app/**` のページ・レイアウト | `npm run build`（App Router のエントリは `tsc` では届かない） |
| `src/styles/tailwind.css`（トークン） | `npm run build` + 該当ページの Geist Grid 規則テスト |
| 型だけの変更 | `npm run type-check` |
| `.claude/skills/**`・`AGENTS.md` のスキル表 | `npx jest __tests__/skills.test.ts` |
| `package.json` / `package-lock.json` | `npm ci && npm run check:all` |
| `.github/workflows/**` | ローカルでは落とせない。`changing-gates` を読む |
| 何を変更しても最後に | `npm run check:all` |

## スキル

`.claude/skills/` 配下のスキルは、ある種類の変更に手を付けた**あとで**要る手順と判断を持つ。
実体は `.claude/skills/` にあり、`.agents/skills/` はそこへのシンボリックリンクで Codex CLI の
入口になる。スキルの書き方・境界宣言の書式・新しいスキルを起こす基準は `authoring-skills` が
単一の情報源。

| スキル | 読むとき |
|---|---|
| `geist-grid-design` | ページを新規作成する、デザインを刷新する、テーマやトークンを変更する |
| `authoring-skills` | スキルを追加・編集・レビューする、`AGENTS.md` とスキルのどちらに書くか迷う |
| `writing-tests` | テストを書く・直す、どこに置くか決める |
| `changing-gates` | `.github/workflows/*`・`jest.config.js`・`eslint.config.mjs`・`.prettierrc`・`tsconfig.json`・`next.config.mjs` を変更する |
| `managing-dependencies` | パッケージを追加・更新・削除する、Dependabot の PR を扱う |
| `triaging-issues` | Issue を起票する、トリアージする、優先度を付ける |
| `updating-docs` | その変更がドキュメント更新を要するか判断する |

## デザイン: Geist Grid

ページの新規作成・デザイン刷新・テーマやトークンの変更をするときは、`geist-grid-design` skill
（`.claude/skills/geist-grid-design/SKILL.md`）を読んでそれに従う。カラートークン、派手さ予算の数値上限、
タイポグラフィ、セル構造、コンポーネント規則、`data-theme` によるテーマ実装、移行ステータス、
実装チェックリストは全て skill が単一の情報源で、ここには複製しない。

このリポジトリ側で判断が要るのは次の 3 点:

- **新規ページは Geist Grid で作る。** 公開ページ（`/`・`/en`・`/courses`・`/en/courses`・`/community`・`/en/community`）、
  共通ヘッダー、フッター、エラーページはすべて Geist Grid に移行済み。
- 旧学習ドキュメントページは存在しない。新しい表示文言は `src/i18n/dictionaries.ts` の日英両方へ追加し、
  英語版があるパスは `src/i18n/locale.ts` の `EN_ENABLED_PATHS` で管理する。
- Geist Grid のコードでは色をセマンティックトークン（`bg-bg` / `text-text-secondary` / `border-border`）
  経由でのみ参照する。生 hex・`gray-*`・コンポーネント内の `dark:` は書かない。

## 開発ワークフロー

- テストファースト（t-wada スタイルの TDD）を既定とする。テストは解を検証するものであって定義するものではない。
  テストケースへのハードコードは解決ではない。
- `npm install` / `npm ci` の `prepare` script が Lefthook の pre-commit フックをインストールする。
  `git commit` では、ステージ済みファイルのフォーマット、対象ソースの ESLint と関連テスト、プロジェクト全体の
  TypeScript 型チェックを実行する。フォーマッターが直したファイルは自動で再ステージされる。
- コミット前に `npm run check:all` を通す。lint・型・テストのエラーを残したままコミットしない。
- コミットは小さく原子的に、Conventional Commits で。
- パスエイリアスは `@/` → `./src/`。

## セキュリティと人間の承認

グローバル `~/.claude/AGENTS.md` の「Ask before destructive or external writes」を、
このリポジトリの具体に落とすと次になる。

- commit・push・PR 作成・マージは常に人間の判断を通す。これは規約であり、機械が
  強制しているわけではない（下の「強制の層」参照）。
- `.env` と `.env.local` は読まない。読むこと自体が漏洩なので、`cat`・`grep`・一時
  ファイルへのコピー・コマンドライン引数への露出も同じく避ける。参照してよいのは
  `.env.example` と `config/env-definitions.json` だけ。
- 秘密情報を追跡対象のファイルに書かない。`.claude/settings.local.json` は
  gitignore 済みで、これも読まない。
- `package-lock.json` は `npm install` / `npm ci` の生成物。手で編集しない。
- **ゲートを緩めて CI を通さない。** 具体的に禁止する手段: `jest.config.js` の
  `coverageThreshold` を下げる / `collectCoverageFrom` に除外を足す / `--no-verify` /
  範囲を切らない `eslint-disable` / `@ts-ignore` / `it.skip` の追加 / `.github/workflows/`
  のジョブやステップの削除 / `dependency-review.yml` の `fail-on-severity` の引き下げ。
  ゲートの方が間違っていると思ったら、緩めるのではなく人間に聞く。
- 最後の1項がスキルではなくここに要る理由: 赤い CI を前にしたエージェントは自分の
  タスクを「CI を緑にする」と分類していて、どのスキルも発火しない。

## 強制の層

| 層 | いつ動くか | 適用範囲 | 何を持つか |
|---|---|---|---|
| `.github/workflows/ci.yml` | `main` への push と全 PR | リポジトリ全体・人もエージェントも | `format:check` → `lint` → `type-check` → `build`、および `test:coverage` |
| このファイル | エージェントセッションの開始時 | エージェントの作業のみ | 設定が表現できない判断と、機械が強制しない禁止事項 |

- **pre-commit フックは Lefthook で有効。** `npm install` / `npm ci` の `prepare` script がフックを
  インストールする。ローカルのコミット前に実行される検査は `lefthook.yml` を正典とし、フックは CI の代替ではない。
  CI がリポジトリ全体の最終ゲートであり、「手元で緑だった」だけでは着地の根拠にならない。
- `.claude/settings.json` の `SessionStart` フックは `scripts/install_pkgs.sh`
  （= `npm install`）を走らせるだけで、ゲートではない。
- 第3層（`permissions.allow` / `deny`）は持たない。個人の許可リストは
  `~/.claude/settings.json` か、gitignore 済みの `.claude/settings.local.json` に置く。
- どの層も、他の層が持つルールを写さない。

## MCP

- **ブラウザ操作は Claude in Chrome（`mcp__claude-in-chrome__*`）を最優先で使う。** Playwright MCP や
  Chrome DevTools MCP が有効でもそちらを選ばない。実 Chrome のログイン済みセッションをそのまま使えるため。
  使い方は `operating-chrome` skill に従う。CDP 固有機能（パフォーマンストレース）やクリーンプロファイルが
  必要なときだけ他へフォールバックする。
- ライブラリやフレームワークの API を確認するときは Context7 を使う。

## ドキュメント・仕様

| 場所 | 内容 |
|---|---|
| `docs/PROJECT_DOCUMENTATION.md` / `API_REFERENCE.md` / `COMPONENT_GUIDE.md` | プロジェクト全体 / API / コンポーネント |
| `docs/design/` | デザインシステムの解説と `proposals/2026-09-geist-grid.md`（根拠・Decision ledger） |
| `.kiro/steering/` | product / tech / structure の指針 |
| `.kiro/specs/` | 機能仕様（完了分は `archive/`）。`/kiro:*` コマンドは削除済みなので手で更新する |

参照先であって、内容をここに再掲しない。

## 品質基準

- カバレッジのしきい値は `jest.config.js` が単一の情報源（現状 global 70%）。コアロジックは 80% 以上を目安に。
- アクセシビリティは WCAG 2.1 AA（キーボード操作・スクリーンリーダー対応）。
- Core Web Vitals: LCP < 2.5s / CLS < 0.1 / INP < 200ms。
- 新機能を追加したら関連ドキュメントを更新する。
