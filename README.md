# Daniel Joseph Corona — Developer Portfolio

A clean, responsive personal portfolio built from scratch with vanilla HTML, CSS, and JavaScript.
Hosted for free on GitHub Pages at [danjocorona.github.io](https://danjocorona.github.io).

---

## Overview

This portfolio was built as a professional showcase for software engineering job applications.
The goal was to write everything from scratch — no frameworks, no build tools, no dependencies —
to demonstrate a solid understanding of core web fundamentals while producing a polished,
production-quality result.

---

## Features

- **Fully responsive** — works on mobile, tablet, and desktop
- **Smooth scroll reveal** — sections animate in as you scroll using the `IntersectionObserver` API
- **Sticky frosted-glass nav** — navbar transitions on scroll with a blur backdrop effect
- **Active nav link highlighting** — the current section is reflected in the navigation
- **Mobile hamburger menu** — collapsible nav for small screens, closes on outside click
- **Contact form** — validated client-side, submitted via Formspree (no backend needed)
- **Resume download** — direct link to a PDF in the `assets/` folder
- **Accessible markup** — semantic HTML5 elements, `aria-label` attributes, and `role` hints throughout

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5 (semantic elements)           |
| Styling    | CSS3 (custom properties, grid, flexbox, animations) |
| Scripting  | Vanilla JavaScript (ES6+)           |
| Fonts      | Google Fonts — Syne, JetBrains Mono, Inter |
| Forms      | Formspree (free tier)               |
| Hosting    | GitHub Pages (free)                 |

No npm. No build step. No frameworks. Just files.

---

## Project Structure

```
danieljcorona.github.io/
├── index.html          # All HTML — semantic structure, sections, nav, footer
├── css/
│   └── style.css       # All styles — tokens, layout, components, animations, responsive
├── js/
│   └── main.js         # All JavaScript — scroll reveal, nav, hamburger, contact form
├── assets/
│   └── resume.pdf      # Resume — linked from nav and About section
└── README.md           # This file
```

### Why separate files?

Keeping HTML, CSS, and JavaScript in separate files is a standard professional practice.
Each file has a single responsibility — structure, presentation, and behavior — making the
codebase easier to read, maintain, and extend. This also demonstrates the separation of
concerns principle, which is fundamental to writing clean, scalable code.

---

## Sections

| Section  | Description |
|----------|-------------|
| **Hero** | Full-viewport landing with name, role, bio, CTAs, and social links |
| **About** | Bio, highlights, animated avatar placeholder, and resume download |
| **Skills** | Six cards covering languages, frontend, backend, cloud/DevOps, ML, and tooling |
| **Projects** | Featured project card plus three standard project cards with GitHub and demo links |
| **Blog** | Writing showcase — article cards linking to posts |
| **Contact** | Info panel with a validated, working contact form |

---

## How It Works

### CSS Custom Properties
All colors, spacing, and sizing values are defined as CSS variables in `:root` at the top of
`style.css`. This makes global theme changes — like swapping the accent color — a one-line edit.

### Scroll Reveal
Every element that animates on scroll has the class `reveal` applied in HTML. In `style.css`,
`.reveal` starts elements at `opacity: 0` and shifted down 30px. In `main.js`, an
`IntersectionObserver` watches all `.reveal` elements and adds the class `.visible` when they
enter the viewport, triggering a CSS transition that fades and slides them into place.
Each element is unobserved after its first animation so it only plays once.

### Navigation Scroll Effect
A scroll event listener in `main.js` adds the class `.scrolled` to the `<nav>` element once
the user passes 20px. In `style.css`, `.scrolled` applies a semi-transparent dark background
with `backdrop-filter: blur()` — creating the frosted-glass effect.

### Active Nav Link
A second `IntersectionObserver` watches each `<section>` with an `id`. When a section reaches
40% visibility, the corresponding nav link gets the `.active` class, keeping the nav in sync
with the current scroll position.

### Contact Form
The form validates client-side (required fields, email format) before sending. On submit, it
uses `fetch()` to POST JSON to a Formspree endpoint. Formspree forwards the message to the
configured email address — no server or backend required. A status message confirms success
or surfaces errors inline.

---

## Setup & Deployment

### Run locally
No build step needed. Just open `index.html` in your browser, or use VS Code's Live Server
extension for auto-reload during development.

### Deploy to GitHub Pages
1. Create a repository named `yourusername.github.io`
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source: main branch / root**
4. Your site is live at `https://yourusername.github.io` within ~60 seconds

### Activate the contact form
1. Sign up for a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint ID (e.g. `xpwzabcd`)
3. In `js/main.js`, replace `YOUR_FORM_ID` with your real ID:
   ```js
   const response = await fetch('https://formspree.io/f/xpwzabcd', { ... });
   ```

### Add your resume
Drop your PDF into the `assets/` folder as `resume.pdf`. All resume buttons and links
in the HTML already point to `assets/resume.pdf`.

---

## Customization

All placeholder content is clearly marked in the files. The main things to update:

- **`index.html`** — your name, bio, project titles/descriptions/links, blog posts, email, GitHub and LinkedIn URLs
- **`js/main.js`** — replace `YOUR_FORM_ID` with your Formspree endpoint
- **`assets/resume.pdf`** — add your actual resume
- **`css/style.css`** — swap `--accent` in `:root` to change the color scheme site-wide

---

## License

This project is open source and available under the [MIT License](LICENSE).
Feel free to fork it and make it your own — just swap in your own content.
