// DEPRECATED: DOES NOT WORK ANYMORE 

// import { useEffect, useState } from "react";

// function useDarkMode() {
//   // Initialize theme from localStorage or default to 'dark'
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('theme') || 'dark';
//   });

//   const colorTheme = theme === "dark" ? "light" : "dark";

//   useEffect(() => {
//     const root = window.document.documentElement;

//     root.classList.remove(colorTheme);
//     root.classList.add(theme);

//     // Save the current theme to localStorage
//     localStorage.setItem("theme", theme);
//   }, [theme, colorTheme]);

//   return [colorTheme, setTheme];
// }

// export default useDarkMode;