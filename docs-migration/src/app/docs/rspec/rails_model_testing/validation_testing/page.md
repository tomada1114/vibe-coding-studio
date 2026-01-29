---
title: バリデーションをテストしよう
nextjs:
  metadata:
    title: バリデーションをテストしよう
    description: RSpecを使ったRailsモデルのバリデーションテストを学習。必須項目や文字数制限など、データの整合性を保つためのテスト手法を実践的に解説します。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [バリデーションとは](#バリデーションとは)
- [基本的なバリデーションの追加](#基本的なバリデーションの追加)
- [基本的なバリデーションのテスト](#基本的なバリデーションのテスト)
- [テストの実行と確認](#テストの実行と確認)
- [追加のバリデーション設定](#追加のバリデーション設定)
- [テストコードの構造化](#テストコードの構造化)
- [テストコードの改善：subjectとletの活用](#テストコードの改善subjectとletの活用)
  - [subjectの活用](#subjectの活用)
  - [letによる変数管理](#letによる変数管理)
  - [contextの入れ子構造](#contextの入れ子構造)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Railsにおけるバリデーションの役割と重要性を理解する
- 基本的なバリデーション（presence、length）の実装方法を学ぶ
- バリデーションに対するテストの書き方を習得する
- contextを使ったテストの構造化について理解する
- subjectとletを活用したテストコードのリファクタリング手法を学ぶ

## はじめに

前章では、モデルテストの基本的な書き方を学びました。今回は、より実践的な内容として**バリデーション**のテストについて学んでいきます。

バリデーションは、データベースに保存されるデータの品質を保証するための仕組みです。たとえば、ユーザー登録の際にメールアドレスが正しい形式かどうかをチェックしたり、投稿記事のタイトルが空でないことを確認したりします。

適切なバリデーションを設定することで、不正なデータがデータベースに保存されることを防ぎ、アプリケーションの安定性を保つことができます。そして、これらのバリデーションが正しく動作することを確認するために、テストを書くことが大切です。

## バリデーションとは

**バリデーション（validation）**は、モデルのデータが適切な状態であることを確認するための仕組みです。

Railsでは、モデルクラスに`validates`メソッドを使って、様々な検証ルールを簡単に追加できます。データの保存前に自動的にチェックが行われ、ルールに違反する場合は保存が拒否されます。

実際の開発では、ほぼすべてのモデルで何らかのバリデーションを使用します。これにより、データの整合性を保ち、予期しないエラーを防ぐことができます。

## 基本的なバリデーションの追加

それでは、前章で作成した`Article`モデルにバリデーションを追加してみましょう。

`app/models/article.rb`ファイルを開いて、以下のように編集してください。

```ruby
class Article < ApplicationRecord
  validates :title, presence: true
end
```

この一行を追加することで、`title`属性が必須項目になりました。`presence: true`は、その属性が空でないことを確認するバリデーションです。

これにより、タイトルが空の記事は保存できなくなります。実際のブログアプリケーションでも、タイトルのない記事は意味をなさないので、このようなバリデーションは必須といえるでしょう。

## 基本的なバリデーションのテスト

バリデーションを追加したら、それが正しく動作することをテストで確認しましょう。

`spec/models/article_spec.rb`を以下のように更新してください。

```ruby
require 'rails_helper'

RSpec.describe Article, type: :model do
  it 'タイトルがあれば有効' do
    article = Article.new(title: 'RSpecの基本')
    expect(article).to be_valid
  end

  it 'タイトルがなければ無効' do
    article = Article.new(title: nil)
    expect(article).not_to be_valid
  end
end
```

最初のテストは、タイトルが設定されている場合に記事が有効であることを確認しています。

2つ目のテストでは、タイトルが`nil`の場合に記事が無効になることを確認しています。`not_to`を使うことで、「〜でないことを期待する」という否定的な検証ができます。

## テストの実行と確認

テストを書いたら、実際に動作を確認してみましょう。

```bash
bundle exec rspec
```

以下のような結果が表示されれば成功です。

```
Article
  タイトルがあれば有効
  タイトルがなければ無効

Finished in 0.12345 seconds (files took 1.23 seconds to load)
2 examples, 0 failures
```

両方のテストが通りました。これで、タイトルの必須チェックが正しく動作していることが確認できました。

## 追加のバリデーション設定

次に、`content`フィールドにもバリデーションを追加してみましょう。記事の本文は、ただ存在するだけでなく、ある程度の長さも必要です。

`app/models/article.rb`を以下のように更新してください。

```ruby
class Article < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true, length: { minimum: 10 }
end
```

この設定により、`content`に対して2つのバリデーションが追加されました。

まず`presence: true`で、contentが空でないことを確認します。さらに`length: { minimum: 10 }`で、contentが最低10文字以上であることを確認します。

短すぎる記事は読者にとって価値が低いため、このような最小文字数の制限を設けることは実践的な設定といえます。

## テストコードの構造化

新しいバリデーションに対応するため、テストコードを拡張しましょう。このとき、`context`を使ってテストを論理的にグループ化すると、より読みやすくなります。

```ruby
require 'rails_helper'

RSpec.describe Article, type: :model do
  context '正常系' do
    it 'タイトルとコンテンツがあれば有効' do
      article = Article.new(
        title: 'RSpecの基本',
        content: 'RSpecを学びましょう。楽しいですよ！'
      )
      expect(article).to be_valid
    end
  end

  context '異常系' do
    it 'タイトルがなければ無効' do
      article = Article.new(title: nil)
      expect(article).not_to be_valid
    end

    it 'コンテンツがなければ無効' do
      article = Article.new(
        title: 'RSpecの基本',
        content: nil
      )
      expect(article).not_to be_valid
    end

    it 'コンテンツが10文字未満なら無効' do
      article = Article.new(
        title: 'RSpecの基本',
        content: '短すぎる'
      )
      expect(article).not_to be_valid
    end
  end
end
```

`context`を使うことで、「正常系」と「異常系」のテストを明確に分けることができました。

正常系では、すべてのバリデーションを満たす場合のテストを行い、異常系では、各バリデーションに違反する場合のテストを個別に行っています。

このような構造化により、どのようなケースをテストしているのかが一目でわかるようになります。

## テストコードの改善：subjectとletの活用

テストコードをさらに改善してみましょう。同じようなコードが繰り返されている部分を、`subject`と`let`を使ってリファクタリングします。

```ruby
require 'rails_helper'

RSpec.describe Article, type: :model do
  subject { article.valid? }

  let(:title) { 'RSpecの基本' }
  let(:content) { 'RSpecを学びましょう。楽しいですよ！' }
  let(:article) { Article.new(title: title, content: content) }

  context '正常系' do
    it 'タイトルとコンテンツがあれば有効' do
      expect(subject).to be true
    end
  end

  context '異常系' do
    context 'タイトルがない場合' do
      let(:title) { nil }

      it '無効である' do
        expect(subject).to be false
      end
    end

    context 'コンテンツがない場合' do
      let(:content) { nil }

      it '無効である' do
        expect(subject).to be false
      end
    end

    context 'コンテンツが10文字未満の場合' do
      let(:content) { '短すぎる' }

      it '無効である' do
        expect(subject).to be false
      end
    end
  end
end
```

このリファクタリングで行った改善点を見ていきましょう。

### subjectの活用

`subject { article.valid? }`により、各テストで検証したい内容（記事が有効かどうか）を明確に定義しています。これにより、各テストケースでは`expect(subject).to be true`のように簡潔に書けるようになりました。

### letによる変数管理

`let`を使うことで、テストで使用するデータを効率的に管理できます。デフォルトの値を最初に定義し、各テストケースで必要に応じて上書きすることで、コードの重複を減らしています。

### contextの入れ子構造

異常系のテストをさらに細かく分類することで、どのような条件でテストしているのかがより明確になりました。

## まとめ

本章では、モデルバリデーションとそのテストについて学びました。以下の内容を理解できたことと思います。

- バリデーションがデータの整合性を保つ仕組みであること
- `validates`メソッドを使った基本的なバリデーションの設定方法
- `presence`と`length`バリデーションの使い方
- 正常系と異常系を分けたテストの書き方
- `context`を使ったテストの論理的な構造化
- `subject`と`let`を活用したテストコードのリファクタリング

バリデーションテストは、アプリケーションの品質を保つために欠かせない要素です。今回学んだ基本的なパターンを応用すれば、より複雑なバリデーションのテストも書けるようになるでしょう。

次の章では、モデル間の関連（アソシエーション）についてテストする方法を学んでいきます。
