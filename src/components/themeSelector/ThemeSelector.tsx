import React from "react";
import { FaArrowUp, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeSelector.module.css";

const ThemeSelector: React.FC = () => {
  const { currentTheme, changeTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = currentTheme.name === "dark";
  const toggleTheme = () => {
    changeTheme(isDark ? "default" : "dark");
  };

  return (
    <div className={styles.themeSelectorContainer}>
      <div
        className={styles.controlBox}
        onClick={scrollToTop}
        title="맨 위로 이동"
      >
        <FaArrowUp className={styles.icon} />
      </div>
      <div
        className={styles.controlBox}
        onClick={toggleTheme}
        title="테마 전환"
      >
        {isDark ? (
          <FaSun className={styles.icon} />
        ) : (
          <FaMoon className={styles.icon} />
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;
