---
title: raise_errorマッチャーでエラー処理を検証しよう
nextjs:
  metadata:
    title: raise_errorマッチャーでエラー処理を検証しよう
    description: RSpecを使用したエラーテストの基本を学び、raise_errorマッチャーでプログラムのエラー処理を適切に検証する方法を習得します。実践的な例を通して堅牢なアプリケーション開発のテスト技法を身につけましょう。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [エラーが発生するプログラムの作成](#エラーが発生するプログラムの作成)
- [テストコードの作成](#テストコードの作成)
- [テストケースの追加](#テストケースの追加)
- [エラータイプの検証](#エラータイプの検証)
- [より複雑なエラー処理のテスト](#より複雑なエラー処理のテスト)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- RSpecを使用したエラーテストの基本的な概念と重要性を理解する
- raise_errorマッチャーの使用方法と、エラーテストの実装方法を習得する
- 正常系と異常系の両方のテストケースの書き方について学ぶ
- エラーメッセージの検証方法と、期待値の設定の仕方を理解する
- プログラムの堅牢性を高めるためのテスト設計の考え方を身につける

## はじめに

プログラムが正しく動作するためには、正常な処理だけでなく、想定外の状況でも適切に対応できることが重要です。その検証を行うのが「エラーテスト」です。

エラーテストとは、プログラムが異常な状況（エラー）に遭遇した際の振る舞いを確認するためのテストです。意図的にエラーとなる状況を作り出し、プログラムが適切に対応できているかを確認します。

エラーテストを実装する理由には、以下の3つの重要な目的があります。

- 不適切なデータの入力や操作から、プログラムを守ることができます
- 予期せぬ状況でもシステムが安定して動作することを保証できます
- 問題が発生する可能性のある箇所を早い段階で発見できます

具体的な例として、以下のような状況でエラーテストが必要となります。

- 存在しない配列の要素にアクセスしようとした場合
- データベースに不正なデータ（必須項目が空など）を保存しようとした場合
- アプリケーションに想定外の値やリクエストが送られてきた場合

適切なエラーテストを実装することで、以下のようなメリットがあります。

- **システムの信頼性向上：** 予期せぬ状況でも適切に動作することを確認できます
- **障害の未然防止：** 想定外の操作による問題を事前に把握し、対策できます
- **保守性の向上：** エラーが発生した際の動作が明確になり、修正が容易になります

それでは、具体的な例を通じてエラーテストの書き方を学んでいきましょう。

## エラーが発生するプログラムの作成

今回は、簡単な計算プログラムを例にエラーテストの書き方を説明します。まずは`calculator.rb`というファイルを作成し、以下のコードを実装してください。

```ruby
class Calculator
  def divide(a, b)
    if b == 0
      raise ArgumentError, "0で割ることができません"
    end
    a / b
  end
end
```

このコードは、2つの数値の除算を行う`divide`メソッドを持つ`Calculator`クラスを定義しています。引数`a`を引数`b`で割った結果を返しますが、`b`が0の場合は計算ができません。そのため、0で割ろうとした場合は、`raise`メソッドを使って`ArgumentError`（引数エラー）を発生させています。

`raise`メソッドは、プログラムの実行を意図的に中断し、エラーを発生させるためのRubyの標準的な機能です。第一引数にエラーの種類、第二引数にエラーメッセージを指定します。この仕組みにより、プログラムは異常な状況を検出し、適切に処理を中断することができます。

このようなエラー処理は、実際のアプリケーション開発ではとても重要です。例えば、ユーザーからの入力データをチェックし、不正な値があれば適切なエラーメッセージを表示するといった処理は、よく見られるパターンです。

## テストコードの作成

次に、上記のプログラムをテストするコードを作成します。`spec/calculator_spec.rb`というファイルを作成し、以下のコードを実装してください。

```ruby
require_relative '../calculator'

RSpec.describe Calculator do
  describe '#divide' do
    it '0で割るとエラーが発生する' do
      calculator = Calculator.new
      expect { calculator.divide(10, 0) }.to raise_error(ArgumentError)
    end
  end
end
```

このテストコードでは、`raise_error`というRSpecの特別なマッチャーを使用しています。このマッチャーは、プログラムが適切にエラーを発生させるかどうかを確認するために使います。

通常のテストでは`expect()`と丸括弧を使いますが、エラーテストでは波括弧`{ }`を使います。これは、エラーが発生する「その瞬間」をテストするために必要な書き方です。また、波括弧の前後には必ず半角スペースを入れてください。これはRubyのコーディング規約で推奨されている書き方です。

それでは、このテストを実行してみましょう。ターミナルで以下のコマンドを実行します。

```bash
bundle exec rspec spec/calculator_spec.rb
```

テストが成功すれば、`divide`メソッドが0で割る場合に適切にエラーを発生させていることが確認できます。

## テストケースの追加

エラーテストをより充実させるため、いくつかのテストケースを追加してみましょう。`spec/calculator_spec.rb`を以下のように更新します。

```ruby
RSpec.describe Calculator do
  describe '#divide' do
    it '0で割るとエラーが発生する' do
      calculator = Calculator.new
      expect { calculator.divide(10, 0) }.to raise_error(ArgumentError)
    end

    it '0で割るとエラーメッセージが表示される' do
      calculator = Calculator.new
      expect { calculator.divide(10, 0) }.to raise_error(ArgumentError, "0で割ることができません")
    end

    it '通常の割り算は成功する' do
      calculator = Calculator.new
      expect { calculator.divide(10, 2) }.not_to raise_error
    end
  end
end
```

追加したテストケースについて説明します。

まず、2つ目のテストケースでは、エラーメッセージの内容も検証しています。`raise_error`マッチャーの第二引数として期待するエラーメッセージを指定することで、エラーの種類だけでなく、メッセージの内容まで正確に検証できます。これにより、ユーザーに提供するエラーメッセージが適切であることを確認できます。

次に、3つ目のテストケースでは、`not_to raise_error`を使用して、正常な状況ではエラーが発生しないことを確認しています。これは「正常系」のテストと呼ばれ、プログラムが通常の操作では問題なく動作することを検証するために重要です。

このように、異常系（エラーが発生するケース）と正常系（エラーが発生しないケース）の両方をテストすることで、プログラムの動作をより包括的に検証することができます。

テストを実行して、全てのテストケースが成功することを確認しましょう。

```bash
bundle exec rspec spec/calculator_spec.rb
```

## エラータイプの検証

Rubyには様々な種類のエラークラスがあります。例えば、`ArgumentError`、`RuntimeError`、`NoMethodError`などです。`raise_error`マッチャーでは、発生するエラーの種類を指定することで、適切なエラークラスが使用されているかどうかを検証できます。

例えば、以下のようなエラーが考えられます。

- `ArgumentError`: メソッドに渡された引数に問題がある場合
- `RuntimeError`: 実行時に一般的なエラーが発生した場合
- `NoMethodError`: 存在しないメソッドを呼び出した場合
- `TypeError`: 期待する型と異なる型のオブジェクトが使用された場合

実際のアプリケーション開発では、適切なエラークラスを選択し、明確なエラーメッセージを提供することが重要です。これにより、問題の原因を特定しやすくなり、デバッグが容易になります。

## より複雑なエラー処理のテスト

より実践的な例として、入力値の検証を行うクラスを作ってみましょう。`user_validator.rb`というファイルを作成し、以下のコードを実装してください。

```ruby
class UserValidator
  def validate_name(name)
    if name.nil? || name.empty?
      raise ArgumentError, "名前は必須です"
    elsif name.length < 3
      raise ArgumentError, "名前は3文字以上必要です"
    end
    true
  end

  def validate_email(email)
    if email.nil? || email.empty?
      raise ArgumentError, "メールアドレスは必須です"
    elsif !email.include?('@')
      raise ArgumentError, "メールアドレスの形式が不正です"
    end
    true
  end
end
```

このクラスは、ユーザー情報のバリデーション（検証）を行うメソッドを持っています。実際のWebアプリケーションでよくある処理ですね。それでは、このクラスに対するテストを書いてみましょう。`spec/user_validator_spec.rb`というファイルを作成し、以下のコードを実装してください。

```ruby
require_relative '../user_validator'

RSpec.describe UserValidator do
  describe '#validate_name' do
    it '名前が空の場合はエラーが発生する' do
      validator = UserValidator.new
      expect { validator.validate_name('') }.to raise_error(ArgumentError, "名前は必須です")
    end

    it '名前が短すぎる場合はエラーが発生する' do
      validator = UserValidator.new
      expect { validator.validate_name('ab') }.to raise_error(ArgumentError, "名前は3文字以上必要です")
    end

    it '有効な名前の場合はエラーが発生しない' do
      validator = UserValidator.new
      expect { validator.validate_name('John') }.not_to raise_error
    end
  end

  describe '#validate_email' do
    it 'メールアドレスが空の場合はエラーが発生する' do
      validator = UserValidator.new
      expect { validator.validate_email('') }.to raise_error(ArgumentError, "メールアドレスは必須です")
    end

    it 'メールアドレスの形式が不正な場合はエラーが発生する' do
      validator = UserValidator.new
      expect { validator.validate_email('invalid_email') }.to raise_error(ArgumentError, "メールアドレスの形式が不正です")
    end

    it '有効なメールアドレスの場合はエラーが発生しない' do
      validator = UserValidator.new
      expect { validator.validate_email('user@example.com') }.not_to raise_error
    end
  end
end
```

このテストコードでは、様々なケースを検証しています。名前やメールアドレスが空の場合、名前が短すぎる場合、メールアドレスの形式が不正な場合など、入力値が無効なときにはエラーが発生することを確認しています。また、入力値が有効な場合にはエラーが発生しないことも検証しています。

このように、`raise_error`マッチャーを使うことで、プログラムのエラー処理が適切に実装されているかを詳細に検証することができます。

## まとめ

エラーテストは、プログラムの信頼性を高めるための重要な要素です。適切なエラー処理とその検証により、より安全で堅牢なプログラムを作ることができます。

今回学んだポイントを整理すると、以下のようになります。

- `raise`メソッドでエラーを発生させることができる
- `raise_error`マッチャーでエラーの発生を検証できる
- エラーテストでは波括弧`{ }`を使用する
- `not_to`を使用することで、エラーが発生しないことも検証できる
- エラーメッセージの内容も検証することで、より詳細なテストが可能

実際のアプリケーション開発では、正常系のテストだけでなく、このような異常系のテストもしっかりと実装することが重要です。ユーザーからの入力データのバリデーションや、外部サービスとの連携時のエラー処理など、様々な場面でエラーテストの知識が役立つでしょう。
