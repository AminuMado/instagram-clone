import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Switcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      onChange={() => setIsDarkMode(!isDarkMode)}
      checked={isDarkMode}
      size={50}
      className="dark_mode_switch"
    />
  );
};

export default Switcher;
