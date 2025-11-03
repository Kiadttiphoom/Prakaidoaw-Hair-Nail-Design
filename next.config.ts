import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  compiler: {
    reactRemoveProperties: true,
  },

  // ✅ ตัด polyfill / ทำ tree-shake ไอคอน
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/{{member}}",
    },
  },

  // ⚙️ ปิด optimizeCss เพื่อให้ build บน Vercel ผ่าน
  // (Lightning CSS ยังไม่พร้อมในบางสภาพแวดล้อม)
  // หากรันบนเครื่องเองอยากเปิดเพิ่ม performance ได้เล็กน้อย
  // ก็เปิดกลับได้โดยเพิ่มบรรทัด optimizeCss: true
  experimental: {
    optimizePackageImports: ["lucide-react"], // ใช้แทน optimizeCss เพื่อ reduce JS bundle
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [200, 300, 400, 500, 600, 800],
  },
};

export default nextConfig;
