---
title: mapとfilterメソッドで配列を操作しよう
nextjs:
  metadata:
    title: mapとfilterメソッドで配列を操作しよう
    description: JavaScriptのmapとfilterメソッドを使って配列を変換・絞り込む方法を学び、元の配列を変更せずに新しい配列を作成する技術をマスターします。
---

## 学習の目標

本章では、以下の内容を学習します。

- mapメソッドで配列を変換する方法を理解する
- filterメソッドで配列を絞り込む方法を習得する
- 元の配列を変更せずに新しい配列を作成する概念を学ぶ
- メソッドチェーンの活用方法を理解する

## はじめに

前回の章では、forEachメソッドを使って配列の各要素に対して処理を行う方法を学びました。今回は、配列を操作するためのさらに強力なメソッドである**map**と**filter**について学んでいきます。

mapメソッドは、配列の各要素を変換して新しい配列を作るために使います。たとえば、数値の配列があるときに、すべての値を2倍にした新しい配列を作りたい場合に便利です。

filterメソッドは、配列から条件に合う要素だけを取り出して新しい配列を作るために使います。たとえば、点数の配列から80点以上の点数だけを取り出したい場合に活用できます。

これらのメソッドは、元の配列を変更することなく新しい配列を作成するという特徴があり、安全で読みやすいコードを書くのに役立ちます。実際のWebアプリケーション開発でも頻繁に使われる重要な機能です。

## mapメソッドで配列を変換しよう

mapメソッドは、配列の各要素に対して指定した処理を行い、その結果を新しい配列として返してくれます。「変換」や「写像」と呼ばれることもあります。

VS Codeで新しいHTMLファイル`map-filter-test.html`を作成して、mapメソッドの動作を確認してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mapとfilterメソッドのテスト</title>
</head>
<body>
    <h1>mapとfilterメソッドのテスト</h1>
    
    <script>
        const numbers = [1, 2, 3, 4, 5];
        
        console.log("=== mapメソッドのテスト ===");
        console.log("元の配列: " + numbers);
        
        // 各要素を2倍にした新しい配列を作成
        const doubledNumbers = numbers.map(function(num) {
            return num * 2;
        });
        
        console.log("2倍にした配列: " + doubledNumbers);
        console.log("元の配列（変更されていない）: " + numbers);
    </script>
</body>
</html>
```

このHTMLファイルを保存してブラウザで開き、開発者ツールのConsoleを確認してください。以下のような表示が現れるはずです。

```
=== mapメソッドのテスト ===
元の配列: 1,2,3,4,5
2倍にした配列: 2,4,6,8,10
元の配列（変更されていない）: 1,2,3,4,5
```

このように、mapメソッドは元の配列を変更することなく、新しい配列を作成します。これは**非破壊的**な操作と呼ばれ、安全なプログラミングの重要な概念です。

### mapメソッドの仕組み

mapメソッドの基本的な構造を理解してみましょう。

```javascript
const 新しい配列 = 元の配列.map(function(要素) {
    return 変換後の値;
});
```

mapメソッドは、forEachと同様にコールバック関数を受け取ります。しかし、重要な違いは、コールバック関数が**戻り値を返す**ということです。この戻り値が新しい配列の要素になります。

元の配列に5つの要素があれば、新しい配列にも5つの要素ができます。mapメソッドは、各要素を一対一で変換するのです。

### アロー関数を使ったより簡潔な書き方

前回学んだアロー関数を使うことで、mapメソッドをより簡潔に書くことができます。

```html
<script>
    const prices = [100, 200, 300, 400, 500];
    
    console.log("=== 税込価格の計算 ===");
    console.log("元の価格: " + prices);
    
    // 通常の関数を使った場合
    const withTax1 = prices.map(function(price) {
        return price * 1.1;
    });
    
    // アロー関数を使った場合
    const withTax2 = prices.map((price) => {
        return price * 1.1;
    });
    
    // アロー関数の短縮記法
    const withTax3 = prices.map(price => price * 1.1);
    
    console.log("税込価格（通常の関数）: " + withTax1);
    console.log("税込価格（アロー関数）: " + withTax2);
    console.log("税込価格（短縮記法）: " + withTax3);
</script>
```

すべて同じ結果になりますが、短縮記法を使うと非常に読みやすくなります。特に、簡単な変換処理の場合は、この書き方がよく使われます。

## 様々な変換パターンを試してみよう

mapメソッドは、数値の計算だけでなく、文字列の変換やオブジェクトの変換など、様々な用途に使えます。

```html
<script>
    // 文字列の変換
    const names = ["田中", "佐藤", "山田"];
    const greetings = names.map(name => "こんにちは、" + name + "さん");
    
    console.log("=== 挨拶の生成 ===");
    console.log("名前: " + names);
    console.log("挨拶: " + greetings);
    
    // 文字列の長さを取得
    const words = ["JavaScript", "HTML", "CSS"];
    const lengths = words.map(word => word.length);
    
    console.log("=== 文字列の長さ ===");
    console.log("単語: " + words);
    console.log("文字数: " + lengths);
    
    // オブジェクトの変換
    const students = [
        { name: "田中", score: 80 },
        { name: "佐藤", score: 90 },
        { name: "山田", score: 75 }
    ];
    
    // 名前だけを取り出す
    const studentNames = students.map(student => student.name);
    console.log("=== 学生名の抽出 ===");
    console.log("学生名: " + studentNames);
    
    // 新しいオブジェクトを作成
    const results = students.map(student => {
        return {
            name: student.name,
            result: student.score >= 80 ? "合格" : "不合格"
        };
    });
    
    console.log("=== 合否判定 ===");
    results.forEach(result => {
        console.log(result.name + ": " + result.result);
    });
