---
title: プロジェクト構成を理解しよう
nextjs:
  metadata:
    title: プロジェクト構成を理解しよう
    description: ViteでReactプロジェクトを作成した後のフォルダ構成とファイルの役割について初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- Viteで作成されたReactプロジェクトのフォルダ構成を理解する
- package.jsonファイルの役割と基本的な内容を学ぶ
- publicフォルダとsrcフォルダの違いと役割を理解する
- index.htmlとmain.jsxの関係を把握する
- 各ファイルがどのように連携してアプリケーションが動作するかを学ぶ

## はじめに

前の章でViteを使ってReactプロジェクトを作成しました。

作成されたプロジェクトを見ると、たくさんのファイルやフォルダがあることに気付いたのではないでしょうか。

![スクリーンショット](/img/react/react_project_structure.png)

初めて見る人にとっては「どのファイルが何をしているのか分からない」と感じるかもしれません。
しかし、それぞれのファイルには明確な役割があり、理解すれば効率的に開発を進めることができます。

今回は、プロジェクトの構成を理解して、どこに何があるのかを把握していきましょう。

少し知識の詰め込みになりますので、難しいと感じたら一旦読み飛ばしても大丈夫です。

## Viteプロジェクトのフォルダ構成

VS Codeで作成した`myapp`フォルダを開いて、プロジェクトの構成を確認してみましょう。
以下のようなファイルとフォルダが作成されているはずです。

```
myapp/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── eslint.config.js
├── vite.config.js
├── package-lock.json
├── package.json
└── README.md

# Vite や React のアップデートによって多少変わることがあります。
```

最初は多くのファイルがあるように見えますが、実際に頻繁に編集するのは**srcフォルダ内のファイル**が中心になります。

それでは、重要なファイルとフォルダから順番に見ていきましょう。

## package.jsonとdependencies

### package.jsonの役割

**package.json**は、プロジェクトの情報を管理する設定ファイルです。
言うなれば、プロジェクトに関する「名刺」のようなものです。

このファイルには以下のような情報が記録されています。

- プロジェクトの名前とバージョン
- 使用するライブラリの一覧
- 実行可能なコマンドの定義
- プロジェクトの説明

### package.jsonの中身を確認

実際に`package.json`ファイルを開いて、中身を確認してみましょう。
以下のような内容が記述されているはずです。

```json
{
  "name": "myapp",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "vite": "^6.3.5"
  }
}
```

いくつか、重要な項目がありますので、順番に説明します。

#### name
プロジェクトの名前です。今回は`myapp`として作成しました。

#### scripts
`npm run`コマンドで実行できるコマンドが定義されています。
例えば、`npm run dev`を実行すると、`vite`コマンドが実行されて開発サーバーが起動します。

#### dependencies
アプリケーションの動作に必要なライブラリが一覧表示されています。
`react`と`react-dom`が含まれているのが確認できます。

今後、他のライブラリを追加する場合は、この`dependencies`に追加されます。

#### devDependencies
開発時のみ使用するツールやライブラリです。
ViteやESLint（コードチェックツール）などが含まれています。

こういった開発のためのツールは、アプリケーションの本番環境では必要ないため、`devDependencies`に分類されます。

### node_modulesフォルダについて

プロジェクトフォルダを見ると、`node_modules`というフォルダがあることに気付くかもしれません。
このフォルダには、`package.json`で指定されたライブラリが実際にダウンロード・保存されています。

このフォルダは非常に大きくなることがあり、通常は編集する必要もありません。
また、Gitなどのバージョン管理システムでは、`.gitignore`ファイルによって自動的に除外されるようになっています。

## publicフォルダとsrcフォルダの役割

### publicフォルダの役割

**publicフォルダ**は、そのまま公開される静的なファイルを配置する場所です。
ここに置かれたファイルは、ビルド時にそのままコピーされ、Webサイトの直下に配置されます。

現在は`vite.svg`というViteのロゴファイルが入っています。
将来的には、以下のようなファイルを配置することが多いです。

- ファビコン（ブラウザのタブに表示される小さなアイコン）
- ロボット用の設定ファイル
- マニフェストファイル（PWA用）

publicフォルダ内のファイルは、JavaScriptやCSSの処理を通さず、そのまま公開されるのが特徴です。

サイト内で使用する画像やアイコンなど、特別な処理を必要としないファイルは、ここに配置します。

### srcフォルダの役割

**srcフォルダ**（sourceの略）は、アプリケーションのソースコードを配置する場所です。
React開発では、このフォルダ内で作業することがほとんどです。

現在のsrcフォルダには、以下のファイルが含まれています。

#### **main.jsx**
アプリケーションのエントリーポイント（起点）となるファイルです。
このファイルからReactアプリケーションが開始されます。

