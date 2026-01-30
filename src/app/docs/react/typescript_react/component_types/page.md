---
title: コンポーネントの型定義
nextjs:
  metadata:
    title: コンポーネントの型定義
    description: TypeScriptでReactコンポーネントを作成する際の基本的な型定義を学び、Propsの型安全な受け渡しとコンポーネントの型定義方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- TypeScriptでReactコンポーネントを作成する基本的な方法を理解する
- Propsの型定義（インターフェース）を作成する方法を習得する
- 関数コンポーネントの型定義を学ぶ
- 型安全なPropsの受け渡し方法を理解する

## はじめに

前章でTypeScript版のReactプロジェクトを作成しました。
今回は、実際にTypeScriptを使ってReactコンポーネントを作成する方法を学んでいきます。

TypeScriptでは、コンポーネントが受け取る **Props**（プロパティ）に型を定義することで、間違ったデータが渡されることを防げます。
これにより、コンポーネントの使い方が明確になり、バグの少ないアプリケーションを作ることができます。

まずは簡単なコンポーネントから始めて、TypeScriptの型定義に慣れていきましょう。

## 基本的なコンポーネントの型定義

### Propsを使わないコンポーネント

最初に、Propsを受け取らない簡単なコンポーネントを作成してみます。
`src` フォルダ内に `Greeting.tsx` というファイルを作成してください。

JavaScript の時とは違いファイルの拡張子は `.tsx` ですが、基本的な構文はほとんど同じです。

```tsx
// src/Greeting.tsx
function Greeting() {
  return <h2>こんにちは！TypeScriptでReactを書いています。</h2>;
}

export default Greeting;
```

このコンポーネントは、JavaScriptで書いたものとほぼ同じです。

TypeScriptでは、Propsを受け取らないコンポーネントの場合、特別な型定義は必要ありません。

作成したコンポーネントを`App.tsx`で使用してみましょう。

既存の要素を少し削りつつ、以下のように修正します。

```tsx
import './App.css';
import Greeting from './Greeting.tsx'; // Greetingコンポーネントをインポート

function App() {
  return (
    <>
      {/* 新しく作成したコンポーネントを使用 */}
      <Greeting />
    </>
  );
}

export default App;
```

なお、今までは `Greeting` コンポーネントをインポートする際に `.jsx` 拡張子を省略できていましたが、TypeScriptでは `.tsx` 拡張子を明示的に指定する必要があります。

省略するための設定を行うこともできますが、明示的に指定することで意図的にTypeScriptであることを示すことができますので、今回はそのまま `.tsx` を使用します。

ブラウザで確認すると、新しく作成した挨拶メッセージが表示されるはずです。

![スクリーンショット](/img/react/typescript_react_simple_component.png)

## Propsインターフェースの作成

### 基本的なPropsの型定義

次に、Propsを受け取るコンポーネントを作成してみましょう。
TypeScriptでは、Propsの型を **インターフェース** として定義します。

`src` フォルダ内に `UserCard.tsx` というファイルを作成してください。

```tsx
// src/UserCard.tsx

// Propsの型定義
interface UserCardProps {
  name: string;
  age: number;
}

function UserCard(props: UserCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <h3>ユーザー情報</h3>
      <p>名前: {props.name}</p>
      <p>年齢: {props.age}歳</p>
    </div>
  );
}

export default UserCard;
```

このコードでは、`UserCardProps` というインターフェースを定義して、コンポーネントが受け取るPropsの型を指定しています。

- `name` は文字列型（`string`）
- `age` は数値型（`number`）

そして、`UserCard` 関数の引数 `props` に、この `UserCardProps` 型を指定しています。

本コースは React がメインであるため TypeScriptの詳細な文法については触れませんが、インターフェースを使うことで、コンポーネントがどのようなデータを受け取るかを明確にできます。
このように型を定義することで、コンポーネントの使用時に間違った型のデータが渡されることを防ぎます。

### 分割代入を使った書き方

Propsを分割代入で受け取る書き方もできますので、同じファイルを以下のように修正してみましょう。

```tsx
// src/UserCard.tsx

interface UserCardProps {
  name: string;
  age: number;
}

// 分割代入でPropsを受け取る
function UserCard({ name, age }: UserCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <h3>ユーザー情報</h3>
      <p>名前: {name}</p>
      <p>年齢: {age}歳</p>
    </div>
  );
}

export default UserCard;
```

この書き方では、`props.name` や `props.age` ではなく、直接 `name` と `age` を使用できるため、コードがすっきりします。

## コンポーネントの使用と型チェック

### 型安全なPropsの受け渡し

作成した `UserCard` コンポーネントを `App.tsx` で使用してみましょう。

```tsx
import './App.css'
import Greeting from './Greeting.tsx'
import UserCard from './UserCard.tsx' // UserCardコンポーネントをインポート

function App() {
  return (
    <>
      <Greeting />

      {/* UserCardコンポーネントを使用 */}
      <UserCard name="田中太郎" age={25} />
      <UserCard name="佐藤花子" age={30} />
    </>
  )
}

export default App
```

ブラウザで確認すると、2つのユーザーカードが表示されるはずです。

![スクリーンショット](/img/react/typescript_react_user_card.png)

適切にPropsが渡されているため、名前と年齢が正しく表示されていることが確認できます。

## まとめ

本章では、TypeScriptでReactコンポーネントを作成する基本的な方法について学習しました。
理解できた内容は以下の通りです。

- Propsを受け取らないコンポーネントの作成方法
- Propsの型定義をインターフェースで行う方法
- 分割代入を使ったPropsの受け取り方
- 型安全なPropsの受け渡し方法

これで、TypeScriptを使った基本的なコンポーネント作成ができるようになりました。
