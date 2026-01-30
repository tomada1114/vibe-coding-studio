---
title: JSXの書き方を学ぼう
nextjs:
  metadata:
    title: JSXの書き方を学ぼう
    description: ReactのJSX記法の基本的な書き方、HTML要素の記述方法、JavaScriptの埋め込み、条件分岐と繰り返し処理について初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- JSXがどのようなものかを理解する
- HTML要素をJSXで記述する基本的な方法を習得する
- JavaScriptをJSXに埋め込む{}記法の使い方を学ぶ
- JSXでの条件分岐の書き方を理解する
- JSXでの繰り返し処理（配列の表示）方法を習得する

## はじめに

これまでの章でReactを使った開発を体験してきましたが、その中で**JSX**という記法を使用していました。
JSXは、Reactで画面を作る際の中心となる重要な技術です。

JSXを理解することで、Reactコンポーネントを自由自在に作成できるようになります。
また、他の人が書いたReactコードも読みやすくなるでしょう。

この章では、JSXの基本的な書き方をしっかりと身に付けていきましょう。

ここからは、前のレッスンで作成した `react-tailwind` プロジェクトを引き続き使用します。

- [参考: ReactでTailwind CSSを使ってみよう](/docs/react/tailwind_css/react_tailwind_integration)

## JSXとは何か

### JSXの基本概念

**JSX**（JavaScript XML）は、JavaScriptコードの中にHTML風の記法を書けるようにするReact独自の構文です。

通常のJavaScriptでは、HTMLの要素を作るためには以下のような複雑なコードを書く必要があります。

```javascript
// 通常のJavaScript
const element = React.createElement('h1', null, 'Hello, World!');
```

しかし、JSXを使うことで、以下のようにHTMLに近い感覚で書くことができます。

```jsx
// JSX
const element = <h1>Hello, World!</h1>;
```

このように、JSXを使うことでコードが読みやすく、書きやすくなります。

### JSXの特徴

JSXには以下のような特徴があります。

#### HTMLに似ているが、JavaScriptの一部

見た目はHTMLに似ていますが、実際にはJavaScriptのコードです。
そのため、変数や関数といったJavaScriptの機能を自由に使うことができます。

#### コンポーネントを組み合わせられる

HTMLの要素だけでなく、自分で作ったコンポーネントも同じように記述できます。

#### 必ず1つのルート要素が必要

JSXでは、複数の要素を返す場合、それらを1つの親要素で囲む必要があります。

## HTML要素をJSXで書く方法

### 基本的なHTML要素

JSXでHTML要素を書く方法は、HTMLとほとんど同じです。
実際に例を見てみましょう。

新しいコンポーネントファイル`src/JSXExample.jsx`を作成して、以下のコードを記述してください。

```jsx
const JSXExample = () => {
  return (
    <div>
      <h1>JSXの基本例</h1>
      <h2>見出し2</h2>
      <p>これは段落です。</p>
      <p>もう一つの段落です。</p>
    </div>
  )
}

export default JSXExample
```

このコードでは、HTMLでよく使われる`<h1>`、`<h2>`、`<p>`タグをJSXで記述しています。
書き方はHTMLとほぼ同じですが、全体を1つの`<div>`要素で囲んでいることに注意してください。

### HTMLとの違い

JSXとHTMLにはいくつかの違いがあります。

#### classNameを使用する

HTMLでは`class`属性を使いますが、JSXでは`className`を使います。

```jsx
// HTMLの場合
<div class="container">内容</div>

// JSXの場合
<div className="container">内容</div>
```

`className`は、JavaScriptの予約語である`class`と衝突しないようにするための変更です。

#### 自己終了タグは必ず閉じる

HTMLでは`<img>`や`<br>`などは閉じタグが不要ですが、JSXでは必ず閉じる必要があります。

```jsx
// HTMLの場合
<img src="image.jpg">
<br>

// JSXの場合
<img src="image.jpg" />
<br />
```

### JSXExampleコンポーネントを表示

作成したコンポーネントを`App.jsx`で表示してみましょう。

作ったコンポーネントを読み込むには `import` 文を使いつつ、対象のコンポーネントをJSX内で使用します。

```jsx
import JSXExample from './JSXExample'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <JSXExample />
      </div>
    </div>
  )
}

export default App
```

保存してブラウザで確認すると、JSXで記述した見出しと段落が表示されます。

![スクリーンショット](/img/react/jsx_component_test.png)

では、次にJSXの中でJavaScriptを埋め込む方法について学んでいきましょう。

## JavaScriptをJSXに埋め込む（{}記法）

