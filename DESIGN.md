# Calm Corner Design Guidelines

## Purpose

Calm Corner は、プラモデル・美少女プラモデル・ゲームなど、個人の趣味や制作記録を残すためのサイトです。

デザインでは、一般的なブログテンプレートの見た目をそのまま採用するのではなく、

**「個人の趣味の机や、小さな作業スペースを覗いているような感覚」**

を大切にします。

個性は出しますが、読みやすさや使いやすさを犠牲にしてはいけません。

---

## Design Concept

中心となるコンセプトは、

**Calm Hobby Desk**

です。

イメージとして以下の要素を参考にします。

- hobby desk
- model kit
- brush painting
- personal workspace
- small atelier
- photo album
- craft
- work notes
- paper
- scrapbook

ただし、これらを直接再現することが目的ではありません。

「紙」「写真」「メモ」「制作机」などの要素は、サイトの世界観を補助するために限定的に使用します。

---

## Core Principle: Content First

Calm Cornerでは、模型写真・制作写真・記事本文が主役です。

UIそのものを目立たせるのではなく、コンテンツが自然に目に入るデザインを優先します。

特に作品写真より、

- 装飾
- カード
- 色
- アニメーション
- アイコン

が目立たないようにしてください。

迷った場合は、

**UIを弱くしてコンテンツを強く見せる**

方向を選びます。

---

## Calm

サイト全体には落ち着いた雰囲気を持たせます。

以下のような表現は基本的に避けます。

- 高彩度な色の多用
- 強いグラデーション
- ネオンカラー
- 激しいアニメーション
- 強いコントラストの装飾
- 情報量の多すぎるレイアウト

余白を十分に取り、情報を詰め込みすぎないようにします。

---

## Personal, Not Corporate

企業サイトやWebサービスのような印象ではなく、

**個人が長く使っている趣味の場所**

のような雰囲気を目指します。

避けるもの：

- SaaS的なUI
- Dashboard的なUI
- Marketing Landing Page的なUI
- 過度なBento Grid
- Corporate Site的なレイアウト

整いすぎたUIよりも、少し人の気配を感じるデザインを優先します。

---

## Avoid Generic Blog Design

一般的なブログテンプレートをそのまま再現しないようにします。

特に、

- 同じ大きさの記事カードが規則的に並ぶ
- 全カードが大きな角丸
- 全カードにbox-shadow
- 日付 / タイトル / 抜粋が同じ形式で繰り返される
- sidebar中心のWordPress的レイアウト

には依存しないようにします。

ただし、「ブログらしいUIを絶対に使用しない」という意味ではありません。

必要な機能は分かりやすさを優先します。

---

## Visual Hierarchy

視覚的な優先順位は基本的に、

1. 作品写真
2. 記事タイトル
3. 記事本文
4. 補足情報
5. UI・装飾

とします。

装飾によって、この順番が逆転しないようにしてください。

---

## Colors

サイト本体は低彩度の色を中心に構成します。

背景には、真っ白ではなく少し温かみのある色を使用できます。

基準となる色の例：

```css
--color-background: #f4f0e7;
--color-text: #292824;
--color-text-muted: #777268;
```

これらは固定値ではなく、デザイン調整に応じて変更して構いません。

アクセントカラーには、

- muted teal
- muted blue
- muted green

など、落ち着いた色を使用します。

作品写真そのものに多くの色が含まれるため、UI側では色を使いすぎないようにします。

---

## Typography

文章の読みやすさを最優先します。

本文には、長文を読みやすいフォントを使用します。

手書き風・クラフト風フォントを使用する場合は、

- 小さなラベル
- セクション名
- 装飾

など限定的な場所のみとします。

本文やNavigation全体に使用しないでください。

フォントの個性よりも、可読性を優先します。

---

## Spacing

要素を区切るために、borderやcardを増やすよりも、

**余白を使ってグルーピングする**

ことを優先します。

十分な余白を取ることで、落ち着いた空間を作ります。

---

## Cards

カードUIを禁止するわけではありません。

ただし、すべてをカード化しないでください。

特に、

```css
border-radius: 20px;
box-shadow: 0 10px 30px...;
```

のような典型的なWebサービス風カードを大量に使用することは避けます。

カードを使用する場合も、

- 小さなradius
- 控えめなborder
- subtle shadow
- 背景色の差

など、弱い表現を優先します。

