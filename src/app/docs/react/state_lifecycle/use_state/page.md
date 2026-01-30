---
title: useStateでコンポーネントの状態を管理しよう
nextjs:
  metadata:
    title: useStateでコンポーネントの状態を管理しよう
    description: ReactのuseStateフックを使ってコンポーネントの状態を管理する方法を学び、カウンターアプリを通じて実践的な使い方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- Stateの基本概念と役割を理解する
- useStateフックの基本的な使い方を習得する
- コンポーネントの再描画の仕組みを理解する
- prevを使った状態更新の安全な方法を学ぶ
- カウンターアプリの実装を通じて実践的な活用方法を習得する

## はじめに

これまでは静的なコンポーネントを作成してきましたが、実際のWebアプリケーションでは、ユーザーの操作に応じて画面の内容が変わる必要があります。

例えば、ボタンをクリックしたら数字が増えたり、フォームに入力した内容が画面に反映されたりといった動的な処理です。こうした「変化する値」を管理するための仕組みが **State（状態）** です。

ReactではStateを管理するために`useState`というフックを使います。フックとは、Reactの機能を関数コンポーネントで使えるようにするための特別な関数のことです。

それでは、具体的な例を見ながら`useState`の使い方を学んでいきましょう。

## Stateとは何か

まず、Stateという概念について理解しましょう。Stateとは、コンポーネントが持つ「変化する可能性のあるデータ」のことです。

例えば、以下のような値がStateとして管理されます。

- カウンターの現在の数値
- ユーザーがフォームに入力したテキスト
- モーダルの開閉状態
- 商品の在庫数

これらの値は、ユーザーの操作やアプリケーションの処理によって変化し、その変化に応じて画面も更新される必要があります。

通常のJavaScriptの変数とは異なり、Stateが変更されると、Reactは自動的にコンポーネントを再描画（再レンダリング）して、新しい値を画面に反映してくれます。これがReactの大きな特徴の一つです。

## useStateの基本的な使い方

それでは、実際に`useState`を使ってカウンターアプリを作ってみましょう。

これまでのプロジェクトを引き続き使用します。

新しいファイル`src/Counter.jsx`を作成し、以下のコードを入力してください。

```jsx
import { useState } from 'react';

function Counter() {
  // useStateでStateを定義
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">カウンター</h2>
      <div className="text-4xl font-bold text-center mb-6 text-blue-600">
        {count}
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          +1
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          -1
        </button>
      </div>
    </div>
  );
}

export default Counter;
```

このコードを理解するために、重要な部分を一つずつ見ていきましょう。

### useStateの基本構文

```jsx
const [count, setCount] = useState(0);
```

この一行で、Stateを定義しています。
`useState`は配列を返し、その配列を分割代入で受け取っています。

- `count`: 現在のState値（最初は0）
- `setCount`: State値を更新するための関数
- `useState(0)`: 初期値として0を設定

この書き方は**配列の分割代入**と呼ばれるJavaScriptの記法です。
`useState`は常に2つの要素を持つ配列を返すため、このような書き方が一般的です。

### State値の表示

```jsx
<div className="text-4xl font-bold text-center mb-6 text-blue-600">
  {count}
</div>
```

JSXの中で`{count}`とすることで、現在のState値を画面に表示しています。
Stateが変更されるたびに、この部分も自動的に更新されます。

### State値の更新

```jsx
<button
  onClick={() => setCount(count + 1)}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
  +1
</button>
```

ボタンがクリックされると、`setCount(count + 1)`が実行されます。
これにより、現在の`count`の値に1を加えた新しい値でStateが更新されます。

次に、このコンポーネントを使うために`App.jsx`を更新しましょう。

```jsx
import Counter from './Counter'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">React State の練習</h1>
        <Counter />
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

ボタンをクリックすると、数字が増減することが確認できるはずです。これがReactにおけるStateの基本的な動作です。

![スクリーンショット](/img/react/counter_app_use_state.png)

## 状態の更新と再描画の仕組み

ここで、Reactがどのようにして画面を更新しているかを理解しましょう。

1. ユーザーがボタンをクリック
2. `setCount`関数が実行される
3. Reactが新しいState値を受け取る
4. コンポーネント全体が再実行（再レンダリング）される
5. 新しいState値で画面が更新される

このプロセスを「再レンダリング」と呼びます。
重要なのは、Stateが変更されるとコンポーネント関数全体が再実行されるということです。

これを確認するために、コンポーネントに`console.log`を追加してみましょう。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // 再レンダリングを確認するためのログ
  console.log('Counterコンポーネントが実行されました。現在のcount:', count);

  return (
    // 以下は既存のコードと同じ
  );
}
```

ブラウザの開発者ツールのコンソールを開き、ボタンをクリックしてみてください。
ボタンをクリックするたびに、ログが出力されることが確認できるはずです。

```bash
Counterコンポーネントが実行されました。現在のcount: 0
Counterコンポーネントが実行されました。現在のcount: 1
Counterコンポーネントが実行されました。現在のcount: 2
```
このように、Stateが更新されるとコンポーネント全体が再実行され、最新のState値で画面が更新されます。

