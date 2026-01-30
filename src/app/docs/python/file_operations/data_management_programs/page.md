---
title: ファイルを使ったデータ管理プログラムを作ろう
nextjs:
  metadata:
    title: ファイルを使ったデータ管理プログラムを作ろう
    description: Pythonでファイル操作を活用したシンプルなデータ管理プログラムを作成し、実用的なファイル操作スキルを習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- ファイル操作を組み合わせた実用的なプログラムの作成方法を理解する
- ユーザーからの入力を受け取ってファイルに保存する方法を学ぶ
- データの追加、表示、検索機能を持つプログラムの作成方法を習得する
- エラー処理を含む安全なファイル操作プログラムの書き方を理解する

## はじめに

これまでの章で、テキストファイルやCSVファイルの基本的な読み書き方法を学習してきました。
今回は、これらの知識を組み合わせて、実際に使えるデータ管理プログラムを作成してみましょう。

作成するのは、簡単な**メモ管理プログラム**です。
ユーザーがメモを入力すると、それがファイルに保存され、いつでも確認できるプログラムを作っていきます。

段階的に機能を追加していくので、一つずつ確実に理解しながら進めていきましょう。

## 基本的なメモ追加機能を作る

まずは、ユーザーからメモを受け取ってファイルに保存する基本的な機能から作成します。

VS Codeで`memo_manager.py`というファイルを作成し、以下のコードを入力してください。

```python
# 基本的なメモ追加機能
def add_memo():
    """新しいメモを追加する"""
    memo = input("メモを入力してください: ")
    
    # ファイルに追記する
    with open('memos.txt', 'a', encoding='utf-8') as file:
        file.write(memo + '\n')
    
    print("メモを保存しました")

# プログラムを実行
print("=== メモ管理プログラム ===")
add_memo()
```

このコードを実行してみましょう。

```bash
python memo_manager.py
```

実行すると、以下のような操作ができます。

```
=== メモ管理プログラム ===
メモを入力してください: 今日は晴れ
メモを保存しました
```

実行後、`memos.txt`ファイルが作成され、入力したメモが保存されます。
ファイルを開いて確認してみてください。

何度かプログラムを実行すると、メモが追記されていくことが確認できます。

## メモ表示機能を追加する

次に、保存されたメモを表示する機能を追加しましょう。

先ほどのコードに以下の内容を追加してください。

```python
# 基本的なメモ追加機能
def add_memo():
    """新しいメモを追加する"""
    memo = input("メモを入力してください: ")
    
    # ファイルに追記する
    with open('memos.txt', 'a', encoding='utf-8') as file:
        file.write(memo + '\n')
    
    print("メモを保存しました")

# ここから追加
def show_memos():
    """保存されたメモを表示する"""
    try:
        with open('memos.txt', 'r', encoding='utf-8') as file:
            memos = file.readlines()
        
        if memos:
            print("\n=== 保存されたメモ ===")
            for i, memo in enumerate(memos, 1):
                print(f"{i}. {memo.strip()}")
        else:
            print("メモがありません")
    
    except FileNotFoundError:
        print("まだメモがありません")

# プログラムを実行
print("=== メモ管理プログラム ===")
add_memo()
show_memos()
```

このコードを実行してみましょう。

```bash
python memo_manager.py
```

実行すると、以下のような結果が表示されます。

```
=== メモ管理プログラム ===
メモを入力してください: 明日は雨の予報
メモを保存しました

=== 保存されたメモ ===
1. 今日は晴れ
2. 明日は雨の予報
```

`show_memos()`関数では、`try-except`文を使ってファイルが存在しない場合のエラーを処理しています。
また、`enumerate(memos, 1)`を使って各メモに番号を付けて表示しています。

## メニュー機能を追加する

ユーザーが「メモ追加」か「メモ表示」かを選択できるメニュー機能を追加しましょう。

コードを以下のように修正してください。

