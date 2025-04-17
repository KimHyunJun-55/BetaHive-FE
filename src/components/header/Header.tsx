import React, { useState } from "react";
import { FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { GiHoneycomb } from "react-icons/gi"; // 벌집 전체 느낌
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../auth/LoginModal";
import styles from "./Header.module.css";
import { useTheme } from "../../context/ThemeContext";
<Link to="/" className={styles.logo}>
  <GiHoneycomb className={styles.logoIcon} />
  <span>
    <strong>Beta</strong>Hive
  </span>
</Link>;

const Header: React.FC = () => {
  const { isLoggedIn, userName, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme(); // 요거 추가!

  // 더미 데이터 대신 context에서 가져온 userName 사용
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
  const notificationCount = 3; // 실제로는 API에서 가져오거나 context에 추가

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    logout(); // AuthContext의 logout 함수 사용
    navigate("/");
  };

  const handleLoginSuccess = (
    name: string,
    token: string,
    refreshToken: string
  ) => {
    login(name, token, refreshToken); // AuthContext의 login 함수 사용
    setShowLoginModal(false);
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

      {/* <nav className={styles.navMain}>
        <Link to="/" className={styles.active}>
          <FaCompass /> 프로젝트 탐색
        </Link>
        <Link to="/projects/create" onClick={handleProjectCreateClick}>
          <FaPlusCircle /> 프로젝트 등록
        </Link>
        <Link to="/dashboard">
          <FaChartLine /> 대시보드
        </Link>
        <Link to="/feedback">
          <FaCommentDots /> 피드백
        </Link>
      </nav> */}

      <div className={styles.headerRight}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="프로젝트 검색..." />
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
                {notificationCount > 0 && (
                  <span className={styles.notificationBadge}>
                    {notificationCount}
                  </span>
                )}
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
          onLoginSuccess={handleLoginSuccess} // 수정된 부분
        />
      )}
    </header>
  );
};

export default Header;
