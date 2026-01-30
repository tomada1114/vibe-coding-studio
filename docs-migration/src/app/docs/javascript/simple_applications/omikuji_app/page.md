---
title: おみくじアプリを作成してみよう
nextjs:
  metadata:
    title: おみくじアプリを作成してみよう
    description: ランダム機能を使ったシンプルなおみくじアプリケーションを作成し、Math.randomの活用方法と配列からのランダム選択の実装方法を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `Math.random()`を使ったランダム機能の実装方法を理解する
- 配列からランダムに要素を選択する方法を習得する
- ユーザーが繰り返し使えるシンプルなアプリケーションの作成方法を学ぶ
- `DOM`操作を使った結果表示の切り替え方法を理解する
- これまで学んだ`JavaScript`の知識を組み合わせた実用的なアプリの作成方法を習得する

## はじめに

これまで`DOM`操作、イベント処理、配列の操作などを学んできました。
今回は、それらの知識を活用してシンプルなおみくじアプリケーションを作ってみましょう。

おみくじアプリは、ランダム機能を使った分かりやすい例として最適です。
ボタンを押すと結果が表示されるというシンプルな仕組みですが、`Math.random()`の実用的な使い方を学ぶことができます。

このアプリを通して、配列からのランダム選択、`DOM`要素の内容変更、そして何度でも楽しめるアプリケーションの作り方を理解できるでしょう。

## `HTML`ファイルの準備

まずは、おみくじアプリの基本となる`HTML`ファイルを作成しましょう。
`VS Code`で新しいファイルを作成し、`omikuji-app.html`という名前で保存してください。

