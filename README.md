# AI OS Site

Documentation website for [AI OS](https://github.com/marinvch/ai-os) — context-enriched GitHub Copilot framework.

**Live site:** https://marinvch.github.io/ai-os-site/

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown) with syntax highlighting
- Deployed to [GitHub Pages](https://pages.github.com/) via GitHub Actions

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
