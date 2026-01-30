---
title: Todo編集機能を実装しよう
nextjs:
  metadata:
    title: Todo編集機能を実装しよう
    description: ReactでTodo項目のテキストを編集する機能を実装し、インライン編集とstate更新による配列要素の変更方法を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- 配列内の特定の要素を更新する方法を理解する
- インライン編集UIの実装方法を習得する
- 編集モードと表示モードの切り替え方法を学ぶ
- mapメソッドを使った配列要素の更新処理を理解する
- フォーム送信とキャンセル処理の実装方法を習得する

## はじめに

前章では、Todoの削除機能を実装しました。

これで追加と削除ができるようになりましたが、一度作成したTodoの内容を修正することができません。

今回は、 **Todo編集機能** を実装して、既存のTodo項目のテキストを変更できるようにします。

これにより、タスクの内容を後から調整したり、より詳細な説明に変更したりできるようになります。

具体的には、Todo項目をクリックすると編集モードに切り替わり、その場でテキストを編集できるインライン編集機能を実装していきます。

編集完了後は、 `map` メソッドを使って配列内の特定の要素を更新する処理も学習します。

## 編集モードの状態管理

### TodoItemコンポーネントの編集状態

まず、各Todo項目が編集モードかどうかを管理する状態を追加しましょう。

`src/TodoItem.jsx` を以下のように修正してください。

```jsx
// src/TodoItem.jsx
import { useState } from 'react';

function TodoItem({ todo, onDeleteTodo }) {
  // 編集モードの状態を管理
  const [isEditing, setIsEditing] = useState(false);
  // 編集中のテキストを管理
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
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

ここでは、 `useState` を使って2つの新しい状態を追加しています。

まず`isEditing` は、そのTodo項目が現在編集モードかどうかを表すboolean値です。

そして`editText` は、編集中のテキストを一時的に保存するための状態です。

初期値として、 `editText` には元のTodoのテキスト（ `todo.text` ）を設定しています。

## 編集モードの表示切り替え

### 表示モードと編集モードのUI

次に、編集モードの時は入力フォームを、通常時はテキストを表示するように切り替え処理を実装しましょう。

`src/TodoItem.jsx` を以下のように修正します。

```jsx
// src/TodoItem.jsx
import { useState } from 'react';

