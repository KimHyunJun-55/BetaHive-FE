import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProject } from "../api/project";
import FilterBar from "../components/filterBar/FilterBar";
import ProjectCard from "../components/profectCard/ProjectCard";
import { Project } from "../types";
import styles from "./Home.module.css";
import { FilterType } from "../type/types";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  // const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState("popular");
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") ?? "";
  const pageSize = 10;
  const visiblePages = 5;
  const start = Math.max(0, page - Math.floor(visiblePages / 2));
  const end = Math.min(totalPages, start + visiblePages);

  const getSortParams = () => {
    switch (sortOption) {
      case "latest":
        return { sort: "createdAt,desc" };
      case "deadline":
        return { sort: "deadline,asc" };
      case "reward":
        return { sort: "reward,desc" };
      default:
        return { sort: "popularity,desc" }; // 기본: 인기순
    }
  };

  const getFilterParams = () => {
    switch (activeFilter) {
      case FilterType.MOBILE:
        return { category: "MOBILE_APP" };
      case FilterType.WEB:
        return { category: "WEB_SERVICE" };
      case FilterType.REWARD:
        return { hasReward: true };
      case FilterType.IN_PROGRESS:
      case FilterType.COMPLETED:
      case FilterType.MODIFYING:
        return { status: activeFilter };
      default:
        return {};
    }
  };

  const fetchProjects = async (page: number) => {
    try {
      const sortParams = getSortParams();
      const filterParams = getFilterParams();

      const response = await getAllProject(page, pageSize, {
        ...sortParams,
        ...filterParams,
        ...(keyword && { keyword }), // keyword가 있을 때만 추가
      });

      setProjectList(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page, sortOption, activeFilter, keyword]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewProject = () => {
    navigate("/projects/create");
  };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSortOption(e.target.value);
  //   setPage(0);
  // };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          <div className={styles.heroBetaPlatform}>
            <div className={styles.heroBetaContent}>
              <h1>
                <span className={styles.heroBetaHighlight}>새로운 서비스</span>
                를<br />
                누구보다 먼저 만나보고{" "}
                <span className={styles.heroBetaHighlight}>소중한 의견</span>을
                들려주세요
              </h1>
              <p className={styles.heroBetaSubtitle}>
                여전히 발전 중인 서비스들이지만, 지금 참여해서 의견을
                나눠주세요.
                <br />
                여러분의 피드백이 서비스를 더욱 빛나게 만듭니다!
              </p>
              {/* <p className={styles.heroBetaSubtitle}>
                새로운 아이디어를 실험하고
                <br />
                사용자 피드백을 통해 함께 만들어가는 플랫폼입니다.
              </p> */}

              <div className={styles.heroBetaButtons}>
                <button onClick={handleNewProject}>프로젝트 등록하기</button>
                <Link to="/guide">테스터 가이드 →</Link>
              </div>
            </div>
            {/* <div className={styles.heroBetaVisual}>
              <div className={styles.heroBetaCard}>
                <div className={styles.cardHeader}>베타 테스트 단계</div>
                <ul className={styles.cardSteps}>
                  <li>1. 프로젝트 발견</li>
                  <li>2. 간편 참여</li>
                  <li>3. 피드백 제출</li>
                  <li>
                    4.{" "}
                    <span className={styles.rewardText}>보상 수령 (선택)</span>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          {/* <div className={styles.projectGridHeader}>
            <h2 className={styles.gridTitle}>추천 프로젝트</h2>
            <div className={styles.gridSort}>
              <span className={styles.sortLabel}>정렬:</span>
              <select
                className={styles.sortSelect}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="popular">인기순</option>
                <option value="latest">최신순</option>
                <option value="deadline">마감임박순</option>
                <option value="reward">보상높은순</option>
              </select>
            </div>
          </div> */}
          {projectList.length === 0 ? (
            <div className={styles.projectFlex}>
              <div className={styles.noResult}>
                <h3>🔍 검색 결과가 없습니다</h3>
                <p>다른 키워드나 필터를 시도해보세요.</p>
              </div>
            </div>
          ) : (
            <div className={styles.projectGrid}>
              {projectList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className={styles.pagination}>
            {page > 2 && (
              <>
                <div
                  onClick={() => handlePageChange(0)}
                  className={
                    page === 0 ? styles.activePageNumber : styles.pageNumber
                  }
                >
                  1
                </div>
                {page > 3 && <div className={styles.ellipsis}>...</div>}
              </>
            )}

            {Array.from({ length: totalPages }, (_, i) => i)
              .filter((i) => i >= page - 2 && i <= page + 2)
              .map((i) => (
                <div
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={
                    i === page ? styles.activePageNumber : styles.pageNumber
                  }
                >
                  {i + 1}
                </div>
              ))}

            {page < totalPages - 3 && (
              <>
                {page < totalPages - 4 && (
                  <div className={styles.ellipsis}>...</div>
                )}
                <div
                  onClick={() => handlePageChange(totalPages - 1)}
                  className={
                    page === totalPages - 1
                      ? styles.activePageNumber
                      : styles.pageNumber
                  }
                >
                  {totalPages}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
