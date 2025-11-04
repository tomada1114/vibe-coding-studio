# Requirements Document

## Project Description (Input)
Udemy講座情報を一元管理し、動画タグに基づいて適切な講座（個別クーポンページまたはフィルタ付きURL）を自動選定するシステムを構築する。`video-metadata-creator` スキルのパフォーマンスを最適化し、講座情報の更新を効率化する。

## Introduction

本機能は、Vibe Coding StudioのUdemy講座情報を一元管理し、YouTube動画メタデータとの連携を最適化するシステムです。

### システムの目的
- **Udemy講座情報の一元管理**：重複排除と更新作業の効率化
- **自動講座選定**：動画タグから適切な講座またはフィルタURLを自動選定
- **スキルの高速化**：`video-metadata-creator` スキルのトークン使用量削減と実行速度向上

### ビジネス価値
- **情報の一元化**：講座情報を1ファイルで管理、更新作業を90%削減
- **トークン使用量の削減**：Udemy講座参照部分で約10,000トークン削減
- **保守性向上**：講座情報の変更が全動画に即座に反映

### 現状の課題
現在、Udemy講座情報が各動画ファイルに分散しており、講座情報の更新時に複数ファイルを編集する必要があります。また、`video-metadata-creator` スキルが全講座情報を毎回読み込むため、トークン消費が大きくなっています。

## Requirements

### Requirement 1: Udemy講座情報の一元管理
**Objective:** コンテンツ管理者として、Udemy講座情報を一箇所で管理し、適切な講座（個別クーポンページまたはフィルタ付きURL）を自動選定できるようにしたい。これにより、情報の重複を排除し、更新作業を効率化したい。

#### Acceptance Criteria

1. WHEN システムがUdemy講座情報を管理する THEN 講座管理システムは `src/data/shared/udemy-courses.ts` に全講座情報を集約する SHALL
2. WHEN 講座情報を定義する THEN 講座管理システムは 以下の2つのリンクパターンをサポートする SHALL：個別の講座クーポンページ、フィルタ付きURL（特定トピック：ClaudeCode、Codex、Next.jsなど）
3. WHEN 動画のタグから講座を選定する THEN 講座管理システムは `selectUdemyCourse()` 関数を使用して適切な講座またはフィルタを自動選定する SHALL
4. IF 動画タグが特定の講座に強く関連する THEN 講座管理システムは その講座のクーポンページを返す SHALL
5. IF 動画タグが特定トピック（ClaudeCode、Codex、Next.jsなど）に関連する THEN 講座管理システムは そのトピックでフィルタされたURLを返す SHALL
6. IF 上記の条件に該当しない THEN 講座管理システムは null（講座リンクなし）を返す SHALL
7. WHEN 講座情報を更新する THEN 講座管理システムは 1つのファイルを編集するだけで全動画に反映される SHALL

### Requirement 2: 動画インデックスへのUdemy講座参照追加
**Objective:** システムとして、動画インデックスにUdemy講座参照情報を含め、インデックスベースで講座情報にアクセスできるようにしたい。

#### Acceptance Criteria

1. WHEN 動画インデックスを生成する THEN インデックスシステムは 各動画のUdemy講座参照情報を抽出する SHALL
2. WHEN インデックスエントリを作成する THEN インデックスシステムは `udemyCourseRef` フィールドを含む SHALL（オプション）
3. WHEN Udemy講座参照を定義する THEN インデックスシステムは 講座クーポンページまたはフィルタ付きURLの識別子を含む SHALL
4. WHEN インデックスからUdemy講座を取得する THEN インデックスシステムは `udemyCourseRef` を使用して `udemy-courses.ts` から講座情報を解決する SHALL

### Requirement 3: スキルのパフォーマンス最適化
**Objective:** スキル利用者として、`video-metadata-creator` スキルが高速に実行され、トークン消費が最小限になるようにしたい。

#### Acceptance Criteria

