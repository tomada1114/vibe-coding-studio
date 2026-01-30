---
title: 型安全なAPI通信を実装しよう
nextjs:
  metadata:
    title: 型安全なAPI通信を実装しよう
    description: TypeScriptでAPIからのデータを型安全に取得・処理する方法を学び、実際のWeb開発で使える技術を習得します。fetch APIと型定義を組み合わせた実装方法を理解しましょう。
---

## 学習の目標

本章では、以下の内容を学習します。

- API通信とは何かを理解する
- `fetch` APIを使ったデータ取得の基本的な流れを学ぶ
- APIから取得するデータに対する型定義の方法を習得する
- TypeScriptでエラーハンドリングを含む安全なAPI通信を実装する
- 型安全性がもたらすメリットを体験する

## はじめに

これまでの章では、TypeScriptの基本的な型システムについて学んできました。
今回は、これらの知識を活用して、実際のWeb開発でよく使われる**API通信**を型安全に実装する方法を学んでいきましょう。

API通信とは、外部のサーバーからデータを取得したり、データを送信したりする仕組みのことです。
例えば、天気予報アプリで天気情報を取得したり、SNSアプリで投稿を表示したりする際に、APIを通じてデータをやり取りします。

TypeScriptを使うことで、APIから取得するデータの構造を事前に定義でき、より安全で保守性の高いコードを書くことができます。
今回は、シンプルなサンプルAPIを使って、この仕組みを一緒に体験してみましょう。

## APIとは何か

まず、APIについて簡単に説明しておきましょう。

**API**（Application Programming Interface）は、異なるソフトウェア同士がデータをやり取りするための仕組みです。
Web開発の文脈では、通常「Web API」のことを指し、インターネット経由でデータを取得したり送信したりできるサービスのことを言います。

例えば、以下のようなURLにアクセスすると、JSON形式でデータが返ってきます。

```
https://jsonplaceholder.typicode.com/users/1
```

このURLは、ダミーデータを提供してくれるテスト用のAPIです。
実際にブラウザでこのURLにアクセスしてみると、ユーザー情報がJSON形式で表示されることが確認できます。

このように、特定のURLにリクエストを送ることで、サーバーからデータを取得できる仕組みがAPIです。

## プロジェクトの準備

それでは、実際にTypeScriptでAPI通信を実装してみましょう。
まず、HTMLファイルとTypeScriptファイルを準備します。

この章のサンプルコードは **ブラウザ環境** での実行を想定しています。`fetch` APIやDOM操作を使用するため、Node.js環境では一部のコードが動作しません。WebブラウザでHTMLファイルを開いて実行してください。

VS Codeで新しいフォルダを作成し、以下のファイルを作成してください。

### index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript API通信</title>
</head>
<body>
    <h1>ユーザー情報取得</h1>
    <button id="fetchButton">ユーザー情報を取得</button>
    <div id="userInfo"></div>

    <script src="api-fetch.js"></script>
</body>
</html>
```

このHTMLファイルは、ユーザー情報を取得するためのボタンと、取得した情報を表示する領域を持っています。
ボタンをクリックすると、TypeScriptで書いたAPI通信の処理が実行される仕組みです。

## APIレスポンスの型定義

次に、APIから取得するデータの型を定義しましょう。
`api-fetch.ts`というファイルを作成し、まずは型定義から書いていきます。

```typescript
// APIから取得するユーザー情報の型定義
interface User {
  id: number;
  name: string;
  email: string;
}
```

この`User`インターフェースは、APIから取得するユーザー情報の構造を表しています。
実際のAPIレスポンスには他にも多くのプロパティが含まれていますが、今回は学習のためにシンプルに3つのプロパティだけを定義しました。

型を事前に定義することで、後の処理でどのようなデータが扱えるかが明確になり、コードの安全性が向上します。

## fetch APIを使った基本的なデータ取得

続いて、`fetch` APIを使ってデータを取得する関数を実装しましょう。
先ほどのファイルに以下のコードを追加してください。

```typescript
// APIから取得するユーザー情報の型定義
// 実際のAPIレスポンスには他にも多くのフィールドがありますが、
// 必要最小限のプロパティのみを定義することで型安全性を確保
interface User {
  id: number;      // ユーザーの一意識別子
  name: string;    // ユーザーの表示名
  email: string;   // メールアドレス（文字列形式）
}

