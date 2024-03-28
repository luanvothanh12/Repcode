import { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState('dark') // Default to 'dark' 

  // Determine the colorTheme based on the current theme
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme); 
    root.classList.add(theme); 

    // Save the current theme to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

export default useDarkMode;