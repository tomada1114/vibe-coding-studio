---
title: 学習ログ投稿機能を作成しよう
nextjs:
  metadata:
    title: 学習ログ投稿機能を作成しよう
    description: TechLog アプリケーションで学習ログを投稿するページと機能を実装します
---

- [学習の目標](#学習の目標)
- [PostController 作成](#postcontroller-作成)
- [ルーティングの修正](#ルーティングの修正)
- [動作確認](#動作確認)
- [投稿機能の実装](#投稿機能の実装)
  - [before\_action](#before_action)
  - [new アクション](#new-アクション)
  - [create アクション](#create-アクション)
- [投稿画面の修正](#投稿画面の修正)
- [翻訳ファイル修正](#翻訳ファイル修正)
- [ナビゲーションバーにリンク追加](#ナビゲーションバーにリンク追加)
- [動作確認](#動作確認-1)
  - [初期表示](#初期表示)
  - [投稿成功時](#投稿成功時)
  - [投稿失敗時](#投稿失敗時)
  - [ログアウト時](#ログアウト時)
  - [ナビゲーションバー（ログイン時）](#ナビゲーションバーログイン時)
  - [ナビゲーションバー（ログアウト時）](#ナビゲーションバーログアウト時)
- [テスト作成](#テスト作成)
  - [Request Spec](#request-spec)
  - [System Spec（投稿機能）](#system-spec投稿機能)
  - [System Spec（ナビゲーションバー）](#system-specナビゲーションバー)
- [変更をコミット](#変更をコミット)
- [補足：authenticate\_user!](#補足authenticate_user)


今回は、TechLog アプリケーションの中心的な機能である学習ログを投稿するページと機能を作成していきます。機能追加に伴い学ぶことも多いですが、一歩ずつ確実に進めていきましょう。

## 学習の目標

本章では、以下の内容を学習します。

- 学習ログを投稿するためのページを作成する
- 投稿機能を実装する
- 投稿機能のテストを作成する
- ナビゲーションバーに投稿ページへのリンクを追加する

## PostController 作成

まずは、`rails g` コマンドを使用して、投稿機能に必要なコントローラーファイルを生成します。今回は、よく使われる基本的なアクションとして、`index`（一覧表示）、`new`（新規作成フォーム）、`create`（データ保存）、`show`（詳細表示）、`destroy`（削除）のアクションを用意しましょう。

```bash
$ bin/rails g controller posts index new create show destroy

      create  app/controllers/posts_controller.rb
       route  get "posts/index"
              get "posts/new"
              get "posts/create"
              get "posts/show"
              get "posts/destroy"
      invoke  tailwindcss
      create    app/views/posts
      create    app/views/posts/index.html.erb
      create    app/views/posts/new.html.erb
      create    app/views/posts/create.html.erb
      create    app/views/posts/show.html.erb
      create    app/views/posts/destroy.html.erb
      invoke  rspec
      create    spec/requests/posts_spec.rb
      create    spec/views/posts
      create    spec/views/posts/index.html.tailwindcss_spec.rb
      create    spec/views/posts/new.html.tailwindcss_spec.rb
      create    spec/views/posts/create.html.tailwindcss_spec.rb
      create    spec/views/posts/show.html.tailwindcss_spec.rb
      create    spec/views/posts/destroy.html.tailwindcss_spec.rb
```

上記のコマンドによって、コントローラーファイル、ビューファイル、テストファイルなどが生成されました。ただし、生成されたファイルの中には使用しないものもあります。以下のビューファイルは不要なので削除しておきましょう。

```bash
app/views/posts/index.html.erb
app/views/posts/destroy.html.erb
```

また、ビューのテストファイルも今回は使用しないので、以下のコマンドで削除します。

```bash
$ rm -rf spec/views
```

これで基本的なファイルが生成されました。次は、これらのファイルを編集していきます。

テスト駆動開発（TDD）のアプローチは、ユーザー認証機能の実装で既に体験したので、今回は先に機能の実装を進めていきます。これにより、実装の流れがより理解しやすくなるでしょう。

## ルーティングの修正

`rails g` コマンドで自動生成されたルーティングは、RESTfulなルーティングとしては適切ではありません。Rails では、基本的なCRUD操作のためのルーティングを `resources` メソッドで簡単に設定できます。

config/routes.rb ファイルを以下のように修正しましょう。

```ruby
Rails.application.routes.draw do
  devise_for :users
  root 'home#top'
  resources :posts, only: [:index, :new, :create, :show, :destroy] # 追加
end
```

ここで使用している `resources` メソッドは、RESTfulなルーティングを一括で設定するための便利な方法です。標準では、`index`、`show`、`new`、`create`、`edit`、`update`、`destroy` の7つのアクションに対応するルーティングが生成されます。

しかし、今回の TechLog アプリケーションでは投稿の編集機能は必要ないため、`only` オプションを使って必要なアクションだけを指定しています。これにより、`edit` と `update` アクションに関連するルーティングは生成されません。

## 動作確認

この時点で開発用サーバを起動（`bin/dev`）して、`http://127.0.0.1:3000/posts/new` にアクセスすると、自動生成された `new.html.erb` の内容が表示されるはずです。次は、実際の投稿機能を実装していきましょう。

## 投稿機能の実装

まずは、PostsController を以下のように修正します。このコントローラーは投稿の作成や表示などの処理を担当します。

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create] # ログインしているかどうかを判断

  def index
  end

  def new
    @post = Post.new # 新規投稿用のインスタンス変数を用意
  end

  def create
    @post = Post.new(post_params) # ストロングパラメータを使ってフォームから受け取ったパラメータを許可
    @post.user_id = current_user.id # ログインユーザのIDを代入して関連付け

    if @post.save
      flash[:notice] = '投稿しました' # 成功時のフラッシュメッセージ
      redirect_to root_path # 一時的にトップページへリダイレクト(後に修正)
    else
      flash[:alert] = '投稿に失敗しました' # 失敗時のフラッシュメッセージ
      render :new # 投稿画面を再表示
    end
  end

  def show
  end

  def destroy
  end

  private

  # ストロングパラメータで許可するカラムを指定
  def post_params
    params.require(:post).permit(:title, :content) # title と content のみ許可
  end
end
```

このコントローラーには、いくつかの重要な機能が実装されています。

### before_action

`before_action :authenticate_user!, only: [:new, :create]` の行によって、`new` と `create` アクションが実行される前に、ユーザーがログインしているかどうかをチェックしています。

`before_action` は、指定したアクションが実行される前に、指定したメソッドを実行する仕組みです。ここでは、Devise が提供する `authenticate_user!` というヘルパーメソッドを使用しています。このメソッドは、ユーザーがログインしていない場合に自動的にログインページへリダイレクトします。

この設定により、ログインしていないユーザーは投稿機能を使用できなくなります。ただし、`index` と `show` アクションはこの制約から除外されているため、誰でもアクセスできます。

### new アクション

`new` アクションでは、新しい投稿を作成するためのフォームで使用する空の `Post` オブジェクトを準備しています。`@post = Post.new` によって作成された変数は、ビュー（`new.html.erb`）で使用されます。

### create アクション

`create` アクションは投稿を実際にデータベースに保存する処理を行います。ここでは以下のステップを実行しています：

1. ストロングパラメータによって安全に処理されたフォームデータから新しい `Post` オブジェクトを作成
2. 現在ログインしているユーザーの ID を投稿に関連付け
3. 投稿の保存を試みる
4. 保存に成功したら成功メッセージを表示して、トップページにリダイレクト
5. 保存に失敗したら失敗メッセージを表示して、投稿フォームを再表示

ストロングパラメータは、フォームから送信されるデータを制限するセキュリティ機能です。ここでは、`title` と `content` のパラメータのみを許可しています。

## 投稿画面の修正

次に、投稿画面を用意します。`rails g` コマンドで自動生成された `new.html.erb` ファイルを以下のように修正しましょう。

app/views/posts/new.html.erb

```html
<%= form_with model: @post, class: "space-y-6 w-3/4 max-w-lg bg-white p-6 rounded-lg shadow" do |f| %>
  <label class="block text-xl font-bold text-gray-700">学習ログ投稿</label>

  <div class="mt-1">
    <label class="text-gray-700 text-lg">
      タイトル
    </label>
    <%= f.text_field :title, class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "Railsチュートリアル1章を完了" %>
  </div>

  <div class="mt-1">
    <label class="text-gray-700 text-lg">
      本文
    </label>
    <%= f.text_area :content, rows: "5", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "環境構築を無事に終えることができた！" %>
  </div>

  <p class="mt-2 text-sm text-gray-500">
    学習したこと、開発したことを記録しましょう。
  </p>

  <div class="px-4 py-3 text-right sm:px-6">
    <%= f.submit "ログを記録", class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer" %>
  </div>
<% end %>
```

このフォームには、以下の要素が含まれています：

- `form_with` ヘルパーメソッドを使用して、`@post` モデルとフォームを関連付け
- タイトル入力用の `text_field`
- 本文入力用の `text_area`
- 投稿ボタン（`submit`）

また、TailwindCSS を使ってスタイリングを適用しています。これにより、見た目の良いフォームが作成されます。

実際にブラウザで確認すると、以下のような画面が表示されるはずです：

![投稿フォーム画面](/img/rails/post-form-screen.png)

なお、投稿機能はログインしている状態でなければ使用できないので、ログインしていない状態ではアクセスできないことも確認しておきましょう。

## 翻訳ファイル修正

投稿機能では、ログインを必要とする設定をしているため、ログインしていない状態で投稿ページにアクセスしようとすると、ログインを促すメッセージが表示されます。このメッセージの日本語表示を設定するために、翻訳ファイルを修正します。

config/locales/devise.ja.yml に以下の行を追加しましょう：

```ruby
...
  devise:
    failure:
      invalid: "%{authentication_keys}またはパスワードが違います。"
      user: # 追加
        unauthenticated: "ログインしてください。" # 追加
      ...
```

これにより、ログインしていない状態で投稿ページにアクセスしようとすると、「ログインしてください。」という日本語のメッセージが表示されるようになります。

![ログインを促すメッセージ](/img/rails/login-required-message.png)


## ナビゲーションバーにリンク追加

次に、ナビゲーションバーに投稿ページへのリンクを追加します。投稿機能はログインしているユーザーのみが使用できるため、このリンクもログイン状態のときだけ表示されるようにします。

app/views/shared/_navbar.html.erb を以下のように修正します：

```ruby
       ...
        <% if current_user %>
          <%# ここから追加 %>
          <li>
            <%= link_to "ログ投稿", new_post_path, class: "block py-2 pr-4 pl-3 text-gray-200 hover:text-white border-b border-gray-700 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-white md:p-0" %>
          </li>
          <%# ここまで追加 %>
          <li>
            <%= button_to "ログアウト", destroy_user_session_path, class: "block py-2 pr-4 pl-3 text-gray-200 hover:text-white border-b border-gray-700 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-white md:p-0", method: :delete %>
          </li>
        <% else %>
        ...
```

この修正により、ログインしているときにはナビゲーションバーに「ログ投稿」というリンクが表示されるようになります。

## 動作確認

実装が完了したら、各機能の動作確認を行いましょう。

### 初期表示

開発用サーバを起動し、`http://127.0.0.1:3000/posts/new` にアクセスします。ログインしていれば、投稿フォームが表示されます。

![投稿フォーム](/img/rails/post-form-display.png)

### 投稿成功時

適当なタイトルと本文を入力して「ログを記録」ボタンをクリックすると、成功メッセージとともにトップページにリダイレクトされます。

![投稿成功時](/img/rails/post-success.png)

### 投稿失敗時

タイトルまたは本文を空欄にして「ログを記録」ボタンをクリックすると、失敗メッセージとともに投稿フォームが再表示されます。入力していた内容（この場合はタイトル）は保持されています。

![投稿失敗時](/img/rails/post-failure.png)

これは、`render` メソッドを使用しているためです。`render` メソッドは、新しくアクションを実行せずに、指定したビューを表示します。そのため、`@post` インスタンス変数に保存されている入力内容がそのまま使用されます。

### ログアウト時

ログアウトした状態で `http://127.0.0.1:3000/posts/new` に直接アクセスすると、ログインを促すメッセージとともにログイン画面にリダイレクトされます。

![ログアウト時](/img/rails/logged-out-access.png)

### ナビゲーションバー（ログイン時）

ログイン時には、ナビゲーションバーに「ログ投稿」リンクが表示されています。

![ナビゲーションバー（ログイン時）](/img/rails/navbar-logged-in.png)

### ナビゲーションバー（ログアウト時）

ログアウト時には、「ログ投稿」リンクは表示されていません。

![ナビゲーションバー（ログアウト時）](/img/rails/navbar-logged-out.png)

## テスト作成

機能の実装が完了したので、次はこれらの動作を確認するためのテストを作成しましょう。

### Request Spec

まずは、投稿ページへのアクセスを確認する Request Spec を作成します。このテストでは、ログイン状態によってアクセス可否が異なることを確認します。

spec/requests/posts_spec.rb

```ruby
require 'rails_helper'

RSpec.describe 'Posts', type: :request do
  before { @user = create(:user) } # 各テストで使用できるユーザーを作成

  describe 'GET /posts/new' do
    context 'ログインしていない場合' do
      it 'HTTPステータス302を返す' do
        get '/posts/new'
        expect(response).to have_http_status(302)
      end

      it 'ログインページにリダイレクトされる' do
        get '/posts/new'
        expect(response).to redirect_to '/users/sign_in'
      end
    end

    context 'ログインしている場合' do
      before { sign_in @user }

      it 'HTTPステータス200を返す' do
        get '/posts/new'
        expect(response).to have_http_status(200)
      end

      it 'ログインページにリダイレクトされない' do
        get '/posts/new'
        expect(response).not_to redirect_to '/users/sign_in'
      end
    end
  end
end
```

テストを実行すると、次のようなエラーが発生する可能性があります：

```bash
$ bin/rspec spec/requests/posts_spec.rb
...
  1) Posts GET /posts/new ログインしている場合 HTTPステータス200を返す
     Failure/Error: before { sign_in @user }
     NoMethodError:
       undefined method `sign_in' for #<RSpec::ExampleGroups::Posts::GETPostsNew::Nested_2 "HTTPステータス200を返す" (./spec/requests/posts_spec.rb:21)>
     # ./spec/requests/posts_spec.rb:20:in `block (4 levels) in <top (required)>'
...
```

これは、Request Spec で `sign_in` メソッドを使用するための設定が不足しているためです。spec/rails_helper.rb ファイルに以下の行を追加しましょう：

```ruby
  config.include Devise::Test::IntegrationHelpers, type: :system
  config.include Devise::Test::IntegrationHelpers, type: :request # 追加
end
```

この設定により、Request Spec でも `sign_in` メソッドが使用できるようになります。再度テストを実行してみましょう：

```bash
$ bin/rspec spec/requests/posts_spec.rb

Posts
  GET /posts/new
    ログインしていない場合
      HTTPステータス302を返す
      ログインページにリダイレクトされる
    ログインしている場合
      HTTPステータス200を返す
      ログインページにリダイレクトされない

Finished in 0.20681 seconds (files took 1.33 seconds to load)
4 examples, 0 failures
```

これで Request Spec は完了です。

### System Spec（投稿機能）

次に、ブラウザ操作を含む System Spec を作成します。まずはファイルを生成しましょう：

```bash
$ bin/rails g rspec:system posts
      create  spec/system/posts_spec.rb
```

生成された spec/system/posts_spec.rb ファイルを以下のように編集します：

```ruby
require 'rails_helper'

describe 'Post', type: :system do
  before do
    driven_by :rack_test
    @user = create(:user) # ログイン用ユーザー作成
  end

  # 投稿フォーム
  let(:title) { 'テストタイトル' }
  let(:content) { 'テスト本文' }

  describe 'ログ投稿機能の検証' do
    # ログ投稿を行う一連の操作を subject にまとめる
    subject do
      fill_in 'post_title', with: title
      fill_in 'post_content', with: content
      click_button 'ログを記録'
    end

    context 'ログインしていない場合' do
      before { visit '/posts/new' }

      it 'ログインページへリダイレクトする' do
        expect(current_path).to eq('/users/sign_in')
        expect(page).to have_content('ログインしてください。')
      end
    end

    context 'ログインしている場合' do
      before do
        sign_in @user
        visit '/posts/new'
      end

      it 'ログインページへリダイレクトしない' do
        expect(current_path).not_to eq('/users/sign_in')
      end

      context 'パラメータが正常な場合' do
        it 'Postを作成できる' do
          expect { subject }.to change(Post, :count).by(1)
          expect(current_path).to eq('/')
          expect(page).to have_content('投稿しました')
        end
      end

      context 'パラメータが異常な場合' do
        let(:title) { nil }

        it 'Postを作成できない' do
          expect { subject }.not_to change(Post, :count)
          expect(page).to have_content('投稿に失敗しました')
        end

        it '入力していた内容は維持される' do
          subject
          expect(page).to have_field('post_content', with: content)
        end
      end
    end
  end
end
```

このテストでは、以下の点を検証しています：

1. ログインしていない場合、投稿ページへのアクセスはログインページにリダイレクトされる
2. ログインしている場合：
   - 投稿ページにアクセスできる
   - 正常なパラメータで投稿を作成できる
   - 異常なパラメータでは投稿を作成できない
   - 投稿に失敗しても入力内容は維持される

System Spec で効率的にテストするために、フォーム入力と送信の操作を `subject` にまとめています。

### System Spec（ナビゲーションバー）

最後に、ナビゲーションバーのリンク表示に関するテストを追加します。既存の Home の System Spec を修正しましょう。

spec/system/home_spec.rb に以下の部分を追加します：

```ruby
...
  describe 'ナビゲーションバーの検証' do
    context 'ログインしていない場合' do
      ...
      it 'ログ投稿リンクを表示しない' do # 追加
        expect(page).not_to have_link('ログ投稿', href: '/posts/new')
      end
      it 'ログアウトリンクは表示しない' do
        expect(page).not_to have_content('ログアウト')
      end
    ...
    context 'ログインしている場合' do
      ...
      it 'ログ投稿リンクを表示する' do # 追加
        expect(page).to have_link('ログ投稿', href: '/posts/new')
      end
      it 'ログアウトリンクを表示する' do
        expect(page).to have_content('ログアウト')
      end
...
```

これらのテストにより、ログイン状態に応じたナビゲーションバーのリンク表示を検証できます。

すべてのテストが通ることを確認しましょう：

```bash
$ bin/rspec

...

Finished in 11.06 seconds (files took 0.38787 seconds to load)
48 examples, 0 failures
```

## 変更をコミット

ここまでの変更をコミットしておきましょう：

```bash
$ git add .
$ git commit -m "学習ログ投稿機能を作成"
$ git push
```

## 補足：authenticate_user!

この実装では、投稿機能に `authenticate_user!` というメソッドを使用してログイン必須の制限を設けました。このメソッドは Devise が提供するヘルパーメソッドの一つです。

Devise には他にも便利なヘルパーメソッドが多数あります。さらに詳しく知りたい方は、以下の記事が参考になります：

- [Rails deviseで使えるようになるヘルパーメソッド一覧](https://qiita.com/tobita0000/items/866de191635e6d74e392)

今回は投稿機能の基本的な実装を行いました。次回は投稿の一覧表示や詳細表示などの機能を追加していきます。
