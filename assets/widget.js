// ============================================================
// WIDGET RENDERER
// Usage:
// widget.html?widget=header
// widget.html?widget=topic
// widget.html?widget=summary
// widget.html?widget=market
// widget.html?widget=ticker
// widget.html?widget=brand
// ============================================================

const params = new URLSearchParams(location.search);
const type = params.get("widget") || "topic";
const root = document.getElementById("widget-root");

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
}[c]));

function renderHeader() {
  root.innerHTML = `
    <div class="w-header">
      <div class="logo-box">₿</div>
      <div>
        <div class="brand-name">${esc(AC_DATA.brand.name)}</div>
        <div class="brand-tagline">${esc(AC_DATA.brand.tagline)}</div>
      </div>
      <div class="header-spacer"></div>
      <div class="live-info">
        <span>${esc(AC_DATA.live.label)}</span>
        <strong id="clock">00:00:00</strong>
        <small>● ${esc(AC_DATA.live.source)}</small>
      </div>
    </div>`;
  startClock();
}

function renderTopic() {
  root.innerHTML = `
    <div class="w-topic">
      <div class="widget-kicker"><span></span> SEDANG DIBAHAS</div>
      <div class="topic-main">${esc(AC_DATA.topic.current)}</div>
      <div class="topic-sub">${esc(AC_DATA.topic.subtitle)}</div>
      <div class="topic-progress"><i style="width:${AC_DATA.topic.progress}%"></i></div>
      <div class="topic-meta">
        <span>${esc(AC_DATA.topic.chapter)}</span>
        <span>NEXT: <b>${esc(AC_DATA.topic.next)}</b></span>
      </div>
    </div>`;
}

function renderSummary() {
  root.innerHTML = `
    <div class="w-summary">
      <div class="summary-head">
        <strong>${esc(AC_DATA.summary.title)}</strong>
        <span>AI READY</span>
      </div>
      <p>${esc(AC_DATA.summary.text)}</p>
      <small>${esc(AC_DATA.summary.updated)}</small>
    </div>`;
}

function marketCard(symbol, label) {
  const d = AC_MARKET.get(symbol);
  const price = d ? AC_MARKET.format(d.price) : "—";
  const change = d ? `${d.change >= 0 ? "+" : ""}${d.change.toFixed(2)}%` : "—";
  const cls = d && d.change < 0 ? "down" : "up";
  return `
    <div class="market-card">
      <span>${label}</span>
      <strong>${price}</strong>
      <em class="${cls}">${change}</em>
    </div>`;
}

function renderMarket() {
  root.innerHTML = `
    <div class="w-market">
      ${marketCard("BTCUSDT", "BTC / USDT")}
      ${marketCard("ETHUSDT", "ETH / USDT")}
      ${marketCard("SOLUSDT", "SOL / USDT")}
      ${marketCard("XRPUSDT", "XRP / USDT")}
      ${marketCard("SUIUSDT", "SUI / USDT")}
    </div>`;
}

function renderTicker() {
  root.innerHTML = `
    <div class="w-ticker">
      <b>MARKET</b>
      ${tickerItem("BTCUSDT","BTC")}
      ${tickerItem("ETHUSDT","ETH")}
      ${tickerItem("SOLUSDT","SOL")}
      ${tickerItem("XRPUSDT","XRP")}
      ${tickerItem("SUIUSDT","SUI")}
      <span class="ticker-status">● REALTIME</span>
    </div>`;
}

function tickerItem(symbol, label) {
  const d = AC_MARKET.get(symbol);
  const price = d ? AC_MARKET.format(d.price) : "—";
  const change = d ? `${d.change >= 0 ? "+" : ""}${d.change.toFixed(2)}%` : "—";
  const cls = d && d.change < 0 ? "down" : "up";
  return `<span class="ticker-item"><i>${label}</i><strong>${price}</strong><em class="${cls}">${change}</em></span>`;
}

function renderBrand() {
  root.innerHTML = `
    <div class="w-brand">
      <div class="brand-orb">₿</div>
      <div>
        <strong>${esc(AC_DATA.brandBadge)}</strong>
        <small>${esc(AC_DATA.brand.tagline)}</small>
      </div>
    </div>`;
}

function render() {
  if (type === "header") renderHeader();
  else if (type === "topic") renderTopic();
  else if (type === "summary") renderSummary();
  else if (type === "market") renderMarket();
  else if (type === "ticker") renderTicker();
  else if (type === "brand") renderBrand();
  else renderTopic();
}

function startClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent = d.toLocaleTimeString("id-ID", {hour12:false});
  };
  tick();
  setInterval(tick, 1000);
}

render();

window.addEventListener("ac-market-update", () => {
  if (type === "market" || type === "ticker") render();
});
