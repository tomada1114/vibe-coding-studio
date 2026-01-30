---
title: 関数を使ったプログラムを作ろう
nextjs:
  metadata:
    title: 関数を使ったプログラムを作ろう
    description: Pythonで学習した関数の機能を組み合わせて実用的なプログラムを作成。数値判定ゲームやFizzBuzz風プログラムを通して関数の活用方法を学習します。
---

## 学習の目標

本章では、以下の内容を学習します。

- これまで学んだ関数の機能を組み合わせる方法を理解する
- 数値を判定する関数を作って活用する
- FizzBuzz風のプログラムを関数で作成する
- 関数を使ったプログラムの設計方法を学ぶ

## はじめに

これまでに、引数を受け取る関数や戻り値を返す関数を学んできました。今度は、これらの機能を組み合わせて、実際に動くプログラムを作ってみましょう。

今回作るのは、数値に関する簡単な判定を行うプログラムです。関数を使うことで、プログラムがどのように整理され、読みやすくなるかを体験してみてください。

## 数値判定プログラムを作ろう

まずは、数値がどのような特徴を持つかを判定する関数をいくつか作ってみましょう。VS Codeで新しいファイル`number_checker.py`を作成して、以下のコードを入力してください。

```python
def is_even(number):
    """数値が偶数かどうかを判定する"""
    if number % 2 == 0:
        return True
    else:
        return False

def is_positive(number):
    """数値が正の数かどうかを判定する"""
    if number > 0:
        return True
    else:
        return False

# 関数をテストしてみる
test_number = 8

print("数値: " + str(test_number))
print("偶数？ " + str(is_even(test_number)))
print("正の数？ " + str(is_positive(test_number)))
```

ここでは、偶数かどうかを判定する`is_even`関数と、正の数かどうかを判定する`is_positive`関数を作りました。`%`演算子は余りを求める演算子で、2で割った余りが0なら偶数ということになります。

実行してみましょう。

```bash
python number_checker.py
```

実行結果は以下のようになります。

```
数値: 8
偶数？ True
正の数？ True
```

## 判定結果を使って分類する関数を作ろう

次に、これらの判定関数を使って、数値を分類する関数を作ってみましょう。

```python
def is_even(number):
    """数値が偶数かどうかを判定する"""
    if number % 2 == 0:
        return True
    else:
        return False

def is_positive(number):
    """数値が正の数かどうかを判定する"""
    if number > 0:
        return True
    else:
        return False

def describe_number(number):
    """数値の特徴を説明する"""
    description = str(number) + "は"
    
    if is_positive(number):
        description = description + "正の数で、"
    else:
        description = description + "負の数または0で、"
    
    if is_even(number):
        description = description + "偶数です。"
    else:
        description = description + "奇数です。"
    
    return description

# いろいろな数値で試してみる
numbers = [6, -3, 0, 15]

for num in numbers:
    result = describe_number(num)
    print(result)
```

`describe_number`関数では、先ほど作った2つの判定関数を使って、数値の特徴を文章で説明しています。関数を組み合わせることで、複雑な処理を分かりやすく書くことができました。

実行結果は以下のようになります。

```
6は正の数で、偶数です。
-3は負の数または0で、奇数です。
0は負の数または0で、偶数です。
15は正の数で、奇数です。
```

## FizzBuzz風プログラムを作ろう

次に、有名なFizzBuzz問題を関数を使って解いてみましょう。FizzBuzzは、数値が3で割り切れるときは「Fizz」、5で割り切れるときは「Buzz」、両方で割り切れるときは「FizzBuzz」と表示する問題です。

```python
def is_divisible_by_3(number):
    """3で割り切れるかどうかを判定する"""
    return number % 3 == 0

def is_divisible_by_5(number):
    """5で割り切れるかどうかを判定する"""
    return number % 5 == 0

def fizzbuzz_check(number):
    """FizzBuzzの判定を行う"""
    if is_divisible_by_3(number) and is_divisible_by_5(number):
        return "FizzBuzz"
    elif is_divisible_by_3(number):
        return "Fizz"
    elif is_divisible_by_5(number):
        return "Buzz"
    else:
        return str(number)

# 1から20まで試してみる
print("FizzBuzzプログラム:")
for i in range(1, 21):
    result = fizzbuzz_check(i)
    print(str(i) + " → " + result)
```

このプログラムでは、判定処理を小さな関数に分けて、最後に`fizzbuzz_check`関数でそれらを組み合わせています。各関数が一つの責任だけを持つため、プログラムが理解しやすくなっています。

実行結果は以下のようになります。

```
FizzBuzzプログラム:
1 → 1
2 → 2
3 → Fizz
4 → 4
5 → Buzz
6 → Fizz
7 → 7
8 → 8
9 → Fizz
10 → Buzz
11 → 11
12 → Fizz
13 → 13
14 → 14
15 → FizzBuzz
16 → 16
17 → 17
18 → Fizz
19 → 19
20 → Buzz
```

## 対話型の数値チェッカーを作ろう

最後に、ユーザーから数値を入力してもらって、その数値の特徴を表示する対話型プログラムを作ってみましょう。

```python
def is_even(number):
    """数値が偶数かどうかを判定する"""
    return number % 2 == 0

def is_positive(number):
    """数値が正の数かどうかを判定する"""
    return number > 0

def fizzbuzz_check(number):
    """FizzBuzzの判定を行う"""
    if number % 3 == 0 and number % 5 == 0:
        return "FizzBuzz"
    elif number % 3 == 0:
        return "Fizz"
    elif number % 5 == 0:
        return "Buzz"
    else:
        return str(number)

def analyze_number(number):
    """数値を総合的に分析する"""
    print("=== 数値分析結果 ===")
    print("入力された数値: " + str(number))
    print("偶数？ " + str(is_even(number)))
    print("正の数？ " + str(is_positive(number)))
    print("FizzBuzz判定: " + fizzbuzz_check(number))

# メインプログラム
print("数値チェッカーにようこそ！")
user_input = input("数値を入力してください: ")
number = int(user_input)
analyze_number(number)
```

このプログラムでは、これまで作った関数を組み合わせて、ユーザーが入力した数値の様々な特徴を一度に表示しています。

実行してみると、以下のような結果になります。

```
数値チェッカーにようこそ！
数値を入力してください: 15
=== 数値分析結果 ===
入力された数値: 15
偶数？ False
正の数？ True
FizzBuzz判定: FizzBuzz
```

## 関数を使うことの効果

このプログラムを作ることで、関数を使うことの効果を実感できたことと思います。

**処理が整理される**
判定処理や分析処理など、それぞれの処理が独立した関数になることで、プログラム全体の構造が明確になります。

**再利用しやすい**
一度作った関数は、他の部分でも簡単に使うことができます。`is_even`関数や`fizzbuzz_check`関数は、様々な場面で活用できます。

**修正しやすい**
もし判定ロジックを変更したい場合、該当する関数だけを修正すれば、その変更がプログラム全体に反映されます。

**テストしやすい**
各関数が独立しているため、それぞれの関数が正しく動作するかを個別にテストすることができます。

## まとめ

本章では、これまで学んだ関数の機能を組み合わせて、実用的なプログラムを作成しました。

数値の判定を行う関数、FizzBuzzの判定を行う関数、そしてそれらを組み合わせた分析関数を作ることで、関数を使ったプログラム設計の基本を学びました。関数を適切に分けることで、プログラムが読みやすく、保守しやすくなることを体験できました。

関数は単体で使うだけでなく、組み合わせることで真価を発揮します。今回学んだ考え方を活かして、より複雑で実用的なプログラムを作っていきましょう。