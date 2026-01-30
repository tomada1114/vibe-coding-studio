---
title: DOMとは何かを理解しよう
nextjs:
  metadata:
    title: DOMとは何かを理解しよう
    description: DOM（Document Object Model）の基本概念を理解し、HTMLとJavaScriptの関係性やブラウザでの動作について学習します。開発者ツールを使ったDOM確認方法も習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- DOM（Document Object Model）の基本概念を理解する
- HTMLとDOMの関係性を把握する
- ノードとエレメントの違いを学ぶ
- 開発者ツールでのDOM確認方法を習得する
- JavaScriptでDOMを操作する準備を整える

## はじめに

これまでJavaScriptの基本文法について学んできましたが、Webページを動的に変更するためには、HTMLと連携する必要があります。

そこで登場するのが**DOM**という概念です。DOMを理解することで、ボタンをクリックした時にテキストを変更したり、フォームに入力された内容を取得したりできるようになります。

まずは「DOMとは何か」から一緒に学んでいきましょう。

## DOMとは何か

**DOM**とは、**Document Object Model**の略称です。これは、HTMLやXMLなどの文書を、JavaScriptから操作できる形で表現したものです。

少し難しく聞こえるかもしれませんが、簡単に言うと「JavaScriptがHTMLを理解して操作するための仕組み」のことです。

ブラウザがHTMLファイルを読み込むと、そのHTMLの内容をDOMという形に変換します。そして、JavaScriptはこのDOMを通じてHTMLの要素を操作することができるのです。

例えば、「ボタンをクリックしたらページのタイトルが変わる」という動作は、JavaScriptがDOMを使ってHTMLの要素を書き換えることで実現されています。

## HTMLとDOMの関係を理解しよう

実際にHTMLファイルを作成して、DOMの概念を体験してみましょう。

VS Codeで`dom_example.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM学習</title>
</head>
<body>
    <h1 id="main-title">こんにちは、DOM！</h1>
    <p class="description">これはDOMを学習するためのページです。</p>
    <ul>
        <li>リスト項目1</li>
        <li>リスト項目2</li>
        <li>リスト項目3</li>
    </ul>
    <button id="change-button">テキストを変更</button>

    <script>
        // ここにJavaScriptを書きます（まだ空のままです）
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてみましょう。ファイルを作成したら、ファイルを右クリックして「Open with Live Server」を選択するか、ブラウザに直接ドラッグ&ドロップして開いてください。

画面には見出し、説明文、リスト、そしてボタンが表示されるはずです。この時点では、まだボタンをクリックしても何も起こりません。

![スクリーンショット](/img/javascript/dom-basic-html-display..png)

## DOMを体験してみよう

それでは、簡単なJavaScriptコードを追加して、DOMがどのように動作するかを体験してみましょう。

先ほど作成した`dom_example.html`の`<script>`タグ内に、以下のコードを追加してください。

```html
<script>
    // ページが読み込まれた時に実行される処理
    console.log('ページが読み込まれました');

    // DOM要素を取得してみる
    const titleElement = document.getElementById('main-title');
    console.log('タイトル要素:', titleElement);

    // 要素の内容を確認してみる
    console.log('タイトルのテキスト:', titleElement.textContent);
</script>
```

ファイルを保存してブラウザを更新し、開発者ツールのConsoleタブを開いてください。開発者ツールの開き方がわからない場合は、`F12`キーを押すか、ページを右クリックして「検証」を選択してください。

コンソールには以下のような出力が表示されるはずです。

```
ページが読み込まれました
タイトル要素: <h1 id="main-title">こんにちは、DOM！</h1>
タイトルのテキスト: こんにちは、DOM！
```

このコードでは、`document.getElementById()`というメソッドを使って、IDが`main-title`の要素を取得しています。そして、取得した要素の内容をコンソールに表示しています。

コンソールで表示された「タイトル要素」の部分をクリックすると、実際にページ上の該当する要素がハイライト表示されます。これにより、JavaScriptで取得した要素が実際にページのどの部分を指しているかを確認できます。

## ボタンクリックでDOMを変更してみよう

さらに、ボタンをクリックした時にページの内容を変更するコードを追加してみましょう。

`<script>`タグ内のコードを以下のように更新してください。

```html
<script>
    // ページが読み込まれた時に実行される処理
    console.log('ページが読み込まれました');

    // DOM要素を取得
    const titleElement = document.getElementById('main-title');
    const buttonElement = document.getElementById('change-button');

    console.log('タイトル要素:', titleElement);
    console.log('ボタン要素:', buttonElement);

    // ボタンがクリックされた時の処理を追加
    buttonElement.addEventListener('click', function() {
        console.log('ボタンがクリックされました！');

        // タイトルのテキストを変更
        titleElement.textContent = 'DOMが変更されました！';

        // ボタンのテキストも変更
        buttonElement.textContent = 'もう一度クリック';
    });
