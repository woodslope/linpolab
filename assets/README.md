# Homepage image assets

`index.html` uses final runtime images from `assets/generated/`. Keep this folder small and deployment-ready: only files referenced by the homepage should live here.

## Runtime files

| File | Homepage placement |
| --- | --- |
| `generated/linpo-hero-avatar.png` | Hero avatar background |
| `generated/linpo-hero-right.png` | Hero right-side image |
| `generated/project-marketing-dashboard-banner.jpg` | Selected work banner |
| `generated/project-xiaohui-ai-banner.jpg` | Selected work banner |
| `generated/project-loyalty-system-banner.jpg` | Selected work banner |
| `generated/method-prompt-framework-monond-v1.png` | Method thumbnail |
| `generated/method-visual-reverse-system-monond-v1.png` | Method thumbnail |
| `generated/method-ai-framework-monond-v1.png` | Method thumbnail |
| `generated/method-design-to-code-monond-v1.png` | Method thumbnail |
| `generated/experiment-ai-workflow-monond-v1.png` | Experiment thumbnail |
| `generated/experiment-type-light-monond-v2.png` | Experiment thumbnail |
| `generated/experiment-urban-guide-agent-monond-v1.png` | Experiment thumbnail |
| `generated/linpo-about-portrait.png` | About portrait |

## Deployment notes

- `output/` is not a runtime directory. It is for temporary generation exports or QA screenshots and should not be deployed.
- `.DS_Store` is local macOS metadata and should not be committed or deployed.
- `project-decks/` contains separate case-study deck material. It is not part of the homepage image cleanup unless those pages are deployed too.
- When replacing a homepage image, keep the same referenced filename when possible. For example, replacing the hero image should overwrite `generated/linpo-hero-right.png` so `index.html` stays clear.
