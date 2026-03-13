import { useState, useMemo } from "react";
// DeAR — Decentralised Asset Register · v1.1 · aligned with DeStore docs March 2026
// Pro/Fun mode toggle — global DeStore UI pattern

// ── DeStore SVG Logo (inline, Primary Reversed — white De + violet Store) ──
const DeStoreLogo = ({ size = 120 }) => (
  <svg width={size} height={size * 0.28} viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="48" letterSpacing="-2" fill="#FFFFFF">De</text>
    <text x="62" y="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="48" letterSpacing="-2" fill="#B354F1">Store</text>
  </svg>
);

// ── Data ──
const PRODUCTS_INIT = [
  { id:1, brand:"Nike",       name:"Air Max 97 Silver Bullet", sku:"DPP-00291", acquired:"8 Mar 2026",  status:"owned",    price:320, proIcon:"◼", funIcon:"👟", category:"Footwear",  material:"Mesh / Synthetic",       origin:"Vietnam",    carbon:"14.2 kg CO₂", events:1 },
  { id:2, brand:"Patagonia",  name:"Better Sweater Fleece",    sku:"DPP-00288", acquired:"7 Mar 2026",  status:"listed",   price:189, listPrice:95, proIcon:"▲", funIcon:"🧥", category:"Outerwear", material:"100% Recycled Polyester",  origin:"Cambodia",   carbon:"8.7 kg CO₂",  events:3 },
  { id:3, brand:"Levi's",     name:"501 Original Jeans",       sku:"DPP-00271", acquired:"3 Mar 2026",  status:"owned",    price:120, proIcon:"▬", funIcon:"👖", category:"Denim",     material:"99% Cotton / 1% Elastane", origin:"Mexico",     carbon:"11.4 kg CO₂", events:1 },
  { id:4, brand:"Arc'teryx",  name:"Beta AR Jacket",           sku:"DPP-00265", acquired:"28 Feb 2026", status:"owned",    price:780, proIcon:"◈", funIcon:"🏔️", category:"Outerwear", material:"Gore-Tex Pro 3L",          origin:"Canada",     carbon:"22.1 kg CO₂", events:2 },
  { id:5, brand:"New Balance",name:"990v5 Made in USA",        sku:"DPP-00251", acquired:"22 Feb 2026", status:"gifted",   price:195, proIcon:"◼", funIcon:"👟", category:"Footwear",  material:"Pigskin / Mesh",           origin:"USA",        carbon:"9.8 kg CO₂",  events:2 },
  { id:6, brand:"Carhartt",   name:"WIP Detroit Jacket",       sku:"DPP-00244", acquired:"1 Mar 2026",  status:"owned",    price:210, proIcon:"▲", funIcon:"🧥", category:"Outerwear", material:"Cotton Canvas",            origin:"Bangladesh", carbon:"12.3 kg CO₂", events:1 },
  { id:7, brand:"Salomon",    name:"XT-6 Advanced",            sku:"DPP-00238", acquired:"28 Feb 2026", status:"owned",    price:160, proIcon:"◼", funIcon:"👟", category:"Footwear",  material:"Textile / TPU",            origin:"Romania",    carbon:"10.5 kg CO₂", events:1 },
  { id:8, brand:"Stüssy",     name:"8 Ball Fleece Crew",       sku:"DPP-00229", acquired:"22 Feb 2026", status:"recycled", price:140, proIcon:"●", funIcon:"👕", category:"Tops",      material:"100% Polyester",           origin:"China",      carbon:"6.2 kg CO₂",  events:3 },
];

const STATUS = {
  owned:    { label:"Owned",    color:"#28B79D" },
  listed:   { label:"Listed",   color:"#B354F1" },
  gifted:   { label:"Gifted",   color:"#FF9F46" },
  recycled: { label:"Recycled", color:"#8b8fa8" },
};

