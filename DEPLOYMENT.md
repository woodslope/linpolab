# LINPO LAB Home Deployment Scope

本文档用于发布前文件收口，约束 `linpo-lab-home-v1` 当前首页和已接入项目页的部署范围。

## 当前发布入口

- 首页入口：`index.html`
- 正式域名：`https://linpolab.com/`
- 公开部署策略：只部署运行时文件。
- 本地预览：`python3 -m http.server 4173`
- 预览地址：`http://localhost:4173/`

## 运行时必须发布

首页本体：

- `index.html`
- `assets/optimized/`

当前首页已接入的项目页：

- `project-decks/omni-marketing-platform/index.html`
- `project-decks/omni-marketing-platform/assets/fonts/`
- `project-decks/omni-marketing-platform/assets/images/campaign-list-page.png`

当前首页已接入的实验页：

- `experiments/moreimg-v2/index.html`
- `experiments/prompthub-v2/index.html`
- `experiments/leekquant-v2/index.html`
- `experiments/dailyglance-v2/index.html`
- `assets/exploration-page-system.css`
- `assets/exploration-default-layout.css`
- `assets/exploration-page-style-base.css`
- `assets/exploration-default-style.css`
- `assets/cases/moreimg/`
- `assets/cases/prompthub/`
- `assets/cases/leek-strategy/`
- `assets/cases/dailyglance/`

说明：

- 首页只引用 `assets/optimized/`。
- 当前项目页 favicon 也引用 `assets/optimized/linpo-hero-avatar-192.png`。
- 首页 SEO 分享图引用 `assets/optimized/linpo-og-image-1200x630.jpg`。
- 当前 canonical、Open Graph 和 Twitter Card URL 使用已确认正式域名 `https://linpolab.com/`。
- 当前项目页需要 `BaiWuchangKeke` 三个字体文件，否则项目页字体会退回系统字体。
- 当前项目页只启用一张真实项目图：`campaign-list-page.png`。
- 四个探索实验页只发布 HTML、共享 CSS 与页面引用图片，不发布 Cards、Prompts、production 记录或截图 manifest。

## 建议一起保留的维护文档

- `DEPLOYMENT.md`
- `DESIGN_SPEC.md`
- `assets/README.md`
- `project-decks/README.md`
- `project-decks/planning.md`

这些文件不影响网页运行，但用于后续维护设计规范、资源规则和项目页生产流程。

## 源文件保留但不公开部署

- `assets/generated/`
- `prompts/visual-card-prompts.md`

说明：

- `assets/generated/` 是原始生成图和源素材，当前运行时不需要。
- `prompts/visual-card-prompts.md` 是生产过程资料，不是页面运行依赖。
- 已确认公开站点只部署运行时文件，不带这两项。
- 如果希望保留完整创作源文件，可以放在源码仓库或本地工作区，但不放进公开静态站点部署包。

## 不属于本次首页发布范围

以下路径位于 `linpo-lab-home-v1` 外部，当前不应纳入本次首页发布包：

- `../.codex-artifacts/`
- `../docs/`
- `../linpolab/`
- `../outputs/`
- `../project-deck-workspace/`
- `../素材图/`
- `../quanyu-marketing-portfolio-wall-2x3-clear-hq.png`

## 当前体积判断

- 首页运行时图片：约 `1.3M`
- 已接入项目页：约 `11M`
- 原始生成图：约 `15M`，当前运行时不需要

如果只发布首页和当前已接入项目页，重点体积来自项目页字体文件。

## 发布前验证

在 `linpo-lab-home-v1` 目录下运行：

```bash
python3 -m http.server 4173
```

然后检查：

- `http://localhost:4173/` 返回 `200`
- `http://localhost:4173/project-decks/omni-marketing-platform/index.html?v=20260708-4` 返回 `200`
- 四个 `experiments/*-v2/index.html` 返回 `200`，并能返回首页 `#experiments`
- `assets/optimized/` 中所有首页图片返回 `200`
- `assets/optimized/linpo-og-image-1200x630.jpg` 尺寸为 `1200 x 630`
- 项目页字体文件和 `campaign-list-page.png` 返回 `200`
- `1280 / 1024 / 768 / 620 / 390px` 无横向溢出
- 导航锚点、邮箱链接和 Back to Top 可用

## Git 收口建议

提交或上传前先确认清单：

公开站点应上传：

- 运行时必须发布文件

源码仓库可保留但不公开部署：

- 建议一起保留的维护文档
- `.gitignore`
- `assets/generated/`
- `prompts/`

公开站点不上传：

- `assets/generated/`
- `prompts/`
- 上层目录中的过程素材、输出图、工作区和临时报告

需要用户确认：

- 是否现在就提交或只保留本地工作区
