---
title: 型エイリアスとUnion型
nextjs:
  metadata:
    title: 型エイリアスとUnion型
    description: TypeScriptの型エイリアスとUnion型を使って、複数の型を許可したり、具体的な値を指定したりする方法を学び、より柔軟で安全な型定義を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 型エイリアスとは何か、`type`文の使い方を理解する
- Union型（`|`）で複数の型を許可する方法を習得する
- Literal型で具体的な値を指定する方法を学ぶ
- 型ガードを使って安全に型を絞り込む方法を理解する
- インターフェースと型エイリアスの使い分けを習得する

## 型エイリアスとは何か

前の章では、インターフェースを使ってオブジェクトの構造を定義する方法を学びました。TypeScriptには、もう一つの型定義方法として**型エイリアス**があります。

型エイリアスは、既存の型に新しい名前を付ける機能です。長い型名を短くしたり、意味のある名前を付けたりすることで、コードを読みやすくできます。

まずは基本的な使い方から見ていきましょう。VS Codeで新しいファイル`type-alias.ts`を作成し、以下のコードを入力してみてください。

```typescript
// 基本的な型エイリアス
type UserName = string;
type UserAge = number;

const userName: UserName = "田中太郎";
const age: UserAge = 25;

console.log("名前:", userName);
console.log("年齢:", age);
```

実行結果は以下のようになります。

```
名前: 田中太郎
年齢: 25
```

この例では、`string`型を`UserName`という名前で、`number`型を`UserAge`という名前で定義しています。`type`文を使うことで、既存の型に分かりやすい別名を付けることができます。

一見すると`string`や`number`をそのまま使えばよいように思えるかもしれません。しかし、型エイリアスを使うことで、「この変数は何を表しているのか」がより明確になります。また、将来的に型を変更したい場合も、一箇所を変更するだけで済むため保守性が向上します。

## type文によるオブジェクト型の定義

型エイリアスでは、オブジェクト型も定義できます。これは、前の章で学んだインターフェースと似た機能です。

```typescript
// オブジェクト型の型エイリアス
type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "佐藤花子",
  age: 30
};

console.log(user);
```

実行結果は以下のようになります。

```
{ name: "佐藤花子", age: 30 }
```

この`type User`の定義は、前の章で学んだ`interface User`とほぼ同じ機能を持ちます。どちらを使ってもオブジェクトの構造を定義できます。

`type`文を使った型エイリアスの利点は、後ほど学ぶUnion型やLiteral型といった、より複雑な型定義と組み合わせやすいことです。シンプルなオブジェクト型であれば、インターフェースでも型エイリアスでもどちらでも構いません。

## Union型（|）で複数の型を許可する基本

実際のプログラムでは、1つの変数が複数の異なる型の値を取ることがあります。そのような場合に便利なのが**Union型**です。Union型は、`|`（パイプ）記号を使って「この型、またはこの型」という指定ができます。

```typescript
// Union型の基本
type StringOrNumber = string | number;

let value: StringOrNumber;

value = "こんにちは";
console.log("文字列の場合:", value);

value = 42;
console.log("数値の場合:", value);
```

実行結果は以下のようになります。

```
文字列の場合: こんにちは
数値の場合: 42
```

この例では、`StringOrNumber`型は文字列または数値のどちらかを受け入れます。変数`value`には、文字列を代入することも数値を代入することもできます。

Union型を使うことで、「この変数には文字列か数値のどちらかが入る」という仕様を型で明確に表現できます。これにより、予期しない型の値が代入されることを防げます。例えば、上の例で`value = true;`のように真偽値を代入しようとすると、TypeScriptがエラーを出してくれます。

## Literal型で具体的な値を指定

Union型のさらに強力な使い方として、**Literal型**があります。Literal型では、型として具体的な値を指定できます。

