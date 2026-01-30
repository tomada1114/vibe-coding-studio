---
title: CSSクラスを操作してスタイルを変更しよう
nextjs:
  metadata:
    title: CSSクラスを操作してスタイルを変更しよう
    description: JavaScriptでCSSクラスを操作してスタイルを変更する方法を学びます。classListプロパティを使ったクラスの追加・削除・切り替えとstyleプロパティでの直接変更について習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `classList`プロパティの基本的な使い方を理解する
- クラスの追加・削除・切り替え方法を学ぶ
- `style`プロパティでスタイルを直接変更する方法を習得する
- CSSとJavaScriptの連携方法を学ぶ

## はじめに

これまでは要素の内容を変更する方法を学んできましたが、Webページの見た目（スタイル）を動的に変更することもできます。

ボタンをクリックしたら背景色が変わったり、マウスを乗せると文字が大きくなったりする機能は、JavaScriptでCSSを操作することで実現されています。

今回は、CSSクラスを操作してスタイルを変更する方法を学んでいきましょう。

## HTMLファイルを準備しよう

VS Codeで`style_change.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSSクラスの操作</title>
    <style>
        .highlight {
            background-color: yellow;
            font-weight: bold;
            padding: 10px;
        }

        .large-text {
            font-size: 24px;
        }

        .hidden {
            display: none;
        }

        .box {
            width: 100px;
            height: 100px;
            background-color: lightblue;
            margin: 10px;
            border: 2px solid blue;
        }
    </style>
</head>
<body>
    <h1 id="title">CSSクラスの操作</h1>
    <p id="message">この文章のスタイルが変更されます。</p>

    <div id="color-box" class="box"></div>

    <button id="highlight-btn">ハイライト切り替え</button>
    <button id="size-btn">文字サイズ切り替え</button>
    <button id="hide-btn">表示/非表示切り替え</button>

    <script>
        // ここにJavaScriptを書いていきます
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてください。タイトル、段落、青い四角形、そして3つのボタンが表示されます。

![スクリーンショット](/img/javascript/css_class_manipulation.png)

現在のDOM構造では、青い四角形に`box`クラスが適用されています。

```html
<div id="color-box" class="box"></div>
```

## classListでクラスを追加してみよう

要素にCSSクラスを追加するには、`classList.add()`メソッドを使います。

`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // ハイライト切り替えボタンの処理
    const highlightButton = document.getElementById('highlight-btn');
    const messageElement = document.getElementById('message');

    highlightButton.addEventListener('click', function() {
        // highlightクラスを追加
        messageElement.classList.add('highlight');

        console.log('ハイライトクラスが追加されました');
        console.log('現在のクラス:', messageElement.className);
    });
</script>
```

ここでは、`highlight-btn`ボタンがクリックされたときに、段落要素に`highlight`クラスを追加しています。

ブラウザを更新して「ハイライト切り替え」ボタンをクリックしてみてください。段落の背景が黄色になり、文字が太字になるはずです。

![ハイライト後のスクリーンショット](/img/javascript/css_class_manipulation_highlight.png)

クラスが追加されると、DOM構造は以下のように変化します。

#### 追加前
```html
<p id="message">この文章のスタイルが変更されます。</p>
```

#### 追加後
```html
<p id="message" class="highlight">この文章のスタイルが変更されます。</p>
```

`classList.add()`で`highlight`クラスが追加され、CSSで定義されたスタイルが適用されます。

## classListでクラスを削除してみよう

追加したクラスを削除するには、`classList.remove()`メソッドを使います。

先ほどのコードを以下のように更新してください。

```html
<script>
    // ハイライト切り替えボタンの処理
    const highlightButton = document.getElementById('highlight-btn');
    const messageElement = document.getElementById('message');
    let isHighlighted = false; // ハイライト状態を記録

    highlightButton.addEventListener('click', function() {
        if (isHighlighted) {
            // ハイライトクラスを削除
            messageElement.classList.remove('highlight');
            isHighlighted = false;
            console.log('ハイライトクラスが削除されました');
        } else {
            // ハイライトクラスを追加
            messageElement.classList.add('highlight');
            isHighlighted = true;
            console.log('ハイライトクラスが追加されました');
        }

        console.log('現在のクラス:', messageElement.className);
    });
</script>
```

ここでは、`isHighlighted`という変数を使って、現在ハイライトが適用されているかどうかを記録しています。

ブラウザを更新して「ハイライト切り替え」ボタンを何回かクリックしてみてください。クリックするたびにハイライトが付いたり消えたりします。

`classList.remove()`でクラスが削除されると、DOM構造は以下のように変化します。

#### 削除後
```html
<p id="message">この文章のスタイルが変更されます。</p>
```

クラスが削除されると、そのクラスで適用されていたスタイルも無効になります。

## toggleメソッドでより簡潔に書こう

今回のように、クラスを追加したり削除したりする処理を繰り返す場合、`classList.toggle()`メソッドを使うとより簡潔に書くことができます。

今度は、文字サイズを切り替えるボタンについて、`toggle`メソッドを使ってみましょう。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- 文字サイズ切り替えボタンの処理 ---
    const sizeButton = document.getElementById('size-btn');

    sizeButton.addEventListener('click', function() {
        // large-textクラスを切り替え（あれば削除、なければ追加）
        messageElement.classList.toggle('large-text');

        console.log('文字サイズが切り替わりました');
        console.log('現在のクラス:', messageElement.className);
    });
    // --- 追加終了 ---
</script>
```

