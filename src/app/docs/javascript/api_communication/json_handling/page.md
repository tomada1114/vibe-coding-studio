---
title: JSONデータを扱ってみよう
nextjs:
  metadata:
    title: JSONデータを扱ってみよう
    description: JavaScriptでJSONデータの読み取りと変換を学び、Web APIから取得したデータを適切に処理する方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- JSONとは何かを理解する
- JSON.parseとJSON.stringifyの使い方を習得する
- fetchで取得したJSONデータを実際に操作する方法を学ぶ

## はじめに

前の章でfetchを使ってデータを取得しましたが、そのときに`response.json()`という処理を使いました。この「JSON」とは一体何でしょうか。

**JSON**は「JavaScript Object Notation」の略で、データを保存したり、やり取りしたりするときの形式の一つです。現在のWebアプリケーションでは、サーバーとブラウザの間でデータをやり取りする際に、このJSON形式が最もよく使われています。

前回の fetchの例では `https://jsonplaceholder.typicode.com/posts/1` というサイトを使いましたが、こちらもJSON形式でデータを提供しています。

今回は、このJSONデータをどのように扱うかを学んでいきます。

## JSONとは何か

JSONは、データを文字列として表現する方法です。JavaScriptのオブジェクトと非常によく似た形をしていますが、すべてが**文字列**として記録されているという点が重要です。

例えば、以下のようなJavaScriptオブジェクトがあるとします。

```javascript
let person = {
    name: "田中太郎",
    age: 25
};
```

これをJSON形式で表現すると、以下のようになります。

```json
{
    "name": "田中太郎",
    "age": 25
}
```

見た目はほとんど同じですが、JSONでは**プロパティ名が必ず二重引用符で囲まれている**という違いがありますので、注意してください。

## JSON.parseでJSONをオブジェクトに変換

JSON文字列を実際に使えるJavaScriptオブジェクトに変換するには、`JSON.parse()`というメソッドを使います。

VS Codeで`json-example.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON の練習</title>
</head>
<body>
    <h1>JSONデータの練習</h1>

    <script>
        // JSON文字列の例
        let jsonString = '{"name": "田中太郎", "age": 25}';

        console.log('JSON文字列:', jsonString);
        console.log('データの型:', typeof jsonString);

        // JSON文字列をオブジェクトに変換
        let personObject = JSON.parse(jsonString);

        console.log('変換後のオブジェクト:', personObject);
        console.log('データの型:', typeof personObject);
        console.log('名前:', personObject.name);
        console.log('年齢:', personObject.age);
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、開発者ツールのConsoleタブを確認してください。以下のような結果が表示されます。

```
JSON文字列: {"name": "田中太郎", "age": 25}
データの型: string
変換後のオブジェクト: {name: '田中太郎', age: 25}
データの型: object
名前: 田中太郎
年齢: 25
```

最初、JSON文字列は`typeof`で確認すると「string」と表示されます。この状態では、中のデータを個別に取り出すことはできません。

しかし、`JSON.parse()`を使うことで、文字列だったJSONが普通のJavaScriptオブジェクトになり、`personObject.name`や`personObject.age`のようにプロパティにアクセスできるようになります。

## JSON.stringifyでオブジェクトをJSONに変換

今度は逆の操作を見てみましょう。JavaScriptオブジェクトをJSON文字列に変換するには、`JSON.stringify()`を使います。

先ほどのHTMLファイルのscriptタグ内に、以下のコードを追加してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON の練習</title>
</head>
<body>
    <h1>JSONデータの練習</h1>

    <script>
        // JSON文字列の例
        let jsonString = '{"name": "田中太郎", "age": 25}';

        console.log('=== JSON文字列からオブジェクトへ ===');
        console.log('JSON文字列:', jsonString);
        console.log('データの型:', typeof jsonString);

        // JSON文字列をオブジェクトに変換
        let personObject = JSON.parse(jsonString);

        console.log('変換後のオブジェクト:', personObject);
        console.log('データの型:', typeof personObject);
        console.log('名前:', personObject.name);

        // 追加部分：オブジェクトからJSONへの変換
        console.log('=== オブジェクトからJSON文字列へ ===');

        // JavaScriptオブジェクトを作成
        let newPerson = {
            name: "佐藤花子",
            age: 30
        };

        console.log('元のオブジェクト:', newPerson);
        console.log('データの型:', typeof newPerson);

        // オブジェクトをJSON文字列に変換
        let newJsonString = JSON.stringify(newPerson);

        console.log('JSON文字列に変換:', newJsonString);
        console.log('変換後のデータの型:', typeof newJsonString);
    </script>
</body>
</html>
```

