---
title: Comment モデルとコントローラーを作成しよう
nextjs:
  metadata:
    title: Comment モデルとコントローラーを作成しよう
    description: TechLog アプリケーションにコメント機能の土台となるモデルとコントローラーを実装します
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Comment モデルの作成](#comment-モデルの作成)
- [User モデルと Post モデルの修正](#user-モデルと-post-モデルの修正)
- [マイグレーションの実行](#マイグレーションの実行)
- [Comments コントローラーの作成](#comments-コントローラーの作成)
- [テストに関する補足](#テストに関する補足)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- コメント機能の概要と役割を理解する
- **Comment モデル**をデータベース設計に基づいて作成する
- **多対多のリレーション**を正しく設定する方法を習得する
- **CommentsController** の基本構造を実装する

## はじめに

TechLog アプリケーションに新たな機能を追加していきましょう。今回は「コメント機能」を実装します。これにより、ユーザーは学習ログに対してコメントを残すことができるようになり、他のユーザーとのコミュニケーションが可能になります。

コメント機能の実装では、複数のモデル間の関連付け（リレーション）が重要になります。投稿（Post）とユーザー（User）の両方に関連するコメント（Comment）を作成することで、「誰が」「どの投稿に」コメントしたのかを管理できるようになります。

それでは、まずはコメント機能の土台となる Comment モデルとコントローラーを作成していきましょう。

## Comment モデルの作成

最初に、Comment モデルを作成します。Comment モデルは、コメントの内容（content）と、そのコメントを投稿したユーザー（user_id）、コメント先の投稿（post_id）を関連付けるためのモデルです。

ターミナルで以下のコマンドを実行して、モデルを生成します。

```bash
$ bin/rails g model Comment content:text user:references post:references
      invoke  active_record
      create    db/migrate/20250611151748_create_comments.rb
      create    app/models/comment.rb
      invoke    rspec
      create      spec/models/comment_spec.rb
      invoke      factory_bot
      create        spec/factories/comments.rb
```

このコマンドにより、以下のものが生成されます。

1. **マイグレーションファイル** - コメントテーブルを作成するための設計図
2. **Comment モデル** - コメントの動作を定義するファイル
3. **テスト関連ファイル** - モデルのテストを書くためのファイル

生成されたマイグレーションファイル（`db/migrate/YYYYMMDDHHMMSS_create_comments.rb`）の内容を確認してみましょう。

```ruby
class CreateComments < ActiveRecord::Migration[8.0]
  def change
    create_table :comments do |t|
      t.text :content
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
```

上記のような内容になっているはずです。このマイグレーションファイルは、コメントを保存するための `comments` テーブルを作成します。

このマイグレーションファイルでは、以下のカラムを持つ comments テーブルを作成します。

- **content** - コメントの内容を保存するテキスト型のカラム
- **user_id** - コメントを投稿したユーザーを参照する外部キー
- **post_id** - コメント先の投稿を参照する外部キー
- **created_at, updated_at** - 作成日時と更新日時（`t.timestamps` で自動生成）

`references` 型を使用することで、外部キーとインデックスが自動的に設定されます。これにより、データベースレベルでの関連付けが効率的に行われます。

次に、生成された Comment モデル（`app/models/comment.rb`）を確認します。

```ruby
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
```

モデルファイルには既に `belongs_to` 関連付けが設定されています。これは、コメントが必ずひとつのユーザーとひとつの投稿に属することを示しています。

## User モデルと Post モデルの修正

Comment モデルを作成したら、既存の User モデルと Post モデルにも関連付けを追加する必要があります。これにより、ユーザーや投稿から関連するコメントを簡単に取得できるようになります。

まず、User モデル（`app/models/user.rb`）を次のように修正します。

```ruby
class User < ApplicationRecord
  has_many :posts  # 既存の関連付け
  has_many :comments  # 追加する関連付け

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, presence: true, length: { maximum: 20 }
end
```

次に、Post モデル（`app/models/post.rb`）も同様に修正します。

```ruby
class Post < ApplicationRecord
  belongs_to :user
  has_many :comments  # 追加する関連付け

  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true, length: { maximum: 1000 }
end
```

`has_many` 関連付けを追加することで、ユーザーや投稿に紐づく複数のコメントを取得できるようになります。例えば、`user.comments` でそのユーザーが投稿した全てのコメントを、`post.comments` でその投稿に対する全てのコメントを取得できます。

## マイグレーションの実行

モデルの設定が完了したら、マイグレーションを実行してデータベースにコメントテーブルを作成します。

```bash
$ bin/rails db:migrate
== 20250611151748 CreateComments: migrating ===================================
-- create_table(:comments)
   -> 0.0022s
== 20250611151748 CreateComments: migrated (0.0023s) ==========================
```

テスト環境のデータベースにも同様にマイグレーションを適用します。

（カリキュラム内ではコメント機能のテストは行いませんが、テスト環境のデータベースも更新しておくことは良い習慣です。）

```bash
$ RAILS_ENV=test bin/rails db:migrate
== 20250611151748 CreateComments: migrating ===================================
-- create_table(:comments)
   -> 0.0006s
== 20250611151748 CreateComments: migrated (0.0007s) ==========================
```

これでデータベース側の準備は完了です。

## Comments コントローラーの作成

次に、コメントを操作するための CommentsController を作成します。ターミナルで以下のコマンドを実行します。

```bash
$ bin/rails g controller comments create destroy edit update
      create  app/controllers/comments_controller.rb
       route  get "comments/create"
              get "comments/destroy"
              get "comments/edit"
              get "comments/update"
      invoke  tailwindcss
      create    app/views/comments
      create    app/views/comments/create.html.erb
      create    app/views/comments/destroy.html.erb
      create    app/views/comments/edit.html.erb
      create    app/views/comments/update.html.erb
      invoke  rspec
      create    spec/requests/comments_spec.rb
      create    spec/views/comments
      create    spec/views/comments/create.html.tailwindcss_spec.rb
      create    spec/views/comments/destroy.html.tailwindcss_spec.rb
      create    spec/views/comments/edit.html.tailwindcss_spec.rb
      create    spec/views/comments/update.html.tailwindcss_spec.rb
```

このコマンドにより、CommentsController とそれに対応するビューファイルが生成されます。ただし、`create` および `destroy` アクションに対応するビューファイルは実際には使用しないので、削除しておきます。

```bash
$ rm app/views/comments/create.html.erb
$ rm app/views/comments/destroy.html.erb
$ rm app/views/comments/update.html.erb
```

また、詳しくは後述しますが、コメント機能についてはテストは省略する方針で進めますので、テストファイルもまとめて削除しておきます。

もし後にご自身でチャレンジしてみたい場合は、テストファイルを残しておいても構いません。

```bash
$ rm spec/requests/comments_spec.rb
$ rm -rf spec/views/comments
$ rm spec/models/comment_spec.rb
```

次に、生成されたルーティングを削除します。CommentsController 用のルーティングは次のレッスンで別の形式で設定するため、今回生成された `get` ルーティングは不要です。

`config/routes.rb` ファイルを開き、以下の行を削除します。

```ruby
# 以下の4行はまとめて削除します
get "comments/create"
get "comments/destroy"
get "comments/edit"
get "comments/update"
```

最後に、CommentsController の基本構造を整えます。`app/controllers/comments_controller.rb` を以下のように修正します。

```ruby
class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post

  def create
    # 実装は次のレッスンで行います
  end

  def edit
    # 実装は後のレッスンで行います
  end

  def update
    # 実装は後のレッスンで行います
  end

  def destroy
    # 実装は後のレッスンで行います
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
```

それぞれ、おさらいも含めて簡単に説明しておきましょう。

- **before_action :authenticate_user!** - コメント機能はログインユーザーのみが使用できるよう制限
- **before_action :set_post** - コメント対象の投稿を特定するためのヘルパーメソッド
- **private メソッド** - コントローラー内で使用する共通メソッドとストロングパラメータの設定

これまでのレッスンで学んだ内容を思い出せましたでしょうか？

`before_action` や `private` メソッドの使い方、ストロングパラメータの設定方法などは Rails の基本的な書き方です。

逆に言えば、これらの基本的な構造を理解していれば、コントローラーの実装はスムーズに進められるはずですので、しっかりと復習しておきましょう。

アクション内の実際の処理は、この後のレッスンで段階的に実装していきます。

## テストに関する補足

ここまでのレッスンでは、RSpec を使用してモデルやコントローラーのテストを行う準備を進めてきました。

しかし、コメント機能の実装に関しては、特にコントローラーのアクションが複雑になってくるため、RSpec テストも同時に作っていこうとすると、理解が難しくなる可能性があります。

そのため、ここからはあえて RSpec のテストコードを省略し、実装に集中して進めていきます。
もちろん、テストを書くことは非常に重要なことですが、今回はまず実装を優先し、後で動作確認を行いながら動作確認をカバーしていく方針で進めます。

## 変更をコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "Comment モデルとコントローラーを作成"
$ git push
```

## まとめ

本章では、コメント機能の土台となる Comment モデルと CommentsController を作成しました。具体的には、以下の内容を実装しました。

- **Comment モデル**の作成と必要なカラムの設定
- User モデルと Post モデルとの**リレーションの設定**
- CommentsController の**基本構造**の実装

これで、コメント機能を実装するための基礎ができました。次のレッスンでは、コメント機能のためのルーティング設定を行い、実際にコメントを投稿できるようにしていきます。
