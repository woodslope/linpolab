# LINPO LAB Project Decks

This folder holds independent HTML-PPT case decks opened from the home page project cards.

## Working Principles

- Use `ppt-content-structuring` Stage 1 to discuss the story and Stage 2 to lock the page specification before production.
- Use `BWC xixi ppt html` as the shared production skeleton, typography, theme, navigation, and editable PPTX contract.
- Use `xiaobai-html-ppt` for rendered experience acceptance, scoped repair, and export discipline.
- Use `guizang-ppt-skill` as the visual layer reference only. It guides tone, type rhythm, and registered slide layouts.
- Follow `TEMPLATE_SPEC.md` for the shared BWC case-deck design system.
- Until real project assets are available, lock the deck planning, visual direction, and reusable page templates first.
- Treat project cover images on the home page as the first visual anchors. Do not invent unrelated imagery for the deck body before assets exist.

## Recommended Directory Shape

- `quanyu/`
- `xiaohui-ai/`
- `points-system/`

Each deck should eventually contain:

- `index.html` or split deck files after iteration
- `images/` for real assets
- `notes.md` for outline, slide-role mapping, and replacement list

## Home Page Routes

| Home card | Status | Target |
| --- | --- | --- |
| 全域营销后台体验升级 | linked | `project-decks/quanyu/index.html` |
| 小慧 AI 产品视觉与界面设计 | pending deck | `project-decks/xiaohui-ai/index.html` |
| 积分系统全链路体验优化 | pending deck | `project-decks/points-system/index.html` |

Keep links relative to the home page so the same files work on local preview, GitHub Pages, and a later server deployment.

## Current Decision

Phase 1 now has one linked deck entry:

- home page card 01 opens `quanyu/index.html`
- remaining cards stay static until their deck folders exist

For the remaining decks:

- lock story spine
- lock style direction
- lock 3 to 5 reusable page templates
- define placeholder rules

Do not copy project-specific content from `quanyu`. Reuse only the fixed template layer defined in `TEMPLATE_SPEC.md`.

Phase 2 will build one representative deck sample before scaling to the other projects.
