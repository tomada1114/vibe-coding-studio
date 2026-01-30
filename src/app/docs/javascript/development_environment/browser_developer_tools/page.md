---
title: ブラウザの開発者ツールを使ってみよう
nextjs:
  metadata:
    title: ブラウザの開発者ツールを使ってみよう
    description: ブラウザの開発者ツールの基本的な使い方を学び、Consoleタブでのデバッグ方法やElementsタブでのHTML確認、JavaScriptエラーの対処法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- ブラウザの開発者ツールとは何かを理解する
- 開発者ツールの開き方と基本的な操作方法を習得する
- Consoleタブを使ったJavaScriptの実行とデバッグ方法を学ぶ
- JavaScriptエラーの確認と解決方法を理解する
- Elementsタブを使ったHTML要素の確認方法を習得する

## はじめに

Webページを作成していると、「JavaScriptが思った通りに動かない」「エラーが出ているけど何が原因かわからない」という場面に遭遇します。そんな時に非常に役立つのが、ブラウザに標準で搭載されている**開発者ツール**です。

開発者ツールは、WebページのHTML、CSS、JavaScriptの動作を詳しく調べたり、エラーの原因を探したり、コードをリアルタイムでテストしたりできる機能です。

プロのWeb開発者も日常的に使用しているこのツールを使いこなせるようになることで、JavaScriptの学習がより効率的に進められるようになります。

## 開発者ツールの開き方

まずは、開発者ツールの開き方を覚えましょう。主要なブラウザ（Chrome、Firefox、Edge、Safari）のいずれでも、ほぼ同じ方法で開くことができます。

### キーボードショートカットで開く方法

最も素早く開発者ツールを開く方法は、キーボードショートカットを使うことです。

- Windows/Linux: `F12`キーまたは`Ctrl + Shift + I`
- Mac: `Cmd + Option + I`

これらのキーを押すと、ブラウザの画面下部または右側に開発者ツールが表示されます。この方法が最も頻繁に使われるので、ぜひ覚えておきましょう。

![開発者ツールの開き方](/img/javascript/how_to_open_dev_tools.png)

### 右クリックメニューから開く方法

Webページ上の任意の場所で右クリックすると、コンテキストメニューが表示されます。この中にある「検証」「要素を調査」「開発者ツールで調査」などの項目をクリックすることでも開発者ツールを開くことができます。

![右クリックメニューから開発者ツールを開く](/img/javascript/right_click_open_dev_tools.png)

右クリックした要素が開発者ツールで自動的に選択された状態で開かれるため、特定の要素を詳しく調べたい時に便利です。

### ブラウザメニューから開く方法

ブラウザの設定メニューからも開発者ツールを開くことができます。

**Google Chromeの場合**は、右上の三点メニューをクリック→「その他のツール」→「デベロッパーツール」の順に選択します。

![Google Chromeのメニューから開発者ツールを開く](/img/javascript/chrome_menu_open_dev_tools.png)

実際に開発者ツールを開いてみましょう。前章で作成したHTMLファイルをブラウザで開き、`F12`キーを押してみてください。画面に開発者ツールが表示されることを確認してください。

## Consoleタブの使い方

開発者ツールが開いたら、まず「**Console**」タブをクリックしてください。このタブが、JavaScriptを学習する上で最も重要な機能の一つです。

### Consoleタブとは

Consoleタブは、JavaScriptのコードを直接実行したり、プログラムからの出力メッセージを確認したりできる場所です。`console.log()`で出力したメッセージもここに表示されます。

![Consoleタブの画面](/img/javascript/html_javascript_integration_console.png)

まず、前章で作成したJavaScriptファイルが正常に動作しているかを確認してみましょう。以下のHTMLファイルを作成し、`console-test.html`として保存してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Console テスト</title>
</head>
<body>
    <h1>開発者ツールのConsole練習</h1>
    <p>開発者ツールのConsoleタブを確認してください。</p>

    <script>
        console.log("ページが読み込まれました");
        console.log("今日の日付:", new Date());

        let userName = "山田太郎";
        let userAge = 25;

        console.log("ユーザー名:", userName);
        console.log("年齢:", userAge);

        // 計算結果もコンソールに表示
        let nextYear = userAge + 1;
        console.log("来年の年齢:", nextYear);
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開き、開発者ツールのConsoleタブを確認してください。複数のメッセージが順番に表示されていることがわかります。

```bash
ページが読み込まれました
今日の日付: Mon Jul 10 2025 12:00:00 GMT+0900 (日本標準時)
ユーザー名: 山田太郎
年齢: 25
来年の年齢: 26
```

### Consoleでの直接コード実行

Consoleタブの下部には、コードを入力できる領域があります。ここにJavaScriptのコードを直接入力して、すぐに実行できます。

Consoleの入力欄で、以下のコードを試してみましょう。

```javascript
console.log("Consoleから直接実行しました");
```

このコードを入力してEnterキーを押すと、すぐに結果が表示されます。

さらに、計算も試してみましょう。

```javascript
10 + 20
```

結果として`30`が表示されます。このように、Console は何かしらの処理を試すのに非常に便利な場所です。

変数の定義と操作も可能です。

```javascript
let greeting = "こんにちは";
let name = "JavaScript";
greeting + "、" + name + "！";
```

最後の行を実行すると、`"こんにちは、JavaScript！"`という結果が表示されます。

```bash
こんにちは、JavaScript！
```

### 複数行のコードを実行する

長いコードを入力したい場合は、`Shift + Enter`を使って改行できます。



