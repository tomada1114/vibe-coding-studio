---
title: localStorageでデータを一時保存しよう
nextjs:
  metadata:
    title: localStorageでデータを一時保存しよう
    description: ReactアプリでlocalStorageを使ってTodoデータを保存し、ブラウザを閉じてもデータが残る永続化機能を実装します。
---

## 学習の目標

本章では、以下の内容を学習します。

- localStorageの基本概念と使い方を理解する
- JSON.stringifyとJSON.parseを使ったデータの保存・読み込み方法を習得する
- useEffectを使ったデータの自動保存機能を実装する
- アプリ起動時のデータ復元処理を学ぶ
- ブラウザストレージを使った永続化の基本パターンを理解する

## はじめに

前章までで、Todoアプリの基本的な機能がすべて完成しました。
しかし、現在のアプリにはひとつ大きな問題があります。ブラウザを閉じたり、ページをリロードしたりすると、作成したTodoがすべて消えてしまうことです。

今回は、 **localStorageを使ったデータ保存機能** を実装して、ブラウザを閉じてもTodoデータが保持されるようにします。

これにより、実用的なTodoアプリとして使えるようになります。

localStorageは、ブラウザに搭載されているデータ保存機能で、文字列データを永続的に保存できます。

本来であれば、データベースという場所に保存するのが一般的ですが、学習用の小規模なアプリケーションでは、localStorageを使うことで手軽にデータの永続化が実現できます。

JavaScriptから簡単に利用でき、小規模なアプリケーションのデータ保存に適していますので、まずはこの方法を学んでいきましょう。

## localStorageの基本操作

Todo アプリの改修に入る前に、まずはlocalStorageの基本的な使い方を確認しておきましょう。

### localStorageとは

localStorageは、ブラウザのローカルストレージ機能のひとつです。

Webページごとにデータを保存でき、ブラウザを閉じても、コンピューターを再起動してもデータが残ります。

基本的な操作方法は以下の通りです。

```javascript
// データを保存
localStorage.setItem('キー', '値');

// データを取得
const data = localStorage.getItem('キー');

// データを削除
localStorage.removeItem('キー');
```

ただし、localStorageは文字列しか保存できないため、オブジェクトや配列を保存する場合は、JSONに変換する必要があります。

### JSONを使ったデータの変換

TodoデータはJavaScriptのオブジェクトの配列なので、保存前にJSON文字列に変換し、読み込み時に元のオブジェクトに戻す必要があります。

```javascript
// オブジェクトをJSON文字列に変換して保存
const todoData = [{ id: 1, text: "例", completed: false }];
localStorage.setItem('todos', JSON.stringify(todoData));

// JSON文字列を取得してオブジェクトに変換
const savedData = localStorage.getItem('todos');
const parsedData = JSON.parse(savedData);
```

この変換処理を使って、Todoデータを保存・読み込みしていきます。

## データ保存機能の実装

では localStorageを使って、Todoデータの保存機能を実装していきましょう。

### useEffectでTodoの自動保存

Todoデータが変更されるたびに自動的にlocalStorageに保存されるよう、`App.jsx`にuseEffectを追加しましょう。

`useEffect` についておさらいしておくと、これはReactのフックの一つで、コンポーネントのライフサイクルに合わせてサイドエフェクト（副作用）を実行するために使用するものでした。

今回のように、コンポーネントの状態が変化したときに何か処理を行いたい場合に使われるのでしたね。

ここでは Todoデータが変更されるたびにlocalStorageに保存する処理を`useEffect`で実装します。

`src/app/App.jsx`を以下のように修正します。

```jsx
import { useState, useEffect } from 'react'; // useEffectを追加
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Reactの基礎を学ぶ",
      completed: false
    },
    {
      id: 2,
      text: "Todoアプリを作成する",
      completed: false
    },
    {
      id: 3,
      text: "JavaScriptの復習をする",
      completed: true
    }
  ]);

  // Todoデータが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const generateNewId = () => {
    if (todos.length === 0) return 1;
    const maxId = Math.max(...todos.map(todo => todo.id));
    return maxId + 1;
  };

  const addTodo = (text) => {
    const newTodo = {
      id: generateNewId(),
      text: text,
      completed: false
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm onAddTodo={addTodo} />

        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
          onToggleTodo={toggleTodo}
        />
      </div>
    </div>
  )
}

export default App
```

