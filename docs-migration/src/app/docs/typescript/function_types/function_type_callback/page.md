---
title: 関数型とコールバック関数
nextjs:
  metadata:
    title: 関数型とコールバック関数
    description: TypeScriptで関数型の定義方法とコールバック関数の型安全な実装を学び、高階関数での型定義とPromise型の基本的な使い方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 関数型の定義方法を理解する
- コールバック関数の型安全な実装方法を習得する
- 高階関数での型定義の書き方を学ぶ
- Promise型と非同期関数の基本的な型指定を理解する

## はじめに

前回は関数の引数と戻り値に型を指定する方法を学びました。今回は、さらに一歩進んで、**関数自体を型として扱う方法**について学んでいきましょう。

JavaScriptでは、関数を変数に代入したり、他の関数の引数として渡したりすることができます。TypeScriptでは、これらの関数にも適切な型を指定することで、より安全なコードを書くことができます。

例えば、配列の`map`メソッドに渡す関数や、ボタンがクリックされた時に実行される関数などが、今回学ぶ内容の具体例になります。

それでは、実際にコードを書きながら関数型について学んでいきましょう。

## 関数型の定義方法

### 基本的な関数型の書き方

まずは、関数型の基本的な定義方法から始めましょう。VS Codeで新しく`function-types-advanced.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// 関数型の定義方法
let calculator: (a: number, b: number) => number;

// 足し算の関数を代入
calculator = function(a: number, b: number): number {
    return a + b;
};

console.log("足し算の結果:", calculator(5, 3)); // 8
```

このコードでは、`calculator`という変数に関数型を指定しています。`(a: number, b: number) => number`という書き方は、「2つの数値を受け取って、1つの数値を返す関数」という意味です。

関数型の書き方は`(引数の型) => 戻り値の型`という形になります。矢印(`=>`)を使って、引数から戻り値への変換を表現しているのです。

ファイルをコンパイルして実行すると、以下のような結果が表示されます。

```
足し算の結果: 8
```

### 関数型を使った変数の再代入

関数型を指定した変数には、同じ型を持つ異なる関数を代入することができます。以下のコードを追記してみましょう。

```typescript
// 関数型の定義方法
let calculator: (a: number, b: number) => number;

// 足し算の関数を代入
calculator = function(a: number, b: number): number {
    return a + b;
};

console.log("足し算の結果:", calculator(5, 3)); // 8

// 掛け算の関数に変更
calculator = (a: number, b: number): number => a * b;

console.log("掛け算の結果:", calculator(5, 3)); // 15
```

このように、同じ関数型を持つ関数であれば、いつでも別の関数に置き換えることができます。

実行すると、以下のような結果が表示されます。

```
足し算の結果: 8
掛け算の結果: 15
```

## コールバック関数の型安全な実装

### 基本的なコールバック関数

コールバック関数とは、他の関数の引数として渡される関数のことです。例えば、配列の`forEach`メソッドや`map`メソッドに渡す関数がコールバック関数の典型例です。

コールバック関数を受け取る関数を作成してみましょう。

```typescript
// コールバック関数を受け取る関数
function applyToNumber(
    value: number, 
    operation: (x: number) => number
): number {
    return operation(value);
}

// コールバック関数として使用する関数を定義
const double = (x: number): number => x * 2;
const addTen = (x: number): number => x + 10;

console.log("5を2倍:", applyToNumber(5, double)); // 10
console.log("5に10を足す:", applyToNumber(5, addTen)); // 15

// 関数を直接渡すことも可能
console.log("5を3倍:", applyToNumber(5, (x) => x * 3)); // 15
```

この例では、`applyToNumber`関数が`operation`という引数でコールバック関数を受け取っています。コールバック関数の型は`(x: number) => number`と指定されており、数値を受け取って数値を返す関数である必要があります。

実行すると、以下のような結果が表示されます。

```
5を2倍: 10
5に10を足す: 15
5を3倍: 15
```

### 配列を処理するコールバック関数

次に、配列を処理するコールバック関数の例を見てみましょう。

```typescript
// 配列の各要素に関数を適用する
function transformArray(
    numbers: number[], 
    transform: (value: number) => number
): number[] {
    const result: number[] = [];
    for (const num of numbers) {
        result.push(transform(num));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];

console.log("元の配列:", numbers);
console.log("2倍にした配列:", transformArray(numbers, (x) => x * 2));
console.log("1を足した配列:", transformArray(numbers, (x) => x + 1));
```

