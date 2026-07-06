---
title: 【Mac向け】 HomebrewとrbenvでRuby開発環境を作ろう
nextjs:
  metadata:
    title: 【Mac向け】 HomebrewとrbenvでRuby開発環境を作ろう
---
- [学習の目標](#学習の目標)
- [Homebrewとは](#homebrewとは)
  - [Macのターミナルとシェルについて](#macのターミナルとシェルについて)
    - [Macのデフォルトシェルについて](#macのデフォルトシェルについて)
    - [自分のシェルを確認する方法](#自分のシェルを確認する方法)
  - [Homebrewのインストール手順](#homebrewのインストール手順)
  - [Homebrewのトラブルシューティング](#homebrewのトラブルシューティング)
- [rbenvとは](#rbenvとは)
  - [rbenvのインストールと設定](#rbenvのインストールと設定)
    - [シェルごとの設定方法](#シェルごとの設定方法)
      - [zshを使用している場合（macOS Catalina以降）](#zshを使用している場合macos-catalina以降)
      - [bashを使用している場合（macOS Mojave以前）](#bashを使用している場合macos-mojave以前)
    - [HomebrewのPATH設定](#homebrewのpath設定)
- [Rubyのインストール手順](#rubyのインストール手順)
- [Rubyインストールのトラブルシューティング](#rubyインストールのトラブルシューティング)
- [よくある問題と解決方法](#よくある問題と解決方法)
  - [Q: `rbenv install`コマンドを実行するとエラーが出る](#q-rbenv-installコマンドを実行するとエラーが出る)
  - [Q: Ruby のバージョンを確認すると、設定したものと違う](#q-ruby-のバージョンを確認すると設定したものと違う)
  - [Q: コマンドを実行すると「command not found」と表示される](#q-コマンドを実行するとcommand-not-foundと表示される)
  - [Q: シェルが何かわからない・変更したい](#q-シェルが何かわからない変更したい)
- [まとめ](#まとめ)

## 学習の目標

本章では、MacでのRuby開発環境の構築方法を学びます。開発環境とは、プログラミングするために必要なソフトウェアやツールの集まりのことです。実際にプログラミングを始める前に、適切な開発環境を整えることが大切です。

開発環境を整えることは、実際の現場に入ったり、アプリ開発をスタートするときに必ず通る道です。この章で学ぶ内容は、エンジニアとして働く上で何度も行うことになる重要な作業です。

Mac を使った Rubyの開発では、`Homebrew`と`rbenv`という2つのツールがよく使われますので、今回はこれらを使って環境をセットアップしていきます。

## Homebrewとは

`Homebrew`は、**Macのパッケージ管理ツール**です。

パッケージ管理ツールとは、ソフトウェアのインストール、アップデート、削除などを簡単に行えるようにするためのツールです。普段みなさんがスマートフォンでアプリをインストールするように、Homebrewを使うとMacでも様々なソフトウェアを簡単にインストールすることができます。

### Macのターミナルとシェルについて

ターミナルを使う前に、「シェル」という概念を簡単に理解しておきましょう。シェルとは、コマンドを入力して、コンピュータに指示を出すためのプログラムです。主なシェルには「bash」と「zsh」があります。

#### Macのデフォルトシェルについて
- macOS Catalina (10.15) 以降では、デフォルトのシェルが「zsh」になりました
- それより前のバージョンでは「bash」がデフォルトでした

#### 自分のシェルを確認する方法

お使いのMacがどのシェルを使っているかを確認するには、ターミナルを開いて以下のコマンドを実行します。

```
echo $SHELL
```

結果として、以下のどちらかが表示されます。
- `/bin/zsh` → zshを使用している
- `/bin/bash` → bashを使用している


```bash
# zshを使用している場合
echo $SHELL
# => /bin/zsh

# bashを使用している場合
echo $SHELL
# => /bin/bash
```

本講座では、macOS Catalina以降の「zsh」を前提に説明します。もし「bash」を使用している場合は、一部のコマンドを調整する必要があります。具体的な調整方法は、各セクションで説明します。

### Homebrewのインストール手順

まず、ターミナルを開きます。

ターミナルは、**コンピュータに対して直接命令を出すためのツール**です。通常のアプリケーションとは違い、マウスではなく文字でコンピュータに指示を出します。

以下の手順でターミナルを開くことができます。

1. Launchpadを開く
2. 検索欄に「ターミナル」と入力
3. 表示された「ターミナル」をクリック

![Launchpadからターミナルを開く](/img/ruby/launchpad-terminal.png)

ターミナルが開いたら、以下のコマンドを入力し、Enterキーを押して実行します。

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**注意点：** インストール中にパスワードの入力を求められた場合は、Macのログインパスワードを入力してください。入力しても画面上には表示されませんが、きちんと入力されていますので、入力後Enterキーを押してください。

インストールが完了したら、Homebrewが正しくインストールされたか確認するために、以下のコマンドを実行します。

```
brew -v
```

このコマンドを実行すると、インストールされたHomebrewのバージョンが表示されます。バージョン情報が表示されれば、インストールは成功です。

```
# 表示例
Homebrew 3.4.1
```

### Homebrewのトラブルシューティング

もし`Failed during: /opt/homebrew/bin/brew update --force --quiet`というエラーが表示された場合は、以下のコマンドを1行ずつ実行してみてください。

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"

git config --global core.compression 0

git config --global http.postBuffer 1048576000

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

これらのコマンドは、一度Homebrewをアンインストールしてから、Gitの設定を調整し、再度Homebrewをインストールするものです。

## rbenvとは

`rbenv`は、**複数のRubyバージョンを管理するためのツール**です。

プログラミングの世界では、同じ言語でも異なるバージョンが存在し、プロジェクトによって必要なバージョンが違うことがあります。rbenvを使うと、異なるプロジェクトで異なるバージョンのRubyを簡単に切り替えて使用することができます。

### rbenvのインストールと設定

以下のコマンドでrbenvをインストールします。Homebrewを使ってインストールするため、先にHomebrewのインストールが完了している必要があります。

```
brew install rbenv
```

インストール後、シェルの設定ファイルを編集して、rbenvの初期設定を行います。

#### シェルごとの設定方法

まず、どのシェルを使用しているか確認します。

```
echo $SHELL
```

##### zshを使用している場合（macOS Catalina以降）

```
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

##### bashを使用している場合（macOS Mojave以前）

```
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
```

これらのコマンドは、rbenvの設定をターミナルが起動するたびに自動的に読み込むようにするための設定です。

#### HomebrewのPATH設定

rbenvをインストールした後、Homebrewの設定も確認しておきましょう。以下のコマンドを実行して、自分のユーザー名を確認します。

```
whoami
```

表示されたユーザー名を使って、以下のコマンドを実行します（`tomada`の部分をご自身のユーザー名に置き換えてください）。

zshを使用している場合：
```
echo >> /Users/tomada/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/tomada/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

bashを使用している場合：
```
echo >> /Users/tomada/.bash_profile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/tomada/.bash_profile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

これらのコマンドは、Macが起動するたびに自動的にHomebrewの設定を読み込むようにするための設定です。

## Rubyのインストール手順

rbenvを使ってRubyをインストールします。まず、インストール可能なRubyのバージョンを確認します。

```
rbenv install -l
```

このコマンドを実行すると、インストール可能なRubyのバージョン一覧が表示されます。

```
  2.7.0
  2.7.1
  2.7.2
  3.0.0
  3.0.1
  3.0.2
  3.1.0
  ...
```

**バージョン選択のポイント：**

表示されたリストから、数字のみ（例：3.4.1）で表示されているバージョンの中から最新のものを選びます。「dev」や「preview」などの文字が含まれるバージョンは開発中のものなので、通常は選ばないようにしましょう。

選択したバージョンをインストールします（ここでは3.4.1を例として使用しています）。

```
rbenv install 3.4.1
```

Rubyのインストールには少し時間がかかります。しばらく待ちましょう。

インストールが完了したら、システム全体で使用するRubyのバージョンを設定します。

```
rbenv global 3.4.1
```

このコマンドにより、MacでRubyを使う場合はデフォルトで3.4.1のバージョンが使われるようになります。

最後に、Rubyが正しくインストールされたか確認します。

```
ruby -v
```

このコマンドを実行すると、インストールされたRubyのバージョンが表示されます。先ほど設定したバージョン（例：3.4.1）が表示されれば、インストールは成功です。

## Rubyインストールのトラブルシューティング

Ruby のインストールにあたっては、お使いのPC次第で手順通りに進まないことがあります。エラーメッセージが表示された場合は、そのメッセージをしっかり読むことで解決のヒントが得られることがあります。

もし上手くいかない場合は、以下のサイトを参考にしてみてください。

* [MacでRubyをインストールする方法をわかりやすく解説【初心者必見】](https://www.sejuku.net/blog/3958)
* [Rubyの開発環境を用意しよう！（macOS用）](https://prog-8.com/docs/ruby-env)

## よくある問題と解決方法

### Q: `rbenv install`コマンドを実行するとエラーが出る

A: Ruby をインストールするために必要な開発ツールが不足している可能性があります。以下のコマンドを実行してから再度試してみてください。

```
brew install openssl readline
```

### Q: Ruby のバージョンを確認すると、設定したものと違う

A: rbenv の設定が反映されていない可能性があります。以下のコマンドを実行してみてください。

```
rbenv rehash
```

その後、使用しているシェルに応じて以下のコマンドを実行します。

zshの場合：
```
source ~/.zshrc
ruby -v
```

bashの場合：
```
source ~/.bash_profile
ruby -v
```

### Q: コマンドを実行すると「command not found」と表示される

A: パスが正しく設定されていない可能性があります。使用しているシェルによって、以下のコマンドで確認と修正を行ってください。

zshの場合：
```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

bashの場合：
```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

### Q: シェルが何かわからない・変更したい

A: 現在使用しているシェルを確認するには、以下のコマンドを実行します。

```
echo $SHELL
```

bashからzshに変更したい場合は、以下のコマンドを実行します。

```
chsh -s /bin/zsh
```

変更後はMacを再起動するか、新しいターミナルウィンドウを開きましょう。

## まとめ

本章では、以下の手順を学びました。

- Macのシェル（bash/zsh）の確認方法と違い
- `Homebrew`のインストールと基本的な使い方
- `rbenv`を使用したRubyバージョン管理の方法
- 具体的なRubyのインストール手順とバージョン設定

これらの設定により、Macで効率的にRuby開発を行える環境が整いました。環境構築は少し大変ですが、一度設定してしまえば長期間使えますので、ぜひ頑張って完了させましょう。
