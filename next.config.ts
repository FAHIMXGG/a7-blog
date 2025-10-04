import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  images: {
    remotePatterns: [
      // UploadThing CDN hosts
      { protocol: "https", hostname: "**.ufs.sh", pathname: "/**" },
      { protocol: "https", hostname: "utfs.io", pathname: "/**" },
    ],}
};

export default nextConfig;
