---
title: TypeScriptで計算機アプリを作ろう
nextjs:
  metadata:
    title: TypeScriptで計算機アプリを作ろう
    description: TypeScriptを使って基本的な計算機アプリを作成し、型安全な状態管理と演算処理の実装方法を実践的に学習します。
---

## 学習の目標

本章では、以下の内容を学習します。

- TypeScriptで計算機アプリの基本設計を理解する
- 演算の種類と計算結果の型定義を学ぶ
- ボタンクリックイベントの型安全な処理を実装する
- 数値と文字列の変換を型安全に行う方法を習得する

## はじめに

これまでTypeScriptでの基本的なコンポーネント作成とHooksの使い方を学んできました。
今回は、これらの知識を組み合わせて、実際に動作する **計算機アプリ** を作成してみましょう。

計算機アプリを作ることで、TypeScriptの型定義、状態管理、イベントハンドリングを実践的に理解できます。
また、数値計算という明確な処理があるため、TypeScriptの型安全性の利点を実感できるでしょう。

まずは足し算だけができる簡単な計算機から始めて、段階的に機能を追加していきます。

## 計算機アプリの設計

### 必要な状態の整理

計算機アプリに必要な状態を考えてみましょう。
基本的な計算機では、以下の情報を管理する必要があります。

- 現在表示されている数値
- 最初に入力された数値
- 選択された演算子（+、-、×、÷）
- 計算結果

今回は、最もシンプルな足し算のみができる計算機を作成します。
そのため、必要な状態は以下の2つだけです。

- 最初の数値
- 2番目の数値

これらの状態をTypeScriptで型安全に管理していきましょう。

## 基本的な計算機コンポーネントの作成

### コンポーネントの骨格作成

`src` フォルダ内に `Calculator.tsx` というファイルを作成してください。
まずは、基本的な構造から始めます。

```tsx
// src/Calculator.tsx
import { useState } from 'react';

function Calculator() {
  // 2つの数値を管理する状態
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '300px',
      margin: '20px auto'
    }}>
      <h3>簡単計算機</h3>

      {/* 計算結果の表示 */}
      <div style={{
        background: '#f5f5f5',
        padding: '10px',
        marginBottom: '16px',
        textAlign: 'center',
        fontSize: '24px'
      }}>
        {result}
      </div>

      <p>これから入力フィールドとボタンを追加します</p>
    </div>
  );
}

export default Calculator;
```

ここでは、3つの数値状態を `useState<number>` で型安全に定義しています。
`<number>` を明示的に指定することで、これらの状態には必ず数値が格納されることが保証されます。

計算結果を表示するエリアも用意して、計算機らしい見た目にしています。

ちなみに、前回までの Chapter では Tailwind CSS を使用していましたが、今回はスタイルをインラインで指定しています。
こういった書き方もできますので、覚えておくと良いでしょう。

通常の CSS と違うところは、スタイルをオブジェクトとして指定する点です。
例えば、`style={{ padding: '20px' }}` のように、オブジェクトのキーに CSS プロパティ名を指定し、値を文字列で設定します。

また、通常であれば `text-align: center` のようにハイフンで区切るプロパティ名も、Reactではキャメルケース（`textAlign: 'center'`）で指定します。

では一旦、`src/App.tsx` にこの `Calculator` コンポーネントを追加して、ブラウザで確認してみてください。

```tsx
import Calculator from './Calculator.tsx'; // Calculatorコンポーネントをインポート

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Calculator />
    </div>
  );
}
export default App;
```

ブラウザをリロードすると、計算機の骨格が表示されるはずです。

![スクリーンショット](/img/react/typescript_react_calculator_app.png)

## 入力フィールドとボタンの追加

ここからは、実際に数値を入力して計算を行うための機能を追加していきます。

### 数値入力とボタンの実装

次に、数値を入力するフィールドと計算を実行するボタンを追加しましょう。

ここまで学んできた React の基本的なイベントハンドリングを活用して、ユーザーが入力した数値を状態に反映させます。

ちょっと長いので、それぞれの部分に説明のコメントを追加しながら実装していきます。

