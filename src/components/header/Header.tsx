// src/components/header/Header.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import LoginModal from "../auth/LoginModal";
import styles from "./Header.module.css";

export interface HeaderHandle {
  showLoginModal: () => void;
}

const Header = forwardRef<HeaderHandle>((props, ref) => {
  const { isLoggedIn, userName, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
  const [searchKeyword, setSearchKeyword] = useState("");

  // ref를 통해 부모 컴포넌트에서 모달 제어 가능
  useImperativeHandle(ref, () => ({
    showLoginModal: () => setShowLoginModal(true),
  }));

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/?keyword=${encodeURIComponent(searchKeyword.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img
          src={
            currentTheme.name === "dark"
              ? "/BetaHiveLogo2dark.png"
              : "/BetaHiveLogo2.png"
          }
          alt="BetaHive 로고"
          className={styles.logoIcon}
        />
      </Link>

      <div className={styles.headerRight}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="어떤 프로젝트를 찾고 계신가요?"
            className={styles.searchInput}
            onKeyDown={handleKeyDown}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <div className={styles.userActions}>
          {isLoggedIn ? (
            <>
              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={handleLogout}
              >
                <FaSignOutAlt /> 로그아웃
              </button>
              <Link to="/my" className={styles.userAvatar}>
                <span>{userInitial}</span>
              </Link>
            </>
          ) : (
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={handleLogin}
            >
              <FaSignInAlt /> 로그인
            </button>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            // 로그인 성공 후 원래 요청한 경로로 리다이렉트
            const redirectPath = sessionStorage.getItem("redirectPath");
            if (redirectPath) {
              sessionStorage.removeItem("redirectPath");
              navigate(redirectPath);
            }
          }}
        />
      )}
    </header>
  );
});

export default Header;
