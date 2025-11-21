import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ncbkydnmbqaflalfhioj.supabase.co",
        pathname: "/storage/v1/object/public/modem-website-storage/**",
      },
    ],
  },
};

export default nextConfig;
