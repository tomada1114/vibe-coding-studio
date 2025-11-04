# Requirements Document

## Introduction

YouTube動画メタデータのインデックスシステムを構築し、新しい動画の概要欄作成を効率化します。このシステムは、既存の29本の動画データ（`src/data/videos/`）と14講座のUdemy講座データ（`src/constants/coupon-courses.ts`）を解析し、タグベースの関連動画検索とUdemy講座の自動選定を実現します。

`.claude/skills/video-metadata-creator` スキルの補助ツールとして機能し、新しい動画作成時に関連動画とUdemy講座を効率的に提案することで、クリエイターの概要欄作成時間を大幅に短縮します。

このシステムは、Claude Codeプロジェクトの既存の型安全性、TDD開発プロセス、ファイル構造の規約に準拠し、将来的な拡張性を考慮した設計とします。

## Requirements

### Requirement 1: 動画メタデータインデックスの生成と管理

**Objective:** 開発者として、既存の29本の動画データを解析し、効率的な検索を可能にする動画インデックスを自動生成したい。そうすることで、新しい動画作成時に関連動画を高速に検索できる。

#### Acceptance Criteria

1. WHEN プロジェクト内に`src/data/videos/`ディレクトリが存在し、少なくとも1つの動画データファイル（`VideoMetadata`型）が存在する THEN インデックス生成システム SHALL すべての動画データファイルを自動的に検出する
2. WHEN インデックス生成コマンドが実行される THEN インデックス生成システム SHALL 各動画の以下のメタデータを抽出する:
   - 動画ID（`id`）
   - タイトル（`title`）
   - タグ（`tags`配列）
   - 関連動画（`relatedVideos`オプション）
   - Udemy講座情報（`udemyCourses`オプション）
3. WHEN インデックスデータが生成される THEN インデックス生成システム SHALL JSON形式でインデックスファイルを`src/data/indexes/video-index.json`に出力する
4. WHEN インデックスファイルが生成される THEN インデックス生成システム SHALL 生成日時（ISO 8601形式）をメタデータに含める
5. WHEN 動画データファイルが追加、更新、削除される THEN インデックス生成システム SHALL Git Hooksを通じて自動的にインデックスを再生成する
6. WHEN インデックスファイルが存在する THEN TypeScript型定義ファイル（`src/types/video-index.ts`） SHALL インデックスデータ構造の型安全性を保証する

### Requirement 2: タグベース関連動画検索アルゴリズム

**Objective:** 動画メタデータクリエイタースキルのユーザーとして、新しい動画のタグリストを指定したときに、関連性の高い既存動画を自動的に提案してほしい。そうすることで、手動で関連動画を探す時間を削減できる。

#### Acceptance Criteria

1. WHEN ユーザーが新しい動画のタグリスト（文字列配列）を入力する THEN 関連動画検索システム SHALL 入力タグとインデックス内の各動画タグの一致度を計算する
2. WHEN タグマッチング計算を実行する THEN 関連動画検索システム SHALL 以下の重み付けスコアリングアルゴリズムを使用する:
   - 完全一致タグ: 10ポイント/タグ
   - 部分一致タグ（大文字小文字を無視）: 5ポイント/タグ
   - タグ数の類似性ボーナス: タグ数が±2以内の場合+2ポイント
3. WHEN スコアリングが完了する THEN 関連動画検索システム SHALL スコアの降順で動画をソートし、上位3-5本を関連動画として返す
4. WHEN 同一スコアの動画が複数存在する THEN 関連動画検索システム SHALL 動画IDの辞書順（アルファベット順）でソートする
5. WHEN 関連動画が0本の場合（すべての動画のスコアが0） THEN 関連動画検索システム SHALL 動画データから任意の5本を代替として返す
6. WHEN 検索対象の動画データが自分自身（同じ動画ID）を含む THEN 関連動画検索システム SHALL その動画を検索結果から除外する

### Requirement 3: Udemy講座インデックスと一元管理

**Objective:** システム管理者として、既存の14講座のUdemy講座データ（`COURSE_INFO`）を一元的に管理し、動画メタデータ作成時に効率的に参照できるようにしたい。そうすることで、講座情報の一貫性とメンテナンス性を向上させる。

#### Acceptance Criteria

