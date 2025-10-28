"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { usePathname } from 'next/navigation'

export default function HeaderCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useUser();
  const logoutRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isBookingPage = pathname === "/booking";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLineLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID!;
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_LINE_CALLBACK_URL!);

    // 👉 เก็บ path ปัจจุบัน (เช่น /home, /services, /booking)
    const currentPath = window.location.pathname;
    const state = encodeURIComponent(currentPath); // ปลอดภัยกับ URL ที่มี /

    const scope = "profile openid email";

    // 👉 ส่ง state ไปด้วย เพื่อให้ callback รู้ว่าต้องกลับมาหน้าไหน
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  };


  const handleLogout = async () => {
    try {
      await fetch("/api/line/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }finally{
      window.location.href = "/";
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
          {/* โลโก้ */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo Text" className="h-10 w-auto" />
            <span className="text-xl tracking-widest text-gray-800 font-light">
              Prakaidoaw Hair&Nail Design
            </span>
          </div>

          {/* ปุ่ม Hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* เมนู Desktop */}
          <div className="hidden md:flex items-center justify-between gap-10 text-sm tracking-wide">
            {!isBookingPage && (
              <>
              <Link href="#services" className="text-gray-600 hover:text-gray-900 font-light">
              บริการ
            </Link>
            <Link href="#stylists" className="text-gray-600 hover:text-gray-900 font-light">
              ช่างผม
            </Link>
            <Link href="#gallery" className="text-gray-600 hover:text-gray-900 font-light">
              ผลงาน
            </Link>
              </>
            )}
            

            <div className="flex items-center gap-4 relative" ref={logoutRef}>
              {!isBookingPage && (
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light">
                <a href="/booking">จองคิว</a>
              </button>
              )}
              {user ? (
                <>
                  <button
                    onClick={() => setShowLogout((prev) => !prev)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light"
                  >
                    {user.displayName}
                  </button>

                  <AnimatePresence>
                    {showLogout && (
                      <motion.div
                        {...({
                          initial: { opacity: 0, y: -5 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: -5 },
                          transition: { duration: 0.2 },
                          className: "absolute right-0 top-12 bg-white shadow-lg border border-gray-200 rounded-xl py-2 w-36 text-sm"
                        } as any)}
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                        >
                          <LogOut className="w-4 h-4 text-gray-500" />
                          ออกจากระบบ
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <button
                  onClick={handleLineLogin}
                  className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light"
                >
                  เข้าสู่ระบบ
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* เมนูมือถือ - ย้ายออกมาข้างนอก nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              {...({
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.3 },
                onClick: () => setIsOpen(false),
                className: "md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              } as any)}
            />

            {/* Slide Menu */}
            <motion.div
              {...({
                initial: { x: "100%" },
                animate: { x: 0 },
                exit: { x: "100%" },
                transition: {
                  type: "spring",
                  damping: 30,
                  stiffness: 300
                },
                className: "md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-[70] flex flex-col"
              } as any)}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-light text-gray-900">เมนู</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="space-y-1">
                  <Link
                    href="#services"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all font-light"
                  >
                    บริการ
                  </Link>
                  <Link
                    href="#stylists"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all font-light"
                  >
                    ช่างผม
                  </Link>
                  <Link
                    href="#gallery"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all font-light"
                  >
                    ผลงาน
                  </Link>
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-800 transition-all font-light shadow-sm">
                    จองคิว
                  </button>
                </Link>

                {user ? (
                  <>
                    <button
                      onClick={() => setShowLogout((prev) => !prev)}
                      className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-200 transition-all font-light flex items-center justify-center gap-2"
                    >
                      <span>{user.displayName}</span>
                    </button>

                    <AnimatePresence>
                      {showLogout && (
                        <motion.div
                          {...({
                            initial: { opacity: 0, scale: 0.95 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.95 },
                            transition: { duration: 0.15 },
                            className: "bg-gray-50 rounded-lg overflow-hidden"
                          } as any)}
                        >
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all"
                          >
                            <LogOut className="w-4 h-4 text-gray-500" />
                            <span className="font-light">ออกจากระบบ</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={handleLineLogin}
                    className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-200 transition-all font-light"
                  >
                    เข้าสู่ระบบ
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}