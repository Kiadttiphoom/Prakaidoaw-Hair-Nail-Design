import HeaderCustomer from "@/components/customer/header/HeaderCustomer";
import FooterCustomer from "@/components/customer/footer/FooterCustomer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderCustomer />
      <main className="flex-grow">{children}</main>
      <FooterCustomer />
    </div>
  );
}