### 基本的な埋め込み方法

JSXの最も便利な機能の1つは、**波括弧`{}`を使ってJavaScriptを埋め込める**ことです。

これにより、動的なコンテンツを表示できます。

`JSXExample.jsx`を以下のように修正してみましょう。

```jsx
const JSXExample = () => {
  // JavaScriptの変数を定義
  const title = 'JSXの基本例'
  const userName = '田中太郎'
  const currentYear = 2024

  return (
    <div>
      <h1>{title}</h1>
      <p>こんにちは、{userName}さん！</p>
      <p>今年は{currentYear}年です。</p>
    </div>
  )
}

export default JSXExample
```

この例では、以下のようにJavaScriptの変数をJSXに埋め込んでいます。

- `{title}`: 変数の値がそのまま表示される
- `{userName}`: 文字列の一部として変数を使用
- `{currentYear}`: 数値も同様に表示される

実際にブラウザで確認すると、変数の値が正しく表示されることが分かります。

![スクリーンショット](/img/react/jsx_variable_example.png)

このように、JSXでは波括弧`{}`を使うことで、JavaScriptの変数や式を簡単に埋め込むことができます。

### 計算式の埋め込み

では次は、波括弧の中に計算式を埋め込む方法について学びましょう。

波括弧の中には、変数だけでなく計算式も記述できます。

`JSXExample.jsx`を以下のように修正します。

```jsx
const JSXExample = () => {
  const price = 1000
  const quantity = 3
  const taxRate = 0.1

  return (
    <div>
      <h1>注文内容</h1>
      <p>単価: {price}円</p>
      <p>数量: {quantity}個</p>
      <p>小計: {price * quantity}円</p>
      <p>税込合計: {Math.floor((price * quantity) * (1 + taxRate))}円</p>
    </div>
  )
}

export default JSXExample
```

この例では、以下のような計算式を埋め込んでいます。

- `{price * quantity}`: 小計の計算
- `{Math.floor((price * quantity) * (1 + taxRate))}`: 税込合計の計算

保存してブラウザで確認すると、計算結果が表示されることが分かります。

![スクリーンショット](/img/react/jsx_calculation_example.png)

### 関数の呼び出し

複雑処理を JSX 内で行いたい場合、直接 JSX 内に書くこともできますが、可読性を保つために関数を定義して呼び出す方法が一般的です。

そこで、関数を定義して、その結果をJSX内で表示する方法を見てみましょう。

`src/JSXExample.jsx`を以下のように修正します。

```jsx
const JSXExample = () => {
  // 挨拶を返す関数
  const getGreeting = (name) => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return `おはようございます、${name}さん！`
    } else if (hour < 18) {
      return `こんにちは、${name}さん！`
    } else {
      return `こんばんは、${name}さん！`
    }
  }

  return (
    <div>
      <h1>時間に応じた挨拶</h1>
      <p>{getGreeting('田中')}</p>
      <p>{getGreeting('佐藤')}</p>
    </div>
  )
}

export default JSXExample
```

実際にブラウザで確認すると、現在の時刻に応じて異なる挨拶が表示されます。

![スクリーンショット](/img/react/jsx_function_example.png)

この例では、現在の時刻に応じて異なる挨拶を表示する関数を作成し、JSX内で呼び出しています。

## 条件分岐と繰り返し処理

### 条件分岐の基本

JSXでは、三項演算子を使って条件に応じて異なる内容を表示できます。

シンプルな条件分岐であれば、三項演算子で書く方が簡潔です。

`src/JSXExample.jsx`を以下のように修正して、条件分岐の例を見てみましょう。

```jsx
const JSXExample = () => {
  const isLoggedIn = true
  const score = 85

  return (
    <div>
      <h1>条件分岐の例</h1>

      {/* ログイン状態による表示切り替え */}
      <p>
        {isLoggedIn ? 'ログイン済みです' : 'ログインしてください'}
      </p>

      {/* 点数による評価表示 */}
      <p>点数: {score}点</p>
      <p>
        評価: {score >= 80 ? '優秀' : score >= 60 ? '良好' : '要努力'}
      </p>
    </div>
  )
}

export default JSXExample
```

![スクリーンショット](/img/react/jsx_condition_example.png)

この例では、以下の条件分岐を使用しています。

#### 基本的な三項演算子

```jsx
{条件 ? 真の場合の表示 : 偽の場合の表示}
```

#### 複数の条件

```jsx
{条件1 ? 結果1 : 条件2 ? 結果2 : 結果3}
```

### 条件付きで要素を表示

要素全体を条件付きで表示することもできます。

