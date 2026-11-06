# Design Guide

Rules for anyone (person or agent) changing how this marriage biodata looks or reads.
Read this before touching `src/app/globals.css`, `src/components/**` or `src/data/biodata.ts`.

## Who it is for

The main readers are **parents and elders of a prospective bride's family**, often on a phone,
often reading slowly or listening to the narration. Every decision serves three goals, in this order:

1. **Easy to read and use** for older eyes and hands.
2. **Warm and respectful**: it should feel like a family introducing their son, not a product page.
3. **Premium and modern**: calm, clean, never "ancient", ornate or theatrical.

If a change helps 3 but hurts 1, don't make it.

## Colour

All colours live as tokens in `:root` in `src/app/globals.css`. Use the tokens, never new hex values
in component rules. If a new colour is truly needed, add a token first.

| Role | Token | Value | Use for |
|---|---|---|---|
| Page background | `--canvas` | `#faf7f2` | Warm ivory base |
| Cards | `--paper` | `#ffffff` | Every content card |
| Primary | `--emerald` | `#0e4a3b` | Headline accents, featured cards, primary buttons, active states |
| Primary dark | `--emerald-deep`, `--emerald-night` | `#08352a`, `#052219` | Curtains, gradients |
| Primary tint | `--emerald-soft` | `#e4efe9` | Icon circles, chips, active nav pill |
| Accent | `--gold` / `--gold-light` | `#b08a52` / `#dec596` | Thin rules, tree lines, gold on emerald |
| Accent text | `--gold-ink` | `#8a6630` | Gold text on light backgrounds (eyebrows, labels) |
| Warmth | `--blush`, `--rose` | `#f6e7e1`, `#c77d6b` | Tags, nickname, small warm touches only |
| Text | `--espresso` / `--ink-soft` / `--muted` | `#18211e` / `#2e3834` / `#48514d` | Headings / body / secondary |

Rules:
- Emerald leads; gold and blush are accents. One featured emerald card per scene at most.
- Gold text on ivory must use `--gold-ink` (contrast). `--gold-light` is only for use on emerald.
- Do not bring back burgundy/wine, parchment textures, paper grain, scalloped valances, corner frames
  or other "old manuscript" ornaments. The legacy names `--burgundy` and `--wine-shadow` are aliases
  to emerald and should not be used in new code.
- Keep gradients subtle (soft blush and mint glows on the background, emerald on featured cards).

## Typography

- **Serif** (`--serif`, Playfair Display): names, headings, big numbers. Weight 500, slight negative
  letter-spacing on large sizes. Italic only for the nickname, the signature and the opening "Alaikum".
- **Sans** (`--sans`, Manrope): everything else, including body copy, labels, buttons and notes.
- **Minimum sizes** (desktop / phone): body 17–19px / 16px; labels and eyebrows 13px / 12px;
  never below 11px anywhere. Buttons 15px or more.
- Eyebrows are uppercase, letter-spaced `.12–.14em`, `--gold-ink`.
- Long notes get `max-width` around 600px and `text-wrap: balance`.

## Layout and components

- Content sits on **white cards**: `border-radius: var(--radius)` (18px, up to 28px for the portrait),
  `box-shadow: var(--card-shadow)`, no borders.
- Buttons, chips and nav items are **pills** (`border-radius: 999px`).
- Primary call to action: emerald pill with ivory text. The opening button is the only champagne
  gradient button.
- Icons: lucide-react with stroke 1.5, inside a soft emerald circle or rounded square. For people in the
  family tree use the custom `ManIcon` and `WomanIcon` in `SceneContent.tsx` (the woman wears a hijab),
  never the generic `UserRound`.
- **Family tree lines** are computed from grid geometry (`--pgap`, `--sgap`, `--drop`, `--n` on
  `.family-tree` / `.siblings-branch`). Lines must meet each card's centre. If you change card sizes
  or gaps, change these variables rather than hard-coding offsets, and check alignment in the browser.
- Curtains: two emerald panels, each exactly 50% wide, so the seam sits in the centre. On phones
  they fade out after opening.
- The opening screen is only: "Assalamu Alaikum", one welcome sentence, the button, the narration note.
  No emblems or extra labels.

## Accessibility for older readers (required)

- Every tap target is at least **44×44px**.
- Body text contrast at least 7:1 on ivory where possible; never below 4.5:1.
- The scene menu wraps onto two lines; it must never scroll sideways or hide items.
- Visible focus ring: 3px `--gold` outline.
- Respect `prefers-reduced-motion` (already handled globally; keep new animations inside it).
- Check phone width (375px) for every change: no horizontal scroll, the full name must fit, and
  nothing may hide under the side curtains.

## Writing and voice

The copy reads as **one connected story told by the family**: who he is, then the basics, his
studies, the family behind him, faith and home, his own note, and a thank you. Each scene has a
short `note` under the heading that picks up from the scene before.

- **Never invent facts.** Only use what is in `src/data/biodata.ts`. Warm framing is fine; new
  claims about habits, personality, piety, income and so on are not.
- If a section has no data, **hide it** (see `scenes` filtering in `src/lib/sceneConfig.ts`).
  Never show "to be shared" or "coming soon" placeholders.
- **Names:** use the nickname **"Anim"** for everyday mentions (headings like "About Anim", the son's
  card, the signature, narration). Use the full name **"Abdullah Al Hill Baki"** only in main places:
  the opening sentence, the Introduction headline, the closing page, the printable biodata, page
  metadata and the desktop header. Always read names from `biodata.personal.fullName` /
  `biodata.personal.nickname`, never hard-code them in components.
- Short, plain sentences an elder can follow when read aloud. Respectful Islamic greetings are
  welcome ("Assalamu Alaikum", "Jazakallahu khairan").
- Avoid generic AI phrasing: "journey", "tapestry", "beyond the…", "a story told one scene at a time",
  sentences that describe the page instead of the person, and dramatic headings with nothing behind them.
- His letter (`preferences.introduction`, `preferences.partnerPortrait`) is his own words. Do not edit it.
- When on-screen copy changes, update the matching `narration` entry so the voice tells the same story.

## Before you say it's done

1. `pnpm lint` and `pnpm typecheck` pass.
2. Open the app, go through every scene on desktop and at 375px width, and look at it.
3. Check the printable page (`/print`) still reads well.
