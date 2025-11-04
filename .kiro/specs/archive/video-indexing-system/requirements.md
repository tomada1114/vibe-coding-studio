# Requirements Document

## Project Description (Input)
YouTube動画メタデータのインデックスベースシステムを構築し、関連動画の高速検索とトークン使用量の削減を実現する。動画インデックスの生成・管理、関連動画の検索アルゴリズム、自動同期機能を含む。

## Introduction

本機能は、Vibe Coding StudioのYouTube動画メタデータ管理システムのパフォーマンスとスケーラビリティを向上させるためのインデックスベースシステムです。

### インデックスの目的
新しい動画のメタデータを作成する際に、以下の情報を効率的に取得する：
- **関連動画の発見**：既存動画から関連性の高いものを自動検索
- **トークン削減**：全動画ファイルを読み込まず、軽量インデックスのみで判断

### ビジネス価値
- **トークン使用量の大幅削減**：約59,000トークン → 約2,500トークン（関連動画検索部分）
- **実行速度の80%短縮**：5-10秒 → 1-2秒
- **スケーラビリティ確保**：動画が100本になってもコストは同じ
- **保守性向上**：インデックスの自動更新による手動作業削減

### 現状の課題
現在、29動画（156KB、約2,953行）を毎回全て読み込む必要があり、大きなトークン消費と実行速度の低下を招いています。動画数が増加するにつれて、この問題は線形的に悪化します。

## Requirements

### Requirement 1: 動画インデックスの生成と管理
**Objective:** システム管理者として、全動画の軽量メタデータを一元管理できるインデックスを生成・維持したい。これにより、トークン使用量を削減し、実行速度を向上させたい。

#### Acceptance Criteria

1. WHEN システムが動画インデックスを生成する THEN インデックスシステムは `src/data/videos/video-index.ts` にTypeScript形式のインデックスファイルを作成する SHALL
2. WHEN インデックスを生成する THEN インデックスシステムは 各動画から以下の情報を抽出する SHALL：動画ID、タイトル、タグ、関連動画ID
3. WHEN インデックス生成が完了する THEN インデックスシステムは 生成されたファイルサイズが約10KB以下である SHALL
4. WHEN 開発者が `npm run update-video-index` コマンドを実行する THEN インデックスシステムは 全動画ファイルを解析して最新のインデックスを生成する SHALL
5. WHEN 複数回インデックス生成を実行する THEN インデックスシステムは 同じ入力に対して常に同じ結果を生成する SHALL（冪等性）
6. IF 動画ファイルに変更が加えられる THEN Git pre-commitフックは 自動的にインデックスを更新してステージングに追加する SHALL

### Requirement 2: 関連動画の高速検索
**Objective:** システムとして、インデックスを活用して関連動画を効率的に検索し、実行時間を80%短縮したい。

#### Acceptance Criteria

1. WHEN システムが関連動画を検索する THEN 関連動画検索システムは `src/lib/videos/related-video-finder.ts` のタグベーススコアリングアルゴリズムを使用する SHALL
2. WHEN 関連動画をスコアリングする THEN 関連動画検索システムは タグの共通性に基づいてスコアを計算する SHALL
3. WHEN 関連動画を検索する THEN 関連動画検索システムは インデックスから検索を行い、個別の動画ファイルは読み込まない SHALL
4. WHEN インデックスをロードする THEN 関連動画検索システムは Map/Set構造を使用してO(1)アクセスを実現する SHALL
5. WHEN 関連動画検索を実行する THEN 関連動画検索システムは 検索の計算量がO(n)以下である SHALL（現状のO(n×m)から改善）
6. WHEN 関連動画を返す THEN 関連動画検索システムは スコアの高い順にソートされたリストを返す SHALL

### Requirement 3: 自動同期とCI/CD検証
**Objective:** 開発者として、インデックスと実データが常に同期された状態を保ち、手動更新忘れを防ぎたい。

#### Acceptance Criteria

1. WHEN 動画ファイルが変更されてコミットされる THEN Git pre-commitフックは 自動的にインデックス更新スクリプトを実行する SHALL
2. WHEN インデックスが更新される THEN Git pre-commitフックは 更新されたインデックスファイルを自動的にgit addする SHALL
3. WHEN プルリクエストが作成される THEN CI/CDパイプラインは インデックスと実データの同期を検証する SHALL
4. IF インデックスと実データに差分がある THEN CI/CDパイプラインは 警告を表示してビルドを失敗させる SHALL
5. WHEN CI/CD検証を実行する THEN CI/CDパイプラインは `.github/workflows/validate-video-index.yml` ワークフローを使用する SHALL
6. WHEN pre-commitフックが実行される THEN pre-commitフックは 実行時間が2秒以内である SHALL

### Requirement 4: データ型とインターフェース
**Objective:** システムとして、型安全性を確保し、明確なデータ構造を定義したい。

#### Acceptance Criteria

1. WHEN 動画インデックスエントリを定義する THEN インデックスシステムは `VideoIndexEntry` インターフェースを使用する SHALL
2. WHEN TypeScriptの厳格モードでコンパイルする THEN すべてのインデックス関連コードは 型エラーなくコンパイルされる SHALL
3. WHEN インデックスエントリを作成する THEN インデックスシステムは すべての必須フィールドを含む SHALL：id、title、tags
4. WHEN インデックスエントリを作成する THEN インデックスシステムは 以下のオプションフィールドを含む SHALL：relatedVideoIds

### Requirement 5: テストとドキュメント
**Objective:** 開発チームとして、システムの品質を保証し、適切なドキュメントを提供したい。

#### Acceptance Criteria

1. WHEN インデックス生成スクリプトをテストする THEN テストシステムは スクリプトが正しいインデックスを生成することを検証する SHALL
2. WHEN 関連動画検索をテストする THEN テストシステムは スコアリングアルゴリズムの正確性を検証する SHALL
3. WHEN インデックスと実データの整合性をテストする THEN テストシステムは 動画数の一致と必須フィールドの存在を検証する SHALL
4. WHEN ドキュメントを更新する THEN ドキュメント管理システムは `CLAUDE.md` に新しいワークフローを追記する SHALL
5. WHEN 動画追加手順を更新する THEN ドキュメント管理システムは インデックス自動更新の仕組みを説明する SHALL
6. WHEN テストカバレッジを測定する THEN テストシステムは コアロジックのカバレッジが80%以上である SHALL

### Requirement 6: Git Hooks設定（Husky + lint-staged）
**Objective:** 開発者として、動画ファイルの変更時に自動的にインデックスが更新されるようにしたい。

#### Acceptance Criteria

1. WHEN Huskyをセットアップする THEN Git hooksシステムは `.husky/pre-commit` スクリプトを作成する SHALL
2. WHEN lint-stagedを設定する THEN Git hooksシステムは `src/data/videos/*.ts` パターンのファイルに対してインデックス更新を実行する SHALL
3. WHEN 動画ファイルを変更してコミットする THEN Git hooksシステムは 自動的に `npm run update-video-index` を実行する SHALL
4. WHEN インデックスが更新される THEN Git hooksシステムは 更新されたインデックスファイルを自動的にステージングに追加する SHALL
5. WHEN pre-commitフックが失敗する THEN Git hooksシステムは コミットを中断してエラーメッセージを表示する SHALL
