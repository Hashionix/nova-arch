import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  container: {
    center: true,
    padding: {
      DEFAULT: "1.5rem",
      sm: "1.5rem",
      lg: "2rem",
      xl: "2.5rem",
      "2xl": "3rem",
    },
    screens: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "74rem",
      "2xl": "84rem",
    },
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      fontSize: {
        "display-sm": [
          "2.125rem",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "2.75rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.03", letterSpacing: "-0.03em" },
        ],
      },
      maxWidth: {
        prose: "68ch",
        editorial: "88rem",
      },
      aspectRatio: {
        editorial: "4 / 3",
        cinema: "16 / 9",
        portrait: "3 / 4",
      },
      boxShadow: {
        editorial: "0 25px 80px rgba(15, 10, 8, 0.12)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        studio: {
          primary: "#0f3b5f",
          secondary: "#d98f5f",
          accent: "#3a6e62",
          neutral: "#1f1a18",
          "base-100": "#f6f1e9",
          "base-200": "#efe7da",
          "base-300": "#e1d7c8",
          "base-content": "#1f1a18",
          info: "#3b82f6",
          success: "#1f8a70",
          warning: "#c0841f",
          error: "#be123c",
        },
      },
    ],
  },
  plugins: [typography, daisyui],
};
