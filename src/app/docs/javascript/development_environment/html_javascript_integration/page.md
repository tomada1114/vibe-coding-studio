---
title: HTMLファイルにJavaScriptを組み込む方法を学ぼう
nextjs:
  metadata:
    title: HTMLファイルにJavaScriptを組み込む方法を学ぼう
    description: HTMLファイルにJavaScriptを組み込む基本的な方法を学び、scriptタグの使い方や外部ファイルの読み込み方法、最初のHello World表示まで習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- HTMLファイル内でJavaScriptを実行する基本的な方法を理解する
- scriptタグを使ったJavaScriptの記述方法を習得する
- 外部ファイルとしてJavaScriptを読み込む方法を学ぶ
- JavaScriptを記述する適切な場所とタイミングを理解する
- console.logを使って最初のメッセージを表示する方法を習得する

## はじめに

JavaScriptを学習する第一歩として、HTMLファイルにJavaScriptを組み込む方法を学んでいきましょう。

Webページは主にHTML、CSS、JavaScriptの3つの技術で構成されています。HTMLは文書の構造を作り、CSSは見た目を装飾し、JavaScriptはページに動きや機能を追加します。

JavaScriptをHTMLファイルで実行するには、いくつかの方法があります。今回は最も基本的で重要な方法を一つずつ丁寧に学んでいきましょう。

## scriptタグを使ってHTMLにJavaScriptを書く

HTMLファイル内でJavaScriptを実行するには、**scriptタグ**を使用します。scriptタグは、HTMLの中にJavaScriptのコードを直接記述するための特別なタグです。

それでは実際にやってみましょう。VS Codeで新しいファイルを作成し、`first-javascript.html`という名前で保存してください。

まず、基本的なHTMLの構造を記述します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最初のJavaScript</title>
</head>
<body>
    <h1>JavaScriptの学習</h1>
    <p>このページでJavaScriptを実行してみます。</p>
</body>
</html>
```

このHTMLファイルは、基本的な構造だけが記述された状態です。ここにJavaScriptを追加していきましょう。

次に、HTMLファイルの`</body>`タグの直前に、scriptタグを追加します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最初のJavaScript</title>
</head>
<body>
    <h1>JavaScriptの学習</h1>
    <p>このページでJavaScriptを実行してみます。</p>

    <!-- ここからJavaScriptを追加 -->
    <script>
        console.log("Hello, JavaScript!");
    </script>
</body>
</html>
```

`<script>`タグと`</script>`タグで囲まれた部分に、JavaScriptのコードを記述できます。今回は`console.log("Hello, JavaScript!");`というコードを書きました。

`console.log()`は、指定したメッセージをブラウザの開発者ツールのコンソールに表示する命令です。これは、JavaScriptで最もよく使われるデバッグ機能の一つです。

それでは、このHTMLファイルをブラウザで開いてみましょう。ファイルをダブルクリックするか、ブラウザにドラッグ&ドロップすることで開くことができます。

ページが表示されたら、ブラウザの開発者ツールを開いて、コンソールタブを確認してみてください。

後のレッスンで詳しく学ぶことになりますが、開発者ツールは通常、F12キーを押すか、右クリックして「検証」を選択することで開くことができます。

![検証を押して開くパターン](/img/javascript/html_javascript_integration_inspect.png)

「Hello, JavaScript!」というメッセージが表示されているはずです。

![コンソールに表示されたメッセージ](/img/javascript/html_javascript_integration_console.png)

### JavaScriptを記述する場所について

HTMLファイル内でJavaScriptを記述する場所は、主に2つの選択肢があります。

**headタグ内に記述する場合**と**bodyタグの終了直前に記述する場合**です。それぞれに特徴があります。

まず、headタグ内に記述する場合を見てみましょう。先ほどのファイルを以下のように修正してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最初のJavaScript</title>

    <!-- headタグ内にJavaScriptを記述 -->
    <script>
        console.log("headタグ内のJavaScript");
    </script>
