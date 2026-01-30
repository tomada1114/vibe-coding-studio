---
title: 数値を扱ってみよう
nextjs:
  metadata:
    title: 数値を扱ってみよう
    description: JavaScriptで数値データを扱う方法を学び、整数と小数の基本操作、四則演算と演算子の優先順位、Mathオブジェクトを使った計算方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 整数と小数の基本操作を理解する
- 四則演算と演算子の優先順位を習得する
- `Math`オブジェクトを使った計算方法を学ぶ
- 数値を使った実用的な計算処理を身につける

## はじめに

Webアプリケーションでは、商品の価格計算、ユーザーの年齢計算、点数の集計など、数値を扱う場面が数多くあります。

JavaScriptでは、整数（1、2、100など）も小数（3.14、0.5など）も同じように扱うことができ、様々な計算を簡単に行えます。

電卓アプリやショッピングカートなど、数値計算はWebアプリケーションの基本的な機能です。

この章では、JavaScriptで数値を扱う基本的な方法から、少し複雑な計算まで、段階的に学んでいきましょう。

## 整数と小数の基本操作

### 数値を変数に保存する

まずは、数値を変数に保存して表示する基本的な方法を試してみましょう。

VS Codeで新しいファイル`numbers.html`を作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>数値の練習</title>
</head>
<body>
    <h1>数値操作の練習</h1>
    
    <script>
        let price = 1500;
        let rate = 0.08;
        
        console.log("商品価格: " + price);
        console.log("税率: " + rate);
    </script>
</body>
</html>
```

実行結果:
```
商品価格: 1500
税率: 0.08
```

このコードでは、`price`という変数に整数の1500を、`rate`という変数に小数の0.08を保存しています。

ファイルを保存してブラウザで開き、コンソールを確認してみてください。

JavaScriptでは、数値を書く時に特別な記号は必要ありません。整数はそのまま書き、小数は`.`（ピリオド）を使って表現します。

### 数値同士の表示

数値を文字列と組み合わせて表示する時は、前の章で学んだように`+`を使います。

先ほどのコードの`<script>`タグ内に、以下のコードを追加してみましょう。

```html
<script>
    let price = 1500;
    let rate = 0.08;
    
    console.log("商品価格: " + price);
    console.log("税率: " + rate);
    
    // 数値をそのまま表示
    let quantity = 3;
    let discount = 100;
    
    console.log(quantity);
    console.log(discount);
</script>
```

実行結果:
```
商品価格: 1500
税率: 0.08
3
100
```

変数に保存した数値は、`console.log`に直接渡すこともできます。

この場合、数値がそのまま表示されるため、文字列と組み合わせる必要がない時に便利です。

## 四則演算と演算子の優先順位

### 基本的な計算操作

JavaScriptでは、数学と同じような記号を使って計算ができます。

以下のコードを追加して、基本的な四則演算を試してみましょう。

```html
<script>
    let a = 10;
    let b = 3;
    
    console.log("足し算: " + (a + b));
    console.log("引き算: " + (a - b));
    console.log("掛け算: " + (a * b));
    console.log("割り算: " + (a / b));
</script>
```

実行結果:
```
足し算: 13
引き算: 7
掛け算: 30
割り算: 3.3333333333333335
```

ここで重要なのは、計算式を`()`（かっこ）で囲んでいることです。

もしかっこを付けないと、JavaScriptは数値と文字列を順番につなげてしまい、期待した結果になりません。

例えば、`a + b`の結果である13を文字列と組み合わせて表示したい場合は、`(a + b)`のようにかっこで囲む必要があります。

### 余りを求める計算

JavaScriptには、割り算の余りを求める`%`（パーセント記号）という演算子もあります。

```html
<script>
    let total = 17;
    let groupSize = 5;
    
    let groups = Math.floor(total / groupSize);
    let remainder = total % groupSize;
    
    console.log("全体の人数: " + total);
    console.log("1グループの人数: " + groupSize);
    console.log("作れるグループ数: " + groups);
    console.log("余りの人数: " + remainder);
