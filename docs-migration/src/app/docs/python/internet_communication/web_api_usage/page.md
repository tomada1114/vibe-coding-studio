---
title: WebAPIを使ってデータを取得しよう
nextjs:
  metadata:
    title: WebAPIを使ってデータを取得しよう
    description: 無料のWebAPIを使って実際にデータを取得する方法を学習。天気情報やニュース情報の取得を通じて、実用的なプログラム作成方法を初心者向けに解説します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 無料で利用できるWebAPIの概要を理解する
- 天気情報APIからデータを取得する方法を習得する
- ニュース情報APIからデータを取得する方法を学ぶ
- 取得したデータを使った実用的なプログラムの作成方法を理解する

## WebAPIとは何か

**WebAPI**（Web Application Programming Interface）とは、インターネット上でデータを提供してくれるサービスのことです。まるで図書館のように、様々な情報を整理して提供してくれています。

私たちがこれまでに学習したHTTPリクエストとJSONの知識を使うことで、これらのAPIから必要なデータを取得できるようになります。

WebAPIを使うことで、以下のような情報を簡単に取得できます。

- 天気予報の情報
- ニュースの最新記事
- 為替レートの情報
- 地図や位置情報
- SNSの投稿データ

多くのWebAPIは無料で利用でき、個人の学習や小規模なプロジェクトであれば十分に活用できます。

## 無料の天気情報APIを使ってみよう

それでは、実際に無料のAPIを使って天気情報を取得してみましょう。今回は、認証が不要で簡単に使える**wttr.in**という天気サービスを使用します。

VS Codeで新しいファイル `weather_api.py` を作成し、以下のコードを入力してください。

```python
import requests
import json

# 天気情報を取得する関数
def get_weather(city):
    # wttr.inのAPIを使用（JSON形式で取得）
    url = f"https://wttr.in/{city}?format=j1"
    
    try:
        print(f"{city}の天気情報を取得中...")
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"エラー: ステータスコード {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"ネットワークエラー: {e}")
        return None

# 東京の天気を取得
weather_data = get_weather("Tokyo")

if weather_data:
    print("✓ 天気データの取得に成功しました")
    print(f"データの型: {type(weather_data)}")
else:
    print("✗ 天気データの取得に失敗しました")
```

このプログラムを実行してみましょう。

```bash
python weather_api.py
```

実行結果は以下のようになります。

```
Tokyoの天気情報を取得中...
✓ 天気データの取得に成功しました
データの型: <class 'dict'>
```

APIから天気データを正常に取得できました。しかし、この段階ではまだデータの中身を確認していません。実際にどのようなデータが返ってきているか見てみましょう。

## 天気データの中身を確認してみよう

取得したJSONデータの構造を確認してから、必要な情報を取り出してみましょう。以下のコードを追加してください。

```python
# 取得したデータの一部を確認
if weather_data:
    print("✓ 天気データの取得に成功しました")
    
    # 現在の天気情報を取得
    current_condition = weather_data["current_condition"][0]
    
    print("\n=== 現在の天気 ===")
    print(f"気温: {current_condition['temp_C']}°C")
    print(f"体感温度: {current_condition['FeelsLikeC']}°C")
    print(f"天気: {current_condition['weatherDesc'][0]['value']}")
    print(f"湿度: {current_condition['humidity']}%")
    print(f"風速: {current_condition['windspeedKmph']} km/h")
```

プログラムを実行すると、以下のような結果が表示されます。

```
Tokyoの天気情報を取得中...
✓ 天気データの取得に成功しました

=== 現在の天気 ===
気温: 15°C
体感温度: 13°C
天気: Partly cloudy
湿度: 65%
風速: 11 km/h
```

APIから取得したJSONデータには、気温、天気、湿度などの詳細な天気情報が含まれていることがわかります。これらの情報を使って、より実用的なプログラムを作ることができます。

## 複数の都市の天気を比較してみよう

今度は、複数の都市の天気情報を取得して比較してみましょう。以下のコードを追加してください。

