// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes
const protectedRoutes = ['/dashboard', '/admin', '/profile']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log(`⏳ Middleware triggered for: ${pathname}`)
  const token = request.cookies.get('next-auth.session-token')?.value 
              || request.cookies.get('__Secure-next-auth.session-token')?.value

  if (protectedRoutes.includes(pathname) && !token) {
    console.log(`🔒 Unauthorized access to ${pathname}. Redirecting to /signin`)
    const loginUrl = new URL('/signin', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*','/signin'],
  }
  