`useEffect`の依存配列に `[todos]` を指定することで、 `todos` ステートが変更されるたびにlocalStorageへの保存処理が実行されます。

`JSON.stringify(todos)` により、TodoデータがJSON文字列に変換されてlocalStorageに保存されます。

これで、Todoの追加・削除・編集・完了切り替えなど、どの操作を行ってもデータが自動的に保存されるようになります。

## データ読み込み機能の実装

### アプリ起動時のデータ復元

次に、アプリが起動した時にlocalStorageからTodoデータを読み込む処理を実装しましょう。

```jsx
import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  // 初期値をlocalStorageから読み込む
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    // localStorageにデータがない場合のデフォルトデータ
    return [
      {
        id: 1,
        text: "Reactの基礎を学ぶ",
        completed: false
      },
      {
        id: 2,
        text: "Todoアプリを作成する",
        completed: false
      },
      {
        id: 3,
        text: "JavaScriptの復習をする",
        completed: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const generateNewId = () => {
    if (todos.length === 0) return 1;
    const maxId = Math.max(...todos.map(todo => todo.id));
    return maxId + 1;
  };

  const addTodo = (text) => {
    const newTodo = {
      id: generateNewId(),
      text: text,
      completed: false
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm onAddTodo={addTodo} />

        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
          onToggleTodo={toggleTodo}
        />
      </div>
    </div>
  )
}

export default App
```

`useState`の初期値に関数を渡すことで、コンポーネントの初回レンダリング時にlocalStorageからデータを読み込んでいます。

`localStorage.getItem('todos')` でデータを取得し、データが存在する場合は `JSON.parse` でオブジェクトに変換して使用します。

データが存在しない場合（初回起動時など）は、デフォルトのサンプルデータを使用します。

これで、ブラウザを閉じて再び開いても、以前に作成したTodoデータが復元されるようになります。

## 動作確認とテスト

### データ保存の確認

ここまでの実装が完了したら、実際にデータ保存機能をテストしてみましょう。

まず、新しいTodoを追加してみてください。

![スクリーンショット](/img/react/todo_app_local_storage_add_todo.png)

その後、ブラウザの開発者ツールを開いて「Application（アプリケーション）」タブを選択し、「Local Storage（ローカルストレージ）」の項目を選択します。

さらに、左側のリストから `http://localhost:5173` を選択すると、右側にlocalStorageの内容が表示されます。
![スクリーンショット](/img/react/todo_app_local_storage_devtools.png)

（「ローカルストレージ」横の右向き矢印をクリックして展開してください）

`todos` というキーで、JSON形式のTodoデータが保存されていることを確認できるはずです。

これで、Todoデータが正しくlocalStorageに保存されていることが確認できました。

### データ復元の確認

次に、データが正しく復元されるかテストしてみましょう。

いくつかTodoを追加・編集・削除した後、ブラウザのページをリロード（F5キー）してください。

今まではリロードするとTodoデータが消えていましたが、今回の実装ではlocalStorageに保存されているため、リロード後もTodoデータがそのまま表示されるはずです。

![スクリーンショット](/img/react/todo_app_local_storage_add_todo.png)

## まとめ

本章では、localStorageを使ったデータ永続化機能を実装しました。

学習できた内容は以下の通りです。

localStorageの基本的な使い方を理解し、 `JSON.stringify` と `JSON.parse` を使ったオブジェクトデータの保存・読み込み方法を習得しました。

また、 `useEffect` を使ったデータの自動保存機能と、アプリ起動時のデータ復元処理を実装しました。

これで、Todoアプリが完全に実用的なアプリケーションになりました。

ユーザーは安心してTodoを管理でき、ブラウザを閉じても大切なタスクデータが失われることはありません。

JavaScriptとReactの基本的な機能を組み合わせて、実際に使える本格的なWebアプリケーションを作成することができました。

覚えることが多く、コード量も増えましたが、これでReactの基本的な使い方と、データの永続化方法を学ぶことができました。
