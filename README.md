# Mecka Annotation Dashboard

React/Vite staging dashboard for the Mecka pilot. The live mock data refreshes automatically while the dashboard is open.

## Local development

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## GitHub Pages staging

Push to `main` to build and deploy through [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.

The staging site will be available at:

<https://linden-m.github.io/Mecka-Annotation-Dash/>
