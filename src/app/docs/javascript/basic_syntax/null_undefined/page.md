---
title: null と undefined の違いを学ぼう
nextjs:
  metadata:
    title: null と undefined の違いを学ぼう
    description: JavaScriptのnullとundefinedの違いを理解し、「何もない」状態を表現する2つの値の使い分けと判定方法を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `null`の意味と使い所を理解する
- `undefined`が発生する場面を把握する
- 両者の違いと使い分けを学ぶ
- `null`と`undefined`を判定する方法を習得する

## はじめに

プログラミングでは、「値が存在しない」「まだ設定されていない」といった状況を表現する必要があります。

例えば、ユーザーがまだプロフィール画像を設定していない場合や、検索結果が見つからなかった場合などです。

JavaScriptでは、このような「何もない」状態を表すために、`null`と`undefined`という2つの特別な値が用意されています。

どちらも「値がない」ことを表しますが、使われる場面や意味が少し異なります。

この章では、`null`と`undefined`の違いを理解し、適切に使い分ける方法を学んでいきましょう。

## nullの意味と使い所

### nullは「意図的に空」を表す

`null`は、プログラマーが意図的に「値がない」ことを示すために使う値です。

VS Codeで新しいファイル`null_undefined.html`を作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>nullとundefinedの練習</title>
</head>
<body>
    <h1>nullとundefinedの練習</h1>
    
    <script>
        let userIcon = null;  // ユーザーがまだアイコンを設定していない
        let selectedColor = null;  // まだ色が選択されていない
        
        console.log("ユーザーアイコン: " + userIcon);
        console.log("選択された色: " + selectedColor);
    </script>
</body>
</html>
```

このコードを実行すると、コンソールに以下のような結果が表示されます。

```
ユーザーアイコン: null
選択された色: null
```

この例では、ユーザーがまだアイコンや色を設定していない状態を`null`で表現しています。

`null`は「何もない」ことを明示的に表す値として、プログラマーが意図的に設定します。

### nullを使う具体的な場面

`null`は、初期状態や検索結果が見つからない場合などでよく使われます。

```html
<script>
    let currentUser = null;  // まだログインしていない
    let searchResult = null;  // 検索結果がない
    let selectedProduct = null;  // まだ商品が選択されていない
    
    console.log("現在のユーザー: " + currentUser);
    console.log("検索結果: " + searchResult);
    console.log("選択商品: " + selectedProduct);
</script>
```

実行結果は以下のようになります。

```
現在のユーザー: null
検索結果: null
選択商品: null
```

このように、`null`は「後で値が設定される予定だが、現在は空である」ことを表現するために使われます。

ショッピングサイトのカート機能や、ユーザー管理システムなど、状態を管理する場面でよく見かける使い方です。

## undefinedが発生する場面

### 変数を宣言しただけの場合

`undefined`は、変数が宣言されているが値が設定されていない状態を表します。

```html
<script>
    let userName;  // 値を設定していない
    let userAge;   // 値を設定していない
    
    console.log("ユーザー名: " + userName);
    console.log("年齢: " + userAge);
</script>
```

実行結果は以下のようになります。

```
ユーザー名: undefined
年齢: undefined
```

`let`で変数を宣言しただけで値を代入しない場合、その変数は自動的に`undefined`になります。

これは、JavaScriptが自動的に設定する値で、プログラマーが意図的に設定したわけではありません。

### 存在しないプロパティにアクセスした場合

オブジェクト（のちに詳しく学習しますが）で、存在しないプロパティにアクセスした場合も`undefined`が返されます。

```html
<script>
    let user = {
        name: "田中",
        age: 25
    };
    
    console.log("名前: " + user.name);
    console.log("年齢: " + user.age);
    console.log("住所: " + user.address);  // 存在しないプロパティ
</script>
```

実行結果は以下のようになります。

```
名前: 田中
年齢: 25
住所: undefined
```

この例では、`user.address`は定義されていないため、`undefined`が返されます。

プログラムを書いている時に、存在しないデータにアクセスしようとした場合によく発生する現象です。

### 関数が値を返さない場合

関数（のちに詳しく学習しますが）が明示的に値を返さない場合も、`undefined`が返されます。

```html
<script>
    function sayHello() {
        console.log("こんにちは");
        // returnで値を返していない
    }
    
    let result = sayHello();
    console.log("関数の結果: " + result);
</script>
```

実行結果は以下のようになります。

```
こんにちは
関数の結果: undefined
```

この例では、`sayHello`関数は値を返さないため、`result`変数には`undefined`が代入されます。

## 両者の判定方法

### 厳密等価演算子での判定

`null`と`undefined`を区別して判定するには、厳密等価演算子（`===`）を使います。

```html
<script>
    let value1 = null;
    let value2;  // undefined
    
    console.log("value1はnull: " + (value1 === null));
    console.log("value1はundefined: " + (value1 === undefined));
    console.log("value2はnull: " + (value2 === null));
    console.log("value2はundefined: " + (value2 === undefined));
