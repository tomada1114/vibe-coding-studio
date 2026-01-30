---
title: よく使うReact Hooksを学ぼう
nextjs:
  metadata:
    title: よく使うReact Hooksを学ぼう
    description: Reactでよく使われるHooksの概要と基本的な使い方を学び、それぞれのHookがどのような場面で活用されるかを理解します。
---

## 学習の目標

本章では、以下の内容を学習します。

- React Hooksとは何かを理解する
- useContextによるグローバル状態管理の概念を学ぶ
- useReducerによる複雑な状態管理の基本を理解する
- useMemoによるパフォーマンス最適化の概念を学ぶ
- useCallbackによるコールバック最適化の基本を理解する
- 各Hookがどのような場面で使われるかを把握する

## はじめに

これまでに`useState`と`useEffect`という2つのHooksを学習してきました。しかし、Reactにはこれら以外にも便利なHooksがいくつか用意されています。

本章では、実際の開発でよく使われる4つのHooksについて、基本的な概念と使用場面を学習します。詳細な実装方法については今後の学習で深く掘り下げていきますが、まずはそれぞれのHooksが「何のために存在するのか」「どのような問題を解決するのか」を理解しましょう。

これらのHooksを知っておくことで、より効率的で保守性の高いReactアプリケーションを開発できるようになります。初心者の皆さんには少し難しく感じられるかもしれませんが、今は「こんな機能があるんだ」という理解で十分です。

今回は基本的に手は動かさず

## React Hooksとは

まず、**Hooks**について改めて理解しましょう。Hooksとは、Reactの機能を関数コンポーネントで使えるようにする特別な関数のことです。

これまでに使ってきた`useState`や`useEffect`も、実はHooksの一種です。名前に共通して`use`という接頭語が付いていることに気づくでしょう。これは、Reactの規約で、すべてのHooksは必ず`use`で始まる名前にするという決まりがあるからです。

Hooksは関数コンポーネントの中でのみ使用でき、条件分岐やループの中では使用できません。また、コンポーネントの状態やライフサイクルを管理するための重要な機能を提供してくれます。

Reactには多くのHooksが用意されていますが、実際の開発でよく使われるのは限られています。今回は、`useState`と`useEffect`に加えて、特に重要な4つのHooksについて学習していきます。

## useContext - グローバル状態管理

### Props Drillingという問題

通常、親コンポーネントから子コンポーネントにデータを渡すには、Propsを使用します。
しかし、コンポーネントの階層が深くなると、困った問題が発生します。

例えば、アプリケーションの最上位でユーザー情報を管理していて、それを深い階層にある子コンポーネントで使いたい場合を考えてみましょう。
その場合、中間にあるすべてのコンポーネントを経由してデータを渡す必要があります。

```jsx
// Props Drillingの例
function App() {
  const user = { name: "田中太郎" };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <div>こんにちは、{user.name}さん</div>;
}
```

この例では、`user`データが`App`から`UserMenu`まで4つのコンポーネントを経由して渡されています。
問題なのは、中間の`Header`と`Navigation`は実際には`user`データを使用していないにも関わらず、子コンポーネントのために受け渡しをしなければならないことです。

このような現象を**Props Drilling**と呼びます。
コンポーネントの階層が深くなればなるほど、この問題は深刻になります。
中間のコンポーネントがたくさんあると、データの流れを追跡するのが困難になり、コードの保守性が悪化してしまいます。

### useContextによる解決方法

`useContext`を使うと、この問題を解決できます。`useContext`は、コンポーネントツリー全体でデータを共有するための仕組みを提供してくれます。

```jsx
// useContextを使った例
import { createContext, useContext } from 'react';

// Contextを作成
const UserContext = createContext();

function App() {
  const user = { name: "田中太郎" };

  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

function Header() {
  return <Navigation />; // userをPropsで渡す必要がない
}

function Navigation() {
  return <UserMenu />; // userをPropsで渡す必要がない
}

function UserMenu() {
  const user = useContext(UserContext); // 直接データを取得
  return <div>こんにちは、{user.name}さん</div>;
}
```

この仕組みを使うと、中間のコンポーネントを経由することなく、必要な場所で直接データを取得できます。
`UserContext.Provider`で囲まれたコンポーネントツリー内であれば、どこからでも`useContext(UserContext)`を使ってデータにアクセスできるのです。

#### useContextの使用場面

`useContext`は、アプリケーション全体で共有したいデータがある場合に威力を発揮します。
例えば、ユーザーの認証情報、アプリケーションのテーマ設定、言語設定などがこれに該当します。

ただし、すべてのデータを`useContext`で管理すべきではありません。
頻繁に変更されるデータや、特定のコンポーネントでしか使わないデータについては、通常のPropsやStateを使った方が適切です。

