import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/profile"];
const authRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  // Debug: Log environment and request info
  console.log("[Middleware] Pathname:", pathname);
  console.log("[Middleware] AUTH_SECRET exists:", Boolean(process.env.AUTH_SECRET));
  console.log("[Middleware] Cookies:", request.cookies.getAll());

  // Use a fallback for secret if not set (for debugging only, remove fallback in production)
  const secret = process.env.AUTH_SECRET || "development-secret";
  if (!process.env.AUTH_SECRET) {
    console.warn("[Middleware] AUTH_SECRET is not set! Using fallback. This is insecure for production.");
  }

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret,
  });
  console.log("[Middleware] Token:", token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If user is authenticated and trying to access auth routes, redirect to wherever they want
  if (token && isAuthRoute) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};
