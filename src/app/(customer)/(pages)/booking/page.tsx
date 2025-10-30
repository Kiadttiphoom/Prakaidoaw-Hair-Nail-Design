"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, ChevronRight, Check, X, ShieldAlert } from "lucide-react";
import BookingSkeleton from "@/components/UI/customer/Skeleton/BookingSkeleton";
import CustomDatePicker from "@/components/UI/customer/DatePicker/CustomDatePicker";
import { useSystem } from "@/context/SystemContext";

export default function BookingPage() {
  const { system } = useSystem();
  const [loading, setLoading] = useState(true);
  const [spin, setSpin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [popupAuth, setPopupAuth] = useState(false);
  const [popupMessenger, setPopupMessenger] = useState(false);
  const [popupMessenger_confirm, setPopupMessenger_confirm] = useState(false);
  const [popupMessenger_color, setPopupMessenger_color] = useState("");
  const [popupMessenger_text, setPopupMessenger_text] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [stylists, setstylists] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stylist: "",
    service: "",
    date: "",
    time: "",
    prefix: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    note: ""
  });

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      fetch("/api/stylists").then((res) => res.json()),
      fetch("/api/auth", { method: "POST", credentials: "include" })
        .then(async (res) => {
          const data = await res.json();
          return { status: res.status, data };
        }),
    ])
      .then(([stylistsResult, authResult]) => {

        // ✅ stylists
        if (stylistsResult.status === "fulfilled") {
          // เซ็ตข้อมูล stylists ก่อน
          setstylists(stylistsResult.value.data.stylists);
        }

        // ✅ auth
        if (authResult.status === "fulfilled") {
          const { status, data } = authResult.value;

          if (status === 200 && data.message === "Success") {
            setLoading(false);
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

  useEffect(() => {
    if (popupAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [popupAuth]);


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


  const handleSubmit = async () => {
    setDisabled(true);

    try {
      if (step === 1) {
        // ✅ ตรวจสอบบริการของช่าง
        const res = await fetch(`/api/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: step, payload: formData.stylist }),
          credentials: "include"
        });
        const data = await res.json();
        if (data.message === "success") {
          setServices(data.data.services);
          setStep(2);
        } else {
          setStep(1);
          alert("ช่างคนนี้ยังไม่พร้อมให้บริการ กรุณาเลือกใหม่");
        }
      }
      else if (step === 2) {
        const res = await fetch(`/api/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: step, payload: { stylist: formData.stylist, service: formData.service } }),
          credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        if (data.message === "success") {
          setStep(3);
        } else {
          setStep(2);
          alert("ช่างคนนี้ยังไม่พร้อมให้บริการ กรุณาเลือกใหม่");
        }
      } else if (step === 3) {
        setStep(4);
      } else if (step === 4) {
        if (formData.prefix === "") {
          setPopupMessenger(true);
          setPopupMessenger_color("warning");
          setPopupMessenger_text("กรุณากรอกคำนำหน้า");
          return;
        }else if (formData.firstName === "") {
          setPopupMessenger(true);
          setPopupMessenger_color("warning");
          setPopupMessenger_text("กรุณากรอกชื่อ");
          return;
        } else if (formData.lastName === "") {
          setPopupMessenger(true);
          setPopupMessenger_color("warning");
          setPopupMessenger_text("กรุณากรอกนามสกุล");
          return;
        } else if (formData.phone.trim() === "") {
          setPopupMessenger(true);
          setPopupMessenger_color("warning");
          setPopupMessenger_text("กรุณากรอกเบอร์โทรศัพท์");
          return;
        } else if (formData.phone.trim() !== "") {
          const isValidPhone = /^((\+66)|0)[0-9]{9}$/.test(formData.phone.trim());

          if (!isValidPhone) {
            setPopupMessenger(true);
            setPopupMessenger_color("warning");
            setPopupMessenger_text("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)");
            return;
          }
        }else if (formData.email !== "") {
          const isValidEmail = String(formData.email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

          if (!isValidEmail) {
            setPopupMessenger(true);
            setPopupMessenger_color("warning");
            setPopupMessenger_text("กรุณากรอกอีเมลให้ถูกต้อง");
            return;
          }
        }

        setPopupMessenger_confirm(true);
        
      }
    } catch {

    } finally {

      setDisabled(false)
    }
  };

  const handleConfirm = async (confirm : boolean) => {
    if(confirm){
        const res = await fetch(`/api/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ step: step, payload: formData }),
        });
        const result = await res.json();

        if (result.message === "success") {
          setPopupMessenger_confirm(false);
          setPopupMessenger(true);
          setPopupMessenger_color("success");
          setPopupMessenger_text("จองคิวสำเร็จ!");
          setFormData((prev) => ({
            ...prev,
            stylist: "",
            service: "",
            date: "",
            time: "",
            name: "",
            phone: "",
            email: "",
            note: ""
          }));
          setSpin(true);
          setTimeout(function () {
            window.location.href = "/booking";
          }, 2000);

        } else {
          setPopupMessenger_confirm(false);
          setPopupMessenger(true);
          setPopupMessenger_color("error");
          setPopupMessenger_text("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
        }
    }
  }

  useEffect(() => {
    // ถ้ายังไม่เลือกวันหรือยังไม่มีช่าง/บริการ ไม่ต้อง fetch
    if (!formData.date || !formData.stylist || !formData.service) return;
    fetchAvailableTimes();
  }, [formData.date]); // ✅ เมื่อวันที่เปลี่ยน จะดึงเวลาว่างใหม่

  const fetchAvailableTimes = async () => {
    setSpin(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 3,
          payload: {
            stylist_id: formData.stylist,
            service_id: formData.service,
            date: formData.date,
          },
        }),
      });
      const data = await res.json();
      if (data.message === "success") {
        setSpin(false);
        setTimeSlots(data.data.timeSlots || []);
        setBookedTimes(data.data.bookedTimes || []);
      }
    } catch (err) {
      setSpin(false);
      console.error("Error fetching times:", err);
    }
  };

  const handleStep = (nextStep: number) => {
    // ถ้ากำลังจะเปลี่ยนจาก step ที่เกี่ยวกับวันเวลา (3) → step อื่น
    if (step === 3 || nextStep === 3) {
      setFormData((prev) => ({
        ...prev,
        date: "",
        time: "", // ✅ เผื่อไว้ให้ล้างเวลาที่เลือกด้วย
      }));
      setTimeSlots([]); // ✅ ล้างเวลาว่างทั้งหมด
    }

    // อัปเดตขั้นตอน
    setStep(nextStep - 1);
  };


  const canProceed = () => {
    if (step === 1) return formData.stylist;
    if (step === 2) return formData.service;
    if (step === 3) return formData.date && formData.time;
    if (step === 4) return formData.prefix && formData.firstName && formData.lastName && formData.phone;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">

      {/* Header */}
      {popupAuth && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-md flex items-center justify-center z-[999] overflow-hidden">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl px-8 py-10 w-[90%] max-w-md text-center animate-fade-in-up relative border border-gray-200/50">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full opacity-10 blur-2xl"></div>

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-gray-900 text-2xl font-bold mb-3 tracking-tight">
              กรุณาเข้าสู่ระบบ
            </h3>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed px-2">
              เพื่อเข้าสู่ระบบการ{" "}
              <span className="font-semibold text-gray-800">จองคิวบริการ</span> ของร้าน
              <br />
              <span className="font-bold text-gray-900 text-base">
                Prakaidoaw Hair&Nail Design
              </span>
              <br />
              <span className="text-xs text-gray-500 mt-2 block">
                เข้าสู่ระบบด้วยบัญชี LINE ของคุณได้เลยค่ะ
              </span>
            </p>

            <div className="space-y-3">
              <button
                onClick={handleLineLogin}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                เข้าสู่ระบบด้วย LINE
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {popupMessenger && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-md flex items-center justify-center z-[999] overflow-hidden">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl px-8 py-10 w-[90%] max-w-md text-center animate-fade-in-up relative border border-gray-200/50">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full opacity-10 blur-2xl"></div>

            {/* Icon */}
            <div
              className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-lg ${popupMessenger_color === "error"
                ? "bg-gradient-to-br from-red-900 to-red-800"
                : popupMessenger_color === "success"
                  ? "bg-gradient-to-br from-green-900 to-green-800"
                  : "bg-gradient-to-br from-yellow-900 to-yellow-800"
                }`}
            >
              {popupMessenger_color === "error" ?
                (
                  <X className="w-8 h-8 text-white" />
                ) : popupMessenger_color === "success" ? (
                  <Check className="w-8 h-8 text-white" />
                ) : (
                  <ShieldAlert className="w-8 h-8 text-white" />
                )
              }

            </div>

            <h3 className="text-gray-900 text-2xl font-bold mb-3 tracking-tight">

              {popupMessenger_color === "error" ?
                (
                  "เกิดข้อผิดพลาด"
                ) : popupMessenger_color === "success" ? (
                  "สำเร็จ"
                ) : (
                  "คำเตือน"
                )
              }
            </h3>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed px-2">
              {popupMessenger_text}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => { setPopupMessenger(false), setPopupMessenger_color(""), setPopupMessenger_text("") }}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}

      {popupMessenger_confirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-md flex items-center justify-center z-[999] overflow-hidden">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl px-8 py-10 w-[90%] max-w-lg text-center animate-fade-in-up relative border border-gray-200/50 max-h-[90vh] overflow-y-auto">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full opacity-10 blur-2xl"></div>

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-gray-900 text-2xl font-bold mb-3 tracking-tight">
              ยืนยันการจองบริการ
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              กรุณาตรวจสอบข้อมูลก่อนยืนยัน
            </p>

            {/* ข้อมูลที่เลือก */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-4">
              {/* ช่าง */}
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">ช่าง</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {stylists.find(s => s.id === formData.stylist)?.name || "-"}
                  </p>
                </div>
              </div>

              {/* บริการ */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">บริการ</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {services.find(s => s.id === formData.service)?.title || "-"}
                  </p>
                </div>
              </div>

              {/* วันที่และเวลา */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">วันที่และเวลา</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('th-TH', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      timeZone: 'Asia/Bangkok'
                    }) : "-"} เวลา {formData.time || "-"} น.
                  </p>
                </div>
              </div>

              {/* ชื่อ-นามสกุล */}
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">ชื่อ-นามสกุล</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {formData.prefix} {formData.firstName} {formData.lastName}
                  </p>
                </div>
              </div>

              {/* เบอร์โทร */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">เบอร์โทรศัพท์</p>
                  <p className="text-sm text-gray-900 font-medium">{formData.phone}</p>
                </div>
              </div>

              {/* อีเมล (ถ้ามี) */}
              {formData.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">อีเมล</p>
                    <p className="text-sm text-gray-900 font-medium">{formData.email}</p>
                  </div>
                </div>
              )}

              {/* หมายเหตุ (ถ้ามี) */}
              {formData.note && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">หมายเหตุ</p>
                    <p className="text-sm text-gray-900 font-light">{formData.note}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleConfirm(true)}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                ยืนยันการจอง
              </button>
              <button
                onClick={() => setPopupMessenger_confirm(false)}
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                แก้ไขข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <BookingSkeleton />
      ) :
        <>
          {spin && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="w-12 h-12 border-4 border-white/60 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
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
            <div className="flex items-center justify-center mb-12 sm:mb-16 w-full px-4">
              <div className="flex items-center">
                {[
                  { num: 1, label: "เลือกช่าง" },
                  { num: 2, label: "เลือกบริการ" },
                  { num: 3, label: "เลือกวันเวลา" },
                  { num: 4, label: "ข้อมูลติดต่อ" }
                ].map((item, index, arr) => (
                  <div key={item.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= item.num
                          ? "bg-gray-900 border-gray-900 text-white"
                          : "bg-white border-gray-200 text-gray-400"
                          }`}
                      >
                        {step > item.num ? (
                          <Check className="w-5 h-5" strokeWidth={2} />
                        ) : (
                          <span className="text-sm sm:text-base font-light">{item.num}</span>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 mt-2 font-light whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>

                    {/* เส้นเชื่อม - ย้ายมาอยู่ข้างวงกลม */}
                    {index < arr.length - 1 && (
                      <div
                        className={`w-10 sm:w-20 md:w-24 h-0.5 mx-2 sm:mx-3 transition-all duration-300 ${step > item.num ? "bg-gray-900" : "bg-gray-200"
                          }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-10 shadow-sm">
              {/* Step 1: Select stylists */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-8">
                    เลือกช่างที่ต้องการ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {stylists.map((stylist) => (
                      <button
                        key={stylist.id}
                        onClick={() => setFormData({ ...formData, stylist: stylist.id })}
                        className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg ${formData.stylist === stylist.id
                          ? "border-gray-900 bg-gray-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        {/* รูปภาพ */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <img
                            src={stylist.image_url}
                            alt={stylist.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* ชื่อช่างบนรูป */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                            <h4 className="text-xl sm:text-2xl text-white font-light tracking-wide">
                              ช่าง {stylist.name}
                            </h4>
                          </div>

                          {/* เครื่องหมายถูก */}
                          {formData.stylist === stylist.id && (
                            <div className="absolute top-3 right-3 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center shadow-lg z-10">
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        {/* รายละเอียด */}
                        <div className="p-4 sm:p-5">
                          <h5 className="text-sm sm:text-base text-gray-900 font-normal mb-2">
                            {stylist.title}
                          </h5>
                          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed line-clamp-2">
                            {stylist.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Service */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-8">
                    เลือกบริการที่ต้องการ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setFormData({ ...formData, service: service.id })}
                        className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg ${formData.service === service.id
                          ? "border-gray-900 bg-gray-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        {/* รูปภาพ */}
                        <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                          <img
                            src={service.image_url}
                            alt={service.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* ชื่อบริการบนรูป */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                            <h4 className="text-xl sm:text-2xl text-white font-light tracking-wide">
                              {service.title}
                            </h4>
                          </div>

                          {/* เครื่องหมายถูก */}
                          {formData.service === service.id && (
                            <div className="absolute top-3 right-3 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center shadow-lg z-10">
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        {/* รายละเอียด */}
                        <div className="p-4 sm:p-5">
                          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mb-3 line-clamp-2 h-10">
                            {service.description}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm text-gray-500 font-light">เริ่มต้น</span>
                            <span className="text-lg sm:text-xl text-gray-900 font-normal">
                              {service.price_min}
                            </span>
                            <span className="text-sm text-gray-500 font-light">บาท</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Select Date & Time */}
              {step === 3 && (
                <div className="space-y-8 sm:space-y-10">
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-light">
                    เลือกวันและเวลา
                  </h3>

                  {/* Date Picker */}
                  <div>
                    <label className="flex items-center gap-2 text-base sm:text-lg text-gray-700 font-light mb-4">
                      <Calendar className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                      เลือกวันที่
                    </label>
                    <CustomDatePicker
                      value={formData.date}
                      onChange={(date) => setFormData({ ...formData, date })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="flex items-center gap-2 text-base sm:text-lg text-gray-700 font-light mb-4">
                      <Clock className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                      เลือกเวลา
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                      {timeSlots.map((time) => {
                        const isToday = formData.date === new Date().toISOString().split('T')[0];

                        // ✅ เวลาในอดีต
                        let isTimeDisabled = false;
                        if (isToday) {
                          const now = new Date();
                          const currentHour = now.getHours();
                          const currentMinute = now.getMinutes();
                          const normalized = time.includes(':') ? time : time.replace('.', ':');
                          const [timeHour, timeMinute] = normalized.split(':').map(Number);

                          if (timeHour < currentHour || (timeHour === currentHour && timeMinute <= currentMinute)) {
                            isTimeDisabled = true;
                          }
                        }

                        // ✅ เวลาใน bookedTimes
                        const isBooked = bookedTimes.includes(time);

                        return (
                          <button
                            key={time}
                            onClick={() => !isTimeDisabled && !isBooked && setFormData({ ...formData, time })}
                            disabled={isTimeDisabled || isBooked}
                            className={`py-3 sm:py-4 px-4 rounded-xl border-2 text-sm sm:text-base font-medium transition-all duration-300
                              ${isBooked
                                ? "border-red-300 bg-red-50 text-red-400 cursor-not-allowed opacity-60" // 🔴 จองแล้ว - โทนแดงอ่อน
                                : isTimeDisabled
                                  ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed opacity-50" // ⚪ เลยเวลาแล้ว - โทนเทาอ่อน
                                  : formData.time === time
                                    ? "border-gray-900 bg-gray-900 text-white shadow-lg" // ⚫ เลือกอยู่ - ดำ
                                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-md hover:bg-gray-50" // ⚪ ว่าง - ขาวขอบเทา
                              }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-8">
                    ข้อมูลการติดต่อ
                  </h3>

                  <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4">
                    {/* คำนำหน้า */}
                    <div className="lg:col-span-3">
                      <label className="flex items-center gap-2 text-base text-gray-700 font-light mb-3">
                        <User className="w-5 h-5" strokeWidth={1.5} />
                        คำนำหน้า
                      </label>
                      <select
                        value={formData.prefix || ''}
                        onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors bg-white appearance-none"
                        style={{
                          backgroundImage: 'none'
                        }}
                      >
                        <option value="">เลือกคำนำหน้า</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                        <option value="เด็กชาย">เด็กชาย</option>
                        <option value="เด็กหญิง">เด็กหญิง</option>
                      </select>
                    </div>

                    {/* ชื่อ */}
                    <div className="lg:col-span-4">
                      <label className="flex items-center gap-2 text-base text-gray-700 font-light mb-3">
                        <User className="w-5 h-5" strokeWidth={1.5} />
                        ชื่อ
                      </label>
                      <input
                        type="text"
                        value={formData.firstName || ''}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="กรอกชื่อของคุณ"
                        className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* นามสกุล */}
                    <div className="lg:col-span-5">
                      <label className="flex items-center gap-2 text-base text-gray-700 font-light mb-3">
                        <User className="w-5 h-5" strokeWidth={1.5} />
                        นามสกุล
                      </label>
                      <input
                        type="text"
                        value={formData.lastName || ''}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="กรอกนามสกุลของคุณ"
                        className="w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                      />
                    </div>
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
                    onClick={() => handleStep(step)}
                    disabled={disabled}
                    className="text-xs sm:text-base flex-1 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-light hover:border-gray-300 transition-all duration-300"
                  >
                    ย้อนกลับ
                  </button>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="text-xs sm:text-base flex-1 px-8 py-4 rounded-full bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {disabled ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
                            c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      กำลัง...
                    </span>
                  ) : (
                    <>
                      {step === 4 ? "ยืนยันการจอง" : "ถัดไป"}
                      <ChevronRight className="w-5 h-5" strokeWidth={2} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center mt-12">
              <p className="text-sm text-gray-500 font-light mb-2">
                หรือติดต่อโดยตรงที่
              </p>
              <a href={`tel:${system?.phone?.replace(/\s+/g, "")}`} className="text-lg text-gray-900 font-light hover:text-gray-600 transition-colors">
                {system?.phone}
              </a>
            </div>
          </div>
        </>
      }
    </div>
  );
}