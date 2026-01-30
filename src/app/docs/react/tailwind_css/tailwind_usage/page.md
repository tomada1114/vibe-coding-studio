---
title: Tailwind CSSの基本的な使い方
nextjs:
  metadata:
    title: Tailwind CSSの基本的な使い方
    description: Tailwind CSSの基本クラス、レイアウト、色とスペーシング、レスポンシブデザインの使い方を実践的に学びます。
---

## 学習の目標

本章では、以下の内容を学習します。

- HTMLでのTailwind CSS基本クラスの使い方を習得する
- レイアウト関連のクラス（flex、grid）の活用方法を学ぶ
- 色とスペーシングのクラスの体系的な理解を深める
- レスポンシブデザインのクラス指定方法を習得する
- 実践的なWebページレイアウトの作成方法を学ぶ

## はじめに

前の章では、Tailwind CSSの概念とCDNを使った簡単な導入方法を学びました。
この章では、実際にTailwind CSSのクラスを使って、様々なデザインパターンを作成していきます。

Tailwind CSSには非常に多くのクラスが用意されていますが、まずは頻繁に使用される基本的なクラスから覚えていきましょう。
一度基本パターンを理解すれば、他のクラスも直感的に使えるようになります。

実際にコードを書きながら、Tailwind CSSの便利さを体験していきましょう。

## HTMLでのTailwind CSS基本クラス

### 新しいHTMLファイルの準備

まず、実習用のHTMLファイルを作成しましょう。
VS Codeで新しいファイルを作成し、`tailwind-practice.html`という名前で保存してください。

以下の基本構造から始めます。

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Tailwind CSS 基本練習</title>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">
      Tailwind CSS 基本クラス練習
    </h1>

    <!-- ここに各セクションを追加していきます -->

  </div>
</body>
</html>
```

この基本構造で使用されているクラスを確認してみましょう。

- `bg-gray-50`: 背景色を薄いグレーにする
- `p-8`: 全方向に32px（8 × 4px）のパディングを適用
- `max-w-4xl`: 最大幅を896pxに制限
- `mx-auto`: 左右のマージンを自動調整（中央寄せ）
- `text-3xl`: フォントサイズを大きく設定
- `font-bold`: フォントを太字にする
- `text-center`: テキストを中央揃え
- `mb-8`: 下マージンを32px設定

本コースは React がメインですので CSS については詳しくは触れませんが、Tailwind CSS のクラスそれぞれが持つ意味さえ理解できれば、React コンポーネント内でも同様にクラスを適用できます。
このHTMLファイルをブラウザで開くと、基本的なレイアウトが表示されます。

![スクリーンショット](/img/react/tailwind_css_basics_initial.png)

現状は `h1` のみが表示されていますが、これから各セクションを追加していきます。

### テキスト関連のクラス

HTMLファイルのコメント部分に、以下のテキスト関連のクラスを試すセクションを追加してみましょう。

```html
<!-- テキスト関連のクラス -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">テキスト関連クラス</h2>

  <div class="space-y-4">
    <p class="text-sm text-gray-600">小さなテキスト（text-sm）</p>
    <p class="text-base text-gray-800">基本サイズのテキスト（text-base）</p>
    <p class="text-lg text-gray-900">少し大きなテキスト（text-lg）</p>
    <p class="text-xl font-medium">大きなテキスト、中程度の太さ（text-xl font-medium）</p>
    <p class="text-2xl font-bold text-blue-600">大見出し、太字、青色（text-2xl font-bold text-blue-600）</p>
  </div>
</section>
```

ブラウザでこのHTMLファイルを開くと、以下のようなテキストが表示されます。

![スクリーンショット](/img/react/tailwind_css_text_classes.png)

この例では、以下のクラスを使用しています。

#### フォントサイズ

- `text-sm`: 14px
- `text-base`: 16px（デフォルト）
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px

#### フォントの太さ

- `font-medium`: 中程度の太さ
- `font-semibold`: やや太字
- `font-bold`: 太字

#### テキスト色

- `text-gray-600`: 中程度のグレー
- `text-gray-800`: 濃いグレー
- `text-blue-600`: 青色

### 背景色とボーダーのクラス

次に、背景色とボーダーに関するクラスを試してみましょう。

```html
<!-- 背景色とボーダー -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">背景色とボーダー</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-red-100 border-l-4 border-red-500 p-4">
      <p class="text-red-800">赤系の背景とボーダー</p>
    </div>
    <div class="bg-green-100 border-l-4 border-green-500 p-4">
      <p class="text-green-800">緑系の背景とボーダー</p>
    </div>
    <div class="bg-blue-100 border-l-4 border-blue-500 p-4">
      <p class="text-blue-800">青系の背景とボーダー</p>
    </div>
  </div>
