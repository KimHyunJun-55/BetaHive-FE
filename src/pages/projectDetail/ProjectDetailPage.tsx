import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaClock,
  FaEllipsisH,
  FaGift,
  FaRegBookmark,
  FaShareAlt,
  FaUsers,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { fetchProjectDetails } from "../../api/project";
import styles from "./ProjectDetail.module.css";
import ProjectFeedback from "./section/ProjectFeedback";
import ProjectTesters from "./section/ProjectTesters";

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [expandedMedia, setExpandedMedia] = useState<MediaFile | null>(null);

  console.log(project);
  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectDetails(numericId);
        setProject(data);
      } catch (err) {
        setError("프로젝트 불러오기 실패");
      }
    };

    loadProject();
  }, [id]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!project) return null;

  const toggleBookmark = () => setIsBookmarked(!isBookmarked);

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
              onClick={() =>
                openImageModal({
                  url: project.thumbnailUrl,
                  description: project.name,
                })
              }
            />
          </div>

          <div className={styles.projectInfo}>
            {/* 프로젝트 메타 정보 */}
            <div className={styles.projectMeta}>
              <span className={styles.projectCategory}>{project.category}</span>
              <span className={styles.projectStatus}>{project.status}</span>
            </div>

            <h1 className={styles.projectTitle}>{project.name}</h1>

            <div className={styles.projectCreator}>
              <span>생성자:</span>
              <span>{project.creator ?? "작성자"}</span>
              <span>•</span>
              <span>{project.createdAt ?? "2025-07-07"}</span>
            </div>

            {/* 진행 상태 바 */}
            <div className={styles.progressContainer}>
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
            </div>

            {/* 프로젝트 통계 */}
            <div className={styles.projectStats}>
              <div className={styles.statItem}>
                <FaUsers />
                <span>{project.participants ?? 0}명 참여</span>
              </div>
              <div className={styles.statItem}>
                <FaClock />
                <span>{project.daysLeft ?? 0}일 남음</span>
              </div>
            </div>

            {project.hasReward && (
              <div className={styles.rewardSection}>
                <h3>🏆 보상 정보</h3>
                <div className={styles.rewardDetails}>
                  <strong>기본 보상</strong>
                  <div>-{project.baseReward}</div>
                  {project.bonusRewards?.length > 0 && (
                    <div>
                      <strong>추가 보상</strong>
                      {project.bonusRewards.map((reward, i) => (
                        <div key={i}>-{reward}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={styles.actionButtons}>
              <button className={styles.primaryButton}>지금 참여하기</button>
              <div className={styles.secondaryButtons}>
                <button className={styles.iconButton} onClick={toggleBookmark}>
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  <span>저장</span>
                </button>
                <button className={styles.iconButton}>
                  <FaShareAlt />
                  <span>공유</span>
                </button>
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
          {/* <button
            className={`${styles.tabButton} ${
              activeTab === "feedback" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            피드백 ({feedbacks.length})
          </button>
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
        <div className={styles.tabContent}>
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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p style={{ whiteSpace: "pre-wrap" }}>{children}</p>
                  ),
                }}
              >
                {project.instructions}
              </ReactMarkdown>
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
                      {/* <button className={styles.expandButton}>
                        <FaEllipsisH />
                      </button> */}
                    </div>
                    <p
                      className={styles.mediaDescription}
                      dangerouslySetInnerHTML={{ __html: media.description }}
                    >
                      {/* {media.description} */}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 피드백 탭 */}
          {activeTab === "feedback" && (
            <ProjectFeedback projectId={project.id} />
          )}

          {/* 테스터 탭 */}
          {activeTab === "testers" && <ProjectTesters projectId={project.id} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
