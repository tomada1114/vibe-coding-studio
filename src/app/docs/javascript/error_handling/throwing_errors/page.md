---
title: 意図的にエラーを発生させてみよう
nextjs:
  metadata:
    title: 意図的にエラーを発生させてみよう
    description: JavaScriptのthrow文を使って意図的にエラーを発生させる方法を学び、カスタムエラーの作成と適切なエラーハンドリングの技術をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- throw文の使い方を理解する
- カスタムエラーの作成方法を学ぶ
- エラーメッセージの設定方法を習得する
- 適切なエラーハンドリングの考え方を理解する

## はじめに

これまでの章では、予期せずに発生するエラーを処理する方法を学んできました。しかし、プログラミングでは、自分でエラーを発生させたい場面もよくあります。

たとえば、関数に渡された値が期待している範囲外だった場合や、必要な条件が満たされていない場合など、「この状況では処理を続けることができない」という時に、意図的にエラーを発生させて呼び出し元にそのことを知らせることができます。

これを可能にするのが**throw文**です。throw文を使うことで、自分でエラーを作成して発生させることができます。また、エラーメッセージも自由に設定できるので、より分かりやすいエラー処理を行うことが可能になります。

自分でエラーを発生させることで、プログラムの安全性を高め、問題をより早く発見することができるようになります。

## throw文の基本的な使い方

throw文は、意図的にエラーを発生させるためのJavaScriptの機能です。基本的な使い方を見てみましょう。

VS Codeで新しいHTMLファイル`throw-error-test.html`を作成してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>throw文のテスト</title>
</head>
<body>
    <h1>throw文のテスト</h1>
    
    <script>
        console.log("=== throw文の基本的な使い方 ===");
        
        try {
            console.log("処理を開始します");
            console.log("何らかの問題が発生しました");
            
            // 意図的にエラーを発生させる
            throw new Error("これは意図的に発生させたエラーです");
            
            console.log("この行は実行されません");
        } catch (error) {
            console.log("エラーをキャッチしました: " + error.message);
        }
        
        console.log("プログラムは継続します");
    </script>
</body>
</html>
```

このHTMLファイルを保存してブラウザで開き、開発者ツールのConsoleを確認してください。throw文でエラーを発生させても、try-catch文で適切に処理されていることが確認できます。

throw文の基本的な構文は以下のようになります。

```javascript
throw new Error("エラーメッセージ");
```

`throw`の後に`new Error()`を書いて、括弧の中にエラーメッセージを入れます。このエラーメッセージは、catch文で`error.message`として取得することができます。

## なぜエラーを意図的に発生させるのか

プログラムで意図的にエラーを発生させる理由を、具体例で理解してみましょう。

```html
<script>
    console.log("=== エラーを発生させる理由 ===");
    
    // 年齢を受け取って成人かどうかを判定する関数
    function checkAdult(age) {
        // 入力値のチェック
        if (typeof age !== 'number') {
            throw new Error("年齢は数値で入力してください");
        }
        
        if (age < 0) {
            throw new Error("年齢は0以上の数値を入力してください");
        }
        
        if (age > 150) {
            throw new Error("年齢は150以下の数値を入力してください");
        }
        
        // 正常な処理
        if (age >= 18) {
            return "成人です";
        } else {
            return "未成年です";
        }
    }
    
    // 正常なケースのテスト
    try {
        console.log("20歳の場合: " + checkAdult(20));
        console.log("15歳の場合: " + checkAdult(15));
    } catch (error) {
        console.log("エラー: " + error.message);
    }
    
    // 異常なケースのテスト
    const testCases = ["文字列", -5, 200];
    
    testCases.forEach(testCase => {
        try {
            console.log(testCase + "の場合: " + checkAdult(testCase));
        } catch (error) {
            console.log(testCase + "でエラー: " + error.message);
        }
    });
</script>
```

この例では、関数に不適切な値が渡された時に、意図的にエラーを発生させています。これにより、以下のメリットがあります。

まず、問題のある入力値に対して明確なエラーメッセージを提供できます。ユーザーは何が間違っていたのかを具体的に知ることができます。

また、不正な値での処理を防ぐことで、予期しない結果や後続の処理でのエラーを防ぐことができます。

さらに、関数の呼び出し元で適切なエラー処理を行うことを促すことができます。

## 様々な条件でエラーを発生させてみよう

色々な条件でエラーを発生させる例を見てみましょう。

```html
<script>
    console.log("=== 様々な条件でのエラー発生 ===");
    
    // 配列の要素を取得する関数
    function getArrayElement(array, index) {
        // 配列かどうかのチェック
        if (!Array.isArray(array)) {
            throw new Error("最初の引数は配列である必要があります");
        }
        
        // インデックスが数値かどうかのチェック
        if (typeof index !== 'number') {
            throw new Error("インデックスは数値である必要があります");
        }
        
        // インデックスが整数かどうかのチェック
        if (!Number.isInteger(index)) {
            throw new Error("インデックスは整数である必要があります");
        }
        
        // インデックスが範囲内かどうかのチェック
        if (index < 0 || index >= array.length) {
            throw new Error("インデックスが配列の範囲外です（0-" + (array.length - 1) + "の範囲で入力してください）");
        }
        
        // 正常な処理
        return array[index];
    }
    
    const fruits = ["りんご", "バナナ", "オレンジ"];
    
    // 正常なケース
    try {
        console.log("正常なアクセス: " + getArrayElement(fruits, 1));
    } catch (error) {
        console.log("エラー: " + error.message);
    }
    
    // 様々な異常ケース
    const errorTests = [
        { array: "配列ではない", index: 0, description: "配列以外を渡す" },
        { array: fruits, index: "文字列", description: "インデックスに文字列" },
        { array: fruits, index: 1.5, description: "インデックスに小数" },
        { array: fruits, index: -1, description: "負のインデックス" },
        { array: fruits, index: 10, description: "範囲外のインデックス" }
    ];
    
    errorTests.forEach(test => {
        try {
            console.log(test.description + ": " + getArrayElement(test.array, test.index));
        } catch (error) {
            console.log(test.description + " → " + error.message);
        }
    });
