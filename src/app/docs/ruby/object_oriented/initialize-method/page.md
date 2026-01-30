---
title: initializeメソッドでインスタンスの初期設定をしよう
nextjs:
  metadata:
    title: initializeメソッドでインスタンスの初期設定をしよう
---

## 学習の目標

本章では、以下の内容を学習します。

- initializeメソッドの役割と基本的な使い方を理解する
- インスタンス作成時に自動的に実行される仕組みを学ぶ
- 引数を受け取るinitializeメソッドの実装方法を習得する
- デフォルト値を持つ引数の設定方法を理解する

## はじめに

今回は、**initializeメソッド**について学んでいきます。

前回までの学習でインスタンス変数について理解しましたが、すべてのインスタンスに共通の初期値を設定したい場合や、インスタンスを作成する際に値を設定したい場合はどうすればよいでしょうか。

そのための特別なメソッドが、initializeメソッドです。initializeメソッドは、インスタンスが作られるときに自動的に呼び出される特別なメソッドで、インスタンスの初期設定を行うのに最適です。

## ファイルの準備

まずは、`initialize.rb`というファイルを作成しましょう。

VS Codeで新しいファイルを作成し、これから説明するコードを記述していきます。

## initializeメソッドの基本

### 基本的なinitializeメソッド

最初に、基本的なinitializeメソッドの使い方を見てみましょう。以下のようなCharacterクラスを定義してみます。

```ruby
class Character
  def initialize
    @name = "名無し"
    @hp = 100
    puts "キャラクターが作られました"
  end

  def show_status
    puts "名前：#{@name}"
    puts "HP：#{@hp}"
  end
end

hero = Character.new    # キャラクターが作られましたと表示される
hero.show_status       # 名前：名無し、HP：100と表示される
```

このコードを実行すると、`Character.new`でインスタンスを作成した時点で「キャラクターが作られました」というメッセージが表示されます。これは、`initialize`メソッドが自動的に呼び出されたことを示しています。

### initializeメソッドの特徴

initializeメソッドには、以下のような特徴があります。

1. `new`でインスタンスを作成すると、自動的に呼び出される
2. インスタンス変数の初期設定を行うのに適している
3. 戻り値を指定しても無視される（常にインスタンス自身が返される）

`initialize`メソッドを定義しておくことで、インスタンス作成時に必要なデータの初期化を一度にまとめて行うことができます。これにより、インスタンス作成後にいくつもメソッドを呼び出して設定する手間が省けます。

## 引数を受け取るinitializeメソッド

### 引数の使い方

initializeメソッドでも、他のメソッドと同様に引数を使うことができます。引数を使うことで、インスタンス作成時に初期値を指定することができます。

```ruby
class Character
  def initialize(name)
    @name = name
    @hp = 100
    puts "#{name}が仲間になりました！"
  end

  def show_status
    puts "名前：#{@name}"
    puts "HP：#{@hp}"
  end
end

hero = Character.new("勇者")      # 勇者が仲間になりました！と表示される
hero.show_status                 # 名前：勇者、HP：100と表示される

wizard = Character.new("魔法使い") # 魔法使いが仲間になりました！と表示される
wizard.show_status              # 名前：魔法使い、HP：100と表示される
```

このコードでは、`initialize`メソッドが`name`という引数を受け取り、それをインスタンス変数`@name`に代入しています。そのため、`Character.new("勇者")`のように引数を指定してインスタンスを作成すると、その値が`@name`に設定されます。

### 複数の引数を受け取る

複数のパラメータを初期化したい場合は、initializeメソッドで複数の引数を受け取ることもできます。

```ruby
class Character
  def initialize(name, hp)
    @name = name
    @hp = hp
    puts "#{name}が現れた！"
    puts "HP：#{hp}"
  end

  def show_status
    puts "名前：#{@name}"
    puts "HP：#{@hp}"
  end
end

hero = Character.new("勇者", 200)
hero.show_status  # 名前：勇者、HP：200と表示される
```

このように、複数の引数を使って複数のインスタンス変数を初期化することも可能です。

## デフォルト値を持つ引数

### デフォルト値の設定方法

