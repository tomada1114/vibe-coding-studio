---
title: エラーの種類を理解しよう
nextjs:
  metadata:
    title: エラーの種類を理解しよう
    description: JavaScriptでよく発生するSyntaxError、ReferenceError、TypeErrorなど主要なエラーの種類と原因を学び、適切なデバッグ方法をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- SyntaxError（構文エラー）の特徴と原因を理解する
- ReferenceError（参照エラー）の発生場面を学ぶ
- TypeError（型エラー）の種類と対処法を習得する
- その他のよくあるエラーを理解する

## はじめに

前回の章では、try-catch文を使ってエラーを適切に処理する方法を学びました。今回は、JavaScriptでよく遭遇するエラーの種類について詳しく学んでいきます。

エラーにはそれぞれ異なる原因があり、エラーの種類を理解することで、問題を素早く見つけて解決することができるようになります。また、どのようなエラーが発生しやすいかを知っておくことで、事前にエラーを防ぐコードを書くこともできます。

JavaScriptでは、エラーの種類によって異なる名前が付けられています。エラーメッセージを見ることで、どのような問題が発生したのかを推測することができるのです。

まずは代表的なエラーから一つずつ見ていきましょう。

## SyntaxError（構文エラー）

**SyntaxError**は、JavaScriptの文法が間違っている時に発生するエラーです。これは、プログラムを実行する前の段階で発生するエラーで、コードが正しく書かれていないことを意味します。

VS Codeで新しいHTMLファイル`error-types-test.html`を作成して、様々なエラーを体験してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エラーの種類テスト</title>
</head>
<body>
    <h1>エラーの種類テスト</h1>

    <script>
        console.log("=== SyntaxError のテスト ===");

        // 正しいコード
        console.log("これは正常に実行されます");

        // SyntaxErrorを発生させるコード（コメントアウトしてテスト）
        // console.log("閉じ括弧がない"
        // const value = ;
        // if (true { console.log("test"); }
    </script>
</body>
</html>
```

上記のコメントアウトされた行のコメントを一つずつ外して実行してみてください。それぞれ異なるSyntaxErrorが発生することが確認できます。

SyntaxErrorの特徴は、プログラムが実行される前に発生することです。つまり、文法が間違っている場合、その行に到達する前にエラーが発生してプログラム全体が停止してしまいます。

### よくあるSyntaxErrorのパターン

SyntaxErrorは、主に以下のような場面で発生します。

```html
<script>
    console.log("=== SyntaxErrorの例 ===");

    // 例1: 括弧の閉じ忘れ
    try {
        eval('console.log("括弧が閉じていない"');
    } catch (error) {
        console.log("エラー1: " + error.name + " - " + error.message);
    }

    // 例2: クォートの閉じ忘れ
    try {
        eval('const text = "クォート閉じ忘れ;');
    } catch (error) {
        console.log("エラー2: " + error.name + " - " + error.message);
    }

    // 例3: セミコロンの位置が間違っている
    try {
        eval('const; value = 10');
    } catch (error) {
        console.log("エラー3: " + error.name + " - " + error.message);
    }
</script>
```

SyntaxErrorは、コードを書いている時点で発見できることが多いエラーです。VS Codeなどの開発環境では、文法が間違っている部分に赤い波線が表示されるので、実行前に気づくことができます。

## ReferenceError（参照エラー）

**ReferenceError**は、存在しない変数や関数を使おうとした時に発生するエラーです。これは、プログラムの実行中に発生するエラーです。

```html
<script>
    console.log("=== ReferenceError のテスト ===");

    // 例1: 存在しない変数を参照
    try {
        console.log("存在しない変数を参照します");
        console.log(notExistVariable);
    } catch (error) {
        console.log("エラー1: " + error.name + " - " + error.message);
    }

    // 例2: 宣言前の変数を参照
    try {
        console.log("宣言前の変数を参照します");
        console.log(laterDeclaredVariable);
        const laterDeclaredVariable = "後で宣言";
    } catch (error) {
        console.log("エラー2: " + error.name + " - " + error.message);
    }

    // 例3: 存在しない関数を呼び出し
    try {
        console.log("存在しない関数を呼び出します");
        notExistFunction();
    } catch (error) {
        console.log("エラー3: " + error.name + " - " + error.message);
    }
</script>
```

ReferenceErrorは、変数名や関数名のスペルミスによく発生します。また、変数のスコープ（使える範囲）を理解していないことでも発生することがあります。

### ReferenceErrorを防ぐ方法

ReferenceErrorを防ぐためには、以下の点に注意しましょう。

```html
<script>
    console.log("=== ReferenceErrorを防ぐ方法 ===");

    // 正しい例1: 変数を宣言してから使用
    const myVariable = "正しく宣言された変数";
    console.log("正しい変数の使用: " + myVariable);

    // 正しい例2: 関数を定義してから使用
    function myFunction() {
        return "正しく定義された関数";
    }
    console.log("正しい関数の使用: " + myFunction());

    // 正しい例3: 変数が存在するかチェック
    if (typeof someVariable !== 'undefined') {
        console.log(someVariable);
    } else {
        console.log("変数 someVariable は定義されていません");
    }
