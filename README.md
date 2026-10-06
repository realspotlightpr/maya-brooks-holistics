# Maya Brooks sales site

Static, mobile-first sales page for **The Stronger After 40 Reset**.

## Preview locally

Run a static server from this folder, then open the local URL in a browser.

## Connect checkout before publishing

The current buy buttons use a purchase-request email link so the page never pretends to accept payment. Replace every `href` on `.buy-link` elements in `index.html` with one live checkout URL from Gumroad, Payhip, Stripe Payment Links, or another provider.

After payment is complete, configure the provider to deliver:

`../product/output/pdf/Stronger-After-40-Reset.pdf`

## Publish

The folder can be deployed as-is to Netlify, Cloudflare Pages, GitHub Pages, or any static web host. Keep `index.html`, `desktop.html`, `design.css`, `script.js`, and the `assets` directory together. `DESIGN.md` documents the visual system.

## Transparency

The footer and About section disclose that Maya is a virtual creator and that the guide is educational, not medical care. Keep those disclosures in the published version.
