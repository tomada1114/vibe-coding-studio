---
title: 学習ログ一覧ページを作成しよう
nextjs:
  metadata:
    title: 学習ログ一覧ページを作成しよう
    description: TechLog アプリケーションで投稿した学習ログの一覧を表示するページを実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Controller の修正](#controller-の修正)
- [View の実装](#view-の実装)
- [ナビゲーションバーにリンク追加](#ナビゲーションバーにリンク追加)
- [投稿後のリダイレクト先の変更](#投稿後のリダイレクト先の変更)
- [System Spec の修正](#system-spec-の修正)
- [動作確認](#動作確認)
  - [ナビゲーションバーの確認](#ナビゲーションバーの確認)
  - [投稿一覧の確認](#投稿一覧の確認)
  - [投稿後のリダイレクト確認](#投稿後のリダイレクト確認)
- [テストの追加](#テストの追加)
  - [Request Spec の追加](#request-spec-の追加)
  - [System Spec の追加](#system-spec-の追加)
- [テスト実行](#テスト実行)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- 投稿一覧を表示するためのコントローラーアクションの実装方法を理解する
- 複数の投稿を表示するビューの作成方法を習得する
- ナビゲーションバーへのリンク追加方法を学ぶ
- リダイレクト先の変更とテストの更新方法を理解する

## はじめに

今回は、投稿した学習ログの一覧ページを作成していきます。ユーザーが登録した学習ログを一覧表示することで、過去の学習内容を振り返ったり、他のユーザーの学習内容を参考にしたりすることができるようになります。

具体的には、`index` アクションを実装して投稿一覧を表示するビューを作成します。また、ナビゲーションバーにリンクを追加することで、ユーザーが簡単に投稿一覧ページにアクセスできるようにします。

## Controller の修正

まずは、PostsController の `index` アクションを修正します。これまでは空の状態でしたが、投稿一覧を表示するための機能を追加しましょう。

app/controllers/posts_controller.rb

```ruby
def index
  @posts = Post.limit(10).order(created_at: :desc)
end
```

このコードでは、 `Post` モデルから最新の投稿を10件取得し、`@posts` というインスタンス変数に格納しています。

`limit(10)` メソッドは、取得するレコードの数を制限し、`order(created_at: :desc)` メソッドは、作成日時の降順で並べ替えています。

`created_at` は、Rails が自動的に生成するカラムで、レコードが作成された日時を保持しています。`desc` は降順を意味し、最新の投稿が最初に表示されるようになります。

この2つのメソッドを組み合わせることで、最新の投稿10件を取得できます。

## View の実装

次に、index アクション用のビューファイルを実装します。以下のコードをapp/views/posts/index.html.erbに追加してください。

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
              <p class="focus:outline-none text-sm leading-normal pt-2 text-gray-500">by <%= post.user.nickname %></p>
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

このビューでは、コントローラから渡された投稿データを `@posts.each` を使ってループ処理し、それぞれの投稿を表示しています。実装のポイントは以下の通りです。

まず、`@posts.each` を使って、取得した投稿データをループ処理しています。各投稿は `post` という変数で参照されます。

次に、`link_to` メソッドを使って、投稿のタイトルをクリックするとその投稿の詳細ページに遷移するようにしています。`post_path(post)` は、Rails のルーティングヘルパーで、指定した `post` の詳細ページへのパスを生成します。

さらに、投稿の内容は `line-clamp-3` クラスを使用して、3行まで表示し、それ以降は省略されるようにしています。これにより、長い投稿内容でも一覧ページが見やすくなります。

最後に、投稿の作成者のニックネームを表示しています。`post.user.nickname` を使って、関連するユーザーのニックネームを取得しています。

このビュー実装により、投稿一覧が適切にフォーマットされ、各投稿の重要な情報が一目で把握できるようになります。

## ナビゲーションバーにリンク追加

ユーザーが簡単に投稿一覧ページにアクセスできるように、ナビゲーションバーにリンクを追加します。投稿一覧はログイン状態に関わらず閲覧できるため、ログイン判定の外に配置します。

app/views/shared/_navbar.html.erb

```html
<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
  <!-- ここから追加 -->
  <li>
    <%= link_to "ログ一覧", posts_path, class: "block py-2 pr-4 pl-3 text-gray-200 hover:text-white border-b border-gray-700 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-white md:p-0" %>
  </li>
  <!-- 追加ここまで -->
  <% if current_user %>
    <!-- 既存のログイン時メニュー -->
```

この変更により、ナビゲーションバーに「ログ一覧」というリンクが追加され、クリックすると投稿一覧ページに移動できるようになります。

## 投稿後のリダイレクト先の変更

これまでは投稿成功後にトップページにリダイレクトしていましたが、今回は投稿一覧ページにリダイレクトするように変更します。

app/controllers/posts_controller.rb

```ruby
def create
  @post = Post.new(post_params)
  @post.user_id = current_user.id
  if @post.save
    flash[:notice] = '投稿しました'
    redirect_to posts_path # トップページから投稿一覧ページへ変更
  else
    flash[:alert] = '投稿に失敗しました'
    render :new
  end
end
```

この変更により、ユーザーが投稿した後すぐに自分の投稿を含む一覧ページを確認できるようになります。ユーザー体験として、投稿後にすぐに他の投稿も見たいというニーズに対応しています。

## System Spec の修正

投稿後のリダイレクト先を変更したので、テストも更新する必要があります。以下のように修正してください。

spec/system/posts_spec.rb

```ruby
context 'パラメータが正常な場合' do
  it 'Postを作成できる' do
    expect { subject }.to change(Post, :count).by(1)
    expect(current_path).to eq('/posts') # ルートパスから投稿一覧パスへ変更
    expect(page).to have_content('投稿しました')
  end
end
```

これで、テストも新しい動作に合わせて更新されました。

## 動作確認

実装が完了したら、実際に画面で動作を確認してみましょう。

### ナビゲーションバーの確認

開発用サーバを起動し、ナビゲーションバーに「ログ一覧」リンクが追加されていることを確認します。

![ナビゲーションバーにログ一覧リンクが追加された画面](/img/rails/navbar-with-posts-link.png)

### 投稿一覧の確認

「ログ一覧」リンクをクリックすると、`http://127.0.0.1:3000/posts` へアクセスして投稿の一覧画面が表示されます。

![投稿一覧画面](/img/rails/posts-index.png)

### 投稿後のリダイレクト確認

新規投稿ページから投稿を行うと、投稿一覧ページへ自動的にリダイレクトされ、投稿成功のメッセージが表示されることを確認します。

![投稿後のリダイレクト画面](/img/rails/post-redirect-index.png)

## テストの追加

新しく実装した機能を保証するためのテストを追加しましょう。

### Request Spec の追加

一覧ページへのアクセスを確認するためのテストを追加します。

spec/requests/posts_spec.rb

```ruby
# ...
describe 'GET /posts' do
  context 'ログインしていない場合' do
    it 'HTTPステータス200を返す' do
      get '/posts'
      expect(response).to have_http_status '200'
    end
  end

  context 'ログインしている場合' do
    it 'HTTPステータス200を返す' do
      sign_in @user
      get '/posts'
      expect(response).to have_http_status '200'
    end
  end
end
```

このテストでは、ログイン状態に関わらず投稿一覧ページにアクセスできることを確認しています。

### System Spec の追加

投稿一覧の表示内容を確認するためのテストを追加します。

spec/system/posts_spec.rb

```ruby
# ...
describe 'ログ一覧機能の検証' do
  before do
    # 事前にもう一つの投稿を作成
    @post2 = create(:post, title: 'RSpec学習完了 2', content: 'System Specを作成した 2', user_id: @user.id)
    visit '/posts'
  end

  it '1件目のPostの詳細が表示される' do
    expect(page).to have_content('RSpec学習完了')
    expect(page).to have_content('System Specを作成した')
    expect(page).to have_content(@user.nickname)
  end

  it '2件目のPostの詳細が表示される' do
    expect(page).to have_content('RSpec学習完了 2')
    expect(page).to have_content('System Specを作成した 2')
    expect(page).to have_content(@user.nickname)
  end

  it '投稿タイトルをクリックすると詳細ページへ遷移する' do
    click_link 'RSpec学習完了'
    expect(current_path).to eq("/posts/#{@post.id}")
  end
end
# ...
```

このテストでは、複数の投稿が一覧ページに表示されることと、タイトルをクリックすると詳細ページに遷移することを確認しています。

また、投稿成功時のリダイレクト先も変更したので、「ログ投稿機能の検証 > ログインしている場合 > パラメータが正常な場合」の既存テストも修正します。

```ruby
context 'パラメータが正常な場合' do
  it 'Postを作成できる' do
    expect { subject }.to change(Post, :count).by(1)
    expect(current_path).to eq('/posts') # 修正
    expect(page).to have_content('投稿しました')
  end
end
```

## テスト実行

最後に、すべてのテストを実行して問題がないことを確認します。

```bash
$ bin/rspec

Finished in 1.22 seconds (files took 0.18695 seconds to load)
56 examples, 0 failures
```

すべてのテストが通過していれば、実装は正常に完了しています。

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "学習ログ一覧ページを作成"
$ git push
```

## まとめ

本章では、TechLog アプリケーションに学習ログの一覧ページを実装しました。学んだ内容は以下の通りです。

- `limit` と `order` メソッドを使って、データベースから取得するレコードを制限し並べ替える方法
- 投稿一覧を表示するためのビューを作成する方法
- ナビゲーションバーにリンクを追加してユーザーの利便性を向上させる方法
- リダイレクト先を変更してユーザー体験を改善する方法
- 実装した機能に対するテストの追加と修正方法

これらの機能により、ユーザーは投稿した学習ログを一覧で確認できるようになり、アプリケーションの使いやすさが大幅に向上しました。次回は、投稿の削除機能を実装していきましょう。
