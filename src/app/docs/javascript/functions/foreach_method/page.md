---
title: 配列のforEachメソッドを使ってみよう
nextjs:
  metadata:
    title: 配列のforEachメソッドを使ってみよう
    description: JavaScriptの配列forEachメソッドの基本的な使い方を学び、コールバック関数の概念とfor文との違いを理解して配列処理をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- forEachメソッドの基本的な使い方を理解する
- コールバック関数の概念を学ぶ
- for文とforEachの違いと使い分けを習得する
- インデックスの取得方法を理解する

## はじめに

これまでの章では、配列の各要素に対して何らかの処理を行いたい場合、`for`文を使って一つずつ要素を取り出していました。JavaScriptには、配列の処理をもっと簡単に、そして読みやすく書くことができる**forEachメソッド**があります。

forEachメソッドは、配列のすべての要素に対して、指定した処理を順番に実行してくれる便利な機能です。前回学んだアロー関数と組み合わせることで、非常に簡潔で分かりやすいコードを書くことができるようになります。

配列を扱うプログラムでは、forEachメソッドは頻繁に使われる機能の一つです。まずは基本的な使い方から、一緒に学んでいきましょう。

## forEachメソッドの基本的な使い方

forEachメソッドは、配列のメソッドの一つです。配列の各要素に対して、指定した関数を実行してくれます。まずは簡単な例で、for文と比較しながら見てみましょう。

VS Codeで新しいHTMLファイル`foreach-test.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>forEachメソッドのテスト</title>
</head>
<body>
    <h1>forEachメソッドのテスト</h1>
    
    <script>
        const fruits = ["りんご", "バナナ", "オレンジ"];
        
        console.log("=== for文を使った場合 ===");
        for (let i = 0; i < fruits.length; i++) {
            console.log(fruits[i]);
        }
        
        console.log("=== forEachを使った場合 ===");
        fruits.forEach(function(fruit) {
            console.log(fruit);
        });
    </script>
</body>
</html>
```

このHTMLファイルを保存してブラウザで開き、開発者ツールのConsoleを確認してください。以下のような表示が現れるはずです。

```
=== for文を使った場合 ===
りんご
バナナ
オレンジ
=== forEachを使った場合 ===
りんご
バナナ
オレンジ
```

どちらも同じ結果が表示されますが、コードの書き方が大きく異なることが分かります。forEachを使った方が、「配列の各要素に対して何かをする」という意図が明確に伝わります。

### forEachメソッドの仕組み

forEachメソッドの基本的な構造を理解してみましょう。

```javascript
配列.forEach(function(要素) {
    // 各要素に対して実行したい処理
});
```

forEachメソッドは、配列の要素を一つずつ取り出して、指定した関数に渡してくれます。上記の例では、`fruits`配列の各要素（「りんご」「バナナ」「オレンジ」）が、順番に`fruit`という引数として関数に渡されています。

この時、forEachメソッドに渡している関数のことを**コールバック関数**と呼びます。コールバック関数とは、他の関数によって呼び出される関数のことです。forEachメソッドが、配列の各要素についてこのコールバック関数を呼び出してくれるのです。

## アロー関数と組み合わせて使ってみよう

前回学んだアロー関数を使うことで、forEachメソッドをより簡潔に書くことができます。HTMLファイルに以下のコードを追加してみましょう。

```html
<script>
    const numbers = [1, 2, 3, 4, 5];
    
    console.log("=== 通常の関数を使ったforEach ===");
    numbers.forEach(function(num) {
        console.log("数値: " + num);
    });
    
    console.log("=== アロー関数を使ったforEach ===");
    numbers.forEach((num) => {
        console.log("数値: " + num);
    });
    
    console.log("=== アロー関数の短縮記法 ===");
    numbers.forEach(num => console.log("数値: " + num));
</script>
```

このコードを実行すると、すべて同じ結果が表示されますが、書き方がどんどん簡潔になっていることが分かります。

```
=== 通常の関数を使ったforEach ===
数値: 1
数値: 2
数値: 3
数値: 4
数値: 5
=== アロー関数を使ったforEach ===
数値: 1
数値: 2
数値: 3
数値: 4
数値: 5
=== アロー関数の短縮記法 ===
数値: 1
数値: 2
数値: 3
数値: 4
数値: 5
```