// ユーザー情報を取得する関数
// 引数: userId - 取得するユーザーのID（数値）
// 戻り値: Promise<User> - User型のオブジェクトを返すPromise
async function fetchUser(userId: number): Promise<User> {
  try {
    // 外部APIにHTTPリクエストを送信
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // HTTPステータスコードを確認（200-299番台以外はエラー）
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ユーザー情報の取得に失敗しました`);
    }

    // レスポンスボディをJSONとして解析
    const userData = await response.json();

    // 型安全性を確保するための実行時検証
    // APIレスポンスが期待する形式であることを確認
    if (typeof userData.id !== 'number' || typeof userData.name !== 'string' || typeof userData.email !== 'string') {
      throw new Error('APIからの応答形式が不正です');
    }

    // 必要なプロパティだけを抽出してUser型として返す
    // これにより不要なプロパティを除外し、型安全性を確保
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email
    };
  } catch (error) {
    // エラー内容をコンソールに出力（デバッグ用）
    console.error('ユーザー取得エラー:', error);
    // 型安全なエラー再スロー
    throw error instanceof Error ? error : new Error('不明なエラーが発生しました');
  }
}
```

この改良された`fetchUser`関数では、いくつか重要なポイントがあります。

まず、関数の戻り値の型を`Promise<User>`と指定しています。
これは、この関数が非同期処理で、最終的に`User`型のデータを返すことを意味しています。

次に、`try-catch`文を使って包括的なエラーハンドリングを実装しています。
これにより、ネットワークエラーやその他の予期しないエラーに対しても適切に対応できます。

`response.ok`をチェックし、HTTPステータスコードも含めた詳細なエラーメッセージを提供しています。
これは、デバッグ時に問題の原因を特定しやすくするためです。

重要な改良点として、APIからの応答データの型検証を追加しています。
外部APIからのデータは常に期待通りの形式とは限らないため、実行時に型安全性を確保することが重要です。

最後に、エラーハンドリングでは`error instanceof Error`チェックを使用して、適切に型付けされたエラーメッセージを提供しています。
この部分で型安全性が確保され、定義していないプロパティにアクセスしようとするとTypeScriptがエラーを出してくれます。

## ユーザーインターフェースとの連携

続いて、HTMLのボタンクリックイベントと連携する処理を追加しましょう。

```typescript
// APIから取得するユーザー情報の型定義
interface User {
  id: number;
  name: string;
  email: string;
}

// ユーザー情報を取得する関数
async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  if (!response.ok) {
    throw new Error('ユーザー情報の取得に失敗しました');
  }

  const userData = await response.json();

  // 必要なプロパティだけを抽出して返す
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email
  };
}

// ここから追加
// ユーザー情報を画面に表示する関数
function displayUser(user: User): void {
  const userInfoDiv = document.getElementById('userInfo');
  if (userInfoDiv) {
    userInfoDiv.innerHTML = `
      <h2>ユーザー情報</h2>
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>名前:</strong> ${user.name}</p>
      <p><strong>メール:</strong> ${user.email}</p>
    `;
  }
}

// ボタンクリックイベントの処理
async function handleFetchUser(): Promise<void> {
  try {
    const user = await fetchUser(1); // ユーザーID 1 の情報を取得
    displayUser(user);
  } catch (error) {
    console.error('エラーが発生しました:', error);
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
      userInfoDiv.innerHTML = '<p style="color: red;">ユーザー情報の取得に失敗しました</p>';
    }
  }
}

// ページ読み込み完了後にイベントリスナーを設定
document.addEventListener('DOMContentLoaded', () => {
  const fetchButton = document.getElementById('fetchButton');
  if (fetchButton) {
    fetchButton.addEventListener('click', handleFetchUser);
  }
});
```

この追加コードでは、以下の機能を実装しています。

`displayUser`関数は、取得したユーザー情報を画面に表示するための関数です。
引数として`User`型のデータを受け取り、HTMLの要素に情報を表示します。

`handleFetchUser`関数は、ボタンがクリックされた時の処理をまとめた関数です。
`try-catch`文を使ってエラーハンドリングを行い、API通信が失敗した場合でもアプリケーションがクラッシュしないようにしています。

最後の部分では、ページの読み込みが完了した後にボタンのクリックイベントを設定しています。
これにより、ユーザーがボタンをクリックするとAPI通信が実行される仕組みが完成します。

## TypeScriptファイルのコンパイル

作成したTypeScriptファイルをJavaScriptにコンパイルしましょう。
VS Codeのターミナルで以下のコマンドを実行してください。

```bash
tsc api-fetch.ts
```

コンパイルが成功すると、`api-fetch.js`ファイルが生成されます。
このJavaScriptファイルがHTMLから読み込まれて実行されます。

## 動作確認

それでは、実際にブラウザで動作を確認してみましょう。

`index.html`をブラウザで開き、「ユーザー情報を取得」ボタンをクリックしてみてください。
正常に動作すれば、以下のような情報が表示されるはずです。

```
ユーザー情報
ID: 1
名前: Leanne Graham
メール: Sincere@april.biz
```

また、ブラウザの開発者ツールを開いて「ネットワーク」タブを確認すると、実際にAPIへのリクエストが送信されていることも確認できます。

## 型安全性のメリットを体験

TypeScriptを使うことで得られる型安全性のメリットを実際に体験してみましょう。

例えば、`displayUser`関数で存在しないプロパティにアクセスしようとした場合、TypeScriptがエラーを検出してくれます。

```typescript
function displayUser(user: User): void {
  const userInfoDiv = document.getElementById('userInfo');
  if (userInfoDiv) {
    userInfoDiv.innerHTML = `
      <h2>ユーザー情報</h2>
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>名前:</strong> ${user.name}</p>
      <p><strong>メール:</strong> ${user.email}</p>
      <p><strong>住所:</strong> ${user.address}</p> // このプロパティは User 型に存在しないためエラー
    `;
  }
}
```

このように、TypeScriptは定義していないプロパティへのアクセスを防いでくれるため、実行時エラーを事前に発見できます。

また、関数の引数の型も厳密にチェックされるため、間違った型のデータを渡してしまうミスも防げます。

```typescript
displayUser("文字列"); // エラー: User型ではない
displayUser(123);      // エラー: User型ではない
```

## エラーハンドリングの重要性

API通信では、ネットワークエラーやサーバーエラーなど、様々な理由で処理が失敗する可能性があります。
そのため、適切なエラーハンドリングを実装することが重要です。

今回の実装では、以下の点でエラーハンドリングを行っています。

まず、`response.ok`をチェックして、HTTPステータスコードが成功を示している場合のみ処理を続行しています。
これにより、サーバーエラー（404や500番台のエラーなど）を適切に検出できます。

次に、`try-catch`文を使って、API通信全体をエラーハンドリングの対象にしています。
これにより、ネットワークエラーやその他の予期しないエラーが発生した場合でも、アプリケーションが適切に動作し続けることができます。

最後に、エラーが発生した場合はユーザーにわかりやすいメッセージを表示するようにしています。
ただエラーを隠すのではなく、何が起こったかをユーザーに伝えることで、より良いユーザー体験を提供できます。

## まとめ

本章では、TypeScriptを使った型安全なAPI通信について学びました。
以下のポイントを理解できたことと思います。

TypeScriptでは、APIから取得するデータの構造を事前にインターフェースで定義することで、型安全なコードを書くことができます。
これにより、存在しないプロパティへのアクセスや、間違った型のデータの使用を防ぐことができます。

`fetch` APIと`async/await`を組み合わせることで、読みやすく保守しやすい非同期処理を実装できます。
また、適切なエラーハンドリングを行うことで、ネットワークエラーやサーバーエラーに対しても堅牢なアプリケーションを作ることができます。

型定義を活用することで、コードの可読性と保守性が大幅に向上し、チーム開発においても安全で効率的な開発を進めることができるようになります。
