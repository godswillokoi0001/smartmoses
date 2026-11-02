| `--ink-paper` | `#111820` | High-contrast text and UI strokes on paper |
| `--muted-paper` | `#4B574E` | Readable secondary text on paper |
| `--border-paper` | `rgba(9, 13, 22, .18)` | Rules on the inverted band |

# Design System — Digital Front-Door Field Manual

## Concept

**A field manual for a business's digital front door.** Each screen is treated as a route: make the business legible, show the visitor where they are, and make the next action clear. The visual language borrows from annotated interface proofs and editorial field notes: oversized serif statements, instrument-like metadata, hairline routes, index marks, and real browser imagery. Nigeria appears as a true working location through the Lagos clock and place labels, never as decorative shorthand.

This is not a map illustration or a generic “tech grid.” Every line, index, image frame, and label must point to a real section, project, action, or fact.

## Tokens

| Token            | Value                      | Use                                                         |
| ---------------- | -------------------------- | ----------------------------------------------------------- |
| `--bg`           | `#090D16`                  | Main night-ink canvas                                       |
| `--surface`      | `#121923`                  | Raised dark work surface                                    |
| `--surface-2`    | `#1B2530`                  | Image/browser chrome and elevated interface fragments       |
| `--paper`        | `#E9E5DA`                  | Inverted editorial band and primary light text              |
| `--ink`          | `#F2F1EA`                  | Primary text on dark                                        |
| `--muted`        | `#A9ADA4`                  | Body text and readable secondary detail                     |
| `--accent`       | `#D4FF5C`                  | Single signal-lime accent and full-bleed conversion moments |
| `--border`       | `rgba(233, 229, 218, .18)` | Fine rules and frames                                       |
| `--border-soft`  | `rgba(233, 229, 218, .09)` | Quiet separators                                            |
| `--error`        | `#F28F86`                  | Form errors                                                 |
| `--font-display` | Instrument Serif           | Oversized statements and project titles                     |
| `--font-body`    | DM Sans Variable           | Long copy, controls, navigation                             |
| `--font-mono`    | DM Mono (self-host)        | Index, coordinates, dates, status metadata                  |

Do not add another accent hue. Inverted sections use `--paper` or `--accent` with `--bg` text; both must retain readable contrast. Muted text is a neutral tint, never the existing olive `#6B7466`.

## Composition

- Use a 12-column desktop grid, six columns at tablet, and a four-column mobile grid. Break alignment intentionally, but never let text or controls exceed their tracks.
- Base spacing increments are 4px; section rhythm uses 8px multiples. Use 8px maximum corner radius except for the circular stamp/badge and portrait mask.
- Desktop content max-width: 1440px. Body copy: 55–65ch. Keep section labels compact and mono-led.
- Use full-bleed color bands to create rhythm. Do not put cards inside cards or repeat identical three-column tiles as the main device.
- Texture is limited to low-opacity grain and rare technical rule marks. No blurred orbs, gradient haze, or ornamental grid over every section.

## Section Art Direction

1. **Hero:** 100svh dark opening. Name and value statement in large display type; the real portrait crosses the type/grid boundary and remains visible on the first mobile screen. Use an honest location/time stamp, staggered line reveal, small scroll marker, and the service ticker. Do not show availability unless confirmed.
2. **Marquee:** Full-bleed lime route strip. Alternate filled/outlined words for services and verified tools. Pause on hover and stop under reduced motion.
3. **Selected work:** Three asymmetric image-led case-study spreads. Use the actual project composites inside restrained browser frames, with brief role/year/stack/outcome labels, one clear action, and a focus/hover treatment that works without a custom cursor. A missing year is explicitly “Not provided” until confirmed.
4. **Services:** Inverted paper band with a numbered, staggered service list. Each service receives a distinct UI specimen (page skeleton, responsive layout, or code detail), not an icon tile.
5. **About:** Photo-led editorial split with a dark/neutral image treatment, short biography, location, defensible facts, and a restrained stack ticker. Do not use percentage bars or unverified counters.
6. **Process:** A route-like horizontal timeline on desktop and vertical on mobile. One continuous rule connects large numerals; line drawing uses transform/opacity only.
7. **Experience:** Evidence-forward timeline. Pair each role and dates with a small visual marker and, where real project work is available, a relevant case-study link. Keep each contribution concise.
8. **Contact:** A large lime conversion band plus a quieter form surface. Keep floating labels, validation, success/error state, direct email/WhatsApp/GitHub, and only a confirmed LinkedIn link.
9. **Footer:** Oversized outlined wordmark, live Lagos time, social links, and back-to-top; keep it dark and spare.
10. **404 and project detail:** Reuse the same field-note marks, image treatment, type, and tokens. Direct route loads must remain useful without client-side navigation.

## Motion

- Keep Framer Motion as the page motion system; use Lenis only if keyboard, hash navigation, reduced motion, and browser scroll behavior remain correct. Avoid adding GSAP for the same transitions.
- Shared curve: `cubic-bezier(0.22, 1, 0.36, 1)`. Motion scale: 180ms interaction, 450–650ms reveal, under 1.2s preloader.
- Animate transform and opacity only. Disable custom cursor on touch and reduced-motion devices; never hide the native cursor on routes without the custom cursor.
- Respect `prefers-reduced-motion` for the preloader, marquee, ticker, parallax, cursor, scroll, and every reveal.

## Responsive and Accessibility Rules

- Verify at 360, 390, 768, 1024, 1440, and 1920px. No horizontal scroll, clipped type, overlapping fixed navigation, or unstable image boxes.
- Controls and tap targets are at least 44×44px. Keep the skip link, semantic landmarks, one H1 per route, visible focus, meaningful alt text, keyboard-operable controls, and live form status.
- Minimum 4.5:1 contrast for normal text; check muted labels too. Avoid using accent color alone to convey state.
- Preserve project roles, links, screenshots, job history, and contact details. Do not invent dates, outcomes, client endorsements, availability, metrics, or social profiles.

## Verification Loop

For each section: inspect the target DOM, scroll it into the viewport, capture at 390px and 1440px, critique composition/contrast/crop/overlap, adjust, then recapture both widths. Repeat the loop twice before moving to the next section. Finish with all routes, axe, build, lint, and a final 360–1920px overflow pass. Record the final verdict and any unverified details in `FINAL-REVIEW.md`.
