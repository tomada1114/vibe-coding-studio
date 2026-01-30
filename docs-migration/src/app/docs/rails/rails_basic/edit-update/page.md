---
title: Rails の edit, update アクションを理解しよう
nextjs:
  metadata:
    title: Rails の edit, update アクションを理解しよう
    description: Ruby on Railsのコントローラにおけるedit, updateアクションの動作原理と役割を理解し、データ更新の仕組みを学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [editアクション - 既存データを編集するフォームを表示](#editアクション---既存データを編集するフォームを表示)
  - [editアクションの役割](#editアクションの役割)
  - [editビューの設定](#editビューの設定)
  - [form\_with の自動切り替え機能](#form_with-の自動切り替え機能)
- [updateアクション - 編集内容をデータベースに反映](#updateアクション---編集内容をデータベースに反映)
  - [updateアクションの役割](#updateアクションの役割)
  - [更新成功時の処理](#更新成功時の処理)
  - [更新失敗時の処理](#更新失敗時の処理)
- [edit/update と new/create の比較](#editupdate-と-newcreate-の比較)
  - [共通点](#共通点)
  - [違い](#違い)
- [データ更新の流れを理解する](#データ更新の流れを理解する)
- [まとめ](#まとめ)

## 学習の目標

本章では、以下の内容を学習します。

- edit アクションの役割と動作原理を理解する
- update アクションの処理フローを学ぶ
- 既存データの編集と更新の仕組みを理解する
- form_with がどのように新規作成と編集で使い分けられるかを理解する
- 更新処理の成功・失敗時の挙動の違いを把握する

## はじめに

前回は new, create アクションについて学びました。今回は、既存データを編集するための **edit アクション**と、実際に更新を行う **update アクション**について学んでいきましょう。

データの更新処理は、新規作成と多くの共通点がありますが、既存データを取り扱うという点で異なる部分もあります。それぞれの役割と処理の流れを理解していきましょう。

## editアクション - 既存データを編集するフォームを表示

### editアクションの役割

**edit アクション**では、すでに存在するレコード（データ）を1件取り出し、その内容をフォームに表示するための準備をします。コードは次のようになります。

```ruby
def edit
  @post = Post.find(params[:id])
end
```

このコードでは、`params[:id]` で指定されたIDを持つ投稿を検索し、`@post` というインスタンス変数に格納しています。これにより、`edit.html.erb` に `@post` を渡し、既存のタイトルや本文をフォームに初期値として表示できます。

new アクションでは `Post.new` と記述することで「まっさらな投稿データ」を用意していましたが、edit では `Post.find` を使って「保存済みのデータ」を取得していることに注意してください。

### editビューの設定

`app/view/posts/edit.html.erb` も開き、edit アクションのビューファイルも見ていきましょう。scaffold で作られたビューファイルは初見だと少し読みにくいので、こちらも以下の中身に書き換えてみましょう。

```erb
<h1>Editing post</h1>

<%= form_with(model: @post) do |form| %>
  <div>
    <%= form.label :title, style: "display: block" %>
    <%= form.text_field :title %>
  </div>

  <div>
    <%= form.label :body, style: "display: block" %>
    <%= form.text_area :body %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>

<br>

<div>
  <%= link_to "Show this post", @post %> |
  <%= link_to "Back to posts", posts_path %>
</div>
```

リンクなどの違いはあれど、`form_with` の部分は `new.html.erb` と全く同じであることにお気付きでしょうか？

### form_with の自動切り替え機能

`form_with` は、渡されるモデルオブジェクト（`@post`）に応じて、自動的に役割が切り替わります。

- **空のモデルオブジェクト**が渡された場合：新規にデータ保存を行う（create アクション）
- **既存データのモデルオブジェクト**が渡された場合：データの更新を行う（update アクション）

Railsはモデルオブジェクトが新規作成されたものか、データベースから取得した既存のものかを自動的に判断し、それに応じてフォームの送信先を変更します。

new アクションから渡される `@post` は `Post.new` で作られた新しいオブジェクトなので、フォームの送信先は create アクションになります。一方、edit アクションから渡される `@post` は `Post.find` で取得した既存のオブジェクトなので、フォームの送信先は update アクションになります。

このように、同じ `form_with` のコードでも、渡すオブジェクトによって動作が変わるという点がRailsの便利な特徴の一つです。

## updateアクション - 編集内容をデータベースに反映

### updateアクションの役割

**update アクション**は、edit アクションで読み込んだ既存レコードをデータベース上で更新する処理を行います。コード例は以下のようになります。

```ruby
def update
  @post = Post.find(params[:id])
  if @post.update(post_params)
    redirect_to post_path(@post), notice: "Post was successfully updated."
  else
    render :edit
  end
end
```

まず `Post.find(params[:id])` で編集対象の投稿を取得し、`@post.update(post_params)` でフォームから送信されたデータで更新を試みます。

### 更新成功時の処理

`@post.update` が成功すると（戻り値が `true` になると）、詳細画面にリダイレクトして「Post was successfully updated.」というメッセージを表示します。

```ruby
redirect_to post_path(@post), notice: "Post was successfully updated."
```

これは create アクションの成功時の処理と同じですね。`post_path(@post)` で投稿の詳細ページへのパスを生成し、`redirect_to` でそのページにリダイレクトしています。`notice` パラメータは、フラッシュメッセージとして「更新完了」を伝えるために使われます。

### 更新失敗時の処理

`@post.update` が失敗すると（戻り値が `false` になると）、編集フォームを再表示します。

```ruby
render :edit
```

これも create アクションの失敗時の処理と同じ考え方です。`render :edit` を使うことで、edit アクションを経由せずに直接 `edit.html.erb` を表示します。これにより、更新に使おうとした `@post` の状態をそのまま保持できるため、ユーザーが入力した内容がフォームに残ったままになります。

もし `redirect_to edit_post_path(@post)` のようにリダイレクトしてしまうと、edit アクションが再度実行され、データベースから `@post` を取得し直すため、ユーザーの入力内容が失われてしまいます。

## edit/update と new/create の比較

edit/update アクションと new/create アクションには多くの共通点があります。ここで、その違いと共通点をまとめてみましょう。

### 共通点

1. **フォームの構造**: どちらもほぼ同じ `form_with` コードを使用
2. **失敗時の処理**: どちらも `render` を使って入力内容を保持したままフォームを再表示
3. **成功時の処理**: どちらも詳細ページにリダイレクトしてフラッシュメッセージを表示

### 違い

1. **データの取得方法**:
   - new: `Post.new` で空のオブジェクトを作成
   - edit: `Post.find(params[:id])` で既存のオブジェクトを取得

2. **データの保存方法**:
   - create: `@post.save` で新規保存
   - update: `@post.update(post_params)` で既存データを更新

3. **フォームの送信先**:
   - new からのフォーム: create アクションへ送信
   - edit からのフォーム: update アクションへ送信

これらの違いは、新規作成と更新という異なる目的を反映していますが、基本的な処理の流れは非常に似ています。

## データ更新の流れを理解する

ここで、editアクションからupdateアクションまでの一連の流れをおさらいしておきましょう。

1. ユーザーが「Edit this post」リンクをクリックする → **editアクション**が実行される
2. editアクションでは `@post = Post.find(params[:id])` で既存の投稿データを取得
3. `edit.html.erb` で `form_with(model: @post)` を使ってフォームを表示（既存の内容が入力済み）
4. ユーザーがフォームの内容を編集し、送信ボタンをクリック
5. フォームのデータが **updateアクション**に送信される
6. updateアクションでは再度 `@post = Post.find(params[:id])` で対象の投稿を取得
7. `@post.update(post_params)` で投稿の内容を更新
8. 更新に成功したら、`redirect_to post_path(@post)` で詳細ページにリダイレクト
9. 更新に失敗したら、`render :edit` でフォームを再表示

この流れを理解することで、Railsのデータ更新の基本的な仕組みが見えてきます。

## まとめ

本章では、Railsにおけるedit, updateアクションの役割と動作原理について学びました。

- **editアクション**は、既存データを取得してフォームに表示するための準備を行う
- **updateアクション**は、フォームから送信されたデータをもとに既存データを更新する
- **form_with**は、渡されるモデルオブジェクトに応じて自動的に送信先を切り替える
- 更新失敗時は**render**を使うことで、入力内容を保持したままフォームを再表示できる
- new/createとedit/updateは似た処理の流れだが、新規作成と更新という違いがある

これらの概念を理解することで、ユーザーからの入力を受け取り、既存データを更新するという基本的な処理の流れがわかります。次の章では、destroy アクションについて学んでいきましょう。
