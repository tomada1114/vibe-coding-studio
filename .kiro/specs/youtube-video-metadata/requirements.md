# Requirements Document

## Introduction

YouTube動画メタデータ表示システムは、YouTube動画のタイトル、概要欄などのメタデータをローカルにTypeScriptファイルとして構造化して管理し、一覧・詳細ページで閲覧可能にするシステムです。

本システムは、以下のビジネス価値を提供します：

- **データの一元管理**: 動画情報をGitで管理し、履歴管理・変更追跡を可能にする
- **一貫性の保証**: 共通データ（SNS、Discordなど）を外部化し、全動画で統一する
- **品質保証**: TypeScriptの型システムにより、必須項目の漏れやデータ構造の誤りを防ぐ
- **検索・参照の容易化**: 構造化されたデータにより、過去の動画情報を簡単に検索・参照する

データの作成・編集はすべてGitベースでファイルを直接管理するため、管理画面は実装しません。

## Requirements

### Requirement 1: 動画メタデータの型定義と構造化

**Objective:** As a コンテンツ作成者, I want YouTube動画のメタデータを型安全に管理できる, so that データの一貫性と品質を保証できる

#### Acceptance Criteria

1. WHEN システムの初期セットアップを行う THEN システム SHALL 動画メタデータの型定義ファイルを提供する
2. WHERE 型定義ファイル THE システム SHALL 以下の必須項目を含む型を定義する：title（string）、publishedAt（ISO 8601形式）、videoUrl（YouTube URL）、opening（配列）、learningPoints（配列）、timestamps（配列）、tags（配列）
3. WHERE 型定義ファイル THE システム SHALL 以下のオプション項目を含む型を定義する：relatedVideos（配列）、udemyCourses（オブジェクト）、customSections（配列）
4. WHERE 配列要素 THE システム SHALL opening.lines（string[]）、learningPoints.items（string[]）、timestamps.items（配列）を配列型として定義する
5. IF 動画データファイルを作成または編集する THEN システム SHALL TypeScript型チェック（tsc --noEmit）で型エラーを検出する
6. WHEN 必須項目が欠落している THEN TypeScriptコンパイラー SHALL エラーメッセージを表示する
7. WHEN 型の不一致が発生している THEN TypeScriptコンパイラー SHALL エラーメッセージを表示する

### Requirement 2: 共通データの外部化と再利用

**Objective:** As a コンテンツ作成者, I want 全動画で共通のデータを一元管理できる, so that 一貫性を保ちながら更新作業を効率化できる

#### Acceptance Criteria

1. WHERE 共通データファイル THE システム SHALL SNSアカウント情報（X、note、Qiita、Zenn）を配列として定義する
2. WHERE 共通データファイル THE システム SHALL Discordコミュニティ情報（title、description、url、isFree）を定義する
3. WHERE 共通データファイル THE システム SHALL エンゲージメント促進文言（title、message、callToAction）を定義する
4. WHEN 動画データファイルを作成する THEN システム SHALL 共通データをimportして参照できるようにする
5. IF 共通データを更新する THEN システム SHALL すべての動画データに自動的に反映する

### Requirement 3: 動画データのファイル管理

**Objective:** As a コンテンツ作成者, I want 1動画につき1つのTypeScriptファイルで管理できる, so that データの追加・編集が簡単にできる

#### Acceptance Criteria

1. WHERE 動画データ THE システム SHALL 1動画 = 1 TypeScriptファイルの原則に従う
2. WHEN 新しい動画データを追加する THEN ユーザー SHALL 新しいTypeScriptファイルを作成するだけで済む
3. WHERE 動画データファイル THE システム SHALL 型定義に準拠したデータ構造を持つ
4. WHERE ファイル構成 THE システム SHALL 動画データファイル、共通データファイル、型定義ファイルを適切に分離する
5. IF 動画データファイルを編集する THEN システム SHALL Gitで変更履歴を追跡できるようにする

### Requirement 4: データ品質の自動検証

**Objective:** As a コンテンツ作成者, I want データの品質を自動的にチェックできる, so that 必須項目の漏れやフォーマットエラーを早期に発見できる

#### Acceptance Criteria

1. WHEN npm run type-check を実行する THEN システム SHALL すべての動画データファイルの型エラーを検出する
2. WHEN npm test を実行する THEN システム SHALL 全動画データに対して共通のバリデーションロジックを実行する
3. WHERE テストスイート THE システム SHALL 各動画データに対して以下を検証する：必須項目の存在、配列が空でないこと、URL形式の妥当性、日付形式の妥当性（ISO 8601）、タイムスタンプ形式（"00:00"）の妥当性
4. IF 動画データに必須項目が欠落している THEN テスト SHALL 失敗する
5. IF タイムスタンプの形式が不正である THEN テスト SHALL エラーを報告する
6. IF YouTube URLの形式が不正である THEN テスト SHALL エラーを報告する
7. WHEN CI/CDパイプラインを実行する THEN システム SHALL 型チェックとテストを自動実行する
8. IF 型チェックまたはテストが失敗する THEN CI/CD SHALL マージをブロックする

### Requirement 5: 動画一覧ページの表示

**Objective:** As a 視聴者, I want すべての動画を一覧で確認できる, so that 興味のある動画を見つけられる

#### Acceptance Criteria

