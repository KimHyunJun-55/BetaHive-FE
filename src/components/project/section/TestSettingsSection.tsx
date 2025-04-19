import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../../pages/projectCreate/ProjectCreate.module.css";
import { TEST_TYPES } from "../../../type/contants";
import TipTapEditor from "../../tipTapEditor/TipTapEditor";

interface TestSettingsSectionProps {
  testersCount: number;
  testType: string;
  testDuration: string;
  requirements: string[];
  newRequirement: string;
  instructions: string;
  contact: string;
  contactType: string;
  onInstructionsChange: (value: string) => void;
  onContactChange: (value: string) => void;
  onTestersCountChange: (count: number) => void;
  onTestTypeChange: (type: string) => void;
  onContectTypeChange: (type: string) => void;
  onTestDurationChange: (duration: string) => void;
  onAddRequirement: () => void;
  onRemoveRequirement: (index: number) => void;
  onNewRequirementChange: (requirement: string) => void;
}

const TestSettingsSection: React.FC<TestSettingsSectionProps> = ({
  // testersCount,
  testType,
  // testDuration,
  requirements,
  newRequirement,
  instructions,
  contact,
  contactType,
  onContactChange,
  onInstructionsChange,
  // onTestersCountChange,
  onTestTypeChange,
  // onTestDurationChange,
  onAddRequirement,
  onRemoveRequirement,
  onNewRequirementChange,
  onContectTypeChange,
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

        <TipTapEditor
          label="참여 방법"
          value={instructions}
          onChange={onInstructionsChange}
          minHeight={250}
        />

        {/* 연락처 타입 + 입력 필드 */}
        <div className={styles.formGroup}>
          <label htmlFor="contact-info">테스터 문의처 *</label>
          <div className={styles.contactRow}>
            <select
              id="contact-type"
              className={styles.formControl}
              value={contactType}
              onChange={(e) => onContectTypeChange(e.target.value)}
              required
              style={{ width: "fit-content", padding: "4px 24px" }}
            >
              <option value="email">이메일</option>
              <option value="phone">전화번호</option>
              <option value="googleForm">구글 폼</option>
              <option value="kakaoLink">오픈 카카오톡 링크</option>
              <option value="etc">기타</option>
            </select>

            <input
              id="contact-info"
              type={
                contactType === "email"
                  ? "email"
                  : contactType === "phone"
                  ? "tel"
                  : contactType === "etc"
                  ? "text"
                  : "url"
              }
              value={contact}
              onChange={(e) => onContactChange(e.target.value)}
              className={styles.testerRequirementInput}
              placeholder={
                contactType === "email"
                  ? "이메일을 입력해주세요."
                  : contactType === "phone"
                  ? "전화번호를 입력해주세요."
                  : contactType === "googleForm"
                  ? "구글 폼 링크를 입력해주세요."
                  : contactType === "kakaoLink"
                  ? "카카오톡 링크를 입력해주세요."
                  : "연락처 정보를 입력해주세요." // etc인 경우
              }
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>테스터 요구사항 - 엔터키로 추가</label>
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
                  e.preventDefault();
                  onAddRequirement();
                }
              }}
            />
            {/* <button
              type="button"
              className={styles.addRequirementButton}
              onClick={onAddRequirement}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button> */}
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
    </div>
  );
};

export default TestSettingsSection;
