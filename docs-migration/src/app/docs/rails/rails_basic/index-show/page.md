---
title: Rails の index, show アクションを理解しよう
nextjs:
  metadata:
    title: Rails の index, show アクションを理解しよう
    description: Ruby on Railsのコントローラにおけるindex, showアクションの動作原理と役割を理解します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [コントローラの中身を書き換える](#コントローラの中身を書き換える)
- [indexアクション - すべてのレコードを取得](#indexアクション---すべてのレコードを取得)
  - [indexアクションの役割](#indexアクションの役割)
  - [モデル名とテーブル名の関係](#モデル名とテーブル名の関係)
  - [Post.allとは](#postallとは)
  - [コントローラからビューへの変数の受け渡し](#コントローラからビューへの変数の受け渡し)
- [showアクション - 特定のレコードを1つ取り出す](#showアクション---特定のレコードを1つ取り出す)
  - [showアクションの役割](#showアクションの役割)
  - [Post.findとは](#postfindとは)
  - [params\[:id\]とは何か](#paramsidとは何か)
- [インスタンス変数の役割を理解する](#インスタンス変数の役割を理解する)
- [ビューでのデータの表示方法](#ビューでのデータの表示方法)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- コントローラのアクションがどのように動作するかを理解する
- index アクションの役割とデータ取得方法を学ぶ
- show アクションの役割とデータ取得方法を学ぶ
- モデルからデータを取得する基本的な方法を習得する
- コントローラとビューの連携の仕組みを理解する

## はじめに

前回は **scaffold** という仕組みを使って、Railsの基本である7つのアクションをコントローラに作り、データの作成・表示・編集・削除という基本機能を一気に作りました。

今回は、コントローラに作られたアクションがどう動いているのかを、詳しく見ていきましょう。まずは **index, show** アクションから見ていきます。

Railsでもっとも大事な部分ですので大変かもしれません。一回で理解することが難しい内容ですので、何回か復習しながら少しずつ理解してみてください。

## コントローラの中身を書き換える

scaffoldで作られる機能はかなり整っているのですが、Railsをはじめて学習する上では少し余分な機能まで含まれています。そのため、わかりやすいポイントだけに絞ったソースコードに置き換えてしまいましょう。

`app/controllers/posts_controller.rb` ファイルを開き、中身を消して、以下のように書き換えてください。

```ruby
class PostsController < ApplicationController
  # GET /posts
  def index
    @posts = Post.all
  end

  # GET /posts/1
  def show
    @post = Post.find(params[:id])
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to post_path(@post), notice: "Post was successfully created."
    else
      render :new
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # PATCH/PUT /posts/1
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to post_path(@post), notice: "Post was successfully updated."
    else
      render :edit
    end
  end

  # DELETE /posts/1
  def destroy
    @post = Post.find(params[:id])
    @post.destroy!
    redirect_to posts_path, notice: "Post was successfully destroyed."
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
```

一部削除や調整をしているものの、scaffoldで作った機能とほぼ同じと思っていただいて大丈夫です。今後、scaffoldを使わずにコントローラを作る場合は、上記のような形が基本となります。

では、今回は index, show アクションについて詳しく見ていきましょう。

## indexアクション - すべてのレコードを取得

### indexアクションの役割

まず **index** というアクションがあります。indexアクションは、モデルのデータを**すべて**取得して一覧表示するための処理です。

```ruby
def index
  @posts = Post.all
end
```

この短いコードですが、とても重要なことをしています。`Post.all` を呼び出して、**Post** モデルに保存されたすべてのレコード（データ）を取り出し、それを **@posts** というインスタンス変数に格納しています。

### モデル名とテーブル名の関係

モデル名は、テーブル名から「s」を取って、最初のアルファベットを大文字にします。例えば：

- **posts** テーブル → **Post** モデル
- **users** テーブル → **User** モデル

これはRailsの規約の一つで、このルールに従うことで、特別な設定をしなくてもRailsが自動的にテーブルとモデルを関連付けてくれます。

### Post.allとは

Railsでは、モデル名に対して `.all` と書くと、そのモデルに対応するテーブルからすべてのデータを取り出すことを意味します。

`Post.all` を実行すると、Railsは内部的にSQL文を生成し、データベースからすべての投稿データを取得してきます。生成されるSQL文は次のようなものです。

```sql
SELECT * FROM posts;
```

### コントローラからビューへの変数の受け渡し

ここで定義した **@posts** という変数は、アクション内で定義されたインスタンス変数です。Railsでは、コントローラのアクション内で定義されたインスタンス変数（@で始まる変数）は、自動的に対応するビューで利用可能になります。

そのため、indexアクションによって表示されるビュー（`app/views/posts/index.html.erb`）からも、先ほどの`@posts`というインスタンス変数を使うことができます。

結果的に、indexアクションに対応するビュー、つまりページの中では、すべての投稿データを表示することができるようになるのです。

`http://127.0.0.1:3000/posts` というURLにアクセスすると、indexアクションが実行され、対応するビューが表示されます。

## showアクション - 特定のレコードを1つ取り出す

### showアクションの役割

**show** アクションは、URLに含まれた **id** を使って特定のレコードを1つだけ取得します。

```ruby
def show
  @post = Post.find(params[:id])
end
```

### Post.findとは

`Post.find(params[:id])` は、指定されたIDを持つ投稿を1つだけ取得するためのメソッドです。

`.find` は、特定のIDを持つデータを1つだけ取得するメソッドで、Railsでモデルに対して使えるメソッドとなっています。生成されるSQL文は次のようなものです。

```sql
SELECT * FROM posts WHERE id = ?;
```

`?` の部分には、`params[:id]` の値が入ります。

### params[:id]とは何か

`params[:id]` というのは、URLの末尾の数字部分を表しています。

たとえば `http://127.0.0.1:3000/posts/1` というURLにアクセスすると、Railsは「1」を`params[:id]`として認識します。そして、この「1」という値を使って、IDが1の投稿データを取得します。

**ID** とは、データが作成された順に割り振られる連番のことです。マイナンバーのような、識別番号と考えてください。

showアクションで取得した`@post`の情報は、`show.html.erb`に渡され、そこでタイトルや本文などの詳細情報が表示されます。

## インスタンス変数の役割を理解する

ここまで見てきたように、コントローラのアクション内でインスタンス変数（@で始まる変数）を定義すると、それが対応するビューに自動的に受け渡されます。

例えば、indexアクションで定義した`@posts`は`index.html.erb`で使え、showアクションで定義した`@post`は`show.html.erb`で使えます。

この仕組みにより、コントローラでデータベースから取得したデータを、ビューで表示することができるのです。

インスタンス変数を使わない（@をつけない）ローカル変数の場合は、アクション内でしか使えず、ビューには渡されません。つまり、**@** は「ビューに渡したい変数」を意味すると考えてください。

## ビューでのデータの表示方法

`@posts`や`@post`がビューに渡されたあと、どのように表示されるのでしょうか？

例えば、`app/views/posts/index.html.erb`には、以下のようなコードが含まれているかもしれません。

```erb
<h1>投稿一覧</h1>

<% @posts.each do |post| %>
  <div>
    <h2><%= post.title %></h2>
    <p><%= post.body %></p>
    <p><%= link_to "詳細", post_path(post) %></p>
  </div>
<% end %>
```

このコードでは、`@posts`から取得したすべての投稿に対して`.each`メソッドを使ってループを行い、各投稿のタイトルと本文、そして詳細ページへのリンクを表示しています。

同様に、`app/views/posts/show.html.erb`には、以下のようなコードが含まれているかもしれません。

```erb
<h1><%= @post.title %></h1>
<p><%= @post.body %></p>

<div>
  <%= link_to "編集", edit_post_path(@post) %>
  <%= link_to "削除", post_path(@post), method: :delete, data: { confirm: "本当に削除しますか？" } %>
  <%= link_to "一覧に戻る", posts_path %>
</div>
```

このコードでは、`@post`から取得した1つの投稿のタイトルと本文を表示し、編集・削除のリンクと一覧に戻るリンクを表示しています。

## まとめ

本章では、Railsのコントローラにおけるindex, showアクションの役割と動作原理について学びました。

- **indexアクション**は、モデルのすべてのレコードを取得して一覧表示するためのもの
- **showアクション**は、特定のIDを持つレコードを1つだけ取得して詳細表示するためのもの
- コントローラでインスタンス変数（@で始まる変数）を定義すると、対応するビューでその変数を使える
- `Post.all`ですべてのレコードを取得、`Post.find(params[:id])`で特定のレコードを取得できる
- `params[:id]`はURLの末尾の数字部分から取得される

これらの基本的な概念は、Railsアプリケーション開発の土台となるものです。次の章では、new, createアクションについてさらに学んでいきましょう。
