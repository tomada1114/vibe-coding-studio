---
title: setTimeoutで時間差処理を体験してみよう
nextjs:
  metadata:
    title: setTimeoutで時間差処理を体験してみよう
    description: JavaScriptのsetTimeoutを使って時間差で実行される処理を体験し、非同期処理の基本的な書き方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- `setTimeout`の基本的な使い方を理解する
- 時間を指定して処理を遅らせる方法を習得する
- コールバック関数の概念を学ぶ
- タイマーをキャンセルする方法を理解する

## はじめに

前回は同期処理と非同期処理の違いについて学びました。今回は、実際に非同期処理を体験してみましょう。

JavaScriptで最もシンプルな非同期処理の一つが`setTimeout`です。これは「○秒後に何かの処理を実行する」という機能を提供します。まるでキッチンタイマーのように、指定した時間が経過したら処理が動き出します。

例えば、「3秒後にメッセージを表示する」「5秒後に画面の色を変える」といったことが簡単にできるようになります。これまで書いてきたコードは上から下へ順番に実行されていましたが、`setTimeout`を使うことで「後で実行される処理」を作ることができます。

## setTimeoutの基本的な使い方

`setTimeout`は、指定した時間（ミリ秒）が経過した後に、指定した処理を一度だけ実行する関数です。まずは基本的な使い方を見てみましょう。

VS Codeで`timeout-basic.html`というファイルを作成し、以下のコードを記述してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setTimeoutの基本</title>
</head>
<body>
    <h1>setTimeoutの基本的な使い方</h1>

    <script>
        console.log("すぐに表示されるメッセージ");

        setTimeout(function() {
            console.log("3秒後に表示されるメッセージ");
        }, 3000);

        console.log("これもすぐに表示されるメッセージ");
    </script>
</body>
</html>
```

このファイルをブラウザで開き、開発者ツールのConsoleタブを確認してみてください。

最初に「すぐに表示されるメッセージ」と「これもすぐに表示されるメッセージ」が表示され、3秒後に「3秒後に表示されるメッセージ」が表示されます。

`setTimeout`の書き方は以下のようになっています。

```javascript
setTimeout(実行したい処理, 待機時間);
```

#### 実行したい処理
`function() { ... }`の形で書きます

#### 待機時間
ミリ秒で指定します（1000ミリ秒 = 1秒）

この例では、3000ミリ秒（3秒）後に`console.log`が実行されるように設定しています。

## 身近な例で理解してみよう

`setTimeout`をもう少し身近な例で理解してみましょう。デジタル時計のようなものを作ってみます。

新しく`digital-clock.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>デジタル時計風</title>
</head>
<body>
    <h1>現在時刻表示</h1>
    <p id="time-display">時刻が表示されます</p>

    <script>
        console.log("時計を開始します");

        // 現在時刻を取得して表示する関数
        function showCurrentTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();

            document.getElementById('time-display').textContent = timeString;
            console.log("現在時刻: " + timeString);
        }

        // すぐに1回表示
        showCurrentTime();

        // 3秒後にもう一度表示
        setTimeout(function() {
            showCurrentTime();
            console.log("3秒後の時刻を表示しました");
        }, 3000);
    </script>
</body>
</html>
```

このコードを実行すると、最初に現在時刻が表示され、3秒後に時刻が更新されます。`setTimeout`を使うことで、「しばらく待ってから何かを実行する」という処理が簡単に書けることがわかるでしょう。

## コールバック関数とは何か

ここで重要な概念が**コールバック関数**です。`setTimeout`の最初の引数に渡している`function() { ... }`の部分がコールバック関数です。

コールバック関数とは、「後で呼び出される関数」のことです。`setTimeout`の場合、指定した時間が経過したタイミングで、このコールバック関数が呼び出されます。

コールバック関数は、通常の関数と同じように書くこともできます。次の例を見てみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>コールバック関数の例</title>
</head>
<body>
    <h1>コールバック関数の書き方</h1>

    <script>
        // 関数を先に定義
        function sayHello() {
            console.log("こんにちは！2秒経ちました");
        }

        console.log("タイマーを開始します");

        // 定義した関数をコールバックとして渡す
        setTimeout(sayHello, 2000);

        console.log("他の処理を続けます");
    </script>
</body>
</html>
```