## useReducer - 複雑な状態管理

#### useStateでは管理が困難なケース

`useState`は単純な状態管理には十分ですが、状態が複雑になってくると管理が困難になることがあります。
特に、複数の状態が相互に関連している場合や、状態の更新ロジックが複雑な場合には、`useState`だけでは対応が難しくなります。

例えば、ショッピングカートの機能を考えてみましょう。
カートには商品のリスト、合計金額、割引額、税額など、複数の状態が存在します。
そして、これらの状態は互いに関連しており、商品を追加すると合計金額も税額も同時に更新する必要があります。

```jsx
// useStateでは管理が困難な例
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
    // ここで、total、discount、taxも一緒に計算し直す必要がある
    // 複数のsetStateを正しい順序で呼ぶ必要があり、複雑になる
  };
}
```

このように複数の`useState`を組み合わせて使うと、状態の更新ロジックが複雑になり、バグが発生しやすくなります。
また、どの状態がどのタイミングで更新されるかを把握するのも困難になります。

#### useReducerによる整理

`useReducer`は、このような複雑な状態管理を整理するためのHookです。
状態の更新ロジックをコンポーネントから分離し、より予測可能な方法で状態を管理できるようになります。

```jsx
// useReducerを使った例
import { useReducer } from 'react';

// 状態の更新ロジックを定義
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItems = [...state.items, action.item];
      const newTotal = calculateTotal(newItems);
      return {
        ...state,
        items: newItems,
        total: newTotal,
        tax: newTotal * 0.1
      };
    case 'REMOVE_ITEM':
      // 削除のロジック
      break;
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    tax: 0
  });

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };
}
```

`useReducer`を使うと、状態の更新ロジックが`cartReducer`関数に集約されます。
この関数では、どのようなアクション（操作）が実行された時に、状態をどのように更新するかを明確に定義できます。

#### useReducerの利点

`useReducer`を使うことで、状態の更新が予測可能になり、テストもしやすくなります。
また、状態の更新ロジックが一箇所に集約されるため、バグが発生した際の原因究明も容易になります。

一般的には、3つ以上の関連する状態を管理する場合や、状態の更新ロジックが複雑な場合に`useReducer`の使用が検討されます。
フォームの入力状態管理や、ゲームの状態管理などでもよく使われています。

## useMemo - パフォーマンス最適化

#### 再レンダリングによる問題

Reactコンポーネントは、状態が変更されるたびに再レンダリングされます。
これはReactの重要な特徴の一つですが、時としてパフォーマンスの問題を引き起こすことがあります。

コンポーネントが再レンダリングされると、その内部で定義された計算処理もすべて再実行されます。
軽い計算であれば問題ありませんが、重い計算がある場合は、ユーザーの操作に対する反応が遅くなってしまいます。

```jsx
// パフォーマンスの問題がある例
function ProductList({ products, filter }) {
  // productsやfilterとは関係ない状態
  const [count, setCount] = useState(0);

  // 重い計算処理
  const expensiveCalculation = () => {
    console.log('重い計算を実行中...');
    return products.filter(product =>
      product.price > 1000
    ).length;
  };

  // countが変更されるたびに、重い計算も再実行される
  const expensiveResult = expensiveCalculation();

  return (
    <div>
      <p>高額商品数: {expensiveResult}</p>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

この例では、`count`が変更されるたびにコンポーネントが再レンダリングされ、その度に重い計算処理も実行されてしまいます。
しかし、この計算は`products`の内容にのみ依存しており、`count`とは全く関係ありません。

#### useMemoによる最適化

`useMemo`を使うと、計算結果をキャッシュして、依存する値が変更された時のみ再計算するようにできます。

```jsx
// useMemoを使った最適化
import { useMemo } from 'react';

