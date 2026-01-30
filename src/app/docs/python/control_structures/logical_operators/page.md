---
title: 論理演算子で複雑な条件を作ろう
nextjs:
  metadata:
    title: 論理演算子で複雑な条件を作ろう
    description: Pythonの論理演算子（and、or、not）を使って複雑な条件を作成する方法を学びます。複数の条件を組み合わせたより柔軟な判定処理を習得します。
---

## 学習の目標

本章では、以下の内容を学習します。

- 論理演算子（and、or、not）の基本的な使い方を理解する
- 複数の条件を組み合わせた複雑な判定処理の作成方法を習得する
- 条件の組み合わせによる様々なパターンの作り方を学ぶ
- 論理演算子を使った実用的な条件分岐の設計方法を理解する

## 複数の条件を同時に満たす必要がある場面

これまでの条件分岐では、1つの条件だけを確認していました。
しかし、実際のプログラムでは「AかつB」「AまたはB」「Aではない」といった、より複雑な条件が必要になることがあります。

例えば、「年齢が18歳以上かつ身長が160cm以上」という条件や、「パスワードが正しいまたは管理者権限を持っている」という条件を考えてみましょう。
このような場面では、**論理演算子**を使って複数の条件を組み合わせることができます。

論理演算子を使うことで、より柔軟で現実的な判定処理を作成できるようになります。

## 論理演算子の種類

Pythonで使える論理演算子は以下の3つです。

| 演算子 | 意味 | 例 | 結果 |
|--------|------|----|----- |
| and | かつ（両方とも真） | True and True | True |
| or | または（どちらか一方が真） | True or False | True |
| not | ではない（真偽を反転） | not True | False |

これらの演算子を使って、複数の条件を組み合わせた複雑な条件式を作ることができます。

## and演算子で複数条件の組み合わせ

`and`演算子は、両方の条件が満たされた場合のみTrueになります。
VS Codeで`logical_and.py`という新しいファイルを作成し、以下のコードを入力してください。

```python
# 年齢と身長の条件
age = 20
height = 165

if age >= 18 and height >= 160:
    print("条件を満たしています")
else:
    print("条件を満たしていません")

# 条件の結果を個別に確認
print(f"年齢条件（{age} >= 18）: {age >= 18}")
print(f"身長条件（{height} >= 160）: {height >= 160}")
print(f"両方の条件: {age >= 18 and height >= 160}")
```

実行結果は以下のようになります。

```
条件を満たしています
年齢条件（20 >= 18）: True
身長条件（165 >= 160）: True
両方の条件: True
```

`and`演算子では、両方の条件がTrueの場合のみ全体がTrueになります。
どちらか一方でもFalseの場合は、全体がFalseになります。

年齢を15に変更して確認してみましょう。

```python
# 年齢と身長の条件
age = 15  # 値を変更
height = 165

if age >= 18 and height >= 160:
    print("条件を満たしています")
else:
    print("条件を満たしていません")

print(f"年齢条件（{age} >= 18）: {age >= 18}")
print(f"身長条件（{height} >= 160）: {height >= 160}")
print(f"両方の条件: {age >= 18 and height >= 160}")
```

実行結果は以下のようになります。

```
条件を満たしていません
年齢条件（15 >= 18）: False
身長条件（165 >= 160）: True
両方の条件: False
```

年齢条件がFalseになったため、全体の条件もFalseになりました。

## or演算子で選択的な条件

`or`演算子は、どちらか一方の条件が満たされればTrueになります。
VS Codeで`logical_or.py`という新しいファイルを作成し、以下のコードを入力してください。

```python
# 管理者権限またはパスワードが正しい場合
is_admin = False
password_correct = True

if is_admin or password_correct:
    print("アクセスが許可されました")
else:
    print("アクセスが拒否されました")

print(f"管理者権限: {is_admin}")
print(f"パスワード正解: {password_correct}")
print(f"アクセス条件: {is_admin or password_correct}")
```

実行結果は以下のようになります。

```
アクセスが許可されました
管理者権限: False
パスワード正解: True
アクセス条件: True
```

`or`演算子では、どちらか一方でもTrueであれば全体がTrueになります。
両方ともFalseの場合のみ、全体がFalseになります。

両方をFalseに変更して確認してみましょう。

