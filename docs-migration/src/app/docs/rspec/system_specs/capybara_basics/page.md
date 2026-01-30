---
title: RSpeccとCapybaraでブラウザ操作をテストしよう
nextjs:
  metadata:
    title: RSpecとCapybaraでブラウザ操作をテストしよう
    description: RSpecとCapybaraを使ったシステムスペックの基本的な書き方を学び、実際のブラウザ操作を再現したテストの実装方法を習得できます。リクエストスペックとの違いやCapybaraの設定方法についても詳しく解説します。
---

# RSpecとCapybaraでブラウザ操作をテストしよう

## 学習の目標

本章では、以下の内容を学習します。

- システムスペックとリクエストスペックの違いを理解する
- Capybaraを使用したブラウザ操作の自動テストの基本的な実装方法を習得する
- ブラウザでの実際のユーザー操作を想定したテストシナリオの設計と実装について学ぶ
- テスト環境のセットアップから実行までの一連のワークフローを体系的に理解する

## はじめに

これまでArticlesコントローラを使って、JSONレスポンスのテストをリクエストスペックで書いてきました。
リクエストスペックでは主にAPIのレスポンス内容を検証していましたが、実際のWebアプリケーションでは、ユーザーがブラウザを通して操作することがほとんどです。

本章では、新しく**システムスペック**について学んでいきます。
システムスペックを使うことで、より実際のユーザー体験に近いテストを作成できるようになります。

## リクエストスペックとシステムスペックの違い

まず、これまで学んできたリクエストスペックとシステムスペックの違いを理解しましょう。

### リクエストスペックの特徴

リクエストスペックでは、ステータスコードやJSONレスポンスの内容など、特定のページにアクセスしたときのサーバーからの応答だけをテストしていました。
これは主にAPI開発において、データの送受信が正しく行われるかを確認するために使われます。

### システムスペックの特徴

一方システムスペックでは、ブラウザに表示されるHTMLの内容や、リンクのクリック、そしてフォームへの入力など、より実際のユーザー操作に近い形でテストを書きます。

システムスペックは、Railsに標準で組み込まれているブラウザテスト機能です。
内部では**Capybara**というライブラリを使って、実際のブラウザ操作を再現します。

リンクのクリックやフォームへの入力、画面の表示内容の確認まで、人間が行う操作を全てテストできるため、アプリケーションの品質をより確実に保証できます。

## 必要なgemの追加

System Specを使うために、まずGemfileにCapybaraを追加します。

Gemfileを開いて、`group :test`ブロックを追加します。
そして、その中に`gem 'capybara'`という行を追加します。

```ruby
group :test do
  gem 'capybara'
end
```

そして、`bundle install`というコマンドを実行して、gemをインストールします。

```bash
bundle install
```

## Todoモデルの作成

では、実際にシステムスペックを書いていきましょう。
まずはアプリケーションに必要なモデルを作成します。

`rails g`コマンドを実行して、Todoモデルを作成します。
このコマンドでは、タイトル、説明、完了状態を持つシンプルなTodoアプリケーションのモデルを生成します。

```bash
bundle exec rails generate model Todo title:string description:text completed:boolean
```

## マイグレーションの設定と実行

次に、マイグレーションファイルを編集して、デフォルト値を設定します。
`completed`フィールドには、初期状態として`false`を設定しておくと便利です。

```ruby
class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.boolean :completed, default: false # 追記
      t.timestamps
    end
  end
end
```

`bundle exec rails db:migrate`というコマンドを開発環境に対して実行し、さらに`RAILS_ENV=test bundle exec rails db:migrate`というコマンドでテスト環境にも適用します。

```bash
bundle exec rails db:migrate
bundle exec rails db:migrate RAILS_ENV=test
```

テスト環境にもマイグレーションを適用することで、テスト実行時にデータベースの構造が正しく反映されます。

## コントローラとルーティングの設定

`rails g`コマンドを実行して、必要なアクションを持つコントローラを生成します。
ここでは、TodoのCRUD操作に必要な全てのアクションを含むコントローラを作成します。

```bash
bundle exec rails generate controller Todos index new create show edit update destroy
```

`config/routes.rb`を開いて、ルーティングを確認します。
すでにarticlesのルーティングが設定されているので、todosのルーティングを追加します。

```ruby
Rails.application.routes.draw do
  resources :articles
  resources :todos
end
```

