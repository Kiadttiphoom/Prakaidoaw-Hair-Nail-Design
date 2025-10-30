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
      console.log("===================================");
      console.log("payload :", stylist_id, service_id, date);

      const promisePool = mysqlPool.promise();

      // 1️⃣ เวลาทำการ
      const [system] = await promisePool.query<any[]>(
        `SELECT open_time, close_time FROM system LIMIT 1`
      );
      if (!system.length)
        return NextResponse.json({ message: "system table ว่าง" }, { status: 500 });

      const open_time = system[0].open_time;
      const close_time = system[0].close_time;
      console.log("open_time :", open_time);
      console.log("close_time :", close_time);

      // 2️⃣ ข้อมูลบริการ
      const [services] = await promisePool.query<any[]>(
        `SELECT buffer_min, duration_min FROM services WHERE id = ?`,
        [service_id]
      );
      if (!services.length)
        return NextResponse.json({ message: "ไม่พบบริการนี้" }, { status: 404 });

      const duration_min = services[0].duration_min;

      console.log("duration_min :", duration_min);

      // 3️⃣ ดึง booking ของวันนั้น
      const [bookings] = await promisePool.query<any[]>(
        `SELECT booking_time, service_id FROM booking 
          WHERE stylist_id = ? AND booking_date = ? 
          ORDER BY booking_time ASC`,
        [stylist_id, date]
      );



      // 4️⃣ duration ของทุก service
      const [allServices] = await promisePool.query<any[]>(
        `SELECT id, duration_min FROM services`
      );
      const serviceMap = new Map<number, number>();
      allServices.forEach((s) => serviceMap.set(s.id, s.duration_min));

      // 5️⃣ สร้างช่วงเวลาเป็น “ทุกชั่วโมง”
      const slots: string[] = [];
      const bookedTimes: string[] = []; // ✅ เก็บเวลาที่จองแล้ว
      const workStartDate = new Date(`${date}T${open_time}`);
      const workEndDate = new Date(`${date}T${close_time}`);
      const stepMin = 60;

      for (
        let t = new Date(`${date}T${open_time}`);
        t < new Date(`${date}T${close_time}`);
        t = new Date(t.getTime() + stepMin * 60000)
      ) {
        const start = new Date(t);
        const end = new Date(start.getTime() + duration_min * 60000);
        const workEndDate = new Date(`${date}T${close_time}`);

        // ถ้าจบหลังเวลาปิดร้าน → ข้าม
        if (end > workEndDate) continue;

        const overlap = bookings.some((b: any) => {
          const normalized = b.booking_time.replace('.', ':');
          const bStart = new Date(`${date}T${normalized}`);
          const dur = serviceMap.get(b.service_id) || 60;
          const bEnd = new Date(bStart.getTime() + dur * 60000);
          return start < bEnd && end > bStart;
        });

        const timeString = start.toTimeString().slice(0, 5).replace(":", ".");
        if (overlap) {
          bookedTimes.push(timeString);
        } else {
          slots.push(timeString);
        }
      }

      console.log("timeSlots :", slots);
      console.log("===================================");

      return NextResponse.json({
        message: "success",
        data: { timeSlots: [...slots, ...bookedTimes].sort(), bookedTimes },
      });
    }

    // ✅ STEP 3: payload ต้องเป็น object อยู่ดี (ข้อมูลหลายช่อง)
    if (step === 4) {
      console.log(payload);
      const { stylist, service, date, time, prefix, firstName, lastName, phone, email, note } = payload;

      const cookieStore = await cookies();
      const token = cookieStore.get("line_user")?.value;

      let user_id: string | null = null;
      let pictureUrl: string | null = null;
      const name = prefix + firstName + " " + lastName;

      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string | number; pictureUrl: string };
          user_id = decoded.user_id.toString();
          pictureUrl = decoded.pictureUrl.toString();
        } catch (err) {
          console.error("Invalid JWT:", err);
        }
      }

      // 🔹 ดึงราคาจาก service_id
      const [services] = await promisePool.query<any[]>(
        `SELECT price_min FROM services WHERE id = ?`,
        [service]
      );

      if (!services.length) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
      }

      const price_min = services[0].price_min;

      // 🔹 สร้าง booking_code
      const now = new Date();
      const year = (now.getFullYear() + 543).toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const dateformat = `BK${year}${month}${day}`;

      // 🔹 ดึง booking ล่าสุดจากฐานข้อมูล
      const [rows] = await promisePool.query<any[]>(`
        SELECT booking_code
        FROM booking
        WHERE booking_code LIKE 'BK%' 
        ORDER BY id DESC 
        LIMIT 1
      `);

      let booking_code = "";
      let runningNumber = 1;

      if (rows.length > 0) {
        const lastCode = rows[0].booking_code;
        if (lastCode.startsWith(dateformat)) {
          const lastNumber = parseInt(lastCode.slice(-5));
          runningNumber = lastNumber + 1;
        }
      }

      booking_code = `${dateformat}${runningNumber.toString().padStart(5, "0")}`;
      const normalizedTime = time.includes(":") ? time : time.replace(".", ":");

      // 🔹 Insert ลงฐานข้อมูล (เริ่มต้น line_status = 'pending')
      await promisePool.query(
        `INSERT INTO booking 
          (booking_code, user_id, customer_name, customer_phone, stylist_id, service_id, booking_date, booking_time, price, note, line_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          booking_code,
          user_id,
          name,
          phone,
          stylist,
          service,
          date,
          normalizedTime,
          price_min,
          note || null,
        ]
      );

      const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];

      const Strday = date.getDate();
      const Strmonth = thaiMonths[date.getMonth()];
      const Stryear = date.getFullYear() + 543;

      const newDate = `${Strday} ${Strmonth} ${Stryear}`;


      try {
        const [stylists] = await promisePool.query<any[]>(`SELECT name FROM stylists WHERE id = ?`, [stylist]);
        const [services] = await promisePool.query<any[]>(`SELECT Title FROM services WHERE id = ?`, [service]);
        const stylistss_name = stylists[0].name;
        const services_name = services[0].Title;

        // 🧱 เนื้อหา Flex Message
        const bodyContents: any[] = [
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            contents: [
              { type: "text", text: "ลูกค้า", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: name, wrap: true, color: "#666666", size: "sm", flex: 5, weight: "bold" },
            ],
          },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            contents: [
              { type: "text", text: "โทร", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: phone, wrap: true, color: "#666666", size: "sm", flex: 5 },
            ],
          },
          ...(email && email.trim() !== ""
            ? [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "อีเมล", color: "#aaaaaa", size: "sm", flex: 2 },
                  {
                    type: "text",
                    text: email,
                    wrap: true,
                    color: "#6666ff",
                    size: "sm",
                    flex: 5,
                    action: { type: "uri", uri: `mailto:${email}` },
                  },
                ],
              },
            ]
            : []),
          { type: "separator", margin: "xl" },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            margin: "xl",
            contents: [
              { type: "text", text: "ช่าง", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: stylistss_name, wrap: true, color: "#666666", size: "sm", flex: 5, weight: "bold" },
            ],
          },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            contents: [
              { type: "text", text: "บริการ", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: services_name, wrap: true, color: "#666666", size: "sm", flex: 5 },
            ],
          },
          { type: "separator", margin: "xl" },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            margin: "xl",
            contents: [
              { type: "text", text: "วันที่", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: newDate, wrap: true, color: "#666666", size: "sm", flex: 5 },
            ],
          },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            contents: [
              { type: "text", text: "เวลา", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: `${normalizedTime} น.`, wrap: true, color: "#666666", size: "sm", flex: 5 },
            ],
          },
          { type: "separator", margin: "xl" },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            margin: "xl",
            contents: [
              { type: "text", text: "ราคาเริ่มต้น", color: "#aaaaaa", size: "sm", flex: 2 },
              { type: "text", text: `฿${price_min.toLocaleString("th-TH")}`, wrap: true, color: "#111111", size: "lg", flex: 5, weight: "bold" },
            ],
          },
        ];

        if (note && note.trim() !== "") {
          bodyContents.push(
            { type: "separator", margin: "xl" },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              margin: "xl",
              contents: [
                { type: "text", text: "หมายเหตุ", color: "#aaaaaa", size: "sm", flex: 2 },
                { type: "text", text: note, wrap: true, color: "#666666", size: "sm", flex: 5 },
              ],
            }
          );
        }

        const flexMessage = {
          type: "flex",
          altText: "🎉 มีการจองใหม่เข้ามาแล้ว!",
          contents: {
            type: "bubble",
            size: "mega",
            header: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    { type: "text", text: "🎉 การจองใหม่", color: "#ffffff", size: "xl", weight: "bold" },
                    { type: "text", text: `เลขที่การจอง ${booking_code}`, color: "#ffffff", size: "sm", margin: "md" },
                  ],
                  flex: 4,
                },
                {
                  type: "image",
                  url: pictureUrl,
                  size: "md",
                  aspectRatio: "1:1",
                  align: "end",
                  gravity: "top",
                  flex: 1,
                },
              ],
              paddingAll: "20px",
              backgroundColor: "#1f2937",
              spacing: "md",
              paddingTop: "22px",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                { type: "box", layout: "vertical", margin: "lg", spacing: "sm", contents: bodyContents },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                { type: "text", text: "✨ Prakaidoaw Hair & Nail Design", color: "#aaaaaa", size: "xs", align: "center" },
              ],
              flex: 0,
            },
            styles: { footer: { separator: true } },
          },
        };

        // ✅ ส่ง LINE Message
        const lineRes = await fetch("https://api.line.me/v2/bot/message/push", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.LINE_CHANNEL_TOKEN}`,
          },
          body: JSON.stringify({
            to: user_id,
            messages: [flexMessage],
          }),
        });

        if (!lineRes.ok) {
          const errorText = await lineRes.text();
          console.error("❌ ส่งข้อความเข้า LINE Bot ไม่สำเร็จ:", errorText);

          // ❌ ถ้า LINE ล้มเหลว → อัปเดต line_status = 'failed'
          await promisePool.query(
            `UPDATE booking SET line_status = 'failed', line_error = ? WHERE booking_code = ?`,
            [errorText, booking_code]
          );
        } else {
          console.log("✅ LINE ส่งสำเร็จ");
          await promisePool.query(
            `UPDATE booking SET line_status = 'success', line_error = NULL WHERE booking_code = ?`,
            [booking_code]
          );
        }
      } catch (err: any) {
        console.error("❌ LINE push error:", err);
        await promisePool.query(
          `UPDATE booking SET line_status = 'failed', line_error = ? WHERE booking_code = ?`,
          [err.message, booking_code]
        );
      }

      return NextResponse.json({
        message: "success",
        data: { message: "Booking confirmed!", booking_code, price_min },
      });
    }

    return NextResponse.json({ message: "error", error: "Invalid step" }, { status: 400 });
  } catch (err: any) {
    console.error("Booking error:", err);
    return NextResponse.json({ message: "error", error: err.message }, { status: 500 });
  }
}
