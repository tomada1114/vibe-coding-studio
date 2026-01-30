---
title: async/awaitで非同期処理を書いてみよう
nextjs:
  metadata:
    title: async/awaitで非同期処理を書いてみよう
    description: JavaScriptのasync/awaitを使ってPromiseをより読みやすく書く方法を学び、非同期処理をシンプルに扱う技術を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- `async`関数の基本的な書き方を理解する
- `await`キーワードの使い方を習得する
- Promiseより読みやすい書き方を学ぶ
- 簡単な非同期処理を体験する

## はじめに

前回はPromiseを使って非同期処理を書く方法を学びました。しかし、`then`や`catch`を使った書き方は少し複雑でしたね。

そこで今回は、**async/await**という、もっと簡単で読みやすい書き方を学びます。これを使うと、非同期処理をまるで普通の処理のように書くことができます。

例えば、「3秒待ってからメッセージを表示する」という処理を、上から下へ順番に書けるようになります。コードがずっとわかりやすくなるので、ぜひ覚えていきましょう。

## async関数を作ってみよう

`async/await`を使うには、まず**async関数**を作る必要があります。これは、普通の関数の前に`async`と付けるだけです。

VS Codeで`async-basic.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>async/awaitの基本</title>
</head>
<body>
    <h1>async/awaitを試してみよう</h1>
    <button onclick="simpleAsyncFunction()">ボタンを押してみて</button>
    <p id="message">ここにメッセージが表示されます</p>

    <script src="async-basic.js"></script>
</body>
</html>
```

次に、同じフォルダに`async-basic.js`というファイルを作成してください。

```javascript
// 普通の関数
function normalFunction() {
    console.log("これは普通の関数です");
}

// async関数（asyncを付けただけ）
async function simpleAsyncFunction() {
    console.log("これはasync関数です");

    const messageElement = document.getElementById('message');
    messageElement.textContent = "async関数が実行されました！";
}
```

このHTMLファイルをブラウザで開き、開発者ツールのConsoleタブを開いてからボタンをクリックしてみてください。

![スクリーンショット](/img/javascript/initial_async_await.png)

![スクリーンショット](/img/javascript/initial_async_await_console.png)

コンソールには以下のように表示されます。

```
これはasync関数です
```

同時に、画面では「ここにメッセージが表示されます」という文字が「async関数が実行されました！」に変わります。今のところ、async関数も普通の関数と同じように動作します。違いは関数の前に`async`が付いているだけです。

## awaitで待機してみよう

async関数の中では、`await`というキーワードを使うことができます。これは「待つ」という意味で、Promiseが完了するまで処理を止めて待ってくれます。

まずは簡単な例から見てみましょう。`async-basic.js`を以下のように変更してください。

```javascript
// 指定した秒数だけ待つPromiseを作る関数
function wait(seconds) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, seconds * 1000);
    });
}

// awaitを使って待機するasync関数
async function simpleAsyncFunction() {
    const messageElement = document.getElementById('message');

    messageElement.textContent = "処理を開始します...";
    console.log("処理開始");

    // 2秒間待つ
    await wait(2);

    messageElement.textContent = "2秒経ちました！";
    console.log("2秒経過しました");
}
```



HTMLファイルを開いてボタンをクリックすると、以下のような変化が起こります。

#### ボタンクリック直後
- 画面表示: 「処理を開始します...」
- コンソール表示: `処理開始`

![スクリーンショット](/img/javascript/initial_async_await_after_click.png)

#### 2秒後
- 画面表示: 「2秒経ちました！」
- コンソール表示: `2秒経過しました`

![スクリーンショット](/img/javascript/initial_async_await_after_wait.png)

`await wait(2)`の部分で、プログラムが2秒間停止して待っています。この「待つ」という動作が`await`の基本的な使い方です。画面を見ていると、メッセージがパッと変わってから2秒後にまた変わることが確認できるでしょう。

## メッセージを順番に表示してみよう

`await`を使うと、複数の処理を順番に実行することができます。これがasync/awaitの便利なところです。

