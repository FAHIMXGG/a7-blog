import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  images: {
    remotePatterns: [
      // UploadThing CDN hosts
      { protocol: "https", hostname: "**.ufs.sh", pathname: "/**" },
      { protocol: "https", hostname: "utfs.io", pathname: "/**" },
      // Add this line for Flaticon icons
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com", pathname: "/**" },
      // You can also allow all external image domains like this:
      // { protocol: "https", hostname: "**", pathname: "/**" }, // ⚠️ Not recommended for production
    ],
  },
};

export default nextConfig;