</script>
```

ファイルを保存してブラウザを更新してください。まず、コンソールに以下のような出力が表示されます。

```
ページが読み込まれました
タイトル要素: <h1 id="main-title">こんにちは、DOM！</h1>
ボタン要素: <button id="change-button">テキストを変更</button>
```

そして、ページの「テキストを変更」ボタンをクリックしてみてください。ボタンをクリックすると、以下の変化が起こります。

#### 画面上の変化
- 見出しのテキストが「こんにちは、DOM！」から「DOMが変更されました！」に変わる
- ボタンのテキストが「テキストを変更」から「もう一度クリック」に変わる

#### コンソールの出力
```
ボタンがクリックされました！
```

これが、JavaScriptがDOMを通じてHTMLを操作している様子です。ユーザーの操作（ボタンクリック）に応じて、ページの内容が動的に変更されています。

![ボタンクリック前後の画面比較](/img/javascript/dom-button-click-before-after.png)

## ノードとエレメントの違い

DOMについて理解を深めるために、**ノード**と**エレメント**という概念について学びましょう。

**ノード**とは、DOM内のすべての構成要素のことです。HTMLタグだけでなく、テキストや属性、コメントなども含まれます。

一方、**エレメント**とは、HTMLタグで表現される要素のことです。`<h1>`や`<p>`、`<button>`などがエレメントにあたります。

つまり、エレメントはノードの一種ということになります。JavaScriptでDOM操作を行う際は、主にエレメントを対象とすることが多いです。

実際に確認してみましょう。`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // ページが読み込まれた時に実行される処理
    console.log('ページが読み込まれました');

    // DOM要素を取得
    const titleElement = document.getElementById('main-title');
    const buttonElement = document.getElementById('change-button');

    // --- 新しく追加するコード ---
    // 様々なノードの種類を確認
    console.log('--- ノードの種類を確認 ---');
    console.log('タイトル要素のノードタイプ:', titleElement.nodeType); // 1 = エレメントノード
    console.log('タイトル要素のノード名:', titleElement.nodeName);     // H1

    // テキストノードを確認
    const textNode = titleElement.firstChild;
    console.log('テキストノードのタイプ:', textNode.nodeType);  // 3 = テキストノード
    console.log('テキストノードの内容:', textNode.textContent);
    // --- 追加終了 ---

    // ボタンがクリックされた時の処理
    buttonElement.addEventListener('click', function() {
        console.log('ボタンがクリックされました！');

        // タイトルのテキストを変更
        titleElement.textContent = 'DOMが変更されました！';

        // ボタンのテキストも変更
        buttonElement.textContent = 'もう一度クリック';
    });
</script>
```

ブラウザを更新してコンソールを確認すると、以下のような出力が表示されます。

```
ページが読み込まれました
--- ノードの種類を確認 ---
タイトル要素のノードタイプ: 1
タイトル要素のノード名: H1
テキストノードのタイプ: 3
テキストノードの内容: こんにちは、DOM！
```

この出力から、HTMLタグは**エレメントノード**（タイプ1）、テキストは**テキストノード**（タイプ3）として区別されていることがわかります。

`nodeType`プロパティは数値で返されますが、主要な値は以下の通りです。

- `1`: エレメントノード（HTMLタグ）
- `3`: テキストノード（要素内のテキスト）
- `8`: コメントノード（HTML内のコメント）

## DOMの構造を理解しよう

DOMは**ツリー構造**という形で表現されます。これは、親と子の関係で要素が整理されている構造です。

```bash
# ツリー構造のイメージ
html
├── head
└── body
    ├── h1
    ├── p
    ├── ul
    │   ├── li
    │   ├── li
    │   └── li
    └── button