```python
# 複数都市の天気比較
def compare_weather(cities):
    print("=== 複数都市の天気比較 ===")
    
    for city in cities:
        weather_data = get_weather(city)
        
        if weather_data:
            current = weather_data["current_condition"][0]
            temp = current['temp_C']
            weather_desc = current['weatherDesc'][0]['value']
            
            print(f"{city:10}: {temp:3}°C - {weather_desc}")
        else:
            print(f"{city:10}: データ取得失敗")
        
        # API呼び出し間隔を空ける（サーバーに負荷をかけないため）
        import time
        time.sleep(1)

# 日本の主要都市の天気を比較
cities = ["Tokyo", "Osaka", "Nagoya", "Fukuoka"]
compare_weather(cities)
```

実行すると、以下のような結果が表示されます。

```
=== 複数都市の天気比較 ===
Tokyoの天気情報を取得中...
Tokyo     :  15°C - Partly cloudy
Osakaの天気情報を取得中...
Osaka     :  17°C - Clear
Nagoyaの天気情報を取得中...
Nagoya    :  14°C - Overcast
Fukuokaの天気情報を取得中...
Fukuoka   :  18°C - Clear
```

このように、複数の都市の天気情報を一度に取得して比較することができます。`time.sleep(1)`を使用しているのは、APIサーバーに過度な負荷をかけないためです。

## 簡単なニュース情報を取得してみよう

次に、別のAPIを使ってニュース情報を取得してみましょう。今回は、JSONPlaceholderという練習用のAPIを使用します。

新しいファイル `news_api.py` を作成し、以下のコードを入力してください。

```python
import requests
import json

# ニュース記事（練習用データ）を取得
def get_sample_posts():
    url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        print("サンプル記事を取得中...")
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"エラー: ステータスコード {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"ネットワークエラー: {e}")
        return None

# 記事データを取得
posts = get_sample_posts()

if posts:
    print(f"✓ {len(posts)}件の記事を取得しました")
    
    # 最初の5件の記事タイトルを表示
    print("\n=== 最新記事（最初の5件） ===")
    for i, post in enumerate(posts[:5], 1):
        print(f"{i}. {post['title']}")
        print(f"   作者ID: {post['userId']}")
        print()

else:
    print("✗ 記事データの取得に失敗しました")
```

このプログラムを実行してみましょう。

```bash
python news_api.py
```

実行結果は以下のようになります。

```
サンプル記事を取得中...
✓ 100件の記事を取得しました

=== 最新記事（最初の5件） ===
1. sunt aut facere repellat provident occaecati excepturi optio reprehenderit
   作者ID: 1

2. qui est esse
   作者ID: 1

3. ea molestias quasi exercitationem repellat qui ipsa sit aut
   作者ID: 1

4. eum et est occaecati
   作者ID: 1

5. nesciunt quas odio
   作者ID: 1
```

JSONPlaceholderは練習用のAPIなので、実際のニュースではありませんが、APIからデータを取得する流れは実際のニュースAPIと同じです。

## データを使った実用的なプログラムを作ってみよう

最後に、これまでに学習した内容を組み合わせて、実用的なプログラムを作ってみましょう。天気情報を取得して、条件に応じてメッセージを表示するプログラムを作成します。

新しいファイル `weather_advisor.py` を作成し、以下のコードを入力してください。

