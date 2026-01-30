---
title: Todo削除機能を実装しよう
nextjs:
  metadata:
    title: Todo削除機能を実装しよう
    description: ReactでTodo項目を削除する機能を実装し、配列から特定の要素を除去する方法とユーザーインターフェースでの削除操作を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- 配列から特定の要素を削除する方法を理解する
- filterメソッドを使った要素の除去処理を習得する
- 削除ボタンのUIデザインと配置方法を学ぶ
- イベントハンドリングでIDを使った削除処理を実装する
- 削除操作の確認ダイアログを追加する方法を理解する

## はじめに

前章では、新しいTodoを追加する機能を実装しました。

これで、ユーザーが自由にタスクを追加できるようになりましたが、不要になったTodoを削除する機能がまだばtりません。

今回は、 **Todo削除機能** を実装して、ユーザーが完了したタスクや不要なタスクを一覧から削除できるようにします。

削除機能があることで、Todo一覧を常に整理された状態に保つことができます。

具体的には、各Todo項目に削除ボタンを追加し、 `filter` メソッドを使って配列から特定の要素を除去する処理を実装していきます。

また、誤って削除してしまうことを防ぐため、削除前の確認ダイアログも追加します。

## 削除ボタンのUI実装

### TodoItemコンポーネントに削除ボタンを追加

まず、各Todo項目に削除ボタンを追加しましょう。

`src/TodoItem.jsx` を以下のように修正してください。

```jsx
// src/TodoItem.jsx
function TodoItem({ todo }) {
  return (
    <div className={`p-3 rounded shadow flex justify-between items-center ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      <div className="flex-1">
        <p className={`${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-800'
        }`}>
          {todo.text}
        </p>
        <p className="text-sm text-gray-500">
          状態: {todo.completed ? '✅ 完了' : '⏳ 未完了'}
        </p>
      </div>

      {/* 削除ボタンを追加 */}
      <button className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none">
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

この修正では、Todo項目全体を `flex` レイアウトにして、内容部分（ `flex-1` ）と削除ボタンを横並びに配置しています。

削除ボタンには赤色の背景（ `bg-red-500` ）を設定し、ホバー時には少し濃い色（ `hover:bg-red-600` ）に変化するようにしています。

また、ボタンのサイズは小さめ（ `text-sm` ）にして、レイアウトのバランスを保っています。

ブラウザで確認すると、各Todo項目の右側に赤い「削除」ボタンが表示されているはずです。

![スクリーンショット](/img/react/todo_app_todo_delete.png)

ただし、まだクリックしても何も起こりませんので、次に、実際に削除処理を実装していきます。

## 削除機能の実装

### App.jsxに削除関数を追加

次に、実際にTodoを削除する処理を`App.jsx`に実装しましょう。

ついでに、削除機能を確認しやすいように、Todoの初期データを追加しておきます。

```jsx
import { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  // 初期データを用意
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

  // Todo削除関数を追加
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm onAddTodo={addTodo} />

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

`deleteTodo`関数では、`filter`メソッドを使って指定されたIDと一致しないTodoのみを残した新しい配列を作成しています。

`filter`メソッドは、条件に合う要素だけを取り出して新しい配列を作る JavaScript のメソッドです。
`todo.id !== id`という条件により、削除したいIDと異なるIDを持つTodoだけが残ります。

### TodoListコンポーネントに削除関数を渡す

ただ、`deleteTodo`関数を作成しただけでは、まだ削除ボタンをクリックしても何も起こりません。

作成した削除関数をTodoListコンポーネントを通じてTodoItemコンポーネントまで渡しましょう。

Todo 追加フォームを作成したときと同様、こういった関数の受け渡しは、親コンポーネントから子コンポーネントへPropsを使って行います。

まず、`App.jsx`でTodoListに削除関数を渡します。

```jsx
import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm onAddTodo={addTodo} />

        {/* 削除関数をPropsとして渡す */}
        <TodoList todos={todos} onDeleteTodo={deleteTodo} />
      </div>
    </div>
  )
}

