# DeStore QR Resolver Architecture
**ADR-001 — Canonical DPP Resolution & Mint Pipeline**
*Established: 23 March 2026 · Last updated: 23 March 2026*

---

## Decision

All DeStore QR codes encode `id.destore.network` as the canonical resolver. Brand domains are redirect targets only. This decision is permanent and cannot be overridden at the brand or partner level.

SBT minting is deferred 14 days after DPP finalisation via an automated Cloudflare Queue pipeline. No manual intervention required.

---

## Why

A QR code printed on a physical product is **permanent and irrecallable**. Products circulate for 10–20 years. If a brand lets their domain lapse, rebrands, or churns off DeStore, every QR code ever printed becomes a dead link — permanently.

ESPR regulation requires DPP data to remain accessible for the full product lifecycle. DeStore is the **permanent keeper of record**.

The 14-day cooling off period allows brands to correct data errors before the DPP is permanently anchored on-chain, and provides a clean cancellation/refund window.

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

## DPP Lifecycle — Status States

```
draft        → building in platform, not yet paid
pending      → paid, QR live, resolver active, not yet finalised
cooling_off  → finalised, 14-day window open (cancellable)
minting      → queue fired, Thirdweb Engine mint in progress
minted       → SBT on-chain, data locked permanently
cancelled    → cancelled within 14-day window, no mint
archived     → brand churned, R2 snapshot serving
destroyed    → end-of-life/recycle event logged
```

---

## Full Pipeline

```
Brand pays + finalises DPP
  ↓
POST mint.destore.network/finalise
  ↓
KV: DPP_MINT_STATUS → { status: "cooling_off", mintAt: now+14days }
KV: DPP_RESOLVER_ROUTING → { status: "cooling_off" }
  ↓
Cloudflare Queue: enqueue { dppId, mintAt, attempt: 1, maxHops: 28 }
  ↓ (12-hour hops × 28 = 14 days)
Queue consumer checks: is mintAt passed?
  → No: re-enqueue for another 12 hours
  → Yes: call Thirdweb Engine mintTo(brandWallet)
  ↓
SBT minted on Base (ERC-721A)
KV: DPP_MINT_STATUS → { status: "minted", txHash }
KV: DPP_RESOLVER_ROUTING → { status: "minted", txHash }
n8n webhook: dpp_minted event fired
```

**Cancellation:** Brand calls `POST mint.destore.network/cancel` within 14 days. Queue hop chain checks status each hop — if `cancelled`, silently stops.

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

The routing table lives in KV — not D1 — so it scales to 100,000 reads/second globally.

---

## Brand Domain Tiers

| Tier | Price | Camera Shows | Controlled By |
|---|---|---|---|
| **Entry** | $497 USD | `put-your-domain-here.com` | DeStore — contained, isolated domain |
| **Hero** | $2,997 USD | `yourbrand.destore.network` | DeStore — permanent branded subdomain |
| **Done For You** | $9,997 USD | `yourbrand.destore.network` | DeStore — white glove setup |
| **Enterprise** | $25,000+ USD/yr | `scan.yourbrand.com` | Brand CNAME + Cloudflare for SaaS |

Cloudflare for SaaS: first 100 custom hostnames free, then $0.10/month per hostname.

---

## Live Cloudflare Infrastructure

**Account:** `josiah@destore.network` · ID: `0aea812fa2cca191c0468f51f30955c1`

### Workers

| Worker | Route | Version ID | Status |
|---|---|---|---|
| `id-resolver` | `id.destore.network/*` | `77c23874-e030-4640-860d-06d57dc60961` | ✅ Live |
| `dpp-mint-queue` | `mint.destore.network/*` | `940cabfe-c761-43b3-894a-51b5b6413976` | ✅ Live |

### KV Namespaces

