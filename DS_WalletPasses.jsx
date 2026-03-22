import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   DeAR — Apple Wallet & Google Wallet Pass Spec
   Digital Product Passport ownership pass for physical items
   Covers: pass design, JSON templates, field mapping, server implementation
═══════════════════════════════════════════════════════════════════════ */

const C = {
  d0:"#0a0a0d", d1:"#0d0d10", d2:"#141418", d3:"#1c1c22", d4:"#26262e",
  bdr:"#2e2e38", muted:"#6b6b80", dim:"#9999b0",
  violet:"#B354F1", orchid:"#6A14DB", pink:"#FF1B9A",
  green:"#28B79D", orange:"#FF9F46", blue:"#79b8ff",
};

const Logo = ({ size = 110 }) => {
  const h = size * (76.5 / 405.4);
  return (
    <svg width={size} height={h} viewBox="0 0 405.4 76.5" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
      <path fill="#B354F1" d="M398.1,33.4c-3.2,0-5.8-2.6-5.8-5.8s2.6-5.8,5.8-5.8s5.8,2.6,5.8,5.8S401.3,33.4,398.1,33.4z"/>
      <path fill="#FFFFFF" d="M1.4,2.8h24.1c21.9,0,36.2,15.4,36.2,35.4c0,20.1-14.3,35.3-36.2,35.3H1.4V2.8z M25.6,65.6c17.2,0,27.1-12.3,27.1-27.4c0-15.3-9.6-27.5-27.1-27.5H10.2v55H25.6z"/>
      <path fill="#FFFFFF" d="M97.5,21.1c15.5,0,24.6,12.1,24.6,27.4v2H80.6c0.6,9.6,7.4,17.7,18.4,17.7c5.8,0,11.8-2.3,15.8-6.5l3.8,5.2c-5.1,5.1-12,7.8-20.3,7.8c-15.1,0-26.1-10.9-26.1-26.9C72.3,33,82.8,21.1,97.5,21.1z M80.6,44.7h33.6c-0.1-7.6-5.2-17.1-16.8-17.1C86.4,27.6,81,36.8,80.6,44.7z"/>
      <path fill="#FFFFFF" d="M137.8,49.9c5.1,5.1,12.9,9.3,22.6,9.3c6.2,0,10.1-2.6,10.1-6c0-4-4.6-5.6-12.1-7.2c-11.6-2.3-28-5.3-28-22c0-11.9,10.1-22.1,28.2-22.1c11.3,0,21.2,3.4,28.7,9.8l-10,13c-5.9-4.9-13.7-7.3-19.9-7.3c-6,0-8.4,2.4-8.4,5.5c0,3.7,4.3,5,12.2,6.5c11.6,2.4,27.7,5.8,27.7,21.8c0,14.2-10.5,23.6-29.4,23.6c-14.3,0-24.3-4.4-31.3-11.2L137.8,49.9z"/>
      <path fill="#FFFFFF" d="M199.9,59.7V36.5h-8.5V22.3h8.5v-14h16.2v14h10.4v14.2h-10.4v18.6c0,3,1.7,5.2,4.6,5.2c1.8,0,3.6-0.6,4.1-1.3l3.2,12.3c-2,1.9-6,3.4-12.1,3.4C205.5,74.8,199.9,69.6,199.9,59.7z"/>
      <path fill="#FFFFFF" d="M231.2,47.9c0-14.4,10.5-26.8,27.9-26.8c17.6,0,28,12.4,28,26.8s-10.4,26.9-28,26.9C241.7,74.8,231.2,62.3,231.2,47.9z M270.3,47.9c0-6.8-4-12.4-11.2-12.4c-7.1,0-11,5.6-11,12.4c0,6.9,3.9,12.5,11,12.5C266.3,60.3,270.3,54.7,270.3,47.9z"/>
      <path fill="#FFFFFF" d="M295.6,22.3h16.3v6.5c3.4-4.1,9.8-7.7,16-7.7v15.8c-1-0.3-2.3-0.5-4-0.5c-4.2,0-9.8,1.8-12,4.8v32.4h-16.3V22.3z"/>
      <path fill="#FFFFFF" d="M359.1,21.1c15.1,0,26.2,11.1,26.2,28.5V53h-36.4c1,4.8,5.4,9.1,13,9.1c4.6,0,9.6-1.8,12.5-4.3l6.9,10.2c-5.1,4.6-13.6,6.8-21.4,6.8c-15.8,0-28-10.3-28-26.9C331.9,33,343.1,21.1,359.1,21.1z M348.6,42.5h21.1c-0.4-3.6-3.1-8.8-10.6-8.8C352,33.7,349.3,38.7,348.6,42.5z"/>
    </svg>
  );
};

