---
title: TypeScriptをインストールして設定しよう
nextjs:
  metadata:
    title: TypeScriptをインストールして設定しよう
    description: TypeScriptのインストール方法とtsconfig.jsonの基本設定を初心者向けに解説。最初のTypeScriptファイルの作成と実行方法も学習します。
---

## 学習の目標

本章では、以下の内容を学習します。

- TypeScriptのグローバルインストール方法を理解する
- プロジェクトでのTypeScript設定の基本を学ぶ
- tsconfig.jsonファイルの作成と基本設定を習得する
- 最初のTypeScriptファイルを作成して実行する方法を理解する

## TypeScriptのグローバルインストール

前章でNode.jsのインストールが完了したので、いよいよTypeScript本体をインストールしていきましょう。

TypeScriptをインストールする方法は大きく分けて2つあります。

**グローバルインストール**  
コンピュータ全体で使用できるようにインストールする方法です。
一度インストールすれば、どのフォルダからでも`tsc`コマンドが使用できるようになります。

**ローカルインストール**  
特定のプロジェクトでのみ使用できるようにインストールする方法です。
プロジェクトごとに異なるTypeScriptバージョンを使い分けたい場合に適しています。

最初の学習では、どこからでもTypeScriptを使えるよう、グローバルインストールから始めましょう。

### インストールコマンドの実行

ターミナル（またはコマンドプロンプト）を開いて、以下のコマンドを実行してください。

```bash
npm install -g typescript
```

`-g`オプションは「グローバル」を意味し、コンピュータ全体でTypeScriptが使用できるようになります。

インストールには少し時間がかかる場合があります。

途中で権限に関するエラーが発生した場合は、以下の対処を試してみてください。

**Windowsの場合**  
コマンドプロンプトを「管理者として実行」で開いてから、再度コマンドを実行します。
スタートメニューの検索で「cmd」と入力し、表示されたコマンドプロンプトを右クリックして「管理者として実行」を選択してください。

**Macの場合**  
以下のコマンドを実行してください。

```bash
sudo npm install -g typescript
```

`sudo`はシステム管理者権限でコマンドを実行するための命令です。

パスワードの入力を求められた場合は、Macのログインパスワードを入力してください。

### インストール確認

TypeScriptのインストールが完了したら、正しくインストールされたかを確認しましょう。

```bash
tsc --version
```

`tsc`は「TypeScript Compiler」の略で、TypeScriptをJavaScriptに変換するためのコマンドです。

正常にインストールされていれば、以下のようにバージョン番号が表示されます。

```
Version 5.2.2
```

バージョン番号が表示されれば、TypeScriptのインストールは成功です。

### TypeScriptコンパイラの基本的な使い方

`tsc`コマンドの基本的な使い方を確認しておきましょう。

```bash
tsc --help
```

このコマンドを実行すると、TypeScriptコンパイラで使用できるオプションの一覧が表示されます。

現時点では詳細を覚える必要はありませんが、TypeScriptには多くの便利な機能があることが分かります。

## プロジェクトでのTypeScript設定

グローバルインストールが完了したので、次は実際にTypeScriptプロジェクトを作成してみましょう。

### プロジェクトフォルダの作成

まず、TypeScriptの学習用プロジェクトフォルダを作成します。

デスクトップやドキュメントフォルダなど、分かりやすい場所にフォルダを作成しましょう。

ターミナルで以下のコマンドを実行して、プロジェクトフォルダを作成し、そこに移動します。

```bash
mkdir my-typescript-project
cd my-typescript-project
```

`mkdir`は「make directory」の略で、新しいフォルダを作成するコマンドです。

`cd`は「change directory」の略で、指定したフォルダに移動するコマンドです。

### package.jsonの初期化

TypeScriptプロジェクトでは、依存関係を管理するためにpackage.jsonファイルが必要です。

以下のコマンドを実行して、package.jsonを作成しましょう。

```bash
npm init -y
```

`npm init`は新しいNode.jsプロジェクトを初期化するコマンドです。

`-y`オプションを付けることで、すべての質問にデフォルトの回答で自動的に答えてくれます。

実行後、プロジェクトフォルダに`package.json`ファイルが作成されます。

このファイルの中身を確認してみましょう。

