export async function onRequest(context) {
  const id = context.params.id;
  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  // === Monetization / Tracking ===
  const SMARTLINK = "https://harbourbreederdump.com/an29v43y4m?key=549781a632ef3b8389ad01c914a1ee3a";

  // Popunder
  const POPUNDER = `<script type="text/javascript" src="https://harbourbreederdump.com/2e/a1/21/2ea12153a74996b501c2507cb4eebc96.js"></script>`;

  // Native banner
  const NATIVE_BANNER = `
<script async="async" data-cfasync="false" src="https://harbourbreederdump.com/54f40a4ce292a9187e0b9a0feb507f92/invoke.js"></script>
<div id="container-54f40a4ce292a9187e0b9a0feb507f92"></div>`;

  // Histats
  const HISTATS = `<!-- Histats.com  START  (aync)-->
<script type="text/javascript">var _Hasync= _Hasync|| [];
_Hasync.push(['Histats.start', '1,4654540,4,0,0,0,00010000']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function() {
var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
hs.src = ('//s10.histats.com/js15_as.js');
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();</script>
<noscript><a href="/" target="_blank"><img  src="//sstatic1.histats.com/0.gif?4654540&101" alt="counter create hit" border="0"></a></noscript>
<!-- Histats.com  END  -->`;

  const title = "videy.co";
  const canonical = `https://${context.request.headers.get("host")}/v/${encodeURIComponent(id)}`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>

  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index,follow,max-image-preview:large" />

  <!-- Social preview -->
  <meta property="og:type" content="video.other" />
  <meta property="og:title" content="${title}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="${title}" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="stylesheet" href="/assets/style.css" />
  ${HISTATS}
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="/">
        <span class="brand-badge" aria-hidden="true"></span>
        <span class="brand-text">videy</span>
      </a>
      <div class="brand-sub">Video player</div>
    </div>
  </header>

  <main class="wrap">
    <section class="card" aria-label="Video">
      <div class="card-head">
        <h1 class="page-title">videy.co/v/?id=${id}</h1>
        <div class="small-actions">
          <a class="btn" href="/" rel="nofollow">Home</a>
          <button class="btn btn-primary" id="downloadBtn" type="button">Download video</button>
        </div>
      </div>

      <div class="player">
        <div class="player-inner">
          <div id="embed"><div class="loading">Loading…</div></div>
        </div>
      </div>

      <div class="panel">
        <h2>Download</h2>
        <a class="btn btn-primary btn-full" id="downloadBtn2" href="${SMARTLINK}" target="_blank" rel="noopener nofollow">Download video</a>
        <p class="note">
          If the button does not open, tap the video once and try again.
        </p>

        <div class="adbox" aria-label="Sponsored">
          <div id="ad-native">${NATIVE_BANNER}</div>
        </div>
      </div>
    </section>
  </main>

  <div class="footer">© ${new Date().getFullYear()} videy</div>

  ${POPUNDER}

  <script>
    // Pass ID & smartlink to client script
    window.__VIDEO_ID__ = ${JSON.stringify(id)};
    window.__SMARTLINK__ = ${JSON.stringify(SMARTLINK)};
  </script>
  <script src="/assets/app.js" defer></script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
