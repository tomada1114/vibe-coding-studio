---
title: 関数コンポーネントを作ってみよう
nextjs:
  metadata:
    title: 関数コンポーネントを作ってみよう
    description: Reactの関数コンポーネントの基本構文、命名規則、export/importでのコンポーネント分離、再利用について初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 関数コンポーネントの基本構文を理解する
- コンポーネントの命名規則を習得する
- export/importを使ってコンポーネントを分離する方法を学ぶ
- コンポーネントの再利用性を理解する
- 実際に複数のコンポーネントを作成して組み合わせる方法を習得する

## はじめに

前の章でJSXの書き方を学びました。
今度は、そのJSXを使って**関数コンポーネント**を作成する方法を学んでいきましょう。

関数コンポーネントは、Reactアプリケーションを構成する基本的な部品です。
まるでレゴブロックのように、小さなコンポーネントを組み合わせて大きなアプリケーションを作っていきます。

この章では、関数コンポーネントの基本から、実際にコンポーネントを分離して再利用する方法まで学んでいきます。

## 関数コンポーネントの基本構文

### 最もシンプルなコンポーネント

関数コンポーネントは、JSXを返すJavaScript関数です。
最もシンプルな例を見てみましょう。

今回も前のレッスンで作成した `react-tailwind` プロジェクトを引き続き使用します。

新しいファイル`src/SimpleComponent.jsx`を作成し、以下のコードを記述してください。

```jsx
const SimpleComponent = () => {
  return (
    <div>
      <h2>シンプルなコンポーネント</h2>
      <p>これは関数コンポーネントです。</p>
    </div>
  )
}

export default SimpleComponent
```

このコンポーネントの構成要素を分解しながら、基本的な構文を確認していきます。

#### 関数の定義

```jsx
const SimpleComponent = () => {
  // コンポーネントの処理
}
```

アロー関数を使ってコンポーネント関数を定義します。

おさらいしておきますと、アロー関数とは `() => {}` のように書く関数のことです。
アロー関数は、通常の関数宣言よりも短く書けるため、Reactではよく使われます。

現在は特に引数を取らないシンプルなコンポーネントですが、後で引数（Props）を受け取るように拡張することもできます。

#### JSXの返却

```jsx
return (
  <div>
    {/* JSXの内容 */}
  </div>
)
```

コンポーネントは必ずJSXを返す必要があります。

JSXはHTMLのような構文で、Reactが解釈して画面に表示します。

#### export文

```jsx
export default SimpleComponent
```

他のファイルからこのコンポーネントを使用できるようにします。

### 通常の関数を使った書き方

アロー関数ではなく、通常の関数宣言を使って書くこともできます。

```jsx
function SimpleComponent() {
  return (
    <div>
      <h2>シンプルなコンポーネント</h2>
      <p>これは関数コンポーネントです。</p>
    </div>
  )
}

export default SimpleComponent
```

どちらの書き方も同じ動作をしますが、アロー関数の方が短く書けるため、現在はアロー関数を使うことが多いです。

### コンポーネントの使用

作成したコンポーネントを`App.jsx`で使用してみましょう。

```jsx
import SimpleComponent from './SimpleComponent'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">関数コンポーネントの例</h1>

        {/* SimpleComponentを使用 */}
        <SimpleComponent />
      </div>
    </div>
  )
}

export default App
```

保存してブラウザで確認すると、作成したコンポーネントが表示されるかと思います。

もしサーバを起動していない場合は、以下のコマンドで起動してください。

```bash
npm run dev
```

では、次に進む前に、関数コンポーネントの基本構文をしっかりと理解しておきましょう。

## コンポーネントの命名規則

### 命名ルール

Reactコンポーネントには、必ず守らなければならない命名規則があります。

**コンポーネント名は必ず大文字で始める**
```jsx
// 正しい例
const Header = () => { ... }
const UserProfile = () => { ... }
const NavigationMenu = () => { ... }

// 間違った例
const header = () => { ... }  // NG: 小文字で始まっている
const userprofile = () => { ... }  // NG: 小文字で始まっている
```

この規則を守らないと、Reactはそれを通常のHTML要素と判断してしまい、コンポーネントとして動作しません。

### 良い命名の例

実際にいくつかのコンポーネントを作成して、命名の例を見てみましょう。

まず `src/Header.jsx`を作成してください。

```jsx
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">私のWebサイト</h1>
      <nav className="mt-2">
        <a href="#" className="mr-4 hover:underline">ホーム</a>
        <a href="#" className="mr-4 hover:underline">サービス</a>
        <a href="#" className="mr-4 hover:underline">お問い合わせ</a>
      </nav>
    </header>
  )
}

export default Header
```

次に`src/Footer.jsx`を作成してください。

```jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2024 私のWebサイト. All rights reserved.</p>
    </footer>
  )
}

export default Footer
```

最後に `src/MainContent.jsx`を作成してください。

```jsx
const MainContent = () => {
  return (
    <main className="flex-1 p-8">
      <h2 className="text-xl font-semibold mb-4">メインコンテンツ</h2>
      <p className="text-gray-700 mb-4">
        これはメインコンテンツエリアです。
        ページの主要な内容がここに表示されます。
      </p>
      <p className="text-gray-700">
        コンポーネントを分けることで、
        コードが整理され、再利用しやすくなります。
      </p>
    </main>
  )
}

export default MainContent
```

それぞれ、Webサイトのヘッダー、フッター、メインコンテンツを表すコンポーネントです。

これらのコンポーネント名は、それぞれの役割を明確に表現しており、理解しやすくなっていることがわかります。

## 作成したコンポーネントを組み合わせる

では、作成したコンポーネントを`App.jsx`で組み合わせてみましょう。

`App.jsx`を以下のように更新してください。

```jsx
import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App
```

保存してブラウザで確認すると、ヘッダー、メインコンテンツ、フッターがそれぞれのコンポーネントとして表示されるはずです。

![スクリーンショット](/img/react/jsx_components_functional_components.png)

今までは `App.jsx` に全てのコードを書いていましたが、これで各コンポーネントが独立して管理されるようになりました。

このように、大きなアプリケーションを小さなコンポーネントに分割することで、以下のメリットがあります。

- **可読性の向上**: 各コンポーネントが何をするかが明確
- **再利用性の向上**: 同じコンポーネントを他の場所でも使える
- **保守性の向上**: 特定の部分を修正する際に、該当するコンポーネントだけを編集すれば良い

現在のプロジェクトのsrcフォルダには、以下のファイルが作成されているはずです。

```
src/
├── App.jsx
├── Header.jsx
├── MainContent.jsx
├── Footer.jsx
├── index.css
└── main.jsx
```

各ファイルが独立しており、`App.jsx`がそれらを組み合わせてアプリケーション全体を構成しています。

## コンポーネントの再利用

### 同じコンポーネントを複数回使用

コンポーネントの大きなメリットの1つは、**再利用性**です。
一度作成したコンポーネントは、何回でも使用することができます。

カード形式のコンポーネントを作成して、再利用してみましょう。
`src/InfoCard.jsx`を作成してください。

```jsx
const InfoCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <h3 className="text-lg font-semibold mb-2">情報カード</h3>
      <p className="text-gray-600">
        これは情報を表示するカードコンポーネントです。
      </p>
    </div>
  )
}

export default InfoCard
```

このコンポーネントを複数回使用してみましょう。
`src/CardSection.jsx`を作成してください。

```jsx
import InfoCard from './InfoCard'

const CardSection = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">カードセクション</h2>
      <div className="flex flex-wrap justify-center">
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </section>
  )
}

export default CardSection
```

ここでは、`InfoCard`コンポーネントを3回使用して、カードのセクションを作成しています。

`CardSection`という 1つのコンポーネントから `InfoCard` を3つ呼び出していますが、他のコンポーネントから `InfoCard` を直接呼び出すこともできますので、知識として覚えておくと良いでしょう。

### コンポーネントを使った完全な例

最後に、全てのコンポーネントを組み合わせたアプリケーションを作成しましょう。
`App.jsx`を以下のように更新してください。

```jsx
import Header from './Header'
import MainContent from './MainContent'
import CardSection from './CardSection'
import Footer from './Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1">
        <MainContent />
        <CardSection />
      </div>

      <Footer />
    </div>
  )
}

export default App
```

保存してブラウザで確認すると、複数のコンポーネントが組み合わさった完全なWebページが表示されます。

![スクリーンショット](/img/react/jsx_components_functional_components_full.png)

## まとめ

本章では、React の関数コンポーネントについて学習しました。
習得できた内容は以下の通りです。

- 関数コンポーネントの基本構文と、JSXを返す関数として定義する方法を理解しました
- コンポーネント名は必ず大文字で始めるという重要な命名規則を学びました
- `export`/`import`を使ってコンポーネントを別ファイルに分離し、整理された構造を作る方法を習得しました
- 作成したコンポーネントを複数回使用することで、再利用性の高いコードを書く方法を理解しました
- 複数のコンポーネントを組み合わせて、完全なWebアプリケーションを構築する方法を体験しました

関数コンポーネントは、現代のReact開発における基本的な構成要素です。
小さく、再利用可能なコンポーネントを作成する習慣を身に付けることで、保守しやすく、スケーラブルなアプリケーションを開発できるようになります。

次の章では、コンポーネント間でデータをやり取りするための**Props**について学んでいきましょう。
