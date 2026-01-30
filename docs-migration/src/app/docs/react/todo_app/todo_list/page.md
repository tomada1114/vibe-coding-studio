---
title: Todo一覧表示機能を実装しよう
nextjs:
  metadata:
    title: Todo一覧表示機能を実装しよう
    description: ReactでTodo項目を配列データから一覧表示する機能を実装し、mapメソッドとコンポーネントの基本的な使い方を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- 配列データをReactコンポーネントで一覧表示する方法を理解する
- mapメソッドを使ったJSXでの繰り返し処理を習得する
- keyプロパティの重要性とその役割を学ぶ
- TodoListとTodoItemコンポーネントの作成方法を理解する
- Tailwind CSSを使ったTodo一覧のスタイリング方法を習得する

## はじめに

前章でTodoアプリの設計と準備が完了しました。

今回は、いよいよ実際の機能実装に入っていきます。

最初に実装するのは、 **Todo一覧表示機能** です。

これは、配列に保存されているTodoデータを画面に表示する機能で、Todoアプリの基盤となる重要な部分です。

まずはサンプルデータを使って、どのようにTodo項目が表示されるかを確認していきましょう。

React では、配列のデータを一覧表示する際に `map` メソッドを使用するのが一般的です。

この章を通じて、データの一覧表示という基本的だが重要な機能を身につけることができます。

## サンプルTodoデータの準備

### App.jsxにサンプルデータを追加

まず、表示するためのサンプルTodoデータを準備しましょう。

`src/App.jsx` ファイルを開いて、以下のようにコードを修正してください。

```jsx
function App() {
  // サンプルTodoデータを準備
  const todos = [
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>
        {/* ここにTodo一覧を表示する予定 */}
      </div>
    </div>
  )
}

export default App
```

ここで作成した `todos` 配列は、前章で設計したデータ構造に従っています。

各Todo項目には `id` 、 `text` 、 `completed` の3つのプロパティが含まれています。

3つ目のTodoは `completed: true` になっていることに注目してください。

これにより、完了済みと未完了のTodoが混在した状態を再現できます。


### データ構造の確認

サンプルデータがブラウザのコンソールで確認できるように、一度ログ出力してみましょう。

```jsx
function App() {
  const todos = [
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

  // データ構造を確認
  console.log('Todo データ:', todos);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>
        {/* ここにTodo一覧を表示する予定 */}
      </div>
    </div>
  )
}

export default App
```

では、サーバーを起動して、ブラウザでアプリを確認してみましょう。

```bash
npm run dev
```

でフォルトでは、おそらく `http://localhost:5173/` というURLでアプリが表示されます。