言うなれば、Reactアプリケーションの「起動スイッチ」のような役割を果たしています。

#### **App.jsx**
メインのReactコンポーネントです。
現在ブラウザで表示されている内容は、このファイルで定義されています。

```jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        ...
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
```

こちらはトップページの内容を定義しているファイルです。

今後の開発では、この`App.jsx`ファイルを主に編集して、アプリケーションの機能や画面を作成していきます。

#### **App.css**と**index.css**
アプリケーションのスタイル（見た目）を定義するCSSファイルです。

#### **assetsフォルダ**
画像やアイコンなどの素材ファイルを配置する場所です。
現在は`react.svg`（Reactのロゴ）が入っています。

## index.htmlとmain.jsxの関係

### index.htmlの役割

プロジェクトのルートディレクトリにある**index.html**は、アプリケーションの土台となるHTMLファイルです。

実際にファイルを開いて確認してみましょう。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

このHTMLファイルで特に重要なポイントを説明します。

まずは `<div id="root"></div>` という行に注目してください。

この空のdiv要素が、Reactアプリケーションが表示される場所になります。
Reactは、この要素の中身を動的に生成・更新して画面を作ります。

この「表示される場所」というのがポイントです。

React では、 `<div id="root"></div>`の中にコンポーネントを描画することで、アプリケーションの内容を動的に更新していきます。

本来、HTMLは静的な内容を記述するものですが、Reactではこの`root`要素の中身をJavaScriptで操作して、動的な画面を作成します。

初めのうちはこの仕組みを把握していなくても問題ありませんが、Reactの基本的な考え方として理解しておくと良いでしょう。

また、 `<script type="module" src="/src/main.jsx"></script>` という行にも注目してください。
ここでは、`main.jsx`というJavaScriptファイルを読み込んでいます。

`main.jsx`は、Reactアプリケーションを起動するためのエントリーポイントとなるファイルですので、ここでアプリケーションの初期化が行われます。

### main.jsxの役割

**main.jsx**は、Reactアプリケーションを起動するためのファイルです。
ファイルの内容を確認してみましょう。

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

このコードの流れを説明すると、以下のようになります。

1. 必要なライブラリとコンポーネントをimport（読み込み）する
2. HTMLの`id="root"`の要素を取得する
3. その要素にReactアプリケーション（`<App />`コンポーネント）を描画する

つまり、`index.html`で用意された空のdiv要素に、`main.jsx`がReactアプリケーションを配置している、という関係になっています。

### App.jsxとの連携

`main.jsx`から読み込まれている`App.jsx`が、実際のアプリケーションの内容を定義しています。

`App.jsx`を開いて確認してみると、現在ブラウザで表示されている内容と同じコードが記述されているのが分かります。

この流れにより、以下のような連携でアプリケーションが動作しています。

1. ブラウザが`index.html`を読み込む
2. `index.html`が`main.jsx`を実行する
3. `main.jsx`が`App.jsx`コンポーネントを読み込んで表示する
4. 最終的に`App.jsx`の内容がブラウザに表示される

## 開発で主に使用するファイル

React開発を進めていく上で、主に編集することになるファイルを整理しておきましょう。

### 頻繁に編集するファイル

#### **src/App.jsx**
メインのアプリケーション内容を記述するファイルです。
新しい機能を追加したり、画面の構成を変更したりする時に編集します。

#### **src/App.css**
アプリケーションのスタイルを定義するファイルです。
見た目を変更したい時に編集します。

#### **srcフォルダ内の新しいファイル**
新しいコンポーネントを作成する時は、srcフォルダ内に新しい`.jsx`ファイルを作成します。

### あまり変更しないファイル

#### **src/main.jsx**
アプリケーションの起動処理を記述しているため、基本的には変更しません。

#### **index.html**
アプリケーションの基本的なHTML構造のため、特別な理由がない限り変更しません。

#### **package.json**
新しいライブラリを追加する時などに内容が変更されますが、手動で編集することは少ないです。

## まとめ

本章では、Viteで作成されたReactプロジェクトの構成について学習しました。
理解できた内容は以下の通りです。

- プロジェクトは複数のフォルダとファイルで構成されており、それぞれに明確な役割がある
- package.jsonはプロジェクトの設定と依存関係を管理する重要なファイルである
- publicフォルダは静的ファイル、srcフォルダはソースコードを配置する場所である
- index.html、main.jsx、App.jsxが連携してアプリケーションが動作している
- 実際の開発では主にsrcフォルダ内のファイルを編集することになる

プロジェクトの構成を理解することで、どこに何があるのかが分かり、効率的に開発を進めることができるようになります。
次は、VS CodeでReact開発をより便利にする拡張機能について学んでいきましょう。
