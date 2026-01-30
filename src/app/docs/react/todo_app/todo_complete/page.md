---
title: Todo完了機能を実装しよう
nextjs:
  metadata:
    title: Todo完了機能を実装しよう
    description: ReactでTodo項目の完了・未完了を切り替える機能を実装し、チェックボックスを使った直感的な操作とboolean値の更新方法を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- チェックボックスを使ったboolean値の切り替え方法を理解する
- 配列内のオブジェクトの特定プロパティを更新する方法を習得する
- 完了状態に応じた視覚的なフィードバックの実装方法を学ぶ
- onChange イベントを使った状態変更処理を理解する
- 条件分岐による動的なスタイリングの応用を習得する

## はじめに

前章では、Todo項目のテキストを編集する機能を実装しました。

これで追加・削除・編集ができるようになりましたが、Todoアプリとして最も重要な「タスクの完了・未完了を管理する」機能がまだありません。

今回は、 **Todo完了機能** を実装して、ユーザーがチェックボックスをクリックするだけで簡単にタスクの完了状態を切り替えられるようにします。

これにより、Todoアプリの基本的な機能が完成します。

具体的には、各Todo項目にチェックボックスを追加し、チェックボックスの状態とTodoの `completed` プロパティを連動させる処理を実装していきます。

チェックボックスの操作は直感的で、多くのユーザーが慣れ親しんだ操作方法です。

## チェックボックスUIの追加

### TodoItemコンポーネントにチェックボックスを追加

まず、各Todo項目にチェックボックスを追加しましょう。

`src/TodoItem.jsx` を以下のように修正してください。

```jsx
// src/TodoItem.jsx
import { useState } from 'react';

function TodoItem({ todo, onDeleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    const isConfirmed = window.confirm(`「${todo.text}」を削除してもよろしいですか？`);

    if (isConfirmed) {
      onDeleteTodo(todo.id);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleEditSave = () => {
    if (editText.trim() === '') {
      return;
    }

    onUpdateTodo(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className={`p-3 rounded shadow flex items-center gap-3 ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      {/* チェックボックスを追加 */}
      <input
        type="checkbox"
        checked={todo.completed}
        className="w-5 h-5"
      />

      <div className="flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleEditSave}
              className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              保存
            </button>
            <button
              onClick={handleEditCancel}
              className="px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <div onClick={handleEditStart} className="cursor-pointer">
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
        )}
      </div>

      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

この修正では、チェックボックスを Todo項目の左端に追加しています。

チェックボックスの `checked` 属性には `todo.completed` を設定することで、Todoの完了状態とチェックボックスの状態が連動します。

また、レイアウトを `flex items-center gap-3` に変更して、チェックボックス、テキスト部分、削除ボタンが横並びで適切な間隔で配置されるようにしています。

ブラウザで確認すると、各Todo項目の左側にチェックボックスが表示され、完了済みのTodoはチェックが入った状態になっているはずです。

![スクリーンショット](/img/react/todo_app_checkbox.png)

## 完了状態の切り替え機能

### App.jsxに完了切り替え関数を追加

チェックボックスをクリックした時にTodoの完了状態を切り替える処理を `App.jsx` に実装しましょう。

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

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  // Todo完了状態切り替え関数を追加
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
        />
      </div>
    </div>
  )
}

