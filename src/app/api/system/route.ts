import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db"; // ✅ ใช้ pool ที่คุณมีอยู่แล้ว

export const dynamic = "force-dynamic"; // ไม่ cache ผลลัพธ์ (อัปเดตสด)

export async function GET() {
  try {
    const promisePool = mysqlPool.promise();

    // ✅ ดึงแถวเดียวจากตาราง system (เพราะมีแค่ 1 ร้าน)
    const [rows] = await promisePool.query<any[]>(`SELECT * FROM system LIMIT 1`);

    // ถ้าไม่มีข้อมูล
    if (!rows || rows.length === 0) {
      return NextResponse.json({
        message: "not found",
        data: {},
      });
    }

    const system = rows[0];

    return NextResponse.json({
      message: "success",
      data: system,
    });
  } catch (err: any) {
    //console.error("❌ Error fetching system info:", err);
    return NextResponse.json(
      { message: "error", error: err.message },
      { status: 500 }
    );
  }
}
