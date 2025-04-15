import React from "react";
import styles from "./ProjectCard.module.css";
import { FaGift, FaUsers, FaClock } from "react-icons/fa";
import { Project } from "../../types";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}
const statusBadges = {
  HOT: { text: "HOT", color: "#ff4757" },
  NEW: { text: "NEW", color: "#2ed573" },
  URGENT: { text: "마감임박", color: "#ffa502" },
  LIMITED: { text: "선착순", color: "#3742fa" },
};
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImage}>
        <Link to={`/projects/detail/${project.id}`}>
          <img src={project.thumbnailUrl} alt={project.name} />
          {project.badge && (
            <span className={styles.projectBadge}>{project.badge}</span>
          )}
        </Link>
      </div>
      <div className={styles.projectContent}>
        <div className={styles.projectHeader}>
          <div>
            <h3 className={styles.projectTitle}>{project.name}</h3>
            {project.baseReward && (
              <span className={styles.rewardTag}>
                <FaGift /> {project.baseReward}
              </span>
            )}
          </div>
          <span className={styles.projectCategory}>{project.category}</span>
        </div>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${project.progress || 10}%` }}
          ></div>
        </div>

        <div className={styles.projectMeta}>
          <div className={styles.projectStats}>
            <span className={styles.statItem}>
              <FaUsers /> {project.participants}명 참여
            </span>
            <span className={styles.statItem}>
              <FaClock /> {project.daysLeft ?? 7}일 남음
            </span>
          </div>
        </div>
        {project.requirements && project.requirements.length > 0 && (
          <div className={styles.requirementsContainer}>
            {project.requirements.map((req, index) => (
              <span
                key={index}
                className={styles.unifiedBadge}
                title={req} // hover 시 전체 텍스트 보이기
              >
                {req}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
