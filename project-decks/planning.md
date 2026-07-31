# LINPO LAB 独立项目页规划

## 目标

首页中的每个精选项目，都应该打开一个独立的 HTML-PPT 项目页。

这些项目页不是普通公司介绍 PPT，而是服务于个人作品集的案例证明页，需要展示：

- 设计判断
- 过程清晰度
- 系统思维
- 结果证据

项目页整体应与 `LINPO LAB` 的气质保持一致，但核心内容始终以项目证据为主。

## 实际生产 Skill

当前全域营销项目页主要由 `BWC Xixi PPT HTML` / `白无常` 工作流制作。

当前产物中的证据：

- HTML 标题：`全域营销平台体验升级 - BWC Xixi`
- HTML 字体：`BaiWuchangKeke`
- 运行时标记：`window.__BWC_XIXI_DECK__`
- 主题标签：`BWC BLACK`
- PPTX 导出脚本使用：`白无常可可体`

`xiaobai-html-ppt` 和 `guizang-ppt-skill` 都是有效的 PPT 相关 Skill，但它们不是当前全域营销项目页的主生产链路。后续可根据需要用于审查、迭代、流程约束或视觉参考。

## 当前单源文件

当前网页唯一编辑源：

- `linpolab/project-decks/quanyu/index.html`

PPT、图片生产和导出支持：

- `workspace/project-deck/quanyu/`

PPTX 导出路径和补图清单记录在：

- `workspace/project-deck/quanyu/PRODUCTION_PLAN.md`

## 生产流程

1. 使用 `ppt-content-structuring` Stage 1 先讨论项目框架，确认受众、目标、故事主线、页数和顺序。
2. 使用 `ppt-content-structuring` Stage 2 形成逐页页面规格，锁定文字区、图片槽、图片模式、图标和布局。
3. 使用 `BWC Xixi` 黑色 HTML deck 风格生产，固定模板层遵守 `TEMPLATE_SPEC.md`。
4. 保持 `linpolab/project-decks/quanyu/index.html` 为唯一网页编辑源，不在 workspace 保留第二份可编辑 HTML。
5. 可见文字使用 `BaiWuchangKeke` / `白无常可可体`。
6. 页面按固定 `1672 x 941` HTML 画布制作。
7. 本地 HTML 预览支持点击和键盘翻页。
8. 图片区域使用可替换的 `visual-slot` 占位容器。
9. 真实项目原图放入 workspace 的 `assets/images/originals/`，通过 `prepare-web-images.sh` 单向发布到网站目录。
10. 使用 `xiaobai-html-ppt` 验收 HTML 的阅读体验、模板一致性、图片行为和交互。
11. 文案和图片都确认后，再导出可编辑 PPTX，并做一次 HTML/PPTX 对齐验收。

## 当前约束

当前网页的 11 个图片槽均已接入素材，HTML 不再存在空占位槽。

当前未完成项是生产源和 PPTX 对齐：第 01、12 页尚未收口到 workspace 的 PPTX 图片源，另有部分网站发布图片与 workspace 加工图版本不一致。具体以 `workspace/project-deck/quanyu/PRODUCTION_PLAN.md` 为准。

后续新项目仍沿用以下占位策略：

- 保留 `data-slot-id`
- 保留 `fit_full` 等图片模式信息
- 在 HTML 中保留占位说明
- 只有当对应图片文件真实存在时，才启用 `data-asset`
- 未制作完成的图片不发起加载请求，避免部署后产生 404

## 图片槽位计划

缺失图片的完整清单以 `workspace/project-deck/quanyu/PRODUCTION_PLAN.md` 为准。

当前已知槽位：

- `hero-cover-visual`
- `design-system-board`
- `campaign-list-visual`
- `campaign-canvas-visual`
- `strategy-config-visual`
- `user-segmentation-visual`
- `analytics-dashboard-visual`
- `brand-experience-visual`
- `interface-showcase-visual`
- `cross-platform-visual`
- `mobile-immersive-visual`

当前 11 个槽位均已在网页中接入素材；第 07 页使用 `crop_top`，其余当前图片使用 `fit_full`。

## 首页接入规则

首页第一个项目卡片指向：

- `project-decks/quanyu/index.html`

后续项目卡片按同样方式接入：

- `project-decks/xiaohui-ai/index.html`
- `project-decks/points-system/index.html`

## 扩展规则

下一个项目页应优先复用 `BWC Xixi` deck 工作流，不要随意切换到另一套 PPT 系统。

保持同一套生产契约：

- 先讨论项目框架
- 再固定逐页页面规格
- 先做 HTML
- 先保留占位槽
- 后补真实图片
- 用小白做成稿验收
- 最后导出 editable PPTX
