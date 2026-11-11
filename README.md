# KANAL TAROT — GitHub Pages site

A mobile-first, static Filipino meme-inspired Major Arcana tarot experience.

## Run locally
Because the site fetches `cards.json`, run it through a local web server (not by double-clicking `index.html`).

```bash
python -m http.server 8000
```
Open http://localhost:8000.

## Publish with GitHub Pages
1. Create a public GitHub repository named `kanal-tarot`.
2. Upload the contents of this folder to the repository root (keep `index.html`, `styles.css`, `app.js`, and `cards.json` together).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for the Pages deployment to finish. GitHub will show the public site URL in Settings → Pages.

## Project structure
- `index.html` — page structure and sections
- `styles.css` — responsive visual system, motion, and reduced-motion support
- `app.js` — shuffle, selection, category-specific readings, sharing, and UI logic
- `cards.json` — all 22 Major Arcana records (meanings, captions, symbolism)

## Future integrations
The current site is frontend-only. The code is structured so future services can be added behind server-side APIs:
- accounts and saved readings: authentication + database
- daily card: date-seeded server or client draw
- downloadable PDF: PDF generation service
- GCash / premium readings: use a legitimate payment gateway and server-side verification; never collect payment details directly in this static site
- booking and admin: authenticated backend with role-based access

No payment collection, login, booking, or personal-data storage is active in this starter version.

## Notes
Card illustrations are original emoji-led symbolic compositions with ornamental CSS framing, not reproductions of copyrighted reaction memes. Tarot interpretations are for reflection and entertainment, not guaranteed predictions or professional advice.
