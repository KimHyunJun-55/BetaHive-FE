// components/ThemeSelector/ThemeSelector.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeSelector.module.css";
import { FaPalette } from "react-icons/fa";

const ThemeSelector: React.FC = () => {
  const { currentTheme, changeTheme } = useTheme();

  return (
    <div className={styles.themeSelectorContainer}>
      <div className={styles.themeSelector}>
        <FaPalette className={styles.themeIcon} />
        <div
          className={`${styles.themeBtn} ${
            currentTheme?.name === "default" ? styles.active : ""
          }`}
          style={{ background: "#4361ee" }}
          onClick={() => changeTheme("default")}
          title="기본 테마"
        ></div>
        <div
          className={`${styles.themeBtn} ${
            currentTheme?.name === "dark" ? styles.active : ""
          }`}
          style={{ background: "#121212" }}
          onClick={() => changeTheme("dark")}
          title="다크 테마"
        ></div>
        <div
          className={`${styles.themeBtn} ${
            currentTheme?.name === "green" ? styles.active : ""
          }`}
          style={{ background: "#10b981" }}
          onClick={() => changeTheme("green")}
          title="그린 테마"
        ></div>
      </div>
    </div>
  );
};

export default ThemeSelector;
