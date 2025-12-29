import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e94d8b",
      },
    },
  },
  plugins: [],
} satisfies Config;
