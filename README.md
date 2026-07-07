# cd3vane.dev

Personal site and portfolio of **Charles DeVane** — full-stack developer in Boca Raton, FL.

Live at [cd3vane.dev](https://cd3vane.dev).

## Stack

Deliberately minimal: hand-written HTML, CSS, and vanilla JavaScript served straight by
GitHub Pages (`.nojekyll`, no build step, no framework, no theme).

- `index.html` — the whole site: philosophy, projects, experience, contact
- `assets/css/main.css` — design system (light/dark via CSS custom properties)
- `assets/js/main.js` — theme toggle, scroll-reveal, footer year
- `404.html` — not-found page
- `assets/files/` — résumé PDF

## Developing locally

No dependencies. Serve the directory and open it:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```
