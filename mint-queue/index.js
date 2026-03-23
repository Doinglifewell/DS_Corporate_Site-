export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
    if (request.method === "OPTIONS") return new Response(null, {headers:cors});
    const json = (d,s=200) => new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...cors}});

    if (request.method === "POST" && url.pathname === "/finalise") {
      const body = await request.json();
      const {dppId,gtin14,tokenId,brandWallet,brandId,tier,resolvedUrl} = body;
      if (!dppId||!gtin14||!tokenId||!brandWallet||!brandId||!tier||!resolvedUrl)
        return json({error:"Missing required fields"},400);
      const now = Date.now();
      const mintAt = now + (14*24*60*60*1000);
      const status = {dppId,gtin14,tokenId,brandWallet,brandId,tier,resolvedUrl,status:"cooling_off",finalizedAt:new Date(now).toISOString(),mintAt:new Date(mintAt).toISOString()};
      await env.DPP_MINT_STATUS.put(dppId, JSON.stringify(status));
      const routing = await env.DPP_RESOLVER_ROUTING.get(gtin14);
      if (routing) { const r=JSON.parse(routing); r.status="cooling_off"; r.mintAt=status.mintAt; await env.DPP_RESOLVER_ROUTING.put(gtin14,JSON.stringify(r)); }
      await env.DPP_MINT_QUEUE.send({type:"mint_check",dppId,mintAt,attempt:1,maxHops:28},{delaySeconds:43200});
      return json({success:true,dppId,status:"cooling_off",mintAt:status.mintAt,message:`SBT will auto-mint on ${new Date(mintAt).toDateString()} unless cancelled.`});
    }

    if (request.method === "POST" && url.pathname === "/cancel") {
      const {dppId,brandWallet,reason} = await request.json();
      if (!dppId) return json({error:"Missing dppId"},400);
      const raw = await env.DPP_MINT_STATUS.get(dppId);
      if (!raw) return json({error:"DPP not found"},404);
      const s = JSON.parse(raw);
      if (s.status==="minted") return json({error:"Already minted"},409);
      if (s.status==="cancelled") return json({error:"Already cancelled"},409);
      if (s.status!=="cooling_off") return json({error:`Cannot cancel: ${s.status}`},409);
      if (brandWallet && s.brandWallet!==brandWallet) return json({error:"Unauthorised"},403);
      s.status="cancelled"; s.cancelledAt=new Date().toISOString(); s.cancelReason=reason||"Brand requested";
      await env.DPP_MINT_STATUS.put(dppId,JSON.stringify(s));
      return json({success:true,dppId,status:"cancelled",cancelledAt:s.cancelledAt});
    }

    if (request.method === "GET" && url.pathname === "/status") {
      const dppId = url.searchParams.get("dppId");
      if (!dppId) return json({error:"Missing dppId"},400);
      const raw = await env.DPP_MINT_STATUS.get(dppId);
      if (!raw) return json({error:"Not found"},404);
      const s = JSON.parse(raw);
      const daysLeft = Math.max(0,Math.ceil((new Date(s.mintAt).getTime()-Date.now())/(86400000)));
      return json({...s,daysRemainingInWindow:daysLeft,canCancel:s.status==="cooling_off"&&Date.now()<new Date(s.mintAt).getTime()});
    }

    return json({error:"Not found"},404);
  },

  async queue(batch, env) {
    for (const msg of batch.messages) {
      try { await processMsg(msg.body, env); msg.ack(); }
      catch(e) { console.error(e); msg.retry(); }
    }
  }
};

async function processMsg(msg, env) {
  const {type,dppId,mintAt,attempt,maxHops} = msg;
  if (type !== "mint_check") return;
  const raw = await env.DPP_MINT_STATUS.get(dppId);
  if (!raw) return;
  const s = JSON.parse(raw);
  if (s.status==="cancelled"||s.status==="minted") return;
  if (Date.now() < mintAt && attempt < maxHops) {
    await env.DPP_MINT_QUEUE.send({type:"mint_check",dppId,mintAt,attempt:attempt+1,maxHops},{delaySeconds:43200});
    return;
  }
  s.status="minting"; s.mintingAt=new Date().toISOString();
  await env.DPP_MINT_STATUS.put(dppId,JSON.stringify(s));
  const txHash = await mintSBT(s, env);
  s.status="minted"; s.mintedAt=new Date().toISOString(); s.txHash=txHash;
  await env.DPP_MINT_STATUS.put(dppId,JSON.stringify(s));
  const routing = await env.DPP_RESOLVER_ROUTING.get(s.gtin14);
  if (routing) { const r=JSON.parse(routing); r.status="minted"; r.txHash=txHash; await env.DPP_RESOLVER_ROUTING.put(s.gtin14,JSON.stringify(r)); }
  if (env.N8N_WEBHOOK_MINT_DONE) {
    await fetch(env.N8N_WEBHOOK_MINT_DONE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"dpp_minted",dppId,gtin14:s.gtin14,tokenId:s.tokenId,brandId:s.brandId,txHash,mintedAt:s.mintedAt})}).catch(console.error);
  }
}

async function mintSBT(s, env) {
  const res = await fetch(`${env.THIRDWEB_ENGINE_URL}/contract/${env.CHAIN_ID}/${env.CONTRACT_ADDRESS}/erc721/mint-to`,{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${env.THIRDWEB_ENGINE_KEY}`,"x-backend-wallet-address":env.BACKEND_WALLET_ADDRESS},
    body:JSON.stringify({receiver:s.brandWallet,metadata:{name:`DeStore DPP — ${s.gtin14}`,description:`Digital Product Passport for GTIN ${s.gtin14}`,external_url:s.resolvedUrl,attributes:[{trait_type:"GTIN-14",value:s.gtin14},{trait_type:"Token ID",value:s.tokenId},{trait_type:"Standard",value:"GS1 Digital Link"},{trait_type:"Regulation",value:"ESPR DPP"}]}})
  });
  if (!res.ok) throw new Error(await res.text());
  const r = await res.json();
  return r.result?.transactionHash || "pending";
}
