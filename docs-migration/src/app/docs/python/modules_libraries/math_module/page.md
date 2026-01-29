---
title: 数学計算のモジュールを使ってみよう
nextjs:
  metadata:
    title: 数学計算のモジュールを使ってみよう
    description: Pythonのmathモジュールを使って三角関数、対数関数、円周率などの数学計算を行う方法を初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- mathモジュールの基本的な使い方を習得する
- 三角関数を使った計算方法を学ぶ
- 対数関数の基本を理解する
- 円周率と自然対数の定数を活用する
- 数学計算を使ったプログラムの作成方法を学ぶ

## はじめに

前回の章では、モジュールの基本的な概念について学びました。今回は、その中でも特に`math`モジュールに焦点を当てて、様々な数学計算を行ってみましょう。

`math`モジュールには、学校で習った数学の計算から、より高度な計算まで、たくさんの便利な機能が用意されています。電卓では計算できないような複雑な計算も、Pythonなら簡単に行うことができます。

実際にコードを書きながら、数学の世界をPythonで体験してみましょう。

## mathモジュールの基本機能

まずは、`math`モジュールでできる基本的な計算から始めてみましょう。VS Codeで`math_basics.py`というファイルを作成してください。

### 平方根と累乗の計算

```python
import math

# 平方根の計算
print("16の平方根:", math.sqrt(16))
print("2の平方根:", math.sqrt(2))

# 累乗の計算
print("2の3乗:", math.pow(2, 3))
print("5の2乗:", math.pow(5, 2))
```

このプログラムを実行してみましょう。

```bash
python math_basics.py
```

実行結果は以下のようになります。

```
16の平方根: 4.0
2の平方根: 1.4142135623730951
2の3乗: 8.0
5の2乗: 25.0
```

`math.sqrt()`は平方根を計算し、`math.pow()`は累乗を計算する関数です。計算結果が小数で表示されることに注意してください。

### 絶対値と切り上げ・切り下げ

数学でよく使われる絶対値や、小数を整数にする機能も見てみましょう。先ほどのコードに追加してください。

```python
import math

# 平方根の計算
print("16の平方根:", math.sqrt(16))
print("2の平方根:", math.sqrt(2))

# 累乗の計算
print("2の3乗:", math.pow(2, 3))
print("5の2乗:", math.pow(5, 2))

# ここから追加
# 絶対値
print("-10の絶対値:", math.fabs(-10))
print("3.5の絶対値:", math.fabs(3.5))

# 切り上げと切り下げ
print("3.2を切り上げ:", math.ceil(3.2))
print("3.8を切り下げ:", math.floor(3.8))
```

プログラムを実行してみましょう。

```bash
python math_basics.py
```

実行結果は以下のようになります。

```
16の平方根: 4.0
2の平方根: 1.4142135623730951
2の3乗: 8.0
5の2乗: 25.0
-10の絶対値: 10.0
3.5の絶対値: 3.5
3.2を切り上げ: 4
3.8を切り下げ: 3
```

`math.fabs()`は絶対値を計算し、`math.ceil()`は切り上げ、`math.floor()`は切り下げを行います。

## 円周率と自然対数の定数

`math`モジュールには、数学でよく使われる重要な定数が用意されています。新しく`math_constants.py`というファイルを作成してみましょう。

```python
import math

# 円周率πの値
print("円周率π:", math.pi)

# 自然対数の底eの値
print("自然対数の底e:", math.e)

# 円周率を使った計算
radius = 5
area = math.pi * radius * radius
print(f"半径{radius}の円の面積:", area)

circumference = 2 * math.pi * radius
print(f"半径{radius}の円の円周:", circumference)
```

プログラムを実行してみましょう。

```bash
python math_constants.py
```

実行結果は以下のようになります。

```
円周率π: 3.141592653589793
自然対数の底e: 2.718281828459045
半径5の円の面積: 78.53981633974483
半径5の円の円周: 31.41592653589793
```

これまで「3.14」のような近似値を使っていた円周率も、`math.pi`を使うことで正確な値を使った計算ができるようになります。

