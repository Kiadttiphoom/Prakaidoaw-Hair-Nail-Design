"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SystemType = {
  shop_name: string;
  open_days: string;
  open_time: string;
  close_time: string;
  phone: string;
  email: string;
  line_id: string;
  facebook: string;
  instagram: string;
  address?: string;
  description?: string;
  logo_url?: string;
  maps?: string;
};

const SystemContext = createContext<{ 
  system: SystemType | null;
}>({
  system: null,
});

export const useSystem = () => useContext(SystemContext);

export function SystemProvider({ 
  children,
  initialData 
}: { 
  children: React.ReactNode;
  initialData?: SystemType | null;
}) {
  // ✅ ใช้ initialData จาก SSR ถ้ามี
  const [system, setSystem] = useState<SystemType | null>(initialData || null);

  useEffect(() => {
    // ✅ ถ้ามี initialData แล้ว ไม่ต้องเรียก API
    if (initialData) {
      sessionStorage.setItem("system_data", JSON.stringify(initialData));
      return;
    }

    const fetchSystem = async () => {
      try {
        // ✅ ลองดึงจาก sessionStorage ก่อน
        const cached = sessionStorage.getItem("system_data");
        if (cached) {
          setSystem(JSON.parse(cached));
          return;
        }

        // ✅ ถ้าไม่มี cache ค่อยเรียก API
        const res = await fetch("/api/system", { cache: "force-cache" });
        const data = await res.json();
        const sys = data.data;
        
        setSystem(sys);
        sessionStorage.setItem("system_data", JSON.stringify(sys));
      } catch (err) {
        console.error("โหลดข้อมูล system ไม่ได้:", err);
      }
    };

    fetchSystem();
  }, [initialData]);

  // ✅ ไม่มี Loading Screen - แสดง children ทันที
  return (
    <SystemContext.Provider value={{ system }}>
      {children}
    </SystemContext.Provider>
  );
}