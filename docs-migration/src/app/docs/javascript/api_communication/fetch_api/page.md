---
title: fetchを使ってデータを取得してみよう
nextjs:
  metadata:
    title: fetchを使ってデータを取得してみよう
    description: JavaScript のfetch APIを使ってインターネット上のデータを取得する方法を学び、Webアプリケーションでの情報表示に活用する基礎技術を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- fetch APIとは何かを理解する
- インターネット上からデータを取得する基本的な方法を習得する
- 非同期処理としてのfetchの動作を理解する
- HTMLページでfetchを使った実際のコード例を体験する
- ブラウザの開発者ツールでAPIの動作を確認する方法を学ぶ

## はじめに

これまでの章では、JavaScriptを使ってHTMLページの中で動くプログラムを作ってきました。しかし、現在のWebアプリケーションでは、ページに表示する情報をインターネット上の別の場所から取得することがとても一般的です。

例えば、天気予報アプリでは気象情報を、ニュースアプリでは最新のニュース記事を、SNSアプリでは友人の投稿を、それぞれインターネット上のサーバーから取得して表示しています。

このように**インターネット上の別の場所から情報を取得する**機能を実現するのが、JavaScriptの`fetch`という機能です。`fetch`を使うことで、皆さんのWebアプリケーションも動的で魅力的な情報を表示できるようになります。

## fetch APIとは何か

**fetch API**は、JavaScriptでインターネット上のデータを取得するための機能です。「API」という言葉が出てきましたが、これは「Application Programming Interface」の略で、簡単に言うと**プログラム同士が情報をやり取りするための仕組み**のことです。

fetch APIを使うと、皆さんのWebページから他のサーバーに「データをください」というリクエスト（要求）を送ることができます。そして、サーバーから返ってきたデータを受け取って、ページに表示することができるのです。

この仕組みは**HTTP通信**と呼ばれる方法で動いています。普段皆さんがWebブラウザでページを見るときも、実はこのHTTP通信が行われているのです。

## 最初のfetch体験

それでは、実際にfetchを使ってデータを取得してみましょう。まずは簡単な例から始めます。

VS Codeで新しいフォルダを作成し、`fetch-example.html`というファイルを作成してください。そして、以下のコードを入力してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fetch の練習</title>
</head>
<body>
    <h1>データ取得の練習</h1>
    <button id="getData">データを取得する</button>
    <div id="result"></div>

    <script>
        document.getElementById('getData').addEventListener('click', function() {
            console.log('ボタンがクリックされました');

            // fetch を使ってデータを取得
            fetch('https://jsonplaceholder.typicode.com/posts/1')
                .then(function(response) {
                    console.log('データを受信しました:', response);
                    return response.json();
                })
                .then(function(data) {
                    console.log('取得したデータ:', data);
                    document.getElementById('result').innerHTML =
                        '<h2>' + data.title + '</h2><p>' + data.body + '</p>';
                });
        });
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてください。そして、「データを取得する」ボタンをクリックしてみましょう。

![fetchでデータを取得してページに表示した結果_前](/img/javascript/fetch-first-example_before.png)

![fetchでデータを取得してページに表示した結果_後](/img/javascript/fetch-first-example_after.png)

何かテキストが表示されたでしょうか。また、ブラウザの開発者ツールを開いて、Consoleタブを確認してみてください。そこにもメッセージが表示されているはずです。

```bash
ボタンがクリックされました
データを受信しました: Response
取得したデータ: Object
```

先ほどのコードがどのように動いているのか、詳しく見ていきましょう。

### データ取得先について

まず、`https://jsonplaceholder.typicode.com/posts/1`というURLについて説明します。

これは**テスト用のAPI**で、プログラミングの練習に自由に使えるサンプルデータを提供してくれています。

本来、API というのは自分たちが用意したり、他のサービスが提供しているものを利用したりしますが、このURLは特に学習用に作られたものです。

このURLにアクセスすると、ブログの投稿のような形でタイトルと本文を含むデータが返ってきます。実際のWebサービスでは、天気情報やニュース記事、商品情報などのデータが、同じような仕組みで提供されています。

### fetchの基本的な使い方

fetch APIの基本的な使い方は以下のような形です。

