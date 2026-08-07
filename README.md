# LINPO LAB

LINPO LAB 是 Linpo Wu 的设计作品集。网站内容按可独立交付的 Skill 输出包管理；仓库只维护内容包契约、内容注册、首页聚合与统一审计。

## 快速开始

```bash
node scripts/build-content-registry.mjs
node scripts/audit-content-packages.mjs
```

静态站点可直接以仓库根目录作为预览根目录；仓库内公开路径保持为 `index.html`、`projects/<slug>/index.html` 与 `experiments/<slug>/index.html`。H5 归档独立部署在 `https://woodslope.github.io/h5/`。

## 文档地图

| 文件 | 唯一职责 | 何时读取 |
| --- | --- | --- |
| `AGENTS.md` | AI 入口与硬约束 | 每个改动前 |
| `CURRENT_STATUS.md` | 当前阶段与交接 | 新对话或继续任务 |
| `REPO_MAP.md` | 路由、目录与文件边界 | 改动结构或路径前 |
| `docs/SKILL_OUTPUT_CONTRACT.md` | 内容包格式与注册规则 | 新增或变更内容包时 |
| `content-registry.json` | 已注册内容的机器可读索引 | 首页聚合、脚本或工具读取 |

## 内容包类型

- 首页：仓库根目录。
- 项目 Deck：`projects/<slug>/`。
- 探索实验：`experiments/<slug>/`。
- H5 归档：独立仓库 `woodslope/h5`，首页只保留外部入口。
- 方法论：`methodologies/_template/` 是尚未发布内容的 Skill 产包模板；有经确认的文章或材料后再创建实际包并注册。

## 生产链路

- 首页：`linpolab-home` Skill。
- 项目 Deck：`linpolab-project-workflow` → `BWC-XIXI-PPT-HTML`。
- 探索实验和方法论：`linpolab-content-page`。

不要把上述各 Skill 的页面视觉实现混入仓库的全局层。共享运行时仅可按 `docs/SKILL_OUTPUT_CONTRACT.md` 的规则使用。