</script>
```

この例では、入力値の様々な条件をチェックして、それぞれに応じた適切なエラーメッセージを表示しています。こまかくチェックすることで、ユーザーが問題を理解しやすくなります。

## カスタムエラーを作成してみよう

`new Error()`以外にも、独自のエラーを作成することができます。エラーの種類を区別したい場合に便利です。

```html
<script>
    console.log("=== カスタムエラーの作成 ===");
    
    // 計算機能の関数
    function calculate(operation, a, b) {
        // 入力値のチェック
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError("計算に使用する値は数値である必要があります");
        }
        
        // 演算の実行
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                if (b === 0) {
                    throw new Error("0で割ることはできません");
                }
                return a / b;
            default:
                throw new Error("サポートされていない演算です: " + operation);
        }
    }
    
    // 正常なケース
    try {
        console.log("足し算: " + calculate('add', 10, 5));
        console.log("割り算: " + calculate('divide', 10, 2));
    } catch (error) {
        console.log("エラー (" + error.name + "): " + error.message);
    }
    
    // エラーのケース
    const errorTests = [
        { op: 'add', a: "文字列", b: 5, description: "文字列を数値として使用" },
        { op: 'divide', a: 10, b: 0, description: "0で割る" },
        { op: 'unknown', a: 5, b: 3, description: "未知の演算" }
    ];
    
    errorTests.forEach(test => {
        try {
            console.log(test.description + ": " + calculate(test.op, test.a, test.b));
        } catch (error) {
            console.log(test.description + " → " + error.name + ": " + error.message);
        }
    });
</script>
```

この例では、`TypeError`と通常の`Error`を使い分けています。`TypeError`は型に関する問題の時に使い、通常の`Error`はその他の問題の時に使用しています。

## エラーを再発生させる

catchブロックでエラーをキャッチした後、そのエラーを再度発生させることもできます。これは、エラーを記録した後で、呼び出し元にもエラーを伝えたい場合に使われます。

```html
<script>
    console.log("=== エラーの再発生 ===");
    
    function processData(data) {
        try {
            if (!data) {
                throw new Error("データが提供されていません");
            }
            
            if (typeof data !== 'string') {
                throw new Error("データは文字列である必要があります");
            }
            
            console.log("データを処理中: " + data);
            return "処理完了: " + data.toUpperCase();
            
        } catch (error) {
            console.log("processData内でエラーを検出: " + error.message);
            console.log("エラーログを記録しました");
            
            // エラーを再発生させて呼び出し元に伝える
            throw error;
        }
    }
    
    function mainProcess() {
        const testData = [
            "正常なデータ",
            null,
            123
        ];
        
        testData.forEach(data => {
            try {
                const result = processData(data);
                console.log("メイン処理結果: " + result);
            } catch (error) {
                console.log("メイン処理でエラーを受信: " + error.message);
                console.log("適切な回復処理を実行します");
            }
            console.log("---");
        });
    }
    
    mainProcess();
</script>
```

この例では、`processData`関数でエラーをキャッチしてログを記録した後、`throw error`でエラーを再発生させています。これにより、呼び出し元の`mainProcess`関数でもエラーを受け取って適切な処理を行うことができます。

## まとめ

本章では、throw文を使って意図的にエラーを発生させる方法について学びました。以下の内容を理解できたことと思います。

- throw文を使うことで意図的にエラーを発生させることができる
- 不適切な入力値に対してエラーを発生させることで、プログラムの安全性を高められる
- エラーメッセージを自由に設定することで、問題の原因を明確に伝えられる
- TypeErrorなど、適切なエラーの種類を選択することでより詳細な情報を提供できる
- catchブロックでエラーを処理した後、必要に応じて再発生させることができる

意図的にエラーを発生させることは、堅牢で信頼性の高いプログラムを作るための重要な技術です。適切な場面でエラーを発生させることで、問題を早期に発見し、ユーザーに分かりやすい情報を提供することができるようになります。