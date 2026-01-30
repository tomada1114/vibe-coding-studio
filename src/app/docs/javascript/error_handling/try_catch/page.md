---
title: try-catch文でエラーを処理してみよう
nextjs:
  metadata:
    title: try-catch文でエラーを処理してみよう
    description: JavaScriptのtry-catch文を使ったエラー処理の基本構文を学び、エラーが発生した時の動作とfinallyブロックの使い方をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- try-catch文の基本構文を理解する
- エラーが発生した時の動作を学ぶ
- finallyブロックの使い方を習得する
- エラー処理の重要性を理解する

## はじめに

プログラムを書いていると、時々エラーが発生することがあります。たとえば、存在しない変数を使おうとしたり、計算できない処理を実行しようとしたりした場合です。

通常、エラーが発生するとプログラムがその時点で完全に止まってしまいます。ユーザーがWebページを使っている時にプログラムが突然止まってしまうと、とても困ってしまいますよね。

そんな問題を解決するのが**try-catch文**です。try-catch文を使うことで、エラーが発生しても適切に対処して、プログラムを安全に続行することができるようになります。

try-catch文は、「この処理でエラーが起きるかもしれないから注意深く実行して、もしエラーが起きたらこういう対処をしよう」という仕組みを提供してくれます。まずは基本的な使い方から一緒に学んでいきましょう。

## エラーが発生するとどうなるか

まず、try-catch文を使わない場合にエラーが発生するとどうなるかを確認してみましょう。VS Codeで新しいHTMLファイル`try-catch-test.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>try-catch文のテスト</title>
</head>
<body>
    <h1>try-catch文のテスト</h1>
    
    <script>
        console.log("プログラム開始");
        console.log("正常な処理1");
        
        // ここで存在しない変数を参照してエラーを発生させる
        console.log(unknownVariable);
        
        // この行以降は実行されない
        console.log("正常な処理2");
        console.log("プログラム終了");
    </script>
</body>
</html>
```

このHTMLファイルを保存してブラウザで開き、開発者ツールのConsoleを確認してください。エラーが発生して、その後の処理が実行されていないことが分かります。

エラーが発生すると、プログラムはその時点で止まり、その後に書かれたコードは一切実行されません。これは、ユーザーにとって不便な状況を作り出してしまいます。

## try-catch文の基本的な使い方

それでは、try-catch文を使ってエラーを安全に処理してみましょう。先ほどのHTMLファイルのスクリプト部分を以下のように変更してください。

```html
<script>
    console.log("プログラム開始");
    console.log("正常な処理1");
    
    try {
        // エラーが発生する可能性のある処理をtryブロックに書く
        console.log("tryブロック内の処理開始");
        console.log(unknownVariable); // 存在しない変数を参照
        console.log("この行は実行されません");
    } catch (error) {
        // エラーが発生した時の処理をcatchブロックに書く
        console.log("エラーが発生しました: " + error.message);
        console.log("エラーを適切に処理しました");
    }
    
    // プログラムは続行される
    console.log("正常な処理2");
    console.log("プログラム終了");
</script>
```

このコードを実行すると、エラーが発生してもプログラムが止まることなく、最後まで実行されることが確認できます。

try-catch文の仕組みは以下のようになっています。まず、`try`ブロック内の処理が順番に実行されます。もし`try`ブロック内でエラーが発生すると、その時点で`try`ブロックの実行が中断され、すぐに`catch`ブロックに処理が移ります。

`catch`ブロックでは、発生したエラーの情報を受け取ることができます。上記の例では、`error`という名前でエラー情報を受け取り、`error.message`でエラーの詳細なメッセージを取得しています。

## try-catch文の構造を理解しよう

try-catch文の基本的な構造を詳しく見てみましょう。

```javascript
try {
    // エラーが発生する可能性のある処理
    // この中の処理は上から順番に実行される
    // エラーが発生すると、その時点でcatchブロックに移る
} catch (error) {
    // エラーが発生した時だけ実行される処理
    // errorにはエラーの詳細情報が含まれている
}
```

`try`ブロックには、普通に実行したい処理を書きます。ただし、その処理の中でエラーが発生する可能性がある場合に使います。

`catch`ブロックは、エラーが発生した時だけ実行される特別な場所です。ここには、エラーが発生した時にどのような対処をするかを書きます。エラーが発生しなかった場合、`catch`ブロックは実行されません。

## エラーが発生しない場合の動作

エラーが発生しない場合の動作も確認してみましょう。HTMLファイルに以下のコードを追加してください。

```html
<script>
    console.log("=== エラーが発生しない場合のテスト ===");
    
    try {
        console.log("tryブロック開始");
        const number1 = 10;
        const number2 = 5;
        const result = number1 + number2;
        console.log("計算結果: " + result);
        console.log("tryブロック正常終了");
    } catch (error) {
        console.log("この行は実行されません");
    }
    
    console.log("try-catch文の後の処理");
</script>
```

