---
title: Todo追加機能を実装しよう
nextjs:
  metadata:
    title: Todo追加機能を実装しよう
    description: ReactのuseStateとフォームを使ってTodoアプリに新しい項目を追加する機能を実装し、動的な状態管理の基本を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- useStateを使ってTodoデータを動的に管理する方法を理解する
- フォーム入力とStateを連携させる方法を習得する
- 新しいTodo項目を配列に追加する実装方法を学ぶ
- 一意なIDを生成してデータの整合性を保つ方法を理解する
- フォーム送信後の入力欄クリア処理を実装する

## はじめに

前章では、サンプルデータを使ってTodo一覧を表示する機能を実装しました。

しかし、現在のアプリはデータが固定されており、ユーザーが新しいTodoを追加することができません。

今回は、 **Todo追加機能** を実装して、ユーザーが自由にTodo項目を追加できるようにします。

これにより、静的なアプリから動的なアプリへと進化させることができます。

具体的には、入力フォームを作成し、 `useState` を使ってTodoデータを管理し、新しい項目を配列に追加する処理を実装していきます。

React における状態管理とフォーム処理の基本的なパターンを身につけることができる重要な章です。

## useStateでTodoデータを管理

### 静的データから動的データへの変更

まず、現在 `App.jsx` で定義している固定の `todos` 配列を、 `useState` を使って管理するように変更しましょう。

`src/App.jsx` を以下のように修正してください。

