---
description: Analyze test coverage and generate missing tests to reach 80%+ threshold.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
argument-hint: [path/to/analyze]
---

# Test Coverage

Analyze test coverage and generate missing tests:

The 80% global requirement is enforced by `coverageThreshold` in
`jest.config.js`. Treat that configuration as the source of truth rather than
duplicating a different threshold here.

1. Run tests with coverage: `npm run test:coverage`

2. Analyze coverage report (coverage/coverage-summary.json)

3. Identify files below 80% coverage threshold

4. For each under-covered file:
   - Analyze untested code paths
   - Generate unit tests for functions
   - Generate integration tests for APIs
   - Generate E2E tests for critical flows

5. Verify new tests pass

6. Show before/after coverage metrics

7. Ensure project reaches 80%+ overall coverage

Focus on:
- Happy path scenarios
- Error handling
- Edge cases (null, undefined, empty)
- Boundary conditions
