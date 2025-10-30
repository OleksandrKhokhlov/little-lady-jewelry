import React from "react";
import metadata from "./metadata";
import { Toaster } from "react-hot-toast";
import {
  CabinSketch,
  CalistoMT,
  CormorantSC,
  Kallithea,
} from "@/styles/fonts/fonts";
import { Header } from "../components/header";
import { ProductProvider } from "@/lib";
import "@/styles/embla.css";
import "@/styles/globals.css";
export { metadata };

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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-cormorant">
        <ProductProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </ProductProvider>
      </body>
    </html>
  );
}
