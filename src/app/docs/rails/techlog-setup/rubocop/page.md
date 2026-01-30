---
title: Rubocop で見やすく綺麗なソースコードにしよう
nextjs:
  metadata:
    title: Rubocop で見やすく綺麗なソースコードにしよう
    description: Rubocop を導入してコードの品質を向上させる方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [Rubocop とは？](#rubocop-とは)
  - [Rubocop を使うメリット](#rubocop-を使うメリット)
- [Rubocop の導入](#rubocop-の導入)
- [Rubocop の設定ファイルを準備する](#rubocop-の設定ファイルを準備する)
- [Rubocop を実行してコードをチェックする](#rubocop-を実行してコードをチェックする)
  - [Rubocop の出力内容を理解する](#rubocop-の出力内容を理解する)
- [自動修正機能で効率よく修正する](#自動修正機能で効率よく修正する)
- [変更内容をコミットする](#変更内容をコミットする)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Rubocop の概念と重要性を理解する
- Rails プロジェクトに Rubocop を導入する方法を習得する
- Rubocop の設定ファイルを作成・カスタマイズする方法を学ぶ
- コード検査を実行し、問題を特定する方法を理解する
- 自動修正機能を活用してコードスタイルを統一する方法を習得する

## はじめに

ソースコードの品質は、開発現場では特に重視される要素の一つです。品質の高いコードは読みやすく、バグが少なく、メンテナンスしやすいという特徴があります。この章では、Ruby のコード品質を向上させるための強力なツール「Rubocop」の導入方法と活用法を学びます。

## Rubocop とは？

Rubocop とは、ソースコード中の無駄なインデントの有無や、Ruby で推奨されない書き方をしていた場合に指摘してくれる、いわば「コードの生活指導員」のようなツールです。

Rubocop のように、コードの書き方を指摘・訂正してくれるツールを **Linter**（リンター）と呼びます。コードの静的解析自体は **Lint**（リント）と呼ばれる作業です。

### Rubocop を使うメリット

Rubocop を使うことで、以下のようなメリットが得られます。

1. コードスタイルの統一
   複数人で開発を行っていても書き方を統一できるため、チーム全体のコードの一貫性が保たれます。

2. コード品質の向上
   Ruby コミュニティのベストプラクティスに沿ったコードを書けるようになります。

3. 自動修正による効率化
   簡単な修正で済むような指摘であれば、半自動的に修正できるため、時間を節約できます。

4. 学習効果
   Rubocop の指摘を通じて、より良いコードの書き方を学ぶことができます。

これらの理由から、Rubocop はチーム開発を行う多くの現場で導入されています。

## Rubocop の導入

Rubocop は gem として提供されているため、Gemfile に追記して `bundle install` を実行することでインストールできます。techlog-app 内の Gemfile を開き、`group :development` という欄に以下のように追記しましょう。

```ruby
group :development do
  # ...略
  gem 'rubocop', require: false # 追加
  gem 'rubocop-performance', require: false # 追加
  gem 'rubocop-rails', require: false # 追加
  gem 'rubocop-rspec' # 追加
end
```

この記述により、開発環境でのみ Rubocop を使用するように設定しています。Rails には「本番環境」「開発環境」「テスト環境」などがあり、それぞれの環境で使用する gem を分けて記述することができます。

今回は、基本となる `rubocop` に加えて、Rails 専用の機能を提供する `rubocop-rails`、パフォーマンスチェック用の `rubocop-performance`、そして RSpec（テスト）用の `rubocop-rspec` も合わせてインストールします。

Gemfile に追記したら、`bundle install` を実行してこれらの gem をインストールします。

```bash
$ bundle install
Fetching gem metadata from https://rubygems.org/.........
Resolving dependencies...
Fetching rubocop-rspec 3.5.0
Installing rubocop-rspec 3.5.0
Bundle complete! 26 Gemfile dependencies, 120 gems now installed.
Bundled gems are installed into `./.bundle`
```

上記のようなメッセージが表示されれば、Rubocop のインストールは成功です。

## Rubocop の設定ファイルを準備する

Rubocop は `.rubocop.yml` という名前の設定ファイルに書かれた設定に従って、ソースコードの検査を行います。この設定ファイルを通じて、検査の厳しさや対象範囲を調整することができます。

例えば、「このディレクトリは検査対象外としたい」「この特定のルールは適用したくない」といった細かい設定が可能です。また、チーム開発ではこの設定ファイルを共有することで、チーム内でソースコードの品質を一律に保つことができます。

最新の Rails では `.rubocop.yml` が自動生成されていることもありますが、もし生成されていない場合は techlog-app 内に `.rubocop.yml` を作成しましょう。

```bash
$ touch .rubocop.yml
```

作成したファイルを VS Code で開き、以下の内容を設定します。

```yaml
plugins: rubocop-rails

AllCops:
  SuggestExtensions: false

  # 除外するディレクトリ（自動生成されるファイル）
  Exclude:
    - 'vendor/**/*'
    - 'db/**/*'
    - 'config/**/*'
    - 'test/**/*'
    - 'app/mailers/**/*'
    - 'bin/*'
    - 'node_modules/**/*'
    - 'Gemfile.lock'
    - 'config.ru'
    - 'Rakefile'

  # 新ルールを有効化
  NewCops: enable

# 1行あたりの文字数をチェックする
Layout/LineLength:
  Max: 130
  # 下記ファイルはチェックの対象から外す
  Exclude:
    - 'spec/rails_helper.rb'
    - 'spec/spec_helper.rb'

# ブロック内の行数をチェックする
# RSpecは1つのブロックあたりの行数が多くなるため、チェックの除外から外す
Metrics/BlockLength:
  Exclude:
    - 'spec/**/*'

# Assignment: 変数への代入
# Branch: メソッド呼び出し
# Condition: 条件文
# 上記項目をRubocopが計算して基準値を超えると警告を出す（上記頭文字をとって'Abc'）
Metrics/AbcSize:
  Max: 50

# メソッドの中身が複雑になっていないか、Rubocopが計算して基準値を超えると警告を出す
Metrics/PerceivedComplexity:
  Max: 8

# 循環的複雑度が高すぎないかをチェック（ifやforなどを1メソッド内で使いすぎている）
Metrics/CyclomaticComplexity:
  Max: 10

# メソッドの行数が多すぎないかをチェック
Metrics/MethodLength:
  Max: 30

# ネストが深すぎないかをチェック（if文のネストもチェック）
Metrics/BlockNesting:
  Max: 5

# クラスの行数をチェック（無効）
Metrics/ClassLength:
  Enabled: false

# 空メソッドの場合に、1行のスタイルにしない　NG例：def style1; end
Style/EmptyMethod:
  EnforcedStyle: expanded

# クラス内にクラスが定義されていないかチェック（無効）
Style/ClassAndModuleChildren:
  Enabled: false

# 日本語でのコメントを許可
Style/AsciiComments:
  Enabled: false

# クラスやモジュール定義前に、それらの説明書きがあるかをチェック（無効）
Style/Documentation:
  Enabled: false

# ％i（）構文を使用していないシンボルで構成される配列リテラルをチェック（無効）
Style/SymbolArray:
  Enabled: false

# 文字列に値が代入されて変わっていないかチェック（無効）
Style/FrozenStringLiteralComment:
  Enabled: false

# メソッドパラメータ名の最小文字数を設定
Naming/MethodParameterName:
  MinNameLength: 1
```

この設定ファイルは一例であり、チームや開発方針によってルールは変わってきます。実際の開発現場では、そのチームで使われている `.rubocop.yml` を使うことになるでしょう。

ここまでの変更内容をいったんコミットしておきましょう。

```bash
$ git add .
$ git commit -m "Rubocopの初期設定を完了"
```

## Rubocop を実行してコードをチェックする

設定ファイルを用意したので、実際に Rubocop を実行してコードをチェックしてみましょう。Rubocop の実行には、次のコマンドを使います。

```bash
$ bundle exec rubocop
```

実行すると、以下のような出力がターミナルに表示されるはずです。

```bash
$ bundle exec rubocop
Gemfile:59:3: C: [Correctable] Bundler/OrderedGems: Gems should be sorted in an alphabetical order within their section of the Gemfile. Gem rubocop should appear before web-console.
  gem 'rubocop', require: false # 追加
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Gemfile:67:7: C: [Correctable] Style/StringLiterals: Prefer single-quoted strings when you don't need string interpolation or special symbols.
  gem "capybara"
      ^^^^^^^^^^
Gemfile:68:7: C: [Correctable] Style/StringLiterals: Prefer single-quoted strings when you don't need string interpolation or special symbols.
  gem "selenium-webdriver"
      ^^^^^^^^^^^^^^^^^^^^

5 files inspected, 33 offenses detected, 33 offenses autocorrectable
```

出力内容が多少異なる場合もありますが、問題ありません。

### Rubocop の出力内容を理解する

上記の出力内容の一部を抜粋し、読み方を解説します。

```
Gemfile:68:7: C: [Correctable] Style/StringLiterals: Prefer single-quoted strings when you don't need string interpolation or special symbols.
  gem "selenium-webdriver"
      ^^^^^^^^^^^^^^^^^^^^
```

この出力は次のような意味を持っています。

- `Gemfile:68:7` - 修正が望ましいファイル名と行番号、列番号
- `[Correctable]` - 自動で修正可能であることを示す
- `Style/StringLiterals` - 指摘の種類。ここでは、コードスタイル（書き方）に関する指摘
- `Prefer single-quoted strings...` - 指摘の理由と改善方針。ここでは、文字列を囲むには二重引用符(`"`)よりも単一引用符(`'`)を使うべきという指摘

最後の行の `33 offenses detected, 33 offenses autocorrectable` は、全部で33箇所の問題が検出され、そのすべてが自動修正可能であることを示しています。

## 自動修正機能で効率よく修正する

今回の指摘事項を確認すると、ほとんどが二重引用符(`"`)を使っていることに関する指摘です。このようなコードスタイルに関する指摘は内容自体は簡単ですが、一つひとつ手作業で直していくのは大変です。

Rubocop には自動修正機能があり、修正方法が明確で機械的に行える指摘については自動で修正してくれます。自動修正機能を使うには `-a` オプションを付けて実行します。

ただし、自動修正を行う前に、現在の状態をコミットしておくことをおすすめします。これにより、万が一自動修正が意図しない結果を引き起こした場合でも、元に戻すことができます。先ほど `.rubocop.yml` を作成した時点でコミットしたのはこのためです。

では、自動修正を実行しましょう。

```bash
$ bundle exec rubocop -a
...
5 files inspected, 40 offenses detected, 40 offenses corrected
```

先ほどは33箇所の問題が検出されましたが、今回は40箇所の問題が検出され、すべて修正されたと表示されています。これは自動修正の過程で新たに検出された問題も合わせて修正されたためです。

もう一度 Rubocop を実行（自動修正なし）して、問題が解消されたことを確認しましょう。

```bash
$ bundle exec rubocop
Inspecting 5 files
.....

5 files inspected, no offenses detected
```

これでコードの品質が向上し、Ruby の推奨されるスタイルに準拠したコードになりました。

## 変更内容をコミットする

Rubocop による修正が完了したので、変更内容をコミットし、リモートリポジトリに同期しておきましょう。

```bash
$ git add .
$ git commit -m "Rubocop による指摘事項修正"
$ git push
```

## まとめ

本章では、Ruby のコード品質向上ツールである Rubocop について学びました。

- Rubocop はコードの品質やスタイルを検査し、問題を指摘してくれる Linter ツール
- Gemfile に gem を追加し、設定ファイル `.rubocop.yml` を作成することで導入できる
- `bundle exec rubocop` コマンドでコードの検査を行い、問題点を特定できる
- `-a` オプションを使うことで、多くの問題を自動的に修正できる

Rubocop は、個人開発でもチーム開発でも、コードの品質を一定に保つための強力なツールです。常に Rubocop での検査を行い、コード品質を最善に保つよう心がけましょう。

コミットする前に Rubocop を実行する習慣をつけることで、常に高品質なコードを維持できます。これは実際の開発現場でも求められる重要なスキルです。
