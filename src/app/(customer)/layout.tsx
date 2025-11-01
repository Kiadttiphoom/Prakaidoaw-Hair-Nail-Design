import { cookies } from "next/headers";
import { UserProvider } from "@/context/UserContext";
import { SystemProvider } from "@/context/SystemContext";
import HeaderCustomer from "@/components/customer/header/HeaderCustomer";
import FooterCustomer from "@/components/customer/footer/FooterCustomer";
import jwt from "jsonwebtoken";
import { PopupCustomerContextProvider } from "@/context/PopupCustomerContext";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ ดึง cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("line_user")?.value;

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      user = decoded as {
        user_id: number;
        line_user_id: string;
        displayName: string;
        pictureUrl: string;
      };
    } catch (err) {
      // Invalid JWT
    }
  }

  // ✅ ดึงข้อมูล system แบบ SSR
  let systemData = null;
  try {
    const res = await fetch(
      `${process.env.API_URL || "http://localhost:3000"}/api/system`,
      { 
        cache: "force-cache",
        next: { revalidate: 3600 } // cache 1 ชั่วโมง
      }
    );
    const data = await res.json();
    systemData = data.data;
  } catch (err) {
    console.error("Failed to fetch system data:", err);
  }

  return (
    // ✅ ส่ง systemData เป็น initialData
    <SystemProvider initialData={systemData}>
      <UserProvider initialUser={user}>
        <PopupCustomerContextProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <HeaderCustomer />
          <main className="flex-grow">{children}</main>
          <FooterCustomer />
        </div>
        </PopupCustomerContextProvider>
      </UserProvider>
    </SystemProvider>
  );
}