ブラウザでページを再読み込みして、コンソールを確認してください。以下のような結果が表示されます。

```
=== JSON文字列からオブジェクトへ ===
JSON文字列: {"name": "田中太郎", "age": 25}
データの型: string
変換後のオブジェクト: {name: '田中太郎', age: 25}
データの型: object
名前: 田中太郎
=== オブジェクトからJSON文字列へ ===
元のオブジェクト: {name: '佐藤花子', age: 30}
データの型: object
JSON文字列に変換: {"name":"佐藤花子","age":30}
変換後のデータの型: string
```

`JSON.stringify()`は、JavaScriptオブジェクトをJSON形式の文字列に変換してくれます。この機能は、データをサーバーに送信する際などによく使われます。

## fetchとJSONを組み合わせた実践例

これまで学んだJSONの知識を使って、fetchで取得したデータをより詳しく見てみましょう。新しく`fetch-json.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fetch と JSON の組み合わせ</title>
</head>
<body>
    <h1>APIから取得したJSONデータの確認</h1>

    <script>
        console.log('fetchでデータを取得中...');

        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(function(response) {
                console.log('レスポンスを受信しました');
                return response.json(); // これは内部でJSON.parse()を実行している
            })
            .then(function(userData) {
                console.log('取得したユーザーデータ:', userData);
                console.log('データの型:', typeof userData);
                console.log('名前:', userData.name);
                console.log('メール:', userData.email);

                // 取得したデータをJSON文字列に戻してみる
                let jsonString = JSON.stringify(userData);
                console.log('JSON文字列に変換:', jsonString);
            })
            .catch(function(error) {
                console.log('エラーが発生しました:', error);
            });
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、コンソールを確認してください。以下のような結果が表示されます。

```
fetchでデータを取得中...
レスポンスを受信しました
取得したユーザーデータ: {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}
データの型: object
名前: Leanne Graham
メール: Sincere@april.biz
JSON文字列に変換: {"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz",...}
```

この例では、`response.json()`を使っています。これは内部で自動的に`JSON.parse()`を実行してくれるので、取得したJSONデータが既にJavaScriptオブジェクトとして使える状態になっています。

## JSONエラーの対処

JSONを扱う際は、データが正しい形式でない場合にエラーが発生することがあります。簡単な例で確認してみましょう。

新しく`json-error.html`というファイルを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON エラーの例</title>
</head>
<body>
    <h1>JSONエラーの確認</h1>

    <script>
        // 正しいJSONの例
        let validJson = '{"name": "田中太郎", "age": 25}';
        console.log('正しいJSON:', validJson);
        console.log('パース結果:', JSON.parse(validJson));

        // 間違ったJSONの例（プロパティ名に引用符がない）
        let invalidJson = '{name: "田中太郎", age: 25}';
        console.log('間違ったJSON:', invalidJson);

        try {
            JSON.parse(invalidJson);
        } catch (error) {
            console.log('エラーが発生:', error.message);
        }

        // 安全なJSONパース関数
        function safeJsonParse(jsonString) {
            try {
                return JSON.parse(jsonString);
            } catch (error) {
                console.log('JSONの解析に失敗:', error.message);
                return null;
            }
        }

        console.log('安全なパース（正しいJSON）:', safeJsonParse(validJson));
        console.log('安全なパース（間違ったJSON）:', safeJsonParse(invalidJson));
    </script>
</body>
</html>
```

このファイルをブラウザで開いて、コンソールを確認してください。以下のような結果が表示されます。

```
正しいJSON: {"name": "田中太郎", "age": 25}
パース結果: {name: '田中太郎', age: 25}
間違ったJSON: {name: "田中太郎", age: 25}
エラーが発生: Unexpected token n in JSON at position 1
安全なパース（正しいJSON）: {name: '田中太郎', age: 25}
JSONの解析に失敗: Unexpected token n in JSON at position 1
安全なパース（間違ったJSON）: null
```

JSON文字列が正しい形式でない場合、`JSON.parse()`はエラーを発生させます。そのため、外部から取得したデータをパースする際は、`try-catch`文を使ってエラーハンドリングを行うことが重要です。

## まとめ

本章では、JSONデータの扱い方について学びました。以下のポイントを理解できたことと思います。

- JSONはJavaScriptオブジェクトに似た形式の文字列データ
- `JSON.parse()`でJSON文字列をJavaScriptオブジェクトに変換できる
- `JSON.stringify()`でJavaScriptオブジェクトをJSON文字列に変換できる
- `response.json()`は内部で`JSON.parse()`を実行している
- JSON解析時はエラーハンドリングが重要

JSONは現代のWeb開発において必須の知識です。次の章では、取得したデータを画面に表示する方法について学んでいきましょう。
