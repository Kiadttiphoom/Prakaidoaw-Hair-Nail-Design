"use client";

export default function BookingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 sm:py-6 mt-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-5">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-12 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 w-80 max-w-full bg-gray-100 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 sm:mb-16 w-full px-4">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((num, index, arr) => (
              <div key={num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-3 w-16 sm:w-20 bg-gray-100 rounded mt-2 animate-pulse"></div>
                </div>

                {/* เส้นเชื่อม */}
                {index < arr.length - 1 && (
                  <div className="w-10 sm:w-20 md:w-24 h-0.5 mx-2 sm:mx-3 bg-gray-200 animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-10 shadow-sm">
          {/* Title ของแต่ละ Step */}
          <div className="h-8 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>

          {/* Grid Cards (สำหรับ Step 1 & 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl border-2 border-gray-200 overflow-hidden animate-pulse"
              >
                {/* รูปภาพ */}
                <div className="relative h-48 sm:h-56 bg-gray-200"></div>

                {/* รายละเอียด */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-full bg-gray-100 rounded"></div>
                  <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Date & Time Selection (สำหรับ Step 3) */}
          <div className="space-y-8 sm:space-y-10">
            {/* Date Picker */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            </div>

            {/* Time Slots */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 sm:h-14 bg-gray-100 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form (สำหรับ Step 4) */}
          <div className="space-y-6 mt-8">
            {/* คำนำหน้า + ชื่อ + นามสกุล */}
            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
              </div>

              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
              </div>

              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
              </div>
            </div>

            {/* เบอร์โทรศัพท์ */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            </div>

            {/* อีเมล */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            </div>

            {/* หมายเหตุ */}
            <div>
              <div className="h-4 w-48 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-28 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
            <div className="flex-1 h-12 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 space-y-2">
          <div className="h-4 w-40 bg-gray-100 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-32 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}