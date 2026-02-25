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
    if (!url.pathname.startsWith("/voicevox")) {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    if (!ORIGIN) {
      return new Response("Missing ORIGIN", { status: 500, headers: corsHeaders });
    }

    const path = url.pathname.replace(/^\/voicevox/, "") || "/";
    let targetUrl;
    try {
      targetUrl = new URL(path, ORIGIN);
      targetUrl.search = url.search;
    } catch {
      return new Response("Invalid ORIGIN", { status: 500, headers: corsHeaders });
    }

    console.log("voicevox target", targetUrl.toString());

    const forwardHeaders = new Headers();
    const contentType = request.headers.get("Content-Type");
    const authorization = request.headers.get("Authorization");
    const accept = request.headers.get("Accept");
    const acceptLanguage = request.headers.get("Accept-Language");

    if (contentType) forwardHeaders.set("Content-Type", contentType);
    if (authorization) forwardHeaders.set("Authorization", authorization);
    if (accept) forwardHeaders.set("Accept", accept);
    if (acceptLanguage) forwardHeaders.set("Accept-Language", acceptLanguage);

    const method = request.method.toUpperCase();
    const hasBody = method !== "GET" && method !== "HEAD";

    const resp = await fetch(targetUrl.toString(), {
      method,
      headers: forwardHeaders,
      body: hasBody ? request.body : null,
    });

    try {
      const preview = await resp.clone().text();
      console.log(
        "voicevox resp",
        resp.status,
        resp.headers.get("server"),
        preview.slice(0, 120),
      );
    } catch (err) {
      console.log("voicevox resp preview failed", String(err));
    }

    const headers = new Headers(resp.headers);
    Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));

    return new Response(resp.body, {
      status: resp.status,
      headers,
    });
  },
};
