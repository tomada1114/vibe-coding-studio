---
title: beマッチャーでオブジェクトの状態を検証しよう
nextjs:
  metadata:
    title: beマッチャーでオブジェクトの状態を検証しよう
    description: RSpecのbeマッチャーを使って、真偽値やnilなどオブジェクトの状態を検証する方法を学びます。実際のコード例を通して、直感的で読みやすいテストの書き方を習得しましょう。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [beマッチャーの役割](#beマッチャーの役割)
- [実践：beマッチャーを使ってみよう](#実践beマッチャーを使ってみよう)
- [nilの検証を試してみよう](#nilの検証を試してみよう)
- [beマッチャーの様々な形式](#beマッチャーの様々な形式)
  - [be\_truthy と be\_falsey](#be_truthy-と-be_falsey)
  - [数値の比較](#数値の比較)
  - [述語マッチャー](#述語マッチャー)
- [まとめ](#まとめ)

## 学習の目標

本章では、以下の内容を学習します。

- beマッチャーの基本的な役割と使用方法を理解する
- 真偽値（true/false）の検証方法を習得する
- nilチェックの実装方法を学ぶ
- ユーザー認証システムを例に、実践的なテストケースの作成方法を習得する
- beマッチャーの様々なバリエーションについて理解する

## はじめに

ここまでのセクションで、`expect`とマッチャーの基本的な使い方について学んできました。その中で最もよく使う`eq`マッチャーについても説明しましたね。

今回は、もう一つの重要なマッチャーである`be`について説明していきます。`be`マッチャーは、オブジェクトの状態を検証するための強力なツールです。

## beマッチャーの役割

`be`マッチャーは、オブジェクトの状態を検証するためのマッチャーです。以前学んだ`eq`マッチャーと並んで、RSpecで最もよく使われる重要なマッチャーの1つとなっています。

このマッチャーは特に、真偽値やnilの検証に適しています。また、オブジェクトの様々な状態確認を直感的に書けるように設計されています。

具体的には、以下のような状況で活用できます。

- 値がnilかどうかを検証する場合（例: ユーザーの削除後にデータがnilになっているか）
- メソッドがtrueまたはfalseを返すかどうかを確認する場合（例: ユーザーが認証されているかどうか）
- 数値が正か負か、または特定の条件を満たすかどうかを検証する場合

それでは、具体的なコードを通して`be`マッチャーの使い方を学んでいきましょう。

## 実践：beマッチャーを使ってみよう

まずは、テスト対象となる`User`クラスを作成します。`user.rb`というファイルを作成し、以下のコードを書いていきましょう。

```ruby
class User
  def initialize(is_activated: false)
    @is_activated = is_activated
  end

  def activated?
    @is_activated
  end
end
```

このシンプルな`User`クラスでは、ユーザーが有効化されているかどうかを表す`activated?`というメソッドを用意しています。デフォルトでは新規作成時に有効化されていない、つまり`false`の状態になるように実装しています。

では、このコードに対するテストを書いていきましょう。`spec/user_spec.rb`というファイルを作成し、以下のコードを追加します。

```ruby
require_relative '../user'

RSpec.describe User do
  describe '#activated?' do
    it '新規ユーザーは有効化されていない' do
      user = User.new
      expect(user.activated?).to be false
    end
  end
end
```

このテストコードでは、`be`マッチャーを使用しています。`activated?`メソッドが`false`を返すことを検証するために、`expect(user.activated?).to be false`と記述しています。

では、このテストを実行してみましょう。ターミナルで以下のコマンドを実行します。

```bash
bundle exec rspec spec/user_spec.rb
```

実行すると、次のような結果が表示されるはずです。

```bash
User
  #activated?
    新規ユーザーは有効化されていない

Finished in 0.00231 seconds (files took 0.15594 seconds to load)
1 example, 0 failures
```

テストが成功したことが確認できました。次に、ユーザーを有効化できる機能を追加してみましょう。

`user.rb`に`verify_email`メソッドを追加します。

```ruby
class User
  def initialize(is_activated: false)
    @is_activated = is_activated
  end

  def activated?
    @is_activated
  end

  def verify_email
    @is_activated = true
  end
end
```

`verify_email`メソッドを呼び出すと、ユーザーが有効化される、つまり`@is_activated`が`true`になるようになりました。このコードに対するテストも追加していきましょう。

`spec/user_spec.rb`に新しいテストケースを追加します。

```ruby
require_relative '../user'

RSpec.describe User do
  describe '#activated?' do
    it '新規ユーザーは有効化されていない' do
      user = User.new
      expect(user.activated?).to be false
    end

    it 'メール認証後のユーザーは有効化される' do
      user = User.new
      user.verify_email
      expect(user.activated?).to be true
    end
  end
end
```

追加したテストでは、`verify_email`メソッドを呼び出した後に、`activated?`メソッドが`true`を返すことを検証しています。このテストでも同様に`be`マッチャーを使用していますが、今回は`be true`という形で記述しています。

テストを実行して、両方のテストケースが成功することを確認しましょう。

```bash
bundle exec rspec spec/user_spec.rb
```

## nilの検証を試してみよう

次は、nilの検証について学んでいきましょう。ユーザークラスにプロフィール文を設定できる機能を追加します。

`user.rb`に`profile`メソッドと`set_profile`メソッドを追加します。

```ruby
class User
  def initialize(is_activated: false)
    @is_activated = is_activated
    @profile = nil
  end

  def activated?
    @is_activated
  end

  def verify_email
    @is_activated = true
  end

  def profile
    @profile
  end

  def set_profile(text)
    @profile = text
  end
end
```

初期状態ではプロフィールが設定されていない、つまりnilの状態になっており、`set_profile`メソッドでプロフィール文を設定できるようになっています。

このコードに対するテストを追加してみましょう。`spec/user_spec.rb`に以下のテストケースを追加します。

```ruby
require_relative '../user'

RSpec.describe User do
  # 前述のテストケースはそのまま残しておきます

  describe '#profile' do
    it '新規ユーザーはプロフィールが未設定' do
      user = User.new
      expect(user.profile).to be_nil
    end

    it 'プロフィール設定後は設定した内容を返す' do
      user = User.new
      user.set_profile('よろしくお願いします')
      expect(user.profile).to eq 'よろしくお願いします'
    end
  end
end
```

nilかどうかを検証する場合は、`be_nil`というマッチャーを使います。これは`be`マッチャーの特別な形式の一つです。

テストを実行して、すべてのテストケースが成功することを確認しましょう。

```bash
bundle exec rspec spec/user_spec.rb
```

## beマッチャーの様々な形式

`be`マッチャーには、今回紹介した基本形式以外にも様々なバリエーションがあります。よく使われるものをいくつか紹介します。

### be_truthy と be_falsey

Rubyでは、`false`と`nil`以外のすべての値は真値（truthy）として扱われます。この真値かどうかを検証するには`be_truthy`を使います。逆に、偽値（falsey）かどうかを検証するには`be_falsey`を使います。

```ruby
it '真値と偽値の検証' do
  expect(true).to be_truthy
  expect(1).to be_truthy
  expect("hello").to be_truthy

  expect(false).to be_falsey
  expect(nil).to be_falsey
end
```

### 数値の比較

数値が正か負か、ゼロかといった検証には、`be_positive`、`be_negative`、`be_zero`などを使います。

```ruby
it '数値の検証' do
  expect(5).to be_positive
  expect(-3).to be_negative
  expect(0).to be_zero
end
```

### 述語マッチャー

Rubyのメソッド名が`?`で終わる場合（述語メソッドと呼ばれます）、それに対応する`be_xxx`形式のマッチャーを使うことができます。

例えば、`Array`クラスの`empty?`メソッドに対応する`be_empty`マッチャーや、`String`クラスの`include?`メソッドに対応する`be_include`マッチャーなどです。

```ruby
it '述語マッチャーの例' do
  expect([]).to be_empty
  expect("hello").to include("lo")
end
```

これらのマッチャーは、テストコードをより読みやすく、自然な英語の文章に近い形で書けるようにするためのものです。

## まとめ

本章では、RSpecの`be`マッチャーについて学習しました。以下の内容をマスターできたことと思います。

- `be`マッチャーはオブジェクトの状態を検証するために使用される
- 真偽値（`true`/`false`）の検証には`be true`や`be false`を使う
- nilかどうかを検証するには`be_nil`を使う
- `be_truthy`や`be_falsey`などの派生形もある
- 述語メソッド（`?`で終わるメソッド）に対応する`be_xxx`形式のマッチャーも便利

`be`マッチャーは、オブジェクトの状態を検証する場面で非常に役立ちます。特に真偽値やnilの検証では、このマッチャーを積極的に活用していくとよいでしょう。

次回は、配列や文字列の検証に使う`include`マッチャーについて説明していきます。配列の要素チェックや文字列の部分一致など、さらに幅広いテストケースに対応できるようになります。
