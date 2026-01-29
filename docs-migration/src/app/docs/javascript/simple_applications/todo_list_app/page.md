---
title: ToDoリストアプリを作成してみよう
nextjs:
  metadata:
    title: ToDoリストアプリを作成してみよう
    description: HTMLとJavaScriptを使って実用的なToDoリストアプリケーションを作成し、DOM操作やイベント処理の知識を実践的に活用する方法を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- `HTML`と`JavaScript`を組み合わせた実用的なアプリケーションの作成方法を理解する
- `DOM`操作を使ったタスクの動的な追加・削除機能の実装方法を習得する
- フォーム入力値の取得とイベント処理の組み合わせ方を学ぶ
- 配列を使ったデータ管理と`DOM`表示の連携方法を理解する
- これまで学んだ`JavaScript`の基礎知識を実践的に活用する

## はじめに

これまで`JavaScript`の基本文法から始まり、`DOM`操作やイベント処理まで様々なことを学んできました。
今回は、それらの知識を組み合わせて実際に使えるアプリケーションを作ってみましょう。

`ToDo`リストは、私たちの日常生活でもよく使うシンプルなアプリケーションです。
やることを追加して、完了したら削除するという基本的な機能を持っています。
シンプルですが、`JavaScript`の重要な機能をたくさん使うことになります。

この`ToDo`リストアプリを作ることで、`HTML`要素の動的な追加や削除、フォームからの入力値取得、イベントリスナーの活用など、実際の`Web`アプリケーション開発で必要な技術を体験できます。

## `HTML`ファイルの準備

まずは、`ToDo`リストアプリの基本となる`HTML`ファイルを作成しましょう。
`VS Code`で新しいファイルを作成し、`todo-app.html`という名前で保存してください。

以下のコードを入力してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDoリストアプリ</title>
</head>
<body>
    <h1>My ToDoリスト</h1>

    <div>
        <input type="text" id="taskInput" placeholder="新しいタスクを入力してください">
        <button id="addButton">追加</button>
    </div>

    <div id="taskList">
        <!-- ここにタスクが追加されます -->
    </div>

    <script>
        // JavaScriptコードをここに書いていきます
    </script>
</body>
</html>
```

この`HTML`ファイルには、`ToDo`リストアプリに必要な基本的な構造が含まれています。
タスクを入力するための`input`要素、追加するための`button`要素、そしてタスクが表示される`div`要素があります。

`script`タグの中にこれから`JavaScript`コードを書いていくことになります。
シンプルな構造なので、`JavaScript`の機能に集中して学習を進めることができます。

## タスクデータを管理する配列の準備

次に、`JavaScript`でタスクのデータを管理するための仕組みを作りましょう。
`script`タグの中に以下のコードを追加してください。

```html
<script>
    // タスクを管理する配列
    let tasks = [];

    // DOM要素の取得
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
</script>
```

ここでは、まず`tasks`という配列を作成してタスクのデータを管理します。
この配列にタスクの情報を追加したり削除したりすることで、`ToDo`リストの状態を管理します。

次に、よく使う`DOM`要素を変数に保存しています。
`getElementById`を使って、入力欄、追加ボタン、タスク表示エリアの要素を取得し、それぞれ`taskInput`、`addButton`、`taskList`という変数に保存しました。

このように`DOM`要素を変数に保存しておくことで、後で何度も使う時に毎回`getElementById`を書く必要がなくなります。

## タスクを画面に表示する関数の作成

タスクの配列を画面に表示するための関数を作成しましょう。先ほどのコードに続けて、以下を追加してください。

```html
<script>
    // タスクを管理する配列
    let tasks = [];

    // DOM要素の取得
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // ここから追加
    // タスクを画面に表示する関数
    function displayTasks() {
        // タスク表示エリアを一度空にする
        taskList.innerHTML = '';

        // 配列の各タスクに対してループ処理
        tasks.forEach(function(task, index) {
            // タスク項目のdiv要素を作成
            const taskItem = document.createElement('div');

            // タスクのHTML内容を設定
            taskItem.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">削除</button>
            `;

            // タスクリストに追加
            taskList.appendChild(taskItem);
        });
    }
    // 追加ここまで
</script>
```

`displayTasks`関数は、`tasks`配列の内容を画面に表示するための重要な関数です。
この関数の動作を詳しく見てみましょう。

まず、`taskList.innerHTML = ''`で表示エリアを空にします。
これにより、古い表示内容を削除してから新しい内容を表示できます。

次に、`forEach`メソッドを使って`tasks`配列の各要素に対してループ処理を行います。
各タスクに対して新しい`div`要素を作成し、タスクのテキストと削除ボタンを含む`HTML`を設定しています。

削除ボタンには`onclick="deleteTask(${index})"`という属性を設定しています。
これにより、ボタンがクリックされた時に、そのタスクのインデックス番号を`deleteTask`関数に渡すことができます。

## タスク追加機能の実装

続いて、新しいタスクを追加する機能を実装しましょう。
以下のコードを追加してください。

```html
<script>
    // タスクを管理する配列
    let tasks = [];

    // DOM要素の取得
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // タスクを画面に表示する関数
    function displayTasks() {
        taskList.innerHTML = '';

        tasks.forEach(function(task, index) {
            const taskItem = document.createElement('div');

            taskItem.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">削除</button>
            `;

            taskList.appendChild(taskItem);
        });
    }

    // ここから追加
    // タスクを追加する関数
    function addTask() {
        // 入力値の取得（前後の空白を削除）
        const taskText = taskInput.value.trim();

        // 空の入力値は追加しない
        if (taskText === '') {
            alert('タスクを入力してください');
            return;
        }

        // 配列にタスクを追加
        tasks.push(taskText);

        // 入力欄を空にする
        taskInput.value = '';

        // 画面を更新
        displayTasks();
    }

    // 追加ボタンのクリックイベント
    addButton.addEventListener('click', addTask);
    // 追加ここまで
