import React, {
  useState,
  useMemo,
  useContext,
  createContext,
  useRef,
  useCallback,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false); // 실시간 상태 추적

  const showLoading = useCallback(() => {
    if (!loadingRef.current) {
      loadingRef.current = true;
      setIsLoading(true);
      console.log("🔥 로딩 시작 (실제 상태 업데이트)");
    }
  }, []);

  const hideLoading = useCallback(() => {
    if (loadingRef.current) {
      loadingRef.current = false;
      setIsLoading(false);
      console.log("💤 로딩 종료 (실제 상태 업데이트)");
    }
  }, []);

  // 전역 함수 등록 (axios 인터셉터용)

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};
