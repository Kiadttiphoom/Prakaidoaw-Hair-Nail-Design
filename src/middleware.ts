import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ ข้าม middleware สำหรับหน้า login เอง
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // ✅ สำหรับหน้าอื่นใน /admin
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ✅ ให้ผ่านได้สำหรับ path อื่น ๆ
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // ตรวจเฉพาะ path /admin/*
};
