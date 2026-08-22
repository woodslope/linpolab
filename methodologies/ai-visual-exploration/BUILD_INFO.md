# 让 AI 视觉探索变得可控｜构建信息

- 生产 Skill：`linpolab-methodology-page`，首页聚合由 `linpolab-home` 负责。
- 输入：确认后的 `03-让 AI 视觉探索变得可控.md`、VisPath 实验页面及四张现有界面证据图。
- 输出：独立方法论内容包，包含 `manifest.json`、`PAGE_SPEC.md`、`BUILD_INFO.md`、`index.html` 与 `assets/images/`。
- 资源状态：图片来自 `experiments/vispath/assets/images/` 的本地界面截图；原始采集时间、路由和源版本未知，文章只描述截图中可见的界面能力，不将其表述为当前线上实机结果。
- 运行时：无共享运行时；页面样式内联，使用系统字体。
- 设计规范：沿用已验证的单栏长文章排版基线，不使用探索实验 Hero、section bands、框架卡片、目录或复杂流程组件。
- 验收：运行方法论静态审计、内容包注册与审计，并检查 `1440 / 1280 / 1024 / 768 / 390` 五档视口。
