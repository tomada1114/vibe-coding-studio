---
title: トップページをデザインしよう
nextjs:
  metadata:
    title: トップページをデザインしよう
    description: TechLog アプリケーションのトップページを魅力的なデザインで仕上げます
---

- [学習の目標](#学習の目標)
- [トップページのデザイン変更](#トップページのデザイン変更)
- [トップページの設計](#トップページの設計)
- [View の実装](#view-の実装)
- [実装内容の説明](#実装内容の説明)
  - [ヒーローセクション](#ヒーローセクション)
  - [機能紹介セクション](#機能紹介セクション)
  - [CTAセクション](#ctaセクション)
- [System Spec の修正](#system-spec-の修正)
- [動作確認](#動作確認)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- **魅力的なランディングページ**の作成方法を理解する
- Tailwind CSS を活用した**モダンな UI デザイン**の実装方法を習得する
- ユーザーの状態に応じた**条件分岐表示**の実装方法を学ぶ
- **レスポンシブデザイン**の考え方を理解する

## トップページのデザイン変更

最後に、TechLog アプリケーションのトップページを充実させて、アプリケーションの完成度を高めましょう。トップページは、**訪問者にアプリケーションの目的や機能を簡潔に伝える重要な役割**を果たします。

また、ポートフォリオとしての全体的な印象を決めるので、Tailwind CSS を駆使して整ったデザインにしていきましょう。

## トップページの設計

トップページでは以下の要素を含めることで、ユーザーに TechLog の価値をアピールしてみます。

1. **アプリの目的や価値の説明** - ユーザーがアプリの意義を理解できるようにする
2. **主要機能へのアクセスを促すリンク** - ユーザーの行動を促す要素を配置する
3. **視覚的に魅力的なデザイン** - 専門性と信頼性を伝えるモダンな外観

現在は簡素な状態のトップページを、ランディングページとして充実させていきましょう。

## View の実装

既存の app/views/home/top.html.erb を以下のように編集します。基本的には Tailwind CSS や、リンクを生成するためのヘルパーメソッドを使って、デザインを整えているだけです。

CSS などは本講座のメインではありませんので、丸々コピーしていただいて OK です。

```ruby
<div class="w-full max-w-6xl mx-auto">
  <!-- ヒーローセクション -->
  <div class="py-12 md:py-20 px-4">
    <div class="text-center mb-8">
      <span class="inline-block bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm mb-4">
        プログラミング学習の記録を始めましょう。
      </span>
      <h1 class="text-6xl font-bold tracking-tight text-gray-900 mb-6">TechLog</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        TechLogは、あなたのプログラミング学習の旅を記録するためのシンプルなアプリケーションです。
        日々の学習内容を記録し、振り返ることで、着実な成長を実感しましょう。
      </p>
    </div>
    <div class="flex flex-wrap justify-center gap-4 mt-10">
      <% if user_signed_in? %>
        <%= link_to "学習ログを記録する", new_post_path, class: "inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors" %>
      <% else %>
        <%= link_to "ユーザー登録", new_user_registration_path, class: "inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors" %>
      <% end %>
      <%= link_to "学習ログを見る", posts_path, class: "inline-block bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors" %>
    </div>
  </div>

  <!-- 機能紹介セクション -->
  <div class="py-16 px-4 bg-white rounded-xl shadow-sm">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900">TechLogでできること</h2>
      <p class="mt-4 text-lg text-gray-600">
        プログラミング学習をより効果的にするための機能をご紹介します
      </p>
    </div>
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div class="bg-blue-50 p-6 rounded-lg">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-600 p-2 rounded-lg mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold">学習内容を記録</h3>
        </div>
        <p class="text-gray-600">
          日々の学習内容を簡単に記録。何を学んだのか、どんな課題に取り組んだのかを忘れることなく保存できます。
        </p>
      </div>
      <div class="bg-blue-50 p-6 rounded-lg">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-600 p-2 rounded-lg mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold">振り返りと成長</h3>
        </div>
        <p class="text-gray-600">
          過去の学習記録を振り返ることで、自分の成長を実感できます。学習の軌跡を追うことで、モチベーション維持にも繋がります。
        </p>
      </div>
      <div class="bg-blue-50 p-6 rounded-lg">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-600 p-2 rounded-lg mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold">シンプルで使いやすい</h3>
        </div>
        <p class="text-gray-600">
          複雑な操作は不要。タイトルと内容を入力するだけで、すぐに学習ログを記録できます。
        </p>
      </div>
      <div class="bg-blue-50 p-6 rounded-lg">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-600 p-2 rounded-lg mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold">いつでもどこでも</h3>
        </div>
        <p class="text-gray-600">
          スマートフォンやタブレットからもアクセス可能。いつでもどこでも学習記録を確認・追加できます。
        </p>
      </div>
    </div>
  </div>

  <!-- CTAセクション -->
  <div class="bg-indigo-600 text-white rounded-xl my-16 p-8 text-center">
    <h2 class="text-3xl font-bold mb-4">今日から学習を記録</h2>
    <p class="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
      プログラミング学習の記録を始めて、着実に成長していきましょう。
      今日学んだことが、明日の自分の力になります。
    </p>
    <div>
      <% if user_signed_in? %>
        <%= link_to "学習ログを記録する", new_post_path, class: "inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors" %>
      <% else %>
        <%= link_to "ユーザー登録", new_user_registration_path, class: "inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors" %>
      <% end %>
    </div>
  </div>
</div>
```

## 実装内容の説明

### ヒーローセクション

ヒーローセクション（最上部）では、**TechLogのブランド名を大きく表示**し、その下にアプリケーションの核となる価値を簡潔に説明しています。

また、**ユーザーがログインしているかどうかで表示するボタンを切り替える**インタラクティブな要素も取り入れました。ログイン済みユーザーには「学習ログを記録する」ボタンを、未ログインユーザーには「ユーザー登録」ボタンを表示します。

どちらの状態でも「学習ログを見る」リンクは表示されるため、ユーザー登録の有無に関わらず学習記録を閲覧できることも伝わります。

### 機能紹介セクション

機能紹介セクションでは、TechLogの主要機能を**4つのカードで表現**しました。各カードには関連するアイコンと簡潔な説明文を配置することで、「学習内容を記録」「振り返りと成長」「シンプルで使いやすい」「いつでもどこでも」というTechLogの価値提案が一目で理解できるようになっています。

モバイル画面では1列に、タブレット以上の大きさでは2列に自動的に調整される**レスポンシブグリッド**を採用しました。

### CTAセクション

CTA（Call To Action：ユーザーに行動を促す）セクションでは、**インディゴ色の背景を使って視覚的なアクセント**を加え、「今日から学習を記録」というメッセージを強調しています。

この部分は行動を促すため、再度ユーザーの状態に応じたボタンを配置し、アプリケーション利用への最後の一押しとなるよう設計しました。

実際にトップページにアクセスすると、以下のようにモダンな UI で TechLog アプリの魅力を伝えながら、ユーザーに行動を促すデザインになっています。

![TechLog トップページのスクリーンショット](/img/rails/techlog-homepage.png)

## System Spec の修正

見た目を整えただけなのですが、一部のテストで修正が必要です。既存の `spec/system/home_spec.rb` では、トップページにアクセスして `Home#top` という、デフォルトの文字が表示されることを確認しています。

spec/system/home_spec.rb（修正前）

```ruby
  # ...略
  describe 'トップページの検証' do
    it 'Home#topという文字列が表示される' do
      visit '/'
      expect(page).to have_content('Home#top')
    end
  end
  # ...略
end
```

このテストを以下のように修正して、新しいトップページの要素が正しく表示されることを確認します。

spec/system/home_spec.rb（修正後）

```ruby
  # ...略
  describe 'トップページの検証' do
    it 'TechLogのブランド名が表示される' do
      visit '/'
      expect(page).to have_content('TechLog')
    end
  end
  # ...略
end
```

ここでは、トップページにアクセスして `TechLog` という文字列が表示されることを確認しています。このテストを実行して、トップページの表示が正しく修正されていることを確認しましょう。

```bash
$ bin/rspec

...

Finished in 1.36 seconds (files took 1.49 seconds to load)
63 examples, 0 failures
```

## 動作確認

トップページの実装が完了したら、実際にブラウザで表示を確認してみましょう。**ログイン状態と未ログイン状態の両方で表示を確認**し、ボタンやリンクが正しく機能することを確認します。

## 変更をコミット

トップページの実装が完了したら、変更をコミットしましょう。

```bash
$ git add .
$ git commit -m "トップページを改善"
$ git push
```

## まとめ

これで TechLog アプリケーションの基本機能の実装は完了です！以下の重要な機能を持つ実用的なWebアプリケーションが完成しました：

- **ユーザー認証機能** - 登録、ログイン、ログアウト
- **学習ログの管理** - 投稿、閲覧、削除
- **ユーザーページ** - 特定ユーザーの投稿一覧表示
- **魅力的なランディングページ** - アプリケーションの価値を伝えるトップページ

Rails の基礎的な機能を活用したシンプルなアプリケーションですが、**実際のWeb開発の流れを体験**することができたと思います。このプロジェクトで得た知識と経験を活かして、さらに高度なアプリケーション開発にも挑戦してみてください！