| Namespace | ID | Purpose |
|---|---|---|
| `DPP_RESOLVER_ROUTING` | `2fd89587c339408bb2c2e59cdb76dedd` | GTIN → brand routing table |
| `DPP_MINT_STATUS` | `78c9ac77c28746d28cd4d4435b174efb` | 14-day cooling off + mint status |

### Queues

| Queue | Purpose |
|---|---|
| `dpp-mint-queue` | 14-day hop chain (28 × 12hr hops) → auto mint trigger |
| `dpp-mint-dlq` | Dead letter queue — failed mints for inspection |

### DNS

| Record | Type | Zone ID | Status |
|---|---|---|---|
| `id.destore.network` | CNAME → `destore.workers.dev` (proxied) | `054ac18b76fe6ea9ab718d8673c59e20` | ✅ Live |
| `mint.destore.network` | Worker route | `054ac18b76fe6ea9ab718d8673c59e20` | ✅ Live |
| `put-your-domain-here.com` | Nameserver propagation in progress | pending | ⏳ Propagating |

### R2

| Bucket | Purpose | Status |
|---|---|---|
| `destore-dpp-archive` | DPP JSON snapshots — disaster recovery + churn archival | ⚠️ Enable R2 in Dashboard first |

---

## mint-queue API Endpoints

**Finalise DPP — starts 14-day timer:**
```
POST https://mint.destore.network/finalise
{ dppId, gtin14, tokenId, brandWallet, brandId, tier, resolvedUrl, contractAddress? }
```

**Cancel within window:**
```
POST https://mint.destore.network/cancel
{ dppId, brandWallet, reason? }
```

**Check status:**
```
GET https://mint.destore.network/status?dppId=xxx
→ { status, finalizedAt, mintAt, daysRemainingInWindow, canCancel, txHash? }
```

---

## Secrets — Set Before First Mint

```bash
cd mint-queue
wrangler secret put THIRDWEB_ENGINE_KEY
wrangler secret put CONTRACT_ADDRESS
wrangler secret put BACKEND_WALLET_ADDRESS
wrangler secret put BB_TREASURY_WALLET
wrangler secret put N8N_WEBHOOK_MINT_DONE
```

---

## R2 Snapshot Requirement

Every DPP finalisation must write a snapshot to R2 as a **required step** — not optional.

```
r2://destore-dpp-archive/{brand-id}/{GTIN-14}/{tokenId}.json
```

Written at finalisation. Immutable. Serves as fallback for churned brands indefinitely.

---

## QR Generator Rule

The base URL in the QR Generator is a **constant in the codebase**, not a variable pulled from brand settings. The UI may display the brand's vanity domain as a preview, but the actual QR data always encodes the tier-appropriate resolver URL.

---

## Remaining Build Order

| Priority | Action |
|---|---|
| 🔴 **Now** | Enable R2 in Dashboard → `wrangler r2 bucket create destore-dpp-archive` |
| 🔴 **Now** | Wire `put-your-domain-here.com` once nameserver propagation completes |
| 🟠 **Before first brand** | Set Thirdweb Engine secrets in `dpp-mint-queue` Worker |
| 🟠 **Before first brand** | T&Cs clause: DeStore retains right to serve archived DPP data post-churn |
| 🟠 **Before first mint** | R2 snapshot write added to DPP finalisation flow as required step |
| 🟡 **Before public launch** | Full resolver Worker: AI 90 keccak256 validation + R2 fallback chain |
| 🟡 **Before public launch** | GS1 resolver registry: register `id.destore.network` at resolver.gs1.org |
| 🟢 **Built into QR Generator** | Base URL locked to tier domain — not a configurable field |

---

## GitHub Commits (23 March 2026)

| Commit | Description |
|---|---|
| `ae1bdc0` | `docs: ADR-001 QR resolver architecture` |
| `9e40123` | `feat: dpp-mint-queue Worker — 14-day cooling off period` |

---

*DeStore Network Pty Ltd · josiah@destore.network*
