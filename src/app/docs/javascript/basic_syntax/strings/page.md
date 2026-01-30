---
title: 文字列を操作してみよう
nextjs:
  metadata:
    title: 文字列を操作してみよう
    description: JavaScriptで文字列データを扱う方法を学び、文字列の結合、テンプレートリテラル、長さの取得、部分取得、よく使うメソッドを習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 文字列の基本的な作成方法を理解する
- 文字列の結合とテンプレートリテラルの使い方を習得する
- 文字列の長さと部分取得の方法を学ぶ
- よく使う文字列メソッドを身につける

## はじめに

Webアプリケーションでは、ユーザーの名前、商品の説明、メッセージの表示など、文字列を扱う場面が非常に多くあります。

JavaScriptでは、文字列を簡単に作成したり、複数の文字列を組み合わせたり、文字列の一部分を取り出したりできます。

ユーザー登録フォームやチャットアプリなど、文字列の操作はWebアプリケーションの基本的な機能です。

この章では、JavaScriptで文字列を扱う様々な方法を、実用的な例を通して学んでいきましょう。

## 文字列の基本的な作成方法

### クォーテーションを使った文字列作成

JavaScriptで文字列を作るには、文字をクォーテーション（引用符）で囲みます。

VS Codeで新しいファイル`strings.html`を作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>文字列の練習</title>
</head>
<body>
    <h1>文字列操作の練習</h1>
    
    <script>
        let message1 = "こんにちは";
        let message2 = 'おはよう';
        
        console.log(message1);
        console.log(message2);
    </script>
</body>
</html>
```

実行結果:
```
こんにちは
おはよう
```

文字列を作る時は、ダブルクォーテーション（`""`）またはシングルクォーテーション（`'`）のどちらでも使えます。

ファイルを保存してブラウザで開き、コンソールを確認してみてください。

どちらのクォーテーションを使っても、同じように文字列が表示されることが分かります。

一般的には、どちらか一方に統一して使うことが推奨されています。

### 文字列の中にクォーテーションを含める

文字列の中にクォーテーション自体を含めたい場合は、異なる種類のクォーテーションを使い分けます。

```html
<script>
    let quote1 = "彼は'こんにちは'と言いました";
    let quote2 = '彼女は"ありがとう"と答えました';
    
    console.log(quote1);
    console.log(quote2);
</script>
```

実行結果:
```
彼は'こんにちは'と言いました
彼女は"ありがとう"と答えました
```

外側にダブルクォーテーションを使う場合は中にシングルクォーテーションを、外側にシングルクォーテーションを使う場合は中にダブルクォーテーションを含めることができます。

このような使い分けにより、会話文や引用文を自然に表現できます。

## 文字列の結合とテンプレートリテラル

### プラス記号を使った文字列結合

複数の文字列や変数を組み合わせるには、`+`記号を使います。

```html
<script>
    let firstName = "田中";
    let lastName = "太郎";
    let fullName = firstName + lastName;
    
    console.log("姓: " + firstName);
    console.log("名: " + lastName);
    console.log("フルネーム: " + fullName);
</script>
```

実行結果:
```
姓: 田中
名: 太郎
フルネーム: 田中太郎
```

`+`記号を使うことで、変数に保存された文字列同士を簡単につなげることができます。

この例では、姓と名を別々の変数に保存しておき、必要に応じて組み合わせてフルネームを作成しています。

ユーザー情報の表示や、動的なメッセージ作成でよく使われる方法です。

### より読みやすい結合方法

文字列と変数を組み合わせる時は、空白や区切り文字を追加することが多くあります。

```html
<script>
    let userName = "佐藤";
    let userAge = 25;
    let userCity = "東京";
    
    let introduction = userName + "さんは" + userAge + "歳で、" + userCity + "に住んでいます。";
    
    console.log(introduction);
</script>
```

実行結果:
```
佐藤さんは25歳で、東京に住んでいます。
```

この方法でも正しく動作しますが、`+`記号が多くなると読みにくくなってしまいます。

そこで、より読みやすい方法として、テンプレートリテラルという書き方があります。

### テンプレートリテラルを使った文字列作成

テンプレートリテラルは、バッククォート（`）で文字列を囲み、`${}`の中に変数を書く方法です。

```html
<script>
    let productName = "ノートパソコン";
    let productPrice = 89800;
    let stockCount = 5;
    
    let productInfo = `商品名: ${productName}、価格: ${productPrice}円、在庫: ${stockCount}台`;
    
    console.log(productInfo);
</script>
```

実行結果:
```
商品名: ノートパソコン、価格: 89800円、在庫: 5台
```

テンプレートリテラルを使うと、文字列の中に直接変数を埋め込むことができ、非常に読みやすくなります。

`${}`の中には変数だけでなく、計算式を書くこともできるため、動的な文字列作成に便利です。

ショッピングサイトの商品表示や、ユーザー向けメッセージの作成でよく使われる手法です。

## 文字列の長さと部分取得

### 文字列の長さを調べる

文字列が何文字あるかを調べるには、`length`プロパティを使います。

```html
<script>
    let message = "こんにちは、世界！";
    let messageLength = message.length;
    
    console.log("メッセージ: " + message);
    console.log("文字数: " + messageLength);
