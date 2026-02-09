export async function onRequest(context) {
  const { request } = context;
  const urlParam = new URL(request.url).searchParams.get("url");

  if (!urlParam) {
    return new Response(JSON.stringify({ error: "No URL provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const start = Date.now();
    const res = await fetch(urlParam, {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeout);
    const responseTime = Date.now() - start;

    return new Response(JSON.stringify({
      status: res.status,
      statusText: res.statusText,
      responseTime
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      status: "ERROR",
      message: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
