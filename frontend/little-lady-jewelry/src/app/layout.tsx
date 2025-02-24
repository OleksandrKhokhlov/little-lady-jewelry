import React from "react";
import {
  CormorantSC,
  CabinSketch,
  CalistoMT,
  Kallithea,
} from "@/styles/fonts/fonts";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${CormorantSC.variable} ${CabinSketch.variable} ${CalistoMT.variable} ${Kallithea.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
