---
name: changing-gates
description: >
  CI ワークフローや jest.config.js・eslint.config.mjs・.prettierrc・tsconfig.json・
  next.config.mjs など「品質を強制する側」のファイルを変更するときの唯一のルールと、
  各ゲートが実際に何を検査し何を検査していないかを定義する。`ci.yml` の static/test
  ジョブ構成、カバレッジ閾値、Prettier/ESLint/型検査の対象範囲、dependency-review と
  security-audit の役割、pre-commit フックが現状無い事実を扱う。
  Use when CI ワークフローを変更する, カバレッジ閾値を変える, lint/format/型検査の設定
  を変える, ゲートを緩める変更をレビューする, changing a CI gate or quality config file.
---

# ゲートの変更

**扱う:** CI ワークフローや lint/format/型検査/カバレッジの設定ファイルを変更するときの
承認ルール、各ゲートが検査する範囲と検査しない範囲。
**扱わない:** 依存追加そのものの判断基準（`managing-dependencies`）；個々のテストの書き方
（`writing-tests`）；デザインの中身（`geist-grid-design`）。

## 唯一のルール: 緩める変更は人間の承認を通す

「強制する側」のファイル — `.github/workflows/*.yml`、`jest.config.js`、
`eslint.config.mjs`、`.prettierrc`、`tsconfig.json`、`next.config.mjs` — を**緩める**
変更は、必ず人間の承認を経てから行う。カバレッジ閾値を下げる、`--no-verify` でチェックを
スキップする、`eslint-disable` を濫発する、テストを削除・skip 化して通す、といった手段で
「ゲートを通す」ことは禁止する。CI やコミット前チェックを黙って弱くしてタスクを終わらせない。

## `ci.yml` の構成

`push`（main のみ）と `pull_request` で動く2ジョブ構成:

- **static** — `format:check` → `lint` → `type-check` → `build` の順。`next build` は
  `tsc --noEmit` だけでは届かない App Router のエントリポイント（`page.tsx`/`layout.tsx`
  などファイルシステム規約で読み込まれるファイル）を型検査する役割を負う。
- **test** — `test:coverage`（`jest --coverage`）。

両ジョブに共通する設計:

- トップレベルで `permissions: {}` を宣言し、ジョブごとに `contents: read` を個別付与する。
- `actions/checkout` と `actions/setup-node` は commit SHA 固定で、
  `persist-credentials: false`。
- concurrency は PR では `cancel-in-progress: true`、main への push は commit SHA を
  キーにするため、連続マージが互いをキャンセルせず、着地済みコミットの CI 記録も消えない。

## `jest.config.js`

- `coverageThreshold.global` は branches/functions/lines/statements すべて 70。
- `collectCoverageFrom` は `src/**/*.{js,jsx,ts,tsx}` から `*.d.ts` と `types.ts` を除外。

## Prettier / ESLint / 型検査の対象範囲

- `.prettierignore` は `*.md`/`*.mdx`・`package-lock.json`・`coverage/`・`public/` を
  除外する。**Markdown はフォーマット対象外。**
- `eslint.config.mjs` は `next/core-web-vitals` + `next/typescript` + `prettier` ベース
  で、`next lint`（`npm run lint`）は `src` 中心。ルート直下の `__tests__/` は対象外。
- `tsconfig.json` の `exclude` に `**/*.test.ts` / `**/*.test.tsx` / `__tests__/**/*` が
  入っており、テストコードは現状 `type-check`（`tsc --noEmit`）の対象**外**。実行時の
  検証は `npm run test`（Jest）が担う。テストコードを型検査に含める変更は Issue #90 で
  検討中。
- ローカルの `npm run check:all` は `test`（カバレッジ計測なし）を走らせる。CI の test
  ジョブは `test:coverage` を走らせる点が異なる。

## 見ていないもの

- ブラウザでの実際の見た目・挙動。
- WCAG のアクセシビリティ（AGENTS.md の品質基準にある WCAG 2.1 AA を、どのゲートも
  自動検査していない）。
- Core Web Vitals（LCP/CLS/INP）の実測。
- ローカルのコミットそのもの。pre-commit フックは現状無く、`npm run check:all` を実行
  するかは各作者（人間 / Claude Code / Codex）の裁量に委ねられている。lefthook 導入は
  Issue #86 で検討中。

## `dependency-review.yml` / `security-audit.yml`

- **dependency-review** — PR 作成時に実行。新規依存の脆弱性を `fail-on-severity: moderate`
  で検査し、`AGPL-3.0`/`GPL-2.0`/`GPL-3.0`/`LGPL-2.1`/`LGPL-3.0`/`SSPL-1.0` のコピー
  レフトライセンスを拒否する。
- **security-audit** — 毎週月曜 06:00 UTC のスケジュール実行（`workflow_dispatch` でも
  手動起動可）。`npm audit --omit=dev --audit-level=moderate` を本番依存に対して実行し、
  レジストリ障害に備えて3回までリトライしてから fail closed する。
