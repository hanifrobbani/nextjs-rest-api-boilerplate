import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const currentUrl = request.nextUrl.pathname;

    if (token && currentUrl === "/login") { //url can be custom
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && !currentUrl.startsWith("/login")) { //url can be custom
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// determines which routes use this middleware
export const config = {
    matcher: [
		"/((?!_next/static|_next/image|api/auth|api/public|favicon.ico|robots.txt|sitemap.xml|api/auth/token|payment/).*)",
	],
};