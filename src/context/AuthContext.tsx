import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
  login: (name: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  useEffect(() => {
    // 새로고침 시 저장된 유저 상태 복원
    const storedName = localStorage.getItem("userName");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedName && storedAccessToken && storedRefreshToken) {
      setUserName(storedName);
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (name: string, token: string, refresh: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    setAccessToken(token);
    setRefreshToken(refresh);

    localStorage.setItem("userName", name);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(undefined);
    setAccessToken(undefined);
    setRefreshToken(undefined);

    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userName, accessToken, refreshToken, login, logout }}
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
