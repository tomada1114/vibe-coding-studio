---
title: 投稿詳細ページにコメントフォームを追加しよう
nextjs:
  metadata:
    title: 投稿詳細ページにコメントフォームを追加しよう
    description: TechLog アプリケーションの投稿詳細ページにコメント投稿用のフォームを実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [投稿詳細ページの確認](#投稿詳細ページの確認)
- [コントローラーの修正](#コントローラーの修正)
- [コメントフォームの追加](#コメントフォームの追加)
  - [ネストされたリソースのフォーム](#ネストされたリソースのフォーム)
  - [条件分岐による表示制御](#条件分岐による表示制御)
- [動作確認](#動作確認)
  - [ログインしている場合](#ログインしている場合)
  - [ログアウトした場合](#ログアウトした場合)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- 投稿詳細ページに**コメントフォーム**を追加する方法を習得する
- **ネストされたリソース**向けのフォーム作成方法を理解する
- ログイン状態に応じた**条件分岐表示**の実装方法を学ぶ
- フォームの**スタイリング**と**ユーザー体験**向上のテクニックを理解する

## はじめに

前回のレッスンでは、コメント機能のためのルーティングを設定しました。これにより、URLの構造でコメントと投稿の関係が表現できるようになりました。しかし、まだユーザーがコメントを投稿するための入力フォームがありません。

今回は、投稿詳細ページにコメント投稿用のフォームを追加していきます。ユーザーがコメントを入力できるインターフェースを作成することで、コミュニケーション機能の第一歩が完成します。

コメントフォームは、ログインしているユーザーのみが使用できるように制限します。これにより、ログインしていないユーザーには「コメントを投稿するにはログインしてください」というメッセージを表示し、ユーザー登録やログインを促進することができます。

## 投稿詳細ページの確認

まずは現状の投稿詳細ページを確認しておきましょう。現在は、投稿のタイトルと内容、および投稿者の情報だけが表示されています。これに、コメントフォームと後々コメント一覧を追加していきます。

## コントローラーの修正

コメントフォームを追加するにあたり、まずは `PostsController` の `show` アクションを修正して、新しいコメントのためのインスタンス変数を追加します。

`app/controllers/posts_controller.rb` の `show` アクションを以下のように修正してください。

```ruby
def show
  @post = Post.find_by(id: params[:id])
  @comment = Comment.new  # 新規コメント用のインスタンスを作成
end
```

この変更により、投稿詳細ページでコメントフォームに必要な `@comment` インスタンス変数が利用可能になります。これは空の新しい `Comment` オブジェクトで、フォームの初期状態として使用されます。

## コメントフォームの追加

次に、投稿詳細ページにコメントフォームを追加します。`app/views/posts/show.html.erb` を開き、以下のように修正してください。

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

    <!-- コメントフォームを追加 -->
    <div class="bg-white p-6 shadow rounded mb-7">
      <h4 class="text-lg font-medium text-gray-800 mb-4">コメントを投稿する</h4>

      <% if user_signed_in? %>
        <%= form_with(model: [@post, @comment], url: post_comments_path(@post), class: "space-y-4") do |f| %>
          <div>
            <%= f.text_area :content,
                  rows: 3,
                  placeholder: "コメントを入力してください...",
                  class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2" %>
          </div>
          <div class="text-right">
            <%= f.submit "コメントする",
                  class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" %>
          </div>
        <% end %>
      <% else %>
        <div class="bg-gray-100 p-4 rounded-md text-center">
          <p class="text-gray-600">コメントを投稿するには<%= link_to "ログイン", new_user_session_path, class: "text-indigo-600 hover:text-indigo-800 font-medium" %>してください。</p>
        </div>
      <% end %>
    </div>

    <!-- ここにコメント一覧を表示（次のレッスンで実装） -->

  </div>
</div>
```

このコードでは、投稿詳細カードの下に新しいセクションを追加して、コメント投稿フォームを表示しています。主要な部分について詳しく説明します。

※ついでに少しコードを整理して、HTMLタグ構造を整えている部分もありますが、全体の流れは変わっていません。

### ネストされたリソースのフォーム

コメントフォームの核となるのは、`form_with` ヘルパーメソッドです。

```html
<%= form_with(model: [@post, @comment], url: post_comments_path(@post), class: "space-y-4") do |f| %>
```

いくつかポイントを解説します。

1. `model: [@post, @comment]` - 親リソース（投稿）と子リソース（コメント）を配列で指定しています。これは、ネストされたリソースのフォームを作成する際の標準的な書き方です。

2. `url: post_comments_path(@post)` - フォームの送信先URLを明示的に指定しています。これは `/posts/:post_id/comments` のようなパスを生成します。

3. `class: "space-y-4"` - Tailwind CSS のクラスを指定して、フォーム要素間の間隔を調整しています。

フォーム内では、`text_area` フィールドを使ってコメント内容の入力欄を作成し、`submit` ボタンでフォームの送信を行います。

### 条件分岐による表示制御

このコードでは、ユーザーのログイン状態に応じて表示内容を切り替えています。

```html
<% if user_signed_in? %>
  <!-- コメントフォーム表示 -->
<% else %>
  <div class="bg-gray-100 p-4 rounded-md text-center">
    <p class="text-gray-600">コメントを投稿するには<%= link_to "ログイン", new_user_session_path, class: "text-indigo-600 hover:text-indigo-800 font-medium" %>してください。</p>
  </div>
<% end %>
```

ログインしているユーザーには通常のコメントフォームを表示し、ログインしていないユーザーには「コメントを投稿するにはログインしてください」というメッセージとログインへのリンクを表示します。これにより、未ログインのユーザーに対してもユーザー登録を促すことができ、アプリケーションの活性化に繋がります。

このような条件分岐は、ユーザー体験を向上させるために非常に重要です。ユーザーの状態に応じて適切なインターフェースを提供することで、ユーザーフレンドリーなアプリケーションになります。

## 動作確認

ここまでの実装で、投稿詳細ページにコメントフォームが追加されたはずです。実際にアプリケーションを起動して確認してみましょう。

```bash
$ bin/dev
```

ブラウザで投稿詳細ページ (`http://localhost:3000/posts/1` など) にアクセスして、以下の点を確認してください。

### ログインしている場合

![ログインしている場合にコメントフォームが表示される](/img/rails/comment-form-logged-in-mockup.png)

- コメントフォームが表示されるか
- フォームに内容を入力できるか
- ボタンのスタイルが適切に表示されるか

### ログアウトした場合

![ログアウトした場合にログインを促すメッセージが表示される](/img/rails/comment-form-logged-out-mockup.png)

- ログインを促すメッセージが表示されるか
- ログインへのリンクが機能するか

ただし、まだコメント投稿機能自体は実装していないので、「コメントする」ボタンをクリックしてもエラーになります。次のレッスンで、実際のコメント投稿機能を実装していきます。

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "投稿詳細ページにコメントフォームを追加"
$ git push
```

## まとめ

本章では、投稿詳細ページにコメントフォームを追加する方法を学びました。ネストされたリソースのフォーム作成方法や、ログイン状態に応じた条件分岐表示など、実践的な技術を習得しました。

具体的には、以下の内容を実装しました。

- 投稿詳細ページに**コメント投稿用のフォーム**を追加
- **ネストされたリソース**を扱うためのフォーム設定
- **ログイン状態に応じた表示切替**による使いやすいUI

コメントフォームの見た目が整いましたが、まだ実際のコメント投稿機能は実装していません。次のレッスンでは、コメントフォームから送信されたデータを処理し、実際にコメントを保存する機能を実装していきます。

この後、コメント一覧表示機能も追加して、ユーザー間のコミュニケーションを可能にしていきましょう。