```javascript
let numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}
console.log("合計:", sum);
```

このように複数行にわたるコードも、Consoleで直接実行できます。

```bash
合計: 15
```

## JavaScriptエラーの確認方法

プログラムを書いていると、必ずエラーに遭遇します。開発者ツールのConsoleタブは、エラーの内容を詳しく教えてくれる重要な機能です。

### エラーの種類と表示

意図的にエラーを発生させて、どのように表示されるかを確認してみましょう。以下のHTMLファイルを作成し、`error-test.html`として保存してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エラーテスト</title>
</head>
<body>
    <h1>JavaScriptエラーの確認</h1>
    <p>開発者ツールでエラーを確認してみましょう。</p>

    <script>
        console.log("正常なメッセージです");

        // わざとエラーを発生させる
        console.log("エラー発生前");
        undefinedFunction(); // 存在しない関数を呼び出し
        console.log("エラー発生後"); // この行は実行されない
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開き、開発者ツールのConsoleタブを確認してください。

正常なメッセージの後に、赤い文字でエラーメッセージが表示されているはずです。エラーメッセージには以下の情報が含まれています。

- **エラーの種類**: `ReferenceError`（参照エラー）
- **エラーの内容**: `undefinedFunction is not defined`（undefinedFunctionが定義されていません）
- **発生場所**: ファイル名と行番号

「エラー発生後」のメッセージが表示されていないことも確認してください。JavaScriptでエラーが発生すると、その後のコードの実行が停止します。

### よくあるエラーの例

JavaScript学習中によく遭遇するエラーをいくつか紹介します。Consoleで直接試してみましょう。

**構文エラー（SyntaxError）**:

```javascript
console.log("閉じ括弧忘れ"
```

このコードを実行すると、閉じ括弧が不足しているため構文エラーが発生します。

**型エラー（TypeError）**:

```javascript
let number = 42;
number.toUpperCase(); // 数値に文字列のメソッドを使用
```

数値に対して文字列専用のメソッドを使おうとするとTypeErrorが発生します。

**参照エラー（ReferenceError）**:

```javascript
console.log(notExistletiable); // 存在しない変数を参照
```

定義されていない変数を使おうとするとReferenceErrorが発生します。

### エラーメッセージの読み方

エラーメッセージを正しく読むことは、問題解決の第一歩です。エラーメッセージには通常、以下の情報が含まれています。

**エラーの種類**は、問題の大まかなカテゴリを示します。`ReferenceError`、`TypeError`、`SyntaxError`など、エラーの性質がわかります。

**エラーの詳細**は、具体的に何が問題なのかを説明します。「○○が定義されていません」「○○は関数ではありません」といった内容です。

**発生場所**は、エラーが発生したファイル名と行番号を示します。この情報を使って、問題のあるコードの場所を特定できます。

## Elementsタブでの要素確認

開発者ツールの「**Elements**」タブでは、WebページのHTML構造を詳細に確認できます。JavaScriptでHTML要素を操作する際に、要素の構造や属性を確認するのに非常に役立ちます。

### Elementsタブの基本的な使い方

以下のHTMLファイルを作成し、`elements-test.html`として保存してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elements練習</title>
    <style>
        .highlight {
            background-color: yellow;
            padding: 10px;
        }
        #special-text {
            color: blue;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>HTML要素の確認練習</h1>
    <p class="highlight">この段落にはclassが設定されています。</p>
    <p id="special-text">この段落にはidが設定されています。</p>
    <div>
        <span>ネストした要素</span>もあります。
    </div>

    <button onclick="changeText()">テキストを変更</button>

    <script>
        function changeText() {
            let element = document.getElementById("special-text");
            element.textContent = "JavaScriptでテキストが変更されました！";
            console.log("テキストを変更しました");
        }
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開き、開発者ツールの「Elements」タブをクリックしてください。

環境によっては「要素」と表示されることもありますが、同じ機能です。

![Elementsタブの画面](/img/javascript/html_javascript_integration_elements.png)

Elementsタブには、HTMLの構造がツリー形式で表示されます。各要素は展開・折りたたみができ、要素をクリックすると詳細な情報が確認できます。

### 要素の詳細確認

Elementsタブで`<p id="special-text">`の要素をクリックしてみてください。選択された要素がWebページ上でハイライト表示されることがわかります。

右側のパネルには、選択した要素の詳細情報が表示されます。

- **Styles**（スタイル）: その要素に適用されているCSSスタイル
- **Computed**（計算済み）: 実際に適用されている最終的なスタイル値
- **Event Listeners**（イベントリスナー）: その要素に設定されているイベントリスナー

![要素の詳細確認](/img/javascript/html_javascript_integration_elements_details.png)

## まとめ

本章では、ブラウザの開発者ツールの基本的な使い方について学習しました。以下のポイントを理解できたことと思います。

- 開発者ツールは`F12`キーまたは右クリックメニューから簡単に開くことができる
- Consoleタブでは`console.log()`の出力確認やJavaScriptの直接実行が可能
- エラーメッセージの読み方を理解することで、問題の原因を特定できる
- Elementsタブを使ってHTML構造の確認とJavaScriptによる変更の追跡ができる

開発者ツールは、JavaScriptを学習し、実際の開発を行う上で欠かせないツールです。これらの基本的な使い方をマスターすることで、問題が発生した時に自分で原因を調べ、解決する能力が身につきます。

次回は、開発者ツールのConsoleを使って、実際にJavaScriptのコードを実行し、学習を進めていく方法について詳しく学んでいきます。
