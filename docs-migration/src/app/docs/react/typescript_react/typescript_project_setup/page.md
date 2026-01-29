---
title: TypeScript版Reactプロジェクトを作成しよう
nextjs:
  metadata:
    title: TypeScript版Reactプロジェクトを作成しよう
    description: ViteとTypeScriptを使ってReactプロジェクトを作成し、型安全なReact開発環境を構築する方法を学び、TypeScript設定ファイルの基本的な理解を深めます。
---

## 学習の目標

本章では、以下の内容を学習します。

- TypeScriptとは何かを理解し、JavaScriptとの違いを学ぶ
- ViteでTypeScript版Reactプロジェクトを作成する方法を習得する
- TypeScript設定ファイル（tsconfig.json）の基本を理解する
- 型定義ファイル（@types）の自動インストールについて学ぶ
- TypeScript版Reactプロジェクトの基本的な構造を把握する

## はじめに

これまでJavaScriptでReactアプリケーションを作成してきましたが、今回は **TypeScript** を使ったReact開発について学んでいきます。

TypeScriptは、JavaScriptに型の概念を追加したプログラミング言語です。
コードを書く時点で型の間違いを検出できるため、より安全で保守しやすいアプリケーションを作ることができます。

現在多くの企業でTypeScriptが採用されており、React開発においても標準的な選択肢となっています。
最初は少し複雑に感じるかもしれませんが、慣れるとコードの品質向上と開発効率の改善を実感できるでしょう。

まずはTypeScriptの基本的な概念を理解し、実際にTypeScript版のReactプロジェクトを作成してみましょう。

## TypeScriptとは何かを理解しよう

### JavaScriptとTypeScriptの違い

TypeScriptは、Microsoftが開発したJavaScriptの上位互換言語です。
既存のJavaScriptコードはそのままTypeScriptとして動作し、さらに型安全性という強力な機能が追加されています。

例えば、JavaScriptでは以下のようなコードが実行時エラーを起こすことがあります。

```javascript
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(123); // 実行時エラー: name.toUpperCase is not a function
```

この例では、`greet`関数は文字列を受け取ることを想定していますが、数値の`123`が渡されたため、実行時にエラーが発生します。
JavaScriptでは、このようなエラーは実際にコードが実行されるまで分からないため、バグの発見が遅れることがあります。

一方、TypeScriptでは型を明示的に指定することで、コードを書いている時点でこのような間違いを検出できます。

```typescript
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

greet(123); // コンパイル時エラー: 引数に数値は渡せません
```

### TypeScriptの主な利点

TypeScriptを使うことで、以下のような利点があります。

- **型安全性による早期エラー検出**: コードを書いている時点で型の間違いを検出できるため、実行前にバグを発見できます
- **エディターの支援機能向上**: VS Codeなどのエディターで、より精密な自動補完やリファクタリング機能を利用できます
- **大規模開発での保守性向上**: 型情報があることで、コードの意図が明確になり、他の開発者との協力やコードの保守が容易になります
- **JavaScriptとの互換性**: 既存のJavaScriptライブラリをそのまま使用でき、段階的にTypeScriptへ移行できます

こうした利点により、多くの企業がTypeScriptを採用しており、React開発においても標準的な選択肢となっています。

## ViteでTypeScript版Reactプロジェクトを作成しよう

### react-tsテンプレートの使用

ViteでTypeScript版のReactプロジェクトを作成するには、`react-ts`テンプレートを使用します。
これまで作成した通常のReactプロジェクトとほぼ同じ手順ですが、テンプレート名が異なります。

ターミナルを開いて、プロジェクトを作成したいフォルダに移動しましょう。
そして、以下のコマンドを実行してください。

```bash
npm create vite@latest react-typescript-app -- --template react-ts
```

このコマンドでは、`--template react-ts` という部分で、TypeScript版のReactテンプレートを指定しています。
`react-typescript-app` の部分は、作成するプロジェクトのフォルダ名です。
お好みの名前に変更してもかまいません。

コマンドが完了すると、TypeScript対応のReactプロジェクトが作成されます。

このとき、プロジェクトのフォルダ構造は以下のようになっているかと思います。

```bash
.
├── eslint.config.js
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

これまで、`App.jsx` や `main.jsx` というファイル名でしたが、TypeScript版ではそれぞれ `App.tsx` や `main.tsx` となっています。

また、TypeScriptの設定ファイルである `tsconfig.json` や、Viteの設定ファイルである `vite.config.ts` も追加されています。

後ほど、これらの設定ファイルについて詳しく見ていきますが、まずはプロジェクトを作成したことを確認しましょう。

### プロジェクトの初期設定

作成されたプロジェクトフォルダに移動し、必要なライブラリをインストールしましょう。

```bash
cd react-typescript-app
npm install
```

インストールが完了したら、開発サーバーを起動してプロジェクトが正常に動作することを確認してください。

```bash
npm run dev
```

ブラウザで `http://localhost:5173/` にアクセスすると、Vite + React + TypeScriptのデフォルトページが表示されるはずです。

正常に表示されることを確認したら、いったん開発サーバーを停止して（Ctrl+C）、プロジェクトの構造を詳しく見ていきましょう。

![スクリーンショット](/img/react/typescript_react_vite_react_ts_project.png)

## プロジェクト構造の確認

### TypeScript版プロジェクトの特徴

作成されたプロジェクトをVS Codeで開いて、フォルダ構造を確認してみましょう。

プロジェクト構造は以下のようになっています。

