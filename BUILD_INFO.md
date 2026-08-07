# 首页构建信息

- 生产 Skill：`linpolab-home`。
- 入口：`index.html`。
- 依赖：`assets/` 内的首页专用素材；无共享运行时依赖。
- 聚合数据：`content-registry.json` 由 `node scripts/build-content-registry.mjs` 生成，当前首页仍保留 Skill 产出的静态卡片文案和视觉。
- 更新：首页入口或内容可见性变化后，重建注册表并运行内容包审计。
- 媒体构建：替换 `../resources/source-images/linpolab/home-generated/` 中的同名源图后运行 `python3 tools/build-home-media.py`。脚本会生成 WebP/JPEG 响应式版本至 `assets/home-media/`，并更新首页媒体缓存版本；可使用 `--check` 校验是否需要重建。
