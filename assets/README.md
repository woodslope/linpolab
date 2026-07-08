# Homepage image assets

`assets/generated/` keeps source generated images. `index.html` uses deployment-ready cuts from `assets/optimized/`.

Do not overwrite generated source images during homepage tuning. Create an optimized cut first, then update the homepage reference.

## Runtime files

| File | Homepage placement |
| --- | --- |
| `optimized/linpo-hero-avatar-192.png` | Favicon |
| `optimized/linpo-og-image-1200x630.jpg` | Social share image |
| `optimized/linpo-hero-avatar-384.jpg` | Hero avatar background |
| `optimized/linpo-hero-right-1100.jpg` | Hero right-side image |
| `optimized/project-marketing-dashboard-banner-1400.jpg` | Selected work banner |
| `optimized/project-xiaohui-ai-banner-1400.jpg` | Selected work banner |
| `optimized/project-loyalty-system-banner-1400.jpg` | Selected work banner |
| `optimized/method-prompt-framework-monond-v1-1000.jpg` | Method thumbnail |
| `optimized/method-visual-reverse-system-monond-v1-1000.jpg` | Method thumbnail |
| `optimized/method-ai-framework-monond-v1-1000.jpg` | Method thumbnail |
| `optimized/method-design-to-code-monond-v1-1000.jpg` | Method thumbnail |
| `optimized/experiment-ai-workflow-monond-v1-1100.jpg` | Experiment thumbnail |
| `optimized/experiment-type-light-monond-v2-1100.jpg` | Experiment thumbnail |
| `optimized/experiment-urban-guide-agent-monond-v1-1100.jpg` | Experiment thumbnail |
| `optimized/linpo-about-portrait-760.jpg` | About portrait |

## Deployment notes

- `output/` is not a runtime directory. It is for temporary generation exports or QA screenshots and should not be deployed.
- `.DS_Store` is local macOS metadata and should not be committed or deployed.
- `project-decks/` contains separate case-study deck material. It is not part of the homepage image cleanup unless those pages are deployed too.
- When replacing a homepage image, keep the source in `generated/`, generate a new deployment cut in `optimized/`, then update `index.html`.
- Current homepage optimized image total is about 1.3 MB.
