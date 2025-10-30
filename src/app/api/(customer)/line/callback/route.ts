import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import jwt from "jsonwebtoken";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const promisePool = mysqlPool.promise();

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    // 1️⃣ ขอ token จาก LINE
    const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINE_CALLBACK_URL!,
        client_id: process.env.LINE_CHANNEL_ID!,
        client_secret: process.env.LINE_CHANNEL_SECRET!,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description },
        { status: 400 }
      );
    }

    // 2️⃣ ดึงโปรไฟล์ผู้ใช้จาก LINE
    const profileRes = await fetch("https://api.line.me/v2/profile", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();

    // 3️⃣ เช็กว่า user มีอยู่ใน DB หรือยัง
    const [rows]: any = await promisePool.query(
      "SELECT id FROM customers WHERE line_user_id = ?",
      [profile.userId]
    );

    if (rows.length === 0) {
      // ➕ ถ้ายังไม่มี ให้ insert
      await promisePool.query(
        "INSERT INTO customers (line_user_id, display_name, picture_url) VALUES (?, ?, ?)",
        [profile.userId, profile.displayName, profile.pictureUrl]
      );
    } else {
      // 🔁 ถ้ามีแล้ว อัปเดตชื่อ/รูปให้ใหม่
      await promisePool.query(
        "UPDATE customers SET display_name = ?, picture_url = ? WHERE line_user_id = ?",
        [profile.displayName, profile.pictureUrl, profile.userId]
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET!;

    const token = jwt.sign(
      {
        user_id: profile.userId,
        line_user_id: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      },
      JWT_SECRET,
      { expiresIn: "7d" } // อายุ 7 วัน
    );

    // 4️⃣ สร้าง cookie และ redirect กลับหน้า state
    const state = searchParams.get("state") || "/";
    const redirectUrl = new URL(state, req.url);
    const res = NextResponse.redirect(redirectUrl);

    res.cookies.set("line_user", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err: any) {
    console.error("LINE callback error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import { mysqlPool } from "@/lib/db";
// import jwt from "jsonwebtoken";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const code = searchParams.get("code");

//     if (!code) {
//       return NextResponse.json({ error: "Missing code" }, { status: 400 });
//     }

//     const promisePool = mysqlPool.promise();

//     // 1️⃣ ขอ token จาก LINE
//     const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: process.env.LINE_CALLBACK_URL!,
//         client_id: process.env.LINE_CHANNEL_ID!,
//         client_secret: process.env.LINE_CHANNEL_SECRET!,
//       }),
//     });

//     const tokenData = await tokenRes.json();
//     if (tokenData.error) {
//       return NextResponse.json(
//         { error: tokenData.error_description },
//         { status: 400 }
//       );
//     }

//     const access_token = tokenData.access_token;

//     // 2️⃣ ดึงโปรไฟล์ผู้ใช้จาก LINE
//     const profileRes = await fetch("https://api.line.me/v2/profile", {
//       headers: { Authorization: `Bearer ${access_token}` },
//     });
//     const profile = await profileRes.json();

//     // 3️⃣ ตรวจว่า user เป็นเพื่อนกับ OA แล้วหรือยัง
//     const friendshipRes = await fetch("https://api.line.me/friendship/v1/status", {
//       headers: { Authorization: `Bearer ${access_token}` },
//     });
//     const friendship = await friendshipRes.json();
//     const isFriend = friendship.friendFlag;

//     // 4️⃣ บันทึก / อัปเดตข้อมูลใน DB
//     const [rows]: any = await promisePool.query(
//       "SELECT id FROM customers WHERE line_user_id = ?",
//       [profile.userId]
//     );

//     if (rows.length === 0) {
//       await promisePool.query(
//         "INSERT INTO customers (line_user_id, display_name, picture_url) VALUES (?, ?, ?)",
//         [profile.userId, profile.displayName, profile.pictureUrl]
//       );
//     } else {
//       await promisePool.query(
//         "UPDATE customers SET display_name = ?, picture_url = ? WHERE line_user_id = ?",
//         [profile.displayName, profile.pictureUrl, profile.userId]
//       );
//     }

//     // 5️⃣ ออก JWT token
//     const JWT_SECRET = process.env.JWT_SECRET!;
//     const token = jwt.sign(
//       {
//         user_id: profile.userId,
//         line_user_id: profile.userId,
//         displayName: profile.displayName,
//         pictureUrl: profile.pictureUrl,
//       },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // 6️⃣ ตั้ง cookie
//     const state = searchParams.get("state") || "/";
//     const res = NextResponse.redirect(
//       isFriend
//         ? new URL(state, req.url) // ✅ ถ้าเป็นเพื่อนแล้ว กลับหน้าเดิม
//         : new URL("/addfriend", req.url) // ⚠️ ถ้ายังไม่เป็นเพื่อน → ไปหน้าเพิ่มเพื่อน
//     );

//     res.cookies.set("line_user", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7, // 7 วัน
//     });

//     return res;
//   } catch (err: any) {
//     console.error("LINE callback error:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
