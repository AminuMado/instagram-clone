import React, { createContext, useState } from "react";

interface ThemeContextInterface {
  isDarkMode: boolean;
  toggle: () => void;
}
export const ThemeContext = createContext({} as ThemeContextInterface);

export const ThemeContextProvider = (props: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggle = () => setIsDarkMode(!isDarkMode);
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
