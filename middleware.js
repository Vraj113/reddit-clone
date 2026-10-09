import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (token && !token.username) {
      return NextResponse.redirect(new URL("/createaccount", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
