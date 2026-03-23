export default {
  async fetch(request, env) {
    return new Response(JSON.stringify({
      status: "DeStore DPP Resolver",
      domain: "id.destore.network",
      message: "Permanent QR resolver — backend coming soon"
    }, null, 2), { headers: { "Content-Type": "application/json" } });
  }
};
