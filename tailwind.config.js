module.exports = {
       content: [
         "./pages/**/*.{js,ts,jsx,tsx}",
         "./components/**/*.{js,ts,jsx,tsx}",
         "./node_modules/flowbite/**/*.js",
       ],
       theme: {
         extend: {
           keyframes: {
             dropdown: {
               '0%': {height: '0'},
               '100%': {height: '7rem'}
             }
           },
           animation: {
             dropdown: 'dropdown 0.5s ease-in',
           }
         },
       },
       plugins: [],
     }