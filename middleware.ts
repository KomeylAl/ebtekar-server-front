import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/auth/login") && !token) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.startsWith("/_next/static/") ||
    request.nextUrl.pathname.startsWith("/static/")
  ) {
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log('Request Path:', request.nextUrl.pathname);
    console.log('Token:', token);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && request.nextUrl.pathname.startsWith('/auth/login')) {
    // هدایت کاربر به صفحه اصلی
    console.log('Request Path:', request.nextUrl.pathname);
    console.log('Token:', token);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // اگر توکن وجود داشت، به مسیر درخواست شده دسترسی داده می‌شود
  return NextResponse.next();
}

// لیست مسیرهایی که می‌خواهید محافظت کنید
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"], // یا هر مسیر دیگر که می‌خواهید محافظت شود
};
