# Trailhead — Job Portal

A responsive job portal built with React, React Router and hooks. Jobs are
fetched live from the [Remotive](https://remotive.com/api-documentation)
public REST API — no API key required.

## Features

- Job listings fetched from a REST API (`useEffect` + `fetch`)
- Client-side pagination (9 jobs per page)
- Search (title/company) + filters for job type, category and location
- Job details page (`/jobs/:id`)
- "Save for later" list stored in `localStorage`, shared via `useContext`
  (`/saved`)
- Application form with validation (`/apply/:id`)
- Loading, error and empty states
- Fully responsive layout (sidebar filters collapse to a stacked layout on
  mobile)

## Tech

React 18 · React Router 6 · Vite · plain CSS (no framework) · React Hooks
(`useState`, `useEffect`, `useContext`, `useMemo`)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output goes to `dist/`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Job portal: React + hooks + REST API"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Deploy

Any static host works since this is a Vite SPA. Two easy options:

**Netlify / Vercel**
1. Import the GitHub repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Because this is a single-page app with client-side routes, add a rewrite
   rule so all paths fall back to `index.html`:
   - Netlify: create `public/_redirects` with `/* /index.html 200`
   - Vercel: add a `vercel.json` with a rewrite to `/index.html`

**GitHub Pages**
1. `npm run build`
2. Deploy the `dist/` folder to the `gh-pages` branch (e.g. with the
   `gh-pages` npm package), and set `base` in `vite.config.js` to your repo
   name if it's a project page.

## Project structure

```
src/
  components/    Navbar, Filters, JobCard, Pagination, StatusViews
  context/       JobContext.jsx — saved-jobs state (useContext + localStorage)
  hooks/         useJobs.js — fetch, search/filter and pagination logic
  pages/         Home, JobDetails, SavedJobs, ApplyForm
  App.jsx        Routes
  index.css      Design tokens + all styling
```

## Notes

- The Remotive API returns job descriptions as HTML, which is rendered with
  `dangerouslySetInnerHTML` on the details page. This is fine for a public,
  trusted feed like Remotive's — if you swap in a different API, sanitize
  that HTML first (e.g. with `dompurify`) before rendering it.
- The application form doesn't submit anywhere yet — it validates and shows
  a confirmation. Wire `handleSubmit` in `ApplyForm.jsx` to your own backend
  or an email service if you need real submissions recorded.