ブラウザを更新して「文字サイズ切り替え」ボタンをクリックしてみてください。クリックするたびに文字が大きくなったり元に戻ったりします。

![文字サイズ切り替え後のスクリーンショット](/img/javascript/css_class_manipulation_size.png)

`classList.toggle()`メソッドは、指定したクラスが存在するかどうかに応じて、クラスを追加または削除します。

- クラスが存在しない場合：クラスを追加
- クラスが存在する場合：クラスを削除

#### 1回目のクリック後
```html
<p id="message" class="highlight large-text">この文章のスタイルが変更されます。</p>
```

#### 2回目のクリック後
```html
<p id="message" class="highlight">この文章のスタイルが変更されます。</p>
```

実際のWebサイトでは、たとえば「メニューの表示/非表示」や「テーマの切り替え」など、ユーザーの操作に応じてスタイルを動的に変更する際に非常に便利です。

## 複数のクラスを同時に操作してみよう

要素には複数のクラスを同時に適用することができます。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- 表示/非表示切り替えボタンの処理 ---
    const hideButton = document.getElementById('hide-btn');
    const colorBox = document.getElementById('color-box');

    hideButton.addEventListener('click', function() {
        // hiddenクラスを切り替え
        colorBox.classList.toggle('hidden');

        // ボタンのテキストも変更
        if (colorBox.classList.contains('hidden')) {
            hideButton.textContent = '表示する';
            console.log('ボックスが非表示になりました');
        } else {
            hideButton.textContent = '非表示にする';
            console.log('ボックスが表示されました');
        }

        console.log('現在のクラス:', colorBox.className);
    });
    // --- 追加終了 ---
</script>
```

ブラウザを更新して「表示/非表示切り替え」ボタンをクリックしてみてください。青い四角形が消えたり現れたりし、ボタンのテキストも変わります。

![表示/非表示切り替え後のスクリーンショット](/img/javascript/css_class_manipulation_before_click.png)

![表示/非表示切り替え後のスクリーンショット](/img/javascript/css_class_manipulation_after_click.png)

`classList.contains()`メソッドを使うと、特定のクラスが存在するかどうかを確認できます。

#### 非表示状態のDOM
```html
<div id="color-box" class="box hidden"></div>
```

#### 表示状態のDOM
```html
<div id="color-box" class="box"></div>
```

## styleプロパティで直接スタイルを変更しよう

CSSクラス以外にも、`style`プロパティを使って直接スタイルを変更することもできます。

これまでの復習も含んでいますが、試しに`style`プロパティを使ってタイトルの色を変更してみましょう。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- 直接スタイルを変更する例 ---
    const titleElement = document.getElementById('title');

    // 3秒後にタイトルの色を変更
    setTimeout(function() {
        titleElement.style.color = 'red';
        titleElement.style.textDecoration = 'underline';

        console.log('タイトルのスタイルが直接変更されました');
    }, 3000);
    // --- 追加終了 ---
</script>
```

ブラウザを更新すると、3秒後にタイトルの文字が赤色になり、下線が引かれます。

![タイトルのスタイル変更後のスクリーンショット](/img/javascript/css_class_manipulation_title_style.png)

`style`プロパティで変更すると、DOM構造は以下のように変化します。

```html
<h1 id="title" style="color: red; text-decoration: underline;">CSSクラスの操作</h1>
```

`style`プロパティは要素に直接スタイルを適用するため、CSSファイルで定義されたスタイルよりも優先されます。

## CSSクラスとstyleプロパティの使い分け

#### CSSクラスを使う場合（推奨）
- 複数のスタイルをまとめて適用したい
- 同じスタイルを複数の要素に適用したい
- スタイルの管理を整理したい

#### styleプロパティを使う場合
- 計算結果に基づいて動的にスタイルを決めたい
- 一時的にスタイルを変更したい

## まとめ

本章では、CSSクラスとスタイルの操作について学習しました。今回学んだ内容は以下の通りです。

- `classList.add()`でクラスを追加できる
- `classList.remove()`でクラスを削除できる
- `classList.toggle()`でクラスの追加・削除を切り替えできる
- `classList.contains()`でクラスの存在を確認できる
- `style`プロパティで直接スタイルを変更できる

これらの方法を使うことで、ユーザーの操作に応じてページの見た目を動的に変更できるようになります。

ここまでで、基本的な DOM 操作の知識が身につきました。次のステップでは、より高度な非同期処理やイベントハンドリングについて学んでいきます。

React や Vue.js などのフレームワークを使う上でも必須の知識となるので、次回以降の学習も楽しみにしていてください。
