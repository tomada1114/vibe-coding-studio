---
title: RenderとNeonを使って無料でデプロイしよう
nextjs:
  metadata:
    title: RenderとNeonを使って無料でデプロイしよう
    description: Ruby on Rails アプリケーションを Render.com にデプロイする方法を解説します。実際にデプロイしたアプリケーションは以下の URL からアクセスできます。
---

- [RenderとNeonを使って無料でデプロイしよう](#renderとneonを使って無料でデプロイしよう)
  - [Gemfile を書き換えて postgres に対応させる](#gemfile-を書き換えて-postgres-に対応させる)
  - [config/database.yml を書き換える](#configdatabaseyml-を書き換える)
  - [Neon アカウント作成](#neon-アカウント作成)
  - [データベースプロジェクトの作成](#データベースプロジェクトの作成)
  - [Render.com アカウント作成](#rendercom-アカウント作成)
  - [Web Service作成](#web-service作成)
  - [デプロイの設定](#デプロイの設定)
  - [Build Command の設定](#build-command-の設定)
  - [環境変数の設定（データベースの接続情報）](#環境変数の設定データベースの接続情報)
  - [環境変数の設定（SECRET\_KEY\_BASE）](#環境変数の設定secret_key_base)
  - [デプロイ](#デプロイ)
  - [【よくある質問】Rails アプリに変更を加えたらどうやって反映する？](#よくある質問rails-アプリに変更を加えたらどうやって反映する)
  - [【よくある質問】デプロイに失敗した場合は？](#よくある質問デプロイに失敗した場合は)
  - [【よくある質問】デプロイは出来たけどアプリにエラーが出たら？](#よくある質問デプロイは出来たけどアプリにエラーが出たら)
  - [Render.com と Neon での無料プランについて注意点](#rendercom-と-neon-での無料プランについて注意点)


## RenderとNeonを使って無料でデプロイしよう

今回は、Ruby on Rails アプリケーションを Render.com というサービスを使ってデプロイする方法を解説します。

### Gemfile を書き換えて postgres に対応させる

まずは、Rails アプリケーションの Gemfile を書き換えて、PostgreSQL に対応させましょう。

デフォルトでは `SQLite3` というデータベースが使われていますが、Render.com では `PostgreSQL` が使われているため、Gemfile を書き換える必要があります。

Gemfile を開いて、以下の3行を末尾に追加します。

```ruby
group :production do
  gem 'pg'
end
```

これで、本番環境では `pg` という Gem が使われ、`PostgreSQL` が使われるようになります。

なお、`group :production do` という記述は、本番環境でのみ有効になる設定を書くための記述です。

また、元々使っていた `sqlite3` は、開発環境とテスト環境でだけ使われるようになります。

そのため、上の方に書かれていた `gem 'sqlite3'` は、`group :development, :test do` という記述の中に移動させてください。

（バージョン情報は一例ですので、元々の記述をそのまま移動させてください）

```ruby
# gem 'sqlite3', '>= 2.1' 削除

# ...略

group :development, :test do
  # ...略
  gem 'sqlite3', '>= 2.1'
end
```

では、Gemfile を書き換えたら、以下のコマンドを実行してください。

```bash
bundle install
```

ここまでで変更を一度コミットしておきましょう。

```bash
$ git add .
$ git commit -m "PostgreSQL を使うための設定"
$ git push origin main
```

ちなみに、`sqlite3` は本来のデータベースの設定に戻すため、以下のように書き換えておきましょう。

```ruby
group :development, :test do
  gem 'sqlite3'
end
```

### config/database.yml を書き換える

次に、`config/database.yml` を書き換えましょう。

このファイルは、データベースの接続情報を記述するファイルです。

ただし、データベースの接続情報をソースコード内に直接書くことはセキュリティ上のリスクがあるため、環境変数として設定します。

環境変数とは、アプリケーションが動作するサーバに設定される変数のことです。これにより、アプリケーションのコードからは環境変数を参照することで、データベースの接続情報を取得することができます。

`production:` という欄を一度全て消し、以下のように書き換えてください。

```yaml
production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %>
```

これで、本番環境では `DATABASE_URL` という環境変数を使ってデータベースに接続するようになります。

では、変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "データベースの接続情報を環境変数に設定"
$ git push origin main
```

これでソースコード側の準備は完了です。

では次に、Neon でデータベースを作成し、Render.com に接続情報を設定していきましょう。

### Neon アカウント作成

Neon というデータベース管理サービスを使って、データベースを作成します。

無料プランでデータベースを作成することができますので、こちらを利用します。

[https://neon.tech/](https://neon.tech/) にアクセスし、アカウントを作成します。

右上の **[Sign Up]** を選択します。

![Neonサインアップページ](/img/rails/neon-signup-page.png)

GitHub アカウントなどで登録しましょう。メールアドレスとパスワードで登録しても大丈夫です。

### データベースプロジェクトの作成

アカウント登録が完了するとダッシュボードに遷移するので、**[Create project]** を選択します。

![Neonダッシュボード](/img/rails/neon-dashboard-create-project.png)

すると、データベースに関する設定を求められるので、以下のように設定します。

- **Project name**: techlog-db
- **PostgreSQL version**: デフォルトのまま
- **Database name**: techlog-db
- **Cloud Service Provider**: AWS
- **Region**: AWS Asia Pacific 1 (Singapore)

![Neonプロジェクト設定](/img/rails/neon-project-settings.png)

設定できたら **[Create]** を選択します。
すると、データベースが作成されます。

次は、このデータベースに Render.com から接続するための URL を入手しましょう。画面右上の **[Connect]** を選択します。

![Neon接続ボタン](/img/rails/neon-connect-button.png)

すると、データベースに接続するための情報が表示されます。`Connection string` という欄には、一部マスクされた URL が表示されています。**[Copy snippet]** を選択すると、クリップボードにコピーされ、貼り付けられる状態になります。

![Neon接続情報](/img/rails/neon-connection-string.png)

コピーできたので、メモ帳などに貼り付けてメモしておきましょう。これを、後ほど Render.com に設定するための環境変数として使います。

### Render.com アカウント作成

ではまず、Render.com にアカウントを作成しましょう。

[https://dashboard.render.com/register](https://dashboard.render.com/register) にアクセスします。

Render.com は、無料でアプリケーションをデプロイできるサービスです。GitHub と連携して、簡単にデプロイすることができます。

また、Render.com では、GitHub アカウントを使って登録することができます。

GitHub アカウントで登録すると、GitHub リポジトリと Render.com をスムーズに連携させることができるので、GitHub アカウントで登録することをおすすめします。

![Renderアカウント作成](/img/rails/render-signup-page.png)

### Web Service作成

では、Render.com で Web Service を作成しましょう。

今から作る Web Service というのは、Ruby on Rails アプリケーションを動かすためのサーバです。ダッシュボード右上から **[+ New]** > **[Web Service]** を選択します。

![Render Web Service作成](/img/rails/render-new-web-service.png)

次に、デプロイしたい GitHub リポジトリと Render.com を連携させます。今回は **[Git Provider]** > **[techlog-app]** リポジトリを選択すると、自動的に連携されます。

![Renderリポジトリ連携](/img/rails/render-connect-repository.png)

なお、GitHub アカウント以外で Render.com アカウントを登録した場合は、追加の認証が必要になりますので、画面の指示にしたがって認証を進めてください。

### デプロイの設定

では、デプロイの設定を行いましょう。デプロイとは、アプリケーションをサーバにアップロードして、公開することです。

たまに項目名などが変わる可能性もありますが、以下のように設定します。

- **Name**: techlog-app（デフォルトのまま）
- **Language**: Ruby
- **Branch**: main（デフォルトのまま）
- **Region**: Singapore
- **Instance Type**: Free

![Renderデプロイ設定](/img/rails/render-deploy-settings1.png)

![Renderデプロイ設定](/img/rails/render-deploy-settings2.png)

ここで、Instance Type は、無料プランを選択しています。無料プランは、誰も使っていないときにアプリを一時停止するため、アクセスするときに少し待たされることがあります。そのため、少しでもポートフォリオとしてのイメージを高めたい場合は、有料プランを選択することをおすすめします。

### Build Command の設定

また、デプロイの設定を行う画面の下部には、Build Command という項目があります。

![Render Build Command](/img/rails/render-build-command.png)

デフォルトでは、以下のようになっているかと思います。

```bash
bundle install; bundle exec rake assets:precompile; bundle exec rake assets:clean;
```

これだけですとマイグレーション、つまりテーブルの作成・変更が行われません。**[Build Command]** > **[Edit]** を押して編集モードにしつつ、**末尾**に以下を**追加**してください。

（注意：元々書かれているコマンドは残したまま、追加だけしてください。）

```bash
bundle exec rails db:create RAILS_ENV=production; bundle exec rails db:schema:load RAILS_ENV=production;bundle exec rails db:migrate RAILS_ENV=production;
```

少し長いですが、全体としては以下のようになっているはずです。

```bash
bundle install; bundle exec rake assets:precompile; bundle exec rake assets:clean; bundle exec rails db:create RAILS_ENV=production; bundle exec rails db:schema:load RAILS_ENV=production;bundle exec rails db:migrate RAILS_ENV=production;
```

### 環境変数の設定（データベースの接続情報）

では次に、Render.com にデータベースの接続情報を設定しましょう。

先ほど、Neon から **[Copy snippet]** でコピーした情報を使います。

Render.com のダッシュボード上では、左側のメニューから **[Environment Variables]** を選択します。そして **[Environment Variables]** > **[+ Add Environment Variable]** と選択し、`DATABASE_URL` という名前で、先ほど Neon でコピーした文字列（`postgresql://techlog-db_xxxx...`) を
貼り付けます。

（右側のマスクされている部分に入力しています。）

![Render環境変数設定](/img/rails/render-environment-variables.png)

なお、元々あった`RAILS_MASTER_KEY` という1行は今回は使いませんので、右側のゴミ箱アイコンをクリックして削除してください。

### 環境変数の設定（SECRET_KEY_BASE）

次に、`SECRET_KEY_BASE` という環境変数を設定します。

この環境変数は、Rails アプリケーションがセッション情報（ログイン情報）を暗号化するために必要なキーです。ローカルで Rails プロジェクトをターミナルで開き、以下のコマンドを実行してください。

```bash
bin/rails secret
```

値が表示されますので、それをコピーしてください。

そして **[Environment Variables]** > **[+ Add Environment Variable]** を選択し、`SECRET_KEY_BASE` という名前で、先ほどコピーした値を貼り付けます。

![Render SECRET_KEY_BASE設定](/img/rails/render-secret-key-base.png)

これで、環境変数の設定は完了です。

### デプロイ

では、設定が完了したら、デプロイを行いましょう。画面を下までスクロール **[Deploy Web Service]** というボタンを押してください。

すると、最新のコミットに基づきデプロイがはじまります。

![Renderデプロイ開始](/img/rails/render-deploy-start.png)

デプロイ時のログが表示されますので、しばらく待ちましょう。この時、エラーが出た場合は、ログを確認して原因を特定します。しばらくするとデプロイが完了しますので、上の方に表示されているURLからアクセスできます。

以下のような形式のURLです。

https://techlog-app-xxxx.onrender.com

![Renderデプロイ完了](/img/rails/render-deploy-complete.png)

このURLを転職先などに伝えれば、ご自身のポートフォリオとして公開することができます。お疲れ様でした！

### 【よくある質問】Rails アプリに変更を加えたらどうやって反映する？

コミットして GitHub にプッシュすると、Render.com で自動的にデプロイが走りますので、特に何もする必要はありません。

デプロイ状況は、ダッシュボードの **[Events]** から状況が見られます。

![Renderイベント確認](/img/rails/render-events-check.png)

デプロイが成功していたら、以下のように表示されます。

![Renderデプロイ成功](/img/rails/render-deploy-success.png)



### 【よくある質問】デプロイに失敗した場合は？

**[Events]** からデプロイ時のログを見られるので、確認してみましょう。

理由は多種多様なのでエラーメッセージを特定するしかありませんが、Google 検索したり、ChatGPT に聞くことで解決を目指しましょう。まずは、環境変数の設定漏れや、データベース接続情報の入力ミスなどから確認してみてください。

### 【よくある質問】デプロイは出来たけどアプリにエラーが出たら？

画面左側の **[MONITOR]** > **[Logs]** から、アプリのログを見てみましょう。

ターミナルで `rails s` または `bin/dev` コマンドでサーバを動かしていたときと同じように、ログが表示されます。
ここにエラーメッセージが表示されているはずですので、エラーの内容を確認してみましょう。

環境変数などに問題がなければ、エラーの原因はアプリケーションのコードにある可能性が高いです。その場合は、ローカル（パソコン）上でエラーが再現するかどうかを確認し、原因を特定して修正しましょう。

### Render.com と Neon での無料プランについて注意点

Render.com でデータベースまで作成すると、数ヶ月でデータベースを使えなくなってしまいます。そのため、データベースは Neon で作成し、Render.com でアプリケーションをデプロイするという方法を採用しました。

しかし、Ruby on Rails を無料でデプロイする方法は頻繁に変わりうるため、その点にご留意いただけますと幸いです。例えば、Render.com や Neon の無料プランが廃止されたり、仕様が変更されたりする可能性があります。
