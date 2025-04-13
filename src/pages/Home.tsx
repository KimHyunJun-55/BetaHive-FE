// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  TesterRatingSection,
  TestingGuideSection,
} from "../components/detailSection/DetailSection";
import FilterBar from "../components/filterBar/FilterBar";
import ProjectCard from "../components/profectCard/ProjectCard";
import { projects } from "../data/dummy";
import styles from "./Home.module.css";
import { Project } from "../types";
import { getAllProject } from "../api/project";

const Home: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sortOption, setSortOption] = useState("인기순");
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProject(); // API 엔드포인트는 실제 경로로 수정
        console.log(response);
        setProjectList(response);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
      }
    };

    fetchProjects();
  }, []); // 의존성

  const handleNewProject = () => {
    navigate("/projects/create");
  };

  const handleProjectClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {/* <Sidebar /> */}
        <main className={styles.mainContent}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>프로젝트 탐색</h1>
            <div className={styles.pageActions}>
              {/* <button className={`${styles.btn} ${styles.btnOutline}`}>
                <FaSlidersH /> 고급 필터
              </button> */}
              <button className={`${styles.btn} ${styles.btnPrimary}`}>
                <FaPlus /> 새 프로젝트
              </button>
            </div>
          </div>

          <FilterBar />

          <div className={styles.projectGridHeader}>
            <h2 className={styles.gridTitle}>추천 프로젝트</h2>
            <div className={styles.gridSort}>
              <span className={styles.sortLabel}>정렬:</span>
              <select
                className={styles.sortSelect}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option>인기순</option>
                <option>최신순</option>
                <option>마감임박순</option>
                <option>보상높은순</option>
              </select>
            </div>
          </div>

          <div className={styles.projectGrid}>
            {projectList.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))} */}
          </div>

          <TestingGuideSection />
          <TesterRatingSection />
        </main>
      </div>
    </div>
  );
};

export default Home;