function TodoItem({ todo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    const isConfirmed = window.confirm(`「${todo.text}」を削除してもよろしいですか？`);

    if (isConfirmed) {
      onDeleteTodo(todo.id);
    }
  };

  // 編集モード開始
  const handleEditStart = () => {
    setIsEditing(true);
  };

  return (
    <div className={`p-3 rounded shadow flex justify-between items-center ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      <div className="flex-1">
        {isEditing ? (
          // 編集モード：入力フォームを表示
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        ) : (
          // 表示モード：テキストとクリックイベントを表示
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
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

この実装では、`isEditing`の値に応じてUIを切り替えています。

編集モードの時は、`input`要素を表示して、ユーザーがテキストを編集できるようにしています。
表示モードの時は、テキスト部分をクリックできるようにして、クリックすると`handleEditStart`関数が呼ばれて編集モードに切り替わります。

`cursor-pointer`クラスにより、テキスト部分にマウスを合わせるとカーソルがポインターに変わり、クリックできることがユーザーに分かります。

ブラウザで確認すると、Todo項目のテキスト部分をクリックすると入力フィールドに切り替わることを確認できます。

![スクリーンショット](/img/react/todo_app_edit_mode.png)

## 編集の保存とキャンセル処理

### 編集完了とキャンセルの実装

現在は編集モードに入ることはできますが、編集を保存したりキャンセルしたりする方法がありません。
これらの機能を追加しましょう。

```jsx
// src/TodoItem.jsx
import { useState } from 'react';

function TodoItem({ todo, onDeleteTodo }) {
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

  // 編集をキャンセル
  const handleEditCancel = () => {
    setEditText(todo.text); // 元のテキストに戻す
    setIsEditing(false);
  };

  // 編集を保存（一時的な処理）
  const handleEditSave = () => {
    if (editText.trim() === '') {
      return; // 空の場合は保存しない
    }

    // 後ほどここで実際の更新処理を行う
    console.log('保存するテキスト:', editText);
    setIsEditing(false);
  };

  // Enterキーで保存、Escapeキーでキャンセル
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className={`p-3 rounded shadow flex justify-between items-center ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
      <div className="flex-1">
        {isEditing ? (
          // 編集モード：入力フォームとボタンを表示
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
          // 表示モード：テキストとクリックイベントを表示
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
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

この実装では、編集モード時に保存ボタンとキャンセルボタンを追加しています。

`handleEditCancel`関数では、編集中のテキストを元の値に戻してから編集モードを終了します。
`handleEditSave`関数では、空のテキストでないことを確認してから保存処理を行います（現在はログ出力のみ）。

また、`handleKeyDown`関数により、Enterキーで保存、Escapeキーでキャンセルができるようになっています。
`autoFocus`属性により、編集モードに入ると自動的に入力フィールドにフォーカスが移ります。

![スクリーンショット](/img/react/todo_app_edit_save_cancel.png)

ただし、まだ保存処理は実装されていません。

次は、実際にTodoのテキストを更新する処理を実装していきます。

## Todo更新機能の実装

ここでは、以下の順序でTodoの更新機能を実装していきます。

1. Todoの更新関数を`App.jsx`に追加
2. TodoListコンポーネントに更新関数を渡す
3. TodoItemコンポーネントで更新処理を実装

### App.jsxに更新関数を追加

実際にTodoのテキストを更新する処理を`App.jsx`に実装しましょう。

`src/App.jsx`を以下のように修正します。

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

  // Todo更新関数を追加
  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
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

        <TodoList todos={todos} onDeleteTodo={deleteTodo} />
      </div>
    </div>
  )
}

export default App
```

`updateTodo`関数では、`map`メソッドを使って配列内の特定の要素を更新しています。

`map`メソッドは各要素に対して処理を行い、新しい配列を返します。
更新対象のIDと一致する場合は、スプレッド演算子（`...todo`）で既存のプロパティをコピーしつつ、`text`プロパティだけを新しい値に更新しています。
一致しない場合は、元のTodoオブジェクトをそのまま返します。

### TodoListコンポーネントに更新関数を渡す

作成した更新関数をTodoListコンポーネントを通じてTodoItemコンポーネントまで渡しましょう。

まず、`App.jsx`でTodoListに更新関数を渡します。

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm onAddTodo={addTodo} />

        {/* 更新関数をPropsとして渡す */}
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

### TodoListコンポーネントの更新

次に、`src/TodoList.jsx`を修正して、更新関数をTodoItemコンポーネントに渡します。

```jsx
// src/TodoList.jsx
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo, onUpdateTodo }) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo} // 更新関数を渡す
        />
      ))}
    </div>
  );
}

export default TodoList;
```

### TodoItemコンポーネントでの更新処理

最後に、`src/TodoItem.jsx`を修正して、実際に更新処理を呼び出すようにしましょう。

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

  // 編集を保存
  const handleEditSave = () => {
    if (editText.trim() === '') {
      return;
    }

    // 実際の更新処理を呼び出す
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
    <div className={`p-3 rounded shadow flex justify-between items-center ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
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
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}

export default TodoItem;
```

`handleEditSave`関数で、親コンポーネントから受け取った`onUpdateTodo`関数を呼び出し、TodoのIDと新しいテキストを引数として渡しています。

これで、編集機能が完全に動作するようになります。

## 動作確認とテスト

### 基本的な編集機能のテスト

ここまでの実装が完了したら、実際に編集機能をテストしてみましょう。

ブラウザで以下の操作を試してみてください。

まず、任意のTodo項目のテキスト部分をクリックして、編集モードに切り替わることを確認してください。

入力フィールドでテキストを変更して、「保存」ボタンをクリックまたはEnterキーを押して、変更が反映されることを確認してください。

![スクリーンショット](/img/react/todo_app_edit_test_before.png)

![スクリーンショット](/img/react/todo_app_edit_test_after.png)

### キャンセル機能のテスト

編集途中でキャンセルする機能もテストしてみましょう。

Todo項目を編集モードにして、テキストを変更してから「キャンセル」ボタンをクリックまたはEscapeキーを押してください。
変更がキャンセルされて、元のテキストに戻ることを確認してください。

### 複数項目の編集テスト

複数のTodo項目を順番に編集してみて、それぞれ独立して編集できることを確認してください。

各Todo項目の編集状態は個別に管理されているため、1つの項目を編集中でも他の項目をクリックして別の編集を開始できることを確認してください。

これは、ちゃんと編集対象のTodo項目ごとに状態が管理されていることを意味します。

## まとめ

本章では、Todo編集機能を実装しました。
学習できた内容は以下の通りです。

インライン編集UIの実装方法を習得し、編集モードと表示モードの切り替え処理を学びました。
また、`map`メソッドを使って配列内の特定の要素を更新する方法を理解しました。

さらに、キーボードイベント（EnterキーとEscapeキー）を使った操作性の向上や、`autoFocus`を使ったユーザビリティの改善も実装しました。
コンポーネント間での関数の受け渡しにより、編集処理を適切に分離できました。

これで、Todoアプリに追加・削除・編集の主要な機能が揃いました。
ユーザーは自由にTodoを管理できる、実用的なアプリケーションになっています。

次の章では、Todo項目の完了・未完了を切り替える機能を実装していきます。
チェックボックスを使った直感的な操作で、タスクの進捗管理ができるようにしていきましょう。
