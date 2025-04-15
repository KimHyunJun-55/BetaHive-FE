import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import { useEffect, useRef } from "react";
import styles from "./TipTapEditor.module.css";

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  minHeight?: number;
}

const TipTapEditor = ({
  value,
  onChange,
  minHeight = 200,
}: TipTapEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("value : ", value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Underline,
      Image.configure({ HTMLAttributes: { class: "editor-image" } }),
      Link.configure({ HTMLAttributes: { class: "editor-link" } }),
      OrderedList,
      BulletList,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: styles.editorContent },
      handleClick: () => {
        if (!editor?.isFocused) editor?.commands.focus();
      },
    },
  });

  // 파일 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor?.commands.setImage({ src: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 툴바 액션
  const toolbarActions = [
    {
      icon: "H1",
      command: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: "H2",
      command: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    { icon: "B", command: () => editor?.chain().focus().toggleBold().run() },
    { icon: "I", command: () => editor?.chain().focus().toggleItalic().run() },
    {
      icon: "U",
      command: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      icon: "1.",
      command: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: "•",
      command: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      icon: "🖼️",
      command: () => fileInputRef.current?.click(),
      isFileInput: true,
    },
    {
      icon: "🔗",
      command: () => {
        const url = window.prompt("링크 URL 입력");
        if (url) editor?.chain().focus().setLink({ href: url }).run();
      },
    },
  ];

  // 초기 포커스 설정
  useEffect(() => {
    if (editor && !editor.isDestroyed && !editor.isFocused) {
      editor.commands.focus();
    }

    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [editor, value]);

  return (
    <div
      className={styles.holaWorldEditor}
      style={{ minHeight: `${minHeight}px` }}
    >
      {/* 파일 입력 (숨김) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* 툴바 */}
      <div className={styles.toolbar}>
        {toolbarActions.map((action, index) => (
          <button
            key={index}
            onClick={action.command}
            className={`
              ${styles.toolButton} 
              ${
                editor?.isActive(
                  action.icon === "1."
                    ? "orderedList"
                    : action.icon === "•"
                    ? "bulletList"
                    : action.icon.toLowerCase()
                )
                  ? styles.active
                  : ""
              }
            `}
            type="button"
          >
            {action.icon}
          </button>
        ))}
      </div>

      {/* 에디터 영역 */}
      <div
        onClick={() => editor?.commands.focus()}
        style={{ cursor: "text", minHeight: `${minHeight - 40}px` }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
