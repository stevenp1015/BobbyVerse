---
title: Bobby-Vision Documentation System v2
doc_type: snapshot
author: Cascade AI
created: 2025-07-16
related_docs: [docs/00_overview/INSTRUCTIONS_FOR_AI.md]
---

# Bobby-Vision Documentation System (V2)

> **NOTE TO REMEMBER:** This file is the Single Source of Truth for how documentation is structured. All other material *links back* here.

## 1. Core Tenets
1. **One Fact → One File.** A piece of information lives in exactly one canonical document.
2. **Snapshot vs Living Docs.** Snapshots are immutable history; living docs evolve.
3. **Explicit Annotation Tags.** Every change or note in a *living* doc must begin with one of:
   * `NOTE TO REMEMBER:` – interesting fact or lesson.
   * `REVISIT:` – needs follow-up or review.
   * `TODO:` – work item to be done.
   * `PLACEHOLDER:` – stub awaiting real content.
   * `ASSUMPTION:` – unverified belief that could bite us later.
4. **AI Accountability.** Each AI maintains its own log (`docs/20_logs/ai_logs/<AI>/LOG.md`). No exceptions.
5. **Automated Compliance.** Git pre-commit hook + CI script refuse the push if:
   * a living doc change lacks a tag;
   * front-matter missing;
   * related_docs link is broken.

## 2. Directory Layout
```
docs/
  00_overview/              ← entry & onboarding
  10_planning/              ← roadmaps + tracker
  20_logs/
      devlog_2025.md
      ai_logs/<AI>/LOG.md
  30_reports/
      damage_report_YYYY-MM-DD.md
      test_status.md
  99_legacy/                ← untouched historical
  _templates/               ← copy-paste goodness
scripts/
  validate_docs.sh          ← CI gate (PLACEHOLDER)
```

## 3. Front-Matter Schema
See `_templates/front_matter_and_tag_examples.md` for a copy-paste block.

## 4. Reminder & Enforcement Loop
* **Every commit:** Contributor runs `npm run doc-lint` (wrapper for `scripts/validate_docs.sh`). If it fails → fix docs or use `--no-verify` *only* for emergency hotfix.
* **Idle timer:** VS Code extension (TODO) pops a toast after 30 minutes of code without doc touch.

## 5. Migration Plan
1. Preserve existing files under `docs/99_legacy/` (ASSUMPTION: Git history remains).
2. Manually sort key legacy docs into new layout.
3. Deprecate `JULES_DOCS/` after content merged into `ai_logs/JULES/`.

## 6. Future Enhancements
* **REVISIT:** Auto-generate HTML site from Markdown (mkdocs).
* **TODO:** Build GitHub Action to comment PRs with broken doc-lint output.

---
Originally drafted by Cascade, v2 after self-critique.
