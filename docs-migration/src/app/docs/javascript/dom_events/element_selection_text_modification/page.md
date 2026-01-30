---
title: 要素を取得してテキストを変更してみよう
nextjs:
  metadata:
    title: 要素を取得してテキストを変更してみよう
    description: JavaScriptでDOM要素を取得し、テキスト内容を変更する方法を学びます。getElementByIdやquerySelectorの使い方、textContentとinnerHTMLの違いについて習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `getElementById`で特定の要素を取得する方法を理解する
- `querySelector`でCSSセレクターを使った要素取得を学ぶ
- `textContent`と`innerHTML`の違いを把握する
- 要素の属性を取得・変更する方法を習得する

## はじめに

前回の章でDOMの基本概念について学びました。今回は、実際にJavaScriptを使ってHTML要素を取得し、その内容を変更する方法を学んでいきましょう。

DOM操作の第一歩は「要素を取得すること」です。正しい要素を取得できれば、その要素のテキストを変更したり、スタイルを変更したりできるようになります。

## HTMLファイルを準備しよう

まずは、練習用のHTMLファイルを作成しましょう。VS Codeで`element_practice.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>要素取得の練習</title>
</head>
<body>
    <h1 id="page-title">要素取得の練習</h1>
    <p class="message">これは最初のメッセージです。</p>
    <p class="message">これは2番目のメッセージです。</p>
    <div id="content">
        <span>ここは内容エリアです。</span>
    </div>
    <button id="change-btn">テキストを変更</button>

    <script>
        // ここにJavaScriptを書いていきます
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてください。シンプルなページが表示され、見出し、段落、ボタンなどが配置されているはずです。

![スクリーンショット](/img/javascript/get-element-practice.png)

## getElementByIdで要素を取得しよう

最も基本的な要素の取得方法は、`getElementById`メソッドを使うことです。このメソッドは、指定したIDを持つ要素を1つ取得します。

`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // IDで要素を取得
    const titleElement = document.getElementById('page-title');
    console.log('取得した要素:', titleElement);

    // 要素のテキスト内容を確認
    console.log('現在のテキスト:', titleElement.textContent);
</script>
```

ブラウザを更新して開発者ツールのコンソールを確認すると、以下のような出力が表示されます。

```
取得した要素: <h1 id="page-title">要素取得の練習</h1>
現在のテキスト: 要素取得の練習
```

`getElementById`は、HTMLのid属性に指定された値を使って要素を取得します。IDは1つのページ内で重複してはいけないため、このメソッドは必ず1つの要素を返します（該当する要素がない場合は`null`を返します）。

## textContentでテキストを変更しよう

取得した要素のテキスト内容を変更するには、`textContent`プロパティを使います。

先ほどのコードに以下を追加してください。

```html
<script>
    // IDで要素を取得
    const titleElement = document.getElementById('page-title');
    console.log('取得した要素:', titleElement);
    console.log('現在のテキスト:', titleElement.textContent);

    // --- 新しく追加するコード ---
    // テキスト内容を変更
    titleElement.textContent = 'JavaScriptで変更されたタイトル';
    console.log('変更後のテキスト:', titleElement.textContent);
    // --- 追加終了 ---
</script>
```

ブラウザを更新すると、ページのタイトルが「JavaScriptで変更されたタイトル」に変わっているはずです。コンソールには以下のような出力が表示されます。

```
取得した要素: <h1 id="page-title">要素取得の練習</h1>
現在のテキスト: 要素取得の練習
変更後のテキスト: JavaScriptで変更されたタイトル
```

`textContent`プロパティを使うと、要素内のテキスト部分だけを取得したり変更したりできます。

## querySelectorでCSSセレクターを使おう

`getElementById`はIDでしか要素を取得できませんが、`querySelector`を使うとCSSセレクターを使ってより柔軟に要素を取得できます。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- querySelectorを使った要素取得 ---
    // クラス名で要素を取得（最初の1つだけ）
    const messageElement = document.querySelector('.message');
    console.log('最初のmessageクラス要素:', messageElement.textContent);

    // タグ名で要素を取得
    const spanElement = document.querySelector('span');
    console.log('span要素:', spanElement.textContent);

    // IDで要素を取得（getElementByIdと同じ結果）
    const contentElement = document.querySelector('#content');
    console.log('content要素:', contentElement);
    // --- 追加終了 ---
</script>
```

ブラウザを更新すると、コンソールに以下のような出力が追加されます。

```
最初のmessageクラス要素: これは最初のメッセージです。
span要素: ここは内容エリアです。
content要素: <div id="content">...</div>
```

`querySelector`では、CSSセレクターの記法を使って要素を指定できます。

- クラス名: `.class-name`
- ID: `#id-name`
- タグ名: `tag-name`

ただし、`querySelector`は該当する要素が複数あっても、最初に見つかった1つの要素しか返しません。

## textContentとinnerHTMLの違いを理解しよう

