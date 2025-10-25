"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function GalleryLightbox({ selectedImage, onClose }: any) {
  // ✅ ล็อก scroll ของ body เมื่อเปิด Lightbox
  useEffect(() => {
    if (selectedImage) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        const y = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(y || "0") * -1);
      };
    }
  }, [selectedImage]);

  // ✅ ปิดเมื่อกด Escape
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!selectedImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        {...({
          className:
            "fixed inset-0 flex items-center justify-center z-[999] bg-black/80 backdrop-blur-sm overscroll-none touch-none select-none",
          style: {
            WebkitBackdropFilter: "blur(8px)",
            transform: "translateZ(0)", // ✅ ป้องกันภาพลอยใน iOS Chrome
            willChange: "transform",
          },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: onClose,
        } as any)}
      >
        <motion.div
          {...({
            className:
              "relative flex items-center justify-center max-w-5xl w-full h-full px-4",
            initial: { opacity: 0, y: -2 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -2 },
            transition: {
              opacity: { duration: 0.25, ease: "easeOut" },
              y: { duration: 0.3, ease: "easeOut" },
            },
            onClick: (e: any) => e.stopPropagation(),
          } as any)}
        >
          {/* container ของภาพ */}
          <div className="relative inline-block">
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="max-h-[75vh] sm:max-h-[85vh] max-w-[90vw] w-auto h-auto rounded-xl shadow-xl object-contain select-none"
              style={{
                transform: "translateZ(0)", // ✅ บังคับ GPU render
              }}
            />

            {/* ปุ่มปิด */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 bg-white/95 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110 hover:shadow-gray-900/20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
