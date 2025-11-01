import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import { verifyUser } from "@/lib/verifyUser";

export async function POST() {
  const promisePool = mysqlPool.promise();

  const auth = await verifyUser();

  if (!auth.authorized) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  // ✅ ใช้ JOIN ดึงข้อมูลที่เกี่ยวข้องทั้งหมดในครั้งเดียว
  const [rows] = await promisePool.query<any[]>(
    `
    SELECT 
      b.booking_code,
      b.customer_name AS customer_name,
      b.customer_phone AS customer_phone,
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
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    `,
    [auth.user?.line_user_id]
  );

  // ✅ จัดรูปแบบข้อมูลให้อ่านง่าย
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
    time: item.booking_time.slice(0, 5),
    price: Number(item.price).toLocaleString("th-TH"),
    status: item.status,
    note: item.note || "-",
    payment_status: item.payment_status,
  }));

  console.log(formatted);

  return NextResponse.json({
    message: "success",
    data: formatted,
  });
}
