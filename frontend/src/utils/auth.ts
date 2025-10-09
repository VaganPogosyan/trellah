const ACCESS_TOKEN_KEY = "trellah_access_token";
const TOKEN_EXPIRES_AT_KEY = "trellah_token_expires_at";
export const AUTH_CHANGE_EVENT = "trellah-auth-change";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}

function emitAuthChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function storeAuthSession(payload: LoginResponse) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, payload.access_token);
  window.localStorage.setItem(
    TOKEN_EXPIRES_AT_KEY,
    new Date(payload.expires_at).toISOString()
  );
  emitAuthChange();
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
  emitAuthChange();
}

function getStoredExpiry(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
  if (!stored) {
    return null;
  }

  const expiresAt = Date.parse(stored);
  return Number.isNaN(expiresAt) ? null : expiresAt;
}

export function isAuthSessionValid(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    return false;
  }

  const expiresAt = getStoredExpiry();
  if (!expiresAt) {
    clearAuthSession();
    return false;
  }

  if (expiresAt <= Date.now()) {
    clearAuthSession();
    return false;
  }

  return true;
}
