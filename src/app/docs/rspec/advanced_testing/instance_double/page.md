---
title: instance_doubleで安全なモックを使ったテストを書こう
nextjs:
  metadata:
    title: instance_doubleで安全なモックを使ったテストを書こう
    description: RSpecのinstance_doubleを使って、より信頼性の高いモックテストを実装する方法を学びます。クラスの仕様に準拠したテストで、リファクタリング時の不整合を早期に検知できるようになります。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [instance\_doubleとは](#instance_doubleとは)
- [通常のdoubleの課題](#通常のdoubleの課題)
- [instance\_doubleを使用した改善](#instance_doubleを使用した改善)
- [正しい実装への修正](#正しい実装への修正)
- [instance\_doubleの活用シーン](#instance_doubleの活用シーン)
  - [リファクタリング時の安全性確保](#リファクタリング時の安全性確保)
  - [チーム開発での一貫性維持](#チーム開発での一貫性維持)
- [まとめ](#まとめ)

## 学習の目標

本章では、以下の内容を学習します。

- instance_doubleの基本概念と重要性を理解する
- 通常のdoubleと比較した際のメリットを把握する
- クラスの仕様変更を早期に検知する方法を習得する
- より信頼性の高いテストコードの書き方を身につける

## はじめに

前回は基本的なモックの使い方について学習しました。今回は、より信頼性の高いテストを実現する**instance_double**について学んでいきます。

前回のモックテストにも課題があります。それは実際のクラスに存在しないメソッドでもテストが通ってしまう点です。この課題を解決するためのテクニックを身につけましょう。

## instance_doubleとは

instance_doubleは、特定のクラスに基づいてモックを作成する機能です。クラスの仕様に準拠したテストを強制することで、テストの信頼性を高めることができます。

主な特徴として、クラスで定義されていないメソッドや不適切な引数を設定しようとすると、即座にエラーが発生します。これにより、リファクタリング時の仕様変更を早期に検知することが可能となります。

通常のdoubleでは実装とテストの間に齟齬があっても気づきにくいですが、instance_doubleを使うとそのような問題を素早く発見できます。

## 通常のdoubleの課題

まずは、前回学習したメール送信の例を使って、通常のdoubleの課題を確認していきましょう。メール送信を担当する`EmailService`クラスのコードは以下の通りです。

```ruby
class EmailService
  def send_welcome_mail(email)
    # 実際のメール送信処理（今回は省略）
    puts "Welcome mail sent to #{email}"
  end
end
```

`EmailService`を利用する`UserRegister`クラスは以下のようになっています。

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

ここで、`EmailService`のメソッド名を`send_welcome_mail`から`deliver_welcome_mail`に変更してみましょう。実際の開発現場では、仕様変更やリファクタリングでこのようなことがよく起こります。

```ruby
class EmailService
  def deliver_welcome_mail(email)
    # 実際のメール送信処理（今回は省略）
    puts "Welcome mail sent to #{email}"
  end
end
```

通常のdoubleを使用したテストコードを実行してみます。

```ruby
require_relative '../user_register'

RSpec.describe UserRegister do
  describe '#register' do
    it 'ウェルカムメールが送信される' do
      # EmailServiceのモックを作成
      email_service = double(EmailService)

      # 古いメソッド名のままでテストを書いている
      expect(email_service).to receive(:send_welcome_mail).with('test@example.com')

      user_register = UserRegister.new(email_service)
      user_register.register('test@example.com')
    end
  end
end
```

このテストは成功してしまいますが、これだと問題です。実際の`EmailService`クラスではメソッド名が変更されているにもかかわらず、テストでは古いメソッド名のままでも通過してしまうためです。

そのため、たとえばこのままアプリをデプロイしてしまうと、実際の動作時にはメソッドが見つからずエラーが発生してしまいます。これは、テストが正常に通ったにもかかわらず、本番環境で問題が発生するという最悪のシナリオです。

## instance_doubleを使用した改善

この問題を解決するために、`instance_double`を使ってテストを書き直してみましょう。

```ruby
RSpec.describe UserRegister do
  describe '#register' do
    it 'ウェルカムメールが送信される' do
      # EmailServiceクラスに基づいてモックを作成
      email_service = instance_double(EmailService)

      # 古いメソッド名のままでテスト
      expect(email_service).to receive(:send_welcome_mail).with('test@example.com')

      user_register = UserRegister.new(email_service)
      user_register.register('test@example.com')
    end
  end
end
```

通常の`double`と`instance_double`の違いは、後者が実際のクラスに基づいて作成される点です。これにより、実際のクラスに存在しないメソッドを使おうとするとエラーが発生します。

このテストを実行すると、以下のようなエラーが表示されます。

```bash
Failure/Error: expect(email_service).to receive(:send_welcome_mail).with('test@example.com')
  the EmailService class does not implement the instance method: send_welcome_mail
```

このエラーは、`send_welcome_mail`メソッドが`EmailService`クラスに存在しないことを示しています。これにより、実装との不整合を早期に発見することができます。

## 正しい実装への修正

エラーを解消するために、`UserRegister`クラスとテストコードを新しいメソッド名に合わせて修正します。

まず、`UserRegister`クラスを修正します。

```ruby
class UserRegister
  def initialize(email_service)
    @email_service = email_service
  end

  def register(email)
    puts 'ユーザー登録中...'
    @email_service.deliver_welcome_mail(email)
  end
end
```

テストコードも同様に修正します。

```ruby
RSpec.describe UserRegister do
  describe '#register' do
    it 'ウェルカムメールが送信される' do
      email_service = instance_double(EmailService)
      expect(email_service).to receive(:deliver_welcome_mail).with('test@example.com')

      user_register = UserRegister.new(email_service)
      user_register.register('test@example.com')
    end
  end
end
```

これで、実装とテストコードが一致し、信頼性の高いテストになりました。このように、`instance_double`を使うことで、実装とテストの間の不整合を早期に発見することができます。

## instance_doubleの活用シーン

ここまでで、`instance_double`の基本的な使い方とその利点について学びました。次に、実際の開発現場でどのように活用できるかを考えてみましょう。

### リファクタリング時の安全性確保

コードをリファクタリングする際、メソッド名やパラメータの変更はよく行われます。`instance_double`を使うことで、そのような変更に対するテストの信頼性を確保できます。変更後のコードとテストコードの間に不整合があれば、すぐにエラーが発生するため、問題を早期に発見できます。

言うなれば、`instance_double`はリファクタリングの「セーフティネット」として機能します。これにより、開発者は安心してコードを変更できるようになります。

### チーム開発での一貫性維持

複数の開発者が同時に作業する場合、誰かがクラスのインターフェースを変更すると、他の開発者のテストコードに影響を与える可能性があります。`instance_double`を使うことで、そのような変更を即座に検知でき、チーム全体での一貫性を維持しやすくなります。

これが、`double`と`instance_double`の大きな違いです。`double`は自由度が高い分、実装との不整合を見逃しやすくなりますが、`instance_double`はクラスに基づいているため、そのような問題を防ぐことができます。

## まとめ

本章では、`instance_double`の重要な特徴について学習しました。

実際のクラスに存在しないメソッドや不適切な引数を使用しようとすると、即座にエラーが発生します。これにより、リファクタリングによる仕様変更を早い段階で検知することができます。

実装とテストコードの間の不整合を防ぎ、より堅牢なテストを実現できるため、長期的なメンテナンス性の向上にもつながります。

次の章では、`instance_double`を使ったより実践的なテスト手法について学習していきます。メソッドの返り値の設定方法や、複数のメソッド呼び出しのテスト方法など、より高度な使い方を身につけていきましょう。
