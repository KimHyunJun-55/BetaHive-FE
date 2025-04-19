// src/components/auth/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: React.ReactNode;
  showModal?: () => void; // 모달 표시 함수 전달
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  showModal,
}) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem("redirectPath", location.pathname);
      showModal?.();
      toast.error("로그인후에 이용해주세요!");
      navigate("/");
    }
  }, [isLoggedIn, location, navigate, showModal]);

  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
