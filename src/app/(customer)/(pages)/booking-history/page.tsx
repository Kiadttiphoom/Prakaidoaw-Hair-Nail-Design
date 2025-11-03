export const dynamic = "force-dynamic";

import BookingHistoryClient from "./booking-historyClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // ✅ ใช้ redirect ของ Next.js แทน window.location

export default async function BookingHistoryPage() {
  const cookieStore = await cookies();

  // ✅ รวม cookie ทั้งหมดเป็น header string
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.API_URL || "http://localhost:3000"}/api/booking-history`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      next: { revalidate: 60 },
    }
  );

  // ✅ ตรวจสอบการล็อกอิน
  if (res.status === 401) {
    redirect("/"); // ใช้ redirect จาก next/navigation แทน window.location.href
  }

  if (!res.ok) {
    return <div className="p-6">ไม่สามารถโหลดข้อมูลการจองได้</div>;
  }

  const data = await res.json();
  const bookingHistory = data?.data || [];

  return <BookingHistoryClient bookinghistory={bookingHistory} />;
}
