---
title: TechLog アプリの初期設定をしよう
nextjs:
  metadata:
    title: TechLog アプリの初期設定をしよう
    description: Rails アプリケーションの作成から Tailwind CSS の設定まで、TechLog アプリの初期設定を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Rails プロジェクトの作成](#rails-プロジェクトの作成)
- [Rails プロジェクトの gem インストール](#rails-プロジェクトの-gem-インストール)
- [Import maps のインストール](#import-maps-のインストール)
- [Tailwind CSS のインストール](#tailwind-css-のインストール)
- [動作確認 (Rails サーバの起動)](#動作確認-rails-サーバの起動)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Rails プロジェクトを新規作成する方法を習得する
- プロジェクトに必要な gem をインストールする手順を学ぶ
- Import maps の概念と設定方法を理解する
- Tailwind CSS を Rails アプリに導入する方法を習得する
- Rails サーバを起動して動作確認を行う方法を学ぶ

## はじめに

この章では、TechLog という学習記録アプリの土台となる Rails アプリケーションを作成していきます。Rails プロジェクトの作成から、現代的な CSS フレームワークである Tailwind CSS の導入まで、アプリケーション開発の初期設定を行います。

これから作成する TechLog アプリは、プログラミング学習の記録を残すためのアプリケーションです。このアプリを作りながら、実践的な Rails の知識を身につけていきましょう。

## Rails プロジェクトの作成

Rails で新しいプロジェクト（各種ファイル一式）を作成するには `rails new` コマンドを使用します。前章で作成した workspace ディレクトリで実行しましょう。

アプリケーションの名前は TechLog ですが、ディレクトリ名としては `techlog-app` と指定します。また、CSS フレームワークとして Tailwind CSS を使用するため、`--css tailwind` というオプションを付けます。

```bash
$ bundle exec rails new techlog-app --css tailwind
      create
      create  README.md
      create  Rakefile
      ...
Using bootsnap 1.12.0
Bundle complete! 16 Gemfile dependencies, 75 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
```

このコマンドを実行すると、多くのファイルが生成され、必要な gem がインストールされます。最後に「Bundle complete!」というメッセージが表示されていれば、プロジェクトの作成は成功です。

## Rails プロジェクトの gem インストール

Rails プロジェクトが作成できたら、作成されたディレクトリに移動しましょう。現在のディレクトリは workspace なので、techlog-app ディレクトリに移動します。

```bash
$ cd techlog-app/
```

次に、Rails プロジェクトを動かすために必須となる gem のインストールを行います。必要な gem は `rails new` した時に自動生成された Gemfile に記述されているので、前章と同じ手順で `bundle install` を実行します。

バージョンによっては不要な手順かもしれませんが、余計なエラーを避けるため、念のため実行しておきましょう。

```bash
$ bundle config set path '.bundle'
$ bundle install
Bundle complete! 22 Gemfile dependencies, 119 gems now installed.
Bundled gems are installed into `./.bundle`
```

「Bundle complete!」を含むメッセージが表示されていれば、gem のインストールは完了です。

## Import maps のインストール

Rails 7 から JavaScript モジュールを管理する方法として **Import maps** が標準となりました。これは JavaScript ファイルをバンドル（まとめる）せずに、必要なモジュールを直接ブラウザにロードする仕組みです。

本カリキュラムでは JavaScript を多く実装するわけではないため、今の時点では詳しく知らなくても問題ありませんが、興味がある方は参考サイトもあわせて読んでみてください。

参考：Rails 7.0 で標準になった importmap-rails とは何なのか？

Import maps を Rails アプリにインストールするには `rails importmap:install` コマンドを使います。techlog-app ディレクトリ内で次のコマンドを実行しましょう。

```bash
$ bundle exec rails importmap:install
Add Importmap include tags in application layout
      insert  app/views/layouts/application.html.erb
Create application.js module as entrypoint
      create  app/javascript/application.js
Use vendor/javascript for downloaded pins
      create  vendor/javascript
      create  vendor/javascript/.keep
Ensure JavaScript files are in the Sprocket manifest
      append  app/assets/config/manifest.js
Configure importmap paths in config/importmap.rb
      create  config/importmap.rb
Copying binstub
      create  bin/importmap
```

各ファイルが作成され、特にエラーが出ていなければインストールは成功です。

## Tailwind CSS のインストール

続いて **Tailwind CSS** を Rails アプリにインストールします。Tailwind CSS は、クラス名を組み合わせてデザインを構築するユーティリティファーストの CSS フレームワークです。

Rails 7 以降では Tailwind CSS も標準的なオプションとなっており、専用のコマンドでインストールできます。

```bash
$ bundle exec rails tailwindcss:install
...
Run `gem update --system 3.6.5` to update your installation.

  Add bin/dev to start foreman
       force    bin/dev
  Compile initial Tailwind build
         run    rails tailwindcss:build from "."
≈ tailwindcss v4.0.9

Done in 50ms
         run  bundle install --quiet
```

各ファイルが作成され、「Done」と表示されていれば、Tailwind CSS のインストールは完了です。

## 動作確認 (Rails サーバの起動)

ここまで準備ができたら、最後に Rails サーバを起動して動作確認をしましょう。

通常は `rails s` というコマンドを使用して Rails サーバを起動しますが、Tailwind CSS を使用する場合は `bin/dev` というコマンドを使用します。これは Tailwind CSS のビルドプロセスと Rails サーバを同時に起動するためのコマンドです。

```bash
$ bin/dev
09:34:32 web.1  | started with pid 34420
09:34:32 css.1  | started with pid 34421
09:34:33 web.1  | => Booting Puma
09:34:33 web.1  | => Rails 8.0.1 application starting in development
09:34:33 web.1  | => Run `bin/rails server --help` for more startup options
09:34:33 web.1  | Puma starting in single mode...
09:34:33 web.1  | * Puma version: 6.6.0 ("Return to Forever")
09:34:33 web.1  | * Ruby version: ruby 3.2.2 (2023-03-30 revision e51014f9c0) [arm64-darwin21]
09:34:33 web.1  | *  Min threads: 3
09:34:33 web.1  | *  Max threads: 3
09:34:33 web.1  | *  Environment: development
09:34:33 web.1  | *          PID: 34420
09:34:33 web.1  | * Listening on http://127.0.0.1:3000
09:34:33 web.1  | * Listening on http://[::1]:3000
09:34:33 web.1  | Use Ctrl-C to stop
09:34:34 css.1  | ≈ tailwindcss v4.0.9
09:34:34 css.1  |
09:34:34 css.1  | Done in 92ms
```

上記のようなメッセージが表示されたら、ブラウザで `http://127.0.0.1:3000/` にアクセスします。

![Rails デフォルトページ](/img/rails/rails-default-welcome.png)

Rails のデフォルトページが表示されれば、正常に動作しています。確認が終わったら `Ctrl + C` を押して、Rails サーバを停止させておきましょう。

## まとめ

本章では、TechLog アプリの初期設定として以下の作業を行いました。

- `rails new` コマンドによる Rails プロジェクトの作成
- 必要な gem のインストール
- Import maps の設定
- Tailwind CSS のインストール
- Rails サーバの起動と動作確認

これで TechLog アプリの基本的な土台ができました。次の章からは、このアプリに機能を追加していきます。
