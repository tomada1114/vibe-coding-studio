---
title: 自分でモジュールを作ってみよう
nextjs:
  metadata:
    title: 自分でモジュールを作ってみよう
    description: Pythonで独自のモジュールを作成し、他のファイルから関数を呼び出して再利用する方法を初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 自分でモジュールを作る方法を理解する
- .pyファイルをモジュールとして使用する方法を学ぶ
- 便利な関数をまとめたモジュールの作成方法を習得する
- モジュールの再利用方法を学ぶ

## はじめに

これまで`math`や`random`といった、すでに用意されているモジュールを使ってきました。実は、自分で作った関数も、モジュールとして他のプログラムから使うことができます。

Pythonでは、`.py`ファイルに関数を書いておけば、それを別の`.py`ファイルから読み込んで使えるのです。これにより、一度作った便利な関数を何度でも再利用できるようになります。

今回は、実際に自分でモジュールを作って、それを使ってみましょう。

## 最初のモジュールを作ってみよう

まずは、簡単な関数をモジュールとして作成してみましょう。VS Codeで`my_functions.py`というファイルを作成してください。

```python
# my_functions.py
def greet(name):
    """挨拶をする関数"""
    return f"こんにちは、{name}さん！"

def add_numbers(a, b):
    """2つの数を足す関数"""
    return a + b

def calculate_area(radius):
    """円の面積を計算する関数"""
    return 3.14 * radius * radius
```

このファイルには、3つの関数が定義されています。挨拶をする関数、数値を足す関数、円の面積を計算する関数です。

次に、このモジュールを使う側のプログラムを作ってみましょう。新しく`use_module.py`というファイルを作成してください。

```python
# use_module.py
import my_functions

# モジュールの関数を使用
message = my_functions.greet("田中")
print(message)

result = my_functions.add_numbers(10, 20)
print("計算結果:", result)

area = my_functions.calculate_area(5)
print("円の面積:", area)
```

プログラムを実行してみましょう。

```bash
python use_module.py
```

実行結果：

```
こんにちは、田中さん！
計算結果: 30
円の面積: 78.5
```

自分で作った`my_functions.py`を`import`文で読み込み、その中の関数を使うことができました。`my_functions.関数名()`の形で呼び出します。

## fromを使った読み込み方法

必要な関数だけを読み込むこともできます。新しく`use_module2.py`というファイルを作成してください。

```python
# use_module2.py
from my_functions import greet, add_numbers

# モジュール名を付けずに関数を使用
message = greet("佐藤")
print(message)

result = add_numbers(5, 15)
print("計算結果:", result)
```

プログラムを実行してみましょう。

```bash
python use_module2.py
```

実行結果：

```
こんにちは、佐藤さん！
計算結果: 20
```

`from モジュール名 import 関数名`とすることで、モジュール名を付けずに関数を使えるようになります。必要な関数だけを選んで読み込めるので、コードがシンプルになります。

## 便利な計算モジュールを作ってみよう

今度は、もう少し実用的なモジュールを作ってみましょう。新しく`calculator.py`というファイルを作成してください。

```python
# calculator.py
def multiply(a, b):
    """掛け算をする関数"""
    return a * b

def divide(a, b):
    """割り算をする関数"""
    if b == 0:
        return "0で割ることはできません"
    return a / b

def power(base, exponent):
    """べき乗を計算する関数"""
    return base ** exponent

def is_even(number):
    """偶数かどうかを判定する関数"""
    return number % 2 == 0
```

このモジュールを使うプログラムも作ってみましょう。新しく`test_calculator.py`というファイルを作成してください。

```python
# test_calculator.py
from calculator import multiply, divide, power, is_even

print("=== 計算テスト ===")

# 各関数をテスト
print("5 × 3 =", multiply(5, 3))
print("10 ÷ 2 =", divide(10, 2))
print("2の3乗 =", power(2, 3))
print("4は偶数？", is_even(4))
print("7は偶数？", is_even(7))
```

プログラムを実行してみましょう。

```bash
python test_calculator.py
```

実行結果：

```
=== 計算テスト ===
5 × 3 = 15
10 ÷ 2 = 5.0
2の3乗 = 8
4は偶数？ True
7は偶数？ False
```

このように、関連する機能をまとめてモジュールにすることで、コードの整理ができ、再利用も簡単になります。

## ゲーム用のモジュールを作ってみよう

最後に、ゲームでよく使う機能をまとめたモジュールを作ってみましょう。新しく`game_utils.py`というファイルを作成してください。

```python
# game_utils.py
import random

def roll_dice():
    """サイコロを振る関数"""
    return random.randint(1, 6)

def flip_coin():
    """コインを投げる関数"""
    return random.choice(["表", "裏"])

def random_choice_from_list(items):
    """リストからランダムに選ぶ関数"""
    return random.choice(items)

def create_random_number(min_val, max_val):
    """指定した範囲でランダムな数を作る関数"""
    return random.randint(min_val, max_val)
```

このモジュールを使って、簡単なゲームを作ってみましょう。新しく`simple_game.py`というファイルを作成してください。

```python
# simple_game.py
from game_utils import roll_dice, flip_coin, random_choice_from_list

print("=== 簡単なゲーム ===")

# サイコロゲーム
dice_result = roll_dice()
print(f"サイコロの結果: {dice_result}")

# コイン投げ
coin_result = flip_coin()
print(f"コインの結果: {coin_result}")

# ランダム選択
foods = ["ラーメン", "カレー", "パスタ", "寿司"]
selected_food = random_choice_from_list(foods)
print(f"今日の夕食: {selected_food}")
```

プログラムを実行してみましょう。

```bash
python simple_game.py
```

実行結果の例：

```
=== 簡単なゲーム ===
サイコロの結果: 4
コインの結果: 表
今日の夕食: カレー
```

このように、よく使う機能をモジュールにまとめておくことで、他のプログラムでも簡単に再利用できるようになります。

## モジュール作成のコツ

モジュールを作る際のポイントをまとめておきましょう。

**関連する機能をまとめる**
似たような機能や、一緒に使うことが多い機能をひとつのモジュールにまとめると使いやすくなります。

**分かりやすい関数名を付ける**
後で見返した時に、何をする関数なのかがすぐに分かるような名前を付けましょう。

**コメントを書く**
関数が何をするものなのかを、簡単なコメントで説明しておくと良いでしょう。

## まとめ

本章では、自分でモジュールを作る方法について学習しました。

Pythonでは、`.py`ファイルに関数を書いておけば、それを別のファイルから`import`文で読み込んで使うことができます。`import モジュール名`または`from モジュール名 import 関数名`の形で読み込めます。

関連する機能をまとめてモジュールにすることで、コードの整理ができ、再利用も簡単になります。計算用の関数、ゲーム用の関数など、用途に応じてモジュールを作り分けることで、効率的にプログラムを開発できるようになります。

一度作ったモジュールは、何度でも使い回すことができるので、便利な関数を見つけたらモジュールにまとめておくと良いでしょう。