"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Scissors, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderCustomer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* โลโก้ */}
        <div className="flex items-center gap-3">
          <Scissors className="w-6 h-6 text-gray-800" strokeWidth={1} />
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
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          <Link
            href="#services"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            บริการ
          </Link>
          <Link
            href="#stylists"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            ช่างผม
          </Link>
          <Link
            href="#gallery"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            ผลงาน
          </Link>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light">
            จองคิว
          </button>
        </div>
      </div>

      {/* เมนูมือถือแบบ slide-down นุ่มนวล */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
              {...({
                initial: { opacity: 0, y: -2 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -2 },
                transition: {
                  opacity: { duration: 0.2, ease: "easeOut" },
                  y: { duration: 0.25, ease: "easeOut" },
                },
                className:
                  "md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 flex flex-col items-center py-2 space-y-2 text-sm shadow-md fixed top-[52px] left-0 right-0",
              } as any)}
            >

            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 font-light"
            >
              บริการ
            </Link>
            <Link
              href="#stylists"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 font-light"
            >
              ช่างผม
            </Link>
            <Link
              href="#gallery"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 font-light"
            >
              ผลงาน
            </Link>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light">
              จองคิว
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
