---
title: switch文で複数の条件を扱ってみよう
nextjs:
  metadata:
    title: switch文で複数の条件を扱ってみよう
    description: JavaScriptのswitch文を使って、複数の値に応じた条件分岐を効率的に処理する方法を学びます。if文との使い分けも理解できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `switch`文の基本的な構文と動作原理を理解する
- `case`と`break`を使った条件分岐の書き方を習得する
- `default`の役割と使用方法を学ぶ
- `if`文との使い分け方法を身につける

## はじめに

前の章では`if`文を使った条件分岐を学びました。また、`else if`を使って複数の条件を処理する方法も確認しましたね。

ただし、ひとつの変数に対して多くの値をチェックする場合、`else if`を何度も書くと少し読みにくくなってしまいます。そこで今回は、このような場面で便利な**switch文**について学んでいきましょう。

## switch文の基本的な書き方

`switch`文は、ひとつの変数や式の値に応じて処理を分岐させるときに使います。また、複数の条件を見やすく整理できるという特徴があります。

基本的な構文は以下のとおりです。

```javascript
switch (変数や式) {
  case 値1:
    // 値1の場合の処理
    break;
  case 値2:
    // 値2の場合の処理
    break;
  default:
    // どの値にも該当しない場合の処理
}
```

実際にコードを書いて試してみましょう。まずはHTMLファイルを作成してください。

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>switch文を学ぼう</title>
</head>
<body>
  <h1>switch文を学ぼう</h1>
  <script src="script.js"></script>
</body>
</html>
```

`script.js`

```javascript
const grade = 'A';

switch (grade) {
  case 'A':
    console.log('優秀です');
    break;
  case 'B':
    console.log('良好です');
    break;
  case 'C':
    console.log('普通です');
    break;
  default:
    console.log('評価不明です');
}

console.log('成績判定終了');
```

HTMLファイルをブラウザで開いて、開発者ツールのコンソールを確認してみてください。以下のような結果が表示されるはずです。

```
優秀です
成績判定終了
```

`grade`が`'A'`なので、最初の`case 'A':`に該当し、「優秀です」が表示されます。また、`break`によってswitch文から抜け出すため、その後の処理は実行されません。

## 他の値でも試してみよう

`grade`の値を変更して、他のパターンも確認してみましょう。

```javascript
const grade = 'C';

switch (grade) {
  case 'A':
    console.log('優秀です');
    break;
  case 'B':
    console.log('良好です');
    break;
  case 'C':
    console.log('普通です');
    break;
  default:
    console.log('評価不明です');
}

console.log('成績判定終了');
```

実行結果：

```
普通です
成績判定終了
```

今度は、どの`case`にも該当しない値を試してみましょう。

```javascript
const grade = 'Z';

switch (grade) {
  case 'A':
    console.log('優秀です');
    break;
  case 'B':
    console.log('良好です');
    break;
  case 'C':
    console.log('普通です');
    break;
  default:
    console.log('評価不明です');
}

console.log('成績判定終了');
```

実行結果：

```
評価不明です
成績判定終了
```

`'Z'`はどの`case`にも該当しないため、`default`の処理が実行されます。また、`default`は`case`の条件に合わない場合の「最後の砦」のような役割を果たします。

## breakの重要性

ここで、`break`がなかったらどうなるかを確認してみましょう。

```javascript
const grade = 'A';

switch (grade) {
  case 'A':
    console.log('優秀です');
    // breakを削除
  case 'B':
    console.log('良好です');
    break;
  case 'C':
    console.log('普通です');
    break;
  default:
    console.log('評価不明です');
}

console.log('成績判定終了');
```

実行結果：

```
優秀です
良好です
成績判定終了
```

`break`がないと、該当する`case`から下のすべての処理が実行されてしまいます。これを**フォールスルー**と呼びます。通常は意図しない動作になるため、各`case`の最後には必ず`break`を書くようにしましょう。

## 数値を使ったswitch文

文字列だけでなく、数値に対してもswitch文を使えます。

```javascript
const month = 7;

switch (month) {
  case 1:
  case 2:
  case 12:
    console.log('冬です');
    break;
  case 3:
  case 4:
  case 5:
    console.log('春です');
    break;
  case 6:
  case 7:
  case 8:
    console.log('夏です');
    break;
  case 9:
  case 10:
  case 11:
    console.log('秋です');
    break;
  default:
    console.log('無効な月です');
}

console.log('季節判定終了');
```

実行結果：

```
夏です
季節判定終了
```

この例では、複数の`case`をまとめて同じ処理を実行しています。また、`case 6:`、`case 7:`、`case 8:`のいずれかに該当した場合、同じ「夏です」というメッセージが表示されます。

## switch文とif文の使い分け

同じ処理を`if`文で書くとどうなるか比較してみましょう。

```javascript
const dayOfWeek = '月曜日';

// switch文版
switch (dayOfWeek) {
  case '月曜日':
    console.log('週の始まりです');
    break;
  case '火曜日':
    console.log('まだまだ平日です');
    break;
  case '水曜日':
    console.log('週の真ん中です');
    break;
  case '木曜日':
    console.log('もうすぐ週末です');
    break;
  case '金曜日':
    console.log('明日は休みです');
    break;
  case '土曜日':
  case '日曜日':
    console.log('休日です');
    break;
  default:
    console.log('無効な曜日です');
}
```

実行結果：

```
週の始まりです
```

同じ処理を`if`文で書くと以下のようになります。

```javascript
const dayOfWeek = '月曜日';

// if文版
if (dayOfWeek === '月曜日') {
  console.log('週の始まりです');
} else if (dayOfWeek === '火曜日') {
  console.log('まだまだ平日です');
} else if (dayOfWeek === '水曜日') {
  console.log('週の真ん中です');
} else if (dayOfWeek === '木曜日') {
  console.log('もうすぐ週末です');
} else if (dayOfWeek === '金曜日') {
  console.log('明日は休みです');
} else if (dayOfWeek === '土曜日' || dayOfWeek === '日曜日') {
  console.log('休日です');
} else {
  console.log('無効な曜日です');
}
```

どちらも同じ結果になりますが、switch文の方がすっきりと読みやすくなっています。また、同じ変数に対して複数の値をチェックする場合は、switch文を使った方が効率的です。

## まとめ

この章では、switch文を使った条件分岐について学びました。また、if文との使い分けも理解できたと思います。

switch文は、ひとつの変数に対して多くの値をチェックする場合に特に有効です。さらに、コードが見やすくなり、保守しやすくなるという利点もあります。次の章では、繰り返し処理について学んでいきましょう。
