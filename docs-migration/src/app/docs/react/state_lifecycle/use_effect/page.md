---
title: useEffectでサイドエフェクトを扱おう
nextjs:
  metadata:
    title: useEffectでサイドエフェクトを扱おう
    description: ReactのuseEffectフックを使ってサイドエフェクトを扱う方法を学び、API通信やタイマー処理など実用的な機能の実装方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- サイドエフェクトの基本概念と必要性を理解する
- useEffectフックの基本的な使い方を習得する
- 依存配列の概念と使い方を理解する
- API通信を使った外部データの取得方法を学ぶ
- タイマー処理とクリーンアップの方法を習得する
- useEffectの適切な使用タイミングを理解する

## はじめに

これまでは、ユーザーの入力に応じてStateを更新し、画面を変更する方法を学んできました。しかし、実際のWebアプリケーションでは、コンポーネントが表示される際にサーバーからデータを取得したり、一定時間後に処理を実行したりする必要があることがよくあります。

このような「コンポーネントの描画以外の処理」を**サイドエフェクト**と呼びます。Reactでは、`useEffect`というフックを使ってサイドエフェクトを安全に管理できます。

本章では、`useEffect`の基本的な使い方から、実際のAPI通信やタイマー処理まで、段階的に学習していきましょう。

## サイドエフェクト（副作用）について

### サイドエフェクトとは

まず、**サイドエフェクト**という概念を理解しましょう。

サイドエフェクトとは、コンポーネントの描画（レンダリング）以外で発生する処理のことです。
「副作用」とも呼ばれることもあります。

わかりやすくいうと、コンポーネントの表示に直接関係しないものの、アプリケーションの動作に影響を与える処理全般がサイドエフェクトです。

例えば、コンポーネントが表示されたときにサーバーからデータを取得したり、タイマーを設定して一定時間後に何かを実行したりすることがサイドエフェクトに該当します。

たとえば以下のような処理がサイドエフェクトに該当します。

- サーバーからデータを取得する（API通信）
- タイマーやインターバルの設定
- ブラウザのタイトルを変更する
- ローカルストレージにデータを保存する
- DOM要素を直接操作する

### なぜuseEffectが必要なのか

通常のJavaScriptでは、これらの処理を関数の中に直接書くことができます。
しかし、Reactのコンポーネント関数では、以下の理由でサイドエフェクトを直接書くべきではありません。

- コンポーネントは何度も再実行される可能性がある
- 予期しないタイミングで処理が実行される可能性がある
- パフォーマンスの問題が発生する可能性がある

いまいちピンと来ないかもしれませんが、これはReactの裏側の仕組みによるものですので「こういうもの」と覚えてしまっても大丈夫です。

そして `useEffect`を使うことで、これらの問題を避けて安全にサイドエフェクトを実行できます。

慣れてないうちは、いまいち`useEffect`の必要性がピンと来ないかもしれませんが、ひとまずは `useEffect`を使ってサイドエフェクトを管理することを覚えておきましょう。

## useEffectの基本的な使い方

最初に、コンポーネントが表示されたときにメッセージを表示する簡単な例を見てみましょう。
新しいファイル`src/BasicEffect.jsx`を作成し、以下のコードを入力してください。

```jsx
import { useState, useEffect } from 'react';

function BasicEffect() {
  const [count, setCount] = useState(0);

  // コンポーネントがマウントされた時に実行される
  useEffect(() => {
    console.log('コンポーネントが表示されました');
  }, []); // 空の依存配列

  // countが変更される度に実行される
  useEffect(() => {
    console.log('countが変更されました:', count);
  }, [count]); // countを依存配列に指定

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">useEffect の基本</h2>

      <div className="text-center mb-4">
        <p className="text-lg mb-2">カウント: {count}</p>
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          +1
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <p>ブラウザの開発者ツールのコンソールを確認してください</p>
      </div>
    </div>
  );
}

export default BasicEffect;
```

このコードでは、2つの`useEffect`を使用しています。

まず、コンポーネントが**最初に表示された時**にメッセージを表示するための`useEffect`があります。
```jsx
useEffect(() => {
  console.log('コンポーネントが表示されました');
}, []); // 空の依存配列
```

次に、`count`の値が**変更されるたび**にメッセージを表示するための`useEffect`があります。

```jsx
useEffect(() => {
  console.log('countが変更されました:', count);
}, [count]); // countを依存配列に指定
```

