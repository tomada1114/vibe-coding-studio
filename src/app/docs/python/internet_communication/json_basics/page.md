---
title: JSONデータの基本を理解しよう
nextjs:
  metadata:
    title: JSONデータの基本を理解しよう
    description: JSONデータの基本概念から読み込み・変換方法まで初心者向けに解説。PythonでJSONを扱う方法と、辞書との関係性を実践的に学習します。
---

## 学習の目標

本章では、以下の内容を学習します。

- JSONとは何かを理解する
- JSONの基本的な書き方と構造を学ぶ
- PythonでJSONデータを読み込む方法を習得する
- JSONと辞書の関係性を理解する
- 実際のAPIから取得したJSONデータを処理する方法を学ぶ

## JSONとは何か

前回のWebリクエストで、サーバーから以下のような形式のデータが返ってきたことを覚えていますか。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "User-Agent": "python-requests/2.31.0"
  },
  "origin": "xxx.xxx.xxx.xxx",
  "url": "https://httpbin.org/get"
}
```

この形式のデータを**JSON**（ジェイソン）と呼びます。JSONは「JavaScript Object Notation」の略ですが、現在では多くのプログラミング言語で使われている、データをやり取りするための標準的な形式です。

JSONは、人間にとって読みやすく、コンピューターにとっても処理しやすい形式になっています。まるで設計図のように、データの構造を分かりやすく表現できるのが特徴です。

インターネット上のAPIやWebサービスの多くは、JSONの形式でデータを提供しています。そのため、JSONを理解することで、様々なWebサービスからデータを取得して活用できるようになります。

## JSONの基本的な書き方

JSONの書き方は、Pythonの辞書やリストととてもよく似ています。以下のような要素で構成されています。

**文字列**は、ダブルクォート（`"`）で囲みます。

```json
"こんにちは"
```

**数値**は、そのまま書きます。

```json
42
```

**真偽値**は、`true`または`false`で表現します（Pythonの`True`、`False`とは書き方が少し違います）。

```json
true
```

**配列**は、角括弧（`[]`）で囲み、要素をカンマで区切ります。

```json
["りんご", "バナナ", "オレンジ"]
```

**オブジェクト**は、波括弧（`{}`）で囲み、キーと値のペアをコロンで結びます。

```json
{
  "name": "田中太郎",
  "age": 25,
  "city": "東京"
}
```

## PythonでJSONを扱ってみよう

Pythonには、JSONデータを簡単に扱うための`json`モジュールが標準で用意されています。実際に使ってみましょう。

VS Codeで新しいファイル `json_basic.py` を作成し、以下のコードを入力してください。

```python
# jsonモジュールをインポート
import json

# JSON形式の文字列を準備
json_string = '''
{
  "name": "田中太郎",
  "age": 25,
  "city": "東京",
  "hobbies": ["読書", "映画鑑賞", "プログラミング"]
}
'''

print("元のJSON文字列:")
print(json_string)
```

このプログラムを実行してみましょう。

```bash
python json_basic.py
```

実行結果は以下のようになります。

```
元のJSON文字列:

{
  "name": "田中太郎",
  "age": 25,
  "city": "東京",
  "hobbies": ["読書", "映画鑑賞", "プログラミング"]
}
```

現在は、JSONが単なる文字列として表示されています。この文字列をPythonで扱いやすい形（辞書）に変換してみましょう。

## JSONを辞書に変換してみよう

`json.loads()`関数を使うと、JSON形式の文字列をPythonの辞書に変換できます。同じファイルに以下のコードを追加してください。

```python
# jsonモジュールをインポート
import json

# JSON形式の文字列を準備
json_string = '''
{
  "name": "田中太郎",
  "age": 25,
  "city": "東京",
  "hobbies": ["読書", "映画鑑賞", "プログラミング"]
}
'''

print("元のJSON文字列:")
print(json_string)

# JSONを辞書に変換
data = json.loads(json_string)

print("\n辞書に変換後:")
print(data)
print(f"データの型: {type(data)}")
```

プログラムを実行すると、以下のような結果が表示されます。

```
元のJSON文字列:

{
  "name": "田中太郎",
  "age": 25,
  "city": "東京",
  "hobbies": ["読書", "映画鑑賞", "プログラミング"]
}

辞書に変換後:
{'name': '田中太郎', 'age': 25, 'city': '東京', 'hobbies': ['読書', '映画鑑賞', 'プログラミング']}
データの型: <class 'dict'>
```

`json.loads()`を使うことで、JSON形式の文字列がPythonの辞書に変換されました。これで、辞書と同じ方法でデータにアクセスできるようになります。

## 変換した辞書からデータを取り出してみよう

辞書に変換したデータから、個別の情報を取り出してみましょう。以下のコードを追加してください。

```python
# 変換した辞書から個別のデータを取り出し
print("\n=== 個別データの取得 ===")
print(f"名前: {data['name']}")
print(f"年齢: {data['age']}")
print(f"住んでいる都市: {data['city']}")

# リスト形式のデータも取り出せる
print(f"趣味の数: {len(data['hobbies'])}個")
print("趣味一覧:")
for hobby in data['hobbies']:
    print(f"  - {hobby}")
```

実行すると、以下のような結果が表示されます。

