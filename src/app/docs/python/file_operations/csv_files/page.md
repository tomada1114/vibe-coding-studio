---
title: CSVファイルを扱ってみよう
nextjs:
  metadata:
    title: CSVファイルを扱ってみよう
    description: PythonでCSVファイルの読み込みと書き込み方法を学び、表形式のデータを効率的に管理する基本的な操作を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- CSVファイルとは何かを理解する
- Pythonでcsvモジュールを使う方法を学ぶ
- CSVファイルからデータを読み込む方法を習得する
- CSVファイルにデータを書き込む方法を理解する
- 辞書形式でCSVデータを扱う方法を学ぶ

## CSVファイルとは何か

**CSV**とは「Comma Separated Values」の略で、データをカンマ（,）で区切って保存するファイル形式です。
表計算ソフトのExcelや、データベースから出力されるデータでよく使われる形式です。

CSVファイルの例を見てみましょう。
以下のような内容がCSVファイルの典型的な形です。

```
名前,年齢,職業
田中太郎,25,エンジニア
佐藤花子,30,デザイナー
山田次郎,28,営業
```

1行目はヘッダー（項目名）、2行目以降が実際のデータになっています。
各列がカンマで区切られているため、プログラムで読み込んで処理しやすい形式になっています。

CSVファイルは、大量のデータを整理して保存したり、異なるシステム間でデータを交換したりする際によく使用されます。

## CSVファイルを読み込むためのサンプルデータを作成

まずは、読み込み用のCSVファイルを準備しましょう。

VS Codeで`students.csv`というファイルを作成し、以下の内容を入力してください。

```csv
名前,数学,英語,国語
田中太郎,85,78,92
佐藤花子,92,88,85
山田次郎,76,82,79
鈴木美咲,88,95,91
```

このファイルには、生徒の名前と各教科の点数が記録されています。
1行目がヘッダー（項目名）で、2行目以降が各生徒のデータです。

ファイルを保存したら、次にPythonプログラムを作成していきます。

## csvモジュールを使った基本的な読み込み

PythonでCSVファイルを扱うには、標準ライブラリの`csv`モジュールを使用します。
このモジュールは最初からPythonに含まれているので、追加でインストールする必要はありません。

`csv_read.py`というファイルを作成し、以下のコードを入力してみましょう。

```python
import csv

# CSVファイルを読み込む
with open('students.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    
    # 1行ずつ読み込んで表示
    for row in csv_reader:
        print(row)
```

このコードを実行してみましょう。

```bash
python csv_read.py
```

実行結果は以下のようになります。

```
['名前', '数学', '英語', '国語']
['田中太郎', '85', '78', '92']
['佐藤花子', '92', '88', '85']
['山田次郎', '76', '82', '79']
['鈴木美咲', '88', '95', '91']
```

`csv.reader()`を使うことで、CSVファイルの各行がリスト形式で読み込まれます。
1つ目のリストがヘッダー、2つ目以降が各行のデータになっています。

注意点として、数値も文字列として読み込まれているため、計算に使う場合は数値に変換する必要があります。

## ヘッダーとデータを分けて処理する

ヘッダー行とデータ行を分けて処理すると、より読みやすいプログラムになります。

同じファイルに以下のコードを追加してみましょう。

```python
import csv

# CSVファイルを読み込む
with open('students.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    
    # 1行ずつ読み込んで表示
    for row in csv_reader:
        print(row)

print("=" * 30)

# ヘッダーとデータを分けて処理
with open('students.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    
    # 最初の行（ヘッダー）を取得
    header = next(csv_reader)
    print("ヘッダー:", header)
    
    print("\n生徒データ:")
    # 残りの行（データ）を処理
    for row in csv_reader:
        name = row[0]
        math_score = int(row[1])  # 数学の点数を数値に変換
        english_score = int(row[2])  # 英語の点数を数値に変換
        japanese_score = int(row[3])  # 国語の点数を数値に変換
        
        # 平均点を計算
        average = (math_score + english_score + japanese_score) / 3
        
        print(f"{name}: 平均点 {average:.1f}点")
```

このコードを実行すると、以下のような結果が表示されます。

```bash
python csv_read.py
```

```
['名前', '数学', '英語', '国語']
['田中太郎', '85', '78', '92']
['佐藤花子', '92', '88', '85']
['山田次郎', '76', '82', '79']
['鈴木美咲', '88', '95', '91']
==============================
ヘッダー: ['名前', '数学', '英語', '国語']

生徒データ:
田中太郎: 平均点 85.0点
佐藤花子: 平均点 88.3点
山田次郎: 平均点 79.0点
鈴木美咲: 平均点 91.3点
```

`next(csv_reader)`を使うことで、最初の行だけを取得できます。
その後の`for`ループでは、残りの行が順番に処理されます。