一見、なぜこれを `useEffect`で行う必要があるのか疑問に思うかもしれません。
しかし、Reactではコンポーネントが再レンダリングされるたびに処理を実行することは避けるべきとされています。
そのため、`useEffect`を使って、特定のタイミングでのみ処理を実行するようにしています。

初めは`useEffect`の使い方に戸惑うかもしれませんが、慣れてくると非常に便利な機能であることがわかります。

ちなみに、空の依存配列`[]`を指定しているのか、また`[count]`を指定しているのかについては、後ほど詳しく説明します。

では`App.jsx`にこのコンポーネントを追加して、表示できるようにします。

```jsx
import BasicEffect from './BasicEffect';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">useEffect の基本</h1>
        <BasicEffect />
      </div>
    </div>
  );
}
export default App;
```

開発サーバーを起動して、ブラウザの開発者ツールのコンソールを確認してみましょう。

```bash
npm run dev
```

ブラウザを開いて、コンソールタブを表示してください。
最初にコンポーネントが表示された時に「コンポーネントが表示されました」というメッセージが表示されるはずです。

```bash
コンポーネントが表示されました
countが変更されました: 0 // 初期値の0が表示されます
```

なお、React 18 以降では、コンポーネントの初期表示時に 2回レンダリングされることがありますが、正常な動作です。

これは、開発モードでのパフォーマンス向上のための仕組みで、実際の本番環境では1回だけレンダリングされるようになります。

さてllに戻りますと、ボタンをクリックして`count`の値を増やすと、「countが変更されました: 1」というメッセージが表示されます。

```bash
countが変更されました: 1
```
このように、`useEffect`を使うことで、コンポーネントのライフサイクルに応じて特定の処理を実行することができます。

## 依存配列の使い方

先ほどの`useEffect`の例では、依存配列を使って処理の実行タイミングを制御しました。

まず一つ目の`useEffect`では、空の依存配列`[]`を指定しました。

```jsx
useEffect(() => {
  console.log('コンポーネントが表示されました');
}, []); // 空の依存配列
```
この場合、コンポーネントが**最初にマウントされた時**にのみ実行されます。

これは定番のパターンで、コンポーネントが初めて表示された時に一度だけ実行したい処理に使います。

次に、二つ目の`useEffect`では、`count`を依存配列に指定しました。

```jsx
useEffect(() => {
  console.log('countが変更されました:', count);
}, [count]); // countを依存配列に指定
```
この場合、`count`の値が**変更されるたび**に実行されます。

今回は`count`が更新されるたびにコンソールにメッセージを表示していますが、実際のアプリケーションでは、API通信やDOM操作など、`count`の値に依存する処理をここに書くことが多いです。

## API通信でデータを取得する

次に、より実用的な例として、外部のAPIからデータを取得してみましょう。
JSONPlaceholderという無料のテスト用APIを使って、ユーザー情報を取得します。

新しいファイル`src/UserData.jsx`を作成し、以下のコードを入力してください。

```jsx
import { useState, useEffect } from 'react';

function UserData() {
  // ユーザーデータを管理するState
  const [user, setUser] = useState(null);
  // ローディング状態を管理するState
  const [loading, setLoading] = useState(true);

  // コンポーネントがマウントされた時にAPIからデータを取得
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // 空の依存配列でマウント時のみ実行

  // ローディング中の表示
  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-lg">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">ユーザー情報</h2>

      {user && (
        <div className="space-y-2">
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">名前</p>
            <p className="font-bold text-lg">{user.name}</p>
          </div>

          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">メールアドレス</p>
            <p className="font-bold">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserData;
```

このコードでは、以下のことを行っています。

1. `useState`を使って、ユーザーデータとローディング状態を管理
2. `useEffect`を使って、コンポーネントがマウントされた時にAPIからユーザーデータを取得
3. データ取得中はローディングメッセージを表示
4. データ取得が完了したら、ユーザーの名前とメールアドレスを表示

それぞれ、部分ごとに詳しく見ていきましょう。

まず、`useState`を使ってユーザーデータとローディング状態を管理します。

```jsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```

ここでは、`user`というStateにAPIから取得したユーザーデータを保存し、`loading`というStateでデータの読み込み中かどうかを管理しています。

次に、`useEffect`を使って、コンポーネントがマウントされた時にAPIからデータを取得します。

