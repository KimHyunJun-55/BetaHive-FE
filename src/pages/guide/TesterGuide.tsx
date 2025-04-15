import React from "react";
import styles from "./TesterGuide.module.css";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

const TesterGuide = () => {
  return (
    <div className={styles.guideContainer}>
      <div className={styles.mainGuideContainer}>
        <header className={styles.guideHeader}>
          <h1>테스터 가이드라인</h1>
          <p>테스트에 참여하기 전 아래 내용을 꼭 확인해주세요!</p>
        </header>

        <section className={styles.guideSection}>
          <h2>
            <FaLightbulb /> 올바른 테스팅 방법
          </h2>
          <div className={styles.cardContainer}>
            <div className={styles.guideCard}>
              <h3>1. 테스트 전 준비사항</h3>
              <ul>
                <li>요구사항을 반드시 확인하세요 (기기 버전, OS 등)</li>
                <li>테스트 환경을 실제 사용 조건과 유사하게 설정</li>
                <li>충분한 시간을 확보한 후 시작</li>
              </ul>
            </div>

            <div className={styles.guideCard}>
              <h3>2. 효과적인 버그 리포트</h3>
              <ul>
                <li>발생 상황을 구체적으로 기록 (단계별 재현 방법)</li>
                <li>스크린샷/동영상 첨부 권장</li>
                <li>에러 메시지가 있다면 정확히 기록</li>
              </ul>
            </div>

            <div className={styles.guideCard}>
              <h3>3. 유용한 피드백 작성법</h3>
              <ul>
                <li>
                  "불편하다"보다 "~때문에 ~하게 사용하기 어렵다"고 구체적으로
                  작성
                </li>
                <li>개선 제안 시 실제 사용 시나리오 제시</li>
                <li>긍정적인 경험도 공유해주세요</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.warningSection}>
          <h2>
            <FaExclamationTriangle /> 주의사항
          </h2>
          <div className={styles.warningContent}>
            <div className={styles.warningCard}>
              <h3>보안 관련</h3>
              <ul>
                <li>테스트용 계정에는 개인정보를 입력하지 마세요</li>
                <li>의심스러운 파일 다운로드 요청은 거부하세요</li>
                <li>비밀번호 저장 기능은 사용하지 마세요</li>
              </ul>
            </div>

            <div className={styles.warningCard}>
              <h3>신뢰성 있는 테스트</h3>
              <ul>
                <li>실제 사용하지 않고 평가만 작성하지 마세요</li>
                <li>동일 기기로 다중 계정 테스트는 금지됩니다</li>
                <li>테스트 기간을 꼭 준수해주세요</li>
              </ul>
            </div>

            <div className={styles.warningCard}>
              <h3>성실한 참여</h3>
              <ul>
                <li>참여 자체가 프로젝트에 큰 도움이 됩니다</li>
                <li>성실한 피드백이 프로젝트 개선에 핵심 역할을 합니다</li>
                <li>기여해주신 모든 분께 감사드립니다</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2>
            <FaCheckCircle /> 자주 묻는 질문
          </h2>
          <div className={styles.faqItem}>
            <h3>Q. 테스트 중 문제가 발생하면 어떻게 해야 하나요?</h3>
            <p>
              프로젝트 상세 페이지의 "피드백 제출" 기능을 이용하거나, 생성자가
              안내한 채널로 문의해주세요.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>Q. 테스트 결과는 어디서 확인할 수 있나요?</h3>
            <p>
              피드백 반영 여부나 결과는 프로젝트 생성자가 별도로 안내할 수
              있습니다. 공지사항을 확인해주세요.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>Q. 테스트 후 다시 참여할 수 있나요?</h3>
            <p>
              동일한 프로젝트의 중복 참여는 제한될 수 있습니다. 상세 페이지의
              참여 조건을 확인해주세요.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TesterGuide;
