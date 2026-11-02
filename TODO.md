# Owner-Supplied Items

The site avoids invented availability, dates, testimonials, and performance claims. The following details need Smart Moses's input or configuration:

## Required for form delivery

- Add `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL` in Vercel. `CONTACT_TO_EMAIL` defaults to the existing address, `smartmoses@gmail.com`.
- Test the deployed form and confirm the message arrives. Until configured, the form explains that delivery failed and offers direct email.

## Content and launch polish

- Provide a LinkedIn profile URL if you want it linked; none was present in the repository.
- Confirm the year for each project if years should appear. The portfolio currently labels them “Not provided” rather than guessing.
- Add a real testimonial only if one is available. The testimonial section is intentionally omitted until then.
- Check the SVG social preview on the platforms you use. If a platform requires raster OG media, supply an approved 1200 × 630 image and update `index.html`.
- A résumé PDF is not present at `public/assets/pdf/Smart-Moses-Resume.pdf`; the portfolio does not expose a broken download link. Add the actual PDF before adding a résumé CTA.

## Optional

- Confirm whether the direct-contact response-time statement from the previous copy (“within 24 hours”) is still accurate. It has been omitted from the redesign.
- Review pricing copy and currency before publishing changes to the existing pricing page.
