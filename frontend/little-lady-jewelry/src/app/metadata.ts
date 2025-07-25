import { Metadata } from "next";

const metadata: Metadata = {
  title: "Little Lady Jewelry",
  description: "Ювелірні вироби зі срібла",
  keywords: "прикраси, ювелірні, аксесуари, дитячі прикраси, срібло",
  icons: [
    {
      rel: "icon",
      url: "/favicon_io/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon_io/apple-touch-icon.png",
    },
    {
      rel: "android-chrome-icon",
      sizes: "192x192",
      url: "/favicon_io/android-chrome-192x192.png",
    },
    {
      rel: "android-chrome-icon",
      sizes: "512x512",
      url: "/favicon_io/android-chrome-512x512.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon_io/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon_io/favicon-16x16.png",
    },
  ],
  manifest: "/favicon_io/site.webmanifest",
};

export default metadata;
