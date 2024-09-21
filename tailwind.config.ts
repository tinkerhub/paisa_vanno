import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        tv: "2200px",
      },
      fontSize: {
        "responsive-h1": "clamp(1.875rem, 2.5vw + 1rem, 9rem)", 
        "responsive-h2": "clamp(1rem, 1.5vw + 0.7rem, 9rem)",
        "responsive-num": "clamp(2rem, 2vw + 2rem, 9rem)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
