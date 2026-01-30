---
title: 真偽値の基本を理解しよう
nextjs:
  metadata:
    title: 真偽値の基本を理解しよう
    description: Pythonでの真偽値（True/False）の基本概念を学び、比較演算子の使い方、真偽値を変数に保存する方法、簡単な判定処理の実装方法を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- TrueとFalseの基本概念を理解する
- 比較演算子の使い方を習得する
- 真偽値を変数に保存する方法を学ぶ
- 簡単な判定処理の実装方法を身につける

## 真偽値とは何か

**真偽値**とは、「正しい」か「正しくない」かを表すデータの種類です。Pythonでは、`True`（真）と `False`（偽）の2つの値だけを持ちます。

真偽値は、条件を判定したり、何かを比較したりする場面でよく使われます。例えば、「年齢が20歳以上かどうか」や「パスワードが正しいかどうか」といった判定で活用されます。

VS Codeで新しいファイル `boolean_practice.py` を作成して、真偽値の基本的な使い方を学んでいきましょう。

## TrueとFalseの基本

### 基本的な真偽値

Pythonでは、`True` と `False` という2つの真偽値があります。これらは特別な値で、必ず最初の文字を大文字にする必要があります。

```python
is_sunny = True
is_raining = False

print(is_sunny)
print(is_raining)
```

実行すると、以下のように表示されます。

```
True
False
```

### 真偽値の型確認

真偽値も数値や文字列と同じように、データの種類（型）があります。`type()` 関数で確認してみましょう。

```python
result = True
print(type(result))
```

実行結果は以下のようになります。

```
<class 'bool'>
```

`bool` は boolean（ブール値）の略で、真偽値を表す型です。

## 比較演算子の使い方

### 等しいかどうかの比較（==）

2つの値が等しいかどうかを比較するには、`==` を使います。注意点として、代入に使う `=` とは異なることを覚えておきましょう。

```python
age = 20
result = age == 20

print(result)
```

実行すると、以下のように表示されます。

```
True
```

`age` の値が `20` なので、`age == 20` の結果は `True` になります。

### 等しくないかどうかの比較（!=）

2つの値が等しくないかどうかを比較するには、`!=` を使います。

```python
name = "太郎"
result = name != "花子"

print(result)
```

実行結果は以下のようになります。

```
True
```

`name` は「太郎」で「花子」ではないので、結果は `True` になります。

### 大小の比較

数値同士を比較する場合は、大小関係を調べることもできます。

```python
score = 85

# より大きい
result1 = score > 80
print(f"{score} > 80: {result1}")

# より小さい
result2 = score < 90
print(f"{score} < 90: {result2}")

# 以上
result3 = score >= 85
print(f"{score} >= 85: {result3}")

# 以下
result4 = score <= 100
print(f"{score} <= 100: {result4}")
```

実行すると、以下のような結果が表示されます。

```
85 > 80: True
85 < 90: True
85 >= 85: True
85 <= 100: True
```

すべての条件が満たされているため、すべて `True` になっています。

## 真偽値を変数に保存

### 判定結果を変数に保存

比較の結果を変数に保存して、後で使うことができます。

```python
age = 18
is_adult = age >= 20

print(f"年齢: {age}")
print(f"成人かどうか: {is_adult}")
```

実行すると、以下のように表示されます。

```
年齢: 18
成人かどうか: False
```

18歳は20歳未満なので、`is_adult` の値は `False` になります。

### 複数の判定を行う

複数の条件を判定して、それぞれを変数に保存することもできます。

```python
temperature = 25

is_hot = temperature > 30
is_cold = temperature < 10
is_comfortable = temperature >= 20

print(f"気温: {temperature}度")
print(f"暑い: {is_hot}")
print(f"寒い: {is_cold}")
print(f"快適: {is_comfortable}")
```

実行結果は以下のようになります。

```
気温: 25度
暑い: False
寒い: False
快適: True
```

## 簡単な判定処理

### パスワードチェック

真偽値を使って、簡単なパスワードチェックを行ってみましょう。

```python
correct_password = "abc123"
user_input = "abc123"

is_correct = user_input == correct_password

print(f"入力されたパスワード: {user_input}")
print(f"パスワードが正しい: {is_correct}")
```

実行すると、以下のように表示されます。

```
入力されたパスワード: abc123
パスワードが正しい: True
```

### 成績判定

点数に基づいて合格かどうかを判定してみましょう。

```python
math_score = 75
english_score = 82
passing_score = 80

math_passed = math_score >= passing_score
english_passed = english_score >= passing_score

print(f"数学: {math_score}点 (合格: {math_passed})")
print(f"英語: {english_score}点 (合格: {english_passed})")
```

実行結果は以下のようになります。

```
数学: 75点 (合格: False)
英語: 82点 (合格: True)
```

数学は80点未満なので不合格（False）、英語は80点以上なので合格（True）となっています。

## 文字列の比較

### 文字列同士の比較

数値だけでなく、文字列同士も比較することができます。

```python
favorite_color = "青"
user_choice = "赤"

is_same = favorite_color == user_choice

print(f"好きな色: {favorite_color}")
print(f"選んだ色: {user_choice}")
print(f"同じ色: {is_same}")
```

実行すると、以下のように表示されます。

```
好きな色: 青
選んだ色: 赤
同じ色: False
```

「青」と「赤」は異なるので、結果は `False` になります。

### 大文字小文字の区別

文字列の比較では、大文字と小文字は区別されます。

```python
word1 = "Hello"
word2 = "hello"

is_same = word1 == word2

print(f"単語1: {word1}")
print(f"単語2: {word2}")
print(f"同じ単語: {is_same}")
```

実行結果は以下のようになります。

```
単語1: Hello
単語2: hello
同じ単語: False
```

「Hello」と「hello」は大文字小文字が異なるため、`False` になります。

## 真偽値を活用してみよう

ここまで学んだ真偽値の知識を組み合わせて、実用的なプログラムを作ってみましょう。

```python
# 商品購入の条件チェック
item_price = 1500
user_money = 2000
minimum_age = 18
user_age = 20

# 各条件をチェック
has_enough_money = user_money >= item_price
is_old_enough = user_age >= minimum_age

print(f"商品価格: {item_price}円")
print(f"所持金: {user_money}円")
print(f"お金が足りる: {has_enough_money}")
print()
print(f"年齢制限: {minimum_age}歳以上")
print(f"あなたの年齢: {user_age}歳")
print(f"年齢条件を満たす: {is_old_enough}")
```

このプログラムを実行すると、以下のような結果が表示されます。

```
商品価格: 1500円
所持金: 2000円
お金が足りる: True

年齢制限: 18歳以上
あなたの年齢: 20歳
年齢条件を満たす: True
```

どちらの条件も満たしているので、両方とも `True` になっています。

## まとめ

本章では、Pythonでの真偽値の基本について学習しました。習得できた内容は以下の通りです。

`True` と `False` という2つの真偽値の基本概念を理解しました。比較演算子（==、!=、>、<、>=、<=）を使って値を比較し、その結果として真偽値を得る方法を習得しました。

また、比較結果を変数に保存して後で活用する方法を学び、数値だけでなく文字列の比較も行えることを理解しました。真偽値を使った簡単な判定処理により、条件に基づいた判断をプログラムで表現できるようになりました。

真偽値は、プログラムで条件分岐や繰り返し処理を行う際の基礎となる重要な概念です。今後学ぶif文やwhile文でも真偽値を頻繁に使うことになりますので、しっかりと理解しておきましょう。