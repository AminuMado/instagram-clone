import { useEffect, useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "./Context/ThemeContext";
const Switcher = () => {
  const { isDarkMode, toggle } = useContext(ThemeContext);

  useEffect(() => {
    const root = window.document.documentElement;
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      onChange={toggle}
      checked={isDarkMode}
      size={50}
      className="dark_mode_switch"
    />
  );
};

export default Switcher;
