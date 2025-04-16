import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaCheck,
  FaChevronDown,
  FaClock,
  FaCog,
  FaEdit,
  FaEllipsisV,
  FaPlay,
  FaRegBookmark,
  FaShareAlt,
  FaTimes,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkBookmarkStatus,
  fetchProjectDetails,
  updateStatus,
} from "../../api/project";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProjectDetail.module.css";
import ProjectFeedback from "./section/ProjectFeedback";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import ConfirmDeleteModal from "../../components/modal/ConfirmDeleteModal";

interface MediaFile {
  url: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  hasReward: boolean;
  baseReward: string;
  bonusRewards: string[];
  instructions: string;
  requirements: string[];
  contact: string;
  testType: string;
  testDuration: number;
  testersCount: number;
  thumbnailUrl: string;
  mediaFiles: MediaFile[];
  creator: string;
  createdAt: string;
  status: string;
  progress?: number;
  participants?: number;
  daysLeft?: number;
}

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedMedia, setExpandedMedia] = useState<MediaFile | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "feedback">(
    "description"
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [feedbacks, setFeedbacks] = useState<any[]>([]); // 실제 API 데이터로 대체 필요
  const { userName } = useAuth();
  const navigate = useNavigate();

  const [currentStatus, setCurrentStatus] = useState<string | null>(
    project?.status
  );
  //북마크
  const [isBookmarked, setIsBookmark] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [showParticipationModal, setShowParticipationModal] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었습니다!");
    } catch (err) {
      toast.error("링크 복사에 실패했어요 😢");
    }
  };

  const CATEGORY_LABELS: { [key: string]: string } = {
    MOBILE: "모바일",
    WEB: "기술",
    WEB_MOBILE: "웹/모바일",
  };

  const STATUS_OPTIONS = [
    {
      value: "IN_PROGRESS",
      label: "테스트진행 중",
      icon: <FaPlay className={styles.statusIcon} />,
    },
    {
      value: "COMPLETED",
      label: "테스트종료",
      icon: <FaCheck className={styles.statusIcon} />,
    },
    {
      value: "MODIFYING",
      label: "수정 중",
      icon: <FaEdit className={styles.statusIcon} />,
    },
  ];
  const EDIT_OPTIONS = [
    {
      value: "프로젝트 수정",
      icon: <FaPlay className={styles.statusIcon} />,
    },
    {
      value: "프로젝트 삭제",
      icon: <FaCheck className={styles.statusIcon} />,
    },
  ];

  interface ParticipationOption {
    label: string;
  }

  type ParticipationOptions = {
    WEB: ParticipationOption;
    IOS: ParticipationOption;
    ANDROID: ParticipationOption;
  };
  const PARTICIPATION_OPTIONS: ParticipationOptions = {
    WEB: {
      label: "웹 테스트 참여",
    },

    IOS: {
      label: "iOS 테스트 참여",
    },
    ANDROID: {
      label: "안드로이드 테스트 참여",
    },
  };

  const [isParticipationDropdownOpen, setIsParticipationDropdownOpen] =
    useState(false);

  const handleSelectParticipation = (
    option: keyof typeof PARTICIPATION_OPTIONS
  ) => {
    setIsParticipationDropdownOpen(false);

    // 각 옵션에 맞는 링크로 이동 (예시)
    let link = "";
    switch (option) {
      case "WEB":
        link = "/web-test";
        break;
      case "MOBILE":
        link = "/mobile-test";
        break;
      case "IOS":
        link = "/ios-test";
        break;
      case "ANDROID":
        link = "/android-test";
        break;
      case "WEB_MOBILE":
        link = "/web-mobile-test";
        break;
      default:
        link = "/";
    }

    navigate(link); // 해당 링크로 이동
    // 또는 window.location.href = link; // 외부 링크일 경우
  };

  console.log(project);
  useEffect(() => {
    const loadProject = async () => {
      try {
        const [data, isBookmarked] = await Promise.all([
          fetchProjectDetails(numericId),
          checkBookmarkStatus(numericId),
        ]);
        setProject(data);
        setCurrentStatus(data.status);
        setIsBookmark(isBookmarked); // 북마크 상태 반영
      } catch (err) {
        setError("프로젝트 불러오기 실패");
      }
    };

    loadProject();
  }, [numericId]);
  const toggleBookmark = async () => {
    try {
      const updatedStatus: boolean = await checkBookmarkStatus(numericId); // 서버 요청
      if (updatedStatus) {
        toast("내 관심목록에 저장되었습니다.");
      } else {
        toast("내 관심목록에서 삭제 되었습니다.");
      }
      setIsBookmark(updatedStatus); // 응답 기반으로 상태 업데이트
    } catch (err) {
      console.error("북마크 토글 실패:", err);
      alert("북마크 변경 중 오류가 발생했습니다.");
    }
  };

  const isCreator = userName === project?.creator;

  if (error) return <div className={styles.error}>{error}</div>;
  if (!project) return null;

  const handleSelect = async (status: string) => {
    try {
      setCurrentStatus(status); // UI에 반영
      await updateStatus(numericId, status);
      setDropdownOpen(false);
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    }
  };
  const handleEditMenu = async (status: string) => {
    console.log(status);
    if (status === "프로젝트 수정") {
      handleEditClick();
    }
    if (status === "프로젝트 삭제") {
      handleConfirmDelete();
    }
  };
  const handleConfirmDelete = async () => {
    try {
      // await deleteProject(numericId); // 실제 삭제 API 호출
      toast.success("삭제되었습니다");
      navigate("/projects"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      toast.error("삭제 실패");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };
  //수정페이지이동
  const handleEditClick = () => {
    navigate(`/projects/${project.id}/edit`);
  };

  const openImageModal = (media: MediaFile) => {
    setExpandedMedia(media);
  };

  const closeImageModal = () => {
    setExpandedMedia(null);
  };

  const mediaList = project.mediaFiles || [];

  const goNext = () => {
    const currentIndex = mediaList.indexOf(expandedMedia!);
    const nextIndex = (currentIndex + 1) % mediaList.length;
    setExpandedMedia(mediaList[nextIndex]);
  };

  const goPrev = () => {
    const currentIndex = mediaList.indexOf(expandedMedia!);
    const prevIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    setExpandedMedia(mediaList[prevIndex]);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <>
            {/* 기존 설명 내용 유지 */}
            {project.description && (
              <div className={styles.descriptionContent}>
                <h3>프로젝트 설명</h3>
                <div
                  className={styles.descriptionText}
                  dangerouslySetInnerHTML={{
                    __html: project.description,
                  }}
                ></div>
              </div>
            )}

            {/* 상세 설명 */}
            {project.detailedDescription && (
              <div className={styles.descriptionContent}>
                <h3>프로젝트 상세 설명</h3>
                <div
                  className={styles.descriptionText}
                  dangerouslySetInnerHTML={{
                    __html: project.detailedDescription,
                  }}
                />
              </div>
            )}

            {/* 요구사항 */}
            {project.requirements?.length > 0 && (
              <div className={styles.section}>
                <h3>필수 요구사항</h3>
                <div className={styles.descriptionText}>
                  {project.requirements.map((req, i) => (
                    <div key={i}>{req}</div>
                  ))}
                </div>
              </div>
            )}

            {/* 참여 방법 */}
            {project.instructions && (
              <div className={styles.section}>
                <h3>참여 방법</h3>
                <div
                  className={styles.instructionsContent}
                  dangerouslySetInnerHTML={{ __html: project.instructions }}
                />
              </div>
            )}

            {/* 미디어 설명 */}
            {project.mediaFiles?.length > 0 && (
              <div className={styles.section}>
                <h3>프로젝트 미디어 설명</h3>
                <div className={styles.mediaGallery}>
                  {project.mediaFiles.map((media, index) => (
                    <div key={index} className={styles.mediaItem}>
                      <div
                        className={styles.mediaImageContainer}
                        onClick={() => openImageModal(media)}
                      >
                        <img src={media.url} alt={`미디어 ${index + 1}`} />
                      </div>
                      <div
                        className={styles.mediaDescription}
                        dangerouslySetInnerHTML={{ __html: media.description }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* 다른 설명 섹션들... */}
          </>
        );
      case "feedback":
        return <ProjectFeedback projectId={project.id} feedbacks={feedbacks} />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* 이미지 확대 모달 */}
        {expandedMedia && (
          <div className={styles.imageModal}>
            <button
              className={`${styles.navButton} ${styles.left}`}
              onClick={goPrev}
            >
              &#10094;
            </button>
            <button
              className={`${styles.navButton} ${styles.right}`}
              onClick={goNext}
            >
              &#10095;
            </button>

            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={closeImageModal}>
                &times;
              </button>

              <img
                src={expandedMedia.url}
                alt="확대 이미지"
                className={styles.modalImage}
              />

              <div
                className={styles.modalDescription}
                dangerouslySetInnerHTML={{
                  __html: expandedMedia.description,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* 프로젝트 헤더 섹션 */}
        <div className={styles.projectHeader}>
          <div className={styles.projectImage}>
            <img
              src={project.thumbnailUrl}
              alt={project.name}
              // onClick={() =>
              //   openImageModal({
              //     url: project.thumbnailUrl,
              //     description: project.name,
              //   })
              // }
            />
          </div>

          <div className={styles.projectInfo}>
            {/* 프로젝트 메타 정보 */}
            <div className={styles.projectMeta}>
              <span className={styles.projectCategory}>
                {" "}
                {CATEGORY_LABELS[project.category] ?? project.category}
              </span>
              <span className={styles.projectStatus}>
                {STATUS_OPTIONS.find((s) => s.value === currentStatus)?.label ??
                  currentStatus}
              </span>{" "}
              {isCreator ? (
                <div
                  className={styles.statusEdit}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaCog style={{ marginRight: 6 }} />
                  상태 변경
                  <FaChevronDown style={{ marginLeft: 6 }} />
                  {dropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      {STATUS_OPTIONS.map((status) => (
                        <div
                          key={status.value}
                          className={styles.menuItem}
                          onClick={() => handleSelect(status.value)}
                        >
                          <div className={styles.menuText}>
                            <span className={styles.menuTitle}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              {isCreator && (
                <div
                  className={styles.statusEdit}
                  onClick={() => setEditMenuOpen(!editMenuOpen)}
                >
                  <FaEllipsisV />

                  {/* <FaChevronDown style={{ marginLeft: 6 }} /> */}
                  {editMenuOpen && (
                    <ul className={styles.dropdownMenu}>
                      {EDIT_OPTIONS.map((status) => (
                        <li
                          key={status.value}
                          className={styles.menuItem}
                          onClick={() => handleEditMenu(status.value)}
                        >
                          <span className={styles.menuTitle}>
                            {status.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <h1 className={styles.projectTitle}>{project.name}</h1>

            <div className={styles.projectCreator}>
              <span>작성자:</span>
              <span>{project.creator ?? "작성자"}</span>
              <span>•</span>
              <span>작성날짜 : {project.createdAt ?? "2025-07-07"}</span>
            </div>

            {/* 진행 상태 바 */}
            {/* <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${project.progress || 75}%`,
                }}
              ></div>
              <div className={styles.progressText}>
                <span>{project.progress}% 달성</span>
                <span>{project.participants}명 참여</span>
              </div>
            </div> */}

            {/* 프로젝트 통계 */}
            <div className={styles.projectStats}>
              <div className={styles.statItem}>
                <FaUsers />
                <span>{project.participants ?? 0}명 참여</span>
              </div>
              <div className={styles.statItem}>
                <FaUserFriends />
                <span>목표 {project.testersCount ?? 0}명</span>
              </div>
              <div className={styles.statItem}>
                <FaClock />
                <span>{project.daysLeft ?? 0}</span>
              </div>
            </div>

            <div className={styles.rewardSection}>
              <h3>🏆 보상 정보</h3>
              {project.hasReward ? (
                <div className={styles.rewardDetails}>
                  <strong>기본 보상</strong>
                  <div>- {project.baseReward}</div>
                  {project.bonusRewards?.length > 0 && (
                    <div>
                      <strong>추가 보상</strong>
                      {project.bonusRewards.map((reward, i) => (
                        <div key={i}>- {reward}</div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.rewardDetails}>보상 없음</div>
              )}
            </div>

            <div className={styles.actionContainer}>
              <div className={styles.participationMenu}>
                <div
                  className={styles.primaryAction}
                  onClick={() =>
                    setIsParticipationDropdownOpen(!isParticipationDropdownOpen)
                  }
                >
                  <span className={styles.actionLabel}>지금 참여하기</span>
                  <div
                    className={`${styles.dropdownChevron} ${
                      isParticipationDropdownOpen ? styles.rotated : ""
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {isParticipationDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {Object.entries(PARTICIPATION_OPTIONS).map(
                      ([key, option]) => (
                        <div
                          key={key}
                          className={styles.menuItem}
                          onClick={() =>
                            handleSelectParticipation(
                              key as keyof typeof PARTICIPATION_OPTIONS
                            )
                          }
                        >
                          <div className={styles.menuItemContent}>
                            <div className={styles.menuText}>
                              <span className={styles.menuTitle}>
                                {option.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className={styles.secondaryActions}>
                <div className={styles.iconWrapper} onClick={toggleBookmark}>
                  <div className={styles.iconContainer}>
                    {isBookmarked ? (
                      <FaBookmark className={styles.actionIcon} />
                    ) : (
                      <FaRegBookmark className={styles.actionIcon} />
                    )}
                    <span className={styles.tooltip}>저장하기</span>
                  </div>
                </div>
                <div className={styles.iconWrapper} onClick={handleShare}>
                  <div className={styles.iconContainer}>
                    <FaShareAlt className={styles.actionIcon} />
                    <span className={styles.tooltip}>공유하기</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "description" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            상세 설명
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "feedback" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            피드백 ({feedbacks.length})
          </button>
          {/*
          <button
            className={`${styles.tabButton} ${
              activeTab === "testers" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("testers")}
          >
            참여 테스터 ({testers.length})
          </button> */}
        </div>

        {/* 탭 내용 */}
        <div className={styles.tabContent}>{renderTabContent()}</div>
      </div>
      {/* 마지막에 컴포넌트 렌더 */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailPage;