この書き方では、`sayHello`という関数を先に定義し、それを`setTimeout`のコールバック関数として渡しています。関数名の後に`()`を付けないことに注意してください。`()`を付けると関数がすぐに実行されてしまいます。

## 複数のタイマーを使ってみよう

`setTimeout`は複数同時に使うこともできます。それぞれが独立して動作し、指定した時間が経過したタイミングで実行されます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>複数のタイマー</title>
</head>
<body>
    <h1>複数のタイマーの例</h1>

    <script>
        console.log("開始: 複数のタイマーを設定します");

        setTimeout(function() {
            console.log("1秒経過しました");
        }, 1000);

        setTimeout(function() {
            console.log("2秒経過しました");
        }, 2000);

        setTimeout(function() {
            console.log("3秒経過しました");
        }, 3000);

        console.log("タイマー設定完了: 他の処理を続けます");
    </script>
</body>
</html>
```

このコードを実行すると、1秒ごとにメッセージが表示されることが確認できます。それぞれのタイマーが独立して動作しているため、このような動作が可能になります。

## タイマーをキャンセルする方法

設定したタイマーは、実行される前であればキャンセルすることができます。`setTimeout`は実行すると**タイマーID**という番号を返します。この番号を`clearTimeout`という関数に渡すことで、タイマーをキャンセルできます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タイマーのキャンセル</title>
</head>
<body>
    <h1>タイマーのキャンセル例</h1>

    <script>
        console.log("5秒後に実行されるタイマーを設定します");

        // タイマーを設定してIDを保存
        const timerId = setTimeout(function() {
            console.log("この文章は表示されません");
        }, 5000);

        console.log("タイマーID: " + timerId);

        // 2秒後にタイマーをキャンセル
        setTimeout(function() {
            clearTimeout(timerId);
            console.log("タイマーをキャンセルしました");
        }, 2000);
    </script>
</body>
</html>
```

このコードでは、5秒後に実行される予定のタイマーを2秒後にキャンセルしています。そのため、最初のタイマーの処理は実行されません。

## 実用的な例を作ってみよう

最後に、`setTimeout`を使った実用的な例を作ってみましょう。ボタンをクリックした後、カウントダウンを表示するプログラムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>カウントダウン</title>
</head>
<body>
    <h1>カウントダウンタイマー</h1>
    <button onclick="startCountdown()">カウントダウン開始</button>
    <p id="countdown">ここにカウントダウンが表示されます</p>

    <script>
        function startCountdown() {
            const display = document.getElementById('countdown');

            display.textContent = "3";

            setTimeout(function() {
                display.textContent = "2";
            }, 1000);

            setTimeout(function() {
                display.textContent = "1";
            }, 2000);

            setTimeout(function() {
                display.textContent = "時間です！";
            }, 3000);
        }
    </script>
</body>
</html>
```

このプログラムでは、ボタンをクリックすると3秒間のカウントダウンが始まります。1秒ごとに数字が減っていき、最後に「時間です！」と表示されます。

![スクリーンショット](/img/javascript/settimeout_example_before.png)

![スクリーンショット](/img/javascript/settimeout_example_after_1s.png)

![スクリーンショット](/img/javascript/settimeout_example_after_complete.png)

ボタンを何度クリックしても動作することを確認してみてください。`setTimeout`を使うことで、このような時間差のある処理が簡単に作れることがわかるでしょう。

たとえば React や Vue.js などのフレームワークでも、`setTimeout`はよく使われます。例えば、ユーザーがボタンをクリックした後にアニメーションを少し待ってから開始する場合などです。

## まとめ

本章では、`setTimeout`を使った時間差処理について学習しました。今回学んだ内容は以下の通りです。

- `setTimeout`を使うと指定した時間後に処理を実行できる
- 時間はミリ秒で指定し、1000ミリ秒が1秒になる
- コールバック関数として実行したい処理を記述する
- 複数のタイマーを同時に使うことができる
- `clearTimeout`を使ってタイマーをキャンセルできる

`setTimeout`は非同期処理の入門として最適な機能です。「後で実行される処理」という概念に慣れることで、より複雑な非同期処理も理解しやすくなります。次回は、さらに高度な非同期処理の仕組みについて学んでいきましょう。
