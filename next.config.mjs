/**
 * @type {import("next").NextConfig} nextConfig
 */
const nextConfig = {
  /* config options here */
  env: {
    ENDPOINT: "https://api.pintu.co.id/v2",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
