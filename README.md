# FromZero — Build Your Own X Explorer

Responsive searchable frontend for [build-your-own-x](https://github.com/codecrafters-io/build-your-own-x).

Features: upstream README fetch, category/tutorial parsing, text search, category and language filters, sorting, progressive display, responsive interface, loading/error/empty states.

## Run locally
Open index.html, or run `python -m http.server 8000` then visit http://localhost:8000.

## Deploy
Configure GitHub Pages to deploy from the root of the main branch.

## Notes
The browser fetches the source README at runtime; connection and CORS availability are required. Language detection is heuristic and missing labels are displayed as Not specified.