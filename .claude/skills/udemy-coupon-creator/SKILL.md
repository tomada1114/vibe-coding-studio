---
name: udemy-coupon-creator
description: Markdownファイルから新しいUdemy講座のクーポン配布ページを自動生成するスキル。講座情報をパースし、詳細ページ・一覧ページ更新・データファイル更新を一括で実行します。Udemyクーポン追加、新講座公開、クーポンページ作成時に使用してください。
argument-hint: <markdown-file-path>
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, mcp__chrome-devtools__navigate_page, mcp__chrome-devtools__take_snapshot, mcp__chrome-devtools__take_screenshot]
---

# Udemy Coupon Creator

Markdownファイルから新しいUdemy講座のクーポン配布ページを自動生成するスキルです。

`src/data/coupons/courses/` 内のMarkdownファイルを指定するだけで、既存の15講座と同じ構造で、詳細ページ・一覧ページ・データファイルを一括で更新します。

## When to Use This Skill

このスキルは以下のシーンで使用してください：

- 新しいUdemy講座のクーポン配布ページを作成する時
- 講座情報のMarkdownファイルが準備済みの時
- 既存クーポンページの構成を踏襲したい時
- 一覧ページと詳細ページを同時に更新したい時

## Core Philosophy

### 1. 既存パターンの完全踏襲

- **15講座の実装パターンを分析**：CourseDetailHero、PriceSection、CourseFeatures等のコンポーネント構成
- **データ構造の統一**：COURSE_INFO、COUPON_DATA、COURSE_DISPLAY_ORDERの一貫性
- **型安全性の保証**：CourseInfo、RawCouponData、Coupon型への完全準拠

### 2. Single Source of Truth

- **Markdownを唯一のデータソース**：講座情報とクーポンデータをMarkdownで一元管理
- **見出しベースのパース**：構造化された見出しから必要な情報を抽出
- **変換ロジックの自動化**：Markdown → TypeScript型への自動変換

### 3. 品質とテストの徹底

- **型チェック**：TypeScript厳格モードでの検証
- **リント検査**：ESLintによるコード品質チェック
- **テスト実行**：Jestでのデータ整合性テスト
- **ブラウザ確認**：Chrome DevTools MCPでの動作確認

## Instructions

### Step 1: Markdownファイルの確認と解析

1. **引数として受け取ったMarkdownファイルパスを確認**：
   - 例：`src/data/coupons/courses/fastapi-codex.md`
   - ファイルが存在するか確認

2. **Markdownの構造を解析**（見出しベース）：

   **必須セクション**：
   - `## ID` → courseId
   - `## 価格（定価）` → originalPrice（数値のみ抽出、例：`9800円` → `9800`）
   - `クーポン適用後 XXXX円` → discountPrice（例：`1500円` → `1500`）
   - `## 仮のクーポンコード` → couponCode（YYYY-MM-DD形式）
   - `## スラグ` → slug
   - `## プロモーションURL` → promotionUrl
   - `## サムネに使って欲しい画像` → thumbnailPath（例：`public/images/udemy/codex_fastapi.png`）
   - `## 主な技術` → topics（カンマ区切り配列化）
   - `## コースタイトル` → title
   - `## コースのサブタイトル` → subtitle
   - `## コースの説明文` → description（マークダウンブロック内のテキスト）

   **学習者情報**：
   - `### コースで受講生は何を学びますか？` → learningPoints
   - `### コースを受講するための要件や前提条件は何ですか？` → requirements
   - `### 誰に向けたコースですか？` → targetAudience

3. **サムネイル画像の存在確認と準備**：
   - `public/images/udemy/` に指定された画像が存在するか確認
   - **重要**: 画像ファイル名は`{slug}.png`形式である必要があります
     - 例：slug が`codex-python-fast-api`なら、ファイル名は`codex-python-fast-api.png`
     - Markdownに記載されたファイル名（例：`codex_fastapi.png`）がslugと異なる場合は、コピーまたはリネームが必要
   - CourseDetailHeroコンポーネントは`/images/udemy/${slug}.png`でアクセスするため
   - なければ警告を表示（処理は継続）

