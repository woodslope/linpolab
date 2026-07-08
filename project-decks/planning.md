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

当前可编辑源文件：

- `project-deck-workspace/全域营销平台/quanyu_bwc_xixi_black.html`

当前部署副本：

- `linpolab/project-decks/omni-marketing-platform/index.html`

PPTX 导出路径和补图清单记录在：

- `project-deck-workspace/全域营销平台/PRODUCTION_PLAN.md`

## 生产流程

1. 使用 `BWC Xixi` 黑色 HTML deck 风格作为基础。
2. 保持 HTML deck 为唯一可编辑源。
3. 可见文字使用 `BaiWuchangKeke` / `白无常可可体`。
4. 页面按固定 `1672 x 941` HTML 画布制作。
5. 本地 HTML 预览支持点击和键盘翻页。
6. 图片区域使用可替换的 `visual-slot` 占位容器。
7. 真实项目图片按约定文件名放入 `assets/images/`。
8. 先确认 HTML 预览效果。
9. 文案和图片都确认后，再导出可编辑 PPTX。

## 当前约束

目前可靠的最终项目图片还不完整。

因此当前 deck 会保留未完成视觉的占位槽位。

占位策略：

- 保留 `data-slot-id`
- 保留 `fit_full` 等图片模式信息
- 在 HTML 中保留占位说明
- 只有当对应图片文件真实存在时，才启用 `data-asset`
- 未制作完成的图片不发起加载请求，避免部署后产生 404

## 图片槽位计划

缺失图片的完整清单以 `project-deck-workspace/全域营销平台/PRODUCTION_PLAN.md` 为准。

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

当前只有 `campaign-list-visual` 已经有真实图片。

## 首页接入规则

首页第一个项目卡片指向：

- `project-decks/omni-marketing-platform/index.html`

后续项目卡片按同样方式接入：

- `project-decks/xiaohui-ai/index.html`
- `project-decks/points-system/index.html`

## 扩展规则

下一个项目页应优先复用 `BWC Xixi` deck 工作流，不要随意切换到另一套 PPT 系统。

保持同一套生产契约：

- 先做 HTML
- 先保留占位槽
- 后补真实图片
- 最后导出 editable PPTX
