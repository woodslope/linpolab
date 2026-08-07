# LINPO LAB Skill 输出包契约

## 目的

每一个公开内容都由负责它的 Skill 生成并以独立内容包交付。仓库不重写 Skill 的项目视觉，只维护包的最小接口、注册表和跨包审计。

## 必需文件

```text
<package>/
├── manifest.json
├── PAGE_SPEC.md
├── BUILD_INFO.md
├── index.html
└── assets/
```

- `manifest.json`：机器可读身份、公开路由、生产 Skill、首页聚合与运行时声明。
- `PAGE_SPEC.md`：内容目标、页面职责、证据或素材边界；不是视觉样式拆解。
- `BUILD_INFO.md`：当前产物来源、生成方式、可复现命令与验收边界。
- `index.html`：该包的可发布入口。
- `assets/`：包内可发布素材。

## manifest 规范

```json
{
  "schemaVersion": 1,
  "id": "experiment:example",
  "type": "experiment",
  "slug": "example",
  "title": "示例",
  "route": "experiments/example/index.html",
  "entry": "index.html",
  "status": "published",
  "producer": { "skill": "linpolab-content-page", "kind": "exploration" },
  "homepage": { "section": "experiments", "order": 7, "visible": true },
  "runtime": null
}
```

`id`、`route` 和 `slug` 必须稳定且唯一。`route` 必须相对仓库根目录，`entry` 必须是包内路径。`status` 只能是 `published`、`draft`、`archived` 或 `template`。只有 `published` 或 `archived` 才进入注册表。

## 自包含与运行时

1. 默认将页面的 CSS、JS、字体和素材保留在内容包内。
2. 不得为这次重构人工抽离项目级 CSS、JS 或视觉组件。
3. 只有 Skill 明确管理、可跨页稳定复用的运行时可共享；在 `manifest.runtime` 中写明 `id`、`version`、`ownerSkill` 与路径。
4. 共享运行时登记在 `runtimes/<runtime-id>/README.md`，版本号不可省略。包不依赖运行时时 `runtime` 为 `null`。

当前唯一已登记的共享运行时是探索页的 `exploration-default@20260714`，由 `linpolab-content-page` 生产链路维护。它对应现有 `assets/exploration-*.css`、`assets/exploration-page-system.js` 和生成脚本；本次不会移动这些已发布资源。

## 首页聚合

首页只消费 `content-registry.json` 的条目身份与入口信息。视觉文案、卡片样式、项目图片和页面代码仍由首页 Skill 管理，不由注册表反向生成。

`homepage.visible` 为 `true` 的包必须在首页中有对应入口；首页中存在的内容入口也必须能在注册表中找到。同一个内容可保留查询串版本号，审计时以 URL pathname 比对。

## 新增包流程

1. 选择负责该类型的 Skill，先完成其内容生产流程。
2. 从同类型包或 `methodologies/_template/` 建立包目录；不要复制其他项目的视觉实现。
3. 创建五项必需文件，填写稳定 `id` 与实际 `route`。
4. 如有共享运行时，确认它受生产 Skill 管理且声明稳定版本；否则保留包内资源。
5. 更新首页入口（仅在确实需要展示时）。
6. 运行 `node scripts/build-content-registry.mjs`。
7. 运行 `node scripts/audit-content-packages.mjs`，通过后再交付。

## 外部归档入口

H5 归档不属于本仓库内容包，不进入 `content-registry.json`。首页可以维护经确认的外部发布地址，但不引入对方运行时资源。
