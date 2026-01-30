---
title: 乱数を使ったプログラムを作ろう
nextjs:
  metadata:
    title: 乱数を使ったプログラムを作ろう
    description: Pythonのrandomモジュールを使ってサイコロゲーム、くじ引きシステム、パスワード生成プログラムを作成する方法を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- randomモジュールの基本的な使い方を習得する
- サイコロゲームの作成方法を学ぶ
- くじ引きシステムの実装方法を理解する
- ランダムな文字列を生成する方法を学ぶ
- パスワード生成プログラムの作成方法を習得する

## はじめに

ゲームやアプリケーションを作る際、予測できないランダムな要素があると、より楽しく魅力的なプログラムになります。例えば、サイコロの出目、カードの順番、敵キャラクターの行動パターンなど、多くの場面でランダムな処理が使われています。

Pythonの`random`モジュールを使うと、このようなランダムな処理を簡単に実装することができます。今回は、実際にゲームやツールを作りながら、`random`モジュールの使い方を学んでいきましょう。

## randomモジュールの基本機能

まずは、`random`モジュールの基本的な機能を確認してみましょう。VS Codeで`random_basics.py`というファイルを作成してください。

```python
import random

# 0以上1未満のランダムな小数
print("ランダムな小数:", random.random())

# 指定した範囲のランダムな整数
print("1から6までのランダムな整数:", random.randint(1, 6))

# 指定した範囲のランダムな小数
print("1.0から10.0までのランダムな小数:", random.uniform(1.0, 10.0))
```

プログラムを実行してみましょう。

```bash
python random_basics.py
```

実行結果の例（実行するたびに結果が変わります）：

```
ランダムな小数: 0.7394832108490246
1から6までのランダムな整数: 4
1.0から10.0までのランダムな小数: 7.285619303847592
```

何度か実行してみてください。毎回異なる数値が表示されることが確認できます。

### リストからランダムに選択

`random`モジュールには、リストからランダムに要素を選ぶ機能もあります。先ほどのコードに追加してください。

```python
import random

# 0以上1未満のランダムな小数
print("ランダムな小数:", random.random())

# 指定した範囲のランダムな整数
print("1から6までのランダムな整数:", random.randint(1, 6))

# 指定した範囲のランダムな小数
print("1.0から10.0までのランダムな小数:", random.uniform(1.0, 10.0))

# ここから追加
# リストからランダムに選択
colors = ["赤", "青", "緑", "黄", "紫"]
selected_color = random.choice(colors)
print("選ばれた色:", selected_color)

# リストから複数の要素をランダムに選択
selected_colors = random.sample(colors, 3)
print("選ばれた3つの色:", selected_colors)

# リストの順序をランダムに変更
numbers = [1, 2, 3, 4, 5]
print("シャッフル前:", numbers)
random.shuffle(numbers)
print("シャッフル後:", numbers)
```

プログラムを実行してみましょう。

```bash
python random_basics.py
```

実行結果の例：

```
ランダムな小数: 0.8394323422345633
1から6までのランダムな整数: 2
1.0から10.0までのランダムな小数: 5.847293847562834
選ばれた色: 緑
選ばれた3つの色: ['紫', '赤', '青']
シャッフル前: [1, 2, 3, 4, 5]
シャッフル後: [3, 1, 5, 2, 4]
```

`random.choice()`は1つの要素を、`random.sample()`は指定した数の要素を重複なしで選びます。`random.shuffle()`はリストの順序をランダムに変更します。

## サイコロゲームを作ってみよう

それでは、`random`モジュールを使って実際にサイコロゲームを作ってみましょう。新しく`dice_game.py`というファイルを作成してください。

```python
import random

print("=== サイコロゲーム ===")
print("Enterキーを押してサイコロを振ってください")

# ユーザーの入力を待つ
input()

# サイコロを振る
dice_result = random.randint(1, 6)
print(f"サイコロの結果: {dice_result}")

# 結果に応じたメッセージ
if dice_result == 6:
    print("大当たり！6が出ました！")
elif dice_result >= 4:
    print("いい結果ですね！")
else:
    print("残念、もう一度挑戦してみてください")
```

