// TestSettingsSection.tsx
import {
  faCog,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../../../pages/projectCreate/ProjectCreate.module.css";
import { TEST_DURATIONS, TEST_TYPES } from "../../../type/contants";
import MarkdownEditor from "../../common/MarkdownEditor";

interface TestSettingsSectionProps {
  testersCount: number;
  testType: string;
  testDuration: string;
  requirements: string[];
  newRequirement: string;
  instructions: string; // 추가
  contact: string;
  onInstructionsChange: (value: string) => void;
  onContactChange: (value: string) => void;
  onTestersCountChange: (count: number) => void;
  onTestTypeChange: (type: string) => void;
  onTestDurationChange: (duration: string) => void;
  onAddRequirement: () => void;
  onRemoveRequirement: (index: number) => void;
  onNewRequirementChange: (requirement: string) => void;
}

const TestSettingsSection: React.FC<TestSettingsSectionProps> = ({
  testersCount,
  testType,
  testDuration,
  requirements,
  newRequirement,
  instructions,
  contact,
  onContactChange,
  onInstructionsChange,
  onTestersCountChange,
  onTestTypeChange,
  onTestDurationChange,
  onAddRequirement,
  onRemoveRequirement,
  onNewRequirementChange,
}) => {
  return (
    <div className={styles.formSection}>
      <h2>
        <FontAwesomeIcon icon={faCog} /> 테스트 설정
      </h2>
      <div className={styles.mediaGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="test-type">테스트 유형 *</label>
          <select
            id="test-type"
            className={styles.formControl}
            value={testType}
            onChange={(e) => onTestTypeChange(e.target.value)}
            required
          >
            {TEST_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <MarkdownEditor
          label="참여 방법"
          value={instructions}
          onChange={onInstructionsChange}
          required
          minHeight={250}
        />

        <div className={styles.formGroup}>
          <label htmlFor="test-duration">테스트 기간 *</label>
          <select
            id="test-duration"
            className={styles.formControl}
            value={testDuration}
            onChange={(e) => onTestDurationChange(e.target.value)}
            required
          >
            {TEST_DURATIONS.map((duration) => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="testers-count" className={styles.testersCountLabel}>
          필요 테스터 수 *: {testersCount}명
        </label>
        <input
          type="range"
          id="testers-count"
          min="10"
          max="500"
          value={testersCount}
          onChange={(e) => onTestersCountChange(parseInt(e.target.value))}
          className={styles.testersCountRange}
          required
        />
        <div className={styles.testersCountInfo}>
          <span>10명</span>
          <span>500명</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>테스터 요구사항</label>
        <div className={styles.requirementsContainer}>
          <div className={styles.requirementInputContainer}>
            <input
              type="text"
              placeholder="예: iOS 사용자"
              className={styles.testerRequirementInput}
              value={newRequirement}
              onChange={(e) => onNewRequirementChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // ★ 폼 제출 막기
                  onAddRequirement(); // 원래 동작
                }
              }}
            />
            <button
              type="button"
              className={styles.addRequirementButton}
              onClick={onAddRequirement}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </div>
          <div className={styles.requirementsTags}>
            {requirements.map((req, index) => (
              <span key={index} className={styles.requirementTag}>
                {req}
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => onRemoveRequirement(index)}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="contact-info">테스터 문의처 *</label>
        <input
          type="text"
          id="contact-info"
          value={contact}
          onChange={(e) => onContactChange(e.target.value)}
          className={styles.formControl}
          placeholder="구글폼, 카카오톡링크 등.. 문의를 받을곳을 입력해주세요."
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
};

export default TestSettingsSection;
