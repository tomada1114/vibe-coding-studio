#!/usr/bin/env node

/**
 * Git Hooksセットアップスクリプト
 *
 * pre-commitフックを.git/hooks/ディレクトリにインストールします。
 */

const fs = require('fs')
const path = require('path')

// ANSI色コード
const COLORS = {
  RESET: '\x1b[0m',
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
}

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`)
}

function main() {
  try {
    log('🔧 Git Hooksをセットアップ中...', COLORS.CYAN)

    // .git/hooks/ディレクトリの存在確認
    const gitHooksDir = path.join(process.cwd(), '.git', 'hooks')

    if (!fs.existsSync(gitHooksDir)) {
      log('❌ .git/hooks/ディレクトリが見つかりません。', COLORS.RED)
      log('💡 このプロジェクトはGitリポジトリではない可能性があります。', COLORS.YELLOW)
      process.exit(1)
    }

    // pre-commitフックのソースパス
    const sourceHookPath = path.join(process.cwd(), 'scripts', 'pre-commit')
    const targetHookPath = path.join(gitHooksDir, 'pre-commit')

    if (!fs.existsSync(sourceHookPath)) {
      log('❌ scripts/pre-commit ファイルが見つかりません。', COLORS.RED)
      process.exit(1)
    }

    // pre-commitフックをコピー
    log('📄 pre-commitフックをコピー中...', COLORS.CYAN)
    fs.copyFileSync(sourceHookPath, targetHookPath)

    // 実行権限を付与
    log('🔐 実行権限を付与中...', COLORS.CYAN)
    fs.chmodSync(targetHookPath, 0o755)

    log('✅ Git Hooksのセットアップが完了しました！', COLORS.GREEN)
    log('', COLORS.RESET)
    log('📦 次回以降、以下のファイルが変更されたときに自動的にインデックスが再生成されます:', COLORS.CYAN)
    log('  - src/data/videos/*.ts', COLORS.CYAN)
    log('  - src/constants/coupon-courses.ts', COLORS.CYAN)
    log('', COLORS.RESET)
    log('💡 フックをバイパスしたい場合は、git commit --no-verify を使用してください。', COLORS.YELLOW)
  } catch (error) {
    log('❌ Git Hooksのセットアップ中にエラーが発生しました:', COLORS.RED)
    console.error(error)
    process.exit(1)
  }
}

main()
