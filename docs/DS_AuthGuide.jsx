import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

@property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:#0a0a0d; }
::-webkit-scrollbar-thumb { background:#2e2e38; border-radius:2px; }
body { background:#0a0a0d; color:#fff; font-family:'Plus Jakarta Sans',sans-serif; -webkit-font-smoothing:antialiased; }

.nav-btn { display:flex; align-items:center; gap:8px; padding:8px 18px; font-size:12px; font-weight:600; color:#6b6b80; cursor:pointer; border:none; border-left:2px solid transparent; background:transparent; width:100%; text-align:left; font-family:'Plus Jakarta Sans',sans-serif; transition:all .14s; }
.nav-btn:hover { color:#9999b0; background:rgba(255,255,255,.025); }
.nav-btn.active { color:#28B79D; border-left-color:#28B79D; background:rgba(40,183,157,.07); }
.nav-dot { width:5px; height:5px; border-radius:50%; background:#2e2e38; flex-shrink:0; transition:all .14s; }

.code { background:#060608; border:1px solid #2e2e38; border-radius:12px; padding:18px 20px; font-family:'JetBrains Mono',monospace; font-size:11.5px; line-height:1.9; overflow-x:auto; white-space:pre; color:#9999b0; margin-bottom:20px; }
.cv { color:#B354F1; } .cg { color:#28B79D; } .co { color:#FF9F46; }
.cb { color:#79b8ff; } .cm { color:#6b6b80; font-style:italic; }
.cw { color:#e8eaf0; } .cp { color:#FF1B9A; } .cs { color:#a8ff78; }

@keyframes spin-border { to { --angle:360deg; } }
@keyframes fadeUp { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
@keyframes pulse-green { 0%,100%{box-shadow:0 0 0 0 rgba(40,183,157,.4)} 50%{box-shadow:0 0 0 8px rgba(40,183,157,0)} }

.conic-wrap { position:relative; border-radius:13px; padding:1.5px; display:inline-block; background:conic-gradient(from var(--angle,0deg),#B354F1,#6a14db,#00c8ff,#B354F1 40%,#321b68 60%,#B354F1); animation:spin-border 2.5s linear infinite; }
.conic-inner { background:#26262e; border-radius:11px; padding:10px 18px; color:#fff; font-size:13px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; }

.flow-arrow { color:#2e2e38; font-size:20px; flex-shrink:0; }
.flow-node { border-radius:12px; padding:14px 18px; border:1px solid #2e2e38; background:#141418; font-size:12px; font-weight:700; }
.live-dot { width:7px; height:7px; border-radius:50%; background:#28B79D; animation:pulse-green 2s ease infinite; display:inline-block; margin-right:6px; }

/* Mobile */
.ham-btn { display:none; align-items:center; justify-content:center; width:36px; height:36px; background:transparent; border:1px solid #2e2e38; border-radius:8px; cursor:pointer; flex-shrink:0; }
.ham-btn span { display:block; width:16px; height:1.5px; background:#9999b0; border-radius:2px; }
.ham-btn span+span { margin-top:4px; }
.sidebar-backdrop { display:none; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:199; }

@media (max-width:768px) {
  .ham-btn { display:flex; }
  .sidebar-panel { position:fixed !important; top:0 !important; left:-240px !important; height:100vh !important; z-index:200; width:240px !important; transition:left .25s cubic-bezier(0.34,1,0.64,1); box-shadow:4px 0 24px rgba(0,0,0,.5); }
  .sidebar-panel.open { left:0 !important; }
  .sidebar-backdrop { display:block; }
  .main-content { height:calc(100vh - 52px) !important; }
  .content-pad { padding:28px 16px 100px !important; }
  .grid2 { grid-template-columns:1fr !important; }
  .code { font-size:10px !important; padding:12px !important; }
  .tbl-wrap { overflow-x:auto; }
  .tbl-wrap table { min-width:520px; }
}
@media (max-width:480px) {
  .content-pad { padding:20px 12px 100px !important; }
}
`;

const C = {
  d0:"#0a0a0d", d1:"#0d0d10", d2:"#141418", d3:"#1c1c22", d4:"#26262e",
  bdr:"#2e2e38", muted:"#6b6b80", dim:"#9999b0",
  violet:"#B354F1", orchid:"#6A14DB", royal:"#321B68",
  green:"#28B79D", green2:"#2FB457",
  pink:"#FF1B9A", orange:"#FF9F46",
};

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
const Logo = ({ fill="#fff", width=120 }) => (
  <svg width={width} height={width*(76.5/405.4)} viewBox="0 0 405.4 76.5" xmlns="http://www.w3.org/2000/svg">
    {WM_PATHS.map((d,i) => <path key={i} d={d} fill={fill}/>)}
  </svg>
);

const Chip = ({ children, color=C.dim }) => (
  <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.06em", color, background:`${color}14`, border:`1px solid ${color}30`, borderRadius:20, padding:"4px 12px", display:"inline-block" }}>{children}</span>
);

const Sec = ({ id, n, title, sub, children, accent=C.green }) => (
  <section id={id} style={{ marginBottom:72, animation:"fadeUp .4s ease" }}>
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28, paddingBottom:16, borderBottom:`1px solid ${C.bdr}` }}>
      <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${accent},${accent}99)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0, boxShadow:`0 0 18px ${accent}50` }}>{n}</div>
      <div>
        <div style={{ fontSize:21, fontWeight:900, letterSpacing:"-0.3px" }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:C.dim, marginTop:3 }}>{sub}</div>}
      </div>
    </div>
    {children}
  </section>
);

const Card = ({ children, accent, style={} }) => (
  <div style={{ background:C.d2, border:`1px solid ${accent||C.bdr}`, borderRadius:14, padding:20, ...style }}>
    {children}
  </div>
);

const Sub = ({ children }) => (
  <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:12, marginTop:28 }}>{children}</div>
);

const SecurityBadge = ({ level, label }) => {
  const cols = { high:C.green, med:C.orange, info:C.violet };
  const col = cols[level]||C.dim;
  return (
    <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase", color:col, background:`${col}15`, border:`1px solid ${col}35`, borderRadius:4, padding:"2px 7px", marginLeft:8 }}>{label}</span>
  );
};

const NAV = [
  { id:"arch",     label:"01 · Architecture" },
  { id:"login",    label:"02 · Login Methods" },
  { id:"smart",    label:"03 · Smart Account" },
  { id:"recovery", label:"04 · Account Recovery" },
  { id:"security", label:"05 · Security Model" },
  { id:"pregen",   label:"06 · Pregeneration" },
  { id:"session",  label:"07 · Session Keys" },
  { id:"impl",     label:"08 · Implementation" },
  { id:"n8n",      label:"09 · n8n Integration" },
  { id:"checklist",label:"10 · Launch Checklist" },
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
        <div style={{ padding:"10px 20px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button className="ham-btn" onClick={()=>setSidebarOpen(o=>!o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
            <Logo fill="#ffffff" width={110}/>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <Chip color={C.green}>Auth + AA Guide</Chip>
            <Chip color={C.violet}>Thirdweb v5</Chip>
          </div>
        </div>
        <div style={{ height:3, background:`linear-gradient(90deg,${C.green},${C.violet},transparent)`, marginTop:8 }}/>
      </div>

      <div style={{ display:"flex" }}>
        {sidebarOpen && <div className="sidebar-backdrop" onClick={()=>setSidebarOpen(false)}/>}

        {/* SIDEBAR */}
        <aside className={`sidebar-panel${sidebarOpen?" open":""}`} style={{ width:220, flexShrink:0, position:"sticky", top:52, height:"calc(100vh - 52px)", overflowY:"auto", background:C.d1, borderRight:`1px solid ${C.bdr}`, paddingTop:20, paddingBottom:40 }}>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, padding:"0 18px 12px" }}>Auth & AA Guide</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn${activeNav===n.id?" active":""}`}
              style={{ borderLeftColor:activeNav===n.id?C.green:"transparent", color:activeNav===n.id?C.green:undefined, background:activeNav===n.id?`${C.green}10`:undefined }}
              onClick={()=>scrollTo(n.id)}>
              <div className="nav-dot" style={{ background:activeNav===n.id?C.green:undefined, boxShadow:activeNav===n.id?`0 0 7px ${C.green}`:undefined }}/>
              {n.label}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="main-content" style={{ flex:1, overflowY:"auto", height:"calc(100vh - 52px)" }}>
          <div className="content-pad" style={{ padding:"52px 56px 140px", maxWidth:900 }}>

            {/* HERO */}
            <div style={{ marginBottom:72 }}>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green, marginBottom:12 }}>DeStore Network</div>
              <h1 style={{ fontSize:44, fontWeight:900, letterSpacing:"-1.5px", lineHeight:1.08, marginBottom:16 }}>Auth & Account<br/>Abstraction</h1>
              <p style={{ fontSize:14, color:C.dim, maxWidth:560, lineHeight:1.8, marginBottom:24 }}>
                Every DeStore account is a smart wallet on Base (primary) — created automatically on first login, recoverable via any linked auth method, with no seed phrases and no gas exposure for users.
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <Chip color={C.green}>ERC-4337 Smart Accounts</Chip>
                <Chip color={C.violet}>Thirdweb inAppWallet</Chip>
                <Chip color={C.orange}>AWS Nitro Enclave keys</Chip>
                <Chip color={C.pink}>No seed phrases</Chip>
                <Chip color={C.green}>Recoverable</Chip>
              </div>
            </div>

            {/* ══ 01 ARCHITECTURE ══ */}
            <Sec id="arch" n="01" title="Two-Layer Architecture" sub="How login → smart wallet address works end to end">
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:28 }}>

                {/* Layer diagram */}
                {[
                  { n:"Layer 1 — Identity", col:C.violet, title:"inAppWallet (EOA)", desc:"Created on first login. Private key lives in AWS Nitro Enclave — never leaves, never exposed. This is the admin signer.", badge:"IDENTITY", items:["Email OTP · Google · Apple · passkey · phone","Key generated inside secure enclave on first login","Never reconstructed outside enclave","User authenticates → enclave signs on their behalf"] },
                  { n:"Layer 2 — Address", col:C.green, title:"Smart Account (ERC-4337)", desc:"A smart contract wallet deployed on Base (primary chain). This is the address that owns DPPs, receives USDC, holds ownership claims.", badge:"ON-CHAIN ADDRESS", items:["Deterministic address — same address across all EVM chains","Deployed by AccountFactory on first on-chain action","inAppWallet = admin signer of this smart account","Gasless — DeStore sponsors all gas via Paymaster"] },
                  { n:"Layer 3 — Record", col:C.orange, title:"DeStore DB + Base SBT", desc:"The ownership claim is a cryptographically signed record in the DeStore database. The DPP SBT lives on Base.", badge:"OWNERSHIP", items:["Smart account address tied to ownership claim record","DPP SBT minted to smart account address at manufacture","Ownership claim transfer = update DB record + on-chain notary stamp","B&B Treasury receives $0.01 USDC on every event"] },
                ].map(({ n: num, col, title, desc, badge, items }) => (
                  <div key={num} style={{ display:"flex", gap:0 }}>
                    <div style={{ width:3, background:`linear-gradient(180deg,${col},${col}44)`, borderRadius:2, flexShrink:0, marginRight:16 }}/>
                    <div style={{ flex:1, background:C.d2, border:`1px solid ${col}30`, borderRadius:14, padding:20 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.1em", color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"2px 8px" }}>{badge}</span>
                        <span style={{ fontSize:15, fontWeight:800 }}>{title}</span>
                        <span style={{ fontSize:10, color:C.muted }}>{num}</span>
                      </div>
                      <p style={{ fontSize:12, color:C.dim, lineHeight:1.7, marginBottom:12 }}>{desc}</p>
                      <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                        {items.map((item,i) => (
                          <div key={i} style={{ display:"flex", gap:8, fontSize:11, color:C.dim }}>
                            <span style={{ color:col, flexShrink:0 }}>→</span>{item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Flow: First Login → Wallet Address</Sub>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                {[
                  { label:"User enters email", col:C.dim },
                  { label:"→", col:C.bdr, arrow:true },
                  { label:"OTP verified", col:C.violet },
                  { label:"→", col:C.bdr, arrow:true },
                  { label:"Enclave creates EOA", col:C.violet },
                  { label:"→", col:C.bdr, arrow:true },
                  { label:"Smart account deployed", col:C.green },
                  { label:"→", col:C.bdr, arrow:true },
                  { label:"Address returned to DeStore", col:C.green },
                  { label:"→", col:C.bdr, arrow:true },
                  { label:"Stored in DeStore DB as user wallet", col:C.orange },
                ].map((s,i) => s.arrow
                  ? <span key={i} style={{ color:C.bdr, fontSize:18 }}>›</span>
                  : <div key={i} style={{ background:C.d3, border:`1px solid ${s.col}30`, borderRadius:8, padding:"6px 12px", fontSize:11, fontWeight:700, color:s.col }}>{s.label}</div>
                )}
              </div>
            </Sec>

            {/* ══ 02 LOGIN METHODS ══ */}
            <Sec id="login" n="02" title="Login Methods" sub="What DeStore supports · all are equal recovery methods · link multiple for redundancy" accent={C.violet}>

              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
                {[
                  { method:"Email OTP", icon:"✉️", rec:"✓ Primary recovery method", detail:"6-digit code sent to email. No password to forget. Code expires in 10 min.", status:"RECOMMENDED", col:C.green },
                  { method:"Google OAuth", icon:"G", rec:"✓ Recovery via Google account", detail:"One-tap login. Recovery = regain access to Google account.", status:"RECOMMENDED", col:C.green },
                  { method:"Apple Sign-In", icon:"", rec:"✓ Recovery via Apple ID", detail:"Required for iOS apps in App Store. Private relay email supported.", status:"RECOMMENDED", col:C.green },
                  { method:"Passkey", icon:"🔑", rec:"✓ Strongest security", detail:"Device biometrics (Face ID / Touch ID). Synced via iCloud Keychain or Google Password Manager.", status:"STRONGEST", col:C.violet },
                  { method:"Phone / SMS", icon:"📱", rec:"△ Sim-swap risk", detail:"OTP to phone number. Convenient but vulnerable to SIM swap attacks. Use as secondary only.", status:"SECONDARY", col:C.orange },
                  { method:"Wallet (SIWE)", icon:"◈", rec:"✓ Crypto-native users", detail:"Sign-In with Ethereum using existing MetaMask / hardware wallet. Smart account still created on top.", status:"ADVANCED", col:C.violet },
                ].map(({ method, icon, rec, detail, status, col }) => (
                  <div key={method} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:16 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:18 }}>{icon}</span>
                        <span style={{ fontSize:13, fontWeight:800 }}>{method}</span>
                      </div>
                      <span style={{ fontSize:8, fontWeight:900, letterSpacing:"0.08em", color:col, background:`${col}15`, border:`1px solid ${col}30`, borderRadius:4, padding:"2px 6px" }}>{status}</span>
                    </div>
                    <div style={{ fontSize:11, color:col, fontWeight:700, marginBottom:6 }}>{rec}</div>
                    <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>{detail}</div>
                  </div>
                ))}
              </div>

              <Card accent={`${C.green}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.green, marginBottom:8 }}>DeStore recommendation — link 2+ methods on signup</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.8 }}>
                  Prompt users to link Email + Google (or Email + Apple on iOS) during onboarding. Any one method is sufficient to recover the account — the smart wallet address never changes regardless of which method they use to log back in.
                </div>
              </Card>

              <Sub>ConnectButton Config — DeStore</Sub>
              <div className="code">{`<span class="cb">import</span> { ConnectButton } <span class="cb">from</span> <span class="cs">"thirdweb/react"</span>;
<span class="cb">import</span> { inAppWallet } <span class="cb">from</span> <span class="cs">"thirdweb/wallets"</span>;
<span class="cb">import</span> { base } <span class="cb">from</span> <span class="cs">"thirdweb/chains"</span>;

<span class="cm">// DeStore ConnectButton — email/social + smart account on Base (primary)</span>
<span class="cb">export default function</span> <span class="cw">DeStoreConnect</span>() {
  <span class="cb">return</span> (
    <span class="cp">&lt;ConnectButton</span>
      client={client}
      wallets={[
        <span class="cg">inAppWallet</span>({
          auth: {
            options: [
              <span class="cs">"email"</span>,      <span class="cm">// ← primary</span>
              <span class="cs">"google"</span>,     <span class="cm">// ← recommended secondary</span>
              <span class="cs">"apple"</span>,      <span class="cm">// ← required for iOS</span>
              <span class="cs">"passkey"</span>,    <span class="cm">// ← strongest security</span>
              <span class="cs">"phone"</span>,      <span class="cm">// ← secondary only</span>
            ],
          },
          <span class="cm">// Smart account = the on-chain address</span>
          smartAccount: {
            chain: <span class="cg">base</span>,
            sponsorGas: <span class="cv">true</span>,   <span class="cm">// DeStore pays gas — users never see gas</span>
          },
        }),
      ]}
      theme="dark"
      connectModal={{
        title: <span class="cs">"Sign in to DeStore"</span>,
        titleIcon: <span class="cs">""</span>,
        welcomeScreen: {
          title: <span class="cs">"Circular Trade Infrastructure"</span>,
          subtitle: <span class="cs">"Your account · your ownership records · always recoverable"</span>,
        },
      }}
    <span class="cp">/&gt;</span>
  );
}`}</div>
            </Sec>

            {/* ══ 03 SMART ACCOUNT ══ */}
            <Sec id="smart" n="03" title="Smart Account Setup" sub="ERC-4337 on Base (primary) — the actual wallet address that owns everything" accent={C.green}>

              <div className="grid2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
                {[
                  { title:"Deterministic address", col:C.green, body:"Same wallet address across every EVM chain. Deploy AccountFactory with deterministic flag — the user's address on Soneium = their address on Base, Optimism, etc." },
                  { title:"Gasless by default", col:C.green, body:"DeStore sponsors all gas via Paymaster. Users pay USDC for products — they never hold ETH, never see gas fees. No wallet complexity." },
                  { title:"Session keys", col:C.violet, body:"Backend can be granted limited signing permission without full admin access. Used for n8n automations — transfer DPP, log events — without exposing user keys." },
                  { title:"Pregeneration", col:C.orange, body:"Create a wallet address for a user before they've logged in. Mint DPPs to the address at manufacture — user claims it on first login." },
                ].map(({ title, col, body }) => (
                  <div key={title} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:16 }}>
                    <div style={{ fontSize:12, fontWeight:800, color:col, marginBottom:8 }}>{title}</div>
                    <div style={{ fontSize:12, color:C.dim, lineHeight:1.7 }}>{body}</div>
                  </div>
                ))}
              </div>

              <Sub>Get the smart account address after login</Sub>
              <div className="code">{`<span class="cb">import</span> { useActiveAccount, useActiveWallet } <span class="cb">from</span> <span class="cs">"thirdweb/react"</span>;

<span class="cb">export function</span> <span class="cw">useDeStoreWallet</span>() {
  <span class="cb">const</span> account = <span class="cg">useActiveAccount</span>();
  <span class="cb">const</span> wallet  = <span class="cg">useActiveWallet</span>();

  <span class="cm">// account.address = the ERC-4337 smart account address</span>
  <span class="cm">// This is what goes into DeStore DB as user.walletAddress</span>
  <span class="cm">// This is what DPPs are minted to</span>
  <span class="cm">// This is what receives USDC on purchase</span>

  <span class="cb">return</span> {
    address:     account?.address,         <span class="cm">// smart account</span>
    isConnected: <span class="cv">!!</span>account,
    authMethod:  wallet?.id,               <span class="cm">// "inApp"</span>
  };
}

<span class="cm">// Usage in onboarding — save to DeStore DB on first connect:</span>
<span class="cb">const</span> { address } = <span class="cg">useDeStoreWallet</span>();

<span class="cb">useEffect</span>(() <span class="cb">=&gt;</span> {
  <span class="cb">if</span> (address) {
    <span class="cm">// POST to your n8n webhook or API</span>
    <span class="cg">fetch</span>(<span class="cs">"/api/user/wallet"</span>, {
      method: <span class="cs">"POST"</span>,
      body: <span class="cg">JSON.stringify</span>({ walletAddress: address }),
    });
  }
}, [address]);`}</div>

              <Sub>AccountFactory deploy config</Sub>
              <div className="code">{`<span class="cm">// Deploy once on Base via thirdweb dashboard or CLI</span>
<span class="cm">// Use "Deterministic address" flag ✓</span>
<span class="cm">// Factory address: save this — it never changes</span>

<span class="cm">// thirdweb CLI:</span>
npx thirdweb deploy --contract AccountFactory --chain base

<span class="cm">// Or use thirdweb's pre-deployed factory:</span>
<span class="cm">// thirdweb.eth/AccountFactory — already on most EVM chains</span>

<span class="cm">// In your ConnectButton config you can specify the factory:</span>
<span class="cg">inAppWallet</span>({
  smartAccount: {
    chain: base,
    sponsorGas: <span class="cv">true</span>,
    factoryAddress: <span class="cs">"0xYOUR_FACTORY_ADDRESS"</span>, <span class="cm">// optional — uses thirdweb default if omitted</span>
  }
})`}</div>
            </Sec>

            {/* ══ 04 RECOVERY ══ */}
            <Sec id="recovery" n="04" title="Account Recovery" sub="No seed phrases — recovery is just re-authenticating. The smart account address never changes." accent={C.orange}>

              <Card accent={`${C.green}40`} style={{ marginBottom:24 }}>
                <div style={{ fontSize:13, fontWeight:800, color:C.green, marginBottom:10 }}>The core insight — this is fundamentally different from traditional wallets</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.85 }}>
                  With a traditional EOA (MetaMask etc.), losing your seed phrase = losing your wallet permanently. <br/>
                  With Thirdweb inAppWallet + Smart Account: the smart contract wallet address is deployed on-chain and <strong style={{ color:"white" }}>exists independently of any single auth method</strong>. As long as you can authenticate by any linked method, you regain full control. The address never changes. Your DPPs, USDC balance, and ownership claims are all still there.
                </div>
              </Card>

              <Sub>Recovery Scenarios</Sub>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
                {[
                  { scenario:"Lost access to email", icon:"✉️", col:C.green, steps:["Log in with linked Google or Apple account","Smart account address is the same — all assets intact","Optional: add new email address as additional auth method"] },
                  { scenario:"Lost access to Google account", icon:"G", col:C.green, steps:["Log in with email OTP or Apple Sign-In","Re-link a new Google account from Account Settings","Wallet address unchanged"] },
                  { scenario:"New phone / lost passkey", icon:"🔑", col:C.violet, steps:["Passkeys sync via iCloud Keychain (iOS) or Google Password Manager (Android)","If no sync: log in with email OTP as fallback","Re-register passkey on new device from Account Settings"] },
                  { scenario:"Lost phone (SMS method)", icon:"📱", col:C.orange, steps:["This is why SMS should be secondary, not primary","Log in with email OTP or social","Update phone number in Account Settings","Note: SIM swap attacks are the main risk — never use SMS as sole method"] },
                  { scenario:"Completely locked out (no auth methods work)", icon:"🔒", col:C.pink, steps:["Contact DeStore support with KYC identity verification","DeStore can use Thirdweb Admin API to link a new auth method to the existing wallet","This requires proof of identity — by design, not trivial","Private key is never exposed in this process — enclave maintains security throughout"] },
                ].map(({ scenario, icon, col, steps }) => (
                  <div key={scenario} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:16 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <span style={{ fontSize:16 }}>{icon}</span>
                      <span style={{ fontSize:13, fontWeight:800 }}>{scenario}</span>
                      <SecurityBadge level={col===C.green?"high":col===C.orange?"med":"info"} label={col===C.green?"RECOVERABLE":col===C.orange?"CAUTION":"SUPPORT"}/>
                    </div>
                    {steps.map((s,i) => (
                      <div key={i} style={{ display:"flex", gap:8, fontSize:11, color:C.dim, marginBottom:5 }}>
                        <span style={{ color:col, flexShrink:0, fontWeight:700 }}>{i+1}.</span>{s}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Sub>Link multiple auth methods — do this at onboarding</Sub>
              <div className="code">{`<span class="cm">// After user logs in, prompt them to link a second method</span>
<span class="cm">// This is the most important UX step for account safety</span>

<span class="cb">import</span> { linkProfile } <span class="cb">from</span> <span class="cs">"thirdweb/wallets/in-app"</span>;

<span class="cm">// Link Google to existing email-auth account:</span>
<span class="cb">await</span> <span class="cg">linkProfile</span>({
  client,
  strategy: <span class="cs">"google"</span>,
});

<span class="cm">// Link Apple:</span>
<span class="cb">await</span> <span class="cg">linkProfile</span>({
  client,
  strategy: <span class="cs">"apple"</span>,
});

<span class="cm">// Link passkey (strongest — recommend as 2nd method):</span>
<span class="cb">await</span> <span class="cg">linkProfile</span>({
  client,
  strategy: <span class="cs">"passkey"</span>,
  type: <span class="cs">"sign-up"</span>,  <span class="cm">// creates new passkey on this device</span>
});

<span class="cm">// Get all linked profiles for a user:</span>
<span class="cb">import</span> { getProfiles } <span class="cb">from</span> <span class="cs">"thirdweb/wallets/in-app"</span>;
<span class="cb">const</span> profiles = <span class="cb">await</span> <span class="cg">getProfiles</span>({ client });
<span class="cm">// → [{ type: "email", details: { email: "user@..." } }, { type: "google", ... }]</span>`}</div>
            </Sec>

            {/* ══ 05 SECURITY ══ */}
            <Sec id="security" n="05" title="Security Model" sub="What Thirdweb guarantees · what DeStore adds on top" accent={C.violet}>

              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
                {[
                  { layer:"AWS Nitro Enclave", who:"Thirdweb", col:C.green, badge:"HIGH", points:["Private key generated inside enclave — never leaves","Even Thirdweb employees cannot access keys","Enclave code is open-source and verifiable via cryptographic attestation","All operations (signing, key creation) happen inside the enclave","TLS + HSTS for all enclave communications"] },
                  { layer:"Key storage", who:"Thirdweb", col:C.green, badge:"HIGH", points:["Keys never stored or transmitted unencrypted","AES-256 encryption at rest","No seed phrases ever generated or exposed","Private key export available only to the user via the Connect modal — never programmatically"] },
                  { layer:"Application scoping", who:"Thirdweb", col:C.violet, badge:"IMPORTANT", points:["inAppWallet is scoped per Client ID","Same email on a different app = different wallet","DeStore cannot access wallets created by other apps","Other apps cannot access DeStore user wallets"] },
                  { layer:"DeStore responsibilities", who:"DeStore", col:C.orange, badge:"YOUR JOB", points:["Never expose your Thirdweb Secret Key client-side — server/env only","Use HTTPS everywhere — never HTTP in production","Store wallet addresses in DeStore DB but never store private keys","Validate wallet ownership server-side before any ownership claim transfer","Rate-limit your auth endpoints to prevent brute force"] },
                ].map(({ layer, who, col, badge, points }) => (
                  <div key={layer} style={{ background:C.d2, border:`1px solid ${col}30`, borderRadius:12, padding:18 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:13, fontWeight:800 }}>{layer}</span>
                        <span style={{ fontSize:9, fontWeight:700, color:C.muted }}>— {who}</span>
                      </div>
                      <SecurityBadge level={col===C.green?"high":col===C.orange?"med":"info"} label={badge}/>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      {points.map((p,i) => (
                        <div key={i} style={{ display:"flex", gap:8, fontSize:11, color:C.dim }}>
                          <span style={{ color:col, flexShrink:0 }}>✓</span>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Sub>Environment Variables — what goes where</Sub>
              <div className="code">{`<span class="cm"># .env.local (Next.js) — NEVER commit this file</span>

<span class="cm"># Thirdweb — server-side only (never expose to browser)</span>
<span class="cw">THIRDWEB_SECRET_KEY</span>=<span class="co">sk_...</span>          <span class="cm"># Engine + backend operations</span>

<span class="cm"># Thirdweb — safe to expose to browser (public)</span>
<span class="cw">NEXT_PUBLIC_THIRDWEB_CLIENT_ID</span>=<span class="co">...</span>   <span class="cm"># ConnectButton, frontend SDK</span>

<span class="cm"># DeStore</span>
<span class="cw">NEXT_PUBLIC_SONEIUM_RPC</span>=<span class="co">https://mainnet.base.org</span>
<span class="cw">DESTORE_ACCOUNT_FACTORY</span>=<span class="co">0x...</span>       <span class="cm"># your deployed factory address (server)</span>
<span class="cw">DESTORE_PAYMASTER_URL</span>=<span class="co">https://...</span>    <span class="cm"># Thirdweb bundler/paymaster endpoint</span>

<span class="cm"># NEVER do this — leaks your secret key:</span>
<span class="cm"># NEXT_PUBLIC_THIRDWEB_SECRET_KEY=sk_...  ← WRONG, public prefix exposes it</span>`}</div>
            </Sec>

            {/* ══ 06 PREGENERATION ══ */}
            <Sec id="pregen" n="06" title="Wallet Pregeneration" sub="Mint a DPP to a user's address before they've ever logged in" accent={C.orange}>

              <Card accent={`${C.orange}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.orange, marginBottom:8 }}>Key DeStore use case — mint DPP at manufacture, before consumer account exists</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.8 }}>
                  A brand registers a product. The DPP SBT needs to be minted to an address. The end consumer may not have a DeStore account yet. Use pregeneration — create the wallet address deterministically from their email, mint to it, and when they sign up it's already there.
                </div>
              </Card>

              <div className="code">{`<span class="cm">// Pregenerate a wallet address for a user by email</span>
<span class="cm">// Server-side only — uses Secret Key</span>

<span class="cb">const</span> response = <span class="cb">await</span> <span class="cg">fetch</span>(
  <span class="cs">"https://embedded-wallet.thirdweb.com/api/v1/pregenerate"</span>,
  {
    method: <span class="cs">"POST"</span>,
    headers: {
      <span class="cs">"Content-Type"</span>: <span class="cs">"application/json"</span>,
      <span class="cs">"x-secret-key"</span>: process.env.<span class="cw">THIRDWEB_SECRET_KEY</span>,
    },
    body: <span class="cg">JSON.stringify</span>({
      strategy: <span class="cs">"email"</span>,
      email: <span class="cs">"buyer@example.com"</span>,
    }),
  }
);

<span class="cb">const</span> { walletAddress } = <span class="cb">await</span> response.<span class="cg">json</span>();
<span class="cm">// walletAddress = "0x..." — the smart account address</span>
<span class="cm">// Mint DPP SBT to this address now</span>
<span class="cm">// When user signs up with this email, they automatically own the DPP</span>

<span class="cm">// n8n: HTTP Request node → POST to this endpoint</span>
<span class="cm">// Body: { strategy: "email", email: "{{$json.buyerEmail}}" }</span>
<span class="cm">// Header: x-secret-key from credentials</span>`}</div>
            </Sec>

            {/* ══ 07 SESSION KEYS ══ */}
            <Sec id="session" n="07" title="Session Keys" sub="Let your backend (n8n / Engine) act on behalf of user wallets without holding full admin keys" accent={C.violet}>

              <Card accent={`${C.violet}40`} style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.violet, marginBottom:8 }}>How n8n does ownership transfers without user interaction</div>
                <div style={{ fontSize:12, color:C.dim, lineHeight:1.8 }}>
                  When a buyer pays, your n8n workflow needs to log the transfer on-chain and update the ownership claim — without the user having to sign anything. Session keys give the Engine backend wallet limited signing permission on the smart account. It can execute specific allowed functions but cannot drain the wallet or do anything outside scope.
                </div>
              </Card>

              <div className="code">{`<span class="cm">// Grant session key to Engine backend wallet</span>
<span class="cm">// Call once during account setup — or trigger from n8n post-payment</span>

<span class="cb">import</span> { addSessionKey } <span class="cb">from</span> <span class="cs">"thirdweb/extensions/erc4337"</span>;
<span class="cb">import</span> { sendTransaction } <span class="cb">from</span> <span class="cs">"thirdweb"</span>;

<span class="cb">const</span> transaction = <span class="cg">addSessionKey</span>({
  contract: smartAccountContract,
  account: userAccount,
  sessionKeyAddress: <span class="cs">"0xYOUR_ENGINE_BACKEND_WALLET"</span>,
  permissions: {
    approvedTargets: [
      <span class="cs">"0xDPP_CONTRACT_ADDRESS"</span>,     <span class="cm">// can only interact with DPP contract</span>
      <span class="cs">"0xOWNERSHIP_LOG_CONTRACT"</span>,    <span class="cm">// and ownership event log</span>
    ],
    nativeTokenLimitPerTransaction: <span class="cg">BigInt</span>(<span class="co">0</span>),  <span class="cm">// no ETH spend</span>
    startTimestamp:  <span class="cg">BigInt</span>(<span class="cg">Math</span>.<span class="cg">floor</span>(<span class="cg">Date</span>.<span class="cg">now</span>() / <span class="co">1000</span>)),
    endTimestamp:    <span class="cg">BigInt</span>(<span class="cg">Math</span>.<span class="cg">floor</span>(<span class="cg">Date</span>.<span class="cg">now</span>() / <span class="co">1000</span>) + <span class="co">86400</span> * <span class="co">365</span>),  <span class="cm">// 1yr</span>
  },
});

<span class="cb">await</span> <span class="cg">sendTransaction</span>({ account: userAccount, transaction });

<span class="cm">// Now Engine can call DPP contract on behalf of user</span>
<span class="cm">// without user needing to sign each transfer</span>`}</div>
            </Sec>

            {/* ══ 08 IMPLEMENTATION ══ */}
            <Sec id="impl" n="08" title="Full Implementation" sub="Production-ready setup — copy into your DeStore Next.js app" accent={C.green}>

              <Sub>1 · Install</Sub>
              <div className="code">{`npm install thirdweb`}</div>

              <Sub>2 · Client setup (lib/thirdweb.ts)</Sub>
              <div className="code">{`<span class="cb">import</span> { createThirdwebClient } <span class="cb">from</span> <span class="cs">"thirdweb"</span>;

<span class="cb">export const</span> client = <span class="cg">createThirdwebClient</span>({
  clientId: process.env.<span class="cw">NEXT_PUBLIC_THIRDWEB_CLIENT_ID</span>!,
});

<span class="cm">// Server-side only (API routes, server actions):</span>
<span class="cb">export const</span> serverClient = <span class="cg">createThirdwebClient</span>({
  secretKey: process.env.<span class="cw">THIRDWEB_SECRET_KEY</span>!,
});`}</div>

              <Sub>3 · Providers (app/layout.tsx)</Sub>
              <div className="code">{`<span class="cb">import</span> { ThirdwebProvider } <span class="cb">from</span> <span class="cs">"thirdweb/react"</span>;

<span class="cb">export default function</span> <span class="cw">RootLayout</span>({ children }) {
  <span class="cb">return</span> (
    <span class="cp">&lt;html&gt;</span>
      <span class="cp">&lt;body&gt;</span>
        <span class="cp">&lt;ThirdwebProvider&gt;</span>
          {children}
        <span class="cp">&lt;/ThirdwebProvider&gt;</span>
      <span class="cp">&lt;/body&gt;</span>
    <span class="cp">&lt;/html&gt;</span>
  );
}`}</div>

              <Sub>4 · Auth hook — useDeStoreAuth.ts</Sub>
              <div className="code">{`<span class="cs">"use client"</span>;
<span class="cb">import</span> { useActiveAccount, useActiveWallet, useConnect, useDisconnect } <span class="cb">from</span> <span class="cs">"thirdweb/react"</span>;
<span class="cb">import</span> { inAppWallet } <span class="cb">from</span> <span class="cs">"thirdweb/wallets"</span>;
<span class="cb">import</span> { base } <span class="cb">from</span> <span class="cs">"thirdweb/chains"</span>;
<span class="cb">import</span> { client } <span class="cb">from</span> <span class="cs">"@/lib/thirdweb"</span>;

<span class="cb">export function</span> <span class="cw">useDeStoreAuth</span>() {
  <span class="cb">const</span> account      = <span class="cg">useActiveAccount</span>();
  <span class="cb">const</span> { connect }  = <span class="cg">useConnect</span>();
  <span class="cb">const</span> { disconnect } = <span class="cg">useDisconnect</span>();

  <span class="cb">const</span> <span class="cw">loginWithEmail</span> = <span class="cb">async</span> (email, otp) <span class="cb">=&gt;</span> {
    <span class="cb">await</span> <span class="cg">connect</span>(<span class="cb">async</span> () <span class="cb">=&gt;</span> {
      <span class="cb">const</span> wallet = <span class="cg">inAppWallet</span>({
        smartAccount: { chain: <span class="cg">base</span>, sponsorGas: <span class="cv">true</span> },
      });
      <span class="cb">await</span> wallet.<span class="cg">connect</span>({
        client,
        strategy: <span class="cs">"email"</span>,
        email,
        verificationCode: otp,
      });
      <span class="cb">return</span> wallet;
    });
  };

  <span class="cb">const</span> <span class="cw">sendOtp</span> = <span class="cb">async</span> (email) <span class="cb">=&gt;</span> {
    <span class="cb">const</span> { preAuthenticate } = <span class="cb">await</span> <span class="cg">import</span>(<span class="cs">"thirdweb/wallets/in-app"</span>);
    <span class="cb">await</span> <span class="cg">preAuthenticate</span>({ client, strategy: <span class="cs">"email"</span>, email });
  };

  <span class="cb">return</span> {
    address:     account?.address,   <span class="cm">// smart account address — store this in DB</span>
    isConnected: <span class="cv">!!</span>account,
    sendOtp,
    loginWithEmail,
    logout: () <span class="cb">=&gt;</span> disconnect(<span class="cg">useActiveWallet</span>()),
  };
}`}</div>

              <Sub>5 · Server-side: verify wallet owns DPP before transfer</Sub>
              <div className="code">{`<span class="cm">// app/api/transfer/route.ts</span>
<span class="cb">import</span> { serverClient } <span class="cb">from</span> <span class="cs">"@/lib/thirdweb"</span>;
<span class="cb">import</span> { getContract, readContract } <span class="cb">from</span> <span class="cs">"thirdweb"</span>;
<span class="cb">import</span> { base } <span class="cb">from</span> <span class="cs">"thirdweb/chains"</span>;

<span class="cb">export async function</span> <span class="cw">POST</span>(req) {
  <span class="cb">const</span> { walletAddress, dppTokenId } = <span class="cb">await</span> req.<span class="cg">json</span>();

  <span class="cm">// 1. Verify ownership on-chain before trusting request</span>
  <span class="cb">const</span> dppContract = <span class="cg">getContract</span>({
    client: serverClient,
    chain: <span class="cg">base</span>,
    address: process.env.<span class="cw">DPP_CONTRACT_ADDRESS</span>!,
  });

  <span class="cb">const</span> owner = <span class="cb">await</span> <span class="cg">readContract</span>({
    contract: dppContract,
    method: <span class="cs">"function ownerOf(uint256) returns (address)"</span>,
    params: [<span class="cg">BigInt</span>(dppTokenId)],
  });

  <span class="cb">if</span> (owner.toLowerCase() !== walletAddress.toLowerCase()) {
    <span class="cb">return</span> <span class="cw">Response</span>.<span class="cg">json</span>({ error: <span class="cs">"Not owner"</span> }, { status: <span class="co">403</span> });
  }

  <span class="cm">// 2. Create signed ownership claim in DeStore DB</span>
  <span class="cm">// 3. Trigger n8n webhook for on-chain notary stamp</span>
  <span class="cm">// 4. Deduct $0.01 USDC to B&B Treasury</span>
}`}</div>
            </Sec>

            {/* ══ 09 N8N ══ */}
            <Sec id="n8n" n="09" title="n8n Integration" sub="How Zina and your automation workflows interact with user wallets" accent={C.green}>

              <div className="code">{`<span class="cm">// n8n HTTP Request node — pregenerate wallet for new user</span>
<span class="cm">// Trigger: new brand registers a product in DeStore</span>

<span class="cm">// Node 1: Pregenerate buyer wallet</span>
Method: POST
URL: https://embedded-wallet.thirdweb.com/api/v1/pregenerate
Headers:
  x-secret-key: {{ $env.THIRDWEB_SECRET_KEY }}
  Content-Type: application/json
Body:
  {
    "strategy": "email",
    "email": "{{ $json.buyerEmail }}"
  }

<span class="cm">// Node 2: Use returned walletAddress to mint DPP via Engine</span>
Method: POST
URL: https://engine.thirdweb.com/contract/base/{{ $env.DPP_CONTRACT }}/erc721/mintTo
Headers:
  x-backend-wallet-address: {{ $env.ENGINE_BACKEND_WALLET }}
  x-secret-key: {{ $env.THIRDWEB_SECRET_KEY }}
Body:
  {
    "receiver": "{{ $node['Pregenerate'].json.walletAddress }}",
    "metadataWithSupply": {
      "metadata": {
        "name": "{{ $json.productName }}",
        "description": "Digital Product Passport",
        "attributes": [...]
      },
      "supply": "1"
    }
  }

<span class="cm">// Node 3: Save walletAddress + tokenId to DeStore Google Sheet / DB</span>`}</div>

              <Sub>Post-payment transfer flow</Sub>
              <div className="code">{`<span class="cm">// Thirdweb payment webhook → n8n → ownership transfer</span>

<span class="cm">// 1. Thirdweb sends payment webhook to n8n.flowberry.org/webhook/payment</span>
<span class="cm">// 2. n8n extracts buyerWallet, dppTokenId, sellerWallet, amount</span>
<span class="cm">// 3. Log on-chain notary stamp via Engine:</span>

Method: POST
URL: https://engine.thirdweb.com/contract/base/{{ $env.EVENT_LOG_CONTRACT }}/write
Headers:
  x-backend-wallet-address: {{ $env.ENGINE_BACKEND_WALLET }}
  x-account-address: {{ $json.sellerWallet }}  <span class="cm">// session key pattern</span>
  x-secret-key: {{ $env.THIRDWEB_SECRET_KEY }}
Body:
  {
    "functionName": "logTransfer",
    "args": ["{{ $json.dppTokenId }}", "{{ $json.sellerWallet }}", "{{ $json.buyerWallet }}"]
  }

<span class="cm">// 4. Update DeStore DB ownership claim record</span>
<span class="cm">// 5. Send $0.01 USDC to B&B Treasury wallet</span>
<span class="cm">// 6. Send buyer notification with claim URL</span>`}</div>
            </Sec>

            {/* ══ 10 CHECKLIST ══ */}
            <Sec id="checklist" n="10" title="Launch Checklist" sub="Everything required before DeStore auth goes to production" accent={C.green}>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { cat:"Thirdweb setup", col:C.violet, items:[
                    "Create project in Thirdweb dashboard — get Client ID + Secret Key",
                    "Deploy AccountFactory on Base with deterministic address enabled",
                    "Configure Paymaster policy — set spending limits per user per day",
                    "Enable Bundler on Base in dashboard",
                    "Add production domain to allowed origins in Client ID settings",
                  ]},
                  { cat:"Auth config", col:C.green, items:[
                    "Enable Email, Google, Apple, Passkey in inAppWallet config",
                    "Configure Google OAuth redirect URI in Google Cloud Console",
                    "Configure Apple Sign-In in Apple Developer portal",
                    "Test OTP delivery — check spam filter, configure custom email domain",
                    "Build 'Add backup login method' prompt in onboarding flow",
                  ]},
                  { cat:"Security", col:C.orange, items:[
                    "THIRDWEB_SECRET_KEY is server-side only — never in NEXT_PUBLIC_*",
                    "Rate-limit /api/auth/* endpoints (max 5 OTP requests per email per hour)",
                    "Server-side wallet ownership verification before any transfer",
                    "HTTPS enforced — no HTTP in production",
                    "Webhook signatures verified on all Thirdweb payment webhooks",
                  ]},
                  { cat:"Recovery UX", col:C.pink, items:[
                    "Onboarding step: 'Secure your account — add backup login method'",
                    "Account Settings page: manage linked auth methods",
                    "Support runbook: process for identity-verified manual recovery",
                    "Test all recovery paths: email → Google, Google → email, passkey fallback",
                  ]},
                ].map(({ cat, col, items }) => (
                  <div key={cat} style={{ background:C.d2, border:`1px solid ${col}25`, borderRadius:12, padding:18 }}>
                    <div style={{ fontSize:11, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase", color:col, marginBottom:12 }}>{cat}</div>
                    {items.map((item,i) => (
                      <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                        <div style={{ width:16, height:16, border:`1.5px solid ${C.bdr}`, borderRadius:4, flexShrink:0, marginTop:1 }}/>
                        <span style={{ fontSize:12, color:C.dim, lineHeight:1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ borderTop:`1px solid ${C.bdr}`, marginTop:60, paddingTop:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
                <div>
                  <Logo fill="#ffffff" width={90}/>
                  <div style={{ fontSize:11, color:C.muted, marginTop:8 }}>© DeStore Network · Auth & AA Guide v1.0 · March 2026 · Thirdweb v5 + ERC-4337</div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <Chip color={C.green}>No seed phrases</Chip>
                  <Chip color={C.violet}>AWS Nitro Enclave</Chip>
                  <Chip color={C.orange}>ERC-4337</Chip>
                </div>
              </div>
            </Sec>

          </div>
        </main>
      </div>
    </div>
  );
}
