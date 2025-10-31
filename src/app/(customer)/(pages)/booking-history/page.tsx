import BookingHistoryClient from "./ฺbooking-historyClient";
import { cookies } from "next/headers";

export default async function BookingHistoryPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString(); // ✅ แปลง cookie เป็น header string

  const res = await fetch(`${process.env.API_URL || "http://localhost:3000"}/api/booking-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // ✅ ส่ง cookie ของผู้ใช้ไปด้วย
    },
    cache: "no-store",
  });

  if (!res.ok) {
    //console.error("Booking history fetch failed:", res.status);
    return <div className="p-6">ไม่สามารถโหลดข้อมูลการจองได้</div>;
  }

  const data = await res.json();
  
  const bookingHistory = data?.data || [];

  return <BookingHistoryClient bookinghistory={bookingHistory} />;
}