## prevを使った安全な状態更新

先ほどのコードでは`setCount(count + 1)`という方法でStateを更新しました。しかし、より安全で推奨される方法があります。それが**前の値（prev）を使った更新方法**です。

`Counter.jsx`のボタン部分を以下のように修正してみましょう。

```jsx
<div className="flex gap-4 justify-center">
  <button
    onClick={() => setCount(prev => prev + 1)}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    +1
  </button>
  <button
    onClick={() => setCount(prev => prev - 1)}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    -1
  </button>
</div>
```

先ほどまでとの違いは、`setCount`に関数を渡している点です。この関数の引数（`prev`）には、Reactが管理している最新のState値が自動的に渡されます。

#### なぜprevを使う方が良いのか

`prev`を使う方法が推奨される理由は、**State更新の競合状態を避けるため**です。

例えば、短時間で複数回ボタンがクリックされた場合、従来の方法では古い`count`の値を参照してしまう可能性があります。
しかし、`prev`を使う方法では、常に最新のState値を基に更新できるため、より確実です。

また、この書き方に慣れることで、より複雑なState管理にも対応できるようになります。

難しく感じるかもしれませんが、基本的にはこちらの書き方を使うことをお勧めします。

## より複雑な状態更新

カウンターに「リセット」機能と「5ずつ増減」機能を追加してみましょう。`Counter.jsx`を以下のように拡張してください。

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // リセット機能
  const handleReset = () => {
    setCount(0);
  };

  // 5ずつ増加
  const handleAddFive = () => {
    setCount(prev => prev + 5);
  };

  // 5ずつ減少
  const handleSubtractFive = () => {
    setCount(prev => prev - 5);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">カウンター</h2>
      <div className="text-4xl font-bold text-center mb-6 text-blue-600">
        {count}
      </div>

      {/* 基本的な増減ボタン */}
      <div className="flex gap-2 justify-center mb-4">
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          +1
        </button>
        <button
          onClick={() => setCount(prev => prev - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          -1
        </button>
      </div>

      {/* 大きな増減ボタン */}
      <div className="flex gap-2 justify-center mb-4">
        <button
          onClick={handleAddFive}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          +5
        </button>
        <button
          onClick={handleSubtractFive}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          -5
        </button>
      </div>

      {/* リセットボタン */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          リセット
        </button>
      </div>
    </div>
  );
}

export default Counter;
```

このコードでは、イベントハンドラー関数を別途定義しており、以下の機能を追加しています。
- **リセットボタン**: カウントを0に戻す
- **5ずつ増加ボタン**: カウントを5増やす
- **5ずつ減少ボタン**: カウントを5減らす
これにより、より複雑な状態更新の方法を学ぶことができます。
開発サーバーを再起動して、ブラウザで確認してみてください。

```bash
npm run dev
```

![スクリーンショット](/img/react/counter_app_use_state_extended.png)

`useState` は React の中で最も基本的で重要なフックの一つです。
今回はカウンターアプリを通じて、Stateの基本的な使い方と更新方法を学びました。
Stateを使うことで、ユーザーの操作に応じて動的に画面を更新することが可能になります。

ただ、Stateを使う際にはいくつかの注意点がありますので、次のセクションでそれらを確認しましょう。

## Stateを使う時の注意点

#### Stateを直接変更してはいけない

以下のような書き方は**絶対にしてはいけません**。

```jsx
// ❌ 間違った例
count = count + 1; // Stateを直接変更している

// ✅ 正しい例
setCount(prev => prev + 1); // setCount関数を使用
```

Stateは **イミュータブル（不変）** であるべきです。
必ず`setCount`のような更新関数を使ってStateを変更しましょう。

前者のような書き方で直接変更を行うと、Reactの再レンダリングの仕組みが正しく働かず、画面が更新されない可能性があります。

#### State更新は非同期

State更新は非同期で行われるため、`setCount`を呼んだ直後に`count`の値を参照しても、まだ古い値のままです。

```jsx
const handleClick = () => {
  setCount(prev => prev + 1);
  console.log(count); // まだ古い値が表示される
};
```

最新の値を取得したい場合は、`useEffect`というフックを使う必要がありますが、それは次の章で学習します。

## まとめ

本章では、ReactのStateについて学習しました。
以下のポイントを理解できたことと思います。

- Stateはコンポーネントが持つ「変化する可能性のあるデータ」である
- `useState`フックを使ってStateを定義し、管理する
- Stateが更新されると、コンポーネントが自動的に再レンダリングされる
- `prev`を使った更新方法がより安全で推奨される
- Stateは直接変更せず、必ず更新関数を使用する

Stateは React アプリケーションの核となる概念です。
この基本をしっかりと理解することで、より複雑な機能を持つアプリケーションも作れるようになります。
次の章では、さらに実践的なStateの活用方法を学んでいきましょう。