1. WHEN 一覧ページにアクセスする THEN システム SHALL すべての動画のタイトルと公開日を表示する
2. WHERE 一覧ページ THE システム SHALL 公開日順（新しい順）でソートして表示する
3. WHEN 動画タイトルをクリックする THEN システム SHALL 該当動画の詳細ページに遷移する
4. WHERE 一覧ページ THE システム SHALL 各動画への詳細ページリンクを提供する
5. IF 動画データが存在しない THEN システム SHALL 空の状態を適切に表示する

### Requirement 6: 動画詳細ページの表示

**Objective:** As a 視聴者, I want 動画の詳細情報を整形されたフォーマットで閲覧できる, so that 動画の内容を理解し、関連情報にアクセスできる

#### Acceptance Criteria

1. WHEN 詳細ページにアクセスする THEN システム SHALL 動画タイトル、公開日、YouTube埋め込みプレーヤーを表示する
2. WHERE 詳細ページ THE システム SHALL 冒頭セクションを整形して表示する
3. WHERE 詳細ページ THE システム SHALL 学べる内容セクションを箇条書きで表示する
4. WHERE 詳細ページ THE システム SHALL タイムスタンプセクションを時間とラベルのリストで表示する
5. WHERE 詳細ページ THE システム SHALL タグをリスト表示する
6. WHERE 詳細ページ THE システム SHALL セクション間に視覚的な区切りを提供する
7. WHERE 詳細ページ THE システム SHALL すべてのURLをクリック可能なリンクとして表示する
8. IF 関連動画セクションが存在する THEN システム SHALL 関連動画のタイトルとリンクを表示する
9. IF Udemy講座セクションが存在する THEN システム SHALL 講座情報とCTAを表示する
10. WHERE 詳細ページ THE システム SHALL SNSアカウント情報（共通データ）を表示する
11. IF Discordコミュニティ情報が存在する THEN システム SHALL コミュニティ情報（共通データ）を表示する
12. WHERE 詳細ページ THE システム SHALL エンゲージメント促進セクション（共通データ）を表示する
13. IF カスタムセクションが存在する THEN システム SHALL カスタムセクションを適切に整形して表示する

### Requirement 7: カスタムセクションの柔軟性

**Objective:** As a コンテンツ作成者, I want 動画ごとに任意のセクションを追加できる, so that 動画固有の情報を柔軟に表現できる

#### Acceptance Criteria

1. WHERE 型定義 THE システム SHALL カスタムセクションを追加できる仕組みを提供する
2. WHERE カスタムセクション THE システム SHALL テキスト、リスト、リンク、混合型に対応する
3. WHEN カスタムセクションを追加する THEN ユーザー SHALL 既存の型定義の範囲内で自由にセクションを定義できる
4. WHERE 詳細ページ THE システム SHALL カスタムセクションを適切に整形して表示する
5. IF カスタムセクションに箇条書きリストが含まれる THEN システム SHALL リストを適切にフォーマットする
6. IF カスタムセクションにコードブロックやリンクが含まれる THEN システム SHALL それらを適切に表示する

### Requirement 8: 概要欄の構造パターンの遵守

**Objective:** As a コンテンツ作成者, I want 概要欄の構造を統一できる, so that 視聴者に一貫した情報提供ができる

#### Acceptance Criteria

1. WHERE 型定義 THE システム SHALL 以下の順序でセクションを定義する：冒頭、学べる内容、カスタムセクション、関連動画、Udemy講座、SNS・コミュニティ、Discord、タイムスタンプ、エンゲージメント促進
2. WHERE 詳細ページ THE システム SHALL 型定義で定義された順序でセクションを表示する
3. WHERE 学べる内容セクション THE システム SHALL タイトル（絵文字 + テキスト）と箇条書き項目（✅で始まる）を表示する
4. WHERE タイムスタンプセクション THE システム SHALL 時間（"00:00"形式）とラベルのリストを表示する
5. WHERE セクション間 THE システム SHALL 区切り線（━━━━━━━━━━━━━━━━）を挿入する

### Requirement 9: TypeScriptファイルのインポートとビルド時の静的データ取り込み

**Objective:** As a システム, I want データをビルド時に静的に取り込める, so that 実行時にファイルシステムアクセスが不要になる

#### Acceptance Criteria

1. WHEN システムをビルドする THEN システム SHALL TypeScriptファイルから動画データをimportする
2. WHEN システムをビルドする THEN システム SHALL 共通データもimportする
3. WHERE ビルドプロセス THE システム SHALL すべてのデータを静的にバンドルに含める
4. IF データファイルに型エラーがある THEN ビルド SHALL 失敗する
5. WHERE Next.js THE システム SHALL ビルド時にすべての動画データを読み込み、静的ページを生成する

### Requirement 10: 拡張性と保守性の確保

**Objective:** As a 開発者, I want システムを簡単に拡張・保守できる, so that 将来的な機能追加や変更に対応できる

#### Acceptance Criteria

1. WHERE 型定義 THE システム SHALL 新しいセクションタイプを追加しやすい構造を持つ
2. WHEN 共通データを更新する THEN システム SHALL 全動画に自動的に反映する
3. WHEN 新しい動画データを追加する THEN ユーザー SHALL 1ファイルを作成するだけで済む
4. WHERE コード THE システム SHALL TypeScriptの厳密な型チェックに準拠する
5. WHERE ドキュメント THE システム SHALL 型定義にコメントで各項目の意味を説明する
6. IF 新しい動画データを追加する THEN 既存のテストロジック SHALL 新しいデータも自動的に検証する
