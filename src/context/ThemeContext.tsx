// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "../theme";

const ThemeContext = createContext({
  currentTheme: themes.default,
  changeTheme: (themeName: string) => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);

  useEffect(() => {
    const savedTheme = localStorage.getItem("betaHiveTheme");
    if (
      savedTheme &&
      savedTheme !== "default" &&
      themes[savedTheme as keyof typeof themes]
    ) {
      setCurrentTheme(themes[savedTheme as keyof typeof themes]);
    }
  }, []);

  const changeTheme = (themeName: string) => {
    if (themes[themeName as keyof typeof themes]) {
      setCurrentTheme(themes[themeName as keyof typeof themes]);
      localStorage.setItem("betaHiveTheme", themeName);
    }
  };

  // src/context/ThemeContext.tsx
  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      <div className={`app theme-${currentTheme.name}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
