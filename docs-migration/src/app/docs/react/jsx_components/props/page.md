---
title: Propsでデータを受け渡そう
nextjs:
  metadata:
    title: Propsでデータを受け渡そう
    description: Reactのpropsの基本概念、propsを受け取るコンポーネントの作成方法、複数のpropsの扱い、childrenプロパティの活用について初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- Propsの基本概念を理解する
- Propsを受け取るコンポーネントの作成方法を習得する
- 複数のPropsを扱う方法を学ぶ
- 子コンポーネント（children）の活用方法を理解する
- Propsを使った実用的なコンポーネントの作成方法を習得する

## はじめに

前の章では、関数コンポーネントの基本的な作り方を学びました。
しかし、これまで作成したコンポーネントは、常に同じ内容を表示するだけでした。

実際のアプリケーションでは、コンポーネントに異なるデータを渡して、動的に内容を変える必要があります。
例えば、同じカードコンポーネントでも、タイトルや内容を変えて複数のカードを表示したいことがあります。

この問題を解決するのが**Props**（プロパティ）です。
Propsを使うことで、コンポーネントを再利用しながら、異なるデータを表示できるようになります。

## Propsの基本概念

### Propsとは何か

**Props**は、親コンポーネントから子コンポーネントにデータを渡すための仕組みです。
HTMLの属性のように、コンポーネントに値を渡すことができます。

例えば、HTMLの`<img>`タグに`src`属性を渡すのと似ています。

```html
<!-- HTMLの場合 -->
<img src="image.jpg" alt="画像" />
```

Reactでは、同様にコンポーネントにプロパティを渡すことができます。

```jsx
// Reactの場合
<MyComponent title="タイトル" content="内容" />
```

### 基本的なPropsの例

実際にPropsを使ったコンポーネントを作成してみましょう。

今回も前のレッスンで作成した `react-tailwind` プロジェクトを引き続き使用します。

`src/Greeting.jsx`を作成してください。

```jsx
const Greeting = (props) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold">こんにちは、{props.name}さん！</h2>
      <p className="text-gray-700">{props.message}</p>
    </div>
  )
}

export default Greeting
```

このコンポーネントでは、`props`という引数を受け取っています。
`props`はオブジェクトで、親コンポーネントから渡されたすべてのプロパティが含まれています。

### Propsを渡す側（親コンポーネント）

作成したGreetingコンポーネントを使用してみましょう。
`src/GreetingSection.jsx`を作成してください。

```jsx
import Greeting from './Greeting'

const GreetingSection = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">挨拶コンポーネント</h1>

      <div className="space-y-4">
        <Greeting
          name="田中太郎"
          message="今日もプログラミングを頑張りましょう！"
        />

        <Greeting
          name="佐藤花子"
          message="Reactの学習を楽しんでいますか？"
        />

        <Greeting
          name="鈴木一郎"
          message="コンポーネントの再利用は便利ですね。"
        />
      </div>
    </div>
  )
}

export default GreetingSection
```

このように、同じ`Greeting`コンポーネントに異なる`name`と`message`を渡すことで、内容の異なる挨拶を表示できます。

## Propsを受け取るコンポーネント

### 分割代入を使った書き方

これまで、Propsを受け取る際は、`props.name`や`props.message`のように書いていました。

ただ、この書き方は少し冗長で、コードが長くなりがちです。

そこで Propsを受け取る際、分割代入（destructuring）を使うとコードがより読みやすくなります。

`Greeting.jsx`を以下のように書き換えてみましょう。

```jsx
const Greeting = ({ name, message }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold">こんにちは、{name}さん！</h2>
      <p className="text-gray-700">{message}</p>
    </div>
  )
}

export default Greeting
```

この書き方では、`props.name`ではなく、直接`name`として使用できます。
コードがより簡潔になり、どのプロパティを使用しているかが明確になります。

### デフォルト値の設定

Propsが渡されなかった場合に備えて、デフォルト値を設定することができます。

ここでは、`Greeting`コンポーネントにデフォルト値を設定してみましょう。
`Greeting.jsx`を以下のように修正します。

```jsx
const Greeting = ({ name = 'ゲスト', message = 'ようこそ！' }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold">こんにちは、{name}さん！</h2>
      <p className="text-gray-700">{message}</p>
    </div>
  )
}

export default Greeting
```

この場合、`name`や`message`が渡されなかった場合、デフォルト値が使用されます。

では、`App.jsx`を以下のように修正して、デフォルト値の動作を確認してみましょう。

```jsx
import GreetingSection from './GreetingSection'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GreetingSection />
    </div>
  )
}
export default App
```

