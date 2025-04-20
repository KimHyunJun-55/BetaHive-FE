// src/pages/KakaoCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendKakaoCodeToServer } from "../api/auth";
import { toast } from "react-toastify";
import { useLoading } from "../context/LoadingContext";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      showLoading(); // 로딩 시작

      (async () => {
        try {
          const { nickname, accessToken, refreshToken, id } =
            await sendKakaoCodeToServer(code);
          login(nickname, accessToken, refreshToken, id);
          toast.success(`${nickname}님 안녕하세요`);
          navigate("/"); // 로그인 후 메인으로 이동
        } catch (err) {
          toast.error("카카오 로그인에 실패했습니다.");
          navigate("/");
        } finally {
          hideLoading(); // 로딩 종료 (성공/실패 모두 처리)
        }
      })();
    }
  }, [login, navigate, showLoading, hideLoading]);

  return <p>로그인 중입니다...</p>;
};

export default KakaoCallbackPage;
