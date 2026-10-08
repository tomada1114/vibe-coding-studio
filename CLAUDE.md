# CLAUDE.md

このファイルは、このリポジトリで Claude Code (claude.ai/code) を使う際のエントリポイントです。
共通ルールは `AGENTS.md` に一元化されているため、詳細はそちらを参照してください。

@AGENTS.md

## Claude Code だけの補足

`AGENTS.md` はツール非依存の正典で、このファイルはそこに**上乗せする分だけ**を記録する。

- スキルの実体は `.claude/skills/`。`.agents/skills/` はそこへの相対シンボリックリンク
  で、Codex CLI 側の入口になる。片方だけを編集することはない — 新しいスキルを追加
  したら両方に手を入れる（手順は `authoring-skills` skill を参照）。
- `.claude/agents/` のサブエージェントと `.claude/commands/` のコマンドは Claude Code
  専用で、`.agents/` 側にはミラーしない。サブエージェントの使い分けは下の
  「サブエージェント」。
- `.claude/settings.json` の `SessionStart` フックは `npm install` を走らせるだけ。
  ゲートではない（詳細は `AGENTS.md` の「強制の層」）。
- permissions は commit しない。個人の許可リストは `~/.claude/settings.json` か、
  gitignore 済みの `.claude/settings.local.json` に置く。

## サブエージェント

委譲するときは名前（`subagent_type`）で指定する。素の `model` 指定ではセッションの
既定で走り、各定義が持つ設定が効かない。

| 名前 | 渡すもの |
|---|---|
| `executor` | 仕様が確定していて成否がはっきりした作業: 確定仕様どおりの実装、テスト追加、チェックを通す、一括置換・整形 |
| `architect` | 設計判断、レビュー・バグ発見、複数ファイルにまたがる実装、散在した調査結果の統合、仕様に穴が残る作業 |
| `scout` | ファイルを書き換えない、判断を含まない調査・収集・列挙 |
| `worker` | 完全なブリーフだけで済む、ツールを使わない単発の文章作成・点検。コード変更は渡さない |
| `tdd-guide` | テストファーストでの実装（`/tdd` から）。このリポジトリのテスト境界とカバレッジゲートを持つ |
| `doc-updater` | 外から見える変更に合わせた `README.md`・`docs/`・`.kiro/steering/` の更新 |
| `ui-ux-designer` | Geist Grid に沿った設計提案・デザインレビュー・テーマとコントラストの監査 |

上の 4 つ（`executor`・`architect`・`scout`・`worker`）の定義ファイルは
`syncing-agent-tiers` スキルが正本から生成し、モデルの見直しも自動 PR で届く。手で
編集しない。残りの 3 つはこのリポジトリ固有で、ここで管理する。

`AGENTS.md` の指示が必要な作業を止めるように見えたとき、答えは別の書き方を探すこと
ではなく、その迂回を必要にしたものを直すか、人に聞くこと。
