# Requirements Document

## Project Description (Input)
udemy講座とYoutube動画のインデックス。詳しくはtodo.mdを参照。

## Introduction

本機能は、Vibe Coding StudioのYouTube動画メタデータ管理システムのパフォーマンスとスケーラビリティを向上させるためのインデックスベースシステムです。

### インデックスの目的
新しい動画のメタデータを作成する際に、以下の情報を効率的に取得する：
- **関連動画の発見**：既存動画から関連性の高いものを自動検索
- **Udemy講座の選定**：適切な講座クーポンページまたはフィルタ付きURLを自動選定
- **トークン削減**：全動画ファイルを読み込まず、軽量インデックスのみで判断

### ビジネス価値
- **トークン使用量の96%削減**：59,000トークン → 2,500トークン
- **実行速度の80%短縮**：5-10秒 → 1-2秒
- **スケーラビリティ確保**：動画が100本になってもコストは同じ
- **保守性向上**：Udemy講座情報の一元管理

### 現状の課題
現在、29動画（156KB、約2,953行）を毎回全て読み込む必要があり、大きなトークン消費と実行速度の低下を招いています。動画数が増加するにつれて、この問題は線形的に悪化します。

## Requirements

### Requirement 1: 動画インデックスの生成と管理
**Objective:** システム管理者として、全動画の軽量メタデータを一元管理できるインデックスを生成・維持したい。これにより、トークン使用量を削減し、実行速度を向上させたい。

#### Acceptance Criteria

1. WHEN システムが動画インデックスを生成する THEN インデックスシステムは `src/data/videos/video-index.ts` にTypeScript形式のインデックスファイルを作成する SHALL
2. WHEN インデックスを生成する THEN インデックスシステムは 各動画から以下の情報を抽出する SHALL：動画ID、タイトル、タグ、関連動画ID、Udemy講座参照情報
3. WHEN インデックス生成が完了する THEN インデックスシステムは 生成されたファイルサイズが約10KB以下である SHALL
4. WHEN 開発者が `npm run update-video-index` コマンドを実行する THEN インデックスシステムは 全動画ファイルを解析して最新のインデックスを生成する SHALL
5. WHEN 複数回インデックス生成を実行する THEN インデックスシステムは 同じ入力に対して常に同じ結果を生成する SHALL（冪等性）
6. IF 動画ファイルに変更が加えられる THEN Git pre-commitフックは 自動的にインデックスを更新してステージングに追加する SHALL

### Requirement 2: Udemy講座情報の一元管理
**Objective:** コンテンツ管理者として、Udemy講座情報を一箇所で管理し、適切な講座（個別クーポンページまたはフィルタ付きURL）を自動選定できるようにしたい。これにより、情報の重複を排除し、更新作業を効率化したい。

#### Acceptance Criteria

1. WHEN システムがUdemy講座情報を管理する THEN 講座管理システムは `src/data/shared/udemy-courses.ts` に全講座情報を集約する SHALL
2. WHEN 講座情報を定義する THEN 講座管理システムは 以下の2つのリンクパターンをサポートする SHALL：個別の講座クーポンページ、フィルタ付きURL（特定トピック：ClaudeCode、Codex、Next.jsなど）
3. WHEN 動画のタグから講座を選定する THEN 講座管理システムは `selectUdemyCourse()` 関数を使用して適切な講座またはフィルタを自動選定する SHALL
4. IF 動画タグが特定の講座に強く関連する THEN 講座管理システムは その講座のクーポンページを返す SHALL
5. IF 動画タグが特定トピック（ClaudeCode、Codex、Next.jsなど）に関連する THEN 講座管理システムは そのトピックでフィルタされたURLを返す SHALL
6. IF 上記の条件に該当しない THEN 講座管理システムは null（講座リンクなし）を返す SHALL
7. WHEN 講座情報を更新する THEN 講座管理システムは 1つのファイルを編集するだけで全動画に反映される SHALL

### Requirement 3: 関連動画の高速検索
**Objective:** システムとして、インデックスを活用して関連動画を効率的に検索し、実行時間を80%短縮したい。

#### Acceptance Criteria

1. WHEN システムが関連動画を検索する THEN 関連動画検索システムは `src/lib/videos/related-video-finder.ts` のタグベーススコアリングアルゴリズムを使用する SHALL
2. WHEN 関連動画をスコアリングする THEN 関連動画検索システムは タグの共通性に基づいてスコアを計算する SHALL
3. WHEN 関連動画を検索する THEN 関連動画検索システムは インデックスから検索を行い、個別の動画ファイルは読み込まない SHALL
4. WHEN インデックスをロードする THEN 関連動画検索システムは Map/Set構造を使用してO(1)アクセスを実現する SHALL
5. WHEN 関連動画検索を実行する THEN 関連動画検索システムは 検索の計算量がO(n)以下である SHALL（現状のO(n×m)から改善）
6. WHEN 関連動画を返す THEN 関連動画検索システムは スコアの高い順にソートされたリストを返す SHALL

