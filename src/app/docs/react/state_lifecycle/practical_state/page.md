---
title: 実践的なuseStateの活用
nextjs:
  metadata:
    title: 実践的なuseStateの活用
    description: ReactのuseStateを使って文字列入力の状態管理を学び、controlledコンポーネントとe.target.valueの基本的な使い方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 文字列のStateを管理する方法を理解する
- controlledコンポーネントの概念を学ぶ
- e.target.valueを使った入力値の取得方法を習得する
- onChangeイベントの基本的な使い方を身につける

## はじめに

前回の章では、数値を扱うシンプルなカウンターアプリを作成しました。しかし、実際のWebアプリケーションでは、ユーザーが文字を入力したり、その内容を画面に表示したりする場面がよくあります。

例えば、お問い合わせフォームで名前を入力したり、検索ボックスにキーワードを入力したりといった機能です。こうした入力を扱うためには、文字列のStateを管理する必要があります。

本章では、シンプルなメッセージ入力アプリを作りながら、文字列のStateとフォーム入力の基本的な扱い方を学んでいきましょう。

## メッセージ入力アプリを作ろう

ユーザーがメッセージを入力すると、そのメッセージがリアルタイムで画面に表示されるアプリを作ってみましょう。新しいファイル`src/MessageApp.jsx`を作成し、以下のコードを入力してください。

```jsx
import { useState } from 'react';

function MessageApp() {
  // 入力されたメッセージを管理するState
  const [message, setMessage] = useState('');

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">メッセージアプリ</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          メッセージを入力してください
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="こんにちは！今日はいい天気ですね。"
        />
      </div>

      <div className="p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-bold mb-2">入力されたメッセージ</h3>
        <p className="text-blue-600">{message}</p>
        <p className="text-sm text-gray-500 mt-2">
          文字数: {message.length}文字
        </p>
      </div>
    </div>
  );
}

export default MessageApp;
```

このコードでは、`useState`を使って文字列のStateを管理しています。カウンターアプリでは数値を扱いましたが、今度は文字列を扱っているのが大きな違いです。

中身について、ポイントで詳しく解説していきます。

### 文字列Stateの基本

```jsx
const [message, setMessage] = useState('');
```

ここでは、初期値として空の文字列（`''`）を設定しています。数値の場合は`useState(0)`でしたが、文字列の場合は`useState('')`となります。

`message`には現在入力されている文字列が保存され、`setMessage`を使って文字列を更新できます。

### controlledコンポーネントとは

このアプリの中心となるのは、textarea要素の書き方です。

```jsx
<textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  // その他の属性...
/>
```

この書き方は**controlledコンポーネント**と呼ばれるReactの重要な概念です。通常のHTML入力欄では、ブラウザが入力値を管理しますが、Reactでは以下のように動作します。

- `value={message}`: 入力欄の値をStateで管理する
- `onChange={(e) => setMessage(e.target.value)}`: 入力が変更されるたびにStateを更新する

この仕組みにより、入力欄の値は常にStateの値と同期されます。ユーザーが文字を入力するたびに、次のような流れで処理が行われます。

1. ユーザーが文字を入力
2. `onChange`イベントが発生
3. `setMessage`でStateが更新
4. コンポーネントが再レンダリング
5. 新しい値が入力欄と表示欄に反映

### e.target.valueの仕組み

`onChange`で使われている部分を詳しく見てみましょう。

```jsx
onChange={(e) => setMessage(e.target.value)}
```

ここで使われている`e`は**イベントオブジェクト**です。これは、ユーザーが何かアクションを起こしたときに、そのアクションに関する情報を含んだオブジェクトです。

- `e.target`: イベントが発生した要素（この場合はtextarea要素）
- `e.target.value`: その要素の現在の値（ユーザーが入力した文字列）

つまり、`e.target.value`でユーザーが入力した最新の文字列を取得し、それを`setMessage`に渡してStateを更新しているのです。

### リアルタイム表示の実現

アプリの下部では、入力された内容をリアルタイムで表示しています。

```jsx
<div className="p-4 bg-gray-100 rounded-md">
  <h3 className="text-lg font-bold mb-2">入力されたメッセージ</h3>
  <p className="text-blue-600">{message}</p>
  <p className="text-sm text-gray-500 mt-2">
    文字数: {message.length}文字
  </p>
</div>
```

`{message}`でStateの値を表示し、`{message.length}`で文字数をカウントして表示しています。Stateが更新されるたびに、これらの表示も自動的に更新されます。

## App.jsでコンポーネントを表示する

作成したコンポーネントを表示するために、`App.jsx`を以下のように更新しましょう。

```jsx
import MessageApp from './MessageApp'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">文字列State の練習</h1>
        <MessageApp />
      </div>
    </div>
  )
}

export default App
```

開発サーバーを起動して、ブラウザで確認してみましょう。

```bash
npm run dev
```

テキストエリアに文字を入力すると、その内容がリアルタイムで下の欄に表示されることが確認できるはずです。また、文字数も自動的にカウントされます。

![メッセージアプリの画面](/img/react/message_app_initial.png)

![入力後のメッセージアプリの画面](/img/react/message_app_input.png)


## 使っている技術のポイント

では、今回の学習内容をポイントごとにまとめておきます。

まず、文字列のStateを管理するために`useState`を使いました。

```jsx
const [message, setMessage] = useState('');
```
ここで、初期値として空の文字列を設定しています。これにより、`message`には現在の入力内容が保存され、`setMessage`を使って更新できます。
次に、入力フォームをcontrolledコンポーネントとして実装しました。

```jsx
<textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  // その他の属性...
/>
```
このように、`value`属性でStateの値を指定し、`onChange`イベントで入力内容を更新します。これにより、Reactが入力フォームの状態を完全に管理します。
最後に、`e.target.value`を使ってユーザーの入力値を取得しました。

```jsx
onChange={(e) => setMessage(e.target.value)}
```
ここで、`e`はイベントオブジェクトで、`e.target`はイベントが発生した要素（この場合はtextarea）を指します。`e.target.value`でその要素の現在の値を取得し、Stateを更新しています。

これにより、ユーザーが入力した内容がリアルタイムでStateに反映され、画面にも表示される仕組みが完成しています。

## まとめ

本章では、文字列のStateを使った実践的なアプリケーションについて学習しました。以下のポイントを理解できたことと思います。

- 文字列のStateを`useState('')`で初期化し、管理する方法を学びました
- controlledコンポーネントによる入力フォームの管理方法を理解しました
- `e.target.value`を使ってユーザーの入力値を取得する方法を習得しました
- `onChange`イベントを使ってリアルタイムに画面を更新する仕組みを学びました

特に重要なのは、`value`、`onChange`、`e.target.value`の組み合わせです。この基本パターンを理解することで、様々な入力フォームを扱えるようになります。

数値のStateでも文字列のStateでも、Reactの基本的な仕組みは同じです。Stateが更新されると再レンダリングが起こり、最新の値で画面が更新されるという流れは変わりません。

次の章では、コンポーネントのライフサイクルと副作用を管理する`useEffect`について学習していきます。
