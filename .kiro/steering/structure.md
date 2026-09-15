# Vibe Coding Studio - Project Structure

**Inclusion Mode**: Always

---

## Root Directory Organization

```
vibe-coding-studio/
├── .kiro/                    # Kiro仕様駆動開発の設定とドキュメント
│   └── steering/            # プロジェクトコンテキストドキュメント
├── __tests__/               # プロジェクトレベルのテスト
├── config/                  # 設定ファイル（将来の拡張用）
├── docs/                    # プロジェクトドキュメント
│   └── design/             # デザインシステムドキュメント
├── public/                  # 静的アセット（画像、フォント等）
├── src/                     # ソースコード
│   ├── app/                # Next.js App Router
│   ├── components/         # UIコンポーネント
│   ├── hooks/              # カスタムReactフック
│   ├── lib/                # ユーティリティライブラリ
│   └── styles/             # グローバルスタイル
├── .env.example             # 環境変数テンプレート
├── .env.local              # ローカル環境変数（gitignore）
├── jest.config.js          # Jestテスト設定
├── jest.setup.js           # Jestセットアップ
├── next.config.js          # Next.js設定
├── package.json            # プロジェクト依存関係
├── postcss.config.js       # PostCSS設定
├── prettier.config.js      # Prettier設定
├── tsconfig.json           # TypeScript設定
├── CLAUDE.md               # Claude Code向けガイドライン
└── README.md               # プロジェクトREADME
```

## Subdirectory Structures

### `/src/app/` - Next.js App Router

Next.js 15 App Routerの構造：

```
src/app/
├── layout.tsx              # ルートレイアウト
├── page.tsx                # ホームページ（/）
├── pricing/
│   └── page.tsx           # 料金ページ（/pricing）
├── company/
│   └── page.tsx           # 会社情報ページ（/company）
└── api/
    └── csp-report/
        └── route.ts       # CSP違反レポートAPI
```

**命名規則**:
- `layout.tsx` - 共有レイアウト
- `page.tsx` - ページコンポーネント
- `route.ts` - APIルートハンドラー
- `loading.tsx` - ローディング状態（オプション）
- `error.tsx` - エラー境界（オプション）

**ルーティング**:
- ファイルシステムベースルーティング
- 動的ルート: `[slug]/page.tsx`
- ルートグループ: `(marketing)/page.tsx`

### `/src/components/` - UIコンポーネント

再利用可能なUIコンポーネントライブラリ：

```
src/components/
├── __tests__/              # コンポーネントテスト
│   ├── button.test.tsx
│   ├── badge.test.tsx
│   ├── heading.test.tsx
│   └── ...
├── alert.tsx               # アラート/通知コンポーネント
├── animated-number.tsx     # アニメーション付き数値
├── avatar.tsx              # ユーザーアバター
├── badge.tsx               # バッジ/タグ
├── bento-card.tsx          # Bentoグリッドカード
├── button.tsx              # ボタンコンポーネント
├── catalyst-button.tsx     # Catalyst UIボタン
├── catalyst-navbar.tsx     # Catalyst UIナビゲーション
├── checkbox.tsx            # チェックボックス
├── combobox.tsx            # コンボボックス（検索可能セレクト）
├── container.tsx           # コンテナレイアウト
├── csp-nonce-provider.tsx  # CSP nonceプロバイダー
├── description-list.tsx    # 説明リスト
├── dialog.tsx              # モーダルダイアログ
├── divider.tsx             # 区切り線
├── dropdown.tsx            # ドロップダウンメニュー
├── dynamic-imports.tsx     # 動的インポートラッパー
├── error-boundary.tsx      # エラー境界
├── error-fallbacks.tsx     # エラーフォールバック
├── fieldset.tsx            # フィールドセット
├── footer.tsx              # フッター
├── gradient.tsx            # グラデーション背景
├── heading.tsx             # 見出し
├── input.tsx               # テキスト入力
├── keyboard.tsx            # キーボードショートカット表示
├── link.tsx                # カスタムリンク
├── linked-avatars.tsx      # 連結アバター
├── listbox.tsx             # リストボックス
├── loading-skeleton.tsx    # スケルトンローディング
├── loading-wrapper.tsx     # ローディングラッパー
├── logo.tsx                # ロゴコンポーネント
├── logo-cloud.tsx          # ロゴクラウド
├── logo-cluster.tsx        # ロゴクラスター
├── logo-timeline.tsx       # ロゴタイムライン
├── map.tsx                 # マップコンポーネント
├── navbar.tsx              # ナビゲーションバー
├── navbar-wrapper.tsx      # ナビゲーションラッパー
├── pagination.tsx          # ページネーション
├── plus-grid.tsx           # Plusグリッド
├── radio.tsx               # ラジオボタン
├── screenshot.tsx          # スクリーンショット表示
├── select.tsx              # セレクトボックス
├── sidebar.tsx             # サイドバー
├── sidebar-layout.tsx      # サイドバーレイアウト
├── stacked-layout.tsx      # スタックレイアウト
├── switch.tsx              # トグルスイッチ
├── table.tsx               # テーブル
├── testimonials.tsx        # お客様の声
├── text.tsx                # テキストコンポーネント
└── textarea.tsx            # テキストエリア
```