</script>
```

実行結果:
```
メッセージ: こんにちは、世界！
文字数: 8
```

`length`プロパティは、文字列に含まれる文字の数を返してくれます。

この機能は、パスワードの文字数チェックや、ツイートの文字数制限など、文字数に制限がある場面でよく使われます。

### 文字列の一部を取り出す

文字列の特定の部分だけを取り出したい場合は、`slice()`メソッドを使います。

```html
<script>
    let fullText = "JavaScriptプログラミング";
    
    let part1 = fullText.slice(0, 10);  // 最初から10文字目まで
    let part2 = fullText.slice(10);     // 11文字目から最後まで
    
    console.log("元の文字列: " + fullText);
    console.log("前半部分: " + part1);
    console.log("後半部分: " + part2);
</script>
```

実行結果:
```
元の文字列: JavaScriptプログラミング
前半部分: JavaScript
後半部分: プログラミング
```

`slice()`メソッドは、開始位置と終了位置を指定して、文字列の一部分を切り出すことができます。

文字の位置は0から始まるため、最初の文字は0番目、2番目の文字は1番目となります。

長いテキストから必要な部分だけを表示したり、ファイル名から拡張子を取り出したりする際に便利です。

### 特定の文字が含まれているかを調べる

文字列の中に特定の文字や単語が含まれているかを調べることもできます。

```html
<script>
    let email = "user@example.com";
    let hasAtMark = email.includes("@");
    let hasDotCom = email.includes(".com");
    
    console.log("メールアドレス: " + email);
    console.log("@マークが含まれている: " + hasAtMark);
    console.log(".comが含まれている: " + hasDotCom);
</script>
```

実行結果:
```
メールアドレス: user@example.com
@マークが含まれている: true
.comが含まれている: true
```

`includes()`メソッドは、指定した文字列が含まれている場合は`true`、含まれていない場合は`false`を返します。

メールアドレスの形式チェックや、検索機能の実装など、文字列の内容を確認する場面で重宝します。

## よく使う文字列メソッド

### 大文字・小文字の変換

文字列の大文字と小文字を変換するメソッドもよく使われます。

```html
<script>
    let originalText = "Hello World";
    
    let upperText = originalText.toUpperCase();
    let lowerText = originalText.toLowerCase();
    
    console.log("元の文字列: " + originalText);
    console.log("大文字に変換: " + upperText);
    console.log("小文字に変換: " + lowerText);
</script>
```

実行結果:
```
元の文字列: Hello World
大文字に変換: HELLO WORLD
小文字に変換: hello world
```

`toUpperCase()`は全て大文字に、`toLowerCase()`は全て小文字に変換してくれます。

ユーザーが入力した文字列を統一的に処理したり、英語のシステムで大文字小文字を区別しない検索を行う際に使われます。

### 空白文字の削除

文字列の前後にある余分な空白を削除したい場合は、`trim()`メソッドを使います。

```html
<script>
    let userInput = "   こんにちは   ";
    let cleanInput = userInput.trim();
    
    console.log("入力された文字列: '" + userInput + "'");
    console.log("空白削除後: '" + cleanInput + "'");
</script>
```

実行結果:
```
入力された文字列: '   こんにちは   '
空白削除後: 'こんにちは'
```

`trim()`メソッドは、文字列の最初と最後にある空白文字（スペース、タブ、改行など）を取り除いてくれます。

ユーザーがフォームに入力したデータを処理する際、意図しない空白を除去するためによく使われる重要な機能です。

### 文字列の置き換え

文字列の中の特定の部分を別の文字列に置き換えることもできます。

```html
<script>
    let originalMessage = "今日は雨です";
    let newMessage = originalMessage.replace("雨", "晴れ");
    
    console.log("元のメッセージ: " + originalMessage);
    console.log("置き換え後: " + newMessage);
</script>
```

実行結果:
```
元のメッセージ: 今日は雨です
置き換え後: 今日は晴れです
```

`replace()`メソッドは、最初に見つかった指定の文字列を新しい文字列に置き換えます。

ユーザー名の表示や、テンプレート文字列のカスタマイズなど、動的にメッセージを変更する場面で活用できます。

## まとめ

本章では、JavaScriptでの文字列操作について学びました。以下の内容を理解できたことと思います。

- クォーテーションを使って文字列を作成し、`+`やテンプレートリテラルで結合できる
- `length`プロパティで文字数を取得し、`slice()`で部分文字列を抽出できる
- `includes()`で文字列の検索、`toUpperCase()`や`toLowerCase()`で大文字小文字変換ができる
- `trim()`で空白削除、`replace()`で文字列置換などの便利な操作ができる

文字列の操作は、ユーザーとのやり取りやデータ処理において必須のスキルです。

フォーム入力の処理、検索機能、メッセージ表示など、様々な場面で今回学んだ知識を活用できるでしょう。

次回は、文字列や数値とは異なる特殊なデータ型であるシンボルについて学んでいきます。