---
title: RSpec を導入して自動テストの準備をしよう
nextjs:
  metadata:
    title: RSpec を導入して自動テストの準備をしよう
    description: Ruby on Rails アプリケーションにテストフレームワーク RSpec を導入する方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [RSpec とは？](#rspec-とは)
- [RSpec のインストール](#rspec-のインストール)
- [RSpec の初期設定](#rspec-の初期設定)
  - [テスト結果の出力形式を調整する](#テスト結果の出力形式を調整する)
  - [不要なディレクトリの削除](#不要なディレクトリの削除)
  - [FactoryBot のインストール](#factorybot-のインストール)
  - [FactoryBot の設定](#factorybot-の設定)
  - [テスト起動の高速化 (Spring)](#テスト起動の高速化-spring)
- [変更内容のコミット](#変更内容のコミット)
- [Rubocop チェック](#rubocop-チェック)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- テストフレームワーク RSpec の概要と重要性を理解する
- Rails プロジェクトに RSpec を導入する方法を習得する
- FactoryBot を使ったテストデータ作成方法の基本を学ぶ
- テスト実行を高速化する Spring の設定方法を理解する
- RSpec の出力形式をカスタマイズして見やすくする方法を習得する

## はじめに

プログラミングにおいて、テストはコードの品質を保証する重要な要素です。適切なテストを書くことで、バグの早期発見や安全なリファクタリングが可能になります。今回は Rails でテストを書くための準備として、RSpec というテストフレームワークを導入していきましょう。

## RSpec とは？

RSpec は、Ruby や Rails で広く使われているテストフレームワークです。Ruby には標準で Minitest というテストライブラリが用意されていますが、RSpec は以下のような特徴を持っています。

- 自然言語に近い読みやすい文法
- 豊富なマッチャー（条件判定機能）
- モック・スタブなどのテストダブル機能が充実
- 拡張性が高く、さまざまなプラグインが利用可能

これらの特徴により、RSpec はより直感的にテストを読み書きできるフレームワークとして、多くの開発者に支持されています。テストコードを読みやすく書けることは、チーム開発でも大きなメリットとなります。

## RSpec のインストール

RSpec も他の gem と同様に、Gemfile に追記して `bundle install` コマンドでインストールします。Rails で使うための RSpec gem は、開発環境とテスト環境で使用するため、`development` と `test` の両方のグループに追加します。

Gemfile を開き、以下のように追記しましょう。

```ruby
group :development, :test do
  # ...略
  gem 'rspec-rails' # 追加
end
```

Gemfile への追記が完了したら、`bundle install` コマンドで gem をインストールします。

```bash
$ bundle install
Fetching gem metadata from https://rubygems.org/.........
Resolving dependencies...
Fetching diff-lcs 1.6.0
Fetching rspec-support 3.13.2
Installing diff-lcs 1.6.0
Installing rspec-support 3.13.2
Fetching rspec-mocks 3.13.2
Fetching rspec-expectations 3.13.3
Fetching rspec-core 3.13.3
Installing rspec-mocks 3.13.2
Installing rspec-expectations 3.13.3
Installing rspec-core 3.13.3
Fetching rspec-rails 7.1.1
Installing rspec-rails 7.1.1
Bundle complete! 27 Gemfile dependencies, 126 gems now installed.
Bundled gems are installed into `./.bundle`
```

`bundle install` が正常に完了したら、RSpec を動かすために必要なファイル群を `rails g` コマンドで作成します。

```bash
$ bundle exec rails g rspec:install
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

これで `rspec` コマンドから RSpec を実行できるようになります。試しにコマンドを実行してみましょう。

```bash
$ bundle exec rspec
No examples found.

Finished in 0.00056 seconds (files took 0.07792 seconds to load)
0 examples, 0 failures
```

現在はテストを作成していないので「0件のテスト（0 examples）を実行した」という表示になりますが、RSpec を使用する準備はできました。次は、より便利に使うための初期設定を進めていきましょう。

## RSpec の初期設定

RSpec をより効率的に使うために、いくつかの初期設定と便利な gem の導入を行います。

### テスト結果の出力形式を調整する

RSpec のテスト結果出力をより読みやすくするために、ドキュメント形式に変更しましょう。Rails プロジェクト（`./workspace/techlog-app`）の直下にある `.rspec` ファイルの最下段に、以下の行を追加します。

```
--format documentation
```

この設定により、テスト結果が階層的に表示され、どのテストが何をテストしているのかが分かりやすくなります。例えば、以下のような出力形式になります。

```
User
  creation
    with valid parameters
      creates a new user
    with invalid parameters
      does not create a user
  validation
    requires an email
```

このような形式で表示されることで、テストの全体像をつかみやすくなります。

### 不要なディレクトリの削除

Rails プロジェクトを `rails new` で作成した際、デフォルトで `/test` ディレクトリが作成されます。これは Minitest 用のディレクトリですが、RSpec を使うことにしたため不要になりました。以下のコマンドで削除しておきましょう。

```bash
$ rm -r test/
```

### FactoryBot のインストール

FactoryBot は、テストデータの作成を支援するライブラリです。RSpec と一緒によく使われています。テストでは実際のデータベースにデータを作成することがよくありますが、そのたびに複雑なデータを手作業で準備するのは面倒です。FactoryBot を使えば、簡単に一貫性のあるテストデータを作成できます。

例えば、以下のように1行で User モデルのテストデータを準備できます。

```ruby
# 記述例
user = FactoryBot.create(:user)
```

FactoryBot を Rails で使うには、`factory_bot_rails` という gem をインストールします。Gemfile の開発・テスト環境用のグループに追記しましょう。

```ruby
group :development, :test do
  ...
  gem 'factory_bot_rails' # 追加
end
```

Gemfile に追記できたら、`bundle install` を実行します。

```bash
$ bundle install
Fetching gem metadata from https://rubygems.org/.........
Resolving dependencies...
Fetching factory_bot 6.5.1
Installing factory_bot 6.5.1
Fetching factory_bot_rails 6.4.4
Installing factory_bot_rails 6.4.4
Bundle complete! 28 Gemfile dependencies, 128 gems now installed.
Bundled gems are installed into `./.bundle`
```

これで FactoryBot のインストールができました。FactoryBot を使うと、モデルごとに「ファクトリ」と呼ばれるテストデータの定義を作成できます。後ほどモデルを作成する際に詳しく説明しますが、`rails g factory_bot:model モデル名` というコマンドでファクトリを自動生成できます。

### FactoryBot の設定

FactoryBot をより便利に使うために、RSpec のテストコード内で FactoryBot のメソッドを使う際、モジュール名（`FactoryBot`）を省略できるようにしておきましょう。省略するには、`spec/rails_helper.rb` ファイルに以下の設定を追加します。

```ruby
# spec/rails_helper.rb

RSpec.configure do |config|
  # ...
  config.include FactoryBot::Syntax::Methods # ブロック内の最下段に追記
end
```

この設定により、テストコード内で次のように簡潔に書けるようになります。

```ruby
# Before (省略なし)
user = FactoryBot.create(:user)

# After (省略あり)
user = create(:user)
```

### テスト起動の高速化 (Spring)

テストを頻繁に実行する場合、起動時間を短縮できると効率的です。Spring は Rails アプリケーションをバックグラウンドで実行し続けることで、起動時間を短縮するツールです。RSpec と Spring を連携させるために、以下の gem を追加しましょう。

```ruby
# Gemfile
group :development do
  # ...
  gem 'spring-commands-rspec' # 追記
end
```

Gemfile に追記したら、`bundle install` を実行します。

```bash
$ bundle install
Fetching gem metadata from https://rubygems.org/.........
Resolving dependencies...
Fetching spring 4.2.1
Installing spring 4.2.1
Fetching spring-commands-rspec 1.0.4
Installing spring-commands-rspec 1.0.4
Bundle complete! 29 Gemfile dependencies, 130 gems now installed.
Bundled gems are installed into `./.bundle`
```

次に、Spring で RSpec を実行するためのバイナリファイルを生成します。

```bash
$ bundle exec spring binstub rspec
* bin/rspec: generated with Spring
```

これにより、`bin/rspec` というコマンドが生成されます。確認してみましょう。

```bash
$ ls bin/
brakeman                kamal                   setup
bundle                  rails                   spring
dev                     rake                    thrust
docker-entrypoint       rspec
importmap               rubocop
```

最後に、テスト環境で Spring がキャッシュをしないように設定します。`config/environments/test.rb` ファイルを開き、最後の `end` の直前に以下の設定を追加します。

```ruby
# config/environments/test.rb

  # Raise error when a before_action's only/except options reference missing actions.
  config.action_controller.raise_on_missing_callback_actions = true # 既存の記述

  config.cache_classes = false # 追記
end
```

これで Spring を使って RSpec を高速で起動する準備ができました。実際に使ってみましょう。Spring の恩恵を受けるには、`bundle exec rspec` ではなく `bin/rspec` コマンドでテストを実行します。

```bash
$ bin/rspec
Running via Spring preloader in process 37415
No examples found.

Finished in 0.00047 seconds (files took 0.10171 seconds to load)
0 examples, 0 failures
```

まだテストが0件なので、普通に実行した場合との違いはほとんど分かりませんが、テストが増えてきたら違いを実感できるでしょう。

## 変更内容のコミット

ここまでの初期設定をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "RSpecの初期設定を完了"
$ git push
```

## Rubocop チェック

設定ファイルの自動生成や追記を行ったので、Rubocop でコードの品質をチェックしておきましょう。

```bash
$ bundle exec rubocop
Inspecting 7 files
C....CC

Offenses:

Gemfile:54:3: C: [Correctable] Bundler/OrderedGems: Gems should be sorted in an alphabetical order within their section of the Gemfile. Gem rspec-rails should appear before rubocop-rails-omakase.
  gem 'rspec-rails'
  ^^^^^^^^^^^^^^^^^
Gemfile:55:3: C: [Correctable] Bundler/OrderedGems: Gems should be sorted in an alphabetical order within their section of the Gemfile. Gem factory_bot_rails should appear before rspec-rails.
  gem 'factory_bot_rails'
  ^^^^^^^^^^^^^^^^^^^^^^^
Gemfile:65:3: C: [Correctable] Bundler/OrderedGems: Gems should be sorted in an alphabetical order within their section of the Gemfile. Gem spring-commands-rspec should appear before web-console.
  gem 'spring-commands-rspec'
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^
spec/rails_helper.rb:6:7: C: [Correctable] Style/StringLiterals: Prefer single-quoted strings when you don't need string interpolation or special symbols.
abort("The Rails environment is running in production mode!") if Rails.env.production?
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
spec/spec_helper.rb:49:1: C: [Correctable] Style/BlockComments: Do not use block comments.
=begin ...
^^^^^^

7 files inspected, 5 offenses detected, 5 offenses autocorrectable
```

いくつかの指摘が出ました。それぞれ見ていきましょう。

1. **Bundler/OrderedGems**: Gemfile 内の gem はアルファベット順に並べるべきという指摘です。コードの動作には影響しませんが、可読性のために修正しておくと良いでしょう。

2. **Style/StringLiterals**: 二重引用符（`"`）ではなく単一引用符（`'`）を使うべきという指摘です。これは文字列内で変数展開や特殊文字を使わない場合に適用されるスタイルガイドラインです。

3. **Style/BlockComments**: ブロックコメント（`=begin`〜`=end`）は使わず、行コメント（`#`）を使うべきという指摘です。ブロックコメントは一見してコメントと分かりにくいため、避けるべきとされています。

これらはすべて自動修正可能な指摘なので、`-a` オプションを付けて修正しましょう。

```bash
$ bundle exec rubocop -a
```

修正が完了したら、変更をコミットしておきます。

```bash
$ git add .
$ git commit -m "Rubocop による指摘事項修正"
$ git push
```

## まとめ

本章では、Rails プロジェクトにテストフレームワーク RSpec を導入し、効率的にテストを書くための準備を整えました。具体的には以下の内容を学びました。

- RSpec のインストールと基本設定
- テスト結果の出力形式のカスタマイズ
- FactoryBot によるテストデータ作成の準備
- Spring を使ったテスト実行の高速化

テストは開発の重要な一部であり、コードの品質と信頼性を高めるために不可欠です。RSpec を使うことで、読みやすく保守しやすいテストを書くことができます。