export default App
```

`toggleTodo`関数では、`map`メソッドを使って指定されたIDのTodoの`completed`プロパティを反転させています。

また、`!todo.completed`により、`true`は`false`に、`false`は`true`に切り替わります。
これで、チェックボックスをクリックするたびに完了状態が切り替わることになります。

この `!todo.completed` の部分は、JavaScriptの論理否定演算子を使って、現在の完了状態を反転させるためのものです。
これにより、完了状態が切り替わるたびに新しい配列が生成され、`setTodos`で状態が更新されます。

Reactではよく使われるパターンで、配列内の特定のオブジェクトのプロパティを更新する際に非常に便利です。

### TodoListコンポーネントに切り替え関数を渡す

作成した切り替え関数をTodoListコンポーネントを通じてTodoItemコンポーネントまで渡しましょう。

まず、`App.jsx`でTodoListに切り替え関数を渡します。

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

        {/* 切り替え関数をPropsとして渡す */}
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

### TodoListコンポーネントの更新

次に、`src/TodoList.jsx`を修正して、切り替え関数をTodoItemコンポーネントに渡します。

```jsx
// src/TodoList.jsx
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo, onUpdateTodo, onToggleTodo }) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
```

### TodoItemコンポーネントでの切り替え処理

最後に、`src/TodoItem.jsx`を修正して、チェックボックスのクリック時に切り替え処理を呼び出すようにしましょう。

```jsx
// src/TodoItem.jsx
import { useState } from 'react';

function TodoItem({ todo, onDeleteTodo, onUpdateTodo, onToggleTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    const isConfirmed = window.confirm(`「${todo.text}」を削除してもよろしいですか？`);

    if (isConfirmed) {
      onDeleteTodo(todo.id);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleEditSave = () => {
    if (editText.trim() === '') {
      return;
    }

    onUpdateTodo(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // チェックボックスの変更処理
  const handleToggle = () => {
    onToggleTodo(todo.id);
  };

  return (
    <div className={`p-3 rounded shadow flex items-center gap-3 ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      {/* onChange イベントを追加 */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5"
      />

      <div className="flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleEditSave}
              className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              保存
            </button>
            <button
              onClick={handleEditCancel}
              className="px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <div onClick={handleEditStart} className="cursor-pointer">
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
        )}
      </div>

      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

`handleToggle`関数では、親コンポーネントから受け取った`onToggleTodo`関数を呼び出し、TodoのIDを引数として渡しています。

チェックボックスに`onChange={handleToggle}`を追加することで、チェックボックスをクリックした時に切り替え処理が実行されます。

これで、完了機能が完全に動作するようになります。

## 動作確認とテスト

### 基本的な完了切り替えのテスト

ここまでの実装が完了したら、実際に完了機能をテストしてみましょう。

ブラウザで以下の操作を試してみてください。
未完了のTodo項目のチェックボックスをクリックして、チェックが入り、背景色が緑色に変わることを確認してください。

また、テキストに取り消し線が入り、状態表示が「✅ 完了」に変わることも確認してください。

![スクリーンショット](/img/react/todo_app_complete_test_checked.png)

### 完了から未完了への切り替えテスト

逆方向の切り替えもテストしてみましょう。

完了済みのTodo項目のチェックボックスをクリックして、チェックが外れ、背景色が白に戻ることを確認してください。

テキストの取り消し線が消えて、状態表示が「⏳ 未完了」に戻ることも確認してください。

![スクリーンショット](/img/react/todo_app_complete_test_unchecked.png)

### 複数項目の切り替えテスト

複数のTodo項目の完了状態を様々なパターンで切り替えてみて、それぞれ独立して動作することを確認してください。

新しいTodoを追加して、それが未完了状態で作成されることも確認してください。`

## まとめ

本章では、Todo完了機能を実装しました。
学習できた内容は以下の通りです。

チェックボックスを使ったboolean値の切り替え方法を習得し、`onChange`イベントを使った状態変更処理を学びました。
また、`map`メソッドを使って配列内のオブジェクトの特定プロパティを更新する方法を理解しました。

さらに、完了状態に応じた動的なスタイリングの応用と、`transition`クラスを使ったスムーズなアニメーション効果の実装も習得しました。
コンポーネント間での関数の受け渡しパターンも繰り返し練習できました。

これで、Todoアプリの基本的な機能（追加・削除・編集・完了切り替え）がすべて完成しました。
ユーザーは直感的な操作でタスクを管理できる、実用的なアプリケーションになっています。

次の章では、ブラウザを閉じてもデータが保持されるよう、localStorageを使ったデータの永続化機能を実装していきます。
これにより、より実用的なTodoアプリに仕上げていきましょう。
