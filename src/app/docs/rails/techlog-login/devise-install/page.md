---
title: Devise をインストールしてユーザー認証機能を追加しよう
nextjs:
  metadata:
    title: Devise をインストールしてユーザー認証機能を追加しよう
    description: DeviseというGemを使って、Webアプリケーションにユーザー認証機能を簡単に実装する方法を学びます。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Devise とは](#devise-とは)
- [Devise をインストール](#devise-をインストール)
- [Devise の初期設定](#devise-の初期設定)
- [User モデルを Devise で作成](#user-モデルを-devise-で作成)
  - [生成されたファイル](#生成されたファイル)
  - [編集されたファイル](#編集されたファイル)
- [マイグレーション実行](#マイグレーション実行)
- [nickname カラムを追加](#nickname-カラムを追加)
  - [開発環境でのマイグレーション実行](#開発環境でのマイグレーション実行)
  - [テスト環境でのマイグレーション実行](#テスト環境でのマイグレーション実行)
- [ストロングパラメータの設定](#ストロングパラメータの設定)
- [変更をコミット](#変更をコミット)
- [Devise の活用方法](#devise-の活用方法)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Devise という Gem の役割と基本機能を理解する
- Devise を Rails アプリケーションにインストールして初期設定を行う
- User モデルを作成してユーザー情報を管理できるようにする
- データベースマイグレーションを使ってテーブル構造を変更する
- ストロングパラメータの設定方法を学ぶ

## はじめに

今回から、近年の Web アプリケーションではほぼ標準的に備わっている**ユーザー認証機能**を作成していきます。

TechLog では誰でも学習ログを投稿できるわけではなく、事前に新規登録したユーザーだけが投稿できるようにします。ユーザー認証機能を実装することで、ユーザーごとに投稿した学習ログを管理できるようになります。

ユーザー認証は多くのWebサイトで使われている機能です。例えばショッピングサイトやSNS、ブログなど、ほとんどのWebサービスではユーザー登録とログイン機能が実装されています。このような機能は現場でも頻繁に使われるため、しっかりと理解しておくことが大切です。

## Devise とは

ここでは便利なログイン機能を手軽に実装できる **Devise** という gem を使用します。

ユーザー認証機能をゼロから作成することも可能ですが、基本的な新規登録・ログイン・ログアウト機能でも、エラー処理を考慮すると相当な手間がかかります。一方、Devise を使うと、簡単に新規登録・ログイン・ログアウトといった基礎的な機能を実装できます。

Devise には以下のような便利な機能が含まれています。

- ユーザー登録（サインアップ）機能
- ログイン・ログアウト機能
- パスワード再設定機能
- アカウントのロック機能
- メール認証機能

また、ログインしているユーザー ID を簡単に view で使えるなど、ユーザー認証機能に付随して使いたい機能も多く備わっています。

他にもパスワード再発行機能など、使える機能は多いですが、一度に全てを理解するのは難しいため、まずは基本的な機能を使いこなすことを目指しましょう。

## Devise をインストール

まずは Devise を Rails アプリケーションにインストールしましょう。Gemfile を開き、以下の 1 行を追加します。

```ruby
gem 'devise' # 追記
```

なお、devise は本番環境でも使用するため、group は development でも test でもない、一番下などに記載してください。Gemfile の構成によって異なりますが、以下のような位置に追加するとよいでしょう。

```ruby
# 例: Gemfileの一番下あたりに追加
gem 'devise'
```

Gemfile に追記が完了したら、bundle install コマンドを実行します。

```bash
$ bundle install
Fetching devise 4.8.1
Installing devise 4.8.1
Bundle complete! 24 Gemfile dependencies, 102 gems now installed.
Bundled gems are installed into `./.bundle`
```

コンソールに上記のようなメッセージが表示されれば、Devise のインストールは成功です。

## Devise の初期設定

devise の初期設定に必要なファイルは、コマンドで簡単に作成できます。devise をインストールすると `rails g devise:xxx` というコマンドがいくつか使えるようになります。

まずは `rails g devise:install` コマンドを実行して、必要な設定ファイルを生成しましょう。

```bash
$ bin/rails g devise:install
      create  config/initializers/devise.rb
      create  config/locales/devise.en.yml
```

コマンドを実行することで、config ディレクトリ配下に以下の2つのファイルが生成されました。

1. **config/initializers/devise.rb**
   devise に関する様々な設定を記述するファイルです。例えば、パスワードの最小文字数やメール送信の設定などが含まれています。

2. **config/locales/devise.en.yml**
   devise を使った操作で画面にメッセージを表示する際、どのような内容を表示するかを決めているファイルです。ファイル名の .en は英語 (English) であることを示しており、英語でのメッセージ専用のファイルとなっています。

TechLog は日本語の Web アプリですので、後のカリキュラムで日本語用のファイルも作成していきます。

## User モデルを Devise で作成

次に、ユーザーを表す **User モデル**を作成します。ユーザー認証機能を実装する際、ユーザー情報を管理するためのモデルが必要です。例えば、ユーザー名、メールアドレス、パスワードなどの情報を管理するためのモデルです。

通常、モデルを作成するには `rails g model Xxx` コマンドを使うことを学んできました。しかし、devise を活用した User モデルを作成するには `rails g devise User` とする必要があるので注意してください。

では、User モデルを作成してみましょう。`bin/rails g devise User` というコマンドを使います。

```bash
$ bin/rails g devise User
      invoke  active_record
      create    db/migrate/20250308014808_devise_create_users.rb
      create    app/models/user.rb
      invoke    rspec
      create      spec/models/user_spec.rb
      invoke      factory_bot
      create        spec/factories/users.rb
      insert    app/models/user.rb
       route  devise_for :users
```

新しく生成されたファイルと、自動的に編集されたファイルについて説明します。

### 生成されたファイル

- **db/migrate/20250308014808_devise_create_users.rb**
  - users テーブルを作成するためのマイグレーションファイルです。このファイルを実行することで、データベースに users テーブルが作成されます。

- **app/models/user.rb**
  - User モデルを扱うためのファイルです。devise の機能が組み込まれた状態で生成されています。

- **spec/models/user_spec.rb**
  - User モデルの RSpec (テスト) ファイルです。テストを書く際に使用します。

- **spec/factories/users.rb**
  - テスト内で一時的に User を作成するための FactoryBot 用ファイルです。

### 編集されたファイル

また、ルーティングも自動的に編集されていることに気づいたでしょうか？

```ruby
Rails.application.routes.draw do
  devise_for :users # この1行が追加されている
  root 'home#top'
end
```

見慣れない形ではありますが、devise ではこの 1 行で基本的なルーティング設定は完結するよう、裏側で複雑な設定が行われています。

例えば `/users/sign_up` というパスにアクセスすることで、ユーザーの新規登録画面を開くことができます。他にも `/users/sign_in`（ログイン画面）や `/users/sign_out`（ログアウト処理）など、多くのルートが自動的に設定されています。

このように、devise を使うことでユーザー認証機能を簡単に実装できますので、使いこなしていきましょう。

## マイグレーション実行

前項でマイグレーションファイルが自動的に生成されましたので、マイグレーションを実行しておきます。マイグレーションとは、データベースの構造を変更するための仕組みで、今回は users テーブルを作成します。

```bash
$ bin/rails db:migrate
== 20250308014808 DeviseCreateUsers: migrating ================================
-- create_table(:users)
   -> 0.0013s
-- add_index(:users, :email, {:unique=>true})
   -> 0.0004s
-- add_index(:users, :reset_password_token, {:unique=>true})
   -> 0.0004s
== 20250308014808 DeviseCreateUsers: migrated (0.0021s) =======================
```

これで、users テーブルが作成されました。

また、User モデルについては RSpec でテストもしていくので、テスト環境についてもマイグレーションを実行しておきます。開発環境とテスト環境は別々にデータベースを持っているため、マイグレーションも別々に実行する必要があります。

以下のコマンドでテスト環境のマイグレーションを実行してください。

```bash
$ RAILS_ENV=test bin/rails db:migrate
== 20250308014808 DeviseCreateUsers: migrating ================================
-- create_table(:users)
   -> 0.0004s
-- add_index(:users, :email, {:unique=>true})
   -> 0.0001s
-- add_index(:users, :reset_password_token, {:unique=>true})
   -> 0.0001s
== 20250308014808 DeviseCreateUsers: migrated (0.0007s) =======================
```

`RAILS_ENV=test` という部分は、テスト環境を指定するための記述です。これにより、テスト環境のデータベースに対してマイグレーションが実行されます。

## nickname カラムを追加

TechLog では、誰が投稿した学習ログであるかを表すために **ニックネーム (nickname)** を使用します。

現在の users テーブルでは nickname カラムが含まれていないため、追加するためのマイグレーションファイルを生成します。テーブルにカラムを追加するためのマイグレーションファイルは、以下のコマンドで生成できます。

```bash
$ bin/rails g migration AddNicknameToUser nickname:string
      invoke  active_record
      create    db/migrate/20250308015254_add_nickname_to_user.rb
```

`AddNicknameToUser` という名前は自由につけることができますが、今回は nickname カラムを追加するため `AddNicknameToUser` としました。これは Rails の命名規則に沿ったもので、`Add[カラム名]To[テーブル名]` という形式が一般的です。

また、`nickname:string` という引数は、nickname カラムを追加する際のデータ型を指定しています。今回は文字列を格納するため、string 型を指定しています。

生成されたマイグレーションファイルを開いて、中身を確認してみましょう。db/migrate フォルダ内の、一番新しいファイルを開いてください。

（ファイル名は、実行した日時によって異なるため以下のコードは参考までに）

```ruby
class AddNicknameToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :nickname, :string
  end
end
```

上記のマイグレーションファイルでは `add_column :users, :nickname, :string` という 1 行が追加されています。これは、users テーブルに nickname カラムを追加するためのコードです。

`add_column` メソッドの引数は以下の通りです。

1. 最初の引数 `:users` - カラムを追加するテーブル名
2. 2番目の引数 `:nickname` - 追加するカラム名
3. 3番目の引数 `:string` - カラムのデータ型

このように、Rails ではマイグレーションファイルを使ってデータベースのテーブル構造を変更することができます。テーブルの作成だけでなく、カラムの追加や削除、データ型の変更なども行えるので、覚えておくと便利です。

では development と test それぞれの環境のデータベースでマイグレーションを実行しておきます。

### 開発環境でのマイグレーション実行

```bash
$ bin/rails db:migrate
== 20250308015254 AddNicknameToUser: migrating ================================
-- add_column(:users, :nickname, :string)
   -> 0.0010s
== 20250308015254 AddNicknameToUser: migrated (0.0011s) =======================
```

### テスト環境でのマイグレーション実行

```bash
$ RAILS_ENV=test bin/rails db:migrate
== 20250308015254 AddNicknameToUser: migrating ================================
-- add_column(:users, :nickname, :string)
   -> 0.0003s
== 20250308015254 AddNicknameToUser: migrated (0.0004s) =======================
```

これで、users テーブルに nickname カラムが追加されました。

## ストロングパラメータの設定

devise では新規登録やログイン時に受け付けるパラメータを制限する仕組みが備わっています。これは、**ストロングパラメータ**という仕組みで、不正なパラメータを弾くことでセキュリティを高めるためのものです。

そのため、マイグレーションで nickname カラムを増やしていたとしても、新規登録時の入力フォームで渡されたパラメータ内の nickname は自動的に弾かれてしまいます。

つまり、フォームから送信された nickname の値は、セキュリティの観点から無視されてしまうのです。これを回避するために、nickname というパラメータを明示的に許可する設定が必要になります。

そこで、今回は新規登録時に nickname というパラメータを受け付けるように設定します。そのためには、application_controller.rb にストロングパラメータを設定する必要があります。

公式の README の指示通りに設定しましょう。app/controllers/application_controller.rb の中身に、以下のコードを追加してください。

```ruby
class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  ### 以下を追加 ###

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end
end
```

このコードは、新規登録時に nickname というパラメータを受け付けるように設定しています。

まず、`before_action :configure_permitted_parameters, if: :devise_controller?` という行で、devise のコントローラーが呼び出される前に `configure_permitted_parameters` メソッドを実行するように設定しています。

次に、`configure_permitted_parameters` メソッド内で `devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])` を実行しています。これにより、devise の新規登録時に nickname というパラメータを許可するように設定しています。

このように、ストロングパラメータを設定することで、devise の新規登録時に nickname というパラメータを受け付けることができるようになります。

見慣れないコードかもしれませんが、devise を使う際にはこのような設定が必要になることが多いため、「こういうもの」として覚えておくといいでしょう。

## 変更をコミット

これで devise を使うための初期設定は完了しました。ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "deviseインストールと初期設定完了"
$ git push
```

## Devise の活用方法

devise を使うと最低限の設定でユーザー認証機能を実装できる反面、devise (gem) の中で何をやっているかが分からないため、カスタマイズをしたい時に取り組みにくいというデメリットがあります。

しかし、よく使われる devise の機能は限られているため、その全容を把握しておくだけでも今後の実装がスムーズになります。以下のような機能やヘルパーメソッドは特に覚えておくと便利です。

- `current_user` - 現在ログインしているユーザーの情報を取得できる
- `user_signed_in?` - ユーザーがログインしているかどうかを判定できる
- `before_action :authenticate_user!` - ログインしていないとアクセスできないページを作る

どのようなヘルパーメソッドがあるか、認証周りの裏側ではどのような処理がされているのかを学んでおくことをお勧めします。

## まとめ

本章では、devise を使ったユーザー認証機能の実装方法について学びました。以下の内容をマスターできたことと思います。

- devise というgemを使うと、ユーザー認証機能を簡単に実装できる
- devise をインストールして初期設定を行う方法
- User モデルの作成とマイグレーションの実行方法
- nickname カラムの追加方法
- ストロングパラメータの設定方法

devise を使うことで、ゼロからユーザー認証機能を実装する手間を大幅に削減できることが分かりました。また、マイグレーションファイルを作成してデータベースの構造を変更する方法や、ストロングパラメータの設定方法についても学習しました。

次の章では、実際に devise を使ってユーザー登録やログイン機能を実装していきます。
