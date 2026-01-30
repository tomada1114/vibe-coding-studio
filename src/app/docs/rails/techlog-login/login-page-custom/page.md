---
title: ログインページをカスタマイズしよう
nextjs:
  metadata:
    title: ログインページをカスタマイズしよう
    description: Deviseで生成されたログインページをTailwind CSSでカスタマイズし、ログイン機能をテストする方法を学びます
---

- [学習の目標](#学習の目標)
- [はじめに](#はじめに)
- [変更前ビューファイルの確認](#変更前ビューファイルの確認)
- [ビューの修正](#ビューの修正)
- [画面確認](#画面確認)
- [テスト修正](#テスト修正)
- [テスト実行](#テスト実行)
- [変更をコミット](#変更をコミット)
- [spec/system/users\_spec.rbの全体像](#specsystemusers_specrbの全体像)
- [まとめ](#まとめ)


## 学習の目標

本章では、以下の内容を学習します。

- Deviseで生成されたログインページのカスタマイズ方法を習得する
- Tailwind CSSを使ったフォームデザインの改善技術を学ぶ
- システムテストを使ってログイン機能を検証する方法をマスターする
- 正常系・異常系の両方を考慮したテスト設計の考え方を理解する

## はじめに

本章ではログインページ `/users/sign_in` で使われるビューファイルを編集し、デザインを調整します。前章でユーザー登録ページをカスタマイズしたのと同様に、ログインページも見た目を整えていきましょう。

## 変更前ビューファイルの確認

まずは、Deviseのコマンドで作成したままのログイン用ビューファイルを確認しておきましょう。

(変更前): app/views/devise/sessions/new.html.erb

```erb
<h2>Log in</h2>

<%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
  <div class="field">
    <%= f.label :email %><br />
    <%= f.email_field :email, autofocus: true, autocomplete: "email" %>
  </div>

  <div class="field">
    <%= f.label :password %><br />
    <%= f.password_field :password, autocomplete: "current-password" %>
  </div>

  <% if devise_mapping.rememberable? %>
    <div class="field">
      <%= f.check_box :remember_me %>
      <%= f.label :remember_me %>
    </div>
  <% end %>

  <div class="actions">
    <%= f.submit "Log in" %>
  </div>
<% end %>

<%= render "devise/shared/links" %>
```

ユーザー登録ページと同様に、このビューは機能的には問題ありませんが、デザイン面ではシンプルすぎるので改善していきましょう。

## ビューの修正

では、ログインページのビューを次のように変更しましょう。

(変更後): app/views/devise/sessions/new.html.erb

```erb
<%= form_with scope: resource, as: resource_name, url: session_path(resource_name), class: "space-y-6 w-3/4 max-w-lg bg-white p-6 rounded-lg shadow", local: true do |f| %>
  <label class="block text-xl font-bold text-gray-700">ログイン</label>

  <div class="mt-1">
    <label class="text-gray-700 text-md">
      メールアドレス
    </label>
    <%= f.email_field :email, autofocus: true, autocomplete: "email", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "test@example.com" %>
  </div>

  <div class="mt-1">
    <label class="text-gray-700 text-md">
      パスワード
    </label>
    <%= f.password_field :password, autocomplete: "password", class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 px-2 block w-full sm:text-sm placeholder-gray-400 border border-gray-300 rounded-md", placeholder: "pass1234" %>
  </div>

  <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer">
    <%= f.submit "ログイン" %>
  </button>
<% end %>
```

変更点は主に以下の通りです。

1. **全体のデザイン改善**:
   - フォーム全体に白背景、角丸、影などのスタイルを適用
   - スペーシングの調整によるレイアウトの改善

2. **ラベルの日本語化**:
   - 「Log in」→「ログイン」
   - 「Email」→「メールアドレス」
   - 「Password」→「パスワード」

3. **入力フィールドのスタイル改善**:
   - プレースホルダーの追加
   - フォーカス時のスタイル変更
   - 統一感のあるデザイン

4. **「Remember me」オプションの削除**:
   - シンプルさを重視して、「ログイン状態を記憶する」機能は一旦省略

前章で学んだTailwind CSSのクラスを再利用しているため、ユーザー登録ページと統一感のあるデザインになっています。

![ログインページの変更後](/img/rails/techlog-complete-user-signin-page.png)

## 画面確認

変更が完了したら、実際の画面で確認してみましょう。ブラウザで `http://127.0.0.1:3000/users/sign_in` にアクセスします。

前回のレッスンでユーザー登録を試していた場合は、ログイン状態が残っていてトップページにリダイレクトされる可能性があります。その場合は、一度ログアウトしてから再度ログイン画面にアクセスしてください。

## テスト修正

ユーザー認証機能関連のシステムテストは前回作成した `spec/system/users_spec.rb` で扱っているので、ログイン機能のテスト機能についても同じファイルに追記します。

`describe 'ユーザー登録機能の検証'` ブロック（do ~ end）の下に以下のテストを追加しましょう。

```ruby
describe 'ログイン機能の検証' do
  # 事前にユーザー作成
  before do
    create(:user, nickname: nickname, email: email, password: password, password_confirmation: password) # 事前にユーザー作成
    visit '/users/sign_in'
    fill_in 'user_email', with: email
    fill_in 'user_password', with: 'password'
    click_button 'ログイン'
  end

  context '正常系' do
    it 'ログインに成功し、トップページにリダイレクトする' do
      expect(current_path).to eq('/')
    end
  end

  context '異常系' do
    let(:password) { 'NGpassword' }
    it 'ログインに失敗し、ページ遷移しない' do
      expect(current_path).to eq('/users/sign_in')
    end
  end
end
```

このテストでは、ユーザー登録機能のテストと同様に、「正常系」と「異常系」の2つのコンテキストに分けてテストを書いています。

- **正常系**：ログインに成功するケース
  - 正しいメールアドレスとパスワードでログインし、トップページにリダイレクトされることを確認

- **異常系**：ログインに失敗するケース
  - パスワードがFactoryで作成したユーザーのものと異なる場合、ログインページに留まることを確認

シンプルなテストですが、基本的な機能が正しく動作しているかを検証するには十分です。

## テスト実行

すべてのテストを実行し、すべて成功することを確認します。

```bash
$ bin/rspec

...

  ログイン機能の検証
    正常系
      ログインに成功し、トップページにリダイレクトする
    異常系
      ログインに失敗し、ページ遷移しない

Finished in 6.06 seconds (files took 0.42416 seconds to load)
10 examples, 0 failures
```

すべてのテストがパスしました。これで、ログイン機能が正しく動作していることが確認できました。

## 変更をコミット

ここまでの変更をコミットしましょう。

```bash
$ git add .
$ git commit -m "ログイン画面の UI を調整"
$ git push
```

## spec/system/users_spec.rbの全体像

参考として、ここまでの変更を含めた `spec/system/users_spec.rb` の全体像を示します。

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

  describe 'ログイン機能の検証' do
    # 事前にユーザー作成
    before do
      create(:user, nickname: nickname, email: email, password: password, password_confirmation: password) # 事前にユーザー作成
      visit '/users/sign_in'
      fill_in 'user_email', with: email
      fill_in 'user_password', with: 'password'
      click_button 'ログイン'
    end

    context '正常系' do
      it 'ログインに成功し、トップページにリダイレクトする' do
        expect(current_path).to eq('/')
      end
    end

    context '異常系' do
      let(:password) { 'NGpassword' }
      it 'ログインに失敗し、ページ遷移しない' do
        expect(current_path).to eq('/users/sign_in')
      end
    end
  end
end
```

## まとめ

本章では、以下のことを学びました。

- Deviseで生成されたログインページのカスタマイズ方法
- Tailwind CSSを使ったフォームのデザイン改善
- システムテストを使ったログイン機能の検証方法
- 正常系・異常系の両方を考慮したテスト設計

これらの知識と技術を使って、見た目も機能も優れたログインフォームを実装することができました。次の章では、フラッシュメッセージなど、ユーザー体験をさらに向上させる機能を追加していきます。
