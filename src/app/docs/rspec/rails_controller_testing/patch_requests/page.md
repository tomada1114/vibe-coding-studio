---
title: 記事の更新（PATCHリクエスト）をテストしよう
nextjs:
  metadata:
    title: 記事の更新（PATCHリクエスト）をテストしよう
    description: RSpecを使ってPATCHリクエストのテストを実装する方法を学びます。データ更新処理の正常系・異常系のテスト、エラーハンドリングの実装について理解できます。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [updateアクションの実装を確認する](#updateアクションの実装を確認する)
- [正常系のテストを実装する](#正常系のテストを実装する)
- [異常系のテストを実装する](#異常系のテストを実装する)
- [存在しない記事の更新テストを実装する](#存在しない記事の更新テストを実装する)
- [テストの実行と結果の確認](#テストの実行と結果の確認)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- HTTPのPATCHメソッドの役割と、既存データの更新処理の実装方法について理解する
- データ更新時の基本的なエラーハンドリングと、適切なステータスコードの返却方法を学ぶ
- テストデータの準備方法と、データベースの状態確認を含むテストの実装手法を習得する
- エッジケース（存在しないリソースへのアクセスなど）に対する適切な処理方法について理解する
- APIエンドポイントの設計における、RESTfulなアプローチの実践的な応用方法を学習する

## はじめに

前回は、新しい記事を作成するPOSTリクエストについて学習しました。

今回は、既存の記事を更新するための**PATCHリクエスト**のテストについて学習します。
PATCHリクエストは、既存のデータを部分的に更新する際に使用されるHTTPメソッドです。

実際のWebアプリケーションでは、ユーザーが記事の内容を修正したり、タイトルを変更したりする機能が必要です。
そのような更新処理を安全かつ確実に実装するために、適切なテストが欠かせません。

## updateアクションの実装を確認する

まず、ArticlesControllerにある`update`アクションを見ていきましょう。

`app/controllers/articles_controller.rb`ファイルには、次のようなコードが実装されています。

```ruby
class ArticlesController < ApplicationController
  # ...略

  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end


  # 以下は既存のStrong Parametersメソッド
  private

  def article_params
    params.require(:article).permit(:title, :content)
  end
end
```

この`update`アクションの処理の流れを詳しく見てみましょう。

まず、`Article.find(params[:id])`で、URLに含まれるIDを使って更新対象の記事を検索します。
次に、`@article.update(article_params)`で、送信されたデータを使って記事の内容を更新しようとします。

更新に成功した場合は、更新後の記事のデータをJSON形式で返します。
一方、更新に失敗した場合は、エラーの内容とステータスコード422（`:unprocessable_entity`）を返します。

この仕組みにより、クライアント側では更新の成功・失敗を適切に判断できるようになります。

## 正常系のテストを実装する

それでは、`spec/requests/articles_spec.rb`ファイルに、正常系のテストを追加していきましょう。

```ruby
RSpec.describe "Articles", type: :request do
  # ...既存のテストは省略...

  describe "PATCH /articles/:id" do
    let(:article) { Article.create!(title: "古い記事", content: "これは古い記事の内容です。") }

    context '有効なパラメータの場合' do
      it '記事を更新できる' do
        patch "/articles/#{article.id}", params: {
          article: {
            title: "更新された記事",
            content: "これは更新された記事の内容です。"
          }
        }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['title']).to eq('更新された記事')
        expect(json['content']).to eq('これは更新された記事の内容です。')

        article.reload
        expect(article.title).to eq('更新された記事')
        expect(article.content).to eq('これは更新された記事の内容です。')
      end
    end
  end
end
```

このテストコードの詳細を解説します。

まず、`let`を使って更新対象となる記事を準備しています。
この記事は、テストが実行されるたびに新しく作成されるため、テスト同士が干渉することがありません。

そして、`patch "/articles/#{article.id}"`でPATCHリクエストを送信して記事を更新します。
URLには、更新したい記事のIDを含める必要があります。

レスポンスの検証では、まずステータスコードが成功を示す200（`:ok`）であることを確認します。
続いて、レスポンスのJSONデータが更新後の内容と一致することを確認します。

最後に、`article.reload`を使ってデータベースから最新の状態を読み込み、実際にデータベースの内容が更新されていることも確認します。
この`reload`メソッドは、メモリ上のオブジェクトをデータベースの最新状態で更新するためのメソッドです。

## 異常系のテストを実装する

次に、無効なデータで更新を試みた場合のテストを追加しましょう。

```ruby
RSpec.describe "Articles", type: :request do
  describe "PATCH /articles/:id" do
    let(:article) { Article.create!(title: "古い記事", content: "これは古い記事の内容です。") }
    # ...有効なパラメータの場合のテストは省略...

    context '無効なパラメータの場合' do
      it '記事を更新できない' do
        original_title = article.title
        original_content = article.content

        patch "/articles/#{article.id}", params: {
          article: {
            title: "",  # タイトルを空にする
            content: "新しい内容"
          }
        }

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['title']).to include('を入力してください')

        article.reload
        expect(article.title).to eq(original_title)
        expect(article.content).to eq(original_content)
      end
    end
  end
end
```

このテストでは、バリデーションエラーが発生する場合の挙動を確認しています。

まず、更新前の値を変数に保存しておきます。
これにより、後で「データが変更されていないこと」を確認できます。

次に、タイトルを空にした無効なデータで更新を試みます。
この場合、Articleモデルのバリデーションにより更新が失敗するはずです。

そして、レスポンスのステータスコードが422（`:unprocessable_entity`）であることを確認し、適切なエラーメッセージが返されることも確認します。

最後に、データベースの内容が変更されていないことを確認して、無効な更新が適切に防がれていることを検証します。
これは、データの整合性を保つ上で非常に重要な確認です。

## 存在しない記事の更新テストを実装する

最後に、存在しない記事の更新を試みた場合のテストを追加しましょう。

```ruby
RSpec.describe "Articles", type: :request do
  describe "PATCH /articles/:id" do
    let(:article) { Article.create!(title: "古い記事", content: "これは古い記事の内容です。") }
    # ...これまでのテストは省略...

    context '存在しない記事の場合' do
      it '404エラーが返される' do
        patch "/articles/9999", params: {
          article: {
            title: "更新された記事",
            content: "これは更新された記事の内容です。"
          }
        }

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
```

このテストでは、**エッジケース**と呼ばれる特殊な状況を検証しています。

存在しないID（この例では9999）を指定してPATCHリクエストを送信し、適切な404エラー（`:not_found`）が返されることを確認します。

このようなテストは、アプリケーションの堅牢性を保つために重要です。
実際のWebアプリケーションでは、ユーザーが間違ったURLにアクセスしたり、削除済みの記事にアクセスしたりする可能性があります。

## テストの実行と結果の確認

作成したテストを実行して、PATCHリクエストの処理が期待通りに動作することを確認しましょう。

```bash
$ bundle exec rspec spec/requests/articles_spec.rb
```

全てのテストが通過すれば、更新機能が正しく実装されていることが確認できます。

## まとめ

本章では、PATCHリクエストのテストについて、3つの重要なケースを確認しました。
以下の内容を理解できたことと思います。

- 正常なデータでの更新処理とその検証方法
- 無効なデータでの更新時のエラーハンドリング
- 存在しない記事への更新要求に対する適切なエラー対応
- データベースの状態を確認するための`reload`メソッドの使い方
- エッジケースを含む包括的なテスト設計の重要性

データの更新処理では、正常系だけでなく、想定される異常系のケースもしっかりとテストすることが重要です。
これにより、ユーザーが安心してアプリケーションを利用できる、信頼性の高いシステムを構築できます。