要素の内容を変更する方法には、`textContent`の他に`innerHTML`もあります。この2つの違いを理解しておきましょう。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- textContentとinnerHTMLの違い ---
    const messageElement = document.querySelector('.message');

    // textContentを使った場合（HTMLタグは文字として表示される）
    messageElement.textContent = '<strong>太字にしたい</strong>テキスト';
    console.log('textContent使用後:', messageElement.textContent);

    // 3秒後にinnerHTMLで変更
    setTimeout(function() {
        // innerHTMLを使った場合（HTMLタグが解釈される）
        messageElement.innerHTML = '<strong>太字になった</strong>テキスト';
        console.log('innerHTML使用後:', messageElement.innerHTML);
    }, 3000);
    // --- 追加終了 ---
</script>
```

ブラウザを更新すると、最初は段落に`<strong>太字にしたい</strong>テキスト`とHTMLタグがそのまま文字として表示されます。3秒後に、「太字になった」の部分が実際に太字で表示されるように変わります。

コンソールの出力は以下のようになります。

```
textContent使用後: <strong>太字にしたい</strong>テキスト
innerHTML使用後: <strong>太字になった</strong>テキスト
```

どちらも要素の内容を変更するために使いますが、`textContent`はテキストのみを扱い、HTMLタグはそのまま文字列として扱います。一方、`innerHTML`はHTMLタグを解釈して、実際のHTMLとして表示します。

テキストを変更するだけなら`textContent`を使うのが安全ですが、HTMLを含む内容を変更したい場合は`innerHTML`を使います。ただし、`innerHTML`を使うと、XSS（クロスサイトスクリプティング）攻撃のリスクがあるため、たとえばユーザーからの入力をそのまま表示する場合は注意が必要です。

## 要素の属性を取得・変更してみよう

HTML要素の属性（`id`、`class`、`src`など）も取得・変更することができます。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- 属性の取得と変更 ---
    const buttonElement = document.getElementById('change-btn');

    // 属性を取得
    console.log('ボタンのID:', buttonElement.getAttribute('id'));
    console.log('ボタンのIDプロパティ:', buttonElement.id);

    // 新しい属性を追加
    buttonElement.style.backgroundColor = 'lightblue';
    buttonElement.style.padding = '10px';

    console.log('スタイル変更完了');
    // --- 追加終了 ---
</script>
```

ブラウザを更新すると、ボタンの背景色が水色になり、パディングが追加されます。また、コンソールには以下のような出力が表示されます。

![スクリーンショット](/img/javascript/get-element-attribute.png)

また、コンソールには以下のような出力が表示されます。

```
ボタンのID: change-btn
ボタンのIDプロパティ: change-btn
スタイル変更完了
```

属性の取得には2つの方法がありますので、覚えておきましょう。

- `getAttribute('属性名')`: 一般的な方法
- `要素.属性名`: よく使われる属性（id、classNameなど）は直接アクセス可能s

## 実践例：ボタンクリックで複数の要素を変更

最後に、ボタンをクリックしたときに複数の要素を同時に変更する例を作ってみましょう。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- ボタンクリック時の処理 ---
    const changeButton = document.getElementById('change-btn');

    changeButton.addEventListener('click', function() {
        // タイトルを変更
        const title = document.getElementById('page-title');
        title.textContent = 'クリックされました！';

        // 2番目のメッセージを変更
        const secondMessage = document.querySelectorAll('.message')[1];
        secondMessage.textContent = 'ボタンがクリックされて変更されました';

        // スパン要素を変更
        const span = document.querySelector('span');
        span.innerHTML = '<em>内容が変更されました</em>';

        console.log('すべての要素が変更されました');
    });
    // --- 追加終了 ---
</script>
```

ブラウザを更新してボタンをクリックしてみてください。クリックすると、タイトル、2番目のメッセージ、スパン要素の内容がすべて変更されるはずです。

![スクリーンショット](/img/javascript/get-element-button-click.png)

この例では、`querySelectorAll('.message')[1]`を使って2番目の`.message`クラス要素を取得しています。`querySelectorAll`は該当するすべての要素を配列のような形で返すため、`[1]`で2番目の要素（インデックス1）を指定しています。

少し複雑に感じるかもしれませんが、要素の取得と変更はWeb開発の基本です。これをマスターすれば、動的なWebページを作成するための第一歩となりますので、しっかりと理解しておきましょう。

## まとめ

本章では、JavaScriptを使った要素の取得とテキスト変更について学習しました。今回学んだ内容は以下の通りです。

- `getElementById`でID指定による要素取得ができる
- `querySelector`でCSSセレクターを使った柔軟な要素取得ができる
- `textContent`でテキスト内容を安全に変更できる
- `innerHTML`でHTMLを含む内容を変更できる（注意が必要）
- `getAttribute`と`setAttribute`で属性の取得・変更ができる

これらの基本操作を組み合わせることで、Webページを動的に変更できるようになります。次の章では、ユーザーの操作に応じてこれらの変更を実行する方法を学んでいきましょう。
