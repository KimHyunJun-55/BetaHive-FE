// src/Router.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreateProject from "./pages/projectCreate/ProjectCreate";
import ProjectDetailPage from "./pages/projectDetail/ProjectDetailPage";
import TesterGuide from "./pages/guide/TesterGuide";
import Footer from "./components/footer/Footer";
import MyPage from "./pages/mypage/MyPage";

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Header />

      <div className="container">
        <div
          className="
        mainContent"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/projects/create" element={<ProjectCreatePage />} /> */}
            <Route path="/projects/create" element={<CreateProject />} />
            <Route
              path="/projects/:projectId/edit"
              element={<CreateProject />}
            />
            <Route
              path="/projects/detail/:id"
              element={<ProjectDetailPage />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/guide" element={<TesterGuide />} />
            <Route path="/my" element={<MyPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default RouterComponent;
