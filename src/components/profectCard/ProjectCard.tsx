import React from "react";
import { FaRegComment, FaRegEye } from "react-icons/fa";
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
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24); // 밀리초 → 일로 변환
  // 상태 표시 로직 간소화
  const getStatusInfo = () => {
    if (project.daysLeft <= 3) {
      return { text: "마감임박", color: "#ff6b81" };
    }

    if (dayDiff <= 6) {
      return { text: "신규", color: "#2ed573" };
    }
    return null;
  };

  const statusInfo = getStatusInfo();
  console.log(project);

  return (
    <div className={styles.projectCard}>
      {/* <div className={styles.projectImage}>
        <Link to={`/projects/detail/${project.id}`}>
          <img
            src={project.thumbnailUrl || "/default-project-thumbnail.jpg"}
            alt={project.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/default-project-thumbnail.jpg";
            }}
          />
          
        </Link>
      </div> */}

      <Link to={`/projects/detail/${project.id}`}>
        <div className={styles.projectContent}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>{project.name}</h3>
            <span className={styles.projectCategory}>{project.category}</span>
            {/* <span>{statusInfo}</span> */}
            {/* {statusInfo && (
              <span
                className={styles.projectBadge}
                style={{ backgroundColor: statusInfo.color }}
              >
                {statusInfo.text}
              </span>
            )} */}
          </div>

          <p className={styles.projectDescription} title={project.description}>
            {project.description.length > 80
              ? `${project.description.substring(0, 80)}...`
              : project.description}
          </p>

          {/* 요구사항 표시 */}
          {project.requirements?.length > 0 && (
            <div className={styles.requirements}>
              {project.requirements.slice(0, 3).map((req, index) => (
                <span key={index} className={styles.requirementBadge}>
                  {req}
                </span>
              ))}
              {project.requirements.length > 3 && (
                <span className={styles.requirementBadge}>
                  +{project.requirements.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 보상 정보 (있을 경우만 표시) */}
          {/* {project.baseReward && (
          <div className={styles.rewardInfo}>
            <FaRegBell className={styles.rewardIcon} />
            <span>보상: {project.baseReward}</span>
            <span className={styles.rewardNote}>(프로젝트별 상이)</span>
          </div>
        )} */}

          {/* 진행 상태 및 기간 */}
          <div className={styles.projectFooter}>
            <div className={styles.interestInfo}>
              <FaRegEye className={styles.eyeIcon} />
              <span>{project.viewCount}</span>
              <span className={styles.tooltip}>조회수</span>
            </div>

            <div className={styles.commentInfo}>
              <div className={styles.interestInfo}>
                <FaRegComment className={styles.commentIcon} />
                <span>{project.commentCount || 0}</span>
                <span className={styles.tooltip}>댓글수</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
