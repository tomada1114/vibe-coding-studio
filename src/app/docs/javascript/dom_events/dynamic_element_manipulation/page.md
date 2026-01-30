---
title: 要素を動的に追加・削除してみよう
nextjs:
  metadata:
    title: 要素を動的に追加・削除してみよう
    description: JavaScriptで要素を動的に追加・削除する方法を学びます。createElementで要素作成、appendChildで要素追加、removeChildで要素削除の基本操作を習得できます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `createElement`で新しい要素を作成する方法を理解する
- `appendChild`で要素を追加する方法を学ぶ
- `removeChild`で要素を削除する方法を習得する
- 動的なリスト作成の基本を学ぶ

## はじめに

これまでは既存のHTML要素の内容を変更する方法を学んできました。しかし、実際のWebアプリケーションでは、ユーザーの操作に応じて新しい要素を追加したり、不要な要素を削除したりする必要があります。

今回は、JavaScriptを使って要素を動的に作成・追加・削除する方法を学んでいきましょう。

## HTMLファイルを準備しよう

VS Codeで`dynamic_elements.html`というファイルを作成し、以下のコードを入力してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>要素の動的追加・削除</title>
</head>
<body>
    <h1>要素の動的追加・削除</h1>

    <div>
        <input type="text" id="item-input" placeholder="アイテム名を入力">
        <button id="add-btn">追加</button>
    </div>

    <ul id="item-list">
        <li>最初のアイテム</li>
    </ul>

    <script>
        // ここにJavaScriptを書いていきます
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開いてください。テキスト入力欄と追加ボタン、そして1つのアイテムが入ったリストが表示されます。

![スクリーンショット](/img/javascript/dynamic_elements_with_list.png)

この時点でのDOM構造は以下のようになっています。

```html
<ul id="item-list">
    <li>最初のアイテム</li>
</ul>
```

このリストに新しいアイテムを追加したり、削除したりする機能を実装していきます。

## createElementで新しい要素を作成しよう

新しいHTML要素を作成するには、`document.createElement()`メソッドを使います。

`<script>`タグ内に以下のコードを追加してください。

```html
<script>
    // 追加ボタンがクリックされた時の処理
    const addButton = document.getElementById('add-btn');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    addButton.addEventListener('click', function() {
        // 入力値を取得
        const itemText = itemInput.value;

        // 空の場合は処理を停止
        if (itemText === '') {
            alert('アイテム名を入力してください');
            return;
        }

        // 新しいli要素を作成
        const newItem = document.createElement('li');
        newItem.textContent = itemText;

        console.log('作成された要素:', newItem);
    });
</script>
```

ブラウザを更新して、テキスト入力欄に「新しいアイテム」と入力してから「追加」ボタンをクリックしてみてください。コンソールに新しく作成された`<li>`要素が表示されます。

![スクリーンショット](/img/javascript/dynamic_elements_inputting_item.png)

```bash
作成された要素: <li>新しいアイテム</li>
```

この時点では、新しい要素は作成されましたが、まだページには表示されていません。メモリ上に以下のような要素が作成された状態です。

（ここでいう「メモリ上」とは、ブラウザが現在のページの内容を保持している場所を指します。）

```html
<!-- 作成されたが、まだページに追加されていない要素 -->
<li>新しいアイテム</li>
```

次は、この作成した要素を実際にページに追加してみましょう。

実際にページに追加される要素と、まだメモリ上にある要素は別物ですので、注意しておきましょう。

## appendChildで要素をページに追加しよう

作成した要素をページに表示するには、`appendChild()`メソッドを使って既存の要素に追加します。

先ほどのコードを以下のように更新してください。

```html
<script>
    // 追加ボタンがクリックされた時の処理
    const addButton = document.getElementById('add-btn');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    addButton.addEventListener('click', function() {
        // 入力値を取得
        const itemText = itemInput.value;

        // 空の場合は処理を停止
        if (itemText === '') {
            alert('アイテム名を入力してください');
            return;
        }

        // 新しいli要素を作成
        const newItem = document.createElement('li');
        newItem.textContent = itemText;

        // --- リストに要素を追加 ---
        itemList.appendChild(newItem);

        // 入力欄を空にする
        itemInput.value = '';

        console.log('アイテムが追加されました:', itemText);
        // --- 追加終了 ---
    });
</script>
```

ブラウザを更新して、「新しいアイテム」と入力して追加ボタンをクリックしてみてください。

`appendChild()`を実行すると、DOM構造が以下のように変化します。

#### 追加前のDOM構造
```html
<ul id="item-list">
    <li>最初のアイテム</li>
</ul>
```

#### 追加後のDOM構造
```html
<ul id="item-list">
    <li>最初のアイテム</li>
    <li>新しいアイテム</li>
</ul>
```

その結果として、実際にページに「新しいアイテム」が表示されます。

![スクリーンショット](/img/javascript/dynamic_elements_added_item.png)