プログラムを実行してみましょう。

```bash
python dice_game.py
```

実行例：

```
=== サイコロゲーム ===
Enterキーを押してサイコロを振ってください

サイコロの結果: 5
いい結果ですね！
```

### 複数回サイコロを振れるゲーム

ゲームをもう少し発展させて、何度でもサイコロを振れるようにしてみましょう。先ほどのコードを以下のように変更してください。

```python
import random

print("=== サイコロゲーム ===")
print("何度でもサイコロを振ることができます")
print("終了するには 'q' を入力してください")

while True:
    user_input = input("\nEnterキーでサイコロを振る（終了: q）: ")
    
    # qが入力されたら終了
    if user_input.lower() == 'q':
        print("ゲームを終了します")
        break
    
    # サイコロを振る
    dice_result = random.randint(1, 6)
    print(f"サイコロの結果: {dice_result}")
    
    # 結果に応じたメッセージ
    if dice_result == 6:
        print("🎉 大当たり！6が出ました！")
    elif dice_result >= 4:
        print("😊 いい結果ですね！")
    else:
        print("😅 残念、もう一度挑戦してみてください")
```

プログラムを実行してみましょう。

```bash
python dice_game.py
```

実行例：

```
=== サイコロゲーム ===
何度でもサイコロを振ることができます
終了するには 'q' を入力してください

Enterキーでサイコロを振る（終了: q）: 
サイコロの結果: 3
😅 残念、もう一度挑戦してみてください

Enterキーでサイコロを振る（終了: q）: 
サイコロの結果: 6
🎉 大当たり！6が出ました！

Enterキーでサイコロを振る（終了: q）: q
ゲームを終了します
```

## くじ引きシステムを作ってみよう

次に、当たりやハズレがあるくじ引きシステムを作ってみましょう。新しく`lottery_system.py`というファイルを作成してください。

```python
import random

print("=== くじ引きシステム ===")

# くじの種類と当選確率を設定
lottery_items = ["大当たり", "当たり", "小当たり", "ハズレ", "ハズレ", "ハズレ"]

# ユーザーに挑戦回数を聞く
tries = int(input("何回くじを引きますか？: "))

results = {"大当たり": 0, "当たり": 0, "小当たり": 0, "ハズレ": 0}

print(f"\n{tries}回のくじ引き結果:")

for i in range(tries):
    result = random.choice(lottery_items)
    results[result] += 1
    print(f"{i+1}回目: {result}")

# 結果の集計
print("\n=== 結果集計 ===")
for item, count in results.items():
    if count > 0:
        print(f"{item}: {count}回")
```

プログラムを実行してみましょう。

```bash
python lottery_system.py
```

実行例：

```
=== くじ引きシステム ===
何回くじを引きますか？: 5

5回のくじ引き結果:
1回目: ハズレ
2回目: 小当たり
3回目: ハズレ
4回目: 当たり
5回目: ハズレ

=== 結果集計 ===
当たり: 1回
小当たり: 1回
ハズレ: 3回
```

### 重み付きくじ引きシステム

より現実的なくじ引きシステムにするため、確率を細かく設定してみましょう。先ほどのコードを以下のように変更してください。

```python
import random

print("=== 重み付きくじ引きシステム ===")

# くじの種類と重み（出現確率）を設定
lottery_choices = ["大当たり", "当たり", "小当たり", "ハズレ"]
lottery_weights = [1, 5, 20, 74]  # 重み（合計100）

print("確率:")
print("大当たり: 1%")
print("当たり: 5%")
print("小当たり: 20%")
print("ハズレ: 74%")

# ユーザーに挑戦回数を聞く
tries = int(input("\n何回くじを引きますか？: "))

results = {"大当たり": 0, "当たり": 0, "小当たり": 0, "ハズレ": 0}

print(f"\n{tries}回のくじ引き結果:")

for i in range(tries):
    result = random.choices(lottery_choices, weights=lottery_weights)[0]
    results[result] += 1
    
    # 特別な当たりの場合は目立たせる
    if result == "大当たり":
        print(f"{i+1}回目: 🎊 {result} 🎊")
    elif result == "当たり":
        print(f"{i+1}回目: 🎉 {result}")
    else:
        print(f"{i+1}回目: {result}")

# 結果の集計
print("\n=== 結果集計 ===")
for item, count in results.items():
    if count > 0:
        percentage = (count / tries) * 100
        print(f"{item}: {count}回 ({percentage:.1f}%)")
```