この場合、`try`ブロック内の処理がすべて正常に実行され、`catch`ブロックは実行されません。エラーが発生しなかった場合、try-catch文は普通のコードブロックと同じように動作します。

つまり、try-catch文は「普段は普通に処理を実行するけれど、もしエラーが起きたら安全に対処する」という仕組みなのです。

## エラー情報を詳しく見てみよう

`catch`ブロックで受け取るエラー情報には、様々な内容が含まれています。どのような情報が取得できるかを確認してみましょう。

```html
<script>
    console.log("=== エラー情報の詳細 ===");
    
    try {
        console.log("エラーを発生させます");
        const obj = null;
        console.log(obj.property); // nullオブジェクトのプロパティにアクセス
    } catch (error) {
        console.log("エラー名: " + error.name);
        console.log("エラーメッセージ: " + error.message);
        console.log("エラー全体: " + error);
    }
    
    console.log("エラー処理完了");
</script>
```

エラーオブジェクトには、エラーの種類を示す`name`プロパティと、具体的な内容を説明する`message`プロパティが含まれています。これらの情報を使うことで、発生したエラーの詳細を把握し、適切な対処を行うことができます。

## finallyブロックを使ってみよう

try-catch文には、さらに**finally**ブロックという機能があります。finallyブロックは、エラーが発生してもしなくても、必ず実行される処理を書く場所です。

```html
<script>
    console.log("=== finallyブロックのテスト ===");
    
    function testFunction(shouldError) {
        console.log("関数開始");
        
        try {
            console.log("tryブロック開始");
            if (shouldError) {
                console.log("エラーを発生させます");
                console.log(undefinedVariable);
            } else {
                console.log("正常処理を行います");
                const result = 1 + 1;
                console.log("結果: " + result);
            }
            console.log("tryブロック終了");
        } catch (error) {
            console.log("catchブロック: " + error.message);
        } finally {
            console.log("finallyブロック: この行は必ず実行されます");
        }
        
        console.log("関数終了");
    }
    
    console.log("--- エラーが発生しない場合 ---");
    testFunction(false);
    
    console.log("--- エラーが発生する場合 ---");
    testFunction(true);
</script>
```

finallyブロックの特徴は、`try`ブロックが正常に実行されても、エラーが発生して`catch`ブロックが実行されても、どちらの場合でも必ず実行されることです。

finallyブロックは、「何があっても必ず実行したい処理」を書く場所として使われます。たとえば、ファイルを開いた後に必ずファイルを閉じる処理や、データベースに接続した後に必ず接続を切断する処理などに使われます。

## エラー処理の重要性を理解しよう

エラー処理をしっかりと行うことで、ユーザーにとって使いやすいWebページを作ることができます。エラー処理がある場合とない場合の違いを比較してみましょう。

```html
<script>
    console.log("=== エラー処理の重要性 ===");
    
    // エラー処理がない関数
    function divideWithoutErrorHandling(a, b) {
        console.log("計算開始（エラー処理なし）");
        const result = a / b;
        console.log("結果: " + result);
        return result;
    }
    
    // エラー処理がある関数
    function divideWithErrorHandling(a, b) {
        console.log("計算開始（エラー処理あり）");
        
        try {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error("数値以外が入力されました");
            }
            if (b === 0) {
                throw new Error("0で割ることはできません");
            }
            
            const result = a / b;
            console.log("結果: " + result);
            return result;
        } catch (error) {
            console.log("エラーが発生: " + error.message);
            console.log("正しい数値を入力してください");
            return null;
        }
    }
    
    console.log("--- 正常な計算 ---");
    divideWithoutErrorHandling(10, 2);
    divideWithErrorHandling(10, 2);
    
    console.log("--- 問題のある計算 ---");
    divideWithoutErrorHandling(10, 0);
    divideWithErrorHandling(10, 0);
</script>
```

エラー処理がない関数では、0で割った場合に`Infinity`という値が返されますが、これが正しい結果なのかユーザーには分からりません。

一方、エラー処理がある関数では、問題のある入力に対して分かりやすいメッセージを表示し、適切な値（この場合は`null`）を返しています。これにより、ユーザーは何が問題だったのかを理解し、正しい入力を行うことができます。

## まとめ

本章では、try-catch文によるエラー処理について学びました。以下の内容を理解できたことと思います。

- try-catch文を使うことで、エラーが発生してもプログラムを安全に続行できる
- tryブロックにはエラーが発生する可能性のある処理を書く
- catchブロックにはエラーが発生した時の対処を書く
- finallyブロックは必ず実行される処理を書く場所
- 適切なエラー処理により、ユーザーにとって使いやすいプログラムを作ることができる

エラー処理は、安定したWebアプリケーションを作るためにとても大切な技術です。try-catch文を使うことで、予期しないエラーが発生してもユーザーに適切なメッセージを表示し、プログラムを安全に動作させることができるようになります。