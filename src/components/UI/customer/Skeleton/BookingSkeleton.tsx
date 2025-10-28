"use client";

export default function BookingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white animate-pulse">
      {/* ย้อนกลับ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 sm:py-6 mt-20">
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div></div>
        </div>
      </div>

      {/* หัวข้อ Booking */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-5">
        <div className="text-center mb-12 sm:mb-16">
          <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-40 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-12 sm:mb-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-16 bg-gray-100 rounded mt-2"></div>
            </div>
            {i < 3 && <div className="w-16 sm:w-24 h-0.5 bg-gray-200 mx-4"></div>}
          </div>
        ))}
      </div>

      {/* เนื้อหากลาง 3 ส่วนเหมือนจริง */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-10 shadow-sm space-y-10">
          {/* STEP 1 : เลือกบริการ */}
          <div>
            <div className="h-6 bg-gray-200 w-56 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="h-36 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-300 rounded mt-3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2 : เลือกวันเวลา */}
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 w-48 rounded mb-4"></div>
            <div className="h-10 bg-gray-100 w-full rounded mb-6"></div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* STEP 3 : ข้อมูลการติดต่อ */}
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 w-48 rounded mb-4"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>

          {/* ปุ่มถัดไป / ยืนยัน */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
            <div className="flex-1 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-12 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 space-y-2 text-center">
        <div className="h-3 bg-gray-200 w-40 mx-auto rounded"></div>
        <div className="h-3 bg-gray-200 w-32 mx-auto rounded"></div>
      </div>
    </div>
  );
}
