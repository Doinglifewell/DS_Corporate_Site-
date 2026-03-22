import { useState, useRef, useEffect } from "react";

/* ═════════════════════════════════════════════════════════════════════
   AGENT: ECHO — Brand Voice Director
   ─────────────────────────────────────────────────────────────────────
   Background : 16 years in brand copywriting, content strategy, and linguistic identity. Built voice systems for fintech and infrastructure brands. Led global tone-of-voice rollouts at Stripe and Monzo. Obsesses over the single sentence that defines a product.
   Domain     : See guide content below.
   Audit Prompt:
     You are ECHO, DeStore's Brand Voice Director with 16 Years of
     experience. Enforces: correct positioning language · approved taglines only · forbidden vocabulary · grammar laws · channel tone matching. Immediately rejects copy that sounds like a Web3 mint site or corporate fluff. Reports: RULE BROKEN · COPY SUBMITTED · CORRECT VERSION.
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
  { id:"d-payment",  label:"07 · DeAR.links" },
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
function VoiceGuideContent() {
  return (
    <div className="content-inner" style={{ padding:"52px 56px 140px", maxWidth:860 }}>
      {/* ── AGENT: ECHO ─────────────────────────────────────────── */}
      <div style={{ background:`linear-gradient(135deg,#FF1B9A18,#FF1B9A06)`,
        border:`1.5px solid #FF1B9A40`, borderRadius:16, padding:"22px 28px",
        marginBottom:48, marginTop:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:20 }}>
          <div style={{ flexShrink:0, width:52, height:52, borderRadius:12,
            background:`#FF1B9A18`, border:`1.5px solid #FF1B9A40`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22, fontWeight:900, color:"#FF1B9A" }}>
            ◈
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6, flexWrap:"wrap" }}>
              <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.14em",
                textTransform:"uppercase", color:"#FF1B9A" }}>Guardian Agent</div>
              <div style={{ fontSize:10, color:"#6b6b80", background:"#1c1c22",
                border:"1px solid #2e2e38", borderRadius:4, padding:"2px 8px",
                fontFamily:"'JetBrains Mono',monospace" }}>
                16 Years
              </div>
            </div>
            <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.4px", marginBottom:3 }}>
              ECHO
            </div>
            <div style={{ fontSize:12, color:"#9999b0", marginBottom:12 }}>
              Brand Voice Director
            </div>
            <div style={{ fontSize:11, color:"#6b6b80", lineHeight:1.8,
              paddingTop:12, borderTop:"1px solid #2e2e38" }}>
              16 years in brand copywriting, content strategy, and linguistic identity. Built voice systems for fintech and infrastructure brands. Led global tone-of-voice rollouts at Stripe and Monzo. Obsesses over the single sentence that defines a product.
            </div>
            <div style={{ marginTop:12, padding:"10px 14px",
              background:`#FF1B9A0c`, border:`1px solid #FF1B9A25`,
              borderRadius:9, fontSize:11, color:"#9999b0", lineHeight:1.7 }}>
              <span style={{ color:"#FF1B9A", fontWeight:800 }}>Audit mandate: </span>
              Enforces: correct positioning language · approved taglines only · forbidden vocabulary · grammar laws · channel tone matching. Immediately rejects copy that sounds like a Web3 mint site or corporate fluff. Reports: RULE BROKEN · COPY SUBMITTED · CORRECT VERSION.
            </div>
          </div>
        </div>
      </div>
      {/* ── End Agent Header ────────────────────────────────────────── */}


      {/* Ticker */}
      <div style={{ background:`linear-gradient(90deg,#321B68,#6A14DB,#B354F1,#6A14DB,#321B68)`,padding:"7px 0",overflow:"hidden",marginBottom:52,marginLeft:-56,marginRight:-56 }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(2).fill(null).map((_,i) => (
              <span key={i} style={{ display:"inline-flex",gap:0 }}>
                {["Circular Trade Infrastructure","·","Verified by DPP","·","Own It. Prove It. Trade It.","·","Every Product Has a Story","·","The Chain Doesn't Lie","·","Built for Circular Trade","·","Real Goods. Real Provenance.","·"].map((t,j) => (
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
          <Chip color={C.green}>Circular Economy Infrastructure</Chip>
        </div>
      </div>

      {/* 01 SOUL */}
      <div id="v-soul" style={{ marginBottom:72 }}>
        <VSecHead n="01" title="Brand Soul" sub="What DeStore is at its core — the why behind every word we write"/>
        <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.4),rgba(106,20,219,.15))`,border:`1px solid rgba(179,84,241,.25)`,borderRadius:16,padding:28,marginBottom:28 }}>
          <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:C.violet,marginBottom:14 }}>Positioning Statement</div>
          <div style={{ fontSize:20,fontWeight:900,letterSpacing:"-0.4px",lineHeight:1.5,marginBottom:16 }}>DeStore is the infrastructure that makes circular trade possible — for every physical product, at every point in its life.</div>
          <div style={{ fontSize:13,color:C.dim,lineHeight:1.8 }}>We are not a marketplace. We are not a crypto app. We are the rails — the Digital Product Passports, the ownership claims, the lifecycle events — that let physical objects move between people cleanly, permanently, and with their full history intact. Anywhere trade happens, our infrastructure is underneath it.</div>
          <div style={{ fontSize:13,color:C.dim,lineHeight:1.8,marginTop:12,padding:"12px 16px",background:"#141418",borderRadius:10,borderLeft:"3px solid #6A14DB" }}>Survivability framing: the blockchain keeps running. DPP Token lives on Base. No DeStore infrastructure is required to read or verify it. If DeStore closes tomorrow — the DPPs still exist on Arweave, the tokens still live on Base, and every consumer email receipt is self-contained proof. Open ERC-721 standard. No lock-in. This is not a selling point. This is how infrastructure is supposed to work.</div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28 }}>
          <Card>
            <div style={{ fontSize:9,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:C.green,marginBottom:12 }}>What DeStore Is</div>
            {["Circular trade infrastructure","DeAR — Decentralised Asset Register (consumer wallet + asset tracker + payments)","A DPP issuance and ownership system","The provenance layer for the physical world","Rails that travel with the object, not the venue","Infrastructure for brands, sellers, and resellers"].map((t,i) => (
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
            ["Primary",    "Circular Economy Infrastructure",              "Core positioning. DeStore is infrastructure — not a marketplace, not a crypto app."],
            ["Category",   "Circular Trade Infrastructure",                "Company descriptor. Press · B2B · investor. Not a tagline."],
            ["Short",      "The circular trade rails",                     "Social bios · icon lockups · secondary copy"],
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
              {["Circular trade","Infrastructure","Verified","Provenance","Record","History","Authentic","Ownership","Claim","DPP","Passport","Circulate","Trade","Transfer","Proof","DeAR","DeAR.link","Roam","Minted","Pass on","Discover"].map(w => <Word key={w} word={w} color={C.green}/>)}
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
        <Copy context="DeAR.link" color={C.orange} text="DeAR.link ready. Share it anywhere — the record is attached." note="'Share it anywhere' signals the infrastructure travels with the link."/>
        <div style={{ fontSize:12,fontWeight:800,color:C.pink,marginBottom:14,marginTop:28,letterSpacing:"0.04em",textTransform:"uppercase" }}>Marketing / Social</div>
        <Copy context="Instagram caption" color={C.pink} text="Found: 1994 Levi's 501 trucker. Two prior owners. Full record on the DPP. Byron Bay. ◈" note="'Full record' not 'blockchain verified'. ◈ is the silent infrastructure signal."/>
        <Copy context="Brand onboarding CTA" color={C.pink} text="Your products have a history. Now they have infrastructure." note="Speaks to brands. 'Infrastructure' signals B2B seriousness."/>
        <Copy context="Seller headline" color={C.pink} text="List it. Verify it. Let it circulate." note="Circular verb in the CTA. Echo of the infrastructure positioning."/>
        <Copy context="B2B pitch line" color={C.pink} text="We built the infrastructure for circular trade. Your products run on it." note="Direct B2B. 'Your products run on it' — we are the rails."/>

        <div style={{ background:`${C.violet}12`, border:`1px solid ${C.violet}35`, borderRadius:14, padding:"20px 22px", marginTop:8 }}>
          <div style={{ fontSize:10, fontWeight:800, color:C.violet, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Ethereum Anchor — Approved Enterprise Copy</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { label:"Hero claim", col:C.violet, text:"Every DeStore DPP batch is cryptographically anchored to Ethereum mainnet — the world's most battle-tested blockchain. Tamper-evident. Permanent. Readable by anyone, forever.", note:"Primary B2B/enterprise trust statement. Use in pitch decks, sales pages, enterprise proposals." },
              { label:"Short form", col:C.violet, text:"Anchored to Ethereum mainnet. Tamper-evident. Permanent.", note:"Header copy, feature callouts, one-liners." },
              { label:"Technical context", col:C.green, text:"DPPs are minted on Base for cost efficiency — every batch is then anchored to Ethereum via a merkle root commitment. One transaction covers thousands of passports.", note:"For press / investor / technical audiences who ask 'why Base and not ETH'." },
              { label:"Procurement / compliance", col:C.orange, text:"DeStore DPPs are independently verifiable on Ethereum mainnet — no DeStore account, no DeStore infrastructure required. The record exists permanently regardless of platform availability.", note:"For enterprise procurement teams and compliance officers evaluating vendor lock-in risk." },
            ].map(({ label, col, text, note }) => (
              <div key={label} style={{ background:C.d2, borderRadius:10, padding:"12px 16px", borderLeft:`3px solid ${col}` }}>
                <div style={{ fontSize:10, fontWeight:800, color:col, marginBottom:6 }}>{label.toUpperCase()}</div>
                <div style={{ fontSize:13, color:"#e8e8f0", lineHeight:1.75, marginBottom:6, fontStyle:"italic" }}>"{text}"</div>
                <div style={{ fontSize:10, color:C.muted }}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14, padding:"10px 14px", background:"#0a0a0d", borderRadius:8, fontSize:11, color:C.muted, lineHeight:1.7 }}>
            <strong style={{ color:"#e8e8f0" }}>Never say:</strong> "minted on Ethereum" (not accurate — Base is the mint chain) · "NFT" · "blockchain" in consumer contexts · "Web3"<br/>
            <strong style={{ color:"#e8e8f0" }}>Always say:</strong> "anchored to Ethereum" · "cryptographically verified" · "permanently on record" · "independently verifiable"
          </div>
        </div>
      </div>

      {/* 06 CHANNELS */}
      <div id="v-channels" style={{ marginBottom:72 }}>
        <VSecHead n="06" title="Voice by Channel" sub="Same infrastructure, different register"/>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          {[
            { ch:"App UI — Microcopy", col:C.violet, rules:["Ultra-short — every word must earn its pixel. Infrastructure copy is load-bearing, not decorative.","'In circulation' replaces 'listed'. 'Record' replaces 'blockchain'. 'Verified' replaces everything else.","Never exclamation marks. The infrastructure is reliable — it doesn't exclaim.","Errors: what broke → what to do. No apology. The rails are honest about faults."] },
            { ch:"Product Listings", col:C.green, rules:["Titles: Condition · Model · Detail · Location. Clean periods. No emoji.","Body: matter-of-fact, past tense for history, present tense for current state.","DPP: 'provenance on record' · 'history attached' · 'record follows the product' — never 'NFT'.","Circular framing: the next owner is always implied — 'the record travels with it'."] },
            { ch:"DeAR.links", col:C.orange, rules:["The DeAR.link is infrastructure — describe it functionally, not as a feature.","'Your DeAR.link is live. Share it anywhere.' — platform-agnostic is the point.","Confirmation: 'Payment received. Ownership transferred. Record updated.' — three beats."] },
            { ch:"Push Notifications", col:C.pink, rules:["One idea per notification — never two things.","Lead with the action or the object, not the context.","Max 40 characters for title, 90 for body.","Time-sensitive: use the deadline, not the urgency adjective."] },
            { ch:"Social Media", col:C.green, rules:["Instagram: copy is context, not caption. Three lines max. ◈ closes posts silently.","'Circulating' is the strong Instagram verb.","LinkedIn/B2B: 'circular trade infrastructure' is the full phrase — use it directly.","Never 'NFT', never 'Web3', never 'blockchain' in any social context."] },
            { ch:"Press / B2B / Investor", col:C.violet, rules:["'DeStore builds the infrastructure layer for circular trade' — one sentence company description.","Ethereum anchor: 'Every DPP batch cryptographically anchored to Ethereum mainnet' — approved claim. Say anchored, never minted.","Addressable market: not 'resale marketplace' — 'circular economy infrastructure for physical goods'.","The DPP is the product. The anchor is the trust signal. The record is the proof."] },
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
            ["Middle dot · separator","Use in compound positioning statements e.g. 'DPP · Provenance · Ownership' — dot mandatory. Never slash, dash, or pipe."],
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
            ["DeAR.link","DeAR.link","Functional and plain. No reinvention needed."],
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
Positioning: <span class="cw">Circular economy infrastructure. Not a marketplace.</span>
Survivability: <span class="cw">Base keeps running. DPP Token on Base — no DeStore infra needed to read or verify it.</span>

<span class="cv">WHAT DESTORE IS:</span>
  The infrastructure layer that makes circular trade possible.
  DeAR.links + DPP issuance + ownership claims.
  Not a marketplace. Not a crypto app. The rails underneath trade.

<span class="cv">TONE PILLARS:</span>
  Infrastructure, not platform  — foundational, built to last
  Clear, not technical          — plain language, zero jargon
  Circular, not transactional   — lifecycle thinking, not one-time sale
  Modern, not crypto            — records and proof, not tokens and chains

<span class="cv">VOCABULARY — USE:</span>
  <span class="cg">Circular trade · Infrastructure · Verified · Provenance · Record</span>
  <span class="cg">DPP · Circulate · Trade · Transfer · Proof · DeAR.link · Roam</span>

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
            { prompt:"One-sentence company description for press.", result:"DeStore builds the infrastructure for circular trade — DeAR.link, Digital Product Passports, and ownership claims that travel with physical goods through every owner." },
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

/* ─── Standalone Shell ──────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);
  const NAV = NAV_VOICE;
  const ACCENT = "#FF1B9A";

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
          <Chip color={ACCENT}>✦ Voice Guide</Chip>
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
            Voice Guide
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
          <VoiceGuideContent/>
        </main>
      </div>
    </div>
  );
}
