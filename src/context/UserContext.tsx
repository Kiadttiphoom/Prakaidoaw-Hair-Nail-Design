import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // ✅ โหลดค่าจาก localStorage ทันที (ก่อน render)
  const [user, setUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(false); // เริ่มจาก false เพราะมีค่าเริ่มต้นแล้ว

  useEffect(() => {
    // ✅ ตรวจสอบข้อมูลจาก backend อีกครั้ง (background check)
    const verifyUser = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (data?.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // sync localStorage
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
