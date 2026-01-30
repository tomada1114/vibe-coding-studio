---
title: async/awaitとエラーハンドリング
nextjs:
  metadata:
    title: async/awaitとエラーハンドリング
    description: TypeScriptでasync/await構文を使った非同期処理の書き方と、try-catchを使った型安全なエラーハンドリングの方法を学び、カスタムエラー型の定義も習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- async関数の戻り値の型を理解する
- awaitでの型推論の仕組みを学ぶ
- try-catchでの型安全なエラー処理方法を習得する
- カスタムエラー型の定義方法を理解する

## はじめに

前回はPromise型とコールバック関数について学びました。今回は、より読みやすく書きやすい非同期処理の書き方である**async/await構文**について学んでいきましょう。

`async/await`は、Promiseを使った非同期処理をより簡潔に書くための機能です。また、非同期処理では予期しないエラーが発生することがあるため、適切なエラーハンドリングも重要になります。

TypeScriptでは、これらの非同期処理やエラー処理にも型を指定することで、より安全で理解しやすいコードを書くことができます。

それでは、実際にコードを書きながらasync/awaitとエラーハンドリングについて学んでいきましょう。

## async関数の戻り値の型

### 基本的なasync関数

まずは、async関数の基本的な書き方と型指定を見てみましょう。VS Codeで新しく`async-await.ts`というファイルを作成し、以下のコードを入力してください。

```typescript
// async関数の基本的な書き方
async function fetchNumber(): Promise<number> {
    console.log("数値を取得中...");
    
    // 1秒待ってから数値を返す
    return new Promise((resolve) => {
        setTimeout(() => {
            const number = 42;
            console.log("数値を取得しました:", number);
            resolve(number);
        }, 1000);
    });
}

// async関数を実行
async function main(): Promise<void> {
    console.log("処理を開始します");
    const result = await fetchNumber();
    console.log("結果:", result);
    console.log("処理が完了しました");
}

main();
```

`async`キーワードを付けた関数は、自動的に`Promise`を返します。`fetchNumber`関数は`Promise<number>`を返し、`main`関数は何も返さないので`Promise<void>`となります。

ファイルをコンパイルして実行すると、以下のような結果が表示されます。

```
処理を開始します
数値を取得中...
数値を取得しました: 42
結果: 42
処理が完了しました
```

### 複数の非同期処理を順番に実行

async/awaitを使うと、複数の非同期処理を順番に実行することが簡単に書けます。

```typescript
// 文字列を返すasync関数
async function fetchGreeting(name: string): Promise<string> {
    console.log(`${name}さんの挨拶を準備中...`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const greeting = `こんにちは、${name}さん！`;
            console.log("挨拶を準備しました:", greeting);
            resolve(greeting);
        }, 800);
    });
}

// 複数の非同期処理を順番に実行
async function greetMultipleUsers(): Promise<void> {
    console.log("挨拶処理を開始");
    
    const greeting1 = await fetchGreeting("田中");
    console.log("1番目:", greeting1);
    
    const greeting2 = await fetchGreeting("佐藤");
    console.log("2番目:", greeting2);
    
    console.log("すべての挨拶が完了しました");
}

greetMultipleUsers();
```

実行すると、以下のような結果が表示されます。

```
挨拶処理を開始
田中さんの挨拶を準備中...
挨拶を準備しました: こんにちは、田中さん！
1番目: こんにちは、田中さん！
佐藤さんの挨拶を準備中...
挨拶を準備しました: こんにちは、佐藤さん！
2番目: こんにちは、佐藤さん！
すべての挨拶が完了しました
```

## awaitでの型推論

### 型推論の動作確認

TypeScriptは、`await`を使用した際に、Promiseから取り出される値の型を自動的に推論してくれます。

```typescript
// 異なる型を返すasync関数たち
async function getAge(): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(25), 500);
    });
}

async function getName(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve("山田太郎"), 500);
    });
}

async function getIsActive(): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 500);
    });
}

// awaitで型推論を確認
async function displayUserInfo(): Promise<void> {
    // TypeScriptは自動的にnumber型と推論
    const age = await getAge();
    console.log("年齢:", age, "型:", typeof age);

    // TypeScriptは自動的にstring型と推論
    const name = await getName();
    console.log("名前:", name, "型:", typeof name);

    // TypeScriptは自動的にboolean型と推論
    const isActive = await getIsActive();
    console.log("アクティブ:", isActive, "型:", typeof isActive);
}

displayUserInfo();
```

実行すると、以下のような結果が表示されます。

```
年齢: 25 型: number
名前: 山田太郎 型: string
アクティブ: true 型: boolean
```

TypeScriptの型推論により、`await`で取得した値は適切な型として扱われます。

## try-catchでの型安全なエラー処理

### 基本的なエラーハンドリング

非同期処理では、ネットワークエラーやデータの不整合など、様々な理由でエラーが発生する可能性があります。`try-catch`文を使って、これらのエラーを適切に処理しましょう。

```typescript
// エラーが発生する可能性があるasync関数
async function fetchDataWithError(shouldFail: boolean): Promise<string> {
    console.log("データを取得中...");
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("データの取得に失敗しました"));
            } else {
                resolve("データの取得に成功しました");
            }
        }, 1000);
    });
}

// エラーハンドリングを含むasync関数
async function safeDataFetch(): Promise<void> {
    try {
        console.log("--- 成功パターン ---");
        const successData = await fetchDataWithError(false);
        console.log("成功:", successData);

        console.log("--- エラーパターン ---");
        const errorData = await fetchDataWithError(true);
        console.log("この行は実行されません");
        
    } catch (error) {
        console.log("エラーをキャッチしました:", error instanceof Error ? error.message : error);
    }
    
    console.log("処理を続行します");
}

safeDataFetch();
```

