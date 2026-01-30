---
title: 変数に型をつけてみよう
nextjs:
  metadata:
    title: 変数に型をつけてみよう
    description: TypeScriptで変数に型注釈をつける基本的な方法を学び、型推論と明示的な型指定の違いや、型安全なプログラミングの基礎を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- TypeScriptにおける型注釈の基本的な書き方を理解する
- 型推論と明示的な型指定の違いを習得する
- letとconstでの型の扱い方を学ぶ
- any型を避けるべき理由を理解する

## はじめに

TypeScriptの最も基本的で重要な機能のひとつが**型注釈**です。型注釈とは、変数がどのような種類のデータを格納するかを明示的に指定することです。

普通のJavaScriptでは、変数にどんな種類のデータでも自由に入れることができました。しかし、これが原因で思わぬエラーが発生することも多くありました。TypeScriptでは、変数に型を指定することで、コードを書いている時点で間違いに気づくことができるようになります。

まずは簡単な例から始めて、TypeScriptでの型注釈の書き方を一緒に学んでいきましょう。

## 型注釈の基本的な書き方

TypeScriptで変数に型を指定するには、変数名の後に`:` (コロン)を書いて、その後に型名を記述します。これを**型注釈**と呼びます。

VS Codeで新しいファイル`variables-types.ts`を作成し、以下のコードを入力してみましょう。

```typescript
// 基本的な型注釈の書き方
let name: string = "田中太郎";
let age: number = 25;
let isStudent: boolean = true;

console.log(`名前: ${name}`);
console.log(`年齢: ${age}`);
console.log(`学生: ${isStudent}`);
```

このコードを見ると、変数名の後に`:型名`という形で型を指定していることがわかります。

- `name: string` - 文字列を格納する変数
- `age: number` - 数値を格納する変数
- `isStudent: boolean` - 真偽値（true/false）を格納する変数

ターミナルでこのファイルをコンパイルして実行してみましょう。

```bash
npx tsc variables-types.ts
node variables-types.js
```

実行結果は以下のようになります。

```
名前: 田中太郎
年齢: 25
学生: true
```

型注釈を書くことで、変数がどのような種類のデータを扱うかが一目でわかるようになります。また、間違った型のデータを代入しようとすると、TypeScriptがエラーを出してくれます。

## 型推論と明示的な型指定

TypeScriptには**型推論**という便利な機能があります。これは、変数に代入される値を見て、TypeScriptが自動的に型を推測してくれる機能です。

`variables-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// 基本的な型注釈の書き方
let name: string = "田中太郎";
let age: number = 25;
let isStudent: boolean = true;

console.log(`名前: ${name}`);
console.log(`年齢: ${age}`);
console.log(`学生: ${isStudent}`);

// ここから追加
// 型推論を使った場合
let city = "東京"; // TypeScriptが自動的にstring型だと推論
let population = 1400000; // TypeScriptが自動的にnumber型だと推論
let isCapital = true; // TypeScriptが自動的にboolean型だと推論

console.log(`都市: ${city}`);
console.log(`人口: ${population}`);
console.log(`首都: ${isCapital}`);
```

型推論を使った変数では、型注釈を書いていませんが、TypeScriptは代入される値を見て自動的に型を判断します。VS Codeでは、変数にマウスを重ねると推論された型を確認することができます。

型推論と明示的な型指定のどちらを使うべきでしょうか。一般的には、次のような使い分けをします。

#### 型推論を使う場合

- 代入される値から型が明確にわかる場合
- コードがシンプルで読みやすくなる場合

#### 明示的な型指定を使う場合

- 変数の宣言時に値を代入しない場合
- 型を明示することでコードの意図を明確にしたい場合
- より複雑な型を扱う場合

## let と const での型の扱い

JavaScriptと同様に、TypeScriptでも`let`と`const`を使って変数を宣言できます。しかし、型の扱いには少し違いがあります。

