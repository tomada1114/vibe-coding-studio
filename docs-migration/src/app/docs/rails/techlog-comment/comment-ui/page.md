---
title: コメント機能のUIを改善しよう
nextjs:
  metadata:
    title: コメント機能のUIを改善しよう
    description: TechLog アプリケーションのコメント機能のUIを改善し、ユーザー体験を向上させます
---

# コメント機能のUIを改善しよう

## 学習の目標

本章では、以下の内容を学習します。

- コメント機能の**全体的なレイアウト**を改善する方法を理解する
- コメント投稿者の情報表示を**強化**する実装方法を習得する
- コメントの**視覚的な階層構造**を整える方法を学ぶ
- **モバイル表示**を最適化するレスポンシブデザインの実装方法を理解する

## はじめに

前回までのレッスンで、コメントの基本機能（投稿、表示、編集、削除）とコメント数の表示機能を実装しました。これらの機能により、ユーザー間のコミュニケーションが可能になり、活発な投稿に注目しやすくなりました。

しかし、機能面だけでなく、見た目や使いやすさ（UI/UX）も重要な要素です。現状のコメント機能は基本的な機能は備えていますが、視覚的な魅力や使いやすさの面ではまだ改善の余地があります。

今回は、コメント機能のUIを改善し、より使いやすく魅力的なインターフェースを実現します。具体的には、コメントカードのデザイン改善、投稿者情報の強化、アバターアイコンの追加、レスポンシブデザインの最適化などを行います。

UIの改善は、直接的な機能追加ではないものの、ユーザー体験を大きく向上させる重要な要素です。優れたUIは、ユーザーの満足度を高め、アプリケーションの継続的な利用を促します。

それでは、コメント機能のUIを改善していきましょう。

## コメントカードのデザイン改善

まず、コメント一覧の各コメントカードのデザインを改善します。`app/views/posts/show.html.erb` のコメント一覧部分を以下のように修正してください。

```html
<!-- コメント一覧 -->
<div class="bg-white p-6 shadow rounded mb-7">
  <div class="flex items-center justify-between mb-4">
    <h4 class="text-lg font-medium text-gray-800">コメント一覧</h4>
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      <%= @post.comments.size %>件
    </span>
  </div>

  <% if @post.comments.empty? %>
    <p class="text-gray-500 text-center py-4">まだコメントはありません。最初のコメントを投稿してみましょう！</p>
  <% else %>
    <div class="space-y-6">
      <% @post.comments.order(created_at: :desc).each do |comment| %>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-start">
            <!-- ユーザーアバター（プレースホルダー） -->
            <div class="flex-shrink-0 mr-3">
              <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                <%= comment.user.nickname[0].upcase %>
              </div>
            </div>

            <!-- コメント内容 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-medium text-gray-900">
                  <%= link_to comment.user.nickname, user_path(comment.user), class: "hover:text-indigo-600 hover:underline" %>
                </p>
                <p class="text-xs text-gray-500">
                  <%= comment.created_at.strftime("%Y年%m月%d日 %H:%M") %>
                </p>
              </div>
              <div class="text-sm text-gray-700 mb-2">
                <%= comment.content %>
              </div>

              <!-- 編集・削除ボタン -->
              <% if user_signed_in? && comment.user == current_user %>
                <div class="flex space-x-3 mt-2">
                  <%= link_to edit_post_comment_path(@post, comment), class: "text-xs text-blue-600 hover:text-blue-800 flex items-center" do %>
                    <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    編集
                  <% end %>

                  <%= button_to post_comment_path(@post, comment),
                        method: :delete,
                        class: "text-xs text-red-600 hover:text-red-800 flex items-center",
                        form: { data: { turbo_confirm: "このコメントを削除してもよろしいですか？" } } do %>
                    <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    削除
                  <% end %>
                </div>
              <% end %>
            </div>
          </div>
        </div>
      <% end %>
    </div>
  <% end %>
</div>
```

この改善されたデザインについて、主な変更点を詳しく見ていきましょう。

### コメントカードの構造改善

まず、各コメントの背景色と余白を調整し、視覚的に区別しやすくしました。