### Step 2: データファイルの更新

#### 2.1 COURSE_INFOへの追加（`src/constants/coupon-courses.ts`）

```typescript
export const COURSE_INFO: Record<string, CourseInfo> = {
  // 既存のエントリ
  "{courseId}": {
    originalPrice: {originalPrice},
    description: "{descriptionの1行目または要約}",
    slug: "{slug}",
    title: "{title}",
    topics: ["{topic1}", "{topic2}", ...],
    promotionUrl: "{promotionUrl}"
  }
}
```

**追加位置**：既存のエントリの最後に追加

#### 2.2 COUPON_DATAへの追加（`src/lib/coupons/coupon-data.ts`）

```typescript
const COUPON_DATA: RawCouponData[] = [
  {
    courseId: "{courseId}",
    couponType: "custom_price",
    couponCode: "{couponCode}",  // YYYY-MM-DD
    startDateTime: "{couponCodeから生成}-T00:00:00-07:00",  // PST基準
    endDateTime: "{1ヶ月後}-T23:00:00-08:00",  // PST基準
    currency: "JPY",
    discountPrice: {discountPrice},
    maximumRedemptions: "unlimited"
  },
  // 既存のエントリ
]
```

**追加位置**：配列の先頭（最新クーポンが先頭）

**日時生成ルール**：
- startDateTime: `{couponCode}T00:00:00-07:00`（例：`2025-11-01T00:00:00-07:00`）
- endDateTime: 1ヶ月後の月末 `T23:00:00-08:00`（例：`2025-12-01T23:00:00-08:00`）

#### 2.3 COURSE_DISPLAY_ORDERへの追加（`src/constants/coupon-courses.ts`）

```typescript
export const COURSE_DISPLAY_ORDER = [
  "{courseId}",  // 新講座を先頭に追加
  // 既存のエントリ
] as const
```

#### 2.4 TOPIC_INFOの確認と追加（`src/constants/coupon-courses.ts`）

- `topics`に含まれる各トピックが`TOPIC_INFO`に存在するか確認
- 存在しない場合は新規追加：

```typescript
export const TOPIC_INFO: Record<string, TopicInfo> = {
  // 既存のエントリ
  "{new-topic}": {
    slug: "{new-topic}",
    name: "{表示名}",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{icon-name}/{icon-name}-original.svg",
    isLocal: false
  }
}
```

**注意**：Codexなど、Deviconに存在しないアイコンの場合：
- ローカル画像を使用（例：`/images/icons/codex.svg`）
- `isLocal: true` を設定

#### 2.5 EXPECTED_COURSE_IDsへの追加（`src/lib/coupons/__tests__/coupon-data.test.ts`）

**重要**: テストファイルの`EXPECTED_COURSE_IDS`配列に新しい講座IDを追加：

```typescript
const EXPECTED_COURSE_IDS = [
  "{courseId}", // {講座の簡単な説明}
  // 既存のエントリ
] as const
```

**追加位置**：配列の先頭（最新講座が先頭）

**目的**：
- うっかりクーポンデータを削除した場合にテストで検出
- すべての講座にクーポンが存在することを保証

### Step 3: 詳細ページの生成

#### 3.1 ファイルパス

`src/app/coupons/{slug}/page.tsx`

#### 3.2 テンプレート構造

既存の15講座（例：`src/app/coupons/claude-code-vibe-coding/page.tsx`）を参考に、以下の構造で生成：

