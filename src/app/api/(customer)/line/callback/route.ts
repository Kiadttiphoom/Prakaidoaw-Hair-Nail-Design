import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import jwt from "jsonwebtoken"; // ✅ เพิ่มตรงนี้
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

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

    // 3️⃣ เช็กว่าผู้ใช้มีใน DB หรือยัง
    const [rows]: any = await mysqlPool.query(
      "SELECT id FROM customers WHERE line_user_id = ?",
      [profile.userId]
    );

    let userId: number;
    if (rows.length === 0) {
      const [insertResult]: any = await mysqlPool.query(
        "INSERT INTO customers (line_user_id, display_name, picture_url) VALUES (?, ?, ?)",
        [profile.userId, profile.displayName, profile.pictureUrl]
      );
      userId = insertResult.insertId;
    } else {
      userId = rows[0].id;
      await mysqlPool.query(
        "UPDATE customers SET display_name = ?, picture_url = ? WHERE line_user_id = ?",
        [profile.displayName, profile.pictureUrl, profile.userId]
      );
    }

    // 4️⃣ สร้าง JWT token
    const token = jwt.sign(
      {
        user_id: userId,
        line_user_id: profile.userId,
        name: profile.displayName,
        picture: profile.pictureUrl,
      },
      JWT_SECRET,
      { expiresIn: "7d" } // อายุ 7 วัน
    );

    // 5️⃣ สร้าง cookie JWT
    const state = searchParams.get("state") || "/";
    const redirectUrl = new URL(state, req.url);
    const res = NextResponse.redirect(redirectUrl);

    res.cookies.set("line_user", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 วัน
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
