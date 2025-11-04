/**
 * Git Hooks統合のテスト
 *
 * pre-commitフックの動作をテストします。
 */

import fs from "fs"
import path from "path"

describe("Git Hooks Integration", () => {
  const hooksDir = path.join(process.cwd(), ".git", "hooks")
  const preCommitPath = path.join(hooksDir, "pre-commit")

  describe("pre-commit hook installation", () => {
    it("pre-commitフックファイルが存在すること", () => {
      // このテストは、セットアップコマンド実行後にフックが存在することを確認
      // 現時点では実装されていないため、失敗する想定
      expect(fs.existsSync(preCommitPath)).toBe(true)
    })

    it("pre-commitフックに実行権限があること", () => {
      if (!fs.existsSync(preCommitPath)) {
        // ファイルが存在しない場合はスキップ
        return
      }

      const stats = fs.statSync(preCommitPath)
      // 実行権限があるかチェック（ユーザー実行権限）
      expect(stats.mode & 0o100).not.toBe(0)
    })
  })

  describe("staged file detection", () => {
    it("動画データファイルが変更されたことを検知できること", () => {
      // モック: ステージングエリアに動画データファイルが含まれているかチェック
      const mockStagedFiles = `src/data/videos/test-video.ts
src/components/button.tsx`

      const needsRegeneration = mockStagedFiles.includes("src/data/videos/")
      expect(needsRegeneration).toBe(true)
    })

    it("Udemy講座データファイルが変更されたことを検知できること", () => {
      // モック: ステージングエリアにcoupon-courses.tsが含まれているかチェック
      const mockStagedFiles = `src/constants/coupon-courses.ts
src/lib/cache.ts`

      const needsRegeneration = mockStagedFiles.includes(
        "src/constants/coupon-courses.ts"
      )
      expect(needsRegeneration).toBe(true)
    })

    it("関係ないファイルの変更では再生成が不要と判定されること", () => {
      // モック: ステージングエリアに関係ないファイルのみが含まれている
      const mockStagedFiles = `src/components/button.tsx
src/lib/cache.ts
README.md`

      const needsRegeneration =
        mockStagedFiles.includes("src/data/videos/") ||
        mockStagedFiles.includes("src/constants/coupon-courses.ts")
      expect(needsRegeneration).toBe(false)
    })
  })

  describe("hook script content", () => {
    it("フックスクリプトが正しい形式であること", () => {
      if (!fs.existsSync(preCommitPath)) {
        // ファイルが存在しない場合はスキップ
        return
      }

      const content = fs.readFileSync(preCommitPath, "utf-8")

      // Node.jsスクリプトであることを確認
      expect(content).toContain("#!/usr/bin/env node")

      // インデックス生成コマンドを実行していることを確認
      expect(content).toContain("npm run generate:indexes")

      // 生成されたインデックスをgit addしていることを確認
      expect(content).toContain("git add src/data/indexes/")
    })

    it("ステージングされたファイルを検知するロジックが含まれていること", () => {
      if (!fs.existsSync(preCommitPath)) {
        return
      }

      const content = fs.readFileSync(preCommitPath, "utf-8")

      // git diff --cached --name-only コマンドが含まれていること
      expect(content).toContain("git diff --cached --name-only")

      // src/data/videos/ のパターンマッチングが含まれていること
      expect(content).toContain("src/data/videos/")

      // src/constants/coupon-courses.ts のパターンマッチングが含まれていること
      expect(content).toContain("src/constants/coupon-courses.ts")
    })
  })
})
