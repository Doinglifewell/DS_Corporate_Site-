import { useState } from "react";

const C = {
  d0:"#0a0a0d", d1:"#0d0d10", d2:"#141418", d3:"#1c1c22", d4:"#26262e",
  bdr:"#2e2e38", muted:"#6b6b80", dim:"#9999b0",
  violet:"#B354F1", orchid:"#6A14DB", royal:"#321B68",
  green:"#28B79D", green2:"#2FB457", pink:"#FF1B9A", orange:"#FF9F46",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

@property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:#0a0a0d; }
::-webkit-scrollbar-thumb { background:#2e2e38; border-radius:2px; }
body { background:#0a0a0d; color:#fff; font-family:'Plus Jakarta Sans',sans-serif; -webkit-font-smoothing:antialiased; }

@keyframes spin-border { to { --angle:360deg; } }
@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes spin { to { transform:rotate(360deg); } }

.code {
  background:#060608;
  border:1px solid #2e2e38;
  border-radius:12px;
  padding:18px 20px;
  font-family:'JetBrains Mono',monospace;
  font-size:11px;
  line-height:1.9;
  overflow-x:auto;
  white-space:pre;
  color:#9999b0;
  margin-bottom:16px;
}
.cv { color:#B354F1; }
.cg { color:#28B79D; }
.co { color:#FF9F46; }
.cb { color:#79b8ff; }
.cm { color:#6b6b80; font-style:italic; }
.cw { color:#e8eaf0; }
.cp { color:#FF1B9A; }
.cs { color:#a8ff78; }

.nav-btn {
  display:flex; align-items:center; gap:8px;
  padding:8px 18px; font-size:12px; font-weight:600;
  color:#6b6b80; cursor:pointer; border:none;
  border-left:2px solid transparent;
  background:transparent; width:100%; text-align:left;
  font-family:'Plus Jakarta Sans',sans-serif;
  transition:all .14s;
}
.nav-btn:hover { color:#9999b0; background:rgba(255,255,255,.025); }

.ham-btn {
  display:none; align-items:center; justify-content:center;
  width:36px; height:36px; background:transparent;
  border:1px solid #2e2e38; border-radius:8px;
  cursor:pointer; flex-shrink:0;
}
.ham-btn span { display:block; width:16px; height:1.5px; background:#9999b0; border-radius:2px; }
.ham-btn span + span { margin-top:4px; }

.sidebar-backdrop { display:none; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:199; }

@media (max-width:768px) {
  .ham-btn { display:flex; }
  .sidebar-panel {
    position:fixed !important; top:0 !important; left:-240px !important;
    height:100vh !important; z-index:200; width:240px !important;
    transition:left .25s cubic-bezier(.34,1,.64,1);
    box-shadow:4px 0 24px rgba(0,0,0,.5);
  }
  .sidebar-panel.open { left:0 !important; }
  .sidebar-backdrop { display:block; }
  .content-pad { padding:28px 16px 100px !important; }
  .grid2 { grid-template-columns:1fr !important; }
  .code { font-size:10px !important; padding:12px !important; }
}
`;

const PATHS = [
  "M398.1,33.4c-3.2,0-5.8-2.6-5.8-5.8s2.6-5.8,5.8-5.8s5.8,2.6,5.8,5.8S401.3,33.4,398.1,33.4z",
  "M1.4,2.8h24.1c21.9,0,36.2,15.4,36.2,35.4c0,20.1-14.3,35.3-36.2,35.3H1.4V2.8z M25.6,65.6c17.2,0,27.1-12.3,27.1-27.4c0-15.3-9.6-27.5-27.1-27.5H10.2v55H25.6z",
  "M97.5,21.1c15.5,0,24.6,12.1,24.6,27.4v2H80.6c0.6,9.6,7.4,17.7,18.4,17.7c5.8,0,11.8-2.3,15.8-6.5l3.8,5.2c-5.1,5.1-12,7.8-20.3,7.8c-15.1,0-26.1-10.9-26.1-26.9C72.3,33,82.8,21.1,97.5,21.1z M80.6,44.7h33.6c-0.1-7.6-5.2-17.1-16.8-17.1C86.4,27.6,81,36.8,80.6,44.7z",
  "M137.8,49.9c5.1,5.1,12.9,9.3,22.6,9.3c6.2,0,10.1-2.6,10.1-6c0-4-4.6-5.6-12.1-7.2c-11.6-2.3-28-5.3-28-22c0-11.9,10.1-22.1,28.2-22.1c11.3,0,21.2,3.4,28.7,9.8l-10,13c-5.9-4.9-13.7-7.3-19.9-7.3c-6,0-8.4,2.4-8.4,5.5c0,3.7,4.3,5,12.2,6.5c11.6,2.4,27.7,5.8,27.7,21.8c0,14.2-10.5,23.6-29.4,23.6c-14.3,0-24.3-4.4-31.3-11.2L137.8,49.9z",
  "M199.9,59.7V36.5h-8.5V22.3h8.5v-14h16.2v14h10.4v14.2h-10.4v18.6c0,3,1.7,5.2,4.6,5.2c1.8,0,3.6-0.6,4.1-1.3l3.2,12.3c-2,1.9-6,3.4-12.1,3.4C205.5,74.8,199.9,69.6,199.9,59.7z",
  "M231.2,47.9c0-14.4,10.5-26.8,27.9-26.8c17.6,0,28,12.4,28,26.8s-10.4,26.9-28,26.9C241.7,74.8,231.2,62.3,231.2,47.9z M270.3,47.9c0-6.8-4-12.4-11.2-12.4c-7.1,0-11,5.6-11,12.4c0,6.9,3.9,12.5,11,12.5C266.3,60.4,270.3,54.8,270.3,47.9z",
  "M295.6,22.3h16.3v6.5c3.4-4.1,9.8-7.7,16-7.7v15.8c-1-0.3-2.3-0.5-4-0.5c-4.2,0-9.8,1.8-12,4.8v32.4h-16.3V22.3z",
  "M359.1,21.1c15.1,0,26.2,11.1,26.2,28.5V53h-36.4c1,4.8,5.4,9.1,13,9.1c4.6,0,9.6-1.8,12.5-4.3l6.9,10.2c-5.1,4.6-13.6,6.8-21.4,6.8c-15.8,0-28-10.3-28-26.9C331.9,33,343.1,21.1,359.1,21.1z M348.6,42.5h21.1c-0.4-3.6-3.1-8.8-10.6-8.8C352,33.7,349.3,38.7,348.6,42.5z",
];

const Logo = ({ width=110 }) => (
  <svg width={width} height={width*(76.5/405.4)} viewBox="0 0 405.4 76.5" xmlns="http://www.w3.org/2000/svg">
    {PATHS.map((d,i) => <path key={i} d={d} fill="#fff"/>)}
  </svg>
);

const Chip = ({ children, color=C.dim }) => (
  <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.06em", color, background:`${color}14`, border:`1px solid ${color}30`, borderRadius:20, padding:"4px 12px" }}>{children}</span>
);

const Sec = ({ id, n, title, sub, accent=C.violet, children }) => (
  <section id={id} style={{ marginBottom:68, animation:"fadeUp .35s ease" }}>
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24, paddingBottom:14, borderBottom:`1px solid ${C.bdr}` }}>
      <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${accent},${accent}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0, boxShadow:`0 0 16px ${accent}50` }}>{n}</div>
      <div>
        <div style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.3px" }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:C.dim, marginTop:2 }}>{sub}</div>}
      </div>
    </div>
    {children}
  </section>
);

const Card = ({ children, accent, style={} }) => (
  <div style={{ background:C.d2, border:`1px solid ${accent||C.bdr}`, borderRadius:13, padding:18, ...style }}>{children}</div>
);

const Sub = ({ children, col=C.muted }) => (
  <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:col, marginBottom:10, marginTop:24 }}>{children}</div>
);

const Row = ({ label, val, col=C.dim }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.bdr}33`, fontSize:12 }}>
    <span style={{ color:C.muted, fontWeight:600 }}>{label}</span>
    <span style={{ color:col, fontWeight:700 }}>{val}</span>
  </div>
);

const NAV = [
  { id:"pregen",    label:"01 · DPP Pregeneration" },
  { id:"buffer",    label:"02 · 5% Buffer Logic" },
  { id:"audit",     label:"03 · 26-Day Audit Cycle" },
  { id:"selfheal",  label:"04 · Self-Healing Update" },
  { id:"grok",      label:"05 · xAI Grok + X Search" },
  { id:"memo",      label:"06 · Memo & Notifications" },
  { id:"n8n",       label:"07 · n8n Workflow Specs" },
  { id:"chains",    label:"08 · Multi-Chain Config" },
  { id:"pricing",   label:"09 · Pricing & Business Model" },
  { id:"blockchain",label:"10 · Blockchain Architecture" },
  { id:"security",  label:"11 · Security & Privacy Audit" },
  { id:"ecosystem", label:"12 · DeStore Ecosystem" },
  { id:"espr",      label:"13 · ESPR Compliance Build" },
  { id:"edge",      label:"14 · Enterprise Edge Node" },
  { id:"shell",     label:"15 · Platform Shell Architecture" },
  { id:"uxflow",    label:"16 · Platform UX Flow" },
];

export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div style={{ position:"sticky", top:0, zIndex:300, background:`${C.d1}f4`, backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.bdr}` }}>
        <div style={{ padding:"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button className="ham-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
            <div style={{ display:"flex", alignItems:"center" }}>
              <Logo width={120}/>
            </div>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <Chip color={C.orange}>Pregen · 5% Buffer</Chip>
            <Chip color={C.pink}>Security Audit</Chip>
            <Chip color={C.violet}>xAI Threat Intel</Chip>
          </div>
        </div>
        <div style={{ height:3, background:`linear-gradient(90deg,${C.orange},${C.pink},${C.violet},transparent)` }}/>
      </div>

      <div style={{ display:"flex" }}>
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}/>}
        <aside className={`sidebar-panel${sidebarOpen?" open":""}`} style={{ width:220, flexShrink:0, position:"sticky", top:52, height:"calc(100vh - 52px)", overflowY:"auto", background:C.d1, borderRight:`1px solid ${C.bdr}`, paddingTop:20, paddingBottom:40 }}>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, padding:"0 18px 12px" }}>Systems Guide</div>
          {NAV.map(nav => (
            <button key={nav.id} className={`nav-btn${activeNav===nav.id?" active":""}`}
              style={{ borderLeftColor:activeNav===nav.id?C.orange:"transparent", color:activeNav===nav.id?C.orange:undefined, background:activeNav===nav.id?`${C.orange}10`:undefined }}
              onClick={() => scrollTo(nav.id)}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:activeNav===nav.id?C.orange:C.bdr, flexShrink:0 }}/>
              {nav.label}
            </button>
          ))}
        </aside>

        <main style={{ flex:1, overflowY:"auto", height:"calc(100vh - 52px)" }}>
          <div className="content-pad" style={{ padding:"52px 56px 140px", maxWidth:900 }}>

            {/* HERO */}
            <div style={{ marginBottom:64 }}>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:C.orange, marginBottom:12 }}>DeStore Network · Systems Reference</div>
              <h1 style={{ fontSize:42, fontWeight:900, letterSpacing:"-1.4px", lineHeight:1.08, marginBottom:14 }}>Pregeneration,<br/>Security &amp; Automation</h1>
              <p style={{ fontSize:13, color:C.dim, maxWidth:540, lineHeight:1.8 }}>DPP wallet pregeneration with a 5% rolling buffer, 26-day internal security audits with self-healing, xAI Grok threat intelligence from X, and automated memo dispatch.</p>
            </div>

            {/* ══ 01 PREGENERATION ══ */}
            <Sec id="pregen" n="01" title="DPP Pregeneration" sub="Mint DPPs to a wallet before the user has ever logged in" accent={C.orange}>
              <Card accent={`${C.orange}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.orange, marginBottom:8 }}>The problem this solves</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  A brand registers a product. You need to mint the DPP SBT to an address. But the end consumer might not have a DeStore account yet — and the product could be sitting in a warehouse or on a shelf for months before it's sold. Pregeneration creates a deterministic wallet address from the buyer's email <em>right now</em>, so the DPP can be minted to it immediately. When the buyer signs up later, the DPP is already there waiting.
                </div>
              </Card>

              <Sub>How it works — two paths</Sub>
              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                {[
                  { title:"Path A — Known buyer email", col:C.green, steps:["Brand submits product + buyer email at registration","n8n calls Thirdweb pregenerate API → gets walletAddress","DPP minted to walletAddress immediately","When buyer logs in with that email → wallet is theirs","DPP is already in their account — seamless"] },
                  { title:"Path B — Unknown buyer (pool)", col:C.violet, steps:["Product enters manufacturing/stock","DPP minted to a pool reserve address","Pool address = multi-sig controlled by DeStore Engine","On purchase: buyer logs in, pool transfers DPP to their smart account","Pool is always pre-funded to 5% of collection supply"] },
                ].map(({ title, col, steps }) => (
                  <div key={title} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:16 }}>
                    <div style={{ fontSize:12, fontWeight:800, color:col, marginBottom:10 }}>{title}</div>
                    {steps.map((s,i) => (
                      <div key={i} style={{ display:"flex", gap:8, fontSize:11, color:C.dim, marginBottom:6 }}>
                        <span style={{ color:col, flexShrink:0, fontWeight:700 }}>{i+1}.</span>{s}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Sub>Pregenerate API call</Sub>
              <div className="code">{`<span class="cm">// Server-side only — THIRDWEB_SECRET_KEY never goes to browser</span>
<span class="cm">// n8n: HTTP Request node OR Next.js API route</span>

<span class="cb">const</span> response = <span class="cb">await</span> <span class="cg">fetch</span>(
  <span class="cs">"https://embedded-wallet.thirdweb.com/api/v1/pregenerate"</span>,
  {
    method: <span class="cs">"POST"</span>,
    headers: {
      <span class="cs">"Content-Type"</span>: <span class="cs">"application/json"</span>,
      <span class="cs">"x-secret-key"</span>: process.env.<span class="cw">THIRDWEB_SECRET_KEY</span>,
    },
    body: <span class="cg">JSON.stringify</span>({ strategy: <span class="cs">"email"</span>, email: buyerEmail }),
  }
);
<span class="cb">const</span> { walletAddress } = <span class="cb">await</span> response.<span class="cg">json</span>();
<span class="cm">// walletAddress is permanent — same email always = same address</span>
<span class="cm">// When user signs up with this email → wallet is automatically theirs</span>`}</div>
            </Sec>

            {/* ══ 02 BUFFER ══ */}
            <Sec id="buffer" n="02" title="5% Buffer Pool Logic" sub="Always keep 5% of collection supply pre-generated — no supply shock, near-seamless UX" accent={C.green}>
              <Card accent={`${C.green}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.green, marginBottom:8 }}>Design principle</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  The buffer pool is a rolling reserve of pre-generated wallet addresses with DPPs already minted to them. When a user purchases, their DPP claim is assigned from the pool instantly — no waiting for a mint transaction. n8n monitors pool depth every hour and refills automatically when it drops below the 5% threshold. A 5-second wait only occurs when the pool is temporarily exhausted (rare) and a real-time mint is triggered.
                </div>
              </Card>

              <Sub>Buffer state machine</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                {[
                  { state:"HEALTHY", col:C.green,  range:"5% or above",   action:"No action — pool topped up by last batch", badge:"OK" },
                  { state:"LOW",     col:C.orange,  range:"2–5%",          action:"n8n triggers batch pregeneration job — refill to 5%", badge:"REFILL" },
                  { state:"CRITICAL",col:C.pink,    range:"Below 2%",      action:"Emergency refill + alert to Josiah — real-time mint fallback active", badge:"ALERT" },
                  { state:"EXHAUSTED",col:C.pink,   range:"0 addresses",   action:"Real-time pregenerate on demand — user waits ~5 seconds. Refill job running.", badge:"FALLBACK" },
                ].map(({ state, col, range, action, badge }) => (
                  <div key={state} style={{ display:"flex", alignItems:"center", gap:14, background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:"12px 16px" }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:col, flexShrink:0, boxShadow:`0 0 8px ${col}` }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                        <span style={{ fontSize:12, fontWeight:800 }}>{state}</span>
                        <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.08em", color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"1px 6px" }}>{badge}</span>
                        <span style={{ fontSize:11, color:C.muted }}>{range}</span>
                      </div>
                      <div style={{ fontSize:11, color:C.dim }}>{action}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Pool tracker — Google Sheets schema</Sub>
              <div className="code">{`<span class="cm">// Google Sheet: "DPP_Pool_Tracker"</span>

collection_id     | <span class="co">BRAND_COLLECTION_001</span>
chain             | <span class="co">base</span>
total_supply      | <span class="co">10000</span>
minted_count      | <span class="co">3840</span>
pool_count        | <span class="co">480</span>          <span class="cm">// 4.8% — LOW, refill triggered</span>
pool_target_pct   | <span class="co">5</span>
pool_status       | <span class="co">LOW</span>
last_refill_at    | <span class="co">2026-03-09T02:00:00Z</span>
pool_wallet       | <span class="co">0xPool...addr</span>  <span class="cm">// managed by Thirdweb Engine</span>`}</div>
            </Sec>

            {/* ══ 03 AUDIT ══ */}
            <Sec id="audit" n="03" title="26-Day Security Audit Cycle" sub="Internal audit every 26 days — not monthly, not weekly, always rolling" accent={C.pink}>
              <Card accent={`${C.pink}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.pink, marginBottom:8 }}>Why 26 days, not monthly</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  Monthly audits drift — February is shorter, holidays delay December. A fixed 26-day cycle keeps the audit rhythm consistent and predictable. It also desynchronises from calendar months so there's never a "quiet audit month" that an attacker could predict. The cycle anchors to a start date (Jan 1 2026) and counts forward. Cycle number, date, and AEDT timestamp are all auto-calculated.
                </div>
              </Card>

              <Sub>26-day audit report template (auto-generated)</Sub>
              <div className="code">{`<span class="cm">══════════════════════════════════════════════════════════</span>
<span class="cw">DESTORE NETWORK — INTERNAL SECURITY AUDIT</span>
<span class="cm">══════════════════════════════════════════════════════════</span>
Audit Cycle   : <span class="co">#7</span>
Date (AEDT)   : <span class="co">09 Mar 2026  02:00</span>
Auditor       : <span class="co">Claude Sonnet / Grok 3</span>
Platform      : <span class="co">DeStore Network — Circular Trade Infrastructure</span>
Chains        : <span class="co">Base (primary) · Polygon · Soneium</span>
<span class="cm">══════════════════════════════════════════════════════════</span>

SECTIONS:
  1. Dependency vulnerabilities (npm audit)
  2. Auth token / API key exposure check
  3. n8n workflow permissions audit
  4. Blockchain contract events review
  5. X / social media threat intelligence (Grok)
  6. Infra health (Cloudflare, Mac Mini, Docker)
  7. GDPR / privacy data boundary check
  8. ESPR compliance & regulatory pulse check
  9. Recommended remediations

RISK LEVEL: <span class="cg">LOW</span> | Findings: <span class="co">3</span> | Auto-applied: <span class="co">2</span> | Manual review: <span class="co">1</span>`}</div>

              <Sub>§8 ESPR Compliance — what gets checked every cycle</Sub>
              <Card accent={`${C.violet}30`} style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:8 }}>EU Ecodesign for Sustainable Products Regulation (ESPR)</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  Textiles are the first mandatory DPP wave (~mid-2028). Every 26-day cycle includes a regulatory pulse check — searching for delegated act updates, registry changes, schema updates, and certification pathway news. DeStore must be ahead of the curve, not reactive to it.
                </div>
              </Card>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                {[
                  { area:"ESPR Article 10", what:"DPP requirements — check for any delegated act amendments or guidance updates", col:C.violet },
                  { area:"EU DPP Registry", what:"Goes live 19 July 2026 — monitor launch status, API spec, registration requirements for DPP Service Providers", col:C.orange },
                  { area:"CIRPASS-2", what:"EU DPP pilot program — check for new technical outputs, schema updates, reference implementations", col:C.green },
                  { area:"CEN/CENELEC", what:"DPP data schema standardisation — check for new drafts, published standards, mandatory field updates", col:C.violet },
                  { area:"Textiles Delegated Act", what:"Expected Jan 2026 — confirm publication status, mandatory fields, compliance timeline", col:C.pink },
                  { area:"GS1 Digital Link", what:"QR code standard for DPP — check for spec updates that affect DeCam scanner and QR generation", col:C.green },
                  { area:"RBAC access tiers", what:"Public / trade / regulator viewer tiers — check for regulatory guidance on access control requirements", col:C.orange },
                  { area:"DPP Service Provider cert", what:"Certification pathway delegated act expected late 2026 — monitor for draft publication and requirements", col:C.pink },
                ].map(({ area, what, col }) => (
                  <div key={area} style={{ display:"flex", gap:12, background:C.d2, border:`1px solid ${col}22`, borderRadius:10, padding:"10px 14px" }}>
                    <div style={{ width:3, background:col, borderRadius:2, flexShrink:0 }}/>
                    <div>
                      <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:3 }}>{area}</div>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{what}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Research prompt — paste into new chat every cycle</Sub>
              <div className="code">{`<span class="cm">// ESPR Pulse Check — run 72hrs before each 26-day audit</span>
<span class="cm">// Paste this into a fresh Claude or Perplexity session:</span>

<span class="cw">Context:</span> DeStore Network is a Digital Product Passport (DPP) infrastructure
platform built on blockchain (Base/Polygon/Soneium). Building for compliance
with EU ESPR — specifically DPP requirements for textiles (~mid-2028).

<span class="cw">Research areas:</span>
  · ESPR Article 10 — DPP requirements (any delegated act amendments?)
  · CIRPASS-2 — EU DPP pilot (new technical outputs?)
  · CEN/CENELEC — DPP data schema standardisation (new drafts?)
  · EU DPP Registry — goes live 19 Jul 2026 (status + API spec?)
  · Textiles delegated act — expected Jan 2026 (published? confirmed fields?)
  · GS1 Digital Link — QR code standard (spec updates?)
  · RBAC access tiers — public/trade/regulator (regulatory guidance?)
  · DPP Service Provider cert — delegated act expected late 2026 (draft?)

<span class="cw">Task:</span> Search for latest updates on any of the above. Summarise what has
changed or been confirmed in 2025–2026. Flag anything that affects
DeStore's timeline, required data fields, or certification pathway.`}</div>
            </Sec>

            {/* ══ 04 SELF-HEALING ══ */}
            <Sec id="selfheal" n="04" title="Self-Healing Update" sub="End-of-month automated remediation — runs while you sleep" accent={C.orange}>
              <div style={{ fontSize:12, color:C.dim, lineHeight:1.85, marginBottom:20 }}>
                The self-healing workflow runs on the last Saturday of each month at 02:00 AEDT. It applies dependency patches, rotates credentials, updates Docker images, and checks pool health — all autonomously. Results are packaged into a memo and dispatched the following morning.
              </div>

              <Sub>Self-healing workflow steps</Sub>
              <div className="code">{`<span class="cm">// n8n workflow: "Monthly Self-Healing"</span>
<span class="cm">// Trigger: last Saturday of month, 02:00 AEDT</span>

<span class="cw">Step 1</span>  npm audit fix --force        <span class="cm">// patch known CVEs</span>
<span class="cw">Step 2</span>  docker pull [all images]     <span class="cm">// latest base images</span>
<span class="cw">Step 3</span>  rotate THIRDWEB_SECRET_KEY   <span class="cm">// new key, update n8n creds</span>
<span class="cw">Step 4</span>  rotate XAI_API_KEY           <span class="cm">// new key, update n8n creds</span>
<span class="cw">Step 5</span>  rotate Telegram bot token    <span class="cm">// revoke old, issue new</span>
<span class="cw">Step 6</span>  check DPP pool depth         <span class="cm">// trigger refill if needed</span>
<span class="cw">Step 7</span>  check Apple cert expiry      <span class="cm">// alert if under 60 days</span>
<span class="cw">Step 8</span>  generate self-healing report <span class="cm">// JSON + human summary</span>
<span class="cw">Step 9</span>  save report to Google Drive  <span class="cm">// "SelfHeal_Reports" folder</span>
<span class="cw">Step 10</span> trigger Audit Memo Dispatch  <span class="cm">// send to Josiah + webmaster</span>`}</div>
            </Sec>

            {/* ══ 05 GROK ══ */}
            <Sec id="grok" n="05" title="xAI Grok + X Threat Intelligence" sub="Search X for live exploits, fraud, and brand attacks — 72hrs before every audit" accent={C.violet}>
              <Card accent={`${C.violet}30`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:8 }}>Why X search matters</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  Exploit announcements, new phishing vectors, smart contract bugs, and brand impersonation all appear on X before they appear in CVE databases. Grok's real-time X search catches threats that traditional security scanners miss. The query runs 72 hours before each audit so findings can be included in the audit report and remediation can be scheduled in the self-healing window.
                </div>
              </Card>

              <Sub>Grok X search — n8n Code node</Sub>
              <div className="code">{`<span class="cm">// xAI Grok API — search X for DeStore threats</span>
<span class="cb">const</span> response = <span class="cb">await</span> <span class="cg">fetch</span>(<span class="cs">"https://api.x.ai/v1/chat/completions"</span>, {
  method: <span class="cs">"POST"</span>,
  headers: {
    <span class="cs">"Authorization"</span>: <span class="cs">"Bearer "</span> + $env.<span class="cw">XAI_API_KEY</span>,
    <span class="cs">"Content-Type"</span>: <span class="cs">"application/json"</span>,
  },
  body: <span class="cg">JSON.stringify</span>({
    model: <span class="cs">"grok-3"</span>,
    messages: [{
      role: <span class="cs">"user"</span>,
      content: <span class="cs">"Search X for the last 26 days. Find posts about: DeStore, Thirdweb exploits, ERC-721 vulnerabilities, Soneium bridge attacks, Base chain fraud, DPP counterfeit schemes, smart wallet phishing. Return JSON array of findings with: text, risk_level (high/medium/low), recommendation."</span>
    }],
    search_parameters: { mode: <span class="cs">"on"</span>, sources: [{ type: <span class="cs">"x"</span> }] },
  }),
});
<span class="cb">const</span> data = <span class="cb">await</span> response.<span class="cg">json</span>();
<span class="cb">return</span> [{ json: { grokResults: data.choices[0].message.content } }];`}</div>
            </Sec>

            {/* ══ 06 MEMO ══ */}
            <Sec id="memo" n="06" title="Memo &amp; Notifications" sub="Who gets what, when, and how — audit results always reach the right people" accent={C.pink}>
              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                {[
                  { recipient:"Josiah (Founder)", method:"Email (urgent priority)", timing:"Within 1hr of audit completion", content:"Full PDF memo attached, risk level, critical items highlighted", col:C.pink },
                  { recipient:"Webmaster role", method:"Email (standard)", timing:"Same dispatch as founder", content:"Technical findings, action items, self-healing log", col:C.violet },
                  { recipient:"Telegram admin", method:"Telegram bot message", timing:"Immediate on completion", content:"Summary: cycle #, risk level, finding count, Drive link", col:C.green },
                  { recipient:"Google Drive", method:"Auto-archive", timing:"Permanent record", content:"Full JSON audit data + PDF memo saved to SelfHeal_Reports", col:C.orange },
                ].map(({ recipient, method, timing, content, col }) => (
                  <div key={recipient} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:14 }}>
                    <div style={{ fontSize:12, fontWeight:800, color:col, marginBottom:8 }}>{recipient}</div>
                    <Row label="Method" val={method} col={col}/>
                    <Row label="Timing" val={timing}/>
                    <div style={{ fontSize:11, color:C.dim, marginTop:8, lineHeight:1.6 }}>{content}</div>
                  </div>
                ))}
              </div>
            </Sec>

            {/* ══ 07 N8N ══ */}
            <Sec id="n8n" n="07" title="n8n Workflow Summary" sub="All automation workflows — names, triggers, and connections" accent={C.green}>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { name:"DPP Pool Monitor",     trigger:"Every 1 hour",                    nodes:"~8",  desc:"Checks pool depth per collection. Triggers refill if below 5%. Alerts if CRITICAL.", col:C.orange },
                  { name:"DPP Pool Refill",       trigger:"Called by Monitor or webhook",    nodes:"~12", desc:"Batch pregenerate wallets → mint DPPs to pool addresses → update tracker sheet.", col:C.orange },
                  { name:"Payment → DPP Claim",   trigger:"Thirdweb payment webhook",        nodes:"~14", desc:"Receive payment → assign from pool or real-time pregen → ownership claim → B&B Treasury $0.01 USDC.", col:C.green },
                  { name:"Security Audit Trigger",trigger:"Every 26 days (cron)",            nodes:"~6",  desc:"Run Grok X search → generate audit prompt → execute Claude audit → save to Drive.", col:C.pink },
                  { name:"Monthly Self-Healing",  trigger:"Last Saturday of month 02:00 AEDT",nodes:"~18",desc:"npm audit fix → rotate credentials → update n8n/Docker → pool health check → generate report.", col:C.pink },
                  { name:"Audit Memo Dispatch",   trigger:"After Self-Healing completes",    nodes:"~8",  desc:"Send urgent email to Josiah → webmaster emails → Telegram notification → archive to Drive.", col:C.violet },
                  { name:"Emergency Pool Alert",  trigger:"Pool status = EXHAUSTED",         nodes:"~4",  desc:"Immediate Telegram to Josiah + trigger emergency pool refill job.", col:C.pink },
                ].map(({ name, trigger, nodes, desc, col }) => (
                  <div key={name} style={{ display:"flex", gap:14, background:C.d2, border:`1px solid ${col}22`, borderRadius:11, padding:"12px 16px", alignItems:"flex-start" }}>
                    <div style={{ width:3, background:`linear-gradient(180deg,${col},${col}44)`, borderRadius:2, flexShrink:0, alignSelf:"stretch", minHeight:40 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:12, fontWeight:800 }}>{name}</span>
                        <span style={{ fontSize:9, color:C.muted }}>{nodes} nodes</span>
                      </div>
                      <div style={{ fontSize:10, color:col, fontWeight:700, marginBottom:4 }}>⚡ {trigger}</div>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Sec>

            {/* ══ 08 CHAINS ══ */}
            <Sec id="chains" n="08" title="Multi-Chain Configuration" sub="Base (primary) · Polygon · Soneium — all EVM, all Thirdweb, brand selects chain at onboarding" accent={C.violet}>
              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                {[
                  { name:"Base",    icon:"◇", col:"#0052FF", chainId:8453, rpc:"mainnet.base.org",    role:"Primary — DPP canonical chain",    note:"Coinbase L2. DPPs minted here first. USDC payments here. B&B Treasury here. Highest consumer wallet adoption. Strong ERC-4337 + Thirdweb Engine support.", badge:null },
                  { name:"Polygon", icon:"⬡", col:"#8247E5", chainId:137,  rpc:"polygon-rpc.com",      role:"Secondary — enterprise & high-volume", note:"Enterprise adoption, low gas costs. Good for high-volume secondary market transfers. MATIC for gas. Well-established EVM chain.", badge:null },
                  { name:"Soneium", icon:"◈", col:"#B354F1", chainId:1868, rpc:"rpc.soneium.org",      role:"Tertiary — consumer & media focus", note:"Sony-backed OP Stack L2. Consumer and media brand focus. USDC native. All Thirdweb products supported.", badge:"SONY" },
                ].map(({ name, icon, col, chainId, rpc, role, note, badge }) => (
                  <div key={name} style={{ background:C.d2, border:`1px solid ${col}30`, borderRadius:13, overflow:"hidden" }}>
                    <div style={{ padding:"14px 16px", borderBottom:`1px solid ${col}20` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:18, color:col }}>{icon}</span>
                        <span style={{ fontSize:14, fontWeight:900 }}>{name}</span>
                        {badge && <span style={{ fontSize:8, fontWeight:900, letterSpacing:"0.08em", color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"1px 6px" }}>{badge}</span>}
                      </div>
                      <div style={{ fontSize:10, color:col, fontWeight:700 }}>{role}</div>
                    </div>
                    <div style={{ padding:"12px 16px" }}>
                      <Row label="Chain ID" val={chainId} col={col}/>
                      <Row label="RPC via" val="Thirdweb (managed)" col={C.dim}/>
                      <Row label="Endpoint" val={rpc} col={C.dim}/>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.6, marginTop:10 }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Card accent={`${C.violet}30`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:11, fontWeight:800, color:C.violet, marginBottom:6 }}>Brand selects chain at onboarding</div>
                <div style={{ fontSize:11, color:C.dim, lineHeight:1.8 }}>
                  Each brand chooses their chain when they register on DeStore. DPP Token and Ownership Claim contracts are deployed on that chain. Thirdweb handles RPC, smart wallets, Engine, and USDC payment rails across all three chains from a single integration and dashboard. No chain-specific code required.
                </div>
              </Card>

              <Sub>Chain config in Thirdweb v5 — one file</Sub>
              <div className="code">{`<span class="cm">// lib/chains.ts — all DeStore chains</span>
<span class="cb">import</span> { defineChain } <span class="cb">from</span> <span class="cs">"thirdweb/chains"</span>;

<span class="cm">// PRIMARY — DPP canonical chain</span>
<span class="cb">export const</span> base = <span class="cg">defineChain</span>({ id: <span class="co">8453</span>, rpc: <span class="cs">"https://mainnet.base.org"</span> });

<span class="cm">// SECONDARY — enterprise & high-volume</span>
<span class="cb">export const</span> polygon = <span class="cg">defineChain</span>({ id: <span class="co">137</span>, rpc: <span class="cs">"https://polygon-rpc.com"</span> });

<span class="cm">// TERTIARY — consumer & media focus</span>
<span class="cb">export const</span> soneium = <span class="cg">defineChain</span>({ id: <span class="co">1868</span>, rpc: <span class="cs">"https://rpc.soneium.org"</span> });

<span class="cb">export const</span> ALL_CHAINS = [base, polygon, soneium];`}</div>
            </Sec>

            {/* ══ 09 PRICING ══ */}
            <Sec id="pricing" n="09" title="Pricing & Business Model" sub={"DPP tiers, volume discounts, margins, and the B&B Treasury"} accent={C.green}>
              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
                <Card accent={`${C.green}30`}>
                  <div style={{ fontSize:11, fontWeight:800, letterSpacing:"0.08em", color:C.green, marginBottom:8 }}>STANDARD DPP</div>
                  <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                    Hosted on DeStore infrastructure. EU ESPR compliant. No blockchain costs. Lower per-DPP price. Ideal for high-volume brands that need compliance without the sovereignty story.
                  </div>
                </Card>
                <Card accent={`${C.violet}30`}>
                  <div style={{ fontSize:11, fontWeight:800, letterSpacing:"0.08em", color:C.violet, marginBottom:8 }}>BLOCKCHAIN DPP</div>
                  <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                    Full two-token ERC-721 on-chain (Base/Polygon/Soneium). Arweave metadata. Permanent, verifiable, consumer-owned. Premium price. 4 lifecycle events included, additional events $0.01 each.
                  </div>
                </Card>
              </div>

              <Sub>Volume pricing — Blockchain DPP</Sub>
              <div style={{ background:C.d2, borderRadius:12, overflow:"hidden", marginBottom:20 }}>
                {[
                  { vol:"1 – 999",        price:"$0.20 / DPP", saving:"—",        margin:"~89%" },
                  { vol:"1,000 – 9,999",  price:"$0.18 / DPP", saving:"10% off",  margin:"~90%" },
                  { vol:"10,000 – 99,999",price:"$0.15 / DPP", saving:"25% off",  margin:"~91%" },
                  { vol:"100,000+",        price:"Negotiated",   saving:"Custom",   margin:"Custom" },
                ].map(({ vol, price, saving, margin }, idx) => (
                  <div key={vol} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", padding:"10px 16px", borderBottom:idx < 3 ? `1px solid ${C.bdr}40` : "none", background:idx % 2 === 0 ? "transparent" : `${C.violet}06` }}>
                    <span style={{ fontSize:11, color:C.dim }}>{vol}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:C.violet }}>{price}</span>
                    <span style={{ fontSize:11, color:C.orange }}>{saving}</span>
                    <span style={{ fontSize:11, color:C.green }}>{margin}</span>
                  </div>
                ))}
              </div>

              <Sub>Physical tag pricing</Sub>
              <Card accent={`${C.orange}30`} style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:800, color:C.orange }}>$0.80 / unit</div>
                    <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>Per physical NFC/QR tag attached to product</div>
                  </div>
                  <span style={{ fontSize:9, fontWeight:800, color:C.orange, background:`${C.orange}20`, border:`1px solid ${C.orange}40`, borderRadius:6, padding:"3px 10px" }}>ADMIN-CONFIGURABLE</span>
                </div>
                <div style={{ fontSize:11, color:C.dim, lineHeight:1.7, marginBottom:10 }}>
                  Physical tag price is set in the Webmaster admin dashboard and flows through automatically to the pricing page and checkout. No code change required to update it. The $0.80 default covers tag cost + margin — adjust as supplier pricing changes.
                </div>
                <div style={{ background:"#0a0a0d", borderRadius:8, padding:"10px 14px", fontSize:10, color:C.muted, lineHeight:1.7 }}>
                  <strong style={{ color:"#e8e8f0" }}>Build requirement:</strong> Admin dashboard needs a "Physical Tag Price" field (numeric input, USD). On save, value writes to a platform config record. Pricing page and checkout read from this config — not hardcoded. Only the pricing page and checkout need to display this value. All other references use the config value dynamically.
                </div>
              </Card>

              <Sub>B&amp;B Treasury</Sub>
              <Card accent={`${C.orchid}30`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85, marginBottom:12 }}>
                  A dedicated Base wallet receives <strong style={{ color:C.violet }}>$0.01 USDC</strong> on every lifecycle event DeStore touches. The treasury accumulates USDC passively. When the DeStore token launches, this becomes the buyback-and-burn wallet — creating a direct link between platform activity and token value.
                </div>
                <div style={{ fontSize:11, color:C.muted }}>Status: Not yet created on-chain. Will be a dedicated Base wallet address.</div>
              </Card>
            </Sec>

            {/* ══ 10 BLOCKCHAIN ══ */}
            <Sec id="blockchain" n="10" title="Blockchain Architecture" sub="Two-token ERC-721 system — DPP Soulbound + Ownership Claim" accent={C.violet}>
              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                {[
                  { title:"DPP Token (Soulbound)", icon:"🔒", col:C.violet, points:["ERC-721, minted to brand wallet at manufacture","tokenURI points to Arweave metadata","Soulbound: transfers revert (except from zero address)","Emits lifecycle events: MANUFACTURED, FIRST_SALE, RESALE, REPAIR, GIFTED, RETURNED, RECYCLED","Held permanently by brand — never moves"] },
                  { title:"Ownership Claim (Transferable)", icon:"🎫", col:C.green, points:["ERC-721, minted to consumer smart wallet at first sale","Metadata references: dppTokenId + brandWalletAddress","Transfers freely on resale between consumer wallets","Burns on recycle or return","Backed by Thirdweb smart wallet — email/social login"] },
                ].map(({ title, icon, col, points }) => (
                  <div key={title} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:16 }}>
                    <div style={{ fontSize:18, marginBottom:8 }}>{icon}</div>
                    <div style={{ fontSize:12, fontWeight:800, color:col, marginBottom:12 }}>{title}</div>
                    {points.map((p,i) => (
                      <div key={i} style={{ display:"flex", gap:6, fontSize:11, color:C.dim, marginBottom:5 }}>
                        <span style={{ color:col, flexShrink:0 }}>·</span>{p}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Sub>Consumer interface</Sub>
              <Card accent={`${C.green}20`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.green, marginBottom:8 }}>Apple Wallet / Google Wallet pass</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.8, marginBottom:10 }}>
                  Issued via email on purchase. Push updates on lifecycle events. Contains token ID, Arweave link, block explorer link, and lifecycle action buttons.
                </div>
                <div>
                  {["Apple Wallet","Google Wallet","Push notifications","Block explorer link","Arweave DPP link","Lifecycle actions"].map(e => (
                    <span key={e} style={{ display:"inline-block", fontSize:9, fontWeight:800, letterSpacing:"0.06em", color:C.green, background:`${C.green}14`, border:`1px solid ${C.green}30`, borderRadius:6, padding:"2px 7px", margin:"2px" }}>{e}</span>
                  ))}
                </div>
              </Card>

              <Sub>Ethereum mainnet anchor</Sub>
              <Card accent={`${C.violet}35`} style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:4 }}>Every DPP batch anchored to Ethereum mainnet</div>
                    <div style={{ fontSize:11, color:C.muted }}>The world's most battle-tested blockchain — since 2015, zero days of data loss</div>
                  </div>
                  <span style={{ fontSize:9, fontWeight:800, color:C.violet, background:`${C.violet}20`, border:`1px solid ${C.violet}40`, borderRadius:6, padding:"3px 10px", whiteSpace:"nowrap" }}>ENTERPRISE TRUST SIGNAL</span>
                </div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85, marginBottom:14 }}>
                  DPPs are minted on Base (cost-efficient, consumer wallet ecosystem) but every batch is cryptographically anchored to Ethereum mainnet via a merkle root commitment. One ETH transaction covers thousands of DPPs. The result: tamper-evident, permanent records with the full credibility of Ethereum — at Base economics.
                </div>
                <div style={{ background:"#0a0a0d", borderRadius:10, padding:"14px 16px", marginBottom:14, fontFamily:"monospace" }}>
                  <div style={{ fontSize:10, color:C.violet, fontWeight:700, marginBottom:8 }}>HOW IT WORKS</div>
                  {[
                    { step:"1", label:"Batch minting", desc:"DPP SBTs minted on Base — ~$0.001–0.005/token. Consumer wallet ecosystem, Thirdweb native.", col:C.green },
                    { step:"2", label:"Merkle root", desc:"After each batch: keccak256 merkle root of all new token IDs + Arweave hashes computed.", col:C.violet },
                    { step:"3", label:"ETH anchor", desc:"Single transaction writes merkle root to DeStore anchor contract on ETH mainnet. ~$2–5 covers thousands of DPPs.", col:C.violet },
                    { step:"4", label:"Verifiable forever", desc:"Anyone can verify any DPP is in a committed batch using the merkle proof — with or without DeStore.", col:C.green },
                  ].map(({ step, label, desc, col }) => (
                    <div key={step} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                      <div style={{ width:20, height:20, background:`${col}20`, border:`1px solid ${col}40`, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:col, flexShrink:0 }}>{step}</div>
                      <div>
                        <span style={{ fontSize:11, fontWeight:700, color:"#e8e8f0" }}>{label} — </span>
                        <span style={{ fontSize:11, color:C.muted }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background:`${C.violet}12`, border:`1px solid ${C.violet}30`, borderRadius:10, padding:"12px 16px" }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.violet, marginBottom:6 }}>APPROVED MARKETING COPY — B2B / Enterprise</div>
                  <div style={{ fontSize:12, color:"#e8e8f0", lineHeight:1.8, fontStyle:"italic" }}>
                    "Every DeStore DPP batch is cryptographically anchored to Ethereum mainnet — the world's most battle-tested blockchain. Tamper-evident. Permanent. Readable by anyone, forever."
                  </div>
                </div>
              </Card>

              <Sub>Survivability guarantee</Sub>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:8 }} className="grid2">
                {[
                  { icon:"⛓", title:"Base keeps running", desc:"DPP Token lives on Base. No DeStore infrastructure required to read or verify it." },
                  { icon:"🪨", title:"Arweave is permanent", desc:"Metadata stored on Arweave. Pay once at mint — accessible forever at the same URL." },
                  { icon:"📧", title:"Email receipt is self-contained", desc:"Consumer email contains token ID + Arweave link. Full proof with no DeStore involvement." },
                  { icon:"🔓", title:"Open ERC-721 standard", desc:"Any wallet, any explorer, any developer can read these records independently. No lock-in." },
                ].map(({ icon, title, desc }) => (
                  <Card key={title} accent={`${C.green}20`}>
                    <div style={{ fontSize:20, marginBottom:8 }}>{icon}</div>
                    <div style={{ fontSize:12, fontWeight:700, marginBottom:4 }}>{title}</div>
                    <div style={{ fontSize:11, color:C.dim, lineHeight:1.7 }}>{desc}</div>
                  </Card>
                ))}
              </div>
            </Sec>

            {/* ══ 11 SECURITY ══ */}
            <Sec id="security" n="11" title="Security &amp; Privacy Audit" sub="Threat model, identified risks, mitigations, and privacy-by-design commitments" accent={C.pink}>
              <Card accent={`${C.pink}30`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.pink, marginBottom:8 }}>Audit scope</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  This section audits the entire DeStore system stack against security and privacy best practices. No hacks. No privacy breaches. Safe for consumers.
                </div>
              </Card>

              <Sub>Risk registry</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                {[
                  { level:"HIGH",   col:C.pink,   title:"Webhook authentication — Payment → DPP Claim", risk:"Publicly accessible webhook URL. Anyone who discovers it can POST a fake payment event and claim a DPP for free.", fix:"Verify Thirdweb X-Pay-Webhook-Signature header (HMAC-SHA256). Reject requests where signatures don't match. Must implement before going live." },
                  { level:"HIGH",   col:C.pink,   title:"No PII on Arweave — ever", risk:"Arweave metadata is permanent and public. Storing buyer data creates an irremovable GDPR violation. Right to erasure is impossible on Arweave.", fix:"Arweave stores ONLY product data: SKU, brand name, specs, manufacture date. Zero buyer data. This boundary must be enforced in every mint workflow." },
                  { level:"MEDIUM", col:C.orange, title:"Pool reserve wallet — hot wallet risk", risk:"Pool wallet controlled by env var in n8n = hot wallet. Compromised n8n = all pool DPPs accessible.", fix:"Use Thirdweb Engine as pool wallet controller. n8n calls Engine API. Engine manages keys in a hardened environment." },
                  { level:"MEDIUM", col:C.orange, title:"Single point of failure — Mac Mini", risk:"All infra on one machine. Hardware failure = total service outage.", fix:"Nightly backup to Cloudflare R2. Recovery runbook documented. UPS for Mac Mini. Uptime monitor → Telegram alert." },
                  { level:"MEDIUM", col:C.orange, title:"Consumer wallet account recovery", risk:"Email OTP login only. Lost email access = lost wallet and all Ownership Claim tokens.", fix:"Prompt users to add second login method (passkey/Google/Apple) at onboarding. Make it required, not optional." },
                  { level:"LOW",    col:C.dim,    title:"Apple Developer certificate expiry", risk:"Cert lapses → new passes cannot be issued, existing passes stop receiving push updates.", fix:"60-day alert in self-healing workflow. Renew before expiry. Calendar reminder set." },
                ].map(({ level, col, title, risk, fix }) => (
                  <div key={title} style={{ background:C.d2, border:`1px solid ${col}30`, borderRadius:12, overflow:"hidden" }}>
                    <div style={{ padding:"12px 16px", borderBottom:`1px solid ${col}20`, display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.1em", color:col, background:`${col}18`, border:`1px solid ${col}35`, borderRadius:4, padding:"2px 8px", flexShrink:0 }}>{level}</span>
                      <span style={{ fontSize:12, fontWeight:800 }}>{title}</span>
                    </div>
                    <div style={{ padding:"12px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }} className="grid2">
                      <div>
                        <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.08em", color:C.pink, marginBottom:6 }}>RISK</div>
                        <div style={{ fontSize:11, color:C.dim, lineHeight:1.75 }}>{risk}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.08em", color:C.green, marginBottom:6 }}>MITIGATION</div>
                        <div style={{ fontSize:11, color:C.dim, lineHeight:1.75 }}>{fix}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Privacy data boundaries</Sub>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }} className="grid2">
                <Card accent={`${C.green}30`}>
                  <div style={{ fontSize:11, fontWeight:800, color:C.green, marginBottom:10 }}>On-chain / Arweave</div>
                  {["Product SKU & brand name","Manufacture date","Product specifications","Lifecycle event log","tokenURI → Arweave metadata","DPP Token ID + brand wallet"].map(item => (
                    <div key={item} style={{ fontSize:11, color:C.dim, padding:"4px 0", borderBottom:`1px solid ${C.bdr}30`, display:"flex", gap:6 }}>
                      <span style={{ color:C.green, flexShrink:0 }}>·</span>{item}
                    </div>
                  ))}
                </Card>
                <Card accent={`${C.pink}30`}>
                  <div style={{ fontSize:11, fontWeight:800, color:C.pink, marginBottom:10 }}>Never on-chain</div>
                  {["Buyer name, email, phone, address","Payment card details","Consumer identity link","Brand internal inventory data","Any GDPR-erasable data"].map(item => (
                    <div key={item} style={{ fontSize:11, color:C.dim, padding:"4px 0", borderBottom:`1px solid ${C.bdr}30`, display:"flex", gap:6 }}>
                      <span style={{ color:C.pink, flexShrink:0 }}>✗</span>{item}
                    </div>
                  ))}
                </Card>
              </div>
            </Sec>

            {/* ══ 12 ECOSYSTEM ══ */}
            <Sec id="ecosystem" n="12" title="DeStore Ecosystem" sub="DeStore · DeAR · DeCam — three products, one circular trade stack" accent={C.green}>
              <Card accent={`${C.green}30`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.green, marginBottom:8 }}>The three-product stack</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  DeStore is the platform layer — but the full circular trade experience is delivered by three tightly integrated products. Each is a standalone service that also feeds data and events into the others. Together they cover the full product lifecycle from first sale through authentication, resale, and payment settlement.
                </div>
              </Card>

              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
                {[
                  {
                    name:"DeStore", tag:"CORE PLATFORM", col:C.violet, icon:"◈",
                    role:"The marketplace and DPP infrastructure layer",
                    desc:"Manages brand onboarding, DPP minting and assignment, consumer wallet issuance, secondary market listings, lifecycle event logging, and the B&B Treasury. Everything runs through DeStore.",
                    tech:["Thirdweb (wallets + payments)","ERC-721 on Base/Polygon/Soneium","Arweave (metadata storage)","n8n (automation)","Cloudflare Tunnel (hosting)"],
                  },
                  {
                    name:"DeAR", tag:"SISTER BUSINESS", col:C.orange, icon:"⬡",
                    role:"Payment rails · Asset register · AR ownership experiences",
                    desc:"DeAR — Decentralised Asset Register. The consumer-facing wallet that holds DPP Ownership Claims (SBTs/NFTs), tracks the full asset register across every product owned, gifted, sold, or recycled, and handles all USDC payments via DeAR.link. B&B Treasury $0.01 routing on every event. Deep Thirdweb integration — gasless across Base, Polygon, and Soneium. DeAR is also the AR ownership layer — verified owners unlock native ARKit experiences (Apple AR Quick Look) or Scene Viewer on Android directly from their wallet pass. The name is intentional: DeAR is both the Decentralised Asset Register and the AR experience gateway.",
                    tech:["USDC on-chain settlement","Thirdweb Engine payment webhooks","Base-native payment routing","Cross-chain settlement support","B&B Treasury $0.01 routing","Apple AR Quick Look (ARKit native)","Google Scene Viewer (ARCore)","model-viewer 3D fallback","Cloudflare R2 (.usdz / .glb hosting)","Ownership-gated AR access"],
                  },
                  {
                    name:"DeCam", tag:"SISTER BUSINESS", col:C.green, icon:"◆",
                    role:"Mobile-first QR scanner and DPP verification layer",
                    desc:"DeCam is the consumer-facing scan tool that reads GS1 QR codes, resolves DPP Token IDs, and displays live product passport data — manufacture date, lifecycle events, Arweave metadata, and ownership chain. Mobile-only by design. Desktop visitors see a phone-required gate. DeCam communicates with DeStore's API in real-time to verify authenticity and flag suspicious items.",
                    tech:["GS1 QR code resolver","DPP Token ID lookup via DeStore API","Live lifecycle event display","Arweave metadata rendering","Mobile-only (touch + UA + screen gate)","Genuine / Suspicious / Counterfeit scan states"],
                  },
                ].map(({ name, tag, col, icon, role, desc, tech }) => (
                  <div key={name} style={{ background:C.d2, border:`1px solid ${col}30`, borderRadius:14, overflow:"hidden" }}>
                    <div style={{ padding:"16px 18px", borderBottom:`1px solid ${col}20`, display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontSize:24, color:col }}>{icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                          <span style={{ fontSize:16, fontWeight:900 }}>{name}</span>
                          <span style={{ fontSize:8, fontWeight:900, letterSpacing:"0.1em", color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"2px 8px" }}>{tag}</span>
                        </div>
                        <div style={{ fontSize:11, color:col, fontWeight:700 }}>{role}</div>
                      </div>
                    </div>
                    <div style={{ padding:"14px 18px" }}>
                      <div style={{ fontSize:12, color:C.dim, lineHeight:1.85, marginBottom:12 }}>{desc}</div>
                      <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.1em", color:C.muted, marginBottom:8 }}>TECH INTEGRATION</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                        {tech.map(t => (
                          <span key={t} style={{ fontSize:9, fontWeight:700, color:col, background:`${col}12`, border:`1px solid ${col}25`, borderRadius:5, padding:"2px 8px" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── DeAR AR — Digital Experience Layer ── */}
              <Sub>DeAR AR — Digital Experience Product Range</Sub>
              <Card accent={`${C.orange}30`} style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.orange, marginBottom:8 }}>Positioning</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  DeAR AR is the digital experience layer of the DeStore product suite. It is not a separate app — it is an ownership-gated AR feature baked into the DeAR wallet pass. When a consumer holds a verified Ownership Claim on-chain, their Apple Wallet or Google Wallet pass includes a "View in AR" button. Tapping it launches a native AR experience — no app install, no third-party platform. The AR content is served from Cloudflare R2, access is gated by on-chain ownership verification, and the experience runs natively on the device using ARKit (iOS) or ARCore (Android). Counterfeit products and unverified wallets receive nothing.
                  <br/><br/>
                  The name DeAR is intentional and dual-meaning: <strong style={{ color:C.orange }}>Decentralised Asset Register</strong> + <strong style={{ color:C.orange }}>AR</strong>. This is a product story, not a feature flag.
                </div>
              </Card>

              {/* AR Dependencies */}
              <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.1em", color:C.muted, marginBottom:10, marginTop:4 }}>AR DEPENDENCIES</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                {[
                  { dep:"Apple Developer Program", why:"Required to sign .pkpass Wallet passes. Also unlocks AR Quick Look distribution via Safari. $99 AUD/yr.", status:"REQUIRED", col:C.violet },
                  { dep:"Cloudflare R2 bucket: destore-ar-assets", why:"Stores .usdz files (iOS ARKit) and .glb files (Android/3D viewer). Served via public R2 URL or custom subdomain (ar-assets.destore.network).", status:"REQUIRED", col:C.violet },
                  { dep:"Apple AR Quick Look (.usdz)", why:"Native ARKit format. Brands supply existing 3D assets or commission via Luma AI photogrammetry (~$0–20/product) or freelance modelling ($50–500/product). File must be optimised for mobile (<20MB recommended).", status:"PER BRAND", col:C.orange },
                  { dep:"Google Scene Viewer (.glb)", why:"Android ARCore format. Same 3D geometry as .usdz, different container. Brands supply both or DeStore converts via open-source tooling (model-converter).", status:"PER BRAND", col:C.orange },
                  { dep:"DeStore Ownership Verification API", why:"Before serving any AR asset, /ar/:dpp-id calls the ownership check endpoint — verifies the requesting wallet holds the current Ownership Claim ERC-721 on-chain. Non-owners are blocked.", status:"REQUIRED", col:C.violet },
                  { dep:"model-viewer (Google, open source)", why:"JavaScript web component used as the 3D fallback viewer on unsupported devices. Loaded from Google CDN. Supports ARCore scene-viewer and AR Quick Look as progressive enhancement.", status:"BUNDLED", col:C.green },
                  { dep:"Vercel /ar/:id route", why:"Serves the AR gate page. Reads DPP ID from URL path, calls ownership API, renders correct state (loading / verified iOS AR / verified 3D / not owner / no model yet).", status:"BUILT", col:C.green },
                ].map(({ dep, why, status, col }) => (
                  <div key={dep} style={{ background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:10, padding:"12px 14px", display:"flex", gap:12, alignItems:"flex-start" }}>
                    <span style={{ fontSize:8, fontWeight:900, letterSpacing:"0.08em", color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"3px 7px", flexShrink:0, marginTop:2 }}>{status}</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:800, color:"#e8e8f4", marginBottom:4 }}>{dep}</div>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.7 }}>{why}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Device / Browser Fallback Matrix */}
              <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.1em", color:C.muted, marginBottom:10 }}>DEVICE &amp; BROWSER FALLBACK MATRIX</div>
              <div style={{ background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:12, overflow:"hidden", marginBottom:20 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 80px", background:C.d3, padding:"10px 14px", gap:8 }}>
                  {["Device / Browser","AR Engine","Experience","Quality"].map(h => (
                    <div key={h} style={{ fontSize:9, fontWeight:900, letterSpacing:"0.08em", color:C.muted, textTransform:"uppercase" }}>{h}</div>
                  ))}
                </div>
                {[
                  { device:"iPhone 12+ (LiDAR models)", engine:"ARKit via Safari Quick Look", exp:"Full native AR — surface detection, real-time lighting, shadows. Same engine as IKEA Place.", q:"★★★★★", col:C.green },
                  { device:"iPhone 11 / XR / older", engine:"ARKit via Safari Quick Look", exp:"Native AR — no LiDAR depth sensor but still ARKit. Surface tracking slightly less precise.", q:"★★★★☆", col:C.green },
                  { device:"iPad Pro (LiDAR)", engine:"ARKit via Safari Quick Look", exp:"Full native AR, large display. Excellent for retail floor demos.", q:"★★★★★", col:C.green },
                  { device:"Android flagship (Pixel, Samsung S-series)", engine:"ARCore via Scene Viewer", exp:"Native AR — good surface tracking and lighting. Not ARKit but genuinely solid.", q:"★★★★☆", col:C.orange },
                  { device:"Android mid-range", engine:"ARCore via Scene Viewer", exp:"AR quality varies by device. Surface tracking less reliable on budget hardware.", q:"★★★☆☆", col:C.orange },
                  { device:"Older Android / no ARCore", engine:"model-viewer (3D fallback)", exp:"Interactive 3D viewer — rotate, zoom, inspect. No room anchoring. Still demonstrates the product.", q:"★★☆☆☆", col:"#6b6b80" },
                  { device:"Desktop browser (any)", engine:"model-viewer (3D fallback)", exp:"3D viewer in browser. Useful for brand portal demos, not consumer AR.", q:"★★☆☆☆", col:"#6b6b80" },
                  { device:"Very old phones (pre-2018)", engine:"Static product page fallback", exp:"Ownership verified message + product DPP info. No 3D. Graceful degradation.", q:"★☆☆☆☆", col:"#6b6b80" },
                ].map(({ device, engine, exp, q, col }) => (
                  <div key={device} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 80px", padding:"10px 14px", gap:8, borderTop:`1px solid ${C.bdr}40` }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#e8e8f4" }}>{device}</div>
                    <div style={{ fontSize:10, color:col, fontWeight:600 }}>{engine}</div>
                    <div style={{ fontSize:10, color:C.dim, lineHeight:1.6 }}>{exp}</div>
                    <div style={{ fontSize:11, color:col }}>{q}</div>
                  </div>
                ))}
              </div>

              {/* AR Lifecycle Experiences */}
              <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.1em", color:C.muted, marginBottom:10 }}>AR EXPERIENCE BY LIFECYCLE EVENT</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
                {[
                  { event:"First Purchase", ar:"3D unboxing / brand story animation", col:C.violet },
                  { event:"Ownership Transfer (Resale)", ar:"'This product found its new owner' transition", col:C.orange },
                  { event:"Recycle / Return", ar:"Impact visualisation — CO₂ saved, materials recovered", col:C.green },
                  { event:"Limited Edition DPP", ar:"Exclusive content — only unlockable by verified owner", col:"#FF1B9A" },
                  { event:"Repair Event", ar:"Care instructions + approved repairer map overlay", col:C.green },
                ].map(({ event, ar, col }) => (
                  <div key={event} style={{ background:`${col}10`, border:`1px solid ${col}30`, borderRadius:10, padding:"10px 14px", flex:"1 1 200px" }}>
                    <div style={{ fontSize:10, fontWeight:800, color:col, marginBottom:4 }}>{event}</div>
                    <div style={{ fontSize:11, color:C.dim }}>{ar}</div>
                  </div>
                ))}
              </div>

              <Sub>How the three products connect</Sub>
              <Card accent={`${C.bdr}60`}>
                <div style={{ display:"flex", gap:0, alignItems:"center", flexWrap:"wrap", marginBottom:12 }}>
                  {[
                    { step:"Brand mints DPP",   sub:"via DeStore",      col:C.violet },
                    { step:"→" },
                    { step:"Consumer pays",     sub:"via DeAR.link",   col:C.orange },
                    { step:"→" },
                    { step:"Ownership Claim",   sub:"issued to wallet",  col:C.violet },
                    { step:"→" },
                    { step:"Consumer scans",    sub:"QR via DeCam",      col:C.green },
                    { step:"→" },
                    { step:"Authentic verified",sub:"live on-chain data", col:C.green },
                  ].map((item, i) => (
                    item.step === "→"
                      ? <div key={i} style={{ color:C.bdr, fontSize:18, fontWeight:300, margin:"0 8px" }}>→</div>
                      : <div key={i} style={{ textAlign:"center" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:item.col }}>{item.step}</div>
                          <div style={{ fontSize:9, color:C.muted, marginTop:2 }}>{item.sub}</div>
                        </div>
                  ))}
                </div>
                <div style={{ fontSize:11, color:C.muted, paddingTop:10, borderTop:`1px solid ${C.bdr}40` }}>
                  Each product is independently deployable. DeStore is the source of truth — DeAR and DeCam read from and write to DeStore's API. A brand using only DeStore still gets full DPP functionality. DeAR and DeCam enhance the consumer experience without being hard dependencies.
                </div>
              </Card>
            </Sec>

            {/* ══ 13 ESPR COMPLIANCE BUILD ══ */}
            <Sec id="espr" n="13" title="ESPR Compliance Build" sub="EU Ecodesign for Sustainable Products Regulation — confirmed gaps, build tasks, and timeline" accent={C.violet}>

              <Card accent={`${C.violet}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:8 }}>Textiles DPP — confirmed timeline (updated March 2026)</div>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                  {[
                    { date:"19 Jul 2026",      event:"EU DPP Registry goes live — hard deadline for identifier submission",         col:C.orange, urgent:true },
                    { date:"Late 2026 / Q1 2027", event:"Textiles delegated act published (slipped from Jan 2026)",                col:C.violet },
                    { date:"Mid-2027",         event:"Textile DPP rules enter into force — basic DPP mandatory on all EU products", col:C.pink },
                    { date:"Mid-2028",         event:"~18-month compliance window closes — full ESPR DPP mandatory",               col:C.pink },
                    { date:"Late 2026",        event:"DPP Service Provider certification delegated act expected",                  col:C.green },
                  ].map(({ date, event, col, urgent }) => (
                    <div key={date} style={{ flex:"1 1 220px", background:urgent ? `${col}15` : C.d2, border:`1px solid ${urgent ? col : C.bdr}40`, borderRadius:10, padding:"10px 14px" }}>
                      <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:3 }}>{date}{urgent && <span style={{ marginLeft:8, fontSize:9, background:col, color:"#fff", borderRadius:4, padding:"1px 6px" }}>HARD DEADLINE</span>}</div>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{event}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Sub>Confirmed compliance gaps — research verified Mar 2026</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                {[
                  {
                    n:"01", title:"GS1 Digital Link QR format", status:"CONFIRMED REQUIRED", priority:"🔴 Before Jul 2026", col:C.orange,
                    what:"EU mandates GS1 Digital Link + EPCIS for supply chain interoperability. QR format must resolve to DPP via standard URL structure.",
                    build:"Change to: https://id.destore.network/01/{GTIN}/21/{SerialNumber} · Register GS1 Australia company prefix (~AUD $200–500/yr) · Update DeCam resolver to parse GS1 Digital Link format",
                  },
                  {
                    n:"02", title:"JSON-LD metadata schema", status:"CONFIRMED REQUIRED", priority:"🟡 2026 build", col:C.violet,
                    what:"All DPP data must be structured and machine-readable in JSON-LD aligned with Schema.org. Semantic interoperability is one of three primary DPP compliance dimensions under ESPR.",
                    build:"Rewrite Arweave metadata format from current schema to JSON-LD · Align fields with CIRPASS-2 data model (watch for 2026 deliverables) · Validate against Schema.org vocab",
                  },
                  {
                    n:"03", title:"Mandatory data fields", status:"CONFIRMED REQUIRED", priority:"🟡 2026 build", col:C.violet,
                    what:"ESPR Article 10 mandates: material composition, substances of concern (REACH), carbon footprint (GWP), repairability score, end-of-life instructions, recycled content percentage, durability, recycled content.",
                    build:"Add to DPP schema: materialComposition[], substancesOfConcern[] (REACH), carbonFootprintGWP, repairabilityScore, endOfLifeInstructions, recycledContentPct · recycledContent is newly confirmed — add to current field list",
                  },
                  {
                    n:"04", title:"SHA-256 data integrity", status:"✅ CORRECT — EXCEEDS MINIMUM", priority:"✅ Done", col:C.green,
                    what:"CIRPASS requires tamper-evidence. DeStore's approach — SHA-256 hash of canonical JSON stored in SBT attribute at mint — exceeds the minimum requirement. Blockchain notarisation is not mandatory but is not prohibited.",
                    build:"No changes needed. This is a differentiator positioning for premium DPP tier.",
                  },
                  {
                    n:"05", title:"RBAC three-tier access control", status:"CONFIRMED REQUIRED", priority:"🟡 2026 build", col:C.pink,
                    what:"Battery Passport (DPP blueprint) explicitly requires role-based access. Delegated acts will define tiers. Public access to mandatory data must be free and ungated per CIRPASS guidance.",
                    build:"Tier 1 Public (no login) — consumer fields, free and ungated · Tier 2 Trade/Recycler (business auth) — adds REACH/BoM · Tier 3 Regulator (eIDAS) — adds compliance docs + on-chain IDs · Tier 1 must be ungated per ESPR access rules",
                  },
                  {
                    n:"06", title:"EU DPP Registry integration", status:"🔴 HARD DEADLINE 19 JUL 2026", priority:"🔴 Build now", col:C.orange,
                    what:"Registry stores unique identifiers only (not full DPP data). Interconnects with EU Customs Single Window — products without valid registry entry can be blocked at EU borders. GS1 Digital Link identifier → Arweave metadata is the correct shape.",
                    build:"Build submission queue now · Batch-activate on 19 Jul 2026 launch · Registry accepts: unique product identifier + data carrier URL + DPP service provider ID · Monitor EC for API spec (expected H1 2026)",
                  },
                  {
                    n:"07", title:"DPP Service Provider certification", status:"⏳ NOT YET PUBLISHED", priority:"🟢 Monitor", col:C.green,
                    what:"EU consultation ran to Jul 2025. Formal certification delegated act expected late 2026. No confirmed requirements published as of Mar 2026.",
                    build:"Monitor EC delegated act publication · Register interest with Commission DPP consultation process for early sight of draft requirements · Build to Battery Passport service provider model as proxy",
                  },
                ].map(({ n, title, status, priority, col, what, build }) => (
                  <div key={n} style={{ background:C.d2, border:`1px solid ${col}30`, borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:8, flexWrap:"wrap" }}>
                      <div style={{ width:3, background:col, borderRadius:2, alignSelf:"stretch", flexShrink:0 }}/>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:4 }}>
                          <span style={{ fontSize:9, fontWeight:800, color:col, background:`${col}15`, borderRadius:4, padding:"2px 7px" }}>GAP {n}</span>
                          <span style={{ fontSize:12, fontWeight:800, color:"#e8e8f0" }}>{title}</span>
                          <span style={{ fontSize:9, fontWeight:700, color:col, marginLeft:"auto" }}>{priority}</span>
                        </div>
                        <div style={{ fontSize:10, color:C.muted, fontStyle:"italic", marginBottom:6 }}>{status}</div>
                        <div style={{ fontSize:11, color:C.dim, lineHeight:1.7, marginBottom:8 }}>{what}</div>
                        <div style={{ fontSize:10, color:col, background:`${col}10`, borderRadius:8, padding:"8px 12px", lineHeight:1.7 }}>
                          <span style={{ fontWeight:800 }}>BUILD: </span>{build}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Two newly identified requirements (not in original gap list)</Sub>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
                {[
                  {
                    title:"W3C Verifiable Credentials envelope",
                    tag:"🆕 Newly identified",
                    col:C.violet,
                    detail:"CIRPASS-2 is standardising the VC envelope — issuer, date, id, cryptographic signature — as a system-level requirement. Current SBT + SHA-256 covers tamper-evidence but does not produce a W3C Verifiable Credential. The regulator tier (Tier 3) will likely require a signed VC.",
                    build:"Add W3C VC wrapper to DPP issuance flow · Issuer = brand wallet · Subject = product token ID · Proof = ed25519 or secp256k1 signature · Target Tier 3 compliance for late 2026",
                  },
                  {
                    title:"EU Customs Single Window integration",
                    tag:"🆕 Newly identified",
                    col:C.orange,
                    detail:"The DPP registry interconnects with EU Customs at launch (19 Jul 2026). Products without a valid registry entry can be blocked at EU borders automatically. For brands importing into the EU, registry submission becomes a market-access requirement, not just a compliance checkbox.",
                    build:"Ensure every DPP issued for EU-market products has a registry submission queued · Add 'EU import flag' to DPP schema · Notify brand clients of border-blocking risk if registry submission is missed",
                  },
                ].map(({ title, tag, col, detail, build }) => (
                  <div key={title} style={{ flex:"1 1 280px", background:C.d2, border:`1px solid ${col}35`, borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:4 }}>{title}</div>
                    <div style={{ fontSize:10, color:col, background:`${col}12`, borderRadius:4, padding:"2px 7px", display:"inline-block", marginBottom:8 }}>{tag}</div>
                    <div style={{ fontSize:11, color:C.dim, lineHeight:1.7, marginBottom:8 }}>{detail}</div>
                    <div style={{ fontSize:10, color:col, background:`${col}10`, borderRadius:8, padding:"8px 12px", lineHeight:1.7 }}>
                      <span style={{ fontWeight:800 }}>BUILD: </span>{build}
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Priority build order</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[
                  { rank:"1", label:"Registry integration hook + GS1 Digital Link QR",  when:"Now → Jul 2026",      col:C.orange, note:"Hard deadline. Miss this = EU market access blocked." },
                  { rank:"2", label:"JSON-LD schema rewrite for Arweave metadata",        when:"Q2 2026",             col:C.violet, note:"Required before any delegated act lands." },
                  { rank:"3", label:"Data fields expansion (+ recycled content)",         when:"Q2–Q3 2026",          col:C.violet, note:"Build once, confirmed fields. Add recycled content now." },
                  { rank:"4", label:"RBAC three-tier viewer (Tier 1 ungated public)",     when:"Q3 2026",             col:C.pink,   note:"Tier 1 must be free + ungated per ESPR access rules." },
                  { rank:"5", label:"W3C Verifiable Credentials envelope",                when:"Q4 2026",             col:C.violet, note:"Needed for regulator tier. Watch CIRPASS-2 VC spec." },
                  { rank:"6", label:"EU Customs flag in DPP schema + client notification",when:"Before Jul 2026",     col:C.orange, note:"Inform brand clients of border-blocking risk." },
                  { rank:"7", label:"DPP Service Provider certification",                  when:"Monitor late 2026",   col:C.green,  note:"Not published yet. Build to Battery Passport model as proxy." },
                ].map(({ rank, label, when, col, note }) => (
                  <div key={rank} style={{ display:"flex", gap:12, alignItems:"flex-start", background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:10, padding:"10px 14px" }}>
                    <div style={{ width:22, height:22, background:`${col}20`, border:`1px solid ${col}50`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:col, flexShrink:0 }}>{rank}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:"#e8e8f0", marginBottom:2 }}>{label}</div>
                      <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                        <span style={{ fontSize:10, color:col, fontWeight:600 }}>{when}</span>
                        <span style={{ fontSize:10, color:C.muted }}>· {note}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Sec>

            {/* ══ 14 ENTERPRISE EDGE NODE ══ */}
            <Sec id="edge" n="14" title="Enterprise Edge Node" sub="Private data on your hardware — one-way encrypted sync to DeStore cloud" accent={C.orange}>

              {/* Overview card */}
              <Card accent={`${C.orange}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.orange, marginBottom:8 }}>What it is</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  The Enterprise Edge Node is a Mac Mini running a full DeStore stack at the client's site. Sensitive product data — formulations, supplier network, cost prices, BoM details — never leaves the building. DeStore cloud receives only SHA-256 hashed compliance proofs via a Tailscale-encrypted one-way sync. The client can audit every sync event. DeStore holds a secure encrypted backup so data survives hardware failure without exposure.
                </div>
              </Card>

              {/* Architecture split */}
              <Sub>Architecture — what lives where</Sub>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
                {[
                  {
                    label:"On-site Mac Mini", col:C.orange, tag:"NEVER LEAVES BUILDING",
                    items:[
                      "Full DPP metadata — raw JSON-LD with all fields",
                      "Material composition + supplier details",
                      "REACH substances of concern data",
                      "Cost prices + BoM line items",
                      "Manufacturing specs + process data",
                      "n8n workflow engine (local instance)",
                      "PostgreSQL — all product + ownership records",
                      "DeCam scan logs (unredacted)",
                      "Local Arweave upload queue",
                      "Admin dashboard + brand portal",
                    ],
                  },
                  {
                    label:"DeStore Cloud (Base / Arweave)", col:C.violet, tag:"RECEIVES VIA SYNC",
                    items:[
                      "SHA-256 hash of canonical DPP JSON (tamper proof)",
                      "DPP SBT token ID + on-chain event log",
                      "Public-tier DPP fields only (Tier 1 RBAC)",
                      "EU DPP Registry submission payload",
                      "Ownership Claim events (GIFTED, RESOLD etc.)",
                      "B&B Treasury $0.01 USDC routing",
                      "Encrypted backup of full DPP data (AES-256)",
                      "Sync event audit log (timestamp + hash only)",
                    ],
                  },
                  {
                    label:"Never transmitted", col:C.pink, tag:"HARD BOUNDARY",
                    items:[
                      "Raw supplier names or contract details",
                      "Cost prices or margin data",
                      "Full BoM with quantities",
                      "Internal formulation / recipe data",
                      "REACH data beyond public-tier fields",
                      "Consumer PII (zero consumer data, ever)",
                      "Unredacted scan logs",
                    ],
                  },
                ].map(({ label, col, tag, items }) => (
                  <div key={label} style={{ flex:"1 1 220px", background:C.d2, border:`1px solid ${col}35`, borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:9, fontWeight:700, color:col, background:`${col}15`, borderRadius:4, padding:"2px 7px", display:"inline-block", marginBottom:10 }}>{tag}</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {items.map(item => (
                        <div key={item} style={{ display:"flex", gap:6, alignItems:"flex-start" }}>
                          <span style={{ color:col, fontSize:10, marginTop:2, flexShrink:0 }}>·</span>
                          <span style={{ fontSize:11, color:C.dim, lineHeight:1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sync tiers */}
              <Sub>Sync tiers — what triggers a sync, what it costs</Sub>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
                {[
                  {
                    tier:"Weekly Sync", price:"$200/mo", col:C.green, schedule:"Every Sunday 02:00 AEDT",
                    what:"Batches all new DPP issuances, ownership claim events, and public-tier field updates from the past 7 days. SHA-256 proofs submitted to Base. EU Registry submission queue flushed. Encrypted backup snapshot uploaded.",
                    best:"Brands with stable weekly production runs. Low overhead, full compliance.",
                  },
                  {
                    tier:"Daily Sync", price:"$600/mo", col:C.orange, schedule:"Every day 02:00 AEDT",
                    what:"Same payload as weekly but nightly. Near-real-time on-chain event log. Ownership claims visible in DeStore marketplace within 24hrs. Registry submissions daily. Backup snapshot nightly.",
                    best:"High-velocity brands, resale platforms, or any client where consumer-facing scan data needs to be current.",
                  },
                ].map(({ tier, price, col, schedule, what, best }) => (
                  <div key={tier} style={{ flex:"1 1 260px", background:C.d2, border:`1px solid ${col}40`, borderRadius:12, padding:"16px 18px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:col }}>{tier}</div>
                        <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{schedule}</div>
                      </div>
                      <div style={{ fontSize:16, fontWeight:800, color:col }}>{price}</div>
                    </div>
                    <div style={{ fontSize:11, color:C.dim, lineHeight:1.7, marginBottom:8 }}>{what}</div>
                    <div style={{ fontSize:10, color:col, background:`${col}10`, borderRadius:6, padding:"6px 10px" }}>
                      <span style={{ fontWeight:700 }}>Best for: </span>{best}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sync flow */}
              <Sub>One-way sync flow — step by step</Sub>
              <div className="code">{`<span class="cm">// Nightly sync job — runs on Mac Mini via n8n scheduled trigger</span>

<span class="cw">Step 1</span>  Collect delta                   <span class="cm">// all DPP events since last sync</span>
         query local PostgreSQL WHERE synced_at IS NULL

<span class="cw">Step 2</span>  Build canonical JSON             <span class="cm">// deterministic field ordering</span>
         strip: cost_price, supplier_raw, bom_quantities, formulation
         keep:  public_tier_fields + compliance_fields only

<span class="cw">Step 3</span>  Hash canonical JSON
         sha256_proof = SHA256(canonical_json)
         store sha256_proof in SBT attribute on Base

<span class="cw">Step 4</span>  Encrypt full snapshot            <span class="cm">// backup only — never readable by DeStore</span>
         aes256_blob = AES256(full_dpp_json, client_key)
         <span class="cm">// client holds the key — DeStore cannot decrypt</span>

<span class="cw">Step 5</span>  Tailscale tunnel open            <span class="cm">// peer-to-peer encrypted — no ports exposed</span>
         send: { sha256_proof, public_fields, ownership_events, aes256_blob }
         direction: Mac Mini → DeStore cloud  <span class="cm">// ONE WAY ONLY</span>

<span class="cw">Step 6</span>  DeStore cloud receives
         · writes sha256_proof to Base (SBT attribute)
         · updates public DPP viewer (Tier 1)
         · queues EU Registry submission
         · stores aes256_blob in Cloudflare R2
         · appends to sync audit log: { timestamp, token_ids[], hash_of_payload }

<span class="cw">Step 7</span>  Mac Mini marks records synced
         UPDATE dpp SET synced_at = NOW() WHERE id IN (delta_ids)
         send confirmation receipt to n8n memo workflow → Telegram alert`}</div>

              {/* Hardware spec */}
              <Sub>Hardware spec — leased at $150/month over 36 months</Sub>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
                {[
                  { cat:"Mac Mini (Apple Silicon)", col:C.orange, items:[
                    "Mac Mini M4 Pro — 24GB unified memory",
                    "512GB SSD minimum (1TB recommended)",
                    "Apple Business leased — 0% interest, 36 months",
                    "Option to buy out, renew, or upgrade at end of term",
                    "2× units recommended — primary + cold standby",
                  ]},
                  { cat:"Network requirements", col:C.violet, items:[
                    "Static LAN IP (any broadband connection)",
                    "Tailscale installed — no port forwarding needed",
                    "Outbound HTTPS only — no inbound exposure",
                    "Minimum 10Mbps upload for daily sync",
                    "Cloudflare Tunnel for admin portal (optional)",
                  ]},
                  { cat:"Power & resilience", col:C.green, items:[
                    "UPS (uninterruptible power supply) — mandatory",
                    "Minimum 30-minute battery backup",
                    "Auto-shutdown script on low UPS battery",
                    "Nightly backup to Cloudflare R2 (encrypted)",
                    "Uptime monitor → Telegram alert on failure",
                  ]},
                ].map(({ cat, col, items }) => (
                  <div key={cat} style={{ flex:"1 1 200px", background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:10 }}>{cat}</div>
                    {items.map(item => (
                      <div key={item} style={{ display:"flex", gap:6, alignItems:"flex-start", marginBottom:5 }}>
                        <span style={{ color:col, fontSize:10, marginTop:2 }}>·</span>
                        <span style={{ fontSize:11, color:C.dim, lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Docker stack */}
              <Sub>Edge node Docker Compose stack</Sub>
              <div className="code">{`<span class="cm"># docker-compose.yml — DeStore Enterprise Edge Node</span>
<span class="cm"># Runs on Mac Mini at client site</span>

services:

  <span class="cw">destore-app</span>:          <span class="cm"># Brand admin + DPP management portal</span>
    image: destore/app:latest
    ports: ["3000:3000"]
    env_file: .env.edge
    depends_on: [postgres, redis]

  <span class="cw">destore-api</span>:          <span class="cm"># REST API — DPP CRUD, ownership claims, scan events</span>
    image: destore/api:latest
    ports: ["4000:4000"]
    env_file: .env.edge
    depends_on: [postgres, redis]

  <span class="cw">n8n</span>:                  <span class="cm"># Workflow engine — sync jobs, alerts, ESPR queue</span>
    image: n8nio/n8n:latest
    ports: ["5678:5678"]
    volumes: ["n8n_data:/home/node/.n8n"]
    env_file: .env.edge

  <span class="cw">postgres</span>:             <span class="cm"># Primary datastore — all DPP + ownership data</span>
    image: postgres:16
    volumes: ["pg_data:/var/lib/postgresql/data"]
    environment:
      POSTGRES_DB: destore_edge
      POSTGRES_USER: destore
      POSTGRES_PASSWORD: ${"${PG_PASSWORD}"}

  <span class="cw">redis</span>:                <span class="cm"># Queue + session cache</span>
    image: redis:7-alpine
    volumes: ["redis_data:/data"]

  <span class="cw">caddy</span>:                <span class="cm"># Reverse proxy + TLS for admin portal</span>
    image: caddy:2-alpine
    ports: ["80:80", "443:443"]
    volumes: ["caddy_data:/data", "./Caddyfile:/etc/caddy/Caddyfile"]

  <span class="cw">uptime-kuma</span>:         <span class="cm"># Local uptime monitor → Telegram alerts</span>
    image: louislam/uptime-kuma:1
    ports: ["3001:3001"]
    volumes: ["kuma_data:/app/data"]

volumes:
  pg_data: n8n_data: redis_data: caddy_data: kuma_data:`}</div>

              {/* Setup audit */}
              <Sub>Setup audit scope — what the $6–8k one-time covers</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:20 }}>
                {[
                  { phase:"Week 1 — Discovery",     col:C.orange, items:["Brand data audit — what product data exists, what's missing","Current tech stack assessment — ERP/PLM integrations needed","ESPR gap analysis against current product records","Hardware procurement + Tailscale peering setup"] },
                  { phase:"Week 2 — Build",          col:C.violet, items:["Docker stack deployed + hardened on Mac Mini","n8n sync workflows configured + tested end-to-end","DPP schema mapped from brand's existing data model","JSON-LD template built for brand's product categories"] },
                  { phase:"Week 3 — Migration",      col:C.green,  items:["Existing product catalogue imported to edge node","Historical DPP records migrated (if applicable)","RBAC tiers configured (public / trade / regulator)","EU DPP Registry submission queue seeded"] },
                  { phase:"Week 4 — Handover",       col:C.pink,   items:["Full sync cycle tested — weekly or daily per contract","Staff training — admin portal walkthrough","Compliance handover PDF generated — ESPR readiness report","SLA + escalation contacts confirmed. Go live."] },
                ].map(({ phase, col, items }) => (
                  <div key={phase} style={{ display:"flex", gap:12, background:C.d2, border:`1px solid ${col}25`, borderRadius:10, padding:"12px 16px" }}>
                    <div style={{ width:3, background:col, borderRadius:2, flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:6 }}>{phase}</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"4px 16px" }}>
                        {items.map(item => (
                          <div key={item} style={{ display:"flex", gap:5, alignItems:"flex-start", minWidth:180 }}>
                            <span style={{ color:col, fontSize:9, marginTop:3 }}>✓</span>
                            <span style={{ fontSize:11, color:C.dim, lineHeight:1.5 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing summary */}
              <Sub>Pricing summary</Sub>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {[
                  { label:"Setup audit",        val:"$6,000–8,000",   note:"One-time · 4-week engagement",                col:C.orange },
                  { label:"Hardware lease",     val:"$150/month",      note:"36 months · Mac Mini M4 Pro · buy-out option", col:C.orange },
                  { label:"Weekly sync",        val:"$200/month",      note:"Sunday 02:00 AEDT · full compliance payload",  col:C.green  },
                  { label:"Daily sync",         val:"$600/month",      note:"Nightly 02:00 AEDT · near-real-time",          col:C.violet },
                  { label:"DPP rate",           val:"$0.12/DPP",       note:"40% saving vs Starter · billed on issuance",   col:C.green  },
                  { label:"Minimum monthly",    val:"~$433",           note:"Base plan + hardware + weekly sync",            col:C.orange },
                ].map(({ label, val, note, col }) => (
                  <div key={label} style={{ flex:"1 1 160px", background:C.d2, border:`1px solid ${col}25`, borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ fontSize:10, color:C.muted, marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:16, fontWeight:800, color:col, marginBottom:3 }}>{val}</div>
                    <div style={{ fontSize:10, color:C.dim }}>{note}</div>
                  </div>
                ))}
              </div>
            </Sec>

            {/* ══ 15 PLATFORM SHELL ARCHITECTURE ══ */}
            <Sec id="shell" n="15" title="Platform Shell Architecture" sub="Every module runs in a hardened sandbox iframe — micro-frontend security by design" accent={C.violet}>

              <Card accent={`${C.violet}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:8 }}>Why iframes — not just convenience, actual security</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85, marginBottom:10 }}>
                  The DeStore platform shell is a thin host that composes discrete modules via sandboxed iframes. Each module (dashboard, DPP viewer, QR generation, payments, DeCam scanner, pricing) runs in complete browser-enforced isolation. The parent shell cannot read the iframe's DOM or JavaScript, and the iframe cannot access the parent's auth tokens, wallet state, or other modules. This is not security by convention — it is enforced at the browser level.
                </div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  This is the same pattern Shopify uses for app embeds, Figma for plugins, and Canva for integrations. Every serious composable platform converges on this architecture. A compromised third-party integration, a leaked API key in one module, or a supply-chain attack on one npm package cannot escape its iframe boundary.
                </div>
              </Card>

              {/* Module map */}
              <Sub>Module map — every iframe and its sandbox level</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                {[
                  {
                    module:"Brand Dashboard",
                    url:"app.destore.network/dashboard",
                    sandbox:"allow-scripts allow-same-origin allow-forms",
                    permissions:"none",
                    auth:"JWT via postMessage from shell",
                    col:C.violet,
                    note:"Core brand management — DPP list, analytics, settings. Same-origin so wallet reads work. No camera, no payment.",
                  },
                  {
                    module:"DPP Viewer",
                    url:"app.destore.network/dpp/{tokenId}",
                    sandbox:"allow-scripts allow-same-origin",
                    permissions:"none",
                    auth:"Public Tier 1 — no auth. Trade/Regulator tiers via postMessage token.",
                    col:C.violet,
                    note:"Public-facing ESPR-compliant DPP display. Tier 1 fully public — no auth needed. Tiers 2/3 gated via token.",
                  },
                  {
                    module:"QR Code Generation",
                    url:"app.destore.network/qr/{tokenId}",
                    sandbox:"allow-scripts allow-same-origin allow-downloads",
                    permissions:"none",
                    auth:"JWT via postMessage — brand must own tokenId",
                    col:C.orange,
                    note:"Generates GS1 Digital Link QR for physical tag printing. allow-downloads so PNG/SVG export works. No camera, no payment.",
                  },
                  {
                    module:"DeCam Scanner",
                    url:"app.destore.network/decam",
                    sandbox:"allow-scripts allow-same-origin",
                    permissions:"camera",
                    auth:"Short-lived scan token via postMessage (60s TTL)",
                    col:C.green,
                    note:"Mobile-only QR scanner. Camera permission declared explicitly on parent iframe tag. Most restricted module — 60s token only, no persistent auth.",
                  },
                  {
                    module:"Payments",
                    url:"app.destore.network/pay/{linkId}",
                    sandbox:"allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
                    permissions:"payment",
                    auth:"DeAR.link is self-authenticating — no JWT needed",
                    col:C.orange,
                    note:"Thirdweb payment flow. allow-popups required for wallet connection popups. allow-popups-to-escape-sandbox lets Thirdweb's ConnectButton open wallet apps. payment permission declared.",
                  },
                  {
                    module:"Pricing / Plan Selector",
                    url:"app.destore.network/pricing",
                    sandbox:"allow-scripts allow-same-origin allow-forms",
                    permissions:"none",
                    auth:"None for public view. JWT via postMessage if shown inside authenticated dashboard.",
                    col:C.green2,
                    note:"Can run fully public (marketing site embed) or inside the authenticated shell. Shell passes context token to unlock current plan display.",
                  },
                  {
                    module:"Enterprise Admin",
                    url:"app.destore.network/enterprise",
                    sandbox:"allow-scripts allow-same-origin allow-forms allow-downloads",
                    permissions:"none",
                    auth:"Elevated JWT — enterprise role required. Passed via postMessage with role claim.",
                    col:C.pink,
                    note:"Edge node config, sync schedule, RBAC tier management, audit log viewer. Most privileged module — elevated JWT with explicit enterprise role claim.",
                  },
                ].map(({ module, url, sandbox, permissions, auth, col, note }) => (
                  <div key={module} style={{ background:C.d2, border:`1px solid ${col}30`, borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ display:"flex", gap:10, alignItems:"flex-start", flexWrap:"wrap", marginBottom:8 }}>
                      <div style={{ width:3, background:col, borderRadius:2, alignSelf:"stretch", flexShrink:0 }}/>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:6 }}>
                          <span style={{ fontSize:12, fontWeight:800, color:"#e8e8f0" }}>{module}</span>
                          {permissions !== "none" && <span style={{ fontSize:9, fontWeight:800, color:col, background:`${col}20`, borderRadius:4, padding:"2px 7px" }}>allow="{permissions}"</span>}
                        </div>
                        <div style={{ fontSize:10, color:C.muted, fontFamily:"monospace", marginBottom:6 }}>{url}</div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:6 }}>
                          <div style={{ fontSize:10, color:C.dim }}><span style={{ color:col, fontWeight:700 }}>sandbox: </span>{sandbox}</div>
                        </div>
                        <div style={{ fontSize:10, color:C.dim, marginBottom:4 }}><span style={{ color:"#e8e8f0", fontWeight:700 }}>auth: </span>{auth}</div>
                        <div style={{ fontSize:10, color:C.muted, lineHeight:1.6 }}>{note}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* postMessage auth handshake */}
              <Sub>postMessage auth handshake — how the shell passes tokens to iframes</Sub>
              <div className="code">{`<span class="cm">// Shell (parent) — on iframe load, pass a short-lived token</span>
<span class="cb">const</span> iframe = document.getElementById(<span class="cs">'module-frame'</span>);

iframe.addEventListener(<span class="cs">'load'</span>, () => {
  <span class="cb">const</span> token = generateShortLivedToken({
    userId:    currentUser.id,
    role:      currentUser.role,         <span class="cm">// brand | consumer | enterprise | admin</span>
    moduleId:  <span class="cs">'dashboard'</span>,
    ttl:       <span class="co">900</span>,                      <span class="cm">// 15 minutes (DeCam uses 60s)</span>
    issuedAt:  Date.now(),
  });

  iframe.contentWindow.postMessage(
    { type: <span class="cs">'DESTORE_AUTH'</span>, token },
    <span class="cs">'https://app.destore.network'</span>     <span class="cm">// targetOrigin — never use '*'</span>
  );
});

<span class="cm">// Module (iframe) — listen for auth token from trusted origin only</span>
window.addEventListener(<span class="cs">'message'</span>, (event) => {
  <span class="cb">if</span> (event.origin !== <span class="cs">'https://app.destore.network'</span>) <span class="cb">return</span>; <span class="cm">// reject all others</span>
  <span class="cb">if</span> (event.data?.type !== <span class="cs">'DESTORE_AUTH'</span>) <span class="cb">return</span>;

  initModule(event.data.token); <span class="cm">// boot the module with the received token</span>
});

<span class="cm">// Module height reporting (already implemented in DeCam)</span>
<span class="cm">// Same postMessage channel — different message type</span>
window.parent.postMessage(
  { type: <span class="cs">'DESTORE_HEIGHT'</span>, height: document.body.scrollHeight },
  <span class="cs">'https://app.destore.network'</span>
);`}</div>

              {/* iframe HTML template */}
              <Sub>iframe HTML template — copy for each module integration</Sub>
              <div className="code">{`<span class="cm">&lt;!-- DeCam Scanner — camera permission required --&gt;</span>
&lt;<span class="cg">iframe</span>
  id=<span class="cs">"decam-frame"</span>
  src=<span class="cs">"https://app.destore.network/decam"</span>
  sandbox=<span class="cs">"allow-scripts allow-same-origin"</span>
  allow=<span class="cs">"camera"</span>
  width=<span class="cs">"100%"</span>
  height=<span class="cs">"600"</span>
  style=<span class="cs">"border:none; border-radius:12px;"</span>
  loading=<span class="cs">"lazy"</span>
/&gt;

<span class="cm">&lt;!-- Payments — popups required for wallet connection --&gt;</span>
&lt;<span class="cg">iframe</span>
  id=<span class="cs">"payment-frame"</span>
  src=<span class="cs">"https://app.destore.network/pay/{linkId}"</span>
  sandbox=<span class="cs">"allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"</span>
  allow=<span class="cs">"payment"</span>
  width=<span class="cs">"100%"</span>
  height=<span class="cs">"480"</span>
  style=<span class="cs">"border:none; border-radius:12px;"</span>
/&gt;

<span class="cm">&lt;!-- QR Generation — downloads required for export --&gt;</span>
&lt;<span class="cg">iframe</span>
  id=<span class="cs">"qr-frame"</span>
  src=<span class="cs">"https://app.destore.network/qr/{tokenId}"</span>
  sandbox=<span class="cs">"allow-scripts allow-same-origin allow-downloads"</span>
  width=<span class="cs">"100%"</span>
  height=<span class="cs">"400"</span>
  style=<span class="cs">"border:none; border-radius:12px;"</span>
/&gt;

<span class="cm">&lt;!-- DPP Viewer — public tier, no auth needed --&gt;</span>
&lt;<span class="cg">iframe</span>
  id=<span class="cs">"dpp-frame"</span>
  src=<span class="cs">"https://app.destore.network/dpp/{tokenId}"</span>
  sandbox=<span class="cs">"allow-scripts allow-same-origin"</span>
  width=<span class="cs">"100%"</span>
  height=<span class="cs">"700"</span>
  style=<span class="cs">"border:none; border-radius:12px;"</span>
  loading=<span class="cs">"lazy"</span>
/&gt;`}</div>

              {/* Security properties */}
              <Sub>What this buys you — security properties per module boundary</Sub>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
                {[
                  { title:"DOM isolation", col:C.violet, desc:"Parent shell cannot read or modify iframe DOM. iframe cannot reach parent. A compromised DPP viewer cannot touch the dashboard wallet state." },
                  { title:"Token isolation", col:C.orange, desc:"Auth tokens live in each iframe's own memory. localStorage is origin-scoped — iframe on the same origin uses the same storage, which is why short-lived postMessage tokens are used for sensitive modules." },
                  { title:"Camera isolation", col:C.green, desc:"DeCam's camera permission is scoped to its iframe. The dashboard or payment modules cannot activate the camera even if they wanted to. Permission is declared per iframe, not globally." },
                  { title:"Supply chain isolation", col:C.pink, desc:"A compromised npm package in the QR generation module cannot exfiltrate payment tokens or wallet keys. Each module's dependency tree is isolated at runtime." },
                  { title:"Third-party embed safety", col:C.violet, desc:"Brands embedding the DPP Viewer or pricing module on their own site get the same sandbox protections. DeStore code runs in the iframe — their page cannot be injected by DeStore, and DeStore cannot read their page." },
                  { title:"Enterprise edge node", col:C.orange, desc:"On the self-hosted Mac Mini, each module is served from localhost:{port}. The iframe src changes from app.destore.network to localhost:{port} — all sandbox rules and postMessage patterns apply identically." },
                ].map(({ title, col, desc }) => (
                  <div key={title} style={{ flex:"1 1 200px", background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:6 }}>✓ {title}</div>
                    <div style={{ fontSize:11, color:C.dim, lineHeight:1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>

              {/* Enterprise / edge note */}
              <Sub>Edge node — how modules resolve on self-hosted</Sub>
              <div className="code">{`<span class="cm">// Cloud deployment — modules served from destore CDN</span>
src=<span class="cs">"https://app.destore.network/decam"</span>

<span class="cm">// Enterprise edge node — same modules, served from Mac Mini</span>
src=<span class="cs">"http://localhost:3001/decam"</span>   <span class="cm">// DeCam module</span>
src=<span class="cs">"http://localhost:3002/dashboard"</span> <span class="cm">// Brand dashboard</span>
src=<span class="cs">"http://localhost:3003/qr"</span>        <span class="cm">// QR generation</span>
src=<span class="cs">"http://localhost:3004/pay"</span>       <span class="cm">// Payments (calls DeStore cloud for USDC settlement)</span>

<span class="cm">// postMessage targetOrigin changes to match — enforced in each module</span>
<span class="cb">const</span> SHELL_ORIGIN = process.env.NEXT_PUBLIC_SHELL_ORIGIN;
<span class="cm">// Cloud:  'https://app.destore.network'</span>
<span class="cm">// Edge:   'http://localhost:3000'</span>

<span class="cm">// One env var swap — everything else identical</span>`}</div>

              {/* Marketing claim */}
              <Card accent={`${C.violet}30`} style={{ marginTop:20 }}>
                <div style={{ fontSize:10, fontWeight:800, color:C.violet, marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>Approved Enterprise Copy</div>
                <div style={{ fontSize:13, color:"#e8e8f0", lineHeight:1.8, fontStyle:"italic", marginBottom:8 }}>
                  "Every DeStore module runs in a browser-enforced sandbox — the same security architecture used by Shopify, Figma, and Canva. Your wallet, your payments, and your product data are isolated by design. A vulnerability in one module cannot reach another."
                </div>
                <div style={{ fontSize:10, color:C.muted }}>Use in: enterprise sales, security questionnaires, procurement docs, investor materials.</div>
              </Card>
            </Sec>


            {/* ── SECTION 16 · PLATFORM UX FLOW ── */}
            <Sec id="uxflow" n="16" title="Platform UX Flow" sub="Demo → Free → Paid → Consumer → Circular — the complete freemium funnel" accent={C.violet}>

              {/* ── PHASE LANE HELPER ── */}
              {(() => {
                const Phase = ({ color, label, children }) => (
                  <div style={{ marginBottom:32 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                      <div style={{ width:4, height:32, borderRadius:2, background:color }}/>
                      <div>
                        <div style={{ fontSize:10, fontWeight:800, color:color, letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</div>
                      </div>
                    </div>
                    {children}
                  </div>
                );

                const Step = ({ n, title, sub, color, children, wide }) => (
                  <div style={{ display:"flex", gap:12, marginBottom:4 }}>
                    <div style={{ flexShrink:0, width:28, height:28, borderRadius:"50%", background:`${color}20`, border:`1.5px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:color }}>{n}</div>
                    <div style={{ flex:1, background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:10, padding:"12px 14px" }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"#e8e8f0", marginBottom:3 }}>{title}</div>
                      {sub && <div style={{ fontSize:11, color:C.muted, marginBottom:children?10:0 }}>{sub}</div>}
                      {children}
                    </div>
                  </div>
                );

                const Arrow = ({ color }) => (
                  <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:24, marginLeft:14 }}>
                    <div style={{ width:2, height:16, background:`${color}50` }}/>
                    <div style={{ position:"absolute", marginTop:20, fontSize:14, color:`${color}80` }}>▼</div>
                  </div>
                );

                const Badge = ({ color, children }) => (
                  <span style={{ display:"inline-block", fontSize:9, fontWeight:800, color, background:`${color}15`, border:`1px solid ${color}30`, borderRadius:4, padding:"2px 6px", marginRight:4, marginBottom:2 }}>{children}</span>
                );

                const Row = ({ items, color }) => (
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:8 }}>
                    {items.map(({ icon, label, desc }) => (
                      <div key={label} style={{ flex:"1 1 140px", background:C.d3, borderRadius:8, padding:"10px 12px", border:`1px solid ${color}20` }}>
                        <div style={{ fontSize:14, marginBottom:4 }}>{icon}</div>
                        <div style={{ fontSize:11, fontWeight:700, color:"#d0d0e8", marginBottom:3 }}>{label}</div>
                        {desc && <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>{desc}</div>}
                      </div>
                    ))}
                  </div>
                );

                const TierTable = () => (
                  <div style={{ overflowX:"auto", marginTop:16 }}>
                    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:10, minWidth:520 }}>
                      <thead>
                        <tr style={{ background:C.d3 }}>
                          {["", "NO ACCOUNT (Demo)", "FREE (Google sign-in)", "STARTER / PRO", "ENTERPRISE"].map((h,i) => (
                            <th key={i} style={{ padding:"8px 10px", textAlign:"left", fontWeight:800, color:i===0?C.muted:C.violet, borderBottom:`1px solid ${C.bdr}`, whiteSpace:"nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["DPPs",     "1 prototype", "Up to 50",       "Per plan",           "Up to 5M/yr"],
                          ["Domain",   "demo.*",      "demo.* or own",  "Custom domain",      "Custom domain"],
                          ["On-chain", "✗",           "✗",              "✓",                  "✓"],
                          ["Laava",    "✗",           "✗",              "✓ Pro+",             "✓"],
                          ["Resale",   "✗",           "✗",              "✓",                  "✓"],
                          ["Consult",  "✗",           "✗",              "1hr–10hrs",          "40hrs $8k"],
                          ["Login",    "None",        "Google",         "Google",             "Google + SSO"],
                        ].map(([feat,...vals]) => (
                          <tr key={feat} style={{ borderBottom:`1px solid ${C.bdr}20` }}>
                            <td style={{ padding:"7px 10px", fontWeight:700, color:C.muted, fontSize:10 }}>{feat}</td>
                            {vals.map((v,i) => (
                              <td key={i} style={{ padding:"7px 10px", color: v==="✗"?C.muted:v==="✓"||v.startsWith("✓")?C.green:"#c8c8e0", fontSize:10 }}>{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

                return (
                  <div>

                    {/* ── PHASE 1: INSTANT DEMO ── */}
                    <Phase color={C.orange} label="Phase 1 — Instant Demo · No account required · 4 clicks · under 5 seconds · identical to live flow">
                      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr auto 1fr", gap:4, alignItems:"center" }}>
                        {[
                          { n:1, title:"Land on DeStore", sub:"destore.network or marketing link", cta:"Create a DPP in 5 seconds — no signup" },
                          null,
                          { n:2, title:"Paste your URL", sub:"Single input field → product page URL", cta:"Generate DPP →" },
                          null,
                          { n:3, title:"Auto-scrape + Preview", sub:"Platform scrapes: name · image · description · price · brand", cta:"Edit · Create DPP →" },
                          null,
                          { n:4, title:"DPP Created — Live Preview", sub:"put-your-domain-here.com/01/09506000130017 — Identical to live flow. Real QR on screen → scan → DeAR pass to Apple or Google Wallet. Only difference: pass displays 'DEMO PRODUCT'.", cta:"Download QR · Copy Link · Sign in →" },
                        ].map((item, i) => item === null ? (
                          <div key={i} style={{ textAlign:"center", fontSize:18, color:C.orange, opacity:0.5 }}>→</div>
                        ) : (
                          <div key={i} style={{ background:C.d2, border:`1px solid ${C.orange}30`, borderRadius:10, padding:"12px 12px 10px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                              <div style={{ width:20, height:20, borderRadius:"50%", background:`${C.orange}20`, border:`1.5px solid ${C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:C.orange, flexShrink:0 }}>{item.n}</div>
                              <div style={{ fontSize:11, fontWeight:700, color:"#e8e8f0" }}>{item.title}</div>
                            </div>
                            <div style={{ fontSize:10, color:C.muted, marginBottom:6, lineHeight:1.5 }}>{item.sub}</div>
                            <div style={{ fontSize:9, fontWeight:700, color:C.orange, background:`${C.orange}10`, borderRadius:4, padding:"3px 6px", display:"inline-block" }}>{item.cta}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop:10, display:"flex", gap:8, flexWrap:"wrap" }}>
                        <div style={{ flex:"2 1 300px", padding:"10px 14px", background:`${C.orange}08`, border:`1px solid ${C.orange}20`, borderRadius:8, fontSize:10, color:C.muted, lineHeight:1.6 }}>
                          💡 After click 4 — optional Google sign-in saves the demo DPP to a new free account
                        </div>
                        <div style={{ flex:"3 1 360px", background:C.d2, border:`1px solid ${C.pink}30`, borderRadius:8, padding:"10px 14px" }}>
                          <div style={{ fontSize:10, fontWeight:800, color:C.pink, marginBottom:6, letterSpacing:"0.08em" }}>📲 REAL QR · WALLET PASS DELIVERY — IDENTICAL TO LIVE FLOW</div>
                          <div style={{ fontSize:9, color:"#f0a030", background:"#f0a03010", border:"1px solid #f0a03030", borderRadius:4, padding:"3px 8px", marginBottom:8, display:"inline-block" }}>
                            ⚠ Demo passes are visually distinct — "DEMO PRODUCT" label + distinct pass colour. All mechanics identical to production.
                          </div>
                          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:10, fontWeight:700, color:"#d0d0e8", marginBottom:3 }}>Demo = real platform, identical flow</div>
                              <div style={{ fontSize:10, color:C.muted, lineHeight:1.7 }}>
                                1. Real QR code rendered on screen<br/>
                                2. Scan with phone camera<br/>
                                3. Resolves to put-your-domain-here.com<br/>
                                4. DeAR detects device — iOS or Android<br/>
                                5. Real wallet pass delivered — Apple or Google<br/>
                                6. One tap "Add to Wallet"
                              </div>
                            </div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:10, fontWeight:700, color:"#d0d0e8", marginBottom:3 }}>Only difference — pass content</div>
                              <div style={{ fontSize:10, color:C.muted, lineHeight:1.7 }}>
                                🍎 Apple Wallet — .pkpass<br/>
                                🤖 Google Wallet — JWT pass<br/>
                                ──────────────────<br/>
                                Product name + brand + image<br/>
                                DPP ID (GS1 Digital Link)<br/>
                                Ownership card<br/>
                                ──────────────────<br/>
                                <span style={{ color:"#f0a030", fontWeight:700 }}>⚠ "DEMO PRODUCT" label</span><br/>
                                <span style={{ color:"#f0a030" }}>Visually distinct from live pass</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Phase>

                    {/* ── PHASE 2: FREE TIER ── */}
                    <Phase color={C.green} label="Phase 2 — Free Tier · Google Sign-In · Zero friction">
                      <div style={{ display:"flex", gap:10 }}>
                        <div style={{ flex:1, background:C.d2, border:`1px solid ${C.green}30`, borderRadius:10, padding:"12px 14px" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.green, marginBottom:8 }}>✓ FREE ACCOUNT INCLUDES</div>
                          {["Up to 50 DPPs","DeStore free domain — put-your-domain-here.com","Basic DPP creation tools","QR code generation","Mobile preview + DeCam preview"].map(f => (
                            <div key={f} style={{ fontSize:10, color:"#c0c0d8", marginBottom:3 }}>✓ {f}</div>
                          ))}
                        </div>
                        <div style={{ flex:1, background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:10, padding:"12px 14px" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:8 }}>✗ REQUIRES UPGRADE</div>
                          {["Custom domain (branded QR URLs)","On-chain DPP SBTs","Laava Smart Fingerprint™","Marketplace / resale features","Consulting hours"].map(f => (
                            <div key={f} style={{ fontSize:10, color:C.muted, marginBottom:3 }}>✗ {f}</div>
                          ))}
                        </div>
                        <div style={{ flex:1, background:C.d2, border:`1px solid ${C.green}30`, borderRadius:10, padding:"12px 14px" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.green, marginBottom:8 }}>TWO FREE PATHS</div>
                          <div style={{ marginBottom:8 }}>
                            <div style={{ fontSize:10, fontWeight:700, color:"#d0d0e8", marginBottom:2 }}>A · Use free domain</div>
                            <div style={{ fontSize:10, color:C.muted }}>Keep building on put-your-domain-here.com</div>
                          </div>
                          <div>
                            <div style={{ fontSize:10, fontWeight:700, color:"#d0d0e8", marginBottom:2 }}>B · Connect own domain</div>
                            <div style={{ fontSize:10, color:C.muted }}>White-label: qr.yourbrand.com — still free tier</div>
                          </div>
                        </div>
                      </div>
                    </Phase>

                    {/* ── PHASE 3: PAID BRAND WORKFLOW ── */}
                    <Phase color={C.violet} label="Phase 3 — Paid Brand Workflow · Starter / Pro / Enterprise">
                      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                        {[
                          { n:"8", title:"Connect Domain", sub:"White-label subdomain wizard", color:C.violet, detail:"Enter subdomain → Add DNS CNAME → Verify (DNS + SSL + Resolver) → Connected ✓" },
                          { n:"9", title:"Create Collections", sub:"Full collection creator", color:C.violet, detail:"Product name · GTIN · batch · images · descriptions · sustainability data · repair/care instructions · end-of-life rules" },
                          { n:"10", title:"DPP Issuance", sub:"1 DPP per product sold — not per scan", color:C.violet, detail:null },
                          { n:"11", title:"GS1 Digital Link QR", sub:"Resolves via branded domain — printed/applied to physical product", color:C.violet, detail:"qr.yourbrand.com/01/09506000130017" },
                        ].map(({ n, title, sub, color, detail }) => (
                          <div key={n}>
                            <Step n={n} title={title} sub={sub} color={color}>
                              {n==="10" ? (
                                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:6 }}>
                                  {[
                                    { label:"DPP SBT", desc:"ERC-721 Soulbound · Brand Wallet · Metadata → Arweave", col:C.violet },
                                    { label:"Laava Smart Fingerprint™", desc:"Applied to physical item · tamper-evident", col:C.pink },
                                    { label:"Chains", desc:"Base (primary) · Polygon · Soneium", col:C.green },
                                    { label:"B&B Treasury", desc:"$0.01 USDC per issuance → Base wallet", col:C.orange },
                                  ].map(({ label, desc, col }) => (
                                    <div key={label} style={{ flex:"1 1 120px", background:C.d3, borderRadius:6, padding:"8px 10px", border:`1px solid ${col}25` }}>
                                      <div style={{ fontSize:10, fontWeight:700, color:col, marginBottom:3 }}>{label}</div>
                                      <div style={{ fontSize:9, color:C.muted, lineHeight:1.5 }}>{desc}</div>
                                    </div>
                                  ))}
                                </div>
                              ) : detail ? (
                                <div style={{ fontSize:10, color:C.muted, marginTop:4, lineHeight:1.6 }}>{detail}</div>
                              ) : null}
                            </Step>
                            {n !== "11" && <div style={{ marginLeft:14, height:16, borderLeft:`1.5px dashed ${C.violet}30`, marginBottom:4 }}/>}
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop:10, textAlign:"center", fontSize:12, fontWeight:700, color:C.violet, padding:"10px", background:`${C.violet}08`, borderRadius:8, border:`1px solid ${C.violet}20` }}>
                        📦 PRODUCT IS IN THE WILD
                      </div>
                    </Phase>

                    {/* ── PHASE 4: CONSUMER ── */}
                    <Phase color={C.pink} label="Phase 4 — Consumer Experience · Zero crypto UX">
                      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr auto 1fr", gap:4, alignItems:"center" }}>
                        {[
                          { n:12, title:"Consumer Scans QR", sub:"Phone camera → branded URL · Mobile-only gate", icon:"📱" },
                          null,
                          { n:13, title:"DeCam Verification", sub:"Laava Smart Fingerprint™ check · HTTPS + Camera", icon:"🔍" },
                          null,
                          { n:14, title:"DPP Landing Page", sub:"Origin · materials · sustainability · ownership history · care/repair", icon:"📄" },
                          null,
                          { n:15, title:"Claim Ownership", sub:"ERC-721 transferable · off-chain JWT · consumer never sees blockchain", icon:"🔑" },
                          null,
                          { n:16, title:"Receipt Email", sub:"Co-branded · DPP inline · Apple/Google/DeAR wallet CTAs · 4 action buttons", icon:"📧" },
                        ].map((item, i) => item === null ? (
                          <div key={i} style={{ textAlign:"center", fontSize:18, color:C.pink, opacity:0.5 }}>→</div>
                        ) : (
                          <div key={i} style={{ background:C.d2, border:`1px solid ${C.pink}30`, borderRadius:10, padding:"12px 12px 10px" }}>
                            <div style={{ fontSize:20, marginBottom:6 }}>{item.icon}</div>
                            <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
                              <div style={{ fontSize:9, fontWeight:800, color:C.pink, background:`${C.pink}15`, border:`1px solid ${C.pink}30`, borderRadius:3, padding:"1px 5px" }}>{item.n}</div>
                              <div style={{ fontSize:11, fontWeight:700, color:"#e8e8f0" }}>{item.title}</div>
                            </div>
                            <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>{item.sub}</div>
                          </div>
                        ))}
                      </div>

                      {/* Receipt Email detail strip */}
                      <div style={{ marginTop:10, background:`${C.violet}08`, border:`1px solid ${C.violet}22`, borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", color:C.violet, marginBottom:8 }}>◈ Receipt Email — Co-Brand System</div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                          {[
                            ["Trigger",     "GS1 QR scan → purchase confirmed → email fires immediately"],
                            ["Logo",        "Inline SVG path data · Primary Reversed · no img tags · zero network requests"],
                            ["Client skin", "CSS vars: --brand-primary / secondary / accent · hero gradient · client badge · copy tone"],
                            ["Wallet CTAs", "Apple Wallet (.pkpass) · Google Wallet (JWT) · DeAR Wallet deep-link"],
                            ["Actions",     "Sell · Gift · Recycle · Return — mirror DeAR wallet · each event → $0.01 B&B Treasury"],
                            ["Tech",        "Pure HTML/CSS · inline SVG · no external fonts · under 100kb · Gmail + Apple Mail + Outlook"],
                          ].map(([l,v]) => (
                            <div key={l} style={{ background:"#141418", border:"1px solid #2e2e38", borderRadius:8, padding:"8px 10px" }}>
                              <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", color:C.muted, marginBottom:3 }}>{l}</div>
                              <div style={{ fontSize:10, color:"#c8c8d8", lineHeight:1.5 }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop:8, fontSize:10, color:C.muted }}>Ref: <span style={{ color:C.violet }}>destore-receipt-email.html</span> · DS_UiUxGuide §13</div>
                      </div>
                    </Phase>

                    {/* ── PHASE 5: CIRCULAR ECONOMY LIFECYCLE ── */}
                    <Phase color={C.green} label="Phase 5 — Circular Economy Lifecycle · Every event = $0.01 → B&amp;B Treasury">
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {[
                          { icon:"🔄", label:"RESALE", desc:"Thirdweb Marketplace V3 · USDC settlement · ownership claim transfers", col:C.violet },
                          { icon:"🎁", label:"GIFT", desc:"Transfer ownership claim to new wallet · DPP follows the product", col:C.green },
                          { icon:"↩️", label:"RETURN", desc:"Ownership claim returns to brand wallet · DPP marked returned", col:C.orange },
                          { icon:"♻️", label:"DESTROY / RECYCLE", desc:"End-of-life event · DPP marked destroyed · circular data recorded on-chain", col:C.pink },
                        ].map(({ icon, label, desc, col }) => (
                          <div key={label} style={{ flex:"1 1 140px", background:C.d2, border:`1px solid ${col}30`, borderRadius:10, padding:"14px 12px" }}>
                            <div style={{ fontSize:22, marginBottom:6 }}>{icon}</div>
                            <div style={{ fontSize:11, fontWeight:800, color:col, marginBottom:5 }}>{label}</div>
                            <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>{desc}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop:10, background:`${C.green}08`, border:`1px solid ${C.green}25`, borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                        <div style={{ fontSize:24 }}>🏦</div>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, color:C.green, marginBottom:3 }}>B&B Treasury — every lifecycle event</div>
                          <div style={{ fontSize:10, color:C.muted, lineHeight:1.6 }}>$0.01 USDC per event (issuance · resale · gift · return · recycle) → Base wallet → accumulates USDC → future buyback-and-burn on DeStore token launch</div>
                        </div>
                      </div>
                    </Phase>

                    {/* ── PRO / FUN MODE ── */}
                    <Sub style={{ marginTop:24 }}>Pro / Fun mode — all consumer UIs ship with both</Sub>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
                      <div style={{ flex:"1 1 200px", background:C.d2, border:`1px solid #c8c8e020`, borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontSize:11, fontWeight:800, color:"#c8c8e0", marginBottom:6 }}>◈ PRO MODE</div>
                        <div style={{ fontSize:10, color:C.muted, lineHeight:1.7 }}>Cormorant Garamond serif · geometric symbols ◼ ▲ ◈ · spin-border wallet card · terse functional copy · default for corporate demos and brand dashboards</div>
                      </div>
                      <div style={{ flex:"1 1 200px", background:C.d2, border:`1px solid ${C.violet}25`, borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontSize:11, fontWeight:800, color:C.violet, marginBottom:6 }}>✦ FUN MODE</div>
                        <div style={{ fontSize:10, color:C.muted, lineHeight:1.7 }}>Fredoka One rounded · emoji product icons 👟 🧥 ♻️ · holographic foil wallet card · warm emoji-rich copy · opt-in by toggle · consumer default on DPP landing pages</div>
                      </div>
                      <div style={{ flex:"1 1 200px", background:C.d2, border:`1px solid ${C.green}25`, borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontSize:11, fontWeight:800, color:C.green, marginBottom:6 }}>THE RULE</div>
                        <div style={{ fontSize:10, color:C.muted, lineHeight:1.7 }}>Same data · same DPP · same blockchain state. Presentation layer only. Toggle always visible at top of screen. Never hidden in settings. Reference impl: <span style={{ color:C.violet }}>destore-dear-wallet.jsx</span>. Full spec: DS_UiUxGuide §12.</div>
                      </div>
                    </div>

                    {/* ── PLATFORM PARTICIPANTS ── */}
                    <Sub>Platform participants — who plugs into DeStore infrastructure</Sub>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                      {[
                        { icon:"🏷️", label:"Brands",    desc:"Issue DPPs · connect domain · manage collections · access lifecycle data" },
                        { icon:"🏬", label:"Retailers",  desc:"Sell products with embedded DPPs · display provenance at point of sale" },
                        { icon:"🔁", label:"Resale Platforms", desc:"List authenticated second-hand items · USDC settlement via Thirdweb Market V3" },
                        { icon:"🌿", label:"Recyclers",  desc:"Receive end-of-life events · record destruction · close the circular loop" },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} style={{ flex:"1 1 160px", background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:10, padding:"14px 12px", textAlign:"center" }}>
                          <div style={{ fontSize:24, marginBottom:6 }}>{icon}</div>
                          <div style={{ fontSize:11, fontWeight:700, color:"#d8d8f0", marginBottom:5 }}>{label}</div>
                          <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>{desc}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background:C.d2, border:`1px solid ${C.violet}25`, borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
                      <div style={{ fontSize:10, fontWeight:800, color:C.violet, marginBottom:6, letterSpacing:"0.1em" }}>DeStore INFRA LAYER</div>
                      <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                        {["DPP SBTs + Ownership Claims","GS1 Digital Link QR","Laava Verification","n8n Workflows","B&B Treasury","DeAR Wallet","DeCam Scanner"].map(t => (
                          <span key={t} style={{ fontSize:9, fontWeight:700, color:C.violet, background:`${C.violet}12`, border:`1px solid ${C.violet}25`, borderRadius:4, padding:"3px 8px" }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* ── ACCOUNT TIER TABLE ── */}
                    <Sub style={{ marginTop:24 }}>Account tier summary</Sub>
                    <TierTable/>

                    {/* Pro/Fun callout */}
                    <div style={{ marginTop:28, background:`${C.d2}`, border:`1px solid ${C.violet}30`, borderRadius:12, padding:"14px 18px", display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap" }}>
                      <div style={{ fontSize:28, flexShrink:0 }}>✦</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:5 }}>Pro / Fun Mode — global DeStore UI pattern</div>
                        <div style={{ fontSize:11, color:C.muted, lineHeight:1.7, marginBottom:8 }}>
                          Every consumer-facing DeStore UI ships with a Pro/Fun toggle. Same data, same DPP, same blockchain state — two presentation layers. Pro: minimal geometric, Cormorant Garamond, symbol icons. Fun: emoji, Fredoka One, holographic foil card, warm toasts. Corporate procurement officers and first-time consumers use the same build.
                        </div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          {[
                            { label:"◈ Pro", desc:"Cormorant Garamond · geometric icons · dark minimal", col:C.muted },
                            { label:"✦ Fun", desc:"Fredoka One · emoji · holographic foil card · warm copy", col:C.violet },
                            { label:"Toggle always visible", desc:"Never in settings — always in the UI", col:C.green },
                            { label:"Default: Pro", desc:"Fun is opt-in", col:C.orange },
                          ].map(({ label, desc, col }) => (
                            <div key={label} style={{ background:C.d3, borderRadius:8, padding:"8px 10px", flex:"1 1 120px", border:`1px solid ${col}20` }}>
                              <div style={{ fontSize:10, fontWeight:800, color:col, marginBottom:3 }}>{label}</div>
                              <div style={{ fontSize:9, color:C.muted, lineHeight:1.5 }}>{desc}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop:10, fontSize:10, color:C.muted }}>
                          Reference implementation: <span style={{ color:C.violet, fontWeight:700 }}>DeAR_wallet.jsx</span> — canonical Pro/Fun build. See DS_UiUxGuide §16 for full pattern rules.
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </Sec>

            {/* FOOTER */}
            <div style={{ borderTop:`1px solid ${C.bdr}`, paddingTop:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
              <div>
                <Logo width={80}/>
                <div style={{ fontSize:10, color:C.muted, marginTop:6 }}>© DeStore Network · Systems Guide v1.6 · March 2026</div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <Chip color={C.violet}>Sandbox iframes</Chip>
                <Chip color={C.orange}>Edge Node</Chip>
                <Chip color={C.orange}>5% Buffer</Chip>
                <Chip color={C.pink}>26-Day Audit</Chip>
                <Chip color={C.violet}>xAI Grok</Chip>
                <Chip color={C.green}>3 Chains</Chip>
                <Chip color={C.green2}>Pricing</Chip>
                <Chip color={C.violet}>2-Token ERC-721</Chip>
                <Chip color={C.pink}>Security</Chip>
                <Chip color={C.green}>DeCam · DeAR</Chip>
                <Chip color={C.violet}>ESPR Compliant</Chip>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
