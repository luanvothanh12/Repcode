import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js', 
  ],
  darkMode: 'class',
  theme: {
    colors: {
      base_100: '#121C22', 
      hover: '#0A151B', 
      neutral: '#1b1d1d', 
      primary: '#9FB9D0', 
      primary2: '#4B5563', 
      white: '#FFF', 
      pop: '#FF865B', 
      pop2: '#f9d72f', 
      divide: '#3D4951', 
      divide2: '#D8E0E9',
      feintwhite: '#CECECE', 
      grey: '#A5A9AE', 
      success: '#87cf3a', 
      error: '#ff6b6b', 
      warning: "#e1d460", 
      easy: "#59FF00", 
      medium: "#FFBF1A", 
      hard: "#FF395F", 
      link: "#79ADDC", 
      cards: '#3D4951', 
      load: '#2563EB',
      blue: '#2563EB',
      new: '#4DBEE8', 
      learning: '#CF7150',
      review: '#0FB20C', 
      disabled: '#242728', 
      disabledText: '#7C7C7B', 
      mediumbg: '#362E1A',
      easybg: '#2E441A', 
      hardbg: '#411822',
      newbg: '#1B3641', 
      warningbg: '#38361C', 
      successbg: '#394723', 

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
