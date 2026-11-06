# Abdullah Al Hill Baki | Marriage Biodata

A self-contained, cinematic marriage biodata experience built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, Framer Motion, and native browser speech synthesis.

## Run locally

```bash
pnpm install
pnpm dev
```

## Update biodata

Edit `src/data/biodata.ts`. Empty education, career, personal-life, and partner-preference fields stay out of the story until information is supplied. Narration is local text read by the browser's Web Speech API; no audio assets or speech service are used.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

GitHub Actions runs all three checks on pushes and pull requests targeting `main`. The `/print` route provides the print-friendly biodata and browser Save as PDF flow.