</script>
```

このように、mapメソッドは非常に柔軟で、様々な種類のデータ変換に活用できます。特に、オブジェクトの配列から特定のプロパティだけを取り出したり、新しいプロパティを追加したりする処理は、実際のWebアプリケーション開発でもよく使われます。

## filterメソッドで配列を絞り込もう

filterメソッドは、配列から条件に合う要素だけを取り出して、新しい配列を作るために使います。「フィルター」という名前の通り、不要な要素を除いて必要な要素だけを残す機能です。

```html
<script>
    const scores = [85, 92, 78, 90, 65, 88, 72];
    
    console.log("=== filterメソッドのテスト ===");
    console.log("全ての点数: " + scores);
    
    // 80点以上の点数だけを抽出
    const highScores = scores.filter(function(score) {
        return score >= 80;
    });
    
    console.log("80点以上: " + highScores);
    console.log("元の配列（変更されていない）: " + scores);
</script>
```

このコードを実行すると、以下のような結果が表示されます。

```
=== filterメソッドのテスト ===
全ての点数: 85,92,78,90,65,88,72
80点以上: 85,92,90,88
元の配列（変更されていない）: 85,92,78,90,65,88,72
```

filterメソッドも、元の配列を変更することなく新しい配列を作成します。

### filterメソッドの仕組み

filterメソッドの基本的な構造を理解してみましょう。

```javascript
const 絞り込まれた配列 = 元の配列.filter(function(要素) {
    return 条件式; // trueまたはfalseを返す
});
```

filterメソッドのコールバック関数は、`true`または`false`を返す必要があります。`true`を返した要素は新しい配列に含まれ、`false`を返した要素は除外されます。

mapメソッドとは異なり、filterメソッドで作られる新しい配列の要素数は、元の配列と同じとは限りません。条件に合う要素がなければ、空の配列になることもあります。

### 様々な絞り込み条件を試してみよう

filterメソッドを使って、様々な条件で配列を絞り込んでみましょう。

```html
<script>
    const products = [
        { name: "ノートPC", price: 80000, category: "電子機器" },
        { name: "マウス", price: 2000, category: "電子機器" },
        { name: "本", price: 1500, category: "書籍" },
        { name: "タブレット", price: 50000, category: "電子機器" },
        { name: "雑誌", price: 500, category: "書籍" }
    ];
    
    console.log("=== 商品の絞り込み ===");
    
    // 価格が10000円以上の商品
    const expensiveProducts = products.filter(product => product.price >= 10000);
    console.log("高額商品:");
    expensiveProducts.forEach(product => {
        console.log("- " + product.name + ": " + product.price + "円");
    });
    
    // 電子機器カテゴリの商品
    const electronics = products.filter(product => product.category === "電子機器");
    console.log("電子機器:");
    electronics.forEach(product => {
        console.log("- " + product.name);
    });
    
    // 名前に「本」が含まれる商品
    const booksRelated = products.filter(product => product.name.includes("本"));
    console.log("本関連商品:");
    booksRelated.forEach(product => {
        console.log("- " + product.name);
    });
    
    // 複数の条件を組み合わせ
    const affordableElectronics = products.filter(product => {
        return product.category === "電子機器" && product.price < 30000;
    });
    console.log("お手頃価格の電子機器:");
    affordableElectronics.forEach(product => {
        console.log("- " + product.name + ": " + product.price + "円");
    });
</script>
```

このコードでは、様々な条件でオブジェクトの配列を絞り込んでいます。価格による絞り込み、カテゴリによる絞り込み、文字列の検索、そして複数条件を組み合わせた絞り込みなど、実際のWebアプリケーションでよく使われるパターンを示しています。

## mapとfilterを組み合わせて使おう

mapとfilterメソッドの真の力は、これらを組み合わせて使うときに発揮されます。**メソッドチェーン**という技法を使って、複数の操作を連続して行うことができます。

```html
<script>
    const employees = [
        { name: "田中", department: "営業", salary: 300000 },
        { name: "佐藤", department: "開発", salary: 450000 },
        { name: "山田", department: "営業", salary: 350000 },
        { name: "鈴木", department: "開発", salary: 500000 },
        { name: "高橋", department: "人事", salary: 400000 }
    ];
    
    console.log("=== メソッドチェーンの例 ===");
    
    // 開発部門の従業員の名前だけを取得
    const developersNames = employees
        .filter(employee => employee.department === "開発")
        .map(employee => employee.name);
    
    console.log("開発部門の従業員: " + developersNames);
    
    // 年収400000以上の従業員の年収を1.1倍（昇給）
    const raisedSalaries = employees
        .filter(employee => employee.salary >= 400000)
        .map(employee => {
            return {
                name: employee.name,
                oldSalary: employee.salary,
                newSalary: employee.salary * 1.1
            };
        });
    
    console.log("昇給対象者:");
    raisedSalaries.forEach(employee => {
        console.log(employee.name + ": " + employee.oldSalary + "円 → " + employee.newSalary + "円");
    });
    
    // より複雑な例：営業部門の平均年収を計算
    const salesAverageSalary = employees
        .filter(employee => employee.department === "営業")
        .map(employee => employee.salary)
        .reduce((total, salary) => total + salary, 0) / 
        employees.filter(employee => employee.department === "営業").length;
    
    console.log("営業部門の平均年収: " + salesAverageSalary + "円");
