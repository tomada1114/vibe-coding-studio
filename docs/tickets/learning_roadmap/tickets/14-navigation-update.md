# Ticket #14: ナビゲーション更新

## 概要

グローバルナビゲーションに「ロードマップ」リンクを追加する。デスクトップとモバイルの両方で適切に表示されるようにする。

## 前提チケット

- `13-roadmap-page.md` ✅ 完了必須

## User Story

**As a** サイト訪問者
**I want** ナビゲーションからロードマップにアクセスしたい
**So that** 学習パスをすぐに見つけられる

---

## 参照ファイル

| ファイル | 参照目的 |
|----------|----------|
| `.kiro/specs/roadmap/requirements.md` | FR-003 ナビゲーション仕様 |
| `src/components/navbar.tsx` | 編集対象ファイル |

---

## 実装内容

### 更新ファイル

`src/components/navbar.tsx`

### 変更内容

```typescript
// 変更前
const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/community", label: "コミュニティ" },
  { href: "/coupons", label: "クーポン" },
  { href: "/founder", label: "運営者" },
]

// 変更後
const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/community", label: "コミュニティ" },
  { href: "/coupons", label: "クーポン" },
  { href: "/roadmap", label: "ロードマップ" }, // 追加
  { href: "/founder", label: "運営者" },
]
```

### 配置位置

| 環境 | 配置 |
|------|------|
| デスクトップ | 「クーポン」と「運営者」の間 |
| モバイル | ハンバーガーメニュー内、同じ順序 |

---

## Functional Requirements (EARS Format)

| ID | Requirement |
|----|-------------|
| REQ-001 | The navigation shall include "ロードマップ" link after "クーポン". |
| REQ-002 | The link shall navigate to `/roadmap`. |
| REQ-003 | **While** on `/roadmap` page, the "ロードマップ" link shall show active state. |
| REQ-004 | **While** on `/roadmap?course=web` (with query param), the link shall still show active state. |
| REQ-005 | The link shall appear in both desktop nav and mobile hamburger menu. |

---

## 完成の定義（Definition of Done）

### 必須チェック

- [ ] **ファイル更新**: `src/components/navbar.tsx` に "ロードマップ" リンク追加
- [ ] **配置**: 「クーポン」と「運営者」の間に配置
- [ ] **リンク先**: `/roadmap` へ正しく遷移
- [ ] **アクティブ状態**: `/roadmap` ページでアクティブスタイル
- [ ] **アクティブ状態（クエリ付き）**: `/roadmap?course=web` でもアクティブ
- [ ] **モバイル対応**: ハンバーガーメニューに表示
- [ ] **TypeScript型チェック**: `npm run type-check` が成功する
- [ ] **Lintチェック**: `npm run lint` が成功する
- [ ] **フォーマット**: `npm run format` を実行済み

### テスト

- [ ] **既存テストの確認**: navbar関連のテストがあれば更新

```typescript
// src/components/__tests__/navbar.test.tsx に追加（既存テストがある場合）
describe('Navbar navigation links', () => {
  it('should include roadmap link', () => {
    render(<Navbar />)
    expect(screen.getByText('ロードマップ')).toBeInTheDocument()
  })

  it('should have correct href for roadmap link', () => {
    render(<Navbar />)
    const link = screen.getByText('ロードマップ').closest('a')
    expect(link).toHaveAttribute('href', '/roadmap')
  })
})
```

- [ ] **手動テスト**: 以下の動作確認
  - [ ] ホームページからナビゲーションリンクが見える
  - [ ] クリックで `/roadmap` へ遷移
  - [ ] `/roadmap` でアクティブ状態が表示される

### UI確認（Chrome DevTools MCP）

1. **デスクトップ表示確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000` にアクセス
   - [ ] `mcp__chrome-devtools__resize_page` で幅を1200pxに設定
   - [ ] `mcp__chrome-devtools__take_snapshot` でナビゲーション構造を確認
   - [ ] 「クーポン」「ロードマップ」「運営者」の順序で表示されていることを確認
   - [ ] `mcp__chrome-devtools__click` で「ロードマップ」をクリック
   - [ ] `/roadmap` へ遷移することを確認

2. **アクティブ状態確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap` にアクセス
   - [ ] `mcp__chrome-devtools__take_snapshot` でナビゲーションを確認
   - [ ] 「ロードマップ」リンクにアクティブスタイル（`data-active="true"`）が適用されていることを確認
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000/roadmap?course=python` にアクセス
   - [ ] 同様にアクティブスタイルが適用されていることを確認

3. **モバイル表示確認**:
   - [ ] `mcp__chrome-devtools__navigate_page` で `http://localhost:3000` にアクセス
   - [ ] `mcp__chrome-devtools__resize_page` で幅を375pxに設定
   - [ ] `mcp__chrome-devtools__take_snapshot` でハンバーガーボタンを確認
   - [ ] `mcp__chrome-devtools__click` でハンバーガーボタンをクリック
   - [ ] メニューが展開され、「ロードマップ」リンクが表示されることを確認
   - [ ] `mcp__chrome-devtools__click` で「ロードマップ」をクリック
   - [ ] `/roadmap` へ遷移することを確認

4. **視覚確認項目**:
   - [ ] デスクトップ: ナビゲーションに「ロードマップ」が表示
   - [ ] デスクトップ: アクティブ時に背景色変化
   - [ ] モバイル: ハンバーガーメニュー内に「ロードマップ」が表示
   - [ ] モバイル: アクティブ時に下線表示

---

## 全体テスト（機能完成確認）

このチケット完了後、ロードマップ機能全体が完成。以下の統合テストを実施：

### E2Eフロー確認

1. **ホームページから開始**:
   - [ ] ナビゲーションの「ロードマップ」をクリック
   - [ ] `/roadmap` に遷移、デフォルトで「完全初心者」コースが表示

2. **コース切り替え**:
   - [ ] 各タブ（beginner, web, mobile, python）をクリック
   - [ ] URLが `?course=xxx` に更新される
   - [ ] フローチャートが切り替わる

3. **ノードクリック**:
   - [ ] 任意のノードをクリック
   - [ ] 対応するクーポンページ（`/coupons/xxx`）に遷移

4. **直接URL**:
   - [ ] `http://localhost:3000/roadmap?course=python` に直接アクセス
   - [ ] Pythonコースが表示される

5. **レスポンシブ**:
   - [ ] モバイル（375px）でフローチャートが縦積み
   - [ ] デスクトップ（1200px）で分岐が横配置

---

## 今後の拡張（MVP外）

以下は今後の拡張として検討：

- クーポンページへのRoadmapBanner組み込み
- 進捗追跡機能
- ユーザーごとのカスタマイズ
- OG画像の自動生成

---

## 全チケット完了チェックリスト

| # | チケット | 状態 |
|---|----------|------|
| 01 | 型定義 | ⬜ |
| 02 | データ構造 | ⬜ |
| 03 | RoadmapTabs | ⬜ |
| 04 | RoadmapNode | ⬜ |
| 05 | RoadmapEdge | ⬜ |
| 06 | RoadmapLegend | ⬜ |
| 07 | beginner.ts | ⬜ |
| 08 | web.ts | ⬜ |
| 09 | mobile.ts | ⬜ |
| 10 | python.ts | ⬜ |
| 11 | RoadmapBanner | ⬜ |
| 12 | RoadmapFlow | ⬜ |
| 13 | RoadmapPage | ⬜ |
| 14 | ナビゲーション更新 | ⬜ |
