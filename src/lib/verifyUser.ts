// 📁 /lib/verifyUser.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { mysqlPool } from "@/lib/db";

export async function verifyUser() {
  const promisePool = mysqlPool.promise();

  // ✅ อ่าน cookie
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("line_user");
  if (!userCookie) {
    return { authorized: false, message: "Unauthorized: missing cookie" };
  }

  try {
    // ✅ ถอดรหัส JWT
    const decoded = jwt.verify(userCookie.value, process.env.JWT_SECRET!) as {
      user_id : string;
      line_user_id: string;
      displayName:string;
      pictureUrl:string;
      exp?: number;
    };

    // ✅ ตรวจหมดอายุ
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { authorized: false, message: "Token expired" };
    }

    // ✅ ตรวจว่ามี user ในระบบจริงไหม
    const [check] = await promisePool.query<any[]>(
      `SELECT * FROM customers WHERE line_user_id = ?`,
      [decoded.line_user_id]
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
