import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protect Dashboard Routes
  // Matches /dashboard and any subpaths
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (pathname.startsWith("/user-profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (pathname.startsWith("/shopping-with-ai")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Protect Service Booking Routes
  // logic: Matches /service/* but NOT /service (listing page)
  if (pathname.startsWith("/service") && pathname !== "/service") {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Pattern to match dashboard routes
    "/dashboard/:path*",
    // Pattern to match user profile routes
    "/user-profile/:path*",

    // Pattern to match service routes
    "/service/:path*",

    "/shopping-with-ai/:path*",
  ],
};
