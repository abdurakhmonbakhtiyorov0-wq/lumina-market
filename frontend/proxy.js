import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith("/sell") || pathname.startsWith("/orders") || pathname.startsWith("/checkout")
  const AuthRoutes =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("/callbackUrl", encodeURIComponent(pathname));

    return NextResponse.redirect(loginUrl);
  }

  if (AuthRoutes && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
