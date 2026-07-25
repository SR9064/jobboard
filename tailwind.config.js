/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14181F",
        paper: "#F7F5F0",
        signal: "#2C5C4B",
        signalLight: "#E4EEE9",
        rust: "#B8511F",
      },
      fontFamily: {
        display: ["'IBM Plex Serif'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
