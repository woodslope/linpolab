# LINPO LAB 协作入口

## 读取顺序

1. `CURRENT_STATUS.md`：当前阶段、未完成事项与最近验证。
2. `docs/SKILL_OUTPUT_CONTRACT.md`：新增或调整内容包时的硬契约。
3. `REPO_MAP.md`：目录职责、公开路由与文件边界。
4. 当前内容包的 `manifest.json`、`PAGE_SPEC.md`、`BUILD_INFO.md` 与 `index.html`。

## 硬约束

- 当前 Git 工作树含用户改动；不得重置、覆盖、提交或移动无关文件。
- 首页、项目、探索实验、方法论均为对应 Skill 的内容包产物。仓库只负责契约、注册、首页聚合与审计。
- 内容包默认自包含。不得为了统一性把项目级 CSS、JS 或视觉细节抽到全局。
- 只有由对应 Skill 明确管理、具备稳定 ID 和版本号的运行时可被多个内容包共享。
- 保持已发布路由与视觉效果。H5 归档已独立到 `woodslope/h5`，本仓库只维护首页外部入口，不回引其运行时资源。

## 常用命令

```bash
node scripts/build-content-registry.mjs
node scripts/audit-content-packages.mjs
```

详细边界见 `REPO_MAP.md`；当前任务状态见 `CURRENT_STATUS.md`。
