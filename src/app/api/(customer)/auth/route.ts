import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("line_user");

  if (!userCookie) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 200 } // ✅ ใช้ status จริงของ HTTP
    );
  }

  return NextResponse.json(
    { message: "Success" },
    { status: 200 } // ✅ ใช้ status จริง
  );
}
