import { useState, useMemo } from "react";
import { Search, X, ChevronLeft, MoreHorizontal, ChevronRight, Tag, Gift, RotateCcw, CornerDownLeft, Package, Zap } from "lucide-react";

const C = {
  royal:"#321B68", orchid:"#6A14DB", violet:"#B354F1",
  orange:"#FF9F46", green:"#28B79D", green2:"#2FB457",
  d0:"#0a0a0d", d1:"#0d0d10", d2:"#141418", d3:"#1c1c22",
  bdr:"#2e2e38", muted:"#6b6b80", dim:"#9999b0",
};

const Logo = ({ size=110 }) => (
  <svg width={size} height={size*0.28} viewBox="0 0 200 56" fill="none">
    <text x="0"  y="44" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" fontSize="48" letterSpacing="-2" fill="#fff">De</text>
    <text x="62" y="44" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" fontSize="48" letterSpacing="-2" fill="#B354F1">Store</text>
  </svg>
);

const PRODUCTS = [
  { id:1, brand:"Nike",        name:"Air Max 97",         sku:"DPP-00291", acquired:"8 Mar 2026",  status:"owned",    price:320,             funIcon:"👟", material:"Mesh / Synthetic",        origin:"Vietnam",    carbon:"14.2 kg CO₂", events:1 },
  { id:2, brand:"Patagonia",   name:"Better Sweater",     sku:"DPP-00288", acquired:"7 Mar 2026",  status:"listed",   price:189, listPrice:95, funIcon:"🧥", material:"100% Recycled Polyester",  origin:"Cambodia",   carbon:"8.7 kg CO₂",  events:3 },
  { id:3, brand:"Levi's",      name:"501 Original Jeans", sku:"DPP-00271", acquired:"3 Mar 2026",  status:"owned",    price:120,             funIcon:"👖", material:"99% Cotton / 1% Elastane", origin:"Mexico",     carbon:"11.4 kg CO₂", events:1 },
  { id:4, brand:"Arc'teryx",   name:"Beta AR Jacket",     sku:"DPP-00265", acquired:"28 Feb 2026", status:"owned",    price:780,             funIcon:"🏔️", material:"Gore-Tex Pro 3L",          origin:"Canada",     carbon:"22.1 kg CO₂", events:2 },
  { id:5, brand:"New Balance", name:"990v5 Made in USA",  sku:"DPP-00251", acquired:"22 Feb 2026", status:"gifted",   price:195,             funIcon:"👟", material:"Pigskin / Mesh",           origin:"USA",        carbon:"9.8 kg CO₂",  events:2 },
  { id:6, brand:"Carhartt",    name:"WIP Detroit Jacket", sku:"DPP-00244", acquired:"1 Mar 2026",  status:"owned",    price:210,             funIcon:"🧥", material:"Cotton Canvas",            origin:"Bangladesh", carbon:"12.3 kg CO₂", events:1 },
  { id:7, brand:"Salomon",     name:"XT-6 Advanced",      sku:"DPP-00238", acquired:"28 Feb 2026", status:"owned",    price:160,             funIcon:"👟", material:"Textile / TPU",            origin:"Romania",    carbon:"10.5 kg CO₂", events:1 },
  { id:8, brand:"Stussy",      name:"8 Ball Fleece Crew", sku:"DPP-00229", acquired:"22 Feb 2026", status:"recycled", price:140,             funIcon:"👕", material:"100% Polyester",           origin:"China",      carbon:"6.2 kg CO₂",  events:3 },
];

const STATUS = {
  owned:    { label:"Owned",    color:C.green  },
  listed:   { label:"Listed",   color:C.violet },
  gifted:   { label:"Gifted",   color:C.orange },
  recycled: { label:"Recycled", color:C.muted  },
};

const ACTIONS = {
  pro: [
    { key:"sell",    Icon:Tag,           label:"Sell",    color:C.green,  toast:"Listing created" },
    { key:"gift",    Icon:Gift,          label:"Gift",    color:C.violet, toast:"Transfer initiated" },
    { key:"recycle", Icon:RotateCcw,     label:"Recycle", color:C.green2, toast:"Finding drop-off..." },
    { key:"return",  Icon:CornerDownLeft,label:"Return",  color:C.orange, toast:"Return label sent" },
  ],
  fun: [
    { key:"sell",    icon:"💸", label:"Sell",    color:C.green,  toast:"Listing started!" },
    { key:"gift",    icon:"🎁", label:"Gift",    color:C.violet, toast:"Gift sent! 🎉" },
    { key:"recycle", icon:"♻️", label:"Recycle", color:C.green2, toast:"Finding drop-off 🌿" },
    { key:"return",  icon:"↩️", label:"Return",  color:C.orange, toast:"Return on its way 📦" },
  ],
};

