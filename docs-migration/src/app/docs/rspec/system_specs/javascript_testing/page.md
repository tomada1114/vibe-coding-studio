---
title: JavaScriptを使った動作をテストしよう
nextjs:
  metadata:
    title: JavaScriptを使った動作をテストしよう
    description: システムスペックでJavaScript処理をテストする方法を学習します。Selenium WebDriverの役割と重要性、動的なUI操作のテスト手法、ブラウザの表示/非表示切り替えなどのテスト自動化について実践的に習得できます。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [表示/非表示を切り替える機能の実装](#表示非表示を切り替える機能の実装)
  - [HTML要素の設定](#html要素の設定)
  - [JavaScriptの実装](#javascriptの実装)
  - [JavaScriptコードの解説](#javascriptコードの解説)
- [動作確認](#動作確認)
- [JavaScriptテストのための環境設定](#javascriptテストのための環境設定)
  - [Selenium WebDriverの導入](#selenium-webdriverの導入)
  - [Selenium WebDriverの役割](#selenium-webdriverの役割)
- [テストコードの実装](#テストコードの実装)
  - [テストコードの詳細解説](#テストコードの詳細解説)
    - [テストドライバの設定](#テストドライバの設定)
    - [要素の状態確認](#要素の状態確認)
    - [ボタン操作の再現](#ボタン操作の再現)
- [テストの実行](#テストの実行)
- [まとめ](#まとめ)

## 学習の目標

本章では、以下の内容を学習します。

- システムスペックにおけるJavaScript処理のテスト方法について、基本から実践的な実装方法まで体系的に学ぶ
- Selenium WebDriverの役割と重要性について学び、JavaScriptを含むWeb機能のテスト自動化の基礎を習得する
- ブラウザの表示/非表示の切り替えなど、動的なUI操作のテスト手法について実践的な例を通じて理解する
- システムスペックにおける各種マッチャーの使い方と、特にJavaScriptテストに特化したアサーションの方法を学ぶ

## はじめに

前回までは、データの新規作成や編集など、Railsの基本的な処理をシステムスペックでテストしてきました。
これらのテストでは主にサーバーサイドの処理を検証していましたが、現代のWebアプリケーションでは、ユーザー体験を向上させるためにJavaScriptを使った動的な機能も重要な要素です。

本章では、JavaScriptを使用した動的な画面操作をテストする方法について学習します。
まず実際の動作を確認し、その後テストコードの実装に進んでいきます。

## 表示/非表示を切り替える機能の実装

まずは、ボタンクリックで要素の表示/非表示を切り替える簡単な機能を実装してみましょう。
この機能は、JavaScriptの基本的な動作を理解するのに適した例です。

`app/views/todos/index.html.erb`を開き、以下のコードを追加します。

```erb
<h1>Todo一覧</h1>

<div>
  <button id="js-button">クリックしてね</button>
  <p id="js-text" style="display: none;">こんにちは！</p>
</div>

# ...以下省略
```

### HTML要素の設定

このコードでは、まず`button`要素と`p`要素にそれぞれ`id`属性を付与しています。
これにより、JavaScriptからこれらの要素を簡単に特定できます。

`style="display: none"`という指定は、その要素を最初は非表示にするためのCSSスタイルです。

### JavaScriptの実装

次に、ボタンクリック時の動作をJavaScriptで実装します。
同じく`index.html.erb`ファイルの下部に、以下のコードを追加します。

```erb
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // js-buttonというIDを持つ要素を取得
    const button = document.getElementById('js-button');
    // js-textというIDを持つ要素を取得
    const text = document.getElementById('js-text');

    // ボタンがクリックされたときの処理
    button.addEventListener('click', () => {
      // テキストの表示/非表示を切り替える
      // 非表示の場合はblock、表示の場合はnoneを設定する
      text.style.display = text.style.display === 'none' ? 'block' : 'none';
    });
  });
</script>
```

### JavaScriptコードの解説

このJavaScriptコードでは、以下の処理を行っています。

まず、`DOMContentLoaded`イベントをリッスンすることで、HTMLの読み込みが完了したタイミングで処理を開始します。
次に、`getElementById`メソッドを使用して、特定のID属性を持つ要素を取得します。

その後、ボタンに対して`click`イベントリスナーを設定し、クリック時の処理を定義します。
最後に、クリック時には、テキスト要素の`display`スタイルを切り替えることで、表示/非表示を制御します。

## 動作確認

実装した機能が正しく動作するか、まずブラウザで確認しましょう。
実際の動作を確認することで、後でテストコードを書く際の基準となります。

ターミナルで`bundle exec rails s`を実行してサーバーを起動し、ブラウザで`http://127.0.0.1:3000/todos`にアクセスします。

```bash
bundle exec rails s
```

以下の動作を確認してみましょう。

まず、画面上部に「クリックしてね」というボタンが表示されていることを確認します。
次に、初期状態では「こんにちは！」というテキストは表示されていないことを確認します。
そして、ボタンをクリックすると「こんにちは！」が表示されることを確認します。
最後に、もう一度クリックすると「こんにちは！」が非表示になることを確認します。

## JavaScriptテストのための環境設定

動作確認ができたら、この機能をテストするための環境を整えます。

ただし、JavaScriptによる動的な処理は、通常のシステムスペックでは検証できません。
なぜなら、これまで使用してきた`rack_test`ドライバーはJavaScriptを実行できないためです。

そのため、JavaScriptの動作を確実にテストするには、実際のブラウザの動作を再現できる特別な設定が必要になります。

### Selenium WebDriverの導入

JavaScriptのテストには、実際のブラウザの動作を再現できるSelenium WebDriverというツールが必要です。
Gemfileのtestグループに、selenium-webdriverを追加します。

```ruby
group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
```

### Selenium WebDriverの役割

Selenium WebDriverは、以下のような役割があります。

- ブラウザの起動と制御
- JavaScriptの実行
- DOM要素の操作
- イベントのシミュレーション

これらの機能により、実際のユーザー操作をより忠実に再現したテストが可能になります。

gemをインストールするために、以下のコマンドを実行します。

```bash
bundle install
```

これで、JavaScriptのテストを書く準備が整いました。

## テストコードの実装

`spec/system/todos_spec.rb`に、JavaScriptの動作をテストするコードを追加します。

```ruby
require 'rails_helper'

RSpec.describe 'Todo管理', type: :system do
  before do
    driven_by(:selenium_chrome_headless)
  end

  describe 'JavaScriptの動作確認' do
    it 'ボタンをクリックするとテキストの表示/非表示が切り替わる' do
      # Todoの一覧ページにアクセス
      visit todos_path

      # 初期状態では非表示であることを確認
      expect(page).to have_selector('#js-text', visible: false)
      expect(page).not_to have_content('こんにちは！')

      # ボタンをクリックして表示されることを確認
      click_button 'クリックしてね'
      expect(page).to have_selector('#js-text', visible: true)
      expect(page).to have_content('こんにちは！')

      # もう一度クリックして非表示になることを確認
      click_button 'クリックしてね'
      expect(page).to have_selector('#js-text', visible: false)
      expect(page).not_to have_content('こんにちは！')
    end
  end
end
```

### テストコードの詳細解説

このテストコードについて説明しておきます。

#### テストドライバの設定

まず`driven_by(:selenium_chrome_headless)`は、テストでヘッドレスChrome（画面表示のないブラウザ）を使用することを指定します。
これにより、実際のブラウザの機能を使いながらも、テスト実行時に画面を表示せずに高速でテストを実行できます。

#### 要素の状態確認

`have_selector`マッチャーは、特定のHTML要素の存在と状態を確認するために使用します。
`visible: false`オプションで、要素が非表示状態であることを確認できます。

また、`have_content`と`not_to`を組み合わせることで、特定のテキストが画面に表示されていない（または表示されている）ことを確認できます。

#### ボタン操作の再現

`click_button`メソッドは、指定したテキストを持つボタンをクリックする操作をシミュレートします。
これにより、実際のユーザーがボタンをクリックした際の動作を正確に再現できます。

## テストの実行

実装したテストを実行してみましょう。

```bash
bundle exec rspec spec/system/todos_spec.rb
```

テストが成功すれば、JavaScriptの動作確認とそのテストの実装は完了です。
これにより、動的なUI操作が期待通りに動作することを自動的に検証できるようになりました。

## まとめ

本章では、JavaScriptを使用した動的な画面操作のテスト方法について学習しました。

ポイントとしては、以下の通りです。

JavaScriptのテストでは、実際のブラウザ操作を再現するためにSelenium WebDriverを使用することが重要です。
これにより、従来のサーバーサイドテストでは検証できない、クライアントサイドの動的な処理も自動テストの対象にできます。

また、要素の表示/非表示状態は、`have_selector`マッチャーと`visible`オプションを組み合わせてテストできることも学びました。
これらの機能を活用することで、ユーザーインターフェースの動的な変化も確実に検証できるようになります。

システムスペックでJavaScriptの動作をテストできるようになったことで、より包括的なアプリケーションテストが可能になりました。
これにより、サーバーサイドからクライアントサイドまで、アプリケーション全体の品質を保証できるでしょう。
