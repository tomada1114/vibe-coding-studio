---
title: フォームの入力値を取得してみよう
nextjs:
  metadata:
    title: フォームの入力値を取得してみよう
    description: JavaScriptでフォームの入力値を取得する方法を学びます。input要素からの値取得、changeイベントとinputイベントの違い、入力値の検証について習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- input要素から入力値を取得する方法を理解する
- changeイベントとinputイベントの違いを学ぶ
- フォーム送信の制御方法を習得する
- 簡単な入力値の検証を実装する

## はじめに

Webページでユーザーから情報を収集するには、フォームを使います。ユーザーがテキストボックスに入力した内容や、選択した項目をJavaScriptで取得することで、様々な処理を実行できるようになります。

今回は、フォームの入力値を取得して活用する方法を学んでいきましょう。

## HTMLファイルを準備しよう

VS Codeで`form_practice.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>フォーム入力の練習</title>
</head>
<body>
    <h1>フォーム入力の練習</h1>

    <form id="user-form">
        <div>
            <label for="username">お名前:</label>
            <input type="text" id="username" placeholder="名前を入力してください">
        </div>

        <div>
            <label for="email">メールアドレス:</label>
            <input type="email" id="email" placeholder="email@example.com">
        </div>

        <div>
            <label for="age">年齢:</label>
            <input type="number" id="age" min="0" max="120">
        </div>

        <button type="button" id="check-btn">入力内容を確認</button>
        <button type="submit">送信</button>
    </form>

    <div id="result"></div>

    <script>
        // ここにJavaScriptを書いていきます
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてください。名前、メールアドレス、年齢を入力するフォームが表示されます。

![スクリーンショット](/img/javascript/form-input-practice.png)

## input要素から値を取得しよう

フォームの入力値を取得するには、input要素の`value`プロパティを使います。

`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // 確認ボタンがクリックされた時の処理
    const checkButton = document.getElementById('check-btn');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', function() {
        // 各input要素の値を取得
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;

        // コンソールに値を表示
        console.log('名前:', username);
        console.log('メール:', email);
        console.log('年齢:', age);

        // 画面にも表示
        resultDiv.innerHTML = `
            <h3>入力内容</h3>
            <p>名前: ${username}</p>
            <p>メール: ${email}</p>
            <p>年齢: ${age}歳</p>
        `;
    });
</script>
```

ブラウザを更新して、フォームに何か入力してから「入力内容を確認」ボタンをクリックしてみてください。入力した内容がコンソールと画面に表示されるはずです。

![スクリーンショット](/img/javascript/form-input-result.png)

`value`プロパティを使うことで、その時点でのinput要素の値を文字列として取得できることがわかりましたね。

## リアルタイムで入力値を監視しよう

ボタンをクリックしなくても、入力と同時に値を取得することもできます。これには`input`イベントを使います。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- リアルタイムでの入力監視 ---
    const usernameInput = document.getElementById('username');

    usernameInput.addEventListener('input', function() {
        const currentValue = usernameInput.value;
        console.log('現在の入力:', currentValue);

        // 文字数をリアルタイムで表示
        if (currentValue.length > 10) {
            console.log('名前が長すぎます');
        }
    });
</script>
```

ブラウザを更新して、名前の入力欄に文字を入力してみてください。1文字入力するたびにコンソールに出力されることが確認できます。10文字を超えると警告メッセージも表示されます。

```
現在の入力: abcdefghijk
名前が長すぎます
```

これを応用し、例えば画面内に警告メッセージを表示したり、入力制限をかけたりすることもできます。

## フォーム送信を制御しよう

フォームの「送信」ボタンがクリックされた時の処理も制御できます。通常、フォームが送信されるとページが更新されてしまいますが、JavaScriptで制御することでページ更新を防げます。

以下のコードを追加してください。

```html
<script>
    // 前のコードはそのまま残して、以下を追加

    // --- フォーム送信の制御 ---
    const form = document.getElementById('user-form');

    form.addEventListener('submit', function(event) {
        // ページの更新を防ぐ
        event.preventDefault();

        // 入力値を取得
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;

        // 簡単な検証
        if (username === '' || email === '' || age === '') {
            alert('すべての項目を入力してください');
            return;
        }

        alert('送信完了！');
        console.log('フォームが送信されました');
    });
</script>
```

