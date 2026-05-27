import crypto from "crypto";

export const MANAGEMENT_SESSION_COOKIE = "modem_management_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function isManagementAuthConfigured() {
  return Boolean(
    process.env.MANAGEMENT_DASHBOARD_PASSWORD &&
      process.env.MANAGEMENT_DASHBOARD_SESSION_SECRET
  );
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signSession(expiresAt: number) {
  return crypto
    .createHmac("sha256", process.env.MANAGEMENT_DASHBOARD_SESSION_SECRET!)
    .update(`management:${expiresAt}`)
    .digest("hex");
}

export function verifyManagementPassword(password: unknown) {
  const configuredPassword = process.env.MANAGEMENT_DASHBOARD_PASSWORD;

  if (!configuredPassword || typeof password !== "string") return false;

  return safeEqual(password, configuredPassword);
}

export function createManagementSessionToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const signature = signSession(expiresAt);

  return `v1.${expiresAt}.${signature}`;
}

export function verifyManagementSessionToken(token: string | undefined) {
  if (!isManagementAuthConfigured() || !token) return false;

  const [version, expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (version !== "v1" || !Number.isFinite(expiresAt) || !signature) {
    return false;
  }

  if (expiresAt < Date.now()) return false;

  return safeEqual(signature, signSession(expiresAt));
}

export const MANAGEMENT_SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_SECONDS;
