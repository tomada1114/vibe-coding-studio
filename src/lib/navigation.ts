export const navigation = [
  {
    title: "Rspec",
    slug: "rspec",
    links: [
      {
        title: "テストの基礎とRSpecの概要",
        href: "/docs/rspec/basics_and_introduction",
        children: [
          {
            title: "RSpec・テストフレームの基礎",
            href: "/docs/rspec/basics_and_introduction/rspec_basics",
          },
          {
            title: "RSpecのメリット",
            href: "/docs/rspec/basics_and_introduction/rspec_benefits",
          },
        ],
      },
      {
        title: "RSpecを導入してみよう",
        href: "/docs/rspec/rspec_setup",
        children: [
          {
            title: "ターミナルの操作について",
            href: "/docs/rspec/rspec_setup/about_terminal",
          },
          {
            title: "【Mac向け】 HomebrewとrbenvでRuby開発環境を作ろう",
            href: "/docs/rspec/rspec_setup/mac-ruby-installation",
          },
          {
            title: "【Windows向け】 RubyをPCにインストールしよう",
            href: "/docs/rspec/rspec_setup/windows-ruby-installation",
          },
          {
            title: "RSpecをインストールしよう",
            href: "/docs/rspec/rspec_setup/rspec_installation",
          },
          {
            title: "RSpecの初期設定をしよう",
            href: "/docs/rspec/rspec_setup/rspec_initial_configuration",
          },
          {
            title: "RSpec を試しに動かしてみよう",
            href: "/docs/rspec/rspec_setup/rspec_first_run",
          },
        ],
      },
      {
        title: "RSpec の書き方を学ぼう",
        href: "/docs/rspec/rspec_syntax",
        children: [
          {
            title: "describeでテストを構造化しよう",
            href: "/docs/rspec/rspec_syntax/describe_blocks",
          },
          {
            title: "contextでテスト条件を整理しよう",
            href: "/docs/rspec/rspec_syntax/context_blocks",
          },
          {
            title: "itで期待する振る舞いを定義しよう",
            href: "/docs/rspec/rspec_syntax/it_blocks",
          },
          {
            title: "expectとeqマッチャーで動作を検証しよう",
            href: "/docs/rspec/rspec_syntax/expect_and_eq_matcher",
          },
          {
            title: "beマッチャーでオブジェクトの状態を検証しよう",
            href: "/docs/rspec/rspec_syntax/be_matcher",
          },
          {
            title: "includeマッチャーで配列やハッシュの中身を検証しよう",
            href: "/docs/rspec/rspec_syntax/include_matcher",
          },
          {
            title: "changeマッチャーで値の変化を検証しよう",
            href: "/docs/rspec/rspec_syntax/change_matcher",
          },
          {
            title: "raise_errorマッチャーでエラー処理を検証しよう",
            href: "/docs/rspec/rspec_syntax/raise_error_matcher",
          },
          {
            title: "subjectでテスト対象の処理を効率よく書こう",
            href: "/docs/rspec/rspec_syntax/subject",
          },
        ],
      },
      {
        title: "複雑な処理を簡単にテストしよう",
        href: "/docs/rspec/advanced_testing",
        children: [
          {
            title: "letでテストデータを効率的に管理しよう",
            href: "/docs/rspec/advanced_testing/let",
          },
          {
            title: "beforeでテスト実行前の処理を共通化しよう",
            href: "/docs/rspec/advanced_testing/before",
          },
          {
            title: "allowスタブで外部処理を置き換えてテストしよう",
            href: "/docs/rspec/advanced_testing/allow_stubs",
          },
          {
            title: "オブジェクト同士の連携をdoubleモックでテストしよう",
            href: "/docs/rspec/advanced_testing/doubles_and_mocks",
          },
          {
            title: "instance_doubleで安全なモックを使ったテストを書こう",
            href: "/docs/rspec/advanced_testing/instance_double",
          },
          {
            title: "instance_doubleでメソッドの返り値もテストしよう",
            href: "/docs/rspec/advanced_testing/instance_double_return_values",
          },
          {
            title: "モックとスタブの使い分けを理解しよう",
            href: "/docs/rspec/advanced_testing/mocks_vs_stubs",
          },
        ],
      },
      {
        title: "Rails のモデルをテストしよう",
        href: "/docs/rspec/rails_model_testing",
        children: [
          {
            title: "Ruby on Railsプロジェクトのセットアップ",
            href: "/docs/rspec/rails_model_testing/rails_project_setup",
          },
          {
            title: "モデルテストの基本",
            href: "/docs/rspec/rails_model_testing/model_testing_basics",
          },
          {
            title: "バリデーションをテストしよう",
            href: "/docs/rspec/rails_model_testing/validation_testing",
          },
          {
            title: "モデル間のアソシエーションをテストしよう",
            href: "/docs/rspec/rails_model_testing/association_testing",
          },
          {
            title: "モデルに追加したメソッドをテストしよう",
            href: "/docs/rspec/rails_model_testing/custom_method_testing",
          },
        ],
      },
      {
        title: "コントローラをテストしよう",
        href: "/docs/rspec/rails_controller_testing",
        children: [
          {
            title: "記事一覧の取得（GETリクエスト）をテストしよう",
            href: "/docs/rspec/rails_controller_testing/get_requests",
          },
          {
            title: "記事の投稿（POSTリクエスト）をテストしよう",
            href: "/docs/rspec/rails_controller_testing/post_requests",
          },
          {
            title: "記事の更新（PATCHリクエスト）をテストしよう",
            href: "/docs/rspec/rails_controller_testing/patch_requests",
          },
          {
            title: "記事の削除（DELETEリクエスト）をテストしよう",
            href: "/docs/rspec/rails_controller_testing/delete_requests",
          },
        ],
      },
      {
        title: "ブラウザ操作を自動テストしよう",
        href: "/docs/rspec/system_specs",
        children: [
          {
            title: "RSpecとCapybaraでブラウザ操作をテストしよう",
            href: "/docs/rspec/system_specs/capybara_basics",
          },
          {
            title: "フォーム入力・送信のテストを自動化しよう",
            href: "/docs/rspec/system_specs/form_submission_testing",
          },
          {
            title: "フォームのバリデーション検証を自動化しよう",
            href: "/docs/rspec/system_specs/form_validation_testing",
          },
          {
            title: "編集フォームでの更新テストを自動化しよう",
            href: "/docs/rspec/system_specs/edit_form_testing",
          },
          {
            title: "JavaScriptを使った動作をテストしよう",
            href: "/docs/rspec/system_specs/javascript_testing",
          },
        ],
      },
    ],
  },
  {
    title: "Ruby",
    slug: "ruby",
    links: [
      {
        title: "はじめに",
        href: "/docs/ruby/introduction",
        children: [
          {
            title: "Rubyの概要を学ぼう",
            href: "/docs/ruby/introduction/what_is_ruby",
          },
        ],
      },
      {
        title: "Ruby開発環境の構築",
        href: "/docs/ruby/development_environment",
        children: [
          {
            title: "開発環境とは",
            href: "/docs/ruby/development_environment/about-development-environment",
          },
          {
            title: "【Mac向け】 ターミナルの操作について",
            href: "/docs/ruby/development_environment/mac-terminal-introduction",
          },
          {
            title: "【Mac向け】 HomebrewとrbenvでRuby開発環境を作ろう",
            href: "/docs/ruby/development_environment/mac-ruby-installation",
          },
          {
            title: "【Windows向け】 Powershellの操作について",
            href: "/docs/ruby/development_environment/windows-powershell-introduction",
          },
          {
            title: "【Windows向け】 RubyをPCにインストールしよう",
            href: "/docs/ruby/development_environment/windows-ruby-installation",
          },
          {
            title: "VS Codeをインストールしよう",
            href: "/docs/ruby/development_environment/vscode-installation",
          },
          {
            title: "VS Codeの基本操作を学ぼう",
            href: "/docs/ruby/development_environment/vscode-basics",
          },
          {
            title: "VS Codeでターミナルを使ってみよう",
            href: "/docs/ruby/development_environment/vscode-terminal",
          },
          {
            title: "VS Codeの拡張機能を活用しよう",
            href: "/docs/ruby/development_environment/vscode-extensions",
          },
        ],
      },
      {
        title: "Rubyの文法",
        href: "/docs/ruby/ruby_syntax",
        children: [
          {
            title: "Rubyプログラムの実行方法を学ぼう",
            href: "/docs/ruby/ruby_syntax/execute-ruby-program",
          },
          {
            title: "irbで対話的にRubyを動かしてみよう",
            href: "/docs/ruby/ruby_syntax/interactive-ruby",
          },
          {
            title: "コメントの書き方を学ぼう",
            href: "/docs/ruby/ruby_syntax/ruby-comments",
          },
          {
            title: "変数を理解しよう",
            href: "/docs/ruby/ruby_syntax/understanding-variables",
          },
          {
            title: "数値を扱ってみよう",
            href: "/docs/ruby/ruby_syntax/numbers",
          },
          {
            title: "文字列を操作してみよう",
            href: "/docs/ruby/ruby_syntax/strings",
          },
          {
            title: "シンボルを理解しよう",
            href: "/docs/ruby/ruby_syntax/symbols",
          },
          {
            title: "真偽値を理解しよう",
            href: "/docs/ruby/ruby_syntax/boolean",
          },
          {
            title: "nil の扱い方を学ぼう",
            href: "/docs/ruby/ruby_syntax/understanding-nil",
          },
          {
            title: "配列の作成と基本操作を学ぼう",
            href: "/docs/ruby/ruby_syntax/array-basics",
          },
          {
            title: "配列の要素を追加・削除しよう",
            href: "/docs/ruby/ruby_syntax/array-operations",
          },
          {
            title: "ハッシュの作成と基本操作",
            href: "/docs/ruby/ruby_syntax/hash-basics",
          },
          {
            title: "ハッシュの要素を追加・削除しよう",
            href: "/docs/ruby/ruby_syntax/hash-operations",
          },
          {
            title: "if/unlessによる条件分岐の書き方",
            href: "/docs/ruby/ruby_syntax/if-unless",
          },
          {
            title: "三項演算子で条件分岐をシンプルに書こう",
            href: "/docs/ruby/ruby_syntax/ternary-operator",
          },
          {
            title: "case文で複数の条件分岐を簡潔に書こう",
            href: "/docs/ruby/ruby_syntax/case-when",
          },
          {
            title: "eachメソッドで配列の要素を順番に処理しよう",
            href: "/docs/ruby/ruby_syntax/each-loop",
          },
          {
            title: "whileのループ処理を学ぼう",
            href: "/docs/ruby/ruby_syntax/while-loop",
          },
          {
            title: "breakとnextでループ処理を柔軟に制御しよう",
            href: "/docs/ruby/ruby_syntax/break-next-loop",
          },
        ],
      },
      {
        title: "メソッド",
        href: "/docs/ruby/methods",
        children: [
          {
            title: "メソッドで処理をまとめよう",
            href: "/docs/ruby/methods/basic-methods",
          },
          {
            title: "メソッドが返す戻り値を理解しよう",
            href: "/docs/ruby/methods/return-values",
          },
          {
            title: "メソッドに引数を渡そう",
            href: "/docs/ruby/methods/method-arguments",
          },
          {
            title: "複数の引数を扱うメソッドを書いてみよう",
            href: "/docs/ruby/methods/multiple-arguments",
          },
          {
            title: "引数にデフォルト値を設定しよう",
            href: "/docs/ruby/methods/default-arguments",
          },
          {
            title: "キーワード引数で読みやすくしよう",
            href: "/docs/ruby/methods/keyword-arguments",
          },
          {
            title: "可変長引数で引数の数を柔軟にしよう",
            href: "/docs/ruby/methods/variable-arguments",
          },
          {
            title: "例外処理で安心なプログラムを作ろう",
            href: "/docs/ruby/methods/exception-handling",
          },
        ],
      },
      {
        title: "オブジェクト指向",
        href: "/docs/ruby/object_oriented",
        children: [
          {
            title: "クラスとインスタンスを学ぼう",
            href: "/docs/ruby/object_oriented/class-and-instance",
          },
          {
            title: "インスタンス変数でデータを管理しよう",
            href: "/docs/ruby/object_oriented/instance-variables",
          },
          {
            title: "ローカル変数とインスタンス変数の違いを理解しよう",
            href: "/docs/ruby/object_oriented/local-vs-instance-variables",
          },
          {
            title: "initializeメソッドでインスタンスの初期設定をしよう",
            href: "/docs/ruby/object_oriented/initialize-method",
          },
          {
            title: "アクセサメソッドでインスタンス変数を簡単に読み書きしよう",
            href: "/docs/ruby/object_oriented/accessor-methods",
          },
          {
            title: "クラスメソッドでインスタンスを作らずにメソッドを使おう",
            href: "/docs/ruby/object_oriented/class-methods",
          },
          {
            title: "クラス変数を理解しよう",
            href: "/docs/ruby/object_oriented/class-variables",
          },
          {
            title: "selfを使ってコードをスッキリさせよう",
            href: "/docs/ruby/object_oriented/understanding-self",
          },
          {
            title: "変わらない値は定数にしよう",
            href: "/docs/ruby/object_oriented/constants",
          },
          {
            title: "クラスを継承して機能を受け継ぐ方法を学ぼう",
            href: "/docs/ruby/object_oriented/inheritance",
          },
          {
            title: "モジュールを使って共通の機能をまとめよう",
            href: "/docs/ruby/object_oriented/modules",
          },
          {
            title: "名前空間でコードを整理しよう",
            href: "/docs/ruby/object_oriented/namespaces",
          },
        ],
      },
      {
        title: "開発に便利なメソッド",
        href: "/docs/ruby/useful_methods",
        children: [
          {
            title: "配列の便利なメソッドを使いこなそう",
            href: "/docs/ruby/useful_methods/array-useful-methods",
          },
          {
            title: "配列を並び替えてみよう",
            href: "/docs/ruby/useful_methods/array-sorting",
          },
          {
            title: "真偽値を返すメソッドを使いこなそう",
            href: "/docs/ruby/useful_methods/predicate-methods",
          },
          {
            title: "文字列を加工するメソッドを学ぼう",
            href: "/docs/ruby/useful_methods/string-manipulation",
          },
          {
            title: "日付と時刻の基本的な扱い方を学ぼう",
            href: "/docs/ruby/useful_methods/date-and-time",
          },
        ],
      },
    ],
  },
  {
    title: "Rails",
    slug: "rails",
    links: [
      {
        title: "はじめに",
        href: "/docs/rails/introduction",
        children: [
          {
            title: "Railsとは？全体像を掴もう",
            href: "/docs/rails/introduction/rails-overview",
          },
        ],
      },
      {
        title: "Railsの基礎を学ぼう",
        href: "/docs/rails/rails_basic",
        children: [
          {
            title: "rails new でプロジェクトを作成してみよう",
            href: "/docs/rails/rails_basic/rails-new-project",
          },
          {
            title: "ルーティングとコントローラを試す - 静的ページ編",
            href: "/docs/rails/rails_basic/routing-controller-static",
          },
          {
            title: "scaffoldでデータ処理機能を素早く作ってみよう",
            href: "/docs/rails/rails_basic/scaffold-crud",
          },
          {
            title: "Rails のデータ作成・表示・編集・削除を体験してみよう",
            href: "/docs/rails/rails_basic/crud-experience",
          },
          {
            title: "Rails の index, show アクションを理解しよう",
            href: "/docs/rails/rails_basic/index-show",
          },
          {
            title: "Rails の new, create アクションを理解しよう",
            href: "/docs/rails/rails_basic/new-create",
          },
          {
            title: "Rails の edit, update アクションを理解しよう",
            href: "/docs/rails/rails_basic/edit-update",
          },
          {
            title: "Rails の destroy アクションを理解しよう",
            href: "/docs/rails/rails_basic/destroy",
          },
          {
            title: "モデルにバリデーションを追加して入力データを制限しよう",
            href: "/docs/rails/rails_basic/model-validation",
          },
          {
            title: "layoutとCSSで見た目を整えよう",
            href: "/docs/rails/rails_basic/layout-css",
          },
          {
            title: "モデル間の関連付け - 1対多の関係を理解しよう",
            href: "/docs/rails/rails_basic/association-one-to-many",
          },
        ],
      },
      {
        title: "学習記録アプリの初期設定をしよう",
        href: "/docs/rails/techlog-setup",
        children: [
          {
            title: "TechLog を触ってイメージを掴もう",
            href: "/docs/rails/techlog-setup/techlog-overview",
          },
          {
            title: "Bundler で Gem を管理しよう",
            href: "/docs/rails/techlog-setup/bundler-gem",
          },
          {
            title: "TechLog アプリの初期設定をしよう",
            href: "/docs/rails/techlog-setup/techlog-init",
          },
          {
            title: "Git と GitHub の初期設定をしよう",
            href: "/docs/rails/techlog-setup/git-github-init",
          },
          {
            title: "TechLog を GitHub にアップロードしよう",
            href: "/docs/rails/techlog-setup/techlog-github-upload",
          },
          {
            title: "Rubocop で見やすく綺麗なソースコードにしよう",
            href: "/docs/rails/techlog-setup/rubocop",
          },
          {
            title: "不要ファイルが生成されないように設定しよう",
            href: "/docs/rails/techlog-setup/unnecessary-files",
          },
          {
            title: "RSpec を導入して自動テストの準備をしよう",
            href: "/docs/rails/techlog-setup/rspec-setup",
          },
          {
            title: "トップページを作成しよう",
            href: "/docs/rails/techlog-setup/top-page",
          },
          {
            title: "Capybara でユーザー操作を再現したテストをしよう",
            href: "/docs/rails/techlog-setup/capybara",
          },
          {
            title: "Tailwind CSS の書き方を学ぼう",
            href: "/docs/rails/techlog-setup/tailwindcss",
          },
        ],
      },
      {
        title: "ログイン機能を追加しよう",
        href: "/docs/rails/techlog-login",
        children: [
          {
            title: "Devise をインストールしてユーザー認証機能を追加しよう",
            href: "/docs/rails/techlog-login/devise-install",
          },
          {
            title: "User モデルにテストを追加しよう",
            href: "/docs/rails/techlog-login/user-model-test",
          },
          {
            title: "ユーザー関連のビューをカスタマイズしよう",
            href: "/docs/rails/techlog-login/user-view-custom",
          },
          {
            title: "ナビゲーションバーで各ページへの導線を作ろう",
            href: "/docs/rails/techlog-login/navbar",
          },
          {
            title: "ユーザー登録ページをカスタマイズしよう",
            href: "/docs/rails/techlog-login/user-registration-custom",
          },
          {
            title: "ログインページをカスタマイズしよう",
            href: "/docs/rails/techlog-login/login-page-custom",
          },
          {
            title: "処理成功・失敗時のフラッシュメッセージを表示しよう",
            href: "/docs/rails/techlog-login/flash-message",
          },
          {
            title: "バリデーションのエラーメッセージをカスタマイズしよう",
            href: "/docs/rails/techlog-login/validation-error-message",
          },
          {
            title: "Deviseを日本語に対応させよう",
            href: "/docs/rails/techlog-login/devise-i18n",
          },
        ],
      },
      {
        title: "投稿機能を追加しよう",
        href: "/docs/rails/techlog-post",
        children: [
          {
            title: "Post モデルを作成しよう",
            href: "/docs/rails/techlog-post/post-model",
          },
          {
            title: "学習ログ投稿機能を作成しよう",
            href: "/docs/rails/techlog-post/post-function",
          },
          {
            title: "学習ログ詳細ページを作成しよう",
            href: "/docs/rails/techlog-post/post-detail",
          },
          {
            title: "学習ログ一覧ページを作成しよう",
            href: "/docs/rails/techlog-post/post-list",
          },
          {
            title: "学習ログ削除機能を作成しよう",
            href: "/docs/rails/techlog-post/post-delete",
          },
          {
            title: "ユーザーマイページを作成しよう",
            href: "/docs/rails/techlog-post/user-mypage",
          },
          {
            title: "トップページをデザインしよう",
            href: "/docs/rails/techlog-post/top-page-custom",
          },
        ],
      },
      {
        title: "コメント機能を追加しよう",
        href: "/docs/rails/techlog-comment",
        children: [
          {
            title: "Comment モデルとコントローラーを作成しよう",
            href: "/docs/rails/techlog-comment/comment-model-controller",
          },
          {
            title: "コメントのルーティングを設定しよう",
            href: "/docs/rails/techlog-comment/comment-routing",
          },
          {
            title: "投稿詳細ページにコメントフォームを追加しよう",
            href: "/docs/rails/techlog-comment/comment-form",
          },
          {
            title: "コメント投稿機能を実装しよう",
            href: "/docs/rails/techlog-comment/comment-create",
          },
          {
            title: "コメント一覧表示機能を実装しよう",
            href: "/docs/rails/techlog-comment/comment-list",
          },
          {
            title: "コメント削除機能を追加しよう",
            href: "/docs/rails/techlog-comment/comment-delete",
          },
          {
            title: "コメント編集機能を実装しよう",
            href: "/docs/rails/techlog-comment/comment-edit",
          },
          {
            title: "投稿一覧と詳細ページにコメント数を表示しよう",
            href: "/docs/rails/techlog-comment/comment-count",
          },
        ],
      },
      {
        title: "ポートフォリオを公開しよう",
        href: "/docs/rails/deploy",
        children: [
          {
            title: "RenderとNeonを使って無料でデプロイしよう",
            href: "/docs/rails/deploy/render_neon_deploy",
          },
        ],
      },
    ],
  },
  {
    title: "JavaScript",
    slug: "javascript",
    links: [
      {
        title: "はじめに",
        href: "/docs/javascript/introduction",
        children: [
          {
            title: "JavaScriptとは？基本的な特徴を理解しよう",
            href: "/docs/javascript/introduction/what_is_javascript",
          },
        ],
      },
      {
        title: "JavaScript開発環境の構築",
        href: "/docs/javascript/development_environment",
        children: [
          {
            title: "HTMLファイルにJavaScriptを組み込む方法を学ぼう",
            href: "/docs/javascript/development_environment/html_javascript_integration",
          },
          {
            title: "VS CodeでJavaScriptファイルを作成してみよう",
            href: "/docs/javascript/development_environment/vscode_javascript_files",
          },
          {
            title: "ブラウザの開発者ツールを使ってみよう",
            href: "/docs/javascript/development_environment/browser_developer_tools",
          },
          {
            title: "コンソールで最初のJavaScriptを実行してみよう",
            href: "/docs/javascript/development_environment/console_javascript_execution",
          },
        ],
      },
      {
        title: "JavaScriptの基本文法",
        href: "/docs/javascript/basic_syntax",
        children: [
          {
            title: "コメントの書き方を学ぼう",
            href: "/docs/javascript/basic_syntax/comments",
          },
          {
            title: "変数を宣言してみよう（let、const）",
            href: "/docs/javascript/basic_syntax/variables_let_const",
          },
          {
            title: "数値を扱ってみよう",
            href: "/docs/javascript/basic_syntax/numbers",
          },
          {
            title: "文字列を操作してみよう",
            href: "/docs/javascript/basic_syntax/strings",
          },
          {
            title: "真偽値を理解しよう",
            href: "/docs/javascript/basic_syntax/boolean",
          },
          {
            title: "null と undefined の違いを学ぼう",
            href: "/docs/javascript/basic_syntax/null_undefined",
          },
          {
            title: "配列の作成と基本操作を学ぼう",
            href: "/docs/javascript/basic_syntax/arrays",
          },
          {
            title: "オブジェクトの基本的な作り方と使い方を学ぼう",
            href: "/docs/javascript/basic_syntax/objects",
          },
        ],
      },
      {
        title: "制御構造",
        href: "/docs/javascript/control_structures",
        children: [
          {
            title: "if文による条件分岐を学ぼう",
            href: "/docs/javascript/control_structures/if_statements",
          },
          {
            title: "switch文で複数の条件を扱ってみよう",
            href: "/docs/javascript/control_structures/switch_statements",
          },
          {
            title: "for文で繰り返し処理を学ぼう",
            href: "/docs/javascript/control_structures/for_loops",
          },
          {
            title: "while文を使った繰り返しを学ぼう",
            href: "/docs/javascript/control_structures/while_loops",
          },
          {
            title: "配列とfor文を組み合わせてみよう",
            href: "/docs/javascript/control_structures/arrays_with_for_loops",
          },
        ],
      },
      {
        title: "関数",
        href: "/docs/javascript/functions",
        children: [
          {
            title: "関数の基本的な作り方を学ぼう",
            href: "/docs/javascript/functions/basic_functions",
          },
          {
            title: "引数と戻り値を理解しよう",
            href: "/docs/javascript/functions/parameters_return_values",
          },
          {
            title: "アロー関数の書き方を覚えよう",
            href: "/docs/javascript/functions/arrow_functions",
          },
          {
            title: "配列のforEachメソッドを使ってみよう",
            href: "/docs/javascript/functions/foreach_method",
          },
          {
            title: "mapとfilterメソッドで配列を操作しよう",
            href: "/docs/javascript/functions/map_filter_methods",
          },
        ],
      },
      {
        title: "エラー処理",
        href: "/docs/javascript/error_handling",
        children: [
          {
            title: "try-catch文でエラーを処理してみよう",
            href: "/docs/javascript/error_handling/try_catch",
          },
          {
            title: "エラーの種類を理解しよう",
            href: "/docs/javascript/error_handling/error_types",
          },
          {
            title: "意図的にエラーを発生させてみよう",
            href: "/docs/javascript/error_handling/throwing_errors",
          },
          {
            title: "エラーメッセージを読む習慣をつけよう",
            href: "/docs/javascript/error_handling/reading_error_messages",
          },
        ],
      },
      {
        title: "DOM操作とイベント",
        href: "/docs/javascript/dom_events",
        children: [
          {
            title: "DOMとは何かを理解しよう",
            href: "/docs/javascript/dom_events/understanding_dom",
          },
          {
            title: "要素を取得してテキストを変更してみよう",
            href: "/docs/javascript/dom_events/element_selection_text_modification",
          },
          {
            title: "ボタンのクリックイベントを処理してみよう",
            href: "/docs/javascript/dom_events/button_click_events",
          },
          {
            title: "フォームの入力値を取得してみよう",
            href: "/docs/javascript/dom_events/form_input_handling",
          },
          {
            title: "要素を動的に追加・削除してみよう",
            href: "/docs/javascript/dom_events/dynamic_element_manipulation",
          },
          {
            title: "CSSクラスを操作してスタイルを変更しよう",
            href: "/docs/javascript/dom_events/css_class_manipulation",
          },
        ],
      },
      {
        title: "非同期処理の基礎",
        href: "/docs/javascript/asynchronous_basics",
        children: [
          {
            title: "同期処理と非同期処理の違いを理解しよう",
            href: "/docs/javascript/asynchronous_basics/sync_vs_async",
          },
          {
            title: "setTimeoutで時間差処理を体験してみよう",
            href: "/docs/javascript/asynchronous_basics/settimeout",
          },
          {
            title: "Promiseの基本的な使い方を学ぼう",
            href: "/docs/javascript/asynchronous_basics/promises",
          },
          {
            title: "async/awaitで非同期処理を書いてみよう",
            href: "/docs/javascript/asynchronous_basics/async_await",
          },
          {
            title: "try-catchを使って非同期エラーを処理しよう",
            href: "/docs/javascript/asynchronous_basics/async_error_handling",
          },
        ],
      },
      {
        title: "APIとの通信",
        href: "/docs/javascript/api_communication",
        children: [
          {
            title: "fetchを使ってデータを取得してみよう",
            href: "/docs/javascript/api_communication/fetch_api",
          },
          {
            title: "JSONデータを扱ってみよう",
            href: "/docs/javascript/api_communication/json_handling",
          },
          {
            title: "取得したデータを画面に表示してみよう",
            href: "/docs/javascript/api_communication/data_display",
          },
          {
            title: "APIエラーを適切に処理してみよう",
            href: "/docs/javascript/api_communication/api_error_handling",
          },
        ],
      },
      {
        title: "簡単なアプリケーションを作ろう",
        href: "/docs/javascript/simple_applications",
        children: [
          {
            title: "ToDoリストアプリを作成してみよう",
            href: "/docs/javascript/simple_applications/todo_list_app",
          },
          {
            title: "おみくじアプリを作成してみよう",
            href: "/docs/javascript/simple_applications/omikuji_app",
          },
        ],
      },
    ],
  },
  {
    title: "React",
    slug: "react",
    links: [
      {
        title: "はじめに",
        href: "/docs/react/introduction",
        children: [
          {
            title: "Reactとは？基本概念を理解しよう",
            href: "/docs/react/introduction/react_basic_concepts",
          },
        ],
      },
      {
        title: "React開発環境の構築",
        href: "/docs/react/development_environment",
        children: [
          {
            title: "ViteでReact開発環境を作ろう",
            href: "/docs/react/development_environment/vite_setup",
          },
          {
            title: "プロジェクト構成を理解しよう",
            href: "/docs/react/development_environment/project_structure",
          },
          {
            title: "VS CodeでReact開発環境を整えよう",
            href: "/docs/react/development_environment/vscode_setup",
          },
        ],
      },
      {
        title: "Tailwind CSSでスタイリングを学ぼう",
        href: "/docs/react/tailwind_css",
        children: [
          {
            title: "Tailwind CSSとは何かを理解しよう",
            href: "/docs/react/tailwind_css/tailwind_basics",
          },
          {
            title: "Tailwind CSSの基本的な使い方",
            href: "/docs/react/tailwind_css/tailwind_usage",
          },
          {
            title: "ReactでTailwind CSSを使ってみよう",
            href: "/docs/react/tailwind_css/react_tailwind_integration",
          },
        ],
      },
      {
        title: "JSXとコンポーネントの基礎",
        href: "/docs/react/jsx_components",
        children: [
          {
            title: "JSXの書き方を学ぼう",
            href: "/docs/react/jsx_components/jsx_syntax",
          },
          {
            title: "関数コンポーネントを作ってみよう",
            href: "/docs/react/jsx_components/functional_components",
          },
          {
            title: "Propsでデータを受け渡そう",
            href: "/docs/react/jsx_components/props",
          },
          {
            title: "イベントハンドリングの基本",
            href: "/docs/react/jsx_components/event_handling",
          },
        ],
      },
      {
        title: "Stateとライフサイクル",
        href: "/docs/react/state_lifecycle",
        children: [
          {
            title: "useStateでコンポーネントの状態を管理しよう",
            href: "/docs/react/state_lifecycle/use_state",
          },
          {
            title: "実践的なStateの活用",
            href: "/docs/react/state_lifecycle/practical_state",
          },
          {
            title: "useEffectでサイドエフェクトを扱おう",
            href: "/docs/react/state_lifecycle/use_effect",
          },
          {
            title: "よく使うReact Hooksを学ぼう",
            href: "/docs/react/state_lifecycle/common_hooks",
          },
        ],
      },
      {
        title: "Todoアプリを作ろう",
        href: "/docs/react/todo_app",
        children: [
          {
            title: "Todoアプリの設計と準備",
            href: "/docs/react/todo_app/todo_design",
          },
          {
            title: "Todo一覧表示機能を実装しよう",
            href: "/docs/react/todo_app/todo_list",
          },
          {
            title: "Todo追加機能を実装しよう",
            href: "/docs/react/todo_app/todo_add",
          },
          {
            title: "Todo削除機能を実装しよう",
            href: "/docs/react/todo_app/todo_delete",
          },
          {
            title: "Todo編集機能を実装しよう",
            href: "/docs/react/todo_app/todo_edit",
          },
          {
            title: "Todo完了機能を実装しよう",
            href: "/docs/react/todo_app/todo_complete",
          },
          {
            title: "localStorageでデータを一時保存しよう",
            href: "/docs/react/todo_app/local_storage",
          },
        ],
      },
      {
        title: "TypeScriptでReactを書こう",
        href: "/docs/react/typescript_react",
        children: [
          {
            title: "TypeScript版Reactプロジェクトを作成しよう",
            href: "/docs/react/typescript_react/typescript_project_setup",
          },
          {
            title: "コンポーネントの型定義",
            href: "/docs/react/typescript_react/component_types",
          },
          {
            title: "HooksとEventの型定義",
            href: "/docs/react/typescript_react/hooks_event_types",
          },
          {
            title: "TypeScriptで計算機アプリを作ろう",
            href: "/docs/react/typescript_react/calculator_app",
          },
        ],
      },
    ],
  },
  {
    title: "TypeScript",
    slug: "typescript",
    links: [
      {
        title: "はじめに",
        href: "/docs/typescript/introduction",
        children: [
          {
            title: "TypeScriptとは？JavaScriptとの違いを理解しよう",
            href: "/docs/typescript/introduction/what_is_typescript",
          },
        ],
      },
      {
        title: "TypeScript開発環境の構築",
        href: "/docs/typescript/development_environment",
        children: [
          {
            title: "Node.jsをインストールしよう",
            href: "/docs/typescript/development_environment/nodejs_installation",
          },
          {
            title: "TypeScriptをインストールして設定しよう",
            href: "/docs/typescript/development_environment/typescript_setup",
          },
          {
            title: "VS CodeでTypeScript開発環境を整えよう",
            href: "/docs/typescript/development_environment/vscode_typescript_setup",
          },
        ],
      },
      {
        title: "型注釈と基本的な型",
        href: "/docs/typescript/type_annotations",
        children: [
          {
            title: "変数に型をつけてみよう",
            href: "/docs/typescript/type_annotations/variable_types",
          },
          {
            title: "プリミティブ型を使いこなそう",
            href: "/docs/typescript/type_annotations/primitive_types",
          },
          {
            title: "配列とタプルの型定義",
            href: "/docs/typescript/type_annotations/array_tuple_types",
          },
          {
            title: "オブジェクトの型定義",
            href: "/docs/typescript/type_annotations/object_types",
          },
        ],
      },
      {
        title: "関数の型定義",
        href: "/docs/typescript/function_types",
        children: [
          {
            title: "関数に型をつけてみよう",
            href: "/docs/typescript/function_types/basic_function_types",
          },
          {
            title: "関数型とコールバック関数",
            href: "/docs/typescript/function_types/function_type_callback",
          },
          {
            title: "async/awaitとエラーハンドリング",
            href: "/docs/typescript/function_types/async_await_error_handling",
          },
        ],
      },
      {
        title: "インターフェースと型エイリアス",
        href: "/docs/typescript/interface_type_alias",
        children: [
          {
            title: "インターフェースでオブジェクトの形を定義しよう",
            href: "/docs/typescript/interface_type_alias/interface_definition",
          },
          {
            title: "型エイリアスとUnion型",
            href: "/docs/typescript/interface_type_alias/type_alias_union",
          },
        ],
      },
      {
        title: "ジェネリクスの基礎",
        href: "/docs/typescript/generics",
        children: [
          {
            title: "ジェネリクスで再利用可能な型を作ろう",
            href: "/docs/typescript/generics/reusable_generic_types",
          },
          {
            title: "ジェネリクスを使ってみよう",
            href: "/docs/typescript/generics/using_generics",
          },
        ],
      },
      {
        title: "実践的なTypeScript開発",
        href: "/docs/typescript/practical_development",
        children: [
          {
            title: "型安全なAPI通信を実装しよう",
            href: "/docs/typescript/practical_development/type_safe_api_communication",
          },
          {
            title: "モジュールの型定義と設定",
            href: "/docs/typescript/practical_development/module_type_definition",
          },
        ],
      },
    ],
  },
  {
    title: "Python",
    slug: "python",
    links: [
      {
        title: "はじめに",
        href: "/docs/python/introduction",
        children: [
          {
            title: "Pythonとは？基本的な特徴を理解しよう",
            href: "/docs/python/introduction/what_is_python",
          },
        ],
      },
      {
        title: "Python開発環境の構築",
        href: "/docs/python/development_environment",
        children: [
          {
            title: "Pythonをインストールしよう",
            href: "/docs/python/development_environment/python_installation",
          },
          {
            title: "ターミナル（コマンドプロンプト）の基本操作を学ぼう",
            href: "/docs/python/development_environment/terminal_basics",
          },
          {
            title: "VS CodeでPython開発環境を整えよう",
            href: "/docs/python/development_environment/vscode_setup",
          },
          {
            title: "最初のPythonプログラムを実行してみよう",
            href: "/docs/python/development_environment/first_program",
          },
        ],
      },
      {
        title: "Pythonの基本文法",
        href: "/docs/python/basic_syntax",
        children: [
          {
            title: "コメントの書き方を学ぼう",
            href: "/docs/python/basic_syntax/comments",
          },
          {
            title: "変数を使ってデータを保存しよう",
            href: "/docs/python/basic_syntax/variables",
          },
          {
            title: "数値の基本操作を学ぼう",
            href: "/docs/python/basic_syntax/numbers",
          },
          {
            title: "文字列の基本操作を学ぼう",
            href: "/docs/python/basic_syntax/strings",
          },
          {
            title: "真偽値の基本を理解しよう",
            href: "/docs/python/basic_syntax/boolean",
          },
          {
            title: "ユーザーからの入力を受け取ろう",
            href: "/docs/python/basic_syntax/user_input",
          },
          {
            title: "小さなプログラムを作ってみよう",
            href: "/docs/python/basic_syntax/small_programs",
          },
        ],
      },
      {
        title: "データ型とコレクション",
        href: "/docs/python/data_types_collections",
        children: [
          {
            title: "リストの基本操作を学ぼう",
            href: "/docs/python/data_types_collections/list_basics",
          },
          {
            title: "リストの要素を変更しよう",
            href: "/docs/python/data_types_collections/list_modification",
          },
          {
            title: "リストを使った簡単なプログラムを作ろう",
            href: "/docs/python/data_types_collections/list_programs",
          },
          {
            title: "辞書の基本操作を学ぼう",
            href: "/docs/python/data_types_collections/dictionary_basics",
          },
          {
            title: "辞書を使った情報管理をしてみよう",
            href: "/docs/python/data_types_collections/dictionary_management",
          },
          {
            title: "タプルとセットの基本を学ぼう",
            href: "/docs/python/data_types_collections/tuple_set_basics",
          },
        ],
      },
      {
        title: "制御構造",
        href: "/docs/python/control_structures",
        children: [
          {
            title: "if文で条件分岐を作ろう",
            href: "/docs/python/control_structures/if_statement",
          },
          {
            title: "if-else文で2つの選択肢を作ろう",
            href: "/docs/python/control_structures/if_else_statement",
          },
          {
            title: "if-elif-else文で複数の選択肢を作ろう",
            href: "/docs/python/control_structures/if_elif_else_statement",
          },
          {
            title: "論理演算子で複雑な条件を作ろう",
            href: "/docs/python/control_structures/logical_operators",
          },
          {
            title: "for文で繰り返し処理を学ぼう",
            href: "/docs/python/control_structures/for_loop",
          },
          {
            title: "for文でリストの要素を処理しよう",
            href: "/docs/python/control_structures/for_loop_lists",
          },
          {
            title: "while文で条件付き繰り返しを学ぼう",
            href: "/docs/python/control_structures/while_loop",
          },
          {
            title: "ループの制御とネストを学ぼう",
            href: "/docs/python/control_structures/loop_control_nesting",
          },
        ],
      },
      {
        title: "関数の基礎",
        href: "/docs/python/function_basics",
        children: [
          {
            title: "関数の基本概念を理解しよう",
            href: "/docs/python/function_basics/function_concepts",
          },
          {
            title: "最初の関数を定義してみよう",
            href: "/docs/python/function_basics/first_function",
          },
          {
            title: "引数を受け取る関数を作ろう",
            href: "/docs/python/function_basics/function_arguments",
          },
          {
            title: "戻り値を返す関数を作ろう",
            href: "/docs/python/function_basics/return_values",
          },
          {
            title: "複数の引数と便利な機能を学ぼう",
            href: "/docs/python/function_basics/advanced_arguments",
          },
          {
            title: "関数を使ったプログラムを作ろう",
            href: "/docs/python/function_basics/function_programs",
          },
        ],
      },
      {
        title: "エラー処理と例外",
        href: "/docs/python/error_handling",
        children: [
          {
            title: "よくあるエラーの種類を知ろう",
            href: "/docs/python/error_handling/common_errors",
          },
          {
            title: "インデックスエラーとキーエラーを理解しよう",
            href: "/docs/python/error_handling/index_key_errors",
          },
          {
            title: "try-except文の基本を学ぼう",
            href: "/docs/python/error_handling/try_except_basics",
          },
          {
            title: "エラー処理を活用したプログラムを作ろう",
            href: "/docs/python/error_handling/error_handling_programs",
          },
        ],
      },
      {
        title: "ファイル操作の基礎",
        href: "/docs/python/file_operations",
        children: [
          {
            title: "テキストファイルを読み込んでみよう",
            href: "/docs/python/file_operations/read_text_files",
          },
          {
            title: "テキストファイルに書き込んでみよう",
            href: "/docs/python/file_operations/write_text_files",
          },
          {
            title: "CSVファイルを扱ってみよう",
            href: "/docs/python/file_operations/csv_files",
          },
          {
            title: "ファイルを使ったデータ管理プログラムを作ろう",
            href: "/docs/python/file_operations/data_management_programs",
          },
        ],
      },
      {
        title: "モジュールとライブラリ",
        href: "/docs/python/modules_libraries",
        children: [
          {
            title: "モジュールの基本概念を理解しよう",
            href: "/docs/python/modules_libraries/module_concepts",
          },
          {
            title: "数学計算のモジュールを使ってみよう",
            href: "/docs/python/modules_libraries/math_module",
          },
          {
            title: "乱数を使ったプログラムを作ろう",
            href: "/docs/python/modules_libraries/random_programs",
          },
          {
            title: "日付と時間を扱ってみよう",
            href: "/docs/python/modules_libraries/datetime_module",
          },
          {
            title: "自分でモジュールを作ってみよう",
            href: "/docs/python/modules_libraries/custom_modules",
          },
        ],
      },
      {
        title: "クラスとオブジェクト指向の基礎",
        href: "/docs/python/object_oriented_basics",
        children: [
          {
            title: "オブジェクト指向の基本概念を理解しよう",
            href: "/docs/python/object_oriented_basics/oop_concepts",
          },
          {
            title: "最初のクラスを定義してみよう",
            href: "/docs/python/object_oriented_basics/first_class",
          },
          {
            title: "クラスに属性とメソッドを追加しよう",
            href: "/docs/python/object_oriented_basics/attributes_methods",
          },
        ],
      },
      {
        title: "インターネット通信の基礎",
        href: "/docs/python/internet_communication",
        children: [
          {
            title: "インターネット通信の基本を理解しよう",
            href: "/docs/python/internet_communication/communication_basics",
          },
          {
            title: "初めてのWebリクエストを送ってみよう",
            href: "/docs/python/internet_communication/first_web_request",
          },
          {
            title: "JSONデータの基本を理解しよう",
            href: "/docs/python/internet_communication/json_basics",
          },
          {
            title: "WebAPIを使ってデータを取得しよう",
            href: "/docs/python/internet_communication/web_api_usage",
          },
        ],
      },
    ],
  },
]