プログラムを実行してみましょう。

```bash
python lottery_system.py
```

実行例：

```
=== 重み付きくじ引きシステム ===
確率:
大当たり: 1%
当たり: 5%
小当たり: 20%
ハズレ: 74%

何回くじを引きますか？: 10

10回のくじ引き結果:
1回目: ハズレ
2回目: 小当たり
3回目: ハズレ
4回目: ハズレ
5回目: 🎉 当たり
6回目: 小当たり
7回目: ハズレ
8回目: ハズレ
9回目: 小当たり
10回目: ハズレ

=== 結果集計 ===
当たり: 1回 (10.0%)
小当たり: 3回 (30.0%)
ハズレ: 6回 (60.0%)
```

`random.choices()`を使うことで、それぞれの項目に重み（出現確率）を設定できます。

## パスワード生成プログラムを作ってみよう

最後に、ランダムな文字列を生成してパスワードを作るプログラムを作ってみましょう。新しく`password_generator.py`というファイルを作成してください。

```python
import random
import string

print("=== パスワード生成プログラム ===")

# 使用する文字の種類を定義
lowercase_letters = string.ascii_lowercase  # a-z
uppercase_letters = string.ascii_uppercase  # A-Z
digits = string.digits  # 0-9
special_chars = "!@#$%^&*"

# すべての文字を結合
all_chars = lowercase_letters + uppercase_letters + digits + special_chars

print("使用可能な文字:")
print(f"小文字: {lowercase_letters}")
print(f"大文字: {uppercase_letters}")
print(f"数字: {digits}")
print(f"記号: {special_chars}")

# パスワードの長さを入力
length = int(input("\nパスワードの長さを入力してください: "))

# ランダムなパスワードを生成
password = ""
for i in range(length):
    password += random.choice(all_chars)

print(f"\n生成されたパスワード: {password}")
```

プログラムを実行してみましょう。

```bash
python password_generator.py
```

実行例：

```
=== パスワード生成プログラム ===
使用可能な文字:
小文字: abcdefghijklmnopqrstuvwxyz
大文字: ABCDEFGHIJKLMNOPQRSTUVWXYZ
数字: 0123456789
記号: !@#$%^&*

パスワードの長さを入力してください: 12

生成されたパスワード: K8#mP2vX@9nF
```

### より安全なパスワード生成

パスワードをより安全にするため、必ず各種類の文字が含まれるようにしてみましょう。先ほどのコードを以下のように変更してください。

```python
import random
import string

print("=== 安全なパスワード生成プログラム ===")

# 使用する文字の種類を定義
lowercase_letters = string.ascii_lowercase
uppercase_letters = string.ascii_uppercase
digits = string.digits
special_chars = "!@#$%^&*"

# パスワードの長さを入力
length = int(input("パスワードの長さを入力してください（最低8文字）: "))

if length < 8:
    print("セキュリティのため、最低8文字以上にしてください")
    length = 8

# 各種類から最低1文字ずつ選択
password_chars = []
password_chars.append(random.choice(lowercase_letters))
password_chars.append(random.choice(uppercase_letters))
password_chars.append(random.choice(digits))
password_chars.append(random.choice(special_chars))

# 残りの文字をランダムに選択
all_chars = lowercase_letters + uppercase_letters + digits + special_chars
for i in range(length - 4):
    password_chars.append(random.choice(all_chars))

# 文字の順序をランダムに変更
random.shuffle(password_chars)

# リストを文字列に変換
password = "".join(password_chars)

print(f"\n生成されたパスワード: {password}")
print("\nパスワードに含まれる文字の種類:")
print(f"小文字: {'含まれています' if any(c in lowercase_letters for c in password) else '含まれていません'}")
print(f"大文字: {'含まれています' if any(c in uppercase_letters for c in password) else '含まれていません'}")
print(f"数字: {'含まれています' if any(c in digits for c in password) else '含まれていません'}")
print(f"記号: {'含まれています' if any(c in special_chars for c in password) else '含まれていません'}")
```

