---
title: ジェネリクスで再利用可能な型を作ろう
nextjs:
  metadata:
    title: ジェネリクスで再利用可能な型を作ろう
    description: TypeScriptのジェネリクスの基本概念を学び、型パラメータを使って再利用可能で型安全な関数やクラスを作成する方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- ジェネリクスの基本概念と必要性を理解する
- 型パラメータ `<T>` の使い方を習得する
- ジェネリック関数の作成方法を学ぶ
- 複数の型パラメータの使用方法を理解する
- 型制約（extends）の基本的な使い方を学ぶ

## はじめに

これまでの章では、具体的な型（`number`や`string`など）を使ってTypeScriptのコードを書いてきました。しかし、実際の開発では「どんな型でも受け取れるけれど、型安全性は保ちたい」という場面によく出会います。

例えば、配列の最初の要素を取得する関数を考えてみましょう。数値の配列、文字列の配列、オブジェクトの配列など、様々な型の配列に対して同じ処理をしたいですが、それぞれに対して個別の関数を作るのは効率的ではありません。

そんな時に役立つのが**ジェネリクス**という機能です。ジェネリクスを使うことで、型を「変数」のように扱い、再利用可能で型安全なコードを書くことができるようになります。

## ジェネリクスが必要な理由

まずは、ジェネリクスを使わない場合の問題点を実際のコードで確認してみましょう。VS Codeで`generic-example.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// 数値の配列から最初の要素を取得する関数
function getFirstNumber(arr: number[]): number {
    return arr[0];
}

// 文字列の配列から最初の要素を取得する関数
function getFirstString(arr: string[]): string {
    return arr[0];
}

// 使用例
const numbers = [1, 2, 3];
const strings = ["Hello", "World"];

const firstNumber = getFirstNumber(numbers);
const firstString = getFirstString(strings);

console.log("最初の数値:", firstNumber);
console.log("最初の文字列:", firstString);
```

このファイルをコンパイルして実行してください。

```bash
npx tsc generic-example.ts
node generic-example.js
```

```
最初の数値: 1
最初の文字列: Hello
```

上のコードでは、同じような処理をする関数を型ごとに作成しています。これは以下のような問題があります。

まず、コードの重複が発生します。`getFirstNumber`と`getFirstString`は処理内容が全く同じですが、型が違うために別々の関数として定義する必要があります。

また、新しい型を追加する度に新しい関数を作る必要があります。オブジェクトの配列、真偽値の配列など、対応したい型が増える度に関数も増えてしまいます。

## 型パラメータ `<T>` の基本概念

ジェネリクスでは、**型パラメータ**という仕組みを使って、型を「変数」のように扱います。最も一般的な型パラメータの名前は `T`（Typeの略）です。

型パラメータは関数名や型名の後に `<T>` という形で記述します。この `T` は実際に関数が呼び出される時に、具体的な型に置き換えられます。

それでは、先ほどの例をジェネリクスを使って書き直してみましょう。`generic-example.ts`ファイルを以下のように修正してください。

```typescript
// ジェネリック関数：どんな型の配列でも最初の要素を取得
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

// 使用例
const numbers = [1, 2, 3];
const strings = ["Hello", "World"];
const booleans = [true, false, true];

const firstNumber = getFirst(numbers);    // TypeScriptが T = number と推論
const firstString = getFirst(strings);    // TypeScriptが T = string と推論
const firstBoolean = getFirst(booleans);  // TypeScriptが T = boolean と推論

console.log("最初の数値:", firstNumber);
console.log("最初の文字列:", firstString);
console.log("最初の真偽値:", firstBoolean);
```

このファイルを`npx ts-node generic-example.ts`で実行すると、以下のような結果が表示されます。

```
最初の数値: 1
最初の文字列: Hello
最初の真偽値: true
```

### コードの詳細解説

`getFirst<T>(arr: T[]): T` という関数定義を詳しく見てみましょう。

`<T>` の部分が型パラメータの宣言です。これは「この関数では T という型変数を使います」という意味になります。

`arr: T[]` は「T型の要素を持つ配列」を表します。T が `number` なら `number[]`、T が `string` なら `string[]` になります。