```
react-typescript-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx          # .jsx ではなく .tsx
│   ├── index.css
│   ├── main.tsx         # .jsx ではなく .tsx
│   └── vite-env.d.ts    # TypeScript型定義ファイル
├── index.html
├── package.json
├── tsconfig.json        # TypeScript設定ファイル
├── tsconfig.node.json   # Node.js用TypeScript設定
└── vite.config.ts       # .js ではなく .ts
```

JavaScriptプロジェクトとの主な違いは、ファイルの拡張子とTypeScript関連の設定ファイルです。

- **ファイル拡張子の変化**: `.jsx` → `.tsx`（Reactコンポーネントファイル）、`.js` → `.ts`（一般的なTypeScriptファイル）
- **TypeScript専用ファイル**: `tsconfig.json`（TypeScriptコンパイラの設定ファイル）、`vite-env.d.ts`（Vite関連の型定義ファイル）
- **Vite設定ファイルの変更**: `vite.config.js` → `vite.config.ts`（TypeScriptで書かれたViteの設定ファイル）

これらの変更により、TypeScriptの型チェックや自動補完が有効になり、より安全なReact開発が可能になります。

### package.jsonの確認

`package.json`を開いて、TypeScript版プロジェクトで自動的にインストールされるライブラリを確認してみましょう。

```json
{
  // ... 省略 ... //
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
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}
```

通常のReactプロジェクトに加えて、以下のTypeScript関連のライブラリが自動的に含まれています。

- **typescript**: TypeScriptコンパイラ本体
- **@types/react**: Reactの型定義ファイル
- **@types/react-dom**: React DOMの型定義ファイル
- **@vitejs/plugin-react**: ViteでReactを使用するためのプラグイン
- **typescript-eslint**: TypeScriptコードのLintingを行うためのライブラリ

これらのライブラリにより、TypeScriptでReact開発を行うための環境が整っています。

## TypeScript設定ファイルを理解しよう

プロジェクトに作成されているファイルの中で、以下の3つがTypeScriptの設定ファイルです。

- `tsconfig.json`: TypeScriptコンパイラの基本設定を定義するファイル
- `tsconfig.app.json`: アプリケーションコードに特化したTypeScript設定を定義するファイル
- `tsconfig.node.json`: Node.js環境でのTypeScript設定を定義するファイル

これらの設定ファイルは、TypeScriptコンパイラがどのようにコードを処理するかを制御します。

プロジェクトによってはカスタマイズしていくことになりますが、デフォルトで提供される設定で十分なことが多いので、今回も特に変更は行いません。

## 型定義ファイルの自動インストールについて

TypeScriptを使用する際、JavaScriptライブラリの型定義ファイルが必要になることがあります。
これらの型定義ファイルは、TypeScriptがJavaScriptコードを正しく理解し、型チェックや自動補完を行うために必要です。

### @typesパッケージについて

TypeScriptでJavaScriptライブラリを使用する際、そのライブラリがTypeScriptで書かれていない場合は、型定義ファイルが必要になります。

多くの人気ライブラリには、コミュニティが作成した型定義ファイルが `@types` という名前で公開されています。
React版のプロジェクトでは、以下の型定義ファイルが自動的にインストールされています。

たとえば、`package.json` の `devDependencies` セクションに以下のような記述があります。

```json
{
  "devDependencies": {
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2"
  }
}
```

これらの型定義ファイルがあることで、Reactの関数やコンポーネントを使用する際に、適切な型チェックと自動補完が利用できます。

今後、他のJavaScriptライブラリを使用する場合も、同様に `@types` パッケージをインストールすることで、TypeScriptの型サポートを利用できます。

`npm install` でライブラリをインストールすると、必要な型定義ファイルも自動的にインストールされることもありますが、手動でインストールすることもできます。

```bash
npm install --save-dev @types/ライブラリ名
```

必要になることもありますので、覚えておくと良いでしょう。

### 型定義ファイルの確認

VS Codeで `src/App.tsx` を開いて、TypeScriptの型サポートがどのように動作するか確認してみましょう。

プロジェクトを作成した直後は、以下のようなコードが `App.tsx` に含まれています。

```tsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

このコードで、`useState` や `setCount` にマウスカーソルを合わせると、VS Codeが型情報を表示してくれることを確認できます。

![スクリーンショット](/img/react/typescript_react_typescript_support.png)

これは `@types/react` パッケージにより、Reactの型定義が提供されているからです。

また、`setCount` 関数に間違った型の値を渡そうとすると、VS Codeが即座にエラーを表示してくれます。

例えば、`return` の前に以下のようなコードを追加してみてください。

```tsx
setCount('Hello World');
```

すると、VS Codeが赤い波線でエラーを表示し、「型 'string' の引数を型 'SetStateAction<number>' のパラメーターに割り当てることはできません」といったようなメッセージが表示されます。

（エラーメッセージは多少異なる場合がありますが、基本的な内容は同じです）

![スクリーンショット](/img/react/typescript_react_type_error.png)

このように、型定義ファイルがあることで、開発時に安全で効率的なコーディングが可能になります。

## まとめ

本章では、TypeScript版Reactプロジェクトの作成方法について学習しました。

- TypeScriptの基本的な概念とJavaScriptとの違い
- Viteを使ったTypeScript版Reactプロジェクトの作成方法
- TypeScript設定ファイル（tsconfig.json）の基本的な理解
- 型定義ファイル（@types）の自動インストールについて
- TypeScript版Reactプロジェクトの基本的な構造

今まで JavaScriptでReactを学んできましたが、TypeScriptを使うことでより安全で保守性の高いコードを書くことができます。

これで、TypeScriptでReact開発を行うための基盤が整いました。
次回からは、実際にTypeScriptを使ったReactコンポーネントの作成方法について詳しく学んでいきましょう。
