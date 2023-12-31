
/** @type {import('tailwindcss').Config} */
export default({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.ts",
    './pages/**/*.tsx',
    './components/**/*.tsx',
    "./node_modules/tw-elements/dist/js/**/*.js"

  ],
  theme: {
    extend: {},
  },
  plugins: [

  ],
})



