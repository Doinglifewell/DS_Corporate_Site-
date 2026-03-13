import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESTORE DOCS — Brand Handbook v1.0
   Three-tab reference: Style Guide · Voice Guide · Developer Guide
   Positioning: Circular Trade Infrastructure
═══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

@property --angle { syntax:'${"<angle>"}'; initial-value:0deg; inherits:false; }
@property --pb1   { syntax:'${"<angle>"}'; initial-value:0deg; inherits:false; }
@property --pb2   { syntax:'${"<angle>"}'; initial-value:0deg; inherits:false; }
@property --pb3   { syntax:'${"<angle>"}'; initial-value:0deg; inherits:false; }
@property --pb4   { syntax:'${"<angle>"}'; initial-value:0deg; inherits:false; }

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
  { id:"d-payment",  label:"07 · DeAR.links" },
  { id:"d-n8n",      label:"08 · n8n Workflows" },
  { id:"d-docker",   label:"09 · Docker & Env" },
  { id:"d-zina",     label:"10 · Zina Integration" },
  { id:"d-icons",    label:"11 · Icon System" },
  { id:"d-profun",   label:"12 · Pro / Fun Switch" },
  { id:"d-dppflow",  label:"13 · DPP Flow Chart" },
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
function DevGuideContent() {
  return (
    <div className="content-inner" style={{ padding:"52px 56px 140px" }}>
      {/* Hero */}
      <div style={{ marginBottom:72,animation:"fadeUp 0.5s ease" }}>
        <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>DeStore Network</div>
        <h1 style={{ fontSize:48,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.08,marginBottom:16 }}>Developer<br/>Guide</h1>
        <p style={{ fontSize:15,color:C.dim,maxWidth:520,lineHeight:1.75,marginBottom:22 }}>Architecture, tech stack, DPP lifecycle, API patterns, component code, and environment setup. Everything needed to build on or extend DeStore infrastructure.</p>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          <Chip color={C.green}>Base · Thirdweb</Chip>
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
            <div style={{ fontSize:14,fontWeight:800,color:"white",marginBottom:10 }}>Base ERC-721 (Soulbound Token)</div>
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
            ["Product Record","ERC-721 on Base","Immutable — no one","QR scan → product page → DPP data"],
            ["Ownership Claim","Signed DB record","DeStore DB","'You own this' · claim URL · wallet card"],
            ["Event Log","On-chain transaction","Immutable — no one","Not surfaced to users — backend proof"],
            ["Payment","USDC · Base/Polygon/Soneium","DeAR.link (Thirdweb)","Pay button → wallet or card → done"],
          ]}/>
        </Card>
      </Sec>

      {/* 02 TECH STACK */}
      <Sec id="d-stack" n="02" title="Tech Stack" sub="Full production stack — every service and why it's there">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          {[
            { cat:"Blockchain", col:C.violet, items:[["Base (primary)","Coinbase L2 · DPP canonical chain · highest consumer wallet adoption · ERC-4337 + Thirdweb Engine."],["Polygon (secondary)","Enterprise adoption · high-volume secondary market transfers · low gas costs."],["Soneium (tertiary)","Sony-backed OP Stack L2 · consumer & media brand focus · USDC native."],["Thirdweb","Wallet connection + DeAR.links. Single integration across all three chains."],["USDC","Payment currency. Stablecoin — no crypto volatility UX."]] },
            { cat:"Backend / Automation", col:C.green, items:[["n8n (self-hosted)","All workflow automation at n8n.flowberry.org"],["Cloudflare Tunnel","HTTPS for self-hosted services — zero port forwarding"],["Docker","All services containerised — single docker-compose stack"]] },
            { cat:"Frontend", col:C.orange, items:[["Next.js / React","App Router · single .jsx components · all CSS inline"],["Plus Jakarta Sans","Google Fonts — sole typeface. 400/600/700/800/900."],["Thirdweb SDK","Wallet connect UI only — ConnectButton component"]] },
            { cat:"AI & Media", col:C.pink, items:[["Claude API","claude-sonnet-4-20250514 · Vision + copy + autonomous decisions via Zina"],["xAI Grok","grok-3 · Real-time X search · 26-day security threat intelligence · pre-audit scan"],["Google Drive","Image storage + n8n file linking"],["Telegram Bot","Zina assistant interface + photo upload workflow"]] },
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
            ["Base (primary)","RPC: https://mainnet.base.org","Chain ID 8453 · DPP canonical chain"],
            ["Polygon","RPC: https://polygon-rpc.com","Chain ID 137 · enterprise / high-volume"],
            ["Soneium","RPC: https://rpc.soneium.org","Chain ID 1868 · consumer / media focus"],
            ["Thirdweb","thirdweb.com/chain/1868","SDK + DeAR.link + wallet connect"],
            ["Claude API","api.anthropic.com/v1/messages","claude-sonnet-4-20250514"],
            ["xAI Grok","api.x.ai/v1/chat/completions","grok-3 · X search mode · security threat intel"],
            ["DeCam","app.destore.network/decam","Mobile-only DPP scanner · GS1 Digital Link resolver · 5 scan states"],
          ]}/>
        </Card>
        <Card accent={`${C.violet}20`} style={{ marginTop:14 }}>
          <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:10 }}>Ecosystem — DeStore + Sister Products</div>
          <Tbl heads={["Product","Role","Integrates via"]} rows={[
            ["DeStore","Core platform — DPP issuance, brand onboarding, consumer wallets, secondary market, B&B Treasury","This codebase"],
            ["DeCam","Mobile QR scanner — GS1 Digital Link resolver, DPP verification, 5 scan states. Mobile-only gate.","API: GET /api/dpp/{tokenId}"],
            ["B&B Treasury","Base wallet receiving $0.01 USDC per lifecycle event — future buyback-and-burn on token launch","Thirdweb Engine webhook"],
          ]}/>
          <div style={{ fontSize:11,color:C.muted,lineHeight:1.7,marginTop:12,padding:"10px 14px",background:"#141418",borderRadius:8 }}>
            <strong style={{ color:"#e8e8f0" }}>ESPR compliance target:</strong> Textiles delegated act expected late 2026/Q1 2027 · mandatory mid-2028 · EU DPP Registry goes live 19 Jul 2026 (hard deadline). GS1 Digital Link QR format required. JSON-LD metadata schema required. See DS_Systems §13 for full build checklist.
          </div>
        </Card>
        </Card>
      </Sec>

      {/* 03 DPP LIFECYCLE */}
      <Sec id="d-dpp" n="03" title="DPP Lifecycle" sub="From manufacture to recycling — the complete record journey">
        <Card accent={`${C.violet}30`} style={{ marginBottom:20 }}>
          <div style={{ fontSize:12,fontWeight:800,color:C.violet,marginBottom:8 }}>Survivability — infrastructure that outlives DeStore</div>
          <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
            {[
              { icon:"⛓", title:"Base keeps running", desc:"DPP Token lives on Base. No DeStore infrastructure required to read or verify it. Any wallet, any explorer, any developer." },
              { icon:"🪨", title:"Arweave is permanent", desc:"Metadata stored on Arweave. Pay once at mint (~$0.01). Accessible forever at the same tokenURI — with or without DeStore." },
              { icon:"📧", title:"Email receipt is proof", desc:"Consumer email contains token ID + Arweave link. Full ownership proof requiring zero DeStore involvement." },
              { icon:"🔓", title:"Open ERC-721 standard", desc:"No lock-in. Any wallet, any explorer, any developer can read these records independently. This is how infrastructure works." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ flex:"1 1 180px", background:C.d2, borderRadius:10, padding:"10px 14px", border:`1px solid ${C.violet}20` }}>
                <div style={{ fontSize:14, marginBottom:4 }}>{icon} <span style={{ fontSize:11,fontWeight:800,color:"#e8e8f0" }}>{title}</span></div>
                <div style={{ fontSize:11,color:C.muted,lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display:"flex",flexDirection:"column",gap:0,marginBottom:24 }}>
          {[
            { n:"01", state:"Manufacture", col:C.violet, desc:"Brand/maker triggers DPP creation. n8n workflow calls Thirdweb to mint ERC-721 SBT on Base. Metadata includes: product name, SKU, materials, origin country, carbon footprint, images (Google Drive URLs), brand address.", trigger:"n8n webhook POST /mint-dpp" },
            { n:"02", state:"Listing",     col:C.green,  desc:"Seller creates listing. DPP data auto-loaded via QR tag scan. Listing record created in DeStore DB linked to SBT token ID. DeAR.link generated via Thirdweb.", trigger:"POST /api/listings · links tokenId" },
            { n:"03", state:"Verified",    col:C.green,  desc:"Buyer scans QR tag or views listing. DPP callout banner shows auto-loaded images + material/origin/carbon data sourced from SBT metadata. '◈ Verified' chip displayed.", trigger:"GET /api/dpp/{tokenId} → read SBT" },
            { n:"04", state:"Payment",     col:C.orange, desc:"Buyer completes USDC payment via DeAR.link (Thirdweb). Webhook fires on payment confirmation. n8n workflow receives event.", trigger:"Thirdweb webhook → n8n" },
            { n:"05", state:"Transfer",    col:C.blue,   desc:"n8n workflow: (1) creates new signed ownership claim for buyer, (2) logs transfer event on Base (event notary only), (3) sends claim URL to buyer via email/Telegram, (4) updates listing status to 'Sold'.", trigger:"n8n auto on payment webhook" },
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
            A dedicated Base wallet receives <strong style={{ color:C.green }}>$0.01 USDC</strong> from every transaction DeStore touches — DPP issuance, secondary sale, gift, return, and destroy/recycle. Accumulates USDC now. When DeStore token launches, this becomes the buyback and burn wallet — USDC is used to buy tokens from the open market and burn them. Wallet not yet created or named on-chain.
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
            ["POST","/api/listings/{id}/payment-link","Generate Thirdweb USDC DeAR.link for listing."],
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

      {/* 07 DEPAY.LINK */}
      <Sec id="d-payment" n="07" title="DeAR.links" sub="How DeAR.link (Thirdweb) work in the DeStore flow">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>What a DeAR.link is</div>
            {["A Thirdweb-generated URL tied to a USDC amount and recipient wallet","Shareable anywhere — FB post, DM, email, QR, SMS","No DeStore app required to pay — link opens in any browser","Buyer pays with credit card OR crypto wallet (Thirdweb handles both)","On payment: Thirdweb fires webhook → n8n → ownership transfer"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:6 }}>
                <span style={{ color:C.green,flexShrink:0,fontSize:11,marginTop:2 }}>→</span>
                <span style={{ fontSize:12,color:C.dim,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.violet,marginBottom:12 }}>DeStore adds</div>
            {["DPP record attached to every DeAR.link","Ownership claim transfer auto-runs on payment confirm","$0.01 to B&B Treasury on every completed payment","Listing status updated to Sold automatically","Seller receives notification via Telegram/email","Full transaction logged to DeStore DB and on-chain notary"].map((t,i) => (
              <div key={i} style={{ display:"flex",gap:9,marginBottom:6 }}>
                <span style={{ color:C.violet,flexShrink:0,fontSize:11,marginTop:2 }}>◈</span>
                <span style={{ fontSize:12,color:C.dim,lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
        </div>
        <Sub>Generate DeAR.link — n8n HTTP Node</Sub>
        <div className="code">{`<span class="cm">// POST to Thirdweb create DeAR.link</span>
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
            ["Listing Auto-Post","New listing created","Format listing → generate DeAR.link → post to FB Marketplace → notify seller"],
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
  <span class="cg">send_payment_link</span>→ DeAR.link workflow
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
            ["XAI_API_KEY","n8n","xAI Grok — X search · 26-day security threat intelligence"],
            ["THIRDWEB_CLIENT_ID","n8n / frontend","DeAR.links + wallet connect"],
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
            { sys:"DeStore Marketplace",col:C.orange,cap:"Listings",   desc:"Create listings, generate DeAR.link, sync FB Marketplace" },
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
  <span class="cv">3.</span> DeStore Marketplace     — listings + DeAR.link

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

      </Sec>

      {/* §11 — Icon System */}
      <Sec id="d-icons" n="11" title="Icon System" sub="Lucide React — open-source, MIT licensed — the DeStore icon standard">
        <Card style={{marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <div style={{width:42,height:42,borderRadius:10,background:`rgba(40,183,157,.12)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>◈</div>
            <div>
              <div style={{fontWeight:800,fontSize:15}}>Lucide React</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>MIT License · 1,500+ icons · Consistent 24px grid · React-first</div>
            </div>
          </div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>DeStore uses <strong style={{color:"#fff"}}>Lucide React</strong> as its canonical icon library. Lucide is open-source (MIT), pixel-consistent on a 24px grid, and ships as tree-shakeable React components. It is the closest open equivalent to the professional icon quality found in tools like Canva — clean, geometric, and legible at all sizes.</div>
        </Card>
        <Sub>Installation & Usage</Sub>
        <div className="code">{`<span class="cc"># Install</span>
npm install lucide-react

<span class="cc"># Import</span>
<span class="cv">import</span> { Package, QrCode, Wallet, Shield } <span class="cv">from</span> <span class="cg">"lucide-react"</span>

<span class="cc"># Use — always pass size + strokeWidth explicitly</span>
<span class="cb">&lt;Package</span> size={20} color={<span class="cg">"#B354F1"</span>} strokeWidth={2} <span class="cb">/&gt;</span>`}</div>

        <Sub>Size Convention</Sub>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
          {[["12px","Inline / labels"],["16px","UI / buttons"],["20px","Navigation"],["24px","Feature / cards"],["28px","Section headers"],["32px","Hero / empty state"]].map(([sz,use])=>(
            <Card key={sz} style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:C.violet,marginBottom:4}}>{sz}</div>
              <div style={{fontSize:11,color:C.muted}}>{use}</div>
            </Card>
          ))}
        </div>

        <Sub>Rules</Sub>
        {[
          ["Color","Always inherit from context or pass brand token. Never hardcode #000 or #fff directly."],
          ["strokeWidth","Always use strokeWidth={2} for consistency. Never use fill icons."],
          ["No emojis","Emojis are only permitted when the Pro/Fun Switch is set to FUN mode (see §12)."],
          ["Avoid","Font Awesome (license complexity), Google Material (inconsistent stroke weight), raw SVGs without viewBox normalization."],
          ["Animation","Use CSS transform on the wrapper — never animate the SVG path directly."],
        ].map(([rule,desc])=>(
          <div key={rule} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.bdr}`}}>
            <div style={{width:110,fontSize:12,fontWeight:700,color:C.violet,flexShrink:0}}>{rule}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{desc}</div>
          </div>
        ))}
      </Sec>

      {/* §12 — Pro / Fun Switch */}
      <Sec id="d-profun" n="12" title="Pro / Fun Switch" sub="Context-aware personality toggle for all customer-facing surfaces">
        <Card style={{marginBottom:20,background:`linear-gradient(135deg,rgba(255,159,70,.07),rgba(106,20,219,.07))`}}>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.8}}>
            All outward-facing DeStore pages include a <strong style={{color:"#fff"}}>Pro/Fun toggle</strong>. In <strong style={{color:C.green}}>PRO mode</strong> (default), the interface is clean, professional, and icon-driven. In <strong style={{color:C.orange}}>FUN mode</strong>, emojis are enabled and copy shifts to a more playful, personality-forward tone. This gives B2B users a professional experience while letting consumers engage with the brand's personality.
          </div>
        </Card>
        <Sub>Implementation Pattern</Sub>
        <div className="code">{`<span class="cc">// 1. Context</span>
<span class="cv">const</span> ProfessionalModeCtx = createContext(<span class="cb">true</span>);

<span class="cv">export function</span> <span class="cg">ProfessionalModeProvider</span>({ children }) {
  <span class="cv">const</span> [isPro, setIsPro] = useState(<span class="cb">true</span>);
  <span class="cv">return</span> (
    &lt;ProfessionalModeCtx.Provider value={{ isPro, setIsPro }}&gt;
      {children}
    &lt;/ProfessionalModeCtx.Provider&gt;
  );
}

<span class="cv">export const</span> <span class="cg">useProfessionalMode</span> = () =&gt; useContext(ProfessionalModeCtx);

<span class="cc">// 2. Usage in component</span>
<span class="cv">const</span> { isPro } = useProfessionalMode();

<span class="cb">&lt;span&gt;</span>{!isPro &amp;&amp; <span class="cg">"🏷️ "</span>}Product Passport<span class="cb">&lt;/span&gt;</span>

<span class="cc">// 3. Toggle UI (use on all customer-facing pages)</span>
<span class="cv">function</span> <span class="cg">ProFunToggle</span>() {
  <span class="cv">const</span> { isPro, setIsPro } = useProfessionalMode();
  <span class="cv">return</span> (
    <span class="cb">&lt;button</span> onClick={() =&gt; setIsPro(p =&gt; !p)}&gt;
      {isPro ? <span class="cg">"💼 PRO"</span> : <span class="cg">"😄 FUN"</span>}
    <span class="cb">&lt;/button&gt;</span>
  );
}`}</div>

        <Sub>Mode Behaviour</Sub>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          <Card>
            <div style={{fontSize:11,fontWeight:900,letterSpacing:".8px",color:C.green,marginBottom:10}}>PRO MODE (default)</div>
            {["Clean Lucide icons, no emojis","Formal copy: 'Digital Product Passport'","Muted brand palette","Dense information layout","Preferred by B2B buyers, enterprise brands"].map(r=>(
              <div key={r} style={{display:"flex",gap:7,fontSize:12,color:C.muted,padding:"4px 0"}}>
                <span style={{color:C.green}}>✓</span>{r}
              </div>
            ))}
          </Card>
          <Card>
            <div style={{fontSize:11,fontWeight:900,letterSpacing:".8px",color:C.orange,marginBottom:10}}>FUN MODE</div>
            {["Emojis enabled throughout UI","Playful copy: 'Your product's passport 🏷️'","Warmer, more saturated palette accents","Slightly more spacious layout","Preferred by D2C consumers, resellers"].map(r=>(
              <div key={r} style={{display:"flex",gap:7,fontSize:12,color:C.muted,padding:"4px 0"}}>
                <span style={{color:C.orange}}>✦</span>{r}
              </div>
            ))}
          </Card>
        </div>
        <Card style={{background:`rgba(40,183,157,.05)`,border:`1px solid rgba(40,183,157,.2)`}}>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}><strong style={{color:C.green}}>Where to include:</strong> DeStore Marketplace, DPP viewer pages, onboarding flow, wallet passes (copy only), product listing pages. Internal tools (Brand Admin, Super Admin shells) are always PRO — no toggle required.</div>
        </Card>
      </Sec>

      {/* §13 — DPP Flow Chart */}
      <Sec id="d-dppflow" n="13" title="DPP Flow Chart" sub="Interactive lifecycle diagram — import DeStore_DPP_Flow.jsx into this shell">
        <Card style={{marginBottom:20,background:`rgba(179,84,241,.05)`,border:`1px solid rgba(179,84,241,.2)`}}>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.8}}>The <strong style={{color:"#fff"}}>DPP Lifecycle Flow</strong> is a standalone interactive component (<code style={{background:"#141418",padding:"1px 6px",borderRadius:4,fontSize:12,color:C.violet}}>DeStore_DPP_Flow.jsx</code>) covering all 5 phases: Create → Mint → Own → Transfer → End of Life. Each node is clickable with a technical detail panel. Includes phase filters, animated connection lines, and the Pro/Fun toggle.</div>
        </Card>
        <Sub>5 Lifecycle Phases</Sub>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {[
            ["CREATE","#6A14DB","Brand Onboards + Product Defined"],
            ["MINT","#B354F1","GS1 QR + DPP Minted on Base + Wallet Pregenerated"],
            ["OWN","#28B79D","Wallet Passes Issued + DPP Viewable + On-Chain Comms"],
            ["TRANSFER","#FF9F46","Listed + DeAR.link + Ownership Updated + B&B Treasury"],
            ["END OF LIFE","#6b6b80","Return/Recycle + Circular Impact Reported"],
          ].map(([phase,c,nodes])=>(
            <div key={phase} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:9,border:`1px solid ${c}22`,background:`${c}08`}}>
              <div style={{fontSize:10,fontWeight:900,letterSpacing:"1px",color:c,width:90,flexShrink:0}}>{phase}</div>
              <div style={{fontSize:12,color:C.muted}}>{nodes}</div>
            </div>
          ))}
        </div>
        <div className="code">{`<span class="cc">// Import into Dev page or any shell</span>
<span class="cv">import</span> DeStore_DPP_Flow <span class="cv">from</span> <span class="cg">"./DeStore_DPP_Flow"</span>

<span class="cc">// Render as full-page panel or in an iframe tab</span>
<span class="cb">&lt;DeStore_DPP_Flow /&gt;</span>

<span class="cc">// Route: /dev/dpp-flow (Dev shell §13 nav item)</span>`}</div>
      </Sec>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${C.bdr}`,marginTop:80,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div>
            <Logo fill="#ffffff" width={100}/>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>© DeStore Network · Developer Guide v1.0 · March 2026</div>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <Chip color={C.green}>Base · Thirdweb · n8n</Chip>
            <Chip color={C.violet}>Claude API · Docker</Chip>
            <Chip color={C.orange}>Circular Trade Infrastructure</Chip>
          </div>
        </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN — Tabbed Shell
═══════════════════════════════════════════════════════════════ */

/* ─── Standalone Shell ──────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);
  const NAV = NAV_DEV;
  const ACCENT = "#28B79D";

  const scrollTo = (id) => {
    setActiveNav(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <div style={{ minHeight:"100vh", background:C.d0, fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#fff" }}>
      <style>{CSS}</style>

      {/* TOPBAR */}
      <div style={{ position:"sticky", top:0, zIndex:300,
        background:`${C.d1}f4`, backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.bdr}` }}>
        <div className="topbar-logo-row" style={{ padding:"0 20px", height:52,
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button className="ham-btn" onClick={()=>setSidebarOpen(o=>!o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
            <Logo fill="#ffffff" width={120}/>
          </div>
          <Chip color={ACCENT}>⚡ Developer Guide</Chip>
        </div>
        <div style={{ height:3, background:`linear-gradient(90deg,${ACCENT},transparent)` }}/>
      </div>

      <div style={{ display:"flex" }}>
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={()=>setSidebarOpen(false)}/>
        )}

        {/* SIDEBAR */}
        <aside className={`sidebar-panel${sidebarOpen?" open":""}`} style={{
          width:220, flexShrink:0, position:"sticky", top:52,
          height:"calc(100vh - 52px)", overflowY:"auto",
          background:C.d1, borderRight:`1px solid ${C.bdr}`,
          paddingTop:20, paddingBottom:40,
        }}>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em",
            textTransform:"uppercase", color:C.muted, padding:"0 18px 12px" }}>
            Developer Guide
          </div>
          {NAV.map(n => (
            <button key={n.id}
              className={`nav-btn${activeNav===n.id?" active":""}`}
              style={{
                borderLeftColor: activeNav===n.id ? ACCENT : "transparent",
                color: activeNav===n.id ? ACCENT : undefined,
                background: activeNav===n.id ? `${ACCENT}10` : undefined,
              }}
              onClick={()=>scrollTo(n.id)}>
              <div className="nav-dot" style={{
                background: activeNav===n.id ? ACCENT : undefined,
                boxShadow: activeNav===n.id ? `0 0 7px ${ACCENT}` : undefined,
              }}/>
              {n.label}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="main-content" ref={mainRef}
          style={{ flex:1, overflowY:"auto", height:"calc(100vh - 52px)" }}
          onScroll={()=>{
            for (let i=NAV.length-1; i>=0; i--) {
              const el = document.getElementById(NAV[i].id);
              if (el && el.getBoundingClientRect().top < 160) {
                setActiveNav(NAV[i].id);
                break;
              }
            }
          }}>
          <DevGuideContent/>
        </main>
      </div>
    </div>
  );
}