**コンポーネント分類**:

1. **基本UI** (Catalyst統合):
   - button.tsx, catalyst-button.tsx
   - input.tsx, textarea.tsx, select.tsx
   - checkbox.tsx, radio.tsx, switch.tsx
   - badge.tsx, avatar.tsx

2. **レイアウト**:
   - container.tsx, sidebar-layout.tsx, stacked-layout.tsx
   - navbar.tsx, footer.tsx, sidebar.tsx
   - divider.tsx

3. **フィードバック**:
   - alert.tsx, dialog.tsx
   - loading-skeleton.tsx, loading-wrapper.tsx
   - error-boundary.tsx, error-fallbacks.tsx

4. **ナビゲーション**:
   - pagination.tsx, dropdown.tsx
   - link.tsx, navbar-wrapper.tsx

5. **データ表示**:
   - table.tsx, description-list.tsx
   - testimonials.tsx, screenshot.tsx

6. **フォーム**:
   - fieldset.tsx, combobox.tsx, listbox.tsx

7. **ビジュアル**:
   - gradient.tsx, plus-grid.tsx
   - logo.tsx, logo-cloud.tsx, logo-cluster.tsx, logo-timeline.tsx
   - linked-avatars.tsx, bento-card.tsx

8. **アニメーション**:
   - animated-number.tsx

9. **セキュリティ**:
   - csp-nonce-provider.tsx

10. **ユーティリティ**:
    - dynamic-imports.tsx, keyboard.tsx, map.tsx

### `/src/hooks/` - カスタムフック

Reactカスタムフック：

```
src/hooks/
├── __tests__/
│   └── use-retry.test.tsx  # use-retryテスト
└── use-retry.ts            # リトライロジックフック
```

**フック命名規則**:
- `use-` プレフィックス必須
- ケバブケース: `use-fetch-data.ts`
- テストファイル: `use-fetch-data.test.tsx`

**フックのベストプラクティス**:
- 副作用の適切な管理（useEffect）
- 依存配列の明示
- クリーンアップ関数の実装
- TypeScript型定義の完全性

### `/src/lib/` - ユーティリティライブラリ

共有ユーティリティとヘルパー関数：

```
src/lib/
├── __tests__/
│   └── env-validation.test.ts  # 環境変数バリデーションテスト
├── cache.ts                    # キャッシュユーティリティ
├── csp.ts                      # CSP設定
├── env-validation.ts           # 環境変数検証
└── retry.ts                    # リトライロジック
```

**ライブラリ分類**:

1. **セキュリティ**:
   - `csp.ts` - Content Security Policy設定
   - エッジランタイム対応のnonce生成

2. **環境管理**:
   - `env-validation.ts` - 環境変数のランタイム検証
   - 開発者フレンドリーなエラーメッセージ

3. **パフォーマンス**:
   - `cache.ts` - キャッシュ戦略ユーティリティ
   - Cache-Controlヘッダー生成

4. **エラーハンドリング**:
   - `retry.ts` - 指数バックオフリトライ

**ユーティリティ命名規則**:
- 機能を表す名詞: `cache.ts`, `validation.ts`
- ケバブケース推奨
- 単一責任原則に従う

### `/src/styles/` - グローバルスタイル

```
src/styles/
└── tailwind.css            # Tailwind CSS エントリーポイント
```

**スタイル構成**:
```css
@import "tailwindcss";

/* カスタムスタイルはここに追加 */
```

