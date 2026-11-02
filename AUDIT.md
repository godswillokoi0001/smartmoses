# Portfolio Audit

**Date:** 2026-11-02  
**Scope:** Active React/Vite application, app content, project notes, configuration, and deployed static assets. The archived sites under `other portfolios/` are reference material, not app code.

## Stack and Structure

- React 19 and Vite 6, written in JSX; no TypeScript or test runner is configured.
- Framer Motion handles page and scroll reveals; Lucide React and Simple Icons provide icons.
- Styling combines a JavaScript dark/light/system theme object, a large runtime `<style>` block in `src/App.jsx`, base styles in `src/index.css`, and separate CSS for pricing and case studies. Tailwind is configured, but the app primarily uses inline styles and custom CSS.
- Navigation and case-study routes use the History API rather than a router. `vercel.json` sends paths to the SPA entry point; there is no serverless API route.
- The repo includes three detailed project records and optimized JPG mockups, a portrait at `/images/me.jpeg`, favicon assets, sitemap, and robots file.

## What Works

- The three projects (Rayto Prolog, Vista MFB, and Azawire Africa) have live/source links, role/context descriptions, stack details, mockups, and separate case-study pages. Supporting project notes clarify the agency/team context and contribution boundaries.
- The site includes real contact details: `smartmoses@gmail.com`, a WhatsApp number/link, and GitHub. Experience entries, technical skills, and the supplied portrait are present.
- Dark/light/system preference persistence, reduced-motion handling, scroll-aware navigation, a skip link, visible focus styling, responsive project layouts, and per-case-study title/description/canonical updates are implemented.
- The home document has a title, description, canonical, Open Graph/Twitter metadata, Person JSON-LD, sitemap, robots file, and favicon references.
- The project presentation is already more considered than a uniform card grid: the first project is featured and later entries alternate their text/image order.

## Issues Found

### Build and behavior

- **The app currently fails to parse.** In `src/App.jsx`, the comment before `Contact`'s return is not closed; the editor reports an expected `}` and an export-at-top-level parsing error. The production build must be restored before visual validation.
- Unknown `/work/:slug` paths silently display Rayto Prolog, and other unknown paths render the homepage. There is no 404 view.
- The form validates fields in the browser and posts to Formspree, but `FORMSPREE_ID` is still `YOUR_FORMSPREE_ID`; as checked in, submissions cannot be delivered. There is no Vercel-compatible backend route.
- Availability is asserted in the hero copy. The brief says to show this only after confirmation, which has not been supplied.
- The nav toggle is 38px square, below the requested 44px minimum touch target. Form validation text is not associated with inputs using `aria-describedby`/`aria-invalid`, and status changes lack a live region.

### Visual and content quality

- The dark base is `#090D16`, but the current theme has many blue/slate surfaces and a second cyan accent (`#06B6D4`) in addition to mint green. The hero includes animated radial glows, which conflict with the anti-orb direction.
- Typography uses Bricolage Grotesque with Inter, loaded from Google Fonts; Inter is disallowed by the brief, and neither face is self-hosted. Pricing and case-study CSS still refer to Plus Jakarta Sans, which is not loaded by `index.html`.
- The homepage uses a floating blurred nav, theme controls, a busy hero glow/grid, and repeated high-detail content. Services, philosophy, experience, skills, pricing, and work are spread across a long page without the requested concise process section.
- Some secondary UI is generic or inconsistent: emoji category marks on the pricing page, rounded card treatments, theme-specific duplicated color systems, and different typeface references across pages.
- Project records do not include verified project years. Outcomes are qualitative, not supported by measured metrics. No testimonials are supplied. Do not invent dates, outcomes, client quotes, or availability.
- LinkedIn is an empty string. The resume PDF does not exist at its referenced path. No designed 1200x630 social preview image is present; current OG image points to a portrait photo reported as 832x837.
- Existing source copy includes a response-within-24-hours claim; retain only if Smart Moses confirms it.

### Accessibility, performance, and SEO

- The app has no automated test, accessibility, or type-check script. The current parse error prevents meaningful build/lint verification.
- The hero image has no declared intrinsic dimensions or high fetch priority. Fonts require remote requests. Below-the-fold images have mixed eager/lazy behavior, and image formats/sizes need runtime review.
- The skip link and focus rule exist, but keyboard behavior and contrast still need a full pass. Mobile navigation and status/error announcements need stronger semantics.
- SEO fundamentals are in place, but the OG image is the wrong aspect/asset, social metadata needs a designed image, and client-side routes rely on SPA rewrites. There is no route-specific 404 metadata.
- Lighthouse and axe scores have not been measured. Targets are aspirations, not verified results.

## Content Gaps for TODO.md

- Formspree form ID (or approval/configuration for another email delivery provider).
- Résumé PDF.
- LinkedIn profile URL.
- Verified year/date for each featured project and confirmation of the response-time claim.
- A designed 1200x630 social-sharing image.
- Real testimonial(s), if available; otherwise keep testimonials omitted.

## Design Direction

Keep the `#090D16` dark foundation and give it an editorial, quietly technical character: an off-axis typographic hero, crisp rules, a disciplined 12-column content grid, and project stories presented as large, asymmetric image-and-copy spreads. Remove atmospheric glows and the extra cyan accent. Use Instrument Serif for expressive display moments and DM Sans for readable interface/body copy, self-hosted with `font-display: swap`. Proposed tokens: background `#090D16`; surfaces `#111820`, `#172127`, `#202B2D`; text `#F2F1EA`; muted text `#A8B1AD`; single mint accent `#8FC7AE`; borders derived from a low-opacity text token. Dark remains the default; retain light mode only if its contrast and art direction can be kept equally deliberate.
