# 首页响应式图片

部署图片由 `tools/build-home-media.py` 生成，请勿手动编辑本目录的图片文件。

## 更换图片

1. 在 `../resources/source-images/linpolab/home-generated/` 中替换同名源文件。
2. 运行：

   ```bash
   python3 tools/build-home-media.py
   ```

脚本会生成 WebP 与 JPEG 回退版本，并自动更新 `index.html` 中的媒体缓存版本。若只想确认图片和版本是否一致，运行：

```bash
python3 tools/build-home-media.py --check
```

源文件名、输出尺寸和压缩质量由 `tools/build-home-media.py` 中的 `MEDIA` 配置维护。替换时尽量保持原图宽高比例；若主体位置变化，再调整首页对应图片标签上的 `--media-position`。