### `/src/__tests__/` - プロジェクトレベルテスト

統合テストと高レベルテスト：

```
src/__tests__/
├── cache.test.ts           # キャッシュユーティリティテスト
├── csp.test.ts             # CSP設定テスト
├── csp-report.test.ts      # CSPレポートAPIテスト
├── error-handling.test.tsx  # エラーハンドリングテスト
├── optimization.test.ts    # 最適化テスト
└── retry.test.ts           # リトライロジックテスト
```

### `/docs/` - ドキュメント

包括的なプロジェクトドキュメント：

```
docs/
├── design/                           # デザインシステム（Geist Grid）
│   ├── CATALYST_COMPONENTS.md       # 旧Catalyst UI統合ガイド（移行完了まで残置）
│   ├── DESIGN_SYSTEM.md             # デザインシステム（トークン・原則）
│   ├── DESIGN_SYSTEM_COMPONENTS.md  # コンポーネント仕様
│   ├── DESIGN_SYSTEM_PATTERNS.md    # デザインパターン
│   └── THEME_AND_I18N.md            # テーマ実装・i18n方針
├── API_REFERENCE.md                 # APIリファレンス
├── COMPONENT_GUIDE.md               # コンポーネントガイド
├── PROJECT_DOCUMENTATION.md         # プロジェクト全体ドキュメント
└── README.md                        # ドキュメント索引
```

### `/public/` - 静的アセット

```
public/
├── company/                # 会社関連画像
├── fonts/                  # カスタムフォント
├── individual-investors/   # 投資家関連画像
├── investors/              # 投資家情報
├── linked-avatars/         # アバター画像
├── logo-cloud/             # ロゴクラウド画像
├── logo-cluster/           # ロゴクラスター画像
├── logo-timeline/          # ロゴタイムライン画像
├── map/                    # マップ画像
├── screenshots/            # スクリーンショット
├── team/                   # チーム写真
└── testimonials/           # お客様の声画像
```

**アセット命名規則**:
- ケバブケース: `logo-company.svg`
- 説明的な名前: `team-photo-john-doe.jpg`
- 最適化された画像形式: WebP、AVIF推奨

## Code Organization Patterns

### 1. コンポーネント構造

```typescript
// コンポーネントファイルの標準構造
import { ComponentProps } from 'react'
import clsx from 'clsx'

// 型定義
interface MyComponentProps extends ComponentProps<'div'> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

// コンポーネント本体
export default function MyComponent({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={clsx(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        variant === 'secondary' && 'secondary-classes',
        size === 'sm' && 'sm-classes',
        size === 'md' && 'md-classes',
        size === 'lg' && 'lg-classes',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### 2. ユーティリティ関数

```typescript
// ユーティリティファイルの標準構造
/**
 * 関数の説明
 * @param param1 - パラメータの説明
 * @returns 戻り値の説明
 */
export function myUtility(param1: string): string {
  // 実装
  return result
}
```

### 3. カスタムフック

```typescript
// フックの標準構造
import { useState, useEffect } from 'react'

export function useMyHook(dependency: string) {
  const [state, setState] = useState<StateType>(initialValue)

  useEffect(() => {
    // 副作用
    return () => {
      // クリーンアップ
    }
  }, [dependency])

  return { state, setState }
}
```

### 4. APIルートハンドラー

```typescript
// API Route Handlerの標準構造
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // ビジネスロジック

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    )
  }
}
```

## File Naming Conventions

### TypeScript/TSX
- **コンポーネント**: ケバブケース `button.tsx`, `logo-cloud.tsx`
- **ユーティリティ**: ケバブケース `env-validation.ts`, `retry.ts`
- **フック**: ケバブケース `use-retry.ts`, `use-fetch-data.ts`
- **テスト**: `*.test.ts`, `*.test.tsx`

### 設定ファイル
- **Next.js**: `next.config.js`
- **TypeScript**: `tsconfig.json`
- **ESLint**: `.eslintrc.json`, `eslint.config.js`
- **Prettier**: `prettier.config.js`, `.prettierrc`
- **Jest**: `jest.config.js`, `jest.setup.js`

### ドキュメント
- **Markdown**: 大文字スネークケース `README.md`, `API_REFERENCE.md`
- **プロジェクト固有**: `CLAUDE.md`, `CHANGELOG.md`

### 特殊ファイル
- **環境変数**: `.env.local`, `.env.example`
- **Git**: `.gitignore`, `.gitattributes`
- **npm**: `package.json`, `package-lock.json`

## Import Organization

### インポート順序（Prettierで自動整理）

```typescript
// 1. Reactと外部ライブラリ
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// 2. 内部コンポーネント
import Button from '@/components/button'
import Heading from '@/components/heading'

