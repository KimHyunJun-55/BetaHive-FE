// src/pages/GoogleCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useLoading } from "../context/LoadingContext";
import { sendGoogleCodeToServer } from "../api/auth";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      showLoading();

      (async () => {
        try {
          const { nickname, accessToken, refreshToken, id } =
            await sendGoogleCodeToServer(code);
          login(nickname, accessToken, refreshToken, id);
          toast.success(`${nickname}님, 환영합니다! 😊`, {
            autoClose: 3000,
            position: "top-center",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          navigate("/");
        } catch (err) {
          toast.error("Google 로그인에 실패했습니다.");
          navigate("/");
        } finally {
          hideLoading();
        }
      })();
    }
  }, [login, navigate, showLoading, hideLoading]);

  return <p>로그인 중입니다...</p>;
};

export default GoogleCallbackPage;
