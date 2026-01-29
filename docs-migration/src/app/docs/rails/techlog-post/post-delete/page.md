---
title: 学習ログ削除機能を作成しよう
nextjs:
  metadata:
    title: 学習ログ削除機能を作成しよう
    description: TechLog アプリケーションに投稿者のみが使える削除機能を実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [destroy アクションの実装](#destroy-アクションの実装)
- [詳細ページに削除ボタンを追加](#詳細ページに削除ボタンを追加)
- [動作確認](#動作確認)
- [テスト作成](#テスト作成)
- [変更をコミット](#変更をコミット)
- [補足: Devise のヘルパーメソッド](#補足-devise-のヘルパーメソッド)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- 投稿の削除機能の実装方法を理解する
- 投稿者以外のユーザーからの削除を防ぐセキュリティ対策を習得する
- ユーザー権限の確認をフロントエンドとバックエンドの両方で行う方法を学ぶ
- Devise のヘルパーメソッドを活用した認証処理の実装方法を理解する

## はじめに

今回は、学習ログの基本アクションに関する締めくくりとして、投稿の削除機能を実装します。この機能を追加することで、ユーザーが自分の投稿を削除できるようになります。また、他のユーザーの投稿は削除できないように制限を設けることで、セキュリティを確保します。

Devise の機能もふんだんに活用しながら、削除機能の実装を進めていきましょう！

## destroy アクションの実装

以前、`destroy` アクションの中でデータを削除するには `モデルのオブジェクト.destroy` というメソッドを使いました。今回も、このメソッドを使って投稿の削除機能を実装します。

まずは PostsController の destroy アクションを以下のように修正します。

app/controllers/posts_controller.rb

```ruby
def destroy
  # 削除対象の投稿を取得
  post = Post.find_by(id: params[:id])

  # 投稿者とログインユーザーが一致するかを確認
  if post.user == current_user
    post.destroy
    flash[:notice] = '投稿が削除されました'
  end

  # 投稿一覧ページにリダイレクト
  redirect_to posts_path
end
```

このアクションでは、最初に削除対象の投稿を取得し、その投稿の作成者と現在ログインしているユーザーが一致するかを確認します。一致する場合のみ投稿を削除し、フラッシュメッセージを設定します。そして最終的には投稿一覧ページにリダイレクトします。

こうすることで、他のユーザーの投稿を削除しようとした場合はリダイレクトされるだけで、削除処理は実行されません。このようにバックエンド側でもしっかりと権限チェックを行うことで、セキュリティを確保します。

## 詳細ページに削除ボタンを追加

削除機能は個別のビューを用意せず、投稿の詳細ページに削除ボタンを追加する形で実装します。ただし、削除ボタンは投稿者本人のみに表示されるようにします。他のユーザーが詳細ページを見た場合には、削除ボタンが表示されないように制御します。

app/views/posts/show.html.erb

```html
<div class="space-y-6 w-3/4 max-w-lg">
  <label class="block text-xl font-bold text-gray-700">学習ログ詳細</label>

  <div class="items-center justify-center">
      <div tabindex="0" aria-label="card 1" class="focus:outline-none mb-7 bg-white p-6 shadow rounded">
        <div class="flex items-center border-b border-gray-200 pb-6">
          <div class="flex items-start justify-between w-full">
            <div class="pl-3">
              <p class="focus:outline-none text-lg font-medium leading-5 text-gray-800"><%= @post.title %></p>
              <p class="focus:outline-none text-sm leading-normal pt-2 text-gray-500">by <%= @post.user.nickname %></p>
            </div>
            <!-- ここから追加 -->
            <% if user_signed_in? %>
              <% if @post.user_id == current_user.id %>
                <%= button_to "削除", post_path(@post), method: :delete, class: "text-sm bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded hover:cursor-pointer" %>
              <% end %>
            <% end %>
            <!-- ここまで追加 -->
          </div>
        </div>
        <div class="px-2">
          <p class="focus:outline-none text-sm leading-5 py-4 text-gray-600"><%= @post.content %></p>
        </div>
      </div>
  </div>
</div>
```

ここでは二重の条件分岐を使っています。まず `user_signed_in?` でユーザーがログインしているかを確認し、ログインしている場合のみ次の条件へ進みます。次に `@post.user_id == current_user.id` で、投稿者とログインユーザーが同一人物かを確認し、一致する場合のみ削除ボタンを表示します。

この二重のチェックが必要である理由について補足しておくと、まず未ログイン状態で `current_user` を参照するとエラーになるため、先に `user_signed_in?` で確認する必要があります。さらに、ログインしていても自分の投稿のみ削除できるようにするため、二つ目の条件で投稿者とログインユーザーの一致を確認しています。

削除ボタン自体は `button_to` ヘルパーメソッドで作成しており、`method: :delete` の指定によって DELETE リクエストが送信されるようになっています。これにより、削除機能を実装するための基本的な部分はすべて揃いました。

## 動作確認

実装が完了したので、実際に動作を確認してみましょう。

まずは投稿者本人の場合を確認します。ログインした状態で自分の投稿の詳細ページにアクセスすると、右上に青い「削除」ボタンが表示されているはずです。

![投稿者本人に表示される削除ボタン](/img/rails/delete-button-owner.png)

このボタンをクリックすると投稿が削除され、「投稿が削除されました」というメッセージと共に投稿一覧ページに戻ります。一覧から該当の投稿が消えていることも確認できるでしょう。

次に投稿者以外の場合を確認します。別のユーザーでログインするか、ログアウトした状態で他者の投稿の詳細ページを開いてみてください。削除ボタンが表示されていなければ正常です。

![投稿者以外には削除ボタンが表示されない](/img/rails/no-delete-button-other-user.png)

## テスト作成

機能が正しく動作することを確認するためのテストを追加しましょう。

spec/system/posts_spec.rb

```ruby
# ...

describe 'ログ削除機能の検証' do
  context '投稿したユーザーでログインしている場合' do
    before do
      sign_in @user # テストユーザーでログイン
      visit "/posts/#{@post.id}" # 投稿詳細ページにアクセス
    end

    it '削除ボタンを表示する' do
      expect(page).to have_button('削除') # 削除ボタンが表示されていることを確認
    end

    it '削除ボタンをクリックすると削除できる' do
      expect do
        click_button '削除'
      end.to change(Post, :count).by(-1) # 削除ボタンをクリックすると投稿が1件減ることを確認

      expect(current_path).to eq('/posts') # 投稿一覧ページにリダイレクトされていることを確認
      expect(page).to have_content('投稿が削除されました') # 削除完了メッセージが表示されていることを確認
      expect(page).not_to have_content('RSpec学習完了') # 削除した投稿が一覧に表示されていないことを確認
    end
  end

  context '投稿したユーザーでログインしていない場合' do
    it '削除ボタンを表示しない' do
      visit "/posts/#{@post.id}" # 投稿詳細ページにアクセス
      expect(page).not_to have_button('削除') # 削除ボタンが表示されていないことを確認
    end

    it '直接リクエストを投げても削除されない' do
      expect do
        delete post_path(@post) # DELETE リクエストを直接送信
      end.not_to change(Post, :count) # 投稿レコードの数が変わらないことを確認
    end
  end
end

# ...
```

このテストでは、**投稿者本人がログインしている場合**と、**そうでない場合**の両方をテストしています。

投稿者本人の場合は、削除ボタンが表示されるか、そしてボタンをクリックすると実際に投稿が削除されるかを確認します。投稿者以外の場合は、削除ボタンが表示されないことを確認するだけでなく、直接 DELETE リクエストを送っても投稿が削除されないことも確認しています。

特に後者のテストは重要で、単に UI で削除ボタンを隠すだけでなく、バックエンド側でもしっかりと権限チェックが行われていることを確認しています。実は削除ボタンが表示されていなくても JavaScript などを使って直接 DELETE リクエストを送信することは可能です。そのため、バックエンド側で不正なリクエストを防いでいることを、テストでチェックしています。

これらのテストを実行して、すべてのテストがパスすることを確認しましょう。

```bash
$ bin/rspec

...

Finished in 1.3 seconds (files took 0.30586 seconds to load)
60 examples, 0 failures
```

## 変更をコミット

ここまでの変更をコミットして、実装を完了させましょう。

```bash
$ git add .
$ git commit -m "学習ログ削除機能を作成"
$ git push
```

## 補足: Devise のヘルパーメソッド

今回使用した `user_signed_in?` は Devise が提供するヘルパーメソッドのひとつです。このメソッドはユーザーがログインしているかどうかを真偽値で返すため、ログイン状態に応じた処理を簡単に実装できます。

Devise では他にも便利なヘルパーメソッドが用意されており、`current_user` でログイン中のユーザー情報を取得したり、`authenticate_user!` でログインを強制したりできます。これらのメソッドはコントローラとビューの両方で使用でき、認証に関連する処理を簡潔に記述できるので、Devise を使っている場合は積極的に活用すると良いでしょう。

## まとめ

本章では、学習ログを削除する機能を実装しました。この機能により、ユーザーは自分の投稿を管理できるようになりました。また、セキュリティ面にも配慮し、投稿者本人だけが削除できるような制限を設けました。

重要なポイントとして、フロントエンド（ビュー）とバックエンド（コントローラ）の両方で権限チェックを行うことで、より堅牢なセキュリティを実現しています。これは実際のアプリケーション開発でも重要な考え方です。

また、Devise のヘルパーメソッドを活用することで、認証に関連する処理を簡潔に記述できることも学びました。今後もこれらのテクニックを活用して、さまざまな機能を実装していきましょう。
