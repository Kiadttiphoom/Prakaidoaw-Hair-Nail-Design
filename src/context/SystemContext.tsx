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

const SystemContext = createContext<{ system: SystemType | null }>({
  system: null,
});

export const useSystem = () => useContext(SystemContext);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [system, setSystem] = useState<SystemType | null>(null);

  useEffect(() => {
    const fetchSystem = async () => {
      try {
        const res = await fetch("/api/system", { cache: "force-cache" });
        const data = await res.json();
        const sys = data.data;
        setSystem(sys);
      } catch (err) {
        // console.error("โหลดข้อมูล system ไม่ได้:", err);
      }
    };

    if (!system) fetchSystem();
  }, []);

  return (
    <SystemContext.Provider value={{ system }}>
      {children}
    </SystemContext.Provider>
  );
}