</section>
```

ブラウザでこのHTMLファイルを開くと、以下のようなセクションが表示されます。

![スクリーンショット](/img/react/tailwind_css_background_border.png)

ここで使用されているクラスは以下の通りです。

- `bg-red-100`: 薄い赤色の背景
- `border-l-4`: 左側に4pxの太いボーダー
- `border-red-500`: ボーダーの色を中程度の赤に設定
- `p-4`: 全方向に16pxのパディング

## レイアウト関連のクラス（flex、grid）

### Flexboxを使ったレイアウト

Tailwind CSSでは、Flexboxを使ったレイアウトを簡単に実現できます。

Flexboxとは、要素を柔軟に配置するためのCSSの機能です。

たとえば、要素を横並びにしたり、中央に配置したりすることができます。

以下のセクションを追加してみましょう。

```html
<!-- Flexboxレイアウト -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">Flexboxレイアウト</h2>

  <!-- 横並び基本 -->
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">基本的な横並び</h3>
    <div class="flex space-x-4">
      <div class="bg-blue-500 text-white p-4 rounded">アイテム1</div>
      <div class="bg-green-500 text-white p-4 rounded">アイテム2</div>
      <div class="bg-red-500 text-white p-4 rounded">アイテム3</div>
    </div>
  </div>

  <!-- 中央寄せ -->
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">中央寄せ</h3>
    <div class="flex justify-center items-center h-32 bg-gray-200 rounded">
      <div class="bg-purple-500 text-white p-4 rounded">中央に配置</div>
    </div>
  </div>

  <!-- 両端寄せ -->
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">両端寄せ</h3>
    <div class="flex justify-between items-center bg-gray-200 p-4 rounded">
      <div class="bg-indigo-500 text-white p-3 rounded">左側</div>
      <div class="bg-pink-500 text-white p-3 rounded">右側</div>
    </div>
  </div>
</section>
```

ブラウザでこのHTMLファイルを開くと、以下のようなFlexboxレイアウトが表示されます。

![スクリーンショット](/img/react/tailwind_css_flexbox.png)

Flexboxで使用している主要なクラスは以下の通りです。

#### 基本的なflex設定

- `flex`: 要素をflexコンテナにする
- `space-x-4`: 子要素間に横方向のスペースを16px追加

#### 配置に関するクラス

- `justify-center`: 横方向の中央寄せ
- `justify-between`: 両端寄せ
- `items-center`: 縦方向の中央寄せ

### CSS Gridを使ったレイアウト

CSS Gridも簡単に使用できます。

CSS Gridは、2次元のレイアウトを作成するためのCSSの機能です。

たとえば、複数の列や行を持つレイアウトを簡単に作成できます。

以下のセクションを追加してみましょう。

```html
<!-- CSS Gridレイアウト -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">CSS Gridレイアウト</h2>

  <!-- 基本的なグリッド -->
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">3列グリッド</h3>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-yellow-400 p-4 rounded text-center">1</div>
      <div class="bg-yellow-400 p-4 rounded text-center">2</div>
      <div class="bg-yellow-400 p-4 rounded text-center">3</div>
      <div class="bg-yellow-400 p-4 rounded text-center">4</div>
      <div class="bg-yellow-400 p-4 rounded text-center">5</div>
      <div class="bg-yellow-400 p-4 rounded text-center">6</div>
    </div>
  </div>

  <!-- 異なるサイズのグリッド -->
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">カラムサイズが異なるグリッド</h3>
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-2 bg-teal-400 p-4 rounded text-center">幅2倍</div>
      <div class="bg-teal-400 p-4 rounded text-center">通常</div>
      <div class="bg-teal-400 p-4 rounded text-center">通常</div>
    </div>
  </div>