```jsx
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []); // 空の依存配列でマウント時のみ実行
```

この部分では、非同期関数`fetchUser`を定義し、`fetch`を使ってAPIからユーザーデータを取得しています。

なお、依存配列を空の`[]`にしているため、この`useEffect`はコンポーネントが**最初にマウントされた時**にのみ実行されます。

`fetch`はPromiseを返すため、`await`を使って非同期処理を待機しています。

データの取得に成功したら、`setUser`を使ってユーザーデータをStateに保存します。

もしデータの取得に失敗した場合は、`console.error`でエラーメッセージを表示します。

最後に、データの取得が完了したら、ローディング状態を`false`に更新します。

```jsx
finally {
  setLoading(false);
}
```

これが無いと、ローディング状態が永遠に`true`のままになり、ユーザーに何も表示されなくなってしまいますので注意が必要です。

ローディング状態を管理することで、データが読み込まれるまでの間、ユーザーに待機中のメッセージを表示できます。

```jsx
if (loading) {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="text-center">
        <p className="text-lg">データを読み込み中...</p>
      </div>
    </div>
  );
}
```

そしてデータの取得が完了したら、ユーザーの名前とメールアドレスを表示します。

```jsx
return (
  <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">ユーザー情報</h2>

    {user && (
      <div className="space-y-2">
        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">名前</p>
          <p className="font-bold text-lg">{user.name}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">メールアドレス</p>
          <p className="font-bold">{user.email}</p>
        </div>
      </div>
    )}
  </div>
);
```
この部分では、`user`が存在する場合にのみユーザー情報を表示しています。
これにより、データがまだ取得されていない状態でエラーが発生するのを防ぎます。

では、`App.jsx`にこのコンポーネントを追加して、表示できるようにします。

```jsx
import UserData from './UserData';
function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">API通信でデータを取得</h1>
        <UserData />
      </div>
    </div>
  );
}
export default App;
```

開発サーバーを起動して、ブラウザで確認してみましょう。

```bash
npm run dev
```
ブラウザを開いて、ユーザー情報が正しく表示されることを確認してください。

![スクリーンショット](/img/react/use_effect_user_data.png)

このように、`useEffect`を使うことで、コンポーネントのライフサイクルに応じてAPI通信を行い、外部データを取得することができます。

基本的には、API のように外部データを利用する場合は `useEffect`を使うことが一般的です。

## タイマー処理とクリーンアップ

最後に、タイマー機能を実装して、`useEffect`のクリーンアップ機能を学びましょう。
3秒のカウントダウンタイマーを作成します。