また、`int()`を使って文字列を数値に変換することで、計算ができるようになります。

## CSVファイルにデータを書き込む

今度は、CSVファイルにデータを書き込む方法を学習しましょう。

`csv_write.py`というファイルを作成し、以下のコードを入力してください。

```python
import csv

# 新しいCSVファイルを作成
students_data = [
    ['名前', '年齢', '学年'],  # ヘッダー
    ['田中一郎', 16, 1],
    ['佐藤二郎', 17, 2],
    ['山田三郎', 18, 3]
]

with open('new_students.csv', 'w', newline='', encoding='utf-8') as file:
    csv_writer = csv.writer(file)
    
    # 全てのデータを一度に書き込み
    csv_writer.writerows(students_data)

print("新しいCSVファイルを作成しました")
```

このコードを実行してみましょう。

```bash
python csv_write.py
```

実行すると、以下のメッセージが表示されます。

```
新しいCSVファイルを作成しました
```

実行後、`new_students.csv`ファイルが作成されます。
ファイルを開いて確認すると、以下のような内容になっています。

```
名前,年齢,学年
田中一郎,16,1
佐藤二郎,17,2
山田三郎,18,3
```

`csv.writer()`を使ってCSVファイルに書き込みます。
`writerows()`メソッドは、リストのリストを一度に書き込むことができます。

`newline=''`は、Windowsでの改行コードの問題を避けるために指定しています。

## 1行ずつデータを書き込む

データを1行ずつ書き込むこともできます。
同じファイルに以下のコードを追加してみましょう。

```python
import csv

# 新しいCSVファイルを作成
students_data = [
    ['名前', '年齢', '学年'],  # ヘッダー
    ['田中一郎', 16, 1],
    ['佐藤二郎', 17, 2],
    ['山田三郎', 18, 3]
]

with open('new_students.csv', 'w', newline='', encoding='utf-8') as file:
    csv_writer = csv.writer(file)
    
    # 全てのデータを一度に書き込み
    csv_writer.writerows(students_data)

print("新しいCSVファイルを作成しました")

# 1行ずつ書き込む方法
with open('step_by_step.csv', 'w', newline='', encoding='utf-8') as file:
    csv_writer = csv.writer(file)
    
    # ヘッダーを書き込み
    csv_writer.writerow(['商品名', '価格', '在庫'])
    
    # データを1行ずつ書き込み
    csv_writer.writerow(['りんご', 150, 50])
    csv_writer.writerow(['バナナ', 200, 30])
    csv_writer.writerow(['オレンジ', 180, 25])

print("商品データCSVファイルを作成しました")
```

実行すると、`step_by_step.csv`ファイルも作成されます。

```bash
python csv_write.py
```

```
新しいCSVファイルを作成しました
商品データCSVファイルを作成しました
```

`step_by_step.csv`ファイルの中身は以下のようになります。

```
商品名,価格,在庫
りんご,150,50
バナナ,200,30
オレンジ,180,25
```

`writerow()`メソッドは1行ずつデータを書き込むため、動的にデータを追加する場合に便利です。

## 辞書形式でCSVデータを扱う

CSVファイルを辞書形式で扱うと、列名をキーとして使えるため、より読みやすいコードが書けます。

`csv_dict.py`というファイルを作成し、以下のコードを入力してください。

```python
import csv

# 辞書形式でCSVファイルを読み込む
with open('students.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    
    print("辞書形式でのデータ読み込み:")
    for row in csv_reader:
        print(row)
```

このコードを実行してみましょう。

```bash
python csv_dict.py
```

実行結果は以下のようになります。

```
辞書形式でのデータ読み込み:
{'名前': '田中太郎', '数学': '85', '英語': '78', '国語': '92'}
{'名前': '佐藤花子', '数学': '92', '英語': '88', '国語': '85'}
{'名前': '山田次郎', '数学': '76', '英語': '82', '国語': '79'}
{'名前': '鈴木美咲', '数学': '88', '英語': '95', '国語': '91'}
```

`csv.DictReader()`を使うと、各行が辞書形式で読み込まれます。
ヘッダーが辞書のキーになるため、列名を使ってデータにアクセスできます。

同じファイルに以下のコードを追加して、より実用的な例を見てみましょう。

```python
import csv

# 辞書形式でCSVファイルを読み込む
with open('students.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    
    print("辞書形式でのデータ読み込み:")
    for row in csv_reader:
        print(row)

print("=" * 40)

# 辞書形式を使った成績処理
with open('students.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    
    print("成績一覧:")
    for student in csv_reader:
        name = student['名前']
        math = int(student['数学'])
        english = int(student['英語'])
        japanese = int(student['国語'])
        
        total = math + english + japanese
        average = total / 3
        
        print(f"{name}: 合計{total}点, 平均{average:.1f}点")
```

実行すると、以下のような結果が表示されます。

