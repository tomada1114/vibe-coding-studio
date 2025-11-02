# TODO - Vibe Coding Studio

## ✅ 完了タスク

### 1. 画像URL修正
**ファイル**: `src/app/coupons/codex-python-fast-api/page.tsx`

**完了内容**:
- ✅ Line 36の画像URLを`codex-python-fast-api.png`に修正
- ✅ Line 49の画像URLを`codex-python-fast-api.png`に修正
- ✅ SEOとSNS共有での画像表示が正常に動作

---

### 2. `.gitignore`への追加
**ファイル**: `.gitignore`

**完了内容**:
- ✅ `src/data/coupons/uploads/`をGit管理から除外
- ✅ 一時的なCSVファイルがコミットされないように設定

---

### 3. 古い画像ファイルの削除
**ファイル**: `public/images/udemy/codex_fastapi.png`

**完了内容**:
- ✅ 旧命名規則の画像ファイル（`codex_fastapi.png`）を削除
- ✅ 新ファイル（`codex-python-fast-api.png`）のみが存在する状態に整理

---

### 4. CSVファイルの処理
**ファイル**: `src/data/coupons/uploads/bulk_coupon_upload - 2025-11-02.csv`

**完了内容**:
- ✅ `.gitignore`に追加済みのため、ローカル作業用として保持
- ✅ 14講座分のクーポンデータを含む作業用ファイル

---

## 🔄 次のステップ（優先度順）

### 優先度: 中

#### 5. E2Eテストの追加
**目的**: ページ表示の自動テスト

**内容**:
- [ ] Playwrightを使用したページ表示テスト
- [ ] OGP画像の読み込み確認
- [ ] クーポン情報の表示テスト
- [ ] レスポンシブデザインのテスト

**予定ファイル**: `src/app/coupons/[slug]/__tests__/e2e.spec.ts`

---

#### 6. 型定義の整理
**目的**: コードの保守性向上

**内容**:
- [ ] `courseDetails`の型を`src/types/course-details.ts`に移動
- [ ] 既存コンポーネントで型を再利用
- [ ] 型安全性の向上

**型定義例**:
```typescript
// src/types/course-details.ts
export interface CourseDetails {
  title: string
  subtitle: string
  description: string
  projects: CourseProject[]
  features: CourseFeature[]
  targetAudience: TargetAudienceGroup[]
  whatYouLearn: string[]
  requirements: string[]
}
```

---

### 優先度: 低（将来の改善）

#### 7. CI/CDでの自動検証
**目的**: データ整合性の自動確認

**内容**:
- [ ] 画像ファイル存在確認
  - slugに対応する画像ファイルが存在するか検証
  - `public/images/udemy/${slug}.png`の存在確認
- [ ] slug命名規則チェック
  - kebab-caseに準拠しているか確認
  - 重複slugの検出
- [ ] EXPECTED_COURSE_IDsの整合性チェック
  - COURSE_INFOに存在するIDのみが使われているか確認

**GitHub Actions例**:
```yaml
# .github/workflows/coupon-validation.yml
name: Coupon Data Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:coupon-validation
```

---

## 📊 進捗サマリー

**完了**: 4タスク ✅
**進行中**: 0タスク 🔄
**未着手**: 3タスク ⏳

---

## 📝 メモ

### テストカバレッジ
`src/lib/coupons/__tests__/coupon-data.test.ts` は既に充実しており、以下をカバー済み：
- ✅ EXPECTED_COURSE_IDsの定義と検証
- ✅ couponCodeのYYYY-MM-DD形式チェック
- ✅ URL生成の正確性チェック
- ✅ 日付フィールドの有効性チェック
- ✅ 講座タイトルの一致確認

---

**最終更新**: 2025-11-01
**ステータス**: 優先度高タスク完了
**次の焦点**: E2Eテスト追加または型定義整理
