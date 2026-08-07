# 当前状态

- 阶段：内容包体系重构完成，待后续内容生产使用。
- 基线：2026-08-05 工作树中已有用户暂存和未暂存改动；无关改动未被重置、覆盖、提交或迁移。
- 已完成：首页、3 个 Deck 与 5 个探索实验按内容包契约管理；H5 归档已迁出为独立 `woodslope/h5` 项目，首页改为外部入口；注册表、审计脚本与方法论模板已建立。
- 当前方法论：首页只有 4 张未链接的概览卡，没有可核验的详情正文或既有 URL，因此未虚构发布页。后续由 `linpolab-content-page` 依据确认材料创建 `methodologies/<slug>/` 后注册。

## 下一步

1. 有方法论原始内容时，按 `methodologies/_template/` 创建真实内容包，运行注册和审计，并在首页明确更新入口。
2. Deck 或探索实验改版时，先改其包内 `PAGE_SPEC.md` / `BUILD_INFO.md`，再由对应 Skill 生成或更新页面。
3. 调整首页卡片或路由后，重新生成 `content-registry.json` 并运行审计。

## 最近验证

- `node scripts/build-content-registry.mjs`：通过，生成 9 个已发布或归档内容包。
- `node scripts/audit-content-packages.mjs`：通过，首页可见入口、包必需文件、运行时登记和注册表一致。
- `node --check scripts/build-content-registry.mjs` 与 `node --check scripts/audit-content-packages.mjs`：通过。
- H5 独立站本地检查：总览 10 张案例卡正常，代表案例成功加载 25 页，无浏览器控制台错误。
- `quick_validate.py /Users/wulinpo/.codex/skills/linpolab-home`：通过。
- `skill-edit/scripts/check.sh`：`linpolab-content-page`、`linpolab-project-workflow` 均通过。
