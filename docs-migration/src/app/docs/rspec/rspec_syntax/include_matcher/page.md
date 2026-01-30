---
title: includeマッチャーで配列やハッシュの中身を検証しよう
nextjs:
  metadata:
    title: includeマッチャーで配列やハッシュの中身を検証しよう
    description: RSpecのincludeマッチャーを使って配列やハッシュの内容を検証する方法を学びます。複数要素の同時検証や実践的な使い方を通して、より効果的なテストの書き方を習得しましょう。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [配列の要素を検証する](#配列の要素を検証する)
- [ハッシュの検証に挑戦する](#ハッシュの検証に挑戦する)
- [特定のキーと値のペアを検証する](#特定のキーと値のペアを検証する)
- [実践的な例: 商品リストの管理](#実践的な例-商品リストの管理)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- includeマッチャーの基本的な使い方を理解する
- 配列の要素検証における実践的な適用方法を習得する
- 複数要素の同時検証など、includeマッチャーの高度な使用方法を学ぶ
- ハッシュのキーと値の検証方法を理解する
- valuesメソッドを組み合わせた実践的なテスト手法を習得する

## はじめに

前回は`be`マッチャーを使って、オブジェクトの状態を検証する方法を学びました。今回は、配列やハッシュの中身を検証する`include`マッチャーについて説明していきます。

`include`マッチャーは、配列やハッシュの内容を検証するためのマッチャーです。このマッチャーを使うことで、特定の要素が含まれているかどうかを簡単に確認することができます。また、このマッチャーの特徴的な点は、単一の要素だけでなく、複数の要素が同時に含まれているかどうかも確認できることです。これにより、柔軟なテストを書くことができるため、RSpecでよく使われるマッチャーの一つとなっています。

それでは、実際のコードを通して`include`マッチャーの使い方を学んでいきましょう。

## 配列の要素を検証する

最初に、買い物リストを管理する簡単なクラスを作成します。`shopping_list.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
class ShoppingList
  def initialize
    @items = []
  end

  def add_item(item)
    @items << item
  end

  def items
    @items
  end
end
```

この`ShoppingList`クラスでは、買い物リストを管理するために`@items`という配列を使用しています。配列は複数のデータを順番に並べて保存できるデータ構造で、Rubyのプログラミングでは非常によく使用されます。

`initialize`メソッドでは最初は空の配列を作成し、`add_item`メソッドで新しい商品を追加できるようにしています。Rubyでは`<<`という演算子を使って、配列に新しい要素を追加することができます。

では、このクラスに対するテストを書いていきましょう。`spec/shopping_list_spec.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative '../shopping_list'

RSpec.describe ShoppingList do
  describe '#items' do
    it '買い物リストにりんごが含まれている' do
      shopping_list = ShoppingList.new
      shopping_list.add_item('りんご')
      shopping_list.add_item('バナナ')
      shopping_list.add_item('オレンジ')

      expect(shopping_list.items).to include('りんご')
    end
  end
end
```

このテストコードでは、`include`マッチャーを使って買い物リストの中身を検証しています。`expect(shopping_list.items).to include('りんご')`という部分は、「買い物リストの中にりんごが含まれていることを期待する」という意味になります。

ファイルを保存したら、ターミナルで以下のコマンドを実行してテストを走らせてみましょう。

```bash
bundle exec rspec spec/shopping_list_spec.rb
```

テストが成功すると、以下のような結果が表示されるはずです。

```bash
ShoppingList
  #items
    買い物リストにりんごが含まれている

Finished in 0.00231 seconds (files took 0.15594 seconds to load)
1 example, 0 failures
```

テストが成功したことが確認できました。では次に、`include`マッチャーの真価が発揮される、複数の要素を同時に検証するテストを書いてみましょう。`spec/shopping_list_spec.rb`に以下のテストケースを追加します。

```ruby
require_relative '../shopping_list'

RSpec.describe ShoppingList do
  describe '#items' do
    it '買い物リストにりんごが含まれている' do
      shopping_list = ShoppingList.new
      shopping_list.add_item('りんご')
      shopping_list.add_item('バナナ')
      shopping_list.add_item('オレンジ')

      expect(shopping_list.items).to include('りんご')
    end

    it '買い物リストに必要な果物がすべて含まれている' do
      shopping_list = ShoppingList.new
      shopping_list.add_item('りんご')
      shopping_list.add_item('バナナ')
      shopping_list.add_item('オレンジ')

      expect(shopping_list.items).to include('りんご', 'バナナ', 'オレンジ')
    end
  end
end
```

このテストの特徴的な点は、一度に複数の要素を検証できることです。`include('りんご', 'バナナ', 'オレンジ')`というように、カンマ区切りで複数の要素を指定することで、それらがすべて含まれているかを一度に確認できます。

再度テストを実行して、追加したテストケースも成功することを確認しましょう。

```bash
bundle exec rspec spec/shopping_list_spec.rb
```

## ハッシュの検証に挑戦する

次は、`include`マッチャーの活用範囲をさらに広げて、ハッシュの検証方法を学んでいきましょう。まずは、ユーザー情報を管理する簡単なクラスを作成します。`user.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
class User
  def initialize(name:, age:, email:)
    @data = {
      name: name,
      age: age,
      email: email
    }
  end

  def data
    @data
  end
end
```

この`User`クラスでは、ユーザーの情報をハッシュという形で管理しています。ハッシュは、データに名前（キー）をつけて管理できる便利なデータ構造です。たとえば、`name: name`という部分は、`name`というキーに対して、引数で渡された名前の値を保存しています。このような構造により、データベースのレコードのように、関連する情報をまとめて扱うことができます。

それでは、このクラスに対するテストを書いてみましょう。`spec/user_spec.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative '../user'

RSpec.describe User do
  describe '#data' do
    it 'ユーザー情報に必要な属性が含まれている' do
      user = User.new(
        name: '山田太郎',
        age: 25,
        email: 'yamada@example.com'
      )

      expect(user.data).to include(:name, :age, :email)
    end
  end
end
```

このテストの特徴的な点は、ハッシュに対して`include`マッチャーを使用する際、デフォルトではキーの存在を確認することです。つまり、`include(:name, :age, :email)`は、これらのキーがハッシュに存在することを検証しています。

ファイルを保存したら、テストを実行してみましょう。

```bash
bundle exec rspec spec/user_spec.rb
```

では、ハッシュの値についても検証してみましょう。Rubyのハッシュには`values`というメソッドがあり、これを使うことで値だけを取り出して検証することができます。`spec/user_spec.rb`に以下のテストケースを追加します。

```ruby
require_relative '../user'

RSpec.describe User do
  describe '#data' do
    it 'ユーザー情報に必要な属性が含まれている' do
      user = User.new(
        name: '山田太郎',
        age: 25,
        email: 'yamada@example.com'
      )

      expect(user.data).to include(:name, :age, :email)
    end

    it 'ユーザー情報に必要な値が含まれている' do
      user = User.new(
        name: '山田太郎',
        age: 25,
        email: 'yamada@example.com'
      )

      expect(user.data.values).to include('山田太郎', 25, 'yamada@example.com')
    end
  end
end
```

`user.data.values`は、ハッシュの値だけを配列として取得します。そして、その配列に対して`include`マッチャーを使用することで、特定の値が含まれているかどうかを検証しています。

再度テストを実行して、追加したテストケースも成功することを確認しましょう。

```bash
bundle exec rspec spec/user_spec.rb
```

## 特定のキーと値のペアを検証する

ハッシュの特定のキーに対して、特定の値が設定されているかどうかを検証したい場合もあります。例えば、ユーザーの名前が「山田太郎」であることを確認したい場合などです。

このような場合は、ハッシュのキーと値のペアを指定して検証することができます。`spec/user_spec.rb`に以下のテストケースを追加してみましょう。

```ruby
require_relative '../user'

RSpec.describe User do
  describe '#data' do
    # 既存のテストケースはそのままで...

    it 'ユーザーの名前が正しく設定されている' do
      user = User.new(
        name: '山田太郎',
        age: 25,
        email: 'yamada@example.com'
      )

      expect(user.data).to include(name: '山田太郎')
    end
  end
end
```

このテストでは、`include(name: '山田太郎')`という形で、`name`キーの値が「山田太郎」であることを検証しています。複数のキーと値のペアを同時に検証することも可能です。

```ruby
expect(user.data).to include(name: '山田太郎', age: 25)
```

このように、`include`マッチャーはハッシュの検証においても非常に柔軟に使用することができます。

## 実践的な例: 商品リストの管理

最後に、これまで学んだ`include`マッチャーの知識を活かして、より実践的な例を見ていきましょう。ここでは、ECサイトの商品リストを管理するクラスを例に、様々な検証方法を試してみます。

まず、`product_catalog.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
class ProductCatalog
  def initialize
    @products = []
  end

  def add_product(id:, name:, price:, category:)
    @products << {
      id: id,
      name: name,
      price: price,
      category: category
    }
  end

  def products
    @products
  end

  def product_names
    @products.map { |product| product[:name] }
  end

  def categories
    @products.map { |product| product[:category] }.uniq
  end
end
```

このクラスでは、商品情報をハッシュの配列として管理しています。また、商品名だけを取得する`product_names`メソッドや、カテゴリーの一覧を取得する`categories`メソッドも用意しています。

では、このクラスに対するテストを書いていきましょう。`spec/product_catalog_spec.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative '../product_catalog'

RSpec.describe ProductCatalog do
  let(:catalog) do
    catalog = ProductCatalog.new
    catalog.add_product(
      id: 1,
      name: 'コーヒーメーカー',
      price: 5000,
      category: '家電'
    )
    catalog.add_product(
      id: 2,
      name: '電気ケトル',
      price: 3000,
      category: '家電'
    )
    catalog.add_product(
      id: 3,
      name: 'トースター',
      price: 4000,
      category: '家電'
    )
    catalog
  end

  describe '#product_names' do
    it '商品名の一覧に特定の商品が含まれている' do
      expect(catalog.product_names).to include('コーヒーメーカー', '電気ケトル')
    end
  end

  describe '#categories' do
    it 'カテゴリー一覧に「家電」が含まれている' do
      expect(catalog.categories).to include('家電')
    end
  end

  describe '#products' do
    it '商品リストに特定の商品情報が含まれている' do
      expect(catalog.products).to include(
        id: 1,
        name: 'コーヒーメーカー',
        price: 5000,
        category: '家電'
      )
    end
  end
end
```

このテストでは、`let`を使ってテストデータを共通化しています。これにより、各テストケースで同じデータを使用することができ、コードの重複を避けることができます。

また、様々な形での`include`マッチャーの使用方法を示しています。商品名の配列に特定の名前が含まれているかの検証、カテゴリー一覧に特定のカテゴリーが含まれているかの検証、そして商品リスト（ハッシュの配列）に特定のハッシュが含まれているかの検証など、実践的な使用例を見ることができます。

ファイルを保存したら、テストを実行してみましょう。

```bash
bundle exec rspec spec/product_catalog_spec.rb
```

## まとめ

本章では、`include`マッチャーについて学びました。このマッチャーは配列やハッシュの内容を検証する際に非常に便利で、以下のような特徴があります。

- 配列の要素が含まれているかを直感的に検証できます
- 複数の要素を一度に確認できるため、テストをより簡潔に書くことができます
- ハッシュのキーや値の存在確認にも使用でき、柔軟な検証が可能です
- 実際のアプリケーション開発でも頻繁に使用されるマッチャーです

`include`マッチャーをマスターすることで、配列やハッシュを扱うテストを効率的に書くことができるようになります。次回は、さらに別のマッチャーについて学んでいきましょう。
