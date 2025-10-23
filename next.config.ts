import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:false,
  compiler : {
    reactRemoveProperties:true,
  }
};

export default nextConfig;
