---
title: 日付と時間を扱ってみよう
nextjs:
  metadata:
    title: 日付と時間を扱ってみよう
    description: Pythonのdatetimeモジュールを使って現在の日時取得、年齢計算、時刻表示システムなどの基本的な日付・時間操作を学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- datetimeモジュールの基本的な使い方を習得する
- 現在の日時を取得する方法を学ぶ
- 年齢計算プログラムの作成方法を理解する
- 時刻表示システムの実装方法を学ぶ

## はじめに

プログラムを作る際、現在の時刻を表示したり、年齢を計算したりする場面があります。Pythonの`datetime`モジュールを使うと、このような日付や時間に関する処理を簡単に行うことができます。

今回は、基本的な機能を実際にコードを書きながら学んでいきましょう。

## datetimeモジュールの基本

`datetime`モジュールは、日付や時間を扱うためのモジュールです。現在の日時を取得したり、特定の日付を作成したりすることができます。

VS Codeで`datetime_basic.py`というファイルを作成してください。

```python
import datetime

# 現在の日時を取得
now = datetime.datetime.now()
print("現在の日時:", now)

# 今日の日付のみ
today = datetime.date.today()
print("今日の日付:", today)
```

プログラムを実行してみましょう。

```bash
python datetime_basic.py
```

実行結果の例：

```
現在の日時: 2024-03-15 14:30:45.123456
今日の日付: 2024-03-15
```

`datetime.datetime.now()`で現在の日時を、`datetime.date.today()`で今日の日付を取得できます。日時には秒以下の細かい時間も含まれていることが分かります。

## 現在の日時を取得してみよう

現在の日時から、年、月、日などの個別の情報を取得することもできます。先ほどのコードに追加してみましょう。

```python
import datetime

# 現在の日時を取得
now = datetime.datetime.now()
print("現在の日時:", now)

# 今日の日付のみ
today = datetime.date.today()
print("今日の日付:", today)

# ここから追加
# 年、月、日を個別に取得
print("年:", now.year)
print("月:", now.month)
print("日:", now.day)
print("時:", now.hour)
print("分:", now.minute)
```

プログラムを実行してみましょう。

```bash
python datetime_basic.py
```

実行結果の例：

```
現在の日時: 2024-03-15 14:30:45.123456
今日の日付: 2024-03-15
年: 2024
月: 3
日: 15
時: 14
分: 30
```

このように、日時オブジェクトから年、月、日、時、分などの値を個別に取り出すことができます。これらの値は数値として扱えるので、計算にも使用できます。

## 年齢計算プログラムを作成しよう

日付の計算を使って、年齢を計算するプログラムを作ってみましょう。新しく`age_calc.py`というファイルを作成してください。

```python
import datetime

print("=== 年齢計算プログラム ===")

# 誕生日を入力
birth_year = int(input("生まれた年を入力: "))
birth_month = int(input("生まれた月を入力: "))
birth_day = int(input("生まれた日を入力: "))

# 誕生日の日付を作成
birthday = datetime.date(birth_year, birth_month, birth_day)

# 今日の日付を取得
today = datetime.date.today()

# 年齢を計算
age = today.year - birthday.year

print(f"誕生日: {birthday}")
print(f"年齢: {age}歳")
```

プログラムを実行してみましょう。

```bash
python age_calc.py
```

実行例：

```
=== 年齢計算プログラム ===
生まれた年を入力: 2000
生まれた月を入力: 5
生まれた日を入力: 10

誕生日: 2000-05-10
年齢: 24歳
```

`datetime.date(年, 月, 日)`で特定の日付を作成できます。年の差を計算することで、基本的な年齢計算ができます。

## 日付の計算をしてみよう

日付同士で計算を行うこともできます。例えば、「30日後」や「1週間前」といった計算です。新しく`date_calc.py`というファイルを作成してください。

```python
import datetime

# 今日の日付
today = datetime.date.today()
print("今日:", today)

# 30日後の日付
future = today + datetime.timedelta(days=30)
print("30日後:", future)

# 7日前の日付
past = today - datetime.timedelta(days=7)
print("7日前:", past)

# 日数の差を計算
christmas = datetime.date(2024, 12, 25)
days_to_christmas = christmas - today
print(f"クリスマスまで: {days_to_christmas.days}日")
```

プログラムを実行してみましょう。

```bash
python date_calc.py
```

実行結果の例：

```
今日: 2024-03-15
30日後: 2024-04-14
7日前: 2024-03-08
クリスマスまで: 285日
```

`datetime.timedelta(days=数値)`を使うと、日数の加算や減算ができます。日付同士の引き算では、日数の差を計算できます。

## 時刻表示システムを作ってみよう

現在時刻を分かりやすく表示するプログラムを作ってみましょう。新しく`time_display.py`というファイルを作成してください。

```python
import datetime

# 現在の日時を取得
now = datetime.datetime.now()

# 分かりやすく表示
print("=== 現在の時刻 ===")
print(f"{now.year}年{now.month}月{now.day}日")
print(f"{now.hour}時{now.minute}分")

# 曜日を表示
weekdays = ["月", "火", "水", "木", "金", "土", "日"]
weekday = weekdays[now.weekday()]
print(f"{weekday}曜日")
```

プログラムを実行してみましょう。

```bash
python time_display.py
```

実行結果の例：

```
=== 現在の時刻 ===
2024年3月15日
14時30分
金曜日
```

`weekday()`メソッドは、月曜日を0として曜日を数値で返します。リストを使って、数値を日本語の曜日に変換しています。

## まとめ

本章では、`datetime`モジュールの基本的な使い方について学習しました。

`datetime.datetime.now()`で現在の日時を、`datetime.date.today()`で今日の日付を取得できます。年、月、日などの値は個別に取り出すことができ、計算にも使用できます。

`datetime.date(年, 月, 日)`で特定の日付を作成し、`datetime.timedelta()`を使って日数の計算ができることも学びました。

これらの機能を使うことで、年齢計算や日数計算、時刻表示など、日付や時間に関する様々なプログラムを作ることができるようになりました。