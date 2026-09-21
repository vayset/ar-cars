# A.R. Cars — GitHub Pages

Public Dutch information website for A.R. Cars, Oudenaarde.

## Hosting

GitHub Pages publishes `/docs` from the `main` branch. The URL uses the `/ar-cars/` base path. No server runtime, secrets or customer records are included.

Garage services, advice, FAQs and business information are static. Vehicle inventory, vehicle details, contact forms and administration link to the existing application at https://ar-cars-oudenaarde.fond-trail-0951.chatgpt.site. The original business website remains the canonical SEO URL.

The restrained, photo-led premium home page is the main entry point. All static pages share the night-premium identity with the live catalogue, contact forms and admin. Updates made in the original administration appear on the live catalogue without rebuilding these information pages. Fictional vehicles remain visibly labelled.

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

## Restrained premium home

The main site now uses real workshop photography and a subtle CSS entrance. The rotating/exploded 3D wheel is no longer loaded. `/experience/` redirects to the main homepage. The earlier experiment remains under `source/experience` for source history only.

`npm run build` exports the published homepage and information pages. `SOURCE_ORIGIN` can point to a local production server for development. `node scripts/verify-export.mjs` verifies generated navigation and assets.
