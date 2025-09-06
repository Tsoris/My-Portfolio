// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const signin = new URL("/api/auth/signin", req.url); // built-in page
    signin.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(signin);
  }

  // Optional role gate if you set token.isAdmin below
  // if (!token.isAdmin) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