</script>
```

実行結果:
```
全体の人数: 17
1グループの人数: 5
作れるグループ数: 3
余りの人数: 2
```

この例では、17人を5人ずつのグループに分ける計算をしています。

`%`演算子を使うことで、きっちり分けた後に余る人数を計算できます。

`Math.floor()`については後で詳しく説明しますが、ここでは小数点以下を切り捨てる機能だと理解してください。

### 演算子の優先順位

数学と同じように、JavaScriptでも計算には順番があります。

```html
<script>
    let result1 = 2 + 3 * 4;
    let result2 = (2 + 3) * 4;
    
    console.log("2 + 3 * 4 = " + result1);
    console.log("(2 + 3) * 4 = " + result2);
</script>
```

実行結果:
```
2 + 3 * 4 = 14
(2 + 3) * 4 = 20
```

最初の計算では、掛け算が先に実行されるため`2 + 12 = 14`となります。

2番目の計算では、かっこの中が先に実行されるため`5 * 4 = 20`となります。

複雑な計算式を書く時は、かっこを使って計算の順序を明確にすると、間違いを防げます。

## Mathオブジェクトを使った計算

### 基本的なMath機能

JavaScriptには、`Math`という便利な機能が用意されており、様々な数学的な計算を簡単に行えます。

以下のコードで、よく使われるMath機能を試してみましょう。

```html
<script>
    let number = 3.7;
    
    console.log("元の数値: " + number);
    console.log("切り上げ: " + Math.ceil(number));
    console.log("切り捨て: " + Math.floor(number));
    console.log("四捨五入: " + Math.round(number));
</script>
```

実行結果:
```
元の数値: 3.7
切り上げ: 4
切り捨て: 3
四捨五入: 4
```

`Math.ceil()`は小数点以下を切り上げ、`Math.floor()`は切り捨て、`Math.round()`は四捨五入を行います。

これらの機能は、料金計算や在庫管理など、実際のWebアプリケーション開発でよく使われます。

### 最大値と最小値を求める

複数の数値の中から最大値や最小値を見つけることもできます。

```html
<script>
    let score1 = 85;
    let score2 = 92;
    let score3 = 78;
    
    let maxScore = Math.max(score1, score2, score3);
    let minScore = Math.min(score1, score2, score3);
    
    console.log("最高点: " + maxScore);
    console.log("最低点: " + minScore);
</script>
```

実行結果:
```
最高点: 92
最低点: 78
```

`Math.max()`は渡された数値の中で最も大きい値を、`Math.min()`は最も小さい値を返してくれます。

テストの結果分析や商品価格の比較など、データを処理する際に便利な機能です。

### 累乗とランダムな数値

もう少し高度な計算機能も見てみましょう。

```html
<script>
    let base = 2;
    let exponent = 3;
    let power = Math.pow(base, exponent);
    
    console.log(base + "の" + exponent + "乗: " + power);
    
    // 0以上1未満のランダムな小数
    let randomDecimal = Math.random();
    console.log("ランダムな小数: " + randomDecimal);
    
    // 1〜10のランダムな整数
    let randomInteger = Math.floor(Math.random() * 10) + 1;
    console.log("1〜10のランダムな整数: " + randomInteger);
</script>
```

実行結果:
```
2の3乗: 8
ランダムな小数: 0.7364392089843758
1〜10のランダムな整数: 4
```

注: `Math.random()`の結果は実行するたびに異なる値になります。

`Math.pow()`は累乗計算を行い、`Math.random()`は0以上1未満のランダムな小数を生成します。

ランダムな整数を作るには、`Math.random()`の結果に範囲を掛けて、`Math.floor()`で小数点以下を切り捨てる方法がよく使われます。

ゲームアプリやクイズアプリなど、ランダムな要素が必要な場面で重宝する機能です。

## まとめ

本章では、JavaScriptでの数値の扱い方について学びました。以下の内容を理解できたことと思います。

- 整数と小数を変数に保存して、基本的な四則演算ができる
- 演算子の優先順位を理解し、かっこを使って計算順序を制御できる
- `Math`オブジェクトを使って、切り上げ・切り捨て・四捨五入ができる
- 最大値・最小値の取得やランダムな数値の生成ができる

数値の操作は、Webアプリケーション開発において基础となる重要なスキルです。

料金計算、在庫管理、ユーザー統計など、様々な場面で今回学んだ知識を活用できるでしょう。

次回は、数値と同様によく使われる文字列の操作方法について学んでいきます。