---
title: アロー関数の書き方を覚えよう
nextjs:
  metadata:
    title: アロー関数の書き方を覚えよう
    description: JavaScriptのアロー関数の基本構文を学び、通常の関数との違いや短縮記法、適切な使い分けの方法をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- アロー関数の基本構文を理解する
- 通常の関数とアロー関数の違いを学ぶ
- アロー関数の短縮記法の使い方を習得する
- アロー関数を使うべき場面を理解する

## はじめに

これまでの章では、`function`文を使った関数の作り方を学んできました。JavaScriptには、同じ機能を持ちながら、より短く書くことができる**アロー関数**という書き方があります。

アロー関数は、ES6（ECMAScript 2015）という新しいJavaScriptの標準で追加された機能です。矢印（`=>`）を使って関数を定義するため、「アロー関数」と呼ばれています。

特に短い処理を書く場合や、後で学ぶ配列のメソッドと組み合わせる場合に、アロー関数はとても便利です。まずは基本的な書き方から一緒に学んでいきましょう。

## アロー関数の基本構文

アロー関数の基本的な書き方は以下のようになります。

```javascript
const 関数名 = (引数) => {
    // 処理
};
```

まずは簡単な例で、通常の関数とアロー関数を比較してみましょう。VS Codeで新しいHTMLファイル`arrow-function-test.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アロー関数のテスト</title>
</head>
<body>
    <h1>アロー関数のテスト</h1>
    
    <script>
        // 通常の関数宣言
        function sayHello1() {
            console.log("こんにちは（通常の関数）");
        }
        
        // アロー関数
        const sayHello2 = () => {
            console.log("こんにちは（アロー関数）");
        };
        
        // 両方の関数を呼び出す
        sayHello1();
        sayHello2();
    </script>
</body>
</html>
```

このHTMLファイルを保存してブラウザで開き、開発者ツールのConsoleを確認してください。以下のような表示が現れるはずです。

```
こんにちは（通常の関数）
こんにちは（アロー関数）
```

どちらの関数も同じ動作をしますが、アロー関数の方が少し短く書けることが分かります。

### アロー関数の構造を理解しよう

アロー関数の構造を詳しく見てみましょう。

```javascript
const sayHello2 = () => {
    console.log("こんにちは（アロー関数）");
};
```

- `const sayHello2 =` の部分で、関数を変数に代入しています
- `()` の部分は引数を書く場所です（今回は引数なしなので空）
- `=>` がアロー関数の特徴的な記号です
- `{}` の中に実行したい処理を書きます
- 最後に`;`（セミコロン）を付けます

## 引数があるアロー関数

次に、引数があるアロー関数を作ってみましょう。HTMLファイルに以下のコードを追加してください。

```html
<script>
    // 通常の関数（引数あり）
    function greet1(name) {
        console.log("こんにちは、" + name + "さん（通常の関数）");
    }
    
    // アロー関数（引数あり）
    const greet2 = (name) => {
        console.log("こんにちは、" + name + "さん（アロー関数）");
    };
    
    // 両方の関数を呼び出す
    greet1("田中");
    greet2("佐藤");
    
    // 複数の引数があるアロー関数
    const add = (a, b) => {
        const result = a + b;
        console.log(a + " + " + b + " = " + result);
        return result;
    };
    
    add(5, 3);
    add(10, 20);
</script>
```

このコードを実行すると、Consoleに以下のように表示されます。

```
こんにちは、田中さん（通常の関数）
こんにちは、佐藤さん（アロー関数）
5 + 3 = 8
10 + 20 = 30
```

引数がある場合も、通常の関数とアロー関数は同じように動作します。引数が複数ある場合は、カンマで区切って`(a, b)`のように書きます。

## アロー関数の短縮記法

アロー関数には、条件に応じてさらに短く書ける記法があります。これを覚えることで、より簡潔なコードが書けるようになります。

