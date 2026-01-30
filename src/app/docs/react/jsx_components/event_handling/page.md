---
title: イベントハンドリングの基本
nextjs:
  metadata:
    title: イベントハンドリングの基本
    description: Reactでのイベントハンドリングの基本、onClickイベント、フォーム入力イベント、イベントオブジェクト、preventDefault()の使い方について初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- Reactでのイベントハンドリングの基本概念を理解する
- onClickイベントの処理方法を習得する
- フォーム入力のイベント処理方法を学ぶ
- イベントオブジェクトの基本的な活用方法を理解する
- preventDefault()の使い方を学ぶ

## はじめに

これまでの章では、データを表示するコンポーネントを作成してきました。
しかし、実際のWebアプリケーションでは、ユーザーがボタンをクリックしたり、フォームに入力したりする操作に応じて、何かしらの処理を実行する必要があります。

この「ユーザーの操作に応じて処理を実行する」ことを**イベントハンドリング**と呼びます。
イベントハンドリングを理解することで、インタラクティブなWebアプリケーションを作ることができるようになります。

この章では、最も基本的なイベントハンドリングから順番に学んでいきましょう。

## onClickイベントの処理

今回も前のレッスンで作成した `react-tailwind` プロジェクトを引き続き使用します。

### 最もシンプルなクリックイベント

最初に、ボタンがクリックされた時に何かを実行する簡単な例から始めましょう。
`src/ClickExample.jsx`を作成してください。

```jsx
const ClickExample = () => {
  // ボタンがクリックされた時に実行される関数
  const handleClick = () => {
    alert('ボタンがクリックされました！')
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">クリックイベントの例</h2>

      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        クリックしてください
      </button>
    </div>
  )
}

export default ClickExample
```

このコードのポイントを見ていきましょう。

#### イベントハンドラー関数の定義

まず、ボタンがクリックされた時に実行される関数を定義します。

ここでは`handleClick`という関数を作成し、アラートを表示する処理を記述しています。

```jsx
const handleClick = () => {
  alert('ボタンがクリックされました！')
}
```

これは、ボタンがクリックされた時に実行される処理を定義する部分です。

JavaScript では「クリック」のようなユーザーの操作を**イベント**と呼びます。

そして、そのイベントに対して実行される処理を**イベントハンドラー**と呼びます。

#### onClickプロパティへの関数の渡し方

そして、ボタンの`onClick`プロパティに、先ほど定義した関数を渡します。

```jsx
onClick={handleClick}
```

この `onClick` プロパティは、ボタンがクリックされた時に実行される関数を指定するためのものです。

これは、Reactのコンポーネントにおけるイベントハンドリングの基本的な書き方ですので「こういうもの」として覚えていただいて構いません。

注意点として、`onClick={handleClick()}`ではなく、`onClick={handleClick}`と書くことです。
これは、関数を直接渡すためであり、括弧を付けてしまうとコンポーネントがレンダリング、つまり表示された時点で関数が実行されてしまいます。

そのため、関数名だけを渡すようにします。

では、実際にこのコンポーネントを`App.jsx`で使用してみましょう。

```jsx
import ClickExample from './ClickExample';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center max-w-4xl justify-center p-4">
        <h1 className="text-4xl font-bold text-center py-8">イベントハンドリングの例</h1>

        <ClickExample />
      </div>
    </div>
  );
}
export default App;

```

保存してブラウザで確認すると、ボタンが表示され、クリックするとアラートが表示されるはずです。

![スクリーンショット](/img/react/event_handling_click_example.png)

![スクリーンショット](/img/react/event_handling_click_example_alert.png)


### 複数のボタンを使った例

複数のボタンでそれぞれ異なる処理を実行する例を作成してみましょう。

それぞれ、イベントハンドラーを定義し、ボタンの`onClick`プロパティに渡すことで、異なる処理を実行します。

`src/ClickExample.jsx`を以下のように修正してください。

```jsx
const ClickExample = () => {
  const showMessage = (message) => {
    alert(message)
  }

  const showTime = () => {
    const now = new Date()
    alert(`現在の時刻: ${now.toLocaleTimeString()}`)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">様々なクリックイベント</h2>

      <div className="space-y-4">
        <button
          onClick={() => showMessage('こんにちは！')}
          className="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          挨拶メッセージ
        </button>

        <button
          onClick={showTime}
          className="block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          現在時刻を表示
        </button>
      </div>
    </div>
  )
}

export default ClickExample
```