```jsx
// useStateをインポート
import { useState } from 'react';
import TodoList from './TodoList';

function App() {
  // 静的な配列をuseStateで管理するように変更
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

この変更により、 `todos` は React の状態として管理されるようになりました。

`setTodos` 関数を使用することで、後からTodoデータを更新できるようになります。

表示結果は以前と同じですが、内部的には状態管理の仕組みが導入されています。

### useState の動作確認

状態管理が正しく動作しているか確認するため、一時的にボタンを追加してテストしてみましょう。

`src/App.jsx` を以下のように修正します。

ここでは、`handleTest` 関数を追加して、現在の `todos` の状態をコンソールに出力するボタンを作成します。

```jsx
import { useState } from 'react';
import TodoList from './TodoList';

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

  // テスト用の関数を追加
  const handleTest = () => {
    console.log('現在のTodos:', todos);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        {/* テスト用ボタンを一時的に追加 */}
        <button
          onClick={handleTest}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          状態確認
        </button>

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

`npm run dev `でアプリを起動し、ブラウザで表示されたページに「状態確認」ボタンが追加されていることを確認してください。

また、ブラウザでボタンをクリックして、デベロッパーツールのコンソールにTodoデータが表示されることを確認してください。

![スクリーンショット](/img/react/todo_app_state_test.png)

ちなみに、コンソールでオブジェクト（データのかたまり）の中身を確認するには、右向きの三角形のアイコンをクリックして展開することができます。

## 入力フォームの作成

### TodoFormコンポーネントの作成

新しいTodoを追加するための入力フォームコンポーネントを作成しましょう。
`src`フォルダ内に`TodoForm.jsx`ファイルを作成してください。

```jsx
// src/TodoForm.jsx
import { useState } from 'react';

function TodoForm() {
  // 入力値を管理するState
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="mb-6">
      <form className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいTodoを入力してください"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          追加
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
```

このコンポーネントでは、入力値の管理に`useState`を使用しています。

`onChange`イベントでユーザーが入力欄に文字を入力するたびに、`setInputValue`を呼び出して状態を更新しています。

フォームのレイアウトには Flexbox を使って入力欄とボタンを横並びにし、入力欄は`flex-1`で残りのスペースを占めるようにしています。

### App.jsxでTodoFormを使用

作成したTodoFormコンポーネントを`App.jsx`で使用しましょう。

```jsx
import { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm'; // TodoFormをインポート

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        {/* 入力フォームを追加 */}
        <TodoForm />

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

ブラウザで確認すると、Todoアプリのタイトルの下に入力フォームが表示されているはずです。
入力欄に文字を入力してみて、正常に文字が表示されることを確認してください。

![スクリーンショット](/img/react/todo_app_form.png)

ただし、まだ「追加」ボタンを押しても何も起こりません。これは次のステップで実装していきます。

## Todo追加機能の実装

次に、入力フォームから新しいTodoを追加する機能を実装していきます。

### 一意なIDの生成

新しいTodoを追加する前に、各Todoに一意なIDを割り当てる仕組みを考える必要があります。

今回は、現在存在するTodoの中で最大のIDを取得し、それに1を加えた値を新しいIDとして使用します。

なぜ `1` を加えるかというと、IDは1から始まることが一般的だからです。

通常、配列の要素は `0` というインデックスから始まりますが、TodoのIDは `1` から始めることが多いので、配列が空の場合でも1を返すようにしておきます。

まず、ID生成のためのヘルパー関数を`App.jsx`に追加しましょう。

ヘルパー関数とは、特定の処理を簡潔に行うための補助的な関数のことです。

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

  // 新しいIDを生成する関数
  const generateNewId = () => {
    if (todos.length === 0) return 1;
    const maxId = Math.max(...todos.map(todo => todo.id));
    return maxId + 1;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm />

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

`generateNewId`関数では、まず配列が空の場合は1を返します。
配列に要素がある場合は、`Math.max`と`map`を組み合わせて最大のIDを取得し、それに1を加えた値を返します。

これを使って、新しいTodoを追加する際に一意なIDを生成できるようになります。

まだこの関数は使用していませんが、次のステップで実際にTodoを追加する処理を実装する際に利用します。

### Todo追加関数の実装

次に、新しいTodoを追加するための関数を実装しましょう。

`App.jsx`に以下のように`addTodo`関数を追加します。

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

  // 新しいTodoを追加する関数
  const addTodo = (text) => {
    const newTodo = {
      id: generateNewId(),
      text: text,
      completed: false
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm />

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

`addTodo`関数では、受け取ったテキストと生成されたIDを使って新しいTodoオブジェクトを作成します。
そして、スプレッド演算子（`...`）を使って、既存のTodos配列に新しいTodoを追加した新しい配列を作成し、`setTodos`で状態を更新します。

`[...todos, newTodo]`という記述により、既存のすべてのTodoに加えて、末尾に新しいTodoが追加された配列が作成されます。

### TodoFormコンポーネントとの連携

では、作成した`addTodo`関数をTodoFormコンポーネントで使用できるようにしましょう。

また、初期値を空の配列に変更して、最初はTodoが何も表示されないようにします。

```jsx
import { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([]); // 初期値を空の配列に変更

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        {/* addTodo関数をPropsとして渡す */}
        <TodoForm onAddTodo={addTodo} />

        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default App
```

ただし、`TodoForm`コンポーネントはまだ`onAddTodo`というPropsを受け取るように定義されていません。

そこで、`TodoForm.jsx`を修正して、親コンポーネントから渡された`onAddTodo`関数を使用できるようにします。

## フォーム送信処理の実装

### TodoFormコンポーネントの更新

次に、`TodoForm.jsx`を修正して、フォーム送信時に実際にTodoが追加されるようにしましょう。

```jsx
// src/TodoForm.jsx
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // ページのリロードを防ぐ

    // 入力値が空の場合は何もしない
    if (inputValue.trim() === '') {
      return;
    }

    // 親コンポーネントのaddTodo関数を呼び出す
    onAddTodo(inputValue.trim());

    // 入力欄をクリア
    setInputValue('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいTodoを入力してください"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          追加
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
```

このコンポーネントの更新では、まず`{ onAddTodo }`として親コンポーネントから渡された追加関数を受け取ります。
そして、`handleSubmit`関数でフォーム送信時の処理を定義しています。

また、`e.preventDefault()`により、フォーム送信時のページリロードを防いでいます。

さらに、`trim()`メソッドで前後の空白を除去し、空の入力の場合は処理を中断します。
実際のアプリではこういった入力値の検証が重要です。

さらに、Todo追加後には`setInputValue('')`で入力欄を空にして、次の入力に備えます。
これにより、ユーザーは新しいTodoを追加した後、すぐに次の入力ができるようになります。

## 動作確認とテスト

### 基本的な追加機能のテスト

ここまでの実装が完了したら、実際にTodo追加機能をテストしてみましょう。

サーバを起動して、ブラウザでアプリを開きます。

```bash
npm run dev
```

初期状態ではTodoが何も表示されていないはずです。

![スクリーンショット](/img/react/todo_app_empty.png)

まず入力欄に「新しいタスク」と入力して、「追加」ボタンをクリックします。

新しいTodoが一覧の最後に追加され、入力欄が空になることを確認してください。

![スクリーンショット](/img/react/todo_app_add_test.png)

正常に動作していれば、新しいTodo項目が白い背景で一覧に表示され、「⏳ 未完了」の状態になっているはずです。

### エンターキーでの送信テスト

HTML フォームの標準的な動作として、入力欄でエンターキーを押してもフォームが送信されます。

入力欄に別のタスクを入力して、エンターキーを押してみてください。
ボタンクリックとエンターキー、どちらの方法でも正常にTodoが追加されることを確認してください。

### 空の入力に対する検証テスト

入力値の検証機能もテストしましょう。

入力欄を空のままで「追加」ボタンをクリックして、何も追加されないことを確認してください。
また、空白のみ（スペースキーのみ）を入力して送信しても、何も追加されないことを確認してください。

これらのテストにより、不正な入力が適切に除外されることを確認できます。

## 複数のTodo追加テスト

### 連続追加のテスト

Todo追加機能の安定性を確認するため、複数のTodoを連続で追加してみましょう。

「TypeScriptを学習する」「コンポーネント設計を復習する」「API連携の方法を調べる」など、複数の Todoを順番に追加してみてください。

各Todoが順次追加され、IDが連続して割り当てられていることを確認してください。

![スクリーンショット](/img/react/todo_app_multiple_add.png)

### IDの一意性確認

追加されたTodoのIDが正しく生成されているか、ブラウザの開発者ツールで確認してみましょう。

`App.jsx`に一時的にログ出力を追加します。

```jsx
const addTodo = (text) => {
  const newTodo = {
    id: generateNewId(),
    text: text,
    completed: false
  };

  // ログ出力を追加
  console.log('新しいTodo:', newTodo);
  console.log('更新後のTodos数:', todos.length + 1);
  // 追加ここまで

  setTodos([...todos, newTodo]);
};
```

Todoを追加するたびに、コンソールで新しいTodoの情報と配列の長さが表示されることを確認してください。

![スクリーンショット](/img/react/todo_app_console_log.png)

確認が終わったら、ログ出力は削除しておきましょう。

## エラーハンドリングの強化

### より堅牢な入力検証

現在の実装をより堅牢にするため、入力検証を強化してみましょう。

`TodoForm.jsx`を以下のように修正してください。

```jsx
// src/TodoForm.jsx
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // より詳細な入力検証
    const trimmedValue = inputValue.trim();

    // 空文字やスペースのみの場合
    if (trimmedValue === '') {
      console.log('入力が空です');
      return;
    }

    // 文字数制限（例：100文字まで）
    if (trimmedValue.length > 100) {
      return;
    }

    onAddTodo(trimmedValue);
    setInputValue('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいTodoを入力してください"
          maxLength={100} // HTML側でも制限
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          追加
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
```

この修正により、100文字を超える入力を防ぐ文字数制限が追加されました。

また、`maxLength`属性により、入力欄での文字数制限もHTML側で設定されます。

これにより、ユーザーが長すぎる入力を行うことを防ぎ、アプリの安定性を向上させます。

## 処理の流れのおさらい

では、ここまでの実装を振り返って、Todo追加機能の処理の流れをおさらいしましょう。

1. **状態管理**: `useState`を使って、Todoデータを配列として管理
2. **フォームコンポーネント**: `TodoForm`コンポーネントを作成し、ユーザーが新しいTodoを入力できるようにする
3. **ID生成**: `generateNewId`関数で一意なIDを生成
4. **Todo追加関数**: `addTodo`関数で新しいTodoを配列に追加
5. **フォーム送信処理**: `handleSubmit`関数でフォーム送信時の処理を定義し、入力値を検証
6. **入力値のクリア**: Todo追加後に入力欄を空にして、次の入力ができるようにする
7. **エラーハンドリング**: 入力値の検証を強化し、空の入力や文字数制限を設ける

一気に実装したように見えますが、これらのステップを順番に実装していくことで、Reactの基本的な状態管理とフォーム処理の流れを理解することができました。

## まとめ

本章では、Todo追加機能を実装しました。
学習できた内容は以下の通りです。

`useState`を使って配列データを動的に管理する方法を習得し、フォーム入力と状態管理を連携させる基本的なパターンを学びました。
また、スプレッド演算子を使って配列に新しい要素を追加する方法を理解し、一意なIDを生成してデータの整合性を保つ方法を実装しました。

さらに、フォーム送信処理と入力値の検証方法を習得し、コンポーネント間でのデータの受け渡しとイベントハンドリングを実践しました。

これで、Todoアプリに動的にTodoを追加できるようになりました。
ユーザーが自分でタスクを登録できる、より実用的なアプリケーションに進化しています。

次の章では、追加したTodoを削除する機能を実装していきます。
配列から特定の要素を削除する方法と、ユーザーインターフェースでの削除操作について学んでいきましょう。
