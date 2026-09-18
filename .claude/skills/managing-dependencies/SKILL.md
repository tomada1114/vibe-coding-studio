---
name: managing-dependencies
description: >
  npm 依存関係の追加・更新・削除で残すべき判断（用途・代替・メンテナンス状況・ライセンス）、
  SemVer 範囲指定と固定バージョンの使い分け、`.npmrc` と Dependabot のクールダウン設定、
  `dependency-review.yml` のライセンス/脆弱性ゲート、Dependabot PR を検証する手順を定義する。
  Use when パッケージを追加する, パッケージを更新・削除する, package.json を編集する,
  Dependabot の PR をレビューする, ライセンスや脆弱性ゲートで PR が落ちた原因を調べる.
---

# 依存関係の管理

**扱う:** 新しい依存を追加するときの判断記録、SemVer 範囲 vs 固定バージョン、
`.npmrc`/Dependabot のクールダウンの意図、`dependency-review.yml` のゲート、
Dependabot PR を取り込む前の検証手順。
**扱わない:** `.github/dependabot.yml` や `dependency-review.yml` というゲート設定
ファイル自体の値を変えること（`changing-gates`）; Dependabot PR をどう起票・トリアージ・
クローズするかという issue/PR 運用そのもの（`triaging-issues`）。

## 新しい runtime 依存を追加するとき

このリポジトリに依存追加専用のテンプレートやチェックリストファイルは無い。判断の記録は
**PR の説明文に書く**のが現実的な着地になる。最低限、次を書く:

- 何のために要るか（解決する具体的な問題）
- 自前実装や既存依存（`clsx` / `lucide-react` など）で代替できないか検討したか
- メンテナンス状況（最終リリース時期、Issue の滞留具合）
- ライセンス（後述の deny-licenses に触れないか）

`package.json` の `dependencies` と `devDependencies` の区分は、実行時に必要かビルド/
テスト時のみ必要かで決める。ランタイムに不要なものを `dependencies` に入れない。

## SemVer 範囲 vs 固定バージョン

`package.json` の既存依存は基本的に `^` によるキャレット範囲（`"next": "15.5.9"` のような
Next.js 本体を除く）。新しく追加するときもこれに揃え、範囲指定を外して固定バージョンに
するのは、破壊的変更が頻発する・patch でも壊れた実績があるなど明確な理由があるときに
限る。固定した場合は理由を PR に書く。

## クールダウン: `.npmrc` と Dependabot は同じ 7 日を二重に持つ

`.npmrc` の `min-release-age=7` は、公開から 7 日経っていないバージョンの npm パッケージを
インストールしない設定。`npm install` を手で叩いたときにこの制約が効く。

`.github/dependabot.yml` の各 update ブロックにある `cooldown.default-days: 7` は同じ 7 日を
Dependabot の PR 生成にも適用する設定で、`.npmrc` の値と**意図的に同じ値で二重化**して
ある。人間が `npm install` するときに拒否される新しいバージョンが、Dependabot の自動 PR
としてなら素通りする、という抜け道を防ぐのが目的。どちらかの日数だけを変えると、この
一致が崩れる。

## Dependabot の設定

`.github/dependabot.yml` は `npm`（ルート）と `github-actions` の 2 エコシステムを対象に、
週次でスキャンする。

- commit prefix は npm 側が `deps:`、github-actions 側が `ci:`。
- `open-pull-requests-limit: 10`。
- `groups` で minor/patch は 1 つの PR にまとめる（`npm-minor-and-patch` /
  `actions-minor-and-patch`）が、major はグルーピング対象から意図的に外してある。
  major は破壊的変更を伴いうるため、1 PR ずつ個別にレビューできるようにする狙い。

## `dependency-review.yml` のゲート

PR 契機で `actions/dependency-review-action` が走り、次の条件で PR を落とす。

- `fail-on-severity: moderate` — 中程度以上の既知脆弱性を持つ依存が入ると失敗する。
- `deny-licenses: AGPL-3.0, GPL-2.0, GPL-3.0, LGPL-2.1, LGPL-3.0, SSPL-1.0` —
  許可リストではなく**拒否リスト**方式。未設定の寛容なライセンスで誤って PR を止めない
  ため、コピーレフト系だけを名指しで拒否している。

新しい依存を追加してこのゲートに引っかかったら、依存自体を見直す。ゲートの閾値や
リストそのものを変えたいときは `changing-gates` を読む。

## `package-lock.json` は手で編集しない

`package-lock.json` は `npm install` / `npm ci` の生成物。バージョンを直接書き換えたり、
差分だけを手で調整したりしない。依存を変えたら `npm install` を実行してロックファイルを
再生成させ、その差分ごとコミットする。

## 依存変更を検証する手順

1. `npm ci` — ロックファイル通りにクリーンインストールできるか確認する。
2. `npm run check:all` — lint → format:check → type-check → test を通す。

どちらかが失敗したら、依存追加/更新自体が原因かどうかを切り分けてから対処する。
