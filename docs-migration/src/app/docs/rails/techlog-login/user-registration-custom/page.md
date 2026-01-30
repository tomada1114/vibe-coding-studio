---
title: ユーザー登録ページをカスタマイズしよう
nextjs:
  metadata:
    title: ユーザー登録ページをカスタマイズしよう
    description: Deviseで生成されたユーザー登録ページをTailwind CSSでカスタマイズし、ニックネーム機能を追加する方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [変更前ビューファイルの確認](#変更前ビューファイルの確認)
- [ビューの修正](#ビューの修正)
- [画面確認](#画面確認)
- [動作確認](#動作確認)
- [テスト作成](#テスト作成)
  - [システムテストファイル作成](#システムテストファイル作成)
  - [テスト修正](#テスト修正)
  - [テスト実行](#テスト実行)
- [変更をコミット](#変更をコミット)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Deviseで生成されたユーザー登録ページのカスタマイズ方法を習得する
- Tailwind CSSを使ったフォームデザインの改善技術を学ぶ
- ニックネームフィールドの追加とその動作確認方法を理解する
- システムテストを使って登録機能を検証する方法をマスターする

## はじめに

本章ではユーザー登録ページ `/users/sign_up` で使われるビューファイルを編集し、デザインを調整します。また、前回追加したnicknameカラムをフォームに組み込み、実際に入力できるようにします。

## 変更前ビューファイルの確認

まずは、Deviseのコマンドで作成したままのユーザー登録用ビューファイルを確認しておきましょう。

(変更前): app/views/devise/registrations/new.html.erb

```erb
<h2>Sign up</h2>

<%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  <%= render "devise/shared/error_messages", resource: resource %>

  <div class="field">
    <%= f.label :email %><br />
    <%= f.email_field :email, autofocus: true, autocomplete: "email" %>
  </div>

  <div class="field">
    <%= f.label :password %>
    <% if @minimum_password_length %>
    <em>(<%= @minimum_password_length %> characters minimum)</em>
    <% end %><br />
    <%= f.password_field :password, autocomplete: "new-password" %>
  </div>

  <div class="field">
    <%= f.label :password_confirmation %><br />
    <%= f.password_field :password_confirmation, autocomplete: "new-password" %>
  </div>

  <div class="actions">
    <%= f.submit "Sign up" %>
  </div>
<% end %>

<%= render "devise/shared/links" %>
```

このビューは機能的には問題ありませんが、デザイン面では非常にシンプルで、ポートフォリオとして提出するには物足りません。また、前回追加したnicknameフィールドもまだ含まれていません。これをカスタマイズして、見た目を整え、必要な機能を追加していきましょう。

## ビューの修正

では、ユーザー登録のビューを次のように変更しましょう。Tailwind CSSのスタイルクラスを使ってデザインを調整し、前回追加したnicknameカラムの入力フィールドも追加します。

(変更後): app/views/devise/registrations/new.html.erb

```erb
<%= form_with scope: resource, as: resource_name, url: registration_path(resource_name), class: "space-y-6 w-3/4 max-w-lg bg-white p-6 rounded-lg shadow" ,local: true do |f| %>
  <%= render "devise/shared/error_messages", resource: resource %>

  <label class="block text-xl font-bold text-gray-700">ユーザー登録</label>

  <div class="mt-1">
    <label class="text-gray-700 text-md">
      メールアドレス
    </label>
    <%= f.email_field :email, autofocus: true, autocomplete: "email", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "test@exeample.com" %>
  </div>

  <div class="mt-1">
    <label class="text-gray-700 text-md">
      ニックネーム
    </label>
    <%= f.text_field :nickname, autocomplete: "nickname", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "エンジニアの卵" %>
  </div>

  <div class="mt-1">
    <label class="text-gray-700 text-md">
      パスワード (6文字以上)
    </label>
    <%= f.password_field :password, autocomplete: "new-password", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "pass1234" %>
  </div>

  <div class="mt-1">
    <label class="text-gray-700 text-md">
      確認用パスワード
    </label>
    <%= f.password_field :password_confirmation, autocomplete: "new-password", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "pass1234" %>
  </div>

  <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer">
    <%= f.submit "ユーザー登録" %>
  </button>
<% end %>
```

変更点は主に以下の通りです。

1. **全体のデザイン改善**:
   - フォーム全体に白背景、角丸、影などのスタイルを適用
   - スペーシングの調整によるレイアウトの改善

2. **ニックネームフィールドの追加**:
   - ニックネーム入力用のテキストフィールドを追加

3. **ラベルの日本語化**:
   - 「Sign up」→「ユーザー登録」
   - 「Email」→「メールアドレス」
   - 「Password」→「パスワード (6文字以上)」
   - 「Password confirmation」→「確認用パスワード」

4. **入力フィールドのスタイル改善**:
   - プレースホルダーの追加
   - フォーカス時のスタイル変更
   - 統一感のあるデザイン

Tailwind CSSを使用した主なクラスの意味を簡単に説明しておきましょう。

- `space-y-6`: 子要素間のスペースを1.5rem（24px）に設定
- `w-3/4`: 幅を親要素の75%に設定
- `max-w-lg`: 最大幅を32remに設定
- `bg-white`: 背景色を白に設定
- `p-6`: すべての方向のパディングを1.5rem（24px）に設定
- `rounded-lg`: 角を丸くする（大きめのサイズ）
- `shadow`: 影を追加
- `text-xl`: テキストサイズを1.25remに設定
- `font-bold`: フォントを太字に設定
- `text-gray-700`: テキストカラーをグレー（700の濃さ）に設定
- `mt-1`: 上マージンを0.25rem（4px）に設定
- `py-1`: 上下のパディングを0.25rem（4px）に設定
- `px-2`: 左右のパディングを0.5rem（8px）に設定
- `focus:ring-indigo-500`: フォーカス時のリング（アウトライン）の色をインディゴ（500の濃さ）に設定

## 画面確認

変更が完了したら、実際の画面で確認してみましょう。Railsサーバーを起動していなければ、`bin/dev`コマンドで開発用サーバーを起動します。

```bash
$ bin/dev
```

サーバーが起動したら、ナビゲーションバーからユーザー登録ページにアクセスします。

![ユーザー登録ページ](/img/rails/techlog-complete-user-registration-page.png)

上記のような画面が表示されていれば成功です。フォームが美しくデザインされ、ニックネームフィールドも追加されていることが確認できます。

## 動作確認

本来、テスト駆動開発では先にテストを書くところですが、今回はDeviseを使用しており、大幅な変更を加えるわけではないため、まずは実際に画面から動作を確認してみましょう。

以前にnicknameには20文字までというバリデーションを設定したので、それが正しく機能するか確認できます。また、Deviseにはデフォルトで設定されている他のバリデーション（メールアドレスが空欄の場合、パスワードが6文字未満の場合など）も確認できます。

実際にフォームを操作して、以下のケースをチェックしてみましょう。

1. 正常なデータで登録できること
2. ニックネームが空欄の場合はエラーになること
3. ニックネームが20文字を超える場合はエラーになること
4. メールアドレスが空欄の場合はエラーになること
5. パスワードが空欄の場合はエラーになること
6. パスワードが6文字未満の場合はエラーになること
7. パスワードと確認用パスワードが一致しない場合はエラーになること

これらの動作を確認したら、次に同様のチェックをシステムテストとして実装しましょう。

## テスト作成

Deviseのデフォルトではニックネームの入力フォームがないため、新たに追加したニックネームフォームが正常に動作するかどうかをテストします。モデルテストではバリデーションの動作は確認済みですが、今回はフォームからの入力というユーザー操作の視点でテストを行います。

### システムテストファイル作成

トップページのときと同様、システムテストファイルをRailsコマンドで生成します。

```bash
$ bin/rails g rspec:system user
      create  spec/system/users_spec.rb
```

### テスト修正

作成されたテストファイル `spec/system/users_spec.rb` を修正していきましょう。

```ruby
require 'rails_helper'

describe 'User', type: :system do
  before { driven_by :rack_test }

  # ユーザー情報入力用の変数
  let(:email) { 'test@example.com' }
  let(:nickname) { 'テスト太郎' }
  let(:password) { 'password' }
  let(:password_confirmation) { password }

  describe 'ユーザー登録機能の検証' do
    before { visit '/users/sign_up' }

    # ユーザー登録を行う一連の操作を subject にまとめる
    subject do
      fill_in 'user_nickname', with: nickname
      fill_in 'user_email', with: email
      fill_in 'user_password', with: password
      fill_in 'user_password_confirmation', with: password_confirmation
      click_button 'ユーザー登録'
    end

    context '正常系' do
      it 'ユーザーを作成できる' do
        expect { subject }.to change(User, :count).by(1) # Userが1つ増える
        expect(current_path).to eq('/') # ユーザー登録後はトップページにリダイレクト
      end
    end

    context '異常系' do
      context 'nicknameが空の場合' do
        let(:nickname) { '' }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count) # Userが増えない
          expect(page).to have_content("Nickname can't be blank") # エラーメッセージのチェック
        end
      end

      context 'nicknameが20文字を超える場合' do
        let(:nickname) { 'あ' * 21 }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('Nickname is too long (maximum is 20 character')
        end
      end

      context 'emailが空の場合' do
        let(:email) { '' }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content("Email can't be blank")
        end
      end

      context 'passwordが空の場合' do
        let(:password) { '' }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content("Password can't be blank")
        end
      end

      context 'passwordが6文字未満の場合' do
        let(:password) { 'a' * 5 }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('Password is too short (minimum is 6 characters')
        end
      end

      context 'passwordが128文字を超える場合' do
        let(:password) { 'a' * 129 }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('Password is too long (maximum is 128 characters)')
        end
      end

      context 'passwordとpassword_confirmationが一致しない場合' do
        let(:password_confirmation) { "#{password}hoge" } # passwordに"hoge"を足した文字列にする
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content("Password confirmation doesn't match Password")
        end
      end
    end
  end
end
```

このテストでは、「正常系」と「異常系」という2つの大きなコンテキスト（シチュエーション）に分けています。

- **正常系**：ユーザー登録に成功するパターン
- **異常系**：バリデーションに引っかかり、ユーザー登録に失敗するパターン

このように分けることでテストの見通しがよくなり、実務でもよく使われる考え方ですので覚えておきましょう。

また、バリデーションによるエラーメッセージは現在は英語ですが、TechLogは日本向けのアプリですので、後に日本語に修正する予定です。その際、このテストも修正することになります。

### テスト実行

すべてのテストを実行し、すべて成功することを確認します。

```bash
$ bin/rspec

Finished in 5.06 seconds (files took 0.33117 seconds to load)
14 examples, 0 failures
```

すべてのテストがパスしました。これで、ユーザー登録機能が正しく動作していることが確認できました。

## 変更をコミット

ここまでの変更をコミットしましょう。

```bash
$ git add .
$ git commit -m "ユーザー登録機能のカスタマイズ"
$ git push
```

## まとめ

本章では、以下のことを学びました。

- Deviseで生成されたビューファイルをカスタマイズする方法
- Tailwind CSSを使ったフォームのデザイン改善
- nicknameフィールドの追加と動作確認
- システムテストを使った登録機能の検証

これらの知識と技術を使って、見た目も機能も優れたユーザー登録フォームを実装することができました。次の章では、ログインページも同様にカスタマイズしていきます。