</script>
```

実行結果は以下のようになります。

```
value1はnull: true
value1はundefined: false
value2はnull: false
value2はundefined: true
```

`===`を使うことで、`null`と`undefined`を正確に区別できます。

値の型を含めて厳密に比較するため、混同することなく正確な判定が可能です。

### 値が存在するかどうかの判定

値が`null`または`undefined`でないかを判定する場合は、以下のような方法があります。

```html
<script>
    let userName = "田中";
    let userIcon = null;
    let userAddress;  // undefined
    
    // nullでもundefinedでもない場合
    console.log("userNameに値がある: " + (userName !== null && userName !== undefined));
    console.log("userIconに値がある: " + (userIcon !== null && userIcon !== undefined));
    console.log("userAddressに値がある: " + (userAddress !== null && userAddress !== undefined));
</script>
```

実行結果は以下のようになります。

```
userNameに値がある: true
userIconに値がある: false
userAddressに値がある: false
```

この方法により、値がちゃんと設定されているかどうかを確認できます。

ユーザー入力の検証や、データの存在確認など、エラーを防ぐための重要なチェック処理です。

### より簡単な存在チェック

値の存在をより簡単にチェックする方法もあります。

```html
<script>
    let data1 = "Hello";
    let data2 = null;
    let data3;  // undefined
    let data4 = "";  // 空文字列
    
    // falsyな値（null、undefined、空文字列など）をまとめて判定
    console.log("data1は存在する: " + !!data1);
    console.log("data2は存在する: " + !!data2);
    console.log("data3は存在する: " + !!data3);
    console.log("data4は存在する: " + !!data4);
</script>
```

実行結果は以下のようになります。

```
data1は存在する: true
data2は存在する: false
data3は存在する: false
data4は存在する: false
```

`!!`（NOT演算子を2回）を使うことで、値を真偽値に変換できます。

`null`、`undefined`、空文字列、0などは`false`に、それ以外は`true`に変換されます。

## nullとundefinedの使い分け

### 実用的な使い分けの例

`null`と`undefined`の使い分けを理解するための実用的な例を見てみましょう。

```html
<script>
    // ユーザー情報の管理
    let currentUser = null;  // まだログインしていない（意図的に空）
    let lastLoginTime;       // 未初期化（undefined）
    
    // 商品選択の状態
    let selectedProduct = null;  // まだ商品を選んでいない（意図的に空）
    let productDiscount;         // 未設定（undefined）
    
    console.log("現在のユーザー: " + currentUser);
    console.log("最終ログイン時刻: " + lastLoginTime);
    console.log("選択した商品: " + selectedProduct);
    console.log("商品の割引率: " + productDiscount);
</script>
```

実行結果は以下のようになります。

```
現在のユーザー: null
最終ログイン時刻: undefined
選択した商品: null
商品の割引率: undefined
```

一般的に、`null`は「意図的に空にしている」場合に使い、`undefined`は「まだ値が設定されていない」場合に発生します。

### 初期化時の使い分け

変数を初期化する時の使い分けも重要です。

```html
<script>
    // 後で設定することが決まっている値はnullで初期化
    let userProfileImage = null;
    let selectedTheme = null;
    
    // まだ設定するかどうか分からない値は宣言のみ
    let optionalSettings;
    let advancedConfig;
    
    console.log("プロフィール画像: " + userProfileImage);
    console.log("選択テーマ: " + selectedTheme);
    console.log("オプション設定: " + optionalSettings);
    console.log("詳細設定: " + advancedConfig);
</script>
```

実行結果は以下のようになります。

```
プロフィール画像: null
選択テーマ: null
オプション設定: undefined
詳細設定: undefined
```

このような使い分けにより、コードを読む人が変数の意図を理解しやすくなります。

## まとめ

本章では、JavaScriptの`null`と`undefined`について学びました。以下の内容を理解できたことと思います。

- `null`は意図的に「値がない」ことを表現するためにプログラマーが設定する値
- `undefined`は変数が宣言されているが値が設定されていない状態で自動的に発生する
- 厳密等価演算子（`===`）を使って両者を区別して判定できる
- `null`は「後で設定予定だが現在は空」、`undefined`は「まだ値が設定されていない」という使い分けをする

これらの値を適切に理解し使い分けることで、より安全で読みやすいプログラムを書くことができます。

エラーハンドリングやデータの検証など、Webアプリケーション開発の様々な場面で今回学んだ知識を活用できるでしょう。

次回は、複数の値をまとめて管理できる便利な仕組みである配列について学んでいきます。