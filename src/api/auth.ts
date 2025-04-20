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

// api/auth.ts
export const checkNickname = async (nickname: string) => {
  const response = await axiosIntercepter.post(
    "/member/check-nickname",
    { nickname }, // 객체로 감싸서 전송
    {
      headers: {
        "Content-Type": "application/json", // 명시적으로 JSON 타입 지정
      },
    }
  );
  return response.data.data;
};

// 닉네임 변경 API
export const updateNickname = async (nickname: string) => {
  const response = await axiosIntercepter.put(
    "/member/nickname",
    { nickname },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

export const getMyProfile = async () => {
  const response = await axiosIntercepter.get("/member");
  return response.data.data;
};

export const sendKakaoCodeToServer = async (code: string) => {
  const response = await axiosIntercepter.get(`social/kakao?code=${code}`);
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