```typescript
// 文字列リテラル型
type Status = "loading" | "success" | "error";

let currentStatus: Status;

currentStatus = "loading";
console.log("ステータス:", currentStatus);

currentStatus = "success";
console.log("ステータス:", currentStatus);

// currentStatus = "unknown"; // エラー！定義されていない値
```

実行結果は以下のようになります。

```
ステータス: loading
ステータス: success
```

この例では、`Status`型は`"loading"`、`"success"`、`"error"`の3つの具体的な文字列値のみを許可しています。これをLiteral型（リテラル型）と呼びます。

Literal型を使うことで、変数が取りうる値を厳密に制限できます。API の通信状態や処理の進行状況など、決まった値しか取らない場合に非常に有効です。間違った値を代入しようとすると、TypeScriptが即座にエラーで教えてくれるため、バグを未然に防げます。

## 数値リテラル型の活用

Literal型は文字列だけでなく、数値でも使用できます。

```typescript
// 数値リテラル型
type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;

let diceResult: DiceNumber = 3;
console.log("サイコロの結果:", diceResult);

diceResult = 6;
console.log("サイコロの結果:", diceResult);

// diceResult = 7; // エラー！1-6以外は許可されない
```

実行結果は以下のようになります。

```
サイコロの結果: 3
サイコロの結果: 6
```

この例では、サイコロの目を表す型として、1から6までの数値のみを許可する型を定義しています。7や0といった、サイコロでは出ない値を代入しようとするとエラーになります。

このように、数値リテラル型を使うことで「この変数には特定の数値しか入らない」という制約を型で表現できます。設定値や段階的な値（レベル1、レベル2、レベル3など）を扱う際に特に有効です。

## 型ガードで安全に型を絞り込む

Union型を使った変数では、実際にどの型の値が入っているかを確認してから処理を行う必要があります。これを**型ガード**と呼びます。

```typescript
type StringOrNumber = string | number;

function processValue(value: StringOrNumber): string {
  if (typeof value === "string") {
    return `文字列: ${value.toUpperCase()}`;
  } else {
    return `数値: ${value.toFixed(2)}`;
  }
}

const result1 = processValue("hello");
const result2 = processValue(3.14159);

console.log(result1);
console.log(result2);
```

実行結果は以下のようになります。

```
文字列: HELLO
数値: 3.14
```

この例では、`typeof`演算子を使って値の型を確認しています。`if`文の中で`typeof value === "string"`という条件を書くことで、TypeScript が自動的に「この中では`value`は文字列型である」と判断してくれます。

そのため、`if`文の中では文字列のメソッドである`toUpperCase()`を安全に呼び出せます。一方、`else`の部分では`value`は数値型として扱われるため、数値のメソッドである`toFixed()`を使用できます。

型ガードを使うことで、Union型の変数を安全に処理できます。TypeScript が自動的に型を絞り込んでくれるため、間違ったメソッドを呼び出してしまうリスクがありません。

## オブジェクトでの型ガード

オブジェクトの Union型では、プロパティの値を確認して型を判別します。

```typescript
type Cat = {
  type: "cat";
  name: string;
};

type Dog = {
  type: "dog";
  name: string;
};

type Animal = Cat | Dog;

function greetAnimal(animal: Animal): string {
  if (animal.type === "cat") {
    return `猫の${animal.name}です`;
  } else {
    return `犬の${animal.name}です`;
  }
}

const myCat: Cat = { type: "cat", name: "ミケ" };
const myDog: Dog = { type: "dog", name: "ポチ" };

console.log(greetAnimal(myCat));
console.log(greetAnimal(myDog));
```

実行結果は以下のようになります。

```
猫のミケです
犬のポチです
```

この例では、`type`プロパティの値を確認することで、オブジェクトが`Cat`型なのか`Dog`型なのかを判別しています。`animal.type === "cat"`という条件により、TypeScript は`if`文の中では`animal`を`Cat`型として扱ってくれます。

このような共通のプロパティを使った型の判別を**判別可能なUnion**と呼びます。各型に共通の判別用プロパティ（この例では`type`）を持たせることで、安全に型を絞り込むことができます。

