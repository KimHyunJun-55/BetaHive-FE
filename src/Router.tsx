// src/Router.tsx
import React, { useEffect, useRef } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import TesterGuide from "./pages/guide/TesterGuide";
import Home from "./pages/Home";
import MyPage from "./pages/mypage/MyPage";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import CreateProject from "./pages/projectCreate/ProjectCreate";
import ProjectDetailPage from "./pages/projectDetail/ProjectDetailPage";
import Terms from "./pages/Terms";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const RouterComponent: React.FC = () => {
  const { isLoggedIn } = useAuth(); // AuthContext에서 isLoggedIn 사용
  const headerRef = useRef<{ showLoginModal: () => void }>(null);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <Router>
      <Header ref={headerRef} />

      <div className="container">
        <div
          className="
        mainContent"
        >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/projects/create"
              element={
                <ProtectedRoute
                  showModal={() => headerRef.current?.showLoginModal()}
                >
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:projectId/edit"
              element={
                <ProtectedRoute
                  showModal={() => headerRef.current?.showLoginModal()}
                >
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/detail/:id"
              element={<ProjectDetailPage />}
            />
            <Route path="/guide" element={<TesterGuide />} />
            <Route
              path="/my"
              element={
                <ProtectedRoute
                  showModal={() => headerRef.current?.showLoginModal()}
                >
                  <MyPage />
                </ProtectedRoute>
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default RouterComponent;
