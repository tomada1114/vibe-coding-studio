---
title: バリデーションのエラーメッセージをカスタマイズしよう
nextjs:
  metadata:
    title: バリデーションのエラーメッセージをカスタマイズしよう
    description: DeviseのバリデーションエラーメッセージをTailwind CSSでカスタマイズし、ユーザー体験を向上させる方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [現状の確認](#現状の確認)
- [デザイン調整](#デザイン調整)
- [変更後の確認](#変更後の確認)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- バリデーションエラーメッセージの表示方法を理解する
- Deviseの部分テンプレートをカスタマイズする方法を習得する
- Tailwind CSSを使ったエラーメッセージのスタイリング技術を学ぶ
- 視覚的に目立つエラー表示でユーザー体験を向上させる方法をマスターする

## はじめに

今回は小さな変更ですが、バリデーションによるエラーメッセージの見た目を整えていきましょう。エラーメッセージは機能的に重要なだけでなく、見やすく分かりやすいデザインにすることで、ユーザーにとって使いやすいアプリケーションになります。

## 現状の確認

開発用サーバを `bin/dev` で起動してから、何も入力せずにユーザー登録してみましょう。バリデーションによるエラーメッセージが表示されます。

![変更前のエラーメッセージ](/img/rails/error-messages-before-i18n.png)

これでもエラーメッセージとしては機能しますが、もう少し目立ち、読みやすい形に変更します。

## デザイン調整

Deviseでバリデーションのエラーメッセージを表示する部分テンプレートは `app/views/devise/shared/_error_messages.html.erb` です。まずは現状を確認してみましょう。

(変更前): app/views/devise/shared/_error_messages.html.erb

```erb
<% if resource.errors.any? %>
  <div id="error_explanation">
    <h2>
      <%= I18n.t("errors.messages.not_saved",
                 count: resource.errors.count,
                 resource: resource.class.model_name.human.downcase)
       %>
    </h2>
    <ul>
      <% resource.errors.full_messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
    </ul>
  </div>
<% end %>
```

Deviseコマンドで自動生成されたものですが、特にスタイルは適用されていませんね。このテンプレートをTailwind CSSで装飾し、以下のように変更します。

(変更後): app/views/devise/shared/_error_messages.html.erb

```erb
<% if resource.errors.any? %>
  <div id="error_explanation">
    <h2 class="text-lg text-gray-700 mb-3">
      <%= I18n.t("errors.messages.not_saved",
                 count: resource.errors.count,
                 resource: resource.class.model_name.human.downcase)
       %>
    </h2>
    <ul>
      <% resource.errors.full_messages.each do |message| %>
        <li class="leading-5 text-red-500 mb-2"><%= message %></li>
      <% end %>
    </ul>
  </div>
<% end %>
```

変更点は主に以下の通りです。

1. **見出し（h2）のスタイル追加**：
   - `text-lg`: テキストサイズを大きくして目立たせる
   - `text-gray-700`: 暗めのグレーで見やすく
   - `mb-3`: 下側の余白を追加して見やすく

2. **エラーメッセージ（li）のスタイル追加**：
   - `leading-5`: 行間のスペースを調整
   - `text-red-500`: エラーメッセージを赤色にして視覚的に警告を表現
   - `mb-2`: リスト項目間のスペースを確保

## 変更後の確認

では、再度エラーメッセージを表示させてみましょう。分かりやすいところでいえば、エラーメッセージが赤くなっていることが分かるかと思います。

![変更後のエラーメッセージ](/img/rails/error-messages-after-i18n.png)

エラーメッセージが赤色になり、行間も適切に調整されたことで視認性が向上しました。これによって、ユーザーはどのような問題が発生しているのかを素早く理解できるようになります。

## 変更をコミット

今回の変更をコミットしておきましょう。

```bash
$ git add .
$ git commit -m "バリデーションエラーメッセージのデザイン調整"
$ git push
```

## まとめ

本章では、Deviseのバリデーションエラーメッセージをカスタマイズし、視覚的に分かりやすい形に改善しました。Tailwind CSSを使ったシンプルなスタイリングでも、テキストの色を変えたり、余白を調整したりするだけで、ユーザー体験を大きく向上させることができます。

エラーメッセージは、ユーザーがアプリケーションを使う上で非常に重要な要素です。適切にデザインされたエラーメッセージは、ユーザーが問題を理解し、正しく対処するための手助けになります。

次の章では、これらのエラーメッセージを日本語化し、さらにユーザーフレンドリーなアプリケーションを目指していきます。