特に最後の短縮記法では、処理が1行なのでとても読みやすくなっています。ただし、複数行の処理を行う場合は、波括弧を使った通常の書き方を使います。

## コールバック関数の概念を理解しよう

forEachメソッドを理解するために、コールバック関数の概念について少し詳しく説明します。コールバック関数とは、「後で呼び出してもらう関数」のことです。

forEachメソッドの場合、私たちは「各要素に対して何をするか」という処理を関数として定義します。そして、forEachメソッドが配列の要素を一つずつ取り出して、その都度私たちが定義した関数を呼び出してくれるのです。

```html
<script>
    // コールバック関数を別途定義することもできる
    function printWithMessage(item) {
        console.log("項目: " + item);
    }
    
    const colors = ["赤", "青", "緑"];
    
    // 定義した関数をコールバックとして渡す
    colors.forEach(printWithMessage);
    
    // 直接関数を定義して渡すこともできる
    colors.forEach(function(color) {
        console.log("色: " + color);
    });
</script>
```

この例では、`printWithMessage`という関数を事前に定義して、それをforEachのコールバック関数として使用しています。このように、関数を変数のように扱って、他の関数に渡すことができるのがJavaScriptの特徴の一つです。

## インデックスも取得してみよう

forEachメソッドでは、配列の要素だけでなく、そのインデックス（何番目の要素か）も取得することができます。コールバック関数の第2引数として、インデックスが渡されます。

```html
<script>
    const subjects = ["国語", "数学", "英語"];
    
    console.log("=== インデックス付きで表示 ===");
    subjects.forEach((subject, index) => {
        console.log(index + "番目: " + subject);
    });
    
    // より実用的な例：順番を1から始める
    console.log("=== 1から始まる番号付き ===");
    subjects.forEach((subject, index) => {
        const number = index + 1;
        console.log(number + ". " + subject);
    });
</script>
```

このコードを実行すると、以下のような結果が表示されます。

```
=== インデックス付きで表示 ===
0番目: 国語
1番目: 数学
2番目: 英語
=== 1から始まる番号付き ===
1. 国語
2. 数学
3. 英語
```

配列のインデックスは0から始まるため、人間が読みやすい番号にしたい場合は`index + 1`とします。このように、forEachメソッドを使うことで、要素の値とその位置の両方を簡単に取得できます。

## for文とforEachの違いと使い分け

for文とforEachメソッドは、どちらも配列の各要素に対して処理を行うことができますが、それぞれに特徴があります。どちらを使うべきかを理解するために、違いを整理してみましょう。

### 書きやすさと読みやすさ

for文は、インデックスを使って配列の要素にアクセスするため、処理の意図が分かりにくい場合があります。一方、forEachメソッドは、「配列の各要素に対して処理を行う」という意図が明確です。

```html
<script>
    const scores = [85, 92, 78, 90];
    
    console.log("=== for文：意図が分かりにくい ===");
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] >= 80) {
            console.log("合格: " + scores[i] + "点");
        }
    }
    
    console.log("=== forEach：意図が明確 ===");
    scores.forEach(score => {
        if (score >= 80) {
            console.log("合格: " + score + "点");
        }
    });
</script>
```

forEachを使った方が、「各スコアについて、80点以上なら合格と表示する」という処理の流れが自然に読めます。

### 処理の制御について

for文では、`break`や`continue`を使って処理を制御することができますが、forEachメソッドでは基本的にすべての要素を処理します。途中で処理を止めたい場合は、for文の方が適しています。

```html
<script>
    const testNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    console.log("=== for文：5を見つけたら処理を停止 ===");
    for (let i = 0; i < testNumbers.length; i++) {
        console.log("処理中: " + testNumbers[i]);
        if (testNumbers[i] === 5) {
            console.log("5を見つけました！処理を停止します");
            break;
        }
    }
    
    console.log("=== forEach：すべての要素を処理 ===");
    testNumbers.forEach(num => {
        console.log("処理中: " + num);
        if (num === 5) {
            console.log("5を見つけました！でも処理は続きます");
        }
    });
</script>
```

### どちらを使うべきか

一般的には、以下のような基準で使い分けます。

