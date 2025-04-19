import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userName?: string;
  userId?: number; // <- undefined 가능
  accessToken?: string;
  refreshToken?: string;
  login: (
    name: string,
    accessToken: string,
    refreshToken: string,
    id: number
  ) => void;
  logout: () => void;
  updateUserName: (newName: string) => void; // 추가!
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    // 새로고침 시 저장된 유저 상태 복원
    const storedName = localStorage.getItem("userName");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedId = localStorage.getItem("userId");

    if (storedName && storedAccessToken && storedRefreshToken && storedId) {
      setUserName(storedName);
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUserId(Number(storedId)); // 문자열로 저장되므로 숫자로 변환
      setIsLoggedIn(true);
    }
  }, []);

  const updateUserName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem("userName", newName);
  };

  const login = (name: string, token: string, refresh: string, id: number) => {
    setUserId(id);
    setIsLoggedIn(true);
    setUserName(name);
    setAccessToken(token);
    setRefreshToken(refresh);

    localStorage.setItem("userName", name);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("userId", id.toString()); // 숫자는 문자열로 저장
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(undefined);
    setAccessToken(undefined);
    setRefreshToken(undefined);
    setUserId(undefined);

    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        accessToken,
        refreshToken,
        userId,
        login,
        logout,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
