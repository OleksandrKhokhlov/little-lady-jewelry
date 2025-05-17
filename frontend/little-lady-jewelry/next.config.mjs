/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com", // Разрешает все поддомены Cloudinary
      },
    ],
  },
};

export default nextConfig;
