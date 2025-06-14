import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const hasCookieHeader = request.headers.get("cookie")?.includes("token="); // ensure the token is exist
	const currentUrl = request.nextUrl.pathname;

    if (hasCookieHeader && currentUrl === "/login") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!hasCookieHeader && !currentUrl.startsWith("/login")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

    return NextResponse.next();
}

// determines which routes use this middleware
export const config = {
    matcher: [
		"/((?!_next/static|_next/image|api/auth|api/public|favicon.ico|robots.txt|sitemap.xml|api/auth/token|payment/).*)",
	],
};