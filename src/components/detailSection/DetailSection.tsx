import React from "react";
import styles from "./DetailSection.module.css";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaAward,
  FaTimes,
  FaCheck,
  FaMedal,
} from "react-icons/fa";

interface DetailSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className={styles.detailSection}>
      <h3>
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
};

export const TestingGuideSection: React.FC = () => {
  return (
    <DetailSection title="프로젝트 테스팅 가이드" icon={<FaInfoCircle />}>
      <p>
        테스팅을 시작하기 전에 다음 가이드라인을 확인해주세요. 더 나은 테스팅
        경험을 위해 필수적으로 숙지해야 할 내용입니다.
      </p>

      <div className={styles.detailGrid}>
        <div
          className={styles.detailCard}
          style={{ background: "var(--primary-light)" }}
        >
          <h4 style={{ color: "var(--primary)" }}>
            <FaCheckCircle /> 필수 테스팅 절차
          </h4>
          <ul>
            <li>모든 기능 점검</li>
            <li>버그 리포트 작성</li>
            <li>UX 평가 설문</li>
          </ul>
        </div>

        <div
          className={styles.detailCard}
          style={{ background: "rgba(16, 185, 129, 0.1)" }}
        >
          <h4 style={{ color: "var(--success)" }}>
            <FaAward /> 보상 안내
          </h4>
          <p>
            우수 테스터 선정 시 추가 보상이 제공됩니다. 피드백의 질과 양을
            고려하여 평가합니다.
          </p>
        </div>
      </div>
    </DetailSection>
  );
};

export const TesterRatingSection: React.FC = () => {
  return (
    <DetailSection title="테스터 평가 기준" icon={<FaMedal />}>
      <div className={styles.ratingContainer}>
        <div className={styles.ratingCard}>
          <div
            className={styles.ratingIcon}
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "var(--error)",
            }}
          >
            <FaTimes />
          </div>
          <span>기본 요구사항</span>
          <p>최소 테스트 조건 충족 및 기본 피드백 제출</p>
        </div>

        <div className={styles.ratingCard}>
          <div
            className={styles.ratingIcon}
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              color: "var(--warning)",
            }}
          >
            <FaCheck />
          </div>
          <span>적극적 참여</span>
          <p>모든 테스트 시나리오 수행 및 상세 리포트</p>
        </div>

        <div className={styles.ratingCard}>
          <div
            className={styles.ratingIcon}
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              color: "var(--success)",
            }}
          >
            <FaMedal />
          </div>
          <span>우수 테스터</span>
          <p>창의적 제안 및 전문적 분석 포함</p>
        </div>
      </div>
    </DetailSection>
  );
};
