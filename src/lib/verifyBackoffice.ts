// 📁 /lib/verifyBackoffice.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { mysqlPool } from "@/lib/db";

export async function verifyBackoffice() {
  const promisePool = mysqlPool.promise();

  // ✅ อ่าน cookie
  const cookieStore = await cookies();
  const Cookie = cookieStore.get("token");
  if (!Cookie) {
    return { authorized: false, message: "Unauthorized: missing cookie" };
  }

  try {
    // ✅ ถอดรหัส JWT
    const decoded = jwt.verify(Cookie.value, process.env.JWT_SECRET!) as {
      user_id : string;
      user_name: string;
      status:string;
      exp?: number;
    };

    // ✅ ตรวจหมดอายุ
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { authorized: false, message: "Token expired" };
    }

    // ✅ ตรวจว่ามี user ในระบบจริงไหม
    const [check] = await promisePool.query<any[]>(
      `SELECT * FROM users WHERE user_id = ?`,
      [decoded.user_id]
    );

    if (check.length === 0) {
      return { authorized: false, message: "Unauthorized: user not found" };
    }

    // ✅ ผ่านทั้งหมด
    return { authorized: true, user: decoded, data: check[0] };

  } catch (err) {
    console.error("verifyUser error:", err);
    return { authorized: false, message: "Invalid token" };
  }
}
