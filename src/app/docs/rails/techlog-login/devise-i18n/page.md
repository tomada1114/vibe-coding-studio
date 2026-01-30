---
title: Deviseを日本語に対応させよう
nextjs:
  metadata:
    title: Deviseを日本語に対応させよう
    description: Rails アプリケーションの国際化（i18n）設定とDeviseのエラーメッセージやフラッシュメッセージの日本語化を学びます
---

# Deviseを日本語に対応させよう

## 学習の目標

本章では、以下の内容を学習します。

- Railsアプリケーションの国際化（i18n）の基本概念を理解する
- Deviseのエラーメッセージを日本語化する方法を習得する
- YAMLファイルを使った翻訳データの定義方法を学ぶ
- 日本語化されたメッセージをテストで検証する技術をマスターする

## はじめに

現時点では、Deviseに関するエラーメッセージはデフォルトの英語のままとなっています。例えば、空欄を許可しないカラムについては "can't be blank" と表示されます（前回、User.nicknameのテストを書いた時には、上記メッセージが表示されることを利用していました）。

しかしTechLogは日本語のWebアプリですので、日本語でメッセージが表示されるようにしましょう。Devise関連で表示されるエラーメッセージを日本語化することで、ユーザーがより使いやすいアプリケーションにしていきます。

## 日本語化したときのメッセージを整理

Deviseで表示されるエラーメッセージには以下のようなものがあります。

**現在の英語メッセージ**:
- **何かが空欄の場合**: "can't be blank"
- **既に登録されている場合**: "has already been taken"
- **メールアドレスの形式が正しくない場合**: "is invalid"
- **パスワードが短すぎる場合**: "is too short (minimum is 6 characters)"
- **パスワードが長すぎる場合**: "is too long (maximum is 128 characters)"
- **パスワードが一致しない場合**: "doesn't match Password"

これらを、以下のように日本語に翻訳していきます。

**日本語化後のメッセージ**:
- **何かが空欄の場合**: "が入力されていません。"
- **既に登録されている場合**: "は既に使用されています。"
- **メールアドレスの形式が正しくない場合**: "は有効でありません。"
- **パスワードが短すぎる場合**: "は6文字以上に設定して下さい。"
- **パスワードが長すぎる場合**: "は128文字以下に設定して下さい。"
- **パスワードが一致しない場合**: "が一致していません。"

また、エラーメッセージの先頭には、問題があることを示す「ニックネーム」や「メールアドレス」などの属性名を付け加えます。いままでは、たとえば "Password" のように属性名がそのまま表示されていましたが、これを「パスワード」と日本語化します。

## テスト修正

今回もテスト駆動開発の流れに則り、先にあるべき姿（仕様）をテストで定義しましょう。日本語化対応を行った結果、各種エラーメッセージは日本語が表示されることを期待したテストに修正します。

Devise関連のエラーメッセージのチェックはモデルのSpec・System Specの両方で行なっていたため、それぞれ修正しましょう。

まずはモデルのSpecから修正します。

spec/models/user_spec.rb

```ruby
require 'rails_helper'

describe User do
  let(:nickname) { 'テスト太郎' }
  let(:email) { 'test@example.com' }
  let(:user) { User.new(nickname: nickname, email: email, password: password, password_confirmation: password) } # 変数に格納

  describe '.first' do
    before do
      create(:user, nickname: nickname, email: email)
    end

    subject { described_class.first }

    it '事前に作成した通りのUserを返す' do
      expect(subject.nickname).to eq('テスト太郎')
      expect(subject.email).to eq('test@example.com')
    end
  end

  describe 'validation' do
    let(:password) { '12345678' }

    describe 'nickname属性' do
      describe '文字数制限の検証' do
        context 'nicknameが20文字以下の場合' do
          let(:nickname) { 'あいうえおかきくけこさしすせそたちつてと' } # 20文字

          it 'User オブジェクトは有効である' do
            expect(user.valid?).to be(true)
          end
        end

        context 'nicknameが20文字を超える場合' do
          let(:nickname) { 'あいうえおかきくけこさしすせそたちつてとな' } # 21文字

          it 'User オブジェクトは無効である' do
            user.valid?
            expect(user.valid?).to be(false)
            expect(user.errors[:nickname]).to include('は20文字以下に設定して下さい。')
          end
        end
      end

      describe '存在性の検証' do
        context 'nicknameが空欄の場合' do
          let(:nickname) { '' }

          it 'User オブジェクトは無効である' do
            expect(user.valid?).to be(false)
            expect(user.errors[:nickname]).to include("が入力されていません。")
          end
        end
      end
    end
  end
end
```

合わせて、System Specも修正します。修正対象が多いので、コピペして修正するのが良いでしょう。

