import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ถ้าพยายามเข้าหน้า /admin หรือหน้าที่ต้องล็อกอิน
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token'); // หรือชื่อคุกกี้ที่ใช้เก็บ token

    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไป login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // TODO: ตรวจสอบ token validity ถ้าต้องการ
  }

  // ให้ผ่านสำหรับ path อื่น ๆ
  return NextResponse.next();
}

// กำหนด path ที่ middleware จะทำงาน
export const config = {
  matcher: ['/admin/:path*'],  // เช็คเฉพาะ path /admin/*
};