保存してブラウザで確認すると、`GreetingSection`内の`Greeting`コンポーネントが正しく表示されます。

同じコンポーネントを使っていながら、Propsを変えることで、異なる内容を表示できることが確認できるでしょう。

![スクリーンショット](/img/react/props_greeting_section.png)

## 子コンポーネント（children）の活用

Reactでは、コンポーネントの中に他のコンポーネントや要素をネストして表示することができます。
これは、コンポーネントをより柔軟に再利用できるようにするための重要な機能です。

そのために、特別なプロパティである`children`を使用します。

```jsx
const MyComponent = ({ children }) => {
  return (
    <div className="my-component">
      {children}
    </div>
  )
}
```

たとえば、上記のように`MyComponent`を定義すると、`children`にはこのコンポーネントのタグの間に書かれた内容が渡されます。

```jsx
<MyComponent>
  <p>この内容がMyComponentの中に表示されます。</p>
</MyComponent>
```

このように書くと、最終的には以下のようなHTMLが生成されます。

```html
<div class="my-component">
  <p>この内容がMyComponentの中に表示されます。</p>
</div>
```

こうすることで、コンポーネントの中に他の要素を自由に配置できるようになります。

### カードコンテナコンポーネントの作成

childrenを活用したコンポーネントを作成してみましょう。
`src/Card.jsx`を作成してください。

```jsx
const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      {title && (
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}

export default Card
```

この `Card`コンポーネントは、`title`プロパティを受け取り、`children`を表示するカード形式のコンテナです。

また、`title`が渡されなかった場合はタイトル部分を表示しないようにしています。

では、この`Card`コンポーネントを使って、いくつかの例を作成してみましょう。

### childrenを使った例

`src/CardExample.jsx`を作成して、childrenを使ったコンポーネントを試してみましょう。

```jsx
import Card from './Card'

const CardExample = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Childrenの活用例</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="テキストカード">
          <p className="text-gray-700">
            このカードには通常のテキストが入っています。
            childrenを使うことで、様々な内容を表示できます。
          </p>
        </Card>

        <Card title="リストカード">
          <ul className="list-disc pl-5 text-gray-700">
            <li>項目1</li>
            <li>項目2</li>
            <li>項目3</li>
          </ul>
        </Card>

        <Card title="ボタン付きカード">
          <p className="text-gray-700 mb-4">
            このカードにはボタンが含まれています。
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            アクション
          </button>
        </Card>

        <Card>
          <div className="text-center">
            <h4 className="text-lg font-medium mb-2">タイトルなしカード</h4>
            <p className="text-gray-600">
              titleプロパティを渡さない場合、
              タイトル部分は表示されません。
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CardExample
```

詳しく見ていくと、`Card`コンポーネントは`title`を受け取り、`children`を表示するようになっています。
`children`には、カードの中に表示したい内容を自由に書くことができます。
このように、`Card`コンポーネントを使うことで、同じ外観のカードに異なる内容を表示できるようになります。

では、`App.jsx`を以下のように修正して、`CardExample`コンポーネントを表示してみましょう。

```jsx
import CardExample from './CardExample'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CardExample />
    </div>
  )
}
export default App
```

保存してブラウザで確認すると、様々な内容を持つカードが表示されます。

![スクリーンショット](/img/react/props_card_children.png)

最初に見た Props 利用例では、一部の変数だけを変更していましたが、`children`を使うことで、コンポーネントの中身を自由に変更できることがわかります。

それでも十分便利なのですが、さらに柔軟にコンポーネントを使い回すためには、`children`プロパティを活用することが重要です。

今回見たように、中の内容を`children`として受け取ることで、同じコンポーネントを使いながら、異なる内容を表示できるようになります。

## まとめ

本章では、Reactのpropsについて学習しました。
習得できた内容は以下の通りです。

- Propsが親コンポーネントから子コンポーネントにデータを渡すための仕組みであることを理解しました
- 分割代入を使ってPropsを受け取る方法と、デフォルト値の設定方法を習得しました
- 複数のPropsを扱い、より実用的なコンポーネントを作成する方法を学びました
- `children`プロパティを使って、柔軟で再利用性の高いコンポーネントを作成する方法を理解しました
- 文字列、数値、真偽値など、様々な型のデータをPropsとして渡す方法を体験しました

Propsはコンポーネント間のデータのやり取りにおいて最も基本的で重要な概念です。
Propsを活用することで、再利用可能で柔軟なコンポーネントを作成できるようになります。

次の章では、ユーザーの操作に応じてアプリケーションが反応するための**イベントハンドリング**について学んでいきましょう。
