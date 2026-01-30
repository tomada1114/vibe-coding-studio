---
title: 記事の投稿（POSTリクエスト）をテストしよう
nextjs:
  metadata:
    title: 記事の投稿（POSTリクエスト）をテストしよう
    description: RSpecを使ってPOSTリクエストのテストを実装する方法を学びます。データ作成処理の正常系・異常系のテスト、Strong Parametersによるセキュリティ対策について理解できます。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [createアクションでPOSTリクエストを処理する](#createアクションでpostリクエストを処理する)
  - [Strong Parametersによるセキュリティ対策](#strong-parametersによるセキュリティ対策)
- [正常系のテストを実装する](#正常系のテストを実装する)
- [異常系のテストを実装する](#異常系のテストを実装する)
  - [エラーレスポンスの例](#エラーレスポンスの例)
- [テストの実行と結果の確認](#テストの実行と結果の確認)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- POSTリクエストの基本概念と、データ作成処理の実装方法について理解する
- RSpecを使用したリクエストスペックの書き方と、正常系・異常系のテスト実装手法を習得する
- Strong Parametersによるセキュリティ対策の重要性と実装方法について学ぶ
- HTTPステータスコードの使い分けと、JSONレスポンスの構造について実践的に理解する
- APIエンドポイントの設計思想と、RESTfulな実装アプローチについて学習する

## はじめに

前回は、記事の一覧を取得するGETリクエストについて学習しました。

今回は、新しい記事を作成するための**POSTリクエスト**のテストの実装方法について解説します。

POSTリクエストは、データを作成するためのHTTPリクエストです。
日常的なWeb操作では、ブログサイトでの新規記事の投稿や、SNSでの新規投稿の作成、Webフォームからのデータ送信など、さまざまな場面で使用されています。

POSTリクエストを正しく実装することで、ユーザーが新しいデータを安全に作成できるようになります。

## createアクションでPOSTリクエストを処理する

まずは、記事を作成するための`create`アクションを実装していきます。

`app/controllers/articles_controller.rb`ファイルを開き、`create`アクションとStrong Parametersの設定を追加してください。

```ruby
class ArticlesController < ApplicationController
  # ...略

  def create
    @article = Article.new(article_params)
    if @article.save
      render json: @article, status: :created
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content)
  end
end
```

このコードの流れを詳しく見てみましょう。

まず、`Article.new(article_params)`で新しい記事オブジェクトを作成しています。
`article_params`は、後ほど定義する**Strong Parameters**のメソッドです。

`@article.save`で、作成した記事オブジェクトをデータベースに保存しようと試みます。
保存に成功した場合は、作成された記事データとステータスコード201（`:created`）を返します。
このステータスコードは、新規リソースの作成が成功したことを示すものです。

一方、保存に失敗した場合は、エラー内容とステータスコード422（`:unprocessable_entity`）を返します。
これは、送信されたデータに問題があり、処理を実行できなかったことを示します。

### Strong Parametersによるセキュリティ対策

`article_params`メソッドでは、**Strong Parameters**という仕組みを使用してセキュリティを確保しています。

```ruby
def article_params
  params.require(:article).permit(:title, :content)
end
```

このメソッドは、送信されたデータから`title`と`content`のみを許可することで、不正なデータの混入を防ぐことができます。
例えば、悪意のあるユーザーが管理者権限を示すパラメータを送信してきても、それは無視されます。

Strong Parametersは、Railsアプリケーションにおいて必須のセキュリティ対策の一つです。

## 正常系のテストを実装する

次に、`spec/requests/articles_spec.rb`ファイルに、正常系のテストを追加します。

このテストでは、正しいデータを送信した際に、期待通りの動作となることを確認します。

```ruby
RSpec.describe "Articles", type: :request do
  # ...既存のテストは省略...

  describe "POST /articles" do
    context '有効なパラメータの場合' do
      it '記事を作成できる' do
        expect {
          post "/articles", params: {
            article: {
              title: "新しい記事",
              content: "この記事は新しく作成されました。"
            }
          }
        }.to change(Article, :count).by(1)

        expect(response).to have_http_status(201)
        json = JSON.parse(response.body)
        expect(json['title']).to eq('新しい記事')
        expect(json['content']).to eq('この記事は新しく作成されました。')
      end
    end
  end
end
```

このテストコードの内容を詳しく解説します。

`post "/articles", params: { ... }`で、記事作成のエンドポイントにPOSTリクエストを送信しています。
`params`には、作成したい記事の情報を含めています。

`expect { ... }.to change(Article, :count).by(1)`では、データベース上の記事数が1増加することを確認しています。
これにより、実際に記事が作成されたことを検証できます。

また、レスポンスのステータスコードが201（作成成功）であることを検証し、返却されたJSONデータが送信した内容と一致することを確認しています。

## 異常系のテストを実装する

次に、無効なデータを送信した場合のテストを追加します。

実際のアプリケーションでは、ユーザーが不適切なデータを入力する可能性もあります。
そのため、そのような場合の挙動も確認する必要があります。

```ruby
RSpec.describe "Articles", type: :request do
  # ...既存のテストは省略...

  describe "POST /articles" do
    # ...有効なパラメータの場合のテストは省略...

    context '無効なパラメータの場合' do
      it '記事を作成できない' do
        expect {
          post "/articles", params: {
            article: {
              title: "",
              content: ""
            }
          }
        }.not_to change(Article, :count)

        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['title'].first).to include('blank')
        expect(json['content'].first).to include('blank')
      end
    end
  end
end
```

このテストでは、空の文字列を送信した場合の動作を確認しています。

`expect { ... }.not_to change(Article, :count)`で、データベースの記事数が変化しないことを確認しています。
つまり、無効なデータでは記事が作成されないことを検証しています。

レスポンスのステータスコードが422（処理不能）であることを確認し、エラーメッセージが適切に返されることも検証しています。

### エラーレスポンスの例

バリデーションエラーが発生した場合、以下のようなレスポンスが返されます。

```json
{
  "title": ["can't be blank"],
  "content": ["can't be blank", "is too short (minimum is 10 characters)"]
}
```

このように、各フィールドのエラー内容が詳細に返されるため、フロントエンド側でユーザーに適切なエラーメッセージを表示できます。

## テストの実行と結果の確認

作成したテストを実行して、POSTリクエストの処理が期待通りに動作することを確認しましょう。

```bash
$ bundle exec rspec spec/requests/articles_spec.rb
```

テストが成功すると、正常系・異常系の両方のケースが通過していることが確認できます。

## まとめ

本章では、POSTリクエストを使用した記事作成機能のテスト実装について学習しました。
以下の内容を理解できたことと思います。

- POSTリクエストの基本概念と、データ作成処理の実装方法
- RSpecを使った正常系・異常系の両方のテストケースの書き方
- Strong Parametersによるセキュリティ対策の重要性と実装方法
- HTTPステータスコードの適切な使い分け（201、422など）
- JSONレスポンスの構造とエラーハンドリングの実装

POSTリクエストのテストでは、正常系と異常系の両方のケースを網羅することで、アプリケーションの堅牢性を確保することができます。
