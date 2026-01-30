---
title: ReactでTailwind CSSを使ってみよう
nextjs:
  metadata:
    title: ReactでTailwind CSSを使ってみよう
    description: ReactプロジェクトでTailwind CSSを使う方法を学び、classNameプロパティでのスタイル指定、条件付きスタイル、カスタムコンポーネントの作成について解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- ReactプロジェクトでTailwind CSSを使用する方法
- Tailwind CSSのインストールと設定方法
- ReactコンポーネントでのTailwind CSSの活用方法

## はじめに

前の章では、HTMLファイルでTailwind CSSの基本的な使い方を学びました。
今度は、実際のReactプロジェクトでTailwind CSSを使用する方法を学んでいきましょう。

ReactでTailwind CSSを使用すると、コンポーネントベースの開発とユーティリティファーストCSSの利点を組み合わせることができます。
これにより、再利用可能で保守しやすいUIコンポーネントを効率的に作成できるようになります。

実際にReactプロジェクトを作成しながら、Tailwind CSSの活用方法を体験していきましょう。

## 新しいReactプロジェクトの作成

### プロジェクトの作成とセットアップ

まず、Tailwind CSSを使用するための新しいReactプロジェクトを作成しましょう。
ターミナルまたはコマンドプロンプトで、以下のコマンドを実行してください。

```bash
npm create vite@latest react-tailwind -- --template react
```

プロジェクトが作成されたら、フォルダに移動して依存関係をインストールします。

```bash
cd react-tailwind
npm install
```

### Tailwind CSSのインストール

次に、Tailwind CSSをプロジェクトに追加します。

今回は Viteを使用しているため、Tailwind CSSのセットアップが非常に簡単です。

- [参考: Get started with Tailwind CSS (Vite)](https://tailwindcss.com/docs/installation/using-vite)

以下のコマンドを実行してください。

```bash
npm install tailwindcss @tailwindcss/vite
```

このコマンドにより、Tailwind CSSとその関連ツールがインストールされ、設定ファイルが作成されます。

### Tailwind CSSの設定
次に、プロジェクト直下に作成されている `vite.config.js` ファイルを開きます。

バージョンによって少し変わるかもしれませんが、最初は以下のように書かれているかと思います。

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

これを、以下のように変更します。

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

この設定により、TailwindはReactコンポーネントファイル内のクラス名を検出してCSSを生成するようになります。

### CSSファイルの設定

では次に、Tailwind CSSを使用するためのCSSファイルを設定します。

`src/index.css`ファイルを開き、一旦中身をすべて削除してから、以下のコードを追加してください。

```css
@import "tailwindcss";
```

この1行により、Tailwind CSSの全てのスタイルがプロジェクトに読み込まれます。

### App.jsxの更新

次に、`src/App.jsx`ファイルを開き、以下のように編集します。

```jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">React + Tailwind CSS</h1>
        <p className="text-lg text-gray-600 text-center">Tailwind CSSを使ったReactアプリケーションの例です。</p>
        <p className="text-lg font-bold text-red-500 text-center mt-4">ここは赤字になります。</p>
      </div>
    </div>
  );
}
export default App;
```

通常の HTML とは異なり、Reactではスタイルを適用するために `className` プロパティを使用します。
このコードでは、Tailwind CSSのユーティリティクラスを使用して、背景色やテキストのスタイルを指定しています。

今後のレッスンで、React の `.jsx` ファイルの書き方を詳しく学んでいきますが、ここではTailwind CSSのクラスを使って簡単なスタイルを適用しています。

### 開発サーバーの起動と確認

設定が完了したら、開発サーバーを起動して動作を確認しましょう。

```bash
npm run dev
```

ブラウザで`http://localhost:5173/`にアクセスして、Tailwind CSSが適用されたReactアプリケーションが表示されることを確認してください。
ブラウザには、以下のような内容が表示されるはずです。

![スクリーンショット](/img/react/react_tailwind_css_example.png)

もし、うまく反映されていない場合はこちらも参考にしてみてください。

お使いのバージョンによっては、CSSの設定やコンポーネントの構造が異なる場合があるためです。

- [参考: Install Tailwind CSS with Vite](https://v3.tailwindcss.com/docs/guides/vite)

## まとめ

本章では、ReactでTailwind CSSを使用する方法について学習しました。

React と Tailwind CSS は相性が良く、コンポーネントベースの開発とユーティリティファーストCSSの利点を組み合わせることで、効率的に美しいUIを作成できます。

次の章では、JSXとReactコンポーネントの基礎について、より詳しく学んでいきましょう。
