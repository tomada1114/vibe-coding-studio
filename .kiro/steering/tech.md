# Vibe Coding Studio - Technology Stack

**Inclusion Mode**: Always

---

## Architecture

### System Design
- **アーキテクチャパターン**: Jamstack（静的サイト生成）
- **レンダリング戦略**:
  - Static Site Generation (SSG)
  - Incremental Static Regeneration (ISR)
  - Server Components（Next.js 15 App Router）
- **デプロイメント**: エッジ最適化対応（Vercel、Netlify等）
- **セキュリティレイヤー**: `next.config.mjs` の `headers()` による静的なセキュリティヘッダー

### Core Philosophy
- **型安全性**: TypeScript厳格モード
- **パフォーマンスファースト**: Core Web Vitals最適化
- **セキュリティファースト**: CSPとセキュリティヘッダーのデフォルト実装
- **アクセシビリティ**: WCAG 2.1 AA準拠

## Frontend

### Framework & Build Tools
```json
"next": "15.4.4"              // React フレームワーク（App Router）
"react": "^19"                // UI ライブラリ
"react-dom": "^19"            // React DOM レンダラー
```

### Styling
```json
"tailwindcss": "^4.1.11"                    // ユーティリティファーストCSS
"@tailwindcss/postcss": "^4.1.11"           // PostCSS プラグイン
"postcss": "^8.5.6"                         // CSS 処理ツール
"prettier-plugin-tailwindcss": "^0.6.14"    // Tailwind クラスの自動ソート
```

### UI Components & Animation
```json
"@headlessui/react": "^2.2.6"     // アクセシブルなUIコンポーネント
"@heroicons/react": "^2.2.0"      // アイコンライブラリ
"framer-motion": "^12.23.11"      // アニメーションライブラリ
"react-use-measure": "^2.1.7"     // 要素サイズ測定フック
"clsx": "^2.1.1"                  // 条件付きクラス名ユーティリティ
```

### TypeScript
```json
"typescript": "^5"              // TypeScript コンパイラ
"@types/node": "^24"           // Node.js 型定義
"@types/react": "^19"          // React 型定義
"@types/react-dom": "^19"      // React DOM 型定義
```

**TypeScript設定（tsconfig.json）**:
- `strict: true` - 厳格な型チェック
- `verbatimModuleSyntax: true` - 明示的なインポート構文
- `target: "ES2017"` - 対象ECMAScriptバージョン
- `moduleResolution: "bundler"` - バンドラーモード
- パスエイリアス: `@/*` → `./src/*`

## Backend

### Server Runtime
- **Next.js Server Components**: React Server Components
- **API Routes**: `/api` ディレクトリ（Route Handlers）
- **Edge Runtime**: Web Crypto API対応

### Environment Configuration
```bash
# Optional: サイトURL（メタデータ用）
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

```

**環境変数検証**:
- `src/lib/env-validation.ts` - ランタイムバリデーション
- 開発者フレンドリーな警告メッセージ
- 本番環境でのエラー防止

## Development Environment

### Required Tools
```bash
Node.js: >= 18.17.0 (推奨: LTS版)
npm: >= 9.0.0
```

### IDE設定（推奨）
**VS Code Extensions**:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Jest Runner

### Development Dependencies

#### Code Quality
```json
"eslint": "^9"                           // リンター
"eslint-config-next": "15.4.4"           // Next.js ESLint設定
"eslint-config-prettier": "^10.1.8"      // Prettier連携
"prettier": "^3.6.2"                     // コードフォーマッター
"prettier-plugin-organize-imports": "^4.2.0"  // import自動整理
```

#### Testing
```json
"jest": "^30.0.5"                           // テストフレームワーク
"jest-environment-jsdom": "^30.0.5"         // DOM環境
"@testing-library/react": "^16.3.0"         // React テスティングライブラリ
"@testing-library/jest-dom": "^6.8.0"       // Jest DOM マッチャー
"@types/jest": "^30.0.0"                    // Jest 型定義
```

#### Build Tools
```json
"@eslint/eslintrc": "^3"         // ESLint 設定ユーティリティ
"dotenv": "^17.2.1"              // 環境変数管理
```

## Common Commands

### Development
```bash
npm run dev                # 開発サーバー起動（localhost:3000）
npm run build              # 本番ビルド
npm run start              # 本番サーバー起動
```

### Code Quality
```bash
npm run lint               # ESLint実行
npm run type-check         # TypeScript型チェック
npm run format             # Prettierでフォーマット
npm run format:check       # フォーマットチェックのみ
npm run check:all          # 全チェック実行
```

**コミット前チェック（推奨）**:
```bash
npm run pre-commit-check   # コミット前の総合チェック
```

実行内容:
1. プロジェクト設定確認
2. ESLint検査（警告レベルは許可）
3. TypeScript型チェック（既存エラーは無視）
4. 重要ファイルの存在確認
5. 環境変数検証
6. Git ステータス表示

