// ============================================================
// CONFIG — ubah ukuran/tema di sini jika diperlukan.
// API market default menggunakan Binance public WebSocket.
// Tidak membutuhkan API key.
// ============================================================

window.AC_CONFIG = {
  theme: {
    gold: "#f5c400",
    bg: "#0b0d0f",
    panel: "#111517"
  },

  market: {
    provider: "binance",
    symbols: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "SUIUSDT"],
    reconnectMs: 3000
  },

  refreshDataMs: 3000
};