```typescript
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import CourseDetailHero from "@/components/coupons/course-detail/CourseDetailHero"
import CourseContent from "@/components/coupons/course-detail/CourseContent"
import CourseFeatures from "@/components/coupons/course-detail/CourseFeatures"
import CourseProjects from "@/components/coupons/course-detail/CourseProjects"
import TargetAudience from "@/components/coupons/course-detail/TargetAudience"
import PriceSection from "@/components/coupons/course-detail/PriceSection"
import FloatingCTA from "@/components/coupons/course-detail/FloatingCTA"

// 講座IDを定義
const COURSE_ID = "{courseId}"

// メタデータを生成
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "{title} | Vibe Coding Studio",
    description: "{descriptionの要約（160文字程度）}",
    openGraph: {
      title: "{title}",
      description: "{descriptionの要約}",
      type: "website",
      images: [
        {
          url: "{thumbnailPath}",
          width: 1200,
          height: 630,
          alt: "{title}",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "{title}",
      description: "{descriptionの要約}",
      images: ["{thumbnailPath}"],
    },
  }
}

// 静的生成設定
export const dynamic = "force-static"
export const revalidate = 3600

export default async function {SlugCamelCase}Page() {
  const coupons = await getLatestCoupons()
  const coupon = coupons.find(
    (c) => c.courseId === COURSE_ID || c.courseName.includes("{titleの一部}")
  )

  if (!coupon) {
    notFound()
  }

  // 講座詳細データ
  const courseDetails = {
    title: "{title}",
    subtitle: "{subtitle}",
    description: "{description}",
    features: [
      {
        title: "{feature1Title}",
        description: "{feature1Description}",
        icon: "🎯" // 適切な絵文字を選択
      },
      // ...4項目程度
    ],
    projects: [
      {
        title: "{project1Title}",
        description: "{project1Description}",
        technologies: ["{tech1}", "{tech2}"]
      },
      // ...2-3項目
    ],
    targetAudience: [
      {
        title: "{audience1Title}",
        items: ["{item1}", "{item2}"]
      },
      // ...3-4グループ
    ],
  }

  return (
    <>
      <CourseDetailHero coupon={coupon} />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-16">
          <CourseContent
            description={courseDetails.description}
            learningPoints={courseDetails.learningPoints}
            requirements={courseDetails.requirements}
          />
          <CourseFeatures features={courseDetails.features} />
          <CourseProjects projects={courseDetails.projects} />
          <TargetAudience audiences={courseDetails.targetAudience} />
          <PriceSection coupon={coupon} />
        </div>
      </main>
      <FloatingCTA coupon={coupon} />
    </>
  )
}
```

#### 3.3 courseDetailsの生成ルール

**features（特徴）**：
- Markdownの`[講座の特徴]`セクションから4項目抽出
- icon：内容に応じた絵文字（🎯, 💡, 🚀, ⚡, 📚, 🔧, 🎨など）

**projects（プロジェクト）**：
- Markdownの`[本講座で学べる内容]`または実装内容から2-3項目
- technologies：使用する技術スタック

**targetAudience（対象者）**：
- Markdownの`### 誰に向けたコースですか？`セクションから箇条書きをグループ化
- 各グループは関連する項目をまとめる

### Step 4: 品質チェック

#### 4.1 型チェック

```bash
npm run type-check
```

**エラーが出た場合**：
- 型定義の不一致を修正
- import文の誤りを修正
- 必須フィールドの欠落を補完

#### 4.2 リント検査

```bash
npm run lint
```

**エラーが出た場合**：
- `npm run format` で自動修正を試行
- 手動修正が必要な箇所は指摘して修正

#### 4.3 テスト実行

```bash
npm run test -- src/lib/coupons/__tests__/coupon-data.test.ts
```

**テスト内容**：
- COURSE_INFOとCOUPON_DATAの整合性
- クーポンコードの形式（YYYY-MM-DD）
- URL生成の正確性
- 日付の妥当性
- **期待されるすべての講座にクーポンが存在すること**（EXPECTED_COURSE_IDs）

**エラーが出た場合**：
- データの不整合を修正
- 形式エラーを修正
- `EXPECTED_COURSE_IDS`への追加漏れを確認