</script>
```

`addTask`関数では、**まず入力欄から値を取得し**、`trim()`メソッドで前後の空白を削除しています。
これにより、空白だけのタスクが追加されることを防げます。

入力値が空の場合は、`alert`でメッセージを表示して処理を終了します。
値がある場合は、`push`メソッドを使って`**tasks**`配列にタスクを追加します。

タスクを追加した後は、入力欄を空にして、`displayTasks`関数を呼び出して画面を更新します。
これにより、新しく追加されたタスクがすぐに画面に表示されます。

最後に、`addEventListener`を使って追加ボタンのクリックイベントに`addTask`関数を登録しています。

試しに`HTML`ファイルを保存してブラウザで開き、タスクを入力して「追加」ボタンをクリックしてみましょう。
タスクがリストに追加されることが確認できるかと思います。

![スクリーンショット](/img/javascript/before_todo_list_app_add_task.png)

![スクリーンショット](/img/javascript/after_todo_list_app_add_task.png)

これで、タスクの追加機能が実装できました。

ただし、まだタスクを削除する機能が実装されていないため、追加したタスクを削除することはできません。

次には、タスクを削除する機能を実装していきましょう。

## タスク削除機能の実装

最後に、タスクを削除する機能を実装しましょう。
以下のコードを追加してください。

```html
<script>
    // タスクを管理する配列
    let tasks = [];

    // DOM要素の取得
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // タスクを画面に表示する関数
    function displayTasks() {
        taskList.innerHTML = '';

        tasks.forEach(function(task, index) {
            const taskItem = document.createElement('div');

            taskItem.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">削除</button>
            `;

            taskList.appendChild(taskItem);
        });
    }

    // タスクを追加する関数
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('タスクを入力してください');
            return;
        }

        tasks.push(taskText);
        taskInput.value = '';
        displayTasks();
    }

    // 追加ボタンのクリックイベント
    addButton.addEventListener('click', addTask);

    // ここから追加
    // タスクを削除する関数
    function deleteTask(index) {
        // 指定されたインデックスのタスクを配列から削除
        tasks.splice(index, 1);

        // 画面を更新
        displayTasks();
    }

    // Enterキーでもタスクを追加できるようにする
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    // 追加ここまで
</script>
```

`deleteTask`関数では、`splice`メソッドを使って指定されたインデックスのタスクを配列から削除しています。
`splice(index, 1)`は、指定された位置から1個の要素を削除するという意味です。

削除後は`displayTasks()`を呼び出して画面を更新します。
これにより、削除されたタスクが画面からも消えます。

また、ユーザビリティを向上させるために、入力欄で`Enter`キーを押した時にもタスクが追加できるようにしました。
`keypress`イベントを使って、押されたキーが`'Enter'`の場合に`addTask`関数を実行しています。

では、再度`HTML`ファイルを保存してブラウザで開き、タスクを追加した後に削除ボタンをクリックしてみましょう。
タスクが正しく削除されることを確認してください。

![スクリーンショット](/img/javascript/todo_list_app_before_delete_task.png)

![スクリーンショット](/img/javascript/todo_list_app_after_delete_task.png)

## ここまでで使った JavaScriptの機能

この`ToDo`リストアプリでは、以下の`JavaScript`の機能を使用しました。

- 配列: タスクのデータを管理するために使用
- DOM操作: `getElementById`や`createElement`を使って、`HTML`要素の取得や動的な追加・削除を実現
- イベントリスナー: `addEventListener`を使って、ボタンのクリックや`Enter`キーの押下に対する処理を実装
- 関数: タスクの追加や削除、表示を行うための関数を定義
- 文字列操作: `trim()`メソッドを使って、入力値の前後の空白を削除
- 条件分岐: `if`文を使って、入力値のバリデーションや削除処理の制御を実装
- ループ処理: `forEach`メソッドを使って、配列の各要素に対して処理を実行

Todo アプリはシンプルながら、JavaScript の基本的な機能を幅広く使うことができる良い練習になります。

今回使った中で、少しあやふやだと感じる部分があれば、もう一度復習してみることをおすすめします。

長くて大変だったかもしれませんが、ここまで来ると`JavaScript`の基礎的な部分はかなり理解できていると思います。

## まとめ

本章では、`JavaScript`を使って実用的な`ToDo`リストアプリケーションを作成しました。
学んだ内容は以下の通りです。

- `HTML`と`JavaScript`を組み合わせたアプリケーション開発の基本的な流れを理解できました
- 配列を使ったデータ管理と画面表示の連携方法を習得しました
- `DOM`操作による動的な要素の追加・削除の実装方法を学びました
- フォーム入力値の取得とバリデーションの基本的な方法を理解しました
- イベントリスナーを使ったユーザー操作への対応方法を実践できました

この`ToDo`リストアプリは基本的な機能のみですが、`JavaScript`アプリケーション開発の重要な要素が含まれています。
これまで学んだ知識を実際のアプリケーション作成に活用することで、プログラミングスキルをさらに向上させることができます。
