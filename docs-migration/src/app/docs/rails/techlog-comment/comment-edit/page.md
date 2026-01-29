---
title: コメント編集機能を実装しよう
nextjs:
  metadata:
    title: コメント編集機能を実装しよう
    description: TechLog アプリケーションでコメントを編集できる機能を実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [CommentsController の edit と update アクション実装](#commentscontroller-の-edit-と-update-アクション実装)
  - [edit アクション](#edit-アクション)
  - [update アクション](#update-アクション)
- [コメント編集用のビュー作成](#コメント編集用のビュー作成)
- [コメント一覧に編集リンクを追加](#コメント一覧に編集リンクを追加)
  - [編集リンクの実装](#編集リンクの実装)
  - [ボタン表示制御](#ボタン表示制御)
- [動作確認](#動作確認)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- CommentsController の **edit と update アクション**を実装する方法を理解する
- コメント編集用の**フォーム**を作成する方法を習得する
- 編集権限の**制御**を実装する方法を学ぶ
- 編集操作のための**リンク**を投稿詳細ページに追加する方法を理解する

## はじめに

前回のレッスンでは、コメント削除機能を実装しました。これにより、ユーザーは自分が投稿したコメントを削除できるようになりました。しかし、コメントを編集する機能はまだありません。

今回は、コメント編集機能を実装します。この機能により、ユーザーは投稿後に気づいた誤字脱字の修正や、追加情報の提供などを行えるようになります。コメント編集機能は、より柔軟なコミュニケーションを可能にする重要な機能です。

コメント編集機能の実装では、以下の要素を考慮します。

1. コメント編集用のフォーム表示と送信処理
2. 編集権限の制御（自分のコメントのみ編集可能）
3. 編集操作のためのUIの提供

それでは、具体的なコードと共に実装を進めていきましょう。

## CommentsController の edit と update アクション実装

まず、コメントを編集するための edit アクションと update アクションを実装します。`app/controllers/comments_controller.rb` を開き、以下のようにアクションを追加してください。

```ruby
def edit
  @comment = @post.comments.find(params[:id])

  unless @comment.user == current_user
    flash[:alert] = '他のユーザーのコメントは編集できません'
    redirect_to post_path(@post)
  end
end

def update
  @comment = @post.comments.find(params[:id])

  if @comment.user == current_user
    if @comment.update(comment_params)
      flash[:notice] = 'コメントを更新しました'
      redirect_to post_path(@post)
    else
      flash.now[:alert] = 'コメントの更新に失敗しました'
      render :edit
    end
  else
    flash[:alert] = '他のユーザーのコメントは編集できません'
    redirect_to post_path(@post)
  end
end
```

この2つのアクションについて、それぞれ詳しく見ていきましょう。

### edit アクション

```ruby
def edit
  @comment = @post.comments.find(params[:id])

  unless @comment.user == current_user
    flash[:alert] = '他のユーザーのコメントは編集できません'
    redirect_to post_path(@post)
  end
end
```

edit アクションでは、まず編集対象のコメントを取得します。そして、そのコメントの投稿者が現在ログインしているユーザーと一致するかをチェックします。

`unless @comment.user == current_user` という条件分岐により、コメントの投稿者でない場合は編集画面を表示せず、エラーメッセージと共に投稿詳細ページにリダイレクトします。これにより、他人のコメントを編集できないようにしています。

### update アクション

```ruby
def update
  @comment = @post.comments.find(params[:id])

  if @comment.user == current_user
    if @comment.update(comment_params)
      flash[:notice] = 'コメントを更新しました'
      redirect_to post_path(@post)
    else
      flash.now[:alert] = 'コメントの更新に失敗しました'
      render :edit
    end
  else
    flash[:alert] = '他のユーザーのコメントは編集できません'
    redirect_to post_path(@post)
  end
end
```

update アクションでは、まず編集対象のコメントを取得し、権限チェックを行います。コメントの投稿者が現在ログインしているユーザーと一致する場合のみ、更新処理を行います。

更新は `@comment.update(comment_params)` で行い、成功した場合は成功メッセージと共に投稿詳細ページにリダイレクトします。失敗した場合は、エラーメッセージを表示して編集フォームを再表示します。

編集権限がない場合（他人のコメントを編集しようとした場合）は、エラーメッセージと共に投稿詳細ページにリダイレクトします。

## コメント編集用のビュー作成

次に、コメント編集用のビューを作成します。`app/views/comments/edit.html.erb` を以下のように作成してください。

```html
<div class="space-y-6 w-3/4 max-w-lg">
  <div class="items-center justify-center">
    <div class="bg-white p-6 shadow rounded">
      <h2 class="text-xl font-bold text-gray-900 mb-4">コメントを編集</h2>

      <%= form_with model: [@post, @comment], class: "space-y-4" do |f| %>
        <div>
          <%= f.label :content, "コメント内容", class: "block text-sm font-medium text-gray-700" %>
          <%= f.text_area :content,
                rows: 4,
                class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2" %>
        </div>

        <div class="flex justify-end space-x-3">
          <%= link_to "キャンセル", post_path(@post), class: "py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" %>
          <%= f.submit "更新する", class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" %>
        </div>
      <% end %>
    </div>
  </div>
</div>
```

このビューでは、コメント編集用のフォームを作成しています。フォームには以下の要素が含まれています。

1. フォームのタイトル（「コメントを編集」）
2. コメント内容の入力欄
3. キャンセルボタン（投稿詳細ページに戻る）
4. 更新ボタン（フォームを送信する）

フォームは `form_with` ヘルパーを使用して作成し、`model: [@post, @comment]` によってネストされたリソースのパスを自動生成しています。これにより、フォームの送信先は正しく `/posts/:post_id/comments/:id` になります。

また、Tailwind CSS を使ってフォームのデザインを整えています。

![コメント編集フォームのスクリーンショット](/img/rails/comment-edit-form.png)

## コメント一覧に編集リンクを追加

最後に、コメント一覧の各コメントに編集リンクを追加します。`app/views/posts/show.html.erb` のコメント一覧表示部分を以下のように修正してください。

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

            <!-- 編集・削除ボタン（コメント投稿者のみに表示） -->
            <% if user_signed_in? && comment.user == current_user %>
              <div class="flex space-x-3">
                <!-- 編集リンク -->
                <%= link_to edit_post_comment_path(@post, comment), class: "text-xs text-blue-600 hover:text-blue-800 flex items-center" do %>
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  編集
                <% end %>

                <!-- 削除ボタン -->
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

主な変更点は、削除ボタンの横に編集リンクを追加したことです。

### 編集リンクの実装

```html
<%= link_to edit_post_comment_path(@post, comment), class: "text-xs text-blue-600 hover:text-blue-800 flex items-center" do %>
  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
  編集
<% end %>
```

編集リンクは `link_to` ヘルパーを使用して実装しています。`edit_post_comment_path(@post, comment)` により、正しい編集ページのパス（`/posts/:post_id/comments/:id/edit`）が生成されます。

また、青色のテキストと鉛筆アイコン（SVG）を使用して、リンクの目的を視覚的に表現しています。

### ボタン表示制御

```html
<% if user_signed_in? && comment.user == current_user %>
  <div class="flex space-x-3">
    <!-- 編集リンク -->
    <!-- 削除ボタン -->
  </div>
<% end %>
```

削除ボタンと同様に、編集リンクもコメントの投稿者本人にのみ表示されるように制御しています。条件分岐により、ログインしていて、かつコメントの投稿者が現在のユーザーと一致する場合のみ、編集・削除ボタンが表示されます。

また、`<div class="flex space-x-3">` により、編集リンクと削除ボタンが横並びになり、間隔も適切に設定されます。

## 動作確認

実装が完了したら、実際にコメント編集機能が動作するか確認しましょう。

```bash
$ bin/dev
```

ブラウザで投稿詳細ページにアクセスし、以下の点を確認してください。

1. 自分のコメントには編集リンクが表示されるか
2. 他のユーザーのコメントには編集リンクが表示されないか
3. 編集リンクをクリックすると編集ページに遷移するか
4. 編集ページでコメント内容を変更して「更新する」ボタンをクリックすると、コメントが更新されるか
5. キャンセルボタンをクリックすると投稿詳細ページに戻るか
6. 更新後、「コメントを更新しました」というフラッシュメッセージが表示されるか

![コメント編集機能の動作確認](/img/rails/comment-edit-button.png)

これらの確認ポイントを通じて、コメント編集機能が期待通りに動作しているかを確認します。

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "コメント編集機能を実装"
$ git push
```

## まとめ

本章では、TechLog アプリケーションにコメント編集機能を実装しました。具体的には、以下の内容を実装しました。

- CommentsController に **edit と update アクション**を追加
- コメント編集用の**フォームページ**を作成
- コメント投稿者本人のみがコメントを編集できるよう**権限チェック**を実装
- 投稿詳細ページのコメント一覧に**編集リンク**を追加

これらの機能により、ユーザーは自分のコメントを編集できるようになりました。編集リンクの表示制御や、編集フォームのデザインなど、ユーザーエクスペリエンスを向上させる工夫も取り入れています。

コメント編集機能の追加により、TechLog アプリケーションのコメント機能が一層充実しました。ユーザーは投稿に対してコメントを残し、後から内容を修正したり、誤字脱字を訂正したりできるようになり、より正確なコミュニケーションが可能になりました。

次のレッスンでは、投稿一覧と詳細ページにコメント数を表示する機能を実装して、どの投稿に多くのコメントがついているかを一目で分かるようにしていきます。
