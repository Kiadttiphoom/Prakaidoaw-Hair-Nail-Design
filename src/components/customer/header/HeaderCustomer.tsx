"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, LogOut, User, Scissors, UsersRound, FileImage, TicketPercent } from "lucide-react";
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
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex items-center justify-between relative">
        {/* โลโก้ */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo Text" className="h-10 w-auto" />
          <span className="text-sm sm:text-xl tracking-widest text-gray-800 font-light">
            Prakaidoaw Hair&Nail Design
          </span>
        </div>

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
              <a
                  href="/booking"
                  className="cursor-pointer bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light w-25 text-center"
                >
                  จองคิว
                </a>

            )}
            {user ? (
              <>
                <img
                  src={user.pictureUrl}
                  alt="User profile"
                  className="h-10 w-10 rounded-full object-cover border border-gray-300 cursor-pointer"
                  onClick={() => setShowLogout((prev) => !prev)}
                />

                <AnimatePresence>
                  {showLogout && (
                    <motion.div
                      {...({
                        initial: { opacity: 0, y: -5 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -5 },
                        transition: { duration: 0.2 },
                        className: "absolute right-0 top-12 bg-white shadow-lg border border-gray-200 rounded-xl py-2 w-50 text-sm"
                      } as any)}
                    >
                      <div className="flex flex-col">
                            {/* User Profile Section */}
                            <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                              <div className="flex items-center gap-3">
                                <img
                                  src={user.pictureUrl}
                                  alt="User profile"
                                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-sm ring-2 ring-white"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-800 truncate">
                                    คุณ {user.displayName}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">ผู้ใช้งานทั่วไป</p>
                                </div>
                              </div>
                            </div>

                            {isBookingPage && (
                              <div className="px-5 py-4">
                              <div className="flex items-center justify-center gap-2 text-gray-600">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-medium">คุณอยู่ในหน้าจองคิว</span>
                              </div>
                            </div>
                            )}
                          
                            {/* Logout Button */}
                            <div className="border-t border-gray-100 pt-2">
                              <button
                                onClick={handleLogout}
                                className="flex items-center w-full gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                              >
                                <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">ออกจากระบบ</span>
                              </button>
                            </div>
                          </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <button
                onClick={handleLineLogin}
                className="cursor-pointer bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light w-25 text-center"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden md:flex items-center justify-between gap-10 text-sm tracking-wide">
          <div className="flex items-center gap-4 relative" ref={logoutRef}>
            <Menu
              stroke="#666666ff"
              className="h-10 w-10 cursor-pointer"
              onClick={() => setShowLogout((prev) => !prev)}
            />
            {user ? (
              <>
                {isBookingPage ? (
                  <>
                    <AnimatePresence>
                      {showLogout && (
                        <motion.div
                          {...({
                            initial: { opacity: 0, y: -10 },
                            animate: { opacity: 1, y: 0 },
                            exit: { opacity: 0, y: -10 },
                            transition: { duration: 0.3, ease: "easeOut" },
                            className: "absolute right-0 top-16 bg-white shadow-2xl border border-gray-100 rounded-2xl py-3 w-72 text-sm overflow-hidden backdrop-blur-sm z-50"
                          } as any)}
                        >
                          <div className="flex flex-col">
                            {/* User Profile Section */}
                            <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                              <div className="flex items-center gap-3">
                                <img
                                  src={user.pictureUrl}
                                  alt="User profile"
                                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-sm ring-2 ring-white"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-800 truncate">
                                    คุณ {user.displayName}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">ผู้ใช้งานทั่วไป</p>
                                </div>
                              </div>
                            </div>

                            {/* Booking Page Info */}
                            <div className="px-5 py-4">
                              <div className="flex items-center justify-center gap-2 text-gray-600">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-medium">คุณอยู่ในหน้าจองคิว</span>
                              </div>
                            </div>

                            {/* Logout Button */}
                            <div className="border-t border-gray-100 pt-2">
                              <button
                                onClick={handleLogout}
                                className="flex items-center w-full gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                              >
                                <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">ออกจากระบบ</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <AnimatePresence>
                    {showLogout && (
                      <motion.div
                        {...({
                          initial: { opacity: 0, y: -10 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: -10 },
                          transition: { duration: 0.3, ease: "easeOut" },
                          className: "absolute right-0 top-16 bg-white shadow-2xl border border-gray-100 rounded-2xl py-3 w-72 text-sm overflow-hidden backdrop-blur-sm z-50"
                        } as any)}
                      >
                        <div className="flex flex-col">
                          {/* User Profile Section */}
                          <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.pictureUrl}
                                alt="User profile"
                                className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-sm ring-2 ring-white"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  คุณ {user.displayName}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">ผู้ใช้งานทั่วไป</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            <Link
                              href="#services"
                              className="flex items-center w-full gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <span className="text-xs"><Scissors className="h-5 w-5" /></span>
                              </div>
                              <span className="font-medium">บริการ</span>
                            </Link>

                            <Link
                              href="#stylists"
                              className="flex items-center w-full gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <span className="text-xs"><UsersRound className="h-5 w-5" /></span>
                              </div>
                              <span className="font-medium">ช่างผม</span>
                            </Link>

                            <Link
                              href="#gallery"
                              className="flex items-center w-full gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <span className="text-xs"><FileImage className="h-5 w-5" /></span>
                              </div>
                              <span className="font-medium">ผลงาน</span>
                            </Link>

                            <div className="my-2 mx-5 border-t border-gray-100"></div>

                            <Link
                              href="/booking"
                              className="flex items-center w-full gap-3 px-5 py-3 text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <span className="text-xs"><TicketPercent className="h-5 w-5" /></span>
                              </div>
                              <span className="font-semibold">จองคิว</span>
                            </Link>
                          </div>

                          {/* Logout Button */}
                          <div className="border-t border-gray-100 pt-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                            >
                              <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                              <span className="font-medium">ออกจากระบบ</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </>
            ) : (
              <AnimatePresence>
                {showLogout && (
                  <motion.div
                    {...({
                      initial: { opacity: 0, y: -10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 },
                      transition: { duration: 0.3, ease: "easeOut" },
                      className: "absolute right-0 top-16 bg-white shadow-2xl border border-gray-100 rounded-2xl py-3 w-72 text-sm overflow-hidden backdrop-blur-sm z-50"
                    } as any)}
                  >
                    <div className="flex flex-col">
                      {/* Guest Header */}
                      <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">เมนู</p>
                        <p className="text-xs text-gray-500 mt-0.5">สำหรับผู้เยี่ยมชม</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="#services"
                          className="flex items-center w-full gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-xs"><Scissors className="h-5 w-5" /></span>
                          </div>
                          <span className="font-medium">บริการ</span>
                        </Link>

                        <Link
                          href="#stylists"
                          className="flex items-center w-full gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-xs"><UsersRound className="h-5 w-5" /></span>
                          </div>
                          <span className="font-medium">ช่างผม</span>
                        </Link>

                        <Link
                          href="#gallery"
                          className="flex items-center w-full gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-xs"><FileImage className="h-5 w-5" /></span>
                          </div>
                          <span className="font-medium">ผลงาน</span>
                        </Link>

                        <div className="my-2 mx-5 border-t border-gray-100"></div>

                        <Link
                          href="/booking"
                          className="flex items-center w-full gap-3 px-5 py-3 text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <span className="text-xs"><TicketPercent className="h-5 w-5" /></span>
                          </div>
                          <span className="font-semibold">จองคิว</span>
                        </Link>
                      </div>

                      {/* Login Button */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLineLogin}
                          className="flex items-center w-full gap-3 px-5 py-3 text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <LogOut className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">เข้าสู่ระบบ</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}