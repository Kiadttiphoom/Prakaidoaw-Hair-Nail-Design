// import { NextResponse } from "next/server";
// import { mysqlPool } from "@/lib/db";
// import jwt from "jsonwebtoken";


// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const code = searchParams.get("code");

//     const promisePool = mysqlPool.promise();

//     if (!code) {
//       return NextResponse.json({ error: "Missing code" }, { status: 400 });
//     }

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

//     // 2️⃣ ดึงโปรไฟล์ผู้ใช้จาก LINE
//     const profileRes = await fetch("https://api.line.me/v2/profile", {
//       headers: { Authorization: `Bearer ${tokenData.access_token}` },
//     });
//     const profile = await profileRes.json();

//     // 3️⃣ เช็กว่า user มีอยู่ใน DB หรือยัง
//     const [rows]: any = await promisePool.query(
//       "SELECT id FROM customers WHERE line_user_id = ?",
//       [profile.userId]
//     );

//     if (rows.length === 0) {
//       // ➕ ถ้ายังไม่มี ให้ insert
//       await promisePool.query(
//         "INSERT INTO customers (line_user_id, display_name, picture_url) VALUES (?, ?, ?)",
//         [profile.userId, profile.displayName, profile.pictureUrl]
//       );
//     } else {
//       // 🔁 ถ้ามีแล้ว อัปเดตชื่อ/รูปให้ใหม่
//       await promisePool.query(
//         "UPDATE customers SET display_name = ?, picture_url = ? WHERE line_user_id = ?",
//         [profile.displayName, profile.pictureUrl, profile.userId]
//       );
//     }

//     const JWT_SECRET = process.env.JWT_SECRET!;

//     const token = jwt.sign(
//       {
//         user_id: profile.userId,
//         line_user_id: profile.userId,
//         displayName: profile.displayName,
//         pictureUrl: profile.pictureUrl,
//       },
//       JWT_SECRET,
//       { expiresIn: "7d" } // อายุ 7 วัน
//     );

//     // 4️⃣ สร้าง cookie และ redirect กลับหน้า state
//     const state = searchParams.get("state") || "/";
//     const redirectUrl = new URL(state, req.url);
//     const res = NextResponse.redirect(redirectUrl);

//     res.cookies.set("line_user", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24,
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


import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state") || "/";

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    const promisePool = mysqlPool.promise();

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

    const access_token = tokenData.access_token;

    // 2️⃣ ดึงโปรไฟล์ผู้ใช้
    const profileRes = await fetch("https://api.line.me/v2/profile", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile = await profileRes.json();

    // 3️⃣ ตรวจสถานะเพื่อน
    const friendshipRes = await fetch("https://api.line.me/friendship/v1/status", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const friendship = await friendshipRes.json();
    const isFriend = friendship.friendFlag;

    // 4️⃣ อัปเดต / แทรกข้อมูลลูกค้า
    const [rows]: any = await promisePool.query(
      "SELECT id FROM customers WHERE line_user_id = ?",
      [profile.userId]
    );

    if (rows.length === 0) {
      await promisePool.query(
        "INSERT INTO customers (line_user_id, display_name, picture_url) VALUES (?, ?, ?)",
        [profile.userId, profile.displayName, profile.pictureUrl]
      );
    } else {
      await promisePool.query(
        "UPDATE customers SET display_name = ?, picture_url = ? WHERE line_user_id = ?",
        [profile.displayName, profile.pictureUrl, profile.userId]
      );
    }

    // 5️⃣ สร้าง JWT และเก็บ cookie
    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign(
      {
        user_id: profile.userId,
        line_user_id: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ ตั้ง cookie
    const res = NextResponse.redirect(new URL(state, req.url));
    res.cookies.set("line_user", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // 7️⃣ ถ้ายังไม่เป็นเพื่อน OA → ไปหน้าเว็บกลาง /add-line-friend
    if (!isFriend) {
      return NextResponse.redirect(`${process.env.API_URL}/add-line-friend`);
    }

    return res;
  } catch (err) {
    console.error("LINE callback error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

