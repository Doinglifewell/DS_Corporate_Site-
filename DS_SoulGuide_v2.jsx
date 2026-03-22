import { useState, useRef, useEffect } from "react";

/* ═════════════════════════════════════════════════════════════════════
   AGENT: VERA — Brand Strategist & Chief Brand Officer
   ─────────────────────────────────────────────────────────────────────
   Background : 18 years defining brand purpose, positioning architecture, and identity systems for infrastructure and consumer technology. Built brand foundations for two unicorns from pre-revenue. Specialises in making complex infrastructure feel inevitable and human.
   Domain     : See guide content below.
   Audit Prompt:
     You are VERA, DeStore's Brand Strategist & Chief Brand Officer with 18 Years of
     experience. Enforces: every initiative connects to circular trade infrastructure · survivability framing in all investor/pitch docs · no sustainability washing (DPP-verifiable claims only) · blockchain hidden in consumer context · ESPR compliance angle in B2B pitch. Her question: 'Does this extend the object's life, or ours?'
   ═════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   DESTORE DOCS — Brand Handbook v1.0
   Three-tab reference: Style Guide · Voice Guide · Developer Guide
   Positioning: Circular Trade Infrastructure
═══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

@property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb1   { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb2   { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb3   { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb4   { syntax:'<angle>'; initial-value:0deg; inherits:false; }

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:#0a0a0d; }
::-webkit-scrollbar-thumb { background:#2e2e38; border-radius:2px; }
body { background:#0a0a0d; color:#fff; font-family:'Plus Jakarta Sans',sans-serif; -webkit-font-smoothing:antialiased; }
textarea, input, select { font-family:'Plus Jakarta Sans',sans-serif; color-scheme:dark; }
input::placeholder { color:#6b6b80; }
input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }

/* ── Tab bar ── */
.tab-bar { display:flex; gap:0; }
.tab-btn {
  display:flex; align-items:center; gap:8px;
  padding:11px 22px; font-size:13px; font-weight:700;
  color:#6b6b80; cursor:pointer; border:none;
  border-bottom:2px solid transparent; background:transparent;
  font-family:'Plus Jakarta Sans',sans-serif; transition:all .16s;
  letter-spacing:0.01em; white-space:nowrap;
}
.tab-btn:hover { color:#9999b0; }
.tab-btn.on { color:#fff; border-bottom-color:#B354F1; }
.tab-btn .tab-dot { width:6px; height:6px; border-radius:50%; background:#2e2e38; transition:all .16s; flex-shrink:0; }
.tab-btn.on .tab-dot { background:#B354F1; box-shadow:0 0 8px #B354F180; }

/* ── Sidebar nav ── */
.nav-btn {
  display:flex; align-items:center; gap:8px;
  padding:8px 18px; font-size:12px; font-weight:600;
  color:#6b6b80; cursor:pointer; border:none;
  border-left:2px solid transparent; background:transparent;
  width:100%; text-align:left; font-family:'Plus Jakarta Sans',sans-serif;
  transition:all .14s;
}
.nav-btn:hover { color:#9999b0; background:rgba(255,255,255,.025); }
.nav-btn.active { color:#B354F1; border-left-color:#B354F1; background:rgba(179,84,241,.07); }
.nav-dot { width:5px; height:5px; border-radius:50%; background:#2e2e38; flex-shrink:0; transition:all .14s; }
.nav-btn.active .nav-dot { background:#B354F1; box-shadow:0 0 7px #B354F1; }

/* ── Conic border ── */
.conic-wrap {
  position:relative; border-radius:13px; padding:1.5px; display:inline-block;
  background:conic-gradient(from var(--angle,0deg),#B354F1,#6a14db,#00c8ff,#B354F1 40%,#321b68 60%,#B354F1);
  animation:spin-border 2.5s linear infinite;
}
.conic-inner { background:#26262e; border-radius:11px; padding:11px 16px; color:#fff; font-size:14px; font-weight:500; font-family:'Plus Jakarta Sans',sans-serif; }

/* ── Buttons ── */
.btn-press { transition:transform .12s,opacity .12s,filter .12s; cursor:pointer; }
.btn-press:active { transform:scale(.97); opacity:.88; }
.btn-press:hover { filter:brightness(1.1); }

/* ── Option card ── */
.opt-card { display:flex; align-items:center; gap:12px; background:#26262e; border:1.5px solid #2e2e38; border-radius:12px; padding:12px 15px; cursor:pointer; width:100%; text-align:left; font-family:'Plus Jakarta Sans',sans-serif; transition:all .18s; }
.opt-card.on { background:rgba(179,84,241,.1); border-color:#B354F1; box-shadow:0 0 16px rgba(179,84,241,.2); }
.opt-card:hover:not(.on) { border-color:#3a3a4a; }

/* ── Code block ── */
.code {
  background:#060608; border:1px solid #2e2e38; border-radius:12px;
  padding:18px 20px; font-family:'JetBrains Mono',monospace;
  font-size:11.5px; line-height:1.85; overflow-x:auto;
  white-space:pre; color:#9999b0;
}
.cv { color:#B354F1; } .cg { color:#28B79D; } .co { color:#FF9F46; }
.cb { color:#79b8ff; } .cm { color:#6b6b80; font-style:italic; }
.cw { color:#e8eaf0; } .cp { color:#FF1B9A; }

/* ── Shimmer ── */
.shimmer { background:linear-gradient(90deg,#1c1c22 0px,#26262e 80px,#1c1c22 160px); background-size:400px 100%; animation:shimmer 1.6s infinite linear; }

/* ── Swatch ── */
.swatch-card { border-radius:12px; overflow:hidden; border:1px solid #2e2e38; cursor:pointer; transition:transform .15s; }
.swatch-card:hover { transform:translateY(-2px); }

/* ── Do/Dont cards ── */
.do-card { background:rgba(40,183,157,.07); border:1px solid rgba(40,183,157,.25); border-radius:13px; padding:16px 18px; }
.dont-card { background:rgba(255,27,154,.05); border:1px solid rgba(255,27,154,.2); border-radius:13px; padding:16px 18px; }
.example-card { background:#141418; border:1px solid #2e2e38; border-radius:13px; padding:18px 20px; }

/* ── Word chip ── */
.word-chip { display:inline-flex; align-items:center; background:#1c1c22; border:1px solid #2e2e38; border-radius:8px; padding:6px 13px; font-size:12px; font-weight:700; color:white; cursor:default; transition:all .18s; }
.word-chip:hover { border-color:#B354F1; background:rgba(179,84,241,.08); color:#B354F1; }

/* ── Ticker ── */
.ticker-wrap { overflow:hidden; white-space:nowrap; }
.ticker-inner { display:inline-flex; animation:ticker 22s linear infinite; }

/* ── Keyframes ── */
@keyframes spin-border { to { --angle:360deg; } }
@keyframes spin-pb1    { to { --pb1:360deg; } }
@keyframes spin-pb2    { to { --pb2:360deg; } }
@keyframes spin-pb3    { to { --pb3:360deg; } }
@keyframes spin-pb4    { to { --pb4:360deg; } }
@keyframes blink-dot   { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes price-sweep { 0%{left:-75%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:125%;opacity:0} }
@keyframes fadeUp      { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
@keyframes scaleIn     { from{transform:scale(.5);opacity:0;}to{transform:scale(1);opacity:1;} }
@keyframes checkPop    { 0%{transform:scale(0) rotate(-20deg);opacity:0;}60%{transform:scale(1.3);}100%{transform:scale(1);opacity:1;} }
@keyframes ringExpand  { 0%{transform:scale(.8);opacity:.8;}100%{transform:scale(1.7);opacity:0;} }
@keyframes shimmer     { 0%{background-position:-400px 0;}100%{background-position:400px 0;} }
@keyframes bounce      { 0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);} }
@keyframes pulse       { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.95);} }
@keyframes gradShift   { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
@keyframes ticker      { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }

/* ── Liquid chrome ── */
@keyframes chrome-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes liquid-sweep { 0%{left:-75%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:125%;opacity:0} }
@keyframes liquid-blob  {
  0%   { border-radius: 14px 14px 14px 14px; }
  20%  { border-radius: 18px 11px 16px 13px; }
  40%  { border-radius: 11px 17px 13px 18px; }
  60%  { border-radius: 16px 13px 18px 11px; }
  80%  { border-radius: 13px 18px 11px 16px; }
  100% { border-radius: 14px 14px 14px 14px; }
}
@keyframes pulse-glow   { 0%,100%{box-shadow:0 4px 20px rgba(179,84,241,.35)} 50%{box-shadow:0 4px 32px rgba(179,84,241,.65),0 0 60px rgba(179,84,241,.2)} }
@keyframes nudge        { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-3px)} 40%{transform:translateX(3px)} 60%{transform:translateX(-2px)} 80%{transform:translateX(2px)} }
@keyframes ring-pulse   { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.035)} }
@keyframes count-pop    { 0%{transform:translateY(-8px);opacity:0} 60%{transform:translateY(2px)} 100%{transform:translateY(0);opacity:1} }
@keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0.35} }

/* ── Chrome sweep pseudo ── */
.chrome-sweep { position:relative; overflow:hidden; }
.chrome-sweep::after {
  content:''; position:absolute; top:-50%; left:-75%;
  width:55%; height:200%;
  background:linear-gradient(105deg,transparent 25%,rgba(255,255,255,.55) 50%,transparent 75%);
  animation:liquid-sweep 2.4s ease-in-out infinite;
  pointer-events:none; border-radius:inherit;
}
.liquid-blob { animation:liquid-blob 3.5s ease-in-out infinite !important; }

/* ── Price badge rings ── */
.pb-ring1 { padding:2px; border-radius:12px; display:inline-block;
  background:conic-gradient(from var(--pb1,0deg),#B354F1,#6A14DB,#00C8FF,#28B79D,#FF9F46,#B354F1 40%,#321B68 60%,#B354F1);
  animation:spin-pb1 2s linear infinite; }
.pb-ring2 { padding:2px; border-radius:12px; display:inline-block;
  background:conic-gradient(from var(--pb2,0deg),#ffffff,#B354F1,#ffffff,#9999b0,#ffffff,#B354F1 40%,#6A14DB 60%,#ffffff);
  animation:spin-pb2 2s linear infinite; }
.pb-ring3 { padding:2px; border-radius:12px; display:inline-block;
  background:conic-gradient(from var(--pb3,0deg),#FF1B9A,#B354F1,#FF1B9A,#6A14DB,#FF1B9A 40%,#321B68 60%,#FF1B9A);
  animation:spin-pb3 2s linear infinite; }
.pb-ring4 { padding:2px; border-radius:12px; display:inline-block;
  background:conic-gradient(from var(--pb4,0deg),#FF9F46,#FF1B9A,#B354F1,#FF9F46 40%,#321B68 60%,#FF9F46);
  animation:spin-pb4 2s linear infinite; }
.pb-pill { border-radius:10px; padding:11px 22px; display:flex; flex-direction:column; align-items:center; gap:2px; }
.pb-grad { font-size:30px; font-weight:900; letter-spacing:-0.8px; line-height:1;
  background:linear-gradient(135deg,#28B79D 0%,#B354F1 50%,#FF9F46 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.pb-white { font-size:30px; font-weight:900; letter-spacing:-0.8px; line-height:1; color:#ffffff; }
.pb-pink  { font-size:30px; font-weight:900; letter-spacing:-0.8px; line-height:1;
  background:linear-gradient(135deg,#FF1B9A 0%,#B354F1 60%,#FF1B9A 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.pb-fire  { font-size:30px; font-weight:900; letter-spacing:-0.8px; line-height:1;
  background:linear-gradient(135deg,#FF9F46 0%,#FF1B9A 50%,#B354F1 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

/* ── Psychology UI ── */
.was-price   { font-size:11px; font-weight:600; color:#6b6b80; text-decoration:line-through; }
.save-pill   { font-size:10px; font-weight:800; letter-spacing:.05em; color:#2FB457; background:rgba(47,180,87,.12); border:1px solid rgba(47,180,87,.3); border-radius:20px; padding:3px 10px; }
.urgent-dot  { width:6px; height:6px; border-radius:50%; background:#FF1B9A; display:inline-block; animation:blink 1.1s ease infinite; }
.viewer-row  { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:#9999b0; }
.v-avatars   { display:flex; margin-right:2px; }
.v-avatar    { width:18px; height:18px; border-radius:50%; border:1.5px solid #0d0d10; margin-left:-5px; font-size:8px; display:flex; align-items:center; justify-content:center; }
.offer-btn   { font-size:11px; font-weight:800; letter-spacing:.04em; color:#B354F1; background:rgba(179,84,241,.1); border:1px solid rgba(179,84,241,.3); border-radius:8px; padding:5px 14px; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all .15s; white-space:nowrap; }
.offer-btn:hover { background:rgba(179,84,241,.2); border-color:#B354F1; }
.sold-bar    { height:3px; border-radius:2px; background:#2e2e38; overflow:hidden; width:100%; }
.sold-fill   { height:100%; border-radius:2px; background:linear-gradient(90deg,#28B79D,#B354F1); }
.label-tag   { font-size:9px; font-weight:900; letter-spacing:.1em; text-transform:uppercase; padding:3px 9px; border-radius:4px; }
.btn-tooltip { position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%); background:#1c1c22; border:1px solid #2e2e38; border-radius:8px; padding:6px 12px; font-size:11px; font-weight:600; color:#9999b0; white-space:nowrap; pointer-events:none; animation:fadeUp .18s ease; z-index:99; }
.btn-tooltip::after { content:''; position:absolute; top:100%; left:50%; transform:translateX(-50%); border:5px solid transparent; border-top-color:#2e2e38; }
.badge-new { font-size:8px; font-weight:900; letter-spacing:.09em; color:#FF9F46; background:rgba(255,159,70,.15); border:1px solid rgba(255,159,70,.35); border-radius:4px; padding:1px 5px; vertical-align:middle; margin-left:4px; }
.compliance-fix { font-size:9px; font-weight:900; letter-spacing:.09em; color:#28B79D; background:rgba(40,183,157,.12); border:1px solid rgba(40,183,157,.3); border-radius:4px; padding:1px 6px; vertical-align:middle; margin-left:4px; }

/* ── Mobile hamburger ── */
.ham-btn { display:none; align-items:center; justify-content:center; width:36px; height:36px; background:transparent; border:1px solid #2e2e38; border-radius:8px; cursor:pointer; flex-shrink:0; }
.ham-btn span { display:block; width:16px; height:1.5px; background:#9999b0; border-radius:2px; transition:all .18s; }
.ham-btn span+span { margin-top:4px; }

/* ── Sidebar overlay backdrop ── */
.sidebar-backdrop { display:none; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:199; backdrop-filter:blur(2px); }

/* ══ RESPONSIVE ══ */
@media (max-width: 768px) {
  /* Show hamburger */
  .ham-btn { display:flex; }

  /* Topbar row compact */
  .topbar-logo-row { padding:9px 14px 0 !important; flex-wrap:nowrap; gap:8px !important; }
  .topbar-title-chip { display:none !important; }
  .topbar-version-chips { gap:6px !important; }
  .topbar-version-chips .chip-sm { font-size:9px !important; padding:3px 8px !important; }

  /* Tab bar — horizontal scroll */
  .tab-bar { overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; padding:0 14px; }
  .tab-bar::-webkit-scrollbar { display:none; }
  .tab-btn { padding:10px 14px; font-size:12px; }

  /* Sidebar — slide-over on mobile */
  .sidebar-panel {
    position:fixed !important; top:0 !important; left:-240px !important;
    height:100vh !important; z-index:200; width:240px !important;
    transition:left .25s cubic-bezier(0.34,1,0.64,1);
    box-shadow:4px 0 24px rgba(0,0,0,.5);
  }
  .sidebar-panel.open { left:0 !important; }
  .sidebar-backdrop { display:block; }

  /* Main content — no left offset */
  .main-content { height:calc(100vh - 82px) !important; }

  /* Content padding */
  .content-inner { padding:28px 16px 100px !important; }

  /* Grids → single column */
  .grid-2col, .grid-auto { grid-template-columns:1fr !important; }

  /* Code block — scrollable, don't shrink font too much */
  .code { font-size:10.5px !important; padding:14px 14px !important; }

  /* Tables — horizontal scroll */
  .tbl-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
  .tbl-wrap table { min-width:480px; }

  /* Hero h1 */
  .guide-hero h1 { font-size:32px !important; }

  /* Button grids stack */
  .btn-grid { grid-template-columns:1fr 1fr !important; }

  /* Price badge cards — single col */
  .badge-grid { grid-template-columns:1fr !important; }

  /* UX section padding */
  .ux-section { margin-bottom:48px !important; }

  /* Nav/arch diagrams */
  .arch-row { flex-direction:column !important; }

  /* Do/dont side by side → stack */
  .dodont-row { flex-direction:column !important; }
}

@media (max-width: 480px) {
  .tab-btn { padding:10px 12px; font-size:11px; gap:5px; }
  .tab-btn .tab-icon { display:none; }
  .guide-hero h1 { font-size:26px !important; }
  .btn-grid { grid-template-columns:1fr !important; }
  .topbar-version-chips { display:none !important; }
  .content-inner { padding:20px 12px 100px !important; }
}
`;


/* ─────────────────────────────────────────────────────────────────
   SVG LOGO
───────────────────────────────────────────────────────────────── */
const WM_PATHS = [
  "M398.1,33.4c-3.2,0-5.8-2.6-5.8-5.8s2.6-5.8,5.8-5.8s5.8,2.6,5.8,5.8S401.3,33.4,398.1,33.4z",
  "M1.4,2.8h24.1c21.9,0,36.2,15.4,36.2,35.4c0,20.1-14.3,35.3-36.2,35.3H1.4V2.8z M25.6,65.6c17.2,0,27.1-12.3,27.1-27.4c0-15.3-9.6-27.5-27.1-27.5H10.2v55H25.6z",
  "M97.5,21.1c15.5,0,24.6,12.1,24.6,27.4v2H80.6c0.6,9.6,7.4,17.7,18.4,17.7c5.8,0,11.8-2.3,15.8-6.5l3.8,5.2c-5.1,5.1-12,7.8-20.3,7.8c-15.1,0-26.1-10.9-26.1-26.9C72.3,33,82.8,21.1,97.5,21.1z M80.6,44.7h33.6c-0.1-7.6-5.2-17.1-16.8-17.1C86.4,27.6,81,36.8,80.6,44.7z",
  "M137.8,49.9c5.1,5.1,12.9,9.3,22.6,9.3c6.2,0,10.1-2.6,10.1-6c0-4-4.6-5.6-12.1-7.2c-11.6-2.3-28-5.3-28-22c0-11.9,10.1-22.1,28.2-22.1c11.3,0,21.2,3.4,28.7,9.8l-10,13c-5.9-4.9-13.7-7.3-19.9-7.3c-6,0-8.4,2.4-8.4,5.5c0,3.7,4.3,5,12.2,6.5c11.6,2.4,27.7,5.8,27.7,21.8c0,14.2-10.5,23.6-29.4,23.6c-14.3,0-24.3-4.4-31.3-11.2L137.8,49.9z",
  "M199.9,59.7V36.5h-8.5V22.3h8.5v-14h16.2v14h10.4v14.2h-10.4v18.6c0,3,1.7,5.2,4.6,5.2c1.8,0,3.6-0.6,4.1-1.3l3.2,12.3c-2,1.9-6,3.4-12.1,3.4C205.5,74.8,199.9,69.6,199.9,59.7z",
  "M231.2,47.9c0-14.4,10.5-26.8,27.9-26.8c17.6,0,28,12.4,28,26.8s-10.4,26.9-28,26.9C241.7,74.8,231.2,62.3,231.2,47.9z M270.3,47.9c0-6.8-4-12.4-11.2-12.4c-7.1,0-11,5.6-11,12.4c0,6.9,3.9,12.5,11,12.5C266.3,60.3,270.3,54.7,270.3,47.9z",
  "M295.6,22.3h16.3v6.5c3.4-4.1,9.8-7.7,16-7.7v15.8c-1-0.3-2.3-0.5-4-0.5c-4.2,0-9.8,1.8-12,4.8v32.4h-16.3V22.3z",
  "M359.1,21.1c15.1,0,26.2,11.1,26.2,28.5V53h-36.4c1,4.8,5.4,9.1,13,9.1c4.6,0,9.6-1.8,12.5-4.3l6.9,10.2c-5.1,4.6-13.6,6.8-21.4,6.8c-15.8,0-28-10.3-28-26.9C331.9,33,343.1,21.1,359.1,21.1z M348.6,42.5h21.1c-0.4-3.6-3.1-8.8-10.6-8.8C352,33.7,349.3,38.7,348.6,42.5z",
];
const DS_PATHS = [
  "M130.4,33.4c-3.2,0-5.8-2.6-5.8-5.8s2.6-5.8,5.8-5.8c3.2,0,5.8,2.6,5.8,5.8S133.6,33.4,130.4,33.4z",
  "M1,2.8h24.1c21.9,0,36.2,15.4,36.2,35.4c0,20.1-14.3,35.3-36.2,35.3H1V2.8z M25.1,65.6c17.2,0,27.1-12.3,27.1-27.4c0-15.3-9.6-27.5-27.1-27.5H9.8v55H25.1z",
  "M73.4,49.9c5.1,5.1,12.9,9.3,22.6,9.3c6.2,0,10.1-2.6,10.1-6c0-4-4.6-5.6-12.1-7.2c-11.6-2.3-28-5.3-28-22C66,12.1,76.1,1.8,94.2,1.8c11.3,0,21.2,3.4,28.7,9.8l-10,13c-5.9-4.9-13.7-7.3-19.9-7.3c-6,0-8.4,2.4-8.4,5.5c0,3.7,4.3,5,12.2,6.5c11.6,2.4,27.7,5.8,27.7,21.8c0,14.2-10.5,23.6-29.4,23.6c-14.3,0-24.3-4.4-31.3-11.2L73.4,49.9z",
];
const Logo = ({ fill="#fff", width=160 }) => (
  <svg width={width} height={width*(76.5/405.4)} viewBox="0 0 405.4 76.5" xmlns="http://www.w3.org/2000/svg">
    {WM_PATHS.map((d,i) => <path key={i} d={d} fill={fill}/>)}
  </svg>
);
const LogoDS = ({ fill="#fff", width=64 }) => (
  <svg width={width} height={width*(76.5/137.5)} viewBox="0 0 137.5 76.5" xmlns="http://www.w3.org/2000/svg">
    {DS_PATHS.map((d,i) => <path key={i} d={d} fill={fill}/>)}
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────────────────────────────── */
const C = {
  black:"#000000", royal:"#321B68", pink:"#FF1B9A", elViolet:"#6200E9",
  orange:"#FF9F46", blush:"#EFB4B0", cream:"#FFEFDC", peach:"#FFD0AC",
  orchid:"#6A14DB", violet:"#B354F1",
  d0:"#0a0a0d", d1:"#0d0d10", d2:"#141418", d3:"#1c1c22", d4:"#26262e",
  bdr:"#2e2e38", subtle:"#3a3a4a", muted:"#6b6b80", dim:"#9999b0",
  green:"#28B79D", greenAlt:"#2FB457", fb:"#1877F2",
};

/* ─────────────────────────────────────────────────────────────────
   SHARED MICRO COMPONENTS
───────────────────────────────────────────────────────────────── */
const Btn = ({ children, v="primary", onClick, disabled, sm, full }) => {
  const vs = {
    primary:{ bg:`linear-gradient(135deg,${C.orchid},${C.violet})`, sh:`0 4px 20px rgba(179,84,241,.35)`, bd:C.violet, col:"#fff" },
    green:  { bg:`linear-gradient(135deg,#1a9a84,${C.green})`,      sh:`0 4px 16px rgba(40,183,157,.3)`,  bd:C.green,  col:"#fff" },
    fb:     { bg:`linear-gradient(135deg,#1565c0,${C.fb})`,         sh:`0 4px 16px rgba(24,119,242,.3)`,  bd:C.fb,     col:"#fff" },
    pink:   { bg:`linear-gradient(135deg,#c0126f,${C.pink})`,       sh:`0 4px 16px rgba(255,27,154,.3)`,  bd:C.pink,   col:"#fff" },
    ghost:  { bg:"transparent",                                      sh:"none",                             bd:C.bdr,    col:C.dim  },
    danger: { bg:`linear-gradient(135deg,#7a0a0a,#c0392b)`,         sh:`0 4px 16px rgba(192,57,43,.3)`,   bd:"#c0392b",col:"#fff" },
  };
  const t = vs[v]||vs.primary;
  return (
    <button className="btn-press" onClick={onClick} style={{
      background:disabled?C.d4:t.bg, border:`1.5px solid ${disabled?C.bdr:t.bd}`,
      borderRadius:14, padding:sm?"8px 16px":"13px 22px",
      color:disabled?C.muted:t.col, fontSize:sm?12:13, fontWeight:800,
      letterSpacing:"0.02em", cursor:disabled?"not-allowed":"pointer",
      fontFamily:"'Plus Jakarta Sans',sans-serif",
      boxShadow:disabled?"none":t.sh, opacity:disabled?0.45:1,
      width:full?"100%":"auto", display:"inline-flex", alignItems:"center",
      justifyContent:"center", gap:6,
    }}>{children}</button>
  );
};

const Chip = ({ children, color, border, bg }) => (
  <span style={{
    display:"inline-flex", alignItems:"center", gap:5,
    borderRadius:20, padding:"4px 11px", fontSize:11, fontWeight:700,
    color:color||C.muted,
    border:`1px solid ${border||(color?color+"40":C.bdr)}`,
    background:bg||(color?color+"12":C.d3),
  }}>{children}</span>
);

const AutoBadge = () => (
  <span style={{ fontSize:9,fontWeight:800,letterSpacing:"0.07em",textTransform:"uppercase",color:C.green,background:C.green+"18",border:`1px solid ${C.green}35`,borderRadius:4,padding:"2px 7px" }}>AUTO ✓</span>
);

const Lbl = ({ children, auto }) => (
  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
    <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",color:C.muted }}>{children}</span>
    {auto && <AutoBadge />}
  </div>
);

const Sub = ({ children }) => (
  <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.muted,margin:"28px 0 14px" }}>{children}</div>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:14, padding:20, ...style }}>{children}</div>
);

const Demo = ({ children, style={} }) => (
  <div style={{ background:C.d1, border:`1px solid ${C.bdr}`, borderRadius:16, padding:24, ...style }}>{children}</div>
);

const Sec = ({ id, n, title, sub, children }) => (
  <section id={id} style={{ marginBottom:80, animation:"fadeUp 0.4s ease" }}>
    <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:28,paddingBottom:16,borderBottom:`1px solid ${C.bdr}` }}>
      <div style={{ width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.orchid},${C.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,flexShrink:0,boxShadow:`0 0 18px rgba(179,84,241,.4)` }}>{n}</div>
      <div>
        <div style={{ fontSize:21,fontWeight:900,letterSpacing:"-0.3px" }}>{title}</div>
        {sub && <div style={{ fontSize:12,color:C.dim,marginTop:3 }}>{sub}</div>}
      </div>
    </div>
    {children}
  </section>
);

const Tbl = ({ heads, rows }) => (
  <div className="tbl-wrap">
  <table style={{ width:"100%",borderCollapse:"collapse" }}>
    <thead>
      <tr>{heads.map(h => (
        <th key={h} style={{ textAlign:"left",fontSize:10,fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",color:C.muted,padding:"10px 14px",borderBottom:`1px solid ${C.bdr}` }}>{h}</th>
      ))}</tr>
    </thead>
    <tbody>
      {rows.map((row,i) => (
        <tr key={i}>{row.map((cell,j) => (
          <td key={j} style={{ padding:"11px 14px",fontSize:12,color:j===0?"white":C.dim,fontWeight:j===0?700:400,borderBottom:i<rows.length-1?`1px solid rgba(46,46,56,.4)`:"none",verticalAlign:"top",lineHeight:1.6 }}>{cell}</td>
        ))}</tr>
      ))}
    </tbody>
  </table>
  </div>
);

const Swatch = ({ hex, name, role, note }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="swatch-card" onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(()=>setCopied(false),1400); }}>
      <div style={{ height:56, background:hex, position:"relative" }}>
        {copied && <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff" }}>Copied!</div>}
      </div>
      <div style={{ padding:"10px 12px",background:C.d3 }}>
        <div style={{ fontSize:12,fontWeight:700,color:"#fff",marginBottom:2 }}>{name}</div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.muted }}>{hex}</div>
        {role && <div style={{ fontSize:10,color:C.dim,marginTop:3 }}>{role}</div>}
        {note && <div style={{ fontSize:9,fontWeight:800,color:C.green,marginTop:4 }}>{note}</div>}
      </div>
    </div>
  );
};

const Steps = ({ active }) => (
  <div style={{ display:"flex",alignItems:"center" }}>
    {["Photos","Details","Price","Preview"].map((lbl,i) => {
      const n=i+1; const done=active>n; const cur=active===n;
      return (
        <div key={n} style={{ display:"flex",alignItems:"center" }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:done?C.green:cur?`linear-gradient(135deg,${C.orchid},${C.violet})`:C.d4,border:`1.5px solid ${done?C.green:cur?C.violet:C.bdr}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:done||cur?"#fff":C.muted,boxShadow:done?`0 0 10px ${C.green}55`:cur?`0 0 14px ${C.violet}55`:"none",transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>{done?"✓":n}</div>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:done?C.green:cur?C.violet:C.muted }}>{lbl}</span>
          </div>
          {i<3 && <div style={{ width:30,height:1.5,margin:"0 4px",marginBottom:18,background:active>n?C.green:C.bdr,borderRadius:2,transition:"background .35s" }}/>}
        </div>
      );
    })}
  </div>
);

/* Voice-specific components */
const Copy = ({ context, text, note, color=C.violet }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="example-card" style={{ marginBottom:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
        <span style={{ fontSize:9,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted }}>{context}</span>
        <button onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),1800); }} style={{ fontSize:10,fontWeight:700,color:copied?C.green:C.muted,background:"none",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"color .2s" }}>{copied?"✓ copied":"copy"}</button>
      </div>
      <div style={{ fontSize:14,fontWeight:700,color:"white",lineHeight:1.7,borderLeft:`2px solid ${color}`,paddingLeft:14 }}>{text}</div>
      {note && <div style={{ fontSize:11,color:C.dim,marginTop:8,lineHeight:1.6 }}>{note}</div>}
    </div>
  );
};

const Word = ({ word, color=C.violet }) => (
  <span className="word-chip" style={{ borderColor:`${color}40` }}>{word}</span>
);

const VSecHead = ({ n, title, sub }) => (
  <div style={{ marginBottom:32 }}>
    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
      <div style={{ fontSize:10,fontWeight:900,letterSpacing:"0.12em",color:C.violet,background:`rgba(179,84,241,.1)`,border:`1px solid rgba(179,84,241,.2)`,borderRadius:5,padding:"2px 9px" }}>{n}</div>
      <div style={{ height:1,flex:1,background:`linear-gradient(90deg,${C.violet}40,transparent)` }}/>
    </div>
    <h2 style={{ fontSize:26,fontWeight:900,letterSpacing:"-0.6px",lineHeight:1.1,marginBottom:6 }}>{title}</h2>
    {sub && <p style={{ fontSize:13,color:C.dim,lineHeight:1.7 }}>{sub}</p>}
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   NAV DEFINITIONS
───────────────────────────────────────────────────────────────── */
const NAV_STYLE = [
  { id:"logos",   label:"01 · Logo System" },
  { id:"colours", label:"02 · Colour Palette" },
  { id:"type",    label:"03 · Typography" },
  { id:"buttons", label:"04 · Buttons" },
  { id:"inputs",  label:"05 · Inputs & Forms" },
  { id:"cards",   label:"06 · Cards & Surfaces" },
  { id:"badges",  label:"07 · Badges & Chips" },
  { id:"steps",   label:"08 · Step Indicators" },
  { id:"states",  label:"09 · States & Feedback" },
  { id:"dpp",     label:"10 · DPP Components" },
  { id:"nova",    label:"11 · Nova Wallet Ref" },
  { id:"stack",   label:"12 · UI Tech Stack" },
  { id:"anim",    label:"13 · Animation System" },
  { id:"prompt",  label:"14 · Master Prompt" },
  { id:"price",   label:"15 · Price Badges ★" },
];

const NAV_VOICE = [
  { id:"v-soul",     label:"01 · Brand Soul" },
  { id:"v-persona",  label:"02 · Voice Persona" },
  { id:"v-pillars",  label:"03 · Tone Pillars" },
  { id:"v-vocab",    label:"04 · Vocabulary" },
  { id:"v-copy",     label:"05 · Copy in Action" },
  { id:"v-channels", label:"06 · By Channel" },
  { id:"v-grammar",  label:"07 · Grammar Rules" },
  { id:"v-naming",   label:"08 · Naming System" },
  { id:"v-prompt",   label:"09 · AI Voice Prompt" },
];

const NAV_DEV = [
  { id:"d-arch",     label:"01 · Architecture" },
  { id:"d-stack",    label:"02 · Tech Stack" },
  { id:"d-dpp",      label:"03 · DPP Lifecycle" },
  { id:"d-api",      label:"04 · API & Webhooks" },
  { id:"d-tokens",   label:"05 · Design Tokens" },
  { id:"d-conic",    label:"06 · Conic Border" },
  { id:"d-payment",  label:"07 · Payment Links" },
  { id:"d-n8n",      label:"08 · n8n Workflows" },
  { id:"d-docker",   label:"09 · Docker & Env" },
  { id:"d-zina",     label:"10 · Zina Integration" },
];

const NAV_UX = [
  { id:"ux-audit",   label:"00 · Compliance Audit" },
  { id:"ux-motion",  label:"01 · Motion Language" },
  { id:"ux-buttons", label:"02 · Advanced Buttons" },
  { id:"ux-chrome",  label:"03 · Liquid Chrome" },
  { id:"ux-blob",    label:"04 · Liquid Blob" },
  { id:"ux-distort", label:"05 · SVG Distortion" },
  { id:"ux-pulse",   label:"06 · Pulse Glow" },
  { id:"ux-badges",  label:"07 · Price Badges" },
  { id:"ux-psych",   label:"08 · Buying Psychology" },
  { id:"ux-nova",    label:"09 · Nova Wallet Deep" },
  { id:"ux-mobile",  label:"10 · Mobile Patterns" },
  { id:"ux-scripts", label:"11 · Ready Scripts ★" },
];


/* ═══════════════════════════════════════════════════════════════
   STYLE GUIDE CONTENT
═══════════════════════════════════════════════════════════════ */
function StyleGuideContent() {
  const [optSel, setOptSel] = useState("ship");
  const [stepActive, setStepActive] = useState(2);

  return (
    <div className="content-inner" style={{ padding:"52px 56px 140px" }}>
      {/* ── AGENT: VERA ─────────────────────────────────────────── */}
      <div style={{ background:`linear-gradient(135deg,#6A14DB18,#6A14DB06)`,
        border:`1.5px solid #6A14DB40`, borderRadius:16, padding:"22px 28px",
        marginBottom:48, marginTop:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:20 }}>
          <div style={{ flexShrink:0, width:52, height:52, borderRadius:12,
            background:`#6A14DB18`, border:`1.5px solid #6A14DB40`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22, fontWeight:900, color:"#6A14DB" }}>
            ◈
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6, flexWrap:"wrap" }}>
              <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.14em",
                textTransform:"uppercase", color:"#6A14DB" }}>Guardian Agent</div>
              <div style={{ fontSize:10, color:"#6b6b80", background:"#1c1c22",
                border:"1px solid #2e2e38", borderRadius:4, padding:"2px 8px",
                fontFamily:"'JetBrains Mono',monospace" }}>
                18 Years
              </div>
            </div>
            <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.4px", marginBottom:3 }}>
              VERA
            </div>
            <div style={{ fontSize:12, color:"#9999b0", marginBottom:12 }}>
              Brand Strategist & Chief Brand Officer
            </div>
            <div style={{ fontSize:11, color:"#6b6b80", lineHeight:1.8,
              paddingTop:12, borderTop:"1px solid #2e2e38" }}>
              18 years defining brand purpose, positioning architecture, and identity systems for infrastructure and consumer technology. Built brand foundations for two unicorns from pre-revenue. Specialises in making complex infrastructure feel inevitable and human.
            </div>
            <div style={{ marginTop:12, padding:"10px 14px",
              background:`#6A14DB0c`, border:`1px solid #6A14DB25`,
              borderRadius:9, fontSize:11, color:"#9999b0", lineHeight:1.7 }}>
              <span style={{ color:"#6A14DB", fontWeight:800 }}>Audit mandate: </span>
              Enforces: every initiative connects to circular trade infrastructure · survivability framing in all investor/pitch docs · no sustainability washing (DPP-verifiable claims only) · blockchain hidden in consumer context · ESPR compliance angle in B2B pitch. Her question: 'Does this extend the object's life, or ours?'
            </div>
          </div>
        </div>
      </div>
      {/* ── End Agent Header ────────────────────────────────────────── */}

      {/* Hero */}
      <div style={{ marginBottom:72,animation:"fadeUp 0.5s ease" }}>
        <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>DeStore Network</div>
        <h1 style={{ fontSize:48,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.08,marginBottom:16 }}>Brand & UI<br/>Style Guide</h1>
        <p style={{ fontSize:15,color:C.dim,maxWidth:520,lineHeight:1.75,marginBottom:22 }}>Official design language, colour system, component library, Nova Wallet reference, and full UI tech stack for DeStore apps and integrations.</p>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          <Chip color={C.violet}>◈ Circular Trade Infrastructure</Chip>
          <Chip color={C.green}>Roam Free</Chip>
          <Chip>Plus Jakarta Sans</Chip>
          <Chip>Soneium · Thirdweb</Chip>
          <Chip color={C.pink}>Real official SVG assets</Chip>
        </div>
      </div>

      {/* 01 LOGOS */}
      <Sec id="logos" n="01" title="Logo System" sub="Official Illustrator-exported vector paths · 6 variants · viewBox 0 0 405.4 76.5">
        <Sub>Primary Reversed — white · recommended for all dark digital UI</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20 }}>
          <div>
            <div style={{ background:C.d1,border:`1px solid ${C.bdr}`,borderRadius:14,padding:"36px 28px",display:"flex",alignItems:"center",justifyContent:"center" }}><Logo fill="#ffffff" width={230}/></div>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>On app dark · #0d0d10</div>
          </div>
          <div>
            <div style={{ background:C.royal,borderRadius:14,padding:"36px 28px",display:"flex",alignItems:"center",justifyContent:"center" }}><Logo fill="#ffffff" width={230}/></div>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>On Royal Base #321B68</div>
          </div>
        </div>
        <Sub>DS Secondary Mark + Mono</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginBottom:20 }}>
          {[
            { bg:"#f0f0f0", fill:"#000000", comp:"wm", label:"Mono Black" },
            { bg:C.d1,      fill:"#ffffff", comp:"ds", label:"DS · Reversed" },
            { bg:C.royal,   fill:"#ffffff", comp:"ds", label:"DS · On Brand" },
            { bg:"#f0eef8", fill:"#321B68", comp:"ds", label:"DS · Midnight" },
          ].map((v,i) => (
            <div key={i}>
              <div style={{ background:v.bg,border:`1px solid ${C.bdr}`,borderRadius:14,padding:"28px 16px",display:"flex",alignItems:"center",justifyContent:"center" }}>
                {v.comp==="wm"?<Logo fill={v.fill} width={110}/>:<LogoDS fill={v.fill} width={64}/>}
              </div>
              <div style={{ fontSize:10,color:C.muted,marginTop:7 }}>{v.label}</div>
            </div>
          ))}
        </div>
        <Sub>Usage Rules</Sub>
        <Card>
          <Tbl heads={["Variant","Use On","Never"]} rows={[
            ["Primary Reversed (white)","Dark UI #0d0d10 – #1c1c22 · Royal Base bg","Light bg · coloured bg without contrast test"],
            ["Primary Midnight Purple (#321B68)","Light/white bg · print","Dark bg · produces zero contrast"],
            ["Electric Violet (#6200E9)","Light/print marketing only","Dark app UI — too saturated to read"],
            ["DS secondary mark","App icon · favicon · avatar · embossed","Anywhere the full name is needed for clarity"],
          ]}/>
        </Card>
      </Sec>

      {/* 02 COLOURS */}
      <Sec id="colours" n="02" title="Colour Palette" sub="Official brand colours + app UI extension tokens">
        <Sub>Official Brand Colours — from Glyphic Creative brief</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20 }}>
          <Swatch hex="#000000" name="Black" role="Official brand" note="OFFICIAL"/>
          <Swatch hex="#321B68" name="Royal Base" role="Brand bg · hero" note="OFFICIAL"/>
          <Swatch hex="#FF1B9A" name="Hot Pink" role="Sale · SOLD · Live" note="OFFICIAL"/>
          <Swatch hex="#6200E9" name="Electric Violet" role="Light/print ONLY" note="OFFICIAL"/>
          <Swatch hex="#FF9F46" name="Orange" role="Warning · Pending" note="OFFICIAL"/>
          <Swatch hex="#EFB4B0" name="Blush" role="Warm accent" note="OFFICIAL"/>
          <Swatch hex="#FFEFDC" name="Cream" role="Light surface" note="OFFICIAL"/>
          <Swatch hex="#FFD0AC" name="Peach" role="Warm highlight" note="OFFICIAL"/>
        </div>
        <Sub>App UI Extension Tokens</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20 }}>
          <Swatch hex="#6A14DB" name="Orchid" role="Gradient start · deep violet"/>
          <Swatch hex="#B354F1" name="Hybrid Violet" role="CTAs · conic borders · active"/>
          <Swatch hex="#0a0a0d" name="dark0" role="Page background"/>
          <Swatch hex="#0d0d10" name="dark1" role="Topbar · sidebar"/>
          <Swatch hex="#141418" name="dark2" role="Section grouping"/>
          <Swatch hex="#1c1c22" name="dark3" role="Product card"/>
          <Swatch hex="#26262e" name="dark4" role="Input · chip · sub-surface"/>
          <Swatch hex="#2e2e38" name="border" role="All dividers"/>
          <Swatch hex="#6b6b80" name="muted" role="Labels · secondary text"/>
          <Swatch hex="#9999b0" name="dimmed" role="Body text · descriptions"/>
          <Swatch hex="#28B79D" name="Teal Green" role="DPP verified · AUTO · success"/>
          <Swatch hex="#2FB457" name="Pure Green" role="Live · Sold · Profit"/>
          <Swatch hex="#1877F2" name="FB Blue" role="Facebook Marketplace only"/>
        </div>
        <Sub>Colour Usage Rules</Sub>
        <Card>
          <Tbl heads={["Token","Hex","Use"]} rows={[
            ["Hybrid Violet",C.violet,"CTAs · active states · conic borders · section accents"],
            ["Hot Pink",C.pink,"SALE · SOLD · new listing notification · error states"],
            ["Orange",C.orange,"Pending · price alert · low stock · expiry warning"],
            ["Teal Green",C.green,"AUTO ✓ · DPP verified · step done · success"],
            ["Pure Green",C.greenAlt,"● Live · sold state · profit · positive balance"],
            ["Royal Base",C.royal,"Brand hero backgrounds · Ownership Claim badge only"],
            ["Electric Violet","#6200E9","Light/print logo ONLY — never in dark app UI"],
            ["FB Blue",C.fb,"Facebook Marketplace integration only — not brand use"],
          ]}/>
        </Card>
      </Sec>

      {/* 03 TYPOGRAPHY */}
      <Sec id="type" n="03" title="Typography" sub="Plus Jakarta Sans · sole typeface · 5 weights in active use">
        <Demo style={{ display:"flex",flexDirection:"column",gap:14,marginBottom:20 }}>
          {[
            { w:900, s:40, l:-1.2, t:"Brand Heading 900" },
            { w:800, s:28, l:-0.6, t:"Section Title 800" },
            { w:700, s:18, l:-0.2, t:"Card Title / Feature Label 700" },
            { w:600, s:14, l:0,    t:"Body Emphasis / Button 600" },
            { w:400, s:13, l:0.02, t:"Body Copy / Descriptions 400" },
          ].map(r => (
            <div key={r.w} style={{ display:"flex",alignItems:"baseline",gap:20 }}>
              <span style={{ fontSize:r.s,fontWeight:r.w,letterSpacing:r.l,lineHeight:1.2 }}>{r.t}</span>
              <span style={{ fontSize:10,color:C.muted,flexShrink:0 }}>{r.w} · {r.s}px</span>
            </div>
          ))}
        </Demo>
        <Card>
          <Tbl heads={["Role","Weight","Size","Tracking","Colour"]} rows={[
            ["Hero heading","900","40–48px","-1.2 to -1.5px","#ffffff"],
            ["Section title","900","20–26px","-0.3 to -0.6px","#ffffff"],
            ["Card title","700–800","14–18px","-0.2px","#ffffff"],
            ["Button label","800","12–14px","0.02em","#ffffff"],
            ["Field label","700–800","9–10px","0.08–0.12em uppercase","#6b6b80"],
            ["Body copy","400–600","12–14px","0","#9999b0"],
            ["Monospace (code)","400–700","11–12px","0","#9999b0"],
          ]}/>
        </Card>
        <Sub>Monospace — JetBrains Mono</Sub>
        <div style={{ background:C.d1,border:`1px solid ${C.bdr}`,borderRadius:12,padding:"16px 20px" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:C.violet }}>◈ DPP · #B354F1 · Soneium · 0x4f2d</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.muted,marginLeft:16 }}>JetBrains Mono · code blocks · hex values · addresses</span>
        </div>
      </Sec>

      {/* 04 BUTTONS */}
      <Sec id="buttons" n="04" title="Buttons" sub="6 variants · 14px 800 weight · border-radius 14px · always btn-press class">
        <Demo style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:20 }}>
          <Btn>Primary CTA</Btn>
          <Btn v="green">✓ Confirm</Btn>
          <Btn v="pink">🔥 SALE</Btn>
          <Btn v="fb">f  Post to FB</Btn>
          <Btn v="ghost">Ghost</Btn>
          <Btn v="danger">Delete</Btn>
          <Btn sm>Small</Btn>
          <Btn disabled>Disabled</Btn>
        </Demo>
        <Card>
          <Tbl heads={["Variant","Background","Shadow","Notes"]} rows={[
            ["Primary",`135° ${C.orchid} → ${C.violet}`,`0 4px 20px ${C.violet}35`,"All primary CTAs — List · Buy · Confirm"],
            ["Green",`135° #1a9a84 → ${C.green}`,`0 4px 16px ${C.green}30`,"Success · Confirm · DPP verified action"],
            ["Hot Pink",`135° #c0126f → ${C.pink}`,`0 4px 16px ${C.pink}30`,"Sale/SOLD label · destructive with care"],
            ["FB Blue",`135° #1565c0 → ${C.fb}`,`0 4px 16px ${C.fb}30`,"Facebook Marketplace post only"],
            ["Ghost","transparent","none","Secondary action · cancel · back"],
            ["Danger","135° #7a0a0a → #c0392b","0 4px 16px #c0392b30","Irreversible delete — rare use"],
            [":active press","—","—","scale(.97) opacity(.88) — all variants"],
          ]}/>
        </Card>
      </Sec>

      {/* 05 INPUTS */}
      <Sec id="inputs" n="05" title="Inputs & Forms" sub="dark4 surface · conic-gradient spinning border on focus · border-radius 11px">
        <Demo style={{ display:"flex",flexDirection:"column",gap:18 }}>
          <div>
            <Lbl auto>Product Title</Lbl>
            <input defaultValue="Nike Air Max 95" style={{ background:C.d4,border:`1.5px solid ${C.bdr}`,borderRadius:11,padding:"11px 14px",color:"#fff",fontSize:14,width:"100%",outline:"none",transition:"border-color .2s,box-shadow .2s" }}
              onFocus={e=>{e.target.style.borderColor=C.violet;e.target.style.boxShadow=`0 0 0 3px ${C.violet}20`;}}
              onBlur={e=>{e.target.style.borderColor=C.bdr;e.target.style.boxShadow="none";}}
            />
          </div>
          <div>
            <Lbl>Conic Active Border Demo</Lbl>
            <div style={{ display:"flex",gap:20,alignItems:"center",flexWrap:"wrap" }}>
              <div>
                <div style={{ fontSize:9,color:C.muted,marginBottom:6,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase" }}>Default</div>
                <div style={{ background:C.d4,border:`1.5px solid ${C.bdr}`,borderRadius:11,padding:"11px 16px",color:C.muted,fontSize:14,width:190 }}>Unfocused</div>
              </div>
              <div>
                <div style={{ fontSize:9,color:C.muted,marginBottom:6,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase" }}>Focused (conic)</div>
                <div className="conic-wrap"><div className="conic-inner">Active ✦</div></div>
              </div>
            </div>
          </div>
        </Demo>
        <Sub>Conic Focus CSS</Sub>
        <div className="code">{`<span class="cv">@property</span> <span class="cv">--angle</span> { syntax:<span class="cg">'<angle>'</span>; initial-value:<span class="co">0deg</span>; inherits:<span class="cb">false</span>; }
<span class="cb">@keyframes</span> spin-border { to { <span class="cv">--angle</span>:<span class="co">360deg</span>; } }

<span class="cw">.conic-wrap</span> {
  position:<span class="cb">relative</span>;  border-radius:<span class="co">13px</span>;  padding:<span class="co">1.5px</span>;
  background:<span class="cb">conic-gradient</span>(from <span class="cv">var(--angle,0deg)</span>,
    <span class="cv">#B354F1</span>, <span class="cv">#6a14db</span>, <span class="cb">#00c8ff</span>, <span class="cv">#B354F1 40%</span>, <span class="cv">#321b68 60%</span>, <span class="cv">#B354F1</span>);
  animation: spin-border <span class="co">2.5s</span> linear infinite;
}
<span class="cw">.conic-inner</span> { background:<span class="cv">#26262e</span>; border-radius:<span class="co">11px</span>; }`}</div>
      </Sec>

      {/* 06 CARDS */}
      <Sec id="cards" n="06" title="Cards & Surfaces" sub="3-level elevation system · selection card pattern">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20 }}>
          {[
            { bg:C.d2, name:"dark2 #141418", role:"Page section, grouping" },
            { bg:C.d3, name:"dark3 #1c1c22", role:"Product card, info card" },
            { bg:C.d4, name:"dark4 #26262e", role:"Input, chip, sub-surface" },
          ].map(c => (
            <div key={c.name} style={{ background:c.bg,border:`1px solid ${C.bdr}`,borderRadius:14,padding:18 }}>
              <div style={{ fontSize:9,fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",color:C.muted,marginBottom:8 }}>Surface Level</div>
              <div style={{ color:"#fff",fontWeight:700,fontSize:13,marginBottom:4 }}>{c.name}</div>
              <div style={{ color:C.dim,fontSize:11 }}>{c.role}</div>
            </div>
          ))}
        </div>
        <Sub>Selection / Option Card</Sub>
        <Demo style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {[
            { id:"ship", icon:"📦", label:"Shipping + local pickup", sub:"DeStore generates label on sale" },
            { id:"local",icon:"🤝", label:"Local pickup only",        sub:"Buyer comes to you" },
          ].map(o => (
            <button key={o.id} className={`opt-card${optSel===o.id?" on":""}`} onClick={()=>setOptSel(o.id)}>
              <span style={{ fontSize:22 }}>{o.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ color:"#fff",fontWeight:700,fontSize:13 }}>{o.label}</div>
                <div style={{ color:C.muted,fontSize:11,marginTop:2 }}>{o.sub}</div>
              </div>
              <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,border:`2px solid ${optSel===o.id?C.violet:C.bdr}`,background:optSel===o.id?`linear-gradient(135deg,${C.orchid},${C.violet})`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:optSel===o.id?`0 0 8px ${C.violet}55`:"none",transition:"all .2s",fontSize:11,fontWeight:900,color:"#fff" }}>{optSel===o.id?"✓":""}</div>
            </button>
          ))}
        </Demo>
      </Sec>

      {/* 07 BADGES */}
      <Sec id="badges" n="07" title="Badges & Chips" sub="Semantic colour assignment · all status states">
        <Demo style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:20 }}>
          <AutoBadge/>
          <Chip color={C.violet}>◈ DPP Verified</Chip>
          <Chip color={C.green}>✓ Confirmed</Chip>
          <Chip color={C.greenAlt}>● Live</Chip>
          <Chip color={C.orange}>⚠ Pending</Chip>
          <Chip color={C.pink}>🔥 SALE</Chip>
          <Chip color={C.pink}>SOLD</Chip>
          <Chip>Like New</Chip>
          <Chip>Footwear</Chip>
          <Chip color={C.fb}>f FB Marketplace</Chip>
          <Chip color={C.orchid}>◈ Soneium</Chip>
          <Chip color={C.royal} bg={C.royal+"30"} border={C.royal}>Ownership Claim</Chip>
        </Demo>
        <Card>
          <Tbl heads={["Colour","HEX","Badge / UI Use"]} rows={[
            ["Hybrid Violet",C.violet,"DPP Verified · conic border · primary CTAs"],
            ["Hot Pink",C.pink,"SALE · SOLD · new listing notification · listing live"],
            ["Teal Green",C.green,"AUTO ✓ · step done ✓ · success state · DPP sourced"],
            ["Pure Green",C.greenAlt,"● Live · Sold state · Profit · Positive balance"],
            ["Orange",C.orange,"⚠ Pending · Price alert · Low stock warning · Expiry"],
            ["FB Blue",C.fb,"Facebook Marketplace integration only"],
            ["Royal Base",C.royal,"Brand bg · hero sections · Ownership Claim badge"],
            ["Muted #6b6b80",C.muted,"Neutral tags · category chips · condition labels"],
          ]}/>
        </Card>
      </Sec>

      {/* 08 STEPS */}
      <Sec id="steps" n="08" title="Step Indicators" sub="Spring easing transitions · done/active/pending states">
        <Demo>
          <div style={{ marginBottom:20 }}><Steps active={stepActive}/></div>
          <div style={{ display:"flex",gap:8 }}>
            {[1,2,3,4].map(n => <Btn key={n} v={stepActive===n?"primary":"ghost"} sm onClick={()=>setStepActive(n)}>Step {n}</Btn>)}
          </div>
        </Demo>
        <Sub>Spec</Sub>
        <Card>
          <Tbl heads={["State","Circle Style","Connector","Label"]} rows={[
            ["Done","Green fill · ✓ · glow green55",C.green,C.green],
            ["Active",`gradient(${C.orchid}→${C.violet}) · glow violet55`,C.bdr,C.violet],
            ["Pending","dark4 · border bdr",C.bdr,C.muted],
            ["Easing","cubic-bezier(0.34, 1.56, 0.64, 1) — spring Nova","—","0.35s"],
          ]}/>
        </Card>
      </Sec>

      {/* 09 STATES */}
      <Sec id="states" n="09" title="States & Feedback" sub="Never spinners · shimmer for load · scaleIn for success · 3 bounce dots for async">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          <div>
            <Sub>Shimmer Skeleton</Sub>
            <Demo style={{ display:"flex",flexDirection:"column",gap:10 }}>
              <div className="shimmer" style={{ height:90,borderRadius:14 }}/>
              <div className="shimmer" style={{ height:13,width:"65%",borderRadius:6 }}/>
              <div className="shimmer" style={{ height:11,width:"40%",borderRadius:6 }}/>
            </Demo>
          </div>
          <div>
            <Sub>Success — scaleIn + ringExpand</Sub>
            <Demo style={{ display:"flex",alignItems:"center",gap:18 }}>
              <div style={{ position:"relative",width:70,height:70,flexShrink:0 }}>
                <div style={{ position:"absolute",inset:-8,borderRadius:"50%",border:`2px solid ${C.green}`,animation:"ringExpand 1.6s ease infinite" }}/>
                <div style={{ width:70,height:70,borderRadius:"50%",background:`${C.green}1a`,border:`2px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,animation:"scaleIn .45s cubic-bezier(0.34,1.56,0.64,1)" }}>✓</div>
              </div>
              <div>
                <div style={{ fontWeight:800,fontSize:18 }}>Listed.</div>
                <div style={{ color:C.dim,fontSize:12,marginTop:4 }}>scaleIn + ringExpand</div>
              </div>
            </Demo>
          </div>
        </div>
        <Sub>Async — 3 bounce dots (stagger 0.22s)</Sub>
        <Demo style={{ display:"flex",alignItems:"center",gap:20 }}>
          <div style={{ width:52,height:52,borderRadius:"50%",background:`${C.fb}18`,border:`2px solid ${C.fb}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:900,color:C.fb,animation:"pulse 1.2s ease infinite" }}>f</div>
          <div>
            <div style={{ fontWeight:700,fontSize:15 }}>Posting to FB Marketplace…</div>
            <div style={{ display:"flex",gap:6,marginTop:10 }}>
              {[0,1,2].map(i => <div key={i} style={{ width:7,height:7,borderRadius:"50%",background:C.fb,animation:`bounce .9s ease ${i*0.22}s infinite` }}/>)}
            </div>
          </div>
        </Demo>
      </Sec>

      {/* 10 DPP */}
      <Sec id="dpp" n="10" title="DPP Components" sub="Digital Product Passport UI patterns">
        <Demo style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ background:`linear-gradient(135deg,${C.violet}14,${C.orchid}08)`,border:`1px solid ${C.violet}28`,borderRadius:14,padding:"15px 17px",display:"flex",gap:12,alignItems:"flex-start" }}>
            <span style={{ fontSize:22,flexShrink:0,filter:`drop-shadow(0 0 6px ${C.violet}80)` }}>◈</span>
            <div>
              <div style={{ fontWeight:700,fontSize:13,marginBottom:4 }}>Photos auto-loaded from DPP</div>
              <div style={{ color:C.dim,fontSize:12,lineHeight:1.5 }}>3 product images retrieved from your Digital Product Passport. Product record minted at manufacture on Soneium.</div>
            </div>
          </div>
          <div style={{ background:C.d4,border:`1px solid ${C.bdr}`,borderRadius:12,padding:"13px 16px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
            {[["Material","Mesh + Leather"],["Origin","Vietnam · 2023"],["Carbon","13.6kg CO₂e"]].map(([k,v]) => (
              <div key={k}>
                <div style={{ fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.muted,marginBottom:4 }}>{k}</div>
                <div style={{ fontSize:12,fontWeight:600,color:C.dim }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:"10px 14px",background:`${C.violet}0f`,border:`1px solid ${C.violet}28`,borderRadius:10,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ color:C.violet,fontSize:16 }}>◈</span>
            <span style={{ fontSize:11,color:C.violet,fontWeight:700 }}>DeStore Verified DPP · Scan QR for full product history & ownership chain</span>
          </div>
        </Demo>
        <Sub>DPP Architecture</Sub>
        <Card>
          <Tbl heads={["Layer","Tech","Description"]} rows={[
            ["Product Record","Soneium SBT","Minted once at manufacture. Never transfers. Stores DPP data permanently."],
            ["Ownership Claim","DeStore DB · signed","Cryptographically signed off-chain. New owner gets claim URL → wallet card."],
            ["Event Log","Blockchain notary","Transfer/destroy/recycle events only — NOT ownership tokens."],
            ["Images","Google Drive / Arweave","Attached to SBT metadata. Loaded into listing via DPP callout banner."],
          ]}/>
        </Card>
      </Sec>

      {/* 11 NOVA */}
      <Sec id="nova" n="11" title="Nova Wallet Reference" sub="UI quality benchmark — match or exceed">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20 }}>
          {[
            { label:"Background", val:"#0F0F0F – #1A1A1A", note:"OLED black · near-black gradient" },
            { label:"Card elevation", val:"Subtle shadow + border", note:"1px border + drop shadow — no harsh lines" },
            { label:"Accent pills", val:"Gradient pill buttons", note:"135° gradient · same as DeStore primary" },
            { label:"Loading", val:"Skeleton shimmer", note:"Never spinners — always shimmer" },
            { label:"Easing", val:"cubic-bezier(0.34,1.56,0.64,1)", note:"Spring physics — 'pop' into place" },
            { label:"Typography", val:"SF Pro / system font", note:"DeStore uses Plus Jakarta Sans instead" },
          ].map(f => (
            <Card key={f.label}>
              <div style={{ fontSize:9,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:C.violet,marginBottom:8 }}>{f.label}</div>
              <div style={{ fontSize:14,fontWeight:700,color:"white",marginBottom:4 }}>{f.val}</div>
              <div style={{ fontSize:11,color:C.muted }}>{f.note}</div>
            </Card>
          ))}
        </div>
        <Card>
          <Tbl heads={["Nova Pattern","DeStore Implementation"]} rows={[
            ["Dark-first #0F0F0F","dark0 #0a0a0d — OLED optimised"],
            ["Card elevation hierarchy","3-level: dark2 → dark3 → dark4"],
            ["Bottom tab navigation","Standard mobile nav bar with active violet indicator"],
            ["Gradient accent buttons","135° orchid→violet — identical pattern"],
            ["Liquid Glass UI (iOS 26)","backdrop-filter blur(14px) on topbar/modals"],
            ["Skeleton shimmer loading","shimmer keyframe on all async content"],
            ["Spring easing transitions","cubic-bezier(0.34,1.56,0.64,1) on all state changes"],
          ]}/>
        </Card>
      </Sec>

      {/* 12 STACK */}
      <Sec id="stack" n="12" title="UI Tech Stack" sub="Production stack — web app">
        <Card>
          <Tbl heads={["Layer","Technology","Notes"]} rows={[
            ["Framework","React / Next.js","App Router · single .jsx · all CSS in GLOBAL_CSS string"],
            ["Styling","Inline styles + CSS string","Zero external CSS files · all tokens in C object"],
            ["Fonts","Plus Jakarta Sans · JetBrains Mono","Google Fonts import at top of CSS string"],
            ["Wallet","Thirdweb SDK","Wallet connection only — not for payments"],
            ["Payments","USDC · Soneium","Native chain payments · no fiat rails"],
            ["DPP minting","Soneium SBT","Minted at manufacture via n8n workflow"],
            ["Automation","n8n self-hosted","n8n.flowberry.org — all workflow logic"],
            ["Tunneling","Cloudflare Tunnel","Public HTTPS for self-hosted services"],
            ["Container","Docker","All services containerised"],
            ["AI","Claude API (claude-sonnet-4-20250514)","Vision · copy generation · Zina assistant"],
          ]}/>
        </Card>
      </Sec>

      {/* 13 ANIMATION */}
      <Sec id="anim" n="13" title="Animation System" sub="All keyframes defined · usage rules">
        <Card style={{ marginBottom:16 }}>
          <Tbl heads={["Keyframe","Duration","Timing","Use"]} rows={[
            ["spin-border","2.5s","linear infinite","Conic button/input border"],
            ["spin-pb1–4","2.0s","linear infinite","Price badge rings — FIXED 2s"],
            ["fadeUp","0.4s","ease","Section/card entrance"],
            ["scaleIn","0.45s","spring cubic-bezier","Success checkmarks"],
            ["checkPop","0.4s","spring cubic-bezier","DPP verified pop"],
            ["ringExpand","1.6s","ease infinite","Success ring pulse"],
            ["shimmer","1.6s","linear infinite","Loading skeleton"],
            ["bounce","0.9s","ease infinite","Async posting dots (stagger 0.22s)"],
            ["pulse","1.2s","ease infinite","FB icon async state"],
            ["gradShift","3s","ease infinite","Background gradient shift"],
            ["ticker","22s","linear infinite","Brand ticker tape"],
          ]}/>
        </Card>
        <Sub>Rules</Sub>
        <Card>
          <Tbl heads={["Rule","Detail"]} rows={[
            ["Price badge speed","Always 2.0s linear — never deviate"],
            ["Button conic speed","Always 2.5s linear — distinct from badge"],
            ["Spring easing","cubic-bezier(0.34,1.56,0.64,1) for all pop/scale transitions"],
            ["No spinners","Replace all loading spinners with shimmer skeleton"],
            ["Stagger delay","0.22s per dot for bounce async — creates wave not unison"],
          ]}/>
        </Card>
      </Sec>

      {/* 14 MASTER PROMPT */}
      <Sec id="prompt" n="14" title="Master UI Prompt" sub="Paste at the top of any DeStore UI generation request">
        <div className="code">{`<span class="cv">─── DESTORE UI MASTER PROMPT v4.0 ─────────────────────────────</span>

You are building a <span class="cg">DeStore</span> interface component.
Category: <span class="cg">Circular Trade Infrastructure</span>
Tagline: <span class="cw">"Built for Circular Trade · Roam Free"</span>

<span class="cv">─── BRAND TOKENS ──────────────────────────────────────────────</span>
Royal Base <span class="co">#321B68</span>  · Digital Orchid <span class="co">#6A14DB</span>  · Hybrid Violet <span class="co">#B354F1</span>
Hot Pink   <span class="co">#FF1B9A</span>  · Orange        <span class="co">#FF9F46</span>  · Teal Green    <span class="co">#28B79D</span>
Pure Green <span class="co">#2FB457</span>  · FB Blue        <span class="co">#1877F2</span>
Darks: <span class="co">#0a0a0d #0d0d10 #141418 #1c1c22 #26262e</span>  Border: <span class="co">#2e2e38</span>
Muted: <span class="co">#6b6b80</span>  Dimmed: <span class="co">#9999b0</span>

<span class="cv">─── TYPOGRAPHY ────────────────────────────────────────────────</span>
Font: Plus Jakarta Sans (400/600/700/800/900)
Code: JetBrains Mono

<span class="cv">─── LOGO ───────────────────────────────────────────────────────</span>
Always inline the real SVG paths (DeStore_Logo_RGB_02.Primary_Reversed)
Never use text placeholders. White fill on dark backgrounds.

<span class="cv">─── COMPONENTS ────────────────────────────────────────────────</span>
Buttons: 135° gradient · border-radius 14px · 800 weight · btn-press class
Inputs:  dark4 bg · conic-wrap spinning border on focus
Cards:   dark3 bg · 1px #2e2e38 border · border-radius 14px
Badges:  Chip component · semantic colour per role
Steps:   spring easing cubic-bezier(0.34,1.56,0.64,1)
Loading: shimmer skeleton — never spinners
Success: scaleIn + ringExpand on green ✓

<span class="cv">─── CONIC BORDER (active/selected state) ──────────────────────</span>
position:relative; border:none; padding:1.5px; ::before conic-gradient
from var(--angle,0deg): #B354F1 #6a14db #00c8ff #B354F1 40% #321b68 60% #B354F1
@property --angle; animation spin-border 2.5s linear infinite
::after inset:1.5px background:#0d0d10 as mask
Apply .active class on toggle

<span class="cv">─── PRICE BADGE ───────────────────────────────────────────────</span>
Speed: 2s linear infinite — FIXED, never change
Ring: 10px outer / 8px inner border-radius · 2px padding
Inner bg: #1c1e21 (matches card bg — floating ring effect)
V1 Gradient: #B354F1·#6A14DB·#00C8FF·#28B79D·#FF9F46·#321B68 | text gradient
V2 White:    #fff·#B354F1·#fff·#9999b0·#6A14DB             | text #ffffff 900
V3 Pink:     #FF1B9A·#B354F1·#FF1B9A·#6A14DB·#321B68       | text pink gradient
V4 Orange:   #FF9F46·#FF1B9A·#B354F1·#321B68               | text orange gradient
One per card · no glow stacking · dark bg preferred

<span class="cv">─── PAGE-SPECIFIC INSTRUCTION ─────────────────────────────────</span>
[DESCRIBE YOUR PAGE / COMPONENT HERE]

Single .jsx file · all CSS in GLOBAL_CSS string · no external files.`}</div>
      </Sec>

      {/* 15 PRICE BADGES */}
      <Sec id="price" n="15" title="Conic Price Badges" sub="Motion signature of DeStore · the price is the most important number">
        <Card style={{ marginBottom:24 }}>
          <Tbl heads={["Rule","Value"]} rows={[
            ["Spin speed","2s linear infinite — fixed. Slower = broken, faster = anxious."],
            ["Border radius","10px outer · 8px inner"],
            ["Padding","2px ring · 9–12px 18–22px inner"],
            ["Inner bg","#1c1e21 — matches card bg to create floating ring effect"],
            ["Usage","One per card · no glow/shadow stacking · dark backgrounds preferred"],
          ]}/>
        </Card>
        <Sub>4 Variants — Live</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          {/* V1 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.violet,marginBottom:16 }}>V1 · Full Brand Gradient · Standard listing</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <div style={{ position:"relative",borderRadius:12,padding:2,display:"inline-block",background:`conic-gradient(from var(--pb1,0deg),#B354F1,#6A14DB,#00C8FF,#28B79D,#FF9F46,#B354F1 40%,#321B68 60%,#B354F1)`,animation:"spin-pb1 2s linear infinite" }}>
                <div style={{ background:"#1c1e21",borderRadius:10,padding:"9px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:2 }}>
                  <span style={{ fontSize:28,fontWeight:900,letterSpacing:"-0.8px",lineHeight:1,background:"linear-gradient(135deg,#28B79D 0%,#B354F1 50%,#FF9F46 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>$285</span>
                  <span style={{ fontSize:9,fontWeight:600,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>AUD</span>
                </div>
              </div>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                <span style={{ fontSize:11,fontWeight:600,color:C.muted,textDecoration:"line-through" }}>$420</span>
                <span style={{ fontSize:10,fontWeight:800,color:C.greenAlt,background:`rgba(47,180,87,.12)`,border:`1px solid rgba(47,180,87,.3)`,borderRadius:20,padding:"2px 9px" }}>Save $135</span>
              </div>
            </div>
          </Card>
          {/* V2 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:"#ffffff",marginBottom:16 }}>V2 · White · Fixed price / Buy Now</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <div style={{ fontSize:10,color:C.dim }}>⚡ Price drops in <strong style={{ color:C.orange }}>05:23:41</strong></div>
              <div style={{ position:"relative",borderRadius:12,padding:2,display:"inline-block",background:`conic-gradient(from var(--pb2,0deg),#fff,#B354F1,#fff,#9999b0,#fff,#B354F1 40%,#6A14DB 60%,#fff)`,animation:"spin-pb2 2s linear infinite" }}>
                <div style={{ background:"#1c1e21",borderRadius:10,padding:"9px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:2 }}>
                  <span style={{ fontSize:28,fontWeight:900,letterSpacing:"-0.8px",lineHeight:1,color:"#ffffff" }}>$850</span>
                  <span style={{ fontSize:9,fontWeight:600,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>AUD · fixed</span>
                </div>
              </div>
            </div>
          </Card>
          {/* V3 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.pink,marginBottom:16 }}>V3 · Hot Pink · Sale / SOLD</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <div style={{ position:"relative",borderRadius:12,padding:2,display:"inline-block",background:`conic-gradient(from var(--pb3,0deg),#FF1B9A,#B354F1,#FF1B9A,#6A14DB,#321B68,#FF1B9A)`,animation:"spin-pb3 2s linear infinite" }}>
                <div style={{ background:"#1c1e21",borderRadius:10,padding:"9px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:2 }}>
                  <span style={{ fontSize:28,fontWeight:900,letterSpacing:"-0.8px",lineHeight:1,background:"linear-gradient(135deg,#FF1B9A,#B354F1,#FF1B9A)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>$180</span>
                  <span style={{ fontSize:9,fontWeight:600,color:C.pink,letterSpacing:"0.07em",textTransform:"uppercase" }}>SALE · 43% OFF</span>
                </div>
              </div>
            </div>
          </Card>
          {/* V4 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.orange,marginBottom:16 }}>V4 · Orange Fire · Negotiable / High-value</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <div style={{ position:"relative",borderRadius:12,padding:2,display:"inline-block",background:`conic-gradient(from var(--pb4,0deg),#FF9F46,#FF1B9A,#B354F1,#321B68,#FF9F46)`,animation:"spin-pb4 2s linear infinite" }}>
                <div style={{ background:"#1c1e21",borderRadius:10,padding:"9px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:2 }}>
                  <span style={{ fontSize:28,fontWeight:900,letterSpacing:"-0.8px",lineHeight:1,background:"linear-gradient(135deg,#FF9F46,#FF1B9A,#B354F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>$3,200</span>
                  <span style={{ fontSize:9,fontWeight:600,color:C.orange,letterSpacing:"0.07em",textTransform:"uppercase" }}>negotiable</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${C.bdr}`,marginTop:80,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div>
            <Logo fill="#ffffff" width={100}/>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>© DeStore Network · Brand & UI Style Guide v4.0 · March 2026</div>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <Chip color={C.violet}>Glyphic Creative · original brand</Chip>
            <Chip color={C.green}>Nova Wallet benchmark</Chip>
            <Chip color={C.orange}>Conic Price Badges v1</Chip>
            <Chip color={C.pink}>Brand Voice v2.0</Chip>
          </div>
        </div>
      </Sec>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VOICE GUIDE CONTENT
═══════════════════════════════════════════════════════════════ */
function VoiceGuideContent() {
  return (
    <div className="content-inner" style={{ padding:"52px 56px 140px", maxWidth:860 }}>

      {/* Ticker */}
      <div style={{ background:`linear-gradient(90deg,#321B68,#6A14DB,#B354F1,#6A14DB,#321B68)`,padding:"7px 0",overflow:"hidden",marginBottom:52,marginLeft:-56,marginRight:-56 }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(2).fill(null).map((_,i) => (
              <span key={i} style={{ display:"inline-flex",gap:0 }}>
                {["Circular Trade Infrastructure","·","Roam Free","·","Verified by DPP","·","Own It. Prove It. Trade It.","·","Every Product Has a Story","·","The Chain Doesn't Lie","·","Built for Circular Trade","·","Real Goods. Real Provenance.","·"].map((t,j) => (
                  <span key={j} style={{ fontSize:11,fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(255,255,255,.85)",padding:"0 18px",whiteSpace:"nowrap" }}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ marginBottom:72 }}>
        <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>DeStore Network</div>
        <h1 style={{ fontSize:48,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.08,marginBottom:16 }}>Brand Voice<br/>Guide</h1>
        <p style={{ fontSize:15,color:C.dim,maxWidth:520,lineHeight:1.75,marginBottom:22 }}>How DeStore speaks. Every word, every channel, every context — built around Circular Trade Infrastructure.</p>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          <Chip color={C.violet}>v2.0 · Circular Trade Infrastructure</Chip>
          <Chip color={C.green}>Built for Circular Trade · Roam Free</Chip>
        </div>
      </div>

      {/* 01 SOUL */}
      <div id="v-soul" style={{ marginBottom:72 }}>
        <VSecHead n="01" title="Brand Soul" sub="What DeStore is at its core — the why behind every word we write"/>
        <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.4),rgba(106,20,219,.15))`,border:`1px solid rgba(179,84,241,.25)`,borderRadius:16,padding:28,marginBottom:28 }}>
          <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:C.violet,marginBottom:14 }}>Positioning Statement</div>
          <div style={{ fontSize:20,fontWeight:900,letterSpacing:"-0.4px",lineHeight:1.5,marginBottom:16 }}>DeStore is the infrastructure that makes circular trade possible — for every physical product, at every point in its life.</div>
          <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>We are not a marketplace. We are not a crypto app. We are the rails — the payment links, the Digital Product Passports, the ownership claims — that let physical objects move between people cleanly, permanently, and with their full history intact. Anywhere trade happens, our infrastructure is underneath it.</div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>What DeStore Is</div>
            {["Circular trade infrastructure","Payment link infrastructure for physical goods","A DPP issuance and ownership system","The provenance layer for the physical world","Rails that travel with the object, not the venue","Infrastructure for brands, sellers, and resellers"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:7 }}>
                <span style={{ color:C.green,flexShrink:0,fontSize:12 }}>→</span>
                <span style={{ fontSize:12,color:"white",fontWeight:600,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.pink,marginBottom:12 }}>What DeStore Is Not</div>
            {["A marketplace (we are not the venue)","An NFT platform or crypto trading app","A SaaS tool or generic ecommerce plugin","A replacement for eBay, Gumtree, or OpenSea","A Web3 brand speaking to crypto audiences","A one-time sale system"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:7 }}>
                <span style={{ color:C.pink,flexShrink:0,fontSize:12 }}>✗</span>
                <span style={{ fontSize:12,color:C.muted,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
        </div>
        <Card>
          <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:14 }}>Official Taglines</div>
          <Tbl heads={["Role","Line","Usage"]} rows={[
            ["Primary",    "Built for Circular Trade · Roam Free",        "Primary brand line. Middle dot mandatory. Both halves always together."],
            ["Category",   "Circular Trade Infrastructure",                "Company descriptor. Press · B2B · investor. Not a tagline."],
            ["Short",      "Roam Free",                                    "Social bios · icon lockups · app store subtitle"],
            ["DPP",        "Own It. Prove It. Trade It.",                  "DPP feature marketing · onboarding · lifecycle in three beats"],
            ["Trust",      "The Chain Doesn't Lie.",                       "Authentication · verification · anti-counterfeit contexts"],
            ["Object",     "Every Product Has a Story.",                   "Collector · luxury · heritage · provenance-led marketing"],
            ["Rail",       "The Infrastructure Travels With the Product.", "B2B · brand partnerships · 'our rails in your product'"],
            ["Direct",     "Real Goods. Real Provenance.",                 "Anti-fake · trust campaign · direct-to-consumer"],
          ]}/>
        </Card>
      </div>

      {/* 02 PERSONA */}
      <div id="v-persona" style={{ marginBottom:72 }}>
        <VSecHead n="02" title="Voice Persona" sub="If DeStore were a person, who would they be?"/>
        <div style={{ background:`linear-gradient(135deg,rgba(28,28,34,1),rgba(20,20,24,1))`,border:`1px solid ${C.bdr}`,borderRadius:16,padding:28,marginBottom:24 }}>
          <div style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:24 }}>
            <div style={{ width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${C.royal},${C.orchid},${C.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0 }}>◈</div>
            <div>
              <div style={{ fontSize:20,fontWeight:900,letterSpacing:"-0.4px",marginBottom:6 }}>The Infrastructure Builder</div>
              <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>The person who built the roads before anyone knew they needed them. Not the flashy app developer — the quiet engineer who understood that circular trade was broken at the infrastructure level. They speak with the calm authority of someone who has solved the hard problem. They don't need to sell you on it. The infrastructure speaks for itself.</div>
            </div>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          {[
            { trait:"Infrastructural", col:C.violet, desc:"Thinks in systems, not features. Every sentence is load-bearing. Nothing decorative. The words are the rails." },
            { trait:"Direct",          col:C.green,  desc:"Says exactly what it means in the fewest words. No filler. No warm-up. No 'Hey there!' — just the thing." },
            { trait:"Grounded",        col:C.orange, desc:"The DPP is blockchain-based but we don't say blockchain. The infrastructure is invisible. The outcome is everything." },
            { trait:"Circular-minded", col:C.pink,   desc:"Objects don't have one owner — they have a lifecycle. Every word acknowledges that products outlast transactions." },
            { trait:"Trustworthy",     col:C.green,  desc:"Never makes a claim it can't back with a record. 'Verified' means verified. The proof is always one scan away." },
            { trait:"Quietly bold",    col:C.violet, desc:"Confident enough to use 'infrastructure' in consumer copy. A deliberate choice — it signals seriousness, not complexity." },
          ].map(p => (
            <Card key={p.trait}>
              <div style={{ fontSize:11,fontWeight:900,letterSpacing:"0.04em",color:p.col,marginBottom:8 }}>{p.trait}</div>
              <div style={{ fontSize:12,color:C.dim,lineHeight:1.7 }}>{p.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* 03 PILLARS */}
      <div id="v-pillars" style={{ marginBottom:72 }}>
        <VSecHead n="03" title="Tone Pillars" sub="Four dials — the mix changes by context, but these are always the range"/>
        <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
          {[
            { pillar:"Infrastructure, not platform", col:C.violet, desc:"We are not an app with features. We are the layer underneath trade. Words built to last, not to convert.", do:"Your DPP travels with the product through every owner, forever.", dont:"Our amazing platform helps you sell your stuff with cool blockchain features!" },
            { pillar:"Clear, not technical",         col:C.green,  desc:"The infrastructure is complex. The words should not be. If a sentence needs a glossary, rewrite it.", do:"Scan the tag. See the full ownership history. Buy with confidence.", dont:"The immutable on-chain data persistence layer enables trustless provenance verification." },
            { pillar:"Circular, not transactional",  col:C.orange, desc:"A transaction ends. Circular trade continues. Every word should acknowledge the object will have more life.", do:"This is the third owner. The record carries forward to the next.", dont:"Buy now! Limited stock! Don't miss out on this deal!" },
            { pillar:"Modern, not crypto",           col:C.pink,   desc:"We don't say Web3, blockchain, token, or NFT in consumer copy. Records, proof, and ownership instead.", do:"The record is permanent. Any future owner can verify it.", dont:"Leveraging decentralised blockchain technology to tokenise real-world assets on-chain." },
          ].map(p => (
            <div key={p.pillar} style={{ background:C.d3,border:`1px solid ${C.bdr}`,borderRadius:14,overflow:"hidden" }}>
              <div style={{ background:`${p.col}14`,borderBottom:`1px solid ${C.bdr}`,padding:"12px 18px",fontSize:13,fontWeight:900,color:p.col }}>{p.pillar}</div>
              <div style={{ padding:18 }}>
                <div style={{ fontSize:12,color:C.dim,lineHeight:1.7,marginBottom:14 }}>{p.desc}</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                  <div className="do-card" style={{ padding:"10px 14px" }}>
                    <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.1em",color:C.green,marginBottom:6 }}>✓ DO</div>
                    <div style={{ fontSize:12,fontWeight:700,color:"white",lineHeight:1.6 }}>"{p.do}"</div>
                  </div>
                  <div className="dont-card" style={{ padding:"10px 14px" }}>
                    <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.1em",color:C.pink,marginBottom:6 }}>✗ DON'T</div>
                    <div style={{ fontSize:12,fontWeight:600,color:"#9999b0",lineHeight:1.6 }}>"{p.dont}"</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 04 VOCAB */}
      <div id="v-vocab" style={{ marginBottom:72 }}>
        <VSecHead n="04" title="Vocabulary" sub="Words that are DeStore · words that are not · the term translation guide"/>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",color:C.green,marginBottom:14 }}>✓ In-Vocabulary</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {["Circular trade","Infrastructure","Verified","Provenance","Record","History","Authentic","Ownership","Claim","DPP","Passport","Circulate","Trade","Transfer","Proof","Payment link","Roam","Minted","Pass on","Discover"].map(w => <Word key={w} word={w} color={C.green}/>)}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",color:C.pink,marginBottom:14 }}>✗ Out-of-Vocabulary</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {["Marketplace","Web3","Blockchain","NFT","Token","Crypto","Decentralised","Immutable","Trustless","Platform","Disrupt","Revolutionary","Game-changer","HODL","LFG","Ape in"].map(w => (
                <span key={w} className="word-chip" style={{ borderColor:`${C.pink}40`,textDecoration:"line-through",color:C.muted }}>{w}</span>
              ))}
            </div>
          </Card>
        </div>
        <Card>
          <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:14 }}>Term Translation</div>
          <Tbl heads={["Old / Technical","Say Instead","Context"]} rows={[
            ["marketplace",     "circular trade infrastructure · trade · listing","'We built the infrastructure for circular trade'"],
            ["blockchain",      "the record",                                      "'The record is permanent and public'"],
            ["NFT / token",     "DPP · Digital Product Passport",                 "'Your product's digital identity — minted once, travels forever'"],
            ["minting",         "creating a passport · minted",                   "'A permanent record is created at manufacture'"],
            ["on-chain verify", "verified · confirmed",                            "'Confirmed — it's in the permanent record'"],
            ["wallet",          "your DeStore account",                            "Never mention wallets to consumers"],
            ["transfer",        "trade · pass on · circulate",                     "'Trade this · pass the ownership on'"],
            ["Soneium",         "(never to consumers)",                            "Infrastructure is invisible — users never need the chain name"],
          ]}/>
        </Card>
      </div>

      {/* 05 COPY */}
      <div id="v-copy" style={{ marginBottom:72 }}>
        <VSecHead n="05" title="Copy in Action" sub="Real examples across contexts — all written to circular trade infrastructure positioning"/>
        <div style={{ fontSize:12,fontWeight:800,color:C.violet,marginBottom:14,letterSpacing:"0.04em",textTransform:"uppercase" }}>Product Titles</div>
        <Copy context="Streetwear / Sneakers" color={C.violet} text="Nike Air Max 95 — DS. Size US 10. Byron Bay." note="Condition first. Size. Location. Clean period after. No emoji. No 'marketplace' language."/>
        <Copy context="Luxury / Heritage" color={C.violet} text="Rolex Submariner — Full kit. 2019. Three previous owners. Provenance on record." note="'Provenance on record' is the DPP signal. Circular history is the value."/>
        <Copy context="Electronics" color={C.violet} text="Sony WH-1000XM5 — Excellent condition. Original packaging. Verified." note="'Verified' earns its own sentence. One word, full weight."/>
        <div style={{ fontSize:12,fontWeight:800,color:C.green,marginBottom:14,marginTop:28,letterSpacing:"0.04em",textTransform:"uppercase" }}>Body Copy</div>
        <Copy context="Short form" color={C.green} text="Worn twice. No creasing, no scuffs. Original box and both lace sets included. Size runs true. Selling because I bought the wrong colourway. Full ownership history and DPP transfer on purchase." note="Matter-of-fact. 'Full ownership history' signals circular infrastructure without naming it."/>
        <Copy context="Heritage item" color={C.green} text="Made in Japan, 1987. Two prior owners — both on the record. Original service history attached to the DPP. This object has circulated through four decades. The record has followed it the whole way." note="'Circulated' is circular trade language. 'The record has followed it' — infrastructure as companion."/>
        <div style={{ fontSize:12,fontWeight:800,color:C.orange,marginBottom:14,marginTop:28,letterSpacing:"0.04em",textTransform:"uppercase" }}>UI Microcopy</div>
        <Copy context="DPP chip" color={C.orange} text="◈ Verified" note="Symbol first. No full sentence."/>
        <Copy context="Empty state" color={C.orange} text="Nothing in circulation here yet. Be the first to list." note="'In circulation' is circular trade language dropped naturally."/>
        <Copy context="Listing success" color={C.orange} text="Listed. Your DPP is live and the record is attached." note="Two beats: the action, then the infrastructure proof."/>
        <Copy context="Upload error" color={C.orange} text="That image didn't upload. Try again or choose a different file." note="What happened. What to do. No apology theatre."/>
        <Copy context="Transfer complete" color={C.orange} text="Transferred. The new owner holds the claim — the full history stays intact." note="The continuity of the record is the reassurance."/>
        <Copy context="Payment link" color={C.orange} text="Payment link ready. Share it anywhere — the record is attached." note="'Share it anywhere' signals the infrastructure travels with the link."/>
        <div style={{ fontSize:12,fontWeight:800,color:C.pink,marginBottom:14,marginTop:28,letterSpacing:"0.04em",textTransform:"uppercase" }}>Marketing / Social</div>
        <Copy context="Instagram caption" color={C.pink} text="Found: 1994 Levi's 501 trucker. Two prior owners. Full record on the DPP. Byron Bay. ◈" note="'Full record' not 'blockchain verified'. ◈ is the silent infrastructure signal."/>
        <Copy context="Brand onboarding CTA" color={C.pink} text="Your products have a history. Now they have infrastructure." note="Speaks to brands. 'Infrastructure' signals B2B seriousness."/>
        <Copy context="Seller headline" color={C.pink} text="List it. Verify it. Let it circulate." note="Circular verb in the CTA. Echo of the infrastructure positioning."/>
        <Copy context="B2B pitch line" color={C.pink} text="We built the infrastructure for circular trade. Your products run on it." note="Direct B2B. 'Your products run on it' — we are the rails."/>
      </div>

      {/* 06 CHANNELS */}
      <div id="v-channels" style={{ marginBottom:72 }}>
        <VSecHead n="06" title="Voice by Channel" sub="Same infrastructure, different register"/>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          {[
            { ch:"App UI — Microcopy", col:C.violet, rules:["Ultra-short — every word must earn its pixel. Infrastructure copy is load-bearing, not decorative.","'In circulation' replaces 'listed'. 'Record' replaces 'blockchain'. 'Verified' replaces everything else.","Never exclamation marks. The infrastructure is reliable — it doesn't exclaim.","Errors: what broke → what to do. No apology. The rails are honest about faults."] },
            { ch:"Product Listings", col:C.green, rules:["Titles: Condition · Model · Detail · Location. Clean periods. No emoji.","Body: matter-of-fact, past tense for history, present tense for current state.","DPP: 'provenance on record' · 'history attached' · 'record follows the product' — never 'NFT'.","Circular framing: the next owner is always implied — 'the record travels with it'."] },
            { ch:"Payment Links", col:C.orange, rules:["The payment link is infrastructure — describe it functionally, not as a feature.","'Your payment link is live. Share it anywhere.' — platform-agnostic is the point.","Confirmation: 'Payment received. Ownership transferred. Record updated.' — three beats."] },
            { ch:"Push Notifications", col:C.pink, rules:["One idea per notification — never two things.","Lead with the action or the object, not the context.","Max 40 characters for title, 90 for body.","Time-sensitive: use the deadline, not the urgency adjective."] },
            { ch:"Social Media", col:C.green, rules:["Instagram: copy is context, not caption. Three lines max. ◈ closes posts silently.","'Circulating' is the strong Instagram verb.","LinkedIn/B2B: 'circular trade infrastructure' is the full phrase — use it directly.","Never 'NFT', never 'Web3', never 'blockchain' in any social context."] },
            { ch:"Press / B2B / Investor", col:C.violet, rules:["'DeStore builds the infrastructure layer for circular trade' — one sentence company description.","Here we can reference 'DPP issuance', 'on-chain provenance', 'Soneium' — the audience needs it.","Addressable market: not 'resale marketplace' — 'circular economy infrastructure for physical goods'.","The DPP is the product. The payment link is the mechanism. The record is the proof."] },
          ].map(c => (
            <div key={c.ch} style={{ background:C.d3,border:`1px solid ${C.bdr}`,borderRadius:13,overflow:"hidden" }}>
              <div style={{ background:`${c.col}12`,borderBottom:`1px solid ${C.bdr}`,padding:"12px 18px",fontSize:13,fontWeight:800,color:c.col }}>{c.ch}</div>
              <div style={{ padding:"14px 18px",display:"flex",flexDirection:"column",gap:7 }}>
                {c.rules.map((r,i) => (
                  <div key={i} style={{ display:"flex",gap:10 }}>
                    <span style={{ color:c.col,flexShrink:0,fontSize:12,marginTop:1 }}>→</span>
                    <span style={{ fontSize:12,color:C.dim,lineHeight:1.6 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 07 GRAMMAR */}
      <div id="v-grammar" style={{ marginBottom:72 }}>
        <VSecHead n="07" title="Grammar Rules" sub="10 specifics — apply to all copy in all contexts"/>
        <Card>
          <Tbl heads={["Rule","Detail"]} rows={[
            ["'DeStore' capitalisation","Capital D, capital S, one word. Never 'De Store', 'destore', or 'Destore'."],
            ["'marketplace' is retired","Do not use in any copy — consumer, B2B, or marketing. Replaced by 'circular trade infrastructure' or 'trade'."],
            ["Middle dot · separator","'Built for Circular Trade · Roam Free' — dot mandatory. Never slash, dash, or pipe."],
            ["Full stops always","End every sentence including the last one in a block. Gives copy authority."],
            ["Fragments are fine","'Verified. Listed. Live.' — purposeful economy, not laziness."],
            ["Active voice always","Subject → verb → object. 'The record is live' not 'The record has been made live'."],
            ["No exclamation marks","Never in UI, product, or listing copy. Max one in high-energy marketing only."],
            ["Numbers for specs","'$285', 'Size 10' — never spelled out. Specificity builds trust."],
            ["DPP uppercase","'DPP' is always uppercase. 'blockchain' is always lowercase."],
            ["'Circulate' is a verb","Objects circulate — they don't just 'sell'. Use in listing and marketing copy."],
          ]}/>
        </Card>
      </div>

      {/* 08 NAMING */}
      <div id="v-naming" style={{ marginBottom:72 }}>
        <VSecHead n="08" title="Naming System" sub="How DeStore names features, states, and objects"/>
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["Name","Formal","Note"]} rows={[
            ["DeStore","DeStore","Capital D, capital S, one word. Always."],
            ["Category","Circular Trade Infrastructure","Company descriptor. B2B / press / investor. Not a tagline."],
            ["DPP","Digital Product Passport","Always 'DPP' short form. Never 'NFT', 'token', or 'certificate'."],
            ["Listing","A listing","Not 'post', 'item', 'ad'. A listing."],
            ["Ownership Claim","Claim","Not a token. Not an NFT. 'You hold the claim.'"],
            ["Payment Link","Payment link","Functional and plain. No reinvention needed."],
            ["Transfer","Trade · Transfer · Circulate","'Transfer' mechanical. 'Trade' human. 'Circulate' lifecycle."],
            ["Marketplace","Retired — do not use","Replaced by 'circular trade infrastructure' or 'trade'."],
            ["Zina","Zina","DeStore AI assistant. First name only."],
          ]}/>
        </Card>
        <Sub>Status States</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10 }}>
          {[
            { state:"Live",        col:C.greenAlt, note:"In circulation · listing active" },
            { state:"Verified",    col:C.green,    note:"DPP confirmed and attached" },
            { state:"Pending",     col:C.orange,   note:"Awaiting action or review" },
            { state:"Sold",        col:C.pink,     note:"Transaction complete" },
            { state:"Transferred", col:C.violet,   note:"Ownership claim circulated" },
            { state:"Draft",       col:C.muted,    note:"Not yet in circulation" },
            { state:"Expired",     col:"#c0392b",  note:"Listing period ended" },
            { state:"Minted",      col:C.green,    note:"DPP created on-chain" },
          ].map(s => (
            <div key={s.state} style={{ background:`${s.col}0d`,border:`1px solid ${s.col}28`,borderRadius:10,padding:"10px 12px" }}>
              <div style={{ fontSize:12,fontWeight:900,color:s.col,marginBottom:4 }}>{s.state}</div>
              <div style={{ fontSize:10,color:C.muted,lineHeight:1.5 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 09 AI PROMPT */}
      <div id="v-prompt" style={{ marginBottom:72 }}>
        <VSecHead n="09" title="AI Voice Prompt" sub="Paste into Zina, Claude, or any AI tool for DeStore copy"/>
        <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.3),rgba(10,10,13,1))`,border:`1px solid rgba(179,84,241,.3)`,borderRadius:16,padding:28,marginBottom:20 }}>
          <div className="code">{`<span class="cv">─── DESTORE BRAND VOICE v2.0 ───────────────────────────────────</span>

You are writing copy for DeStore.
Category: <span class="cg">Circular Trade Infrastructure</span>
Primary tagline: <span class="cw">"Built for Circular Trade · Roam Free"</span>

<span class="cv">WHAT DESTORE IS:</span>
  The infrastructure layer that makes circular trade possible.
  Payment links + DPP issuance + ownership claims.
  Not a marketplace. Not a crypto app. The rails underneath trade.

<span class="cv">TONE PILLARS:</span>
  Infrastructure, not platform  — foundational, built to last
  Clear, not technical          — plain language, zero jargon
  Circular, not transactional   — lifecycle thinking, not one-time sale
  Modern, not crypto            — records and proof, not tokens and chains

<span class="cv">VOCABULARY — USE:</span>
  <span class="cg">Circular trade · Infrastructure · Verified · Provenance · Record</span>
  <span class="cg">DPP · Circulate · Trade · Transfer · Proof · Payment link · Roam</span>

<span class="cv">VOCABULARY — NEVER USE:</span>
  <span class="cp">Marketplace · Web3 · Blockchain · NFT · Token · Crypto</span>
  <span class="cp">Decentralised · Immutable · Trustless · Platform · Disrupt</span>

<span class="cv">TERM TRANSLATIONS:</span>
  'marketplace'    → 'circular trade infrastructure' / 'trade' / 'listing'
  'blockchain'     → 'the record'
  'NFT / token'    → 'DPP' or 'Digital Product Passport'
  'wallet'         → 'your DeStore account'
  'Soneium'        → never mention to consumers

<span class="cv">GRAMMAR:</span>
  Full stops always · Fragments fine · Active voice · No exclamation marks
  'DeStore' = capital D + S · 'DPP' uppercase · 'marketplace' is retired

<span class="cv">─── PAGE-SPECIFIC INSTRUCTION ─────────────────────────────────</span>
[DESCRIBE YOUR COPY TASK — context, channel, tone register, audience]`}</div>
        </div>
        <Sub>Quick-Fire Tests</Sub>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          {[
            { prompt:"Push notification for a price drop.", result:"Price drop on your saved Air Max 95. Now $250 — was $285." },
            { prompt:"Success message after DPP is created.", result:"Passport created. The record is live and attached to your listing." },
            { prompt:"One-sentence company description for press.", result:"DeStore builds the infrastructure for circular trade — payment links, Digital Product Passports, and ownership claims that travel with physical goods through every owner." },
            { prompt:"Empty state message for a category.", result:"Nothing in circulation here yet. Be the first to list." },
            { prompt:"B2B headline for a brand partnership pitch.", result:"Your products have a lifecycle. We built the infrastructure for it." },
          ].map((ex,i) => (
            <div key={i} style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <div style={{ background:C.d1,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"12px 14px" }}>
                <div style={{ fontSize:9,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.muted,marginBottom:7 }}>Prompt</div>
                <div style={{ fontSize:12,color:C.dim,lineHeight:1.6 }}>{ex.prompt}</div>
              </div>
              <div style={{ background:`rgba(179,84,241,.05)`,border:`1px solid rgba(179,84,241,.2)`,borderRadius:10,padding:"12px 14px" }}>
                <div style={{ fontSize:9,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.violet,marginBottom:7 }}>Output</div>
                <div style={{ fontSize:13,fontWeight:700,color:"white",lineHeight:1.6 }}>"{ex.result}"</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${C.bdr}`,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
        <div>
          <Logo fill="#ffffff" width={100}/>
          <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>© DeStore Network · Brand Voice Guide v2.0 · March 2026</div>
        </div>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          <Chip color={C.violet}>Circular Trade Infrastructure</Chip>
          <Chip color={C.green}>UI Style Guide v4.0</Chip>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER GUIDE CONTENT
═══════════════════════════════════════════════════════════════ */
function DevGuideContent() {
  return (
    <div className="content-inner" style={{ padding:"52px 56px 140px" }}>
      {/* Hero */}
      <div style={{ marginBottom:72,animation:"fadeUp 0.5s ease" }}>
        <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>DeStore Network</div>
        <h1 style={{ fontSize:48,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.08,marginBottom:16 }}>Developer<br/>Guide</h1>
        <p style={{ fontSize:15,color:C.dim,maxWidth:520,lineHeight:1.75,marginBottom:22 }}>Architecture, tech stack, DPP lifecycle, API patterns, component code, and environment setup. Everything needed to build on or extend DeStore infrastructure.</p>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          <Chip color={C.green}>Soneium · Thirdweb</Chip>
          <Chip color={C.violet}>n8n · Docker</Chip>
          <Chip>Claude API</Chip>
          <Chip color={C.orange}>Cloudflare Tunnel</Chip>
        </div>
      </div>

      {/* 01 ARCHITECTURE */}
      <Sec id="d-arch" n="01" title="Architecture" sub="Two-layer system — Product Record + Ownership Claim">
        <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.4),rgba(106,20,219,.1))`,border:`1px solid rgba(179,84,241,.25)`,borderRadius:16,padding:28,marginBottom:24 }}>
          <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:C.violet,marginBottom:14 }}>Core Principle</div>
          <div style={{ fontSize:17,fontWeight:900,letterSpacing:"-0.3px",lineHeight:1.5,marginBottom:12 }}>Blockchain = notary, not ledger. The DPP mints once. Ownership is a signed database claim.</div>
          <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>The common mistake is putting ownership tokens on-chain. We don't. The blockchain records events (minted, transferred, recycled) — it never holds the ownership state. That lives in the DeStore database as a cryptographically signed claim. This means zero crypto UX for end users while maintaining verifiable provenance.</div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>Layer 1 — Product Record</div>
            <div style={{ fontSize:14,fontWeight:800,color:"white",marginBottom:10 }}>Soneium SBT (Soulbound Token)</div>
            {["Minted once at point of manufacture","Never transfers between wallets","Stores all DPP data: materials, origin, carbon, images","Permanent and public — anyone can scan and verify","No user wallet required to read","Token ID = product identity forever"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:6 }}>
                <span style={{ color:C.violet,flexShrink:0,fontSize:11,marginTop:2 }}>◈</span>
                <span style={{ fontSize:12,color:C.dim,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>Layer 2 — Ownership Claim</div>
            <div style={{ fontSize:14,fontWeight:800,color:"white",marginBottom:10 }}>DeStore DB · Cryptographic Signature</div>
            {["Stored in DeStore database (off-chain)","Cryptographically signed — tamper-evident","New owner receives claim URL → saved to wallet card","No token transfer = no gas, no wallet UX for buyer","Event logged on-chain as notary stamp only","USDC payment triggers automatic claim transfer"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:6 }}>
                <span style={{ color:C.green,flexShrink:0,fontSize:11,marginTop:2 }}>→</span>
                <span style={{ fontSize:12,color:C.dim,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
        </div>
        <Card>
          <Tbl heads={["Layer","What It Is","Who Controls It","User Sees"]} rows={[
            ["Product Record","SBT on Soneium","Immutable — no one","QR scan → product page → DPP data"],
            ["Ownership Claim","Signed DB record","DeStore DB","'You own this' · claim URL · wallet card"],
            ["Event Log","On-chain transaction","Immutable — no one","Not surfaced to users — backend proof"],
            ["Payment","USDC on Soneium","Thirdweb payment link","Pay button → wallet or card → done"],
          ]}/>
        </Card>
      </Sec>

      {/* 02 TECH STACK */}
      <Sec id="d-stack" n="02" title="Tech Stack" sub="Full production stack — every service and why it's there">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          {[
            { cat:"Blockchain", col:C.violet, items:[["Soneium","L2 EVM chain — Sony blockchain. Low fees. Fast finality."],["Thirdweb","Wallet connection + payment links. No custom wallet code."],["USDC","Payment currency. Stablecoin — no crypto volatility UX."]] },
            { cat:"Backend / Automation", col:C.green, items:[["n8n (self-hosted)","All workflow automation at n8n.flowberry.org"],["Cloudflare Tunnel","HTTPS for self-hosted services — zero port forwarding"],["Docker","All services containerised — single docker-compose stack"]] },
            { cat:"Frontend", col:C.orange, items:[["Next.js / React","App Router · single .jsx components · all CSS inline"],["Plus Jakarta Sans","Google Fonts — sole typeface. 400/600/700/800/900."],["Thirdweb SDK","Wallet connect UI only — ConnectButton component"]] },
            { cat:"AI & Media", col:C.pink, items:[["Claude API","claude-sonnet-4-20250514 · Vision + copy + decisions"],["Google Drive","Image storage + n8n file linking"],["Telegram Bot","Zina assistant interface + photo upload workflow"]] },
          ].map(g => (
            <Card key={g.cat}>
              <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:g.col,marginBottom:14 }}>{g.cat}</div>
              {g.items.map(([name,desc]) => (
                <div key={name} style={{ marginBottom:10,paddingBottom:10,borderBottom:`1px solid rgba(46,46,56,.4)` }}>
                  <div style={{ fontSize:13,fontWeight:800,color:"white",marginBottom:3 }}>{name}</div>
                  <div style={{ fontSize:11,color:C.muted,lineHeight:1.5 }}>{desc}</div>
                </div>
              ))}
            </Card>
          ))}
        </div>
        <Sub>Service URLs</Sub>
        <Card>
          <Tbl heads={["Service","URL / Identifier","Notes"]} rows={[
            ["n8n","n8n.flowberry.org","Self-hosted · all automation workflows"],
            ["DeStore app","app.destore.network","Next.js frontend · Vercel or self-hosted"],
            ["Cloudflare Tunnel","Via cloudflared daemon","Routes public HTTPS → localhost services"],
            ["Soneium","RPC: https://rpc.soneium.org","Mainnet L2 · Chain ID 1868"],
            ["Thirdweb","thirdweb.com/chain/1868","SDK + payment links + wallet connect"],
            ["Claude API","api.anthropic.com/v1/messages","claude-sonnet-4-20250514"],
          ]}/>
        </Card>
      </Sec>

      {/* 03 DPP LIFECYCLE */}
      <Sec id="d-dpp" n="03" title="DPP Lifecycle" sub="From manufacture to recycling — the complete record journey">
        <div style={{ display:"flex",flexDirection:"column",gap:0,marginBottom:24 }}>
          {[
            { n:"01", state:"Manufacture", col:C.violet, desc:"Brand/maker triggers DPP creation. n8n workflow calls Thirdweb to mint SBT on Soneium. Metadata includes: product name, SKU, materials, origin country, carbon footprint, images (Google Drive URLs), brand address.", trigger:"n8n webhook POST /mint-dpp" },
            { n:"02", state:"Listing",     col:C.green,  desc:"Seller creates listing. DPP data auto-loaded via QR tag scan. Listing record created in DeStore DB linked to SBT token ID. Payment link generated via Thirdweb.", trigger:"POST /api/listings · links tokenId" },
            { n:"03", state:"Verified",    col:C.green,  desc:"Buyer scans QR tag or views listing. DPP callout banner shows auto-loaded images + material/origin/carbon data sourced from SBT metadata. '◈ Verified' chip displayed.", trigger:"GET /api/dpp/{tokenId} → read SBT" },
            { n:"04", state:"Payment",     col:C.orange, desc:"Buyer completes USDC payment via Thirdweb payment link. Webhook fires on payment confirmation. n8n workflow receives event.", trigger:"Thirdweb webhook → n8n" },
            { n:"05", state:"Transfer",    col:C.blue,   desc:"n8n workflow: (1) creates new signed ownership claim for buyer, (2) logs transfer event on Soneium (event notary only), (3) sends claim URL to buyer via email/Telegram, (4) updates listing status to 'Sold'.", trigger:"n8n auto on payment webhook" },
            { n:"06", state:"Recycle",     col:C.orange, desc:"Owner triggers destroy/recycle action. n8n logs recycling event on-chain. SBT metadata updated with end-of-life record. Ownership claim marked inactive. B&B Treasury receives $0.01.", trigger:"POST /api/dpp/{tokenId}/recycle" },
          ].map((s,i) => (
            <div key={s.n} style={{ display:"flex",gap:0 }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0 }}>
                <div style={{ width:36,height:36,borderRadius:"50%",background:s.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",flexShrink:0,zIndex:1 }}>{s.n}</div>
                {i<5 && <div style={{ width:2,height:40,background:`${s.col}40`,marginTop:0 }}/>}
              </div>
              <div style={{ paddingLeft:20,paddingBottom:i<5?40:0,flex:1 }}>
                <div style={{ fontSize:14,fontWeight:800,color:"white",marginBottom:6 }}>{s.state}</div>
                <div style={{ fontSize:12,color:C.dim,lineHeight:1.7,marginBottom:8 }}>{s.desc}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:s.col,background:`${s.col}10`,border:`1px solid ${s.col}28`,borderRadius:6,padding:"4px 10px",display:"inline-block" }}>{s.trigger}</div>
              </div>
            </div>
          ))}
        </div>
        <Sub>B&B Treasury</Sub>
        <Card>
          <div style={{ fontSize:12,color:C.dim,lineHeight:1.8 }}>
            A dedicated Soneium wallet receives <strong style={{ color:C.green }}>$0.01 USDC</strong> from every transaction DeStore touches — DPP issuance, secondary sale, gift, return, and destroy/recycle. Accumulates USDC now. When DeStore token launches, this becomes the buyback and burn wallet — USDC is used to buy tokens from the open market and burn them. Wallet not yet created or named on-chain.
          </div>
        </Card>
      </Sec>

      {/* 04 API */}
      <Sec id="d-api" n="04" title="API & Webhooks" sub="Key endpoints and n8n webhook patterns">
        <Sub>Core REST Endpoints</Sub>
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["Method","Endpoint","Description"]} rows={[
            ["POST","/api/dpp/mint","Mint new SBT. Body: {name, sku, materials, origin, carbon, images[], brandWallet}"],
            ["GET", "/api/dpp/{tokenId}","Read DPP metadata from SBT. Returns all product fields."],
            ["POST","/api/listings","Create listing. Links tokenId to DeStore listing record."],
            ["GET", "/api/listings/{id}","Get listing with DPP data auto-joined."],
            ["POST","/api/listings/{id}/payment-link","Generate Thirdweb USDC payment link for listing."],
            ["POST","/api/ownership/transfer","Transfer ownership claim. Body: {tokenId, fromAddress, toAddress, paymentTxHash}"],
            ["POST","/api/dpp/{tokenId}/recycle","Log recycle event. Updates metadata, deactivates claim, triggers treasury."],
          ]}/>
        </Card>
        <Sub>n8n Webhook Patterns</Sub>
        <div className="code">{`<span class="cm">// ── Payment received → auto-transfer ownership ──</span>
<span class="cv">Thirdweb webhook</span>  →  <span class="cg">n8n POST /webhook/payment-confirmed</span>
  Body: { paymentId, buyerAddress, listingId, amount, currency }

<span class="cm">// ── n8n workflow steps (Payment Handler) ──</span>
<span class="cb">1.</span> GET /api/listings/{listingId}  <span class="cm">→ get tokenId</span>
<span class="cb">2.</span> POST /api/ownership/transfer    <span class="cm">→ sign new claim for buyer</span>
<span class="cb">3.</span> Soneium tx log (notary event)   <span class="cm">→ on-chain stamp only</span>
<span class="cb">4.</span> Send claim URL to buyer          <span class="cm">→ Telegram / email</span>
<span class="cb">5.</span> PATCH /api/listings/{id} status=sold
<span class="cb">6.</span> B&B Treasury transfer            <span class="cm">→ $0.01 USDC</span>

<span class="cm">// ── DPP mint via Telegram (Digi Diggers pattern) ──</span>
<span class="cv">Telegram photo</span>  →  <span class="cg">n8n Telegram trigger</span>
  Download photo  →  base64 encode
  POST Claude Vision API  →  extract product fields (20+ JSON fields)
  POST /api/dpp/mint  →  SBT minted
  POST Google Sheets  →  log record
  Reply to Telegram   →  "Passport created ◈"`}</div>
        <Sub>Claude Vision API — DPP Extraction Pattern</Sub>
        <div className="code">{`<span class="cm">// Code node in n8n — build Claude request with base64 image</span>
const response = await <span class="cb">fetch</span>(<span class="cg">'https://api.anthropic.com/v1/messages'</span>, {
  method: <span class="cg">'POST'</span>,
  headers: {
    <span class="cg">'x-api-key'</span>: process.env.<span class="cv">ANTHROPIC_API_KEY</span>,
    <span class="cg">'anthropic-version'</span>: <span class="cg">'2023-06-01'</span>,
    <span class="cg">'content-type'</span>: <span class="cg">'application/json'</span>,
  },
  body: <span class="cb">JSON.stringify</span>({
    model: <span class="cg">'claude-sonnet-4-20250514'</span>,
    max_tokens: <span class="co">1000</span>,
    messages: [{
      role: <span class="cg">'user'</span>,
      content: [
        { type: <span class="cg">'image'</span>, source: { type: <span class="cg">'base64'</span>, media_type: <span class="cg">'image/jpeg'</span>, data: base64Image } },
        { type: <span class="cg">'text'</span>, text: DPP_EXTRACTION_PROMPT }  <span class="cm">// returns JSON</span>
      ]
    }]
  })
});
<span class="cm">// Parse response.content[0].text as JSON → DPP fields</span>`}</div>
      </Sec>

      {/* 05 DESIGN TOKENS */}
      <Sec id="d-tokens" n="05" title="Design Tokens" sub="Copy-paste ready — the C object and all CSS variables">
        <Sub>JavaScript Token Object</Sub>
        <div className="code">{`<span class="cm">// Brand tokens — paste into any DeStore component</span>
const <span class="cv">C</span> = {
  <span class="cm">// Official brand colours</span>
  black: <span class="cg">"#000000"</span>,  royal:   <span class="cg">"#321B68"</span>,  pink:    <span class="cg">"#FF1B9A"</span>,
  orange: <span class="cg">"#FF9F46"</span>, elViolet:<span class="cg">"#6200E9"</span>,  <span class="cm">// light/print ONLY</span>

  <span class="cm">// App UI extension tokens</span>
  orchid: <span class="cg">"#6A14DB"</span>,  violet:  <span class="cg">"#B354F1"</span>,
  green:  <span class="cg">"#28B79D"</span>,  greenAlt:<span class="cg">"#2FB457"</span>,  fb: <span class="cg">"#1877F2"</span>,

  <span class="cm">// Dark surface scale</span>
  d0: <span class="cg">"#0a0a0d"</span>,  d1: <span class="cg">"#0d0d10"</span>,  d2: <span class="cg">"#141418"</span>,
  d3: <span class="cg">"#1c1c22"</span>,  d4: <span class="cg">"#26262e"</span>,

  <span class="cm">// Utility</span>
  bdr:    <span class="cg">"#2e2e38"</span>,  muted: <span class="cg">"#6b6b80"</span>,  dim: <span class="cg">"#9999b0"</span>,
};`}</div>
        <Sub>CSS Custom Properties</Sub>
        <div className="code">{`:root {
  <span class="cv">--royal</span>:    <span class="cg">#321B68</span>;  <span class="cv">--orchid</span>:  <span class="cg">#6A14DB</span>;  <span class="cv">--violet</span>: <span class="cg">#B354F1</span>;
  <span class="cv">--pink</span>:     <span class="cg">#FF1B9A</span>;  <span class="cv">--orange</span>:  <span class="cg">#FF9F46</span>;  <span class="cv">--green</span>:  <span class="cg">#28B79D</span>;
  <span class="cv">--green-alt</span>:<span class="cg">#2FB457</span>;  <span class="cv">--fb-blue</span>: <span class="cg">#1877F2</span>;
  <span class="cv">--d0</span>: <span class="cg">#0a0a0d</span>;  <span class="cv">--d1</span>: <span class="cg">#0d0d10</span>;  <span class="cv">--d2</span>: <span class="cg">#141418</span>;
  <span class="cv">--d3</span>: <span class="cg">#1c1c22</span>;  <span class="cv">--d4</span>: <span class="cg">#26262e</span>;  <span class="cv">--bdr</span>:<span class="cg">#2e2e38</span>;
}`}</div>
      </Sec>

      {/* 06 CONIC BORDER */}
      <Sec id="d-conic" n="06" title="Conic Border" sub="The DeStore active/selected state — complete implementation">
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["Property","Button","Price Badge","Note"]} rows={[
            ["Speed","2.5s","2.0s","Different — distinguishable at a glance"],
            ["Outer border-radius","13px","10px","Badge is slightly tighter"],
            ["Inner border-radius","11px","8px","2px less than outer always"],
            ["Padding","1.5px","2px","Badge slightly thicker ring"],
            ["Inner background","#26262e (dark4)","#1c1e21","Badge matches card bg exactly"],
            ["Ring gradient","violet only sweep","Full brand sweep","Badge is more colourful"],
            ["Usage","Active/focused inputs, selected cards","Price display only","One badge per card max"],
          ]}/>
        </Card>
        <Sub>Button / Input Conic Border</Sub>
        <div className="code">{`<span class="cv">@property</span> --angle { syntax: <span class="cg">'<angle>'</span>; initial-value: <span class="co">0deg</span>; inherits: <span class="cb">false</span>; }
<span class="cb">@keyframes</span> spin-border { to { --angle: <span class="co">360deg</span>; } }

<span class="cw">.conic-wrap</span> {
  position: <span class="cb">relative</span>;
  border-radius: <span class="co">13px</span>;
  padding: <span class="co">1.5px</span>;
  background: <span class="cb">conic-gradient</span>(from <span class="cv">var(--angle, 0deg)</span>,
    <span class="cv">#B354F1</span>, <span class="cv">#6a14db</span>, <span class="cb">#00c8ff</span>,
    <span class="cv">#B354F1 40%</span>, <span class="cv">#321b68 60%</span>, <span class="cv">#B354F1</span>);
  animation: spin-border <span class="co">2.5s</span> linear infinite; <span class="cm">/* NEVER change 2.5s */</span>
}
<span class="cw">.conic-inner</span> {
  background: <span class="cv">#26262e</span>; <span class="cm">/* dark4 — match input bg */</span>
  border-radius: <span class="co">11px</span>;   <span class="cm">/* outer - 2px always */</span>
}`}</div>
        <Sub>Price Badge (V1 Gradient)</Sub>
        <div className="code">{`<span class="cv">@property</span> --pb1 { syntax: <span class="cg">'<angle>'</span>; initial-value: <span class="co">0deg</span>; inherits: <span class="cb">false</span>; }
<span class="cb">@keyframes</span> spin-pb1 { to { --pb1: <span class="co">360deg</span>; } }

<span class="cw">.price-badge</span> {
  position: <span class="cb">relative</span>;
  border-radius: <span class="co">10px</span>;
  padding: <span class="co">2px</span>;
  display: <span class="cb">inline-block</span>;
  background: <span class="cb">conic-gradient</span>(from <span class="cv">var(--pb1, 0deg)</span>,
    <span class="cv">#B354F1</span>, <span class="cv">#6A14DB</span>, <span class="cb">#00C8FF</span>, <span class="cv">#28B79D</span>, <span class="co">#FF9F46</span>,
    <span class="cv">#B354F1 40%</span>, <span class="cv">#321B68 60%</span>, <span class="cv">#B354F1</span>);
  animation: spin-pb1 <span class="co">2s</span> linear infinite; <span class="cm">/* ALWAYS 2s — never change */</span>
}
<span class="cw">.price-badge-inner</span> {
  background: <span class="cb">#1c1e21</span>; <span class="cm">/* must match card bg — creates floating ring */</span>
  border-radius: <span class="co">8px</span>;   <span class="cm">/* outer - 2px */</span>
  padding: <span class="co">9px 20px</span>;
}
<span class="cw">.price-text</span> {
  background: <span class="cb">linear-gradient</span>(<span class="co">135deg</span>, <span class="cv">#28B79D</span>, <span class="cv">#B354F1</span>, <span class="co">#FF9F46</span>);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: <span class="co">28px</span>; font-weight: <span class="co">900</span>; letter-spacing: <span class="co">-0.8px</span>;
}`}</div>
      </Sec>

      {/* 07 PAYMENT LINKS */}
      <Sec id="d-payment" n="07" title="Payment Links" sub="How Thirdweb payment links work in the DeStore flow">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>What a payment link is</div>
            {["A Thirdweb-generated URL tied to a USDC amount and recipient wallet","Shareable anywhere — FB post, DM, email, QR, SMS","No DeStore app required to pay — link opens in any browser","Buyer pays with credit card OR crypto wallet (Thirdweb handles both)","On payment: Thirdweb fires webhook → n8n → ownership transfer"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:6 }}>
                <span style={{ color:C.green,flexShrink:0,fontSize:11,marginTop:2 }}>→</span>
                <span style={{ fontSize:12,color:C.dim,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>DeStore adds</div>
            {["DPP record attached to every payment link","Ownership claim transfer auto-runs on payment confirm","$0.01 to B&B Treasury on every completed payment","Listing status updated to Sold automatically","Seller receives notification via Telegram/email","Full transaction logged to DeStore DB and on-chain notary"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:6 }}>
                <span style={{ color:C.violet,flexShrink:0,fontSize:11,marginTop:2 }}>◈</span>
                <span style={{ fontSize:12,color:C.dim,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
        </div>
        <Sub>Generate Payment Link — n8n HTTP Node</Sub>
        <div className="code">{`<span class="cm">// POST to Thirdweb create payment link</span>
POST <span class="cg">https://api.thirdweb.com/v1/pay/links</span>
Headers: { <span class="cg">"x-client-id"</span>: process.env.<span class="cv">THIRDWEB_CLIENT_ID</span> }
Body: {
  <span class="cg">"amount"</span>:    <span class="co">"285"</span>,
  <span class="cg">"currency"</span>:  <span class="cg">"USDC"</span>,
  <span class="cg">"chainId"</span>:   <span class="co">1868</span>,         <span class="cm">// Soneium mainnet</span>
  <span class="cg">"recipient"</span>: sellerWallet,
  <span class="cg">"metadata"</span>:  { <span class="cg">"listingId"</span>: id, <span class="cg">"tokenId"</span>: dppTokenId }
}
Response: { <span class="cg">"link"</span>: <span class="cg">"https://pay.thirdweb.com/..."</span> }`}</div>
      </Sec>

      {/* 08 N8N */}
      <Sec id="d-n8n" n="08" title="n8n Workflows" sub="Key automation patterns — self-hosted at n8n.flowberry.org">
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["Workflow","Trigger","Key Steps"]} rows={[
            ["Payment Handler","Thirdweb webhook","Get listing → create ownership claim → log on-chain → notify buyer → update status → B&B $0.01"],
            ["DPP Mint (Manual)","n8n form / HTTP","Collect product data → call Thirdweb mint → store tokenId → link to listing"],
            ["Digi Diggers Photo","Telegram photo message","Download photo → base64 → Claude Vision → extract DPP fields → mint SBT → Google Sheets"],
            ["Listing Auto-Post","New listing created","Format listing → generate payment link → post to FB Marketplace → notify seller"],
            ["Tax Evidence Linker","Manual trigger","Search Google Drive → match files to spreadsheet rows → attach links"],
            ["Zina AI Assistant","Telegram message","Parse intent → route to correct workflow/API → execute → reply"],
          ]}/>
        </Card>
        <Sub>Zina Workflow Router Pattern</Sub>
        <div className="code">{`<span class="cm">// Telegram message → Claude intent classification → route</span>
<span class="cb">Telegram Trigger</span> → <span class="cv">Claude API</span> (classify intent)
  Prompt: "Classify this message into one of:
    mint_dpp | create_listing | check_status | send_payment_link |
    query_inventory | general_question
    Return JSON: { intent, params }"

<span class="cb">Switch node</span> on intent:
  <span class="cg">mint_dpp</span>        → DPP Mint workflow
  <span class="cg">create_listing</span>  → Listing workflow
  <span class="cg">send_payment_link</span>→ Payment Link workflow
  <span class="cg">*</span>               → Claude general reply → Telegram send`}</div>
      </Sec>

      {/* 09 DOCKER */}
      <Sec id="d-docker" n="09" title="Docker & Environment" sub="Self-hosted stack — docker-compose reference">
        <Sub>docker-compose.yml (key services)</Sub>
        <div className="code">{`version: <span class="cg">'3.8'</span>
services:

  n8n:
    image: <span class="cg">n8nio/n8n:latest</span>
    ports: [<span class="cg">"5678:5678"</span>]
    environment:
      N8N_HOST: <span class="co">n8n.flowberry.org</span>
      WEBHOOK_URL: <span class="cg">https://n8n.flowberry.org</span>
      N8N_ENCRYPTION_KEY: <span class="cp">${'{'}N8N_ENCRYPTION_KEY{'}'}</span>
      ANTHROPIC_API_KEY: <span class="cp">${'{'}ANTHROPIC_API_KEY{'}'}</span>
      THIRDWEB_CLIENT_ID: <span class="cp">${'{'}THIRDWEB_CLIENT_ID{'}'}</span>
    volumes: [n8n_data:/home/node/.n8n]

  cloudflared:
    image: <span class="cg">cloudflare/cloudflared:latest</span>
    command: tunnel --no-autoupdate run
    environment:
      TUNNEL_TOKEN: <span class="cp">${'{'}CLOUDFLARE_TUNNEL_TOKEN{'}'}</span>

  destore-app:
    build: ./destore-web
    ports: [<span class="cg">"3000:3000"</span>]
    environment:
      NEXT_PUBLIC_THIRDWEB_CLIENT_ID: <span class="cp">${'{'}THIRDWEB_CLIENT_ID{'}'}</span>
      SONEIUM_RPC_URL: <span class="cg">https://rpc.soneium.org</span>
      DATABASE_URL: <span class="cp">${'{'}DATABASE_URL{'}'}</span>

volumes:
  n8n_data:`}</div>
        <Sub>Required Environment Variables</Sub>
        <Card>
          <Tbl heads={["Variable","Service","Notes"]} rows={[
            ["ANTHROPIC_API_KEY","n8n / backend","Claude API — Vision + copy + Zina decisions"],
            ["THIRDWEB_CLIENT_ID","n8n / frontend","Payment links + wallet connect"],
            ["THIRDWEB_SECRET_KEY","n8n backend only","Never expose to frontend"],
            ["CLOUDFLARE_TUNNEL_TOKEN","cloudflared","From Cloudflare Zero Trust dashboard"],
            ["N8N_ENCRYPTION_KEY","n8n","Credentials encryption — generate once, never change"],
            ["DATABASE_URL","backend","DeStore DB — Postgres recommended"],
            ["TELEGRAM_BOT_TOKEN","n8n","Zina Telegram bot"],
            ["GOOGLE_DRIVE_CREDENTIALS","n8n","Service account JSON for Drive access"],
          ]}/>
        </Card>
      </Sec>

      {/* 10 ZINA */}
      <Sec id="d-zina" n="10" title="Zina Integration" sub="DeStore AI assistant — autonomous system operator via Telegram">
        <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.3),rgba(10,10,13,1))`,border:`1px solid rgba(179,84,241,.3)`,borderRadius:16,padding:28,marginBottom:24 }}>
          <div style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:20 }}>
            <div style={{ width:56,height:56,borderRadius:"50%",background:`linear-gradient(135deg,${C.orchid},${C.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>◈</div>
            <div>
              <div style={{ fontSize:18,fontWeight:900,marginBottom:6 }}>Zina</div>
              <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>DeStore's AI assistant. Accesses the full product suite as one system — n8n workflows, DPP platform, and DeStore Marketplace. Builds, tests, maintains and updates all three autonomously via Telegram. No code editing required.</div>
            </div>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24 }}>
          {[
            { sys:"n8n.flowberry.org", col:C.green,  cap:"Workflows",  desc:"Trigger, modify, and monitor all n8n automation workflows" },
            { sys:"DPP Platform",      col:C.violet, cap:"Passports",  desc:"Mint DPPs, read SBT metadata, manage product records" },
            { sys:"DeStore Marketplace",col:C.orange,cap:"Listings",   desc:"Create listings, generate payment links, sync FB Marketplace" },
          ].map(s => (
            <Card key={s.sys}>
              <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:s.col,marginBottom:8 }}>{s.cap}</div>
              <div style={{ fontSize:13,fontWeight:700,color:"white",marginBottom:6 }}>{s.sys}</div>
              <div style={{ fontSize:11,color:C.muted,lineHeight:1.5 }}>{s.desc}</div>
            </Card>
          ))}
        </div>
        <Sub>Zina System Prompt (abbreviated)</Sub>
        <div className="code">{`<span class="cv">─── ZINA SYSTEM PROMPT ────────────────────────────────────────</span>

You are <span class="cg">Zina</span>, DeStore's AI assistant.
You have access to three systems via MCP/tools:
  <span class="cv">1.</span> n8n.flowberry.org      — all workflow automation
  <span class="cv">2.</span> DeStore DPP platform    — product passport records
  <span class="cv">3.</span> DeStore Marketplace     — listings + payment links

You operate these systems <span class="co">autonomously</span> on Josiah's behalf.
You never ask for confirmation on routine tasks.
You always report what you did and the outcome.
You speak in DeStore brand voice (see Voice Guide v2.0).
You never use crypto jargon to the user.

On receiving a Telegram message:
  <span class="cb">1.</span> Classify intent
  <span class="cb">2.</span> Execute via appropriate system tool
  <span class="cb">3.</span> Reply with result in plain language
  <span class="cb">4.</span> Log action to workflow history

<span class="cv">─── END SYSTEM PROMPT ─────────────────────────────────────────</span>`}</div>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${C.bdr}`,marginTop:80,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div>
            <Logo fill="#ffffff" width={100}/>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>© DeStore Network · Developer Guide v1.0 · March 2026</div>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <Chip color={C.green}>Soneium · Thirdweb · n8n</Chip>
            <Chip color={C.violet}>Claude API · Docker</Chip>
            <Chip color={C.orange}>Circular Trade Infrastructure</Chip>
          </div>
        </div>
      </Sec>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN — Tabbed Shell
═══════════════════════════════════════════════════════════════ */
export default function DeStoreDocs() {
  const [tab, setTab] = useState("style");
  const [activeNav, setActiveNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  const TABS = [
    { id:"style", label:"Style Guide",     icon:"◈", nav:NAV_STYLE },
    { id:"voice", label:"Voice Guide",     icon:"✦", nav:NAV_VOICE },
    { id:"dev",   label:"Developer Guide", icon:"⚡", nav:NAV_DEV   },
    { id:"ux",    label:"UI/UX Guide",     icon:"⬡", nav:NAV_UX    },
  ];

  const currentNav = TABS.find(t => t.id === tab)?.nav || NAV_STYLE;

  const scrollTo = (id) => {
    setActiveNav(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  // Reset scroll and nav on tab switch
  const switchTab = (id) => {
    setTab(id);
    setActiveNav(null);
    setSidebarOpen(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const TAB_COLORS = { style:C.violet, voice:C.pink, dev:C.green, ux:C.orange };

  return (
    <div style={{ minHeight:"100vh", background:C.d0, fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#fff" }}>
      <style>{CSS}</style>

      {/* ══ TOPBAR ══ */}
      <div style={{
        position:"sticky", top:0, zIndex:300,
        background:`${C.d1}f4`, backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.bdr}`,
      }}>
        {/* Logo row */}
        <div className="topbar-logo-row" style={{ padding:"10px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* Hamburger — mobile only */}
            <button className="ham-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
            <Logo fill="#ffffff" width={130}/>
            <div className="topbar-title-chip" style={{ width:1, height:18, background:C.bdr }}/>
            <span className="topbar-title-chip" style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted }}>Brand Handbook</span>
          </div>
          <div className="topbar-version-chips" style={{ display:"flex", gap:8 }}>
            <Chip color={C.violet}>v4.0</Chip>
            <Chip color={C.green}>Circular Trade Infrastructure</Chip>
          </div>
        </div>
        {/* Tab bar */}
        <div className="tab-bar" style={{ paddingLeft:24, display:"flex", gap:0, borderTop:`1px solid rgba(46,46,56,.4)`, marginTop:8 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tab-btn${tab===t.id?" on":""}`}
              style={{ borderBottomColor: tab===t.id ? TAB_COLORS[t.id] : "transparent" }}
              onClick={() => switchTab(t.id)}
            >
              <div className="tab-dot" style={{ background: tab===t.id ? TAB_COLORS[t.id] : undefined, boxShadow: tab===t.id ? `0 0 8px ${TAB_COLORS[t.id]}80` : undefined }}/>
              <span className="tab-icon" style={{ fontSize:13 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:"flex" }}>

        {/* Backdrop overlay — mobile only */}
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ══ SIDEBAR ══ */}
        <aside className={`sidebar-panel${sidebarOpen ? " open" : ""}`} style={{
          width:220, flexShrink:0, position:"sticky", top:89,
          height:"calc(100vh - 89px)", overflowY:"auto",
          background:C.d1, borderRight:`1px solid ${C.bdr}`,
          paddingTop:20, paddingBottom:40,
        }}>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, padding:"0 18px 12px" }}>
            {TABS.find(t=>t.id===tab)?.label}
          </div>
          {currentNav.map(n => (
            <button
              key={n.id}
              className={`nav-btn${activeNav===n.id?" active":""}`}
              style={{ borderLeftColor: activeNav===n.id ? TAB_COLORS[tab] : "transparent", color: activeNav===n.id ? TAB_COLORS[tab] : undefined, background: activeNav===n.id ? `${TAB_COLORS[tab]}10` : undefined }}
              onClick={() => scrollTo(n.id)}
            >
              <div className="nav-dot" style={{ background: activeNav===n.id ? TAB_COLORS[tab] : undefined, boxShadow: activeNav===n.id ? `0 0 7px ${TAB_COLORS[tab]}` : undefined }}/>
              {n.label}
            </button>
          ))}

          {/* Bottom badge */}
          <div style={{ padding:"24px 18px 0", display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative",borderRadius:10,padding:2,display:"inline-block",background:`conic-gradient(from var(--pb1,0deg),#B354F1,#6A14DB,#00C8FF,#28B79D,#FF9F46,#B354F1 40%,#321B68 60%,#B354F1)`,animation:"spin-pb1 2s linear infinite" }}>
              <div style={{ background:"#1c1e21",borderRadius:8,padding:"6px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:1 }}>
                <span style={{ fontSize:11,fontWeight:900,letterSpacing:"-0.3px",background:"linear-gradient(135deg,#28B79D,#B354F1,#FF9F46)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>◈ DPP</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main
          className="main-content"
          ref={mainRef}
          style={{ flex:1, overflowY:"auto", height:"calc(100vh - 89px)" }}
          onScroll={() => {
            for (let i=currentNav.length-1; i>=0; i--) {
              const el = document.getElementById(currentNav[i].id);
              if (el && el.getBoundingClientRect().top < 160) {
                setActiveNav(currentNav[i].id);
                break;
              }
            }
          }}
        >
          {tab==="style" && <StyleGuideContent/>}
          {tab==="voice" && <VoiceGuideContent/>}
          {tab==="dev"   && <DevGuideContent/>}
          {tab==="ux"    && <UiUxGuideContent/>}
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UI/UX GUIDE — SUB-COMPONENTS (PriceBadge + ButtonLab helpers)
═══════════════════════════════════════════════════════════════ */

/* Hidden SVG filter for liquid distortion */
const LiquidFilter = () => (
  <svg style={{ position:"absolute",width:0,height:0,overflow:"hidden" }}>
    <defs>
      <filter id="liquid-distort">
        <feTurbulence type="fractalNoise" baseFrequency="0.014 0.009" numOctaves="3" seed="4" result="noise">
          <animate attributeName="baseFrequency" values="0.014 0.009;0.02 0.014;0.014 0.009" dur="5s" repeatCount="indefinite"/>
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  </svg>
);

/* Button with tooltip (UX lab) */
const BtnWrap = ({ children, label, hex, isNew, fixed, notes }) => {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10,position:"relative" }}>
      <div style={{ position:"relative",display:"inline-block" }}
        onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        {children}
        {hover && (
          <div className="btn-tooltip">
            {hex && <span style={{ fontFamily:"'JetBrains Mono',monospace",color:C.violet }}>{hex} </span>}
            {notes}
          </div>
        )}
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:11,fontWeight:700,color:"white" }}>
          {label}
          {isNew && <span className="badge-new">★ NEW</span>}
          {fixed && <span className="compliance-fix">✓ FIXED</span>}
        </div>
      </div>
    </div>
  );
};

/* Chrome style builder */
const chromeStyle = (stops, shadow, border, extra={}) => ({
  background:`linear-gradient(135deg,${stops})`,
  backgroundSize:"250% 250%",
  animation:"chrome-shift 3s ease infinite",
  border:`1.5px solid ${border}`,
  borderRadius:14, padding:"13px 22px", color:"#fff",
  fontSize:13, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif",
  letterSpacing:"0.02em", cursor:"pointer",
  boxShadow:`${shadow}, inset 0 1px 0 rgba(255,255,255,.25)`,
  textShadow:"0 1px 3px rgba(0,0,0,.5)",
  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7,
  position:"relative", overflow:"hidden", whiteSpace:"nowrap",
  ...extra,
});

/* Viewers (social proof) */
const Viewers = ({ count, colors }) => (
  <div className="viewer-row">
    <div className="v-avatars">
      {colors.map((col,i) => (
        <div key={i} className="v-avatar" style={{ background:col, marginLeft:i===0?0:-5 }}>
          {["👤","🧑","👩"][i]}
        </div>
      ))}
    </div>
    <span><strong style={{ color:"white" }}>{count}</strong> people viewing now</span>
  </div>
);

/* Live counter */
const LiveCount = ({ label, value, color }) => {
  const [n, setN] = useState(value);
  useEffect(()=>{
    const t=setInterval(()=>{
      if(Math.random()>.7) setN(v=>Math.max(1,v+(Math.random()>.5?1:-1)));
    },3200);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div style={{ display:"flex",alignItems:"center",gap:6 }}>
      <div className="urgent-dot" style={{ background:color }}/>
      <span style={{ fontSize:11,fontWeight:700,color:"#9999b0" }}>
        <strong style={{ color }}>{n}</strong> {label}
      </span>
    </div>
  );
};

/* Stock bar */
const StockBar = ({ pct, label }) => (
  <div style={{ width:"100%",display:"flex",flexDirection:"column",gap:5 }}>
    <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,fontWeight:700 }}>
      <span style={{ color:C.muted }}>In circulation</span>
      <span style={{ color:pct>70?C.pink:C.dim }}>{label}</span>
    </div>
    <div className="sold-bar"><div className="sold-fill" style={{ width:`${pct}%` }}/></div>
  </div>
);

/* Countdown timer */
const CountTimer = ({ label, seconds:initSec }) => {
  const [sec,setSec]=useState(initSec);
  useEffect(()=>{
    const t=setInterval(()=>setSec(s=>Math.max(0,s-1)),1000);
    return ()=>clearInterval(t);
  },[]);
  const fmt = n=>String(n).padStart(2,"0");
  const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
      <div style={{ fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.06em" }}>{label}</div>
      <div style={{ display:"flex",gap:4,alignItems:"center" }}>
        {[fmt(h),fmt(m),fmt(s)].map((v,i)=>(
          <span key={i} style={{ display:"flex",alignItems:"center",gap:4 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:700,color:C.orange,background:C.d3,border:`1px solid ${C.bdr}`,borderRadius:6,padding:"4px 8px",minWidth:34,textAlign:"center" }}>{v}</span>
            {i<2 && <span style={{ color:C.orange,fontWeight:900,fontSize:16 }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

/* UX section header */
const UxSec = ({ id, n, title, sub, children }) => (
  <section id={id} style={{ marginBottom:72,animation:"fadeUp .4s ease" }}>
    <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:28,paddingBottom:16,borderBottom:`1px solid ${C.bdr}` }}>
      <div style={{ width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},#1a9a84)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,flexShrink:0,boxShadow:`0 0 18px rgba(40,183,157,.4)` }}>{n}</div>
      <div>
        <div style={{ fontSize:21,fontWeight:900,letterSpacing:"-0.3px" }}>{title}</div>
        {sub && <div style={{ fontSize:12,color:C.dim,marginTop:3 }}>{sub}</div>}
      </div>
    </div>
    {children}
  </section>
);

/* Button grid label */
const BtnGrid = ({ children }) => (
  <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:24,alignItems:"start",marginBottom:28 }}>
    {children}
  </div>
);

/* Inline code badge */
const CodeTag = ({ children, color=C.violet }) => (
  <code style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color,background:`${color}12`,border:`1px solid ${color}28`,borderRadius:4,padding:"1px 6px" }}>{children}</code>
);

/* ═══════════════════════════════════════════════════════════════
   UI/UX GUIDE CONTENT COMPONENT
═══════════════════════════════════════════════════════════════ */
function UiUxGuideContent() {
  const btnBase = (bg, sh, bd) => ({
    background:bg, border:`1.5px solid ${bd}`, borderRadius:14,
    padding:"13px 22px", color:"#fff", fontSize:13, fontWeight:800,
    fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"0.02em",
    boxShadow:sh, display:"inline-flex", alignItems:"center",
    justifyContent:"center", gap:7, position:"relative",
    overflow:"hidden", whiteSpace:"nowrap", cursor:"pointer",
  });

  return (
    <div className="content-inner" style={{ padding:"52px 56px 140px" }}>
      <LiquidFilter/>

      {/* Hero */}
      <div style={{ marginBottom:72,animation:"fadeUp .5s ease" }}>
        <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>DeStore Network</div>
        <h1 style={{ fontSize:48,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.08,marginBottom:16 }}>UI / UX<br/>Guide</h1>
        <p style={{ fontSize:15,color:C.dim,maxWidth:560,lineHeight:1.75,marginBottom:22 }}>Advanced component patterns, Nova Wallet-grade motion, every button variant with pre-written scripts, the full price badge system, and mobile UI rules. Build DeStore UI without guessing.</p>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          <Chip color={C.green}>Nova Wallet benchmark</Chip>
          <Chip color={C.violet}>Liquid chrome · Blob · Distortion</Chip>
          <Chip color={C.orange}>Ready-to-paste scripts</Chip>
          <Chip color={C.pink}>Compliance-checked</Chip>
        </div>
      </div>

      {/* ═══════════════════════════════════
          00 · COMPLIANCE AUDIT
      ═══════════════════════════════════ */}
      <UxSec id="ux-audit" n="00" title="Compliance Audit" sub="What was found · what was fixed · why it matters — both source files checked against Style Guide v4.0 and Voice Guide v2.0">
        <div style={{ background:`linear-gradient(135deg,rgba(40,183,157,.08),rgba(10,10,13,1))`,border:`1px solid rgba(40,183,157,.3)`,borderRadius:16,padding:24,marginBottom:24 }}>
          <div style={{ fontSize:12,fontWeight:800,color:C.green,marginBottom:12,letterSpacing:"0.04em",textTransform:"uppercase" }}>All content embedded here is post-audit. Violations corrected before display.</div>
          <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>Both source files (ButtonLab + PriceBadges) were created before the brand positioning pivot to <strong style={{ color:"white" }}>Circular Trade Infrastructure</strong> and the retirement of "marketplace" as a vocabulary term. The audit below documents every violation found and the exact fix applied. No original violations appear in this guide.</div>
        </div>

        <Sub>ButtonLab — Violations Found & Fixed</Sub>
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["#","Location","Violation","Fix Applied","Why"]} rows={[
            ["1","Button label (×6)","'Post to Marketplace'","→ 'Create Listing' · 'List it.' · 'Circulate ◈'","'marketplace' is a retired word per Voice Guide v2.0 — DeStore is circular trade infrastructure, not a marketplace venue"],
            ["2","Topbar","Plain text 'DeStore' — no real SVG logo","→ Logo SVG component (shared, real paths)","Style Guide v4.0 §01: all digital UI must use the official Illustrator-exported SVG paths. Never text placeholders."],
            ["3","Section framing","No circular trade infrastructure language","→ Context notes added to each section","All copy should position buttons within the circular trade infrastructure frame, not generic ecommerce"],
            ["4","Disabled button","Label 'Post to Marketplace'","→ 'Create Listing'","Consistent label across active and disabled states"],
          ]}/>
        </Card>

        <Sub>PriceBadges — Violations Found & Fixed</Sub>
        <Card>
          <Tbl heads={["#","Location","Violation","Fix Applied","Why"]} rows={[
            ["1","Topbar","Plain text 'DeStore' — no real SVG logo","→ Logo SVG component (shared)","Style Guide v4.0 §01: real SVG always"],
            ["2","Section framing","No circular trade language","→ Context copy updated","The price badge is the motion signature of circular trade infrastructure — the framing should reflect this"],
            ["3","Stock bar label","'Only 1 left'","→ 'Only 1 in circulation'","Circular trade framing: objects circulate, they don't just run out of stock"],
            ["4","DPP row","'◈ DPP Verified · Authentic'","→ '◈ DPP Verified · Provenance on record'","'Provenance on record' is approved vocabulary (Voice Guide §04). 'Authentic' is not wrong but 'provenance on record' is stronger circular trade language."],
          ]}/>
        </Card>
      </UxSec>

      {/* ═══════════════════════════════════
          01 · MOTION LANGUAGE
      ═══════════════════════════════════ */}
      <UxSec id="ux-motion" n="01" title="Motion Language" sub="Nova Wallet-grade animation principles — every timing, easing, and trigger defined">
        <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.3),rgba(10,10,13,1))`,border:`1px solid rgba(179,84,241,.25)`,borderRadius:16,padding:24,marginBottom:24 }}>
          <div style={{ fontSize:13,fontWeight:800,color:"white",marginBottom:10 }}>Core principle</div>
          <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>Motion in DeStore is load-bearing, not decorative — exactly like the copy. Every animation communicates a specific meaning: shimmer means 'loading', scaleIn means 'confirmed', the conic spin means 'this is active and selected'. Motion that doesn't communicate anything is removed.</div>
        </div>

        <Sub>The Animation Vocabulary</Sub>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          {[
            { name:"Shimmer",    meaning:"Loading / async pending",    rule:"Use on every content area while data fetches. Replace spinners entirely. Width 400px, 1.6s linear loop.",     col:C.dim },
            { name:"scaleIn",    meaning:"Confirmed / success",        rule:"The ✓ moment. Only on success states. 0.45s spring easing. Always with ringExpand behind it.",              col:C.green },
            { name:"ringExpand", meaning:"Success radiance",            rule:"Rings outward from the scaleIn circle. 1.6s ease infinite until dismissed. Green only.",                   col:C.green },
            { name:"spin-border",meaning:"Active / selected / focused", rule:"The conic wrap. 2.5s linear on buttons and inputs. Never stop it while element is active.",               col:C.violet },
            { name:"spin-pb",    meaning:"Price is live",               rule:"2.0s linear on price badges. Fixed — never deviate. Faster = anxious. Slower = broken.",                  col:C.orange },
            { name:"fadeUp",     meaning:"Element entered",             rule:"0.4s ease on section and card entrance. translateY(10px) → 0. Use stagger 0.05–0.1s for grid items.",     col:C.muted },
            { name:"bounce",     meaning:"Async in progress",           rule:"3 dots, 0.22s stagger. Only during active POST/async calls. Stop immediately on resolve.",                 col:C.fb },
            { name:"pulse-glow", meaning:"Primary CTA attention",       rule:"Animated box-shadow on THE primary action. One per screen maximum. Never on secondary buttons.",           col:C.violet },
            { name:"liquid-blob",meaning:"Organic / alive",             rule:"border-radius morph. Reserve for hero CTAs or empty states. 3.5s ease-in-out loop.",                     col:C.pink },
            { name:"chrome-shift",meaning:"Premium surface",            rule:"Multi-stop gradient shift on hero chrome buttons. 3s ease loop. Reserve for single hero CTA per screen.", col:C.orange },
          ].map(a => (
            <div key={a.name} style={{ background:C.d3,border:`1px solid ${C.bdr}`,borderRadius:12,padding:16,display:"flex",gap:14 }}>
              <div style={{ flexShrink:0 }}>
                <CodeTag color={a.col}>{a.name}</CodeTag>
              </div>
              <div>
                <div style={{ fontSize:11,fontWeight:800,color:"white",marginBottom:4 }}>{a.meaning}</div>
                <div style={{ fontSize:11,color:C.muted,lineHeight:1.6 }}>{a.rule}</div>
              </div>
            </div>
          ))}
        </div>

        <Sub>Timing Reference</Sub>
        <Card>
          <Tbl heads={["Duration","Use","Easing","Never use for"]} rows={[
            ["0.12s","Press/active state (buttons)","linear","Entrance animations"],
            ["0.18s","Hover state changes","ease","Content transitions"],
            ["0.35s","State changes (step, tab, mode)","ease","Loading indicators"],
            ["0.40s","Card/section entrance (fadeUp)","ease","Confirmations"],
            ["0.45s","Success checkmark (scaleIn)","spring cubic-bezier(0.34,1.56,0.64,1)","Background loops"],
            ["1.6s","ringExpand success ring · shimmer skeleton","ease · linear","Attention-grabbing CTAs"],
            ["2.0s","Price badge conic spin","linear infinite","Hover states"],
            ["2.5s","Button/input conic border","linear infinite","Transitions"],
            ["3.0s","Chrome-shift gradient","ease infinite","Loading states"],
            ["3.5s","Liquid blob morphing","ease-in-out infinite","Success states"],
          ]}/>
        </Card>

        <Sub>Spring Easing — Nova Wallet signature</Sub>
        <div className="code">{`<span class="cm">/* Nova Wallet spring — use for all .active class transitions */</span>
transition: all 0.35s <span class="cb">cubic-bezier(0.34, 1.56, 0.64, 1)</span>;

<span class="cm">/* Breakdown: slight overshoot (1.56) gives "pop" feeling */</span>
<span class="cm">/* 0.34 = slow start · 1.56 = overshoot peak · 0.64, 1 = settle */</span>

<span class="cm">/* Use on: step indicators, selection cards, tab switches, modal entrances */</span>
<span class="cm">/* Do NOT use on: hover states, tooltips, shimmer, looping animations */</span>`}</div>
      </UxSec>

      {/* ═══════════════════════════════════
          02 · STANDARD BUTTONS (compliance-fixed ButtonLab)
      ═══════════════════════════════════ */}
      <UxSec id="ux-buttons" n="02" title="Advanced Buttons" sub="All variants · hover for spec · compliance-fixed labels · pre-written CSS in §11 Ready Scripts">

        <div style={{ background:`${C.green}0a`,border:`1px solid ${C.green}25`,borderRadius:12,padding:"12px 18px",marginBottom:28,fontSize:12,color:C.dim,lineHeight:1.7 }}>
          <strong style={{ color:C.green }}>Compliance note:</strong> All button labels updated for Voice Guide v2.0. "Post to Marketplace" → retired. Labels now use approved vocabulary: "Create Listing", "Circulate ◈", "List it." — circular trade infrastructure framing.
        </div>

        <Sub>Standard — 8 Variants</Sub>
        <BtnGrid>
          <BtnWrap label="Primary" fixed hex={`${C.orchid} → ${C.violet}`} notes="All primary CTAs — Create Listing · Confirm · Mint DPP">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,${C.orchid},${C.violet})`,`0 4px 20px rgba(179,84,241,.35)`,C.violet)}>Create Listing</button>
          </BtnWrap>
          <BtnWrap label="Green" hex={`#1a9a84 → ${C.green}`} notes="Confirm · DPP minted · transfer confirmed">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,#1a9a84,${C.green})`,`0 4px 16px rgba(40,183,157,.3)`,C.green)}>✓ Confirm Transfer</button>
          </BtnWrap>
          <BtnWrap label="FB Blue" hex={`#1565c0 → ${C.fb}`} notes="Facebook Marketplace post only — not general DeStore CTA">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,#1565c0,${C.fb})`,`0 4px 16px rgba(24,119,242,.3)`,C.fb)}>f &nbsp;Post to FB</button>
          </BtnWrap>
          <BtnWrap label="Hot Pink" hex={`#c0126f → ${C.pink}`} notes="SALE · SOLD label · destructive action with care">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,#c0126f,${C.pink})`,`0 4px 16px rgba(255,27,154,.3)`,C.pink)}>🔥 Sale Active</button>
          </BtnWrap>
          <BtnWrap label="Orange ★" isNew hex={`#cc7000 → ${C.orange}`} notes="Pending · price alert · low stock · expiry warning">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,#cc7000,${C.orange})`,`0 4px 16px rgba(255,159,70,.3)`,C.orange)}>⚠ Pending Review</button>
          </BtnWrap>
          <BtnWrap label="Royal Base ★" isNew hex={`#1a0d38 → ${C.royal}`} notes="Ownership Claim · hero brand backgrounds">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,#1a0d38,${C.royal})`,`0 4px 16px rgba(50,27,104,.45)`,C.royal)}>◈ Ownership Claim</button>
          </BtnWrap>
          <BtnWrap label="Ghost" hex={C.bdr} notes="Secondary action · back · cancel">
            <button className="btn-press" style={btnBase("transparent","none",C.bdr)}><span style={{ color:C.dim }}>← Back</span></button>
          </BtnWrap>
          <BtnWrap label="Danger" hex="#7a0a0a → #c0392b" notes="Destroy / Recycle DPP · permanent action only">
            <button className="btn-press" style={btnBase(`linear-gradient(135deg,#7a0a0a,#c0392b)`,`0 4px 16px rgba(192,57,43,.3)`,"#c0392b")}>Destroy / Recycle</button>
          </BtnWrap>
        </BtnGrid>

        <Sub>Small Variants</Sub>
        <div style={{ display:"flex",flexWrap:"wrap",gap:10,alignItems:"center",marginBottom:28 }}>
          {[
            { bg:`linear-gradient(135deg,${C.orchid},${C.violet})`, sh:`0 3px 12px rgba(179,84,241,.35)`, bd:C.violet,  label:"Primary sm" },
            { bg:`linear-gradient(135deg,#1a9a84,${C.green})`,      sh:`0 3px 12px rgba(40,183,157,.3)`,  bd:C.green,   label:"Green sm" },
            { bg:`linear-gradient(135deg,#1565c0,${C.fb})`,         sh:`0 3px 12px rgba(24,119,242,.3)`,  bd:C.fb,      label:"FB sm" },
            { bg:`linear-gradient(135deg,#c0126f,${C.pink})`,       sh:`0 3px 12px rgba(255,27,154,.3)`,  bd:C.pink,    label:"Pink sm" },
            { bg:`linear-gradient(135deg,#cc7000,${C.orange})`,     sh:`0 3px 12px rgba(255,159,70,.3)`,  bd:C.orange,  label:"Orange sm", isNew:true },
            { bg:`linear-gradient(135deg,#1a0d38,${C.royal})`,      sh:`0 3px 12px rgba(50,27,104,.4)`,   bd:C.royal,   label:"Royal sm", isNew:true },
            { bg:"transparent",                                      sh:"none",                             bd:C.bdr,     col:C.dim, label:"Ghost sm" },
          ].map(v => (
            <div key={v.label} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
              <button className="btn-press" style={{ background:v.bg,border:`1.5px solid ${v.bd}`,borderRadius:10,padding:"8px 16px",color:v.col||"#fff",fontSize:12,fontWeight:800,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"0.02em",boxShadow:v.sh,display:"inline-flex",alignItems:"center",gap:5,whiteSpace:"nowrap" }}>
                {v.label.replace(" sm","").replace(" ★","").replace(" isNew","")}
              </button>
              <div style={{ fontSize:10,fontWeight:700,color:C.muted,textAlign:"center" }}>
                {v.label}{v.isNew && <span className="badge-new">★</span>}
              </div>
            </div>
          ))}
        </div>

        <Sub>Conic Active Border — 3 contexts</Sub>
        <div style={{ display:"flex",flexWrap:"wrap",gap:20,alignItems:"flex-start",marginBottom:28 }}>
          <BtnWrap label="Conic Primary" notes="spin-border 2.5s linear — on selected/active buttons">
            <div className="conic-wrap"><div className="conic-inner">Create Listing</div></div>
          </BtnWrap>
          <BtnWrap label="Conic Ghost" notes="Same border · dark3 inner · for selected option cards">
            <div className="conic-wrap"><div className="conic-inner" style={{ background:C.d3 }}>Selected Option</div></div>
          </BtnWrap>
          <BtnWrap label="Conic Input" notes="Focus state on any text input · 13px/11px radii">
            <div className="conic-wrap" style={{ borderRadius:13 }}><div className="conic-inner" style={{ background:C.d4,borderRadius:11,padding:"11px 16px",fontSize:14,fontWeight:400,color:C.dim }}>Focused input ✦</div></div>
          </BtnWrap>
        </div>
      </UxSec>

      {/* ═══════════════════════════════════
          03 · LIQUID CHROME
      ═══════════════════════════════════ */}
      <UxSec id="ux-chrome" n="03" title="Liquid Chrome" sub="Multi-stop gradient + animated sweep · brand colour injected into chrome mid-stops · reserve for hero CTAs only">
        <div style={{ background:`${C.violet}0a`,border:`1px solid ${C.violet}20`,borderRadius:12,padding:"10px 18px",marginBottom:28,fontSize:12,color:C.dim,lineHeight:1.7 }}>
          Chrome buttons inject brand colour into the chrome mid-stops — so they read as DeStore, not generic silver. Each variant is named for its dominant brand colour. <strong style={{ color:C.orange }}>Reserve for single hero CTA per screen only.</strong> Overuse eliminates the premium signal entirely.
        </div>
        <BtnGrid>
          <BtnWrap label="Chrome Violet ★" isNew hex={`${C.orchid} chrome`} notes="Hero CTA · Create Listing · Mint DPP — primary action">
            <button className="btn-press chrome-sweep" style={chromeStyle(`#d8d0f0 0%,#ffffff 12%,#9070c8 28%,${C.orchid} 44%,${C.violet} 56%,#a090d0 70%,#ffffff 84%,#c8c0e8 100%`,`0 6px 28px rgba(179,84,241,.45)`,"rgba(255,255,255,.3)")}>
              Create Listing ◈
            </button>
          </BtnWrap>
          <BtnWrap label="Chrome Royal ★" isNew hex={`${C.royal} chrome`} notes="Ownership Claim · hero brand identity action">
            <button className="btn-press chrome-sweep" style={chromeStyle(`#c0b8e8 0%,#ffffff 14%,#7060a8 28%,${C.royal} 44%,#5040a0 56%,#9080c0 70%,#ffffff 84%,#b8b0d8 100%`,`0 6px 24px rgba(50,27,104,.55)`,"rgba(255,255,255,.25)")}>
              ◈ Claim Ownership
            </button>
          </BtnWrap>
          <BtnWrap label="Chrome Green ★" isNew hex={`${C.green} chrome`} notes="DPP minted · confirmed transfer · success hero CTA">
            <button className="btn-press chrome-sweep" style={chromeStyle(`#b8f0e8 0%,#ffffff 12%,#40c0a8 28%,${C.green} 44%,#20a888 56%,#60c8b0 70%,#ffffff 84%,#a8e8e0 100%`,`0 6px 24px rgba(40,183,157,.4)`,"rgba(255,255,255,.3)")}>
              ✓ Passport Minted
            </button>
          </BtnWrap>
          <BtnWrap label="Chrome Pink ★" isNew hex={`${C.pink} chrome`} notes="SOLD final state · sale ended · hero close CTA">
            <button className="btn-press chrome-sweep" style={chromeStyle(`#f0b8d8 0%,#ffffff 12%,#d060a0 28%,${C.pink} 44%,#c01880 56%,#e068b8 70%,#ffffff 84%,#e8b0d0 100%`,`0 6px 24px rgba(255,27,154,.4)`,"rgba(255,255,255,.3)")}>
              🏷 Sold
            </button>
          </BtnWrap>
          <BtnWrap label="Chrome Orange ★" isNew hex={`${C.orange} chrome`} notes="Price alert · expiry warning · urgent hero CTA">
            <button className="btn-press chrome-sweep" style={chromeStyle(`#f8e0b0 0%,#ffffff 12%,#e09040 28%,${C.orange} 44%,#d07020 56%,#e8a860 70%,#ffffff 84%,#f0d898 100%`,`0 6px 24px rgba(255,159,70,.4)`,"rgba(255,255,255,.3)")}>
              ⚠ Update Price
            </button>
          </BtnWrap>
          <BtnWrap label="Chrome Black ★" isNew hex="#222 chrome" notes="Monochrome premium · on-chain record view">
            <button className="btn-press chrome-sweep" style={chromeStyle(`#888888 0%,#ffffff 14%,#444444 28%,#111111 44%,#2a2a2a 56%,#555555 70%,#ffffff 84%,#777777 100%`,`0 6px 20px rgba(0,0,0,.6)`,"rgba(255,255,255,.2)")}>
              View Record
            </button>
          </BtnWrap>
        </BtnGrid>
        <Sub>Chrome Technique — CSS</Sub>
        <div className="code">{`<span class="cm">/* 1. Background: multi-stop gradient with brand colour in mid-stops */</span>
<span class="cw">.chrome-violet</span> {
  background: <span class="cb">linear-gradient</span>(135deg,
    <span class="cv">#d8d0f0</span> 0%, <span class="cv">#ffffff</span> 12%, <span class="cv">#9070c8</span> 28%,
    <span class="cv">#6A14DB</span> 44%, <span class="cv">#B354F1</span> 56%,   <span class="cm">/* ← brand colour injected here */</span>
    <span class="cv">#a090d0</span> 70%, <span class="cv">#ffffff</span> 84%, <span class="cv">#c8c0e8</span> 100%);
  background-size: <span class="co">250% 250%</span>;
  animation: chrome-shift <span class="co">3s</span> ease infinite;
  box-shadow: 0 6px 28px rgba(179,84,241,.45), inset 0 1px 0 rgba(255,255,255,.25);
  text-shadow: 0 1px 3px rgba(0,0,0,.5);  <span class="cm">/* legible text over reflective surface */</span>
}

<span class="cm">/* 2. Liquid sweep: white diagonal shimmer passes across */</span>
<span class="cw">.chrome-sweep::after</span> {
  content: ''; position: absolute; top: -50%; left: -75%;
  width: 55%; height: 200%;
  background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,.55) 50%, transparent 75%);
  animation: liquid-sweep <span class="co">2.4s</span> ease-in-out infinite;
}

<span class="cb">@keyframes</span> chrome-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
<span class="cb">@keyframes</span> liquid-sweep { 0%{left:-75%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:125%;opacity:0} }`}</div>
      </UxSec>

      {/* ═══════════════════════════════════
          04 · LIQUID BLOB
      ═══════════════════════════════════ */}
      <UxSec id="ux-blob" n="04" title="Liquid Blob" sub="Morphing border-radius · organic feel without JS · stackable with chrome and conic">
        <div style={{ display:"flex",flexWrap:"wrap",gap:24,alignItems:"flex-start",marginBottom:28 }}>
          <BtnWrap label="Blob Primary ★" isNew notes="liquid-blob 3.5s ease-in-out infinite · sits on gradient">
            <button className="btn-press" style={{ ...btnBase(`linear-gradient(135deg,${C.orchid},${C.violet})`,`0 4px 20px rgba(179,84,241,.35), 0 0 40px rgba(179,84,241,.15)`,C.violet), animation:"liquid-blob 3.5s ease-in-out infinite" }}>
              Circulate ◈
            </button>
          </BtnWrap>
          <BtnWrap label="Blob + Chrome ★" isNew notes="chrome-shift + liquid-blob stacked · max organic feel · hero only">
            <button className="btn-press chrome-sweep" style={{ ...chromeStyle(`#d8d0f0 0%,#ffffff 12%,#9070c8 28%,${C.orchid} 44%,${C.violet} 56%,#a090d0 70%,#ffffff 84%,#c8c0e8 100%`,`0 6px 28px rgba(179,84,241,.45)`,"rgba(255,255,255,.3)"),animation:"chrome-shift 3s ease infinite, liquid-blob 3.5s ease-in-out infinite" }}>
              Chrome + Blob
            </button>
          </BtnWrap>
          <BtnWrap label="Blob + Conic ★" isNew notes="Conic spinning border wraps a blob-shaped inner element">
            <div style={{ position:"relative",borderRadius:16,padding:1.5,display:"inline-block",background:`conic-gradient(from var(--angle,0deg),${C.violet},${C.orchid},#00c8ff,${C.violet} 40%,${C.royal} 60%,${C.violet})`,animation:"spin-border 2.5s linear infinite, liquid-blob 3.5s ease-in-out infinite" }}>
              <div style={{ background:C.d4,borderRadius:14,padding:"13px 22px",fontSize:13,fontWeight:800,color:"white",fontFamily:"'Plus Jakarta Sans',sans-serif",whiteSpace:"nowrap" }}>Conic + Blob</div>
            </div>
          </BtnWrap>
        </div>
        <div className="code">{`<span class="cb">@keyframes</span> liquid-blob {
  0%   { border-radius: <span class="co">14px 14px 14px 14px</span>; }
  20%  { border-radius: <span class="co">18px 11px 16px 13px</span>; }
  40%  { border-radius: <span class="co">11px 17px 13px 18px</span>; }
  60%  { border-radius: <span class="co">16px 13px 18px 11px</span>; }
  80%  { border-radius: <span class="co">13px 18px 11px 16px</span>; }
  100% { border-radius: <span class="co">14px 14px 14px 14px</span>; }
}
<span class="cm">/* Stack with chrome: */</span>
animation: chrome-shift <span class="co">3s</span> ease infinite, liquid-blob <span class="co">3.5s</span> ease-in-out infinite;
<span class="cm">/* Stack with conic wrapper: apply liquid-blob to the outer conic div */</span>`}</div>
      </UxSec>

      {/* ═══════════════════════════════════
          05 · SVG DISTORTION
      ═══════════════════════════════════ */}
      <UxSec id="ux-distort" n="05" title="SVG Liquid Distortion" sub="feTurbulence + feDisplacementMap · true mercury feel · best for DPP mint hero or success state">
        <div style={{ display:"flex",flexWrap:"wrap",gap:24,alignItems:"flex-start",marginBottom:28 }}>
          <BtnWrap label="Distort Primary ★" isNew notes="filter:url(#liquid-distort) · animated feTurbulence">
            <button className="btn-press" style={{ ...btnBase(`linear-gradient(135deg,${C.orchid},${C.violet})`,`0 4px 20px rgba(179,84,241,.4)`,C.violet), filter:"url(#liquid-distort)" }}>
              Mint Passport ◈
            </button>
          </BtnWrap>
          <BtnWrap label="Distort Chrome ★" isNew notes="Chrome sweep + SVG distortion — maximum liquid · hero DPP mint only">
            <button className="btn-press chrome-sweep" style={{ ...chromeStyle(`#d8d0f0 0%,#ffffff 12%,#9070c8 28%,${C.orchid} 44%,${C.violet} 56%,#a090d0 70%,#ffffff 84%,#c8c0e8 100%`,`0 6px 28px rgba(179,84,241,.45)`,"rgba(255,255,255,.3)"), filter:"url(#liquid-distort)" }}>
              Circulate ◈
            </button>
          </BtnWrap>
          <BtnWrap label="Distort Green ★" isNew notes="DPP verified badge-level · success state use">
            <button className="btn-press" style={{ ...btnBase(`linear-gradient(135deg,#1a9a84,${C.green})`,`0 4px 16px rgba(40,183,157,.3)`,C.green), filter:"url(#liquid-distort)" }}>
              ◈ DPP Verified
            </button>
          </BtnWrap>
        </div>
        <div className="code">{`<span class="cm">/* Step 1: embed hidden SVG filter once in your component */</span>
<span class="cw">const LiquidFilter</span> = () => (
  <span class="cb">&lt;svg</span> style={{ position:"absolute",width:0,height:0,overflow:"hidden" }}<span class="cb">&gt;</span>
    <span class="cb">&lt;defs&gt;</span>
      <span class="cb">&lt;filter</span> id="liquid-distort"<span class="cb">&gt;</span>
        <span class="cb">&lt;feTurbulence</span> type="fractalNoise" baseFrequency="0.014 0.009"
          numOctaves="3" seed="4" result="noise"<span class="cb">&gt;</span>
          <span class="cb">&lt;animate</span> attributeName="baseFrequency"
            values="0.014 0.009;0.02 0.014;0.014 0.009"
            dur="5s" repeatCount="indefinite"/<span class="cb">&gt;</span>
        <span class="cb">&lt;/feTurbulence&gt;</span>
        <span class="cb">&lt;feDisplacementMap</span> in="SourceGraphic" in2="noise"
          scale="5" xChannelSelector="R" yChannelSelector="G"/<span class="cb">&gt;</span>
      <span class="cb">&lt;/filter&gt;</span>
    <span class="cb">&lt;/defs&gt;</span>
  <span class="cb">&lt;/svg&gt;</span>
);

<span class="cm">/* Step 2: apply to any button with filter */</span>
<span class="cw">&lt;button</span> style={{ filter: <span class="cg">"url(#liquid-distort)"</span> }}<span class="cw">&gt;</span>...<span class="cw">&lt;/button&gt;</span>`}</div>
      </UxSec>

      {/* ═══════════════════════════════════
          06 · PULSE GLOW
      ═══════════════════════════════════ */}
      <UxSec id="ux-pulse" n="06" title="Pulse Glow" sub="box-shadow pulsing on loop · draws eye to primary CTA · one per screen maximum">
        <div style={{ display:"flex",flexWrap:"wrap",gap:24,alignItems:"flex-start",marginBottom:28 }}>
          <BtnWrap label="Pulse Primary ★" isNew notes="pulse-glow 2s ease infinite · THE primary action on this screen">
            <button className="btn-press" style={{ ...btnBase(`linear-gradient(135deg,${C.orchid},${C.violet})`,`0 4px 20px rgba(179,84,241,.35)`,C.violet), animation:"pulse-glow 2s ease infinite" }}>
              Create Listing
            </button>
          </BtnWrap>
          <BtnWrap label="Pulse Green ★" isNew notes="DPP mint · confirmed transfer · primary success CTA">
            <button className="btn-press" style={{ ...btnBase(`linear-gradient(135deg,#1a9a84,${C.green})`,`0 4px 16px rgba(40,183,157,.3)`,C.green), animation:"pulse-glow 2s ease infinite" }}>
              ✓ Confirm & Circulate
            </button>
          </BtnWrap>
        </div>
        <div className="code">{`<span class="cb">@keyframes</span> pulse-glow {
  0%,100% { box-shadow: 0 4px 20px rgba(179,84,241,<span class="co">.35</span>); }
  50%      { box-shadow: 0 4px 32px rgba(179,84,241,<span class="co">.65</span>), 0 0 60px rgba(179,84,241,<span class="co">.2</span>); }
}
<span class="cm">/* Green variant: swap RGBA to rgba(40,183,157,…) */</span>
animation: pulse-glow <span class="co">2s</span> ease infinite;
<span class="cm">/* Rule: ONE per screen · never on secondary/ghost buttons */</span>`}</div>
      </UxSec>

      {/* ═══════════════════════════════════
          07 · PRICE BADGES (compliance-fixed)
      ═══════════════════════════════════ */}
      <UxSec id="ux-badges" n="07" title="Price Badges" sub="The motion signature of DeStore · the price gets the full conic spin treatment · all 4 variants live">
        <div style={{ background:`${C.green}0a`,border:`1px solid ${C.green}25`,borderRadius:12,padding:"12px 18px",marginBottom:28,fontSize:12,color:C.dim,lineHeight:1.7 }}>
          <strong style={{ color:C.green }}>Compliance note:</strong> Labels updated — "Only 1 left" → "Only 1 in circulation" · DPP row updated to "Provenance on record" · circular trade framing added to context copy. 2s spin is fixed and non-negotiable.
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:28 }}>

          {/* V1 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.violet,marginBottom:16 }}>V1 · Full Brand Gradient · Standard listing</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                <span className="was-price">$420</span>
                <span className="save-pill">Save $135 · 32% off</span>
              </div>
              <div className="pb-ring1">
                <div className="pb-pill" style={{ background:"#1c1e21" }}>
                  <div className="pb-grad">$285</div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>AUD</div>
                </div>
              </div>
              <Viewers count={7} colors={[C.orchid,C.green,C.pink]}/>
              <StockBar pct={74} label="Only 1 in circulation"/>
              <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,color:C.green }}>◈ DPP Verified · Provenance on record</div>
              <button className="offer-btn">Make an Offer →</button>
            </div>
          </Card>

          {/* V2 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:"#ffffff",marginBottom:16 }}>V2 · White · Fixed price · Buy Now urgency</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <CountTimer label="Price drops in" seconds={19421}/>
              <div className="pb-ring2">
                <div className="pb-pill" style={{ background:"#1c1e21" }}>
                  <div className="pb-white">$850</div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>AUD · fixed</div>
                </div>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                {[["★ 4.9",C.orange],["23 trades",C.muted],["Fast ship",C.green]].map(([t,col])=>(
                  <span key={t} style={{ fontSize:10,fontWeight:700,color:col }}>{t}</span>
                ))}
              </div>
              <LiveCount label="viewing right now" value={12} color={C.green}/>
              <button className="offer-btn">Trade Now · Skip Queue →</button>
            </div>
          </Card>

          {/* V3 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.pink,marginBottom:16 }}>V3 · Hot Pink · Sale · SOLD energy</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <span className="label-tag" style={{ background:"rgba(255,27,154,.15)",border:"1px solid rgba(255,27,154,.35)",color:C.pink }}>🔥 SALE ENDS MIDNIGHT</span>
              <div className="pb-ring3">
                <div className="pb-pill" style={{ background:"#1c1e21" }}>
                  <div className="pb-pink">$285</div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.pink,opacity:.7,letterSpacing:"0.07em",textTransform:"uppercase" }}>was $420 AUD</div>
                </div>
              </div>
              <LiveCount label="offers in last hour" value={4} color={C.pink}/>
              <div style={{ fontSize:11,fontWeight:700,color:C.pink,background:"rgba(255,27,154,.08)",border:"1px solid rgba(255,27,154,.2)",borderRadius:8,padding:"5px 14px" }}>⚠ Someone has this in their cart</div>
              <button className="offer-btn" style={{ borderColor:C.pink,color:C.pink,background:"rgba(255,27,154,.1)" }}>Claim This Price →</button>
            </div>
          </Card>

          {/* V4 */}
          <Card>
            <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.09em",textTransform:"uppercase",color:C.orange,marginBottom:16 }}>V4 · Orange Fire · Negotiable · High-value</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <div style={{ display:"flex",gap:6,alignItems:"center" }}>
                <span style={{ fontSize:11,color:C.muted,fontWeight:600 }}>RRP</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.muted,textDecoration:"line-through" }}>$750</span>
                <span style={{ fontSize:10,color:C.orange,fontWeight:800 }}>↓ 62% below retail</span>
              </div>
              <div className="pb-ring4">
                <div className="pb-pill" style={{ background:"#1c1e21" }}>
                  <div className="pb-fire">$285</div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.orange,opacity:.7,letterSpacing:"0.07em",textTransform:"uppercase" }}>AUD · firm</div>
                </div>
              </div>
              <div style={{ fontSize:11,color:C.dim,textAlign:"center" }}>
                Seller's <strong style={{ color:C.orange }}>lowest accepted</strong> offer last 30 days:
              </div>
              <div style={{ display:"flex",gap:10 }}>
                {[["$260","rejected"],["$270","rejected"],["$285","accepted"]].map(([v,s],i)=>(
                  <div key={v} style={{ background:i===2?"rgba(255,159,70,.12)":C.d3,border:`1px solid ${i===2?"rgba(255,159,70,.4)":C.bdr}`,borderRadius:8,padding:"6px 12px",textAlign:"center" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:i===2?C.orange:C.muted }}>{v}</div>
                    <div style={{ fontSize:9,color:C.muted,marginTop:2 }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,color:C.orange }}>◈ DPP Verified · 23 prior owners · provenance clear</div>
              <button className="offer-btn" style={{ borderColor:C.orange,color:C.orange,background:"rgba(255,159,70,.1)" }}>Offer $285 Now →</button>
            </div>
          </Card>
        </div>
      </UxSec>

      {/* ═══════════════════════════════════
          08 · BUYING PSYCHOLOGY
      ═══════════════════════════════════ */}
      <UxSec id="ux-psych" n="08" title="Buying Psychology" sub="What triggers each variant · mapped to circular trade context · not dark patterns — honest circular trade signals">
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["Variant","Triggers","Circular Trade Context"]} rows={[
            ["V1 · Gradient","Social proof · scarcity · savings anchor · DPP trust","'Only 1 in circulation' reflects reality — objects circulate, they don't restock. DPP provenance is the trust layer."],
            ["V2 · White","Urgency timer · seller authority · live views · queue signal","'Trade Now' not 'Buy Now' — buyer is entering a circular trade. Timer can be real (price drop in 5hrs) or listing age."],
            ["V3 · Hot Pink","FOMO · loss aversion · competition signal · deadline","Sale ends = object leaves circulation at that price. 'Someone has this in their cart' = provenance continues regardless of who wins."],
            ["V4 · Orange","Price anchoring · commitment data · reciprocity · provenance","Showing real offer history builds trust — it's not a tactic, it's transparency. Circular trade record as social proof."],
          ]}/>
        </Card>
        <Sub>Ethical guardrails</Sub>
        <Card>
          <Tbl heads={["Signal","Allowed","Not Allowed"]} rows={[
            ["'X people viewing'","Real-time or recent (< 24h) viewer count","Fake or inflated numbers"],
            ["'Only 1 in circulation'","Accurate — DPP confirms one physical object","Applied to unlimited stock products"],
            ["Countdown timer","Real price drop deadline or listing expiry","Fake urgency restarting on page reload"],
            ["Offer history","Real accepted/rejected offer data","Fabricated negotiation history"],
            ["'Someone has this in cart'","Actual cart activity from DeStore DB","Applied when no real cart activity exists"],
          ]}/>
        </Card>
      </UxSec>

      {/* ═══════════════════════════════════
          09 · NOVA WALLET DEEP DIVE
      ═══════════════════════════════════ */}
      <UxSec id="ux-nova" n="09" title="Nova Wallet — Deep Reference" sub="iOS and Android tech stack · UI patterns we benchmark against · what to copy and what to adapt">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>iOS Stack</div>
            {[["Language","Swift 5.9+"],["Min target","iOS 16.0+"],["Architecture","VIPER — View / Interactor / Presenter / Entity / Router"],["Code gen","Generamba for module scaffolding"],["Linting","SwiftLint + SwiftFormat + Sourcery via Mint"],["UI paradigm","UIKit base · Liquid Glass UI (iOS 26 preview)"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid rgba(46,46,56,.4)`,fontSize:12 }}>
                <span style={{ color:C.muted,fontWeight:600 }}>{k}</span>
                <span style={{ color:"white",fontWeight:700,textAlign:"right",maxWidth:220 }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>Android Stack</div>
            {[["Language","Kotlin + NDK"],["Crypto primitives","Rust (sr25519 · ed25519) — native performance"],["Architecture","MVVM + Clean Architecture"],["Blockchain","Substrate / Polkadot.js RPC"],["Wallet connect","WalletConnect v2 (also iOS)"],["Hardware","Ledger Bluetooth + USB · Polkadot Vault QR"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid rgba(46,46,56,.4)`,fontSize:12 }}>
                <span style={{ color:C.muted,fontWeight:600 }}>{k}</span>
                <span style={{ color:"white",fontWeight:700,textAlign:"right",maxWidth:220 }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>

        <Sub>UI Patterns — What We Copy Directly</Sub>
        <Card style={{ marginBottom:20 }}>
          <Tbl heads={["Nova Pattern","Our Implementation","Notes"]} rows={[
            ["#0F0F0F–#1A1A1A OLED dark","dark0 #0a0a0d → dark1 #0d0d10","Slightly darker — better on modern OLED panels"],
            ["Card elevation with subtle border","1px #2e2e38 + dark3/4 surface","3-level hierarchy: dark2 → dark3 → dark4"],
            ["Gradient accent pill buttons","135° orchid → violet","Same construction. Our colours are more saturated."],
            ["Skeleton shimmer — never spinners","shimmer keyframe on all async","400px bg-size, 1.6s linear loop, same spec"],
            ["Spring pop easing","cubic-bezier(0.34,1.56,0.64,1)","Identical easing. 0.35s on state changes."],
            ["Backdrop blur topbar","backdrop-filter:blur(14px) + bg90% opacity","Liquid Glass iOS 26 — works on web too"],
            ["Bottom tab navigation","Standard nav · active = violet indicator","Tab dot pulses on active. Spring easing on switch."],
            ["Stagger card entrances","fadeUp 0.4s + 0.05–0.1s delay per card","Creates 'cascade' feel on list load"],
          ]}/>
        </Card>

        <Sub>UI Patterns — What We Adapt</Sub>
        <Card>
          <Tbl heads={["Nova Pattern","Our Adaptation","Why"]} rows={[
            ["SF Pro / system font","Plus Jakarta Sans 400–900","Brand typography is fixed by Glyphic Creative brief"],
            ["Substrate / Polkadot.js RPC","Soneium EVM RPC","Different blockchain — same pattern, different endpoint"],
            ["WalletConnect v2","Thirdweb ConnectButton","Thirdweb abstracts both CC + crypto — reduces UX friction"],
            ["sr25519/ed25519 crypto (Rust)","Soneium EVM sig","Not Substrate — standard EVM secp256k1"],
            ["In-app Ledger hardware wallet","Thirdweb hardware wallet connect","Same concept, implemented via Thirdweb SDK"],
            ["XCM auto-route cross-chain","Single chain (Soneium) for v1","XCM not needed at launch — add post-multichain expansion"],
          ]}/>
        </Card>
      </UxSec>

      {/* ═══════════════════════════════════
          10 · MOBILE PATTERNS
      ═══════════════════════════════════ */}
      <UxSec id="ux-mobile" n="10" title="Mobile Patterns" sub="Touch targets · safe areas · bottom nav · swipe gestures · DeStore-specific mobile rules">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>Touch Targets</div>
            {[["Min tap target","44×44px — Apple HIG spec"],["Button height","48–52px on mobile"],["Bottom nav icons","52px height zone"],["List item height","64px minimum"],["Price badge","Cannot be smaller than 80×50px"],["Input height","48px — no smaller on mobile"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(46,46,56,.4)`,fontSize:12 }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ color:"white",fontWeight:700 }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>Safe Areas & Layout</div>
            {[["Max content width","480px (mobile-first)"],["Horizontal padding","16–20px from screen edge"],["Bottom safe area","env(safe-area-inset-bottom) — always"],["Top safe area","env(safe-area-inset-top) under notch"],["Sticky header blur","backdrop-filter:blur(14px) always"],["Scroll indicators","::-webkit-scrollbar { display:none }"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(46,46,56,.4)`,fontSize:12 }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ color:"white",fontWeight:700,textAlign:"right",maxWidth:200 }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>

        <Sub>Bottom Navigation — Tab Spec</Sub>
        <div className="code">{`<span class="cm">/* Bottom nav — DeStore pattern (Nova-matched) */</span>
<span class="cw">.bottom-nav</span> {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: 52px;
  padding-bottom: env(safe-area-inset-bottom);  <span class="cm">/* iPhone notch safe */</span>
  background: <span class="cv">#0d0d10</span>f4;
  backdrop-filter: blur(14px);
  border-top: 1px solid <span class="cv">#2e2e38</span>;
  display: flex; align-items: center;
}
<span class="cw">.nav-tab</span>         { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; }
<span class="cw">.nav-tab.active</span>  { color: <span class="cv">#B354F1</span>; }
<span class="cw">.nav-tab-dot</span>     { width: 4px; height: 4px; border-radius: 50%; background: <span class="cv">#B354F1</span>;
  box-shadow: 0 0 6px <span class="cv">#B354F1</span>; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
<span class="cm">/* Spring pop on tab switch — Nova signature */</span>`}</div>

        <Sub>Mobile-specific Rules</Sub>
        <Card>
          <Tbl heads={["Rule","Detail"]} rows={[
            ["No hover-only interactions","Everything triggerable by tap. Hover is enhancement, not requirement."],
            ["Price badge on mobile","Always full-width in card — do not shrink the conic ring below 80px wide"],
            ["Conic inputs on mobile","Full-width inputs only. No inline short fields — touch precision is lower."],
            ["Error states","Always red border + error text below. Never just colour change alone."],
            ["Success animation","scaleIn ✓ must be large enough to see on 375px screen — minimum 56px diameter"],
            ["Shimmer on mobile","Same spec — but ensure shimmer covers the full expected content height"],
            ["Sticky topbar","Always backdrop-filter blur. Never solid colour — creates depth separation on scroll."],
          ]}/>
        </Card>
      </UxSec>

      {/* ═══════════════════════════════════
          11 · READY SCRIPTS ★
      ═══════════════════════════════════ */}
      <UxSec id="ux-scripts" n="11" title="Ready Scripts" sub="Copy-paste complete implementations — tested, brand-compliant, voice-compliant">

        <div style={{ background:`${C.orange}0a`,border:`1px solid ${C.orange}25`,borderRadius:12,padding:"12px 18px",marginBottom:28,fontSize:12,color:C.dim,lineHeight:1.7 }}>
          Every script below is <strong style={{ color:C.orange }}>production-ready</strong>. Token names match the <CodeTag color={C.violet}>C object</CodeTag> from the style guide. Labels use approved vocabulary. Copy directly into any DeStore <CodeTag>.jsx</CodeTag> file.
        </div>

        <Sub>1 · Primary Button — all variants</Sub>
        <div className="code">{`<span class="cm">/* Paste the C object from Style Guide §05 first */</span>

<span class="cw">const Btn</span> = ({ children, v="primary", onClick, disabled, sm, full }) => {
  const vs = {
    primary: { bg:<span class="cg">\`linear-gradient(135deg,\${C.orchid},\${C.violet})\`</span>, sh:<span class="cg">"0 4px 20px rgba(179,84,241,.35)"</span>, bd:C.violet },
    green:   { bg:<span class="cg">\`linear-gradient(135deg,#1a9a84,\${C.green})\`</span>,  sh:<span class="cg">"0 4px 16px rgba(40,183,157,.3)"</span>,  bd:C.green  },
    pink:    { bg:<span class="cg">\`linear-gradient(135deg,#c0126f,\${C.pink})\`</span>,   sh:<span class="cg">"0 4px 16px rgba(255,27,154,.3)"</span>,   bd:C.pink   },
    fb:      { bg:<span class="cg">\`linear-gradient(135deg,#1565c0,\${C.fb})\`</span>,    sh:<span class="cg">"0 4px 16px rgba(24,119,242,.3)"</span>,    bd:C.fb     },
    orange:  { bg:<span class="cg">\`linear-gradient(135deg,#cc7000,\${C.orange})\`</span>, sh:<span class="cg">"0 4px 16px rgba(255,159,70,.3)"</span>,   bd:C.orange },
    royal:   { bg:<span class="cg">\`linear-gradient(135deg,#1a0d38,\${C.royal})\`</span>, sh:<span class="cg">"0 4px 16px rgba(50,27,104,.45)"</span>,   bd:C.royal  },
    ghost:   { bg:<span class="cg">"transparent"</span>,                                   sh:<span class="cg">"none"</span>,                                  bd:C.bdr    },
    danger:  { bg:<span class="cg">"linear-gradient(135deg,#7a0a0a,#c0392b)"</span>,       sh:<span class="cg">"0 4px 16px rgba(192,57,43,.3)"</span>,    bd:<span class="cg">"#c0392b"</span>  },
  };
  const t = vs[v] || vs.primary;
  return (
    <span class="cb">&lt;button</span> className="btn-press" onClick={onClick} style={{
      background: disabled ? C.d4 : t.bg,
      border: <span class="cg">\`1.5px solid \${disabled ? C.bdr : t.bd}\`</span>,
      borderRadius: <span class="co">14</span>, padding: sm ? <span class="cg">"8px 16px"</span> : <span class="cg">"13px 22px"</span>,
      color: disabled ? C.muted : <span class="cg">"#fff"</span>,
      fontSize: sm ? <span class="co">12</span> : <span class="co">13</span>, fontWeight: <span class="co">800</span>,
      fontFamily: <span class="cg">"'Plus Jakarta Sans',sans-serif"</span>,
      letterSpacing: <span class="cg">"0.02em"</span>, cursor: disabled ? <span class="cg">"not-allowed"</span> : <span class="cg">"pointer"</span>,
      boxShadow: disabled ? <span class="cg">"none"</span> : t.sh, opacity: disabled ? <span class="co">0.45</span> : <span class="co">1</span>,
      width: full ? <span class="cg">"100%"</span> : <span class="cg">"auto"</span>, display: <span class="cg">"inline-flex"</span>,
      alignItems: <span class="cg">"center"</span>, justifyContent: <span class="cg">"center"</span>, gap: <span class="co">6</span>,
    }}{<span class="cb">children</span>}<span class="cb">&lt;/button&gt;</span>
  );
}

<span class="cm">/* Usage: */</span>
<span class="cb">&lt;Btn&gt;</span>Create Listing<span class="cb">&lt;/Btn&gt;</span>
<span class="cb">&lt;Btn</span> v="green"<span class="cb">&gt;</span>✓ Confirm Transfer<span class="cb">&lt;/Btn&gt;</span>
<span class="cb">&lt;Btn</span> v="ghost" sm<span class="cb">&gt;</span>← Back<span class="cb">&lt;/Btn&gt;</span>
<span class="cb">&lt;Btn</span> v="danger" onClick={handleRecycle}<span class="cb">&gt;</span>Destroy / Recycle<span class="cb">&lt;/Btn&gt;</span>`}</div>

        <Sub>2 · Conic Active Border — input wrapper</Sub>
        <div className="code">{`<span class="cm">/* CSS — add once to your global stylesheet */</span>
<span class="cv">@property</span> --angle { syntax: <span class="cg">'&lt;angle&gt;'</span>; initial-value: 0deg; inherits: false; }
<span class="cb">@keyframes</span> spin-border { to { --angle: 360deg; } }

<span class="cw">.conic-wrap</span> {
  position: relative; border-radius: 13px; padding: 1.5px; display: inline-block;
  background: conic-gradient(from var(--angle,0deg),
    <span class="cv">#B354F1</span>,<span class="cv">#6a14db</span>,<span class="cv">#00c8ff</span>,<span class="cv">#B354F1 40%</span>,<span class="cv">#321b68 60%</span>,<span class="cv">#B354F1</span>);
  animation: spin-border 2.5s linear infinite;
}
<span class="cw">.conic-inner</span> { background: <span class="cv">#26262e</span>; border-radius: 11px; }

<span class="cm">/* JSX — wrap any focused input */</span>
<span class="cb">&lt;div</span> className="conic-wrap"<span class="cb">&gt;</span>
  <span class="cb">&lt;input</span> className="conic-inner" style={{ padding:<span class="cg">"11px 14px"</span>,... }} <span class="cb">/&gt;</span>
<span class="cb">&lt;/div&gt;</span>`}</div>

        <Sub>3 · Price Badge — V1 Gradient (drop-in component)</Sub>
        <div className="code">{`<span class="cm">/* Requires: @property --pb1, @keyframes spin-pb1 in CSS */</span>
<span class="cw">const PriceBadge</span> = ({ price, currency="AUD", variant="gradient" }) => {
  const rings = {
    gradient: <span class="cg">"conic-gradient(from var(--pb1,0deg),#B354F1,#6A14DB,#00C8FF,#28B79D,#FF9F46,#B354F1 40%,#321B68 60%,#B354F1)"</span>,
    white:    <span class="cg">"conic-gradient(from var(--pb2,0deg),#fff,#B354F1,#fff,#9999b0,#B354F1 40%,#6A14DB 60%,#fff)"</span>,
    pink:     <span class="cg">"conic-gradient(from var(--pb3,0deg),#FF1B9A,#B354F1,#FF1B9A,#6A14DB,#FF1B9A 40%,#321B68 60%,#FF1B9A)"</span>,
    fire:     <span class="cg">"conic-gradient(from var(--pb4,0deg),#FF9F46,#FF1B9A,#B354F1,#FF9F46 40%,#321B68 60%,#FF9F46)"</span>,
  };
  const textStyles = {
    gradient: { background:<span class="cg">"linear-gradient(135deg,#28B79D,#B354F1,#FF9F46)"</span>,WebkitBackgroundClip:<span class="cg">"text"</span>,WebkitTextFillColor:<span class="cg">"transparent"</span> },
    white:    { color:<span class="cg">"#ffffff"</span> },
    pink:     { background:<span class="cg">"linear-gradient(135deg,#FF1B9A,#B354F1,#FF1B9A)"</span>,WebkitBackgroundClip:<span class="cg">"text"</span>,WebkitTextFillColor:<span class="cg">"transparent"</span> },
    fire:     { background:<span class="cg">"linear-gradient(135deg,#FF9F46,#FF1B9A,#B354F1)"</span>,WebkitBackgroundClip:<span class="cg">"text"</span>,WebkitTextFillColor:<span class="cg">"transparent"</span> },
  };
  const anims = { gradient:<span class="cg">"spin-pb1"</span>, white:<span class="cg">"spin-pb2"</span>, pink:<span class="cg">"spin-pb3"</span>, fire:<span class="cg">"spin-pb4"</span> };
  return (
    <span class="cb">&lt;div</span> style={{ position:<span class="cg">"relative"</span>,borderRadius:12,padding:2,display:<span class="cg">"inline-block"</span>,
      background:rings[variant],animation:<span class="cg">\`\${anims[variant]} 2s linear infinite\`</span> }}<span class="cb">&gt;</span>
      <span class="cb">&lt;div</span> style={{ background:<span class="cg">"#1c1e21"</span>,borderRadius:10,padding:<span class="cg">"9px 20px"</span>,
        display:<span class="cg">"flex"</span>,flexDirection:<span class="cg">"column"</span>,alignItems:<span class="cg">"center"</span>,gap:2 }}<span class="cb">&gt;</span>
        <span class="cb">&lt;span</span> style={{ fontSize:28,fontWeight:900,letterSpacing:<span class="cg">"-0.8px"</span>,...textStyles[variant] }}<span class="cb">&gt;</span>{price}<span class="cb">&lt;/span&gt;</span>
        <span class="cb">&lt;span</span> style={{ fontSize:9,fontWeight:600,color:<span class="cg">"#6b6b80"</span>,letterSpacing:<span class="cg">"0.07em"</span>,textTransform:<span class="cg">"uppercase"</span> }}<span class="cb">&gt;</span>{currency}<span class="cb">&lt;/span&gt;</span>
      <span class="cb">&lt;/div&gt;</span>
    <span class="cb">&lt;/div&gt;</span>
  );
};
<span class="cm">/* Usage: */</span>
<span class="cb">&lt;PriceBadge</span> price="$285" variant="gradient" /<span class="cb">&gt;</span>
<span class="cb">&lt;PriceBadge</span> price="$850" variant="white" currency="AUD · fixed" /<span class="cb">&gt;</span>
<span class="cb">&lt;PriceBadge</span> price="$285" variant="pink" /<span class="cb">&gt;</span>
<span class="cb">&lt;PriceBadge</span> price="$3,200" variant="fire" currency="AUD · negotiable" /<span class="cb">&gt;</span>`}</div>

        <Sub>4 · Chrome Button — Violet</Sub>
        <div className="code">{`<span class="cm">/* Requires: chrome-shift + liquid-sweep keyframes + .chrome-sweep class in CSS */</span>
<span class="cb">&lt;button</span> className="btn-press chrome-sweep" style={{
  background: <span class="cg">"linear-gradient(135deg,#d8d0f0 0%,#ffffff 12%,#9070c8 28%,#6A14DB 44%,#B354F1 56%,#a090d0 70%,#ffffff 84%,#c8c0e8 100%)"</span>,
  backgroundSize: <span class="cg">"250% 250%"</span>,
  animation: <span class="cg">"chrome-shift 3s ease infinite"</span>,
  border: <span class="cg">"1.5px solid rgba(255,255,255,.3)"</span>,
  borderRadius: <span class="co">14</span>, padding: <span class="cg">"13px 22px"</span>, color: <span class="cg">"#fff"</span>,
  fontSize: <span class="co">13</span>, fontWeight: <span class="co">800</span>, fontFamily: <span class="cg">"'Plus Jakarta Sans',sans-serif"</span>,
  boxShadow: <span class="cg">"0 6px 28px rgba(179,84,241,.45), inset 0 1px 0 rgba(255,255,255,.25)"</span>,
  textShadow: <span class="cg">"0 1px 3px rgba(0,0,0,.5)"</span>,
  position: <span class="cg">"relative"</span>, overflow: <span class="cg">"hidden"</span>,
}}<span class="cb">&gt;</span>
  Create Listing ◈
<span class="cb">&lt;/button&gt;</span>
<span class="cm">/* Rule: one chrome button per screen · hero CTA only */</span>`}</div>

        <Sub>5 · DPP Verified Callout Banner</Sub>
        <div className="code">{`<span class="cm">/* Paste anywhere above listing body */</span>
<span class="cb">&lt;div</span> style={{
  background:<span class="cg">\`linear-gradient(135deg,\${C.violet}14,\${C.orchid}08)\`</span>,
  border:<span class="cg">\`1px solid \${C.violet}28\`</span>,
  borderRadius:14, padding:<span class="cg">"15px 17px"</span>, display:<span class="cg">"flex"</span>, gap:12, alignItems:<span class="cg">"flex-start"</span>
}}<span class="cb">&gt;</span>
  <span class="cb">&lt;span</span> style={{ fontSize:22,filter:<span class="cg">\`drop-shadow(0 0 6px \${C.violet}80)\`</span> }}<span class="cb">&gt;</span>◈<span class="cb">&lt;/span&gt;</span>
  <span class="cb">&lt;div&gt;</span>
    <span class="cb">&lt;div</span> style={{ fontWeight:700,fontSize:13,marginBottom:4 }}<span class="cb">&gt;</span>Photos auto-loaded from DPP<span class="cb">&lt;/div&gt;</span>
    <span class="cb">&lt;div</span> style={{ color:C.dim,fontSize:12,lineHeight:1.5 }}<span class="cb">&gt;</span>
      Product record minted at manufacture. Provenance on record.
    <span class="cb">&lt;/div&gt;</span>
  <span class="cb">&lt;/div&gt;</span>
<span class="cb">&lt;/div&gt;</span>`}</div>

        <Sub>6 · Shimmer Skeleton</Sub>
        <div className="code">{`<span class="cm">/* CSS */</span>
<span class="cw">.shimmer</span> {
  background: linear-gradient(90deg, <span class="cv">#1c1c22</span> 0px, <span class="cv">#26262e</span> 80px, <span class="cv">#1c1c22</span> 160px);
  background-size: 400px 100%;
  animation: shimmer 1.6s infinite linear;
}
<span class="cb">@keyframes</span> shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
}

<span class="cm">/* JSX — replace all spinners with this */</span>
{isLoading ? (
  <span class="cb">&lt;div</span> style={{ display:<span class="cg">"flex"</span>,flexDirection:<span class="cg">"column"</span>,gap:10 }}<span class="cb">&gt;</span>
    <span class="cb">&lt;div</span> className="shimmer" style={{ height:90,borderRadius:14 }} /<span class="cb">&gt;</span>
    <span class="cb">&lt;div</span> className="shimmer" style={{ height:13,width:<span class="cg">"65%"</span>,borderRadius:6 }} /<span class="cb">&gt;</span>
    <span class="cb">&lt;div</span> className="shimmer" style={{ height:11,width:<span class="cg">"40%"</span>,borderRadius:6 }} /<span class="cb">&gt;</span>
  <span class="cb">&lt;/div&gt;</span>
) : <span class="cb">&lt;YourContent /&gt;</span>}`}</div>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${C.bdr}`,marginTop:80,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div>
            <Logo fill="#ffffff" width={100}/>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>© DeStore Network · UI/UX Guide v1.0 · March 2026 · Circular Trade Infrastructure</div>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <Chip color={C.green}>ButtonLab + PriceBadges — compliance-checked</Chip>
            <Chip color={C.violet}>Nova Wallet benchmark</Chip>
          </div>
        </div>
      </UxSec>
    </div>
  );
}
