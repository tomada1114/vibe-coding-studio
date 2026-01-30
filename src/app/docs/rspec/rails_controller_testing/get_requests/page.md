---
title: 記事一覧の取得（GETリクエスト）をテストしよう
nextjs:
  metadata:
    title: 記事一覧の取得（GETリクエスト）をテストしよう
    description: RailsアプリケーションのコントローラテストをRSpecで実装する方法を学びます。リクエストスペックを使って記事一覧の取得機能をテストし、HTTPリクエスト/レスポンスの仕組みを理解できます。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [コントローラの役割と重要性](#コントローラの役割と重要性)
- [ArticlesControllerの作成](#articlescontrollerの作成)
- [コントローラの実装](#コントローラの実装)
- [ルーティングの設定](#ルーティングの設定)
- [リクエストスペックの作成](#リクエストスペックの作成)
- [テストの実行と結果の確認](#テストの実行と結果の確認)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Railsアプリケーションにおけるコントローラの役割と重要性について理解する
- リクエストスペックの基本概念と、コントローラのテスト手法を習得する
- HTTPリクエスト/レスポンスの基本的な仕組みと、JSONを用いたデータのやり取りについて学ぶ
- 実践的なテストコードの書き方と、テストデータの準備方法を身につける
- モダンなWeb開発におけるAPIの役割と設計思想について理解を深める

## はじめに

Webアプリケーションを開発する際、**コントローラ**は「交通整理係」のような役割を果たしています。

ユーザーがブラウザでアクセスすると、そのリクエストを最初に受け取り、適切な処理を行い、必要な情報を返します。
この一連の流れを管理するのが、コントローラの仕事です。

今回は、記事の一覧を取得する機能を実装し、それをRSpecでテストする方法を学んでいきましょう。

## コントローラの役割と重要性

まず、コントローラがWebアプリケーションでどのような役割を担っているかを理解しましょう。

コントローラは、ユーザーからのリクエストを受け取ると、その内容を解析します。
必要なデータをモデルから取得したり、データベースに保存したりして、処理結果に基づいて適切なレスポンスを返却します。

このように、コントローラはWebアプリケーションの「司令塔」として機能し、ユーザーとデータベースの間を仲介する役割を果たしています。

## ArticlesControllerの作成

それでは、実際に記事の一覧を表示するためのコントローラを作成していきます。

Railsには便利なジェネレーターが用意されており、これを使うことで必要なファイル一式を自動的に生成できます。
以下のコマンドを実行してみましょう。

```bash
$ bundle exec rails g controller Articles index
```

このコマンドを実行すると、以下のような出力が表示されます。

```bash
      create  app/controllers/articles_controller.rb
       route  get "articles/index"
      invoke  erb
      create    app/views/articles
      create    app/views/articles/index.html.erb
      invoke  rspec
      create    spec/requests/articles_spec.rb
```

これらのファイルが自動的に生成されました。
特に、`articles_controller.rb`がコントローラの本体で、`articles_spec.rb`がテストファイルです。

## コントローラの実装

次に、生成されたコントローラファイル（`app/controllers/articles_controller.rb`）に、記事一覧を返すための実装を追加します。

ファイルを開いて、以下のように記述してください。

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
    render json: @articles
  end
end
```

このコードの内容を詳しく見てみましょう。

`index`アクションは、URLにアクセスされた際に実行されるメソッドです。
`Article.all`で、データベースから全ての記事データを取得しています。
そして、`render json:`で、取得したデータをJSON形式で返すように指定しています。

JSON形式とは、データを構造化して送受信するための形式で、Webアプリケーションでは非常によく使われます。

## ルーティングの設定

コントローラを作成したら、次はURLとコントローラのアクションを紐付ける**ルーティング**を設定します。

`config/routes.rb`ファイルを開いて、以下の設定を追加してください。

```ruby
Rails.application.routes.draw do
  resources :articles
end
```

`resources`メソッドを使用することで、RESTfulな一連のルーティングが自動的に設定されます。

これにより、記事の一覧表示、詳細表示、作成、更新、削除といった基本的な操作に必要なルーティングが一括で設定されます。
今回は一覧表示の機能を作成していますが、将来的に他の機能も追加する予定なので、この書き方を使っています。

## リクエストスペックの作成

コントローラの動作を確認するために、**リクエストスペック**を作成します。

リクエストスペックは、実際のHTTPリクエストをシミュレートし、アプリケーションの挙動を検証するためのテストです。
ユーザーがブラウザでアクセスするのと同じような流れで、コントローラの動作をテストできます。

`spec/requests/articles_spec.rb`ファイルを開いて、以下のように記述してください。

```ruby
require 'rails_helper'

RSpec.describe "Articles", type: :request do
  describe "GET /articles" do
    before do
      @article1 = Article.create(title: "最初の記事", content: "最初の記事の本文です。")
      @article2 = Article.create(title: "2番目の記事", content: "2番目の記事の本文です。")
    end

    it "すべての記事を取得できる" do
      get "/articles"
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json.size).to eq(2)
      expect(json.first["title"]).to eq("最初の記事")
      expect(json.second["title"]).to eq("2番目の記事")
    end
  end
end
```

このテストコードの内容を詳しく解説します。

まず、`before`ブロックで、テスト用のデータを2件作成しています。
これにより、テストが実行される前に、あらかじめ記事データがデータベースに保存されます。

テスト本体では、`get "/articles"`で記事一覧のURLにアクセスしています。
そして、リクエストが成功すること（ステータスコード200の確認）、期待する数のデータが返されること（配列のサイズチェック）、返されるデータの内容が正しいこと（タイトルの検証）を確認しています。

`JSON.parse(response.body)`では、コントローラから返されたJSONデータを解析して、Rubyのオブジェクトに変換しています。

## テストの実行と結果の確認

作成したテストを実行して、コントローラが期待通りに動作することを確認しましょう。

以下のコマンドを実行してください。

```bash
$ bundle exec rspec spec/requests/articles_spec.rb
```

テストが成功すると、以下のような出力が表示されます。

```bash
Articles
  GET /articles
    すべての記事を取得できる

Finished in 0.12963 seconds (files took 0.98718 seconds to load)
1 example, 0 failures
```

このように表示されれば、テストは正常に通過しています。
コントローラが正しく実装され、記事一覧の取得機能が期待通りに動作していることが確認できました。

## まとめ

本章では、Railsアプリケーションのコントローラテストについて学びました。
以下の内容を理解できたことと思います。

- コントローラがWebアプリケーションにおいて果たす「交通整理係」としての役割
- Railsジェネレーターを使った効率的なファイル生成方法
- RESTfulなルーティングの設定と、その利点について
- JSON形式でのデータ提供と、APIとしての機能実装について
- リクエストスペックを用いた実践的なコントローラテスト手法

コントローラのテストは、Webアプリケーションの品質を保つ上で欠かせない要素です。
ユーザーがアクセスした際に正しくデータが返されることを、自動的に確認できるようになりました。
