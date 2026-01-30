---
title: 処理成功・失敗時のフラッシュメッセージを表示しよう
nextjs:
  metadata:
    title: 処理成功・失敗時のフラッシュメッセージを表示しよう
    description: Railsのflashを使ってユーザー認証時のフィードバックを提供し、ユーザー体験を向上させる方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [部分テンプレート作成](#部分テンプレート作成)
- [補足：flashを使って表示するフラッシュメッセージ](#補足flashを使って表示するフラッシュメッセージ)
- [部分テンプレート読み込み](#部分テンプレート読み込み)
- [動作確認](#動作確認)
- [テスト修正](#テスト修正)
- [変更をコミット](#変更をコミット)
- [補足：flashとは](#補足flashとは)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Railsのflashの基本概念と使い方を理解する
- 部分テンプレートを使ったフラッシュメッセージの表示方法を習得する
- Tailwind CSSを使ったアラートスタイルの実装方法を学ぶ
- システムテストでのフラッシュメッセージ検証方法をマスターする

## はじめに

現状、ログインに成功したとしてもただトップページにリダイレクトされるだけで、ぱっと見だとログインできているかが分かりません。これだとユーザーからはログイン機能の使い勝手が分かりにくいため、ログイン成功時・失敗時には、その旨が画面上部にフラッシュメッセージとして表示されるようにしましょう。

## 部分テンプレート作成

まずは、フラッシュメッセージを表示するための**部分テンプレート**を作成します。

`app/views/shared`というディレクトリに `_flash.html.erb`というファイルを作成してください。中身は以下の通りにします。

app/views/shared/_flash.html.erb

```erb
<% if flash[:notice] %>
  <div class="p-4 mt-3 mb-4 mx-3 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
    <%= flash[:notice] %>
  </div>
<% end %>

<% if flash[:alert] %>
  <div class="p-4 mt-3 mb-4 mx-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
    <%= flash[:alert] %>
  </div>
<% end %>
```

## 補足：flashを使って表示するフラッシュメッセージ

念のため、`flash`という機能について改めて説明しておきます。

`flash`はRailsで用意されているデータ構造で、アクション間でデータを受け渡すために使われます。`flash[:notice]`は通常のメッセージを表示するためのキーで、`flash[:alert]`はエラーメッセージを表示するためのキー（どの種類のフラッシュメッセージを表示するのかを表す識別子）です。

今回、特に`flash[:notice]`と`flash[:alert]`の2つを使っていますが、他にも`flash[:warning]`なども使えます。

なお、どのメッセージのときに`flash[:notice]`を使い、どのメッセージのときに`flash[:alert]`を使うかは自由です。本来はコントローラで設定するのですが、Deviseがデフォルトで設定してくれているため、特に設定は不要です。

## 部分テンプレート読み込み

フラッシュメッセージ用の部分テンプレートはすべての画面で使い回すものですので、すべての画面に表示するためのビューである`app/views/layouts/application.html.erb`に手を加えます。

以下のように、mainタグの上に1行を追加してください。

app/views/layouts/application.html.erb

```erb
...
<body class="h-screen bg-blue-50">
  <%= render 'shared/navbar' %>
  <%= render 'shared/flash' %> <%# この行を追加 %>
  <main class="container mx-auto mt-20 py-8 px-5 flex items-center justify-center">
    <%= yield %>
  </main>
</body>
```

これで、フラッシュメッセージに内容が入ってきた時には常に一番上に表示されるようになります。

## 動作確認

では、ログインページ`http://127.0.0.1:3000/users/sign_in`で確認していきます。（ログイン済みの場合は、ログアウトしておきましょう）

まずは、ログインフォームに何も入力せずに「ログイン」ボタンを押してください。メールアドレス、またはパスワードが無効である旨の（alertレベルの）フラッシュメッセージが表示されます。

![ログイン失敗時のフラッシュメッセージ](/img/rails/techlog-login-failed-flash-message.png)



次に、エラーがなかった場合のフラッシュメッセージを確認します。作成済みユーザーの認証情報を用いてログインし、ログインに成功した旨の（noticeレベルの）フラッシュメッセージが表示されることを確認します。

![ログイン成功時のフラッシュメッセージ](/img/rails/techlog-login-success-flash-message.png)

これで、フラッシュメッセージを表示させるという仕様は実現できていることを画面からも確認できました。

## テスト修正

では、システムテストを追加しましょう。（今回のテストは、後にメッセージを日本語化することに備える意味合いがあります。）

`spec/system/users_spec.rb`の中で`describe 'ログイン機能の検証'`というブロックにテストを追加していきます。

修正後のテストは以下のようになります。

spec/system/users_spec.rb

```ruby
  # ...
  describe 'ログイン機能の検証' do
    before do
      create(:user, nickname: nickname, email: email, password: password, password_confirmation: password)
      visit '/users/sign_in'
      fill_in 'user_email', with: email
      fill_in 'user_password', with: 'password'
      click_button 'ログイン'
    end

    context '正常系' do
      it 'ログインに成功し、トップページにリダイレクトする' do
        expect(current_path).to eq('/')
      end

      it 'ログイン成功時のフラッシュメッセージを表示する' do # 追加
        expect(page).to have_content('Signed in successfully')
      end
    end

    context '異常系' do
      let(:password) { 'NGpassword' }

      it 'ログインに失敗し、ページ遷移しない' do
        expect(current_path).to eq('/users/sign_in')
      end

      it 'ログイン失敗時のフラッシュメッセージを表示する' do  # 追加
        expect(page).to have_content('Invalid Email or password')
      end
    end
  end
end
```

※ログアウト時のフラッシュメッセージについては、ログイン成功時と同じくDeviseによる`flash[:notice]`が表示されるだけですので、テストは省略しています。

実装は完成したはずなので、テストを実行しておきましょう。

```bash
$ bin/rspec spec/system/users_spec.rb

...

  ログイン機能の検証
    正常系
      ログインに成功し、トップページにリダイレクトする
      ログイン成功時のフラッシュメッセージを表示する
    異常系
      ログインに失敗し、ページ遷移しない
      ログイン失敗時のフラッシュメッセージを表示する

Finished in 6.22 seconds (files took 0.39357 seconds to load)
12 examples, 0 failures
```

テストに無事に通ることを確認しました。

## 変更をコミット

ここまで完了したら、変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "フラッシュメッセージを表示できるように変更"
$ git push
```

## 補足：flashとは

Railsにおける`flash`とは、アクション実行後にメッセージを一時的に表示させる仕組みです。

Deviseを使うとflashに関する設定は特にしなくても使えましたが、deviseに関連しないアクションで使う時には自分で設定する必要があります。よく使われる仕組みですので、この機会に覚えておきましょう。

- [【Rails】flashの使い方](https://qiita.com/d0ne1s/items/2eccf6b22e7ed1d25925)
- [Railsのflashの使い方をまとめてみた](https://qiita.com/mzmz__02/items/d92a1b735ac91d9c4a46)

## まとめ

本章では、Railsの`flash`を使ってユーザー認証時のフィードバックを提供する方法を学びました。部分テンプレートを使ってフラッシュメッセージを表示し、Tailwind CSSでスタイリングすることで、ユーザー体験を向上させることができました。

また、システムテストでフラッシュメッセージが正しく表示されていることを検証することで、この機能が期待通りに動作していることを確認しました。

次の章では、バリデーションのエラーメッセージを日本語化し、さらにユーザーフレンドリーなアプリケーションを目指していきます。