- 配列のすべての要素に対して同じ処理を行いたい場合：**forEach**
- 途中で処理を停止したい場合：**for文**
- 配列の要素を変更したり、新しい配列を作りたい場合：**forEach**や他の配列メソッド
- 複雑なループ制御が必要な場合：**for文**

多くの場合、単純に「各要素に対して何かをする」という処理では、forEachメソッドの方が読みやすく、書きやすいコードになります。

## より実践的な例で理解を深めよう

forEachメソッドの使い方を、もう少し実践的な例で学んでみましょう。

```html
<script>
    // 学生の情報を管理する配列
    const students = [
        { name: "田中", score: 85, subject: "数学" },
        { name: "佐藤", score: 92, subject: "英語" },
        { name: "山田", score: 78, subject: "国語" },
        { name: "鈴木", score: 90, subject: "理科" }
    ];
    
    console.log("=== 学生の成績一覧 ===");
    students.forEach((student, index) => {
        const number = index + 1;
        console.log(number + ". " + student.name + "さん");
        console.log("   科目: " + student.subject);
        console.log("   点数: " + student.score + "点");
        
        // 点数に応じてコメントを追加
        if (student.score >= 90) {
            console.log("   評価: 優秀！");
        } else if (student.score >= 80) {
            console.log("   評価: 良好");
        } else {
            console.log("   評価: もう少し頑張りましょう");
        }
        console.log(""); // 空行を入れて見やすくする
    });
    
    // 合計点数を計算
    let totalScore = 0;
    students.forEach(student => {
        totalScore += student.score;
    });
    
    const averageScore = totalScore / students.length;
    console.log("=== 統計情報 ===");
    console.log("総学生数: " + students.length + "人");
    console.log("合計点数: " + totalScore + "点");
    console.log("平均点数: " + averageScore + "点");
</script>
```

このコードは、学生の成績データを管理して、一覧表示と統計計算を行っています。forEachメソッドを使うことで、複雑なデータ構造でも読みやすく処理できることが分かります。

## forEachメソッドの注意点

forEachメソッドを使う際の注意点もいくつかあります。

### 戻り値がない

forEachメソッドは、処理を実行するだけで、新しい配列や値を返しません。計算結果を取得したい場合は、外部の変数を使うか、後で学ぶ他のメソッド（`map`や`filter`など）を使います。

```html
<script>
    const prices = [100, 200, 300];
    
    // forEach は戻り値がない
    const result1 = prices.forEach(price => price * 1.1);
    console.log("forEachの戻り値: " + result1); // undefined
    
    // 計算結果を取得したい場合は外部変数を使う
    const taxIncludedPrices = [];
    prices.forEach(price => {
        taxIncludedPrices.push(price * 1.1);
    });
    console.log("税込価格: " + taxIncludedPrices);
</script>
```

### 元の配列は変更されない

forEachメソッド自体は元の配列を変更しません。ただし、コールバック関数の中で配列の要素を直接変更することは可能です。

```html
<script>
    const originalNumbers = [1, 2, 3];
    
    // forEachは元の配列を変更しない
    originalNumbers.forEach(num => num * 2);
    console.log("forEach後の配列: " + originalNumbers); // [1, 2, 3]のまま
    
    // 配列の要素を直接変更することは可能
    const mutableNumbers = [1, 2, 3];
    mutableNumbers.forEach((num, index, array) => {
        array[index] = num * 2;
    });
    console.log("直接変更後の配列: " + mutableNumbers); // [2, 4, 6]
</script>
```

## まとめ

本章では、JavaScriptの配列forEachメソッドについて学びました。以下の内容を理解できたことと思います。

- forEachメソッドは配列のすべての要素に対して指定した処理を実行する
- コールバック関数の概念と、関数を他の関数に渡すという考え方
- アロー関数と組み合わせることで簡潔なコードが書ける
- インデックスも同時に取得できること
- for文との違いと適切な使い分けの方法
- forEachメソッドの注意点と制限

forEachメソッドは、配列を扱うプログラムでとてもよく使われる機能です。「配列の各要素に対して何かをする」という処理が必要になったら、forEachメソッドを思い出してください。次回は、配列を変換したり絞り込んだりできる`map`と`filter`メソッドについて学んでいきます。