```javascript
fetch('データを取得したいURL')
    .then(function(response) {
        // サーバーからの応答を処理
        return response.json();
    })
    .then(function(data) {
        // 取得したデータを使って何かをする
        console.log(data);
    });
```

これまで学んできた `Promise` の使い方と似ていますが、fetchは特にHTTP通信、つまりインターネット上のデータを取得するための特別な機能です。

このコードの流れは以下のようになっています。

1. `fetch()`でサーバーにデータの要求を送る
2. 最初の`.then()`でサーバーからの返事を受け取る
3. `response.json()`でデータを扱いやすい形に変換する
4. 2番目の`.then()`で変換されたデータを受け取って使う

このように、`then()`を使って、非同期でデータを取得し、取得したらさらに処理を続けることができます。

### なぜ.then()を使うのか

ここで「なぜ`.then()`を使うのか」という疑問が出てくるかもしれません。これは、fetchが**非同期処理**だからです。

インターネット上からデータを取得するには時間がかかります。サーバーが遠い場所にあったり、データが大きかったりすると、数秒かかることもあります。この間、ページが完全に止まってしまったら、ユーザーは何もできなくなってしまいます。

そこで、fetchは「データを取得する作業を開始したら、すぐに次の処理に進む」という動作をします。

そして、データが実際に取得できたときに`.then()`の中の処理が実行される仕組みになっているのです。

## エラーが起きた場合の対処

ここまでで、基本的なfetchの使い方を学びましたが、実際のWebアプリケーションでは、データ取得中にエラーが発生することもあります。

そのため、エラーに対処する方法も覚えておきましょう。

先ほどのHTMLファイルを以下のように修正してみてください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fetch の練習</title>
</head>
<body>
    <h1>データ取得の練習</h1>
    <button id="getData">データを取得する</button>
    <div id="result"></div>

    <script>
        document.getElementById('getData').addEventListener('click', function() {
            console.log('ボタンがクリックされました');

            // result エリアを一旦クリア
            document.getElementById('result').innerHTML = '読み込み中...';

            // fetch を使ってデータを取得
            fetch('https://jsonplaceholder.typicode.com/posts/1')
                .then(function(response) {
                    console.log('データを受信しました:', response);
                    return response.json();
                })
                .then(function(data) {
                    console.log('取得したデータ:', data);
                    document.getElementById('result').innerHTML =
                        '<h2>' + data.title + '</h2><p>' + data.body + '</p>';
                })
                .catch(function(error) {
                    console.log('エラーが発生しました:', error);
                    document.getElementById('result').innerHTML =
                        '<p style="color: red;">データの取得に失敗しました。</p>';
                });
        });
    </script>