// Pro = minimal symbols, Fun = emoji
const ACTIONS = {
  pro: [
    { key:"sell",    icon:"$",  label:"Sell",    color:"#28B79D", bg:"rgba(40,183,157,0.1)",  border:"rgba(40,183,157,0.25)", toast:"Listing created · DeStore Marketplace via DeAR.link" },
    { key:"gift",    icon:"→",  label:"Gift",    color:"#B354F1", bg:"rgba(179,84,241,0.1)",  border:"rgba(179,84,241,0.25)", toast:"Transfer initiated" },
    { key:"recycle", icon:"↺",  label:"Recycle", color:"#2FB457", bg:"rgba(47,180,87,0.08)",  border:"rgba(47,180,87,0.2)",   toast:"Finding drop-off…" },
    { key:"return",  icon:"←",  label:"Return",  color:"#FF9F46", bg:"rgba(255,159,70,0.08)", border:"rgba(255,159,70,0.2)",  toast:"Return label generating…" },
  ],
  fun: [
    { key:"sell",    icon:"💸", label:"Sell",    color:"#28B79D", bg:"rgba(40,183,157,0.12)", border:"rgba(40,183,157,0.3)",  toast:"✓ Listed on DeStore! Share via DeAR.link 🔗" },
    { key:"gift",    icon:"🎁", label:"Gift",    color:"#B354F1", bg:"rgba(179,84,241,0.12)", border:"rgba(179,84,241,0.3)",  toast:"✓ Gift transfer started 🎉" },
    { key:"recycle", icon:"♻️", label:"Recycle", color:"#2FB457", bg:"rgba(47,180,87,0.10)",  border:"rgba(47,180,87,0.25)",  toast:"✓ Finding drop-off near you 🌿" },
    { key:"return",  icon:"↩️", label:"Return",  color:"#FF9F46", bg:"rgba(255,159,70,0.10)", border:"rgba(255,159,70,0.25)", toast:"✓ Return label on its way 📦" },
  ],
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@400;600&family=Fredoka+One&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#000; color:#fff; -webkit-font-smoothing:antialiased; }

  @property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
  @keyframes spin-border { to { --angle:360deg; } }
  @keyframes slideUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes toastIn  { from { opacity:0; transform:translateX(-50%) translateY(10px) scale(0.96); } to { opacity:1; transform:translateX(-50%) scale(1); } }
  @keyframes toastOut { from { opacity:1; transform:translateX(-50%) scale(1); } to { opacity:0; transform:translateX(-50%) scale(0.95); } }
  @keyframes foil {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .shell { width:100%; max-width:430px; height:100vh; background:#000; margin:0 auto; display:flex; flex-direction:column; overflow:hidden; position:relative; }

  /* ── MODE TOGGLE ── */
  .mode-bar {
    display:flex; justify-content:center; padding:10px 16px 0; gap:0; flex-shrink:0;
  }
  .mode-btn {
    flex:1; max-width:120px; padding:7px 0; font-family:inherit; font-size:12px; font-weight:700;
    border:1px solid rgba(255,255,255,0.1); cursor:pointer; transition:all 0.2s;
    letter-spacing:0.5px;
  }
  .mode-btn:first-child { border-radius:100px 0 0 100px; border-right:none; }
  .mode-btn:last-child  { border-radius:0 100px 100px 0; border-left:none; }
  .mode-btn.active-pro  { background:#202123; color:#fff; border-color:rgba(255,255,255,0.2); font-family:'Cormorant Garamond',serif; font-size:13px; }
  .mode-btn.active-fun  { background:linear-gradient(90deg,#B354F1,#FF9F46); color:#fff; border-color:transparent; font-family:'Fredoka One',cursive; font-size:13px; }
  .mode-btn.inactive    { background:transparent; color:#8b8fa8; }

  /* ── CARD ── */
  .card-wrap { padding:10px 16px 0; flex-shrink:0; }
  .card { width:100%; aspect-ratio:1.586; border-radius:16px; position:relative; overflow:hidden; }

  /* Pro card */
  .card.pro::before {
    content:''; position:absolute; inset:-1.5px; border-radius:17.5px;
    background:conic-gradient(from var(--angle), #B354F1, #6a14db, #00c8ff, #B354F1 40%, #321b68 60%, #B354F1);
    animation:spin-border 2.5s linear infinite; z-index:0;
  }
  .card.pro::after {
    content:''; position:absolute; inset:1.5px; border-radius:14.5px;
    background:linear-gradient(135deg, #111114 0%, #1e1e28 50%, #2a1f4a 100%); z-index:1;
  }

  /* Fun card — holographic foil */
  .card.fun::before {
    content:''; position:absolute; inset:0; border-radius:16px;
    background: linear-gradient(135deg,
      #ff9ff3, #ffd6a5, #fdffb6, #caffbf, #9bf6ff, #a0c4ff, #bdb2ff, #ffc6ff, #ff9ff3
    );
    background-size: 300% 300%;
    animation: foil 4s ease infinite;
    z-index:0;
  }
  .card.fun::after { display:none; }
  .card.fun .card-body { background:rgba(0,0,0,0.35); border-radius:16px; }

  .card-body { position:absolute; inset:0; z-index:2; padding:16px 20px; display:flex; flex-direction:column; justify-content:space-between; }

  .card-top  { display:flex; justify-content:space-between; align-items:flex-start; }
  .card-chip { width:30px; height:22px; border-radius:5px; background:linear-gradient(135deg,rgba(255,255,255,0.4),rgba(255,255,255,0.15)); border:1px solid rgba(255,255,255,0.3); }
  .card-bottom { display:flex; justify-content:space-between; align-items:flex-end; }

  .card-count-pro { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:600; letter-spacing:-1px; line-height:1; color:#fff; }
  .card-count-fun { font-family:'Fredoka One',cursive; font-size:30px; line-height:1; color:#fff; text-shadow:0 0 12px rgba(255,255,255,0.4); }
  .card-sub-pro   { font-size:9px; color:rgba(255,255,255,0.4); margin-top:3px; letter-spacing:2px; text-transform:uppercase; }
  .card-sub-fun   { font-family:'Fredoka One',cursive; font-size:11px; color:rgba(255,255,255,0.7); margin-top:2px; }
  .card-id-pro    { font-size:9px; color:rgba(255,255,255,0.3); letter-spacing:2px; text-transform:uppercase; }
  .card-id-fun    { font-family:'Fredoka One',cursive; font-size:11px; color:rgba(255,255,255,0.6); }

  /* ── NAV ── */
  .nav { display:flex; justify-content:space-between; align-items:center; padding:10px 16px 6px; flex-shrink:0; }
  .nav-btn { width:36px; height:36px; border-radius:50%; background:#1c1c1e; border:none; color:#fff; font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s; }
  .nav-btn:active { background:#2c2c2e; }
  .nav-title-pro { font-size:16px; font-weight:700; }
  .nav-title-fun { font-family:'Fredoka One',cursive; font-size:18px; color:#B354F1; }

  /* ── SEARCH ── */
  .search-wrap { padding:0 16px 8px; flex-shrink:0; }
  .search-box { display:flex; align-items:center; gap:8px; background:#1c1c1e; border-radius:12px; padding:10px 14px; border:1px solid rgba(255,255,255,0.06); transition:border-color 0.2s; }
  .search-box:focus-within { border-color:rgba(179,84,241,0.4); }
  .search-icon { color:#8b8fa8; font-size:14px; flex-shrink:0; }
  .search-input { flex:1; background:none; border:none; outline:none; color:#fff; font-family:inherit; font-size:15px; }
  .search-input::placeholder { color:#8b8fa8; }
  .clear-btn { width:18px; height:18px; border-radius:50%; background:#3a3a3c; border:none; color:#8b8fa8; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; }

  /* ── SCROLL ── */
  .scroll-area { flex:1; overflow-y:auto; -webkit-overflow-scrolling:touch; padding-bottom:40px; }
  .scroll-area::-webkit-scrollbar { display:none; }
  .section-title-pro { padding:4px 16px 8px; font-size:17px; font-weight:800; }
  .section-title-fun { padding:4px 16px 8px; font-family:'Fredoka One',cursive; font-size:19px; color:#B354F1; }
  .section-count { font-size:13px; font-weight:500; color:#8b8fa8; margin-left:6px; font-family:'Plus Jakarta Sans',sans-serif; }

  /* ── ROWS ── */
  .list { padding:0 16px; display:flex; flex-direction:column; gap:1px; }
  .row { background:#1c1c1e; cursor:pointer; transition:background 0.15s; animation:slideUp 0.35s ease both; opacity:0; animation-fill-mode:forwards; }
  .row:first-child { border-radius:14px 14px 0 0; }
  .row:last-child  { border-radius:0 0 14px 14px; }
  .row:only-child  { border-radius:14px; }
  .row:hover  { background:#222224; }
  .row.open   { background:#1a1a1c; }

  .row-main { display:flex; align-items:center; gap:12px; padding:13px 14px; user-select:none; }

  /* Pro thumb: minimal geometric */
  .row-thumb-pro {
    width:44px; height:44px; border-radius:10px;
    background:#2a2a2c; border:1px solid rgba(255,255,255,0.06);
    display:flex; align-items:center; justify-content:center;
    font-size:18px; color:rgba(255,255,255,0.5); flex-shrink:0;
    font-family:'Cormorant Garamond',serif; letter-spacing:-1px;
  }
  /* Fun thumb: emoji */
  .row-thumb-fun {
    width:44px; height:44px; border-radius:10px;
    background:#2c2c2e;
    display:flex; align-items:center; justify-content:center;
    font-size:22px; flex-shrink:0;
  }

  .row-info { flex:1; min-width:0; }
  .row-brand { font-size:10px; font-weight:700; color:#8b8fa8; letter-spacing:0.5px; text-transform:uppercase; }
  .row-name  { font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:1px 0; }
  .row-name-fun { font-family:'Plus Jakarta Sans',sans-serif; }
  .row-meta  { display:flex; align-items:center; gap:5px; font-size:11px; color:#8b8fa8; }
  .dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .row-right   { display:flex; flex-direction:column; align-items:flex-end; gap:5px; }
  .row-price   { font-size:15px; font-weight:700; letter-spacing:-0.3px; }
  .row-chevron { font-size:13px; color:#3a3a3c; transition:color 0.15s, transform 0.2s; }
  .row.open .row-chevron { color:#B354F1; transform:rotate(90deg); }

  /* ── DPP PANEL ── */
  .dpp-panel { border-top:1px solid rgba(255,255,255,0.05); background:#141416; animation:fadeIn 0.2s ease both; }
  .dpp-inner { padding:12px 14px 14px; }
  .dpp-grid  { display:grid; grid-template-columns:1fr 1fr; gap:7px; margin-bottom:10px; }
  .dpp-field { background:#1e1e20; border-radius:10px; padding:9px 11px; }
  .dpp-label { font-size:10px; color:#8b8fa8; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:3px; }
  .dpp-value { font-size:12px; font-weight:600; color:#fff; }

  .chain-row { display:flex; align-items:center; gap:6px; background:#1e1e20; border-radius:10px; padding:9px 11px; margin-bottom:10px; }
  .chain-pulse { width:7px; height:7px; border-radius:50%; background:#28B79D; flex-shrink:0; }
  .chain-text  { font-size:12px; color:#8b8fa8; }
  .chain-name  { color:#28B79D; font-weight:600; }
  .chain-events { margin-left:auto; font-size:11px; color:#8b8fa8; }

  .listed-pill { display:flex; align-items:center; gap:6px; background:rgba(179,84,241,0.08); border:1px solid rgba(179,84,241,0.2); border-radius:8px; padding:7px 10px; margin-bottom:10px; font-size:12px; color:#B354F1; font-weight:600; }

  /* ── ACTION BUTTONS ── */
  .action-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; }
  .action-btn {
    display:flex; flex-direction:column; align-items:center; gap:5px;
    padding:12px 4px; border-radius:12px; border:1px solid;
    font-family:inherit; font-size:11px; font-weight:700;
    cursor:pointer; transition:all 0.15s; min-height:58px;
    -webkit-tap-highlight-color:transparent;
  }
  .action-btn:active { transform:scale(0.93); opacity:0.8; }
  .action-icon-pro { font-size:16px; font-weight:300; line-height:1; opacity:0.9; }
  .action-icon-fun { font-size:19px; line-height:1; }

  /* ── TOAST ── */
  .toast { position:fixed; bottom:28px; left:50%; background:rgba(28,28,30,0.95); border:1px solid rgba(255,255,255,0.12); border-radius:100px; padding:10px 20px; font-size:13px; font-weight:600; color:#fff; white-space:nowrap; backdrop-filter:blur(12px); box-shadow:0 8px 32px rgba(0,0,0,0.6); z-index:999; pointer-events:none; }
  .toast.in  { animation:toastIn  0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
  .toast.out { animation:toastOut 0.25s ease both; }

  .empty { text-align:center; padding:48px 20px; color:#8b8fa8; font-size:14px; }
  .empty-icon { font-size:32px; margin-bottom:10px; }
`;

export default function DeStoreWallet() {
  const [products, setProducts] = useState(PRODUCTS_INIT);
  const [search,   setSearch]   = useState("");
  const [openId,   setOpenId]   = useState(null);
  const [mode,     setMode]     = useState("pro"); // "pro" | "fun"
  const [toast,    setToast]    = useState(null);
  const [toastAnim,setToastAnim]= useState("in");

  const isPro = mode === "pro";
  const actions = ACTIONS[mode];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }, [search, products]);

  const showToast = (msg) => {
    setToastAnim("in");
    setToast(msg);
    setTimeout(() => {
      setToastAnim("out");
      setTimeout(() => setToast(null), 280);
    }, 2600);
  };

  const handleAction = (e, product, action) => {
    e.stopPropagation();
    if (action.key === "sell") {
      setProducts(prev => prev.map(p =>
        p.id === product.id ? { ...p, status:"listed", listPrice: Math.round(p.price * 0.6) } : p
      ));
    } else if (action.key === "gift") {
      setProducts(prev => prev.map(p =>
        p.id === product.id ? { ...p, status:"gifted" } : p
      ));
      setOpenId(null);
    } else if (action.key === "recycle") {
      setProducts(prev => prev.map(p =>
        p.id === product.id ? { ...p, status:"recycled" } : p
      ));
      setOpenId(null);
    }
    showToast(action.toast);
  };

  return (
    <>
      <style>{css}</style>
      <div className="shell">

        {/* ── MODE TOGGLE ── */}
        <div className="mode-bar">
          <button
            className={`mode-btn ${isPro ? "active-pro" : "inactive"}`}
            onClick={() => setMode("pro")}
          >
            {isPro ? "◈ Pro" : "Pro"}
          </button>
          <button
            className={`mode-btn ${!isPro ? "active-fun" : "inactive"}`}
            onClick={() => setMode("fun")}
          >
            {!isPro ? "✦ Fun" : "Fun"}
          </button>
        </div>

        {/* ── CARD ── */}
        <div className="card-wrap">
          <div className={`card ${mode}`}>
            <div className="card-body">
              <div className="card-top">
                <DeStoreLogo size={isPro ? 110 : 100} />
                <div className="card-chip" />
              </div>
              <div className="card-bottom">
                <div>
                  <div className={isPro ? "card-count-pro" : "card-count-fun"}>{products.length}</div>
                  <div className={isPro ? "card-sub-pro" : "card-sub-fun"}>Products registered</div>
                </div>
                <div className={isPro ? "card-id-pro" : "card-id-fun"}>
                  {isPro ? "◈ DPP WALLET" : "✦ My Stuff"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAV ── */}
        <div className="nav">
          <button className="nav-btn" onClick={() => showToast("← Back")}>←</button>
          <span className={isPro ? "nav-title-pro" : "nav-title-fun"}>
            {isPro ? "My Assets" : "My Stuff ✨"}
          </span>
          <button className="nav-btn" onClick={() => showToast("Menu coming soon")}>⋯</button>
        </div>

        {/* ── SEARCH ── */}
        <div className="search-wrap">
          <div className="search-box">
            <span className="search-icon">{isPro ? "◈" : "🔍"}</span>
            <input
              className="search-input"
              placeholder={isPro ? "Search products, brands…" : "Find your stuff…"}
              value={search}
              onChange={e => { setSearch(e.target.value); setOpenId(null); }}
            />
            {search && (
              <button className="clear-btn" onClick={() => { setSearch(""); setOpenId(null); }}>✕</button>
            )}
          </div>
        </div>

        {/* ── SCROLL ── */}
        <div className="scroll-area">
          <div className={isPro ? "section-title-pro" : "section-title-fun"}>
            {search ? "Results" : (isPro ? "All Assets" : "All My Stuff")}
            <span className="section-count">{filtered.length}</span>
          </div>

          <div className="list">
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">{isPro ? "◈" : "🔍"}</div>
                No results for "{search}"
              </div>
            ) : filtered.map((p, i) => {
              const s = STATUS[p.status];
              const isOpen = openId === p.id;
              return (
                <div
                  key={p.id}
                  className={`row${isOpen ? " open" : ""}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="row-main" onClick={() => setOpenId(isOpen ? null : p.id)}>
                    {isPro ? (
                      <div className="row-thumb-pro">{p.proIcon}</div>
                    ) : (
                      <div className="row-thumb-fun">{p.funIcon}</div>
                    )}
                    <div className="row-info">
                      <div className="row-brand">{p.brand}</div>
                      <div className="row-name">{p.name}</div>
                      <div className="row-meta">
                        <div className="dot" style={{ background: s.color }} />
                        <span style={{ color: s.color, fontWeight:600 }}>{s.label}</span>
                        <span>·</span>
                        <span>{p.acquired}</span>
                      </div>
                    </div>
                    <div className="row-right">
                      <div className="row-price">${p.price}</div>
                      <div className="row-chevron">›</div>
                    </div>
                  </div>

                  {/* DPP + Actions */}
                  {isOpen && (
                    <div className="dpp-panel">
                      <div className="dpp-inner">
                        <div className="dpp-grid">
                          {[
                            ["DPP ID",   p.sku],
                            ["Category", p.category],
                            ["Material", p.material],
                            ["Origin",   p.origin],
                            ["Carbon",   p.carbon],
                            ["Acquired", p.acquired],
                          ].map(([label, value]) => (
                            <div key={label} className="dpp-field">
                              <div className="dpp-label">{label}</div>
                              <div className="dpp-value" style={{ fontSize: label === "Material" ? 11 : 12 }}>{value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="chain-row">
                          <div className="chain-pulse" />
                          <span className="chain-text">On-chain · <span className="chain-name">Base</span></span>
                          <span className="chain-events">{p.events} event{p.events !== 1 ? "s" : ""} logged</span>
                        </div>

                        {p.status === "listed" && (
                          <div className="listed-pill">
                            ◈ Listed at ${p.listPrice} · DeStore Marketplace
                          </div>
                        )}

                        <div className="action-grid">
                          {actions.map(a => (
                            <button
                              key={a.key}
                              className="action-btn"
                              style={{ background:a.bg, color:a.color, borderColor:a.border }}
                              onClick={(e) => handleAction(e, p, a)}
                            >
                              <span className={isPro ? "action-icon-pro" : "action-icon-fun"}>
                                {a.icon}
                              </span>
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

        {/* Toast */}
        {toast && <div className={`toast ${toastAnim}`}>{toast}</div>}

      </div>
    </>
  );
}
