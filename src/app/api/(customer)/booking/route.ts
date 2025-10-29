import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { step, payload } = await req.json();
  const promisePool = mysqlPool.promise();

  try {
    // ✅ STEP 1: payload คือ stylist_id โดยตรง
    if (step === 1) {
      const stylist_id = payload; // <— ใช้ตรง ๆ ไม่ต้อง destructure

      const [rows] = await promisePool.query<any[]>(
        `SELECT s.id, s.title, s.description, s.price_min, s.image_url
         FROM stylist_services ss
         JOIN services s ON ss.service_id = s.id
         WHERE ss.stylist_id = ? AND s.is_active = 1`,
        [stylist_id]
      );

      const formattedRows = rows.map((item: any) => ({
        ...item,
        price_min: Number(item.price_min).toLocaleString("th-TH"),
      }));

      return NextResponse.json({
        message: "success",
        data: { services: formattedRows },
      });
    }

    if (step === 2) {
      const { stylist, service } = payload;

      const [rows] = await promisePool.query<any[]>(
        `SELECT s.id, s.title, s.description, s.price_min, s.image_url
         FROM stylist_services ss
         JOIN services s ON ss.service_id = s.id
         WHERE ss.stylist_id = ? AND s.is_active = 1`,
        [stylist]
      );

      if (rows.length < 0) {
        return NextResponse.json({
          message: "error"
        });
      } else {
        return NextResponse.json({
          message: "success",
        });
      }

    }

    // ✅ STEP 3: payload ก็จะเป็น stylist_id เช่นกัน
    if (step === 3) {
      const { stylist_id, service_id, date } = payload;

      // ... ดึงข้อมูลเวลาเหมือนเดิม แต่ query bookings เฉพาะวันนั้น
      const [bookings] = await promisePool.query<any[]>(
        `SELECT time_start, time_end FROM bookings 
     WHERE stylist_id = ? AND date = ? 
     ORDER BY time_start ASC`,
        [stylist_id, date]
      );

      // คำนวณช่วงเวลาว่าง (08:00–20:00)
      const slots: string[] = [];
      const workStart = "08:00";
      const workEnd = "20:00";
      const stepMin = 30;

      const workStartDate = new Date(`${date}T${workStart}`);
      const workEndDate = new Date(`${date}T${workEnd}`);

      if (bookings.length === 0) {
        for (let t = new Date(workStartDate); t < workEndDate; t = new Date(t.getTime() + stepMin * 60000)) {
          slots.push(t.toTimeString().slice(0, 5));
        }
      } else {
        for (let t = new Date(workStartDate); t < workEndDate; t = new Date(t.getTime() + stepMin * 60000)) {
          const start = new Date(t);
          const end = new Date(start.getTime() + 60 * 60000); // ใช้ duration ของ service
          if (end > workEndDate) break;

          const overlap = bookings.some((b: any) => {
            const bStart = new Date(`${date}T${b.time_start}`);
            const bEnd = new Date(`${date}T${b.time_end}`);
            return start < bEnd && end > bStart;
          });

          if (!overlap) slots.push(start.toTimeString().slice(0, 5));
        }
      }

      return NextResponse.json({
        message: "success",
        data: { timeSlots: slots },
      });
    }

    // ✅ STEP 3: payload ต้องเป็น object อยู่ดี (ข้อมูลหลายช่อง)
    if (step === 4) {
      
      const { user_id, stylist_id, service_id, date, time, note } = payload;

      await promisePool.query(
        `INSERT INTO bookings (user_id, stylist_id, service_id, date, time, note)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, stylist_id, service_id, date, time, note || null]
      );

      return NextResponse.json({
        message: "success",
        data: { message: "Booking confirmed!" },
      });
    }

    return NextResponse.json({ message: "error", error: "Invalid step" }, { status: 400 });
  } catch (err: any) {
    console.error("Booking error:", err);
    return NextResponse.json({ message: "error", error: err.message }, { status: 500 });
  }
}
