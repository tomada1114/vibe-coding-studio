---
title: TechLog を GitHub にアップロードしよう
nextjs:
  metadata:
    title: TechLog を GitHub にアップロードしよう
    description: Rails プロジェクトを GitHub で管理する方法と、Git の基本的な使い方を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [リモートリポジトリの設定](#リモートリポジトリの設定)
- [ブランチの設定](#ブランチの設定)
- [変更内容をステージングに登録](#変更内容をステージングに登録)
- [変更内容をコミット](#変更内容をコミット)
- [コミットをリモートリポジトリにプッシュ](#コミットをリモートリポジトリにプッシュ)
- [リモートリポジトリの確認](#リモートリポジトリの確認)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Git の基本的なコマンドとワークフローを理解する
- ローカルリポジトリをリモートリポジトリに接続する方法を習得する
- 変更内容をステージングに登録し、コミットする手順を学ぶ
- GitHub へのプッシュ方法とその確認方法を習得する
- Git の基本的な用語の意味と使い方を理解する

## はじめに

それでは、前章で作成した Rails プロジェクト techlog-app を、GitHub のリモートリポジトリにプッシュ（アップロード）するための準備をします。Git には多くの専門用語がありますが、基本的な流れを理解すれば難しくありません。

Git に関する用語について詳しく知りたい方は、以下の資料も参考にしてみてください。

参考リンク：
- [【Git】よく使われる用語の意味をわかりやすく解説 - 初心者向けの基本と実務活用](https://learning-next.app/blog/web-development/git-terminology)

## リモートリポジトリの設定

まずは VS Code で techlog-app フォルダをターミナルで開きます。その後、コマンドを使い、techlog-app のアップロード先であるリモートリポジトリの場所を指定します。

以下のコマンドで、ローカルリポジトリとリモートリポジトリを接続します。`xxxxxx` の部分には、あなたの GitHub のアカウント名を入れてください。

```bash
$ git remote add origin git@github.com:xxxxxx/techlog-app.git
```

このコマンドは、前章で GitHub でリモートリポジトリを作成した際に表示されたものです。

リモートリポジトリを正常に設定できたかどうかは、`git remote -v` コマンドで確認できます。

```bash
$ git remote -v
origin  https://github.com/tomada1114/techlog-app.git (fetch)
origin  https://github.com/tomada1114/techlog-app.git (push)
```

上記のように表示されていれば、リモートリポジトリの設定は完了です。表示されるアカウント名は、あなたのものになります。

## ブランチの設定

Git では **ブランチ** というもので、作業状況を分けて（分岐して）管理することができます。これにより、同じプロジェクトに対して複数の作業を並行して行うことができます。

参考リンク：
- [ブランチとは](https://backlog.com/ja/git-tutorial/stepup/01/)

本カリキュラムでは **main** というブランチだけで作業していきますが、実際の開発現場では新機能追加や設定変更ごとにブランチを作成するのが一般的です。

以下のコマンドを techlog-app ディレクトリで実行して、ブランチを設定します。

```bash
$ git branch -M main
```

これでブランチとして main が設定されました。

## 変更内容をステージングに登録

Git では、ファイルを変更しただけではバージョン管理の対象になりません。**ステージング** という場所に変更内容を登録することで、初めて「これからバージョン管理します」と宣言することになります。

参考リンク：
- [Git のステージングエリアについて理解する[Git]](https://qiita.com/takuyanin/items/8d5226fd5834e6ebc564)

現在の状態を確認するには、`git status` コマンドを実行します。

```bash
$ git status
On branch main
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitattributes
	.gitignore
	.ruby-version
	Gemfile
	Gemfile.lock
	...
nothing added to commit but untracked files present (use "git add" to track)
```

`Untrackad files:` という欄に表示されているのが、まだステージングに登録されていない変更内容（ファイル）です。

それでは、**Rails プロジェクトを作成した** というここまでの変更内容をステージングに登録しましょう。変更内容をまとめてステージングに登録するには `git add .` コマンドを実行します。

```bash
$ git add .
```

`.` は、カレントディレクトリ（今いるディレクトリ）以下の全てのファイルを指します。

これで変更内容がステージングに登録されたので、`git status` コマンドを実行すると表示が変わります。

```bash
$ git status
On branch main
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitattributes
	new file:   .gitignore
	new file:   .ruby-version
	new file:   Gemfile
	new file:   Gemfile.lock
	...
```

## 変更内容をコミット

ステージングに登録した変更内容は **コミット（commit）** することで初めて、変更内容が記録されます。このコミット1回につき、一つのバージョンが作られ、後から遡ることができるようになります。

いわば、現在の状況を写真に撮るようなイメージです。

先ほどステージングに登録した変更内容について、メッセージ付きでコミットしてみましょう。

```bash
$ git commit -m "プロジェクト開始"
[main (root-commit) c5600b7] プロジェクト開始
 80 files changed, 1400 insertions(+)
 create mode 100644 .gitattributes
 create mode 100644 .gitignore
 create mode 100644 .ruby-version
 create mode 100644 Gemfile
 create mode 100644 Gemfile.lock
 ...
```

コミットメッセージの書き方には色々な流儀があります。興味があれば以下の記事も参考にしてみてください。

参考リンク：
- [コミットメッセージの書き方を初心者向けにわかりやすく解説](https://learning-next.app/blog/web-development/git-commit-message-guide)

## コミットをリモートリポジトリにプッシュ

コミットしたことで、変更内容を一つのバージョン（スナップショット）として記録できました。この記録を GitHub のリモートリポジトリに共有し、リモートリポジトリとローカルリポジトリを同じ状態に同期するには **プッシュ** を実行します。

プッシュについてのイメージ図があると理解しやすいので、以下の参考サイトもご覧ください。

参考リンク：
- [リモートリポジトリにプッシュする](https://backlog.com/ja/git-tutorial/intro/09/)

```bash
$ git push -u origin main
Enter passphrase for key '/Users/YourName/.ssh/id_rsa':
...
- [new branch] main -> main
  Branch 'main' set up to track remote branch 'main' from 'origin'.
```

初回であれば、GitHub の設定時に作成した SSH 鍵のパスワードを求められるので、ターミナル上で入力してください。これは、GitHub の設定をしたときに `ssh-keygen -t ed25519 -C "GitHubに登録したメールアドレス"` といったコマンドを実行した後に設定したパスワードです。

## リモートリポジトリの確認

`git push` を実行したことで、GitHub にこれまでの変更内容が同期されています。GitHub の画面を更新し、techlog-app リポジトリの状況を確認してみましょう。

先ほどのコミットが反映され、作ったファイルがアップロード（プッシュ）されているはずです。

![GitHub リポジトリの状態](/img/rails/github-project-pushed.png)

今後の作業ではこのように、区切り毎にコミットしていくようにします。自分の作業管理に役立つのはもちろん、トラブルシューティングで他の人のサポートを受ける時にコードを共有することができるので便利です。

## まとめ

本章では、Git と GitHub を使って Rails プロジェクトを管理する基本的な方法を学びました。

- リモートリポジトリの設定方法
- ブランチの概念と設定方法
- 変更内容をステージングに登録する方法
- コミットでバージョン管理する方法
- GitHub へのプッシュ方法

これらの基本的な Git 操作を身につけることで、プロジェクトの変更履歴を適切に管理し、チーム開発にも対応できるようになります。今後も定期的にコミットとプッシュを行い、コードの変更を記録していきましょう。
