# Akademi Crypto — Ready Overlay System

Versi ini sengaja dibuat sebagai SISTEM WIDGET, bukan satu overlay 1920x1080.

## Struktur

- `index.html` = halaman preview / dokumentasi.
- `widget.html?widget=header` = widget header.
- `widget.html?widget=topic` = widget topic.
- `widget.html?widget=summary` = widget summary.
- `widget.html?widget=market` = market realtime.
- `widget.html?widget=ticker` = ticker realtime.
- `widget.html?widget=brand` = branding.
- `assets/config.js` = konfigurasi.
- `assets/data.js` = data manual yang nanti diganti otomatis oleh n8n/API.
- `assets/market.js` = adapter market realtime.
- `assets/widget.js` = renderer.
- `assets/app.css` = seluruh styling.
- `data/episode.json` = contoh format data episode untuk tahap automation.

## Cara tes lokal

Buka `index.html` di Chrome.

Untuk widget, buka:
`widget.html?widget=topic`
`widget.html?widget=summary`
`widget.html?widget=market`

Market realtime membutuhkan koneksi internet karena memakai Binance public WebSocket.

## Cara pakai setelah deploy

Misalnya domain:
`https://dashboard-kamu.example`

Masukkan sebagai Link/Web Source secara terpisah:

`https://dashboard-kamu.example/widget.html?widget=header`

`https://dashboard-kamu.example/widget.html?widget=topic`

`https://dashboard-kamu.example/widget.html?widget=summary`

`https://dashboard-kamu.example/widget.html?widget=market`

`https://dashboard-kamu.example/widget.html?widget=ticker`

`https://dashboard-kamu.example/widget.html?widget=brand`

Atur posisi dan ukuran masing-masing source langsung di TikTok LIVE Studio.

## Automation berikutnya

Data manual saat ini:
`assets/data.js`

Nanti bisa diganti menjadi:
n8n -> endpoint JSON -> fetch() -> dashboard.

Contoh data:
{
  "topic": {
    "current": "...",
    "subtitle": "...",
    "next": "...",
    "chapter": "...",
    "progress": 50
  },
  "summary": {
    "title": "RINGKASAN",
    "text": "..."
  }
}

Gemini nantinya bertugas membuat chapter + summary dari video/episode. n8n mengubah hasil Gemini menjadi JSON terstruktur.

## Catatan market

Market memakai Binance public WebSocket tanpa API key. Ini hanya untuk data publik, bukan trading.

Jika provider diganti, cukup ubah `assets/market.js`. Jangan menaruh API secret/private key di frontend.
