---
title: try-catchを使って非同期エラーを処理しよう
nextjs:
  metadata:
    title: try-catchを使って非同期エラーを処理しよう
    description: async/await内でtry-catch文を使って非同期処理のエラーを適切に処理する方法を学び、安全なコードの書き方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- `try-catch`文の基本的な使い方を理解する
- async/await内でのエラー処理を学ぶ
- 成功した場合と失敗した場合の両方に対応する方法を習得する

## はじめに

前回はasync/awaitを使って非同期処理を書く方法を学びました。しかし、実際のプログラムでは処理が失敗することもあります。

例えば、「3秒後にメッセージを表示する」という処理があったとして、その途中で何かの問題が起きたらどうなるでしょうか。エラーが起きたまま放置すると、プログラムが止まってしまうかもしれません。

そこで今回は、**try-catch**という仕組みを使って、エラーが起きても適切に対応できる方法を学びましょう。これを使うことで、「うまくいけばこうする、失敗したらああする」という処理が書けるようになります。

## try-catchの基本的な使い方

`try-catch`は、「試してみて、エラーが起きたら別の処理をする」という仕組みです。書き方は以下のようになります。

```javascript
try {
    // 試したい処理
} catch (error) {
    // エラーが起きた時の処理
}
```

まずは簡単な例を見てみましょう。VS Codeで`try-catch-basic.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>try-catchの基本</title>
</head>
<body>
    <h1>try-catchを試してみよう</h1>
    <button onclick="testTryCatch()">処理を実行</button>
    <p id="message">ここに結果が表示されます</p>

    <script src="try-catch-basic.js"></script>
</body>
</html>
```

次に、`try-catch-basic.js`を作成してください。

```javascript
// ランダムで成功か失敗する処理
function randomProcess() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // コインを投げるように50%の確率で決める
            if (Math.random() > 0.5) {
                resolve("成功しました！");
            } else {
                reject("失敗しました...");
            }
        }, 2000);
    });
}

// try-catchを使ってエラー処理をする関数
async function testTryCatch() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = "処理中...";
    console.log("処理を開始します");

    try {
        // 成功するかもしれない、失敗するかもしれない処理
        const result = await randomProcess();

        // 成功した場合
        messageElement.textContent = "✅ " + result;
        console.log("成功:", result);

    } catch (error) {
        // 失敗した場合
        messageElement.textContent = "❌ " + error;
        console.log("エラー:", error);
    }

    console.log("処理が終了しました");
}
```

このコードを実行してボタンを何度かクリックしてみてください。

#### 成功した場合
- 2秒後に画面表示: 「✅ 成功しました！」
- コンソール: `処理を開始します` → `成功: 成功しました！` → `処理が終了しました`

#### 失敗した場合
- 2秒後に画面表示: 「❌ 失敗しました...」
- コンソール: `処理を開始します` → `エラー: 失敗しました...` → `処理が終了しました`

重要なのは、成功しても失敗しても「処理が終了しました」というメッセージが最後に表示されることです。エラーが起きても、プログラムが完全に止まってしまうことはありません。

もしこういったエラー処理をしなかった場合、エラーが起きた時点でプログラムが止まってしまい、ユーザーに何も表示されないことになります。

それだとユーザーは何が起きたのか分からず、混乱してしまいます。そこで、try-catchを使ってエラーが起きても適切に対応できるようにするのです。

## try-catchがない場合はどうなるか

比較のために、try-catchを使わない場合がどうなるかを見てみましょう。新しく`without-try-catch.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>try-catchなしの例</title>
</head>
<body>
    <h1>try-catchを使わない場合</h1>
    <button onclick="testWithoutTryCatch()">処理を実行</button>
    <p id="message">ここに結果が表示されます</p>

    <script src="without-try-catch.js"></script>
</body>
</html>
```

次に、`without-try-catch.js`を作成してください。

```javascript
// 必ず失敗する処理
function failingProcess() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject("この処理は必ず失敗します");
        }, 2000);
    });
}

// try-catchを使わない関数
async function testWithoutTryCatch() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = "処理中...";
    console.log("処理を開始します");

    // try-catchなしでエラーが起きる処理を実行
    const result = await failingProcess();

    // この行は実行されない
    messageElement.textContent = "処理完了: " + result;
    console.log("この行は実行されません");
}
```

このコードを実行してボタンをクリックしてみてください。

#### 実行結果
- 2秒後に画面表示: 「処理中...」のまま変わらない
- コンソール: `処理を開始します` → エラーメッセージ（赤色）

try-catchがないと、エラーが起きた時点で処理が止まってしまい、画面の表示も更新されません。コンソールには赤いエラーメッセージが表示されます。

![スクリーンショット](/img/javascript/try_catch_error_handling.png)

## まとめ

本章では、async/awaitでのエラー処理について学習しました。今回学んだ内容は以下の通りです。

- `try-catch`を使うことで成功と失敗の両方に対応できる
- `try`の中に試したい処理を書き、`catch`の中にエラー処理を書く
- try-catchがないとエラーで処理が止まってしまう
- エラーが起きてもプログラム全体を継続できる

try-catchを使うことで、エラーが起きても適切に対応できるプログラムが書けるようになります。async/awaitを使う時は、必ずtry-catchでエラー処理をするようにしましょう。
