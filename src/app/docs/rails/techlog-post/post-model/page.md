---
title: Post モデルを作成しよう
nextjs:
  metadata:
    title: Post モデルを作成しよう
    description: TechLog アプリケーションの投稿機能を実現する Post モデルの作成方法とテスト実装を学びます
---

- [学習の目標](#学習の目標)
- [モデル作成](#モデル作成)
- [マイグレーション実行](#マイグレーション実行)
- [Post モデルの修正](#post-モデルの修正)
- [User モデルの修正](#user-モデルの修正)
- [テスト作成](#テスト作成)
  - [Post モデルのテスト仕様](#post-モデルのテスト仕様)
  - [User モデルのテスト仕様](#user-モデルのテスト仕様)
- [FactoryBot の準備](#factorybot-の準備)
- [Post モデルのテスト](#post-モデルのテスト)
- [User モデルのテスト](#user-モデルのテスト)
- [翻訳ファイル修正](#翻訳ファイル修正)
- [テスト実行](#テスト実行)
- [変更をコミット](#変更をコミット)
- [補足：アソシエーション](#補足アソシエーション)
- [外部キーを含む FactoryBot](#外部キーを含む-factorybot)

いよいよ、TechLog のメイン機能である学習ログを投稿・閲覧する機能を作成していきます。今回は、学習ログのデータを管理する「モデル」の部分から実装していきましょう。

## 学習の目標

本章では、以下の内容を学習します。

- 学習ログを管理するための Post モデルを作成する
- Post モデルに関連するテストを実装する
- Post モデルのバリデーションを設定する
- Post モデルと User モデルの関連付けを行う
- FactoryBot を使ってテストデータを作成する
- 翻訳ファイルを修正してエラーメッセージを日本語化する
- テストを実行して正しく動作することを確認する

## モデル作成

TechLog では、学習ログの投稿一つひとつを `Post` というモデルオブジェクトとして扱うことにします。モデルとは、データベースのテーブルと対応するRubyのクラスで、データの保存や検証などの機能を提供します。

それでは、`rails g` コマンドを使って Post モデル関連のファイルを作成しましょう。このコマンドでは、同時に `title`（タイトル）、`content`（内容）という属性を持つ Post モデルと、`User` モデルとの関連付けも行います。

ターミナルで以下のコマンドを実行してください。

```bash
$ bin/rails g model Post title:string content:string user:references

      invoke  active_record
      create    db/migrate/20250315151218_create_posts.rb
      create    app/models/post.rb
      invoke    rspec
      create      spec/models/post_spec.rb
      invoke      factory_bot
      create        spec/factories/posts.rb
```

このコマンドにより、いくつかファイルが生成されました。

簡単に説明すると、以下のような役割を持っています。

- **db/migrate/YYYYMMDDHHMMSS_create_posts.rb**: データベースに posts テーブルを作成するためのマイグレーションファイル
- **app/models/post.rb**: Post モデルを定義するファイル
- **spec/models/post_spec.rb**: Post モデルのテストを記述するファイル
- **spec/factories/posts.rb**: テスト用の Post オブジェクトを作成するためのファクトリファイル

## マイグレーション実行

次に、作成したマイグレーションファイルの内容をデータベースに反映させます。マイグレーションとは、データベースの構造を変更するための仕組みです。

まずは開発環境（development）のデータベースにマイグレーションを適用します。

```bash
$ bin/rails db:migrate

== 20250315151218 CreatePosts: migrating ======================================
-- create_table(:posts)
   -> 0.0019s
== 20250315151218 CreatePosts: migrated (0.0019s) =============================
```

続いて、テスト環境（test）のデータベースにも同様にマイグレーションを適用します。

```bash
$ RAILS_ENV=test bin/rails db:migrate

== 20250315151218 CreatePosts: migrating ======================================
-- create_table(:posts)
   -> 0.0005s
== 20250315151218 CreatePosts: migrated (0.0005s) =============================
```

エラーなく、マイグレーションが完了することを確認してください。これで、データベースに posts テーブルが作成されました。

## Post モデルの修正

次に、Post モデルを定義するファイルを修正して、バリデーション（入力値の検証）や関連付けを設定していきます。

app/models/post.rb を以下のように修正してください。

```ruby
class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true, length: { maximum: 1000 }
end
```

ここでは、以下の設定を行っています。

- `belongs_to :user`: Post が1つの User に所属することを示します（1対多の関係）
- `validates :title, presence: true, length: { maximum: 100 }`: タイトルは必須で、最大100文字までという制約
- `validates :content, presence: true, length: { maximum: 1000 }`: 本文は必須で、最大1000文字までという制約

これにより、データ保存時に不正なデータが入らないようにチェックする仕組みが追加されました。

## User モデルの修正

続いて、User モデルにも Post との関連付けを追加します。User モデルを定義するファイルを以下のように修正してください。

app/models/user.rb

```ruby
class User < ApplicationRecord
  has_many :posts # 追加

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, presence: true, length: { maximum: 20 }
end
```

`has_many :posts` という行を追加することで、1人のユーザーが複数の投稿を持つことを示しています。これにより、`user.posts` のように書くだけで、あるユーザーの全ての投稿を取得できるようになります。

これでモデル自体の修正は完了です。

## テスト作成

モデルの実装ができたら、次はそれが正しく動くかを確認するためのテストを作成します。テストは、以下の仕様（あるべき姿）を満たすことを確認するものです。

### Post モデルのテスト仕様

1. バリデーションの検証
   - 正常系：正しいパラメータを渡せば有効である
   - 異常系：
     - title が空の場合は無効
     - title が 100 文字を超える場合は無効
     - content が空の場合は無効
     - content が 1000 文字を超える場合は無効
     - user_id が空の場合は無効

2. Post が持つ情報の検証
   - 作成した Post が title を持つこと
   - 作成した Post が content を持つこと
   - 作成した Post から紐づく User 情報を取得できること

### User モデルのテスト仕様

- 紐づく Post 情報を取得できること

これらの仕様を検証するために、テストコードを作成していきます。

## FactoryBot の準備

テストをスムーズに行うために、FactoryBot というテストデータ作成ツールを活用します。FactoryBot を使うと、テストに必要なデータを簡単に作れるようになります。

`rails g` コマンドで自動生成された `spec/factories/posts.rb` を以下のように編集してください。

```ruby
FactoryBot.define do
  factory :post do
    title { 'タイトル1' }
    content { '本文1' }
    association :user, factory: :user
  end
end
```

この設定では、テスト時に `create(:post)` という記述だけで、`title` が「タイトル1」、`content` が「本文1」という値を持ち、さらにユーザーとも関連付けられた Post オブジェクトを作成できます。

`association :user, factory: :user` という行は特に重要で、これにより Post に紐づく User も同時に作成されるようになります。

## Post モデルのテスト

次に、Post モデルのテストを作成します。spec/models/post_spec.rb を以下のように編集してください。

```ruby
require 'rails_helper'

describe Post do
  before { @user = create(:user) } # 事前にユーザーを作成

  let(:title) { 'テストタイトル' }
  let(:content) { 'テスト本文' }
  let(:user_id) { @user.id } # 作成したユーザーのIDを外部キーに設定

  describe 'バリデーションの検証' do
    let(:post) { Post.new(title: title, content: content, user_id: user_id) }

    context '正常系' do
      it '有効である' do
        expect(post.valid?).to be(true)
      end
    end

    context '異常系' do
      context 'titleが空の場合' do
        let(:title) { nil }

        it '無効である' do
          expect(post.valid?).to be(false)
          expect(post.errors[:title]).to include('が入力されていません。')
        end
      end

      context 'titleが100文字を超える場合' do
        let(:title) { 'あ' * 101 }

        it '無効である' do
          expect(post.valid?).to be(false)
        end
      end

      context 'contentが空の場合' do
        let(:content) { nil }

        it '無効である' do
          expect(post.valid?).to be(false)
          expect(post.errors[:content]).to include('が入力されていません。')
        end
      end

      context 'contentが1000文字を超える場合' do
        let(:content) { 'あ' * 1001 }

        it '無効である' do
          expect(post.valid?).to be(false)
        end
      end

      context 'user_idが空の場合' do
        let(:user_id) { nil }

        it '無効である' do
          expect(post.valid?).to be(false)
          expect(post.errors[:user]).to include('が入力されていません。')
        end
      end
    end
  end

  describe 'Postが持つ情報の検証' do
    before { create(:post, title: title, content: content, user_id: user_id) } # Post を作成

    subject { described_class.first }

    it 'Postの属性値を返す' do
      expect(subject.title).to eq('テストタイトル')
      expect(subject.content).to eq('テスト本文')
      expect(subject.user_id).to eq(@user.id)
    end
  end
end
```

このテストコードでは、以下の内容を検証しています。

1. 正しいデータを入れた場合に Post が有効かどうか
2. 各種バリデーションエラーが正しく機能するかどうか
3. 作成した Post から正しい属性値が取得できるかどうか

## User モデルのテスト

続いて、User モデルに紐づく Post が取得できることを確認するテストを追加します。既存の User モデルのテストファイル（spec/models/user_spec.rb）に、以下のテストを追加してください。

```ruby
...

  describe '.first' do
    before do
      @user = create(:user, nickname: nickname, email: email) # 修正
      @post = create(:post, title: 'タイトル', content: '本文', user_id: @user.id) # 修正
    end

    subject { described_class.first }

    it '事前に作成した通りのUserを返す' do
      expect(subject.nickname).to eq('テスト太郎')
      expect(subject.email).to eq('test@example.com')
    end

    ####### ここから追加 #######
    it '紐づくPostの情報を取得できる' do
      expect(subject.posts.size).to eq(1)
      expect(subject.posts.first.title).to eq('タイトル')
      expect(subject.posts.first.content).to eq('本文')
      expect(subject.posts.first.user_id).to eq(@user.id)
    end
    ####### ここまで追加 #######
  end

...
```

このテストでは、User から関連する Posts が正しく取得できるかを確認しています。`User.posts` という書き方で関連する投稿を全て取得できることを検証しています。

## 翻訳ファイル修正

バリデーションのエラーメッセージを日本語で表示するために、翻訳ファイルを修正します。config/locales/devise.ja.yml を開き、以下のように Post モデルに関する翻訳を追加してください。

```ruby
ja:
  activerecord:
    errors:
      models:
        user:
          attributes:
            email:
              taken: "は既に使用されています。"
              blank: "が入力されていません。"
              invalid: "は有効でありません。"
            nickname:
              blank: "が入力されていません。"
              too_long: "は%{count}文字以下に設定して下さい。"
            password:
              blank: "が入力されていません。"
              too_short: "は%{count}文字以上に設定して下さい。"
              too_long: "は%{count}文字以下に設定して下さい。"
              invalid: "は有効でありません。"
            password_confirmation:
              confirmation: "が一致していません。"
        post: # ここから追加
          attributes:
            title:
              blank: "が入力されていません。"
              too_long: "は%{count}文字以下に設定して下さい。"
            content:
              blank: "が入力されていません。"
              too_long: "は%{count}文字以下に設定して下さい。"
            user:
              required: "が入力されていません。"
...
```

このように、新しいモデルを追加するたびに、それぞれの属性に対するバリデーションメッセージの日本語訳を定義する必要があります。これにより、ユーザーに表示されるエラーメッセージが日本語になります。

翻訳ファイルの全体はもっと長いですが、ここでは Post モデルに関する部分のみを示しています。

## テスト実行

これで Post モデル、User モデル、そして翻訳ファイルの修正が完了したので、すべてのテストを実行して動作を確認しましょう。

```bash
$ bin/rspec

...

Finished in 0.92703 seconds (files took 0.48985 seconds to load)
37 examples, 0 failures
```

すべてのテストが通過すれば、正しく実装できていることになります。

## 変更をコミット

これで学習ログを管理していく準備が完了しました。ここまでの変更をコミットして、GitHub リポジトリにプッシュしておきましょう。

```bash
$ git add .
$ git commit -m "Postモデルを作成"
$ git push
```

これにより、今回の変更内容が記録され、GitHubにもアップロードされます。

## 補足：アソシエーション

Post と User 間の関連付けには「アソシエーション」という仕組みを利用しています。アソシエーションは、モデル間の関係性を表現する Rails の機能です。

Post のマイグレーションファイル内で user に `foreign_key: true` を含む行を設定していましたが、これがアソシエーションを利用するための準備となります。

モデル間（テーブル間）の結びつけは中級者でも混乱しやすい分野ですので、以下の参考記事を読んで理解を深めておくとよいでしょう。

- [【Rails】 アソシエーションを図解形式で徹底的に理解しよう！](https://pikawaka.com/rails/association)

## 外部キーを含む FactoryBot

Post の Factory を定義した際、`association` を設定することで Post に紐づく User も同時に準備できるようになっていました。余裕があれば、association の仕組みについても把握しておくことをおすすめします。

- [【FactoryBot】associationの使い方](https://qiita.com/Ryoga_aoym/items/741c57e266a9d811a2d4)

今回は Post モデルの作成と、それに関連するテストの実装を行いました。次回は、この Post モデルを使って実際に投稿機能を実装していきます。
