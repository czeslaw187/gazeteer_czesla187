module.exports = {
       content: [
         "./pages/**/*.{js,ts,jsx,tsx}",
         "./components/**/*.{js,ts,jsx,tsx}",
         "./node_modules/flowbite/**/*.js",
       ],
       theme: {
         extend: {
           keyframes: {
             slideOpen: {
               '0%': {left: '0'},
               '100%': {left: '5rem'}
             },
             slideClose: {
               '0%': {left: '5rem'},
               '100%': {left: '0'}
             },
             dropdown: {
               '0%': {height: '0'},
               '100%': {height: '7rem'}
             }
           },
           animation: {
             dropdown: 'dropdown 0.5s ease-in',
             slideOpen: 'slideOpen 0.7s ease-in',
             slideClose: 'slideClose 0.7s ease-in',
           }
         },
       },
       plugins: [],
     }