export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const referer = request.headers.get("referer") || "";
  const ALLOW_HOST = "vidstream"; // change to your domain substring

  // Optional template: only applies if you later serve mp4/m4v from your own domain.
  if (url.pathname.endsWith(".mp4") || url.pathname.endsWith(".m4v")) {
    if (!referer.includes(ALLOW_HOST)) {
      return new Response("Forbidden", { status: 403 });
    }
  }
  return next();
}
