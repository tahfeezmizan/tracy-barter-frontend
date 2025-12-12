/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  ...(isDev
    ? {
        experimental: {
          allowDevelopmentBuild: true,
        },
      }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.7.11",
        port: "5002",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
