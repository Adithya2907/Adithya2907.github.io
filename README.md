# Adi — Personal Site

Static personal website for Adi. GitHub Pages publishes a technical-only copy prepared from `dist/`; the local preview and the ChatGPT-hosted copy retain the Elsewhere section.

The account-site repository is named `Adithya2907.github.io`, so the site is served at the root of `https://adithya2907.github.io` and the site's root-relative asset URLs work as written.

## Local preview

```sh
python3 -m http.server 4173 --directory dist
```

Pushes to `main` prepare and deploy the technical-only site to GitHub Pages. The local preview uses the full `dist/` site, including Elsewhere. There is no custom domain configured.
