import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import ProjectCard from "../../components/profectCard/ProjectCard";
import ProfileEditModal from "../../components/profile/ProfileEditModal";
import { getMyProjects } from "../../api/project";

const MyPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "participated" | "bookmarked" | "created"
  >("participated");
  const [user, setUser] = useState({
    name: "현재 닉네임",
  });
  const navigate = useNavigate();

  const handleSaveProfile = (newNickname: string) => {
    setUser((prev) => ({ ...prev, name: newNickname }));
    // API 호출 로직 추가 가능
  };
  const [createdProjects, setCreatedProjects] = useState([]);
  const [createdPage, setCreatedPage] = useState(0);
  const [createdTotalPages, setCreatedTotalPages] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (activeTab === "created") {
      fetchCreatedProjects(createdPage);
    }
  }, [activeTab, createdPage]);

  const fetchCreatedProjects = async (page: number) => {
    try {
      const data = await getMyProjects(page);
      setCreatedProjects(data.content); // 받아온 프로젝트 리스트로 업데이트
      setCreatedTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch my projects:", err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {/* 프로필 섹션 */}
        <section className={styles.profileSection}>
          <div className={styles.avatar}>
            <FaUser size={40} />
          </div>
          <div className={styles.userInfo}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className={styles.metaInfo}>
              <span>가입일: {user.joinDate}</span>
              <span>테스터 평점: ⭐{user.rating}</span>
            </div>
          </div>
          <div
            className={styles.editIcon}
            onClick={() => setShowEditModal(true)}
          >
            <FaEdit size={24} />
          </div>
        </section>

        {/* 탭 메뉴 */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              activeTab === "participated" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("participated")}
          >
            참여한 프로젝트
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "bookmarked" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("bookmarked")}
          >
            관심 프로젝트
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "created" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("created")}
          >
            내가 등록한 프로젝트
          </div>
        </div>

        {/* 프로젝트 목록 */}
        <section className={styles.projectsSection}>
          {activeTab === "created" && createdProjects.length > 0 ? (
            <div className={styles.projectGrid}>
              {createdProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  hoverEffect={false} // 호버 효과 제거
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>
                {activeTab === "participated" && "참여한 프로젝트가 없습니다"}
                {activeTab === "bookmarked" && "관심 프로젝트가 없습니다"}
                {activeTab === "created" && "등록한 프로젝트가 없습니다"}
              </p>
              <Link
                to={activeTab === "created" ? "/projects/create" : "/"}
                className={styles.exploreLink}
              >
                {activeTab === "created" ? (
                  <>
                    <FaPlus /> 새 프로젝트 등록
                  </>
                ) : (
                  <>
                    프로젝트 탐색하기 <FaArrowRight />
                  </>
                )}
              </Link>
            </div>
          )}
        </section>

        {/* 설정 메뉴 */}
        {/* <section className={styles.settingsSection}>
          <h3>계정 설정</h3>
          <ul className={styles.settingsList}>
            <li>
              <div
                onClick={() => setShowEditModal(true)}
                className={styles.editButton}
              >
                프로필 수정
              </div>
            </li>
            <li>
              <div onClick={handleLogout} className={styles.logoutButton}>
                <FaSignOutAlt /> 로그아웃
              </div>
            </li>
          </ul>
        </section> */}

        {showEditModal && (
          <ProfileEditModal
            currentNickname={user.name}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveProfile}
          />
        )}
      </div>
    </div>
  );
};

export default MyPage;
