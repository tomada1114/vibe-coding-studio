---
title: プリミティブ型を使いこなそう
nextjs:
  metadata:
    title: プリミティブ型を使いこなそう
    description: TypeScriptのプリミティブ型（number、string、boolean、null、undefined）の詳細な使い方と型安全な扱い方を学び、実際の開発で活用できる知識を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- number型の詳細な使い方と数値計算での型安全性を理解する
- string型とテンプレートリテラルの活用方法を習得する
- boolean型と型安全性の関係を学ぶ
- nullとundefinedの違いと型安全な扱い方を理解する

## はじめに

前章では変数に型注釈をつける基本的な方法を学びました。今回は、TypeScriptで最もよく使われる**プリミティブ型**について、より詳しく学んでいきましょう。

プリミティブ型とは、プログラミングにおける最も基本的なデータ型のことです。TypeScriptでは主に`number`、`string`、`boolean`、`null`、`undefined`があります。基本的な型を正しく理解し、使いこなせるようになることで、より安全で読みやすいコードを書けるようになります。

それぞれの型の特徴と実際の使い方を、具体的な例を通じて一緒に学んでいきましょう。

## number型の詳細な使い方

TypeScriptの`number`型は、JavaScriptと同様に整数と小数の両方を扱うことができます。また、特殊な数値も含まれています。

VS Codeで新しいファイル`primitive-types.ts`を作成し、以下のコードを入力してみましょう。

```typescript
// number型の基本的な使い方
let age: number = 25;
let height: number = 175.5;
let temperature: number = -10;

console.log(`年齢: ${age}`);
console.log(`身長: ${height}cm`);
console.log(`気温: ${temperature}度`);
```

number型では、整数だけでなく小数や負の数も扱うことができます。また、JavaScriptの数値と同様に、様々な形式で数値を表現できます。

```typescript
// 様々な数値表現
let binaryNumber: number = 0b1010; // 2進数（10）
let octalNumber: number = 0o12; // 8進数（10）
let hexNumber: number = 0xa; // 16進数（10）
let scientificNumber: number = 1e2; // 科学記法（100）

console.log(`2進数 0b1010: ${binaryNumber}`);
console.log(`8進数 0o12: ${octalNumber}`);
console.log(`16進数 0xa: ${hexNumber}`);
console.log(`科学記法 1e2: ${scientificNumber}`);
```

TypeScriptのnumber型には、いくつかの特殊な値も含まれています。これらを理解しておくことで、数値計算でのエラーハンドリングがより適切に行えるようになります。

```typescript
// 特殊な数値
let infinityValue: number = Infinity;
let negativeInfinity: number = -Infinity;
let notANumber: number = NaN;

console.log(`無限大: ${infinityValue}`);
console.log(`負の無限大: ${negativeInfinity}`);
console.log(`数値ではない: ${notANumber}`);

// 0で割った場合
let divisionByZero: number = 10 / 0;
console.log(`10 ÷ 0 = ${divisionByZero}`);
```

number型を使った計算では、TypeScriptが結果も自動的にnumber型として推論してくれます。これにより、計算結果を安全に扱うことができます。

```typescript
// 数値計算での型推論
let price: number = 1000;
let tax: number = 0.1;
let totalPrice = price + (price * tax); // 自動的にnumber型として推論される

console.log(`商品価格: ${price}円`);
console.log(`税率: ${tax * 100}%`);
console.log(`合計金額: ${totalPrice}円`);
```

## string型とテンプレートリテラル

string型は文字列を扱うための型です。TypeScriptでは、JavaScriptと同様に3つの方法で文字列を定義できます。

`primitive-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// string型の基本的な使い方
let singleQuoteString: string = 'シングルクォート';
let doubleQuoteString: string = "ダブルクォート";
let templateString: string = `テンプレートリテラル`;

console.log(singleQuoteString);
console.log(doubleQuoteString);
console.log(templateString);
```

特に便利なのが**テンプレートリテラル**です。バッククォート（`）を使って文字列を囲むことで、変数や式を文字列の中に埋め込むことができます。

```typescript
// テンプレートリテラルの活用
let firstName: string = "太郎";
let lastName: string = "田中";
let userAge: number = 28;

// 変数を文字列に埋め込む
let introduction: string = `こんにちは、私は${lastName}${firstName}です。年齢は${userAge}歳です。`;
console.log(introduction);

// 計算結果も埋め込める
let birthYear: number = 2024 - userAge;
let detailInfo: string = `生まれ年は${birthYear}年です。来年は${userAge + 1}歳になります。`;
console.log(detailInfo);
```

テンプレートリテラルを使うことで、文字列の連結が非常に読みやすくなります。従来の文字列連結と比較してみましょう。

```typescript
// 従来の文字列連結との比較
let productName: string = "TypeScript入門書";
let productPrice: number = 2980;

// 従来の方法（読みにくい）
let oldWay: string = "商品名: " + productName + "、価格: " + productPrice + "円";

// テンプレートリテラルを使った方法（読みやすい）
let newWay: string = `商品名: ${productName}、価格: ${productPrice}円`;

console.log("従来の方法:", oldWay);
console.log("新しい方法:", newWay);
```

テンプレートリテラルでは、複数行の文字列も簡単に書くことができます。これは、HTMLテンプレートやメッセージの作成などで特に便利です。

```typescript
// 複数行の文字列
let multiLineMessage: string = `
お疲れ様です。

本日の会議の件でご連絡いたします。
時間: 14:00〜15:00
場所: 会議室A

よろしくお願いいたします。
`;

