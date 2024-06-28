/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables strict mode for React
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
