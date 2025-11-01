import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import { verifyBackoffice } from "@/lib/verifyBackoffice";

export async function GET(request: Request) {
  try {
    const auth = await verifyBackoffice();

    if (!auth.authorized) {
      return NextResponse.json({ message: auth.message }, { status: 401 });
    }

    try {
      const response = NextResponse.json({ message: "Login success" }, { status: 200 });

      return response;
    } catch (err) {
      console.error("Decrypt error:", err);
      return NextResponse.json(
        { message: "เกิดข้อผิดพลาดในการถอดรหัส" },
        { status: 500 }
      );
    }


  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // ✅ สร้าง response พร้อมสั่งลบ cookie token
    const response = NextResponse.json(
      { message: "Logout success" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: "",
      expires: new Date(0),
      path: "/", // ให้หมดอายุทั่วทั้งโดเมน
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
