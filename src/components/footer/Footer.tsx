import { FaRegCopyright } from "react-icons/fa";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* 왼쪽: 링크 */}
        <div className={styles.footerLinks}>
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/faq">자주 묻는 질문</Link>
          <Link to="/contact">문의하기</Link>
        </div>

        {/* 오른쪽: 소개문구 + 소셜 + 링크 */}
        <div className={styles.rightSection}>
          <p className={styles.description}>
            BetaHive는 새로운 아이디어를 실험하고,
            <br />
            사용자 피드백을 통해 함께 만들어가는 플랫폼입니다.
          </p>

          {/* <div className={styles.socialLinks}>
            <a href="https://github.com/yourrepo" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://twitter.com/yourhandle" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div> */}

          <div className={styles.miniLinks}>
            {/* <a href="/team">팀 소개</a> */}
            <a
              href="https://pond-hovercraft-344.notion.site/1db549415a8a80c8adfce9aaec5e261d"
              target="_blank"
              rel="noopener noreferrer"
            >
              업데이트 소식
            </a>
          </div>

          <p className={styles.copy}>
            <FaRegCopyright /> 2025 BetaHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
