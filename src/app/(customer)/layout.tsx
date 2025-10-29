import { cookies } from "next/headers";
import { UserProvider } from "@/context/UserContext";
import HeaderCustomer from "@/components/customer/header/HeaderCustomer";
import FooterCustomer from "@/components/customer/footer/FooterCustomer";
import jwt from "jsonwebtoken";

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
      // ✅ ถอดรหัส JWT (เก็บ payload ทั้งหมด)
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      user = decoded as {
        user_id: number;
        line_user_id: string;
        name: string;
        picture: string;
      };
    } catch (err) {
      //console.error("❌ Invalid JWT:", err);
    }
  }

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
