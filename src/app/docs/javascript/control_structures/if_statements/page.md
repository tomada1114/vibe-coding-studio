---
title: if文による条件分岐を学ぼう
nextjs:
  metadata:
    title: if文による条件分岐を学ぼう
    description: JavaScriptのif文を使って、条件に応じて処理を分岐させる方法を学びます。複数の条件を組み合わせた判定も実践的に学習できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `if`文の基本的な書き方と使い方を理解する
- `else`と`else if`を使った複数条件の分岐方法を習得する
- 論理演算子（`&&`、`||`）を使った条件の組み合わせ方法を学ぶ
- 実践的な条件分岐処理の書き方を身につける

## はじめに

プログラムを書いていると、「もし〜なら〜する」という条件によって処理を変えたい場面がよく出てきます。

例えば、「年齢が18歳以上なら成人向けコンテンツを表示する」「ユーザーがログインしていなかったらログイン画面を表示する」といった具合です。

JavaScriptでは、このような条件分岐を**if文**を使って実現できます。まずはシンプルな例から始めてみましょう。

## 基本的なif文

`if`文の基本的な書き方は以下のとおりです。

```javascript
if (条件) {
  // 条件が true の場合に実行される処理
}
```

実際にコードを書いて試してみましょう。まずはHTMLファイルを作成してください。

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>if文を学ぼう</title>
</head>
<body>
  <h1>if文を学ぼう</h1>
  <script src="script.js"></script>
</body>
</html>
```

`script.js`

```javascript
const age = 20;

if (age >= 18) {
  console.log('成人です');
}

console.log('プログラム終了');
```

HTMLファイルをブラウザで開いて、開発者ツールのコンソールを確認してみてください。以下のような結果が表示されるはずです。

```
成人です
プログラム終了
```

ここで`age`の値を変更してみましょう。

```javascript
const age = 16;

if (age >= 18) {
  console.log('成人です');
}

console.log('プログラム終了');
```

この場合、コンソールには以下のように表示されます。

```
プログラム終了
```

`age`が16なので`age >= 18`が`false`となり、if文の中の処理は実行されません。そのため「成人です」は表示されず、次の「プログラム終了」だけが表示されます。

## if-else文で条件に応じて異なる処理を実行する

「条件が満たされない場合は別の処理をしたい」という場面では、`else`を使います。

```javascript
const age = 16;

if (age >= 18) {
  console.log('成人です');
} else {
  console.log('未成年です');
}

console.log('プログラム終了');
```

実行結果は以下のようになります。

```
未成年です
プログラム終了
```

今度は年齢に応じて適切なメッセージが表示されました。`age >= 18`が`false`だったので、`else`の部分が実行されています。

年齢を20に変更して確認してみましょう。

```javascript
const age = 20;

if (age >= 18) {
  console.log('成人です');
} else {
  console.log('未成年です');
}

console.log('プログラム終了');
```

実行結果：

```
成人です
プログラム終了
```

今度は条件が`true`になったので、`if`の部分が実行され、`else`の部分はスキップされます。

## 複数の条件を組み合わせる - else if

3つ以上の分岐が必要な場合は、`else if`を使います。例えば、年齢に応じてより細かい分類をしてみましょう。

```javascript
const age = 15;

if (age >= 20) {
  console.log('成人（20歳以上）です');
} else if (age >= 18) {
  console.log('成人（18-19歳）です');
} else if (age >= 13) {
  console.log('中高生です');
} else {
  console.log('小学生以下です');
}

console.log('年齢判定終了');
```

実行結果：

```
中高生です
年齢判定終了
```

`age`が15なので、最初の`age >= 20`は`false`、次の`age >= 18`も`false`、3番目の`age >= 13`が`true`になるため、「中高生です」が表示されます。

条件は上から順番にチェックされ、最初に`true`になった条件の処理が実行されます。その後の条件はチェックされません。

年齢を変更していくつかパターンを試してみましょう。

```javascript
const age = 25;

