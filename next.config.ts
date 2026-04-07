import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Just transpile GSAP packages
  transpilePackages: ['gsap', '@gsap/react'],
};

export default nextConfig;