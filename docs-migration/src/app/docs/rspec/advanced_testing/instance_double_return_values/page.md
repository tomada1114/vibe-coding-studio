---
title: instance_doubleでメソッドの返り値もテストしよう
nextjs:
  metadata:
    title: instance_doubleでメソッドの返り値もテストしよう
    description: RSpecのinstance_doubleを使って、メソッドの返り値をシミュレートするテスト手法を学びます。在庫管理システムの例で実践的なテスト方法を初心者にもわかりやすく解説します。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [在庫管理システムの実装例](#在庫管理システムの実装例)
- [購入管理クラスの実装](#購入管理クラスの実装)
- [テストコードの実装](#テストコードの実装)
- [効率的なテストコードの記述方法](#効率的なテストコードの記述方法)
- [さらなる改善: subjectの活用](#さらなる改善-subjectの活用)
- [instance\_doubleの返り値設定のバリエーション](#instance_doubleの返り値設定のバリエーション)
  - [基本的な返り値設定](#基本的な返り値設定)
  - [引数に応じて異なる値を返す](#引数に応じて異なる値を返す)
  - [連続して異なる値を返す](#連続して異なる値を返す)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- instance_doubleでメソッドの返り値を設定する方法を理解する
- 複数のテストケースを効率的に管理する技術を習得する
- RSpecのlet、subject、contextを活用したテストコードの書き方を学ぶ
- 実践的な例を通じてテストコードの改善方法を身につける

## はじめに

前回までは、`instance_double`を使用して実装と一致しないメソッド名や引数を指定した時にエラーになることを確認しました。これにより、テストと実装の間に不整合があった場合に早期に発見できることがわかりました。

本章では、`instance_double`でモックを作成した際のメソッドの返り値の設定方法について学習します。実際のシステム開発では、他のクラスから返される値に応じて処理を変える場面が多くあります。そのようなケースでのテスト方法を、具体的な例を通して見ていきましょう。

## 在庫管理システムの実装例

返り値の設定について理解を深めるため、商品の在庫を管理するシステムを例として実装していきます。このような在庫管理システムは、ECサイトやPOSシステムなど、実際の業務システムでよく見られるものです。

まずは、在庫データベースと通信するための基本的なクラスを作成します。`stock_service.rb`というファイルを作成し、以下のコードを実装してください。

```ruby
class StockService
  def fetch_stock_quantity(product_id)
    # データベースから在庫数を取得する処理（今回は省略）
    # 実際のシステムでは、ここでデータベースに接続して在庫数を取得する
    42
  end
end
```

このクラスについて少し詳しく説明しましょう。`StockService`クラスは、商品の在庫情報を管理するデータベースにアクセスする役割を持っています。`fetch_stock_quantity`メソッドは商品IDを引数に取り、対応する商品の在庫数を返す機能を提供します。実際の開発では、このメソッド内でデータベースにアクセスして在庫数を取得しますが、今回は説明を簡略化するため、常に`42`を返すようにしています。

## 購入管理クラスの実装

次に、在庫のチェックと商品の購入を管理するクラスを作成します。このクラスは、先ほど作成した`StockService`クラスを使って在庫を確認し、購入が可能かどうかを判断します。

`purchase_manager.rb`というファイルを作成し、以下のコードを実装してください。

```ruby
require_relative './stock_service'

class PurchaseManager
  def initialize(stock_service)
    @stock_service = stock_service
  end

  def purchase(product_id, quantity)
    stock = @stock_service.fetch_stock_quantity(product_id)
    if stock >= quantity
      # 購入処理（今回は省略）
      true
    else
      false
    end
  end
end
```

`PurchaseManager`クラスは、商品の購入処理を担当します。ここでは「依存性の注入」というパターンを採用し、コンストラクタで`StockService`のインスタンスを受け取ります。このアプローチにより、テスト時にモックオブジェクトを差し込むことが容易になります。

`purchase`メソッドは商品IDと購入希望数量を受け取り、在庫の確認を行います。`StockService`から取得した在庫数と比較し、在庫が十分にある場合は購入処理を行って`true`を返し、不足している場合は`false`を返します。実際のシステムでは、在庫の減少や注文データの作成なども行いますが、ここでは省略しています。

## テストコードの実装

次に、この`PurchaseManager`クラスのテストを実装していきます。ここでは、`instance_double`を使用して`StockService`のモックを作成し、異なる在庫状況をシミュレートしてテストを行います。

`spec/purchase_manager_spec.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative '../purchase_manager'

RSpec.describe PurchaseManager do
  describe '#purchase' do
    it '在庫が十分にある場合は購入に成功する' do
      stock_service = instance_double(StockService)
      allow(stock_service).to receive(:fetch_stock_quantity).with(123).and_return(50)

      purchase_manager = PurchaseManager.new(stock_service)
      result = purchase_manager.purchase(123, 30)

      expect(result).to be true
    end
  end
end
```

このテストコードでは、`instance_double`を使って`StockService`のモックオブジェクトを作成しています。そして、`allow`メソッドを使って、商品ID 123の在庫数として50を返すように設定しています。これにより、実際のデータベースにアクセスすることなくテストを実行できます。

テストでは、30個の商品を購入しようとしていますが、在庫数は50あるため、購入は成功するはずです。そのため、`purchase`メソッドの戻り値が`true`であることを検証しています。

## 効率的なテストコードの記述方法

先ほどのテストコードは基本的な実装ですが、RSpecの機能を活用することでより効率的に記述することができます。特に複数のテストケースがある場合に有効です。

まず、`let`を使用して、テストで使用する値を管理する方法を見ていきましょう。

```ruby
require_relative '../purchase_manager'

RSpec.describe PurchaseManager do
  describe '#purchase' do
    let(:product_id) { 123 }
    let(:quantity) { 30 }
    let(:stock_quantity) { 50 }
    let(:stock_service) {
      instance_double(
        StockService,
        fetch_stock_quantity: stock_quantity
      )
    }

    it '在庫が十分にある場合は購入に成功する' do
      purchase_manager = PurchaseManager.new(stock_service)
      result = purchase_manager.purchase(product_id, quantity)
      expect(result).to be true
    end
  end
end
```

`let`を使うことで、テストで使用する値が一箇所にまとまり、管理が容易になります。特に複数のテストケースで同じ値を使う場合に効果的です。値の変更が必要になっても、定義箇所のみを修正すれば良いので、コードの重複も防げます。

また、`instance_double`の定義方法も少し変わっています。`instance_double`の第2引数以降で、メソッド名とその戻り値をハッシュ形式で指定することができます。これにより、`allow(...).to receive(...).and_return(...)`と書く必要がなく、よりシンプルにモックの振る舞いを定義できます。

## さらなる改善: subjectの活用

次に、`subject`を使用してテストをより簡潔に記述する方法を見ていきましょう。

```ruby
RSpec.describe PurchaseManager do
  describe '#purchase' do
    let(:product_id) { 123 }
    let(:quantity) { 30 }
    let(:stock_quantity) { 50 }
    let(:stock_service) {
      instance_double(
        StockService,
        fetch_stock_quantity: stock_quantity
      )
    }

    subject { PurchaseManager.new(stock_service).purchase(product_id, quantity) }

    context '在庫が十分にある場合' do
      it '購入に成功する' do
        expect(subject).to be true
      end
    end

    context '在庫が不足している場合' do
      let(:stock_quantity) { 29 }

      it '購入に失敗する' do
        expect(subject).to be false
      end
    end
  end
end
```

`subject`を使うことで、テストの対象となる処理を明確に定義できます。上記の例では、「`PurchaseManager`のインスタンスを作成し、`purchase`メソッドを呼び出す」という処理を`subject`として定義しています。これにより、各テストケースでは単に`subject`の結果を検証するだけで済むようになり、コードがよりシンプルになります。

また、`context`を使って、異なるテストシナリオを明確に分けています。在庫が十分にある場合と不足している場合という2つのシナリオを明示的に区別することで、テストコードの意図が伝わりやすくなります。

在庫不足のケースでは、`stock_quantity`の値を上書きして異なる状況をテストしています。`let`で定義された値は、そのブロック内で再定義することができるので、必要な部分だけを変更してテストケースを追加できます。これにより、テストケース間の違いが明確になり、コードの重複も避けられます。

## instance_doubleの返り値設定のバリエーション

`instance_double`でメソッドの返り値を設定する方法にはいくつかのバリエーションがあります。状況に応じて適切な方法を選ぶと良いでしょう。

### 基本的な返り値設定

```ruby
# 方法1: allowメソッドを使う
stock_service = instance_double(StockService)
allow(stock_service).to receive(:fetch_stock_quantity).and_return(50)

# 方法2: initialize時にハッシュで指定
stock_service = instance_double(StockService, fetch_stock_quantity: 50)
```

### 引数に応じて異なる値を返す

```ruby
stock_service = instance_double(StockService)
allow(stock_service).to receive(:fetch_stock_quantity).with(123).and_return(50)
allow(stock_service).to receive(:fetch_stock_quantity).with(456).and_return(10)
```

この例では、商品ID 123の場合は在庫数50を、商品ID 456の場合は在庫数10を返すように設定しています。これにより、異なる商品に対する処理を1つのテストでカバーできます。

### 連続して異なる値を返す

```ruby
stock_service = instance_double(StockService)
allow(stock_service).to receive(:fetch_stock_quantity).and_return(50, 40, 30)
```

この例では、`fetch_stock_quantity`メソッドが呼ばれるたびに異なる値を返します。1回目は50、2回目は40、3回目は30というように連続して値が変わります。在庫の減少など、状態が変化する状況をテストする際に有用です。

## まとめ

本章では、`instance_double`を使用してメソッドの返り値を設定する方法について学習しました。実際のデータベースアクセスなど、外部依存のある処理をシミュレートすることで、テストの実行速度向上と安定性の確保が可能になります。

また、RSpecの`let`、`subject`、`context`などの機能を活用することで、テストコードをより効率的に管理する方法も学びました。これらの機能を使いこなすことで、テストコードの可読性が向上し、メンテナンスも容易になります。

次の章では、スタブとモックの違いや使い分けについて、より詳しく学んでいきましょう。それぞれの特徴を理解し、適切なシーンで活用できるようになることが、効果的なテスト設計の鍵となります。