`: T` は戻り値の型を表します。配列の要素と同じ型を返すことを示しています。

この仕組みにより、一つの関数で様々な型の配列に対応でき、かつ型安全性も保たれます。TypeScriptは関数を呼び出す際に、渡された引数から自動的に型を推論してくれます。

## 型を明示的に指定する方法

多くの場合、TypeScriptが自動的に型を推論してくれますが、必要に応じて型を明示的に指定することもできます。先ほどのファイルに以下のコードを追加してください。

```typescript
// 型を明示的に指定する例
const explicitNumber = getFirst<number>([1, 2, 3]);
const explicitString = getFirst<string>(["Hello", "World"]);

console.log("明示的に指定した数値:", explicitNumber);
console.log("明示的に指定した文字列:", explicitString);
```

実行結果は以下のようになります。

```
明示的に指定した数値: 1
明示的に指定した文字列: Hello
```

型を明示的に指定する場合は、関数名の後に `<具体的な型>` を記述します。通常は型推論に任せる方が簡潔ですが、複雑な場面では明示的な指定が役立つこともあります。

## 複数の型パラメータの使用

ジェネリクスでは、複数の型パラメータを使うこともできます。例えば、二つの値をペアにして返す関数を作ってみましょう。

新しく `multiple-generics.ts` というファイルを作成し、以下のコードを入力してください。

```typescript
// 二つの値をペアにして返すジェネリック関数
function makePair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// 使用例
const numberStringPair = makePair(42, "Hello");
const stringBooleanPair = makePair("TypeScript", true);
const numberNumberPair = makePair(10, 20);

console.log("数値と文字列のペア:", numberStringPair);
console.log("文字列と真偽値のペア:", stringBooleanPair);
console.log("数値同士のペア:", numberNumberPair);
```

このファイルを`npx ts-node multiple-generics.ts`で実行すると、以下のような結果が表示されます。

```
数値と文字列のペア: [42, "Hello"]
文字列と真偽値のペア: ["TypeScript", true]
数値同士のペア: [10, 20]
```

この例では、`T` と `U` という二つの型パラメータを使用しています。これにより、異なる型の値を組み合わせた関数を作ることができます。`[T, U]` は T型と U型の要素を持つタプル型を表しています。

## 型制約（extends）の基本

時には、型パラメータに制約を設けたい場合があります。例えば、「文字列または数値のみ受け付ける」といった制約です。そんな時に使うのが `extends` キーワードです。

`type-constraints.ts` というファイルを作成し、以下のコードを入力してみましょう。

```typescript
// 文字列または数値のみを受け付けるジェネリック関数
function convertToString<T extends string | number>(value: T): string {
    return String(value);
}

// 使用例
const fromNumber = convertToString(123);
const fromString = convertToString("Hello");

console.log("数値から文字列:", fromNumber);
console.log("文字列はそのまま:", fromString);

// 以下はエラーになる（コメントアウトしています）
// const fromBoolean = convertToString(true); // Error: boolean は string | number に代入できません
```

実行結果は以下のようになります。

```
数値から文字列: 123
文字列はそのまま: Hello
```

この例では、`T extends string | number` という制約を設けています。これにより、`T` は `string` または `number` 型のみ受け付けるようになります。

`extends` を使った制約により、型安全性を保ちながら、特定の操作が可能な型のみを受け付ける関数を作ることができます。

## まとめ

本章では、TypeScriptのジェネリクスについて学習しました。以下のポイントを理解できたことと思います。

- ジェネリクスは型を「変数」のように扱い、再利用可能なコードを作るための機能である
- 型パラメータ `<T>` を使って、具体的な型を後から決定できる
- 一つの関数で複数の型に対応でき、コードの重複を避けられる
- 複数の型パラメータ `<T, U>` を使って、より柔軟な型定義が可能である
- `extends` キーワードで型制約を設け、受け付ける型を限定できる

ジェネリクスは最初は複雑に感じるかもしれませんが、慣れてくると非常に強力な機能です。型安全性を保ちながら、柔軟で再利用可能なコードを書けるようになります。次の章では、さらに実践的なジェネリクスの使い方を学んでいきましょう。