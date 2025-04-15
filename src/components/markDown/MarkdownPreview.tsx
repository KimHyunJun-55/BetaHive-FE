// MarkdownPreview.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import styles from "./MarkdownPreview.module.css";

const MarkdownPreview = ({ value }: any) => {
  return (
    <div className={styles.markdownPreview}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {value || "*내용이 없습니다*"}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
