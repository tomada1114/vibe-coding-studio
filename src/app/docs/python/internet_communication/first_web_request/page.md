---
title: 初めてのWebリクエストを送ってみよう
nextjs:
  metadata:
    title: 初めてのWebリクエストを送ってみよう
    description: Pythonのrequestsライブラリを使って初めてのWebリクエストを送信する方法を学習。基本的なGETリクエストの書き方から、レスポンスの確認、エラー処理まで初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- `requests.get()`を使った基本的なWebリクエストの送信方法を理解する
- 簡単なWebサイトにアクセスしてレスポンスを受け取る方法を習得する
- レスポンスの内容を確認する方法を学ぶ
- 基本的なエラー処理の方法を理解する

## 最初のWebリクエストを送ってみよう

それでは、実際にrequestsライブラリを使って、インターネット上のWebサイトにアクセスしてみましょう。

VS Codeで新しいファイル `first_request.py` を作成し、以下のコードを入力してください。

```python
# requestsライブラリをインポート
import requests

# 簡単なWebサイトにGETリクエストを送信
response = requests.get("https://httpbin.org/get")

print("リクエストが完了しました")
print(f"ステータスコード: {response.status_code}")
```

このプログラムを実行してみましょう。

```bash
python first_request.py
```

実行結果は以下のようになります。

```
リクエストが完了しました
ステータスコード: 200
```

おめでとうございます！これで初めてのWebリクエストが成功しました。

`requests.get()`という関数を使うことで、指定したURLにGETリクエストを送ることができます。今回アクセスした`https://httpbin.org/get`は、HTTP通信のテストに使える便利なWebサイトです。

## ステータスコードとは

`response.status_code`で表示された`200`という数字は、**ステータスコード**と呼ばれるものです。これは、サーバーからの返事の状態を表す数字です。

ステータスコードには、以下のような意味があります。

| ステータスコード | 意味 | 説明 |
|---|---|---|
| 200 | 成功 | リクエストが正常に処理された |
| 404 | 見つからない | 指定したページが存在しない |
| 500 | サーバーエラー | サーバー側で何らかの問題が発生 |

`200`が表示されたということは、リクエストが正常に処理されたということです。まるで郵便を送ったときに「無事に届きました」という返事をもらったような状態です。

## レスポンスの内容を確認してみよう

サーバーからの返事には、ステータスコード以外にも様々な情報が含まれています。その内容を確認してみましょう。

同じファイルに以下のコードを追加してください。

```python
# requestsライブラリをインポート
import requests

# 簡単なWebサイトにGETリクエストを送信
response = requests.get("https://httpbin.org/get")

print("リクエストが完了しました")
print(f"ステータスコード: {response.status_code}")

# レスポンスの詳細情報を確認
print(f"レスポンスのサイズ: {len(response.text)}文字")
print(f"レスポンスの種類: {response.headers.get('content-type')}")
```

プログラムを実行すると、以下のような結果が表示されます。

```
リクエストが完了しました
ステータスコード: 200
レスポンスのサイズ: 312文字
レスポンスの種類: application/json
```

`response.text`は、サーバーから返ってきた内容を文字列として取得できます。また、`response.headers`には、レスポンスに関する詳細な情報が含まれています。

## レスポンスの中身を見てみよう

実際にサーバーから返ってきた内容を表示してみましょう。以下のコードを追加してください。

```python
# requestsライブラリをインポート
import requests

# 簡単なWebサイトにGETリクエストを送信
response = requests.get("https://httpbin.org/get")

print("リクエストが完了しました")
print(f"ステータスコード: {response.status_code}")

# レスポンスの詳細情報を確認
print(f"レスポンスのサイズ: {len(response.text)}文字")
print(f"レスポンスの種類: {response.headers.get('content-type')}")

# レスポンスの中身を表示
print("\n=== サーバーからの返事 ===")
print(response.text)
```

プログラムを実行すると、以下のような結果が表示されます。

```
リクエストが完了しました
ステータスコード: 200
レスポンスのサイズ: 312文字
レスポンスの種類: application/json

=== サーバーからの返事 ===
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.31.0"
  },
  "origin": "xxx.xxx.xxx.xxx",
  "url": "https://httpbin.org/get"
}
```

この結果は、JSON形式という特別な形式で返ってきています。JSONについては次回詳しく学習しますが、今は「サーバーから構造化されたデータが返ってきている」ということを理解しておいてください。

## 別のWebサイトにもアクセスしてみよう

今度は、実際に存在するWebサイトにアクセスしてみましょう。新しいファイル `website_request.py` を作成し、以下のコードを入力してください。

