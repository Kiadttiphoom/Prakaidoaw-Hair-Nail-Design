// /api/booking/route.ts
import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";

export async function POST(req: Request) {
  const { step, payload } = await req.json();

  if (step === 1) {
    // ✅ Step 1: ดึงรายการบริการ
    return NextResponse.json({ services: [""] });
  }

  if (step === 2) {
    // ✅ Step 2: ตรวจเวลาว่าง
    const { service_id, date } = payload;
    // ... query ตารางจอง
    return NextResponse.json({ available: ["10:00", "11:30", "14:00"] });
  }

  if (step === 3) {
    // ✅ Step 3: บันทึกการจอง
    const { user_id, service_id, date, time } = payload;
    // ... insert ลงฐานข้อมูล
    return NextResponse.json({ message: "Booking confirmed!" });
  }

  return NextResponse.json({ error: "Invalid step" }, { status: 400 });
}
