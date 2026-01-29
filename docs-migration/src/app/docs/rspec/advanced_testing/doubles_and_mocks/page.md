---
title: オブジェクト同士の連携をdoubleモックでテストしよう
nextjs:
  metadata:
    title: オブジェクト同士の連携をdoubleモックでテストしよう
    description: RSpecのモック機能を使って、オブジェクト間の依存関係を適切に切り離してテストする方法を学びます。メソッド呼び出しの検証方法や実行回数の確認など、初心者にもわかりやすく解説します。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [メール送信機能の実装例](#メール送信機能の実装例)
- [依存関係の適切な実装](#依存関係の適切な実装)
- [モックを活用したテストの実装](#モックを活用したテストの実装)
  - [依存関係の分離](#依存関係の分離)
  - [メソッド呼び出しの検証](#メソッド呼び出しの検証)
- [テストの実行方法](#テストの実行方法)
- [メソッド実行回数の検証](#メソッド実行回数の検証)
- [実践的なテストシナリオ](#実践的なテストシナリオ)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- モックの基本概念と重要性を理解する
- クラス間の依存関係を適切に切り離してテストする方法を習得する
- メソッドの呼び出し検証や実行回数の確認方法を学ぶ
- 実践的なモックの活用シーンとパターンを理解する

## はじめに

前回学習したスタブは、メソッドの戻り値を設定する機能でした。今回は、スタブの機能に加えて、メソッドの呼び出しを検証できる**モック**について学習します。

モックもスタブと同様に、クラス間の依存関係を切り離してテストできるという特徴があります。さらに、メソッドが正しく呼び出されたかどうかを確認できるという重要な機能も備えています。

## メール送信機能の実装例

具体例として、ユーザー登録時に歓迎メールを送信する機能を実装してみましょう。この機能には、メール送信用のクラスとユーザー登録用のクラスが必要となります。

まず、メール送信を担当する`EmailService`クラスを実装します。`email_service.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
class EmailService
  def send_welcome_mail(email)
    # 実際のメール送信処理（今回は省略）
    puts "Welcome mail sent to #{email}"
  end
end
```

この`EmailService`クラスは、実際のメール送信処理を行うためのクラスです。今回は簡略化のため、実際のメール送信処理は省略し、コンソールに出力するだけにしています。実際のアプリケーションでは、SMTPサーバーと通信したり、メールサービスのAPIを呼び出したりする処理が入ることになるでしょう。

## 依存関係の適切な実装

次に、`EmailService`を利用してユーザー登録を行う`UserRegister`クラスを実装します。このクラスは`EmailService`に依存することになります。

`user_register.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative './email_service'

class UserRegister
  def initialize(email_service)
    @email_service = email_service
  end

  def register(email)
    # ユーザー登録のメイン処理（今回は省略）
    puts 'ユーザー登録中...'

    # 登録完了後にウェルカムメールを送信
    @email_service.send_welcome_mail(email)
  end
end
```

ここで重要な点は、`UserRegister`クラスの設計方法です。**コンストラクタインジェクション**という手法を採用し、`initialize`メソッドで`email_service`を受け取るようにしています。この設計パターンにより、テスト時にモックを容易に差し替えることが可能となります。

もしクラス内で直接`EmailService`をインスタンス化していた場合、モックへの置き換えが困難になってしまいます。例えば以下のような実装だと、テスト時に`EmailService`をモックに置き換えることができません。

```ruby
# 良くない実装例
class UserRegister
  def initialize
    @email_service = EmailService.new  # 直接インスタンス化
  end

  def register(email)
    # ...
  end
end
```

コンストラクタインジェクションを使うと、テスト時に実際の`EmailService`ではなく、モックオブジェクトを渡すことができ、テストが容易になります。

## モックを活用したテストの実装

それでは、`UserRegister`クラスのテストを実装していきましょう。`spec/user_register_spec.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative '../user_register'

RSpec.describe UserRegister do
  describe '#register' do
    it 'ウェルカムメールが送信される' do
      # EmailServiceのモックを作成
      email_service = double(EmailService)

      # send_welcome_mailメソッドが呼ばれることを期待
      expect(email_service).to receive(:send_welcome_mail).with('test@example.com')

      # UserRegisterにモックを渡してregisterを実行
      user_register = UserRegister.new(email_service)
      user_register.register('test@example.com')
    end
  end
end
```

このテストコードには、2つの重要な特徴があります。

### 依存関係の分離

実際の`EmailService`の代わりにモックを使用することで、実メール送信処理から独立したテストが可能になります。これにより、テスト環境でも実際にメールを送信することなく、正しく動作するかどうかを確認できます。

### メソッド呼び出しの検証

`expect(email_service).to receive(:send_welcome_mail)`という記述により、メソッドが実際に呼び出されたことを確認できます。また、`.with('test@example.com')`を追加することで、正しい引数で呼び出されたかどうかも検証しています。

特に注目すべき点として、`expect`文がテストケースの途中に配置されていることが挙げられます。モックを使用する場合、期待する振る舞いを先に定義してから、テスト対象のメソッドを実行するという順序で記述します。

## テストの実行方法

作成したテストを実行するには、以下のコマンドを使用します。

```bash
$ rspec spec/user_register_spec.rb
```

実行すると、以下のような結果が表示されます。

```bash
UserRegister
  #register
    ウェルカムメールが送信される

Finished in 0.00234 seconds (files took 0.12345 seconds to load)
1 example, 0 failures
```

テストが問題なく通過したことが確認できます。もし`UserRegister#register`メソッド内で`@email_service.send_welcome_mail`の呼び出しが行われなかった場合、このテストは失敗します。これがモックの大きな特徴であり、単に値を返すだけのスタブとは異なる点です。

## メソッド実行回数の検証

モックの高度な機能として、メソッドの実行回数を検証する機能があります。以下のように、様々な実行回数の検証が可能です。

```ruby
RSpec.describe UserRegister do
  describe '#register' do
    it 'ウェルカムメールが1回だけ送信される' do
      email_service = double(EmailService)

      # 1回の実行を期待
      expect(email_service).to receive(:send_welcome_mail)
        .with('test@example.com').once

      user_register = UserRegister.new(email_service)
      user_register.register('test@example.com')
    end
  end
end
```

実行回数の指定方法には以下のようなバリエーションがあります。

- 1回の実行：`.once`
- 2回の実行：`.twice`
- 特定回数の実行：`.exactly(n).times`

これらを使うことで、メソッドが想定した回数だけ実行されるかどうかを検証できます。例えば、ユーザー登録時に歓迎メールが2回送信されてしまうというバグがあった場合、`.once`の指定によってそれを検出することができます。

## 実践的なテストシナリオ

実際のアプリケーション開発では、より複雑なシナリオでのテストも必要になります。例えば、条件によってメール送信を行うかどうかを判断するケースを考えてみましょう。

```ruby
class UserRegister
  def initialize(email_service)
    @email_service = email_service
  end

  def register(email, send_welcome = true)
    puts 'ユーザー登録中...'

    # オプションパラメータに応じてメール送信
    if send_welcome
      @email_service.send_welcome_mail(email)
    end
  end
end
```

このように条件分岐がある場合でも、モックを使って適切にテストできます。

```ruby
RSpec.describe UserRegister do
  let(:email_service) { double(EmailService) }
  let(:user_register) { UserRegister.new(email_service) }

  context 'ウェルカムメールを送信する場合' do
    it 'メールが送信される' do
      expect(email_service).to receive(:send_welcome_mail).with('test@example.com')
      user_register.register('test@example.com', true)
    end
  end

  context 'ウェルカムメールを送信しない場合' do
    it 'メールは送信されない' do
      expect(email_service).not_to receive(:send_welcome_mail)
      user_register.register('test@example.com', false)
    end
  end
end
```

`expect(...).not_to receive(...)`を使用することで、メソッドが呼び出されないことを検証できます。このように、モックを活用することで様々なシナリオを効果的にテストできます。

## まとめ

本章では、モックの2つの重要な特徴について学習しました。

**依存関係の分離**という設計パターンにより、テスト対象外のクラスをモックで置き換えることができます。これはスタブと同様の特徴です。

また、**メソッド呼び出しの検証**も学びました。メソッドが実際に呼び出されたかどうか、また正しい引数で呼び出されたかを検証できます。これはモック特有の機能です。

これらの特徴を活用することで、より堅牢なテストの実装が可能となります。クラス間の依存関係を適切に管理し、コンストラクタインジェクションなどの設計パターンを活用することで、テスタビリティの高いコードを書けるようになるでしょう。

次の章では、より安全なモックの実装方法である`instance_double`について学習します。これにより、モックとして設定したメソッドが実際のクラスに存在するかどうかを検証でき、より信頼性の高いテストを書くことができます。
