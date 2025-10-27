"use client";

import { usePathname } from "next/navigation";
import HeaderCustomer from "@/components/customer/header/HeaderCustomer";
import FooterCustomer from "@/components/customer/footer/FooterCustomer";
import { UserProvider, useUser } from "@/context/UserContext";

// ✅ สร้าง component แยกออกมา เพื่อให้ useUser() อยู่ใน Provider แล้ว
function CustomerLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useUser();

  // หน้าที่ไม่ต้องแสดง Header
  const noHeaderPaths = ["/booking"];
  const showHeader = !noHeaderPaths.includes(pathname);

  if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img
        src="/logo_2.png"
        alt="Prakaidoaw Logo"
        className="w-16 h-16 animate-spin-slow mb-4"
      />
      <p className="text-gray-500 font-light">กำลังโหลดข้อมูลผู้ใช้...</p>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}




  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showHeader && <HeaderCustomer />}
      <main className="flex-grow">{children}</main>
      <FooterCustomer />
    </div>
  );
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  // ✅ ครอบ Provider ไว้ชั้นนอกสุด
  return (
    <UserProvider>
      <CustomerLayoutContent>{children}</CustomerLayoutContent>
    </UserProvider>
  );
}
