---
title: 投稿一覧と詳細ページにコメント数を表示しよう
nextjs:
  metadata:
    title: 投稿一覧と詳細ページにコメント数を表示しよう
    description: TechLog アプリケーションの投稿一覧と詳細ページにコメント数を表示する機能を実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [投稿一覧ページにコメント数を表示](#投稿一覧ページにコメント数を表示)
- [投稿詳細ページにコメント数を表示](#投稿詳細ページにコメント数を表示)
- [動作確認](#動作確認)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- 投稿に紐づく**コメント数**を取得する方法を理解する
- 投稿**一覧ページ**にコメント数を表示する実装方法を習得する
- 投稿**詳細ページ**にコメント数を表示する方法を学ぶ
- アイコンやバッジを使った**視覚的な表現**方法を理解する

## はじめに

前回のレッスンまでで、コメントの投稿、表示、編集、削除という基本的な機能を実装しました。これらの機能により、ユーザー間のコミュニケーションが可能になりました。

しかし、現状では投稿一覧ページからは、どの投稿にコメントがついているのか、また何件のコメントがあるのかが分かりません。同様に、投稿詳細ページでもコメント数が明示的に表示されていません。

今回は、投稿一覧ページと詳細ページにコメント数を表示する機能を追加します。これにより、ユーザーは一目でどの投稿に多くのコメントがついているかを確認でき、活発な議論が行われている投稿を見つけやすくなります。

コメント数表示機能は、ソーシャルメディアやブログなどで一般的に見られる機能で、コミュニティの活性化に貢献します。ユーザーは興味のある話題や議論が活発な投稿に惹かれる傾向があるため、この機能は重要な役割を果たします。

それでは、投稿一覧ページと詳細ページにコメント数を表示する実装を進めていきましょう。

## 投稿一覧ページにコメント数を表示

まず、投稿一覧ページの各投稿カードにコメント数を表示します。`app/views/posts/index.html.erb` を開き、投稿表示部分を以下のように修正してください。

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

            <!-- コメント数バッジを追加 -->
            <div class="flex items-center">
              <span class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <%= post.comments.size %>
              </span>
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

主な変更点は、投稿タイトルの右側にコメント数を表示する部分を追加したことです。

ここでは、コメントアイコン（SVG）と共にコメント数を表示しています。`post.comments.size` メソッドを使用して、その投稿に紐づくコメントの数を取得しています。

アイコンは吹き出し型のデザインで、一般的なコメントを表すアイコンとして認識されやすいものを選んでいます。テキストとアイコンを一緒に表示することで、視覚的にも分かりやすくなっています。

また、Tailwind CSS のクラスを使って、テキストの色やサイズ、アイコンとテキストの間隔などを調整しています。

![投稿一覧にコメント数を表示](/img/rails/post-index-comment-count.png)

## 投稿詳細ページにコメント数を表示

次に、投稿詳細ページのコメント一覧セクションのタイトル部分にコメント数を表示します。`app/views/posts/show.html.erb` のコメント一覧セクションを以下のように修正してください。

```html
<!-- コメント一覧 -->
<div class="bg-white p-6 shadow rounded mb-7">
  <div class="flex items-center justify-between mb-4">
    <h4 class="text-lg font-medium text-gray-800">コメント一覧</h4>

    <!-- コメント数バッジを追加 -->
    <p class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      <%= @post.comments.size %>件
    </p>
  </div>

  <% if @post.comments.empty? %>
    <p class="text-gray-500 text-center py-4">まだコメントはありません。最初のコメントを投稿してみましょう！</p>
  <% else %>
    <!-- 既存のコメント一覧表示部分(省略) -->
  <% end %>
</div>
```

基本的な実装は、投稿一覧ページと同様です。ここでは、コメント一覧セクションのタイトル部分にコメント数を表示するバッジを追加しています。

![投稿詳細にコメント数を表示](/img/rails/post-show-comment-count.png)

## 動作確認

実装が完了したら、実際にコメント数表示機能が動作するか確認しましょう。

```bash
$ bin/dev
```

ブラウザで投稿一覧ページと投稿詳細ページにアクセスし、以下の点を確認してください。

1. 投稿一覧ページの各投稿カードにコメント数が表示されているか
2. 投稿詳細ページのコメント一覧セクションにコメント数バッジが表示されているか
3. コメントを追加または削除すると、コメント数の表示が正しく更新されるか

これらの確認ポイントを通じて、コメント数表示機能が期待通りに動作しているかを確認します。

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "投稿一覧と詳細ページにコメント数を表示"
$ git push
```

## まとめ

本章では、TechLog アプリケーションの投稿一覧ページと詳細ページにコメント数を表示する機能を実装しました。具体的には、以下の内容を実装しました。

- 投稿一覧ページの各投稿カードに**コメント数**とアイコンを表示
- 投稿詳細ページのコメント一覧セクションに**コメント数バッジ**を表示
- **視覚的に分かりやすい**デザインの適用

これらの機能により、ユーザーは一目でどの投稿に多くのコメントがついているかを確認できるようになりました。コメント数の表示は、活発な議論が行われている投稿を見つけやすくするとともに、コメントの投稿を促進する効果もあります。

ここまでで、TechLog アプリケーションのコメント機能は一通り実装が完了しました。

`Comment` モデルと `Post` モデルの関連付けを活用したり、ルーティングがネスト（入れ子）構造になっていたりと、難しく感じる部分もあったかもしれませんが、実際に手を動かしてみることで理解が深まったと思います。