`variables-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// let と const での型の扱い
// 追加部分
// letで宣言した変数
let message: string = "こんにちは";
message = "さようなら"; // 値を変更可能

// constで宣言した変数
const greeting: string = "おはようございます";
// greeting = "こんばんは"; // エラー！constは値の変更ができない

console.log(`メッセージ: ${message}`);
console.log(`挨拶: ${greeting}`);
```

`let`で宣言した変数は後から値を変更することができますが、`const`で宣言した変数は一度代入すると値を変更することはできません。

また、`const`で宣言した場合の型推論は、より具体的になります。

```typescript
// 追加部分
// constでの型推論の特徴
const status = "success"; // string型ではなく"success"というリテラル型になる
let statusLet = "success"; // こちらはstring型になる

console.log(`ステータス（const）: ${status}`);
console.log(`ステータス（let）: ${statusLet}`);
```

`const`で宣言した`status`は、単なる`string`型ではなく、`"success"`という具体的な値の型（リテラル型）として推論されます。これにより、より厳密な型チェックが可能になります。

## 型を指定しない場合の動作

変数を宣言する際に型注釈を書かず、初期値も与えない場合、TypeScriptはその変数を`any`型として扱います。

`variables-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// 追加部分
// 型を指定しない場合
let anything; // any型になる

anything = "文字列";
console.log(`anything（文字列）: ${anything}`);

anything = 123;
console.log(`anything（数値）: ${anything}`);

anything = true;
console.log(`anything（真偽値）: ${anything}`);
```

このコードを実行すると、`anything`変数にはどんな型の値でも代入できることがわかります。

しかし、これでは普通のJavaScriptと変わらず、TypeScriptの型安全性の恩恵を受けることができません。

## any型を避ける理由

`any`型は、TypeScriptの型チェックを無効にしてしまう型です。どんな値でも代入でき、どんな操作でも実行できてしまいます。

`variables-types.ts`ファイルに以下のコードを追加して、`any`型の問題点を確認してみましょう。

```typescript
// 追加部分
// any型の問題点
let problematicValue: any = "これは文字列です";

// any型では存在しないメソッドを呼び出してもエラーにならない
// しかし実行時にエラーが発生する可能性がある
console.log(problematicValue.toUpperCase()); // これは動作する

problematicValue = 123;
// console.log(problematicValue.toUpperCase()); // 実行時エラー！数値にtoUpperCaseメソッドはない
```

このように、`any`型を使うとTypeScriptの型チェックの恩恵を受けられなくなってしまいます。できる限り具体的な型を指定することで、コードの安全性を高めることができます。

## 適切な型指定の例

最後に、適切な型指定の例をいくつか見てみましょう。

```typescript
// 追加部分
// 適切な型指定の例
let userName: string = "山田花子";
let userAge: number = 30;
let isLoggedIn: boolean = false;

// 初期値なしで宣言する場合は型注釈が必要
let userEmail: string;
let userScore: number;

// 後から値を代入
userEmail = "yamada@example.com";
userScore = 85;

console.log(`ユーザー名: ${userName}`);
console.log(`年齢: ${userAge}`);
console.log(`ログイン状態: ${isLoggedIn}`);
console.log(`メールアドレス: ${userEmail}`);
console.log(`スコア: ${userScore}`);
```

変数を宣言する際に初期値を与えない場合は、型注釈を明示的に書く必要があります。これにより、後から代入する値の型が保証されます。

完成したファイルをコンパイルして実行してみましょう。

```bash
npx tsc variables-types.ts
node variables-types.js
```

すべてのコードが正常に実行されることを確認してください。

## まとめ

本章では、TypeScriptにおける変数の型注釈について学びました。以下の重要なポイントを理解できたことと思います。

- 型注釈は変数名の後に`:型名`の形で書く
- TypeScriptには型推論機能があり、初期値から型を自動的に推測してくれる
- `const`で宣言した変数は、より具体的な型として推論される
- `any`型は型チェックを無効にしてしまうため、できる限り避ける
- 初期値なしで変数を宣言する場合は、型注釈が必要

型注釈を適切に使うことで、コードの安全性が向上し、開発中にエラーを早期に発見できるようになります。これがTypeScriptの最も基本的で重要な機能のひとつです。
