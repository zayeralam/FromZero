# FromZero — Build Your Own X Explorer

A lightweight, responsive explorer for tutorials in [build-your-own-x](https://github.com/codecrafters-io/build-your-own-x).

## Features

- Live README retrieval with fallback branch.
- Category navigation, language filters, search, alphabetical sorting and progressive rendering.
- Refresh controls and keyboard shortcuts: **/** to focus search, **Escape** to clear.
- Responsive layout, status announcements, loading/error states, and zero dependencies.

## Run locally

Open `index.html`, or run `python -m http.server 8000` and visit http://localhost:8000.

## Deploy

The workflow tests the parser and deploys to GitHub Pages on pushes to `main`. In repository Settings → Pages, choose **GitHub Actions** as the deployment source if needed.

## Data and limitations

The source README is fetched at runtime; network connectivity is required. Language detection is heuristic and unknown languages may appear as **Not specified**.