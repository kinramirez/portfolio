/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/assets/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:          "#0a0a0f",
        surface:     "#12121a",
        card:        "#1a1a26",
        accent:      "#47d9ff",
        "accent-dim":"#47d9ff30",
        primary:     "#f0f0f8",
        muted:       "#8888aa",
      },
    },
  },
  plugins: [],
}