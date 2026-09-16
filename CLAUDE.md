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
  専用で、`.agents/` 側にはミラーしない。
- `.claude/settings.json` の `SessionStart` フックは `npm install` を走らせるだけ。
  ゲートではない（詳細は `AGENTS.md` の「強制の層」）。
- permissions は commit しない。個人の許可リストは `~/.claude/settings.json` か、
  gitignore 済みの `.claude/settings.local.json` に置く。

`AGENTS.md` の指示が必要な作業を止めるように見えたとき、答えは別の書き方を探すこと
ではなく、その迂回を必要にしたものを直すか、人に聞くこと。
