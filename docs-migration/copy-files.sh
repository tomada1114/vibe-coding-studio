#!/bin/bash
#
# docs-migration コピースクリプト
#
# このスクリプトは、learning-next-school リポジトリのソースから
# docs-migration ディレクトリにファイルをコピーします。
#
# 使い方:
#   cd learning-next-school
#   bash docs-migration/copy-files.sh
#

set -euo pipefail

SOURCE_ROOT="$(pwd)"
DEST_ROOT="$(pwd)/docs-migration"

echo "=== docs-migration コピースクリプト ==="
echo "Source: $SOURCE_ROOT"
echo "Dest:   $DEST_ROOT"
echo ""

# -----------------------------------------------
# 1. ディレクトリ構造の作成
# -----------------------------------------------
echo "[1/6] ディレクトリ構造を作成中..."
mkdir -p "$DEST_ROOT/src/app/docs"
mkdir -p "$DEST_ROOT/src/components/docs"
mkdir -p "$DEST_ROOT/src/components/icons"
mkdir -p "$DEST_ROOT/src/components/common"
mkdir -p "$DEST_ROOT/src/components/catalyst"
mkdir -p "$DEST_ROOT/src/components/structured-data"
mkdir -p "$DEST_ROOT/src/lib"
mkdir -p "$DEST_ROOT/src/markdoc"
mkdir -p "$DEST_ROOT/public/img"
mkdir -p "$DEST_ROOT/public/images/topics"
mkdir -p "$DEST_ROOT/config"

# -----------------------------------------------
# 2. コースコンテンツのコピー（Claude Code 除外）
# -----------------------------------------------
echo "[2/6] コースコンテンツをコピー中..."
COURSES="ruby rails rspec javascript typescript react python"
for course in $COURSES; do
  if [ -d "$SOURCE_ROOT/src/app/docs/$course" ]; then
    mkdir -p "$DEST_ROOT/src/app/docs/$course"
    cp -r "$SOURCE_ROOT/src/app/docs/$course/"* "$DEST_ROOT/src/app/docs/$course/"
    echo "  Copied: $course"
  fi
done

# how-to-use ページ
if [ -f "$SOURCE_ROOT/src/app/docs/how-to-use/page.tsx" ]; then
  mkdir -p "$DEST_ROOT/src/app/docs/how-to-use"
  cp "$SOURCE_ROOT/src/app/docs/how-to-use/page.tsx" "$DEST_ROOT/src/app/docs/how-to-use/page.tsx"
  echo "  Copied: how-to-use/page.tsx"
fi

# 動的ルート
if [ -f "$SOURCE_ROOT/src/app/docs/[course]/[chapter]/page.tsx" ]; then
  mkdir -p "$DEST_ROOT/src/app/docs/[course]/[chapter]"
  cp "$SOURCE_ROOT/src/app/docs/[course]/[chapter]/page.tsx" "$DEST_ROOT/src/app/docs/[course]/[chapter]/page.tsx"
  echo "  Copied: [course]/[chapter]/page.tsx"
fi

# ナビゲーション生成スクリプト
if [ -f "$SOURCE_ROOT/src/app/docs/markdoc_to_navigation.py" ]; then
  cp "$SOURCE_ROOT/src/app/docs/markdoc_to_navigation.py" "$DEST_ROOT/src/app/docs/markdoc_to_navigation.py"
  echo "  Copied: markdoc_to_navigation.py"
fi

# -----------------------------------------------
# 3. そのままコピーするコンポーネント
# -----------------------------------------------
echo "[3/6] コンポーネントをコピー中..."
COPY_FILES=(
  "components/Navigation.tsx"
  "components/Search.tsx"
  "components/Fence.tsx"
  "components/Prose.tsx"
  "components/PrevNextLinks.tsx"
  "components/Callout.tsx"
  "components/Icon.tsx"
  "components/QuickLinks.tsx"
  "components/DocsHeader.tsx"
  "components/DocsStructuredData.tsx"
  "components/docs/DocsBreadcrumb.tsx"
  "components/docs/AuthorCredit.tsx"
  "components/docs/ChapterTopPage.tsx"
  "components/icons/Devicon.tsx"
  "components/common/BreadcrumbWithStructuredData.tsx"
  "components/structured-data/DocsArticleStructuredData.tsx"
  "components/catalyst/heading.tsx"
)

for f in "${COPY_FILES[@]}"; do
  if [ -f "$SOURCE_ROOT/src/$f" ]; then
    dir=$(dirname "$DEST_ROOT/src/$f")
    mkdir -p "$dir"
    cp "$SOURCE_ROOT/src/$f" "$DEST_ROOT/src/$f"
    echo "  Copied: $f"
  else
    echo "  WARNING: Not found: $f"
  fi
done

# -----------------------------------------------
# 4. Markdoc 設定
# -----------------------------------------------
echo "[4/6] Markdoc設定をコピー中..."
for f in nodes.js tags.js search.mjs; do
  if [ -f "$SOURCE_ROOT/src/markdoc/$f" ]; then
    cp "$SOURCE_ROOT/src/markdoc/$f" "$DEST_ROOT/src/markdoc/$f"
    echo "  Copied: markdoc/$f"
  fi
done

# -----------------------------------------------
# 5. 静的アセット
# -----------------------------------------------
echo "[5/6] 静的アセットをコピー中..."
if [ -d "$SOURCE_ROOT/public/images/topics" ]; then
  for f in "$SOURCE_ROOT/public/images/topics/"*; do
    fname=$(basename "$f")
    if [ "$fname" != "claude.svg" ]; then
      cp "$f" "$DEST_ROOT/public/images/topics/$fname"
      echo "  Copied: images/topics/$fname"
    else
      echo "  Excluded: images/topics/$fname (Claude Code)"
    fi
  done
fi

if [ -d "$SOURCE_ROOT/public/img" ]; then
  cp -r "$SOURCE_ROOT/public/img/"* "$DEST_ROOT/public/img/" 2>/dev/null || true
  echo "  Copied: public/img/"
fi

# -----------------------------------------------
# 6. 検証
# -----------------------------------------------
echo "[6/6] 検証中..."

# Claude Code コンテンツが含まれていないことを確認
if [ -d "$DEST_ROOT/src/app/docs/claude-code" ]; then
  echo "  ERROR: claude-code ディレクトリが存在します！"
  exit 1
else
  echo "  OK: claude-code ディレクトリは除外されています"
fi

# claude.svg が含まれていないことを確認
if [ -f "$DEST_ROOT/public/images/topics/claude.svg" ]; then
  echo "  ERROR: claude.svg が存在します！"
  exit 1
else
  echo "  OK: claude.svg は除外されています"
fi

echo ""
echo "=== コピー完了 ==="
echo ""
echo "※ 修正済みファイル（DocsLayout, Curriculum, MobileNavigation, docs/page.tsx,"
echo "   course-constants.ts, navigation.ts, navigation-utils.ts）は"
echo "   手動で配置済みです。このスクリプトでは上書きしません。"
echo ""
echo "詳細は MIGRATION_GUIDE.md を参照してください。"
