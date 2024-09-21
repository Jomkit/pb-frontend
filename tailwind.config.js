const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', 
  purge: ['./src/**/*.{js,jsx,ts,tsx}', '/public/index.html'],
  content: [
    "./index.html",
    ".src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin()
  ],
}