console.log(multiLineMessage);
```

## boolean型と型安全性

boolean型は、`true`または`false`の2つの値のみを持つ型です。条件分岐や状態管理において非常に重要な役割を果たします。

`primitive-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// boolean型の基本的な使い方
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;
let isCompleted: boolean = true;

console.log(`ログイン状態: ${isLoggedIn}`);
console.log(`権限あり: ${hasPermission}`);
console.log(`完了状態: ${isCompleted}`);
```

boolean型は、比較演算や論理演算の結果としても生成されます。TypeScriptでは、これらの演算結果も自動的にboolean型として推論されます。

```typescript
// 比較演算でのboolean型
let userScore: number = 85;
let passingScore: number = 80;

let isPassed = userScore >= passingScore; // 自動的にboolean型として推論
let isExcellent = userScore >= 90; // 自動的にboolean型として推論

console.log(`合格: ${isPassed}`);
console.log(`優秀: ${isExcellent}`);

// 文字列の比較
let inputPassword: string = "password123";
let correctPassword: string = "password123";

let isPasswordCorrect = inputPassword === correctPassword;
console.log(`パスワード正解: ${isPasswordCorrect}`);
```

boolean型を使った条件分岐では、TypeScriptの型推論により、分岐内での変数の型がより具体的に絞り込まれることがあります。

```typescript
// 条件分岐での型の絞り込み
let userInput: string | number = "123"; // union型（後の章で詳しく説明）

if (typeof userInput === "string") {
    // この分岐内では、userInputはstring型として扱われる
    console.log(`文字列の長さ: ${userInput.length}`);
} else {
    // この分岐内では、userInputはnumber型として扱われる
    console.log(`数値の2倍: ${userInput * 2}`);
}
```

## null と undefined の型安全な扱い

JavaScriptには「値がない」ことを表す2つの特殊な値、`null`と`undefined`があります。TypeScriptでは、これらもそれぞれ独立した型として扱われます。

`primitive-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// null と undefined の基本
let nullValue: null = null;
let undefinedValue: undefined = undefined;

console.log(`null値: ${nullValue}`);
console.log(`undefined値: ${undefinedValue}`);
```

一般的に、`null`は「意図的に値がない」ことを表し、`undefined`は「値が設定されていない」ことを表します。この違いを理解することで、より適切なコードを書くことができます。

```typescript
// null と undefined の使い分け
let userName: string | null = null; // ユーザーが未ログインの場合
let userEmail: string | undefined; // まだ設定されていない場合

// ユーザーがログインした場合
userName = "田中太郎";
console.log(`ユーザー名: ${userName}`);

// メールアドレスが設定される前
console.log(`メールアドレス: ${userEmail}`); // undefined が表示される

// メールアドレスが設定された場合
userEmail = "tanaka@example.com";
console.log(`メールアドレス: ${userEmail}`);
```

TypeScriptでは、nullやundefinedの可能性がある値に対して、安全にアクセスするための方法が提供されています。

```typescript
// 安全なnullチェック
let optionalMessage: string | null = null;

// 条件分岐でnullチェック
if (optionalMessage !== null) {
    console.log(`メッセージの長さ: ${optionalMessage.length}`);
} else {
    console.log("メッセージが設定されていません");
}

// 三項演算子を使った方法
let messageLength = optionalMessage !== null ? optionalMessage.length : 0;
console.log(`メッセージの長さ（デフォルト0）: ${messageLength}`);

// オプショナルチェーニング（?.）を使った方法
let safeLength = optionalMessage?.length;
console.log(`安全な長さ取得: ${safeLength}`); // nullの場合はundefinedが返される
```

実際の開発では、APIからのデータやユーザー入力など、値が存在しない可能性があるデータを扱うことがよくあります。このような場合に、null や undefined を適切に扱うことで、実行時エラーを防ぐことができます。

```typescript
// 実用的な例：ユーザー情報の管理
let currentUser: {
    name: string;
    email: string | null;
    phone?: string; // ?マークでオプショナルプロパティを表現
} = {
    name: "山田花子",
    email: null, // メールアドレス未設定
    // phoneは省略可能
};

console.log(`ユーザー名: ${currentUser.name}`);
console.log(`メール: ${currentUser.email ?? "未設定"}`); // null合体演算子
console.log(`電話番号: ${currentUser.phone ?? "未設定"}`);
```

ファイルをコンパイルして実行してみましょう。

```bash
npx tsc primitive-types.ts
node primitive-types.js
```

すべてのコードが正常に実行され、各型の動作を確認できることと思います。

## まとめ

本章では、TypeScriptのプリミティブ型について詳しく学習しました。以下の重要なポイントを理解できたことと思います。

- number型は整数、小数、特殊な数値（Infinity、NaN）をすべて扱える
- string型ではテンプレートリテラルを活用することで読みやすいコードが書ける
- boolean型は条件分岐や状態管理で重要な役割を果たし、型の絞り込みにも活用される
- nullとundefinedは「値がない」状態を表すが、使い分けることでコードの意図を明確にできる
- TypeScriptの型システムにより、これらの型を安全に扱うことができる

これらのプリミティブ型は、TypeScriptでプログラムを書く上での基礎となります。適切に使いこなすことで、より安全で保守性の高いコードを書けるようになります。次章では、これらの型を組み合わせた配列とタプルについて学んでいきましょう。