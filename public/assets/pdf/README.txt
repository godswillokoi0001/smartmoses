Résumé PDF
===========

This directory is where the résumé PDF belongs.

Expected filename (must match RESUME_PATH in src/App.jsx):

    Smart-Moses-Resume.pdf

Current state
-------------
The PDF is NOT in the repository. Because of that, the résumé buttons in
src/App.jsx do not link anywhere — they render in a "PDF pending" state
instead of being dead download links.

To enable them:

1. Copy the résumé PDF into this directory and rename it to
   Smart-Moses-Resume.pdf
2. Open src/App.jsx and set:

       const RESUME_READY = true

No other change is needed — the button becomes a real download, and the
"PDF pending" label disappears.

Until then, visitors are pointed to the contact section instead.