新しく`step-by-step.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>順番にメッセージ表示</title>
</head>
<body>
    <h1>メッセージを順番に表示</h1>
    <button onclick="showStepByStep()">開始</button>
    <div id="messages"></div>

    <script src="step-by-step.js"></script>
</body>
</html>
```

続いて、`step-by-step.js`を作成してください。

```javascript
// 指定した秒数待つ関数
function wait(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
}

// メッセージを画面に追加する関数
function addMessage(text) {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = text;
    messagesDiv.appendChild(newMessage);
}

// 順番にメッセージを表示するasync関数
async function showStepByStep() {
    // 最初にメッセージをクリア
    document.getElementById('messages').innerHTML = '';

    console.log("ステップ開始");
    addMessage("ステップ1: 開始します");

    console.log("1秒待機中...");
    await wait(1);  // 1秒待つ
    console.log("1秒経過");
    addMessage("ステップ2: 1秒経ちました");

    console.log("さらに1秒待機中...");
    await wait(1);  // さらに1秒待つ
    console.log("さらに1秒経過");
    addMessage("ステップ3: さらに1秒経ちました");

    console.log("最後の1秒待機中...");
    await wait(1);  // さらに1秒待つ
    console.log("完了");
    addMessage("ステップ4: 完了しました！");
}
```

少し複雑なコードですが、これで順番にメッセージを表示することができます。

このプログラムを実行すると、以下のような変化が順番に起こります。

#### ボタンクリック直後
- 画面: 「ステップ1: 開始します」が表示される
- コンソール: `ステップ開始` → `1秒待機中...`

#### 1秒後
- 画面: 「ステップ2: 1秒経ちました」が追加される
- コンソール: `1秒経過` → `さらに1秒待機中...`

#### 2秒後
- 画面: 「ステップ3: さらに1秒経ちました」が追加される
- コンソール: `さらに1秒経過` → `最後の1秒待機中...`

#### 3秒後
- 画面: 「ステップ4: 完了しました！」が追加される
- コンソール: `完了`

最終的に画面には4つのメッセージが縦に並んで表示されます。

![スクリーンショット](/img/javascript/step_by_step.png)

`await`を使うことで、「1秒待つ → メッセージ追加 → 1秒待つ → メッセージ追加」という流れを上から下へ順番に書くことができました。

## Promiseとの書き方を比べてみよう

同じ処理をPromiseの`then`とasync/awaitで書き比べてみましょう。違いがよくわかると思います。

新しく`comparison.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>書き方の比較</title>
</head>
<body>
    <h1>Promiseとasync/awaitの比較</h1>
    <button onclick="usePromiseWay()">Promiseの書き方</button>
    <button onclick="useAsyncAwaitWay()">async/awaitの書き方</button>
    <p id="result1">Promiseの結果がここに表示されます</p>
    <p id="result2">async/awaitの結果がここに表示されます</p>

    <script src="comparison.js"></script>
</body>
</html>
```

次に、`comparison.js`を作成してください。

```javascript
// 簡単なデータを取得するPromise
function getData() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("データを取得しました");
        }, 2000);
    });
}

// Promiseのthenを使った書き方
function usePromiseWay() {
    const result1 = document.getElementById('result1');
    result1.textContent = "Promise: 処理中...";
    console.log("Promise方式: 処理開始");

    getData().then(function(data) {
        result1.textContent = "Promise: " + data;
        console.log("Promise方式: " + data);
    });
}

// async/awaitを使った書き方
async function useAsyncAwaitWay() {
    const result2 = document.getElementById('result2');
    result2.textContent = "async/await: 処理中...";
    console.log("async/await方式: 処理開始");

    const data = await getData();
    result2.textContent = "async/await: " + data;
    console.log("async/await方式: " + data);
}
```

両方のボタンをクリックしてみてください。

#### Promiseボタンをクリックした場合
- すぐに画面表示: 「Promise: 処理中...」
- すぐにコンソール: `Promise方式: 処理開始`
- 2秒後に画面表示: 「Promise: データを取得しました」
- 2秒後にコンソール: `Promise方式: データを取得しました`

