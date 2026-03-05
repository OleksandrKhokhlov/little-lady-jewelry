/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval';
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: blob: https://res.cloudinary.com;
            frame-src https://www.youtube.com https://www.youtube-nocookie.com;
            connect-src 'self' http://localhost:3000 https://little-lady-jewelry.onrender.com;
            font-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            `.replace(/\n/g, ""),
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
