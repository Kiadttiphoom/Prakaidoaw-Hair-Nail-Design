import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:false,
  compiler : {
    reactRemoveProperties:true,
  },
  images: {
    domains: ["images.unsplash.com"],
    formats: ["image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280],
    imageSizes: [200, 300, 400, 500, 600],
  },
};

export default nextConfig;
