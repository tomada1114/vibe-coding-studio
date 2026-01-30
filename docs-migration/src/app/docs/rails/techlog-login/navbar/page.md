---
title: ナビゲーションバーで各ページへの導線を作ろう
nextjs:
  metadata:
    title: ナビゲーションバーで各ページへの導線を作ろう
    description: Deviseの認証状態に応じたナビゲーションバーを実装し、テスト駆動開発で動作を確認する方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [仕様の確認](#仕様の確認)
  - [ログインしていない場合](#ログインしていない場合)
  - [ログインしている場合](#ログインしている場合)
- [RSpecでのログイン設定](#rspecでのログイン設定)
- [テスト追加](#テスト追加)
- [実装](#実装)
  - [部分テンプレート作成](#部分テンプレート作成)
- [テスト実行](#テスト実行)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- ユーザーのログイン状態に応じて表示を切り替えるナビゲーションバーを実装する
- 部分テンプレート（パーシャル）の作成と活用方法を習得する
- RSpecのシステムテストでログイン状態をシミュレートする方法を学ぶ
- テスト駆動開発のアプローチでUIコンポーネントを作成する

## はじめに

今回は、ユーザー登録ページ（/users/sign_up）やログインページ（/users/sign_in）などへのリンクを置くナビゲーションバーを作成します。Deviseですぐに使える機能は「ログイン」や「ログアウト」などの機能ですが、色々なページからすぐにアクセスできるようにナビゲーションバーを作成しておくと便利です。

## 仕様の確認

先に完成形を確認しておきましょう。ユーザーがログインしているかどうかによって、表示するリンクを切り替えます。

### ログインしていない場合

ヘッダーにユーザー登録、ログイン画面へのリンクが表示されます。
ユーザー登録画面へのリンクは `/users/sign_up`、ログイン画面へのリンクは `/users/sign_in` です。

![ログインしていない場合のナビゲーションバー](/img/rails/techlog-navbar-without-login.png)

### ログインしている場合

ヘッダーにログアウトリンクが表示されます。（正確にはボタン要素ですが、便宜上リンクと呼びます。）逆に、ユーザー登録/ログインのリンクは表示されません。

![ログインしている場合のナビゲーションバー](/img/rails/techlog-navbar-with-login.png)

イメージを掴んだところで、実装をしていきましょう。

## RSpecでのログイン設定

上記の仕様の通り、今回は「ログインしているかどうか」によって表示されるリンクが変わります。テスト内でログインが必要な操作をする前に毎回ログインフォームからログインをするのは面倒です。

これを解決するために、Deviseのヘルパーメソッドを使えるようにします。この設定をしておくと `sign_in user` という形で1行記述するだけで、RSpecテスト内でログインした状態を実現できます。

`spec/rails_helper.rb`の最後の方で `Devise::Test::IntegrationHelpers` というモジュールをincludeしておきます。

```ruby
  ...
  config.include FactoryBot::Syntax::Methods
  config.include Devise::Test::IntegrationHelpers, type: :system # 追加
end
```

これでSystem Specの中で `sign_in user` という1行を書くだけで、`user` でログインした状態を実現することができます。実際の使い方は後ほど確認しますが、このようにDevise gemには便利なヘルパーメソッドがいくつか用意されているので、知れば知るほど活用の幅が広がります。

## テスト追加

どの画面でも共通的に表示するものですので、どの画面のSystem Specでチェックしても問題ありませんが、例えばログイン画面はログインしているとトップページへリダイレクトされてしまうため、チェックには不向きです。

今回は既に作ってあるトップページ（Home#top）のSystem Specを修正しましょう。

```ruby
require 'rails_helper'

RSpec.describe 'Home', type: :system do
  before do
    driven_by :rack_test
  end

  describe 'トップページアクセスの検証' do
    it 'Home#top という文字列が表示される' do
      visit '/'
      expect(page).to have_content('Home#top')
    end
  end

  ####### ここから追加 #######
  describe 'ナビゲーションバーの検証' do
    context 'ログインしていない場合' do
      before { visit '/' }

      it 'ユーザー登録リンクを表示する' do
        expect(page).to have_link('ユーザー登録', href: '/users/sign_up')
      end

      it 'ログインリンクを表示する' do
        expect(page).to have_link('ログイン', href: '/users/sign_in')
      end

      it 'ログアウトリンクは表示しない' do
        expect(page).not_to have_content('ログアウト')
      end
    end

    context 'ログインしている場合' do
      before do
        user = create(:user) # ログイン用のユーザーを作成
        sign_in user # 作成したユーザーでログイン
        visit '/'
      end

      it 'ユーザー登録リンクは表示しない' do
        expect(page).not_to have_link('ユーザー登録', href: '/users/sign_up')
      end

      it 'ログインリンクは表示しない' do
        expect(page).not_to have_link('ログイン', href: '/users/sign_in')
      end

      it 'ログアウトリンクを表示する' do
        expect(page).to have_content('ログアウト')
      end

      it 'ログアウトリンクが機能する' do
        click_button 'ログアウト'
        # ログインしていない状態のリンク表示パターンになることを確認
        expect(page).to have_link('ユーザー登録', href: '/users/sign_up')
        expect(page).to have_link('ログイン', href: '/users/sign_in')
        expect(page).not_to have_content('ログアウト')
      end
    end
  end
end
```

この時点では当然、テストが失敗することを確認します。まず理想となる仕様をテストとして定義し、その後に実装を進め、テストが成功するようにするのが**テスト駆動開発**の基本でしたね。

ただし、一部リンクが「表示されないこと」を確認しているテストもあるため、一部のテストは失敗しないことに注意してください。

```bash
$ bin/rspec spec/system/home_spec.rb

...

Finished in 11.44 seconds (files took 0.45402 seconds to load)
8 examples, 4 failures

Failed examples:
rspec ./spec/system/home_spec.rb:20 # Home ナビゲーションバーの検証 ログインしていない場合 ユーザー登録リンクを表示する
rspec ./spec/system/home_spec.rb:24 # Home ナビゲーションバーの検証 ログインしていない場合 ログインリンクを表示する
rspec ./spec/system/home_spec.rb:48 # Home ナビゲーションバーの検証 ログインしている場合 ログアウトリンクを表示する
rspec ./spec/system/home_spec.rb:52 # Home ナビゲーションバーの検証 ログインしている場合 ログアウトリンクが機能する
```

## 実装

では、上記のテストが通るように実装していきましょう。

### 部分テンプレート作成

`app/views/shared` というディレクトリを作り、`_navbar.html.erb` というファイルを作成します。このように、色々なページで共通して使うようなビューを「部分テンプレート」（またはパーシャル）と呼びます。

```bash
$ mkdir app/views/shared
$ touch app/views/shared/_navbar.html.erb
```

では、ナビゲーションバーのHTMLを記述していきます。

```erb
<nav class="bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <%= link_to "TechLog", "/", class: "self-center text-white text-xl font-semibold whitespace-nowrap" %>
    <div class="w-full md:block md:w-auto">
      <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <% if current_user %>
          <li>
            <%= button_to "ログアウト", destroy_user_session_path, class: "block py-2 pr-4 pl-3 text-gray-200 hover:text-white border-b border-gray-700 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-white md:p-0", method: :delete %>
          </li>
        <% else %>
          <li>
            <%= link_to "ユーザー登録", new_user_registration_path, class: "block py-2 pr-4 pl-3 text-gray-200 hover:text-white border-b border-gray-700 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-white md:p-0" %>
          </li>
          <li>
            <%= link_to "ログイン", new_user_session_path, class: "block py-2 pr-4 pl-3 text-gray-200 hover:text-white border-b border-gray-700 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-white md:p-0" %>
          </li>
        <% end %>
      </ul>
    </div>
  </div>
</nav>
```

`current_user` は、Deviseで用意されているヘルパーメソッドです。ログインしていれば `current_user` にUserオブジェクトが入りますので、if文の条件分岐で利用しています。

ここで注意すべき点は、ログアウトリンクだけは `link_to` ではなく `button_to` を使用していることです。これは、デフォルトでは `link_to` に `method: :delete` をただ追加してもDELETEメソッドを実現できないためです。

参考：[【Ruby】link_to の destroy アクションが機能しないときの対処法](https://qiita.com/shizen-shin/items/40b8426da34cc2d170c7)

では、今回作成した部分テンプレートを `app/views/layouts/application.html.erb` に追記します。ついでにbodyなど他要素も編集しつつ、以下のように`<body>`タグ内を書き換えてください。

```erb
  ...略
  <body class="h-screen bg-blue-50">
    <%= render 'shared/navbar' %>
    <main class="container mx-auto mt-20 py-8 px-5 flex items-center justify-center">
      <%= yield %>
    </main>
  </body>
</html>
```

## テスト実行

実装が完了しましたので、テストがすべて成功することを確認します。

```bash
$ bin/rspec spec/system/home_spec.rb

...

  ナビゲーションバーの検証
    ログインしていない場合
      ユーザー登録リンクを表示する
      ログインリンクを表示する
      ログアウトリンクは表示しない
    ログインしている場合
      ユーザー登録リンクは表示しない
      ログインリンクは表示しない
      ログアウトリンクを表示する
      ログアウトリンクが機能する

Finished in 3.45 seconds (files took 0.41146 seconds to load)
8 examples, 0 failures
```

現時点ではまだユーザー登録画面がnicknameカラムに対応していませんが、RSpecでは`sign_in`というヘルパーメソッドのおかげで、統合テストとして確認することができました。

## 変更をコミット

これでナビゲーションバーの実装は完了です。変更をコミットしておきます。

```bash
$ git add .
$ git commit -m "ナビゲーションバーを追加"
$ git push
```

## まとめ

本章では、ナビゲーションバーを作成し、ユーザーのログイン状態に応じて表示を切り替える方法を学びました。部分テンプレートを使って共通のUIコンポーネントを作成し、レイアウトファイルに組み込む方法も理解できたと思います。

また、RSpecのシステムテストでDeviseのヘルパーメソッドを使用してログイン状態をシミュレートする方法も学びました。テスト駆動開発のアプローチで、まずはテストを書いてから実装を進めることで、仕様通りの機能が実現できていることを確認できました。

次章では、ユーザー登録画面をカスタマイズして、nicknameフィールドを追加していきます。
