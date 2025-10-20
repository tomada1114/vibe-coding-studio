import { execSync } from "child_process"
import fs from "fs"
import path from "path"

describe("Console.log Detection", () => {
  const srcDir = path.join(process.cwd(), "src")

  // Files that are allowed to use console methods (like our logger)
  const allowedFiles = ["src/lib/logger.ts"]

  function findConsoleStatements(dir: string): string[] {
    const filesWithConsole: string[] = []

    function scanDirectory(directory: string) {
      const files = fs.readdirSync(directory)

      for (const file of files) {
        const filePath = path.join(directory, file)
        const stat = fs.statSync(filePath)

        if (
          stat.isDirectory() &&
          !file.startsWith(".") &&
          file !== "node_modules"
        ) {
          scanDirectory(filePath)
        } else if (
          stat.isFile() &&
          (file.endsWith(".ts") ||
            file.endsWith(".tsx") ||
            file.endsWith(".js") ||
            file.endsWith(".jsx"))
        ) {
          const relativePath = path.relative(process.cwd(), filePath)

          // Skip allowed files
          if (allowedFiles.includes(relativePath)) {
            continue
          }

          const content = fs.readFileSync(filePath, "utf-8")

          // Check for console.log, console.warn, console.error (but not in comments)
          const lines = content.split("\n")
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            // Skip comments
            if (line.trim().startsWith("//") || line.trim().startsWith("*")) {
              continue
            }

            // Look for console statements
            if (/console\.(log|warn|error|debug|info)/.test(line)) {
              // Check if the previous line has an eslint-disable comment
              const prevLine = i > 0 ? lines[i - 1] : ""
              if (
                prevLine.includes("eslint-disable-next-line") &&
                prevLine.includes("no-console")
              ) {
                continue
              }

              // Check if the console is inside a development check
              // Look for process.env.NODE_ENV === 'development' in surrounding lines
              let isDevelopmentOnly = false
              for (
                let j = Math.max(0, i - 10);
                j < Math.min(lines.length, i + 10);
                j++
              ) {
                if (
                  lines[j].includes("process.env.NODE_ENV === 'development'")
                ) {
                  isDevelopmentOnly = true
                  break
                }
              }

              if (!isDevelopmentOnly) {
                filesWithConsole.push(`${relativePath}:${i + 1}`)
              }
            }
          }
        }
      }
    }

    scanDirectory(dir)
    return filesWithConsole
  }

  it("should not contain console.log statements in source code", () => {
    const filesWithConsole = findConsoleStatements(srcDir)

    if (filesWithConsole.length > 0) {
      const message = `Found console statements in the following files:\n${filesWithConsole.join("\n")}`
      expect(filesWithConsole).toHaveLength(0)
      throw new Error(message)
    }

    expect(filesWithConsole).toHaveLength(0)
  })

  it("should pass ESLint no-console rule", () => {
    try {
      // Run ESLint on the source directory
      execSync("npx eslint src --ext .ts,.tsx,.js,.jsx --max-warnings 0", {
        encoding: "utf-8",
        stdio: "pipe",
      })
    } catch (error: any) {
      // Check if the error is related to console usage
      if (error.stdout && error.stdout.includes("no-console")) {
        throw new Error(
          `ESLint no-console rule violations found:\n${error.stdout}`
        )
      }
      // Re-throw other errors
      if (error.message) {
        throw error
      }
    }
  })
})
