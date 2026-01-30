---
title: 配列とタプルの型定義
nextjs:
  metadata:
    title: 配列とタプルの型定義
    description: TypeScriptで配列とタプルの型定義を学び、同じ型の要素を持つ配列と異なる型の要素を持つタプルの使い分けを習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 配列型の基本的な書き方を理解する
- 異なる型の要素を持つ配列の定義方法を習得する
- タプル型で要素数と型を固定する方法を学ぶ
- 配列メソッドでの型推論の仕組みを理解する

## はじめに

前章ではプリミティブ型について学びました。今回は、複数のデータをまとめて扱うための**配列**と**タプル**の型定義について学んでいきましょう。

配列は同じ種類のデータを複数個まとめて管理するときに使います。一方、タプルは異なる種類のデータを決まった順序で組み合わせて管理するときに便利です。

それぞれの特徴と使い方を、具体的な例を通じて一緒に学んでいきましょう。

## 配列型の基本的な書き方

TypeScriptで配列の型を指定するには、要素の型の後に`[]`を付けるか、`Array<型名>`という書き方を使います。

VS Codeで新しいファイル`arrays-tuples.ts`を作成し、以下のコードを入力してみましょう。

```typescript
// 配列型の基本的な書き方
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["田中", "佐藤", "鈴木"];
let flags: boolean[] = [true, false, true];

console.log("数値の配列:", numbers);
console.log("名前の配列:", names);
console.log("真偽値の配列:", flags);
```

もう一つの書き方として、`Array<型名>`という形式も使えます。機能的には同じですが、好みやプロジェクトの規約に応じて使い分けます。

```typescript
// Array<型名>を使った書き方
let scores: Array<number> = [85, 92, 78, 96];
let cities: Array<string> = ["東京", "大阪", "名古屋"];

console.log("点数の配列:", scores);
console.log("都市の配列:", cities);
```

配列に要素を追加したり変更したりする場合も、TypeScriptが型をチェックしてくれます。正しい型の値のみが追加できるようになっています。

```typescript
// 配列への要素の追加と変更
let fruits: string[] = ["りんご", "バナナ"];

fruits.push("オレンジ"); // 文字列なので追加できる
fruits[0] = "いちご"; // 文字列なので変更できる

console.log("果物の配列:", fruits);

// fruits.push(123); // エラー！数値は追加できない
// fruits[1] = true; // エラー！真偽値は代入できない
```

## 異なる型の要素を持つ配列

時には、異なる型の要素を一つの配列に入れたい場合があります。そのような場合は、**ユニオン型**を使って複数の型を許可できます。

`arrays-tuples.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// 異なる型の要素を持つ配列
let mixedArray: (string | number)[] = ["田中", 25, "佐藤", 30];
let userInfo: (string | number | boolean)[] = ["山田太郎", 28, true, "エンジニア"];

console.log("混合配列:", mixedArray);
console.log("ユーザー情報:", userInfo);
```

ユニオン型（`|`で区切って複数の型を指定）を使うことで、指定した型のいずれかに該当する要素を配列に入れることができます。

```typescript
// 混合配列への要素の追加
mixedArray.push("新しい名前"); // 文字列なので追加できる
mixedArray.push(35); // 数値なので追加できる
// mixedArray.push(true); // エラー！booleanは許可されていない

console.log("追加後の混合配列:", mixedArray);
```

## タプル型で要素数と型を固定

**タプル**は、要素数と各要素の型が決まっている配列です。例えば、「1番目は必ず文字列、2番目は必ず数値」といったように、位置ごとに型が固定されています。

`arrays-tuples.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// タプル型の基本的な使い方
let person: [string, number] = ["田中太郎", 25];
let coordinate: [number, number] = [10, 20];
let userStatus: [string, boolean, number] = ["アクティブ", true, 100];

console.log("人物情報:", person);
console.log("座標:", coordinate);
console.log("ユーザー状態:", userStatus);
```

タプルでは、要素の順序と型が厳密にチェックされます。定義した順序と異なる型を入れたり、要素数を変更したりするとエラーになります。

```typescript
// タプルでの型チェック
let point: [number, number] = [5, 10];

console.log(`X座標: ${point[0]}, Y座標: ${point[1]}`);

// point = [10]; // エラー！要素数が足りない
// point = [5, 10, 15]; // エラー！要素数が多すぎる
// point = ["5", "10"]; // エラー！型が違う
```

タプルは、関数から複数の値を返したい場合や、決まった形式のデータを扱う場合に特に便利です。

```typescript
// タプルの実用的な例
let userRecord: [string, number, string] = ["田中", 25, "エンジニア"];
let [userName, userAge, userJob] = userRecord; // 分割代入

console.log(`名前: ${userName}`);
console.log(`年齢: ${userAge}`);
console.log(`職業: ${userJob}`);
```

## 配列メソッドでの型推論

TypeScriptでは、配列のメソッドを使った場合も適切に型推論が行われます。これにより、メソッドの戻り値も型安全に扱うことができます。

`arrays-tuples.ts`ファイルに以下のコードを追加してみましょう。

```typescript
// 配列メソッドでの型推論
let numbers: number[] = [1, 2, 3, 4, 5];

// mapメソッドの戻り値も自動的にnumber[]と推論される
let doubledNumbers = numbers.map(num => num * 2);
console.log("2倍にした数値:", doubledNumbers);

// filterメソッドの戻り値も元の配列と同じ型
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("偶数のみ:", evenNumbers);

// findメソッドの戻り値はnumber | undefinedと推論される
let foundNumber = numbers.find(num => num > 3);
console.log("3より大きい最初の数:", foundNumber);
```

文字列の配列でも同様に、メソッドの戻り値が適切に推論されます。

```typescript
// 文字列配列でのメソッド使用
let words: string[] = ["hello", "world", "typescript"];

// 各文字列を大文字に変換（戻り値はstring[]）
let upperWords = words.map(word => word.toUpperCase());
console.log("大文字変換:", upperWords);

// 長さが5文字以上の文字列のみ抽出（戻り値はstring[]）
let longWords = words.filter(word => word.length >= 5);
console.log("長い単語:", longWords);
```

配列の長さや要素へのアクセスも型安全に行えます。

```typescript
// 配列の基本操作
let colors: string[] = ["赤", "青", "緑"];

console.log(`配列の長さ: ${colors.length}`);
console.log(`最初の色: ${colors[0]}`);
console.log(`最後の色: ${colors[colors.length - 1]}`);

// 存在しないインデックスにアクセスした場合はundefinedが返される
console.log(`存在しない要素: ${colors[10]}`); // undefined
```

ファイルをコンパイルして実行してみましょう。

```bash
npx tsc arrays-tuples.ts
node arrays-tuples.js
```

すべてのコードが正常に実行され、配列とタプルの型推論が適切に動作することを確認できます。

## まとめ

本章では、TypeScriptにおける配列とタプルの型定義について学習しました。以下の重要なポイントを理解できたことと思います。

- 配列型は`型名[]`または`Array<型名>`の形式で定義する
- ユニオン型を使うことで、異なる型の要素を同じ配列に格納できる
- タプル型は要素数と各位置の型を固定して、より厳密な型チェックを提供する
- 配列メソッドの戻り値も適切に型推論され、型安全に操作できる

配列とタプルの使い分けを理解することで、データの性質に応じて最適な型定義を選択できるようになります。次章では、より複雑なデータ構造であるオブジェクトの型定義について学んでいきましょう。