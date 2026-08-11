# Akademi Crypto Overlay V3

## Layout
Fixed 1920×1080 canvas.

### Transparent area
Only the `VIDEO TIMOTHY / SOURCE AREA` rectangle is transparent:
`left: 20px · top: 112px · width: 1065px · height: 410px` (so it spans x:20–1085, y:112–522).

If Timothy's camera source in TikTok LIVE Studio was already sized/positioned to match the old window (height 378px), resize it to the new height (410px) at the same left/top so it still lines up exactly.

### Solid areas
Everything else — header, right-side news/calendar, lower technical/snapshot panels, and the ticker — sits on **one gap-free solid frame** made of exactly four rectangles built around the video window (see the diagram at the top of `assets/style.css`). This was fixed in V3: the previous version left a few thin unintended transparent seams (a sliver at the far left edge, a seam between the snapshot and calendar panels, and a band above the ticker) where the raw stream could bleed through. If you ever resize or move the video window, recompute these four rectangles against its new `left/top/width/height` — that's the one thing in this file that has to stay mathematically exact.

This is intentional so the overlay can be placed above a separate video source in TikTok LIVE Studio.

## Important: enable transparency on the browser source
CSS transparency only works if the **browser source itself is set to transparent background** in TikTok LIVE Studio (or OBS). If that option is off, the whole canvas renders as a solid rectangle regardless of the CSS. Add Timothy's camera as a separate source *underneath* the overlay source.

## Main URL
`/overlay.html`

## Individual widgets
- `/ticker.html`
- `/news.html`
- `/calendar.html`
- `/technical.html`

Each of these stays deliberately lightweight (no webfont, single widget) in case you want to use them as separate browser sources instead of the combined overlay.

## What changed in V3.1
- **Closed the dead space above the footer ticker.** The lower row (technical/snapshot/calendar) and the video/news row were both stretched a bit taller, and the ticker was made taller too — together they now use the full 1080px height with no leftover empty band.
- **Fixed the clipped ticker prices.** The footer ticker grew from 55px to 90px tall so the TradingView ticker tape has room to show the price/change line instead of getting cut off.
- Moved the small "AKADEMI CRYPTO" watermark out of the ticker's new footprint (it now sits in the bottom margin strip next to the TradingView credit, instead of overlapping the taller ticker).

## What changed in V3
- **Fixed the transparency bug** — rebuilt the background as four precisely-computed rectangles around the video hole instead of four ad-hoc ones, so nothing outside the video window can ever show through.
- **Unified the visual language** — colors, borders, and shadows now come from a small set of CSS variables in `assets/style.css` instead of a dozen slightly different hand-picked golds/browns.
- **Loaded the Inter webfont properly** — the old version referenced Inter without loading it, so it silently fell back to Arial on most machines. `overlay.html` and `index.html` now load it from Google Fonts.
- **Market Snapshot is now live data** — the six cells used to be static labels (BTC, ETH, GOLD…) with no real numbers. They're now a real TradingView Tickers widget showing live price + % change for BTC, ETH, Gold, S&P 500, Nasdaq, and DXY, in the same visual language as the rest of the overlay.
- Small polish pass on the header, panel headers, and spacing.

## Preview
Open `/index.html` for a simple preview page. The actual `/overlay.html` uses transparency in the video window — a transparent HTML canvas may appear differently depending on the browser/background used for preview; this does not change the CSS transparency of the video window.

## Deployment
Static files only. No Node.js, database, API key, or n8n is required.

Upload this folder to GitHub Pages/Cloudflare Pages/another static host and use the public `/overlay.html` URL as a browser source in TikTok LIVE Studio.