プログラムを実行してみましょう。

```bash
python password_generator.py
```

実行例：

```
=== 安全なパスワード生成プログラム ===
パスワードの長さを入力してください（最低8文字）: 10

生成されたパスワード: 9mK@X2pLv#

パスワードに含まれる文字の種類:
小文字: 含まれています
大文字: 含まれています
数字: 含まれています
記号: 含まれています
```

このプログラムでは、必ず各種類の文字が1文字以上含まれるようになっています。また、`random.shuffle()`を使って文字の順序をランダムにしているため、より予測しにくいパスワードが生成されます。

## 複数のプログラムを組み合わせてみよう

最後に、これまで作ったプログラムの要素を組み合わせて、ミニゲーム集を作ってみましょう。新しく`mini_games.py`というファイルを作成してください。

```python
import random

def dice_game():
    """サイコロゲーム"""
    print("\n=== サイコロゲーム ===")
    dice = random.randint(1, 6)
    print(f"サイコロの結果: {dice}")
    return dice >= 4

def lottery_game():
    """くじ引きゲーム"""
    print("\n=== くじ引きゲーム ===")
    items = ["大当たり", "当たり", "ハズレ", "ハズレ", "ハズレ"]
    result = random.choice(items)
    print(f"結果: {result}")
    return result != "ハズレ"

def number_guess():
    """数当てゲーム"""
    print("\n=== 数当てゲーム ===")
    answer = random.randint(1, 10)
    guess = int(input("1から10までの数字を予想してください: "))
    print(f"正解: {answer}")
    if guess == answer:
        print("大正解！")
        return True
    else:
        print("残念...")
        return False

# メインゲーム
print("=== ミニゲーム集 ===")
print("3つのゲームに挑戦して、2つ以上成功すれば勝利です！")

wins = 0

# ゲーム1: サイコロ
if dice_game():
    print("✅ サイコロゲーム成功！")
    wins += 1
else:
    print("❌ サイコロゲーム失敗...")

# ゲーム2: くじ引き
if lottery_game():
    print("✅ くじ引きゲーム成功！")
    wins += 1
else:
    print("❌ くじ引きゲーム失敗...")

# ゲーム3: 数当て
if number_guess():
    print("✅ 数当てゲーム成功！")
    wins += 1
else:
    print("❌ 数当てゲーム失敗...")

# 最終結果
print(f"\n=== 最終結果 ===")
print(f"成功したゲーム数: {wins}/3")

if wins >= 2:
    print("🎉 おめでとうございます！総合勝利です！")
else:
    print("😅 残念...もう一度挑戦してみてください")
```

プログラムを実行してみましょう。

```bash
python mini_games.py
```

実行例：

```
=== ミニゲーム集 ===
3つのゲームに挑戦して、2つ以上成功すれば勝利です！

=== サイコロゲーム ===
サイコロの結果: 5
✅ サイコロゲーム成功！

=== くじ引きゲーム ===
結果: ハズレ
❌ くじ引きゲーム失敗...

=== 数当てゲーム ===
1から10までの数字を予想してください: 7
正解: 3
残念...
❌ 数当てゲーム失敗...

=== 最終結果 ===
成功したゲーム数: 1/3
😅 残念...もう一度挑戦してみてください
```

## まとめ

本章では、`random`モジュールを使った様々なプログラムを作成しました。学んだ内容を振り返ってみましょう。

`random`モジュールの基本機能として、`random.randint()`で整数の乱数、`random.choice()`でリストからの選択、`random.shuffle()`で順序の変更などを学びました。

サイコロゲームでは、シンプルな乱数生成から始めて、ユーザーとの対話型プログラムへと発展させました。くじ引きシステムでは、`random.choices()`を使った重み付き抽選も実装しました。

パスワード生成プログラムでは、`string`モジュールと組み合わせて、より実用的なツールを作成しました。各種類の文字を必ず含むような工夫も学びました。

これらの技術を組み合わせることで、ゲームやツールなど、様々な楽しいプログラムを作ることができるようになりました。