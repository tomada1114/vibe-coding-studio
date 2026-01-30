---
title: selfを使ってコードをスッキリさせよう
nextjs:
  metadata:
    title: selfを使ってコードをスッキリさせよう
---

## 学習の目標

本章では、以下の内容を学習します。

- selfとは何かを理解する
- selfを使ってコードを読みやすくする方法を学ぶ
- attr_accessorとselfを組み合わせる方法を習得する
- selfが必要な場面と省略できる場面を知る

## はじめに

プログラミングでは、自分自身を表現する方法が必要です。人間が「私は〜です」と言うように、プログラムの中でも「自分は〜です」と表現できると便利ですね。

Rubyでは、この「自分自身」を指し示すために、**self**というキーワードを使います。selfを使うと、コードがすっきりと整理され、読みやすくなります。

実際にコードを書きながら、selfの使い方を見ていきましょう。

## selfを使わない基本的な実装

まずは、selfを使わないクラスの例を見てみましょう。

VS Codeを開いて、`self.rb`というファイルを作成し、次のコードを入力してください。

```ruby
class User
  def initialize(name)
    @name = name
  end

  def name
    @name
  end

  def set_name(new_name)
    @name = new_name
  end

  def greet
    puts "こんにちは、#{@name}です"
  end
end
```

このコードでは、Userというクラスを作成しています。このクラスには次の機能があります。

1. `initialize`: 最初に名前を設定する
2. `name`: 名前を取得する
3. `set_name`: 名前を変更する
4. `greet`: 挨拶文を表示する

このクラスの動作を確認するために、次のコードを追加しましょう。

```ruby
# ユーザーを作成
user = User.new("山田")
puts user.name  # 「山田」と表示されます

# 名前を変更
user.set_name("鈴木")
puts user.name  # 「鈴木」と表示されます

# 挨拶を表示
user.greet  # 「こんにちは、鈴木です」と表示されます
```

このコードは問題なく動きますが、いくつか気になる点があります。

1. `@name`という書き方が何度も出てきて、繰り返しが多い
2. 名前を変更するメソッド名が`set_name`と少し長い
3. `@name`に直接アクセスしている箇所が多い

もっと簡単に書く方法があります。それが`attr_accessor`と`self`の組み合わせです。

先ほどのコードを`attr_accessor`と`self`を使って書き直してみましょう。

```ruby
class User
  attr_accessor :name

  def initialize(name)
    self.name = name
  end

  def greet
    puts "こんにちは、#{self.name}です"
  end
end

# 動作確認
user = User.new("山田")
puts user.name  # 「山田」と表示されます

user.name = "鈴木"  # 直感的に名前を変更できます
puts user.name  # 「鈴木」と表示されます

user.greet  # 「こんにちは、鈴木です」と表示されます
```

行なった改善の詳細について、一つずつ見ていきましょう。

まず一つ目は `attr_accessor` です。

```ruby
attr_accessor :name
```

この1行で、先ほど手動で書いた`name`メソッドと`set_name`メソッドが自動的に作られます。さらに、`set_name`の代わりに`name=`という直感的な名前になります。

これにより、コードの量が減り、読みやすくなりました。

次に、`self`の使い方です。

```ruby
def initialize(name)
  self.name = name
end

def greet
  puts "こんにちは、#{self.name}です"
end
```

ここで`self`は「このオブジェクト自身」を意味します。

`self.name = name`は「このオブジェクトの`name=`メソッドを使って、引数の`name`の値を設定する」という意味です。

同様に、`self.name`は「このオブジェクトの`name`メソッドを使う」という意味です。

## 補足: selfの省略

定義された変数を使う場合、`self`を省略することもできます。例えば、以下のように `name` を `self` で参照するコードがあったとします。

```ruby
def greet
  puts "こんにちは、#{self.name}です"
end
```

この場合、`self`を省略して次のように書くこともできます。

```ruby
def greet
  puts "こんにちは、#{name}です"
end
```

どちらも同じ意味ですが、`self`を省略することでコードがすっきりします。

ただし、`self`を省略できるのは、メソッドの中で自分自身のインスタンス変数やメソッドにアクセスする場合だけです。`initialize`メソッドの中の `self.name = name` のように、新たに値を設定する場合は、`self`を使う必要があります。

```ruby
# NG
def initialize(name)
  name = name
end

# OK
def initialize(name)
  self.name = name
end
```

このように、`self`を使うことで、どの変数がどのオブジェクトに属しているのかが明確になります。

慣れないうちはあえて省略せずに、`self`を使うことをお勧めします。そうすることで、コードの可読性が向上し、後から見返したときに理解しやすくなります。

## まとめ

本章では、selfの基本的な使い方について学びました。以下のポイントを理解できたことと思います。

- selfは「このオブジェクト自身」を指すキーワードである
- attr_accessorとselfを組み合わせると、コードをすっきりと書ける
- selfを使うことで、インスタンス変数に直接アクセスする代わりに、メソッドを通してアクセスできる
- selfを省略できる場面と省略できない場面がある

selfを適切に使うことで、より読みやすく、メンテナンスしやすいコードを書くことができます。初めは少し慣れが必要かもしれませんが、使いこなせるようになると、Rubyらしい簡潔なコードが書けるようになります。
