import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";

/**
 * Get tokens from cookies (server-side)
 */
export async function getTokens() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value || null,
    refreshToken: cookieStore.get("refreshToken")?.value || null,
  };
}

/**
 * Get current user from cookie (server-side)
 */
export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  
  if (!userCookie) return null;
  
  try {
    return JSON.parse(decodeURIComponent(userCookie));
  } catch {
    return null;
  }
}

/**
 * Get current user from backend (server-side)
 * Validates the token with the backend
 */
export async function getCurrentUser() {
  const { accessToken } = await getTokens();

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      return json.data?.user || null;
    }

    return null;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated() {
  const { accessToken, refreshToken } = await getTokens();
  return !!(accessToken || refreshToken);
}
