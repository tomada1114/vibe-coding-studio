---
title: オブジェクトの基本的な作り方と使い方を学ぼう
nextjs:
  metadata:
    title: オブジェクトの基本的な作り方と使い方を学ぼう
    description: JavaScriptでオブジェクトを作成し、プロパティの取得・更新・追加方法、ドット記法とブラケット記法の使い分け、プロパティ一覧取得を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- オブジェクトリテラルによるオブジェクトの作成方法を理解する
- プロパティの取得・更新・追加方法を習得する
- ドット記法とブラケット記法の違いと使い分けを学ぶ
- オブジェクトのプロパティ一覧取得方法を身につける

## はじめに

前回の章では、配列を使って複数の値をまとめて管理する方法を学びました。

配列は「順番のある複数の値」を管理するのに適していますが、現実のデータはより複雑な構造を持つことがあります。

例えば、ユーザーの情報を管理する場合、名前、年齢、メールアドレス、住所など、異なる種類の情報が含まれます。

このような「関連する複数の情報をひとまとまりにして管理したい」場面で活躍するのが**オブジェクト**です。

オブジェクトは「キー（名前）と値のペア」で構成され、「この人の名前は田中、年齢は25歳」といった情報を直感的に表現できます。

この章では、JavaScriptにおけるオブジェクトの基本的な作成方法から操作方法まで、実用的な例を通して丁寧に学んでいきましょう。

## オブジェクトリテラルによる作成

### 基本的なオブジェクトの作り方

オブジェクトを作るには、波括弧`{}`の中に「キー: 値」の形式でデータを書きます。

VS Codeで新しいファイル`objects.html`を作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>オブジェクトの練習</title>
</head>
<body>
    <h1>オブジェクト操作の練習</h1>
    
    <script>
        let user = {
            name: "田中太郎",
            age: 25,
            email: "tanaka@example.com"
        };
        
        console.log("ユーザー情報:");
        console.log(user);
    </script>
</body>
</html>
```

このコードを実行すると、コンソールに以下のような結果が表示されます。

```
ユーザー情報:
{name: '田中太郎', age: 25, email: 'tanaka@example.com'}
```

この例では、`user`というオブジェクトを作成し、名前、年齢、メールアドレスの3つの情報を保存しています。

配列とは異なり、オブジェクトでは各値に意味のある名前（キー）を付けて管理できるため、データの意味が明確になります。

### オブジェクトのキーと値の関係

オブジェクトは「プロパティ」と呼ばれるキーと値のペアで構成されています。

先ほどのコードに以下を追加してみましょう。

```html
<script>
    let user = {
        name: "田中太郎",
        age: 25,
        email: "tanaka@example.com"
    };
    
    console.log("ユーザー情報:");
    console.log(user);
    
    let product = {
        name: "ノートパソコン",
        price: 89800,
        inStock: true,
        category: "電子機器"
    };
    
    console.log("商品情報:");
    console.log(product);
</script>
```

実行結果は以下のようになります。

```
ユーザー情報:
{name: '田中太郎', age: 25, email: 'tanaka@example.com'}
商品情報:
{name: 'ノートパソコン', price: 89800, inStock: true, category: '電子機器'}
```

各プロパティのキー（`name`、`price`など）は文字列として扱われ、値には文字列、数値、真偽値など様々な型のデータを設定できます。

ECサイトの商品データベースや在庫管理システムなど、実際のWebアプリケーションでよく見られるデータ構造です。

### 空のオブジェクトと複雑なデータ構造

オブジェクトは空の状態から始めることもでき、配列やオブジェクトを値として含むこともできます。

```html
<script>
    let emptyObject = {};  // 空のオブジェクト
    
    let student = {
        name: "佐藤花子",
        grade: 3,
        subjects: ["数学", "英語", "理科"],  // 配列を値として含む
        address: {  // オブジェクトを値として含む
            city: "東京",
            zip: "123-4567"
        }
    };
    
    console.log("空のオブジェクト:");
    console.log(emptyObject);
    console.log("学生情報:");
    console.log(student);