1. WHEN `video-metadata-creator` スキルが実行される THEN スキルは Udemy講座情報をインデックスから取得し、個別の動画ファイルは必要な場合のみ読み込む SHALL
2. WHEN スキルがUdemy講座を選定する THEN スキルは `selectUdemyCourse()` 関数を使用して講座を自動選定する SHALL
3. WHEN スキルが実行される THEN スキルは Udemy講座参照部分のトークン使用量が約500トークン以下である SHALL（講座情報ファイルのみ読み込み）
4. WHEN スキルが実行される THEN スキルは ファイル読み込み回数がUdemy関連で最大2回以内である SHALL（講座情報ファイル + インデックス）
5. WHEN スキルドキュメントを更新する THEN スキルは `SKILL.md` にインデックスベースのUdemy講座選定方法を記載する SHALL

### Requirement 4: データ型とインターフェース
**Objective:** システムとして、型安全性を確保し、明確なデータ構造を定義したい。

#### Acceptance Criteria

1. WHEN Udemy講座を定義する THEN 講座管理システムは `UdemyCourse` インターフェースを使用する SHALL
2. WHEN 講座選定関数を定義する THEN 講座管理システムは `selectUdemyCourse(tags: string[]): UdemyCourse | null` のシグネチャを使用する SHALL
3. WHEN TypeScriptの厳格モードでコンパイルする THEN すべてのUdemy講座関連コードは 型エラーなくコンパイルされる SHALL
4. WHEN Udemy講座を定義する THEN 講座管理システムは 以下のフィールドを含む SHALL：id、title、url、topics（関連トピック/タグ）

### Requirement 5: テストとドキュメント
**Objective:** 開発チームとして、システムの品質を保証し、適切なドキュメントを提供したい。

#### Acceptance Criteria

1. WHEN Udemy講座選定をテストする THEN テストシステムは 各条件で正しい講座が選定されることを検証する SHALL
2. WHEN 講座選定ロジックをテストする THEN テストシステムは 以下のケースをカバーする SHALL：特定講座への直接マッチ、トピックベースのフィルタ、マッチなし（null返却）
3. WHEN ドキュメントを更新する THEN ドキュメント管理システムは `CLAUDE.md` に新しいワークフローを追記する SHALL
4. WHEN スキルドキュメントを更新する THEN ドキュメント管理システムは スキルの `SKILL.md` にUdemy講座選定の使用方法を記載する SHALL
5. WHEN テストカバレッジを測定する THEN テストシステムは コアロジックのカバレッジが80%以上である SHALL

### Requirement 6: CI/CD検証
**Objective:** 開発者として、Udemy講座情報とインデックスが常に同期された状態を保ちたい。

#### Acceptance Criteria

1. WHEN プルリクエストが作成される THEN CI/CDパイプラインは Udemy講座情報とインデックスの同期を検証する SHALL
2. IF 講座情報とインデックスに差分がある THEN CI/CDパイプラインは 警告を表示してビルドを失敗させる SHALL
3. WHEN CI/CD検証を実行する THEN CI/CDパイプラインは `.github/workflows/validate-udemy-courses.yml` ワークフローを使用する SHALL
4. WHEN Udemy講座ファイルが変更される THEN Git pre-commitフックは 自動的にインデックスを更新する SHALL

### Requirement 7: Git Hooks設定（Husky + lint-staged）
**Objective:** 開発者として、Udemy講座ファイルの変更時に自動的にインデックスが更新されるようにしたい。

#### Acceptance Criteria

1. WHEN Huskyをセットアップする THEN Git hooksシステムは `.husky/pre-commit` スクリプトを作成する SHALL
2. WHEN lint-stagedを設定する THEN Git hooksシステムは `src/data/shared/udemy-courses.ts` ファイルに対してインデックス更新を実行する SHALL
3. WHEN Udemy講座ファイルを変更してコミットする THEN Git hooksシステムは 自動的に `npm run update-video-index` を実行する SHALL
4. WHEN インデックスが更新される THEN Git hooksシステムは 更新されたインデックスファイルを自動的にステージングに追加する SHALL