</body>
</html>
```

このコードでは、以下の改善を行いました。

まず、データ取得を開始した時点で「読み込み中...」というメッセージを表示します。これにより、ユーザーは何かが処理されていることがわかります。

次に、`.catch()`というメソッドを追加しました。これは、fetchでエラーが発生した場合に実行される処理です。エラーが起きた時には、ユーザーにわかりやすいメッセージを表示するようにしています。

実際にエラーを起こしてみる方法は後のレッスンで詳しく学んでいきます。

もし、すぐに試してみたい場合は、`then()`の中で`return response.json();`の行をコメントアウトしてみてください。

```javascript
// return response.json();
```


そうすると、JSONに変換できないため、エラーが発生します。

![fetchでエラーが発生した場合の表示](/img/javascript/fetch-error-example.png)

コンソールにもエラーが表示されるはずです。

```bash
エラーが発生しました: TypeError: Cannot read properties of undefined (reading 'title')
```

## 複数のデータを取得してみよう

今度は、複数のデータを取得して一覧で表示してみましょう。新しく`fetch-list.html`というファイルを作成してください。

少し複雑なのですが、これまで学んだきた内容を活用して、複数の投稿データを取得して画面に表示するコードを書いてみます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>複数データの取得</title>
    <style>
        .post {
            border: 1px solid #ccc;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
        }
        .post h3 {
            color: #333;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <h1>投稿一覧の取得</h1>
    <button id="getPosts">投稿一覧を取得する</button>
    <div id="posts-container"></div>

    <script>
        document.getElementById('getPosts').addEventListener('click', function() {
            console.log('投稿一覧を取得開始');

            // コンテナをクリアして読み込み表示
            document.getElementById('posts-container').innerHTML = '読み込み中...';

            // 複数の投稿データを取得
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(function(response) {
                    console.log('投稿データを受信:', response);
                    return response.json();
                })
                .then(function(posts) {
                    console.log('取得した投稿数:', posts.length);

                    // コンテナをクリア
                    let container = document.getElementById('posts-container');
                    container.innerHTML = '';

                    // 最初の5件だけを表示
                    for (let i = 0; i < 5; i++) {
                        let post = posts[i];
                        let postElement = document.createElement('div');
                        postElement.className = 'post';
                        postElement.innerHTML =
                            '<h3>' + post.title + '</h3>' +
                            '<p>' + post.body + '</p>' +
                            '<small>投稿ID: ' + post.id + '</small>';
                        container.appendChild(postElement);
                    }
                })
                .catch(function(error) {
                    console.log('エラー:', error);
                    document.getElementById('posts-container').innerHTML =
                        '<p style="color: red;">データの取得に失敗しました。</p>';
                });
        });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、「投稿一覧を取得する」ボタンをクリックしてみてください。複数の投稿が一覧で表示されるはずです。

![複数のデータを取得して一覧表示した結果](/img/javascript/fetch-multiple-posts.png)

少し長いので、コードの内容を詳しく見ていきましょう。

### 配列として返ってくるデータ

`https://jsonplaceholder.typicode.com/posts`というURLでは、単一のデータではなく**配列**として複数のデータが返ってきます。

そのため、`posts.length`で件数を確認したり、`for`文を使って一つひとつの投稿を処理したりできます。

### DOM操作との組み合わせ

fetchで取得したデータを画面に表示するために、これまで学んだDOM操作を活用しています。

`document.createElement()`で新しい要素を作成し、`appendChild()`で画面に追加しています。

### 表示件数の制限

実際に取得できるデータは100件ありますが、画面が長くなりすぎないように最初の5件だけを表示するようにしています。

このように、取得したデータの一部だけを使うということもよくあります。

## ブラウザの開発者ツールで確認

fetchを使った処理ではインターネット上とのやり取りを行うので、ソースコード以外の情報も確認する必要があります。そこで、ブラウザの**開発者ツール**を使います。

**Networkタブ**では、実際にインターネット上でやり取りされた通信内容を確認できます。fetchでリクエストを送信すると、このタブに通信記録が表示されます。どのようなデータが送受信されたのかを詳しく見ることができます。

![開発者ツールのNetworkタブでfetch通信を確認](/img/javascript/fetch-network-tab.png)

Network タブを開いた状態で「投稿一覧を取得する」ボタンをクリックすると、どのようなリクエストが送られたか、どのようなレスポンスが返ってきたかを確認できます。

おそらく、左下に `posts` というリクエストが表示されるはずです。これをクリックすると、右側に詳細情報が表示されます。

ここでは、リクエストのURL、HTTPメソッド（GETやPOSTなど）、レスポンスのステータスコード（200 OKなど）、レスポンスヘッダー、実際のレスポンスボディなどを確認できます。
この情報を使うことで、fetchが正しく動作しているか、どのようなデータが返ってきているかを確認できます。

一気に多くの情報が表示されるので、最初は戸惑うかもしれませんが、慣れてくると非常に便利なツールです。

API を利用した処理で何かうまくいかないときは、まずこの開発者ツールの Network タブを確認して、リクエストやレスポンスに問題がないかをチェックしてみましょう。

## まとめ

本章では、fetchを使ってインターネット上からデータを取得する基本的な方法を学びました。以下のポイントを理解できたことと思います。

- fetchを使うとインターネット上のサーバーからデータを取得できる
- fetchは非同期処理のため、`.then()`を使って結果を受け取る
- エラー処理には`.catch()`を使用する
- 取得したデータはDOM操作と組み合わせて画面に表示できる
- 開発者ツールを使って通信状況を確認できる

fetchは現代のWebアプリケーション開発において必須の技術です。次の章では、取得したデータの形式であるJSONについて詳しく学んでいきましょう。
