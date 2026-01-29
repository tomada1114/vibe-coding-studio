---
title: インターフェースでオブジェクトの形を定義しよう
nextjs:
  metadata:
    title: インターフェースでオブジェクトの形を定義しよう
    description: TypeScriptのインターフェースを使ってオブジェクトの構造を定義する方法を学び、再利用可能で保守性の高いコードの書き方を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- インターフェースとは何か、なぜ必要なのかを理解する
- `interface`文を使ったオブジェクトの型定義方法を習得する
- プロパティとメソッドの型指定の書き方を学ぶ
- インターフェースの継承（`extends`）の使い方を理解する
- 実用的なインターフェースの設計方法を習得する

## インターフェースとは何か

これまでの章では、オブジェクトの型を直接定義する方法を学んできました。しかし、同じような構造のオブジェクトを何度も使う場合、毎回型を書くのは大変ですし、間違いの元にもなります。

そこで役に立つのが**インターフェース**です。インターフェースを使うと、オブジェクトの「形」や「構造」を名前をつけて定義できます。これにより、同じ構造を持つオブジェクトを何度でも再利用できるようになります。

たとえば、ユーザー情報を扱うオブジェクトがあるとします。名前、年齢、メールアドレスという構造は、アプリケーション内で何度も使われるでしょう。インターフェースを使えば、この構造を一度定義するだけで、どこでも使い回すことができます。

まずは簡単な例から始めて、インターフェースの基本的な使い方を見ていきましょう。

## interface文の基本構文

インターフェースを定義するには、`interface`文を使います。VS Codeで新しいファイル`interface-basic.ts`を作成し、以下のコードを入力してみましょう。

```typescript
// ユーザー情報の構造を定義
interface User {
  name: string;
  age: number;
  email: string;
}

// インターフェースを使ってオブジェクトを作成
const user1: User = {
  name: "田中太郎",
  age: 25,
  email: "tanaka@example.com"
};

const user2: User = {
  name: "佐藤花子",
  age: 30,
  email: "sato@example.com"
};

console.log(user1);
console.log(user2);
```

このコードを実行すると、以下のような結果が表示されます。

```
{ name: "田中太郎", age: 25, email: "tanaka@example.com" }
{ name: "佐藤花子", age: 30, email: "sato@example.com" }
```

コードの解説をしていきましょう。まず、`interface User`でユーザー情報の構造を定義しています。この中で、`name`は文字列型、`age`は数値型、`email`は文字列型と指定しています。

次に、実際のオブジェクトを作成する際に、`: User`という型注釈を使っています。これにより、そのオブジェクトは`User`インターフェースで定義された構造に従う必要があります。

インターフェースを使うことで、オブジェクトの構造が一貫性を持ち、プロパティの名前や型を間違えることが防げます。また、VS Codeでは自動補完機能も働くため、開発効率も向上します。

## プロパティの型指定

インターフェースでは、様々な型のプロパティを定義できます。これまで学んだ型をすべて使うことができます。

```typescript
// より詳細なユーザー情報のインターフェース
interface DetailedUser {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    prefecture: string;
    city: string;
  };
}

// インターフェースを使ったオブジェクトの作成
const detailedUser: DetailedUser = {
  id: 1,
  name: "山田次郎",
  age: 28,
  email: "yamada@example.com",
  isActive: true,
  hobbies: ["読書", "映画鑑賞", "プログラミング"],
  address: {
    prefecture: "東京都",
    city: "渋谷区"
  }
};

console.log(detailedUser);
```

実行結果は以下のようになります。

```
{
  id: 1,
  name: "山田次郎",
  age: 28,
  email: "yamada@example.com",
  isActive: true,
  hobbies: ["読書", "映画鑑賞", "プログラミング"],
  address: { prefecture: "東京都", city: "渋谷区" }
}
```

この例では、数値型の`id`、真偽値型の`isActive`、文字列配列型の`hobbies`、さらにネストしたオブジェクト型の`address`を含むインターフェースを定義しています。このように、インターフェースでは複雑な構造も表現できます。

## オプショナルプロパティの使い方

すべてのプロパティが必須とは限りません。場合によっては、あってもなくてもよいプロパティがあります。そのような場合は、プロパティ名の後に`?`を付けることで、オプショナル（任意）なプロパティにできます。

```typescript
// オプショナルプロパティを含むインターフェース
interface Profile {
  name: string;
  age: number;
  bio?: string; // オプショナルプロパティ
  website?: string; // オプショナルプロパティ
}

// bioとwebsiteを両方含むオブジェクト
const profile1: Profile = {
  name: "鈴木一郎",
  age: 35,
  bio: "フロントエンドエンジニアです",
  website: "https://suzuki.dev"
};

// bioだけを含むオブジェクト
const profile2: Profile = {
  name: "高橋美咲",
  age: 27,
  bio: "デザイナーです"
};

// オプショナルプロパティを含まないオブジェクト
const profile3: Profile = {
  name: "中村拓也",
  age: 32
};

console.log(profile1);
console.log(profile2);
console.log(profile3);
```

