---
title: 真偽値を理解しよう
nextjs:
  metadata:
    title: 真偽値を理解しよう
    description: JavaScriptの真偽値（boolean）の基本概念を学び、trueとfalse、比較演算子、論理演算子の使い方を習得します。条件判定の基礎となる重要な概念です。
---

## 学習の目標

本章では、以下の内容を学習します。

- `true`と`false`の基本概念を理解する
- 比較演算子を使った条件の作り方を習得する
- 論理演算子（`&&`、`||`、`!`）の使い方を学ぶ
- 真偽値を使った基本的な判定処理を身につける

## はじめに

プログラミングでは、「条件が満たされているかどうか」を判定する場面が数多くあります。

例えば、「ユーザーがログインしているか」「商品の在庫があるか」「パスワードが正しいか」といった判定です。

JavaScriptでは、このような「はい/いいえ」や「正しい/間違い」を表すために、**真偽値**（boolean）という特別なデータ型が用意されています。

真偽値は`true`（真）と`false`（偽）の2つの値しかありませんが、プログラムの流れを制御する重要な役割を持っています。

この章では、真偽値の基本的な使い方から、条件を作る方法まで学んでいきましょう。

## trueとfalseの基本

### 真偽値を変数に保存する

真偽値は、`true`（真）と`false`（偽）の2つの値で表現されます。

VS Codeで新しいファイル`boolean.html`を作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>真偽値の練習</title>
</head>
<body>
    <h1>真偽値の練習</h1>
    
    <script>
        let isLoggedIn = true;
        let hasStock = false;
        
        console.log("ログイン状態: " + isLoggedIn);
        console.log("在庫あり: " + hasStock);
    </script>
</body>
</html>
```

実行結果:
```
ログイン状態: true
在庫あり: false
```

`true`と`false`は、クォーテーションで囲まずにそのまま書きます。

ファイルを保存してブラウザで開き、コンソールを確認してみてください。

真偽値は文字列ではなく、JavaScriptが理解できる特別な値として扱われます。

### 真偽値の意味を理解する

真偽値は、状況や条件を2つの状態で表現するために使われます。

```html
<script>
    let isPremiumUser = true;
    let isEmailVerified = false;
    let hasDiscount = true;
    
    console.log("プレミアム会員: " + isPremiumUser);
    console.log("メール認証済み: " + isEmailVerified);
    console.log("割引適用: " + hasDiscount);
</script>
```

実行結果:
```
プレミアム会員: true
メール認証済み: false
割引適用: true
```

変数名を「is〜」や「has〜」で始めることで、その変数が真偽値を表していることが分かりやすくなります。

このような命名規則は、コードを読む人にとって理解しやすくするための工夫です。

会員管理システムやショッピングサイトなど、様々な状態を管理する際によく使われるパターンです。

## 比較演算子の使い方

### 数値の比較

真偽値は、数値や文字列を比較した結果としても得られます。

```html
<script>
    let userAge = 20;
    let minimumAge = 18;
    
    let isAdult = userAge >= minimumAge;
    let isChild = userAge < minimumAge;
    
    console.log("年齢: " + userAge);
    console.log("成人している: " + isAdult);
    console.log("未成年である: " + isChild);
</script>
```

実行結果:
```
年齢: 20
成人している: true
未成年である: false
```

`>=`は「以上」、`<`は「未満」を表す比較演算子です。

比較の結果は自動的に`true`または`false`になり、変数に保存して後で使うことができます。

年齢制限のあるサービスや、レベル制限のあるゲームなど、数値による条件判定でよく使われます。

### 等しいかどうかの比較

値が等しいかどうかを比較するには、`===`（厳密等価）という演算子を使います。

```html
<script>
    let inputPassword = "secret123";
    let correctPassword = "secret123";
    
    let isPasswordCorrect = inputPassword === correctPassword;
    
    console.log("入力されたパスワード: " + inputPassword);
    console.log("正しいパスワード: " + correctPassword);
    console.log("パスワードが正しい: " + isPasswordCorrect);
</script>
```

実行結果:
```
入力されたパスワード: secret123
正しいパスワード: secret123
パスワードが正しい: true
```

`===`演算子は、左右の値が完全に同じかどうかを判定します。

文字列の比較では、大文字小文字や空白文字まで含めて完全に一致する必要があります。

ログイン機能や設定値の確認など、正確な値の一致を確認する場面で重要な役割を果たします。

### 様々な比較演算子

JavaScriptには、様々な比較演算子が用意されています。

```html
<script>
    let score1 = 85;
    let score2 = 92;
    
    console.log("score1 === score2: " + (score1 === score2));  // 等しい
    console.log("score1 !== score2: " + (score1 !== score2));  // 等しくない
    console.log("score1 < score2: " + (score1 < score2));      // 小さい
    console.log("score1 > score2: " + (score1 > score2));      // 大きい
    console.log("score1 <= score2: " + (score1 <= score2));    // 以下
    console.log("score1 >= score2: " + (score1 >= score2));    // 以上