spec/system/users_spec.rb

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
        expect(page).to have_content('ユーザー登録に成功しました。')
        expect(current_path).to eq('/') # ユーザー登録後はトップページにリダイレクト
      end
    end

    context '異常系' do
      context 'エラー理由が1件の場合' do
        let(:nickname) { '' }
        it 'ユーザー作成に失敗した旨のエラーメッセージを表示する' do
          subject
          expect(page).to have_content('エラーが発生したためユーザーは保存されませんでした。')
        end
      end

      context 'エラー理由が2件以上の場合' do
        let(:nickname) { '' }
        let(:email) { '' }
        it '問題件数とともに、ユーザー作成に失敗した旨のエラーメッセージを表示する' do
          subject
          expect(page).to have_content('エラーが発生したためユーザーは保存されませんでした。')
        end
      end

      context 'nicknameが空の場合' do
        let(:nickname) { '' }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count) # Userが増えない
          expect(page).to have_content('ニックネーム が入力されていません。') # エラーメッセージのチェック
        end
      end

      context 'nicknameが20文字を超える場合' do
        let(:nickname) { 'あ' * 21 }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('ニックネーム は20文字以下に設定して下さい。')
        end
      end

      context 'emailが空の場合' do
        let(:email) { '' }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('メールアドレス が入力されていません。')
        end
      end

      context 'passwordが空の場合' do
        let(:password) { '' }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('パスワード が入力されていません。')
        end
      end

      context 'passwordが6文字未満の場合' do
        let(:password) { 'a' * 5 }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('パスワード は6文字以上に設定して下さい。')
        end
      end

      context 'passwordが128文字を超える場合' do
        let(:password) { 'a' * 129 }
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('パスワード は128文字以下に設定して下さい。')
        end
      end

      context 'passwordとpassword_confirmationが一致しない場合' do
        let(:password_confirmation) { "#{password}hoge" } # passwordに"hoge"を足した文字列にする
        it 'ユーザーを作成せず、エラーメッセージを表示する' do
          expect { subject }.not_to change(User, :count)
          expect(page).to have_content('確認用パスワード が一致していません。')
        end
      end
    end
  end

  describe 'ログイン機能の検証' do
    before do
      create(:user, nickname: nickname, email: email, password: password, password_confirmation: password) # ユーザー作成
      visit '/users/sign_in'
      fill_in 'user_email', with: email
      fill_in 'user_password', with: 'password'
      click_button 'ログイン'
    end

    context '正常系' do
      it 'ログインに成功し、トップページにリダイレクトする' do
        expect(current_path).to eq('/')
      end

      it 'ログイン成功時のフラッシュメッセージを表示する' do
        expect(page).to have_content('ログインしました。')
      end
    end

    context '異常系' do
      let(:password) { 'NGpassword' }
      it 'ログインに失敗し、ページ遷移しない' do
        expect(current_path).to eq('/users/sign_in')
      end

      it 'ログイン失敗時のフラッシュメッセージを表示する' do
        expect(page).to have_content('メールアドレスまたはパスワードが違います。')
      end
    end
  end

  describe 'ログアウト機能の検証' do
    before do
      user = create(:user, nickname: nickname, email: email, password: password, password_confirmation: password) # ユーザー作成
      sign_in user # 作成したユーザーでログイン
      visit '/'
      click_button 'ログアウト'
    end

    it 'トップページにリダイレクトする' do
      expect(current_path).to eq('/')
    end

    it 'ログアウト時のフラッシュメッセージを表示する' do
      expect(page).to have_content('ログアウトしました。')
    end
  end
end
```

なお、ついでに、ログアウト機能のテストでログアウト時のフラッシュメッセージが表示されることを確認するテストも追加しました。

流れとしては「**ユーザーを作成する**」「**ログインする**」「**ログアウトする**」という一連の操作を行い、それぞれの成功・失敗時にフラッシュメッセージが表示されることを確認するテストです。

では、ここまでの変更を確認するためにテストを実行してみましょう。現時点ではもちろんテストが失敗することを確認してください。失敗するテストが多いため、少し時間がかかるかもしれません。

```bash
$ bin/rspec spec/system/users_spec.rb

...

Finished in 32.33 seconds (files took 0.45752 seconds to load)
16 examples, 13 failures
```

次は、これらのテストを通すために各種設定をしていきましょう。

## アプリ全体の日本語化設定

Railsの言語は `config/application.rb` で設定します。デフォルトでは英語ですが、次のように1行を追加することで日本語として設定されます。

```ruby
...
module TechLog
  class Application < Rails::Application
    ...
    config.i18n.default_locale = :ja # 追記
  end
