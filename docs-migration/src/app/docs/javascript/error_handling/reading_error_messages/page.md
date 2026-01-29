---
title: エラーメッセージを読む習慣をつけよう
nextjs:
  metadata:
    title: エラーメッセージを読む習慣をつけよう
    description: JavaScriptのエラーメッセージの読み方とスタックトレースの見方を学び、デバッグのコツとGoogle検索での解決方法をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- エラーメッセージの読み方を理解する
- スタックトレースの見方を学ぶ
- デバッグのコツを習得する
- Google検索での解決方法を学ぶ

## はじめに

プログラミングを始めたばかりの頃は、エラーメッセージを見ると怖くなってしまうかもしれません。しかし、エラーメッセージは実はとても親切な情報なのです。

エラーメッセージは、「何が間違っているのか」「どこで問題が起きたのか」を教えてくれる大切な手がかりです。エラーメッセージを正しく読むことができれば、問題を素早く解決することができるようになります。

エラーメッセージを読む習慣を身につけることで、自分で問題を解決できるプログラマーになることができます。

## エラーメッセージの基本的な読み方

まずは、簡単なエラーメッセージから読み方を学んでみましょう。VS Codeで新しいHTMLファイル`error-reading-test.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エラーメッセージを読む練習</title>
</head>
<body>
    <h1>エラーメッセージを読む練習</h1>
    
    <script>
        try {
            console.log(myVariable);
        } catch (error) {
            console.log("エラーの種類: " + error.name);
            console.log("エラーメッセージ: " + error.message);
        }
    </script>
</body>
</html>
```

このコードを実行すると、以下のようなエラーメッセージが表示されます。

```
エラーの種類: ReferenceError
エラーメッセージ: myVariable is not defined
```

このエラーメッセージから分かることは、「myVariableという変数が定義されていないのに使おうとした」ということです。`is not defined`は「定義されていません」という意味です。とてもシンプルで分かりやすいメッセージですね。

## 変数名のスペルミスの場合

変数名のスペルを間違えた場合のエラーメッセージを見てみましょう。

```html
<script>
    const userName = "田中";
    
    try {
        console.log(userNmae); // スペルミス：aとmが逆
    } catch (error) {
        console.log("エラー: " + error.message);
    }
</script>
```

このコードを実行すると、以下のエラーが表示されます。

```
エラー: userNmae is not defined
```

`userNmae is not defined`というメッセージから、「userNmaeという変数が定義されていない」ことが分かります。でも実際には`userName`という変数は定義されているので、これはスペルミスだということに気づくことができます。

## 関数でないものを関数として呼び出した場合

文字列を関数として呼び出そうとした場合のエラーメッセージを確認してみましょう。

```html
<script>
    const message = "こんにちは";
    
    try {
        message(); // 文字列を関数として呼び出し
    } catch (error) {
        console.log("エラー: " + error.message);
    }
</script>
```

このコードを実行すると、以下のエラーが表示されます。

```
エラー: message is not a function
```

`message is not a function`は「messageは関数ではありません」という意味です。このメッセージを見れば、「あ、messageを関数として呼び出そうとしたけど、実際は文字列だったんだ」ということが分かります。

## Google検索で解決方法を探そう

分からないエラーに遭遇した時は、Google検索を活用しましょう。

```html
<script>
    try {
        const arr = "文字列";
        arr.push("要素"); // 文字列にpushメソッドは使えない
    } catch (error) {
        console.log("発生したエラー: " + error.message);
    }
</script>
```

このコードを実行すると、以下のエラーが表示されます。

```
発生したエラー: arr.push is not a function
```

このエラーメッセージをGoogleで検索してみましょう。検索キーワードは以下のようになります。

```
JavaScript arr.push is not a function
```

このように検索すると、同じ問題に遭遇した人の質問と回答を見つけることができます。多くの場合、「配列ではないものにpushメソッドを使おうとした」という解決策が見つかるはずです。

## まとめ

本章では、エラーメッセージを読む習慣について学びました。以下の内容を理解できたことと思います。

- エラーメッセージには問題の種類と内容が分かりやすく書かれている
- `is not defined`は「定義されていない」、`is not a function`は「関数ではない」という意味
- エラーメッセージを読めば、何が問題なのかがすぐに分かる
- Google検索でエラーメッセージを調べると解決策が見つかる

エラーメッセージは敵ではなく、問題解決のヒントをくれる味方です。エラーが出ても慌てずに、まずはメッセージをよく読んでみましょう。英語のメッセージも、実はとてもシンプルで理解しやすいものばかりです。