export default App
```

### TodoListコンポーネントの更新

次に、`src/TodoList.jsx`を修正して、削除関数をTodoItemコンポーネントに渡します。

ここでポイントなのが、`TodoList`コンポーネントは削除関数を親コンポーネント（`App.jsx`）から受け取り、それを子コンポーネント（`TodoItem.jsx`）に渡す役割を果たすことです。

```jsx
// src/TodoList.jsx
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo }) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
```

TodoListコンポーネントでは、Propsとして受け取った`onDeleteTodo`関数を、各TodoItemコンポーネントに渡しています。

### TodoItemコンポーネントでの削除処理

最後に、`src/TodoItem.jsx`を修正して、削除ボタンがクリックされた時の処理を実装します。

```jsx
// src/TodoItem.jsx
function TodoItem({ todo, onDeleteTodo }) {
  // 削除ボタンのクリック処理
  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <div className={`p-3 rounded shadow flex justify-between items-center ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      <div className="flex-1">
        <p className={`${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-800'
        }`}>
          {todo.text}
        </p>
        <p className="text-sm text-gray-500">
          状態: {todo.completed ? '✅ 完了' : '⏳ 未完了'}
        </p>
      </div>

      {/* クリック処理を追加 */}
      <button
        onClick={handleDelete}
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

`handleDelete`関数では、親コンポーネントから受け取った`onDeleteTodo`関数を呼び出し、そのTodoの`id`を引数として渡しています。

これにより、削除ボタンをクリックすると、そのTodo項目が一覧から削除されるようになります。

## 動作確認とテスト

### 基本的な削除機能のテスト

ここまでの実装が完了したら、実際に削除機能をテストしてみましょう。

ブラウザで以下の操作を試してみてください。
任意のTodo項目の「削除」ボタンをクリックして、その項目が一覧から消えることを確認してください。

また、削除された項目は一覧から完全に削除され、他のTodo項目の表示に影響しないことを確認してください。

![スクリーンショット](/img/react/todo_app_todo_delete_test_before.png)

![スクリーンショット](/img/react/todo_app_todo_delete_test_after.png)

## 削除確認ダイアログの追加

### 誤削除防止のための確認機能

現在の実装では、削除ボタンをクリックするとすぐにTodoが削除されてしまいます。

誤って削除してしまうことを防ぐため、削除前に確認ダイアログを表示するようにしましょう。

`src/TodoItem.jsx`を以下のように修正してください。

```jsx
// src/TodoItem.jsx
function TodoItem({ todo, onDeleteTodo }) {
  // 削除ボタンのクリック処理
  const handleDelete = () => {
    // 削除前に確認ダイアログを表示
    const isConfirmed = window.confirm(`「${todo.text}」を削除してもよろしいですか？`);

    if (isConfirmed) {
      onDeleteTodo(todo.id);
    }
  };

  return (
    <div className={`p-3 rounded shadow flex justify-between items-center ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      <div className="flex-1">
        <p className={`${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-800'
        }`}>
          {todo.text}
        </p>
        <p className="text-sm text-gray-500">
          状態: {todo.completed ? '✅ 完了' : '⏳ 未完了'}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

`window.confirm`は、ブラウザの標準的な確認ダイアログを表示するメソッドです。
ユーザーが「OK」をクリックすると`true`を、「キャンセル」をクリックすると`false`を返します。

削除メッセージには、削除対象のTodoのテキストを含めることで、ユーザーがどの項目を削除しようとしているかを明確にしています。

### 確認ダイアログのテスト

修正後のアプリで削除機能をテストしてみましょう。

削除ボタンをクリックすると、「『Todo項目名』を削除してもよろしいですか？」という確認ダイアログが表示されることを確認してください。

「OK」をクリックすると削除が実行され、「キャンセル」をクリックすると削除がキャンセルされることを確認してください。

![スクリーンショット](/img/react/todo_app_todo_delete_confirm.png)

## まとめ

本章では、Todo削除機能を実装しました。
学習できた内容は以下の通りです。

`filter`メソッドを使って配列から特定の要素を削除する方法を習得し、削除ボタンのUIデザインと適切な配置方法を学びました。
また、コンポーネント間でのイベントハンドリングとIDを使った削除処理を実装しました。

さらに、`window.confirm`を使った削除確認ダイアログの実装方法を理解し、誤操作を防ぐための安全な削除機能を作成しました。

これで、Todoアプリに追加と削除の基本機能が揃いました。
ユーザーは自由にTodoを追加し、不要になった項目を安全に削除できるようになっています。

次の章では、既存のTodo項目を編集する機能を実装していきます。
テキストの内容を変更できるようにして、より柔軟なTodo管理を可能にしていきましょう。
