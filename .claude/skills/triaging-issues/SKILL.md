---
name: triaging-issues
description: >
  GitHub Issue にラベルを付け、本文を書くときの規約。`priority: P0`〜`P3` の判断基準、
  type ラベル（bug/enhancement/documentation/chore/security/ci）と `blocked: dependency`
  の意味、`.github/labels.yml` が宣言するだけで同期スクリプトを持たない事実、Issue 本文に
  書くべき完了条件・関連ファイル・依存関係、ISSUE_TEMPLATE の使い分けを定義する。
  Use when Issue を新規作成する, ラベルを付ける, 優先度を判断する, Issue 本文を書く,
  triaging or labeling a GitHub issue.
---

# Issue のトリアージ

**扱う:** ラベルの意味と付け方、`priority` の判断基準、Issue 本文に書くべき内容、
ISSUE_TEMPLATE の使い分け。
**扱わない:** Dependabot が開く PR 自体の中身の判断（`managing-dependencies`）；
`labels.yml` のようなラベル定義ファイル自体の変更手順や CI ゲートの話（`changing-gates`）。

## ラベルの意味

`.github/labels.yml` が全ラベルの説明を持つ。

### priority

- `priority: P0` — 最優先。他をブロックする／影響範囲が最大
- `priority: P1` — 高優先度
- `priority: P2` — 中優先度
- `priority: P3` — 低優先度

判断基準は2点: この Issue を解決しないと**他の Issue が着手できないか**（ブロックしているか）、
そして**影響範囲がどこまで広いか**。両方に強く該当するほど番号は小さくなる。単に「やりたい」
だけでは P0/P1 にはならない。

### type

- `bug` — Something isn't working
- `enhancement` — New feature or request
- `documentation` — Improvements or additions to documentation
- `chore` — Maintenance work with no user-facing behavior change
- `security` — Security-related issue or fix
- `ci` — Continuous integration related changes

### blocked: dependency

他の依存が着地するまで保留、を示す。着手できない／着手すべきでない Issue に付ける。

## `labels.yml` は宣言するだけで、自動反映しない

`.github/labels.yml` の冒頭コメントに明記されている通り、このファイルは「宣言的ソース」を
名乗るが、それを実際に GitHub へ反映する同期スクリプトはリポジトリに存在しない。ラベルを
追加・変更したら、以下を手動で叩いて GitHub 側に適用する:

```bash
gh label create <name> --color <hex> --description "<description>" --force
```

`labels.yml` を編集しただけでは GitHub 上のラベルは変わらない。

## Issue 本文に書くこと

- **観測可能な完了条件。** 「動くようになった」ではなく、何をもって完了とするか外から
  確認できる文で書く。実例として Issue #86 の「完了条件」節は「`git commit` 時にフォー
  マット崩れ・lint エラー・型エラーが混入したコミットを作れないこと」のように検証可能な
  形で書いている。
- **関連ファイルパス。** 変更が及ぶファイル・ディレクトリを具体的に書く。
- **依存する他の Issue があれば明記する。** このリポジトリに `Depends on: #N` のような
  決まった記法は無い。「#54 の後に着手」のように文章でわかりやすく明記すれば十分。

## ISSUE_TEMPLATE

`.github/ISSUE_TEMPLATE/` に3種類ある:

- `bug_report.md` — 再現手順・期待動作・環境を書くテンプレート。`labels: bug` が既定で付く。
- `feature_request.md` — 問題・解決案・代替案を書くテンプレート。`labels: enhancement` が
  既定で付く。
- `config.yml` — `blank_issues_enabled: false` によりテンプレート無しの Issue 作成を禁止
  し、セキュリティ脆弱性は Issue ではなく GitHub の private vulnerability reporting へ誘導
  する。
