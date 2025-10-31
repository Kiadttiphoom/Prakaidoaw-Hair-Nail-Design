"use client";
import { useState, useEffect } from "react";
import {
  Scissors,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Clock,
  User,
  Phone,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail
} from "lucide-react";
import { useSystem } from "@/context/SystemContext";
import BookingHistorySkeleton from "@/components/UI/customer/Skeleton/BookingHistorySkeleton";

type Props = {
  bookinghistory: any[];
};

export default function BookingHistoryClient({ bookinghistory }: Props) {

  const { system } = useSystem();

  // ✅ สองสถานะชัดเจน
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // จำลองโหลดข้อมูล (ถ้า bookinghistory มาช้า)
    const timer = setTimeout(() => {
      setData(bookinghistory);
      setLoading(false);
    }, 500); // ปล่อยให้ skeleton แสดงสักครู่
    return () => clearTimeout(timer);
  }, [bookinghistory]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "รอดำเนินการ",
          color: "text-yellow-700",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: AlertCircle
        };
      case "confirmed":
        return {
          label: "ยืนยันแล้ว",
          color: "text-green-700",
          bg: "bg-green-50",
          border: "border-green-200",
          icon: CheckCircle
        };
      case "completed":
        return {
          label: "เสร็จสิ้น",
          color: "text-blue-700",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: CheckCircle
        };
      case "cancelled":
        return {
          label: "ยกเลิก",
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
          icon: XCircle
        };
      default:
        return {
          label: "ไม่ทราบสถานะ",
          color: "text-gray-700",
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: AlertCircle
        };
    }
  };

  const getPaymentStatus = (status: string) => {
    if (status === "success") {
      return { label: "ชำระแล้ว", color: "text-green-600" };
    }
    return { label: "รอชำระ", color: "text-orange-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white mt-20">
      {loading ? (
        <BookingHistorySkeleton />
      ) : (
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
                  History
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light mb-4">
                ประวัติการจอง
              </h2>
              <p className="text-base sm:text-lg text-gray-500 font-light">
                ดูประวัติการใช้บริการทั้งหมดของคุณ
              </p>
            </div>

            {/* Content */}
            {!loading && data.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
  {bookinghistory.map((booking, index) => {
    const statusConfig = getStatusConfig(booking.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div
        key={index}
        className="bg-white rounded-xl lg:rounded-2xl border border-gray-200/60 p-3 lg:p-5 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-3 lg:mb-4 pb-3 lg:pb-4 border-b border-gray-200/60">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] lg:text-[10px] text-gray-400 tracking-wider uppercase mt-7 sm:mt-0">
              รหัสการจอง
            </p>
            <p className="text-xs lg:text-sm text-gray-900 font-light tracking-wide">
              {booking.booking_code}
            </p>
          </div>
          <div className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full border ${statusConfig.border} ${statusConfig.bg} ml-2 flex-shrink-0`}>
            <StatusIcon className={`w-2.5 lg:w-3 h-2.5 lg:h-3 ${statusConfig.color}`} strokeWidth={2} />
            <span className={`text-[10px] lg:text-xs font-medium ${statusConfig.color} whitespace-nowrap`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Service Title */}
        <div className="mb-3 lg:mb-4">
          <h3 className="text-sm lg:text-lg text-gray-900 font-light mb-1 line-clamp-1">
            {booking.service_title}
          </h3>
          <p className="text-xs lg:text-sm text-gray-600 font-light truncate">
            ช่าง {booking.stylist_name}
          </p>
        </div>

        {/* Details - Compact */}
        <div className="space-y-2 lg:space-y-3 mb-3 lg:mb-4">
          {/* ชื่อผู้จอง */}
          <div className="flex items-start gap-1.5 lg:gap-2">
            <User className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] lg:text-[10px] text-gray-400 mb-0.5">ชื่อผู้จอง</p>
              <p className="text-xs lg:text-sm text-gray-900 font-light truncate">
                {booking.customer_name}
              </p>
            </div>
          </div>

          {/* เบอร์โทรศัพท์ */}
          <div className="flex items-start gap-1.5 lg:gap-2">
            <Phone className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] lg:text-[10px] text-gray-400 mb-0.5">เบอร์โทรศัพท์</p>
              <p className="text-xs lg:text-sm text-gray-900 font-light truncate">
                {booking.customer_phone}
              </p>
            </div>
          </div>

          {/* วันที่และเวลา - รวมกัน */}
          <div className="flex items-start gap-1.5 lg:gap-2">
            <Calendar className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] lg:text-[10px] text-gray-400 mb-0.5">วันที่และเวลา</p>
              <p className="text-xs lg:text-sm text-gray-900 font-light">
                {booking.date}
              </p>
              <p className="text-[10px] lg:text-xs text-gray-600 font-light">
                เวลา {booking.time} น.
              </p>
            </div>
          </div>
        </div>

        {/* Note - Compact */}
        {booking.note && (
          <div className="mb-3 lg:mb-4 p-2 lg:p-3 rounded-lg lg:rounded-xl bg-gray-50 border border-gray-200/60">
            <div className="flex items-start gap-1.5 lg:gap-2">
              <FileText className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div className="min-w-0 flex-1">
                <p className="text-[9px] lg:text-[10px] text-gray-400 mb-0.5">หมายเหตุ</p>
                <p className="text-[10px] lg:text-xs text-gray-700 font-light leading-relaxed line-clamp-2">
                  {booking.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer - Price */}
        <div className="pt-3 lg:pt-4 border-t border-gray-200/60">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] lg:text-xs text-gray-500 font-light">ราคา เริ่มต้น</span>
            <span className="text-sm sm:text-base lg:text-xl text-gray-900 font-light">
              ฿{booking.price}
            </span>
            <span className="text-[10px] lg:text-xs text-gray-500 font-light">บาท</span>
          </div>
        </div>
      </div>
    );
  })}
</div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200/60 p-10 sm:p-16 shadow-sm text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-gray-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl text-gray-900 font-light mb-3">
                  ยังไม่มีประวัติการจอง
                </h3>
                <p className="text-base text-gray-500 font-light mb-8 max-w-md mx-auto leading-relaxed">
                  คุณยังไม่มีประวัติการจองบริการ เริ่มจองบริการของเราเพื่อดูแลความงามของคุณกันเถอะ
                </p>
                <a
                  href="/booking"
                  className="group bg-gray-900 text-white px-10 sm:px-16 py-4 sm:py-6 rounded-full text-sm tracking-[0.25em] hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-700 inline-flex items-center gap-4 font-light"
                >
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-700" strokeWidth={1.5} />
                  จองคิวตอนนี้
                  <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform duration-700" strokeWidth={1.5} />
                </a>
              </div>
            )}

            {/* Contact Info */}
            <div className="text-center mt-12">
              <p className="text-sm text-gray-500 font-light mb-2">
                หากมีข้อสงสัยเกี่ยวกับการจอง
              </p>
              <a href="tel:0123456789" className="text-lg text-gray-900 font-light hover:text-gray-600 transition-colors">
                {system?.phone}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}