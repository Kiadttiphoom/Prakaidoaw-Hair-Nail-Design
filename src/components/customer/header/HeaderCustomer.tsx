"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut, User, Scissors, UsersRound, FileImage, TicketPercent,ClipboardClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useSystem } from "@/context/SystemContext";
import { usePathname } from 'next/navigation'

export default function HeaderCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useUser();
  const { system } = useSystem();
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
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer">
            <Image
              src="/android-chrome-192x192.png"
              alt="โลโก้ร้าน Prakaidoaw Hair & Nail Design"
              width={48}
              height={48}
              priority
              quality={70}
              className="h-10 w-auto"
            />
            <span className="text-sm sm:text-xl tracking-widest text-gray-800 font-light">
              {system?.shop_name || "Prakaidoaw Hair & Nail Design"}
            </span>
          </Link>
        </div>


        {/* เมนู Desktop */}
        <div className="hidden md:flex items-center justify-between gap-10 text-sm tracking-wide">
          {!isBookingPage && (
            <>
              <a
                href="/#services"
                className="text-gray-600 hover:text-gray-900 font-light cursor-pointer"
              >
                บริการ
              </a>
              <a
                href="/#stylists"
                className="text-gray-600 hover:text-gray-900 font-light cursor-pointer"
              >
                ช่างผม
              </a>
              <a
                href="/#gallery"
                className="cursor-pointer text-gray-700 hover:text-gray-900"
              >
                ผลงาน
              </a>
            </>
          )}


          <div className="flex items-center gap-4 relative" ref={logoutRef}>
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
                        <div className="py-3 px-2">
                          {isBookingPage && (
                            <div className="px-5 py-4">
                              <div className="flex items-center justify-center gap-2 text-gray-600">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-medium">คุณอยู่ในหน้าจองคิว</span>
                              </div>
                            </div>
                          )}

                          {!isBookingPage && (
                            <Link
                            href="/booking"
                            className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                              <TicketPercent className="h-5 w-5 text-gray-700" />
                            </div>
                            <span className="font-semibold text-sm">จองคิว</span>
                          </Link>
                          )}

                          <Link
                            href="/booking-history"
                            className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                              <ClipboardClock className="h-5 w-5 text-gray-700" />
                            </div>
                            <span className="font-semibold text-sm">ประวัติจองคิว</span>
                          </Link>

                        </div>

                        {/* Logout Button */}
                        <div className="py-3 px-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-4 px-4 py-3.5 text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-sm">
                              <LogOut className="h-5 w-5 text-red-700" />
                            </div>
                            <span className="font-semibold text-sm">ออกจากระบบ</span>
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
                            initial: { opacity: 0, y: -10, scale: 0.95 },
                            animate: { opacity: 1, y: 0, scale: 1 },
                            exit: { opacity: 0, y: -10, scale: 0.95 },
                            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                            className: "absolute right-0 top-16 bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl border border-gray-200/50 rounded-3xl py-2 w-72 text-sm overflow-hidden backdrop-blur-xl z-50"
                          } as any)}
                        >
                          <div className="flex flex-col">
                            {/* User Profile Section */}
                            <div className="px-6 py-5 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/50 to-transparent"></div>
                              <div className="relative flex items-center gap-3">
                                <img
                                  src={user.pictureUrl}
                                  alt="User profile"
                                  className="h-14 w-14 rounded-2xl object-cover border-2 border-white/20 shadow-lg ring-2 ring-white/10"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-white truncate">
                                    คุณ {user.displayName}
                                  </p>
                                  <p className="text-xs text-gray-300 mt-0.5 font-light">ผู้ใช้งานทั่วไป</p>
                                </div>
                              </div>
                            </div>
                            <div className="py-3 px-2">
                              {/* Booking Page Info */}
                              <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50">
                                <div className="flex items-center justify-center gap-2 text-gray-700">
                                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                                  <span className="text-xs font-semibold">คุณอยู่ในหน้าจองคิว</span>
                                </div>
                              </div>

                              <div className="my-3 mx-4 border-t border-gray-200/70"></div>

                              <Link
                            href="/booking-history"
                            className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                              <ClipboardClock className="h-5 w-5 text-gray-700" />
                            </div>
                            <span className="font-semibold text-sm">ประวัติจองคิว</span>
                          </Link>
                            </div>

                            {/* Logout Button */}
                            <div className="py-3 px-2">

                              <button
                              onClick={handleLogout}
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-sm">
                                <LogOut className="h-5 w-5 text-red-700" />
                              </div>
                              <span className="font-semibold text-sm">ออกจากระบบ</span>
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
                          initial: { opacity: 0, y: -10, scale: 0.95 },
                          animate: { opacity: 1, y: 0, scale: 1 },
                          exit: { opacity: 0, y: -10, scale: 0.95 },
                          transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                          className: "absolute right-0 top-16 bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl border border-gray-200/50 rounded-3xl py-2 w-72 text-sm overflow-hidden backdrop-blur-xl z-50"
                        } as any)}
                      >
                        <div className="flex flex-col">
                          {/* User Profile Section */}
                          <div className="px-6 py-5 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/50 to-transparent"></div>
                            <div className="relative flex items-center gap-3">
                              <img
                                src={user.pictureUrl}
                                alt="User profile"
                                className="h-14 w-14 rounded-2xl object-cover border-2 border-white/20 shadow-lg ring-2 ring-white/10"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">
                                  คุณ {user.displayName}
                                </p>
                                <p className="text-xs text-gray-300 mt-0.5 font-light">ผู้ใช้งานทั่วไป</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-3 px-2">
                            <a
                              href="/#services"
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                                <Scissors className="h-5 w-5 text-gray-700" />
                              </div>
                              <span className="font-medium text-sm">บริการ</span>
                            </a>

                            <a
                              href="/#stylists"
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                                <UsersRound className="h-5 w-5 text-gray-700" />
                              </div>
                              <span className="font-medium text-sm">ช่างผม</span>
                            </a>

                            <a
                              href="/#gallery"
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                                <FileImage className="h-5 w-5 text-gray-700" />
                              </div>
                              <span className="font-medium text-sm">ผลงาน</span>
                            </a>


                            <div className="my-3 mx-4 border-t border-gray-200/70"></div>

                            <Link
                              href="/booking"
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                                <TicketPercent className="h-5 w-5 text-gray-700" />
                              </div>
                              <span className="font-semibold text-sm">จองคิว</span>
                            </Link>
                            <Link
                              href="/booking-history"
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                                <TicketPercent className="h-5 w-5 text-gray-700" />
                              </div>
                              <span className="font-semibold text-sm">ประวัติจองคิว</span>
                            </Link>
                          </div>

                          {/* Logout Button */}
                          <div className="py-3 px-2">
                              <button
                              onClick={handleLogout}
                              className="flex items-center w-full gap-4 px-4 py-3.5 text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 rounded-2xl transition-all duration-300 group mb-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-sm">
                                <LogOut className="h-5 w-5 text-red-700" />
                              </div>
                              <span className="font-semibold text-sm">ออกจากระบบ</span>
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
                      initial: { opacity: 0, y: -10, scale: 0.95 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: -10, scale: 0.95 },
                      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                      className: "absolute right-0 top-16 bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl border border-gray-200/50 rounded-3xl py-2 w-72 text-sm overflow-hidden backdrop-blur-xl z-50"
                    } as any)}
                  >
                    <div className="flex flex-col">
                      {/* Guest Header */}
                      <div className="px-6 py-5 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/50 to-transparent"></div>
                        <div className="relative">
                          <p className="text-base font-bold text-white tracking-wide">เมนู</p>
                          <p className="text-xs text-gray-300 mt-1 font-light">สำหรับผู้เยี่ยมชม</p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-3 px-2">
                        <Link
                          href="#services"
                          className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                            <Scissors className="h-5 w-5 text-gray-700" />
                          </div>
                          <span className="font-medium text-sm">บริการ</span>
                        </Link>

                        <Link
                          href="#stylists"
                          className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                            <UsersRound className="h-5 w-5 text-gray-700" />
                          </div>
                          <span className="font-medium text-sm">ช่างผม</span>
                        </Link>

                        <Link
                          href="#gallery"
                          className="flex items-center w-full gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-2xl transition-all duration-300 group mb-1"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 shadow-sm">
                            <FileImage className="h-5 w-5 text-gray-700" />
                          </div>
                          <span className="font-medium text-sm">ผลงาน</span>
                        </Link>
                      </div>

                      {/* Login Button */}
                      <div className="border-t border-gray-200/70 px-2 pb-2 pt-3">
                        <button
                          onClick={handleLineLogin}
                          className="flex items-center justify-center w-full gap-3 px-4 py-3.5 text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
                        >
                          <User className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold text-sm">เข้าสู่ระบบ</span>
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