以下のコードを入力してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>おみくじアプリ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f0f8ff;
        }

        .container {
            max-width: 400px;
            margin: 0 auto;
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .result {
            font-size: 2.5em;
            font-weight: bold;
            color: #333;
            margin: 30px 0;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .message {
            font-size: 1.1em;
            color: #666;
            margin: 20px 0;
            min-height: 50px;
        }

        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2em;
            border-radius: 8px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎌 おみくじ 🎌</h1>

        <div class="result" id="result">
            ？
        </div>

        <div class="message" id="message">
            下のボタンを押しておみくじを引いてみよう！
        </div>

        <button id="drawButton">おみくじを引く</button>
    </div>

    <script>
        // JavaScriptコードをここに書いていきます
    </script>
</body>
</html>
```

この`HTML`ファイルには、おみくじアプリに必要な基本的な構造が含まれています。
結果を表示する領域、メッセージを表示する領域、そしておみくじを引くボタンがあります。

`CSS`も最小限ながら含まれているので、見た目も整って表示されます。

![スクリーンショット](/img/javascript/omikuji_first_view.png)

シンプルな構造なので、`JavaScript`の機能に集中して学習を進めることができます。

それでは、アプリを作りながら JavaScript のコードを書いていきましょう。

## おみくじの結果データの準備

次に、おみくじの結果となるデータを準備しましょう。
`script`タグの中に以下のコードを追加してください。

```html
<script>
    // おみくじの結果データ
    const omikujiResults = [
        {
            result: "大吉",
            message: "とても良いことが起こりそうです！"
        },
        {
            result: "中吉",
            message: "良いことがありそうです。"
        },
        {
            result: "小吉",
            message: "小さな幸せが見つかりそうです。"
        },
        {
            result: "吉",
            message: "穏やかな一日になりそうです。"
        },
        {
            result: "末吉",
            message: "努力が実を結ぶ時です。"
        },
        {
            result: "凶",
            message: "今日は慎重に行動しましょう。"
        }
    ];

    // DOM要素の取得
    const result = document.getElementById('result');
    const message = document.getElementById('message');
    const drawButton = document.getElementById('drawButton');
</script>
```

おみくじの結果は配列で管理し、それぞれの結果にメッセージを組み合わせています。
オブジェクトを使って`result`（結果）と`message`（メッセージ）をセットにすることで、データを整理して管理できます。

また、よく使う`DOM`要素も変数に保存して、後で簡単にアクセスできるようにしています。

## ランダム選択機能の実装

おみくじの核となるランダム選択機能を実装しましょう。
以下のコードを追加してください。

```html
<script>
    // おみくじの結果データ
    const omikujiResults = [
        {
            result: "大吉",
            message: "とても良いことが起こりそうです！"
        },
        {
            result: "中吉",
            message: "良いことがありそうです。"
        },
        {
            result: "小吉",
            message: "小さな幸せが見つかりそうです。"
        },
        {
            result: "吉",
            message: "穏やかな一日になりそうです。"
        },
        {
            result: "末吉",
            message: "努力が実を結ぶ時です。"
        },
        {
            result: "凶",
            message: "今日は慎重に行動しましょう。"
        }
    ];

    // DOM要素の取得
    const result = document.getElementById('result');
    const message = document.getElementById('message');
    const drawButton = document.getElementById('drawButton');

    // ここから追加
    // ランダムにおみくじの結果を選ぶ関数
    function getRandomResult() {
        const randomIndex = Math.floor(Math.random() * omikujiResults.length);
        return omikujiResults[randomIndex];
    }
    // 追加ここまで
</script>
```

`getRandomResult`関数では、`Math.random()`を使って0から1未満のランダムな数値を生成し、それに配列の長さを掛けて`Math.floor()`で整数にしています。

この計算により、配列のインデックス範囲内のランダムな整数が得られ、その位置にある結果を取得できます。
たとえば配列に6個の要素がある場合、0から5までのランダムな整数が生成され、それに対応する結果が選ばれます。

この関数を、後ほどおみくじを引く処理で使用します。

## おみくじを引く機能の実装

では、おみくじを引いて結果を表示する機能を実装しましょう。

先ほどは「ランダムにおみくじの結果を選ぶ関数」を作成しましたが、次はその結果を画面に表示するための関数を作ります。

以下のコードを追加してください。

```html
<script>
    // おみくじの結果データ
    const omikujiResults = [
        {
            result: "大吉",
            message: "とても良いことが起こりそうです！"
        },
        {
            result: "中吉",
            message: "良いことがありそうです。"
        },
        {
            result: "小吉",
            message: "小さな幸せが見つかりそうです。"
        },
        {
            result: "吉",
            message: "穏やかな一日になりそうです。"
        },
        {
            result: "末吉",
            message: "努力が実を結ぶ時です。"
        },
        {
            result: "凶",
            message: "今日は慎重に行動しましょう。"
        }
    ];

    // DOM要素の取得
    const result = document.getElementById('result');
    const message = document.getElementById('message');
    const drawButton = document.getElementById('drawButton');

    // ランダムにおみくじの結果を選ぶ関数
    function getRandomResult() {
        const randomIndex = Math.floor(Math.random() * omikujiResults.length);
        return omikujiResults[randomIndex];
    }

    // ここから追加
    // おみくじを引く関数
    function drawOmikuji() {
        // ランダムな結果を取得
        const randomResult = getRandomResult();

        // 結果を画面に表示
        result.textContent = randomResult.result;
        message.textContent = randomResult.message;

        // ボタンのテキストを変更
        drawButton.textContent = 'もう一度引く';
    }
    // 追加ここまで
</script>
```

`drawOmikuji`関数は、おみくじアプリの中心となる機能です。
この関数では、まず`getRandomResult`関数を呼び出してランダムな結果を取得します。

次に、`textContent`プロパティを使って、取得した結果とメッセージを画面に表示します。
`DOM`操作の基本的なパターンで、要素の内容を動的に変更しています。

最後に、ボタンのテキストを「もう一度引く」に変更することで、ユーザーが続けて楽しめるようにしています。

ただ、まだこの関数は実行される仕組みがありません。

そのため、次にイベントリスナーを設定して、ボタンがクリックされた時にこの関数が実行されるようにします。

## イベントリスナーの設定

最後に、ボタンのクリックイベントを設定して、アプリを完成させましょう。
以下のコードを追加してください。

```html
<script>
    // おみくじの結果データ
    const omikujiResults = [
        {
            result: "大吉",
            message: "とても良いことが起こりそうです！"
        },
        {
            result: "中吉",
            message: "良いことがありそうです。"
        },
        {
            result: "小吉",
            message: "小さな幸せが見つかりそうです。"
        },
        {
            result: "吉",
            message: "穏やかな一日になりそうです。"
        },
        {
            result: "末吉",
            message: "努力が実を結ぶ時です。"
        },
        {
            result: "凶",
            message: "今日は慎重に行動しましょう。"
        }
    ];

    // DOM要素の取得
    const result = document.getElementById('result');
    const message = document.getElementById('message');
    const drawButton = document.getElementById('drawButton');

    // ランダムにおみくじの結果を選ぶ関数
    function getRandomResult() {
        const randomIndex = Math.floor(Math.random() * omikujiResults.length);
        return omikujiResults[randomIndex];
    }

    // おみくじを引く関数
    function drawOmikuji() {
        // ランダムな結果を取得
        const randomResult = getRandomResult();

        // 結果を画面に表示
        result.textContent = randomResult.result;
        message.textContent = randomResult.message;

        // ボタンのテキストを変更
        drawButton.textContent = 'もう一度引く';
    }

    // ここから追加
    // ボタンのクリックイベント
    drawButton.addEventListener('click', drawOmikuji);
    // 追加ここまで
</script>
```

イベントリスナーの設定により、ボタンがクリックされた時に`drawOmikuji`関数が実行されます。
これで、おみくじアプリの基本的な機能が完成しました。

## 動作確認

`HTML`ファイルを保存したら、ブラウザで開いて動作を確認してみましょう。

「おみくじを引く」ボタンをクリックすると、結果がランダムに表示されることを確認してください。

大吉、中吉、小吉、吉、末吉、凶のいずれかが表示され、それぞれに対応したメッセージも表示されます。

![スクリーンショット](/img/javascript/omikuji_app_result.png)

何度かボタンをクリックして、異なる結果が表示されることを確認してください。
毎回ランダムに選ばれるので、同じ結果が続くこともあれば、違う結果が出ることもあります。

ボタンのテキストが「もう一度引く」に変わることも確認しましょう。

ランダム性があるため、何度でも楽しめるアプリケーションになっています。

## 今回使った JavaScript の機能

それなりに長いコードになりましたが、今回のアプリで使用した`JavaScript`の機能を振り返ってみましょう。

- 配列: おみくじの結果を管理するために使用
- オブジェクト: 結果とメッセージをセットで管理するために使用
- 関数: ランダム選択やおみくじを引く処理を分割して実装
- `Math.random()`: ランダムな数値を生成するために使用
- `Math.floor()`: 小数点以下を切り捨てて整数に変換するために使用
- `DOM`操作: `textContent`プロパティを使って要素の内容を変更
- イベントリスナー: ボタンのクリックイベントを処理するために使用
- `addEventListener`: イベントリスナーを設定するために使用
- `getElementById`: `DOM`要素を取得するために使用

いかがでしたでしょうか？

JavaScriptの基本的な機能を組み合わせて、シンプルなおみくじアプリを作成することができました。

実際のWebアプリケーションでも、ランダム要素だったり、ユーザー操作に応じて結果を表示する機能はよく使われます。

特に、初心者の方にとっては関門となる DOM操作やイベント処理を学ぶ良い機会となったと思います。

## まとめ

本章では、ランダム機能を使ったシンプルなおみくじアプリケーションを作成しました。
学んだ内容は以下の通りです。

- `Math.random()`と`Math.floor()`を組み合わせた配列からのランダム選択の実装方法を理解できました
- オブジェクトを使ったデータの整理と管理方法を習得しました
- `DOM`要素の`textContent`プロパティを使った内容変更の方法を学びました
- 関数を使った処理の分割と、イベントリスナーによる処理の実行方法を理解しました
- ユーザーが繰り返し使える実用的なアプリケーションの作成方法を習得しました

このおみくじアプリはシンプルですが、ランダム機能の基本的な使い方を理解するのに最適です。
`Math.random()`を使った選択処理は、ゲームや抽選システムなど、様々なアプリケーションで活用できる重要な技術です。