```bash
python csv_dict.py
```

```
辞書形式でのデータ読み込み:
{'名前': '田中太郎', '数学': '85', '英語': '78', '国語': '92'}
{'名前': '佐藤花子', '数学': '92', '英語': '88', '国語': '85'}
{'名前': '山田次郎', '数学': '76', '英語': '82', '国語': '79'}
{'名前': '鈴木美咲', '数学': '88', '英語': '95', '国語': '91'}
========================================
成績一覧:
田中太郎: 合計255点, 平均85.0点
佐藤花子: 合計265点, 平均88.3点
山田次郎: 合計237点, 平均79.0点
鈴木美咲: 合計274点, 平均91.3点
```

辞書形式を使うことで、`student['名前']`のように列名でデータにアクセスできるため、コードの意味が分かりやすくなります。

## 辞書形式でCSVファイルに書き込む

辞書形式でCSVファイルに書き込むこともできます。

`csv_dict_write.py`というファイルを作成し、以下のコードを入力してください。

```python
import csv

# 辞書形式のデータを準備
employees = [
    {'名前': '田中太郎', '部署': '開発', '給与': 400000},
    {'名前': '佐藤花子', '部署': 'デザイン', '給与': 380000},
    {'名前': '山田次郎', '部署': '営業', '給与': 350000}
]

# 辞書形式でCSVファイルに書き込み
with open('employees.csv', 'w', newline='', encoding='utf-8') as file:
    # ヘッダーを指定
    fieldnames = ['名前', '部署', '給与']
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # ヘッダー行を書き込み
    csv_writer.writeheader()
    
    # データを書き込み
    csv_writer.writerows(employees)

print("従業員データをCSVファイルに保存しました")
```

このコードを実行してみましょう。

```bash
python csv_dict_write.py
```

実行結果は以下のようになります。

```
従業員データをCSVファイルに保存しました
```

作成された`employees.csv`ファイルの中身は以下のようになります。

```
名前,部署,給与
田中太郎,開発,400000
佐藤花子,デザイン,380000
山田次郎,営業,350000
```

`csv.DictWriter()`を使うと、辞書形式のデータを簡単にCSVファイルに書き込むことができます。
`fieldnames`でヘッダーの順序を指定し、`writeheader()`でヘッダー行を書き込みます。

## CSVファイルに新しいデータを追加する

既存のCSVファイルに新しいデータを追加することもできます。

同じファイルに以下のコードを追加してみましょう。

```python
import csv

# 辞書形式のデータを準備
employees = [
    {'名前': '田中太郎', '部署': '開発', '給与': 400000},
    {'名前': '佐藤花子', '部署': 'デザイン', '給与': 380000},
    {'名前': '山田次郎', '部署': '営業', '給与': 350000}
]

# 辞書形式でCSVファイルに書き込み
with open('employees.csv', 'w', newline='', encoding='utf-8') as file:
    # ヘッダーを指定
    fieldnames = ['名前', '部署', '給与']
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # ヘッダー行を書き込み
    csv_writer.writeheader()
    
    # データを書き込み
    csv_writer.writerows(employees)

print("従業員データをCSVファイルに保存しました")

# 新しい従業員データを追加
new_employee = {'名前': '鈴木美咲', '部署': '人事', '給与': 360000}

with open('employees.csv', 'a', newline='', encoding='utf-8') as file:
    fieldnames = ['名前', '部署', '給与']
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # 新しいデータを1行追加
    csv_writer.writerow(new_employee)

print("新しい従業員データを追加しました")
```

実行すると、既存のファイルに新しい行が追加されます。

```bash
python csv_dict_write.py
```

```
従業員データをCSVファイルに保存しました
新しい従業員データを追加しました
```

追加後の`employees.csv`ファイルの中身は以下のようになります。

```
名前,部署,給与
田中太郎,開発,400000
佐藤花子,デザイン,380000
山田次郎,営業,350000
鈴木美咲,人事,360000
```

`'a'`モード（追記モード）を使うことで、既存のデータを保持したまま新しいデータを追加できます。

## まとめ

本章では、PythonでCSVファイルを扱う基本的な方法について学習しました。
習得した内容は以下の通りです。

- CSVファイルが表形式のデータを保存するためのファイル形式であることを理解しました
- `csv.reader()`を使ってCSVファイルからデータを読み込む方法を学習しました
- `csv.writer()`を使ってCSVファイルにデータを書き込む方法を習得しました
- `csv.DictReader()`と`csv.DictWriter()`を使った辞書形式での操作方法を理解しました
- 既存のCSVファイルに新しいデータを追加する方法を学習しました

CSVファイルは、データの保存や交換によく使われる重要なファイル形式です。
大量のデータを整理したり、他のシステムとデータをやり取りしたりする際に、これらのスキルが役立ちます。