新しいファイル`src/Timer.jsx`を作成し、以下のコードを入力してください。

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      // 1秒ごとにsecondsを1減らす
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }

    // クリーンアップ関数
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds]); // isActiveとsecondsの変化を監視

  // タイマーを開始する関数
  const startTimer = () => {
    setIsActive(true);
  };

  // タイマーをリセットする関数
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(3);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">3秒タイマー</h2>

      <div className="text-center">
        <div className="text-6xl font-bold mb-6 text-blue-600">
          {seconds}
        </div>

        {seconds === 0 ? (
          <div className="mb-4">
            <p className="text-2xl font-bold text-green-600 mb-4">時間です！</p>
            <button
              onClick={resetTimer}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              リセット
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              onClick={startTimer}
              disabled={isActive}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isActive ? 'カウント中...' : 'スタート'}
            </button>
            <button
              onClick={resetTimer}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              リセット
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
```

このコードでは、以下のことを行っています。

1. `useState`を使って、残り時間（秒数）とタイマーのアクティブ状態を管理
2. `useEffect`を使って、タイマーの開始とクリーンアップを行う
3. タイマーを開始する関数とリセットする関数を定義
4. タイマーの残り時間を表示し、時間が来たらメッセージを表示
5. スタートボタンとリセットボタンを用意
6. クリーンアップ関数でタイマーを適切に解除

それぞれ、部分ごとに詳しく見ていきましょう。
まず、`useState`を使って、残り時間とタイマーのアクティブ状態を管理します。

```jsx
const [seconds, setSeconds] = useState(3);
const [isActive, setIsActive] = useState(false);
```
ここでは、`seconds`というStateに残り時間を保存し、`isActive`というStateでタイマーがアクティブかどうかを管理しています。
次に、`useEffect`を使って、タイマーの開始とクリーンアップを行います。

```jsx
useEffect(() => {
  let interval = null;

  if (isActive && seconds > 0) {
    // 1秒ごとにsecondsを1減らす
    interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
  }

  // クリーンアップ関数
  return () => {
    if (interval) {
      clearInterval(interval);
    }
  };
}, [isActive, seconds]); // isActiveとsecondsの変化を監視
```
この部分では、`isActive`が`true`で、かつ`seconds`が0より大きい場合に1秒ごとに`seconds`を1減らす処理を行います。
`setInterval`を使って1秒ごとに`setSeconds`を呼び出し、残り時間を更新しています。

また、`useEffect`のクリーンアップ関数を使って、コンポーネントがアンマウントされる際や依存値が変化する際にタイマーを適切に解除します。

```jsx
return () => {
  if (interval) {
    clearInterval(interval);
  }
};
```
このクリーンアップ関数は、`useEffect`が再実行される前やコンポーネントがアンマウントされる際に呼び出されます。
これにより、タイマーが不要な状態で残り続けることを防ぎます。

クリーンアップと聞くと難しく感じるかもしれませんが、要は「不要な処理をきちんと片付ける」ことです。
タイマーの処理が不要になった時に、きちんと解除することで、メモリリークや予期しない動作を防ぐことができます。
次に、タイマーを開始する関数とリセットする関数を定義します。

```jsx
const startTimer = () => {
  setIsActive(true);
};
const resetTimer = () => {
  setIsActive(false);
  setSeconds(3);
};
```
`startTimer`関数は、タイマーを開始するために`isActive`を`true`に設定します。
そして、`resetTimer`関数はタイマーをリセットして、`isActive`を`false`にし、残り時間を3秒に戻します。
最後に、タイマーの残り時間を表示し、時間が来たらメッセージを表示します。

```jsx
return (
  <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">3秒タイマー</h2>

    <div className="text-center">
      <div className="text-6xl font-bold mb-6 text-blue-600">
        {seconds}
      </div>

      {seconds === 0 ? (
        <div className="mb-4">
          <p className="text-2xl font-bold text-green-600 mb-4">時間です！</p>
          <button
            onClick={resetTimer}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            リセット
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <button
            onClick={startTimer}
            disabled={isActive}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isActive ? 'カウント中...' : 'スタート'}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            リセット
          </button>
        </div>
      )}
    </div>
  </div>
);
```
この部分では、残り時間を大きなフォントで表示し、時間が来たら「時間です！」というメッセージを表示します。
また、スタートボタンとリセットボタンを用意し、スタートボタンはタイマーがアクティブな場合は無効化しています。
では、`App.jsx`にこのコンポーネントを追加して、表示できるようにします。

```jsx
import Timer from './Timer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">タイマー機能</h1>
        <Timer />
      </div>
    </div>
  );
}
export default App;
```
開発サーバーを起動して、ブラウザで確認してみましょう。

```bash
npm run dev
```

ブラウザを開いて、3秒のカウントダウンタイマーが正しく動作することを確認してください。
![スクリーンショット](/img/react/use_effect_timer_start.png)
タイマーがスタートボタンをクリックするとカウントダウンが始まり、3秒後に「時間です！」というメッセージが表示されます。

![スクリーンショット](/img/react/use_effect_timer_countdown.png)

![スクリーンショット](/img/react/use_effect_timer_end.png)

React アプリでは、よくタイマー処理を行うことがありますが、`useEffect`を使うことで、タイマーの開始とクリーンアップを適切に管理できます。

## まとめ

本章では、`useEffect`を使ったサイドエフェクトの管理について学習しました。
以下のポイントを理解できたことと思います。

- サイドエフェクトとは、コンポーネントの描画以外で発生する処理のこと
- `useEffect`を使ってサイドエフェクトを安全に管理できる
- 依存配列によって、処理が実行されるタイミングを制御できる
- API通信やタイマー処理など、実用的な機能を実装できる
- クリーンアップ関数でリソースの適切な解放ができる
- 無限ループや不要な再実行を避ける書き方が重要

`useEffect`は、動的で魅力的なWebアプリケーションを作成するために欠かせないReactの機能です。

最初のうちは戸惑うこともあるかもしれませんが、使いこなせるようになると非常に強力なツールとなります。

API通信やタイマー処理などの基本を理解することで、より高度な機能を持つアプリケーションの開発に進むことができます。
