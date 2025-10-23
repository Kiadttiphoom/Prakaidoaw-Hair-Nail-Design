"use client";
import { Scissors, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export default function FooterCustomer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 py-10 sm:py-15 relative overflow-hidden z-50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-gray-200/30 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-16 mb-12 sm:mb-20">
          {/* โลโก้ */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <Scissors className="w-5 h-5 sm:w-7 sm:h-7 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-2xl sm:text-3xl tracking-[0.25em] text-gray-900 font-extralight">ATELIER</span>
            </div>
            <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mb-5 sm:mb-8">
              ร้านทำผมสไตล์มินิมัล<br />ที่ใส่ใจทุกรายละเอียด
            </p>
            <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-gray-400 to-transparent"></div>
          </div>

          {/* เวลาเปิด */}
          <div>
            <h4 className="text-gray-900 mb-5 sm:mb-8 font-light tracking-wider text-base sm:text-lg">เวลาเปิดทำการ</h4>
            <div className="grid grid-cols-2 sm:block gap-x-6 gap-y-3 sm:space-y-5 text-sm sm:text-base font-light text-gray-600 leading-relaxed">
              <div>
                <span className="block text-gray-500 text-xs sm:text-sm mb-1">จันทร์ - ศุกร์</span>
                <span className="text-gray-900 text-base sm:text-lg">10:00 - 20:00</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs sm:text-sm mb-1">เสาร์ - อาทิตย์</span>
                <span className="text-gray-900 text-base sm:text-lg">09:00 - 19:00</span>
              </div>
            </div>
          </div>

          {/* ติดต่อ */}
          <div>
            <h4 className="text-gray-900 mb-5 sm:mb-8 font-light tracking-wider text-base sm:text-lg">ติดต่อเรา</h4>
            <div className="space-y-3 sm:space-y-5">
              {[
                { icon: Phone, text: "081-234-5678", href: "tel:0812345678" },
                { icon: Mail, text: "info@atelier.com", href: "mailto:info@atelier.com" },
                { icon: MapPin, text: "กรุงเทพมหานคร", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 sm:gap-5 text-gray-600 text-sm sm:text-base hover:text-gray-900 font-light group"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center border border-gray-100">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </div>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ติดตาม */}
          <div>
            <h4 className="text-gray-900 mb-5 sm:mb-8 font-light tracking-wider text-base sm:text-lg">ติดตามเรา</h4>
            <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-12">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-gray-600 border border-gray-100"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <div>
              <p className="text-gray-500 text-xs sm:text-sm font-light mb-3 sm:mb-5 tracking-wide">รับข่าวสารและโปรโมชั่น</p>
              <div className="flex gap-2 sm:gap-3">
                <input
                type="email"
                autoComplete="off"
                placeholder="Enter your email"
                suppressHydrationWarning
                className="flex-1 px-4 py-3 sm:px-5 sm:py-4 rounded-full bg-white border border-gray-200"
                />

                <button className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="pt-8 sm:pt-12 border-t border-gray-300/60 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wider">
            © 2025 ATELIER. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-10 text-xs sm:text-sm font-light text-gray-500">
            <a href="#" className="hover:text-gray-900">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="hover:text-gray-900">
              เงื่อนไขการใช้งาน
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
