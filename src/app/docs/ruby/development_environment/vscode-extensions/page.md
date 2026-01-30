---
title: VS Codeの拡張機能を活用しよう
nextjs:
  metadata:
    title: VS Codeの拡張機能を活用しよう
---
- [学習の目標](#学習の目標)
- [拡張機能とは](#拡張機能とは)
- [拡張機能のインストール手順](#拡張機能のインストール手順)
- [おすすめの拡張機能](#おすすめの拡張機能)
  - [スペルチェック機能](#スペルチェック機能)
  - [インデントを見やすく](#インデントを見やすく)
  - [不要な空白を見つける](#不要な空白を見つける)
  - [ファイルの種類を分かりやすく](#ファイルの種類を分かりやすく)
  - [全角スペースを見つける](#全角スペースを見つける)
  - [Rails開発をサポート](#rails開発をサポート)
  - [データベース構造を確認](#データベース構造を確認)
  - [endを自動で追加](#endを自動で追加)
  - [データベースの中身を見る](#データベースの中身を見る)
- [拡張機能を使いこなすコツ](#拡張機能を使いこなすコツ)
  - [必要なものだけを選ぶ](#必要なものだけを選ぶ)
  - [設定をカスタマイズする](#設定をカスタマイズする)
  - [定期的に更新する](#定期的に更新する)
- [まとめ](#まとめ)

## 学習の目標

本章では、プログラミングの効率と品質を高めるためのVisual Studio Code（VS Code）拡張機能について学びます。Ruby on Rails開発で特に役立つ拡張機能の特徴と導入方法を解説します。

## 拡張機能とは

拡張機能とは、VS Codeの基本機能に新しい機能を追加するプラグインのようなものです。エディタの見た目を変える、コードの自動補完を強化する、エラーチェックをするなど、様々な機能を追加できます。適切な拡張機能を使うことで、プログラミング作業がより効率的になります。

## 拡張機能のインストール手順

拡張機能は以下の簡単な手順でインストールできます。

1. VS Codeの左側にある「Extensions」アイコン（四角が4つ並んだもの）をクリックします
2. 検索欄に、インストールしたい拡張機能の名前を入力します
3. 目的の拡張機能が表示されたら、「Install」ボタンをクリックします

![VSCodeの拡張機能アイコン](/img/ruby/vscode-extension-icon.png)

## おすすめの拡張機能

### スペルチェック機能

**Code Spell Checker**は、プログラム中の英単語のスペルミスを見つけてくれる拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

この拡張機能は次のような場面で役立ちます。

- 変数名やメソッド名のタイプミスを見つける（例：`user`を`uesr`と入力した場合）
- コメント文の英単語をチェックする
- 一般的なプログラミング用語の正しい綴りを提案する

![スペルチェックの表示](/img/ruby/vscode-spell-checker.png)

### インデントを見やすく

**indent-rainbow**は、コードの階層構造を分かりやすくする拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

インストールすると、インデント（行頭の空白）部分が次のように表示されます。

- インデントの深さごとに色が変わります
- ネストが深くなるほど色が変化するので、構造が分かりやすくなります
- インデントのズレも一目で確認できます

![インデント表示の画像](/

### 不要な空白を見つける

**Trailing Spaces**は、コードの品質と可読性を高める拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)

この拡張機能には次のような機能があります。

- 行末の余分な空白を赤く表示します
- 自動保存時に不要な空白を消すように設定できます

![不要な空白の表示](/img/ruby/vscode-trailing-spaces.png)

### ファイルの種類を分かりやすく

**vscode-icons**は、プロジェクト内のファイル管理を直感的にする拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

ファイルの種類に応じて、次のようなアイコンが表示されます。

- Rubyファイル（`.rb`）は赤いルビーの宝石のアイコン
- HTMLファイル（`.html`）は山括弧（`<>`）のアイコン
- 設定ファイル（`.yml`、`.json`など）は形式ごとの専用アイコン

![ファイルアイコンの表示](/img/ruby/vscode-icons.png)

### 全角スペースを見つける

**zenkaku**は、日本語環境での開発に便利な拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=mosapride.zenkaku](https://marketplace.visualstudio.com/items?itemName=mosapride.zenkaku)

この拡張機能があると次のようなことができます。

- エラーの原因となる全角スペースを見つけられます
- 見つけにくい全角スペースをマークで表示します
- 日本語のコメントでうっかり入れてしまう全角スペースを防げます

![全角スペースの表示](/img/ruby/vscode-zenkaku.png)

### Rails開発をサポート

**Rails**拡張機能は、Ruby on Railsアプリケーションの開発を助けてくれます。

[https://marketplace.visualstudio.com/items?itemName=bung87.rails](https://marketplace.visualstudio.com/items?itemName=bung87.rails)

主な機能は次の通りです。

- Railsの文法に対応したコード補完
- ルーティング定義の候補表示
- モデルやコントローラの構文を見やすく表示

![Rails拡張機能の表示](/img/ruby/vscode-rails-extension.png)

「Rails」という名前の拡張機能は複数ありますが、開発者「周鹏」が作ったものがおすすめです。定期的にアップデートされているので、最新のRailsバージョンでも使えます。

### データベース構造を確認

**Rails DB Schema**は、データベース設計を確認しやすくする拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=aki77.rails-db-schema](https://marketplace.visualstudio.com/items?itemName=aki77.rails-db-schema)

この拡張機能で次のようなことが確認できます。

- テーブルの構造と関連性
- カラムのデータ型と制約
- インデックスや外部キーの設定

![データベース構造の表示](/img/ruby/vscode-rails-db-schema.png)

### endを自動で追加

**endwise**は、Rubyのコーディングを快適にする拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=kaiwood.endwise](https://marketplace.visualstudio.com/items?itemName=kaiwood.endwise)

![endwiseの表示](/img/ruby/vscode-endwise.png)

次のような Ruby コードを書くとき、`end`を自動で追加してくれます。

```ruby
def hello
  # カーソルがここにある状態
end # 自動的に追加される

class User
  # カーソルがここにある状態
end # 自動的に追加される
```

### データベースの中身を見る

**SQLite Viewer**は、開発中のデータベースの中身を見られる拡張機能です。

[https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)

できることは次の通りです。

- テーブルの中身をスプレッドシートのように表示
- データの並び替えやフィルター
- SQLクエリの実行

![SQLite Viewerの表示](/img/ruby/vscode-sqlite-viewer.png)

## 拡張機能を使いこなすコツ

### 必要なものだけを選ぶ

拡張機能は便利ですが、たくさん入れすぎるとVS Codeの動作が重くなることがあります。本当に必要なものだけを選んでインストールしましょう。

### 設定をカスタマイズする

多くの拡張機能は、設定からカスタマイズできます。自分の好みに合わせて調整することで、より使いやすくなります。設定は「歯車アイコン」→「設定」から変更できます。

### 定期的に更新する

拡張機能は定期的にアップデートされます。VS Codeの拡張機能タブで「更新」を確認し、常に最新版を使うようにしましょう。

## まとめ

本章で紹介した拡張機能は、それぞれがRuby on Rails開発の異なる面をサポートしてくれます。今回紹介した基本的な拡張機能から試してみて、自分の開発スタイルに合わせて増やしていくことをおすすめします。

VS Codeの拡張機能を適切に活用することで、コードの品質を高め、プログラミング作業の効率を大幅に向上させることができます。
