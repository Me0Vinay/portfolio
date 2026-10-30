# Vinay Kr — Data Engineer & BI Developer portfolio

A static, dependency-free portfolio site: plain HTML, CSS and hand-drawn inline SVG. No build step.

```
portfolio-website/
├── index.html            page structure, SVG icon sprite, hero and architecture illustrations
├── assets/css/style.css  theme tokens (dark default, light toggle) and layout
├── assets/js/main.js     all project content (edit the arrays at the top) + interactions
└── assets/img/           favicon and the blurred dashboard screenshots
```

## Publish on GitHub Pages (free)

Your existing site lives at `https://me0vinay.github.io/portfolio/`, so the simplest path is to replace that repository's contents.

**Option A — GitHub website (no terminal)**
1. Open `github.com/me0vinay/portfolio`.
2. Delete the old files (or move them to a branch called `old-site` first if you want a backup).
3. Click **Add file → Upload files**, drag in everything inside this folder (`index.html`, `assets/`, `.nojekyll`, `README.md`), and commit.
4. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. The site is live within a minute or two.

**Option B — terminal**
```bash
git clone https://github.com/me0vinay/portfolio.git
```
Copy this folder's contents into the cloned `portfolio` folder (replacing the old files), then:
```bash
cd portfolio && git add -A && git commit -m "New portfolio site" && git push
```

## Editing content

- Project types, labs, independent BI projects, demo dashboard data and skills: the arrays at the top of `assets/js/main.js`.
- Experience, education and contact: directly in `index.html`.
- After changing CSS or JS, bump the `?v=3` query on the `<link>` / `<script>` tags in `index.html` so browsers fetch the new version.

## Notes

- The live demo dashboard uses synthetic data generated in the browser; no company data is shipped with the site.
- The hero pipeline is clickable: press **Run pipeline** or click any node.
