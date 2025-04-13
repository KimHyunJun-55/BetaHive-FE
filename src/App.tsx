// src/App.tsx
import React, { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import RouterComponent from "./Router";
import ThemeSelector from "./components/themeSelector/ThemeSelector";
import { AuthProvider } from "./context/AuthContext";

import { cssTransition, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import GlobalLoading from "./components/common/GlobalLoading";
import { setLoadingFunctions } from "./util/loadingUtils";
const Fade = cssTransition({
  enter: "fadeIn",
  exit: "fadeOut",
  // duration: [700, 1000], // [enterDuration, exitDuration]
});
const App: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    setLoadingFunctions(showLoading, hideLoading);
  }, [showLoading, hideLoading]);

  return (
    <LoadingProvider>
      <AuthProvider>
        <ThemeProvider>
          <GlobalLoading />
          <ThemeSelector />
          <RouterComponent />
          <ToastContainer
            position="bottom-center"
            autoClose={1250}
            hideProgressBar
            transition={Fade}
            toastClassName="custom-toast"
          />
        </ThemeProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
