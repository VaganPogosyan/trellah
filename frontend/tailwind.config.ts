import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#4C9AFF",
          DEFAULT: "#0C66E4",
          dark: "#0747A6",
        },
        accent: {
          light: "#7EE2B8",
          DEFAULT: "#4BCE97",
          dark: "#2E854B",
        },
        neutral: {
          light: "#F4F5F7",
          DEFAULT: "#97A0AF",
          dark: "#44546F",
        },
        surface: {
          light: "#ECF3FF",
          DEFAULT: "#FFFFFF",
          overlay: "rgba(7, 71, 166, 0.78)",
        },
        feedback: {
          success: "#22A06B",
          error: "#E34935",
        },
        warning: {
          light: "#FFE8B0",
          DEFAULT: "#FAA53D",
          dark: "#B65C02",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
