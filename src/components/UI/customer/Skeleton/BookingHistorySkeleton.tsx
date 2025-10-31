"use client";

export default function BookingHistorySkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Back Button */}
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

        {/* Booking Cards */}
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-10 shadow-sm"
            >
              {/* Header with Status */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200/60">
                <div>
                  <div className="h-3 w-24 bg-gray-100 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-28 bg-gray-100 rounded-full animate-pulse"></div>
              </div>

              {/* Service Title */}
              <div className="mb-8">
                <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-100 rounded animate-pulse"></div>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
                  <div className="flex-1">
                    <div className="h-3 w-16 bg-gray-100 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-gray-100 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
                  <div className="flex-1">
                    <div className="h-3 w-12 bg-gray-100 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
                  <div className="flex-1">
                    <div className="h-3 w-16 bg-gray-100 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Note Section */}
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200/60">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
                  <div className="flex-1">
                    <div className="h-3 w-16 bg-gray-100 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Footer - Price & Payment Status */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200/60">
                <div className="flex items-baseline gap-2">
                  <div className="h-4 w-12 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-5 w-20 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 space-y-2">
          <div className="h-4 w-56 bg-gray-100 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-32 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}