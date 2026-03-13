import { useState, useRef, useEffect } from "react";

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

/* ═══════════════════════════════════════════════════════════════
   STYLE GUIDE CONTENT
═══════════════════════════════════════════════════════════════ */
function StyleGuideContent() {
  const [optSel, setOptSel] = useState("ship");
  const [stepActive, setStepActive] = useState(2);

  return (
    <div style={{ padding:"52px 56px 140px" }}>
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
    <div style={{ padding:"52px 56px 140px", maxWidth:860 }}>

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
    <div style={{ padding:"52px 56px 140px" }}>
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
  const mainRef = useRef(null);

  const TABS = [
    { id:"style", label:"Style Guide", icon:"◈", nav:NAV_STYLE },
    { id:"voice", label:"Voice Guide", icon:"✦", nav:NAV_VOICE },
    { id:"dev",   label:"Developer Guide", icon:"⚡", nav:NAV_DEV },
  ];

  const currentNav = TABS.find(t => t.id === tab)?.nav || NAV_STYLE;

  const scrollTo = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  // Reset scroll and nav on tab switch
  const switchTab = (id) => {
    setTab(id);
    setActiveNav(null);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const TAB_COLORS = { style:C.violet, voice:C.pink, dev:C.green };

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
        <div style={{ padding:"10px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <Logo fill="#ffffff" width={130}/>
            <div style={{ width:1, height:18, background:C.bdr }}/>
            <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted }}>Brand Handbook</span>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Chip color={C.violet}>v4.0</Chip>
            <Chip color={C.green}>Circular Trade Infrastructure</Chip>
          </div>
        </div>
        {/* Tab bar */}
        <div style={{ paddingLeft:24, display:"flex", gap:0, borderTop:`1px solid rgba(46,46,56,.4)`, marginTop:8 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tab-btn${tab===t.id?" on":""}`}
              style={{ borderBottomColor: tab===t.id ? TAB_COLORS[t.id] : "transparent" }}
              onClick={() => switchTab(t.id)}
            >
              <div className="tab-dot" style={{ background: tab===t.id ? TAB_COLORS[t.id] : undefined, boxShadow: tab===t.id ? `0 0 8px ${TAB_COLORS[t.id]}80` : undefined }}/>
              <span style={{ fontSize:13 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:"flex" }}>

        {/* ══ SIDEBAR ══ */}
        <aside style={{
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
        </main>
      </div>
    </div>
  );
}