### Step 5: 開発サーバーでの動作確認

#### 5.1 開発サーバー起動

```bash
npm run dev
```

#### 5.2 Chrome DevTools MCPでの確認

**一覧ページ確認**（`/coupons`）：
1. ページにアクセス
2. 新講座のカードが表示されているか
3. サムネイル画像が正しく表示されているか
4. 割引率、価格が正しいか
5. トピックフィルタに新トピックが追加されているか

**詳細ページ確認**（`/coupons/{slug}`）：
1. ページにアクセス
2. Hero セクション（タイトル、サムネ、技術バッジ）
3. 講座説明セクション
4. 特徴セクション（4項目）
5. プロジェクトセクション（2-3項目）
6. 対象者セクション（3-4グループ）
7. 価格セクション（クーポンコード、残り日数、CTA）
8. フローティングCTAボタン（モバイル表示）

**確認コマンド例**：
```typescript
// ページにアクセス
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/coupons" })

// スナップショット取得
mcp__chrome-devtools__take_snapshot({ verbose: false })

// スクリーンショット取得
mcp__chrome-devtools__take_screenshot({ fullPage: true })

// 詳細ページにアクセス
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/coupons/{slug}" })
```

### Step 6: 完了報告

以下を含む完了レポートを提供：

```markdown
## 新しいUdemy講座クーポンページの作成完了 🎉

### 作成した講座
- **講座ID**: {courseId}
- **タイトル**: {title}
- **スラグ**: {slug}
- **定価**: ¥{originalPrice}
- **割引価格**: ¥{discountPrice}
- **割引率**: {割引率}%

### 作成・更新したファイル
- ✅ `src/constants/coupon-courses.ts`
  - COURSE_INFO に追加
  - COURSE_DISPLAY_ORDER の先頭に追加
  - TOPIC_INFO に新トピック追加（{新トピック名}）
- ✅ `src/lib/coupons/coupon-data.ts`
  - COUPON_DATA の先頭に追加
- ✅ `src/app/coupons/{slug}/page.tsx`
  - 詳細ページを新規作成（約XXX行）

### 品質チェック結果
- ✅ `npm run type-check` - 合格
- ✅ `npm run lint` - 合格
- ✅ `npm run test` - 合格

### 動作確認結果
- ✅ 一覧ページ（/coupons）に新講座が表示
- ✅ 詳細ページ（/coupons/{slug}）が正常に表示
- ✅ クーポンコードコピー機能が動作
- ✅ レスポンシブデザインが正常

### 次のステップ
コミットする場合は以下のコマンドを実行してください：

\```bash
git add src/constants/coupon-courses.ts src/lib/coupons/coupon-data.ts src/app/coupons/{slug}/
git commit -m "feat: {title}のクーポンページを追加

- COURSE_INFO、COUPON_DATA、COURSE_DISPLAY_ORDERを更新
- 詳細ページ（/coupons/{slug}）を作成
- クーポンコード: {couponCode}
- 割引価格: ¥{discountPrice}（{割引率}%OFF）

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
\```
```

## Examples

### 実行例

```bash
# スキルの起動（Markdownファイルパスを指定）
/udemy-coupon-creator src/data/coupons/courses/fastapi-codex.md
```

### Markdownファイルの構造例

参考：`src/data/coupons/courses/fastapi-codex.md`

## Best Practices

### Markdownパースの注意点

- **見出しレベルの統一**：`##`（h2）と`###`（h3）を適切に使い分け
- **価格の抽出**：`9800円` → 数値`9800`のみ抽出
- **クーポンコードの形式**：必ず`YYYY-MM-DD`形式を確認
- **topics配列化**：`Codex, Expo, React Native` → `["codex", "expo", "react-native"]`（小文字化）

### データ更新の優先順位