initializeメソッドの引数には、デフォルト値を設定することもできます。デフォルト値を設定しておくと、引数が省略された場合にそのデフォルト値が使われます。

```ruby
class Character
  def initialize(name = "名無し", hp = 100)
    @name = name
    @hp = hp
    puts "#{name}が現れた！"
    puts "HP：#{hp}"
  end

  def show_status
    puts "名前：#{@name}"
    puts "HP：#{@hp}"
  end
end

hero = Character.new("勇者", 200)  # 勇者が現れた！HP：200
soldier = Character.new("兵士")    # 兵士が現れた！HP：100
enemy = Character.new             # 名無しが現れた！HP：100
```

この例では、`name`のデフォルト値は「名無し」、`hp`のデフォルト値は`100`に設定されています。

- `hero`の場合：両方の引数を指定しているので、指定した値が使われます。
- `soldier`の場合：`name`だけを指定しているので、`hp`はデフォルト値の`100`が使われます。
- `enemy`の場合：どちらの引数も省略しているので、両方ともデフォルト値が使われます。

### デフォルト値の活用例

デフォルト値は、多くのインスタンスで共通の値を使いつつ、必要に応じて変更できるようにしたい場合に便利です。例えば、以下のようなケースが考えられます。

```ruby
class Product
  def initialize(name, price = 0, tax_rate = 0.1)
    @name = name
    @price = price
    @tax_rate = tax_rate
  end

  def total_price
    @price * (1 + @tax_rate)
  end

  def show_details
    puts "商品名: #{@name}"
    puts "価格: #{@price}円"
    puts "税込価格: #{total_price}円"
  end
end

apple = Product.new("りんご", 100)
apple.show_details  # デフォルトの税率(0.1)が使われる

imported_wine = Product.new("輸入ワイン", 5000, 0.2)
imported_wine.show_details  # 税率を0.2に指定
```

この例では、ほとんどの商品で税率は10%（0.1）ですが、一部の商品だけ税率が異なる場合に対応できます。

## 実践的なinitializeメソッドの使い方

### 値の検証

initializeメソッド内で引数の値を検証することもできます。例えば、HPが負の値にならないようにチェックする例を見てみましょう。

```ruby
class Character
  def initialize(name = "名無し", hp = 100)
    @name = name

    # HPが0未満なら0に設定する
    @hp = hp < 0 ? 0 : hp

    puts "#{name}が現れた！"
    puts "HP：#{@hp}"
  end

  def show_status
    puts "名前：#{@name}"
    puts "HP：#{@hp}"
  end
end

injured_hero = Character.new("傷ついた勇者", -50)
injured_hero.show_status  # HPは0になる
```

このコードでは、HPが負の値の場合は0に設定するようにしています。このような値の検証や調整をinitializeメソッド内で行うことで、インスタンス変数に不正な値が設定されることを防ぐことができます。

### 複数のインスタンス変数の計算

initializeメソッド内で、引数から複数のインスタンス変数を計算することもできます。

```ruby
class Rectangle
  def initialize(width, height)
    @width = width
    @height = height
    @area = width * height
    @perimeter = 2 * (width + height)
  end

  def show_details
    puts "幅: #{@width}"
    puts "高さ: #{@height}"
    puts "面積: #{@area}"
    puts "周囲の長さ: #{@perimeter}"
  end
end

rect = Rectangle.new(5, 3)
rect.show_details
```

この例では、幅と高さから面積と周囲の長さを計算し、それぞれインスタンス変数に保存しています。

## まとめ

今回は、initializeメソッドについて学びました。

initializeメソッドは、インスタンスが作られるときに自動的に呼ばれる特別なメソッドです。このメソッドを使うことで、インスタンスの初期設定を簡単に行うことができます。

引数を使うことで、インスタンスを作るときに初期値を指定することができます。また、デフォルト値を設定することで、引数の省略にも対応できます。

initializeメソッドを適切に活用することで、インスタンスの作成と初期化を効率的に行い、より読みやすく保守しやすいコードを書くことができます。

次回以降も、オブジェクト指向プログラミングの様々な概念を学んでいきましょう。
