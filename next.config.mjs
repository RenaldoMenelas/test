/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables strict mode for React
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
