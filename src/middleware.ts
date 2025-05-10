import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";  // Import authOptions from where it's defined

const protectedRoutes = ['/dashboard', '/admin', '/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`⏳ Middleware triggered for: ${pathname}`);

  // Use NextAuth to get session info
  const session = await getServerSession(authOptions);

  let isAuthenticated = false;
  if (session) {
    isAuthenticated = true; // Session exists, user is authenticated
  }

  // Prevent redirect loops for already authenticated users trying to go to /signin or /signup
  if ((pathname === '/signin' || pathname === '/signup') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));  // Redirect logged-in users to homepage
  }

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url));  // Redirect unauthenticated users to /signin
  }

  // Allow the request to continue if none of the conditions match
  return NextResponse.next();
}

// Define the matcher for which routes this middleware applies to
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*', '/signin', '/signup'],
};
