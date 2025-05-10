import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/', '/admin', '/profile'];

const secret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret });
  // const token = request.cookies.get('next-auth.session-token')?.value
  //            || request.cookies.get('__Secure-next-auth.session-token')?.value;

  console.log(`🔐 Middleware triggered for ${pathname} — Authenticated: ${!!token}`);
  // console.log(`⏳ Middleware triggered for: ${pathname}`);

  

  // // Block access to protected routes
  // if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
  //   console.log(`🔒 Unauthorized access to ${pathname}. Redirecting to /signin`);
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

   // If trying to access protected route and no valid token, redirect to signin
   if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Prevent logged-in users from visiting /signin or /signup
  // If already authenticated and trying to access signin/signup, redirect to dashboard
  if ((pathname === '/signin' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // All good
  return NextResponse.next();
}

// export const config = {
//   matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*', '/signin', '/signup'],
// };

// This will trigger your JWT verification middleware on every route in your app except the listed ones.
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes
     * - Static files (like _next/static or public folder)
     * - Auth pages
     */
    "/((?!_next|api|favicon.ico|images|public|auth|signin|signup).*)",
  ],
};

