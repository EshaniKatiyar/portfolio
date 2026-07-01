## Developer Portfolio — Editorial Hacker, with Cinematic Scroll

Single-page portfolio on the existing TanStack Start setup. Off-white canvas, pure black ink, Playfair Display × JetBrains Mono, extreme whitespace. Layered on top: Palmer-style scroll-driven motion (pinned sections, mask reveals, horizontal drift) executed with Forge Residency restraint (slow easings, small distances, nothing bouncy).

### Motion library
- Add **Motion for React** (`motion`) + **Lenis** for buttery smooth scroll.
- Global `<Lenis>` wrapper in `__root.tsx` (duration ~1.2, easeOutExpo-ish).
- All motion respects `prefers-reduced-motion` (Lenis disabled, transforms collapse to opacity-only fades).

### Signature scroll moments
1. **Hero word-by-word mask reveal** — headline split into words, each rises from `y: 40, opacity: 0, clip-path` over a slow 1.2s stagger on mount; mono focus line types out after.
2. **Sticky section labels** — `// THE VAULT` / `// THE LOG` pinned to the left gutter via `position: sticky`, fading out as the section exits (driven by `useScroll` + `useTransform`).
3. **Vault scroll choreography** — the entire Vault section pins for ~200vh. As the user scrolls:
   - Project rows translate up one at a time with a long stagger (Palmer-style "list scrolls past you")
   - The large serif numbers (`01`, `02`, `03`) shift horizontally at a different rate than the titles — subtle parallax (~20px), not theatrical
   - Active row gets a slow `border-color` and weight intensification as it crosses the viewport center
4. **Marquee strip** between Vault and Log — slow, infinite horizontal scroll of mono keywords (`QISKIT · PYTORCH · LLM · BB84 · AGENTIC ·`), speed coupled to scroll velocity so it accelerates when you scroll and drifts when you stop.
5. **Log table line draw** — hairline row dividers animate from `scaleX: 0` to `1` left-to-right as each row enters viewport (Forge-style restrained reveal).
6. **Footer "end_of_transmission_"** — caret blinks; on scroll-into-view the line types itself out once.

### Hover micro-interactions (unchanged from prior plan)
- Vault row hover: bg flips to pure black, text inverts, mono description retypes via `steps()`, `_` caret appears. Transitions ~400ms `ease-[cubic-bezier(0.16,1,0.3,1)]` for the Forge softness.
- Nav links: mono, underline draws in from left on hover.

### Design tokens (src/styles.css)
- `--background: oklch(0.98 0 0)` (~#F9F9F9), `--foreground: oklch(0 0 0)`
- Fonts via `<link>` in `__root.tsx`: Playfair Display 400/700/900 (+ italic), JetBrains Mono 400/500
- `--font-serif`, `--font-mono` tokens
- Custom utilities: `.caret-blink`, `.terminal-type`, `.hairline` (1px black/10)
- Easing token: `--ease-editorial: cubic-bezier(0.16, 1, 0.3, 1)`

### Page structure (src/routes/index.tsx)
1. **Hero** — viewport-height, massive serif headline (`text-[clamp(3.5rem,12vw,12rem)]`), italic accent on one word, mono focus line with blinking caret beneath.
2. **The Vault** — pinned scroll section, project list (no cards). Each row: big serif number, serif title, mono stack/description, hairline divider, generous `py-20`. Projects: SYNAPSE System, DeepFace Music Player, Qiskit BB84 (placeholder copy).
3. **Marquee** — slow scroll-velocity-coupled keyword strip.
4. **The Log** — minimal table, mono, hairline dividers that draw in. Columns: `YEAR · EVENT · ROLE/RESULT`.
5. **Footer** — tiny mono contacts + typed `$ end_of_transmission_`.

### Files
- `src/styles.css` — palette, font tokens, utilities, easing
- `src/routes/__root.tsx` — Google Fonts links, Lenis provider, updated meta
- `src/routes/index.tsx` — page composition
- `src/components/portfolio/Hero.tsx`, `Vault.tsx`, `VaultRow.tsx`, `Marquee.tsx`, `Log.tsx`, `Footer.tsx`, `SectionLabel.tsx`, `SmoothScroll.tsx`
- `src/hooks/use-reveal.ts` — IntersectionObserver fallback for non-pinned reveals

### Dependencies to add
- `motion` (Motion for React)
- `lenis` (smooth scroll)

### Out of scope
No backend, no CMS, no dark-mode toggle, no imagery — typography and motion carry the design.
