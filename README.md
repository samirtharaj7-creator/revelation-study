# Revelation Study Platform

A Christ-centered, Adventist-prioritized interactive study platform for the biblical book of Revelation.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components with Radix primitives
- Framer Motion-ready structure
- Recharts
- Fuse.js
- Lucide icons
- Zod content validation
- Local storage bookmarks and notes

## Run

This environment did not include `npm` on PATH, so dependencies were installed with a local npm CLI downloaded to `/private/tmp/npm-cli-11.15.0`.

```bash
/Users/samuel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /private/tmp/npm-cli-11.15.0/package/bin/npm-cli.js run dev
```

Then open the printed localhost URL. The current development server may use `http://localhost:3001` if `3000` is already occupied.

If you later have normal npm available:

```bash
npm run dev
```

## Content

Content lives under `/content`:

- `content/revelation/chapter-01.json` through `chapter-22.json`
- `content/prophecy`
- `content/schools`
- `content/resources`
- `content/glossary`
- `content/timelines`
- `content/connections`

KJV is used as the public-domain Bible text. Each Revelation verse displays one detailed public explanation. Internally, each verse keeps structured fields so the detailed explanation can be audited and improved:

- `detailedExplanation`
- `exegesis`
- `historicalBackground`
- `technicalNotes`
- `adventistPropheticInsight`
- `propheticTimeline`
- `otherCommentaryInsights`
- `application`
- `reviewFlags`

Public chapter pages intentionally do not show study-mode tabs, layer tabs, verse-by-verse citation chips, or raw source locators. Source and page-audit metadata remains hidden in each verse's `sourceAudit` object for review, validation, and later editorial work.

## Uploaded Resource Priority

1. Uploaded Adventist resources
2. Ellen G. White writings if added later
3. Official Adventist teaching, evangelistic, Sabbath School, or church materials
4. Protestant historicist resources
5. General scholarly or historical resources
6. Other interpretive resources for comparison only

For prophecy, timeline, sanctuary, judgment, remnant, Babylon, beast powers, mark of the beast, millennium, and final-event interpretation, Adventist sources govern the public explanation. Broader uploaded commentaries are used for historical background, literary and technical details, Old Testament allusions, pastoral application, and fair comparison.

## Local PDF Extraction Cache

The helper script below builds a local-only source index from the uploaded Revelation PDFs in `/Users/samuel/Desktop/Revelation` and the available Daniel presentation PDFs. It auto-discovers PDFs, assigns stable source ids, classifies resources, detects Revelation/Daniel references, and writes page-level plus section-level caches under `.pdf-extraction-cache`.

```bash
/Users/samuel/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/build-source-index.py
```

The cache is ignored by git and is not served by the app. It exists to support source audit metadata without publishing raw PDF text. Public pages synthesize; hidden JSON metadata preserves source ids and page-level audit hints.

To regenerate all detailed verse commentary from the current enrichment templates and source audit index:

```bash
/Users/samuel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/upgrade-layered-content.mjs
```

The enrichment generator uses Adventist sources for prophetic timeline and doctrinal-prophetic interpretation, broader academic commentaries for historical/literary/technical detail, and pastoral/devotional resources for application.

## Add Or Improve Content

1. Edit the relevant JSON file in `/content`.
2. Attach source references to every major interpretive claim.
3. Keep direct quotations brief and cite the uploaded source.
4. Use `Needs source review` when page locators or theological details are not verified.
5. Run validation:

```bash
npm run validate:content
npm run check:quotes
npm run typecheck
npm run lint
npm run build
```

Validation checks that all 22 chapter files exist, all 404 Revelation verses include KJV text and a detailed explanation, every verse keeps hidden source audit metadata, and prophetic timeline audit sources are Adventist-priority resources only.

## Review List

See `content-review-needed.md` for every verse and topic that needs manual theological, citation, image, or copyright verification.

## Copyright And Images

V1 uses original UI diagrams and placeholders rather than extracting images from uploaded PDFs. Replace placeholders only with original, public-domain, open-licensed, or explicitly permitted assets, and include captions and credits.
