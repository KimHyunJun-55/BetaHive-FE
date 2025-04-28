// src/components/auth/LoginModal.tsx
import React, { useEffect, useState } from "react";
import { FaComment, FaGoogle, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { checkNickname, signIn, signUp } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { SignUpData } from "../../type/authTypes";
import styles from "./LoginModal.module.css";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess?: () => void; // 추가된 prop
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("test@test.test");
  const [password, setPassword] = useState("123123123");
  const [nickname, setNickname] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth();
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [nicknameCheckLoading, setNicknameCheckLoading] = useState(false);

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const handleSocialLogin = (provider: "kakao" | "google") => {
    console.log(provider);
    if (provider === "kakao") {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoAuthUrl;
    } else if (provider === "google") {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
      window.location.href = googleAuthUrl;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { nickname, accessToken, refreshToken, id } = await signIn({
        email,
        password,
      });
      login(nickname, accessToken, refreshToken, id);
      toast.success(`${nickname}님 안녕하세요`);
      onClose();
      onLoginSuccess?.(); // 로그인 성공 콜백 호출
    } catch (err) {
      toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNicknameAvailable === null) {
      toast.error("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (!isNicknameAvailable) {
      toast.error("사용할 수 없는 닉네임입니다.");
      return;
    }

    const signUpData: SignUpData = {
      email,
      password,
      nickname,
    };

    try {
      await signUp(signUpData);
      toast.success("회원가입이 완료되었습니다.");
      setIsLoginView(true); // 회원가입 후 로그인 화면으로 전환
    } catch (error) {
      console.error("회원가입 실패:", error);
      toast.error("회원가입 중 문제가 발생했습니다.");
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요");
      return;
    }

    setNicknameCheckLoading(true);
    try {
      const isAvailable = await checkNickname(nickname);
      setIsNicknameAvailable(isAvailable);
      if (isAvailable) {
        toast.success("사용 가능한 닉네임입니다.");
      } else {
        toast.error("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 체크 실패:", error);
      toast.error("닉네임 확인 중 오류가 발생했습니다.");
    } finally {
      setNicknameCheckLoading(false);
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </div>
        <h2 className={styles.modalTitle}>
          {isLoginView ? "로그인" : "회원가입"}
        </h2>
        {isLoginView ? (
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@test.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                minLength={6}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              {isLoginView ? "로그인" : "회원가입"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">닉네임</label>
              <div className={styles.nicknameContainer}>
                <input
                  className={styles.userInput}
                  type="text"
                  id="username"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setIsNicknameAvailable(null); // 닉네임 변경 시 상태 초기화
                  }}
                  placeholder="사용할 닉네임을 입력하세요"
                  required
                />
                <button
                  type="button"
                  className={styles.checkButton}
                  onClick={handleCheckNickname}
                  disabled={nicknameCheckLoading || !nickname.trim()}
                >
                  {nicknameCheckLoading ? "확인 중..." : "중복 확인"}
                </button>
              </div>
              {isNicknameAvailable !== null && (
                <div className={styles.nicknameStatus}>
                  {isNicknameAvailable ? (
                    <span className={styles.available}>
                      ✓ 사용 가능한 닉네임입니다.
                    </span>
                  ) : (
                    <span className={styles.unavailable}>
                      ✗ 이미 사용 중인 닉네임입니다.
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">이메일</label>
              <input
                className={styles.userInput}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@test.com"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">비밀번호 (최소 6자)</label>
              <input
                className={styles.userInput}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                minLength={6}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              회원가입
            </button>
          </form>
        )}

        <div className={styles.socialLoginContainer}>
          <p className={styles.socialLoginText}>
            소셜 계정으로 {isLoginView ? "로그인" : "가입"}
          </p>

          <div className={styles.socialButtons}>
            <button
              className={`${styles.socialButton} ${styles.kakao}`}
              onClick={() => handleSocialLogin("kakao")}
            >
              <FaComment /> 카카오로 시작하기
            </button>

            {/* <button
              className={`${styles.socialButton} ${styles.google}`}
              onClick={() => handleSocialLogin("google")}
            >
              <FaGoogle /> Google로 시작하기
            </button> */}
          </div>
        </div>
        <div className={styles.switchView}>
          <span>
            {isLoginView
              ? "아직 회원이 아니신가요?"
              : "이미 계정이 있으신가요?"}
          </span>
          <button
            className={styles.switchButton}
            onClick={() => setIsLoginView(!isLoginView)}
          >
            {isLoginView ? "회원가입" : "로그인"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
