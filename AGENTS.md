# AGENTS.md

このリポジトリでコードを扱う AI コーディングエージェント（Claude Code / Codex CLI）向けの共通ガイド。
Claude Code は `CLAUDE.md` 経由でこのファイルを読み込む。

**日本語で回答すること。**

## プロジェクト概要

**Vibe Coding Studio** — Next.js 15（App Router）/ React 19 / Tailwind CSS v4 / TypeScript strict の
静的サイト。Udemy講座、学習ドキュメント（Markdoc）を配信する。
デザインシステムは「Geist Grid」（ダーク既定＋ライト手動切替）。日本語が既定で、`/en` に英語トップがある。

## 開発コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` / `build` / `start` | 開発サーバー / 本番ビルド / 本番起動 |
| `npm run check:all` | lint → format → type-check → test。コミット前にこれを通す |
| `npm run lint` / `type-check` / `test` / `test:coverage` | 個別実行 |

ウォッチ実行は `npx jest --watch <path>`（`test:watch` スクリプトは無い）。

## デザイン: Geist Grid

ページの新規作成・デザイン刷新・テーマやトークンの変更をするときは、`geist-grid-design` skill
（`.claude/skills/geist-grid-design/SKILL.md`）を読んでそれに従う。カラートークン、派手さ予算の数値上限、
タイポグラフィ、セル構造、コンポーネント規則、`data-theme` によるテーマ実装、移行ステータス、
実装チェックリストは全て skill が単一の情報源で、ここには複製しない。

このリポジトリ側で判断が要るのは次の 3 点:

- **新規ページは Geist Grid で作る。** 移行済みはトップ（`/`・`/en`）、共通ヘッダー・フッター、講座一覧（`/courses`）で、
  `/docs` `/community` は旧 Radiant のライトデザインのまま混在している。
- 未移行ページへの**小さな修正**のときだけ既存の流儀（`gray-*` / `bg-white`）に合わせる。
  ページ単位で作り直すなら旧流儀に合わせず Geist Grid へ移行する。
- Geist Grid のコードでは色をセマンティックトークン（`bg-bg` / `text-text-secondary` / `border-border`）
  経由でのみ参照する。生 hex・`gray-*`・コンポーネント内の `dark:` は書かない。

## 開発ワークフロー

- テストファースト（t-wada スタイルの TDD）を既定とする。テストは解を検証するものであって定義するものではない。
  テストケースへのハードコードは解決ではない。
- コミット前に `npm run check:all` を通す。lint・型・テストのエラーを残したままコミットしない。
- コミットは小さく原子的に、Conventional Commits で。
- パスエイリアスは `@/` → `./src/`。

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
