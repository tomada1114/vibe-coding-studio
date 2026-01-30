---
title: ボタンのクリックイベントを処理してみよう
nextjs:
  metadata:
    title: ボタンのクリックイベントを処理してみよう
    description: JavaScriptでボタンのクリックイベントを処理する方法を学びます。addEventListenerの基本的な使い方とイベントオブジェクトの活用について習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `addEventListener`でイベントリスナーを登録する方法を理解する
- クリックイベントの基本的な処理を学ぶ
- イベントオブジェクトの活用方法を習得する
- 複数のボタンにイベントを設定する方法を学ぶ

## はじめに

前回の章では、要素を取得してテキストを変更する方法を学びました。しかし、ページが読み込まれた瞬間に変更が実行されるのではなく、ユーザーがボタンをクリックした時に変更したいことの方が多いでしょう。

今回は、ボタンのクリックを検知して、その時に特定の処理を実行する方法を学んでいきましょう。

## HTMLファイルを準備しよう

VS Codeで`click_event.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>クリックイベントの練習</title>
</head>
<body>
    <h1 id="title">クリックしてください</h1>
    <p>ボタンをクリックして動作を確認しましょう。</p>

    <button id="hello-btn">挨拶する</button>
    <button id="color-btn">色を変更</button>
    <button id="count-btn">カウンター: 0</button>

    <script>
        // ここにJavaScriptを書いていきます
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてください。3つのボタンが表示されますが、まだクリックしても何も起こりません。

![スクリーンショット](/img/javascript/three-buttons-click-event.png)

## addEventListenerの基本的な使い方

ボタンのクリックを検知するには、`addEventListener`メソッドを使います。このメソッドは、特定のイベント（クリック、キー入力など）が発生した時に実行する処理を登録します。

`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // 挨拶ボタンの処理
    const helloButton = document.getElementById('hello-btn');

    helloButton.addEventListener('click', function() {
        alert('こんにちは！');
        console.log('挨拶ボタンがクリックされました');
    });
</script>
```

ブラウザを更新して「挨拶する」ボタンをクリックしてみてください。アラート（警告ダイアログ）が表示され、「こんにちは！」というメッセージが出るはずです。コンソールにもメッセージが出力されます。

![スクリーンショット](/img/javascript/hello-button-click-event.png)

（お使いのブラウザによって多少見た目は異なるかもしれませんが、基本的な動作は同じです。）

`addEventListener`の基本的な書き方は以下の通りです。

```javascript
要素.addEventListener('イベント名', 実行する関数);
```

## 複数のイベントリスナーを追加しよう

他のボタンにもイベントリスナーを追加してみましょう。

```html
<script>
    // 挨拶ボタンの処理
    const helloButton = document.getElementById('hello-btn');
    helloButton.addEventListener('click', function() {
        alert('こんにちは！');
        console.log('挨拶ボタンがクリックされました');
    });

    // --- 色変更ボタンの処理を追加 ---
    const colorButton = document.getElementById('color-btn');
    const titleElement = document.getElementById('title');

    colorButton.addEventListener('click', function() {
        titleElement.style.color = 'blue';
        titleElement.textContent = '色が変更されました！';
        console.log('色変更ボタンがクリックされました');
    });
    // --- 追加終了 ---
</script>
```

ブラウザを更新して「色を変更」ボタンをクリックしてみてください。タイトルの文字が青色になり、テキストも変更されるはずです。

![スクリーンショット](/img/javascript/color-button-click-event.png)

## カウンター機能を作ってみよう

最後のボタンで、クリックするたびに数字が増えるカウンター機能を作ってみましょう。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- カウンターボタンの処理を追加 ---
    const countButton = document.getElementById('count-btn');
    let count = 0; // カウンターの値を保存する変数

    countButton.addEventListener('click', function() {
        count = count + 1; // または count++
        countButton.textContent = 'カウンター: ' + count;
        console.log('現在のカウント:', count);
    });
    // --- 追加終了 ---
</script>
```

ブラウザを更新して「カウンター: 0」ボタンを何回かクリックしてみてください。クリックするたびに数字が1ずつ増えていくはずです。

![スクリーンショット](/img/javascript/counter-button-click-event.png)

ここでは、`let count = 0;`でカウンターの値を保存する変数を作成しています。ボタンがクリックされるたびに、この変数の値を1増やして、ボタンのテキストを更新しています。

こういった考え方は、React や Vue.js などのフレームワークでもよく使われます。変数を使って状態を管理し、ユーザーの操作に応じて表示を更新するという基本的なパターンです。

## イベントオブジェクトを活用しよう

イベントが発生した時、JavaScriptは**イベントオブジェクト**という情報を渡してくれます。このオブジェクトには、どのボタンがクリックされたかなどの詳細な情報が含まれています。

以下のコードを追加して、イベントオブジェクトを確認してみましょう。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- イベントオブジェクトの確認 ---
    colorButton.addEventListener('click', function(event) {
        console.log('イベントオブジェクト:', event);
        console.log('クリックされた要素:', event.target);
        console.log('イベントの種類:', event.type);
    });
    // --- 追加終了 ---
</script>
```

ブラウザを更新して「色を変更」ボタンをクリックし、コンソールを確認してください。以下のような出力が表示されます。

```
イベントオブジェクト: MouseEvent {isTrusted: true, screenX: 100, screenY: 200, ...}
クリックされた要素: <button id="color-btn">色を変更</button>
イベントの種類: click
```

イベントオブジェクトの`target`プロパティは、実際にクリックされた要素を表します。これは、複数のボタンで同じ処理を共有したい時などに便利です。

## アロー関数でイベントリスナーを書いてみよう

これまでは通常の`function`を使いましたが、アロー関数を使ってより短く書くこともできます。

```html
<script>
    // 前のコードに加えて、別の書き方の例

    // --- アロー関数での書き方 ---
    helloButton.addEventListener('click', () => {
        console.log('アロー関数でのイベント処理');
    });
    // --- 追加終了 ---
</script>
```

このように、`function()`の代わりに`() =>`を使うことができます。どちらの書き方を使っても結果は同じです。

## まとめ

本章では、ボタンのクリックイベントの処理について学習しました。今回学んだ内容は以下の通りです。

- `addEventListener`でイベントリスナーを登録できる
- クリックイベントで動的な処理を実行できる
- イベントオブジェクトから詳細な情報を取得できる
- 変数を使ってイベント間で値を保持できる

これらの基本を使えば、ユーザーの操作に応じて様々な処理を実行するインタラクティブなWebページを作ることができます。次の章では、フォームの入力値を取得する方法を学んでいきましょう。
