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
      },
    },
  },
  plugins: [],
}