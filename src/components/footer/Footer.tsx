import React from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaTwitter, FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href="/terms">이용약관</a>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/faq">자주묻는질문</a>
          <a href="/contact">문의하기</a>
        </div>

        <div className={styles.companyInfo}>
          <p>
            <FaRegCopyright /> 2023 BetaHive. All rights reserved.
          </p>
          {/* <p>대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
          <p>주소: 서울특별시 강남구 테헤란로 123</p> */}
        </div>

        {/* <div className={styles.socialLinks}>
          <a href="https://github.com/yourrepo" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://twitter.com/yourhandle" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