実行すると、以下のような結果が表示されます。

```
元の配列: [1, 2, 3, 4, 5]
2倍にした配列: [2, 4, 6, 8, 10]
1を足した配列: [2, 3, 4, 5, 6]
```

## 高階関数での型定義

### 関数を返す関数

高階関数とは、関数を引数として受け取ったり、関数を戻り値として返したりする関数のことです。関数を返す関数の型定義を見てみましょう。

```typescript
// 関数を返す関数（高階関数）
function createMultiplier(factor: number): (value: number) => number {
    return function(value: number): number {
        return value * factor;
    };
}

// 特定の倍数を作る関数を生成
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("5の2倍:", double(5)); // 10
console.log("5の3倍:", triple(5)); // 15
```

`createMultiplier`関数は、`number`型の引数を受け取り、`(value: number) => number`型の関数を返します。戻り値の型定義で、「数値を受け取って数値を返す関数」を表現しています。

実行すると、以下のような結果が表示されます。

```
5の2倍: 10
5の3倍: 15
```

### 真偽値を返すコールバック関数

条件判定を行うコールバック関数の例も見てみましょう。

```typescript
// 条件に合う要素だけを取り出す関数
function filterNumbers(
    numbers: number[], 
    condition: (value: number) => boolean
): number[] {
    const result: number[] = [];
    for (const num of numbers) {
        if (condition(num)) {
            result.push(num);
        }
    }
    return result;
}

const testNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("元の配列:", testNumbers);
console.log("偶数のみ:", filterNumbers(testNumbers, (x) => x % 2 === 0));
console.log("5より大きい数:", filterNumbers(testNumbers, (x) => x > 5));
```

ここでは、`condition`という引数で条件判定を行うコールバック関数を受け取っています。この関数の型は`(value: number) => boolean`となっており、数値を受け取って真偽値を返す関数です。

実行すると、以下のような結果が表示されます。

```
元の配列: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
偶数のみ: [2, 4, 6, 8, 10]
5より大きい数: [6, 7, 8, 9, 10]
```

## Promise型と非同期関数の基本

### Promise型の基本的な使い方

現代のWebアプリケーションでは、サーバーとの通信など、時間のかかる処理を非同期で行うことがよくあります。TypeScriptでは、このような非同期処理にも型を指定することができます。

```typescript
// 非同期で数値を返す関数
function getNumberAsync(): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            console.log("数値が生成されました:", randomNumber);
            resolve(randomNumber);
        }, 1000); // 1秒後に実行
    });
}

// Promise を使用する
console.log("非同期処理を開始します");

getNumberAsync().then((number: number) => {
    console.log("受け取った数値:", number);
});

console.log("この行はすぐに実行されます");
```

`Promise<number>`は「最終的に数値を返すPromise」を表しています。`Promise`型の`<>`の中に、最終的に得られる値の型を指定します。

実行すると、以下のような結果が表示されます（実際の数値はランダムなので異なります）。

```
非同期処理を開始します
この行はすぐに実行されます
数値が生成されました: 42
受け取った数値: 42
```

### 文字列を返すPromise

文字列を返すPromiseの例も見てみましょう。

```typescript
// 非同期で文字列を返す関数
function getGreetingAsync(name: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const greeting = `Hello, ${name}!`;
            console.log("挨拶を生成しました:", greeting);
            resolve(greeting);
        }, 500); // 0.5秒後に実行
    });
}

console.log("挨拶の生成を開始");

getGreetingAsync("田中").then((message: string) => {
    console.log("受け取った挨拶:", message);
});
```

実行すると、以下のような結果が表示されます。

```
挨拶の生成を開始
挨拶を生成しました: Hello, 田中!
受け取った挨拶: Hello, 田中!
```

## まとめ

本章では、TypeScriptでの関数型とコールバック関数について学習しました。以下の内容をマスターできたことと思います。

関数型を使用することで、関数を値として扱い、他の関数に渡したり変数に代入したりする際の型安全性を確保できます。コールバック関数の型指定により、予期しない関数が渡されることを防ぎ、より安全なコードを書くことができます。

また、`Promise`型を使用した非同期処理でも、適切な型指定により型安全性を保つことができます。これらの概念は、配列の処理やイベント処理など、実際のプログラム開発でよく使われる重要なパターンです。

次章では、async/awaitとエラーハンドリングについて詳しく学んでいきます。