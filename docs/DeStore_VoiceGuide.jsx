import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   DESTORE — MASTER BRAND VOICE GUIDE v2.0
   Positioning: Circular Trade Infrastructure
   Based on DeStore_QuickBrandStyleGuide · UI Style Guide v3.0
   Tagline: "Built for Circular Trade · Roam Free"
───────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;700&display=swap');

@property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@property --pb1   { syntax:'<angle>'; initial-value:0deg; inherits:false; }

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
::-webkit-scrollbar { display:none; }
body {
  background:#0a0a0d; color:#fff;
  font-family:'Plus Jakarta Sans',sans-serif;
  -webkit-font-smoothing:antialiased;
}

@keyframes spin-angle { to { --angle:360deg; } }
@keyframes spin-pb1   { to { --pb1:360deg; } }
@keyframes fadeUp     { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);} }
@keyframes slideIn    { from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);} }
@keyframes glow-pulse { 0%,100%{opacity:.5}50%{opacity:1} }
@keyframes ticker     { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }

/* ── Nav ── */
.nav-item {
  display:flex; align-items:center; gap:9px;
  padding:9px 18px; font-size:11.5px; font-weight:600;
  color:#6b6b80; cursor:pointer; border:none;
  border-left:2px solid transparent; background:transparent;
  width:100%; text-align:left; font-family:'Plus Jakarta Sans',sans-serif;
  transition:all .14s; letter-spacing:0.01em;
}
.nav-item:hover { color:#9999b0; background:rgba(255,255,255,.025); }
.nav-item.on { color:#B354F1; border-left-color:#B354F1; background:rgba(179,84,241,.07); }
.nav-item.on .nav-dot { background:#B354F1; box-shadow:0 0 8px #B354F1; }
.nav-dot { width:5px; height:5px; border-radius:50%; background:#2e2e38; flex-shrink:0; transition:all .14s; }

/* ── Do / Don't cards ── */
.do-card {
  background:rgba(40,183,157,.07); border:1px solid rgba(40,183,157,.25);
  border-radius:13px; padding:16px 18px;
}
.dont-card {
  background:rgba(255,27,154,.05); border:1px solid rgba(255,27,154,.2);
  border-radius:13px; padding:16px 18px;
}
.example-card {
  background:#141418; border:1px solid #2e2e38;
  border-radius:13px; padding:18px 20px;
  animation:fadeUp .3s ease both;
}

/* ── Word chips ── */
.word-chip {
  display:inline-flex; align-items:center; gap:6px;
  background:#1c1c22; border:1px solid #2e2e38;
  border-radius:8px; padding:6px 13px;
  font-size:12px; font-weight:700; color:white;
  cursor:default; transition:all .18s;
}
.word-chip:hover { border-color:#B354F1; background:rgba(179,84,241,.08); color:#B354F1; }

/* ── Ticker tape ── */
.ticker-wrap { overflow:hidden; white-space:nowrap; }
.ticker-inner { display:inline-flex; animation:ticker 22s linear infinite; gap:0; }

/* ── Conic badge ── */
.cb-ring {
  padding:2px; border-radius:10px; display:inline-block;
  background:conic-gradient(from var(--pb1,0deg),#B354F1,#6A14DB,#00C8FF,#28B79D,#FF9F46,#B354F1 40%,#321B68 60%,#B354F1);
  animation:spin-pb1 2s linear infinite;
}
.cb-inner {
  background:#1c1e21; border-radius:8px; padding:7px 14px;
  display:flex; flex-direction:column; align-items:center; gap:1px;
}

/* ── Section divider ── */
.sec-rule { height:1px; background:linear-gradient(90deg,#B354F150,transparent); margin:0 0 28px; }
`;

/* ── Official SVG Logo paths ── */
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
const Logo = ({ fill = "#fff", width = 160 }) => (
  <svg width={width} height={width * (76.5 / 405.4)} viewBox="0 0 405.4 76.5" xmlns="http://www.w3.org/2000/svg">
    {WM_PATHS.map((d, i) => <path key={i} d={d} fill={fill} />)}
  </svg>
);

/* ── Colours ── */
const C = {
  royal:"#321B68", pink:"#FF1B9A", orange:"#FF9F46",
  orchid:"#6A14DB", violet:"#B354F1",
  d0:"#0a0a0d", d1:"#0d0d10", d3:"#1c1c22", d4:"#26262e",
  bdr:"#2e2e38", muted:"#6b6b80", dim:"#9999b0",
  green:"#28B79D", greenAlt:"#2FB457",
};

/* ── Section heading ── */
const SecHead = ({ n, title, sub }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
      <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.12em", color:C.violet, background:`rgba(179,84,241,.1)`, border:`1px solid rgba(179,84,241,.2)`, borderRadius:5, padding:"2px 9px" }}>{n}</div>
      <div style={{ height:1, flex:1, background:`linear-gradient(90deg,${C.violet}40,transparent)` }}/>
    </div>
    <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.6px", lineHeight:1.1, marginBottom:6 }}>{title}</h2>
    {sub && <p style={{ fontSize:13, color:C.dim, lineHeight:1.7 }}>{sub}</p>}
  </div>
);

/* ── Do / Don't pair ── */
const DoDont = ({ doText, dontText, doNote, dontNote }) => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
    <div className="do-card">
      <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", color:C.green, marginBottom:10 }}>✓ DO</div>
      <div style={{ fontSize:13, fontWeight:700, color:"white", lineHeight:1.6, marginBottom:doNote?8:0 }}>"{doText}"</div>
      {doNote && <div style={{ fontSize:11, color:C.green, opacity:0.8 }}>{doNote}</div>}
    </div>
    <div className="dont-card">
      <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", color:C.pink, marginBottom:10 }}>✗ DON'T</div>
      <div style={{ fontSize:13, fontWeight:700, color:"#9999b0", lineHeight:1.6, marginBottom:dontNote?8:0 }}>"{dontText}"</div>
      {dontNote && <div style={{ fontSize:11, color:C.pink, opacity:0.8 }}>{dontNote}</div>}
    </div>
  </div>
);

/* ── Copy example card ── */
const Copy = ({ context, text, note, color = C.violet }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="example-card" style={{ marginBottom:12, animationDelay:"0.05s" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted }}>{context}</span>
        <button onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),1800); }} style={{ fontSize:10, fontWeight:700, color: copied ? C.green : C.muted, background:"none", border:"none", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"color .2s" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <div style={{ fontSize:14, fontWeight:700, color:"white", lineHeight:1.7, borderLeft:`2px solid ${color}`, paddingLeft:14 }}>{text}</div>
      {note && <div style={{ fontSize:11, color:C.dim, marginTop:8, lineHeight:1.6 }}>{note}</div>}
    </div>
  );
};

/* ── Word pill ── */
const Word = ({ word, color = C.violet }) => (
  <span className="word-chip" style={{ borderColor: `${color}40` }}>{word}</span>
);

/* ─────────────────────────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────────────────────────── */
const NAV = [
  { id:"soul",     label:"01 · Brand Soul" },
  { id:"persona",  label:"02 · Voice Persona" },
  { id:"pillars",  label:"03 · Tone Pillars" },
  { id:"vocab",    label:"04 · Vocabulary" },
  { id:"copy",     label:"05 · Copy in Action" },
  { id:"channels", label:"06 · By Channel" },
  { id:"grammar",  label:"07 · Grammar Rules" },
  { id:"naming",   label:"08 · Naming System" },
  { id:"prompt",   label:"09 · AI Voice Prompt" },
];

/* ─────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────── */
export default function VoiceGuide() {
  const [active, setActive] = useState("soul");

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <div style={{ minHeight:"100vh", background:C.d0 }}>
      <style>{CSS}</style>

      {/* ── TOPBAR ── */}
      <div style={{
        position:"sticky", top:0, zIndex:200,
        background:`${C.d1}f0`, backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.bdr}`,
        padding:"11px 28px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <Logo fill="#ffffff" width={120} />
          <div style={{ width:1, height:20, background:C.bdr }}/>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.muted }}>Brand Voice Guide</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.07em", color:C.violet, background:`rgba(179,84,241,.1)`, border:`1px solid rgba(179,84,241,.2)`, borderRadius:20, padding:"4px 12px" }}>v2.0 · Circular Trade Infrastructure</span>
        </div>
      </div>

      {/* ── TICKER TAPE ── */}
      <div style={{ background:`linear-gradient(90deg,${C.royal},${C.orchid},${C.violet},${C.orchid},${C.royal})`, padding:"7px 0", overflow:"hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(2).fill(null).map((_,i) => (
              <span key={i} style={{ display:"inline-flex", gap:0 }}>
                {["Circular Trade Infrastructure","·","Roam Free","·","Verified by DPP","·","Own It. Prove It. Trade It.","·","Every Product Has a Story","·","The Chain Doesn't Lie","·","Built for Circular Trade","·","Real Goods. Real Provenance.","·"].map((t,j) => (
                  <span key={j} style={{ fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,.85)", padding:"0 18px", whiteSpace:"nowrap" }}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:"flex", minHeight:"calc(100vh - 90px)" }}>

        {/* ── SIDEBAR ── */}
        <div style={{
          width:220, flexShrink:0,
          borderRight:`1px solid ${C.bdr}`,
          position:"sticky", top:42, height:"calc(100vh - 42px)",
          overflow:"auto", paddingTop:20, paddingBottom:40,
          background:C.d1,
        }}>
          <div style={{ padding:"0 18px 12px", fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>Contents</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-item${active===n.id?" on":""}`} onClick={() => scrollTo(n.id)}>
              <div className="nav-dot"/>
              {n.label}
            </button>
          ))}
          {/* sidebar conic badge */}
          <div style={{ padding:"24px 18px 0", display:"flex", justifyContent:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div className="cb-ring">
                <div className="cb-inner">
                  <span style={{ fontSize:14, fontWeight:900, letterSpacing:"-0.5px", background:"linear-gradient(135deg,#28B79D,#B354F1,#FF9F46)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>◈ DPP</span>
                </div>
              </div>
              <span style={{ fontSize:9, fontWeight:700, color:C.muted, letterSpacing:"0.06em", textTransform:"uppercase" }}>Verified</span>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <main style={{ flex:1, padding:"52px 48px 100px", maxWidth:780 }}>

          {/* ══ 01 BRAND SOUL ══ */}
          <div id="soul" style={{ marginBottom:72 }}>
            <SecHead n="01" title="Brand Soul" sub="What DeStore is at its core — the why behind every word we write" />

            {/* positioning statement */}
            <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.4),rgba(106,20,219,.15))`, border:`1px solid rgba(179,84,241,.25)`, borderRadius:16, padding:28, marginBottom:28 }}>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:C.violet, marginBottom:14 }}>Positioning Statement</div>
              <div style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.4px", lineHeight:1.5, marginBottom:16 }}>
                DeStore is the infrastructure that makes circular trade possible — for every physical product, at every point in its life.
              </div>
              <div style={{ fontSize:13, color:C.dim, lineHeight:1.8 }}>
                We are not a marketplace. We are not a crypto app. We are the rails — the payment links, the Digital Product Passports, the ownership claims — that let physical objects move between people cleanly, permanently, and with their full history intact. Anywhere trade happens, our infrastructure is underneath it.
              </div>
            </div>

            {/* what we are / what we are not */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
              <div style={{ background:`rgba(40,183,157,.07)`, border:`1px solid rgba(40,183,157,.2)`, borderRadius:13, padding:20 }}>
                <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green, marginBottom:14 }}>What DeStore Is</div>
                {["Circular trade infrastructure","Payment link infrastructure for physical goods","A DPP issuance and ownership system","The provenance layer for the physical world","Rails that travel with the object, not the venue","Infrastructure for brands, sellers, and resellers"].map((t,i) => (
                  <div key={i} style={{ display:"flex", gap:9, marginBottom:8 }}>
                    <span style={{ color:C.green, flexShrink:0 }}>→</span>
                    <span style={{ fontSize:12, color:"white", fontWeight:600, lineHeight:1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:`rgba(255,27,154,.05)`, border:`1px solid rgba(255,27,154,.18)`, borderRadius:13, padding:20 }}>
                <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.pink, marginBottom:14 }}>What DeStore Is Not</div>
                {["A marketplace (we don't host listings as a venue)","An NFT platform or crypto trading app","A SaaS tool or generic ecommerce plugin","A replacement for eBay, Gumtree, or OpenSea","A Web3 brand speaking to crypto audiences","A one-time sale system — we're built for ongoing circulation"].map((t,i) => (
                  <div key={i} style={{ display:"flex", gap:9, marginBottom:8 }}>
                    <span style={{ color:C.pink, flexShrink:0 }}>✗</span>
                    <span style={{ fontSize:12, color:C.dim, lineHeight:1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* mission / vision / values */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:28 }}>
              {[
                { label:"Mission", col:C.violet, text:"Build the infrastructure that lets physical goods circulate with their full history intact — forever." },
                { label:"Vision",  col:C.green,  text:"A world where every physical product has a permanent, portable, verifiable record that survives every owner." },
                { label:"Belief",  col:C.orange, text:"Circular trade only works when trust is built into the object itself. That's what the DPP does. That's what we build." },
              ].map(v => (
                <div key={v.label} style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:18 }}>
                  <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:v.col, marginBottom:10 }}>{v.label}</div>
                  <div style={{ fontSize:13, color:"white", fontWeight:600, lineHeight:1.7 }}>{v.text}</div>
                </div>
              ))}
            </div>

            {/* taglines */}
            <div style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:20 }}>
              <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, marginBottom:14 }}>Official Taglines — Updated for Circular Trade Infrastructure</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { tag:"Primary",      text:"Built for Circular Trade · Roam Free",         note:"Primary brand line. Middle dot mandatory. Both halves always together." },
                  { tag:"Positioning",  text:"Circular Trade Infrastructure",                 note:"Company descriptor. Used in press, B2B, investor contexts. Not a tagline — a category definition." },
                  { tag:"Short",        text:"Roam Free",                                     note:"Social bios · icon lockups · app store subtitle · always available as standalone" },
                  { tag:"DPP line",     text:"Own It. Prove It. Trade It.",                   note:"DPP feature marketing · onboarding · the lifecycle in three beats" },
                  { tag:"Trust line",   text:"The Chain Doesn't Lie.",                        note:"Authentication · verification · anti-counterfeit contexts" },
                  { tag:"Object line",  text:"Every Product Has a Story.",                    note:"Collector · luxury · heritage · provenance-led marketing" },
                  { tag:"Rail line",    text:"The Infrastructure Travels With the Product.",  note:"B2B · brand partnerships · 'our rails in your product' contexts" },
                  { tag:"Direct",       text:"Real Goods. Real Provenance.",                  note:"Anti-fake positioning · trust campaign · direct-to-consumer clarity" },
                ].map(t => (
                  <div key={t.tag} style={{ display:"flex", gap:16, paddingBottom:10, borderBottom:`1px solid rgba(46,46,56,.5)`, alignItems:"flex-start" }}>
                    <div style={{ width:100, flexShrink:0, fontSize:9, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase", color:C.violet, paddingTop:3 }}>{t.tag}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:800, color:"white", letterSpacing:"-0.2px" }}>{t.text}</div>
                      <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{t.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ 02 VOICE PERSONA ══ */}
          <div id="persona" style={{ marginBottom:72 }}>
            <SecHead n="02" title="Voice Persona" sub="If DeStore were a person, who would they be?" />

            <div style={{ background:`linear-gradient(135deg,rgba(28,28,34,1),rgba(20,20,24,1))`, border:`1px solid ${C.bdr}`, borderRadius:16, padding:28, marginBottom:24 }}>
              <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:24 }}>
                <div style={{ width:72, height:72, borderRadius:"50%", background:`linear-gradient(135deg,${C.royal},${C.orchid},${C.violet})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>◈</div>
                <div>
                  <div style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.4px", marginBottom:6 }}>The Infrastructure Builder</div>
                  <div style={{ fontSize:13, color:C.dim, lineHeight:1.8 }}>
                    The person who built the roads before anyone knew they needed them. Not the flashy app developer, not the hype merchant — the quiet engineer who understood that circular trade was broken at the infrastructure level, not the UX level. They speak with the calm authority of someone who has solved the hard problem. They don't need to sell you on it. The infrastructure speaks for itself.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { trait:"Infrastructural",  col:C.violet, desc:"Thinks in systems, not features. Every sentence is load-bearing. Nothing decorative. The words are the rails." },
                { trait:"Direct",           col:C.green,  desc:"Says exactly what it means in the fewest words. No filler. No warm-up. No 'Hey there!' — just the thing." },
                { trait:"Grounded",         col:C.orange, desc:"The DPP is blockchain-based but we don't say blockchain. The infrastructure is invisible. The outcome is everything." },
                { trait:"Circular-minded",  col:C.pink,   desc:"Objects don't have one owner — they have a lifecycle. Every word acknowledges that products outlast transactions." },
                { trait:"Trustworthy",      col:C.green,  desc:"Never makes a claim it can't back with a record. 'Verified' means verified. The proof is always one scan away." },
                { trait:"Quietly bold",     col:C.violet, desc:"Confident enough to use 'infrastructure' in consumer copy. That's a deliberate choice — it signals seriousness, not complexity." },
              ].map(p => (
                <div key={p.trait} style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:900, letterSpacing:"0.04em", color:p.col, marginBottom:8 }}>{p.trait}</div>
                  <div style={{ fontSize:12, color:C.dim, lineHeight:1.7 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ 03 TONE PILLARS ══ */}
          <div id="pillars" style={{ marginBottom:72 }}>
            <SecHead n="03" title="Tone Pillars" sub="Four dials — the mix changes by context, but these are always the range" />

            <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:28 }}>
              {[
                {
                  pillar:"Infrastructure, not platform",
                  dial:"Foundational · load-bearing",
                  col:C.violet,
                  desc:"We are not an app with features. We are the layer underneath trade. Every word should feel like it's built to last, not to convert.",
                  do:"Your DPP travels with the product through every owner, forever.",
                  dont:"Our amazing platform helps you sell your stuff with cool blockchain features!",
                },
                {
                  pillar:"Clear, not technical",
                  dial:"Plain language · zero jargon",
                  col:C.green,
                  desc:"The infrastructure is complex. The words describing it should not be. If a sentence needs a glossary, rewrite the sentence.",
                  do:"Scan the tag. See the full ownership history. Buy with confidence.",
                  dont:"The immutable on-chain data persistence layer enables trustless provenance verification at the asset level.",
                },
                {
                  pillar:"Circular, not transactional",
                  dial:"Lifecycle thinking · not one-time sale",
                  col:C.orange,
                  desc:"A transaction ends. Circular trade continues. Every word should acknowledge that the object will have more owners, more history, more life after this moment.",
                  do:"This is the third owner. The DPP has the full record. It'll carry forward to the next.",
                  dont:"Buy now! Limited stock! Don't miss out on this deal!",
                },
                {
                  pillar:"Modern, not crypto",
                  dial:"2025 infrastructure · not 2017 NFT",
                  col:C.pink,
                  desc:"We don't say 'Web3', 'blockchain', 'token', or 'NFT' in consumer copy. We talk about records, proof, and ownership — things everyone understands and trusts.",
                  do:"The record is permanent. Any future owner can verify it.",
                  dont:"Leveraging decentralised blockchain technology to tokenise real-world assets on-chain.",
                },
              ].map(p => (
                <div key={p.pillar} style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:14, overflow:"hidden" }}>
                  <div style={{ background:`linear-gradient(90deg,${p.col}18,transparent)`, borderBottom:`1px solid ${C.bdr}`, padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ fontSize:15, fontWeight:900, letterSpacing:"-0.2px", color:"white" }}>{p.pillar}</div>
                    <div style={{ fontSize:10, fontWeight:800, color:p.col, background:`${p.col}14`, border:`1px solid ${p.col}30`, borderRadius:20, padding:"3px 12px" }}>{p.dial}</div>
                  </div>
                  <div style={{ padding:20 }}>
                    <div style={{ fontSize:13, color:C.dim, lineHeight:1.7, marginBottom:16 }}>{p.desc}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      <div className="do-card" style={{ padding:"12px 14px" }}>
                        <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.1em", color:C.green, marginBottom:7 }}>✓ DO</div>
                        <div style={{ fontSize:12, fontWeight:700, color:"white", lineHeight:1.6 }}>"{p.do}"</div>
                      </div>
                      <div className="dont-card" style={{ padding:"12px 14px" }}>
                        <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.1em", color:C.pink, marginBottom:7 }}>✗ DON'T</div>
                        <div style={{ fontSize:12, fontWeight:600, color:"#9999b0", lineHeight:1.6 }}>"{p.dont}"</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ 04 VOCABULARY ══ */}
          <div id="vocab" style={{ marginBottom:72 }}>
            <SecHead n="04" title="Vocabulary" sub="Words that are DeStore · words that are not · the term translation guide" />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:C.green, marginBottom:14 }}>✓ In-Vocabulary</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["Circular trade","Infrastructure","Verified","Provenance","Record","History","Authentic","Ownership","Claim","Passport","DPP","Traceable","Circulate","Transfer","Scan","Proof","Heritage","Genuine","Origin","Minted","Payment link","Trade","Pass on","Roam","Discover"].map(w => (
                    <Word key={w} word={w} color={C.green} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:C.pink, marginBottom:14 }}>✗ Out-of-Vocabulary</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["Marketplace","Web3","Blockchain","NFT","Token","Crypto","Decentralised","Immutable","Trustless","Paradigm","Disrupt","Platform","Revolutionary","Game-changer","Leverage","Synergy","HODL","To the moon","Alpha","LFG","Ape in"].map(w => (
                    <Word key={w} word={w} color={C.pink} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:20 }}>
              <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, marginBottom:14 }}>Term Translation — How we say the technical and the retired</div>
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {[
                  ["Marketplace",        "Circular trade infrastructure · trade network", "'We built the infrastructure for circular trade' — not 'we built a marketplace'"],
                  ["Blockchain",         "The record · the proof",                         "'The record is permanent and public — anyone can verify it'"],
                  ["NFT / Token",        "DPP · Digital Product Passport",                "'Your product's digital identity — minted once, travels with it forever'"],
                  ["Smart contract",     "The rules",                                      "'The rules are written into the product record — no one can change them'"],
                  ["Minting",            "Creating a passport",                            "'A permanent record is created at the point of manufacture'"],
                  ["On-chain verify",    "Verified · Confirmed",                           "'Confirmed — it's in the permanent record'"],
                  ["Wallet",             "Your DeStore account",                           "Account holds ownership claims — never mention wallets to consumers"],
                  ["Transfer / Trade",   "Trade · Pass on · Circulate",                   "'Trade this · pass the ownership on · let it circulate'"],
                  ["Soneium",            "(Never say to consumers)",                       "The infrastructure is invisible — users never need to know the chain name"],
                  ["Payment link",       "Payment link",                                   "This one is fine as-is — it's plain, functional, and exactly what it is"],
                ].map(([tech, plain, context], i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"160px 190px 1fr", gap:16, padding:"11px 0", borderBottom: i < 9 ? `1px solid rgba(46,46,56,.4)` : "none", alignItems:"start" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.pink }}>{tech}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:C.green }}>{plain}</div>
                    <div style={{ fontSize:11, color:C.muted, lineHeight:1.6, fontStyle:"italic" }}>{context}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ 05 COPY IN ACTION ══ */}
          <div id="copy" style={{ marginBottom:72 }}>
            <SecHead n="05" title="Copy in Action" sub="Real examples across contexts — all written to circular trade infrastructure positioning" />

            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:14, letterSpacing:"0.04em", textTransform:"uppercase" }}>Product Listing — Titles</div>
              <Copy context="Streetwear / Sneakers" color={C.violet} text="Nike Air Max 95 — DS. Size US 10. Byron Bay." note="Condition first. Size. Location. Clean period after. No emoji. No 'marketplace' language." />
              <Copy context="Luxury / Heritage" color={C.violet} text="Rolex Submariner — Full kit. 2019. Three previous owners. Provenance on record." note="'Provenance on record' is the DPP signal. Circular history is the value, not just the object." />
              <Copy context="Electronics" color={C.violet} text="Sony WH-1000XM5 — Excellent condition. Original packaging. Verified." note="'Verified' earns its own sentence. One word, full weight." />
            </div>

            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.green, marginBottom:14, letterSpacing:"0.04em", textTransform:"uppercase" }}>Product Description — Body Copy</div>
              <Copy context="Short form (under 40 words)" color={C.green} text="Worn twice. No creasing, no scuffs. Original box and both lace sets included. Size runs true. Selling because I bought the wrong colourway. Full ownership history and DPP transfer on purchase." note="Matter-of-fact. 'Full ownership history' signals circular infrastructure without naming it." />
              <Copy context="Heritage / Collector item" color={C.green} text="Made in Japan, 1987. Two prior owners — both on the record. Original service history attached to the DPP. This object has circulated through four decades. The record has followed it the whole way." note="'Circulated' is circular trade language. 'The record has followed it' — infrastructure as companion." />
            </div>

            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.orange, marginBottom:14, letterSpacing:"0.04em", textTransform:"uppercase" }}>UI Microcopy — States & Labels</div>
              <Copy context="DPP Verified chip" color={C.orange} text="◈ Verified" note="Symbol first. No full sentence. The ◈ mark is the DeStore infrastructure signal." />
              <Copy context="Empty state — no listings" color={C.orange} text="Nothing in circulation here yet. Be the first to list." note="'In circulation' is circular trade language dropped naturally into microcopy." />
              <Copy context="Success — listing posted" color={C.orange} text="Listed. Your DPP is live and the record is attached." note="Two beats: the action, then the infrastructure proof." />
              <Copy context="Error — upload failed" color={C.orange} text="That image didn't upload. Try again or choose a different file." note="What happened. What to do. No apology theatre." />
              <Copy context="Ownership transfer" color={C.orange} text="Transferred. The new owner holds the claim — the full history stays intact." note="The continuity of the record is the reassurance. Circular infrastructure at work." />
              <Copy context="Payment link created" color={C.orange} text="Payment link ready. Share it anywhere — the record is attached." note="'Share it anywhere' signals the infrastructure travels with the link, not tied to a venue." />
            </div>

            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.pink, marginBottom:14, letterSpacing:"0.04em", textTransform:"uppercase" }}>Marketing / Social</div>
              <Copy context="Instagram caption — product drop" color={C.pink} text="Found: 1994 Levi's 501 trucker. Two prior owners. Full record on the DPP. Byron Bay. ◈" note="'Full record' not 'blockchain verified'. Location closes it. ◈ is the silent infrastructure signal." />
              <Copy context="Brand onboarding CTA" color={C.pink} text="Your products have a history. Now they have infrastructure." note="Speaks to brands. 'Infrastructure' is deliberate — it signals B2B seriousness." />
              <Copy context="Seller headline" color={C.pink} text="List it. Verify it. Let it circulate." note="Circular verb ('circulate') in the CTA. Echo of the infrastructure positioning." />
              <Copy context="B2B pitch line" color={C.pink} text="We built the infrastructure for circular trade. Your products run on it." note="Direct B2B. 'Your products run on it' — we are the rails they sit on." />
            </div>
          </div>

          {/* ══ 06 BY CHANNEL ══ */}
          <div id="channels" style={{ marginBottom:72 }}>
            <SecHead n="06" title="Voice by Channel" sub="Same infrastructure, different register — how the voice adapts without losing its core" />
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { ch:"App UI — Microcopy", col:C.violet, rules:["Ultra-short — every word must earn its pixel. Infrastructure copy is load-bearing, not decorative.","'In circulation' replaces 'listed'. 'Record' replaces 'blockchain'. 'Verified' replaces everything else.","Never use exclamation marks. The infrastructure is reliable — it doesn't exclaim.","Empty states: 'Nothing in circulation yet' not 'Wow, such empty!'","Errors: what broke → what to do. No apology. The rails are honest about faults."] },
                { ch:"Product Listings", col:C.green, rules:["Titles: Condition · Model · Detail · Location. Clean periods. No emoji.","Body: matter-of-fact, past tense for history, present tense for current state.","DPP language: 'provenance on record' · 'history attached' · 'record follows the product' — never 'NFT'.","'Circulate' and 'circulation' are approved verbs for listing contexts.","Circular trade framing: the next owner is always implied — 'the record travels with it'."] },
                { ch:"Payment Links", col:C.orange, rules:["The payment link is infrastructure — describe it functionally, not as a product feature.","'Your payment link is live. Share it anywhere.' — platform-agnostic is the point.","Never position the payment link as 'checkout' or 'buy now' — it's a trade facilitation tool.","Confirmation copy: 'Payment received. Ownership transferred. Record updated.' — three beats."] },
                { ch:"Push Notifications", col:C.pink, rules:["One idea per notification — never two things.","Lead with the action or the object, not the context.","'Your DPP is live.' not 'Congratulations! Your Digital Product Passport has been successfully created!'","Max 40 characters for title, 90 for body.","Time-sensitive: use the deadline, not the urgency adjective."] },
                { ch:"Social Media", col:C.green, rules:["Instagram: copy is context, not caption. Three lines max before the fold. ◈ closes posts silently.","'Circulating' is a strong Instagram verb — objects with DPPs circulate, they don't just 'sell'.","Facebook: the payment link IS the post — descriptive first sentence, price, location.","LinkedIn/B2B: here 'circular trade infrastructure' is the full phrase — use it directly.","Never 'NFT', never 'Web3', never 'blockchain' in any social context."] },
                { ch:"Press / B2B / Investor", col:C.violet, rules:["This is the one context where 'circular trade infrastructure' is the lead, not a supporting line.","'DeStore builds the infrastructure layer for circular trade' — company description, one sentence.","Here we can reference 'DPP issuance', 'on-chain provenance', 'Soneium' — the audience needs it.","Addressable market framing: not 'resale marketplace' — 'circular economy infrastructure for physical goods'.","The DPP is the product. The payment link is the mechanism. The record is the proof. Three layers."] },
              ].map(c => (
                <div key={c.ch} style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, overflow:"hidden" }}>
                  <div style={{ background:`${c.col}12`, borderBottom:`1px solid ${C.bdr}`, padding:"12px 18px", fontSize:13, fontWeight:800, color:c.col }}>{c.ch}</div>
                  <div style={{ padding:"14px 18px", display:"flex", flexDirection:"column", gap:7 }}>
                    {c.rules.map((r, i) => (
                      <div key={i} style={{ display:"flex", gap:10 }}>
                        <span style={{ color:c.col, flexShrink:0, fontSize:12, marginTop:1 }}>→</span>
                        <span style={{ fontSize:12, color:C.dim, lineHeight:1.6 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ 07 GRAMMAR ══ */}
          <div id="grammar" style={{ marginBottom:72 }}>
            <SecHead n="07" title="Grammar & Style Rules" sub="The specifics that make DeStore copy look like DeStore copy" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { rule:"Sentence fragments are fine", note:"'Verified. Listed. Live.' — three fragments, total clarity. Fragments are purposeful economy, not laziness." },
                { rule:"Full stops. Always.", note:"End every sentence — including the last one in a block — with a full stop. It gives the copy authority." },
                { rule:"The middle dot · not a slash /", note:"'Built for Circular Trade · Roam Free' — the dot is our separator. Never use slash, dash, or pipe." },
                { rule:"Capitalise DPP, not blockchain", note:"DPP is a proper noun (it's our product). 'blockchain' is a common noun — lowercase always." },
                { rule:"Numbers over words for specs", note:"'Size 10' not 'size ten'. '$285' not 'two hundred and eighty-five dollars'. Specificity = trust." },
                { rule:"No exclamation marks", note:"In UI copy, app labels, and product descriptions: never. In marketing on high-energy moments: maximum one." },
                { rule:"AUD not $AU — locale aware", note:"Price labels show currency code. App detects locale and adjusts. Default: AUD for AU, USD for US." },
                { rule:"Active voice always", note:"'The record is live' beats 'The record has been made live'. Subject → verb → object, always." },
                { rule:"DeStore is one word, capital D, capital S", note:"Never 'De Store', 'destore', or 'Destore'. Always 'DeStore'." },
                { rule:"'Roam Free' is not a sentence opener", note:"Tagline is a tagline — not a sign-off, not a greeting, not a button label. Used only in brand contexts." },
              ].map(g => (
                <div key={g.rule} style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:12, fontWeight:800, color:"white", marginBottom:7 }}>{g.rule}</div>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.7 }}>{g.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ 08 NAMING ══ */}
          <div id="naming" style={{ marginBottom:72 }}>
            <SecHead n="08" title="Naming System" sub="The taxonomy that keeps everything legible — and aligned to circular trade infrastructure" />
            <div style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:20, marginBottom:20 }}>
              <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, marginBottom:14 }}>Product & Feature Names</div>
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {[
                  ["DeStore",           "DeStore",                         "Capital D, capital S, one word. Never 'De Store', 'destore', or 'Destore'."],
                  ["Category",          "Circular Trade Infrastructure",   "The company's category descriptor. Used in B2B, press, investor contexts. Not a tagline."],
                  ["DPP",               "Digital Product Passport",        "Always 'DPP' short form, 'Digital Product Passport' in full. Never 'NFT', 'token', or 'certificate'."],
                  ["Listing",           "A listing",                       "What a seller creates. Not 'post', 'item', 'ad', or 'drop'. A listing."],
                  ["Ownership Claim",   "Claim",                           "What the buyer receives. Not a token, not an NFT. 'You hold the claim.'"],
                  ["Payment Link",      "Payment link",                    "Functional and plain — exactly what it is. No reinvention needed."],
                  ["Transfer",          "Trade · Transfer · Circulate",    "'Transfer' for the mechanical action. 'Trade' for the human act. 'Circulate' for the lifecycle."],
                  ["B&B Treasury",      "(Internal only)",                 "Buyback & burn mechanism. Never in consumer copy."],
                  ["Zina",              "Zina",                            "DeStore's AI assistant. First name only. Not 'our AI', not 'the bot', not 'assistant'."],
                  ["Marketplace",       "Retired — do not use",            "Replaced by 'circular trade infrastructure' at positioning level. 'Trade' or 'listing' in product copy."],
                ].map(([name, formal, note], i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"150px 200px 1fr", gap:16, padding:"11px 0", borderBottom: i < 9 ? `1px solid rgba(46,46,56,.4)` : "none", alignItems:"start" }}>
                    <div style={{ fontWeight:900, fontSize:12, color: name === "Marketplace" ? C.pink : C.violet }}>{name}</div>
                    <div style={{ fontWeight:700, fontSize:12, color: name === "Marketplace" ? C.dim : "white" }}>{formal}</div>
                    <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:20 }}>
              <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, marginBottom:14 }}>Status States — What to call each one in copy</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10 }}>
                {[
                  { state:"Live",           col:C.greenAlt, note:"In circulation · listing active" },
                  { state:"Verified",       col:C.green,    note:"DPP confirmed and attached" },
                  { state:"Pending",        col:C.orange,   note:"Awaiting action or review" },
                  { state:"Sold",           col:C.pink,     note:"Transaction complete" },
                  { state:"Transferred",    col:C.violet,   note:"Ownership claim circulated" },
                  { state:"Draft",          col:C.muted,    note:"Not yet in circulation" },
                  { state:"Expired",        col:"#c0392b",  note:"Listing period ended" },
                  { state:"Minted",         col:C.green,    note:"DPP created on-chain" },
                ].map(s => (
                  <div key={s.state} style={{ background:`${s.col}0d`, border:`1px solid ${s.col}28`, borderRadius:10, padding:"10px 12px" }}>
                    <div style={{ fontSize:12, fontWeight:900, color:s.col, marginBottom:4 }}>{s.state}</div>
                    <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ 09 AI VOICE PROMPT ══ */}
          <div id="prompt" style={{ marginBottom:72 }}>
            <SecHead n="09" title="AI Voice Prompt" sub="Paste this at the start of any DeStore copy request — for Zina, Claude, or any AI tool" />

            <div style={{ background:`linear-gradient(135deg,rgba(50,27,104,.3),rgba(10,10,13,1))`, border:`1px solid rgba(179,84,241,.3)`, borderRadius:16, padding:28, marginBottom:20 }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11.5, lineHeight:2, color:"#c8c8d8", whiteSpace:"pre-wrap" }}>
{`<span style="color:#B354F1">─── DESTORE BRAND VOICE v2.0 ───────────────────────────────────</span>

You are writing copy for DeStore.
Category: Circular Trade Infrastructure
Primary tagline: "Built for Circular Trade · Roam Free"

<span style="color:#28B79D">WHAT DESTORE IS:</span>
  The infrastructure layer that makes circular trade possible.
  Payment links + DPP issuance + ownership claims.
  Not a marketplace. Not a crypto app. The rails underneath trade.

<span style="color:#28B79D">PERSONA:</span>
  The Infrastructure Builder.
  Calm authority. Load-bearing words. No filler.
  Knows the tech — never shows it off.
  Backs every claim with a record, never with hype.

<span style="color:#28B79D">TONE PILLARS:</span>
  Infrastructure, not platform  — foundational, built to last
  Clear, not technical          — plain language, zero jargon
  Circular, not transactional   — lifecycle thinking, not one-time sale
  Modern, not crypto            — records and proof, not tokens and chains

<span style="color:#28B79D">VOCABULARY — USE:</span>
  Circular trade · Infrastructure · Verified · Provenance
  Record · History · Authentic · Ownership · Claim
  Passport · DPP · Circulate · Trade · Transfer · Proof
  Payment link · Roam · Discover · Pass on

<span style="color:#28B79D">VOCABULARY — NEVER USE:</span>
  Marketplace · Web3 · Blockchain · NFT · Token · Crypto
  Decentralised · Immutable · Trustless · Paradigm · Disrupt
  Platform · Revolutionary · Game-changer · Leverage · Synergy
  HODL · LFG · Ape in · To the moon

<span style="color:#28B79D">TERM TRANSLATIONS:</span>
  'marketplace'     → 'circular trade infrastructure' (positioning)
                      'trade' / 'listing' (product copy)
  'blockchain'      → 'the record'
  'NFT / token'     → 'DPP' or 'Digital Product Passport'
  'minting'         → 'creating a passport' / 'minted'
  'on-chain verify' → 'verified' / 'confirmed'
  'wallet'          → 'your DeStore account'
  'transfer'        → 'trade' / 'pass on' / 'circulate'
  'Soneium'         → never mention to consumers

<span style="color:#28B79D">GRAMMAR RULES:</span>
  — Sentence fragments are fine. Clarity over completeness.
  — Full stops always. Every sentence, every time.
  — Middle dot · as separator. Never slash, dash, or pipe.
  — 'DeStore' — capital D, capital S, one word, always.
  — Active voice always. Subject → verb → object.
  — No exclamation marks in UI or product copy. Ever.
  — Numbers for specs: '$285', 'Size 10', never spelled out.
  — 'blockchain' lowercase. 'DPP' uppercase always.
  — 'marketplace' is a retired word — do not use in any copy.

<span style="color:#28B79D">MICROCOPY RULES:</span>
  Empty states: 'Nothing in circulation yet' + invite to list.
  Errors: what broke → what to do. No apology.
  Success: action → infrastructure proof. Two beats.
  Labels: verbs for actions, nouns for states.
  Transfer: always confirm the record continuity, not just the action.

<span style="color:#B354F1">─── PAGE-SPECIFIC INSTRUCTION ─────────────────────────────────</span>
[DESCRIBE YOUR COPY TASK — context, channel, tone register, audience]`}
              </div>
            </div>

            <div style={{ background:C.d3, border:`1px solid ${C.bdr}`, borderRadius:13, padding:20 }}>
              <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, marginBottom:14 }}>Quick-Fire Test — Circular Trade Infrastructure voice in action</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { prompt:"Write a push notification for a price drop on a listing the user saved.", result:"Price drop on your saved Air Max 95. Now $250 — was $285." },
                  { prompt:"Write the success message after a DPP is created.", result:"Passport created. The record is live and attached to your listing." },
                  { prompt:"Write a one-sentence company description for a press release.", result:"DeStore builds the infrastructure for circular trade — payment links, Digital Product Passports, and ownership claims that travel with physical goods through every owner." },
                  { prompt:"Write an empty state message for a category with no listings.", result:"Nothing in circulation here yet. Be the first to list." },
                  { prompt:"Write a payment link confirmation message.", result:"Payment link ready. Share it anywhere — the record travels with it." },
                  { prompt:"Write a B2B headline for a brand partnership pitch.", result:"Your products have a lifecycle. We built the infrastructure for it." },
                ].map((ex, i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div style={{ background:"#0d0d10", border:`1px solid ${C.bdr}`, borderRadius:10, padding:"12px 14px" }}>
                      <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>Prompt</div>
                      <div style={{ fontSize:12, color:C.dim, lineHeight:1.6 }}>{ex.prompt}</div>
                    </div>
                    <div style={{ background:`rgba(179,84,241,.05)`, border:`1px solid rgba(179,84,241,.2)`, borderRadius:10, padding:"12px 14px" }}>
                      <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:C.violet, marginBottom:7 }}>Output</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"white", lineHeight:1.6 }}>"{ex.result}"</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div style={{ borderTop:`1px solid ${C.bdr}`, paddingTop:28, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <div>
              <Logo fill="#ffffff" width={100} />
              <div style={{ fontSize:11, color:C.muted, marginTop:8 }}>© DeStore Network · Brand Voice Guide v2.0 · March 2026 · Circular Trade Infrastructure</div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[["Based on Glyphic Creative brand pack", C.violet], ["UI Style Guide v3.0", C.green], ["Circular Trade Infrastructure", C.orange]].map(([t,c]) => (
                <span key={t} style={{ fontSize:10, fontWeight:700, color:c, background:`${c}12`, border:`1px solid ${c}28`, borderRadius:20, padding:"4px 12px" }}>{t}</span>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
