import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  compiler: {
    reactRemoveProperties: true,
  },

  // ใช้เฉพาะ ES2020+ (ไม่ transpile ไป ES5 → ตัด polyfill 10 KB+)
  // Tree-shake ไอคอน lucide-react เพื่อลด JS bundle
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/{{member}}",
    },
  },

  experimental: {
    optimizeCss: true, // เปิด SWC optimizer ตัวใหม่ของ Next 15
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