```html
<div class="bg-gray-50 rounded-lg p-4">
```

薄いグレーの背景色（`bg-gray-50`）と丸みを帯びた角（`rounded-lg`）、適切な余白（`p-4`）を設定することで、各コメントが独立したカードのように見えるようになりました。

また、コメント間の間隔も広げています。

```html
<div class="space-y-6">
```

これにより、コメント同士の区別がより明確になり、視認性が向上しています。

### ユーザーアバターの追加

コメント投稿者のアバターを表示するようにしました。今回は実際の画像ではなく、ユーザーのニックネームの頭文字を表示するシンプルなアバターを実装しています。

```html
<div class="flex-shrink-0 mr-3">
  <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
    <%= comment.user.nickname[0].upcase %>
  </div>
</div>
```

円形の背景（`rounded-full`）に投稿者のニックネームの最初の文字を大文字で表示することで、シンプルながらも個性的なアバターを実現しています。

このようなアバターの表示は、コメントの投稿者を視覚的に識別しやすくする効果があります。

### コメント内容の構造化

コメントの内容部分も、より構造化されたデザインに変更しました。

```html
<div class="flex-1 min-w-0">
  <div class="flex items-center justify-between mb-1">
    <p class="text-sm font-medium text-gray-900">
      <%= link_to comment.user.nickname, user_path(comment.user), class: "hover:text-indigo-600 hover:underline" %>
    </p>
    <p class="text-xs text-gray-500">
      <%= comment.created_at.strftime("%Y年%m月%d日 %H:%M") %>
    </p>
  </div>
  <div class="text-sm text-gray-700 mb-2">
    <%= comment.content %>
  </div>

  <!-- 編集・削除ボタン -->
</div>
```

投稿者名と投稿日時を同じ行に配置し、投稿者名は左寄せ、投稿日時は右寄せにすることで、情報がバランス良く表示されています。

また、コメント内容は別の div 要素に配置し、適切な余白を設定することで読みやすくなっています。

### 編集・削除ボタンの最適化

編集・削除ボタンも、コメント内容の下に配置し、サイズや色を調整しました。

```html
<div class="flex space-x-3 mt-2">
  <%= link_to edit_post_comment_path(@post, comment), class: "text-xs text-blue-600 hover:text-blue-800 flex items-center" do %>
    <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    編集
  <% end %>

  <%= button_to post_comment_path(@post, comment),
        method: :delete,
        class: "text-xs text-red-600 hover:text-red-800 flex items-center",
        form: { data: { turbo_confirm: "このコメントを削除してもよろしいですか？" } } do %>
    <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    削除
  <% end %>
</div>
```

ボタンのサイズを小さくし（`text-xs`）、アイコンも縮小（`h-3 w-3`）することで、コメント内容を邪魔せず、必要なときに利用できるようにしています。

## コメントフォームの改善

次に、コメント投稿フォームも改善していきます。同じく `app/views/posts/show.html.erb` のコメントフォーム部分を以下のように修正してください。

```html
<!-- コメントフォーム -->
<div class="bg-white p-6 shadow rounded mb-7">
  <h4 class="text-lg font-medium text-gray-800 mb-4">コメントを投稿する</h4>

  <% if user_signed_in? %>
    <%= form_with(model: [@post, @comment], url: post_comments_path(@post), class: "space-y-4") do |f| %>
      <div class="flex space-x-3">
        <!-- ログインユーザーのアバター -->
        <div class="flex-shrink-0">
          <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
            <%= current_user.nickname[0].upcase %>
          </div>
        </div>

        <!-- コメント入力フィールド -->
        <div class="flex-1">
          <%= f.text_area :content,
                rows: 3,
                placeholder: "コメントを入力してください...",
                class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2" %>
        </div>
      </div>
      <div class="text-right">
        <%= f.submit "コメントする",
              class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" %>
      </div>
    <% end %>
  <% else %>
    <div class="bg-gray-50 p-4 rounded-md text-center">
      <p class="text-gray-600">コメントを投稿するには<%= link_to "ログイン", new_user_session_path, class: "text-indigo-600 hover:text-indigo-800 font-medium" %>してください。</p>
    </div>
  <% end %>
</div>
```

