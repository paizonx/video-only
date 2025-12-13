(() => {
  const id = (window.__VIDEO_ID__ || "").toString();
  const SMARTLINK = (window.__SMARTLINK__ || "").toString();
  const embedEl = document.getElementById("embed");

  // Defensive: hide any accidental blog title remnants (for migrations)
  const hideTitle = () => {
    const candidates = [
      document.querySelector("h1.title"),
      document.querySelector(".Header"),
      document.getElementById("header"),
    ];
    candidates.forEach((el) => el && (el.style.display = "none"));
  };

  // Basic friction to discourage copying (cannot truly prevent)
  const hardenUI = () => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("cut", (e) => e.preventDefault());

    document.addEventListener("keydown", (e) => {
      const k = (e.key || "").toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      // Block common devtools shortcuts
      if (
        k === "f12" ||
        (ctrl && (k === "u" || k === "s" || k === "p" || k === "c" || k === "x")) ||
        (e.shiftKey && ctrl && (k === "i" || k === "j" || k === "c"))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  };

  const openSmartlink = () => {
    if (!SMARTLINK) return;
    // open in a new tab; keep it user-initiated for popup policies
    window.open(SMARTLINK, "_blank", "noopener,noreferrer");
  };

  const wireButtons = () => {
    const b1 = document.getElementById("downloadBtn");
    const b2 = document.getElementById("downloadBtn2");
    if (b1) b1.addEventListener("click", openSmartlink);
    if (b2) b2.addEventListener("click", (e) => {
      // Let anchor navigate; also try open for some in-app browsers
      try { openSmartlink(); } catch (_) {}
    });
  };

  const renderPlayer = () => {
    if (!embedEl) return;
    if (!id) {
      embedEl.innerHTML = "<div class='loading'>Invalid ID.</div>";
      return;
    }

    // Videy embed pattern (iframe). If the provider changes, only this needs updating.
    const src = `https://cdo.vide-y.cyou/v/?id=${encodeURIComponent(id)}`;

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.loading = "eager";
    iframe.style.width = "100%";
    iframe.style.aspectRatio = "16 / 9";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.title = "video";

    embedEl.innerHTML = "";
    embedEl.appendChild(iframe);
  };

  try { hideTitle(); } catch (_) {}
  try { hardenUI(); } catch (_) {}
  try { wireButtons(); } catch (_) {}
  renderPlayer();
})();