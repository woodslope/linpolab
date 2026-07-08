# LINPO LAB 方法论与探索实验配图提示词

这份文档用于延展当前首页中「设计方法论」和「探索实验」区域的黑色视觉卡片。目标是保持同一套视觉语言：黑底、细线结构、紫蓝微光、抽象系统图、低调科技感。

## 使用原则

- 图片只负责视觉氛围和结构，不在图片里生成标题、说明文字、logo 或可读 UI 文案。
- 页面文字继续由 HTML 覆盖渲染，图片左上角需要保留暗部安全区。
- 方法论卡偏「概念模型、框架、系统图」，探索实验卡偏「未来工作台、生成流程、空间化界面」。
- 整体要克制，避免过亮、过炫、过游戏化。

## 推荐尺寸

- 方法论卡：`1100x733`，约 `3:2`。
- 探索实验卡：`1100x620` 或 `1100x587`，约 `16:9` 到 `1.87:1`。
- 如果使用 2K/4K 生成，保持同样比例即可。

## 通用母版

```text
A premium black visual card for LINPO LAB portfolio, deep near-black background, abstract design methodology diagram, fine white hairline geometry, subtle violet-blue luminous accents, glassy translucent layers, soft volumetric light, faint particle field, high contrast but restrained, minimal futuristic interface feeling, editorial tech aesthetic, clean composition, top-left dark negative space reserved for HTML title overlay, no readable text, no logo, no watermark, no human figure, no cartoon, no colorful gradient background, no excessive glow, no busy details.
```

## 中文母版

```text
为 LINPO LAB 作品集生成一张高级黑色视觉卡片，深黑近黑背景，抽象设计方法论图形，细白线几何结构，克制的紫蓝微光，半透明玻璃层、轻微体积光、稀疏粒子场，高对比但不炫目，带有理性、编辑化、科技感的视觉语言。画面左上角保留暗色留白，方便网页叠加标题。不生成可读文字、不生成 logo、不生成水印、不出现人物、不出现卡通风、不使用彩色大渐变、不使用过强霓虹光、不堆满细节。
```

## 负面约束

```text
readable text, typography, logo, watermark, brand mark, UI labels, human portrait, character, mascot, cartoon, anime, bright white background, colorful rainbow gradient, cyberpunk city, gaming HUD, excessive neon, heavy bloom, low resolution, blurry, noisy compression, messy composition, stock photo style
```

## 方法论卡模板

### 1. 提示框架 Prompt Framework

```text
A premium black visual card showing an abstract prompt framework system, central dark glass orb connected to multiple small nodes, radial network diagram, fine white lines, subtle violet-blue light pulses, small translucent interface panels in the background, deep near-black canvas, restrained glow, editorial tech mood, top-left dark negative space for title overlay, no readable text, no logo.
```

### 2. 视觉逆向系统 Visual Reverse System

```text
A premium black visual card showing a visual reverse engineering system, stacked translucent glass planes floating in depth, each layer connected by thin white guide lines, faint analysis grid, subtle violet-blue core light between layers, near-black background, precise technical diagram feeling, minimal and refined, top-left dark negative space for title overlay, no readable text, no logo.
```

### 3. AI 设计方法框架 AI Design Method Framework

```text
A premium black visual card showing an AI design method framework, circular system map with several orbiting nodes, fine hairline rings, small connected modules, dim violet-blue luminous center, faint dotted construction grid, deep black background, analytical and elegant, restrained glow, top-left dark negative space for title overlay, no readable text, no logo.
```

### 4. 设计到代码工作流 Design to Code Workflow

```text
A premium black visual card showing a design to code workflow, abstract flow from interface blocks to modular code panels, floating dark glass rectangles, thin connecting arrows and node points, subtle violet-blue highlights, technical but not busy, deep near-black background, refined product-design atmosphere, top-left dark negative space for title overlay, no readable text, no logo.
```

## 探索实验卡模板

### 1. 动态变量提示词管理 Dynamic Prompt Variable Management

```text
A wide premium black visual card showing dynamic prompt variable management, abstract variable nodes arranged in a three-dimensional network, flowing blue-violet data curves, small dark interface panels floating at the side, fine white guide lines, deep black background, experimental AI workflow feeling, restrained cinematic glow, top-left dark negative space for title overlay, no readable text, no logo.
```

### 2. 文章内容视觉化生成 Article Content Visualization Generation

```text
A wide premium black visual card showing article content visualization generation, sheets of text transformed into abstract visual boards, translucent panels unfolding in space, luminous white-violet typographic blocks as abstract shapes only, vertical light beams, deep black background, refined editorial AI atmosphere, top-left dark negative space for title overlay, no readable text, no logo.
```

### 3. 详情页策划工作台 Detail Page Planning Workspace

```text
A wide premium black visual card showing a detail page planning workspace, floating product page wireframes and planning boards in perspective, dark glass UI panels, connected route lines, small purple-blue map pins and nodes, fine white construction lines, deep black background, advanced design operations feeling, top-left dark negative space for title overlay, no readable text, no logo.
```

## 新主题扩展模板

把 `{主题}`、`{核心隐喻}`、`{结构元素}` 替换成新的主题即可：

```text
A premium black visual card for {主题}, using {核心隐喻} as the main visual metaphor, composed with {结构元素}, fine white hairline geometry, translucent glass layers, subtle violet-blue luminous accents, deep near-black background, faint particle field, restrained editorial tech aesthetic, clean composition, top-left dark negative space reserved for HTML title overlay, no readable text, no logo, no watermark, no human figure, no cartoon, no excessive glow.
```

示例：

```text
A premium black visual card for AI brand consistency audit, using a constellation of brand assets as the main visual metaphor, composed with circular audit rings, floating token chips, and connected evidence nodes, fine white hairline geometry, translucent glass layers, subtle violet-blue luminous accents, deep near-black background, faint particle field, restrained editorial tech aesthetic, clean composition, top-left dark negative space reserved for HTML title overlay, no readable text, no logo, no watermark, no human figure, no cartoon, no excessive glow.
```

## 风格关键词

```text
near-black background, premium black card, editorial tech, abstract system diagram, fine white hairlines, radial graph, floating glass layers, translucent panels, violet-blue accent light, restrained glow, soft volumetric light, sparse particles, technical grid, design methodology, AI workflow, clean composition
```

## 不建议加入的词

```text
cyberpunk, neon city, hologram overload, rainbow gradient, cute robot, anime, cartoon mascot, realistic dashboard screenshot with readable labels, giant logo, big typography inside image, stock photo, bright office, blue-purple gradient background
```

## 页面落图检查

- 缩略显示时，主体结构仍然可识别。
- 左上角标题区域不能太亮，避免压住 HTML 文案。
- 一组图放在一起时，黑色底色、紫蓝光、线框密度要统一。
- 方法论卡不要太像海报，实验卡可以更有空间感和动态感。
- 如果生成图里出现可读英文、伪中文、logo 或水印，直接重生成。
