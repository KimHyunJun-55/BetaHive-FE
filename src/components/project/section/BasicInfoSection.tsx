// BasicInfoSection.tsx
import React from "react";
import styles from "../../../pages/projectCreate/ProjectCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CATEGORIES } from "../../../type/contants";

interface BasicInfoSectionProps {
  formState: {
    name: string;
    category: string;
    description: string;
    detailedDescription: string;
    objective: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formState,
  onFieldChange,
}) => {
  return (
    <div className={styles.formSection}>
      <h2>
        <FontAwesomeIcon icon={faInfoCircle} /> 기본 정보
      </h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="project-name">프로젝트 이름 *</label>
          <input
            type="text"
            id="project-name"
            className={styles.formControl}
            value={formState.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="예: 하루 1분 명상 앱"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="project-category">카테고리 *</label>
          <select
            id="project-category"
            className={styles.formControl}
            value={formState.category}
            onChange={(e) => onFieldChange("category", e.target.value)}
            required
          >
            <option value="">선택하세요</option>
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="project-description">간단한 설명 *</label>
        <textarea
          id="project-description"
          className={`${styles.formControl} ${styles.textareaControl}`}
          value={formState.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="프로젝트를 한 문장으로 설명해주세요 (최대 200자)"
          maxLength={200}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="project-details">상세 설명 *</label>
        <textarea
          id="project-details"
          className={`${styles.formControl} ${styles.textareaControl}`}
          value={formState.detailedDescription}
          onChange={(e) => onFieldChange("detailedDescription", e.target.value)}
          placeholder="테스터들이 알아야 할 모든 내용을 상세히 작성해주세요"
          required
        />
        {/* <p className={styles.markdownHint}>마크다운(Markdown) 문법 지원</p> */}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="project-goals">프로젝트 목표 *</label>
        <textarea
          id="project-goals"
          value={formState.objective}
          className={`${styles.formControl} ${styles.textareaControl}`}
          onChange={(e) => onFieldChange("objective", e.target.value)}
          placeholder="이 프로젝트를 통해 달성하고자 하는 목표는 무엇인가요?"
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