#### async/awaitボタンをクリックした場合
- すぐに画面表示: 「async/await: 処理中...」
- すぐにコンソール: `async/await方式: 処理開始`
- 2秒後に画面表示: 「async/await: データを取得しました」
- 2秒後にコンソール: `async/await方式: データを取得しました`

同じような結果になったことが確認できると思いますが、コードの書き方が大きく違いますね。

まず、Promiseの書き方では、`then`を使って非同期処理の結果を受け取る必要があります。

これに対して、async/awaitでは`await`を使うことで、まるで同期処理のように書くことができます。

このように、async/awaitを使うとコードがすっきりして、読みやすくなります。特に複雑な非同期処理を扱う場合、async/awaitの方がずっと理解しやすいのでおすすめです。

## 簡単な実用例を作ってみよう

最後に、もう少し実用的な例を作ってみましょう。時間をかけて計算する処理をシミュレートしてみます。

新しく`calculator.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>計算アプリ</title>
</head>
<body>
    <h1>時間のかかる計算</h1>
    <button onclick="doCalculation()">複雑な計算を開始</button>
    <p id="status">ボタンを押してください</p>
    <p id="result"></p>

    <script src="calculator.js"></script>
</body>
</html>
```

次に、`calculator.js`を作成してください。

```javascript
// 時間のかかる計算をシミュレートする関数
function heavyCalculation(number) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            const result = number * 2;
            resolve(result);
        }, 1500);  // 1.5秒かかる計算
    });
}

// 計算を実行するasync関数
async function doCalculation() {
    const statusElement = document.getElementById('status');
    const resultElement = document.getElementById('result');

    // 結果をクリア
    resultElement.textContent = '';
    console.log("計算処理を開始します");

    statusElement.textContent = "計算1を実行中...";
    console.log("計算1開始: 5 × 2");
    const result1 = await heavyCalculation(5);
    statusElement.textContent = `計算1完了: 5 × 2 = ${result1}`;
    console.log(`計算1完了: 結果は ${result1}`);

    statusElement.textContent = "計算2を実行中...";
    console.log(`計算2開始: ${result1} × 2`);
    const result2 = await heavyCalculation(result1);
    statusElement.textContent = `計算2完了: ${result1} × 2 = ${result2}`;
    console.log(`計算2完了: 結果は ${result2}`);

    statusElement.textContent = "計算3を実行中...";
    console.log(`計算3開始: ${result2} × 2`);
    const result3 = await heavyCalculation(result2);

    statusElement.textContent = "すべての計算が完了しました！";
    resultElement.textContent = `最終結果: ${result3}`;
    console.log(`計算3完了: 最終結果は ${result3}`);
    console.log("すべての処理が完了しました");
}
```

このプログラムを実行すると、以下のような変化が1.5秒ごとに起こります。

#### ボタンクリック直後
- 画面: 「計算1を実行中...」
- コンソール: `計算処理を開始します` → `計算1開始: 5 × 2`

#### 1.5秒後
- 画面: 「計算1完了: 5 × 2 = 10」
- コンソール: `計算1完了: 結果は 10` → `計算2開始: 10 × 2`

#### 3秒後
- 画面: 「計算2完了: 10 × 2 = 20」
- コンソール: `計算2完了: 結果は 20` → `計算3開始: 20 × 2`

#### 4.5秒後
- 画面: 「すべての計算が完了しました！」と「最終結果: 40」
- コンソール: `計算3完了: 最終結果は 40` → `すべての処理が完了しました`

画面では状況が順番に更新され、最終的に結果として「40」が表示されます。`await`を使うことで、前の計算が完了してから次の計算を開始できています。

![スクリーンショット](/img/javascript/calculator_example.png)

## まとめ

本章では、async/awaitの基本的な使い方について学習しました。今回学んだ内容は以下の通りです。

- `async`を関数の前に付けるとasync関数になる
- async関数の中では`await`キーワードが使える
- `await`を使うとPromiseの完了を待つことができる
- async/awaitを使うとコードが読みやすくなる

async/awaitは、Promiseをより簡単に書くための仕組みです。複雑に見えた非同期処理が、普通の処理のように書けるようになります。画面の変化とコンソールの出力を確認しながら練習することで、async/awaitの動作が理解できるようになるでしょう。
