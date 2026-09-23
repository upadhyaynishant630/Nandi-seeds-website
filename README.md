# Nandi Seeds - Website

React + Vite single page application for a seed company: product
catalogue, services, gallery, dealer application and enquiry form.

---

## Tech Stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Build tool | Vite 8                                    |
| UI         | React 19 + react-router-dom 7             |
| Icons      | react-icons (Feather + Font Awesome sets) |
| Styling    | Plain CSS, one file per component/page    |
| Linting    | oxlint                                    |
| Backend    | Express 5 + optional MySQL + Nodemailer   |

---

## Getting Started

```bash
npm install          # install dependencies
npm run dev          # start the dev server on http://localhost:5173
npm run server       # start the enquiry API on http://localhost:5000
npm run build        # production build into /dist
npm run preview      # preview the production build
npm run lint         # run oxlint
```

Create your local environment file before running the API:

```bash
copy .env.example .env      # Windows
cp .env.example .env        # macOS / Linux
```

The API works even with an empty `.env` - it simply logs enquiries
instead of storing and emailing them.

---

## Folder Structure

```
Nandi-seeds-website/
├── public/
│   ├── favicon.svg
│   └── images/                  static assets, referenced as /images/...
│       ├── about/               facility, lab, team photos
│       ├── gallery/             event and field photos
│       ├── hero/                home page hero image
│       ├── logo/                brand logo & wordmark
│       ├── products/            one image per seed variety
│       └── services/            service photos
├── server/
│   └── server.cjs               Express enquiry API
├── src/
│   ├── component/               reusable layout pieces
│   │   ├── FloatingSocial.jsx/.css
│   │   ├── Footer.jsx/.css
│   │   ├── Navbar.jsx/.css
│   │   ├── PageHero.jsx/.css
│   │   └── ScrollToTop.jsx
│   ├── data/                    content lives here, not in components
│   │   ├── icons.js             string key -> react-icons component
│   │   ├── products.js          seed catalogue + lookup helpers
│   │   └── siteData.js          contact info, nav, services, FAQs
│   ├── pages/                   one route per page
│   │   ├── About.jsx/.css
│   │   ├── Contact.jsx/.css
│   │   ├── Dealers.jsx/.css
│   │   ├── Gallery.jsx/.css
│   │   ├── Home.jsx/.css
│   │   ├── NotFound.jsx/.css
│   │   ├── ProductDetail.jsx/.css
│   │   ├── Products.jsx/.css
│   │   └── Services.jsx/.css
│   ├── utils/
│   │   └── submitEnquiry.js     fetch + validation for the forms
│   ├── App.css                  app shell + shared blocks & form controls
│   ├── App.jsx                  routes and global layout
│   ├── index.css                design tokens, reset, utilities
│   └── main.jsx                 React entry point
├── .env.example
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
└── vite.config.js
```

---

## Routes

| Path                  | Page            | Purpose                                    |
| --------------------- | --------------- | ------------------------------------------ |
| `/`                   | `Home`          | Hero, stats, featured seeds, testimonials  |
| `/about`              | `About`         | Story, mission, values, certifications     |
| `/products`           | `Products`      | Searchable catalogue with category filter  |
| `/products/:slug`     | `ProductDetail` | Full specification for one variety         |
| `/services`           | `Services`      | Services, delivery process, FAQ            |
| `/gallery`            | `Gallery`       | Filterable photo grid                      |
| `/dealers`            | `Dealers`       | Dealership pitch + application form        |
| `/contact`            | `Contact`       | Enquiry form + contact details             |
| `*`                   | `NotFound`      | 404 fallback                               |

The `/products` filter is reflected in the URL, for example
`/products?category=Cereals`, so the footer shortcuts and shared links
open the correct tab.

---

## Where To Edit Things

