---
title: 配列とfor文を組み合わせてみよう
nextjs:
  metadata:
    title: 配列とfor文を組み合わせてみよう
    description: JavaScriptの配列とfor文を組み合わせて、複数のデータを効率的に処理する方法を学びます。配列の要素を順番に処理する実用的なテクニックを習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- 配列とfor文を組み合わせた基本的な要素処理方法を理解する
- 配列の全要素を使った計算処理の書き方を習得する
- 条件に合う要素だけを選択的に処理する方法を学ぶ
- 配列から新しい配列を作成する方法を身につける

## はじめに

これまで配列の基本的な使い方と、for文による繰り返し処理を学んできました。そして、これらを組み合わせることで、複数のデータを効率的に処理できるようになります。

実際の開発では、「配列に入っている全ての商品に消費税を計算する」「学生の成績一覧から平均点を出す」といった場面で、配列とfor文の組み合わせがよく使われます。また、この組み合わせをマスターすることで、プログラムの幅が大きく広がります。

## 配列の全要素を順番に処理する

最も基本的なパターンから始めてみましょう。配列の全ての要素を順番に表示する例です。

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>配列とfor文を組み合わせよう</title>
</head>
<body>
  <h1>配列とfor文を組み合わせよう</h1>
  <script src="script.js"></script>
</body>
</html>
```

`script.js`

```javascript
const fruits = ['りんご', 'バナナ', 'オレンジ'];

for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}番目: ${fruits[i]}`);
}

console.log('全ての果物を表示しました');
```

実行結果：

```
1番目: りんご
2番目: バナナ
3番目: オレンジ
全ての果物を表示しました
```

ここで重要なポイントは、`fruits.length`を使って配列の要素数を取得していることです。また、配列のインデックスは0から始まるため、for文も`i = 0`から開始しています。

## 配列の要素を使って計算をしてみよう

次に、数値の配列を使って計算処理を行ってみましょう。

```javascript
const scores = [85, 92, 78, 96, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total += scores[i];
  console.log(`${i + 1}人目の点数: ${scores[i]}点（累計: ${total}点）`);
}

const average = total / scores.length;
console.log(`合計点数: ${total}点`);
console.log(`平均点: ${average}点`);
```

実行結果：

```
1人目の点数: 85点（累計: 85点）
2人目の点数: 92点（累計: 177点）
3人目の点数: 78点（累計: 255点）
4人目の点数: 96点（累計: 351点）
5人目の点数: 88点（累計: 439点）
合計点数: 439点
平均点: 87.8点
```

この例では、for文を使って配列の各要素を`total`に加算し、最後に平均値を計算しています。また、各回の処理で累計も表示することで、計算の過程がわかりやすくなっています。

## 条件に合う要素だけを処理しよう

for文の中でif文を組み合わせることで、特定の条件に合う要素だけを処理することもできます。

```javascript
const numbers = [12, 7, 23, 4, 18, 9, 15];

console.log('偶数のみを表示:');
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    console.log(`偶数: ${numbers[i]}`);
  }
}

console.log('10以上の数値のみを表示:');
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] >= 10) {
    console.log(`10以上: ${numbers[i]}`);
  }
}
```

実行結果：

```
偶数のみを表示:
偶数: 12
偶数: 4
偶数: 18
10以上の数値のみを表示:
10以上: 12
10以上: 23
10以上: 18
10以上: 15
```

このように、if文を組み合わせることで必要な要素だけを選択的に処理できます。

## 新しい配列を作成してみよう

元の配列から新しい配列を作成することもよくあります。

```javascript
const prices = [100, 200, 150, 300];
const taxedPrices = [];

for (let i = 0; i < prices.length; i++) {
  const taxedPrice = prices[i] * 1.1; // 消費税10%を追加
  taxedPrices.push(taxedPrice);
  console.log(`${prices[i]}円 → ${taxedPrice}円`);
}

console.log('元の価格:', prices);
console.log('税込価格:', taxedPrices);
```

実行結果：

```
100円 → 110円
200円 → 220円
150円 → 165円
300円 → 330円
元の価格: [100, 200, 150, 300]
税込価格: [110, 220, 165, 330]
```

ここでは`push()`メソッドを使って、新しい配列に計算結果を追加しています。また、元の配列は変更されず、新しい配列が作成されています。

## 最大値や最小値を見つけよう

配列の中から最大値や最小値を見つける処理も、for文でよく行われます。

```javascript
const temperatures = [22, 18, 25, 19, 23, 16, 27];
let maxTemp = temperatures[0];
let minTemp = temperatures[0];

for (let i = 1; i < temperatures.length; i++) {
  if (temperatures[i] > maxTemp) {
    maxTemp = temperatures[i];
    console.log(`新しい最高気温: ${maxTemp}度`);
  }

  if (temperatures[i] < minTemp) {
    minTemp = temperatures[i];
    console.log(`新しい最低気温: ${minTemp}度`);
  }
}

console.log(`週間最高気温: ${maxTemp}度`);
console.log(`週間最低気温: ${minTemp}度`);
```

実行結果：

```
新しい最高気温: 25度
新しい最低気温: 18度
新しい最低気温: 16度
新しい最高気温: 27度
週間最高気温: 27度
週間最低気温: 16度
```

この例では、配列の最初の要素を初期値として設定し、2番目の要素からfor文を開始しています。そして、より大きな値や小さな値が見つかるたびに更新しています。

## 文字列の配列を処理してみよう

数値だけでなく、文字列の配列も同様に処理できます。

```javascript
const words = ['hello', 'world', 'javascript', 'programming'];

console.log('各単語の文字数:');
for (let i = 0; i < words.length; i++) {
  const length = words[i].length;
  console.log(`"${words[i]}" → ${length}文字`);
}

console.log('大文字に変換:');
for (let i = 0; i < words.length; i++) {
  const upperCase = words[i].toUpperCase();
  console.log(`"${words[i]}" → "${upperCase}"`);
}
```

実行結果：

```
各単語の文字数:
"hello" → 5文字
"world" → 5文字
"javascript" → 10文字
"programming" → 11文字
大文字に変換:
"hello" → "HELLO"
"world" → "WORLD"
"javascript" → "JAVASCRIPT"
"programming" → "PROGRAMMING"
```

文字列の`length`プロパティや`toUpperCase()`メソッドを配列の各要素に適用することで、様々な文字列処理が可能になります。

## 逆順で配列を処理してみよう

時には、配列を後ろから前に向かって処理したい場合もあります。

```javascript
const countdown = [5, 4, 3, 2, 1];

console.log('通常の順序:');
for (let i = 0; i < countdown.length; i++) {
  console.log(countdown[i]);
}

console.log('逆順:');
for (let i = countdown.length - 1; i >= 0; i--) {
  console.log(countdown[i]);
}

console.log('発射！');
```

実行結果：

```
通常の順序:
5
4
3
2
1
逆順:
1
2
3
4
5
発射！
```

逆順で処理する場合は、`i = countdown.length - 1`から開始し、`i >= 0`まで、`i--`で1ずつ減らしていきます。

## まとめ

この章では、配列とfor文を組み合わせた様々な処理方法を学びました。また、全要素の表示から計算処理、条件による絞り込み、新しい配列の作成まで、実用的なパターンを確認しました。

配列とfor文の組み合わせは、プログラミングにおいて最も基本的で重要なテクニックのひとつです。さらに、これらの基礎をしっかりと身につけることで、より複雑なデータ処理にも対応できるようになります。
