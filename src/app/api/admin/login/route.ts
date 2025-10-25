import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // ตัวอย่างตรวจสอบ login (จริง ๆ เช็คฐานข้อมูล)
  if (email === "pond" && password === "1234") {
    const response = NextResponse.json({ message: "Login success" });

    // เซ็ต cookie ชื่อ token (ควรตั้ง HttpOnly, Secure ใน production)
    response.cookies.set("token", "your-generated-token-here", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 วัน
    });

    return response;
  }

  return NextResponse.json({ message: "Login failed" }, { status: 401 });
}
