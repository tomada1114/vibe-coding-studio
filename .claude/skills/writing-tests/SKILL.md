---
name: writing-tests
description: >
  このリポジトリでテストを書くときの規約。テストファイルの置き場所（コロケーション対
  ルート直下のメタテスト）、インターフェース越しのアサーション、期待値をコードの外か
  ら持ってくる原則、フェイク優先・モック最後の手段、エラーの assert 方法、`it.each` に
  よる境界値の掃き方、Geist Grid の grep 型規約テストの書き方を定義する。
  Use when 新しいテストを書く, テストファイルの置き場所に迷う, モックとフェイクの
  選択に迷う, Geist Grid の規約テストを書く, ウォッチ実行の方法を確認する,
  writing or reviewing a test file.
---

# テストの書き方

**扱う:** テストファイルの配置、インターフェース越しのアサーション、期待値の導出方法、
フェイク/モックの使い分け、エラーの assert 方法、`it.each` の使いどころ、Geist Grid
規約テストの型。
**扱わない:** `jest.config.js` のカバレッジ閾値やテスト実行そのもののゲート設定
（`changing-gates`）; デザイントークンやコンポーネント規則の中身（`geist-grid-design`）。

## 置き場所

コロケーション: `src/<zone>/__tests__/*.test.ts(x)` に実装と併置する。

ルート直下の `__tests__/` は**リポジトリ自体**を検証するメタテスト専用で、機能テストを
ここに置かない。実例が `__tests__/no-console.test.ts` で、`src/` 全体を走査して
`console.log` 等の呼び出しが残っていないかと、ESLint の `no-console` ルールが通ることを
機械的に検査している。新しいメタ規約（ファイル配置・命名規則など）を追加したくなったら
この形を真似て `__tests__/` 直下に置く。

## インターフェース越しにテストする

公開された振る舞い（コンポーネントが描画する DOM、関数の入出力、公開 API）を検証し、
実装の内部詳細（プライベート関数の呼び出し回数、内部 state の形）には依存しない。
実装を書き換えてもインターフェースが変わらなければテストは落ちない、という状態を保つ。

## 期待値はコードの外から持ってくる

AGENTS.md の開発ワークフローにある原則「テストは解を検証するものであって定義する
ものではない」をテスト設計にそのまま適用する。実装が出した値をそのままテストケースへ
貼り付けて期待値にする（ハードコード）のは解決ではない。期待値は仕様・辞書データ・
定数・計算式など、実装コードとは独立した情報源から導く。

## フェイクを優先し、モックは最後の手段

依存を差し替えるときは、挙動を保ったまま軽量化したフェイクを優先する。`jest.mock` に
よるモックは、フェイクを作れない外部境界（`next/navigation` の `usePathname` など）に
限って最後の手段として使う。`jest.setup.js` の `next/image` / `framer-motion` /
`react-use-measure` のグローバルモックは、テスト環境で描画できない Next.js/アニメー
ション API を吸収するためのもので、これに倣って安易に対象を増やさない。

## エラーはクラス・種別で assert する

エラーを検証するときはメッセージ文字列の一致ではなく、エラーのクラスや種別で assert
する。メッセージ文言はリファクタで変わりやすく、文字列一致は壊れやすいテストになる。

## `it.each` で境界値を掃く

同じ検証ロジックを複数の入力に対して繰り返すときは `it.each` でテーブル化し、境界値
（空文字・0・上限値など）を漏れなく列挙する。同内容の `it` を複数個コピーしない。

## `it.skip` を残さない

`it.skip` はコミット前に解消する。一時的に無効化した場合でも、原因を直してテストを
戻すか、不要になったなら削除する。

## 実行

| コマンド | 用途 |
|---|---|
| `npm run test` | 全テストを1回実行 |
| `npm run test:coverage` | カバレッジ付きで実行 |
| `npx jest --watch <path>` | ウォッチ実行。`test:watch` という npm script は無い |

## Jest の設定

`jest.config.js` が単一の情報源。テストを書くうえで踏まえる点:

- `testEnvironment: "jest-environment-jsdom"` が既定（DOM API がそのまま使える）。
- `moduleNameMapper` で `^@/(.*)$` を `<rootDir>/src/$1` に解決する。テスト内の import も
  `@/` エイリアスをそのまま使ってよい。
- `setupFilesAfterEnv` に `jest.setup.js` が指定されており、`@testing-library/jest-dom`
  のカスタムマッチャに加え、`next/image` / `framer-motion` / `react-use-measure` が
  グローバルにモックされた状態でテストが走る。個々のテストファイルで再モックする必要
  はない。

## Geist Grid の規約テスト

`src/components/geist/__tests__/footer.test.tsx` や
`src/app/community/__tests__/page.test.tsx` にある「Geist Grid の規則」テストは、実装の
振る舞いではなく**書き方そのもの**を機械的に検査する grep 型のテストである。共通パターン:

```ts
const { container } = render(<Component />)
const classNames = Array.from(container.querySelectorAll("*"))
  .map(el => el.getAttribute("class") ?? "")
  .join(" ")

expect(classNames).not.toMatch(/\b(?:bg|text|border)-gray-\d/)
expect(classNames).not.toMatch(/dark:(?:bg|text|border)-/)
expect(classNames).not.toMatch(/\[#[0-9a-fA-F]{3,8}\]/)
```

`community/page.test.tsx` はさらに `.gg-glow` や `.gg-rule-accent` の出現回数を上限つきで
数える「派手さ予算」のテストも持つ。新しいページを Geist Grid で作るときは、この型の
テストをそのまま真似て併置すればよい。個々のトークンや上限値の根拠は `geist-grid-design`
skill を参照する。
