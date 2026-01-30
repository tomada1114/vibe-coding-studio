---
title: コメント削除機能を追加しよう
nextjs:
  metadata:
    title: コメント削除機能を追加しよう
    description: TechLog アプリケーションでコメントを削除できる機能を実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [CommentsController の destroy アクション実装](#commentscontroller-の-destroy-アクション実装)
  - [コメントの特定と権限チェック](#コメントの特定と権限チェック)
  - [削除処理とリダイレクト](#削除処理とリダイレクト)
- [削除ボタンの追加](#削除ボタンの追加)
  - [削除ボタンの表示制御](#削除ボタンの表示制御)
  - [削除ボタンの実装](#削除ボタンの実装)
- [動作確認](#動作確認)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- CommentsController の **destroy アクション**を実装する方法を理解する
- コメント所有者の**権限チェック**を行う実装方法を習得する
- コメント削除用の**ボタン**を投稿詳細ページに追加する方法を学ぶ
- 削除操作後の**リダイレクト**と**フラッシュメッセージ**の設定方法を理解する

## はじめに

前回のレッスンでは、コメント一覧表示機能を実装しました。これにより、ユーザーは投稿に対する自分や他のユーザーのコメントを確認できるようになりました。しかし、一度投稿したコメントを削除できる機能がまだありません。

今回は、ユーザーが自分が投稿したコメントを削除できる機能を追加します。コメント削除機能はユーザーにとって重要な管理機能です。例えば、誤った情報を投稿してしまった場合や、不適切な内容を投稿してしまった場合など、投稿内容を取り消したいケースがあります。

コメント削除機能は、以下の2つの主要な部分から構成されます。

1. コントローラーの destroy アクション: コメントの削除処理を行う
2. 削除ボタンの追加: ユーザーがコメントを削除するためのインターフェース

また、セキュリティの観点から、コメントを削除できるのはそのコメントの投稿者本人のみに制限します。これにより、他のユーザーが勝手にコメントを削除することを防ぎます。

それでは、具体的なコードと共に実装を進めていきましょう。

## CommentsController の destroy アクション実装

まず、コメントを削除するための destroy アクションを実装します。`app/controllers/comments_controller.rb` を開き、destroy アクションを以下のように実装してください。

```ruby
def destroy
  @comment = @post.comments.find(params[:id])

  if @comment.user == current_user
    @comment.destroy
    flash[:notice] = 'コメントを削除しました'
  else
    flash[:alert] = '他のユーザーのコメントは削除できません'
  end

  redirect_to post_path(@post)
end
```

この destroy アクションでやっていることについて、順を追って説明します。

### コメントの特定と権限チェック

```ruby
@comment = @post.comments.find(params[:id])

if @comment.user == current_user
  # コメント削除処理
else
  # エラーメッセージ表示
end
```

まず、URLから取得した投稿ID（`params[:post_id]`）とコメントID（`params[:id]`）を使って、削除対象のコメントを特定します。`@post.comments.find` を使うことで、指定された投稿に属するコメントだけを対象にできます。これにより、不正なコメント削除を防ぐことができます。

次に、そのコメントの投稿者が現在ログインしているユーザーと一致するかをチェックします。一致する場合のみ、コメントの削除を許可します。これは非常に重要なセキュリティチェックで、ユーザーが自分のコメントだけを削除できるようにします。

### 削除処理とリダイレクト

```ruby
@comment.destroy
flash[:notice] = 'コメントを削除しました'
```

コメントの削除は `destroy` メソッドで行います。このメソッドにより、データベースからコメントレコードが削除されます。削除が完了したら、成功メッセージをフラッシュに設定します。

コメントの投稿者ではない場合（他人のコメントを削除しようとした場合）は、エラーメッセージを表示します。

```ruby
flash[:alert] = '他のユーザーのコメントは削除できません'
```

最後に、処理の成否に関わらず、投稿詳細ページにリダイレクトします。

```ruby
redirect_to post_path(@post)
```

これにより、ユーザーは操作の結果を確認しながら、投稿とコメントを引き続き閲覧できます。

## 削除ボタンの追加

次に、コメント一覧表示部分に削除ボタンを追加します。以前作成したコメント一覧表示のコードを修正して、各コメントに削除ボタンを追加します。

`app/views/posts/show.html.erb` のコメント一覧表示部分を以下のように修正してください。

```html
<!-- コメント一覧 -->
<div class="bg-white p-6 shadow rounded mb-7">
  <h4 class="text-lg font-medium text-gray-800 mb-4">コメント一覧</h4>

  <% if @post.comments.empty? %>
    <p class="text-gray-500 text-center py-4">まだコメントはありません。最初のコメントを投稿してみましょう！</p>
  <% else %>
    <div class="space-y-4">
      <% @post.comments.order(created_at: :desc).each do |comment| %>
        <div class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-500">
                <%= link_to comment.user.nickname, user_path(comment.user), class: "font-medium text-indigo-600 hover:text-indigo-800" %>
                <span class="mx-1">•</span>
                <span><%= comment.created_at.strftime("%Y年%m月%d日 %H:%M") %></span>
              </p>
              <p class="mt-2 text-gray-700"><%= comment.content %></p>
            </div>

            <!-- 削除ボタン（コメント投稿者のみに表示） -->
            <% if user_signed_in? && comment.user == current_user %>
              <div>
                <%= button_to post_comment_path(@post, comment),
                      method: :delete,
                      class: "text-xs text-red-600 hover:text-red-800 flex items-center",
                      form: { data: { turbo_confirm: "このコメントを削除してもよろしいですか？" } } do %>
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  削除
                <% end %>
              </div>
            <% end %>
          </div>
        </div>
      <% end %>
    </div>
  <% end %>
</div>
```

コメント一覧表示部分に追加した削除ボタンの部分について詳しく説明します。

### 削除ボタンの表示制御

```html
<% if user_signed_in? && comment.user == current_user %>
  <!-- 削除ボタン -->
<% end %>
```

この条件分岐により、削除ボタンはコメントの投稿者本人にのみ表示されます。つまり、ユーザーは自分のコメントだけを削除できるということです。

条件は2つあります。まず、ユーザーがログインしていること（`user_signed_in?`）、そして、コメントの投稿者がログインユーザーと一致すること（`comment.user == current_user`）です。この二重のチェックにより、適切な権限制御が実現されます。

### 削除ボタンの実装

```html
<%= button_to post_comment_path(@post, comment),
      method: :delete,
      class: "text-xs text-red-600 hover:text-red-800 flex items-center",
      form: { data: { turbo_confirm: "このコメントを削除してもよろしいですか？" } } do %>
  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  削除
<% end %>
```

削除ボタンは `button_to` ヘルパーメソッドで実装しています。これにより、ボタンをクリックすると DELETE リクエストがサーバーに送信されます。

ポイントは以下の通りです。

1. `post_comment_path(@post, comment)` - 削除対象のコメントを指定するためのパス
2. `method: :delete` - HTTP メソッドを DELETE に指定
3. `class: "..."` - ボタンのスタイリング（赤色のテキストとアイコン）
4. `form: { data: { turbo_confirm: "..." } }` - 削除前の確認ダイアログ表示

特に重要なのは確認ダイアログです。`turbo_confirm` オプションにより、ユーザーがボタンをクリックした際に「このコメントを削除してもよろしいですか？」という確認メッセージが表示されます。これにより、誤ってコメントを削除してしまうことを防ぎます。

また、ゴミ箱のアイコン（SVG）も追加することで、ボタンの目的が視覚的に分かりやすくなっています。

なお、`turbo` というのは聞きなれない用語かもしれません。

`Turbo` は、Rails 7 以降で導入された新しいフロントエンド技術で、ページ遷移を高速化するための仕組みです。`turbo_confirm` は、Turbo を使った確認ダイアログの表示を実現するためのオプションです。
`Turbo` を使うことで、ページ全体をリロードせずに部分的な更新が可能になりますので、使いやすいインターフェースを提供できます。

## 動作確認

実装が完了したら、実際にコメント削除機能が動作するか確認しましょう。

```bash
$ bin/dev
```

ブラウザで投稿詳細ページにアクセスし、以下の点を確認してください。

1. 自分のコメントには削除ボタンが表示されるか
2. 他のユーザーのコメントには削除ボタンが表示されないようになっているか
3. 削除ボタンをクリックすると確認ダイアログが表示されるか
4. 確認後、コメントが正常に削除されるか
5. 削除後、「コメントを削除しました」というフラッシュメッセージが表示されるか

![コメント削除機能の動作確認](/img/rails/comment-delete-button.png)

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "コメント削除機能を追加"
$ git push
```

## まとめ

本章では、TechLog アプリケーションにコメント削除機能を追加しました。具体的には、以下の内容を実装しました。

- CommentsController に **destroy アクション**を追加
- コメント投稿者本人のみがコメントを削除できるよう**権限チェック**を実装
- 投稿詳細ページのコメント一覧に**削除ボタン**を追加
- 削除前の**確認ダイアログ**で誤操作を防止
- 削除後の**フラッシュメッセージ**で操作結果をユーザーに通知

これらの機能により、ユーザーは自分のコメントを管理できるようになりました。削除ボタンの表示制御や削除前の確認ダイアログなど、ユーザーが使いやすいように工夫しています。

コメント削除機能の追加により、TechLog アプリケーションのソーシャル機能はさらに充実しました。ユーザーは投稿に対してコメントを残し、必要に応じて自分のコメントを削除できるようになりました。

次のレッスンでは、コメント編集機能を実装して、ユーザーが投稿したコメントを後から修正できるようにします。