/* ── Code block ─────────────────────────────────────────────────── */
function Code({ children, lang = "json" }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position:"relative", marginBottom:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        background:"#060608", borderRadius:"12px 12px 0 0",
        padding:"8px 16px", borderBottom:`1px solid ${C.bdr}` }}>
        <span style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.08em",
          textTransform:"uppercase" }}>{lang}</span>
        <button onClick={() => { navigator.clipboard?.writeText(children); setCopied(true); setTimeout(()=>setCopied(false),1800); }}
          style={{ fontSize:10, fontWeight:700, color:copied?C.green:C.muted, background:"none",
            border:"none", cursor:"pointer", fontFamily:"inherit", transition:"color .2s" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ background:"#060608", border:`1px solid ${C.bdr}`, borderTop:"none",
        borderRadius:"0 0 12px 12px", padding:"16px 20px",
        fontFamily:"'JetBrains Mono',monospace", fontSize:11.5, lineHeight:1.85,
        overflowX:"auto", color:"#9999b0", margin:0, whiteSpace:"pre" }}>
        {children}
      </pre>
    </div>
  );
}

function Sec({ title, sub, children, accent = C.violet }) {
  return (
    <div style={{ marginBottom:60 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
        <div style={{ height:1, width:32, background:`linear-gradient(90deg,${accent},transparent)` }}/>
      </div>
      <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.5px", marginBottom:6 }}>{title}</h2>
      {sub && <p style={{ fontSize:13, color:C.dim, lineHeight:1.7, marginBottom:24, maxWidth:620 }}>{sub}</p>}
      {!sub && <div style={{ marginBottom:24 }}/>}
      {children}
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <span style={{ fontSize:10, fontWeight:800, color, background:`${color}18`,
      border:`1px solid ${color}40`, borderRadius:4, padding:"2px 8px",
      letterSpacing:"0.06em", textTransform:"uppercase", display:"inline-block" }}>
      {children}
    </span>
  );
}

/* ── Apple Wallet Pass Preview ───────────────────────────────────── */
function ApplePassPreview({ product }) {
  return (
    <div style={{ width:320, borderRadius:20, overflow:"hidden",
      boxShadow:"0 32px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08)",
      fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      position:"relative" }}>

      {/* Header strip — DeStore violet */}
      <div style={{ background:`linear-gradient(135deg, #321B68 0%, #6A14DB 50%, #B354F1 100%)`,
        padding:"18px 20px 14px", position:"relative", overflow:"hidden" }}>
        {/* Shimmer sweep */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%)", pointerEvents:"none" }}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <Logo size={90}/>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.6)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>DPP Wallet</div>
            <div style={{ fontSize:11, fontWeight:800, color:"#fff" }}>◈ Verified</div>
          </div>
        </div>
      </div>

      {/* Product image strip */}
      <div style={{ height:140, background:"#111", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.8))" }}/>
        <div style={{ position:"absolute", bottom:12, left:16, right:16,
          display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,.5)", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:2 }}>{product.brand}</div>
            <div style={{ fontSize:15, fontWeight:800, color:"#fff", letterSpacing:"-0.2px", lineHeight:1.2 }}>{product.name}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:9, color:"rgba(255,255,255,.5)", fontWeight:700, letterSpacing:"0.06em", marginBottom:2 }}>VALUE</div>
            <div style={{ fontSize:16, fontWeight:900, color:"#fff" }}>${product.price}</div>
          </div>
        </div>
        {/* Placeholder image bg */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#1c1c22,#141418)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:-1 }}>
          <div style={{ fontSize:48, opacity:.15 }}>{product.emoji}</div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ background:"#f5f5f7", padding:"14px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:14 }}>
          {[
            { label:"DPP ID", value: product.sku },
            { label:"Origin", value: product.origin },
            { label:"Carbon", value: product.carbon },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize:8, fontWeight:700, color:"#8e8e93", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{f.label}</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#1c1c1e" }}>{f.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          {[
            { label:"Material", value: product.material },
            { label:"Status", value: product.status },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize:8, fontWeight:700, color:"#8e8e93", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{f.label}</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#1c1c1e" }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Barcode */}
      <div style={{ background:"#f5f5f7", padding:"0 16px 18px",
        display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        <div style={{ width:"100%", height:1, background:"rgba(0,0,0,.08)", marginBottom:8 }}/>
        {/* QR placeholder */}
        <div style={{ width:72, height:72, background:"#fff", borderRadius:8, padding:6,
          boxShadow:"0 2px 8px rgba(0,0,0,.12)", display:"grid",
          gridTemplateColumns:"repeat(7,1fr)", gap:1.5 }}>
          {Array(49).fill(0).map((_,i) => {
            const on = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,48].includes(i%49) || Math.random()>0.6;
            return <div key={i} style={{ background: on?"#1c1c1e":"transparent", borderRadius:1 }}/>;
          })}
        </div>
        <div style={{ fontSize:9, color:"#8e8e93", fontWeight:600, letterSpacing:"0.05em" }}>{product.sku} · Base Chain 8453</div>
      </div>
    </div>
  );
}

/* ── Google Wallet Pass Preview ──────────────────────────────────── */
function GooglePassPreview({ product }) {
  return (
    <div style={{ width:320, borderRadius:16, overflow:"hidden",
      boxShadow:"0 8px 32px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06)",
      fontFamily:"'Google Sans', 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,#321B68,#B354F1)`,
        padding:"20px 20px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Logo size={85}/>
          <div style={{ background:"rgba(255,255,255,.15)", borderRadius:20,
            padding:"4px 10px", fontSize:10, fontWeight:700, color:"#fff",
            border:"1px solid rgba(255,255,255,.25)" }}>
            ◈ DPP
          </div>
        </div>
      </div>

      {/* Hero row */}
      <div style={{ background:"#1a1a2e", padding:"16px 20px",
        display:"flex", gap:14, alignItems:"center" }}>
        <div style={{ width:56, height:56, borderRadius:12,
          background:"linear-gradient(135deg,#26262e,#1c1c22)",
          border:"1px solid rgba(255,255,255,.08)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>
          {product.emoji}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.45)", fontWeight:700,
            letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>{product.brand}</div>
          <div style={{ fontSize:14, fontWeight:700, color:"#fff", lineHeight:1.25,
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{product.name}</div>
          <div style={{ fontSize:11, color:C.green, marginTop:3, fontWeight:600 }}>Owned · {product.acquired}</div>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginBottom:2 }}>VALUE</div>
          <div style={{ fontSize:18, fontWeight:900, color:"#fff" }}>${product.price}</div>
        </div>
      </div>

      {/* Info rows */}
      <div style={{ background:"#16162a", padding:"0 20px" }}>
        {[
          ["DPP ID", product.sku, C.violet],
          ["Material", product.material, C.dim],
          ["Origin", product.origin, C.dim],
          ["Carbon", product.carbon, C.green],
        ].map(([label, value, col]) => (
          <div key={label} style={{ display:"flex", justifyContent:"space-between",
            padding:"10px 0", borderBottom:`1px solid rgba(255,255,255,.05)` }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontWeight:600 }}>{label}</span>
            <span style={{ fontSize:11, fontWeight:700, color: col }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ background:"#16162a", padding:"12px 20px 16px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[["Sell","#28B79D"],["Gift","#B354F1"]].map(([label,col]) => (
            <button key={label} style={{ background:`${col}18`, border:`1px solid ${col}40`,
              borderRadius:10, padding:"8px 0", fontSize:11, fontWeight:800,
              color:col, cursor:"pointer", fontFamily:"inherit" }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Barcode footer */}
      <div style={{ background:"#fff", padding:"12px 20px",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:8, color:"#8e8e93", fontWeight:700, textTransform:"uppercase", marginBottom:2 }}>Scan to verify ownership</div>
          <div style={{ fontSize:10, fontWeight:800, color:"#1c1c1e" }}>{product.sku}</div>
        </div>
        <div style={{ width:52, height:52, background:"#f5f5f7", borderRadius:6, padding:4,
          display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:1.5 }}>
          {Array(36).fill(0).map((_,i) => (
            <div key={i} style={{ background: Math.random()>0.45?"#1c1c1e":"transparent", borderRadius:1 }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main App ────────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState("apple");
  const [activeSection, setActiveSection] = useState("overview");

  const product = {
    brand:"Arc'teryx", name:"Beta AR Jacket", sku:"DPP-00265",
    price:780, acquired:"28 Feb 2026", status:"Owned",
    material:"Gore-Tex Pro 3L", origin:"Canada", carbon:"22.1kg CO₂e",
    emoji:"🏔️",
  };

  const NAV = [
    { id:"overview",  label:"Overview" },
    { id:"apple",     label:"Apple Wallet" },
    { id:"google",    label:"Google Wallet" },
    { id:"fields",    label:"Field Mapping" },
    { id:"server",    label:"Server Setup" },
    { id:"n8n",       label:"n8n Flow" },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <div style={{ minHeight:"100vh", background:C.d0, color:"#fff",
      fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0a0a0d}
        ::-webkit-scrollbar-thumb{background:#2e2e38;border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes spin-border{to{--angle:360deg}}
        @property --angle{syntax:'<angle>';initial-value:0deg;inherits:false}
      `}</style>

      {/* TOPBAR */}
      <div style={{ position:"sticky", top:0, zIndex:300,
        background:`${C.d1}f0`, backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.bdr}` }}>
        <div style={{ padding:"0 24px", height:52,
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <Logo size={90}/>
            <div style={{ width:1, height:22, background:C.bdr }}/>
            <span style={{ fontSize:12, fontWeight:700, color:C.dim }}>Wallet Pass Spec</span>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <Tag color={C.green}>Apple Wallet</Tag>
            <Tag color={C.blue}>Google Wallet</Tag>
          </div>
        </div>
        <div style={{ height:2, background:`linear-gradient(90deg,${C.violet},${C.orchid},transparent)` }}/>
      </div>

      <div style={{ display:"flex" }}>
        {/* SIDEBAR */}
        <aside style={{ width:200, flexShrink:0, position:"sticky", top:52,
          height:"calc(100vh - 52px)", overflowY:"auto",
          background:C.d1, borderRight:`1px solid ${C.bdr}`, paddingTop:24, paddingBottom:40 }}>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
            color:C.muted, padding:"0 18px 12px" }}>Sections</div>
          {NAV.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              style={{ display:"flex", alignItems:"center", gap:8,
                padding:"8px 18px", fontSize:12, fontWeight:600,
                color: activeSection===n.id ? C.violet : C.muted,
                cursor:"pointer", border:"none",
                borderLeft: `2px solid ${activeSection===n.id ? C.violet : "transparent"}`,
                background: activeSection===n.id ? `${C.violet}10` : "transparent",
                width:"100%", textAlign:"left", fontFamily:"inherit", transition:"all .14s" }}>
              <div style={{ width:5, height:5, borderRadius:"50%",
                background: activeSection===n.id ? C.violet : C.bdr,
                boxShadow: activeSection===n.id ? `0 0 7px ${C.violet}` : "none",
                transition:"all .14s" }}/>
              {n.label}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main style={{ flex:1, overflowY:"auto", height:"calc(100vh - 52px)",
          padding:"52px 56px 120px" }}
          onScroll={e => {
            for (let i = NAV.length-1; i >= 0; i--) {
              const el = document.getElementById(NAV[i].id);
              if (el && el.getBoundingClientRect().top < 140) {
                setActiveSection(NAV[i].id); break;
              }
            }
          }}>

          {/* ── OVERVIEW ── */}
          <div id="overview">
            <Sec title="DeAR — Apple & Google Wallet Passes"
              sub="Every DPP-verified product generates a native wallet pass. Users tap once to add their ownership certificate to Apple Wallet or Google Wallet. No app required. No crypto UX. The pass is the proof.">

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:32 }}>
                {[
                  { platform:"Apple Wallet", format:".pkpass (JSON + assets)", trigger:"Email CTA / NFC / QR", fields:"Generic Pass · storeCard type", bg:`${C.green}10`, border:C.green, icon:"🍎" },
                  { platform:"Google Wallet", format:"JWT-signed Object", trigger:"Email CTA / Deep link", fields:"Generic Loyalty Object", bg:`${C.blue}10`, border:C.blue, icon:"🤖" },
                ].map(p => (
                  <div key={p.platform} style={{ background:p.bg, border:`1px solid ${p.border}30`,
                    borderRadius:14, padding:"20px 22px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                      <span style={{ fontSize:22 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>{p.platform}</div>
                        <div style={{ fontSize:11, color:C.dim }}>Supported from iOS 6+ / Android 5+</div>
                      </div>
                    </div>
                    {[["Format",p.format],["Trigger",p.trigger],["Pass type",p.fields]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between",
                        padding:"6px 0", borderBottom:`1px solid rgba(255,255,255,.05)` }}>
                        <span style={{ fontSize:11, color:C.muted }}>{k}</span>
                        <span style={{ fontSize:11, fontWeight:700, color:C.dim }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Flow overview */}
              <div style={{ background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:14, padding:"18px 22px" }}>
                <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                  textTransform:"uppercase", marginBottom:14 }}>Trigger flow — pass delivery on DPP purchase</div>
                <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"wrap", rowGap:10 }}>
                  {[
                    ["USDC payment confirmed","#FF9F46"],
                    ["Thirdweb webhook","#B354F1"],
                    ["n8n flow triggered","#B354F1"],
                    ["Ownership claim created","#28B79D"],
                    [".pkpass generated","#2FB457"],
                    ["JWT signed","#79b8ff"],
                    ["Email sent to buyer","#28B79D"],
                  ].map(([label,col],i,arr) => (
                    <div key={label} style={{ display:"flex", alignItems:"center" }}>
                      <div style={{ background:`${col}15`, border:`1px solid ${col}35`,
                        borderRadius:8, padding:"6px 10px", fontSize:10, fontWeight:700,
                        color:col, whiteSpace:"nowrap" }}>{label}</div>
                      {i < arr.length-1 && <span style={{ color:C.muted, padding:"0 6px", fontSize:14 }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </Sec>
          </div>

          {/* ── APPLE WALLET ── */}
          <div id="apple">
            <Sec title="Apple Wallet — .pkpass" accent={C.green}
              sub="A .pkpass is a signed ZIP bundle: pass.json + icon.png + logo.png + strip.png. Signed with your Apple Developer certificate. Delivered as an email attachment or via HTTPS link.">

              <div style={{ display:"flex", gap:32, alignItems:"flex-start", marginBottom:32, flexWrap:"wrap" }}>
                <div style={{ flexShrink:0 }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:12 }}>Pass preview</div>
                  <ApplePassPreview product={product}/>
                </div>

                <div style={{ flex:1, minWidth:280 }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:12 }}>pass.json structure</div>

                  <Code lang="json">{`{
  "passTypeIdentifier": "pass.network.destore.dpp",
  "formatVersion": 1,
  "teamIdentifier": "YOUR_TEAM_ID",
  "organizationName": "DeStore Network",
  "description": "DPP Ownership Pass",
  "serialNumber": "DPP-00265",
  "webServiceURL": "https://app.destore.network/api/passes/",
  "authenticationToken": "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",

  "backgroundColor": "rgb(50,27,104)",
  "foregroundColor": "rgb(255,255,255)",
  "labelColor": "rgb(179,84,241)",

  "storeCard": {
    "headerFields": [
      { "key": "brand", "label": "BRAND",
        "value": "Arc'teryx", "textAlignment": "PKTextAlignmentLeft" }
    ],
    "primaryFields": [
      { "key": "product", "label": "PRODUCT",
        "value": "Beta AR Jacket" }
    ],
    "secondaryFields": [
      { "key": "dppId",  "label": "DPP ID",  "value": "DPP-00265" },
      { "key": "value",  "label": "VALUE",   "value": "$780" }
    ],
    "auxiliaryFields": [
      { "key": "material","label": "MATERIAL","value": "Gore-Tex Pro 3L" },
      { "key": "origin",  "label": "ORIGIN",  "value": "Canada" },
      { "key": "carbon",  "label": "CARBON",  "value": "22.1kg CO2e" }
    ],
    "backFields": [
      { "key": "ownershipUrl", "label": "Ownership Claim URL",
        "value": "https://app.destore.network/claim/DPP-00265" },
      { "key": "tokenId",      "label": "Base Token ID",
        "value": "265" },
      { "key": "chain",        "label": "Chain",
        "value": "Base (8453)" },
      { "key": "arweave",      "label": "Permanent Record",
        "value": "https://arweave.net/..." },
      { "key": "sell", "label": "Sell", "attributedValue":
        "<a href='https://app.destore.network/sell/DPP-00265'>List on DeStore</a>" },
      { "key": "recycle", "label": "Recycle",
        "attributedValue": "<a href='https://app.destore.network/recycle/DPP-00265'>Find drop-off</a>" }
    ]
  },

  "barcode": {
    "format": "PKBarcodeFormatQR",
    "message": "https://app.destore.network/dpp/265",
    "messageEncoding": "iso-8859-1",
    "altText": "DPP-00265"
  }
}`}</Code>
                </div>
              </div>

              {/* .pkpass bundle */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                  textTransform:"uppercase", marginBottom:12 }}>.pkpass file structure</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { file:"pass.json",          size:"~2kb",    desc:"Pass fields, colours, barcode",          col:C.violet },
                    { file:"icon.png",           size:"29×29px", desc:"Required. DeStore mark at 1x/2x/3x",     col:C.green },
                    { file:"logo.png",           size:"160×50px",desc:"DeStore logo — appears in header",        col:C.green },
                    { file:"strip.png",          size:"320×123px",desc:"Hero product image (optional)",          col:C.orange },
                    { file:"manifest.json",      size:"auto",    desc:"SHA1 hashes of all bundle files",         col:C.muted },
                    { file:"signature",          size:"binary",  desc:"PKCS#7 detached sig from Apple cert",     col:C.pink },
                  ].map(f => (
                    <div key={f.file} style={{ background:C.d3, border:`1px solid ${f.col}25`,
                      borderRadius:9, padding:"10px 12px" }}>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11,
                        fontWeight:700, color:f.col, marginBottom:4 }}>{f.file}</div>
                      <div style={{ fontSize:9, fontWeight:800, color:C.muted, marginBottom:3 }}>{f.size}</div>
                      <div style={{ fontSize:10, color:C.dim, lineHeight:1.5 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Node signing code */}
              <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                textTransform:"uppercase", marginBottom:12 }}>Node.js — sign and serve pass</div>
              <Code lang="javascript">{`import passkit from 'passkit-generator';
import path from 'path';

export async function generateApplePass(dppData) {
  const pass = await passkit.PKPass.from({
    model: path.resolve('./pass-templates/destore-dpp.pass'),
    certificates: {
      wwdr:       process.env.APPLE_WWDR_CERT,       // Apple WWDR G4
      signerCert: process.env.APPLE_SIGNER_CERT,     // Your pass cert (.pem)
      signerKey:  process.env.APPLE_SIGNER_KEY,      // Private key (.pem)
      signerKeyPassphrase: process.env.APPLE_KEY_PASS,
    },
  }, {
    // Override pass.json fields per product
    serialNumber:   dppData.sku,
    description:    \`\${dppData.brand} \${dppData.name} — DPP Ownership Pass\`,
    authenticationToken: generateSecureToken(),

    storeCard: {
      primaryFields:   [{ key:"product", label:"PRODUCT", value: dppData.name }],
      secondaryFields: [
        { key:"dppId", label:"DPP ID", value: dppData.sku },
        { key:"value", label:"VALUE",  value: \`$\${dppData.price}\` },
      ],
      auxiliaryFields: [
        { key:"material", label:"MATERIAL", value: dppData.material },
        { key:"origin",   label:"ORIGIN",   value: dppData.origin },
        { key:"carbon",   label:"CARBON",   value: dppData.carbon },
      ],
      backFields: [
        { key:"ownershipUrl", label:"Ownership Claim",
          value: \`https://app.destore.network/claim/\${dppData.sku}\` },
        { key:"chain", label:"On-chain Record",
          value: \`Base Token ID: \${dppData.tokenId}\` },
      ],
    },

    barcode: {
      format: "PKBarcodeFormatQR",
      message: \`https://app.destore.network/dpp/\${dppData.tokenId}\`,
      messageEncoding: "iso-8859-1",
    },
  });

  // Optionally swap in real product image
  if (dppData.imageBuffer) {
    pass.addBuffer('strip.png', dppData.imageBuffer);
  }

  const buffer = await pass.getAsBuffer(); // signed .pkpass
  return buffer;
}

// API route — n8n calls this after payment confirmed
// POST /api/passes/apple  { dppData }
export async function POST(req) {
  const dppData = await req.json();
  const buffer = await generateApplePass(dppData);
  return new Response(buffer, {
    headers: {
      'Content-Type':        'application/vnd.apple.pkpass',
      'Content-Disposition': \`attachment; filename="destore-\${dppData.sku}.pkpass"\`,
    }
  });
}`}</Code>
            </Sec>
          </div>

          {/* ── GOOGLE WALLET ── */}
          <div id="google">
            <Sec title="Google Wallet — JWT Pass Object" accent={C.blue}
              sub="Google Wallet passes are JSON objects signed with a service account JWT and delivered via a save link. No app bundle. Tap the link to add to Google Wallet on Android or Chrome.">

              <div style={{ display:"flex", gap:32, alignItems:"flex-start", marginBottom:32, flexWrap:"wrap" }}>
                <div style={{ flexShrink:0 }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:12 }}>Pass preview</div>
                  <GooglePassPreview product={product}/>
                </div>

                <div style={{ flex:1, minWidth:280 }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:12 }}>Pass object JSON</div>
                  <Code lang="json">{`{
  "id": "ISSUER_ID.DPP-00265",
  "classId": "ISSUER_ID.destore_dpp_class",
  "genericType": "GENERIC_TYPE_UNSPECIFIED",
  "cardTitle": {
    "defaultValue": { "language": "en-US", "value": "DeStore DPP Wallet" }
  },
  "header": {
    "defaultValue": { "language": "en-US", "value": "Beta AR Jacket" }
  },
  "subheader": {
    "defaultValue": { "language": "en-US", "value": "Arc'teryx · DPP-00265" }
  },
  "logo": {
    "sourceUri": { "uri": "https://app.destore.network/assets/logo-white.png" }
  },
  "heroImage": {
    "sourceUri": { "uri": "https://app.destore.network/assets/dpp/DPP-00265.jpg" }
  },
  "hexBackgroundColor": "#321B68",
  "barcode": {
    "type": "QR_CODE",
    "value": "https://app.destore.network/dpp/265",
    "alternateText": "DPP-00265"
  },
  "textModulesData": [
    { "id": "dppId",    "header": "DPP ID",    "body": "DPP-00265" },
    { "id": "material", "header": "MATERIAL",  "body": "Gore-Tex Pro 3L" },
    { "id": "origin",   "header": "ORIGIN",    "body": "Canada" },
    { "id": "carbon",   "header": "CARBON",    "body": "22.1kg CO2e" },
    { "id": "value",    "header": "VALUE",     "body": "$780" }
  ],
  "linksModuleData": {
    "uris": [
      { "uri": "https://app.destore.network/sell/DPP-00265",
        "description": "Sell on DeStore", "id": "sell" },
      { "uri": "https://app.destore.network/claim/DPP-00265",
        "description": "View Ownership Claim", "id": "claim" },
      { "uri": "https://app.destore.network/recycle/DPP-00265",
        "description": "Recycle", "id": "recycle" }
    ]
  },
  "state": "ACTIVE",
  "validTimeInterval": {
    "start": { "date": "2026-02-28T00:00:00Z" }
  }
}`}</Code>
                </div>
              </div>

              <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                textTransform:"uppercase", marginBottom:12 }}>Node.js — sign JWT and return save link</div>
              <Code lang="javascript">{`import { GoogleAuth } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID;
const CLASS_ID  = \`\${ISSUER_ID}.destore_dpp_class\`;
const KEY_FILE  = process.env.GOOGLE_SERVICE_ACCOUNT_KEY; // path to JSON key file

export async function generateGooglePassLink(dppData) {
  const objectId = \`\${ISSUER_ID}.\${dppData.sku}\`;

  // 1. Upsert the class (do this once, not per pass)
  await upsertPassClass();

  // 2. Build the pass object
  const passObject = {
    id: objectId,
    classId: CLASS_ID,
    genericType: 'GENERIC_TYPE_UNSPECIFIED',
    cardTitle: { defaultValue: { language:'en-US', value:'DeStore DPP Wallet' } },
    header:    { defaultValue: { language:'en-US', value: dppData.name } },
    subheader: { defaultValue: { language:'en-US', value: \`\${dppData.brand} · \${dppData.sku}\` } },
    hexBackgroundColor: '#321B68',
    barcode: {
      type: 'QR_CODE',
      value: \`https://app.destore.network/dpp/\${dppData.tokenId}\`,
      alternateText: dppData.sku,
    },
    textModulesData: [
      { id:'material', header:'MATERIAL', body: dppData.material },
      { id:'origin',   header:'ORIGIN',   body: dppData.origin },
      { id:'carbon',   header:'CARBON',   body: dppData.carbon },
      { id:'value',    header:'VALUE',    body: \`$\${dppData.price}\` },
    ],
    linksModuleData: { uris: [
      { uri: \`https://app.destore.network/sell/\${dppData.sku}\`,
        description: 'Sell on DeStore', id: 'sell' },
      { uri: \`https://app.destore.network/claim/\${dppData.sku}\`,
        description: 'View Ownership Claim', id: 'claim' },
    ]},
    state: 'ACTIVE',
  };

  // 3. Sign the JWT with service account
  const claims = {
    iss: JSON.parse(fs.readFileSync(KEY_FILE)).client_email,
    aud: 'google',
    origins: ['app.destore.network'],
    typ: 'savetowallet',
    payload: { genericObjects: [passObject] },
  };

  const token = jwt.sign(claims,
    JSON.parse(fs.readFileSync(KEY_FILE)).private_key,
    { algorithm: 'RS256' }
  );

  // 4. Return the save link — send this in email / show as button
  return \`https://pay.google.com/gp/v/save/\${token}\`;
}`}</Code>
            </Sec>
          </div>

          {/* ── FIELD MAPPING ── */}
          <div id="fields">
            <Sec title="DPP → Pass Field Mapping" accent={C.orange}
              sub="How each DPP metadata field maps to Apple and Google pass fields. All data comes from the SBT metadata via GET /api/dpp/{tokenId}.">

              <div style={{ background:C.d2, border:`1px solid ${C.bdr}`, borderRadius:12, overflow:"hidden", marginBottom:24 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr",
                  gap:0, borderBottom:`1px solid ${C.bdr}` }}>
                  {["DPP Field","Source","Apple Wallet","Google Wallet"].map((h,i) => (
                    <div key={h} style={{ padding:"10px 14px", fontSize:9, fontWeight:900,
                      color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase",
                      borderRight: i<3 ? `1px solid ${C.bdr}` : "none" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["product.name",     "SBT metadata",       "primaryFields.value",     "header.defaultValue"],
                  ["product.brand",    "SBT metadata",       "headerFields.value",      "subheader (prefix)"],
                  ["sku / DPP ID",     "DB listing record",  "secondaryFields[0]",      "textModulesData[0]"],
                  ["price / value",    "DB listing record",  "secondaryFields[1]",      "textModulesData[4]"],
                  ["material",         "SBT attributes",     "auxiliaryFields[0]",      "textModulesData[0]"],
                  ["origin",           "SBT attributes",     "auxiliaryFields[1]",      "textModulesData[1]"],
                  ["carbon",           "SBT attributes",     "auxiliaryFields[2]",      "textModulesData[2]"],
                  ["tokenId (Base)",   "Thirdweb mint tx",   "backFields — chain",      "barcode.value"],
                  ["ownership URL",    "Generated on claim", "backFields — claim link", "linksModuleData"],
                  ["product image",    "Google Drive/Arweave","strip.png buffer",       "heroImage.sourceUri"],
                ].map(([field,src,apple,google],i) => (
                  <div key={field} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr",
                    borderBottom: i<9 ? `1px solid ${C.bdr}28` : "none" }}>
                    <div style={{ padding:"9px 14px", fontSize:11, fontWeight:700,
                      color:"#e0e0f0", fontFamily:"'JetBrains Mono',monospace", borderRight:`1px solid ${C.bdr}28` }}>{field}</div>
                    <div style={{ padding:"9px 14px", fontSize:11, color:C.dim, borderRight:`1px solid ${C.bdr}28` }}>{src}</div>
                    <div style={{ padding:"9px 14px", fontSize:11, color:C.green, fontFamily:"'JetBrains Mono',monospace", fontSize:10, borderRight:`1px solid ${C.bdr}28` }}>{apple}</div>
                    <div style={{ padding:"9px 14px", fontSize:10, color:C.blue, fontFamily:"'JetBrains Mono',monospace" }}>{google}</div>
                  </div>
                ))}
              </div>
            </Sec>
          </div>

          {/* ── SERVER SETUP ── */}
          <div id="server">
            <Sec title="Server Setup & Env Vars" accent={C.pink}
              sub="Everything needed to sign and serve both pass types from the DeStore Next.js app.">

              <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                textTransform:"uppercase", marginBottom:12 }}>Install dependencies</div>
              <Code lang="bash">{`# Apple Wallet pass generator
npm install passkit-generator

# Google Wallet (service account auth + JWT)
npm install google-auth-library jsonwebtoken`}</Code>

              <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                textTransform:"uppercase", marginBottom:12 }}>Environment variables</div>
              <Code lang="bash">{`# Apple Wallet — all server-only, never expose to client
APPLE_WWDR_CERT="-----BEGIN CERTIFICATE-----..."       # Apple WWDR G4 cert
APPLE_SIGNER_CERT="-----BEGIN CERTIFICATE-----..."     # Your Pass Type ID cert
APPLE_SIGNER_KEY="-----BEGIN RSA PRIVATE KEY-----..."  # Private key for cert
APPLE_KEY_PASS="your-passphrase"                       # Cert passphrase (if set)
APPLE_PASS_TYPE_ID="pass.network.destore.dpp"          # Your Pass Type Identifier
APPLE_TEAM_ID="YOUR10CHARID"                           # Apple Developer Team ID

# Google Wallet — all server-only
GOOGLE_WALLET_ISSUER_ID="3388000000012345678"          # From Google Pay Business Console
GOOGLE_SERVICE_ACCOUNT_KEY="/path/to/service-key.json" # Service account JSON key
GOOGLE_WALLET_CLASS_ID="destore_dpp_class"             # Pre-created pass class`}</Code>

              <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.1em",
                textTransform:"uppercase", marginBottom:12 }}>Required setup steps</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { n:"01", title:"Apple: Create Pass Type ID", desc:"In Apple Developer portal → Certificates → Pass Type IDs. Create 'pass.network.destore.dpp'. Download and export the certificate + private key as PEM files.", col:C.green },
                  { n:"02", title:"Apple: Download WWDR G4 cert", desc:"Download Apple Worldwide Developer Relations G4 certificate from developer.apple.com/certificationauthority. Add to your server env.", col:C.green },
                  { n:"03", title:"Apple: Build pass template folder", desc:"Create /pass-templates/destore-dpp.pass/ with pass.json (fields), icon.png (29px), logo.png (160×50px). passkit-generator uses this as the base.", col:C.green },
                  { n:"04", title:"Google: Create Issuer account", desc:"Sign up at pay.google.com/business/console. Create a Generic class for 'destore_dpp_class'. Note your Issuer ID.", col:C.blue },
                  { n:"05", title:"Google: Service account key", desc:"In Google Cloud Console → IAM → Service Accounts. Create account with 'Google Wallet API' role. Download JSON key file. Store path in GOOGLE_SERVICE_ACCOUNT_KEY.", col:C.blue },
                  { n:"06", title:"Webhook: Call both generators", desc:"n8n POST-payment flow calls POST /api/passes/apple and /api/passes/google. Attach .pkpass to email. Embed Google save link as button in email.", col:C.violet },
                ].map(s => (
                  <div key={s.n} style={{ display:"flex", gap:14, alignItems:"flex-start",
                    background:C.d2, border:`1px solid ${s.col}20`, borderRadius:10, padding:"12px 16px" }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:s.col,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:10, fontWeight:900, color:"#fff", flexShrink:0 }}>{s.n}</div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:800, color:"#fff", marginBottom:4 }}>{s.title}</div>
                      <div style={{ fontSize:11, color:C.dim, lineHeight:1.65 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Sec>
          </div>

          {/* ── N8N FLOW ── */}
          <div id="n8n">
            <Sec title="n8n — Pass Generation Workflow" accent={C.violet}
              sub="Extend the existing payment webhook chain to generate and deliver both pass types automatically on every DPP purchase.">

              <Code lang="json">{`// n8n workflow: payment → generate passes → send email with both
// Trigger: Thirdweb payment webhook (existing flow)
// Add these nodes AFTER the ownership claim is created:

// Node: Generate Apple Pass
{
  "name": "Generate Apple .pkpass",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://app.destore.network/api/passes/apple",
    "headers": { "x-webhook-secret": "{{ $env.N8N_WEBHOOK_SECRET }}" },
    "body": {
      "sku":      "{{ $json.dppSku }}",
      "name":     "{{ $json.productName }}",
      "brand":    "{{ $json.brandName }}",
      "price":    "{{ $json.salePrice }}",
      "material": "{{ $json.material }}",
      "origin":   "{{ $json.origin }}",
      "carbon":   "{{ $json.carbon }}",
      "tokenId":  "{{ $json.tokenId }}",
      "claimUrl": "{{ $json.claimUrl }}"
    },
    "responseFormat": "file"  // returns binary .pkpass
  }
}

// Node: Generate Google Wallet link
{
  "name": "Generate Google Wallet Link",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://app.destore.network/api/passes/google",
    "headers": { "x-webhook-secret": "{{ $env.N8N_WEBHOOK_SECRET }}" },
    "body": { /* same DPP data */ },
    "responseFormat": "json"  // returns { saveLink: "https://pay.google.com/..." }
  }
}

// Node: Send email (via existing email node)
// Attach .pkpass from Apple node binary output
// Include Google save button link in HTML body
{
  "subject": "Your {{ $json.productName }} — ownership confirmed",
  "attachments": [
    { "name": "destore-{{ $json.dppSku }}.pkpass",
      "data": "{{ $node['Generate Apple .pkpass'].binary.data }}" }
  ],
  "html": "...Apple Wallet CTA + Google Wallet save link..."
}`}</Code>

              <div style={{ background:`${C.violet}08`, border:`1px solid ${C.violet}20`,
                borderRadius:10, padding:"12px 16px", fontSize:11, color:C.dim, lineHeight:1.75 }}>
                <strong style={{ color:C.violet }}>Pass updates:</strong> Apple Wallet supports live pass updates via
                push notifications. When a listing status changes (Owned → Listed → Sold),
                call <code style={{ color:C.violet, background:`${C.violet}12`, padding:"0 4px", borderRadius:3 }}>PATCH /api/passes/apple/{`{serialNumber}`}</code> to
                push the updated pass to the user's device. Google Wallet updates via
                <code style={{ color:C.blue, background:`${C.blue}12`, padding:"0 4px", borderRadius:3 }}>PATCH genericobjects/{`{objectId}`}</code> on the Google Wallet API.
              </div>
            </Sec>
          </div>

          {/* Footer */}
          <div style={{ borderTop:`1px solid ${C.bdr}`, paddingTop:28,
            display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <div>
              <Logo size={90}/>
              <div style={{ fontSize:11, color:C.muted, marginTop:8 }}>
                © DeStore Network · Wallet Pass Spec v1.0 · March 2026
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <Tag color={C.green}>Apple Wallet .pkpass</Tag>
              <Tag color={C.blue}>Google Wallet JWT</Tag>
              <Tag color={C.violet}>passkit-generator</Tag>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
