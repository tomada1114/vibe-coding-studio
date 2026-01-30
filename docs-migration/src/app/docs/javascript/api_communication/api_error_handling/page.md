---
title: APIエラーを適切に処理してみよう
nextjs:
  metadata:
    title: APIエラーを適切に処理してみよう
    description: Web APIでのエラー処理方法を学び、ネットワークエラーや通信失敗時にユーザーにわかりやすいメッセージを表示する技術を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- APIエラーが発生する原因を理解する
- try-catch文を使ったエラー処理の方法を習得する
- ユーザーにわかりやすいエラーメッセージを表示する方法を学ぶ

## はじめに

これまでの章では、APIからデータを正常に取得できる場合について学んできました。しかし、実際のWebアプリケーションでは、様々な理由でAPIの通信が失敗することがあります。

例えば、インターネット接続が不安定だったり、サーバーが一時的に利用できなくなったり、存在しないURLにアクセスしたりする場合です。このような状況で適切なエラー処理を行わないと、ユーザーは何が起きているのかわからず、アプリケーションが壊れているように感じてしまいます。

本章では、APIでエラーが発生した場合に適切に対処し、ユーザーに親切なメッセージを表示する方法を学んでいきましょう。

## 基本的なエラー処理

まずは、最も基本的なエラー処理の方法を見てみましょう。

VS Codeで`error-handling.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エラー処理の練習</title>
</head>
<body>
    <h1>エラー処理の練習</h1>
    <button id="loadData">データを読み込む</button>
    <button id="loadError">エラーを発生させる</button>
    <div id="result"></div>

    <script>
        // 正常なデータ取得
        document.getElementById('loadData').addEventListener('click', function() {
            document.getElementById('result').innerHTML = '読み込み中...';

            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(function(response) {
                    return response.json();
                })
                .then(function(user) {
                    document.getElementById('result').innerHTML =
                        '<p style="color: green;">成功: ' + user.name + '</p>';
                })
                .catch(function(error) {
                    console.log('エラーが発生:', error);
                    document.getElementById('result').innerHTML =
                        '<p style="color: red;">データの取得に失敗しました</p>';
                });
        });

        // わざとエラーを発生させる
        document.getElementById('loadError').addEventListener('click', function() {
            document.getElementById('result').innerHTML = '読み込み中...';

            fetch('https://存在しないURL.com/data')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    document.getElementById('result').innerHTML =
                        '<p style="color: green;">成功: データを取得しました</p>';
                })
                .catch(function(error) {
                    console.log('エラーが発生:', error);
                    document.getElementById('result').innerHTML =
                        '<p style="color: red;">データの取得に失敗しました</p>';
                });
        });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、まず「データを読み込む」ボタンをクリックしてみてください。正常にデータが取得され、緑色で成功メッセージが表示されます。

![スクリーンショット](/img/javascript/before_click-load-data.png)

![スクリーンショット](/img/javascript/after_click-load-data-success.png)

次に「エラーを発生させる」ボタンをクリックしてみてください。存在しないURLにアクセスしようとするため、エラーが発生し、赤色でエラーメッセージが表示されます。

![スクリーンショット](/img/javascript/after_click-load-error-failure.png)

開発者ツールのConsoleタブも確認してみてください。エラーの詳細な情報が表示されているはずです。

```bash
GET https://xn--url-r63bwd4eo962a98g.com/data net::ERR_NAME_NOT_RESOLVED

エラーが発生: TypeError: Failed to fetch
    at HTMLButtonElement.<anonymous> (display-data.html:39:9)
```

簡単にエラーについて説明すると、`fetch`メソッドはネットワーク通信を行うため、何らかの理由で通信が失敗した場合（例えば、URLが間違っている、サーバーがダウンしているなど）、`catch`ブロックが実行されます。

この`catch`ブロック内で、エラーの詳細をコンソールに出力し、ユーザーにはわかりやすいメッセージを表示しています。

こういった処理を考慮できていると、ユーザーは「何か問題が起きた」と理解でき、アプリケーションが壊れたわけではないと安心できます。

## async/awaitを使ったエラー処理

現在よく使われている書き方として、`async/await`と`try-catch`を組み合わせたエラー処理があります。

新しく`async-error.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>async/await でのエラー処理</title>
</head>
<body>
    <h1>async/await でのエラー処理</h1>
    <button id="loadUser">ユーザー情報を読み込む</button>
    <button id="loadInvalid">存在しないユーザーを読み込む</button>
    <div id="result"></div>

    <script>
        // async/awaitを使った関数
        async function loadUserData(userId) {
            try {
                document.getElementById('result').innerHTML = '読み込み中...';

                const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);

                if (!response.ok) {
                    throw new Error('ユーザーが見つかりません');
                }

                const user = await response.json();

                document.getElementById('result').innerHTML =
                    '<p style="color: green;">ユーザー名: ' + user.name + '</p>' +
                    '<p>メール: ' + user.email + '</p>';

            } catch (error) {
                console.log('エラー詳細:', error);
                document.getElementById('result').innerHTML =
                    '<p style="color: red;">エラー: ' + error.message + '</p>';
            }
        }

        document.getElementById('loadUser').addEventListener('click', function() {
            loadUserData(1); // 存在するユーザー
        });

        document.getElementById('loadInvalid').addEventListener('click', function() {
            loadUserData(999); // 存在しないユーザー
        });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、両方のボタンをクリックしてみてください。

「ユーザー情報を読み込む」ボタンでは正常にデータが表示され、「存在しないユーザーを読み込む」ボタンでは適切なエラーメッセージが表示されます。

**ユーザー情報を読み込む**ボタンをクリックしたときの結果:

![スクリーンショット](/img/javascript/async-await-success.png)

**存在しないユーザーを読み込む**ボタンをクリックしたときの結
果:
![スクリーンショット](/img/javascript/async-await-error.png)


## まとめ

本章では、APIエラーの適切な処理方法について学びました。以下のポイントを理解できたことと思います。

- `.catch()`や`try-catch`を使ってエラーを捕捉できる
- `response.ok`をチェックしてサーバーエラーを検出する
- ユーザーには技術的な詳細ではなく、わかりやすいメッセージを表示する

適切なエラー処理により、ユーザーは安心してアプリケーションを使うことができるようになります。これで、APIを使った基本的なWebアプリケーション開発の知識が身につきました。
