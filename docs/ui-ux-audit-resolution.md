# UI and content audit resolution

Reviewed and implemented September 8, 2026. This work addresses the eleven findings from the portfolio UI, content, and functionality audit.

| Finding | Resolution |
| --- | --- |
| Homepage work appears too late | Put all three selected projects immediately after a shorter introduction; move the smaller, linked evidence strip below them. |
| Recruiter brief repeats the homepage | Give the brief a distinct role-fit, contribution, education, and contact structure, with print/save controls and print styles. |
| Project rows are dense and incomplete | Shorten summaries and personal-contribution copy; include SeeMyRace on the homepage and retain clear case-study links. |
| Case studies start with architecture | Lead with the problem and personal contribution, then an interactive example, scoped results, architecture, and detailed evidence. Add section navigation, a related project, and contact. |
| SeeMyRace lacks a concrete product explanation | Add an explicitly synthetic, interactive record walkthrough covering race selection, candidate review, athlete-owned confirmation, and GPX-backed race creation. Preserve team and ML attribution boundaries. |
| Mobile hierarchy and disclosure affordances | Stack metadata, simplify evidence grids, use explicit native disclosure labels, and retain visible keyboard focus and touch targets. |
| Experience is difficult to scan | Show three concise bullets per role, retain supporting detail in disclosures, and link relevant projects. Keep separate employers and appointment dates explicit. |
| About repeats content and overemphasizes the calendar | Shorten appointment history, add curated engineering decisions and contact, and provide an accessible daily contribution table. Show account-specific verification provenance. |
| Privacy opt-out requires extra typing | Remove the confirmation phrase. Analytics and replay remain independently selectable, with saved-state feedback and storage-error handling. |
| Parliamentary pipeline is abstract | Add synthetic source/output records and an interruption/resume example showing retained work and a pending review decision. |
| Resume is PDF-only for fast readers | Label PDF links consistently and provide the responsive HTML brief as the readable alternative. |

## Motion

Use small, one-time section reveals, brief panel transitions, subtle control feedback, and a reading-progress line where CSS scroll timelines are supported. Content remains readable before JavaScript runs. Navigation and scrolling retain normal browser behavior.

The motion helper checks `prefers-reduced-motion`, cancels active animations when that preference changes, and cancels animations around keyboard focus and printing. Reduced-motion CSS also disables smooth scrolling and decorative transitions. No animation library or image/video dependency was added.

## Validation

- Browser review of desktop and mobile layouts, light/dark themes, project examples, acceptance/reset behavior, independent privacy preference persistence, menu dismissal, section navigation, and disclosures.
- Narrow-screen document bounds checked at 320 px for home, brief, experience, work, SeeMyRace, and privacy; no horizontal document overflow.
- Generated HTML: 10 pages and 204 local links checked for missing routes, missing anchors, and duplicate IDs.
- Astro diagnostics, the existing focused and generated-site checks, production build, dependency audit, and GitHub Actions are release gates.
- The interactive records are illustrations, not live applications or new claims of measured project results.

The in-app browser does not expose a print-preview surface or OS motion emulation. Print and reduced-motion behavior were reviewed in source; OS-level print pagination and preference switching were not visually verified. The existing resume PDF is unchanged. GitHub's Linux quality job supplies Poppler for the public-asset privacy check, which is unavailable in the local runtime.