</script>
```

メソッドチェーンを使うことで、複雑な処理を段階的に、そして読みやすく書くことができます。上記の例では、まずfilterで条件に合う従業員を絞り込み、その後mapで必要な情報に変換しています。

### メソッドチェーンの読み方

メソッドチェーンは上から下、左から右に読みます。

```javascript
const result = employees
    .filter(employee => employee.department === "開発")  // 1. 開発部門の従業員を絞り込む
    .map(employee => employee.name);                    // 2. 名前だけを取り出す
```

この処理は「従業員の配列から開発部門の人を選んで、その人たちの名前だけを取り出す」という意味になります。

## 実用的な例で理解を深めよう

最後に、もう少し実用的な例でmapとfilterメソッドの活用方法を学んでみましょう。

```html
<script>
    // ECサイトの商品データを想定
    const items = [
        { id: 1, name: "スマートフォン", price: 50000, stock: 5, category: "electronics" },
        { id: 2, name: "イヤホン", price: 3000, stock: 0, category: "electronics" },
        { id: 3, name: "本", price: 1200, stock: 10, category: "books" },
        { id: 4, name: "タブレット", price: 30000, stock: 3, category: "electronics" },
        { id: 5, name: "雑誌", price: 800, stock: 0, category: "books" }
    ];
    
    console.log("=== ECサイトの商品管理 ===");
    
    // 在庫がある商品のみを表示
    const availableItems = items.filter(item => item.stock > 0);
    console.log("在庫がある商品数: " + availableItems.length);
    
    // 在庫がある電子機器の商品名と価格を取得
    const availableElectronics = items
        .filter(item => item.category === "electronics" && item.stock > 0)
        .map(item => ({
            name: item.name,
            price: item.price,
            formattedPrice: item.price.toLocaleString() + "円"
        }));
    
    console.log("購入可能な電子機器:");
    availableElectronics.forEach(item => {
        console.log("- " + item.name + ": " + item.formattedPrice);
    });
    
    // セール価格を計算（在庫がある商品のみ20%オフ）
    const saleItems = items
        .filter(item => item.stock > 0)
        .map(item => ({
            ...item,  // 元のプロパティをコピー
            originalPrice: item.price,
            salePrice: Math.floor(item.price * 0.8),
            discount: item.price - Math.floor(item.price * 0.8)
        }));
    
    console.log("セール商品:");
    saleItems.forEach(item => {
        console.log(item.name + ": " + item.originalPrice + "円 → " + item.salePrice + "円 (" + item.discount + "円お得)");
    });
    
    // カテゴリ別の在庫商品数を計算
    const stockByCategory = {};
    items
        .filter(item => item.stock > 0)
        .forEach(item => {
            if (!stockByCategory[item.category]) {
                stockByCategory[item.category] = 0;
            }
            stockByCategory[item.category]++;
        });
    
    console.log("カテゴリ別在庫商品数:");
    Object.keys(stockByCategory).forEach(category => {
        console.log(category + ": " + stockByCategory[category] + "商品");
    });
</script>
```

この例では、実際のECサイトで行われるような商品データの処理を示しています。在庫管理、価格計算、カテゴリ別集計など、mapとfilterメソッドを組み合わせることで複雑な業務処理も読みやすく実装できることが分かります。

## まとめ

本章では、JavaScriptのmapとfilterメソッドについて学びました。以下の内容を理解できたことと思います。

- mapメソッドは配列の各要素を変換して新しい配列を作成する
- filterメソッドは条件に合う要素だけを抽出して新しい配列を作成する
- どちらのメソッドも元の配列を変更しない（非破壊的操作）
- コールバック関数の戻り値の意味が異なる（mapは変換後の値、filterは真偽値）
- メソッドチェーンを使って複数の操作を組み合わせられる
- 実際のWebアプリケーション開発での活用パターン

mapとfilterメソッドは、配列を操作する際の基本的なツールです。forEachメソッドと合わせて、これらのメソッドを使いこなすことで、より読みやすく保守しやすいJavaScriptコードを書けるようになります。次回は、プログラムでエラーが発生した時の対処方法について学んでいきます。