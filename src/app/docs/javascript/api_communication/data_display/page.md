---
title: 取得したデータを画面に表示してみよう
nextjs:
  metadata:
    title: 取得したデータを画面に表示してみよう
    description: fetchで取得したAPIデータをHTMLページに表示する基本的な方法を習得し、動的なWebページ作成の基礎を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- fetchで取得したデータを画面に表示する基本的な方法を理解する
- DOM操作とAPIデータを組み合わせる方法を習得する
- ユーザーに分かりやすい形でデータを表示する方法を学ぶ

## はじめに

これまでの章では、fetchでデータを取得してコンソールで確認する方法を学びました。しかし、実際のWebアプリケーションでは、取得したデータをユーザーが見やすい形で画面に表示する必要があります。

本章では、APIから取得したデータをHTMLページに表示する基本的な方法を学んでいきましょう。DOM操作の知識と組み合わせることで、動的で魅力的なWebページを作ることができるようになります。

## 最初のデータ表示

まずは、APIから取得したデータを画面に表示する最も基本的な例から始めましょう。

VS Codeで`display-data.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データを画面に表示</title>
</head>
<body>
    <h1>ユーザー情報の表示</h1>
    <button id="loadData">ユーザー情報を読み込む</button>
    <div id="result"></div>

    <script>
        document.getElementById('loadData').addEventListener('click', function() {
            // 読み込み中の表示
            document.getElementById('result').innerHTML = '読み込み中...';

            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(function(response) {
                    return response.json();
                })
                .then(function(user) {
                    // 取得したデータを画面に表示
                    document.getElementById('result').innerHTML =
                        '<h2>' + user.name + '</h2>' +
                        '<p>メール: ' + user.email + '</p>';
                })
                .catch(function(error) {
                    document.getElementById('result').innerHTML =
                        '<p style="color: red;">データの取得に失敗しました</p>';
                });
        });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、「ユーザー情報を読み込む」ボタンをクリックしてみてください。

![APIデータを画面に表示した結果](/img/javascript/display-user-data.png)

ボタンをクリックすると、まず「読み込み中...」と表示され、その後APIから取得したユーザーの名前とメールアドレスが表示されます。

これまで学んできた「fetch」「JSON」「DOM操作」を組み合わせて、APIから取得したデータを画面に表示する基本的な流れが理解できたと思います。


### コードの解説

では、このコードの重要なポイントを確認していきましょう。

まず、ボタンがクリックされたときに`document.getElementById('result').innerHTML = '読み込み中...';`でユーザーに処理中であることを知らせています。これは、データ取得に時間がかかる場合でも、ユーザーが「何も起きていない」と思わないようにするための配慮です。

次に、fetchでデータを取得した後、`.then()`の中で`innerHTML`を使って取得したデータを画面に表示しています。`user.name`と`user.email`というように、JSONデータの各プロパティにアクセスして、HTMLとして組み立てています。

また、`.catch()`でエラーが発生した場合の処理も用意しています。これにより、ネットワークエラーなどが発生しても、ユーザーに適切なメッセージを表示できます。

## 複数のデータを一覧で表示

今度は、複数のデータを取得して一覧で表示してみましょう。新しく`display-list.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>投稿一覧の表示</title>
    <style>
        .post {
            border: 1px solid #ccc;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>投稿一覧の表示</h1>
    <button id="loadPosts">投稿を読み込む</button>
    <div id="posts"></div>

    <script>
        document.getElementById('loadPosts').addEventListener('click', function() {
            document.getElementById('posts').innerHTML = '読み込み中...';

            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(function(response) {
                    return response.json();
                })
                .then(function(posts) {
                    let html = '';

                    // 最初の3件だけを表示
                    for (let i = 0; i < 3; i++) {
                        html += '<div class="post">';
                        html += '<h3>' + posts[i].title + '</h3>';
                        html += '<p>' + posts[i].body + '</p>';
                        html += '</div>';
                    }

                    document.getElementById('posts').innerHTML = html;
                })
                .catch(function(error) {
                    document.getElementById('posts').innerHTML =
                        '<p style="color: red;">投稿の取得に失敗しました</p>';
                });
        });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、「投稿を読み込む」ボタンをクリックしてみてください。

![複数の投稿データを一覧表示した結果](/img/javascript/display-posts-list.png)

3つの投稿がそれぞれ枠で囲まれて表示されます。

以前のレッスンでも似たようなコードを書きましたが、今回は複数のデータを取得して一覧表示する方法に焦点を当てています。

## 複数データ表示のポイント

複数のデータを表示する場合の重要なポイントを確認しましょう。

まず、APIから取得されるデータは配列形式になっています。そのため、`for`文を使って一つひとつの投稿を処理しています。

次に、`html`という変数を用意して、そこにHTMLの文字列を少しずつ追加していく方法を使っています。最初の3件だけを表示するため、`for (let i = 0; i < 3; i++)`というループを使用しています。

最後に、完成したHTML文字列を一度に`innerHTML`で設定しています。この方法により、画面の更新回数を最小限に抑えることができます。

## より実用的な表示例

最後に、取得したデータをより見やすく表示する例を見てみましょう。新しく`display-formatted.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>見やすいデータ表示</title>
    <style>
        .user-card {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
            max-width: 400px;
            margin: 20px 0;
        }
        .user-name { color: #333; font-size: 24px; margin-bottom: 10px; }
        .user-info { color: #666; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>ユーザー情報カード</h1>
    <button id="loadUser">ユーザー情報を読み込む</button>
    <div id="userCard"></div>

    <script>
        document.getElementById('loadUser').addEventListener('click', function() {
            document.getElementById('userCard').innerHTML = '読み込み中...';

            fetch('https://jsonplaceholder.typicode.com/users/2')
                .then(function(response) {
                    return response.json();
                })
                .then(function(user) {
                    document.getElementById('userCard').innerHTML =
                        '<div class="user-card">' +
                        '<div class="user-name">' + user.name + '</div>' +
                        '<div class="user-info">メール: ' + user.email + '</div>' +
                        '<div class="user-info">電話: ' + user.phone + '</div>' +
                        '<div class="user-info">会社: ' + user.company.name + '</div>' +
                        '</div>';
                })
                .catch(function(error) {
                    document.getElementById('userCard').innerHTML =
                        '<p style="color: red;">ユーザー情報の取得に失敗しました</p>';
                });
        });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、「ユーザー情報を読み込む」ボタンをクリックしてみてください。

![スタイルを適用したユーザーカード表示](/img/javascript/display-user-card.png)

CSSスタイルを適用することで、データがより見やすいカード形式で表示されます。

（カード形式とは Web デザインでよく使われる、情報をボックス状にまとめて表示するスタイルのことです。）

この例では、`user.company.name`のように、オブジェクトの中にあるオブジェクトのプロパティにもアクセスしています。

APIから取得したJSONデータは、このように階層構造を持つことが多いので、必要なデータを適切に取り出すことが重要です。

## まとめ

本章では、fetchで取得したデータを画面に表示する方法について学びました。以下のポイントを理解できたことと思います。

- `innerHTML`を使ってAPIデータを画面に表示できる
- 読み込み中やエラー時の表示でユーザー体験を向上させる
- 複数のデータは`for`文を使って一覧表示できる
- CSSと組み合わせることで見やすいデータ表示が可能

これで、APIから取得したデータを魅力的な形でユーザーに提示できるようになりました。次の章では、APIでエラーが発生した場合の適切な処理方法について学んでいきましょう。