export default function DeARWallet() {
  const [products, setProducts] = useState(PRODUCTS);
  const [search,   setSearch]   = useState("");
  const [openId,   setOpenId]   = useState(null);
  const [mode,     setMode]     = useState("pro");
  const [toast,    setToast]    = useState(null);
  const isPro    = mode === "pro";
  const actions  = ACTIONS[mode];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return q ? products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) : products;
  }, [search, products]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleAction = (e, p, a) => {
    e.stopPropagation();
    if (a.key === "sell")    setProducts(prev => prev.map(x => x.id===p.id ? {...x,status:"listed",listPrice:Math.round(x.price*0.6)} : x));
    if (a.key === "gift")    { setProducts(prev => prev.map(x => x.id===p.id ? {...x,status:"gifted"} : x)); setOpenId(null); }
    if (a.key === "recycle") { setProducts(prev => prev.map(x => x.id===p.id ? {...x,status:"recycled"} : x)); setOpenId(null); }
    showToast(a.toast);
  };

  const s_ = { // shared styles
    shell:    { width:"100%", maxWidth:430, height:"100vh", background:C.d0, margin:"0 auto", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", color:"#fff" },
    modeBar:  { display:"flex", justifyContent:"center", padding:"12px 16px 0", flexShrink:0 },
    modeBtn:  (active, fun) => ({
      flex:1, maxWidth:130, padding:"8px 0", fontSize:active?(fun?14:13):12, fontWeight:700,
      border:`1px solid ${active?"rgba(255,255,255,0.15)":C.bdr}`,
      cursor:"pointer", letterSpacing:"0.5px",
      color: active ? "#fff" : C.muted,
      background: active ? (fun ? "linear-gradient(90deg,#B354F1,#FF9F46)" : C.d3) : "transparent",
      borderRadius: fun ? "0 100px 100px 0" : "100px 0 0 100px",
      borderRight: fun ? undefined : "none",
      borderLeft:  fun ? "none" : undefined,
      fontFamily: active && !fun ? "Georgia,serif" : "inherit",
    }),
    cardWrap: { padding:"12px 16px 0", flexShrink:0 },
    card:     (pro) => ({
      width:"100%", aspectRatio:"1.586", borderRadius:18, position:"relative", overflow:"hidden",
      background: pro
        ? "conic-gradient(from 220deg,#B354F1,#6A14DB,#00c8ff,#B354F1 40%,#321B68 60%,#B354F1)"
        : "linear-gradient(135deg,#ff9ff3,#ffd6a5,#fdffb6,#caffbf,#9bf6ff,#a0c4ff,#bdb2ff,#ffc6ff)",
      padding: pro ? "1.5px" : 0,
    }),
    cardInner: (pro) => ({
      width:"100%", height:"100%", borderRadius: pro ? 16.5 : 18,
      background: pro ? "linear-gradient(135deg,#0d0d10 0%,#1a1825 50%,#231840 100%)" : "rgba(0,0,0,0.35)",
      padding:"18px 22px", display:"flex", flexDirection:"column", justifyContent:"space-between",
    }),
    nav:      { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 16px 4px", flexShrink:0 },
    navBtn:   { width:36, height:36, borderRadius:"50%", background:C.d3, border:`1px solid ${C.bdr}`, color:C.dim, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" },
    searchWrap:{ padding:"0 16px 8px", flexShrink:0 },
    searchBox: { display:"flex", alignItems:"center", gap:8, background:C.d2, borderRadius:12, padding:"10px 14px", border:`1px solid ${C.bdr}` },
    searchInput:{ flex:1, background:"none", border:"none", outline:"none", color:"#fff", fontFamily:"inherit", fontSize:14 },
    scroll:   { flex:1, overflowY:"auto", paddingBottom:40 },
    secTitle: (fun) => ({ padding:"6px 16px 10px", fontSize: fun?20:11, fontWeight:800, letterSpacing: fun?0:"0.1em", textTransform: fun?"none":"uppercase", color: fun?C.violet:C.muted, display:"flex", alignItems:"center", gap:8, fontFamily: fun?"'Fredoka One',cursive":"inherit" }),
    list:     { padding:"0 16px", display:"flex", flexDirection:"column", gap:1 },
    row:      (open, i) => ({ background: open ? "#0f0f14" : C.d2, cursor:"pointer", borderRadius: i===0?"14px 14px 0 0": "0", marginBottom:0 }),
    rowMain:  { display:"flex", alignItems:"center", gap:12, padding:"13px 14px", userSelect:"none" },
    thumb:    (color) => ({ width:44, height:44, borderRadius:10, background:C.d3, border:`1px solid ${color}35`, color:`${color}bb`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }),
    thumbFun: { width:44, height:44, borderRadius:10, background:C.d3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 },
    dppPanel: { borderTop:`1px solid rgba(46,46,56,0.5)`, background:C.d1 },
    dppInner: { padding:"12px 14px 14px" },
    dppGrid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:8 },
    dppField: { background:C.d2, borderRadius:10, padding:"9px 11px", border:`1px solid rgba(46,46,56,0.4)` },
    chainRow: { display:"flex", alignItems:"center", gap:7, background:C.d2, border:`1px solid rgba(46,46,56,0.4)`, borderRadius:10, padding:"9px 12px", marginBottom:8 },
    actGrid:  { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 },
    actBtn:   (a) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:5, padding:"12px 4px", borderRadius:12, border:`1px solid ${a.color}40`, background:`${a.color}18`, color:a.color, fontFamily:"inherit", fontSize:11, fontWeight:700, cursor:"pointer", minHeight:58 }),
    toast:    { position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"rgba(26,26,34,0.96)", border:`1px solid ${C.bdr}`, borderRadius:100, padding:"10px 20px", fontSize:13, fontWeight:600, whiteSpace:"nowrap", backdropFilter:"blur(14px)", zIndex:999, pointerEvents:"none" },
  };

  return (
    <div style={s_.shell}>
      {/* Mode toggle */}
      <div style={s_.modeBar}>
        <button style={s_.modeBtn(isPro, false)} onClick={() => setMode("pro")}>{isPro ? "◈ Pro" : "Pro"}</button>
        <button style={s_.modeBtn(!isPro, true)}  onClick={() => setMode("fun")}>{!isPro ? "✦ Fun" : "Fun"}</button>
      </div>

      {/* Wallet card */}
      <div style={s_.cardWrap}>
        <div style={s_.card(isPro)}>
          <div style={s_.cardInner(isPro)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <Logo size={isPro ? 110 : 100} />
              {isPro && <div style={{ width:32, height:24, borderRadius:5, background:"linear-gradient(135deg,rgba(255,255,255,0.4),rgba(255,255,255,0.12))", border:"1px solid rgba(255,255,255,0.28)" }} />}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
              <div>
                <div style={{ fontFamily: isPro?"Georgia,serif":"inherit", fontSize: isPro?34:32, fontWeight:600, letterSpacing:"-1px", lineHeight:1 }}>{products.length}</div>
                <div style={{ fontSize: isPro?9:12, color:"rgba(255,255,255,0.4)", marginTop:3, letterSpacing: isPro?"2.5px":0, textTransform: isPro?"uppercase":"none" }}>
                  {isPro ? "Products registered" : "things in my collection ✨"}
                </div>
              </div>
              <div style={{ fontSize: isPro?9:12, color:"rgba(255,255,255,0.28)", letterSpacing: isPro?"2.5px":0, textTransform: isPro?"uppercase":"none" }}>
                {isPro ? "◈ DeAR WALLET" : "✦ DeAR ✦"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={s_.nav}>
        <button style={s_.navBtn} onClick={() => showToast("Back")}><ChevronLeft size={18} /></button>
        <span style={{ fontSize: isPro?15:18, fontWeight:800, color: isPro?"#fff":C.violet }}>{isPro ? "DeAR · My Assets" : "My Stuff ✨"}</span>
        <button style={s_.navBtn} onClick={() => showToast("Menu coming soon")}><MoreHorizontal size={18} /></button>
      </div>

      {/* Search */}
      <div style={s_.searchWrap}>
        <div style={s_.searchBox}>
          <Search size={15} color={C.muted} />
          <input style={s_.searchInput} placeholder={isPro ? "Search products, brands…" : "Find your stuff…"} value={search} onChange={e => { setSearch(e.target.value); setOpenId(null); }} />
          {search && <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex" }} onClick={() => { setSearch(""); setOpenId(null); }}><X size={12} /></button>}
        </div>
      </div>

      {/* List */}
      <div style={s_.scroll}>
        <div style={s_.secTitle(!isPro)}>
          {search ? "Results" : (isPro ? "All Assets" : "All My Stuff")}
          <span style={{ fontSize:12, fontWeight:600, color:C.muted, fontFamily:"inherit" }}>{filtered.length}</span>
        </div>

        <div style={s_.list}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"48px 20px", color:C.muted }}>
              <Package size={32} color={C.bdr} style={{ margin:"0 auto 10px" }} />
              No results for "{search}"
            </div>
          ) : filtered.map((p, i) => {
            const st     = STATUS[p.status];
            const isOpen = openId === p.id;
            const isLast = i === filtered.length - 1;
            return (
              <div key={p.id} style={{ ...s_.row(isOpen, i), borderRadius: i===0 && isLast ? 14 : i===0 ? "14px 14px 0 0" : isLast ? "0 0 14px 14px" : 0 }}>
                <div style={s_.rowMain} onClick={() => setOpenId(isOpen ? null : p.id)}>
                  {isPro
                    ? <div style={s_.thumb(st.color)}><Package size={20} strokeWidth={1.5} /></div>
                    : <div style={s_.thumbFun}>{p.funIcon}</div>
                  }
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:"0.6px", textTransform:"uppercase" }}>{p.brand}</div>
                    <div style={{ fontSize:14, fontWeight:600, color:"#e8e8f4", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", margin:"2px 0" }}>{p.name}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:C.muted }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:st.color }} />
                      <span style={{ color:st.color, fontWeight:700 }}>{st.label}</span>
                      <span>·</span>
                      <span>{p.acquired}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
                    <div style={{ fontSize:15, fontWeight:800 }}>${p.price}</div>
                    <ChevronRight size={14} color={isOpen ? C.violet : C.bdr} style={{ transform: isOpen?"rotate(90deg)":"none", transition:"transform 0.2s" }} />
                  </div>
                </div>

                {isOpen && (
                  <div style={s_.dppPanel}>
                    <div style={s_.dppInner}>
                      <div style={s_.dppGrid}>
                        {[["DPP ID",p.sku],["Material",p.material],["Origin",p.origin],["Carbon",p.carbon],["Acquired",p.acquired],["Events",`${p.events} logged`]].map(([l,v]) => (
                          <div key={l} style={s_.dppField}>
                            <div style={{ fontSize:9, color:C.muted, fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:3 }}>{l}</div>
                            <div style={{ fontSize:11, fontWeight:600, color:"#e8e8f4" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={s_.chainRow}>
                        <div style={{ width:7, height:7, borderRadius:"50%", background:C.green, flexShrink:0 }} />
                        <span style={{ fontSize:12, color:C.muted }}>On-chain · <span style={{ color:C.green, fontWeight:700 }}>Base</span></span>
                        <span style={{ marginLeft:"auto", fontSize:11, color:C.muted }}>{p.events} event{p.events!==1?"s":""}</span>
                      </div>
                      {p.status === "listed" && (
                        <div style={{ display:"flex", alignItems:"center", gap:6, background:`${C.violet}12`, border:`1px solid ${C.violet}30`, borderRadius:8, padding:"7px 11px", marginBottom:8, fontSize:12, color:C.violet, fontWeight:700 }}>
                          <Zap size={12} /> Listed at ${p.listPrice} · DeStore Marketplace
                        </div>
                      )}
                      <div style={s_.actGrid}>
                        {actions.map(a => (
                          <button key={a.key} style={s_.actBtn(a)} onClick={(e) => handleAction(e,p,a)}>
                            {isPro ? <a.Icon size={17} strokeWidth={1.8} /> : <span style={{ fontSize:20 }}>{a.icon}</span>}
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {toast && <div style={s_.toast}>{toast}</div>}
    </div>
  );
}