</section>
```

ブラウザでこのHTMLファイルを開くと、以下のようなCSS Gridレイアウトが表示されます。

![スクリーンショット](/img/react/tailwind_css_grid.png)

CSS Gridで使用している主要なクラスは以下の通りです。

#### グリッド設定

- `grid`: 要素をグリッドコンテナにする
- `grid-cols-3`: 3列のグリッドを作成
- `grid-cols-4`: 4列のグリッドを作成
- `gap-4`: グリッドアイテム間に16pxの隙間を作成

#### グリッドアイテムの制御

- `col-span-2`: 2列分の幅を占有

## 色とスペーシングのクラス

### カラーシステムの理解

ここまで何気なく使ってきましたが、Tailwind CSSでは、色が体系的に整理されています。

通常、CSS では色を指定する際に、16進数やRGB値を使いますが、Tailwind CSSではクラス名で色を指定します。
色のクラスは、色の種類と濃さを組み合わせた名前になっています。

例えば、`bg-blue-500`は「背景色を青の中程度の濃さにする」という意味です。

色の種類は、以下のような名前が使われます。

- `gray`, `red`, `green`, `blue`, `yellow`, `purple`, `pink`, `indigo` など

また、色の濃さは、数字で表現され、`50`から`950`までの範囲で指定されます。

詳しい色の種類は、[公式ドキュメント](https://tailwindcss.com/docs/colors)を参照してください。

また、デフォルトで用意している色以外にも独自に色を追加することも可能ですが、まずはデフォルトの色を使って開発していくことをお勧めします。

では、実際に色のクラスを使ってみましょう。

```html
<!-- カラーシステム -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">カラーシステム</h2>

  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">グレースケール</h3>
    <div class="flex space-x-2">
      <div class="w-12 h-12 bg-gray-100 rounded border"></div>
      <div class="w-12 h-12 bg-gray-300 rounded"></div>
      <div class="w-12 h-12 bg-gray-500 rounded"></div>
      <div class="w-12 h-12 bg-gray-700 rounded"></div>
      <div class="w-12 h-12 bg-gray-900 rounded"></div>
    </div>
    <p class="text-sm mt-2 text-gray-600">100 → 300 → 500 → 700 → 900</p>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">ブルー系</h3>
    <div class="flex space-x-2">
      <div class="w-12 h-12 bg-blue-100 rounded"></div>
      <div class="w-12 h-12 bg-blue-300 rounded"></div>
      <div class="w-12 h-12 bg-blue-500 rounded"></div>
      <div class="w-12 h-12 bg-blue-700 rounded"></div>
      <div class="w-12 h-12 bg-blue-900 rounded"></div>
    </div>
  </div>
</section>
```

ブラウザでこのHTMLファイルを開くと、以下のような色のサンプルが表示されます。

![スクリーンショット](/img/react/tailwind_css_colors.png)

他にも、`bg-red-500`や`bg-green-300`など、様々な色のクラスを試してみると良いでしょう。

### スペーシング（余白）システム

Tailwind CSSのスペーシング、つまり余白のクラスは、パディング（内側の余白）とマージン（外側の余白）を簡単に設定できます。

注意していただきたいのは、Tailwind CSSでは、スペーシングの単位が`4px`を基本としていることです。

例えば `mb-1` は `4px` の下方向マージン、`p-2` は `8px` の全方向パディングを意味します。

では、実際にスペーシングのクラスを使ってみましょう。

```html
<!-- スペーシングシステム -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">スペーシングシステム</h2>

  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">パディング（内側の余白）</h3>
    <div class="bg-gray-200 p-2">
      <div class="bg-blue-400 p-1 mb-2">p-1 (4px)</div>
      <div class="bg-blue-400 p-2 mb-2">p-2 (8px)</div>
      <div class="bg-blue-400 p-4 mb-2">p-4 (16px)</div>
      <div class="bg-blue-400 p-8">p-8 (32px)</div>
    </div>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">マージン（外側の余白）</h3>
    <div class="bg-gray-200 p-4">
      <div class="bg-green-400 p-2 mb-2">mb-2 (下マージン8px)</div>
      <div class="bg-green-400 p-2 mb-4">mb-4 (下マージン16px)</div>
      <div class="bg-green-400 p-2 mb-8">mb-8 (下マージン32px)</div>
      <div class="bg-green-400 p-2">最後の要素</div>
    </div>
  </div>
