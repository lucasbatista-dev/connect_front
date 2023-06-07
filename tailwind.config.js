/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        brown: {
          200: "#F9F6F2",
          800: "#0B5F9E",
          900: "#084B8A"
        },
        gray: {
          100: "#E6E6E6",
          200: "#CCCCCC",
          800: "#333333",
          900: "#141414"
        },
        pink: {
          500: "#E91E63",
          800: "#AD1457"
        }
      }
    }
  },
  plugins: []
};
