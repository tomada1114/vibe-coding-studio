---
title: 辞書を使った情報管理をしてみよう
nextjs:
  metadata:
    title: 辞書を使った情報管理をしてみよう
    description: Pythonの辞書を使って複数のデータをまとめて管理する方法を学び、ユーザー入力による辞書の作成・更新・表示の基本的な操作を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 辞書を使って関連する複数の情報をまとめて管理する方法を理解する
- ユーザーの入力を受け取って辞書を作成する方法を習得する
- 辞書の内容を分かりやすく表示する方法を学ぶ
- 辞書のデータを更新・追加する方法を理解する
- 複数の辞書を使ったデータ管理の基礎を習得する

## 辞書で関連情報をまとめて管理

前章で辞書の基本操作を学びました。
今回は、それらの操作を組み合わせて、実際に情報を管理するプログラムを作成していきます。

辞書の大きな利点は、関連する複数の情報を一つの変数にまとめて管理できることです。
例えば、人の情報なら「名前」「年齢」「住所」「電話番号」などを一つの辞書にまとめることで、情報の整理がしやすくなります。

また、辞書を使うことで、リストのようにインデックスの順番を覚える必要がなく、キーの名前で直感的にデータにアクセスできます。

まずは、基本的な情報管理の例から見ていきましょう。

## 個人情報の管理

個人の情報を辞書で管理する基本的な例を作成してみましょう。
複数の項目を辞書にまとめることで、関連する情報を効率的に扱うことができます。

VS Codeで新しいファイル `dict_management.py` を作成して、以下のコードを入力してみましょう。

```python
# 個人情報を辞書で管理
person = {
    "name": "山田太郎",
    "age": 28,
    "city": "東京",
    "job": "エンジニア",
    "email": "yamada@example.com"
}

print("=== 個人情報 ===")
print(f"名前: {person['name']}")
print(f"年齢: {person['age']}歳")
print(f"住所: {person['city']}")
print(f"職業: {person['job']}")
print(f"メール: {person['email']}")

print()
print("=== 情報の詳細 ===")
print(f"登録項目数: {len(person)}項目")
print(f"すべてのキー: {list(person.keys())}")
```

このプログラムでは、一人の個人情報を辞書にまとめて管理しています。
各情報にキーを使ってアクセスし、見やすい形式で表示しています。
`len()`関数や`keys()`メソッドを使って、辞書自体の情報も確認できます。

このプログラムをターミナルで実行してみてください。

```bash
python dict_management.py
```

実行結果は以下のようになります。

```
=== 個人情報 ===
名前: 山田太郎
年齢: 28歳
住所: 東京
職業: エンジニア
メール: yamada@example.com

=== 情報の詳細 ===
登録項目数: 5項目
すべてのキー: ['name', 'age', 'city', 'job', 'email']
```

このように、関連する情報を一つの辞書にまとめることで、データの管理と表示が簡潔になります。

### 情報の更新と追加

既存の個人情報を更新したり、新しい項目を追加したりする例を見てみましょう。

```python
# 情報の更新
print("\n=== 情報更新 ===")
print("転職しました！")
person["job"] = "データサイエンティスト"
person["age"] = 29  # 誕生日を迎えた
print(f"新しい職業: {person['job']}")
print(f"新しい年齢: {person['age']}歳")

# 新しい項目の追加
print("\n新しい情報を追加します")
person["hobby"] = "プログラミング"
person["phone"] = "090-1234-5678"
print(f"趣味: {person['hobby']}")
print(f"電話番号: {person['phone']}")

# 更新後の全情報を表示
print("\n=== 更新後の個人情報 ===")
for key, value in person.items():
    print(f"{key}: {value}")
```

このコードでは、既存のキーに新しい値を代入することで情報を更新し、新しいキーに値を代入することで項目を追加しています。
`items()`メソッドを使って、すべてのキーと値を順番に表示しています。

実行結果は以下のようになります。

```
=== 情報更新 ===
転職しました！
新しい職業: データサイエンティスト
新しい年齢: 29歳

新しい情報を追加します
趣味: プログラミング
電話番号: 090-1234-5678

=== 更新後の個人情報 ===
name: 山田太郎
age: 29
city: 東京
job: データサイエンティスト
email: yamada@example.com
hobby: プログラミング
phone: 090-1234-5678
```

## ユーザー入力による辞書の作成

今度は、ユーザーからの入力を受け取って辞書を作成するプログラムを作ってみましょう。
`input()`関数を使って対話的に情報を収集し、辞書に保存していきます。

```python
# ユーザーから情報を入力してもらい辞書を作成
print("=== 学生情報登録 ===")
print("学生の情報を入力してください")

# 空の辞書を作成
student = {}

# ユーザーから基本情報を入力
student["name"] = input("名前: ")
student["student_id"] = input("学籍番号: ")
student["grade"] = input("学年: ")
student["major"] = input("専攻: ")

print("\n=== 入力された情報 ===")
print(f"名前: {student['name']}")
print(f"学籍番号: {student['student_id']}")
print(f"学年: {student['grade']}")
print(f"専攻: {student['major']}")

# 年齢を数値として入力
print("\n年齢を入力してください")
while True:
    try:
        age = int(input("年齢: "))
        student["age"] = age
        break
    except ValueError:
        print("数値を入力してください")

print(f"年齢: {student['age']}歳")
```

