import React, { useEffect } from "react";
import styles from "./ConfirmDeleteModal.module.css";
import { FaExclamationCircle, FaTrash } from "react-icons/fa";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  projectName?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  projectName = "이 프로젝트",
}) => {
  if (!isOpen) return null;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContent}>
          <div className={styles.warningIcon}>
            <FaExclamationCircle />
          </div>
          <h3>프로젝트 삭제</h3>
          <p>
            <strong>"{projectName}"</strong>을(를) 정말 삭제하시겠습니까?
          </p>
          <p className={styles.infoText}>
            단순히 보이지 않게 하고 싶다면 <strong>숨김 기능</strong>을
            이용해보세요.
          </p>
          <p className={styles.warningText}>
            삭제된 프로젝트는 복구할 수 없습니다.
          </p>
        </div>

        <div className={styles.modalActions}>
          <div
            className={styles.cancelBtn}
            onClick={onCancel}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onCancel();
            }}
          >
            취소
          </div>
          <div
            className={styles.deleteBtn}
            onClick={onConfirm}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onConfirm();
            }}
          >
            <FaTrash /> 삭제하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