```python
import requests

def get_weather_advice(city):
    """指定した都市の天気に基づいてアドバイスを提供"""
    url = f"https://wttr.in/{city}?format=j1"
    
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return "天気情報の取得に失敗しました"
            
        weather_data = response.json()
        current = weather_data["current_condition"][0]
        
        # 基本情報を取得
        temp = int(current['temp_C'])
        humidity = int(current['humidity'])
        weather_desc = current['weatherDesc'][0]['value'].lower()
        
        # 天気に基づくアドバイス
        advice = []
        
        # 気温に基づくアドバイス
        if temp < 5:
            advice.append("🧥 とても寒いです。厚いコートを着ましょう")
        elif temp < 15:
            advice.append("🧥 肌寒いです。ジャケットを持参しましょう")
        elif temp > 30:
            advice.append("🌡️ とても暑いです。水分補給を忘れずに")
        elif temp > 25:
            advice.append("☀️ 暖かいです。軽装で過ごせそうです")
        
        # 天気に基づくアドバイス
        if "rain" in weather_desc or "shower" in weather_desc:
            advice.append("☔ 雨が降っています。傘を持参しましょう")
        elif "cloud" in weather_desc:
            advice.append("☁️ 曇りです。急な雨に注意しましょう")
        elif "clear" in weather_desc or "sunny" in weather_desc:
            advice.append("☀️ 晴れています。お出かけ日和ですね")
        
        # 湿度に基づくアドバイス
        if humidity > 80:
            advice.append("💧 湿度が高めです。蒸し暑く感じるかもしれません")
        elif humidity < 30:
            advice.append("💨 乾燥しています。保湿を心がけましょう")
        
        return advice
        
    except Exception as e:
        return [f"エラーが発生しました: {e}"]

# メイン処理
def main():
    print("=== 天気アドバイザー ===")
    
    city = input("都市名を英語で入力してください（例：Tokyo）: ")
    
    if not city:
        city = "Tokyo"  # デフォルト値
    
    print(f"\n{city}の天気情報を確認中...")
    
    advice_list = get_weather_advice(city)
    
    print(f"\n📍 {city}の天気アドバイス:")
    print("-" * 40)
    
    for advice in advice_list:
        print(f"• {advice}")
    
    print("-" * 40)
    print("良い一日をお過ごしください！")

# プログラムを実行
if __name__ == "__main__":
    main()
```

このプログラムを実行してみましょう。

```bash
python weather_advisor.py
```

実行すると、以下のような対話が始まります。

```
=== 天気アドバイザー ===
都市名を英語で入力してください（例：Tokyo）: Tokyo

Tokyoの天気情報を確認中...

📍 Tokyoの天気アドバイス:
----------------------------------------
• 🧥 肌寒いです。ジャケットを持参しましょう
• ☁️ 曇りです。急な雨に注意しましょう
• 💧 湿度が高めです。蒸し暑く感じるかもしれません
----------------------------------------
良い一日をお過ごしください！
```

このプログラムは、APIから取得した天気データを分析して、ユーザーに実用的なアドバイスを提供します。気温、天気、湿度などの条件を組み合わせて、その日の服装や注意点をアドバイスしてくれます。

## エラー処理と改良のポイント

実際のプログラムでは、様々なエラーが発生する可能性があります。以下のようなポイントに注意することで、より安定したプログラムを作ることができます。

- **ネットワークエラー**：インターネット接続の問題に対処する
- **APIの制限**：アクセス回数や頻度の制限に注意する
- **データの形式変更**：APIの仕様変更に備える
- **無効な入力**：ユーザーからの入力値を検証する

今回作成したプログラムでも、try-except文を使ってエラー処理を行っています。実際のアプリケーションでは、さらに詳細なエラー処理が必要になることがあります。

## まとめ

本章では、実際のWebAPIを使ってデータを取得し、それを活用したプログラムを作成する方法を学習しました。

無料の天気APIを使って気象情報を取得し、その情報を基にユーザーに実用的なアドバイスを提供するプログラムを作ることができました。また、複数のAPIを比較して、それぞれの特徴や使い方を理解しました。

重要なポイントは以下の通りです。

- WebAPIを使うことで様々な外部データを活用できる
- JSONデータの構造を理解して必要な情報を取り出すことが重要
- エラー処理を含めることで安定したプログラムを作れる
- 取得したデータを分析・加工することで付加価値のあるサービスを作れる
- APIの利用には制限があるため、適切な間隔でアクセスすることが大切

これで、インターネット上の様々なサービスからデータを取得して活用するプログラムを作れるようになりました。今回学習した技術を応用することで、天気アプリ、ニュースアプリ、データ分析ツールなど、様々な実用的なプログラムを作成できるでしょう。