```python
# 管理者権限またはパスワードが正しい場合
is_admin = False
password_correct = False  # 値を変更

if is_admin or password_correct:
    print("アクセスが許可されました")
else:
    print("アクセスが拒否されました")

print(f"管理者権限: {is_admin}")
print(f"パスワード正解: {password_correct}")
print(f"アクセス条件: {is_admin or password_correct}")
```

実行結果は以下のようになります。

```
アクセスが拒否されました
管理者権限: False
パスワード正解: False
アクセス条件: False
```

両方の条件がFalseの場合、全体の条件もFalseになりました。

## not演算子で条件の反転

`not`演算子は、条件の真偽を反転させます。
VS Codeで`logical_not.py`という新しいファイルを作成し、以下のコードを入力してください。

```python
# システムがメンテナンス中でない場合
is_maintenance = False

if not is_maintenance:
    print("システムは正常に稼働しています")
else:
    print("システムはメンテナンス中です")

print(f"メンテナンス中: {is_maintenance}")
print(f"メンテナンス中でない: {not is_maintenance}")
```

実行結果は以下のようになります。

```
システムは正常に稼働しています
メンテナンス中: False
メンテナンス中でない: True
```

`not`演算子は、TrueをFalseに、FalseをTrueに変換します。
「○○でない場合」という条件を簡潔に表現できます。

メンテナンス状態をTrueに変更して確認してみましょう。

```python
# システムがメンテナンス中でない場合
is_maintenance = True  # 値を変更

if not is_maintenance:
    print("システムは正常に稼働しています")
else:
    print("システムはメンテナンス中です")

print(f"メンテナンス中: {is_maintenance}")
print(f"メンテナンス中でない: {not is_maintenance}")
```

実行結果は以下のようになります。

```
システムはメンテナンス中です
メンテナンス中: True
メンテナンス中でない: False
```

## 複雑な条件の組み合わせ

論理演算子は組み合わせて使用することもできます。
VS Codeで`complex_condition.py`という新しいファイルを作成し、以下のコードを入力してください。

```python
# 複雑な条件の例
age = 25
has_license = True
is_student = False

# （年齢が18歳以上かつ免許を持っている）または学生である
if (age >= 18 and has_license) or is_student:
    print("レンタカーを借りることができます")
else:
    print("レンタカーを借りることができません")

# 条件を分解して確認
adult_with_license = age >= 18 and has_license
print(f"成人かつ免許保有: {adult_with_license}")
print(f"学生: {is_student}")
print(f"最終判定: {adult_with_license or is_student}")
```

実行結果は以下のようになります。

```
レンタカーを借りることができます
成人かつ免許保有: True
学生: False
最終判定: True
```

複雑な条件を作る際は、括弧を使って条件の優先順位を明確にすることが重要です。
この例では、まず`(age >= 18 and has_license)`が評価され、その結果と`is_student`が`or`で結合されます。

## 論理演算子の優先順位

論理演算子には優先順位があります。

1. `not`（最優先）
2. `and`
3. `or`（最低優先）

ただし、複雑な条件を作る際は、括弧を使って明示的に優先順位を指定することを強く推奨します。
これにより、コードが読みやすくなり、意図しない動作を防ぐことができます。

```python
# 括弧を使った明確な条件
age = 20
score = 75
is_member = True

# 括弧で優先順位を明示
if (age >= 18 and score >= 70) or is_member:
    print("特典を受けられます")

# 括弧なしでも同じ結果だが、読みにくい
if age >= 18 and score >= 70 or is_member:
    print("特典を受けられます")
```

## まとめ

本章では、Pythonの論理演算子について学習しました。
以下のポイントを理解できたことと思います。

`and`演算子を使うことで、複数の条件が同時に満たされる場合の処理を記述できるようになりました。
両方の条件がTrueの場合のみ、全体がTrueになります。

`or`演算子を使うことで、複数の条件のうちどれか一つでも満たされれば実行される処理を記述できます。
どちらか一方でもTrueであれば、全体がTrueになります。

`not`演算子を使うことで、条件の真偽を反転させることができます。
「○○でない場合」という条件を簡潔に表現できるようになりました。

論理演算子を組み合わせることで、現実的で複雑な判定処理を作成できます。
複雑な条件を作る際は、括弧を使って優先順位を明確にすることが重要です。