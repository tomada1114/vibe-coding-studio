---
title: 記事の削除（DELETEリクエスト）をテストしよう
nextjs:
  metadata:
    title: 記事の削除（DELETEリクエスト）をテストしよう
    description: RSpecを使ってDELETEリクエストのテストを実装する方法を学びます。データ削除処理の検証、関連データの削除、letとlet!の使い分けについて理解できます。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [destroyアクションでDELETEリクエストを処理する](#destroyアクションでdeleteリクエストを処理する)
- [正常系のテストを実装する](#正常系のテストを実装する)
- [letとlet!の使い分けについて](#letとletの使い分けについて)
- [異常系のテストを実装する](#異常系のテストを実装する)
- [関連データの削除に関するテストを実装する](#関連データの削除に関するテストを実装する)
- [テストの実行と結果の確認](#テストの実行と結果の確認)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- データ削除の基本的な実装方法と、DELETEリクエストの役割について実践的に理解する
- 関連データの削除（dependent: :destroy）の仕組みと、その重要性について学ぶ
- RSpecにおける即時評価（let!）と遅延評価（let）の違いと、適切な使い分けを習得する
- 複数の状態変化を同時に検証する高度なテスト手法について理解する
- データ削除における安全性の考慮方法と、エラーハンドリングの実装について学習する

## はじめに

前回は、既存の記事を更新するPATCHリクエストについて学習しました。

今回は、記事を削除するための**DELETEリクエスト**のテストを実装する方法について解説します。

DELETEリクエストは、データベースからデータを完全に削除する際に使用されるHTTPメソッドです。
たとえば、ブログサイトで記事を削除するときや、ユーザーが投稿したコンテンツを取り消すときなどに使用されます。

データの削除は取り返しのつかない操作であるため、特に慎重にテストを行う必要があります。

## destroyアクションでDELETEリクエストを処理する

まずは、記事を削除するための`destroy`アクションを実装しましょう。

`app/controllers/articles_controller.rb`ファイルを開き、`destroy`アクションを追加してください。

```ruby
class ArticlesController < ApplicationController
  # ...略

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    head :no_content # 204
  end

  # ...略
end
```

このコードの処理の流れを詳しく見てみましょう。

まず、`Article.find(params[:id])`で、リクエストのURLからIDを取り出して、削除対象の記事を検索します。
見つかった記事を`@article`に代入します。

次に、`@article.destroy`メソッドを使用して記事を削除します。
この`destroy`メソッドはRailsのモデルに用意されており、データベースからデータを削除するために使用します。

最後に、`head :no_content`を呼び出して、本文のない204（No Content）ステータスを返します。
ステータスコード204は、「リクエストが成功し、かつレスポンスに本文がない」ことを示すために使用されます。

これまでのHTTPメソッドでは、POSTは201、PATCHは200を返しましたが、DELETEの場合はデータが削除されるため、本文を返す必要がなく、204を返すのが一般的です。

## 正常系のテストを実装する

それでは、`spec/requests/articles_spec.rb`ファイルに、正常系のテストを追加していきましょう。

```ruby
RSpec.describe "Articles", type: :request do
  describe "DELETE /articles/:id" do
    let!(:article) { Article.create(title: "削除する記事", content: "この記事は削除されます。") }

    context '記事が存在する場合' do
      it '記事を削除できる' do
        expect {
          delete "/articles/#{article.id}"
        }.to change(Article, :count).by(-1)

        expect(response).to have_http_status(204)
        expect(Article.exists?(article.id)).to be false
      end
    end
  end
end
```

このテストでは、記事が正しく削除されることを3つの観点から確認しています。

まず、`let!`を使って削除対象となる記事を準備します。
ここでは、**即時評価**の`let!`を使用している点に注目してください。

そして、`expect { ... }.to change(Article, :count).by(-1)`という記述で、DELETEリクエストの実行前後でArticleの数が1つ減ることを確認します。
このように、データベースの状態変化を数値で検証することで、削除処理が確実に実行されたことを確認できます。

また、レスポンスのステータスコードが204であることを確認し、さらに`Article.exists?(article.id)`メソッドを使用して、実際にデータベースから記事が削除されていることも検証します。

## letとlet!の使い分けについて

ここで、なぜ`let!`を使用したのかを詳しく説明しましょう。

もし`let`（遅延評価）を使って記事を作成していた場合、`expect`構文内の処理が実行される前後の状態を正しく比較できません。
なぜなら、`let`で定義された変数は、初めて参照された時点で実行されるからです。

`change`マッチャーがArticleの数を計測する時点では、まだ記事が作成されていないため、正しくテストができません。
そのため、テスト開始時点で確実に記事を作成するために、**即時評価**の`let!`を使用する必要があります。

このような使い分けは、RSpecのテストを書く上で非常に重要なポイントです。

## 異常系のテストを実装する

次に、存在しない記事の削除を試みた場合のテストを追加しましょう。

```ruby
RSpec.describe "Articles", type: :request do
  describe "DELETE /articles/:id" do
    let!(:article) { Article.create(title: "削除する記事", content: "この記事は削除されます。") }
    # ...記事が存在する場合のテストは省略...

    context '存在しない記事の場合' do
      it '404エラーが返される' do
        delete "/articles/#{article.id + 1}"
        expect(response).to have_http_status(404)
      end
    end
  end
end
```

このテストでは、存在しない記事のIDを指定してDELETEリクエストを送信し、適切な404エラーが返されることを確認しています。

`article.id + 1`とすることで、確実に存在しないIDを指定できます。
このようなテストは、ユーザーが間違ったURLにアクセスした場合の動作を保証するために重要です。

## 関連データの削除に関するテストを実装する

最後に、記事に関連するコメントがある場合のテストを追加しましょう。

```ruby
RSpec.describe "Articles", type: :request do
  describe "DELETE /articles/:id" do
    let!(:article) { Article.create(title: "削除する記事", content: "この記事は削除されます。") }
    # ...これまでのテストは省略...

    context '記事にコメントが紐づいている場合' do
      before do
        article.comments.create(content: "この記事へのコメント")
      end

      it '記事とコメントが削除される' do
        expect {
          delete "/articles/#{article.id}"
        }.to change(Article, :count).by(-1)
         .and change(Comment, :count).by(-1)

        expect(response).to have_http_status(204)
      end
    end
  end
end
```

このテストでは、記事にコメントが紐づいている場合の動作を確認しています。

まず、`before`ブロックで記事にコメントを追加します。
これにより、テストが実行される前に、記事とコメントの関連付けが確立されます。

そして、DELETEリクエストを実行した際に、ArticleとCommentの数がそれぞれ1つずつ減ることを確認します。
ここでは、`.and`を使って複数の`change`を繋げる高度なテクニックを使用しています。

このような動作が可能なのは、Articleモデルで`has_many :comments, dependent: :destroy`と設定しているためです。
この設定により、記事を削除すると、その記事に紐づくコメントも自動的に削除される仕組みになっています。

これは**カスケード削除**と呼ばれる機能で、データの整合性を保つために重要な仕組みです。

## テストの実行と結果の確認

作成したテストを実行して、DELETEリクエストの処理が期待通りに動作することを確認しましょう。

```bash
$ bundle exec rspec spec/requests/articles_spec.rb
```

全てのテストが通過すれば、削除機能が正しく実装されていることが確認できます。

## まとめ

本章では、DELETEリクエストを使用した記事削除機能のテスト実装について学習しました。
以下の内容を理解できたことと思います。

- データ削除の基本的な実装方法とHTTPステータス204の使い方
- `let`と`let!`の使い分けと、それぞれの評価タイミングの違い
- 存在しないリソースへのアクセスに対する適切なエラーハンドリング
- 関連データの削除（`dependent: :destroy`）の仕組みと検証方法
- 複数の状態変化を同時に検証する`.and`を使ったテスト手法

特に重要なのは、記事の削除ができること、存在しない記事へのリクエストが適切に処理されること、そして関連するデータも正しく削除されることを確認したことです。

データの削除は取り返しのつかない操作であり、誤ってデータを削除してしまうと、それを元に戻すことはできません。
そのため、正常系だけでなく、異常系のケースや関連するデータの処理もしっかりとテストすることが重要です。

これで、記事の作成（POST）、表示（GET）、更新（PATCH）、削除（DELETE）という基本的なデータ操作に対するテストをすべて学びました。

次回からは、より実際のユーザー操作に近い形でのテストを行うために、**システムスペック**を使用したテスト手法について学習していきます。