この例では、以下の3つの異なるイベントハンドラーを使用しています。

まず、`showMessage`関数は、引数として渡されたメッセージをアラートで表示します。

```jsx
const showMessage = (message) => {
  alert(message)
}
```

次に、`showTime`関数は現在の時刻を取得し、アラートで表示します。

```jsx
const showTime = () => {
  const now = new Date()
  alert(`現在の時刻: ${now.toLocaleTimeString()}`)
}
```

最後に、ボタンの`onClick`プロパティにそれぞれの関数を渡しています。

```jsx
<button
  onClick={() => showMessage('こんにちは！')}
  className="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
>
挨拶メッセージ
</button>
<button
  onClick={showTime}
  className="block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
>
現在時刻を表示
</button>
```

では、これらのボタンを`App.jsx`で確認してみましょう。

`App.jsx`ではすでに`ClickExample`コンポーネントをインポートしているので、特に変更は必要ありません。

この状態でもう一度ブラウザで確認すると、3つのボタンが表示され、それぞれクリックすると異なるアラートや背景色の変更が行われるはずです。

まず、「挨拶メッセージ」ボタンをクリックすると「こんにちは！」というメッセージが表示されます。

![スクリーンショット](/img/react/event_handling_click_example_multiple.png)

また、「現在時刻を表示」ボタンをクリックすると、現在の時刻がアラートで表示されます。

![スクリーンショット](/img/react/event_handling_click_example_time.png)

## フォーム入力のイベント処理

### 基本的な入力イベント

ユーザーがテキストフィールドに入力した内容を取得する方法を学びましょう。

`src/InputExample.jsx`を作成してください。

```jsx
const InputExample = () => {
  const handleInputChange = (event) => {
    console.log('入力された値:', event.target.value)
  }

  const handleSubmit = () => {
    const inputElement = document.getElementById('nameInput')
    const inputValue = inputElement.value

    if (inputValue.trim() === '') {
      alert('名前を入力してください')
    } else {
      alert(`こんにちは、${inputValue}さん！`)
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">入力イベントの例</h2>

      <div className="max-w-md">
        <label className="block text-sm font-medium mb-2">
          お名前を入力してください
        </label>

        <input
          id="nameInput"
          type="text"
          onChange={handleInputChange}
          placeholder="名前を入力"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          送信
        </button>
      </div>
    </div>
  )
}

export default InputExample
```

このコードでは、まず、テキストフィールドに入力された値を取得するためのイベントハンドラーを定義しています。
```jsx
const handleInputChange = (event) => {
  console.log('入力された値:', event.target.value)
}
```
この関数は、入力フィールドの内容が変更されるたびに呼び出され、コンソールに入力された値を表示します。
次に、送信ボタンがクリックされた時の処理を定義しています。
```jsx
const handleSubmit = () => {
  const inputElement = document.getElementById('nameInput')
  const inputValue = inputElement.value

  if (inputValue.trim() === '') {
    alert('名前を入力してください')
  } else {
    alert(`こんにちは、${inputValue}さん！`)
  }
}
```
この関数は、入力フィールドの値を取得し、空でない場合は挨拶のメッセージを表示します。
もし空の場合は、入力を促すアラートを表示します。
このコンポーネントを`App.jsx`で使用して、ブラウザで確認してみましょう。

```jsx
import InputExample from './InputExample'
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center py-8">
          イベントハンドリングの例
        </h1>

        <InputExample />
      </div>
    </div>
  )
}

export default App
```

保存してブラウザで確認すると、テキストフィールドと送信ボタンが表示されます。

![スクリーンショット](/img/react/event_handling_input_example.png)

テキストフィールドに名前を入力し、送信ボタンをクリックすると、入力された名前に応じてアラートが表示されます。

![スクリーンショット](/img/react/event_handling_input_example_alert.png)

今回はアラートを表示する例でしたが、実際にはユーザーの入力内容をサーバーに送信したり、他の処理を行うことが多いです。

よくあるのは、フォームの送信処理や、リアルタイムでの入力内容の検証などです。

## イベントオブジェクトの活用

### イベントオブジェクトとは

