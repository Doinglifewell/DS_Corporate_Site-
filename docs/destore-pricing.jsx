import { useState } from "react";

const COLORS = {
  royalBase: "#321B68",
  digitalOrchid: "#6A14DB",
  hybridViolet: "#B354F1",
  dark1: "#0d0d10",
  dark2: "#202123",
  dark3: "#343540",
  green1: "#28B79D",
  green2: "#2FB457",
  orange: "#FF9F46",
  white: "#FFFFFF",
  muted: "#8b8fa8",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #0d0d10;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes spin-border {
    to { --angle: 360deg; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(179, 84, 241, 0.2); }
    50% { box-shadow: 0 0 40px rgba(179, 84, 241, 0.5); }
  }

  .pricing-page {
    min-height: 100vh;
    padding: 0 24px 80px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    padding: 72px 0 56px;
    animation: fadeUp 0.6s ease both;
  }

  .logo {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 32px;
    display: inline-block;
  }

  .logo span { color: #B354F1; }

  .header-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #B354F1;
    margin-bottom: 16px;
  }

  .header-title {
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1.5px;
    margin-bottom: 16px;
  }

  .header-title .accent {
    background: linear-gradient(135deg, #B354F1, #6A14DB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header-sub {
    font-size: 17px;
    color: #8b8fa8;
    font-weight: 400;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .toggle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 40px 0 48px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .toggle-label {
    font-size: 13px;
    font-weight: 600;
    color: #8b8fa8;
    cursor: pointer;
    transition: color 0.2s;
  }

  .toggle-label.active { color: #fff; }

  .toggle-pill {
    width: 52px;
    height: 28px;
    background: #343540;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    transition: background 0.3s;
  }

  .toggle-pill.on { background: #6A14DB; }

  .toggle-dot {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .toggle-pill.on .toggle-dot { transform: translateX(24px); }

  .save-badge {
    background: rgba(40, 183, 157, 0.15);
    color: #28B79D;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 100px;
    border: 1px solid rgba(40, 183, 157, 0.3);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  @media (max-width: 900px) {
    .cards-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
  }

  .card {
    background: #202123;
    border-radius: 20px;
    padding: 32px;
    border: 1px solid rgba(255,255,255,0.06);
    position: relative;
    transition: transform 0.2s, border-color 0.2s;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(179, 84, 241, 0.2);
  }

  .card.featured {
    background: #202123;
    border-color: transparent;
    position: relative;
    animation: pulse-glow 3s ease infinite;
  }

  .card.featured::before {
    content: '';
    position: absolute;
    inset: -1.5px;
    border-radius: 21.5px;
    background: conic-gradient(from var(--angle), #B354F1, #6a14db, #00c8ff, #B354F1 40%, #321b68 60%, #B354F1);
    animation: spin-border 2.5s linear infinite;
    z-index: 0;
  }

  .card.featured::after {
    content: '';
    position: absolute;
    inset: 1.5px;
    border-radius: 18.5px;
    background: #202123;
    z-index: 1;
  }

  .card-inner {
    position: relative;
    z-index: 2;
  }

  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding: 4px 10px;
    border-radius: 100px;
  }

  .tier-badge.starter {
    background: rgba(52, 53, 64, 0.8);
    color: #8b8fa8;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .tier-badge.growth {
    background: rgba(106, 20, 219, 0.15);
    color: #B354F1;
    border: 1px solid rgba(179, 84, 241, 0.3);
  }

  .tier-badge.enterprise {
    background: rgba(255, 159, 70, 0.1);
    color: #FF9F46;
    border: 1px solid rgba(255, 159, 70, 0.3);
  }

  .tier-name {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
  }

  .tier-desc {
    font-size: 14px;
    color: #8b8fa8;
    line-height: 1.5;
    margin-bottom: 28px;
    min-height: 42px;
  }

  .price-block {
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .price-main {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: 4px;
  }

  .price-main .currency {
    font-size: 22px;
    font-weight: 600;
    vertical-align: top;
    margin-top: 8px;
    display: inline-block;
    letter-spacing: 0;
  }

  .price-main .period {
    font-size: 16px;
    font-weight: 500;
    color: #8b8fa8;
    letter-spacing: 0;
  }

  .price-per-dpp {
    font-size: 13px;
    color: #8b8fa8;
    margin-top: 6px;
  }

  .price-per-dpp strong {
    color: #fff;
    font-weight: 600;
  }

  .price-note {
    font-size: 12px;
    color: #8b8fa8;
    margin-top: 4px;
  }

  .cta-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    margin-bottom: 28px;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }

  .cta-btn.default {
    background: #343540;
    color: #fff;
  }

  .cta-btn.default:hover {
    background: #3e3f4e;
  }

  .cta-btn.primary {
    background: linear-gradient(135deg, #B354F1, #6A14DB);
    color: #fff;
  }

  .cta-btn.primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .cta-btn.enterprise-btn {
    background: rgba(255, 159, 70, 0.1);
    color: #FF9F46;
    border: 1px solid rgba(255, 159, 70, 0.3);
  }

  .cta-btn.enterprise-btn:hover {
    background: rgba(255, 159, 70, 0.2);
  }

  .features-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8b8fa8;
    margin-bottom: 14px;
  }

  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13.5px;
    color: #c4c5d0;
    line-height: 1.4;
  }

  .feature-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 1px;
  }

  .feature-icon.check { color: #28B79D; }
  .feature-icon.star { color: #B354F1; }
  .feature-icon.bolt { color: #FF9F46; }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 20px 0;
  }

  .feature-item.muted { color: #8b8fa8; }

  .enterprise-extras {
    margin-top: 20px;
  }

  .extra-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 13px;
  }

  .extra-row:last-child { border-bottom: none; }

  .extra-label { color: #8b8fa8; }
  .extra-value { color: #fff; font-weight: 600; }
  .extra-value.green { color: #28B79D; }
  .extra-value.orange { color: #FF9F46; }

  .math-block {
    background: rgba(255, 159, 70, 0.05);
    border: 1px solid rgba(255, 159, 70, 0.15);
    border-radius: 12px;
    padding: 16px;
    margin-top: 20px;
  }

  .math-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #FF9F46;
    margin-bottom: 10px;
  }

  .math-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #8b8fa8;
    padding: 3px 0;
  }

  .math-total {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    padding-top: 8px;
    margin-top: 8px;
    border-top: 1px solid rgba(255,159,70,0.2);
  }

  .math-margin {
    font-size: 11px;
    color: #28B79D;
    text-align: right;
    margin-top: 4px;
  }

  .faq-section {
    margin-top: 80px;
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -1px;
    margin-bottom: 40px;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 700px) {
    .faq-grid { grid-template-columns: 1fr; }
  }

  .faq-item {
    background: #202123;
    border-radius: 14px;
    padding: 20px 24px;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .faq-q {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #fff;
  }

  .faq-a {
    font-size: 13px;
    color: #8b8fa8;
    line-height: 1.6;
  }

  .bottom-banner {
    margin-top: 80px;
    background: linear-gradient(135deg, rgba(106,20,219,0.2), rgba(179,84,241,0.1));
    border: 1px solid rgba(179, 84, 241, 0.2);
    border-radius: 24px;
    padding: 48px;
    text-align: center;
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .banner-title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
  }

  .banner-sub {
    font-size: 15px;
    color: #8b8fa8;
    margin-bottom: 24px;
  }

  .banner-btn {
    display: inline-block;
    background: linear-gradient(135deg, #B354F1, #6A14DB);
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 14px 32px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }

  .banner-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .tagline {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(179, 84, 241, 0.5);
    margin-top: 32px;
    text-align: center;
  }

  /* ── DPP TYPE TOGGLE ── */
  .dpp-type-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 auto 48px;
    animation: fadeUp 0.6s 0.12s ease both;
  }
  .dpp-type-btn {
    padding: 9px 22px;
    border-radius: 100px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.1);
    background: #202123;
    color: #8b8fa8;
    transition: all 0.2s;
    letter-spacing: 0.2px;
  }
  .dpp-type-btn.active-std {
    background: rgba(40,183,157,0.12);
    border-color: rgba(40,183,157,0.4);
    color: #28B79D;
  }
  .dpp-type-btn.active-chain {
    background: rgba(179,84,241,0.12);
    border-color: rgba(179,84,241,0.4);
    color: #B354F1;
  }

  /* ── VOLUME PRICING ── */
  .volume-section {
    margin-top: 48px;
    animation: fadeUp 0.6s 0.25s ease both;
  }
  .volume-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #202123;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    font-size: 13px;
  }
  .volume-table th {
    text-align: left;
    padding: 14px 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8b8fa8;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
  }
  .volume-table td {
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    color: #c4c5d0;
  }
  .volume-table tr:last-child td { border-bottom: none; }
  .volume-table tr.highlight-row td {
    background: rgba(179,84,241,0.06);
    color: #fff;
  }

  /* ── ARCH SECTION ── */
  .arch-section {
    margin-top: 80px;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .arch-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 32px;
  }
  @media (max-width: 700px) { .arch-grid { grid-template-columns: 1fr; } }
  .arch-card {
    background: #202123;
    border-radius: 18px;
    padding: 28px;
    border: 1px solid rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
  }
  .arch-card.token1 { border-color: rgba(179,84,241,0.2); }
  .arch-card.token2 { border-color: rgba(40,183,157,0.2); }
  .arch-card-glow {
    position: absolute;
    top: -40px; right: -40px;
    width: 140px; height: 140px;
    border-radius: 50%;
    pointer-events: none;
  }
  .arch-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .arch-name {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.3px;
    margin-bottom: 6px;
  }
  .arch-sub {
    font-size: 12px;
    color: #8b8fa8;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .arch-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 12px;
    gap: 12px;
  }
  .arch-row:last-child { border-bottom: none; }
  .arch-row-key { color: #8b8fa8; font-weight: 500; flex-shrink: 0; }
  .arch-row-val { color: #c4c5d0; text-align: right; line-height: 1.4; }
  .events-wrap {
    margin-top: 20px;
    background: rgba(0,0,0,0.3);
    border-radius: 10px;
    padding: 14px 16px;
  }
  .event-pill {
    display: inline-block;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 6px;
    margin: 3px;
  }

  /* ── INFRA BANNER ── */
  .infra-banner {
    margin-top: 48px;
    background: rgba(40,183,157,0.05);
    border: 1px solid rgba(40,183,157,0.15);
    border-radius: 16px;
    padding: 24px 28px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    animation: fadeUp 0.6s 0.35s ease both;
  }
  .infra-item-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #28B79D;
    margin-bottom: 4px;
  }
  .infra-item-val {
    font-size: 13px;
    font-weight: 600;
    color: #c4c5d0;
  }

  /* ── B&B TREASURY ── */
  .treasury-callout {
    margin-top: 48px;
    background: linear-gradient(135deg, rgba(106,20,219,0.12), rgba(50,27,104,0.2));
    border: 1px solid rgba(179,84,241,0.15);
    border-radius: 16px;
    padding: 28px 32px;
    display: flex;
    gap: 24px;
    align-items: flex-start;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  @media (max-width: 600px) { .treasury-callout { flex-direction: column; } }
  .treasury-icon {
    font-size: 36px;
    flex-shrink: 0;
    line-height: 1;
  }

  /* ── SURVIVABILITY ── */
  .survive-section {
    margin-top: 48px;
    animation: fadeUp 0.6s 0.32s ease both;
  }
  .survive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
    margin-top: 24px;
  }
  .survive-card {
    background: #202123;
    border-radius: 14px;
    padding: 18px 20px;
    border: 1px solid rgba(255,255,255,0.05);
  }
`;


const CheckIcon = ({ className }) => (
  <svg className={`feature-icon ${className}`} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/>
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg className="feature-icon star" viewBox="0 0 16 16" fill="none">
    <path d="M8 2l1.5 3.5 3.5.5-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
);

const BoltIcon = () => (
  <svg className="feature-icon bolt" viewBox="0 0 16 16" fill="none">
    <path d="M9 2L4 9h4l-1 5 5-7H8l1-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

export default function DeStorePricing() {
  const [annual, setAnnual] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const [dppType, setDppType] = useState("blockchain"); // "standard" | "blockchain"

  const growthMonthly = 99;
  const growthAnnual = Math.round(99 * 0.8);
  const growthAnnualTotal = growthAnnual * 12;

  return (
    <>
      <style>{style}</style>
      <div className="pricing-page">

        {/* Header */}
        <div className="header">
          <div className="logo">De<span>Store</span></div>
          <div className="header-eyebrow">Pricing</div>
          <h1 className="header-title">
            Pay for what you <span className="accent">actually use</span>
          </h1>
          <p className="header-sub">
            No setup costs on SME tiers. Issue your first DPP in minutes.
            Scale to enterprise when you're ready.
          </p>
        </div>

        {/* Annual toggle */}
        <div className="toggle-wrap">
          <span
            className={`toggle-label ${!annual ? "active" : ""}`}
            onClick={() => setAnnual(false)}
          >Monthly</span>
          <div
            className={`toggle-pill ${annual ? "on" : ""}`}
            onClick={() => setAnnual(!annual)}
          >
            <div className="toggle-dot" />
          </div>
          <span
            className={`toggle-label ${annual ? "active" : ""}`}
            onClick={() => setAnnual(true)}
          >Annual</span>
          {annual && <span className="save-badge">Save 20%</span>}
        </div>

        {/* DPP Type selector */}
        <div className="dpp-type-wrap">
          <span style={{fontSize:12, color:"#8b8fa8", fontWeight:600, marginRight:4}}>DPP type:</span>
          <button
            className={`dpp-type-btn${dppType === "standard" ? " active-std" : ""}`}
            onClick={() => setDppType("standard")}
          >
            ◈ Standard DPP
          </button>
          <button
            className={`dpp-type-btn${dppType === "blockchain" ? " active-chain" : ""}`}
            onClick={() => setDppType("blockchain")}
          >
            ⛓ Blockchain DPP
          </button>
          {dppType === "standard" && (
            <span style={{fontSize:11, color:"#28B79D", fontWeight:700, padding:"3px 10px", background:"rgba(40,183,157,0.1)", border:"1px solid rgba(40,183,157,0.25)", borderRadius:100}}>
              ESPR compliant · lower cost
            </span>
          )}
          {dppType === "blockchain" && (
            <span style={{fontSize:11, color:"#B354F1", fontWeight:700, padding:"3px 10px", background:"rgba(179,84,241,0.1)", border:"1px solid rgba(179,84,241,0.25)", borderRadius:100}}>
              On-chain · sovereign · premium
            </span>
          )}
        </div>

        {/* DPP type explainer */}
        {dppType === "blockchain" && (
          <div style={{
            maxWidth:640, margin:"0 auto 40px", background:"rgba(179,84,241,0.05)",
            border:"1px solid rgba(179,84,241,0.15)", borderRadius:14,
            padding:"16px 22px", display:"flex", gap:14, alignItems:"flex-start",
            animation:"fadeUp 0.3s ease both"
          }}>
            <span style={{fontSize:22, flexShrink:0}}>⛓</span>
            <div>
              <div style={{fontSize:13, fontWeight:700, marginBottom:5}}>Blockchain DPP — full on-chain sovereignty</div>
              <div style={{fontSize:12, color:"#8b8fa8", lineHeight:1.7}}>
                Two-token ERC-721 architecture on Soneium. Metadata on Arweave — permanent, pay once at mint.
                4 lifecycle events included per DPP. Additional events at $0.01 each.
                <span style={{color:"#B354F1", fontWeight:700}}> ~89% gross margin per DPP.</span>
              </div>
            </div>
          </div>
        )}
        {dppType === "standard" && (
          <div style={{
            maxWidth:640, margin:"0 auto 40px", background:"rgba(40,183,157,0.05)",
            border:"1px solid rgba(40,183,157,0.15)", borderRadius:14,
            padding:"16px 22px", display:"flex", gap:14, alignItems:"flex-start",
            animation:"fadeUp 0.3s ease both"
          }}>
            <span style={{fontSize:22, flexShrink:0}}>◈</span>
            <div>
              <div style={{fontSize:13, fontWeight:700, marginBottom:5}}>Standard DPP — hosted infrastructure</div>
              <div style={{fontSize:12, color:"#8b8fa8", lineHeight:1.7}}>
                Hosted on DeStore infrastructure. EU ESPR compliant. No blockchain costs.
                Lower per-DPP price — ideal for high-volume brands that don't need on-chain proof.
              </div>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="cards-grid">

          {/* STARTER */}
          <div className="card">
            <div className="card-inner">
              <div className="tier-badge starter">◈ Starter</div>
              <div className="tier-name">Pay as you go</div>
              <div className="tier-desc">For small brands getting started. No monthly commitment, no lock-in.</div>

              <div className="price-block">
                <div className="price-main">
                  <span className="currency">$</span>0
                  <span className="period"> /month</span>
                </div>
                <div className="price-per-dpp"><strong>$0.20</strong> per DPP issued</div>
                <div className="price-note" style={{marginTop:6, padding:"6px 10px", background:"rgba(179,84,241,0.07)", borderRadius:8, border:"1px solid rgba(179,84,241,0.15)", display:"inline-block"}}>
                  + $0.80 physical tag = <strong style={{color:"#B354F1"}}>$1.00 total</strong>
                </div>
              </div>

              <button className="cta-btn default">Get started free</button>

              <div className="features-label">What's included</div>
              <ul className="feature-list">
                <li className="feature-item"><CheckIcon className="check" />Up to 500 DPPs/month</li>

                <li className="feature-item"><CheckIcon className="check" />Digital wallet cards (Apple + Google)</li>
                <li className="feature-item"><CheckIcon className="check" />Circular economy actions (Sell / Gift / Recycle / Return)</li>
                <li className="feature-item"><CheckIcon className="check" />Soneium on-chain event log</li>
                <li className="feature-item"><CheckIcon className="check" />DeStore marketplace + FB Marketplace sync</li>
                <li className="feature-item"><CheckIcon className="check" />White-label domain</li>
                <li className="feature-item muted"><CheckIcon className="check" />Self-managed data storage</li>
              </ul>
            </div>
          </div>

          {/* GROWTH */}
          <div className="card featured">
            <div className="card-inner">
              <div className="tier-badge growth">✦ Growth</div>
              <div className="tier-name">Most popular</div>
              <div className="tier-desc">For growing brands issuing volume. 15% off DPP costs, priority support.</div>

              <div className="price-block">
                <div className="price-main">
                  <span className="currency">$</span>
                  {annual ? growthAnnual : growthMonthly}
                  <span className="period"> /month</span>
                </div>
                {annual
                  ? <div className="price-note" style={{marginTop:6, padding:"5px 10px", background:"rgba(40,183,157,0.08)", borderRadius:8, border:"1px solid rgba(40,183,157,0.2)", display:"inline-block", color:"#28B79D", fontWeight:600, fontSize:12}}>
                      Billed as ${growthAnnualTotal}/year · save ${(growthMonthly - growthAnnual) * 12}/yr
                    </div>
                  : <div className="price-note" style={{marginTop:6, color:"#8b8fa8", fontSize:12}}>Billed monthly · switch to annual to save 20%</div>
                }
                <div className="price-per-dpp" style={{marginTop:8}}><strong>$0.17</strong> per DPP <span style={{color:"#28B79D", fontWeight:700}}>· 15% off Starter</span></div>
                <div className="price-note">+ <strong style={{color:"#B354F1"}}>$0.80</strong> / physical tag · <span style={{color:"#6b6b80",fontSize:"11px"}}>admin-configurable</span></div>
              </div>

              <button className="cta-btn primary">{annual ? "Start annual plan" : "Start Growth plan"}</button>

              <div className="features-label">Everything in Starter, plus</div>
              <ul className="feature-list">
                <li className="feature-item"><StarIcon />$0.17/DPP — 15% saving vs Starter</li>
                <li className="feature-item"><StarIcon />Physical tag — $0.80/unit (price set in admin dashboard)</li>
                <li className="feature-item"><StarIcon />Unlimited DPP volume</li>
                <li className="feature-item"><StarIcon />Priority onboarding support</li>
                <li className="feature-item"><StarIcon />Advanced analytics dashboard</li>
                <li className="feature-item"><StarIcon />Webhook integrations (Shopify, Squarespace, etc)</li>
                <li className="feature-item"><StarIcon />White-label domain</li>
                <li className="feature-item muted"><CheckIcon className="check" />Self-managed data storage</li>
              </ul>
            </div>
          </div>

          {/* ENTERPRISE */}
          <div className="card">
            <div className="card-inner">
              <div className="tier-badge enterprise">⬡ Enterprise</div>
              <div className="tier-name">Full sovereignty</div>
              <div className="tier-desc">Private data on your hardware, backed up by DeStore. Full ESPR compliance.</div>

              <div className="price-block">
                <div className="price-main" style={{fontSize: "28px", letterSpacing: "-1px"}}>
                  From <span className="currency" style={{fontSize:"14px"}}>$</span>433
                  <span className="period"> /month</span>
                </div>
                <div className="price-per-dpp"><strong>$0.12</strong> per DPP <span style={{color:"#FF9F46", fontWeight:700}}>· 40% off Starter</span></div>
                <div className="price-note">+ $6–8k one-time setup audit · physical tag $0.80/unit</div>
              </div>

              <button className="cta-btn enterprise-btn">Talk to us</button>

              <div className="features-label">Everything in Growth, plus</div>
              <ul className="feature-list">
                <li className="feature-item"><BoltIcon />$0.12/DPP — 40% saving vs Starter</li>
                <li className="feature-item"><BoltIcon />On-premises Edge Node (Mac Mini at your site)</li>
                <li className="feature-item"><BoltIcon />Private data never leaves your building</li>
                <li className="feature-item"><BoltIcon />One-way encrypted sync via Tailscale</li>
                <li className="feature-item"><BoltIcon />Hardware leased at $150/month — 36 months</li>
                <li className="feature-item"><BoltIcon />Per-sync: $200/mo weekly · $600/mo daily</li>
                <li className="feature-item"><BoltIcon />Full Setup Audit + compliance handover PDF</li>
                <li className="feature-item"><BoltIcon />White-label domain</li>
                <li className="feature-item"><BoltIcon style={{color:"#28B79D"}} />DeStore backup — we hold a secure copy</li>
                <li className="feature-item"><BoltIcon />Dedicated account manager + SLA</li>
              </ul>

              {/* 3yr math */}
              <div className="divider" />
              <button
                onClick={() => setShowMath(!showMath)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#FF9F46",
                  fontSize: "12px",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                {showMath ? "▴" : "▾"} See 3-year cost breakdown
              </button>

              {showMath && (
                <div className="math-block">
                  <div className="math-title">Example · 100k units/yr · weekly sync</div>
                  <div style={{fontSize:11, color:"#8b8fa8", marginBottom:12}}>DPPs billed at $0.12/unit · scales with your volume</div>

                  <div style={{fontSize:11, color:"#8b8fa8", marginBottom:8, letterSpacing:"1px", textTransform:"uppercase"}}>Year 1</div>
                  <div className="math-row"><span>Setup audit (one-time)</span><span>$7,000</span></div>
                  <div className="math-row"><span>Hardware lease</span><span>$1,800</span></div>
                  <div className="math-row"><span>Weekly sync</span><span>$2,400</span></div>
                  <div className="math-row"><span>100k DPPs × $0.12</span><span>$12,000</span></div>
                  <div className="math-row" style={{fontWeight:600, color:"#fff", borderTop:"1px solid rgba(255,159,70,0.15)", paddingTop:6, marginTop:4}}><span>Year 1 total</span><span>$23,200</span></div>

                  <div style={{fontSize:11, color:"#8b8fa8", margin:"12px 0 8px", letterSpacing:"1px", textTransform:"uppercase"}}>Year 2 & 3 (each)</div>
                  <div className="math-row"><span>Hardware lease</span><span>$1,800</span></div>
                  <div className="math-row"><span>Weekly sync</span><span>$2,400</span></div>
                  <div className="math-row"><span>100k DPPs × $0.12</span><span>$12,000</span></div>
                  <div className="math-row" style={{fontWeight:600, color:"#fff", borderTop:"1px solid rgba(255,159,70,0.15)", paddingTop:6, marginTop:4}}><span>Per year (yr 2–3)</span><span>$16,200</span></div>

                  <div className="math-total" style={{marginTop:12}}>
                    <span>Total over 3 years</span>
                    <span style={{color:"#FF9F46"}}>$55,600</span>
                  </div>
                  <div style={{fontSize:11, color:"#8b8fa8", textAlign:"right", marginTop:4}}>
                    ≈ $18,533/year averaged · DPP cost scales with units sold
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* All plans include */}
        <div style={{marginTop: 48, background: "#202123", borderRadius: 20, padding: "32px", border: "1px solid rgba(255,255,255,0.06)", animation: "fadeUp 0.6s 0.25s ease both"}}>
          <div style={{fontSize: "11px", fontWeight: 700, marginBottom: 24, color: "#8b8fa8", letterSpacing: "2px", textTransform: "uppercase"}}>Every plan includes</div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20}}>
            {[
              ["Audited smart contracts", "Thirdweb-verified on-chain security on every DPP"],
              ["Pre-funded transactions", "Zero gas fees for you or your customers — ever"],
              ["Product lifecycle tracking", "Every ownership event logged permanently on-chain"],

              ["Apple & Google Wallet cards", "Consumer DPP included in your DPP price"],
              ["Secondhand marketplace", "1.3% fee on resales — no extra setup"],
              ["EU ESPR compliance", "Built-in lifecycle events meet regulatory requirements"],
              ["Zero crypto UX", "Your customers never need a wallet or crypto knowledge"],
              ["Direct consumer channel", "Own the relationship after the first sale — forever"],
              ["USDC payments", "Stable, borderless payments on every transaction"],
            ].map(([title, sub]) => (
              <div key={title} style={{display:"flex", gap:12, alignItems:"flex-start"}}>
                <div style={{width:6, height:6, borderRadius:"50%", background:"#B354F1", marginTop:5, flexShrink:0}} />
                <div>
                  <div style={{fontSize: 13, fontWeight: 600, marginBottom: 3}}>{title}</div>
                  <div style={{fontSize: 12, color: "#8b8fa8", lineHeight:1.5}}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume pricing */}
        <div className="volume-section">
          <div className="section-title" style={{fontSize:24, marginBottom:8}}>Volume pricing</div>
          <div style={{textAlign:"center", fontSize:13, color:"#8b8fa8", marginBottom:28}}>
            Charged per DPP at registration — not at sale or scan.{" "}
            {dppType === "blockchain" && <span style={{color:"#B354F1", fontWeight:700}}>Blockchain DPP includes 4 lifecycle events. Additional events $0.01 each.</span>}
            {dppType === "standard" && <span style={{color:"#28B79D", fontWeight:700}}>Standard DPP — hosted infrastructure, ESPR compliant.</span>}
          </div>
          <table className="volume-table">
            <thead>
              <tr>
                <th>Volume</th>
                <th>{dppType === "blockchain" ? "Blockchain DPP" : "Standard DPP"}</th>
                <th>Saving vs list</th>
                <th>Gross margin</th>
              </tr>
            </thead>
            <tbody>
              {dppType === "blockchain" ? (
                <>
                  <tr>
                    <td>1 – 999 units</td>
                    <td style={{color:"#fff", fontWeight:700}}>$0.20 / DPP</td>
                    <td style={{color:"#8b8fa8"}}>—</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>~89%</td>
                  </tr>
                  <tr className="highlight-row">
                    <td>1,000 – 9,999 units</td>
                    <td style={{color:"#B354F1", fontWeight:700}}>$0.18 / DPP</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>10% off</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>~90%</td>
                  </tr>
                  <tr>
                    <td>10,000 – 99,999 units</td>
                    <td style={{color:"#fff", fontWeight:700}}>$0.15 / DPP</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>25% off</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>~91%</td>
                  </tr>
                  <tr>
                    <td>100,000+ units</td>
                    <td style={{color:"#FF9F46", fontWeight:700}}>Negotiated</td>
                    <td style={{color:"#FF9F46"}}>Custom</td>
                    <td style={{color:"#FF9F46"}}>Custom</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td>1 – 999 units</td>
                    <td style={{color:"#fff", fontWeight:700}}>$0.12 / DPP</td>
                    <td style={{color:"#8b8fa8"}}>—</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>~92%</td>
                  </tr>
                  <tr className="highlight-row">
                    <td>1,000 – 9,999 units</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>$0.10 / DPP</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>17% off</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>~93%</td>
                  </tr>
                  <tr>
                    <td>10,000 – 99,999 units</td>
                    <td style={{color:"#fff", fontWeight:700}}>$0.08 / DPP</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>33% off</td>
                    <td style={{color:"#28B79D", fontWeight:700}}>~94%</td>
                  </tr>
                  <tr>
                    <td>100,000+ units</td>
                    <td style={{color:"#FF9F46", fontWeight:700}}>Negotiated</td>
                    <td style={{color:"#FF9F46"}}>Custom</td>
                    <td style={{color:"#FF9F46"}}>Custom</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          {dppType === "blockchain" && (
            <div style={{marginTop:12, fontSize:12, color:"#8b8fa8", textAlign:"right"}}>
              Arweave metadata storage: ~$0.01 per product · paid once at mint · permanent forever
            </div>
          )}
          <div style={{marginTop:16, background:"rgba(179,84,241,0.08)", border:"1px solid rgba(179,84,241,0.2)", borderRadius:12, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12}}>
            <div>
              <div style={{fontSize:12, fontWeight:800, color:"#B354F1", marginBottom:3}}>Physical NFC/QR Tag</div>
              <div style={{fontSize:11, color:"#8b8fa8"}}>Attached to product at manufacture · links to DPP · optional add-on per order</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:20, fontWeight:900, color:"#B354F1"}}>$0.80 <span style={{fontSize:11, fontWeight:400, color:"#8b8fa8"}}>/unit</span></div>
              <div style={{fontSize:10, color:"#6b6b80"}}>Admin-configurable · update in dashboard</div>
            </div>
          </div>
        </div>

        {/* Blockchain Architecture section */}
        {dppType === "blockchain" && (
          <div className="arch-section">
            <div style={{textAlign:"center", marginBottom:8}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:"#B354F1", marginBottom:10}}>Under the hood</div>
              <div className="section-title" style={{fontSize:28}}>Two-Token Architecture</div>
              <div style={{fontSize:13, color:"#8b8fa8", maxWidth:520, margin:"10px auto 0", lineHeight:1.7}}>
                Every Blockchain DPP mints two distinct tokens. One held by the brand forever. One held by the consumer. Separate, sovereign, permanent.
              </div>
            </div>

            <div className="arch-grid">
              {/* Token 1 */}
              <div className="arch-card token1">
                <div className="arch-card-glow" style={{background:"radial-gradient(circle, rgba(179,84,241,0.15) 0%, transparent 70%)"}}/>
                <div className="arch-label" style={{color:"#B354F1"}}>Token 1 · ERC-721 Soulbound</div>
                <div className="arch-name">DPP Token</div>
                <div className="arch-sub">The immutable product record. Minted at manufacture. Never leaves the brand wallet. The source of truth for the physical product's identity and lifecycle.</div>
                <div className="arch-row"><span className="arch-row-key">Standard</span><span className="arch-row-val">ERC-721 soulbound</span></div>
                <div className="arch-row"><span className="arch-row-key">Held by</span><span className="arch-row-val" style={{color:"#B354F1"}}>Brand wallet · permanent</span></div>
                <div className="arch-row"><span className="arch-row-key">Transfers</span><span className="arch-row-val">Never</span></div>
                <div className="arch-row"><span className="arch-row-key">Metadata</span><span className="arch-row-val">Arweave · permanent · ~$0.01</span></div>
                <div className="arch-row"><span className="arch-row-key">Chain</span><span className="arch-row-val">Base (primary)</span></div>
                <div className="arch-row"><span className="arch-row-key">Minted</span><span className="arch-row-val">Batch at manufacture</span></div>
                <div className="events-wrap">
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:"#8b8fa8", marginBottom:8}}>Lifecycle events emitted on-chain</div>
                  {["MANUFACTURED","FIRST_SALE","RESALE","REPAIR","GIFTED","RETURNED","RECYCLED"].map(e => (
                    <span key={e} className="event-pill" style={{background:"rgba(179,84,241,0.1)", color:"#B354F1", border:"1px solid rgba(179,84,241,0.2)"}}>{e}</span>
                  ))}
                </div>
              </div>

              {/* Token 2 */}
              <div className="arch-card token2">
                <div className="arch-card-glow" style={{background:"radial-gradient(circle, rgba(40,183,157,0.12) 0%, transparent 70%)"}}/>
                <div className="arch-label" style={{color:"#28B79D"}}>Token 2 · ERC-721 Transferable</div>
                <div className="arch-name">Ownership Claim</div>
                <div className="arch-sub">The consumer's proof of ownership. Minted to their smart wallet at first sale. Moves freely between wallets on resale. Burns on recycle or return.</div>
                <div className="arch-row"><span className="arch-row-key">Standard</span><span className="arch-row-val">ERC-721 transferable</span></div>
                <div className="arch-row"><span className="arch-row-key">Held by</span><span className="arch-row-val" style={{color:"#28B79D"}}>Consumer smart wallet</span></div>
                <div className="arch-row"><span className="arch-row-key">Transfers</span><span className="arch-row-val">On resale · consumer controls</span></div>
                <div className="arch-row"><span className="arch-row-key">References</span><span className="arch-row-val">DPP Token ID + brand address</span></div>
                <div className="arch-row"><span className="arch-row-key">Burns</span><span className="arch-row-val">On recycle or return</span></div>
                <div className="arch-row"><span className="arch-row-key">Consumer wallet</span><span className="arch-row-val">Email/social login via Thirdweb</span></div>
                <div className="events-wrap">
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:"#8b8fa8", marginBottom:8}}>Consumer interface</div>
                  {["Apple Wallet card","Google Wallet card","Push notifications","Block explorer link","Arweave DPP link","Lifecycle actions"].map(e => (
                    <span key={e} className="event-pill" style={{background:"rgba(40,183,157,0.08)", color:"#28B79D", border:"1px solid rgba(40,183,157,0.2)"}}>{e}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Resale flow */}
            <div style={{marginTop:20, background:"#202123", borderRadius:14, padding:"22px 28px", border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#8b8fa8", marginBottom:16}}>Resale settlement flow</div>
              <div style={{display:"flex", gap:0, alignItems:"center", flexWrap:"wrap"}}>
                {[
                  {step:"Buyer pays", sub:"USDC on-chain", col:"#B354F1"},
                  {step:"→"},
                  {step:"RESALE event", sub:"emitted on DPP Token", col:"#B354F1"},
                  {step:"→"},
                  {step:"DB updated", sub:"new owner record", col:"#8b8fa8"},
                  {step:"→"},
                  {step:"Wallet card", sub:"updated to new owner", col:"#28B79D"},
                  {step:"→"},
                  {step:"B&B Treasury", sub:"$0.01 USDC", col:"#6A14DB"},
                ].map((item, i) => (
                  item.step === "→"
                    ? <div key={i} style={{color:"#343540", fontSize:20, fontWeight:300, margin:"0 10px"}}>→</div>
                    : <div key={i} style={{textAlign:"center"}}>
                        <div style={{fontSize:12, fontWeight:700, color:item.col}}>{item.step}</div>
                        <div style={{fontSize:10, color:"#8b8fa8", marginTop:2}}>{item.sub}</div>
                      </div>
                ))}
              </div>
              <div style={{marginTop:14, fontSize:11, color:"#8b8fa8"}}>
                No NFT transfer required for resale. USDC settlement is the immutable proof. Brand has zero involvement. Consumer receives updated wallet card.
              </div>
            </div>
          </div>
        )}

        {/* B&B Treasury */}
        <div className="treasury-callout">
          <div className="treasury-icon">🏦</div>
          <div>
            <div style={{fontSize:14, fontWeight:800, marginBottom:6}}>B&amp;B Treasury</div>
            <div style={{fontSize:12, color:"#8b8fa8", lineHeight:1.7, maxWidth:580}}>
              A dedicated Soneium wallet receives <strong style={{color:"#B354F1"}}>$0.01 USDC</strong> on every lifecycle event DeStore touches — DPP issuance, secondary sale, gift, return, destroy/recycle. The treasury accumulates USDC passively. When the DeStore token launches, this becomes the buyback-and-burn wallet, creating a direct link between platform activity and token value.
            </div>
            <div style={{marginTop:12, display:"flex", gap:10, flexWrap:"wrap"}}>
              {["DPP issuance","Secondary sale","Gift","Return","Recycle"].map(e => (
                <span key={e} style={{fontSize:10, fontWeight:700, letterSpacing:"1px", padding:"3px 10px", background:"rgba(106,20,219,0.15)", border:"1px solid rgba(179,84,241,0.2)", borderRadius:100, color:"#B354F1"}}>{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Survivability */}
        <div className="survive-section">
          <div style={{textAlign:"center", marginBottom:6}}>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:"#28B79D", marginBottom:10}}>Built to outlast us</div>
            <div className="section-title" style={{fontSize:24}}>If DeStore closes, your DPPs survive</div>
          </div>
          <div className="survive-grid">
            {[
              {icon:"⛓", title:"Soneium keeps running", desc:"DPP Token lives on the blockchain. No DeStore infrastructure required to read or verify it."},
              {icon:"🪨", title:"Arweave is permanent", desc:"Product metadata and images stored on Arweave. Pay once at mint — accessible forever at the same URL."},
              {icon:"📧", title:"Email receipt is self-contained", desc:"Consumer email includes token ID and Arweave link. Full proof of ownership with no DeStore involvement."},
              {icon:"🔓", title:"Open standard", desc:"ERC-721 on an EVM chain. Any wallet, any explorer, any developer can read these records independently."},
            ].map(({icon, title, desc}) => (
              <div className="survive-card" key={title}>
                <div style={{fontSize:24, marginBottom:10}}>{icon}</div>
                <div style={{fontSize:13, fontWeight:700, marginBottom:6}}>{title}</div>
                <div style={{fontSize:12, color:"#8b8fa8", lineHeight:1.6}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div className="infra-banner">
          <div>
            <div className="infra-item-label">Running cost</div>
            <div className="infra-item-val">~$13 / month total</div>
          </div>
          <div>
            <div className="infra-item-label">Hosting</div>
            <div className="infra-item-val">Mac Mini · Docker Compose</div>
          </div>
          <div>
            <div className="infra-item-label">Public access</div>
            <div className="infra-item-val">Cloudflare Tunnel</div>
          </div>
          <div>
            <div className="infra-item-label">Chain RPC</div>
            <div className="infra-item-val">Soneium via Alchemy free tier</div>
          </div>
          <div>
            <div className="infra-item-label">Storage</div>
            <div className="infra-item-val">Arweave · ~$0.01/product</div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <div className="section-title">Common questions</div>
          <div className="faq-grid">
            {[
              ["What's a DPP?", "A Digital Product Passport — a permanent, scannable record of a product's identity, ownership history, and lifecycle. Required under EU ESPR regulations for many product categories from 2026."],
              ["Who pays for the wallet card?", "You do — it's included in the DPP price. Your customers never pay anything to receive or use their wallet card."],
              ["What does the enterprise sync actually do?", "Your sensitive product data (formulations, supply chain, cost data) stays on a Mac Mini at your site. We only ever receive hashed compliance proofs via an encrypted one-way sync. You can audit every sync event."],
              ["How does the hardware lease work?", "We finance 2× Mac Minis through Apple Business at 0% interest and lease them to you at $150/month over 36 months. At the end you can renew, buy out, or upgrade. Your cost is opex, not capex."],
              ["What's the secondary sales fee for?", "When a product sold with a DeStore DPP is resold through the marketplace, we take 1.3% of the sale price. 1% is DeStore revenue, 0.3% is Thirdweb's payment processing fee."],
              ["Can I start on Starter and upgrade?", "Yes. All your DPP data and wallet cards carry over. Upgrading to Growth or Enterprise is instant — no migration, no disruption."],
              ["What's the difference between Standard and Blockchain DPP?", "Standard DPP is hosted on DeStore infrastructure — ESPR compliant, lower cost, no crypto. Blockchain DPP uses a two-token ERC-721 architecture on Soneium with metadata on Arweave — permanent, sovereign, verifiable by anyone without DeStore."],
              ["What are the two tokens?", "Token 1 is a soulbound DPP Token held permanently by the brand wallet — it logs every lifecycle event on-chain and never transfers. Token 2 is an Ownership Claim minted to the consumer at first sale — it moves between wallets on resale and burns on recycle or return."],
              ["Does my customer need a crypto wallet?", "No. They receive an Apple Wallet or Google Wallet card via email. That card is their interface — product image, lifecycle actions, Soneium explorer link. No seed phrases, no gas, no crypto knowledge required."],
              ["What happens to my DPPs if DeStore shuts down?", "Nothing. The DPP Token lives on Soneium which runs independently. Metadata is on Arweave — permanently accessible at the same URL. Your customer's email receipt contains their token ID and Arweave link. No DeStore infrastructure needed to verify any record."],
            ].map(([q, a]) => (
              <div className="faq-item" key={q}>
                <div className="faq-q">{q}</div>
                <div className="faq-a">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-banner">
          <div className="banner-title">Ready to issue your first DPP?</div>
          <div className="banner-sub">Start on Starter. No credit card. First 10 DPPs on us.</div>
          <button className="banner-btn">Get started free →</button>
        </div>

        <div className="tagline">Roam Free ◈</div>

      </div>
    </>
  );
}
