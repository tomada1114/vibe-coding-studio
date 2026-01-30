---
title: changeマッチャーで値の変化を検証しよう
nextjs:
  metadata:
    title: changeマッチャーで値の変化を検証しよう
    description: RSpecのchangeマッチャーを使って値の変化を検証する方法を学びます。ポイント残高の増減など、実践的な例を通してメソッド実行前後の状態変化を簡潔に検証する手法を習得しましょう。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [テスト対象クラスの実装](#テスト対象クラスの実装)
- [ポイント加算機能の実装](#ポイント加算機能の実装)
- [changeマッチャーを使用したテストの実装](#changeマッチャーを使用したテストの実装)
- [ポイント使用機能の実装とテスト](#ポイント使用機能の実装とテスト)
- [changeマッチャーの応用](#changeマッチャーの応用)
- [changeマッチャーのさまざまな使い方](#changeマッチャーのさまざまな使い方)
  - [配列の要素数の変化を検証する](#配列の要素数の変化を検証する)
  - [特定の条件を満たすかどうかの変化を検証する](#特定の条件を満たすかどうかの変化を検証する)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- changeマッチャーの基本的な概念と、値の変化を検証するテストの重要性を理解する
- 実践的なクラス設計とテストの書き方を通じて、オブジェクト指向プログラミングの基本を習得する
- 状態（ポイント残高）を持つクラスの実装とテストについて学ぶ
- RSpecの特徴的な構文（ブロックを使用したマッチャー）の使い方を理解する
- 正常系（値が変化する場合）と異常系（値が変化しない場合）の両方のテストパターンを学ぶ

## はじめに

RSpecには様々な便利なマッチャーが用意されていますが、本章では特に`change`マッチャーについて学習していきます。

`change`マッチャーとは、ある処理を実行した前後で値がどのように変化したのかを検証するためのものです。実際のアプリケーション開発では、「ポイントが正しく加算されたか」「在庫数が適切に減少したか」といった値の変化を確認する必要が頻繁に発生します。これまで学んだマッチャーとは少し異なる書き方になりますが、`change`マッチャーを使うことで、このような値の変化を簡潔かつ明確にテストすることができます。

それでは、実際にコードを書きながら`change`マッチャーの使い方を学んでいきましょう。

## テスト対象クラスの実装

まずは、テスト対象となるコードを作成していきます。今回はポイントを管理するための`Account`クラスを新しく実装してみましょう。

`account.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
class Account
  def initialize(points: 0)
    @points = points
  end

  def points
    @points
  end
end
```

このクラスの実装について、詳しく説明していきます。

`initialize`メソッドは、新しい`Account`オブジェクトが作成されるときに呼び出される特別なメソッドです。引数の`points: 0`は、Rubyのキーワード引数という機能を使用しています。これにより、初期ポイントを指定できると同時に、指定がない場合は0がデフォルト値として使用されます。

インスタンス変数`@points`は、そのアカウントが持つポイント残高を保持します。インスタンス変数を使用することで、オブジェクトの状態を保持することができます。

`points`メソッドは、現在のポイント残高を外部から参照するためのメソッド（ゲッターメソッド）です。このようなメソッドを用意することで、オブジェクトの内部状態を安全に外部から確認できるようになります。

## ポイント加算機能の実装

次に、ポイントを加算するための機能を追加します。先ほどのコードに、`add_points`メソッドを追加しましょう。

```ruby
class Account
  def initialize(points: 0)
    @points = points
  end

  def points
    @points
  end

  def add_points(amount)
    @points += amount
  end
end
```

`add_points`メソッドは、引数で指定された量だけポイントを増やす処理を行います。`+=`演算子を使用することで、現在の`@points`の値に`amount`を加算した結果を、再び`@points`に代入しています。

このような実装により、アカウントのポイント残高を増加させる機能が実現できました。では、この機能が正しく動作するかどうかをテストで確認していきましょう。

## changeマッチャーを使用したテストの実装

では、実装した`add_points`機能に対するテストを書いていきましょう。`spec/account_spec.rb`ファイルを作成し、以下のテストコードを記述してください。

```ruby
require_relative '../account'

RSpec.describe Account do
  describe '#add_points' do
    it 'ポイントを加算できる' do
      account = Account.new(points: 100)
      expect { account.add_points(30) }.to change { account.points }.by(30)
    end
  end
end
```

これまでのマッチャーとは異なり、`change`マッチャーを使用する際は、通常の`expect()`ではなく`expect {}`という波括弧を使用しています。これは、「これから実行する処理」をブロックとして指定するためです。

テストの構造は以下のような意味を持ちます。

1. `expect { account.add_points(30) }`：「この処理を実行すると...」
2. `to change { account.points }`：「accountのポイントが変化する」
3. `by(30)`：「その変化量は30である」

この書き方により、「メソッドを実行した結果、期待する値の変化が起きたか」を明確にテストすることができます。

ファイルを保存したら、テストを実行してみましょう。

```bash
bundle exec rspec spec/account_spec.rb
```

テストが成功すれば、`add_points`メソッドが正しく実装されていることが確認できます。

## ポイント使用機能の実装とテスト

続いて、ポイントを使用する機能を追加します。`account.rb`に`use_points`メソッドを追加しましょう。

```ruby
class Account
  def initialize(points: 0)
    @points = points
  end

  def points
    @points
  end

  def add_points(amount)
    @points += amount
  end

  def use_points(amount)
    if @points >= amount
      @points -= amount
    end
  end
end
```

このメソッドには以下のような条件分岐が含まれています。

- 残高が使用しようとするポイント以上ある場合のみ、ポイントを減らす
- 残高が不足している場合は、何も処理を行わない（ポイントは変化しない）

この機能に対するテストも追加していきましょう。`spec/account_spec.rb`に以下のテストケースを追加します。

```ruby
RSpec.describe Account do
  # 既存のテストはそのままで...

  describe '#use_points' do
    it 'ポイントを使用すると残高が減少する' do
      account = Account.new(points: 100)
      expect { account.use_points(30) }.to change { account.points }.by(-30)
    end

    it '残高が足りない場合は変化しない' do
      account = Account.new(points: 10)
      expect { account.use_points(30) }.not_to change { account.points }
    end
  end
end
```

このテストでは、2つの重要なシナリオを検証しています。

1. 正常系：ポイント残高が十分にある場合、指定した量だけポイントが減少することを`by(-30)`で検証
2. 異常系：ポイント残高が不足している場合、ポイントが変化しないことを`not_to change`で検証

今回のように`not_to change`を使用することで、「値が変化しないこと」という要件も明確にテストできます。これは、「期待する動作が起きない」ことを検証する場合に非常に便利です。

実装したテストを実行してみましょう。

```bash
bundle exec rspec spec/account_spec.rb
```

テストが成功すれば、`use_points`メソッドも正しく実装されていることが確認できます。

## changeマッチャーの応用

`change`マッチャーは、より複雑な変化のパターンも検証できます。例えば、「値が特定の範囲に収まること」や「特定の条件を満たすようになること」なども検証可能です。

いくつかの応用例を見てみましょう。例として、ボーナスポイント機能を追加します。`account.rb`に以下のメソッドを追加してください。

```ruby
def add_bonus_points(amount)
  @points += amount * 2  # ボーナスポイントは2倍
end
```

このメソッドに対するテストは、以下のように書けます。

```ruby
describe '#add_bonus_points' do
  it 'ボーナスポイントを2倍で加算できる' do
    account = Account.new(points: 100)
    expect { account.add_bonus_points(30) }.to change { account.points }.from(100).to(160)
  end
end
```

ここでは、`from(100).to(160)`を使用して、「ポイントが100から160に変化すること」を検証しています。これにより、変化前と変化後の具体的な値を指定することができます。

また、複数の値の変化を同時にテストすることもできます。例えば、アカウントをアップグレードする機能を追加し、アップグレード時に複数の属性が変化することを検証するテストなども考えられます。

## changeマッチャーのさまざまな使い方

`change`マッチャーは、単純な数値の変化だけでなく、さまざまな変化のパターンを検証できます。以下に、いくつかの例を紹介します。

### 配列の要素数の変化を検証する

```ruby
# 購入履歴を管理する機能の例
def add_purchase_history(item)
  @history ||= []
  @history << item
end

# テスト
it '購入履歴が追加される' do
  expect { account.add_purchase_history('コーヒー') }.to change { account.history.size }.by(1)
end
```

### 特定の条件を満たすかどうかの変化を検証する

```ruby
# アカウントのステータスを変更する機能の例
def upgrade_to_premium
  @status = 'premium'
end

# テスト
it 'プレミアム会員にアップグレードできる' do
  expect { account.upgrade_to_premium }.to change { account.premium? }.from(false).to(true)
end
```

このように、`change`マッチャーは様々な状況で活用できる非常に便利なマッチャーです。

## まとめ

本章では、RSpecの`change`マッチャーについて学習しました。以下の内容をマスターできたことと思います。

- `change`マッチャーを使用することで、メソッドの実行による値の変化を明確かつ簡潔にテストできる
- ブロックを使った特殊な構文（`expect { ... }.to change { ... }`）の使い方
- 値が増減する場合だけでなく、値が変化しないケースのテスト方法
- 変化前と変化後の具体的な値を指定する方法

`change`マッチャーは、特に以下のような場面で活用できます。

- ポイントや在庫数など、数値の増減をテストする場合
- 配列の要素数の変化をテストする場合
- データベースのレコード数の変化をテストする場合
- オブジェクトの状態変化をテストする場合

次回は、エラーが発生することを検証するための`raise_error`マッチャーについて学習します。例外処理は実際のアプリケーション開発で重要な役割を果たすため、適切にテストすることが大切です。