```python
# 基本的なメモ追加機能
def add_memo():
    """新しいメモを追加する"""
    memo = input("メモを入力してください: ")
    
    # ファイルに追記する
    with open('memos.txt', 'a', encoding='utf-8') as file:
        file.write(memo + '\n')
    
    print("メモを保存しました")

def show_memos():
    """保存されたメモを表示する"""
    try:
        with open('memos.txt', 'r', encoding='utf-8') as file:
            memos = file.readlines()
        
        if memos:
            print("\n=== 保存されたメモ ===")
            for i, memo in enumerate(memos, 1):
                print(f"{i}. {memo.strip()}")
        else:
            print("メモがありません")
    
    except FileNotFoundError:
        print("まだメモがありません")

# ここから追加
def show_menu():
    """メニューを表示する"""
    print("\n=== メニュー ===")
    print("1. メモを追加")
    print("2. メモを表示")
    print("3. 終了")

# メインプログラム
print("=== メモ管理プログラム ===")

while True:
    show_menu()
    choice = input("選択してください (1-3): ")
    
    if choice == '1':
        add_memo()
    elif choice == '2':
        show_memos()
    elif choice == '3':
        print("プログラムを終了します")
        break
    else:
        print("1から3の数字を入力してください")
```

このコードを実行してみましょう。

```bash
python memo_manager.py
```

実行すると、以下のような操作ができます。

```
=== メモ管理プログラム ===

=== メニュー ===
1. メモを追加
2. メモを表示
3. 終了
選択してください (1-3): 1
メモを入力してください: 買い物に行く
メモを保存しました

=== メニュー ===
1. メモを追加
2. メモを表示
3. 終了
選択してください (1-3): 2

=== 保存されたメモ ===
1. 今日は晴れ
2. 明日は雨の予報
3. 買い物に行く

=== メニュー ===
1. メモを追加
2. メモを表示
3. 終了
選択してください (1-3): 3
プログラムを終了します
```

`while True`ループを使うことで、ユーザーが「3」を選択するまで繰り返し操作できるようになりました。

## 日付付きメモ機能を追加する

メモに日付を自動で付ける機能を追加してみましょう。

コードの最初に`datetime`モジュールを追加し、`add_memo()`関数を修正してください。

```python
import datetime

# 日付付きメモ追加機能に修正
def add_memo():
    """新しいメモを追加する"""
    memo = input("メモを入力してください: ")
    
    # 現在の日時を取得
    now = datetime.datetime.now()
    date_str = now.strftime("%Y-%m-%d %H:%M")
    
    # 日付付きでファイルに追記する
    with open('memos.txt', 'a', encoding='utf-8') as file:
        file.write(f"[{date_str}] {memo}\n")
    
    print("メモを保存しました")

def show_memos():
    """保存されたメモを表示する"""
    try:
        with open('memos.txt', 'r', encoding='utf-8') as file:
            memos = file.readlines()
        
        if memos:
            print("\n=== 保存されたメモ ===")
            for i, memo in enumerate(memos, 1):
                print(f"{i}. {memo.strip()}")
        else:
            print("メモがありません")
    
    except FileNotFoundError:
        print("まだメモがありません")

def show_menu():
    """メニューを表示する"""
    print("\n=== メニュー ===")
    print("1. メモを追加")
    print("2. メモを表示")
    print("3. 終了")

# メインプログラム
print("=== メモ管理プログラム ===")

while True:
    show_menu()
    choice = input("選択してください (1-3): ")
    
    if choice == '1':
        add_memo()
    elif choice == '2':
        show_memos()
    elif choice == '3':
        print("プログラムを終了します")
        break
    else:
        print("1から3の数字を入力してください")
```

このコードを実行してみましょう。

```bash
python memo_manager.py
```

メモを追加すると、以下のような形で日付付きで保存されます。

```
=== メニュー ===
1. メモを追加
2. メモを表示
3. 終了
選択してください (1-3): 1
メモを入力してください: 会議の準備をする
メモを保存しました

=== メニュー ===
1. メモを追加
2. メモを表示
3. 終了
選択してください (1-3): 2

=== 保存されたメモ ===
1. [2024-01-15 14:30] 会議の準備をする
```

`datetime.datetime.now()`で現在の日時を取得し、`strftime()`メソッドで「年-月-日 時:分」の形式に変換しています。

## メモ検索機能を追加する

最後に、キーワードでメモを検索する機能を追加しましょう。

