---
description: Enforce a test-first workflow for the Next.js site and verify the repository coverage gate.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
argument-hint: <feature-or-function-to-implement>
---

# TDD Command

This command invokes the `tdd-guide` agent at
`.claude/agents/tdd-guide.md` to guide a test-driven implementation.

## What This Command Does

1. Understand the requested behavior and define the smallest useful interface.
2. Write a failing test that describes the behavior (RED).
3. Implement only enough code to make the test pass (GREEN).
4. Refactor while keeping the tests green (REFACTOR).
5. Run the repository's checks and coverage gate.

The coverage requirement is the value enforced by `coverageThreshold` in
`jest.config.js`. That file is the single source of truth; it currently requires
80% globally for branches, functions, lines, and statements.

## When to Use

Use `/tdd` when:

- adding a course-data helper or UI behavior;
- fixing a bug that can be reproduced in a test;
- refactoring a component or utility while preserving its public behavior; or
- changing a route, metadata function, or shared component.

## TDD Cycle

```
RED → GREEN → REFACTOR → REPEAT

RED:      Write a test for the next behavior and confirm it fails for the right reason.
GREEN:    Make the smallest implementation change that passes the test.
REFACTOR: Improve names and structure without changing behavior.
REPEAT:   Add the next boundary or error case.
```

## Example Usage

```text
User: /tdd Discordメンバー数表示の丸め処理に境界値を追加して

Agent (tdd-guide):
1. `formatMemberCount` と既存テストを確認する。
2. 0、1桁、10の位の切り捨てをテストする。
3. `src/components/discord-member-count.tsx` の最小変更を実装する。
4. 関連テスト、`npm run check:all`、`npm run test:coverage` を実行する。
```

### Step 1: Confirm the smallest interface

```typescript
// src/components/discord-member-count.tsx
export function formatMemberCount(count: number): string {
  // The implementation is changed only after the behavior is specified.
  return String(count)
}
```

### Step 2: Write tests first (RED)

Add the behavior to the existing
`src/components/__tests__/discord-member-count.test.tsx`:

```typescript
import { formatMemberCount } from "../discord-member-count"

it.each([
  [0, ""],
  [5, "0+"],
  [1234, "1,230+"],
])("formats %i members as %s", (count, expected) => {
  expect(formatMemberCount(count)).toBe(expected)
})
```

Run the focused test and confirm any new case fails for the expected reason:

```bash
npx jest src/components/__tests__/discord-member-count.test.tsx --runInBand
```

### Step 3: Implement the smallest change (GREEN)

```typescript
export function formatMemberCount(count: number): string {
  if (count === 0) return ""

  const roundedCount = Math.floor(count / 10) * 10
  return roundedCount.toLocaleString("ja-JP") + "+"
}
```

Run the focused test again, then add the next behavior only when the current
test is green.

### Step 4: Verify the repository

```bash
npm run test:coverage
npm run check:all
npm run build
```

## Test Practices

**Do:**

- test user-visible behavior and public functions;
- use the canonical data in `src/data/` and typed dictionaries in `src/i18n/`;
- cover empty input, boundaries, and error paths;
- prefer fakes and small fixtures over broad mocks; and
- keep tests beside the code they exercise, except for repository-level tests
  under `src/__tests__/`.

**Don't:**

- write implementation before the behavior test;
- assert private component state or incidental markup;
- introduce dependencies that are not in `package.json`; or
- lower a check or coverage threshold to make a test pass.

## Integration with Other Commands

- Use `/tdd` for implementation with tests.
- Use `/code-review` to inspect a completed change.
- Use `/test-coverage` to inspect the coverage report.

The related agent definition is `.claude/agents/tdd-guide.md`.