コメントフォームの主な改善点は以下の通りです。

### ユーザーアバターの追加

コメント一覧と同様に、コメントフォームにもログインユーザーのアバターを追加しました。

```html
<div class="flex-shrink-0">
  <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
    <%= current_user.nickname[0].upcase %>
  </div>
</div>
```

これにより、フォームがよりパーソナライズされた印象になり、自分が投稿することが視覚的に分かりやすくなります。

### レイアウトの改善

アバターとテキストエリアを横並びにすることで、コメント一覧の表示と視覚的に統一感を持たせています。

```html
<div class="flex space-x-3">
  <!-- ログインユーザーのアバター -->
  <div class="flex-shrink-0">
    <!-- アバターの内容 -->
  </div>

  <!-- コメント入力フィールド -->
  <div class="flex-1">
    <%= f.text_area :content, ... %>
  </div>
</div>
```

この横並びレイアウトにより、ユーザーが自分の発言としてコメントを入力している感覚が強まります。

### ログイン促進メッセージの改善

未ログイン時のメッセージも視覚的に改善しました。

```html
<div class="bg-gray-50 p-4 rounded-md text-center">
  <p class="text-gray-600">コメントを投稿するには<%= link_to "ログイン", new_user_session_path, class: "text-indigo-600 hover:text-indigo-800 font-medium" %>してください。</p>
</div>
```

薄いグレーの背景色と丸みを帯びた角を設定することで、メッセージが目立ちつつも、全体のデザインと調和しています。

## モバイル表示の最適化

改善したデザインは、基本的にモバイル画面でも適切に表示されますが、さらに最適化するために、レスポンシブデザインの調整を加えることもできます。

例えば、小さな画面では横並びレイアウトを縦並びに変更したり、フォントサイズや余白を調整したりすることが考えられます。ただし、Tailwind CSS の基本的なレスポンシブクラスを使用しているため、ほとんどの要素は既に画面サイズに応じて適切に調整されています。

モバイル対応を強化したい場合は、以下のような調整を検討できますが、今回の実装では基本的なレスポンシブデザインを維持します。

```html
<!-- スマートフォンでは縦並び、タブレット以上では横並びの例 -->
<div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
  <!-- 内容 -->
</div>
```

## 動作確認

実装が完了したら、実際に改善されたUIが適切に表示されるか確認しましょう。

```bash
$ bin/dev
```

ブラウザで投稿詳細ページにアクセスし、以下の点を確認してください。

1. コメント一覧のデザインが改善され、視認性が向上しているか
2. ユーザーアバター（ニックネームの頭文字）が表示されているか
3. コメントフォームのデザインが改善され、使いやすくなっているか
4. モバイル画面（スマートフォンサイズ）でも適切に表示されるか

これらの確認ポイントを通じて、UI改善が期待通りに機能しているかを確認します。

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "コメント機能のUIを改善"
$ git push
```

## まとめ

本章では、TechLog アプリケーションのコメント機能のUIを改善しました。具体的には、以下の内容を実装しました。

- コメントカードの**デザイン改善**と視認性の向上
- ユーザーの**アバターアイコン**の追加
- コメントの**レイアウト構造**の最適化
- コメントフォームの**使いやすさ向上**

これらの改善により、コメント機能の見た目が大幅に向上し、より使いやすくなりました。視覚的な魅力が増したことで、ユーザーはより積極的にコメント機能を活用するようになることが期待できます。

UIの改善は、直接的な機能追加ではないものの、ユーザー体験を大きく向上させる重要な要素です。ユーザーフレンドリーなインターフェースは、アプリケーションの継続的な利用を促し、コミュニティの活性化に貢献します。

これでコメント機能の実装は完了です。基本的な機能（投稿、表示、編集、削除）から始まり、コメント数の表示、そしてUIの改善まで、段階的に機能を拡張してきました。このコメント機能により、TechLog アプリケーションはより対話的で活気のあるプラットフォームになりました。
