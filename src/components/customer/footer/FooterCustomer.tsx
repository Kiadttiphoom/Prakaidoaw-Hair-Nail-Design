"use client";
import { Scissors, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
export default function FooterCustomer() {

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
                <img src="/logo.png" alt="Logo Text" className="h-10 w-auto" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl tracking-wider text-gray-900 font-light leading-tight block">
                  Prakaidoaw
                </span>
                <span className="text-xl sm:text-2xl tracking-wider text-gray-900 font-light leading-tight block">
                  Hair&Nail Design
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed mb-6">
              ร้านทำผมที่ใส่ใจทุกรายละเอียด<br />
              เพื่อความงามและความพึงพอใจ
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-gray-400 to-transparent"></div>
          </div>

          {/* เวลาเปิด */}
          <div>
            <h4 className="text-gray-900 mb-5 sm:mb-6 font-medium tracking-wide text-base sm:text-lg">
              เวลาเปิดทำการ
            </h4>
            <div className="space-y-3">
              <div>
                <span className="block text-gray-500 text-sm mb-1.5">
                  จันทร์ - อาทิตย์
                </span>
                <span className="text-gray-900 text-lg sm:text-xl font-light">
                  08:00 - 22:00
                </span>
              </div>
            </div>
          </div>

          {/* ติดต่อ */}
          <div>
            <h4 className="text-gray-900 mb-5 sm:mb-6 font-medium tracking-wide text-base sm:text-lg">
              ติดต่อเรา
            </h4>
            <div className="space-y-4">
              {[
                { icon: Phone, text: "090 213 6159", href: "tel:0902136159" },
                {
                  icon: Mail,
                  text: "prakaidoawhiardesign@gmail.com",
                  href: emailLink,
                },
                {
                  icon: MapPin,
                  text: "748 ถนนราษฎอุทิศ ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา",
                  href: "https://maps.app.goo.gl/J9k2ehVRHK8WK5EX6",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  url: "https://www.instagram.com/prakaidoaw.hairdesign",
                },
                {
                  icon: Facebook,
                  url: "https://www.facebook.com/p/Prakaidoaw-Hair-Design-100064100260679",
                },
              ].map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
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
                autoComplete="off"
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <button className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 sm:pt-10 border-t border-gray-300/60 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wide">
            © 2025 Prakaidoaw Hair&Nail Design. All rights reserved.
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