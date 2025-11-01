import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  try {
    const { userid, password } = await request.json();
    const JWT_SECRET = process.env.JWT_SECRET!;
    const algorithm = "aes-256-cbc";
    const promisePool = mysqlPool.promise();

    // ✅ แปลง key แบบเดียวกับ VB.NET
    const key = Buffer.alloc(32);
    const keyBytes = Buffer.from(JWT_SECRET, "utf8");
    keyBytes.copy(key, 0, 0, Math.min(keyBytes.length, 32));

    // 🔹 ดึงข้อมูลผู้ใช้
    const [users] = await promisePool.query<any[]>(
      `SELECT user_id, user_name, password, status FROM users WHERE user_id = ?`,
      [userid]
    );

    if (users.length === 0) {
      return NextResponse.json({ message: "ไม่พบชื่อผู้ใช้" }, { status: 401 });
    }

    const user = users[0];
    const passwordAES = user.password;

    try {
      const fullCipher = Buffer.from(passwordAES, "base64");
      const iv = fullCipher.subarray(0, 16);
      const cipherText = fullCipher.subarray(16);

      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(cipherText, undefined, "utf8");
      decrypted += decipher.final("utf8");

      if (decrypted !== password) {
        return NextResponse.json(
          { message: "รหัสผ่านไม่ถูกต้อง" },
          { status: 401 }
        );
      }

      // 🔹 สร้าง JWT
      const token = jwt.sign(
        {
          user_id: user.user_id,
          user_name: user.user_name,
          status: user.status,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const response = NextResponse.json({ message: "Login success" }, { status: 200 });
      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } catch (err) {
      console.error("Decrypt error:", err);
      return NextResponse.json(
        { message: "เกิดข้อผิดพลาดในการถอดรหัส" },
        { status: 500 }
      );
    }


  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // ✅ สร้าง response พร้อมสั่งลบ cookie token
    const response = NextResponse.json(
      { message: "Logout success" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: "",
      expires: new Date(0),
      path: "/", // ให้หมดอายุทั่วทั้งโดเมน
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
