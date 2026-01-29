---
title: User モデルにテストを追加しよう
nextjs:
  metadata:
    title: User モデルにテストを追加しよう
    description: RSpecを使ってUserモデルのテストを作成し、バリデーションを実装する方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [テスト関連ファイルの確認](#テスト関連ファイルの確認)
  - [作成されたテスト関連ファイル](#作成されたテスト関連ファイル)
- [Factory ファイルの修正](#factory-ファイルの修正)
- [User 生成＆取得のテスト](#user-生成取得のテスト)
- [User.nickname のバリデーション（文字数）](#usernickname-のバリデーション文字数)
  - [バリデーションのテストを追加](#バリデーションのテストを追加)
  - [文字数のバリデーションを追加](#文字数のバリデーションを追加)
- [User.nickname のバリデーション（空欄ではないこと）](#usernickname-のバリデーション空欄ではないこと)
  - [バリデーションのテストを追加](#バリデーションのテストを追加-1)
  - [バリデーションを追加](#バリデーションを追加)
- [テストのリファクタリング](#テストのリファクタリング)
- [全てのテストの実行](#全てのテストの実行)
- [変更をコミット](#変更をコミット)
- [テストコードの全文](#テストコードの全文)
- [email / password のバリデーションについて](#email--password-のバリデーションについて)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- RSpecを使ってUserモデルのテストを作成する方法を習得する
- FactoryBotを使ってテストデータを効率的に作成する手法を学ぶ
- テスト駆動開発の基本的な流れを理解する
- バリデーションのテストと実装方法をマスターする
- リファクタリングの意義と方法を学ぶ

## はじめに

前回、Deviseを用いてUserモデルを作成しました。実際にUserモデルを使用する前に、モデルが正しく機能することを確認するためのテストをRSpecで作成しておきましょう。また、Userモデルの一部の属性についてはバリデーション（入力値の検証）を設定しつつ、そのテストも同時に作成します。

テストを先に書いてから機能を実装するという手法は**テスト駆動開発**（TDD: Test-Driven Development）と呼ばれ、品質の高いコードを書くための重要な手法です。この章では、テスト駆動開発の流れに沿って、Userモデルのテストと実装を進めていきます。

## テスト関連ファイルの確認

まずは、おさらいをしておきましょう。前回 `bin/rails g devise User` を実行した際、テストに関連する以下のファイルが自動的に作成されました。

### 作成されたテスト関連ファイル

- **spec/factories/users.rb**
  FactoryBotを用いてテストで使用するUserオブジェクトを簡単に作成するためのファイルです。

- **spec/models/user_spec.rb**
  Userモデルのテストケースを記述するためのファイルです。

今回はこれらのファイルを修正し、最終的に `bin/rspec` 実行時に全てのテストが通ることを目指します。

## Factory ファイルの修正

まず最初に、`spec/factories/users.rb` ファイルを修正します。このファイルは以前導入したFactoryBotを使用して、テストでUserオブジェクトを簡単に作成するためのものです。

以下のように修正してください。

```ruby
FactoryBot.define do
  factory :user do
    nickname { 'テスト太郎' }
    sequence :email do |n|
      "test#{n}@example.com"
    end
    password { '111111' }
    password_confirmation { '111111' }
  end
end
```

ここで重要なのは、メールアドレスに`sequence`を使用している点です。`sequence`はFactoryBotの機能で、テストごとに異なる値を生成するのに役立ちます。

Userモデルのメールアドレスは一意（ユニーク）である必要があります。つまり、同じメールアドレスを持つユーザーを複数作ることはできません。複数のテストを実行する際に同じメールアドレスが使われると衝突してエラーが発生してしまうため、`sequence`を使って連番を付与することでこの問題を解決しています。

一方、ニックネームやパスワードなどの他の属性は一意である必要がないため、固定の値を設定しています。このようにFactoryファイルを設定しておくことで、テスト時にUserオブジェクトを簡単かつ適切に作成できるようになります。

## User 生成＆取得のテスト

次に、Userモデルのテストファイル `spec/models/user_spec.rb` を修正します。まずは基本的なテストとして、FactoryBotで生成したUserを`User.first`で取得し、そのUserが想定通りの属性（nickname, email）を持っていることを確認するテストを書きましょう。

```ruby
require 'rails_helper'

describe User do
  let(:nickname) { 'テスト太郎' }
  let(:email) { 'test@example.com' }

  describe '.first' do
    before do
      create(:user, nickname: nickname, email: email)
    end

    subject { described_class.first }

    it '事前に作成した通りのUserを返す' do
      expect(subject.nickname).to eq('テスト太郎')
      expect(subject.email).to eq('test@example.com')
    end
  end
end
```

このテストコードでは、以下のことを行っています。

1. `before` ブロック内で、FactoryBotの`create`メソッドを使ってUserを作成します
2. `subject`で、テスト対象を`User.first`（データベースの最初のUser）に設定します
3. `it`ブロック内で、そのUserのnicknameとemailが期待通りの値かをテストします

これでテストを実行してみましょう。下記のコマンドで、今回作成したテストだけを実行します。

```bash
$ bin/rspec spec/models/user_spec.rb
```

すべてのテストが通れば成功です。次のような結果が表示されるはずです。

```
User
  .first
    事前に作成した通りのUserを返す

Finished in 0.06006 seconds (files took 0.5011 seconds to load)
1 example, 0 failures
```

## User.nickname のバリデーション（文字数）

続いて、Userモデルのnicknameにバリデーションを追加していきます。ここでは、**テスト駆動開発**の流れに沿って進めます。つまり、最初にバリデーションのテストを書き、その後で実際のバリデーションを実装します。

テスト駆動開発を行うことで、コードが確実に要件を満たしているかを検証できるだけでなく、仕様を明確にし、コードの品質を向上させることができます。

### バリデーションのテストを追加

今回は、ニックネームの長さを**20文字まで**に制限するバリデーションを実装します。まずは、そのためのテストを追加しましょう。

テストでは以下の2つのケースを確認します。

1. ニックネームが20文字の場合、Userオブジェクトは有効である
2. ニックネームが21文字の場合、Userオブジェクトは無効である

これを実現するために、先ほどの `.first` の部分とは別に、`validation` というdescribeブロックを追加します。user_spec.rbの全体は以下のようになります。

```ruby
require 'rails_helper'

describe User do
  let(:nickname) { 'テスト太郎' }
  let(:email) { 'test@example.com' }
  let(:password) { '12345678' }
  let(:user) { User.new(nickname: nickname, email: email, password: password, password_confirmation: password) }

  describe '.first' do
    before do
      create(:user, nickname: nickname, email: email)
    end

    subject { described_class.first }

    it '事前に作成した通りのUserを返す' do
      expect(subject.nickname).to eq('テスト太郎')
      expect(subject.email).to eq('test@example.com')
    end
  end

  describe 'validation' do
    describe 'nickname属性' do
      describe '文字数制限の検証' do
        context 'nicknameが20文字以下の場合' do
          let(:nickname) { 'あいうえおかきくけこさしすせそたちつてと' } # 20文字

          it 'User オブジェクトは有効である' do
            expect(user.valid?).to be(true)
          end
        end

        context 'nicknameが20文字を超える場合' do
          let(:nickname) { 'あいうえおかきくけこさしすせそたちつてとな' } # 21文字

          it 'User オブジェクトは無効である' do
            expect(user.valid?).to be(false)
            expect(user.errors[:nickname]).to include('is too long (maximum is 20 characters)')
          end
        end
      end
    end
  end
end
```

この中で新しく追加された部分を見ていきましょう。

コード内の `let(:user)` では、テストで使用するUserオブジェクトを定義しています。テスト内で `user.valid?` を呼び出すことで、オブジェクトが有効かどうかをチェックします。

バリデーションのテストでは、まず20文字のニックネームを持つユーザーが有効であることを確認し、次に21文字のニックネームを持つユーザーが無効であることを確認します。無効な場合はエラーメッセージも検証します。

まだバリデーションを実装していないので、このテストは失敗するはずです。テストを実行して確認してみましょう。

```bash
$ bin/rspec spec/models/user_spec.rb
```

以下のように一部のテストが失敗するはずです。

```
Finished in 0.11684 seconds (files took 0.50221 seconds to load)
3 examples, 1 failure

Failed examples:
rspec ./spec/models/user_spec.rb:35 # User validation nickname属性 文字数制限の検証 nicknameが20文字を超える場合 User オブジェクトは無効である
```

現時点ではバリデーションがないため、21文字のニックネームも有効と判定されてしまい、テストは失敗します。これはテスト駆動開発では正常な状態です。次に、このテストをパスするようにバリデーションを実装します。

### 文字数のバリデーションを追加

Userモデルにバリデーションを追加しましょう。`app/models/user.rb` を開き、以下のコードを追加します。

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, length: { maximum: 20 } # 追加
end
```

nicknameの長さを最大20文字に制限するバリデーションを追加しました。これにより、21文字以上のニックネームを持つユーザーは無効と判定されるようになります。

バリデーションを追加したら、テストを再度実行してみましょう。

```bash
$ bin/rspec spec/models/user_spec.rb
```

今度は全てのテストが通るはずです。

```
User
  .first
    事前に作成した通りのUserを返す
  validation
    nickname属性
      文字数制限の検証
        nicknameが20文字以下の場合
          User オブジェクトは有効である
        nicknameが20文字を超える場合
          User オブジェクトは無効である

Finished in 0.11225 seconds (files took 0.4578 seconds to load)
3 examples, 0 failures
```

このようにテスト駆動開発を行うことで、バリデーションの設定漏れなどを防ぐことができます。テストが通ることで、コードが正しく機能していることが保証されます。

## User.nickname のバリデーション（空欄ではないこと）

続いて、User.nicknameが空欄ではないことを確認するバリデーションを追加していきます。ここでもテスト駆動開発の流れに沿って、まずはテストを書いてみましょう。

### バリデーションのテストを追加

文字数のバリデーションと同じく、まずはテストを追加します。既存の `describe 'nickname属性' do` 内に、「nickname存在性の検証」を追加します。

```ruby
describe 'nickname存在性の検証' do
  context 'nicknameが空欄の場合' do
    let(:nickname) { '' }

    it 'User オブジェクトは無効である' do
      expect(user.valid?).to be(false)
      expect(user.errors[:nickname]).to include("can't be blank")
    end
  end
end
```

このテストでは、nicknameが空欄のUserオブジェクトを作成し、それが無効であること、そして「空欄ではない」ことを要求するエラーメッセージが含まれることを確認します。

テストを追加したら、実行して失敗することを確認しましょう。

```bash
$ bin/rspec spec/models/user_spec.rb
```

現時点ではnickname空欄のバリデーションがないため、このテストは失敗するはずです。

```
User
  .first
    事前に作成した通りのUserを返す
  validation
    nickname属性
      文字数制限の検証
        nicknameが20文字以下の場合
          User オブジェクトは有効である
        nicknameが20文字を超える場合
          User オブジェクトは無効である
      存在性の検証
        nicknameが空欄の場合
          User オブジェクトは無効である (FAILED - 1)
```

テストが失敗することを確認したら、次にこのテストをパスするようにバリデーションを実装します。

### バリデーションを追加

Userモデルに、nicknameの存在を確認するバリデーションを追加します。`app/models/user.rb` を開き、以下のコードを追加します。

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, length: { maximum: 20 }
  validates :nickname, presence: true # 追加
end
```

`presence: true` を追加することで、nicknameが空欄の場合にバリデーションエラーが発生するようになります。

バリデーションを追加したら、テストを再度実行してみましょう。

```bash
$ bin/rspec spec/models/user_spec.rb
```

すべてのテストが通ることを確認します。

```
User
  .first
    事前に作成した通りのUserを返す
  validation
    nickname属性
      文字数制限の検証
        nicknameが20文字以下の場合
          User オブジェクトは有効である
        nicknameが20文字を超える場合
          User オブジェクトは無効である
      存在性の検証
        nicknameが空欄の場合
          User オブジェクトは無効である

Finished in 0.08105 seconds (files took 0.4687 seconds to load)
4 examples, 0 failures
```

## テストのリファクタリング

テストが通ったら、次のステップとしてコードのリファクタリングを行います。リファクタリングとは、コードの外部的な動作は変えずに、内部的な構造を改善する作業のことです。テスト駆動開発では、次の流れが基本です。

1. **失敗するテストを書く**
2. **実装してテストを通す**
3. **リファクタリングしてコードを改善する**

今回は、Userモデルの中でnicknameのバリデーションを2行に分けていましたが、これを1行にまとめることができます。`app/models/user.rb` を以下のように修正しましょう。

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, presence: true, length: { maximum: 20 } # 変更
end
```

複数のバリデーションを同じ行に記述することで、コードがよりシンプルで読みやすくなります。Rubyでは同じ属性に対する複数のバリデーションをこのように一つにまとめるのが一般的です。

リファクタリングを終えたら、最後にテストを再実行して、すべてのテストが通ることを確認しましょう。

```bash
$ bin/rspec spec/models/user_spec.rb
```

```
4 examples, 0 failures
```

リファクタリング後もテストが通ることを確認できました。「テストを通している＝動作の保証ができている」という状態なので、安心してリファクタリングができるのがテスト駆動開発の大きなメリットです。

## 全てのテストの実行

特定のファイルのテストだけでなく、プロジェクト全体のテストを実行して、すべてのテストが通ることを確認しておきましょう。開発を進めていくうちに、予期せぬ箇所に影響することもあるため、最終的にはすべてのテストを実行して確認することが重要です。

```bash
$ bin/rspec
```

```
Finished in 2.61 seconds (files took 0.34742 seconds to load)
6 examples, 0 failures
```

すべてのテストが通っていることが確認できました。

## 変更をコミット

問題ないことを確認できたら、ここまでの変更をGitでコミットし、リモートリポジトリにプッシュしておきましょう。

```bash
$ git add .
$ git commit -m "User.nicknameのバリデーションを追加"
$ git push
```

## テストコードの全文

今回作成したテストコードの全文を参考として示します。

```ruby
require 'rails_helper'

describe User do
  let(:nickname) { 'テスト太郎' }
  let(:email) { 'test@example.com' }
  let(:password) { '12345678' }
  let(:user) { User.new(nickname: nickname, email: email, password: password, password_confirmation: password) }

  describe '.first' do
    before do
      create(:user, nickname: nickname, email: email)
    end

    subject { described_class.first }

    it '事前に作成した通りのUserを返す' do
      expect(subject.nickname).to eq('テスト太郎')
      expect(subject.email).to eq('test@example.com')
    end
  end

  describe 'validation' do
    describe 'nickname属性' do
      describe '文字数制限の検証' do
        context 'nicknameが20文字以下の場合' do
          let(:nickname) { 'あいうえおかきくけこさしすせそたちつてと' } # 20文字

          it 'User オブジェクトは有効である' do
            expect(user.valid?).to be(true)
          end
        end

        context 'nicknameが20文字を超える場合' do
          let(:nickname) { 'あいうえおかきくけこさしすせそたちつてとな' } # 21文字

          it 'User オブジェクトは無効である' do
            expect(user.valid?).to be(false)
            expect(user.errors[:nickname]).to include('is too long (maximum is 20 characters)')
          end
        end
      end

      describe '存在性の検証' do
        context 'nicknameが空欄の場合' do
          let(:nickname) { '' } # 空の文字列

          it 'User オブジェクトは無効である' do
            expect(user.valid?).to be(false)
            expect(user.errors[:nickname]).to include("can't be blank")
          end
        end
      end
    end
  end
end
```

## email / password のバリデーションについて

今回はnicknameに焦点を当てて、文字数と存在性のバリデーションを設定しましたが、emailやpasswordなどの他の属性についてはどうなのでしょうか？

実は、Deviseで自動的に生成されるカラム（email、passwordなど）については、すでに基本的なバリデーションが設定されています。例えば、emailの一意性や存在性、passwordの最小文字数などです。そのため、これらの基本的なバリデーションを自分で追加する必要はありません。

これは、Gemなどの外部ライブラリを使う際の一般的な原則です。ライブラリが提供する機能については、すでにライブラリ側でテストが行われていることを前提として、改めてテストを書く必要はないのです。言うなれば「他の人が書いたテストを信頼する」ということです。

このように開発においては、必要なことをゼロから全部自分で書くのではなく、信頼できるライブラリやフレームワークの機能を上手に活用していくことも大切です。

## まとめ

本章では、RSpecを使ってUserモデルのテストを作成し、テスト駆動開発の流れに沿ってバリデーションを実装しました。テスト駆動開発の「テストを書く→実装する→リファクタリングする」というサイクルを体験し、コードの品質を保証する方法を学びました。

また、FactoryBotを使ってテストデータを効率的に作成する方法や、バリデーションのテストと実装方法についても理解を深めました。これらの知識と技術は、今後の開発においても非常に役立つものです。

テスト駆動開発は最初は手間がかかるように感じるかもしれませんが、長期的には品質の高いコードを効率的に書くための強力な手法です。現場のエンジニアの間でも広く採用されているため、ぜひ習得しておきましょう。
