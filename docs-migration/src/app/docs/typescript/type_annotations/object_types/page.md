---
title: オブジェクトの型定義
nextjs:
  metadata:
    title: オブジェクトの型定義
    description: TypeScriptでオブジェクトの型定義を学び、プロパティの型指定、オプショナルプロパティ、readonlyプロパティの使い方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- オブジェクト型の基本構文を理解する
- オプショナルプロパティの使い方を習得する
- readonlyプロパティで値の変更を防ぐ方法を学ぶ
- ネストしたオブジェクトの型定義方法を理解する

## はじめに

前章では配列とタプルの型定義について学びました。今回は、複数のプロパティを持つ**オブジェクト**の型定義について学んでいきましょう。

オブジェクトは、関連するデータをまとめて管理するときに使われる重要なデータ構造です。TypeScriptでは、オブジェクトの各プロパティに型を指定することで、より安全にデータを扱うことができるようになります。

実際のWebアプリケーション開発では、ユーザー情報や商品データなど、多くの場面でオブジェクトを使うことになります。適切な型定義ができるようになることで、開発効率と安全性が大幅に向上します。

## オブジェクト型の基本構文

TypeScriptでオブジェクトの型を定義するには、波括弧`{}`の中にプロパティ名と型を記述します。

VS Codeで新しいファイル`object-types.ts`を作成し、以下のコードを入力してみましょう。

```typescript
// オブジェクト型の基本的な書き方
let user: { name: string; age: number; } = {
    name: "田中太郎",
    age: 25
};

console.log(`名前: ${user.name}`);
console.log(`年齢: ${user.age}`);
```

オブジェクトの型定義では、各プロパティの名前と型を`:` (コロン)で区切って指定します。プロパティ同士は`;` (セミコロン)で区切ります。

複数のプロパティを持つオブジェクトも同様に定義できます。

```typescript
// 複数のプロパティを持つオブジェクト
let product: { 
    name: string; 
    price: number; 
    inStock: boolean; 
} = {
    name: "TypeScript入門書",
    price: 2980,
    inStock: true
};

console.log(`商品名: ${product.name}`);
console.log(`価格: ${product.price}円`);
console.log(`在庫あり: ${product.inStock}`);
```

オブジェクトの型定義は複数行に分けて書くことで、読みやすくなります。また、TypeScriptでは定義したプロパティ以外のプロパティにアクセスしようとするとエラーになります。

```typescript
// 型チェックの例
let book: { title: string; pages: number; } = {
    title: "JavaScript入門",
    pages: 300
};

console.log(book.title); // 正常にアクセス可能
// console.log(book.author); // エラー！authorプロパティは定義されていない
```

## オプショナルプロパティの使い方

すべてのプロパティが必須ではない場合があります。そのような場合は、プロパティ名の後に`?`をつけることで、そのプロパティを**オプショナル**（省略可能）にできます。

`object-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// オプショナルプロパティの使用
let employee: { 
    name: string; 
    age: number; 
    email?: string; // オプショナルプロパティ
} = {
    name: "佐藤花子",
    age: 30
    // emailは省略可能
};

console.log(`従業員名: ${employee.name}`);
console.log(`年齢: ${employee.age}`);
console.log(`メール: ${employee.email}`); // undefinedが表示される
```

オプショナルプロパティにアクセスする際は、値が`undefined`の可能性があることを考慮する必要があります。

```typescript
// オプショナルプロパティの安全な使用
let customer: { 
    name: string; 
    phone?: string; 
} = {
    name: "山田次郎"
};

// 条件分岐でundefinedチェック
if (customer.phone) {
    console.log(`電話番号: ${customer.phone}`);
} else {
    console.log("電話番号は登録されていません");
}

// オプショナルチェーニングを使用
console.log(`電話番号の長さ: ${customer.phone?.length || "未登録"}`);
```

オプショナルプロパティには後から値を代入することもできます。

```typescript
// オプショナルプロパティへの値の代入
customer.phone = "090-1234-5678";
console.log(`電話番号（追加後）: ${customer.phone}`);
```

## readonlyプロパティで値の変更を防ぐ

一度設定したら変更してほしくないプロパティには、`readonly`キーワードを使用できます。これにより、オブジェクト作成後にそのプロパティを変更しようとするとエラーになります。

`object-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// readonlyプロパティの使用
let config: { 
    readonly appName: string; 
    readonly version: string; 
    maxUsers: number; 
} = {
    appName: "MyApp",
    version: "1.0.0",
    maxUsers: 100
};

console.log(`アプリ名: ${config.appName}`);
console.log(`バージョン: ${config.version}`);
console.log(`最大ユーザー数: ${config.maxUsers}`);

// maxUsersは変更可能
config.maxUsers = 200;
console.log(`最大ユーザー数（変更後）: ${config.maxUsers}`);

// readonlyプロパティは変更不可
// config.appName = "NewApp"; // エラー！readonlyプロパティは変更できない
// config.version = "2.0.0"; // エラー！readonlyプロパティは変更できない
```

`readonly`を使うことで、設定ファイルやIDなど、変更されてはいけないデータを保護できます。

## ネストしたオブジェクトの型定義

オブジェクトの中に別のオブジェクトが含まれている場合も、それぞれに型を定義できます。

`object-types.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// ネストしたオブジェクトの型定義
let company: {
    name: string;
    address: {
        prefecture: string;
        city: string;
        zipCode: string;
    };
    employeeCount: number;
} = {
    name: "サンプル株式会社",
    address: {
        prefecture: "東京都",
        city: "渋谷区",
        zipCode: "150-0001"
    },
    employeeCount: 50
};

console.log(`会社名: ${company.name}`);
console.log(`所在地: ${company.address.prefecture}${company.address.city}`);
console.log(`郵便番号: ${company.address.zipCode}`);
console.log(`従業員数: ${company.employeeCount}人`);
```

ネストしたオブジェクトの各プロパティにも、個別にアクセスできます。TypeScriptは、ネストした構造でも適切に型チェックを行います。

```typescript
// ネストしたオブジェクトのプロパティ変更
company.address.city = "新宿区";
company.employeeCount = 55;

console.log(`変更後の市区町村: ${company.address.city}`);
console.log(`変更後の従業員数: ${company.employeeCount}人`);

// company.address.prefecture = 123; // エラー！数値は代入できない
```

複数のオブジェクトを配列で管理することもできます。

```typescript
// オブジェクトの配列
let users: { name: string; age: number; }[] = [
    { name: "田中", age: 25 },
    { name: "佐藤", age: 30 },
    { name: "鈴木", age: 28 }
];

console.log("ユーザー一覧:");
users.forEach(user => {
    console.log(`- ${user.name} (${user.age}歳)`);
});
```

ファイルをコンパイルして実行してみましょう。

```bash
npx tsc object-types.ts
node object-types.js
```

すべてのコードが正常に実行され、オブジェクトの型定義が適切に動作することを確認できます。

## まとめ

本章では、TypeScriptにおけるオブジェクトの型定義について学習しました。以下の重要なポイントを理解できたことと思います。

- オブジェクト型は波括弧内にプロパティ名と型を記述して定義する
- オプショナルプロパティ（`?`）を使って省略可能なプロパティを作成できる
- readonlyプロパティを使って変更不可能なプロパティを定義できる
- ネストしたオブジェクトでも階層的に型定義が可能

オブジェクトの型定義をマスターすることで、実際のアプリケーション開発で扱う複雑なデータ構造も安全に管理できるようになります。次章では、オブジェクトを処理する関数の型定義について学んでいきましょう。