## 三角関数を使った計算

`math`モジュールには、三角関数の計算機能も含まれています。ただし、Pythonの三角関数は**ラジアン**という単位で計算を行います。

### 度からラジアンへの変換

まず、度をラジアンに変換する方法を学びましょう。`trigonometry.py`というファイルを作成してください。

```python
import math

# 角度を度からラジアンに変換
angle_degrees = 30
angle_radians = math.radians(angle_degrees)

print(f"{angle_degrees}度をラジアンに変換:", angle_radians)

# 三角関数の計算
sin_value = math.sin(angle_radians)
cos_value = math.cos(angle_radians)
tan_value = math.tan(angle_radians)

print(f"{angle_degrees}度のサイン:", sin_value)
print(f"{angle_degrees}度のコサイン:", cos_value)
print(f"{angle_degrees}度のタンジェント:", tan_value)
```

プログラムを実行してみましょう。

```bash
python trigonometry.py
```

実行結果は以下のようになります。

```
30度をラジアンに変換: 0.5235987755982988
30度のサイン: 0.49999999999999994
30度のコサイン: 0.8660254037844387
30度のタンジェント: 0.5773502691896257
```

### よく使われる角度での計算

いくつかの代表的な角度で三角関数の値を計算してみましょう。先ほどのコードに追加してください。

```python
import math

# 角度を度からラジアンに変換
angle_degrees = 30
angle_radians = math.radians(angle_degrees)

print(f"{angle_degrees}度をラジアンに変換:", angle_radians)

# 三角関数の計算
sin_value = math.sin(angle_radians)
cos_value = math.cos(angle_radians)
tan_value = math.tan(angle_radians)

print(f"{angle_degrees}度のサイン:", sin_value)
print(f"{angle_degrees}度のコサイン:", cos_value)
print(f"{angle_degrees}度のタンジェント:", tan_value)

# ここから追加
print("\n--- よく使われる角度での計算 ---")

angles = [0, 30, 45, 60, 90]

for angle in angles:
    radian = math.radians(angle)
    sin_val = math.sin(radian)
    cos_val = math.cos(radian)
    
    print(f"{angle}度: サイン={sin_val:.3f}, コサイン={cos_val:.3f}")
```

プログラムを実行してみましょう。

```bash
python trigonometry.py
```

実行結果は以下のようになります。

```
30度をラジアンに変換: 0.5235987755982988
30度のサイン: 0.49999999999999994
30度のコサイン: 0.8660254037844387
30度のタンジェント: 0.5773502691896257

--- よく使われる角度での計算 ---
0度: サイン=0.000, コサイン=1.000
30度: サイン=0.500, コサイン=0.866
45度: サイン=0.707, コサイン=0.707
60度: サイン=0.866, コサイン=0.500
90度: サイン=1.000, コサイン=0.000
```

小数点以下3桁まで表示するために、`:.3f`という書式を使っています。これにより、見やすい形で結果を確認できます。

## 対数関数の基本

対数は、「何乗すればその数になるか」を表す計算です。`math`モジュールには、様々な対数計算の機能があります。

新しく`logarithm.py`というファイルを作成してください。

```python
import math

# 自然対数（底がeの対数）
print("1の自然対数:", math.log(1))
print("eの自然対数:", math.log(math.e))
print("10の自然対数:", math.log(10))

# 10を底とする対数（常用対数）
print("1の常用対数:", math.log10(1))
print("10の常用対数:", math.log10(10))
print("100の常用対数:", math.log10(100))

# 2を底とする対数
print("1の2を底とする対数:", math.log2(1))
print("2の2を底とする対数:", math.log2(2))
print("8の2を底とする対数:", math.log2(8))
```

プログラムを実行してみましょう。

```bash
python logarithm.py
```

実行結果は以下のようになります。

```
1の自然対数: 0.0
eの自然対数: 1.0
10の自然対数: 2.302585092994046
1の常用対数: 0.0
10の常用対数: 1.0
100の常用対数: 2.0
1の2を底とする対数: 0.0
2の2を底とする対数: 1.0
8の2を底とする対数: 3.0
```

