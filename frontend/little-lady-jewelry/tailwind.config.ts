import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/styles/globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', ...fontFamily.serif],
        cabinsketch: ['var(--font-cabinsketch)', ...fontFamily.sans],
        calisto: ['var(--font-calistoMT)', ...fontFamily.serif],
        kallithea: ['var(--font-kallithea)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