```python
# 実際のWebサイトにアクセス
import requests

# GoogleのWebサイトにアクセス
print("Googleにアクセスしています...")
response = requests.get("https://www.google.com")

print(f"ステータスコード: {response.status_code}")
print(f"レスポンスのサイズ: {len(response.text)}文字")

# HTMLの最初の部分だけを表示
print("\n=== HTMLの最初の200文字 ===")
print(response.text[:200])
```

このプログラムを実行してみましょう。

```bash
python website_request.py
```

実行結果は以下のようになります。

```
Googleにアクセスしています...
ステータスコード: 200
レスポンスのサイズ: 15234文字

=== HTMLの最初の200文字 ===
<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="ja"><head><meta content="世界中のあらゆる情報を検索するためのツールを提供しています。さまざまな検索機能を活用して、お探しの情報を見つけてください。" name="description"
```

GoogleのWebサイトから、HTML形式のデータが返ってきました。普段ブラウザで見ているWebページは、実はこのようなHTMLというコードで作られているのです。

## エラーが発生した場合の対処法

Webリクエストでは、時々エラーが発生することがあります。存在しないページにアクセスしたときの例を見てみましょう。

新しいファイル `error_handling.py` を作成し、以下のコードを入力してください。

```python
# 存在しないページにアクセスしてエラーを確認
import requests

# 存在しないページにアクセス
print("存在しないページにアクセスしています...")
response = requests.get("https://httpbin.org/status/404")

print(f"ステータスコード: {response.status_code}")

# ステータスコードで成功か失敗かを判定
if response.status_code == 200:
    print("✓ リクエストが成功しました")
else:
    print(f"✗ リクエストが失敗しました（エラーコード: {response.status_code}）")
```

このプログラムを実行すると、以下のような結果が表示されます。

```
存在しないページにアクセスしています...
ステータスコード: 404
✗ リクエストが失敗しました（エラーコード: 404）
```

ステータスコード`404`は、「ページが見つからない」ということを意味しています。ブラウザで間違ったURLにアクセスしたときに表示される「404 Not Found」エラーと同じです。

## より安全なエラー処理を追加しよう

実際のプログラムでは、ネットワークエラーなど様々な問題が発生する可能性があります。そのため、try-except文を使ってエラー処理を行うことが重要です。

以下のコードを追加してみましょう。

```python
# より安全なエラー処理
import requests

def safe_request(url):
    try:
        print(f"アクセス中: {url}")
        response = requests.get(url)
        
        if response.status_code == 200:
            print("✓ 正常にアクセスできました")
            return response
        else:
            print(f"✗ エラーが発生しました（ステータスコード: {response.status_code}）")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"✗ ネットワークエラーが発生しました: {e}")
        return None

# 正常なURLでテスト
result1 = safe_request("https://httpbin.org/get")

# エラーになるURLでテスト
result2 = safe_request("https://httpbin.org/status/500")
```

このプログラムを実行すると、以下のような結果が表示されます。

```
アクセス中: https://httpbin.org/get
✓ 正常にアクセスできました
アクセス中: https://httpbin.org/status/500
✗ エラーが発生しました（ステータスコード: 500）
```

この`safe_request`関数は、様々なエラーに対応できる安全なリクエスト処理を行います。実際のプログラムでは、このようなエラー処理を必ず含めることが大切です。

## リクエストの流れを理解しよう

最後に、今回学習したWebリクエストの流れを整理してみましょう。

1. **リクエストの準備**：アクセスしたいURLを決める
2. **リクエストの送信**：`requests.get()`でサーバーに要求を送る
3. **レスポンスの受信**：サーバーからの返事を受け取る
4. **結果の確認**：ステータスコードで成功・失敗を判定する
5. **データの取得**：必要に応じてレスポンスの内容を取り出す

このような流れで、Pythonプログラムからインターネット上の様々な情報にアクセスできるようになります。

たとえば、ニュースサイトから最新記事を取得したり、天気予報サービスから天気情報を取得したりすることが可能です。ただし、それらの多くは特別な形式（JSON）でデータが提供されているため、次回はそのJSONデータの扱い方を学習していきます。

## まとめ

本章では、requestsライブラリを使って初めてのWebリクエストを送信する方法を学習しました。

`requests.get()`関数を使うことで、指定したURLにアクセスして情報を取得できるようになりました。また、ステータスコードを確認することで、リクエストが成功したかどうかを判定できることも学びました。

重要なポイントは以下の通りです。

- `requests.get(URL)`でWebサイトにアクセスできる
- `response.status_code`で結果の成功・失敗を確認できる
- `response.text`でサーバーからの返事の内容を取得できる
- エラー処理を含めることで安全なプログラムを作れる

これで、Pythonプログラムからインターネット上の情報にアクセスする基本的な方法をマスターしました。次回は、サーバーから返ってくるJSONデータの扱い方を学習して、より実用的なデータの取得方法を身につけていきましょう。