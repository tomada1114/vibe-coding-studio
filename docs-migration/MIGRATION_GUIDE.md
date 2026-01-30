# /docs セクション マイグレーションガイド

Learning Next の `/docs` セクション（Claude Code を除く7コース）を別の Next.js サイトへ移行するためのガイドです。

## 前提条件

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Node.js 18+

## 1. 依存パッケージのインストール

`config/dependencies.json` に記載のパッケージをインストールしてください。

```bash
npm install @markdoc/markdoc @markdoc/next.js @algolia/autocomplete-core \
  @headlessui/react @sindresorhus/slugify clsx flexsearch js-yaml \
  lucide-react prism-react-renderer react-highlight-words

npm install -D @tailwindcss/typography
```

## 2. next.config.mjs の変更

`config/next.config.sample.mjs` を参考に、以下を設定してください。

- `pageExtensions` に `'md'` を追加
- `withMarkdoc({ schemaPath: './src/markdoc' })` でラップ
- `withSearch` でラップ（全文検索機能）

## 3. ファイル配置マップ

| 移行元（docs-migration/内） | 配置先 |
|---|---|
| `src/app/docs/` | `<project>/src/app/docs/` |
| `src/components/` | `<project>/src/components/` |
| `src/lib/navigation.ts` | `<project>/src/lib/navigation.ts` |
| `src/lib/navigation-utils.ts` | `<project>/src/lib/navigation-utils.ts` |
| `src/lib/course-constants.ts` | `<project>/src/lib/course-constants.ts` |
| `src/markdoc/` | `<project>/src/markdoc/` |
| `public/` | `<project>/public/` |

## 4. 削除された機能一覧

以下の機能は移行対象から除外されています。

| 機能 | 元のコンポーネント/ファイル | 理由 |
|---|---|---|
| Clerk 認証 | `@clerk/nextjs` | 認証は移行対象外 |
| Supabase 進捗管理 | `LessonProgressButton`, `LessonProgressLink` | 課金・進捗管理は対象外 |
| プランバッジ | `PlanBadge` | サブスクリプション制御は対象外 |
| ペイウォール | `DocumentPaywallWrapperWithAuth` | 課金制御は対象外 |
| AI先生リンク | `/ai` へのリンク | AI機能は対象外 |
| 問題報告ボタン | `ReportIssueButton` | 元サイト固有機能 |
| プレミアムCTA | `PremiumCallToAction` | サブスクリプション販促は対象外 |
| Claude Code コース | `claude-code` 関連全ファイル | 移行対象外コース |

## 5. 修正済みファイルの変更サマリー

### DocsLayout.tsx
- `DocumentPaywallWrapperWithAuth` → `Prose` で直接ラップ
- `LessonProgressButton`, `LessonProgressLink`, `ReportIssueButton` を削除
- AI先生リンクセクションを削除
- `Suspense` import を削除

### Curriculum.tsx (src/components/docs/)
- `PlanBadge` の import と使用を削除
- 「学習進捗を確認」セクション（`/dashboard/lesson-progress` リンク）を削除
- Claude Code 用の条件分岐（`slug === 'claude-code'`）を削除

### MobileNavigation.tsx
- `@clerk/nextjs` の全 import を削除（`SignedIn`, `SignedOut`, `SignInButton`, `UserButton`）
- `AuthLinks` コンポーネントを完全削除
- `BasicNavLinks` を `/docs` のみに簡素化

### docs/page.tsx（コース一覧）
- `PlanBadge`, `PremiumCallToAction`, `DocsCareerListStructuredData` を削除
- Claude Code コースセクション（AI駆動開発カテゴリ）を削除
- フッターのサブスクリプション CTA を削除
- メタデータのサイト名を汎用化

### course-constants.ts
- `PlanLevel` 型の import を削除
- `requiredPlan` フィールドを全コースから削除
- Claude Code コースエントリを削除
- `SORTED_COURSES_FOR_HOME` を削除（ホーム用ソート不要）

### navigation.ts
- Claude Code コースセクション（先頭エントリ）を削除
- 7コース（RSpec, Ruby, Rails, JavaScript, React, TypeScript, Python）のみ残存

### navigation-utils.ts
- `basicNavLinks` を `/docs` のみに簡素化（`/pricing`, `/quiz`, `/dashboard` を削除）

## 6. 注意事項

### import パスの調整

コンポーネント内の `@/` エイリアスは移行先プロジェクトの `tsconfig.json` の `paths` 設定に依存します。

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### SEO関連ユーティリティ

以下のファイルは本パッケージに含まれていません。移行先で独自に実装してください。

- `src/lib/seo/breadcrumb-utils.ts` — パンくずリスト生成
- `src/lib/constants/icons.ts` — Devicon マッピング定数（`DEVICON_COLORS`）
- `src/components/Logo.tsx` — ロゴコンポーネント

### Tailwind CSS Typography プラグイン

`Prose` コンポーネントが `@tailwindcss/typography` に依存しています。Tailwind 設定で有効化してください。

## 7. 新しいコースを追加する手順

1. `src/lib/course-constants.ts` の `ALL_COURSES` 配列に新しいコース情報を追加
2. `src/lib/navigation.ts` にコースのチャプター・レッスン構造を追加
3. `src/app/docs/<course-slug>/` ディレクトリを作成
4. 各チャプター用の Markdown ファイルを作成
5. コーストップページ `page.tsx` を作成（`Curriculum` コンポーネントを使用）

## 8. ナビゲーション再生成手順

Markdown ファイルからナビゲーション構造を自動生成する Python スクリプトが付属しています。

```bash
cd src/app/docs
python markdoc_to_navigation.py
```

出力されたナビゲーション定義を `src/lib/navigation.ts` に反映してください。

## 9. 確認チェックリスト

- [ ] 全依存パッケージがインストールされている
- [ ] `next.config.mjs` に Markdoc/Search 設定が追加されている
- [ ] `@/` パスエイリアスが正しく設定されている
- [ ] `npm run build` がエラーなく完了する
- [ ] `/docs` ページでコース一覧が表示される
- [ ] 各コースの `/docs/<slug>` ページが表示される
- [ ] Markdown コンテンツが正しくレンダリングされる
- [ ] コードブロックのシンタックスハイライトが動作する
- [ ] 全文検索機能が動作する
- [ ] モバイルナビゲーションが動作する
- [ ] 前後ナビゲーションが動作する
- [ ] パンくずリストが正しく表示される
- [ ] Clerk / Supabase / PlanBadge の import が残っていない