```bash
  VITE v6.3.5  ready in 292 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

ブラウザの開発者ツールを開いて、コンソールタブを確認してみてください。
配列データが正しく表示されていることを確認できるはずです。

![スクリーンショット](/img/react/todo_app_dummy_data_confirm.png)

## mapメソッドでTodo一覧を表示

### 基本的な一覧表示

それでは、実際に配列データを画面に表示してみましょう。
React では、配列の各要素をJSX要素に変換する際に`map`メソッドを使用します。

```jsx
function App() {
  const todos = [
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        {/* Todo一覧を表示 */}
        <div className="space-y-2">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white p-3 rounded shadow">
              <p className="text-gray-800">{todo.text}</p>
              <p className="text-sm text-gray-500">
                状態: {todo.completed ? '完了' : '未完了'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
```

ブラウザで確認すると、3つのTodo項目が縦に並んで表示されているはずです。
各項目には白い背景がついており、テキスト内容と完了状態が表示されています。

![Todo一覧表示の結果](/img/react/todo_list_display_result.png)

### mapメソッドの動作解説

今回は、`map`メソッドを使って、`todos`配列の各要素をJSX要素に変換しています。

```jsx
{todos.map((todo) => (
  <div key={todo.id} className="bg-white p-3 rounded shadow">
    <p className="text-gray-800">{todo.text}</p>
    <p className="text-sm text-gray-500">
      状態: {todo.completed ? '完了' : '未完了'}
    </p>
  </div>
))}
```

`map` はReactではよく使われますので、詳しく説明しておきましょう。

まず `{todos.map((todo) => (...))}` という記述では、`todos`配列の各要素に対して関数を実行し、JSX要素を生成しています。

`map`メソッドは新しい配列を返すメソッドです。
この場合、元の配列の各Todo項目を、対応するJSX要素に変換した新しい配列が生成されます。

```js
// map メソッドのおさらい
[1, 2, 3].map((num) => num * 2);
// 結果: [2, 4, 6]
```

`(todo) => (...)`の`todo`は、配列の各要素（Todo項目のオブジェクト）を表しています。

そのため、`todo.text`や`todo.completed`でそれぞれのプロパティにアクセスできます。

### keyプロパティの重要性

上記のコードで`key={todo.id}`という部分があることに注目してください。

```jsx
<div key={todo.id} className="bg-white p-3 rounded shadow">
```

これは React において大事なポイントです。

React は、配列から生成された要素を効率的に管理するために、各要素に一意の`key`プロパティを要求します。
`key`がないと、ブラウザのコンソールに警告が表示されます。

試しに、一時的に`key`を削除してみてください。

```jsx
<div className="bg-white p-3 rounded shadow">
```

すると、ブラウザのコンソールに以下のような警告が表示されます。

```jsx
@react-refresh:228 Each child in a list should have a unique "key" prop.
```

なぜ`key`が必要かというと、React が要素の変更を追跡しやすくするためです。
`key`を設定することで、要素の追加、削除、並び替えなどの操作が効率的に行えるようになります。

逆にいうと、`key`を設定しないと、Reactはどの要素が変更されたのかを正確に把握できず、パフォーマンスが低下したり、意図しない挙動を引き起こす可能性があります。

また、`key`には、各要素を一意に識別できる値を指定します。

今回は各Todo項目の`id`を使用しているため、`key={todo.id}`としています。

では、`key`をもとに戻しておきましょう。

```jsx
<div key={todo.id} className="bg-white p-3 rounded shadow">
```

## TodoItemコンポーネントの作成

### コンポーネントファイルの作成

現在はApp.jsxの中ですべてを書いていますが、コードが読みやすくなるように、Todo項目の表示部分を別のコンポーネントに分離しましょう。

`src`フォルダ内に新しいファイル`TodoItem.jsx`を作成してください。

これは Todo項目「1つ分」を表示するためのコンポーネントです。

```jsx
// src/TodoItem.jsx
function TodoItem({ todo }) {
  return (
    <div className="bg-white p-3 rounded shadow">
      <p className="text-gray-800">{todo.text}</p>
      <p className="text-sm text-gray-500">
        状態: {todo.completed ? '完了' : '未完了'}
      </p>
    </div>
  );
}

export default TodoItem;
```

このコンポーネントは、Propsとして`todo`オブジェクトを受け取り、その内容を表示します。
`{ todo }`という記述は、Propsから`todo`プロパティを取り出すための分割代入です。

後ほど、Props として渡される `todo` オブジェクトには、`id`、`text`、`completed` の3つのプロパティが含まれています。

### App.jsxでTodoItemコンポーネントを使用

次に、`App.jsx`でこの新しいコンポーネントをインポートして使用しましょう。

```jsx
// TodoItemコンポーネントをインポート
import TodoItem from './TodoItem';

function App() {
  const todos = [
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
```

ブラウザで確認すると、表示結果は以前と同じなはずです。

![Todo一覧表示の結果](/img/react/todo_list_display_result.png)

このように、見た目や機能は変えずに、コードを分割することで、より読みやすく、管理しやすい構造になりました。

こういったコンポーネント分割は、Reactの大きな特徴の一つで、コードの再利用性や保守性を高めるために非常に有効です。

## TodoListコンポーネントの作成

### より細かい役割分割

さらにコンポーネントを整理して、Todo一覧の管理部分も別のコンポーネントに分離してみましょう。
`src`フォルダ内に`TodoList.jsx`ファイルを作成してください。

```jsx
// src/TodoList.jsx
import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
```

このコンポーネントは、`todos`配列を受け取り、各TodoItemコンポーネントを表示します。
一覧表示のロジックがこのコンポーネントに集約されるため、非常にすっきりしています。

先ほどは `App.jsx`の中で直接`map`メソッドを使っていましたが、これでTodoの一覧表示部分が独立したコンポーネントになりました。

`App.jsx` はメインコンポーネントと呼ばれ、アプリ全体のレイアウトやデータの準備を担当するものです。

そのため、できるだけシンプルに保ち、具体的な表示ロジックは他のコンポーネントに委譲（役割を分けるように）するのが良い設計です。

### App.jsxの最終的な形

最後に、`App.jsx`でTodoListコンポーネントを使用するように修正しましょう。

```jsx
// TodoListコンポーネントをインポート
import TodoList from './TodoList';

function App() {
  const todos = [
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

これで、App コンポーネントは非常にシンプルになりました。
データの準備とレイアウトの管理に集中し、一覧表示の詳細は TodoList コンポーネントに委譲しています。

## 完了状態に応じたスタイリング

### 完了済みTodoの視覚的区別

現在の表示では、完了済みのTodoと未完了のTodoがテキストでしか区別できません。
視覚的に分かりやすくするため、完了済みのTodoには異なるスタイルを適用してみましょう。

`TodoItem.jsx`を以下のように修正してください。

```jsx
// src/TodoItem.jsx
function TodoItem({ todo }) {
  return (
    <div className={`p-3 rounded shadow ${
      todo.completed
        ? 'bg-green-50 border border-green-200'
        : 'bg-white'
    }`}>
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
  );
}

export default TodoItem;
```

このコードでは、`todo.completed`の値によって異なるCSSクラスを適用しています。

#### 完了済みの場合
- 背景色を薄い緑色（`bg-green-50`）に変更
- 緑色の境界線（`border-green-200`）を追加
- テキストに取り消し線（`line-through`）を適用
- テキスト色を薄いグレー（`text-gray-500`）に変更

#### 未完了の場合
- 白い背景（`bg-white`）を維持
- 通常のテキスト色（`text-gray-800`）を維持

### テンプレートリテラルを使った条件付きクラス

上記のコードで使用している `` `p-3 rounded shadow ${...}` `` という記述は、テンプレートリテラルと呼ばれる JavaScript の記法です。

この記法を使うことで、基本的なクラス（`p-3 rounded shadow`）に加えて、条件に応じた追加クラスを動的に適用できます。

```jsx
className={`基本クラス ${条件 ? 'True時のクラス' : 'False時のクラス'}`}
```

これにより、Todoの完了状態に応じて見た目を動的に変更できるようになります。

## 動作確認と表示結果

### ブラウザでの確認

ここまでの実装が完了したら、ブラウザで結果を確認してみましょう。

以下のようなTodo一覧が表示されているはずです。

1. **「Reactの基礎を学ぶ」** - 白い背景、通常のテキスト、「⏳ 未完了」
2. **「Todoアプリを作成する」** - 白い背景、通常のテキスト、「⏳ 未完了」
3. **「JavaScriptの復習をする」** - 薄い緑の背景、取り消し線付きテキスト、「✅ 完了」

![Todo一覧表示の結果](/img/react/todo-list-display-result.png)

3番目のTodoだけ見た目が異なり、完了済みであることが一目で分かるようになっています。

![Todo一覧表示の結果](/img/react/todo-list-display-result.png)

### コンソールでのエラーチェック

ブラウザの開発者ツールでコンソールを確認し、エラーや警告が表示されていないことを確認してください。

特に、`key`プロパティが適切に設定されていれば、React関連の警告は表示されないはずです。

## データの変更テスト

### サンプルデータの追加

Todo一覧表示機能が正しく動作するか確認するため、サンプルデータを追加してみましょう。

`App.jsx`の`todos`配列に新しい項目を追加してください。

```jsx
const todos = [
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
  },
  // 新しいTodoを追加
  {
    id: 4,
    text: "Tailwind CSSでスタイリング",
    completed: false
  },
  {
    id: 5,
    text: "コンポーネント設計を学ぶ",
    completed: true
  }
];
```

ブラウザで確認すると、新しく追加した2つのTodo項目も一覧に表示されているはずです。

![Todo一覧表示の結果](/img/react/todo-list-display-result-added.png)

### 完了状態の変更テスト

完了状態による表示の違いをより確認するため、既存のTodoの`completed`値を変更してみましょう。

```jsx
const todos = [
  {
    id: 1,
    text: "Reactの基礎を学ぶ",
    completed: true // falseからtrueに変更
  },
  {
    id: 2,
    text: "Todoアプリを作成する",
    completed: false
  },
  // ... 他のTodo項目
];
```

1番目のTodoの表示が、緑の背景と取り消し線付きテキストに変わることを確認してください。

これにより、`completed`プロパティの値が正しく表示に反映されていることが分かります。

## まとめ

本章では、Todo一覧表示機能を実装しました。
学習できた内容は以下の通りです。

- `map`メソッドを使って配列データをJSXの一覧表示に変換する方法を習得しました
- `key`プロパティの重要性を理解し、各リスト項目に一意のキーを設定する方法を学びました
- TodoItem と TodoList という2つのコンポーネントを作成し、適切な役割分割を実践しました
- Propsを使ってコンポーネント間でデータを受け渡す方法を復習しました
- 条件付きスタイリングを使って、Todoの完了状態を視覚的に表現する方法を習得しました

これで、Todoアプリの基本的な表示機能が完成しました。
静的なデータではありますが、複数のTodo項目を適切に一覧表示できるようになりました。

次の章では、この一覧に新しいTodoを追加する機能を実装していきます。
フォーム入力と`useState`を組み合わせて、動的にTodoを管理できるようにしていきましょう。