</section>
```

ブラウザでこのHTMLファイルを開くと、以下のようなスペーシングのサンプルが表示されます。

![スクリーンショット](/img/react/tailwind_css_spacing.png)

スペーシングの基本ルールと、よく使うスペーシングのクラスを確認しておきましょう。

#### 数値とピクセルの対応

- `1` = 4px
- `2` = 8px
- `4` = 16px
- `8` = 32px
- `16` = 64px

#### 方向の指定

- `p-4`: 全方向のパディング
- `px-4`: 左右のパディング
- `py-4`: 上下のパディング
- `pt-4`: 上のパディング
- `pr-4`: 右のパディング
- `pb-4`: 下のパディング
- `pl-4`: 左のパディング

## レスポンシブデザインのクラス

現代のWeb開発では、様々なデバイスでの表示に対応するため、レスポンシブデザインが重要です。

レスポンシブデザインとは、画面サイズに応じてレイアウトやスタイルを変更する手法です。
たとえば、スマートフォンでは1列表示、タブレットでは2列表示、PCでは3列表示にするなどの対応が必要です。

Tailwind CSSでは、レスポンシブデザインを簡単に実装できるクラスが用意されています。

### ブレークポイントシステム

Tailwind CSSでは、レスポンシブデザインを簡単に実装できます。
以下のブレークポイントが定義されています。

- `sm`: 640px以上
- `md`: 768px以上
- `lg`: 1024px以上
- `xl`: 1280px以上

### レスポンシブレイアウトの実装

実際にレスポンシブデザインを試してみましょう。

以下のコードをHTMLファイルに追加してください。

```html
<!-- レスポンシブデザイン -->
<section class="mb-12">
  <h2 class="text-2xl font-semibold mb-6">レスポンシブデザイン</h2>

  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">レスポンシブグリッド</h3>
    <p class="text-sm text-gray-600 mb-4">
      画面サイズを変更して確認してください：
      スマホ(1列) → タブレット(2列) → PC(3列)
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-orange-400 p-4 rounded text-center text-white">
        アイテム 1
      </div>
      <div class="bg-orange-400 p-4 rounded text-center text-white">
        アイテム 2
      </div>
      <div class="bg-orange-400 p-4 rounded text-center text-white">
        アイテム 3
      </div>
      <div class="bg-orange-400 p-4 rounded text-center text-white">
        アイテム 4
      </div>
      <div class="bg-orange-400 p-4 rounded text-center text-white">
        アイテム 5
      </div>
      <div class="bg-orange-400 p-4 rounded text-center text-white">
        アイテム 6
      </div>
    </div>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-medium mb-3">レスポンシブテキスト</h3>
    <p class="text-base md:text-lg lg:text-xl">
      このテキストは画面サイズに応じてサイズが変わります
    </p>
  </div>
</section>
```

では、使ったクラスをおさらいしておきましょう。

#### 基本的な記述方法

- `grid-cols-1`: デフォルト（全画面サイズ）で1列
- `md:grid-cols-2`: 768px以上で2列
- `lg:grid-cols-3`: 1024px以上で3列

#### テキストサイズの変更

- `text-base`: デフォルトで16px
- `md:text-lg`: 768px以上で18px
- `lg:text-xl`: 1024px以上で20px

Tailwind CSSでは、クラス名の前にブレークポイントを付けることで、そのサイズ以上の画面でのみ適用されるスタイルを指定できます。

基本的には、`<ブレークポイント>:<クラス名>`の形式で記述します。

逆にブレークポイントを何も指定しない場合は、全ての画面サイズに適用され、スマートフォンやタブレットなどの小さい画面にそのまま適用されます。

これは、Tailwind CSS が「スマホファースト」のアプローチを採用しているためです。

### ブラウザでの確認

作成したHTMLファイルをブラウザで開いて、実際に画面サイズを変更してみましょう。
ブラウザの開発者ツール（F12キー）を開いて、デバイスエミュレーション機能を使うと、様々な画面サイズでの表示を確認できます。

レスポンシブグリッドの部分が、画面サイズに応じて1列→2列→3列に変化することを確認してください。

#### PC表示

![スクリーンショット](/img/react/tailwind_css_responsive_pc.png)

#### タブレット表示（少し幅を狭める）
![スクリーンショット](/img/react/tailwind_css_responsive_tablet.png)

#### スマートフォン表示（さらに幅を狭める）
![スクリーンショット](/img/react/tailwind_css_responsive_mobile.png)

## まとめ

本章では、Tailwind CSSの基本的な使い方についていろいろなクラスを実際に使いながら学びました。
Tailwind CSSのユーティリティクラスを使うことで、HTMLの中に直接スタイルを記述し、迅速にデザインを実現できることが理解できたと思います。

習得できた内容は以下の通りです。

- テキスト、背景色、ボーダーなどの基本クラスの使い方を理解しました
- FlexboxとCSS Gridを使ったレイアウト作成方法を習得しました
- Tailwind CSSの体系的な色とスペーシングシステムを学びました
- レスポンシブデザインの実装方法を理解し、実際に動作を確認しました
- 実用的なWebページのレイアウトパターンを体験しました

Tailwind CSSのクラス名は最初は覚えにくく感じるかもしれませんが、規則性があるため慣れてくると直感的に使えるようになります。
また、公式ドキュメント（https://tailwindcss.com/docs）には全てのクラスが詳しく説明されているので、迷った時は参照してみてください。

次の章では、これまで学んだTailwind CSSをReactと組み合わせて使用する方法について学んでいきましょう。
