// ============================================================
// MARKET ADAPTER
// Default: Binance public WebSocket ticker.
// Bisa diganti provider nanti tanpa mengubah widget UI.
// ============================================================

(function () {
  const state = {};
  let socket = null;
  let reconnectTimer = null;

  const fmt = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "—";
    const n = Number(value);
    if (n >= 1000) return n.toLocaleString("en-US", {maximumFractionDigits: 2});
    if (n >= 1) return n.toLocaleString("en-US", {maximumFractionDigits: 4});
    return n.toLocaleString("en-US", {maximumFractionDigits: 6});
  };

  const notify = () => window.dispatchEvent(new CustomEvent("ac-market-update"));

  function connect() {
    clearTimeout(reconnectTimer);

    if (socket) {
      try { socket.close(); } catch (_) {}
    }

    const streams = AC_CONFIG.market.symbols
      .map(s => `${s.toLowerCase()}@ticker`)
      .join("/");

    socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    socket.onmessage = (event) => {
      try {
        const packet = JSON.parse(event.data);
        const d = packet.data || packet;
        const symbol = d.s;
        if (!symbol) return;

        state[symbol] = {
          symbol,
          price: Number(d.c),
          change: Number(d.P),
          high: Number(d.h),
          low: Number(d.l),
          volume: Number(d.v),
          updatedAt: Date.now()
        };

        notify();
      } catch (_) {}
    };

    socket.onerror = () => {
      try { socket.close(); } catch (_) {}
    };

    socket.onclose = () => {
      reconnectTimer = setTimeout(connect, AC_CONFIG.market.reconnectMs);
    };
  }

  window.AC_MARKET = {
    get(symbol) { return state[symbol] || null; },
    all() { return {...state}; },
    format: fmt,
    connected() { return socket && socket.readyState === WebSocket.OPEN; }
  };

  connect();
})();