</script>
```

実行結果は以下のようになります。

```
空のオブジェクト:
{}
学生情報:
{name: '佐藤花子', grade: 3, subjects: Array(3), address: {…}}
```

この例では、学生の情報を管理するオブジェクトを作成し、履修科目を配列で、住所を別のオブジェクトで表現しています。

このように、オブジェクトの値として配列や他のオブジェクトを含めることで、複雑なデータ構造を自然に表現できます。

## プロパティの取得・更新・追加

### ドット記法でプロパティにアクセスする

オブジェクトのプロパティにアクセスする最も一般的な方法は、ドット記法（`.`）を使うことです。

```html
<script>
    let car = {
        brand: "トヨタ",
        model: "プリウス",
        year: 2022,
        color: "白"
    };
    
    console.log("メーカー: " + car.brand);
    console.log("車種: " + car.model);
    console.log("年式: " + car.year);
    console.log("色: " + car.color);
</script>
```

実行結果は以下のようになります。

```
メーカー: トヨタ
車種: プリウス
年式: 2022
色: 白
```

ドット記法では、オブジェクト名の後にピリオド（`.`）を付け、その後にプロパティ名を書きます。

この方法は読みやすく、直感的にプロパティの内容を理解できるため、最もよく使われる方法です。

### プロパティの値を変更する

既存のプロパティの値を変更するには、代入演算子（`=`）を使います。

```html
<script>
    let account = {
        username: "user123",
        email: "user@example.com",
        isActive: true
    };
    
    console.log("変更前のメールアドレス: " + account.email);
    console.log("変更前のアクティブ状態: " + account.isActive);
    
    // プロパティの値を変更
    account.email = "newemail@example.com";
    account.isActive = false;
    
    console.log("変更後のメールアドレス: " + account.email);
    console.log("変更後のアクティブ状態: " + account.isActive);
</script>
```

実行結果は以下のようになります。

```
変更前のメールアドレス: user@example.com
変更前のアクティブ状態: true
変更後のメールアドレス: newemail@example.com
変更後のアクティブ状態: false
```

この方法により、ユーザーが設定を変更したり、システムの状態が更新されたりした際に、オブジェクトのデータを最新の状態に保つことができます。

### 新しいプロパティを追加する

存在しないプロパティに値を代入することで、新しいプロパティを追加できます。

```html
<script>
    let book = {
        title: "JavaScriptの基礎",
        author: "山田太郎"
    };
    
    console.log("プロパティ追加前:");
    console.log(book);
    
    // 新しいプロパティを追加
    book.pages = 300;
    book.price = 2800;
    book.isAvailable = true;
    
    console.log("プロパティ追加後:");
    console.log(book);
</script>
```

実行結果は以下のようになります。

```
プロパティ追加前:
{title: 'JavaScriptの基礎', author: '山田太郎'}
プロパティ追加後:
{title: 'JavaScriptの基礎', author: '山田太郎', pages: 300, price: 2800, isAvailable: true}
```

この機能により、オブジェクトを作成した後からでも、必要に応じて新しい情報を追加していけます。

## ドット記法とブラケット記法

### ブラケット記法の基本的な使い方

プロパティにアクセスするもう一つの方法として、ブラケット記法（`[]`）があります。

```html
<script>
    let restaurant = {
        name: "美味しい食堂",
        cuisine: "和食",
        rating: 4.5,
        location: "渋谷"
    };
    
    // ドット記法とブラケット記法の比較
    console.log("ドット記法: " + restaurant.name);
    console.log("ブラケット記法: " + restaurant["name"]);
    
    console.log("ドット記法: " + restaurant.rating);
    console.log("ブラケット記法: " + restaurant["rating"]);
</script>
```

実行結果は以下のようになります。

```
ドット記法: 美味しい食堂
ブラケット記法: 美味しい食堂
ドット記法: 4.5
ブラケット記法: 4.5
```

ブラケット記法では、角括弧`[]`の中にプロパティ名を文字列として書きます。

両方の方法は同じ結果を返しますが、使い分けることでより柔軟なプログラムを書くことができます。

### 変数を使ったプロパティアクセス

ブラケット記法の大きな利点は、変数を使ってプロパティ名を指定できることです。

```html
<script>
    let weather = {
        temperature: 25,
        humidity: 60,
        windSpeed: 8,
        pressure: 1013
    };
    
    let propertyName = "temperature";
    console.log("気温: " + weather[propertyName] + "度");
    
    // 別のプロパティを取得
    propertyName = "humidity";
    console.log("湿度: " + weather[propertyName] + "%");
    
    // ユーザーの入力に基づいてプロパティを選択（実際の例）
    let userChoice = "windSpeed";
    console.log("選択された情報: " + weather[userChoice]);
