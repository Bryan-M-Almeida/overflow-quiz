# The Overlay Technique — interactive presentation

Interactive web presentation (in Spanish) for a university talk on **«La Técnica de Overlay: Ejecutando Programas Más Grandes que la Memoria»** (Memory Management).
Author: Bryan Maciel de Almeida · Systems Engineering · UPDS.

Built with React, Vite, TypeScript, Tailwind CSS and React Router. Fonts and every other asset are bundled, so nothing is fetched from a CDN at runtime.

## Routes

| Route | Content |
| --- | --- |
| `/` | Presentation (11 screens, including the memory simulator) |
| `/quiz` | 9-question mobile quiz, opened from the QR code |
| `/bibliografia` | APA 7 bibliography |

## Run locally

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Presenter controls

| Key | Action |
| --- | --- |
| `→` / `←`, `PageDown` / `PageUp`, `Space` | Next / previous screen |
| `Home` / `End` | First / last screen |
| `N` | Toggle speaker notes |
| `Q` | Full-screen QR code to the quiz |
| `F` | Browser full screen |
| `Esc` | Close notes or QR |

On viewports at least 1024 px wide and 600 px tall the site runs in slide mode. On smaller screens the same screens stack in a vertical scroll. The current screen is kept in the URL hash (`/#4`).

## `VITE_SITE_URL`

The QR code points to `${VITE_SITE_URL}/quiz`. Set it to the public URL of the deployment, without a trailing slash:

```bash
cp .env.example .env.local
# then edit .env.local:
# VITE_SITE_URL=https://your-project.vercel.app
```

If it is not set, the app falls back to the current origin (handy in development, but the QR would point to `localhost`, which phones cannot open).

The variable is read at **build time**, so rebuild or redeploy after changing it.

The production URL (`https://la-tecnica-de-overflow.vercel.app`) is committed in `.env.production`. A `VITE_SITE_URL` set in Vercel's Environment Variables takes precedence over it.

## Deploy to Vercel

1. Push this repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The Vite preset is detected automatically (build: `npm run build`, output: `dist`).
3. Under **Settings → Environment Variables**, add `VITE_SITE_URL` with the project's public URL (e.g. `https://your-project.vercel.app`).
4. Deploy, or redeploy if you added the variable after the first deploy.

`vercel.json` rewrites every path to `index.html`, so `/quiz` and `/bibliografia` work when opened directly.

With the Vercel CLI instead:

```bash
npx vercel --prod
```

## Privacy

The quiz needs no sign-up and collects no personal data. The last score is stored only in the browser's `localStorage`.
