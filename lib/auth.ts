import { cookies } from "next/headers";

const COOKIE_NAME = "cal_session";
const SESSION_TOKEN = "authenticated";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function verifyPassword(password: string): boolean {
  return password === process.env.ACCESS_PASSWORD;
}

export async function setSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function hasSessionCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === SESSION_TOKEN;
}

export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader.includes(`${COOKIE_NAME}=${SESSION_TOKEN}`);
}
