import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import { verifyBackoffice } from "@/lib/verifyBackoffice";

export async function GET(request: Request) {
  try {
    const promisePool = mysqlPool.promise();

    // 🔹 ดึงข้อมูลทั้งหมด
    const [rows] = await promisePool.query<any[]>(`
      SELECT 
        b.booking_code,
        b.customer_name,
        b.customer_phone,
        s.title AS service_title,
        st.name AS stylist_name,
        b.booking_date,
        b.booking_time,
        b.price,
        b.status,
        b.note,
        b.created_at
      FROM booking b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN stylists st ON b.stylist_id = st.id
      ORDER BY b.created_at DESC
    `);

    // 🔹 จัดรูปแบบข้อมูล
    const formatted = rows.map((item) => ({
      booking_code: item.booking_code,
      customer_name: item.customer_name,
      customer_phone: item.customer_phone,
      service_title: item.service_title,
      stylist_name: item.stylist_name,
      date: new Date(item.booking_date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: item.booking_time?.slice(0, 5),
      price: Number(item.price || 0).toLocaleString("th-TH"),
      status: item.status,
      note: item.note || "-",
      payment_status: item.payment_status,
    }));

    // 🔹 นับยอดรวมตามสถานะ
    const summary = {
      pending: rows.filter((r) => r.status === "pending").length,
      confirmed: rows.filter((r) => r.status === "confirmed").length,
      completed: rows.filter((r) => r.status === "completed").length,
      canceled: rows.filter((r) => r.status === "canceled").length,
      total: rows.length,
    };

    return NextResponse.json(
      {
        summary,
        data: formatted,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Dashboard error:", err);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}