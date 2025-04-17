import React from "react";
import styles from "./TesterGuide.module.css";
import { FaClipboard, FaLock, FaQuestion } from "react-icons/fa";

const TesterGuide = () => {
  return (
    <div className={styles.guideContainer}>
      <div className={styles.mainGuideContainer}>
        <header className={styles.guideHeader}>
          <h1>테스터를 위한 안내서</h1>
          <p>서비스를 테스트하며 도움되는 팁들</p>
        </header>

        <section className={styles.guideSection}>
          <h2>
            <FaClipboard /> 테스트 잘하는 법
          </h2>
          <div className={styles.cardContainer}>
            <div className={styles.guideCard}>
              <h3>준비할 것</h3>
              <ul>
                <li>필요한 기기나 프로그램 미리 확인</li>
                <li>평소처럼 자연스럽게 사용해보기</li>
                <li>찾은 문제는 바로 기록하기</li>
              </ul>
            </div>

            <div className={styles.guideCard}>
              <h3>문제 보고는 이렇게</h3>
              <ul>
                <li>"여기서 막혔어요"보다 "~해서 안 됐어요"</li>
                <li>스크린샷 찍어서 같이 보내기</li>
                <li>어떻게 고치면 좋을지 의견 남기기</li>
              </ul>
            </div>

            <div className={styles.guideCard}>
              <h3>좋은 피드백이란?</h3>
              <ul>
                <li>자세할수록 좋지만 짧아도 괜찮아요</li>
                <li>불편한 점만 말고 좋은 점도 알려주세요</li>
                <li>개발자에게 실제로 도움이 되는 내용</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.warningSection}>
          <h2>
            <FaLock /> 주의사항
          </h2>
          <div className={styles.cardContainer}>
            <div className={styles.warningCard}>
              <h3>안전하게 테스트하기</h3>
              <ul>
                <li>테스트용 계정에 진짜 비밀번호 쓰지 마세요</li>
                <li>의심스러운 파일은 받지 마세요</li>
                <li>개인정보가 필요하면 꼭 확인하기</li>
              </ul>
            </div>

            <div className={styles.warningCard}>
              <h3>테스트 참여 시</h3>
              <ul>
                <li>진짜 사용하는 것처럼 해보는 게 중요해요</li>
                <li>여러 계정으로 참여하면 안 돼요</li>
                <li>기간 내에 꼭 참여해주세요</li>
              </ul>
            </div>

            <div className={styles.warningCard}>
              <h3>기타</h3>
              <ul>
                <li>참여만 해도 큰 도움이 됩니다</li>
                <li>피드백은 정말 소중해요</li>
                <li>보상은 프로젝트마다 달라요</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2>
            <FaQuestion /> 자주 묻는 질문
          </h2>
          <div className={styles.faqItem}>
            <h3>문제를 발견했는데 어떻게 알려요?</h3>
            <p>
              프로젝트 페이지에 있는 '피드백 제출' 버튼을 이용하거나, 개발자가
              알려준 방법으로 연락주세요.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>내 피드백이 반영됐는지 알 수 있나요?</h3>
            <p>
              일부 프로젝트는 결과를 공유하기도 하지만, 대부분은 알려주지 않을
              수도 있어요.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>테스트 후 보상은 어떻게 받나요?</h3>
            <p>
              보상이 있는 경우, 프로젝트 안내에 따라 주세요. 보상 유무는
              프로젝트마다 달라요.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TesterGuide;