以下の関数を追加し、メニューも修正してください。

```python
import datetime

def add_memo():
    """新しいメモを追加する"""
    memo = input("メモを入力してください: ")
    
    # 現在の日時を取得
    now = datetime.datetime.now()
    date_str = now.strftime("%Y-%m-%d %H:%M")
    
    # 日付付きでファイルに追記する
    with open('memos.txt', 'a', encoding='utf-8') as file:
        file.write(f"[{date_str}] {memo}\n")
    
    print("メモを保存しました")

def show_memos():
    """保存されたメモを表示する"""
    try:
        with open('memos.txt', 'r', encoding='utf-8') as file:
            memos = file.readlines()
        
        if memos:
            print("\n=== 保存されたメモ ===")
            for i, memo in enumerate(memos, 1):
                print(f"{i}. {memo.strip()}")
        else:
            print("メモがありません")
    
    except FileNotFoundError:
        print("まだメモがありません")

# ここから追加
def search_memos():
    """キーワードでメモを検索する"""
    keyword = input("検索キーワードを入力してください: ")
    
    try:
        with open('memos.txt', 'r', encoding='utf-8') as file:
            memos = file.readlines()
        
        found_memos = []
        for memo in memos:
            if keyword in memo:
                found_memos.append(memo.strip())
        
        if found_memos:
            print(f"\n=== '{keyword}' を含むメモ ===")
            for i, memo in enumerate(found_memos, 1):
                print(f"{i}. {memo}")
        else:
            print(f"'{keyword}' を含むメモが見つかりませんでした")
    
    except FileNotFoundError:
        print("まだメモがありません")

def show_menu():
    """メニューを表示する"""
    print("\n=== メニュー ===")
    print("1. メモを追加")
    print("2. メモを表示")
    print("3. メモを検索")  # 追加
    print("4. 終了")       # 番号を変更

# メインプログラム
print("=== メモ管理プログラム ===")

while True:
    show_menu()
    choice = input("選択してください (1-4): ")  # 範囲を変更
    
    if choice == '1':
        add_memo()
    elif choice == '2':
        show_memos()
    elif choice == '3':
        search_memos()  # 追加
    elif choice == '4':     # 番号を変更
        print("プログラムを終了します")
        break
    else:
        print("1から4の数字を入力してください")  # メッセージを変更
```

完成したプログラムを実行してみましょう。

```bash
python memo_manager.py
```

検索機能を使うと、以下のような操作ができます。

```
=== メニュー ===
1. メモを追加
2. メモを表示
3. メモを検索
4. 終了
選択してください (1-4): 3
検索キーワードを入力してください: 会議
=== '会議' を含むメモ ===
1. [2024-01-15 14:30] 会議の準備をする
```

`search_memos()`関数では、`if keyword in memo:`を使って、メモの内容に検索キーワードが含まれているかを確認しています。
見つかったメモは`found_memos`リストに保存し、最後にまとめて表示します。

## プログラムの完成版確認

作成したメモ管理プログラムには、以下の機能が含まれています。

- **メモ追加**: 日付付きでメモをファイルに保存
- **メモ表示**: 保存されたすべてのメモを番号付きで表示
- **メモ検索**: キーワードを含むメモを検索
- **エラー処理**: ファイルが存在しない場合の適切な処理

このプログラムを使って、実際にいくつかメモを追加し、表示や検索機能を試してみてください。
プログラムを終了しても、メモはファイルに保存されているため、次回起動時にも確認できます。

## まとめ

本章では、ファイル操作を活用したデータ管理プログラムを作成しました。
習得した内容は以下の通りです。

- 複数の関数を組み合わせて実用的なプログラムを作成する方法を学習しました
- ユーザーインターフェースとしてのメニュー機能の実装方法を理解しました
- `datetime`モジュールを使って日付情報を追加する方法を習得しました
- ファイル内容の検索機能を実装する方法を学習しました
- `try-except`文を使った適切なエラー処理の方法を理解しました

このプログラムは基本的なものですが、ファイル操作の重要な要素が含まれています。
このような仕組みを応用することで、より高度なデータ管理システムを作成することができるようになります。