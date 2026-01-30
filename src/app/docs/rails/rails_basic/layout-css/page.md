---
title: layoutとCSSで見た目を整えよう
nextjs:
  metadata:
    title: layoutとCSSで見た目を整えよう
    description: Ruby on Railsのレイアウト機能とCSSを活用して、アプリケーションの見た目を整える方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [レイアウトファイルについて](#レイアウトファイルについて)
  - [レイアウトファイルとは](#レイアウトファイルとは)
  - [デフォルトのレイアウトファイル](#デフォルトのレイアウトファイル)
- [application.html.erbの編集](#applicationhtmlerbの編集)
- [CSSファイルを使ったデザインの変更](#cssファイルを使ったデザインの変更)
  - [CSSファイルの場所](#cssファイルの場所)
  - [CSSの編集](#cssの編集)
- [レイアウトの仕組みを理解する](#レイアウトの仕組みを理解する)
  - [yieldの役割](#yieldの役割)
  - [ビューの表示プロセス](#ビューの表示プロセス)
- [レイアウトのカスタマイズ](#レイアウトのカスタマイズ)
  - [ナビゲーションメニューの追加](#ナビゲーションメニューの追加)
  - [CSSのさらなるカスタマイズ](#cssのさらなるカスタマイズ)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Railsのレイアウト機能の基本概念を理解する
- application.html.erbの役割と構造を学ぶ
- 共通のヘッダーとフッターを実装する方法を習得する
- CSSファイルを編集してデザインを変更する手順を学ぶ
- yieldの仕組みとビューの表示プロセスを理解する

## はじめに

これまでに、Railsの基本的なCRUD操作やバリデーションについて学んできました。アプリケーションの機能は充実してきていますが、見た目はまだ簡素なままです。使いやすく見栄えの良いアプリケーションにするためには、デザインも重要な要素です。

このチャプターでは、Railsアプリケーションの見た目を整える方法を学びます。Railsでは、**application.html.erb**というレイアウトファイルを使って、全ページに共通するヘッダーやフッターなどをまとめることができます。また、CSSファイルを活用してデザインを変更すると、全体の雰囲気を統一しやすくなります。

ここでは細かいデザインや高度なテクニックには踏み込みませんが、とりあえず見た目を整えるための流れを一通り確認していきましょう。なお、CSSはコピー＆ペーストで構いませんので、レイアウトやRailsの仕組みの理解に集中してください。

## レイアウトファイルについて

### レイアウトファイルとは

**レイアウトファイル**とは、アプリケーション内で共通となるHTML構造を一カ所にまとめる仕組みです。共通のヘッダーやフッター、ナビゲーションメニューなどを定義することで、すべてのページで一貫したデザインを実現できます。

Railsでは、**app/views/layouts/application.html.erb**が標準のレイアウトファイルとして設定されています。このファイルの`<body></body>`内にヘッダーやフッターのHTMLを書いておくと、すべての画面で同じデザインが適用されます。

### デフォルトのレイアウトファイル

デフォルトでは、application.html.erbは以下のようになっているかと思います（バージョンにより多少異なります）。

```erb
<!DOCTYPE html>
<html>
  <head>
    <title><%= content_for(:title) || "Myapp" %></title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= yield :head %>

    <%# Enable PWA manifest for installable apps (make sure to enable in config/routes.rb too!) %>
    <%#= tag.link rel: "manifest", href: pwa_manifest_path(format: :json) %>

    <link rel="icon" href="/icon.png" type="image/png">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/icon.png">

    <%# Includes all stylesheet files in app/assets/stylesheets %>
    <%= stylesheet_link_tag :app, "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

特に大事なのが `<%= yield %>` という部分です。この部分に、各アクションに対するビューファイル（例：app/views/posts/index.html.erb）の内容が読み込まれることになります。

逆に言うと、`<%= yield %>`以外のHTML要素は全ページで共通的に使われます。そのため、ヘッダーやフッターなど、どのページでも表示させたい要素については、この application.html.erb に書くことになります。

## application.html.erbの編集

それでは、実際に application.html.erb を編集して、ヘッダーとフッターを追加してみましょう。`<body>` タグ内を以下のように書き換えてください。

```erb
  <body>
    <!-- ヘッダー -->
    <header>
      <h1>MyRailsApp</h1>
    </header>

    <!-- 個別のビューの内容は yield で読み込む -->
    <main class="container">
      <%= yield %>
    </main>

    <!-- フッター -->
    <footer>
      <p>© 2025 MyRailsApp</p>
    </footer>
  </body>
```

ここでは、次の3つの要素を追加しました。

1. **ヘッダー**: アプリケーション名を表示するシンプルなヘッダー
2. **メインコンテンツ**: `<%= yield %>` を `<main>` タグで囲み、CSSを適用するためのクラス名 `container` を追加
3. **フッター**: コピーライト情報を表示するシンプルなフッター

これで、すべてのページにヘッダーとフッターが表示されるようになります。しかし、まだCSSを適用していないので、見た目はあまり変わっていません。次に、CSSファイルを編集してデザインを変更しましょう。

## CSSファイルを使ったデザインの変更

### CSSファイルの場所

Railsでは、**app/assets/stylesheets**の中にCSSファイルを作り、その中にスタイルを書いていきます。デフォルトで **app/assets/stylesheets/application.css** というファイルが作られているので、このファイルを編集します。

### CSSの編集

application.css の中身を一度消し、以下のように置き換えてみましょう。

```css
/* app/assets/stylesheets/application.css */

/* サイト全体のデザイン */
body {
  color: #333;
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  line-height: 1.6;
}

/* ヘッダー */
header {
  background-color: #60a5fa; /* ブルー */
  color: #ffffff;
  padding: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* メインコンテンツ */
.container {
  max-width: 400px;
  width: 100%;
  padding: 0 20px;
  margin: 30px auto;
}

/* フッター */
footer {
  background-color: #374151; /* ダークグレー */
  color: #d1d5db;
  text-align: center;
  padding: 5px;
  font-size: 0.85rem;
  margin-top: 30px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
```

このCSSでは、以下のようなスタイルを適用しています。

1. **body**: 全体の文字色、余白、フォント、背景色、行間を設定
2. **header**: ヘッダーの背景色（青）、文字色（白）、余白、配置、影を設定
3. **.container**: メインコンテンツの最大幅、横幅、余白、中央配置を設定
4. **footer**: フッターの背景色（暗めのグレー）、文字色（薄めのグレー）、配置、余白、文字サイズ、上部余白、影を設定

これらの変更を保存し、ブラウザで投稿一覧ページ（http://localhost:3000/posts）を表示してみましょう。サイト全体の見た目が変わり、ヘッダーとフッターが追加されたことが確認できるはずです。

![レイアウト適用後の画面](/img/rails/after-layout-applied.png)

このように、application.html.erbとCSSを編集するだけで、アプリケーション全体の見た目を簡単に変更することができます。

## レイアウトの仕組みを理解する

### yieldの役割

`<%= yield %>` は、Railsのビューシステムにおいて非常に重要な役割を果たします。この部分には、コントローラのアクションに対応するビューファイルの内容が挿入されます。

例えば、Postsコントローラのindexアクションが実行された場合、`app/views/posts/index.html.erb` の内容が `<%= yield %>` の位置に挿入されます。同様に、showアクションが実行された場合は `app/views/posts/show.html.erb` の内容が挿入されます。

これにより、ページごとに異なる内容を表示しながらも、ヘッダーやフッターなどの共通部分は一貫して表示できます。

### ビューの表示プロセス

Railsでビューが表示されるプロセスは、以下のようになります。

1. ユーザーがURLにアクセスする（例：`/posts`）
2. ルーティングによって、該当するコントローラとアクションが決定される（例：`PostsController#index`）
3. コントローラがモデルからデータを取得し、インスタンス変数に格納する（例：`@posts = Post.all`）
4. コントローラに対応するビューファイルが読み込まれる（例：`app/views/posts/index.html.erb`）
5. ビューファイルの内容が、レイアウトファイルの `<%= yield %>` の位置に挿入される
6. 最終的なHTMLが生成され、ブラウザに送信される

このプロセスにより、すべてのページで共通のデザインを維持しながら、ページごとに異なる内容を表示することができます。

## レイアウトのカスタマイズ

### ナビゲーションメニューの追加

実際のアプリケーションでは、ヘッダーにナビゲーションメニューを追加することが多いです。例えば、以下のようにヘッダー部分を修正してみましょう。

```erb
<!-- ヘッダー -->
<header>
  <h1>MyRailsApp</h1>
  <nav>
    <ul>
      <li><%= link_to "Home", posts_path %></li>
      <li><%= link_to "New Post", new_post_path %></li>
    </ul>
  </nav>
</header>
```

これにより、すべてのページに「Home」と「New Post」へのリンクが表示されます。

### CSSのさらなるカスタマイズ

ナビゲーションメニューを追加したら、CSSも修正しましょう。以下のようなスタイルをapplication.cssに追加します。

```css
/* ナビゲーション */
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 10px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}
```

このスタイルにより、ナビゲーションメニューが横並びになり、リンクの色や装飾が設定されます。

## まとめ

本章では、Railsのレイアウト機能を使って見た目を整える基本的な手順を学びました。

- **レイアウトファイル**（application.html.erb）でヘッダーやフッターを共通化すると、全ページに同じデザインを一度に反映できる
- **yield**の部分に、各アクションに対応するビューファイルの内容が挿入される
- **CSSファイル**を編集して背景色や文字色を変更すれば、アプリケーションの雰囲気を大きく変えることができる
- ヘッダーにナビゲーションメニューを追加することで、ユーザビリティを向上させることができる

最初のうちはデザインが崩れてしまうこともありますが、慣れてくると思い通りにレイアウトを調整できるようになります。CSSの知識を深めていくことで、よりリッチなデザインを実現することも可能です。

次の章では、モデル間の関連付けについて学び、より複雑なアプリケーションの構築に進んでいきましょう。
