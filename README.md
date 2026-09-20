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

## Night premium concept

`/experience/` is an interactive art-direction preview with a procedural Three.js wheel. Scroll separates tire, alloy and brake; desktop pointer dragging changes the viewing angle. Motion can be paused and the system reduced-motion preference is respected. Garage, inventory and contact links still lead to the working site. The existing home page is preserved for comparison.

Rebuild only this concept with `npm run build:experience`. Its source is in `source/experience`; the studio background is AI-generated illustrative imagery, not a vehicle offered for sale. Real workshop photographs remain in the workshop section. The 3D assembly is a visual illustration rather than a vehicle-specific technical model. Three.js is bundled locally; no third-party scripts are loaded at runtime.

The performance wheel uses an original five-twin-spoke model with a low-profile tire, continuous drainage grooves, molded lettering, a concave machined face, anthracite barrel, drilled rotor and detailed caliper. Its visual reference is the [Mercedes-Benz AMG five-twin-spoke wheel](https://store.mercedes-benz.com/global/en/AMG-5-twin-spoke-wheel-50.8-cm-20-inch-High-sheen-rim-flange/A25740131007X71). The model retains A.R. Cars branding and is not presented as an OEM replica or product specification.
