---
description: Create new Udemy course coupon pages from markdown file using udemy-coupon-creator skill
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, mcp__chrome-devtools__navigate_page, mcp__chrome-devtools__take_snapshot, mcp__chrome-devtools__take_screenshot
argument-hint: <markdown-file-path>
model: sonnet
---

# Create Udemy Course Coupon Page

Markdownファイルから新しいUdemy講座のクーポン配布ページを一括作成します。

**Markdown File Path**: $ARGUMENTS

## Skill Reference

このコマンドは `udemy-coupon-creator` スキルを使用します。

@.claude/skills/udemy-coupon-creator/SKILL.md

## Quick Start

### 使用方法

```bash
/create-udemy-course src/data/coupons/courses/{講座名}.md
```

### 前提条件

1. Markdownファイルが `src/data/coupons/courses/` に存在すること
2. サムネイル画像が `public/images/udemy/{slug}.png` に準備されていること

## Markdown Template

Markdownファイルには以下のセクションが必要です：

```markdown
## ID
{7桁の講座ID}

## 価格（定価）
{価格}円
クーポン適用後 {割引価格}円

## 仮のクーポンコード
{YYYY-MM-DD形式}

## スラグ
{url-friendly-slug}

## プロモーションURL
https://www.udemy.com/course/{slug}/?referralCode=XXXXX

## サムネに使って欲しい画像
public/images/udemy/{slug}.png

## 主な技術
{tech1}, {tech2}, {tech3}

## コースタイトル
{講座タイトル}

## コースのサブタイトル
{サブタイトル}

## コースの説明文
{講座の説明}

### コースで受講生は何を学びますか？
- {学習内容1}
- {学習内容2}

### コースを受講するための要件や前提条件は何ですか？
- {前提条件1}
- {前提条件2}

### 誰に向けたコースですか？
- {対象者1}
- {対象者2}
```

## Execution

以下のタスクを順番に実行してください：

1. **入力ファイルの確認**: `$ARGUMENTS` が存在するか確認
2. **スキルの手順に従って実行**: `udemy-coupon-creator` スキルの Instructions セクションを参照
3. **完了報告**: スキルの完了報告形式に従う

## Output Files

このコマンドは以下のファイルを作成・更新します：

| ファイル | 内容 |
|----------|------|
| `src/constants/coupon-courses.ts` | COURSE_INFO, COURSE_DISPLAY_ORDER, TOPIC_INFO |
| `src/lib/coupons/coupon-data.ts` | COUPON_DATA |
| `src/lib/coupons/__tests__/coupon-data.test.ts` | EXPECTED_COURSE_IDS |
| `src/app/coupons/{slug}/page.tsx` | 詳細ページ（新規作成） |

## Quality Checks

必ず以下のチェックを実行：

```bash
npm run type-check && npm run lint && npm run test -- src/lib/coupons/__tests__/coupon-data.test.ts
```

## Browser Verification

開発サーバー（`npm run dev`）で以下を確認：

- `/coupons` - 一覧ページに新講座が表示されること
- `/coupons/{slug}` - 詳細ページが正常に表示されること