---

## Handmade Details

Calm Cornerらしさを出すため、少しだけ手作業感のある表現を使用できます。

例：

- 写真を1〜2度だけ傾ける
- マスキングテープ風の小さな装飾
- 紙のような余白
- メモのようなラベル
- 少し不均一なライン

ただし、これらはアクセントです。

以下は避けます。

- 全要素を傾ける
- 全画像にテープを付ける
- 強い紙テクスチャ
- 大量の落書き
- 過剰なスクラップブック表現

---

## Photography

写真には不要な装飾を付けないことを基本とします。

作品写真は十分なサイズで表示します。

必要であれば、文章コンテンツより写真を広く表示するレイアウトも許容します。

写真そのものの色や情報が十分にあるため、周囲のUIはシンプルにします。

---

## Article Reading Experience

記事ページでは、サイトの世界観よりも、

**写真と文章を落ち着いて読めること**

を優先します。

トップページなどでは多少個性的な表現を使用しても、本文エリアでは装飾を減らします。

長文コンテンツの可読性を維持してください。

---

## Labels and Language

必要に応じて、一般的なブログ用語を少し柔らかい表現に置き換えて構いません。

ただし、世界観を優先するあまり意味が分かりづらくならないようにします。

原則は、

**初めて見た人にも意味が分かること**

です。

独自表現はサイトのアクセントとして使用します。

---

## Header and Navigation

Navigationはシンプルにします。

現在地や主要なコンテンツへ迷わず移動できることを優先します。

企業サイトのような大規模Navigationにはしません。

Headerそのものを目立たせるより、コンテンツへの入口として機能させます。

---

## Footer

Footerもシンプルにします。

大量のリンクやサイトマップを配置する必要はありません。

サイトの終わりとして自然で、Calm Cornerの落ち着いた雰囲気を維持してください。

---

## Responsive Design

スマートフォンでの読みやすさを重要視します。

Mobileでは、

- 1カラム中心
- 写真を十分大きく表示
- 装飾を減らす
- 十分なタップ領域を確保
- 長文を読みやすくする

ことを優先します。

PC版のレイアウトや装飾を単純に縮小しないようにしてください。

---

## Animation

アニメーションは補助的に使用します。

許容する例：

- opacity
- small translate
- subtle rotate
- underline
- short hover transition

避けるもの：

- 大きなparallax
- スクロール連動演出の多用
- 常時動く要素
- 派手なpage transition

`prefers-reduced-motion` を考慮します。

---

## Accessibility

デザインよりアクセシビリティを優先します。

最低限、

- semantic HTML
- keyboard accessibility
- visible focus
- sufficient color contrast
- meaningful alt text
- hoverに依存しない情報設計
- 適切なbutton / anchor要素

を維持します。

---

## Design Tokens

可能な限り、色・余白・文字サイズなどはDesign Tokenとして管理します。

例：

```css
--color-background
--color-surface
--color-text
--color-text-muted
--color-accent

--space-xs
--space-sm
--space-md
--space-lg
--space-xl

--radius-sm
--radius-md
```

同じ値を各コンポーネントに繰り返しハードコードしないようにします。

---

## What to Avoid

Calm Cornerでは、以下の方向性を基本的に避けます。

- WordPressテーマそのままのようなデザイン
- SaaS UI
- Dashboard UI
- excessive Bento Grid
- large rounded cards everywhere
- strong box shadows
- Glassmorphism
- gradients everywhere
- neon colors
- handwritten fonts everywhere
- excessive masking tape
- excessive scrapbook decoration
- heavy paper textures
- excessive animation
- UI that competes with content

---

## Decision Making

デザイン判断に迷った場合は、以下の順番で考えます。

1. 写真・文章が見やすいか
2. Calm Cornerらしい落ち着いた雰囲気か
3. 個人の趣味空間らしさがあるか
4. 操作や意味が分かりやすいか
5. 実装・保守が複雑になりすぎないか

「個性的だから」という理由だけで複雑なデザインを採用しないでください。

---

## Final Goal

Calm Cornerは、

**「ブログの記事一覧」ではなく、「誰かの趣味の机を覗いているような場所」**

を目指します。

ただし、その世界観はUIそのものを目立たせるためではありません。

最終的には、

**写真と文章を気持ちよく楽しめる、静かで少し個人的な空間**

になることを目指します。
