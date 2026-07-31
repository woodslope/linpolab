# LINPO LAB Home Deployment Scope

本文档用于发布前文件收口，约束 `linpolab` 主项目当前首页和已接入内容页的部署范围。

## 当前发布入口

- 首页入口：`index.html`
- 正式站点地址：`https://linpolab.com/`
- 公开部署策略：只部署运行时文件。
- 本地预览：`python3 -m http.server 4173`
- 预览地址：`http://localhost:4173/`

## 运行时必须发布

首页本体：

- `index.html`
- `assets/case-page-system.css`
- `assets/optimized/`

当前首页已接入的项目页：

- `project-decks/quanyu/index.html`
- `project-decks/quanyu/assets/fonts/`
- `project-decks/quanyu/assets/images/quanyu-02.png`
- `project-decks/quanyu/assets/images/quanyu-05.png`
- `project-decks/quanyu/assets/images/quanyu-06.png`
- `project-decks/quanyu/assets/images/quanyu-07.png`
- `project-decks/quanyu/assets/images/quanyu-08.png`
- `project-decks/quanyu/assets/images/quanyu-09.png`
- `project-decks/quanyu/assets/images/quanyu-10.png`
- `project-decks/quanyu/assets/images/quanyu-13.png`
- `projects/h5-archive/index.html`
- `projects/h5-archive/viewer.html`
- `projects/h5-archive/thumbs/`
- `projects/h5-archive/diazo/player-dist/`
- `projects/h5-archive/diazo/epub360player/google-fonts.css`
- `projects/h5-archive/thirdparty/animate/animate.min.css`
- `projects/h5-archive/cases/` 中入口已启用的 10 个本地案例
- `staticfs2/public/assets/alert.png`

当前首页已接入的实验页：

- `experiments/moreimg/index.html`
- `experiments/prompthub/index.html`
- `experiments/leekquant/index.html`
- `experiments/dailyglance/index.html`
- `experiments/vispath/index.html`
- `assets/exploration-page-system.css`
- `assets/exploration-default-layout.css`
- `assets/exploration-page-style-base.css`
- `assets/exploration-default-style.css`
- `assets/exploration-page-system.js`
- `assets/hero-canvas-controller.js`
- `assets/visual-direction-runtime.js`
- `assets/cases/moreimg/`
- `assets/cases/prompthub/`
- `assets/cases/leek-strategy/`
- `assets/cases/dailyglance/`
- `assets/cases/vispath/`

需要保留的兼容跳转入口：

- `experiments/moreimg-v2/index.html`
- `experiments/prompthub-v2/index.html`
- `experiments/leekquant-v2/index.html`
- `experiments/dailyglance-v2/index.html`
- `experiments/leek-strategy-lab/index.html`
- `experiments/moreimg-luminous-live/index.html`

说明：

- 首页主体图片使用 `assets/optimized/`，实验卡片缩略图同时引用对应的 `assets/cases/` 目录。
- 首页共享样式引用 `assets/case-page-system.css`。
- 当前项目页 favicon 也引用 `assets/optimized/linpo-hero-avatar-192.png`。
- 首页 SEO 分享图引用 `assets/optimized/linpo-og-image-1200x630.jpg`。
- 当前 canonical、Open Graph 和 Twitter Card URL 使用正式域名 `https://linpolab.com/`。
- H5 归档入口、播放器、封面和案例资源均使用相对路径，可在 GitHub Pages 仓库子路径中运行。
- 旧播放器按需加载的 33 个 Epub360 JS/CSS chunk 已归档到共享 `diazo/player-dist/`，10 个案例不再依赖 Epub360 CDN 加载播放器模块。
- `zhuoyue` 未接入归档入口，不进入公开部署范围。
- `*.remote.*`、`asset-urls.txt` 和归档脚本是抓取过程文件，不进入公开部署范围。
- 当前项目页需要 `BaiWuchangKeke` 三个字体文件，否则项目页字体会退回系统字体。
- 当前项目页启用 8 张真实项目图：`quanyu-02.png`、`quanyu-05.png` 至 `quanyu-10.png`，以及 `quanyu-13.png`。
- 五个探索实验页发布正式无后缀 HTML、共享 CSS/JS 与页面引用图片；六个旧入口只保留兼容跳转。

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

以下路径位于 `linpolab` 外部，当前不应纳入本次首页发布包：

- `../qa/codex-artifacts/`
- `../deliverables/docs/`
- `../backups/linpo-lab-home-v1/`（V1 历史备份）
- `../backups/linpo-lab-home-v2/`（V2 当前备份）
- `../deliverables/outputs/`
- `../workspace/project-deck/`
- `../resources/source-images/`
- `../resources/portfolio-wall/quanyu-marketing-portfolio-wall-2x3-clear-hq.png`

## 当前体积判断

- 首页运行时图片：约 `1.3M`
- 已接入项目页：约 `11M`
- 原始生成图：约 `15M`，当前运行时不需要

如果只发布首页和当前已接入项目页，重点体积来自项目页字体文件。

## 发布前验证

在 `linpolab` 目录下运行：

```bash
zsh scripts/audit-h5-runtime.sh
python3 -m http.server 4173
```

然后检查：

- `http://localhost:4173/` 返回 `200`
- `http://localhost:4173/project-decks/quanyu/index.html?v=20260708-4` 返回 `200`
- `http://localhost:4173/projects/h5-archive/index.html` 返回 `200`
- `http://localhost:4173/projects/h5-archive/viewer.html?case=yanlan` 返回 `200`
- H5 归档 10 张封面和 10 个案例入口均返回 `200`
- 五个 `experiments/{slug}/index.html` 返回 `200`，并能返回首页 `#experiments`
- 四个旧 `experiments/{slug}-v2/index.html` 能跳转到对应无后缀正式路径
- `experiments/leek-strategy-lab/` 与 `experiments/moreimg-luminous-live/` 能跳转到对应正式路径
- `assets/optimized/` 中所有首页图片返回 `200`
- `assets/optimized/linpo-og-image-1200x630.jpg` 尺寸为 `1200 x 630`
- 项目页字体文件和 `quanyu-02.png`、`quanyu-05.png` 至 `quanyu-10.png`、`quanyu-13.png` 返回 `200`
- `1280 / 1024 / 768 / 620 / 390px` 无横向溢出
- 导航锚点、邮箱链接和 Back to Top 可用

## Git 收口建议

提交或上传前先确认清单：

公开站点应上传：

- 运行时必须发布文件

GitHub 展示仓库可保留：

- `.gitignore`

本地保留，不上传 GitHub：

- 维护文档和生产说明，除非用户明确要求公开
- `assets/hero-motion-presets.json`（首屏动效语义清单，不是页面运行依赖）
- `assets/generated/`
- `prompts/`
- `regression/`（本地回归截图和浏览器审计结果）
- 上层目录中的过程素材、输出图、工作区和临时报告
- H5 归档中的 `*.remote.*`、资源抓取清单、归档脚本和未接入的 `zhuoyue`

需要用户确认：

- 是否现在就提交或只保留本地工作区