</head>
<body>
    <h1>JavaScriptの学習</h1>
    <p>このページでJavaScriptを実行してみます。</p>

    <!-- bodyタグ内にもJavaScriptを記述 -->
    <script>
        console.log("bodyタグ内のJavaScript");
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで表示し、開発者ツールのコンソールを確認してみてください。2つのメッセージが順番に表示されることがわかります。

![headタグ内のJavaScript](/img/javascript/html_javascript_integration_head_script.png)

headタグ内にJavaScriptを記述すると、ページが読み込まれる前にJavaScriptが実行されます。これにより、ページの読み込み速度に影響を与える可能性があります。

一般的には、HTMLの要素を操作するJavaScriptは、HTML要素が読み込まれた後に実行する必要があるため、**bodyタグの終了直前に記述することが推奨**されています。

## 外部ファイルとしてJavaScriptを読み込む方法

HTMLファイル内に直接JavaScriptを記述する方法を学びましたが、コードが長くなると管理が困難になります。そこで、JavaScriptを別のファイルに分けて、HTMLから読み込む方法を学びましょう。

まず、新しいファイルを作成し、`script.js`という名前で保存してください。このファイルにJavaScriptのコードを記述します。

```javascript
// script.js
console.log("外部ファイルのJavaScript");
console.log("このファイルはscript.jsです");

// 変数を定義してみる
let message = "外部ファイルから読み込まれました！";
console.log(message);
```

次に、HTMLファイル（`first-javascript.html`）を以下のように修正して、外部のJavaScriptファイルを読み込むようにします。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最初のJavaScript</title>
</head>
<body>
    <h1>JavaScriptの学習</h1>
    <p>このページでJavaScriptを実行してみます。</p>

    <!-- 外部のJavaScriptファイルを読み込む -->
    <script src="script.js"></script>
</body>
</html>
```

`<script src="script.js"></script>`という記述により、外部のJavaScriptファイル（`script.js`）を読み込むことができます。`src`属性にファイルのパスを指定します。

HTMLファイルとJavaScriptファイルが同じフォルダに保存されている場合は、ファイル名だけを指定すれば読み込むことができます。

ブラウザでHTMLファイルを表示し、開発者ツールのコンソールを確認してみてください。外部ファイルに記述したJavaScriptが実行され、3つのメッセージが表示されることがわかります。

![外部ファイルのJavaScript](/img/javascript/html_javascript_integration_external_script.png)

### 複数の外部ファイルを読み込む

実際の開発では、機能ごとに複数のJavaScriptファイルに分けることがよくあります。複数の外部ファイルを読み込む場合は、scriptタグを複数記述します。

試しに、もう一つJavaScriptファイルを作成してみましょう。`util.js`という名前で新しいファイルを作成し、以下のコードを記述してください。

```javascript
// util.js
console.log("ユーティリティファイルが読み込まれました");

// 現在の日時を表示する
let currentDate = new Date();
console.log("現在の日時: " + currentDate);
```

そして、HTMLファイルで2つの外部ファイルを読み込むように修正します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最初のJavaScript</title>
</head>
<body>
    <h1>JavaScriptの学習</h1>
    <p>このページでJavaScriptを実行してみます。</p>

    <!-- 複数の外部JavaScriptファイルを読み込む -->
    <script src="script.js"></script>
    <script src="util.js"></script>
</body>
</html>
```

ブラウザで確認すると、両方のファイルのJavaScriptが順番に実行されることがわかります。ファイルは記述した順番で読み込まれるため、読み込み順序が重要な場合は注意が必要です。

## JavaScriptを記述するタイミングと実行順序

JavaScriptがいつ実行されるかを理解することは重要です。HTMLファイルは上から下に順番に読み込まれ、scriptタグに遭遇するとその場でJavaScriptが実行されます。