ブラウザを更新して、フォームに入力してから「送信」ボタンをクリックしてみてください。

![スクリーンショット](/img/javascript/form-submit-without-refresh.png)

空の項目がある場合は警告が表示され、すべて入力されている場合は「送信完了！」のメッセージが表示されます。重要なのは、ページが更新されないことです。

`event.preventDefault()`は、イベントの既定の動作（この場合はフォーム送信によるページ更新）を防ぐためのメソッドです。

本来、送信ボタン（formの`submit`イベント）がクリックされると、フォームの内容がサーバーに送信されてページが更新されてしまいます。

しかし、それだとJavaScriptでの処理ができなくなってしまうため、`event.preventDefault()`を使ってページ更新を防いでいます。

この手法は、フォームの入力値を検証したり、他にも間に何か処理を挟みたい場合に非常に便利ですので、覚えておきましょう。

## changeイベントとinputイベントの違い

入力値の変化を検知するイベントには、`input`と`change`の2種類があります。その違いを確認してみましょう。

長くなってきましたので、`script`タグの中は一度すべて削除し、以下のコードを追加してください。

```html
<script>
    // --- inputイベントとchangeイベントの比較 ---
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('input', function() {
        console.log('inputイベント: 入力中...');
    });

    emailInput.addEventListener('change', function() {
        console.log('changeイベント: 入力完了（フォーカスが外れた）');
    });
</script>
```

ブラウザを更新して、メールアドレスの入力欄で以下を試してみてください。

1. 文字を入力する → `input`イベントが発生
2. 入力欄から別の場所をクリックする → `change`イベントが発生

どちらも似たように見えますが、`input`イベントは入力中にリアルタイムで発生し、`change`イベントは入力が完了してフォーカスが外れた時に発生します。
この違いを理解しておくと、ユーザーの入力に応じた適切な処理を実装しやすくなります。

実際のWebサイトでは、たとえば`input`イベントを使ってリアルタイムで入力内容を検証したり、`change`イベントを使って最終的な入力内容を確認するなどの使い分けをすると良いでしょう。

## 入力値の型を意識しよう

数値を入力するフィールドの値も、JavaScriptでは文字列として取得されます。計算に使いたい場合は型変換が必要です。

`script` 内を以下のように更新してください。

```html
<script>
    // --- 数値の型変換 ---
    const ageInput = document.getElementById('age');

    ageInput.addEventListener('change', function() {
        const ageText = ageInput.value;      // 文字列
        const ageNumber = Number(ageText);   // 数値に変換

        console.log('文字列としての年齢:', ageText, typeof ageText);
        console.log('数値としての年齢:', ageNumber, typeof ageNumber);

        if (ageNumber >= 20) {
            console.log('成人です');
        } else {
            console.log('未成年です');
        }
    });
</script>
```

ブラウザを更新して年齢に数値を入力し、他の場所をクリックしてみてください。コンソールで文字列と数値の違いが確認できます。

```bash
文字列としての年齢: 25 string
数値としての年齢: 25 number
成人です
```

`Number()`関数を使うことで、文字列を数値に変換できます。変換できない文字列の場合は`NaN`（Not a Number）になります。

このように、入力された値の型を意識することは、JavaScriptでのプログラミングにおいて非常に重要です。特に数値計算や条件分岐を行う際には、適切な型変換を行うことで意図した通りの動作を実現できます。

## まとめ

本章では、フォームの入力値を取得する方法について学習しました。今回学んだ内容は以下の通りです。

- `value`プロパティで入力値を取得できる
- `input`イベントでリアルタイムな入力監視ができる
- `change`イベントで入力完了時の処理ができる
- `event.preventDefault()`でフォーム送信を制御できる
- `Number()`で文字列を数値に変換できる

これらの知識を使えば、ユーザーからの入力を受け取って様々な処理を実行できるようになります。次の章では、要素を動的に追加・削除する方法を学んでいきましょう。