実行すると、以下のような結果が表示されます。

```
--- 成功パターン ---
データを取得中...
成功: データの取得に成功しました
--- エラーパターン ---
データを取得中...
エラーをキャッチしました: データの取得に失敗しました
処理を続行します
```

### 複数の処理でのエラーハンドリング

複数の非同期処理がある場合のエラーハンドリングも見てみましょう。

```typescript
// ユーザー情報を取得する関数（エラーの可能性あり）
async function fetchUser(userId: number): Promise<object> {
    console.log(`ユーザー ${userId} の情報を取得中...`);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 999) {
                reject(new Error("ユーザーが見つかりません"));
            } else {
                resolve({
                    id: userId,
                    name: `ユーザー${userId}`,
                    email: `user${userId}@example.com`
                });
            }
        }, 600);
    });
}

// 複数のユーザー情報を安全に取得
async function fetchMultipleUsers(): Promise<void> {
    const userIds = [1, 2, 999, 3]; // 999は存在しないユーザー

    for (const userId of userIds) {
        try {
            const user = await fetchUser(userId);
            console.log("取得成功:", user);
        } catch (error) {
            console.log(`ユーザー ${userId} の取得でエラー:`, error instanceof Error ? error.message : error);
            // エラーが発生しても次のユーザーの処理を続ける
        }
    }
    
    console.log("全ユーザーの処理が完了しました");
}

fetchMultipleUsers();
```

実行すると、以下のような結果が表示されます。

```
ユーザー 1 の情報を取得中...
取得成功: {id: 1, name: "ユーザー1", email: "user1@example.com"}
ユーザー 2 の情報を取得中...
取得成功: {id: 2, name: "ユーザー2", email: "user2@example.com"}
ユーザー 999 の情報を取得中...
ユーザー 999 の取得でエラー: ユーザーが見つかりません
ユーザー 3 の情報を取得中...
取得成功: {id: 3, name: "ユーザー3", email: "user3@example.com"}
全ユーザーの処理が完了しました
```

## カスタムエラー型の定義

### 独自のエラークラス

より詳細なエラー情報を扱うために、独自のエラークラスを定義することができます。

```typescript
// カスタムエラークラスの定義
class ValidationError extends Error {
    constructor(message: string, public field: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NetworkError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = 'NetworkError';
    }
}

// 検証機能付きの非同期関数
async function validateAndFetchData(input: string): Promise<string> {
    console.log("データを検証中...", input);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (input === "") {
                reject(new ValidationError("入力が空です", "input"));
            } else if (input === "error") {
                reject(new NetworkError("サーバーエラー", 500));
            } else {
                resolve(`処理済み: ${input}`);
            }
        }, 500);
    });
}

// カスタムエラーの処理
async function processData(): Promise<void> {
    const testInputs = ["正常なデータ", "", "error"];

    for (const input of testInputs) {
        try {
            const result = await validateAndFetchData(input);
            console.log("成功:", result);
        } catch (error) {
            if (error instanceof ValidationError) {
                console.log(`検証エラー (${error.field}):`, error.message);
            } else if (error instanceof NetworkError) {
                console.log(`ネットワークエラー (${error.statusCode}):`, error.message);
            } else {
                console.log("不明なエラー:", error instanceof Error ? error.message : error);
            }
        }
    }
}

processData();
```

実行すると、以下のような結果が表示されます。

```
データを検証中... 正常なデータ
成功: 処理済み: 正常なデータ
データを検証中... 
検証エラー (input): 入力が空です
データを検証中... error
ネットワークエラー (500): サーバーエラー
```

### エラー情報の型定義

エラー情報をオブジェクトとして返す方法も見てみましょう。

```typescript
// エラー情報の型定義
type ApiResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
    errorCode: number;
};

// エラー情報を含む結果を返す関数
async function fetchApiData(endpoint: string): Promise<ApiResult<string>> {
    console.log(`API呼び出し: ${endpoint}`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            if (endpoint === "/users") {
                resolve({
                    success: true,
                    data: "ユーザーデータ"
                });
            } else {
                resolve({
                    success: false,
                    error: "エンドポイントが見つかりません",
                    errorCode: 404
                });
            }
        }, 700);
    });
}

// エラー情報を含む結果の処理
async function handleApiCall(): Promise<void> {
    const endpoints = ["/users", "/invalid"];

    for (const endpoint of endpoints) {
        const result = await fetchApiData(endpoint);
        
        if (result.success) {
            console.log("API成功:", result.data);
        } else {
            console.log(`APIエラー (${result.errorCode}):`, result.error);
        }
    }
}

handleApiCall();
```

実行すると、以下のような結果が表示されます。

```
API呼び出し: /users
API成功: ユーザーデータ
API呼び出し: /invalid
APIエラー (404): エンドポイントが見つかりません
```

## まとめ

本章では、TypeScriptでのasync/awaitとエラーハンドリングについて学習しました。以下の内容をマスターできたことと思います。

`async`関数は自動的に`Promise`を返し、戻り値の型は`Promise<戻り値の型>`となります。`await`を使用することで、Promiseから値を取り出す際にTypeScriptが自動的に適切な型を推論してくれます。

`try-catch`文を使用することで、非同期処理で発生するエラーを安全に処理できます。また、カスタムエラークラスを定義することで、より詳細なエラー情報を扱うことができます。

これらの知識は、実際のWebアプリケーション開発において、サーバーとの通信やファイル操作など、様々な場面で活用されます。適切なエラーハンドリングにより、ユーザーにとって使いやすく信頼性の高いアプリケーションを作ることができるようになります。