### 引数が1つの場合の短縮

引数が1つだけの場合、括弧を省略することができます。

```html
<script>
    // 通常のアロー関数
    const double1 = (num) => {
        return num * 2;
    };
    
    // 引数の括弧を省略した書き方
    const double2 = num => {
        return num * 2;
    };
    
    // どちらも同じ動作
    console.log("double1(5): " + double1(5));
    console.log("double2(5): " + double2(5));
</script>
```

`(num)`と書く代わりに、`num`だけで書くことができます。ただし、引数が0個の場合や2個以上の場合は、括弧を省略できません。

### 処理が1行の場合の短縮

関数の処理が1行だけで、かつその結果を`return`する場合は、波括弧（`{}`）と`return`を省略することができます。

```html
<script>
    // 通常のアロー関数
    const triple1 = (num) => {
        return num * 3;
    };
    
    // 短縮記法
    const triple2 = (num) => num * 3;
    
    // さらに引数の括弧も省略
    const triple3 = num => num * 3;
    
    // すべて同じ動作
    console.log("triple1(4): " + triple1(4));
    console.log("triple2(4): " + triple2(4));
    console.log("triple3(4): " + triple3(4));
</script>
```

この短縮記法では、`=>`の後に書かれた式の結果が自動的に戻り値になります。

### 短縮記法の実例

いくつかの短縮記法の例を見てみましょう。

```html
<script>
    // 基本的な計算を行うアロー関数
    const square = x => x * x;              // 2乗を計算
    const isEven = num => num % 2 === 0;    // 偶数かどうか判定
    const getLength = text => text.length;  // 文字列の長さを取得
    
    // 複数の引数がある場合
    const multiply = (a, b) => a * b;       // 掛け算
    const getMax = (x, y) => x > y ? x : y; // 大きい方を返す
    
    // 関数をテストしてみる
    console.log("=== 短縮記法のテスト ===");
    console.log("5の2乗: " + square(5));
    console.log("8は偶数？ " + isEven(8));
    console.log("7は偶数？ " + isEven(7));
    console.log("「こんにちは」の文字数: " + getLength("こんにちは"));
    console.log("6 × 7 = " + multiply(6, 7));
    console.log("15と23の大きい方: " + getMax(15, 23));
</script>
```

このコードを実行すると、以下のような結果が表示されます。

```
=== 短縮記法のテスト ===
5の2乗: 25
8は偶数？ true
7は偶数？ false
「こんにちは」の文字数: 5
6 × 7 = 42
15と23の大きい方: 23
```

このように、簡単な計算や判定を行う関数は、アロー関数の短縮記法を使うことで非常に簡潔に書くことができます。

## 通常の関数とアロー関数の違い

アロー関数と通常の関数は、多くの場面で同じように使えますが、いくつかの違いがあります。初心者の方が知っておくべき主な違いを説明します。

### 書き方の違い

まず、見た目の違いを整理してみましょう。

```html
<script>
    // 通常の関数宣言
    function normalFunction(x) {
        return x + 10;
    }
    
    // 関数式
    const functionExpression = function(x) {
        return x + 10;
    };
    
    // アロー関数（完全版）
    const arrowFunction1 = (x) => {
        return x + 10;
    };
    
    // アロー関数（短縮版）
    const arrowFunction2 = x => x + 10;
    
    // すべて同じ結果
    console.log("通常の関数: " + normalFunction(5));
    console.log("関数式: " + functionExpression(5));
    console.log("アロー関数1: " + arrowFunction1(5));
    console.log("アロー関数2: " + arrowFunction2(5));
</script>
```

### 宣言の時期による違い

通常の関数宣言は、コードのどこで宣言しても、そのスコープ内のどこからでも呼び出すことができます。しかし、アロー関数は変数に代入する形で作るため、その行より前では使用できません。

