import {
  faEye,
  faEyeSlash,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Strike } from "@tiptap/extension-strike";
import { Heading } from "@tiptap/extension-heading";
import styles from "../../pages/projectCreate/ProjectCreate.module.css";
import MarkdownPreview from "./MarkdownPreview";

const MarkdownEditor = ({ value, onChange, ...props }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMarkdownGuide, setShowMarkdownGuide] = useState(false);
  const [showWritingGuide, setShowWritingGuide] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Strike, Heading],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  const handleLinkClick = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className={styles.formGroup} style={{ position: "relative" }}>
      <div className={styles.markdownHeader}>
        <label>
          {props.label}(마크다운 사용 지원)
          {props.required && <span className={styles.required}> </span>}
        </label>
        <div className={styles.markdownActions}>
          <button
            type="button"
            className={styles.smallButton}
            onClick={() => setShowMarkdownGuide(!showMarkdownGuide)}
          >
            <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
            <span>마크다운 가이드</span>
          </button>
          <button
            type="button"
            className={styles.smallButton}
            onClick={() => setShowWritingGuide(!showWritingGuide)}
          >
            <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
            <span>글 작성 가이드</span>
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

      {/* 툴바 영역 */}
      <div className={styles.toolbar}>
        <button onClick={() => editor?.commands.toggleBold()}>
          <strong>B</strong>
        </button>
        <button onClick={() => editor?.commands.toggleItalic()}>
          <em>I</em>
        </button>

        <button onClick={() => editor?.commands.toggleStrike()}>
          <s>S</s>
        </button>

        <button onClick={() => editor?.commands.toggleHeading({ level: 1 })}>
          H1
        </button>
        <button onClick={() => editor?.commands.toggleHeading({ level: 2 })}>
          H2
        </button>
        <button onClick={() => editor?.commands.toggleBulletList()}>
          ● List
        </button>
        <button onClick={() => editor?.commands.toggleOrderedList()}>
          1. List
        </button>
      </div>

      {/* 편집기 영역 */}
      {!showPreview ? (
        <div
          className={`${styles.formControl} ${styles.textareaControl}`}
          style={{ minHeight: `${props.minHeight}px` }}
        >
          <EditorContent editor={editor} />
        </div>
      ) : (
        <div className={styles.markdownPreview}>
          <MarkdownPreview value={editor?.getHTML() ?? ""} />
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
