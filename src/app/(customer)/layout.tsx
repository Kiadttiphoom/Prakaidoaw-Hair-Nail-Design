"use client";

import { usePathname } from "next/navigation";
import HeaderCustomer from "@/components/customer/header/HeaderCustomer";
import FooterCustomer from "@/components/customer/footer/FooterCustomer";
import { UserProvider } from "@/context/UserContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔹 list ของหน้าที่ "ไม่ต้องการให้แสดง Header"
  const noHeaderPaths = ["/booking"];

  const showHeader = !noHeaderPaths.includes(pathname);

  return (
    <UserProvider>
    <div className="min-h-screen flex flex-col bg-white">
      {showHeader && <HeaderCustomer />}
      <main className="flex-grow">{children}</main>
      <FooterCustomer />
    </div>
    </UserProvider>
  );
}