このプログラムでは、空の辞書から始めて、ユーザーの入力を順番に辞書に追加していきます。
基本的な文字列情報は`input()`関数で直接受け取り、年齢は数値として扱うため`int()`関数で変換しています。
数値の入力では、無効な値が入力された場合のエラー処理も含めています。

実行例は以下のようになります（ユーザーが「佐藤花子」「ST001」「2年」「情報科学」「20」と入力した場合）。

```
=== 学生情報登録 ===
学生の情報を入力してください
名前: 佐藤花子
学籍番号: ST001
学年: 2年
専攻: 情報科学

=== 入力された情報 ===
名前: 佐藤花子
学籍番号: ST001
学年: 2年
専攻: 情報科学

年齢を入力してください
年齢: 20
年齢: 20歳
```

### 追加情報の入力

基本情報の入力が完了したら、さらに詳細な情報を追加できるようにしてみましょう。

```python
# 追加情報の入力
print("\n=== 追加情報入力 ===")
add_more = input("追加情報を入力しますか？ (y/n): ")

if add_more.lower() == "y":
    # 連絡先情報
    student["email"] = input("メールアドレス: ")
    student["phone"] = input("電話番号: ")
    
    # 出身地
    student["hometown"] = input("出身地: ")
    
    print("\n=== 完成した学生情報 ===")
    for key, value in student.items():
        print(f"{key}: {value}")
else:
    print("\n基本情報のみで登録完了しました")
    print("登録項目数:", len(student))
```

このコードでは、ユーザーが追加情報の入力を希望する場合のみ、さらに詳細な情報を辞書に追加します。
`.lower()`メソッドを使って大文字小文字を区別せずに判定し、最終的にすべての情報を表示します。

## 商品情報の管理

別の例として、商品情報を辞書で管理する例を見てみましょう。
商品には価格、在庫数、カテゴリなど、様々な情報があります。

```python
# 商品情報の管理
print("=== 商品管理 ===")

# 商品情報の辞書を作成
product = {
    "name": "ワイヤレスマウス",
    "price": 2980,
    "category": "PC周辺機器",
    "stock": 15,
    "description": "高精度で使いやすいワイヤレスマウス"
}

print("=== 商品詳細 ===")
print(f"商品名: {product['name']}")
print(f"価格: ¥{product['price']:,}")
print(f"カテゴリ: {product['category']}")
print(f"在庫数: {product['stock']}個")
print(f"説明: {product['description']}")

# 在庫の確認と表示
print(f"\n在庫状況: ", end="")
if product['stock'] > 0:
    print(f"在庫あり（{product['stock']}個）")
else:
    print("在庫なし")

# 価格の更新（セール価格）
print("\n=== セール開始 ===")
original_price = product['price']
product['price'] = int(original_price * 0.8)  # 20%割引
print(f"通常価格: ¥{original_price:,}")
print(f"セール価格: ¥{product['price']:,}")
print(f"割引額: ¥{original_price - product['price']:,}")
```

このプログラムでは、商品の様々な情報を辞書で管理しています。
価格の表示では`:,`フォーマットを使って3桁区切りで見やすく表示し、在庫状況の判定や価格の更新処理も行っています。

実行結果は以下のようになります。

```
=== 商品管理 ===
=== 商品詳細 ===
商品名: ワイヤレスマウス
価格: ¥2,980
カテゴリ: PC周辺機器
在庫数: 15個
説明: 高精度で使いやすいワイヤレスマウス

在庫状況: 在庫あり（15個）

=== セール開始 ===
通常価格: ¥2,980
セール価格: ¥2,384
割引額: ¥596
```

### 商品の購入処理

商品の購入処理を模擬的に実装してみましょう。

```python
# 購入処理のシミュレーション
print("\n=== 購入処理 ===")
purchase_quantity = int(input(f"{product['name']}を何個購入しますか？: "))

if purchase_quantity <= 0:
    print("購入数量は1個以上を入力してください")
elif purchase_quantity > product['stock']:
    print(f"在庫不足です。在庫数: {product['stock']}個")
else:
    # 購入処理
    total_price = product['price'] * purchase_quantity
    product['stock'] -= purchase_quantity
    
    print("\n=== 購入完了 ===")
    print(f"商品: {product['name']}")
    print(f"単価: ¥{product['price']:,}")
    print(f"数量: {purchase_quantity}個")
    print(f"合計金額: ¥{total_price:,}")
    print(f"残り在庫: {product['stock']}個")
```

このコードでは、購入数量をユーザーから入力してもらい、在庫数と比較して購入の可否を判定しています。
購入が可能な場合は、合計金額を計算し、在庫数を更新しています。
辞書の値を参照して計算を行い、結果を辞書の値として更新する一連の流れを学べます。

## 成績管理での辞書活用