Reactのイベントハンドラーには、自動的に**イベントオブジェクト**が渡されます。
イベントオブジェクトは、ユーザーの操作に関する情報を含むオブジェクトで、イベントが発生した要素や、マウスの位置、キーボードのキーなどの情報を取得できます。

このオブジェクトには、イベントに関する様々な情報が含まれていますので、イベントハンドラー内で活用することができます。

では、イベントオブジェクトを活用した例を見ていきましょう。

`src/EventExample.jsx`を作成して、イベントオブジェクトの活用例を見てみましょう。

```jsx
const EventExample = () => {
  const handleMouseEvent = (event) => {
    console.log('マウスの位置:', event.clientX, event.clientY)
    console.log('クリックされた要素:', event.target.tagName)
  }

  const handleKeyPress = (event) => {
    console.log('押されたキー:', event.key)
    if (event.key === 'Enter') {
      alert('Enterキーが押されました！')
    }
  }

  const handleFocus = (event) => {
    event.target.style.backgroundColor = 'lightyellow'
  }

  const handleBlur = (event) => {
    event.target.style.backgroundColor = 'white'
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">イベントオブジェクトの例</h2>

      <div className="space-y-4">
        <div>
          <button
            onClick={handleMouseEvent}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            クリック位置を表示（コンソールを確認）
          </button>
        </div>

        <div>
          <input
            type="text"
            onKeyDown={handleKeyPress}
            placeholder="何か入力してください（Enterキーを試してみて）"
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <input
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="フォーカス時に背景色が変わります"
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default EventExample
```

この例では、いくつかのイベントハンドラーを定義しています。

まず、マウスのクリック位置を取得するための`handleMouseEvent`関数です。

```jsx
const handleMouseEvent = (event) => {
  console.log('マウスの位置:', event.clientX, event.clientY)
  console.log('クリックされた要素:', event.target.tagName)
}
```
この関数は、マウスがクリックされた位置の座標と、クリックされた要素のタグ名をコンソールに表示します。
次に、キーボードのキー入力を取得するための`handleKeyPress`関数です。

```jsx
const handleKeyPress = (event) => {
  console.log('押されたキー:', event.key)
  if (event.key === 'Enter') {
    alert('Enterキーが押されました！')
  }
}
```
この関数は、押されたキーの名前をコンソールに表示し、Enterキーが押された場合はアラートを表示します。
次に、フォーカスとブラー（フォーカスが外れた時）のイベントを処理するための`handleFocus`と`handleBlur`関数です。

```jsx
const handleFocus = (event) => {
  event.target.style.backgroundColor = 'lightyellow'
}

const handleBlur = (event) => {
  event.target.style.backgroundColor = 'white'
}
```

これらの関数は、入力フィールドにフォーカスが当たった時に背景色を変更し、フォーカスが外れた時に元の色に戻します。
これらのイベントハンドラーを`App.jsx`で使用して、ブラウザで確認してみましょう。

```jsx
import EventExample from './EventExample'
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center py-8">
          イベントオブジェクトの例
        </h1>

        <EventExample />
      </div>
    </div>
  )
}

export default App
```

保存してブラウザで確認すると、マウスのクリック位置やキーボードの入力、フォーカスのイベントがコンソールに表示されるはずです。

まず、マウスのクリック位置を表示するボタンをクリックすると、コンソールにマウスの位置とクリックされた要素のタグ名が表示されます。

![スクリーンショット](/img/react/event_handling_event_example_mouse_position.png)

次に、テキストフィールドに何か入力してEnterキーを押すと、コンソールに押されたキーの名前が表示され、Enterキーが押された場合はアラートが表示されます。

```bash
押されたキー: Enter
押されたキー: a
```

また、フォーカスが当たった時に背景色が変わり、フォーカスが外れた時に元の色に戻ることも確認できます。

フォームをクリックすると、背景色が変わることが確認できます。

![スクリーンショット](/img/react/event_handling_event_example_focus.png)

### デフォルト動作の防止

HTML要素には、デフォルトで決められた動作があります。

例えば、通常はフォームの送信ボタンをクリックするとページがリロードされます。

そこで、`preventDefault()`を使うことで、この デフォルト動作を防ぐことができます。