1. WHEN プロジェクト内に`src/constants/coupon-courses.ts`が存在する THEN Udemy講座インデックスシステム SHALL すべての講座データ（`COURSE_INFO`）を読み取る
2. WHEN 講座インデックスが生成される THEN Udemy講座インデックスシステム SHALL 各講座の以下の情報を抽出する:
   - 講座ID（`COURSE_INFO`のキー）
   - タイトル（`title`）
   - トピック（`topics`配列）
   - プロモーションURL（`promotionUrl`）
   - 説明（`description`）
3. WHEN 講座インデックスデータが生成される THEN Udemy講座インデックスシステム SHALL JSON形式でインデックスファイルを`src/data/indexes/udemy-course-index.json`に出力する
4. WHEN トピックフィルタリングが必要な場合 THEN Udemy講座インデックスシステム SHALL トピック別の講座URLマッピング（例: `claude-code` → `/coupons?topic=claude-code`）を提供する
5. WHEN 講座データが更新される THEN Udemy講座インデックスシステム SHALL Git Hooksを通じて自動的にインデックスを再生成する
6. WHEN 講座インデックスファイルが存在する THEN TypeScript型定義ファイル（`src/types/udemy-course-index.ts`） SHALL インデックスデータ構造の型安全性を保証する

### Requirement 4: タグベースUdemy講座自動選定

**Objective:** 動画メタデータクリエイタースキルのユーザーとして、新しい動画のタグリストに基づいて最適なUdemy講座を自動的に提案してほしい。そうすることで、動画内容に関連する講座をすばやく見つけて概要欄に追加できる。

#### Acceptance Criteria

1. WHEN ユーザーが新しい動画のタグリスト（文字列配列）を入力する THEN Udemy講座選定システム SHALL 入力タグと各講座のトピック（`topics`）の一致度を計算する
2. WHEN タグマッチング計算を実行する THEN Udemy講座選定システム SHALL 以下のスコアリングロジックを使用する:
   - 完全一致トピック: 15ポイント/トピック
   - 部分一致トピック（大文字小文字を無視）: 7ポイント/トピック
   - トピック数の多さボーナス: トピック数×1ポイント
3. WHEN スコアリングが完了する THEN Udemy講座選定システム SHALL スコアの降順で講座をソートし、上位1-3講座を推奨講座として返す
4. WHEN 推奨講座が決定される THEN Udemy講座選定システム SHALL `UdemyCoursesSection`形式（`VideoMetadata`型に準拠）でデータを返す
5. WHEN 複数のトピックが一致する講座が存在する THEN Udemy講座選定システム SHALL `cta.url`に適切なフィルター付きURLを設定する（例: `https://www.vibecodingstudio.dev/coupons?topic=claude-code`）
6. WHEN 一致する講座が0件の場合 THEN Udemy講座選定システム SHALL デフォルトの汎用クーポンページURL（`https://www.vibecodingstudio.dev/coupons`）を返す
7. WHEN 推奨講座が1件のみの場合 THEN Udemy講座選定システム SHALL その講座に関連する学習内容リスト（`courses`配列）を講座データの`description`から生成する

### Requirement 5: Git Hooksによる自動インデックス同期

**Objective:** 開発者として、動画データやUdemy講座データを変更したときに、手動でインデックスを再生成することなく自動的に最新の状態を保ちたい。そうすることで、インデックスの不整合を防ぎ、常に正確な検索結果を得られる。

#### Acceptance Criteria

1. WHEN プロジェクトに`.git/hooks/`ディレクトリが存在する THEN Git Hooks自動同期システム SHALL `pre-commit`フックスクリプトをインストールする
2. WHEN `git commit`コマンドが実行される AND ステージングエリアに以下のファイルパターンのいずれかが含まれる:
   - `src/data/videos/*.ts`
   - `src/constants/coupon-courses.ts`
   THEN Git Hooks自動同期システム SHALL 動画インデックスとUdemy講座インデックスの再生成を実行する
3. WHEN インデックスが再生成される THEN Git Hooks自動同期システム SHALL 新しく生成されたインデックスファイルをステージングエリアに追加する
4. WHEN インデックス生成中にエラーが発生する THEN Git Hooks自動同期システム SHALL エラーメッセージをコンソールに表示し、コミットを中止する
5. WHEN Git Hooksのインストールが必要な場合 THEN Git Hooks自動同期システム SHALL `npm run setup-hooks`コマンドでフックスクリプトをインストール可能にする
6. WHEN 開発者がGit Hooksを無効化したい場合 THEN Git Hooks自動同期システム SHALL `--no-verify`フラグでフックをバイパス可能にする

### Requirement 6: インデックスデータローダーとユーティリティAPI

