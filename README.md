# vrajmpatel-portfolio

Personal portfolio site for Vraj Patel — Systems Integration Engineer & ML Researcher, built with Astro 6, Tailwind CSS 4, and deployed at [vrajmpatel.com](https://www.vrajmpatel.com).

## Tech Stack

- **Framework:** [Astro](https://astro.build/) v6
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 (via Vite plugin)
- **Fonts:** Inter & IBM Plex Mono (Google Fonts)
- **SEO:** `@astrojs/sitemap`, JSON-LD structured data, Open Graph meta

## Project Structure

```text
src/
├── components/         # Reusable Astro components (ProjectCard, ExperienceItem)
├── content/
│   ├── experience/     # Markdown entries for work experience
│   └── projects/       # Markdown entries for projects
├── layouts/            # BaseLayout with head, nav, footer
├── pages/              # index, /projects, /experience
└── styles/             # Global CSS (Tailwind imports, theme)
public/                 # Static assets (resume, research papers, images)
```

## Getting Started

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Build for production to ./dist/
npm run preview    # Preview the production build locally
```

Requires Node.js >= 22.12.0.
