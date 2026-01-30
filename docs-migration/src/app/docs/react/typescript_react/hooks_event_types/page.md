---
title: HooksとEventの型定義
nextjs:
  metadata:
    title: HooksとEventの型定義
    description: TypeScriptでuseStateやuseEffectなどのHooksとイベントハンドラーの型定義を学び、型安全なReact開発の基本パターンを習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- useStateの型推論と明示的な型定義を理解する
- useEffectでの型安全な副作用処理を学ぶ
- イベントハンドラーの正しい型定義を習得する
- 基本的なHooksの型定義パターンを理解する

## はじめに

前章でコンポーネントのPropsに型を定義する方法を学びました。
今回は、ReactのHooks（`useState` や `useEffect` など）とイベントハンドラーにTypeScriptの型を適用する方法を学んでいきます。

HooksやイベントにTypeScriptの型を適用することで、状態管理やイベント処理でのバグを防ぎ、より安全なReactアプリケーションを作ることができます。

基本的な使い方から始めて、実際に動作するコンポーネントを作成しながら理解を深めていきましょう。

## useStateの型定義

### 型推論による自動的な型決定

まず、`useState` の型定義について学びましょう。
多くの場合、TypeScriptは初期値から型を自動的に推論してくれます。

`src` フォルダ内に `Counter.tsx` というファイルを作成してください。

```tsx
// src/Counter.tsx
import { useState } from 'react';

function Counter() {
  // TypeScriptが自動的に number 型と推論
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd' }}>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
      <button onClick={() => setCount(count - 1)}>
        -1
      </button>
    </div>
  );
}

export default Counter;
```

この例では、`useState(0)` の初期値が数値なので、TypeScriptは `count` が `number` 型であることを自動的に推論します。
そのため、`setCount` には数値以外を渡すとエラーになります。

### 明示的な型定義

初期値だけでは型が決まらない場合は、明示的に型を指定できます。

同じファイルに、文字列の状態を管理する例を追加してみましょう。

```tsx
// src/Counter.tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // 明示的に string 型を指定
  const [message, setMessage] = useState<string>('');

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd' }}>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
      <button onClick={() => setCount(count - 1)}>
        -1
      </button>

      <div style={{ marginTop: '16px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力"
        />
        <p>入力されたメッセージ: {message}</p>
      </div>
    </div>
  );
}

export default Counter;
```

先ほどのコードに、`message` という文字列型の状態を追加しました。
`useState<string>('')` のように、`useState` の引数に型を指定することで、TypeScriptは `message` が文字列型であることを認識します。
これにより、`setMessage` に数値や他の型の値を渡そうとすると、TypeScriptがエラーを表示してくれます。

基本的な構文としては、以下のようになります。

```tsx
const [state, setState] = useState<Type>(initialValue);
```

このように、`useState` の型を明示的に指定することで、状態管理がより安全になります。

明示的ではない（暗黙的な）型推論も可能ですが、特に複雑な状態を扱う場合は、明示的に型を指定することをお勧めします。

## イベントハンドラーの型定義

### onClick イベントの型定義

イベントハンドラーにも適切な型を定義することで、より安全なコードが書けます。
先ほどの `Counter` コンポーネントに、イベントハンドラー関数を分離してみましょう。

```tsx
// src/Counter.tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>('');

  // クリックイベントの型定義
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  // 入力イベントの型定義
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd' }}>
      <p>カウント: {count}</p>
      <button onClick={handleIncrement}>
        +1
      </button>
      <button onClick={handleDecrement}>
        -1
      </button>

      <div style={{ marginTop: '16px' }}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="メッセージを入力"
        />
        <p>入力されたメッセージ: {message}</p>
      </div>
    </div>
  );
}

export default Counter;
```

`handleInputChange` 関数の引数 `e` に、`React.ChangeEvent<HTMLInputElement>` という型を指定しています。

少し難しい書き方に見えますが、この `e` はイベントオブジェクトを表し、`HTMLInputElement` は `<input>` 要素に特有の型です。

そして `React.ChangeEvent<HTMLInputElement>` は、HTMLの `<input>` 要素に対する変更イベントを表す型です。

具体的には、入力フィールドの値が変更されたときに発生するイベントで、`e.target.value` で入力された値を取得できます。

この `e.target.value` は文字列型であるため、`setMessage` に渡すことができます。

このように React ではいくつかの組み込み型が用意されており、イベントハンドラーの引数に適切な型を指定することで、TypeScriptはそのイベントがどのようなものかを理解し、型安全なコードを書くことができます。

他にも、クリックイベントには `React.MouseEvent<HTMLButtonElement>`、フォーム送信イベントには `React.FormEvent<HTMLFormElement>` など、様々なイベントに対応する型が用意されています。

ここではすべてのイベント型を網羅することはできませんが、よく使われるイベント型を覚えておくと良いでしょう。

- [参考: React TypeScript の型](https://ja.react.dev/learn/typescript)

## useEffectでの型定義

### 基本的なuseEffectの使用

`useEffect` は、ほとんどの場合で特別な型定義は必要ありません。

なぜなら、`useEffect` はあくまで副作用を管理するためのフックであり、それ自体に型を指定する必要はないからです。

一応、おさらいも兼ねて`useEffect` の基本的な使い方を確認しておきましょう。

`Counter` コンポーネントに、カウントが変更された時にコンソールに出力する機能を追加してみましょう。

```tsx
// src/Counter.tsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>('');

  // useEffectは特別な型定義が不要
  useEffect(() => {
    console.log(`カウントが ${count} に変更されました`);
  }, [count]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd' }}>
      <p>カウント: {count}</p>
      <button onClick={handleIncrement}>
        +1
      </button>
      <button onClick={handleDecrement}>
        -1
      </button>

      <div style={{ marginTop: '16px' }}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="メッセージを入力"
        />
        <p>入力されたメッセージ: {message}</p>
      </div>
    </div>
  );
}

export default Counter;
```

`useEffect` 内のコードは、`count` の値が変更されるたびに実行されます。
ブラウザの開発者ツールのコンソールを開いて、ボタンをクリックした時にメッセージが表示されることを確認してみてください。

## 作成したコンポーネントの使用

作成した `Counter` コンポーネントを `App.tsx` で使用してみましょう。

```tsx
import './App.css';
import Counter from './Counter.tsx'; // Counterコンポーネントをインポート

function App() {
  return (
    <>
      {/* Counterコンポーネントを追加 */}
      <Counter />
    </>
  );
}

export default App;
```

ブラウザで確認すると、カウンターとテキスト入力フィールドが表示され、正常に動作することを確認できます。
また、ボタンをクリックするとコンソールにメッセージが表示されることも確認してみてください。

![スクリーンショット](/img/react/typescript_react_counter_initial.png)

![スクリーンショット](/img/react/typescript_react_counter_console.png)

## まとめ

本章では、TypeScriptでHooksとイベントハンドラーの型定義について学習しました。
理解できた内容は以下の通りです。

- `useState` の型推論と明示的な型定義
- イベントハンドラーの型定義方法
- `useEffect` の基本的な使い方と型定義の必要性
- 作成したコンポーネントの使用方法

これで、TypeScriptを使ったReactの基本的なHooksとイベント処理ができるようになりました。
