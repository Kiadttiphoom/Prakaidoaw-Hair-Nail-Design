import AdminSidebar from "@/components/admin/sidebar/SidebarAdmin";
import { PopupBackofficeContextProvider } from "@/context/PopupBackofficeContext";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PopupBackofficeContextProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </PopupBackofficeContextProvider>
  );
}
