# A.R. Cars — GitHub Pages

Public Dutch information website for A.R. Cars, Oudenaarde.

## Hosting

GitHub Pages publishes `/docs` from the `main` branch. The URL uses the `/ar-cars/` base path. No server runtime, secrets or customer records are included.

Garage services, advice, FAQs and business information are static. Vehicle inventory, vehicle details, contact forms and administration link to the existing application at https://ar-cars-oudenaarde.fond-trail-0951.chatgpt.site. The original business website remains the canonical SEO URL.

The premium 3D home page is the main entry point. All static pages share the night-premium identity with the live catalogue, contact forms and admin. Updates made in the original administration appear on the live catalogue without rebuilding these information pages. Fictional vehicles remain visibly labelled.

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

## Night premium concept

The home page features the approved procedural Three.js wheel. `/experience/` redirects to the full home page. Scroll separates tire, alloy and brake; desktop pointer dragging changes the viewing angle. Motion can be paused and the system reduced-motion preference is respected. Garage, inventory and contact links still lead to the working site. Every logo and breadcrumb leads back to the premium home page.

The editable scene remains in `source/experience`. `npm run build:experience` builds its assets; the Sites checkout’s `scripts/sync-premium.mjs` scopes and imports them into the full app. Publish the app, then run `npm run build` here to export the complete public information site. For local verification, set `SOURCE_ORIGIN` to the local app origin. Its source is in `source/experience`; the studio background is AI-generated illustrative imagery, not a vehicle offered for sale. Real workshop photographs remain in the workshop section. The 3D assembly is a visual illustration rather than a vehicle-specific technical model. Three.js is bundled locally; no third-party scripts are loaded at runtime.

The performance wheel uses an original five-twin-spoke model with a low-profile tire, continuous drainage grooves, molded lettering, a concave machined face, anthracite barrel, drilled rotor and detailed caliper. Its visual reference is the [Mercedes-Benz AMG five-twin-spoke wheel](https://store.mercedes-benz.com/global/en/AMG-5-twin-spoke-wheel-50.8-cm-20-inch-High-sheen-rim-flange/A25740131007X71). The model retains A.R. Cars branding and is not presented as an OEM replica or product specification.