1. **COURSE_INFO**：講座の基本情報（必須）
2. **COUPON_DATA**：クーポン情報（必須）
3. **COURSE_DISPLAY_ORDER**：表示順序（新講座は先頭）
4. **TOPIC_INFO**：新トピックがあれば追加

### 詳細ページ生成のコツ

- **既存講座を参考**：`claude-code-vibe-coding/page.tsx` のような人気講座
- **courseDetailsの粒度**：features 4項目、projects 2-3項目、targetAudience 3-4グループ
- **icon選択**：内容に応じた適切な絵文字（🎯, 💡, 🚀, ⚡など）

### テスト対策

- **日付形式**：ISO 8601形式を厳守（`YYYY-MM-DDTHH:MM:SS±HH:MM`）
- **courseIdの一貫性**：COURSE_INFOとCOUPON_DATAで同じIDを使用
- **URL生成**：`https://www.udemy.com/course/{slug}/?couponCode={couponCode}`

## Troubleshooting

### Issue: Markdownのパースエラー

**症状**：見出しが見つからない、値が抽出できない

**解決策**：
1. Markdownの見出し構造を確認（`##` と `###` の使い分け）
2. 必須セクションが全て存在するか確認
3. 値の形式を確認（価格は数値+単位、クーポンコードはYYYY-MM-DD）

### Issue: 型チェックエラー

**症状**：`Type 'X' is not assignable to type 'Y'`

**解決策**：
1. `src/types/coupon.ts` の型定義を確認
2. COURSE_INFOとCOUPON_DATAの型を確認
3. 必須フィールドが欠落していないか確認

### Issue: テスト失敗

**症状**：`coupon-data.test.ts` が失敗

**解決策**：
1. courseIdがCOURSE_INFOに存在するか確認
2. クーポンコードの形式が`YYYY-MM-DD`か確認
3. URL生成が正しいか確認（`generateCouponUrl`関数）

### Issue: 画像が表示されない

**解決策**：
1. `public/images/udemy/` に画像が存在するか確認
2. ファイル名のスペルミスを確認
3. 画像のパスが正しいか確認（`/images/udemy/{filename}`）

### Issue: トピックフィルタに表示されない

**解決策**：
1. TOPIC_INFOに新トピックが追加されているか確認
2. トピック名のスラッグ化が正しいか確認（小文字、ハイフン区切り）
3. Deviconアイコンが存在しない場合は`isLocal: true`を設定

## AI Assistant Instructions

このスキルが起動された時、以下の手順で作業を進めてください：

### Phase 1: 準備・確認

1. **引数の確認**：
   - Markdownファイルパスを取得
   - ファイルが存在するか確認
   - 存在しない場合はエラーメッセージを表示して終了

2. **Markdownの読み込みと解析**：
   - Readツールでファイル内容を取得
   - 見出しベースでセクションをパース
   - 必須フィールドが全て存在するか確認

3. **サムネイル画像の確認**：
   - `public/images/udemy/` に指定された画像が存在するか
   - なければ警告（処理は継続）

### Phase 2: データファイル更新

1. **COURSE_INFO更新**（`src/constants/coupon-courses.ts`）：
   - 既存ファイルを読み込み
   - COURSE_INFOの最後に新エントリを追加
   - COURSE_DISPLAY_ORDERの先頭に追加
   - TOPIC_INFOに新トピックがあれば追加

2. **COUPON_DATA更新**（`src/lib/coupons/coupon-data.ts`）：
   - 既存ファイルを読み込み
   - COUPON_DATAの先頭に新エントリを追加
   - 日時を適切に生成（PST基準）

3. **EXPECTED_COURSE_IDS更新**（`src/lib/coupons/__tests__/coupon-data.test.ts`）：
   - テストファイルを読み込み
   - `EXPECTED_COURSE_IDS`配列の先頭に新しい講座IDを追加
   - コメントで講座の簡単な説明を追記

### Phase 3: 詳細ページ生成

1. **既存講座を参考**：
   - `src/app/coupons/claude-code-vibe-coding/page.tsx` を読み込み
   - 構造とパターンを分析

