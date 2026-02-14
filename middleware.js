import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasAuth = accessToken || refreshToken;

  // OAuth callback - always allow
  if (pathname.startsWith("/oauth")) {
    return NextResponse.next();
  }

  // Auth pages - redirect to dashboard if already logged in
  const authPages = ["/login", "/signup"];
  if (authPages.includes(pathname)) {
    if (hasAuth) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - redirect to login if not authenticated
  const protectedRoutes = ["/profile", "/dashboard", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !hasAuth) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/oauth/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
  ],
};
