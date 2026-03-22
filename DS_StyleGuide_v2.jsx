import { useState, useRef, useEffect } from "react";

/* ═════════════════════════════════════════════════════════════════════
   AGENT: NOVA — Visual Systems Architect
   ─────────────────────────────────────────────────────────────────────
   Background : 17 years in brand systems, design tokens, and visual language at scale. Ex-Figma design systems lead. Built token pipelines for Fortune 100 brands. Obsessive about pixel-perfect consistency and the gap between spec and shipped product.
   Domain     : See guide content below.
   Audit Prompt:
     You are NOVA, DeStore's Visual Systems Architect with 17 Years of
     experience. Enforces: colour tokens · typography rules · button variants · motion system · logo rules · conic border spec · dark surface scale. Zero tolerance for off-token hex or rogue fonts. Reports every violation with RULE BROKEN · FILE · LINE · FIX.
   ═════════════════════════════════════════════════════════════════════ */

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
      {/* ── AGENT: NOVA ─────────────────────────────────────────── */}
      <div style={{ background:`linear-gradient(135deg,#B354F118,#B354F106)`,
        border:`1.5px solid #B354F140`, borderRadius:16, padding:"22px 28px",
        marginBottom:48, marginTop:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:20 }}>
          <div style={{ flexShrink:0, width:52, height:52, borderRadius:12,
            background:`#B354F118`, border:`1.5px solid #B354F140`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22, fontWeight:900, color:"#B354F1" }}>
            ◈
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6, flexWrap:"wrap" }}>
              <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.14em",
                textTransform:"uppercase", color:"#B354F1" }}>Guardian Agent</div>
              <div style={{ fontSize:10, color:"#6b6b80", background:"#1c1c22",
                border:"1px solid #2e2e38", borderRadius:4, padding:"2px 8px",
                fontFamily:"'JetBrains Mono',monospace" }}>
                17 Years
              </div>
            </div>
            <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.4px", marginBottom:3 }}>
              NOVA
            </div>
            <div style={{ fontSize:12, color:"#9999b0", marginBottom:12 }}>
              Visual Systems Architect
            </div>
            <div style={{ fontSize:11, color:"#6b6b80", lineHeight:1.8,
              paddingTop:12, borderTop:"1px solid #2e2e38" }}>
              17 years in brand systems, design tokens, and visual language at scale. Ex-Figma design systems lead. Built token pipelines for Fortune 100 brands. Obsessive about pixel-perfect consistency and the gap between spec and shipped product.
            </div>
            <div style={{ marginTop:12, padding:"10px 14px",
              background:`#B354F10c`, border:`1px solid #B354F125`,
              borderRadius:9, fontSize:11, color:"#9999b0", lineHeight:1.7 }}>
              <span style={{ color:"#B354F1", fontWeight:800 }}>Audit mandate: </span>
              Enforces: colour tokens · typography rules · button variants · motion system · logo rules · conic border spec · dark surface scale. Zero tolerance for off-token hex or rogue fonts. Reports every violation with RULE BROKEN · FILE · LINE · FIX.
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
          <Chip color={C.green}>ESPR Ready</Chip>
          <Chip>Plus Jakarta Sans</Chip>
          <Chip>Base · Thirdweb</Chip>
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
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:C.violet }}>◈ DPP · #B354F1 · Base · 0x4f2d</span>
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
          <Chip color={C.orchid}>◈ Base</Chip>
          <Chip color={C.violet} border={C.violet+"40"}>⬡ Polygon</Chip>
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
              <div style={{ color:C.dim,fontSize:12,lineHeight:1.5 }}>3 product images retrieved from your Digital Product Passport. Product record minted at manufacture on Base.</div>
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
            ["Product Record","Base ERC-721","Minted once at manufacture. Never transfers. Stores DPP data permanently."],
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
            ["Payments","USDC · Base/Polygon/Soneium","Native chain payments · no fiat rails"],
            ["DPP minting","Base ERC-721","Minted at manufacture via n8n workflow"],
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
Positioning: <span class="cw">Circular economy infrastructure. Not a marketplace.</span>
Survivability: <span class="cw">Base keeps running. DPP Token on Base — no DeStore infra needed to read it.</span>

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

/* ─── Standalone Shell ──────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);
  const NAV = NAV_STYLE;
  const ACCENT = "#B354F1";

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
          <Chip color={ACCENT}>◈ Style Guide</Chip>
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
            Style Guide
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
          <StyleGuideContent/>
        </main>
      </div>
    </div>
  );
}
