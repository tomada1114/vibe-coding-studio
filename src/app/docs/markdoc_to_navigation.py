#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import glob
from pathlib import Path


def extract_title_from_frontmatter(file_path):
    """
    ファイルからフロントマターのタイトルを抽出する関数
    タイトル内の [] を 【】 に置き換える
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

            # フロントマターを検出する正規表現
            frontmatter_match = re.search(
                r'---\s+(.*?)\s+---', content, re.DOTALL)
            if not frontmatter_match:
                return None

            frontmatter = frontmatter_match.group(1)

            # title行を検索
            title_match = re.search(
                r'^title:\s*(.*?)$', frontmatter, re.MULTILINE)
            if title_match:
                title = title_match.group(1).strip().strip('"\'')
                # タイトル内の [] を 【】 に置き換える
                title = re.sub(r'\[([^\]]*)\]', r'【\1】', title)
                return title
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")

    return None


def create_href(path):
    """
    ファイルパスからhref（URL）を生成する関数
    """
    # page.mdを除去し、docsディレクトリからの相対パスに変換
    rel_path = os.path.dirname(path)
    if os.path.basename(rel_path) == "docs":
        return "/docs"

    # docsディレクトリ以下のパスを取得
    docs_index = rel_path.find("docs")
    if docs_index != -1:
        href = rel_path[docs_index:]
    else:
        href = rel_path

    return f"/{href}"


def build_navigation_structure(docs_dir):
    """
    ディレクトリ構造を再帰的に探索し、navigationオブジェクトを構築する
    """
    # 最上位のナビゲーション項目を保持するリスト
    navigation = []

    # docsディレクトリ直下のフォルダを取得（例: rails, ruby）
    top_dirs = [d for d in os.listdir(
        docs_dir) if os.path.isdir(os.path.join(docs_dir, d))]

    for top_dir in top_dirs:
        top_dir_path = os.path.join(docs_dir, top_dir)
        top_page_path = os.path.join(top_dir_path, "page.md")

        # トップレベルのタイトルを取得
        top_title = None
        if os.path.exists(top_page_path):
            top_title = extract_title_from_frontmatter(top_page_path)

        if not top_title:
            top_title = top_dir.capitalize()

        # トップレベルのリンクを保持するリスト
        top_links = []

        # サブディレクトリをソートして処理（例: introduction, techlog-setup）
        sub_dirs = sorted([d for d in os.listdir(top_dir_path)
                           if os.path.isdir(os.path.join(top_dir_path, d)) and not d.startswith(".")])

        for sub_dir in sub_dirs:
            sub_dir_path = os.path.join(top_dir_path, sub_dir)
            sub_page_path = os.path.join(sub_dir_path, "page.md")

            # サブディレクトリのタイトルとhrefを取得
            sub_title = None
            if os.path.exists(sub_page_path):
                sub_title = extract_title_from_frontmatter(sub_page_path)

            if not sub_title:
                sub_title = sub_dir.replace("_", " ").capitalize()

            sub_href = create_href(sub_page_path)

            # 子リンクを保持するリスト
            children = []

            # サブサブディレクトリをソートして処理
            subsub_dirs = sorted([d for d in os.listdir(sub_dir_path)
                                  if os.path.isdir(os.path.join(sub_dir_path, d)) and not d.startswith(".")])

            for subsub_dir in subsub_dirs:
                subsub_dir_path = os.path.join(sub_dir_path, subsub_dir)
                subsub_page_path = os.path.join(subsub_dir_path, "page.md")

                # サブサブディレクトリのタイトルとhrefを取得
                subsub_title = None
                if os.path.exists(subsub_page_path):
                    subsub_title = extract_title_from_frontmatter(
                        subsub_page_path)

                if not subsub_title:
                    subsub_title = subsub_dir.replace("_", " ").capitalize()

                subsub_href = create_href(subsub_page_path)

                # 子リンクを追加
                children.append({
                    "title": subsub_title,
                    "href": subsub_href
                })

            # サブリンクを追加（子リンクがある場合は含める）
            sub_link = {
                "title": sub_title,
                "href": sub_href
            }

            if children:
                sub_link["children"] = children

            top_links.append(sub_link)

        # トップレベルのナビゲーション項目を追加（slugを含める）
        nav_item = {
            "title": top_title,
            "slug": top_dir,  # ディレクトリ名をスラッグとして使用
            "links": top_links
        }

        navigation.append(nav_item)

    return navigation


def generate_typescript_code(navigation):
    """
    ナビゲーション構造からTypeScriptコードを生成する関数
    """
    lines = ["export const navigation = ["]

    for nav_item in navigation:
        lines.append("  {")
        lines.append(f"    title: '{nav_item['title']}',")
        # slugを追加
        if 'slug' in nav_item:
            lines.append(f"    slug: '{nav_item['slug']}',")
        lines.append("    links: [")

        for link in nav_item.get("links", []):
            lines.append("      {")
            lines.append(f"        title: '{link['title']}',")
            lines.append(f"        href: '{link['href']}',")

            if "children" in link and link["children"]:
                lines.append("        children: [")

                for child in link["children"]:
                    lines.append("          {")
                    lines.append(f"            title: '{child['title']}',")
                    lines.append(f"            href: '{child['href']}',")
                    lines.append("          },")

                lines.append("        ],")

            lines.append("      },")

        lines.append("    ],")
        lines.append("  },")

    lines.append("];")

    return "\n".join(lines)


def main():
    # スクリプトのパスを基準にプロジェクトルートを特定
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # src/app/docs 内にスクリプトが配置されている場合、3階層上がルート
    project_root = os.path.abspath(os.path.join(current_dir, "../../.."))

    # docsディレクトリのパスを設定
    docs_dir = os.path.join(current_dir)

    # 出力先のパスを設定
    output_path = os.path.join(project_root, "src", "lib", "navigation.ts")

    # 出力先のディレクトリが存在することを確認
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # ナビゲーション構造を構築
    navigation = build_navigation_structure(docs_dir)

    # TypeScriptコードを生成
    ts_code = generate_typescript_code(navigation)

    # navigation.tsファイルに書き込み
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(ts_code)

    print(f"navigation.ts が正常に生成されました: {output_path}")


if __name__ == "__main__":
    main()
