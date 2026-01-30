---
title: 不要ファイルが生成されないように設定しよう
nextjs:
  metadata:
    title: 不要ファイルが生成されないように設定しよう
    description: Rails のファイル自動生成機能をカスタマイズして開発効率を高める方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Rails の自動生成ファイルについて](#rails-の自動生成ファイルについて)
- [config.generators の設定](#configgenerators-の設定)
  - [設定の詳細解説](#設定の詳細解説)
- [設定変更の効果](#設定変更の効果)
- [変更をコミットする](#変更をコミットする)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Rails における自動生成ファイルの目的と役割を理解する
- 不要なファイルが自動生成されるのを防ぐ設定方法を習得する
- 自動生成の設定をカスタマイズしてプロジェクトに合わせる方法を学ぶ
- RSpec をデフォルトのテストフレームワークとして設定する方法を習得する
- Rails アプリケーションの設定ファイルの役割と構造を理解する

## はじめに

Rails の大きな強みの一つに、開発効率の高さがあります。その効率を支える機能の一つが `rails generate` コマンドによるファイルの自動生成です。このコマンドを使うことで、コントローラやモデルなど、アプリケーションの動作に必要なファイルを素早く作成できます。

しかし、デフォルトの設定では必要以上にファイルが生成されることがあり、プロジェクトの規模が大きくなるにつれて管理が煩雑になる可能性があります。この章では、自動生成される不要なファイルを制限する方法を学び、より効率的な開発環境を整えていきましょう。

## Rails の自動生成ファイルについて

Rails では `rails generate` コマンド（略して `rails g`）を使って、さまざまなファイルを自動生成できます。例えば、以下のようなコマンドがよく使われます。

- `rails g controller Users` - ユーザー関連のコントローラを生成
- `rails g model User` - ユーザーモデルを生成
- `rails g scaffold Product` - 商品関連の一連のファイル（モデル、コントローラ、ビューなど）を生成

これらのコマンドを実行すると、Rails はアプリケーションに必要なファイルを自動的に作成してくれます。しかし、デフォルトでは以下のような「場合によっては不要」なファイルも一緒に生成されます。

1. **CSS/JavaScript ファイル** - フロントエンドのスタイリングやインタラクションのためのファイル。別のフレームワーク（例：Tailwind CSS）を使う場合は不要になることがあります。

2. **ヘルパーファイル** - ビューで使うヘルパーメソッドを定義するファイル。小〜中規模のアプリケーションでは使われないことが多いです。

3. **Rails デフォルトのテストファイル** - Rails のデフォルトテストフレームワークである Minitest のファイル。RSpec などの別のテストフレームワークを使う場合は不要です。

これらのファイルが不要な場合、一々削除するのは面倒です。そこで、Rails の設定をカスタマイズして、必要なファイルだけが生成されるようにします。

## config.generators の設定

Rails の自動生成機能をカスタマイズするには、`config/application.rb` ファイルを編集します。このファイルは Rails アプリケーション全体の設定を管理する重要なファイルです。

まずは、`config/application.rb` ファイルを開いてみましょう。デフォルトでは、次のような内容になっているはずです。

```ruby
require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TechlogApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
```

このファイルには多くのコメントが含まれています。見通しをよくするために、これらのコメントを削除してシンプルにしてみましょう。

```ruby
require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module TechlogApp
  class Application < Rails::Application
    config.load_defaults 8.0
    config.autoload_lib(ignore: %w[assets tasks])
  end
end
```

これでだいぶすっきりしました。次に、`class Application` 内に `config.generators` の設定を追加します。これにより、自動生成機能の挙動をカスタマイズできます。

```ruby
require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module TechlogApp
  class Application < Rails::Application
    config.load_defaults 8.0
    config.autoload_lib(ignore: %w[assets tasks])

    config.generators do |g| # ここから追記
      g.assets false          # CSS, JavaScriptファイルを自動生成しない
      g.helper false          # helperファイルを自動生成しない
      g.test_framework :rspec # テストフレームワークをrspecに設定
    end  # ここまで追記
  end
end
```

この設定によって、次のようなカスタマイズが適用されます。

### 設定の詳細解説

1. `g.assets false`
   - CSS や JavaScript ファイルが自動生成されなくなります。
   - たとえば `rails g controller Users` を実行しても、`app/assets/stylesheets/users.css` や `app/assets/javascripts/users.js` が生成されません。
   - 現代の Rails 開発では、JavaScript フレームワーク（React, Vue.js など）や CSS フレームワーク（Tailwind CSS など）を別途使うことが多いため、この設定は効率的です。

2. `g.helper false`
   - ヘルパーファイルが自動生成されなくなります。
   - たとえば `rails g controller Users` を実行しても、`app/helpers/users_helper.rb` が生成されません。
   - ヘルパーは必要に応じて手動で作成することができます。小規模なアプリケーションではヘルパーを使わないことも多いです。

3. `g.test_framework :rspec`
   - デフォルトのテストフレームワークを RSpec に設定します。
   - これにより、`rails g model User` などを実行したときに、Minitest ではなく RSpec 形式のテストファイルが生成されます。
   - RSpec は Ruby/Rails で広く使われているテストフレームワークで、より表現力が高く、読みやすいテストを書くことができます。

これらの設定は、プロジェクトの要件に応じて自由にカスタマイズできます。例えば、特定のタイプのファイルだけを生成したい場合や、ファイル名の規則を変更したい場合などにも対応できます。

## 設定変更の効果

この設定変更によって、`rails generate` コマンドを実行した際に生成されるファイルが変わります。例えば、コントローラを生成する場合：

**変更前（デフォルト設定）:**
```bash
$ rails g controller Users index show
      create  app/controllers/users_controller.rb
      route  get 'users/index'
get 'users/show'
      invoke  erb
      create    app/views/users/index.html.erb
      create    app/views/users/show.html.erb
      invoke  test_unit
      create    test/controllers/users_controller_test.rb
      invoke  helper
      create    app/helpers/users_helper.rb
      invoke    test_unit
      invoke  assets
      invoke    scss
      create      app/assets/stylesheets/users.scss
```

**変更後:**
```bash
$ rails g controller Users index show
      create  app/controllers/users_controller.rb
      route  get 'users/index'
get 'users/show'
      invoke  erb
      create    app/views/users/index.html.erb
      create    app/views/users/show.html.erb
      invoke  rspec
      create    spec/controllers/users_controller_spec.rb
```

変更後は、ヘルパーファイルや CSS ファイルが生成されず、テストファイルも RSpec 形式で生成されるようになります。これにより、プロジェクトの構造がすっきりし、必要なファイルにのみ集中できるようになります。

## 変更をコミットする

設定の変更が完了したら、これまでの変更をコミットしてリモートリポジトリに反映させましょう。

```bash
$ git add .
$ git commit -m "rails generate時に不要なファイルが自動生成されないように設定"
$ git push
```

## まとめ

本章では、Rails の自動生成機能をカスタマイズする方法を学びました。

- `config/application.rb` ファイルを編集して自動生成の設定を変更できる
- `config.generators` を使って不要なファイルの生成を抑制できる
- CSS/JavaScript ファイル、ヘルパーファイルの生成を制御できる
- デフォルトのテストフレームワークを RSpec に変更できる

この設定によって、プロジェクトの構造がシンプルになり、開発効率が向上します。また、必要に応じて生成されるファイルをさらに細かく制御することも可能です。

Rails の自動生成機能は非常に便利ですが、プロジェクトの要件に合わせてカスタマイズすることで、より効率的な開発環境を整えることができます。これは実際の開発現場でも広く行われている実践的なテクニックです。
