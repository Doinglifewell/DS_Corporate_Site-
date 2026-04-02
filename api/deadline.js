export default function handler(req, res) {
  // Calculate days server-side — so LinkedIn sees the real number
  const deadline = new Date('2027-07-01T00:00:00Z').getTime();
  const now = Date.now();
  const diff = Math.max(0, deadline - now);
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  const daysStr  = String(days).padStart(3, '0');
  const hoursStr = String(hours).padStart(2, '0');
  const minsStr  = String(mins).padStart(2, '0');
  const secsStr  = String(secs).padStart(2, '0');

  const ogTitle = `${days} days until the ESPR deadline — Is your brand ready?`;
  const ogDesc  = `The EU's Ecodesign for Sustainable Products Regulation requires a Digital Product Passport on every product sold into Europe. July 2027. ${days} days remaining. DeStore — free migration assessment.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${days} days until the ESPR deadline | DeStore</title>
<meta name="description" content="${ogDesc}">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:url" content="https://destore.network/deadline">
<meta property="og:type" content="website">
<meta property="og:site_name" content="DeStore">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${ogTitle}">
<meta name="twitter:description" content="${ogDesc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --orchid:#6A14DB;--violet:#B354F1;--orange:#FF9F46;--green:#28B79D;
  --bg:#0a0a0d;--d1:#0d0d10;--d2:#141418;--d3:#1c1c22;--bdr:#2e2e38;
  --muted:#6b6b80;--dim:#9999b0;
}
html,body{height:100%;background:var(--bg);color:#fff;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;text-align:center;position:relative;overflow:hidden}

/* ── Background glow ── */
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(255,100,0,.15),transparent);pointer-events:none}
body::after{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 50% 40% at 50% 80%,rgba(255,27,154,.08),transparent);pointer-events:none}

/* ── DS Price Badge (from design system) ── */
@property --pb1 { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes spin-pb1 { to { --pb1: 360deg; } }

.price-badge {
  position: relative;
  border-radius: 24px;
  padding: 3px;
  display: inline-block;
  background: conic-gradient(from var(--pb1, 0deg),
    #FF9F46, #FF1B9A, #FF9F46, #ffcc44, #FF9F46,
    #FF1B9A 40%, #7a1200 60%, #FF9F46);
  animation: spin-pb1 2s linear infinite;
  margin-bottom: 40px;
}
.price-badge-inner {
  background: #141418;
  border-radius: 22px;
  padding: 40px 56px;
}

/* ── Countdown numbers ── */
.cd-number {
  font-size: clamp(72px, 18vw, 140px);
  font-weight: 900;
  letter-spacing: -4px;
  line-height: 1;
  background: linear-gradient(135deg, #FF9F46, #FF1B9A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-variant-numeric: tabular-nums;
}
.cd-label {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 8px;
}

/* ── Sub units (hrs:mins:secs) ── */
.sub-units {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
.sub-unit { text-align: center; }
.sub-num {
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  font-variant-numeric: tabular-nums;
  letter-spacing: -.5px;
}
.sub-lbl {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 2px;
}
.sub-sep { font-size: 20px; font-weight: 900; color: var(--bdr); line-height: 1; margin-top: -8px; }

/* ── Logo + Headline ── */
.logo-text {
  font-size: 14px;
  font-weight: 900;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--violet);
  margin-bottom: 20px;
}
.headline {
  font-size: clamp(18px, 4vw, 26px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  line-height: 1.3;
  max-width: 520px;
  margin: 0 auto 12px;
}
.subline {
  font-size: 14px;
  color: var(--dim);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto 40px;
}

/* ── CTA ── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #FF9F46, #FF1B9A);
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  border-radius: 14px;
  text-decoration: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  box-shadow: 0 4px 24px rgba(179,84,241,.35);
  transition: filter .15s, box-shadow .15s;
  margin-bottom: 24px;
}
.cta-btn:hover { filter: brightness(1.1); box-shadow: 0 6px 32px rgba(179,84,241,.5); }

.share-note {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
  letter-spacing: .04em;
}

/* ── Deadline label ── */
.deadline-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .1em;
  color: var(--orange);
  text-transform: uppercase;
  background: rgba(255,159,70,.08);
  border: 1px solid rgba(255,159,70,.25);
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
}
.deadline-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); animation: blink 1.1s ease infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

@media(max-width:480px){
  .price-badge-inner { padding: 28px 32px; }
  .sub-units { gap: 10px; }
}
</style>
</head>
<body>

<div class="logo-text">◈ DeStore Network</div>

<div class="deadline-label">
  <span class="deadline-dot"></span>
  EU ESPR Deadline · July 2027
</div>

<!-- DS Price Badge with days remaining -->
<div class="price-badge">
  <div class="price-badge-inner">
    <div class="cd-number" id="cd-days">${daysStr}</div>
    <div class="cd-label">Days Remaining</div>
    <div class="sub-units">
      <div class="sub-unit">
        <div class="sub-num" id="cd-hours">${hoursStr}</div>
        <div class="sub-lbl">Hrs</div>
      </div>
      <div class="sub-sep">:</div>
      <div class="sub-unit">
        <div class="sub-num" id="cd-mins">${minsStr}</div>
        <div class="sub-lbl">Min</div>
      </div>
      <div class="sub-sep">:</div>
      <div class="sub-unit">
        <div class="sub-num" id="cd-secs">${secsStr}</div>
        <div class="sub-lbl">Sec</div>
      </div>
    </div>
  </div>
</div>

<h1 class="headline">Is your brand ready for the EU's July 2027 deadline?</h1>
<p class="subline">Every physical product sold into Europe will require a Digital Product Passport. No passport — no EU market access. DeStore helps Australian brands get compliant.</p>

<a href="https://destore.network#inquiry" class="cta-btn">Book your free assessment →</a>

<div class="share-note">destore.network · Byron Bay, Australia</div>

<script>
// Live ticker — updates every second in the browser
function tick() {
  var deadline = new Date('2027-07-01T00:00:00Z').getTime();
  var diff = Math.max(0, deadline - Date.now());
  var d = Math.floor(diff / 86400000);
  var h = Math.floor((diff % 86400000) / 3600000);
  var m = Math.floor((diff % 3600000)  / 60000);
  var s = Math.floor((diff % 60000)    / 1000);
  document.getElementById('cd-days').textContent  = String(d).padStart(3,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
}
setInterval(tick, 1000);
</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate'); // Cache 60s, then revalidate
  res.status(200).send(html);
}