end
```

なお、これまで `app` 内のファイル変更はすぐに反映されましたが、`config` 内のファイルを変更した場合は、基本的にはサーバを再起動する必要があることを覚えておきましょう。これは、`config` 内のファイルはRailsの起動時に読み込まれるものがほとんどだからです。

ただし、よく触るファイルで言うと `config/routes.rb` は例外なので、その場合はサーバを再起動しなくても変更が反映されます。

では一度 `Ctrl + C` でサーバを停止し、再度 `bin/dev` でサーバを起動します。

```bash
$ bin/dev
```

これによりDeviseも日本語のエラーメッセージを表示しようとするのですが、Deviseのgem自体には日本語のエラーメッセージが含まれていません。いわば、元々のエラーメッセージが英語であるため、日本語に翻訳するためのファイルを用意する必要があります。

## 翻訳ファイルを用意

次に、英語と日本語の対訳を `.yml` 形式のファイルで置いてあげます。

`.yml` というのは、YAML (YAML Ain't Markup Language) というデータ形式のファイルです。YAMLはJSONと同じようにデータを表現するためのフォーマットですが、JSONよりも人間にとって読みやすい形式となっています。

`config/locales`というディレクトリの直下に`devise.ja.yml`というファイルを作成し、中身を次のように編集します。

config/locales/devise.ja.yml ※新規作成

```yaml
ja:
  activerecord:
    errors:
      models:
        user:
          attributes:
            email:
              taken: "は既に使用されています。"
              blank: "が入力されていません。"
              invalid: "は有効でありません。"
            nickname:
              blank: "が入力されていません。"
              too_long: "は%{count}文字以下に設定して下さい。"
            password:
              blank: "が入力されていません。"
              too_short: "は%{count}文字以上に設定して下さい。"
              too_long: "は%{count}文字以下に設定して下さい。"
              invalid: "は有効でありません。"
            password_confirmation:
              confirmation: "が一致していません。"
    attributes:
      user:
        nickname: "ニックネーム"
        email: "メールアドレス"
        password: "パスワード"
        password_confirmation: "確認用パスワード"
    models:
      user: "ユーザー"
  errors:
    messages:
      not_saved: "エラーが発生したため%{resource}は保存されませんでした。"
  devise:
    failure:
      invalid: "%{authentication_keys}またはパスワードが違います。"
    registrations:
      user:
        signed_up: ユーザー登録に成功しました。
    sessions:
      new:
        sign_in: ログイン
      signed_in: ログインしました。
      user:
        signed_out: ログアウトしました。
```

このように.yml形式で、エラー内容を階層に分けて日本語訳を記載するというのは、Deviseのお作法に則ったやり方となります。

現在はユーザー登録・ログイン・ログアウト機能しか実装していませんが、パスワード再設定などDevise特有の機能を利用するときには本ファイルを編集することも覚えておきましょう。

## テストを実行

さて、ブラウザで動作確認する前にテストを実行してみましょう。実はこの時点でもコケるテストが一つあります。

```bash
$ bin/rspec

...

Failures:

  1) Home ナビゲーションバーの検証 ログインしている場合 ログアウトリンクが機能する
     Failure/Error: expect(page).not_to have_content('ログアウト')
       expected not to find text "ログアウト" in "TechLog\nユーザー登録\nログイン\nログアウトしました。\nHome#top\nFind me in app/views/home/top.html.erb"

...

Failed examples:
rspec ./spec/system/home_spec.rb:52 # Home ナビゲーションバーの検証 ログインしている場合 ログアウトリンクが機能する
```

ナビゲーションバーを追加した時のテストがコケてしまいました。テストのエラーメッセージをチェックしてみます。

```
     Failure/Error: expect(page).not_to have_content('ログアウト')
       expected not to find text "ログアウト" in "TechLog\nユーザー登録\nログイン\nログアウトしました。\nHome#top\nFind me in app/views/home/top.html.erb"
```

`expected not to find text "ログアウト"...` という一文に注目してください。「ログアウトというテキストが含まれないことを期待していたが、実際には含まれていた」というエラーです。

ここでテストの中身を確認してみます。

spec/system/home_spec.rb

```ruby
...
      it 'ログアウトリンクが機能する' do
        click_button 'ログアウト'
        # ログインしていない状態のリンク表示パターンになることを確認
        expect(page).to have_link('ユーザー登録', href: '/users/sign_up')
        expect(page).to have_link('ログイン', href: '/users/sign_in')
        expect(page).not_to have_content('ログアウト')
      end
