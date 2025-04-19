import React, { useEffect, useState } from "react";
import { FaComment, FaGoogle, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { checkNickname, signIn, signUp } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { SignUpData } from "../../type/authTypes";
import styles from "./LoginModal.module.css";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("test@test.test");
  const [password, setPassword] = useState("123123123");
  const [nickname, setNickname] = useState(""); // 추가: 회원가입용 이름 필드
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth();
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [nicknameCheckLoading, setNicknameCheckLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  //로그인버튼
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
    } catch (err) {
      toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  // const handleSocialLogin = (provider: "google" | "kakao") => {
  //   // 소셜 로그인 처리 로직
  // };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // 닉네임 체크 확인
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
      onClose();
    } catch (error) {
      console.error("회원가입 실패:", error);
      toast.error("회원가입 중 문제가 발생했습니다.");
    }
  };

  // 닉네임 중복 체크 함수
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요");
      return;
    }

    setNicknameCheckLoading(true);
    try {
      const isAvailable = await checkNickname(nickname);
      console.log(isAvailable);
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
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
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

            <button
              className={`${styles.socialButton} ${styles.google}`}
              onClick={() => handleSocialLogin("google")}
            >
              <FaGoogle /> Google로 시작하기
            </button>
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