学生の成績管理を辞書で行う例を見てみましょう。
科目と点数の組み合わせを管理するのに辞書は非常に適しています。

```python
# 成績管理
print("=== 成績管理システム ===")

# 成績データの作成
grades = {}
subjects = ["数学", "英語", "国語", "理科", "社会"]

print("各科目の点数を入力してください（0-100点）")
for subject in subjects:
    while True:
        try:
            score = int(input(f"{subject}: "))
            if 0 <= score <= 100:
                grades[subject] = score
                break
            else:
                print("0から100の間で入力してください")
        except ValueError:
            print("数値を入力してください")

# 成績の表示と分析
print("\n=== 成績表 ===")
total_score = 0
for subject, score in grades.items():
    print(f"{subject}: {score}点")
    total_score += score

# 統計情報の計算
average_score = total_score / len(grades)
max_score = max(grades.values())
min_score = min(grades.values())

print(f"\n=== 統計情報 ===")
print(f"合計点: {total_score}点")
print(f"平均点: {average_score:.1f}点")
print(f"最高点: {max_score}点")
print(f"最低点: {min_score}点")

# 最高点と最低点の科目を特定
best_subject = ""
worst_subject = ""
for subject, score in grades.items():
    if score == max_score:
        best_subject = subject
    if score == min_score:
        worst_subject = subject

print(f"得意科目: {best_subject}")
print(f"苦手科目: {worst_subject}")
```

このプログラムでは、科目名をキー、点数を値とする辞書を作成しています。
各科目の点数を入力し、それらを使って合計点、平均点、最高点、最低点を計算しています。
`max()`と`min()`関数を`values()`メソッドと組み合わせて使うことで、簡単に最大値と最小値を求められます。

実行例は以下のようになります（各科目に85, 78, 92, 88, 76と入力した場合）。

```
=== 成績管理システム ===
各科目の点数を入力してください（0-100点）
数学: 85
英語: 78
国語: 92
理科: 88
社会: 76

=== 成績表 ===
数学: 85点
英語: 78点
国語: 92点
理科: 88点
社会: 76点

=== 統計情報 ===
合計点: 419点
平均点: 83.8点
最高点: 92点
最低点: 76点
得意科目: 国語
苦手科目: 社会
```

## 複数の辞書を使ったデータ管理

複数の辞書を組み合わせて、より複雑なデータ管理を行う基本的な例を見てみましょう。

```python
# 複数の人の情報を管理
print("=== 複数人の情報管理 ===")

# 3人分の情報を辞書で管理
person1 = {"name": "田中", "age": 25, "city": "東京"}
person2 = {"name": "佐藤", "age": 30, "city": "大阪"}
person3 = {"name": "鈴木", "age": 28, "city": "名古屋"}

# 人のリスト
people = [person1, person2, person3]

print("=== 登録者一覧 ===")
for i, person in enumerate(people, 1):
    print(f"{i}. 名前: {person['name']}, 年齢: {person['age']}歳, 都市: {person['city']}")

# 年齢の平均を計算
total_age = 0
for person in people:
    total_age += person['age']

average_age = total_age / len(people)
print(f"\n平均年齢: {average_age:.1f}歳")

# 特定の都市に住む人を検索
search_city = "東京"
print(f"\n{search_city}在住の人:")
found = False
for person in people:
    if person['city'] == search_city:
        print(f"- {person['name']}さん ({person['age']}歳)")
        found = True

if not found:
    print(f"{search_city}在住の人は見つかりませんでした")
```

このプログラムでは、複数の辞書をリストにまとめて管理しています。
各辞書は一人分の情報を持ち、リスト全体で複数人の情報を管理できます。
`enumerate()`関数を使って番号付きで表示し、年齢の平均計算や都市での検索機能も実装しています。

実行結果は以下のようになります。

```
=== 複数人の情報管理 ===
=== 登録者一覧 ===
1. 名前: 田中, 年齢: 25歳, 都市: 東京
2. 名前: 佐藤, 年齢: 30歳, 都市: 大阪
3. 名前: 鈴木, 年齢: 28歳, 都市: 名古屋

平均年齢: 27.7歳

東京在住の人:
- 田中さん (25歳)
```

## まとめ

本章では、辞書を使った情報管理の基本的な方法について学習しました。
理解できた内容は以下の通りです。

辞書を使って関連する複数の情報を一つの変数にまとめて管理する方法を学びました。
キーに意味のある名前を使うことで、直感的でわかりやすいデータ管理が可能になります。

`input()`関数を使ってユーザーからの入力を受け取り、動的に辞書を作成・更新する方法を習得しました。
エラー処理も含めることで、安全なデータ入力を実現できます。

また、辞書の値を使った計算処理（合計、平均、最大値、最小値の算出）や、条件に基づく検索処理の実装方法を学びました。
`items()`、`values()`、`keys()`メソッドを活用することで、辞書データを効率的に処理できます。

さらに、複数の辞書をリストで管理することで、より複雑なデータ構造を扱う基礎も身につけました。

これで、辞書を使った基本的な情報管理の技術が身につきました。
次の章では、タプルとセットという新しいデータ構造について学んでいきます。