...
```

上記のうち `expect(page).not_to have_content('ログアウト')` という箇所になります。

これは、ログアウトのリンク有無の識別として**「ログアウトという文字があるかどうか」**を基準にしていました。しかし今回、ログアウト成功時のフラッシュメッセージを**「ログアウトしました。」**というテキストに設定したため、フラッシュメッセージが誤って認識されてしまっています。

原因はテストの書き方にあることが分かりましたので、問題のあったテスト1行を修正しましょう。幸い、ログアウトリンクはtypeが `submit` でしたので、Capybaraの `have_button` マッチャを使用します。これを用い、次のように変更します。

spec/system/home_spec.rb

```ruby
...
      it 'ログアウトリンクが機能する' do
        click_button 'ログアウト'
        # ログインしていない状態のリンク表示パターンになることを確認
        expect(page).to have_link('ユーザー登録', href: '/users/sign_up')
        expect(page).to have_link('ログイン', href: '/users/sign_in')
        expect(page).not_to have_button('ログアウト') # 修正
      end
...
```

修正後、先ほどコケていたテストも含めすべてのテストに通ることを確認しましょう。

```bash
$ bin/rspec

...

Finished in 9.45 seconds (files took 0.41715 seconds to load)
29 examples, 0 failures
```

最後に、実際に画面上ではどのように変わっているかをブラウザで確認していきます。テストで通っていれば機能要件は満たせているはずですが、大きな変更を行ったあとは、見た目として違和感がないかをチェックすることも重要です。テスト駆動開発の考え方と少し矛盾するところはありますが、臨機応変に使い分けていけるといいですね。

## 動作確認

ユーザー登録、ログイン、ログアウトそれぞれで出るメッセージがすべて日本語になっていることを確認しましょう。

### ユーザー登録

`http://127.0.0.1:3000/users/sign_up` にアクセスしましょう。最初はすべての欄を空にしたまま、ユーザー登録に失敗します。エラーメッセージも日本語化されていますね。

![ユーザー登録エラーメッセージの日本語化](/img/rails/devise-signup-validation-error-ja.png)


次は、ちゃんとした情報を埋めてユーザー登録に成功しましょう。「ユーザー登録に成功しました。」というフラッシュメッセージが表示されていればOKです。

![ユーザー登録成功メッセージの日本語化](/img/rails/devise-signup-success-ja.png)


### ログアウト

では、ログアウト時のメッセージが日本語化されているかを確認しましょう。ナビゲーションバーからログアウトリンクを選択します。「ログアウトしました。」と表示されていればOKです。

![ログアウトメッセージの日本語化](/img/rails/devise-logout-success-ja.png)


### ログイン

最後に、ログイン時のメッセージが日本語化されているかを確認しましょう。ナビゲーションバーからログインリンクを選択します。まずは、空っぽの情報でログインします。「メールアドレスまたはパスワードが違います。」と表示されていればOKです。

![ログイン失敗メッセージの日本語化](/img/rails/devise-login-error-ja.png)

認証に失敗した理由とともに、エラーメッセージが出ていますね。次は作成したユーザーの認証情報でログインします。

![ログイン成功メッセージの日本語化](/img/rails/devise-login-success-ja.png)

「ログインしました。」と表示されていますね。翻訳ファイルに記載した内容がそのまま表示されていることが分かります。

## 変更をコミット

長かったですが、これで日本語化の作業は完了です。ここまでの変更をコミットしておきます。

```bash
$ git add .
$ git commit -m "devise関連のメッセージを日本語化"
$ git push
```

これでDeviseユーザー認証周りの変更は一旦おしまいです。ボリュームが多く、Deviseのルールを覚えるのは大変だったかと思います。ただ、一度覚えてしまえば他のアプリにも使いまわせるものですので、今回のセクションで学んできた内容はずっと使える知識です。ぜひ、復習しながら知識の定着を図ってみてください。

## 補足：devise-i18n

`devise-i18n` というまた別なgemを使うと、翻訳ファイルを自分で用意しなくてもコマンドで生成したりもできます。

[https://github.com/tigrish/devise-i18n](https://github.com/tigrish/devise-i18n)

ただし、不要な翻訳の取捨選択が必要だったり、ブラックボックス化（中で何が行われているか分からなくなる自体）を避けるため今回は使いませんでした。

慣れてきたら、こういったgemを使うのも良いでしょう。

## まとめ

本章では、Railsアプリケーションの国際化（i18n）設定とDeviseのメッセージを日本語化する方法を学びました。言語設定の変更や翻訳ファイルの作成など、日本語対応の基本的な手順を理解できたと思います。

また、変更後のメッセージをテストで検証することで、日本語化が正しく機能していることを確認しました。エラーメッセージやフラッシュメッセージを日本語化することで、日本語圏のユーザーにとってより使いやすいアプリケーションになりました。

この知識は、今後他のRailsアプリケーションを開発する際にも応用できるでしょう。
