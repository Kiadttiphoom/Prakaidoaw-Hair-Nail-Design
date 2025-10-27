import { cookies } from "next/headers";
import { UserProvider } from "@/context/UserContext";
import HeaderCustomer from "@/components/customer/header/HeaderCustomer";
import FooterCustomer from "@/components/customer/footer/FooterCustomer";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ ต้อง await cookies() ก่อนใช้งาน
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("line_user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <UserProvider initialUser={user}>
      <div className="min-h-screen flex flex-col bg-white">
        <HeaderCustomer />
        <main className="flex-grow">{children}</main>
        <FooterCustomer />
      </div>
    </UserProvider>
  );
}
