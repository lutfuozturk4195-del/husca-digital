import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05050a",
          900: "#0b0b14",
          800: "#12121f",
          700: "#1b1b2c",
          600: "#26263c",
        },
        accent: {
          400: "#8b8ff9",
          500: "#6d6ff5",
          600: "#5457d9",
        },
        cyan: {
          400: "#5ee6d0",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(109,111,245,0.25) 0%, rgba(5,5,10,0) 70%)",
      },
      typography: () => ({
        invert: {
          css: {
            "--tw-prose-body": "#c7c7d9",
            "--tw-prose-headings": "#f5f5fa",
            "--tw-prose-links": "#8b8ff9",
            "--tw-prose-bold": "#f5f5fa",
            "--tw-prose-bullets": "#6d6ff5",
            "--tw-prose-quotes": "#e5e5f0",
            "--tw-prose-quote-borders": "#26263c",
            "--tw-prose-code": "#5ee6d0",
            "--tw-prose-th-borders": "#26263c",
            "--tw-prose-td-borders": "#1b1b2c",
            a: { textDecoration: "none", fontWeight: "600" },
            "a:hover": { textDecoration: "underline" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