実行結果は以下のようになります。

```
{ name: "鈴木一郎", age: 35, bio: "フロントエンドエンジニアです", website: "https://suzuki.dev" }
{ name: "高橋美咲", age: 27, bio: "デザイナーです" }
{ name: "中村拓也", age: 32 }
```

オプショナルプロパティを使うことで、柔軟性のあるインターフェースを定義できます。必須の情報と任意の情報を明確に区別できるため、オブジェクトを作成する際の自由度が高まります。

## メソッドの型定義

インターフェースでは、プロパティだけでなくメソッド（関数）の型も定義できます。オブジェクトが持つべき関数の名前、引数の型、戻り値の型を指定できます。

```typescript
// メソッドを含むインターフェース
interface Calculator {
  value: number;
  add: (num: number) => number;
  subtract: (num: number) => number;
  reset: () => void;
}

// インターフェースに従ったオブジェクトの作成
const calculator: Calculator = {
  value: 0,
  add: function(num: number): number {
    this.value += num;
    return this.value;
  },
  subtract: function(num: number): number {
    this.value -= num;
    return this.value;
  },
  reset: function(): void {
    this.value = 0;
  }
};

// メソッドの使用
console.log("初期値:", calculator.value);
console.log("5を追加:", calculator.add(5));
console.log("3を減算:", calculator.subtract(3));
calculator.reset();
console.log("リセット後:", calculator.value);
```

実行結果は以下のようになります。

```
初期値: 0
5を追加: 5
3を減算: 2
リセット後: 0
```

この例では、`Calculator`インターフェースで数値型の`value`プロパティと3つのメソッドを定義しています。メソッドの型定義では、引数の型と戻り値の型を明記しています。`reset`メソッドは戻り値がないため、`void`型を指定しています。

## インターフェースの継承（extends）

インターフェースは、他のインターフェースを継承して拡張することができます。これにより、基本的な構造を再利用しながら、より詳細な型を定義できます。

```typescript
// 基本的なPersonインターフェース
interface Person {
  name: string;
  age: number;
}

// Personを継承したStudentインターフェース
interface Student extends Person {
  studentId: string;
  grade: number;
}

// Personを継承したTeacherインターフェース
interface Teacher extends Person {
  employeeId: string;
  subject: string;
}

// 各インターフェースを使ったオブジェクトの作成
const student: Student = {
  name: "佐々木花音",
  age: 20,
  studentId: "S2024001",
  grade: 2
};

const teacher: Teacher = {
  name: "田村先生",
  age: 45,
  employeeId: "T2020015",
  subject: "数学"
};

console.log("学生情報:", student);
console.log("教師情報:", teacher);
```

実行結果は以下のようになります。

```
学生情報: { name: "佐々木花音", age: 20, studentId: "S2024001", grade: 2 }
教師情報: { name: "田村先生", age: 45, employeeId: "T2020015", subject: "数学" }
```

継承を使うことで、共通の構造（`Person`）を何度も書く必要がなくなります。また、基本となるインターフェースに変更があった場合、継承しているすべてのインターフェースに自動的に反映されるため、保守性も向上します。

## 複数のインターフェースを継承する

TypeScriptでは、1つのインターフェースが複数のインターフェースを継承することもできます。これにより、より柔軟な型設計が可能になります。

```typescript
// 基本的なインターフェース群
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

interface Contactable {
  email: string;
  phone?: string;
}

// 複数のインターフェースを継承
interface Employee extends Named, Aged, Contactable {
  employeeId: string;
  department: string;
}

// 継承したインターフェースを使用
const employee: Employee = {
  name: "山本太郎",
  age: 30,
  email: "yamamoto@company.com",
  phone: "090-1234-5678",
  employeeId: "EMP001",
  department: "開発部"
};

console.log("従業員情報:", employee);
```

実行結果は以下のようになります。

```
従業員情報: {
  name: "山本太郎",
  age: 30,
  email: "yamamoto@company.com",
  phone: "090-1234-5678",
  employeeId: "EMP001",
  department: "開発部"
}
```

この例では、`Employee`インターフェースが`Named`、`Aged`、`Contactable`の3つのインターフェースを継承しています。それぞれのインターフェースから必要なプロパティを受け継ぎ、さらに独自のプロパティを追加しています。

## まとめ

本章では、TypeScriptのインターフェースについて学習しました。学んだ内容は以下の通りです。

- インターフェースを使ってオブジェクトの構造を名前付きで定義できる
- `interface`文でプロパティとメソッドの型を指定できる
- オプショナルプロパティ（`?`）で任意のプロパティを定義できる
- メソッドの引数と戻り値の型も定義できる
- `extends`キーワードで他のインターフェースを継承できる
- 複数のインターフェースを同時に継承することも可能

インターフェースを使うことで、コードの再利用性が高まり、型安全性も向上します。また、チーム開発においても、オブジェクトの構造が明確になるため、コミュニケーションが円滑になります。次の章では、型エイリアスとUnion型について学んでいきましょう。