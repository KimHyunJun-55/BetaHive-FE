// utils/axiosIntercepter.ts
import axios from "axios";
import { getLoadingFunctions } from "./loadingUtils";

const { showLoading, hideLoading } = getLoadingFunctions();

const axiosIntercepter = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

// 요청 인터셉터
axiosIntercepter.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["access-token"] = `${accessToken}`;
    }

    console.log("🔄 인터셉터 요청 시작 - showLoading 호출"); // 추가
    showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosIntercepter.interceptors.response.use(
  (response) => {
    console.log("✅ 인터셉터 응답 성공 - hideLoading 호출"); // 추가
    hideLoading();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 처리 전에 로딩 숨김 (재시도 시에는 새로 표시)
    if (error.response?.status !== 401) {
      hideLoading();
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        hideLoading();
        return Promise.reject(error);
      }

      try {
        // 재요청 전에 로딩 표시
        showLoading();
        originalRequest.headers["Refresh-Token"] = refreshToken;
        const retryResponse = await axiosIntercepter(originalRequest);

        const newAccessToken = retryResponse.headers["access-token"];
        const newRefreshToken = retryResponse.headers["refresh-token"];

        if (newAccessToken && newRefreshToken) {
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        hideLoading();
        return retryResponse;
      } catch (retryError) {
        hideLoading();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosIntercepter;