```json
{
  "name": "my-typescript-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

これがプロジェクトの基本情報を管理するファイルです。

### TypeScriptの開発依存関係の追加

プロジェクトでより安定したTypeScript開発を行うため、ローカルにもTypeScriptをインストールしておきましょう。

```bash
npm install --save-dev typescript
```

`--save-dev`オプションは、開発時にのみ必要なライブラリとしてインストールすることを意味します。

さらに、Node.jsの型定義ファイルもインストールしておきます。

```bash
npm install --save-dev @types/node
```

`@types/node`は、Node.jsのAPIに対する型定義を提供するパッケージです。

これにより、Node.jsの機能を使う際にも型チェックの恩恵を受けることができます。

## tsconfig.jsonファイルの作成

TypeScriptプロジェクトでは、**tsconfig.json**というファイルでコンパイル設定を管理します。

このファイルは、TypeScriptコンパイラにどのようにファイルを処理するかを指示するための設定ファイルです。

### 設定ファイルの自動生成

TypeScriptでは、設定ファイルを自動生成する便利な機能があります。

以下のコマンドを実行してください。

```bash
tsc --init
```

このコマンドを実行すると、プロジェクトフォルダに`tsconfig.json`ファイルが作成されます。

生成されたファイルを開いてみると、多くの設定項目がコメント付きで記述されています。

### 基本的な設定内容の理解

生成されたtsconfig.jsonファイルは非常に多くの設定が含まれていますが、初心者が理解すべき重要な設定を確認してみましょう。

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

それぞれの設定の意味を説明します。

#### target
生成されるJavaScriptのバージョンを指定します。`es2016`は、2016年に標準化されたJavaScriptの機能を使用することを意味します。

#### module
モジュールシステムの種類を指定します。Node.js環境では`commonjs`を使用するのが一般的です。

#### outDir
コンパイル後のJavaScriptファイルを出力するフォルダを指定します。

#### rootDir
TypeScriptのソースファイルが格納されているフォルダを指定します。

#### strict
厳密な型チェックを有効にします。これをtrueにすることで、より安全なコードが書けるようになります。

### 学習用の設定カスタマイズ

学習をスムーズに進めるために、設定を少し調整してみましょう。

VS Codeで`tsconfig.json`ファイルを開いて、以下の内容に変更してください。

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

追加した設定の説明は以下の通りです。

#### include
コンパイル対象とするファイルのパターンを指定します。`src/**/*`は、srcフォルダ以下のすべてのファイルを対象とします。

#### exclude
コンパイル対象から除外するフォルダを指定します。

#### noImplicitReturns
関数の一部のパスで戻り値が返されていない場合にエラーを表示します。

#### noUnusedLocals
使用されていない変数がある場合にエラーを表示します。

これらの設定により、より厳密で品質の高いTypeScriptコードを書くことができます。

## 最初のTypeScriptファイルを実行してみよう

設定が完了したので、実際にTypeScriptファイルを作成して実行してみましょう。

### srcフォルダの作成

まず、TypeScriptファイルを格納するための`src`フォルダを作成します。

```bash
mkdir src
```

### 最初のTypeScriptファイルを作成

VS Codeで`src`フォルダ内に`index.ts`ファイルを作成し、以下のコードを記述してください。

```typescript
// 最初のTypeScriptプログラム
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 型注釈付きの変数
const userName: string = "TypeScript";
const age: number = 12;

// 関数を呼び出して結果を表示
const message: string = greet(userName);
console.log(message);
console.log(`TypeScriptは${age}年前に登場しました。`);
```

このコードでは、TypeScriptの基本的な機能を使用しています。

- `name: string`で引数の型を指定
- `: string`で戻り値の型を指定
- `const userName: string`で変数の型を指定

### TypeScriptファイルのコンパイル

作成したTypeScriptファイルをJavaScriptに変換してみましょう。

プロジェクトのルートフォルダ（tsconfig.jsonがある場所）で以下のコマンドを実行してください。

```bash
tsc
```

このコマンドを実行すると、`src/index.ts`ファイルが`dist/index.js`ファイルに変換されます。

コンパイルが成功すると、特にメッセージは表示されませんが、`dist`フォルダが作成され、その中に`index.js`ファイルが生成されます。

生成されたJavaScriptファイルの内容を確認してみましょう。

```javascript
"use strict";
// 最初のTypeScriptプログラム
function greet(name) {
    return `Hello, ${name}!`;
}
// 型注釈付きの変数
const userName = "TypeScript";
const age = 12;
// 関数を呼び出して結果を表示
const message = greet(userName);
console.log(message);
console.log(`TypeScriptは${age}年前に登場しました。`);
```

TypeScriptの型注釈部分が取り除かれ、純粋なJavaScriptコードに変換されていることが分かります。

### JavaScriptファイルの実行

コンパイルされたJavaScriptファイルを実行してみましょう。

```bash
node dist/index.js
```

実行すると、以下のような出力が表示されます。

```
Hello, TypeScript!
TypeScriptは12年前に登場しました。
```

### 型エラーの確認

TypeScriptの型チェック機能を体験してみましょう。

`src/index.ts`ファイルを以下のように変更してみてください。

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 型エラーを発生させる例
const userName: string = "TypeScript";
const message: string = greet(123); // 数値を文字列型の引数に渡している

console.log(message);
```

この状態で再度コンパイルを実行してみましょう。

```bash
tsc
```

すると、以下のようなエラーメッセージが表示されます。

```
src/index.ts:7:31 - error TS2345: Argument of type 'number' is expected to be assignable to parameter of type 'string'.

7 const message: string = greet(123);
                                ~~~
```

このように、TypeScriptは実行前に型の不整合を検出してエラーを表示してくれます。

エラーが発生した場合、JavaScriptファイルは生成されません。

### 自動コンパイルの設定

ファイルを変更するたびに手動でコンパイルするのは手間です。

TypeScriptには、ファイルの変更を監視して自動的にコンパイルする機能があります。

```bash
tsc --watch
```

このコマンドを実行すると、TypeScriptファイルが変更されるたびに自動的にコンパイルが実行されます。

監視モードを停止したい場合は、ターミナルで`Ctrl + C`を押してください。

## まとめ

本章では、TypeScriptの開発環境構築について学習しました。

習得できた内容は以下の通りです。

- TypeScriptのグローバルインストール方法を理解しました
- package.jsonを使ったプロジェクト管理の基本を学びました
- tsconfig.jsonファイルの作成と基本設定を習得しました
- TypeScriptからJavaScriptへのコンパイル方法を理解しました
- 型エラーの検出機能を体験しました
- 自動コンパイル機能の使い方を学びました

これで、TypeScriptを使った開発を始める準備が整いました。

型安全性の恩恵を受けながらJavaScript開発ができる環境が完成したので、次章ではVS Codeを使ったより効率的な開発環境の構築を学んでいきましょう。