```tsx
import { useState } from 'react';

function Calculator() {
  // 計算で使用する状態変数を定義
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  // 入力フィールドの変更ハンドラーと計算ハンドラーを定義
  // 入力フィールドの値を更新する関数
  // 数値が入力されない場合は0を設定
  // 計算ボタンがクリックされたときに計算を実行
  const handleFirstNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFirstNumber(value);
  };

  // 2番目の数値の入力フィールドの変更ハンドラー
  // 数値が入力されない場合は0を設定
  const handleSecondNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setSecondNumber(value);
  };

  // 計算ボタンがクリックされたときのハンドラー
  // 最初の数値と2番目の数値を加算し、結果を更新
  // 結果は状態変数resultに保存され、画面に表示される
  const handleCalculate = () => {
    const calculationResult = firstNumber + secondNumber;
    setResult(calculationResult);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '300px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>計算機</h3>

      <div
        style={{
          background: '#f8f8f8',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '28px',
          marginBottom: '20px',
        }}
      >
        {result}
      </div>

      {/* 最初の数値の入力フィールド */}
      <input
        type="number"
        value={firstNumber}
        onChange={handleFirstNumberChange}
        placeholder="最初の数値"
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '10px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px',
        }}
      />

      <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '18px' }}>+</div>

      {/* 2番目の数値の入力フィールド */}
      <input
        type="number"
        value={secondNumber}
        onChange={handleSecondNumberChange}
        placeholder="2番目の数値"
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px',
        }}
      />

      {/* 計算ボタン */}
      {/* ボタンをクリックすると計算が実行され、結果が更新される */}
      <button
        onClick={handleCalculate}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007aff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        計算する
      </button>
    </div>
  );
}

export default Calculator;
```

分割しながら、各部分の役割を説明します。

まず、状態変数を定義しています。

```tsx
const [firstNumber, setFirstNumber] = useState<number>(0);
const [secondNumber, setSecondNumber] = useState<number>(0);
const [result, setResult] = useState<number>(0);
```
ここでは、最初の数値、2番目の数値、計算結果をそれぞれ管理しています。
次に、入力フィールドの変更を処理するハンドラーを定義します。

```tsx
const handleFirstNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseFloat(e.target.value) || 0;
  setFirstNumber(value);
};
const handleSecondNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseFloat(e.target.value) || 0;
  setSecondNumber(value);
};
```
ここでは、入力フィールドの値を数値に変換して状態に保存しています。

なお、それぞれのイベントハンドラーの引数 `e` は、Reactの `ChangeEvent` 型で型定義されています。
これにより、TypeScriptは `e.target.value` が文字列であることを認識し、`parseFloat` を使って数値に変換しています。
次に、計算を実行するハンドラーを定義します。

```tsx
const handleCalculate = () => {
  const calculationResult = firstNumber + secondNumber;
  setResult(calculationResult);
};
```
ここでは、最初の数値と2番目の数値を加算し、結果を状態に保存しています。
最後に、実際のUIをレンダリングします。

そして、JSX の部分でそれぞれの状態を表示し、入力フィールドとボタンを配置しています。

型の定義が入ることで全体として複雑に見えるかもしれませんが、やっていることは非常にシンプルです。

慣れないうちは、特にイベントハンドラーの型定義に戸惑うかもしれませんが、TypeScriptの型安全性を活用することで、実行時エラーを未然に防ぐことができます。

まずは定番の型だけを押さえつつ、徐々に慣れていきましょう。

## 余計な CSS の読み込みを削除

動作確認をする前に、不要な CSS の読み込みを削除しておきましょう。

デフォルトでは、Vite のプロジェクトには `src/index.css` が含まれていますが、今回の計算機アプリでは特に必要ありません。

そのため、`src/main.tsx` から `App.css` のインポートを削除してください。

```tsx
// 以下の行を削除
import App from './App.tsx';
```

これにより、先ほどまでは計算機の位置が端に寄っていましたが、中央に配置されるようになり、なおかつ背景の色も消えるはずです。

## 計算機アプリの使用と動作確認

ブラウザで確認すると、新しく作成した計算機が表示されているはずです。

![スクリーンショット](/img/react/typescript_react_calculator_app_full.png)

### 動作テスト

実際に計算機を使用してみましょう。

1. 最初の入力フィールドに「5」を入力
2. 2番目の入力フィールドに「3」を入力
3. 「計算する」ボタンをクリック

正常に動作していれば、計算結果表示エリアに「8」が表示されるはずです。

![スクリーンショット](/img/react/typescript_react_calculator_app_result.png)

また、小数点を含む数値でも正しく計算されることを確認してみてください。
例えば、「1.5」と「3」を入力すると、結果として「4.5」が表示されます。

![スクリーンショット](/img/react/typescript_react_calculator_app_decimal_result.png)

## まとめ

本章では、TypeScriptを使って基本的な計算機アプリを作成しました。
理解できた内容は以下の通りです。

- TypeScriptでの状態管理と型定義の基本
- イベントハンドラーの型定義と実装方法
- 数値と文字列の変換方法
- シンプルなUIの構築とスタイルの適用方法

今回は足し算のみの簡単な計算機でしたが、TypeScriptの基本的な型定義パターンを実践的に学ぶことができました。

シンプルなアプリであれば JavaScript で書くのも問題ありませんが、TypeScriptを使うことで型安全性が向上し、将来的な拡張や保守が容易になります。

そのため、ぜひ TypeScript を使って React アプリを開発することをお勧めします。

React だけでなく TypeScript の知識も必要で大変だったかと思います。

お疲れ様でした。
