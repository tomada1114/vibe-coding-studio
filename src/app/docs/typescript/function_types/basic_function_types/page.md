---
title: 関数に型をつけてみよう
nextjs:
  metadata:
    title: 関数に型をつけてみよう
    description: TypeScriptで関数の引数と戻り値に型を指定する方法を学び、型安全な関数の書き方を習得します。アロー関数やオプショナル引数の型定義も実践的に理解しましょう。
---

## 学習の目標

本章では、以下の内容を学習します。

- 関数の引数に型を指定する方法を理解する
- 関数の戻り値に型を指定する方法を習得する
- アロー関数での型定義の書き方を学ぶ
- オプショナル引数とデフォルト引数の型指定を理解する
- void型とundefinedの違いを学ぶ

## はじめに

これまでに変数やオブジェクトに型をつける方法を学んできました。今度は、関数に型を指定する方法を学んでいきましょう。

関数の型指定では、どのような値を受け取って、どのような値を返すのかを明確にすることができます。これにより、関数を呼び出す際に間違った型の値を渡してしまうことを防ぎ、より安全なコードを書くことができるのです。

例えば、数値を2つ受け取って足し算をする関数があるとします。TypeScriptで型を指定することで、必ず数値だけが渡されることを保証でき、文字列が混入してしまうようなバグを未然に防げます。

それでは、実際にコードを書きながら関数の型定義を学んでいきましょう。

## 引数と戻り値の型指定

### 基本的な関数の型指定

まずは、最もシンプルな関数の型指定から始めましょう。VS Codeで新しく`function-types.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// 引数と戻り値の型を指定した関数
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(5, 3)); // 8
console.log(add(10.5, 2.3)); // 12.8
```

このファイルをコンパイルして実行してみましょう。

```bash
npx tsc function-types.ts
node function-types.js
```

このコードでは、引数`a`と`b`に**number型**を指定し、戻り値も**number型**であることを明示しています。関数の戻り値の型は、引数のリストの後ろに`: 型名`の形で書きます。

実行結果は以下のようになります。

```
8
12.8
```

### 型指定の効果を確認してみよう

型指定の効果を実感するために、文字列を扱う関数も追加してみましょう。`function-types.ts`ファイルに以下のコードを追記してください。

```typescript
// 引数と戻り値の型を指定した関数
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(5, 3)); // 8
console.log(add(10.5, 2.3)); // 12.8

// 文字列を結合する関数
function greet(name: string): string {
    return "Hello, " + name + "!";
}

console.log(greet("田中")); // Hello, 田中!
console.log(greet("佐藤")); // Hello, 佐藤!
```

VS CodeでTypeScriptの設定ができていれば、もし間違った型の値を渡そうとすると、赤い波線が表示され、型エラーが指摘されます。これがTypeScriptの型チェック機能です。

ファイルをコンパイルして実行すると、以下のような結果がコンソールに表示されます。

```
8
12.8
Hello, 田中!
Hello, 佐藤!
```

## アロー関数での型定義

これまでに学んだ配列やオブジェクトの型定義と同様に、アロー関数でも型を指定することができます。

先ほどのコードに、アロー関数での例を追加してみましょう。

```typescript
// 通常の関数
function add(a: number, b: number): number {
    return a + b;
}

// アロー関数での型指定
const multiply = (a: number, b: number): number => {
    return a * b;
};

// さらに短く書いた場合
const subtract = (a: number, b: number): number => a - b;

console.log(add(5, 3)); // 8
console.log(multiply(4, 7)); // 28
console.log(subtract(10, 3)); // 7
```

アロー関数でも、通常の関数と同じように引数と戻り値に型を指定できます。型の指定方法は全く同じです。

実行すると、以下のような結果が表示されます。

```
8
28
7
```

## オプショナル引数とデフォルト引数

### オプショナル引数の使い方

実際のプログラムでは、すべての引数が必須ではない場合があります。例えば、挨拶の関数で名前は必須だけれど、敬称は省略可能にしたい場合などです。

このような場合、TypeScriptでは**オプショナル引数**という機能を使います。引数名の後ろに`?`を付けることで、その引数を省略可能にできます。

```typescript
// オプショナル引数を使った関数
function greetWithTitle(name: string, title?: string): string {
    if (title) {
        return "Hello, " + title + " " + name + "!";
    } else {
        return "Hello, " + name + "!";
    }
}

console.log(greetWithTitle("田中")); // Hello, 田中!
console.log(greetWithTitle("田中", "さん")); // Hello, さん 田中!
console.log(greetWithTitle("山田", "先生")); // Hello, 先生 山田!
```

ここでは、`title`引数に`?`を付けることで、この引数が省略可能であることを示しています。省略された場合、`title`の値は`undefined`になります。

実行すると、以下のような結果が表示されます。

```
Hello, 田中!
Hello, さん 田中!
Hello, 先生 山田!
```

### デフォルト引数の型指定

引数にデフォルト値を設定することもできます。デフォルト値が設定されている場合、TypeScriptは自動的にその値から型を推論してくれます。

