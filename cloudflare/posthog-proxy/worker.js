const API_HOST = "us.i.posthog.com";
const ASSET_HOST = "us-assets.i.posthog.com";
const ANALYTICS_MODE_HEADER = "X-Vrajmpatel-Analytics-Mode";
const TESTING_MODE = "testing";
const ingestionPath = /^\/(?:e|i|s)\//;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

function withCors(response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(corsHeaders)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function isTestingIngestion(request, pathname) {
  return (
    request.headers.get(ANALYTICS_MODE_HEADER) === TESTING_MODE &&
    request.method === "POST" &&
    ingestionPath.test(pathname)
  );
}

function excludedTestingResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      "Cache-Control": "no-store",
      "X-Vrajmpatel-Analytics-Excluded": TESTING_MODE,
    },
  });
}

async function retrieveAsset(request, pathname, ctx) {
  let response = await caches.default.match(request);
  if (!response) {
    response = await fetch(`https://${ASSET_HOST}${pathname}`);
    ctx.waitUntil(caches.default.put(request, response.clone()));
  }
  return response;
}

async function forwardRequest(request, pathWithSearch) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const originHeaders = new Headers(request.headers);
  originHeaders.delete("cookie");
  originHeaders.set("X-Forwarded-For", ip);

  const originRequest = new Request(`https://${API_HOST}${pathWithSearch}`, {
    method: request.method,
    headers: originHeaders,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.arrayBuffer()
        : null,
    redirect: request.redirect,
  });

  return fetch(originRequest);
}

async function handleRequest(request, ctx) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(request.url);
  if (isTestingIngestion(request, url.pathname)) {
    return excludedTestingResponse();
  }

  const pathWithParams = url.pathname + url.search;
  const response =
    url.pathname.startsWith("/static/") || url.pathname.startsWith("/array/")
      ? await retrieveAsset(request, pathWithParams, ctx)
      : await forwardRequest(request, pathWithParams);

  return withCors(response);
}

export default {
  async fetch(request, _env, ctx) {
    return handleRequest(request, ctx);
  },
};
