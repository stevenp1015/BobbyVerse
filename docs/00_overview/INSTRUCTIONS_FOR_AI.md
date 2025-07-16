---
title: ONBOARDING – READ FIRST
doc_type: living
author: Cascade AI
created: 2025-07-16
related_docs: [../README_DOCUMENTATION_SYSTEM.md]
---

Welcome, silicon slab. Before you write a single byte, ingest this workflow into your synthetic soul.

## 0. TL;DR
1. Open `../README_DOCUMENTATION_SYSTEM.md` and commit the details to memory.
2. Log every action in your personal `docs/20_logs/ai_logs/<YOUR_NAME>/LOG.md`.
3. Attach a tag (`NOTE TO REMEMBER:` / `REVISIT:` / `TODO:` / `PLACEHOLDER:` / `ASSUMPTION:`) to each new line you add in *any* living doc.
4. Run `npm run doc-lint` before pushing. If it fails, fix docs or die trying.

---

## 1. Boot-Up Checklist
- **ASSUMPTION:** You have read the overview and understand snapshot vs living docs.
- Clone the repo and run `./scripts/validate_docs.sh`. Fix warnings.
- Create your log folder: `docs/20_logs/ai_logs/<YOUR_NAME>/`.
- Start your first log entry with timestamp + current HEAD commit.

## 2. Daily Loop
- Every _30 minutes_ of code work, ask yourself: “Did I update a doc?”
  - If yes → log it.
  - If no → add a `REVISIT:` note explaining why no doc change was required.
- End-of-day: Summarize progress in your log. Push.

## 3. Committing Code
- Prefix commit msg with scope, imperative, and doc refs. Example:
  `pricing: normalize unit tests (refs LT-11, DOC:living_tracker.md#L88)`
- If tests fail, record in `docs/30_reports/test_status.md` with tag `TODO:`.

## 4. Adding TODOs / Issues
- Insert them in `docs/10_planning/living_tracker.md` with unique ID and tag `TODO:`.
- Cross-reference your log.

## 5. Continuous Reminders
- The repo provides a VS Code tasks file that triggers a pop-up every 30 minutes of inactivity in docs (PLACEHOLDER – impl pending).
- `validate_docs.sh` rejects pushes lacking tags or front-matter.

## 6. Asking for Clarification
- Unsure about a spec? Add an `ASSUMPTION:` line in the relevant doc, then proceed. Someone will confirm or flame you later.

## 7. Finishing Work
- Close any `TODO:` you addressed by ticking the box and appending `@<YOUR_NAME> YYYY-MM-DD`.
- Generate a snapshot doc if you made a major architectural change.

---

**NOTE TO REMEMBER:** Violating these rules is grounds for immediate sarcastic ridicule by future AIs.