### Requirement 4: 自動同期とCI/CD検証
**Objective:** 開発者として、インデックスと実データが常に同期された状態を保ち、手動更新忘れを防ぎたい。

#### Acceptance Criteria

1. WHEN 動画ファイルが変更されてコミットされる THEN Git pre-commitフックは 自動的にインデックス更新スクリプトを実行する SHALL
2. WHEN インデックスが更新される THEN Git pre-commitフックは 更新されたインデックスファイルを自動的にgit addする SHALL
3. WHEN プルリクエストが作成される THEN CI/CDパイプラインは インデックスと実データの同期を検証する SHALL
4. IF インデックスと実データに差分がある THEN CI/CDパイプラインは 警告を表示してビルドを失敗させる SHALL
5. WHEN CI/CD検証を実行する THEN CI/CDパイプラインは `.github/workflows/validate-video-index.yml` ワークフローを使用する SHALL
6. WHEN pre-commitフックが実行される THEN pre-commitフックは 実行時間が2秒以内である SHALL

### Requirement 5: スキルのパフォーマンス最適化
**Objective:** スキル利用者として、`video-metadata-creator` スキルが高速に実行され、トークン消費が最小限になるようにしたい。

#### Acceptance Criteria

1. WHEN `video-metadata-creator` スキルが実行される THEN スキルは インデックスファイルのみを読み込み、個別の動画ファイルは必要な場合のみ読み込む SHALL
2. WHEN スキルが関連動画を検索する THEN スキルは `findRelatedVideos()` 関数を使用してインデックスベースの検索を行う SHALL
3. WHEN スキルがUdemy講座を選定する THEN スキルは `selectUdemyCourse()` 関数を使用して講座を自動選定する SHALL
4. WHEN スキルが実行される THEN スキルは トークン使用量が約2,500トークン以下である SHALL（現状の59,000トークンから96%削減）
5. WHEN スキルが実行される THEN スキルは 実行時間が1-2秒以内である SHALL（現状の5-10秒から80%短縮）
6. WHEN スキルが実行される THEN スキルは ファイル読み込み回数が最大3回以内である SHALL（インデックス1回 + 必要な動画ファイル最大2回）

### Requirement 6: データ型とインターフェース
**Objective:** システムとして、型安全性を確保し、明確なデータ構造を定義したい。

#### Acceptance Criteria

1. WHEN 動画インデックスエントリを定義する THEN インデックスシステムは `VideoIndexEntry` インターフェースを使用する SHALL
2. WHEN Udemy講座を定義する THEN 講座管理システムは `UdemyCourse` インターフェースを使用する SHALL
3. WHEN TypeScriptの厳格モードでコンパイルする THEN すべてのインデックス関連コードは 型エラーなくコンパイルされる SHALL
4. WHEN インデックスエントリを作成する THEN インデックスシステムは すべての必須フィールドを含む SHALL：id、title、tags
5. WHEN インデックスエントリを作成する THEN インデックスシステムは 以下のオプションフィールドを含む SHALL：relatedVideoIds、udemyCourseRef
6. WHEN Udemy講座参照を定義する THEN インデックスシステムは 講座クーポンページまたはフィルタ付きURLの識別子を含む SHALL

### Requirement 7: テストとドキュメント
**Objective:** 開発チームとして、システムの品質を保証し、適切なドキュメントを提供したい。

#### Acceptance Criteria

1. WHEN インデックス生成スクリプトをテストする THEN テストシステムは スクリプトが正しいインデックスを生成することを検証する SHALL
2. WHEN 関連動画検索をテストする THEN テストシステムは スコアリングアルゴリズムの正確性を検証する SHALL
3. WHEN Udemy講座選定をテストする THEN テストシステムは 各条件で正しい講座が選定されることを検証する SHALL
4. WHEN インデックスと実データの整合性をテストする THEN テストシステムは 動画数の一致と必須フィールドの存在を検証する SHALL
5. WHEN ドキュメントを更新する THEN ドキュメント管理システムは `CLAUDE.md` に新しいワークフローを追記する SHALL
6. WHEN スキルドキュメントを更新する THEN ドキュメント管理システムは スキルの `SKILL.md` にインデックスベースの使用方法を記載する SHALL
7. WHEN 動画追加手順を更新する THEN ドキュメント管理システムは インデックス自動更新の仕組みを説明する SHALL
8. WHEN テストカバレッジを測定する THEN テストシステムは コアロジックのカバレッジが80%以上である SHALL
