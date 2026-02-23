export default {
  async fetch(request, env) {
    const ORIGIN = env.ORIGIN;

    const origin = request.headers.get("Origin") || "*";
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/voicevox/, "") || "/";
    const targetUrl = new URL(ORIGIN + path);
    targetUrl.search = url.search;

    const resp = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    const headers = new Headers(resp.headers);
    Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));

    return new Response(resp.body, {
      status: resp.status,
      headers,
    });
  },
};// trigger deploy
