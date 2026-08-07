# LINPO LAB 仓库地图

## 公开路由与内容包

| 路由 | 内容包 | 类型 | 首页入口 |
| --- | --- | --- | --- |
| `/` | `./` | 首页 | 自身 |
| `/projects/quanyu/` | `projects/quanyu/` | 项目 Deck | 项目 01 |
| `/projects/xiaohui/` | `projects/xiaohui/` | 项目 Deck | 项目 02 |
| `/projects/jifen/` | `projects/jifen/` | 项目 Deck | 项目 03 |
| `https://woodslope.github.io/h5/` | 独立仓库 `woodslope/h5` | H5 归档 | 项目 04 |
| `/experiments/moreimg/` | `experiments/moreimg/` | 探索实验 | 实验 02 |
| `/experiments/prompthub/` | `experiments/prompthub/` | 探索实验 | 实验 03 |
| `/experiments/vispath/` | `experiments/vispath/` | 探索实验 | 实验 04 |
| `/experiments/leekquant/` | `experiments/leekquant/` | 探索实验 | 实验 05 |
| `/experiments/dailyglance/` | `experiments/dailyglance/` | 探索实验 | 实验 06 |

H5 归档已移出本仓库，LINPO LAB 仅维护首页外部入口，不再登记其播放器和案例资源。

## 目录职责

| 路径 | 职责 | 边界 |
| --- | --- | --- |
| `index.html` + `manifest.json` | 首页内容包 | 由首页 Skill 产出；负责展示已注册内容的入口 |
| `projects/<slug>/` | 项目 Deck 包 | 保留项目自己的 HTML、CSS、JS 和素材 |
| `experiments/<slug>/` | 探索实验包 | 页面和 `assets/` 自包含；可引用 Skill 管理的稳定运行时 |
| `methodologies/_template/` | 方法论产包模板 | 不是发布内容，不进入注册表 |
| `docs/` | 长期契约文档 | 不存放生成产物 |
| `scripts/` | 注册与审计工具 | 不嵌入项目视觉实现 |
| `runtimes/` | 可选、版本化共享运行时登记 | 只能登记 Skill 明确管理的稳定运行时 |

## 上传与清理边界

- 纳入仓库：内容包、包级元数据、正式共享资源、注册表、脚本、契约文档。
- 不纳入：浏览器缓存、临时截图、构建报告、备份、私密数据。
- `content-registry.json` 是脚本生成文件；不要手工修改。
- 新增长期文档时，先在 `README.md` 与本文件登记其唯一职责。
