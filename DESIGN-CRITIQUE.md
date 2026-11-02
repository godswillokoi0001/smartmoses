# Design Critique — Baseline

**Captured:** 2026-11-02 at 390px and 1440px using the existing Vite preview and Playwright-backed browser. These captures predate the redesign work.

## Screenshots

- [Desktop hero, 1440px](screenshots/desktop-1440-hero.png)
- [Mobile hero, 390px](screenshots/mobile-390-hero.png)
- [Desktop work, 1440px](screenshots/desktop-1440-work.png)
- [Mobile work, 390px](screenshots/mobile-390-work.png)
- [Desktop services, 1440px](screenshots/desktop-1440-services.png)
- [Mobile services, 390px](screenshots/mobile-390-services.png)
- [Desktop about, 1440px](screenshots/desktop-1440-about.png)
- [Mobile about, 390px](screenshots/mobile-390-about.png)
- [Desktop process, 1440px](screenshots/desktop-1440-process.png)
- [Mobile process, 390px](screenshots/mobile-390-process.png)
- [Desktop contact, 1440px](screenshots/desktop-1440-contact.png)
- [Mobile contact, 390px](screenshots/mobile-390-contact.png)
- [Desktop full page, 1440px](screenshots/desktop-1440-full.png)
- [Mobile full page, 390px](screenshots/mobile-390-full.png)

## What Already Works

- The Instrument Serif and DM Sans pairing feels editorial rather than like a default component kit.
- The supplied portrait and three real project composites provide strong, relevant imagery.
- Browser frames add a clear product context, and project rows alternate their image/text alignment.
- The chartreuse CTA band creates a useful contrast break; the Lagos clock and outlined section numerals give the page a recognizable vocabulary.
- The contact form, direct email and WhatsApp, case-study pages, marquee, and footer clock already provide real interactions and content.

## What Does Not Yet Meet the Brief

### Hero

- The statement is memorable but the person's name is absent from the dominant composition. The desktop image sits beside the copy instead of overlapping or interacting with it.
- At 390px the portrait starts well below the copy and only its upper portion appears near the bottom of the initial viewport. The hero is over 1,100px tall, so the first screen reads as copy and actions before it reads as a person.
- “Available for projects” is an unconfirmed claim and must not ship without owner confirmation.
- The dot-grid and grain are both present; together they flatten the portrait and text instead of helping the hierarchy.

### Work

- The real project composites are the strongest visual material, but the card rhythm remains repeated image/copy/metadata/actions. The project rows are very tall on mobile and the copy metadata competes with the images.
- A project card uses a hard-coded `2024` fallback when no year exists. Unknown facts must be labeled honestly, never defaulted to a plausible year.
- The first card's device composition has value; retain the actual screenshot while making its image larger and its accompanying explanation shorter.

### Services, About, Process, and Experience

- The desktop service rows rely on generic 24px line icons in outlined square tiles; mobile hides those tiles, leaving three text rows. There is little visual difference between the service types.
- About has a real portrait and stack ticker, but the statistics tiles dominate the content. Use only facts that can be defended, and let the portrait and tools carry more of the visual weight.
- Process has large outlined numerals and rules, but its four equally weighted cells feel like a common service template and the animated line has no relationship to progress through the steps.
- Experience is an uninterrupted text list. It needs a visual timeline, role markers, or a link back to relevant project evidence so the section is not another wall of copy.
- Captures of long sections show fixed navigation overlaid at the position of the original viewport. Full-page screenshots also omit some scroll-revealed elements; those captures are not sufficient proof of the real scrolled state. Verify each section by scrolling it into view before capturing.

### Contact and Footer

- The inverted CTA band is a strong anchor, but the form section has no visual relationship to it beyond color adjacency. The contact links and form feel like two generic columns.
- LinkedIn is not displayed. The source has a hard-coded profile URL, but it is not independently verified; do not publish it until confirmed.
- Some captured mobile section headings appear behind the sticky/fixed navigation because the screenshot is a full-section capture, not because the page was checked at a real scroll position. Repeat at viewport scale.

### Accessibility and Performance Risks

- `--muted: #6B7466` is too low-contrast against `#090D16` for normal body text. The small labels are especially difficult to read in the captures.
- The desktop cursor is hidden globally for fine pointers, while the custom cursor is only mounted on the homepage. Secondary routes can therefore lose the native pointer without receiving the replacement.
- A 40px mobile menu control is below the 44px target. Focus-visible and reduced-motion behavior exist, but every interaction still needs a route-level check.
- The hero exposes the portrait immediately and project images are lazy after the first row; verify image dimensions and loading behavior after changing layout.

## Direction

The redesign will use one concept: **Digital Front-Door Field Manual**. Treat each website as a route that helps a visitor understand a business and take the next step. Use editorial portrait and real project frames as the evidence, and use fine route marks, numbered annotations, browser geometry, and short labels as the supporting graphic language. The intent is practical and specific, not a generic “creative technologist” portfolio.