## 基本的なコントローラの実装

`app/controllers/todos_controller.rb`を開いて、まずは最も基本的なindexアクションを実装します。
このアクションでは、データベースに保存されている全てのTodoを取得して、ビューに渡します。

```ruby
class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  # ...既存コードは省略
end
```

## 動作確認

実装したら、rails consoleを使って動作確認をしてみましょう。
`bundle exec rails console`というコマンドでコンソールを起動し、以下のようにテストデータを作成します。

```ruby
Todo.create!(title: "hoge", description: "hogehoge", completed: false)
Todo.create!(title: "fuga", description: "fugafuga", completed: true)
```

これで、テスト用のデータが2件作成されます。

## ビューの作成

次に、`app/views/todos/index.html.erb`ファイルを作成して、Todoの一覧を表示できるようにします。
このビューでは、Todoのタイトル、説明、完了状態を表示し、新規作成へのリンクも配置します。

```erb
<h1>Todo一覧</h1>
<div class="todos">
  <% @todos.each do |todo| %>
    <div class="todo">
      <h2><%= todo.title %></h2>
      <p><%= todo.description %></p>
      <p>
        状態: <%= todo.completed ? "完了" : "未完了" %>
      </p>
    </div>
  <% end %>
</div>
<%= link_to "新規作成", new_todo_path %>
```

## システムスペックの作成

これで基本的な画面が完成したので、この画面をテストするためのシステムスペックを書いていきましょう。

システムスペックは、`spec/system`ディレクトリに配置します。
最初は`spec/system`ディレクトリが存在しないので、作成します。

```bash
mkdir spec/system
```

まずは`spec/system/todos_spec.rb`ファイルを作成して、最初のシステムスペックを書いてみましょう。

```ruby
require 'rails_helper'

RSpec.describe 'Todo管理', type: :system do
  before do
    driven_by(:rack_test)
  end

  it 'Todo一覧を表示する' do
    Todo.create!(
      title: 'テストTodo',
      description: 'これはテストTodoの説明です。'
    )

    visit todos_path
    expect(page).to have_content('Todo一覧')
    expect(page).to have_content('テストTodo')
    expect(page).to have_content('これはテストTodoの説明です。')
    expect(page).to have_content('未完了')
  end
end
```

## システムスペックの詳細解説

このテストコードについて、一つずつ説明していきましょう。

### テストファイルの基本構造

まず、`RSpec.describe`に`type: :system`という指定をしています。
これにより、このテストがシステムスペックであることをRSpecに伝えています。

### テストドライバの設定

`before`ブロックでは、`driven_by`メソッドを使ってテストドライバを指定しています。
`rack_test`は最も軽量なドライバで、JavaScriptを使用しないテストに適しています。

### テストシナリオの実装

テストシナリオの中では、まずテストデータとしてTodoを1つ作成しています。
このデータは、テスト実行時にのみ存在し、テスト終了後は自動的に削除されます。

そして、`visit`メソッドを使ってTodo一覧ページにアクセスします。
`visit`は、実際のブラウザでページを開く操作を再現するメソッドです。

### ページ内容の検証

最後に、`page`オブジェクトを使ってページの内容を確認します。
`have_content`マッチャーを使うと、ページ内に特定のテキストが存在するかどうかを確認できます。

これにより、Todoの一覧が正しく表示されることをテストできます。

## テストの実行

では、作成したシステムスペックを実行してみましょう。
`bundle exec rspec spec/system/todos_spec.rb`というコマンドを実行します。

```bash
bundle exec rspec spec/system/todos_spec.rb
```

テストが成功すると、次のような表示が出ます。

```bash
Todo管理
  Todo一覧を表示する

Finished in 0.12487 seconds (files took 0.89012 seconds to load)
1 example, 0 failures
```

このように、テストが成功したことがわかります。

## まとめ

本章では、システムスペックの基本的な書き方と実行方法を学びました。

システムスペックを使うことで、実際のユーザー操作を再現したテストが書けることがわかりましたね。
リクエストスペックがAPIのレスポンスを検証するのに対し、システムスペックはブラウザでの表示内容や操作を包括的にテストできます。

Capybaraライブラリを使うことで、`visit`メソッドによるページアクセスや`have_content`マッチャーによる内容確認など、直感的にテストコードを書くことができました。

次のセクションでは、新規作成フォームのテストを書いていきましょう。
