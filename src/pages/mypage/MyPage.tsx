import { useEffect, useState } from "react";
import { FaArrowRight, FaEdit, FaPlus, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getBookmarkedProjects, getMyProjects } from "../../api/project";
import ProjectCard from "../../components/profectCard/ProjectCard";
import ProfileEditModal from "../../components/profile/ProfileEditModal";
import styles from "./MyPage.module.css";
import { useAuth } from "../../context/AuthContext";

const MyPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "participated" | "bookmarked" | "created"
  >("bookmarked");

  const [user, setUser] = useState({
    name: "현재 닉네임",
    email: "user@example.com",
    joinDate: "2023-01-01",
    rating: 4.5,
  });

  const { userName } = useAuth();

  const navigate = useNavigate();

  const handleSaveProfile = (newNickname: string) => {
    setUser((prev) => ({ ...prev, name: newNickname }));
    // API 호출 로직 추가 가능
  };

  // 등록한 프로젝트 상태
  const [createdProjects, setCreatedProjects] = useState([]);
  const [createdPage, setCreatedPage] = useState(0);
  const [createdTotalPages, setCreatedTotalPages] = useState(0);

  // 북마크 프로젝트 상태
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [bookmarkedPage, setBookmarkedPage] = useState(0);
  const [bookmarkedTotalPages, setBookmarkedTotalPages] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (activeTab === "created") {
      fetchCreatedProjects(createdPage);
    } else if (activeTab === "bookmarked") {
      fetchBookmarkedProjects(bookmarkedPage);
    }
    // 참여 프로젝트는 추후 구현
  }, [activeTab, createdPage, bookmarkedPage]);

  const fetchCreatedProjects = async (page: number) => {
    try {
      const data = await getMyProjects(page);
      setCreatedProjects(data.content);
      setCreatedTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch my projects:", err);
    }
  };

  const fetchBookmarkedProjects = async (page: number) => {
    try {
      const data = await getBookmarkedProjects(page);
      setBookmarkedProjects(data.content);
      setBookmarkedTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch bookmarked projects:", err);
    }
  };

  const renderProjects = () => {
    const projects =
      activeTab === "created"
        ? createdProjects
        : activeTab === "bookmarked"
        ? bookmarkedProjects
        : [];

    if (projects.length > 0) {
      return (
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              hoverEffect={false}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className={styles.emptyState}>
          <p>
            {/* {activeTab === "participated" && "참여한 프로젝트가 없습니다"} */}
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
      );
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
            <h2>{userName}</h2>
            {/* <p>{user.email}</p> */}
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
          {/* <div
            className={`${styles.tab} ${
              activeTab === "participated" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("participated")}
          >
            참여한 프로젝트
          </div> */}
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
        <section className={styles.projectsSection}>{renderProjects()}</section>

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
