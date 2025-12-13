(function(){
  const params = new URLSearchParams(location.search);
  const id = (params.get('id') || '').trim();

  const frame = document.getElementById('videyFrame');
  const loading = document.getElementById('loading');
  const openOnVidey = document.getElementById('openOnVidey');

  // Match the “watch” URL pattern shown in the screenshot
  const watchUrl = id ? `https://videy.co/v/?id=${encodeURIComponent(id)}` : 'https://videy.co/';

  frame.src = watchUrl;
  openOnVidey.href = watchUrl;

  // Heuristic: most Videy clips are vertical; mimic the screenshot by default.
  const wrap = frame.closest('.playerWrap');
  if (wrap) wrap.classList.add('is-vertical');

  // Hide loader after iframe loads (best-effort).
  frame.addEventListener('load', () => {
    if (loading) loading.style.display = 'none';
  });

  // If no id provided, show a subtle hint in the title.
  if (!id) document.title = 'videy - paste ?id=...';
})();