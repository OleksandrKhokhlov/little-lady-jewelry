import { Metadata, Viewport } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://little-lady-jewelry.vercel.app/";

export const viewport: Viewport = {
  themeColor: "#f17fde",
  width: "device-width",
  initialScale: 1,
};

const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Little Lady Jewelry - Ювелірні прикраси та вишукані аксесуари",
    template: "%s | Little Lady Jewelry",
  },
  description:
    "Вишукані ювелірні вироби зі срібла, дитячі прикраси та аксесуари у магазині Little Lady Jewelry. Готові подарунки з швидкою доставкою по Україні.",
  keywords: [
    "прикраси",
    "ювелірні вироби",
    "аксесуари",
    "дитячі прикраси",
    "срібло",
    "срібні сережки",
    "Little Lady",
  ],

  authors: [
    {
      name: "Little Lady Jewelry",
    },
  ],
  creator: "Little Lady Jewelry",
  publisher: "Little Lady Jewelry",

  alternates: {
    canonical: "./",
  },

  openGraph: {
    title: "Little Lady Jewelry - Ювелірні прикраси зі срібла",
    description:
      "Вишукані ювелірні вироби зі срібла, дитячі прикраси та аксесуари. Знайдіть ідеальний подарунок!",
    url: BASE_URL,
    siteName: "Little Lady Jewelry",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Little Lady Jewelry",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Little Lady Jewelry - Ювелірні прикраси зі срібла",
    description:
      "Вишукані ювелірні вироби та аксесуари з доставкою по Україні.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      {
        type: "image/png",
        sizes: "16x16",
        url: "/favicon_io/favicon-16x16.png",
      },
      {
        type: "image/png",
        sizes: "32x32",
        url: "/favicon_io/favicon-32x32.png",
      },
      {
        type: "image/png",
        sizes: "192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        type: "image/png",
        sizes: "512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
  },

  manifest: "/favicon_io/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default metadata;
