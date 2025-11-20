/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'PPPangram':['Pangram','cursive'],
        'hind':['hindmadurai','san-serif'],
        'baloo':['baloo','cursive'],
      }, keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        marqueeFast: "marquee 15s linear infinite",
      },
      
      
    },
  },
  plugins: [],
}