</script>
```

変数を使用する前に必ず宣言する、関数を呼び出す前に定義されているか確認するといった基本的なルールを守ることで、ReferenceErrorを避けることができます。

## TypeError（型エラー）

**TypeError**は、期待している型とは異なる型の値に対して操作を行おうとした時に発生するエラーです。たとえば、数値ではないものを数値として扱おうとしたり、関数ではないものを関数として呼び出そうとした場合に発生します。

```html
<script>
    console.log("=== TypeError のテスト ===");

    // 例1: 関数でないものを関数として呼び出し
    try {
        const notAFunction = "これは文字列です";
        notAFunction();
    } catch (error) {
        console.log("エラー1: " + error.name + " - " + error.message);
    }

    // 例2: nullやundefinedのプロパティにアクセス
    try {
        const nullValue = null;
        console.log(nullValue.property);
    } catch (error) {
        console.log("エラー2: " + error.name + " - " + error.message);
    }

    // 例3: 配列でないものに配列のメソッドを使用
    try {
        const notAnArray = "文字列";
        notAnArray.push("要素");
    } catch (error) {
        console.log("エラー3: " + error.name + " - " + error.message);
    }
</script>
```

TypeErrorは、データの型を正しく理解していない時によく発生します。JavaScriptは型が柔軟な言語ですが、それぞれの値には明確な型があり、型に応じた操作しか行うことができません。

### TypeErrorを防ぐ方法

TypeErrorを防ぐためには、値の型を確認してから操作を行うことが大切です。

```html
<script>
    console.log("=== TypeErrorを防ぐ方法 ===");

    // 型をチェックしてから操作する
    function safeCall(func) {
        if (typeof func === 'function') {
            console.log("関数を実行します");
            func();
        } else {
            console.log("これは関数ではありません: " + typeof func);
        }
    }

    // テスト
    safeCall(function() { console.log("正常な関数呼び出し"); });
    safeCall("文字列");

    // 配列かどうかチェックしてから操作
    function safeArrayOperation(arr) {
        if (Array.isArray(arr)) {
            console.log("配列の長さ: " + arr.length);
        } else {
            console.log("これは配列ではありません");
        }
    }

    safeArrayOperation([1, 2, 3]);
    safeArrayOperation("文字列");

    // nullやundefinedをチェック
    function safePropertyAccess(obj) {
        if (obj !== null && obj !== undefined) {
            console.log("オブジェクトのプロパティ数: " + Object.keys(obj).length);
        } else {
            console.log("オブジェクトがnullまたはundefinedです");
        }
    }

    safePropertyAccess({ name: "test" });
    safePropertyAccess(null);
</script>
```

型をチェックしてから操作を行うことで、TypeErrorを事前に防ぐことができます。

## その他のよくあるエラー

JavaScriptには、上記以外にもいくつかのエラーがあります。よく遭遇するものを確認してみましょう。

```html
<script>
    console.log("=== その他のエラー ===");

    // RangeError: 値が範囲外の場合
    try {
        const array = new Array(-1); // 負の数で配列を作成
    } catch (error) {
        console.log("RangeError: " + error.message);
    }

    // URIError: URI関連の処理での問題
    try {
        decodeURIComponent('%'); // 不正なURIエンコード
    } catch (error) {
        console.log("URIError: " + error.message);
    }

    // EvalError: eval関数関連（現在はほとんど使われない）
    console.log("EvalErrorは現在ほとんど発生しません");
</script>
```

これらのエラーは特定の状況でのみ発生するため、日常的なプログラミングではそれほど頻繁に遭遇しません。しかし、発生した時に何のエラーかが分かるように覚えておくと良いでしょう。

## エラーメッセージの読み方

エラーが発生した時は、エラーメッセージをよく読むことが問題解決の第一歩です。エラーメッセージの読み方を確認してみましょう。

```html
<script>
    console.log("=== エラーメッセージの読み方 ===");

    try {
        const obj = null;
        obj.method();
    } catch (error) {
        console.log("=== エラー情報の詳細 ===");
        console.log("エラーの種類: " + error.name);
        console.log("エラーメッセージ: " + error.message);
        console.log("発生場所: " + error.stack);
    }
</script>
```

エラーメッセージには以下の情報が含まれています。

- `error.name`: エラーの種類（TypeError、ReferenceErrorなど）
- `error.message`: エラーの具体的な内容
- `error.stack`: エラーが発生した場所の詳細情報

これらの情報を読むことで、何が原因でエラーが発生したのか、どこで発生したのかを特定することができます。

## まとめ

本章では、JavaScriptでよく発生するエラーの種類について学びました。以下の内容を理解できたことと思います。

- SyntaxErrorは文法が間違っている時に発生し、実行前に検出される
- ReferenceErrorは存在しない変数や関数を参照した時に発生する
- TypeErrorは期待している型と異なる操作を行った時に発生する
- エラーメッセージを読むことで問題の原因と場所を特定できる
- 適切な型チェックや存在チェックでエラーを予防できる

エラーの種類を理解することで、問題が発生した時に素早く原因を特定し、適切な対処を行うことができるようになります。また、どのようなエラーが起こりやすいかを知ることで、事前にエラーを防ぐコードを書くことも可能になります。
