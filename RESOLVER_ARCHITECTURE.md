# DeStore QR Resolver Architecture
**ADR-001 — Canonical DPP Resolution**
*Established: 23 March 2026*

---

## Decision

All DeStore QR codes encode `id.destore.network` as the canonical resolver. Brand domains are redirect targets only. This decision is permanent and cannot be overridden at the brand or partner level.

---

## Why

A QR code printed on a physical product is **permanent and irrecallable**. Products circulate for 10–20 years. If a brand lets their domain lapse, rebrands, or churns off DeStore, every QR code ever printed becomes a dead link — permanently.

ESPR regulation requires DPP data to remain accessible for the full product lifecycle. DeStore is the **permanent keeper of record**.

---

## Canonical QR URL Formula

```
https://id.destore.network/01/{GTIN-14}/21/{tokenId}?90={keccak256_20char}
```

| Application Identifier | Meaning |
|---|---|
| `AI 01` | GTIN-14 — product identifier |
| `AI 21` | On-chain ERC-721A token ID (GS1 serial) |
| `AI 90` | keccak256(contract + tokenId + timestamp), truncated to 20 hex chars |

The resolver rejects all requests without a valid AI 90 hash.

---

## Resolver Fallback Chain

```
Request hits id.destore.network
  ↓
1. Validate AI 90 hash          → reject if invalid (anti-spoofing)
  ↓
2. KV lookup: GTIN → brand      → DPP_RESOLVER_ROUTING namespace
  ↓
3. Brand active + domain live?  → 302 redirect to brand result screen
  ↓
4. Brand domain unreachable?    → serve R2 archived DPP snapshot
  ↓
5. Brand churned?               → serve R2 archive with "archived" banner
  ↓
6. No data found?               → branded 404 with DeStore contact
```

The routing table lives in KV — not D1 — so it scales to 100,000 reads/second globally and is not dependent on any single brand's database.

---

## Brand Domain Tiers

| Tier | Camera Shows | Controlled By |
|---|---|---|
| **Free** | `id.destore.network` | DeStore — permanent |
| **Growth** | `yourbrand.destore.network` | DeStore — permanent, branded subdomain |
| **Enterprise** | `scan.yourbrand.com` | Brand CNAME → Cloudflare for SaaS. T&Cs require maintained DNS. $0.10/month per hostname after first 100 free. |

The canonical backup at `id.destore.network` always exists for every issued QR regardless of tier, written to KV at mint time.

---

## Cloudflare Infrastructure

| Resource | Name | ID | Status |
|---|---|---|---|
| Worker | `id-resolver` | `eabcc55a-6c6a-49da-90de-c38678e2864a` | ✅ Live |
| Worker URL | `id-resolver.destore.workers.dev` | — | ✅ Live |
| Worker Route | `id.destore.network/*` | Zone: `054ac18b76fe6ea9ab718d8673c59e20` | ✅ Live |
| DNS Record | `id.destore.network` CNAME | `77f38ae973e22bf06f30557cf3ae9b51` | ✅ Live |
| KV Namespace | `DPP_RESOLVER_ROUTING` | `2fd89587c339408bb2c2e59cdb76dedd` | ✅ Live |
| R2 Bucket | `destore-dpp-archive` | — | ⚠️ Pending — enable R2 in Cloudflare Dashboard |
| Account | `josiah@destore.network` | `0aea812fa2cca191c0468f51f30955c1` | ✅ Active |

---

## R2 Snapshot Requirement

Every DPP issuance flow must write a snapshot to R2 as a **required step** — not optional. This is the disaster recovery layer.

```
r2://destore-dpp-archive/{brand-id}/{GTIN-14}/{tokenId}.json
```

Written at mint time. Immutable. Serves as fallback for churned brands indefinitely.

---

## Remaining Build Order

| Priority | Action |
|---|---|
| 🔴 **Now** | Enable R2 in Cloudflare Dashboard → run `wrangler r2 bucket create destore-dpp-archive` |
| 🟠 **Before first brand** | T&Cs clause: DeStore retains right to serve archived DPP data post-churn |
| 🟠 **Before first mint** | R2 snapshot write added to DPP issuance flow as required step |
| 🟡 **Before public launch** | Full resolver Worker: AI 90 validation + KV routing + R2 fallback chain |
| 🟢 **Built into QR Generator** | Base URL locked to `id.destore.network` — not a configurable field |

---

## QR Generator Rule

The base URL in the QR Generator is a **constant in the codebase**, not a variable pulled from brand settings. The UI may display the brand's domain as a preview, but the actual QR code data always encodes the DeStore resolver URL.

---

*DeStore Network Pty Ltd · josiah@destore.network*