| I want to change...                | Edit this file                        |
| ---------------------------------- | ------------------------------------- |
| Phone, email, address, map link     | `src/data/siteData.js` → `SITE`       |
| Navigation menu items                | `src/data/siteData.js` → `NAV_LINKS`  |
| Social media links                   | `src/data/siteData.js` → `SOCIAL_LINKS` |
| Home page stats                      | `src/data/siteData.js` → `STATS`      |
| Why-choose-us blocks                 | `src/data/siteData.js` → `VALUES`     |
| Services list                        | `src/data/siteData.js` → `SERVICES`   |
| Testimonials                         | `src/data/siteData.js` → `TESTIMONIALS` |
| Gallery photos and categories        | `src/data/siteData.js` → `GALLERY_*`  |
| FAQs                                 | `src/data/siteData.js` → `FAQS`       |
| Seed varieties and specifications    | `src/data/products.js`                |
| Brand colours, fonts, spacing        | `src/index.css` → `:root` tokens      |

`src/data/products.js` holds `SEED_CATEGORIES` and `PRODUCTS`. A product
slug must match its image file name in `public/images/products/`, e.g.
slug `maize-hybrid-nandi-555` expects `maize-hybrid-nandi-555.jpg`.

Adding a new variety is a single object in the `PRODUCTS` array - both
the catalogue grid and the detail page pick it up automatically.

---

## Enquiry API

`server/server.cjs` exposes:

| Method | Endpoint       | Body                                               |
| ------ | -------------- | -------------------------------------------------- |
| `GET`  | `/`            | health check, reports DB/mail status                |
| `POST` | `/api/contact` | `{ formType, fullName, email, phone, subject, message }` |

`formType` is `"contact"` or `"dealer"`. Dealer submissions also send
`businessName`, `district`, `state` and `monthlyVolume`.

Successful response:

```json
{
  "success": true,
  "message": "Thank you! Your enquiry has been received...",
  "enquiryId": "NS-XXXXXX-XXXX"
}
```

The front end calls `/api/contact` on the same origin, and Vite proxies
`/api` to `http://localhost:5000` during development (see
`vite.config.js`), so no base URL is required locally. For production set
`VITE_API_BASE_URL` to the deployed API origin.

To store enquiries, create the table:

```sql
CREATE TABLE enquiries (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  enquiry_id     VARCHAR(32) NOT NULL UNIQUE,
  form_type      VARCHAR(20) NOT NULL DEFAULT 'contact',
  full_name      VARCHAR(120) NOT NULL,
  email          VARCHAR(160) NOT NULL,
  phone          VARCHAR(32)  NOT NULL,
  subject        VARCHAR(160),
  message        TEXT NOT NULL,
  business_name  VARCHAR(180),
  district       VARCHAR(120),
  state          VARCHAR(120),
  monthly_volume VARCHAR(60),
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If MySQL or SMTP credentials are absent the endpoint still returns
success and logs the enquiry to the console, which keeps local
development friction-free.

---

## Conventions

- One `.css` file per `.jsx` file, imported at the top of the component.
- Content belongs in `src/data/`, never hard-coded inside a component.
- Global tokens and utility classes live in `src/index.css`.
- Shared blocks (`.split`, `.cta-band`, `.tick-list`, `.form-*`) live in
  `src/App.css`; page CSS only holds page-specific rules.
- Section comments use the banner style already present in the codebase.
- All interactive elements have an accessible label; images always carry
  meaningful `alt` text.
- Every page is responsive: base styles target mobile, `min-width` media
  queries scale up, and grids use `auto-fit`/`minmax`.

---

## Deployment

```bash
npm run build      # output goes to /dist
```

Deploy `/dist` to Netlify, Vercel, Cloudflare Pages or any static host.
Because routing is client side, configure a SPA fallback so unknown paths
serve `index.html`:

- **Netlify** - add `_redirects` with `/*  /index.html  200`
- **Vercel** - add a rewrite of `/(.*)` to `/index.html`
- **Apache / Nginx** - fall back `try_files $uri $uri/ /index.html;`

Run `server/server.cjs` separately (Render, Railway, a VPS) and point
`VITE_API_BASE_URL` plus the backend `FRONTEND_URL` at each other.
