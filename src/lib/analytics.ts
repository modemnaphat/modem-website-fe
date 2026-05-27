export const VISITOR_COOKIE = "modem_visitor_id";

const STATIC_FILE_PATTERN =
  /\.(?:css|js|map|png|jpg|jpeg|gif|webp|avif|svg|ico|txt|xml|pdf|woff|woff2|ttf)$/i;

export function isTrackablePath(path: unknown) {
  if (typeof path !== "string") return false;
  if (!path.startsWith("/")) return false;
  if (path.length > 2048) return false;

  return (
    !path.startsWith("/api") &&
    !path.startsWith("/management") &&
    !path.startsWith("/_next") &&
    !STATIC_FILE_PATTERN.test(path)
  );
}

export function normalizeReferrer(referrer: unknown) {
  if (typeof referrer !== "string") return null;

  const trimmed = referrer.trim();
  if (!trimmed) return null;

  return trimmed.slice(0, 2048);
}

export function isBotLikeUserAgent(userAgent: string | null) {
  if (!userAgent) return true;

  return /bot|crawler|spider|crawling|curl|wget|python|uptime|monitor/i.test(
    userAgent
  );
}
