---
title: Promiseの基本的な使い方を学ぼう
nextjs:
  metadata:
    title: Promiseの基本的な使い方を学ぼう
    description: JavaScriptのPromiseの基本概念を学び、非同期処理の成功と失敗を適切に扱う方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- Promiseとは何かを理解する
- Promiseの3つの状態を学ぶ
- `then`メソッドで成功時の処理を書く方法を習得する
- `catch`メソッドで失敗時の処理を書く方法を理解する

## はじめに

前回は`setTimeout`を使って時間差で処理を実行する方法を学びました。しかし、実際のWebアプリケーションでは、もっと複雑な非同期処理を扱う必要があります。

例えば、サーバーからデータを取得する処理を考えてみましょう。この処理は「成功するかもしれないし、失敗するかもしれない」という不確実性を持っています。ネットワークの調子が悪かったり、サーバーがメンテナンス中だったりすると、処理が失敗することがあります。

このような「成功するか失敗するかわからない非同期処理」を扱うために、JavaScriptには**Promise**（プロミス）という仕組みが用意されています。Promiseを使うことで、非同期処理の成功と失敗を分けて処理できるようになります。

## Promiseとは何か

**Promise**とは、「将来的に値が得られることを約束するオブジェクト」です。日本語で「約束」という意味の通り、「後で結果を教えるから、今は待っていてね」という仕組みです。

身近な例で考えてみましょう。レストランで料理を注文した時のことを想像してください。

注文をすると、店員さんから「10分ほどでお持ちします」と言われます。これがPromiseのようなものです。

10分後には「料理ができました」（成功）、もしくは「申し訳ございませんが、材料が切れてしまいました」（失敗）のどちらかの結果が返ってきます。

まずは、シンプルなPromiseを作ってみましょう。VS Codeで`promise-basic.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promiseの基本</title>
</head>
<body>
    <h1>Promiseの基本的な使い方</h1>

    <script>
        console.log("Promiseを作成します");

        // 2秒後に成功するPromiseを作成
        const myPromise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("成功しました！");
            }, 2000);
        });

        console.log("Promiseを作成しました（まだ完了していません）");
        console.log("2秒後に結果が出ます");
    </script>
</body>
</html>
```

このコードを実行すると、コンソールにメッセージが表示されますが、まだPromiseの結果は使っていません。

```bash
Promiseを作成します
Promiseを作成しました（まだ完了していません）
2秒後に結果が出ます
# この後には何も表示されません
```

Promiseは作成しただけでは結果を表示してくれません。そこで、結果を受け取るために工夫が必要となります。

## Promiseの3つの状態

先に、Promiseの状態について理解しておきましょう。

Promiseには3つの状態があります。

- **Pending**（待機中）: まだ結果が決まっていない状態
- **Fulfilled**（履行済み）: 処理が成功した状態
- **Rejected**（拒否済み）: 処理が失敗した状態

最初はすべてのPromiseがPending状態から始まり、時間が経つとFulfilledかRejectedのどちらかの状態になります。一度状態が決まったPromiseは、その状態が変わることはありません。

この状態の変化を視覚的に確認してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promiseの状態</title>
</head>
<body>
    <h1>Promiseの状態変化</h1>

    <script>
        console.log("1. Promiseを作成します");

        const myPromise = new Promise(function(resolve, reject) {
            console.log("2. Promise内部の処理が開始されました（Pending状態）");

            setTimeout(function() {
                console.log("3. 2秒経過しました");
                resolve("処理が完了しました");
                console.log("4. resolve呼び出し完了（Fulfilled状態になります）");
            }, 2000);
        });

        console.log("5. Promise作成完了（まだPending状態です）");
    </script>
</body>
</html>
```

このコードを実行すると、Promiseがどのように状態を変化させるかがわかります。最初はPending状態で、2秒後にFulfilled状態になります。

ブラウザでこのHTMLを開き、コンソールを確認すると、Promiseの状態変化がどのように行われるかがわかります。

```bash
1. Promiseを作成します
2. Promise内部の処理が開始されました（Pending状態）
5. Promise作成完了（まだPending状態です）
3. 2秒経過しました
4. resolve呼び出し完了（Fulfilled状態になります）
```

上記の流れを丁寧に追ってみます。

まず、Promiseを作成すると、コンソールに「1. Promiseを作成します」と表示されます。

次に、Promiseの内部処理が開始され、「2. Promise内部の処理が開始されました（Pending状態）」と表示されます。

そして、このタイミングで Promise が完成したことになるので、「5. Promise作成完了（まだPending状態です）」と表示されます。

その後、2秒待つと「2秒経過しました」と表示され、`resolve`が呼び出されます。

これによりPromiseはFulfilled状態になり、「4. resolve呼び出し完了（Fulfilled状態になります）」と表示されます。

Promise は現役のエンジニアですら難しいと感じることがあるため、最初は戸惑うかもしれません。しかし、Promiseの基本的な概念を理解することで、非同期処理をより効果的に扱えるようになります。

## thenメソッドで成功時の処理を書こう

Promiseの結果を受け取るには、`then`メソッドを使います。`then`メソッドは、Promiseが成功（Fulfilled）した時に実行される処理を指定します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>thenメソッドの使い方</title>
</head>
<body>
    <h1>thenメソッドで結果を受け取る</h1>

    <script>
        console.log("処理開始");

        // 成功するPromiseを作成
        const successPromise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("データの取得に成功しました");
            }, 2000);
        });

        // thenで成功時の処理を指定
        successPromise.then(function(result) {
            console.log("成功: " + result);
        });

        console.log("他の処理を続けます");
    </script>
</body>
</html>
```

