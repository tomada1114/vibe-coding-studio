---
title: ジェネリクスを使ってみよう
nextjs:
  metadata:
    title: ジェネリクスを使ってみよう
    description: TypeScriptのジェネリクスを実際のコード例で練習し、配列操作や値の変換など身近な処理でジェネリクスの使い方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 実際のコード例でジェネリクスの使い方を練習する
- 配列操作でのジェネリクス活用方法を理解する
- 値の変換処理でのジェネリクス使用法を習得する
- オブジェクトの操作でジェネリクスを使う方法を学ぶ
- 日常的な処理でジェネリクスを活用できるようになる

## はじめに

前の章では、ジェネリクスの基本概念を学びました。今回は、もう少し具体的な例を通して、実際にジェネリクスをどのように使うのかを体験してみましょう。

ここで扱うのは、配列の操作や値の変換といった、プログラミングでよく行う身近な処理です。難しい概念は出てきませんので、安心して進めてください。「こういう時にジェネリクスを使うんだ」という感覚を掴むことが目標です。

## 配列の最後の要素を取得する関数

まず、配列から最後の要素を取得する関数を作ってみましょう。これは前章で作った「最初の要素を取得する関数」の応用版です。

VS Codeで`array-operations.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// 配列の最後の要素を取得するジェネリック関数
function getLast<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

// 使用例
const numbers = [10, 20, 30, 40];
const fruits = ["りんご", "バナナ", "オレンジ"];
const colors = ["赤", "青", "緑", "黄"];

console.log("数値の最後:", getLast(numbers));
console.log("果物の最後:", getLast(fruits));
console.log("色の最後:", getLast(colors));
```

このファイルを`npx ts-node array-operations.ts`で実行してください。

```
数値の最後: 40
果物の最後: オレンジ
色の最後: 黄
```

この関数では、戻り値の型を `T | undefined` にしています。配列が空の場合、最後の要素は存在しないため `undefined` が返される可能性があるからです。

このように、ジェネリクスを使うことで一つの関数で様々な型の配列に対応できます。数値の配列でも文字列の配列でも、同じ関数を使って安全に処理できるのです。

## 配列に要素を追加して新しい配列を返す関数

次は、既存の配列に新しい要素を追加して、新しい配列を返す関数を作ってみましょう。元の配列は変更せず、新しい配列を作成する関数です。

先ほどの`array-operations.ts`に以下のコードを追加してください。

```typescript
// 配列に要素を追加して新しい配列を返すジェネリック関数
function addItem<T>(arr: T[], newItem: T): T[] {
    return [...arr, newItem];
}

// 使用例
const originalNumbers = [1, 2, 3];
const newNumbers = addItem(originalNumbers, 4);

const originalFruits = ["りんご", "バナナ"];
const newFruits = addItem(originalFruits, "オレンジ");

console.log("元の数値配列:", originalNumbers);
console.log("新しい数値配列:", newNumbers);
console.log("元の果物配列:", originalFruits);
console.log("新しい果物配列:", newFruits);
```

実行結果は以下のようになります。

```
元の数値配列: [1, 2, 3]
新しい数値配列: [1, 2, 3, 4]
元の果物配列: ["りんご", "バナナ"]
新しい果物配列: ["りんご", "バナナ", "オレンジ"]
```

この関数では、スプレッド構文（`...`）を使って既存の配列を展開し、新しい要素を追加した新しい配列を作成しています。

型パラメータ `T` により、配列の型と追加する要素の型が一致することが保証されます。数値の配列には数値しか追加できず、文字列の配列には文字列しか追加できません。

## 値の型を変換する関数

今度は、ある型の値を別の型に変換する関数を作ってみましょう。これは、入力と出力で異なる型を扱う例です。

新しく`value-conversion.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// 値を受け取って、それを含む配列を返すジェネリック関数
function wrapInArray<T>(value: T): T[] {
    return [value];
}

// 使用例
const numberArray = wrapInArray(42);
const stringArray = wrapInArray("Hello");
const booleanArray = wrapInArray(true);

console.log("数値を配列に:", numberArray);
console.log("文字列を配列に:", stringArray);
console.log("真偽値を配列に:", booleanArray);
```