```html
<script>
    // 通常の関数は定義前でも呼び出せる
    console.log("定義前の呼び出し: " + normalFunc(3));
    
    function normalFunc(x) {
        return x * 2;
    }
    
    // アロー関数は定義前では呼び出せない
    // console.log(arrowFunc(3)); // エラーになる
    
    const arrowFunc = x => x * 2;
    
    console.log("定義後の呼び出し: " + arrowFunc(3));
</script>
```

## アロー関数を使うべき場面

アロー関数は特に以下のような場面で便利です。

### 短い処理の場合

処理が短く、単純な計算や変換を行う場合は、アロー関数の短縮記法が読みやすくなります。

```html
<script>
    // 数値の配列を2倍にする関数
    const numbers = [1, 2, 3, 4, 5];
    
    // 通常の関数を使った場合
    function doubleNormal(num) {
        return num * 2;
    }
    
    // アロー関数を使った場合
    const doubleArrow = num => num * 2;
    
    console.log("元の配列: " + numbers);
    
    // どちらも同じ結果だが、アロー関数の方が簡潔
    console.log("2倍（通常）: " + numbers.map(doubleNormal));
    console.log("2倍（アロー）: " + numbers.map(doubleArrow));
    
    // さらに短く書くことも可能
    console.log("2倍（直接）: " + numbers.map(x => x * 2));
</script>
```

### 一時的な処理の場合

使い捨ての小さな関数を作る場合、アロー関数が便利です。特に、配列の処理（後の章で詳しく学びます）でよく使われます。

```html
<script>
    const students = [
        { name: "田中", score: 85 },
        { name: "佐藤", score: 92 },
        { name: "山田", score: 78 }
    ];
    
    // 点数が80以上の学生を抽出
    const highScorers = students.filter(student => student.score >= 80);
    
    // 学生の名前だけを取り出す
    const names = students.map(student => student.name);
    
    console.log("80点以上の学生:");
    highScorers.forEach(student => console.log(student.name + ": " + student.score + "点"));
    
    console.log("全学生の名前: " + names.join(", "));
</script>
```

## アロー関数の注意点

アロー関数を使う際の注意点もいくつかあります。

### 複数行の処理では波括弧が必要

処理が複数行になる場合は、波括弧と`return`文を明示的に書く必要があります。

```html
<script>
    // 短縮記法は1行の場合のみ
    const simple = x => x * 2;  // OK
    
    // 複数行の場合は波括弧とreturnが必要
    const complex = x => {
        console.log("計算中: " + x);
        const result = x * 2 + 1;
        return result;
    };
    
    console.log("simple(5): " + simple(5));
    console.log("complex(5): " + complex(5));
</script>
```

### オブジェクトを返す場合の注意

アロー関数でオブジェクトを返したい場合は、括弧で囲む必要があります。

```html
<script>
    // オブジェクトを返す場合は括弧で囲む
    const createPerson = name => ({ name: name, age: 20 });
    
    // 括弧がないと、波括弧が関数の本体と解釈されてしまう
    // const createPersonWrong = name => { name: name, age: 20 }; // エラー
    
    const person = createPerson("田中");
    console.log("作成された人: " + person.name + "、年齢: " + person.age);
</script>
```

## まとめ

本章では、JavaScriptのアロー関数について学びました。以下の内容を理解できたことと思います。

- アロー関数の基本構文 `const 関数名 = (引数) => { 処理 };`
- 引数が1つの場合は括弧を省略できること
- 1行の処理の場合は波括弧と`return`を省略できること
- 通常の関数とアロー関数の違いと使い分け
- アロー関数が便利な場面と注意点

アロー関数は、特に短い処理を書く場合や、配列の操作と組み合わせる場合に威力を発揮します。最初は通常の関数と混在して使うかもしれませんが、慣れてくると適切な場面でアロー関数を選択できるようになります。次回は、配列の各要素に対して処理を行う`forEach`メソッドについて学んでいきます。