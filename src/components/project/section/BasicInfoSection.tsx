// BasicInfoSection.tsx
import React, { useEffect, useState } from "react";
import styles from "../../../pages/projectCreate/ProjectCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLink } from "@fortawesome/free-solid-svg-icons";
import { CATEGORIES } from "../../../type/contants";

interface BasicInfoSectionProps {
  formState: {
    name: string;
    category: string;
    description: string;
    detailedDescription: string;
    objective: string;
    webLink?: string;
    androidLink?: string;
    iosLink?: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formState,
  onFieldChange,
}) => {
  const [showLinks, setShowLinks] = useState({
    web: false,
    mobile: false,
  });

  // 카테고리 변경 시 링크 필드 자동 조정
  useEffect(() => {
    setShowLinks({
      web: ["WEB", "WEB_MOBILE"].includes(formState.category),
      mobile: ["MOBILE", "WEB_MOBILE"].includes(formState.category),
    });
  }, [formState.category]);
  // 데이터를 받아올 때 replace로 태그 제거
  const convertBrToNewline = (text: string): string => {
    return text.replace(/<br\s*\/?>/gi, "\n");
  };
  const displayDescription = convertBrToNewline(formState.description);

  return (
    <div className={styles.formSection}>
      <h2>
        <FontAwesomeIcon icon={faInfoCircle} /> 기본 정보
      </h2>
      <div className={styles.formGrid}>
        {/* 기존 입력 필드들 유지 */}
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

      {/* 플랫폼별 링크 입력 섹션 */}
      {showLinks.web && (
        <div className={styles.formGroup}>
          <label htmlFor="web-link">
            <FontAwesomeIcon icon={faLink} /> 웹사이트 링크
          </label>
          <input
            type="url"
            id="web-link"
            className={styles.formControl}
            value={formState.webLink || ""}
            onChange={(e) => onFieldChange("webLink", e.target.value)}
            placeholder="https://example.com"
            // pattern="https://.*"
          />
        </div>
      )}

      {showLinks.mobile && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="android-link">
              <FontAwesomeIcon icon={faLink} /> Google Play 스토어 링크
            </label>
            <input
              type="url"
              id="android-link"
              className={styles.formControl}
              value={formState.androidLink || ""}
              onChange={(e) => onFieldChange("androidLink", e.target.value)}
              placeholder="https://play.google.com/store/apps/details?id=com.example"
              // pattern="https://play.google.com/store/apps/.*"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ios-link">
              <FontAwesomeIcon icon={faLink} /> App Store 링크
            </label>
            <input
              type="url"
              id="ios-link"
              className={styles.formControl}
              value={formState.iosLink || ""}
              onChange={(e) => onFieldChange("iosLink", e.target.value)}
              placeholder="https://apps.apple.com/app/id123456789"
              // pattern="https://apps.apple.com/.*"
            />
          </div>
        </>
      )}

      {/* 기존 설명 필드들 유지 */}
      <div className={styles.formGroup}>
        <label htmlFor="project-description">
          프로젝트 설명 *
          {/* <span style={{ fontSize: "12px" }}>
            (메인페이지에 설명이 들어갈 공간입니다.)
          </span> */}
        </label>
        <textarea
          id="project-description"
          className={`${styles.formControl} ${styles.textareaControl}`}
          value={displayDescription}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="프로젝트를 설명해주세요 (최대 200자)"
          maxLength={200}
          required
        />
      </div>

      {/* <div className={styles.formGroup}>
        <label htmlFor="project-details">
          상세 설명 *
          <span style={{ fontSize: "12px" }}>
            (상세페이지에 설명이 들어갈 공간입니다.)
          </span>
        </label>
        <textarea
          id="project-details"
          className={`${styles.formControl} ${styles.textareaControl}`}
          value={formState.detailedDescription}
          onChange={(e) => onFieldChange("detailedDescription", e.target.value)}
          placeholder="테스터들이 알아야 할 모든 내용을 상세히 작성해주세요"
          required
        />
      </div> */}
    </div>
  );
};

export default BasicInfoSection;
