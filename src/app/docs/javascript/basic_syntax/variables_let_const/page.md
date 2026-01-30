---
title: 変数を宣言してみよう（let、const）
nextjs:
  metadata:
    title: 変数を宣言してみよう（let、const）
    description: JavaScriptでletとconstを使った変数宣言の方法を学び、値を保存して再利用する基本的な仕組みを理解します。varとの違いや変数名の命名規則も習得しましょう。
---

## 学習の目標

本章では、以下の内容を学習します。

- `let`を使った変数宣言の方法を理解する
- `const`を使った定数宣言の方法を習得する
- `var`との違いと使い分けを学ぶ
- 変数名の命名規則を身につける

## はじめに

プログラムを書いていると、数値や文字列などの値を一時的に保存して、後で使いたい場面がよくあります。

例えば、ユーザーの名前を保存しておいて、画面の複数の場所で表示したい場合などです。

JavaScriptでは、**変数**という仕組みを使って値を保存できます。

変数は「値を入れる箱」のようなもので、箱に名前をつけて、その名前で値を呼び出すことができます。

それでは、JavaScriptでの変数の作り方を学んでいきましょう。

## letを使った変数宣言

### 基本的な変数の作り方

JavaScriptで変数を作るには、`let`というキーワードを使います。

VS Codeで新しいファイル`variables.html`を作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>変数の練習</title>
</head>
<body>
    <h1>変数宣言の練習</h1>

    <script>
        let userName = "田中";
        console.log(userName);
    </script>
</body>
</html>
```

実行結果:
```
田中
```

このコードを保存してブラウザで開き、コンソールを確認してみましょう。

`let userName = "田中";`の部分で、`userName`という名前の変数を作り、その中に「田中」という文字列を保存しています。

その後、`console.log(userName);`で変数の中身を表示しています。

変数を使うことで、同じ値を何度も使い回すことができるようになります。

### 変数の値を変更する

`let`で作った変数は、後から値を変更することができます。

先ほどのコードの`<script>`タグ内を以下のように修正してみましょう。

```html
<script>
    let userName = "田中";
    console.log(userName); // 田中

    userName = "佐藤";
    console.log(userName); // 佐藤
</script>
```

実行結果:
```
田中
佐藤
```

最初に`userName`に「田中」を入れて表示し、その後で`userName`に「佐藤」を入れ直して再度表示しています。

2回目の代入では`let`を付けないことに注意してください。

`let`は変数を最初に作る時だけ使います。

### 複数の変数を使う

1つのプログラムで複数の変数を使うこともできます。

```html
<script>
    let userName = "田中";
    let userAge = 25;

    console.log("名前: " + userName);
    console.log("年齢: " + userAge);
</script>
```

実行結果:
```
名前: 田中
年齢: 25
```

このように、文字列を保存する変数と数値を保存する変数を別々に作ることができます。

`+`を使うことで、文字列と変数の値を組み合わせて表示できます。

## constを使った定数宣言

### 変更できない値を保存する

値を一度設定したら変更したくない場合は、`const`というキーワードを使います。

先ほどのコードを以下のように修正してみましょう。

```html
<script>
    const siteName = "私のウェブサイト";
    let userName = "田中";

    console.log(siteName);
    console.log(userName);

    userName = "佐藤"; // これは正常に動作
    console.log(userName);

    // siteName = "新しいサイト名"; // この行があるとエラーになる
</script>
```

実行結果:
```
私のウェブサイト
田中
佐藤
```

`const`で宣言した`siteName`は、後から値を変更できません。

もし変更しようとすると、ブラウザのコンソールにエラーが表示されます。

サイト名や会社名など、プログラム実行中に変わらない値には`const`を使うのが適切です。

### constの特徴を理解する

`const`には`let`とは異なる特徴があります。

```html
<script>
    const maxScore = 100;
    const minScore = 0;

    let currentScore = 85;

    console.log("最高点: " + maxScore);
    console.log("最低点: " + minScore);
    console.log("現在の点数: " + currentScore);

    currentScore = 92; // 変更可能
    console.log("更新後の点数: " + currentScore);
</script>
```

実行結果:
```
最高点: 100
最低点: 0
現在の点数: 85
更新後の点数: 92
```

この例では、テストの最高点と最低点は変わらない値なので`const`を使い、現在の点数は変更される可能性があるので`let`を使っています。

## varとの違いと使い分け

### 古い書き方のvar

JavaScriptには`var`という古い変数宣言の方法もありますが、現在は`let`と`const`を使うことが推奨されています。

```html
<script>
    // 現在推奨される書き方
    let newWay = "新しい方法";
    const siteName = "テストサイト";

    // 古い書き方（使わない方が良い）
    var oldWay = "古い方法";

    console.log(newWay);
    console.log(siteName);
    console.log(oldWay);
</script>
```

実行結果:
```
新しい方法
テストサイト
古い方法
```

`var`は`let`と似ていますが、動作が複雑で予期しない問題を引き起こすことがあります。

新しくJavaScriptを学ぶ場合は、`let`と`const`だけを覚えておけば十分です。

### 使い分けの基本ルール

変数を宣言する時は、以下のルールで使い分けましょう。

```html
<script>
    // 値が変わらない場合はconst
    const companyName = "ABC会社";
    const taxRate = 0.1;

    // 値が変わる可能性がある場合はlet
    let customerName = "山田";
    let orderCount = 1;

    console.log(companyName + "へようこそ");
    console.log("お客様名: " + customerName);

    orderCount = 3; // 注文数が変更された
    console.log("注文数: " + orderCount);
</script>
```

実行結果:
```
ABC会社へようこそ
お客様名: 山田
注文数: 3
```

迷った時は`const`を使い、後で値を変更する必要が出てきたら`let`に変更するという方法がおすすめです。

## 変数名の命名規則

### 使える文字と使えない文字

変数名を付ける時には、いくつかのルールがあります。

```html
<script>
    // 正しい変数名の例
    let userName = "田中";
    let user123 = "佐藤";
    let _private = "秘密";
    let $price = 1000;

    console.log(userName);
    console.log(user123);
    console.log(_private);
    console.log($price);
</script>
```

実行結果:
```
田中
佐藤
秘密
1000
```

変数名には英数字、アンダースコア（_）、ドル記号（$）が使えます。

ただし、数字で始まる名前は使えません。

### わかりやすい変数名を付ける

変数名は短すぎても長すぎても読みにくくなります。

```html
<script>
    // わかりやすい変数名の例
    let itemPrice = 500;
    let customerAge = 30;
    let isLoggedIn = true;

    console.log("商品価格: " + itemPrice);
    console.log("お客様の年齢: " + customerAge);
    console.log("ログイン状態: " + isLoggedIn);
</script>
```

実行結果:
```
商品価格: 500
お客様の年齢: 30
ログイン状態: true
```

変数名を見ただけで、何を保存しているかが分かるような名前を付けましょう。

複数の単語を組み合わせる時は、2番目以降の単語の最初を大文字にする「キャメルケース」という書き方がよく使われます。

## まとめ

本章では、JavaScriptでの変数宣言について学びました。以下の内容を理解できたことと思います。

- `let`を使って値を変更できる変数を作ることができる
- `const`を使って値を変更できない定数を作ることができる
- `var`は古い書き方なので、`let`と`const`を使う方が良い
- 変数名は英数字とアンダースコア、ドル記号が使え、わかりやすい名前を付けることが大切

変数はプログラミングの基本的な仕組みです。

値を保存して再利用することで、効率的なプログラムを書けるようになります。

次回からは、具体的にどのような値を変数に保存できるかを学んでいきましょう。
