---
title: subjectでテスト対象の処理を効率よく書こう
nextjs:
  metadata:
    title: subjectでテスト対象の処理を効率よく書こう
    description: RSpecのsubjectを使ってテストデータを効率的に管理する方法を学びます。コードの重複を減らし、テストの可読性とメンテナンス性を向上させる実践的な手法を身につけましょう。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [subjectの基本的な使い方](#subjectの基本的な使い方)
  - [従来の記述方法](#従来の記述方法)
  - [subjectを使用した改善](#subjectを使用した改善)
- [名前付きsubjectの使用](#名前付きsubjectの使用)
- [複雑な例：ユーザー認証の検証](#複雑な例ユーザー認証の検証)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- RSpecのsubjectの概念と、テストデータを効率的に管理する方法について理解する
- テストコードの重複を排除し、メンテナンス性を向上させる手法を習得する
- 名前付きsubjectを使用して、テストコードの可読性を向上させる方法を学ぶ
- テストケース間でのデータ共有の方法とそのメリットについて理解する
- 実際のプロジェクトでの効果的なsubjectの活用法を身につける

## はじめに

皆さん、これまでのチャプターでRSpecの基本的な使い方を学んできましたね。テストを書いていると、同じオブジェクトを何度も作成したり、同じメソッドを何度も呼び出したりすることがよくあります。こういったコードの繰り返しは、テストの可読性や保守性を下げてしまうんです。

そこで今回は、テスト対象となるオブジェクトを効率的に扱うための`subject`について説明します。`subject`を使えば、テストで繰り返し利用するオブジェクトをスマートに管理できるようになりますよ。

`subject`は、テストデータを管理するための便利な機能です。これを使うことで、テストケース間でデータを共有でき、一度定義したデータを複数のテストで再利用することができます。また、コードの重複を防ぐことができるため、テストコードをより簡潔に保つことができるんです。

この機能を使うことで、以下のようなうれしいメリットがあります。

- テストコードの記述が簡潔になる
- メンテナンス性が向上する
- テストの意図がより明確になる

それでは、具体的なコードを見ながら学んでいきましょう！

## subjectの基本的な使い方

まずは、簡単な例を通して`subject`の基本的な使い方を見ていきましょう。新しく`greeter.rb`というファイルを作成し、簡単な挨拶を返すプログラムを実装します。

```ruby
class Greeter
  def hello
    'Hello'
  end
end
```

このコードでは、`Greeter`クラスに`hello`メソッドが実装されており、単純に「Hello」という文字列を返す処理を行います。とてもシンプルですね。

では、このクラスに対するテストを書いていきましょう。まずは、`subject`を使わない一般的な書き方でテストを実装してみます。

### 従来の記述方法

`spec/greeter_spec.rb`というファイルを作成し、以下のコードを記述してください。

```ruby
require_relative '../greeter'

RSpec.describe Greeter do
  describe '#hello' do
    it 'Helloという文字列を返す' do
      greeter = Greeter.new
      expect(greeter.hello).to eq('Hello')
    end

    it 'Helloはnilではない' do
      greeter = Greeter.new
      expect(greeter.hello).not_to be_nil
    end

    it 'Helloは空文字ではない' do
      greeter = Greeter.new
      expect(greeter.hello).not_to be_empty
    end
  end
end
```

このテストコードを見てみると、各テストケースで同じような処理が繰り返されていることに気づきませんか？具体的には、各テストで`Greeter`のインスタンスを作成し、`hello`メソッドを呼び出す部分が重複しています。

テストケースが増えれば増えるほど、この重複も増えていきます。そうなると、もしクラスの構造が変わった場合、すべてのテストケースを修正する必要が出てきて大変ですよね。

### subjectを使用した改善

この重複を解消するために、`subject`を活用してみましょう。`spec/greeter_spec.rb`を以下のように修正します。

```ruby
require_relative '../greeter'

RSpec.describe Greeter do
  describe '#hello' do
    subject { Greeter.new.hello }

    it 'Helloという文字列を返す' do
      expect(subject).to eq('Hello')
    end

    it 'Helloはnilではない' do
      expect(subject).not_to be_nil
    end

    it 'Helloは空文字ではない' do
      expect(subject).not_to be_empty
    end
  end
end
```

この例では、`subject { Greeter.new.hello }`と定義しています。これにより、テスト内で`subject`と書くだけで、`Greeter.new.hello`の結果を参照できるようになりました。

各テストケースで毎回`Greeter`のインスタンスを作成する必要がなくなり、コードがすっきりしましたね。これが`subject`の基本的な使い方です。

テストコードが簡潔になっただけでなく、「何をテストしているのか」という意図も明確になりました。テスト対象（`subject`）は`Greeter.new.hello`であり、それが特定の条件を満たすかどうかをテストしていることが一目でわかります。

それでは、テストを実行してみましょう。

```bash
bundle exec rspec spec/greeter_spec.rb
```

テストが成功すれば、`subject`を使った書き方でも正しくテストできていることが確認できますね。

## 名前付きsubjectの使用

`subject`には名前をつけることもできます。これにより、テストコードの可読性がさらに向上します。特に、複数の`subject`を使う場合や、`subject`の意味を明確にしたい場合に役立ちます。

`spec/greeter_spec.rb`を以下のように修正して、名前付き`subject`を使ってみましょう。

```ruby
require_relative '../greeter'

RSpec.describe Greeter do
  describe '#hello' do
    subject(:greeting) { Greeter.new.hello }

    it 'Helloという文字列を返す' do
      expect(greeting).to eq('Hello')
    end

    it 'Helloはnilではない' do
      expect(greeting).not_to be_nil
    end

    it 'Helloは空文字ではない' do
      expect(greeting).not_to be_empty
    end
  end
end
```

ここでは、`subject(:greeting) { Greeter.new.hello }`というように、`subject`に`:greeting`という名前をつけています。これにより、テスト内で`greeting`という名前で参照できるようになりました。

名前付き`subject`を使用することで、テストコードの意図がより明確になり、可読性が向上しています。「何をテストしているのか」がより自然な形で表現できるようになりました。

ただし、シンプルなテストケースでは名前なしの`subject`でも十分わかりやすいこともあります。複雑さに応じて使い分けるとよいでしょう。最初のうちは名前なしの`subject`から慣れていき、徐々に名前付き`subject`も使っていくことをおすすめします。

## 複雑な例：ユーザー認証の検証

もう少し実践的な例として、ユーザー認証をテストするケースを考えてみましょう。まず、以下のような`User`クラスを作成します。

```ruby
class User
  attr_reader :name, :admin

  def initialize(name, admin = false)
    @name = name
    @admin = admin
  end

  def admin?
    @admin
  end

  def greeting
    if admin?
      "Hello, admin #{@name}!"
    else
      "Hello, #{@name}!"
    end
  end
end
```

このクラスに対するテストを、`subject`を活用して書いてみましょう。

```ruby
require_relative '../user'

RSpec.describe User do
  describe '#greeting' do
    context '一般ユーザーの場合' do
      subject(:user) { User.new('John') }

      it '通常の挨拶を返す' do
        expect(user.greeting).to eq('Hello, John!')
      end

      it '管理者ではない' do
        expect(user.admin?).to be false
      end
    end

    context '管理者ユーザーの場合' do
      subject(:admin) { User.new('Admin', true) }

      it '管理者向けの挨拶を返す' do
        expect(admin.greeting).to eq('Hello, admin Admin!')
      end

      it '管理者である' do
        expect(admin.admin?).to be true
      end
    end
  end
end
```

このテストでは、一般ユーザーと管理者ユーザーの2つのケースを、それぞれ別の`context`で表現しています。そして、各`context`で異なる`subject`を定義しています。

一般ユーザーのテストでは`subject(:user) { User.new('John') }`、管理者ユーザーのテストでは`subject(:admin) { User.new('Admin', true) }`という形で、それぞれのコンテキストに合わせた`subject`を定義しています。

このように、`context`と`subject`を組み合わせることで、様々なケースを明確に区別し、テストコードの構造をより理解しやすくすることができます。

## まとめ

今回は、RSpecの`subject`について学びました。`subject`を使うことで、テストコードの重複を減らし、より読みやすく保守しやすいテストを書くことができます。特に以下のポイントを覚えておきましょう。

- `subject`を使うと、テスト対象のオブジェクトを一箇所で定義でき、テストコードの重複を防げる
- 名前付き`subject`を使うと、テストの意図がより明確になり、可読性が向上する
- `context`と組み合わせることで、異なる状況下でのテストを効率的に書ける
- 複雑なテストほど`subject`の恩恵が大きいが、シンプルなテストでも活用できる

`subject`はRSpecの中でも特に便利な機能の一つで、実際のプロジェクトでも頻繁に使われています。ぜひマスターして、効率的で読みやすいテストコードを書けるようになりましょう！
