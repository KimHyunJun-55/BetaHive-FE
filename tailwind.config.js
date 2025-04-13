/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 꼭 이거!
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4361ee",
          light: "#e6f0ff",
          dark: "#3a56d4",
        },
        secondary: "#3a0ca3",
        accent: "#f72585",
        dark: {
          bg: "#121212",
          card: "#1e1e1e",
          border: "#2e2e2e",
          text: "#e0e0e0",
          "text-light": "#a0a0a0",
        },
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0, 0, 0, 0.12)",
        md: "0 4px 12px rgba(0, 0, 0, 0.1)",
        lg: "0 15px 30px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "18px",
        xl: "24px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