### Testing
```bash
npm run test              # Jest単体テスト実行
npm run test:watch        # テストのウォッチモード
npm run test:coverage     # カバレッジレポート生成
```

### Environment
```bash
npm run validate:env      # 環境変数検証
cp .env.example .env.local  # 環境ファイル作成
```

## Environment Variables

### Public Variables
```bash
# サイトのCanonical URL（メタデータ生成用）
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**使用箇所**:
- `src/app/layout.tsx` - メタデータ生成
- OGP画像URL
- canonical リンク

### Build-time Variables
```bash
# バンドル分析有効化
ANALYZE=true npm run build

# 本番モード
NODE_ENV=production
```

## Port Configuration

### Development
```bash
localhost:3000          # Next.js 開発サーバー（デフォルト）
```

**ポート変更**:
```bash
PORT=3001 npm run dev   # カスタムポート
```

### Production
```bash
localhost:3000          # Next.js 本番サーバー（デフォルト）
```

## Security Configuration

### Content Security Policy (CSP)
**実装箇所**: `next.config.mjs` の `headers()`（全ルート `/:path*`）。middleware は使わない。
テスト: `src/app/__tests__/security-headers.test.ts`

**方針**（Issue #85）:
- nonce は使わない。nonce は全ページを動的レンダリングにし、静的生成・ISR を失うため
- Next.js の RSC ペイロード（`self.__next_f.push`）はビルドごとに中身が変わりハッシュを固定できないため、`script-src` / `style-src` は `'unsafe-inline'` を許可する
- 違反レポート（`report-uri` / `report-to`）は持たない
- 第三者スクリプトやユーザー入力を表示する機能を入れるときは nonce 方式を再検討する

**CSP Directives**（本番。開発時のみ `script-src` に `'unsafe-eval'` を追加）:
```
default-src 'self'
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
img-src 'self' data: blob:
connect-src 'self'
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'self'
```

### Security Headers
**実装箇所**: `next.config.mjs` の `headers()`

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Content-Security-Policy: （上記）
```

## Performance Optimization

### Next.js最適化
- **ISR**: ブログページの60秒再検証
- **Image Optimization**: AVIF/WebP自動変換
- **Bundle Analyzer**: `ANALYZE=true`で有効化
- **Tree Shaking**: 使用されないコードの自動削除

### キャッシュ戦略
**実装箇所**: `src/middleware.ts`, `src/lib/cache.ts`

```typescript
// 静的アセット: 1年
Cache-Control: public, max-age=31536000, immutable

// ページ: 60秒のstale-while-revalidate
Cache-Control: public, s-maxage=60, stale-while-revalidate=3600
```

### バンドル最適化
- **最適化されたインポート**: 必要な部分のみインポート
- **コード分割**: 動的インポート活用
- **初期バンドル目標**: < 500KB

## Testing Configuration

### Jest設定
**設定ファイル**: `jest.config.js`, `jest.setup.js`

```javascript
testEnvironment: 'jsdom'              // DOM環境
setupFilesAfterEnv: ['./jest.setup.js']
moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
```

### テストカバレッジ目標
- **全体**: 80%以上
- **コアコンポーネント**: 90%以上
- **ユーティリティ関数**: 100%

### テストパターン
- **単体テスト**: ユーティリティ、フック
- **コンポーネントテスト**: UIコンポーネント
- **統合テスト**: ページレベルの動作

## Build & Deployment

### ビルドプロセス
```bash
1. Type checking       # TypeScript型チェック
2. Linting            # ESLint
3. Next.js build      # 本番ビルド
4. Static export      # 静的ファイル生成（オプション）
```

### デプロイメント対応
- **Vercel**: ワンクリックデプロイ
- **Netlify**: 静的サイトホスティング
- **その他**: Docker、自己ホスティング

### 本番チェックリスト
- [ ] 環境変数の設定
- [ ] セキュリティヘッダーの確認
- [ ] パフォーマンス測定（Lighthouse）
- [ ] アクセシビリティ監査
- [ ] クロスブラウザテスト

## Dependency Management

### アップデート戦略
```bash
# 依存関係の更新確認
npm outdated

# セキュリティ監査
npm audit

# セキュリティ修正の適用
npm audit fix
```

### 定期メンテナンス
- **週次**: セキュリティパッチの確認
- **月次**: マイナーバージョンの更新検討
- **四半期**: メジャーバージョンの更新計画

## Known Limitations

### 技術的制約
- **静的サイト**: データベースやユーザー認証は含まれない
- **ISR制限**: Vercel以外では完全なISRサポートが異なる場合がある
- **エッジランタイム**: 一部のNode.js APIは使用不可

### ブラウザサポート
- **モダンブラウザ**: Chrome、Firefox、Safari、Edge（最新2バージョン）
- **ES2017サポート**: 古いブラウザでは polyfill が必要

---

**Note**: 技術スタックに変更があった際は、このドキュメントを更新してください。