```

先ほど作成したHTMLを例に説明すると、次のような階層構造になっています。

- `html`要素が一番上の親（**ルート要素**）
- `head`要素と`body`要素が`html`要素の子
- `h1`、`p`、`ul`、`button`要素が`body`要素の子
- `li`要素が`ul`要素の子

この階層関係を実際に確認してみましょう。`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- DOM構造を確認するコード ---
    console.log('--- DOM構造を確認 ---');

    // bodyの子要素を確認
    const bodyElement = document.body;
    console.log('body要素の子要素の数:', bodyElement.children.length);

    // ul要素を取得してその子要素を確認
    const ulElement = document.querySelector('ul');
    console.log('ul要素の子要素（li）の数:', ulElement.children.length);

    // 親要素を確認
    console.log('h1要素の親要素:', titleElement.parentElement.tagName); // BODY

    // 次の兄弟要素を確認
    console.log('h1要素の次の兄弟要素:', titleElement.nextElementSibling.tagName); // P
    // --- 追加終了 ---
</script>
```

ブラウザを更新すると、コンソールに以下のような出力が追加されます。

```
--- DOM構造を確認 ---
body要素の子要素の数: 5
ul要素の子要素（li）の数: 3
h1要素の親要素: BODY
h1要素の次の兄弟要素: P
```

この出力から、以下のことがわかります。

- `body`要素には5つの子要素がある（`h1`、`p`、`ul`、`button`、`script`）
- `ul`要素には3つの`li`子要素がある
- `h1`要素の親は`BODY`要素である
- `h1`要素の次の兄弟要素は`P`要素である

このように、DOMでは要素同士の関係性を「親子」や「兄弟」といった家族関係で表現します。

## 開発者ツールでDOMを確認してみよう

ブラウザの**開発者ツール**を使うと、実際のDOM構造を視覚的に確認することができます。

開発者ツールを開くには、ブラウザのメニューから「開発者ツール」を選択するか、`F12`キーを押してください。多くのブラウザでは、右クリックして「検証」を選ぶことでも開くことができます。

開発者ツールが開いたら、**Elements**タブ（または**要素**タブ）をクリックしてください。ここに、現在のページのDOM構造が表示されます。

![開発者ツールのElementsタブ](/img/javascript/dom-elements-tab.png)

ElementsタブをElementsタブを見ると、先ほど書いたHTMLコードとほぼ同じ内容が表示されているはずです。しかし、よく見ると微妙に違う部分があることに気づくでしょう。

例えば、HTMLには書いていない要素が追加されていたり、属性が追加されていたりします。これは、ブラウザがHTMLを読み込む際に、自動的に補完や調整を行うためです。

ElementsタブでHTML要素をクリックすると、その要素がページ上でハイライト表示されます。また、要素の左にある三角マークをクリックすると、その要素の子要素を展開したり折りたたんだりできます。

### DOMの動的な変化を確認

開発者ツールで確認できるDOMは、リアルタイムで更新されます。つまり、JavaScriptでページの内容を変更すると、その変化がElementsタブにもすぐに反映されます。

実際に確認してみましょう。ElementsタブでDOMを確認しながら、ページの「テキストを変更」ボタンをクリックしてください。

ボタンをクリックすると、ElementsタブのDOMツリー内で、`<h1>`要素のテキストが「こんにちは、DOM！」から「DOMが変更されました！」に変更されることを確認できるはずです。また、`<button>`要素のテキストも「テキストを変更」から「もう一度クリック」に変わることも確認できます。

変更された部分は、Elementsタブで一時的にハイライト表示されるため、どこが変更されたかが一目でわかります。

![DOM変更時のハイライト表示](/img/javascript/dom-elements-change-highlight.png)

この特徴により、JavaScriptの動作を目で見て確認することができるため、プログラムが意図通りに動作しているかを検証する際に役立ちます。

## DOM操作の基本的なメソッド

ここでは、DOM操作の基本的なメソッドについて学んできましたので、簡単にまとめておきます。これらのメソッドは、JavaScriptでDOMを操作する際によく使用されます。

### 要素の取得

まずは、DOMから要素を取得する方法です。以下のメソッドを使います。

```javascript
// IDで要素を取得
const element = document.getElementById('id名');

