import localFont from "next/font/local";

export const CormorantSC = localFont({
  src: [
    {
      path: "../../../public/fonts/CormorantSC-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cormorant",
});

export const CabinSketch = localFont({
  src: [
    {
      path: "../../../public/fonts/CabinSketch-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinsketch",
});

export const CalistoMT = localFont({
  src: [
    {
      path: "../../../public/fonts/calistoMT.TTF",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-calistoMT",
});

export const Kallithea = localFont({
  src: [
    {
      path: "../../../public/fonts/kallithea.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kallithea",
});