実行結果は以下のようになります。

```
数値を配列に: [42]
文字列を配列に: ["Hello"]
真偽値を配列に: [true]
```

この関数は、単一の値を受け取って、その値だけを含む配列を作成します。入力の型 `T` と出力の配列の要素型 `T` が同じになることで、型の整合性が保たれています。

## オブジェクトのプロパティを取得する関数

最後に、オブジェクトから特定のプロパティの値を取得する関数を作ってみましょう。これは少し高度な例ですが、ジェネリクスの実用性を感じられる例です。

`object-operations.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// オブジェクトからプロパティの値を取得するジェネリック関数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// 使用例
const person = {
    name: "田中太郎",
    age: 25,
    isStudent: false
};

const car = {
    brand: "Toyota",
    year: 2022,
    color: "白"
};

const personName = getProperty(person, "name");
const personAge = getProperty(person, "age");
const carBrand = getProperty(car, "brand");
const carYear = getProperty(car, "year");

console.log("人の名前:", personName);
console.log("人の年齢:", personAge);
console.log("車のブランド:", carBrand);
console.log("車の年式:", carYear);
```

実行結果は以下のようになります。

```
人の名前: 田中太郎
人の年齢: 25
車のブランド: Toyota
車の年式: 2022
```

この例では、`T` と `K extends keyof T` という二つの型パラメータを使用しています。

`T` はオブジェクトの型を表します。`K extends keyof T` は「T型のプロパティ名のうちの一つ」という意味です。

戻り値の型 `T[K]` は「T型のオブジェクトのK番目のプロパティの型」を表します。これにより、取得するプロパティに応じて正しい型が返されます。

この仕組みにより、存在しないプロパティ名を指定するとTypeScriptがエラーを出してくれますし、取得した値の型も正確に推論されます。

## 身近な例での練習

ジェネリクスの使い方をもう少し身近に感じるために、日常的な処理の例も見てみましょう。

`daily-examples.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// 二つの値が同じかどうかを判定するジェネリック関数
function isEqual<T>(a: T, b: T): boolean {
    return a === b;
}

// 配列が空かどうかを判定するジェネリック関数
function isEmpty<T>(arr: T[]): boolean {
    return arr.length === 0;
}

// 使用例
console.log("数値の比較:", isEqual(5, 5));
console.log("文字列の比較:", isEqual("hello", "world"));

const emptyNumbers: number[] = [];
const fruits = ["りんご", "バナナ"];

console.log("空の配列?:", isEmpty(emptyNumbers));
console.log("果物配列は空?:", isEmpty(fruits));
```

実行結果は以下のようになります。

```
数値の比較: true
文字列の比較: false
空の配列?: true
果物配列は空?: false
```

これらの関数は単純ですが、ジェネリクスを使うことで様々な型に対して同じロジックを適用できます。型安全性を保ちながら、コードの再利用性を高めることができるのです。

## まとめ

本章では、実際のコード例を通してジェネリクスの使い方を練習しました。以下のポイントを体験できたことと思います。

- 配列操作でジェネリクスを使うと、様々な型の配列に対応できる
- 値の変換処理でも、入力と出力の型の関係を明確に保てる
- オブジェクトの操作では、プロパティの型も正確に推論される
- 日常的な処理でも、ジェネリクスにより再利用可能な関数が作れる

ジェネリクスは最初は複雑に見えるかもしれませんが、実際に使ってみると「同じような処理を様々な型で行いたい」という場面で非常に便利だということが分かります。型安全性を保ちながら、柔軟で再利用可能なコードが書けるようになるのです。

これでジェネリクスの基礎的な使い方は理解できました。実際の開発では、もっと複雑な場面でもジェネリクスが活躍しますが、まずはこの基本的な使い方をしっかりと身につけていきましょう。