さらに別のアイテム「2番目のアイテム」を追加すると、DOM構造は以下のようになります。

```html
<ul id="item-list">
    <li>最初のアイテム</li>
    <li>新しいアイテム</li>
    <li>2番目のアイテム</li>
</ul>
```

`appendChild()`は、指定した要素を親要素の最後の子要素として追加しますので、追加された要素は常にリストの最後に表示されていくことになります。

![スクリーンショット](/img/javascript/dynamic_elements_multiple_items.png)

## 削除ボタン付きの要素を作成しよう

各アイテムに削除ボタンを付けて、個別に削除できるようにしてみましょう。

コードを以下のように更新してください。

```html
<script>
    // 追加ボタンがクリックされた時の処理
    const addButton = document.getElementById('add-btn');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    addButton.addEventListener('click', function() {
        // 入力値を取得
        const itemText = itemInput.value;

        // 空の場合は処理を停止
        if (itemText === '') {
            alert('アイテム名を入力してください');
            return;
        }

        // 新しいli要素を作成
        const newItem = document.createElement('li');

        // --- アイテムのテキストと削除ボタンを追加 ---
        newItem.textContent = itemText;

        // 削除ボタンを作成
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';

        // 削除ボタンがクリックされた時の処理
        deleteButton.addEventListener('click', function() {
            itemList.removeChild(newItem);
            console.log('アイテムが削除されました:', itemText);
        });

        // li要素に削除ボタンを追加
        newItem.appendChild(deleteButton);
        // --- 追加終了 ---

        // リストに要素を追加
        itemList.appendChild(newItem);

        // 入力欄を空にする
        itemInput.value = '';

        console.log('アイテムが追加されました:', itemText);
    });
</script>
```

ではブラウザを更新して、まずは「タスク1」と入力して追加ボタンをクリックしてみてください。

削除ボタン付きの要素が追加されると、DOM構造は以下のようになります。

#### 追加後のDOM構造
```html
<ul id="item-list">
    <li>最初のアイテム</li>
    <li>
        タスク1
        <button>削除</button>
    </li>
</ul>
```

![スクリーンショット](/img/javascript/dynamic_elements_with_delete_button.png)

さらに「タスク2」を追加すると以下のようになります。

```html
<ul id="item-list">
    <li>最初のアイテム</li>
    <li>
        タスク1
        <button>削除</button>
    </li>
    <li>
        タスク2
        <button>削除</button>
    </li>
</ul>
```

![スクリーンショット](/img/javascript/dynamic_elements_multiple_items_with_delete_button.png)

## 要素の削除を確認しよう

削除ボタンをクリックすると、`removeChild()`によって対象の要素がDOMから削除されます。

例えば、「タスク1」の削除ボタンをクリックすると、DOM構造は以下のように変化します。

#### 削除前
```html
<ul id="item-list">
    <li>最初のアイテム</li>
    <li>
        タスク1
        <button>削除</button>
    </li>
    <li>
        タスク2
        <button>削除</button>
    </li>
</ul>
```

#### 削除後
```html
<ul id="item-list">
    <li>最初のアイテム</li>
    <li>
        タスク2
        <button>削除</button>
    </li>
</ul>
```

![スクリーンショット](/img/javascript/dynamic_elements_item_deleted.png)

ページ上からも「タスク1」が消え、DOMツリーからも削除されていることが確認できます。

`removeChild()`メソッドは、指定した子要素を親要素から完全に削除します。削除された要素は画面からも消え、DOMツリーからも取り除かれます。

## より簡潔な書き方を学ぼう

少し応用的な内容ですが、削除ボタンの処理をもう少し簡潔に書く方法があります。

最近のブラウザでは、`remove()`メソッドを使ってより簡潔に要素を削除できます。

削除ボタンの処理を以下のように書き換えることもできます。

```javascript
// 削除ボタンがクリックされた時の処理
deleteButton.addEventListener('click', function() {
    newItem.remove(); // より簡潔な書き方
    console.log('アイテムが削除されました:', itemText);
});
```

`remove()`メソッドと`removeChild()`メソッドの結果は同じで、どちらを使ってもDOM構造の変化は同じです。`remove()`の方が短く書けるため、よく使われています。

どちらの書き方もよく使われるので、覚えておくと良いでしょう。

## まとめ

本章では、要素の動的な追加・削除について学習しました。今回学んだ内容は以下の通りです。

- `createElement()`で新しい要素を作成できる
- `appendChild()`で要素を親要素に追加でき、DOM構造が変化する
- `removeChild()`または`remove()`で要素を削除でき、DOM構造から要素が除去される
- 要素の追加・削除により、リアルタイムでページの内容が変更される

これらの基本操作を組み合わせることで、ユーザーの操作に応じてページの内容を動的に変更するインタラクティブなWebアプリケーションを作ることができます。次の章では、CSSクラスを操作してスタイルを変更する方法を学んでいきましょう。
