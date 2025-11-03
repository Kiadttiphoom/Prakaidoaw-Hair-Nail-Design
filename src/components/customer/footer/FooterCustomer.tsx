"use client";
import { Scissors, Instagram, Facebook, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSystem } from "@/context/SystemContext";
export default function FooterCustomer() {

  const { system } = useSystem();

  const [emailLink, setEmailLink] = useState("mailto:prakaidoawhiardesign@gmail.com");

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      setEmailLink("https://mail.google.com/mail/?view=cm&fs=1&to=prakaidoawhiardesign@gmail.com");
    }
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-gray-200/30 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">

          {/* โลโก้ */}
          <div>
            <div className="flex items-start gap-3 mb-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#fff] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <img src={system?.logo_url || "logo.png"} alt="โลโก้ร้าน Prakaidoaw Hair & Nail Design" className="h-10 w-auto" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl tracking-wider text-gray-900 font-light leading-tight block">
                  {system?.shop_name || "Prakaidoaw"}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed mb-6">
              {system?.description}
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-gray-400 to-transparent"></div>
          </div>

          {/* เวลาเปิด */}
          <div>
            <h2 className="text-gray-900 mb-5 sm:mb-6 font-medium tracking-wide text-base sm:text-lg">
              เวลาเปิดทำการ
            </h2>
            <div className="space-y-3">
              <div>
                <span className="block text-gray-500 text-sm mb-1.5">
                  {system?.open_days
                    ? (() => {
                      const mapTH: Record<string, string> = {
                        mon: "จันทร์",
                        tue: "อังคาร",
                        wed: "พุธ",
                        thu: "พฤหัสบดี",
                        fri: "ศุกร์",
                        sat: "เสาร์",
                        sun: "อาทิตย์",
                      };

                      const days = system.open_days
                        .split(",")
                        .map((day) => mapTH[day.trim().toLowerCase()] || day);

                      return days.length === 7 ? "จันทร์ - อาทิตย์" : days.join(" - ");
                    })()
                    : "จันทร์ - อาทิตย์"}
                </span>
                <span className="text-gray-900 text-lg sm:text-xl font-light">
                  {system?.open_time?.slice(0, 5)} - {system?.close_time?.slice(0, 5)}
                </span>
              </div>
            </div>
          </div>

          {/* ติดต่อ */}
          <div>
            <h2 className="text-gray-900 mb-5 sm:mb-6 font-medium tracking-wide text-base sm:text-lg">
              ติดต่อเรา
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  text: system?.phone,
                  href: `tel:${system?.phone?.replace(/\s+/g, "")}`,
                  label: `โทร ${system?.phone || ""}`,
                },
                {
                  icon: Mail,
                  text: system?.email,
                  href: emailLink,
                  label: `ส่งอีเมลถึง ${system?.email || ""}`,
                },
                {
                  icon: MapPin,
                  text: system?.address,
                  href: system?.maps,
                  label: `เปิดแผนที่ไปยัง ${system?.address || ""}`,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex items-start gap-3 text-gray-600 text-sm hover:text-gray-900 font-light group transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 group-hover:border-gray-400 transition-colors flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="leading-relaxed pt-1.5 break-words">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ติดตาม */}
          <div>
            <h4 className="text-gray-900 mb-5 sm:mb-6 font-medium tracking-wide text-base sm:text-lg">
              ติดตามเรา
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                {
                  icon: Instagram,
                  url: system?.instagram,
                  label: "Instagram",
                },
                {
                  icon: Facebook,
                  url: system?.facebook,
                  label: "Facebook",
                },
              ].map(({ icon: Icon, url, label }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`เปิดหน้า ${label}`}
                  title={`เปิดหน้า ${label}`}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 border border-gray-200 hover:text-pink-500 hover:border-pink-300 transition-all"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm font-light mb-3 tracking-wide">
              รับข่าวสารและโปรโมชั่น
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                aria-label="อีเมลของคุณ"
                autoComplete="off"
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-300 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
              />
              <button
                aria-label="รับข่าวสารและโปรโมชั่น"
                title="รับข่าวสารและโปรโมชั่น"
                className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>


          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 sm:pt-10 border-t border-gray-300/60 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wide">
            © {new Date().getFullYear()} {system?.shop_name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-xs sm:text-sm font-light text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              เงื่อนไขการใช้งาน
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}