export async function onRequestGet(context) {
  const id = (context.params?.id || "").toString().replace(/[^a-zA-Z0-9_-]/g, "");
  if (!id) {
    return new Response("Missing id", { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const target = "https://cdo.vide-y.cyou/v/?id=" + encodeURIComponent(id);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>Video</title>
  <style>
    html,body{height:100%;margin:0;background:#000;overflow:hidden}
    iframe{position:fixed;inset:0;width:100vw;height:100vh;border:0;background:#000}
  </style>
</head>
<body>
  <iframe
    src="${target}"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    referrerpolicy="no-referrer"
  ></iframe>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
