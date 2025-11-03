import { cookies } from "next/headers";
import DashboardClient from "./DashboardClient";
import { verifyBackoffice } from "@/lib/verifyBackoffice";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // ✅ ตรวจสอบสิทธิ์แอดมิน
  const auth = await verifyBackoffice();

  if (!auth.authorized) {
    redirect("/admin/login");
  }

  // ✅ ดึงข้อมูล Dashboard จาก API เดียว
  const res = await fetch(`${process.env.API_URL}/api/admin/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Dashboard fetch failed:", res.statusText);
    throw new Error("ไม่สามารถดึงข้อมูล Dashboard ได้");
  }

  const { summary, data } = await res.json();

  // ✅ ส่งข้อมูลไปให้ฝั่ง Client
  return <DashboardClient summary={summary} bookings={data} />;
}