実行順序を確認するために、以下のような例を作成してみましょう。HTMLファイルを以下のように修正してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScriptの実行順序</title>

    <!-- 1番目：headタグ内のJavaScript -->
    <script>
        console.log("1. headタグ内のJavaScript");
    </script>
</head>
<body>
    <h1>JavaScriptの学習</h1>

    <!-- 2番目：body開始直後のJavaScript -->
    <script>
        console.log("2. body開始直後のJavaScript");
    </script>

    <p>このページでJavaScriptの実行順序を確認します。</p>

    <!-- 3番目：本文中のJavaScript -->
    <script>
        console.log("3. 本文中のJavaScript");
    </script>

    <!-- 4番目：body終了直前のJavaScript -->
    <script>
        console.log("4. body終了直前のJavaScript");
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開き、開発者ツールのコンソールを確認してください。メッセージが1から4の順番で表示されることがわかります。

```bash
1. headタグ内のJavaScript
2. body開始直後のJavaScript
3. 本文中のJavaScript
4. body終了直前のJavaScript
```

このように、JavaScriptはHTMLの読み込み順に実行されます。特に、HTML要素を操作するJavaScriptは、対象の要素が読み込まれた後に実行する必要があります。

この順序を理解することで、HTMLの要素を操作するJavaScriptをどこに配置すべきかが判断できるようになります。

## 最初のHello Worldを表示してみよう

それでは、JavaScriptでWebページ上に実際にメッセージを表示してみましょう。これまではコンソールにメッセージを表示していましたが、今度はWebページの内容を変更してみます。

新しいHTMLファイルを作成し、`hello-world.html`という名前で保存してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World with JavaScript</title>
</head>
<body>
    <h1>JavaScriptでHello World</h1>

    <!-- メッセージを表示する場所 -->
    <p id="message">ここにメッセージが表示されます</p>

    <script>
        // Hello Worldをコンソールに表示
        console.log("Hello, World!");

        // ページにメッセージを表示する関数
        function showMessage() {
            // id="message"の要素を取得
            let messageElement = document.getElementById("message");
            // 要素の内容を変更
            messageElement.textContent = "Hello, World! JavaScriptから表示されました！";
        }

        // ページ読み込み時に自動的にメッセージを表示
        showMessage();
    </script>
</body>
</html>
```

このコードでは、いくつかの新しい概念が登場しています。

まず、`document.getElementById("message")`は、HTMLの要素をJavaScriptから取得する方法です。`id="message"`が設定された要素を見つけて、JavaScriptで操作できるようにします。

次に、`textContent`プロパティを使って、要素の文字内容を変更しています。これにより、Webページ上の文字を動的に変更することができます。

また、`function showMessage()`は関数の定義です。関数は、特定の処理をまとめて名前を付けたもので、必要な時に呼び出すことができます。

最後に、ページが読み込まれると自動的に`showMessage()`関数が実行され、メッセージが表示されるようになっています。

ブラウザでファイルを開くと、「Hello, World! JavaScriptから表示されました！」というメッセージがページ上に表示されるはずです。

![メッセージを表示](/img/javascript/html_javascript_integration_hello_world.png)

## まとめ

本章では、HTMLファイルにJavaScriptを組み込む基本的な方法について学習しました。以下のポイントを理解できたことと思います。

- scriptタグを使ってHTMLファイル内にJavaScriptを直接記述する方法
- 外部ファイルとしてJavaScriptを作成し、HTMLから読み込む方法
- JavaScriptを記述する適切な場所とタイミングの考え方
- console.logを使ったコンソールへの出力方法
- document.getElementByIdを使ったHTML要素の取得と操作

これらの基本的な仕組みを理解することで、JavaScriptを使ってWebページに動きを加える準備が整いました。外部ファイルを使用することで、コードの管理がしやすくなり、より本格的な開発に近づくことができます。

次回は、VS CodeでJavaScriptファイルを効率的に作成・管理する方法について学んでいきます。