## 実用的なUnion型の活用例

実際の開発でよく使われるUnion型の例を見てみましょう。

```typescript
// APIレスポンスの型定義
type ApiResponse = {
  status: "success" | "error";
  message: string;
};

// ユーザーの役割
type UserRole = "admin" | "user" | "guest";

const response: ApiResponse = {
  status: "success",
  message: "データを取得しました"
};

const userRole: UserRole = "admin";

console.log("レスポンス:", response);
console.log("ユーザー役割:", userRole);
```

実行結果は以下のようになります。

```
レスポンス: { status: "success", message: "データを取得しました" }
ユーザー役割: admin
```

このような形で、Union型は実際のWebアプリケーション開発で頻繁に使用されます。API のステータスやユーザーの権限レベルなど、決まった選択肢から値を選ぶ場面で特に有効です。

従来であれば文字列で`"admin"`や`"user"`といった値を使っていましたが、Union型を使うことで「どのような値が有効なのか」が型定義で明確になります。また、間違った値（例：`"administrator"`）を代入しようとした場合、すぐにエラーで気づくことができます。

### 最新TypeScript機能の活用（TypeScript 5.x）

TypeScript 5.x系では、より強力な型機能が追加されています。例えば、`const assertion`と組み合わせることで、より厳密な型推論が可能です。

```typescript
// const assertion を使用した最新パターン
const userRoles = ["admin", "user", "guest"] as const;
type UserRole = typeof userRoles[number]; // "admin" | "user" | "guest" と推論される

// 配列から自動的にUnion型を生成
const supportedLanguages = ["ja", "en", "zh", "ko"] as const;
type Language = typeof supportedLanguages[number];

function setLanguage(lang: Language) {
  console.log(`言語を${lang}に設定しました`);
}

setLanguage("ja"); // OK
// setLanguage("fr"); // エラー: サポートされていない言語
```

この機能により、配列の値を元に自動的にUnion型を生成でき、値の追加や削除時の型の更新も自動化されます。

## インターフェースと型エイリアスの使い分け

インターフェースと型エイリアスはどちらもオブジェクトの型を定義できますが、それぞれに得意分野があります。

```typescript
// インターフェース - オブジェクトの構造定義に適している
interface User {
  name: string;
  age: number;
}

// 型エイリアス - Union型との組み合わせに適している
type Status = "active" | "inactive";
type UserWithStatus = User & { status: Status };

const user: UserWithStatus = {
  name: "田中太郎",
  age: 25,
  status: "active"
};

console.log(user);
```

実行結果は以下のようになります。

```
{ name: "田中太郎", age: 25, status: "active" }
```

基本的な使い分けの指針は以下の通りです。

**インターフェース**は、オブジェクトの構造を定義し、継承を活用したい場合に適しています。チームでの開発において、オブジェクトの「契約」を明確にしたい場合に有効です。

**型エイリアス**は、Union型やLiteral型を使いたい場合、複雑な型に分かりやすい名前を付けたい場合に適しています。特に、API のレスポンス型や設定値の型など、複数の選択肢がある場合に力を発揮します。

どちらも同じような機能を持っているため、チームでの開発では一貫性を保つことが大切です。プロジェクトの方針に合わせて使い分けるとよいでしょう。

## まとめ

本章では、TypeScript の型エイリアスとUnion型について学習しました。学んだ内容は以下の通りです。

- `type`文を使って既存の型に新しい名前を付けられる
- Union型（`|`）で「この型またはこの型」という指定ができる
- Literal型で具体的な値を型として指定できる
- 型ガードを使ってUnion型の値を安全に処理できる
- インターフェースと型エイリアスにはそれぞれ適した使用場面がある

これらの機能を使いこなすことで、より柔軟で安全な型定義ができるようになります。特にUnion型とLiteral型は、実際のWebアプリケーション開発でよく使われる重要な機能です。