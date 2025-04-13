// src/Router.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreateProject from "./pages/projectCreate/ProjectCreatePage";
import ProjectDetailPage from "./pages/projectDetail/ProjectDetailPage";

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/projects/create" element={<ProjectCreatePage />} /> */}
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/detail/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
