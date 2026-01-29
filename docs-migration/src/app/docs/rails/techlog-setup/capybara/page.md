---
title: Capybara でユーザー操作を再現したテストをしよう
nextjs:
  metadata:
    title: Capybara でユーザー操作を再現したテストをしよう
    description: 統合テスト（System Spec）でユーザー操作を再現する方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [統合テストとは](#統合テストとは)
- [Capybara の基本メソッド](#capybara-の基本メソッド)
  - [visit メソッド](#visit-メソッド)
  - [click\_link メソッド](#click_link-メソッド)
  - [fill\_in メソッド](#fill_in-メソッド)
  - [click\_button メソッド](#click_button-メソッド)
  - [page オブジェクト](#page-オブジェクト)
  - [current\_path メソッド](#current_path-メソッド)
- [Home#top の統合テスト作成](#hometop-の統合テスト作成)
  - [System Spec ファイルの作成](#system-spec-ファイルの作成)
  - [System Spec ファイルの修正](#system-spec-ファイルの修正)
  - [テストの実行](#テストの実行)
- [Capybara のより高度な使い方](#capybara-のより高度な使い方)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- 統合テスト（System Spec）の概念と目的を理解する
- Capybara の基本的な使い方と主要メソッドを習得する
- ユーザー操作を再現するテストの書き方を学ぶ
- RSpec と Capybara を組み合わせた効果的なテスト作成方法を習得する
- 画面表示の検証方法を理解する

## はじめに

この章では、前回作成したトップページ（Home#top）の統合テストを作成します。単体テストとは異なり、統合テストではユーザーが実際にアプリケーションを操作する流れを再現し、システム全体が期待通りに動作することを確認します。

## 統合テストとは

**統合テスト**はアプリケーション全体がシステムとして期待通りに動くことを確かめるためのテストです。いわば、ユーザーが実際に操作するような流れを再現し、その結果を確認します。前回作成した request のテストのような「部分的な機能をチェック」する単体テストとは異なり、複数の機能が連携して動作することを検証します。

RSpec では統合テストのことを **System Spec** と呼びます。System Spec を実装するには **Capybara** という gem を使用します。Capybara は、ブラウザ操作をシミュレートするためのツールで、フォームへの入力やボタンのクリックなど、ユーザーの操作を再現できます。

Rails 5.0 以降であれば Capybara は最初からインストールされており、Gemfile を確認すると以下のような記述があるはずです。

```ruby
group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
```

特に追加の設定は必要ありません。

## Capybara の基本メソッド

Capybara には多くのメソッドが用意されていますが、よく使うものをいくつか紹介します。これらのメソッドを使いながら、実際のブラウザ操作をシミュレートしたテストを作成していきましょう。

### visit メソッド

`visit '遷移したいページのパス'` という形式で使用します。このメソッドは指定したURLのページに遷移する操作を行います。例えば `visit '/'` とすると、ルートパス（トップページ）に遷移します。

### click_link メソッド

`click_link 'リンク文字列'` という形式で使用します。このメソッドは指定したテキストを持つリンク（`<a>` タグ）をクリックする操作を行います。例えば、「詳細を見る」というリンクをクリックする場合は `click_link '詳細を見る'` と書きます。

### fill_in メソッド

`fill_in 'ラベル文字列', with: '入力したい文字列'` という形式で使用します。このメソッドはフォームの入力欄に文字列を入力する操作を行います。例えば、「メールアドレス」というラベルがついた入力欄に「user@example.com」と入力する場合は `fill_in 'メールアドレス', with: 'user@example.com'` と書きます。

### click_button メソッド

`click_button 'ボタン文字列'` という形式で使用します。このメソッドは指定したテキストを持つボタンをクリックする操作を行います。例えば、「送信」ボタンをクリックする場合は `click_button '送信'` と書きます。

### page オブジェクト

`visit` でアクセスした時に表示されるページの内容を取得するオブジェクトです。`expect(page).to have_content('文字列')` のような形で、ページに特定の文字列が含まれているかを確認できます。画面に表示される内容を検証する際に非常に便利です。

### current_path メソッド

現在のパスを取得するメソッドです。例えば、ログイン後にトップページにリダイレクトされたことを確認する場合に使用します。`expect(current_path).to eq('/')` のように書くことで、現在表示されているページが期待するパスであるかを確認できます。

## Home#top の統合テスト作成

それでは実際に Home#top（トップページ）の統合テストを作成してみましょう。まだフォームやボタンは用意していないので、ページにアクセスした時に期待した文字列が表示されることだけを確認します。

### System Spec ファイルの作成

統合テスト（System Spec）ファイルは `rails g rspec:system コントローラ名` コマンドで生成できます。コントローラ名は `home_controller.rb` の場合、`home` となります。

```bash
$ bin/rails g rspec:system home
      create  spec/system/homes_spec.rb
```

生成されたファイル名が `homes_spec.rb` となっていますが、コントローラ名と統一するために `home_spec.rb` にリネームしておきましょう。

```bash
$ mv spec/system/homes_spec.rb spec/system/home_spec.rb
```

生成されたファイルの内容を確認してみましょう。

```ruby
require 'rails_helper'

RSpec.describe "Homes", type: :system do
  before do
    driven_by(:rack_test)
  end

  pending "add some scenarios (or delete) #{__FILE__}"
end
```

ファイル内に二重引用符（`"`）が含まれているので、Rubocop の自動修正で直しておきます。

```bash
$ bundle exec rubocop -a
```

現在、テストは `pending` となっているので実行されません。試しにこのファイルだけテストを実行してみましょう。

```bash
$ bin/rspec spec/system/home_spec.rb
...
Pending: (Failures listed here are expected and do not affect your suite's status)
  1) Homes add some scenarios (or delete) .../spec/system/home_spec.rb
     # Not yet implemented
     # ./spec/system/home_spec.rb:8

Finished in 0.00121 seconds (files took 0.36953 seconds to load)
1 example, 0 failures, 1 pending
```

`pending` と書かれたテストは実行されず、「保留中」として扱われます。これは、テストの実装予定がある場合や、一時的にテストを無効にしたい場合に便利です。

### System Spec ファイルの修正

では、Home#top の最低限のテストを作成しましょう。テストする内容は以下の通りです。

1. `/`（トップページ）にアクセスする
2. ブラウザでアクセスした時と同じく `Home#top` という文字列が表示される

`spec/system/home_spec.rb` を次のように修正します。

```ruby
require 'rails_helper'

RSpec.describe 'Home', type: :system do
  before do
    driven_by(:rack_test)
  end

  describe 'トップページの検証' do
    it 'Home#top という文字列が表示される' do
      visit '/'
      expect(page).to have_content('Home#top')
    end
  end
end
```

この System Spec の内容を詳しく見ていきましょう。

まず、`driven_by(:rack_test)` はテスト実行時に使用するドライバを指定しています。`:rack_test` は高速に動作する特徴がありますが、JavaScript を実行することができません。もし JavaScript の機能をテストする必要がある場合は、`:selenium_chrome` や `:selenium_chrome_headless` などの別のドライバを使用します。

次に、`visit '/'` はルートパス（`/`）にアクセスするためのコマンドです。これは実際のブラウザでトップページを開く操作に相当します。ユーザーがURLを入力してページを訪れる動作をシミュレートしています。

最後に、`expect(page).to have_content('Home#top')` は表示されたページに「Home#top」という文字列が含まれているかを検証しています。これにより、正しいページが表示されていることを確認できます。

### テストの実行

それでは System Spec を実行してみましょう。編集したテストのみを実行するには、ファイル名を指定します。

```bash
$ bin/rspec spec/system/home_spec.rb
Running via Spring preloader in process 43993
Home
  トップページの検証
    Home#top という文字列が表示される

Finished in 0.08754 seconds (files took 0.14424 seconds to load)
1 example, 0 failures
```

`0 failures` という表示は、テストが全て成功したことを意味します。今回はシンプルなテストでしたが、今後はフォームへの入力やボタンのクリック、データベースの変更確認など、より複雑なテストも作成していきます。

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "トップページの統合テストを追加"
```

## Capybara のより高度な使い方

本カリキュラムで使用するのは Capybara のごく一部の機能ですが、実際の開発ではさらに多くの機能が役立ちます。

Capybara を使うと、JavaScriptを使った動的な要素のテストや、複数のウィンドウやタブを扱うテスト、ドラッグ＆ドロップやファイルアップロードのテストなども可能です。また、ページ内の特定の要素に対するアクション（マウスオーバーなど）や、非表示要素や特定の属性を持つ要素の検索なども行えます。

これらの高度な機能は、より複雑なアプリケーションのテストを書く際に非常に役立ちます。本カリキュラムでは基本的な機能のみを使用しますが、興味のある方は公式ドキュメントやオンラインの記事を参考にして、より深く学んでみることをおすすめします。

参考リンク：
- [使える RSpec 入門・その4「どんなブラウザ操作も自由自在！逆引き Capybara 大辞典」](https://qiita.com/jnchito/items/607f956263c38a5fec24)

## まとめ

本章では、統合テスト（System Spec）とそのために使用する Capybara について学びました。統合テストはユーザーの操作を再現し、システム全体の動作を検証するための重要なテスト手法です。

Capybara を使うことで、ブラウザでの操作をプログラムから再現できるようになり、「ページにアクセスする」「リンクをクリックする」「フォームに入力する」「ボタンを押す」といったユーザーの行動を自動化してテストできます。これにより、アプリケーションが実際のユーザー操作に対して期待通りに動作することを確認できます。

今回は基本的なテストのみでしたが、Capybara の知識は今後の開発で、フォーム入力やボタンクリック、ページ遷移など、より複雑なユーザー操作をテストする際に活用できます。
