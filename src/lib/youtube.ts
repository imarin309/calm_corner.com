const ALLOWED_HOSTS = ["www.youtube.com", "youtube.com", "youtu.be"];
const VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function extractYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) return null;

  let id: string | null = null;

  if (parsed.hostname === "youtu.be") {
    id = parsed.pathname.slice(1);
  } else if (
    parsed.pathname === "/watch" ||
    parsed.pathname.startsWith("/watch/")
  ) {
    id = parsed.searchParams.get("v");
  } else {
    const m = parsed.pathname.match(/^\/(?:shorts|embed)\/([A-Za-z0-9_-]{11})/);
    id = m ? m[1] : null;
  }

  return id && VIDEO_ID_RE.test(id) ? id : null;
}
