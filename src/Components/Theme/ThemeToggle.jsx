import { useEffect, useState } from "react";

export const ThemeToggle = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <label className="swap swap-rotate ml-2">
      <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
      
    
      <span className="swap-on">☀️</span>
      
 
      <span className="swap-off">🌙</span>
    </label>
  );
};