// CSSセレクターで要素を取得（最初の1つ）
const element = document.querySelector('.class名');

// CSSセレクターで要素を取得（すべて）
const elements = document.querySelectorAll('tag名');
```

DOM 操作、つまりHTMLの要素を取得するためのメソッドは JavaScriptの`document`オブジェクトを通じて行います。上記のメソッドは、特定のIDやクラス名、タグ名を持つ要素を取得するために使用されます。

### 内容の変更

次は、取得した要素の内容を変更する方法です。

`getElementById`や`querySelector`で取得した要素に対して、以下のように操作します。

```javascript
const element = document.getElementById('id名');

// テキスト内容を変更
element.textContent = '新しいテキスト';

// HTML内容を変更（HTMLタグも含む）
element.innerHTML = '<strong>太字のテキスト</strong>';
```

### スタイルの変更

要素のスタイルを変更するには、`style`プロパティを使用します。以下のように記述することで、スタイルを上書きするようなイメージです。

```javascript
// CSSスタイルを変更
element.style.backgroundColor = 'red';
element.style.fontSize = '20px';
```

### 要素の作成と追加

他にも、なかった要素を新しく作成して、既存の要素に追加することもできます。以下のように記述します。

```javascript
// 新しい要素を作成
const newElement = document.createElement('div');

// 要素を親要素に追加
parentElement.appendChild(newElement);
```

これらのメソッドの詳しい使い方については、次の章以降で学んでいきます。

## DOMの重要性を理解しよう

なぜDOMを理解することが重要なのでしょうか。それは、現代のWebサイトの多くが**動的**だからです。

**静的なWebサイト**は、一度作成したら内容が変わりません。昔のWebサイトは、このような静的なサイトが主流でした。

一方、**動的なWebサイト**は、ユーザーの操作に応じて内容が変化します。例えば、以下のような機能がこれにあたります。

- ショッピングサイトでカートに商品を追加する
- SNSで新しい投稿を表示する
- フォームの入力内容をリアルタイムで検証する
- メニューの開閉やタブの切り替え
- 検索結果の絞り込み表示

これらの機能は、すべてJavaScriptがDOMを操作することで実現されています。

DOMを理解することで、このような動的なWebサイトを作成できるようになります。また、既存のWebサイトがどのような仕組みで動作しているかも理解できるようになります。

## 次に学ぶこと

本章では、DOMの基本概念について学びました。DOMは「JavaScriptがHTMLを操作するための仕組み」であり、ツリー構造で表現されることを理解できたと思います。

また、開発者ツールを使ってDOMの構造を確認する方法も習得しました。この開発者ツールは、これからJavaScriptを学習していく上で頻繁に使用することになります。

次の章では、実際にJavaScriptを使ってDOM要素を取得し、テキストを変更する方法をより詳しく学んでいきます。DOMの理論的な理解から、実践的な操作へとステップアップしていきましょう。

## まとめ

本章では、DOM（Document Object Model）について学習しました。今回学んだ内容は以下の通りです。

- DOMはJavaScriptがHTMLを操作するための仕組みである
- HTMLとDOMは似ているが、DOMはブラウザによって解釈・補完された形である
- DOMはツリー構造で表現され、親子関係を持つ
- ノードはDOM内のすべての構成要素、エレメントはHTMLタグのことである
- 開発者ツールのElementsタブでDOMの構造を確認できる
- ConsoleタブでDOM操作を直接試すことができる
- DOMを理解することで動的なWebサイトを作成できるようになる

DOMは、これからJavaScriptでWebページを操作していく上での基礎となる概念です。しっかりと理解して、次の章に進んでいきましょう。
