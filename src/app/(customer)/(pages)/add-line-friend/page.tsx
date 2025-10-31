"use client";
import { useEffect } from "react";

export default function AddLineFriendPage() {
  useEffect(() => {
    // 1️⃣ เปิด LINE App เพื่อเพิ่มเพื่อน
    window.location.href = "line://ti/p/@888nlyqy"; // แทนด้วย @OA ของคุณ

    // 2️⃣ fallback ถ้าไม่สามารถเปิดแอปได้ (desktop)
    const timer = setTimeout(() => {
      window.location.href = "https://lin.ee/PH5ACNn";
    }, 2000);

    // 3️⃣ กลับหน้าเว็บหลักหลัง 5 วิ
    const back = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(back);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-xl font-light text-gray-800 mb-3">กำลังเปิด LINE เพื่อเพิ่มเพื่อน...</h2>
      <p className="text-gray-500 text-sm">
        หากไม่ถูกเปิดอัตโนมัติ <a href="https://lin.ee/PH5ACNn" className="text-blue-500 underline">กดที่นี่เพื่อเพิ่มเพื่อน</a>
      </p>
    </div>
  );
}