</script>
```

実行結果:
```
score1 === score2: false
score1 !== score2: true
score1 < score2: true
score1 > score2: false
score1 <= score2: true
score1 >= score2: false
```

比較演算子を使うことで、2つの値の関係を様々な角度から調べることができます。

これらの比較結果は、のちに学習する条件分岐（if文）で、プログラムの動作を制御するために使われます。

## 論理演算子（&&、||、!）

### AND演算子（&&）

複数の条件を組み合わせたい場合は、論理演算子を使います。

`&&`（AND演算子）は、両方の条件が`true`の時だけ`true`になります。

```html
<script>
    let userAge = 25;
    let hasLicense = true;
    
    let canDrive = userAge >= 18 && hasLicense;
    
    console.log("年齢: " + userAge);
    console.log("免許あり: " + hasLicense);
    console.log("運転可能: " + canDrive);
</script>
```

実行結果:
```
年齢: 25
免許あり: true
運転可能: true
```

この例では、「18歳以上」かつ「免許を持っている」場合のみ運転可能と判定されます。

両方の条件が満たされている必要がある場面でよく使われます。

### OR演算子（||）

どちらか一方の条件が満たされていれば良い場合は、`||`（OR演算子）を使います。

```html
<script>
    let isPremium = false;
    let isVip = true;
    
    let hasSpecialAccess = isPremium || isVip;
    
    console.log("プレミアム会員: " + isPremium);
    console.log("VIP会員: " + isVip);
    console.log("特別アクセス権: " + hasSpecialAccess);
</script>
```

実行結果:
```
プレミアム会員: false
VIP会員: true
特別アクセス権: true
```

この例では、プレミアム会員またはVIP会員のどちらかであれば、特別なアクセス権が与えられます。

複数の条件のうち、どれか1つでも満たされていれば良い場面で使われます。

### NOT演算子（!）

条件を反転させたい場合は、`!`（NOT演算子）を使います。

```html
<script>
    let isLoggedIn = false;
    let needsLogin = !isLoggedIn;
    
    let hasStock = true;
    let isOutOfStock = !hasStock;
    
    console.log("ログイン状態: " + isLoggedIn);
    console.log("ログインが必要: " + needsLogin);
    console.log("在庫あり: " + hasStock);
    console.log("在庫切れ: " + isOutOfStock);
</script>
```

実行結果:
```
ログイン状態: false
ログインが必要: true
在庫あり: true
在庫切れ: false
```

`!`を付けることで、`true`は`false`に、`false`は`true`に変換されます。

「〜でない場合」という逆の条件を表現したい時に便利です。

### 複数の論理演算子を組み合わせる

論理演算子は複数組み合わせて使うこともできます。

```html
<script>
    let age = 22;
    let hasTicket = true;
    let isMember = false;
    
    // 18歳以上で、チケットを持っているか会員である
    let canEnter = age >= 18 && (hasTicket || isMember);
    
    console.log("年齢: " + age);
    console.log("チケット所持: " + hasTicket);
    console.log("会員: " + isMember);
    console.log("入場可能: " + canEnter);
</script>
```

実行結果:
```
年齢: 22
チケット所持: true
会員: false
入場可能: true
```

かっこを使うことで、複雑な条件を組み合わせることができます。

イベントの入場条件や、サービスの利用条件など、現実的な判定ロジックを表現する際に使われます。

## まとめ

本章では、JavaScriptでの真偽値について学びました。以下の内容を理解できたことと思います。

- `true`と`false`を使って、状態や条件を2つの値で表現できる
- 比較演算子（`===`、`!==`、`<`、`>`など）を使って値を比較し、真偽値を得ることができる
- AND演算子（`&&`）、OR演算子（`||`）、NOT演算子（`!`）を使って複雑な条件を作ることができる
- 真偽値は変数に保存して、後で条件判定に使うことができる

真偽値は、プログラムの流れを制御する条件分岐の基礎となる重要な概念です。

ユーザー認証、権限管理、在庫確認など、Webアプリケーションの様々な場面で今回学んだ知識を活用できるでしょう。

次回は、「何もない」状態を表現するnullとundefinedについて学んでいきます。