// 3. ユーティリティとヘルパー
import { retry } from '@/lib/retry'
import { validateEnv } from '@/lib/env-validation'

// 4. 型定義
import type { ComponentProps } from 'react'
import type { CustomType } from '@/types'

// 5. スタイルとアセット
import '@/styles/tailwind.css'
```

**設定**: `prettier-plugin-organize-imports` が自動で整理

### パスエイリアス

```typescript
// ✅ パスエイリアス使用（推奨）
import Button from '@/components/button'
import { retry } from '@/lib/retry'

// ❌ 相対パス（非推奨）
import Button from '../../../components/button'
import { retry } from '../../lib/retry'
```

**設定**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Key Architectural Principles

### 1. 単一責任原則（SRP）
- 各コンポーネントは1つの責務のみ
- ユーティリティ関数は単一の目的
- ファイルは1つの主要エクスポート

### 2. DRY（Don't Repeat Yourself）
- 共通ロジックはユーティリティに抽出
- コンポーネントの再利用
- 設定の一元管理

### 3. 依存性の方向
```
app (pages) → components → hooks → lib (utilities)
```

- 上位層が下位層に依存
- 下位層は上位層を知らない
- 循環依存の禁止

### 4. 型安全性
- すべての関数に型注釈
- `any`の使用禁止（やむを得ない場合のみ`unknown`）
- PropsにはTypeScript interfaceを定義

### 5. コンポーネント設計
- **Composition over Inheritance**: 継承より合成
- **Props drilling回避**: Context、状態管理
- **アクセシビリティ**: WCAG 2.1 AA準拠

### 6. パフォーマンス
- **遅延読み込み**: 重いコンポーネントは動的インポート
- **メモ化**: 高コストな計算はuseMemo
- **最適化**: React.memo、useCallback適切に使用

### 7. テスタビリティ
- **純粋関数**: 副作用の分離
- **依存注入**: モック可能な設計
- **振る舞いテスト**: 実装詳細ではなく振る舞いをテスト

### 8. セキュリティ
- **入力検証**: すべての外部入力を検証
- **XSS対策**: Reactの自動エスケープ活用
- **CSP**: nonceベースのスクリプト実行

### 9. エラーハンドリング
- **早期リターン**: ガード節の活用
- **エラー境界**: コンポーネントレベルのエラーハンドリング
- **ログ記録**: 開発環境での詳細なログ

### 10. ドキュメント
- **コードコメント**: 「なぜ」を説明
- **型定義**: 自己文書化コード
- **README**: セットアップと使用方法

## Directory Creation Guidelines

### 新しいディレクトリを作成する場合

1. **目的の明確化**: ディレクトリの責務を定義
2. **命名**: 複数形を使用（`components`, `hooks`, `utils`）
3. **index.ts**: エクスポート集約（必要に応じて）
4. **README.md**: ディレクトリの目的を説明（大規模な場合）

### テストディレクトリ
- 各ディレクトリに`__tests__/`を配置
- テストファイルは対象ファイルの隣に配置可能

### 型定義ディレクトリ（将来の拡張）
```
src/types/
├── index.ts
├── api.ts
├── components.ts
└── utils.ts
```

## Module Boundaries

### 公開インターフェース
- `src/components/` - 公開UIコンポーネント
- `src/hooks/` - 公開カスタムフック
- `src/lib/` - 公開ユーティリティ

### 内部実装
- `src/app/` - Next.jsルーティング（外部から直接インポート禁止）
- `__tests__/` - テストコード（本番バンドルから除外）

### インポートルール
```typescript
// ✅ 許可されたインポート
import Button from '@/components/button'
import { useRetry } from '@/hooks/use-retry'
import { retry } from '@/lib/retry'

// ❌ 禁止されたインポート
import Layout from '@/app/layout'  // app/は内部実装
```

---

**Note**: プロジェクト構造に変更があった際は、このドキュメントを更新してください。