これは JavaScriptのイベントオブジェクトに含まれるメソッドで、特定のイベントのデフォルトの動作をキャンセルするために使用します。
以下の例では、フォームの送信時にページがリロードされないように`preventDefault()`を使用しています。

`src/FormExample.jsx`を作成してください。

```jsx
const FormExample = () => {
  const handleSubmit = (event) => {
    // デフォルトのフォーム送信動作を防ぐ
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get('name')
    const email = formData.get('email')

    alert(`フォーム送信処理\n名前: ${name}\nメール: ${email}`)
  }

  const handleLinkClick = (event) => {
    event.preventDefault()
    alert('リンクのデフォルト動作を防ぎました')
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">preventDefault()の例</h2>

      <div className="space-y-8">
        {/* フォームの例 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">フォーム送信の例</h3>
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">名前</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">メールアドレス</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              送信（ページはリロードされません）
            </button>
          </form>
        </div>

        {/* リンクの例 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">リンクの例</h3>
          <a
            href="https://example.com"
            onClick={handleLinkClick}
            className="text-blue-500 underline hover:text-blue-700"
          >
            このリンクをクリックしても移動しません
          </a>
        </div>
      </div>
    </div>
  )
}

export default FormExample
```

このコードを詳しく見ていきましょう。

まず、フォームの送信時にデフォルトの動作を防ぐために、`handleSubmit`関数で`event.preventDefault()`を呼び出しています。

```jsx
const handleSubmit = (event) => {
  // デフォルトのフォーム送信動作を防ぐ
  event.preventDefault()
```
この行があることで、フォームを送信してもページがリロードされず、代わりにアラートで入力内容を表示します。
次に、フォームデータを取得するために`FormData`オブジェクトを使用しています。

```jsx
const formData = new FormData(event.target)
const name = formData.get('name')
const email = formData.get('email')
```
`FormData`は、フォームの入力値を簡単に取得できるオブジェクトで、`get`メソッドを使って特定のフィールドの値を取得できます。
最後に、リンクのクリック時にデフォルトの動作を防ぐために、`handleLinkClick`関数で`event.preventDefault()`を呼び出しています。

```jsx
const handleLinkClick = (event) => {
  event.preventDefault()
  alert('リンクのデフォルト動作を防ぎました')
}
```
この関数は、リンクがクリックされた時にアラートを表示し、ブラウザがリンク先に移動するのを防ぎます。
このコンポーネントを`App.jsx`で使用して、ブラウザで確認してみましょう。

```jsx
import FormExample from './FormExample'
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center py-8">
          preventDefault()の例
        </h1>

        <FormExample />
      </div>
    </div>
  )
}
export default App
```

保存してブラウザで確認すると、フォームとリンクが表示されます。

![スクリーンショット](/img/react/event_handling_form_example_initial.png)

まずフォームに名前とメールアドレスを入力し、送信ボタンをクリックすると、ページはリロードされず、入力内容がアラートで表示されます。
![スクリーンショット](/img/react/event_handling_form_example.png)

また、リンクをクリックすると、アラートが表示され、リンクのデフォルト動作（ページ遷移）が防がれます。
![スクリーンショット](/img/react/event_handling_form_example_link.png)

試しに、一時的に `FormExample.jsx` の `event.preventDefault()` をコメントアウトしてみてください。
そうすると、フォームを送信した際にページがリロードされ、入力内容が消えてしまうことが確認できます。
これは、デフォルトのフォーム送信動作が実行されているためです。

## まとめ

本章では、Reactでのイベントハンドリングの基本について学習しました。
習得できた内容は以下の通りです。

- `onClick`イベントを使ってボタンクリック時の処理を実装する方法を理解しました
- フォーム入力イベントを使って、ユーザーの入力を取得する方法を習得しました
- イベントオブジェクトから様々な情報を取得し、活用する方法を学びました
- `preventDefault()`を使ってデフォルト動作を防ぎ、独自の処理を実行する方法を理解しました
- 様々なイベント（マウス、キーボード、フォーカスなど）の基本的な扱い方を体験しました

イベントハンドリングは、Webアプリケーションをインタラクティブにするための基本的な技術です。
ユーザーの操作に応じて適切な処理を実行できるようになることで、より使いやすいアプリケーションを作ることができます。

次の章では、コンポーネントの状態を管理するための**State**について学んでいきましょう。
