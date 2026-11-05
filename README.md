# Divine Souls Club

Single page React and Vite website for Divine Souls Club.

## Requirements

- Node.js 22.12 or newer
- npm

## Local development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm ci
npm run build
npm run preview
```

The production site is generated in `dist/`. Publish the contents of that folder at the root of the chosen subdomain. The site uses hash navigation and does not need server side route rewrites.

## Before launch

1. Add the verified email, phone, WhatsApp, and social profile URLs to `src/data/siteConfig.json`.
2. Replace the clearly marked sample testimonials with approved customer feedback.
3. Keep image credits and licence information in `src/data/imageCredits.json` with the related photos.
4. Set the subdomain DNS records and custom domain in the hosting provider, then verify HTTPS is enabled.

The destination and experience content is maintained in JSON under `src/data/`.
