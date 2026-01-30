---
title: Ruby on Railsプロジェクトのセットアップ
nextjs:
  metadata:
    title: Ruby on Railsプロジェクトのセットアップ
    description: Ruby on RailsプロジェクトにRSpecを導入する方法を初心者向けに解説。Railsの新規プロジェクト作成から、RSpecのインストール、初期設定まで、実践的な手順を丁寧に説明します。
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [プロジェクトの初期化とRailsのインストール](#プロジェクトの初期化とrailsのインストール)
- [新しいRailsプロジェクトの作成](#新しいrailsプロジェクトの作成)
  - [Railsサーバーの動作確認](#railsサーバーの動作確認)
- [RSpecのインストール](#rspecのインストール)
- [RSpecの初期設定](#rspecの初期設定)
  - [.rspecファイル](#rspecファイル)
  - [specディレクトリ](#specディレクトリ)
  - [spec\_helper.rb](#spec_helperrb)
  - [rails\_helper.rb](#rails_helperrb)
- [.rspecファイルで設定を管理する](#rspecファイルで設定を管理する)
- [まとめ](#まとめ)

## 学習の目標

本章では、以下の内容を学習します。

- 新しいRailsプロジェクトの作成手順を理解する
- RSpecをRailsプロジェクトに導入する方法を習得する
- `.rspec`ファイルを使った設定管理について学ぶ
- RSpecの初期設定ファイルの役割を理解する
- プロジェクト全体で一貫したテスト環境を構築する方法を身につける

## はじめに

Webアプリケーションの開発において、しっかりとしたテスト環境を整えることは品質の高いソフトウェアを作るために欠かせません。特にRuby on Railsでは、アプリケーションが大きくなるにつれて、手動での動作確認が困難になっていきます。

そこで重要になるのが**自動テスト**です。RSpecは、Rubyで最も人気のあるテストフレームワークの一つで、読みやすく書きやすいテストコードを実現できます。

この章では、新しいRailsプロジェクトを一から作成し、RSpecを導入する手順を学んでいきます。Rubyがインストールされている状態から始めて、まずはRailsをインストールし、その後でRSpecをセットアップしていきましょう。

## プロジェクトの初期化とRailsのインストール

それでは実際に手を動かしながら、Railsプロジェクトを作成していきましょう。

まず最初に、プロジェクト用のディレクトリを作成し、そこでRubyの依存関係を管理するための準備をします。適当なディレクトリで以下のコマンドを実行してください。

```bash
bundle init
```

このコマンドを実行すると、現在のディレクトリに`Gemfile`というファイルが生成されます。`Gemfile`は、Rubyプロジェクトで使用するライブラリ（Gem）を管理するための重要なファイルです。

生成された`Gemfile`を開いてみると、以下のような内容になっているはずです。

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

# gem "rails"
```

よく見ると、`gem "rails"`という行がコメントアウトされていますね。この行の先頭にある`#`を削除して、Railsを有効にしましょう。

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

gem "rails"
```

ファイルを保存したら、次のコマンドでRailsをインストールします。

```bash
bundle install
```

このコマンドを実行すると、Railsとその依存関係にある多くのGemがインストールされます。初回のインストールでは少し時間がかかるかもしれませんが、コーヒーでも飲みながら待ちましょう。

インストールが完了すると、「Bundle complete!」というメッセージが表示されます。これでRailsを使う準備が整いました。

## 新しいRailsプロジェクトの作成

Railsがインストールできたら、いよいよ新しいプロジェクトを作成します。以下のコマンドを実行してください。

```bash
bundle exec rails new rspec-rails --skip-test
```

このコマンドについて、少し詳しく説明しましょう。

`bundle exec`は、現在のプロジェクトにインストールされたGemを使ってコマンドを実行するための指定です。`rails new`は新しいRailsプロジェクトを作成するコマンドで、`rspec-rails`はプロジェクト名です。

そして最後の`--skip-test`オプションが重要です。Railsには**MiniTest**というテストフレームワークがデフォルトで組み込まれていますが、私たちはRSpecを使いたいので、MiniTestのファイルは生成しないようにしています。

プロジェクトの作成が始まると、多くのファイルが生成される様子が表示されます。最後に以下のようなメッセージが表示されれば成功です。

```bash
Bundle complete! 1 Gemfile dependency, 61 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
```

### Railsサーバーの動作確認

プロジェクトが正しく作成されたか確認してみましょう。まず、作成されたプロジェクトディレクトリに移動します。

```bash
cd rspec-rails
```

次に、Railsサーバーを起動してみましょう。

```bash
bundle exec rails s
```

サーバーが起動したら、ブラウザで`http://127.0.0.1:3000`にアクセスしてください。Railsのウェルカムページが表示されれば、プロジェクトの作成は成功です。

確認できたら、ターミナルで`Ctrl + C`を押してサーバーを停止してください。

## RSpecのインストール

さて、ここからが本題です。作成したRailsプロジェクトにRSpecを追加していきましょう。

まず、プロジェクト内の`Gemfile`を開きます。このファイルには、すでに多くのGemが記載されていますが、その中から`group :development, :test do`というブロックを探してください。

このブロックは、開発環境とテスト環境でのみ使用するGemを指定する場所です。ここに`rspec-rails`を追加します。

```ruby
# Gemfile

group :development, :test do
  # 他の gem は省略
  gem 'rspec-rails'
end
```

`rspec-rails`は、RailsでRSpecを使うための橋渡しをしてくれるGemです。これがあることで、RailsのモデルやコントローラーなどをRSpecでテストできるようになります。

Gemfileを保存したら、以下のコマンドでインストールします。

```bash
bundle install
```

インストールが完了したら、RSpecが正しく動作するか確認してみましょう。

```bash
bundle exec rspec
```

以下のような出力が表示されれば、RSpecのインストールは成功です。

```bash
No examples found.

Finished in 0.00025 seconds (files took 0.12288 seconds to load)
0 examples, 0 failures
```

まだテストを書いていないので「No examples found」と表示されますが、これは正常な動作です。

## RSpecの初期設定

RSpecをRailsプロジェクトで使うためには、もう少し設定が必要です。以下のコマンドを実行して、RSpec用の設定ファイルを生成しましょう。

```bash
bundle exec rails generate rspec:install
```

このコマンドを実行すると、いくつかのファイルとディレクトリが生成されます。

```bash
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

それぞれのファイルについて説明しましょう。

### .rspecファイル

`.rspec`ファイルは、RSpecのコマンドライン設定を記述するファイルです。プロジェクト全体に適用される設定をここに書くことで、毎回コマンドでオプションを指定する必要がなくなります。

### specディレクトリ

`spec`ディレクトリは、これから書いていくテストファイルを格納する場所です。Railsのデフォルトでは`test`ディレクトリを使いますが、RSpecでは`spec`ディレクトリを使います。

### spec_helper.rb

`spec/spec_helper.rb`は、RSpec自体の設定を行うファイルです。テストの実行方法や出力形式など、RSpecの基本的な動作を制御します。

### rails_helper.rb

`spec/rails_helper.rb`は、RailsとRSpecを連携させるための設定ファイルです。Railsアプリケーションをテスト環境で動かすために必要な設定が含まれています。

## .rspecファイルで設定を管理する

最後に、`.rspec`ファイルを編集して、テスト結果の表示形式を見やすくしましょう。

`.rspec`ファイルを開くと、以下のような内容になっています。

```
--require spec_helper
```

ここに、`--format documentation`という行を追加してください。

```
--require spec_helper
--format documentation
```

この設定により、テストを実行したときの結果が、より詳細で読みやすい形式で表示されるようになります。デフォルトでは、テストが成功したか失敗したかを「.」や「F」で表示しますが、`documentation`形式では、各テストの説明文が表示されるため、どのテストが実行されたかが一目でわかります。

## まとめ

本章では、新しいRailsプロジェクトを作成し、RSpecを導入する手順を学びました。以下の内容を理解できたことと思います。

- `bundle init`を使ったプロジェクトの初期化方法
- Railsのインストールと新規プロジェクトの作成手順
- `--skip-test`オプションを使ってMiniTestをスキップする理由
- RSpecをGemfileに追加してインストールする方法
- `rails generate rspec:install`で生成される各ファイルの役割
- `.rspec`ファイルを使った設定管理の基本

これで、RailsプロジェクトでRSpecを使ったテスト開発を始める準備が整いました。次の章では、実際にモデルのテストを書きながら、RSpecの基本的な使い方を学んでいきましょう。
