# Image Assets

Drop all site imagery into these folders. Paths are referenced from the
`public/` root, so a file saved as `public/images/hero/field.jpg` is used
in JSX as `/images/hero/field.jpg`.

| Folder      | Used by                   | Recommended content                              |
| ----------- | ------------------------- | ------------------------------------------------ |
| `logo/`     | Navbar, Footer            | brand logo & wordmark (SVG preferred)            |
| `hero/`     | Home                      | wide field / harvest shots, 1920x1080+           |
| `products/` | Products, ProductDetail   | one clear pack or crop photo per seed variety    |
| `about/`    | About                     | facility, lab, team, founder photos              |
| `services/` | Services                  | field trials, agronomy visits, quality testing   |
| `gallery/`  | Gallery                   | event, exhibition and farmer meet photos         |

## Conventions

- Use lowercase, hyphenated file names: `tomato-hybrid-204.jpg`.
- Prefer `.webp` or `.jpg`; keep individual files under ~300 KB.
- Always pass a meaningful `alt` text in JSX for accessibility.
- The product slugs in `src/data/products.js` map 1:1 to file names here.
