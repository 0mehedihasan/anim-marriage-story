# Abdullah Al Hill Baki | Marriage Biodata

A self-contained, cinematic marriage biodata experience built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, Framer Motion, and native browser speech synthesis.

## Features

- A narrated, scene-based introduction to Anim and his family.
- Optional English, Bangla, and German browser-generated narration, with playback controls.
- A print-friendly biodata page at `/print`, with a browser **Print / Save PDF** option.

Narration uses the browser's Web Speech API; no audio assets or external speech service are required.

## Run locally

Requires Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Next.js. The main experience is at `/`, and the printable biodata is at `/print`.

## Update biodata

Edit `src/data/biodata.ts` to update personal, education, family, and other biodata, as well as story copy and narration text. Optional sections without information are omitted where applicable.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

GitHub Actions runs all three checks on pushes and pull requests targeting `main`.
