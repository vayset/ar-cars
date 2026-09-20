# A.R. Cars — GitHub Pages

Public Dutch information website for A.R. Cars, Oudenaarde.

## Hosting

GitHub Pages publishes `/docs` from the `main` branch. The URL uses the `/ar-cars/` base path. No server runtime, secrets or customer records are included.

Garage services, advice, FAQs and business information are static. Vehicle inventory, vehicle details, contact forms and administration link to the existing application at https://ar-cars-oudenaarde.fond-trail-0951.chatgpt.site. The original business website remains the canonical SEO URL.

The home page contains a snapshot of the demonstration vehicles, clearly labelled as fictional. The catalogue link opens the current inventory. Updates made in the original administration do not automatically rebuild this static website.

## Refresh the static pages

With Node.js 22 or newer:

```sh
npm ci
npm run build
```

Review the changes in `docs`, then commit and push. The exporter copies only explicitly listed public routes and their assets from the existing site, restores accessible FAQ controls, rewrites links for GitHub Pages, and replaces embedded forms with links to the working contact page. It does not read protected APIs or private customer records.

`source/content.mjs` provides the FAQ answers and route list. Update it together with changes to the business content. If the GitHub repository name changes, update the `base` constant in `scripts/export.mjs` before rebuilding.

## Photography

Garage photographs and branding were supplied for this website. Vehicle images are demonstration illustrations; attribution and licensing details appear on the image credits page. Font licenses are preserved under `docs/fonts`.
