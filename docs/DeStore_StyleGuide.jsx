import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

@property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
::-webkit-scrollbar { width:4px; height:4px; }
::-webkit-scrollbar-track { background:#0a0a0d; }
::-webkit-scrollbar-thumb { background:#2e2e38; border-radius:2px; }
body { background:#0a0a0d; color:#fff; font-family:'Plus Jakarta Sans',sans-serif; -webkit-font-smoothing:antialiased; }
textarea, input, select { font-family:'Plus Jakarta Sans',sans-serif; color-scheme:dark; }
input::placeholder, textarea::placeholder { color:#6b6b80; }
input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }

/* ── Conic border wrapper ── */
.conic-wrap {
  position:relative; border-radius:13px; padding:1.5px; display:inline-block;
  background:conic-gradient(from var(--angle,0deg), #B354F1,#6a14db,#00c8ff,#B354F1 40%,#321b68 60%,#B354F1);
  animation:spin-border 2.5s linear infinite;
}
.conic-inner {
  background:#26262e; border-radius:11px; padding:11px 16px;
  color:#fff; font-size:14px; font-weight:500;
  font-family:'Plus Jakarta Sans',sans-serif;
}

/* ── Button press ── */
.btn-press { transition:transform .12s,opacity .12s,filter .12s; cursor:pointer; }
.btn-press:active { transform:scale(.97); opacity:.88; }
.btn-press:hover { filter:brightness(1.1); }

/* ── Nav ── */
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

/* ── Option card ── */
.opt-card {
  display:flex; align-items:center; gap:12px; background:#26262e;
  border:1.5px solid #2e2e38; border-radius:12px; padding:12px 15px;
  cursor:pointer; width:100%; text-align:left;
  font-family:'Plus Jakarta Sans',sans-serif; transition:all .18s;
}
.opt-card.on { background:rgba(179,84,241,.1); border-color:#B354F1; box-shadow:0 0 16px rgba(179,84,241,.2); }
.opt-card:hover:not(.on) { border-color:#3a3a4a; }

/* ── Code block ── */
.code {
  background:#060608; border:1px solid #2e2e38; border-radius:12px;
  padding:18px 20px; font-family:'JetBrains Mono',monospace;
  font-size:11.5px; line-height:1.85; overflow-x:auto;
  white-space:pre; color:#9999b0; position:relative;
}
.cv { color:#B354F1; }
.cg { color:#28B79D; }
.co { color:#FF9F46; }
.cb { color:#79b8ff; }
.cm { color:#6b6b80; font-style:italic; }
.cw { color:#e8eaf0; }
.cp { color:#FF1B9A; }

/* ── Shimmer ── */
.shimmer {
  background:linear-gradient(90deg,#1c1c22 0px,#26262e 80px,#1c1c22 160px);
  background-size:400px 100%; animation:shimmer 1.6s infinite linear;
}

/* ── Swatch card ── */
.swatch-card { border-radius:12px; overflow:hidden; border:1px solid #2e2e38; cursor:pointer; transition:transform .15s; }
.swatch-card:hover { transform:translateY(-2px); }

/* ── Keyframes ── */
@property --pb1 { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb2 { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb3 { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb4 { syntax:'<angle>'; initial-value:0deg; inherits:false; }

@keyframes spin-border  { to { --angle:360deg; } }
@keyframes spin-pb1     { to { --pb1:360deg; } }
@keyframes spin-pb2     { to { --pb2:360deg; } }
@keyframes spin-pb3     { to { --pb3:360deg; } }
@keyframes spin-pb4     { to { --pb4:360deg; } }
@keyframes blink-dot    { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes price-sweep  { 0%{left:-75%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:125%;opacity:0} }
@keyframes fadeUp       { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
@keyframes scaleIn      { from{transform:scale(.5);opacity:0;}to{transform:scale(1);opacity:1;} }
@keyframes checkPop     { 0%{transform:scale(0) rotate(-20deg);opacity:0;}60%{transform:scale(1.3);}100%{transform:scale(1);opacity:1;} }
@keyframes ringExpand   { 0%{transform:scale(.8);opacity:.8;}100%{transform:scale(1.7);opacity:0;} }
@keyframes shimmer      { 0%{background-position:-400px 0;}100%{background-position:400px 0;} }
@keyframes bounce       { 0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);} }
@keyframes pulse        { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.95);} }
@keyframes gradShift    { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
`;

/* ─────────────────────────────────────────────────────────────────
   OFFICIAL LOGO SVGs — real Illustrator-exported paths
   Primary Wordmark viewBox="0 0 405.4 76.5"
   DS Secondary Mark viewBox="0 0 137.5 76.5"
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

// Logo variants — all using real vector data
const Logo = ({ fill = "#fff", width = 200 }) => (
  <svg width={width} height={width * (76.5 / 405.4)} viewBox="0 0 405.4 76.5" xmlns="http://www.w3.org/2000/svg">
    {WM_PATHS.map((d, i) => <path key={i} d={d} fill={fill} />)}
  </svg>
);
const LogoDS = ({ fill = "#fff", width = 80 }) => (
  <svg width={width} height={width * (76.5 / 137.5)} viewBox="0 0 137.5 76.5" xmlns="http://www.w3.org/2000/svg">
    {DS_PATHS.map((d, i) => <path key={i} d={d} fill={fill} />)}
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
   MICRO COMPONENTS
───────────────────────────────────────────────────────────────── */
const Btn = ({ children, v="primary", onClick, disabled, sm, full }) => {
  const vs = {
    primary: { bg:`linear-gradient(135deg,${C.orchid},${C.violet})`, sh:`0 4px 20px rgba(179,84,241,.35)`, bd:C.violet,    col:"#fff" },
    green:   { bg:`linear-gradient(135deg,#1a9a84,${C.green})`,      sh:`0 4px 16px rgba(40,183,157,.3)`,  bd:C.green,     col:"#fff" },
    fb:      { bg:`linear-gradient(135deg,#1565c0,${C.fb})`,         sh:`0 4px 16px rgba(24,119,242,.3)`,  bd:C.fb,        col:"#fff" },
    pink:    { bg:`linear-gradient(135deg,#c0126f,${C.pink})`,       sh:`0 4px 16px rgba(255,27,154,.3)`,  bd:C.pink,      col:"#fff" },
    ghost:   { bg:"transparent",                                      sh:"none",                             bd:C.bdr,       col:C.dim  },
    danger:  { bg:`linear-gradient(135deg,#7a0a0a,#c0392b)`,         sh:`0 4px 16px rgba(192,57,43,.3)`,   bd:"#c0392b",   col:"#fff" },
  };
  const t = vs[v] || vs.primary;
  return (
    <button className="btn-press" onClick={onClick} style={{
      background: disabled ? C.d4 : t.bg,
      border: `1.5px solid ${disabled ? C.bdr : t.bd}`,
      borderRadius: 14,
      padding: sm ? "8px 16px" : "13px 22px",
      color: disabled ? C.muted : t.col,
      fontSize: sm ? 12 : 13, fontWeight: 800, letterSpacing: "0.02em",
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      boxShadow: disabled ? "none" : t.sh,
      opacity: disabled ? 0.45 : 1,
      width: full ? "100%" : "auto",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    }}>{children}</button>
  );
};

const Chip = ({ children, color, border, bg }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    borderRadius: 20, padding: "4px 11px",
    fontSize: 11, fontWeight: 700,
    color: color || C.muted,
    border: `1px solid ${border || (color ? color + "40" : C.bdr)}`,
    background: bg || (color ? color + "12" : C.d3),
  }}>{children}</span>
);

const AutoBadge = () => (
  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: C.green, background: C.green + "18", border: `1px solid ${C.green}35`, borderRadius: 4, padding: "2px 7px" }}>AUTO ✓</span>
);

const Lbl = ({ children, auto }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted }}>{children}</span>
    {auto && <AutoBadge />}
  </div>
);

const Sub = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted, margin: "28px 0 14px" }}>
    {children}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.d3, border: `1px solid ${C.bdr}`, borderRadius: 14, padding: 20, ...style }}>
    {children}
  </div>
);

const Demo = ({ children, style = {} }) => (
  <div style={{ background: C.d1, border: `1px solid ${C.bdr}`, borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

const Sec = ({ id, n, title, sub, children }) => (
  <section id={id} style={{ marginBottom: 80, animation: "fadeUp 0.4s ease" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${C.bdr}` }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `linear-gradient(135deg,${C.orchid},${C.violet})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 900, flexShrink: 0,
        boxShadow: `0 0 18px rgba(179,84,241,.4)`,
      }}>{n}</div>
      <div>
        <div style={{ fontSize: 21, fontWeight: 900, letterSpacing: "-0.3px" }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: C.dim, marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
    {children}
  </section>
);

const Tbl = ({ heads, rows }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>{heads.map(h => (
        <th key={h} style={{ textAlign: "left", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, padding: "10px 14px", borderBottom: `1px solid ${C.bdr}` }}>{h}</th>
      ))}</tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>{row.map((cell, j) => (
          <td key={j} style={{ padding: "11px 14px", fontSize: 12, color: j === 0 ? "white" : C.dim, fontWeight: j === 0 ? 700 : 400, borderBottom: i < rows.length - 1 ? `1px solid rgba(46,46,56,.4)` : "none", verticalAlign: "top", lineHeight: 1.6 }}>{cell}</td>
        ))}</tr>
      ))}
    </tbody>
  </table>
);

const Swatch = ({ hex, name, role, note }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="swatch-card" onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1400); }}>
      <div style={{ height: 56, background: hex, position: "relative" }}>
        {copied && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>Copied!</div>}
      </div>
      <div style={{ padding: "10px 12px", background: C.d3 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{name}</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.muted }}>{hex}</div>
        {role && <div style={{ fontSize: 10, color: C.dim, marginTop: 3 }}>{role}</div>}
        {note && <div style={{ fontSize: 9, fontWeight: 800, color: C.green, marginTop: 4 }}>{note}</div>}
      </div>
    </div>
  );
};

const Steps = ({ active }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    {["Photos", "Details", "Price", "Preview"].map((lbl, i) => {
      const n = i + 1; const done = active > n; const cur = active === n;
      return (
        <div key={n} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: done ? C.green : cur ? `linear-gradient(135deg,${C.orchid},${C.violet})` : C.d4,
              border: `1.5px solid ${done ? C.green : cur ? C.violet : C.bdr}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800, color: done || cur ? "#fff" : C.muted,
              boxShadow: done ? `0 0 10px ${C.green}55` : cur ? `0 0 14px ${C.violet}55` : "none",
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            }}>{done ? "✓" : n}</div>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: done ? C.green : cur ? C.violet : C.muted }}>{lbl}</span>
          </div>
          {i < 3 && <div style={{ width: 30, height: 1.5, margin: "0 4px", marginBottom: 18, background: active > n ? C.green : C.bdr, borderRadius: 2, transition: "background .35s" }} />}
        </div>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   NAV SECTIONS
───────────────────────────────────────────────────────────────── */
const NAV = [
  { id: "logos",   label: "01 · Logo System" },
  { id: "colours", label: "02 · Colour Palette" },
  { id: "type",    label: "03 · Typography" },
  { id: "buttons", label: "04 · Buttons" },
  { id: "inputs",  label: "05 · Inputs & Forms" },
  { id: "cards",   label: "06 · Cards & Surfaces" },
  { id: "badges",  label: "07 · Badges & Chips" },
  { id: "steps",   label: "08 · Step Indicators" },
  { id: "states",  label: "09 · States & Feedback" },
  { id: "dpp",     label: "10 · DPP Components" },
  { id: "nova",    label: "11 · Nova Wallet Ref" },
  { id: "stack",   label: "12 · UI Tech Stack" },
  { id: "anim",    label: "13 · Animation System" },
  { id: "prompt",  label: "14 · Master Prompt" },
  { id: "price",   label: "15 · Price Badges ★" },
  { id: "voice",   label: "16 · Brand Voice ★" },
];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function StyleGuide() {
  const [activeNav, setActiveNav] = useState("logos");
  const [optSel, setOptSel] = useState("ship");
  const [stepActive, setStepActive] = useState(2);
  const [focusInput, setFocusInput] = useState(false);

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: C.d0, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#fff" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ══════ TOPBAR ══════ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 200,
        background: `${C.d1}f0`, backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.bdr}`,
        padding: "11px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Logo fill="#ffffff" width={148} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Brand & UI Style Guide</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.07em", color: C.violet, background: `${C.violet}14`, border: `1px solid ${C.violet}30`, borderRadius: 20, padding: "4px 12px" }}>v2.0 · 2026</span>
        </div>
      </div>

      <div style={{ display: "flex" }}>

        {/* ══════ SIDEBAR ══════ */}
        <aside style={{
          width: 218, flexShrink: 0, position: "sticky", top: 47,
          height: "calc(100vh - 47px)", overflowY: "auto",
          background: C.d1, borderRight: `1px solid ${C.bdr}`, paddingTop: 22,
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, padding: "0 18px 12px" }}>Contents</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn${activeNav === n.id ? " active" : ""}`} onClick={() => scrollTo(n.id)}>
              {n.label}
            </button>
          ))}
          <div style={{ height: 48 }} />
        </aside>

        {/* ══════ MAIN ══════ */}
        <main
          style={{ flex: 1, padding: "52px 56px 140px", overflowY: "auto" }}
          onScroll={() => {
            for (let i = NAV.length - 1; i >= 0; i--) {
              const el = document.getElementById(NAV[i].id);
              if (el && el.getBoundingClientRect().top < 140) {
                setActiveNav(NAV[i].id); break;
              }
            }
          }}
        >

          {/* ── Hero ── */}
          <div style={{ marginBottom: 72, animation: "fadeUp 0.5s ease" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.violet, marginBottom: 12 }}>DeStore Network</div>
            <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.08, marginBottom: 16 }}>Brand & UI<br />Style Guide</h1>
            <p style={{ fontSize: 15, color: C.dim, maxWidth: 520, lineHeight: 1.75, marginBottom: 22 }}>
              Official design language, colour system, component library, Nova Wallet reference, and full UI tech stack for DeStore apps, communications, and integrations.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Chip color={C.violet}>◈ The Hybrid Marketplace</Chip>
              <Chip color={C.green}>Roam Free</Chip>
              <Chip>Plus Jakarta Sans</Chip>
              <Chip>Soneium · Thirdweb</Chip>
              <Chip color={C.pink}>Real official SVG assets</Chip>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              01 · LOGO SYSTEM
          ══════════════════════════════════════════════ */}
          <Sec id="logos" n="01" title="Logo System" sub="Official Illustrator-exported vector paths · 6 variants · viewBox 0 0 405.4 76.5">

            <Sub>Primary Reversed — white · recommended for all dark digital UI</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <div>
                <div style={{ background: C.d1, border: `1px solid ${C.bdr}`, borderRadius: 14, padding: "36px 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Logo fill="#ffffff" width={230} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>On app dark · #0d0d10</div>
              </div>
              <div>
                <div style={{ background: C.royal, borderRadius: 14, padding: "36px 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Logo fill="#ffffff" width={230} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>On Royal Base #321B68</div>
              </div>
            </div>

            <Sub>Primary Midnight Purple — Royal Base fill · for light backgrounds</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <div>
                <div style={{ background: "#f0eef8", borderRadius: 14, padding: "36px 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Logo fill="#321B68" width={230} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>On light tint · #321B68 fill</div>
              </div>
              <div>
                <div style={{ background: "#ffffff", borderRadius: 14, padding: "36px 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Logo fill="#321B68" width={230} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>On white · print use</div>
              </div>
            </div>

            <Sub>Mono Black + DS Secondary Mark (viewBox 0 0 137.5 76.5)</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              {[
                { bg: "#f0f0f0",  fill: "#000000", comp: "wm",   label: "Mono Black" },
                { bg: C.d1,       fill: "#ffffff", comp: "ds",   label: "DS · Reversed" },
                { bg: C.royal,    fill: "#ffffff", comp: "ds",   label: "DS · On Brand" },
                { bg: "#f0eef8",  fill: "#321B68", comp: "ds",   label: "DS · Midnight" },
              ].map((v, i) => (
                <div key={i}>
                  <div style={{ background: v.bg, border: `1px solid ${C.bdr}`, borderRadius: 14, padding: "28px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {v.comp === "wm" ? <Logo fill={v.fill} width={110} /> : <LogoDS fill={v.fill} width={64} />}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 7 }}>{v.label}</div>
                </div>
              ))}
            </div>

            <Sub>Usage Rules</Sub>
            <Card>
              <Tbl
                heads={["Variant", "File", "Use On", "Never"]}
                rows={[
                  ["Primary Reversed",        "_02.Primary_Reversed.svg",           "Dark UI, app, digital screens",         "Light backgrounds"],
                  ["Primary Midnight Purple",  "_01.Primary_MidnightPurple.svg",     "Light/white backgrounds, print",        "Dark backgrounds"],
                  ["Mono Black",               "_03.Primary_MonoBlack.svg",          "Single-colour print, emboss, stamp",    "Colour digital"],
                  ["DS Secondary Mark",        "SecondaryLogo_RGB_01 / 02 / 03",     "App icon, favicon, avatar, lockups",    "Standalone brand comms"],
                ]}
              />
            </Card>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 12, fontStyle: "italic" }}>
              Source: _DeStore Brand Assets / 01. Logos / RGB (Digital Use) / svg/ · Glyphic Creative · AI 26.5.0
            </div>
          </Sec>

          {/* ══════════════════════════════════════════════
              02 · COLOURS
          ══════════════════════════════════════════════ */}
          <Sec id="colours" n="02" title="Colour Palette" sub="Official brand · app dark UI extensions · click any swatch to copy HEX">

            <Sub>Official Brand Palette — DeStore_QuickBrandStyleGuide · Glyphic Creative</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
              <Swatch hex="#000000" name="Black"          role="Primary 01" />
              <Swatch hex="#321B68" name="Royal Base"     role="Primary 02"   note="App: hero, brand bg" />
              <Swatch hex="#FF1B9A" name="Hot Pink"       role="Secondary 01" note="Sale · sold · alerts" />
              <Swatch hex="#6200E9" name="Electric Violet" role="Secondary 02" note="Light/print logo ONLY" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
              <Swatch hex="#FF9F46" name="Orange"  role="Accent"    note="Warnings · pending" />
              <Swatch hex="#EFB4B0" name="Blush"   role="Tertiary"  note="Print / light mode only" />
              <Swatch hex="#FFEFDC" name="Cream"   role="Neutral 01" note="Print / light mode only" />
              <Swatch hex="#FFD0AC" name="Peach"   role="Neutral 02" note="Print / light mode only" />
            </div>

            <Sub>App UI Extensions — OLED dark mode · Nova Wallet tuned</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
              <Swatch hex="#6A14DB" name="Orchid"        role="Gradient start" note="CTA gradient from" />
              <Swatch hex="#B354F1" name="Hybrid Violet" role="App accent"     note="CTAs · active · conic" />
              <Swatch hex="#28B79D" name="Teal Green"    role="Success · DPP"  note="AUTO · step done · confirm" />
              <Swatch hex="#2FB457" name="Pure Green"    role="Positive"       note="Sold · profit · ● Live" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
              <Swatch hex="#0a0a0d" name="dark0" role="Base bg" />
              <Swatch hex="#0d0d10" name="dark1" role="App bg" />
              <Swatch hex="#141418" name="dark2" role="Section card" />
              <Swatch hex="#1c1c22" name="dark3" role="Cards" />
              <Swatch hex="#26262e" name="dark4" role="Inputs" />
              <Swatch hex="#2e2e38" name="border" role="All borders" />
            </div>
          </Sec>

          {/* ══════════════════════════════════════════════
              03 · TYPOGRAPHY
          ══════════════════════════════════════════════ */}
          <Sec id="type" n="03" title="Typography" sub="Plus Jakarta Sans · Google Fonts · all weights">
            <Demo>
              {[
                { label: "Display · 900 · -1.5px", size: 44, weight: 900, ls: "-1.5px", lh: 1.1, col: "#fff",  text: "The Hybrid\nMarketplace" },
                { label: "Hero Title · 900 · -0.5px", size: 28, weight: 900, ls: "-0.5px", lh: 1.15, col: "#fff", text: "Digital Product Passport" },
                { label: "Card Title · 700", size: 17, weight: 700, ls: "0", lh: 1.3, col: "#fff", text: "Nike Air Max 95 · Like New" },
                { label: "Body · 400 · 1.7 lh", size: 14, weight: 400, ls: "0", lh: 1.7, col: C.dim, text: "Scan the QR tag to view full product history, ownership chain, and lifecycle events. Verified authentic via DeStore DPP." },
                { label: "Price · 900 · 44px", size: 44, weight: 900, ls: "-1px", lh: 1, col: "#fff", text: "$285 AUD" },
              ].map((t, i) => (
                <div key={i} style={{ borderLeft: `2px solid ${i === 0 ? C.violet : i === 4 ? C.green : C.bdr}`, paddingLeft: 16, marginBottom: i < 4 ? 28 : 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>{t.label}</div>
                  <div style={{ fontSize: t.size, fontWeight: t.weight, letterSpacing: t.ls, lineHeight: t.lh, color: t.col, whiteSpace: "pre-line" }}>{t.text}</div>
                </div>
              ))}
              <div style={{ borderLeft: `2px solid ${C.bdr}`, paddingLeft: 16, marginTop: 28 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Field Label · 700 · 10px · 0.09em · uppercase</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted }}>Asking Price</div>
              </div>
              <div style={{ borderLeft: `2px solid ${C.bdr}`, paddingLeft: 16, marginTop: 28 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Mono · JetBrains Mono · Product IDs · HEX codes</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.dim }}>DS-00421 · #B354F1 · 0x4a2f9b…</div>
              </div>
            </Demo>
          </Sec>

          {/* ══════════════════════════════════════════════
              04 · BUTTONS
          ══════════════════════════════════════════════ */}
          <Sec id="buttons" n="04" title="Buttons" sub="Gradient variants · glow shadows · btn-press state · border-radius 14px">
            <Demo>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
                <Btn v="primary">Post to Marketplace</Btn>
                <Btn v="green">✓ Confirm Transfer</Btn>
                <Btn v="fb">f &nbsp;Post to FB</Btn>
                <Btn v="pink">🔥 Sale Active</Btn>
                <Btn v="ghost">← Back</Btn>
                <Btn v="danger">Destroy / Recycle</Btn>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn v="primary" disabled>Disabled</Btn>
                <Btn v="primary" sm>Small (sm)</Btn>
                <Btn v="green" sm>Small Green</Btn>
              </div>
            </Demo>
            <Sub>Button Spec</Sub>
            <Card>
              <Tbl
                heads={["Variant", "Gradient", "Border Radius", "Weight", "Shadow"]}
                rows={[
                  ["Primary",   `135° ${C.orchid} → ${C.violet}`, "14px", "800",  `0 4px 20px ${C.violet}35`],
                  ["Green",     `135° #1a9a84 → ${C.green}`,      "14px", "800",  `0 4px 16px ${C.green}30`],
                  ["FB Blue",   `135° #1565c0 → ${C.fb}`,         "14px", "800",  `0 4px 16px ${C.fb}30`],
                  ["Hot Pink",  `135° #c0126f → ${C.pink}`,       "14px", "800",  `0 4px 16px ${C.pink}30`],
                  ["Ghost",     "transparent",                      "14px", "800",  "none"],
                  ["Danger",    "135° #7a0a0a → #c0392b",          "14px", "800",  "0 4px 16px #c0392b30"],
                  ["Press",     "—",                                "—",    "—",    ":active scale(.97) opacity .88"],
                ]}
              />
            </Card>
          </Sec>

          {/* ══════════════════════════════════════════════
              05 · INPUTS
          ══════════════════════════════════════════════ */}
          <Sec id="inputs" n="05" title="Inputs & Forms" sub="dark4 surface · conic-gradient spinning border on focus · border-radius 11px">
            <Demo style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <Lbl auto>Product Title</Lbl>
                <input
                  defaultValue="Nike Air Max 95"
                  style={{ background: C.d4, border: `1.5px solid ${C.bdr}`, borderRadius: 11, padding: "11px 14px", color: "#fff", fontSize: 14, width: "100%", outline: "none", transition: "border-color .2s, box-shadow .2s" }}
                  onFocus={e => { e.target.style.borderColor = C.violet; e.target.style.boxShadow = `0 0 0 3px ${C.violet}20`; }}
                  onBlur={e => { e.target.style.borderColor = C.bdr; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <Lbl>Asking Price</Lbl>
                <div style={{ background: C.d4, border: `1.5px solid ${C.violet}`, borderRadius: 14, padding: "0 18px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: C.muted, fontSize: 32, fontWeight: 700, lineHeight: 1 }}>$</span>
                  <input type="number" placeholder="0" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 44, fontWeight: 900, width: "100%", padding: "14px 0", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
                  <span style={{ color: C.muted, fontSize: 13, fontWeight: 600, flexShrink: 0 }}>AUD</span>
                </div>
              </div>
              <div>
                <Lbl>Conic Active Border Demo</Lbl>
                <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 9, color: C.muted, marginBottom: 6, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Default</div>
                    <div style={{ background: C.d4, border: `1.5px solid ${C.bdr}`, borderRadius: 11, padding: "11px 16px", color: C.muted, fontSize: 14, width: 190 }}>Unfocused</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: C.muted, marginBottom: 6, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Focused (conic spinning)</div>
                    <div className="conic-wrap"><div className="conic-inner">Active ✦</div></div>
                  </div>
                </div>
              </div>
            </Demo>
            <Sub>Conic Border CSS</Sub>
            <div className="code">{`<span class="cv">@property</span> <span class="cv">--angle</span> {
  syntax: <span class="cg">'&lt;angle&gt;'</span>;  initial-value: <span class="co">0deg</span>;  inherits: <span class="cb">false</span>;
}
<span class="cb">@keyframes</span> spin-border { to { <span class="cv">--angle</span>: <span class="co">360deg</span>; } }

<span class="cm">/* Apply to input wrapper div, not the input itself */</span>
<span class="cw">.conic-wrap</span> {
  position: <span class="cb">relative</span>;  border-radius: <span class="co">13px</span>;  padding: <span class="co">1.5px</span>;
  background: <span class="cb">conic-gradient</span>(from <span class="cv">var(--angle, 0deg)</span>,
    <span class="cv">#B354F1</span>, <span class="cv">#6a14db</span>, <span class="cb">#00c8ff</span>,
    <span class="cv">#B354F1 40%</span>, <span class="cv">#321b68 60%</span>, <span class="cv">#B354F1</span>);
  animation: spin-border <span class="co">2.5s</span> linear infinite;
}
<span class="cw">.conic-inner</span> {
  background: <span class="cv">#26262e</span>;  <span class="cm">/* dark4 — match input bg */</span>
  border-radius: <span class="co">11px</span>;
}`}</div>
          </Sec>

          {/* ══════════════════════════════════════════════
              06 · CARDS
          ══════════════════════════════════════════════ */}
          <Sec id="cards" n="06" title="Cards & Surfaces" sub="3-level elevation system · selection card pattern">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { bg: C.d2, name: "dark2 #141418", role: "Page section, grouping" },
                { bg: C.d3, name: "dark3 #1c1c22", role: "Product card, info card" },
                { bg: C.d4, name: "dark4 #26262e", role: "Input, chip, sub-surface" },
              ].map(c => (
                <div key={c.name} style={{ background: c.bg, border: `1px solid ${C.bdr}`, borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Surface Level</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ color: C.dim, fontSize: 11 }}>{c.role}</div>
                </div>
              ))}
            </div>
            <Sub>Selection / Option Card</Sub>
            <Demo style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { id: "ship",  icon: "📦", label: "Shipping + local pickup", sub: "DeStore generates label on sale" },
                { id: "local", icon: "🤝", label: "Local pickup only",        sub: "Buyer comes to you" },
              ].map(o => (
                <button key={o.id} className={`opt-card${optSel === o.id ? " on" : ""}`} onClick={() => setOptSel(o.id)}>
                  <span style={{ fontSize: 22 }}>{o.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{o.label}</div>
                    <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{o.sub}</div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${optSel === o.id ? C.violet : C.bdr}`,
                    background: optSel === o.id ? `linear-gradient(135deg,${C.orchid},${C.violet})` : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: optSel === o.id ? `0 0 8px ${C.violet}55` : "none",
                    transition: "all .2s",
                    fontSize: 11, fontWeight: 900, color: "#fff",
                  }}>{optSel === o.id ? "✓" : ""}</div>
                </button>
              ))}
            </Demo>
          </Sec>

          {/* ══════════════════════════════════════════════
              07 · BADGES
          ══════════════════════════════════════════════ */}
          <Sec id="badges" n="07" title="Badges & Chips" sub="Semantic colour assignment · all status states">
            <Demo style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <AutoBadge />
              <Chip color={C.violet}>◈ DPP Verified</Chip>
              <Chip color={C.green}>✓ Confirmed</Chip>
              <Chip color={C.greenAlt}>● Live</Chip>
              <Chip color={C.orange}>⚠ Pending</Chip>
              <Chip color={C.pink}>🔥 SALE</Chip>
              <Chip color={C.pink}>SOLD</Chip>
              <Chip>Like New</Chip>
              <Chip>Footwear</Chip>
              <Chip color={C.fb}>f &nbsp;FB Marketplace</Chip>
              <Chip color={C.orchid}>◈ Soneium</Chip>
              <Chip color={C.royal} bg={C.royal + "30"} border={C.royal}>Ownership Claim</Chip>
            </Demo>
            <Sub>Semantic Colour Mapping</Sub>
            <Card>
              <Tbl
                heads={["Colour", "HEX", "Badge / UI Use"]}
                rows={[
                  ["Hybrid Violet", C.violet,    "DPP Verified · conic border · primary CTAs · 'Store' in logo"],
                  ["Hot Pink",      C.pink,       "SALE · SOLD · new listing notification · listing live"],
                  ["Teal Green",    C.green,      "AUTO ✓ · step done ✓ · success state · DPP sourced"],
                  ["Pure Green",    C.greenAlt,   "● Live · Sold state · Profit · Positive balance"],
                  ["Orange",        C.orange,     "⚠ Pending · Price alert · Low stock warning · Expiry"],
                  ["FB Blue",       C.fb,         "Facebook Marketplace integration only"],
                  ["Royal Base",    C.royal,      "Brand bg · hero sections · Ownership Claim badge"],
                  ["Muted #6b6b80", C.muted,      "Neutral tags · category chips · condition labels · field labels"],
                ]}
              />
            </Card>
          </Sec>

          {/* ══════════════════════════════════════════════
              08 · STEPS
          ══════════════════════════════════════════════ */}
          <Sec id="steps" n="08" title="Step Indicators" sub="Spring easing transitions · done/active/pending states · click to demo">
            <Demo>
              <div style={{ marginBottom: 20 }}>
                <Steps active={stepActive} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3, 4].map(n => (
                  <Btn key={n} v={stepActive === n ? "primary" : "ghost"} sm onClick={() => setStepActive(n)}>Step {n}</Btn>
                ))}
              </div>
            </Demo>
            <Sub>Spec</Sub>
            <Card>
              <Tbl
                heads={["State", "Circle Style", "Connector", "Label"]}
                rows={[
                  ["Done (step < active)", `${C.green} fill · ✓ · glow 0 0 10px green55`,       C.green,  C.green],
                  ["Active (current)",     `gradient(${C.orchid}→${C.violet}) · glow violet55`, C.bdr,    C.violet],
                  ["Pending (future)",     `${C.d4} · ${C.bdr} border`,                         C.bdr,    C.muted],
                  ["Transition easing",    "cubic-bezier(0.34, 1.56, 0.64, 1) — spring Nova",   "—",      "0.35s"],
                ]}
              />
            </Card>
          </Sec>

          {/* ══════════════════════════════════════════════
              09 · STATES
          ══════════════════════════════════════════════ */}
          <Sec id="states" n="09" title="States & Feedback" sub="Never use spinners · shimmer for load · scaleIn for success · 3 bounce dots for async">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <Sub>Shimmer Skeleton — always instead of spinner</Sub>
                <Demo style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="shimmer" style={{ height: 90, borderRadius: 14 }} />
                  <div className="shimmer" style={{ height: 13, width: "65%", borderRadius: 6 }} />
                  <div className="shimmer" style={{ height: 11, width: "40%", borderRadius: 6 }} />
                </Demo>
              </div>
              <div>
                <Sub>Success — scaleIn + ringExpand</Sub>
                <Demo style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ position: "relative", width: 70, height: 70, flexShrink: 0 }}>
                    <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${C.green}`, animation: "ringExpand 1.6s ease infinite" }} />
                    <div style={{ width: 70, height: 70, borderRadius: "50%", background: `${C.green}1a`, border: `2px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, animation: "scaleIn .45s cubic-bezier(0.34,1.56,0.64,1)" }}>✓</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Listed!</div>
                    <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>scaleIn + ringExpand</div>
                  </div>
                </Demo>
              </div>
            </div>
            <Sub>Async / Posting — 3 bounce dots (stagger 0.22s)</Sub>
            <Demo style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${C.fb}18`, border: `2px solid ${C.fb}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: C.fb, animation: "pulse 1.2s ease infinite" }}>f</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Posting to FB Marketplace…</div>
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.fb, animation: `bounce .9s ease ${i * 0.22}s infinite` }} />)}
                </div>
              </div>
            </Demo>
          </Sec>

          {/* ══════════════════════════════════════════════
              10 · DPP
          ══════════════════════════════════════════════ */}
          <Sec id="dpp" n="10" title="DPP Components" sub="Digital Product Passport UI patterns · sourced from blockchain record">
            <Demo style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* DPP callout banner */}
              <div style={{ background: `linear-gradient(135deg,${C.violet}14,${C.orchid}08)`, border: `1px solid ${C.violet}28`, borderRadius: 14, padding: "15px 17px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0, filter: `drop-shadow(0 0 6px ${C.violet}80)` }}>◈</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Photos auto-loaded from DPP</div>
                  <div style={{ color: C.dim, fontSize: 12, lineHeight: 1.5 }}>3 product images retrieved from your Digital Product Passport. Product record minted at manufacture on Soneium.</div>
                </div>
              </div>
              {/* Trust strip */}
              <div style={{ background: C.d4, border: `1px solid ${C.bdr}`, borderRadius: 12, padding: "13px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[["Material", "Mesh + Leather"], ["Origin", "Vietnam ·  2023"], ["Carbon", "13.6kg CO₂e"]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.dim }}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Inline badge */}
              <div style={{ padding: "10px 14px", background: `${C.violet}0f`, border: `1px solid ${C.violet}28`, borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: C.violet, fontSize: 16 }}>◈</span>
                <span style={{ fontSize: 11, color: C.violet, fontWeight: 700 }}>DeStore Verified DPP · Scan QR tag for full product history & ownership chain</span>
              </div>
            </Demo>
            <Sub>DPP Architecture</Sub>
            <Card>
              <Tbl
                heads={["Layer", "Tech", "Description"]}
                rows={[
                  ["Product Record",   "Soneium SBT",              "Minted once at manufacture. Never transfers. Stores DPP data."],
                  ["Ownership Claim",  "DeStore DB · signed claim", "Cryptographically signed off-chain. New owner gets claim URL → wallet card."],
                  ["Event Log",        "Blockchain notary",         "Transfer/destroy/recycle events only — NOT ownership tokens."],
                  ["Images",           "Google Drive / Arweave",    "Attached to SBT metadata. Loaded into listing via DPP callout."],
                  ["Payments",         "USDC on Soneium",           "Zero crypto UX for end users. $0.01 per event → B&B Treasury."],
                ]}
              />
            </Card>
          </Sec>

          {/* ══════════════════════════════════════════════
              11 · NOVA WALLET REF
          ══════════════════════════════════════════════ */}
          <Sec id="nova" n="11" title="Nova Wallet Reference" sub="The benchmark DeStore app UI is built to match">
            <div style={{ background: `linear-gradient(135deg,${C.royal}44,${C.orchid}18)`, border: `1px solid ${C.violet}28`, borderRadius: 14, padding: "22px 24px", marginBottom: 22, display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, background: `linear-gradient(135deg,${C.orchid},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>◈</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Nova Wallet</div>
                <div style={{ color: C.dim, fontSize: 12, marginTop: 2 }}>iOS · Android · Novasama Technologies · Polkadot Ecosystem</div>
                <p style={{ fontSize: 13, color: C.dim, lineHeight: 1.65, marginTop: 8 }}>DeStore matches Nova's card density, modal patterns, animation timing, focus states, and OLED-first dark theme. The gold standard for crypto app UI quality.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Card>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.violet, marginBottom: 12 }}>DeStore matches Nova</div>
                <Tbl heads={["Pattern", "Our Implementation"]}
                  rows={[
                    ["Sticky header",    "blur(14px) backdrop + border-bottom"],
                    ["Loading",          "Shimmer skeleton — never spinners"],
                    ["Press state",      "scale(.97) · opacity .88 on :active"],
                    ["Success",          "scaleIn circle + ringExpand ring"],
                    ["Step easing",      "spring cubic-bezier(0.34,1.56,0.64,1)"],
                    ["Scrollbar",        "hidden · ::-webkit-scrollbar{display:none}"],
                    ["Privacy",          "Blur toggle on sensitive price data"],
                    ["Bottom sheets",    "Modal from bottom, not full-screen push"],
                  ]}
                />
              </Card>
              <Card>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.green, marginBottom: 12 }}>Nova Design Principles</div>
                <Tbl heads={["Principle", "Value"]}
                  rows={[
                    ["Theme",       "OLED dark-first"],
                    ["Density",     "Info-dense but readable"],
                    ["Transitions", "Spring overshoot on state change"],
                    ["Stagger",     "fadeUp 80–100ms delay per item"],
                    ["Loading",     "Shimmer skeleton exclusively"],
                    ["Architecture","VIPER (iOS) · Kotlin+Rust (Android)"],
                    ["iOS font",    "SF Pro (native)"],
                    ["Android",     "Roboto (native)"],
                  ]}
                />
              </Card>
            </div>
          </Sec>

          {/* ══════════════════════════════════════════════
              12 · STACK
          ══════════════════════════════════════════════ */}
          <Sec id="stack" n="12" title="UI Tech Stack" sub="Nova Wallet architecture reference → DeStore implementation">
            <Sub>Nova Wallet (Reference Benchmark)</Sub>
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Layer", "Technology", "Notes"]}
                rows={[
                  ["Language iOS",    "Swift 5.9+ · Xcode 16.1+",           "iOS 16.0+ min target"],
                  ["Architecture",    "VIPER · Generamba codegen",           "View / Presenter / Interactor / Router / Entity"],
                  ["Language Android","Kotlin + NDK + Rust",                 "Rust for sr25519/ed25519 crypto primitives"],
                  ["Tooling",         "SwiftLint · SwiftFormat · Sourcery",  "Mint for tool management"],
                  ["Blockchain",      "Substrate RPC · WalletConnect v2",    "XCM auto-route + pre-flight sim · Ledger BT/USB"],
                  ["APIs",            "Infura · Etherscan · MoonPay · Firebase", "EVM RPC · tx data · fiat on-ramp · push notifs"],
                ]}
              />
            </Card>
            <Sub>DeStore App Stack</Sub>
            <Card>
              <Tbl heads={["Layer", "Technology", "Notes"]}
                rows={[
                  ["Frontend",    "React · JSX · inline styles",             "Single-file components · no external CSS"],
                  ["Styling",     "@property CSS · conic-gradient · keyframes","Spinning borders · gradient buttons · shimmer"],
                  ["Font",        "Plus Jakarta Sans · Google Fonts",         "400 / 600 / 700 / 800 / 900"],
                  ["Blockchain",  "Thirdweb (wallets only) · Soneium",        "Zero crypto UX for end users"],
                  ["DPP",         "Soneium SBT · signed DB claims",           "Minted at manufacture · never transfers"],
                  ["Payments",    "USDC on Soneium",                          "$0.01/event → B&B Treasury buyback wallet"],
                  ["Automation",  "n8n self-hosted · n8n.flowberry.org",      "Zina AI agent · full suite orchestration"],
                  ["FB Sync",     "Facebook Marketplace API",                  "Auto-post listings on publish"],
                  ["Infra",       "Docker · Cloudflare Tunnel · Vercel",      "Self-hosted + edge CDN"],
                  ["AI",          "Claude (Anthropic) · claude-sonnet",       "Product listings · DPP generation · Zina"],
                ]}
              />
            </Card>
          </Sec>

          {/* ══════════════════════════════════════════════
              13 · ANIMATIONS
          ══════════════════════════════════════════════ */}
          <Sec id="anim" n="13" title="Animation System" sub="All required keyframes · timing values · when to use each">
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Keyframe", "Trigger", "Duration", "Use"]}
                rows={[
                  ["fadeUp",      "Component / view mount",          "0.35–0.4s ease",              "Every view change · key={activeView} to retrigger"],
                  ["scaleIn",     "Success icon appear",             "0.45s spring",                "Tick circle · confirmed state"],
                  ["checkPop",    "Step complete ✓",                 "0.3s ease",                   "Step indicator done circle"],
                  ["ringExpand",  "Success / DPP verified",          "1.6s ease infinite",          "Expanding pulse ring around success icon"],
                  ["shimmer",     "Data loading / fetching",         "1.6s linear infinite",        "All skeletons — never use spinners"],
                  ["bounce",      "Async API call in progress",      "0.9s · stagger 0.22s × 3",    "3 dots loading indicator"],
                  ["pulse",       "Async icon (FB post, DPP mint)",  "1.2s ease infinite",          "Logo icon pulsing during background task"],
                  ["spin-border", "Input focus · card active/sel",   "2.5s linear infinite",        "Conic-gradient on ALL active/focused elements"],
                ]}
              />
            </Card>
            <Sub>Easing Reference</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { name: "Standard",     val: "ease",                               use: "Buttons · hover · fade · 0.12–0.3s" },
                { name: "Spring Nova",  val: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "Step transitions · success · state changes" },
                { name: "Linear",       val: "linear",                             use: "spin-border · shimmer · infinite loops" },
              ].map(e => (
                <div key={e.name} style={{ background: C.d3, border: `1px solid ${C.bdr}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>{e.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.violet, marginBottom: 8 }}>{e.val}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{e.use}</div>
                </div>
              ))}
            </div>
          </Sec>

          {/* ══════════════════════════════════════════════
              14 · MASTER PROMPT
          ══════════════════════════════════════════════ */}
          <Sec id="prompt" n="14" title="Master Prompt" sub="Paste at the start of any new DeStore UI component request">
            <div className="code">{`Build this React component to DeStore / Nova Wallet frontend spec.

<span class="cv">─── BRAND ───────────────────────────────────────────────────────</span>
Official Brand:
  Black <span class="cv">#000000</span> · Royal Base <span class="cv">#321B68</span> · Hot Pink <span class="cp">#FF1B9A</span>
  Electric Violet <span class="cv">#6200E9</span> · Orange <span class="co">#FF9F46</span>
  Blush <span class="cb">#EFB4B0</span> · Cream <span class="cb">#FFEFDC</span> · Peach <span class="cb">#FFD0AC</span>

App UI Extensions (dark mode):
  Orchid <span class="cv">#6A14DB</span> · Hybrid Violet <span class="cv">#B354F1</span>
  dark0 <span class="cm">#0a0a0d</span> · dark1 <span class="cm">#0d0d10</span> · dark3 <span class="cm">#1c1c22</span> · dark4 <span class="cm">#26262e</span>
  border <span class="cm">#2e2e38</span> · muted <span class="cm">#6b6b80</span> · dimmed <span class="cm">#9999b0</span>
  Teal Green <span class="cg">#28B79D</span> · Pure Green <span class="cg">#2FB457</span> · FB Blue <span class="cb">#1877F2</span>

Font: 'Plus Jakarta Sans' · weights 400/600/700/800/900
Logo: Use official SVG paths (DeStore_Logo_RGB_02.Primary_Reversed)
      white fill on dark · full wordmark · viewBox 0 0 405.4 76.5
Tagline: "The Hybrid Marketplace · Roam Free"

<span class="cv">─── ACTIVE BORDER (mandatory on all focused/selected elements) ───</span>
@property --angle { syntax:'&lt;angle&gt;'; initial-value:0deg; inherits:false; }
@keyframes spin-border { to { --angle: 360deg; } }
.conic-wrap {
  padding:1.5px; border-radius:13px;
  background:conic-gradient(from var(--angle,0deg),
    #B354F1,#6a14db,#00c8ff,#B354F1 40%,#321b68 60%,#B354F1);
  animation:spin-border 2.5s linear infinite;
}
.conic-inner { background:#26262e; border-radius:11px; }

<span class="cv">─── BUTTONS ─────────────────────────────────────────────────────</span>
Primary: gradient(135°, #6A14DB → #B354F1) shadow 0 4px 20px violet35
Green:   gradient(135°, #1a9a84 → #28B79D)
FB:      gradient(135°, #1565c0 → #1877F2)
Pink:    gradient(135°, #c0126f → #FF1B9A)  ← sale/sold CTAs
Ghost:   transparent + border #2e2e38
All:     border-radius 14px · padding 13px 22px · font-weight 800
Press:   .btn-press:active { transform:scale(.97); opacity:.88; }

<span class="cv">─── ANIMATIONS (put in GLOBAL_CSS string) ───────────────────────</span>
fadeUp · scaleIn · checkPop · ringExpand · shimmer · bounce · pulse · spin-border
Spring: cubic-bezier(0.34,1.56,0.64,1) on step/state transitions
fadeUp on every view mount via key={activeView}
shimmer on ALL loading states — NEVER use spinners

<span class="cv">─── LAYOUT ──────────────────────────────────────────────────────</span>
Max-width 480px · sticky header backdrop-filter blur(14px)
::-webkit-scrollbar { display:none; }
Cards:  dark3 bg · 1px border #2e2e38 · border-radius 14px
Inputs: dark4 bg · border-radius 11px · conic-wrap on focus
Field labels: 10px · weight 700 · 0.09em tracking · uppercase · #6b6b80
AUTO badge: green18 bg · green35 border · 9px 800 weight

<span class="cv">─── COLOUR USAGE RULES ──────────────────────────────────────────</span>
#B354F1 Violet  → CTAs · active · conic borders
#FF1B9A Pink    → Sale · sold · notifications · listing live
#FF9F46 Orange  → Warnings · pending · price alerts
#28B79D Green   → DPP verified · AUTO · success · step done
#2FB457 Green   → Sold state · profit · positive balance · Live
#321B68 Royal   → Brand backgrounds · hero sections
#6200E9 Violet  → Light/print logo ONLY — NOT dark app UI

<span class="cv">─── PRICE BADGE (conic-price-badge spec) ────────────────────────</span>
Speed: 2s linear infinite — FIXED, never change
Ring: 12px outer · 10px inner border-radius · 2px padding
Inner bg: #1c1e21 (matches card bg — creates floating ring)
Variants:
  V1 Gradient ring: #B354F1 · #6A14DB · #00C8FF · #28B79D · #FF9F46 · #321B68
     Text: linear-gradient(135deg, #28B79D → #B354F1 → #FF9F46)
  V2 White ring:    #fff · #B354F1 · #fff · #9999b0 · #6A14DB
     Text: #ffffff solid
  V3 Pink ring:     #FF1B9A · #B354F1 · #FF1B9A · #6A14DB · #321B68
     Text: linear-gradient(135deg, #FF1B9A → #B354F1 → #FF1B9A)
  V4 Orange ring:   #FF9F46 · #FF1B9A · #B354F1 · #321B68
     Text: linear-gradient(135deg, #FF9F46 → #FF1B9A → #B354F1)
Rules: one per card · no glow/shadow stacking · dark bg preferred

<span class="cv">─── PAGE-SPECIFIC INSTRUCTION ───────────────────────────────────</span>
[DESCRIBE YOUR PAGE HERE]

Single .jsx file · all CSS in GLOBAL_CSS string · no external files.`}</div>
          </Sec>

          {/* ══════════════════════════════════════════════
              15 · PRICE BADGES
          ══════════════════════════════════════════════ */}
          <Sec id="price" n="15" title="Conic Price Badges" sub="Motion signature of DeStore · the price is the most important number · gets the full spin treatment">

            {/* intro rule card */}
            <Card style={{ marginBottom: 24 }}>
              <Tbl heads={["Rule", "Value"]}
                rows={[
                  ["Spin speed",     "2s linear infinite — fixed, non-negotiable. Slower = broken, faster = anxious."],
                  ["Border radius",  "10px outer · 8px inner"],
                  ["Padding",        "2px ring · 9–12px 18–22px inner"],
                  ["Inner bg",       "#1c1e21 — matches card bg exactly to create floating ring effect"],
                  ["Usage",          "Price display only · one per card · no glow or shadow stacking"],
                  ["Theme",          "Dark backgrounds preferred — ring and gradient text read strongest on dark"],
                ]}
              />
            </Card>

            {/* 4 live badges */}
            <Sub>4 Variants — Live</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>

              {/* V1 — Gradient text */}
              {(() => {
                const pill1bg = "#1c1e21";
                return (
                  <Card>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.violet, marginBottom: 16 }}>V1 · Full Brand Gradient</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                      {/* badge */}
                      <div style={{ position: "relative", borderRadius: 12, padding: 2, display: "inline-block", background: `conic-gradient(from var(--pb1,0deg), #B354F1,#6A14DB,#00C8FF,#28B79D,#FF9F46,#B354F1 40%,#321B68 60%,#B354F1)`, animation: "spin-pb1 2s linear infinite" }}>
                        <div style={{ background: pill1bg, borderRadius: 10, padding: "9px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.8px", lineHeight: 1, background: "linear-gradient(135deg,#28B79D 0%,#B354F1 50%,#FF9F46 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$285</span>
                          <span style={{ fontSize: 9, fontWeight: 600, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>AUD</span>
                        </div>
                      </div>
                      {/* psych context */}
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textDecoration: "line-through" }}>$420</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: C.greenAlt, background: `rgba(47,180,87,.12)`, border: `1px solid rgba(47,180,87,.3)`, borderRadius: 20, padding: "2px 9px" }}>Save $135</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
                      <strong style={{ color: "white" }}>Ring:</strong> Full brand — Violet · Orchid · Cyan · Green · Orange<br/>
                      <strong style={{ color: "white" }}>Text:</strong> Gradient 135° #28B79D → #B354F1 → #FF9F46<br/>
                      <strong style={{ color: "white" }}>Psychology:</strong> Savings anchor · scarcity · DPP trust
                    </div>
                  </Card>
                );
              })()}

              {/* V2 — White numbers */}
              {(() => {
                return (
                  <Card>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: "#ffffff", marginBottom: 16 }}>V2 · White Numbers — Clean Authority</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                      {/* urgency */}
                      <div style={{ fontSize: 10, color: C.dim }}>⚡ Price drops in <strong style={{ color: C.orange }}>05:23:41</strong></div>
                      {/* badge */}
                      <div style={{ position: "relative", borderRadius: 12, padding: 2, display: "inline-block", background: `conic-gradient(from var(--pb2,0deg), #fff,#B354F1,#fff,#9999b0,#fff,#B354F1 40%,#6A14DB 60%,#fff)`, animation: "spin-pb2 2s linear infinite" }}>
                        <div style={{ background: "#1c1e21", borderRadius: 10, padding: "9px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.8px", lineHeight: 1, color: "#ffffff" }}>$850</span>
                          <span style={{ fontSize: 9, fontWeight: 600, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>AUD · negotiable</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        {[["★ 4.9", C.orange], ["23 sales", C.muted], ["Fast ship", C.green]].map(([t, c]) => (
                          <span key={t} style={{ fontSize: 10, fontWeight: 700, color: c }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 16, fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
                      <strong style={{ color: "white" }}>Ring:</strong> White · Violet · White · #9999b0 · Orchid<br/>
                      <strong style={{ color: "white" }}>Text:</strong> Pure #ffffff · weight 900<br/>
                      <strong style={{ color: "white" }}>Psychology:</strong> Urgency timer · seller authority · live views
                    </div>
                  </Card>
                );
              })()}

              {/* V3 — Hot Pink */}
              {(() => {
                return (
                  <Card>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.pink, marginBottom: 16 }}>V3 · Hot Pink × Violet — Sale Energy</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", color: C.pink, background: `rgba(255,27,154,.12)`, border: `1px solid rgba(255,27,154,.3)`, borderRadius: 4, padding: "3px 10px" }}>🔥 SALE · ENDS MIDNIGHT</span>
                      {/* badge */}
                      <div style={{ position: "relative", borderRadius: 12, padding: 2, display: "inline-block", background: `conic-gradient(from var(--pb3,0deg), #FF1B9A,#B354F1,#FF1B9A,#6A14DB,#FF1B9A 40%,#321B68 60%,#FF1B9A)`, animation: "spin-pb3 2s linear infinite" }}>
                        <div style={{ background: "#1c1e21", borderRadius: 10, padding: "9px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.8px", lineHeight: 1, background: "linear-gradient(135deg,#FF1B9A 0%,#B354F1 60%,#FF1B9A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$749</span>
                          <span style={{ fontSize: 9, fontWeight: 600, color: C.pink, opacity: 0.7, letterSpacing: "0.07em", textTransform: "uppercase" }}>was $1,200</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, background: `rgba(255,27,154,.08)`, border: `1px solid rgba(255,27,154,.2)`, borderRadius: 8, padding: "5px 14px" }}>
                        ⚠ Someone has this in their cart
                      </div>
                    </div>
                    <div style={{ marginTop: 16, fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
                      <strong style={{ color: "white" }}>Ring:</strong> Hot Pink · Violet · Pink · Orchid<br/>
                      <strong style={{ color: "white" }}>Text:</strong> Gradient #FF1B9A → #B354F1 → #FF1B9A<br/>
                      <strong style={{ color: "white" }}>Psychology:</strong> FOMO · loss aversion · competition signal · deadline
                    </div>
                  </Card>
                );
              })()}

              {/* V4 — Orange fire */}
              {(() => {
                return (
                  <Card>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: C.orange, marginBottom: 16 }}>V4 · Orange × Pink × Violet — Negotiation</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 10, color: C.muted, textDecoration: "line-through" }}>RRP $20,500</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: C.orange }}>↓ 62% below retail</span>
                      </div>
                      {/* badge */}
                      <div style={{ position: "relative", borderRadius: 12, padding: 2, display: "inline-block", background: `conic-gradient(from var(--pb4,0deg), #FF9F46,#FF1B9A,#B354F1,#FF9F46 40%,#321B68 60%,#FF9F46)`, animation: "spin-pb4 2s linear infinite" }}>
                        <div style={{ background: "#1c1e21", borderRadius: 10, padding: "9px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.8px", lineHeight: 1, background: "linear-gradient(135deg,#FF9F46 0%,#FF1B9A 50%,#B354F1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$7,800</span>
                          <span style={{ fontSize: 9, fontWeight: 600, color: C.orange, opacity: 0.7, letterSpacing: "0.07em", textTransform: "uppercase" }}>AUD · firm</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", gap: 5 }}>◈ 23 prior owners · provenance clear</div>
                    </div>
                    <div style={{ marginTop: 16, fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
                      <strong style={{ color: "white" }}>Ring:</strong> Orange · Hot Pink · Violet · Royal Base<br/>
                      <strong style={{ color: "white" }}>Text:</strong> Gradient #FF9F46 → #FF1B9A → #B354F1<br/>
                      <strong style={{ color: "white" }}>Psychology:</strong> Price anchoring · commitment data · provenance
                    </div>
                  </Card>
                );
              })()}

            </div>

            {/* gradient stop reference table */}
            <Sub>Gradient Stop Reference</Sub>
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Variant", "Ring Gradient Stops", "Text Treatment", "Use Case"]}
                rows={[
                  ["V1 · Gradient",    "#B354F1 · #6A14DB · #00C8FF · #28B79D · #FF9F46 · #321B68",  "135° #28B79D → #B354F1 → #FF9F46",   "Standard listings · everyday marketplace"],
                  ["V2 · White",       "#fff · #B354F1 · #fff · #9999b0 · #6A14DB",                   "#ffffff solid · weight 900",           "Fixed price · premium · Buy Now"],
                  ["V3 · Hot Pink",    "#FF1B9A · #B354F1 · #FF1B9A · #6A14DB · #321B68",             "135° #FF1B9A → #B354F1 → #FF1B9A",   "Sale events · time-limited drops · SOLD"],
                  ["V4 · Orange Fire", "#FF9F46 · #FF1B9A · #B354F1 · #321B68",                       "135° #FF9F46 → #FF1B9A → #B354F1",   "Negotiable · high-value · anchored pricing"],
                ]}
              />
            </Card>

            {/* construction code block */}
            <Sub>Construction — Drop-in CSS</Sub>
            <div className="code">{`<span class="cm">/* ── @property (put at top of GLOBAL_CSS) ── */</span>
<span class="cv">@property</span> --pb1 { syntax:<span class="cg">'&lt;angle&gt;'</span>; initial-value:0deg; inherits:false; }

<span class="cm">/* ── Keyframe ── */</span>
<span class="cv">@keyframes</span> spin-pb1 { to { --pb1: 360deg; } }

<span class="cm">/* ── V1 Gradient ring (inline style on wrapper div) ── */</span>
background: <span class="cg">conic-gradient</span>(from var(--pb1,0deg),
  <span class="cv">#B354F1</span>, <span class="cv">#6A14DB</span>, <span class="cb">#00C8FF</span>, <span class="cg">#28B79D</span>, <span class="co">#FF9F46</span>,
  <span class="cv">#B354F1</span> 40%, <span class="cv">#321B68</span> 60%, <span class="cv">#B354F1</span>);
animation: spin-pb1 <span class="co">2s</span> linear infinite;   <span class="cm">/* always 2s — never change */</span>
border-radius: <span class="co">12px</span>; padding: <span class="co">2px</span>;

<span class="cm">/* ── Inner pill ── */</span>
background: <span class="cm">#1c1e21</span>;  <span class="cm">/* must match card bg — creates floating ring */</span>
border-radius: <span class="co">10px</span>; padding: <span class="co">9px 20px</span>;

<span class="cm">/* ── V1 gradient text ── */</span>
background: <span class="cg">linear-gradient</span>(135deg, <span class="cg">#28B79D</span> 0%, <span class="cv">#B354F1</span> 50%, <span class="co">#FF9F46</span> 100%);
-webkit-background-clip: text; -webkit-text-fill-color: transparent;
font-size: <span class="co">28px</span>; font-weight: <span class="co">900</span>; letter-spacing: <span class="co">-0.8px</span>;`}</div>
          </Sec>

          {/* ══════════════════════════════════════════════
              16 · BRAND VOICE
          ══════════════════════════════════════════════ */}
          <Sec id="voice" n="16" title="Brand Voice" sub="Circular Trade Infrastructure · how DeStore speaks across every touchpoint">

            {/* Positioning */}
            <div style={{ background: `linear-gradient(135deg,rgba(50,27,104,.4),rgba(106,20,219,.15))`, border: `1px solid rgba(179,84,241,.25)`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.violet, marginBottom: 12 }}>Positioning Statement</div>
              <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.3px", lineHeight: 1.5, marginBottom: 14 }}>
                DeStore is the infrastructure that makes circular trade possible — for every physical product, at every point in its life.
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
                Not a marketplace. Not a crypto app. The rails — payment links, Digital Product Passports, ownership claims — that let physical objects move between people cleanly, permanently, and with their full history intact. Anywhere trade happens, our infrastructure is underneath it.
              </div>
            </div>

            {/* What we are / are not */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Card>
                <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: C.green, marginBottom: 12 }}>What DeStore Is</div>
                {["Circular trade infrastructure","Payment link infrastructure for physical goods","A DPP issuance and ownership system","The provenance layer for the physical world","Rails that travel with the object, not the venue","Infrastructure for brands, sellers, and resellers"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, marginBottom: 7 }}>
                    <span style={{ color: C.green, flexShrink: 0, fontSize: 12 }}>→</span>
                    <span style={{ fontSize: 12, color: "white", fontWeight: 600, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: C.pink, marginBottom: 12 }}>What DeStore Is Not</div>
                {["A marketplace (we are not the venue)","An NFT platform or crypto trading app","A SaaS tool or generic ecommerce plugin","A replacement for eBay, Gumtree, or OpenSea","A Web3 brand speaking to crypto audiences","A one-time sale system — built for ongoing circulation"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, marginBottom: 7 }}>
                    <span style={{ color: C.pink, flexShrink: 0, fontSize: 12 }}>✗</span>
                    <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </Card>
            </div>

            {/* Taglines */}
            <Sub>Official Taglines</Sub>
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Role", "Line", "Usage"]}
                rows={[
                  ["Primary",      "Built for Circular Trade · Roam Free",        "Primary brand line. Middle dot mandatory. Both halves always together."],
                  ["Category",     "Circular Trade Infrastructure",                "Company descriptor. Press · B2B · investor. Not a tagline — a category definition."],
                  ["Short",        "Roam Free",                                    "Social bios · icon lockups · app store subtitle"],
                  ["DPP",          "Own It. Prove It. Trade It.",                  "DPP feature marketing · onboarding · the lifecycle in three beats"],
                  ["Trust",        "The Chain Doesn't Lie.",                       "Authentication · verification · anti-counterfeit contexts"],
                  ["Object",       "Every Product Has a Story.",                   "Collector · luxury · heritage · provenance-led marketing"],
                  ["Rail",         "The Infrastructure Travels With the Product.", "B2B · brand partnerships · 'our rails in your product' contexts"],
                  ["Direct",       "Real Goods. Real Provenance.",                 "Anti-fake positioning · trust campaign · direct-to-consumer"],
                ]}
              />
            </Card>

            {/* Tone pillars */}
            <Sub>Tone Pillars</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              {[
                { pillar: "Infrastructure, not platform", col: C.violet, desc: "We are not an app with features. We are the layer underneath trade. Words built to last, not to convert.", do: "Your DPP travels with the product through every owner, forever.", dont: "Our amazing platform helps you sell your stuff with cool features!" },
                { pillar: "Clear, not technical",         col: C.green,  desc: "The infrastructure is complex. The words should not be. If a sentence needs a glossary, rewrite it.", do: "Scan the tag. See the full ownership history. Buy with confidence.", dont: "The immutable on-chain data persistence layer enables trustless verification." },
                { pillar: "Circular, not transactional",  col: C.orange, desc: "A transaction ends. Circular trade continues. Every word should acknowledge the object will have more life.", do: "This is the third owner. The record carries forward to the next.", dont: "Buy now! Limited stock! Don't miss out on this deal!" },
                { pillar: "Modern, not crypto",           col: C.pink,   desc: "We don't say Web3, blockchain, token, or NFT in consumer copy. Records, proof, and ownership instead.", do: "The record is permanent. Any future owner can verify it.", dont: "Leveraging decentralised blockchain technology to tokenise real-world assets." },
              ].map(p => (
                <div key={p.pillar} style={{ background: C.d3, border: `1px solid ${C.bdr}`, borderRadius: 13, overflow: "hidden" }}>
                  <div style={{ background: `${p.col}14`, borderBottom: `1px solid ${C.bdr}`, padding: "11px 16px", fontSize: 12, fontWeight: 900, color: p.col }}>{p.pillar}</div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>{p.desc}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ background: "rgba(40,183,157,.07)", border: "1px solid rgba(40,183,157,.22)", borderRadius: 9, padding: "9px 12px" }}>
                        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.09em", color: C.green, marginBottom: 5 }}>✓ DO</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "white", lineHeight: 1.6 }}>"{p.do}"</div>
                      </div>
                      <div style={{ background: "rgba(255,27,154,.05)", border: "1px solid rgba(255,27,154,.18)", borderRadius: 9, padding: "9px 12px" }}>
                        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.09em", color: C.pink, marginBottom: 5 }}>✗ DON'T</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, lineHeight: 1.6 }}>"{p.dont}"</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vocabulary */}
            <Sub>Vocabulary</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <Card>
                <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: C.green, marginBottom: 12 }}>✓ Use These Words</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Circular trade","Infrastructure","Verified","Provenance","Record","History","Authentic","Ownership","Claim","DPP","Passport","Circulate","Trade","Transfer","Proof","Payment link","Roam","Minted","Pass on","Discover"].map(w => (
                    <span key={w} style={{ background: "rgba(40,183,157,.08)", border: "1px solid rgba(40,183,157,.25)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "white" }}>{w}</span>
                  ))}
                </div>
              </Card>
              <Card>
                <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: C.pink, marginBottom: 12 }}>✗ Never Use These</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Marketplace","Web3","Blockchain","NFT","Token","Crypto","Decentralised","Immutable","Trustless","Platform","Disrupt","Revolutionary","Game-changer","HODL","LFG","Ape in"].map(w => (
                    <span key={w} style={{ background: "rgba(255,27,154,.05)", border: "1px solid rgba(255,27,154,.18)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: C.muted, textDecoration: "line-through" }}>{w}</span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Term translations */}
            <Sub>Term Translation Guide</Sub>
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Old / Technical", "Say Instead", "Context"]}
                rows={[
                  ["marketplace",      "circular trade infrastructure · trade · listing", "'We built the infrastructure for circular trade'"],
                  ["blockchain",       "the record",                                       "'The record is permanent and public'"],
                  ["NFT / token",      "DPP · Digital Product Passport",                  "'Your product's digital identity — minted once, travels forever'"],
                  ["minting",          "creating a passport · minted",                    "'A permanent record is created at manufacture'"],
                  ["on-chain verify",  "verified · confirmed",                            "'Confirmed — it's in the permanent record'"],
                  ["wallet",           "your DeStore account",                            "Never mention wallets to consumers"],
                  ["transfer",         "trade · pass on · circulate",                     "'Trade this · pass the ownership on'"],
                  ["Soneium",          "(never to consumers)",                            "Infrastructure is invisible — users never need the chain name"],
                ]}
              />
            </Card>

            {/* Grammar rules */}
            <Sub>Grammar & Style Rules</Sub>
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Rule", "Detail"]}
                rows={[
                  ["'DeStore' capitalisation",  "Capital D, capital S, one word. Never 'De Store', 'destore', or 'Destore'."],
                  ["'marketplace' is retired",  "Do not use in any copy — consumer, B2B, or marketing. Replaced by 'circular trade infrastructure' or 'trade'."],
                  ["Middle dot · separator",    "'Built for Circular Trade · Roam Free' — dot is mandatory. Never slash, dash, or pipe."],
                  ["Full stops always",         "End every sentence, including the last one in a block. Gives copy authority."],
                  ["Fragments are fine",        "'Verified. Listed. Live.' — purposeful economy, not laziness."],
                  ["Active voice always",       "Subject → verb → object. 'The record is live' not 'The record has been made live'."],
                  ["No exclamation marks",      "Never in UI, product, or listing copy. Max one in high-energy marketing moments."],
                  ["Numbers for specs",         "'$285', 'Size 10' — never spelled out. Specificity builds trust."],
                  ["DPP uppercase",             "'DPP' is always uppercase. 'blockchain' is always lowercase."],
                  ["'Circulate' is a verb",     "Objects circulate — they don't just 'sell'. Use in listing and marketing copy."],
                ]}
              />
            </Card>

            {/* Microcopy examples */}
            <Sub>Microcopy Quick Reference</Sub>
            <Card style={{ marginBottom: 20 }}>
              <Tbl heads={["Context", "Write This"]}
                rows={[
                  ["DPP chip",             "◈ Verified"],
                  ["Empty state",          "Nothing in circulation here yet. Be the first to list."],
                  ["Listing success",      "Listed. Your DPP is live and the record is attached."],
                  ["Upload error",         "That image didn't upload. Try again or choose a different file."],
                  ["Ownership transfer",   "Transferred. The new owner holds the claim — the full history stays intact."],
                  ["Payment link ready",   "Payment link ready. Share it anywhere — the record travels with it."],
                  ["DPP minted",           "Passport created. The record is live."],
                  ["Price drop notif",     "Price drop on your saved [item]. Now $X — was $Y."],
                ]}
              />
            </Card>

            {/* AI Voice Prompt */}
            <Sub>AI Voice Prompt — Paste into Zina, Claude, or any AI tool</Sub>
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
  'marketplace'     → 'circular trade infrastructure' / 'trade' / 'listing'
  'blockchain'      → 'the record'
  'NFT / token'     → 'DPP' or 'Digital Product Passport'
  'wallet'          → 'your DeStore account'
  'Soneium'         → never mention to consumers

<span class="cv">GRAMMAR:</span>
  Full stops always · Fragments fine · Active voice · No exclamation marks
  'DeStore' = capital D + S · 'DPP' uppercase · 'blockchain' lowercase
  Middle dot · as separator · 'marketplace' is a retired word — do not use

<span class="cv">─── PAGE-SPECIFIC INSTRUCTION ─────────────────────────────────</span>
[DESCRIBE YOUR COPY TASK — context, channel, tone register, audience]`}</div>

          </Sec>

          {/* Footer */}
          <div style={{ borderTop: `1px solid ${C.bdr}`, paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <div>
              <Logo fill="#ffffff" width={100} />
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>© DeStore Network · Brand & UI Style Guide v4.0 · March 2026</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Chip>Glyphic Creative · original brand</Chip>
              <Chip color={C.violet}>Nova Wallet benchmark</Chip>
              <Chip color={C.green}>Real official SVG paths</Chip>
              <Chip color={C.orange}>Conic Price Badges v1</Chip>
              <Chip color={C.pink}>Brand Voice v2.0</Chip>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