```typescript
// デフォルト引数を使った関数
function calculateArea(width: number, height: number = 1): number {
    return width * height;
}

console.log(calculateArea(5)); // 5 (5 × 1)
console.log(calculateArea(5, 3)); // 15 (5 × 3)

// 挨拶の関数もデフォルト引数で書き直し
function greetWithDefault(name: string, greeting: string = "Hello"): string {
    return greeting + ", " + name + "!";
}

console.log(greetWithDefault("田中")); // Hello, 田中!
console.log(greetWithDefault("佐藤", "Good morning")); // Good morning, 佐藤!
```

デフォルト引数を使用した場合、その引数は自動的にオプショナルになります。また、TypeScriptはデフォルト値から型を推論するので、明示的に型を指定しなくても適切な型が決まります。

実行すると、以下のような結果が表示されます。

```
5
15
Hello, 田中!
Good morning, 佐藤!
```

## void型とundefinedの違い

### 何も返さない関数の型指定

すべての関数が値を返すわけではありません。例えば、コンソールに文字を出力するだけの関数や、HTMLの要素を操作するだけの関数などは、特に値を返す必要がありません。

このような関数の戻り値の型は、**void型**で指定します。`void`は「何も返さない」ことを表す特別な型です。

```typescript
// void型を返す関数
function printMessage(message: string): void {
    console.log("メッセージ: " + message);
    // returnは書かない、または return; のみ
}

// 配列を処理する関数
function processArray(numbers: number[]): void {
    numbers.forEach(num => console.log(num * 2));
}

printMessage("こんにちは"); // コンソールに出力される
processArray([1, 2, 3]); // 2, 4, 6 が出力される
```

実際にファイルをコンパイルして実行してみると、`printMessage`関数によってコンソールにメッセージが出力され、`processArray`関数によって配列の各要素が2倍されて出力されることがわかります。

実行結果は以下のようになります。

```
メッセージ: こんにちは
2
4
6
```

### voidとundefinedの使い分け

初心者の方が混乱しやすいのが、`void`型と`undefined`型の違いです。簡単に説明すると次のようになります。

- **void型**：関数が「何も返さない」ことを意図している場合に使用
- **undefined型**：明示的に`undefined`という値を返す場合に使用

```typescript
// void型の例：何も返さない
function logError(error: string): void {
    console.error("エラー: " + error);
}

// undefined型の例：明示的にundefinedを返す
function findUser(id: number): string | undefined {
    if (id === 1) {
        return "田中";
    }
    return undefined; // 見つからない場合はundefinedを返す
}

logError("ファイルが見つかりません");

const user = findUser(1);
console.log("見つかったユーザー:", user); // "田中"

const notFoundUser = findUser(999);
console.log("見つからなかったユーザー:", notFoundUser); // undefined
```

この例では、`findUser`関数は文字列またはundefinedを返す可能性があるため、戻り値の型を`string | undefined`としています。`|`は「または」を意味する記号で、これまでに学んだUnion型の書き方です。

実行すると、以下のような結果が表示されます。

```
エラー: ファイルが見つかりません
見つかったユーザー: 田中
見つからなかったユーザー: undefined
```

## 実用的な関数の型定義例

最後に、これまでに学んだ配列やオブジェクトの型定義を活用した、実用的な関数の例を見てみましょう。

```typescript
// 配列の要素を処理する関数
function processNumbers(numbers: number[]): number[] {
    return numbers.map(num => num * 2);
}

// オブジェクトを受け取る関数
function createUserProfile(name: string, age: number, email?: string): object {
    const profile = {
        name: name,
        age: age,
        createdAt: new Date()
    };
    
    if (email) {
        profile.email = email;
    }
    
    return profile;
}

// 条件によって異なる型を返す関数
function formatValue(value: number, asString: boolean): string | number {
    if (asString) {
        return value.toString();
    }
    return value;
}

// 実行例
const doubledNumbers = processNumbers([1, 2, 3, 4, 5]);
console.log("2倍にした配列:", doubledNumbers); // [2, 4, 6, 8, 10]

const userProfile = createUserProfile("田中", 25, "tanaka@example.com");
console.log("ユーザープロフィール:", userProfile);

const stringValue = formatValue(123, true);
console.log("文字列として:", stringValue, typeof stringValue); // "123" string

const numberValue = formatValue(123, false);
console.log("数値として:", numberValue, typeof numberValue); // 123 number
```

このコードをコンパイルして実行すると、配列が2倍になったり、ユーザープロフィールのオブジェクトが作成されたり、条件に応じて異なる型の値が返されたりすることが確認できます。

実行結果は以下のようになります。

```
2倍にした配列: [2, 4, 6, 8, 10]
ユーザープロフィール: {name: "田中", age: 25, createdAt: Mon Jun 08 2025 ..., email: "tanaka@example.com"}
文字列として: 123 string
数値として: 123 number
```

## まとめ

本章では、TypeScriptでの関数の型定義について学習しました。以下の内容をマスターできたことと思います。

関数の引数と戻り値に型を指定することで、意図しないデータの混入を防ぐことができます。また、オプショナル引数やデフォルト引数を活用することで、柔軟で使いやすい関数を作成することができます。

`void`型は何も返さない関数に使用し、`undefined`型は明示的にundefinedを返す可能性がある関数に使用するという使い分けも重要なポイントです。

これまでに学んだ配列やオブジェクトの型定義と組み合わせることで、より実用的で安全な関数を作成できるようになりました。次章では、関数型とコールバック関数について詳しく学んでいきます。