```
=== 個別データの取得 ===
名前: 田中太郎
年齢: 25
住んでいる都市: 東京
趣味の数: 3個
趣味一覧:
  - 読書
  - 映画鑑賞
  - プログラミング
```

このように、JSONから変換した辞書は、これまでに学習した辞書の操作方法と全く同じように使うことができます。

## 辞書をJSONに変換してみよう

今度は逆に、Pythonの辞書をJSON形式の文字列に変換してみましょう。新しいファイル `dict_to_json.py` を作成し、以下のコードを入力してください。

```python
import json

# Pythonの辞書を準備
person_data = {
    "name": "佐藤花子",
    "age": 30,
    "city": "大阪",
    "is_student": False,
    "scores": [85, 92, 78]
}

print("元の辞書:")
print(person_data)
print(f"データの型: {type(person_data)}")

# 辞書をJSONに変換
json_string = json.dumps(person_data, ensure_ascii=False, indent=2)

print("\nJSON形式に変換後:")
print(json_string)
print(f"データの型: {type(json_string)}")
```

このプログラムを実行してみましょう。

```bash
python dict_to_json.py
```

実行結果は以下のようになります。

```
元の辞書:
{'name': '佐藤花子', 'age': 30, 'city': '大阪', 'is_student': False, 'scores': [85, 92, 78]}
データの型: <class 'dict'>

JSON形式に変換後:
{
  "name": "佐藤花子",
  "age": 30,
  "city": "大阪",
  "is_student": false,
  "scores": [
    85,
    92,
    78
  ]
}
データの型: <class 'str'>
```

`json.dumps()`関数を使うことで、辞書をJSON形式の文字列に変換できました。`ensure_ascii=False`は日本語を正しく表示するため、`indent=2`は読みやすく整形するためのオプションです。

## 実際のWebリクエストでJSONを使ってみよう

それでは、前回学習したWebリクエストと組み合わせて、実際のAPIからJSONデータを取得して処理してみましょう。

新しいファイル `api_json.py` を作成し、以下のコードを入力してください。

```python
import requests
import json

# JSONデータを返すAPIにアクセス
print("APIからデータを取得中...")
response = requests.get("https://httpbin.org/json")

# リクエストが成功したかチェック
if response.status_code == 200:
    print("✓ データの取得に成功しました")
    
    # JSONデータを辞書に変換
    data = response.json()  # json.loads(response.text)と同じ
    
    print(f"\nデータの型: {type(data)}")
    print("\n取得したデータ:")
    print(json.dumps(data, ensure_ascii=False, indent=2))
    
else:
    print(f"✗ データの取得に失敗しました（ステータスコード: {response.status_code}）")
```

このプログラムを実行してみましょう。

```bash
python api_json.py
```

実行結果は以下のようになります。

```
APIからデータを取得中...
✓ データの取得に成功しました

データの型: <class 'dict'>

取得したデータ:
{
  "slideshow": {
    "author": "Yours Truly",
    "date": "date of publication",
    "slides": [
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "items": [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets"
        ],
        "title": "Overview",
        "type": "all"
      }
    ],
    "title": "Sample Slide Show"
  }
}
```

`response.json()`メソッドを使うと、レスポンスのJSONデータを直接辞書に変換できます。これは`json.loads(response.text)`と同じ結果になる便利な方法です。

## 複雑なJSONデータから必要な情報を取り出してみよう

取得したJSONデータから、必要な情報だけを取り出してみましょう。以下のコードを追加してください。

```python
# 複雑なJSONデータから必要な情報を取り出し
if response.status_code == 200:
    data = response.json()
    
    # スライドショーの情報を取得
    slideshow = data["slideshow"]
    
    print("=== スライドショー情報 ===")
    print(f"タイトル: {slideshow['title']}")
    print(f"作者: {slideshow['author']}")
    print(f"スライド数: {len(slideshow['slides'])}枚")
    
    print("\n=== 各スライドの情報 ===")
    for i, slide in enumerate(slideshow["slides"], 1):
        print(f"スライド{i}: {slide['title']}")
        if 'items' in slide:
            print(f"  項目数: {len(slide['items'])}個")
```

実行すると、以下のような結果が表示されます。

```
=== スライドショー情報 ===
タイトル: Sample Slide Show
作者: Yours Truly
スライド数: 2枚

=== 各スライドの情報 ===
スライド1: Wake up to WonderWidgets!
スライド2: Overview
  項目数: 2個
```

このように、複雑な構造のJSONデータからも、辞書やリストの操作方法を使って必要な情報を取り出すことができます。

## まとめ

本章では、JSONデータの基本的な概念と、Pythonでの扱い方を学習しました。

JSONは、インターネット上でデータをやり取りするための標準的な形式で、Pythonの辞書やリストと非常によく似た構造を持っています。また、`json`モジュールを使うことで、JSONと辞書を簡単に相互変換できることも学びました。

重要なポイントは以下の通りです。

- JSONはデータ交換のための標準的な形式である
- `json.loads()`でJSON文字列を辞書に変換できる
- `json.dumps()`で辞書をJSON文字列に変換できる
- `response.json()`でWebリクエストのレスポンスを直接辞書に変換できる
- JSONから変換した辞書は、通常の辞書と同じ方法で操作できる

これで、WebAPIから取得したJSONデータを処理する基本的な方法をマスターしました。次回は、実際の無料APIを使って、より実用的なデータ取得プログラムを作成してみましょう。