2. **courseDetailsの生成**：
   - features：Markdownから4項目抽出、適切な絵文字を選択
   - projects：2-3項目を生成、technologies配列を含む
   - targetAudience：3-4グループに整理

3. **ファイル生成**：
   - `src/app/coupons/{slug}/page.tsx` を作成
   - メタデータ、コンポーネント、courseDetailsを適切に配置

### Phase 4: 品質保証（必須）

1. **型チェック**：
   ```bash
   npm run type-check
   ```
   - エラーがあれば修正してから次へ

2. **リント検査**：
   ```bash
   npm run lint
   ```
   - エラーがあれば `npm run format` で自動修正を試行

3. **テスト実行**：
   ```bash
   npm run test -- src/lib/coupons/__tests__/coupon-data.test.ts
   ```
   - テストが失敗した場合は必ず修正

### Phase 5: 動作確認（Chrome DevTools MCP使用）

1. **開発サーバー起動**：
   ```bash
   npm run dev
   ```
   - バックグラウンドで実行（`run_in_background: true`）

2. **一覧ページ確認**：
   - `/coupons` にアクセス
   - スナップショットで新講座カードを確認
   - スクリーンショットで視覚的に確認

3. **詳細ページ確認**：
   - `/coupons/{slug}` にアクセス
   - 全セクションが正しく表示されているか確認
   - フルページスクリーンショットを取得

### Phase 6: 完了報告

- 作成した講座の情報
- 作成・更新したファイルのリスト
- 品質チェックの結果
- 動作確認の結果
- コミット用のコマンド例

### Always Do

- ✅ Markdownの必須セクションを全て確認
- ✅ COURSE_INFOとCOUPON_DATAの整合性を保つ
- ✅ COURSE_DISPLAY_ORDERに必ず追加
- ✅ 型チェック・リント・テストを全て実行
- ✅ 開発サーバーでの動作確認を実施
- ✅ エラーが出た場合は必ず修正してから次へ
- ✅ 完了報告に詳細な情報を含める

### Never Do

- ❌ 品質チェックをスキップ
- ❌ エラーを放置して次のステップに進む
- ❌ データの整合性を確認せず更新
- ❌ 動作確認をせずに完了報告
- ❌ Markdownのパース失敗を無視
- ❌ 既存のデータ構造を破壊

## Quick Reference

### ファイル構成

```
src/
├── constants/
│   └── coupon-courses.ts         # COURSE_INFO, COURSE_DISPLAY_ORDER, TOPIC_INFO
├── lib/coupons/
│   ├── coupon-data.ts            # COUPON_DATA
│   └── __tests__/
│       └── coupon-data.test.ts   # テスト
├── app/coupons/
│   ├── page.tsx                  # 一覧ページ
│   └── {slug}/
│       └── page.tsx              # 詳細ページ（新規作成）
└── data/coupons/courses/
    └── *.md                      # Markdownソースファイル
```

### 必須チェックリスト

スキル実行時に確認：

- [ ] Markdownファイルが存在する
- [ ] 必須セクションが全て含まれている
- [ ] サムネイル画像が存在する（警告のみ）
- [ ] COURSE_INFOに追加済み
- [ ] COUPON_DATAに追加済み（先頭）
- [ ] COURSE_DISPLAY_ORDERに追加済み（先頭）
- [ ] TOPIC_INFOに新トピック追加済み
- [ ] EXPECTED_COURSE_IDsに追加済み（テストファイル）
- [ ] 詳細ページを作成済み
- [ ] `npm run type-check` 合格
- [ ] `npm run lint` 合格
- [ ] `npm run test` 合格
- [ ] 一覧ページで新講座が表示される
- [ ] 詳細ページが正常に表示される
- [ ] 完了報告を提供

---

このスキルを使用することで、新しいUdemy講座のクーポン配布ページを効率的かつ確実に作成できます。
