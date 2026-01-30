---
title: Tailwind CSS の書き方を学ぼう
nextjs:
  metadata:
    title: Tailwind CSS の書き方を学ぼう
    description: Tailwind CSS の基本概念と使い方を学び、HTML だけでデザインを適用する方法を習得します
---

- [学習の目標](#学習の目標)
- [Tailwind CSS とは？](#tailwind-css-とは)
- [使い方の基本](#使い方の基本)
- [Tailwind CSS の仕組み](#tailwind-css-の仕組み)
- [bin/dev でサーバを起動して自動ビルド](#bindev-でサーバを起動して自動ビルド)
- [Tailwind CSS を使ってスタイルを適用する](#tailwind-css-を使ってスタイルを適用する)
- [変更のコミット](#変更のコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Tailwind CSS の基本概念と特徴を理解する
- HTML の class 属性を使ったスタイル適用方法を習得する
- Tailwind CSS のビルドプロセスと自動更新の仕組みを理解する
- 実際に Tailwind CSS を使ってページをスタイリングする方法を学ぶ
- 開発環境での効率的な Tailwind CSS の活用方法を習得する

## Tailwind CSS とは？

Tailwind CSS は、HTML要素の class に直接特定の文字列を指定することでスタイルを適用できる CSS フレームワークです。例えば、`font-bold` というクラスを指定すると文字が太字になり、`text-red-500` というクラスを指定すると文字が赤色になります。このように、HTMLだけでスタイリングを完結させることができるため、別途 CSS ファイルを編集する必要がなく、近年非常に人気を集めています。

従来の CSS フレームワークがあらかじめ用意されたコンポーネントを提供するのに対し、Tailwind CSS は「ユーティリティファースト」という考え方に基づいており、小さな機能単位のクラスを組み合わせることでデザインを構築していきます。

参考リンク：
- [TailWindCSSを始めようとしている人へ](https://zenn.dev/nbr41to/articles/276f40041ad9fe)

## 使い方の基本

本アプリでは Tailwind CSS を使用してスタイリングを行いますが、改めて導入する必要はありません。Rails プロジェクト作成時に `--css tailwind` オプションを指定し、その後 `bundle exec rails tailwindcss:install` コマンドを実行したことで、すでに Tailwind CSS が導入されています。

実際に `app/views/home/top.html.erb` を見てみましょう。

```html
<div>
  <h1 class="font-bold text-4xl">Home#top</h1>
  <p>Find me in app/views/home/top.html.erb</p>
</div>
```

このファイルを見ると、すでに Tailwind CSS のクラスが使われていることがわかります。`font-bold` は文字を太字にするクラスで、`text-4xl` は文字サイズを大きくするクラスです。このように、HTML の class 属性に Tailwind CSS のクラス名を指定するだけで、スタイルが適用されます。

## Tailwind CSS の仕組み

通常、HTML にスタイルを適用する場合、CSS ファイルを作成し、その中でスタイルを記述します。例えば、次のように書きます。

```css
/* 記述例 */
.font-bold {
  font-weight: 700;
}

.text-4xl {
  font-size: 2.25rem;
}
```

しかし、TechLog では特に CSS ファイルを作成していないのに、`font-bold` や `text-4xl` というクラス名に対してスタイルが適用されています。これは、Tailwind CSS が提供するクラス名を HTML の class 属性に指定することで、そのクラス名に対応するスタイルが自動的に適用される仕組みになっているためです。

例えば、`font-bold` というクラスについて Tailwind CSS の公式ドキュメントを見てみましょう。

![Tailwind CSS font-weight ドキュメント](/img/rails/tailwind-font-weight.png)

左側が Tailwind CSS で使用するクラス名、右側がそれにより適用される CSS のプロパティを表しています。`font-bold` の場合、フォントの太さを 700 という数値に設定するスタイルが適用されます。

## bin/dev でサーバを起動して自動ビルド

Tailwind CSS を使用するには、通常「ビルド」という作業が必要です。ビルドとは、Tailwind CSS のクラス名を実際の CSS コードに変換する処理のことです。

通常、Rails サーバーを `rails s` コマンドで実行する場合、その前に `tailwind:build` というコマンドを実行する必要があります。これを行わないと、Tailwind CSS のクラス名が適用されません。ビルドプロセスは、アプリケーション内で使用されている Tailwind CSS のクラスだけを抽出し、必要最低限の CSS のみを生成する役割も担っています。

ただし、開発環境では `bin/dev` コマンドを実行することで、Rails サーバーと同時に Tailwind CSS の自動ビルドプロセスも起動します。これにより、Tailwind CSS のクラスを追加するたびに自動的にビルドが実行され、変更がすぐに反映されるようになっています。

改めて、`bin/dev` を実行してみましょう。一旦サーバーを Ctrl + C で停止し、再度起動します。

```bash
$ bin/dev
12:20:21 web.1  | started with pid 44537
12:20:21 css.1  | started with pid 44538
12:20:23 web.1  | => Booting Puma
12:20:23 web.1  | => Rails 8.0.1 application starting in development
12:20:23 web.1  | => Run `bin/rails server --help` for more startup options
12:20:23 web.1  | Puma starting in single mode...
12:20:23 web.1  | * Puma version: 6.6.0 ("Return to Forever")
12:20:23 web.1  | * Ruby version: ruby 3.2.2 (2023-03-30 revision e51014f9c0) [arm64-darwin21]
12:20:23 web.1  | *  Min threads: 3
12:20:23 web.1  | *  Max threads: 3
12:20:23 web.1  | *  Environment: development
12:20:23 web.1  | *          PID: 44537
12:20:23 web.1  | * Listening on http://127.0.0.1:3000
12:20:23 web.1  | * Listening on http://[::1]:3000
12:20:23 web.1  | Use Ctrl-C to stop
12:20:24 css.1  | ≈ tailwindcss v4.0.9
12:20:24 css.1  |
12:20:24 css.1  | Done in 78ms
```

コンソールのログを見ると、`web.1` と `css.1` の両方のログが表示されています。`web.1` は Rails サーバー（`rails s` 相当）のログであり、`css.1` は Tailwind CSS のビルドサーバーのログです。この2つのプロセスが同時に起動することで、Tailwind CSS の変更が即座に反映される環境が整っています。

## Tailwind CSS を使ってスタイルを適用する

実際に Tailwind CSS を使ってスタイルを適用してみましょう。試しに赤色のテキストを表示するクラス `text-red-500` を `h1` タグに追加してみます。Tailwind CSS では、色の名前（red）と濃さ（500）を指定することで、様々な色調を簡単に使用できます。

`app/views/home/top.html.erb` を次のように修正します。

```html
<div>
  <h1 class="font-bold text-4xl text-red-500">Home#top</h1>
  <p>Find me in app/views/home/top.html.erb</p>
</div>
```

この状態で `http://127.0.0.1:3000` にアクセスすると、「Home#top」というテキストが赤色で表示されるようになります。

![赤色のテキスト表示](/img/rails/tailwind-red-text.png)

このように、クラス名を追加するだけで簡単にスタイルを変更できるのが Tailwind CSS の大きな特徴です。Tailwind CSS には、テキストの色や大きさ、余白、配置など、あらゆるスタイリングに対応するクラスが用意されています。詳細は公式ドキュメントを参照すると良いでしょう。

## 変更のコミット

ここまでの変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "Tailwind CSSクラスを適用"
$ git push
```

## まとめ

ここまでで、Rubocop や RSpec、Capybara の導入、そして Tailwind CSS の基本的な使い方を学んできました。これらのツールや技術は、現代の Rails 開発において非常に重要な役割を果たします。

Tailwind CSS は、HTML の class 属性を活用してスタイリングを行う「ユーティリティファースト」のアプローチにより、CSS の記述量を減らし、開発効率を高めることができます。また、`bin/dev` コマンドによる自動ビルド機能のおかげで、スムーズな開発体験も実現しています。

これらの基盤となる知識は、どの開発現場でも役立つものでありながら、独学ではなかなか触れる機会が少ないかもしれません。お疲れ様でした。

次の Chapter からは、いよいよユーザー機能や投稿機能など、TechLog を本格的に作り込んでいきます。これまでに学んだ知識を活かして、実践的な Web アプリケーション開発を進めていきましょう。
