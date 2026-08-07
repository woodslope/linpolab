#!/usr/bin/env python3
"""Generate responsive homepage media from stable, replaceable source files.

Replace a source file with the same name in
../resources/source-images/linpolab/home-generated/, then run this script.
It refreshes the deployable variants in assets/home-media/ and bumps the
homepage media cache version in index.html.
"""

from __future__ import annotations

import argparse
import hashlib
import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
SOURCE_ROOT = ROOT.parent / "resources" / "source-images" / "linpolab" / "home-generated"
OUTPUT_ROOT = ROOT / "assets" / "home-media"
INDEX_PATH = ROOT / "index.html"

MEDIA = (
    ("hero-framework", "linpo-hero-right.png", (640, 768, 1100), 80),
    ("project-quanyu", "project-marketing-dashboard-banner.jpg", (640, 800, 960, 1200), 80),
    ("project-xiaohui", "project-xiaohui-ai-banner.jpg", (640, 800, 960, 1200), 80),
    ("project-jifen", "project-loyalty-system-banner.jpg", (640, 800, 960, 1200), 80),
    ("method-prompt", "method-prompt-framework-monond-v1.png", (480, 800), 78),
    ("method-visual-reverse", "method-visual-reverse-system-monond-v1.png", (480, 800), 78),
    ("method-ai-framework", "method-ai-framework-monond-v1.png", (480, 800), 78),
    ("method-design-code", "method-design-to-code-monond-v1.png", (480, 800), 78),
    ("experiment-workbench", "experiment-urban-guide-agent-monond-v1.png", (480, 800, 960), 78),
    ("experiment-leekquant", "experiment-leekquant.jpg", (480, 800, 960), 78),
    ("experiment-dailyglance", "experiment-dailyglance.png", (480, 800, 960), 78),
    ("experiment-moreimg", "experiment-moreimg.png", (480, 800, 960), 78),
    ("experiment-prompthub", "experiment-prompthub.png", (480, 800, 960), 78),
    ("experiment-vispath", "experiment-vispath.png", (480, 800, 960), 78),
    ("about-portrait", "linpo-about-portrait.png", (480, 760), 80),
)


def source_version() -> str:
    digest = hashlib.sha256()
    for _, source_name, _, _ in MEDIA:
        source_path = SOURCE_ROOT / source_name
        if not source_path.is_file():
            raise FileNotFoundError(f"Missing homepage source image: {source_path}")
        digest.update(source_name.encode("utf-8"))
        digest.update(source_path.read_bytes())
    return f"home-{digest.hexdigest()[:12]}"


def resize_image(source_path: Path, width: int) -> Image.Image:
    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        target_width = min(width, image.width)
        target_height = round(image.height * target_width / image.width)
        if image.size != (target_width, target_height):
            image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        return image.copy()


def build_media() -> list[Path]:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    generated: list[Path] = []
    media_ids = {media_id for media_id, _, _, _ in MEDIA}

    for path in OUTPUT_ROOT.iterdir():
        if path.suffix not in {".jpg", ".webp"}:
            continue
        if any(path.name.startswith(f"{media_id}-") for media_id in media_ids):
            path.unlink()

    for media_id, source_name, widths, quality in MEDIA:
        source_path = SOURCE_ROOT / source_name
        for width in widths:
            image = resize_image(source_path, width)
            webp_path = OUTPUT_ROOT / f"{media_id}-{width}.webp"
            jpeg_path = OUTPUT_ROOT / f"{media_id}-{width}.jpg"
            image.save(webp_path, "WEBP", quality=quality, method=6)
            image.save(jpeg_path, "JPEG", quality=quality, optimize=True, progressive=True)
            generated.extend((webp_path, jpeg_path))
    return generated


def update_cache_version(version: str) -> bool:
    html = INDEX_PATH.read_text(encoding="utf-8")
    if f'data-media-version="{version}"' in html and f'?v={version}' in html:
        return False
    updated = re.sub(r'data-media-version="[^"]+"', f'data-media-version="{version}"', html)
    updated = re.sub(r'([?&]v=)home-[a-z0-9]+', rf'\g<1>{version}', updated)
    if updated == html:
        raise RuntimeError("Could not find homepage media version markers in index.html")
    INDEX_PATH.write_text(updated, encoding="utf-8")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verify source files and generated output without writing.")
    args = parser.parse_args()

    version = source_version()
    if args.check:
        missing = [
            OUTPUT_ROOT / f"{media_id}-{width}.{extension}"
            for media_id, _, widths, _ in MEDIA
            for width in widths
            for extension in ("webp", "jpg")
            if not (OUTPUT_ROOT / f"{media_id}-{width}.{extension}").is_file()
        ]
        if missing:
            raise FileNotFoundError("Missing generated homepage media:\n" + "\n".join(map(str, missing)))
        html = INDEX_PATH.read_text(encoding="utf-8")
        if f'data-media-version="{version}"' not in html:
            raise RuntimeError("Homepage media is stale. Run tools/build-home-media.py.")
        print(f"Homepage media is current ({version}).")
        return

    generated = build_media()
    update_cache_version(version)
    total_kb = sum(path.stat().st_size for path in generated) / 1024
    print(f"Generated {len(generated)} homepage variants ({total_kb:.0f} KB, {version}).")


if __name__ == "__main__":
    main()
