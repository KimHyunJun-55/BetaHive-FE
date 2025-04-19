import React from "react";
import {
  FaCheck,
  FaEdit,
  FaEyeSlash,
  FaPlay,
  FaRegComment,
  FaRegEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Project } from "../../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const createdDate = new Date(project.createdAt);
  const now = new Date();
  const timeDiff = now.getTime() - createdDate.getTime();
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  const getStatusInfo = () => {
    if (dayDiff <= 2) {
      return { text: "신규", color: "#2ed573" };
    }
    return null;
  };
  const STATUS_OPTIONS = [
    {
      value: "IN_PROGRESS",
      label: "테스트진행 중",
      icon: <FaPlay className={styles.statusIcon} />,
      badgeClass: styles.inProgress, // 추가
    },
    {
      value: "COMPLETED",
      label: "테스트종료",
      icon: <FaCheck className={styles.statusIcon} />,
      badgeClass: styles.completed, // 추가
    },
    {
      value: "MODIFYING",
      label: "수정 중",
      icon: <FaEdit className={styles.statusIcon} />,
      badgeClass: styles.modifying, // 추가
    },
    {
      value: "HIDDEN",
      label: "숨김",
      icon: <FaEyeSlash className={styles.statusIcon} />,
      badgeClass: styles.hidden, // 추가
    },
  ];
  const statusInfo = getStatusInfo();

  return (
    <div className={styles.projectCard}>
      <Link to={`/projects/detail/${project.id}`} className={styles.cardLink}>
        {/* 이미지 섹션 (주석 해제 필요시 사용) */}
        {/* <div className={styles.projectImage}>
          <img
            src={project.thumbnailUrl || "/default-project-thumbnail.jpg"}
            alt={project.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-project-thumbnail.jpg";
            }}
          />
        </div> */}

        <div className={styles.projectContent}>
          {/* 헤더 섹션 - 제목과 뱃지들 */}
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>{project.name}</h3>
            <div className={styles.badgeGroup}>
              <span className={styles.projectCategory}>{project.category}</span>
              {statusInfo && (
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: statusInfo.color }}
                >
                  {statusInfo.text}
                </span>
              )}
            </div>
          </div>

          {/* 프로젝트 설명 */}
          {/* 프로젝트 설명 */}
          <p
            className={styles.projectDescription}
            title={project.description}
            dangerouslySetInnerHTML={{
              __html:
                project.description.length > 80
                  ? `${project.description.substring(0, 80)}...`
                  : project.description,
            }}
          />

          {/* 요구사항 태그들 */}
          {/* 요구사항 태그들 */}
          {(project.requirements?.length ?? 0) > 0 && (
            <div className={styles.requirements}>
              {project.requirements?.slice(0, 3).map((req, index) => (
                <span key={index} className={styles.requirementBadge}>
                  {req}
                </span>
              ))}
              {(project.requirements?.length ?? 0) > 3 && (
                <span className={styles.requirementBadge}>
                  +{(project.requirements?.length ?? 0) - 3}
                </span>
              )}
            </div>
          )}

          {/* 푸터 - 조회수, 댓글수 */}
          <div className={styles.projectFooter}>
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <FaRegEye className={styles.metaIcon} />
                <span>{project.viewCount}</span>
                <span className={styles.tooltip}>조회수</span>
              </div>
              <div className={styles.metaItem}>
                <FaRegComment className={styles.metaIcon} />
                <span>{project.commentCount || 0}</span>
                <span className={styles.tooltip}>댓글수</span>
              </div>
            </div>
            <span
              className={`${styles.statusBadge} ${
                STATUS_OPTIONS.find((s) => s.value === project.status)
                  ?.badgeClass || ""
              }`}
            >
              {STATUS_OPTIONS.find((s) => s.value === project.status)?.icon}
              {STATUS_OPTIONS.find((s) => s.value === project.status)?.label ??
                project.status}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
