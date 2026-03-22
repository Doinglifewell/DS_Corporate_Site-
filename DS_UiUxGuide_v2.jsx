import { useState, useRef, useEffect } from "react";

/* ═════════════════════════════════════════════════════════════════════
   AGENT: FLUX — Senior UX Engineer & Interaction Designer
   ─────────────────────────────────────────────────────────────────────
   Background : 16 years in UX engineering, motion design, and consumer product design. Ex-Vercel design systems, Apple HIG contributor. Translates brand emotion into physics — timing curves, micro-interactions, and the specific weight of a button press.
   Domain     : See guide content below.
   Audit Prompt:
     You are FLUX, DeStore's Senior UX Engineer & Interaction Designer with 16 Years of
     experience. Enforces: spring physics on all transitions · shimmer not spinners · all 6 button states · 44px min tap targets · bottom sheets on mobile · single primary CTA per view · Nova Wallet benchmark met. 'If I see a spinner, I will find you.'
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
  { id:"profun",  label:"16 · Pro/Fun Mode ✦" },
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
  { id:"ux-profun",  label:"12 · Pro / Fun Mode ★" },
  { id:"ux-receipt",  label:"13 · Receipt Email ★" },
  { id:"ux-responsive", label:"14 · Responsive System ★" },
];


/* ═══════════════════════════════════════════════════════════════
   STYLE GUIDE CONTENT
═══════════════════════════════════════════════════════════════ */
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
/* ─── BreakpointDemo — live interactive responsive ruler ─── */
function BreakpointDemo() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [simW, setSimW] = useState(1280);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  const BPS = [
    { name:"xs",  min:0,    max:479,  col:"#FF1B9A", icon:"📱" },
    { name:"sm",  min:480,  max:767,  col:"#FF9F46", icon:"📱" },
    { name:"md",  min:768,  max:1023, col:"#B354F1", icon:"💻" },
    { name:"lg",  min:1024, max:1279, col:"#28B79D", icon:"🖥️" },
    { name:"xl",  min:1280, max:9999, col:"#79b8ff", icon:"🖥️" },
  ];

  const activeBp = BPS.find(b => simW >= b.min && simW <= b.max) || BPS[4];
  const cols = simW >= 1280 ? 4 : simW >= 1024 ? 3 : simW >= 480 ? 2 : 1;

  return (
    <div style={{ background:"#141418", border:"1px solid #2e2e38", borderRadius:14, overflow:"hidden" }}>
      {/* Ruler */}
      <div style={{ padding:"16px 20px 10px", borderBottom:"1px solid #2e2e38" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#9999b0" }}>Simulate width</div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:activeBp.col, fontWeight:800 }}>
            {simW}px — <span style={{ background:`${activeBp.col}18`, border:`1px solid ${activeBp.col}40`, borderRadius:4, padding:"1px 7px" }}>{activeBp.name.toUpperCase()}</span>
          </div>
        </div>
        <input type="range" min={320} max={1600} value={simW}
          onChange={e => setSimW(Number(e.target.value))}
          style={{ width:"100%", accentColor:activeBp.col, cursor:"pointer", height:4 }}
        />
        {/* Breakpoint markers */}
        <div style={{ position:"relative", height:20, marginTop:2 }}>
          {BPS.slice(1).map(b => (
            <div key={b.name} style={{
              position:"absolute",
              left:`${((b.min - 320) / (1600 - 320)) * 100}%`,
              top:0, display:"flex", flexDirection:"column", alignItems:"center"
            }}>
              <div style={{ width:1, height:8, background:b.col, opacity:0.5 }}/>
              <div style={{ fontSize:8, color:b.col, fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>{b.min}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actual window width */}
      <div style={{ padding:"10px 20px", background:"#0d0d10", borderBottom:"1px solid #2e2e38",
        display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ fontSize:10, color:"#6b6b80" }}>Your actual window:</div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#e0e0f0", fontWeight:700 }}>{width}px</div>
        {BPS.map(b => (
          <div key={b.name} style={{
            fontSize:10, fontWeight:800, letterSpacing:"0.06em",
            color: width >= b.min && width <= b.max ? b.col : "#3a3a4a",
            background: width >= b.min && width <= b.max ? `${b.col}15` : "transparent",
            border: `1px solid ${width >= b.min && width <= b.max ? b.col+"40" : "#2e2e38"}`,
            borderRadius:4, padding:"2px 7px", transition:"all .2s"
          }}>{b.icon} {b.name}</div>
        ))}
      </div>

      {/* Simulated layout preview */}
      <div style={{ padding:"16px 20px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#6b6b80", marginBottom:10 }}>
          Layout preview at {simW}px — {cols} col{cols > 1 ? "s" : ""} · {
            simW < 768 ? "sidebar: off-canvas" : simW < 1024 ? "sidebar: off-canvas" : "sidebar: pinned"
          }
        </div>
        {/* Mock layout */}
        <div style={{ display:"flex", gap:8, height:120, borderRadius:10, overflow:"hidden",
          border:"1px solid #2e2e3860" }}>
          {/* Sidebar simulation */}
          {simW >= 1024 && (
            <div style={{ width:60, background:"#1c1c22", flexShrink:0, borderRight:"1px solid #2e2e38",
              display:"flex", flexDirection:"column", gap:4, padding:8 }}>
              {[...Array(4)].map((_,i) => (
                <div key={i} style={{ height:8, borderRadius:3,
                  background: i===0 ? "#B354F1" : "#2e2e38", width:"80%" }}/>
              ))}
            </div>
          )}
          {/* Content area */}
          <div style={{ flex:1, padding:8, overflow:"hidden" }}>
            {/* Topbar mock */}
            <div style={{ height:14, borderRadius:4, background:"#1c1c22",
              marginBottom:8, display:"flex", gap:4, alignItems:"center", padding:"0 6px" }}>
              {simW < 1024 && <div style={{ width:8,height:6,borderRadius:1,background:"#3a3a4a" }}/>}
              <div style={{ width:30, height:5, borderRadius:2, background:"#B354F1", opacity:.7 }}/>
            </div>
            {/* Grid mock */}
            <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:4 }}>
              {[...Array(cols * 2)].map((_,i) => (
                <div key={i} style={{ height:28, borderRadius:6, background:"#26262e",
                  border:"1px solid #2e2e38" }}/>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop:10, display:"flex", gap:8, flexWrap:"wrap" }}>
          {[
            `Grid: ${cols} col${cols>1?"s":""}`,
            simW < 768 ? "Bottom sheet actions" : "Modal actions",
            simW < 1024 ? "Sidebar: hamburger" : "Sidebar: pinned",
            simW < 480 ? "Labels: hidden" : "Labels: visible",
          ].map(t => (
            <div key={t} style={{ fontSize:10, color:activeBp.col,
              background:`${activeBp.col}12`, border:`1px solid ${activeBp.col}25`,
              borderRadius:4, padding:"2px 8px", fontFamily:"'JetBrains Mono',monospace" }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      {/* ── AGENT: FLUX ─────────────────────────────────────────── */}
      <div style={{ background:`linear-gradient(135deg,#00c8ff18,#00c8ff06)`,
        border:`1.5px solid #00c8ff40`, borderRadius:16, padding:"22px 28px",
        marginBottom:48, marginTop:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:20 }}>
          <div style={{ flexShrink:0, width:52, height:52, borderRadius:12,
            background:`#00c8ff18`, border:`1.5px solid #00c8ff40`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22, fontWeight:900, color:"#00c8ff" }}>
            ◈
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6, flexWrap:"wrap" }}>
              <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.14em",
                textTransform:"uppercase", color:"#00c8ff" }}>Guardian Agent</div>
              <div style={{ fontSize:10, color:"#6b6b80", background:"#1c1c22",
                border:"1px solid #2e2e38", borderRadius:4, padding:"2px 8px",
                fontFamily:"'JetBrains Mono',monospace" }}>
                16 Years
              </div>
            </div>
            <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.4px", marginBottom:3 }}>
              FLUX
            </div>
            <div style={{ fontSize:12, color:"#9999b0", marginBottom:12 }}>
              Senior UX Engineer &amp; Interaction Designer
            </div>
            <div style={{ fontSize:11, color:"#6b6b80", lineHeight:1.8,
              paddingTop:12, borderTop:"1px solid #2e2e38" }}>
              16 years in UX engineering, motion design, and consumer product design. Ex-Vercel design systems, Apple HIG contributor. Translates brand emotion into physics — timing curves, micro-interactions, and the specific weight of a button press. Believes the difference between a good product and a great one is 120ms and one spring curve.
            </div>
            <div style={{ marginTop:12, padding:"10px 14px",
              background:`#00c8ff0c`, border:`1px solid #00c8ff25`,
              borderRadius:9, fontSize:11, color:"#9999b0", lineHeight:1.7 }}>
              <span style={{ color:"#00c8ff", fontWeight:800 }}>Audit mandate: </span>
              Enforces: spring physics on all transitions · shimmer not spinners · all 6 button states · 44px min tap targets · bottom sheets on mobile · single primary CTA per view · Nova Wallet benchmark met. Reports: PATTERN VIOLATED · COMPONENT · SEVERITY · FIX. "If I see a spinner, I will find you."
            </div>
          </div>
        </div>
      </div>
      {/* ── End Agent Header ────────────────────────────────────────── */}

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
      <UxSec id="ux-nova" n="09" title="Nova Wallet — UI Inspiration" sub="Nova Wallet is an exceptionally well-crafted product — we benchmark our UI quality against it">
        <div style={{ background:"rgba(107,107,128,0.08)", border:"1px solid rgba(107,107,128,0.2)", borderRadius:12, padding:"14px 18px", marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:800, color:"#e8e8f0", marginBottom:6 }}>Why Nova Wallet</div>
          <div style={{ fontSize:12, color:C.muted, lineHeight:1.8 }}>
            Nova Wallet is one of the most polished crypto wallets available — exceptional motion design, a production-grade dark UI system, and mobile interaction patterns that feel native on both iOS and Android. DeStore is not a wallet and does not share Nova's blockchain stack, but we use Nova as our UI quality benchmark. If it looks and feels as good as Nova Wallet, we're at the right level.
          </div>
        </div>
        <div style={{ background:"rgba(107,107,128,0.06)", border:"1px solid rgba(107,107,128,0.15)", borderRadius:12, padding:"12px 16px", marginBottom:20, fontSize:11, color:C.muted, lineHeight:1.7 }}>
          <strong style={{ color:"#e8e8f0" }}>Note:</strong> Nova Wallet is built on the Polkadot/Substrate stack — a completely different blockchain to DeStore's Base/EVM architecture. We reference Nova purely as a UI quality benchmark, not a technical one. The iOS/Android implementation details are Nova's, not ours. We build in React/Next.js. The patterns below are what we take as UI inspiration and how we implement the equivalent in our stack.
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
                        ["WalletConnect v2","Thirdweb ConnectButton","Thirdweb abstracts both CC + crypto — reduces UX friction"],
            ["sr25519/ed25519 crypto (Rust)","secp256k1 (EVM standard)","EVM signature standard — same performance target"],
            ["In-app Ledger hardware wallet","Thirdweb hardware wallet connect","Same UX — Thirdweb SDK handles connection layer"],
            ["Auto cross-chain routing","Base primary · Polygon · Base — brand selects","Multi-chain support via Thirdweb — brand selects at onboarding"],
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


        {/* ── §12 PRO / FUN MODE ── */}
        <UxSec id="ux-profun" n="12" title="Pro / Fun Mode" sub="One toggle — two personalities. Every DeStore UI ships with both. Corporate and consumer in the same build.">

          {/* Why */}
          <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
            <div style={{ flex:"1 1 240px", background:C.d2, border:`1px solid ${C.violet}25`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.violet, marginBottom:8, letterSpacing:"0.08em" }}>WHY THIS PATTERN EXISTS</div>
              <div style={{ fontSize:11, color:C.dim, lineHeight:1.7 }}>
                DeStore serves procurement officers at global brands <em>and</em> consumers scanning a QR code in a store. The same product data, same DPP, same blockchain — but the presentation layer needs to speak both languages. Pro/Fun mode solves this without maintaining two codebases.
              </div>
            </div>
            <div style={{ flex:"1 1 240px", background:C.d2, border:`1px solid ${C.orange}25`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.orange, marginBottom:8, letterSpacing:"0.08em" }}>THE RULE</div>
              <div style={{ fontSize:11, color:C.dim, lineHeight:1.7 }}>
                Every UI that a human interacts with ships with a Pro/Fun toggle. The toggle is always visible — never hidden behind a settings menu. Default is Pro. Fun is opt-in. The underlying data, functionality, and blockchain state are <strong style={{ color:"#e0e0f0" }}>always identical</strong>.
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Mode comparison</div>
          <div style={{ overflowX:"auto", marginBottom:24 }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11, minWidth:480 }}>
              <thead>
                <tr style={{ background:C.d3 }}>
                  {["Element", "◈ PRO", "✦ FUN"].map((h,i) => (
                    <th key={i} style={{ padding:"9px 14px", textAlign:"left", fontWeight:800, color:i===1?"#c8c8e0":i===2?C.violet:C.muted, borderBottom:`1px solid ${C.bdr}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Typeface",      "Cormorant Garamond (serif) · 400/600",          "Fredoka One (rounded) · 400"],
                  ["Body copy",     "Plus Jakarta Sans — always",                    "Plus Jakarta Sans — always"],
                  ["Product icons", "Lucide icons (open source, ISC licence) — Footprints, Wind, Scissors, Shirt, Package per category", "Emoji 👟 🧥 👖 🏔️ 👕"],
                  ["Action icons",  "Lucide: Tag (sell) · Gift · Recycle2 · CornerDownLeft (return) — strokeWidth 1.8", "Emoji  💸 🎁 ♻️ ↩️"],
                  ["Card style",    "Rotating conic-gradient border (spin-border)",   "Holographic foil — animated rainbow shimmer"],
                  ["Toast copy",    "Terse, functional: 'Transfer initiated'",        "Warm + emoji: '✓ Gift transfer started 🎉'"],
                  ["Search hint",   "'Search products, brands…'",                     "'Find your stuff…'"],
                  ["Section title", "'All Assets'",                                    "'All My Stuff ✨'"],
                  ["Nav title",     "'DeAR · My Assets'",                              "'My Stuff ✨'"],
                  ["Wallet card ID","'◈ DeAR WALLET'",                                 "'✦ DeAR ✦'"],
                  ["Empty state",   "◈  No results for…",                              "🔍  No results for…"],
                ].map(([el, pro, fun]) => (
                  <tr key={el} style={{ borderBottom:`1px solid ${C.bdr}20` }}>
                    <td style={{ padding:"8px 14px", fontWeight:700, color:C.muted, fontSize:10, whiteSpace:"nowrap" }}>{el}</td>
                    <td style={{ padding:"8px 14px", color:"#c8c8e0", fontSize:11 }}>{pro}</td>
                    <td style={{ padding:"8px 14px", color:C.violet, fontSize:11 }}>{fun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Toggle anatomy */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Toggle anatomy</div>
          <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
            {[
              { label:"Placement", val:"Top of screen — always. Never in settings or a hamburger menu. Visible on first paint.", col:C.orange },
              { label:"Default",   val:"Pro — conservative default for corporate demos, procurement sign-off, and brand dashboards.", col:C.violet },
              { label:"Pill shape",val:"Two-segment pill: left = Pro (rounded left), right = Fun (rounded right). No gap between segments.", col:C.green },
              { label:"Active Pro",val:"background #202123 · Cormorant Garamond · '◈ Pro' · border rgba(255,255,255,0.2)", col:"#c8c8e0" },
              { label:"Active Fun",val:"background gradient(90deg, #B354F1, #FF9F46) · Fredoka One · '✦ Fun' · border: none", col:C.violet },
              { label:"Inactive",  val:"background transparent · color #8b8fa8 (muted) · same font as active state for that button", col:C.muted },
            ].map(({ label, val, col }) => (
              <div key={label} style={{ flex:"1 1 200px", background:C.d2, border:`1px solid ${col}25`, borderRadius:10, padding:"11px 13px" }}>
                <div style={{ fontSize:10, fontWeight:800, color:col, marginBottom:5, letterSpacing:"0.07em" }}>{label}</div>
                <div style={{ fontSize:10, color:C.dim, lineHeight:1.6 }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Card mode detail */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Wallet card — mode variants</div>
          <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
            <div style={{ flex:1, background:C.d2, border:`1px solid #321B6840`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#c8c8e0", marginBottom:8 }}>◈ PRO CARD</div>
              <div style={{ fontSize:10, color:C.dim, lineHeight:1.8 }}>
                Uses the DeStore signature spin-border — rotating conic-gradient<br/>
                <code style={{ color:C.violet, fontSize:9 }}>background: conic-gradient(from var(--angle), #B354F1, #6a14db, #00c8ff, #B354F1 40%, #321b68 60%)</code><br/>
                Inner face: <code style={{ color:C.violet, fontSize:9 }}>linear-gradient(135deg, #111114, #1e1e28, #2a1f4a)</code><br/>
                Asset count in Cormorant Garamond 32px<br/>
                Chip element · wallet label in uppercase tracked caps
              </div>
            </div>
            <div style={{ flex:1, background:C.d2, border:`1px solid ${C.violet}30`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.violet, marginBottom:8 }}>✦ FUN CARD — HOLOGRAPHIC FOIL</div>
              <div style={{ fontSize:10, color:C.dim, lineHeight:1.8 }}>
                Full-card animated rainbow foil — <code style={{ color:C.violet, fontSize:9 }}>@keyframes foil</code><br/>
                <code style={{ color:C.violet, fontSize:9 }}>background: linear-gradient(135deg, #ff9ff3, #ffd6a5, #fdffb6, #caffbf, #9bf6ff, #a0c4ff, #bdb2ff, #ffc6ff)</code><br/>
                <code style={{ color:C.violet, fontSize:9 }}>background-size: 300% 300% · animation: foil 4s ease infinite</code><br/>
                Card body overlay: <code style={{ color:C.violet, fontSize:9 }}>background: rgba(0,0,0,0.35)</code> — content readable over foil<br/>
                Asset count in Fredoka One 30px with text-shadow glow
              </div>
            </div>
          </div>

          {/* Where to apply */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Where Pro/Fun applies — all consumer-facing UIs</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
            {[
              { label:"DeAR Wallet",         status:"✓ Built",    col:C.green,  note:"Reference implementation. See DeAR_wallet.jsx" },
              { label:"DPP Landing Page",    status:"→ Required", col:C.orange, note:"Consumer scans QR — lands in Fun by default. Pro available via toggle." },
              { label:"Demo flow",           status:"→ Required", col:C.orange, note:"Demo DPP creation + wallet pass delivery. Fun default to delight first-time visitors." },
              { label:"DeCam Scanner",       status:"→ Required", col:C.orange, note:"Scan screen + result display. Fun = emoji feedback. Pro = status symbols." },
              { label:"Brand Dashboard",     status:"Pro only",   col:C.muted,  note:"Internal brand tooling. Pro mode only — no Fun toggle on back-office UIs." },
              { label:"DeStore Admin",       status:"Pro only",   col:C.muted,  note:"Super admin, webmaster. Pro only." },
            ].map(({ label, status, col, note }) => (
              <div key={label} style={{ flex:"1 1 180px", background:C.d2, border:`1px solid ${col}25`, borderRadius:10, padding:"11px 13px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#d8d8f0" }}>{label}</div>
                  <div style={{ fontSize:9, fontWeight:800, color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"2px 6px" }}>{status}</div>
                </div>
                <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>{note}</div>
              </div>
            ))}
          </div>

          {/* Code pattern */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:10 }}>Implementation pattern — copy from DeAR wallet</div>
          <div className="code">{`<span class="cm">// 1. State</span>
<span class="cb">const</span> [mode, setMode] = useState(<span class="cs">"pro"</span>); <span class="cm">// "pro" | "fun" — Pro is always default</span>
<span class="cb">const</span> isPro = mode === <span class="cs">"pro"</span>;

<span class="cm">// 2. Toggle — always at top of screen</span>
<span class="cb">&lt;div</span> className=<span class="cs">"mode-bar"</span><span class="cb">&gt;</span>
  <span class="cb">&lt;button</span> className={<span class="cs">\`mode-btn \${isPro ? "active-pro" : "inactive"}\`</span>} onClick={() =&gt; setMode(<span class="cs">"pro"</span>)}<span class="cb">&gt;</span>
    {isPro ? <span class="cs">"◈ Pro"</span> : <span class="cs">"Pro"</span>}
  <span class="cb">&lt;/button&gt;</span>
  <span class="cb">&lt;button</span> className={<span class="cs">\`mode-btn \${!isPro ? "active-fun" : "inactive"}\`</span>} onClick={() =&gt; setMode(<span class="cs">"fun"</span>)}<span class="cb">&gt;</span>
    {!isPro ? <span class="cs">"✦ Fun"</span> : <span class="cs">"Fun"</span>}
  <span class="cb">&lt;/button&gt;</span>
<span class="cb">&lt;/div&gt;</span>

<span class="cm">// 3. Mode-aware rendering — same data, different skin</span>
<span class="cm">// Pro: Lucide icons (import { Tag, Gift, RotateCcw, CornerDownLeft } from "lucide-react")
<span class="cm">// All styles inline — no CSS string injection (required for artifact sandbox compatibility)</span></span>
<span class="cb">&lt;div</span> className={isPro ? <span class="cs">"row-thumb-pro"</span> : <span class="cs">"row-thumb-fun"</span>}<span class="cb">&gt;</span>
  {isPro ? product.proIcon : product.funIcon}
<span class="cb">&lt;/div&gt;</span>

<span class="cm">// 4. Mode-aware copy</span>
<span class="cb">const</span> ACTIONS = {
  pro: [{ key:<span class="cs">"sell"</span>, icon:<span class="cs">"$"</span>,  label:<span class="cs">"Sell"</span>, toast:<span class="cs">"Listing created · DeStore Marketplace"</span> }],
  fun: [{ key:<span class="cs">"sell"</span>, icon:<span class="cs">"💸"</span>, label:<span class="cs">"Sell"</span>, toast:<span class="cs">"✓ Listing started on DeStore!"</span> }],
};
<span class="cb">const</span> actions = ACTIONS[mode]; <span class="cm">// active set switches with toggle</span>`}</div>

          <div style={{ marginTop:16, padding:"10px 14px", background:`${C.violet}08`, border:`1px solid ${C.violet}20`, borderRadius:8, fontSize:10, color:C.dim, lineHeight:1.7 }}>
            <strong style={{ color:C.violet }}>Reference file:</strong> DeAR_wallet.jsx — the canonical Pro/Fun implementation. Copy the mode-bar CSS, the ACTIONS object pattern, and the card CSS variants as the starting point for any new consumer UI.
          </div>

        </UxSec>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${C.bdr}`,marginTop:80,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div>
            <Logo fill="#ffffff" width={100}/>
            <div style={{ fontSize:11,color:C.muted,marginTop:8 }}>© DeStore Network · UI/UX Guide v1.2 · March 2026 · Circular Trade Infrastructure</div>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <Chip color={C.green}>ButtonLab + PriceBadges — compliance-checked</Chip>
            <Chip color={C.violet}>Nova Wallet benchmark</Chip>
            <Chip color={C.pink}>Pro / Fun Mode ★</Chip>
            <Chip color={C.orange}>Receipt Email ★</Chip>
          </div>
        </div>
      </UxSec>

        {/* ── §13 RECEIPT EMAIL ── */}
        <UxSec id="ux-receipt" n="13" title="Receipt Email" sub="Co-branded transactional email. DeStore infrastructure + client brand skin. Fires on every GS1 QR scan → purchase. Wallet pass CTA is primary — email is the fallback.">

          {/* 5-block structure */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>5-block structure — in order</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:24 }}>
            {[
              { n:"01", label:"Hero",          color:C.violet, desc:"Co-brand header (DeStore logo left · client badge right) · confirmation headline · sub-copy. Hero gradient is client-skinned." },
              { n:"02", label:"Wallet CTA",    color:C.green,  desc:"Apple Wallet (.pkpass) and Google Wallet (JWT) are equal-first. DeAR Wallet deep-link is third. Pass delivery is the primary action — email is the fallback if no wallet app." },
              { n:"03", label:"Product Card",  color:C.orange, desc:"Brand · product name · Authenticated pill · On-chain pill · DPP ID pill · price. Product image placeholder is an emoji (email-safe, zero weight)." },
              { n:"04", label:"DPP Data Grid", color:C.pink,   desc:"6 fields: material · origin · carbon · purchase date · resale estimate · condition. Chain bar: anchored to Ethereum · minted on Base · event count." },
              { n:"05", label:"Action Buttons",color:C.violet, desc:"4 buttons — identical to DeAR wallet: Sell (green) · Gift (violet) · Recycle (green2) · Return (orange). Each deep-links to DeAR.link/{dppId}. Every tap = $0.01 → B&B Treasury." },
            ].map(({ n, label, color, desc }) => (
              <div key={n} style={{ display:"flex", gap:12, alignItems:"flex-start", background:C.d2, border:`1px solid ${color}25`, borderRadius:10, padding:"12px 14px" }}>
                <div style={{ fontSize:9, fontWeight:800, color:color, background:`${color}15`, border:`1px solid ${color}30`, borderRadius:4, padding:"2px 6px", flexShrink:0, marginTop:1 }}>{n}</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#e8e8f0", marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Logo rule + skin system */}
          <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
            <div style={{ flex:"1 1 220px", background:C.d2, border:`1px solid ${C.violet}25`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.violet, marginBottom:8, letterSpacing:"0.08em" }}>LOGO RULE</div>
              <div style={{ fontSize:11, color:C.dim, lineHeight:1.7 }}>
                Always inline the real SVG path data — <strong style={{ color:"#e0e0f0" }}>Primary Reversed</strong> (white + violet on dark) for the hero header. Never use an img tag. Never use SVG text elements. The logo must render with <strong style={{ color:"#e0e0f0" }}>zero network requests</strong>. Source: DeStore_Logo_RGB_02_Primary_Reversed.svg.
              </div>
            </div>
            <div style={{ flex:"1 1 220px", background:C.d2, border:`1px solid ${C.orange}25`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.orange, marginBottom:8, letterSpacing:"0.08em" }}>BRAND SKIN SYSTEM</div>
              <div style={{ fontSize:11, color:C.dim, lineHeight:1.7 }}>
                CSS vars control the client layer: <code style={{ color:C.violet, fontSize:10 }}>--brand-primary</code> · <code style={{ color:C.violet, fontSize:10 }}>--brand-secondary</code> · <code style={{ color:C.violet, fontSize:10 }}>--brand-accent</code>. DeStore logo is a <strong style={{ color:"#e0e0f0" }}>fixed asset — never recoloured</strong> for clients. Confirmed skins: DeStore · Nike · Apple · Patagonia.
              </div>
            </div>
          </div>

          {/* Technical rules */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Technical constraints</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
            {[
              ["Format",      "Pure HTML + inline CSS", C.green],
              ["Fonts",       "system-ui fallback only — no @import", C.green],
              ["Images",      "Inline SVG logo only — no external img", C.green],
              ["Weight",      "Target under 100kb total", C.orange],
              ["Render test", "Gmail · Apple Mail · Outlook", C.violet],
              ["Production",  "No JS — skin server-rendered via Handlebars / MJML", C.pink],
            ].map(([l,v,col]) => (
              <div key={l} style={{ flex:"1 1 140px", background:"#141418", border:`1px solid ${col}25`, borderRadius:9, padding:"9px 12px" }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", color:C.muted, marginBottom:3 }}>{l}</div>
                <div style={{ fontSize:11, color:"#c8c8d8", lineHeight:1.5 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background:`${C.violet}08`, border:`1px solid ${C.violet}20`, borderRadius:10, padding:"11px 14px", fontSize:11, color:C.muted }}>
            Reference: <strong style={{ color:C.violet }}>destore-receipt-email.html</strong> — live brand skin switcher included (demo only, strip in production). Real SVG path data from DeStore_Logo_RGB_02_Primary_Reversed.svg embedded in header and footer.
          </div>

        </UxSec>

        {/* ── §14 RESPONSIVE SYSTEM ── */}
        <UxSec id="ux-responsive" n="14" title="Responsive System" sub="Breakpoints · fluid type · adaptive layouts · component specs for every screen. Every DeStore UI ships responsive-first.">

          {/* ── LIVE BREAKPOINT DEMO ── */}
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:14 }}>Live breakpoint visualiser</div>
            <BreakpointDemo />
          </div>

          {/* ── BREAKPOINT TOKENS ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Breakpoint tokens</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:28 }}>
            {[
              { name:"xs",  px:"0 – 479px",    desc:"Single-column stack. Full-bleed everything. Bottom sheet actions. 16px padding.", col:C.pink,    icon:"📱" },
              { name:"sm",  px:"480 – 767px",  desc:"Still single-column. Can use 2-col grid for small cards. Side-by-side action buttons.", col:C.orange,  icon:"📱" },
              { name:"md",  px:"768 – 1023px", desc:"Sidebar collapses to off-canvas hamburger. 2–3 col card grid. Topbar fully expanded.", col:C.violet,  icon:"💻" },
              { name:"lg",  px:"1024 – 1279px",desc:"Full sidebar visible (220px). 3-col product grid. Split view for listing flow.", col:C.green,   icon:"🖥️" },
              { name:"xl",  px:"1280px+",      desc:"Max content width 1200px centred. 4-col product grid. Wide data tables unconstrained.", col:C.blue,    icon:"🖥️" },
            ].map(({ name, px, desc, col, icon }) => (
              <div key={name} style={{ display:"flex", gap:14, alignItems:"flex-start",
                background:C.d2, border:`1px solid ${col}30`, borderRadius:10, padding:"12px 16px" }}>
                <div style={{ flexShrink:0, width:48, height:48, borderRadius:9,
                  background:`${col}15`, border:`1px solid ${col}30`,
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2 }}>
                  <div style={{ fontSize:16 }}>{icon}</div>
                  <div style={{ fontSize:9, fontWeight:900, color:col, letterSpacing:"0.08em" }}>{name.toUpperCase()}</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:"#fff" }}>{name}</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:col }}>{px}</span>
                  </div>
                  <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CONTAINER SYSTEM ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Container system</div>
          <div className="code" style={{ marginBottom:24 }}>{`<span class="cm">/* ── Container tokens ─────────────────────────────── */</span>
<span class="cw">.container</span> {
  width: <span class="co">100%</span>;
  margin: <span class="co">0 auto</span>;
  padding: <span class="co">0 16px</span>;   <span class="cm">/* xs: 16px edge */</span>
}
<span class="cb">@media</span> (min-width: <span class="co">480px</span>)  { <span class="cw">.container</span> { padding: <span class="co">0 20px</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">768px</span>)  { <span class="cw">.container</span> { padding: <span class="co">0 32px</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1024px</span>) { <span class="cw">.container</span> { max-width: <span class="co">1200px</span>; padding: <span class="co">0 48px</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1280px</span>) { <span class="cw">.container</span> { padding: <span class="co">0 56px</span>; } }

<span class="cm">/* ── Sidebar-aware layout ──────────────────────────── */</span>
<span class="cw">.page-layout</span> { display: <span class="cb">flex</span>; }
<span class="cw">.sidebar</span>     { width: <span class="co">220px</span>; flex-shrink: <span class="co">0</span>; <span class="cm">/* lg+ only */</span> }
<span class="cw">.main-content</span>{ flex: <span class="co">1</span>; min-width: <span class="co">0</span>; overflow-y: <span class="cb">auto</span>; }

<span class="cb">@media</span> (max-width: <span class="co">1023px</span>) {
  <span class="cw">.sidebar</span> { position: <span class="cb">fixed</span>; left: <span class="co">-220px</span>; transition: <span class="co">left .25s</span>; z-index: <span class="co">200</span>; }
  <span class="cw">.sidebar.open</span> { left: <span class="co">0</span>; }
}`}</div>

          {/* ── FLUID TYPOGRAPHY ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Fluid typography scale</div>
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:8 }}>
            {[
              { role:"Hero heading",  xs:"28px / 900", md:"36px / 900", lg:"48px / 900", clamp:"clamp(28px, 4vw, 48px)" },
              { role:"Section title", xs:"18px / 900", md:"22px / 900", lg:"26px / 900", clamp:"clamp(18px, 2.5vw, 26px)" },
              { role:"Card title",    xs:"14px / 700", md:"15px / 700", lg:"16px / 700", clamp:"clamp(14px, 1.5vw, 16px)" },
              { role:"Body copy",     xs:"13px / 400", md:"13px / 400", lg:"14px / 400", clamp:"14px — fixed" },
              { role:"Label / chip",  xs:"10px / 800", md:"10px / 800", lg:"11px / 800", clamp:"10–11px — fixed" },
              { role:"Input value",   xs:"16px / 400", md:"14px / 400", lg:"14px / 400", clamp:"16px on mobile (prevent iOS zoom!)" },
            ].map(t => (
              <div key={t.role} style={{ display:"grid", gridTemplateColumns:"160px 90px 90px 90px 1fr", gap:10,
                alignItems:"center", padding:"7px 0", borderBottom:`1px solid ${C.bdr}28`, fontSize:11 }}>
                <span style={{ color:"#e0e0f0", fontWeight:600 }}>{t.role}</span>
                <span style={{ color:C.pink, fontFamily:"'JetBrains Mono',monospace", fontSize:10 }}>{t.xs}</span>
                <span style={{ color:C.violet, fontFamily:"'JetBrains Mono',monospace", fontSize:10 }}>{t.md}</span>
                <span style={{ color:C.green, fontFamily:"'JetBrains Mono',monospace", fontSize:10 }}>{t.lg}</span>
                <span style={{ color:C.muted, fontFamily:"'JetBrains Mono',monospace", fontSize:10 }}>{t.clamp}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:28, fontSize:10 }}>
            {[["📱 xs",C.pink],["💻 md",C.violet],["🖥️ lg",C.green]].map(([l,c])=>(
              <div key={l} style={{ display:"flex",alignItems:"center",gap:5,color:C.muted }}>
                <div style={{ width:10,height:10,borderRadius:2,background:c }}/>
                <span>{l}</span>
              </div>
            ))}
          </div>

          {/* ── TOPBAR RESPONSIVE SPEC ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Topbar — responsive spec</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:24 }}>
            {[
              { bp:"xs / sm  (< 768px)", spec:"52px height · Logo left · Hamburger right · Chip/badge hidden · Title hidden", col:C.pink },
              { bp:"md  (768–1023px)",   spec:"52px height · Logo left · Hamburger left of logo · Section chip visible · Actions right", col:C.orange },
              { bp:"lg+ (≥ 1024px)",     spec:"52px height · Logo left · No hamburger · Full section chip · Actions right", col:C.green },
            ].map(({ bp, spec, col }) => (
              <div key={bp} style={{ display:"flex", gap:14, alignItems:"flex-start",
                background:C.d2, border:`1px solid ${col}25`, borderRadius:9, padding:"11px 14px" }}>
                <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:col,
                  background:`${col}12`, border:`1px solid ${col}25`, borderRadius:4,
                  padding:"3px 8px", flexShrink:0, whiteSpace:"nowrap" }}>{bp}</code>
                <span style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{spec}</span>
              </div>
            ))}
          </div>

          {/* ── GRID SYSTEM ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Product grid — columns by breakpoint</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:24 }}>
            {[
              { bp:"xs",  cols:1, use:"Full-width stack",   col:C.pink   },
              { bp:"sm",  cols:2, use:"2-col cards",        col:C.orange },
              { bp:"md",  cols:2, use:"2-col (no sidebar)", col:C.violet },
              { bp:"lg",  cols:3, use:"3-col with sidebar", col:C.green  },
              { bp:"xl",  cols:4, use:"4-col max",          col:C.blue   },
            ].map(({ bp, cols, use, col }) => (
              <div key={bp} style={{ background:C.d3, border:`1px solid ${col}35`, borderRadius:10, padding:"12px 10px", textAlign:"center" }}>
                <div style={{ fontSize:9, fontWeight:900, color:col, letterSpacing:"0.1em", marginBottom:6 }}>{bp.toUpperCase()}</div>
                <div style={{ fontSize:26, fontWeight:900, color:"#fff", lineHeight:1 }}>{cols}</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:4 }}>col{cols>1?"s":""}</div>
                <div style={{ fontSize:9, color:C.dim, marginTop:6, lineHeight:1.4 }}>{use}</div>
              </div>
            ))}
          </div>
          <div className="code" style={{ marginBottom:24 }}>{`<span class="cm">/* ── Responsive grid — product cards ─── */</span>
<span class="cw">.product-grid</span> {
  display: <span class="cb">grid</span>;
  gap: <span class="co">12px</span>;
  grid-template-columns: <span class="co">1fr</span>;  <span class="cm">/* xs: 1 col */</span>
}
<span class="cb">@media</span> (min-width: <span class="co">480px</span>)  { <span class="cw">.product-grid</span> { grid-template-columns: <span class="co">repeat(2, 1fr)</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1024px</span>) { <span class="cw">.product-grid</span> { grid-template-columns: <span class="co">repeat(3, 1fr)</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1280px</span>) { <span class="cw">.product-grid</span> { grid-template-columns: <span class="co">repeat(4, 1fr)</span>; } }

<span class="cm">/* ── React / Tailwind equivalent ───────── */</span>
<span class="cp">&lt;div</span> className=<span class="cs">"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"</span><span class="cp">&gt;</span>`}</div>

          {/* ── COMPONENT ADAPTIVE SPECS ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Component adaptive specs</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
            {[
              {
                comp: "Card / Product Row",
                xs:   "Full-width. Horizontal layout: thumb left (56px) · text right. Tap anywhere to expand.",
                md:   "Grid card. Stacked: image top, info below. Aspect 1:1.1.",
                lg:   "Same grid card. Can show more meta (carbon, origin) inline.",
              },
              {
                comp: "Modal / Bottom Sheet",
                xs:   "Bottom sheet — slides up from bottom. 90vh max height. Drag handle top. Safe area bottom.",
                md:   "Centred modal — max-width 520px. Backdrop blur. Escape to close.",
                lg:   "Same centred modal or side panel for multi-step flows.",
              },
              {
                comp: "Step Indicator",
                xs:   "Icon-only circles (no labels). 28px diameter. Connector 24px.",
                md:   "Circles + labels below. 32px diameter.",
                lg:   "Full label row. 32px circles. Wider connectors.",
              },
              {
                comp: "DPP Banner",
                xs:   "Stacked: icon + headline top, 3 meta pills below in wrap.",
                md:   "Row: icon left, text centre, pills right.",
                lg:   "Same row. Wider padding. Can show 'Scan QR' CTA inline.",
              },
              {
                comp: "Action Buttons (Sell/Gift/Recycle/Return)",
                xs:   "2×2 grid. Icon + label. 44px min height.",
                md:   "4-in-a-row horizontal. Icon + label.",
                lg:   "4-in-a-row. Wider padding. Badge count on Sell button if active.",
              },
              {
                comp: "Topbar Chips / Badges",
                xs:   "Hidden — use bottom tab bar for navigation.",
                md:   "Section chip visible in topbar.",
                lg:   "Full chip + optional version/status badge.",
              },
            ].map(({ comp, xs, md, lg }) => (
              <div key={comp} style={{ background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:11, overflow:"hidden" }}>
                <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.bdr}`,
                  fontSize:12, fontWeight:800, color:"#e0e0f0" }}>{comp}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
                  {[["📱 xs",xs,C.pink],["💻 md",md,C.violet],["🖥️ lg",lg,C.green]].map(([label,text,col]) => (
                    <div key={label} style={{ padding:"10px 14px", borderRight:`1px solid ${C.bdr}28` }}>
                      <div style={{ fontSize:9, fontWeight:900, color:col, letterSpacing:"0.08em", marginBottom:5 }}>{label}</div>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── TOUCH & INTERACTION ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Touch & interaction rules</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
            {[
              { rule:"Tap targets",        spec:"44×44px minimum. 48×48px for primary actions. Never smaller.", col:C.green },
              { rule:"No hover-only UX",   spec:"Every interaction must work on touch. Hover is enhancement only.", col:C.green },
              { rule:"Input font size",    spec:"16px minimum on mobile — prevents iOS auto-zoom on focus.", col:C.orange },
              { rule:"Bottom safe area",   spec:"env(safe-area-inset-bottom) on fixed bottom bars. Required for iOS.", col:C.orange },
              { rule:"Scroll anchoring",   spec:"Sticky header 52px. Sticky bottom CTA. Content scrolls between.", col:C.violet },
              { rule:"Swipe gestures",     spec:"Swipe right on product row = quick sell. Swipe left = archive. Both optional.", col:C.violet },
              { rule:"Focus rings",        spec:"Always visible for keyboard/accessibility. Custom: 2px outline violet, 2px offset.", col:C.blue },
              { rule:"Tap feedback",       spec:"btn-press class on all tappables — scale(.97) opacity(.88) instant feedback.", col:C.green },
            ].map(({ rule, spec, col }) => (
              <div key={rule} style={{ background:C.d3, border:`1px solid ${col}25`, borderRadius:9, padding:"11px 14px" }}>
                <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:4 }}>{rule}</div>
                <div style={{ fontSize:11, color:C.dim, lineHeight:1.5 }}>{spec}</div>
              </div>
            ))}
          </div>

          {/* ── DO / DON'T ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Do / Don't</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
            {[
              { do:"Use CSS clamp() for fluid type between breakpoints",                           dont:"Hardcode separate px values in 6 different media queries for the same property" },
              { do:"Stack vertically on mobile — one column, clear hierarchy",                     dont:"Force desktop layouts to shrink — horizontal scrolling is a failure state" },
              { do:"Bottom sheet for all action menus on mobile",                                  dont:"Use a dropdown that hangs off the top or middle of the screen on touch devices" },
              { do:"Test every screen at 320px (iPhone SE), 390px (iPhone 14), 768px, 1440px",    dont:"Only test at 1440px and call it done" },
              { do:"Use Tailwind responsive prefixes: sm: md: lg: xl: — consistent and readable", dont:"Write custom breakpoints that drift from the token set above" },
              { do:"16px font on all inputs — without exception",                                  dont:"Use 14px inputs on mobile — iOS will zoom in and destroy the layout" },
              { do:"Sticky bottom CTA bar with safe area inset for iOS",                           dont:"Fixed buttons overlapping the home indicator on iPhone" },
            ].map(({ do: d, dont }, i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div className="do-card">
                  <div style={{ fontSize:9, fontWeight:900, color:C.green, letterSpacing:"0.1em", marginBottom:6 }}>✓ DO</div>
                  <div style={{ fontSize:11, color:"#d0f0e8", lineHeight:1.6 }}>{d}</div>
                </div>
                <div className="dont-card">
                  <div style={{ fontSize:9, fontWeight:900, color:C.pink, letterSpacing:"0.1em", marginBottom:6 }}>✗ DON'T</div>
                  <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{dont}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── READY CSS ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Copy-ready responsive CSS foundation</div>
          <div className="code" style={{ marginBottom:16 }}>{`<span class="cm">/* ═══════════════════════════════════════════════════════
   DeStore Responsive Foundation — paste into global CSS
   Tokens match DS_StyleGuide. Breakpoints match this doc.
═══════════════════════════════════════════════════════ */</span>

<span class="cm">/* ── Breakpoint vars (use in JS via window.innerWidth) ── */</span>
<span class="cv">:root</span> {
  <span class="cv">--bp-sm</span>:  <span class="co">480px</span>;
  <span class="cv">--bp-md</span>:  <span class="co">768px</span>;
  <span class="cv">--bp-lg</span>: <span class="co">1024px</span>;
  <span class="cv">--bp-xl</span>: <span class="co">1280px</span>;
}

<span class="cm">/* ── Fluid type ── */</span>
<span class="cw">h1</span> { font-size: <span class="cb">clamp</span>(<span class="co">28px</span>, <span class="co">4vw</span>, <span class="co">48px</span>); font-weight: <span class="co">900</span>; letter-spacing: <span class="co">-1.2px</span>; }
<span class="cw">h2</span> { font-size: <span class="cb">clamp</span>(<span class="co">18px</span>, <span class="co">2.5vw</span>, <span class="co">26px</span>); font-weight: <span class="co">900</span>; }
<span class="cw">p</span>  { font-size: <span class="co">13px</span>; line-height: <span class="co">1.7</span>; }
<span class="cw">input, textarea, select</span> { font-size: <span class="co">16px</span>; } <span class="cm">/* iOS zoom prevention */</span>

<span class="cm">/* ── Container ── */</span>
<span class="cw">.container</span> { width: <span class="co">100%</span>; margin: <span class="co">0 auto</span>; padding: <span class="co">0 16px</span>; }
<span class="cb">@media</span> (min-width: <span class="co">768px</span>)  { <span class="cw">.container</span> { padding: <span class="co">0 32px</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1024px</span>) { <span class="cw">.container</span> { max-width: <span class="co">1200px</span>; padding: <span class="co">0 48px</span>; } }

<span class="cm">/* ── Product grid ── */</span>
<span class="cw">.product-grid</span> { display: <span class="cb">grid</span>; gap: <span class="co">12px</span>; grid-template-columns: <span class="co">1fr</span>; }
<span class="cb">@media</span> (min-width: <span class="co">480px</span>)  { <span class="cw">.product-grid</span> { grid-template-columns: <span class="co">repeat(2,1fr)</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1024px</span>) { <span class="cw">.product-grid</span> { grid-template-columns: <span class="co">repeat(3,1fr)</span>; } }
<span class="cb">@media</span> (min-width: <span class="co">1280px</span>) { <span class="cw">.product-grid</span> { grid-template-columns: <span class="co">repeat(4,1fr)</span>; } }

<span class="cm">/* ── Tap targets ── */</span>
<span class="cw">button, a, [role="button"]</span> { min-height: <span class="co">44px</span>; min-width: <span class="co">44px</span>; }

<span class="cm">/* ── Safe area bottom bar ── */</span>
<span class="cw">.bottom-bar</span> {
  position: <span class="cb">fixed</span>; bottom: <span class="co">0</span>; left: <span class="co">0</span>; right: <span class="co">0</span>;
  padding-bottom: <span class="cb">env</span>(<span class="co">safe-area-inset-bottom</span>);
  background: <span class="cv">#0d0d10</span>; border-top: <span class="co">1px solid #2e2e38</span>;
}

<span class="cm">/* ── Off-canvas sidebar ── */</span>
<span class="cw">.sidebar-panel</span> { position: <span class="cb">fixed</span>; left: <span class="co">-240px</span>; top: <span class="co">0</span>; height: <span class="co">100vh</span>; width: <span class="co">220px</span>; transition: <span class="co">left .25s ease</span>; z-index: <span class="co">200</span>; }
<span class="cw">.sidebar-panel.open</span> { left: <span class="co">0</span>; }
<span class="cw">.sidebar-backdrop</span> { position: <span class="cb">fixed</span>; inset: <span class="co">0</span>; background: <span class="co">rgba(0,0,0,.6)</span>; backdrop-filter: <span class="cb">blur</span>(<span class="co">4px</span>); z-index: <span class="co">199</span>; }
<span class="cb">@media</span> (min-width: <span class="co">1024px</span>) {
  <span class="cw">.sidebar-panel</span> { position: <span class="cb">sticky</span>; left: <span class="co">0</span>; }  <span class="cm">/* desktop: always visible */</span>
  <span class="cw">.sidebar-backdrop</span> { display: <span class="cb">none</span>; }
}

<span class="cm">/* ── Focus ring (accessibility) ── */</span>
<span class="cw">:focus-visible</span> { outline: <span class="co">2px solid #B354F1</span>; outline-offset: <span class="co">2px</span>; border-radius: <span class="co">6px</span>; }

<span class="cm">/* ── Hide/show helpers ── */</span>
<span class="cw">.mobile-only</span> { display: <span class="cb">block</span>;  } <span class="cb">@media</span> (min-width: <span class="co">768px</span>)  { <span class="cw">.mobile-only</span> { display: <span class="cb">none</span>; } }
<span class="cw">.tablet-up</span>   { display: <span class="cb">none</span>;   } <span class="cb">@media</span> (min-width: <span class="co">768px</span>)  { <span class="cw">.tablet-up</span>   { display: <span class="cb">block</span>; } }
<span class="cw">.desktop-up</span>  { display: <span class="cb">none</span>;   } <span class="cb">@media</span> (min-width: <span class="co">1024px</span>) { <span class="cw">.desktop-up</span>  { display: <span class="cb">block</span>; } }`}</div>

          {/* ── Tailwind config ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>Tailwind config — extend breakpoints</div>
          <div className="code" style={{ marginBottom:24 }}>{`<span class="cm">// tailwind.config.js</span>
<span class="cb">module.exports</span> = {
  theme: {
    screens: {
      <span class="cs">'xs'</span>:  <span class="cs">'480px'</span>,   <span class="cm">// min-width by default</span>
      <span class="cs">'sm'</span>:  <span class="cs">'640px'</span>,
      <span class="cs">'md'</span>:  <span class="cs">'768px'</span>,
      <span class="cs">'lg'</span>: <span class="cs">'1024px'</span>,
      <span class="cs">'xl'</span>: <span class="cs">'1280px'</span>,
    },
    extend: {
      maxWidth: { <span class="cs">'content'</span>: <span class="cs">'1200px'</span> },
    }
  }
}

<span class="cm">/* Usage in JSX — responsive component example */</span>
<span class="cp">&lt;div</span> className=<span class="cs">"
  grid grid-cols-1
  xs:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-3 p-4 md:p-8
"</span><span class="cp">&gt;</span>`}</div>

          {/* ── useBreakpoint hook ── */}
          <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:12 }}>useBreakpoint — React hook</div>
          <div className="code" style={{ marginBottom:8 }}>{`<span class="cm">// hooks/useBreakpoint.ts — paste into any DeStore Next.js project</span>
<span class="cb">import</span> { useState, useEffect } <span class="cb">from</span> <span class="cs">'react'</span>;

<span class="cb">const</span> BPS = { xs: <span class="co">0</span>, sm: <span class="co">480</span>, md: <span class="co">768</span>, lg: <span class="co">1024</span>, xl: <span class="co">1280</span> };

<span class="cb">export function</span> <span class="cw">useBreakpoint</span>() {
  <span class="cb">const</span> [bp, setBp] = useState<span class="cb">&lt;</span><span class="cw">keyof typeof BPS</span><span class="cb">&gt;</span>(<span class="cs">'xs'</span>);

  useEffect(() <span class="cb">=&gt;</span> {
    <span class="cb">const</span> update = () <span class="cb">=&gt;</span> {
      <span class="cb">const</span> w = window.innerWidth;
      <span class="cb">if</span>      (w <span class="cb">&gt;=</span> BPS.xl) setBp(<span class="cs">'xl'</span>);
      <span class="cb">else if</span> (w <span class="cb">&gt;=</span> BPS.lg) setBp(<span class="cs">'lg'</span>);
      <span class="cb">else if</span> (w <span class="cb">&gt;=</span> BPS.md) setBp(<span class="cs">'md'</span>);
      <span class="cb">else if</span> (w <span class="cb">&gt;=</span> BPS.sm) setBp(<span class="cs">'sm'</span>);
      <span class="cb">else</span>                  setBp(<span class="cs">'xs'</span>);
    };
    update();
    window.addEventListener(<span class="cs">'resize'</span>, update);
    <span class="cb">return</span> () <span class="cb">=&gt;</span> window.removeEventListener(<span class="cs">'resize'</span>, update);
  }, []);

  <span class="cb">return</span> {
    bp,
    isMobile:  [<span class="cs">'xs'</span>, <span class="cs">'sm'</span>].includes(bp),
    isTablet:  bp === <span class="cs">'md'</span>,
    isDesktop: [<span class="cs">'lg'</span>, <span class="cs">'xl'</span>].includes(bp),
    isAtLeast: (min: <span class="cw">keyof typeof BPS</span>) <span class="cb">=&gt;</span> window.innerWidth <span class="cb">&gt;=</span> BPS[min],
  };
}

<span class="cm">// Usage:</span>
<span class="cb">const</span> { isMobile, isDesktop, bp } = <span class="cg">useBreakpoint</span>();
<span class="cb">return</span> isMobile ? <span class="cp">&lt;BottomSheet /&gt;</span> : <span class="cp">&lt;Modal /&gt;</span>;`}</div>

          <div style={{ padding:"10px 14px", background:`${C.violet}08`, border:`1px solid ${C.violet}20`,
            borderRadius:8, fontSize:11, color:C.dim, lineHeight:1.7 }}>
            <strong style={{ color:C.violet }}>FLUX audit:</strong> Before shipping any new screen, resize to 320px width. If it breaks at 320 — it fails. iPhone SE is the floor. Every layout must degrade gracefully to a single column without horizontal overflow.
          </div>

        </UxSec>

        </UxSec>
    </div>
  );
}

/* ─── Standalone Shell ──────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);
  const NAV = NAV_UX;
  const ACCENT = "#FF9F46";

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
          <Chip color={ACCENT}>⬡ UI/UX Guide</Chip>
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
            UI/UX Guide
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
          <UiUxGuideContent/>
        </main>
      </div>
    </div>
  );
}