このコードを実行すると、2秒後に「成功: データの取得に成功しました」というメッセージが表示されます。`then`メソッドのコールバック関数は、`resolve`に渡された値を引数として受け取ります。

```bash
処理開始
他の処理を続けます
成功: データの取得に成功しました
```

より実用的な例として、ユーザー情報を取得する処理を模擬してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ユーザー情報取得の例</title>
</head>
<body>
    <h1>ユーザー情報取得（成功例）</h1>
    <p id="user-info">ユーザー情報を読み込み中...</p>

    <script>
        // ユーザー情報を取得するPromise（成功パターン）
        function getUserInfo() {
            return new Promise(function(resolve, reject) {
                console.log("サーバーからユーザー情報を取得中...");

                setTimeout(function() {
                    const userInfo = {
                        name: "田中太郎",
                        age: 25,
                        email: "tanaka@example.com"
                    };
                    resolve(userInfo);
                }, 3000);
            });
        }

        // ユーザー情報を取得して画面に表示
        getUserInfo().then(function(user) {
            console.log("ユーザー情報取得完了:", user);

            const display = document.getElementById('user-info');
            display.innerHTML = `
                <strong>名前:</strong> ${user.name}<br>
                <strong>年齢:</strong> ${user.age}歳<br>
                <strong>メール:</strong> ${user.email}
            `;
        });

        console.log("ユーザー情報の取得を開始しました");
    </script>
</body>
</html>
```

このコードでは、3秒後にユーザー情報が画面に表示されます。`then`メソッドを使うことで、非同期処理の結果を受け取って画面に反映できます。

![スクリーンショット](/img/javascript/user-info-fetch-success.png)

実際のアプリケーションでも、サーバーからのデータ取得やAPI呼び出しなど、非同期処理を扱う場面でPromiseと`then`メソッドは非常に役立ちます。

## catchメソッドで失敗時の処理を書こう

実際のアプリケーションでは、処理が失敗することもあります。失敗した時の処理を書くために、`catch`メソッドを使います。

まずは、失敗するPromiseを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>失敗するPromise</title>
</head>
<body>
    <h1>Promiseの失敗処理</h1>

    <script>
        console.log("処理開始");

        // 失敗するPromiseを作成
        const failurePromise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject("エラーが発生しました");
            }, 2000);
        });

        // catchで失敗時の処理を指定
        failurePromise.catch(function(error) {
            console.log("失敗: " + error);
        });

        console.log("他の処理を続けます");
    </script>
</body>
</html>
```

このコードでは、`reject`を呼び出すことでPromiseを失敗状態にしています。`catch`メソッドで失敗時の処理を指定すると、`reject`に渡された値を受け取ることができます。

```bash
処理開始
他の処理を続けます
失敗: エラーが発生しました
```

## thenとcatchを組み合わせて使おう

では、ここまで学んだ内容を組み合わせて、成功と失敗の両方に対応するPromiseの使い方を見ていきましょう。

実際のアプリケーションでは、成功と失敗の両方に対応する必要があります。

`then`と`catch`を組み合わせて使ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>成功と失敗の両方に対応</title>
</head>
<body>
    <h1>データ取得（成功・失敗対応版）</h1>
    <button onclick="loadData(true)">成功パターン</button>
    <button onclick="loadData(false)">失敗パターン</button>
    <p id="result">ボタンをクリックしてください</p>

    <script>
        function loadData(shouldSucceed) {
            const resultElement = document.getElementById('result');
            resultElement.textContent = "データを読み込み中...";

            // 成功するか失敗するかをランダムに決めるPromise
            const dataPromise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    if (shouldSucceed) {
                        resolve("データの読み込みが完了しました");
                    } else {
                        reject("ネットワークエラーが発生しました");
                    }
                }, 2000);
            });

            // 成功時と失敗時の両方の処理を書く
            dataPromise
                .then(function(data) {
                    console.log("成功:", data);
                    resultElement.textContent = "✅ " + data;
                    resultElement.style.color = "green";
                })
                .catch(function(error) {
                    console.log("失敗:", error);
                    resultElement.textContent = "❌ " + error;
                    resultElement.style.color = "red";
                });
        }
    </script>
</body>
</html>
```

このコードでは、ボタンをクリックすることで成功パターンと失敗パターンを試すことができます。このように、`then`と`catch`をメソッドチェーンで繋げて書くことで、成功時と失敗時の処理を分けて記述できます。

改めてポイントを整理しておくと、以下のようになります。

- `then`メソッドはPromiseが成功した時に実行される処理を指定する
- `catch`メソッドはPromiseが失敗した時に実行される処理を指定する
- `then`と`catch`を組み合わせることで、成功と失敗の両方に対応できる

Promise は非同期処理の結果を扱うための強力なツールです。これを使うことで、非同期処理の成功と失敗を明確に分けて処理できるようになります。

アプリ開発をする場合には必須のスキルとなるため、しっかりと理解しておきましょう。

## まとめ

本章では、Promiseの基本的な使い方について学習しました。今回学んだ内容は以下の通りです。

- **Promise**は将来的に値が得られることを約束するオブジェクトである
- Promiseには**Pending**、**Fulfilled**、**Rejected**の3つの状態がある
- `then`メソッドを使って成功時の処理を書くことができる
- `catch`メソッドを使って失敗時の処理を書くことができる
- `then`と`catch`を組み合わせることで、成功と失敗の両方に対応できる

Promiseは非同期処理を扱う上で重要な概念です。最初は少し複雑に感じるかもしれませんが、「将来の結果を約束するもの」として理解すると使いやすくなります。次回は、Promiseをさらに使いやすくする`async/await`について学んでいきましょう。
