import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../pages/projectCreate/ProjectCreate.module.css";

const MarkdownEditor = ({ value, onChange, ...props }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const MARKDOWN_EXAMPLE = `### ✨ 마크다운 사용법


   - **굵게**: \\*\\*텍스트\\*\\* → **텍스트**  
   - *기울임*: \\*텍스트\\* → *텍스트*  
   - \`코드\`: \\\`코드\\\` → \`코드\`
   - 번호 목록:  
     1\\. 항목1  
     2\\. 항목2  
   - 글머리 기호:  
     \\- 항목1  
     \\- 항목2
     `;
  //  **3. 링크/이미지**
  //     - [링크](https://example.com):
  //       \\[텍스트\\]\\(URL\\)
  //     - ![이미지](이미지URL):
  //       \\!\\[alt\\]\\(URL\\)
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.formGroup} style={{ position: "relative" }}>
      <div className={styles.markdownHeader}>
        <label>
          {props.label}
          {props.required && <span className={styles.required}> *</span>}
        </label>
        <div className={styles.markdownActions}>
          <button
            type="button"
            className={styles.smallButton}
            onClick={() => setShowGuide(!showGuide)}
          >
            <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
            <span>가이드</span>
          </button>
          <button
            type="button"
            className={styles.smallButton}
            onClick={() => setShowPreview(!showPreview)}
          >
            <FontAwesomeIcon
              icon={showPreview ? faEyeSlash : faEye}
              size="sm"
            />
            <span>{showPreview ? "편집" : "미리보기"}</span>
          </button>
        </div>
      </div>

      {/* 우측 고정 가이드 패널 */}
      {showGuide && (
        <div className={styles.floatingGuide} onClick={handleLinkClick}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} style={{ cursor: "default", color: "inherit" }} />
              ),
              img: ({ node, ...props }) => (
                <span style={{ fontStyle: "italic" }}>[이미지 예시]</span>
              ),
            }}
          >
            {MARKDOWN_EXAMPLE}
          </ReactMarkdown>
        </div>
      )}

      {/* 편집기 영역 */}
      {!showPreview ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={props.placeholder}
          className={`${styles.formControl} ${styles.textareaControl}`}
          style={{ minHeight: `${props.minHeight}px` }}
          required={props.required}
        />
      ) : (
        <div className={styles.markdownPreview}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value || "*내용이 없습니다*"}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};
export default MarkdownEditor;
