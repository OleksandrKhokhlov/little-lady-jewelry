import React from "react";
import "@/styles/globals.css";
import { CabinSketch, CalistoMT, CormorantSC, Kallithea } from "@/styles/fonts/fonts";
import { Header } from "./components/shared/header";
import { ProductProvider } from "@/lib/productContext";

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
        <title>Little Lady Jewelry</title>
        <meta name="description" content="Ювелірні вироби зі срібла" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-cormorant">
        <ProductProvider>
          <Header />
          <main>{children}</main>
        </ProductProvider>
      </body>
    </html>
  );
}
