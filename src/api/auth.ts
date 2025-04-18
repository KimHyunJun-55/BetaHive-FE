import { LoginData, SignUpData } from "../type/authTypes";
import axiosIntercepter from "../util/axiosInstance";

//로그인
export const signIn = async (loginData: LoginData) => {
  const response = await axiosIntercepter.post(`/member/sign-in`, loginData);

  const accessToken = response.headers["access-token"];
  const refreshToken = response.headers["refresh-token"];
  // 로컬스토리지에 토큰 저장
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return {
    nickname: response.data.data.nickname,
    id: response.data.data.id,
    accessToken,
    refreshToken,
  };
};

export const signUp = async (signUpData: SignUpData) => {
  const response = await axiosIntercepter.post(`/member/sign-up`, signUpData);
  return response.data;
};
