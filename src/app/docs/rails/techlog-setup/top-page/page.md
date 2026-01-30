---
title: トップページを作成しよう
nextjs:
  metadata:
    title: トップページを作成しよう
    description: Rails のコントローラー作成とテストの基本的な書き方を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Home コントローラーの作成](#home-コントローラーの作成)
- [初期動作確認](#初期動作確認)
- [ルーティングの変更](#ルーティングの変更)
- [Home#top のテスト作成](#hometop-のテスト作成)
  - [テストの変更（リファクタリング）](#テストの変更リファクタリング)
  - [テストの実行](#テストの実行)
  - [変更のコミット](#変更のコミット)
- [RSpec テストに関する補足](#rspec-テストに関する補足)
  - [describe/context/it の使い分け](#describecontextit-の使い分け)
  - [RSpec マッチャ (matcher)](#rspec-マッチャ-matcher)
  - [HTTP ステータスコード](#http-ステータスコード)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Rails のコントローラー作成方法を習得する
- ルーティングの基本概念と設定方法を理解する
- RSpec を使った基本的なテスト作成方法を学ぶ
- コントローラーテストの書き方と実行方法を習得する
- HTTP ステータスコードの役割と重要性を理解する

## はじめに

ここまででテストやファイル生成といった、本格的にソースコードを変更するための準備を進めてきました。この章では、一旦仮のトップページを作成し、主にテストの基本的な書き方を学びましょう。

## Home コントローラーの作成

まずは `rails g controller` コマンドを使って Home コントローラーと top アクションを作成します。コマンドは `rails g controller コントローラー名 アクション名` という形式で実行します。

```bash
$ bin/rails g controller Home top
      create  app/controllers/home_controller.rb
       route  get "home/top"
      invoke  tailwindcss
      create    app/views/home
      create    app/views/home/top.html.erb
      invoke  rspec
      create    spec/requests/home_spec.rb
      create    spec/views/home
      create    spec/views/home/top.html.tailwindcss_spec.rb
```

このコマンドを実行すると、Home コントローラーやビュー、テストなど、必要なファイルが自動的に生成されます。前章で `config.generators` の設定を変更したため、不要なファイル（CSS、JavaScript、ヘルパー）は生成されていないことが確認できます。

## 初期動作確認

Home コントローラーを作成したら、一旦トップ画面にアクセスして動作確認をしましょう。`bin/dev` コマンドで開発用サーバを起動します。

```bash
$ bin/dev
11:30:30 web.1  | started with pid 41582
11:30:30 css.1  | started with pid 41583
11:30:33 web.1  | => Booting Puma
11:30:33 web.1  | => Rails 8.0.1 application starting in development
11:30:33 web.1  | => Run `bin/rails server --help` for more startup options
11:30:34 web.1  | Puma starting in single mode...
11:30:34 web.1  | * Puma version: 6.6.0 ("Return to Forever")
11:30:34 web.1  | * Ruby version: ruby 3.2.2 (2023-03-30 revision e51014f9c0) [arm64-darwin21]
11:30:34 web.1  | *  Min threads: 3
11:30:34 web.1  | *  Max threads: 3
11:30:34 web.1  | *  Environment: development
11:30:34 web.1  | *          PID: 41582
11:30:34 web.1  | * Listening on http://127.0.0.1:3000
11:30:34 web.1  | * Listening on http://[::1]:3000
11:30:34 web.1  | Use Ctrl-C to stop
11:30:35 css.1  | ≈ tailwindcss v4.0.9
11:30:35 css.1  |
11:30:35 css.1  | Done in 99ms
```

サーバが起動したら、ブラウザで `http://127.0.0.1:3000/home/top` にアクセスしましょう。

![Home#top ページ](/img/rails/home-top-initial.png)

このように、「Home#top」という文字が表示されていれば成功です。TechLog は Tailwind CSS を導入しているため、デフォルトで生成されるビューにも Tailwind CSS のスタイルが適用されています。

動作確認ができたら、ここまでの変更をコミットしておきましょう。サーバーは起動したままなので、別のターミナルを開いてコミットを行います。VS Code で `techlog-app` フォルダを右クリックして、新しいターミナルを開いてください。

```bash
$ git add .
$ git commit -m "Homeコントローラとtopアクションを作成"
```

また、Rubocop の検査もかけておきましょう。Rubocop の指摘は書き方のお作法に関するものがほとんどなので、自動修正してしまって問題ありません。

```bash
$ bundle exec rubocop -a
```

自動修正が完了したら、この段階で一旦コミットしておきます。

```bash
$ git add .
$ git commit -m "Rubocop による指摘事項修正"
```

## ルーティングの変更

次に、トップページを表示するためのルーティングを変更します。現在は `/home/top` というパスで Home コントローラーの top アクションが実行されますが、このページをサイトのトップページとするために、ルーティングを変更しましょう。

`config/routes.rb` ファイルを以下のように修正します。既存の記述はすべて消して、以下のように書き換えてください。

```ruby
Rails.application.routes.draw do
  root 'home#top'
end
```

この設定により、`/` というパス（ルートパス）にアクセスすると、Home コントローラーの top アクションが実行されるようになります。ブラウザで `http://127.0.0.1:3000` にアクセスし、Home#top が表示されることを確認してください。

![ルートパスでの Home#top 表示](/img/rails/home-top-root.png)

先ほどまでは `/home/top` にアクセスしていましたが、今回は `/` にアクセスするだけで同じ画面が表示されるようになりました。URL の末尾に何もつけないようなパスを「root」（ルート）と呼びます。ルートパスは、Webサイトのトップページや、特定のコンテンツを表示するページなどに使われることが多いです。

## Home#top のテスト作成

ここからは Home コントローラーの top アクションに関するテストを準備します。まだモデルは用意されていないため、基本的な動作のテストのみになりますが、簡単なところから始めて少しずつテストの書き方に慣れていきましょう。

### テストの変更（リファクタリング）

Home コントローラー作成時に、自動的に `spec/requests/home_spec.rb` というテストファイルが生成されています。このファイルを以下のように修正してください。

```ruby
require 'rails_helper'

RSpec.describe 'Home', type: :request do
  describe 'GET /' do
    it 'HTTP ステータス 200 を返す' do
      get '/'
      expect(response).to have_http_status(200)
    end
  end
end
```

このテストコードの各行の意味を詳しく見ていきましょう。

```ruby
require 'rails_helper'  # rails_helper で定義した設定を読み込む

RSpec.describe 'Home', type: :request do  # テスト対象モジュールとテストの種類を指定
  describe 'GET /' do  # テストする機能に関する説明
    it 'HTTP ステータス 200 を返す' do  # どういう結果を期待しているか
      get '/'  # 確認したい操作: / というパスに GET でリクエストを送る
      expect(response).to have_http_status(200)  # 期待する確認結果
    end
  end
end
```

このテストの流れを簡単に説明すると次のようになります。

まず `require 'rails_helper'` で RSpec の設定を読み込みます。次に `RSpec.describe` でテスト対象のモジュールを指定し、`describe` でテストする機能に関する説明を書きます。`it` ブロックの中では、期待する結果を記述します。

テストの内容としては、ルートパス（`/`）にGETリクエストを送り、そのレスポンスの HTTP ステータスコードが 200（成功）であることを確認しています。これはユーザーがトップページにアクセスしたときに、正常にページが表示されることを確認するテストです。

リクエストのテストでは、ページの中身よりも、アクセス時（リクエストをサーバーに送った時）の挙動をテストしています。

### テストの実行

テストが準備できたので、RSpec を実行してみましょう。（spec/views フォルダは丸ごと削除して構いません。）

```bash
$ bin/rspec
Running via Spring preloader in process 43405
Home
  GET /
    HTTP ステータス 200 を返す

Finished in 0.08102 seconds (files took 0.23599 seconds to load)
1 example, 0 failures
```

上記のように、テスト結果画面には `describe` として書いた「テストする機能に関する説明」と、`it` として書いた「期待する結果」が出力されています。前章で `--format documentation` オプションを設定したおかげで、テスト結果が整形されて表示されるため、どのテストがどのような結果になったかが分かりやすくなっています。

### 変更のコミット

Home#top のテストを作成できたので、変更をコミットしておきましょう。今回はテストの内容をリファクタリング（より良い形に変更）したので、その旨をコミットメッセージに含めます。

```bash
$ git add .
$ git commit -m "Home#topの実装・テストを追加"
```

## RSpec テストに関する補足

### describe/context/it の使い分け

RSpec のテストでは、`describe`、`context`、`it` の各ブロックを適切に使い分けることで、テストの意図を明確に表現できます。

- `describe` - テスト対象のクラス、メソッド、機能などを説明
- `context` - テストの前提条件や状況を説明
- `it` - 期待する具体的な結果を説明

これらを適切に使い分けることで、「どのような状況で、どのような動作を期待しているか」が明確になり、テストコードの可読性が向上します。

参考リンク：
- [使える RSpec 入門・その1「RSpec の基本的な構文や便利な機能を理解する」(初めの一歩 - describe / it / expect の役割を理解する)](https://qiita.com/jnchito/items/42193d066bd61c740612#%E5%88%9D%E3%82%81%E3%81%AE%E4%B8%80%E6%AD%A9)

### RSpec マッチャ (matcher)

RSpec を使うメリットの一つとして、今回使用した `have_http_status` のような **マッチャ** と呼ばれる機能があります。マッチャを使わなければ `response.status` という形でレスポンスから HTTP ステータスコードを取り出す必要がありますが、マッチャを使うことでより簡潔に書くことができます。

RSpec には、さまざまな状況に対応した便利なマッチャが多数用意されています。すべてを覚える必要はありませんが、使用頻度の高いものだけでも知っておくと、テストを効率的に書けるようになります。

参考リンク：
- [使える RSpec 入門・その2「使用頻度の高いマッチャを使いこなす」](https://qiita.com/jnchito/items/2e79a1abe7cd8214caa5)

### HTTP ステータスコード

テストの中で確認している **HTTP ステータスコード** は、Web アプリケーション開発においては重要な概念です。HTTP ステータスコードは、Web サーバーからクライアントへのレスポンスの状態を示す3桁の数字です。主なステータスコードには以下のようなものがあります。

- 2xx (成功): リクエストが成功した
  - 200 OK: リクエストが成功し、レスポンスが返された
  - 201 Created: リソースの作成が成功した

- 3xx (リダイレクト): さらなるアクションが必要
  - 301 Moved Permanently: リソースが永続的に移動した
  - 302 Found: リソースが一時的に移動した

- 4xx (クライアントエラー): クライアント側に問題がある
  - 404 Not Found: リソースが見つからない
  - 403 Forbidden: アクセス権限がない

- 5xx (サーバーエラー): サーバー側に問題がある
  - 500 Internal Server Error: サーバー内部でエラーが発生した

Web アプリケーションを開発する上で、適切な HTTP ステータスコードを返すことは、クライアントとサーバー間の明確なコミュニケーションのために重要です。

参考リンク：
- [HTTP ステータスコード 完全に理解した](https://qiita.com/unsoluble_sugar/items/b080a16701946fcfce70)

## まとめ

本章では、Rails プロジェクトにトップページを作成し、基本的なテストの書き方を学びました。具体的には以下の内容を習得しました。

- `rails g controller` コマンドを使ったコントローラーの作成方法
- ルートパスの設定方法と意義
- RSpec を使ったコントローラーのテスト作成方法
- HTTP ステータスコードの確認方法