function ProductList({ products, filter }) {
  const [count, setCount] = useState(0);

  // productsが変更された時のみ再計算される
  const expensiveResult = useMemo(() => {
    console.log('重い計算を実行中...');
    return products.filter(product =>
      product.price > 1000
    ).length;
  }, [products]); // productsが変更された時のみ再計算

  return (
    <div>
      <p>高額商品数: {expensiveResult}</p>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

`useMemo`を使うことで、`count`が変更されても重い計算は実行されず、`products`が変更された時のみ計算が実行されるようになります。
これにより、ユーザーの操作に対する反応が改善されます。

#### useMemoの適切な使用

ただし、すべての計算に`useMemo`を使用する必要はありません。
軽い計算の場合は、`useMemo`によるオーバーヘッドの方が大きくなることもあります。

`useMemo`は、大量のデータの計算処理、配列のフィルタリングやソート、複雑な数値計算など、明らかに重い処理に対してのみ使用することが推奨されています。

## useCallback - コールバック最適化

#### 関数の再作成による問題

関数コンポーネントでは、コンポーネントが再レンダリングされるたびに、内部で定義された関数も新しく作成されます。
これ自体は通常問題になりませんが、その関数を子コンポーネントにPropsとして渡している場合、子コンポーネントが不要な再レンダリングを起こすことがあります。

```jsx
// 不要な再レンダリングが発生する例
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // countやnameが変更されるたびに、新しい関数が作成される
  const handleClick = () => {
    console.log('ボタンがクリックされました');
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>

      {/* nameが変更されても、ChildComponentが再レンダリングされる */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  console.log('ChildComponentが再レンダリングされました');
  return <button onClick={onClick}>子コンポーネントのボタン</button>;
}
```

この例では、`name`の入力を変更するたびに`ParentComponent`が再レンダリングされ、`handleClick`関数も新しく作成されます。
Reactは、Propsが変更されたと判断して`ChildComponent`も再レンダリングしてしまいます。

しかし、実際には`handleClick`の内容は変わっていないため、この再レンダリングは不要です。

#### useCallbackによる最適化

`useCallback`を使うと、関数をキャッシュして、依存する値が変更された時のみ新しい関数を作成するようにできます。

```jsx
// useCallbackを使った最適化
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 依存配列が空なので、常に同じ関数インスタンスが使用される
  const handleClick = useCallback(() => {
    console.log('ボタンがクリックされました');
  }, []); // 依存する値がないので空配列

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>

      {/* nameが変更されても、ChildComponentは再レンダリングされない */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
}
```

`useCallback`を使うことで、`name`が変更されても`handleClick`関数は同じインスタンスのままになり、`ChildComponent`の不要な再レンダリングを防ぐことができます。

#### useCallbackの適切な使用

`useCallback`は、子コンポーネントにコールバック関数を渡す場合や、`useEffect`の依存配列に関数を含める場合などによく使用されます。

ただし、`useMemo`と同様に、すべての関数に`useCallback`を使用する必要はありません。
パフォーマンスの問題が実際に発生している場合にのみ使用することが推奨されています。

## Hooksを使う時の重要なルール

Hooksには、正しく動作させるためのルールがあります。
これらのルールを守らないと、予期しないエラーが発生したり、アプリケーションが正しく動作しなくなったりする可能性があります。

最も重要なルールは、**Hooksは関数コンポーネントの最上位でのみ呼び出す**ということです。
条件分岐やループの中でHooksを呼び出してはいけません。

```jsx
// ❌ 間違った例
function BadComponent({ showUser }) {
  if (showUser) {
    const [user, setUser] = useState(null); // 条件分岐の中でHook使用
  }

  for (let i = 0; i < 3; i++) {
    const [count, setCount] = useState(0); // ループの中でHook使用
  }
}

// ✅ 正しい例
function GoodComponent({ showUser }) {
  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState([0, 0, 0]);

  if (showUser) {
    // 条件分岐はHookの後に書く
  }
}
```

このルールがある理由は、Reactが内部でHooksの呼び出し順序を記憶しているからです。
条件分岐やループの中でHooksを使用すると、呼び出し順序が変わってしまい、Reactが正しく状態を管理できなくなってしまいます。

## パフォーマンス最適化の考え方

`useMemo`や`useCallback`はパフォーマンス最適化のためのHooksですが、これらを使用する際には注意が必要です。

**まずは正しく動作するコードを書き、その後でパフォーマンスの問題が発生した場合に使用する**ことが重要です。
最初からすべてを最適化しようとすると、コードが複雑になり、かえって開発効率が下がることがあります。

多くの場合、Reactは十分に高速に動作するため、これらの最適化は必要ありません。
実際にパフォーマンスの問題が発生してから、原因を特定して適切に対処することが推奨されています。

## まとめ

本章では、よく使われるReact Hooksについて学習しました。

`useContext`は、コンポーネント間でのデータ共有を簡単にしてくれます。
Props Drillingの問題を解決し、より読みやすいコードを書けるようになります。

`useReducer`は、複雑な状態管理を整理するためのHookです。
複数の関連する状態を一箇所で管理し、状態の更新ロジックを明確にできます。

`useMemo`と`useCallback`は、パフォーマンス最適化のためのHooksです。
重い計算や関数の不要な再作成を防ぐことで、アプリケーションの動作を改善できます。

これらのHooksは、より大規模で複雑なReactアプリケーションを開発する際に威力を発揮します。
現時点では概念を理解しておき、今後の学習や実際の開発で必要になった時に詳しく学習していくとよいでしょう。

基本的なアプリであれば、前回までに学んだ`useState`と`useEffect`だけで十分に対応できますので、焦らずに進めていきましょう。
