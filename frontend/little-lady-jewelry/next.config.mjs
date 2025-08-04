
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://www.yutube.com',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-src https://www.youtube.com https://www.youtube-nocookie.com;",
          },
        ],
      },
    ];
  },
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