if (age >= 20) {
  console.log('成人（20歳以上）です');
} else if (age >= 18) {
  console.log('成人（18-19歳）です');
} else if (age >= 13) {
  console.log('中高生です');
} else {
  console.log('小学生以下です');
}
```

実行結果：

```
成人（20歳以上）です
```

## 文字列を使った条件分岐

数値だけでなく、文字列に対しても条件分岐ができます。

```javascript
const weather = '晴れ';

if (weather === '晴れ') {
  console.log('洗濯物を外に干しましょう');
} else if (weather === '雨') {
  console.log('傘を持って出かけましょう');
} else if (weather === '曇り') {
  console.log('薄手の上着があると良いかもしれません');
} else {
  console.log('天気に注意して過ごしましょう');
}
```

実行結果：

```
洗濯物を外に干しましょう
```

文字列の比較では`===`（厳密等価演算子）を使っています。これにより、データ型と値の両方が一致する場合のみ`true`になります。

`weather`の値を変更して、他のパターンも確認してみましょう。

```javascript
const weather = '雪';

if (weather === '晴れ') {
  console.log('洗濯物を外に干しましょう');
} else if (weather === '雨') {
  console.log('傘を持って出かけましょう');
} else if (weather === '曇り') {
  console.log('薄手の上着があると良いかもしれません');
} else {
  console.log('天気に注意して過ごしましょう');
}
```

実行結果：

```
天気に注意して過ごしましょう
```

「雪」は上記の条件のどれにも該当しないため、最後の`else`の処理が実行されます。

## 複数の条件を組み合わせる - 論理演算子

ひとつの条件文の中で複数の条件をチェックしたい場合は、論理演算子を使います。

### AND演算子（&&）

「AかつB」という条件を作るには`&&`を使います。

```javascript
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense === true) {
  console.log('車を運転できます');
} else {
  console.log('車は運転できません');
}
```

実行結果：

```
車を運転できます
```

`age >= 18`と`hasLicense === true`の両方が`true`なので、条件全体が`true`になります。

条件を変更してみましょう。

```javascript
const age = 16;
const hasLicense = true;

if (age >= 18 && hasLicense === true) {
  console.log('車を運転できます');
} else {
  console.log('車は運転できません');
}
```

実行結果：

```
車は運転できません
```

今度は`age >= 18`が`false`なので、`hasLicense`が`true`であっても条件全体が`false`になります。

### OR演算子（||）

「AまたはB」という条件を作るには`||`を使います。

```javascript
const day = '土曜日';

if (day === '土曜日' || day === '日曜日') {
  console.log('休日です');
} else {
  console.log('平日です');
}
```

実行結果：

```
休日です
```

`day === '土曜日'`が`true`なので、条件全体が`true`になります。OR演算子では、どちらか一方でも`true`であれば条件が成立します。

## 条件分岐の実践例

学んだ内容を組み合わせて、もう少し実践的な例を作ってみましょう。

```javascript
const score = 85;
const attendance = 90; // 出席率（%）

if (score >= 80 && attendance >= 80) {
  console.log('優秀な成績です');
} else if (score >= 60 && attendance >= 70) {
  console.log('合格です');
} else if (score >= 60 || attendance >= 80) {
  console.log('条件付き合格です');
} else {
  console.log('不合格です');
}

console.log(`テスト結果: ${score}点, 出席率: ${attendance}%`);
```

実行結果：

```
優秀な成績です
テスト結果: 85点, 出席率: 90%
```

この例では、複数の条件を組み合わせて成績判定を行っています。最初の条件では「テストが80点以上**かつ**出席率が80%以上」をチェックし、2番目の条件では「テストが60点以上**かつ**出席率が70%以上」をチェックしています。

値を変更していくつかのパターンを試してみてください。

```javascript
const score = 65;
const attendance = 75;
```

この場合の実行結果：

```
合格です
テスト結果: 65点, 出席率: 75%
```

## まとめ

この章では、JavaScriptの条件分岐について学びました。`if`文を使うことで、プログラムに「判断する力」を与えることができます。

条件分岐は、ユーザーの入力に応じて異なる処理を行ったり、データの状態によって表示内容を変えたりする際に欠かせない機能です。次の章では、繰り返し処理について学んでいきます。
