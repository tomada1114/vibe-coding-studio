# AGENTS.md

このリポジトリでコードを扱う AI コーディングエージェント（Claude Code / Codex CLI）向けの共通ガイド。
Claude Code は `CLAUDE.md` 経由でこのファイルを読み込む。

**日本語で回答すること。**

## プロジェクト概要

**Vibe Coding Studio** — Next.js 15（App Router）/ React 19 / Tailwind CSS v4 / TypeScript strict の
静的サイト。YouTube 動画メタデータ、Udemy クーポン、学習ドキュメント（Markdoc）、ロードマップを配信する。
デザインシステムは「Geist Grid」（ダーク既定＋ライト手動切替）。日本語が既定で、`/en` に英語トップがある。

## 開発コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` / `build` / `start` | 開発サーバー / 本番ビルド / 本番起動 |
| `npm run check:all` | lint → format → type-check → test → validate:indexes。コミット前にこれを通す |
| `npm run lint` / `type-check` / `test` / `test:coverage` | 個別実行 |
| `npm run update:video-indexes` | 動画・Udemy 講座インデックスを再生成して検証（generate → validate） |

ウォッチ実行は `npx jest --watch <path>`（`test:watch` スクリプトは無い）。

## 動画メタデータの追加

型は `src/types/video.ts` の `VideoMetadata`。

1. `src/data/videos/<VIDEO_ID>.ts` を作る。共通セクション（SNS / Discord / エンゲージメント）は
   `src/data/shared/common-sections.ts` の `commonSections` を参照し、値を複製しない。
2. `src/lib/videos/video-data.ts` に import と配列への追加を書く（全動画の集約点）。
3. `npm run update:video-indexes` を実行する。`src/data/indexes/*.json` は自動再生成されないので、
   これを忘れると `check:all` の `validate:indexes` で落ちる。
4. タイムスタンプは `HH:MM` または `HH:MM:SS`。

記法の詳細は `docs/video-data-guide.md`、インデックスの仕組みは `docs/VIDEO_METADATA_INDEXING.md`。
コメント形式からの変換は `/convert-video`。

## デザイン: Geist Grid

ページの新規作成・デザイン刷新・テーマやトークンの変更をするときは、`geist-grid-design` skill
（`.claude/skills/geist-grid-design/SKILL.md`）を読んでそれに従う。カラートークン、派手さ予算の数値上限、
タイポグラフィ、セル構造、コンポーネント規則、`data-theme` によるテーマ実装、移行ステータス、
実装チェックリストは全て skill が単一の情報源で、ここには複製しない。

このリポジトリ側で判断が要るのは次の 3 点:

- **新規ページは Geist Grid で作る。** 移行済みはトップ（`/`・`/en`）と共通ヘッダー・フッターだけで、
  `/videos` `/docs` `/coupons` `/community` `/roadmap` は旧 Radiant のライトデザインのまま混在している。
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
| `docs/video-data-guide.md` / `VIDEO_METADATA_INDEXING.md` / `UDEMY_COURSE_WORKFLOW.md` | 動画・講座まわりの運用 |
| `.kiro/steering/` | product / tech / structure の指針 |
| `.kiro/specs/` | 機能仕様（完了分は `archive/`）。`/kiro:*` コマンドは削除済みなので手で更新する |

参照先であって、内容をここに再掲しない。

## 品質基準

- カバレッジのしきい値は `jest.config.js` が単一の情報源（現状 global 70%）。コアロジックは 80% 以上を目安に。
- アクセシビリティは WCAG 2.1 AA（キーボード操作・スクリーンリーダー対応）。
- Core Web Vitals: LCP < 2.5s / CLS < 0.1 / INP < 200ms。
- 新機能を追加したら関連ドキュメントを更新する。
