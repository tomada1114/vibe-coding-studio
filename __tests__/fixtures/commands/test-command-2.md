---
description: Create or update PR title and description for a given PR number
allowed-tools: Read, Bash
argument-hint: <pr-number>
---

# PR Description Generator

Automatically generate or update pull request title and description based on the commits and changes in the PR.

**PR Number**: $ARGUMENTS

## Task: Generate PR Description

This command analyzes the commits in a pull request and generates a comprehensive description.

### Steps

1. Fetch PR information using `gh pr view $ARGUMENTS`
2. Analyze commits with `gh pr view $ARGUMENTS --json commits`
3. Generate summary of changes
4. Update PR description with `gh pr edit $ARGUMENTS --body "..."`
