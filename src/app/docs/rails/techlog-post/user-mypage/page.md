---
title: ユーザーマイページを作成しよう
nextjs:
  metadata:
    title: ユーザーマイページを作成しよう
    description: TechLog アプリケーションにユーザー固有の投稿一覧を表示するマイページ機能を実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [UsersControllerの作成とその役割](#userscontrollerの作成とその役割)
- [ルーティングの設定：URLとコントローラーの関連付け](#ルーティングの設定urlとコントローラーの関連付け)
- [ユーザーマイページのビュー作成](#ユーザーマイページのビュー作成)
- [ニックネームのリンク化](#ニックネームのリンク化)
- [テストの追加](#テストの追加)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)

## 学習の目標

本章では、以下の内容を学習します。

- ユーザーごとの投稿を表示するマイページの実装方法を理解する
- 既存コンポーネントからユーザーページへのリンク設定方法を習得する
- 条件分岐を使った表示制御の実装方法を学ぶ
- 日付フォーマットの整形方法を理解する

## はじめに

今回は、ユーザーのマイページを実装していきます。マイページでは、特定のユーザーが投稿した学習ログを一覧で表示します。

この機能を追加することで、ユーザーは特定の人がどのような学習をしているかを簡単に確認できるようになり、ユーザー間のつながりも生まれやすくなります。まずはユーザーページを表示するためのコントローラーを作成することから始めましょう。

## UsersControllerの作成とその役割

今回は「Users」という名前のコントローラーを作成します。Devise で既に User モデルは作っていましたが、新たにユーザー関連のページを作るには、それに対応するコントローラーが必要です。

ターミナルで以下のコマンドを実行しましょう。

```bash
$ bin/rails g controller users show

      create  app/controllers/users_controller.rb
       route  get "users/show"
      invoke  tailwindcss
      create    app/views/users
      create    app/views/users/show.html.erb
      invoke  rspec
      create    spec/requests/users_spec.rb
      create    spec/views/users
      create    spec/views/users/show.html.tailwindcss_spec.rb
```

今回も `spec/views` は不要ですので、削除しておきましょう。

```bash
$ rm -rf spec/views/users
```

また、今回はRequests Specは省略しますので、`spec/requests/users_spec.rb` も削除しておきましょう。

```bash
$ rm spec/requests/users_spec.rb
```

生成されたコントローラーファイルを次のように編集していきましょう。

app/controllers/users_controller.rb

```ruby
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id]) # URLパラメータのidを使ってユーザーを検索
    @posts = @user.posts.order(created_at: :desc) # ユーザーに紐づく投稿を新しい順に取得
    @posts_count = @posts.count # 投稿の総数を計算
  end
end
```

まず、URLに含まれるidパラメータを使って特定のユーザーを検索します。たとえば、「/users/5」というURLにアクセスすると、idが5のユーザーを検索します。「User.find(params[:id])」という部分がその処理を担当しています。

次に、そのユーザーに紐づく投稿を**「created_at: :desc」**という条件で取得しています。これは投稿を作成日時の新しい順（降順）で並べるという意味です。新しい投稿ほど上に表示されるため、ユーザーにとって最新の情報を確認しやすくなります。

最後に、投稿の総数を計算して **@posts_count** という変数に格納しています。これはビュー側で簡単に投稿数を表示するために用意しています。

なお、このコントローラーには **authenticate_user!** のような認証機能は設定していません。これは、ログインしていないユーザーでも他のユーザーのページを閲覧できるようにするためです。公開プロフィールのような扱いになります。

## ルーティングの設定：URLとコントローラーの関連付け

コントローラーを作成したら、次はルーティングの設定を確認しましょう。ルーティングとは、特定のURLへのアクセスがどのコントローラーのどのアクションを実行するかを定義するものです。

先ほどのジェネレーターコマンドによって、「config/routes.rb」ファイルにルーティングが追加されていますが、そちらは削除して新たに設定を追加します。

```ruby
Rails.application.routes.draw do
  devise_for :users
  root 'home#top'
  resources :posts, only: [:index, :new, :create, :show, :destroy]
  resources :users, only: [:show] # 追加
end
```

この設定により、「/users/1」のようなURLにアクセスすると、UsersControllerのshowアクションが実行され、IDが1のユーザーの情報が表示されるようになります。

## ユーザーマイページのビュー作成

コントローラーとルーティングの設定が完了したら、次はユーザーマイページのビューを作成します。ビューファイルは「app/views/users/show.html.erb」として既に生成されているはずです。このファイルを以下のように編集しましょう。

app/views/users/show.html.erb

```html
<div class="space-y-6 w-3/4 max-w-lg">
  <h2 class="text-xl font-bold text-gray-900 mb-4"><%= @user.nickname %>さんの学習ログ一覧</h2>
  <p class="text-gray-600 mb-4">全投稿数: <%= @post_count %>件</p>

  <% if @posts.empty? %>
    <div class="bg-white rounded-lg shadow-sm p-6 text-center">
      <p class="text-gray-600">まだ投稿がありません。</p>
    </div>
  <% else %>
    <div class="space-y-6">
      <% @posts.each do |post| %>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 class="text-lg font-medium text-gray-800">
              <%= link_to post.title, post_path(post), class: "hover:text-indigo-600" %>
            </h3>
            <span class="text-sm text-gray-500"><%= post.created_at.strftime("%Y年%m月%d日") %></span>
          </div>
          <div class="mt-3">
            <p class="text-gray-600 line-clamp-3"><%= post.content %></p>
          </div>
        </div>
      <% end %>
    </div>
  <% end %>
</div>
```

ここでは、ユーザーのニックネームと投稿数を表示する部分から始めています。次に、そのユーザーの投稿一覧を表示するためのループ処理を記述しています。

![ユーザーマイページの表示例](/img/rails/user-posts-with-content.png)

ループ処理自体は投稿一覧ページと同じようになっていますが、こちらでは条件分岐を使っています。もしユーザーがまだ投稿をしていない場合は、「まだ投稿がありません。」というメッセージを表示するようにしています。

![投稿がない場合のマイページ表示](/img/rails/user-no-posts.png)

こうすることで、まだ投稿がないユーザーにも適切なメッセージを表示することができます。

## ニックネームのリンク化

ユーザーマイページを作成しただけなので、マイページへのリンクが必要ですね。そこで、既存の投稿一覧ページと詳細ページにある投稿者のニックネームをリンクにして、そのユーザーのマイページに簡単にアクセスできるようにしましょう。

まず、投稿一覧ページ（`app/views/posts/index.html.erb`）を次のように修正します。

```html
<div class="space-y-6 w-3/4 max-w-lg">
  <label class="block text-xl font-bold text-gray-700">学習ログ一覧</label>

  <div class="items-center justify-center">
    <% @posts.each do |post| %>
      <div class="focus:outline-none mb-7 bg-white p-6 shadow rounded">
        <div class="flex items-center border-b border-gray-200 pb-6">
          <div class="flex items-start justify-between w-full">
            <div class="pl-3">
              <p class="focus:outline-none text-lg font-medium leading-5 text-gray-800"><%= link_to post.title, post_path(post) %></p>
              <p class="focus:outline-none text-sm leading-normal pt-2 text-gray-500">by <%= link_to post.user.nickname, user_path(post.user), class: "hover:text-indigo-600 hover:font-bold" %></p>
            </div>
          </div>
        </div>
        <div class="px-2">
          <p class="focus:outline-none text-sm leading-5 py-4 text-gray-600 line-clamp-3 overflow-hidden"><%= post.content %></p>
        </div>
      </div>
    <% end %>
  </div>
</div>
```

変更したのは `by <%= post.user.nickname %>` という部分です。これを `by <%= link_to post.user.nickname, user_path(post.user), class: "hover:text-indigo-600 hover:font-bold" %>` に置き換えています。

「link_to」ヘルパーを使うことで、ニックネームをリンクに変換しています。なお、「user_path(post.user)」は、そのユーザーの詳細ページへのパスを生成するヘルパーメソッドです。また、マウスを乗せたときの挙動を設定するために、`hover` 系のクラスを追加しています。

次に、投稿詳細ページ（`app/views/posts/show.html.erb`）も同様に修正します。

```html
<div class="space-y-6 w-3/4 max-w-lg">
  <label class="block text-xl font-bold text-gray-700">学習ログ詳細</label>

  <div class="items-center justify-center">
    <div tabindex="0" aria-label="card 1" class="focus:outline-none mb-7 bg-white p-6 shadow rounded">
      <div class="flex items-center border-b border-gray-200 pb-6">
        <div class="flex items-start justify-between w-full">
          <div class="pl-3">
            <h3 class="focus:outline-none text-lg font-medium leading-5 text-gray-800"><%= @post.title %></h3>
            <p class="focus:outline-none text-sm leading-normal pt-2 text-gray-500">by <%= link_to @post.user.nickname, user_path(@post.user), class: "hover:text-indigo-600 hover:font-bold" %></p>
          </div>
          <% if user_signed_in? %>
            <% if @post.user_id == current_user.id %>
              <%= button_to "削除", post_path(@post), method: :delete, class: "text-sm bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded hover:cursor-pointer" %>
            <% end %>
          <% end %>
        </div>
      </div>
      <div class="px-2">
        <p class="focus:outline-none text-sm leading-5 py-4 text-gray-600"><%= @post.content %></p>
      </div>
    </div>
  </div>
</div>
```

こちらも同様に、「by <%= @post.user.nickname %>」という部分を「by <%= link_to @post.user.nickname, user_path(@post.user), class: "hover:text-indigo-600 hover:font-bold" %>」に置き換えています。これにより、投稿詳細ページからもユーザーのマイページにアクセスできるようになります。

## テストの追加

より実際のユーザー体験に近いテストを行うシステムスペック（`spec/system/users_spec.rb`）を作成します。

```ruby
# ...

  # ...

  describe 'ユーザーページの検証' do
    before do
      @user = create(:user)
      @post = create(:post, title: 'テスト投稿', content: 'ユーザーページ表示テスト', user: @user)
      visit "/users/#{@user.id}" # ユーザー詳細ページにアクセス
    end

    it 'ユーザー情報が表示される' do
      expect(page).to have_content(@user.nickname) # ニックネームが表示されていることを確認
      expect(page).to have_content("投稿数: 1件") # 投稿数が表示されていることを確認
    end

    it '投稿一覧が表示される' do
      expect(page).to have_content('テスト投稿') # 投稿のタイトルが表示されていることを確認
      expect(page).to have_content('ユーザーページ表示テスト') # 投稿の内容が表示されていることを確認
    end

    it '投稿の詳細ページへのリンクが機能する' do
      click_link 'テスト投稿' # 投稿のタイトルをクリック
      expect(current_path).to eq("/posts/#{@post.id}") # 投稿詳細ページに遷移していることを確認
    end
  end

end
```

ここでは、ユーザーページにアクセスしたときの挙動をテストしています。

「ユーザー情報が表示される」というテストでは、ユーザーのニックネームと投稿数が表示されているかを確認しています。「投稿一覧が表示される」というテストでは、投稿のタイトルと内容が表示されているかを確認しています。最後に、「投稿の詳細ページへのリンクが機能する」というテストでは、投稿のタイトルをクリックしたときに正しく詳細ページに遷移するかを確認しています。

では、テストを実行してみましょう。

```bash
$ bin/rspec

...

Finished in 1.37 seconds (files took 0.23572 seconds to load)
63 examples, 0 failures
```

すべてのテストがパスすれば、ユーザーページの実装が正しく行われていることが確認できます。

## 変更をコミット

ここまでの変更をコミットして、実装を完了させましょう。

```bash
$ git add .
$ git commit -m "ユーザーマイページを実装"
$ git push
```

## まとめ

本章では、ユーザーごとの投稿を表示するマイページ機能を実装しました。この機能により、以下のことが可能になりました。

- 特定のユーザーが投稿した学習ログを一覧で確認できる
- 投稿者のニックネームをクリックすることで、そのユーザーのマイページに移動できる
- まだ投稿がないユーザーに対しても適切なメッセージを表示できる

また、技術的には以下の点を学びました。

- ユーザー情報と投稿の関連付けを活用したコントローラーの実装方法
- ユーザーに関連する投稿を取得するための ActiveRecord の使い方
- 条件分岐を使った表示の切り替え方
- 日付の表示形式をカスタマイズする方法

今後は、さらに機能を拡張して、より充実したユーザー体験を提供できるようにしていきましょう。