**Objective:** 動画メタデータクリエイタースキルの開発者として、生成されたインデックスデータを簡単に読み込み、検索機能を呼び出せるユーティリティAPIを提供してほしい。そうすることで、スキル内でのインデックスシステムの統合が容易になる。

#### Acceptance Criteria

1. WHEN インデックスファイルが存在する THEN インデックスデータローダー SHALL `src/lib/videos/video-index-loader.ts`に動画インデックス読み込み関数を提供する
2. WHEN インデックスファイルが存在する THEN インデックスデータローダー SHALL `src/lib/videos/udemy-course-index-loader.ts`にUdemy講座インデックス読み込み関数を提供する
3. WHEN 関連動画検索APIが呼び出される THEN インデックスシステム SHALL `findRelatedVideos(tags: string[]): RelatedVideo[]`関数を提供する
4. WHEN Udemy講座選定APIが呼び出される THEN インデックスシステム SHALL `suggestUdemyCourses(tags: string[]): UdemyCoursesSection`関数を提供する
5. WHEN インデックスファイルが見つからない OR 破損している THEN インデックスデータローダー SHALL 明確なエラーメッセージを返し、代替のフォールバックデータ（空配列またはデフォルト値）を提供する
6. WHEN すべてのユーティリティ関数が実装される THEN インデックスシステム SHALL TypeScript厳格モードでコンパイルエラーが発生しないことを保証する

### Requirement 7: テストカバレッジと品質保証

**Objective:** プロジェクトリーダーとして、インデックスシステムのすべてのコア機能が80%以上のテストカバレッジを達成し、エッジケースやエラーケースにも対応していることを確認したい。そうすることで、システムの信頼性と保守性を保証する。

#### Acceptance Criteria

1. WHEN インデックス生成ロジックが実装される THEN インデックスシステム SHALL `src/lib/videos/__tests__/video-index-generator.test.ts`に単体テストを含む
2. WHEN 関連動画検索アルゴリズムが実装される THEN インデックスシステム SHALL `src/lib/videos/__tests__/find-related-videos.test.ts`にスコアリングロジックのテストを含む
3. WHEN Udemy講座選定アルゴリズムが実装される THEN インデックスシステム SHALL `src/lib/videos/__tests__/suggest-udemy-courses.test.ts`にマッチングロジックのテストを含む
4. WHEN すべてのテストが実行される THEN インデックスシステム SHALL テストカバレッジが80%以上であることを保証する
5. WHEN テストが実行される THEN インデックスシステム SHALL 以下のエッジケースをカバーする:
   - 空のタグ配列
   - 一致する動画が0件のケース
   - 一致する講座が0件のケース
   - インデックスファイルが存在しない
   - インデックスファイルが破損している（不正なJSON）
6. WHEN テストが実行される THEN インデックスシステム SHALL Jest テストフレームワークを使用し、`npm test`コマンドで実行可能にする

### Requirement 8: ドキュメントと利用ガイド

**Objective:** 動画メタデータクリエイタースキルのユーザーとして、インデックスシステムの使い方、検索アルゴリズムの仕様、トラブルシューティング方法を明確に理解したい。そうすることで、システムを効率的に活用し、問題発生時に自己解決できる。

#### Acceptance Criteria

1. WHEN インデックスシステムが実装される THEN インデックスシステム SHALL `docs/VIDEO_METADATA_INDEXING.md`に利用ガイドを提供する
2. WHEN 利用ガイドが作成される THEN インデックスシステム SHALL 以下のセクションを含む:
   - システム概要
   - インデックス生成方法
   - 関連動画検索の使い方
   - Udemy講座選定の使い方
   - Git Hooksのセットアップ
   - トラブルシューティング
3. WHEN 関連動画検索アルゴリズムがドキュメント化される THEN インデックスシステム SHALL スコアリングロジックの詳細（重み付け、ボーナスポイントなど）を説明する
4. WHEN Udemy講座選定アルゴリズムがドキュメント化される THEN インデックスシステム SHALL トピックマッチングロジックの詳細とURL生成ルールを説明する
5. WHEN ドキュメントにコード例が含まれる THEN インデックスシステム SHALL 実際に動作する完全なTypeScriptコード例を提供する
6. WHEN ドキュメントが完成する THEN インデックスシステム SHALL 日本語で記述され、プロジェクト内の他のドキュメント（`CLAUDE.md`、`.kiro/steering/*.md`）と一貫したスタイルとする
