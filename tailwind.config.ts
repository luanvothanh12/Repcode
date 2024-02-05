import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js', 
  ],
  theme: {
    colors: {
      cream: '#BEB9B0', 
      bluey: '#ABD2FA', 
      backdrop: '#003045',

      base_100: '#121C22', 
      hover: '#0A151B', 
      neutral: '#1b1d1d', 
      primary: '#9FB9D0', 
      white: '#FFF', 
      pop: '#FF865B', 
      divide: '#3D4951', 
      success: '#87cf3a', 
      error: '#ff6b6b', 
      warning: "#e1d460", 
      cards: '#3D4951', 

    }, 
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('preline/plugin')],
};
export default config;
