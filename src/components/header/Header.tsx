import React, { useState } from "react";
import styles from "./Header.module.css";
import {
  FaBug,
  FaSearch,
  FaSignInAlt,
  FaCompass,
  FaPlusCircle,
  FaChartLine,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const { isLoggedIn, userName, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleProjectCreateClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault(); // 링크 이동 방지
      toast.warning("로그인 후 이용해주세요!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      // 또는 커스텀 토스트 사용: showWarningToast("로그인 후 이용해주세요!");
      setShowLoginModal(true); // 로그인 모달 열기
    }
  };

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
      <a href="/" className={styles.logo}>
        <FaBug className={styles.logoIcon} />
        <span>BetaHive</span>
      </a>

      <nav className={styles.navMain}>
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
      </nav>

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
              <Link to="/mypage" className={styles.userAvatar}>
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
