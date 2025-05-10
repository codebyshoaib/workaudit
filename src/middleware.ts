// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Protected routes where authentication is required
const protectedRoutes = ["/","/dashboard", "/admin", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for token in cookies
  const token = request.cookies.get("token")?.value;

  // If there's no token and the user is trying to access a protected route, redirect to signin
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If there's a token, validate it
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
      await jwtVerify(token, secret);
      return NextResponse.next(); // Allow request to continue
    } catch (err) {
      // Invalid token, redirect to signin
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // If the route is not protected, just continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/","/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
