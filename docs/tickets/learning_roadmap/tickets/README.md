# Claude Code 学習ロードマップ - チケット一覧

## 概要

このディレクトリには、ロードマップ機能の実装チケットが含まれています。
**順列（シーケンシャル）** で1つずつ進めてください。

## 実装順序

| # | チケット | ファイル | 状態 |
|---|----------|----------|------|
| 01 | 型定義 | `01-type-definitions.md` | ⬜ |
| 02 | データ構造 | `02-data-structure.md` | ⬜ |
| 03 | RoadmapTabs | `03-roadmap-tabs.md` | ⬜ |
| 04 | RoadmapNode | `04-roadmap-node.md` | ⬜ |
| 05 | RoadmapEdge | `05-roadmap-edge.md` | ⬜ |
| 06 | RoadmapLegend | `06-roadmap-legend.md` | ⬜ |
| 07 | beginner.ts | `07-beginner-course-data.md` | ⬜ |
| 08 | web.ts | `08-web-course-data.md` | ⬜ |
| 09 | mobile.ts | `09-mobile-course-data.md` | ⬜ |
| 10 | python.ts | `10-python-course-data.md` | ⬜ |
| 11 | RoadmapBanner | `11-roadmap-banner.md` | ⬜ |
| 12 | RoadmapFlow | `12-roadmap-flow.md` | ⬜ |
| 13 | RoadmapPage | `13-roadmap-page.md` | ⬜ |
| 14 | ナビゲーション更新 | `14-navigation-update.md` | ⬜ |

## フェーズ概要

### Phase 1: Foundation（基盤）
- #01, #02: 型定義とデータ構造

### Phase 2: UI Components
- #03〜#06: UIコンポーネント
- #07〜#10: コースデータ
- #11: バナーコンポーネント

### Phase 3: Integration（統合）
- #12: フローチャート統合
- #13: ページ統合

### Phase 4: Navigation
- #14: ナビゲーション更新

## 各チケットの共通構成

1. **概要**: チケットの目的
2. **前提チケット**: 完了必須の依存チケット
3. **User Story**: ユーザー価値
4. **参照ファイル**: 実装時に参照すべきファイル
5. **実装内容**: 具体的な実装指示
6. **Functional Requirements**: EARS形式の要件
7. **完成の定義（Definition of Done）**:
   - 必須チェック
   - テスト（ユニットテスト）
   - UI確認（Chrome DevTools MCP）

## Chrome DevTools MCPの使い方

各チケットには、Chrome DevTools MCPを使ったUI確認手順が含まれています。

```bash
# 主要なMCPツール
mcp__chrome-devtools__navigate_page    # ページ遷移
mcp__chrome-devtools__take_snapshot    # DOMスナップショット
mcp__chrome-devtools__take_screenshot  # スクリーンショット
mcp__chrome-devtools__click            # 要素クリック
mcp__chrome-devtools__resize_page      # ウィンドウサイズ変更
mcp__chrome-devtools__hover            # ホバー
```

## 参照ドキュメント

- `../requirements.md` - 要件定義書
- `../design-concept.md` - デザインコンセプト
- `../prototype.html` - HTMLプロトタイプ

## 進捗更新

チケット完了時に、このファイルの状態を ⬜ → ✅ に更新してください。
