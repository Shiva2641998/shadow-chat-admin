/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryBgColor: "#ffffff",
        secondaryBgColor: "#111111",
        activePrimaryBgColor: "#5D60EF",
        activeSecondaryBgColor: "#334155",
        localColor: "#e2e8f0"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