</script>
```

実行結果は以下のようになります。

```
気温: 25度
湿度: 60%
選択された情報: 8
```

この機能により、プログラムの実行時に動的にプロパティを選択できるようになります。

天気予報アプリでユーザーが表示したい項目を選択したり、設定画面で項目を動的に切り替えたりする際に活用できます。

### 特殊なプロパティ名の場合

プロパティ名にスペースや特殊文字が含まれる場合は、ブラケット記法を使う必要があります。

```html
<script>
    let survey = {
        "お名前": "田中花子",
        "年齢層": "20代",
        "満足度": 5,
        "user-id": "abc123"
    };
    
    // 日本語のプロパティ名
    console.log("回答者: " + survey["お名前"]);
    console.log("年齢: " + survey["年齢層"]);
    
    // ハイフンを含むプロパティ名
    console.log("ユーザーID: " + survey["user-id"]);
</script>
```

実行結果は以下のようになります。

```
回答者: 田中花子
年齢: 20代
ユーザーID: abc123
```

日本語のプロパティ名やハイフンを含む名前は、ドット記法では使用できないため、ブラケット記法が必要になります。

## オブジェクトのプロパティ一覧取得

### Object.keysでプロパティ名を取得する

オブジェクトに含まれるすべてのプロパティ名を配列として取得するには、`Object.keys()`を使います。

```html
<script>
    let smartphone = {
        brand: "Apple",
        model: "iPhone",
        storage: "128GB",
        color: "黒",
        price: 98000
    };
    
    let propertyNames = Object.keys(smartphone);
    
    console.log("プロパティ名一覧:");
    console.log(propertyNames);
    console.log("プロパティ数: " + propertyNames.length);
</script>
```

実行結果は以下のようになります。

```
プロパティ名一覧:
['brand', 'model', 'storage', 'color', 'price']
プロパティ数: 5
```

`Object.keys()`は、オブジェクトのすべてのプロパティ名を文字列の配列として返してくれます。

この機能は、オブジェクトの構造を調べたり、のちに学習するループ処理ですべてのプロパティを順番に処理したりする際に便利です。

### Object.valuesで値一覧を取得する

プロパティの値だけを配列として取得するには、`Object.values()`を使います。

```html
<script>
    let scores = {
        math: 85,
        english: 92,
        science: 78,
        history: 88
    };
    
    let allScores = Object.values(scores);
    
    console.log("すべての点数:");
    console.log(allScores);
</script>
```

実行結果は以下のようになります。

```
すべての点数:
[85, 92, 78, 88]
```

`Object.values()`を使うことで、オブジェクトの値だけを配列として取得できます。

### プロパティの存在確認

特定のプロパティがオブジェクトに存在するかを確認する方法もあります。

```html
<script>
    let user = {
        name: "鈴木一郎",
        age: 30,
        email: "suzuki@example.com"
    };
    
    // in演算子を使った確認
    console.log("nameプロパティが存在する: " + ("name" in user));
    console.log("phoneプロパティが存在する: " + ("phone" in user));
    
    // undefinedとの比較による確認
    console.log("emailは未定義: " + (user.email === undefined));
    console.log("addressは未定義: " + (user.address === undefined));
</script>
```

実行結果は以下のようになります。

```
nameプロパティが存在する: true
phoneプロパティが存在する: false
emailは未定義: false
addressは未定義: true
```

`in`演算子を使うことで、プロパティの存在を確実に確認できます。

また、プロパティの値が`undefined`かどうかを調べることでも、プロパティの存在を間接的に確認できます。

## まとめ

本章では、JavaScriptでのオブジェクトの基本操作について学びました。以下の内容を理解できたことと思います。

- 波括弧`{}`を使ってオブジェクトを作成し、関連する複数の情報をプロパティとして管理できる
- ドット記法（`.`）とブラケット記法（`[]`）を使ってプロパティにアクセス・更新・追加ができる
- ブラケット記法では変数を使った動的なプロパティアクセスが可能
- `Object.keys()`と`Object.values()`でプロパティ名と値の一覧を取得できる

オブジェクトは、現実世界のデータ構造を自然に表現できる強力な仕組みです。

ユーザー情報、商品データ、設定値など、Webアプリケーションの様々な場面で今回学んだ知識を活用できるでしょう。

次回からは、これまで学んだデータ型を使って、プログラムの流れを制御する方法について学んでいきます。