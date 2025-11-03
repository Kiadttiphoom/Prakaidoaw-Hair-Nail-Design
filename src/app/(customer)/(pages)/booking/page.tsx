// app/booking/page.tsx
import BookingClient from "./BookingClient";
import { cookies } from "next/headers";

export default async function BookingPage() {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("line_user")?.value;

    // ✅ โหลด stylists และตรวจสอบ auth ฝั่ง server
    const [stylistsRes, authRes] = await Promise.all([
      fetch(`${process.env.API_URL || "http://localhost:3000"}/api/stylists`, {
        cache: "no-store",
      }),
      fetch(`${process.env.API_URL || "http://localhost:3000"}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: token ? `line_user=${token}` : "",
        },
        cache: "no-store",
        
      }),
    ]);

    const stylistsData = await stylistsRes.json();
    const authData = await authRes.json();
    const isAuth = authRes.status === 200 && authData.message === "Success";
    

    return (
      <BookingClient
        stylists={stylistsData?.data?.stylists || []}
        isAuth={isAuth}
      />
    );
  } catch (err) {
    console.error("SSR booking error:", err);
    return <BookingClient stylists={[]} isAuth={false} />;
  }
}