対数は少し難しい概念ですが、「2の3乗は8」ということから「8の2を底とする対数は3」という結果が出ていることが分かります。

## 簡単な計算プログラムを作ってみよう

これまで学んだ`math`モジュールの機能を使って、簡単な計算プログラムを作ってみましょう。`math_calculator.py`というファイルを作成してください。

```python
import math

print("=== 数学計算プログラム ===")

# ユーザーから半径を入力してもらい、円の面積と円周を計算
radius = float(input("円の半径を入力してください: "))

area = math.pi * radius * radius
circumference = 2 * math.pi * radius

print(f"半径{radius}の円の面積: {area:.2f}")
print(f"半径{radius}の円の円周: {circumference:.2f}")

print()

# ユーザーから角度を入力してもらい、三角関数の値を計算
angle = float(input("角度（度）を入力してください: "))
radian = math.radians(angle)

sin_value = math.sin(radian)
cos_value = math.cos(radian)
tan_value = math.tan(radian)

print(f"{angle}度の三角関数の値:")
print(f"サイン: {sin_value:.3f}")
print(f"コサイン: {cos_value:.3f}")
print(f"タンジェント: {tan_value:.3f}")
```

プログラムを実行してみましょう。

```bash
python math_calculator.py
```

実行例は以下のようになります。

```
=== 数学計算プログラム ===
円の半径を入力してください: 3
半径3.0の円の面積: 28.27
半径3.0の円の円周: 18.85

角度（度）を入力してください: 45
45.0度の三角関数の値:
サイン: 0.707
コサイン: 0.707
タンジェント: 1.000
```

このプログラムでは、ユーザーからの入力を受け取って、`math`モジュールの機能を使った計算を行っています。`.2f`や`.3f`といった書式を使うことで、小数点以下の桁数を制御しています。

## mathモジュールの便利な機能

最後に、`math`モジュールのその他の便利な機能も紹介しましょう。`math_utilities.py`というファイルを作成してください。

```python
import math

# 数値の判定
print("=== 数値の判定 ===")
print("5は無限大か:", math.isinf(5))
print("5は有効な数値か:", math.isfinite(5))

# 階乗の計算
print("\n=== 階乗の計算 ===")
print("5の階乗:", math.factorial(5))
print("3の階乗:", math.factorial(3))

# 最大公約数
print("\n=== 最大公約数 ===")
print("12と18の最大公約数:", math.gcd(12, 18))
print("15と25の最大公約数:", math.gcd(15, 25))

# 2つの数値の距離
print("\n=== 2点間の距離 ===")
x1, y1 = 0, 0
x2, y2 = 3, 4
distance = math.sqrt((x2 - x1)**2 + (y1 - y2)**2)
print(f"({x1}, {y1})と({x2}, {y2})の距離: {distance}")
```

プログラムを実行してみましょう。

```bash
python math_utilities.py
```

実行結果は以下のようになります。

```
=== 数値の判定 ===
5は無限大か: False
5は有効な数値か: True

=== 階乗の計算 ===
5の階乗: 120
3の階乗: 6

=== 最大公約数 ===
12と18の最大公約数: 6
15と25の最大公約数: 5

=== 2点間の距離 ===
(0, 0)と(3, 4)の距離: 5.0
```

階乗は「5! = 5 × 4 × 3 × 2 × 1 = 120」のような計算で、`math.factorial()`を使うと簡単に計算できます。

## まとめ

本章では、`math`モジュールを使った様々な数学計算について学習しました。学んだ内容を振り返ってみましょう。

`math`モジュールには、平方根や累乗、三角関数、対数関数など、幅広い数学計算の機能が用意されています。円周率や自然対数の底といった重要な定数も、正確な値で利用することができます。

三角関数を使う際は、度をラジアンに変換する`math.radians()`を使うことが重要でした。また、対数計算では、自然対数、常用対数、2を底とする対数など、用途に応じて使い分けることができます。

これらの機能を組み合わせることで、電卓では計算できないような複雑な数学計算も、Pythonで簡単に行うことができるようになりました。