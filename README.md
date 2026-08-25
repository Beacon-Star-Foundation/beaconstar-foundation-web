# Beacon Star Foundation — website

Static site for the Beacon Star Foundation (星星之火基金會), a 501(c)(3)
nonprofit in Los Angeles, live at <https://beaconstarfoundation.org>.
Plain HTML — no build step, no dependencies.

## Pages

Every page exists in all three languages. Filenames are `page-language`, so
the three versions of a page sort together — that is how they get edited.

| | 繁體 `trad` | 简体 `simp` | English `en` |
|---|---|---|---|
| Home | `home-trad.html` | `home-simp.html` | `home-en.html` |
| Origin | `origin-trad.html` | `origin-simp.html` | `origin-en.html` |
| Senior Living | `senior-trad.html` | `senior-simp.html` | `senior-en.html` |
| Team | `team-trad.html` | `team-simp.html` | `team-en.html` |

`trad` and `simp` name the *script*, not a region — Traditional Chinese is
read in Taiwan, Hong Kong, Macau and across the diaspora, so `tw`/`cn` would
be both inaccurate and needlessly narrow. The `lang` attributes use the
matching standard codes, `zh-Hant` and `zh-Hans`.

`index.html` **is** the Traditional home page — a byte-for-byte copy of
`home-trad.html`, so the root URL serves it with no redirect. **Edit one and
copy it over the other**, or they will drift:

```
cp home-trad.html index.html
```

Both carry `rel="canonical"` pointing at the root. `support.js` is the shared
runtime; every page needs it.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000/

## Deploy

GitHub Pages serves `main` from the root. `CNAME` holds the custom domain and
`.nojekyll` keeps Pages from running the files through Jekyll.
