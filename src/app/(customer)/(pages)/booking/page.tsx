"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, ChevronRight, Check } from "lucide-react";
import BookingSkeleton from "@/components/UI/customer/Skeleton/BookingSkeleton";

export default function BookingPage() {
  const [loading, setLoading] = useState(true);
  const [popupAuth, setPopupAuth] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    note: ""
  });

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      fetch("/api/services").then((res) => res.json()),
      fetch("/api/auth", { method: "POST", credentials: "include" })
        .then(async (res) => {
          const data = await res.json();
          return { status: res.status, data };
        }),
    ])
      .then(([servicesResult, authResult]) => {
        // ✅ services
        if (servicesResult.status === "fulfilled") {
          // เซ็ตข้อมูล service ก่อน
          setServices(servicesResult.value.data.services);
        }

        // ✅ auth
        if (authResult.status === "fulfilled") {
          const { status, data } = authResult.value;

          if (status === 200 && data.message === "Success") {
            setPopupAuth(false);
          } else {
            setPopupAuth(true);
          }

        } else {
          setPopupAuth(true);
        }
      })
      .catch((err) => {
        setPopupAuth(true);
      });
  }, []);

  // ✅ useEffect แยก รอให้ข้อมูล services ถูกเซ็ตจริง แล้วค่อยปิด loading
  useEffect(() => {
    if (services.length > 0) {
      // ให้ดีควร delay 1 frame เพื่อให้ UI render ทัน
      const timeout = setTimeout(() => setLoading(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [services]);

  useEffect(() => {
    if (popupAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [popupAuth]);




  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "22:00"
  ];


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


  const handleSubmit = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("จองคิวสำเร็จ! เราจะติดต่อกลับไปยืนยันในไม่ช้า");
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.service;
    if (step === 2) return formData.date && formData.time;
    if (step === 3) return formData.name && formData.phone;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Header */}
      {popupAuth && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-[90%] max-w-sm text-center animate-fade-in-up relative">
            <h3 className="text-gray-800 text-xl font-medium mb-3">
              กรุณาเข้าสู่ระบบ
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              เพื่อเข้าสู่ระบบการ{" "}
              <span className="font-medium text-gray-800">จองคิวบริการ</span> ของร้าน{" "}
              <br />
              <span className="font-semibold text-gray-900">
                Prakaidoaw Hair&Nail Design
              </span>
              <br />
              เข้าสู่ระบบด้วยบัญชี LINE ของคุณได้เลยค่ะ
            </p>
          <div>
            <button
              onClick={handleLineLogin}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-800 transition-all font-light shadow-md mb-4"
            >
              เข้าสู่ระบบด้วย LINE
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="w-full bg-red-900 text-white px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-red-800 transition-all font-light shadow-md"
            >
              ยกเลิก
            </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
          <BookingSkeleton />
      ) : 
        <>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 sm:py-6 mt-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ย้อนกลับ
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-5">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs text-gray-400 tracking-[0.3em] font-light uppercase">
              Booking
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light mb-4">
            จองคิว
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-light">
            เลือกบริการและเวลาที่สะดวกสำหรับคุณ
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 sm:mb-16">
          {[
            { num: 1, label: "เลือกบริการ" },
            { num: 2, label: "เลือกวันเวลา" },
            { num: 3, label: "ข้อมูลติดต่อ" }
          ].map((item, index) => (
            <div key={item.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= item.num
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "bg-white border-gray-200 text-gray-400"
                  }`}>
                  {step > item.num ? (
                    <Check className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <span className="text-sm sm:text-base font-light">{item.num}</span>
                  )}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 mt-2 font-light hidden sm:block">
                  {item.label}
                </span>
              </div>
              {index < 2 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 sm:mx-4 transition-all duration-300 ${step > item.num ? "bg-gray-900" : "bg-gray-200"
                  }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-10 shadow-sm">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-8">
                เลือกบริการที่ต้องการ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setFormData({ ...formData, service: service.id })}
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left ${formData.service === service.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="relative h-32 sm:h-40 overflow-hidden">
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-lg sm:text-xl text-white font-light mb-0.5">
                          {service.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-600 font-light mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="text-base sm:text-lg text-gray-900 font-light">
                        เริ่มต้น {service.price_min} บาท
                      </div>
                    </div>
                    {formData.service === service.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                        <Check className="w-4 h-4 text-gray-900" strokeWidth={2.5} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-8">
              <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-8">
                เลือกวันและเวลา
              </h3>

              {/* Date Picker */}
              <div>
                <label className="flex items-center gap-2 text-base sm:text-lg text-gray-700 font-light mb-4">
                  <Calendar className="w-5 h-5" strokeWidth={1.5} />
                  เลือกวันที่
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-base"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="flex items-center gap-2 text-base sm:text-lg text-gray-700 font-light mb-4">
                  <Clock className="w-5 h-5" strokeWidth={1.5} />
                  เลือกเวลา
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-3 px-4 rounded-xl border-2 text-sm sm:text-base font-light transition-all duration-300 ${formData.time === time
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-8">
                ข้อมูลการติดต่อ
              </h3>

              <div>
                <label className="flex items-center gap-2 text-base text-gray-700 font-light mb-3">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="กรอกชื่อของคุณ"
                  className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-base text-gray-700 font-light mb-3">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0xx-xxx-xxxx"
                  className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-base text-gray-700 font-light mb-3">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                  อีเมล (ไม่บังคับ)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-base text-gray-700 font-light mb-3 block">
                  หมายเหตุเพิ่มเติม (ไม่บังคับ)
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={4}
                  placeholder="ระบุรายละเอียดเพิ่มเติม..."
                  className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-light hover:border-gray-300 transition-all duration-300"
              >
                ย้อนกลับ
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex-1 px-8 py-4 rounded-full bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? "ยืนยันการจอง" : "ถัดไป"}
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 font-light mb-2">
            หรือติดต่อโดยตรงที่
          </p>
          <a href="tel:0902136159" className="text-lg text-gray-900 font-light hover:text-gray-600 transition-colors">
            090 213 6159
          </a>
        </div>
      </div>
        </>
      }  
    </div>
  );
}