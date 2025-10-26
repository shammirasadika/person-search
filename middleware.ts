import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth/signin")
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = req.nextUrl.pathname === "/about" 
    || req.nextUrl.pathname === "/auth-setup"
    || req.nextUrl.pathname === "/security"
    || req.nextUrl.pathname === "/github"

  // Allow access to auth pages and API routes
  if (isAuthPage || isApiAuthRoute) {
    return NextResponse.next()
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Redirect to sign-in if not authenticated
  if (!isLoggedIn) {
    const signInUrl = new URL("/auth/signin", req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
