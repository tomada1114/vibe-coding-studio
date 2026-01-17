# Udemy講座追加ワークフロー

新しいUdemy講座をVibe Coding Studioに追加する際の手順です。

## 事前準備（ユーザー作業）

### 1. Udemyで講座を公開

Udemy側で講座を公開し、以下の情報を取得しておく：

- **講座ID**: URLから取得（7桁の数字）
- **プロモーションURL**: `?referralCode=XXXXX` 付きのURL
- **クーポンコード**: 作成したクーポン（通常はYYYY-MM-DD形式）

### 2. サムネイル画像を配置

```
public/images/udemy/{slug}.png
```

- 形式: PNG
- 推奨サイズ: Udemyのサムネイルと同じ比率

### 3. Markdownファイルを作成

`src/data/coupons/courses/{講座名}.md` を作成：

```markdown
## ID
6851913

## 価格（定価）
14800円
クーポン適用後 1500円

## 仮のクーポンコード
2025-01-15

## スラグ
my-new-course

## プロモーションURL
https://www.udemy.com/course/my-new-course/?referralCode=XXXXXXXXXX

## サムネに使って欲しい画像
public/images/udemy/my-new-course.png

## 主な技術
claude-code, nextjs, typescript

## コースタイトル
【講座タイトル】実践ガイド

## コースのサブタイトル
サブタイトルがあれば記載

## コースの説明文
講座の詳細な説明をここに記載。
複数行で書ける。

### コースで受講生は何を学びますか？
- 学習内容1
- 学習内容2
- 学習内容3

### コースを受講するための要件や前提条件は何ですか？
- 前提条件1
- 前提条件2

### 誰に向けたコースですか？
- 対象者1
- 対象者2
```

## コマンド実行

```bash
/create-udemy-course src/data/coupons/courses/{講座名}.md
```

これで以下が自動化される：
- `COURSE_INFO` への講座追加
- `COUPON_DATA` へのクーポン追加
- `COURSE_DISPLAY_ORDER` の更新
- `TOPIC_INFO` の更新（新トピックがあれば）
- `EXPECTED_COURSE_IDS` の更新
- 詳細ページの作成
- 品質チェック
- ブラウザでの動作確認

## 公開後の確認（ユーザー作業）

### 動作確認

1. `/coupons` - 一覧に表示されているか
2. `/coupons/{slug}` - 詳細ページが正常か
3. クーポンリンクをクリックしてUdemyに遷移するか

### Git操作

```bash
git add .
git commit -m "feat: Udemy講座「{講座名}」を追加"
git push
```

## クーポン更新（定期作業）

既存講座のクーポンを更新する場合：

```bash
/update-coupons src/data/coupons/uploads/{csvファイル}.csv
```

CSV形式:
```csv
course_id,coupon_type,coupon_code,start_date,start_time,custom_price
6851913,custom_price,2025-02-01,2025-02-01,0:00,1500
```
