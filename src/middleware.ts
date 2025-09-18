

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