よく使われるのは `&&` 演算子を使った方法です。

おさらいしておくと、`&&` 演算子は左側の条件が真の場合にのみ右側の要素を表示します。

これを使うことで、特定の条件を満たす場合にのみ、`&&` の後に続けた要素を表示することができます。

`src/JSXExample.jsx`を以下のように修正して、条件付き表示の例を見てみましょう。

```jsx
const JSXExample = () => {
  const showMessage = true
  const userRole = 'admin'

  return (
    <div>
      <h1>条件付き表示の例</h1>

      {/* 条件が真の時のみ表示 */}
      {showMessage && (
        <div className="bg-blue-100 p-4 rounded">
          <p>このメッセージは条件が真の時のみ表示されます。</p>
        </div>
      )}

      {/* 管理者のみに表示 */}
      {userRole === 'admin' && (
        <div className="bg-red-100 p-4 rounded mt-4">
          <p>管理者専用メッセージ</p>
        </div>
      )}
    </div>
  )
}

export default JSXExample
```

![スクリーンショット](/img/react/jsx_condition_display_example.png)

この例では、`&&`演算子を使って条件が真の場合のみ要素を表示しています。

### 配列の繰り返し表示

JSXでは、配列の`map`メソッドを使って、配列の各要素を表示できます。

React では、JSON で取得したデータや、静的な配列を表示する際に非常に便利です。

せっかくですので、Tailwind CSSを使いながら、配列の要素を見やすく表示する例を作成してみましょう。

`src/JSXExample.jsx`を以下のように修正して、配列の表示例を見てみましょう。

```jsx
const JSXExample = () => {
  // 果物の配列
  const fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう']

  // ユーザー情報の配列
  const users = [
    { id: 1, name: '田中太郎', age: 25 },
    { id: 2, name: '佐藤花子', age: 30 },
    { id: 3, name: '鈴木一郎', age: 28 }
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">配列の表示例</h1>

      {/* 単純な配列の表示 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">果物一覧</h2>
        <ul className="bg-white rounded-lg shadow-md p-4">
          {fruits.map((fruit, index) => (
            <li key={index} className="py-2 px-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
              🍎 {fruit}
            </li>
          ))}
        </ul>
      </div>

      {/* オブジェクトの配列の表示 */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ユーザー一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
              </div>
              <p className="text-gray-600">年齢: {user.age}歳</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JSXExample
```

![スクリーンショット](/img/react/jsx_array_example.png)

Tailwind CSSのクラスがついているので、見た目も整っていますね。

`className` にクラスがたくさん書かれているのでパッと見は複雑に見えるかもしれませんが、基本的には以下のような構造になっています。

JSX のロジック部分だけを抜き出すと、以下のようになります。

#### map メソッドの使用

```jsx
{配列.map((要素, インデックス) => (
  <要素 key={キー}>{要素の内容}</要素>
))}
```

#### keyプロパティの指定

各要素には必ず`key`プロパティを指定する必要があります。
これはReactが効率的に画面を更新するために使用されます。

- 一意なIDがある場合: `key={item.id}`
- 一意なIDがない場合: `key={index}`（ただし、要素の順序が変わらない場合のみ推奨）

#### `user` オブジェクトの表示

以下の部分では、`map` で`users` 配列をループし、各ユーザーの情報を表示しています。

こういった書き方は Reactでは非常に一般的ですので、覚えておくと良いでしょう。

```jsx
<div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
  <div className="flex items-center mb-2">
    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
      {user.name.charAt(0)}
    </div>
    <h3 className="font-semibold text-gray-800">{user.name}</h3>
  </div>
  <p className="text-gray-600">年齢: {user.age}歳</p>
</div>
```

## まとめ

本章では、JSXの基本的な書き方について学習しました。
習得できた内容は以下の通りです。

- JSXがJavaScript内にHTML風の記法を書ける便利な構文であることを理解しました
- HTML要素をJSXで記述する方法とHTMLとの違いを学びました
- 波括弧`{}`を使ってJavaScriptの変数や計算式をJSXに埋め込む方法を習得しました
- 三項演算子や`&&`演算子を使った条件分岐の書き方を学びました
- 配列の`map`メソッドを使って繰り返し処理を行う方法を理解しました

JSXは最初は慣れないかもしれませんが、HTMLの知識があれば比較的習得しやすい技術です。
特に、JavaScriptを埋め込める`{}`記法は非常に強力で、動的なWebアプリケーションを作る際の基盤となります。

次の章では、JSXを使って実際のReactコンポーネントを作成する方法について、より詳しく学んでいきましょう。
