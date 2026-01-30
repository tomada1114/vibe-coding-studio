---
title: while文を使った繰り返しを学ぼう
nextjs:
  metadata:
    title: while文を使った繰り返しを学ぼう
    description: JavaScriptのwhile文を使って条件に基づく繰り返し処理を学びます。for文との違いや使い分けも理解できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `while`文の基本的な構文と動作原理を理解する
- `for`文との違いと使い分け方法を習得する
- `do-while`文の特徴と使用場面を学ぶ
- 無限ループの防止方法を身につける

## はじめに

前の章ではfor文を使った繰り返し処理を学びました。そして、決まった回数だけ処理を繰り返す場合にfor文が便利だということも確認しましたね。

一方で、「条件が満たされている間は処理を続けたい」という場面もあります。例えば、「ユーザーが正しい値を入力するまで繰り返す」「特定の条件が満たされるまで計算を続ける」といった場合です。このような条件ベースの繰り返し処理には、**while文**が適しています。

## while文の基本的な書き方

`while`文の基本的な構文は以下のとおりです。

```javascript
while (条件) {
  // 条件が true の間、繰り返し実行される処理
}
```

実際にコードを書いて試してみましょう。まずはHTMLファイルを作成してください。

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>while文を学ぼう</title>
</head>
<body>
  <h1>while文を学ぼう</h1>
  <script src="script.js"></script>
</body>
</html>
```

`script.js`

```javascript
let count = 1;

while (count <= 5) {
  console.log(`${count}回目の処理です`);
  count++;
}

console.log('while文終了');
```

HTMLファイルをブラウザで開いて、開発者ツールのコンソールを確認してみてください。以下のような結果が表示されるはずです。

```
1回目の処理です
2回目の処理です
3回目の処理です
4回目の処理です
5回目の処理です
while文終了
```

このwhile文では、`count`が5以下の間は処理を繰り返し、毎回`count`を1ずつ増やしています。そして、`count`が6になると条件が`false`になり、繰り返しが終了します。

## while文とfor文の違いを理解しよう

同じ処理をfor文で書くとどうなるか比較してみましょう。

```javascript
// while文版
let count = 1;
while (count <= 5) {
  console.log(`while文: ${count}回目`);
  count++;
}

// for文版
for (let i = 1; i <= 5; i++) {
  console.log(`for文: ${i}回目`);
}
```

実行結果：

```
while文: 1回目
while文: 2回目
while文: 3回目
while文: 4回目
while文: 5回目
for文: 1回目
for文: 2回目
for文: 3回目
for文: 4回目
for文: 5回目
```

結果は同じですが、while文の方がより柔軟な条件設定ができます。また、for文は回数が明確な場合に適していて、while文は条件が複雑な場合や回数が不明な場合に適しています。

## 条件による繰り返しを試してみよう

while文の真価は、より複雑な条件での繰り返し処理で発揮されます。次に、条件が満たされるまで繰り返す例を見てみましょう。

```javascript
let number = 1;

while (number < 100) {
  number = number * 2;
  console.log(`2倍した結果: ${number}`);
}

console.log('100以上になったので終了');
```

実行結果：

```
2倍した結果: 2
2倍した結果: 4
2倍した結果: 8
2倍した結果: 16
2倍した結果: 32
2倍した結果: 64
2倍した結果: 128
100以上になったので終了
```

この例では、数値が100未満の間は2倍にする処理を繰り返しています。そして、何回繰り返すかは事前にはわからず、条件によって決まります。

## 無限ループに注意しよう

while文を使う際に最も注意すべきことは、**無限ループ**です。条件が永続的に`true`になってしまうと、処理が終わらなくなってしまいます。

```javascript
// 危険な例（実行しないでください）
// let count = 1;
// while (count <= 5) {
//   console.log(count);
//   // count++を忘れると無限ループになる
// }
```

上記のコードでは、`count`の値が変更されないため、`count <= 5`が永続的に`true`となり、無限ループが発生します。また、while文を使う際は、必ずループ内で条件を変化させる処理を含めるようにしましょう。

正しい例を見てみましょう。

```javascript
let count = 1;

while (count <= 5) {
  console.log(`安全な繰り返し: ${count}`);
  count++; // 必ず条件を変化させる
}

console.log('正常に終了');
```

実行結果：

```
安全な繰り返し: 1
安全な繰り返し: 2
安全な繰り返し: 3
安全な繰り返し: 4
安全な繰り返し: 5
正常に終了
```

## do-while文も知っておこう

while文には、**do-while文**という変種もあります。これは、最低でも1回は処理を実行してから条件をチェックします。

```javascript
let input = 0;

do {
  input++;
  console.log(`処理を実行: ${input}`);
} while (input < 3);

console.log('do-while文終了');
```

実行結果：

```
処理を実行: 1
処理を実行: 2
処理を実行: 3
do-while文終了
```

通常のwhile文と比較してみましょう。

```javascript
let value = 5;

// 通常のwhile文
while (value < 3) {
  console.log('通常のwhile文で実行');
}

// do-while文
do {
  console.log('do-while文で実行');
} while (value < 3);

console.log('比較終了');
```

実行結果：

```
do-while文で実行
比較終了
```

通常のwhile文では条件が最初から`false`なので一度も実行されませんが、do-while文では最低1回は実行されます。

## 配列の処理にwhile文を使ってみよう

while文は配列の処理にも使えます。次に、配列の要素を順番に処理する例を見てみましょう。

```javascript
const colors = ['赤', '青', '緑', '黄'];
let index = 0;

while (index < colors.length) {
  console.log(`${index + 1}番目の色: ${colors[index]}`);
  index++;
}

console.log('全ての色を表示しました');
```

実行結果：

```
1番目の色: 赤
2番目の色: 青
3番目の色: 緑
4番目の色: 黄
全ての色を表示しました
```

また、特定の条件で配列の処理を途中で止めることもできます。

```javascript
const numbers = [2, 4, 7, 8, 10];
let i = 0;

while (i < numbers.length) {
  if (numbers[i] % 2 !== 0) {
    console.log(`奇数${numbers[i]}が見つかりました`);
    break;
  }
  console.log(`偶数: ${numbers[i]}`);
  i++;
}

console.log('処理終了');
```

実行結果：

```
偶数: 2
偶数: 4
奇数7が見つかりました
処理終了
```

この例では、配列から最初の奇数を見つけるまで処理を続け、見つかったらループを終了しています。

## 複雑な条件でwhile文を使ってみよう

while文では、複数の条件を組み合わせることもできます。

```javascript
let attempts = 0;
let success = false;

while (attempts < 5 && !success) {
  attempts++;

  // ランダムに成功するかどうかを決める（50%の確率）
  const random = Math.random();

  if (random > 0.5) {
    success = true;
    console.log(`${attempts}回目で成功しました！`);
  } else {
    console.log(`${attempts}回目は失敗...`);
  }
}

if (!success) {
  console.log('5回試しても成功しませんでした');
}

console.log('チャレンジ終了');
```

実行結果（実行するたびに結果が変わります）：

```
1回目は失敗...
2回目は失敗...
3回目で成功しました！
チャレンジ終了
```

この例では、「最大5回まで」かつ「成功するまで」という2つの条件を組み合わせています。そして、どちらかの条件が満たされなくなるとループが終了します。

## まとめ

この章では、while文を使った繰り返し処理について学びました。また、for文との違いや、do-while文についても確認しました。

while文は条件ベースの繰り返し処理に適していて、特に繰り返し回数が事前に分からない場合に有効です。さらに、複雑な条件を組み合わせることで、より柔軟な制御が可能になります。
