import React from "react";
import "@/styles/globals.css";
import {
  CormorantSC,
  CabinSketch,
  CalistoMT,
  Kallithea,
} from "@/styles/fonts/fonts";
import { Header } from "./components/shared/header";

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
      <body className="font-cormorant">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
